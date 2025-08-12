# 🎯 FusionDota 自走棋模式使用指南

## 📋 模式概述

FusionDota自走棋模式是基于《刀塔自走棋》项目设计的完整自走棋游戏系统，支持8人对战、回合制游戏流程、棋子系统、经济系统和自动战斗。

### 🎮 核心特性

- **8人对战** - 支持最多8名玩家同时进行自走棋对战
- **回合制系统** - 准备阶段 → 战斗阶段 → 结算 → 下一回合
- **棋子系统** - 5个稀有度等级，45种不同棋子(可扩展)
- **经济系统** - 金币、利息、连胜/连败奖励
- **商店系统** - 基于等级的概率刷新系统
- **备战席** - 8个棋子储存位置
- **可视化UI** - 完整的React界面控制系统

## 🚀 快速开始

### 第一步：激活自走棋模式

#### 通过游戏模式管理器自动检测
```bash
# 项目启动时自动检测并切换到自走棋模式
yarn dev
```

#### 通过调试命令手动激活
```bash
# 🎮 进入游戏后，在聊天界面（按Enter）输入：
-autochess activate
-autochess game start
# 期望输出：在聊天区域显示激活和开始游戏的确认信息
```

### 第二步：界面操作

游戏界面右侧会出现自走棋控制面板，包含：
- 🎮 游戏状态显示
- 👤 玩家信息面板
- 🏪 棋子商店
- 📦 备战席管理
- 🎯 游戏控制按钮

## 📖 详细玩法说明

### 🔄 游戏流程

#### 1. 准备阶段 (30秒)
- 购买棋子：从商店中选择棋子加入备战席
- 布阵：将棋子从备战席放置到棋盘上
- 升级：消耗4金币升级，提高商店高级棋子概率
- 刷新商店：消耗2金币刷新商店棋子

#### 2. 战斗阶段 (45秒)
- 系统自动匹配对手
- 棋子自动战斗，无需手动操作
- 战斗结果影响生命值和连胜/连败

#### 3. 结算阶段
- 计算经济收入：基础收入 + 利息 + 连胜/连败奖励
- 更新玩家排名和状态
- 准备下一回合

### 💰 经济系统

#### 收入计算
```
总收入 = 基础收入(5) + 利息收入 + 连胜/连败奖励

利息收入 = min(floor(当前金币/10), 5)
连胜奖励 = min(连胜数, 3) (连胜≥2时)
连败奖励 = min(连败数, 3) (连败≥2时)
```

#### 消费项目
- 🔼 升级：4金币 (提高等级，增加高级棋子概率)
- 🔄 刷新：2金币 (重新生成商店棋子)
- 🛒 购买棋子：1-5金币 (根据稀有度)

### 🎯 棋子系统

#### 稀有度等级
| 稀有度 | 颜色 | 费用 | 池子数量 | 等级1概率 | 等级2概率 | 等级3概率 |
|--------|------|------|----------|-----------|-----------|-----------|
| 普通   | ⚪ 白色 | 1金币 | 45个 | 100% | 70% | 60% |
| 不常见 | 🟢 绿色 | 2金币 | 30个 | 0% | 30% | 35% |
| 稀有   | 🔵 蓝色 | 3金币 | 25个 | 0% | 0% | 5% |
| 史诗   | 🟣 紫色 | 4金币 | 15个 | 0% | 0% | 0% |
| 传奇   | 🟠 橙色 | 5金币 | 10个 | 0% | 0% | 0% |

#### 初始棋子库
- **敌法师** (1费) - 恶魔猎手/刺客，550血量，50攻击力
- **水晶室女** (1费) - 人类/法师，450血量，35攻击力

*更多棋子正在开发中...*

## 🎛️ 操作指南

### UI界面操作

#### 商店操作
```tsx
// 购买棋子
点击商店中棋子的"购买"按钮

// 刷新商店
点击"刷新商店"按钮 (消耗2金币)
```

#### 玩家控制
```tsx
// 升级
点击"升级"按钮 (消耗4金币)

// 查看状态
实时显示：生命值、金币、等级、经验、连胜/连败
```

