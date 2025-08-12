# FusionDota 项目架构文档

## 项目概述

**FusionDota** 是一个基于 Xavier X-Template 的 DOTA2 自定义游戏开发项目，使用现代化的 TypeScript 技术栈构建，支持前后端分离的开发模式。

- **项目名称**: FusionDota (fusion)
- **基础模板**: X-Template by Xavier
- **许可证**: MIT
- **仓库**: https://github.com/adolphEat/FusionDota

## 技术架构

### 核心技术栈

#### 前端 (Panorama UI)
- **语言**: TypeScript + React
- **UI框架**: React (v16.14.0) + Panorama
- **构建工具**: Webpack 5 + TypeScript
- **样式**: Less + CSS
- **类型支持**: @moddota/panorama-types

#### 后端 (游戏逻辑)
- **语言**: TypeScript → Lua (TSTL)
- **运行时**: Lua JIT
- **编译器**: TypeScript-to-Lua (TSTL)
- **类型支持**: @moddota/dota-lua-types
- **调试**: 源码映射支持

#### 构建系统
- **任务运行器**: Gulp + npm-scripts
- **包管理器**: Yarn/NPM
- **监听模式**: Webpack watch + TSTL watch
- **热重载**: 开发模式支持

### 项目结构

```
FusionDota-main/
├── content/                    # 前端内容目录
│   ├── maps/                   # 地图文件
│   └── panorama/               # UI界面代码
│       ├── src/                # TypeScript/React源码
│       │   ├── hud/            # 游戏内UI
│       │   ├── loading-screen/ # 加载界面
│       │   ├── end_screen/     # 结束界面
│       │   ├── training-panel/ # 练功房控制面板 (v1.1.0)
│       │   ├── autochess-panel/ # 自走棋控制面板 (v1.2.0)
│       │   ├── hooks/          # React Hooks
│       │   └── utils/          # 工具类
│       │       └── error-handler.ts  # 前端错误处理 (v1.1.0)
│       ├── tsconfig.json       # 前端TS配置
│       ├── webpack.dev.js      # 开发构建配置
│       └── webpack.prod.js     # 生产构建配置
│
├── game/                       # 游戏逻辑目录
│   ├── scripts/                # 游戏脚本
│   │   ├── src/                # TypeScript源码
│   │   │   ├── modules/        # 游戏模块
│   │   │   │   ├── GameModeManager.ts  # 游戏模式管理 (v1.1.0)
│   │   │   │   ├── TrainingMode.ts     # 训练模式核心 (v1.1.0)
│   │   │   │   └── AutoChessMode.ts    # 自走棋模式核心 (v1.2.0)
│   │   │   ├── utils/          # 工具函数
│   │   │   │   ├── error-tracker.ts      # 错误追踪系统 (v1.1.0)
│   │   │   │   └── performance-monitor.ts # 性能监控系统 (v1.1.0)
│   │   │   ├── examples/       # 示例代码
│   │   │   └── server/         # 服务器API
│   │   ├── npc/                # NPC配置文件
│   │   └── tsconfig.json       # 后端TS配置
│   ├── resource/               # 资源文件
│   └── addoninfo.txt           # 插件信息
│
├── shared/                     # 前后端共享
│   ├── gameevents.d.ts         # 游戏事件定义
│   ├── net_tables.d.ts         # 网络表定义
│   └── x-net-table.d.ts        # 扩展网络表定义
│
├── scripts/                    # 构建脚本
│   ├── addon.config.ts         # 项目配置
│   ├── compile.ts              # 编译脚本
│   ├── launch.ts               # 启动脚本
│   └── publish.ts              # 发布脚本
│
├── excels/                     # Excel数据表
├── document/                   # 项目文档
│   ├── training-mode-guide.md  # 练功房模式使用指南 (v1.1.0)
│   ├── autochess-mode-guide.md # 自走棋模式使用指南 (v1.2.0)
│   ├── error-tracking-guide.md # 错误追踪系统指南 (v1.1.0)
│   └── versionsLog.md          # 版本更新日志 (v1.2.0)
├── tools/                      # 开发工具
├── gulpfile.ts                 # Gulp构建配置
└── package.json                # 项目依赖
```

## 核心功能特性

### 1. 现代化开发体验
- **TypeScript 全栈开发**: 前后端统一使用 TypeScript
- **React UI开发**: 使用 JSX 语法替代 XML 布局
- **实时编译**: 支持监听模式的热重载开发
- **类型安全**: 完整的类型定义和检查

### 2. 数据管理系统
- **Excel → KV 转换**: 自动将 Excel 表格转换为游戏 KV 文件
- **JSON 数据同步**: 生成对应的 JSON 文件供 TypeScript 使用
- **本地化支持**: 自动处理 `#Loc{}` 标记并生成本地化文件

