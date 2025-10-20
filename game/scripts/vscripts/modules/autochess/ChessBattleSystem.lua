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
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 10,["19"] = 10,["20"] = 11,["21"] = 11,["22"] = 44,["23"] = 44,["24"] = 44,["26"] = 51,["27"] = 54,["28"] = 55,["29"] = 56,["30"] = 59,["31"] = 60,["32"] = 61,["33"] = 62,["34"] = 63,["35"] = 58,["36"] = 66,["37"] = 67,["38"] = 68,["40"] = 70,["41"] = 66,["42"] = 76,["43"] = 78,["44"] = 76,["45"] = 84,["46"] = 86,["47"] = 86,["48"] = 86,["49"] = 87,["50"] = 88,["51"] = 89,["52"] = 90,["53"] = 86,["54"] = 86,["55"] = 94,["56"] = 94,["57"] = 94,["58"] = 95,["59"] = 96,["60"] = 97,["61"] = 94,["62"] = 94,["63"] = 84,["64"] = 104,["65"] = 105,["66"] = 106,["69"] = 111,["70"] = 114,["71"] = 117,["72"] = 118,["73"] = 119,["74"] = 120,["75"] = 123,["76"] = 124,["77"] = 125,["78"] = 126,["79"] = 128,["80"] = 104,["81"] = 134,["82"] = 135,["83"] = 136,["86"] = 141,["87"] = 144,["88"] = 146,["89"] = 134,["90"] = 152,["91"] = 153,["92"] = 154,["95"] = 159,["96"] = 160,["97"] = 162,["98"] = 152,["99"] = 168,["100"] = 169,["101"] = 170,["104"] = 175,["105"] = 178,["106"] = 181,["107"] = 184,["108"] = 187,["109"] = 188,["110"] = 190,["111"] = 168,["112"] = 196,["113"] = 198,["114"] = 201,["115"] = 202,["116"] = 203,["117"] = 204,["118"] = 207,["119"] = 208,["120"] = 210,["121"] = 211,["122"] = 196,["123"] = 217,["124"] = 219,["125"] = 220,["126"] = 221,["128"] = 225,["129"] = 226,["130"] = 227,["132"] = 231,["133"] = 232,["134"] = 233,["135"] = 234,["137"] = 238,["138"] = 239,["139"] = 241,["140"] = 241,["141"] = 241,["142"] = 241,["143"] = 241,["144"] = 241,["145"] = 241,["146"] = 241,["147"] = 250,["148"] = 251,["149"] = 252,["151"] = 256,["152"] = 259,["153"] = 260,["154"] = 261,["155"] = 261,["156"] = 261,["157"] = 261,["158"] = 262,["159"] = 263,["160"] = 264,["161"] = 265,["162"] = 265,["163"] = 265,["164"] = 265,["165"] = 266,["167"] = 269,["168"] = 270,["170"] = 272,["173"] = 277,["174"] = 277,["175"] = 277,["176"] = 277,["177"] = 277,["178"] = 277,["179"] = 277,["180"] = 285,["181"] = 286,["182"] = 287,["183"] = 289,["184"] = 290,["185"] = 217,["186"] = 296,["187"] = 297,["188"] = 298,["189"] = 299,["191"] = 302,["192"] = 302,["193"] = 302,["194"] = 302,["195"] = 306,["196"] = 307,["198"] = 310,["199"] = 313,["200"] = 314,["202"] = 318,["203"] = 319,["204"] = 321,["205"] = 322,["206"] = 296,["207"] = 328,["208"] = 329,["209"] = 330,["212"] = 334,["213"] = 335,["214"] = 336,["217"] = 340,["218"] = 341,["219"] = 328,["220"] = 347,["221"] = 348,["222"] = 351,["223"] = 352,["224"] = 355,["225"] = 355,["226"] = 355,["227"] = 355,["228"] = 355,["229"] = 355,["230"] = 355,["231"] = 363,["232"] = 366,["233"] = 368,["234"] = 369,["235"] = 347,["236"] = 375,["237"] = 375,["238"] = 375,["240"] = 376,["241"] = 379,["242"] = 382,["243"] = 385,["244"] = 385,["245"] = 385,["246"] = 385,["247"] = 385,["248"] = 385,["249"] = 385,["250"] = 393,["251"] = 396,["252"] = 398,["253"] = 399,["254"] = 375,["255"] = 405,["256"] = 406,["257"] = 407,["258"] = 410,["260"] = 412,["261"] = 412,["262"] = 414,["263"] = 417,["264"] = 417,["265"] = 417,["266"] = 417,["267"] = 423,["268"] = 424,["269"] = 424,["270"] = 424,["271"] = 424,["272"] = 424,["273"] = 424,["274"] = 424,["275"] = 424,["276"] = 433,["277"] = 434,["278"] = 436,["279"] = 436,["280"] = 436,["281"] = 436,["282"] = 436,["283"] = 436,["284"] = 436,["286"] = 412,["289"] = 446,["290"] = 405,["291"] = 452,["292"] = 453,["293"] = 454,["296"] = 459,["297"] = 460,["298"] = 462,["299"] = 463,["302"] = 467,["303"] = 468,["304"] = 469,["305"] = 470,["308"] = 475,["309"] = 452,["310"] = 481,["311"] = 482,["312"] = 482,["313"] = 482,["314"] = 483,["315"] = 484,["316"] = 485,["318"] = 489,["319"] = 489,["320"] = 489,["321"] = 489,["322"] = 493,["323"] = 493,["324"] = 493,["325"] = 493,["326"] = 498,["327"] = 499,["328"] = 499,["329"] = 499,["331"] = 499,["333"] = 499,["334"] = 500,["335"] = 501,["336"] = 502,["338"] = 505,["339"] = 482,["340"] = 482,["341"] = 481,["342"] = 512,["343"] = 513,["344"] = 514,["347"] = 519,["348"] = 521,["349"] = 524,["350"] = 524,["351"] = 524,["352"] = 524,["353"] = 524,["354"] = 524,["355"] = 524,["356"] = 527,["357"] = 530,["358"] = 533,["359"] = 541,["360"] = 541,["361"] = 541,["362"] = 543,["363"] = 546,["364"] = 547,["366"] = 551,["367"] = 552,["368"] = 541,["369"] = 541,["370"] = 512,["371"] = 559,["372"] = 560,["373"] = 561,["376"] = 566,["379"] = 566,["381"] = 566,["382"] = 567,["383"] = 568,["384"] = 569,["387"] = 573,["388"] = 559,["389"] = 579,["390"] = 581,["391"] = 584,["392"] = 586,["393"] = 587,["394"] = 590,["395"] = 590,["396"] = 590,["398"] = 590,["400"] = 590,["401"] = 592,["402"] = 594,["403"] = 596,["404"] = 579,["405"] = 602,["406"] = 603,["407"] = 602,["408"] = 610,["409"] = 611,["410"] = 612,["411"] = 613,["413"] = 616,["414"] = 616,["415"] = 616,["416"] = 616,["417"] = 610,["418"] = 624,["419"] = 626,["420"] = 626,["425"] = 626,["426"] = 624,["427"] = 632,["428"] = 633,["429"] = 634,["430"] = 635,["431"] = 636,["432"] = 637,["433"] = 632,["434"] = 644,["435"] = 646,["436"] = 647,["437"] = 648,["438"] = 649,["439"] = 650,["440"] = 650,["441"] = 650,["442"] = 650,["443"] = 650,["444"] = 650,["445"] = 650,["447"] = 652,["449"] = 654,["450"] = 655,["451"] = 644,["452"] = 661,["453"] = 662,["454"] = 663,["455"] = 664,["457"] = 667,["458"] = 668,["459"] = 669,["460"] = 661,["461"] = 675,["462"] = 676,["463"] = 675,["464"] = 682,["465"] = 683,["466"] = 682,["467"] = 689,["468"] = 690,["469"] = 692,["470"] = 694,["471"] = 695,["472"] = 697,["473"] = 700,["474"] = 703,["477"] = 707,["478"] = 689,["479"] = 713,["480"] = 715,["481"] = 718,["482"] = 721,["483"] = 723,["484"] = 713,["485"] = 729,["486"] = 730,["487"] = 729,["488"] = 736,["489"] = 737,["490"] = 739,["491"] = 740,["492"] = 741,["494"] = 744,["496"] = 736,["497"] = 751,["498"] = 754,["499"] = 755,["500"] = 756,["501"] = 757,["502"] = 758,["503"] = 760,["504"] = 761,["505"] = 761,["506"] = 761,["507"] = 764,["508"] = 765,["509"] = 766,["511"] = 768,["512"] = 768,["514"] = 769,["515"] = 769,["516"] = 771,["517"] = 772,["518"] = 773,["519"] = 775,["520"] = 775,["521"] = 775,["522"] = 775,["523"] = 775,["524"] = 775,["525"] = 775,["526"] = 775,["527"] = 769,["530"] = 768,["533"] = 751,["534"] = 781,["535"] = 782,["537"] = 783,["538"] = 783,["539"] = 784,["540"] = 785,["541"] = 786,["542"] = 786,["543"] = 786,["544"] = 786,["545"] = 786,["546"] = 786,["547"] = 786,["548"] = 786,["549"] = 786,["550"] = 783,["553"] = 781,["554"] = 790,["555"] = 791,["557"] = 793,["558"] = 793,["559"] = 794,["560"] = 795,["561"] = 796,["562"] = 797,["563"] = 793,["566"] = 799,["567"] = 790,["568"] = 803,["569"] = 804,["570"] = 805,["571"] = 806,["572"] = 807,["573"] = 808,["574"] = 808,["575"] = 808,["576"] = 808,["579"] = 811,["580"] = 812,["581"] = 813,["583"] = 815,["585"] = 804,["586"] = 819,["587"] = 820,["588"] = 803,["589"] = 825});
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
    local aiPieces = self:generateAIPieces(aiLevel)
    local battle = {
        player1 = playerId,
        player2 = -1,
        player1Pieces = playerPieces,
        player2Pieces = aiPieces,
        completed = false
    }
    self.activeBattles:set(battleId, battle)
    self:executeBattle(battleId)
    print("[ChessBattleSystem] Started battle vs AI: " .. battleId)
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
    Timers:CreateTimer(
        5,
        function()
            self.playerDeployedPieces:set(playerIdForTest, {})
            for ____, s in ipairs(playerSnapshot) do
                self:deployPiece(playerIdForTest, s.pieceId, s.position)
            end
            self:startBattleVsAI(playerIdForTest)
            return nil
        end
    )
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
            print("[ChessBattleSystem] Available pieces: " .. table.concat(
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