#### 游戏控制
```tsx
// 开始游戏
点击"   "按钮

// 结束游戏
点击"结束游戏"按钮

// 投降
点击"投降"按钮 (游戏进行中)
```

### 调试命令

#### 自走棋模式控制
```bash
# 🎮 在游戏内聊天界面（按Enter）输入：

# 激活/停用模式
-autochess activate      # 激活自走棋模式
-autochess deactivate    # 停用自走棋模式
-autochess status        # 查看模式状态

# 游戏控制
-autochess game start    # 开始游戏

# 期望输出：在聊天区域显示相应的状态信息
```

#### 棋子操作
```bash
# 🎮 在游戏内聊天界面（按Enter）输入：

# 购买棋子
-buy anti_mage           # 购买敌法师
-buy crystal_maiden      # 购买水晶室女

# 查看信息
-chess_info              # 查看可用棋子列表
-chess_info anti_mage    # 查看特定棋子信息

# 期望输出：在聊天区域显示购买结果或棋子信息
```

#### 商店操作
```bash
# 🎮 在游戏内聊天界面（按Enter）输入：

# 商店控制
-shop refresh            # 刷新商店
-shop show              # 显示商店信息

# 期望输出：在聊天区域显示商店操作结果
```

### 快捷键操作

| 按键 | 功能 | 说明 |
|------|------|------|
| 回车 | 打开聊天 | 输入调试命令 |
| F9 | 切换面板 | 显示/隐藏自走棋面板 |

## ⚙️ 配置选项

### 游戏模式配置
```typescript
// 在 GameModeManager.ts 中配置
[GameMode.AUTOCHESS]: {
    mode: GameMode.AUTOCHESS,
    displayName: '自走棋模式',
    description: '8人自走棋对战模式，策略布阵，自动战斗',
    maxPlayers: 8,
    allowBots: false,
    enableCheats: false,
    customRules: {
        roundBasedGame: true,      // 回合制游戏
        autoTurnLength: 30,        // 准备阶段时长
        battleTurnLength: 45,      // 战斗阶段时长
        maxRounds: 50,             // 最大回合数
        chessPoolEnabled: true,    // 启用棋子池
        economySystem: true        // 启用经济系统
    }
}
```

### 棋子数据配置
```typescript
// 在 AutoChessMode.ts 中添加新棋子
database.set('new_hero', {
    id: 'new_hero',
    unitName: 'npc_dota_hero_new_hero',
    displayName: '新英雄',
    rarity: ChessRarity.COMMON,
    cost: 1,
    race: ['种族'],
    class: ['职业'],
    health: 500,
    damage: 45,
    armor: 1,
    attackRange: 128,
    abilities: ['ability_name']
});
```

## 🐛 故障排除

### 常见问题

#### 问题1：自走棋模式无法激活
**解决方案：**
```bash
# 🎮 在游戏内聊天界面（按Enter）输入：

# 检查游戏模式
-mode                    # 查看当前模式

# 强制切换模式
-autochess activate      # 激活自走棋模式

# 如需重启项目（在项目控制台执行）：
yarn dev                 # 重新启动项目
```

#### 问题2：UI面板不显示
**解决方案：**
```bash
# 检查面板状态
按F9键或点击右侧切换按钮

# 查看错误日志
打开浏览器开发者工具查看控制台错误
```

#### 问题3：购买棋子失败
**解决方案：**
```bash
# 🎮 在游戏内聊天界面（按Enter）输入：

# 检查条件
-chess_info              # 查看可用棋子
-system_info             # 查看系统状态

# 增加金币 (调试模式)
-gold 1000              # 添加金币
```

#### 问题4：网络表同步问题
**解决方案：**
```bash
# 🎮 在游戏内聊天界面（按Enter）输入：

# 重新同步
-system_info             # 查看系统状态
-autochess status        # 查看自走棋状态

# 重新激活
-autochess deactivate
-autochess activate
```

## 🔧 开发者扩展

### 添加新棋子

#### 第一步：定义棋子数据
```typescript
// 在 AutoChessMode.ts 的 initializeChessDatabase() 中添加
database.set('pudge', {
    id: 'pudge',
    unitName: 'npc_dota_hero_pudge',
    displayName: '屠夫',
    rarity: ChessRarity.UNCOMMON,
    cost: 2,
    race: ['不死族'],
    class: ['战士'],
    health: 750,
    damage: 60,
    armor: 3,
    attackRange: 128,
    abilities: ['pudge_meat_hook']
});
```

