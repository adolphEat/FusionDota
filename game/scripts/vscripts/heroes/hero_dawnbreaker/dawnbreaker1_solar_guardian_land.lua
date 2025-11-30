-- Dawnbreaker Solar Guardian Land Ability
-- 持续引导4秒，引导期间为1000范围内的所有己方单位承担30%伤害
-- 引导结束后对1000范围内的所有敌人造成等额承受的伤害

LinkLuaModifier("modifier_dawnbreaker_solar_guardian_channeling", "heroes/hero_dawnbreaker/dawnbreaker1_solar_guardian_land.lua", LUA_MODIFIER_MOTION_NONE)

dawnbreaker1_solar_guardian_land = class({})

-- 自走棋式自动施法功能
function dawnbreaker1_solar_guardian_land:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 首次升级时注册全局伤害过滤器（仅注册一次）
    if not _G.DawnbreakerSolarGuardian_FilterRegistered then
        local mode = GameRules:GetGameModeEntity()
        if mode and mode.SetDamageFilter then
            mode:SetDamageFilter(Dynamic_Wrap(dawnbreaker1_solar_guardian_land, "DamageFilter"), self)
        end
        _G.DawnbreakerSolarGuardian_FilterRegistered = true
    end
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            local current_time = GameRules:GetGameTime()
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                    caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                    self.last_cast_time = current_time
                end
            end
            return 0.1
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_DawnbreakerSolarGuardian_" .. caster:GetEntityIndex(), 0.1)
    end
end

function dawnbreaker1_solar_guardian_land:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not IsValidEntity(caster) then return end
    
    -- 创建引导期间的粒子特效（绑定到施法者）
    local channel_particle = ParticleManager:CreateParticle(
        "particles/heroes/dawnbreaker/dawnbreaker_solar_guardian.vpcf",
        PATTACH_ABSORIGIN_FOLLOW,
        caster
    )
    
    -- 添加引导标记modifier，用于记录总承受伤害和粒子特效
    local modifier = caster:AddNewModifier(caster, self, "modifier_dawnbreaker_solar_guardian_channeling", { duration = 4.0 })
    if modifier then
        modifier.total_damage_taken = 0
        modifier.channel_particle = channel_particle
    end
end