### 3. 网络通信系统
- **标准网络表**: 支持 Valve 官方 CustomNetTables
- **扩展网络表 (XNetTable)**: 突破 2MB 限制，支持大数据传输
- **事件系统**: 完善的客户端-服务器事件通信
- **数据分片**: 大数据自动分片传输和重组

### 4. 模块化架构
- **模块系统**: 基于依赖注入的模块管理
- **单例模式**: GameRules 模块的单例管理
- **可重载设计**: 支持运行时模块重载 (@reloadable)

### 5. 开发工具
- **调试系统**: 内置调试命令和测试工具
- **性能分析**: 火焰图性能分析工具
- **加密发布**: 代码加密保护功能
- **快速启动**: 一键启动和测试命令

### 6. 练功房模式系统 (v1.1.0)
- **游戏模式管理**: 智能模式检测和切换（正常/训练/自定义）
- **训练环境**: 怪物生成、测试场景、英雄控制
- **双重控制**: UI界面 + 聊天命令操作
- **错误追踪**: 统一错误收集、去重、上报
- **性能监控**: 操作执行时间监控和阈值告警

### 7. 自走棋模式系统 (v1.2.0)
- **完整自走棋游戏**: 8人对战、回合制游戏流程
- **棋子系统**: 5个稀有度等级，智能棋子池管理
- **经济系统**: 金币、利息、连胜/连败奖励机制
- **商店机制**: 基于等级的概率刷新系统
- **可视化UI**: 完整的React自走棋控制界面
- **备战席管理**: 8个棋子存储位置

## 开发模式

### 开发环境配置

```bash
# 安装依赖
yarn install

# 开发模式 (监听文件变化)
yarn dev

# 快速启动测试
yarn launch [map_name]

# 启动工具模式 (自动激活训练模式)
yarn launch

# 生产构建
yarn prod
```

### 关键配置文件

#### `scripts/addon.config.ts`
```typescript
export default {
    addon_name: 'fusion',           // 项目名称
    encrypt_files: [...],           // 加密文件列表
    exclude_files: [...],           // 发布排除文件
    encryptDedicatedServerKey: '...', // 加密密钥
};
```

#### `content/panorama/webpack.dev.js`
- Panorama UI 的 Webpack 构建配置
- 支持 TypeScript、React、Less 编译
- 开发模式热重载支持

#### `game/scripts/tsconfig.json`
- TSTL 编译配置
- Lua JIT 目标平台
- 源码映射支持

## 核心模块详解

### 1. 游戏模块系统 (`game/scripts/src/modules/`)

#### `index.ts` - 模块初始化
```typescript
export function ActivateModules() {
    if (GameRules.XNetTable == null) {
        GameRules.XNetTable = new XNetTable();
        GameRules.ErrorTracker = ErrorTracker.getInstance();
        GameRules.PerformanceMonitor = PerformanceMonitor.getInstance();
        GameRules.GameModeManager = GameModeManager.getInstance();
        GameRules.TrainingMode = TrainingMode.getInstance();
        GameRules.AutoChessMode = AutoChessMode.getInstance();
        new GameConfig();
        new Debug();
    }
}
```

#### `Debug.ts` - 调试模块
- 提供开发期间的调试命令
- 支持在线调试白名单
- 包含性能测试和重载功能
- **新增训练模式命令**: `-mode`, `-training`, `-spawn`, `-scenario`, `-god`, `-refresh` 等
- **新增自走棋命令**: `-autochess`, `-buy`, `-shop`, `-chess_info` 等

#### `GameConfig.ts` - 游戏配置
- 游戏规则和参数配置
- 运行时配置管理

#### `GameModeManager.ts` - 游戏模式管理 (v1.1.0)
```typescript
export class GameModeManager {
    switchMode(mode: GameMode): boolean;
    getCurrentMode(): GameMode;
    isTrainingMode(): boolean;
    isCheatsEnabled(): boolean;
}
```
- 智能模式检测和切换
- 支持正常、训练、自定义三种模式
- 自动配置游戏规则和环境

#### `TrainingMode.ts` - 训练模式核心 (v1.1.0)
```typescript
export class TrainingMode {
    startTestScenario(scenarioId: string): boolean;
    spawnMonster(unitName: string, position: Vector, options: any): CDOTA_BaseNPC;
    updateSettings(settings: Partial<TrainingSettings>): void;
}
```
- 怪物生成和管理系统
- 预设测试场景执行
- 训练环境设置（无限资源、自动复活等）
- 事件驱动的测试流程管理

