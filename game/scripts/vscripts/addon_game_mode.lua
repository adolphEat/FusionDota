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
