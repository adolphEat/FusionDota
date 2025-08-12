# FusionDota 错误追踪和调试系统使用指南

## 🎯 系统概述

FusionDota的错误追踪和调试系统提供了完整的前后端错误收集、性能监控和调试功能，帮助开发者快速定位和修复问题。

### 核心功能
- **错误追踪**: 自动收集、去重、上报运行时错误
- **性能监控**: 监控关键操作的执行时间
- **调试工具**: 丰富的游戏内调试命令
- **前端错误处理**: React组件错误边界和全局错误捕获

## 🚀 快速开始

### 系统初始化

系统会在游戏启动时自动初始化，无需手动配置。

```typescript
// 系统会自动执行以下初始化
GameRules.ErrorTracker = ErrorTracker.getInstance();
GameRules.PerformanceMonitor = PerformanceMonitor.getInstance();
```

### 基本使用

#### 1. 错误追踪

```typescript
// 自动错误追踪 - 系统会自动捕获未处理的错误
try {
    // 您的代码
    riskyOperation();
} catch (error) {
    // 手动报告错误
    GameRules.ErrorTracker.trackError(error, {
        module: 'YourModule',
        function: 'yourFunction',
        customData: { additionalInfo: 'some context' }
    });
}

// 报告自定义错误
GameRules.ErrorTracker.reportCustomError('Something went wrong', {
    module: 'GameLogic',
    function: 'processPlayerAction'
});
```

#### 2. 性能监控

```typescript
// 方法1: 使用计时器
const timerId = GameRules.PerformanceMonitor.startTimer('my_operation');
performComplexOperation();
const duration = GameRules.PerformanceMonitor.endTimer(timerId);

// 方法2: 使用便捷函数
import { withTiming } from '../utils/performance-monitor';

const result = withTiming('my_operation', () => {
    return performComplexOperation();
}, 100); // 100ms阈值

// 方法3: 包装函数
import { measurePerformance } from '../utils/performance-monitor';

const optimizedFunction = measurePerformance(
    originalFunction, 
    'function_name', 
    50 // 50ms阈值
);
```

## 🎮 游戏内调试命令

在游戏聊天中输入以下命令（需要工具模式或白名单）：

### 基础系统命令

```
-help                    # 显示所有可用命令
-system_info            # 显示系统信息
-debug                  # 切换调试模式（需要权限）
```

### 错误追踪相关

```
-error_stats            # 显示错误统计信息
-clear_errors           # 清除错误缓存
-test_error [message]   # 测试错误追踪功能
-trigger_crash          # 触发测试崩溃（仅工具模式）
```

### 性能监控相关

```
-perf_stats [operation]     # 显示性能统计
-perf_clear                 # 清除性能指标缓存
-perf_test [duration_ms]    # 执行性能测试
-set_threshold <op> <ms>    # 设置性能阈值
```

### 示例输出

```
# 错误统计
-error_stats
> Error Stats: Total=5, Recent=2, Cache=3, Queue=1

# 性能统计
-perf_stats
> Performance Summary: {"totalOperations":150,"uniqueOperations":8,"topSlowOperations":[...]}

# 系统信息
-system_info
> System Info: {"gameTime":120.5,"isToolsMode":true,"errorTracking":"enabled"}
```

## 🌐 前端错误处理

### React组件错误边界

```tsx
import { ErrorBoundary, withErrorBoundary } from '../utils/error-handler';

// 方法1: 使用ErrorBoundary组件
const MyComponent = () => (
    <ErrorBoundary componentName="MyComponent">
        <YourComponent />
    </ErrorBoundary>
);

// 方法2: 使用HOC
const SafeComponent = withErrorBoundary(YourComponent, 'YourComponent');
```

### 手动错误报告

```typescript
import { reportError, reportCustomError } from '../utils/error-handler';

// 报告捕获的错误
try {
    riskyFrontendOperation();
} catch (error) {
    reportError(error, {
        component: 'UIComponent',
        action: 'user_interaction'
    });
}

// 报告自定义错误
reportCustomError('UI state inconsistency detected', {
    component: 'GameHUD',
    action: 'state_update'
});
```