#### `AutoChessMode.ts` - 自走棋模式核心 (v1.2.0)
```typescript
export class AutoChessMode {
    startGame(): void;
    buyChessPiece(playerId: PlayerID, pieceId: string): boolean;
    startPreparationPhase(): void;
    startBattlePhase(): void;
    distributeRoundIncome(): void;
    refreshAllPlayersShop(): void;
}
```
- 完整自走棋游戏流程管理
- 8人对战和回合制系统
- 棋子购买和商店机制
- 经济系统（金币、利息、连胜奖励）
- 战斗配对和结果计算
- 实时状态同步到客户端

### 2. 网络通信系统 (`game/scripts/src/utils/xnet-table/`)

#### XNetTable 特性
- **突破限制**: 解决官方 2MB 网络表限制
- **数据分片**: 大数据自动分片传输
- **玩家专用**: 支持玩家专用数据表
- **重连同步**: 玩家重连时自动同步数据

### 3. UI 系统 (`content/panorama/src/`)

#### React 组件架构
```typescript
// 使用 React Hooks 和现代化开发
const Root: FC = () => {
    const dPressed = useKeyPressed('D');
    
    return (
        <PanoramaQRCode
            onactivate={handleClick}
            style={{ preTransformScale2d: dPressed ? '1.5' : '1' }}
        />
    );
};
```

#### 工具组件
- `draggable_window/`: 可拖拽窗口组件
- `react-panorama-qrcode/`: 二维码组件
- `flame_graph/`: 性能分析图表

#### 训练面板系统 (v1.1.0)
- `training-panel/`: 练功房模式控制界面
  ```typescript
  const TrainingPanel: React.FC = () => {
      const [state, setState] = useState<TrainingPanelState>({
          gameMode: 'normal',
          trainingActive: false,
          activeScenario: null,
          spawnedUnits: 0
      });
      // ...
  };
  ```
- **功能特性**:
  - 实时状态监控和显示
  - 怪物生成控制（自定义+快速按钮）
  - 测试场景选择和执行
  - 英雄控制（等级、金币、技能）
  - 训练设置开关
  - 折叠式面板设计

#### 自走棋面板系统 (v1.2.0)
- `autochess-panel/`: 自走棋模式控制界面
  ```typescript
  const AutoChessPanel: React.FC = () => {
      const [state, setState] = useState<AutoChessPanelState>({
          isActive: false,
          gameState: { currentRound: 0, currentPhase: 'preparation' },
          playerState: { health: 100, gold: 0, level: 1 },
          shopPieces: []
      });
      // ...
  };
  ```
- **功能特性**:
  - 游戏状态实时监控（回合、阶段、时间）
  - 玩家信息面板（生命值、金币、等级、连胜）
  - 棋子商店界面（5个商店位置，稀有度标识）
  - 备战席可视化（8个备战席位）
  - 游戏控制按钮（开始、结束、投降）
  - 调试控制面板（开发模式可见）
  - 现代化UI设计（渐变背景、动画效果）

#### 前端错误处理 (v1.1.0)
- `utils/error-handler.ts`: 前端错误捕获系统
  ```typescript
  export class FrontendErrorHandler {
      reportError(error: Error, context?: FrontendErrorContext): void;
      setupGlobalErrorHandlers(): void;
  }
  
  export class ErrorBoundary extends React.Component {
      // React 错误边界组件
  }
  ```

### 4. 工具系统 (`game/scripts/src/utils/`)

#### 核心工具
- `sequential-actions.ts`: 序列动作系统
- `timer_utils.ts`: 计时器工具
- `tween.ts`: 补间动画系统
- `performance/`: 性能分析工具

#### 新增调试工具 (v1.1.0)
- `error-tracker.ts`: 错误追踪系统
  ```typescript
  export class ErrorTracker {
      trackError(error: Error, context?: ErrorContext): string;
      getErrorStats(): any;
      clearErrorCache(): void;
  }
  ```
- `performance-monitor.ts`: 性能监控系统
  ```typescript
  export class PerformanceMonitor {
      startTimer(operation: string): string;
      endTimer(timerId: string): number;
      setThreshold(operation: string, thresholdMs: number): void;
  }
  ```

#### 加密系统
- `aeslua/`: AES 加密算法
- `decrypt.lua`: 解密工具
- 支持代码保护和安全发布

## 构建流程

### 1. 开发流程 (`yarn dev`)
```
并行执行:
├── gulp dev          # Excel→KV, KV→JSON 转换
├── webpack --watch   # Panorama UI 编译
└── tstl --watch      # 游戏脚本编译
```

### 2. 生产构建 (`yarn prod`)
```
串行执行:
├── prepublish.ts     # 预处理
├── gulp prod         # 数据处理
├── webpack prod      # UI 生产构建
├── tstl prod         # 脚本生产构建
└── publish.ts        # 加密发布
```

