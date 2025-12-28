local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__TypeOf = ____lualib.__TS__TypeOf
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 9,["12"] = 9,["13"] = 9,["15"] = 321,["16"] = 322,["17"] = 323,["18"] = 324,["19"] = 327,["20"] = 13,["21"] = 12,["22"] = 16,["23"] = 17,["24"] = 18,["26"] = 20,["27"] = 16,["28"] = 26,["29"] = 28,["30"] = 28,["31"] = 28,["32"] = 29,["33"] = 30,["34"] = 32,["35"] = 33,["36"] = 34,["39"] = 38,["40"] = 39,["41"] = 40,["42"] = 28,["43"] = 28,["44"] = 45,["45"] = 45,["46"] = 45,["47"] = 46,["48"] = 47,["49"] = 49,["50"] = 50,["53"] = 56,["54"] = 58,["55"] = 59,["56"] = 60,["57"] = 61,["58"] = 62,["59"] = 64,["60"] = 45,["61"] = 45,["62"] = 67,["63"] = 26,["64"] = 73,["65"] = 74,["66"] = 75,["67"] = 77,["68"] = 78,["71"] = 84,["72"] = 85,["73"] = 85,["74"] = 85,["75"] = 85,["76"] = 85,["77"] = 85,["78"] = 85,["80"] = 85,["82"] = 85,["84"] = 85,["86"] = 85,["87"] = 88,["88"] = 89,["89"] = 90,["90"] = 91,["92"] = 94,["95"] = 97,["96"] = 100,["97"] = 101,["98"] = 102,["100"] = 104,["101"] = 104,["102"] = 105,["103"] = 106,["104"] = 107,["105"] = 107,["106"] = 107,["107"] = 107,["108"] = 107,["109"] = 107,["110"] = 107,["111"] = 107,["112"] = 107,["113"] = 107,["114"] = 107,["115"] = 107,["116"] = 107,["117"] = 120,["119"] = 104,["123"] = 125,["125"] = 126,["126"] = 126,["127"] = 127,["128"] = 128,["129"] = 129,["130"] = 130,["131"] = 130,["132"] = 130,["133"] = 130,["134"] = 130,["135"] = 130,["136"] = 130,["137"] = 130,["138"] = 130,["139"] = 130,["140"] = 130,["141"] = 130,["142"] = 130,["143"] = 143,["145"] = 126,["150"] = 150,["151"] = 151,["152"] = 152,["154"] = 155,["155"] = 155,["156"] = 156,["157"] = 157,["158"] = 155,["161"] = 161,["162"] = 165,["163"] = 168,["164"] = 169,["165"] = 170,["166"] = 171,["168"] = 73,["169"] = 178,["170"] = 179,["171"] = 180,["174"] = 185,["175"] = 186,["176"] = 187,["179"] = 191,["180"] = 192,["181"] = 195,["182"] = 196,["183"] = 197,["184"] = 198,["186"] = 200,["189"] = 204,["190"] = 205,["193"] = 211,["194"] = 212,["195"] = 213,["196"] = 214,["199"] = 219,["200"] = 220,["201"] = 222,["202"] = 223,["203"] = 224,["206"] = 228,["207"] = 230,["208"] = 231,["209"] = 232,["212"] = 236,["213"] = 239,["214"] = 247,["215"] = 250,["216"] = 252,["217"] = 255,["218"] = 256,["219"] = 259,["220"] = 259,["221"] = 259,["222"] = 259,["223"] = 259,["224"] = 259,["225"] = 263,["226"] = 263,["227"] = 263,["228"] = 264,["229"] = 265,["231"] = 263,["232"] = 263,["234"] = 269,["235"] = 270,["237"] = 178,["238"] = 278,["239"] = 279,["240"] = 280,["241"] = 281,["244"] = 285,["245"] = 288,["246"] = 289,["248"] = 291,["249"] = 291,["250"] = 292,["251"] = 293,["253"] = 295,["255"] = 291,["258"] = 298,["260"] = 301,["261"] = 302,["263"] = 303,["264"] = 303,["265"] = 304,["266"] = 305,["267"] = 306,["269"] = 308,["271"] = 310,["272"] = 303,["275"] = 312,["277"] = 316,["278"] = 317,["279"] = 278,["280"] = 333,["281"] = 335,["282"] = 336,["283"] = 339,["284"] = 339,["285"] = 339,["287"] = 339,["289"] = 339,["290"] = 342,["291"] = 343,["292"] = 346,["293"] = 347,["294"] = 350,["295"] = 351,["296"] = 353,["297"] = 356,["298"] = 357,["299"] = 358,["301"] = 362,["302"] = 363,["303"] = 364,["305"] = 367,["306"] = 333,["307"] = 373,["308"] = 379,["309"] = 379,["311"] = 381,["312"] = 382,["313"] = 384,["314"] = 385,["315"] = 386,["319"] = 397,["320"] = 398,["323"] = 392,["324"] = 394,["325"] = 395,["331"] = 389,["334"] = 373,["335"] = 405,["336"] = 406,["337"] = 407,["338"] = 408,["339"] = 409,["340"] = 410,["341"] = 411,["342"] = 411,["343"] = 411,["345"] = 411,["347"] = 408,["348"] = 413,["350"] = 405,["351"] = 419});
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
        function(userId, event)
            print("[InventoryHandler] ========== 部署棋子请求 ==========")
            print((("[InventoryHandler] userId: " .. tostring(userId)) .. ", event: ") .. (event and "not nil" or "nil"))
            if not event then
                print("[InventoryHandler] ⚠️ event is nil, cannot deploy piece")
                return
            end
            local playerId = event.PlayerID or event.playerId or userId or 0
            print("[InventoryHandler] PlayerId: " .. tostring(playerId))
            print("[InventoryHandler] PieceId: " .. tostring(event.pieceId))
            print("[InventoryHandler] UnitName: " .. tostring(event.unitName))
            print("[InventoryHandler] SlotIndex: " .. tostring(event.slotIndex))
            print(((((("[InventoryHandler] WorldPos: (" .. tostring(event.worldX)) .. ", ") .. tostring(event.worldY)) .. ", ") .. tostring(event.worldZ)) .. ")")
            self:handleDeployPiece(playerId, event)
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
        self:sendDeploymentFeedback(playerId, false, "坐标无效", slotIndex)
        return
    end
    local boardPosition = self:worldToBoardPosition(worldX, worldY, playerId)
    if not boardPosition then
        print("[InventoryHandler] ⚠️ Position outside player's half")
        self:sendDeploymentFeedback(playerId, false, "只能放置在己方半场（下半区）", slotIndex)
        return
    end
    print(((((("[InventoryHandler] Deploying " .. tostring(piece.displayName)) .. " to board position (") .. tostring(boardPosition.x)) .. ", ") .. tostring(boardPosition.y)) .. ")")
    local currentPhase = GameRules.AutoChessMode:getCurrentPhase()
    print(("[InventoryHandler] 当前阶段: " .. currentPhase) .. "，允许部署")
    local success = self:deployPieceToBoard(playerId, piece, boardPosition, slotIndex)
    if success then
        self:removePieceFromBench(playerState, slotIndex)
        print("[InventoryHandler] ✅ Piece deployed successfully")
        self:sendDeploymentFeedback(
            playerId,
            true,
            tostring(piece.displayName) .. " 已部署",
            slotIndex
        )
        Timers:CreateTimer(
            0.1,
            function()
                print("[InventoryHandler] 🔄 延迟发送背包数据更新")
                self:sendInventoryData(playerId)
                return
            end
        )
    else
        print("[InventoryHandler] ❌ Failed to deploy piece")
        self:sendDeploymentFeedback(playerId, false, "部署失败", slotIndex)
    end
