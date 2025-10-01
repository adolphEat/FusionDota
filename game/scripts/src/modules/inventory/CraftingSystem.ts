/**
 * 道具合成系统
 * Item Crafting System
 * 
 * 参考zizouqi的合成系统设计
 */

import { inventorySystem } from './InventorySystem';
import { CraftingRecipe, RecipeMaterial, ItemDefinition, ItemRarity } from './ItemTypes';
import { getTimestamp } from '../../utils/time_utils';

export class CraftingSystem {
    private static instance: CraftingSystem;
    private recipes: Map<string, CraftingRecipe>;  // resultItemId -> recipe

    private constructor() {
        this.recipes = new Map();
        this.initializeRecipes();
        this.registerEvents();
        print('[CraftingSystem] Initialized');
    }

    public static getInstance(): CraftingSystem {
        if (!CraftingSystem.instance) {
            CraftingSystem.instance = new CraftingSystem();
        }
        return CraftingSystem.instance;
    }

    /**
     * 初始化合成配方
     */
    private initializeRecipes(): void {
        // 示例配方：高级生命药水
        this.registerRecipe({
            resultItemId: 'greater_health_potion',
            materials: [
                { itemId: 'health_potion', count: 3 }
            ],
            cost: 50
        });

        // 示例配方：力量护腕
        this.registerRecipe({
            resultItemId: 'power_bracer',
            materials: [
                { itemId: 'strength_potion', count: 2 },
                { itemId: 'health_potion', count: 1 }
            ],
            cost: 100
        });

        // 注册合成产物的道具定义
        this.registerCraftedItems();
    }

    /**
     * 注册合成产物道具
     */
    private registerCraftedItems(): void {
        // 高级生命药水
        inventorySystem.registerItem({
            id: 'greater_health_potion',
            name: '高级生命药水',
            description: '恢复500点生命值',
            type: 'consumable' as any,
            rarity: ItemRarity.UNCOMMON,
            icon: 'panorama/images/items/greater_health_potion_png.vtex',
            maxStack: 3,
            cost: 200,
            sellPrice: 100,
            consumable: true,
            consumeEffect: 'modifier_greater_health_potion',
            isRecipeResult: true,
            stats: { health: 500 }
        });

        // 力量护腕
        inventorySystem.registerItem({
            id: 'power_bracer',
            name: '力量护腕',
            description: '永久增加10点攻击力和100点生命值',
            type: 'equipment' as any,
            rarity: ItemRarity.RARE,
            icon: 'panorama/images/items/power_bracer_png.vtex',
            maxStack: 1,
            cost: 350,
            sellPrice: 175,
            consumable: true,  // 装备也可以"使用"来装备
            equipSlot: 'trinket',
            isRecipeResult: true,
            stats: { 
                damage: 10,
                health: 100
            }
        });
    }

    /**
     * 注册事件
     */
    private registerEvents(): void {
        // 请求查找可合成道具
        CustomGameEventManager.RegisterListener('request_find_combinable_item', (userId, event) => {
            const playerId = event.PlayerID as PlayerID;
            this.findCraftableItems(playerId);
        });

        // 请求合成道具
        CustomGameEventManager.RegisterListener('request_combine_item', (userId, event) => {
            const playerId = (event as any).PlayerID as PlayerID;
            const resultItemId = (event as any).resultItemId as string;
            this.craftItem(playerId, resultItemId);
        });
    }

    /**
     * 注册合成配方
     */
    public registerRecipe(recipe: CraftingRecipe): void {
        this.recipes.set(recipe.resultItemId, recipe);
        print(`[CraftingSystem] Registered recipe: ${recipe.resultItemId}`);
    }

    /**
     * 检查玩家是否可以合成某个道具
     */
    public canCraft(playerId: PlayerID, resultItemId: string): boolean {
        const recipe = this.recipes.get(resultItemId);
        if (!recipe) {
            return false;
        }

        const inventory = inventorySystem.getInventory(playerId);
        if (!inventory) {
            return false;
        }

        // 检查金币
        if (inventory.gold < recipe.cost) {
            return false;
        }

        // 检查材料
        for (const material of recipe.materials) {
            const totalCount = this.countItemInInventory(playerId, material.itemId);
            if (totalCount < material.count) {
                return false;
            }
        }

        return true;
    }

