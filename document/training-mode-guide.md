# FusionDota 练功房模式使用指南

## 🎯 系统概述

FusionDota的练功房模式是一个专为策划和开发者设计的测试环境，提供便捷的怪物强度测试、技能验证和游戏平衡调试功能。

### 🌟 核心特性
- **智能模式检测** - 自动识别单机/开发环境并切换到训练模式
- **双重控制方式** - UI界面 + 聊天命令，满足不同使用习惯
- **完整怪物系统** - 支持自定义属性、等级和生成位置
- **预设测试场景** - 内置多种测试场景，快速开始测试
- **实时状态监控** - 网络表同步，实时显示测试状态
- **无缝网络支持** - 单机和联网模式均可使用

## 🚀 快速开始

### 自动激活
系统会在以下情况自动启用训练模式：
- 启动工具模式（`IsInToolsMode()`）
- 单人游戏
- 地图名包含 "training"

### 手动激活
```
# 聊天命令激活
-mode training

# 或者通过训练控制
-training start
```

## 🎯 完整流程演示

### 从启动到测试的完整命令流程

#### 第一步：项目启动
```bash
# 在 FusionDota-main 项目根目录执行
cd FusionDota-main

# 启动开发环境（推荐，会自动进入训练模式）
npm run launch

# 说明：launch 命令默认启动工具模式(-tools)，自动激活训练模式
```

#### 第二步：等待游戏启动
```bash
# 等待控制台输出类似信息：
# [Gulp] Starting 'launch:tools'...
# [Gulp] DOTA2 launched successfully
# [Gulp] Game server is running...

# 游戏启动后会自动进入DOTA2客户端
```

#### 第三步：进入游戏并验证模式
```bash
# 🎮 重要：以下命令必须在游戏内聊天界面输入，不是控制台！
# 操作：进入DOTA2游戏 → 按Enter键打开聊天 → 输入命令 → 按Enter发送

-mode
# 期望输出：在游戏内聊天区域显示 "Current mode: training"

-system_info
# 期望输出：在游戏内聊天区域显示系统信息

-training status
# 期望输出：在游戏内聊天区域显示 "Training mode: Active"
```

#### 第四步：模式切换（如果需要）
```bash
# 🎮 在游戏内聊天界面输入：
# 如果当前不是训练模式，手动切换：
-mode training
# 期望输出：在聊天区域显示 "Game mode switched to: training"

# 激活训练模式功能：
-training start
# 期望输出：在聊天区域显示 "Training mode activated"
```

#### 第五步：准备测试环境
```bash
# 🎮 在游戏内聊天界面依次输入以下命令：

# 1. 刷新英雄状态
-refresh
# 期望输出：在聊天区域显示 "Hero refreshed"

# 2. 提升英雄等级到合适水平
-lvlup 15
# 期望输出：在聊天区域显示等级提升信息

# 3. 给予充足金币
-gold 20000
# 期望输出：在聊天区域显示金币增加信息

# 4. 开启无敌模式（可选）
-god
# 期望输出：在聊天区域显示 "God mode enabled"

# 5. 验证准备完成
-training status
# 期望输出：在聊天区域显示训练模式状态
```

#### 第六步：开始基础测试

**方案A：使用预设测试场景**
```bash
# 🎮 在游戏内聊天界面输入：

# 1. 查看可用场景
-scenario list
# 期望输出：在聊天区域显示可用场景列表

# 2. 开始基础战斗测试
-scenario start basic_combat
# 期望输出：在聊天区域显示 "Started test scenario: basic_combat"
# 游戏中会自动生成3个1级狗头人

# 3. 进行战斗，击杀所有怪物
# （在游戏中使用鼠标右键攻击或技能攻击生成的怪物）

# 4. 等待场景完成
# 期望输出：在聊天区域显示场景完成信息
```

