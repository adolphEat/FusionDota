local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local Map = ____lualib.Map
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 6,["12"] = 6,["13"] = 8,["14"] = 9,["15"] = 9,["16"] = 10,["17"] = 10,["18"] = 11,["19"] = 11,["20"] = 12,["21"] = 12,["22"] = 13,["23"] = 13,["24"] = 16,["25"] = 17,["26"] = 18,["27"] = 19,["28"] = 62,["29"] = 62,["30"] = 62,["32"] = 67,["33"] = 70,["34"] = 71,["35"] = 72,["36"] = 73,["37"] = 69,["38"] = 76,["39"] = 77,["40"] = 78,["42"] = 80,["43"] = 76,["44"] = 86,["45"] = 87,["46"] = 88,["49"] = 92,["50"] = 93,["51"] = 94,["54"] = 98,["55"] = 99,["56"] = 100,["57"] = 102,["58"] = 105,["59"] = 86,["60"] = 111,["61"] = 112,["64"] = 116,["65"] = 117,["66"] = 118,["67"] = 120,["68"] = 123,["69"] = 111,["70"] = 129,["71"] = 130,["72"] = 131,["75"] = 135,["76"] = 136,["77"] = 137,["78"] = 140,["79"] = 143,["80"] = 145,["81"] = 148,["82"] = 129,["83"] = 157,["84"] = 158,["85"] = 159,["86"] = 162,["87"] = 165,["88"] = 168,["89"] = 170,["90"] = 173,["91"] = 157,["92"] = 183,["93"] = 184,["94"] = 185,["95"] = 188,["96"] = 191,["97"] = 194,["98"] = 196,["99"] = 199,["100"] = 183,["101"] = 209,["102"] = 210,["103"] = 211,["105"] = 214,["106"] = 214,["107"] = 214,["108"] = 215,["109"] = 215,["110"] = 218,["111"] = 224,["112"] = 225,["113"] = 226,["115"] = 229,["116"] = 214,["117"] = 214,["118"] = 209,["119"] = 236,["121"] = 237,["122"] = 238,["124"] = 239,["127"] = 241,["129"] = 242,["133"] = 236,["134"] = 250,["135"] = 252,["136"] = 255,["137"] = 258,["138"] = 259,["141"] = 264,["142"] = 264,["143"] = 265,["144"] = 250,["145"] = 271,["146"] = 272,["147"] = 272,["148"] = 272,["149"] = 272,["150"] = 272,["151"] = 272,["152"] = 272,["153"] = 272,["154"] = 271,["155"] = 285,["156"] = 286,["157"] = 295,["158"] = 295,["159"] = 295,["160"] = 296,["162"] = 297,["163"] = 298,["165"] = 299,["168"] = 301,["170"] = 302,["173"] = 304,["175"] = 305,["178"] = 307,["180"] = 308,["183"] = 310,["185"] = 311,["189"] = 314,["191"] = 317,["192"] = 285,["193"] = 323,["194"] = 324,["195"] = 327,["196"] = 327,["197"] = 327,["198"] = 327,["199"] = 327,["200"] = 327,["201"] = 327,["202"] = 327,["203"] = 327,["204"] = 327,["205"] = 327,["206"] = 327,["207"] = 327,["208"] = 327,["209"] = 342,["210"] = 342,["211"] = 342,["212"] = 342,["213"] = 342,["214"] = 342,["215"] = 342,["216"] = 342,["217"] = 342,["218"] = 342,["219"] = 342,["220"] = 342,["221"] = 342,["222"] = 342,["223"] = 359,["224"] = 323,["225"] = 365,["226"] = 366,["228"] = 367,["229"] = 367,["230"] = 368,["231"] = 369,["232"] = 369,["233"] = 369,["234"] = 369,["235"] = 369,["236"] = 369,["237"] = 369,["238"] = 369,["239"] = 369,["240"] = 369,["241"] = 369,["242"] = 369,["243"] = 369,["244"] = 369,["245"] = 384,["247"] = 367,["250"] = 365,["251"] = 392,["252"] = 393,["253"] = 393,["254"] = 393,["256"] = 394,["257"] = 394,["259"] = 397,["260"] = 400,["261"] = 400,["262"] = 400,["263"] = 400,["264"] = 401,["265"] = 404,["266"] = 405,["268"] = 407,["269"] = 408,["271"] = 411,["272"] = 413,["276"] = 392,["277"] = 420,["278"] = 421,["279"] = 421,["280"] = 421,["282"] = 422,["283"] = 422,["285"] = 424,["286"] = 427,["287"] = 428,["288"] = 428,["289"] = 428,["290"] = 428,["291"] = 428,["292"] = 428,["293"] = 428,["294"] = 428,["295"] = 428,["300"] = 420,["301"] = 440,["302"] = 441,["303"] = 442,["304"] = 445,["306"] = 447,["307"] = 447,["308"] = 448,["309"] = 449,["310"] = 450,["311"] = 451,["313"] = 447,["316"] = 455,["317"] = 440,["318"] = 461,["319"] = 462,["321"] = 465,["322"] = 466,["324"] = 467,["327"] = 469,["329"] = 470,["330"] = 471,["333"] = 473,["335"] = 474,["336"] = 475,["337"] = 476,["341"] = 480,["342"] = 481,["343"] = 482,["344"] = 483,["345"] = 484,["348"] = 487,["349"] = 461,["350"] = 493,["351"] = 494,["352"] = 495,["353"] = 496,["355"] = 499,["356"] = 500,["357"] = 502,["358"] = 502,["359"] = 502,["360"] = 503,["361"] = 504,["362"] = 505,["365"] = 509,["366"] = 493,["367"] = 515,["368"] = 516,["369"] = 518,["370"] = 519,["371"] = 521,["372"] = 522,["373"] = 523,["377"] = 528,["378"] = 529,["380"] = 532,["381"] = 533,["382"] = 515,["383"] = 539,["384"] = 540,["385"] = 542,["386"] = 542,["387"] = 542,["388"] = 543,["389"] = 544,["393"] = 549,["394"] = 549,["395"] = 550,["396"] = 551,["397"] = 552,["398"] = 555,["400"] = 549,["403"] = 539,["404"] = 567,["405"] = 569,["406"] = 567,["407"] = 575,["408"] = 577,["409"] = 575,["410"] = 583,["411"] = 585,["412"] = 583,["413"] = 591,["414"] = 592,["415"] = 592,["416"] = 592,["417"] = 592,["418"] = 595,["419"] = 591,["420"] = 601,["421"] = 602,["422"] = 605,["423"] = 605,["424"] = 605,["425"] = 606,["426"] = 607,["430"] = 612,["431"] = 615,["432"] = 601,["433"] = 624,["434"] = 624,["435"] = 632,["436"] = 633,["437"] = 634,["438"] = 635,["440"] = 632,["441"] = 645,["442"] = 645,["443"] = 652,["444"] = 652,["445"] = 659,["446"] = 661,["447"] = 661,["448"] = 661,["449"] = 662,["450"] = 663,["451"] = 664,["453"] = 666,["454"] = 661,["455"] = 661,["456"] = 659,["457"] = 673,["458"] = 674,["459"] = 675,["460"] = 675,["461"] = 675,["462"] = 675,["463"] = 675,["464"] = 675,["465"] = 675,["466"] = 675,["467"] = 675,["469"] = 673,["470"] = 691,["471"] = 692,["472"] = 691,["473"] = 702,["474"] = 703,["475"] = 704,["476"] = 706,["477"] = 707,["479"] = 711,["480"] = 712,["482"] = 716,["483"] = 717,["484"] = 718,["486"] = 722,["487"] = 723,["489"] = 727,["490"] = 728,["491"] = 728,["492"] = 729,["493"] = 731,["494"] = 734,["495"] = 736,["496"] = 702,["497"] = 742,["498"] = 743,["499"] = 744,["502"] = 748,["503"] = 748,["504"] = 748,["505"] = 748,["506"] = 748,["507"] = 748,["508"] = 748,["509"] = 748,["510"] = 748,["511"] = 748,["512"] = 748,["513"] = 748,["514"] = 748,["515"] = 748,["516"] = 748,["517"] = 748,["518"] = 748,["519"] = 748,["520"] = 742});
local ____exports = {}
local ____GameModeManager = require("modules.GameModeManager")
local GameModeManager = ____GameModeManager.GameModeManager
____exports.ChessRarity = ChessRarity or ({})
____exports.ChessRarity.COMMON = 1
____exports.ChessRarity[____exports.ChessRarity.COMMON] = "COMMON"
____exports.ChessRarity.UNCOMMON = 2
____exports.ChessRarity[____exports.ChessRarity.UNCOMMON] = "UNCOMMON"
____exports.ChessRarity.RARE = 3
____exports.ChessRarity[____exports.ChessRarity.RARE] = "RARE"
____exports.ChessRarity.EPIC = 4
____exports.ChessRarity[____exports.ChessRarity.EPIC] = "EPIC"
____exports.ChessRarity.LEGENDARY = 5
____exports.ChessRarity[____exports.ChessRarity.LEGENDARY] = "LEGENDARY"
____exports.RoundPhase = RoundPhase or ({})
____exports.RoundPhase.PREPARATION = "preparation"
____exports.RoundPhase.BATTLE = "battle"
____exports.RoundPhase.INTERMISSION = "intermission"
____exports.AutoChessMode = __TS__Class()
local AutoChessMode = ____exports.AutoChessMode
AutoChessMode.name = "AutoChessMode"
function AutoChessMode.prototype.____constructor(self)
    self.isActive = false
    self.gameState = self:initializeGameState()
    self.chessPieceDatabase = self:initializeChessDatabase()
    self:initializeAutoChessMode()
    print("[AutoChessMode] Initialized")
