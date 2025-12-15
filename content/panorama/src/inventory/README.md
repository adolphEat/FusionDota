# 背包系统 (Inventory System)

## 功能说明

背包系统用于在单机自走棋模式中管理和部署玩家的棋子阵容。

### 主要特性

1. **可视化背包界面**
   - 显示最多8个棋子槽位
   - 棋子图标、名称、费用、稀有度
   - 稀有度颜色边框和发光效果

2. **拖拽部署**
   - 从背包拖拽棋子到棋盘
   - 松开鼠标自动部署到对应位置
   - 视觉反馈和音效提示

3. **自动显示/隐藏**
   - 准备阶段自动显示背包
   - 战斗阶段自动隐藏背包
   - 支持手动切换（快捷键）

## 使用方法

### 客户端 API

```typescript
// 显示背包
Inventory.show();

// 隐藏背包
Inventory.hide();

// 切换背包显示状态
Inventory.toggle();

// 请求更新背包数据
Inventory.requestData();

// 手动更新背包数据
Inventory.update(data);
```

### 服务端 API

```typescript
// 发送背包数据到客户端
inventoryHandler.sendInventoryData(playerId);
```

### 游戏事件

**客户端发送到服务端：**
- `request_inventory_data` - 请求背包数据
- `inventory_deploy_piece` - 部署棋子

**服务端发送到客户端：**
- `update_inventory_data` - 更新背包数据
- `deployment_feedback` - 部署反馈
- `show_inventory` - 显示背包
- `hide_inventory` - 隐藏背包
- `toggle_inventory` - 切换背包

## 数据结构

### ChessPiece（棋子数据）

```typescript
interface ChessPiece {
    id: string;              // 棋子ID
    unitName: string;        // 单位名称（如 npc_dota_hero_axe）
    displayName: string;     // 显示名称（如 "斧王"）
    rarity: number;          // 稀有度 (1-5)
    cost: number;            // 费用
    race: string[];          // 种族
    class: string[];         // 职业
    health: number;          // 生命值
    damage: number;          // 攻击力
    armor: number;           // 护甲
    attackRange: number;     // 攻击距离
}
```

### 部署请求数据

```typescript
{
    playerId: PlayerID,      // 玩家ID
    pieceId: string,         // 棋子ID
    unitName: string,        // 单位名称
    slotIndex: number,       // 槽位索引
    cursorX: number,         // 鼠标X坐标
    cursorY: number          // 鼠标Y坐标
}
```

## 工作流程

1. **准备阶段开始**
   - 服务端发送 `show_inventory` 事件
   - 客户端显示背包界面
   - 客户端请求背包数据

2. **玩家拖拽棋子**
   - 从背包槽位开始拖拽
   - 显示拖拽视觉反馈
   - 松开鼠标触发部署

3. **部署处理**
   - 客户端发送 `inventory_deploy_piece` 事件
   - 服务端验证阶段和位置
   - 服务端调用 ChessBattleSystem 部署棋子
   - 服务端从备战席移除棋子
   - 服务端发送更新后的背包数据
   - 客户端更新背包显示

4. **战斗阶段开始**
   - 服务端发送 `hide_inventory` 事件
   - 客户端隐藏背包界面

## 样式定制

背包样式在 `inventory.less` 中定义，支持：
- 背景颜色和透明度
- 槽位大小和间距
- 稀有度颜色和发光效果
- 拖拽动画和过渡效果

## 注意事项

1. **单机模式专用**
   - 当前实现针对单机自走棋模式
   - 玩家ID默认为0

2. **坐标转换**
   - 鼠标屏幕坐标需要转换为棋盘格子坐标
   - 当前使用简化算法，可能需要根据实际地图调整

3. **阶段限制**
   - 只能在准备阶段（preparation）和规划阶段（planning）部署棋子
   - 战斗阶段无法部署

4. **槽位限制**
   - 最多8个备战席槽位
   - 超出部分不会显示

## 未来扩展

- [ ] 支持棋子升级（三星合成）
- [ ] 支持棋子出售
- [ ] 支持棋盘上的棋子拖回背包
- [ ] 添加棋子详情面板
- [ ] 添加快捷键绑定
- [ ] 优化坐标转换算法
- [ ] 添加触摸屏支持