### 全局错误处理初始化

在主UI文件中初始化前端错误处理：

```typescript
import { initializeFrontendErrorHandling } from '../utils/error-handler';

// 在应用启动时调用
initializeFrontendErrorHandling();
```

## 📊 网络表数据

系统会将统计信息同步到网络表，可在客户端访问：

```typescript
// 获取错误报告统计
CustomNetTables.GetTableValue('error_reports', 'stats');

// 获取性能指标
CustomNetTables.GetTableValue('debug_info', 'performance_metrics');

// 获取系统状态
CustomNetTables.GetTableValue('debug_info', 'system_status');
```

## ⚙️ 配置和定制

### 性能阈值设置

```typescript
// 在模块初始化时设置阈值
GameRules.PerformanceMonitor.setThreshold('critical_operation', 500); // 500ms
GameRules.PerformanceMonitor.setThreshold('ui_update', 16); // 16ms (60fps)
GameRules.PerformanceMonitor.setThreshold('network_request', 1000); // 1秒
```

### 错误过滤和分类

```typescript
// 自定义错误上下文
GameRules.ErrorTracker.trackError(error, {
    module: 'GameLogic',
    function: 'processAction',
    gamePhase: 'battle',
    playerId: playerId,
    customData: {
        actionType: 'move',
        entityId: entity.GetEntityIndex(),
        position: entity.GetAbsOrigin()
    }
});
```

## 🔍 故障排除

### 常见问题

#### 1. 错误追踪不工作
- 检查`GameRules.ErrorTracker`是否已初始化
- 确保在`ActivateModules()`中正确初始化了错误追踪

#### 2. 性能监控数据异常
- 验证游戏时间获取是否正常
- 检查计时器ID是否正确传递给`endTimer()`

#### 3. 前端错误未上报
- 确保调用了`initializeFrontendErrorHandling()`
- 检查`GameEvents`通信是否正常

### 调试技巧

```typescript
// 启用详细日志（仅工具模式）
if (IsInToolsMode()) {
    // 错误追踪系统会自动输出详细日志
    console.log('Debug mode enabled - verbose logging active');
}

// 检查系统状态
const errorStats = GameRules.ErrorTracker.getErrorStats();
const perfSummary = GameRules.PerformanceMonitor.getSummary();
print(`System Health: Errors=${errorStats.totalErrors}, Performance=${perfSummary.uniqueOperations} ops tracked`);
```

## 📈 最佳实践

### 1. 错误处理
- 在关键路径上添加错误追踪
- 为错误提供丰富的上下文信息
- 定期检查错误统计，及时修复问题

### 2. 性能监控
- 为性能敏感的操作设置合理阈值
- 定期review性能统计，优化慢操作
- 避免在性能监控代码中引入额外开销

### 3. 调试
- 在开发环境充分利用调试命令
- 使用`-system_info`检查系统状态
- 定期清理错误和性能缓存

### 4. 前端开发
- 为所有主要React组件添加错误边界
- 在异步操作中妥善处理错误
- 利用HOC简化错误边界的应用

## 🎯 性能影响

系统经过优化，对游戏性能影响极小：

- **错误追踪**: 去重缓存，批量上报，避免重复处理
- **性能监控**: 轻量级计时，最小化开销
- **网络同步**: 定期批量更新，避免频繁通信

### 内存管理
- 错误缓存限制：500条记录，30分钟TTL
- 性能指标：1000条历史记录，滚动清理
- 前端错误：单会话最多50条，防止内存泄漏

---

## 📞 支持

如有问题或建议，请：
1. 检查本文档的故障排除部分
2. 使用游戏内调试命令进行诊断
3. 查看控制台日志获取详细信息

*最后更新: 2025-01-15*  
*版本: 1.0*