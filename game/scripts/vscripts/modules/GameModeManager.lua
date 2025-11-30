local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 6,["11"] = 6,["12"] = 8,["13"] = 9,["14"] = 10,["15"] = 11,["16"] = 12,["17"] = 31,["18"] = 31,["19"] = 31,["21"] = 36,["22"] = 36,["23"] = 36,["24"] = 36,["25"] = 36,["26"] = 42,["27"] = 35,["28"] = 45,["29"] = 46,["30"] = 47,["32"] = 49,["33"] = 45,["34"] = 55,["35"] = 55,["36"] = 55,["38"] = 57,["39"] = 58,["40"] = 59,["41"] = 60,["43"] = 63,["44"] = 64,["45"] = 65,["46"] = 66,["47"] = 67,["49"] = 70,["50"] = 71,["51"] = 72,["52"] = 75,["53"] = 78,["54"] = 80,["55"] = 81,["56"] = 55,["57"] = 87,["58"] = 88,["59"] = 87,["60"] = 94,["61"] = 95,["62"] = 96,["63"] = 94,["64"] = 102,["65"] = 103,["66"] = 102,["67"] = 109,["68"] = 110,["69"] = 109,["70"] = 116,["71"] = 117,["72"] = 116,["73"] = 123,["74"] = 125,["75"] = 127,["76"] = 130,["77"] = 131,["78"] = 132,["80"] = 135,["81"] = 136,["82"] = 137,["83"] = 138,["86"] = 143,["87"] = 146,["88"] = 149,["89"] = 151,["90"] = 154,["91"] = 154,["92"] = 154,["93"] = 155,["94"] = 156,["95"] = 156,["96"] = 156,["97"] = 156,["98"] = 156,["99"] = 156,["100"] = 156,["101"] = 156,["102"] = 161,["103"] = 154,["104"] = 154,["105"] = 123,["106"] = 168,["107"] = 170,["108"] = 171,["109"] = 174,["110"] = 175,["111"] = 176,["113"] = 179,["114"] = 180,["115"] = 181,["117"] = 185,["118"] = 186,["119"] = 187,["121"] = 191,["122"] = 192,["123"] = 194,["125"] = 198,["126"] = 168,["127"] = 204,["128"] = 206,["129"] = 207,["130"] = 210,["131"] = 211,["132"] = 212,["133"] = 213,["135"] = 217,["136"] = 218,["139"] = 222,["140"] = 223,["142"] = 224,["145"] = 226,["147"] = 227,["150"] = 229,["152"] = 230,["156"] = 204,["157"] = 238,["158"] = 243,["159"] = 247,["160"] = 248,["161"] = 249,["162"] = 251,["163"] = 238,["164"] = 257,["165"] = 260,["166"] = 261,["167"] = 262,["168"] = 263,["169"] = 267,["170"] = 270,["171"] = 271,["172"] = 272,["173"] = 275,["174"] = 278,["175"] = 279,["176"] = 281,["177"] = 257,["178"] = 287,["179"] = 290,["180"] = 291,["181"] = 292,["182"] = 294,["183"] = 287,["184"] = 300,["185"] = 301,["186"] = 302,["187"] = 303,["188"] = 304,["189"] = 305,["190"] = 306,["191"] = 307,["192"] = 308,["193"] = 311,["194"] = 312,["195"] = 313,["196"] = 315,["197"] = 300,["198"] = 321,["199"] = 322,["200"] = 322,["201"] = 322,["204"] = 337,["208"] = 325,["209"] = 326,["213"] = 329,["217"] = 332,["219"] = 333,["229"] = 321,["230"] = 345,["231"] = 347,["232"] = 347,["233"] = 347,["234"] = 347,["235"] = 347,["236"] = 347,["237"] = 347,["238"] = 347,["239"] = 353,["240"] = 355,["241"] = 356,["243"] = 345,["244"] = 367,["245"] = 368,["246"] = 369,["247"] = 369,["248"] = 369,["249"] = 369,["250"] = 369,["251"] = 369,["252"] = 376,["253"] = 377,["255"] = 379,["257"] = 367,["258"] = 386,["259"] = 387,["260"] = 388,["261"] = 388,["262"] = 388,["263"] = 388,["264"] = 388,["265"] = 388,["266"] = 387,["267"] = 396,["268"] = 396,["269"] = 396,["270"] = 396,["271"] = 396,["272"] = 396,["273"] = 396,["274"] = 387,["275"] = 410,["276"] = 410,["277"] = 410,["278"] = 410,["279"] = 410,["280"] = 410,["281"] = 417,["282"] = 417,["283"] = 417,["284"] = 417,["285"] = 417,["286"] = 417,["287"] = 417,["288"] = 410,["289"] = 387,["290"] = 426,["291"] = 426,["292"] = 426,["293"] = 426,["294"] = 426,["295"] = 426,["296"] = 387,["297"] = 386,["298"] = 440,["299"] = 441,["300"] = 441,["301"] = 441,["302"] = 441,["303"] = 441,["304"] = 441,["305"] = 441,["306"] = 441,["307"] = 440});
local ____exports = {}
local ____time_utils = require("utils.time_utils")
local getTimestamp = ____time_utils.getTimestamp
____exports.GameMode = GameMode or ({})
____exports.GameMode.NORMAL = "normal"
____exports.GameMode.TRAINING = "training"
____exports.GameMode.AUTOCHESS = "autochess"
____exports.GameMode.CUSTOM = "custom"
____exports.GameModeManager = __TS__Class()
local GameModeManager = ____exports.GameModeManager
GameModeManager.name = "GameModeManager"
function GameModeManager.prototype.____constructor(self)
    self.settings = {
        currentMode = ____exports.GameMode.AUTOCHESS,
        modeConfigs = self:getDefaultModeConfigs(),
        initialized = false
    }
    self:initializeGameMode()