**方案B：手动生成怪物测试**
```bash
# 🎮 在游戏内聊天界面输入：

# 1. 生成基础怪物
-spawn npc_dota_neutral_kobold 3 1
# 期望输出：在聊天区域显示怪物生成成功信息

# 2. 击杀生成的怪物
# （在游戏中使用鼠标右键攻击或技能）

# 3. 生成更强的怪物
-spawn npc_dota_neutral_dark_troll 2 5
# 期望输出：在聊天区域显示更强怪物生成信息

# 4. 继续测试战斗
```

#### 第七步：进阶测试
```bash
# 🎮 在游戏内聊天界面输入：

# 1. 清理之前的单位
-clear
# 期望输出：在聊天区域显示清理完成信息

# 2. 开始伤害测试场景
-scenario start damage_test
# 期望输出：在聊天区域显示 "Started test scenario: damage_test"
# 会生成1个高血量训练假人

# 3. 测试技能伤害
# （在游戏中对训练假人使用各种技能，观察伤害数字）

# 4. 生成自定义强度怪物
-spawn npc_dota_neutral_centaur_khan 1 10
# 期望输出：在聊天区域显示强力怪物生成信息

# 5. 测试不同怪物类型
-spawn npc_dota_neutral_ogre_mauler 2 8
# 期望输出：在聊天区域显示怪物生成信息
```

#### 第八步：批量测试
```bash
# 🎮 在游戏内聊天界面依次输入：

# 1. 清理环境
-clear
# 期望输出：在聊天区域显示清理完成信息

# 2. 批量生成多种怪物进行综合测试
-spawn npc_dota_neutral_kobold 5 3
-spawn npc_dota_neutral_dark_troll 3 5
-spawn npc_dota_neutral_centaur_khan 2 7
# 同时生成多种不同强度的怪物

# 3. 检查当前状态
-training status
# 期望输出：在聊天区域显示训练状态和生成单位数量

# 4. 进行大规模战斗测试
# （在游戏中与多个怪物同时战斗，测试AOE技能效果）
```

#### 第九步：结束测试
```bash
# 🎮 在游戏内聊天界面依次输入：

# 1. 停止当前测试场景（如果有）
-scenario stop
# 期望输出：在聊天区域显示 "Stopped current test scenario"

# 2. 清理所有生成的单位
-clear
# 期望输出：在聊天区域显示清理完成信息

# 3. 关闭无敌模式
-god
# 期望输出：在聊天区域显示 "God mode disabled"

# 4. 查看测试统计
-perf_stats
# 在聊天区域显示性能统计信息

-error_stats
# 在聊天区域显示错误统计信息

# 5. 验证清理完成
-training status
# 期望输出：在聊天区域显示训练状态（已清理完成）
```

#### 第十步：退出或继续
```bash
# 🎮 在游戏内聊天界面输入（可选）：

# 选项A：继续其他测试
-refresh
# 重置英雄状态，开始新一轮测试

# 选项B：切换回正常模式
-mode normal
# 期望输出：在聊天区域显示 "Game mode switched to: normal"

# 选项C：停用训练模式但保持训练游戏模式
-training stop
# 期望输出：在聊天区域显示 "Training mode deactivated"

# 选项D：退出游戏
# 直接关闭DOTA2客户端，或在项目控制台按 Ctrl+C 停止服务器
```

### 🚀 一键快速测试脚本
```bash
# 🎮 注意：在游戏内聊天界面依次快速输入（适合熟练用户）

# 超快速测试流程
-mode training
-training start
-refresh
-lvlup 20
-gold 50000
-god
-scenario start basic_combat

# 等待击杀完成后
-clear
-scenario start damage_test

# 测试完成后清理
-clear
-god
-training status
```

