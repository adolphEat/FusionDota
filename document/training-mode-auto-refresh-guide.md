# 训练模式自动刷新功能指南

## 🎯 新增功能概览

FusionDota训练模式现已支持强大的自动刷新功能，包括：

### ✨ 自动刷怪系统
- **智能定时刷新**: 自动在玩家周围生成怪物，支持自定义间隔
- **难度递增**: 可选的随时间增加怪物强度
- **数量控制**: 自动管理场上怪物数量，避免性能问题
- **位置智能**: 在玩家周围合适范围内随机生成

### 🎯 自动木桩系统
- **固定位置生成**: 在玩家周围圆形排列生成训练木桩
- **自动复活**: 木桩被破坏后自动重新生成
- **属性定制**: 可配置血量和无敌状态
- **位置记忆**: 记住初始位置，确保训练环境一致

### 🌟 经典命令支持
- **野怪刷新**: 参考官方命令，一键刷新所有野怪营地
- **小兵刷新**: 刷新三路小兵
- **英雄创建**: 生成敌方英雄用于对战测试

## 🚀 快速开始

### 1. 启动自动刷怪
```bash
# 基础自动刷怪（默认狗头人，每10秒刷2个1级）
-auto_spawn start

# 自定义自动刷怪
-auto_spawn start npc_dota_neutral_dark_troll 3 5 15
# 参数: 单位类型 数量 等级 间隔(秒)

# 查看状态
-auto_spawn status

# 停止自动刷怪
-auto_spawn stop
```

### 2. 启动自动木桩
```bash
# 基础自动木桩（4个木桩，5000血量）
-auto_dummy start

# 自定义自动木桩
-auto_dummy start 6 10000 true
# 参数: 数量 血量 是否无敌

# 查看状态
-auto_dummy status

# 停止自动木桩
-auto_dummy stop
```

### 3. 经典刷新命令
```bash
# 刷新野怪营地
-spawnneutrals

# 刷新三路小兵
-spawncreeps

# 创建敌方英雄
-createhero npc_dota_hero_pudge
-createhero npc_dota_hero_invoker
```

## 📋 完整命令列表

### 自动刷怪命令 (`-auto_spawn`)
| 命令 | 说明 | 示例 |
|------|------|------|
| `start [unit] [count] [level] [interval]` | 开始自动刷怪 | `-auto_spawn start npc_dota_neutral_kobold 2 1 10` |
| `stop` | 停止自动刷怪 | `-auto_spawn stop` |
| `status` | 查看当前状态 | `-auto_spawn status` |

### 自动木桩命令 (`-auto_dummy`)
| 命令 | 说明 | 示例 |
|------|------|------|
| `start [count] [health] [invulnerable]` | 开始自动木桩 | `-auto_dummy start 4 5000 false` |
| `stop` | 停止自动木桩 | `-auto_dummy stop` |
| `status` | 查看当前状态 | `-auto_dummy status` |

### 经典刷新命令
| 命令 | 说明 |
|------|------|
| `-spawnneutrals` | 刷新所有中性野怪营地 |
| `-spawncreeps` | 刷新三路小兵 |
| `-createhero <hero_name>` | 创建指定英雄 |

## 🎮 使用场景示例

### 场景1: 基础战斗练习
```bash
# 1. 启动训练模式
-training start

# 2. 开始自动刷怪
-auto_spawn start npc_dota_neutral_kobold 2 1 8

# 3. 练习击杀怪物，每8秒自动刷新2个1级狗头人
```

### 场景2: 技能连招练习
```bash
# 1. 启动自动木桩
-auto_dummy start 6 10000 true

# 2. 练习技能连招，木桩不会死亡
# 3. 木桩被意外破坏会自动重新生成
```

### 场景3: 高难度挑战
```bash
# 1. 刷新自己状态
-refresh

# 2. 启动高难度自动刷怪
-auto_spawn start npc_dota_neutral_dark_troll_warlord 1 10 5

# 3. 每5秒刷一个10级黑暗巨魔督军
```

### 场景4: 英雄对战测试
```bash
# 1. 创建敌方英雄
-createhero npc_dota_hero_pudge

# 2. 给自己无敌状态
-god

# 3. 测试技能对英雄的效果
```

## ⚙️ 配置参数说明

### 自动刷怪配置
- **单位类型**: 任何有效的DOTA2单位名称
- **数量**: 每次刷新的数量 (1-10推荐)
- **等级**: 单位等级 (1-25)
- **间隔**: 刷新间隔秒数 (最小1秒)
- **最大数量**: 场上同时存在的最大数量 (默认10个)
- **刷新半径**: 在玩家周围的刷新范围 (默认500-800单位)

### 自动木桩配置
- **数量**: 木桩数量 (1-8推荐)
- **血量**: 木桩血量 (建议1000-50000)
- **无敌状态**: true/false，是否设置无敌
- **自动复活**: 木桩被破坏后是否自动重新生成
- **复活延迟**: 重新生成的延迟时间 (默认5秒)

## 🔧 常用单位名称参考

### 基础怪物
```
npc_dota_neutral_kobold              # 狗头人
npc_dota_neutral_kobold_tunneler     # 狗头人挖掘者
npc_dota_neutral_kobold_taskmaster   # 狗头人监工
```

### 中等怪物
```
npc_dota_neutral_dark_troll          # 黑暗巨魔
npc_dota_neutral_dark_troll_warlord  # 黑暗巨魔督军
npc_dota_neutral_centaur_khan        # 半人马酋长
npc_dota_neutral_satyr_soulstealer   # 萨特夺魂者
```

### 高级怪物
```
npc_dota_neutral_ogre_mauler         # 食人魔重击者
npc_dota_neutral_wildkin             # 野人
npc_dota_neutral_granite_golem       # 花岗岩傀儡
```

### 英雄单位
```
npc_dota_hero_pudge                  # 屠夫
npc_dota_hero_invoker                # 祈求者
npc_dota_hero_crystal_maiden         # 水晶室女
npc_dota_hero_axe                    # 斧王
```

## 🛠️ 故障排除

### 问题1: 命令无效
**解决方案**: 确保在训练模式下使用
```bash
-mode training
-training start
```

### 问题2: 自动刷怪不工作
**解决方案**: 检查配置和状态
```bash
-auto_spawn status
-training status
```

### 问题3: 木桩不重新生成
**解决方案**: 检查自动复活设置
```bash
-auto_dummy stop
-auto_dummy start 4 5000 false  # 确保不是无敌状态
```

### 问题4: 性能问题
**解决方案**: 减少刷新频率和数量
```bash
-auto_spawn stop
-clear  # 清理现有单位
-auto_spawn start npc_dota_neutral_kobold 1 1 15  # 减少频率
```

## 💡 高级技巧

### 1. 组合使用
```bash
# 同时启动怪物和木桩系统
-auto_spawn start npc_dota_neutral_kobold 2 1 12
-auto_dummy start 4 8000 true
```

### 2. 场景快速切换
```bash
# 快速清理并重新开始
-auto_spawn stop
-auto_dummy stop
-clear
-auto_spawn start npc_dota_neutral_dark_troll 1 5 8
```

### 3. 测试环境重置
```bash
# 完全重置训练环境
-training stop
-clear
-training start
-refresh
```

## 📊 性能优化建议

1. **合理设置刷新间隔**: 推荐8-15秒间隔
2. **控制同时存在数量**: 不超过15个单位
3. **定期清理**: 使用 `-clear` 清理不需要的单位
4. **避免过于频繁的操作**: 每次更改设置间隔2-3秒

---

*该功能已集成到FusionDota v1.3.0中，支持单机和联网模式。*
