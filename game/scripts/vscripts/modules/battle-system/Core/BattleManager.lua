local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__AsyncAwaiter = ____lualib.__TS__AsyncAwaiter
local __TS__Await = ____lualib.__TS__Await
local Set = ____lualib.Set
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__NumberToString = ____lualib.__TS__NumberToString
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["26"] = 6,["27"] = 10,["28"] = 11,["29"] = 12,["30"] = 14,["31"] = 19,["32"] = 19,["33"] = 20,["34"] = 20,["35"] = 21,["36"] = 21,["37"] = 23,["38"] = 23,["39"] = 25,["40"] = 25,["41"] = 25,["43"] = 27,["44"] = 28,["45"] = 31,["46"] = 41,["47"] = 42,["48"] = 43,["49"] = 44,["50"] = 40,["51"] = 33,["52"] = 34,["53"] = 35,["55"] = 37,["56"] = 33,["57"] = 50,["58"] = 52,["59"] = 52,["60"] = 52,["61"] = 53,["62"] = 54,["63"] = 55,["65"] = 52,["66"] = 52,["67"] = 59,["68"] = 59,["69"] = 59,["70"] = 60,["71"] = 61,["72"] = 59,["73"] = 59,["74"] = 50,["75"] = 68,["78"] = 70,["79"] = 73,["80"] = 74,["82"] = 75,["86"] = 79,["87"] = 82,["88"] = 85,["89"] = 88,["90"] = 91,["91"] = 94,["92"] = 101,["93"] = 103,["94"] = 104,["96"] = 69,["99"] = 107,["100"] = 108,["102"] = 69,["104"] = 68,["105"] = 115,["106"] = 116,["107"] = 116,["108"] = 116,["109"] = 116,["110"] = 116,["111"] = 116,["112"] = 116,["113"] = 116,["114"] = 116,["115"] = 126,["116"] = 115,["117"] = 132,["119"] = 133,["122"] = 135,["123"] = 135,["124"] = 138,["125"] = 139,["126"] = 140,["127"] = 141,["129"] = 145,["130"] = 146,["131"] = 147,["132"] = 148,["134"] = 151,["136"] = 132,["137"] = 157,["138"] = 158,["139"] = 158,["140"] = 158,["141"] = 158,["142"] = 158,["143"] = 158,["144"] = 158,["145"] = 158,["146"] = 166,["147"] = 166,["148"] = 166,["149"] = 166,["150"] = 158,["151"] = 158,["152"] = 170,["153"] = 176,["154"] = 179,["156"] = 180,["157"] = 180,["158"] = 181,["159"] = 184,["160"] = 185,["161"] = 185,["162"] = 185,["163"] = 186,["164"] = 186,["165"] = 186,["166"] = 186,["167"] = 186,["168"] = 186,["169"] = 186,["170"] = 185,["171"] = 185,["173"] = 189,["174"] = 189,["175"] = 189,["176"] = 189,["177"] = 189,["178"] = 189,["179"] = 189,["181"] = 192,["182"] = 180,["186"] = 196,["187"] = 157,["188"] = 202,["189"] = 209,["190"] = 216,["191"] = 218,["192"] = 219,["193"] = 219,["194"] = 220,["195"] = 222,["196"] = 223,["198"] = 227,["199"] = 227,["200"] = 227,["201"] = 227,["202"] = 227,["203"] = 227,["204"] = 227,["205"] = 227,["206"] = 233,["207"] = 233,["208"] = 233,["209"] = 233,["210"] = 233,["211"] = 233,["212"] = 233,["213"] = 233,["214"] = 233,["216"] = 202,["217"] = 245,["218"] = 250,["220"] = 252,["221"] = 260,["222"] = 253,["225"] = 254,["226"] = 254,["227"] = 255,["228"] = 254,["233"] = 259,["235"] = 260,["237"] = 261,["238"] = 261,["239"] = 262,["240"] = 263,["241"] = 264,["242"] = 265,["243"] = 261,["248"] = 269,["251"] = 271,["252"] = 271,["253"] = 272,["254"] = 273,["255"] = 274,["256"] = 271,["261"] = 278,["263"] = 279,["265"] = 280,["266"] = 280,["267"] = 281,["268"] = 282,["269"] = 283,["270"] = 280,["277"] = 288,["278"] = 288,["279"] = 289,["280"] = 290,["281"] = 288,["286"] = 294,["287"] = 245,["288"] = 300,["289"] = 301,["292"] = 304,["293"] = 311,["294"] = 317,["295"] = 300,["296"] = 323,["297"] = 324,["300"] = 326,["301"] = 329,["302"] = 329,["303"] = 329,["304"] = 330,["305"] = 331,["307"] = 335,["308"] = 336,["309"] = 336,["310"] = 339,["311"] = 340,["313"] = 346,["314"] = 347,["315"] = 348,["318"] = 353,["319"] = 355,["320"] = 329,["321"] = 329,["322"] = 359,["323"] = 323,["324"] = 365,["325"] = 366,["326"] = 365,["327"] = 372,["328"] = 374,["329"] = 374,["330"] = 374,["331"] = 374,["332"] = 377,["333"] = 377,["334"] = 377,["335"] = 377,["336"] = 378,["337"] = 379,["338"] = 382,["340"] = 389,["341"] = 389,["342"] = 389,["343"] = 389,["344"] = 389,["345"] = 389,["346"] = 389,["347"] = 389,["348"] = 389,["349"] = 397,["350"] = 372,["351"] = 403,["352"] = 404,["355"] = 408,["356"] = 408,["358"] = 411,["359"] = 412,["361"] = 413,["364"] = 416,["366"] = 417,["370"] = 422,["373"] = 403,["374"] = 429,["375"] = 430,["378"] = 432,["379"] = 433,["380"] = 435,["381"] = 436,["382"] = 437,["383"] = 438,["384"] = 439,["385"] = 440,["387"] = 429,["388"] = 447,["389"] = 448,["392"] = 451,["393"] = 452,["394"] = 453,["395"] = 455,["396"] = 456,["397"] = 457,["398"] = 458,["399"] = 459,["400"] = 461,["401"] = 461,["402"] = 461,["403"] = 461,["404"] = 462,["405"] = 462,["406"] = 462,["407"] = 462,["408"] = 464,["409"] = 465,["410"] = 466,["411"] = 467,["413"] = 469,["416"] = 472,["419"] = 447,["420"] = 480,["421"] = 481,["424"] = 484,["425"] = 485,["427"] = 488,["429"] = 480,["430"] = 495,["431"] = 496,["434"] = 498,["435"] = 498,["436"] = 498,["437"] = 498,["439"] = 498,["441"] = 498,["442"] = 500,["443"] = 501,["444"] = 502,["445"] = 505,["446"] = 506,["447"] = 507,["449"] = 511,["450"] = 514,["451"] = 517,["452"] = 520,["453"] = 525,["454"] = 495,["455"] = 531,["456"] = 532,["458"] = 533,["462"] = 536,["463"] = 536,["464"] = 536,["465"] = 536,["466"] = 536,["467"] = 536,["468"] = 536,["469"] = 543,["470"] = 543,["471"] = 543,["472"] = 544,["473"] = 545,["474"] = 546,["475"] = 547,["476"] = 547,["477"] = 547,["478"] = 547,["479"] = 548,["480"] = 549,["481"] = 549,["482"] = 543,["483"] = 543,["484"] = 543,["485"] = 543,["486"] = 543,["487"] = 543,["488"] = 543,["489"] = 543,["490"] = 543,["491"] = 536,["492"] = 536,["493"] = 536,["494"] = 531,["495"] = 558,["496"] = 559,["497"] = 559,["498"] = 562,["499"] = 563,["501"] = 567,["502"] = 568,["503"] = 568,["504"] = 568,["505"] = 568,["506"] = 568,["507"] = 568,["508"] = 568,["509"] = 568,["510"] = 568,["511"] = 568,["512"] = 568,["513"] = 575,["514"] = 576,["515"] = 576,["516"] = 576,["517"] = 576,["518"] = 576,["519"] = 576,["520"] = 576,["521"] = 576,["523"] = 558,["524"] = 586,["526"] = 587,["529"] = 589,["530"] = 592,["531"] = 593,["532"] = 594,["534"] = 598,["535"] = 599,["536"] = 602,["537"] = 604,["539"] = 586,["540"] = 610,["541"] = 612,["542"] = 613,["543"] = 611,["544"] = 611,["545"] = 611,["546"] = 611,["547"] = 611,["548"] = 611,["549"] = 619,["550"] = 620,["551"] = 621,["554"] = 625,["557"] = 623,["565"] = 631,["566"] = 610,["567"] = 637,["568"] = 638,["569"] = 639,["571"] = 641,["572"] = 641,["573"] = 637,["574"] = 647,["575"] = 648,["576"] = 649,["577"] = 650,["578"] = 651,["579"] = 652,["582"] = 647,["583"] = 660,["584"] = 661,["585"] = 661,["586"] = 661,["587"] = 661,["588"] = 661,["589"] = 661,["590"] = 661,["591"] = 661,["592"] = 660,["593"] = 667,["594"] = 668,["595"] = 667,["596"] = 674,["597"] = 675,["598"] = 674,["599"] = 681,["600"] = 682,["601"] = 689,["602"] = 691,["603"] = 693,["604"] = 694,["605"] = 694,["606"] = 695,["607"] = 696,["608"] = 696,["610"] = 698,["611"] = 698,["613"] = 702,["614"] = 705,["616"] = 708,["617"] = 709,["619"] = 712,["620"] = 681,["621"] = 718,["622"] = 719,["623"] = 720,["624"] = 721,["625"] = 722,["627"] = 718,["628"] = 729,["629"] = 730,["632"] = 732,["633"] = 733,["634"] = 734,["635"] = 735,["636"] = 736,["637"] = 737,["639"] = 729});
local ____exports = {}
local ____DataTypes = require("modules.battle-system.Data.DataTypes")
local BattleStatus = ____DataTypes.BattleStatus
local WinConditionType = ____DataTypes.WinConditionType
local FormationType = ____DataTypes.FormationType
local BattleEventType = ____DataTypes.BattleEventType
local ____ConfigLoader = require("modules.battle-system.Data.ConfigLoader")
local BattleConfigLoader = ____ConfigLoader.BattleConfigLoader
local ____EntityManager = require("modules.battle-system.Core.EntityManager")
local EntityManager = ____EntityManager.EntityManager
local ____UnitFactory = require("modules.UnitFactory")
local unitFactory = ____UnitFactory.unitFactory
local ____time_utils = require("utils.time_utils")
local getTimestampMs = ____time_utils.getTimestampMs
____exports.BattleManager = __TS__Class()
local BattleManager = ____exports.BattleManager
BattleManager.name = "BattleManager"
function BattleManager.prototype.____constructor(self)
    self.currentBattle = nil
    self.battleHistory = {}
    self.eventListeners = __TS__New(Map)
    self.configLoader = BattleConfigLoader:getInstance()
    self.entityManager = EntityManager:getInstance()
    self:initializeEventListeners()
    print("[BattleManager] Initialized")
