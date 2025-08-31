local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 6,["11"] = 7,["12"] = 8,["13"] = 9,["14"] = 10,["15"] = 29,["16"] = 29,["17"] = 29,["19"] = 34,["20"] = 34,["21"] = 34,["22"] = 34,["23"] = 34,["24"] = 40,["25"] = 41,["26"] = 33,["27"] = 44,["28"] = 45,["29"] = 46,["31"] = 48,["32"] = 44,["33"] = 54,["34"] = 54,["35"] = 54,["37"] = 55,["38"] = 56,["39"] = 57,["41"] = 60,["42"] = 61,["43"] = 62,["44"] = 63,["46"] = 66,["47"] = 67,["48"] = 70,["49"] = 73,["50"] = 75,["51"] = 76,["52"] = 54,["53"] = 82,["54"] = 83,["55"] = 82,["56"] = 89,["57"] = 90,["58"] = 91,["59"] = 89,["60"] = 97,["61"] = 98,["62"] = 97,["63"] = 104,["64"] = 105,["65"] = 104,["66"] = 111,["67"] = 112,["68"] = 111,["69"] = 118,["70"] = 120,["71"] = 122,["72"] = 123,["74"] = 127,["75"] = 129,["76"] = 132,["77"] = 118,["78"] = 138,["79"] = 140,["80"] = 141,["82"] = 145,["83"] = 146,["84"] = 147,["86"] = 151,["87"] = 152,["88"] = 153,["90"] = 156,["91"] = 138,["92"] = 162,["93"] = 164,["94"] = 165,["95"] = 168,["96"] = 169,["97"] = 170,["98"] = 171,["100"] = 175,["101"] = 176,["104"] = 180,["105"] = 181,["107"] = 182,["110"] = 184,["112"] = 185,["115"] = 187,["117"] = 188,["121"] = 162,["122"] = 196,["123"] = 201,["124"] = 205,["125"] = 206,["126"] = 207,["127"] = 209,["128"] = 196,["129"] = 215,["130"] = 218,["131"] = 219,["132"] = 220,["133"] = 221,["134"] = 225,["135"] = 228,["136"] = 229,["137"] = 230,["138"] = 233,["139"] = 235,["140"] = 215,["141"] = 241,["142"] = 244,["143"] = 245,["144"] = 246,["145"] = 248,["146"] = 241,["147"] = 254,["148"] = 255,["149"] = 256,["150"] = 257,["151"] = 258,["152"] = 259,["153"] = 260,["154"] = 261,["155"] = 262,["156"] = 265,["157"] = 266,["158"] = 267,["159"] = 269,["160"] = 254,["161"] = 275,["162"] = 276,["163"] = 277,["166"] = 292,["170"] = 280,["171"] = 281,["175"] = 284,["179"] = 287,["181"] = 288,["191"] = 275,["192"] = 300,["193"] = 302,["194"] = 302,["195"] = 302,["196"] = 302,["197"] = 302,["198"] = 302,["199"] = 302,["200"] = 302,["201"] = 309,["202"] = 310,["204"] = 300,["205"] = 321,["206"] = 322,["207"] = 323,["208"] = 323,["209"] = 323,["210"] = 323,["211"] = 323,["212"] = 323,["213"] = 323,["214"] = 323,["215"] = 323,["216"] = 323,["218"] = 321,["219"] = 335,["220"] = 336,["221"] = 337,["222"] = 337,["223"] = 337,["224"] = 337,["225"] = 337,["226"] = 337,["227"] = 336,["228"] = 345,["229"] = 345,["230"] = 345,["231"] = 345,["232"] = 345,["233"] = 345,["234"] = 345,["235"] = 336,["236"] = 359,["237"] = 359,["238"] = 359,["239"] = 359,["240"] = 359,["241"] = 359,["242"] = 366,["243"] = 366,["244"] = 366,["245"] = 366,["246"] = 366,["247"] = 366,["248"] = 366,["249"] = 359,["250"] = 336,["251"] = 375,["252"] = 375,["253"] = 375,["254"] = 375,["255"] = 375,["256"] = 375,["257"] = 336,["258"] = 335,["259"] = 389,["260"] = 390,["261"] = 391,["262"] = 392,["264"] = 394,["265"] = 389,["266"] = 397,["267"] = 398,["268"] = 398,["269"] = 398,["270"] = 398,["271"] = 398,["272"] = 398,["273"] = 398,["274"] = 398,["275"] = 397});
local ____exports = {}
--- 游戏模式管理器 - 管理不同的游戏模式（正常模式、练功房模式等）
-- Game Mode Manager - Manages different game modes (normal, training, etc.)
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
        currentMode = ____exports.GameMode.NORMAL,
        modeConfigs = self:getDefaultModeConfigs(),
        initialized = false
    }
    self:initializeGameMode()
    print("[GameModeManager] Initialized")
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
    if self.settings.initialized and not force then
        print("[GameModeManager] Cannot switch mode after game initialization. Use force=true to override.")
        return false
    end
    local config = self.settings.modeConfigs[mode]
    if not config then
        print("[GameModeManager] Unknown game mode: " .. mode)
        return false
    end
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
    if detectedMode ~= ____exports.GameMode.NORMAL then
        self:switchMode(detectedMode)
    end
    self:setupBaseGameRules()
    self.settings.initialized = true
    self:syncToNetTable()
