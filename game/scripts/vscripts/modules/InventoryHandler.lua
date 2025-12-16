local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__TypeOf = ____lualib.__TS__TypeOf
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 9,["12"] = 9,["13"] = 9,["15"] = 295,["16"] = 296,["17"] = 297,["18"] = 298,["19"] = 301,["20"] = 13,["21"] = 12,["22"] = 16,["23"] = 17,["24"] = 18,["26"] = 20,["27"] = 16,["28"] = 26,["29"] = 28,["30"] = 28,["31"] = 28,["32"] = 29,["33"] = 30,["34"] = 32,["35"] = 33,["36"] = 34,["39"] = 38,["40"] = 39,["41"] = 40,["42"] = 28,["43"] = 28,["44"] = 44,["45"] = 44,["46"] = 44,["47"] = 45,["48"] = 47,["49"] = 48,["52"] = 52,["53"] = 53,["54"] = 54,["55"] = 55,["56"] = 56,["57"] = 57,["58"] = 59,["59"] = 44,["60"] = 44,["61"] = 62,["62"] = 26,["63"] = 68,["64"] = 69,["65"] = 70,["66"] = 72,["67"] = 73,["70"] = 78,["71"] = 79,["72"] = 82,["73"] = 83,["74"] = 84,["75"] = 85,["77"] = 88,["80"] = 91,["81"] = 94,["82"] = 95,["83"] = 96,["85"] = 98,["86"] = 98,["87"] = 99,["88"] = 100,["89"] = 101,["90"] = 101,["91"] = 101,["92"] = 101,["93"] = 101,["94"] = 101,["95"] = 101,["96"] = 101,["97"] = 101,["98"] = 101,["99"] = 101,["100"] = 101,["101"] = 101,["102"] = 114,["104"] = 98,["108"] = 119,["110"] = 120,["111"] = 120,["112"] = 121,["113"] = 122,["114"] = 123,["115"] = 123,["116"] = 123,["117"] = 123,["118"] = 123,["119"] = 123,["120"] = 123,["121"] = 123,["122"] = 123,["123"] = 123,["124"] = 123,["125"] = 123,["126"] = 123,["127"] = 136,["129"] = 120,["134"] = 143,["135"] = 144,["136"] = 145,["138"] = 148,["139"] = 148,["140"] = 149,["141"] = 150,["142"] = 148,["145"] = 154,["146"] = 158,["147"] = 161,["148"] = 162,["149"] = 163,["150"] = 164,["152"] = 68,["153"] = 171,["154"] = 172,["155"] = 173,["158"] = 178,["159"] = 179,["160"] = 180,["163"] = 184,["164"] = 185,["165"] = 188,["166"] = 189,["167"] = 190,["168"] = 191,["169"] = 192,["173"] = 197,["174"] = 198,["177"] = 204,["178"] = 205,["179"] = 206,["180"] = 207,["183"] = 212,["184"] = 213,["185"] = 215,["186"] = 216,["187"] = 217,["190"] = 221,["191"] = 223,["192"] = 224,["193"] = 225,["196"] = 229,["197"] = 232,["198"] = 240,["199"] = 243,["200"] = 245,["201"] = 248,["202"] = 249,["203"] = 252,["204"] = 255,["205"] = 255,["206"] = 255,["207"] = 255,["208"] = 255,["210"] = 257,["211"] = 258,["213"] = 171,["214"] = 266,["215"] = 267,["216"] = 268,["219"] = 272,["221"] = 272,["223"] = 272,["224"] = 273,["225"] = 275,["226"] = 276,["228"] = 279,["229"] = 280,["230"] = 281,["231"] = 282,["232"] = 283,["233"] = 284,["235"] = 286,["238"] = 289,["239"] = 290,["241"] = 266,["242"] = 307,["243"] = 309,["244"] = 310,["245"] = 313,["246"] = 313,["247"] = 313,["249"] = 313,["251"] = 313,["252"] = 316,["253"] = 317,["254"] = 320,["255"] = 321,["256"] = 324,["257"] = 325,["258"] = 327,["259"] = 330,["260"] = 331,["261"] = 332,["263"] = 336,["264"] = 337,["265"] = 338,["267"] = 341,["268"] = 307,["269"] = 347,["270"] = 353,["271"] = 353,["273"] = 355,["274"] = 356,["275"] = 358,["276"] = 359,["277"] = 360,["281"] = 371,["282"] = 372,["285"] = 366,["286"] = 368,["287"] = 369,["293"] = 363,["296"] = 347,["297"] = 379,["298"] = 380,["299"] = 381,["300"] = 382,["301"] = 386,["303"] = 379,["304"] = 392});
local ____exports = {}
____exports.InventoryHandler = __TS__Class()
local InventoryHandler = ____exports.InventoryHandler
InventoryHandler.name = "InventoryHandler"
function InventoryHandler.prototype.____constructor(self)
    self.BOARD_SIZE = 8
    self.CELL_SIZE = 128
    self.BOARD_OFFSET_X = 1058
    self.BOARD_OFFSET_Y = 978
    self.PLAYER_HALF_MAX_Y = 3
    self:registerEventHandlers()