end
function AutoChessMode.getInstance(self)
    if not ____exports.AutoChessMode.instance then
        ____exports.AutoChessMode.instance = __TS__New(____exports.AutoChessMode)
    end
    return ____exports.AutoChessMode.instance
end
function AutoChessMode.prototype.activate(self)
    if self.isActive then
        print("[AutoChessMode] Already active")
        return
    end
    local gameModeManager = GameModeManager:getInstance()
    if not gameModeManager:isAutoChessMode() then
        print("[AutoChessMode] Game is not in autochess mode")
        return
    end
    self.isActive = true
    self:setupGame()
    self:registerEvents()
    print("[AutoChessMode] Activated")
    self:syncStateToNetTable()
end
function AutoChessMode.prototype.deactivate(self)
    if not self.isActive then
        return
    end
    self.isActive = false
    self:cleanupGame()
    self:unregisterEvents()
    print("[AutoChessMode] Deactivated")
    self:syncStateToNetTable()
end
function AutoChessMode.prototype.startGame(self)
    if not self.isActive then
        print("[AutoChessMode] Mode not active")
        return
    end
    self.gameState.isGameActive = true
    self.gameState.currentRound = 1
    self.gameState.currentPhase = ____exports.RoundPhase.PREPARATION
    self:initializePlayerStates()
    self:startPreparationPhase()
    print("[AutoChessMode] Game started")
    CustomGameEventManager:Send_ServerToAllClients("autochess_game_started", {round = self.gameState.currentRound, phase = self.gameState.currentPhase})
