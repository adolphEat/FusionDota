/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "jquery":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/***/ ((module) => {

module.exports = $;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\hud\index.tsx ***!
  \******************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
// FusionDota 现代化HUD界面 - 全新设计
$.Msg('=== FusionDota Modern HUD Loading ===');
// HUD主题配置
const HUD_THEME = {
    primary: '#1e3a8a', // 深蓝色
    secondary: '#3b82f6', // 蓝色
    accent: '#f59e0b', // 金色
    success: '#10b981', // 绿色
    danger: '#ef4444', // 红色
    warning: '#f59e0b', // 橙色
    dark: '#1f2937', // 深灰色
    light: '#f9fafb', // 浅灰色
    background: 'rgba(15, 23, 42, 0.95)', // 半透明深色背景
    border: 'rgba(59, 130, 246, 0.3)', // 半透明蓝色边框
};
// 创建现代化HUD界面
function createModernHUD() {
    $.Msg('Creating modern HUD interface...');
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('ModernHUDContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'ModernHUDContainer');
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.hittest = 'false';
    container.style.zIndex = '1000';
    // 创建顶部状态栏
    createTopStatusBar(container);
    // 创建左侧信息面板
    createLeftInfoPanel(container);
    // 创建右侧控制面板
    createRightControlPanel(container);
    // 创建底部快捷栏
    createBottomQuickBar(container);
    // 创建中央游戏信息
    createCenterGameInfo(container);
    $.Msg('Modern HUD created successfully!');
}
// 创建顶部状态栏
function createTopStatusBar(parent) {
    const topBar = $.CreatePanel('Panel', parent, 'TopStatusBar');
    topBar.style.position = 'absolute';
    topBar.style.top = '20px';
    topBar.style.left = '50%';
    topBar.style.width = '600px';
    topBar.style.height = '60px';
    topBar.style.backgroundColor = HUD_THEME.background;
    topBar.style.border = `2px solid ${HUD_THEME.border}`;
    topBar.style.borderRadius = '15px';
    topBar.style.horizontalAlign = 'center';
    topBar.style.padding = '10px';
    topBar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    // 游戏模式显示
    const modeLabel = $.CreatePanel('Label', topBar, 'GameModeLabel');
    modeLabel.text = '🎮 正常模式';
    modeLabel.style.color = HUD_THEME.accent;
    modeLabel.style.fontSize = '18px';
    modeLabel.style.fontWeight = 'bold';
    modeLabel.style.horizontalAlign = 'left';
    modeLabel.style.width = '150px';
    // 游戏时间
    const timeLabel = $.CreatePanel('Label', topBar, 'GameTimeLabel');
    timeLabel.text = '⏰ 00:00:00';
    timeLabel.style.color = HUD_THEME.light;
    timeLabel.style.fontSize = '16px';
    timeLabel.style.fontWeight = 'bold';
    timeLabel.style.horizontalAlign = 'center';
    timeLabel.style.width = '150px';
    // 玩家状态
    const statusLabel = $.CreatePanel('Label', topBar, 'PlayerStatusLabel');
    statusLabel.text = '❤️ 100%';
    statusLabel.style.color = HUD_THEME.success;
    statusLabel.style.fontSize = '16px';
    statusLabel.style.fontWeight = 'bold';
    statusLabel.style.horizontalAlign = 'right';
    statusLabel.style.width = '150px';
}
// 创建左侧信息面板
function createLeftInfoPanel(parent) {
    const leftPanel = $.CreatePanel('Panel', parent, 'LeftInfoPanel');
    leftPanel.style.position = 'absolute';
    leftPanel.style.top = '100px';
    leftPanel.style.left = '20px';
    leftPanel.style.width = '300px';
    leftPanel.style.height = '400px';
    leftPanel.style.backgroundColor = HUD_THEME.background;
    leftPanel.style.border = `2px solid ${HUD_THEME.border}`;
    leftPanel.style.borderRadius = '15px';
    leftPanel.style.padding = '20px';
    leftPanel.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    // 面板标题
    const title = $.CreatePanel('Label', leftPanel, 'LeftPanelTitle');
    title.text = '📊 游戏信息';
    title.style.color = HUD_THEME.accent;
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    // 统计信息
    const stats = [
        { id: 'level', label: '等级:', value: '1', icon: '⭐' },
        { id: 'exp', label: '经验:', value: '0/100', icon: '💫' },
        { id: 'gold', label: '金币:', value: '500', icon: '💰' },
        { id: 'kills', label: '击杀:', value: '0', icon: '⚔️' },
        { id: 'deaths', label: '死亡:', value: '0', icon: '💀' },
        { id: 'assists', label: '助攻:', value: '0', icon: '🤝' }
    ];
    stats.forEach((stat, index) => {
        const statPanel = $.CreatePanel('Panel', leftPanel, `StatPanel_${stat.id}`);
        statPanel.style.width = '100%';
        statPanel.style.height = '35px';
        statPanel.style.marginBottom = '10px';
        statPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        statPanel.style.borderRadius = '8px';
        statPanel.style.padding = '8px';
        const iconLabel = $.CreatePanel('Label', statPanel, `${stat.id}_Icon`);
        iconLabel.text = stat.icon;
        iconLabel.style.color = HUD_THEME.accent;
        iconLabel.style.fontSize = '16px';
        iconLabel.style.width = '30px';
        const labelLabel = $.CreatePanel('Label', statPanel, `${stat.id}_Label`);
        labelLabel.text = stat.label;
        labelLabel.style.color = HUD_THEME.light;
        labelLabel.style.fontSize = '14px';
        labelLabel.style.width = '80px';
        const valueLabel = $.CreatePanel('Label', statPanel, `${stat.id}_Value`);
        valueLabel.text = stat.value;
        valueLabel.style.color = HUD_THEME.secondary;
        valueLabel.style.fontSize = '14px';
        valueLabel.style.fontWeight = 'bold';
        valueLabel.style.horizontalAlign = 'right';
        valueLabel.style.width = '100px';
    });
}
// 创建右侧控制面板
function createRightControlPanel(parent) {
    const rightPanel = $.CreatePanel('Panel', parent, 'RightControlPanel');
    rightPanel.style.position = 'absolute';
    rightPanel.style.top = '100px';
    rightPanel.style.right = '20px';
    rightPanel.style.width = '280px';
    rightPanel.style.height = '400px';
    rightPanel.style.backgroundColor = HUD_THEME.background;
    rightPanel.style.border = `2px solid ${HUD_THEME.border}`;
    rightPanel.style.borderRadius = '15px';
    rightPanel.style.padding = '20px';
    rightPanel.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    // 面板标题
    const title = $.CreatePanel('Label', rightPanel, 'RightPanelTitle');
    title.text = '🎮 快速控制';
    title.style.color = HUD_THEME.accent;
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    // 模式切换按钮
    const modeButtons = [
        { id: 'normal', name: '正常模式', color: HUD_THEME.success, icon: '🎮' },
        { id: 'training', name: '练功房', color: HUD_THEME.warning, icon: '🏟️' },
        { id: 'autochess', name: '自走棋', color: HUD_THEME.secondary, icon: '♟️' },
        { id: 'custom', name: '自定义', color: HUD_THEME.danger, icon: '⚙️' }
    ];
    modeButtons.forEach((button, index) => {
        const btn = $.CreatePanel('Button', rightPanel, `ModeButton_${button.id}`);
        btn.text = `${button.icon} ${button.name}`;
        btn.style.width = '100%';
        btn.style.height = '45px';
        btn.style.backgroundColor = button.color;
        btn.style.color = 'white';
        btn.style.fontSize = '14px';
        btn.style.fontWeight = 'bold';
        btn.style.border = '1px solid rgba(255,255,255,0.2)';
        btn.style.borderRadius = '8px';
        btn.style.marginBottom = '10px';
        btn.style.textShadow = '1px 1px 2px rgba(0,0,0,0.5)';
        btn.SetPanelEvent('onactivate', () => {
            $.Msg(`切换到模式: ${button.name}`);
            GameEvents.SendCustomGameEventToServer('switch_game_mode', { mode: button.id });
            updateActiveModeButton(button.id);
        });
    });
    // 快捷操作按钮
    const quickActions = [
        { id: 'settings', name: '设置', icon: '⚙️', color: HUD_THEME.dark },
        { id: 'inventory', name: '背包', icon: '🎒', color: HUD_THEME.dark },
        { id: 'skills', name: '技能', icon: '✨', color: HUD_THEME.dark },
        { id: 'help', name: '帮助', icon: '❓', color: HUD_THEME.dark }
    ];
    quickActions.forEach((action, index) => {
        const btn = $.CreatePanel('Button', rightPanel, `QuickAction_${action.id}`);
        btn.text = `${action.icon} ${action.name}`;
        btn.style.width = '48%';
        btn.style.height = '35px';
        btn.style.backgroundColor = action.color;
        btn.style.color = HUD_THEME.light;
        btn.style.fontSize = '12px';
        btn.style.fontWeight = 'bold';
        btn.style.border = '1px solid rgba(255,255,255,0.1)';
        btn.style.borderRadius = '6px';
        btn.style.margin = '2px';
        btn.SetPanelEvent('onactivate', () => {
            $.Msg(`快捷操作: ${action.name}`);
            handleQuickAction(action.id);
        });
    });
}
// 创建底部快捷栏
function createBottomQuickBar(parent) {
    const bottomBar = $.CreatePanel('Panel', parent, 'BottomQuickBar');
    bottomBar.style.position = 'absolute';
    bottomBar.style.bottom = '20px';
    bottomBar.style.left = '50%';
    bottomBar.style.width = '500px';
    bottomBar.style.height = '80px';
    bottomBar.style.backgroundColor = HUD_THEME.background;
    bottomBar.style.border = `2px solid ${HUD_THEME.border}`;
    bottomBar.style.borderRadius = '15px';
    bottomBar.style.horizontalAlign = 'center';
    bottomBar.style.padding = '15px';
    bottomBar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    // 快捷栏标题
    const title = $.CreatePanel('Label', bottomBar, 'QuickBarTitle');
    title.text = '⚡ 快捷操作';
    title.style.color = HUD_THEME.accent;
    title.style.fontSize = '16px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '10px';
    // 快捷按钮
    const quickButtons = [
        { id: 'pause', name: '暂停', icon: '⏸️', color: HUD_THEME.warning },
        { id: 'restart', name: '重启', icon: '🔄', color: HUD_THEME.secondary },
        { id: 'menu', name: '菜单', icon: '📋', color: HUD_THEME.dark },
        { id: 'exit', name: '退出', icon: '🚪', color: HUD_THEME.danger }
    ];
    quickButtons.forEach((button, index) => {
        const btn = $.CreatePanel('Button', bottomBar, `QuickButton_${button.id}`);
        btn.text = `${button.icon}\n${button.name}`;
        btn.style.width = '100px';
        btn.style.height = '50px';
        btn.style.backgroundColor = button.color;
        btn.style.color = 'white';
        btn.style.fontSize = '12px';
        btn.style.fontWeight = 'bold';
        btn.style.border = '1px solid rgba(255,255,255,0.2)';
        btn.style.borderRadius = '8px';
        btn.style.margin = '5px';
        btn.style.textAlign = 'center';
        btn.SetPanelEvent('onactivate', () => {
            $.Msg(`快捷操作: ${button.name}`);
            handleQuickAction(button.id);
        });
    });
}
// 创建中央游戏信息
function createCenterGameInfo(parent) {
    const centerPanel = $.CreatePanel('Panel', parent, 'CenterGameInfo');
    centerPanel.style.position = 'absolute';
    centerPanel.style.top = '50%';
    centerPanel.style.left = '50%';
    centerPanel.style.width = '400px';
    centerPanel.style.height = '200px';
    centerPanel.style.backgroundColor = HUD_THEME.background;
    centerPanel.style.border = `2px solid ${HUD_THEME.border}`;
    centerPanel.style.borderRadius = '15px';
    centerPanel.style.horizontalAlign = 'center';
    centerPanel.style.verticalAlign = 'center';
    centerPanel.style.padding = '20px';
    centerPanel.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    centerPanel.style.visible = 'false'; // 默认隐藏
    // 中央信息标题
    const title = $.CreatePanel('Label', centerPanel, 'CenterInfoTitle');
    title.text = '🎯 游戏状态';
    title.style.color = HUD_THEME.accent;
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    // 状态信息
    const statusInfo = $.CreatePanel('Label', centerPanel, 'StatusInfo');
    statusInfo.text = '游戏正在加载中...';
    statusInfo.style.color = HUD_THEME.light;
    statusInfo.style.fontSize = '16px';
    statusInfo.style.textAlign = 'center';
    statusInfo.style.marginBottom = '20px';
    // 进度条
    const progressContainer = $.CreatePanel('Panel', centerPanel, 'ProgressContainer');
    progressContainer.style.width = '100%';
    progressContainer.style.height = '20px';
    progressContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    progressContainer.style.borderRadius = '10px';
    progressContainer.style.marginBottom = '20px';
    const progressBar = $.CreatePanel('Panel', progressContainer, 'ProgressBar');
    progressBar.style.width = '0%';
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = HUD_THEME.success;
    progressBar.style.borderRadius = '10px';
    progressBar.style.transition = 'width 0.3s ease';
}
// 更新活跃模式按钮
function updateActiveModeButton(activeMode) {
    const modes = ['normal', 'training', 'autochess', 'custom'];
    modes.forEach(mode => {
        const button = $.GetContextPanel().FindChildInLayoutFile(`ModeButton_${mode}`);
        if (button) {
            if (mode === activeMode) {
                button.style.backgroundColor = HUD_THEME.accent;
                button.style.border = '2px solid #ffffff';
            }
            else {
                const colors = {
                    'normal': HUD_THEME.success,
                    'training': HUD_THEME.warning,
                    'autochess': HUD_THEME.secondary,
                    'custom': HUD_THEME.danger
                };
                button.style.backgroundColor = colors[mode];
                button.style.border = '1px solid rgba(255,255,255,0.2)';
            }
        }
    });
}
// 处理快捷操作
function handleQuickAction(actionId) {
    switch (actionId) {
        case 'pause':
            GameEvents.SendCustomGameEventToServer('pause_game', {});
            break;
        case 'restart':
            GameEvents.SendCustomGameEventToServer('restart_game', {});
            break;
        case 'menu':
            showCenterInfo('📋 打开主菜单', '正在加载菜单...');
            break;
        case 'exit':
            showCenterInfo('🚪 退出游戏', '确认退出吗？');
            break;
        case 'settings':
            showCenterInfo('⚙️ 游戏设置', '正在打开设置面板...');
            break;
        case 'inventory':
            showCenterInfo('🎒 背包系统', '正在加载背包...');
            break;
        case 'skills':
            showCenterInfo('✨ 技能面板', '正在加载技能...');
            break;
        case 'help':
            showCenterInfo('❓ 帮助信息', '正在加载帮助文档...');
            break;
    }
}
// 显示中央信息
function showCenterInfo(title, message) {
    const centerPanel = $.GetContextPanel().FindChildInLayoutFile('CenterGameInfo');
    if (centerPanel) {
        const titleLabel = centerPanel.FindChildInLayoutFile('CenterInfoTitle');
        const statusLabel = centerPanel.FindChildInLayoutFile('StatusInfo');
        if (titleLabel)
            titleLabel.text = title;
        if (statusLabel)
            statusLabel.text = message;
        centerPanel.style.visible = 'true';
        // 3秒后隐藏
        $.Schedule(3.0, () => {
            centerPanel.style.visible = 'false';
        });
    }
}
// 更新游戏时间
function updateGameTime() {
    const timeLabel = $.GetContextPanel().FindChildInLayoutFile('GameTimeLabel');
    if (timeLabel) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        timeLabel.text = `⏰ ${timeString}`;
    }
}
// 监听游戏事件
GameEvents.Subscribe('game_mode_changed', (data) => {
    $.Msg('Game mode changed:', data);
    const modeNames = {
        'normal': '🎮 正常模式',
        'training': '🏟️ 练功房模式',
        'autochess': '♟️ 自走棋模式',
        'custom': '⚙️ 自定义模式'
    };
    const modeLabel = $.GetContextPanel().FindChildInLayoutFile('GameModeLabel');
    if (modeLabel) {
        modeLabel.text = modeNames[data.newMode] || `🎯 ${data.newMode}`;
    }
    updateActiveModeButton(data.newMode);
});
GameEvents.Subscribe('player_stats_updated', (data) => {
    $.Msg('Player stats updated:', data);
    // 更新统计信息
    Object.keys(data).forEach(key => {
        var _a;
        const valueLabel = (_a = $.GetContextPanel().FindChildInLayoutFile(`StatPanel_${key}`)) === null || _a === void 0 ? void 0 : _a.FindChildInLayoutFile(`${key}_Value`);
        if (valueLabel) {
            valueLabel.text = data[key].toString();
        }
    });
});
// 初始化函数
function initializeModernHUD() {
    $.Msg('=== Initializing Modern HUD ===');
    // 延迟创建UI
    $.Schedule(0.5, createModernHUD);
    // 设置定时器更新游戏时间
    $.Schedule(1.0, () => {
        updateGameTime();
        $.Schedule(1.0, arguments.callee);
    });
    // 设置快捷键
    $.RegisterKeyBind($.GetContextPanel(), 'key_f9', () => {
        $.Msg('=== F9: Recreating Modern HUD ===');
        createModernHUD();
    });
    $.RegisterKeyBind($.GetContextPanel(), 'key_f8', () => {
        $.Msg('=== F8: Toggle Center Info ===');
        const centerPanel = $.GetContextPanel().FindChildInLayoutFile('CenterGameInfo');
        if (centerPanel) {
            centerPanel.style.visible = centerPanel.style.visible === 'true' ? 'false' : 'true';
        }
    });
    $.RegisterKeyBind($.GetContextPanel(), 'key_f7', () => {
        $.Msg('=== F7: Show Debug Info ===');
        showCenterInfo('🔍 调试信息', 'HUD系统运行正常！');
    });
}
// 导出全局函数
globalThis.ModernHUD = {
    create: createModernHUD,
    showInfo: showCenterInfo,
    updateMode: updateActiveModeButton,
    handleAction: handleQuickAction
};
// 立即执行初始化
initializeModernHUD();
// 导出React组件（保持兼容性）
const ModernHudPanel = () => {
    return null; // 使用原生Panorama
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModernHudPanel);
$.Msg('=== Modern HUD module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxpQkFBaUIsQ0FBQztBQUN2QixRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDdkIsUUFBUSxDQUFDO0FBQ1QsNEJBQTRCLENBQUM7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztBQUN2QixRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpRUFBZSxjQUFjLEVBQUM7QUFDOUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxodWRcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBAdHMtbm9jaGVja1xuLy8gRnVzaW9uRG90YSDnjrDku6PljJZIVUTnlYzpnaIgLSDlhajmlrDorr7orqFcbiQuTXNnKCc9PT0gRnVzaW9uRG90YSBNb2Rlcm4gSFVEIExvYWRpbmcgPT09Jyk7XG4vLyBIVUTkuLvpopjphY3nva5cbmNvbnN0IEhVRF9USEVNRSA9IHtcbiAgICBwcmltYXJ5OiAnIzFlM2E4YScsIC8vIOa3seiTneiJslxuICAgIHNlY29uZGFyeTogJyMzYjgyZjYnLCAvLyDok53oibJcbiAgICBhY2NlbnQ6ICcjZjU5ZTBiJywgLy8g6YeR6ImyXG4gICAgc3VjY2VzczogJyMxMGI5ODEnLCAvLyDnu7/oibJcbiAgICBkYW5nZXI6ICcjZWY0NDQ0JywgLy8g57qi6ImyXG4gICAgd2FybmluZzogJyNmNTllMGInLCAvLyDmqZnoibJcbiAgICBkYXJrOiAnIzFmMjkzNycsIC8vIOa3seeBsOiJslxuICAgIGxpZ2h0OiAnI2Y5ZmFmYicsIC8vIOa1heeBsOiJslxuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDE1LCAyMywgNDIsIDAuOTUpJywgLy8g5Y2K6YCP5piO5rex6Imy6IOM5pmvXG4gICAgYm9yZGVyOiAncmdiYSg1OSwgMTMwLCAyNDYsIDAuMyknLCAvLyDljYrpgI/mmI7ok53oibLovrnmoYZcbn07XG4vLyDliJvlu7rnjrDku6PljJZIVUTnlYzpnaJcbmZ1bmN0aW9uIGNyZWF0ZU1vZGVybkhVRCgpIHtcbiAgICAkLk1zZygnQ3JlYXRpbmcgbW9kZXJuIEhVRCBpbnRlcmZhY2UuLi4nKTtcbiAgICAvLyDojrflj5bmoLnpnaLmnb9cbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdFcnJvcjogUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDliKDpmaTlt7LlrZjlnKjnmoTlrrnlmahcbiAgICBjb25zdCBleGlzdGluZ0NvbnRhaW5lciA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ01vZGVybkhVRENvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICB9XG4gICAgLy8g5Yib5bu65Li75a655ZmoXG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdNb2Rlcm5IVURDb250YWluZXInKTtcbiAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oaXR0ZXN0ID0gJ2ZhbHNlJztcbiAgICBjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzEwMDAnO1xuICAgIC8vIOWIm+W7uumhtumDqOeKtuaAgeagj1xuICAgIGNyZWF0ZVRvcFN0YXR1c0Jhcihjb250YWluZXIpO1xuICAgIC8vIOWIm+W7uuW3puS+p+S/oeaBr+mdouadv1xuICAgIGNyZWF0ZUxlZnRJbmZvUGFuZWwoY29udGFpbmVyKTtcbiAgICAvLyDliJvlu7rlj7PkvqfmjqfliLbpnaLmnb9cbiAgICBjcmVhdGVSaWdodENvbnRyb2xQYW5lbChjb250YWluZXIpO1xuICAgIC8vIOWIm+W7uuW6lemDqOW/q+aNt+agj1xuICAgIGNyZWF0ZUJvdHRvbVF1aWNrQmFyKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65Lit5aSu5ri45oiP5L+h5oGvXG4gICAgY3JlYXRlQ2VudGVyR2FtZUluZm8oY29udGFpbmVyKTtcbiAgICAkLk1zZygnTW9kZXJuIEhVRCBjcmVhdGVkIHN1Y2Nlc3NmdWxseSEnKTtcbn1cbi8vIOWIm+W7uumhtumDqOeKtuaAgeagj1xuZnVuY3Rpb24gY3JlYXRlVG9wU3RhdHVzQmFyKHBhcmVudCkge1xuICAgIGNvbnN0IHRvcEJhciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnVG9wU3RhdHVzQmFyJyk7XG4gICAgdG9wQmFyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICB0b3BCYXIuc3R5bGUudG9wID0gJzIwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5sZWZ0ID0gJzUwJSc7XG4gICAgdG9wQmFyLnN0eWxlLndpZHRoID0gJzYwMHB4JztcbiAgICB0b3BCYXIuc3R5bGUuaGVpZ2h0ID0gJzYwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBIVURfVEhFTUUuYmFja2dyb3VuZDtcbiAgICB0b3BCYXIuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke0hVRF9USEVNRS5ib3JkZXJ9YDtcbiAgICB0b3BCYXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIHRvcEJhci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICB0b3BCYXIuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICB0b3BCYXIuc3R5bGUuYm94U2hhZG93ID0gJzAgNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICAvLyDmuLjmiI/mqKHlvI/mmL7npLpcbiAgICBjb25zdCBtb2RlTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRvcEJhciwgJ0dhbWVNb2RlTGFiZWwnKTtcbiAgICBtb2RlTGFiZWwudGV4dCA9ICfwn46uIOato+W4uOaooeW8jyc7XG4gICAgbW9kZUxhYmVsLnN0eWxlLmNvbG9yID0gSFVEX1RIRU1FLmFjY2VudDtcbiAgICBtb2RlTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgbW9kZUxhYmVsLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgbW9kZUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdsZWZ0JztcbiAgICBtb2RlTGFiZWwuc3R5bGUud2lkdGggPSAnMTUwcHgnO1xuICAgIC8vIOa4uOaIj+aXtumXtFxuICAgIGNvbnN0IHRpbWVMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdG9wQmFyLCAnR2FtZVRpbWVMYWJlbCcpO1xuICAgIHRpbWVMYWJlbC50ZXh0ID0gJ+KPsCAwMDowMDowMCc7XG4gICAgdGltZUxhYmVsLnN0eWxlLmNvbG9yID0gSFVEX1RIRU1FLmxpZ2h0O1xuICAgIHRpbWVMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICB0aW1lTGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aW1lTGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGltZUxhYmVsLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICAvLyDnjqnlrrbnirbmgIFcbiAgICBjb25zdCBzdGF0dXNMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdG9wQmFyLCAnUGxheWVyU3RhdHVzTGFiZWwnKTtcbiAgICBzdGF0dXNMYWJlbC50ZXh0ID0gJ+KdpO+4jyAxMDAlJztcbiAgICBzdGF0dXNMYWJlbC5zdHlsZS5jb2xvciA9IEhVRF9USEVNRS5zdWNjZXNzO1xuICAgIHN0YXR1c0xhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIHN0YXR1c0xhYmVsLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgc3RhdHVzTGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICBzdGF0dXNMYWJlbC5zdHlsZS53aWR0aCA9ICcxNTBweCc7XG59XG4vLyDliJvlu7rlt6bkvqfkv6Hmga/pnaLmnb9cbmZ1bmN0aW9uIGNyZWF0ZUxlZnRJbmZvUGFuZWwocGFyZW50KSB7XG4gICAgY29uc3QgbGVmdFBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdMZWZ0SW5mb1BhbmVsJyk7XG4gICAgbGVmdFBhbmVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBsZWZ0UGFuZWwuc3R5bGUudG9wID0gJzEwMHB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUubGVmdCA9ICcyMHB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUud2lkdGggPSAnMzAwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5oZWlnaHQgPSAnNDAwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBIVURfVEhFTUUuYmFja2dyb3VuZDtcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke0hVRF9USEVNRS5ib3JkZXJ9YDtcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIC8vIOmdouadv+agh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBsZWZ0UGFuZWwsICdMZWZ0UGFuZWxUaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn8J+TiiDmuLjmiI/kv6Hmga8nO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gSFVEX1RIRU1FLmFjY2VudDtcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcyMHB4JztcbiAgICAvLyDnu5/orqHkv6Hmga9cbiAgICBjb25zdCBzdGF0cyA9IFtcbiAgICAgICAgeyBpZDogJ2xldmVsJywgbGFiZWw6ICfnrYnnuqc6JywgdmFsdWU6ICcxJywgaWNvbjogJ+KtkCcgfSxcbiAgICAgICAgeyBpZDogJ2V4cCcsIGxhYmVsOiAn57uP6aqMOicsIHZhbHVlOiAnMC8xMDAnLCBpY29uOiAn8J+SqycgfSxcbiAgICAgICAgeyBpZDogJ2dvbGQnLCBsYWJlbDogJ+mHkeW4gTonLCB2YWx1ZTogJzUwMCcsIGljb246ICfwn5KwJyB9LFxuICAgICAgICB7IGlkOiAna2lsbHMnLCBsYWJlbDogJ+WHu+adgDonLCB2YWx1ZTogJzAnLCBpY29uOiAn4pqU77iPJyB9LFxuICAgICAgICB7IGlkOiAnZGVhdGhzJywgbGFiZWw6ICfmrbvkuqE6JywgdmFsdWU6ICcwJywgaWNvbjogJ/CfkoAnIH0sXG4gICAgICAgIHsgaWQ6ICdhc3Npc3RzJywgbGFiZWw6ICfliqnmlLs6JywgdmFsdWU6ICcwJywgaWNvbjogJ/CfpJ0nIH1cbiAgICBdO1xuICAgIHN0YXRzLmZvckVhY2goKHN0YXQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgbGVmdFBhbmVsLCBgU3RhdFBhbmVsXyR7c3RhdC5pZH1gKTtcbiAgICAgICAgc3RhdFBhbmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBzdGF0UGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzM1cHgnO1xuICAgICAgICBzdGF0UGFuZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgICAgICBzdGF0UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4yKSc7XG4gICAgICAgIHN0YXRQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICAgICAgc3RhdFBhbmVsLnN0eWxlLnBhZGRpbmcgPSAnOHB4JztcbiAgICAgICAgY29uc3QgaWNvbkxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzdGF0UGFuZWwsIGAke3N0YXQuaWR9X0ljb25gKTtcbiAgICAgICAgaWNvbkxhYmVsLnRleHQgPSBzdGF0Lmljb247XG4gICAgICAgIGljb25MYWJlbC5zdHlsZS5jb2xvciA9IEhVRF9USEVNRS5hY2NlbnQ7XG4gICAgICAgIGljb25MYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICAgICAgaWNvbkxhYmVsLnN0eWxlLndpZHRoID0gJzMwcHgnO1xuICAgICAgICBjb25zdCBsYWJlbExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzdGF0UGFuZWwsIGAke3N0YXQuaWR9X0xhYmVsYCk7XG4gICAgICAgIGxhYmVsTGFiZWwudGV4dCA9IHN0YXQubGFiZWw7XG4gICAgICAgIGxhYmVsTGFiZWwuc3R5bGUuY29sb3IgPSBIVURfVEhFTUUubGlnaHQ7XG4gICAgICAgIGxhYmVsTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgICAgIGxhYmVsTGFiZWwuc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgICAgIGNvbnN0IHZhbHVlTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRQYW5lbCwgYCR7c3RhdC5pZH1fVmFsdWVgKTtcbiAgICAgICAgdmFsdWVMYWJlbC50ZXh0ID0gc3RhdC52YWx1ZTtcbiAgICAgICAgdmFsdWVMYWJlbC5zdHlsZS5jb2xvciA9IEhVRF9USEVNRS5zZWNvbmRhcnk7XG4gICAgICAgIHZhbHVlTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgICAgIHZhbHVlTGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgdmFsdWVMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgICAgICB2YWx1ZUxhYmVsLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICB9KTtcbn1cbi8vIOWIm+W7uuWPs+S+p+aOp+WItumdouadv1xuZnVuY3Rpb24gY3JlYXRlUmlnaHRDb250cm9sUGFuZWwocGFyZW50KSB7XG4gICAgY29uc3QgcmlnaHRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnUmlnaHRDb250cm9sUGFuZWwnKTtcbiAgICByaWdodFBhbmVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICByaWdodFBhbmVsLnN0eWxlLnRvcCA9ICcxMDBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5yaWdodCA9ICcyMHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLndpZHRoID0gJzI4MHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLmhlaWdodCA9ICc0MDBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBIVURfVEhFTUUuYmFja2dyb3VuZDtcbiAgICByaWdodFBhbmVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtIVURfVEhFTUUuYm9yZGVyfWA7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJzAgNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICAvLyDpnaLmnb/moIfpophcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgcmlnaHRQYW5lbCwgJ1JpZ2h0UGFuZWxUaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn8J+OriDlv6vpgJ/mjqfliLYnO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gSFVEX1RIRU1FLmFjY2VudDtcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcyMHB4JztcbiAgICAvLyDmqKHlvI/liIfmjaLmjInpkq5cbiAgICBjb25zdCBtb2RlQnV0dG9ucyA9IFtcbiAgICAgICAgeyBpZDogJ25vcm1hbCcsIG5hbWU6ICfmraPluLjmqKHlvI8nLCBjb2xvcjogSFVEX1RIRU1FLnN1Y2Nlc3MsIGljb246ICfwn46uJyB9LFxuICAgICAgICB7IGlkOiAndHJhaW5pbmcnLCBuYW1lOiAn57uD5Yqf5oi/JywgY29sb3I6IEhVRF9USEVNRS53YXJuaW5nLCBpY29uOiAn8J+Pn++4jycgfSxcbiAgICAgICAgeyBpZDogJ2F1dG9jaGVzcycsIG5hbWU6ICfoh6rotbDmo4snLCBjb2xvcjogSFVEX1RIRU1FLnNlY29uZGFyeSwgaWNvbjogJ+KZn++4jycgfSxcbiAgICAgICAgeyBpZDogJ2N1c3RvbScsIG5hbWU6ICfoh6rlrprkuYknLCBjb2xvcjogSFVEX1RIRU1FLmRhbmdlciwgaWNvbjogJ+Kame+4jycgfVxuICAgIF07XG4gICAgbW9kZUJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBidG4gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCByaWdodFBhbmVsLCBgTW9kZUJ1dHRvbl8ke2J1dHRvbi5pZH1gKTtcbiAgICAgICAgYnRuLnRleHQgPSBgJHtidXR0b24uaWNvbn0gJHtidXR0b24ubmFtZX1gO1xuICAgICAgICBidG4uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGJ0bi5zdHlsZS5oZWlnaHQgPSAnNDVweCc7XG4gICAgICAgIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBidXR0b24uY29sb3I7XG4gICAgICAgIGJ0bi5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIGJ0bi5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICAgICAgYnRuLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgICAgIGJ0bi5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKSc7XG4gICAgICAgIGJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICAgICAgYnRuLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICAgICAgYnRuLnN0eWxlLnRleHRTaGFkb3cgPSAnMXB4IDFweCAycHggcmdiYSgwLDAsMCwwLjUpJztcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAkLk1zZyhg5YiH5o2i5Yiw5qih5byPOiAke2J1dHRvbi5uYW1lfWApO1xuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3N3aXRjaF9nYW1lX21vZGUnLCB7IG1vZGU6IGJ1dHRvbi5pZCB9KTtcbiAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZU1vZGVCdXR0b24oYnV0dG9uLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8g5b+r5o235pON5L2c5oyJ6ZKuXG4gICAgY29uc3QgcXVpY2tBY3Rpb25zID0gW1xuICAgICAgICB7IGlkOiAnc2V0dGluZ3MnLCBuYW1lOiAn6K6+572uJywgaWNvbjogJ+Kame+4jycsIGNvbG9yOiBIVURfVEhFTUUuZGFyayB9LFxuICAgICAgICB7IGlkOiAnaW52ZW50b3J5JywgbmFtZTogJ+iDjOWMhScsIGljb246ICfwn46SJywgY29sb3I6IEhVRF9USEVNRS5kYXJrIH0sXG4gICAgICAgIHsgaWQ6ICdza2lsbHMnLCBuYW1lOiAn5oqA6IO9JywgaWNvbjogJ+KcqCcsIGNvbG9yOiBIVURfVEhFTUUuZGFyayB9LFxuICAgICAgICB7IGlkOiAnaGVscCcsIG5hbWU6ICfluK7liqknLCBpY29uOiAn4p2TJywgY29sb3I6IEhVRF9USEVNRS5kYXJrIH1cbiAgICBdO1xuICAgIHF1aWNrQWN0aW9ucy5mb3JFYWNoKChhY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJ0biA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIHJpZ2h0UGFuZWwsIGBRdWlja0FjdGlvbl8ke2FjdGlvbi5pZH1gKTtcbiAgICAgICAgYnRuLnRleHQgPSBgJHthY3Rpb24uaWNvbn0gJHthY3Rpb24ubmFtZX1gO1xuICAgICAgICBidG4uc3R5bGUud2lkdGggPSAnNDglJztcbiAgICAgICAgYnRuLnN0eWxlLmhlaWdodCA9ICczNXB4JztcbiAgICAgICAgYnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGFjdGlvbi5jb2xvcjtcbiAgICAgICAgYnRuLnN0eWxlLmNvbG9yID0gSFVEX1RIRU1FLmxpZ2h0O1xuICAgICAgICBidG4uc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgICAgIGJ0bi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICBidG4uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMSknO1xuICAgICAgICBidG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzZweCc7XG4gICAgICAgIGJ0bi5zdHlsZS5tYXJnaW4gPSAnMnB4JztcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAkLk1zZyhg5b+r5o235pON5L2cOiAke2FjdGlvbi5uYW1lfWApO1xuICAgICAgICAgICAgaGFuZGxlUXVpY2tBY3Rpb24oYWN0aW9uLmlkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4vLyDliJvlu7rlupXpg6jlv6vmjbfmoI9cbmZ1bmN0aW9uIGNyZWF0ZUJvdHRvbVF1aWNrQmFyKHBhcmVudCkge1xuICAgIGNvbnN0IGJvdHRvbUJhciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQm90dG9tUXVpY2tCYXInKTtcbiAgICBib3R0b21CYXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGJvdHRvbUJhci5zdHlsZS5ib3R0b20gPSAnMjBweCc7XG4gICAgYm90dG9tQmFyLnN0eWxlLmxlZnQgPSAnNTAlJztcbiAgICBib3R0b21CYXIuc3R5bGUud2lkdGggPSAnNTAwcHgnO1xuICAgIGJvdHRvbUJhci5zdHlsZS5oZWlnaHQgPSAnODBweCc7XG4gICAgYm90dG9tQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IEhVRF9USEVNRS5iYWNrZ3JvdW5kO1xuICAgIGJvdHRvbUJhci5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7SFVEX1RIRU1FLmJvcmRlcn1gO1xuICAgIGJvdHRvbUJhci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgYm90dG9tQmFyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGJvdHRvbUJhci5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIGJvdHRvbUJhci5zdHlsZS5ib3hTaGFkb3cgPSAnMCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIC8vIOW/q+aNt+agj+agh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBib3R0b21CYXIsICdRdWlja0JhclRpdGxlJyk7XG4gICAgdGl0bGUudGV4dCA9ICfimqEg5b+r5o235pON5L2cJztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IEhVRF9USEVNRS5hY2NlbnQ7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgLy8g5b+r5o235oyJ6ZKuXG4gICAgY29uc3QgcXVpY2tCdXR0b25zID0gW1xuICAgICAgICB7IGlkOiAncGF1c2UnLCBuYW1lOiAn5pqC5YGcJywgaWNvbjogJ+KPuO+4jycsIGNvbG9yOiBIVURfVEhFTUUud2FybmluZyB9LFxuICAgICAgICB7IGlkOiAncmVzdGFydCcsIG5hbWU6ICfph43lkK8nLCBpY29uOiAn8J+UhCcsIGNvbG9yOiBIVURfVEhFTUUuc2Vjb25kYXJ5IH0sXG4gICAgICAgIHsgaWQ6ICdtZW51JywgbmFtZTogJ+iPnOWNlScsIGljb246ICfwn5OLJywgY29sb3I6IEhVRF9USEVNRS5kYXJrIH0sXG4gICAgICAgIHsgaWQ6ICdleGl0JywgbmFtZTogJ+mAgOWHuicsIGljb246ICfwn5qqJywgY29sb3I6IEhVRF9USEVNRS5kYW5nZXIgfVxuICAgIF07XG4gICAgcXVpY2tCdXR0b25zLmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgYnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgYm90dG9tQmFyLCBgUXVpY2tCdXR0b25fJHtidXR0b24uaWR9YCk7XG4gICAgICAgIGJ0bi50ZXh0ID0gYCR7YnV0dG9uLmljb259XFxuJHtidXR0b24ubmFtZX1gO1xuICAgICAgICBidG4uc3R5bGUud2lkdGggPSAnMTAwcHgnO1xuICAgICAgICBidG4uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgICAgICBidG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYnV0dG9uLmNvbG9yO1xuICAgICAgICBidG4uc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICBidG4uc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgICAgIGJ0bi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICBidG4uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMiknO1xuICAgICAgICBidG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgICAgIGJ0bi5zdHlsZS5tYXJnaW4gPSAnNXB4JztcbiAgICAgICAgYnRuLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBidG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGDlv6vmjbfmk43kvZw6ICR7YnV0dG9uLm5hbWV9YCk7XG4gICAgICAgICAgICBoYW5kbGVRdWlja0FjdGlvbihidXR0b24uaWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbi8vIOWIm+W7uuS4reWkrua4uOaIj+S/oeaBr1xuZnVuY3Rpb24gY3JlYXRlQ2VudGVyR2FtZUluZm8ocGFyZW50KSB7XG4gICAgY29uc3QgY2VudGVyUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0NlbnRlckdhbWVJbmZvJyk7XG4gICAgY2VudGVyUGFuZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNlbnRlclBhbmVsLnN0eWxlLnRvcCA9ICc1MCUnO1xuICAgIGNlbnRlclBhbmVsLnN0eWxlLmxlZnQgPSAnNTAlJztcbiAgICBjZW50ZXJQYW5lbC5zdHlsZS53aWR0aCA9ICc0MDBweCc7XG4gICAgY2VudGVyUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzIwMHB4JztcbiAgICBjZW50ZXJQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBIVURfVEhFTUUuYmFja2dyb3VuZDtcbiAgICBjZW50ZXJQYW5lbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7SFVEX1RIRU1FLmJvcmRlcn1gO1xuICAgIGNlbnRlclBhbmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICBjZW50ZXJQYW5lbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjZW50ZXJQYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY2VudGVyUGFuZWwuc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICBjZW50ZXJQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGNlbnRlclBhbmVsLnN0eWxlLnZpc2libGUgPSAnZmFsc2UnOyAvLyDpu5jorqTpmpDol49cbiAgICAvLyDkuK3lpK7kv6Hmga/moIfpophcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY2VudGVyUGFuZWwsICdDZW50ZXJJbmZvVGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ/Cfjq8g5ri45oiP54q25oCBJztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IEhVRF9USEVNRS5hY2NlbnQ7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMjBweCc7XG4gICAgLy8g54q25oCB5L+h5oGvXG4gICAgY29uc3Qgc3RhdHVzSW5mbyA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY2VudGVyUGFuZWwsICdTdGF0dXNJbmZvJyk7XG4gICAgc3RhdHVzSW5mby50ZXh0ID0gJ+a4uOaIj+ato+WcqOWKoOi9veS4rS4uLic7XG4gICAgc3RhdHVzSW5mby5zdHlsZS5jb2xvciA9IEhVRF9USEVNRS5saWdodDtcbiAgICBzdGF0dXNJbmZvLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIHN0YXR1c0luZm8uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgc3RhdHVzSW5mby5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMjBweCc7XG4gICAgLy8g6L+b5bqm5p2hXG4gICAgY29uc3QgcHJvZ3Jlc3NDb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNlbnRlclBhbmVsLCAnUHJvZ3Jlc3NDb250YWluZXInKTtcbiAgICBwcm9ncmVzc0NvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBwcm9ncmVzc0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMjBweCc7XG4gICAgcHJvZ3Jlc3NDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgcHJvZ3Jlc3NDb250YWluZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIHByb2dyZXNzQ29udGFpbmVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcyMHB4JztcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcHJvZ3Jlc3NDb250YWluZXIsICdQcm9ncmVzc0JhcicpO1xuICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gJzAlJztcbiAgICBwcm9ncmVzc0Jhci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgcHJvZ3Jlc3NCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSFVEX1RIRU1FLnN1Y2Nlc3M7XG4gICAgcHJvZ3Jlc3NCYXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIHByb2dyZXNzQmFyLnN0eWxlLnRyYW5zaXRpb24gPSAnd2lkdGggMC4zcyBlYXNlJztcbn1cbi8vIOabtOaWsOa0u+i3g+aooeW8j+aMiemSrlxuZnVuY3Rpb24gdXBkYXRlQWN0aXZlTW9kZUJ1dHRvbihhY3RpdmVNb2RlKSB7XG4gICAgY29uc3QgbW9kZXMgPSBbJ25vcm1hbCcsICd0cmFpbmluZycsICdhdXRvY2hlc3MnLCAnY3VzdG9tJ107XG4gICAgbW9kZXMuZm9yRWFjaChtb2RlID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYE1vZGVCdXR0b25fJHttb2RlfWApO1xuICAgICAgICBpZiAoYnV0dG9uKSB7XG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gYWN0aXZlTW9kZSkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBIVURfVEhFTUUuYWNjZW50O1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICNmZmZmZmYnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgICAgICAgICAgICAgICAnbm9ybWFsJzogSFVEX1RIRU1FLnN1Y2Nlc3MsXG4gICAgICAgICAgICAgICAgICAgICd0cmFpbmluZyc6IEhVRF9USEVNRS53YXJuaW5nLFxuICAgICAgICAgICAgICAgICAgICAnYXV0b2NoZXNzJzogSFVEX1RIRU1FLnNlY29uZGFyeSxcbiAgICAgICAgICAgICAgICAgICAgJ2N1c3RvbSc6IEhVRF9USEVNRS5kYW5nZXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbbW9kZV07XG4gICAgICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8g5aSE55CG5b+r5o235pON5L2cXG5mdW5jdGlvbiBoYW5kbGVRdWlja0FjdGlvbihhY3Rpb25JZCkge1xuICAgIHN3aXRjaCAoYWN0aW9uSWQpIHtcbiAgICAgICAgY2FzZSAncGF1c2UnOlxuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3BhdXNlX2dhbWUnLCB7fSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVzdGFydCc6XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncmVzdGFydF9nYW1lJywge30pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21lbnUnOlxuICAgICAgICAgICAgc2hvd0NlbnRlckluZm8oJ/Cfk4sg5omT5byA5Li76I+c5Y2VJywgJ+ato+WcqOWKoOi9veiPnOWNlS4uLicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2V4aXQnOlxuICAgICAgICAgICAgc2hvd0NlbnRlckluZm8oJ/Cfmqog6YCA5Ye65ri45oiPJywgJ+ehruiupOmAgOWHuuWQl++8nycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NldHRpbmdzJzpcbiAgICAgICAgICAgIHNob3dDZW50ZXJJbmZvKCfimpnvuI8g5ri45oiP6K6+572uJywgJ+ato+WcqOaJk+W8gOiuvue9rumdouadvy4uLicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ludmVudG9yeSc6XG4gICAgICAgICAgICBzaG93Q2VudGVySW5mbygn8J+OkiDog4zljIXns7vnu58nLCAn5q2j5Zyo5Yqg6L296IOM5YyFLi4uJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc2tpbGxzJzpcbiAgICAgICAgICAgIHNob3dDZW50ZXJJbmZvKCfinKgg5oqA6IO96Z2i5p2/JywgJ+ato+WcqOWKoOi9veaKgOiDvS4uLicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgICAgICAgc2hvd0NlbnRlckluZm8oJ+KdkyDluK7liqnkv6Hmga8nLCAn5q2j5Zyo5Yqg6L295biu5Yqp5paH5qGjLi4uJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG4vLyDmmL7npLrkuK3lpK7kv6Hmga9cbmZ1bmN0aW9uIHNob3dDZW50ZXJJbmZvKHRpdGxlLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgY2VudGVyUGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQ2VudGVyR2FtZUluZm8nKTtcbiAgICBpZiAoY2VudGVyUGFuZWwpIHtcbiAgICAgICAgY29uc3QgdGl0bGVMYWJlbCA9IGNlbnRlclBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQ2VudGVySW5mb1RpdGxlJyk7XG4gICAgICAgIGNvbnN0IHN0YXR1c0xhYmVsID0gY2VudGVyUGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdTdGF0dXNJbmZvJyk7XG4gICAgICAgIGlmICh0aXRsZUxhYmVsKVxuICAgICAgICAgICAgdGl0bGVMYWJlbC50ZXh0ID0gdGl0bGU7XG4gICAgICAgIGlmIChzdGF0dXNMYWJlbClcbiAgICAgICAgICAgIHN0YXR1c0xhYmVsLnRleHQgPSBtZXNzYWdlO1xuICAgICAgICBjZW50ZXJQYW5lbC5zdHlsZS52aXNpYmxlID0gJ3RydWUnO1xuICAgICAgICAvLyAz56eS5ZCO6ZqQ6JePXG4gICAgICAgICQuU2NoZWR1bGUoMy4wLCAoKSA9PiB7XG4gICAgICAgICAgICBjZW50ZXJQYW5lbC5zdHlsZS52aXNpYmxlID0gJ2ZhbHNlJztcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8g5pu05paw5ri45oiP5pe26Ze0XG5mdW5jdGlvbiB1cGRhdGVHYW1lVGltZSgpIHtcbiAgICBjb25zdCB0aW1lTGFiZWwgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnR2FtZVRpbWVMYWJlbCcpO1xuICAgIGlmICh0aW1lTGFiZWwpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgY29uc3QgdGltZVN0cmluZyA9IG5vdy50b0xvY2FsZVRpbWVTdHJpbmcoKTtcbiAgICAgICAgdGltZUxhYmVsLnRleHQgPSBg4o+wICR7dGltZVN0cmluZ31gO1xuICAgIH1cbn1cbi8vIOebkeWQrOa4uOaIj+S6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfbW9kZV9jaGFuZ2VkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZygnR2FtZSBtb2RlIGNoYW5nZWQ6JywgZGF0YSk7XG4gICAgY29uc3QgbW9kZU5hbWVzID0ge1xuICAgICAgICAnbm9ybWFsJzogJ/Cfjq4g5q2j5bi45qih5byPJyxcbiAgICAgICAgJ3RyYWluaW5nJzogJ/Cfj5/vuI8g57uD5Yqf5oi/5qih5byPJyxcbiAgICAgICAgJ2F1dG9jaGVzcyc6ICfimZ/vuI8g6Ieq6LWw5qOL5qih5byPJyxcbiAgICAgICAgJ2N1c3RvbSc6ICfimpnvuI8g6Ieq5a6a5LmJ5qih5byPJ1xuICAgIH07XG4gICAgY29uc3QgbW9kZUxhYmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0dhbWVNb2RlTGFiZWwnKTtcbiAgICBpZiAobW9kZUxhYmVsKSB7XG4gICAgICAgIG1vZGVMYWJlbC50ZXh0ID0gbW9kZU5hbWVzW2RhdGEubmV3TW9kZV0gfHwgYPCfjq8gJHtkYXRhLm5ld01vZGV9YDtcbiAgICB9XG4gICAgdXBkYXRlQWN0aXZlTW9kZUJ1dHRvbihkYXRhLm5ld01vZGUpO1xufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgncGxheWVyX3N0YXRzX3VwZGF0ZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdQbGF5ZXIgc3RhdHMgdXBkYXRlZDonLCBkYXRhKTtcbiAgICAvLyDmm7TmlrDnu5/orqHkv6Hmga9cbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdmFsdWVMYWJlbCA9IChfYSA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBTdGF0UGFuZWxfJHtrZXl9YCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYCR7a2V5fV9WYWx1ZWApO1xuICAgICAgICBpZiAodmFsdWVMYWJlbCkge1xuICAgICAgICAgICAgdmFsdWVMYWJlbC50ZXh0ID0gZGF0YVtrZXldLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuLy8g5Yid5aeL5YyW5Ye95pWwXG5mdW5jdGlvbiBpbml0aWFsaXplTW9kZXJuSFVEKCkge1xuICAgICQuTXNnKCc9PT0gSW5pdGlhbGl6aW5nIE1vZGVybiBIVUQgPT09Jyk7XG4gICAgLy8g5bu26L+f5Yib5bu6VUlcbiAgICAkLlNjaGVkdWxlKDAuNSwgY3JlYXRlTW9kZXJuSFVEKTtcbiAgICAvLyDorr7nva7lrprml7blmajmm7TmlrDmuLjmiI/ml7bpl7RcbiAgICAkLlNjaGVkdWxlKDEuMCwgKCkgPT4ge1xuICAgICAgICB1cGRhdGVHYW1lVGltZSgpO1xuICAgICAgICAkLlNjaGVkdWxlKDEuMCwgYXJndW1lbnRzLmNhbGxlZSk7XG4gICAgfSk7XG4gICAgLy8g6K6+572u5b+r5o236ZSuXG4gICAgJC5SZWdpc3RlcktleUJpbmQoJC5HZXRDb250ZXh0UGFuZWwoKSwgJ2tleV9mOScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSBGOTogUmVjcmVhdGluZyBNb2Rlcm4gSFVEID09PScpO1xuICAgICAgICBjcmVhdGVNb2Rlcm5IVUQoKTtcbiAgICB9KTtcbiAgICAkLlJlZ2lzdGVyS2V5QmluZCgkLkdldENvbnRleHRQYW5lbCgpLCAna2V5X2Y4JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnPT09IEY4OiBUb2dnbGUgQ2VudGVyIEluZm8gPT09Jyk7XG4gICAgICAgIGNvbnN0IGNlbnRlclBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0NlbnRlckdhbWVJbmZvJyk7XG4gICAgICAgIGlmIChjZW50ZXJQYW5lbCkge1xuICAgICAgICAgICAgY2VudGVyUGFuZWwuc3R5bGUudmlzaWJsZSA9IGNlbnRlclBhbmVsLnN0eWxlLnZpc2libGUgPT09ICd0cnVlJyA/ICdmYWxzZScgOiAndHJ1ZSc7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkLlJlZ2lzdGVyS2V5QmluZCgkLkdldENvbnRleHRQYW5lbCgpLCAna2V5X2Y3JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnPT09IEY3OiBTaG93IERlYnVnIEluZm8gPT09Jyk7XG4gICAgICAgIHNob3dDZW50ZXJJbmZvKCfwn5SNIOiwg+ivleS/oeaBrycsICdIVUTns7vnu5/ov5DooYzmraPluLjvvIEnKTtcbiAgICB9KTtcbn1cbi8vIOWvvOWHuuWFqOWxgOWHveaVsFxuZ2xvYmFsVGhpcy5Nb2Rlcm5IVUQgPSB7XG4gICAgY3JlYXRlOiBjcmVhdGVNb2Rlcm5IVUQsXG4gICAgc2hvd0luZm86IHNob3dDZW50ZXJJbmZvLFxuICAgIHVwZGF0ZU1vZGU6IHVwZGF0ZUFjdGl2ZU1vZGVCdXR0b24sXG4gICAgaGFuZGxlQWN0aW9uOiBoYW5kbGVRdWlja0FjdGlvblxufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuaW5pdGlhbGl6ZU1vZGVybkhVRCgpO1xuLy8g5a+85Ye6UmVhY3Tnu4Tku7bvvIjkv53mjIHlhbzlrrnmgKfvvIlcbmNvbnN0IE1vZGVybkh1ZFBhbmVsID0gKCkgPT4ge1xuICAgIHJldHVybiBudWxsOyAvLyDkvb/nlKjljp/nlJ9QYW5vcmFtYVxufTtcbmV4cG9ydCBkZWZhdWx0IE1vZGVybkh1ZFBhbmVsO1xuJC5Nc2coJz09PSBNb2Rlcm4gSFVEIG1vZHVsZSBsb2FkZWQgY29tcGxldGVseSA9PT0nKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==