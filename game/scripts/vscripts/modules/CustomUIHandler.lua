local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 6,["10"] = 6,["11"] = 6,["13"] = 10,["14"] = 11,["15"] = 9,["16"] = 14,["17"] = 15,["18"] = 16,["20"] = 18,["21"] = 14,["22"] = 24,["23"] = 26,["24"] = 26,["25"] = 26,["26"] = 27,["27"] = 26,["28"] = 26,["29"] = 31,["30"] = 31,["31"] = 31,["32"] = 32,["33"] = 31,["34"] = 31,["35"] = 36,["36"] = 36,["37"] = 36,["38"] = 37,["39"] = 36,["40"] = 36,["41"] = 24,["42"] = 44,["43"] = 45,["44"] = 46,["45"] = 48,["46"] = 54,["47"] = 54,["48"] = 54,["49"] = 54,["50"] = 54,["51"] = 54,["52"] = 54,["53"] = 54,["54"] = 44,["55"] = 64,["56"] = 65,["57"] = 66,["58"] = 68,["59"] = 71,["60"] = 72,["63"] = 77,["64"] = 78,["65"] = 79,["70"] = 97,["73"] = 90,["74"] = 90,["75"] = 90,["76"] = 90,["77"] = 90,["78"] = 95,["84"] = 64,["85"] = 104,["86"] = 105,["87"] = 106,["88"] = 107,["89"] = 109,["91"] = 111,["92"] = 112,["94"] = 113,["97"] = 115,["99"] = 116,["102"] = 118,["104"] = 119,["108"] = 122,["111"] = 104,["112"] = 129,["113"] = 130,["114"] = 131,["117"] = 155,["120"] = 134,["121"] = 134,["122"] = 134,["123"] = 134,["124"] = 134,["125"] = 134,["126"] = 134,["127"] = 134,["128"] = 143,["129"] = 144,["130"] = 147,["131"] = 147,["132"] = 147,["133"] = 147,["134"] = 147,["136"] = 152,["143"] = 129,["144"] = 162,["145"] = 163,["146"] = 164,["147"] = 165,["150"] = 169,["153"] = 180,["156"] = 172,["157"] = 173,["158"] = 176,["159"] = 176,["160"] = 176,["161"] = 176,["162"] = 176,["168"] = 162,["169"] = 187,["170"] = 188,["171"] = 189,["174"] = 206,["177"] = 193,["178"] = 194,["179"] = 197,["180"] = 200,["187"] = 187,["188"] = 213,["189"] = 215,["190"] = 216,["191"] = 214,["192"] = 214,["193"] = 214,["194"] = 214,["195"] = 214,["196"] = 220,["197"] = 222,["198"] = 222,["199"] = 222,["200"] = 222,["201"] = 222,["203"] = 225,["205"] = 213,["206"] = 232,["207"] = 234,["208"] = 234,["209"] = 234,["210"] = 235,["211"] = 236,["212"] = 234,["213"] = 234,["214"] = 232,["215"] = 243,["216"] = 244,["218"] = 246,["219"] = 247,["221"] = 248,["224"] = 252,["226"] = 253,["229"] = 257,["231"] = 260,["235"] = 243,["236"] = 268,["237"] = 270,["238"] = 272,["239"] = 273,["241"] = 277,["242"] = 279,["243"] = 268,["244"] = 285,["246"] = 286,["247"] = 287,["249"] = 288,["252"] = 292,["254"] = 293,["257"] = 297,["259"] = 298,["263"] = 301,["266"] = 285,["267"] = 307});
local ____exports = {}
--- 自定义UI事件处理器
-- 处理来自客户端UI的事件
____exports.CustomUIHandler = __TS__Class()
local CustomUIHandler = ____exports.CustomUIHandler
CustomUIHandler.name = "CustomUIHandler"
function CustomUIHandler.prototype.____constructor(self)
    self:registerEventHandlers()
    print("[CustomUIHandler] Initialized")