end
function BattleManager.getInstance(self)
    if not ____exports.BattleManager.instance then
        ____exports.BattleManager.instance = __TS__New(____exports.BattleManager)
    end
    return ____exports.BattleManager.instance
end
function BattleManager.prototype.initializeEventListeners(self)
    CustomGameEventManager:RegisterListener(
        "start_new_battle",
        function(_, event)
            local levelId = event.levelId
            if levelId then
                self:startBattle(levelId)
            end
        end
    )
    CustomGameEventManager:RegisterListener(
        "end_current_battle",
        function(_, event)
            local winner = event.winner
            self:endBattle(winner)
        end
    )
end
function BattleManager.prototype.startBattle(self, levelId)
    return __TS__AsyncAwaiter(function(____awaiter_resolve)
        local ____try = __TS__AsyncAwaiter(function()
            print("[BattleManager] Starting battle: " .. levelId)
            local levelConfig = self.configLoader:getLevelConfig(levelId)
            if not levelConfig then
                error(
                    __TS__New(Error, "Level config not found: " .. levelId),
                    0
                )
            end
            __TS__Await(self:cleanupCurrentBattle())
            self.currentBattle = self:createBattle(levelConfig)
            __TS__Await(self:spawnTeams())
            self:setupBattleAI()
            self.currentBattle.status = BattleStatus.FIGHTING
            self:emitBattleEvent(BattleEventType.BATTLE_STARTED, {battleId = self.currentBattle.id, levelId = levelConfig.level_id, levelName = levelConfig.level_name})
            self:startBattleMonitoring()
            print("[BattleManager] Battle started successfully: " .. levelConfig.level_name)
            return ____awaiter_resolve(nil, true)
        end)
        __TS__Await(____try.catch(
            ____try,
            function(____, ____error)
                print("[BattleManager] Failed to start battle: " .. tostring(____error))
                return ____awaiter_resolve(nil, false)
            end
        ))
    end)