end
function GameModeManager.getInstance(self)
    if not ____exports.GameModeManager.instance then
        ____exports.GameModeManager.instance = __TS__New(____exports.GameModeManager)
    end
    return ____exports.GameModeManager.instance
end
function GameModeManager.prototype.switchMode(self, mode, force)
    if force == nil then
        force = false
    end
    print("_____________________________________1")
    if self.settings.initialized and not force then
        print("[GameModeManager] Cannot switch mode after game initialization. Use force=true to override.")
        return false
    end
    print("_____________________________________2")
    local config = self.settings.modeConfigs[mode]
    if not config then
        print("[GameModeManager] Unknown game mode: " .. mode)
        return false
    end
    print("_____________________________________3")
    local previousMode = self.settings.currentMode
    self.settings.currentMode = mode
    self:applyModeSettings(config)
    self:onModeChanged(previousMode, mode)
    print((("[GameModeManager] Switched from " .. previousMode) .. " to ") .. mode)
    return true
end
function GameModeManager.prototype.getCurrentMode(self)
    return self.settings.currentMode
end
function GameModeManager.prototype.getModeConfig(self, mode)
    local targetMode = mode or self.settings.currentMode
    return self.settings.modeConfigs[targetMode]
end
function GameModeManager.prototype.isTrainingMode(self)
    return self.settings.currentMode == ____exports.GameMode.TRAINING
end
function GameModeManager.prototype.isAutoChessMode(self)
    return self.settings.currentMode == ____exports.GameMode.AUTOCHESS
end
function GameModeManager.prototype.isCheatsEnabled(self)
    return self:getModeConfig().enableCheats
end
function GameModeManager.prototype.initializeGameMode(self)
    local detectedMode = self:detectGameMode()
    print((("[GameModeManager] Initializing game mode. Current: " .. self.settings.currentMode) .. ", Detected: ") .. detectedMode)
    if detectedMode ~= self.settings.currentMode then
        print((("[GameModeManager] Switching from " .. self.settings.currentMode) .. " to ") .. detectedMode)
        self:switchMode(detectedMode)
    else
        print(("[GameModeManager] Mode already set to " .. detectedMode) .. ", applying settings...")
        local config = self.settings.modeConfigs[detectedMode]
        if config then
            self:applyModeSettings(config)
        end
    end
    self:setupBaseGameRules()
    self.settings.initialized = true
    self:syncToNetTable()
    print("[GameModeManager] Game mode initialized: " .. self.settings.currentMode)
    Timers:CreateTimer(
        2,
        function()
            print("[GameModeManager] Sending initial mode notification: " .. self.settings.currentMode)
            CustomGameEventManager:Send_ServerToAllClients(
                "game_mode_changed",
                {
                    previousMode = ____exports.GameMode.NORMAL,
                    newMode = self.settings.currentMode,
                    config = self:getModeConfig()
                }
            )
            return nil
        end
    )
