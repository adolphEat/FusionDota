/**
 * 背包系统 - 管理玩家道具背包
 * Inventory System - Manages player item inventory
 * 
 * 参考自走棋项目zizouqi的道具系统设计
 */

import {
    ItemDefinition,
    ItemInstance,
    ItemType,
    ItemRarity,
    InventorySlot,
    PlayerInventory,
    InventoryOperationResult,
    ItemUseContext,
    ItemUseResult
} from './ItemTypes';
import { getTimestampMs } from '../../utils/time_utils';

export class InventorySystem {
    private static instance: InventorySystem;
    private playerInventories: Map<PlayerID, PlayerInventory>;
    private itemDefinitions: Map<string, ItemDefinition>;
    private instanceIdCounter: number = 0;
    private defaultCapacity: number = 30;

    private constructor() {
        this.playerInventories = new Map();
        this.itemDefinitions = new Map();
        this.initializeSystem();
        print('[InventorySystem] Initialized');
    }

    public static getInstance(): InventorySystem {
        if (!InventorySystem.instance) {
            InventorySystem.instance = new InventorySystem();
        }
        return InventorySystem.instance;
    }

    /**
     * 初始化系统
     */
    private initializeSystem(): void {
        // 注册默认道具
        this.registerDefaultItems();
        
        // 监听玩家连接
        ListenToGameEvent('player_connect_full', (event) => {
            const playerId = event.PlayerID as PlayerID;
            this.createInventoryForPlayer(playerId);
        }, this);

        // 注册自定义事件
        this.registerCustomEvents();

        print('[InventorySystem] System initialized');
    }

    /**
     * 注册自定义事件
     */
    private registerCustomEvents(): void {
        // 使用道具
        CustomGameEventManager.RegisterListener('inventory_use_item', (userId, event) => {
            const playerId = (event as any).PlayerID as PlayerID;
            const instanceId = (event as any).instanceId as string;
            this.handleUseItem(playerId, instanceId);
        });

        // 丢弃道具
        CustomGameEventManager.RegisterListener('inventory_drop_item', (userId, event) => {
            const playerId = (event as any).PlayerID as PlayerID;
            const slotId = (event as any).slotId as number;
            this.handleDropItem(playerId, slotId);
        });

        // 移动道具
        CustomGameEventManager.RegisterListener('inventory_move_item', (userId, event) => {
            const playerId = (event as any).PlayerID as PlayerID;
            const fromSlot = (event as any).fromSlot as number;
            const toSlot = (event as any).toSlot as number;
            this.handleMoveItem(playerId, fromSlot, toSlot);
        });
    }

    /**
     * 为玩家创建背包
     */
    public createInventoryForPlayer(playerId: PlayerID, capacity?: number): PlayerInventory {
        if (this.playerInventories.has(playerId)) {
            return this.playerInventories.get(playerId)!;
        }

        const inventoryCapacity = capacity || this.defaultCapacity;
        const slots: InventorySlot[] = [];
        
        for (let i = 0; i < inventoryCapacity; i++) {
            slots.push({
                slotId: i,
                item: null,
                locked: false
            });
        }

        const inventory: PlayerInventory = {
            playerId: playerId,
            slots: slots,
            capacity: inventoryCapacity,
            usedSlots: 0,
            gold: 0
        };

        this.playerInventories.set(playerId, inventory);
        this.syncInventoryToClient(playerId);

        print(`[InventorySystem] Created inventory for player ${playerId}`);
        return inventory;
    }

    /**
     * 注册道具定义
     */
    public registerItem(definition: ItemDefinition): void {
        this.itemDefinitions.set(definition.id, definition);
        print(`[InventorySystem] Registered item: ${definition.id}`);
    }

    /**
     * 批量注册道具
     */
    public registerItems(definitions: ItemDefinition[]): void {
        for (const def of definitions) {
            this.registerItem(def);
        }
    }

    /**
     * 添加道具到背包
     */
    public addItem(
        playerId: PlayerID,
        itemId: string,
        count: number = 1,
        slotId?: number
    ): InventoryOperationResult {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            return { success: false, message: 'Inventory not found' };
        }

        const definition = this.itemDefinitions.get(itemId);
        if (!definition) {
            return { success: false, message: `Item definition not found: ${itemId}` };
        }

