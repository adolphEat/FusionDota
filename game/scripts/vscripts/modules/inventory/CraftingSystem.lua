local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 8,["11"] = 8,["12"] = 9,["13"] = 9,["14"] = 10,["15"] = 10,["16"] = 12,["17"] = 12,["18"] = 12,["20"] = 17,["21"] = 18,["22"] = 19,["23"] = 20,["24"] = 16,["25"] = 23,["26"] = 24,["27"] = 25,["29"] = 27,["30"] = 23,["31"] = 33,["32"] = 35,["33"] = 44,["34"] = 54,["35"] = 33,["36"] = 60,["37"] = 62,["38"] = 62,["39"] = 62,["40"] = 62,["41"] = 62,["42"] = 62,["43"] = 62,["44"] = 62,["45"] = 62,["46"] = 62,["47"] = 62,["48"] = 62,["49"] = 62,["50"] = 62,["51"] = 62,["52"] = 79,["53"] = 79,["54"] = 79,["55"] = 79,["56"] = 79,["57"] = 79,["58"] = 79,["59"] = 79,["60"] = 79,["61"] = 79,["62"] = 79,["63"] = 79,["64"] = 79,["65"] = 79,["66"] = 79,["67"] = 60,["68"] = 102,["69"] = 104,["70"] = 104,["71"] = 104,["72"] = 105,["73"] = 106,["74"] = 104,["75"] = 104,["76"] = 110,["77"] = 110,["78"] = 110,["79"] = 111,["80"] = 112,["81"] = 113,["82"] = 110,["83"] = 110,["84"] = 102,["85"] = 120,["86"] = 121,["87"] = 122,["88"] = 120,["89"] = 128,["90"] = 129,["91"] = 130,["92"] = 131,["94"] = 134,["95"] = 135,["96"] = 136,["98"] = 140,["99"] = 141,["101"] = 145,["102"] = 146,["103"] = 147,["104"] = 148,["107"] = 152,["108"] = 128,["109"] = 158,["110"] = 163,["111"] = 164,["112"] = 165,["114"] = 171,["115"] = 172,["117"] = 178,["118"] = 179,["119"] = 180,["121"] = 187,["122"] = 188,["124"] = 192,["125"] = 195,["126"] = 197,["127"] = 199,["128"] = 202,["129"] = 203,["130"] = 204,["131"] = 208,["132"] = 209,["133"] = 204,["135"] = 214,["136"] = 216,["138"] = 223,["139"] = 158,["140"] = 232,["141"] = 233,["142"] = 235,["143"] = 235,["144"] = 235,["145"] = 236,["146"] = 237,["149"] = 242,["150"] = 243,["151"] = 243,["152"] = 243,["153"] = 243,["154"] = 243,["155"] = 243,["156"] = 243,["157"] = 243,["159"] = 249,["160"] = 232,["161"] = 255,["162"] = 256,["163"] = 255,["164"] = 262,["165"] = 263,["166"] = 262,["167"] = 269,["168"] = 270,["169"] = 271,["170"] = 272,["172"] = 275,["173"] = 276,["174"] = 277,["175"] = 278,["178"] = 282,["179"] = 269,["180"] = 288,["181"] = 289,["182"] = 290,["185"] = 294,["187"] = 296,["188"] = 296,["189"] = 297,["190"] = 298,["191"] = 299,["192"] = 300,["193"] = 301,["195"] = 296,["198"] = 288,["199"] = 309,["200"] = 310,["201"] = 311,["204"] = 316,["205"] = 309,["206"] = 325,["207"] = 326,["208"] = 328,["209"] = 329,["210"] = 330,["211"] = 331,["214"] = 325,["215"] = 345});
local ____exports = {}
local ____InventorySystem = require("modules.inventory.InventorySystem")
local inventorySystem = ____InventorySystem.inventorySystem
local ____ItemTypes = require("modules.inventory.ItemTypes")
local ItemRarity = ____ItemTypes.ItemRarity
local ____time_utils = require("utils.time_utils")
local getTimestamp = ____time_utils.getTimestamp
____exports.CraftingSystem = __TS__Class()
local CraftingSystem = ____exports.CraftingSystem
CraftingSystem.name = "CraftingSystem"
function CraftingSystem.prototype.____constructor(self)
    self.recipes = __TS__New(Map)
    self:initializeRecipes()
    self:registerEvents()
    print("[CraftingSystem] Initialized")
end
function CraftingSystem.getInstance(self)
    if not ____exports.CraftingSystem.instance then
        ____exports.CraftingSystem.instance = __TS__New(____exports.CraftingSystem)
    end
    return ____exports.CraftingSystem.instance
end
function CraftingSystem.prototype.initializeRecipes(self)
    self:registerRecipe({resultItemId = "greater_health_potion", materials = {{itemId = "health_potion", count = 3}}, cost = 50})
    self:registerRecipe({resultItemId = "power_bracer", materials = {{itemId = "strength_potion", count = 2}, {itemId = "health_potion", count = 1}}, cost = 100})
    self:registerCraftedItems()
end
function CraftingSystem.prototype.registerCraftedItems(self)
    inventorySystem:registerItem({
        id = "greater_health_potion",
        name = "高级生命药水",
        description = "恢复500点生命值",
        type = "consumable",
        rarity = ItemRarity.UNCOMMON,
        icon = "panorama/images/items/greater_health_potion_png.vtex",
        maxStack = 3,
        cost = 200,
        sellPrice = 100,
        consumable = true,
        consumeEffect = "modifier_greater_health_potion",
        isRecipeResult = true,
        stats = {health = 500}
    })
    inventorySystem:registerItem({
        id = "power_bracer",
        name = "力量护腕",
        description = "永久增加10点攻击力和100点生命值",
        type = "equipment",
        rarity = ItemRarity.RARE,
        icon = "panorama/images/items/power_bracer_png.vtex",
        maxStack = 1,
        cost = 350,
        sellPrice = 175,
        consumable = true,
        equipSlot = "trinket",
        isRecipeResult = true,
        stats = {damage = 10, health = 100}
    })
