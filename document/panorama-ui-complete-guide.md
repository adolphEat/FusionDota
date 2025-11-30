# FusionDota Panorama UI 开发完整指南

## 📋 目录

1. [项目架构概述](#项目架构概述)
2. [UI开发流程](#ui开发流程)
3. [图片资源加载（重要！）](#图片资源加载)
4. [Panorama CSS/JS规范](#panorama-cssjs规范)
5. [常见问题与解决方案](#常见问题与解决方案)
6. [最佳实践](#最佳实践)
7. [调试技巧](#调试技巧)

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
│   ├── src/                            # TypeScript/React源码
│   ├── scripts/custom_game/            # 编译后的JS文件
│   ├── layout/custom_game/             # XML布局文件
│   ├── images/custom_game/             # 图片资源（PNG）
│   └── webpack.dev.js                  # Webpack配置
├── game/panorama/                      # 游戏运行时目录
│   ├── scripts/custom_game/            # 编译后的JS（.vjs_c）
│   ├── layout/custom_game/             # 编译后的XML（.vxml_c）
│   └── images/custom_game/             # 编译后的图片（.vtex_c）
└── document/                           # 文档目录
```

---

## 🔨 UI开发流程

### 第一步：创建UI清单文件

**文件**: `content/panorama/layout/custom_game/custom_ui_manifest.xml`

```xml
<root>
    <Panel>
        <!-- 图片预加载（必须首先加载）-->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/your_ui/precache.xml" />
        
        <!-- 主UI元素 -->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/your_ui/layout.xml" />
    </Panel>
</root>
```

⚠️ **注意**: 
- 这是DOTA2加载自定义UI的入口文件
- **precache.xml 必须首先加载**，以触发图片编译

### 第二步：创建图片预加载文件（重要！）

**文件**: `content/panorama/layout/custom_game/your_ui/precache.xml`

```xml
<root>
	<Panel style="visibility:collapse;">
		<Panel id="icons_container" style="visibility:collapse;">
			<!-- ⚠️ 使用 file:// 路径触发PNG自动编译 -->
			<Image src="file://{images}/custom_game/icon/my_icon.png" hittest="false" />
			<Image src="file://{images}/custom_game/icon/another_icon.png" hittest="false" />
			<!-- 添加所有需要预加载的图片 -->
		</Panel>
	</Panel>
</root>
```

**关键点：**
- 使用 `style="visibility:collapse;"` 隐藏预加载面板（无空格！）
- **必须使用 `file://{images}/...` 路径**，这样才会触发PNG自动编译
- **不要使用 `s2r://` 路径**，`s2r://` 只能引用已编译的文件，不会触发编译

### 第三步：创建布局文件

**文件**: `content/panorama/layout/custom_game/your_ui/layout.xml`

```xml
<root>
    <scripts>
        <include src="file://{resources}/scripts/custom_game/your_ui.js" />
    </scripts>
    <styles>
        <include src="file://{resources}/layout/custom_game/your_ui/styles.css" />
    </styles>
    <Panel class="root_panel" hittest="false" />
</root>
```

### 第四步：创建JavaScript/TypeScript脚本

**TypeScript示例** (`content/panorama/src/your_ui/index.tsx`):

```typescript
// 初始化
Game.EmitSound('General.ButtonClick');
$.Msg('🎮 UI is loading!');

function createUI() {
    const root = $.GetContextPanel();
    const container = $.CreatePanel('Panel', root, 'MainContainer');
    
    // 设置样式（Panorama特有）
    container.style.width = '300px';
    container.style.height = '200px';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    container.style.horizontalAlign = 'center';  // 注意：不是 left/right
    container.style.verticalAlign = 'top';
    container.style.marginTop = '50px';
    
    // 创建图片（必须预加载后才能正常显示）
    const icon = $.CreatePanel('Image', container, 'Icon');
    icon.SetImage('file://{images}/custom_game/icon/my_icon.png');
    icon.style.width = '32px';
    icon.style.height = '32px';
    
    return container;
}

// 启动UI
(function() {
    createUI();
})();
```

### 第五步：编译和部署

```bash
# 1. 编译LESS/CSS
npx gulp compile_less

# 2. 编译TypeScript/Webpack
npm run webpack:dev
# 或
node --preserve-symlinks node_modules/webpack/bin/webpack.js --config content/panorama/webpack.dev.js

# 3. 清理缓存（修改后必须执行）
Remove-Item "game/dota_addons/fusion/panorama/**/*.*_c" -Recurse -Force
```

---

## 🖼️ 图片资源加载（重要！）

### 问题根源

**JavaScript中的 `SetImage()` 方法无法自动编译PNG图片！**

```javascript
// ❌ 这样做无法触发PNG自动编译
const icon = $.CreatePanel('Image', parent, 'icon');
icon.SetImage('file://{images}/custom_game/icon/my_icon.png');  // 不会编译PNG
```

### 正确解决方案：使用 precache.xml

#### 1. 创建 precache.xml

```xml
<root>
	<Panel style="visibility:collapse;">
		<Panel id="icons_container" style="visibility:collapse;">
			<!-- ⚠️ 重要：使用 file:// 路径触发PNG自动编译！ -->
			<Image src="file://{images}/custom_game/icon/hazard_armor_png.png" hittest="false" />
			<Image src="file://{images}/custom_game/icon/hazard_attack_png.png" hittest="false" />
			<!-- 添加所有需要预加载的图片 -->
		</Panel>
	</Panel>
</root>
```

#### 2. 在 manifest 中首先加载

```xml
<root>
    <Panel>
        <!-- 首先加载precache.xml -->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/your_ui/precache.xml" />
        
        <!-- 然后加载主UI -->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/your_ui/layout.xml" />
    </Panel>
</root>
```

#### 3. 在JavaScript中使用SetImage()

```javascript
const icon = $.CreatePanel('Image', parent, 'SynergyIcon');
// 现在可以正常加载了（因为precache.xml已经触发了编译）
icon.SetImage('file://{images}/custom_game/icon/hazard_armor_png.png');
icon.style.width = '32px';
icon.style.height = '32px';
```

### 图片路径协议说明

| 协议 | 用途 | 是否触发编译 | 使用场景 |
|------|------|------------|---------|
| `file://{images}/...` | 引用源文件（PNG） | ✅ **会触发自动编译** | XML中的`<Image>`标签 |
| `s2r://panorama/images/...` | 引用已编译文件（VTEX） | ❌ **不会触发编译** | 引用已编译的资源 |

### PNG文件名到VTEX的转换规则

**⚠️ 重要：** DOTA 2编译PNG时，会将文件扩展名 `.png` 替换为 `_png.vtex`

| PNG文件名 | 编译后的VTEX文件名 |
|-----------|----------|
| `icon.png` | `icon_png.vtex_c` |
| `hazard_armor_png.png` | `hazard_armor_png_png.vtex_c` |
| `my_icon.png` | `my_icon_png.vtex_c` |

**转换公式：**
```
原文件名.png → 原文件名_png.vtex_c
```

---

## 📐 Panorama CSS/JS规范

### ⚠️ 不支持的CSS属性

#### 1. 定位属性

```javascript
// ❌ 错误 - 不支持 position 属性
panel.style.position = 'absolute';

// ✅ 正确 - 使用对齐属性
panel.style.horizontalAlign = 'center';  // 'left', 'center', 'right'
panel.style.verticalAlign = 'top';       // 'top', 'center', 'bottom'
```

#### 2. 位置属性

```javascript
// ❌ 错误 - 不支持 top, bottom, left, right
panel.style.top = '20px';

// ✅ 正确 - 使用 margin
panel.style.marginTop = '20px';
panel.style.marginLeft = '20px';
```

#### 3. 可见性属性

```javascript
// ❌ 错误 - 不支持 visible
panel.style.visible = 'false';

// ✅ 正确 - 使用 visibility
panel.style.visibility = 'collapse';  // 隐藏
panel.style.visibility = 'visible';   // 显示
```

### ✅ 支持的CSS属性

#### 布局相关

```javascript
// 尺寸
panel.style.width = '300px';
panel.style.width = '100%';
panel.style.width = 'fill-parent-flow(1)';  // 填充剩余空间
panel.style.height = '200px';

// 对齐
panel.style.horizontalAlign = 'center';
panel.style.verticalAlign = 'middle';

// 边距
panel.style.margin = '10px';
panel.style.marginTop = '10px';
panel.style.padding = '10px';

// 流式布局
panel.style.flowChildren = 'right';   // 'right', 'down', 'left', 'up'
```

#### 外观相关

```javascript
// 背景
panel.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
panel.style.backgroundColor = '#ff0000';
panel.style.backgroundImage = 'url("file://{images}/custom_game/bg.png")';
panel.style.backgroundSize = 'cover';
panel.style.backgroundPosition = 'center';

// 边框
panel.style.border = '2px solid rgba(255, 255, 255, 0.5)';
panel.style.borderRadius = '10px';

// 文本
panel.style.fontSize = '18px';
panel.style.fontWeight = 'bold';
panel.style.color = '#ffffff';
panel.style.textAlign = 'center';
panel.style.textShadow = '2px 2px 4px #000000';

// 阴影
panel.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
```

### 布局模式

#### 水平布局（flowChildren: 'right'）

```javascript
const container = $.CreatePanel('Panel', parent, 'Container');
container.style.flowChildren = 'right';  // 子元素从左到右排列
container.style.width = '100%';
container.style.height = '50px';
```

#### 垂直布局（flowChildren: 'down'）

```javascript
const container = $.CreatePanel('Panel', parent, 'Container');
container.style.flowChildren = 'down';  // 子元素从上到下排列
```

---

## ⚠️ 常见问题与解决方案

### 问题 1: 图标不显示

**症状：** `Failed loading resource "panorama/images/.../my_icon.vtex_c" (ERROR_FILEOPEN: File not found)`

**原因：** 
1. 没有使用 precache.xml 预加载图片
2. precache.xml中使用了 `s2r://` 协议（不会触发编译）

**解决方案：**
1. 创建 precache.xml 文件
2. 使用 `file://{images}/...` 路径
3. 在 manifest 中首先加载 precache.xml

```xml
<!-- precache.xml -->
<root>
	<Panel style="visibility:collapse;">
		<Image src="file://{images}/custom_game/icon/my_icon.png" hittest="false" />
	</Panel>
</root>
```

### 问题 2: XML编译失败

**症状：** `Failed on-demand recompile for asset panorama/layout/.../layout.vxml`

**原因：**
1. XML语法错误
2. 使用了不支持的内联样式格式

**解决方案：**

```xml
<!-- ❌ 错误 - 样式属性中有空格 -->
<Panel style="visibility: collapse;">

<!-- ✅ 正确 - 无空格 -->
<Panel style="visibility:collapse;">
```

### 问题 3: 样式不生效

**原因：** Panorama使用特殊的CSS属性名

**解决方案：**

```javascript
// ❌ 错误 - 使用标准CSS属性
panel.style.display = 'none';
panel.style.position = 'absolute';

// ✅ 正确 - 使用Panorama属性
panel.style.visibility = 'collapse';
panel.style.horizontalAlign = 'center';
```

### 问题 4: 缓存问题

**症状：** 修改代码后，游戏中UI没有更新

**解决方案：** 删除所有编译缓存

```powershell
# 删除所有缓存文件
Remove-Item "D:\...\game\dota_addons\fusion\panorama\**\*.*_c" -Recurse -Force

# 或分别删除
Remove-Item "game/panorama/layout/**/*.vxml_c" -Force
Remove-Item "game/panorama/layout/**/*.vcss_c" -Force
Remove-Item "game/panorama/scripts/**/*.vjs_c" -Force
Remove-Item "game/panorama/images/**/*.vtex_c" -Force
```

### 问题 5: 中文注释导致编译失败

**解决方案：** 在XML中使用英文注释

```xml
<!-- ✅ Use English comments -->
<!-- ❌ 避免使用中文注释 -->
```

---

## 💡 最佳实践

### 1. 图片资源管理

```
✅ 推荐的文件命名：
- 使用小写字母和下划线
- 避免特殊字符
- 示例：icon_warrior.png, bg_main_menu.png

✅ 目录结构：
images/custom_game/
├── icon/          # 图标
├── bg/            # 背景
├── ui/            # UI元素
└── hero/          # 英雄相关
```

### 2. precache.xml 文件管理

**每个UI模块创建独立的precache.xml：**

```
layout/custom_game/
├── playing-hud/
│   ├── precache.xml      # playing-hud的图片预加载
│   └── layout.xml
├── battle-end/
│   ├── precache.xml      # battle-end的图片预加载
│   └── layout.xml
```

**在manifest中按顺序加载：**

```xml
<root>
    <Panel>
        <!-- 所有precache首先加载 -->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/playing-hud/precache.xml" />
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/battle-end/precache.xml" />
        
        <!-- 然后加载UI -->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/playing-hud/layout.xml" />
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/battle-end/layout.xml" />
    </Panel>
</root>
```

### 3. 代码组织

```typescript
// ✅ 好的代码结构
class SynergyPanel {
    private container: Panel;
    private icons: Map<string, Panel> = new Map();
    
    constructor(parent: Panel) {
        this.container = $.CreatePanel('Panel', parent, 'SynergyPanel');
        this.setupStyles();
        this.createIcons();
    }
    
    private setupStyles(): void {
        this.container.style.width = '300px';
        this.container.style.height = '200px';
        // ... 其他样式
    }
    
    private createIcons(): void {
        // 创建图标逻辑
    }
    
    public updateData(data: SynergyData): void {
        // 更新逻辑
    }
}

// 使用
const panel = new SynergyPanel(rootPanel);
```

### 4. 性能优化

```javascript
// ✅ 批量创建UI元素
function createMultipleIcons(icons: string[]) {
    const fragment = [];
    
    icons.forEach(iconPath => {
        const icon = $.CreatePanel('Image', container, `Icon_${iconPath}`);
        icon.SetImage(iconPath);
        fragment.push(icon);
    });
    
    return fragment;
}

// ❌ 避免频繁的DOM操作
// 不好的做法：每次都查找DOM
function updateIcon(id: string) {
    const icon = container.FindChildInLayoutFile(`Icon_${id}`);  // 每次都查找
    if (icon) icon.visible = true;
}

// ✅ 好的做法：缓存引用
const iconCache = new Map<string, Panel>();
function updateIcon(id: string) {
    const icon = iconCache.get(id);
    if (icon) icon.style.visibility = 'visible';
}
```

---

## 🐛 调试技巧

### 1. 控制台日志

```javascript
// 基础日志
$.Msg('Debug message');
$.Msg('🎮 UI Loaded:', panelId);

// 格式化输出
$.Msg(`Current synergy count: ${count}`);
$.Msg(`Icon path: ${iconPath}`);

// 错误日志
$.Warning('This is a warning!');
$.Msg('❌ Error:', errorMessage);
```

### 2. 游戏内调试命令

```
// 控制台命令（按F12打开）
dota_hud_reload                    # 重新加载HUD
dota_game_account_debug            # 显示账号信息
cl_panorama_script_help            # Panorama脚本帮助
```

### 3. 检查编译后的文件

```powershell
# 查看编译后的VTEX文件
Get-ChildItem "game/panorama/images/custom_game/" -Recurse -Filter "*.vtex_c"

# 查看编译后的JS文件
Get-ChildItem "game/panorama/scripts/custom_game/" -Recurse -Filter "*.vjs_c"
```

### 4. 浏览器开发者工具

**按F12打开Panorama调试器：**
- 查看Panel结构
- 检查样式属性
- 查看控制台错误
- 监控性能

### 5. 调试Panel样式

```javascript
// 添加调试背景色
panel.style.backgroundColor = '#ff0000';  // 红色背景便于查看位置

// 输出Panel信息
$.Msg(`Panel ID: ${panel.id}`);
$.Msg(`Panel Width: ${panel.actuallayoutwidth}`);
$.Msg(`Panel Height: ${panel.actuallayoutheight}`);
```

---

## 📚 开发工作流程总结

### 完整开发流程

1. **准备图片资源**
   ```
   - 将PNG图片放在 content/panorama/images/custom_game/
   ```

2. **创建precache.xml**
   ```xml
   <root>
   	<Panel style="visibility:collapse;">
   		<Image src="file://{images}/custom_game/icon/my_icon.png" />
   	</Panel>
   </root>
   ```

3. **创建layout.xml**
   ```xml
   <root>
   	<scripts>
   		<include src="file://{resources}/scripts/custom_game/my_ui.js" />
   	</scripts>
   	<Panel class="root_panel" hittest="false" />
   </root>
   ```

4. **编写TypeScript/JavaScript代码**
   ```typescript
   const icon = $.CreatePanel('Image', parent, 'Icon');
   icon.SetImage('file://{images}/custom_game/icon/my_icon.png');
   ```

5. **编译**
   ```bash
   npx gulp compile_less
   npm run webpack:dev
   ```

6. **清理缓存**
   ```powershell
   Remove-Item "game/**/*.*_c" -Recurse -Force
   ```

7. **测试**
   - 启动DOTA 2
   - 加载自定义游戏
   - 按F12查看控制台

### 故障排查清单

- [ ] PNG文件是否存在于 `content/panorama/images/` 目录？
- [ ] precache.xml是否使用 `file://` 协议？
- [ ] precache.xml是否在manifest中首先加载？
- [ ] XML语法是否正确（`style="visibility:collapse;"` 无空格）？
- [ ] 是否清理了所有缓存文件（`*.vxml_c`, `*.vtex_c`, `*.vjs_c`）？
- [ ] 是否重新编译了UI（Webpack + Gulp）？
- [ ] 游戏是否完全重启？

---

## 🎯 快速参考

### 常用命令

```bash
# 编译LESS
npx gulp compile_less

# 编译Webpack
npm run webpack:dev

# 清理缓存
Remove-Item "game/dota_addons/fusion/panorama/**/*.*_c" -Recurse -Force
```

### 常用路径

```
图片源文件：    content/panorama/images/custom_game/
编译后图片：    game/panorama/images/custom_game/
TypeScript源码：content/panorama/src/
编译后JS：      game/panorama/scripts/custom_game/
XML布局：       content/panorama/layout/custom_game/
```

### 图片路径格式

```javascript
// precache.xml中（触发编译）
<Image src="file://{images}/custom_game/icon/my_icon.png" />

// JavaScript中（使用已编译的）
icon.SetImage('file://{images}/custom_game/icon/my_icon.png');

// CSS中
background-image: url("file://{images}/custom_game/bg.png");
```

---

**最后更新：** 2025-11-16  
**版本：** 1.0 - 完整版（包含图片预加载解决方案）  
**基于：** FusionDota 项目实战经验