end
function CustomUIHandler.getInstance(self)
    if not ____exports.CustomUIHandler.instance then
        ____exports.CustomUIHandler.instance = __TS__New(____exports.CustomUIHandler)
    end
    return ____exports.CustomUIHandler.instance
end
function CustomUIHandler.prototype.registerEventHandlers(self)
    CustomGameEventManager:RegisterListener(
        "button_clicked",
        function(_, data)
            self:onButtonClicked(data)
        end
    )
    CustomGameEventManager:RegisterListener(
        "request_gold_bonus",
        function(_, data)
            self:onGoldBonusRequested(data)
        end
    )
    CustomGameEventManager:RegisterListener(
        "custom_panel_action",
        function(_, data)
            self:onCustomPanelAction(data)
        end
    )
end
function CustomUIHandler.prototype.onButtonClicked(self, data)
    local playerId = data.PlayerID
    local count = data.count or 1
    print(((("[CustomUIHandler] Player " .. tostring(playerId)) .. " clicked button ") .. tostring(count)) .. " times")
    CustomGameEventManager:Send_ServerToAllClients(
        "button_click_response",
        {
            playerId = playerId,
            count = count,
            message = ("Server received click #" .. tostring(count)) .. "!"
        }
    )
end
function CustomUIHandler.prototype.onGoldBonusRequested(self, data)
    local playerId = data.playerId
    local amount = data.amount or 100
    print(((("[CustomUIHandler] Player " .. tostring(playerId)) .. " requested ") .. tostring(amount)) .. " gold bonus")
    if not PlayerResource:IsValidPlayer(playerId) then
        print("[CustomUIHandler] Invalid player ID: " .. tostring(playerId))
        return
    end
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero then
        print("[CustomUIHandler] No hero found for player " .. tostring(playerId))
        return
    end
    do
        local function ____catch(____error)
            print("[CustomUIHandler] Error granting gold: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            CustomGameEventManager:Send_ServerToPlayer(
                PlayerResource:GetPlayer(playerId),
                "gold_bonus_granted",
                {amount = amount, newTotal = 999}
            )
            print((("[CustomUIHandler] Granted " .. tostring(amount)) .. " gold to player ") .. tostring(playerId))
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function CustomUIHandler.prototype.onCustomPanelAction(self, data)
    local playerId = data.playerId
    local action = data.action
    local params = data.params or ({})
    print((("[CustomUIHandler] Player " .. tostring(playerId)) .. " performed action: ") .. tostring(action))
    repeat
        local ____switch16 = action
        local ____cond16 = ____switch16 == "spawn_unit"
        if ____cond16 then
            self:handleSpawnUnit(playerId, params)
            break
        end
        ____cond16 = ____cond16 or ____switch16 == "teleport_hero"
        if ____cond16 then
            self:handleTeleportHero(playerId, params)
            break
        end
        ____cond16 = ____cond16 or ____switch16 == "show_message"
        if ____cond16 then
            self:handleShowMessage(playerId, params)
            break
        end
        do
            print("[CustomUIHandler] Unknown action: " .. tostring(action))
        end
    until true
