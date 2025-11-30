-- 蓝电池技能
-- 提供技能伤害增幅和释放技能后回蓝效果

LinkLuaModifier("modifier_blue_battery", "heroes/universal/blue_battery", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_blue_battery_effect", "heroes/universal/blue_battery", LUA_MODIFIER_MOTION_NONE)

blue_battery = class({})

function blue_battery:GetIntrinsicModifierName()
    return "modifier_blue_battery"
end

-- 全局buff修饰器
modifier_blue_battery = class({})

function modifier_blue_battery:IsHidden()
    return true
end

function modifier_blue_battery:IsPurgable()
    return false
end

function modifier_blue_battery:OnCreated()
    if IsServer() then
        self.spell_damage_amp = self:GetAbility():GetSpecialValueFor("spell_damage_amp")
        self.mana_restore = self:GetAbility():GetSpecialValueFor("mana_restore")
        print("Blue Battery: Global buff activated, spell damage amp:", self.spell_damage_amp, "mana restore:", self.mana_restore)
        
        -- 定期检查并应用效果到所有己方单位
        self:StartIntervalThink(1.0) -- 每1秒检查一次
    end
end

function modifier_blue_battery:OnIntervalThink()
    if IsServer() then
        -- 定期检查新单位并应用效果
        self:ApplyToAllAllies()
    end
end

function modifier_blue_battery:ApplyToAllAllies()
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
        
        print("Blue Battery: Found", #allies, "allies")
        
        for _, ally in pairs(allies) do
            if ally and not ally:IsNull() and ally:IsAlive() then
                print("Blue Battery: Processing ally", ally:GetUnitName())
                
                -- 检查是否已经有效果
                if not ally:HasModifier("modifier_blue_battery_effect") then
                    ally:AddNewModifier(self:GetCaster(), self:GetAbility(), "modifier_blue_battery_effect", {})
                    print("Blue Battery: Applied to", ally:GetUnitName())
                else
                    print("Blue Battery: Already has effect", ally:GetUnitName())
                end
            end
        end
    end
end

-- 效果修饰器
modifier_blue_battery_effect = class({})

function modifier_blue_battery_effect:IsHidden()
    return false
end

function modifier_blue_battery_effect:IsPurgable()
    return false
end

function modifier_blue_battery_effect:OnCreated()
    if IsServer() then
        self.spell_damage_amp = self:GetAbility():GetSpecialValueFor("spell_damage_amp")
        self.mana_restore = self:GetAbility():GetSpecialValueFor("mana_restore")
        print("Blue Battery Effect: Created for", self:GetParent():GetUnitName(), "spell amp:", self.spell_damage_amp, "mana restore:", self.mana_restore)
    end
end

function modifier_blue_battery_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_SPELL_AMPLIFY_PERCENTAGE,
        MODIFIER_EVENT_ON_ABILITY_EXECUTED
    }
end

function modifier_blue_battery_effect:GetModifierSpellAmplify_Percentage()
    return self.spell_damage_amp
end

function modifier_blue_battery_effect:OnAbilityExecuted(params)
    if IsServer() then
        local unit = params.unit
        local ability = params.ability
        
        -- 检查是否是当前单位释放的技能
        if unit == self:GetParent() then
            print("Blue Battery: Ability executed by", unit:GetUnitName(), "ability:", ability:GetName())
            
            -- 恢复蓝量
            local current_mana = unit:GetMana()
            local max_mana = unit:GetMaxMana()
            local new_mana = math.min(current_mana + self.mana_restore, max_mana)
            local actual_restore = new_mana - current_mana
            
            if actual_restore > 0 then
                unit:SetMana(new_mana)
                
                -- 显示回蓝效果
                SendOverheadEventMessage(nil, OVERHEAD_ALERT_MANA_ADD, unit, actual_restore, nil)
                
                -- 创建回蓝粒子效果
                local particle = ParticleManager:CreateParticle("particles/generic_gameplay/generic_manaburn.vpcf", PATTACH_ABSORIGIN_FOLLOW, unit)
                ParticleManager:SetParticleControl(particle, 0, unit:GetAbsOrigin())
                ParticleManager:ReleaseParticleIndex(particle)
                
                print("Blue Battery: Restored", actual_restore, "mana to", unit:GetUnitName())
            else
                print("Blue Battery:", unit:GetUnitName(), "is at full mana")
            end
        end
    end
end
