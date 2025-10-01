# 自走棋战斗系统快速开始

> 快速测试自走棋战斗系统（玩家 vs AI）

## 🎮 功能说明

系统会自动：
1. ✅ 设置玩家为**无敌观察者**（中立、无法攻击）
2. ✅ 从配置自动部署**我方棋子**（默认：2个斧王 + 1个水晶室女）
3. ✅ 自动生成**敌方AI棋子**（数量随回合增加）
4. ✅ 自动开始战斗并计算结果

---

## 🚀 快速启动

### 方法1: 启动开发模式
```bash
npm run launch
# 或
yarn launch
```

### 方法2: 游戏内激活
```bash
# 进入游戏后，聊天框输入：
-autochess activate
-autochess game start
```

---

## 📋 当前配置

### 我方默认棋子
战斗开始时自动部署（如果备战席为空）：
- 🪓 斧王 (axe) x2
- ❄️ 水晶室女 (crystal_maiden) x1

### 敌方AI棋子
- **第1-5回合**: 3-4个随机棋子
- **第6-10回合**: 4-5个随机棋子  
- **第11+回合**: 5-8个随机棋子

### 可用棋子池
当前已配置的棋子：
1. **斧王** (axe) - `npc_dota_hero_axe`
   - 生命：625 | 攻击：52 | 护甲：3
   - 种族：兽人 | 职业：战士

2. **敌法师** (anti_mage) - `npc_dota_hero_antimage`
   - 生命：550 | 攻击：50 | 护甲：2
   - 种族：恶魔猎手 | 职业：刺客

3. **水晶室女** (crystal_maiden) - `npc_dota_hero_crystal_maiden`
   - 生命：450 | 攻击：35 | 护甲：0
   - 种族：人类 | 职业：法师

4. **卓尔游侠** (drow_ranger) - `npc_dota_hero_drow_ranger`
   - 生命：435 | 攻击：45 | 护甲：1
   - 种族：不死 | 职业：猎人

5. **赏金猎人** (bounty_hunter) - `npc_dota_hero_bounty_hunter`
   - 生命：550 | 攻击：48 | 护甲：2
   - 种族：地精 | 职业：刺客

---

## 🎯 测试流程

### 完整测试流程
1. **启动游戏**
   ```bash
   yarn launch
   ```

2. **激活自走棋模式**
   ```
   -autochess activate
   ```

3. **开始游戏**
   ```
   -autochess game start
   ```

4. **观察结果**
   - 准备阶段（30秒）：可以购买棋子、调整阵容
   - 战斗阶段（45秒）：自动部署棋子并开始战斗
   - 系统会自动切换回合

---

## 📝 代码位置

### 棋子配置
修改默认测试棋子：
```typescript
// 文件: AutoChessMode.ts
private getDefaultTestPieces(): string[] {
    // 修改这里的棋子ID
    return ['axe', 'axe', 'crystal_maiden'];
}
```

### 添加新棋子
在 `AutoChessMode.ts` 的 `initializeChessDatabase()` 方法中添加：
```typescript
database.set('新棋子ID', {
    id: '新棋子ID',
    unitName: 'npc_dota_hero_xxx',
    displayName: '显示名称',
    rarity: ChessRarity.COMMON,
    cost: 1,
    race: ['种族'],
    class: ['职业'],
    health: 500,
    damage: 50,
    armor: 2,
    attackRange: 150,
    abilities: ['技能ID']
});
```

---

## 🔧 自定义配置

### 修改默认棋子数量
```typescript
// 文件: AutoChessMode.ts -> deployPlayerChessPieces()
private getDefaultTestPieces(): string[] {
    return ['axe', 'axe', 'axe', 'axe', 'crystal_maiden'];
    // 改成5个棋子：4个斧王 + 1个水晶室女
}
```

### 修改AI难度
```typescript
// 文件: AutoChessMode.ts -> startAllBattles()
const aiLevel = Math.floor(this.gameState.currentRound / 5) + 1;
// 修改公式以调整AI难度增长速度
```

### 修改战斗时间
```typescript
// 文件: AutoChessMode.ts -> startBattlePhase()
this.gameState.phaseTimeLeft = 45; // 修改战斗时间（秒）
```

### 修改准备时间
```typescript
// 文件: AutoChessMode.ts -> startPreparationPhase()
this.gameState.phaseTimeLeft = 30; // 修改准备时间（秒）
```

---

## 🐛 调试信息

游戏运行时，控制台会输出以下信息：

```
[AutoChessMode] Started battle phase for round 1
[AutoChessMode] Deployed 3 default test pieces for player 0
[ChessBattleSystem] Player 0 set as spectator
[ChessBattleSystem] Player 0 deployed axe at (1, 1)
[ChessBattleSystem] Player 0 deployed axe at (2, 1)
[ChessBattleSystem] Player 0 deployed crystal_maiden at (3, 1)
[AutoChessMode] Player 0 vs AI (Level 1)
[AutoChessMode] Started all AI battles
```

---

## 📊 战斗结果

战斗结束后，系统会：
1. 计算胜负
2. 失败扣除生命值（最多10点，随回合增加）
3. 更新连胜/连败记录
4. 自动进入下一回合

### 输出示例
```
[AutoChessMode] Player 0 defeated AI!
// 或
[AutoChessMode] Player 0 lost to AI (5 damage)
```

---

## 🎨 棋盘布局

```
   0  1  2  3  4  5  6  7
0  ·  ·  ·  ·  ·  ·  ·  ·
1  ·  🪓 🪓 ❄️ ·  ·  ·  ·  <- 我方棋子
2  ·  ·  ·  ·  ·  ·  ·  ·
3  ·  ·  ·  ·  ·  ·  ·  ·
4  ·  ·  ·  ·  ·  ·  ·  ·
5  ·  ·  ·  ·  ·  ·  ·  ·
6  ·  👹 👹 👹 ·  ·  ·  ·  <- 敌方AI棋子
7  ·  ·  ·  ·  ·  ·  ·  ·
```

---

## ⚠️ 注意事项

1. **玩家状态**: 战斗开始时，玩家英雄会被设置为：
   - 无敌（不会受伤）
   - 中立阵营（不会被攻击）
   - 禁止攻击（无法参与战斗）

2. **棋子生成**: 
   - 我方：从备战席读取，如果为空则使用默认配置
   - 敌方：AI自动生成，数量随难度增加

3. **战斗机制**: 
   - 棋子会自动寻找敌方目标并攻击
   - 使用DOTA2原生AI（自动攻击）
   - 战斗结束条件：一方全灭或时间结束

---

## 🔄 下一步开发

- [ ] 添加更多英雄棋子
- [ ] 实现装备系统
- [ ] 添加羁绊效果
- [ ] 优化AI智能度
- [ ] 创建UI界面

---

*文档版本: 1.0.0*  
*最后更新: 2025-10-01*

