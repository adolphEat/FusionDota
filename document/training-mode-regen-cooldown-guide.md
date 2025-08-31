# 训练模式自动回血回蓝和快速技能CD功能指南

## 🎯 新增功能概览

FusionDota训练模式现已支持英雄自动回血回蓝和快速技能CD功能：

### ✨ 自动回血回蓝系统
- **实时监控**: 每秒检查英雄血量和魔法值状态
- **智能补充**: 只在血量或蓝量不满时进行补充
- **瞬间回复**: 立即恢复到满血满蓝状态
- **可切换**: 支持运行时开启/关闭

### ⚡ 快速技能CD系统
- **自定义CD时间**: 支持设置任意CD时间（默认3秒）
- **全技能覆盖**: 包括英雄技能和物品CD
- **实时调整**: 0.1秒间隔检查并调整CD时间
- **智能管理**: 只对超过设定时间的CD进行调整

## 🚀 快速开始

### 1. 自动回血回蓝控制
```bash
# 开启自动回血回蓝
-auto_regen on

# 关闭自动回血回蓝
-auto_regen off

# 切换状态
-auto_regen toggle

# 查看状态
-auto_regen status
```

### 2. 快速技能CD控制
```bash
# 开启快速CD（默认3秒）
-fast_cd on

# 开启快速CD并设置为5秒
-fast_cd on 5

# 关闭快速CD
-fast_cd off

# 切换状态
-fast_cd toggle

# 查看状态
-fast_cd status
```

## 📋 详细命令说明

### 自动回血回蓝命令 (`-auto_regen`)

| 命令 | 说明 | 示例 |
|------|------|------|
| `on` | 开启自动回血回蓝 | `-auto_regen on` |
| `off` | 关闭自动回血回蓝 | `-auto_regen off` |
| `toggle` | 切换开关状态 | `-auto_regen toggle` |
| `status` | 查看当前状态 | `-auto_regen status` |

**功能说明**：
- 每1秒检查一次英雄状态
- 自动将血量和魔法值恢复到最大值
- 只在不满状态时进行恢复，避免不必要的操作

### 快速技能CD命令 (`-fast_cd`)

| 命令 | 说明 | 示例 |
|------|------|------|
| `on [seconds]` | 开启快速CD，可选设置秒数 | `-fast_cd on 3` |
| `off` | 关闭快速CD | `-fast_cd off` |
| `toggle` | 切换开关状态 | `-fast_cd toggle` |
| `status` | 查看当前状态 | `-fast_cd status` |

**功能说明**：
- 每0.1秒检查一次技能和物品CD
- 将超过设定时间的CD调整为指定值
- 支持0.1秒到300秒的任意设置
- 同时作用于英雄技能和物品

## 🎮 使用场景示例

### 场景1: 基础练功设置
```bash
# 1. 启动训练模式
-training start

# 2. 开启自动回血回蓝
-auto_regen on

# 3. 开启3秒快速CD
-fast_cd on 3

# 4. 现在可以无限制地练习技能和连招
```

### 场景2: 极速练习模式
```bash
# 1. 设置1秒极速CD
-fast_cd on 1

# 2. 开启自动回血回蓝
-auto_regen on

# 3. 开启无敌模式
-god

# 4. 可以进行高频次的技能练习
```

### 场景3: 自定义练习环境
```bash
# 1. 设置5秒CD用于模拟真实游戏
-fast_cd on 5

# 2. 开启自动回血回蓝
-auto_regen on

# 3. 生成训练假人
-auto_dummy start 4 10000 true

# 4. 在接近真实的环境中练习
```

### 场景4: 快速切换模式
```bash
# 快速开启所有训练功能
-auto_regen on
-fast_cd on
-auto_spawn start

# 快速关闭所有训练功能
-auto_regen off
-fast_cd off
-auto_spawn stop
```

## ⚙️ 默认设置

训练模式启动时的默认配置：
- **自动回血回蓝**: ✅ 启用
- **快速技能CD**: ✅ 启用
- **CD时间**: 3秒
- **检查频率**: 回血回蓝1秒/次，CD检查0.1秒/次

## 🔧 高级配置

### 1. 自定义CD时间
```bash
# 设置不同的CD时间
-fast_cd on 0.5   # 极速模式
-fast_cd on 1     # 快速模式  
-fast_cd on 3     # 默认模式
-fast_cd on 5     # 接近真实
-fast_cd on 10    # 慢速模式
```

### 2. 组合使用
```bash
# 完整的练功房设置
-training start
-auto_regen on
-fast_cd on 3
-auto_spawn start npc_dota_neutral_kobold 2 1 10
-auto_dummy start 4 8000 true
-god  # 可选：无敌模式
```

### 3. 状态检查
```bash
# 查看所有功能状态
-training status
-auto_regen status  
-fast_cd status
-auto_spawn status
-auto_dummy status
```

## 📊 性能优化

### 定时器频率
- **自动回血回蓝**: 1秒间隔，性能影响极小
- **CD管理**: 0.1秒间隔，已优化仅在必要时执行调整

### 内存管理
- 自动清理无效的定时器引用
- 训练模式停用时自动清理所有定时器
- 优化的条件检查避免不必要的计算

### 建议设置
- **日常练习**: CD 3-5秒，开启自动回血回蓝
- **连招练习**: CD 1-2秒，开启自动回血回蓝  
- **技能测试**: CD 0.5-1秒，开启自动回血回蓝
- **模拟实战**: CD 原始值，关闭自动回血回蓝

## 🛠️ 故障排除

### 问题1: 命令无效
**解决方案**: 确保在训练模式下使用
```bash
-mode training
-training start
```

### 问题2: 自动回血回蓝不工作  
**解决方案**: 检查功能状态
```bash
-auto_regen status
-training status
```

### 问题3: CD设置不生效
**解决方案**: 验证CD管理状态
```bash
-fast_cd status
# 检查是否显示 "Active: YES"
```

### 问题4: 性能问题
**解决方案**: 适当调整检查频率
```bash
-fast_cd off
-auto_regen off
# 等待几秒后重新开启
-auto_regen on
-fast_cd on 5  # 使用较慢的CD
```

## 💡 使用技巧

### 1. 快速设置模板
```bash
# 创建别名命令（在聊天中依次输入）
# 基础练功模板
-auto_regen on; -fast_cd on 3; -auto_dummy start

# 高强度练习模板  
-auto_regen on; -fast_cd on 1; -god; -auto_spawn start
```

### 2. 分场景使用
- **学习新英雄**: 开启所有辅助功能
- **练习连招**: 重点使用快速CD
- **耐力测试**: 关闭自动回血回蓝
- **技能精度**: 使用中等CD时间

### 3. 效果验证
```bash
# 测试自动回血回蓝
-auto_regen on
# 受到伤害后观察是否自动回复

# 测试快速CD
-fast_cd on 1
# 使用技能后观察CD时间
```

---

*该功能已集成到FusionDota v1.3.1中，为练功房模式提供完整的训练辅助功能。*
