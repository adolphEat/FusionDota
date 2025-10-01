local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__ArrayFind = ____lualib.__TS__ArrayFind
local __TS__ArraySome = ____lualib.__TS__ArraySome
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 8,["13"] = 11,["14"] = 12,["15"] = 19,["16"] = 19,["17"] = 21,["18"] = 21,["19"] = 21,["21"] = 25,["22"] = 26,["23"] = 29,["24"] = 30,["25"] = 31,["26"] = 32,["27"] = 28,["28"] = 35,["29"] = 36,["30"] = 37,["32"] = 39,["33"] = 35,["34"] = 45,["35"] = 47,["36"] = 50,["37"] = 50,["38"] = 50,["39"] = 51,["40"] = 52,["41"] = 50,["42"] = 50,["43"] = 50,["44"] = 56,["45"] = 58,["46"] = 45,["47"] = 64,["48"] = 66,["49"] = 66,["50"] = 66,["51"] = 67,["52"] = 68,["53"] = 69,["54"] = 66,["55"] = 66,["56"] = 73,["57"] = 73,["58"] = 73,["59"] = 74,["60"] = 75,["61"] = 76,["62"] = 73,["63"] = 73,["64"] = 80,["65"] = 80,["66"] = 80,["67"] = 81,["68"] = 82,["69"] = 83,["70"] = 84,["71"] = 80,["72"] = 80,["73"] = 64,["74"] = 91,["75"] = 92,["76"] = 93,["78"] = 96,["79"] = 97,["81"] = 99,["82"] = 99,["83"] = 100,["84"] = 99,["87"] = 107,["88"] = 107,["89"] = 107,["90"] = 107,["91"] = 107,["92"] = 107,["93"] = 107,["94"] = 115,["95"] = 116,["96"] = 118,["97"] = 119,["98"] = 91,["99"] = 125,["100"] = 126,["101"] = 127,["102"] = 125,["103"] = 133,["104"] = 134,["105"] = 135,["107"] = 133,["108"] = 142,["109"] = 145,["110"] = 145,["112"] = 148,["113"] = 149,["114"] = 150,["116"] = 153,["117"] = 154,["118"] = 155,["120"] = 159,["121"] = 160,["122"] = 160,["123"] = 160,["124"] = 160,["125"] = 166,["126"] = 167,["127"] = 168,["128"] = 168,["129"] = 169,["130"] = 171,["131"] = 173,["132"] = 174,["136"] = 184,["137"] = 185,["138"] = 185,["139"] = 186,["141"] = 187,["142"] = 187,["143"] = 187,["144"] = 187,["146"] = 185,["147"] = 189,["148"] = 190,["150"] = 193,["151"] = 194,["153"] = 197,["154"] = 198,["155"] = 200,["156"] = 201,["157"] = 202,["158"] = 204,["159"] = 206,["160"] = 207,["163"] = 211,["164"] = 142,["165"] = 217,["166"] = 220,["167"] = 220,["169"] = 222,["170"] = 223,["171"] = 224,["173"] = 227,["174"] = 228,["175"] = 229,["177"] = 232,["178"] = 233,["180"] = 236,["181"] = 238,["182"] = 240,["183"] = 241,["185"] = 244,["187"] = 247,["188"] = 249,["189"] = 217,["190"] = 255,["191"] = 261,["192"] = 262,["193"] = 263,["195"] = 266,["196"] = 267,["197"] = 268,["199"] = 271,["200"] = 272,["201"] = 274,["202"] = 275,["204"] = 278,["205"] = 279,["207"] = 283,["208"] = 284,["209"] = 285,["211"] = 289,["212"] = 297,["213"] = 299,["214"] = 301,["215"] = 302,["217"] = 305,["219"] = 313,["220"] = 255,["221"] = 319,["222"] = 320,["223"] = 320,["224"] = 320,["225"] = 320,["226"] = 321,["229"] = 352,["230"] = 353,["231"] = 353,["232"] = 353,["233"] = 353,["234"] = 353,["237"] = 325,["238"] = 326,["239"] = 329,["241"] = 333,["242"] = 334,["243"] = 335,["245"] = 339,["246"] = 345,["252"] = 323,["255"] = 319,["256"] = 364,["257"] = 365,["258"] = 366,["259"] = 367,["261"] = 369,["262"] = 370,["263"] = 371,["265"] = 373,["266"] = 374,["267"] = 375,["269"] = 377,["270"] = 378,["272"] = 380,["273"] = 381,["275"] = 364,["276"] = 388,["277"] = 389,["278"] = 390,["279"] = 391,["281"] = 394,["282"] = 395,["283"] = 397,["284"] = 398,["286"] = 401,["287"] = 402,["289"] = 406,["290"] = 407,["291"] = 408,["292"] = 410,["293"] = 412,["294"] = 388,["295"] = 418,["296"] = 419,["297"] = 420,["298"] = 421,["300"] = 424,["301"] = 425,["302"] = 426,["304"] = 430,["307"] = 450,["310"] = 432,["311"] = 434,["312"] = 435,["313"] = 436,["314"] = 437,["315"] = 437,["316"] = 437,["317"] = 437,["318"] = 437,["319"] = 442,["320"] = 447,["327"] = 453,["328"] = 418,["329"] = 459,["330"] = 460,["331"] = 459,["332"] = 466,["333"] = 467,["334"] = 468,["335"] = 468,["337"] = 470,["338"] = 470,["339"] = 470,["340"] = 470,["341"] = 466,["342"] = 476,["343"] = 477,["344"] = 478,["345"] = 478,["347"] = 480,["348"] = 480,["349"] = 480,["350"] = 480,["351"] = 480,["352"] = 480,["353"] = 480,["354"] = 476,["355"] = 486,["356"] = 489,["357"] = 489,["359"] = 491,["360"] = 493,["361"] = 493,["362"] = 493,["363"] = 493,["364"] = 493,["365"] = 493,["366"] = 493,["367"] = 493,["368"] = 493,["369"] = 486,["370"] = 507,["371"] = 508,["372"] = 509,["375"] = 513,["376"] = 513,["377"] = 513,["378"] = 513,["379"] = 513,["380"] = 518,["381"] = 518,["382"] = 518,["383"] = 519,["384"] = 520,["385"] = 521,["386"] = 521,["387"] = 521,["388"] = 521,["389"] = 521,["390"] = 521,["391"] = 521,["392"] = 521,["393"] = 521,["394"] = 521,["396"] = 528,["398"] = 518,["399"] = 518,["400"] = 513,["401"] = 513,["402"] = 532,["403"] = 532,["404"] = 532,["405"] = 532,["406"] = 532,["407"] = 507,["408"] = 538,["409"] = 539,["410"] = 540,["413"] = 542,["414"] = 542,["415"] = 542,["416"] = 542,["417"] = 542,["418"] = 542,["419"] = 542,["420"] = 543,["421"] = 544,["423"] = 538,["424"] = 551,["425"] = 552,["426"] = 551,["427"] = 558,["428"] = 559,["429"] = 558,["430"] = 565,["431"] = 567,["432"] = 567,["433"] = 567,["434"] = 567,["435"] = 567,["436"] = 567,["437"] = 567,["438"] = 567,["439"] = 567,["440"] = 567,["441"] = 567,["442"] = 567,["443"] = 567,["444"] = 567,["445"] = 583,["446"] = 583,["447"] = 583,["448"] = 583,["449"] = 583,["450"] = 583,["451"] = 583,["452"] = 583,["453"] = 583,["454"] = 583,["455"] = 583,["456"] = 583,["457"] = 583,["458"] = 583,["459"] = 599,["460"] = 599,["461"] = 599,["462"] = 599,["463"] = 599,["464"] = 599,["465"] = 599,["466"] = 599,["467"] = 599,["468"] = 599,["469"] = 599,["470"] = 599,["471"] = 599,["472"] = 599,["473"] = 599,["474"] = 565,["475"] = 619,["476"] = 620,["477"] = 619,["478"] = 626,["479"] = 627,["480"] = 626,["481"] = 633,["482"] = 634,["483"] = 635,["484"] = 633,["485"] = 640});
local ____exports = {}
local ____ItemTypes = require("modules.inventory.ItemTypes")
local ItemType = ____ItemTypes.ItemType
local ItemRarity = ____ItemTypes.ItemRarity
local ____time_utils = require("utils.time_utils")
local getTimestampMs = ____time_utils.getTimestampMs
____exports.InventorySystem = __TS__Class()
local InventorySystem = ____exports.InventorySystem
InventorySystem.name = "InventorySystem"
function InventorySystem.prototype.____constructor(self)
    self.instanceIdCounter = 0
    self.defaultCapacity = 30
    self.playerInventories = __TS__New(Map)
    self.itemDefinitions = __TS__New(Map)
    self:initializeSystem()
    print("[InventorySystem] Initialized")
