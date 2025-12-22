local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__TypeOf = ____lualib.__TS__TypeOf
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 9,["12"] = 9,["13"] = 9,["15"] = 306,["16"] = 307,["17"] = 308,["18"] = 309,["19"] = 312,["20"] = 13,["21"] = 12,["22"] = 16,["23"] = 17,["24"] = 18,["26"] = 20,["27"] = 16,["28"] = 26,["29"] = 28,["30"] = 28,["31"] = 28,["32"] = 29,["33"] = 30,["34"] = 32,["35"] = 33,["36"] = 34,["39"] = 38,["40"] = 39,["41"] = 40,["42"] = 28,["43"] = 28,["44"] = 44,["45"] = 44,["46"] = 44,["47"] = 45,["48"] = 47,["49"] = 48,["52"] = 52,["53"] = 53,["54"] = 54,["55"] = 55,["56"] = 56,["57"] = 57,["58"] = 59,["59"] = 44,["60"] = 44,["61"] = 62,["62"] = 26,["63"] = 68,["64"] = 69,["65"] = 70,["66"] = 72,["67"] = 73,["70"] = 79,["71"] = 80,["72"] = 80,["73"] = 80,["74"] = 80,["75"] = 80,["76"] = 80,["77"] = 80,["79"] = 80,["81"] = 80,["83"] = 80,["85"] = 80,["86"] = 83,["87"] = 84,["88"] = 85,["89"] = 86,["91"] = 89,["94"] = 92,["95"] = 95,["96"] = 96,["97"] = 97,["99"] = 99,["100"] = 99,["101"] = 100,["102"] = 101,["103"] = 102,["104"] = 102,["105"] = 102,["106"] = 102,["107"] = 102,["108"] = 102,["109"] = 102,["110"] = 102,["111"] = 102,["112"] = 102,["113"] = 102,["114"] = 102,["115"] = 102,["116"] = 115,["118"] = 99,["122"] = 120,["124"] = 121,["125"] = 121,["126"] = 122,["127"] = 123,["128"] = 124,["129"] = 125,["130"] = 125,["131"] = 125,["132"] = 125,["133"] = 125,["134"] = 125,["135"] = 125,["136"] = 125,["137"] = 125,["138"] = 125,["139"] = 125,["140"] = 125,["141"] = 125,["142"] = 138,["144"] = 121,["149"] = 145,["150"] = 146,["151"] = 147,["153"] = 150,["154"] = 150,["155"] = 151,["156"] = 152,["157"] = 150,["160"] = 156,["161"] = 160,["162"] = 163,["163"] = 164,["164"] = 165,["165"] = 166,["167"] = 68,["168"] = 173,["169"] = 174,["170"] = 175,["173"] = 180,["174"] = 181,["175"] = 182,["178"] = 186,["179"] = 187,["180"] = 190,["181"] = 191,["182"] = 192,["183"] = 193,["185"] = 195,["188"] = 199,["189"] = 200,["192"] = 206,["193"] = 207,["194"] = 208,["195"] = 209,["198"] = 214,["199"] = 215,["200"] = 217,["201"] = 218,["202"] = 219,["205"] = 223,["206"] = 225,["207"] = 226,["208"] = 227,["211"] = 231,["212"] = 234,["213"] = 242,["214"] = 245,["215"] = 247,["216"] = 250,["217"] = 251,["218"] = 254,["219"] = 257,["220"] = 257,["221"] = 257,["222"] = 257,["223"] = 257,["225"] = 259,["226"] = 260,["228"] = 173,["229"] = 268,["230"] = 269,["231"] = 270,["234"] = 274,["236"] = 274,["238"] = 274,["239"] = 275,["240"] = 277,["241"] = 278,["243"] = 281,["244"] = 282,["246"] = 283,["247"] = 283,["248"] = 284,["249"] = 285,["251"] = 283,["255"] = 290,["256"] = 291,["258"] = 292,["259"] = 292,["260"] = 293,["261"] = 294,["262"] = 295,["264"] = 297,["265"] = 292,["269"] = 300,["270"] = 301,["272"] = 268,["273"] = 318,["274"] = 320,["275"] = 321,["276"] = 324,["277"] = 324,["278"] = 324,["280"] = 324,["282"] = 324,["283"] = 327,["284"] = 328,["285"] = 331,["286"] = 332,["287"] = 335,["288"] = 336,["289"] = 338,["290"] = 341,["291"] = 342,["292"] = 343,["294"] = 347,["295"] = 348,["296"] = 349,["298"] = 352,["299"] = 318,["300"] = 358,["301"] = 364,["302"] = 364,["304"] = 366,["305"] = 367,["306"] = 369,["307"] = 370,["308"] = 371,["312"] = 382,["313"] = 383,["316"] = 377,["317"] = 379,["318"] = 380,["324"] = 374,["327"] = 358,["328"] = 390,["329"] = 391,["330"] = 392,["331"] = 393,["332"] = 397,["334"] = 390,["335"] = 403});
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
    local ____print_3 = print
    local ____TS__TypeOf_result_2 = __TS__TypeOf(benchPieces)
    local ____benchPieces_1
    if benchPieces then
        local ____Array_isArray_result_0
        if __TS__ArrayIsArray(benchPieces) then
            ____Array_isArray_result_0 = #benchPieces
        else
            ____Array_isArray_result_0 = #__TS__ObjectKeys(benchPieces)
        end
        ____benchPieces_1 = ____Array_isArray_result_0
    else
        ____benchPieces_1 = 0
    end
    ____print_3((("[InventoryHandler] 获取玩家 0 的备战席棋子，类型: " .. ____TS__TypeOf_result_2) .. ", 数量: ") .. tostring(____benchPieces_1))
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
                    local key = keys[i + 1]
                    local piece = benchPieces[key]
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
        if __TS__ArrayIsArray(benchPieces) then
            benchPiecesLength = #benchPieces
        else
            benchPiecesLength = #__TS__ObjectKeys(benchPieces)
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
    local ____opt_4 = _G.table
    if ____opt_4 ~= nil then
        ____opt_4 = ____opt_4.remove
    end
    local tableRemove = ____opt_4
    if tableRemove then
        tableRemove(nil, benchPieces, slotIndex + 1)
        print("[InventoryHandler] 使用 table.remove 移除棋子，索引: " .. tostring(slotIndex + 1))
    else
        local newBenchPieces = {}
        if __TS__ArrayIsArray(benchPieces) then
            do
                local i = 0
                while i < #benchPieces do
                    if i ~= slotIndex then
                        newBenchPieces[#newBenchPieces + 1] = benchPieces[i + 1]
                    end
                    i = i + 1
                end
            end
        else
            local keys = __TS__ObjectKeys(benchPieces)
            local currentIndex = 0
            do
                local i = 0
                while i < #keys do
                    local key = keys[i + 1]
                    if currentIndex ~= slotIndex then
                        newBenchPieces[#newBenchPieces + 1] = benchPieces[key]
                    end
                    currentIndex = currentIndex + 1
                    i = i + 1
                end
            end
        end
        playerState.benchPieces = newBenchPieces
        print("[InventoryHandler] 重建数组移除棋子，索引: " .. tostring(slotIndex))
    end
end
function InventoryHandler.prototype.worldToBoardPosition(self, worldX, worldY, playerId)
    local boardTotalSize = self.BOARD_SIZE * self.CELL_SIZE
    local centerOffset = boardTotalSize / 2
    local ____temp_6
    if playerId >= 0 then
        ____temp_6 = playerId * 2000
    else
        ____temp_6 = 0
    end
    local playerOffset = ____temp_6
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