end
function BattleManager.prototype.createBattle(self, levelConfig)
    local battle = {
        id = self:generateBattleId(),
        levelConfig = levelConfig,
        teams = __TS__New(Map),
        startTime = getTimestampMs(nil),
        status = BattleStatus.PREPARING,
        entities = __TS__New(Set),
        timeRemaining = levelConfig.time_limit
    }
    return battle
end
function BattleManager.prototype.spawnTeams(self)
    return __TS__AsyncAwaiter(function(____awaiter_resolve)
        if not self.currentBattle then
            return ____awaiter_resolve(nil)
        end
        local ____self_currentBattle_0 = self.currentBattle
        local levelConfig = ____self_currentBattle_0.levelConfig
        local team1Config = self.configLoader:getTeamConfig(levelConfig.team1_config)
        if team1Config then
            local team1 = self:spawnTeam(team1Config, DOTA_TEAM_GOODGUYS, "team1")
            self.currentBattle.teams:set(DOTA_TEAM_GOODGUYS, team1)
        end
        local team2Config = self.configLoader:getTeamConfig(levelConfig.team2_config)
        if team2Config then
            local team2 = self:spawnTeam(team2Config, DOTA_TEAM_BADGUYS, "team2")
            self.currentBattle.teams:set(DOTA_TEAM_BADGUYS, team2)
        end
        print("[BattleManager] Teams spawned successfully")
    end)
