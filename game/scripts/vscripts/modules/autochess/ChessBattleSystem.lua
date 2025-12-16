local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayJoin = ____lualib.__TS__ArrayJoin
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["20"] = 10,["21"] = 10,["22"] = 11,["23"] = 11,["24"] = 44,["25"] = 44,["26"] = 44,["28"] = 51,["29"] = 54,["30"] = 55,["31"] = 56,["32"] = 59,["33"] = 60,["34"] = 61,["35"] = 62,["36"] = 63,["37"] = 58,["38"] = 66,["39"] = 67,["40"] = 68,["42"] = 70,["43"] = 66,["44"] = 76,["45"] = 78,["46"] = 76,["47"] = 84,["48"] = 86,["49"] = 86,["50"] = 86,["51"] = 87,["52"] = 88,["53"] = 89,["54"] = 90,["55"] = 86,["56"] = 86,["57"] = 94,["58"] = 94,["59"] = 94,["60"] = 95,["61"] = 96,["62"] = 97,["63"] = 94,["64"] = 94,["65"] = 84,["66"] = 104,["67"] = 105,["68"] = 106,["71"] = 111,["72"] = 114,["73"] = 117,["74"] = 118,["75"] = 119,["76"] = 120,["77"] = 123,["78"] = 124,["79"] = 125,["80"] = 126,["81"] = 128,["82"] = 104,["83"] = 134,["84"] = 135,["85"] = 136,["88"] = 141,["89"] = 144,["90"] = 146,["91"] = 134,["92"] = 152,["93"] = 153,["94"] = 154,["97"] = 159,["98"] = 160,["99"] = 162,["100"] = 152,["101"] = 168,["102"] = 169,["103"] = 170,["106"] = 175,["107"] = 178,["108"] = 181,["109"] = 184,["110"] = 187,["111"] = 188,["112"] = 190,["113"] = 168,["114"] = 196,["115"] = 198,["116"] = 201,["117"] = 202,["118"] = 203,["119"] = 204,["120"] = 207,["121"] = 208,["122"] = 210,["123"] = 211,["124"] = 196,["125"] = 217,["126"] = 219,["127"] = 220,["128"] = 221,["130"] = 225,["131"] = 226,["132"] = 227,["134"] = 231,["135"] = 232,["136"] = 233,["137"] = 234,["139"] = 238,["140"] = 239,["141"] = 241,["142"] = 241,["143"] = 241,["144"] = 241,["145"] = 241,["146"] = 241,["147"] = 241,["148"] = 241,["149"] = 250,["150"] = 251,["151"] = 252,["153"] = 256,["154"] = 259,["155"] = 260,["157"] = 268,["158"] = 271,["159"] = 272,["160"] = 273,["161"] = 273,["162"] = 273,["163"] = 273,["164"] = 274,["165"] = 275,["166"] = 276,["167"] = 277,["168"] = 277,["169"] = 277,["170"] = 277,["171"] = 278,["173"] = 281,["174"] = 282,["176"] = 284,["179"] = 289,["180"] = 289,["181"] = 289,["182"] = 289,["183"] = 289,["184"] = 289,["185"] = 289,["186"] = 297,["187"] = 298,["188"] = 299,["189"] = 301,["190"] = 302,["191"] = 217,["192"] = 308,["193"] = 309,["194"] = 310,["195"] = 311,["197"] = 314,["198"] = 314,["199"] = 314,["200"] = 314,["201"] = 318,["202"] = 319,["204"] = 322,["205"] = 325,["206"] = 326,["208"] = 330,["209"] = 331,["210"] = 333,["211"] = 334,["212"] = 308,["213"] = 340,["214"] = 341,["215"] = 342,["218"] = 346,["219"] = 347,["220"] = 348,["223"] = 352,["224"] = 353,["225"] = 340,["226"] = 359,["227"] = 360,["228"] = 363,["229"] = 364,["230"] = 367,["231"] = 367,["232"] = 367,["233"] = 367,["234"] = 367,["235"] = 367,["236"] = 367,["237"] = 375,["238"] = 378,["239"] = 380,["240"] = 381,["241"] = 359,["242"] = 388,["243"] = 388,["244"] = 388,["246"] = 389,["247"] = 392,["248"] = 396,["249"] = 398,["250"] = 401,["251"] = 402,["252"] = 403,["253"] = 404,["255"] = 408,["256"] = 408,["257"] = 408,["258"] = 408,["259"] = 408,["260"] = 408,["261"] = 408,["262"] = 416,["263"] = 419,["264"] = 421,["265"] = 422,["266"] = 388,["267"] = 428,["268"] = 429,["269"] = 430,["270"] = 433,["272"] = 435,["273"] = 435,["274"] = 437,["275"] = 440,["276"] = 440,["277"] = 440,["278"] = 440,["279"] = 446,["280"] = 447,["281"] = 447,["282"] = 447,["283"] = 447,["284"] = 447,["285"] = 447,["286"] = 447,["287"] = 447,["288"] = 456,["289"] = 457,["290"] = 459,["291"] = 459,["292"] = 459,["293"] = 459,["294"] = 459,["295"] = 459,["296"] = 459,["298"] = 435,["301"] = 469,["302"] = 428,["303"] = 475,["304"] = 476,["305"] = 477,["308"] = 482,["309"] = 483,["310"] = 485,["311"] = 486,["314"] = 490,["315"] = 491,["316"] = 492,["317"] = 493,["320"] = 498,["321"] = 475,["322"] = 504,["323"] = 505,["324"] = 505,["325"] = 505,["326"] = 506,["327"] = 507,["328"] = 508,["330"] = 512,["331"] = 512,["332"] = 512,["333"] = 512,["334"] = 516,["335"] = 516,["336"] = 516,["337"] = 516,["338"] = 521,["339"] = 522,["340"] = 522,["341"] = 522,["343"] = 522,["345"] = 522,["346"] = 523,["347"] = 524,["348"] = 525,["350"] = 528,["351"] = 505,["352"] = 505,["353"] = 504,["354"] = 535,["355"] = 536,["356"] = 537,["359"] = 542,["360"] = 543,["361"] = 544,["363"] = 548,["364"] = 550,["365"] = 553,["366"] = 553,["367"] = 553,["368"] = 553,["369"] = 553,["370"] = 553,["371"] = 553,["372"] = 556,["373"] = 559,["374"] = 562,["375"] = 571,["376"] = 572,["377"] = 573,["379"] = 580,["381"] = 535,["382"] = 587,["383"] = 588,["384"] = 589,["387"] = 594,["390"] = 594,["392"] = 594,["393"] = 595,["394"] = 596,["395"] = 597,["398"] = 601,["399"] = 587,["400"] = 607,["401"] = 609,["402"] = 612,["403"] = 614,["404"] = 615,["405"] = 618,["406"] = 618,["407"] = 618,["409"] = 618,["411"] = 618,["412"] = 620,["413"] = 622,["414"] = 624,["415"] = 607,["416"] = 630,["417"] = 631,["418"] = 630,["419"] = 638,["420"] = 639,["421"] = 640,["422"] = 641,["424"] = 644,["425"] = 644,["426"] = 644,["427"] = 644,["428"] = 638,["429"] = 652,["430"] = 655,["431"] = 656,["433"] = 658,["434"] = 658,["439"] = 658,["440"] = 652,["441"] = 664,["442"] = 665,["443"] = 666,["444"] = 667,["445"] = 668,["446"] = 669,["447"] = 664,["448"] = 676,["449"] = 678,["450"] = 679,["451"] = 680,["452"] = 681,["453"] = 682,["454"] = 682,["455"] = 682,["456"] = 682,["457"] = 682,["458"] = 682,["459"] = 682,["461"] = 684,["463"] = 686,["464"] = 687,["465"] = 676,["466"] = 693,["467"] = 694,["468"] = 695,["469"] = 696,["471"] = 699,["472"] = 700,["473"] = 701,["474"] = 693,["475"] = 707,["476"] = 708,["477"] = 707,["478"] = 721,["479"] = 722,["480"] = 724,["481"] = 727,["482"] = 727,["483"] = 727,["484"] = 728,["485"] = 729,["486"] = 731,["487"] = 734,["488"] = 742,["489"] = 744,["490"] = 745,["492"] = 747,["497"] = 753,["498"] = 721,["499"] = 762,["500"] = 763,["501"] = 765,["502"] = 768,["503"] = 768,["504"] = 768,["505"] = 769,["506"] = 770,["507"] = 772,["508"] = 773,["510"] = 777,["511"] = 778,["512"] = 780,["513"] = 781,["514"] = 783,["515"] = 784,["517"] = 786,["522"] = 792,["523"] = 762,["524"] = 798,["525"] = 799,["526"] = 798,["527"] = 805,["528"] = 806,["529"] = 805,["530"] = 812,["531"] = 813,["532"] = 812,["533"] = 819,["534"] = 820,["535"] = 822,["536"] = 824,["537"] = 825,["538"] = 827,["539"] = 830,["540"] = 833,["543"] = 837,["544"] = 819,["545"] = 843,["546"] = 845,["547"] = 848,["548"] = 851,["549"] = 853,["550"] = 843,["551"] = 859,["552"] = 860,["553"] = 859,["554"] = 866,["555"] = 867,["556"] = 869,["557"] = 870,["558"] = 871,["560"] = 874,["562"] = 866,["563"] = 881,["564"] = 884,["565"] = 885,["566"] = 886,["567"] = 887,["568"] = 888,["569"] = 890,["570"] = 891,["571"] = 891,["572"] = 891,["573"] = 894,["574"] = 895,["575"] = 896,["577"] = 898,["578"] = 898,["580"] = 899,["581"] = 899,["582"] = 901,["583"] = 902,["584"] = 903,["585"] = 905,["586"] = 905,["587"] = 905,["588"] = 905,["589"] = 905,["590"] = 905,["591"] = 905,["592"] = 905,["593"] = 899,["596"] = 898,["599"] = 881,["600"] = 911,["601"] = 912,["603"] = 913,["604"] = 913,["605"] = 914,["606"] = 915,["607"] = 916,["608"] = 916,["609"] = 916,["610"] = 916,["611"] = 916,["612"] = 916,["613"] = 916,["614"] = 916,["615"] = 916,["616"] = 913,["619"] = 911,["620"] = 920,["621"] = 921,["623"] = 923,["624"] = 923,["625"] = 924,["626"] = 925,["627"] = 926,["628"] = 927,["629"] = 923,["632"] = 929,["633"] = 920,["634"] = 937,["635"] = 938,["636"] = 939,["637"] = 940,["640"] = 944,["641"] = 945,["642"] = 946,["643"] = 947,["644"] = 948,["645"] = 949,["646"] = 950,["647"] = 952,["648"] = 953,["649"] = 954,["652"] = 958,["653"] = 961,["654"] = 962,["655"] = 963,["656"] = 964,["657"] = 964,["658"] = 964,["659"] = 964,["662"] = 967,["663"] = 968,["664"] = 969,["666"] = 937,["667"] = 974,["668"] = 975,["669"] = 976,["670"] = 977,["671"] = 978,["672"] = 979,["673"] = 979,["674"] = 979,["675"] = 979,["678"] = 982,["679"] = 983,["680"] = 984,["682"] = 986,["684"] = 975,["685"] = 990,["686"] = 991,["687"] = 974,["688"] = 996});
local ____exports = {}
local ____time_utils = require("utils.time_utils")
local getTimestampMs = ____time_utils.getTimestampMs
local ____WaveConfigSystem = require("modules.autochess.WaveConfigSystem")
local WaveConfigSystem = ____WaveConfigSystem.WaveConfigSystem
____exports.ChessBattleSystem = __TS__Class()
local ChessBattleSystem = ____exports.ChessBattleSystem
ChessBattleSystem.name = "ChessBattleSystem"
function ChessBattleSystem.prototype.____constructor(self)
    self.playerSurvivorHealth = __TS__New(Map)
    self.BOARD_SIZE = 8
    self.CELL_SIZE = 128
    self.BOARD_OFFSET = Vector(1058, 978, 200)
    self.activeBattles = __TS__New(Map)
    self.playerDeployedPieces = __TS__New(Map)
    self.waveConfigSystem = WaveConfigSystem:getInstance()
    self:initialize()
    print("[ChessBattleSystem] Initialized")
