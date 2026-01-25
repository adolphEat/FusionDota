local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Set = ____lualib.Set
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["13"] = 6,["14"] = 6,["15"] = 6,["17"] = 7,["18"] = 10,["19"] = 9,["20"] = 17,["21"] = 18,["22"] = 19,["23"] = 19,["24"] = 19,["25"] = 19,["26"] = 20,["28"] = 17,["29"] = 30,["30"] = 31,["31"] = 33,["32"] = 36,["33"] = 37,["34"] = 38,["36"] = 41,["37"] = 42,["38"] = 43,["39"] = 30,["40"] = 51,["41"] = 52,["42"] = 53,["43"] = 54,["44"] = 51,["45"] = 63,["46"] = 64,["47"] = 65,["48"] = 66,["49"] = 63,["50"] = 73,["51"] = 74,["52"] = 75,["53"] = 76,["55"] = 73,["56"] = 83,["57"] = 84,["58"] = 84,["59"] = 84,["60"] = 85,["62"] = 87,["63"] = 83,["64"] = 95,["65"] = 96,["66"] = 97,["67"] = 95,["68"] = 106,["69"] = 107,["70"] = 108,["71"] = 110,["72"] = 111,["73"] = 112,["74"] = 113,["76"] = 116,["77"] = 106,["78"] = 123,["79"] = 124,["80"] = 125,["81"] = 127,["82"] = 128,["84"] = 130,["85"] = 131,["86"] = 132,["89"] = 123});
local ____exports = {}
--- 玩家强化管理器
-- 管理每个玩家的海克斯强化技能
____exports.PlayerAugmentManager = __TS__Class()
local PlayerAugmentManager = ____exports.PlayerAugmentManager
PlayerAugmentManager.name = "PlayerAugmentManager"
function PlayerAugmentManager.prototype.____constructor(self)
    self.playerAugments = __TS__New(Map)
    print("[PlayerAugmentManager] Initializing...")
end
function PlayerAugmentManager.prototype.initPlayer(self, playerId)
    if not self.playerAugments:has(playerId) then
        self.playerAugments:set(
            playerId,
            __TS__New(Set)
        )
        print("[PlayerAugmentManager] Initialized player " .. tostring(playerId))
    end
end
function PlayerAugmentManager.prototype.addAugment(self, playerId, augmentId)
    self:initPlayer(playerId)
    local augments = self.playerAugments:get(playerId)
    if augments:has(augmentId) then
        print((("[PlayerAugmentManager] Player " .. tostring(playerId)) .. " already has augment: ") .. augmentId)
        return false
    end
    augments:add(augmentId)
    print((((("[PlayerAugmentManager] Added augment " .. augmentId) .. " to player ") .. tostring(playerId)) .. ". Total: ") .. tostring(augments.size))
    return true
end
function PlayerAugmentManager.prototype.getPlayerAugments(self, playerId)
    self:initPlayer(playerId)
    local augments = self.playerAugments:get(playerId)
    return __TS__ArrayFrom(augments)
end
function PlayerAugmentManager.prototype.hasAugment(self, playerId, augmentId)
    self:initPlayer(playerId)
    local augments = self.playerAugments:get(playerId)
    return augments:has(augmentId)
end
function PlayerAugmentManager.prototype.clearPlayer(self, playerId)
    if self.playerAugments:has(playerId) then
        self.playerAugments:get(playerId):clear()
        print("[PlayerAugmentManager] Cleared augments for player " .. tostring(playerId))
    end
end
function PlayerAugmentManager.prototype.clearAll(self)
    for ____, ____value in __TS__Iterator(self.playerAugments) do
        local playerId = ____value[1]
        local augments = ____value[2]
        augments:clear()
    end
    print("[PlayerAugmentManager] Cleared all player augments")
end
function PlayerAugmentManager.prototype.getAugmentCount(self, playerId)
    self:initPlayer(playerId)
    return self.playerAugments:get(playerId).size
end
function PlayerAugmentManager.prototype.removeAugment(self, playerId, augmentId)
    self:initPlayer(playerId)
    local augments = self.playerAugments:get(playerId)
    if augments:has(augmentId) then
        augments:delete(augmentId)
        print((("[PlayerAugmentManager] Removed augment " .. augmentId) .. " from player ") .. tostring(playerId))
        return true
    end
    return false
end
function PlayerAugmentManager.prototype.printPlayerAugments(self, playerId)
    self:initPlayer(playerId)
    local augments = self:getPlayerAugments(playerId)
    if #augments == 0 then
        print(("[PlayerAugmentManager] Player " .. tostring(playerId)) .. " has no augments")
    else
        print(("[PlayerAugmentManager] Player " .. tostring(playerId)) .. " augments:")
        for ____, augmentId in ipairs(augments) do
            print("  - " .. augmentId)
        end
    end
end
return ____exports