    /**
     * 合成道具
     */
    public craftItem(playerId: PlayerID, resultItemId: string): {
        success: boolean;
        message?: string;
        resultItem?: string;
    } {
        const recipe = this.recipes.get(resultItemId);
        if (!recipe) {
            return { 
                success: false, 
                message: `Recipe not found: ${resultItemId}` 
            };
        }

        if (!this.canCraft(playerId, resultItemId)) {
            return { 
                success: false, 
                message: 'Not enough materials or gold' 
            };
        }

        const inventory = inventorySystem.getInventory(playerId);
        if (!inventory) {
            return { 
                success: false, 
                message: 'Inventory not found' 
            };
        }

        // 消耗材料
        for (const material of recipe.materials) {
            this.consumeMaterial(playerId, material.itemId, material.count);
        }

        // 扣除金币
        inventory.gold -= recipe.cost;

        // 添加合成产物
        const addResult = inventorySystem.addItem(playerId, resultItemId, 1);
        
        if (addResult.success) {
            // 播放合成特效
            this.playCraftEffect(playerId);

            // 发送通知
            const player = PlayerResource.GetPlayer(playerId);
            if (player) {
                (CustomGameEventManager.Send_ServerToPlayer as any)(
                    player,
                    'item_crafted',
                    {
                        itemId: resultItemId,
                        itemName: inventorySystem.getItemDefinition(resultItemId)?.name || resultItemId
                    }
                );
            }

            print(`[CraftingSystem] Player ${playerId} crafted ${resultItemId}`);

            return {
                success: true,
                resultItem: resultItemId,
                message: `Crafted ${resultItemId}`
            };
        }

        return {
            success: false,
            message: 'Failed to add crafted item'
        };
    }

    /**
     * 查找玩家可以合成的道具
     */
    public findCraftableItems(playerId: PlayerID): string[] {
        const craftable: string[] = [];

        for (const [resultItemId, recipe] of this.recipes) {
            if (this.canCraft(playerId, resultItemId)) {
                craftable.push(resultItemId);
            }
        }

        // 同步到客户端
        if (GameRules.XNetTable) {
            GameRules.XNetTable.SetTableValue('crafting_system', `player_${playerId}_craftable`, {
                items: craftable,
                timestamp: getTimestamp()
            });
        }

        return craftable;
    }

    /**
     * 获取配方信息
     */
    public getRecipe(resultItemId: string): CraftingRecipe | null {
        return this.recipes.get(resultItemId) || null;
    }

    /**
     * 获取所有配方
     */
    public getAllRecipes(): CraftingRecipe[] {
        return Array.from(this.recipes.values());
    }

    /**
     * 计算背包中某个道具的总数量
     */
    private countItemInInventory(playerId: PlayerID, itemId: string): number {
        const inventory = inventorySystem.getInventory(playerId);
        if (!inventory) {
            return 0;
        }

        let total = 0;
        for (const slot of inventory.slots) {
            if (slot.item && slot.item.itemId === itemId) {
                total += slot.item.stackCount;
            }
        }

        return total;
    }

    /**
     * 消耗材料
     */
    private consumeMaterial(playerId: PlayerID, itemId: string, count: number): void {
        const inventory = inventorySystem.getInventory(playerId);
        if (!inventory) {
            return;
        }

        let remaining = count;

        for (let i = 0; i < inventory.slots.length && remaining > 0; i++) {
            const slot = inventory.slots[i];
            if (slot.item && slot.item.itemId === itemId) {
                const removeCount = Math.min(remaining, slot.item.stackCount);
                inventorySystem.removeItem(playerId, slot.slotId, removeCount);
                remaining -= removeCount;
            }
        }
    }

    /**
     * 播放合成特效
     */
    private playCraftEffect(playerId: PlayerID): void {
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero || hero.IsNull()) {
            return;
        }

        // 播放音效
        EmitSoundOn('General.Combine', hero);

        // 播放粒子特效（如果有）
        // play_particle("effect/combine_item/1.vpcf", PATTACH_ABSORIGIN_FOLLOW, hero, 3);
    }

    /**
     * 自动检测并提示可合成道具
     */
    public autoDetectCraftable(playerId: PlayerID): void {
        const craftable = this.findCraftableItems(playerId);
        
        if (craftable.length > 0) {
            const player = PlayerResource.GetPlayer(playerId);
            if (player) {
                (CustomGameEventManager.Send_ServerToPlayer as any)(
                    player,
                    'craftable_items_available',
                    {
                        count: craftable.length,
                        items: craftable
                    }
                );
            }
        }
    }
}

// 导出单例
export const craftingSystem = CraftingSystem.getInstance();

