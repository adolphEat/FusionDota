# 🎨 FusionDota 自定义UI集成指南

## 📋 概述

本指南详细说明了如何在 FusionDota 中使用和管理新集成的自定义UI系统。

## 🎯 已集成的UI组件

### **1. UI管理器 (UIManager)**
- **文件位置**: `content/panorama/src/ui-manager/index.tsx`
- **功能**: 统一管理所有自定义UI组件
- **特性**: 
  - 自动根据游戏模式显示/隐藏UI
  - 键盘快捷键支持
  - 调试面板（开发模式下）

### **2. 简单按钮UI (SimpleButtonPanel)**
- **文件位置**: `content/panorama/src/simple-button/index.tsx`
- **功能**: 展示基础UI交互和事件通信
- **特性**:
  - 计数器功能
  - 服务端事件通信
  - 基础样式示例

### **3. 自定义面板UI (CustomPanel)**
- **文件位置**: `content/panorama/src/my-custom-panel/index.tsx`
- **功能**: 复杂的UI组件示例
- **特性**:
  - 多模块界面设计
  - 网络表数据监听
  - 复杂交互逻辑

## 🚀 使用方法

### **游戏内调试命令**

在游戏聊天界面输入以下命令：

```bash
# UI控制命令
-show_simple_ui      # 显示简单按钮UI
-show_custom_ui      # 显示自定义面板UI  
-hide_all_ui         # 隐藏所有自定义UI
-ui_test            # 测试UI系统状态

# 游戏模式命令
-mode               # 查看当前游戏模式
-mode training      # 切换到训练模式
-mode autochess     # 切换到自走棋模式
```

### **键盘快捷键**

```
F8              # 切换简单按钮UI显示/隐藏
F9              # 切换自定义面板UI显示/隐藏
Ctrl + H        # 隐藏所有自定义UI
```

### **自动模式集成**

UI系统会根据游戏模式自动显示对应的界面：

- **正常模式**: 不显示特殊UI
- **训练模式**: 自动显示训练相关UI
- **自走棋模式**: 自动显示自走棋相关UI

## 🔧 开发者功能

### **调试面板**

在开发模式下（`IsInToolsMode()` 返回 true），右上角会显示UI调试面板：

- 显示当前游戏模式
- 显示键盘快捷键提示
- 提供UI组件开关按钮
- 实时状态监控

### **事件系统**

#### **客户端 → 服务端事件**
```typescript
// 发送按钮点击事件
GameEvents.SendCustomGameEventToServer('button_clicked', {
    count: clickCount + 1,
    PlayerID: Players.GetLocalPlayer()
});

// 发送金币奖励请求
GameEvents.SendCustomGameEventToServer('request_gold_bonus', {
    playerId: Players.GetLocalPlayer(),
    amount: 100
});
```

#### **服务端 → 客户端事件**
```lua
-- 显示UI面板
CustomGameEventManager.Send_ServerToAllClients('show_custom_panel', {
    panelType: 'custom'
})

-- 隐藏所有UI
CustomGameEventManager.Send_ServerToAllClients('hide_all_panels', {})
```

### **网络表集成**

UI组件自动监听以下网络表变化：

```typescript
// 游戏模式变化
CustomNetTables.SubscribeNetTableListener('game_mode', (tableName, key, data) => {
    if (key === 'current') {
        // 处理游戏模式变化
    }
});

// 调试信息变化
CustomNetTables.SubscribeNetTableListener('debug_info', (tableName, key, data) => {
    if (key === 'system_status') {
        // 更新调试状态
    }
});
```

## 📁 文件结构

