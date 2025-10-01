local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Set = ____lualib.Set
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__Delete = ____lualib.__TS__Delete
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 8,["17"] = 8,["18"] = 8,["20"] = 10,["21"] = 11,["22"] = 12,["23"] = 22,["24"] = 21,["25"] = 14,["26"] = 15,["27"] = 16,["29"] = 18,["30"] = 14,["31"] = 28,["32"] = 30,["33"] = 30,["34"] = 30,["35"] = 31,["36"] = 32,["37"] = 33,["39"] = 30,["40"] = 30,["41"] = 30,["42"] = 38,["43"] = 38,["44"] = 38,["45"] = 39,["46"] = 40,["47"] = 41,["48"] = 42,["49"] = 43,["52"] = 38,["53"] = 38,["54"] = 38,["55"] = 28,["56"] = 52,["57"] = 53,["58"] = 54,["61"] = 59,["62"] = 62,["63"] = 63,["65"] = 67,["68"] = 71,["71"] = 69,["78"] = 75,["79"] = 52,["80"] = 81,["81"] = 82,["84"] = 85,["85"] = 88,["86"] = 89,["88"] = 93,["89"] = 94,["90"] = 95,["91"] = 96,["93"] = 99,["94"] = 81,["95"] = 105,["96"] = 106,["97"] = 107,["98"] = 107,["99"] = 107,["100"] = 107,["102"] = 110,["103"] = 105,["104"] = 116,["105"] = 117,["106"] = 118,["107"] = 119,["109"] = 116,["110"] = 126,["111"] = 127,["112"] = 128,["113"] = 128,["114"] = 128,["116"] = 128,["118"] = 128,["119"] = 126,["120"] = 134,["121"] = 135,["122"] = 135,["123"] = 135,["124"] = 135,["125"] = 134,["126"] = 143,["127"] = 144,["128"] = 143,["129"] = 150,["130"] = 156,["131"] = 157,["132"] = 160,["133"] = 161,["134"] = 162,["135"] = 163,["136"] = 163,["137"] = 163,["139"] = 163,["141"] = 159,["142"] = 150,["143"] = 170,["144"] = 171,["145"] = 172,["148"] = 176,["151"] = 174,["158"] = 181,["159"] = 170,["160"] = 187,["161"] = 188,["162"] = 189,["165"] = 193,["168"] = 191,["175"] = 187,["176"] = 201,["177"] = 201,["178"] = 201,["180"] = 202,["181"] = 202,["182"] = 202,["183"] = 203,["184"] = 205,["186"] = 209,["187"] = 211,["188"] = 202,["189"] = 202,["190"] = 214,["191"] = 201,["192"] = 220,["193"] = 221,["194"] = 222,["196"] = 224,["197"] = 220,["198"] = 230,["199"] = 230,["200"] = 230,["202"] = 231,["203"] = 233,["204"] = 234,["205"] = 235,["207"] = 237,["210"] = 242,["211"] = 244,["212"] = 230,["213"] = 250,["214"] = 250,["215"] = 250,["217"] = 251,["218"] = 253,["219"] = 254,["220"] = 255,["222"] = 257,["225"] = 262,["226"] = 263,["227"] = 266,["228"] = 267,["230"] = 269,["231"] = 271,["232"] = 250,["233"] = 277,["234"] = 282,["235"] = 283,["236"] = 283,["238"] = 285,["239"] = 286,["240"] = 288,["241"] = 290,["242"] = 291,["243"] = 292,["244"] = 293,["245"] = 294,["248"] = 298,["249"] = 277,["250"] = 304,["251"] = 309,["252"] = 310,["253"] = 312,["254"] = 312,["255"] = 312,["256"] = 313,["257"] = 314,["258"] = 312,["259"] = 312,["260"] = 304,["261"] = 321,["262"] = 326,["263"] = 326,["264"] = 326,["265"] = 326,["266"] = 326,["267"] = 326,["268"] = 326,["269"] = 331,["270"] = 321,["271"] = 341,["272"] = 347,["273"] = 355,["274"] = 355,["275"] = 355,["276"] = 356,["277"] = 357,["279"] = 361,["280"] = 362,["281"] = 363,["282"] = 365,["284"] = 368,["287"] = 372,["288"] = 355,["289"] = 355,["290"] = 376,["291"] = 341,["292"] = 382,["293"] = 383,["294"] = 384,["295"] = 385,["296"] = 386,["298"] = 382,["299"] = 393,["300"] = 394,["301"] = 396,["302"] = 397,["303"] = 397,["304"] = 397,["305"] = 397,["307"] = 403,["308"] = 393,["309"] = 409,["310"] = 410,["311"] = 412,["312"] = 413,["313"] = 414,["314"] = 415,["315"] = 417,["316"] = 418,["317"] = 418,["318"] = 418,["319"] = 419,["320"] = 420,["322"] = 423,["323"] = 409});
local ____exports = {}
____exports.EntityManager = __TS__Class()
local EntityManager = ____exports.EntityManager
EntityManager.name = "EntityManager"
function EntityManager.prototype.____constructor(self)
    self.entities = __TS__New(Map)
    self.entityGroups = __TS__New(Map)
    self.cleanupTimers = __TS__New(Map)
    self:setupGlobalEventListeners()
