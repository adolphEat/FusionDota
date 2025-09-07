local ____lualib = require("lualib_bundle")
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 1,["8"] = 2,["9"] = 2,["10"] = 3,["11"] = 3,["12"] = 4,["13"] = 4,["14"] = 4,["15"] = 5,["16"] = 5,["17"] = 6,["18"] = 6,["19"] = 7,["20"] = 7,["21"] = 8,["22"] = 8,["25"] = 26,["26"] = 27,["27"] = 28,["28"] = 29,["29"] = 30,["30"] = 31,["31"] = 33,["32"] = 34,["35"] = 84,["36"] = 85,["38"] = 90,["40"] = 92,["43"] = 36,["44"] = 37,["45"] = 40,["46"] = 43,["47"] = 44,["48"] = 47,["49"] = 50,["50"] = 51,["51"] = 52,["52"] = 55,["53"] = 58,["54"] = 61,["55"] = 65,["56"] = 65,["57"] = 65,["58"] = 65,["59"] = 65,["60"] = 65,["61"] = 65,["62"] = 65,["63"] = 65,["64"] = 65,["65"] = 73,["66"] = 76,["67"] = 77,["68"] = 78,["69"] = 80,["76"] = 95,["77"] = 96,["79"] = 98,["80"] = 26});
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