end
function InventoryHandler.getInstance(self)
    if not ____exports.InventoryHandler.instance then
        ____exports.InventoryHandler.instance = __TS__New(____exports.InventoryHandler)
    end
    return ____exports.InventoryHandler.instance
end
function InventoryHandler.prototype.registerEventHandlers(self)
    CustomGameEventManager:RegisterListener(
        "request_inventory_data",
        function(____, _, data)
            print("[InventoryHandler] ========== 收到背包数据请求 ==========")
            print("[InventoryHandler] data 是否为 nil: " .. tostring(data == nil))
            if not data then
                print("[InventoryHandler] ⚠️ data is nil, using default playerId 0")
                self:sendInventoryData(0)
                return
            end
            local playerId = data.PlayerID or data.playerId or 0
            print(("[InventoryHandler] Player " .. tostring(playerId)) .. " requested inventory data")
            self:sendInventoryData(playerId)
        end
    )
    CustomGameEventManager:RegisterListener(
        "inventory_deploy_piece",
        function(____, _, data)
            print("[InventoryHandler] ========== 部署棋子请求 ==========")
            if not data then
                print("[InventoryHandler] ⚠️ data is nil, cannot deploy piece")
                return
            end
            local playerId = data.PlayerID or data.playerId or 0
            print("[InventoryHandler] PlayerId: " .. tostring(playerId))
            print("[InventoryHandler] PieceId: " .. tostring(data.pieceId))
            print("[InventoryHandler] UnitName: " .. tostring(data.unitName))
            print("[InventoryHandler] SlotIndex: " .. tostring(data.slotIndex))
            print(((("[InventoryHandler] Cursor: (" .. tostring(data.cursorX)) .. ", ") .. tostring(data.cursorY)) .. ")")
            self:handleDeployPiece(playerId, data)
        end
    )
    print("[InventoryHandler] Event handlers registered")
