-- double_cast.lua
-- 全局技能：双重施法
-- 效果：己方所有单位10%概率在释放一次技能之后可以瞬间回复满蓝从而再释放一次技能
-- 需要持续引导的技能在技能停止释放后才进行回蓝

double_cast = class({})

function double_cast:GetIntrinsicModifierName()
    return "modifier_double_cast"
end

LinkLuaModifier("modifier_double_cast", "heroes/universal/double_cast", LUA_MODIFIER_MOTION_NONE)

modifier_double_cast = class({})

function modifier_double_cast:IsHidden()
    return true
end

function modifier_double_cast:IsPurgable()
    return false
end

function modifier_double_cast:IsDebuff()
    return false
end

function modifier_double_cast:OnCreated()
    if not IsServer() then return end
    
    self.ability = self:GetAbility()
    if not self.ability then return end
    
    self.double_cast_chance = self.ability:GetSpecialValueFor("double_cast_chance")
    self.caster = self:GetCaster()
    
    -- 存储每个单位的技能释放状态
    self.unit_abilities = {}
    -- 存储每个单位的双重施法标记（按技能名称）
    self.unit_double_cast_pending = {}
end


function modifier_double_cast:TryAutoCastAbility(unit, ability)
    if not IsValidEntity(unit) or not ability then
        return
    end
    
    -- 检查技能是否可以释放
    if not ability:IsFullyCastable() then
        return
    end
    
    -- 检查单位是否被控制
    if unit:IsSilenced() or unit:IsStunned() or unit:IsChanneling() then
        return
    end
    
    local ability_name = ability:GetName()
    
    -- 特殊技能的双重施法逻辑
    if ability_name == "lion_hex" then
        self:TryCastLionHex(unit, ability)
    elseif ability_name == "treant_protector_living_armor" then
        self:TryCastTreantArmor(unit, ability)
    elseif ability_name == "enchantress1_natures_attendants_heal" then
        self:TryCastEnchantressHeal(unit, ability)
    elseif ability_name == "oracle1_fatesedict" then
        self:TryCastOracleFatesEdict(unit, ability)
    else
        -- 默认双重施法逻辑
        self:TryCastDefaultAbility(unit, ability)
    end
end

-- Lion巫术技能的特殊双重施法逻辑
function modifier_double_cast:TryCastLionHex(unit, ability)
    -- Lion技能本身已经有智能目标选择，直接释放即可
    unit:CastAbilityNoTarget(ability, unit:GetPlayerOwnerID())
end

-- Treant护甲技能的特殊双重施法逻辑
function modifier_double_cast:TryCastTreantArmor(unit, ability)
    -- 检查施法者自己身上的护甲效果是否已经结束
    local has_armor = unit:HasModifier("modifier_treant_protector_living_armor")
    
    if not has_armor then
        -- 上一次护甲效果已结束，可以释放第二次
        unit:CastAbilityNoTarget(ability, unit:GetPlayerOwnerID())
    end
end

-- Enchantress自然之助技能的特殊双重施法逻辑
function modifier_double_cast:TryCastEnchantressHeal(unit, ability)
    -- 检查上一次治疗效果是否已经结束
    local has_heal_effect = unit:HasModifier("modifier_enchantress1_natures_attendants_heal")
    
    if not has_heal_effect then
        -- 上一次治疗效果已结束，可以释放第二次
        unit:CastAbilityNoTarget(ability, unit:GetPlayerOwnerID())
    end
end

-- Oracle命运敕令技能的特殊双重施法逻辑
function modifier_double_cast:TryCastOracleFatesEdict(unit, ability)
    -- Oracle技能本身已经有智能目标选择，直接释放即可
    unit:CastAbilityNoTarget(ability, unit:GetPlayerOwnerID())
end

-- 默认双重施法逻辑
function modifier_double_cast:TryCastDefaultAbility(unit, ability)
    -- 根据技能类型尝试自动释放
    local behavior = ability:GetBehavior()
    
    -- 将userdata转换为数字
    local behavior_num = tonumber(tostring(behavior)) or 0
    
    if bit.band(behavior_num, DOTA_ABILITY_BEHAVIOR_NO_TARGET) ~= 0 then
        -- 无目标技能
        unit:CastAbilityNoTarget(ability, unit:GetPlayerOwnerID())
    elseif bit.band(behavior_num, DOTA_ABILITY_BEHAVIOR_POINT) ~= 0 then
        -- 点目标技能，寻找最近的敌人
        local target = self:FindNearestEnemy(unit)
        if target then
            unit:CastAbilityOnPosition(target:GetAbsOrigin(), ability, unit:GetPlayerOwnerID())
        end
    elseif bit.band(behavior_num, DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) ~= 0 then
        -- 单位目标技能，寻找最近的敌人
        local target = self:FindNearestEnemy(unit)
        if target then
            unit:CastAbilityOnTarget(target, ability, unit:GetPlayerOwnerID())
        end
    end
