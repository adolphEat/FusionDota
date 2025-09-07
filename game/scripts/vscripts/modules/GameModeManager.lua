local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 6,["13"] = 7,["14"] = 8,["15"] = 9,["16"] = 10,["17"] = 29,["18"] = 29,["19"] = 29,["21"] = 34,["22"] = 34,["23"] = 34,["24"] = 34,["25"] = 34,["26"] = 40,["27"] = 41,["28"] = 33,["29"] = 44,["30"] = 45,["31"] = 46,["33"] = 48,["34"] = 44,["35"] = 54,["36"] = 54,["37"] = 54,["39"] = 55,["40"] = 56,["41"] = 57,["43"] = 60,["44"] = 61,["45"] = 62,["46"] = 63,["48"] = 66,["49"] = 67,["50"] = 70,["51"] = 73,["52"] = 75,["53"] = 76,["54"] = 54,["55"] = 82,["56"] = 83,["57"] = 82,["58"] = 89,["59"] = 90,["60"] = 91,["61"] = 89,["62"] = 97,["63"] = 98,["64"] = 97,["65"] = 104,["66"] = 105,["67"] = 104,["68"] = 111,["69"] = 112,["70"] = 111,["71"] = 118,["72"] = 120,["73"] = 122,["74"] = 123,["76"] = 127,["77"] = 129,["78"] = 132,["79"] = 118,["80"] = 138,["81"] = 140,["82"] = 141,["84"] = 145,["85"] = 146,["86"] = 147,["88"] = 151,["89"] = 152,["90"] = 153,["92"] = 156,["93"] = 138,["94"] = 162,["95"] = 164,["96"] = 165,["97"] = 168,["98"] = 169,["99"] = 170,["100"] = 171,["102"] = 175,["103"] = 176,["106"] = 180,["107"] = 181,["109"] = 182,["112"] = 184,["114"] = 185,["117"] = 187,["119"] = 188,["123"] = 162,["124"] = 196,["125"] = 201,["126"] = 205,["127"] = 206,["128"] = 207,["129"] = 209,["130"] = 196,["131"] = 215,["132"] = 218,["133"] = 219,["134"] = 220,["135"] = 221,["136"] = 225,["137"] = 228,["138"] = 229,["139"] = 230,["140"] = 233,["141"] = 235,["142"] = 215,["143"] = 241,["144"] = 244,["145"] = 245,["146"] = 246,["147"] = 248,["148"] = 241,["149"] = 254,["150"] = 255,["151"] = 256,["152"] = 257,["153"] = 258,["154"] = 259,["155"] = 260,["156"] = 261,["157"] = 262,["158"] = 265,["159"] = 266,["160"] = 267,["161"] = 269,["162"] = 254,["163"] = 275,["164"] = 276,["165"] = 276,["166"] = 276,["169"] = 291,["173"] = 279,["174"] = 280,["178"] = 283,["182"] = 286,["184"] = 287,["194"] = 275,["195"] = 299,["196"] = 301,["197"] = 301,["198"] = 301,["199"] = 301,["200"] = 301,["201"] = 301,["202"] = 301,["203"] = 301,["204"] = 308,["205"] = 309,["207"] = 299,["208"] = 320,["209"] = 321,["210"] = 322,["211"] = 322,["212"] = 322,["213"] = 322,["214"] = 322,["215"] = 322,["216"] = 322,["217"] = 322,["218"] = 322,["219"] = 322,["221"] = 320,["222"] = 334,["223"] = 335,["224"] = 336,["225"] = 336,["226"] = 336,["227"] = 336,["228"] = 336,["229"] = 336,["230"] = 335,["231"] = 344,["232"] = 344,["233"] = 344,["234"] = 344,["235"] = 344,["236"] = 344,["237"] = 344,["238"] = 335,["239"] = 358,["240"] = 358,["241"] = 358,["242"] = 358,["243"] = 358,["244"] = 358,["245"] = 365,["246"] = 365,["247"] = 365,["248"] = 365,["249"] = 365,["250"] = 365,["251"] = 365,["252"] = 358,["253"] = 335,["254"] = 374,["255"] = 374,["256"] = 374,["257"] = 374,["258"] = 374,["259"] = 374,["260"] = 335,["261"] = 334,["262"] = 388,["263"] = 389,["264"] = 389,["265"] = 389,["266"] = 389,["267"] = 389,["268"] = 389,["269"] = 389,["270"] = 389,["271"] = 388});
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
    for ____, ____value in ipairs(__TS__ObjectEntries(rules)) do
        local key = ____value[1]
        local value = ____value[2]
        do
            local function ____catch(____error)
                print((("[GameModeManager] Failed to apply custom rule " .. tostring(key)) .. ": ") .. tostring(____error))
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
                timestamp = Date:now()
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