        // 如果可堆叠，先尝试添加到现有堆叠
        if (definition.maxStack > 1) {
            const existingSlot = inventory.slots.find(slot => 
                slot.item !== null && 
                slot.item.itemId === itemId && 
                slot.item.stackCount < definition.maxStack
            );

            if (existingSlot && existingSlot.item) {
                const addCount = Math.min(count, definition.maxStack - existingSlot.item.stackCount);
                existingSlot.item.stackCount += addCount;
                count -= addCount;

                this.syncInventoryToClient(playerId);

                if (count === 0) {
                    return { 
                        success: true, 
                        item: existingSlot.item, 
                        slotId: existingSlot.slotId 
                    };
                }
            }
        }

        // 添加新堆叠或单个道具
        while (count > 0) {
            const targetSlot = slotId !== undefined 
                ? inventory.slots[slotId] 
                : inventory.slots.find(slot => slot.item === null);

            if (!targetSlot) {
                return { success: false, message: 'No empty slot available' };
            }

            if (targetSlot.item !== null) {
                return { success: false, message: 'Slot already occupied' };
            }

            const stackSize = Math.min(count, definition.maxStack);
            const instance = this.createItemInstance(itemId, playerId, stackSize);
            
            targetSlot.item = instance;
            inventory.usedSlots++;
            count -= stackSize;

            this.syncInventoryToClient(playerId);

            if (count === 0) {
                return { success: true, item: instance, slotId: targetSlot.slotId };
            }
        }