end
function InventoryHandler.prototype.sendInventoryData(self, playerId)
    print("[InventoryHandler] ========== sendInventoryData ==========")
    print("[InventoryHandler] playerId: " .. tostring(playerId))
    if not GameRules.AutoChessMode then
        print("[InventoryHandler] ⚠️ AutoChessMode not initialized")
        return
    end
    local benchPieces = GameRules.AutoChessMode:getBenchPieces()
    print("[InventoryHandler] 获取备战席棋子，类型: " .. __TS__TypeOf(benchPieces))
    local pieceCount = 0
    if benchPieces then
        if __TS__ArrayIsArray(benchPieces) then
            pieceCount = #benchPieces
        else
            pieceCount = #__TS__ObjectKeys(benchPieces)
        end
    end
    print((("[InventoryHandler] Sending " .. tostring(pieceCount)) .. " pieces to player ") .. tostring(playerId))
    local piecesData = {}
    if benchPieces and pieceCount > 0 then
        if __TS__ArrayIsArray(benchPieces) then
            do
                local i = 0
                while i < #benchPieces do
                    local piece = benchPieces[i + 1]
                    if piece and piece.id then
                        piecesData[#piecesData + 1] = {
                            id = piece.id,
                            unitName = piece.unitName,
                            displayName = piece.displayName,
                            rarity = piece.rarity,
                            cost = piece.cost,
                            race = piece.race,
                            class = piece.class,
                            health = piece.health,
                            damage = piece.damage,
                            armor = piece.armor,
                            attackRange = piece.attackRange
                        }
                        print((("[InventoryHandler] 添加棋子 " .. tostring(i)) .. ": ") .. tostring(piece.displayName))
                    end
                    i = i + 1
                end
            end
        else
            local keys = __TS__ObjectKeys(benchPieces)
            do
                local i = 0
                while i < #keys do
                    local piece = benchPieces[keys[i + 1]]
                    if piece and piece.id then
                        piecesData[#piecesData + 1] = {
                            id = piece.id,
                            unitName = piece.unitName,
                            displayName = piece.displayName,
                            rarity = piece.rarity,
                            cost = piece.cost,
                            race = piece.race,
                            class = piece.class,
                            health = piece.health,
                            damage = piece.damage,
                            armor = piece.armor,
                            attackRange = piece.attackRange
                        }
                        print((("[InventoryHandler] 添加棋子 " .. tostring(i)) .. ": ") .. tostring(piece.displayName))
                    end
                    i = i + 1
                end
            end
        end
    end
    local piecesDataLength = #piecesData
    print("[InventoryHandler] piecesData 长度: " .. tostring(piecesDataLength))
    print("[InventoryHandler] piecesData 类型: " .. __TS__TypeOf(piecesData))
    do
        local i = 0
        while i < #piecesData do
            local p = piecesData[i + 1]
            print((("[InventoryHandler] piecesData[" .. tostring(i)) .. "]: ") .. tostring(p.displayName or "unknown"))
            i = i + 1
        end
    end
    local sendData = {pieces = piecesData}
    print("[InventoryHandler] 准备发送数据，棋子数量: " .. tostring(piecesDataLength))
    local player = PlayerResource:GetPlayer(playerId)
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "update_inventory_data", sendData)
        print("[InventoryHandler] ✅ Inventory data sent to player " .. tostring(playerId))
    end
end
function InventoryHandler.prototype.handleDeployPiece(self, playerId, data)
    if not GameRules.AutoChessMode then
        print("[InventoryHandler] ⚠️ AutoChessMode not initialized")
        return
    end
    local playerState = GameRules.AutoChessMode:getPlayerState()
    if not playerState then
        print("[InventoryHandler] ⚠️ Player state not found")
        return
    end
    local slotIndex = data.slotIndex
    local benchPieces = playerState.benchPieces
    local benchPiecesLength = 0
    if benchPieces then
        for key in pairs(benchPieces) do
            if rawget(benchPieces, key) ~= nil then
                benchPiecesLength = benchPiecesLength + 1
            end
        end
    end
    if slotIndex < 0 or slotIndex >= benchPiecesLength then
        print((("[InventoryHandler] ⚠️ Invalid slot index: " .. tostring(slotIndex)) .. ", benchPiecesLength: ") .. tostring(benchPiecesLength))
        return
    end
    local luaIndex = slotIndex + 1
    local piece = benchPieces[luaIndex] or benchPieces[slotIndex]
    if not piece then
        print(((("[InventoryHandler] ⚠️ No piece in slot " .. tostring(slotIndex)) .. " (luaIndex: ") .. tostring(luaIndex)) .. ")")
        return
    end
    local worldX = data.worldX
    local worldY = data.worldY
    if worldX == nil or worldY == nil then
        print("[InventoryHandler] ⚠️ Missing world coordinates")
        self:sendDeploymentFeedback(playerId, false, "坐标无效")
        return
    end
    local boardPosition = self:worldToBoardPosition(worldX, worldY, playerId)
    if not boardPosition then
        print("[InventoryHandler] ⚠️ Position outside player's half")
        self:sendDeploymentFeedback(playerId, false, "只能放置在己方半场（下半区）")
        return
    end
    print(((((("[InventoryHandler] Deploying " .. tostring(piece.displayName)) .. " to board position (") .. tostring(boardPosition.x)) .. ", ") .. tostring(boardPosition.y)) .. ")")
    local currentPhase = GameRules.AutoChessMode:getCurrentPhase()
    print(("[InventoryHandler] 当前阶段: " .. currentPhase) .. "，允许部署")
    local success = self:deployPieceToBoard(playerId, piece, boardPosition, slotIndex)
    if success then
        self:removePieceFromBench(playerState, slotIndex)
        print("[InventoryHandler] ✅ Piece deployed successfully")
        self:sendInventoryData(playerId)
        self:sendDeploymentFeedback(
            playerId,
            true,
            tostring(piece.displayName) .. " 已部署"
        )
    else
        print("[InventoryHandler] ❌ Failed to deploy piece")
        self:sendDeploymentFeedback(playerId, false, "部署失败")
    end