end

function modifier_double_cast:FindNearestEnemy(unit)
    if not IsValidEntity(unit) then
        return nil
    end
    
    local enemies = FindUnitsInRadius(
        unit:GetTeamNumber(),
        unit:GetAbsOrigin(),
        nil,
        9999,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #enemies > 0 then
        return enemies[1]
    end
    
    return nil
end

function modifier_double_cast:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ABILITY_EXECUTED
    }
end

function modifier_double_cast:OnAbilityExecuted(keys)
    if not IsServer() then return end
    
    local unit = keys.unit
    local ability = keys.ability
    
    print("Ability executed: " .. ability:GetName() .. " by unit: " .. unit:GetName())
    
    -- 确保是己方单位
    if unit:GetTeamNumber() ~= self.caster:GetTeamNumber() then
        print("Not ally unit, skipping")
        return
    end
    
    -- 跳过全局技能
    local ability_name = ability:GetName()
    if string.find(ability_name, "universal_") or string.find(ability_name, "rogue_") or string.find(ability_name, "double_cast") then
        print("Global skill, skipping: " .. ability_name)
        return
    end
    
    -- 跳过被动技能
    if ability:IsPassive() then
        print("Passive skill, skipping: " .. ability_name)
        return
    end
    
    print("Processing skill: " .. ability_name)
    
    local unit_index = unit:GetEntityIndex()
    local skill_key = unit_index .. "_" .. ability_name
    
    -- 对于0冷却技能，使用简化的双重施法逻辑
    local cooldown = ability:GetCooldown(ability:GetLevel())
    print("Skill cooldown check: " .. ability_name .. " cooldown: " .. cooldown)
    if cooldown <= 0 then
        print("0 cooldown skill, checking for double cast: " .. ability_name)
        
        -- 检查是否已经有该技能的双重施法标记
        if self.unit_double_cast_pending[skill_key] then
            print("This is the double cast execution, clearing marker: " .. ability_name)
            -- 这是双重施法的执行，清除标记，让技能正常执行
            self.unit_double_cast_pending[skill_key] = nil
            return
        else
            -- 第一次释放，检查是否触发双重施法
            if RandomInt(1, 100) <= self.double_cast_chance then
                print("First skill cast, triggering double cast: " .. ability_name)
                -- 创建双重施法标记
                self.unit_double_cast_pending[skill_key] = true
                print("Created double cast pending marker for: " .. skill_key)
                
                -- 延迟1秒后触发双重施法
                local timer_name = "double_cast_delay_" .. skill_key
                GameRules:GetGameModeEntity():SetThink(function()
                    if not IsValidEntity(unit) or not IsValidEntity(ability) then
                        return nil
                    end
                    
                    print("Executing double cast for: " .. ability_name)
                    -- 恢复满蓝
                    local max_mana = unit:GetMaxMana()
                    unit:SetMana(max_mana)
                    
                    -- 显示消息
                    SendOverheadEventMessage(nil, OVERHEAD_ALERT_MANA_ADD, unit, max_mana, nil)
                    
                    -- 尝试释放技能
                    self:TryAutoCastAbility(unit, ability)
                    
                    return nil
                end, timer_name, 1.0)
            end
        end
        return
    end
    
    print("Skill with cooldown: " .. ability_name .. " cooldown: " .. cooldown)
    
    -- 延迟检查技能是否释放完成（仅对有冷却的技能）
    local timer_name = "double_cast_cooldown_timer_" .. skill_key
    GameRules:GetGameModeEntity():SetThink(function()
        if not IsValidEntity(unit) or not IsValidEntity(ability) then
            return nil -- 停止定时器
        end
        
        -- 检查技能是否在冷却中（表示释放完成）
        if not ability:IsCooldownReady() then
            -- 100%概率触发双重施法（测试用）
            if RandomInt(1, 100) <= self.double_cast_chance then
                print("Double cast triggered for " .. ability_name)
                -- 恢复满蓝
                local max_mana = unit:GetMaxMana()
                unit:SetMana(max_mana)
                
                -- 显示消息
                SendOverheadEventMessage(nil, OVERHEAD_ALERT_MANA_ADD, unit, max_mana, nil)
                
                -- 尝试释放技能
                self:TryAutoCastAbility(unit, ability)
            end
        end
        return nil -- 停止定时器
    end, timer_name, 0.2)
end