end
function AutoChessMode.prototype.startPreparationPhase(self)
    self.gameState.currentPhase = ____exports.RoundPhase.PREPARATION
    self.gameState.phaseTimeLeft = 30
    self:distributeRoundIncome()
    self:refreshAllPlayersShop()
    self:startPhaseTimer()
    print("[AutoChessMode] Started preparation phase for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_phase_started", {phase = ____exports.RoundPhase.PREPARATION, timeLeft = self.gameState.phaseTimeLeft, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.startBattlePhase(self)
    self.gameState.currentPhase = ____exports.RoundPhase.BATTLE
    self.gameState.phaseTimeLeft = 45
    self:setupBattleMatching()
    self:startAllBattles()
    self:startPhaseTimer()
    print("[AutoChessMode] Started battle phase for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_phase_started", {phase = ____exports.RoundPhase.BATTLE, timeLeft = self.gameState.phaseTimeLeft, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.startPhaseTimer(self)
    if self.phaseTimer then
        Timers:RemoveTimer(self.phaseTimer)
    end
    self.phaseTimer = Timers:CreateTimer(
        1,
        function()
            local ____self_gameState_0, ____phaseTimeLeft_1 = self.gameState, "phaseTimeLeft"
            ____self_gameState_0[____phaseTimeLeft_1] = ____self_gameState_0[____phaseTimeLeft_1] - 1
            CustomGameEventManager:Send_ServerToAllClients("autochess_time_update", {timeLeft = self.gameState.phaseTimeLeft, phase = self.gameState.currentPhase})
            if self.gameState.phaseTimeLeft <= 0 then
                self:onPhaseTimeEnd()
                return nil
            end
            return 1
        end
    )
end
function AutoChessMode.prototype.onPhaseTimeEnd(self)
    repeat
        local ____switch19 = self.gameState.currentPhase
        local ____cond19 = ____switch19 == ____exports.RoundPhase.PREPARATION
        if ____cond19 then
            self:startBattlePhase()
            break
        end
        ____cond19 = ____cond19 or ____switch19 == ____exports.RoundPhase.BATTLE
        if ____cond19 then
            self:endBattlePhase()
            break
        end
    until true
end
function AutoChessMode.prototype.endBattlePhase(self)
    self:stopAllBattles()
    self:calculateBattleResults()
    if self:checkGameEnd() then
        self:endGame()
        return
    end
    local ____self_gameState_2, ____currentRound_3 = self.gameState, "currentRound"
    ____self_gameState_2[____currentRound_3] = ____self_gameState_2[____currentRound_3] + 1
    self:startPreparationPhase()
end
function AutoChessMode.prototype.initializeGameState(self)
    return {
        currentRound = 0,
        currentPhase = ____exports.RoundPhase.PREPARATION,
        phaseTimeLeft = 0,
        playerStates = __TS__New(Map),
        chessPool = self:initializeChessPool(),
        isGameActive = false
    }
end
function AutoChessMode.prototype.initializeChessPool(self)
    local pool = __TS__New(Map)
    for ____, ____value in __TS__Iterator(self.chessPieceDatabase) do
        local pieceId = ____value[1]
        local piece = ____value[2]
        local count = 0
        repeat
            local ____switch25 = piece.rarity
            local ____cond25 = ____switch25 == ____exports.ChessRarity.COMMON
            if ____cond25 then
                count = 45
                break
            end
            ____cond25 = ____cond25 or ____switch25 == ____exports.ChessRarity.UNCOMMON
            if ____cond25 then
                count = 30
                break
            end
            ____cond25 = ____cond25 or ____switch25 == ____exports.ChessRarity.RARE
            if ____cond25 then
                count = 25
                break
            end
            ____cond25 = ____cond25 or ____switch25 == ____exports.ChessRarity.EPIC
            if ____cond25 then
                count = 15
                break
            end
            ____cond25 = ____cond25 or ____switch25 == ____exports.ChessRarity.LEGENDARY
            if ____cond25 then
                count = 10
                break
            end
        until true
        pool:set(pieceId, count)
    end
    return pool
end
function AutoChessMode.prototype.initializeChessDatabase(self)
    local database = __TS__New(Map)
    database:set("anti_mage", {
        id = "anti_mage",
        unitName = "npc_dota_hero_antimage",
        displayName = "敌法师",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"恶魔猎手"},
        class = {"刺客"},
        health = 550,
        damage = 50,
        armor = 2,
        attackRange = 150,
        abilities = {"antimage_mana_break"}
    })
    database:set("crystal_maiden", {
        id = "crystal_maiden",
        unitName = "npc_dota_hero_crystal_maiden",
        displayName = "水晶室女",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"人类"},
        class = {"法师"},
        health = 450,
        damage = 35,
        armor = 0,
        attackRange = 600,
        abilities = {"crystal_maiden_crystal_nova"}
    })
    return database
end
function AutoChessMode.prototype.initializePlayerStates(self)
    local playerCount = PlayerResource:GetPlayerCount()
    do
        local playerId = 0
        while playerId < playerCount do
            if PlayerResource:IsValidPlayer(playerId) then
                local playerState = {
                    playerId = playerId,
                    health = 100,
                    maxHealth = 100,
                    gold = 1,
                    level = 1,
                    experience = 0,
                    winStreak = 0,
                    lossStreak = 0,
                    boardPieces = {},
                    benchPieces = {},
                    isAlive = true,
                    rank = 0
                }
                self.gameState.playerStates:set(playerId, playerState)
            end
            playerId = playerId + 1
        end
    end
end
function AutoChessMode.prototype.distributeRoundIncome(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        do
            if not playerState.isAlive then
                goto __continue33
            end
            local income = 5
            local interestIncome = math.min(
                math.floor(playerState.gold / 10),
                5
            )
            income = income + interestIncome
            if playerState.winStreak >= 2 then
                income = income + math.min(playerState.winStreak, 3)
            end
            if playerState.lossStreak >= 2 then
                income = income + math.min(playerState.lossStreak, 3)
            end
            playerState.gold = playerState.gold + income
            print(((((("[AutoChessMode] Player " .. tostring(playerId)) .. " received ") .. tostring(income)) .. " gold (total: ") .. tostring(playerState.gold)) .. ")")
        end
        ::__continue33::
    end
end
function AutoChessMode.prototype.refreshAllPlayersShop(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        do
            if not playerState.isAlive then
                goto __continue39
            end
            local shopPieces = self:generateShopPieces(playerState.level)
            if GameRules.XNetTable then
                GameRules.XNetTable:SetTableValue(
                    "autochess_shop",
                    "player_" .. tostring(playerId),
                    {
                        pieces = shopPieces,
                        refreshCount = 0,
                        timestamp = Date:now()
                    }
                )
            end
        end
        ::__continue39::
    end
end
function AutoChessMode.prototype.generateShopPieces(self, playerLevel)
    local shopPieces = {}
    local pieceCount = 5
    local rarityChances = self:calculateRarityChances(playerLevel)
    do
        local i = 0
        while i < pieceCount do
            local rarity = self:selectRandomRarity(rarityChances)
            local piece = self:selectRandomPieceByRarity(rarity)
            if piece then
                shopPieces[#shopPieces + 1] = piece
            end
            i = i + 1
        end
    end
    return shopPieces
end
function AutoChessMode.prototype.calculateRarityChances(self, playerLevel)
    local chances = __TS__New(Map)
    repeat
        local ____switch48 = playerLevel
        local ____cond48 = ____switch48 == 1
        if ____cond48 then
            chances:set(____exports.ChessRarity.COMMON, 100)
            break
        end
        ____cond48 = ____cond48 or ____switch48 == 2
        if ____cond48 then
            chances:set(____exports.ChessRarity.COMMON, 70)
            chances:set(____exports.ChessRarity.UNCOMMON, 30)
            break
        end
        ____cond48 = ____cond48 or ____switch48 == 3
        if ____cond48 then
            chances:set(____exports.ChessRarity.COMMON, 60)
            chances:set(____exports.ChessRarity.UNCOMMON, 35)
            chances:set(____exports.ChessRarity.RARE, 5)
            break
        end
        do
            chances:set(____exports.ChessRarity.COMMON, 50)
            chances:set(____exports.ChessRarity.UNCOMMON, 35)
            chances:set(____exports.ChessRarity.RARE, 10)
            chances:set(____exports.ChessRarity.EPIC, 4)
            chances:set(____exports.ChessRarity.LEGENDARY, 1)
        end
    until true
    return chances
end
function AutoChessMode.prototype.selectRandomRarity(self, chances)
    local totalChance = 0
    for ____, chance in __TS__Iterator(chances:values()) do
        totalChance = totalChance + chance
    end
    local random = RandomFloat(0, totalChance)
    local currentChance = 0
    for ____, ____value in __TS__Iterator(chances) do
        local rarity = ____value[1]
        local chance = ____value[2]
        currentChance = currentChance + chance
        if random <= currentChance then
            return rarity
        end
    end
    return ____exports.ChessRarity.COMMON
end
function AutoChessMode.prototype.selectRandomPieceByRarity(self, rarity)
    local pieces = {}
    for ____, piece in __TS__Iterator(self.chessPieceDatabase:values()) do
        if piece.rarity == rarity then
            local remaining = self.gameState.chessPool:get(piece.id) or 0
            if remaining > 0 then
                pieces[#pieces + 1] = piece
            end
        end
    end
    if #pieces == 0 then
        return nil
    end
    local randomIndex = RandomInt(0, #pieces - 1)
    return pieces[randomIndex + 1]
end
function AutoChessMode.prototype.setupBattleMatching(self)
    local alivePlayers = {}
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            alivePlayers[#alivePlayers + 1] = playerId
        end
    end
    do
        local i = 0
        while i < #alivePlayers do
            if i + 1 < #alivePlayers then
                local player1 = alivePlayers[i + 1]
                local player2 = alivePlayers[i + 1 + 1]
                CustomGameEventManager:Send_ServerToAllClients("autochess_battle_match", {player1 = player1, player2 = player2, round = self.gameState.currentRound})
            end
            i = i + 2
        end
    end
end
function AutoChessMode.prototype.startAllBattles(self)
    print("[AutoChessMode] Started all battles")
end
function AutoChessMode.prototype.stopAllBattles(self)
    print("[AutoChessMode] Stopped all battles")
end
function AutoChessMode.prototype.calculateBattleResults(self)
    print("[AutoChessMode] Calculated battle results")
end
function AutoChessMode.prototype.checkGameEnd(self)
    local aliveCount = #__TS__ArrayFilter(
        __TS__ArrayFrom(self.gameState.playerStates:values()),
        function(____, state) return state.isAlive end
    )
    return aliveCount <= 1 or self.gameState.currentRound >= 50
end
function AutoChessMode.prototype.endGame(self)
    self.gameState.isGameActive = false
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.gameState.winnerPlayerId = playerId
            break
        end
    end
    print("[AutoChessMode] Game ended. Winner: Player " .. tostring(self.gameState.winnerPlayerId))
    CustomGameEventManager:Send_ServerToAllClients("autochess_game_ended", {winner = self.gameState.winnerPlayerId, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.setupGame(self)
end
function AutoChessMode.prototype.cleanupGame(self)
    if self.phaseTimer then
        Timers:RemoveTimer(self.phaseTimer)
        self.phaseTimer = nil
    end
end
function AutoChessMode.prototype.registerEvents(self)
end
function AutoChessMode.prototype.unregisterEvents(self)
end
function AutoChessMode.prototype.initializeAutoChessMode(self)
    Timers:CreateTimer(
        1,
        function()
            local gameModeManager = GameModeManager:getInstance()
            if gameModeManager:isAutoChessMode() then
                self:activate()
            end
            return nil
        end
    )
end
function AutoChessMode.prototype.syncStateToNetTable(self)
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "autochess_game",
            "state",
            {
                isActive = self.isActive,
                gameState = {currentRound = self.gameState.currentRound, currentPhase = self.gameState.currentPhase, phaseTimeLeft = self.gameState.phaseTimeLeft, isGameActive = self.gameState.isGameActive},
                timestamp = Date:now()
            }
        )
    end
end
function AutoChessMode.prototype.getStatus(self)
    return {isActive = self.isActive, gameState = self.gameState, chessPieceCount = self.chessPieceDatabase.size}
end
function AutoChessMode.prototype.buyChessPiece(self, playerId, pieceId)
    local playerState = self.gameState.playerStates:get(playerId)
    local piece = self.chessPieceDatabase:get(pieceId)
    if not playerState or not piece then
        return false
    end
    if playerState.gold < piece.cost then
        return false
    end
    local remaining = self.gameState.chessPool:get(pieceId) or 0
    if remaining <= 0 then
        return false
    end
    if #playerState.benchPieces >= 8 then
        return false
    end
    playerState.gold = playerState.gold - piece.cost
    local ____playerState_benchPieces_4 = playerState.benchPieces
    ____playerState_benchPieces_4[#____playerState_benchPieces_4 + 1] = piece
    self.gameState.chessPool:set(pieceId, remaining - 1)
    print((("[AutoChessMode] Player " .. tostring(playerId)) .. " bought ") .. piece.displayName)
    self:syncPlayerState(playerId)
    return true
end
function AutoChessMode.prototype.syncPlayerState(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState or not GameRules.XNetTable then
        return
    end
    GameRules.XNetTable:SetTableValue(
        "autochess_player",
        "player_" .. tostring(playerId),
        {
            health = playerState.health,
            maxHealth = playerState.maxHealth,
            gold = playerState.gold,
            level = playerState.level,
            experience = playerState.experience,
            winStreak = playerState.winStreak,
            lossStreak = playerState.lossStreak,
            boardPieces = playerState.boardPieces,
            benchPieces = playerState.benchPieces,
            isAlive = playerState.isAlive,
            rank = playerState.rank,
            timestamp = Date:now()
        }
    )
end
return ____exports