end
function GameModeManager.prototype.detectGameMode(self)
    local mapName = GetMapName()
    print("[GameModeManager] Detecting game mode... Map name: " .. mapName)
    if __TS__StringIncludes(mapName, "battlemap") or __TS__StringIncludes(mapName, "battle") or __TS__StringIncludes(mapName, "autochess") then
        print("[GameModeManager] Detected AUTOCHESS mode from map name")
        return ____exports.GameMode.AUTOCHESS
    end
    if __TS__StringIncludes(mapName, "training") or __TS__StringIncludes(mapName, "temp") then
        print("[GameModeManager] Detected TRAINING mode from map name")
        return ____exports.GameMode.TRAINING
    end
    if IsInToolsMode() then
        print("[GameModeManager] Detected tools mode, defaulting to AUTOCHESS")
        return ____exports.GameMode.AUTOCHESS
    end
    local playerCount = PlayerResource:GetPlayerCount()
    if playerCount == 1 then
        return ____exports.GameMode.AUTOCHESS
    end
    return ____exports.GameMode.AUTOCHESS
end
function GameModeManager.prototype.applyModeSettings(self, config)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, config.maxPlayers)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 0)
    if config.enableCheats then
        GameRules:SetCustomGameSetupAutoLaunchDelay(0)
        GameRules:EnableCustomGameSetupAutoLaunch(false)
        SendToServerConsole("sv_cheats 1")
    end
    if config.customRules then
        self:applyCustomRules(config.customRules)
    end
    repeat
        local ____switch26 = config.mode
        local ____cond26 = ____switch26 == ____exports.GameMode.TRAINING
        if ____cond26 then
            self:setupTrainingMode()
            break
        end
        ____cond26 = ____cond26 or ____switch26 == ____exports.GameMode.AUTOCHESS
        if ____cond26 then
            self:setupAutoChessMode()
            break
        end
        ____cond26 = ____cond26 or ____switch26 == ____exports.GameMode.NORMAL
        if ____cond26 then
            self:setupNormalMode()
            break
        end
    until true
end
function GameModeManager.prototype.setupTrainingMode(self)
    GameRules:SetTimeOfDay(0.25)
    GameRules:SetHeroSelectionTime(10)
    GameRules:SetStrategyTime(0)
    GameRules:SetShowcaseTime(0)
    print("[GameModeManager] Training mode configured")
end
function GameModeManager.prototype.setupAutoChessMode(self)
    GameRules:SetHeroSelectionTime(0)
    GameRules:SetStrategyTime(0)
    GameRules:SetShowcaseTime(0)
    GameRules:SetPreGameTime(5)
    GameRules:SetUseUniversalShopMode(true)
    GameRules:SetHeroRespawnEnabled(false)
    GameRules:SetUseBaseGoldBountyOnHeroes(false)
    GameRules:SetTreeRegrowTime(0)
    GameRules:SetTimeOfDay(0.25)
    SendToServerConsole("sv_cheats 1")
    SendToServerConsole("dota_fog_of_war_disabled 1")
    print("[GameModeManager] AutoChess mode configured with fog disabled")
end
function GameModeManager.prototype.setupNormalMode(self)
    GameRules:SetHeroSelectionTime(30)
    GameRules:SetStrategyTime(30)
    GameRules:SetShowcaseTime(5)
    print("[GameModeManager] Normal mode configured")
end
function GameModeManager.prototype.setupBaseGameRules(self)
    GameRules:SetCustomGameSetupAutoLaunchDelay(10)
    GameRules:SetCustomGameSetupTimeout(60)
    GameRules:SetHeroSelectionTime(30)
    GameRules:SetHeroSelectPenaltyTime(10)
    GameRules:SetPreGameTime(15)
    GameRules:SetTreeRegrowTime(300)
    GameRules:SetCustomGameSetupRemainingTime(10)
    GameRules:SetUseUniversalShopMode(false)
    GameRules:SetGoldPerTick(2)
    GameRules:SetGoldTickTime(0.6)
    GameRules:SetRuneSpawnTime(120)
    print("[GameModeManager] Base game rules configured")
