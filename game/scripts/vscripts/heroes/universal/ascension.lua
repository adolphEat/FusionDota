-- 飞升技能 - 全局buff技能
-- 60秒后触发，所有己方单位获得15%伤害增幅（普攻和技能都享受）

LinkLuaModifier("modifier_ascension", "heroes/universal/ascension", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_ascension_effect", "heroes/universal/ascension", LUA_MODIFIER_MOTION_NONE)

if ascension == nil then
    ascension = class({})
end

function ascension:GetIntrinsicModifierName()
    return "modifier_ascension"
end

function ascension:GetAbilityTextureName()
    return "brewmaster_storm_wind_walk"
end

-- 全局飞升效果修饰符
if modifier_ascension == nil then
    modifier_ascension = class({})
end

function modifier_ascension:IsHidden()
    return false
end

function modifier_ascension:IsPurgable()
    return false
end

function modifier_ascension:IsDebuff()
    return false
end

function modifier_ascension:IsPassive()
    return true
end

function modifier_ascension:GetTexture()
    return "brewmaster_storm_wind_walk"
end

function modifier_ascension:OnCreated()
    if IsServer() then
        -- 从技能配置获取触发延迟和伤害增幅
        self.trigger_delay = self:GetAbility():GetSpecialValueFor("trigger_delay")
        self.damage_amplification = self:GetAbility():GetSpecialValueFor("damage_amplification")
        self.triggered = false
        self.countdown = self.trigger_delay
        
        print("Ascension: Global buff activated, will trigger in", self.trigger_delay, "seconds")
        
        -- 使用全局计时器
        self:StartGlobalTimer()
    end
end

function modifier_ascension:StartGlobalTimer()
    if IsServer() then
        local function TimerThink()
            if not self.triggered and self.countdown > 0 then
                self.countdown = self.countdown - 1.0
                
                -- 每10秒显示一次倒计时
                if self.countdown % 10 == 0 or self.countdown <= 5 then
                    print("Ascension: Countdown", self.countdown, "seconds remaining")
                end
                
                -- 触发飞升效果
                if self.countdown <= 0 then
                    self:TriggerAscension()
                    return nil -- 停止计时器
                end
                
                return 1.0 -- 继续计时器
            elseif self.triggered then
                -- 触发后定期更新友军效果
                self:ApplyAscensionToAllies()
                return 2.0 -- 每2秒更新一次
            end
            return nil -- 停止计时器
        end
        
        -- 启动全局计时器
        GameRules:GetGameModeEntity():SetThink(TimerThink, "AscensionTimer_" .. self:GetParent():GetEntityIndex(), 1.0)
        print("Ascension: Global timer started")
    end
end

function modifier_ascension:TriggerAscension()
    if IsServer() then
        self.triggered = true
        print("Ascension: TRIGGERED! All allies gain", self.damage_amplification, "% damage amplification")
        
        -- 为所有己方单位添加飞升效果
        self:ApplyAscensionToAllies()
    end
end

function modifier_ascension:ApplyAscensionToAllies()
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 获取所有己方单位
    local allies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    print("Ascension: Found", #allies, "allies to empower")
    
    -- 为每个友军单位添加飞升效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            print("Ascension: Processing ally", ally:GetUnitName())
            
            -- 检查是否已经有飞升效果
            if not ally:HasModifier("modifier_ascension_effect") then
                print("Ascension: Applying to", ally:GetUnitName())
                
                -- 直接添加飞升效果修饰符
                local success = pcall(function()
                    ally:AddNewModifier(caster, self:GetAbility(), "modifier_ascension_effect", {})
                end)
                
                if success then
                    print("Ascension: Successfully applied to", ally:GetUnitName())
                else
                    print("Ascension: Failed to apply to", ally:GetUnitName())
                end
            else
                print("Ascension: Already has effect", ally:GetUnitName())
            end
        end
    end
end

function modifier_ascension:OnIntervalThink()
    if IsServer() and self.triggered then
        self:ApplyAscensionToAllies()
    end
end

function modifier_ascension:GetEffectName()
    return "particles/items_fx/aegis_respawn.vpcf"
end

function modifier_ascension:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

function modifier_ascension:OnDestroy()
    if IsServer() then
        -- 停止全局计时器
        local entity_index = self:GetParent():GetEntityIndex()
        GameRules:GetGameModeEntity():SetThink(nil, "AscensionTimer_" .. entity_index, 0)
        print("Ascension: Timer stopped")
    end
end


-- 友军飞升效果修饰符
if modifier_ascension_effect == nil then
    modifier_ascension_effect = class({})
end

function modifier_ascension_effect:IsHidden()
    return false
end

function modifier_ascension_effect:IsPurgable()
    return false
end

function modifier_ascension_effect:IsDebuff()
    return false
end

function modifier_ascension_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE
    }
end

function modifier_ascension_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取伤害增幅
        self.damage_amplification = self:GetAbility():GetSpecialValueFor("damage_amplification")
        print("Ascension Effect: Applied to", self:GetParent():GetUnitName(), "with", self.damage_amplification, "% damage amplification")
    end
end

function modifier_ascension_effect:GetModifierTotalDamageOutgoing_Percentage()
    return self.damage_amplification
end

function modifier_ascension_effect:GetTexture()
    return "brewmaster_storm_wind_walk"
end
