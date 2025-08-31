local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ArrayReduce = ____lualib.__TS__ArrayReduce
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local Set = ____lualib.Set
local __TS__Spread = ____lualib.__TS__Spread
local __TS__Delete = ____lualib.__TS__Delete
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["15"] = 28,["16"] = 28,["17"] = 28,["19"] = 30,["20"] = 31,["21"] = 32,["22"] = 35,["23"] = 36,["24"] = 34,["25"] = 39,["26"] = 40,["27"] = 41,["29"] = 43,["30"] = 39,["31"] = 49,["32"] = 51,["33"] = 54,["34"] = 57,["35"] = 57,["36"] = 57,["37"] = 58,["38"] = 59,["39"] = 57,["40"] = 57,["41"] = 49,["42"] = 66,["43"] = 68,["44"] = 68,["45"] = 68,["46"] = 69,["47"] = 68,["48"] = 68,["49"] = 73,["50"] = 73,["51"] = 73,["52"] = 74,["53"] = 73,["54"] = 73,["55"] = 78,["56"] = 78,["57"] = 78,["58"] = 79,["59"] = 78,["60"] = 78,["61"] = 83,["62"] = 83,["63"] = 83,["64"] = 84,["65"] = 83,["66"] = 83,["67"] = 66,["68"] = 91,["69"] = 94,["70"] = 95,["71"] = 95,["72"] = 95,["73"] = 95,["74"] = 95,["75"] = 95,["76"] = 95,["77"] = 95,["78"] = 95,["79"] = 95,["80"] = 95,["81"] = 95,["82"] = 95,["83"] = 94,["84"] = 109,["85"] = 109,["86"] = 109,["87"] = 109,["88"] = 109,["89"] = 109,["90"] = 109,["91"] = 109,["92"] = 109,["93"] = 109,["94"] = 109,["95"] = 109,["96"] = 109,["97"] = 94,["98"] = 94,["99"] = 126,["100"] = 127,["101"] = 91,["102"] = 133,["103"] = 135,["104"] = 135,["105"] = 135,["106"] = 137,["107"] = 138,["108"] = 138,["109"] = 138,["110"] = 138,["111"] = 141,["112"] = 144,["113"] = 145,["114"] = 146,["115"] = 147,["117"] = 149,["119"] = 135,["120"] = 135,["121"] = 154,["122"] = 133,["123"] = 160,["124"] = 161,["125"] = 162,["126"] = 162,["127"] = 162,["128"] = 162,["129"] = 164,["130"] = 165,["133"] = 169,["134"] = 170,["137"] = 174,["138"] = 175,["141"] = 180,["142"] = 183,["143"] = 185,["144"] = 160,["145"] = 191,["146"] = 192,["147"] = 193,["148"] = 194,["149"] = 196,["150"] = 197,["151"] = 200,["152"] = 200,["153"] = 200,["154"] = 200,["155"] = 200,["156"] = 200,["157"] = 200,["158"] = 200,["159"] = 200,["160"] = 206,["161"] = 208,["162"] = 209,["164"] = 213,["165"] = 214,["166"] = 215,["168"] = 218,["169"] = 196,["170"] = 221,["171"] = 191,["172"] = 227,["173"] = 229,["174"] = 230,["175"] = 233,["176"] = 236,["177"] = 241,["178"] = 227,["179"] = 247,["180"] = 248,["181"] = 252,["182"] = 247,["183"] = 258,["184"] = 259,["185"] = 260,["189"] = 262,["190"] = 263,["192"] = 264,["193"] = 265,["194"] = 266,["198"] = 270,["200"] = 271,["201"] = 272,["202"] = 273,["207"] = 278,["211"] = 258,["212"] = 286,["213"] = 287,["214"] = 287,["215"] = 287,["216"] = 287,["217"] = 287,["218"] = 287,["219"] = 287,["220"] = 287,["221"] = 287,["222"] = 287,["223"] = 287,["224"] = 287,["225"] = 287,["226"] = 287,["227"] = 302,["228"] = 302,["229"] = 303,["230"] = 304,["231"] = 307,["232"] = 309,["233"] = 286,["234"] = 315,["235"] = 316,["236"] = 319,["237"] = 320,["238"] = 320,["239"] = 320,["240"] = 320,["241"] = 320,["242"] = 320,["243"] = 320,["244"] = 320,["246"] = 326,["247"] = 315,["248"] = 332,["249"] = 333,["250"] = 335,["251"] = 332,["252"] = 343,["253"] = 344,["254"] = 343,["255"] = 352,["256"] = 353,["257"] = 354,["258"] = 354,["259"] = 354,["260"] = 354,["261"] = 354,["262"] = 354,["263"] = 354,["264"] = 354,["266"] = 352,["267"] = 364,["268"] = 365,["269"] = 366,["270"] = 366,["271"] = 366,["272"] = 366,["273"] = 367,["274"] = 367,["275"] = 367,["276"] = 367,["277"] = 367,["278"] = 368,["279"] = 368,["280"] = 368,["281"] = 368,["282"] = 368,["283"] = 370,["284"] = 370,["285"] = 370,["286"] = 370,["287"] = 370,["288"] = 375,["289"] = 375,["290"] = 375,["291"] = 375,["292"] = 375,["293"] = 375,["294"] = 370,["295"] = 376,["296"] = 376,["297"] = 376,["298"] = 376,["299"] = 376,["300"] = 376,["301"] = 370,["302"] = 370,["303"] = 364,["304"] = 383,["305"] = 384,["306"] = 383,["307"] = 390,["308"] = 391,["309"] = 392,["310"] = 393,["311"] = 393,["312"] = 393,["313"] = 393,["314"] = 394,["315"] = 395,["316"] = 396,["318"] = 399,["319"] = 400,["321"] = 390});
local ____exports = {}
____exports.ServerManager = __TS__Class()
local ServerManager = ____exports.ServerManager
ServerManager.name = "ServerManager"
function ServerManager.prototype.____constructor(self)
    self.serverList = {}
    self.playerPreferences = {}
    self.selectedServers = {}
    self:initializeServerManager()
    print("[ServerManager] Initialized")
