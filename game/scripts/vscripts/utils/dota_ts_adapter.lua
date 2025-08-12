local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 123,["10"] = 123,["11"] = 124,["12"] = 125,["13"] = 126,["14"] = 128,["15"] = 139,["16"] = 139,["17"] = 139,["18"] = 139,["20"] = 142,["23"] = 146,["24"] = 147,["25"] = 147,["26"] = 148,["27"] = 149,["28"] = 152,["29"] = 153,["30"] = 154,["34"] = 159,["37"] = 2,["38"] = 2,["39"] = 2,["41"] = 2,["42"] = 5,["43"] = 5,["44"] = 5,["46"] = 5,["47"] = 17,["48"] = 17,["49"] = 17,["51"] = 17,["52"] = 18,["53"] = 25,["54"] = 18,["55"] = 28,["56"] = 29,["57"] = 28,["58"] = 32,["59"] = 33,["60"] = 32,["61"] = 38,["62"] = 38,["63"] = 38,["64"] = 38,["65"] = 41,["66"] = 41,["67"] = 41,["68"] = 41,["69"] = 44,["70"] = 44,["71"] = 44,["72"] = 44,["73"] = 47,["74"] = 48,["75"] = 49,["76"] = 51,["77"] = 52,["78"] = 54,["80"] = 56,["82"] = 59,["83"] = 61,["84"] = 63,["85"] = 65,["86"] = 66,["87"] = 67,["88"] = 68,["89"] = 69,["91"] = 66,["92"] = 51,["93"] = 74,["94"] = 75,["95"] = 77,["97"] = 79,["99"] = 82,["100"] = 83,["101"] = 85,["102"] = 87,["103"] = 89,["104"] = 90,["105"] = 91,["106"] = 92,["107"] = 93,["109"] = 90,["110"] = 97,["111"] = 98,["112"] = 99,["113"] = 100,["114"] = 101,["116"] = 103,["117"] = 104,["119"] = 106,["120"] = 107,["123"] = 111,["125"] = 114,["126"] = 74,["127"] = 117,["128"] = 118,["129"] = 119,["131"] = 117});
local ____exports = {}
local getFileScope, toDotaClassInstance
function getFileScope(self)
    local level = 1
    while true do
        local info = debug.getinfo(level, "S")
        if info and info.what == "main" and info.source and __TS__StringStartsWith(info.source, "@") then
            return {
                getfenv(level),
                info.source
            }
        end
        level = level + 1
    end
end
function toDotaClassInstance(self, instance, ____table)
    local ____table_0 = ____table
    local prototype = ____table_0.prototype
    while prototype do
        for key in pairs(prototype) do
            if not (rawget(instance, key) ~= nil) then
                if key ~= "__index" then
                    instance[key] = prototype[key]
                end
            end
        end
        prototype = getmetatable(prototype)
    end
end
____exports.BaseAbility = __TS__Class()
local BaseAbility = ____exports.BaseAbility
BaseAbility.name = "BaseAbility"
function BaseAbility.prototype.____constructor(self)
end
____exports.BaseItem = __TS__Class()
local BaseItem = ____exports.BaseItem
BaseItem.name = "BaseItem"
function BaseItem.prototype.____constructor(self)
end
____exports.BaseModifier = __TS__Class()
local BaseModifier = ____exports.BaseModifier
BaseModifier.name = "BaseModifier"
function BaseModifier.prototype.____constructor(self)
end
function BaseModifier.apply(self, target, caster, ability, modifierTable)
    return target:AddNewModifier(caster, ability, self.name, modifierTable)
end
function BaseModifier.find_on(self, target)
    return target:FindModifierByName(self.name)
end
function BaseModifier.remove(self, target)
    target:RemoveModifierByName(self.name)
end
____exports.BaseModifierMotionHorizontal = __TS__Class()
local BaseModifierMotionHorizontal = ____exports.BaseModifierMotionHorizontal
BaseModifierMotionHorizontal.name = "BaseModifierMotionHorizontal"
__TS__ClassExtends(BaseModifierMotionHorizontal, ____exports.BaseModifier)
____exports.BaseModifierMotionVertical = __TS__Class()
local BaseModifierMotionVertical = ____exports.BaseModifierMotionVertical
BaseModifierMotionVertical.name = "BaseModifierMotionVertical"
__TS__ClassExtends(BaseModifierMotionVertical, ____exports.BaseModifier)
____exports.BaseModifierMotionBoth = __TS__Class()
local BaseModifierMotionBoth = ____exports.BaseModifierMotionBoth
BaseModifierMotionBoth.name = "BaseModifierMotionBoth"
__TS__ClassExtends(BaseModifierMotionBoth, ____exports.BaseModifier)
setmetatable(____exports.BaseAbility.prototype, {__index = CDOTA_Ability_Lua or C_DOTA_Ability_Lua})
setmetatable(____exports.BaseItem.prototype, {__index = CDOTA_Item_Lua or C_DOTA_Item_Lua})
setmetatable(____exports.BaseModifier.prototype, {__index = CDOTA_Modifier_Lua})
____exports.registerAbility = function(____, name) return function(____, ability)
    if name ~= nil then
        ability.name = name
    else
        name = ability.name
    end
    local env = unpack(getFileScope(nil))
    env[name] = {}
    toDotaClassInstance(nil, env[name], ability)
    local originalSpawn = env[name].Spawn
    env[name].Spawn = function(self)
        self:____constructor()
        if originalSpawn then
            originalSpawn(self)
        end
    end
end end
____exports.registerModifier = function(____, name) return function(____, modifier)
    if name ~= nil then
        modifier.name = name
    else
        name = modifier.name
    end
    local env, source = unpack(getFileScope(nil))
    local fileName = string.gsub(source, ".*scripts[\\/]vscripts[\\/]", "")
    env[name] = {}
    toDotaClassInstance(nil, env[name], modifier)
    local originalOnCreated = env[name].OnCreated
    env[name].OnCreated = function(self, parameters)
        self:____constructor()
        if originalOnCreated then
            originalOnCreated(self, parameters)
        end
    end
    local ____type = LUA_MODIFIER_MOTION_NONE
    local base = modifier.____super
    while base do
        if base == ____exports.BaseModifierMotionBoth then
            ____type = LUA_MODIFIER_MOTION_BOTH
            break
        elseif base == ____exports.BaseModifierMotionHorizontal then
            ____type = LUA_MODIFIER_MOTION_HORIZONTAL
            break
        elseif base == ____exports.BaseModifierMotionVertical then
            ____type = LUA_MODIFIER_MOTION_VERTICAL
            break
        end
        base = base.____super
    end
    LinkLuaModifier(name, fileName, ____type)
end end
local function clearTable(self, ____table)
    for key in pairs(____table) do
        __TS__Delete(____table, key)
    end
end
return ____exports
