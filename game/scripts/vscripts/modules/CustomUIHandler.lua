local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 6,["11"] = 6,["12"] = 6,["14"] = 10,["15"] = 11,["16"] = 9,["17"] = 14,["18"] = 15,["19"] = 16,["21"] = 18,["22"] = 14,["23"] = 24,["24"] = 26,["25"] = 26,["26"] = 26,["27"] = 27,["28"] = 26,["29"] = 26,["30"] = 31,["31"] = 31,["32"] = 31,["33"] = 32,["34"] = 31,["35"] = 31,["36"] = 36,["37"] = 36,["38"] = 36,["39"] = 37,["40"] = 36,["41"] = 36,["42"] = 41,["43"] = 41,["44"] = 41,["45"] = 42,["46"] = 41,["47"] = 41,["48"] = 45,["49"] = 45,["50"] = 45,["51"] = 46,["52"] = 45,["53"] = 45,["54"] = 49,["55"] = 49,["56"] = 49,["57"] = 50,["58"] = 49,["59"] = 49,["60"] = 54,["61"] = 54,["62"] = 54,["63"] = 55,["64"] = 54,["65"] = 54,["66"] = 24,["67"] = 62,["68"] = 63,["69"] = 64,["70"] = 66,["71"] = 72,["72"] = 72,["73"] = 72,["74"] = 72,["75"] = 72,["76"] = 72,["77"] = 72,["78"] = 72,["79"] = 62,["80"] = 82,["81"] = 83,["82"] = 84,["83"] = 86,["84"] = 89,["85"] = 90,["88"] = 95,["89"] = 96,["90"] = 97,["95"] = 115,["98"] = 108,["99"] = 108,["100"] = 108,["101"] = 108,["102"] = 108,["103"] = 113,["109"] = 82,["110"] = 122,["111"] = 123,["112"] = 124,["113"] = 126,["115"] = 128,["116"] = 129,["118"] = 130,["122"] = 133,["125"] = 122,["126"] = 140,["127"] = 141,["128"] = 142,["129"] = 143,["130"] = 145,["132"] = 147,["133"] = 148,["135"] = 149,["138"] = 151,["140"] = 152,["143"] = 154,["145"] = 155,["148"] = 157,["150"] = 158,["154"] = 161,["157"] = 140,["158"] = 168,["159"] = 169,["160"] = 170,["163"] = 194,["166"] = 173,["167"] = 173,["168"] = 173,["169"] = 173,["170"] = 173,["171"] = 173,["172"] = 173,["173"] = 173,["174"] = 182,["175"] = 183,["176"] = 186,["177"] = 186,["178"] = 186,["179"] = 186,["180"] = 186,["182"] = 191,["189"] = 168,["190"] = 201,["191"] = 202,["192"] = 203,["193"] = 204,["196"] = 208,["199"] = 219,["202"] = 211,["203"] = 212,["204"] = 215,["205"] = 215,["206"] = 215,["207"] = 215,["208"] = 215,["214"] = 201,["215"] = 226,["216"] = 227,["217"] = 228,["220"] = 245,["223"] = 232,["224"] = 233,["225"] = 236,["226"] = 239,["233"] = 226,["234"] = 252,["235"] = 254,["236"] = 255,["237"] = 253,["238"] = 253,["239"] = 253,["240"] = 253,["241"] = 253,["242"] = 259,["243"] = 261,["244"] = 261,["245"] = 261,["246"] = 261,["247"] = 261,["249"] = 264,["251"] = 252,["252"] = 271,["253"] = 273,["254"] = 273,["255"] = 273,["256"] = 274,["257"] = 275,["258"] = 273,["259"] = 273,["260"] = 271,["261"] = 282,["262"] = 283,["264"] = 285,["265"] = 286,["267"] = 287,["270"] = 291,["272"] = 292,["275"] = 296,["277"] = 299,["281"] = 282,["282"] = 307,["283"] = 309,["284"] = 311,["285"] = 312,["287"] = 316,["288"] = 318,["289"] = 307,["290"] = 324,["292"] = 325,["293"] = 326,["295"] = 327,["298"] = 331,["300"] = 332,["303"] = 336,["305"] = 337,["309"] = 340,["312"] = 324,["313"] = 347,["314"] = 348,["315"] = 349,["316"] = 351,["317"] = 352,["319"] = 354,["321"] = 347,["322"] = 361,["323"] = 362,["324"] = 363,["325"] = 365,["326"] = 366,["328"] = 368,["330"] = 361,["331"] = 375,["332"] = 376,["333"] = 377,["334"] = 378,["335"] = 380,["336"] = 381,["338"] = 383,["340"] = 375,["341"] = 390,["342"] = 391,["343"] = 393,["344"] = 394,["347"] = 399,["348"] = 400,["349"] = 402,["350"] = 405,["351"] = 406,["352"] = 408,["353"] = 408,["354"] = 408,["355"] = 408,["356"] = 412,["357"] = 413,["358"] = 414,["362"] = 419,["363"] = 423,["364"] = 423,["365"] = 423,["366"] = 423,["367"] = 423,["368"] = 423,["369"] = 423,["370"] = 423,["371"] = 441,["372"] = 442,["373"] = 442,["374"] = 442,["375"] = 442,["376"] = 442,["377"] = 423,["378"] = 423,["379"] = 453,["380"] = 454,["381"] = 455,["382"] = 390,["383"] = 460});
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
    CustomGameEventManager:RegisterListener(
        "autochess_wave_continue",
        function(_, data)
            self:onWaveContinue(data)
        end
    )
    CustomGameEventManager:RegisterListener(
        "autochess_wave_claim_reward",
        function(_, data)
            self:onWaveClaimReward(data)
        end
    )
    CustomGameEventManager:RegisterListener(
        "autochess_wave_select_stage",
        function(_, data)
            self:onWaveSelectStage(data)
        end
    )
    CustomGameEventManager:RegisterListener(
        "quick_action",
        function(_, data)
            self:onQuickAction(data)
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
function CustomUIHandler.prototype.onQuickAction(self, data)
    local playerId = data.PlayerID
    local action = data.action
    print((("[CustomUIHandler] Quick action received: " .. tostring(action)) .. " from player ") .. tostring(playerId))
    repeat
        local ____switch20 = action
        local ____cond20 = ____switch20 == "test_kill"
        if ____cond20 then
            self:handleTestKillEnemies(playerId)
            break
        end
        do
            print("[CustomUIHandler] Unknown quick action: " .. tostring(action))
        end
    until true
end
function CustomUIHandler.prototype.onCustomPanelAction(self, data)
    local playerId = data.playerId
    local action = data.action
    local params = data.params or ({})
    print((("[CustomUIHandler] Player " .. tostring(playerId)) .. " performed action: ") .. tostring(action))
    repeat
        local ____switch22 = action
        local ____cond22 = ____switch22 == "spawn_unit"
        if ____cond22 then
            self:handleSpawnUnit(playerId, params)
            break
        end
        ____cond22 = ____cond22 or ____switch22 == "teleport_hero"
        if ____cond22 then
            self:handleTeleportHero(playerId, params)
            break
        end
        ____cond22 = ____cond22 or ____switch22 == "show_message"
        if ____cond22 then
            self:handleShowMessage(playerId, params)
            break
        end
        ____cond22 = ____cond22 or ____switch22 == "test_kill"
        if ____cond22 then
            self:handleTestKillEnemies(playerId)
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
        local ____switch42 = mode
        local ____cond42 = ____switch42 == "training"
        if ____cond42 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "training"})
            break
        end
        ____cond42 = ____cond42 or ____switch42 == "autochess"
        if ____cond42 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "autochess"})
            break
        end
        ____cond42 = ____cond42 or ____switch42 == "normal"
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
        local ____switch46 = command
        local ____cond46 = ____switch46 == "show_simple"
        if ____cond46 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "simple"})
            break
        end
        ____cond46 = ____cond46 or ____switch46 == "show_custom"
        if ____cond46 then
            CustomGameEventManager:Send_ServerToAllClients("show_custom_panel", {panelType = "custom"})
            break
        end
        ____cond46 = ____cond46 or ____switch46 == "hide_all"
        if ____cond46 then
            CustomGameEventManager:Send_ServerToAllClients("hide_all_panels", {})
            break
        end
        do
            print("[CustomUIHandler] Unknown debug UI command: " .. command)
        end
    until true
