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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["20"] = 10,["21"] = 10,["22"] = 11,["23"] = 11,["24"] = 44,["25"] = 44,["26"] = 44,["28"] = 51,["29"] = 54,["30"] = 55,["31"] = 56,["32"] = 59,["33"] = 60,["34"] = 61,["35"] = 62,["36"] = 63,["37"] = 58,["38"] = 66,["39"] = 67,["40"] = 68,["42"] = 70,["43"] = 66,["44"] = 76,["45"] = 78,["46"] = 76,["47"] = 84,["48"] = 86,["49"] = 86,["50"] = 86,["51"] = 87,["52"] = 88,["53"] = 89,["54"] = 90,["55"] = 86,["56"] = 86,["57"] = 94,["58"] = 94,["59"] = 94,["60"] = 95,["61"] = 96,["62"] = 97,["63"] = 94,["64"] = 94,["65"] = 84,["66"] = 104,["67"] = 105,["68"] = 106,["71"] = 111,["72"] = 114,["73"] = 117,["74"] = 118,["75"] = 119,["76"] = 120,["77"] = 123,["78"] = 124,["79"] = 125,["80"] = 126,["81"] = 128,["82"] = 104,["83"] = 134,["84"] = 135,["85"] = 136,["88"] = 141,["89"] = 144,["90"] = 146,["91"] = 134,["92"] = 152,["93"] = 153,["94"] = 154,["97"] = 159,["98"] = 160,["99"] = 162,["100"] = 152,["101"] = 168,["102"] = 169,["103"] = 170,["106"] = 175,["107"] = 178,["108"] = 181,["109"] = 184,["110"] = 187,["111"] = 188,["112"] = 190,["113"] = 168,["114"] = 196,["115"] = 198,["116"] = 201,["117"] = 202,["118"] = 203,["119"] = 204,["120"] = 207,["121"] = 208,["122"] = 210,["123"] = 211,["124"] = 196,["125"] = 217,["126"] = 219,["127"] = 220,["128"] = 221,["130"] = 225,["131"] = 226,["132"] = 227,["134"] = 231,["135"] = 232,["136"] = 233,["137"] = 234,["139"] = 238,["140"] = 239,["141"] = 241,["142"] = 241,["143"] = 241,["144"] = 241,["145"] = 241,["146"] = 241,["147"] = 241,["148"] = 241,["149"] = 250,["150"] = 251,["151"] = 252,["153"] = 256,["154"] = 259,["155"] = 260,["156"] = 261,["157"] = 261,["158"] = 261,["159"] = 261,["160"] = 262,["161"] = 263,["162"] = 264,["163"] = 265,["164"] = 265,["165"] = 265,["166"] = 265,["167"] = 266,["169"] = 269,["170"] = 270,["172"] = 272,["175"] = 277,["176"] = 277,["177"] = 277,["178"] = 277,["179"] = 277,["180"] = 277,["181"] = 277,["182"] = 285,["183"] = 286,["184"] = 287,["185"] = 289,["186"] = 290,["187"] = 217,["188"] = 296,["189"] = 297,["190"] = 298,["191"] = 299,["193"] = 302,["194"] = 302,["195"] = 302,["196"] = 302,["197"] = 306,["198"] = 307,["200"] = 310,["201"] = 313,["202"] = 314,["204"] = 318,["205"] = 319,["206"] = 321,["207"] = 322,["208"] = 296,["209"] = 328,["210"] = 329,["211"] = 330,["214"] = 334,["215"] = 335,["216"] = 336,["219"] = 340,["220"] = 341,["221"] = 328,["222"] = 347,["223"] = 348,["224"] = 351,["225"] = 352,["226"] = 355,["227"] = 355,["228"] = 355,["229"] = 355,["230"] = 355,["231"] = 355,["232"] = 355,["233"] = 363,["234"] = 366,["235"] = 368,["236"] = 369,["237"] = 347,["238"] = 376,["239"] = 376,["240"] = 376,["242"] = 377,["243"] = 380,["244"] = 384,["245"] = 386,["246"] = 389,["247"] = 390,["248"] = 391,["249"] = 392,["251"] = 396,["252"] = 396,["253"] = 396,["254"] = 396,["255"] = 396,["256"] = 396,["257"] = 396,["258"] = 404,["259"] = 407,["260"] = 409,["261"] = 410,["262"] = 376,["263"] = 416,["264"] = 417,["265"] = 418,["266"] = 421,["268"] = 423,["269"] = 423,["270"] = 425,["271"] = 428,["272"] = 428,["273"] = 428,["274"] = 428,["275"] = 434,["276"] = 435,["277"] = 435,["278"] = 435,["279"] = 435,["280"] = 435,["281"] = 435,["282"] = 435,["283"] = 435,["284"] = 444,["285"] = 445,["286"] = 447,["287"] = 447,["288"] = 447,["289"] = 447,["290"] = 447,["291"] = 447,["292"] = 447,["294"] = 423,["297"] = 457,["298"] = 416,["299"] = 463,["300"] = 464,["301"] = 465,["304"] = 470,["305"] = 471,["306"] = 473,["307"] = 474,["310"] = 478,["311"] = 479,["312"] = 480,["313"] = 481,["316"] = 486,["317"] = 463,["318"] = 492,["319"] = 493,["320"] = 493,["321"] = 493,["322"] = 494,["323"] = 495,["324"] = 496,["326"] = 500,["327"] = 500,["328"] = 500,["329"] = 500,["330"] = 504,["331"] = 504,["332"] = 504,["333"] = 504,["334"] = 509,["335"] = 510,["336"] = 510,["337"] = 510,["339"] = 510,["341"] = 510,["342"] = 511,["343"] = 512,["344"] = 513,["346"] = 516,["347"] = 493,["348"] = 493,["349"] = 492,["350"] = 523,["351"] = 524,["352"] = 525,["355"] = 530,["356"] = 531,["357"] = 532,["359"] = 536,["360"] = 538,["361"] = 541,["362"] = 541,["363"] = 541,["364"] = 541,["365"] = 541,["366"] = 541,["367"] = 541,["368"] = 544,["369"] = 547,["370"] = 550,["371"] = 559,["372"] = 560,["373"] = 561,["375"] = 568,["377"] = 523,["378"] = 575,["379"] = 576,["380"] = 577,["383"] = 582,["386"] = 582,["388"] = 582,["389"] = 583,["390"] = 584,["391"] = 585,["394"] = 589,["395"] = 575,["396"] = 595,["397"] = 597,["398"] = 600,["399"] = 602,["400"] = 603,["401"] = 606,["402"] = 606,["403"] = 606,["405"] = 606,["407"] = 606,["408"] = 608,["409"] = 610,["410"] = 612,["411"] = 595,["412"] = 618,["413"] = 619,["414"] = 618,["415"] = 626,["416"] = 627,["417"] = 628,["418"] = 629,["420"] = 632,["421"] = 632,["422"] = 632,["423"] = 632,["424"] = 626,["425"] = 640,["426"] = 643,["427"] = 644,["429"] = 646,["430"] = 646,["435"] = 646,["436"] = 640,["437"] = 652,["438"] = 653,["439"] = 654,["440"] = 655,["441"] = 656,["442"] = 657,["443"] = 652,["444"] = 664,["445"] = 666,["446"] = 667,["447"] = 668,["448"] = 669,["449"] = 670,["450"] = 670,["451"] = 670,["452"] = 670,["453"] = 670,["454"] = 670,["455"] = 670,["457"] = 672,["459"] = 674,["460"] = 675,["461"] = 664,["462"] = 681,["463"] = 682,["464"] = 683,["465"] = 684,["467"] = 687,["468"] = 688,["469"] = 689,["470"] = 681,["471"] = 695,["472"] = 696,["473"] = 695,["474"] = 709,["475"] = 710,["476"] = 712,["477"] = 715,["478"] = 715,["479"] = 715,["480"] = 716,["481"] = 717,["482"] = 719,["483"] = 722,["484"] = 730,["485"] = 732,["486"] = 733,["488"] = 735,["493"] = 741,["494"] = 709,["495"] = 750,["496"] = 751,["497"] = 753,["498"] = 756,["499"] = 756,["500"] = 756,["501"] = 757,["502"] = 758,["503"] = 760,["504"] = 761,["506"] = 765,["507"] = 766,["508"] = 768,["509"] = 769,["510"] = 771,["511"] = 772,["513"] = 774,["518"] = 780,["519"] = 750,["520"] = 786,["521"] = 787,["522"] = 786,["523"] = 793,["524"] = 794,["525"] = 793,["526"] = 800,["527"] = 801,["528"] = 800,["529"] = 807,["530"] = 808,["531"] = 810,["532"] = 812,["533"] = 813,["534"] = 815,["535"] = 818,["536"] = 821,["539"] = 825,["540"] = 807,["541"] = 831,["542"] = 833,["543"] = 836,["544"] = 839,["545"] = 841,["546"] = 831,["547"] = 847,["548"] = 848,["549"] = 847,["550"] = 854,["551"] = 855,["552"] = 857,["553"] = 858,["554"] = 859,["556"] = 862,["558"] = 854,["559"] = 869,["560"] = 872,["561"] = 873,["562"] = 874,["563"] = 875,["564"] = 876,["565"] = 878,["566"] = 879,["567"] = 879,["568"] = 879,["569"] = 882,["570"] = 883,["571"] = 884,["573"] = 886,["574"] = 886,["576"] = 887,["577"] = 887,["578"] = 889,["579"] = 890,["580"] = 891,["581"] = 893,["582"] = 893,["583"] = 893,["584"] = 893,["585"] = 893,["586"] = 893,["587"] = 893,["588"] = 893,["589"] = 887,["592"] = 886,["595"] = 869,["596"] = 899,["597"] = 900,["599"] = 901,["600"] = 901,["601"] = 902,["602"] = 903,["603"] = 904,["604"] = 904,["605"] = 904,["606"] = 904,["607"] = 904,["608"] = 904,["609"] = 904,["610"] = 904,["611"] = 904,["612"] = 901,["615"] = 899,["616"] = 908,["617"] = 909,["619"] = 911,["620"] = 911,["621"] = 912,["622"] = 913,["623"] = 914,["624"] = 915,["625"] = 911,["628"] = 917,["629"] = 908,["630"] = 925,["631"] = 926,["632"] = 927,["633"] = 928,["636"] = 932,["637"] = 933,["638"] = 934,["639"] = 935,["640"] = 936,["641"] = 937,["642"] = 938,["643"] = 940,["644"] = 941,["645"] = 942,["648"] = 946,["649"] = 949,["650"] = 950,["651"] = 951,["652"] = 952,["653"] = 952,["654"] = 952,["655"] = 952,["658"] = 955,["659"] = 956,["660"] = 957,["662"] = 925,["663"] = 962,["664"] = 963,["665"] = 964,["666"] = 965,["667"] = 966,["668"] = 967,["669"] = 967,["670"] = 967,["671"] = 967,["674"] = 970,["675"] = 971,["676"] = 972,["678"] = 974,["680"] = 963,["681"] = 978,["682"] = 979,["683"] = 962,["684"] = 984});
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
