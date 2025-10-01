local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__Iterator = ____lualib.__TS__Iterator
local Map = ____lualib.Map
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 6,["12"] = 6,["13"] = 7,["14"] = 7,["15"] = 8,["16"] = 8,["17"] = 10,["18"] = 11,["19"] = 11,["20"] = 12,["21"] = 12,["22"] = 13,["23"] = 13,["24"] = 14,["25"] = 14,["26"] = 15,["27"] = 15,["28"] = 18,["29"] = 19,["30"] = 20,["31"] = 21,["32"] = 64,["33"] = 64,["34"] = 64,["36"] = 69,["37"] = 73,["38"] = 76,["39"] = 77,["40"] = 80,["41"] = 81,["42"] = 83,["43"] = 84,["44"] = 86,["45"] = 87,["46"] = 89,["47"] = 72,["48"] = 92,["49"] = 93,["50"] = 94,["52"] = 96,["53"] = 92,["54"] = 102,["55"] = 103,["56"] = 104,["59"] = 108,["60"] = 109,["61"] = 110,["64"] = 114,["65"] = 115,["66"] = 116,["67"] = 118,["68"] = 121,["69"] = 102,["70"] = 127,["71"] = 128,["74"] = 132,["75"] = 133,["76"] = 134,["77"] = 136,["78"] = 139,["79"] = 127,["80"] = 145,["81"] = 146,["82"] = 147,["85"] = 151,["86"] = 152,["87"] = 153,["88"] = 156,["89"] = 159,["90"] = 161,["91"] = 164,["92"] = 145,["93"] = 173,["94"] = 174,["95"] = 175,["96"] = 178,["97"] = 178,["98"] = 178,["99"] = 179,["100"] = 180,["103"] = 185,["104"] = 188,["105"] = 191,["106"] = 193,["107"] = 196,["108"] = 173,["109"] = 206,["110"] = 207,["111"] = 208,["112"] = 211,["113"] = 211,["114"] = 211,["115"] = 212,["116"] = 214,["117"] = 217,["120"] = 222,["121"] = 225,["122"] = 228,["123"] = 230,["124"] = 233,["125"] = 206,["126"] = 243,["127"] = 244,["128"] = 245,["129"] = 247,["130"] = 248,["131"] = 249,["134"] = 254,["135"] = 257,["136"] = 258,["137"] = 260,["138"] = 262,["139"] = 263,["140"] = 264,["141"] = 269,["142"] = 270,["143"] = 271,["144"] = 272,["145"] = 274,["149"] = 277,["151"] = 280,["152"] = 281,["153"] = 282,["154"] = 283,["155"] = 285,["156"] = 286,["157"] = 287,["158"] = 292,["159"] = 293,["160"] = 294,["161"] = 295,["163"] = 298,["165"] = 301,["166"] = 243,["167"] = 307,["168"] = 309,["169"] = 307,["170"] = 315,["171"] = 316,["172"] = 317,["174"] = 320,["175"] = 320,["176"] = 320,["177"] = 321,["178"] = 321,["179"] = 324,["180"] = 330,["181"] = 331,["182"] = 332,["184"] = 335,["185"] = 320,["186"] = 320,["187"] = 315,["188"] = 342,["190"] = 343,["191"] = 344,["193"] = 345,["196"] = 347,["198"] = 348,["202"] = 342,["203"] = 356,["204"] = 358,["205"] = 361,["206"] = 364,["207"] = 365,["210"] = 370,["211"] = 370,["212"] = 371,["213"] = 356,["214"] = 377,["215"] = 378,["216"] = 378,["217"] = 378,["218"] = 378,["219"] = 378,["220"] = 378,["221"] = 378,["222"] = 378,["223"] = 377,["224"] = 391,["225"] = 392,["226"] = 401,["227"] = 401,["228"] = 401,["229"] = 402,["231"] = 403,["232"] = 404,["234"] = 405,["237"] = 407,["239"] = 408,["242"] = 410,["244"] = 411,["247"] = 413,["249"] = 414,["252"] = 416,["254"] = 417,["258"] = 420,["260"] = 423,["261"] = 391,["262"] = 429,["263"] = 430,["264"] = 433,["265"] = 433,["266"] = 433,["267"] = 433,["268"] = 433,["269"] = 433,["270"] = 433,["271"] = 433,["272"] = 433,["273"] = 433,["274"] = 433,["275"] = 433,["276"] = 433,["277"] = 433,["278"] = 448,["279"] = 448,["280"] = 448,["281"] = 448,["282"] = 448,["283"] = 448,["284"] = 448,["285"] = 448,["286"] = 448,["287"] = 448,["288"] = 448,["289"] = 448,["290"] = 448,["291"] = 448,["292"] = 463,["293"] = 463,["294"] = 463,["295"] = 463,["296"] = 463,["297"] = 463,["298"] = 463,["299"] = 463,["300"] = 463,["301"] = 463,["302"] = 463,["303"] = 463,["304"] = 463,["305"] = 463,["306"] = 478,["307"] = 478,["308"] = 478,["309"] = 478,["310"] = 478,["311"] = 478,["312"] = 478,["313"] = 478,["314"] = 478,["315"] = 478,["316"] = 478,["317"] = 478,["318"] = 478,["319"] = 478,["320"] = 493,["321"] = 493,["322"] = 493,["323"] = 493,["324"] = 493,["325"] = 493,["326"] = 493,["327"] = 493,["328"] = 493,["329"] = 493,["330"] = 493,["331"] = 493,["332"] = 493,["333"] = 493,["334"] = 510,["335"] = 429,["336"] = 516,["337"] = 517,["339"] = 518,["340"] = 518,["341"] = 519,["342"] = 520,["343"] = 520,["344"] = 520,["345"] = 520,["346"] = 520,["347"] = 520,["348"] = 520,["349"] = 520,["350"] = 520,["351"] = 520,["352"] = 520,["353"] = 520,["354"] = 520,["355"] = 520,["356"] = 535,["358"] = 518,["361"] = 516,["362"] = 543,["363"] = 544,["364"] = 544,["365"] = 544,["369"] = 545,["370"] = 545,["373"] = 548,["374"] = 551,["375"] = 551,["376"] = 551,["377"] = 551,["378"] = 552,["379"] = 555,["380"] = 556,["382"] = 558,["383"] = 559,["385"] = 562,["386"] = 564,["394"] = 543,["395"] = 571,["396"] = 572,["397"] = 572,["398"] = 572,["402"] = 573,["403"] = 573,["406"] = 575,["407"] = 578,["408"] = 579,["409"] = 579,["410"] = 579,["411"] = 579,["412"] = 579,["413"] = 579,["414"] = 579,["415"] = 579,["416"] = 579,["425"] = 571,["426"] = 591,["427"] = 592,["428"] = 593,["429"] = 596,["431"] = 598,["432"] = 598,["433"] = 599,["434"] = 600,["435"] = 601,["436"] = 602,["438"] = 598,["441"] = 606,["442"] = 591,["443"] = 612,["444"] = 613,["446"] = 616,["447"] = 617,["449"] = 618,["452"] = 620,["454"] = 621,["455"] = 622,["458"] = 624,["460"] = 625,["461"] = 626,["462"] = 627,["466"] = 631,["467"] = 632,["468"] = 633,["469"] = 634,["470"] = 635,["473"] = 638,["474"] = 612,["475"] = 644,["476"] = 645,["477"] = 646,["478"] = 647,["480"] = 650,["481"] = 651,["482"] = 653,["483"] = 653,["484"] = 653,["485"] = 654,["486"] = 655,["487"] = 656,["490"] = 660,["491"] = 644,["492"] = 666,["493"] = 667,["494"] = 669,["495"] = 670,["496"] = 672,["497"] = 673,["498"] = 674,["502"] = 679,["503"] = 680,["505"] = 683,["506"] = 684,["507"] = 666,["508"] = 690,["509"] = 692,["510"] = 692,["511"] = 692,["512"] = 693,["513"] = 695,["514"] = 695,["515"] = 695,["516"] = 695,["517"] = 695,["518"] = 695,["519"] = 695,["520"] = 695,["523"] = 690,["524"] = 707,["525"] = 709,["526"] = 709,["527"] = 709,["528"] = 710,["529"] = 712,["530"] = 714,["531"] = 717,["534"] = 721,["535"] = 707,["536"] = 727,["537"] = 729,["538"] = 729,["539"] = 729,["540"] = 730,["542"] = 733,["543"] = 727,["544"] = 739,["545"] = 740,["546"] = 742,["550"] = 743,["551"] = 744,["554"] = 747,["555"] = 748,["556"] = 750,["557"] = 751,["560"] = 755,["561"] = 757,["562"] = 758,["563"] = 760,["565"] = 763,["566"] = 764,["567"] = 767,["568"] = 768,["569"] = 770,["570"] = 773,["571"] = 774,["572"] = 775,["573"] = 776,["583"] = 781,["584"] = 739,["585"] = 787,["586"] = 788,["587"] = 788,["588"] = 788,["589"] = 788,["590"] = 791,["591"] = 787,["592"] = 797,["593"] = 798,["594"] = 801,["595"] = 801,["596"] = 801,["597"] = 802,["598"] = 803,["602"] = 808,["603"] = 811,["604"] = 797,["605"] = 820,["606"] = 820,["607"] = 828,["608"] = 829,["609"] = 830,["610"] = 831,["612"] = 828,["613"] = 841,["614"] = 841,["615"] = 848,["616"] = 848,["617"] = 855,["618"] = 856,["619"] = 859,["620"] = 859,["621"] = 859,["622"] = 860,["623"] = 859,["624"] = 859,["625"] = 859,["626"] = 863,["627"] = 855,["628"] = 869,["629"] = 870,["630"] = 873,["631"] = 873,["632"] = 873,["633"] = 873,["634"] = 873,["635"] = 873,["636"] = 873,["637"] = 873,["638"] = 873,["639"] = 873,["640"] = 873,["641"] = 873,["642"] = 873,["643"] = 873,["644"] = 887,["645"] = 889,["646"] = 896,["647"] = 897,["648"] = 898,["649"] = 899,["652"] = 904,["653"] = 905,["654"] = 906,["655"] = 907,["658"] = 869,["659"] = 915,["660"] = 916,["661"] = 918,["662"] = 919,["665"] = 923,["666"] = 924,["667"] = 927,["668"] = 928,["669"] = 928,["670"] = 928,["671"] = 929,["672"] = 930,["673"] = 931,["675"] = 933,["676"] = 928,["677"] = 928,["678"] = 915,["679"] = 940,["680"] = 941,["681"] = 942,["684"] = 946,["685"] = 947,["686"] = 940,["687"] = 953,["688"] = 954,["689"] = 955,["690"] = 955,["691"] = 955,["692"] = 955,["693"] = 955,["694"] = 955,["695"] = 955,["696"] = 955,["697"] = 955,["699"] = 953,["700"] = 971,["701"] = 972,["702"] = 971,["703"] = 982,["704"] = 983,["705"] = 984,["706"] = 986,["707"] = 987,["709"] = 991,["710"] = 992,["712"] = 996,["713"] = 997,["714"] = 998,["716"] = 1002,["717"] = 1003,["719"] = 1007,["720"] = 1008,["721"] = 1008,["722"] = 1009,["723"] = 1011,["724"] = 1014,["725"] = 1016,["726"] = 982,["727"] = 1022,["728"] = 1023,["729"] = 1024,["732"] = 1028,["733"] = 1028,["734"] = 1028,["735"] = 1028,["736"] = 1028,["737"] = 1028,["738"] = 1028,["739"] = 1028,["740"] = 1028,["741"] = 1028,["742"] = 1028,["743"] = 1028,["744"] = 1028,["745"] = 1028,["746"] = 1028,["747"] = 1028,["748"] = 1028,["749"] = 1028,["750"] = 1022,["751"] = 1047,["752"] = 1048,["753"] = 1047,["754"] = 1054,["755"] = 1055,["756"] = 1054});
local ____exports = {}
local ____GameModeManager = require("modules.GameModeManager")
local GameModeManager = ____GameModeManager.GameModeManager
local ____ChessBattleSystem = require("modules.autochess.ChessBattleSystem")
local ChessBattleSystem = ____ChessBattleSystem.ChessBattleSystem
local ____time_utils = require("utils.time_utils")
local getTimestamp = ____time_utils.getTimestamp
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
    print("[AutoChessMode] ========== 构造函数开始 ==========")
    print("[AutoChessMode] 初始化棋子数据库...")
    self.chessPieceDatabase = self:initializeChessDatabase()
    print("[AutoChessMode] 初始化游戏状态...")
    self.gameState = self:initializeGameState()
    print("[AutoChessMode] 初始化战斗系统...")
    self.battleSystem = ChessBattleSystem:getInstance()
    print("[AutoChessMode] 初始化自走棋模式...")
    self:initializeAutoChessMode()
    print("[AutoChessMode] ✅ Initialized")
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
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.battleSystem:movePlayerToSpectatorArea(playerId)
        end
    end
    self:distributeRoundIncome()
    self:refreshAllPlayersShop()
    self:startPhaseTimer()
    print("[AutoChessMode] Started preparation phase for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_phase_started", {phase = ____exports.RoundPhase.PREPARATION, timeLeft = self.gameState.phaseTimeLeft, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.startBattlePhase(self)
    self.gameState.currentPhase = ____exports.RoundPhase.BATTLE
    self.gameState.phaseTimeLeft = 45
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.battleSystem:setPlayerAsProtected(playerId)
            self:deployPlayerChessPieces(playerId)
        end
    end
    self:setupBattleMatching()
    self:startAllBattles()
    self:startPhaseTimer()
    print("[AutoChessMode] Started battle phase for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_phase_started", {phase = ____exports.RoundPhase.BATTLE, timeLeft = self.gameState.phaseTimeLeft, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.deployPlayerChessPieces(self, playerId)
    print("[AutoChessMode] ========== 开始部署玩家棋子 ==========")
    print("[AutoChessMode] Player ID: " .. tostring(playerId))
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        print("[AutoChessMode] ERROR: Player state not found for player " .. tostring(playerId))
        return
    end
    self.battleSystem:clearPlayerPieces(playerId)
    local benchPieces = playerState.benchPieces or ({})
    print("[AutoChessMode] Bench pieces count: " .. tostring(#benchPieces))
    if #benchPieces > 0 then
        local slotIndex = 0
        for ____, piece in ipairs(benchPieces) do
            local position = {x = 1 + slotIndex, y = 1}
            print(((((("[AutoChessMode] Deploying bench piece: " .. piece.id) .. " at (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
            local result = self.battleSystem:deployPiece(playerId, piece.id, position)
            print("[AutoChessMode] Deploy result: " .. tostring(result))
            slotIndex = slotIndex + 1
            if slotIndex >= 7 then
                break
            end
        end
        print((("[AutoChessMode] Deployed " .. tostring(slotIndex)) .. " pieces from bench for player ") .. tostring(playerId))
    else
        print("[AutoChessMode] No bench pieces, deploying default test pieces...")
        local defaultPieces = self:getDefaultTestPieces()
        print("[AutoChessMode] Default pieces: " .. table.concat(defaultPieces, ", "))
        print("[AutoChessMode] Chess database size: " .. tostring(self.chessPieceDatabase.size))
        local slotIndex = 0
        for ____, pieceId in ipairs(defaultPieces) do
            local position = {x = 1 + slotIndex, y = 1}
            print(((((("[AutoChessMode] Attempting to deploy: " .. pieceId) .. " at position (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
            local result = self.battleSystem:deployPiece(playerId, pieceId, position)
            print((("[AutoChessMode] Deploy result for " .. pieceId) .. ": ") .. (result and "SUCCESS" or "FAILED"))
            slotIndex = slotIndex + 1
        end
        print((("[AutoChessMode] Deployed " .. tostring(slotIndex)) .. " default test pieces for player ") .. tostring(playerId))
    end
    print("[AutoChessMode] ========== 棋子部署完成 ==========")
end
function AutoChessMode.prototype.getDefaultTestPieces(self)
    return {"axe", "axe", "crystal_maiden"}
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
        local ____switch35 = self.gameState.currentPhase
        local ____cond35 = ____switch35 == ____exports.RoundPhase.PREPARATION
        if ____cond35 then
            self:startBattlePhase()
            break
        end
        ____cond35 = ____cond35 or ____switch35 == ____exports.RoundPhase.BATTLE
        if ____cond35 then
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
            local ____switch41 = piece.rarity
            local ____cond41 = ____switch41 == ____exports.ChessRarity.COMMON
            if ____cond41 then
                count = 45
                break
            end
            ____cond41 = ____cond41 or ____switch41 == ____exports.ChessRarity.UNCOMMON
            if ____cond41 then
                count = 30
                break
            end
            ____cond41 = ____cond41 or ____switch41 == ____exports.ChessRarity.RARE
            if ____cond41 then
                count = 25
                break
            end
            ____cond41 = ____cond41 or ____switch41 == ____exports.ChessRarity.EPIC
            if ____cond41 then
                count = 15
                break
            end
            ____cond41 = ____cond41 or ____switch41 == ____exports.ChessRarity.LEGENDARY
            if ____cond41 then
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
    database:set("axe", {
        id = "axe",
        unitName = "npc_dota_hero_axe",
        displayName = "斧王",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"兽人"},
        class = {"战士"},
        health = 625,
        damage = 52,
        armor = 3,
        attackRange = 150,
        abilities = {"axe_berserkers_call"}
    })
    database:set("drow_ranger", {
        id = "drow_ranger",
        unitName = "npc_dota_hero_drow_ranger",
        displayName = "卓尔游侠",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"不死"},
        class = {"猎人"},
        health = 435,
        damage = 45,
        armor = 1,
        attackRange = 625,
        abilities = {"drow_ranger_frost_arrows"}
    })
    database:set("bounty_hunter", {
        id = "bounty_hunter",
        unitName = "npc_dota_hero_bounty_hunter",
        displayName = "赏金猎人",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"地精"},
        class = {"刺客"},
        health = 550,
        damage = 48,
        armor = 2,
        attackRange = 150,
        abilities = {"bounty_hunter_shuriken_toss"}
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
            local __continue49
            repeat
                if not playerState.isAlive then
                    __continue49 = true
                    break
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
                __continue49 = true
            until true
            if not __continue49 then
                break
            end
        end
    end
end
function AutoChessMode.prototype.refreshAllPlayersShop(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        do
            local __continue55
            repeat
                if not playerState.isAlive then
                    __continue55 = true
                    break
                end
                local shopPieces = self:generateShopPieces(playerState.level)
                if GameRules.XNetTable then
                    GameRules.XNetTable:SetTableValue(
                        "autochess_shop",
                        "player_" .. tostring(playerId),
                        {
                            pieces = shopPieces,
                            refreshCount = 0,
                            timestamp = getTimestamp(nil)
                        }
                    )
                end
                __continue55 = true
            until true
            if not __continue55 then
                break
            end
        end
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
        local ____switch64 = playerLevel
        local ____cond64 = ____switch64 == 1
        if ____cond64 then
            chances:set(____exports.ChessRarity.COMMON, 100)
            break
        end
        ____cond64 = ____cond64 or ____switch64 == 2
        if ____cond64 then
            chances:set(____exports.ChessRarity.COMMON, 70)
            chances:set(____exports.ChessRarity.UNCOMMON, 30)
            break
        end
        ____cond64 = ____cond64 or ____switch64 == 3
        if ____cond64 then
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
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            CustomGameEventManager:Send_ServerToAllClients(
                "autochess_battle_vs_ai",
                {
                    playerId = playerId,
                    round = self.gameState.currentRound,
                    aiLevel = math.floor(self.gameState.currentRound / 5) + 1
                }
            )
        end
    end
end
function AutoChessMode.prototype.startAllBattles(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            local aiLevel = math.floor(self.gameState.currentRound / 5) + 1
            print(((("[AutoChessMode] Player " .. tostring(playerId)) .. " vs AI (Level ") .. tostring(aiLevel)) .. ")")
            self.battleSystem:startBattleVsAI(playerId, aiLevel)
        end
    end
    print("[AutoChessMode] Started all AI battles")
end
function AutoChessMode.prototype.stopAllBattles(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        self.battleSystem:clearPlayerPieces(playerId)
    end
    print("[AutoChessMode] Stopped all battles")
end
function AutoChessMode.prototype.calculateBattleResults(self)
    local battles = self.battleSystem:getActiveBattles()
    for ____, battle in ipairs(battles) do
        do
            local __continue89
            repeat
                if not battle.completed then
                    __continue89 = true
                    break
                end
                local playerId = battle.player1
                local playerState = self.gameState.playerStates:get(playerId)
                if not playerState then
                    __continue89 = true
                    break
                end
                if battle.winnerId == playerId then
                    playerState.winStreak = playerState.winStreak + 1
                    playerState.lossStreak = 0
                    print(("[AutoChessMode] Player " .. tostring(playerId)) .. " defeated AI!")
                else
                    local damage = math.min(10, self.gameState.currentRound)
                    playerState.health = playerState.health - damage
                    playerState.lossStreak = playerState.lossStreak + 1
                    playerState.winStreak = 0
                    print(((("[AutoChessMode] Player " .. tostring(playerId)) .. " lost to AI (") .. tostring(damage)) .. " damage)")
                    if playerState.health <= 0 then
                        playerState.isAlive = false
                        playerState.health = 0
                        print(("[AutoChessMode] Player " .. tostring(playerId)) .. " eliminated!")
                    end
                end
                __continue89 = true
            until true
            if not __continue89 then
                break
            end
        end
    end
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
    print("[AutoChessMode] ========== 监听游戏状态事件 ==========")
    ListenToGameEvent(
        "game_rules_state_change",
        function()
            self:onGameStateChanged()
        end,
        self
    )
    print("[AutoChessMode] ✅ 游戏状态事件监听已注册")
end
function AutoChessMode.prototype.onGameStateChanged(self)
    local gameState = GameRules:State_Get()
    local stateNames = {
        "INIT",
        "WAIT_FOR_PLAYERS_TO_LOAD",
        "CUSTOM_GAME_SETUP",
        "HERO_SELECTION",
        "STRATEGY_TIME",
        "PRE_GAME",
        "GAME_IN_PROGRESS",
        "POST_GAME",
        "DISCONNECT",
        "TEAM_SHOWCASE",
        "CUSTOM_GAME_SETUP_2",
        "WAIT_FOR_MAP_TO_LOAD"
    }
    local stateName = stateNames[gameState + 1] or "UNKNOWN_" .. tostring(gameState)
    print(((("[AutoChessMode] ========== 游戏状态变化: " .. tostring(gameState)) .. " (") .. stateName) .. ") ==========")
    if gameState == 5 or gameState == 8 then
        if not self.isActive then
            print("[AutoChessMode] 📍 PRE_GAME 阶段 - 准备激活自走棋")
            self:onPreGame()
        end
    end
    if gameState == 6 and stateName == "GAME_IN_PROGRESS" then
        if self.isActive and not self.gameState.isGameActive then
            print("[AutoChessMode] 📍 GAME_IN_PROGRESS 阶段 - 游戏开始")
            self:onGameStart()
        end
    end
end
function AutoChessMode.prototype.onPreGame(self)
    local gameModeManager = GameModeManager:getInstance()
    if not gameModeManager:isAutoChessMode() then
        print("[AutoChessMode] ⚠️ 不是自走棋模式，跳过激活")
        return
    end
    print("[AutoChessMode] ✅ 激活自走棋模式...")
    self:activate()
    print("[AutoChessMode] 📍 将在2秒后开始游戏...")
    Timers:CreateTimer(
        2,
        function()
            if self.isActive and not self.gameState.isGameActive then
                print("[AutoChessMode] ✅ 自动开始游戏...")
                self:startGame()
            end
            return nil
        end
    )
end
function AutoChessMode.prototype.onGameStart(self)
    if not self.isActive then
        print("[AutoChessMode] ⚠️ 自走棋模式未激活，跳过游戏开始")
        return
    end
    print("[AutoChessMode] ✅ 自动开始游戏...")
    self:startGame()
end
function AutoChessMode.prototype.syncStateToNetTable(self)
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "autochess_game",
            "state",
            {
                isActive = self.isActive,
                gameState = {currentRound = self.gameState.currentRound, currentPhase = self.gameState.currentPhase, phaseTimeLeft = self.gameState.phaseTimeLeft, isGameActive = self.gameState.isGameActive},
                timestamp = getTimestamp(nil)
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
            timestamp = getTimestamp(nil)
        }
    )
end
function AutoChessMode.prototype.getChessPiece(self, pieceId)
    return self.chessPieceDatabase:get(pieceId) or nil
end
function AutoChessMode.prototype.getAllChessPieces(self)
    return __TS__ArrayFrom(self.chessPieceDatabase:values())
end
return ____exports
