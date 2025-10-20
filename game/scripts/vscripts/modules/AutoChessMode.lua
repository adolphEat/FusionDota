local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__Iterator = ____lualib.__TS__Iterator
local Map = ____lualib.Map
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 6,["12"] = 6,["13"] = 7,["14"] = 7,["15"] = 8,["16"] = 8,["17"] = 10,["18"] = 11,["19"] = 11,["20"] = 12,["21"] = 12,["22"] = 13,["23"] = 13,["24"] = 14,["25"] = 14,["26"] = 15,["27"] = 15,["28"] = 18,["29"] = 19,["30"] = 20,["31"] = 21,["32"] = 64,["33"] = 64,["34"] = 64,["36"] = 69,["37"] = 73,["38"] = 76,["39"] = 77,["40"] = 80,["41"] = 81,["42"] = 83,["43"] = 84,["44"] = 86,["45"] = 87,["46"] = 89,["47"] = 72,["48"] = 92,["49"] = 93,["50"] = 94,["52"] = 96,["53"] = 92,["54"] = 102,["55"] = 103,["56"] = 104,["59"] = 108,["60"] = 109,["61"] = 110,["64"] = 114,["65"] = 115,["66"] = 116,["67"] = 118,["68"] = 121,["69"] = 102,["70"] = 127,["71"] = 128,["74"] = 132,["75"] = 133,["76"] = 134,["77"] = 136,["78"] = 139,["79"] = 127,["80"] = 145,["81"] = 146,["82"] = 147,["85"] = 151,["86"] = 152,["87"] = 153,["88"] = 156,["89"] = 159,["90"] = 161,["91"] = 164,["92"] = 145,["93"] = 173,["94"] = 174,["95"] = 175,["96"] = 178,["97"] = 178,["98"] = 178,["99"] = 179,["100"] = 180,["103"] = 185,["104"] = 188,["105"] = 191,["106"] = 194,["107"] = 197,["108"] = 199,["109"] = 202,["110"] = 173,["111"] = 212,["112"] = 213,["113"] = 214,["114"] = 217,["115"] = 217,["116"] = 217,["117"] = 218,["118"] = 220,["119"] = 223,["122"] = 228,["123"] = 231,["124"] = 234,["125"] = 237,["126"] = 239,["127"] = 242,["128"] = 212,["129"] = 252,["130"] = 253,["131"] = 254,["132"] = 256,["133"] = 257,["134"] = 258,["137"] = 264,["138"] = 265,["139"] = 268,["140"] = 270,["142"] = 273,["143"] = 252,["144"] = 279,["145"] = 281,["146"] = 279,["147"] = 287,["148"] = 288,["149"] = 290,["150"] = 290,["151"] = 290,["152"] = 291,["153"] = 292,["154"] = 295,["155"] = 298,["156"] = 299,["158"] = 302,["160"] = 305,["163"] = 309,["164"] = 287,["165"] = 315,["166"] = 316,["167"] = 317,["170"] = 320,["171"] = 320,["172"] = 320,["173"] = 320,["174"] = 320,["175"] = 320,["176"] = 320,["178"] = 322,["179"] = 322,["180"] = 323,["181"] = 324,["182"] = 326,["183"] = 328,["184"] = 328,["185"] = 331,["186"] = 336,["187"] = 337,["189"] = 322,["192"] = 341,["193"] = 315,["194"] = 347,["195"] = 348,["196"] = 349,["199"] = 351,["200"] = 352,["202"] = 355,["203"] = 355,["204"] = 356,["205"] = 357,["206"] = 362,["207"] = 363,["208"] = 355,["211"] = 347,["212"] = 370,["213"] = 371,["214"] = 372,["215"] = 375,["216"] = 376,["217"] = 376,["218"] = 376,["220"] = 376,["222"] = 376,["223"] = 378,["224"] = 379,["227"] = 383,["228"] = 386,["229"] = 386,["230"] = 386,["231"] = 387,["232"] = 388,["233"] = 389,["236"] = 393,["237"] = 370,["238"] = 399,["239"] = 400,["240"] = 403,["241"] = 405,["242"] = 399,["243"] = 411,["244"] = 412,["245"] = 413,["247"] = 416,["248"] = 416,["249"] = 416,["250"] = 417,["251"] = 417,["252"] = 420,["253"] = 421,["255"] = 425,["256"] = 431,["257"] = 432,["258"] = 433,["260"] = 436,["261"] = 416,["262"] = 416,["263"] = 411,["264"] = 443,["266"] = 444,["267"] = 445,["269"] = 446,["272"] = 448,["274"] = 449,["278"] = 443,["279"] = 457,["280"] = 459,["281"] = 462,["282"] = 465,["283"] = 466,["286"] = 471,["287"] = 471,["288"] = 472,["289"] = 457,["290"] = 478,["291"] = 479,["292"] = 479,["293"] = 479,["294"] = 479,["295"] = 479,["296"] = 479,["297"] = 479,["298"] = 479,["299"] = 478,["300"] = 492,["301"] = 493,["302"] = 502,["303"] = 502,["304"] = 502,["305"] = 503,["307"] = 504,["308"] = 505,["310"] = 506,["313"] = 508,["315"] = 509,["318"] = 511,["320"] = 512,["323"] = 514,["325"] = 515,["328"] = 517,["330"] = 518,["334"] = 521,["336"] = 524,["337"] = 492,["338"] = 530,["339"] = 531,["340"] = 534,["341"] = 534,["342"] = 534,["343"] = 534,["344"] = 534,["345"] = 534,["346"] = 534,["347"] = 534,["348"] = 534,["349"] = 534,["350"] = 534,["351"] = 534,["352"] = 534,["353"] = 534,["354"] = 549,["355"] = 549,["356"] = 549,["357"] = 549,["358"] = 549,["359"] = 549,["360"] = 549,["361"] = 549,["362"] = 549,["363"] = 549,["364"] = 549,["365"] = 549,["366"] = 549,["367"] = 549,["368"] = 564,["369"] = 564,["370"] = 564,["371"] = 564,["372"] = 564,["373"] = 564,["374"] = 564,["375"] = 564,["376"] = 564,["377"] = 564,["378"] = 564,["379"] = 564,["380"] = 564,["381"] = 564,["382"] = 579,["383"] = 579,["384"] = 579,["385"] = 579,["386"] = 579,["387"] = 579,["388"] = 579,["389"] = 579,["390"] = 579,["391"] = 579,["392"] = 579,["393"] = 579,["394"] = 579,["395"] = 579,["396"] = 594,["397"] = 594,["398"] = 594,["399"] = 594,["400"] = 594,["401"] = 594,["402"] = 594,["403"] = 594,["404"] = 594,["405"] = 594,["406"] = 594,["407"] = 594,["408"] = 594,["409"] = 594,["410"] = 611,["411"] = 530,["412"] = 617,["413"] = 618,["415"] = 619,["416"] = 619,["417"] = 620,["418"] = 621,["419"] = 621,["420"] = 621,["421"] = 621,["422"] = 621,["423"] = 621,["424"] = 621,["425"] = 621,["426"] = 621,["427"] = 621,["428"] = 621,["429"] = 621,["430"] = 621,["431"] = 621,["432"] = 636,["434"] = 619,["437"] = 617,["438"] = 644,["439"] = 645,["440"] = 645,["441"] = 645,["445"] = 646,["446"] = 646,["449"] = 649,["450"] = 652,["451"] = 652,["452"] = 652,["453"] = 652,["454"] = 653,["455"] = 656,["456"] = 657,["458"] = 659,["459"] = 660,["461"] = 663,["462"] = 665,["470"] = 644,["471"] = 672,["472"] = 673,["473"] = 673,["474"] = 673,["478"] = 674,["479"] = 674,["482"] = 676,["483"] = 679,["484"] = 680,["485"] = 680,["486"] = 680,["487"] = 680,["488"] = 680,["489"] = 680,["490"] = 680,["491"] = 680,["492"] = 680,["501"] = 672,["502"] = 692,["503"] = 693,["504"] = 694,["505"] = 697,["507"] = 699,["508"] = 699,["509"] = 700,["510"] = 701,["511"] = 702,["512"] = 703,["514"] = 699,["517"] = 707,["518"] = 692,["519"] = 713,["520"] = 714,["522"] = 717,["523"] = 718,["525"] = 719,["528"] = 721,["530"] = 722,["531"] = 723,["534"] = 725,["536"] = 726,["537"] = 727,["538"] = 728,["542"] = 732,["543"] = 733,["544"] = 734,["545"] = 735,["546"] = 736,["549"] = 739,["550"] = 713,["551"] = 745,["552"] = 746,["553"] = 747,["554"] = 748,["556"] = 751,["557"] = 752,["558"] = 754,["559"] = 754,["560"] = 754,["561"] = 755,["562"] = 756,["563"] = 757,["566"] = 761,["567"] = 745,["568"] = 767,["569"] = 768,["570"] = 770,["571"] = 771,["572"] = 773,["573"] = 774,["574"] = 775,["578"] = 780,["579"] = 781,["581"] = 784,["582"] = 785,["583"] = 767,["584"] = 791,["585"] = 793,["586"] = 793,["587"] = 793,["588"] = 794,["589"] = 796,["590"] = 796,["591"] = 796,["592"] = 796,["593"] = 796,["594"] = 796,["595"] = 796,["596"] = 796,["599"] = 791,["600"] = 808,["601"] = 810,["602"] = 810,["603"] = 810,["604"] = 811,["605"] = 813,["606"] = 815,["607"] = 818,["610"] = 822,["611"] = 808,["612"] = 828,["613"] = 830,["614"] = 830,["615"] = 830,["616"] = 831,["618"] = 834,["619"] = 828,["620"] = 840,["621"] = 841,["622"] = 843,["626"] = 844,["627"] = 845,["630"] = 848,["631"] = 849,["632"] = 851,["633"] = 852,["636"] = 856,["637"] = 858,["638"] = 859,["639"] = 861,["641"] = 864,["642"] = 865,["643"] = 868,["644"] = 869,["645"] = 871,["646"] = 874,["647"] = 875,["648"] = 876,["649"] = 877,["659"] = 882,["660"] = 840,["661"] = 888,["662"] = 889,["663"] = 889,["664"] = 889,["665"] = 889,["666"] = 892,["667"] = 888,["668"] = 898,["669"] = 899,["670"] = 902,["671"] = 902,["672"] = 902,["673"] = 903,["674"] = 904,["678"] = 909,["679"] = 912,["680"] = 898,["681"] = 921,["682"] = 921,["683"] = 929,["684"] = 930,["685"] = 931,["686"] = 932,["688"] = 929,["689"] = 942,["690"] = 942,["691"] = 949,["692"] = 949,["693"] = 956,["694"] = 957,["695"] = 960,["696"] = 960,["697"] = 960,["698"] = 961,["699"] = 960,["700"] = 960,["701"] = 960,["702"] = 964,["703"] = 956,["704"] = 970,["705"] = 971,["706"] = 974,["707"] = 974,["708"] = 974,["709"] = 974,["710"] = 974,["711"] = 974,["712"] = 974,["713"] = 974,["714"] = 974,["715"] = 974,["716"] = 974,["717"] = 974,["718"] = 974,["719"] = 974,["720"] = 988,["721"] = 990,["722"] = 997,["723"] = 998,["724"] = 999,["725"] = 1000,["728"] = 1005,["729"] = 1006,["730"] = 1007,["731"] = 1008,["734"] = 970,["735"] = 1016,["736"] = 1017,["737"] = 1019,["738"] = 1020,["741"] = 1024,["742"] = 1025,["743"] = 1028,["744"] = 1029,["745"] = 1029,["746"] = 1029,["747"] = 1030,["748"] = 1031,["749"] = 1032,["751"] = 1034,["752"] = 1029,["753"] = 1029,["754"] = 1016,["755"] = 1041,["756"] = 1042,["757"] = 1043,["760"] = 1047,["761"] = 1048,["762"] = 1041,["763"] = 1054,["764"] = 1055,["765"] = 1056,["766"] = 1056,["767"] = 1056,["768"] = 1056,["769"] = 1056,["770"] = 1056,["771"] = 1056,["772"] = 1056,["773"] = 1056,["775"] = 1054,["776"] = 1072,["777"] = 1073,["778"] = 1072,["779"] = 1083,["780"] = 1084,["781"] = 1085,["782"] = 1087,["783"] = 1088,["785"] = 1092,["786"] = 1093,["788"] = 1097,["789"] = 1098,["790"] = 1099,["792"] = 1103,["793"] = 1104,["795"] = 1108,["796"] = 1109,["797"] = 1109,["798"] = 1110,["799"] = 1112,["800"] = 1115,["801"] = 1117,["802"] = 1083,["803"] = 1123,["804"] = 1124,["805"] = 1125,["808"] = 1129,["809"] = 1129,["810"] = 1129,["811"] = 1129,["812"] = 1129,["813"] = 1129,["814"] = 1129,["815"] = 1129,["816"] = 1129,["817"] = 1129,["818"] = 1129,["819"] = 1129,["820"] = 1129,["821"] = 1129,["822"] = 1129,["823"] = 1129,["824"] = 1129,["825"] = 1129,["826"] = 1123,["827"] = 1148,["828"] = 1149,["829"] = 1148,["830"] = 1155,["831"] = 1156,["832"] = 1155});
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
    self.gameState.phaseTimeLeft = 10
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.battleSystem:movePlayerToSpectatorArea(playerId)
        end
    end
    self.battleSystem:recreateHexBoard()
    self:distributeRoundIncome()
    self:refreshAllPlayersShop()
    self:createPlayerInitialPieces()
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
    self:createEnemyPieces()
    self:setupBattleMatching()
    self:startAllBattles()
    self:startPhaseTimer()
    print("[AutoChessMode] Started battle phase for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_phase_started", {phase = ____exports.RoundPhase.BATTLE, timeLeft = self.gameState.phaseTimeLeft, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.deployPlayerChessPieces(self, playerId)
    print("[AutoChessMode] ========== 开始部署玩家棋子到战斗位置 ==========")
    print((("[AutoChessMode] Player ID: " .. tostring(playerId)) .. ", Phase: ") .. self.gameState.currentPhase)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        print("[AutoChessMode] ERROR: Player state not found for player " .. tostring(playerId))
        return
    end
    if self.gameState.currentPhase == ____exports.RoundPhase.BATTLE then
        print(("[AutoChessMode] 战斗阶段：激活玩家 " .. tostring(playerId)) .. " 的棋子")
        self.battleSystem:activatePlayerPieces(playerId)
        print(("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 的棋子已激活，准备战斗")
    end
    print("[AutoChessMode] ========== 战斗阶段棋子部署完成 ==========")
end
function AutoChessMode.prototype.getDefaultTestPieces(self)
    return {"axe", "axe", "crystal_maiden"}
end
function AutoChessMode.prototype.createPlayerInitialPieces(self)
    print("[AutoChessMode] ========== 开始创建玩家初始棋子 ==========")
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            print(("[AutoChessMode] 为玩家 " .. tostring(playerId)) .. " 创建初始棋子...")
            self.battleSystem:clearPlayerPieces(playerId)
            if self.gameState.currentRound == 1 then
                self:createFirstRoundPieces(playerId)
            else
                self:deployPiecesFromBench(playerId)
            end
            print(("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 初始棋子创建完成")
        end
    end
    print("[AutoChessMode] ========== 玩家初始棋子创建完成 ==========")
end
function AutoChessMode.prototype.createFirstRoundPieces(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        return
    end
    local initialPieces = {
        "axe",
        "crystal_maiden",
        "drow_ranger",
        "crystal_maiden",
        "crystal_maiden"
    }
    do
        local i = 0
        while i < #initialPieces do
            local pieceId = initialPieces[i + 1]
            local piece = self.chessPieceDatabase:get(pieceId)
            if piece then
                local ____playerState_benchPieces_0 = playerState.benchPieces
                ____playerState_benchPieces_0[#____playerState_benchPieces_0 + 1] = piece
                local position = {x = 1 + i, y = 1}
                print(((((("[AutoChessMode] 创建初始棋子: " .. pieceId) .. " 在位置 (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
                self.battleSystem:deployPiece(playerId, pieceId, position)
            end
            i = i + 1
        end
    end
    print(((("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 第一回合初始棋子创建完成，共 ") .. tostring(#initialPieces)) .. " 个")
end
function AutoChessMode.prototype.deployPiecesFromBench(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        return
    end
    local benchPieces = playerState.benchPieces or ({})
    print((("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 备战席棋子数量: ") .. tostring(#benchPieces))
    do
        local i = 0
        while i < math.min(#benchPieces, 7) do
            local piece = benchPieces[i + 1]
            local position = {x = 1 + i, y = 1}
            print(((((("[AutoChessMode] 部署备战席棋子: " .. piece.id) .. " 到位置 (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
            self.battleSystem:deployPiece(playerId, piece.id, position)
            i = i + 1
        end
    end
end
function AutoChessMode.prototype.createEnemyPieces(self)
    print("[AutoChessMode] ========== 开始创建敌人棋子 ==========")
    print("[AutoChessMode] 当前回合: " .. tostring(self.gameState.currentRound))
    local waveConfigSystem = self.battleSystem:getWaveConfigSystem()
    local ____waveConfigSystem_1
    if waveConfigSystem then
        ____waveConfigSystem_1 = waveConfigSystem:startNewWave(self.gameState.currentRound)
    else
        ____waveConfigSystem_1 = nil
    end
    local waveConfig = ____waveConfigSystem_1
    if not waveConfig then
        print("[AutoChessMode] ERROR: 无法获取波次配置 for round " .. tostring(self.gameState.currentRound))
        return
    end
    print(((("[AutoChessMode] 使用波次配置: " .. waveConfig.name) .. " (") .. waveConfig.id) .. ")")
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            print(("[AutoChessMode] 为玩家 " .. tostring(playerId)) .. " 创建敌人棋子...")
            self:createEnemyForPlayer(playerId, waveConfig)
        end
    end
    print("[AutoChessMode] ========== 敌人棋子创建完成 ==========")
end
function AutoChessMode.prototype.createEnemyForPlayer(self, playerId, waveConfig)
    print((("[AutoChessMode] 为玩家 " .. tostring(playerId)) .. " 创建敌人，使用配置: ") .. tostring(waveConfig.name))
    self.battleSystem:startNewWave(self.gameState.currentRound)
    print(("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 的敌人棋子创建完成")
end
function AutoChessMode.prototype.startPhaseTimer(self)
    if self.phaseTimer then
        Timers:RemoveTimer(self.phaseTimer)
    end
    self.phaseTimer = Timers:CreateTimer(
        1,
        function()
            local ____self_gameState_2, ____phaseTimeLeft_3 = self.gameState, "phaseTimeLeft"
            ____self_gameState_2[____phaseTimeLeft_3] = ____self_gameState_2[____phaseTimeLeft_3] - 1
            if self.gameState.currentPhase == ____exports.RoundPhase.PREPARATION then
                self.battleSystem:recreateHexBoard()
            end
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
        local ____switch51 = self.gameState.currentPhase
        local ____cond51 = ____switch51 == ____exports.RoundPhase.PREPARATION
        if ____cond51 then
            self:startBattlePhase()
            break
        end
        ____cond51 = ____cond51 or ____switch51 == ____exports.RoundPhase.BATTLE
        if ____cond51 then
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
    local ____self_gameState_4, ____currentRound_5 = self.gameState, "currentRound"
    ____self_gameState_4[____currentRound_5] = ____self_gameState_4[____currentRound_5] + 1
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
            local ____switch57 = piece.rarity
            local ____cond57 = ____switch57 == ____exports.ChessRarity.COMMON
            if ____cond57 then
                count = 45
                break
            end
            ____cond57 = ____cond57 or ____switch57 == ____exports.ChessRarity.UNCOMMON
            if ____cond57 then
                count = 30
                break
            end
            ____cond57 = ____cond57 or ____switch57 == ____exports.ChessRarity.RARE
            if ____cond57 then
                count = 25
                break
            end
            ____cond57 = ____cond57 or ____switch57 == ____exports.ChessRarity.EPIC
            if ____cond57 then
                count = 15
                break
            end
            ____cond57 = ____cond57 or ____switch57 == ____exports.ChessRarity.LEGENDARY
            if ____cond57 then
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
            local __continue65
            repeat
                if not playerState.isAlive then
                    __continue65 = true
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
                __continue65 = true
            until true
            if not __continue65 then
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
            local __continue71
            repeat
                if not playerState.isAlive then
                    __continue71 = true
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
                __continue71 = true
            until true
            if not __continue71 then
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
        local ____switch80 = playerLevel
        local ____cond80 = ____switch80 == 1
        if ____cond80 then
            chances:set(____exports.ChessRarity.COMMON, 100)
            break
        end
        ____cond80 = ____cond80 or ____switch80 == 2
        if ____cond80 then
            chances:set(____exports.ChessRarity.COMMON, 70)
            chances:set(____exports.ChessRarity.UNCOMMON, 30)
            break
        end
        ____cond80 = ____cond80 or ____switch80 == 3
        if ____cond80 then
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
            local __continue105
            repeat
                if not battle.completed then
                    __continue105 = true
                    break
                end
                local playerId = battle.player1
                local playerState = self.gameState.playerStates:get(playerId)
                if not playerState then
                    __continue105 = true
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
                __continue105 = true
            until true
            if not __continue105 then
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
    local ____playerState_benchPieces_6 = playerState.benchPieces
    ____playerState_benchPieces_6[#____playerState_benchPieces_6 + 1] = piece
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
