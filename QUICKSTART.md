# 🚀 快速启动指南

## 当前状态
- ✅ 所有编译错误已修复
- ✅ 自走棋模式已集成
- ✅ UI显示当前游戏模式
- ✅ 自动部署棋子系统

---

## 🎮 立即启动测试

### 1️⃣ 确保编译完成
等待终端显示编译成功（watch 模式持续运行）：
```
webpack compiled successfully
tstl compiled successfully
```

### 2️⃣ 启动游戏
```bash
npm run launch
```

### 3️⃣ 查看效果

游戏启动后，你会看到：

**右上角UI面板：**
```
┌─────────────────────────────────┐
│  🎮 FusionDota 测试面板         │
├─────────────────────────────────┤
│  [🔵 测试按钮1]  [🔴 测试按钮2] │
│                                 │
│  当前模式: ♟️ 自走棋模式        │  <- 紫色，自动显示
└─────────────────────────────────┘
```

**控制台输出：**
```
[GameModeManager] Switched from normal to autochess
[AutoChessMode] Initialized
[ChessBattleSystem] Initialized
```

---

## 🎯 自走棋战斗测试

### 自动流程
游戏会自动：
1. 检测工具模式 → 切换到自走棋模式
2. 设置玩家为无敌观察者（中立、无法攻击）
3. **准备阶段（30秒）** - 可以购买棋子
4. **战斗阶段（45秒）** - 自动部署棋子并战斗
   - 我方：2个斧王 + 1个水晶室女
   - 敌方：AI生成随机棋子（3-8个）

### 控制台查看战斗
按 **F10** 打开控制台，查看战斗日志：
```
[AutoChessMode] Started battle phase for round 1
[AutoChessMode] Deployed 3 default test pieces for player 0
[ChessBattleSystem] Player 0 deployed axe at (1, 1)
[ChessBattleSystem] Player 0 deployed axe at (2, 1)
[ChessBattleSystem] Player 0 deployed crystal_maiden at (3, 1)
[AutoChessMode] Player 0 vs AI (Level 1)
```

---

## 🔧 快捷键

- **F9** - 重新创建UI
- **F8** - 显示面板调试信息
- **F10** - 打开/关闭控制台

---

## 📝 修改配置

### 改变默认棋子
编辑 `AutoChessMode.ts` (Line 273)：
```typescript
private getDefaultTestPieces(): string[] {
    return ['axe', 'axe', 'crystal_maiden'];  // 修改这里
}
```

可用棋子：`axe`, `anti_mage`, `crystal_maiden`, `drow_ranger`, `bounty_hunter`

### 改变战斗时间
编辑 `AutoChessMode.ts` (Line 188)：
```typescript
this.gameState.phaseTimeLeft = 45; // 战斗时间（秒）
```

---

现在运行 `npm run launch` 即可！