end
function InventoryHandler.prototype.removePieceFromBench(self, playerState, slotIndex)
    local benchPieces = playerState.benchPieces
    if not benchPieces then
        return
    end
    local ____opt_0 = _G.table
    if ____opt_0 ~= nil then
        ____opt_0 = ____opt_0.remove
    end
    local tableRemove = ____opt_0
    if tableRemove then
        tableRemove(nil, benchPieces, slotIndex + 1)
        print("[InventoryHandler] 使用 table.remove 移除棋子，索引: " .. tostring(slotIndex + 1))
    else
        local newBenchPieces = {}
        local currentIndex = 0
        for key in pairs(benchPieces) do
            if rawget(benchPieces, key) ~= nil then
                if currentIndex ~= slotIndex then
                    newBenchPieces[#newBenchPieces + 1] = benchPieces[key]
                end
                currentIndex = currentIndex + 1
            end
        end
        playerState.benchPieces = newBenchPieces
        print("[InventoryHandler] 重建数组移除棋子，索引: " .. tostring(slotIndex))
    end
end
function InventoryHandler.prototype.worldToBoardPosition(self, worldX, worldY, playerId)
    local boardTotalSize = self.BOARD_SIZE * self.CELL_SIZE
    local centerOffset = boardTotalSize / 2
    local ____temp_2
    if playerId >= 0 then
        ____temp_2 = playerId * 2000
    else
        ____temp_2 = 0
    end
    local playerOffset = ____temp_2
    local boardStartX = self.BOARD_OFFSET_X - centerOffset + playerOffset
    local boardStartY = self.BOARD_OFFSET_Y - centerOffset
    local relativeX = worldX - boardStartX
    local relativeY = worldY - boardStartY
    local gridX = math.floor(relativeX / self.CELL_SIZE)
    local gridY = math.floor(relativeY / self.CELL_SIZE)
    print(((((((("[InventoryHandler] 🎯 世界坐标(" .. __TS__NumberToFixed(worldX, 1)) .. ", ") .. __TS__NumberToFixed(worldY, 1)) .. ") → 棋盘格子(") .. tostring(gridX)) .. ", ") .. tostring(gridY)) .. ")")
    if gridX < 0 or gridX >= self.BOARD_SIZE then
        print("[InventoryHandler] ⚠️ X坐标超出棋盘范围: " .. tostring(gridX))
        return nil
    end
    if gridY < 0 or gridY > self.PLAYER_HALF_MAX_Y then
        print(((("[InventoryHandler] ⚠️ Y坐标超出玩家半场范围: " .. tostring(gridY)) .. " (允许范围: 0-") .. tostring(self.PLAYER_HALF_MAX_Y)) .. ")")
        return nil
    end
    return {x = gridX, y = gridY}
end
function InventoryHandler.prototype.deployPieceToBoard(self, playerId, piece, position, slotIndex)
    if not GameRules.AutoChessMode then
        return false
    end
    local autoChessMode = GameRules.AutoChessMode
    local battleSystem = autoChessMode.battleSystem
    if not battleSystem then
        print("[InventoryHandler] ⚠️ BattleSystem not found")
        return false
    end
    do
        local function ____catch(____error)
            print("[InventoryHandler] ❌ Deploy error: " .. tostring(____error))
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            battleSystem:deployPiece(playerId, piece.id, position)
            print(((((((("[InventoryHandler] ✅ Deployed " .. piece.id) .. " (") .. piece.displayName) .. ") at (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function InventoryHandler.prototype.sendDeploymentFeedback(self, playerId, success, message)
    local player = PlayerResource:GetPlayer(playerId)
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "deployment_feedback", {success = success, message = message})
        print((("[InventoryHandler] 📤 Feedback: " .. (success and "✅" or "❌")) .. " ") .. message)
    end
end
____exports.inventoryHandler = ____exports.InventoryHandler:getInstance()
return ____exports
