local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__ArrayPushArray = ____lualib.__TS__ArrayPushArray
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__Number = ____lualib.__TS__Number
local __TS__NumberIsNaN = ____lualib.__TS__NumberIsNaN
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__StringTrim = ____lualib.__TS__StringTrim
local __TS__ParseFloat = ____lualib.__TS__ParseFloat
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["24"] = 6,["25"] = 11,["26"] = 12,["27"] = 14,["28"] = 15,["29"] = 18,["30"] = 18,["31"] = 18,["33"] = 20,["34"] = 21,["35"] = 22,["36"] = 40,["37"] = 39,["38"] = 32,["39"] = 33,["40"] = 34,["42"] = 36,["43"] = 32,["44"] = 46,["47"] = 51,["50"] = 48,["51"] = 49,["57"] = 46,["58"] = 58,["61"] = 97,["62"] = 98,["63"] = 99,["64"] = 99,["65"] = 100,["68"] = 60,["69"] = 61,["70"] = 64,["71"] = 65,["72"] = 68,["73"] = 71,["74"] = 74,["75"] = 75,["76"] = 76,["77"] = 77,["79"] = 80,["80"] = 81,["82"] = 85,["83"] = 86,["84"] = 88,["85"] = 89,["86"] = 92,["87"] = 94,["93"] = 59,["96"] = 58,["97"] = 107,["100"] = 130,["101"] = 132,["102"] = 133,["103"] = 133,["104"] = 133,["105"] = 134,["106"] = 135,["107"] = 136,["112"] = 110,["115"] = 116,["116"] = 117,["119"] = 114,["125"] = 120,["126"] = 120,["127"] = 120,["128"] = 121,["129"] = 122,["130"] = 123,["132"] = 125,["140"] = 107,["141"] = 145,["144"] = 168,["145"] = 170,["146"] = 171,["147"] = 171,["148"] = 171,["149"] = 172,["150"] = 173,["151"] = 174,["156"] = 148,["159"] = 154,["160"] = 155,["163"] = 152,["169"] = 158,["170"] = 158,["171"] = 158,["172"] = 159,["173"] = 160,["174"] = 161,["176"] = 163,["184"] = 145,["185"] = 183,["188"] = 199,["189"] = 200,["192"] = 185,["193"] = 185,["194"] = 185,["195"] = 185,["196"] = 185,["197"] = 185,["198"] = 185,["199"] = 185,["200"] = 185,["201"] = 185,["202"] = 185,["203"] = 185,["204"] = 185,["210"] = 184,["213"] = 183,["214"] = 207,["217"] = 217,["218"] = 218,["221"] = 209,["222"] = 209,["223"] = 209,["224"] = 209,["225"] = 209,["226"] = 209,["227"] = 209,["233"] = 208,["236"] = 207,["237"] = 225,["238"] = 226,["239"] = 226,["240"] = 226,["242"] = 226,["244"] = 226,["245"] = 227,["246"] = 227,["247"] = 227,["249"] = 227,["251"] = 227,["252"] = 225,["253"] = 233,["254"] = 234,["255"] = 234,["256"] = 234,["257"] = 234,["258"] = 235,["260"] = 237,["261"] = 233,["262"] = 243,["263"] = 244,["264"] = 244,["265"] = 244,["266"] = 244,["267"] = 245,["269"] = 247,["270"] = 243,["271"] = 253,["272"] = 254,["273"] = 255,["275"] = 258,["276"] = 258,["277"] = 258,["278"] = 258,["279"] = 259,["280"] = 253,["281"] = 269,["282"] = 270,["283"] = 272,["284"] = 274,["286"] = 280,["287"] = 281,["288"] = 282,["289"] = 283,["290"] = 285,["291"] = 286,["292"] = 287,["293"] = 287,["294"] = 287,["296"] = 287,["298"] = 284,["301"] = 292,["302"] = 292,["303"] = 292,["305"] = 292,["307"] = 292,["308"] = 269,["309"] = 301,["310"] = 302,["311"] = 304,["312"] = 305,["314"] = 308,["315"] = 309,["316"] = 310,["317"] = 311,["318"] = 312,["321"] = 316,["322"] = 301,["323"] = 322,["324"] = 323,["325"] = 324,["326"] = 324,["327"] = 324,["328"] = 324,["329"] = 324,["330"] = 324,["331"] = 324,["332"] = 324,["333"] = 324,["334"] = 324,["335"] = 324,["336"] = 323,["337"] = 337,["338"] = 337,["339"] = 337,["340"] = 337,["341"] = 337,["342"] = 337,["343"] = 337,["344"] = 337,["345"] = 337,["346"] = 337,["347"] = 337,["348"] = 323,["349"] = 350,["350"] = 350,["351"] = 350,["352"] = 350,["353"] = 350,["354"] = 350,["355"] = 350,["356"] = 350,["357"] = 350,["358"] = 350,["359"] = 350,["360"] = 323,["361"] = 322,["362"] = 369,["363"] = 370,["364"] = 371,["365"] = 371,["366"] = 371,["367"] = 371,["368"] = 371,["369"] = 371,["370"] = 370,["371"] = 378,["372"] = 378,["373"] = 378,["374"] = 378,["375"] = 378,["376"] = 378,["377"] = 370,["378"] = 385,["379"] = 385,["380"] = 385,["381"] = 385,["382"] = 385,["383"] = 385,["384"] = 370,["385"] = 392,["386"] = 392,["387"] = 392,["388"] = 392,["389"] = 392,["390"] = 392,["391"] = 370,["392"] = 399,["393"] = 399,["394"] = 399,["395"] = 399,["396"] = 399,["397"] = 399,["398"] = 370,["399"] = 406,["400"] = 406,["401"] = 406,["402"] = 406,["403"] = 406,["404"] = 406,["405"] = 370,["406"] = 370,["407"] = 369,["408"] = 419,["409"] = 420,["410"] = 428,["411"] = 428,["412"] = 428,["413"] = 430,["414"] = 431,["415"] = 431,["416"] = 432,["417"] = 432,["419"] = 435,["420"] = 436,["421"] = 436,["422"] = 437,["423"] = 437,["425"] = 441,["426"] = 442,["427"] = 442,["429"] = 445,["430"] = 446,["431"] = 446,["432"] = 447,["435"] = 452,["436"] = 452,["437"] = 452,["438"] = 453,["439"] = 454,["440"] = 454,["441"] = 455,["443"] = 459,["444"] = 460,["445"] = 461,["446"] = 461,["447"] = 462,["451"] = 467,["452"] = 419,["453"] = 473,["456"] = 501,["459"] = 475,["460"] = 477,["461"] = 477,["462"] = 477,["463"] = 477,["464"] = 477,["465"] = 477,["466"] = 477,["467"] = 477,["468"] = 477,["469"] = 477,["470"] = 477,["471"] = 486,["472"] = 486,["473"] = 486,["474"] = 486,["475"] = 486,["476"] = 486,["477"] = 486,["478"] = 486,["479"] = 492,["480"] = 492,["481"] = 492,["482"] = 492,["483"] = 492,["484"] = 492,["485"] = 492,["492"] = 473,["493"] = 508,["494"] = 509,["495"] = 508,["496"] = 515,["497"] = 516,["498"] = 515,["499"] = 522,["500"] = 523,["501"] = 522,["502"] = 529,["503"] = 530,["504"] = 530,["505"] = 530,["506"] = 530,["507"] = 529,["508"] = 538,["509"] = 539,["510"] = 539,["514"] = 551,["515"] = 552,["518"] = 543,["519"] = 545,["520"] = 546,["522"] = 546,["524"] = 546,["526"] = 549,["532"] = 541,["535"] = 538,["536"] = 559,["537"] = 560,["538"] = 561,["539"] = 561,["540"] = 561,["541"] = 562,["542"] = 562,["543"] = 562,["544"] = 563,["545"] = 563,["546"] = 562,["547"] = 564,["548"] = 564,["549"] = 561,["550"] = 561,["551"] = 559,["552"] = 571,["553"] = 572,["554"] = 571,["555"] = 578,["556"] = 579,["557"] = 579,["558"] = 579,["559"] = 579,["560"] = 579,["561"] = 579,["562"] = 579,["563"] = 588,["564"] = 589,["565"] = 592,["567"] = 597,["568"] = 598,["570"] = 602,["571"] = 578,["572"] = 608,["573"] = 609,["574"] = 610,["575"] = 608});
local ____exports = {}
local ____DataTypes = require("modules.battle-system.Data.DataTypes")
local WinConditionType = ____DataTypes.WinConditionType
local FormationType = ____DataTypes.FormationType
local isValidLevelConfig = ____DataTypes.isValidLevelConfig
local isValidTeamConfig = ____DataTypes.isValidTeamConfig
____exports.BattleConfigLoader = __TS__Class()
local BattleConfigLoader = ____exports.BattleConfigLoader
BattleConfigLoader.name = "BattleConfigLoader"
function BattleConfigLoader.prototype.____constructor(self)
    self.levelConfigs = __TS__New(Map)
    self.teamConfigs = __TS__New(Map)
    self.loadStatus = {loaded = false, lastLoadTime = 0, errors = {}}
    self:initialize()