function dawnbreaker1_solar_guardian_land:OnChannelFinish(bInterrupted)
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not IsValidEntity(caster) then return end
    
    -- 获取引导期间承受的总伤害（在销毁modifier之前）
    local modifier = caster:FindModifierByName("modifier_dawnbreaker_solar_guardian_channeling")
    local total_damage = 0
    local channel_particle = nil
    if modifier then
        -- 确保获取到正确的值
        total_damage = modifier.total_damage_taken or 0
        channel_particle = modifier.channel_particle
    end
    
    -- 清理引导期间的粒子特效
    if channel_particle and channel_particle ~= -1 then
        ParticleManager:DestroyParticle(channel_particle, false)
        ParticleManager:ReleaseParticleIndex(channel_particle)
    end
    
    -- 如果引导被中断，不造成伤害
    if bInterrupted then
        -- 移除引导标记
        if modifier then
            modifier:Destroy()
        end
        return
    end
    
    -- 移除引导标记（在确认未中断后）
    if modifier then
        modifier:Destroy()
    end
    
    -- 对范围内的所有敌人造成等额伤害（即使total_damage为0也创建粒子特效）
    local radius = self:GetSpecialValueFor("radius") or 1000
    local caster_pos = caster:GetAbsOrigin()
    
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster_pos,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 创建伤害释放时的粒子特效（在施法者位置）
    local landing_particle = ParticleManager:CreateParticle(
        "particles/heroes/dawnbreaker/dawnbreaker_solar_guardian_landing.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    if landing_particle ~= -1 then
        ParticleManager:SetParticleControl(landing_particle, 0, caster_pos)
        ParticleManager:ReleaseParticleIndex(landing_particle)
    end
    
    -- 对每个敌人造成等额伤害（如果有伤害）
    if total_damage > 0 then
        for _, enemy in pairs(enemies) do
            if IsValidEntity(enemy) and not enemy:IsNull() and enemy:IsAlive() then
                local damage_table = {
                    victim = enemy,
                    attacker = caster,
                    damage = total_damage,
                    damage_type = DAMAGE_TYPE_MAGICAL,
                    ability = self
                }
                ApplyDamage(damage_table)
            end
        end
    end
end

-- 伤害过滤器：拦截己方单位受到的伤害，将30%转移到施法者
function dawnbreaker1_solar_guardian_land:DamageFilter(keys)
    if not IsServer() then return true end
    
    local victim = EntIndexToHScript(keys.entindex_victim_const or -1)
    if not victim or victim:IsNull() then return true end
    
    local damage = tonumber(keys.damage) or 0
    if damage <= 0 then return true end
    
    -- 防止无限循环：如果这次伤害是由本技能转移造成的，直接返回
    if victim._solar_guardian_transfer_damage then
        victim._solar_guardian_transfer_damage = nil
        return true
    end
    
    -- 查找所有正在引导此技能的施法者（使用FindUnitsInRadius查找所有单位）
    local all_units = FindUnitsInRadius(
        DOTA_TEAM_NEUTRALS,
        Vector(0, 0, 0),
        nil,
        FIND_UNITS_EVERYWHERE,
        DOTA_UNIT_TARGET_TEAM_BOTH,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    for _, hero in pairs(all_units) do
        if IsValidEntity(hero) and not hero:IsNull() and hero:IsAlive() then
            local modifier = hero:FindModifierByName("modifier_dawnbreaker_solar_guardian_channeling")
            if modifier then
                -- 检查受害者是否是施法者的队友（包括施法者自己）
                if victim:GetTeamNumber() == hero:GetTeamNumber() then
                    local radius = modifier:GetAbility():GetSpecialValueFor("radius") or 1000
                    local hero_pos = hero:GetAbsOrigin()
                    local victim_pos = victim:GetAbsOrigin()
                    local distance = (victim_pos - hero_pos):Length()
                    
                    -- 检查是否在范围内
                    if distance <= radius then
                        -- 计算需要转移/记录的伤害（30%）
                        local damage_share_percent = modifier:GetAbility():GetSpecialValueFor("damage_share_percent") or 30
                        local damage_to_record = damage * (damage_share_percent / 100.0)
                        
                        if victim == hero then
                            -- 施法者自己受到的伤害：只记录，不转移（因为已经是自己了）
                            -- 但需要减少实际受到的伤害（因为技能描述是"承担30%"）
                            -- 减少施法者实际受到的伤害（30%被"承担"了）
                            keys.damage = damage - damage_to_record
                            
                            -- 记录总承受伤害
                            if modifier.total_damage_taken then
                                modifier.total_damage_taken = modifier.total_damage_taken + damage_to_record
                            else
                                modifier.total_damage_taken = damage_to_record
                            end
                        else
                            -- 其他己方单位受到的伤害：拦截30%并转移给施法者
                            -- 减少受害者的伤害
                            keys.damage = damage - damage_to_record
                            
                            -- 标记这是转移的伤害，防止无限循环
                            hero._solar_guardian_transfer_damage = true
                            
                            -- 对施法者造成转移的伤害（使用DAMAGE_FLAG_NO_SPELL_AMPLIFICATION避免再次触发过滤器）
                            local attacker = nil
                            if keys.entindex_attacker_const then
                                attacker = EntIndexToHScript(keys.entindex_attacker_const)
                            end
                            local damage_table = {
                                victim = hero,
                                attacker = attacker,
                                damage = damage_to_record,
                                damage_type = keys.damagetype_const or DAMAGE_TYPE_PURE,
                                damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
                                ability = modifier:GetAbility()
                            }
                            ApplyDamage(damage_table)
                            
                            -- 清除标记
                            hero._solar_guardian_transfer_damage = nil
                            
                            -- 记录总承受伤害
                            if modifier.total_damage_taken then
                                modifier.total_damage_taken = modifier.total_damage_taken + damage_to_record
                            else
                                modifier.total_damage_taken = damage_to_record
                            end
                        end
                    end
                end
            end
        end
    end
    
    return true
end

---------------------------------------------------------------------------------------------------
-- 引导标记modifier
modifier_dawnbreaker_solar_guardian_channeling = class({})

function modifier_dawnbreaker_solar_guardian_channeling:IsHidden() return true end
function modifier_dawnbreaker_solar_guardian_channeling:IsPurgable() return false end
function modifier_dawnbreaker_solar_guardian_channeling:RemoveOnDeath() return false end

function modifier_dawnbreaker_solar_guardian_channeling:OnCreated(params)
    if not IsServer() then return end
    self.total_damage_taken = 0
    self.damage_reduction_percent = self:GetAbility():GetSpecialValueFor("damage_reduction_percent") or 30
end

function modifier_dawnbreaker_solar_guardian_channeling:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_INCOMING_DAMAGE_PERCENTAGE,  -- 全类型伤害减免
        MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,    -- 魔法免疫
        MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL   -- 绝对魔法免疫（可选，更彻底）
    }
end

-- 30%全类型伤害减免
function modifier_dawnbreaker_solar_guardian_channeling:GetModifierIncomingDamage_Percentage()
    return -self.damage_reduction_percent
end

-- 魔法免疫（100%魔法抗性）
function modifier_dawnbreaker_solar_guardian_channeling:GetModifierMagicalResistanceBonus()
    return 100
end

-- 绝对魔法免疫（确保魔法伤害完全无效）
function modifier_dawnbreaker_solar_guardian_channeling:GetAbsoluteNoDamageMagical()
    return 1
end

function modifier_dawnbreaker_solar_guardian_channeling:OnDestroy()
    if not IsServer() then return end
    -- 清理引导期间的粒子特效（如果modifier被提前销毁）
    if self.channel_particle and self.channel_particle ~= -1 then
        ParticleManager:DestroyParticle(self.channel_particle, false)
        ParticleManager:ReleaseParticleIndex(self.channel_particle)
    end
end


