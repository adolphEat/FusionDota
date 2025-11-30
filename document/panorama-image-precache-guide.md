# Panorama 图片预加载完整指南

## 📋 概述

本文档基于对成功DOTA2自定义游戏项目的研究，详细说明了Panorama UI中如何正确加载和显示PNG图片资源。

## 🔍 **关键发现**

### 1. 图片资源路径的两种方式

#### 开发阶段 (`file://`)
```xml
<!-- 在XML/CSS中使用，系统会自动编译PNG → VTEX -->
<Image src="file://{images}/custom_game/icon/your_image.png" />
```

#### 运行阶段 (`s2r://`)
```xml
<!-- 在precache.xml中使用，引用编译后的vtex -->
<Image src="s2r://panorama/images/custom_game/icon/your_image_png.vtex" />
```

### 2. SetImage() 方法的限制

**重要:** JavaScript中的 `SetImage()` 方法**无法自动编译PNG图片**！

```javascript
// ❌ 这样做无法触发PNG自动编译
const icon = $.CreatePanel('Image', parent, 'icon');
icon.SetImage('file://{images}/custom_game/icon/my_icon.png');  // 不会编译PNG
```

## ✅ **正确的解决方案：使用 precache.xml**

### 步骤1：创建独立的 precache.xml 文件

在您的UI目录中创建 `precache.xml`：

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

**关键点：**
- 使用 `style="visibility:collapse;"` 隐藏预加载面板
- **必须使用 `file://{images}/...` 路径**，这样才会触发PNG自动编译
- **不要使用 `s2r://` 路径**，`s2r://` 只能引用已编译的文件，不会触发编译
- 路径格式：`file://{images}/custom_game/icon/文件名.png`

### 步骤2：在 custom_ui_manifest.xml 中首先加载 precache

```xml
<root>
    <Panel>
        <!-- 首先加载precache，确保图片被编译 -->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/your_ui/precache.xml" />
        
        <!-- 然后加载主UI -->
        <CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/your_ui/layout.xml" />
    </Panel>
</root>
```

### 步骤3：在 JavaScript 中使用 SetImage()

现在PNG图片已经被预加载和编译，可以正常使用 `SetImage()`：

```javascript
const icon = $.CreatePanel('Image', parent, 'icon');
// 现在可以正常加载了（因为precache.xml已经触发了编译）
icon.SetImage('file://{images}/custom_game/icon/hazard_armor_png.png');
```

## 📝 **完整工作流程**

### 1. 准备图片文件
将PNG图片放在：
```
content/panorama/images/custom_game/icon/
├── hazard_armor_png.png
├── hazard_attack_png.png
└── ... 其他PNG文件
```

### 2. 创建 precache.xml
```xml
<root>
	<Panel style="visibility:collapse;">
		<Panel id="icons_container" style="visibility:collapse;">
			<Image src="s2r://panorama/images/custom_game/icon/hazard_armor_png.vtex" hittest="false" />
			<Image src="s2r://panorama/images/custom_game/icon/hazard_attack_png.vtex" hittest="false" />
		</Panel>
	</Panel>
</root>
```

### 3. 更新 manifest
```xml
<CustomUIElement type="Hud" layoutfile="file://{resources}/layout/custom_game/your_ui/precache.xml" />
```

### 4. 编译和部署
```bash
# 编译UI
npm run webpack:dev

# 编译LESS
npx gulp compile_less

# 清理缓存
Remove-Item "game/dota_addons/your_addon/panorama/**/*.*_c"
```

### 5. 在代码中使用
```typescript
// TypeScript/JavaScript
const icon = $.CreatePanel('Image', parent, 'SynergyIcon');
icon.SetImage('file://{images}/custom_game/icon/hazard_armor_png.png');
icon.style.width = '32px';
icon.style.height = '32px';
```

## ⚠️ **常见错误和解决方案**

### 错误 1: 图标不显示
**原因：** 没有使用 precache.xml 预加载图片

**解决：** 创建 precache.xml 并在 manifest 中首先加载它

### 错误 2: XML编译失败
**原因：** XML语法错误（如使用不支持的内联样式）

**错误示例：**
```xml
<!-- ❌ 错误 - Panorama不支持这种内联样式 -->
<Panel style="visibility: collapse;">
```

**正确示例：**
```xml
<!-- ✅ 正确 - 无空格 -->
<Panel style="visibility:collapse;">
```

### 错误 3: 路径格式不正确
**⚠️ PNG文件名到VTEX路径的转换规则（重要！）：**

DOTA 2编译PNG时，会将文件扩展名 `.png` 替换为 `_png.vtex`：

| PNG文件名 | 编译后的VTEX路径 |
|-----------|----------|
| `icon.png` | `s2r://panorama/images/custom_game/icon_png.vtex` |
| `hazard_armor_png.png` | `s2r://panorama/images/custom_game/hazard_armor_png_png.vtex` |
| `my_icon.png` | `s2r://panorama/images/custom_game/my_icon_png.vtex` |

**转换公式：**
```
原文件名.png → 原文件名_png.vtex
```

**示例：**
- 如果你的PNG文件名是 `hazard_armor_png.png`
- 在precache.xml中应该引用：`hazard_armor_png_png.vtex`
- 注意是双重 `_png`！

### 错误 4: 中文注释导致编译失败
**原因：** XML编译器可能不支持中文

**解决：** 使用英文注释
```xml
<!-- ✅ Use English comments -->
<!-- ❌ 避免使用中文注释 -->
```

## 🎯 **最佳实践总结**

1. **图片命名：** 使用 `name_png.png` 格式
2. **预加载：** 总是创建 precache.xml 文件
3. **加载顺序：** manifest中首先加载 precache.xml
4. **路径格式：** 
   - precache中：`s2r://panorama/images/.../*.vtex`
   - JavaScript中：`file://{images}/.../*.png`
5. **隐藏预加载：** 使用 `style="visibility:collapse;"`（无空格）
6. **编译后清理：** 删除缓存文件 `*.vxml_c`, `*.vcss_c`, `*.vjs_c`

## 📚 **参考资料**

- Valve Developer Community - Panorama
- Source 2 Viewer Documentation
- 成功案例：Dota2 自定义游戏项目分析

## 🔧 **调试技巧**

### 检查图片是否被编译
```powershell
# 检查game目录中的vtex文件
Get-ChildItem "game/dota_addons/your_addon/panorama/images/" -Recurse -Filter "*.vtex"
```

### 查看控制台日志
```javascript
// 在JavaScript中添加调试日志
$.Msg(`Loading icon: ${iconPath}`);
```

### 游戏内调试
1. 启动游戏，按 F12 打开控制台
2. 查看资源加载错误
3. 使用 `dota_hud_reload` 命令重新加载UI

---

**最后更新：** 2025-11-16  
**基于：** 实际DOTA2自定义游戏项目研究

