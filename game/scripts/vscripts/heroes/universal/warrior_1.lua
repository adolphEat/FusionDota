-- 斗士1羁绊技能 - 全局buff技能
-- 所有友军增加100点最大生命值，斗士单位增加双倍（200点最大生命值）
-- 斗士单位：树精卫士(treant_protector1)、敌法师(anti_mage1)、食人魔法师(ogre_magi1)、斧王(axe1)

-- 全局表：记录每个单位的原始最大生命值（以单位实体索引为键）
WarriorOriginalHealth = WarriorOriginalHealth or {}
-- 全局表：记录哪些单位已经被处理过（计数为1的单位不再修改生命值）
WarriorProcessedUnits = WarriorProcessedUnits or {}
-- 全局表：记录羁绊监听器（用于管理事件监听）
WarriorListeners = WarriorListeners or {
    list = {},  -- 监听器列表
    event_registered = false,  -- 事件是否已注册
    death_event_registered = false  -- 死亡事件是否已注册
}

LinkLuaModifier("modifier_warrior_1", "heroes/universal/warrior_1", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_warrior_1_effect", "heroes/universal/warrior_1", LUA_MODIFIER_MOTION_NONE)

if warrior_1 == nil then
    warrior_1 = class({})
end

function warrior_1:GetIntrinsicModifierName()
    return "modifier_warrior_1"
end

function warrior_1:GetAbilityTextureName()
    return "beastmaster_primal_roar"
end

-- 全局斗士羁绊效果修饰符
if modifier_warrior_1 == nil then
    modifier_warrior_1 = class({})
end

function modifier_warrior_1:IsHidden()
    return false
end

function modifier_warrior_1:IsPurgable()
    return false
end

function modifier_warrior_1:IsDebuff()
    return false
end

function modifier_warrior_1:IsPassive()
    return true
end

function modifier_warrior_1:GetTexture()
    return "beastmaster_primal_roar"
end

-- 斗士单位列表
function modifier_warrior_1:IsWarriorUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local warrior_units = {
        "treant_protector1",  -- 树精卫士
        "anti_mage1",         -- 敌法师
        "ogre_magi1",         -- 食人魔法师
        "axe1"                -- 斧王
    }
    
    for _, warrior_name in pairs(warrior_units) do
        if unit_name == warrior_name then
            return true
        end
    end
    
    return false
end

function modifier_warrior_1:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 为所有己方单位添加生命值加成效果
        self:ApplyWarriorEffectToAllies()
        
        -- 注册单位创建事件监听（只在第一次注册）
        if not WarriorListeners.event_registered then
            WarriorListeners.event_registered = true
            ListenToGameEvent("npc_spawned", function(event)
                modifier_warrior_1:OnNPCSpawned(event)
            end, nil)
        end
        
        -- 注册单位死亡事件监听（只在第一次注册）
        if not WarriorListeners.death_event_registered then
            WarriorListeners.death_event_registered = true
            ListenToGameEvent("entity_killed", function(keys)
                local killed_unit = EntIndexToHScript(keys.entindex_killed)
                if killed_unit and not killed_unit:IsNull() then
                    modifier_warrior_1:OnUnitDeath(killed_unit)
                end
            end, nil)
        end
        
        -- 将当前 modifier 添加到监听器列表
        table.insert(WarriorListeners.list, self)
        
        -- 定期检查并更新所有友军的斗士效果（作为备用机制）
        self:StartIntervalThink(2.0)
    end
end

-- 单位死亡事件处理函数（静态方法）
function modifier_warrior_1:OnUnitDeath(dead_unit)
    if not IsServer() then return end
    if not dead_unit or dead_unit:IsNull() then return end
    
    -- 检查是否有活动的羁绊监听器
    if #WarriorListeners.list == 0 then return end
    
    -- 检查死亡单位是否是绑定单位（拥有modifier_warrior_1的单位）
    for _, listener in ipairs(WarriorListeners.list) do
        if listener and not listener:IsNull() then
            local caster = listener:GetCaster()
            if caster and not caster:IsNull() and caster == dead_unit then
                -- 绑定单位死亡，移除所有单位上的buff
                listener:RemoveAllWarriorBuffs()
                break
            end
        end
    end
end

-- 移除所有单位上的斗士buff
function modifier_warrior_1:RemoveAllWarriorBuffs()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if caster and not caster:IsNull() then
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
        
        -- 移除所有单位上的斗士生命值加成效果
        for _, ally in pairs(allies) do
            if ally and not ally:IsNull() then
                if ally:HasModifier("modifier_warrior_1_effect") then
                    ally:RemoveModifierByName("modifier_warrior_1_effect")
                end
            end
        end
    end
end

function modifier_warrior_1:OnDestroy()
    if IsServer() then
        -- 停止定时器，防止重新添加buff
        self:StartIntervalThink(-1)
        
        -- 当buff失效时，移除所有单位上的buff
        self:RemoveAllWarriorBuffs()
        
        -- 从监听器列表中移除（如果还在列表中）
        for i, listener in ipairs(WarriorListeners.list) do
            if listener == self then
                table.remove(WarriorListeners.list, i)
                break
            end
        end
    end
end

-- 单位创建事件处理函数（静态方法）
function modifier_warrior_1:OnNPCSpawned(event)
    if not IsServer() then return end
    if not event or not event.entindex then return end
    
    local unit = EntIndexToHScript(event.entindex)
    if not unit or unit:IsNull() then return end
    
    -- 检查是否有活动的羁绊监听器（如果羁绊失效，列表为空，直接返回）
    if #WarriorListeners.list == 0 then return end
    
    -- 检查单位是否是友军
    local first_listener = nil
    for _, listener in ipairs(WarriorListeners.list) do
        if listener and not listener:IsNull() then
            first_listener = listener
            break
        end
    end
    
    if not first_listener then return end
    
    local caster = first_listener:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 只处理友军单位
    if unit:GetTeamNumber() ~= caster:GetTeamNumber() then return end
    
    -- 检查单位类型（包括所有单位类型：英雄、小兵、召唤物等）
    -- 排除建筑物和无效单位
    if not unit:IsBuilding() and (unit:IsHero() or unit:IsCreature() or unit:IsOther()) then
        -- 延迟一小段时间，确保单位完全初始化
        GameRules:GetGameModeEntity():SetThink(function()
            -- 再次检查是否有活动的羁绊（羁绊可能在这期间失效）
            if #WarriorListeners.list == 0 then return nil end
            
            if unit and not unit:IsNull() then
                -- 检查是否有活动的羁绊
                for _, listener in ipairs(WarriorListeners.list) do
                    if listener and not listener:IsNull() then
                        local ability = listener:GetAbility()
                        if ability and not ability:IsNull() then
                            -- 检查单位是否已经有 modifier
                            if not unit:HasModifier("modifier_warrior_1_effect") then
                                -- 添加 modifier
                                local success, result = pcall(function()
                                    return unit:AddNewModifier(listener:GetCaster(), ability, "modifier_warrior_1_effect", {})
                                end)
                                if success then
                                    return nil -- 成功添加后停止定时器
                                end
                            else
                                return nil -- 已经有 modifier，停止定时器
                            end
                        end
                    end
                end
            end
            return nil -- 停止定时器
        end, "Warrior1_UnitSpawn_" .. unit:GetEntityIndex(), 0.1)
    end
end

function modifier_warrior_1:OnIntervalThink()
    if IsServer() then
        -- 检查绑定单位是否还活着
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or not caster:IsAlive() then
            -- 绑定单位已死亡，停止定时器并移除所有buff
            self:RemoveAllWarriorBuffs()
            return nil  -- 停止定时器
        end
        
        self:ApplyWarriorEffectToAllies()
    end
    return 2.0  -- 继续定时器
end

function modifier_warrior_1:ApplyWarriorEffectToAllies()
    local caster = self:GetCaster()
    if not caster or caster:IsNull() or not caster:IsAlive() then return end
    
    local ability = self:GetAbility()
    if not ability or ability:IsNull() then return end
    
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
    
    -- 为每个己方单位添加生命值加成效果
    for _, ally in pairs(allies) do
        if ally and not ally:IsNull() then
            local unit_name = ally:GetUnitName()
            local is_hero = ally:IsHero()
            
            -- 检查是否已经有斗士生命值加成效果
            if not ally:HasModifier("modifier_warrior_1_effect") then
                -- 对于非英雄单位，确保单位已经完全初始化
                if not is_hero then
                    local max_health = ally:GetMaxHealth()
                    if max_health <= 0 or max_health == nil then
                        -- 如果最大生命值无效，延迟添加 modifier
                        GameRules:GetGameModeEntity():SetThink(function()
                            if ally and not ally:IsNull() and not ally:HasModifier("modifier_warrior_1_effect") then
                                local success, result = pcall(function()
                                    return ally:AddNewModifier(caster, ability, "modifier_warrior_1_effect", {})
                                end)
                                if not success then
                                    -- 添加 modifier 失败，静默处理
                                end
                            end
                            return nil
                        end, "Warrior1_DelayedAdd_" .. ally:GetEntityIndex(), 0.2)
                    else
                        -- 最大生命值有效，直接添加
                        local success, result = pcall(function()
                            return ally:AddNewModifier(caster, ability, "modifier_warrior_1_effect", {})
                        end)
                        if not success then
                            -- 添加 modifier 失败，静默处理
                        end
                    end
                else
                    -- 英雄单位或类英雄单位（如风行者），直接添加
                    -- 但也要确保单位已经完全初始化
                    local max_health = ally:GetMaxHealth()
                    if max_health <= 0 or max_health == nil then
                        -- 如果最大生命值无效，延迟添加 modifier
                        GameRules:GetGameModeEntity():SetThink(function()
                            if ally and not ally:IsNull() and not ally:HasModifier("modifier_warrior_1_effect") then
                                local success, result = pcall(function()
                                    return ally:AddNewModifier(caster, ability, "modifier_warrior_1_effect", {})
                                end)
                                if not success then
                                    -- 添加 modifier 失败，静默处理
                                end
                            end
                            return nil
                        end, "Warrior1_DelayedAdd_Hero_" .. ally:GetEntityIndex(), 0.1)
                    else
                        -- 最大生命值有效，直接添加
                        local success, result = pcall(function()
                            return ally:AddNewModifier(caster, ability, "modifier_warrior_1_effect", {})
                        end)
                        if not success then
                            -- 添加 modifier 失败，静默处理
                        end
                    end
                end
            end
        end
    end
end

-- 己方单位生命值加成效果修饰符
if modifier_warrior_1_effect == nil then
    modifier_warrior_1_effect = class({})
end

function modifier_warrior_1_effect:IsHidden()
    return false
end

function modifier_warrior_1_effect:IsPurgable()
    return false
end

function modifier_warrior_1_effect:IsDebuff()
    return false
end

function modifier_warrior_1_effect:DeclareFunctions()
    return {
        -- 不使用 MODIFIER_PROPERTY_HEALTH_BONUS，改用直接设置最大生命值
        -- 使用 OnIntervalThink 持续维护生命值
        -- 监听 modifier 添加/移除事件，以便在 modifier 变化时立即恢复生命值
        MODIFIER_EVENT_ON_MODIFIER_ADDED,
        MODIFIER_EVENT_ON_MODIFIER_REMOVED
    }
end

function modifier_warrior_1_effect:OnCreated(params)
    if IsServer() then
        local parent = self:GetParent()
        if not parent or parent:IsNull() then return end
        
        local unit_index = parent:GetEntityIndex()
        local unit_name = parent:GetUnitName()
        
        -- 检查该单位是否已经被处理过（计数为1）
        -- 如果已经处理过，直接返回，不再处理
        if WarriorProcessedUnits[unit_index] then
            return
        end
        
        -- 立即标记该单位正在处理中（防止重复处理）
        WarriorProcessedUnits[unit_index] = true
        
        -- 为所有单位启动持续维护机制（防止被其他系统重置生命值）
        -- 使用合理的检查频率（1秒），只在真正需要时才恢复
        self:StartIntervalThink(1.0)
        
        -- 延迟处理，确保单位完全初始化（非英雄单位可能需要更长时间）
        local is_hero = parent:IsHero()
        local delay = is_hero and 0.1 or 0.3
        GameRules:GetGameModeEntity():SetThink(function()
            if not parent or parent:IsNull() then 
                -- 如果单位无效，清除标记
                WarriorProcessedUnits[unit_index] = nil
                return nil 
            end
            
            -- 对于所有单位，确保单位已经完全初始化（检查最大生命值是否有效）
            local max_health = parent:GetMaxHealth()
            if max_health <= 0 or max_health == nil then
                -- 如果最大生命值无效，再延迟一段时间
                return 0.1
            end
            
            -- 从技能配置获取生命值加成
            local ability = self:GetAbility()
            local health_bonus = 100.0
            local warrior_health_bonus = 200.0
            
            if ability and not ability:IsNull() then
                health_bonus = ability:GetSpecialValueFor("health_bonus") or 100.0
                warrior_health_bonus = ability:GetSpecialValueFor("warrior_health_bonus") or 200.0
            end
            
            -- 检查是否是斗士单位
            local unit_name = parent:GetUnitName()
            local warrior_units = {
                "treant_protector1",  -- 树精卫士
                "anti_mage1",         -- 敌法师
                "ogre_magi1",         -- 食人魔法师
                "axe1"                -- 斧王
            }
            
            local is_warrior = false
            for _, warrior_name in pairs(warrior_units) do
                if unit_name == warrior_name then
                    is_warrior = true
                    break
                end
            end
            
            -- 计算应该增加的生命值
            local bonus_health = is_warrior and warrior_health_bonus or health_bonus
            
            -- 使用全局表记录原始最大生命值（只在第一次记录）
            local current_max_health = parent:GetMaxHealth()
            if not WarriorOriginalHealth[unit_index] then
                -- 直接记录当前值作为原始值（假设这是第一次应用）
                WarriorOriginalHealth[unit_index] = current_max_health
            end
            
            -- 获取原始最大生命值
            local original_max_health = WarriorOriginalHealth[unit_index]
            
            -- 获取当前生命值
            local current_health = parent:GetHealth()
            
            -- 直接设置新的最大生命值
            local new_max_health = original_max_health + bonus_health
            parent:SetMaxHealth(new_max_health)
            
            -- 再次延迟，确保最大生命值设置生效
            GameRules:GetGameModeEntity():SetThink(function()
                if parent and not parent:IsNull() then
                    -- 再次确认最大生命值已更新
                    local actual_max_health = parent:GetMaxHealth()
                    if math.abs(actual_max_health - new_max_health) > 1 then
                        -- 如果最大生命值没有正确设置，再次设置
                        parent:SetMaxHealth(new_max_health)
                    end
                    
                    -- 同时增加当前生命值（直接加上增加的生命值）
                    local current_health_now = parent:GetHealth()
                    local new_current_health = current_health_now + bonus_health
                    -- 确保不超过新的最大生命值
                    new_current_health = math.min(new_current_health, new_max_health)
                    parent:SetHealth(new_current_health)
                end
                return nil -- 停止定时器
            end, "Warrior1_ApplyHealth_" .. unit_index, 0.05)
            
            return nil -- 停止定时器
        end, "Warrior1_InitHealth_" .. unit_index, delay)
    end
end

-- 当 modifier 被添加时，立即检查并恢复生命值（防止被重置）
function modifier_warrior_1_effect:OnModifierAdded(params)
    if not IsServer() then return end
    
    -- 只处理我们自己的单位
    if params.unit ~= self:GetParent() then return end
    
    -- 延迟一小段时间，让 Dota 2 完成属性重新计算
    local parent = self:GetParent()
    if parent and not parent:IsNull() then
        GameRules:GetGameModeEntity():SetThink(function()
            if parent and not parent:IsNull() and parent:IsAlive() then
                self:RestoreHealthIfNeeded()
            end
            return nil
        end, "Warrior1_OnModifierAdded_" .. parent:GetEntityIndex(), 0.1)
    end
end

-- 当 modifier 被移除时，立即检查并恢复生命值（防止被重置）
function modifier_warrior_1_effect:OnModifierRemoved(params)
    if not IsServer() then return end
    
    -- 只处理我们自己的单位
    if params.unit ~= self:GetParent() then return end
    
    -- 延迟一小段时间，让 Dota 2 完成属性重新计算
    local parent = self:GetParent()
    if parent and not parent:IsNull() then
        GameRules:GetGameModeEntity():SetThink(function()
            if parent and not parent:IsNull() and parent:IsAlive() then
                self:RestoreHealthIfNeeded()
            end
            return nil
        end, "Warrior1_OnModifierRemoved_" .. parent:GetEntityIndex(), 0.1)
    end
end

-- 恢复生命值的辅助函数（供事件回调和OnIntervalThink使用）
function modifier_warrior_1_effect:RestoreHealthIfNeeded()
    if not IsServer() then return end
    
    local parent = self:GetParent()
    if not parent or parent:IsNull() or not parent:IsAlive() then
        return
    end
    
    local unit_index = parent:GetEntityIndex()
    
    -- 如果该单位还没有完成处理，不在这里处理（等待 OnCreated 中的延迟处理完成）
    if not WarriorProcessedUnits[unit_index] then
        return
    end
    
    -- 确保原始最大生命值已记录
    if not WarriorOriginalHealth[unit_index] then
        return
    end
    
    -- 从技能配置获取生命值加成
    local ability = self:GetAbility()
    local health_bonus = 100.0
    local warrior_health_bonus = 200.0
    
    if ability and not ability:IsNull() then
        health_bonus = ability:GetSpecialValueFor("health_bonus") or 100.0
        warrior_health_bonus = ability:GetSpecialValueFor("warrior_health_bonus") or 200.0
    end
    
    -- 检查是否是斗士单位
    local unit_name = parent:GetUnitName()
    local warrior_units = {
        "treant_protector1",  -- 树精卫士
        "anti_mage1",         -- 敌法师
        "ogre_magi1",         -- 食人魔法师
        "axe1"                -- 斧王
    }
    
    local is_warrior = false
    for _, warrior_name in pairs(warrior_units) do
        if unit_name == warrior_name then
            is_warrior = true
            break
        end
    end
    
    -- 计算应该增加的生命值
    local bonus_health = is_warrior and warrior_health_bonus or health_bonus
    
    -- 获取原始最大生命值
    local original_max_health = WarriorOriginalHealth[unit_index]
    
    -- 计算目标最大生命值
    local target_max_health = original_max_health + bonus_health
    local current_max_health = parent:GetMaxHealth()
    
    -- 只在最大生命值确实被重置时才恢复（阈值设为5，避免浮点数误差）
    if math.abs(current_max_health - target_max_health) > 5 then
        -- 记录当前生命值和最大生命值（在设置之前）
        local current_health = parent:GetHealth()
        local old_max_health = current_max_health
        
        -- 计算生命值百分比（基于重置前的最大生命值）
        local health_pct = 1.0
        if old_max_health > 0 then
            health_pct = current_health / old_max_health
        end
        
        -- 设置正确的最大生命值
        parent:SetMaxHealth(target_max_health)
        
        -- 验证设置是否成功
        local actual_max_health = parent:GetMaxHealth()
        if math.abs(actual_max_health - target_max_health) > 5 then
            -- 如果设置失败，再次尝试
            parent:SetMaxHealth(target_max_health)
        end
        
        -- 根据百分比恢复当前生命值
        local new_current_health = target_max_health * health_pct
        new_current_health = math.min(new_current_health, target_max_health)
        new_current_health = math.max(new_current_health, 1)  -- 至少保留1点生命值
        
        -- 设置当前生命值
        parent:SetHealth(new_current_health)
    end
end

function modifier_warrior_1_effect:OnIntervalThink()
    if IsServer() then
        local parent = self:GetParent()
        if parent and not parent:IsNull() and parent:IsAlive() then
            local unit_index = parent:GetEntityIndex()
            
            -- 如果该单位还没有完成处理，不在这里处理（等待 OnCreated 中的延迟处理完成）
            if not WarriorProcessedUnits[unit_index] then
                return
            end
            
            -- 确保原始最大生命值已记录
            if not WarriorOriginalHealth[unit_index] then
                return
            end
            
            -- 从技能配置获取生命值加成
            local ability = self:GetAbility()
            local health_bonus = 100.0
            local warrior_health_bonus = 200.0
            
            if ability and not ability:IsNull() then
                health_bonus = ability:GetSpecialValueFor("health_bonus") or 100.0
                warrior_health_bonus = ability:GetSpecialValueFor("warrior_health_bonus") or 200.0
            end
            
            -- 检查是否是斗士单位
            local unit_name = parent:GetUnitName()
            local warrior_units = {
                "treant_protector1",  -- 树精卫士
                "anti_mage1",         -- 敌法师
                "ogre_magi1",         -- 食人魔法师
                "axe1"                -- 斧王
            }
            
            local is_warrior = false
            for _, warrior_name in pairs(warrior_units) do
                if unit_name == warrior_name then
                    is_warrior = true
                    break
                end
            end
            
            -- 计算应该增加的生命值
            local bonus_health = is_warrior and warrior_health_bonus or health_bonus
            
            -- 获取原始最大生命值
            local original_max_health = WarriorOriginalHealth[unit_index]
            
            -- 计算目标最大生命值
            local target_max_health = original_max_health + bonus_health
            local current_max_health = parent:GetMaxHealth()
            
            -- 只在最大生命值确实被重置时才恢复（阈值设为5，避免浮点数误差）
            -- 关键：只调整最大生命值，不改变当前生命值（除非当前生命值超过了新的最大生命值）
            if math.abs(current_max_health - target_max_health) > 5 then
                -- 记录当前生命值和最大生命值（在设置之前）
                local current_health = parent:GetHealth()
                local old_max_health = current_max_health
                
                -- 计算生命值百分比（基于重置前的最大生命值）
                -- 如果 old_max_health 为0或无效，使用目标最大生命值
                local health_pct = 1.0
                if old_max_health > 0 then
                    health_pct = current_health / old_max_health
                end
                
                -- 设置正确的最大生命值
                parent:SetMaxHealth(target_max_health)
                
                -- 验证设置是否成功
                local actual_max_health = parent:GetMaxHealth()
                if math.abs(actual_max_health - target_max_health) > 5 then
                    -- 如果设置失败，再次尝试
                    parent:SetMaxHealth(target_max_health)
                end
                
                -- 根据百分比恢复当前生命值
                -- 这样可以保持生命值百分比不变，避免血量不断减少
                local new_current_health = target_max_health * health_pct
                new_current_health = math.min(new_current_health, target_max_health)
                new_current_health = math.max(new_current_health, 1)  -- 至少保留1点生命值
                
                -- 设置当前生命值
                parent:SetHealth(new_current_health)
            end
        end
    end
end

function modifier_warrior_1_effect:OnDestroy()
    if IsServer() then
        local parent = self:GetParent()
        if parent and not parent:IsNull() then
            local unit_index = parent:GetEntityIndex()
            local original_max_health = WarriorOriginalHealth[unit_index]
            
            if original_max_health then
                -- 恢复原始最大生命值（羁绊失效时，移除生命值加成）
                local current_health = parent:GetHealth()
                
                -- 先恢复最大生命值
                parent:SetMaxHealth(original_max_health)
                
                -- 处理当前血量：
                -- 如果当前血量 > 原始最大血量：设置为原始最大血量（超过部分消除）
                -- 如果当前血量 <= 原始最大血量：保持当前血量不变
                local new_health = current_health
                if current_health > original_max_health then
                    new_health = original_max_health
                end
                -- 确保血量至少为1（如果单位还活着）
                if parent:IsAlive() then
                    new_health = math.max(new_health, 1)
                end
                
                parent:SetHealth(new_health)
                
                -- 清理处理标记和原始生命值记录，允许羁绊重新生效时重新应用
                WarriorProcessedUnits[unit_index] = nil
                WarriorOriginalHealth[unit_index] = nil
            end
        end
    end
end

function modifier_warrior_1_effect:GetTexture()
    return "item_heart"
end