end
function GameModeManager.prototype.applyCustomRules(self, rules)
    for ____, ____value in ipairs(__TS__ObjectEntries(rules)) do
        local key = ____value[1]
        local value = ____value[2]
        do
            local function ____catch(____error)
                print((("[GameModeManager] Failed to apply custom rule " .. tostring(key)) .. ": ") .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                repeat
                    local ____switch34 = key
                    local ____cond34 = ____switch34 == "startingGold"
                    if ____cond34 then
                        break
                    end
                    ____cond34 = ____cond34 or ____switch34 == "startingLevel"
                    if ____cond34 then
                        break
                    end
                    ____cond34 = ____cond34 or ____switch34 == "customSpeed"
                    if ____cond34 then
                        GameRules:SetCustomGameDifficulty(value)
                        break
                    end
                until true
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    end
end
function GameModeManager.prototype.onModeChanged(self, previousMode, newMode)
    CustomGameEventManager:Send_ServerToAllClients(
        "game_mode_changed",
        {
            previousMode = previousMode,
            newMode = newMode,
            config = self:getModeConfig(newMode)
        }
    )
    print("_____________________________________onModeChanged")
    if GameRules.ErrorTracker then
        GameRules.ErrorTracker:reportCustomError((("Game mode switched: " .. previousMode) .. " → ") .. newMode, {module = "GameModeManager", ["function"] = "onModeChanged", customData = {previousMode = previousMode, newMode = newMode}})
    end
end
function GameModeManager.prototype.syncToNetTable(self)
    if GameRules.XNetTable then
        local data = {
            mode = self.settings.currentMode,
            config = self:getModeConfig(),
            initialized = self.settings.initialized,
            timestamp = getTimestamp(nil)
        }
        GameRules.XNetTable:SetTableValue("game_mode", "current", data)
        print((("[GameModeManager] Synced to NetTable: mode=" .. self.settings.currentMode) .. ", initialized=") .. tostring(self.settings.initialized))
    else
        print("[GameModeManager] Warning: XNetTable not available for sync")
    end
end
function GameModeManager.prototype.getDefaultModeConfigs(self)
    return {[____exports.GameMode.NORMAL] = {
        mode = ____exports.GameMode.NORMAL,
        displayName = "正常模式",
        description = "标准的DOTA2游戏模式",
        maxPlayers = 10,
        allowBots = true,
        enableCheats = false
    }, [____exports.GameMode.TRAINING] = {
        mode = ____exports.GameMode.TRAINING,
        displayName = "练功房模式",
        description = "用于测试和训练的模式，支持怪物生成和强度测试",
        maxPlayers = 1,
        allowBots = true,
        enableCheats = true,
        customRules = {startingGold = 10000, startingLevel = 1, infiniteTime = true, fastRespawn = true}
    }, [____exports.GameMode.AUTOCHESS] = {
        mode = ____exports.GameMode.AUTOCHESS,
        displayName = "自走棋模式",
        description = "8人自走棋对战模式，策略布阵，自动战斗",
        maxPlayers = 8,
        allowBots = false,
        enableCheats = false,
        customRules = {
            roundBasedGame = true,
            autoTurnLength = 30,
            battleTurnLength = 45,
            maxRounds = 50,
            chessPoolEnabled = true,
            economySystem = true
        }
    }, [____exports.GameMode.CUSTOM] = {
        mode = ____exports.GameMode.CUSTOM,
        displayName = "自定义模式",
        description = "可自定义规则的游戏模式",
        maxPlayers = 10,
        allowBots = true,
        enableCheats = true
    }}
end
function GameModeManager.prototype.getStatus(self)
    return {
        currentMode = self.settings.currentMode,
        config = self:getModeConfig(),
        initialized = self.settings.initialized,
        availableModes = __TS__ObjectKeys(self.settings.modeConfigs),
        isCheatsEnabled = self:isCheatsEnabled(),
        isTrainingMode = self:isTrainingMode()
    }
end
return ____exports
