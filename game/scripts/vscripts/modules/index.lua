local ____lualib = require("lualib_bundle")
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 1,["8"] = 2,["9"] = 2,["10"] = 3,["11"] = 3,["12"] = 4,["13"] = 4,["14"] = 4,["15"] = 5,["16"] = 5,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 8,["22"] = 8,["23"] = 9,["24"] = 9,["25"] = 15,["26"] = 15,["27"] = 16,["28"] = 16,["31"] = 25,["32"] = 26,["33"] = 27,["34"] = 28,["35"] = 29,["36"] = 30,["37"] = 32,["38"] = 33,["41"] = 103,["42"] = 104,["44"] = 109,["46"] = 111,["49"] = 35,["50"] = 36,["51"] = 40,["52"] = 43,["53"] = 44,["54"] = 47,["55"] = 50,["56"] = 51,["57"] = 52,["58"] = 55,["59"] = 58,["60"] = 59,["61"] = 60,["62"] = 63,["63"] = 64,["64"] = 65,["65"] = 68,["66"] = 71,["67"] = 74,["68"] = 77,["69"] = 77,["70"] = 77,["71"] = 78,["72"] = 79,["73"] = 77,["74"] = 77,["75"] = 84,["76"] = 84,["77"] = 84,["78"] = 84,["79"] = 84,["80"] = 84,["81"] = 84,["82"] = 84,["83"] = 84,["84"] = 84,["85"] = 92,["86"] = 95,["87"] = 96,["88"] = 97,["89"] = 99,["96"] = 114,["97"] = 115,["99"] = 117,["100"] = 25});
local ____exports = {}
local ____Debug = require("modules.Debug")
local Debug = ____Debug.Debug
local ____GameConfig = require("modules.GameConfig")
local GameConfig = ____GameConfig.GameConfig
local ____xnet_2Dtable = require("utils.xnet-table.index")
local XNetTable = ____xnet_2Dtable.XNetTable
local ____error_2Dtracker = require("utils.error-tracker")
local ErrorTracker = ____error_2Dtracker.ErrorTracker
local initializeGlobalErrorHandling = ____error_2Dtracker.initializeGlobalErrorHandling
local ____performance_2Dmonitor = require("utils.performance-monitor")
local PerformanceMonitor = ____performance_2Dmonitor.PerformanceMonitor
local ____GameModeManager = require("modules.GameModeManager")
local GameModeManager = ____GameModeManager.GameModeManager
local ____TrainingMode = require("modules.TrainingMode")
local TrainingMode = ____TrainingMode.TrainingMode
local ____AutoChessMode = require("modules.AutoChessMode")
local AutoChessMode = ____AutoChessMode.AutoChessMode
local ____CustomUIHandler = require("modules.CustomUIHandler")
local CustomUIHandler = ____CustomUIHandler.CustomUIHandler
local ____InventorySystem = require("modules.inventory.InventorySystem")
local InventorySystem = ____InventorySystem.InventorySystem
local ____CraftingSystem = require("modules.inventory.CraftingSystem")
local CraftingSystem = ____CraftingSystem.CraftingSystem
--- 这个方法会在game_mode实体生成之后调用，且仅调用一次
-- 因此在这里作为单例模式使用
function ____exports.ActivateModules(self)
    print("+++++++++++++++++++++++++++++++++++++++++")
    print("[Modules] ActivateModules() function called")
    print("[Modules] GameRules exists: " .. (GameRules and "YES" or "NO"))
    print("[Modules] XNetTable is null: " .. tostring(GameRules.XNetTable == nil))
    print("+++++++++++++++++++++++++++++++++++++++++")
    if GameRules.XNetTable == nil then
        print("[Modules] Starting module initialization...")
        do
            local function ____catch(____error)
                if GameRules.ErrorTracker then
                    GameRules.ErrorTracker:trackError(____error, {module = "ActivateModules", ["function"] = "initialization"})
                else
                    print("[FATAL] Failed to activate modules: " .. tostring(____error))
                end
                error(____error, 0)
            end
            local ____try, ____hasReturned = pcall(function()
                print("[Modules] About to create GameConfig...")
                __TS__New(GameConfig)
                GameRules.XNetTable = __TS__New(XNetTable)
                GameRules.ErrorTracker = ErrorTracker:getInstance()
                initializeGlobalErrorHandling(nil)
                GameRules.PerformanceMonitor = PerformanceMonitor:getInstance()
                GameRules.PerformanceMonitor:setThreshold("module_activation", 1000)
                GameRules.PerformanceMonitor:setThreshold("config_loading", 500)
                GameRules.PerformanceMonitor:setThreshold("debug_command", 100)
                GameRules.GameModeManager = GameModeManager:getInstance()
                print("[Modules] ========== 准备初始化 TrainingMode ==========")
                GameRules.TrainingMode = TrainingMode:getInstance()
                print("[Modules] ========== TrainingMode 初始化完成 ==========")
                print("[Modules] ========== 准备初始化 AutoChessMode ==========")
                GameRules.AutoChessMode = AutoChessMode:getInstance()
                print("[Modules] ========== AutoChessMode 初始化完成 ==========")
                GameRules.CustomUIHandler = CustomUIHandler:getInstance()
                GameRules.InventorySystem = InventorySystem:getInstance()
                GameRules.CraftingSystem = CraftingSystem:getInstance()
                Timers:CreateTimer(
                    2,
                    function()
                        GameRules.CustomUIHandler:integrateWithGameMode()
                        return nil
                    end
                )
                GameRules.XNetTable:SetTableValue(
                    "debug_info",
                    "system_status",
                    {
                        errorTracking = true,
                        performanceMonitoring = true,
                        debugMode = IsInToolsMode(),
                        timestamp = GameRules:GetGameTime()
                    }
                )
                print("[Modules] GameConfig created successfully")
                print("[Modules] About to create Debug module...")
                __TS__New(Debug)
                print("[Modules] Debug module created successfully")
                print("[Modules] All modules activated successfully")
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    else
        print("[Modules] XNetTable already exists, skipping initialization")
        print("[Modules] Debug instance exists: " .. (GameRules.DebugInstance and "YES" or "NO"))
    end
    print("[Modules] ActivateModules() function finished")
end
return ____exports
