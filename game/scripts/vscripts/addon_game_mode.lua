if GameMode == nil then
    GameMode = class({})
end

function Precache(context)
    PrecacheUnitByNameSync("test_melee_no_armor", context)
    PrecacheUnitByNameSync("test_ranged_fly_no_armor", context)
    PrecacheUnitByNameSync("test_melee_hero", context)
    PrecacheUnitByNameSync("test_magic_immune", context)
    -- PrecacheUnitByNameSync("windrunner", context) -- 已删除，不再需要
    
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

    -- 检查是否是你的单位（使用你现有的单位名称）
    -- if unit:GetUnitName() == "your_unit_name" and not unit.__powershot_leveled then
    --     local ability = unit:FindAbilityByName("windrunner_powershot")
    --     if ability then
    --         ability:SetLevel(1)
    --         print(">>> Set windrunner_powershot level to 1 for", unit:GetUnitName())
    --     else
    --         print(">>> Ability windrunner_powershot not found on", unit:GetUnitName())
    --     end
    --     unit.__powershot_leveled = true -- 防止重复设等级
    --     
    --     -- 测试模型加载
    --     TestModelLoading(unit)
    -- end
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
