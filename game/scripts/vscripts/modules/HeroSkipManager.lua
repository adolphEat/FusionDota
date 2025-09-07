local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Set = ____lualib.Set
local __TS__New = ____lualib.__TS__New
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 6,["12"] = 6,["13"] = 6,["15"] = 8,["16"] = 9,["17"] = 12,["18"] = 13,["19"] = 11,["20"] = 16,["21"] = 17,["22"] = 18,["24"] = 20,["25"] = 16,["26"] = 26,["27"] = 28,["28"] = 28,["29"] = 28,["30"] = 29,["31"] = 28,["32"] = 28,["33"] = 28,["34"] = 33,["35"] = 33,["36"] = 33,["37"] = 34,["38"] = 33,["39"] = 33,["40"] = 33,["41"] = 37,["42"] = 26,["43"] = 43,["44"] = 44,["45"] = 46,["48"] = 50,["49"] = 53,["50"] = 56,["51"] = 56,["52"] = 56,["53"] = 57,["54"] = 56,["55"] = 56,["56"] = 43,["57"] = 64,["58"] = 65,["59"] = 66,["60"] = 68,["61"] = 71,["62"] = 64,["63"] = 77,["64"] = 78,["65"] = 79,["68"] = 83,["69"] = 84,["70"] = 85,["73"] = 90,["74"] = 91,["75"] = 92,["80"] = 115,["81"] = 117,["82"] = 118,["86"] = 98,["87"] = 101,["88"] = 103,["89"] = 104,["90"] = 107,["91"] = 110,["93"] = 112,["100"] = 77,["101"] = 130,["102"] = 132,["104"] = 135,["105"] = 135,["106"] = 136,["107"] = 135,["110"] = 140,["111"] = 141,["112"] = 142,["114"] = 145,["115"] = 130,["116"] = 151,["117"] = 153,["118"] = 154,["119"] = 154,["120"] = 154,["121"] = 154,["122"] = 154,["123"] = 154,["124"] = 154,["125"] = 154,["126"] = 154,["128"] = 162,["129"] = 162,["130"] = 162,["131"] = 162,["132"] = 162,["133"] = 162,["134"] = 162,["135"] = 167,["136"] = 151,["137"] = 173,["138"] = 174,["139"] = 175,["140"] = 173,["141"] = 181,["142"] = 182,["143"] = 181,["144"] = 188,["145"] = 189,["146"] = 190,["147"] = 188,["148"] = 196,["149"] = 197,["150"] = 197,["151"] = 197,["152"] = 197,["153"] = 197,["154"] = 196});
local ____exports = {}
--- 英雄选择跳过管理器 - 参考zizouqi的实现方式
-- Hero Selection Skip Manager - Based on zizouqi implementation
____exports.HeroSkipManager = __TS__Class()
local HeroSkipManager = ____exports.HeroSkipManager
HeroSkipManager.name = "HeroSkipManager"
function HeroSkipManager.prototype.____constructor(self)
    self.defaultHero = "npc_dota_hero_gyrocopter"
    self.playersProcessed = __TS__New(Set)
    self:setupEventListeners()
    print("[HeroSkipManager] Initialized")
end
function HeroSkipManager.getInstance(self)
    if not ____exports.HeroSkipManager.instance then
        ____exports.HeroSkipManager.instance = __TS__New(____exports.HeroSkipManager)
    end
    return ____exports.HeroSkipManager.instance
end
function HeroSkipManager.prototype.setupEventListeners(self)
    ListenToGameEvent(
        "player_connect_full",
        function(____, event)
            self:onPlayerConnectFull(event)
        end,
        self
    )
    ListenToGameEvent(
        "dota_player_pick_hero",
        function(____, event)
            self:onPlayerPickHero(event)
        end,
        self
    )
    print("[HeroSkipManager] Event listeners registered")