end
function CustomUIHandler.prototype.onWaveContinue(self, data)
    local playerId = data.playerId
    print("[CustomUIHandler] Wave continue requested by player " .. tostring(playerId))
    if GameRules.AutoChessMode then
        GameRules.AutoChessMode:handleWaveContinue(playerId)
    else
        print("[CustomUIHandler] AutoChessMode not available")
    end
end
function CustomUIHandler.prototype.onWaveClaimReward(self, data)
    local playerId = data.playerId
    print("[CustomUIHandler] Wave reward claim requested by player " .. tostring(playerId))
    if GameRules.AutoChessMode then
        GameRules.AutoChessMode:handleWaveRewardClaim(playerId)
    else
        print("[CustomUIHandler] AutoChessMode not available")
    end
end
function CustomUIHandler.prototype.onWaveSelectStage(self, data)
    local playerId = data.playerId
    local stageId = data.stageId
    print((("[CustomUIHandler] Wave stage selection by player " .. tostring(playerId)) .. ": ") .. tostring(stageId))
    if GameRules.AutoChessMode then
        GameRules.AutoChessMode:handleWaveStageSelection(playerId, stageId)
    else
        print("[CustomUIHandler] AutoChessMode not available")
    end
end
function CustomUIHandler.prototype.handleTestKillEnemies(self, playerId)
    print("[CustomUIHandler] Test kill enemies requested by player " .. tostring(playerId))
    if not GameRules.AutoChessMode then
        print("[CustomUIHandler] AutoChessMode not available")
        return
    end
    local allUnits = Entities:FindAllByClassname("npc_dota_creature")
    local heroes = Entities:FindAllByClassname("npc_dota_hero")
    local killedCount = 0
    for ____, unit in ipairs(allUnits) do
        if unit and not unit:IsNull() and unit:IsAlive() then
            local isPlayerHero = __TS__ArraySome(
                heroes,
                function(____, hero) return hero == unit and hero:IsRealHero() and hero:GetPlayerOwnerID() >= 0 end
            )
            if not isPlayerHero then
                unit:ForceKill(false)
                killedCount = killedCount + 1
            end
        end
    end
    print(("[CustomUIHandler] Test killed " .. tostring(killedCount)) .. " enemy units")
    local settlementData = {
        winner = "player",
        round = 1,
        duration = 10000,
        stats = {damageDealt = 12540, damageTaken = 8320, unitsKilled = killedCount, unitsSurvived = 1},
        levelName = "测试关卡",
        rewardGold = 100,
        availableStages = {{id = "stage_easy", name = "绿意平原", difficulty = "简单"}, {id = "stage_medium", name = "霜冻峡谷", difficulty = "普通"}, {id = "stage_hard", name = "灼炎堡垒", difficulty = "困难"}},
        playerSummary = {[playerId] = {
            health = 100,
            gold = 500,
            isAlive = true,
            winStreak = 0,
            lossStreak = 0
        }}
    }
    CustomGameEventManager:Send_ServerToAllClients("autochess_wave_settlement", settlementData)
    print("[CustomUIHandler] Sent settlement event to all clients")
    print((((("[CustomUIHandler] Settlement data - round: " .. tostring(settlementData.round)) .. ", winner: ") .. settlementData.winner) .. ", duration: ") .. tostring(settlementData.duration))
end
____exports.CustomUI = ____exports.CustomUIHandler:getInstance()
return ____exports