end
function GameModeManager.prototype.detectGameMode(self)
    if IsInToolsMode() then
        return ____exports.GameMode.TRAINING
    end
    local mapName = GetMapName()
    if __TS__StringIncludes(mapName, "training") or __TS__StringIncludes(mapName, "temp") then
        return ____exports.GameMode.TRAINING
    end
    local playerCount = PlayerResource:GetPlayerCount()
    if playerCount == 1 then
        return ____exports.GameMode.TRAINING
    end
    return ____exports.GameMode.NORMAL
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
        local ____switch22 = config.mode
        local ____cond22 = ____switch22 == ____exports.GameMode.TRAINING
        if ____cond22 then
            self:setupTrainingMode()
            break
        end
        ____cond22 = ____cond22 or ____switch22 == ____exports.GameMode.AUTOCHESS
        if ____cond22 then
            self:setupAutoChessMode()
            break
        end
        ____cond22 = ____cond22 or ____switch22 == ____exports.GameMode.NORMAL
        if ____cond22 then
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
    print("[GameModeManager] AutoChess mode configured")
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
    for key in pairs(rules) do
        local value = rules[key]
        do
            local function ____catch(____error)
                print((("[GameModeManager] Failed to apply custom rule " .. key) .. ": ") .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                repeat
                    local ____switch30 = key
                    local ____cond30 = ____switch30 == "startingGold"
                    if ____cond30 then
                        break
                    end
                    ____cond30 = ____cond30 or ____switch30 == "startingLevel"
                    if ____cond30 then
                        break
                    end
                    ____cond30 = ____cond30 or ____switch30 == "customSpeed"
                    if ____cond30 then
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
    if GameRules.ErrorTracker then
        GameRules.ErrorTracker:reportCustomError((("Game mode switched: " .. previousMode) .. " → ") .. newMode, {module = "GameModeManager", ["function"] = "onModeChanged", customData = {previousMode = previousMode, newMode = newMode}})
    end
end
function GameModeManager.prototype.syncToNetTable(self)
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "game_mode",
            "current",
            {
                mode = self.settings.currentMode,
                config = self:getModeConfig(),
                initialized = self.settings.initialized,
                timestamp = GameRules:GetGameTime() * 1000
            }
        )
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
function GameModeManager.prototype.getAvailableModesList(self)
    local modes = {}
    for mode in pairs(self.settings.modeConfigs) do
        modes[#modes + 1] = mode
    end
    return modes
end
function GameModeManager.prototype.getStatus(self)
    return {
        currentMode = self.settings.currentMode,
        config = self:getModeConfig(),
        initialized = self.settings.initialized,
        availableModes = self:getAvailableModesList(),
        isCheatsEnabled = self:isCheatsEnabled(),
        isTrainingMode = self:isTrainingMode()
    }
end
return ____exports
