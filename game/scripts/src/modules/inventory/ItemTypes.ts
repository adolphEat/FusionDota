/**
 * 道具系统类型定义
 * Item System Type Definitions
 */

/**
 * 道具类型
 */
export enum ItemType {
    CONSUMABLE = 'consumable',    // 可消耗道具
    EQUIPMENT = 'equipment',       // 装备
    MATERIAL = 'material',         // 材料
    TREASURE = 'treasure',         // 宝箱
    SPECIAL = 'special'            // 特殊道具
}

/**
 * 道具稀有度
 */
export enum ItemRarity {
    COMMON = 1,       // 普通（白色）
    UNCOMMON = 2,     // 不常见（绿色）
    RARE = 3,         // 稀有（蓝色）
    EPIC = 4,         // 史诗（紫色）
    LEGENDARY = 5     // 传奇（橙色）
}

/**
 * 道具基础定义
 */
export interface ItemDefinition {
    id: string;                   // 道具ID（对应KV中的item_xxx）
    name: string;                 // 显示名称
    description: string;          // 描述
    type: ItemType;               // 道具类型
    rarity: ItemRarity;           // 稀有度
    icon: string;                 // 图标路径
    maxStack: number;             // 最大堆叠数量
    
    // 价格相关
    cost: number;                 // 购买价格
    sellPrice: number;            // 出售价格
    
    // 消耗相关
    consumable: boolean;          // 是否可消耗
    consumeEffect?: string;       // 消耗效果（Modifier或技能名）
    cooldown?: number;            // 冷却时间
    
    // 装备相关
    equipSlot?: string;           // 装备槽位
    stats?: ItemStats;            // 属性加成
    
    // 合成相关
    recipe?: string[];            // 合成配方（需要的材料ID列表）
    isRecipeResult?: boolean;     // 是否是合成产物
}

/**
 * 道具属性加成
 */
export interface ItemStats {
    health?: number;              // 生命值
    mana?: number;                // 魔法值
    damage?: number;              // 攻击力
    armor?: number;               // 护甲
    magicResistance?: number;     // 魔抗
    attackSpeed?: number;         // 攻击速度
    moveSpeed?: number;           // 移动速度
    [key: string]: number | undefined;  // 其他自定义属性
}

/**
 * 道具实例
 */
export interface ItemInstance {
    instanceId: string;           // 实例唯一ID
    itemId: string;               // 道具模板ID
    ownerId: PlayerID;            // 所有者
    stackCount: number;           // 堆叠数量
    acquiredTime: number;         // 获得时间
    charges?: number;             // 充能次数（可消耗道具）
    durability?: number;          // 耐久度（装备）
    equipped: boolean;            // 是否已装备
    locked: boolean;              // 是否锁定（防止误操作）
    customData?: any;             // 自定义数据
}

/**
 * 背包槽位
 */
export interface InventorySlot {
    slotId: number;               // 槽位ID
    item: ItemInstance | null;    // 道具实例
    locked: boolean;              // 槽位是否锁定
}

/**
 * 玩家背包
 */
export interface PlayerInventory {
    playerId: PlayerID;
    slots: InventorySlot[];       // 槽位列表
    capacity: number;             // 背包容量
    usedSlots: number;            // 已用槽位数
    gold: number;                 // 金币
}

/**
 * 背包操作结果
 */
export interface InventoryOperationResult {
    success: boolean;
    message?: string;
    item?: ItemInstance;
    slotId?: number;
    data?: any;
}

/**
 * 道具使用上下文
 */
export interface ItemUseContext {
    user: CDOTA_BaseNPC;          // 使用者
    target?: CDOTA_BaseNPC;       // 目标单位
    position?: Vector;            // 目标位置
    itemInstance: ItemInstance;   // 道具实例
}

/**
 * 道具使用结果
 */
export interface ItemUseResult {
    success: boolean;
    consumed: boolean;            // 是否被消耗
    message?: string;
    effects?: string[];           // 产生的效果
}

/**
 * 宝箱掉落配置
 */
export interface TreasureDropConfig {
    treasureId: string;           // 宝箱ID
    dropTable: DropTableEntry[];  // 掉落表
}

/**
 * 掉落表条目
 */
export interface DropTableEntry {
    itemId: string;               // 道具ID
    weight: number;               // 权重
    minCount: number;             // 最小数量
    maxCount: number;             // 最大数量
    rarity?: ItemRarity;          // 稀有度限制
}

/**
 * 合成配方
 */
export interface CraftingRecipe {
    resultItemId: string;         // 产物道具ID
    materials: RecipeMaterial[];  // 材料列表
    cost: number;                 // 合成费用
}

/**
 * 配方材料
 */
export interface RecipeMaterial {
    itemId: string;               // 材料道具ID
    count: number;                // 需要数量
}