end
function InventorySystem.getInstance(self)
    if not ____exports.InventorySystem.instance then
        ____exports.InventorySystem.instance = __TS__New(____exports.InventorySystem)
    end
    return ____exports.InventorySystem.instance
end
function InventorySystem.prototype.initializeSystem(self)
    self:registerDefaultItems()
    ListenToGameEvent(
        "player_connect_full",
        function(____, event)
            local playerId = event.PlayerID
            self:createInventoryForPlayer(playerId)
        end,
        self
    )
    self:registerCustomEvents()
    print("[InventorySystem] System initialized")
end
function InventorySystem.prototype.registerCustomEvents(self)
    CustomGameEventManager:RegisterListener(
        "inventory_use_item",
        function(userId, event)
            local playerId = event.PlayerID
            local instanceId = event.instanceId
            self:handleUseItem(playerId, instanceId)
        end
    )
    CustomGameEventManager:RegisterListener(
        "inventory_drop_item",
        function(userId, event)
            local playerId = event.PlayerID
            local slotId = event.slotId
            self:handleDropItem(playerId, slotId)
        end
    )
    CustomGameEventManager:RegisterListener(
        "inventory_move_item",
        function(userId, event)
            local playerId = event.PlayerID
            local fromSlot = event.fromSlot
            local toSlot = event.toSlot
            self:handleMoveItem(playerId, fromSlot, toSlot)
        end
    )
