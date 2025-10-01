# 背包系统使用指南

> FusionDota 道具背包系统完整指南
> 
> 版本: 1.0.0 | 创建日期: 2025-10-01

## 📋 目录

- [系统概述](#系统概述)
- [核心功能](#核心功能)
- [快速开始](#快速开始)
- [API文档](#api文档)
- [使用示例](#使用示例)
- [配置说明](#配置说明)

---

## 系统概述

背包系统是一个完整的道具管理解决方案，参考了自走棋项目 zizouqi 的设计，支持：

- ✅ **可消耗道具** - 药水、食物等一次性使用道具
- ✅ **装备系统** - 武器、护甲等装备道具
- ✅ **道具堆叠** - 相同道具自动堆叠，节省空间
- ✅ **道具合成** - 多个材料合成高级道具
- ✅ **背包管理** - 完整的背包增删查改操作
- ✅ **网络同步** - 自动同步到客户端UI

---

## 核心功能

### 1️⃣ 道具类型

#### 可消耗道具 (CONSUMABLE)
```typescript
// 示例：生命药水
{
    id: 'health_potion',
    name: '生命药水',
    type: ItemType.CONSUMABLE,
    consumable: true,
    maxStack: 5,  // 可堆叠5个
    stats: { health: 200 }  // 恢复200点生命
}
```

#### 装备道具 (EQUIPMENT)
```typescript
// 示例：力量护腕
{
    id: 'power_bracer',
    name: '力量护腕',
    type: ItemType.EQUIPMENT,
    equipSlot: 'trinket',
    stats: { 
        damage: 10,
        health: 100 
    }
}
```

#### 材料道具 (MATERIAL)
用于合成其他道具的基础材料

#### 宝箱道具 (TREASURE)
可开启获得随机道具

---

### 2️⃣ 道具稀有度

| 稀有度 | 枚举值 | 颜色 | 说明 |
|--------|--------|------|------|
| COMMON | 1 | 白色 | 普通道具 |
| UNCOMMON | 2 | 绿色 | 不常见道具 |
| RARE | 3 | 蓝色 | 稀有道具 |
| EPIC | 4 | 紫色 | 史诗道具 |
| LEGENDARY | 5 | 橙色 | 传奇道具 |

---

### 3️⃣ 背包操作

#### 添加道具
```typescript
// 添加1个生命药水
GameRules.InventorySystem.addItem(playerId, 'health_potion', 1);

// 添加3个到指定槽位
GameRules.InventorySystem.addItem(playerId, 'health_potion', 3, 5);
```

#### 使用道具
```typescript
// 使用槽位0的道具
GameRules.InventorySystem.useItem(playerId, 0);

// 使用道具并指定目标
GameRules.InventorySystem.useItem(playerId, 0, targetUnit);
```

#### 移除道具
```typescript
// 移除槽位5的1个道具
GameRules.InventorySystem.removeItem(playerId, 5, 1);

// 移除槽位5的所有道具
const slot = inventory.slots[5];
GameRules.InventorySystem.removeItem(playerId, 5, slot.item.stackCount);
```

#### 移动道具
```typescript
// 将槽位2的道具移动到槽位8
GameRules.InventorySystem.moveItem(playerId, 2, 8);
```

#### 丢弃道具
```typescript
// 丢弃槽位3的道具到地面
GameRules.InventorySystem.dropItem(playerId, 3);
```

---

### 4️⃣ 道具合成系统

#### 注册配方
```typescript
GameRules.CraftingSystem.registerRecipe({
    resultItemId: 'greater_health_potion',  // 产物
    materials: [
        { itemId: 'health_potion', count: 3 }  // 需要3个普通生命药水
    ],
    cost: 50  // 需要50金币
});
```

#### 检查可合成道具
```typescript
// 自动检测玩家可合成的道具
const craftable = GameRules.CraftingSystem.findCraftableItems(playerId);
console.log(craftable);  // ['greater_health_potion', 'power_bracer']
```

#### 合成道具
```typescript
// 合成高级生命药水
const result = GameRules.CraftingSystem.craftItem(playerId, 'greater_health_potion');
if (result.success) {
    console.log(`成功合成: ${result.resultItem}`);
}
```

---

## 快速开始

### 步骤1: 系统已自动初始化

背包系统在游戏启动时自动初始化，无需手动配置。

### 步骤2: 为玩家创建背包

```typescript
// 系统会在玩家连接时自动创建，容量30格
// 手动创建自定义容量背包：
GameRules.InventorySystem.createInventoryForPlayer(playerId, 50);
```

### 步骤3: 添加道具到背包

```typescript
// 给玩家添加初始道具
GameRules.InventorySystem.addItem(playerId, 'health_potion', 3);
GameRules.InventorySystem.addItem(playerId, 'mana_potion', 3);
GameRules.InventorySystem.addItem(playerId, 'strength_potion', 1);
```

### 步骤4: 玩家使用道具

```typescript
// 客户端发送事件
CustomGameEventManager.Send_ServerToServer('inventory_use_item', {
    PlayerID: playerId,
    instanceId: 'item_123_456789'
});

// 或直接调用
GameRules.InventorySystem.useItem(playerId, slotId);
```

---

## API文档

### InventorySystem 类

#### 实例方法

##### `createInventoryForPlayer(playerId, capacity?)`
为玩家创建背包
- **参数**:
  - `playerId`: 玩家ID
  - `capacity` (可选): 背包容量，默认30
- **返回**: `PlayerInventory`

##### `registerItem(definition)`
注册道具定义
- **参数**:
  - `definition`: `ItemDefinition` 对象
- **返回**: `void`

##### `addItem(playerId, itemId, count?, slotId?)`
添加道具到背包
- **参数**:
  - `playerId`: 玩家ID
  - `itemId`: 道具ID
  - `count` (可选): 数量，默认1
  - `slotId` (可选): 指定槽位
- **返回**: `InventoryOperationResult`

##### `removeItem(playerId, slotId, count?)`
移除道具
- **参数**:
  - `playerId`: 玩家ID
  - `slotId`: 槽位ID
  - `count` (可选): 数量，默认1
- **返回**: `InventoryOperationResult`

##### `useItem(playerId, slotId, target?, position?)`
使用道具
- **参数**:
  - `playerId`: 玩家ID
  - `slotId`: 槽位ID
  - `target` (可选): 目标单位
  - `position` (可选): 目标位置
- **返回**: `ItemUseResult`

##### `moveItem(playerId, fromSlot, toSlot)`
移动道具
- **参数**:
  - `playerId`: 玩家ID
  - `fromSlot`: 源槽位
  - `toSlot`: 目标槽位
- **返回**: `InventoryOperationResult`

##### `dropItem(playerId, slotId)`
丢弃道具到地面
- **参数**:
  - `playerId`: 玩家ID
  - `slotId`: 槽位ID
- **返回**: `InventoryOperationResult`

##### `getInventory(playerId)`
获取玩家背包
- **参数**:
  - `playerId`: 玩家ID
- **返回**: `PlayerInventory | null`

##### `hasEmptySlot(playerId)`
检查是否有空槽位
- **参数**:
  - `playerId`: 玩家ID
- **返回**: `boolean`

##### `findItem(playerId, itemId)`
查找道具
- **参数**:
  - `playerId`: 玩家ID
  - `itemId`: 道具ID
- **返回**: `InventorySlot | null`

---

### CraftingSystem 类

#### 实例方法

##### `registerRecipe(recipe)`
注册合成配方
- **参数**:
  - `recipe`: `CraftingRecipe` 对象
- **返回**: `void`

##### `canCraft(playerId, resultItemId)`
检查是否可合成
- **参数**:
  - `playerId`: 玩家ID
  - `resultItemId`: 产物道具ID
- **返回**: `boolean`

##### `craftItem(playerId, resultItemId)`
合成道具
- **参数**:
  - `playerId`: 玩家ID
  - `resultItemId`: 产物道具ID
- **返回**: `{ success, message?, resultItem? }`

##### `findCraftableItems(playerId)`
查找可合成道具列表
- **参数**:
  - `playerId`: 玩家ID
- **返回**: `string[]`

##### `getRecipe(resultItemId)`
获取配方信息
- **参数**:
  - `resultItemId`: 产物道具ID
- **返回**: `CraftingRecipe | null`

##### `getAllRecipes()`
获取所有配方
- **返回**: `CraftingRecipe[]`

---

## 使用示例

### 示例1: 创建新道具

```typescript
// 注册一个新的可消耗道具
GameRules.InventorySystem.registerItem({
    id: 'super_health_potion',
    name: '超级生命药水',
    description: '恢复1000点生命值',
    type: ItemType.CONSUMABLE,
    rarity: ItemRarity.RARE,
    icon: 'panorama/images/items/super_health_potion_png.vtex',
    maxStack: 3,
    cost: 300,
    sellPrice: 150,
    consumable: true,
    consumeEffect: 'modifier_super_health_potion',
    stats: { health: 1000 }
});
```

### 示例2: 奖励道具给玩家

```typescript
// 战斗胜利后奖励道具
function OnBattleVictory(playerId: PlayerID) {
    // 奖励金币
    const inventory = GameRules.InventorySystem.getInventory(playerId);
    if (inventory) {
        inventory.gold += 100;
    }
    
    // 奖励道具
    GameRules.InventorySystem.addItem(playerId, 'health_potion', 2);
    GameRules.InventorySystem.addItem(playerId, 'mana_potion', 2);
    
    // 随机奖励稀有道具
    if (RandomFloat(0, 1) < 0.3) {
        GameRules.InventorySystem.addItem(playerId, 'power_bracer', 1);
    }
}
```

### 示例3: 实现商店购买

```typescript
function BuyItem(playerId: PlayerID, itemId: string) {
    const definition = GameRules.InventorySystem.getItemDefinition(itemId);
    if (!definition) {
        return { success: false, message: '道具不存在' };
    }
    
    const inventory = GameRules.InventorySystem.getInventory(playerId);
    if (!inventory) {
        return { success: false, message: '背包未找到' };
    }
    
    // 检查金币
    if (inventory.gold < definition.cost) {
        return { success: false, message: '金币不足' };
    }
    
    // 检查空位
    if (!GameRules.InventorySystem.hasEmptySlot(playerId)) {
        return { success: false, message: '背包已满' };
    }
    
    // 扣除金币
    inventory.gold -= definition.cost;
    
    // 添加道具
    const result = GameRules.InventorySystem.addItem(playerId, itemId, 1);
    
    return result;
}
```

### 示例4: 自动合成检测

```typescript
// 监听背包变化，自动提示可合成道具
ListenToGameEvent('entity_killed', (event) => {
    const killerEntity = EntIndexToHScript(event.entindex_killed);
    if (!killerEntity || !killerEntity.IsRealHero()) return;
    
    const playerId = killerEntity.GetPlayerID();
    
    // 掉落道具
    GameRules.InventorySystem.addItem(playerId, 'health_potion', 1);
    
    // 检测可合成道具
    GameRules.CraftingSystem.autoDetectCraftable(playerId);
}, this);
```

### 示例5: 批量注册道具

```typescript
// 从配置批量注册道具
const itemConfigs: ItemDefinition[] = [
    {
        id: 'small_health_potion',
        name: '小型生命药水',
        description: '恢复100点生命值',
        type: ItemType.CONSUMABLE,
        rarity: ItemRarity.COMMON,
        icon: 'items/small_health_potion.png',
        maxStack: 10,
        cost: 25,
        sellPrice: 12,
        consumable: true,
        stats: { health: 100 }
    },
    {
        id: 'medium_health_potion',
        name: '中型生命药水',
        description: '恢复300点生命值',
        type: ItemType.CONSUMABLE,
        rarity: ItemRarity.UNCOMMON,
        icon: 'items/medium_health_potion.png',
        maxStack: 5,
        cost: 75,
        sellPrice: 37,
        consumable: true,
        stats: { health: 300 }
    }
];

// 批量注册
GameRules.InventorySystem.registerItems(itemConfigs);
```

---

## 配置说明

### 道具定义配置

```typescript
interface ItemDefinition {
    id: string;                   // 唯一ID
    name: string;                 // 显示名称
    description: string;          // 描述
    type: ItemType;               // 类型
    rarity: ItemRarity;           // 稀有度
    icon: string;                 // 图标路径
    maxStack: number;             // 最大堆叠数
    
    cost: number;                 // 购买价格
    sellPrice: number;            // 出售价格
    
    consumable: boolean;          // 是否可消耗
    consumeEffect?: string;       // 消耗效果
    cooldown?: number;            // 冷却时间
    
    equipSlot?: string;           // 装备槽位
    stats?: ItemStats;            // 属性加成
    
    recipe?: string[];            // 合成配方
    isRecipeResult?: boolean;     // 是否是合成产物
}
```

### 属性加成配置

```typescript
interface ItemStats {
    health?: number;              // 生命值
    mana?: number;                // 魔法值
    damage?: number;              // 攻击力
    armor?: number;               // 护甲
    magicResistance?: number;     // 魔抗
    attackSpeed?: number;         // 攻击速度
    moveSpeed?: number;           // 移动速度
}
```

### 合成配方配置

```typescript
interface CraftingRecipe {
    resultItemId: string;         // 产物道具ID
    materials: RecipeMaterial[];  // 材料列表
    cost: number;                 // 合成费用
}

interface RecipeMaterial {
    itemId: string;               // 材料道具ID
    count: number;                // 需要数量
}
```

---

## 网络表同步

系统自动将数据同步到以下网络表：

### `player_inventory`
```typescript
{
    player_0: {
        playerId: 0,
        capacity: 30,
        usedSlots: 5,
        gold: 500,
        slots: [...]
    }
}
```

### `crafting_system`
```typescript
{
    player_0_craftable: {
        items: ['greater_health_potion', 'power_bracer'],
        timestamp: 1633046400000
    }
}
```

---

## 客户端事件

### 使用道具
```typescript
CustomGameEventManager.Send_ServerToServer('inventory_use_item', {
    PlayerID: playerId,
    instanceId: itemInstanceId
});
```

### 丢弃道具
```typescript
CustomGameEventManager.Send_ServerToServer('inventory_drop_item', {
    PlayerID: playerId,
    slotId: slotIndex
});
```

### 移动道具
```typescript
CustomGameEventManager.Send_ServerToServer('inventory_move_item', {
    PlayerID: playerId,
    fromSlot: fromSlotIndex,
    toSlot: toSlotIndex
});
```

### 合成道具
```typescript
CustomGameEventManager.Send_ServerToServer('request_combine_item', {
    PlayerID: playerId,
    resultItemId: 'greater_health_potion'
});
```

---

## 注意事项

1. **道具ID命名规范**: 使用小写字母和下划线，如 `health_potion`
2. **槽位索引**: 从0开始，最大值为 `capacity - 1`
3. **堆叠限制**: `maxStack` 为1表示不可堆叠
4. **金币管理**: 背包系统包含金币字段，需自行管理增减
5. **网络同步**: 所有操作自动同步到客户端，无需手动调用
6. **错误处理**: 所有操作返回 `success` 字段，检查后再处理
7. **性能优化**: 批量操作时建议一次性完成，减少网络同步次数

---

## 下一步

1. **创建UI面板** - 为背包系统创建可视化界面
2. **扩展道具类型** - 添加更多道具类型（宝石、符文等）
3. **实现交易系统** - 玩家间道具交易
4. **添加背包扩展** - 购买额外背包格子
5. **实现仓库系统** - 额外的物品存储空间

---

*文档版本: 1.0.0*  
*最后更新: 2025-10-01*  
*作者: FusionDota Team*

