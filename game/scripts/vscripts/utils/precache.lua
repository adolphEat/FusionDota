local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__StringEndsWith = ____lualib.__TS__StringEndsWith
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 91,["8"] = 91,["9"] = 92,["10"] = 92,["11"] = 92,["12"] = 93,["13"] = 94,["14"] = 92,["15"] = 92,["17"] = 98,["18"] = 99,["19"] = 99,["20"] = 99,["21"] = 100,["22"] = 99,["23"] = 99,["25"] = 103,["26"] = 104,["27"] = 105,["28"] = 106,["29"] = 107,["30"] = 108,["31"] = 109,["34"] = 114,["35"] = 115,["36"] = 116,["37"] = 116,["38"] = 116,["39"] = 117,["40"] = 116,["41"] = 116,["43"] = 120,["44"] = 120,["45"] = 120,["46"] = 121,["47"] = 121,["48"] = 121,["49"] = 121,["50"] = 121,["51"] = 120,["52"] = 120,["55"] = 126,["56"] = 127,["57"] = 127,["58"] = 127,["59"] = 128,["60"] = 127,["61"] = 127,["63"] = 133,["64"] = 134,["65"] = 135,["66"] = 136,["67"] = 137,["68"] = 138,["72"] = 3,["73"] = 5,["74"] = 6,["75"] = 6,["76"] = 6,["77"] = 6,["78"] = 6,["79"] = 6,["80"] = 6,["81"] = 6,["82"] = 6,["83"] = 6,["84"] = 6,["85"] = 6,["86"] = 6,["87"] = 5,["88"] = 29,["89"] = 37,["90"] = 38,["91"] = 38,["92"] = 38,["93"] = 38,["94"] = 38,["95"] = 38,["96"] = 38,["97"] = 38,["98"] = 38,["99"] = 38,["100"] = 38,["101"] = 38,["102"] = 38,["103"] = 38,["104"] = 38,["105"] = 38,["106"] = 38,["107"] = 38,["108"] = 38,["109"] = 38,["110"] = 38,["111"] = 38,["112"] = 38,["113"] = 38,["114"] = 37,["115"] = 80,["116"] = 87});
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
        "particles/heroes/crystal_maiden/maiden_base_attack.vpcf",
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
