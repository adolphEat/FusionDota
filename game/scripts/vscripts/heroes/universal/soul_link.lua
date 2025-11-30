-- 灵魂连接技能
-- 每5秒治疗自身5%最大生命值

LinkLuaModifier("modifier_soul_link", "heroes/universal/soul_link", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_soul_link_effect", "heroes/universal/soul_link", LUA_MODIFIER_MOTION_NONE)

soul_link = class({})

function soul_link:GetIntrinsicModifierName()
    return "modifier_soul_link"
end

-- 全局buff修饰器
modifier_soul_link = class({})

function modifier_soul_link:IsHidden()
    return true
end

function modifier_soul_link:IsPurgable()
    return false
end

function modifier_soul_link:OnCreated()
    if IsServer() then
        self.heal_interval = self:GetAbility():GetSpecialValueFor("heal_interval")
        self.heal_percent = self:GetAbility():GetSpecialValueFor("heal_percent")
        print("Soul Link: Global buff activated, heal interval:", self.heal_interval, "heal percent:", self.heal_percent)
        
        -- 定期检查并应用效果到所有己方单位
        self:StartIntervalThink(1.0) -- 每1秒检查一次
    end
end

function modifier_soul_link:OnIntervalThink()
    if IsServer() then
        -- 定期检查新单位并应用效果
        self:ApplyToAllAllies()
    end
end

function modifier_soul_link:ApplyToAllAllies()
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
        
        print("Soul Link: Found", #allies, "allies")
        
        for _, ally in pairs(allies) do
            if ally and not ally:IsNull() and ally:IsAlive() then
                print("Soul Link: Processing ally", ally:GetUnitName())
                
                -- 检查是否已经有效果
                if not ally:HasModifier("modifier_soul_link_effect") then
                    ally:AddNewModifier(self:GetCaster(), self:GetAbility(), "modifier_soul_link_effect", {})
                    print("Soul Link: Applied to", ally:GetUnitName())
                else
                    print("Soul Link: Already has effect", ally:GetUnitName())
                end
            end
        end
    end
end

-- 效果修饰器
modifier_soul_link_effect = class({})

function modifier_soul_link_effect:IsHidden()
    return false
end

function modifier_soul_link_effect:IsPurgable()
    return false
end

function modifier_soul_link_effect:OnCreated()
    if IsServer() then
        self.heal_interval = self:GetAbility():GetSpecialValueFor("heal_interval")
        self.heal_percent = self:GetAbility():GetSpecialValueFor("heal_percent")
        self.last_heal_time = 0
        print("Soul Link Effect: Created for", self:GetParent():GetUnitName(), "heal interval:", self.heal_interval, "heal percent:", self.heal_percent)
        
        -- 开始定期治疗
        self:StartIntervalThink(0.5) -- 每0.5秒检查一次
    end
end

function modifier_soul_link_effect:OnIntervalThink()
    if IsServer() then
        local current_time = GameRules:GetGameTime()
        local parent = self:GetParent()
        
        -- 检查是否到了治疗时间
        if current_time - self.last_heal_time >= self.heal_interval then
            self:PerformHeal(parent)
            self.last_heal_time = current_time
        end
    end
end

function modifier_soul_link_effect:PerformHeal(unit)
    if IsServer() then
        local current_health = unit:GetHealth()
        local max_health = unit:GetMaxHealth()
        
        -- 计算治疗量（最大生命值的5%）
        local heal_amount = max_health * (self.heal_percent / 100.0)
        
        -- 计算实际治疗量（不能超过最大生命值）
        local actual_heal = math.min(heal_amount, max_health - current_health)
        
        -- 应用治疗
        if actual_heal > 0 then
            unit:SetHealth(current_health + actual_heal)
            
            -- 显示治疗效果
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, unit, math.floor(actual_heal), nil)
            
            -- 创建治疗粒子效果
            local particle = ParticleManager:CreateParticle("particles/generic_gameplay/generic_lifesteal.vpcf", PATTACH_ABSORIGIN_FOLLOW, unit)
            ParticleManager:SetParticleControl(particle, 0, unit:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(particle)
            
            print("Soul Link: Healed", unit:GetUnitName(), "for", actual_heal, "health (", self.heal_percent, "% of max HP)")
        else
            print("Soul Link:", unit:GetUnitName(), "is at full health")
        end
    end
end