```
content/panorama/src/
├── 🎮 hud/
│   ├── index.tsx                 # 主HUD组件（集成UI管理器）
│   └── layout.xml               # HUD布局文件
├── 🔧 ui-manager/
│   └── index.tsx                 # UI管理器（核心）
├── 🔘 simple-button/
│   ├── index.tsx                 # 简单按钮组件
│   └── layout.xml               # 布局文件
├── 📋 my-custom-panel/
│   ├── index.tsx                 # 自定义面板组件
│   └── layout.xml               # 布局文件
└── 📝 types/
    └── panorama.d.ts            # Panorama类型定义

game/scripts/src/modules/
├── CustomUIHandler.ts           # 服务端UI事件处理器
├── index.ts                     # 模块集成（已更新）
└── Debug.ts                     # 调试命令（已扩展）
```

## 🎯 集成流程

### **启动时自动集成**

1. **模块初始化** (`modules/index.ts`)
   - 创建 `CustomUIHandler` 实例
   - 2秒后集成到游戏模式系统

2. **UI系统启动** (`ui-manager/index.tsx`)
   - 监听所有UI相关事件
   - 加载初始游戏状态
   - 设置键盘快捷键

3. **HUD集成** (`hud/index.tsx`)
   - 加载UI管理器
   - 提供主界面容器

### **运行时集成**

- **游戏模式变化时**: 自动显示/隐藏对应UI
- **网络表更新时**: 实时同步UI状态
- **事件触发时**: 响应服务端和客户端事件

## 🔍 故障排除

### **UI不显示**

1. 检查游戏模式：`-mode`
2. 测试UI系统：`-ui_test`
3. 手动显示UI：`-show_simple_ui` 或 `-show_custom_ui`
4. 检查控制台是否有错误

### **事件不响应**

1. 确认事件监听器已注册
2. 检查事件参数类型是否正确
3. 验证网络表数据是否存在

### **快捷键不工作**

1. 确保焦点在游戏窗口上
2. 检查调试模式是否开启
3. 尝试使用聊天命令代替

## 📊 性能考虑

- UI管理器使用 React 状态管理，避免不必要的重渲染
- 事件监听器在组件卸载时正确清理
- 网络表监听使用缓存机制，减少网络开销
- 调试面板仅在开发模式下显示

## 🚧 扩展指南

### **添加新UI组件**

1. **创建组件文件**
   ```typescript
   // content/panorama/src/my-new-component/index.tsx
   import React from 'react';
   
   const MyNewComponent: React.FC = () => {
       return <div>My New Component</div>;
   };
   
   export default MyNewComponent;
   ```

2. **更新Webpack配置**
   ```javascript
   // webpack.dev.js
   entry: {
       // ...其他入口
       'my-new-component': './my-new-component/index.tsx',
   }
   ```

3. **集成到UI管理器**
   ```typescript
   // ui-manager/index.tsx
   import MyNewComponent from '../my-new-component/index';
   
   // 在render中添加条件渲染
   {uiState.showMyNewComponent && <MyNewComponent />}
   ```

4. **添加服务端控制**
   ```typescript
   // CustomUIHandler.ts
   case 'my_new_component':
       CustomGameEventManager.Send_ServerToAllClients('show_custom_panel', {
           panelType: 'my_new_component'
       });
       break;
   ```

### **添加新事件**

1. **更新事件定义**
   ```typescript
   // shared/gameevents.d.ts
   interface CustomGameEventDeclarations {
       my_new_event: { param1: string; param2: number };
   }
   ```

2. **客户端监听**
   ```typescript
   GameEvents.Subscribe('my_new_event', (data) => {
       // 处理事件
   });
   ```

3. **服务端发送**
   ```lua
   CustomGameEventManager.Send_ServerToAllClients('my_new_event', {
       param1 = "value",
       param2 = 123
   })
   ```

## 📚 相关文档

- **[UI开发完整指南](./ui-development-guide.md)** - 详细的UI开发教程
- **[项目架构文档](./projectDocument.md)** - 整体项目架构
- **[调试工具使用指南](./debug-tools-guide.md)** - 调试功能说明

---

*最后更新: 2025-07-16*  
*文档版本: 1.0.0*