end
function ChessBattleSystem.getInstance(self)
    if not ____exports.ChessBattleSystem.instance then
        ____exports.ChessBattleSystem.instance = __TS__New(____exports.ChessBattleSystem)
    end
    return ____exports.ChessBattleSystem.instance
end
function ChessBattleSystem.prototype.initialize(self)
    self:registerEvents()
end
function ChessBattleSystem.prototype.registerEvents(self)
    CustomGameEventManager:RegisterListener(
        "deploy_chess_piece",
        function(userId, event)
            local playerId = event.PlayerID
            local pieceId = event.pieceId
            local position = event.position
            self:deployPiece(playerId, pieceId, position)
        end
    )
    CustomGameEventManager:RegisterListener(
        "recall_chess_piece",
        function(userId, event)
            local playerId = event.PlayerID
            local position = event.position
            self:recallPiece(playerId, position)
        end
    )
end
function ChessBattleSystem.prototype.setPlayerAsProtected(self, playerId)
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero or hero:IsNull() then
        return
    end
    hero:AddNewModifier(hero, nil, "modifier_invulnerable", {})
    hero:AddNewModifier(hero, nil, "modifier_disarmed", {})
    hero:SetMoveCapability(DOTA_UNIT_CAP_MOVE_GROUND)
    hero:SetControllableByPlayer(playerId, true)
    hero:RemoveModifierByName("modifier_rooted")
    hero:RemoveModifierByName("modifier_stunned")
    local spectatorPos = self:getSpectatorPosition(playerId)
    local groundPos = GetGroundPosition(spectatorPos, hero)
    FindClearSpaceForUnit(hero, groundPos, true)
    hero:AddNewModifier(hero, nil, "modifier_phased", {duration = 0.03})
    print(("[ChessBattleSystem] Player " .. tostring(playerId)) .. " set as protected and moved to spectator position")
