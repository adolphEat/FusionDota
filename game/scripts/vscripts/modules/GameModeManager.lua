local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 6,["11"] = 6,["12"] = 8,["13"] = 9,["14"] = 10,["15"] = 11,["16"] = 12,["17"] = 31,["18"] = 31,["19"] = 31,["21"] = 36,["22"] = 36,["23"] = 36,["24"] = 36,["25"] = 36,["26"] = 42,["27"] = 35,["28"] = 45,["29"] = 46,["30"] = 47,["32"] = 49,["33"] = 45,["34"] = 55,["35"] = 55,["36"] = 55,["38"] = 57,["39"] = 58,["40"] = 59,["41"] = 60,["43"] = 63,["44"] = 64,["45"] = 65,["46"] = 66,["47"] = 67,["49"] = 70,["50"] = 71,["51"] = 72,["52"] = 75,["53"] = 78,["54"] = 80,["55"] = 81,["56"] = 55,["57"] = 87,["58"] = 88,["59"] = 87,["60"] = 94,["61"] = 95,["62"] = 96,["63"] = 94,["64"] = 102,["65"] = 103,["66"] = 102,["67"] = 109,["68"] = 110,["69"] = 109,["70"] = 116,["71"] = 117,["72"] = 116,["73"] = 123,["74"] = 125,["75"] = 127,["76"] = 128,["78"] = 132,["79"] = 135,["80"] = 138,["81"] = 141,["82"] = 141,["83"] = 141,["84"] = 142,["85"] = 143,["86"] = 143,["87"] = 143,["88"] = 143,["89"] = 143,["90"] = 143,["91"] = 143,["92"] = 143,["93"] = 148,["94"] = 141,["95"] = 141,["96"] = 123,["97"] = 155,["98"] = 157,["99"] = 158,["100"] = 161,["101"] = 162,["102"] = 163,["104"] = 166,["105"] = 167,["106"] = 168,["108"] = 172,["109"] = 173,["110"] = 174,["112"] = 178,["113"] = 179,["114"] = 180,["116"] = 183,["117"] = 155,["118"] = 189,["119"] = 191,["120"] = 192,["121"] = 195,["122"] = 196,["123"] = 197,["124"] = 198,["126"] = 202,["127"] = 203,["130"] = 207,["131"] = 208,["133"] = 209,["136"] = 211,["138"] = 212,["141"] = 214,["143"] = 215,["147"] = 189,["148"] = 223,["149"] = 228,["150"] = 232,["151"] = 233,["152"] = 234,["153"] = 236,["154"] = 223,["155"] = 242,["156"] = 245,["157"] = 246,["158"] = 247,["159"] = 248,["160"] = 252,["161"] = 255,["162"] = 256,["163"] = 257,["164"] = 260,["165"] = 263,["166"] = 264,["167"] = 266,["168"] = 242,["169"] = 272,["170"] = 275,["171"] = 276,["172"] = 277,["173"] = 279,["174"] = 272,["175"] = 285,["176"] = 286,["177"] = 287,["178"] = 288,["179"] = 289,["180"] = 290,["181"] = 291,["182"] = 292,["183"] = 293,["184"] = 296,["185"] = 297,["186"] = 298,["187"] = 300,["188"] = 285,["189"] = 306,["190"] = 307,["191"] = 307,["192"] = 307,["195"] = 322,["199"] = 310,["200"] = 311,["204"] = 314,["208"] = 317,["210"] = 318,["220"] = 306,["221"] = 330,["222"] = 332,["223"] = 332,["224"] = 332,["225"] = 332,["226"] = 332,["227"] = 332,["228"] = 332,["229"] = 332,["230"] = 338,["231"] = 340,["232"] = 341,["234"] = 330,["235"] = 352,["236"] = 353,["237"] = 354,["238"] = 354,["239"] = 354,["240"] = 354,["241"] = 354,["242"] = 354,["243"] = 361,["244"] = 362,["246"] = 364,["248"] = 352,["249"] = 371,["250"] = 372,["251"] = 373,["252"] = 373,["253"] = 373,["254"] = 373,["255"] = 373,["256"] = 373,["257"] = 372,["258"] = 381,["259"] = 381,["260"] = 381,["261"] = 381,["262"] = 381,["263"] = 381,["264"] = 381,["265"] = 372,["266"] = 395,["267"] = 395,["268"] = 395,["269"] = 395,["270"] = 395,["271"] = 395,["272"] = 402,["273"] = 402,["274"] = 402,["275"] = 402,["276"] = 402,["277"] = 402,["278"] = 402,["279"] = 395,["280"] = 372,["281"] = 411,["282"] = 411,["283"] = 411,["284"] = 411,["285"] = 411,["286"] = 411,["287"] = 372,["288"] = 371,["289"] = 425,["290"] = 426,["291"] = 426,["292"] = 426,["293"] = 426,["294"] = 426,["295"] = 426,["296"] = 426,["297"] = 426,["298"] = 425});
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
        currentMode = ____exports.GameMode.NORMAL,
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
    if detectedMode ~= ____exports.GameMode.NORMAL then
        self:switchMode(detectedMode)
    end
    self:setupBaseGameRules()
    self.settings.initialized = true
    self:syncToNetTable()
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
        local ____switch24 = config.mode
        local ____cond24 = ____switch24 == ____exports.GameMode.TRAINING
        if ____cond24 then
            self:setupTrainingMode()
            break
        end
        ____cond24 = ____cond24 or ____switch24 == ____exports.GameMode.AUTOCHESS
        if ____cond24 then
            self:setupAutoChessMode()
            break
        end
        ____cond24 = ____cond24 or ____switch24 == ____exports.GameMode.NORMAL
        if ____cond24 then
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
                    local ____switch32 = key
                    local ____cond32 = ____switch32 == "startingGold"
                    if ____cond32 then
                        break
                    end
                    ____cond32 = ____cond32 or ____switch32 == "startingLevel"
                    if ____cond32 then
                        break
                    end
                    ____cond32 = ____cond32 or ____switch32 == "customSpeed"
                    if ____cond32 then
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
