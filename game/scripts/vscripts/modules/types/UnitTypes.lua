local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 185,["7"] = 186,["8"] = 187,["9"] = 188,["10"] = 189,["11"] = 190,["12"] = 191,["13"] = 192,["15"] = 198,["16"] = 199,["17"] = 199,["18"] = 200,["19"] = 200,["20"] = 201,["21"] = 201,["22"] = 202,["23"] = 202,["24"] = 203,["25"] = 203,["26"] = 204,["27"] = 204,["28"] = 205,["29"] = 205,["30"] = 206,["31"] = 206,["32"] = 207,["33"] = 207,["34"] = 208,["35"] = 208,["36"] = 209,["37"] = 209,["39"] = 215,["40"] = 216,["41"] = 217,["42"] = 218,["43"] = 219});
local ____exports = {}
--- 单位类型枚举
____exports.UnitType = UnitType or ({})
____exports.UnitType.HERO = "hero"
____exports.UnitType.CREEP = "creep"
____exports.UnitType.BUILDING = "building"
____exports.UnitType.WARD = "ward"
____exports.UnitType.COURIER = "courier"
____exports.UnitType.NEUTRAL = "neutral"
____exports.UnitType.CUSTOM = "custom"
--- 单位队伍枚举扩展
____exports.ExtendedTeam = ExtendedTeam or ({})
____exports.ExtendedTeam.GOODGUYS = 2
____exports.ExtendedTeam[____exports.ExtendedTeam.GOODGUYS] = "GOODGUYS"
____exports.ExtendedTeam.BADGUYS = 3
____exports.ExtendedTeam[____exports.ExtendedTeam.BADGUYS] = "BADGUYS"
____exports.ExtendedTeam.NEUTRALS = 4
____exports.ExtendedTeam[____exports.ExtendedTeam.NEUTRALS] = "NEUTRALS"
____exports.ExtendedTeam.CUSTOM_1 = 6
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_1] = "CUSTOM_1"
____exports.ExtendedTeam.CUSTOM_2 = 7
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_2] = "CUSTOM_2"
____exports.ExtendedTeam.CUSTOM_3 = 8
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_3] = "CUSTOM_3"
____exports.ExtendedTeam.CUSTOM_4 = 9
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_4] = "CUSTOM_4"
____exports.ExtendedTeam.CUSTOM_5 = 10
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_5] = "CUSTOM_5"
____exports.ExtendedTeam.CUSTOM_6 = 11
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_6] = "CUSTOM_6"
____exports.ExtendedTeam.CUSTOM_7 = 12
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_7] = "CUSTOM_7"
____exports.ExtendedTeam.CUSTOM_8 = 13
____exports.ExtendedTeam[____exports.ExtendedTeam.CUSTOM_8] = "CUSTOM_8"
--- 属性应用策略
____exports.AttributeApplyStrategy = AttributeApplyStrategy or ({})
____exports.AttributeApplyStrategy.OVERRIDE = "override"
____exports.AttributeApplyStrategy.MERGE = "merge"
____exports.AttributeApplyStrategy.ADD = "add"
____exports.AttributeApplyStrategy.MULTIPLY = "multiply"
return ____exports
