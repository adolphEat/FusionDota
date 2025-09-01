-- Oracle Fates Edict技能
-- 为距离最近的敌方单位施加缴械，为距离最近的友方单位增加攻速和生命偷取

oracle1_fatesedict = class({})

LinkLuaModifier("modifier_oracle1_fatesedict_enemy", "heroes/hero_oracle/oracle1_fatesedict.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_oracle1_fatesedict_ally", "heroes/hero_oracle/oracle1_fatesedict.lua", LUA_MODIFIER_MOTION_NONE)

function oracle1_fatesedict:OnSpellStart()
    local caster = self:GetCaster()
    local enemy_search_radius = self:GetSpecialValueFor("enemy_search_radius")
    
    -- 第一步：找到距离最近的敌方单位
    local nearest_enemy = self:FindNearestEnemy(caster, enemy_search_radius)
    
    if not nearest_enemy then
        print("Oracle Fates Edict: No enemy found in range")
        return
    end
    
    -- 对敌方单位施加缴械效果
    local disarm_duration = self:GetSpecialValueFor("enemy_disarm_duration")
    nearest_enemy:AddNewModifier(caster, self, "modifier_oracle1_fatesedict_enemy", {duration = disarm_duration})
    
    -- 播放特效
    local particle = ParticleManager:CreateParticle("particles/heroes/oracle/oracle_fatesedict.vpcf", PATTACH_ABSORIGIN_FOLLOW, nearest_enemy)
    ParticleManager:SetParticleControl(particle, 0, nearest_enemy:GetAbsOrigin())
    
    -- 将粒子特效与modifier绑定，确保在modifier销毁时自动清理
    local modifier = nearest_enemy:FindModifierByName("modifier_oracle1_fatesedict_enemy")
    if modifier then
        modifier:AddParticle(particle, false, false, -1, false, false)
    end
    
    print("Oracle Fates Edict: Applied disarm to enemy " .. nearest_enemy:GetUnitName() .. " for " .. disarm_duration .. " seconds")
    
    -- 第二步：找到距离这名敌方单位最近的友方单位
    local ally_search_radius = self:GetSpecialValueFor("ally_search_radius")
    local nearest_ally_to_enemy = self:FindNearestAllyToTarget(nearest_enemy, ally_search_radius)
    
    if nearest_ally_to_enemy then
        local attack_speed_bonus = self:GetSpecialValueFor("ally_attack_speed_bonus")
        local lifesteal_percent = self:GetSpecialValueFor("ally_lifesteal_percent")
        
        -- 创建modifier数据，持续时间与缴械一致
        local modifier_data = {
            duration = disarm_duration,  -- 增益持续时间与缴械一致
            attack_speed_bonus = attack_speed_bonus,
            lifesteal_percent = lifesteal_percent
        }
        
        nearest_ally_to_enemy:AddNewModifier(caster, self, "modifier_oracle1_fatesedict_ally", modifier_data)
        
        -- 播放特效
        local particle = ParticleManager:CreateParticle("particles/heroes/oracle/oracle_fatesedict.vpcf", PATTACH_ABSORIGIN_FOLLOW, nearest_ally_to_enemy)
        ParticleManager:SetParticleControl(particle, 0, nearest_ally_to_enemy:GetAbsOrigin())
        
        -- 将粒子特效与modifier绑定，确保在modifier销毁时自动清理
        local modifier = nearest_ally_to_enemy:FindModifierByName("modifier_oracle1_fatesedict_ally")
        if modifier then
            modifier:AddParticle(particle, false, false, -1, false, false)
        end
        
        print("Oracle Fates Edict: Applied buff to ally " .. nearest_ally_to_enemy:GetUnitName() .. " (nearest to enemy " .. nearest_enemy:GetUnitName() .. ") with " .. attack_speed_bonus .. "% attack speed and " .. lifesteal_percent .. "% lifesteal for " .. disarm_duration .. " seconds")
    else
        -- 如果敌人周围没有友军，增益buff给到施法者自己
        local attack_speed_bonus = self:GetSpecialValueFor("ally_attack_speed_bonus")
        local lifesteal_percent = self:GetSpecialValueFor("ally_lifesteal_percent")
        
        local modifier_data = {
            duration = disarm_duration,
            attack_speed_bonus = attack_speed_bonus,
            lifesteal_percent = lifesteal_percent
        }
        
        caster:AddNewModifier(caster, self, "modifier_oracle1_fatesedict_ally", modifier_data)
        
        -- 播放特效
        local particle = ParticleManager:CreateParticle("particles/heroes/oracle/oracle_fatesedict.vpcf", PATTACH_ABSORIGIN_FOLLOW, caster)
        ParticleManager:SetParticleControl(particle, 0, caster:GetAbsOrigin())
        
        -- 将粒子特效与modifier绑定，确保在modifier销毁时自动清理
        local modifier = caster:FindModifierByName("modifier_oracle1_fatesedict_ally")
        if modifier then
            modifier:AddParticle(particle, false, false, -1, false, false)
        end
        
        print("Oracle Fates Edict: No ally found near enemy, applied buff to caster " .. caster:GetUnitName() .. " with " .. attack_speed_bonus .. "% attack speed and " .. lifesteal_percent .. "% lifesteal for " .. disarm_duration .. " seconds")
    end
    
    -- 播放音效
    EmitSoundOn("Hero_Oracle.FatesEdict", caster)
