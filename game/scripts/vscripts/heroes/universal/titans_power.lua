-- 泰坦之力技能
-- 根据最大生命值提供伤害增幅

LinkLuaModifier("modifier_titans_power", "heroes/universal/titans_power", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_titans_power_effect", "heroes/universal/titans_power", LUA_MODIFIER_MOTION_NONE)

titans_power = class({})

function titans_power:GetIntrinsicModifierName()
    return "modifier_titans_power"
end

function titans_power:GetAbilityTextureName()
    return "lone_druid_spirit_bear_demolish"
end

-- 全局buff修饰器
modifier_titans_power = class({})

function modifier_titans_power:IsHidden()
    return true
end

function modifier_titans_power:IsPurgable()
    return false
end

function modifier_titans_power:OnCreated()
    if IsServer() then
        self.damage_percent_per_hp = self:GetAbility():GetSpecialValueFor("damage_percent_per_hp")
        print("Titan's Power: Global buff activated, damage percent per HP:", self.damage_percent_per_hp)
        
        -- 定期检查并应用效果到所有己方单位
        self:StartIntervalThink(1.0) -- 每1秒检查一次
    end
end

function modifier_titans_power:OnIntervalThink()
    if IsServer() then
        -- 定期检查新单位并应用效果
        self:ApplyToAllAllies()
    end
end

function modifier_titans_power:ApplyToAllAllies()
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
        
        print("Titan's Power: Found", #allies, "allies")
        
        for _, ally in pairs(allies) do
            if ally and not ally:IsNull() and ally:IsAlive() then
                print("Titan's Power: Processing ally", ally:GetUnitName())
                
                -- 检查是否已经有效果
                if not ally:HasModifier("modifier_titans_power_effect") then
                    ally:AddNewModifier(self:GetCaster(), self:GetAbility(), "modifier_titans_power_effect", {})
                    print("Titan's Power: Applied to", ally:GetUnitName())
                else
                    print("Titan's Power: Already has effect", ally:GetUnitName())
                end
            end
        end
    end
end

-- 效果修饰器
modifier_titans_power_effect = class({})

function modifier_titans_power_effect:IsHidden()
    return false
end

function modifier_titans_power_effect:IsPurgable()
    return false
end

function modifier_titans_power_effect:OnCreated()
    if IsServer() then
        self.damage_percent_per_hp = self:GetAbility():GetSpecialValueFor("damage_percent_per_hp")
        print("Titan's Power Effect: Created for", self:GetParent():GetUnitName(), "damage percent per HP:", self.damage_percent_per_hp)
    end
end

function modifier_titans_power_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE
    }
end

function modifier_titans_power_effect:GetModifierTotalDamageOutgoing_Percentage()
    if IsServer() then
        local parent = self:GetParent()
        if parent and not parent:IsNull() then
            local max_health = parent:GetMaxHealth()
            local damage_bonus = max_health * (self.damage_percent_per_hp / 100.0)
            
            print("Titan's Power: Max HP:", max_health, "Damage bonus:", damage_bonus, "%")
            return damage_bonus
        end
    end
    return 0
end