end
function ChessBattleSystem.prototype.restorePlayerNormalState(self, playerId)
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero or hero:IsNull() then
        return
    end
    hero:RemoveModifierByName("modifier_invulnerable")
    hero:RemoveModifierByName("modifier_disarmed")
    print(("[ChessBattleSystem] Player " .. tostring(playerId)) .. " restored to normal state")
end
function ChessBattleSystem.prototype.movePlayerToSpectatorArea(self, playerId)
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero or hero:IsNull() then
        return
    end
    local spectatorPos = self:getSpectatorPosition(playerId)
    hero:SetAbsOrigin(spectatorPos)
    print(("[ChessBattleSystem] Player " .. tostring(playerId)) .. " moved to spectator area")
end
function ChessBattleSystem.prototype.setPlayerAsSpectator(self, playerId)
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero or hero:IsNull() then
        return
    end
    hero:AddNewModifier(hero, nil, "modifier_invulnerable", {})
    hero:AddNewModifier(hero, nil, "modifier_disarmed", {})
    hero:SetTeam(DOTA_TEAM_NEUTRALS)
    hero:AddNoDraw()
    local spectatorPos = self:getSpectatorPosition(playerId)
    hero:SetAbsOrigin(spectatorPos)
    print(("[ChessBattleSystem] Player " .. tostring(playerId)) .. " set as spectator")
