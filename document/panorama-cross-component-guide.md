# Panorama UI 跨组件通信指南

## 问题

不同的 `CustomUIElement` 有独立的 JavaScript 上下文，`globalThis` 无法跨组件共享。

```xml
<!-- custom_ui_manifest.xml -->
<CustomUIElement type="Hud" layoutfile=".../stageselect/layout.xml" />
<CustomUIElement type="Hud" layoutfile=".../playing-hud/layout.xml" />
```

❌ **错误做法**：直接调用 `globalThis`
```typescript
// playing-hud 中无法访问 stageselect 的 globalThis
(globalThis as any).StageSelect.show();  // undefined!
```

## 解决方案：GameEvents 通信

通过服务端转发事件，实现跨组件通信。

### 流程图

```
[playing-hud] → SendToServer → [服务端] → BroadcastToClients → [stageselect]
```

### 1. 客户端发送事件

```typescript
// playing-hud/index.tsx
GameEvents.SendCustomGameEventToServer('open_level_selection', {});
```

### 2. 服务端转发

```typescript
// CustomUIHandler.ts
CustomGameEventManager.RegisterListener('open_level_selection', (_, data) => {
    CustomGameEventManager.Send_ServerToAllClients('open_level_selection', {});
});
```

### 3. 目标组件监听

```typescript
// stageselect/index.tsx
GameEvents.Subscribe('open_level_selection', () => {
    showStageSelect();
});
```

## 事件声明

在 `shared/gameevents.d.ts` 中声明事件类型：

```typescript
interface CustomGameEventDeclarations {
    open_level_selection: {};
    // 其他事件...
}
```

## 注意事项

1. **不要用 `RegisterEventHandler`** - 它只支持内置事件类型
2. **必须经过服务端** - 客户端之间无法直接通信
3. **事件名称保持一致** - 发送和监听使用相同的事件名