end

-- 找到距离最近的敌方单位
function oracle1_fatesedict:FindNearestEnemy(caster, radius)
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #enemies > 0 then
        return enemies[1]  -- 返回最近的敌方单位
    end
    
    return nil
end

-- 找到距离指定目标最近的友方单位
function oracle1_fatesedict:FindNearestAllyToTarget(target, radius)
    local allies = FindUnitsInRadius(
        self:GetCaster():GetTeamNumber(),  -- 使用施法者的团队，而不是目标的团队
        target:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #allies > 0 then
        return allies[1]  -- 返回距离目标最近的友方单位
    end
    
    return nil
end

-- 敌方单位缴械效果modifier
modifier_oracle1_fatesedict_enemy = class({})

function modifier_oracle1_fatesedict_enemy:IsHidden() 
    return false 
end

function modifier_oracle1_fatesedict_enemy:IsDebuff() 
    return true 
end

function modifier_oracle1_fatesedict_enemy:IsPurgable() 
    return true 
end

function modifier_oracle1_fatesedict_enemy:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_DISABLE_ATTACKING,
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_oracle1_fatesedict_enemy:GetDisableAttacking()
    return 1
end

function modifier_oracle1_fatesedict_enemy:GetModifierAttackSpeedBonus_Constant()
    return -1000  -- 大幅降低攻击速度，确保无法攻击
end

-- 缴械debuff的头顶粒子特效
function modifier_oracle1_fatesedict_enemy:GetEffectName()
    return "particles/heroes/oracle/oracle_fatesedict_disarm_ovrhead.vpcf"
end

function modifier_oracle1_fatesedict_enemy:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 友方单位增益效果modifier
modifier_oracle1_fatesedict_ally = class({})

function modifier_oracle1_fatesedict_ally:IsHidden() 
    return false 
end

function modifier_oracle1_fatesedict_ally:IsDebuff() 
    return false 
end

function modifier_oracle1_fatesedict_ally:IsPurgable() 
    return true 
end

function modifier_oracle1_fatesedict_ally:OnCreated(params)
    if not IsServer() then return end
    
    self.attack_speed_bonus = params.attack_speed_bonus or 20
    self.lifesteal_percent = params.lifesteal_percent or 30
    
    -- 创建并管理粒子特效
    self.particle = ParticleManager:CreateParticle("particles/heroes/oracle/oracle_fatesedict.vpcf", PATTACH_ABSORIGIN_FOLLOW, self:GetParent())
    ParticleManager:SetParticleControl(self.particle, 0, self:GetParent():GetAbsOrigin())
    
    -- 将粒子特效ID保存到modifier中，确保在销毁时能正确清理
    self:AddParticle(self.particle, false, false, -1, false, false)
end

function modifier_oracle1_fatesedict_ally:OnDestroy()
    -- 不需要手动销毁粒子特效，AddParticle会自动管理
    -- 当modifier被销毁时，粒子特效会自动消失
end

function modifier_oracle1_fatesedict_ally:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

function modifier_oracle1_fatesedict_ally:GetModifierAttackSpeedBonus_Constant()
    return self.attack_speed_bonus
end

function modifier_oracle1_fatesedict_ally:OnAttackLanded(params)
    if not IsServer() then return end
    
    if params.attacker == self:GetParent() then
        local target = params.target
        local damage = params.damage
        
        -- 计算生命偷取
        local lifesteal_amount = damage * (self.lifesteal_percent / 100)
        
        -- 应用生命偷取
        if lifesteal_amount > 0 then
            self:GetParent():Heal(lifesteal_amount, self:GetAbility())
            
            -- 显示生命偷取数字
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, self:GetParent(), lifesteal_amount, nil)
        end
    end
end

-- 友方增益的头顶粒子特效
function modifier_oracle1_fatesedict_ally:GetEffectName()
    return "particles/heroes/axe/troll_warlord_battletrance_buff.vpcf"
end

function modifier_oracle1_fatesedict_ally:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end
