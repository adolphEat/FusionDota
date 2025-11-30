local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__StringEndsWith = ____lualib.__TS__StringEndsWith
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 90,["8"] = 90,["9"] = 91,["10"] = 91,["11"] = 91,["12"] = 92,["13"] = 93,["14"] = 91,["15"] = 91,["17"] = 97,["18"] = 98,["19"] = 98,["20"] = 98,["21"] = 99,["22"] = 98,["23"] = 98,["25"] = 102,["26"] = 103,["27"] = 104,["28"] = 105,["29"] = 106,["30"] = 107,["31"] = 108,["34"] = 113,["35"] = 114,["36"] = 115,["37"] = 115,["38"] = 115,["39"] = 116,["40"] = 115,["41"] = 115,["43"] = 119,["44"] = 119,["45"] = 119,["46"] = 120,["47"] = 120,["48"] = 120,["49"] = 120,["50"] = 120,["51"] = 119,["52"] = 119,["55"] = 125,["56"] = 126,["57"] = 126,["58"] = 126,["59"] = 127,["60"] = 126,["61"] = 126,["63"] = 132,["64"] = 133,["65"] = 134,["66"] = 135,["67"] = 136,["68"] = 137,["72"] = 3,["73"] = 5,["74"] = 6,["75"] = 6,["76"] = 6,["77"] = 6,["78"] = 6,["79"] = 6,["80"] = 6,["81"] = 6,["82"] = 6,["83"] = 6,["84"] = 6,["85"] = 6,["86"] = 5,["87"] = 28,["88"] = 36,["89"] = 37,["90"] = 37,["91"] = 37,["92"] = 37,["93"] = 37,["94"] = 37,["95"] = 37,["96"] = 37,["97"] = 37,["98"] = 37,["99"] = 37,["100"] = 37,["101"] = 37,["102"] = 37,["103"] = 37,["104"] = 37,["105"] = 37,["106"] = 37,["107"] = 37,["108"] = 37,["109"] = 37,["110"] = 37,["111"] = 37,["112"] = 37,["113"] = 36,["114"] = 79,["115"] = 86});
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
    precacheResource({
        "particles/units/heroes/hero_razor/razor_base_attack.vpcf",
        "particles/heroes/razor/razor_base_attack.vpcf",
        "particles/heroes/enchantress/enchantress_base_attack.vpcf",
        "particles/heroes/oracle/oracle_base_attack.vpcf",
        "particles/heroes/ember_spirit/huskar_inner_fire.vpcf",
        "particles/heroes/oracle/oracle_fatesedict.vpcf",
        "particles/heroes/enchantress/enchantress_natures_attendants_count8.vpcf",
        "soundevents/game_sounds_heroes/game_sounds_razor.vsndevts",
        "soundevents/game_sounds_heroes/game_sounds_enchantress.vsndevts",
        "soundevents/game_sounds_heroes/game_sounds_oracle.vsndevts",
        "soundevents/game_sounds_heroes/game_sounds_ember_spirit.vsndevts",
        "materials/vgui/hud/heroportraits/portraitbackground_oracle.vmat"
    }, context)
    precacheEveryResourceInKV({}, context)
    precacheUnits({
        "npc_dota_hero_treant",
        "npc_dota_hero_windrunner",
        "npc_dota_hero_mars",
        "npc_dota_hero_razor",
        "npc_dota_hero_lion",
        "npc_dota_hero_enchantress",
        "npc_dota_hero_axe",
        "npc_dota_hero_ursa",
        "npc_dota_hero_oracle",
        "npc_dota_hero_drow_ranger",
        "npc_dota_hero_lina",
        "npc_dota_hero_ember_spirit",
        "npc_dota_hero_antimage",
        "npc_dota_hero_terrorblade",
        "npc_dota_hero_viper",
        "npc_dota_hero_death_prophet",
        "npc_dota_hero_abyssal_underlord",
        "npc_dota_hero_nevermore",
        "npc_dota_hero_crystal_maiden",
        "npc_dota_hero_ogre_magi",
        "npc_dota_hero_enigma",
        "npc_dota_hero_dawnbreaker",
        "npc_dota_hero_zuus",
        "npc_dota_hero_gyrocopter"
    }, context)
    precacheItems({}, context)
    print("[Precache] Precache finished.")
end
return ____exports
