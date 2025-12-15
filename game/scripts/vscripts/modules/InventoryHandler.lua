local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__TypeOf = ____lualib.__TS__TypeOf
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 9,["9"] = 9,["10"] = 9,["12"] = 13,["13"] = 12,["14"] = 16,["15"] = 17,["16"] = 18,["18"] = 20,["19"] = 16,["20"] = 26,["21"] = 28,["22"] = 28,["23"] = 28,["24"] = 29,["25"] = 30,["26"] = 32,["27"] = 33,["28"] = 34,["31"] = 38,["32"] = 39,["33"] = 40,["34"] = 28,["35"] = 28,["36"] = 44,["37"] = 44,["38"] = 44,["39"] = 45,["40"] = 47,["41"] = 48,["44"] = 52,["45"] = 53,["46"] = 54,["47"] = 55,["48"] = 56,["49"] = 57,["50"] = 59,["51"] = 44,["52"] = 44,["53"] = 62,["54"] = 26,["55"] = 68,["56"] = 69,["57"] = 70,["58"] = 72,["59"] = 73,["62"] = 77,["63"] = 78,["64"] = 79,["67"] = 83,["68"] = 84,["69"] = 86,["70"] = 87,["71"] = 88,["72"] = 91,["73"] = 92,["75"] = 93,["76"] = 93,["77"] = 94,["78"] = 95,["79"] = 96,["80"] = 96,["81"] = 96,["82"] = 96,["83"] = 96,["84"] = 96,["85"] = 96,["86"] = 96,["87"] = 96,["88"] = 96,["89"] = 96,["90"] = 96,["91"] = 96,["92"] = 109,["94"] = 93,["98"] = 114,["99"] = 115,["101"] = 118,["102"] = 118,["103"] = 119,["104"] = 120,["105"] = 118,["108"] = 123,["109"] = 124,["110"] = 126,["111"] = 128,["112"] = 132,["113"] = 133,["114"] = 134,["115"] = 136,["116"] = 137,["118"] = 68,["119"] = 144,["120"] = 145,["121"] = 146,["124"] = 150,["125"] = 151,["126"] = 153,["127"] = 154,["130"] = 158,["131"] = 159,["132"] = 161,["133"] = 162,["136"] = 166,["137"] = 167,["138"] = 168,["141"] = 173,["142"] = 175,["143"] = 176,["144"] = 177,["147"] = 181,["148"] = 184,["149"] = 185,["150"] = 186,["151"] = 187,["154"] = 192,["155"] = 194,["156"] = 196,["157"] = 197,["158"] = 200,["159"] = 203,["160"] = 203,["161"] = 203,["162"] = 203,["163"] = 203,["165"] = 205,["166"] = 206,["168"] = 144,["169"] = 213,["170"] = 218,["171"] = 219,["172"] = 220,["173"] = 224,["174"] = 225,["175"] = 227,["176"] = 228,["177"] = 231,["178"] = 232,["180"] = 235,["181"] = 213,["182"] = 241,["183"] = 247,["184"] = 247,["186"] = 249,["187"] = 250,["188"] = 252,["189"] = 253,["190"] = 254,["194"] = 264,["195"] = 265,["198"] = 259,["199"] = 261,["200"] = 262,["206"] = 257,["209"] = 241,["210"] = 272,["211"] = 273,["212"] = 274,["213"] = 275,["215"] = 272,["216"] = 284});
local ____exports = {}
____exports.InventoryHandler = __TS__Class()
local InventoryHandler = ____exports.InventoryHandler
InventoryHandler.name = "InventoryHandler"
function InventoryHandler.prototype.____constructor(self)
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
    local playerState = GameRules.AutoChessMode.gameState.playerStates:get(playerId)
    if not playerState then
        print(("[InventoryHandler] ⚠️ Player " .. tostring(playerId)) .. " state not found")
        return
    end
    print("[InventoryHandler] playerState found: " .. tostring(playerState ~= nil))
    print("[InventoryHandler] playerState.benchPieces 类型: " .. __TS__TypeOf(playerState.benchPieces))
    local benchPieces = playerState.benchPieces or ({})
    local pieceCount = benchPieces.length or 0
    print((("[InventoryHandler] Sending " .. tostring(pieceCount)) .. " pieces to player ") .. tostring(playerId))
    local piecesData = {}
    if benchPieces and pieceCount > 0 then
        do
            local i = 0
            while i < pieceCount do
                local piece = benchPieces[i]
                if piece then
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
    print("[InventoryHandler] piecesData 长度: " .. tostring(#piecesData))
    print("[InventoryHandler] piecesData 类型: " .. __TS__TypeOf(piecesData))
    do
        local i = 0
        while i < #piecesData do
            local p = piecesData[i + 1]
            print((("[InventoryHandler] piecesData[" .. tostring(i)) .. "]: ") .. tostring(p.displayName or "unknown"))
            i = i + 1
        end
    end
    local player = PlayerResource:GetPlayer(playerId)
    print("[InventoryHandler] player 对象: " .. tostring(player ~= nil))
    if player then
        local sendData = {pieces = piecesData}
        print("[InventoryHandler] 准备发送数据...")
        print("[InventoryHandler] sendData.pieces 类型: " .. __TS__TypeOf(sendData.pieces))
        print("[InventoryHandler] sendData.pieces 长度: " .. tostring(#sendData.pieces))
        CustomGameEventManager:Send_ServerToPlayer(player, "update_inventory_data", sendData)
        print("[InventoryHandler] ✅ Inventory data sent to player " .. tostring(playerId))
    end
end
function InventoryHandler.prototype.handleDeployPiece(self, playerId, data)
    if not GameRules.AutoChessMode then
        print("[InventoryHandler] ⚠️ AutoChessMode not initialized")
        return
    end
    local autoChessMode = GameRules.AutoChessMode
    local playerState = autoChessMode.gameState.playerStates:get(playerId)
    if not playerState then
        print(("[InventoryHandler] ⚠️ Player " .. tostring(playerId)) .. " state not found")
        return
    end
    local slotIndex = data.slotIndex
    local benchPieces = playerState.benchPieces or ({})
    if slotIndex < 0 or slotIndex >= benchPieces.length then
        print("[InventoryHandler] ⚠️ Invalid slot index: " .. tostring(slotIndex))
        return
    end
    local piece = benchPieces[slotIndex]
    if not piece then
        print("[InventoryHandler] ⚠️ No piece in slot " .. tostring(slotIndex))
        return
    end
    local boardPosition = self:cursorToBoardPosition(data.cursorX, data.cursorY)
    if not boardPosition then
        print("[InventoryHandler] ⚠️ Invalid board position from cursor")
        self:sendDeploymentFeedback(playerId, false, "无效位置")
        return
    end
    print(((((("[InventoryHandler] Deploying " .. tostring(piece.displayName)) .. " to board position (") .. tostring(boardPosition.x)) .. ", ") .. tostring(boardPosition.y)) .. ")")
    local currentPhase = autoChessMode.currentPhase
    if currentPhase ~= "preparation" and currentPhase ~= "planning" then
        print(("[InventoryHandler] ⚠️ Cannot deploy during " .. tostring(currentPhase)) .. " phase")
        self:sendDeploymentFeedback(playerId, false, "只能在准备阶段部署")
        return
    end
    local success = self:deployPieceToBoard(playerId, piece, boardPosition, slotIndex)
    if success then
        benchPieces:splice(slotIndex, 1)
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
function InventoryHandler.prototype.cursorToBoardPosition(self, screenX, screenY)
    local BOARD_START_X = 500
    local BOARD_START_Y = 500
    local CELL_SIZE = 128
    local worldX = BOARD_START_X + screenX / 1920 * 1024
    local worldY = BOARD_START_Y + screenY / 1080 * 768
    local gridX = math.floor((worldX - BOARD_START_X) / CELL_SIZE)
    local gridY = math.floor((worldY - BOARD_START_Y) / CELL_SIZE)
    if gridX >= 0 and gridX < 8 and gridY >= 0 and gridY < 8 then
        return {x = gridX, y = gridY}
    end
    return nil
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
            battleSystem:deployPiece(playerId, piece.unitName, position)
            print(((((("[InventoryHandler] ✅ Deployed " .. piece.unitName) .. " at (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
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
    end
end
____exports.inventoryHandler = ____exports.InventoryHandler:getInstance()
return ____exports