end
function InventorySystem.prototype.createInventoryForPlayer(self, playerId, capacity)
    if self.playerInventories:has(playerId) then
        return self.playerInventories:get(playerId)
    end
    local inventoryCapacity = capacity or self.defaultCapacity
    local slots = {}
    do
        local i = 0
        while i < inventoryCapacity do
            slots[#slots + 1] = {slotId = i, item = nil, locked = false}
            i = i + 1
        end
    end
    local inventory = {
        playerId = playerId,
        slots = slots,
        capacity = inventoryCapacity,
        usedSlots = 0,
        gold = 0
    }
    self.playerInventories:set(playerId, inventory)
    self:syncInventoryToClient(playerId)
    print("[InventorySystem] Created inventory for player " .. tostring(playerId))
    return inventory
end
function InventorySystem.prototype.registerItem(self, definition)
    self.itemDefinitions:set(definition.id, definition)
    print("[InventorySystem] Registered item: " .. definition.id)
end
function InventorySystem.prototype.registerItems(self, definitions)
    for ____, def in ipairs(definitions) do
        self:registerItem(def)
    end
end
function InventorySystem.prototype.addItem(self, playerId, itemId, count, slotId)
    if count == nil then
        count = 1
    end
    local inventory = self.playerInventories:get(playerId)
    if not inventory then
        return {success = false, message = "Inventory not found"}
    end
    local definition = self.itemDefinitions:get(itemId)
    if not definition then
        return {success = false, message = "Item definition not found: " .. itemId}
    end
    if definition.maxStack > 1 then
        local existingSlot = __TS__ArrayFind(
            inventory.slots,
            function(____, slot) return slot.item ~= nil and slot.item.itemId == itemId and slot.item.stackCount < definition.maxStack end
        )
        if existingSlot and existingSlot.item then
            local addCount = math.min(count, definition.maxStack - existingSlot.item.stackCount)
            local ____existingSlot_item_0, ____stackCount_1 = existingSlot.item, "stackCount"
            ____existingSlot_item_0[____stackCount_1] = ____existingSlot_item_0[____stackCount_1] + addCount
            count = count - addCount
            self:syncInventoryToClient(playerId)
            if count == 0 then
                return {success = true, item = existingSlot.item, slotId = existingSlot.slotId}
            end
        end
    end
    while count > 0 do
        local ____temp_2
        if slotId ~= nil then
            ____temp_2 = inventory.slots[slotId + 1]
        else
            ____temp_2 = __TS__ArrayFind(
                inventory.slots,
                function(____, slot) return slot.item == nil end
            )
        end
        local targetSlot = ____temp_2
        if not targetSlot then
            return {success = false, message = "No empty slot available"}
        end
        if targetSlot.item ~= nil then
            return {success = false, message = "Slot already occupied"}
        end
        local stackSize = math.min(count, definition.maxStack)
        local instance = self:createItemInstance(itemId, playerId, stackSize)
        targetSlot.item = instance
        inventory.usedSlots = inventory.usedSlots + 1
        count = count - stackSize
        self:syncInventoryToClient(playerId)
        if count == 0 then
            return {success = true, item = instance, slotId = targetSlot.slotId}
        end
    end
    return {success = true}
end
function InventorySystem.prototype.removeItem(self, playerId, slotId, count)
    if count == nil then
        count = 1
    end
    local inventory = self.playerInventories:get(playerId)
    if not inventory then
        return {success = false, message = "Inventory not found"}
    end
    local slot = inventory.slots[slotId + 1]
    if not slot or not slot.item then
        return {success = false, message = "Slot is empty"}
    end
    if slot.locked then
        return {success = false, message = "Slot is locked"}
    end
    local item = slot.item
    if count >= item.stackCount then
        slot.item = nil
        inventory.usedSlots = inventory.usedSlots - 1
    else
        item.stackCount = item.stackCount - count
    end
    self:syncInventoryToClient(playerId)
    return {success = true, item = item, slotId = slotId}
end
function InventorySystem.prototype.useItem(self, playerId, slotId, target, position)
    local inventory = self.playerInventories:get(playerId)
    if not inventory then
        return {success = false, consumed = false, message = "Inventory not found"}
    end
    local slot = inventory.slots[slotId + 1]
    if not slot or not slot.item then
        return {success = false, consumed = false, message = "No item in slot"}
    end
    local item = slot.item
    local definition = self.itemDefinitions:get(item.itemId)
    if not definition then
        return {success = false, consumed = false, message = "Item definition not found"}
    end
    if not definition.consumable then
        return {success = false, consumed = false, message = "Item is not consumable"}
    end
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero or hero:IsNull() then
        return {success = false, consumed = false, message = "Hero not found"}
    end
    local context = {user = hero, target = target, position = position, itemInstance = item}
    local effectResult = self:applyItemEffect(context, definition)
    if effectResult.success then
        if definition.consumable then
            self:removeItem(playerId, slotId, 1)
        end
        return {success = true, consumed = true, message = "Used " .. definition.name, effects = effectResult.effects}
    end
    return effectResult
end
function InventorySystem.prototype.applyItemEffect(self, context, definition)
    local ____context_3 = context
    local user = ____context_3.user
    local target = ____context_3.target
    local position = ____context_3.position
    local effects = {}
    do
        local function ____catch(____error)
            print("[InventorySystem] Error applying item effect: " .. tostring(____error))
            return true, {
                success = false,
                consumed = false,
                message = "Failed to apply effect: " .. tostring(____error)
            }
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            if definition.consumeEffect then
                user:AddNewModifier(user, nil, definition.consumeEffect, {duration = definition.cooldown or -1})
                effects[#effects + 1] = "Applied " .. definition.consumeEffect
            end
            if definition.stats then
                self:applyStatsToUnit(user, definition.stats)
                effects[#effects + 1] = "Applied stat bonuses"
            end
            CustomGameEventManager:Send_ServerToAllClients("item_used", {playerId = context.itemInstance.ownerId, itemId = definition.id, itemName = definition.name})
            return true, {success = true, consumed = true, effects = effects}
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function InventorySystem.prototype.applyStatsToUnit(self, unit, stats)
    if stats.health then
        unit:SetMaxHealth(unit:GetMaxHealth() + stats.health)
        unit:SetHealth(unit:GetHealth() + stats.health)
    end
    if stats.mana then
        unit:SetMaxMana(unit:GetMaxMana() + stats.mana)
        unit:SetMana(unit:GetMana() + stats.mana)
    end
    if stats.damage then
        unit:SetBaseDamageMin(unit:GetBaseDamageMin() + stats.damage)
        unit:SetBaseDamageMax(unit:GetBaseDamageMax() + stats.damage)
    end
    if stats.armor then
        unit:SetPhysicalArmorBaseValue(unit:GetPhysicalArmorBaseValue() + stats.armor)
    end
    if stats.moveSpeed then
        unit:SetBaseMoveSpeed(unit:GetBaseMoveSpeed() + stats.moveSpeed)
    end
end
function InventorySystem.prototype.moveItem(self, playerId, fromSlot, toSlot)
    local inventory = self.playerInventories:get(playerId)
    if not inventory then
        return {success = false, message = "Inventory not found"}
    end
    local from = inventory.slots[fromSlot + 1]
    local to = inventory.slots[toSlot + 1]
    if not from or not to then
        return {success = false, message = "Invalid slot"}
    end
    if from.locked or to.locked then
        return {success = false, message = "Slot is locked"}
    end
    local temp = from.item
    from.item = to.item
    to.item = temp
    self:syncInventoryToClient(playerId)
    return {success = true}
end
function InventorySystem.prototype.dropItem(self, playerId, slotId)
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero or hero:IsNull() then
        return {success = false, message = "Hero not found"}
    end
    local removeResult = self:removeItem(playerId, slotId, 1)
    if not removeResult.success or not removeResult.item then
        return removeResult
    end
    local itemName = "item_" .. removeResult.item.itemId
    do
        local function ____catch(____error)
            print("[InventorySystem] Failed to create physical item: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            local physicalItem = CreateItem(itemName, nil, nil)
            if physicalItem then
                local position = hero:GetAbsOrigin()
                CreateItemOnPositionForLaunch(position, physicalItem)
                local randomOffset = Vector(
                    RandomFloat(-100, 100),
                    RandomFloat(-100, 100),
                    0
                )
                local targetPos = Vector(position.x + randomOffset.x, position.y + randomOffset.y, position.z)
                physicalItem:SetAbsOrigin(targetPos)
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
    return {success = true, item = removeResult.item}
end
function InventorySystem.prototype.getInventory(self, playerId)
    return self.playerInventories:get(playerId) or nil
end
function InventorySystem.prototype.hasEmptySlot(self, playerId)
    local inventory = self.playerInventories:get(playerId)
    if not inventory then
        return false
    end
    return __TS__ArraySome(
        inventory.slots,
        function(____, slot) return slot.item == nil end
    )
end
function InventorySystem.prototype.findItem(self, playerId, itemId)
    local inventory = self.playerInventories:get(playerId)
    if not inventory then
        return nil
    end
    return __TS__ArrayFind(
        inventory.slots,
        function(____, slot)
            local ____opt_4 = slot.item
            return (____opt_4 and ____opt_4.itemId) == itemId
        end
    ) or nil
end
function InventorySystem.prototype.createItemInstance(self, itemId, ownerId, stackCount)
    if stackCount == nil then
        stackCount = 1
    end
    self.instanceIdCounter = self.instanceIdCounter + 1
    return {
        instanceId = (("item_" .. tostring(self.instanceIdCounter)) .. "_") .. tostring(Date:now()),
        itemId = itemId,
        ownerId = ownerId,
        stackCount = stackCount,
        acquiredTime = getTimestampMs(nil),
        equipped = false,
        locked = false
    }
end
function InventorySystem.prototype.syncInventoryToClient(self, playerId)
    local inventory = self.playerInventories:get(playerId)
    if not inventory or not GameRules.XNetTable then
        return
    end
    local inventoryData = {
        playerId = playerId,
        capacity = inventory.capacity,
        usedSlots = inventory.usedSlots,
        gold = inventory.gold,
        slots = __TS__ArrayMap(
            inventory.slots,
            function(____, slot)
                local ____slot_slotId_7 = slot.slotId
                local ____slot_locked_8 = slot.locked
                local ____slot_item_6
                if slot.item then
                    ____slot_item_6 = {
                        instanceId = slot.item.instanceId,
                        itemId = slot.item.itemId,
                        stackCount = slot.item.stackCount,
                        equipped = slot.item.equipped,
                        locked = slot.item.locked,
                        charges = slot.item.charges
                    }
                else
                    ____slot_item_6 = nil
                end
                return {slotId = ____slot_slotId_7, locked = ____slot_locked_8, item = ____slot_item_6}
            end
        )
    }
    GameRules.XNetTable:SetTableValue(
        "player_inventory",
        "player_" .. tostring(playerId),
        inventoryData
    )
end
function InventorySystem.prototype.handleUseItem(self, playerId, instanceId)
    local inventory = self.playerInventories:get(playerId)
    if not inventory then
        return
    end
    local slot = __TS__ArrayFind(
        inventory.slots,
        function(____, s)
            local ____opt_9 = s.item
            return (____opt_9 and ____opt_9.instanceId) == instanceId
        end
    )
    if slot then
        self:useItem(playerId, slot.slotId)
    end
end
function InventorySystem.prototype.handleDropItem(self, playerId, slotId)
    self:dropItem(playerId, slotId)
end
function InventorySystem.prototype.handleMoveItem(self, playerId, fromSlot, toSlot)
    self:moveItem(playerId, fromSlot, toSlot)
end
function InventorySystem.prototype.registerDefaultItems(self)
    self:registerItem({
        id = "health_potion",
        name = "生命药水",
        description = "恢复200点生命值",
        type = ItemType.CONSUMABLE,
        rarity = ItemRarity.COMMON,
        icon = "panorama/images/items/health_potion_png.vtex",
        maxStack = 5,
        cost = 50,
        sellPrice = 25,
        consumable = true,
        consumeEffect = "modifier_health_potion",
        stats = {health = 200}
    })
    self:registerItem({
        id = "mana_potion",
        name = "魔法药水",
        description = "恢复150点魔法值",
        type = ItemType.CONSUMABLE,
        rarity = ItemRarity.COMMON,
        icon = "panorama/images/items/mana_potion_png.vtex",
        maxStack = 5,
        cost = 50,
        sellPrice = 25,
        consumable = true,
        consumeEffect = "modifier_mana_potion",
        stats = {mana = 150}
    })
    self:registerItem({
        id = "strength_potion",
        name = "力量药水",
        description = "临时增加20点攻击力，持续30秒",
        type = ItemType.CONSUMABLE,
        rarity = ItemRarity.UNCOMMON,
        icon = "panorama/images/items/strength_potion_png.vtex",
        maxStack = 3,
        cost = 100,
        sellPrice = 50,
        consumable = true,
        consumeEffect = "modifier_strength_potion",
        cooldown = 30,
        stats = {damage = 20}
    })
end
function InventorySystem.prototype.getItemDefinition(self, itemId)
    return self.itemDefinitions:get(itemId) or nil
end
function InventorySystem.prototype.getAllItemDefinitions(self)
    return __TS__ArrayFrom(self.itemDefinitions:values())
end
function InventorySystem.prototype.clearPlayerInventory(self, playerId)
    self.playerInventories:delete(playerId)
    print("[InventorySystem] Cleared inventory for player " .. tostring(playerId))
end
____exports.inventorySystem = ____exports.InventorySystem:getInstance()
return ____exports
