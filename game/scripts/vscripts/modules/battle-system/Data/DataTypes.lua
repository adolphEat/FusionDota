local ____lualib = require("lualib_bundle")
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 139,["10"] = 140,["11"] = 141,["12"] = 142,["13"] = 143,["14"] = 144,["15"] = 145,["17"] = 151,["18"] = 152,["19"] = 153,["20"] = 154,["21"] = 155,["22"] = 156,["23"] = 157,["25"] = 163,["26"] = 164,["27"] = 165,["28"] = 166,["29"] = 167,["30"] = 168,["31"] = 169,["33"] = 175,["34"] = 176,["35"] = 177,["36"] = 178,["37"] = 179,["38"] = 180,["39"] = 181,["41"] = 187,["42"] = 188,["43"] = 189,["44"] = 190,["45"] = 191,["46"] = 192,["47"] = 193,["49"] = 199,["50"] = 200,["51"] = 201,["52"] = 202,["53"] = 203,["54"] = 204,["55"] = 205,["56"] = 206,["58"] = 327,["59"] = 328,["60"] = 332,["61"] = 332,["62"] = 332,["63"] = 327,["64"] = 335,["65"] = 336,["66"] = 339,["67"] = 339,["68"] = 336,["69"] = 335,["70"] = 343,["71"] = 344,["72"] = 343});
local ____exports = {}
--- 胜利条件类型
____exports.WinConditionType = WinConditionType or ({})
____exports.WinConditionType.ELIMINATE_ALL = "eliminate_all"
____exports.WinConditionType.SURVIVE_TIME = "survive_time"
____exports.WinConditionType.PROTECT_TARGET = "protect_target"
____exports.WinConditionType.CAPTURE_POINT = "capture_point"
____exports.WinConditionType.KILL_TARGET = "kill_target"
____exports.WinConditionType.COLLECT_ITEMS = "collect_items"
--- 阵型类型
____exports.FormationType = FormationType or ({})
____exports.FormationType.LINE = "line"
____exports.FormationType.CIRCLE = "circle"
____exports.FormationType.WEDGE = "wedge"
____exports.FormationType.GRID = "grid"
____exports.FormationType.CUSTOM = "custom"
____exports.FormationType.RANDOM = "random"
--- 对战状态
____exports.BattleStatus = BattleStatus or ({})
____exports.BattleStatus.PREPARING = "preparing"
____exports.BattleStatus.SPAWNING = "spawning"
____exports.BattleStatus.FIGHTING = "fighting"
____exports.BattleStatus.FINISHED = "finished"
____exports.BattleStatus.PAUSED = "paused"
____exports.BattleStatus.CANCELLED = "cancelled"
--- 单位AI类型
____exports.AIType = AIType or ({})
____exports.AIType.AGGRESSIVE = "aggressive"
____exports.AIType.DEFENSIVE = "defensive"
____exports.AIType.SUPPORT = "support"
____exports.AIType.PATROL = "patrol"
____exports.AIType.GUARD = "guard"
____exports.AIType.PASSIVE = "passive"
--- 地图区域类型
____exports.MapAreaType = MapAreaType or ({})
____exports.MapAreaType.CENTER = "center_area"
____exports.MapAreaType.NORTH = "north_area"
____exports.MapAreaType.SOUTH = "south_area"
____exports.MapAreaType.EAST = "east_area"
____exports.MapAreaType.WEST = "west_area"
____exports.MapAreaType.CUSTOM = "custom_area"
--- 事件类型
____exports.BattleEventType = BattleEventType or ({})
____exports.BattleEventType.BATTLE_STARTED = "battle_started"
____exports.BattleEventType.BATTLE_ENDED = "battle_ended"
____exports.BattleEventType.UNIT_SPAWNED = "unit_spawned"
____exports.BattleEventType.UNIT_DIED = "unit_died"
____exports.BattleEventType.TEAM_ELIMINATED = "team_eliminated"
____exports.BattleEventType.TIME_WARNING = "time_warning"
____exports.BattleEventType.OBJECTIVE_COMPLETED = "objective_completed"
--- 类型守卫函数
function ____exports.isValidLevelConfig(self, config)
    return config and type(config.level_id) == "string" and type(config.level_name) == "string" and type(config.difficulty) == "number" and __TS__ArrayIncludes(
        __TS__ObjectValues(____exports.WinConditionType),
        config.win_condition
    )
end
function ____exports.isValidTeamConfig(self, config)
    return config and type(config.team_config_id) == "string" and type(config.team_name) == "string" and __TS__ArrayIncludes(
        __TS__ObjectValues(____exports.FormationType),
        config.formation
    ) and __TS__ArrayIsArray(config.unit_configs)
end
function ____exports.isValidBattleResult(self, result)
    return result and type(result.battleId) == "string" and type(result.levelId) == "string" and type(result.duration) == "number" and __TS__ArrayIsArray(result.teams)
end
return ____exports
