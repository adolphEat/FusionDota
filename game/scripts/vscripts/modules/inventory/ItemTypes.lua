local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 9,["7"] = 10,["8"] = 11,["9"] = 12,["10"] = 13,["11"] = 14,["13"] = 20,["14"] = 21,["15"] = 21,["16"] = 22,["17"] = 22,["18"] = 23,["19"] = 23,["20"] = 24,["21"] = 24,["22"] = 25,["23"] = 25});
local ____exports = {}
--- 道具类型
____exports.ItemType = ItemType or ({})
____exports.ItemType.CONSUMABLE = "consumable"
____exports.ItemType.EQUIPMENT = "equipment"
____exports.ItemType.MATERIAL = "material"
____exports.ItemType.TREASURE = "treasure"
____exports.ItemType.SPECIAL = "special"
--- 道具稀有度
____exports.ItemRarity = ItemRarity or ({})
____exports.ItemRarity.COMMON = 1
____exports.ItemRarity[____exports.ItemRarity.COMMON] = "COMMON"
____exports.ItemRarity.UNCOMMON = 2
____exports.ItemRarity[____exports.ItemRarity.UNCOMMON] = "UNCOMMON"
____exports.ItemRarity.RARE = 3
____exports.ItemRarity[____exports.ItemRarity.RARE] = "RARE"
____exports.ItemRarity.EPIC = 4
____exports.ItemRarity[____exports.ItemRarity.EPIC] = "EPIC"
____exports.ItemRarity.LEGENDARY = 5
____exports.ItemRarity[____exports.ItemRarity.LEGENDARY] = "LEGENDARY"
return ____exports
