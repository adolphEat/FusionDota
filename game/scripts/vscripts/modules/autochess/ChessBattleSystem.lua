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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["19"] = 10,["20"] = 10,["21"] = 11,["22"] = 11,["23"] = 44,["24"] = 44,["25"] = 44,["27"] = 51,["28"] = 54,["29"] = 55,["30"] = 56,["31"] = 59,["32"] = 60,["33"] = 61,["34"] = 62,["35"] = 63,["36"] = 58,["37"] = 66,["38"] = 67,["39"] = 68,["41"] = 70,["42"] = 66,["43"] = 76,["44"] = 78,["45"] = 76,["46"] = 84,["47"] = 86,["48"] = 86,["49"] = 86,["50"] = 87,["51"] = 88,["52"] = 89,["53"] = 90,["54"] = 86,["55"] = 86,["56"] = 94,["57"] = 94,["58"] = 94,["59"] = 95,["60"] = 96,["61"] = 97,["62"] = 94,["63"] = 94,["64"] = 84,["65"] = 104,["66"] = 105,["67"] = 106,["70"] = 111,["71"] = 114,["72"] = 117,["73"] = 118,["74"] = 119,["75"] = 120,["76"] = 123,["77"] = 124,["78"] = 125,["79"] = 126,["80"] = 128,["81"] = 104,["82"] = 134,["83"] = 135,["84"] = 136,["87"] = 141,["88"] = 144,["89"] = 146,["90"] = 134,["91"] = 152,["92"] = 153,["93"] = 154,["96"] = 159,["97"] = 160,["98"] = 162,["99"] = 152,["100"] = 168,["101"] = 169,["102"] = 170,["105"] = 175,["106"] = 178,["107"] = 181,["108"] = 184,["109"] = 187,["110"] = 188,["111"] = 190,["112"] = 168,["113"] = 196,["114"] = 198,["115"] = 201,["116"] = 202,["117"] = 203,["118"] = 204,["119"] = 207,["120"] = 208,["121"] = 210,["122"] = 211,["123"] = 196,["124"] = 217,["125"] = 219,["126"] = 220,["127"] = 221,["129"] = 225,["130"] = 226,["131"] = 227,["133"] = 231,["134"] = 232,["135"] = 233,["136"] = 234,["138"] = 238,["139"] = 239,["140"] = 241,["141"] = 241,["142"] = 241,["143"] = 241,["144"] = 241,["145"] = 241,["146"] = 241,["147"] = 241,["148"] = 250,["149"] = 251,["150"] = 252,["152"] = 256,["153"] = 259,["154"] = 260,["155"] = 261,["156"] = 261,["157"] = 261,["158"] = 261,["159"] = 262,["160"] = 263,["161"] = 264,["162"] = 265,["163"] = 265,["164"] = 265,["165"] = 265,["166"] = 266,["168"] = 269,["169"] = 270,["171"] = 272,["174"] = 277,["175"] = 277,["176"] = 277,["177"] = 277,["178"] = 277,["179"] = 277,["180"] = 277,["181"] = 285,["182"] = 286,["183"] = 287,["184"] = 289,["185"] = 290,["186"] = 217,["187"] = 296,["188"] = 297,["189"] = 298,["190"] = 299,["192"] = 302,["193"] = 302,["194"] = 302,["195"] = 302,["196"] = 306,["197"] = 307,["199"] = 310,["200"] = 313,["201"] = 314,["203"] = 318,["204"] = 319,["205"] = 321,["206"] = 322,["207"] = 296,["208"] = 328,["209"] = 329,["210"] = 330,["213"] = 334,["214"] = 335,["215"] = 336,["218"] = 340,["219"] = 341,["220"] = 328,["221"] = 347,["222"] = 348,["223"] = 351,["224"] = 352,["225"] = 355,["226"] = 355,["227"] = 355,["228"] = 355,["229"] = 355,["230"] = 355,["231"] = 355,["232"] = 363,["233"] = 366,["234"] = 368,["235"] = 369,["236"] = 347,["237"] = 375,["238"] = 375,["239"] = 375,["241"] = 376,["242"] = 379,["243"] = 382,["244"] = 385,["245"] = 385,["246"] = 385,["247"] = 385,["248"] = 385,["249"] = 385,["250"] = 385,["251"] = 393,["252"] = 396,["253"] = 398,["254"] = 399,["255"] = 375,["256"] = 405,["257"] = 406,["258"] = 407,["259"] = 410,["261"] = 412,["262"] = 412,["263"] = 414,["264"] = 417,["265"] = 417,["266"] = 417,["267"] = 417,["268"] = 423,["269"] = 424,["270"] = 424,["271"] = 424,["272"] = 424,["273"] = 424,["274"] = 424,["275"] = 424,["276"] = 424,["277"] = 433,["278"] = 434,["279"] = 436,["280"] = 436,["281"] = 436,["282"] = 436,["283"] = 436,["284"] = 436,["285"] = 436,["287"] = 412,["290"] = 446,["291"] = 405,["292"] = 452,["293"] = 453,["294"] = 454,["297"] = 459,["298"] = 460,["299"] = 462,["300"] = 463,["303"] = 467,["304"] = 468,["305"] = 469,["306"] = 470,["309"] = 475,["310"] = 452,["311"] = 481,["312"] = 482,["313"] = 482,["314"] = 482,["315"] = 483,["316"] = 484,["317"] = 485,["319"] = 489,["320"] = 489,["321"] = 489,["322"] = 489,["323"] = 493,["324"] = 493,["325"] = 493,["326"] = 493,["327"] = 498,["328"] = 499,["329"] = 499,["330"] = 499,["332"] = 499,["334"] = 499,["335"] = 500,["336"] = 501,["337"] = 502,["339"] = 505,["340"] = 482,["341"] = 482,["342"] = 481,["343"] = 512,["344"] = 513,["345"] = 514,["348"] = 519,["349"] = 521,["350"] = 524,["351"] = 524,["352"] = 524,["353"] = 524,["354"] = 524,["355"] = 524,["356"] = 524,["357"] = 527,["358"] = 530,["359"] = 533,["360"] = 541,["361"] = 542,["363"] = 512,["364"] = 550,["365"] = 551,["366"] = 552,["369"] = 557,["372"] = 557,["374"] = 557,["375"] = 558,["376"] = 559,["377"] = 560,["380"] = 564,["381"] = 550,["382"] = 570,["383"] = 572,["384"] = 575,["385"] = 577,["386"] = 578,["387"] = 581,["388"] = 581,["389"] = 581,["391"] = 581,["393"] = 581,["394"] = 583,["395"] = 585,["396"] = 587,["397"] = 570,["398"] = 593,["399"] = 594,["400"] = 593,["401"] = 601,["402"] = 602,["403"] = 603,["404"] = 604,["406"] = 607,["407"] = 607,["408"] = 607,["409"] = 607,["410"] = 601,["411"] = 615,["412"] = 617,["413"] = 617,["418"] = 617,["419"] = 615,["420"] = 623,["421"] = 624,["422"] = 625,["423"] = 626,["424"] = 627,["425"] = 628,["426"] = 623,["427"] = 635,["428"] = 637,["429"] = 638,["430"] = 639,["431"] = 640,["432"] = 641,["433"] = 641,["434"] = 641,["435"] = 641,["436"] = 641,["437"] = 641,["438"] = 641,["440"] = 643,["442"] = 645,["443"] = 646,["444"] = 635,["445"] = 652,["446"] = 653,["447"] = 654,["448"] = 655,["450"] = 658,["451"] = 659,["452"] = 660,["453"] = 652,["454"] = 666,["455"] = 667,["456"] = 666,["457"] = 673,["458"] = 674,["459"] = 673,["460"] = 680,["461"] = 681,["462"] = 683,["463"] = 685,["464"] = 686,["465"] = 688,["466"] = 691,["467"] = 694,["470"] = 698,["471"] = 680,["472"] = 704,["473"] = 706,["474"] = 709,["475"] = 712,["476"] = 714,["477"] = 704,["478"] = 720,["479"] = 721,["480"] = 720,["481"] = 727,["482"] = 728,["483"] = 730,["484"] = 731,["485"] = 732,["487"] = 735,["489"] = 727,["490"] = 742,["491"] = 745,["492"] = 746,["493"] = 747,["494"] = 748,["495"] = 749,["496"] = 751,["497"] = 752,["498"] = 752,["499"] = 752,["500"] = 755,["501"] = 756,["502"] = 757,["504"] = 759,["505"] = 759,["507"] = 760,["508"] = 760,["509"] = 762,["510"] = 763,["511"] = 764,["512"] = 766,["513"] = 766,["514"] = 766,["515"] = 766,["516"] = 766,["517"] = 766,["518"] = 766,["519"] = 766,["520"] = 760,["523"] = 759,["526"] = 742,["527"] = 772,["528"] = 773,["530"] = 774,["531"] = 774,["532"] = 775,["533"] = 776,["534"] = 777,["535"] = 777,["536"] = 777,["537"] = 777,["538"] = 777,["539"] = 777,["540"] = 777,["541"] = 777,["542"] = 777,["543"] = 774,["546"] = 772,["547"] = 781,["548"] = 782,["550"] = 784,["551"] = 784,["552"] = 785,["553"] = 786,["554"] = 787,["555"] = 788,["556"] = 784,["559"] = 790,["560"] = 781,["561"] = 794,["562"] = 795,["563"] = 796,["564"] = 797,["565"] = 798,["566"] = 799,["567"] = 799,["568"] = 799,["569"] = 799,["572"] = 802,["573"] = 803,["574"] = 804,["576"] = 806,["578"] = 795,["579"] = 810,["580"] = 811,["581"] = 794,["582"] = 816});
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
    if GameRules.AutoChessMode then
        print("[ChessBattleSystem] Notifying AutoChessMode of battle completion")
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