end
function HeroSkipManager.prototype.onPlayerConnectFull(self, event)
    local playerID = event.userid
    if not playerID or self.playersProcessed:has(playerID) then
        return
    end
    print(("[HeroSkipManager] Player " .. tostring(playerID)) .. " connected, creating hero automatically")
    self.playersProcessed:add(playerID)
    Timers:CreateTimer(
        0.1,
        function()
            self:createHeroForPlayer(playerID)
        end
    )
end
function HeroSkipManager.prototype.onPlayerPickHero(self, event)
    local playerID = event.playerid
    local heroName = event.hero
    print((("[HeroSkipManager] Player " .. tostring(playerID)) .. " picked hero: ") .. tostring(heroName))
    self.playersProcessed:add(playerID)
end
function HeroSkipManager.prototype.createHeroForPlayer(self, playerID)
    if not PlayerResource:IsValidPlayerID(playerID) then
        print("[HeroSkipManager] Invalid player ID: " .. tostring(playerID))
        return
    end
    local player = PlayerResource:GetPlayer(playerID)
    if not player then
        print(("[HeroSkipManager] Player " .. tostring(playerID)) .. " not found")
        return
    end
    local existingHero = PlayerResource:GetSelectedHeroEntity(playerID)
    if existingHero and IsValidEntity(existingHero) then
        print((("[HeroSkipManager] Player " .. tostring(playerID)) .. " already has hero: ") .. existingHero:GetUnitName())
        return
    end
    do
        local function ____catch(____error)
            print((("[HeroSkipManager] Error creating hero for player " .. tostring(playerID)) .. ": ") .. tostring(____error))
            if GameRules.ErrorTracker then
                GameRules.ErrorTracker:trackError(____error, {module = "HeroSkipManager", ["function"] = "createHeroForPlayer", playerID = playerID})
            end
        end
        local ____try, ____hasReturned = pcall(function()
            local teamID = PlayerResource:GetTeam(playerID)
            local hero = PlayerResource:ReplaceHeroWith(playerID, self.defaultHero, 0, 0)
            if hero and IsValidEntity(hero) then
                print((("[HeroSkipManager] Successfully created hero " .. self.defaultHero) .. " for player ") .. tostring(playerID))
                self:setupHeroInitialState(hero, playerID)
                self:onHeroCreated(hero, playerID)
            else
                print("[HeroSkipManager] Failed to create hero for player " .. tostring(playerID))
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function HeroSkipManager.prototype.setupHeroInitialState(self, hero, playerID)
    hero:SetGold(500, false)
    do
        local i = 1
        while i <= 10 do
            hero:HeroLevelUp(false)
            i = i + 1
        end
    end
    local spawnOrigin = Entities:FindByClassname(nil, "info_player_start_goodguys")
    if spawnOrigin then
        hero:SetAbsOrigin(spawnOrigin:GetAbsOrigin())
    end
    print("[HeroSkipManager] Hero initial state setup complete for player " .. tostring(playerID))
end
function HeroSkipManager.prototype.onHeroCreated(self, hero, playerID)
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "hero_skip",
            "hero_created",
            {
                playerID = playerID,
                heroName = hero:GetUnitName(),
                timestamp = Date:now()
            }
        )
    end
    CustomGameEventManager:Send_ServerToAllClients(
        "hero_auto_created",
        {
            playerID = playerID,
            heroName = hero:GetUnitName()
        }
    )
    print("[HeroSkipManager] Hero creation event sent for player " .. tostring(playerID))
end
function HeroSkipManager.prototype.setDefaultHero(self, heroName)
    self.defaultHero = heroName
    print("[HeroSkipManager] Default hero set to: " .. heroName)
end
function HeroSkipManager.prototype.getDefaultHero(self)
    return self.defaultHero
end
function HeroSkipManager.prototype.resetProcessedPlayers(self)
    self.playersProcessed:clear()
    print("[HeroSkipManager] Processed players list reset")
end
function HeroSkipManager.prototype.getStatus(self)
    return {
        defaultHero = self.defaultHero,
        processedPlayersCount = self.playersProcessed.size,
        processedPlayers = __TS__ArrayFrom(self.playersProcessed)
    }
end
return ____exports