### 📊 预期游戏内聊天输出示例
```
🎮 以下为游戏内聊天区域的预期输出：

[开始]
> -mode
Current mode: training
Available modes: normal, training, custom

> -training status
Training mode: Active
Spawned units: 0

[测试中]
> -scenario start basic_combat
Started test scenario: basic_combat

[游戏事件] Test scenario completed: 基础战斗测试 in 15.3s

> -spawn npc_dota_neutral_dark_troll 3 5
Spawned 3/3 units of type npc_dota_neutral_dark_troll at level 5

[结束]
> -clear
Cleared 3 units

> -training status
Training mode: Active
Spawned units: 0
无活动场景
```

### 🎯 UI面板操作对照
如果您更喜欢使用UI界面，以上命令在训练面板中的对应操作：

1. **模式验证** → 查看面板顶部状态信息
2. **英雄准备** → 点击"刷新英雄"、设置等级和金币
3. **开始测试** → 选择场景下拉菜单，点击"开始测试"
4. **怪物生成** → 使用快速生成按钮或自定义输入
5. **结束测试** → 点击"停止测试"和"清理单位"

### 🔧 常用怪物单位名称
```bash
# 基础怪物
npc_dota_neutral_kobold              # 狗头人
npc_dota_neutral_kobold_tunneler     # 狗头人挖掘者
npc_dota_neutral_kobold_taskmaster   # 狗头人监工

# 中等怪物
npc_dota_neutral_dark_troll          # 黑暗巨魔
npc_dota_neutral_dark_troll_warlord  # 黑暗巨魔督军
npc_dota_neutral_centaur_khan        # 半人马酋长
npc_dota_neutral_centaur_outrunner   # 半人马跑者

# 高级怪物
npc_dota_neutral_ogre_mauler         # 食人魔重击者
npc_dota_neutral_wildkin             # 野人
npc_dota_neutral_satyr_hellcaller    # 萨特地狱召唤者

# 特殊单位
npc_dota_training_dummy              # 训练假人
npc_dota_creep_badguys_melee         # 近战小兵
npc_dota_creep_badguys_ranged        # 远程小兵
```

## 🎮 使用方法

### 1. 聊天命令控制

#### 基础控制命令
```bash
-help                    # 显示所有可用命令
-mode [new_mode]         # 显示或切换游戏模式
-training <action>       # 训练模式控制 (start|stop|status|settings)
-system_info            # 显示系统信息
```

#### 怪物生成命令
```bash
-spawn <unit_name> [count] [level]
# 示例：
-spawn npc_dota_neutral_kobold 5 3        # 生成5个3级狗头人
-spawn npc_dota_neutral_dark_troll 2 10   # 生成2个10级巨魔

-clear                   # 清理所有生成的单位
```

#### 测试场景命令
```bash
-scenario list           # 列出所有可用场景
-scenario start <id>     # 开始指定测试场景
-scenario stop           # 停止当前测试场景

# 示例：
-scenario start basic_combat    # 开始基础战斗测试
-scenario start damage_test     # 开始伤害测试
```

#### 英雄控制命令
```bash
-refresh                 # 刷新英雄状态（满血满蓝，重置CD）
-god                     # 切换无敌模式
-lvlup [levels]          # 提升英雄等级
-gold [amount]           # 给予金币

# 示例：
-lvlup 10               # 提升10级
-gold 50000             # 给予50000金币
```

### 2. UI界面控制

训练面板位于屏幕右侧，提供直观的可视化控制：

#### 面板功能区域
1. **状态信息** - 显示当前游戏模式、训练状态、测试场景进度
2. **基础控制** - 激活/停用训练模式、刷新英雄、无敌模式、清理单位
3. **怪物生成** - 自定义单位生成和快速生成按钮
4. **测试场景** - 选择和控制预设测试场景
5. **英雄控制** - 等级和金币设置
6. **训练设置** - 各种训练模式开关

#### 快速生成按钮
- **狗头人** - 生成3个1级狗头人（基础近战单位）
- **巨魔** - 生成3个1级巨魔（中等强度）
- **半人马** - 生成3个1级半人马（高强度单位）
- **训练假人** - 生成1个训练假人（伤害测试用）

