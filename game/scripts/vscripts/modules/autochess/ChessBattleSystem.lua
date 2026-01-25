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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["17"] = 10,["18"] = 10,["19"] = 11,["20"] = 11,["21"] = 44,["22"] = 44,["23"] = 44,["25"] = 51,["26"] = 54,["27"] = 55,["28"] = 56,["29"] = 59,["30"] = 60,["31"] = 61,["32"] = 62,["33"] = 63,["34"] = 58,["35"] = 66,["36"] = 67,["37"] = 68,["39"] = 70,["40"] = 66,["41"] = 76,["42"] = 78,["43"] = 76,["44"] = 84,["45"] = 86,["46"] = 86,["47"] = 86,["48"] = 87,["49"] = 88,["50"] = 89,["51"] = 90,["52"] = 86,["53"] = 86,["54"] = 94,["55"] = 94,["56"] = 94,["57"] = 95,["58"] = 96,["59"] = 97,["60"] = 94,["61"] = 94,["62"] = 84,["63"] = 104,["64"] = 105,["65"] = 106,["68"] = 111,["69"] = 114,["70"] = 117,["71"] = 118,["72"] = 119,["73"] = 120,["74"] = 123,["75"] = 124,["76"] = 125,["77"] = 126,["78"] = 128,["79"] = 104,["80"] = 134,["81"] = 135,["82"] = 136,["85"] = 141,["86"] = 144,["87"] = 146,["88"] = 134,["89"] = 152,["90"] = 153,["91"] = 154,["94"] = 159,["95"] = 160,["96"] = 162,["97"] = 152,["98"] = 168,["99"] = 169,["100"] = 170,["103"] = 175,["104"] = 178,["105"] = 181,["106"] = 184,["107"] = 187,["108"] = 188,["109"] = 190,["110"] = 168,["111"] = 196,["112"] = 198,["113"] = 201,["114"] = 202,["115"] = 203,["116"] = 204,["117"] = 207,["118"] = 208,["119"] = 210,["120"] = 211,["121"] = 196,["122"] = 218,["123"] = 220,["124"] = 221,["125"] = 222,["127"] = 226,["128"] = 227,["129"] = 228,["131"] = 232,["132"] = 233,["133"] = 234,["134"] = 235,["136"] = 239,["137"] = 240,["138"] = 243,["139"] = 243,["140"] = 243,["141"] = 243,["142"] = 243,["143"] = 243,["144"] = 243,["145"] = 243,["146"] = 253,["147"] = 254,["148"] = 255,["150"] = 258,["151"] = 259,["152"] = 260,["154"] = 264,["155"] = 269,["156"] = 271,["158"] = 274,["160"] = 278,["161"] = 279,["163"] = 287,["164"] = 290,["165"] = 291,["166"] = 292,["167"] = 292,["168"] = 292,["169"] = 292,["170"] = 293,["171"] = 294,["172"] = 295,["173"] = 296,["174"] = 296,["175"] = 296,["176"] = 296,["177"] = 297,["179"] = 300,["180"] = 301,["182"] = 303,["185"] = 308,["186"] = 308,["187"] = 308,["188"] = 308,["189"] = 308,["190"] = 308,["191"] = 308,["192"] = 316,["193"] = 317,["194"] = 318,["195"] = 320,["196"] = 321,["197"] = 218,["198"] = 327,["199"] = 328,["200"] = 329,["201"] = 330,["203"] = 333,["204"] = 333,["205"] = 333,["206"] = 333,["207"] = 337,["208"] = 338,["210"] = 341,["211"] = 344,["212"] = 345,["214"] = 349,["215"] = 350,["216"] = 352,["217"] = 353,["218"] = 327,["219"] = 359,["220"] = 360,["221"] = 361,["224"] = 365,["225"] = 366,["226"] = 367,["229"] = 371,["230"] = 372,["231"] = 359,["232"] = 378,["233"] = 379,["234"] = 382,["235"] = 383,["236"] = 386,["237"] = 386,["238"] = 386,["239"] = 386,["240"] = 386,["241"] = 386,["242"] = 386,["243"] = 394,["244"] = 397,["245"] = 399,["246"] = 400,["247"] = 378,["248"] = 407,["249"] = 407,["250"] = 407,["252"] = 408,["253"] = 411,["254"] = 415,["255"] = 417,["256"] = 420,["257"] = 421,["258"] = 422,["259"] = 423,["261"] = 427,["262"] = 427,["263"] = 427,["264"] = 427,["265"] = 427,["266"] = 427,["267"] = 427,["268"] = 435,["269"] = 438,["270"] = 440,["271"] = 441,["272"] = 407,["273"] = 447,["274"] = 448,["275"] = 449,["276"] = 452,["278"] = 454,["279"] = 454,["280"] = 456,["281"] = 459,["282"] = 459,["283"] = 459,["284"] = 459,["285"] = 465,["286"] = 466,["287"] = 466,["288"] = 466,["289"] = 466,["290"] = 466,["291"] = 466,["292"] = 466,["293"] = 466,["294"] = 475,["295"] = 476,["296"] = 479,["297"] = 481,["298"] = 481,["299"] = 481,["300"] = 481,["301"] = 481,["302"] = 481,["303"] = 481,["305"] = 454,["308"] = 491,["309"] = 447,["310"] = 497,["311"] = 498,["312"] = 499,["315"] = 504,["316"] = 505,["317"] = 507,["318"] = 508,["321"] = 512,["322"] = 513,["323"] = 514,["324"] = 515,["327"] = 520,["328"] = 497,["329"] = 526,["330"] = 527,["331"] = 527,["332"] = 527,["333"] = 528,["334"] = 529,["335"] = 530,["337"] = 534,["338"] = 534,["339"] = 534,["340"] = 534,["341"] = 538,["342"] = 538,["343"] = 538,["344"] = 538,["345"] = 543,["346"] = 544,["347"] = 544,["348"] = 544,["350"] = 544,["352"] = 544,["353"] = 545,["354"] = 546,["355"] = 547,["357"] = 550,["358"] = 527,["359"] = 527,["360"] = 526,["361"] = 557,["362"] = 558,["363"] = 559,["366"] = 564,["367"] = 565,["368"] = 566,["370"] = 570,["371"] = 572,["372"] = 575,["373"] = 575,["374"] = 575,["375"] = 575,["376"] = 575,["377"] = 575,["378"] = 575,["379"] = 578,["380"] = 581,["381"] = 584,["382"] = 593,["383"] = 594,["384"] = 595,["386"] = 602,["388"] = 557,["389"] = 609,["390"] = 610,["391"] = 611,["394"] = 617,["395"] = 618,["396"] = 619,["399"] = 623,["400"] = 609,["401"] = 629,["402"] = 631,["403"] = 634,["404"] = 636,["405"] = 637,["406"] = 640,["407"] = 640,["408"] = 640,["410"] = 640,["412"] = 640,["413"] = 642,["414"] = 644,["415"] = 646,["416"] = 629,["417"] = 652,["418"] = 653,["419"] = 652,["420"] = 660,["421"] = 661,["422"] = 662,["423"] = 663,["425"] = 666,["426"] = 666,["427"] = 666,["428"] = 666,["429"] = 660,["430"] = 674,["431"] = 677,["432"] = 678,["434"] = 680,["435"] = 680,["440"] = 680,["441"] = 674,["442"] = 686,["443"] = 687,["444"] = 688,["445"] = 689,["446"] = 690,["447"] = 691,["448"] = 686,["449"] = 698,["450"] = 700,["451"] = 701,["452"] = 702,["453"] = 703,["454"] = 704,["455"] = 704,["456"] = 704,["457"] = 704,["458"] = 704,["459"] = 704,["460"] = 704,["462"] = 706,["464"] = 708,["465"] = 709,["466"] = 698,["467"] = 715,["468"] = 716,["469"] = 717,["470"] = 718,["472"] = 721,["473"] = 722,["474"] = 723,["475"] = 715,["476"] = 729,["477"] = 730,["478"] = 729,["479"] = 743,["480"] = 744,["481"] = 746,["482"] = 749,["483"] = 749,["484"] = 749,["485"] = 750,["486"] = 751,["487"] = 753,["488"] = 756,["489"] = 764,["490"] = 766,["491"] = 767,["493"] = 769,["498"] = 775,["499"] = 743,["500"] = 784,["501"] = 785,["502"] = 787,["503"] = 790,["504"] = 790,["505"] = 790,["506"] = 791,["507"] = 792,["508"] = 794,["509"] = 795,["511"] = 799,["512"] = 800,["513"] = 802,["514"] = 803,["515"] = 805,["516"] = 806,["518"] = 808,["523"] = 814,["524"] = 784,["525"] = 820,["526"] = 821,["527"] = 820,["528"] = 827,["529"] = 828,["530"] = 827,["531"] = 834,["532"] = 835,["533"] = 834,["534"] = 841,["535"] = 842,["536"] = 844,["537"] = 846,["538"] = 847,["539"] = 852,["540"] = 855,["541"] = 858,["544"] = 862,["545"] = 841,["546"] = 868,["547"] = 870,["548"] = 873,["549"] = 876,["550"] = 878,["551"] = 868,["552"] = 884,["553"] = 885,["554"] = 884,["555"] = 891,["556"] = 892,["557"] = 894,["558"] = 895,["559"] = 896,["561"] = 899,["563"] = 891,["564"] = 906,["565"] = 909,["566"] = 910,["567"] = 911,["568"] = 912,["569"] = 913,["570"] = 915,["571"] = 916,["572"] = 916,["573"] = 916,["574"] = 919,["575"] = 920,["576"] = 921,["578"] = 923,["579"] = 923,["581"] = 924,["582"] = 924,["583"] = 926,["584"] = 927,["585"] = 928,["586"] = 930,["587"] = 930,["588"] = 930,["589"] = 930,["590"] = 930,["591"] = 930,["592"] = 930,["593"] = 930,["594"] = 924,["597"] = 923,["600"] = 933,["601"] = 906,["602"] = 936,["603"] = 937,["605"] = 938,["606"] = 938,["607"] = 939,["608"] = 940,["609"] = 941,["610"] = 941,["611"] = 941,["612"] = 941,["613"] = 941,["614"] = 941,["615"] = 941,["616"] = 941,["617"] = 941,["618"] = 938,["621"] = 936,["622"] = 945,["623"] = 946,["625"] = 948,["626"] = 948,["627"] = 949,["628"] = 950,["629"] = 951,["630"] = 952,["631"] = 948,["634"] = 954,["635"] = 945,["636"] = 962,["637"] = 963,["638"] = 964,["639"] = 965,["642"] = 969,["643"] = 970,["644"] = 971,["645"] = 972,["646"] = 973,["647"] = 974,["648"] = 975,["649"] = 977,["650"] = 978,["651"] = 979,["654"] = 983,["655"] = 986,["656"] = 987,["657"] = 988,["658"] = 989,["659"] = 989,["660"] = 989,["661"] = 989,["664"] = 992,["665"] = 993,["666"] = 994,["668"] = 962,["669"] = 999,["670"] = 1000,["671"] = 1001,["672"] = 1002,["673"] = 1003,["674"] = 1004,["675"] = 1004,["676"] = 1004,["677"] = 1004,["680"] = 1007,["681"] = 1008,["682"] = 1009,["684"] = 1011,["686"] = 1000,["687"] = 1015,["688"] = 1016,["689"] = 999,["690"] = 1022,["691"] = 1023,["692"] = 1024,["693"] = 1025,["695"] = 1027,["696"] = 1028,["698"] = 1022,["699"] = 1034});
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
        return nil
    end
    if self:isPieceAtPosition(playerId, position) then
        print("[ChessBattleSystem] Position already occupied")
        return nil
    end
    local chessPiece = self:getChessPieceDefinition(pieceId)
    if not chessPiece then
        print("[ChessBattleSystem] Chess piece not found: " .. pieceId)
        return nil
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
        return nil
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
    return deployed
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
    print(("[ChessBattleSystem] ✨ Recreated " .. tostring(rows * cols)) .. " hex cells (pointy-top blue grid)")
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
