-- 卢登的回声技能
-- 释放技能后，下次普攻附带法力消耗值的魔法伤害

LinkLuaModifier("modifier_ludens_echo", "heroes/universal/ludens_echo", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_ludens_echo_effect", "heroes/universal/ludens_echo", LUA_MODIFIER_MOTION_NONE)

ludens_echo = class({})

function ludens_echo:GetIntrinsicModifierName()
    return "modifier_ludens_echo"
end

function ludens_echo:GetAbilityTextureName()
    return "wisp_tether"
end

-- 全局buff修饰器
modifier_ludens_echo = class({})

function modifier_ludens_echo:IsHidden()
    return true
end

function modifier_ludens_echo:IsPurgable()
    return false
end

function modifier_ludens_echo:OnCreated()
    if IsServer() then
        self.damage_multiplier = self:GetAbility():GetSpecialValueFor("damage_multiplier")
        print("Luden's Echo: Global buff activated, damage multiplier:", self.damage_multiplier)
        
        -- 定期检查并应用效果到所有己方单位
        self:StartIntervalThink(1.0) -- 每1秒检查一次
    end
end

function modifier_ludens_echo:OnIntervalThink()
    if IsServer() then
        -- 定期检查新单位并应用效果
        self:ApplyToAllAllies()
    end
end

function modifier_ludens_echo:ApplyToAllAllies()
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
        
        print("Luden's Echo: Found", #allies, "allies")
        
        for _, ally in pairs(allies) do
            if ally and not ally:IsNull() and ally:IsAlive() then
                print("Luden's Echo: Processing ally", ally:GetUnitName())
                
                -- 检查是否已经有效果
                if not ally:HasModifier("modifier_ludens_echo_effect") then
                    ally:AddNewModifier(self:GetCaster(), self:GetAbility(), "modifier_ludens_echo_effect", {})
                    print("Luden's Echo: Applied to", ally:GetUnitName())
                else
                    print("Luden's Echo: Already has effect", ally:GetUnitName())
                end
            end
        end
    end
end

-- 效果修饰器
modifier_ludens_echo_effect = class({})

function modifier_ludens_echo_effect:IsHidden()
    return false
end

function modifier_ludens_echo_effect:IsPurgable()
    return false
end

function modifier_ludens_echo_effect:OnCreated()
    if IsServer() then
        self.damage_multiplier = self:GetAbility():GetSpecialValueFor("damage_multiplier")
        self.pending_damage = 0
        self.has_pending_damage = false
        print("Luden's Echo Effect: Created for", self:GetParent():GetUnitName(), "damage multiplier:", self.damage_multiplier)
    end
end

function modifier_ludens_echo_effect:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ABILITY_EXECUTED,
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

function modifier_ludens_echo_effect:OnAbilityExecuted(params)
    if IsServer() then
        local unit = params.unit
        local ability = params.ability
        
        -- 检查是否是当前单位释放的技能
        if unit == self:GetParent() then
            local mana_cost = ability:GetManaCost(ability:GetLevel())
            
            if mana_cost > 0 then
                -- 计算魔法伤害（法力消耗值 × 倍数）
                self.pending_damage = mana_cost * self.damage_multiplier
                self.has_pending_damage = true
                
                print("Luden's Echo: Ability executed by", unit:GetUnitName(), "ability:", ability:GetName(), "mana cost:", mana_cost, "pending damage:", self.pending_damage)
            end
        end
    end
end

function modifier_ludens_echo_effect:OnAttackLanded(params)
    if IsServer() then
        local attacker = params.attacker
        local target = params.target
        
        -- 检查是否是当前单位的攻击且有待处理的伤害
        if attacker == self:GetParent() and self.has_pending_damage then
            -- 应用魔法伤害
            local damage_table = {
                victim = target,
                attacker = attacker,
                damage = self.pending_damage,
                damage_type = DAMAGE_TYPE_MAGICAL,
                damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
                ability = self:GetAbility()
            }
            ApplyDamage(damage_table)
            
            -- 创建魔法伤害粒子效果
            local particle = ParticleManager:CreateParticle("particles/units/heroes/hero_zeus/zeus_lightning_bolt.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
            ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(particle)
            
            -- 显示魔法伤害数字
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_DAMAGE, target, math.floor(self.pending_damage), nil)
            
            print("Luden's Echo: Applied", self.pending_damage, "magical damage to", target:GetUnitName())
            
            -- 重置待处理伤害
            self.pending_damage = 0
            self.has_pending_damage = false
        end
    end
end
