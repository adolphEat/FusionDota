local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 1,["8"] = 1,["10"] = 3,["11"] = 5,["12"] = 6,["13"] = 7,["14"] = 8,["15"] = 9,["16"] = 10,["17"] = 11,["18"] = 12,["19"] = 13,["20"] = 14,["21"] = 15,["22"] = 16,["23"] = 17,["24"] = 18,["25"] = 19,["26"] = 20,["27"] = 21,["28"] = 23,["29"] = 24,["30"] = 25,["31"] = 26,["32"] = 27,["33"] = 28,["34"] = 29,["35"] = 30,["36"] = 31,["37"] = 38,["38"] = 39,["39"] = 42,["40"] = 43,["41"] = 2});
local ____exports = {}
____exports.GameConfig = __TS__Class()
local GameConfig = ____exports.GameConfig
GameConfig.name = "GameConfig"
function GameConfig.prototype.____constructor(self)
    SendToServerConsole("dota_max_physical_items_purchase_limit 9999")
    GameRules:SetCustomGameSetupAutoLaunchDelay(3)
    GameRules:SetCustomGameSetupRemainingTime(3)
    GameRules:SetCustomGameSetupTimeout(3)
    GameRules:SetHeroSelectionTime(0)
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
    game:SetCustomGameForceHero("npc_dota_hero_phoenix")
    game:SetDaynightCycleDisabled(true)
    game:SetDeathOverlayDisabled(true)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_GOODGUYS, 3)
    GameRules:SetCustomGameTeamMaxPlayers(DOTA_TEAM_BADGUYS, 3)
end
return ____exports
