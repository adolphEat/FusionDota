-- 过量治疗技能
-- 每第三次攻击造成额外伤害并治疗

LinkLuaModifier("modifier_overheal", "heroes/universal/overheal", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_overheal_effect", "heroes/universal/overheal", LUA_MODIFIER_MOTION_NONE)

overheal = class({})

function overheal:GetIntrinsicModifierName()
    return "modifier_overheal"
end

function overheal:GetAbilityTextureName()
    return "lone_druid_spirit_bear_return"
end

-- 全局buff修饰器
modifier_overheal = class({})

function modifier_overheal:IsHidden()
    return true
end

function modifier_overheal:IsPurgable()
    return false
end

function modifier_overheal:OnCreated()
    if IsServer() then
        self.attack_count = self:GetAbility():GetSpecialValueFor("attack_count")
        self.bonus_damage_percent = self:GetAbility():GetSpecialValueFor("bonus_damage_percent")
        self.heal_percent = self:GetAbility():GetSpecialValueFor("heal_percent")
        print("Overheal: Global buff activated, attack count:", self.attack_count, "bonus damage:", self.bonus_damage_percent, "heal percent:", self.heal_percent)
        
        -- 定期检查并应用效果到所有己方单位
        self:StartIntervalThink(1.0) -- 每1秒检查一次
    end
end

function modifier_overheal:OnIntervalThink()
    if IsServer() then
        -- 定期检查新单位并应用效果
        self:ApplyToAllAllies()
    end
end

function modifier_overheal:ApplyToAllAllies()
    if IsServer() then
        local allies = FindUnitsInRadius(
            DOTA_TEAM_GOODGUYS,
            Vector(0, 0, 0),
            nil,
            FIND_UNITS_EVERYWHERE,
            DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        print("Overheal: Found", #allies, "allies")
        
        for _, ally in pairs(allies) do
            if ally and not ally:IsNull() and ally:IsAlive() then
                print("Overheal: Processing ally", ally:GetUnitName())
                
                -- 检查是否已经有效果
                if not ally:HasModifier("modifier_overheal_effect") then
                    ally:AddNewModifier(self:GetCaster(), self:GetAbility(), "modifier_overheal_effect", {})
                    print("Overheal: Applied to", ally:GetUnitName())
                else
                    print("Overheal: Already has effect", ally:GetUnitName())
                end
            end
        end
    end
end

-- 效果修饰器
modifier_overheal_effect = class({})

function modifier_overheal_effect:IsHidden()
    return false
end

function modifier_overheal_effect:IsPurgable()
    return false
end

function modifier_overheal_effect:OnCreated()
    if IsServer() then
        self.attack_count = self:GetAbility():GetSpecialValueFor("attack_count")
        self.bonus_damage_percent = self:GetAbility():GetSpecialValueFor("bonus_damage_percent")
        self.heal_percent = self:GetAbility():GetSpecialValueFor("heal_percent")
        self.current_attack_count = 0
        print("Overheal Effect: Created for", self:GetParent():GetUnitName(), "attack count:", self.attack_count, "bonus damage:", self.bonus_damage_percent)
    end
end

function modifier_overheal_effect:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

function modifier_overheal_effect:OnAttackLanded(params)
    if IsServer() then
        local attacker = params.attacker
        local target = params.target
        local damage = params.damage
        
        -- 检查是否是当前单位的攻击
        if attacker == self:GetParent() then
            self.current_attack_count = self.current_attack_count + 1
            print("Overheal: Attack", self.current_attack_count, "by", attacker:GetUnitName())
            
            -- 检查是否达到触发次数
            if self.current_attack_count >= self.attack_count then
                self.current_attack_count = 0 -- 重置计数
                print("Overheal: Triggering special attack!")
                
                -- 计算额外伤害
                local bonus_damage = damage * (self.bonus_damage_percent / 100.0)
                local total_damage = damage + bonus_damage
                
                -- 应用额外伤害
                local damage_table = {
                    victim = target,
                    attacker = attacker,
                    damage = bonus_damage,
                    damage_type = DAMAGE_TYPE_PHYSICAL,
                    damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
                    ability = self:GetAbility()
                }
                ApplyDamage(damage_table)
                
                -- 计算治疗量
                local heal_amount = total_damage * (self.heal_percent / 100.0)
                
                -- 应用治疗
                self:ApplyHeal(attacker, heal_amount)
                
                -- 创建视觉效果
                self:CreateEffects(attacker, target)
                
                print("Overheal: Applied", bonus_damage, "bonus damage and", heal_amount, "heal")
            end
        end
    end
end

function modifier_overheal_effect:ApplyHeal(unit, heal_amount)
    if IsServer() then
        local current_health = unit:GetHealth()
        local max_health = unit:GetMaxHealth()
        
        -- 计算实际治疗量（不能超过最大生命值）
        local actual_heal = math.min(heal_amount, max_health - current_health)
        
        -- 应用治疗
        if actual_heal > 0 then
            unit:SetHealth(current_health + actual_heal)
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, unit, math.floor(actual_heal), nil)
            
            -- 创建治疗粒子效果
            local particle = ParticleManager:CreateParticle("particles/generic_gameplay/generic_lifesteal.vpcf", PATTACH_ABSORIGIN_FOLLOW, unit)
            ParticleManager:SetParticleControl(particle, 0, unit:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(particle)
        end
        
        print("Overheal: Healed", actual_heal, "health")
    end
end

function modifier_overheal_effect:CreateEffects(attacker, target)
    if IsServer() then
        -- 攻击者效果
        local attacker_particle = ParticleManager:CreateParticle("particles/units/heroes/hero_bloodseeker/bloodseeker_bloodbath.vpcf", PATTACH_ABSORIGIN_FOLLOW, attacker)
        ParticleManager:SetParticleControl(attacker_particle, 0, attacker:GetAbsOrigin())
        ParticleManager:ReleaseParticleIndex(attacker_particle)
        
        -- 目标效果
        local target_particle = ParticleManager:CreateParticle("particles/units/heroes/hero_bloodseeker/bloodseeker_rupture.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
        ParticleManager:SetParticleControl(target_particle, 0, target:GetAbsOrigin())
        ParticleManager:ReleaseParticleIndex(target_particle)
    end
end

