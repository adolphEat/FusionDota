local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__StringEndsWith = ____lualib.__TS__StringEndsWith
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 48,["8"] = 48,["9"] = 49,["10"] = 49,["11"] = 49,["12"] = 50,["13"] = 51,["14"] = 49,["15"] = 49,["17"] = 55,["18"] = 56,["19"] = 56,["20"] = 56,["21"] = 57,["22"] = 56,["23"] = 56,["25"] = 60,["26"] = 61,["27"] = 62,["28"] = 63,["29"] = 64,["30"] = 65,["31"] = 66,["34"] = 71,["35"] = 72,["36"] = 73,["37"] = 73,["38"] = 73,["39"] = 74,["40"] = 73,["41"] = 73,["43"] = 77,["44"] = 77,["45"] = 77,["46"] = 78,["47"] = 78,["48"] = 78,["49"] = 78,["50"] = 78,["51"] = 77,["52"] = 77,["55"] = 83,["56"] = 84,["57"] = 84,["58"] = 84,["59"] = 85,["60"] = 84,["61"] = 84,["63"] = 90,["64"] = 91,["65"] = 92,["66"] = 93,["67"] = 94,["68"] = 95,["72"] = 3,["73"] = 5,["74"] = 14,["75"] = 22,["76"] = 23,["77"] = 23,["78"] = 23,["79"] = 23,["80"] = 23,["81"] = 23,["82"] = 22,["83"] = 37,["84"] = 44});
local ____exports = {}
local precacheEveryResourceInKV, precacheResource, precacheResString, precacheUnits, precacheItems, precacheEverythingFromTable
function precacheEveryResourceInKV(kvFileList, context)
    __TS__ArrayForEach(
        kvFileList,
        function(____, file)
            local kvTable = LoadKeyValues(file)
            precacheEverythingFromTable(kvTable, context)
        end
    )
end
function precacheResource(resourceList, context)
    __TS__ArrayForEach(
        resourceList,
        function(____, resource)
            precacheResString(resource, context)
        end
    )
end
function precacheResString(res, context)
    if __TS__StringEndsWith(res, ".vpcf") then
        PrecacheResource("particle", res, context)
    elseif __TS__StringEndsWith(res, ".vsndevts") then
        PrecacheResource("soundfile", res, context)
    elseif __TS__StringEndsWith(res, ".vmdl") then
        PrecacheResource("model", res, context)
    end
end
function precacheUnits(unitNamesList, context)
    if context ~= nil then
        __TS__ArrayForEach(
            unitNamesList,
            function(____, unitName)
                PrecacheUnitByNameSync(unitName, context)
            end
        )
    else
        __TS__ArrayForEach(
            unitNamesList,
            function(____, unitName)
                PrecacheUnitByNameAsync(
                    unitName,
                    function()
                    end
                )
            end
        )
    end
end
function precacheItems(itemList, context)
    __TS__ArrayForEach(
        itemList,
        function(____, itemName)
            PrecacheItemByNameSync(itemName, context)
        end
    )
end
function precacheEverythingFromTable(kvTable, context)
    for k, v in pairs(kvTable) do
        if type(v) == "table" then
            precacheEverythingFromTable(v, context)
        elseif type(v) == "string" then
            precacheResString(v, context)
        end
    end
end
function ____exports.default(context)
    precacheResource({}, context)
    precacheEveryResourceInKV({}, context)
    precacheUnits({
        "npc_dota_hero_antimage",
        "npc_dota_hero_crystal_maiden",
        "npc_dota_hero_axe",
        "npc_dota_hero_drow_ranger",
        "npc_dota_hero_bounty_hunter",
        "npc_dota_hero_gyrocopter"
    }, context)
    precacheItems({}, context)
    print("[Precache] Precache finished.")
end
return ____exports