### 3. 数据处理流程
```
Excel 文件 → KV 文件 → JSON 文件
     ↓           ↓         ↓
   excels/  game/scripts/  src/json/
             npc/       panorama/src/json/
```

## 最佳实践

### 1. 代码组织
- 使用 TypeScript 严格模式开发
- 模块化设计，避免全局变量
- 合理使用 `@reloadable` 装饰器

### 2. 性能优化
- 使用 XNetTable 处理大数据传输
- 合理使用网络表缓存
- 避免频繁的跨端通信

### 3. 调试技巧
- 使用内置调试命令 (`-help`, `-r`, `-s`)
- 开启火焰图性能分析
- 利用源码映射调试 Lua 代码

#### 练功房模式调试 (v1.1.0)
```bash
# 基础调试命令
-mode                    # 查看当前游戏模式
-training status         # 查看训练模式状态
-system_info             # 查看系统信息

# 错误和性能监控
-error_stats            # 查看错误统计
-perf_stats             # 查看性能统计
-test_error "消息"       # 测试错误追踪

# 训练模式专用命令
-spawn <unit> [count] [level]  # 生成测试怪物
-scenario start <id>           # 开始测试场景
-refresh                       # 刷新英雄状态
-god                          # 切换无敌模式
```

#### 自走棋模式调试 (v1.2.0)
```bash
# 自走棋模式控制
-autochess activate      # 激活自走棋模式
-autochess deactivate    # 停用自走棋模式
-autochess status        # 查看自走棋状态
-autochess game start    # 开始游戏

# 棋子操作
-buy anti_mage           # 购买敌法师
-buy crystal_maiden      # 购买水晶室女
-chess_info              # 查看可用棋子列表
-chess_info anti_mage    # 查看特定棋子信息

# 商店操作
-shop refresh            # 刷新商店
-shop show              # 显示商店信息
```

### 4. 发布准备
- 配置正确的加密密钥
- 测试加密发布版本
- 确保资源文件完整性

## 扩展指南

### 添加新模块
1. 在 `game/scripts/src/modules/` 创建模块文件
2. 在 `index.ts` 中注册模块
3. 如需要，在 `shared/` 中添加类型定义

### 添加新UI组件
1. 在 `content/panorama/src/` 对应目录创建组件
2. 使用 React + TypeScript 开发
3. 在 `webpack.dev.js` 中配置入口点

### 添加数据表
1. 在 `excels/` 中创建 Excel 文件
2. 定义表格结构和键值
3. 构建系统会自动生成 KV 和 JSON 文件

### 扩展练功房功能 (v1.1.0)

#### 添加新测试场景
```typescript
// 在 TrainingMode.ts 的 getTestScenario 方法中添加
'custom_scenario': {
    id: 'custom_scenario',
    name: '自定义场景',
    description: '场景描述',
    monsters: [
        {
            unitName: 'npc_custom_unit',
            count: 5,
            level: 10,
            customStats: {
                health: 3000,
                damage: 200
            }
        }
    ]
}
```

#### 添加新调试命令
```typescript
// 在 Debug.ts 中添加
['-my_command']: {
    desc: '自定义命令描述',
    func: (hero, ...args: string[]) => {
        if (!GameRules.GameModeManager?.isTrainingMode()) {
            Say(hero, 'Only works in training mode', true);
            return;
        }
        // 命令逻辑
    },
}
```

#### 扩展训练面板UI
```typescript
// 在 training-panel/script.tsx 中添加新控件
const newFunction = () => {
    GameEvents.SendCustomGameEventToServer('custom_training_event', {
        data: 'custom_data'
    });
};

<button className="control-button" onClick={newFunction}>
    自定义功能
</button>
```

---

## 📈 版本历史

### v1.2.0 (2025-07-16) - 自走棋模式系统
- ✅ 实现完整自走棋游戏系统
- ✅ 8人对战和回合制游戏流程
- ✅ 棋子系统和经济系统
- ✅ 自走棋专用UI界面
- ✅ 智能棋子池和商店机制
- ✅ 游戏模式管理器扩展

### v1.1.0 (2025-07-15) - 练功房模式系统
- ✅ 新增游戏模式管理系统
- ✅ 实现完整练功房模式功能
- ✅ 集成错误追踪和性能监控
- ✅ 添加训练面板UI界面
- ✅ 扩展调试命令系统

### v1.0.0 (2025-07-01) - 基础架构
- ✅ 基于X-Template的项目架构
- ✅ TypeScript全栈开发环境
- ✅ React UI系统
- ✅ XNetTable网络通信
- ✅ 模块化游戏逻辑

---

*最后更新: 2025-07-16*
*文档版本: 1.2.0*