end
function InventoryHandler.prototype.removePieceFromBench(self, playerState, slotIndex)
    local benchPieces = playerState.benchPieces
    if not benchPieces then
        print("[InventoryHandler] ⚠️ removePieceFromBench: benchPieces is null or undefined")
        return
    end
    print((((("[InventoryHandler] 🔄 removePieceFromBench: slotIndex=" .. tostring(slotIndex)) .. ", benchPieces类型=") .. __TS__TypeOf(benchPieces)) .. ", 是数组=") .. tostring(__TS__ArrayIsArray(benchPieces)))
    local newBenchPieces = {}
    if __TS__ArrayIsArray(benchPieces) then
        do
            local i = 0
            while i < #benchPieces do
                if i ~= slotIndex then
                    newBenchPieces[#newBenchPieces + 1] = benchPieces[i + 1]
                else
                    print(("[InventoryHandler] 跳过索引 " .. tostring(i)) .. "（要移除的棋子）")
                end
                i = i + 1
            end
        end
        print((("[InventoryHandler] 重建数组移除棋子，原长度: " .. tostring(#benchPieces)) .. ", 新长度: ") .. tostring(#newBenchPieces))
    else
        local keys = __TS__ObjectKeys(benchPieces)
        local currentIndex = 0
        do
            local i = 0
            while i < #keys do
                local key = keys[i + 1]
                if currentIndex ~= slotIndex then
                    newBenchPieces[#newBenchPieces + 1] = benchPieces[key]
                else
                    print(("[InventoryHandler] 跳过索引 " .. tostring(currentIndex)) .. "（要移除的棋子）")
                end
                currentIndex = currentIndex + 1
                i = i + 1
            end
        end
        print((("[InventoryHandler] 重建Lua表移除棋子，原长度: " .. tostring(#keys)) .. ", 新长度: ") .. tostring(#newBenchPieces))
    end
    playerState.benchPieces = newBenchPieces
    print("[InventoryHandler] ✅ 棋子已从备战席移除")
end
function InventoryHandler.prototype.worldToBoardPosition(self, worldX, worldY, playerId)
    local boardTotalSize = self.BOARD_SIZE * self.CELL_SIZE
    local centerOffset = boardTotalSize / 2
    local ____temp_4
    if playerId >= 0 then
        ____temp_4 = playerId * 2000
    else
        ____temp_4 = 0
    end
    local playerOffset = ____temp_4
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
function InventoryHandler.prototype.sendDeploymentFeedback(self, playerId, success, message, slotIndex)
    local player = PlayerResource:GetPlayer(playerId)
    if player then
        local ____CustomGameEventManager_Send_ServerToPlayer_8 = CustomGameEventManager.Send_ServerToPlayer
        local ____success_6 = success
        local ____message_7 = message
        local ____temp_5
        if slotIndex ~= nil then
            ____temp_5 = slotIndex
        else
            ____temp_5 = -1
        end
        ____CustomGameEventManager_Send_ServerToPlayer_8(CustomGameEventManager, player, "deployment_feedback", {success = ____success_6, message = ____message_7, slotIndex = ____temp_5})
        print((((("[InventoryHandler] 📤 Feedback: " .. (success and "✅" or "❌")) .. " ") .. message) .. ", slotIndex: ") .. tostring(slotIndex))
    end
end
____exports.inventoryHandler = ____exports.InventoryHandler:getInstance()
return ____exports
