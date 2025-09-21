if GameMode == nil then
    GameMode = class({})
end

function Precache(context)
    
    -- 预缓存模型文件
    PrecacheResource("model", "models/heroes/hero_models/wr/wr.vmdl", context)
end

function Activate()
    GameRules.GameMode = GameMode()
    GameRules.GameMode:InitGameMode()
end

function GameMode:InitGameMode()
    print("GameMode Initialized")

    -- 注册监听单位出生事件
    ListenToGameEvent("npc_spawned", Dynamic_Wrap(GameMode, "OnNPCSpawned"), self)

    -- 注册装饰品获取命令
    self:RegisterWearableCommands()

    -- 可选：测试函数
    ChaosBolt_Test()
end

function ChaosBolt_Test()
    print("==== ChaosBolt_Test has been called ====")
end

function GameMode:OnNPCSpawned(event)
    local unit = EntIndexToHScript(event.entindex)

    if not unit or not IsValidEntity(unit) then return end
    if unit:IsNull() or not unit:IsAlive() then return end

            -- 测试技能加载
        if unit:GetUnitName() == "treant_protector1" then
            print("=== Testing treant_protector1 abilities ===")
            local ability = unit:FindAbilityByName("treant_protector_living_armor")
            if ability then
                print(">>> Found treant_protector_living_armor ability")
                ability:SetLevel(1)
                print(">>> Set treant_protector_living_armor level to 1")
            else
                print(">>> Ability treant_protector_living_armor NOT found!")
            end
            
            -- 列出所有技能
            for i = 0, unit:GetAbilityCount() - 1 do
                local abil = unit:GetAbilityByIndex(i)
                if abil then
                    print(">>> Ability", i, ":", abil:GetAbilityName())
                end
            end
        end
        
        -- 测试axe1技能加载
        if unit:GetUnitName() == "axe1" then
            print("=== Testing axe1 abilities ===")
            local ability = unit:FindAbilityByName("axe_battle_hunger_custom")
            if ability then
                print(">>> Found axe_battle_hunger_custom ability")
                ability:SetLevel(1)
                print(">>> Set axe_battle_hunger_custom level to 1")
            else
                print(">>> Ability axe_battle_hunger_custom NOT found!")
            end
            
            -- 测试通用Mana恢复技能
            local mana_ability = unit:FindAbilityByName("universal_mana_restore_on_attack")
            if mana_ability then
                print(">>> Found universal_mana_restore_on_attack ability")
                mana_ability:SetLevel(1)
                print(">>> Set universal_mana_restore_on_attack level to 1")
            else
                print(">>> Ability universal_mana_restore_on_attack NOT found!")
            end
            
            -- 列出所有技能
            for i = 0, unit:GetAbilityCount() - 1 do
                local abil = unit:GetAbilityByIndex(i)
                if abil then
                    print(">>> Ability", i, ":", abil:GetAbilityName())
                end
            end
        end
        
        -- 测试ember_spirit1技能加载
        if unit:GetUnitName() == "ember_spirit1" then
            print("=== Testing ember_spirit1 abilities ===")
            local ability = unit:FindAbilityByName("ember_spirit_inner_Fire")
            if ability then
                print(">>> Found ember_spirit_inner_Fire ability")
                ability:SetLevel(1)
                print(">>> Set ember_spirit_inner_Fire level to 1")
            else
                print(">>> Ability ember_spirit_inner_Fire NOT found!")
            end
            
            -- 测试通用Mana恢复技能
            local mana_ability = unit:FindAbilityByName("universal_mana_restore_on_attack")
            if mana_ability then
                print(">>> Found universal_mana_restore_on_attack ability")
                mana_ability:SetLevel(1)
                print(">>> Set universal_mana_restore_on_attack level to 1")
            else
                print(">>> Ability universal_mana_restore_on_attack NOT found!")
            end
            
            local mana_damage_ability = unit:FindAbilityByName("universal_mana_restore_on_damage")
            if mana_damage_ability then
                print(">>> Found universal_mana_restore_on_damage ability")
                mana_damage_ability:SetLevel(1)
                print(">>> Set universal_mana_restore_on_damage level to 1")
            else
                print(">>> Ability universal_mana_restore_on_damage NOT found!")
            end
            
            -- 列出所有技能
            for i = 0, unit:GetAbilityCount() - 1 do
                local abil = unit:GetAbilityByIndex(i)
                if abil then
                    print(">>> Ability", i, ":", abil:GetAbilityName())
                end
            end
        end