end
function CustomUIHandler.prototype.handleSpawnUnit(self, playerId, params)
    local unitName = params.unitName or "npc_dota_hero_pudge"
    local position = params.position or Vector(0, 0, 0)
    do
        local function ____catch(____error)
            print("[CustomUIHandler] Error spawning unit: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            local unit = CreateUnitByName(
                unitName,
                position,
                true,
                nil,
                nil,
                3
            )
            if unit then
                print((("[CustomUIHandler] Spawned unit " .. tostring(unitName)) .. " for player ") .. tostring(playerId))
                CustomGameEventManager:Send_ServerToPlayer(
                    PlayerResource:GetPlayer(playerId),
                    "unit_spawned",
                    {unitName = unitName, position = position}
                )
            else
                print("[CustomUIHandler] Failed to spawn unit " .. tostring(unitName))
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function CustomUIHandler.prototype.handleTeleportHero(self, playerId, params)
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero then
        print("[CustomUIHandler] No hero found for teleport request")
        return
    end
    local position = params.position or Vector(0, 0, 0)
    do
        local function ____catch(____error)
            print("[CustomUIHandler] Error teleporting hero: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            FindClearSpaceForUnit(hero, position, true)
            print("[CustomUIHandler] Teleported hero for player " .. tostring(playerId))
            CustomGameEventManager:Send_ServerToPlayer(
                PlayerResource:GetPlayer(playerId),
                "hero_teleported",
                {position = position}
            )
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function CustomUIHandler.prototype.handleShowMessage(self, playerId, params)
    local message = params.message or "Hello from server!"
    local duration = params.duration or 3
    do
        local function ____catch(____error)
            print("[CustomUIHandler] Error showing message: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            local player = PlayerResource:GetPlayer(playerId)
            if player then
                print((("[CustomUIHandler] Showing message to player " .. tostring(playerId)) .. ": ") .. tostring(message))
                CustomGameEventManager:Send_ServerToPlayer(player, "show_ui_message", {message = message, duration = duration})
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function CustomUIHandler.prototype.updateClientUI(self, playerId)
    local ____temp_2 = GameRules:GetGameTime()
    local ____opt_0 = GameRules.GameModeManager
    local gameState = {
        currentTime = ____temp_2,
        gameMode = ____opt_0 and ____opt_0:getCurrentMode() or "unknown",
        playersConnected = PlayerResource:GetPlayerCount()
    }
    if playerId ~= nil then
        CustomGameEventManager:Send_ServerToPlayer(
            PlayerResource:GetPlayer(playerId),
            "ui_data_update",
            gameState
        )
    else
        CustomGameEventManager:Send_ServerToAllClients("ui_data_update", gameState)
    end
end
function CustomUIHandler.prototype.startPeriodicUpdates(self)
    Timers:CreateTimer(
        5,
        function()
            self:updateClientUI()
            return 5
        end
    )
end
function CustomUIHandler.prototype.showUIForGameMode(self, mode)
    print("[CustomUIHandler] Showing UI for game mode: " .. mode)
    repeat
        local ____switch36 = mode
        local ____cond36 = ____switch36 == "training"
        if ____cond36 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "training"})
            break
        end
        ____cond36 = ____cond36 or ____switch36 == "autochess"
        if ____cond36 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "autochess"})
            break
        end
        ____cond36 = ____cond36 or ____switch36 == "normal"
        do
            CustomGameEventManager:Send_ServerToAllClients("hide_all_panels", {})
            break
        end
    until true
end
function CustomUIHandler.prototype.integrateWithGameMode(self)
    if GameRules.GameModeManager then
        local currentMode = GameRules.GameModeManager:getCurrentMode()
        self:showUIForGameMode(currentMode)
    end
    self:startPeriodicUpdates()
    print("[CustomUIHandler] Integrated with game mode system")
end
function CustomUIHandler.prototype.handleDebugUICommand(self, command, playerId)
    repeat
        local ____switch40 = command
        local ____cond40 = ____switch40 == "show_simple"
        if ____cond40 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "simple"})
            break
        end
        ____cond40 = ____cond40 or ____switch40 == "show_custom"
        if ____cond40 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "custom"})
            break
        end
        ____cond40 = ____cond40 or ____switch40 == "hide_all"
        if ____cond40 then
            CustomGameEventManager:Send_ServerToAllClients("hide_all_panels", {})
            break
        end
        do
            print("[CustomUIHandler] Unknown debug UI command: " .. command)
        end
    until true
end
____exports.CustomUI = ____exports.CustomUIHandler:getInstance()
return ____exports