end
function CraftingSystem.prototype.registerEvents(self)
    CustomGameEventManager:RegisterListener(
        "request_find_combinable_item",
        function(userId, event)
            local playerId = event.PlayerID
            self:findCraftableItems(playerId)
        end
    )
    CustomGameEventManager:RegisterListener(
        "request_combine_item",
        function(userId, event)
            local playerId = event.PlayerID
            local resultItemId = event.resultItemId
            self:craftItem(playerId, resultItemId)
        end
    )
end
function CraftingSystem.prototype.registerRecipe(self, recipe)
    self.recipes:set(recipe.resultItemId, recipe)
    print("[CraftingSystem] Registered recipe: " .. recipe.resultItemId)
end
function CraftingSystem.prototype.canCraft(self, playerId, resultItemId)
    local recipe = self.recipes:get(resultItemId)
    if not recipe then
        return false
    end
    local inventory = inventorySystem:getInventory(playerId)
    if not inventory then
        return false
    end
    if inventory.gold < recipe.cost then
        return false
    end
    for ____, material in ipairs(recipe.materials) do
        local totalCount = self:countItemInInventory(playerId, material.itemId)
        if totalCount < material.count then
            return false
        end
    end
    return true
end
function CraftingSystem.prototype.craftItem(self, playerId, resultItemId)
    local recipe = self.recipes:get(resultItemId)
    if not recipe then
        return {success = false, message = "Recipe not found: " .. resultItemId}
    end
    if not self:canCraft(playerId, resultItemId) then
        return {success = false, message = "Not enough materials or gold"}
    end
    local inventory = inventorySystem:getInventory(playerId)
    if not inventory then
        return {success = false, message = "Inventory not found"}
    end
    for ____, material in ipairs(recipe.materials) do
        self:consumeMaterial(playerId, material.itemId, material.count)
    end
    inventory.gold = inventory.gold - recipe.cost
    local addResult = inventorySystem:addItem(playerId, resultItemId, 1)
    if addResult.success then
        self:playCraftEffect(playerId)
        local player = PlayerResource:GetPlayer(playerId)
        if player then
            local ____CustomGameEventManager_Send_ServerToPlayer_3 = CustomGameEventManager.Send_ServerToPlayer
            local ____resultItemId_2 = resultItemId
            local ____opt_0 = inventorySystem:getItemDefinition(resultItemId)
            ____CustomGameEventManager_Send_ServerToPlayer_3(CustomGameEventManager, player, "item_crafted", {itemId = ____resultItemId_2, itemName = ____opt_0 and ____opt_0.name or resultItemId})
        end
        print((("[CraftingSystem] Player " .. tostring(playerId)) .. " crafted ") .. resultItemId)
        return {success = true, resultItem = resultItemId, message = "Crafted " .. resultItemId}
    end
    return {success = false, message = "Failed to add crafted item"}
end
function CraftingSystem.prototype.findCraftableItems(self, playerId)
    local craftable = {}
    for ____, ____value in __TS__Iterator(self.recipes) do
        local resultItemId = ____value[1]
        local recipe = ____value[2]
        if self:canCraft(playerId, resultItemId) then
            craftable[#craftable + 1] = resultItemId
        end
    end
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "crafting_system",
            ("player_" .. tostring(playerId)) .. "_craftable",
            {
                items = craftable,
                timestamp = getTimestamp(nil)
            }
        )
    end
    return craftable
end
function CraftingSystem.prototype.getRecipe(self, resultItemId)
    return self.recipes:get(resultItemId) or nil
end
function CraftingSystem.prototype.getAllRecipes(self)
    return __TS__ArrayFrom(self.recipes:values())
end
function CraftingSystem.prototype.countItemInInventory(self, playerId, itemId)
    local inventory = inventorySystem:getInventory(playerId)
    if not inventory then
        return 0
    end
    local total = 0
    for ____, slot in ipairs(inventory.slots) do
        if slot.item and slot.item.itemId == itemId then
            total = total + slot.item.stackCount
        end
    end
    return total
end
function CraftingSystem.prototype.consumeMaterial(self, playerId, itemId, count)
    local inventory = inventorySystem:getInventory(playerId)
    if not inventory then
        return
    end
    local remaining = count
    do
        local i = 0
        while i < #inventory.slots and remaining > 0 do
            local slot = inventory.slots[i + 1]
            if slot.item and slot.item.itemId == itemId then
                local removeCount = math.min(remaining, slot.item.stackCount)
                inventorySystem:removeItem(playerId, slot.slotId, removeCount)
                remaining = remaining - removeCount
            end
            i = i + 1
        end
    end
end
function CraftingSystem.prototype.playCraftEffect(self, playerId)
    local hero = PlayerResource:GetSelectedHeroEntity(playerId)
    if not hero or hero:IsNull() then
        return
    end
    EmitSoundOn("General.Combine", hero)
end
function CraftingSystem.prototype.autoDetectCraftable(self, playerId)
    local craftable = self:findCraftableItems(playerId)
    if #craftable > 0 then
        local player = PlayerResource:GetPlayer(playerId)
        if player then
            CustomGameEventManager:Send_ServerToPlayer(player, "craftable_items_available", {count = #craftable, items = craftable})
        end
    end
end
____exports.craftingSystem = ____exports.CraftingSystem:getInstance()
return ____exports