#### 第二步：配置技能
```bash
# 在 npc_abilities_custom.txt 中添加技能定义
# 在相应的Lua文件中实现技能逻辑
```

### 添加新机制

#### 装备系统
```typescript
// 扩展 ChessPiece 接口
interface ChessPiece {
    // ... 现有属性
    equipment?: EquipmentItem[];
    maxEquipmentSlots: number;
}

interface EquipmentItem {
    id: string;
    name: string;
    stats: {
        health?: number;
        damage?: number;
        armor?: number;
    };
}
```

#### 种族/职业效果
```typescript
// 添加羁绊系统
interface SynergyEffect {
    id: string;
    name: string;
    type: 'race' | 'class';
    requirements: Array<{count: number, bonus: any}>;
}
```

## 📊 网络表数据结构

### 游戏状态表 (autochess_game)
```typescript
{
    state: {
        isActive: boolean;           // 模式是否激活
        gameState: {
            currentRound: number;    // 当前回合
            currentPhase: string;    // 当前阶段
            phaseTimeLeft: number;   // 剩余时间
            isGameActive: boolean;   // 游戏是否进行中
        };
        timestamp: number;           // 时间戳
    }
}
```

### 玩家状态表 (autochess_player)
```typescript
{
    [playerId: string]: {
        health: number;              // 生命值
        maxHealth: number;           // 最大生命值
        gold: number;                // 金币
        level: number;               // 等级
        experience: number;          // 经验值
        winStreak: number;           // 连胜
        lossStreak: number;          // 连败
        boardPieces: any[];          // 棋盘棋子
        benchPieces: any[];          // 备战席棋子
        isAlive: boolean;            // 是否存活
        rank: number;                // 排名
        timestamp: number;           // 时间戳
    }
}
```

### 商店数据表 (autochess_shop)
```typescript
{
    [playerId: string]: {
        pieces: Array<{
            id: string;              // 棋子ID
            unitName: string;        // 单位名
            displayName: string;     // 显示名
            rarity: number;          // 稀有度
            cost: number;            // 费用
            race: string[];          // 种族
            class: string[];         // 职业
            health: number;          // 生命值
            damage: number;          // 攻击力
            armor: number;           // 护甲
            attackRange: number;     // 攻击距离
            abilities: string[];     // 技能列表
        }>;
        refreshCount: number;        // 刷新次数
        timestamp: number;           // 时间戳
    }
}
```

## 🎯 版本历史

### v1.1.0 - 自走棋模式系统 (2025-07-15)

#### 🆕 新增功能
- ✅ 完整自走棋游戏模式
- ✅ 8人对战支持
- ✅ 回合制游戏流程
- ✅ 棋子购买和管理系统
- ✅ 经济系统 (金币、利息、连胜奖励)
- ✅ 可视化UI界面
- ✅ 调试命令扩展

#### 🔧 技术实现
- ✅ `AutoChessMode` 核心逻辑类
- ✅ `GameModeManager` 模式管理扩展
- ✅ React UI 组件系统
- ✅ XNetTable 网络同步
- ✅ 事件驱动架构

#### 📁 新增文件
- `game/scripts/src/modules/AutoChessMode.ts`
- `content/panorama/src/autochess-panel/layout.xml`
- `content/panorama/src/autochess-panel/script.tsx`
- `content/panorama/src/autochess-panel/styles.less`
- `document/autochess-mode-guide.md`

#### 🎯 后续规划
- 🔄 战斗系统完善
- 🎲 更多棋子和技能
- ⚔️ 装备系统
- 🎭 种族职业羁绊
- 🏆 排位系统

---

## 📞 支持与反馈

如果您在使用自走棋模式时遇到问题或有改进建议：

1. **技术问题**：查看浏览器控制台错误日志
2. **功能建议**：通过项目Issue提交反馈
3. **Bug报告**：提供详细的复现步骤

**祝您游戏愉快！** 🎉

---

*最后更新: 2025-07-15*  
*文档版本: 1.0.0*