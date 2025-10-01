local ____lualib = require("lualib_bundle")
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 1,["8"] = 2,["9"] = 2,["10"] = 3,["11"] = 3,["12"] = 4,["13"] = 4,["14"] = 4,["15"] = 5,["16"] = 5,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 8,["22"] = 8,["23"] = 9,["24"] = 9,["25"] = 15,["26"] = 15,["27"] = 16,["28"] = 16,["31"] = 37,["32"] = 38,["33"] = 39,["34"] = 40,["35"] = 41,["36"] = 42,["37"] = 44,["38"] = 45,["41"] = 114,["42"] = 115,["44"] = 120,["46"] = 122,["49"] = 47,["50"] = 48,["51"] = 51,["52"] = 54,["53"] = 55,["54"] = 58,["55"] = 61,["56"] = 62,["57"] = 63,["58"] = 66,["59"] = 69,["60"] = 70,["61"] = 71,["62"] = 74,["63"] = 75,["64"] = 76,["65"] = 79,["66"] = 82,["67"] = 85,["68"] = 88,["69"] = 88,["70"] = 88,["71"] = 89,["72"] = 90,["73"] = 88,["74"] = 88,["75"] = 95,["76"] = 95,["77"] = 95,["78"] = 95,["79"] = 95,["80"] = 95,["81"] = 95,["82"] = 95,["83"] = 95,["84"] = 95,["85"] = 103,["86"] = 106,["87"] = 107,["88"] = 108,["89"] = 110,["96"] = 125,["97"] = 126,["99"] = 128,["100"] = 37});
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
