local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 1,["8"] = 1,["10"] = 3,["11"] = 5,["12"] = 6,["13"] = 7,["14"] = 9,["15"] = 10,["16"] = 11,["17"] = 12,["18"] = 13,["19"] = 14,["20"] = 15,["21"] = 16,["22"] = 17,["23"] = 18,["24"] = 19,["25"] = 20,["26"] = 21,["27"] = 23,["28"] = 24,["29"] = 25,["30"] = 26,["31"] = 27,["32"] = 28,["33"] = 29,["34"] = 30,["35"] = 38,["36"] = 39,["37"] = 42,["38"] = 43,["39"] = 48,["40"] = 49,["41"] = 2});
local ____exports = {}
____exports.GameConfig = __TS__Class()
local GameConfig = ____exports.GameConfig
GameConfig.name = "GameConfig"
function GameConfig.prototype.____constructor(self)
    SendToServerConsole("dota_max_physical_items_purchase_limit 9999")
    GameRules:SetCustomGameSetupAutoLaunchDelay(3)
    GameRules:SetCustomGameSetupRemainingTime(3)
    GameRules:SetCustomGameSetupTimeout(3)
    GameRules:SetShowcaseTime(0)
    GameRules:SetPreGameTime(0)
    GameRules:SetPostGameTime(30)
    GameRules:SetSameHeroSelectionEnabled(true)
    GameRules:SetStartingGold(0)
    GameRules:SetGoldTickTime(0)
    GameRules:SetGoldPerTick(0)
    GameRules:SetHeroRespawnEnabled(false)
    GameRules:SetCustomGameAllowMusicAtGameStart(false)
    GameRules:SetCustomGameAllowHeroPickMusic(false)
    GameRules:SetCustomGameAllowBattleMusic(false)
    GameRules:SetUseUniversalShopMode(true)
    GameRules:SetHideKillMessageHeaders(true)
    local game = GameRules:GetGameModeEntity()
    game:SetRemoveIllusionsOnDeath(true)
    game:SetSelectionGoldPenaltyEnabled(false)
    game:SetLoseGoldOnDeath(false)
    game:SetBuybackEnabled(false)
    game:SetDaynightCycleDisabled(true)
    game:SetForceRightClickAttackDisabled(true)
    game:SetHudCombatEventsDisabled(true)
    game:SetDaynightCycleDisabled(true)
    game:SetDeathOverlayDisabled(true)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, 3)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 3)
    GameRules:SetHeroSelectionTime(0)
    game:SetCustomGameForceHero("npc_dota_hero_gyrocopter")
end
return ____exports