end
function ServerManager.getInstance(self)
    if not ____exports.ServerManager.instance then
        ____exports.ServerManager.instance = __TS__New(____exports.ServerManager)
    end
    return ____exports.ServerManager.instance
end
function ServerManager.prototype.initializeServerManager(self)
    self:registerEvents()
    self:loadServerList()
    Timers:CreateTimer(
        1,
        function()
            self:updateServerStatus()
            return 30
        end
    )
end
function ServerManager.prototype.registerEvents(self)
    CustomGameEventManager:RegisterListener(
        "connect_to_server",
        function(_, event)
            self:handleConnectToServer(event.PlayerID, event)
        end
    )
    CustomGameEventManager:RegisterListener(
        "create_server_room",
        function(_, event)
            self:handleCreateRoom(event.PlayerID, event)
        end
    )
    CustomGameEventManager:RegisterListener(
        "save_player_preferences",
        function(_, event)
            self:handleSavePlayerPreferences(event.PlayerID, event)
        end
    )
    CustomGameEventManager:RegisterListener(
        "refresh_server_list",
        function(_, event)
            self:handleRefreshServerList(event.PlayerID)
        end
    )
end
function ServerManager.prototype.loadServerList(self)
    self.serverList = {
        {
            id = "asia-official-01",
            name = "FusionDota 亚洲官方服务器 #1",
            region = "asia",
            status = "online",
            playerCount = 6,
            maxPlayers = 8,
            gameMode = "autochess",
            hostName = "FusionDota官方",
            mapName = "battlemap",
            tags = {"官方", "自走棋", "中文"},
            version = "1.2.0",
            lastUpdated = Date:now()
        },
        {
            id = "asia-training-01",
            name = "练功房服务器",
            region = "asia",
            status = "online",
            playerCount = 1,
            maxPlayers = 1,
            gameMode = "training",
            hostName = "开发者",
            mapName = "temp",
            tags = {"练习", "测试"},
            version = "1.2.0",
            lastUpdated = Date:now()
        }
    }
    self:syncServerListToNetTable()
    print(("[ServerManager] Loaded " .. tostring(#self.serverList)) .. " servers")
end
function ServerManager.prototype.updateServerStatus(self)
    __TS__ArrayForEach(
        self.serverList,
        function(____, server)
            local change = RandomInt(-1, 2)
            server.playerCount = math.max(
                0,
                math.min(server.maxPlayers, server.playerCount + change)
            )
            server.lastUpdated = Date:now()
            if server.playerCount >= server.maxPlayers then
                server.status = "busy"
            elseif server.playerCount == 0 then
                server.status = math.random() < 0.1 and "maintenance" or "online"
            else
                server.status = "online"
            end
        end
    )
    self:syncServerListToNetTable()
end
function ServerManager.prototype.handleConnectToServer(self, playerId, event)
    local serverId = event.serverId
    local server = __TS__ArrayFind(
        self.serverList,
        function(____, s) return s.id == serverId end
    )
    if not server then
        self:sendErrorToPlayer(playerId, "服务器不存在")
        return
    end
    if server.status ~= "online" then
        self:sendErrorToPlayer(playerId, "服务器当前不可用")
        return
    end
    if server.playerCount >= server.maxPlayers then
        self:sendErrorToPlayer(playerId, "服务器已满")
        return
    end
    self.selectedServers[playerId] = serverId
    self:simulateConnection(playerId, server)
    print((("[ServerManager] Player " .. tostring(playerId)) .. " connecting to server ") .. tostring(serverId))
end
function ServerManager.prototype.simulateConnection(self, playerId, server)
    local progress = 0
    local interval = 0.2
    local steps = 5
    local function updateProgress()
        progress = progress + 100 / steps
        CustomGameEventManager:Send_ServerToPlayer(
            playerId,
            "connection_progress",
            {
                progress = math.min(100, progress),
                step = math.floor(progress / 20) + 1,
                totalSteps = steps
            }
        )
        if progress >= 100 then
            self:onConnectionSuccess(playerId, server)
            return nil
        end
        if math.random() < 0.05 then
            self:onConnectionFailed(playerId, "连接超时")
            return nil
        end
        return interval
    end
    Timers:CreateTimer(interval, updateProgress)
end
function ServerManager.prototype.onConnectionSuccess(self, playerId, server)
    server.playerCount = server.playerCount + 1
    self:syncServerListToNetTable()
    self:startGameModeForServer(playerId, server)
    CustomGameEventManager:Send_ServerToPlayer(playerId, "connection_success", {server = server, gameMode = server.gameMode})
    print((("[ServerManager] Player " .. tostring(playerId)) .. " connected successfully to ") .. server.id)
end
function ServerManager.prototype.onConnectionFailed(self, playerId, ____error)
    CustomGameEventManager:Send_ServerToPlayer(playerId, "connection_failed", {error = ____error})
    print((("[ServerManager] Player " .. tostring(playerId)) .. " connection failed: ") .. ____error)
end
function ServerManager.prototype.startGameModeForServer(self, playerId, server)
    local gameModeManager = GameRules.GameModeManager
    if not gameModeManager then
        return
    end
    repeat
        local ____switch31 = server.gameMode
        local ____cond31 = ____switch31 == "autochess"
        if ____cond31 then
            gameModeManager:switchMode("autochess")
            if GameRules.AutoChessMode then
                GameRules.AutoChessMode:activate()
            end
            break
        end
        ____cond31 = ____cond31 or ____switch31 == "training"
        if ____cond31 then
            gameModeManager:switchMode("training")
            if GameRules.TrainingMode then
                GameRules.TrainingMode:activate()
            end
            break
        end
        do
            print("[ServerManager] Unknown game mode: " .. server.gameMode)
            break
        end
    until true
end
function ServerManager.prototype.handleCreateRoom(self, playerId, event)
    local newServer = {
        id = (("custom-" .. tostring(playerId)) .. "-") .. tostring(Date:now()),
        name = PlayerResource:GetPlayerName(playerId) .. "的房间",
        region = event.region or "asia",
        status = "online",
        playerCount = 1,
        maxPlayers = event.maxPlayers or 8,
        gameMode = event.gameMode or "autochess",
        hostName = PlayerResource:GetPlayerName(playerId),
        mapName = "battlemap",
        tags = {"自定义", "新建"},
        version = "1.2.0",
        lastUpdated = Date:now()
    }
    local ____self_serverList_0 = self.serverList
    ____self_serverList_0[#____self_serverList_0 + 1] = newServer
    self.selectedServers[playerId] = newServer.id
    self:syncServerListToNetTable()
    self:onConnectionSuccess(playerId, newServer)
    print((("[ServerManager] Player " .. tostring(playerId)) .. " created room ") .. newServer.id)
end
function ServerManager.prototype.handleSavePlayerPreferences(self, playerId, event)
    self.playerPreferences[playerId] = event.preferences
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "player_preferences",
            "player_" .. tostring(playerId),
            {
                serverPreferences = event.preferences,
                timestamp = Date:now()
            }
        )
    end
    print("[ServerManager] Saved preferences for player " .. tostring(playerId))
end
function ServerManager.prototype.handleRefreshServerList(self, playerId)
    self:loadServerList()
    CustomGameEventManager:Send_ServerToPlayer(playerId, "server_list_refreshed", {serverCount = #self.serverList})
end
function ServerManager.prototype.sendErrorToPlayer(self, playerId, ____error)
    CustomGameEventManager:Send_ServerToPlayer(playerId, "server_error", {error = ____error})
end
function ServerManager.prototype.syncServerListToNetTable(self)
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "server_list",
            "servers",
            {
                servers = self.serverList,
                lastUpdated = Date:now()
            }
        )
    end
end
function ServerManager.prototype.getServerStats(self)
    local totalServers = #self.serverList
    local onlineServers = #__TS__ArrayFilter(
        self.serverList,
        function(____, s) return s.status == "online" end
    )
    local totalPlayers = __TS__ArrayReduce(
        self.serverList,
        function(____, sum, s) return sum + s.playerCount end,
        0
    )
    local totalCapacity = __TS__ArrayReduce(
        self.serverList,
        function(____, sum, s) return sum + s.maxPlayers end,
        0
    )
    return {
        totalServers = totalServers,
        onlineServers = onlineServers,
        totalPlayers = totalPlayers,
        totalCapacity = totalCapacity,
        regions = {__TS__Spread(__TS__New(
            Set,
            __TS__ArrayMap(
                self.serverList,
                function(____, s) return s.region end
            )
        ))},
        gameModes = {__TS__Spread(__TS__New(
            Set,
            __TS__ArrayMap(
                self.serverList,
                function(____, s) return s.gameMode end
            )
        ))}
    }
end
function ServerManager.prototype.getPlayerSelectedServer(self, playerId)
    return self.selectedServers[playerId] or nil
end
function ServerManager.prototype.removePlayer(self, playerId)
    local serverId = self.selectedServers[playerId]
    if serverId then
        local server = __TS__ArrayFind(
            self.serverList,
            function(____, s) return s.id == serverId end
        )
        if server and server.playerCount > 0 then
            server.playerCount = server.playerCount - 1
            self:syncServerListToNetTable()
        end
        __TS__Delete(self.selectedServers, playerId)
        __TS__Delete(self.playerPreferences, playerId)
    end
end
return ____exports