end
function BattleConfigLoader.getInstance(self)
    if not ____exports.BattleConfigLoader.instance then
        ____exports.BattleConfigLoader.instance = __TS__New(____exports.BattleConfigLoader)
    end
    return ____exports.BattleConfigLoader.instance
end
function BattleConfigLoader.prototype.initialize(self)
    do
        local function ____catch(____error)
            print("[BattleConfigLoader] Initialization failed: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            self:loadConfigs()
            print("[BattleConfigLoader] Initialized successfully")
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function BattleConfigLoader.prototype.loadConfigs(self)
    do
        local function ____catch(____error)
            local errorMsg = "Failed to load configs: " .. tostring(____error)
            print("[BattleConfigLoader] " .. errorMsg)
            local ____self_loadStatus_errors_0 = self.loadStatus.errors
            ____self_loadStatus_errors_0[#____self_loadStatus_errors_0 + 1] = errorMsg
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            self.loadStatus.errors = {}
            local startTime = Date:now()
            self.levelConfigs:clear()
            self.teamConfigs:clear()
            self:loadLevelConfigs()
            self:loadTeamConfigs()
            local validation = self:validateConfigs()
            if #validation.errors > 0 then
                __TS__ArrayPushArray(self.loadStatus.errors, validation.errors)
                print("[BattleConfigLoader] Validation errors: " .. table.concat(validation.errors, ", "))
            end
            if #validation.warnings > 0 then
                print("[BattleConfigLoader] Validation warnings: " .. table.concat(validation.warnings, ", "))
            end
            self.loadStatus.loaded = true
            self.loadStatus.lastLoadTime = Date:now()
            local loadTime = Date:now() - startTime
            print(((((("[BattleConfigLoader] Loaded " .. tostring(self.levelConfigs.size)) .. " levels, ") .. tostring(self.teamConfigs.size)) .. " team configs in ") .. tostring(loadTime)) .. "ms")
            self:syncToNetTable()
            return true, #self.loadStatus.errors == 0
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function BattleConfigLoader.prototype.loadLevelConfigs(self)
    do
        local function ____catch(____error)
            print("[BattleConfigLoader] Error loading level configs: " .. tostring(____error))
            local defaultConfigs = self:getDefaultLevelConfigs()
            for ____, ____value in ipairs(__TS__ObjectEntries(defaultConfigs)) do
                local key = ____value[1]
                local config = ____value[2]
                local levelConfig = self:parseLevelConfig(key, config)
                if levelConfig then
                    self.levelConfigs:set(levelConfig.level_id, levelConfig)
                end
            end
        end
        local ____try, ____hasReturned = pcall(function()
            local levelData = {}
            do
                local function ____catch(____error)
                    print("[BattleConfigLoader] Level config file not found, using defaults: " .. tostring(____error))
                    levelData = self:getDefaultLevelConfigs()
                end
                local ____try, ____hasReturned = pcall(function()
                    levelData = self:getDefaultLevelConfigs()
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
            for ____, ____value in ipairs(__TS__ObjectEntries(levelData)) do
                local key = ____value[1]
                local config = ____value[2]
                local levelConfig = self:parseLevelConfig(key, config)
                if levelConfig and isValidLevelConfig(nil, levelConfig) then
                    self.levelConfigs:set(levelConfig.level_id, levelConfig)
                else
                    print("[BattleConfigLoader] Invalid level config: " .. tostring(key))
                end
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function BattleConfigLoader.prototype.loadTeamConfigs(self)
    do
        local function ____catch(____error)
            print("[BattleConfigLoader] Error loading team configs: " .. tostring(____error))
            local defaultConfigs = self:getDefaultTeamConfigs()
            for ____, ____value in ipairs(__TS__ObjectEntries(defaultConfigs)) do
                local key = ____value[1]
                local config = ____value[2]
                local teamConfig = self:parseTeamConfig(key, config)
                if teamConfig then
                    self.teamConfigs:set(teamConfig.team_config_id, teamConfig)
                end
            end
        end
        local ____try, ____hasReturned = pcall(function()
            local teamData = {}
            do
                local function ____catch(____error)
                    print("[BattleConfigLoader] Team config file not found, using defaults: " .. tostring(____error))
                    teamData = self:getDefaultTeamConfigs()
                end
                local ____try, ____hasReturned = pcall(function()
                    teamData = self:getDefaultTeamConfigs()
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
            for ____, ____value in ipairs(__TS__ObjectEntries(teamData)) do
                local key = ____value[1]
                local config = ____value[2]
                local teamConfig = self:parseTeamConfig(key, config)
                if teamConfig and isValidTeamConfig(nil, teamConfig) then
                    self.teamConfigs:set(teamConfig.team_config_id, teamConfig)
                else
                    print("[BattleConfigLoader] Invalid team config: " .. tostring(key))
                end
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function BattleConfigLoader.prototype.parseLevelConfig(self, key, data)
    do
        local function ____catch(____error)
            print((("[BattleConfigLoader] Error parsing level config " .. key) .. ": ") .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            return true, {
                level_id = data.level_id or key,
                level_name = data.level_name or "Level " .. key,
                level_desc = data.level_desc or "",
                difficulty = self:parseNumber(data.difficulty, 1),
                map_area = data.map_area or "center_area",
                time_limit = self:parseNumber(data.time_limit, 300),
                win_condition = self:parseWinCondition(data.win_condition),
                team1_config = data.team1_config or "team_config_001",
                team2_config = data.team2_config or "team_config_002",
                rewards = self:parseRewards(data.rewards),
                unlock_condition = data.unlock_condition or ""
            }
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function BattleConfigLoader.prototype.parseTeamConfig(self, key, data)
    do
        local function ____catch(____error)
            print((("[BattleConfigLoader] Error parsing team config " .. key) .. ": ") .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            return true, {
                team_config_id = data.team_config_id or key,
                team_name = data.team_name or "Team " .. key,
                formation = self:parseFormation(data.formation),
                spawn_area = self:parseVector(data.spawn_area),
                unit_configs = self:parseUnitConfigs(data.unit_configs)
            }
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function BattleConfigLoader.prototype.parseNumber(self, value, defaultValue)
    local ____temp_1
    if type(value) == "string" then
        ____temp_1 = __TS__ParseInt(value)
    else
        ____temp_1 = value
    end
    local parsed = ____temp_1
    local ____temp_2
    if type(parsed) == "number" and not __TS__NumberIsNaN(__TS__Number(parsed)) then
        ____temp_2 = parsed
    else
        ____temp_2 = defaultValue
    end
    return ____temp_2
end
function BattleConfigLoader.prototype.parseWinCondition(self, condition)
    if __TS__ArrayIncludes(
        __TS__ObjectValues(WinConditionType),
        condition
    ) then
        return condition
    end
    return WinConditionType.ELIMINATE_ALL
end
function BattleConfigLoader.prototype.parseFormation(self, formation)
    if __TS__ArrayIncludes(
        __TS__ObjectValues(FormationType),
        formation
    ) then
        return formation
    end
    return FormationType.LINE
end
function BattleConfigLoader.prototype.parseVector(self, vectorStr)
    if type(vectorStr) ~= "string" then
        return Vector(0, 0, 128)
    end
    local parts = __TS__ArrayMap(
        __TS__StringSplit(vectorStr, ","),
        function(____, s) return __TS__ParseFloat(__TS__StringTrim(s)) end
    )
    return Vector(parts[1] or 0, parts[2] or 0, parts[3] or 128)
end
function BattleConfigLoader.prototype.parseUnitConfigs(self, configStr)
    local configs = {}
    if type(configStr) ~= "string" or not configStr then
        return {{unit_id = "npc_dota_neutral_kobold", count = 1}}
    end
    local ____pairs = __TS__StringSplit(configStr, ",")
    for ____, pair in ipairs(____pairs) do
        local unitId, countStr, levelStr = unpack(__TS__StringSplit(pair, ":"))
        if unitId and countStr then
            local ____TS__StringTrim_result_4 = __TS__StringTrim(unitId)
            local ____temp_5 = __TS__ParseInt(__TS__StringTrim(countStr)) or 1
            local ____levelStr_3
            if levelStr then
                ____levelStr_3 = __TS__ParseInt(__TS__StringTrim(levelStr))
            else
                ____levelStr_3 = nil
            end
            configs[#configs + 1] = {unit_id = ____TS__StringTrim_result_4, count = ____temp_5, level = ____levelStr_3}
        end
    end
    local ____temp_6
    if #configs > 0 then
        ____temp_6 = configs
    else
        ____temp_6 = {{unit_id = "npc_dota_neutral_kobold", count = 1}}
    end
    return ____temp_6
end
function BattleConfigLoader.prototype.parseRewards(self, rewardStr)
    local rewards = {}
    if type(rewardStr) ~= "string" or not rewardStr then
        return rewards
    end
    local ____pairs = __TS__StringSplit(rewardStr, ",")
    for ____, pair in ipairs(____pairs) do
        local ____type, valueStr = unpack(__TS__StringSplit(pair, ":"))
        if ____type and valueStr then
            rewards[__TS__StringTrim(____type)] = __TS__ParseInt(__TS__StringTrim(valueStr)) or 0
        end
    end
    return rewards
end
function BattleConfigLoader.prototype.getDefaultLevelConfigs(self)
    return {level_001 = {
        level_id = "level_001",
        level_name = "基础对战",
        level_desc = "简单的单位对战训练",
        difficulty = 1,
        map_area = "center_area",
        time_limit = 300,
        win_condition = WinConditionType.ELIMINATE_ALL,
        team1_config = "team_config_001",
        team2_config = "team_config_002",
        rewards = "exp:100,gold:50",
        unlock_condition = ""
    }, level_002 = {
        level_id = "level_002",
        level_name = "混合部队",
        level_desc = "不同类型单位的混合对战",
        difficulty = 2,
        map_area = "center_area",
        time_limit = 400,
        win_condition = WinConditionType.ELIMINATE_ALL,
        team1_config = "team_config_003",
        team2_config = "team_config_004",
        rewards = "exp:200,gold:100",
        unlock_condition = "level_001:win"
    }, level_003 = {
        level_id = "level_003",
        level_name = "精英对决",
        level_desc = "强化单位的激烈对战",
        difficulty = 3,
        map_area = "center_area",
        time_limit = 500,
        win_condition = WinConditionType.ELIMINATE_ALL,
        team1_config = "team_config_005",
        team2_config = "team_config_006",
        rewards = "exp:300,gold:200",
        unlock_condition = "level_002:win"
    }}
end
function BattleConfigLoader.prototype.getDefaultTeamConfigs(self)
    return {
        team_config_001 = {
            team_config_id = "team_config_001",
            team_name = "哥布林小队",
            formation = FormationType.LINE,
            spawn_area = "-500,0,128",
            unit_configs = "npc_dota_neutral_kobold:3"
        },
        team_config_002 = {
            team_config_id = "team_config_002",
            team_name = "敌方小队",
            formation = FormationType.LINE,
            spawn_area = "500,0,128",
            unit_configs = "npc_dota_neutral_kobold:3"
        },
        team_config_003 = {
            team_config_id = "team_config_003",
            team_name = "混合部队A",
            formation = FormationType.CIRCLE,
            spawn_area = "-600,0,128",
            unit_configs = "npc_dota_neutral_kobold:2,npc_dota_neutral_centaur_khan:1"
        },
        team_config_004 = {
            team_config_id = "team_config_004",
            team_name = "混合部队B",
            formation = FormationType.CIRCLE,
            spawn_area = "600,0,128",
            unit_configs = "npc_dota_neutral_kobold:2,npc_dota_neutral_centaur_khan:1"
        },
        team_config_005 = {
            team_config_id = "team_config_005",
            team_name = "精英战士",
            formation = FormationType.CUSTOM,
            spawn_area = "-400,0,128",
            unit_configs = "npc_dota_neutral_centaur_khan:1:5"
        },
        team_config_006 = {
            team_config_id = "team_config_006",
            team_name = "精英对手",
            formation = FormationType.CUSTOM,
            spawn_area = "400,0,128",
            unit_configs = "npc_dota_neutral_centaur_khan:1:5"
        }
    }
end
function BattleConfigLoader.prototype.validateConfigs(self)
    local result = {isValid = true, errors = {}, warnings = {}, missingConfigs = {}}
    for ____, ____value in __TS__Iterator(self.levelConfigs) do
        local levelId = ____value[1]
        local levelConfig = ____value[2]
        if not self.teamConfigs:has(levelConfig.team1_config) then
            local ____result_warnings_7 = result.warnings
            ____result_warnings_7[#____result_warnings_7 + 1] = ((("Level " .. levelId) .. ": Team config ") .. levelConfig.team1_config) .. " not found"
            local ____result_missingConfigs_8 = result.missingConfigs
            ____result_missingConfigs_8[#____result_missingConfigs_8 + 1] = levelConfig.team1_config
        end
        if not self.teamConfigs:has(levelConfig.team2_config) then
            local ____result_warnings_9 = result.warnings
            ____result_warnings_9[#____result_warnings_9 + 1] = ((("Level " .. levelId) .. ": Team config ") .. levelConfig.team2_config) .. " not found"
            local ____result_missingConfigs_10 = result.missingConfigs
            ____result_missingConfigs_10[#____result_missingConfigs_10 + 1] = levelConfig.team2_config
        end
        if levelConfig.difficulty < 1 or levelConfig.difficulty > 5 then
            local ____result_warnings_11 = result.warnings
            ____result_warnings_11[#____result_warnings_11 + 1] = ((("Level " .. levelId) .. ": Difficulty ") .. tostring(levelConfig.difficulty)) .. " out of range (1-5)"
        end
        if levelConfig.time_limit <= 0 then
            local ____result_errors_12 = result.errors
            ____result_errors_12[#____result_errors_12 + 1] = (("Level " .. levelId) .. ": Invalid time limit ") .. tostring(levelConfig.time_limit)
            result.isValid = false
        end
    end
    for ____, ____value in __TS__Iterator(self.teamConfigs) do
        local teamId = ____value[1]
        local teamConfig = ____value[2]
        if #teamConfig.unit_configs == 0 then
            local ____result_errors_13 = result.errors
            ____result_errors_13[#____result_errors_13 + 1] = ("Team " .. teamId) .. ": No unit configs defined"
            result.isValid = false
        end
        for ____, unitConfig in ipairs(teamConfig.unit_configs) do
            if unitConfig.count <= 0 then
                local ____result_errors_14 = result.errors
                ____result_errors_14[#____result_errors_14 + 1] = (((("Team " .. teamId) .. ": Invalid unit count ") .. tostring(unitConfig.count)) .. " for ") .. unitConfig.unit_id
                result.isValid = false
            end
        end
    end
    return result
end
function BattleConfigLoader.prototype.syncToNetTable(self)
    do
        local function ____catch(____error)
            print("[BattleConfigLoader] Failed to sync to net table: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            if GameRules.XNetTable then
                local levelList = __TS__ArrayMap(
                    __TS__ArrayFrom(self.levelConfigs:values()),
                    function(____, level) return {
                        id = level.level_id,
                        name = level.level_name,
                        description = level.level_desc,
                        difficulty = level.difficulty,
                        timeLimit = level.time_limit,
                        rewards = level.rewards
                    } end
                )
                GameRules.XNetTable:SetTableValue(
                    "battle_system",
                    "available_levels",
                    {
                        levels = levelList,
                        lastUpdate = Date:now()
                    }
                )
                GameRules.XNetTable:SetTableValue("battle_system", "config_status", {
                    loaded = self.loadStatus.loaded,
                    levelCount = self.levelConfigs.size,
                    teamCount = self.teamConfigs.size,
                    lastLoadTime = self.loadStatus.lastLoadTime,
                    errors = self.loadStatus.errors
                })
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function BattleConfigLoader.prototype.getLevelConfig(self, levelId)
    return self.levelConfigs:get(levelId) or nil
end
function BattleConfigLoader.prototype.getTeamConfig(self, teamConfigId)
    return self.teamConfigs:get(teamConfigId) or nil
end
function BattleConfigLoader.prototype.getAllLevels(self)
    return __TS__ArrayFrom(self.levelConfigs:values())
end
function BattleConfigLoader.prototype.getAvailableLevels(self, playerProgress)
    return __TS__ArrayFilter(
        self:getAllLevels(),
        function(____, level) return self:isLevelUnlocked(level, playerProgress or ({})) end
    )
end
function BattleConfigLoader.prototype.isLevelUnlocked(self, level, playerProgress)
    if not level.unlock_condition then
        return true
    end
    do
        local function ____catch(____error)
            print((("[BattleConfigLoader] Error checking unlock condition for " .. level.level_id) .. ": ") .. tostring(____error))
            return true, true
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local requiredLevel, condition = unpack(__TS__StringSplit(level.unlock_condition, ":"))
            if condition == "win" then
                local ____opt_15 = playerProgress.completedLevels
                if ____opt_15 ~= nil then
                    ____opt_15 = ____opt_15:includes(requiredLevel)
                end
                return true, ____opt_15 or false
            end
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function BattleConfigLoader.prototype.searchLevels(self, searchTerm)
    local term = string.lower(searchTerm)
    return __TS__ArrayFilter(
        self:getAllLevels(),
        function(____, level) return __TS__StringIncludes(
            string.lower(level.level_name),
            term
        ) or __TS__StringIncludes(
            string.lower(level.level_desc),
            term
        ) or __TS__StringIncludes(
            string.lower(level.level_id),
            term
        ) end
    )
end
function BattleConfigLoader.prototype.getLoadStatus(self)
    return __TS__ObjectAssign({}, self.loadStatus)
end
function BattleConfigLoader.prototype.getConfigStats(self)
    local stats = {
        totalLevels = self.levelConfigs.size,
        totalTeams = self.teamConfigs.size,
        difficultyDistribution = {},
        winConditionDistribution = {},
        formationDistribution = {}
    }
    for ____, level in __TS__Iterator(self.levelConfigs:values()) do
        stats.difficultyDistribution[level.difficulty] = (stats.difficultyDistribution[level.difficulty] or 0) + 1
        stats.winConditionDistribution[level.win_condition] = (stats.winConditionDistribution[level.win_condition] or 0) + 1
    end
    for ____, team in __TS__Iterator(self.teamConfigs:values()) do
        stats.formationDistribution[team.formation] = (stats.formationDistribution[team.formation] or 0) + 1
    end
    return stats
end
function BattleConfigLoader.prototype.reloadConfigs(self)
    print("[BattleConfigLoader] Reloading configurations...")
    return self:loadConfigs()
end
return ____exports
