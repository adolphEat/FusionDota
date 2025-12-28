local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayJoin = ____lualib.__TS__ArrayJoin
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["17"] = 10,["18"] = 10,["19"] = 11,["20"] = 11,["21"] = 44,["22"] = 44,["23"] = 44,["25"] = 51,["26"] = 54,["27"] = 55,["28"] = 56,["29"] = 59,["30"] = 60,["31"] = 61,["32"] = 62,["33"] = 63,["34"] = 58,["35"] = 66,["36"] = 67,["37"] = 68,["39"] = 70,["40"] = 66,["41"] = 76,["42"] = 78,["43"] = 76,["44"] = 84,["45"] = 86,["46"] = 86,["47"] = 86,["48"] = 87,["49"] = 88,["50"] = 89,["51"] = 90,["52"] = 86,["53"] = 86,["54"] = 94,["55"] = 94,["56"] = 94,["57"] = 95,["58"] = 96,["59"] = 97,["60"] = 94,["61"] = 94,["62"] = 84,["63"] = 104,["64"] = 105,["65"] = 106,["68"] = 111,["69"] = 114,["70"] = 117,["71"] = 118,["72"] = 119,["73"] = 120,["74"] = 123,["75"] = 124,["76"] = 125,["77"] = 126,["78"] = 128,["79"] = 104,["80"] = 134,["81"] = 135,["82"] = 136,["85"] = 141,["86"] = 144,["87"] = 146,["88"] = 134,["89"] = 152,["90"] = 153,["91"] = 154,["94"] = 159,["95"] = 160,["96"] = 162,["97"] = 152,["98"] = 168,["99"] = 169,["100"] = 170,["103"] = 175,["104"] = 178,["105"] = 181,["106"] = 184,["107"] = 187,["108"] = 188,["109"] = 190,["110"] = 168,["111"] = 196,["112"] = 198,["113"] = 201,["114"] = 202,["115"] = 203,["116"] = 204,["117"] = 207,["118"] = 208,["119"] = 210,["120"] = 211,["121"] = 196,["122"] = 217,["123"] = 219,["124"] = 220,["125"] = 221,["127"] = 225,["128"] = 226,["129"] = 227,["131"] = 231,["132"] = 232,["133"] = 233,["134"] = 234,["136"] = 238,["137"] = 239,["138"] = 242,["139"] = 242,["140"] = 242,["141"] = 242,["142"] = 242,["143"] = 242,["144"] = 242,["145"] = 242,["146"] = 252,["147"] = 253,["148"] = 254,["150"] = 257,["151"] = 258,["152"] = 259,["154"] = 263,["155"] = 268,["156"] = 270,["158"] = 273,["160"] = 277,["161"] = 278,["163"] = 286,["164"] = 289,["165"] = 290,["166"] = 291,["167"] = 291,["168"] = 291,["169"] = 291,["170"] = 292,["171"] = 293,["172"] = 294,["173"] = 295,["174"] = 295,["175"] = 295,["176"] = 295,["177"] = 296,["179"] = 299,["180"] = 300,["182"] = 302,["185"] = 307,["186"] = 307,["187"] = 307,["188"] = 307,["189"] = 307,["190"] = 307,["191"] = 307,["192"] = 315,["193"] = 316,["194"] = 317,["195"] = 319,["196"] = 320,["197"] = 217,["198"] = 326,["199"] = 327,["200"] = 328,["201"] = 329,["203"] = 332,["204"] = 332,["205"] = 332,["206"] = 332,["207"] = 336,["208"] = 337,["210"] = 340,["211"] = 343,["212"] = 344,["214"] = 348,["215"] = 349,["216"] = 351,["217"] = 352,["218"] = 326,["219"] = 358,["220"] = 359,["221"] = 360,["224"] = 364,["225"] = 365,["226"] = 366,["229"] = 370,["230"] = 371,["231"] = 358,["232"] = 377,["233"] = 378,["234"] = 381,["235"] = 382,["236"] = 385,["237"] = 385,["238"] = 385,["239"] = 385,["240"] = 385,["241"] = 385,["242"] = 385,["243"] = 393,["244"] = 396,["245"] = 398,["246"] = 399,["247"] = 377,["248"] = 406,["249"] = 406,["250"] = 406,["252"] = 407,["253"] = 410,["254"] = 414,["255"] = 416,["256"] = 419,["257"] = 420,["258"] = 421,["259"] = 422,["261"] = 426,["262"] = 426,["263"] = 426,["264"] = 426,["265"] = 426,["266"] = 426,["267"] = 426,["268"] = 434,["269"] = 437,["270"] = 439,["271"] = 440,["272"] = 406,["273"] = 446,["274"] = 447,["275"] = 448,["276"] = 451,["278"] = 453,["279"] = 453,["280"] = 455,["281"] = 458,["282"] = 458,["283"] = 458,["284"] = 458,["285"] = 464,["286"] = 465,["287"] = 465,["288"] = 465,["289"] = 465,["290"] = 465,["291"] = 465,["292"] = 465,["293"] = 465,["294"] = 474,["295"] = 475,["296"] = 478,["297"] = 480,["298"] = 480,["299"] = 480,["300"] = 480,["301"] = 480,["302"] = 480,["303"] = 480,["305"] = 453,["308"] = 490,["309"] = 446,["310"] = 496,["311"] = 497,["312"] = 498,["315"] = 503,["316"] = 504,["317"] = 506,["318"] = 507,["321"] = 511,["322"] = 512,["323"] = 513,["324"] = 514,["327"] = 519,["328"] = 496,["329"] = 525,["330"] = 526,["331"] = 526,["332"] = 526,["333"] = 527,["334"] = 528,["335"] = 529,["337"] = 533,["338"] = 533,["339"] = 533,["340"] = 533,["341"] = 537,["342"] = 537,["343"] = 537,["344"] = 537,["345"] = 542,["346"] = 543,["347"] = 543,["348"] = 543,["350"] = 543,["352"] = 543,["353"] = 544,["354"] = 545,["355"] = 546,["357"] = 549,["358"] = 526,["359"] = 526,["360"] = 525,["361"] = 556,["362"] = 557,["363"] = 558,["366"] = 563,["367"] = 564,["368"] = 565,["370"] = 569,["371"] = 571,["372"] = 574,["373"] = 574,["374"] = 574,["375"] = 574,["376"] = 574,["377"] = 574,["378"] = 574,["379"] = 577,["380"] = 580,["381"] = 583,["382"] = 592,["383"] = 593,["384"] = 594,["386"] = 601,["388"] = 556,["389"] = 608,["390"] = 609,["391"] = 610,["394"] = 616,["395"] = 617,["396"] = 618,["399"] = 622,["400"] = 608,["401"] = 628,["402"] = 630,["403"] = 633,["404"] = 635,["405"] = 636,["406"] = 639,["407"] = 639,["408"] = 639,["410"] = 639,["412"] = 639,["413"] = 641,["414"] = 643,["415"] = 645,["416"] = 628,["417"] = 651,["418"] = 652,["419"] = 651,["420"] = 659,["421"] = 660,["422"] = 661,["423"] = 662,["425"] = 665,["426"] = 665,["427"] = 665,["428"] = 665,["429"] = 659,["430"] = 673,["431"] = 676,["432"] = 677,["434"] = 679,["435"] = 679,["440"] = 679,["441"] = 673,["442"] = 685,["443"] = 686,["444"] = 687,["445"] = 688,["446"] = 689,["447"] = 690,["448"] = 685,["449"] = 697,["450"] = 699,["451"] = 700,["452"] = 701,["453"] = 702,["454"] = 703,["455"] = 703,["456"] = 703,["457"] = 703,["458"] = 703,["459"] = 703,["460"] = 703,["462"] = 705,["464"] = 707,["465"] = 708,["466"] = 697,["467"] = 714,["468"] = 715,["469"] = 716,["470"] = 717,["472"] = 720,["473"] = 721,["474"] = 722,["475"] = 714,["476"] = 728,["477"] = 729,["478"] = 728,["479"] = 742,["480"] = 743,["481"] = 745,["482"] = 748,["483"] = 748,["484"] = 748,["485"] = 749,["486"] = 750,["487"] = 752,["488"] = 755,["489"] = 763,["490"] = 765,["491"] = 766,["493"] = 768,["498"] = 774,["499"] = 742,["500"] = 783,["501"] = 784,["502"] = 786,["503"] = 789,["504"] = 789,["505"] = 789,["506"] = 790,["507"] = 791,["508"] = 793,["509"] = 794,["511"] = 798,["512"] = 799,["513"] = 801,["514"] = 802,["515"] = 804,["516"] = 805,["518"] = 807,["523"] = 813,["524"] = 783,["525"] = 819,["526"] = 820,["527"] = 819,["528"] = 826,["529"] = 827,["530"] = 826,["531"] = 833,["532"] = 834,["533"] = 833,["534"] = 840,["535"] = 841,["536"] = 843,["537"] = 845,["538"] = 846,["539"] = 851,["540"] = 854,["541"] = 857,["544"] = 861,["545"] = 840,["546"] = 867,["547"] = 869,["548"] = 872,["549"] = 875,["550"] = 877,["551"] = 867,["552"] = 883,["553"] = 884,["554"] = 883,["555"] = 890,["556"] = 891,["557"] = 893,["558"] = 894,["559"] = 895,["561"] = 898,["563"] = 890,["564"] = 905,["565"] = 908,["566"] = 909,["567"] = 910,["568"] = 911,["569"] = 912,["570"] = 914,["571"] = 915,["572"] = 915,["573"] = 915,["574"] = 918,["575"] = 919,["576"] = 920,["578"] = 922,["579"] = 922,["581"] = 923,["582"] = 923,["583"] = 925,["584"] = 926,["585"] = 927,["586"] = 929,["587"] = 929,["588"] = 929,["589"] = 929,["590"] = 929,["591"] = 929,["592"] = 929,["593"] = 929,["594"] = 923,["597"] = 922,["600"] = 905,["601"] = 935,["602"] = 936,["604"] = 937,["605"] = 937,["606"] = 938,["607"] = 939,["608"] = 940,["609"] = 940,["610"] = 940,["611"] = 940,["612"] = 940,["613"] = 940,["614"] = 940,["615"] = 940,["616"] = 940,["617"] = 937,["620"] = 935,["621"] = 944,["622"] = 945,["624"] = 947,["625"] = 947,["626"] = 948,["627"] = 949,["628"] = 950,["629"] = 951,["630"] = 947,["633"] = 953,["634"] = 944,["635"] = 961,["636"] = 962,["637"] = 963,["638"] = 964,["641"] = 968,["642"] = 969,["643"] = 970,["644"] = 971,["645"] = 972,["646"] = 973,["647"] = 974,["648"] = 976,["649"] = 977,["650"] = 978,["653"] = 982,["654"] = 985,["655"] = 986,["656"] = 987,["657"] = 988,["658"] = 988,["659"] = 988,["660"] = 988,["663"] = 991,["664"] = 992,["665"] = 993,["667"] = 961,["668"] = 998,["669"] = 999,["670"] = 1000,["671"] = 1001,["672"] = 1002,["673"] = 1003,["674"] = 1003,["675"] = 1003,["676"] = 1003,["679"] = 1006,["680"] = 1007,["681"] = 1008,["683"] = 1010,["685"] = 999,["686"] = 1014,["687"] = 1015,["688"] = 998,["689"] = 1021,["690"] = 1022,["691"] = 1023,["692"] = 1024,["694"] = 1026,["695"] = 1027,["697"] = 1021,["698"] = 1033});
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
        false,
        nil,
        nil,
        team
    )
    if unit and not unit:IsNull() then
        local groundPos = GetGroundPosition(worldPos, unit)
        unit:SetAbsOrigin(groundPos)
    end
    if not unit or unit:IsNull() then
        print("[ChessBattleSystem] Failed to create unit: " .. chessPiece.unitName)
        return false
    end
    self:applyChessPieceStats(unit, chessPiece)
    if playerId >= 0 then
        unit:SetForwardVector(Vector(0, 1, 0))
    else
        unit:SetForwardVector(Vector(0, -1, 0))
    end
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
                unit:SetForwardVector(Vector(0, -1, 0))
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
    for ____, piece in ipairs(battle.player2Pieces) do
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
    local ____temp_1
    if playerId >= 0 then
        ____temp_1 = playerId * 2000
    else
        ____temp_1 = 0
    end
    local playerOffset = ____temp_1
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
    local ____temp_2
    if playerId < 4 then
        ____temp_2 = DOTA_TEAM_GOODGUYS
    else
        ____temp_2 = DOTA_TEAM_BADGUYS
    end
    return ____temp_2
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
            print(((((((("[ChessBattleSystem] 激活棋子: " .. piece.pieceId) .. " (") .. piece.unit:GetUnitName()) .. ") 在位置 (") .. tostring(piece.position.x)) .. ", ") .. tostring(piece.position.y)) .. ")")
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
function ChessBattleSystem.prototype.setPlayerSurvivorHealth(self, playerId, survivors)
    if #survivors > 0 then
        self.playerSurvivorHealth:set(playerId, survivors)
        print(((("[ChessBattleSystem] ✅ 已设置玩家 " .. tostring(playerId)) .. " 的 ") .. tostring(#survivors)) .. " 个存活棋子血量记录")
    else
        self.playerSurvivorHealth:delete(playerId)
        print(("[ChessBattleSystem] 玩家 " .. tostring(playerId)) .. " 没有存活棋子，清除血量记录")
    end
end
____exports.chessBattleSystem = ____exports.ChessBattleSystem:getInstance()
return ____exports