## 📋 预设测试场景

### 基础战斗测试 (basic_combat)
- **目标**: 测试基础战斗机制
- **内容**: 生成3个1级狗头人
- **用途**: 验证英雄技能、普攻、基础属性

### 伤害测试 (damage_test)
- **目标**: 精确测试伤害数值
- **内容**: 生成1个高血量训练假人（10000HP，0护甲，0魔抗）
- **用途**: 测试技能伤害、DPS计算、装备效果

### 自定义场景
开发者可以在 `TrainingMode.ts` 中添加新的测试场景：

```typescript
const newScenario: TestScenario = {
    id: 'custom_test',
    name: '自定义测试',
    description: '自定义的测试场景',
    monsters: [
        {
            unitName: 'npc_custom_unit',
            count: 5,
            level: 15,
            customStats: {
                health: 5000,
                damage: 200,
                armor: 10
            }
        }
    ],
    environment: {
        timeOfDay: 0.75  // 夜晚
    },
    objectives: [
        {
            type: 'kill_all',
            description: '击杀所有自定义单位'
        }
    ]
};
```

## ⚙️ 训练设置说明

### 可配置选项
- **自动复活** (`autoRespawn`) - 英雄死亡后1秒自动复活
- **无限资源** (`infiniteResources`) - 提供大量金币和经验
- **无冷却** (`noCooldowns`) - 移除所有技能和物品冷却时间
- **快速升级** (`fastLevelUp`) - 加速等级提升
- **显示伤害数字** (`showDamageNumbers`) - 显示详细伤害信息
- **击杀后暂停** (`pauseAfterKill`) - 完成测试后自动暂停游戏
- **启用目标假人** (`enableTargetDummies`) - 自动生成训练假人

### 设置修改
```typescript
// 通过代码修改
GameRules.TrainingMode.updateSettings({
    noCooldowns: true,
    showDamageNumbers: true,
    pauseAfterKill: false
});

// 或通过UI界面的设置开关
```

## 🔧 高级功能

### 自定义单位属性
```typescript
// 生成具有自定义属性的单位
const customUnit = GameRules.TrainingMode.spawnMonster('npc_dota_neutral_kobold', position, {
    level: 10,
    customStats: {
        health: 3000,        // 自定义血量
        mana: 1000,          // 自定义魔法值
        damage: 150,         // 自定义攻击力
        armor: 5,            // 自定义护甲
        magicResistance: 25, // 自定义魔法抗性
        moveSpeed: 400       // 自定义移动速度
    }
});
```

### 网络表数据访问
```typescript
// 获取训练模式状态
const trainingStatus = CustomNetTables.GetTableValue('training_mode', 'status');

// 获取游戏模式信息
const gameModeInfo = CustomNetTables.GetTableValue('game_mode', 'current');

// 监听状态变化
CustomNetTables.SubscribeNetTableListener('training_mode', (table, key, data) => {
    console.log('Training mode updated:', data);
});
```

### 事件监听
```typescript
// 监听测试场景事件
GameEvents.Subscribe('training_scenario_started', (event) => {
    console.log('Scenario started:', event.scenario.name);
});

GameEvents.Subscribe('training_scenario_completed', (event) => {
    console.log('Scenario completed in', event.duration, 'seconds');
});

GameEvents.Subscribe('training_unit_killed', (event) => {
    console.log('Unit killed:', event.unitName, 'Remaining:', event.remainingUnits);
});
```

## 🛠️ 扩展开发

### 添加新的调试命令
在 `Debug.ts` 中添加新命令：

```typescript
['-my_command']: {
    desc: '我的自定义命令描述',
    func: (hero, ...args: string[]) => {
        if (!GameRules.GameModeManager?.isTrainingMode()) {
            Say(hero, 'This command only works in training mode', true);
            return;
        }
        
        // 命令逻辑
        const param = args[0];
        Say(hero, `执行自定义命令，参数：${param}`, true);
    },
}
```

