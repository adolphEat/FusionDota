# FusionDota 自定义UI开发完整指南

## 📋 目录

1. [项目架构概述](#项目架构概述)
2. [UI开发流程](#ui开发流程)
3. [关键文件结构](#关键文件结构)
4. [常见问题与解决方案](#常见问题与解决方案)
5. [最佳实践](#最佳实践)
6. [调试技巧](#调试技巧)
7. [扩展开发](#扩展开发)

---

## 🏗️ 项目架构概述

### FusionDota UI 技术栈
- **前端框架**: Panorama UI (DOTA2原生UI系统)
- **脚本语言**: JavaScript (原生) / TypeScript (编译后)
- **构建工具**: Webpack + TypeScript编译器
- **布局文件**: XML (Panorama格式)
- **样式系统**: CSS (Panorama变种)

### 核心目录结构
```
FusionDota/
├── content/panorama/                    # 前端UI源码
│   ├── src/                            # TypeScript/React源码 (编译用)
│   ├── scripts/custom_game/            # 原生JS脚本 (推荐)
│   ├── layout/custom_game/             # XML布局文件
│   └── webpack.dev.js                  # Webpack配置
├── game/scripts/vscripts/panorama/     # 编译后的JS文件
└── document/                           # 文档目录
```

---

## 🔨 UI开发流程

### 第一步：创建UI清单文件

**文件**: `content/panorama/layout/custom_game/custom_ui_manifest.xml`

```xml
<root>
    <Panel>
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/hud/layout.xml" />
        <CustomUIElement type="HudTopBar" layoutfile="file://{resources}/layout/custom_game/hud/layout.xml" />
    </Panel>
</root>
```

⚠️ **注意**: 这是DOTA2加载自定义UI的入口文件，必须存在！

### 第二步：创建布局文件

**文件**: `content/panorama/layout/custom_game/hud/layout.xml`

```xml
<root>
    <scripts>
        <include src="file://{resources}/scripts/custom_game/hud.js" />
    </scripts>
    
    <!-- HUD根容器 -->
    <Panel class="CustomHudRoot" hittest="false">
        <!-- 通过JavaScript动态创建UI元素 -->
    </Panel>
</root>
```

### 第三步：创建JavaScript脚本

**文件**: `content/panorama/scripts/custom_game/hud.js`

```javascript
// HUD脚本模板
$.Msg('=== 自定义HUD加载中 ===');

function createCustomUI() {
    var rootPanel = $.GetContextPanel();
    
    // 创建容器
    var container = $.CreatePanel('Panel', rootPanel, 'CustomContainer');
    
    // 设置Panorama样式
    container.style.width = '300px';
    container.style.height = '150px';
    container.style.backgroundColor = '#ff0000';
    container.style.marginTop = '100px';
    container.style.marginLeft = '100px';
    
    // 创建按钮
    var button = $.CreatePanel('Button', container, 'CustomButton');
    button.text = '自定义按钮';
    button.style.width = '200px';
    button.style.height = '40px';
    
    button.SetPanelEvent('onactivate', function() {
        $.Msg('按钮被点击！');
    });
}

// 延迟执行，确保UI系统准备就绪
$.Schedule(0.2, createCustomUI);
```

### 第四步：测试和调试

1. **启动游戏**:
   ```bash
   npm run launch temp
   ```

2. **查看控制台** (F12):
   - 查找加载消息
   - 检查JavaScript错误

3. **测试UI功能**:
   - 点击按钮验证交互
   - 使用快捷键测试

---

## 📁 关键文件结构

### UI清单系统
| 文件路径 | 作用 | 必需性 |
|---------|------|--------|
| `custom_ui_manifest.xml` | UI注册入口 | ✅ 必需 |
| `hud/layout.xml` | HUD布局定义 | ✅ 必需 |
| `scripts/custom_game/hud.js` | UI逻辑实现 | ✅ 必需 |

### 编译系统
| 文件路径 | 作用 | 说明 |
|---------|------|------|
| `webpack.dev.js` | 前端编译配置 | TypeScript → JavaScript |
| `game/scripts/vscripts/panorama/` | 编译输出目录 | 自动生成 |

---

## ⚠️ 常见问题与解决方案

### 1. React/TypeScript 相关问题

#### 问题: `Cannot find module 'react'`
```
ERROR: TS2307: Cannot find module 'react' or its corresponding type declarations.
```

**解决方案**: 使用原生JavaScript替代React
```javascript
// ❌ 不推荐: TypeScript/React
import React from 'react';

// ✅ 推荐: 原生JavaScript
var container = $.CreatePanel('Panel', rootPanel, 'MyPanel');
```

#### 问题: `DOTATeam_t` 枚举错误
```
ERROR: TS2693: 'DOTATeam_t' only refers to a type, but is being used as a value
```

**解决方案**: 使用数值替代枚举
```javascript
// ❌ 错误
DOTATeam_t.DOTA_TEAM_GOODGUYS

// ✅ 正确
3  // DOTA_TEAM_GOODGUYS 的数值
```

### 2. UI加载问题

#### 问题: UI不显示，控制台无加载消息

**可能原因**:
1. `custom_ui_manifest.xml` 文件缺失
2. 布局文件路径错误
3. 脚本文件路径错误

**排查步骤**:
1. 检查文件是否存在
2. 验证路径拼写
3. 查看游戏控制台错误信息

#### 问题: 脚本路径错误
```
RESOURCE COMPILE ERROR: File does not exist "panorama/scripts/vscripts/panorama/hud.js"
```

**解决方案**: 使用正确的路径格式
```xml
<!-- ✅ 正确路径 -->
<include src="file://{resources}/scripts/custom_game/hud.js" />
```

### 3. CSS样式问题

#### 问题: `Invalid value for property 'position': absolute`

**原因**: Panorama不支持Web CSS的所有属性

**解决方案**: 使用Panorama支持的属性
```javascript
// ❌ 不支持的CSS属性
container.style.position = 'absolute';
container.style.cursor = 'pointer';
container.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';

// ✅ Panorama支持的属性
container.style.horizontalAlign = 'right';
container.style.verticalAlign = 'top';
container.style.marginTop = '100px';
container.style.marginRight = '100px';
```

### 4. 脚本执行问题

#### 问题: 内嵌脚本不支持
```
ERROR: <script /> tags within XML files are no longer supported
```

**解决方案**: 使用外部JS文件
```xml
<!-- ❌ 不支持内嵌脚本 -->
<script>
    $.Msg('Hello World');
</script>

<!-- ✅ 使用外部文件 -->
<scripts>
    <include src="file://{resources}/scripts/custom_game/hud.js" />
</scripts>
```

---

## 🎯 最佳实践

### 1. 项目结构规范

```
content/panorama/
├── scripts/custom_game/          # 推荐: 原生JS脚本
│   ├── hud.js                   # HUD相关
│   ├── game_ui.js              # 游戏UI
│   └── utils.js                # 工具函数
├── layout/custom_game/           # XML布局文件
│   ├── custom_ui_manifest.xml   # UI清单
│   └── hud/layout.xml          # HUD布局
└── src/                         # 可选: TypeScript源码
    └── (编译用，非必需)
```

### 2. 命名规范

```javascript
// 面板命名: 使用描述性ID
$.CreatePanel('Panel', rootPanel, 'GameStatsPanel');
$.CreatePanel('Button', container, 'StartGameButton');

// 样式类名: 使用kebab-case
panel.SetHasClass('game-stats-panel', true);
panel.SetHasClass('primary-button', true);
```

### 3. 事件处理

```javascript
// ✅ 推荐: 统一的事件处理
function setupUIEvents() {
    button.SetPanelEvent('onactivate', handleButtonClick);
    panel.SetPanelEvent('onmouseover', handleMouseOver);
}

function handleButtonClick() {
    $.Msg('Button clicked');
    // 处理点击逻辑
}
```

### 4. 调试日志

```javascript
// ✅ 统一的日志格式
$.Msg('=== UI模块加载 ===');
$.Msg('[UI] 创建按钮: ' + buttonId);
$.Msg('[ERROR] 面板创建失败: ' + panelId);
```

---

## 🔍 调试技巧

### 1. 控制台调试

```javascript
// 全局调试对象
globalThis.UIDebug = {
    test: function() {
        $.Msg('UI系统正常工作');
        return 'Debug: OK';
    },
    recreate: function() {
        createCustomUI();
    },
    info: function() {
        var root = $.GetContextPanel();
        $.Msg('Root Panel: ' + root);
        $.Msg('Panel ID: ' + (root ? root.id : 'None'));
    }
};
```

### 2. 快捷键调试

```javascript
// F9: 重新创建UI
$.RegisterKeyBind($.GetContextPanel(), 'key_f9', function() {
    $.Msg('=== F9: 重新创建UI ===');
    createCustomUI();
});

// F8: 显示调试信息
$.RegisterKeyBind($.GetContextPanel(), 'key_f8', function() {
    $.Msg('=== F8: 调试信息 ===');
    UIDebug.info();
});
```

### 3. 错误排查清单

- [ ] `custom_ui_manifest.xml` 文件存在且格式正确
- [ ] 布局文件路径正确
- [ ] JavaScript文件路径正确
- [ ] 没有使用不支持的CSS属性
- [ ] 没有使用内嵌脚本
- [ ] 控制台无JavaScript错误
- [ ] UI清单正确注册了所需类型

---

## 🚀 扩展开发

### 1. 复杂UI结构

```javascript
// 模块化UI创建
var UIModules = {
    createHeader: function(parent) {
        var header = $.CreatePanel('Panel', parent, 'UIHeader');
        // 头部UI逻辑
        return header;
    },
    
    createSidebar: function(parent) {
        var sidebar = $.CreatePanel('Panel', parent, 'UISidebar');
        // 侧边栏UI逻辑
        return sidebar;
    },
    
    createMainPanel: function(parent) {
        var main = $.CreatePanel('Panel', parent, 'UIMainPanel');
        // 主面板UI逻辑
        return main;
    }
};
```

### 2. 与服务器通信

```javascript
// 发送自定义事件到服务器
GameEvents.SendCustomGameEventToServer('ui_button_clicked', {
    buttonId: 'testButton',
    playerId: Players.GetLocalPlayer()
});

// 监听服务器事件
GameEvents.Subscribe('server_data_update', function(data) {
    updateUIWithServerData(data);
});
```

### 3. 数据绑定

```javascript
// 简单的数据绑定系统
var UIData = {
    playerGold: 0,
    gameTime: 0,
    
    update: function(key, value) {
        this[key] = value;
        this.refreshUI(key);
    },
    
    refreshUI: function(key) {
        if (key === 'playerGold') {
            $('#GoldLabel').text = 'Gold: ' + this.playerGold;
        }
    }
};
```

---

## 📝 开发检查清单

### 新UI组件开发流程:
- [ ] 1. 确定UI类型和位置
- [ ] 2. 创建/更新 `custom_ui_manifest.xml`
- [ ] 3. 创建布局XML文件
- [ ] 4. 创建JavaScript脚本文件
- [ ] 5. 实现UI创建逻辑
- [ ] 6. 添加事件处理
- [ ] 7. 测试UI显示和交互
- [ ] 8. 添加调试功能
- [ ] 9. 优化样式和布局
- [ ] 10. 文档更新

### 部署前检查:
- [ ] 所有路径正确
- [ ] 无JavaScript错误
- [ ] UI正常显示
- [ ] 交互功能正常
- [ ] 调试代码已清理
- [ ] 性能测试通过

---

## 🔗 相关资源

- [DOTA2 Panorama API文档](https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Panorama)
- [FusionDota项目文档](./projectDocument.md)
- [版本更新日志](./versionsLog.md)

---

**最后更新**: 2025年1月
**作者**: FusionDota开发团队
**版本**: v1.0.0
