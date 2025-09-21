local ____lualib = require("lualib_bundle")
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 1,["8"] = 2,["9"] = 2,["10"] = 3,["11"] = 3,["12"] = 4,["13"] = 4,["14"] = 4,["15"] = 5,["16"] = 5,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 8,["22"] = 8,["23"] = 9,["24"] = 9,["27"] = 28,["28"] = 29,["29"] = 30,["30"] = 31,["31"] = 32,["32"] = 33,["33"] = 35,["34"] = 36,["37"] = 95,["38"] = 96,["40"] = 101,["42"] = 103,["45"] = 38,["46"] = 39,["47"] = 42,["48"] = 45,["49"] = 46,["50"] = 49,["51"] = 52,["52"] = 53,["53"] = 54,["54"] = 57,["55"] = 60,["56"] = 63,["57"] = 66,["58"] = 69,["59"] = 69,["60"] = 69,["61"] = 70,["62"] = 71,["63"] = 69,["64"] = 69,["65"] = 76,["66"] = 76,["67"] = 76,["68"] = 76,["69"] = 76,["70"] = 76,["71"] = 76,["72"] = 76,["73"] = 76,["74"] = 76,["75"] = 84,["76"] = 87,["77"] = 88,["78"] = 89,["79"] = 91,["86"] = 106,["87"] = 107,["89"] = 109,["90"] = 28});
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
                GameRules.TrainingMode = TrainingMode:getInstance()
                GameRules.AutoChessMode = AutoChessMode:getInstance()
                GameRules.CustomUIHandler = CustomUIHandler:getInstance()
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
                        timestamp = Date:now()
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