### 创建自定义测试场景
```typescript
// 在 TrainingMode.ts 的 getTestScenario 方法中添加
'my_scenario': {
    id: 'my_scenario',
    name: '我的测试场景',
    description: '自定义测试场景描述',
    monsters: [
        {
            unitName: 'npc_dota_neutral_kobold',
            count: 10,
            level: 5,
            customStats: {
                health: 2000,
                damage: 100
            }
        }
    ],
    objectives: [
        {
            type: 'kill_all',
            description: '击杀所有怪物'
        }
    ]
}
```

### 添加新的UI控件
在 `training-panel/script.tsx` 中扩展界面：

```typescript
// 添加新的控制按钮
<button className="control-button" onClick={myCustomFunction}>
    自定义功能
</button>

const myCustomFunction = () => {
    GameEvents.SendCustomGameEventToServer('my_custom_event', {
        data: 'custom_data'
    });
    showNotification('执行自定义功能');
};
```

## 📊 性能和限制

### 性能考虑
- **单位数量限制**: 建议同时生成的单位不超过50个
- **更新频率**: UI状态每秒更新一次，避免频繁操作
- **网络传输**: 大型测试数据会分片传输，避免阻塞

### 内存管理
- 生成的单位会自动在测试结束后清理
- 错误和性能数据有自动清理机制
- 建议定期使用`-clear`命令清理单位

## 🔍 故障排除

### 常见问题

#### 1. 训练模式无法激活
- 检查游戏模式：使用`-mode`命令查看当前模式
- 手动切换：`-mode training`
- 检查控制台是否有错误信息

#### 2. UI界面不显示
- 确认是否在训练模式下
- 检查浏览器控制台是否有JavaScript错误
- 尝试刷新UI：按F5重新加载

#### 3. 怪物无法生成
- 确认单位名称正确（使用标准DOTA2单位名）
- 检查是否有足够的生成空间
- 查看控制台错误信息

#### 4. 网络同步问题
- 检查XNetTable是否正常工作
- 使用`-system_info`查看系统状态
- 重启游戏重新初始化

### 调试技巧
```bash
# 检查系统状态
-system_info

# 查看错误统计
-error_stats

# 查看性能数据
-perf_stats

# 测试错误追踪
-test_error "测试消息"
```

## 📈 最佳实践

### 测试流程建议
1. **启动训练模式** - 确认环境正确配置
2. **设置基础参数** - 调整英雄等级、金币、装备
3. **选择测试场景** - 根据测试目标选择合适场景
4. **执行测试** - 记录关键数据和现象
5. **清理环境** - 清理单位，重置状态

### 团队协作
- **标准化测试** - 使用预设场景确保测试一致性
- **数据记录** - 利用性能监控记录测试数据
- **错误追踪** - 及时报告和修复发现的问题
- **配置共享** - 通过网络表同步测试配置

### 开发建议
- **模块化扩展** - 新功能应遵循现有架构模式
- **错误处理** - 所有新代码应包含适当的错误处理
- **性能监控** - 重要操作应添加性能监控
- **文档更新** - 新功能应及时更新文档

---

## 🎯 总结

FusionDota练功房模式提供了完整的测试环境，支持：

✅ **便捷的操作方式** - UI + 命令双重控制  
✅ **灵活的怪物生成** - 自定义属性和预设场景  
✅ **实时状态监控** - 完整的数据同步机制  
✅ **强大的扩展性** - 易于添加新功能和场景  
✅ **优秀的开发体验** - 错误追踪和性能监控  

通过这套系统，策划可以高效地测试游戏平衡性，开发者可以快速验证功能实现，为游戏开发提供强有力的支持。

---

*最后更新: 2025-07-15*  
*版本: 1.0*  
*作者: FusionDota开发团队*