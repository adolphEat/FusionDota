local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArrayFindIndex = ____lualib.__TS__ArrayFindIndex
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["18"] = 10,["19"] = 10,["20"] = 43,["21"] = 43,["22"] = 43,["24"] = 49,["25"] = 50,["26"] = 51,["27"] = 54,["28"] = 55,["29"] = 56,["30"] = 57,["31"] = 53,["32"] = 60,["33"] = 61,["34"] = 62,["36"] = 64,["37"] = 60,["38"] = 70,["39"] = 72,["40"] = 70,["41"] = 78,["42"] = 80,["43"] = 80,["44"] = 80,["45"] = 81,["46"] = 82,["47"] = 83,["48"] = 84,["49"] = 80,["50"] = 80,["51"] = 88,["52"] = 88,["53"] = 88,["54"] = 89,["55"] = 90,["56"] = 91,["57"] = 88,["58"] = 88,["59"] = 78,["60"] = 98,["61"] = 99,["62"] = 100,["65"] = 105,["66"] = 108,["67"] = 117,["68"] = 118,["69"] = 120,["70"] = 98,["71"] = 126,["72"] = 127,["73"] = 128,["76"] = 133,["77"] = 136,["78"] = 138,["79"] = 126,["80"] = 144,["81"] = 145,["82"] = 146,["85"] = 151,["86"] = 152,["87"] = 154,["88"] = 144,["89"] = 160,["90"] = 161,["91"] = 162,["94"] = 167,["95"] = 170,["96"] = 173,["97"] = 176,["98"] = 179,["99"] = 180,["100"] = 182,["101"] = 160,["102"] = 188,["103"] = 190,["104"] = 193,["105"] = 194,["106"] = 195,["107"] = 196,["108"] = 197,["109"] = 199,["110"] = 200,["111"] = 201,["112"] = 188,["113"] = 207,["114"] = 209,["115"] = 210,["116"] = 211,["118"] = 215,["119"] = 216,["120"] = 217,["122"] = 221,["123"] = 222,["124"] = 223,["125"] = 224,["127"] = 228,["128"] = 229,["129"] = 231,["130"] = 231,["131"] = 231,["132"] = 231,["133"] = 231,["134"] = 231,["135"] = 231,["136"] = 231,["137"] = 240,["138"] = 241,["139"] = 242,["141"] = 246,["142"] = 249,["143"] = 249,["144"] = 249,["145"] = 249,["146"] = 249,["147"] = 249,["148"] = 249,["149"] = 257,["150"] = 258,["151"] = 259,["152"] = 261,["153"] = 262,["154"] = 207,["155"] = 268,["156"] = 269,["157"] = 270,["158"] = 271,["160"] = 274,["161"] = 274,["162"] = 274,["163"] = 274,["164"] = 278,["165"] = 279,["167"] = 282,["168"] = 285,["169"] = 286,["171"] = 290,["172"] = 291,["173"] = 293,["174"] = 294,["175"] = 268,["176"] = 300,["177"] = 301,["178"] = 302,["181"] = 306,["182"] = 307,["183"] = 308,["186"] = 312,["187"] = 313,["188"] = 300,["189"] = 319,["190"] = 320,["191"] = 323,["192"] = 324,["193"] = 327,["194"] = 327,["195"] = 327,["196"] = 327,["197"] = 327,["198"] = 327,["199"] = 327,["200"] = 335,["201"] = 338,["202"] = 340,["203"] = 341,["204"] = 319,["205"] = 347,["206"] = 347,["207"] = 347,["209"] = 348,["210"] = 351,["211"] = 354,["212"] = 357,["213"] = 357,["214"] = 357,["215"] = 357,["216"] = 357,["217"] = 357,["218"] = 357,["219"] = 365,["220"] = 368,["221"] = 370,["222"] = 371,["223"] = 347,["224"] = 377,["225"] = 378,["226"] = 379,["227"] = 382,["229"] = 384,["230"] = 384,["231"] = 386,["232"] = 389,["233"] = 389,["234"] = 389,["235"] = 389,["236"] = 395,["237"] = 396,["238"] = 396,["239"] = 396,["240"] = 396,["241"] = 396,["242"] = 396,["243"] = 396,["244"] = 396,["245"] = 405,["246"] = 406,["247"] = 408,["248"] = 408,["249"] = 408,["250"] = 408,["251"] = 408,["252"] = 408,["253"] = 408,["255"] = 384,["258"] = 418,["259"] = 377,["260"] = 424,["261"] = 425,["262"] = 426,["265"] = 431,["266"] = 432,["267"] = 434,["268"] = 435,["271"] = 439,["272"] = 440,["273"] = 441,["274"] = 442,["277"] = 447,["278"] = 424,["279"] = 453,["280"] = 454,["281"] = 454,["282"] = 454,["283"] = 455,["284"] = 456,["285"] = 457,["287"] = 461,["288"] = 461,["289"] = 461,["290"] = 461,["291"] = 465,["292"] = 465,["293"] = 465,["294"] = 465,["295"] = 470,["296"] = 471,["297"] = 471,["298"] = 471,["300"] = 471,["302"] = 471,["303"] = 472,["304"] = 473,["305"] = 474,["307"] = 477,["308"] = 454,["309"] = 454,["310"] = 453,["311"] = 484,["312"] = 485,["313"] = 486,["316"] = 490,["317"] = 493,["318"] = 496,["319"] = 484,["320"] = 507,["321"] = 508,["322"] = 509,["325"] = 514,["328"] = 514,["330"] = 514,["331"] = 515,["332"] = 516,["333"] = 517,["336"] = 521,["337"] = 507,["338"] = 527,["339"] = 529,["340"] = 532,["341"] = 534,["342"] = 535,["343"] = 538,["344"] = 538,["345"] = 538,["347"] = 538,["349"] = 538,["350"] = 540,["351"] = 542,["352"] = 544,["353"] = 527,["354"] = 550,["355"] = 551,["356"] = 550,["357"] = 558,["358"] = 559,["359"] = 560,["360"] = 561,["362"] = 564,["363"] = 564,["364"] = 564,["365"] = 564,["366"] = 558,["367"] = 572,["368"] = 574,["369"] = 574,["374"] = 574,["375"] = 572,["376"] = 580,["377"] = 581,["378"] = 582,["379"] = 583,["380"] = 584,["381"] = 585,["382"] = 580,["383"] = 592,["384"] = 594,["385"] = 595,["386"] = 596,["387"] = 597,["388"] = 598,["389"] = 598,["390"] = 598,["391"] = 598,["392"] = 598,["393"] = 598,["394"] = 598,["396"] = 600,["398"] = 602,["399"] = 603,["400"] = 592,["401"] = 609,["402"] = 610,["403"] = 611,["404"] = 612,["406"] = 615,["407"] = 616,["408"] = 617,["409"] = 609,["410"] = 623,["411"] = 624,["412"] = 623,["413"] = 630,["414"] = 631,["415"] = 630,["416"] = 636});
local ____exports = {}
local ____time_utils = require("utils.time_utils")
local getTimestampMs = ____time_utils.getTimestampMs
____exports.ChessBattleSystem = __TS__Class()
local ChessBattleSystem = ____exports.ChessBattleSystem
ChessBattleSystem.name = "ChessBattleSystem"
function ChessBattleSystem.prototype.____constructor(self)
    self.BOARD_SIZE = 8
    self.CELL_SIZE = 128
    self.BOARD_OFFSET = Vector(1058, 978, 200)
    self.activeBattles = __TS__New(Map)
    self.playerDeployedPieces = __TS__New(Map)
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
    local spectatorPos = self:getSpectatorPosition(playerId)
    hero:SetAbsOrigin(spectatorPos)
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
    local mapCenter = Vector(1058, 978, 100)
    local angle = playerId / 8 * 360
    local distance = 600
    local x = mapCenter.x + math.cos(angle * math.pi / 180) * distance
    local y = mapCenter.y + math.sin(angle * math.pi / 180) * distance
    local z = self.BOARD_OFFSET.z
    local spectatorPos = Vector(x, y, z)
    print(((((((("[ChessBattleSystem] Spectator position for player " .. tostring(playerId)) .. ": (") .. __TS__NumberToFixed(x, 1)) .. ", ") .. __TS__NumberToFixed(y, 1)) .. ", ") .. __TS__NumberToFixed(z, 1)) .. ")")
    return spectatorPos
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
    print((("[ChessBattleSystem] Battle " .. battleId) .. " completed. Winner: ") .. tostring(battle.winnerId))
    self:cleanupBattle(battleId)
    CustomGameEventManager:Send_ServerToAllClients("battle_completed", {battleId = battleId, winnerId = battle.winnerId, player1 = battle.player1, player2 = battle.player2})
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
____exports.chessBattleSystem = ____exports.ChessBattleSystem:getInstance()
return ____exports