end
function BattleManager.prototype.spawnTeam(self, teamConfig, team, groupId)
    local battleTeam = {
        configId = teamConfig.team_config_id,
        team = team,
        name = teamConfig.team_name,
        units = {},
        isAlive = true,
        formation = teamConfig.formation,
        spawnedCount = 0,
        totalCount = __TS__ArrayReduce(
            teamConfig.unit_configs,
            function(____, sum, config) return sum + config.count end,
            0
        )
    }
    local spawnPositions = self:calculateSpawnPositions(teamConfig.spawn_area, teamConfig.formation, battleTeam.totalCount)
    local positionIndex = 0
    for ____, unitConfig in ipairs(teamConfig.unit_configs) do
        do
            local i = 0
            while i < unitConfig.count do
                local spawnPos = spawnPositions[positionIndex + 1] or teamConfig.spawn_area
                if unitConfig.spawn_delay and unitConfig.spawn_delay > 0 then
                    Timers:CreateTimer(
                        unitConfig.spawn_delay,
                        function()
                            self:spawnUnit(
                                unitConfig,
                                spawnPos,
                                team,
                                battleTeam,
                                groupId
                            )
                        end
                    )
                else
                    self:spawnUnit(
                        unitConfig,
                        spawnPos,
                        team,
                        battleTeam,
                        groupId
                    )
                end
                positionIndex = positionIndex + 1
                i = i + 1
            end
        end
    end
    return battleTeam