        return { success: true };
    }

    /**
     * 移除道具
     */
    public removeItem(
        playerId: PlayerID,
        slotId: number,
        count: number = 1
    ): InventoryOperationResult {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            return { success: false, message: 'Inventory not found' };
        }

        const slot = inventory.slots[slotId];
        if (!slot || !slot.item) {
            return { success: false, message: 'Slot is empty' };
        }

        if (slot.locked) {
            return { success: false, message: 'Slot is locked' };
        }

        const item = slot.item;
        
        if (count >= item.stackCount) {
            // 移除整个堆叠
            slot.item = null;
            inventory.usedSlots--;
        } else {
            // 减少堆叠数量
            item.stackCount -= count;
        }

        this.syncInventoryToClient(playerId);

        return { success: true, item: item, slotId: slotId };
    }

    /**
     * 使用道具
     */
    public useItem(
        playerId: PlayerID,
        slotId: number,
        target?: CDOTA_BaseNPC,
        position?: Vector
    ): ItemUseResult {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            return { success: false, consumed: false, message: 'Inventory not found' };
        }

        const slot = inventory.slots[slotId];
        if (!slot || !slot.item) {
            return { success: false, consumed: false, message: 'No item in slot' };
        }

        const item = slot.item;
        const definition = this.itemDefinitions.get(item.itemId);
        
        if (!definition) {
            return { success: false, consumed: false, message: 'Item definition not found' };
        }

        if (!definition.consumable) {
            return { success: false, consumed: false, message: 'Item is not consumable' };
        }

        // 获取使用者（玩家的英雄）
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero || hero.IsNull()) {
            return { success: false, consumed: false, message: 'Hero not found' };
        }

        // 创建使用上下文
        const context: ItemUseContext = {
            user: hero,
            target: target,
            position: position,
            itemInstance: item
        };

        // 执行道具效果
        const effectResult = this.applyItemEffect(context, definition);

        if (effectResult.success) {
            // 消耗道具
            if (definition.consumable) {
                this.removeItem(playerId, slotId, 1);
            }

            return {
                success: true,
                consumed: true,
                message: `Used ${definition.name}`,
                effects: effectResult.effects
            };
        }

        return effectResult;
    }

    /**
     * 应用道具效果
     */
    private applyItemEffect(context: ItemUseContext, definition: ItemDefinition): ItemUseResult {
        const { user, target, position } = context;
        const effects: string[] = [];

        try {
            // 如果有消耗效果（Modifier）
            if (definition.consumeEffect) {
                user.AddNewModifier(user, undefined, definition.consumeEffect, {
                    duration: definition.cooldown || -1
                });
                effects.push(`Applied ${definition.consumeEffect}`);
            }

            // 如果有属性加成（临时或永久）
            if (definition.stats) {
                this.applyStatsToUnit(user, definition.stats);
                effects.push('Applied stat bonuses');
            }

            // 发送游戏事件
            (CustomGameEventManager.Send_ServerToAllClients as any)('item_used', {
                playerId: context.itemInstance.ownerId,
                itemId: definition.id,
                itemName: definition.name
            });

            return {
                success: true,
                consumed: true,
                effects: effects
            };

        } catch (error) {
            print(`[InventorySystem] Error applying item effect: ${error}`);
            return {
                success: false,
                consumed: false,
                message: `Failed to apply effect: ${error}`
            };
        }
    }

    /**
     * 应用属性到单位
     */
    private applyStatsToUnit(unit: CDOTA_BaseNPC, stats: any): void {
        if (stats.health) {
            unit.SetMaxHealth(unit.GetMaxHealth() + stats.health);
            unit.SetHealth(unit.GetHealth() + stats.health);
        }
        if (stats.mana) {
            unit.SetMaxMana(unit.GetMaxMana() + stats.mana);
            unit.SetMana(unit.GetMana() + stats.mana);
        }
        if (stats.damage) {
            unit.SetBaseDamageMin(unit.GetBaseDamageMin() + stats.damage);
            unit.SetBaseDamageMax(unit.GetBaseDamageMax() + stats.damage);
        }
        if (stats.armor) {
            unit.SetPhysicalArmorBaseValue(unit.GetPhysicalArmorBaseValue() + stats.armor);
        }
        if (stats.moveSpeed) {
            unit.SetBaseMoveSpeed(unit.GetBaseMoveSpeed() + stats.moveSpeed);
        }
    }

    /**
     * 移动道具
     */
    public moveItem(playerId: PlayerID, fromSlot: number, toSlot: number): InventoryOperationResult {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            return { success: false, message: 'Inventory not found' };
        }

        const from = inventory.slots[fromSlot];
        const to = inventory.slots[toSlot];

        if (!from || !to) {
            return { success: false, message: 'Invalid slot' };
        }

        if (from.locked || to.locked) {
            return { success: false, message: 'Slot is locked' };
        }

        // 交换道具
        const temp = from.item;
        from.item = to.item;
        to.item = temp;

        this.syncInventoryToClient(playerId);

        return { success: true };
    }

    /**
     * 丢弃道具到地面
     */
    public dropItem(playerId: PlayerID, slotId: number): InventoryOperationResult {
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero || hero.IsNull()) {
            return { success: false, message: 'Hero not found' };
        }

        const removeResult = this.removeItem(playerId, slotId, 1);
        if (!removeResult.success || !removeResult.item) {
            return removeResult;
        }

        // 在地面创建物理道具
        const itemName = `item_${removeResult.item.itemId}`;
        try {
            const physicalItem = CreateItem(itemName, undefined, undefined);
            
            if (physicalItem) {
                const position = hero.GetAbsOrigin();
                CreateItemOnPositionForLaunch(position, physicalItem);
                const randomOffset = Vector(
                    RandomFloat(-100, 100),
                    RandomFloat(-100, 100),
                    0
                );
                const targetPos = Vector(
                    position.x + randomOffset.x,
                    position.y + randomOffset.y,
                    position.z
                );
                physicalItem.SetAbsOrigin(targetPos);
            }
        } catch (error) {
            print(`[InventorySystem] Failed to create physical item: ${error}`);
        }

        return { success: true, item: removeResult.item };
    }

    /**
     * 获取背包信息
     */
    public getInventory(playerId: PlayerID): PlayerInventory | null {
        return this.playerInventories.get(playerId) || null;
    }

    /**
     * 检查是否有空槽位
     */
    public hasEmptySlot(playerId: PlayerID): boolean {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) return false;

        return inventory.slots.some(slot => slot.item === null);
    }

    /**
     * 查找道具
     */
    public findItem(playerId: PlayerID, itemId: string): InventorySlot | null {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) return null;

        return inventory.slots.find(slot => slot.item?.itemId === itemId) || null;
    }

    /**
     * 创建道具实例
     */
    private createItemInstance(
        itemId: string,
        ownerId: PlayerID,
        stackCount: number = 1
    ): ItemInstance {
        this.instanceIdCounter++;
        
        return {
            instanceId: `item_${this.instanceIdCounter}_${Date.now()}`,
            itemId: itemId,
            ownerId: ownerId,
            stackCount: stackCount,
            acquiredTime: getTimestampMs(),
            equipped: false,
            locked: false
        };
    }

    /**
     * 同步背包到客户端
     */
    private syncInventoryToClient(playerId: PlayerID): void {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory || !GameRules.XNetTable) {
            return;
        }

        const inventoryData = {
            playerId: playerId,
            capacity: inventory.capacity,
            usedSlots: inventory.usedSlots,
            gold: inventory.gold,
            slots: inventory.slots.map(slot => ({
                slotId: slot.slotId,
                locked: slot.locked,
                item: slot.item ? {
                    instanceId: slot.item.instanceId,
                    itemId: slot.item.itemId,
                    stackCount: slot.item.stackCount,
                    equipped: slot.item.equipped,
                    locked: slot.item.locked,
                    charges: slot.item.charges
                } : null
            }))
        };

        GameRules.XNetTable.SetTableValue('player_inventory', `player_${playerId}`, inventoryData);
    }

    /**
     * 事件处理：使用道具
     */
    private handleUseItem(playerId: PlayerID, instanceId: string): void {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) return;

        const slot = inventory.slots.find(s => s.item?.instanceId === instanceId);
        if (slot) {
            this.useItem(playerId, slot.slotId);
        }
    }

    /**
     * 事件处理：丢弃道具
     */
    private handleDropItem(playerId: PlayerID, slotId: number): void {
        this.dropItem(playerId, slotId);
    }

    /**
     * 事件处理：移动道具
     */
    private handleMoveItem(playerId: PlayerID, fromSlot: number, toSlot: number): void {
        this.moveItem(playerId, fromSlot, toSlot);
    }

    /**
     * 注册默认道具（示例）
     */
    private registerDefaultItems(): void {
        // 示例：生命药水
        this.registerItem({
            id: 'health_potion',
            name: '生命药水',
            description: '恢复200点生命值',
            type: ItemType.CONSUMABLE,
            rarity: ItemRarity.COMMON,
            icon: 'panorama/images/items/health_potion_png.vtex',
            maxStack: 5,
            cost: 50,
            sellPrice: 25,
            consumable: true,
            consumeEffect: 'modifier_health_potion',
            stats: { health: 200 }
        });

        // 示例：魔法药水
        this.registerItem({
            id: 'mana_potion',
            name: '魔法药水',
            description: '恢复150点魔法值',
            type: ItemType.CONSUMABLE,
            rarity: ItemRarity.COMMON,
            icon: 'panorama/images/items/mana_potion_png.vtex',
            maxStack: 5,
            cost: 50,
            sellPrice: 25,
            consumable: true,
            consumeEffect: 'modifier_mana_potion',
            stats: { mana: 150 }
        });

        // 示例：力量药水
        this.registerItem({
            id: 'strength_potion',
            name: '力量药水',
            description: '临时增加20点攻击力，持续30秒',
            type: ItemType.CONSUMABLE,
            rarity: ItemRarity.UNCOMMON,
            icon: 'panorama/images/items/strength_potion_png.vtex',
            maxStack: 3,
            cost: 100,
            sellPrice: 50,
            consumable: true,
            consumeEffect: 'modifier_strength_potion',
            cooldown: 30,
            stats: { damage: 20 }
        });
    }

    /**
     * 获取道具定义
     */
    public getItemDefinition(itemId: string): ItemDefinition | null {
        return this.itemDefinitions.get(itemId) || null;
    }

    /**
     * 获取所有道具定义
     */
    public getAllItemDefinitions(): ItemDefinition[] {
        return Array.from(this.itemDefinitions.values());
    }

    /**
     * 清理玩家数据
     */
    public clearPlayerInventory(playerId: PlayerID): void {
        this.playerInventories.delete(playerId);
        print(`[InventorySystem] Cleared inventory for player ${playerId}`);
    }
}

// 导出单例
export const inventorySystem = InventorySystem.getInstance();

