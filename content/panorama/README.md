# FusionDota Panorama UI

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式编译
```bash
cd content/panorama
npm run dev
```

### 生产模式编译
```bash
cd content/panorama
npm run build
```

## 编译输出

编译后的 JavaScript 文件会输出到：
```
content/panorama/scripts/custom_game/
├── preparation-screen.js
├── playing-hud.js
├── result-screen.js
├── loading-screen.js
└── end-screen.js
```

## 文件结构

```
content/panorama/
├── src/                    # TypeScript 源代码
│   ├── preparation-screen/ # 游戏准备界面
│   ├── playing-hud/        # 战斗HUD
│   ├── result-screen/      # 结算界面
│   ├── loading-screen/     # 加载界面
│   └── end_screen/         # 结束界面
├── layout/                 # XML 布局文件
│   └── custom_game/
│       ├── custom_ui_manifest.xml
│       ├── preparation-screen/
│       ├── playing-hud/
│       └── result-screen/
├── scripts/                # 编译输出目录
│   └── custom_game/
├── webpack.dev.js          # 开发环境配置
├── webpack.prod.js         # 生产环境配置
└── tsconfig.json          # TypeScript 配置
```

## 注意事项

1. **编译后需要重启游戏**才能看到更新
2. 修改 XML 布局文件不需要重新编译，但需要重新加载地图
3. 所有 UI 界面使用 TypeScript 编写，编译为 JavaScript
4. 使用 `@ts-nocheck` 跳过部分类型检查（Panorama API 不完整）

## 故障排除

### 编译错误
如果遇到 "Module not found" 错误：
1. 确保所有文件路径正确
2. 检查 webpack 配置中的 entry 入口
3. 运行 `npm install` 重新安装依赖

### UI 不显示
1. 检查 `custom_ui_manifest.xml` 是否正确注册
2. 确保 layout.xml 中的脚本路径正确
3. 查看游戏控制台是否有错误信息

## 更多信息

详细使用说明请查看：
- [UI_GUIDE.md](./UI_GUIDE.md) - UI 系统使用指南
- [CHANGELOG.md](./CHANGELOG.md) - 更新日志