end
function EntityManager.getInstance(self)
    if not ____exports.EntityManager.instance then
        ____exports.EntityManager.instance = __TS__New(____exports.EntityManager)
    end
    return ____exports.EntityManager.instance
end
function EntityManager.prototype.setupGlobalEventListeners(self)
    ListenToGameEvent(
        "entity_killed",
        function(event)
            local killedEntity = EntIndexToHScript(event.entindex_killed)
            if killedEntity and self.entities:has(killedEntity) then
                self:onEntityKilled(killedEntity)
            end
        end,
        nil
    )
    ListenToGameEvent(
        "dota_unit_event",
        function(event)
            local eventData = event
            if eventData.event_type == "damage" then
                local entity = EntIndexToHScript(eventData.entindex)
                if entity and self.entities:has(entity) then
                    self:onEntityDamaged(entity, eventData.damage or 0)
                end
            end
        end,
        nil
    )
end
function EntityManager.prototype.registerEntity(self, entity, listeners, groupId)
    if not entity or entity:IsNull() then
        print("[EntityManager] Cannot register null or invalid entity")
        return
    end
    self.entities:set(entity, listeners)
    if groupId then
        self:addToGroup(entity, groupId)
    end
    if listeners.onSpawn then
        do
            local function ____catch(____error)
                print("[EntityManager] Error in onSpawn callback: " .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                listeners:onSpawn(entity)
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    end
    print(((("[EntityManager] Registered entity " .. entity:GetUnitName()) .. " (") .. tostring(entity:GetEntityIndex())) .. ")")
end
function EntityManager.prototype.unregisterEntity(self, entity)
    if not entity then
        return
    end
    self.entities:delete(entity)
    for ____, group in __TS__Iterator(self.entityGroups:values()) do
        group:delete(entity)
    end
    local timerId = self.cleanupTimers:get(entity)
    if timerId then
        Timers:RemoveTimer(timerId)
        self.cleanupTimers:delete(entity)
    end
    print("[EntityManager] Unregistered entity " .. tostring(entity:GetEntityIndex()))
end
function EntityManager.prototype.addToGroup(self, entity, groupId)
    if not self.entityGroups:has(groupId) then
        self.entityGroups:set(
            groupId,
            __TS__New(Set)
        )
    end
    self.entityGroups:get(groupId):add(entity)
end
function EntityManager.prototype.removeFromGroup(self, entity, groupId)
    local group = self.entityGroups:get(groupId)
    if group then
        group:delete(entity)
    end
end
function EntityManager.prototype.getEntitiesInGroup(self, groupId)
    local group = self.entityGroups:get(groupId)
    local ____group_0
    if group then
        ____group_0 = __TS__ArrayFrom(group)
    else
        ____group_0 = {}
    end
    return ____group_0
end
function EntityManager.prototype.getAliveEntitiesInGroup(self, groupId)
    return __TS__ArrayFilter(
        self:getEntitiesInGroup(groupId),
        function(____, entity) return entity and not entity:IsNull() and entity:IsAlive() end
    )
end
function EntityManager.prototype.isGroupAlive(self, groupId)
    return #self:getAliveEntitiesInGroup(groupId) > 0
end
function EntityManager.prototype.getGroupStats(self, groupId)
    local allEntities = self:getEntitiesInGroup(groupId)
    local aliveEntities = self:getAliveEntitiesInGroup(groupId)
    local ____temp_2 = #allEntities
    local ____temp_3 = #aliveEntities
    local ____temp_4 = #allEntities - #aliveEntities
    local ____temp_1
    if #allEntities > 0 then
        ____temp_1 = #aliveEntities / #allEntities * 100
    else
        ____temp_1 = 0
    end
    return {total = ____temp_2, alive = ____temp_3, dead = ____temp_4, percentage = ____temp_1}
end
function EntityManager.prototype.onEntityKilled(self, entity)
    local listeners = self.entities:get(entity)
    if listeners and listeners.onDeath then
        do
            local function ____catch(____error)
                print("[EntityManager] Error in onDeath callback: " .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                listeners:onDeath(entity)
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    end
    self:scheduleEntityCleanup(entity)
end
function EntityManager.prototype.onEntityDamaged(self, entity, damage)
    local listeners = self.entities:get(entity)
    if listeners and listeners.onDamage then
        do
            local function ____catch(____error)
                print("[EntityManager] Error in onDamage callback: " .. tostring(____error))
            end
            local ____try, ____hasReturned = pcall(function()
                listeners:onDamage(entity, damage)
            end)
            if not ____try then
                ____catch(____hasReturned)
            end
        end
    end
end
function EntityManager.prototype.scheduleEntityCleanup(self, entity, delay)
    if delay == nil then
        delay = 5
    end
    local timerId = Timers:CreateTimer(
        delay,
        function()
            if entity and not entity:IsNull() then
                entity:RemoveSelf()
            end
            self:unregisterEntity(entity)
            return nil
        end
    )
    self.cleanupTimers:set(entity, timerId)
end
function EntityManager.prototype.cleanupEntity(self, entity)
    if entity and not entity:IsNull() then
        entity:RemoveSelf()
    end
    self:unregisterEntity(entity)
end
function EntityManager.prototype.cleanupGroup(self, groupId, immediate)
    if immediate == nil then
        immediate = false
    end
    local entities = self:getEntitiesInGroup(groupId)
    for ____, entity in ipairs(entities) do
        if immediate then
            self:cleanupEntity(entity)
        else
            self:scheduleEntityCleanup(entity)
        end
    end
    self.entityGroups:delete(groupId)
    print(((("[EntityManager] Cleaned up group " .. groupId) .. " (") .. tostring(#entities)) .. " entities)")
end
function EntityManager.prototype.cleanupAllEntities(self, immediate)
    if immediate == nil then
        immediate = false
    end
    local allEntities = __TS__ArrayFrom(self.entities:keys())
    for ____, entity in ipairs(allEntities) do
        if immediate then
            self:cleanupEntity(entity)
        else
            self:scheduleEntityCleanup(entity)
        end
    end
    self.entities:clear()
    self.entityGroups:clear()
    for ____, timerId in __TS__Iterator(self.cleanupTimers:values()) do
        Timers:RemoveTimer(timerId)
    end
    self.cleanupTimers:clear()
    print(("[EntityManager] Cleaned up all entities (" .. tostring(#allEntities)) .. " entities)")
end
function EntityManager.prototype.findNearestEnemy(self, entity, enemyGroupId, maxRange)
    local enemies = self:getAliveEntitiesInGroup(enemyGroupId)
    if #enemies == 0 then
        return nil
    end
    local nearestEnemy = nil
    local nearestDistance = maxRange or math.huge
    local entityPos = entity:GetAbsOrigin()
    for ____, enemy in ipairs(enemies) do
        local distance = entityPos:__sub(enemy:GetAbsOrigin()):Length()
        if distance < nearestDistance then
            nearestDistance = distance
            nearestEnemy = enemy
        end
    end
    return nearestEnemy
end
function EntityManager.prototype.findEnemiesInRange(self, entity, enemyGroupId, range)
    local enemies = self:getAliveEntitiesInGroup(enemyGroupId)
    local entityPos = entity:GetAbsOrigin()
    return __TS__ArrayFilter(
        enemies,
        function(____, enemy)
            local distance = entityPos:__sub(enemy:GetAbsOrigin()):Length()
            return distance <= range
        end
    )
end
function EntityManager.prototype.getEntityStats(self)
    local groupStats = __TS__ArrayMap(
        __TS__ArrayFrom(self.entityGroups:keys()),
        function(____, groupId) return __TS__ObjectAssign(
            {groupId = groupId},
            self:getGroupStats(groupId)
        ) end
    )
    return {totalRegistered = self.entities.size, totalGroups = self.entityGroups.size, groupStats = groupStats}
end
function EntityManager.prototype.setEntityAI(self, entity, aiConfig)
    local config = {targetGroupId = aiConfig.targetGroupId or "", aggressionLevel = aiConfig.aggressionLevel or 50, attackRange = aiConfig.attackRange or 800, updateInterval = aiConfig.updateInterval or 1}
    local aiTimerId = Timers:CreateTimer(
        0.1,
        function()
            if not entity or entity:IsNull() or not entity:IsAlive() then
                return nil
            end
            if config.targetGroupId then
                local target = self:findNearestEnemy(entity, config.targetGroupId, config.attackRange)
                if target then
                    entity:MoveToTargetToAttack(target)
                else
                    entity:Stop()
                end
            end
            return config.updateInterval
        end
    )
    entity.__aiTimerId = aiTimerId
end
function EntityManager.prototype.stopEntityAI(self, entity)
    local aiTimerId = entity.__aiTimerId
    if aiTimerId then
        Timers:RemoveTimer(aiTimerId)
        __TS__Delete(entity, "__aiTimerId")
    end
end
function EntityManager.prototype.setGroupAI(self, groupId, targetGroupId, aiConfig)
    local entities = self:getAliveEntitiesInGroup(groupId)
    for ____, entity in ipairs(entities) do
        self:setEntityAI(
            entity,
            __TS__ObjectAssign({targetGroupId = targetGroupId}, aiConfig)
        )
    end
    print((("[EntityManager] Set AI for group " .. groupId) .. " targeting ") .. targetGroupId)
end
function EntityManager.prototype.getDebugInfo(self)
    local info = {}
    info[#info + 1] = "=== Entity Manager Debug Info ==="
    info[#info + 1] = "Total Entities: " .. tostring(self.entities.size)
    info[#info + 1] = "Total Groups: " .. tostring(self.entityGroups.size)
    info[#info + 1] = "Active Timers: " .. tostring(self.cleanupTimers.size)
    info[#info + 1] = "\nGroups:"
    for ____, ____value in __TS__Iterator(self.entityGroups) do
        local groupId = ____value[1]
        local entities = ____value[2]
        local stats = self:getGroupStats(groupId)
        info[#info + 1] = ((((((("  " .. groupId) .. ": ") .. tostring(stats.alive)) .. "/") .. tostring(stats.total)) .. " alive (") .. __TS__NumberToFixed(stats.percentage, 1)) .. "%)"
    end
    return info
end
return ____exports
