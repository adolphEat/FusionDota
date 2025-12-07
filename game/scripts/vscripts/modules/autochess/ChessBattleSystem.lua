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
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["19"] = 10,["20"] = 10,["21"] = 11,["22"] = 11,["23"] = 44,["24"] = 44,["25"] = 44,["27"] = 51,["28"] = 54,["29"] = 55,["30"] = 56,["31"] = 59,["32"] = 60,["33"] = 61,["34"] = 62,["35"] = 63,["36"] = 58,["37"] = 66,["38"] = 67,["39"] = 68,["41"] = 70,["42"] = 66,["43"] = 76,["44"] = 78,["45"] = 76,["46"] = 84,["47"] = 86,["48"] = 86,["49"] = 86,["50"] = 87,["51"] = 88,["52"] = 89,["53"] = 90,["54"] = 86,["55"] = 86,["56"] = 94,["57"] = 94,["58"] = 94,["59"] = 95,["60"] = 96,["61"] = 97,["62"] = 94,["63"] = 94,["64"] = 84,["65"] = 104,["66"] = 105,["67"] = 106,["70"] = 111,["71"] = 114,["72"] = 117,["73"] = 118,["74"] = 119,["75"] = 120,["76"] = 123,["77"] = 124,["78"] = 125,["79"] = 126,["80"] = 128,["81"] = 104,["82"] = 134,["83"] = 135,["84"] = 136,["87"] = 141,["88"] = 144,["89"] = 146,["90"] = 134,["91"] = 152,["92"] = 153,["93"] = 154,["96"] = 159,["97"] = 160,["98"] = 162,["99"] = 152,["100"] = 168,["101"] = 169,["102"] = 170,["105"] = 175,["106"] = 178,["107"] = 181,["108"] = 184,["109"] = 187,["110"] = 188,["111"] = 190,["112"] = 168,["113"] = 196,["114"] = 198,["115"] = 201,["116"] = 202,["117"] = 203,["118"] = 204,["119"] = 207,["120"] = 208,["121"] = 210,["122"] = 211,["123"] = 196,["124"] = 217,["125"] = 219,["126"] = 220,["127"] = 221,["129"] = 225,["130"] = 226,["131"] = 227,["133"] = 231,["134"] = 232,["135"] = 233,["136"] = 234,["138"] = 238,["139"] = 239,["140"] = 241,["141"] = 241,["142"] = 241,["143"] = 241,["144"] = 241,["145"] = 241,["146"] = 241,["147"] = 241,["148"] = 250,["149"] = 251,["150"] = 252,["152"] = 256,["153"] = 259,["154"] = 260,["155"] = 261,["156"] = 261,["157"] = 261,["158"] = 261,["159"] = 262,["160"] = 263,["161"] = 264,["162"] = 265,["163"] = 265,["164"] = 265,["165"] = 265,["166"] = 266,["168"] = 269,["169"] = 270,["171"] = 272,["174"] = 277,["175"] = 277,["176"] = 277,["177"] = 277,["178"] = 277,["179"] = 277,["180"] = 277,["181"] = 285,["182"] = 286,["183"] = 287,["184"] = 289,["185"] = 290,["186"] = 217,["187"] = 296,["188"] = 297,["189"] = 298,["190"] = 299,["192"] = 302,["193"] = 302,["194"] = 302,["195"] = 302,["196"] = 306,["197"] = 307,["199"] = 310,["200"] = 313,["201"] = 314,["203"] = 318,["204"] = 319,["205"] = 321,["206"] = 322,["207"] = 296,["208"] = 328,["209"] = 329,["210"] = 330,["213"] = 334,["214"] = 335,["215"] = 336,["218"] = 340,["219"] = 341,["220"] = 328,["221"] = 347,["222"] = 348,["223"] = 351,["224"] = 352,["225"] = 355,["226"] = 355,["227"] = 355,["228"] = 355,["229"] = 355,["230"] = 355,["231"] = 355,["232"] = 363,["233"] = 366,["234"] = 368,["235"] = 369,["236"] = 347,["237"] = 376,["238"] = 376,["239"] = 376,["241"] = 377,["242"] = 380,["243"] = 384,["244"] = 386,["245"] = 389,["246"] = 390,["247"] = 391,["248"] = 392,["250"] = 396,["251"] = 396,["252"] = 396,["253"] = 396,["254"] = 396,["255"] = 396,["256"] = 396,["257"] = 404,["258"] = 407,["259"] = 409,["260"] = 410,["261"] = 376,["262"] = 416,["263"] = 417,["264"] = 418,["265"] = 421,["267"] = 423,["268"] = 423,["269"] = 425,["270"] = 428,["271"] = 428,["272"] = 428,["273"] = 428,["274"] = 434,["275"] = 435,["276"] = 435,["277"] = 435,["278"] = 435,["279"] = 435,["280"] = 435,["281"] = 435,["282"] = 435,["283"] = 444,["284"] = 445,["285"] = 447,["286"] = 447,["287"] = 447,["288"] = 447,["289"] = 447,["290"] = 447,["291"] = 447,["293"] = 423,["296"] = 457,["297"] = 416,["298"] = 463,["299"] = 464,["300"] = 465,["303"] = 470,["304"] = 471,["305"] = 473,["306"] = 474,["309"] = 478,["310"] = 479,["311"] = 480,["312"] = 481,["315"] = 486,["316"] = 463,["317"] = 492,["318"] = 493,["319"] = 493,["320"] = 493,["321"] = 494,["322"] = 495,["323"] = 496,["325"] = 500,["326"] = 500,["327"] = 500,["328"] = 500,["329"] = 504,["330"] = 504,["331"] = 504,["332"] = 504,["333"] = 509,["334"] = 510,["335"] = 510,["336"] = 510,["338"] = 510,["340"] = 510,["341"] = 511,["342"] = 512,["343"] = 513,["345"] = 516,["346"] = 493,["347"] = 493,["348"] = 492,["349"] = 523,["350"] = 524,["351"] = 525,["354"] = 530,["355"] = 532,["356"] = 535,["357"] = 535,["358"] = 535,["359"] = 535,["360"] = 535,["361"] = 535,["362"] = 535,["363"] = 538,["364"] = 541,["365"] = 544,["366"] = 553,["367"] = 554,["368"] = 555,["370"] = 562,["372"] = 523,["373"] = 569,["374"] = 570,["375"] = 571,["378"] = 576,["381"] = 576,["383"] = 576,["384"] = 577,["385"] = 578,["386"] = 579,["389"] = 583,["390"] = 569,["391"] = 589,["392"] = 591,["393"] = 594,["394"] = 596,["395"] = 597,["396"] = 600,["397"] = 600,["398"] = 600,["400"] = 600,["402"] = 600,["403"] = 602,["404"] = 604,["405"] = 606,["406"] = 589,["407"] = 612,["408"] = 613,["409"] = 612,["410"] = 620,["411"] = 621,["412"] = 622,["413"] = 623,["415"] = 626,["416"] = 626,["417"] = 626,["418"] = 626,["419"] = 620,["420"] = 634,["421"] = 637,["422"] = 638,["424"] = 640,["425"] = 640,["430"] = 640,["431"] = 634,["432"] = 646,["433"] = 647,["434"] = 648,["435"] = 649,["436"] = 650,["437"] = 651,["438"] = 646,["439"] = 658,["440"] = 660,["441"] = 661,["442"] = 662,["443"] = 663,["444"] = 664,["445"] = 664,["446"] = 664,["447"] = 664,["448"] = 664,["449"] = 664,["450"] = 664,["452"] = 666,["454"] = 668,["455"] = 669,["456"] = 658,["457"] = 675,["458"] = 676,["459"] = 677,["460"] = 678,["462"] = 681,["463"] = 682,["464"] = 683,["465"] = 675,["466"] = 689,["467"] = 690,["468"] = 689,["469"] = 696,["470"] = 697,["471"] = 696,["472"] = 703,["473"] = 704,["474"] = 706,["475"] = 708,["476"] = 709,["477"] = 711,["478"] = 714,["479"] = 717,["482"] = 721,["483"] = 703,["484"] = 727,["485"] = 729,["486"] = 732,["487"] = 735,["488"] = 737,["489"] = 727,["490"] = 743,["491"] = 744,["492"] = 743,["493"] = 750,["494"] = 751,["495"] = 753,["496"] = 754,["497"] = 755,["499"] = 758,["501"] = 750,["502"] = 765,["503"] = 768,["504"] = 769,["505"] = 770,["506"] = 771,["507"] = 772,["508"] = 774,["509"] = 775,["510"] = 775,["511"] = 775,["512"] = 778,["513"] = 779,["514"] = 780,["516"] = 782,["517"] = 782,["519"] = 783,["520"] = 783,["521"] = 785,["522"] = 786,["523"] = 787,["524"] = 789,["525"] = 789,["526"] = 789,["527"] = 789,["528"] = 789,["529"] = 789,["530"] = 789,["531"] = 789,["532"] = 783,["535"] = 782,["538"] = 765,["539"] = 795,["540"] = 796,["542"] = 797,["543"] = 797,["544"] = 798,["545"] = 799,["546"] = 800,["547"] = 800,["548"] = 800,["549"] = 800,["550"] = 800,["551"] = 800,["552"] = 800,["553"] = 800,["554"] = 800,["555"] = 797,["558"] = 795,["559"] = 804,["560"] = 805,["562"] = 807,["563"] = 807,["564"] = 808,["565"] = 809,["566"] = 810,["567"] = 811,["568"] = 807,["571"] = 813,["572"] = 804,["573"] = 817,["574"] = 818,["575"] = 819,["576"] = 820,["577"] = 821,["578"] = 822,["579"] = 822,["580"] = 822,["581"] = 822,["584"] = 825,["585"] = 826,["586"] = 827,["588"] = 829,["590"] = 818,["591"] = 833,["592"] = 834,["593"] = 817,["594"] = 839});
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