end

function TestModelLoading(unit)
    print("=== Testing Model Loading ===")
    print("Unit name:", unit:GetUnitName())
    print("Unit model:", unit:GetModelName())
    print("Unit scale:", unit:GetModelScale())
    
    -- 检查附件
    local wearables = unit:GetChildren()
    print("Number of children:", #wearables)
    for i, child in ipairs(wearables) do
        if IsValidEntity(child) then
            print("Child", i, ":", child:GetUnitName(), "Model:", child:GetModelName())
        end
    end
    
    -- 检查是否有附件槽位
    print("Has wearable slots:", unit:HasWearables())
    
    -- 尝试手动添加附件
    if #wearables == 0 then
        print("No wearables found, trying manual attachment...")
        -- 这里可以尝试手动添加附件
    end
end

-- 注册装饰品获取命令
function GameMode:RegisterWearableCommands()
    -- 获取指定英雄的装饰品（推荐使用）
    Convars:RegisterCommand("get_wearables", function(name, hero_name)
        if hero_name and hero_name ~= "" then
            self:GetAnyHeroWearables(hero_name)
        else
            print("使用方法: get_wearables <hero_name>")
            print("例如: get_wearables npc_dota_hero_windrunner")
            print("或者: get_wearables windrunner1")
        end
    end, "获取指定英雄的所有装饰品信息", 0)
    
    -- 简写命令
    Convars:RegisterCommand("gw", function(name, hero_name)
        if hero_name and hero_name ~= "" then
            self:GetAnyHeroWearables(hero_name)
        else
            print("使用方法: gw <hero_name>")
            print("例如: gw npc_dota_hero_windrunner")
        end
    end, "获取指定英雄的所有装饰品信息（简写）", 0)
    
    -- 获取指定英雄的装饰品（完整命令）
    Convars:RegisterCommand("get_hero_wearables", function(name, hero_name)
        self:GetAnyHeroWearables(hero_name)
    end, "获取指定英雄的所有装饰品信息", 0)
    
    -- 简写命令
    Convars:RegisterCommand("ghw", function(name, hero_name)
        self:GetAnyHeroWearables(hero_name)
    end, "获取指定英雄的所有装饰品信息（简写）", 0)
end

-- 获取选中英雄的装饰品
function GameMode:GetSelectedHeroWearables()
    if not IsServer() then return end
    
    -- 获取当前选中的单位
    local player = PlayerResource:GetPlayer(0) -- 假设是玩家0
    if not player then
        print("错误：无法获取玩家")
        return
    end
    
    local hero = player:GetAssignedHero()
    if not hero or hero:IsNull() then
        print("错误：没有找到玩家的英雄")
        return
    end
    
    local unit = hero
    
    local unit_name = unit:GetUnitName()
    print("=== 获取选中单位装饰品信息 ===")
    print("单位名称:", unit_name)
    print("单位模型:", unit:GetModelName())
    
    -- 检查装饰品 - 使用正确的方法
    local wearables = {}
    local wearable_count = 0
    
    -- 尝试获取装饰品
    for i = 0, 20 do  -- 假设最多20个装饰品
        local wearable = unit:GetWearable(i)
        if wearable and not wearable:IsNull() then
            table.insert(wearables, wearable)
            wearable_count = wearable_count + 1
        else
            break
        end
    end
    
    print("装饰品数量:", wearable_count)
    
    if wearable_count == 0 then
        print("该单位没有装饰品")
        return
    end
    
    print("")
    print("=== 装饰品详细信息 ===")
    for i, wearable in ipairs(wearables) do
        if wearable and not wearable:IsNull() then
            print("装饰品", i, ":")
            print("  单位名:", wearable:GetUnitName())
            print("  模型:", wearable:GetModelName())
            print("  ItemDef ID:", wearable:GetItemDef())
            print("")
        end
    end
    
    print("=== 配置代码 ===")
    print("在npc_units_custom.txt中添加以下配置:")
    print("")
    print("\"Creature\"")
    print("{")
    print("\t\"AttachWearables\"")
    print("\t{")
    
    for i, wearable in ipairs(wearables) do
        if wearable and not wearable:IsNull() then
            local item_def = wearable:GetItemDef()
            if item_def and item_def > 0 then
                print("\t\t\"Wearable" .. i .. "\"")
                print("\t\t{")
                print("\t\t\t\"ItemDef\"\t\"" .. item_def .. "\"")
                print("\t\t}")
            end
        end
    end
    
    print("\t}")
    print("}")
    print("=== 完成 ===")
end

-- 获取指定英雄的装饰品
function GameMode:GetAnyHeroWearables(hero_name)
    if not IsServer() then return end
    
    if not hero_name or hero_name == "" then
        print("使用方法: get_wearables <hero_name>")
        print("例如: get_wearables npc_dota_hero_windrunner")
        print("或者: get_wearables windrunner1")
        return
    end
    
    print("=== 获取英雄装饰品信息 ===")
    print("英雄名称:", hero_name)
    
    -- 如果是自定义单位名称，先尝试创建原版英雄
    local original_hero_name = hero_name
    if not string.find(hero_name, "npc_dota_hero_") then
        -- 将自定义名称转换为原版英雄名称
        if hero_name == "windrunner1" then
            original_hero_name = "npc_dota_hero_windrunner"
        elseif hero_name == "lina1" then
            original_hero_name = "npc_dota_hero_lina"
        elseif hero_name == "axe1" then
            original_hero_name = "npc_dota_hero_axe"
        elseif hero_name == "crystal_maiden1" then
            original_hero_name = "npc_dota_hero_crystal_maiden"
        elseif hero_name == "ursa1" then
            original_hero_name = "npc_dota_hero_ursa"
        elseif hero_name == "treant_protector1" then
            original_hero_name = "npc_dota_hero_treant"
        elseif hero_name == "viper1" then
            original_hero_name = "npc_dota_hero_viper"
        elseif hero_name == "enigma1" then
            original_hero_name = "npc_dota_hero_enigma"
        elseif hero_name == "ember_spirit1" then
            original_hero_name = "npc_dota_hero_ember_spirit"
        elseif hero_name == "lion1" then
            original_hero_name = "npc_dota_hero_lion"
        elseif hero_name == "oracle1" then
            original_hero_name = "npc_dota_hero_oracle"
        elseif hero_name == "death_prophet1" then
            original_hero_name = "npc_dota_hero_death_prophet"
        elseif hero_name == "enchantress1" then
            original_hero_name = "npc_dota_hero_enchantress"
        elseif hero_name == "mars1" then
            original_hero_name = "npc_dota_hero_mars"
        end
        print("转换为原版英雄名称:", original_hero_name)
    end
    
    -- 创建临时英雄单位
    local hero = CreateUnitByName(original_hero_name, Vector(0, 0, 0), true, nil, nil, DOTA_TEAM_GOODGUYS)
    
    if not hero or hero:IsNull() then
        print("错误：无法创建英雄单位")
        return
    end
    
    print("英雄模型:", hero:GetModelName())
    
    -- 检查装饰品 - 使用正确的方法
    local wearables = {}
    local wearable_count = 0
    
    -- 尝试获取装饰品
    for i = 0, 20 do  -- 假设最多20个装饰品
        local wearable = hero:GetWearable(i)
        if wearable and not wearable:IsNull() then
            table.insert(wearables, wearable)
            wearable_count = wearable_count + 1
        else
            break
        end
    end
    
    print("装饰品数量:", wearable_count)
    
    if wearable_count == 0 then
        print("该英雄没有装饰品")
        hero:RemoveSelf()
        return
    end
    
    print("")
    print("=== 装饰品详细信息 ===")
    for i, wearable in ipairs(wearables) do
        if wearable and not wearable:IsNull() then
            print("装饰品", i, ":")
            print("  单位名:", wearable:GetUnitName())
            print("  模型:", wearable:GetModelName())
            print("  ItemDef ID:", wearable:GetItemDef())
            print("")
        end
    end
    
    print("=== 配置代码 ===")
    print("在npc_units_custom.txt中添加以下配置:")
    print("")
    print("\"Creature\"")
    print("{")
    print("\t\"AttachWearables\"")
    print("\t{")
    
    for i, wearable in ipairs(wearables) do
        if wearable and not wearable:IsNull() then
            local item_def = wearable:GetItemDef()
            if item_def and item_def > 0 then
                print("\t\t\"Wearable" .. i .. "\"")
                print("\t\t{")
                print("\t\t\t\"ItemDef\"\t\"" .. item_def .. "\"")
                print("\t\t}")
            end
        end
    end
    
    print("\t}")
    print("}")
    print("=== 完成 ===")
    
    -- 清理临时单位
    hero:RemoveSelf()
end
