-- Oracle Fates Edict技能
-- 为距离最近的敌方单位施加缴械，为距离最近的友方单位增加攻速和生命偷取

oracle1_fatesedict = class({})

LinkLuaModifier("modifier_oracle1_fatesedict_enemy", "heroes/hero_oracle/oracle1_fatesedict.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_oracle1_fatesedict_ally", "heroes/hero_oracle/oracle1_fatesedict.lua", LUA_MODIFIER_MOTION_NONE)

-- 自走棋式自动施法功能
function oracle1_fatesedict:OnCreated()
    if not IsServer() then return end
end

function oracle1_fatesedict:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            -- 移除冷却时间限制，实现真正的0CD
            local current_time = GameRules:GetGameTime()
            -- if current_time - self.last_cast_time < 1.0 then
            --     return 0.5
            -- end
            
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local enemy_search_radius = self:GetSpecialValueFor("enemy_search_radius")
                local nearest_enemy = self:FindNearestEnemy(caster, enemy_search_radius)
                
                if nearest_enemy then
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        
                        local success = pcall(function()
                            caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                        end)
                        
                        if success then
                            self.last_cast_time = current_time
                        else
                        end
                    end
                end
            end
            
            return 0.5
        end
        
        -- 使用 Dota 2 原生的定时器系统
        local function StartTimer()
            CheckAutoCast()
            return 0.5
        end
        
        -- 启动定时器
        GameRules:GetGameModeEntity():SetThink(StartTimer, "OracleFatesEdictAutoCast", 0.1)
    end
end


function oracle1_fatesedict:OnSpellStart()
    local caster = self:GetCaster()
    local enemy_search_radius = self:GetSpecialValueFor("enemy_search_radius")
    
    
    -- 第一步：找到距离最近的敌方单位
    local nearest_enemy = self:FindNearestEnemy(caster, enemy_search_radius)
    
    if not nearest_enemy then
        return
    end
    
    -- 对敌方单位施加缴械效果
    local disarm_duration = self:GetSpecialValueFor("enemy_disarm_duration")
    nearest_enemy:AddNewModifier(caster, self, "modifier_oracle1_fatesedict_enemy", {duration = disarm_duration})
    
    -- 敌方特效交由 modifier 显示/管理，避免在被反制时出现无主粒子残留
    
    
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
        
        -- 友方特效由 ally 修饰器在 OnCreated 中创建与管理
        
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
        
        -- 友方特效由 ally 修饰器在 OnCreated 中创建与管理
        
    end
    
    -- 播放音效
    EmitSoundOn("Hero_Oracle.FatesEdict", caster)
end

-- 找到距离最近的敌方单位（智能选择）
function oracle1_fatesedict:FindNearestEnemy(caster, radius)
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    if #enemies == 0 then
        return nil
    end
    
    -- 如果只有一个敌人，直接返回（无论是否有缴械效果）
    if #enemies == 1 then
        local enemy = enemies[1]
        if enemy:IsAlive() and not enemy:IsNull() then
            return enemy
        end
        return nil
    end
    
    -- 多个敌人时，优先选择没有缴械效果的敌人
    local enemies_without_disarm = {}
    local enemies_with_disarm = {}
    
    for _, enemy in pairs(enemies) do
        if enemy:IsAlive() and not enemy:IsNull() then
            local has_disarm = enemy:HasModifier("modifier_oracle1_fatesedict_enemy")
            if has_disarm then
                table.insert(enemies_with_disarm, enemy)
            else
                table.insert(enemies_without_disarm, enemy)
            end
        end
    end
    
    -- 优先选择没有缴械效果的敌人
    local target_enemies = #enemies_without_disarm > 0 and enemies_without_disarm or enemies_with_disarm
    
    -- 在目标敌人中找到距离最近的
    local nearest_enemy = nil
    local min_distance = math.huge
    
    for _, enemy in pairs(target_enemies) do
        local distance = (enemy:GetAbsOrigin() - caster:GetAbsOrigin()):Length()
        if distance < min_distance then
            min_distance = distance
            nearest_enemy = enemy
        end
    end
    
    return nearest_enemy
end

-- 找到距离指定目标最近的友方单位（智能选择）
function oracle1_fatesedict:FindNearestAllyToTarget(target, radius)
    local allies = FindUnitsInRadius(
        self:GetCaster():GetTeamNumber(),  -- 使用施法者的团队，而不是目标的团队
        target:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    if #allies == 0 then
        return nil
    end
    
    -- 如果只有一个友军，直接返回（无论是否有增益效果）
    if #allies == 1 then
        local ally = allies[1]
        if ally:IsAlive() and not ally:IsNull() then
            return ally
        end
        return nil
    end
    
    -- 多个友军时，优先选择没有增益效果的友军
    local allies_without_buff = {}
    local allies_with_buff = {}
    
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            local has_buff = ally:HasModifier("modifier_oracle1_fatesedict_ally")
            if has_buff then
                table.insert(allies_with_buff, ally)
            else
                table.insert(allies_without_buff, ally)
            end
        end
    end
    
    -- 优先选择没有增益效果的友军
    local target_allies = #allies_without_buff > 0 and allies_without_buff or allies_with_buff
    
    -- 在目标友军中找到距离最近的
    local nearest_ally = nil
    local min_distance = math.huge
    
    for _, ally in pairs(target_allies) do
        local distance = (ally:GetAbsOrigin() - target:GetAbsOrigin()):Length()
        if distance < min_distance then
            min_distance = distance
            nearest_ally = ally
        end
    end
    
    return nearest_ally
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

-- 敌方缴械主体粒子：在修饰器创建时生成并托管，确保被反制时不会创建
function modifier_oracle1_fatesedict_enemy:OnCreated()
    if not IsServer() then return end
    self._fx = ParticleManager:CreateParticle("particles/heroes/oracle/oracle_fatesedict.vpcf", PATTACH_ABSORIGIN_FOLLOW, self:GetParent())
    ParticleManager:SetParticleControl(self._fx, 0, self:GetParent():GetAbsOrigin())
    self:AddParticle(self._fx, false, false, -1, false, false)
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