end
function BattleManager.prototype.spawnUnit(self, unitConfig, position, team, battleTeam, groupId)
    local creationOptions = {position = position, team = team, customStats = unitConfig.custom_stats, level = unitConfig.level}
    local result = unitFactory:createUnit(unitConfig.unit_id, creationOptions)
    if result.success and result.unit then
        local ____battleTeam_units_1 = battleTeam.units
        ____battleTeam_units_1[#____battleTeam_units_1 + 1] = result.unit
        battleTeam.spawnedCount = battleTeam.spawnedCount + 1
        if self.currentBattle then
            self.currentBattle.entities:add(result.unit)
        end
        self.entityManager:registerEntity(
            result.unit,
            {
                onDeath = function() return self:onUnitDeath(result.unit, battleTeam) end,
                onSpawn = function() return self:onUnitSpawn(result.unit, battleTeam) end
            },
            groupId
        )
        self:emitBattleEvent(
            BattleEventType.UNIT_SPAWNED,
            {
                unitId = result.unit:GetEntityIndex(),
                unitName = unitConfig.unit_id,
                team = team,
                groupId = groupId
            }
        )
    end
end
function BattleManager.prototype.calculateSpawnPositions(self, basePosition, formation, unitCount)
    local positions = {}
    repeat
        local ____switch33 = formation
        local radius, gridSize
        local ____cond33 = ____switch33 == FormationType.LINE
        if ____cond33 then
            do
                local i = 0
                while i < unitCount do
                    positions[#positions + 1] = Vector(basePosition.x + i * 150, basePosition.y, basePosition.z)
                    i = i + 1
                end
            end
            break
        end
        ____cond33 = ____cond33 or ____switch33 == FormationType.CIRCLE
        if ____cond33 then
            radius = math.max(200, unitCount * 40)
            do
                local i = 0
                while i < unitCount do
                    local angle = i / unitCount * 2 * math.pi
                    local x = math.cos(angle) * radius
                    local y = math.sin(angle) * radius
                    positions[#positions + 1] = Vector(basePosition.x + x, basePosition.y + y, basePosition.z)
                    i = i + 1
                end
            end
            break
        end
        ____cond33 = ____cond33 or ____switch33 == FormationType.WEDGE
        if ____cond33 then
            do
                local i = 0
                while i < unitCount do
                    local row = math.floor(i / 2)
                    local side = i % 2 == 0 and -1 or 1
                    positions[#positions + 1] = Vector(basePosition.x + side * row * 100, basePosition.y + row * 150, basePosition.z)
                    i = i + 1
                end
            end
            break
        end
        ____cond33 = ____cond33 or ____switch33 == FormationType.GRID
        if ____cond33 then
            gridSize = math.ceil(math.sqrt(unitCount))
            do
                local i = 0
                while i < unitCount do
                    local row = math.floor(i / gridSize)
                    local col = i % gridSize
                    positions[#positions + 1] = Vector(basePosition.x + col * 120, basePosition.y + row * 120, basePosition.z)
                    i = i + 1
                end
            end
            break
        end
        do
            do
                local i = 0
                while i < unitCount do
                    local randomOffset = RandomVector(200)
                    positions[#positions + 1] = Vector(basePosition.x + randomOffset.x, basePosition.y + randomOffset.y, basePosition.z)
                    i = i + 1
                end
            end
        end
    until true
    return positions
end
function BattleManager.prototype.setupBattleAI(self)
    if not self.currentBattle then
        return
    end
    self.entityManager:setGroupAI("team1", "team2", {aggressionLevel = 70, attackRange = 800, updateInterval = 1})
    self.entityManager:setGroupAI("team2", "team1", {aggressionLevel = 70, attackRange = 800, updateInterval = 1})
    print("[BattleManager] Battle AI configured")
end
function BattleManager.prototype.startBattleMonitoring(self)
    if not self.currentBattle then
        return
    end
    local battle = self.currentBattle
    local monitoringTimer = Timers:CreateTimer(
        1,
        function()
            if not self.currentBattle or self.currentBattle.status ~= BattleStatus.FIGHTING then
                return nil
            end
            if self.currentBattle.timeRemaining ~= nil then
                local ____self_currentBattle_2, ____timeRemaining_3 = self.currentBattle, "timeRemaining"
                ____self_currentBattle_2[____timeRemaining_3] = ____self_currentBattle_2[____timeRemaining_3] - 1
                if self.currentBattle.timeRemaining == 30 then
                    self:emitBattleEvent(BattleEventType.TIME_WARNING, {timeRemaining = 30})
                end
                if self.currentBattle.timeRemaining <= 0 then
                    self:checkTimeLimit()
                    return nil
                end
            end
            self:checkBattleEnd()
            return 1
        end
    )
    battle.__monitoringTimer = monitoringTimer
end
function BattleManager.prototype.onUnitSpawn(self, unit, team)
    print((("[BattleManager] Unit spawned: " .. unit:GetUnitName()) .. " for team ") .. team.name)
end
function BattleManager.prototype.onUnitDeath(self, unit, team)
    team.units = __TS__ArrayFilter(
        team.units,
        function(____, u) return u ~= unit end
    )
    local aliveUnits = __TS__ArrayFilter(
        team.units,
        function(____, u) return u and not u:IsNull() and u:IsAlive() end
    )
    if #aliveUnits == 0 then
        team.isAlive = false
        self:emitBattleEvent(BattleEventType.TEAM_ELIMINATED, {team = team.team, teamName = team.name})
    end
    self:emitBattleEvent(
        BattleEventType.UNIT_DIED,
        {
            unitId = unit:GetEntityIndex(),
            unitName = unit:GetUnitName(),
            team = team.team,
            remainingUnits = #aliveUnits
        }
    )
    self:checkBattleEnd()
end
function BattleManager.prototype.checkBattleEnd(self)
    if not self.currentBattle or self.currentBattle.status ~= BattleStatus.FIGHTING then
        return
    end
    local ____self_currentBattle_4 = self.currentBattle
    local levelConfig = ____self_currentBattle_4.levelConfig
    repeat
        local ____switch60 = levelConfig.win_condition
        local ____cond60 = ____switch60 == WinConditionType.ELIMINATE_ALL
        if ____cond60 then
            self:checkEliminateAllCondition()
            break
        end
        ____cond60 = ____cond60 or ____switch60 == WinConditionType.SURVIVE_TIME
        if ____cond60 then
            self:checkSurviveTimeCondition()
            break
        end
        do
            self:checkEliminateAllCondition()
        end
    until true
end
function BattleManager.prototype.checkEliminateAllCondition(self)
    if not self.currentBattle then
        return
    end
    local team1 = self.currentBattle.teams:get(DOTA_TEAM_GOODGUYS)
    local team2 = self.currentBattle.teams:get(DOTA_TEAM_BADGUYS)
    if not (team1 and team1.isAlive) and (team2 and team2.isAlive) then
        self:endBattle(DOTA_TEAM_BADGUYS)
    elseif team1 and team1.isAlive and not (team2 and team2.isAlive) then
        self:endBattle(DOTA_TEAM_GOODGUYS)
    elseif not (team1 and team1.isAlive) and not (team2 and team2.isAlive) then
        self:endBattle(nil)
    end
end
function BattleManager.prototype.checkSurviveTimeCondition(self)
    if not self.currentBattle then
        return
    end
    if self.currentBattle.timeRemaining ~= nil and self.currentBattle.timeRemaining <= 0 then
        local team1 = self.currentBattle.teams:get(DOTA_TEAM_GOODGUYS)
        local team2 = self.currentBattle.teams:get(DOTA_TEAM_BADGUYS)
        if team1 and team1.isAlive and not (team2 and team2.isAlive) then
            self:endBattle(DOTA_TEAM_GOODGUYS)
        elseif not (team1 and team1.isAlive) and (team2 and team2.isAlive) then
            self:endBattle(DOTA_TEAM_BADGUYS)
        elseif team1 and team1.isAlive and (team2 and team2.isAlive) then
            local team1Count = #__TS__ArrayFilter(
                team1.units,
                function(____, u) return u and not u:IsNull() and u:IsAlive() end
            )
            local team2Count = #__TS__ArrayFilter(
                team2.units,
                function(____, u) return u and not u:IsNull() and u:IsAlive() end
            )
            if team1Count > team2Count then
                self:endBattle(DOTA_TEAM_GOODGUYS)
            elseif team2Count > team1Count then
                self:endBattle(DOTA_TEAM_BADGUYS)
            else
                self:endBattle(nil)
            end
        else
            self:endBattle(nil)
        end
    end
end
function BattleManager.prototype.checkTimeLimit(self)
    if not self.currentBattle then
        return
    end
    if self.currentBattle.levelConfig.win_condition == WinConditionType.SURVIVE_TIME then
        self:checkSurviveTimeCondition()
    else
        self:endBattle(nil)
    end
end
function BattleManager.prototype.endBattle(self, winner)
    if not self.currentBattle then
        return
    end
    local ____print_30 = print
    local ____winner_29
    if winner then
        ____winner_29 = "Team " .. tostring(winner)
    else
        ____winner_29 = "Draw"
    end
    ____print_30("[BattleManager] Ending battle. Winner: " .. ____winner_29)
    self.currentBattle.status = BattleStatus.FINISHED
    self.currentBattle.winner = winner
    self.currentBattle.endTime = getTimestampMs(nil)
    local monitoringTimer = self.currentBattle.__monitoringTimer
    if monitoringTimer then
        Timers:RemoveTimer(monitoringTimer)
    end
    local result = self:createBattleResult()
    self:saveBattleResult(result)
    self:emitBattleEvent(BattleEventType.BATTLE_ENDED, result)
    CustomGameEventManager:Send_ServerToAllClients("battle_ended", {result = result, showLevelSelection = true})
    print("[BattleManager] Battle ended successfully")
end
function BattleManager.prototype.createBattleResult(self)
    if not self.currentBattle then
        error(
            __TS__New(Error, "No current battle"),
            0
        )
    end
    return {
        battleId = self.currentBattle.id,
        levelId = self.currentBattle.levelConfig.level_id,
        levelName = self.currentBattle.levelConfig.level_name,
        winner = self.currentBattle.winner,
        duration = (self.currentBattle.endTime or getTimestampMs(nil)) - self.currentBattle.startTime,
        timestamp = getTimestampMs(nil),
        teams = __TS__ArrayMap(
            __TS__ArrayFrom(self.currentBattle.teams:values()),
            function(____, team)
                local ____team_configId_34 = team.configId
                local ____team_team_35 = team.team
                local ____team_name_36 = team.name
                local ____temp_37 = #__TS__ArrayFilter(
                    team.units,
                    function(____, u) return u and not u:IsNull() and u:IsAlive() end
                )
                local ____team_totalCount_38 = team.totalCount
                local ____team_team_33 = team.team
                local ____opt_31 = self.currentBattle
                return {
                    configId = ____team_configId_34,
                    team = ____team_team_35,
                    name = ____team_name_36,
                    unitsAlive = ____temp_37,
                    totalUnits = ____team_totalCount_38,
                    isWinner = ____team_team_33 == (____opt_31 and ____opt_31.winner)
                }
            end
        ),
        rewards = self.currentBattle.levelConfig.rewards
    }
end
function BattleManager.prototype.saveBattleResult(self, result)
    local ____self_battleHistory_39 = self.battleHistory
    ____self_battleHistory_39[#____self_battleHistory_39 + 1] = result
    if #self.battleHistory > 50 then
        self.battleHistory = __TS__ArraySlice(self.battleHistory, -50)
    end
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "battle_system",
            "current_battle",
            {
                battleId = result.battleId,
                status = "ended",
                levelId = result.levelId or "",
                levelName = "",
                timestamp = getTimestampMs(nil)
            }
        )
        GameRules.XNetTable:SetTableValue("battle_system", "latest_result", result)
        GameRules.XNetTable:SetTableValue(
            "battle_system",
            "battle_history",
            {
                battles = __TS__ArraySlice(self.battleHistory, -10),
                totalBattles = #self.battleHistory
            }
        )
    end
end
function BattleManager.prototype.cleanupCurrentBattle(self)
    return __TS__AsyncAwaiter(function(____awaiter_resolve)
        if not self.currentBattle then
            return ____awaiter_resolve(nil)
        end
        print("[BattleManager] Cleaning up current battle")
        local monitoringTimer = self.currentBattle.__monitoringTimer
        if monitoringTimer then
            Timers:RemoveTimer(monitoringTimer)
        end
        self.entityManager:cleanupGroup("team1", true)
        self.entityManager:cleanupGroup("team2", true)
        self.currentBattle = nil
        print("[BattleManager] Battle cleanup completed")
    end)
end
function BattleManager.prototype.emitBattleEvent(self, eventType, data)
    local ____eventType_42 = eventType
    local ____opt_40 = self.currentBattle
    local event = {
        type = ____eventType_42,
        battleId = ____opt_40 and ____opt_40.id or "",
        timestamp = Date:now(),
        data = data
    }
    local listeners = self.eventListeners:get(eventType)
    if listeners then
        for ____, listener in ipairs(listeners) do
            do
                local function ____catch(____error)
                    print("[BattleManager] Error in event listener: " .. tostring(____error))
                end
                local ____try, ____hasReturned = pcall(function()
                    listener(nil, event)
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end
    end
    CustomGameEventManager:Send_ServerToAllClients("battle_event", event)
end
function BattleManager.prototype.addEventListener(self, eventType, listener)
    if not self.eventListeners:has(eventType) then
        self.eventListeners:set(eventType, {})
    end
    local ____temp_43 = self.eventListeners:get(eventType)
    ____temp_43[#____temp_43 + 1] = listener
end
function BattleManager.prototype.removeEventListener(self, eventType, listener)
    local listeners = self.eventListeners:get(eventType)
    if listeners then
        local index = __TS__ArrayIndexOf(listeners, listener)
        if index > -1 then
            __TS__ArraySplice(listeners, index, 1)
        end
    end
end
function BattleManager.prototype.generateBattleId(self)
    return (("battle_" .. tostring(Date:now())) .. "_") .. __TS__StringSubstr(
        __TS__NumberToString(
            math.random(),
            36
        ),
        2,
        9
    )
end
function BattleManager.prototype.getCurrentBattle(self)
    return self.currentBattle
end
function BattleManager.prototype.getBattleHistory(self)
    return {unpack(self.battleHistory)}
end
function BattleManager.prototype.getBattleStats(self)
    local stats = {totalBattles = #self.battleHistory, winsByTeam = {[DOTA_TEAM_GOODGUYS] = 0, [DOTA_TEAM_BADGUYS] = 0, draws = 0}, averageDuration = 0, levelStats = {}}
    local totalDuration = 0
    for ____, battle in ipairs(self.battleHistory) do
        if battle.winner == DOTA_TEAM_GOODGUYS then
            local ____stats_winsByTeam_44, ____DOTA_TEAM_GOODGUYS_45 = stats.winsByTeam, DOTA_TEAM_GOODGUYS
            ____stats_winsByTeam_44[____DOTA_TEAM_GOODGUYS_45] = ____stats_winsByTeam_44[____DOTA_TEAM_GOODGUYS_45] + 1
        elseif battle.winner == DOTA_TEAM_BADGUYS then
            local ____stats_winsByTeam_46, ____DOTA_TEAM_BADGUYS_47 = stats.winsByTeam, DOTA_TEAM_BADGUYS
            ____stats_winsByTeam_46[____DOTA_TEAM_BADGUYS_47] = ____stats_winsByTeam_46[____DOTA_TEAM_BADGUYS_47] + 1
        else
            local ____stats_winsByTeam_48, ____draws_49 = stats.winsByTeam, "draws"
            ____stats_winsByTeam_48[____draws_49] = ____stats_winsByTeam_48[____draws_49] + 1
        end
        totalDuration = totalDuration + battle.duration
        stats.levelStats[battle.levelId] = (stats.levelStats[battle.levelId] or 0) + 1
    end
    if #self.battleHistory > 0 then
        stats.averageDuration = totalDuration / #self.battleHistory
    end
    return stats
end
function BattleManager.prototype.forceStopBattle(self)
    if self.currentBattle then
        self.currentBattle.status = BattleStatus.CANCELLED
        self:cleanupCurrentBattle()
        print("[BattleManager] Battle force stopped")
    end
end
function BattleManager.prototype.pauseBattle(self, pause)
    if not self.currentBattle then
        return
    end
    if pause and self.currentBattle.status == BattleStatus.FIGHTING then
        self.currentBattle.status = BattleStatus.PAUSED
        print("[BattleManager] Battle paused")
    elseif not pause and self.currentBattle.status == BattleStatus.PAUSED then
        self.currentBattle.status = BattleStatus.FIGHTING
        print("[BattleManager] Battle resumed")
    end
end
return ____exports