end
function ChessBattleSystem.prototype.getSpectatorPosition(self, playerId)
    local mapCenter = Vector(self.BOARD_OFFSET.x, self.BOARD_OFFSET.y, 0)
    local angle = playerId / 8 * 2 * math.pi
    local ringDistance = self.BOARD_SIZE * self.CELL_SIZE / 2 + 200
    local x = mapCenter.x + math.cos(angle) * ringDistance
    local y = mapCenter.y + math.sin(angle) * ringDistance
    local pos = Vector(x, y, 0)
    local ground = GetGroundPosition(pos, nil)
    print(((((((("[ChessBattleSystem] Spectator position for player " .. tostring(playerId)) .. ": (") .. __TS__NumberToFixed(ground.x, 1)) .. ", ") .. __TS__NumberToFixed(ground.y, 1)) .. ", ") .. __TS__NumberToFixed(ground.z, 1)) .. ")")
    return ground
end
function ChessBattleSystem.prototype.deployPiece(self, playerId, pieceId, position)
    if not self:isValidPosition(position) then
        print((("[ChessBattleSystem] Invalid position: " .. tostring(position.x)) .. ", ") .. tostring(position.y))
        return false
    end
    if self:isPieceAtPosition(playerId, position) then
        print("[ChessBattleSystem] Position already occupied")
        return false
    end
    local chessPiece = self:getChessPieceDefinition(pieceId)
    if not chessPiece then
        print("[ChessBattleSystem] Chess piece not found: " .. pieceId)
        return false
    end
    local worldPos = self:boardToWorldPosition(position, playerId)
    local team = self:getPlayerTeam(playerId)
    local unit = CreateUnitByName(
        chessPiece.unitName,
        worldPos,
        true,
        nil,
        nil,
        team
    )
    if not unit or unit:IsNull() then
        print("[ChessBattleSystem] Failed to create unit: " .. chessPiece.unitName)
        return false
    end
    self:applyChessPieceStats(unit, chessPiece)
    if not unit:HasModifier("modifier_disarmed") then
        unit:AddNewModifier(unit, nil, "modifier_disarmed", {})
    end
    unit:SetAttackCapability(0)
    local survivorList = self.playerSurvivorHealth:get(playerId)
    if survivorList and #survivorList > 0 then
        local idx = __TS__ArrayFindIndex(
            survivorList,
            function(____, s) return s.pieceId == pieceId end
        )
        if idx ~= -1 then
            local val = __TS__ArraySplice(survivorList, idx, 1)[1]
            local maxHp = unit:GetMaxHealth()
            unit:SetHealth(math.max(
                1,
                math.min(val.health, maxHp)
            ))
            print((("[ChessBattleSystem] Apply survivor HP " .. tostring(val.health)) .. " to ") .. pieceId)
        end
        if #survivorList == 0 then
            self.playerSurvivorHealth:delete(playerId)
        else
            self.playerSurvivorHealth:set(playerId, survivorList)
        end
    end
    local deployed = {
        pieceId = pieceId,
        unit = unit,
        position = position,
        team = team,
        ownerId = playerId
    }
    local playerPieces = self.playerDeployedPieces:get(playerId) or ({})
    playerPieces[#playerPieces + 1] = deployed
    self.playerDeployedPieces:set(playerId, playerPieces)
    print(((((((("[ChessBattleSystem] Player " .. tostring(playerId)) .. " deployed ") .. pieceId) .. " at (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
    return true
end
function ChessBattleSystem.prototype.recallPiece(self, playerId, position)
    local playerPieces = self.playerDeployedPieces:get(playerId)
    if not playerPieces then
        return false
    end
    local index = __TS__ArrayFindIndex(
        playerPieces,
        function(____, p) return p.position.x == position.x and p.position.y == position.y end
    )
    if index == -1 then
        return false
    end
    local piece = playerPieces[index + 1]
    if piece.unit and not piece.unit:IsNull() then
        piece.unit:RemoveSelf()
    end
    __TS__ArraySplice(playerPieces, index, 1)
    self.playerDeployedPieces:set(playerId, playerPieces)
    print(((((("[ChessBattleSystem] Player " .. tostring(playerId)) .. " recalled piece from (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
    return true
end
function ChessBattleSystem.prototype.clearPlayerPieces(self, playerId)
    local playerPieces = self.playerDeployedPieces:get(playerId)
    if not playerPieces then
        return
    end
    for ____, piece in ipairs(playerPieces) do
        if piece.unit and not piece.unit:IsNull() then
            piece.unit:RemoveSelf()
        end
    end
    self.playerDeployedPieces:delete(playerId)
    print("[ChessBattleSystem] Cleared all pieces for player " .. tostring(playerId))
end
function ChessBattleSystem.prototype.startBattle(self, player1, player2)
    local battleId = (((("battle_" .. tostring(player1)) .. "_vs_") .. tostring(player2)) .. "_") .. tostring(getTimestampMs(nil))
    local player1Pieces = self.playerDeployedPieces:get(player1) or ({})
    local player2Pieces = self.playerDeployedPieces:get(player2) or ({})
    local battle = {
        player1 = player1,
        player2 = player2,
        player1Pieces = player1Pieces,
        player2Pieces = player2Pieces,
        completed = false
    }
    self.activeBattles:set(battleId, battle)
    self:executeBattle(battleId)
    print("[ChessBattleSystem] Started battle: " .. battleId)
    return battleId
end
function ChessBattleSystem.prototype.startBattleVsAI(self, playerId, aiLevel)
    if aiLevel == nil then
        aiLevel = 1
    end
    local battleId = (("battle_" .. tostring(playerId)) .. "_vs_ai_") .. tostring(getTimestampMs(nil))
    local playerPieces = self.playerDeployedPieces:get(playerId) or ({})
    local aiPieces = self.playerDeployedPieces:get(-1) or ({})
    print((((("[ChessBattleSystem] Player " .. tostring(playerId)) .. " pieces: ") .. tostring(#playerPieces)) .. ", AI pieces: ") .. tostring(#aiPieces))
    local finalAiPieces = aiPieces
    if #aiPieces == 0 then
        print("[ChessBattleSystem] WARNING: No AI pieces deployed, generating fallback AI pieces")
        finalAiPieces = self:generateAIPieces(aiLevel)
    end
    local battle = {
        player1 = playerId,
        player2 = -1,
        player1Pieces = playerPieces,
        player2Pieces = finalAiPieces,
        completed = false
    }
    self.activeBattles:set(battleId, battle)
    self:executeBattle(battleId)
    print(((((("[ChessBattleSystem] Started battle vs AI: " .. battleId) .. " (player: ") .. tostring(#playerPieces)) .. " pieces, AI: ") .. tostring(#finalAiPieces)) .. " pieces)")
    return battleId
end
function ChessBattleSystem.prototype.generateAIPieces(self, level)
    local aiPieces = {}
    local pieceCount = math.min(3 + level, 8)
    local availablePieces = self:getAvailableChessPieces()
    do
        local i = 0
        while i < pieceCount do
            local randomPiece = availablePieces[RandomInt(0, #availablePieces - 1) + 1]
            local position = {
                x = RandomInt(0, 7),
                y = RandomInt(4, 7)
            }
            local worldPos = self:boardToWorldPosition(position, -1)
            local unit = CreateUnitByName(
                randomPiece.unitName,
                worldPos,
                true,
                nil,
                nil,
                DOTA_TEAM_BADGUYS
            )
            if unit and not unit:IsNull() then
                self:applyChessPieceStats(unit, randomPiece)
                aiPieces[#aiPieces + 1] = {
                    pieceId = randomPiece.id,
                    unit = unit,
                    position = position,
                    team = DOTA_TEAM_BADGUYS,
                    ownerId = -1
                }
            end
            i = i + 1
        end
    end
    return aiPieces
end
function ChessBattleSystem.prototype.executeBattle(self, battleId)
    local battle = self.activeBattles:get(battleId)
    if not battle then
        return
    end
    for ____, piece in ipairs(battle.player1Pieces) do
        if piece.unit and not piece.unit:IsNull() then
            piece.unit:SetIdleAcquire(true)
            piece.unit:SetAcquisitionRange(2000)
        end
    end
    for ____, piece in ipairs(battle.player2Pieces) do
        if piece.unit and not piece.unit:IsNull() then
            piece.unit:SetIdleAcquire(true)
            piece.unit:SetAcquisitionRange(2000)
        end
    end
    self:checkBattleStatus(battleId)
end
function ChessBattleSystem.prototype.checkBattleStatus(self, battleId)
    Timers:CreateTimer(
        1,
        function()
            local battle = self.activeBattles:get(battleId)
            if not battle or battle.completed then
                return nil
            end
            local player1Alive = #__TS__ArrayFilter(
                battle.player1Pieces,
                function(____, p) return p.unit and not p.unit:IsNull() and p.unit:IsAlive() end
            )
            local player2Alive = #__TS__ArrayFilter(
                battle.player2Pieces,
                function(____, p) return p.unit and not p.unit:IsNull() and p.unit:IsAlive() end
            )
            if player1Alive == 0 or player2Alive == 0 then
                local ____temp_0
                if player1Alive > 0 then
                    ____temp_0 = battle.player1
                else
                    ____temp_0 = battle.player2
                end
                battle.winnerId = ____temp_0
                battle.completed = true
                self:onBattleComplete(battleId)
                return nil
            end
            return 1
        end
    )
end
function ChessBattleSystem.prototype.onBattleComplete(self, battleId)
    local battle = self.activeBattles:get(battleId)
    if not battle then
        return
    end
    if battle.winnerId ~= nil then
        self:restorePlayerPiecesHealth(battle.winnerId, 0.2)
        print(("[ChessBattleSystem] 胜利方 " .. tostring(battle.winnerId)) .. " 的棋子血量已恢复 20%")
    end
    self:recordSurvivorHealth(battle)
    print((("[ChessBattleSystem] Battle " .. battleId) .. " completed. Winner: ") .. tostring(battle.winnerId))
    local playerSnapshot = __TS__ArrayMap(
        __TS__ArrayFilter(
            battle.player1Pieces,
            function(____, p) return p.unit and not p.unit:IsNull() and p.unit:IsAlive() end
        ),
        function(____, p) return {pieceId = p.pieceId, position = {x = p.position.x, y = p.position.y}} end
    )
    local playerIdForTest = battle.player1
    self:cleanupBattle(battleId)
    CustomGameEventManager:Send_ServerToAllClients("battle_completed", {battleId = battleId, winnerId = battle.winnerId, player1 = battle.player1, player2 = battle.player2})
    if GameRules.AutoChessMode then
        print("[ChessBattleSystem] Calling AutoChessMode.handleBattleCompleted directly")
        GameRules.AutoChessMode:handleBattleCompleted({battleId = battleId, winnerId = battle.winnerId, player1 = battle.player1, player2 = battle.player2})
    else
        print("[ChessBattleSystem] WARNING: AutoChessMode not available!")
    end
end
function ChessBattleSystem.prototype.cleanupBattle(self, battleId)
    local battle = self.activeBattles:get(battleId)
    if not battle then
        return
    end
    local ____array_1 = __TS__SparseArrayNew(unpack(battle.player1Pieces))
    __TS__SparseArrayPush(
        ____array_1,
        unpack(battle.player2Pieces)
    )
    local allPieces = {__TS__SparseArraySpread(____array_1)}
    for ____, piece in ipairs(allPieces) do
        if piece.unit and not piece.unit:IsNull() then
            piece.unit:RemoveSelf()
        end
    end
    self.activeBattles:delete(battleId)
end
function ChessBattleSystem.prototype.boardToWorldPosition(self, position, playerId)
    local boardTotalSize = self.BOARD_SIZE * self.CELL_SIZE
    local centerOffset = boardTotalSize / 2
    local baseX = self.BOARD_OFFSET.x + position.x * self.CELL_SIZE - centerOffset
    local baseY = self.BOARD_OFFSET.y + position.y * self.CELL_SIZE - centerOffset
    local ____temp_2
    if playerId >= 0 then
        ____temp_2 = playerId * 2000
    else
        ____temp_2 = 0
    end
    local playerOffset = ____temp_2
    local finalPos = Vector(baseX + playerOffset, baseY, self.BOARD_OFFSET.z)
    print(((((((((("[ChessBattleSystem] 🎯 位置转换: 棋盘(" .. tostring(position.x)) .. ",") .. tostring(position.y)) .. ") → 世界(") .. __TS__NumberToFixed(finalPos.x, 1)) .. ",") .. __TS__NumberToFixed(finalPos.y, 1)) .. ",") .. __TS__NumberToFixed(finalPos.z, 1)) .. ")")
    return finalPos
end
function ChessBattleSystem.prototype.isValidPosition(self, position)
    return position.x >= 0 and position.x < self.BOARD_SIZE and position.y >= 0 and position.y < self.BOARD_SIZE
end
function ChessBattleSystem.prototype.isPieceAtPosition(self, playerId, position)
    local playerPieces = self.playerDeployedPieces:get(playerId)
    if not playerPieces then
        return false
    end
    return __TS__ArraySome(
        playerPieces,
        function(____, p) return p.position.x == position.x and p.position.y == position.y end
    )
end
function ChessBattleSystem.prototype.getPlayerTeam(self, playerId)
    if playerId < 0 then
        return DOTA_TEAM_BADGUYS
    end
    local ____temp_3
    if playerId < 4 then
        ____temp_3 = DOTA_TEAM_GOODGUYS
    else
        ____temp_3 = DOTA_TEAM_BADGUYS
    end
    return ____temp_3
end
function ChessBattleSystem.prototype.applyChessPieceStats(self, unit, piece)
    unit:SetMaxHealth(piece.health)
    unit:SetHealth(piece.health)
    unit:SetBaseDamageMin(piece.damage)
    unit:SetBaseDamageMax(piece.damage)
    unit:SetPhysicalArmorBaseValue(piece.armor)
end
function ChessBattleSystem.prototype.getChessPieceDefinition(self, pieceId)
    if GameRules.AutoChessMode then
        local piece = GameRules.AutoChessMode:getChessPiece(pieceId)
        if not piece then
            print(("[ChessBattleSystem] Warning: Chess piece '" .. pieceId) .. "' not found in database")
            print("[ChessBattleSystem] Available pieces: " .. __TS__ArrayJoin(
                __TS__ArrayMap(
                    GameRules.AutoChessMode:getAllChessPieces(),
                    function(____, p) return p.id end
                ),
                ", "
            ))
        end
        return piece
    end
    print("[ChessBattleSystem] Error: AutoChessMode not initialized")
    return nil
end
function ChessBattleSystem.prototype.getAvailableChessPieces(self)
    if not GameRules.AutoChessMode then
        print("[ChessBattleSystem] Error: AutoChessMode not available")
        return {}
    end
    local pieces = GameRules.AutoChessMode:getAllChessPieces()
    print("[ChessBattleSystem] Available chess pieces: " .. tostring(#pieces))
    return pieces
end
function ChessBattleSystem.prototype.getPlayerPieces(self, playerId)
    return self.playerDeployedPieces:get(playerId) or ({})
end
function ChessBattleSystem.prototype.disableAllAttacks(self)
    print("[ChessBattleSystem] ========== 禁用所有单位攻击（准备阶段） ==========")
    local disabledCount = 0
    for ____, ____value in __TS__Iterator(self.playerDeployedPieces) do
        local playerId = ____value[1]
        local pieces = ____value[2]
        for ____, piece in ipairs(pieces) do
            if piece.unit and IsValidEntity(piece.unit) and not piece.unit:IsNull() then
                if not piece.unit:HasModifier("modifier_disarmed") then
                    piece.unit:AddNewModifier(piece.unit, nil, "modifier_disarmed", {})
                    piece.unit:SetAttackCapability(0)
                    disabledCount = disabledCount + 1
                    print(((("[ChessBattleSystem] ✅ 已禁用 " .. piece.pieceId) .. " (player ") .. tostring(playerId)) .. ") 的攻击能力")
                else
                    print(((("[ChessBattleSystem] ⚠️ " .. piece.pieceId) .. " (player ") .. tostring(playerId)) .. ") 已有 modifier_disarmed，跳过")
                end
            end
        end
    end
    print(("[ChessBattleSystem] ========== 已禁用 " .. tostring(disabledCount)) .. " 个单位的攻击 ==========")
end
function ChessBattleSystem.prototype.enableAllAttacks(self)
    print("[ChessBattleSystem] ========== 启用所有单位攻击（战斗阶段） ==========")
    local enabledCount = 0
    for ____, ____value in __TS__Iterator(self.playerDeployedPieces) do
        local playerId = ____value[1]
        local pieces = ____value[2]
        for ____, piece in ipairs(pieces) do
            if piece.unit and IsValidEntity(piece.unit) and not piece.unit:IsNull() then
                if piece.unit:HasModifier("modifier_disarmed") then
                    piece.unit:RemoveModifierByName("modifier_disarmed")
                end
                local chessPiece = self:getChessPieceDefinition(piece.pieceId)
                if chessPiece then
                    local attackCapability = chessPiece.attackRange > 200 and 2 or 1
                    piece.unit:SetAttackCapability(attackCapability)
                    enabledCount = enabledCount + 1
                    print(((((("[ChessBattleSystem] ✅ 已启用 " .. piece.pieceId) .. " (player ") .. tostring(playerId)) .. ") 的攻击能力 (") .. (attackCapability == 2 and "远程" or "近战")) .. ")")
                else
                    print("[ChessBattleSystem] ⚠️ 无法找到棋子定义: " .. piece.pieceId)
                end
            end
        end
    end
    print(("[ChessBattleSystem] ========== 已启用 " .. tostring(enabledCount)) .. " 个单位的攻击 ==========")
end
function ChessBattleSystem.prototype.disableEnemyAttack(self, playerId)
    self:disableAllAttacks()
end
function ChessBattleSystem.prototype.enableEnemyAttack(self, playerId)
    self:enableAllAttacks()
end
function ChessBattleSystem.prototype.getActiveBattles(self)
    return __TS__ArrayFrom(self.activeBattles:values())
end
function ChessBattleSystem.prototype.activatePlayerPieces(self, playerId)
    print(("[ChessBattleSystem] 激活玩家 " .. tostring(playerId)) .. " 的棋子")
    local pieces = self.playerDeployedPieces:get(playerId) or ({})
    for ____, piece in ipairs(pieces) do
        if piece.unit and IsValidEntity(piece.unit) then
            self:removePreparationModifiers(piece.unit)
            piece.unit:SetMoveCapability(DOTA_UNIT_CAP_MOVE_GROUND)
            print(((("[ChessBattleSystem] 激活棋子: " .. piece.pieceId) .. " (") .. piece.unit:GetUnitName()) .. ")")
        end
    end
    print(((("[ChessBattleSystem] 玩家 " .. tostring(playerId)) .. " 的 ") .. tostring(#pieces)) .. " 个棋子已激活")
end
function ChessBattleSystem.prototype.removePreparationModifiers(self, unit)
    unit:RemoveModifierByName("modifier_silence")
    unit:RemoveModifierByName("modifier_disarmed")
    unit:RemoveModifierByName("modifier_autochess_preparation")
    print(("[ChessBattleSystem] 移除单位 " .. unit:GetUnitName()) .. " 的准备阶段修饰符")
end
function ChessBattleSystem.prototype.getWaveConfigSystem(self)
    return self.waveConfigSystem
end
function ChessBattleSystem.prototype.startNewWave(self, waveNumber)
    print("[ChessBattleSystem] 开始新波次: " .. tostring(waveNumber))
    local waveConfig = self.waveConfigSystem:startNewWave(waveNumber)
    if waveConfig then
        print("[ChessBattleSystem] 使用波次配置: " .. waveConfig.name)
    else
        print("[ChessBattleSystem] ERROR: 无法获取波次配置 for wave " .. tostring(waveNumber))
    end
end
function ChessBattleSystem.prototype.recreateHexBoard(self)
    local r = self.CELL_SIZE * 0.5
    local w = math.sqrt(3) * r
    local vert = 1.5 * r
    local cols = self.BOARD_SIZE
    local rows = self.BOARD_SIZE
    local duration = 1.2
    local colorR = 0
    local colorG = 120
    local colorB = 255
    local origin = Vector(self.BOARD_OFFSET.x - 100, self.BOARD_OFFSET.y, self.BOARD_OFFSET.z - 100)
    local colOffset = (cols - 1) * w * 0.5
    local rowOffset = (rows - 1) * vert * 0.5
    do
        local row = 0
        while row < rows do
            do
                local col = 0
                while col < cols do
                    local x = origin.x + (col * w + row % 2 * (w * 0.5)) - colOffset
                    local y = origin.y + row * vert - rowOffset
                    local center = Vector(x, y, origin.z)
                    self:drawHexAt(
                        center,
                        r,
                        duration,
                        colorR,
                        colorG,
                        colorB
                    )
                    col = col + 1
                end
            end
            row = row + 1
        end
    end
end
function ChessBattleSystem.prototype.drawHexAt(self, center, radius, duration, r, g, b)
    local corners = self:getHexCornersPointy(center, radius)
    do
        local i = 0
        while i < 6 do
            local a = corners[i + 1]
            local c = corners[(i + 1) % 6 + 1]
            DebugDrawLine(
                a,
                c,
                r,
                g,
                b,
                true,
                duration
            )
            i = i + 1
        end
    end
end
function ChessBattleSystem.prototype.getHexCornersPointy(self, center, radius)
    local pts = {}
    do
        local i = 0
        while i < 6 do
            local angle = math.pi / 180 * (60 * i - 30)
            local x = center.x + radius * math.cos(angle)
            local y = center.y + radius * math.sin(angle)
            pts[#pts + 1] = Vector(x, y, center.z)
            i = i + 1
        end
    end
    return pts
end
function ChessBattleSystem.prototype.restorePlayerPiecesHealth(self, playerId, percentage)
    local pieces = self.playerDeployedPieces:get(playerId)
    if not pieces then
        print("[ChessBattleSystem] No pieces found for player " .. tostring(playerId))
        return
    end
    local restoredCount = 0
    for ____, piece in ipairs(pieces) do
        if piece.unit and not piece.unit:IsNull() and piece.unit:IsAlive() then
            local currentHealth = piece.unit:GetHealth()
            local maxHealth = piece.unit:GetMaxHealth()
            local restoreAmount = maxHealth * percentage
            local newHealth = math.min(currentHealth + restoreAmount, maxHealth)
            piece.unit:SetHealth(newHealth)
            restoredCount = restoredCount + 1
            print((((((((("[ChessBattleSystem] 💚 " .. piece.pieceId) .. ": ") .. __TS__NumberToFixed(currentHealth, 0)) .. " + ") .. __TS__NumberToFixed(restoreAmount, 0)) .. " = ") .. __TS__NumberToFixed(newHealth, 0)) .. " / ") .. tostring(maxHealth))
        end
    end
    print(((("[ChessBattleSystem] ✅ 恢复了 " .. tostring(restoredCount)) .. " 个棋子的血量 (+") .. __TS__NumberToFixed(percentage * 100, 0)) .. "%)")
    local survivors = {}
    for ____, p in ipairs(pieces) do
        if p.unit and not p.unit:IsNull() and p.unit:IsAlive() then
            survivors[#survivors + 1] = {
                pieceId = p.pieceId,
                health = p.unit:GetHealth()
            }
        end
    end
    if #survivors > 0 then
        self.playerSurvivorHealth:set(playerId, survivors)
        print(("[ChessBattleSystem] 📝 已更新 " .. tostring(#survivors)) .. " 个幸存棋子的血量记录")
    end
end
function ChessBattleSystem.prototype.recordSurvivorHealth(self, battle)
    local function updateFor(____, playerId, pieces)
        local survivors = {}
        for ____, p in ipairs(pieces) do
            if p.unit and not p.unit:IsNull() and p.unit:IsAlive() then
                survivors[#survivors + 1] = {
                    pieceId = p.pieceId,
                    health = p.unit:GetHealth()
                }
            end
        end
        if #survivors > 0 then
            self.playerSurvivorHealth:set(playerId, survivors)
            print((("[ChessBattleSystem] Stored " .. tostring(#survivors)) .. " survivor HP entries for player ") .. tostring(playerId))
        else
            self.playerSurvivorHealth:delete(playerId)
        end
    end
    updateFor(nil, battle.player1, battle.player1Pieces)
    updateFor(nil, battle.player2, battle.player2Pieces)
end
____exports.chessBattleSystem = ____exports.ChessBattleSystem:getInstance()
return ____exports
