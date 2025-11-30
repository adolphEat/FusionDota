/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "jquery":
/*!********************!*\
  !*** external "$" ***!
  \********************/
/***/ ((module) => {

"use strict";
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\preparation-screen\index.tsx ***!
  \*********************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
// 游戏准备界面 - 参考 Dota2CustomGame 设计风格
$.Msg('=== Preparation Screen Loading ===');
// 主题配置（参考 Dota2CustomGame 风格）
const PREPARATION_THEME = {
    background: 'rgba(0, 0, 0, 0.85)',
    panelBg: 'rgba(33, 34, 31, 0.95)',
    borderColor: 'rgba(139, 195, 74, 0.4)',
    textPrimary: '#8bc34a',
    textSecondary: '#ffffff',
    textAccent: '#ffc57a',
    success: '#4caf50',
    warning: '#ff9800',
    danger: '#f44336',
};
// 创建准备界面
function createPreparationScreen() {
    $.Msg('Creating preparation screen...');
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('PreparationScreenContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'PreparationScreenContainer');
    container.style.width = '100%';
    container.style.height = '100%';
    // 移除hittest设置，避免Panorama API问题
    container.style.backgroundColor = PREPARATION_THEME.background;
    container.style.zIndex = '5000';
    container.AddClass('preparation_screen_root');
    // 创建背景遮罩
    createBackgroundMask(container);
    // 创建主面板
    const mainPanel = $.CreatePanel('Panel', container, 'PreparationMainPanel');
    mainPanel.style.width = '800px';
    mainPanel.style.height = '600px';
    mainPanel.style.horizontalAlign = 'center';
    mainPanel.style.verticalAlign = 'center';
    mainPanel.style.backgroundColor = PREPARATION_THEME.panelBg;
    mainPanel.style.border = `2px solid ${PREPARATION_THEME.borderColor}`;
    mainPanel.style.borderRadius = '15px';
    mainPanel.style.boxShadow = '0px 0px 20px rgba(139, 195, 74, 0.3)';
    mainPanel.style.padding = '30px';
    // 创建标题
    createTitle(mainPanel);
    // 创建玩家信息区域
    createPlayerInfoSection(mainPanel);
    // 创建游戏配置区域
    createGameConfigSection(mainPanel);
    // 创建准备按钮区域
    createReadyButtonSection(mainPanel);
    // 创建倒计时显示
    createCountdownDisplay(container);
    $.Msg('Preparation screen created successfully!');
}
// 创建背景遮罩
function createBackgroundMask(parent) {
    const mask = $.CreatePanel('Panel', parent, 'PreparationBackgroundMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'gradient(linear, 0% 0%, 0% 100%, from(#00000000), color-stop(0.8, #00000000), color-stop(0.9, #00000091), to(#000000))';
    mask.style.zIndex = '-1';
}
// 创建标题
function createTitle(parent) {
    const titlePanel = $.CreatePanel('Panel', parent, 'PreparationTitlePanel');
    titlePanel.style.width = '100%';
    titlePanel.style.height = '80px';
    titlePanel.style.marginBottom = '20px';
    const title = $.CreatePanel('Label', titlePanel, 'PreparationTitle');
    title.text = '⚔️ 游戏准备';
    title.style.fontSize = '36px';
    title.style.fontWeight = 'bold';
    title.style.color = PREPARATION_THEME.textPrimary;
    title.style.textAlign = 'center';
    title.style.textShadow = '0px 0px 10px rgba(139, 195, 74, 0.8)';
    title.style.horizontalAlign = 'center';
    title.style.verticalAlign = 'center';
    const subtitle = $.CreatePanel('Label', titlePanel, 'PreparationSubtitle');
    subtitle.text = '请等待所有玩家准备就绪...';
    subtitle.style.fontSize = '18px';
    subtitle.style.color = PREPARATION_THEME.textSecondary;
    subtitle.style.textAlign = 'center';
    subtitle.style.horizontalAlign = 'center';
    subtitle.style.verticalAlign = 'bottom';
    subtitle.style.marginTop = '45px';
    subtitle.style.opacity = '0.8';
}
// 创建玩家信息区域
function createPlayerInfoSection(parent) {
    const playerSection = $.CreatePanel('Panel', parent, 'PlayerInfoSection');
    playerSection.style.width = '100%';
    playerSection.style.height = '250px';
    playerSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    playerSection.style.borderRadius = '10px';
    playerSection.style.padding = '15px';
    playerSection.style.marginBottom = '20px';
    const sectionTitle = $.CreatePanel('Label', playerSection, 'PlayerSectionTitle');
    sectionTitle.text = '👥 玩家列表';
    sectionTitle.style.fontSize = '20px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = PREPARATION_THEME.textAccent;
    sectionTitle.style.marginBottom = '15px';
    // 创建玩家列表容器
    const playerList = $.CreatePanel('Panel', playerSection, 'PlayerListContainer');
    playerList.style.width = '100%';
    playerList.style.height = '180px';
    playerList.style.flowChildren = 'down';
    playerList.style.overflow = 'squish scroll';
    // 示例玩家项（实际应该从服务器获取）
    for (let i = 0; i < 4; i++) {
        createPlayerItem(playerList, i, `玩家 ${i + 1}`, i === 0); // 第一个玩家为本地玩家
    }
}
// 创建玩家项
function createPlayerItem(parent, index, playerName, isLocal) {
    const playerItem = $.CreatePanel('Panel', parent, `PlayerItem_${index}`);
    playerItem.style.width = '100%';
    playerItem.style.height = '40px';
    playerItem.style.backgroundColor = isLocal ? 'rgba(139, 195, 74, 0.2)' : 'rgba(255, 255, 255, 0.05)';
    playerItem.style.borderRadius = '5px';
    playerItem.style.padding = '8px';
    playerItem.style.marginBottom = '5px';
    playerItem.style.flowChildren = 'right';
    // 玩家头像占位
    const avatar = $.CreatePanel('Panel', playerItem, 'PlayerAvatar');
    avatar.style.width = '24px';
    avatar.style.height = '24px';
    avatar.style.backgroundColor = PREPARATION_THEME.borderColor;
    avatar.style.borderRadius = '12px';
    avatar.style.marginRight = '10px';
    // 玩家名称
    const nameLabel = $.CreatePanel('Label', playerItem, 'PlayerName');
    nameLabel.text = isLocal ? `★ ${playerName} (你)` : playerName;
    nameLabel.style.fontSize = '16px';
    nameLabel.style.color = isLocal ? PREPARATION_THEME.textPrimary : PREPARATION_THEME.textSecondary;
    nameLabel.style.fontWeight = isLocal ? 'bold' : 'normal';
    nameLabel.style.width = '200px';
    // 准备状态
    const readyStatus = $.CreatePanel('Label', playerItem, 'ReadyStatus');
    readyStatus.text = '⏳ 等待中...';
    readyStatus.style.fontSize = '14px';
    readyStatus.style.color = PREPARATION_THEME.warning;
    readyStatus.style.horizontalAlign = 'right';
    readyStatus.style.width = 'fill-parent-flow(1)';
    readyStatus.SetAttributeString('data-ready', 'false');
}
// 创建游戏配置区域
function createGameConfigSection(parent) {
    const configSection = $.CreatePanel('Panel', parent, 'GameConfigSection');
    configSection.style.width = '100%';
    configSection.style.height = '120px';
    configSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    configSection.style.borderRadius = '10px';
    configSection.style.padding = '15px';
    configSection.style.marginBottom = '20px';
    configSection.style.flowChildren = 'down';
    const sectionTitle = $.CreatePanel('Label', configSection, 'ConfigSectionTitle');
    sectionTitle.text = '⚙️ 游戏设置';
    sectionTitle.style.fontSize = '20px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = PREPARATION_THEME.textAccent;
    sectionTitle.style.marginBottom = '10px';
    // 游戏模式
    const modeRow = $.CreatePanel('Panel', configSection, 'GameModeRow');
    modeRow.style.width = '100%';
    modeRow.style.height = '30px';
    modeRow.style.flowChildren = 'right';
    const modeLabel = $.CreatePanel('Label', modeRow, 'GameModeLabel');
    modeLabel.text = '游戏模式:';
    modeLabel.style.fontSize = '14px';
    modeLabel.style.color = PREPARATION_THEME.textSecondary;
    modeLabel.style.width = '100px';
    const modeValue = $.CreatePanel('Label', modeRow, 'GameModeValue');
    modeValue.text = '标准对战';
    modeValue.style.fontSize = '14px';
    modeValue.style.color = PREPARATION_THEME.textPrimary;
    modeValue.style.fontWeight = 'bold';
    // 地图信息
    const mapRow = $.CreatePanel('Panel', configSection, 'GameMapRow');
    mapRow.style.width = '100%';
    mapRow.style.height = '30px';
    mapRow.style.flowChildren = 'right';
    mapRow.style.marginTop = '5px';
    const mapLabel = $.CreatePanel('Label', mapRow, 'GameMapLabel');
    mapLabel.text = '地图:';
    mapLabel.style.fontSize = '14px';
    mapLabel.style.color = PREPARATION_THEME.textSecondary;
    mapLabel.style.width = '100px';
    const mapValue = $.CreatePanel('Label', mapRow, 'GameMapValue');
    mapValue.text = 'Battle Map';
    mapValue.style.fontSize = '14px';
    mapValue.style.color = PREPARATION_THEME.textPrimary;
    mapValue.style.fontWeight = 'bold';
}
// 创建准备按钮区域
function createReadyButtonSection(parent) {
    const buttonSection = $.CreatePanel('Panel', parent, 'ReadyButtonSection');
    buttonSection.style.width = '100%';
    buttonSection.style.height = '60px';
    buttonSection.style.flowChildren = 'right';
    buttonSection.style.horizontalAlign = 'center';
    // 取消准备按钮
    const cancelButton = $.CreatePanel('Button', buttonSection, 'CancelReadyButton');
    cancelButton.text = '❌ 取消准备';
    cancelButton.style.width = '180px';
    cancelButton.style.height = '50px';
    cancelButton.style.backgroundColor = PREPARATION_THEME.danger;
    cancelButton.style.color = '#ffffff';
    cancelButton.style.fontSize = '16px';
    cancelButton.style.fontWeight = 'bold';
    cancelButton.style.borderRadius = '8px';
    cancelButton.style.marginRight = '20px';
    cancelButton.style.boxShadow = '0px 2px 8px rgba(244, 67, 54, 0.4)';
    cancelButton.style.visible = 'false'; // 默认隐藏
    cancelButton.SetPanelEvent('onactivate', () => {
        $.Msg('取消准备');
        GameEvents.SendCustomGameEventToServer('player_not_ready', {});
        updateReadyButton(false);
    });
    // 准备按钮
    const readyButton = $.CreatePanel('Button', buttonSection, 'ReadyButton');
    readyButton.text = '✅ 准备就绪';
    readyButton.style.width = '180px';
    readyButton.style.height = '50px';
    readyButton.style.backgroundColor = PREPARATION_THEME.success;
    readyButton.style.color = '#ffffff';
    readyButton.style.fontSize = '16px';
    readyButton.style.fontWeight = 'bold';
    readyButton.style.borderRadius = '8px';
    readyButton.style.boxShadow = '0px 2px 8px rgba(76, 175, 80, 0.4)';
    readyButton.SetPanelEvent('onactivate', () => {
        $.Msg('准备就绪');
        GameEvents.SendCustomGameEventToServer('player_ready', {});
        updateReadyButton(true);
    });
}
// 更新准备按钮状态
function updateReadyButton(isReady) {
    const readyButton = $.GetContextPanel().FindChildInLayoutFile('ReadyButton');
    const cancelButton = $.GetContextPanel().FindChildInLayoutFile('CancelReadyButton');
    if (readyButton)
        readyButton.style.visible = isReady ? 'false' : 'true';
    if (cancelButton)
        cancelButton.style.visible = isReady ? 'true' : 'false';
    // 更新本地玩家状态显示
    const localPlayerItem = $.GetContextPanel().FindChildInLayoutFile('PlayerItem_0');
    if (localPlayerItem) {
        const readyStatus = localPlayerItem.FindChildInLayoutFile('ReadyStatus');
        if (readyStatus) {
            readyStatus.text = isReady ? '✅ 已准备' : '⏳ 等待中...';
            readyStatus.style.color = isReady ? PREPARATION_THEME.success : PREPARATION_THEME.warning;
            readyStatus.SetAttributeString('data-ready', isReady ? 'true' : 'false');
        }
    }
}
// 创建倒计时显示
function createCountdownDisplay(parent) {
    const countdownPanel = $.CreatePanel('Panel', parent, 'CountdownDisplay');
    countdownPanel.style.width = '300px';
    countdownPanel.style.height = '100px';
    countdownPanel.style.horizontalAlign = 'center';
    countdownPanel.style.verticalAlign = 'top';
    countdownPanel.style.marginTop = '50px';
    countdownPanel.style.visible = 'false';
    const countdownLabel = $.CreatePanel('Label', countdownPanel, 'CountdownLabel');
    countdownLabel.text = '游戏即将开始...';
    countdownLabel.style.fontSize = '24px';
    countdownLabel.style.fontWeight = 'bold';
    countdownLabel.style.color = PREPARATION_THEME.textAccent;
    countdownLabel.style.textAlign = 'center';
    countdownLabel.style.horizontalAlign = 'center';
    countdownLabel.style.textShadow = '0px 0px 10px rgba(255, 197, 122, 0.8)';
    countdownLabel.style.marginBottom = '10px';
    const countdownValue = $.CreatePanel('Label', countdownPanel, 'CountdownValue');
    countdownValue.text = '5';
    countdownValue.style.fontSize = '48px';
    countdownValue.style.fontWeight = 'bold';
    countdownValue.style.color = PREPARATION_THEME.textPrimary;
    countdownValue.style.textAlign = 'center';
    countdownValue.style.horizontalAlign = 'center';
    countdownValue.style.textShadow = '0px 0px 15px rgba(139, 195, 74, 1)';
}
// 更新倒计时
function updateCountdown(seconds) {
    const countdownPanel = $.GetContextPanel().FindChildInLayoutFile('CountdownDisplay');
    if (!countdownPanel)
        return;
    const countdownValue = countdownPanel.FindChildInLayoutFile('CountdownValue');
    if (countdownValue && seconds > 0) {
        countdownPanel.style.visible = 'true';
        countdownValue.text = seconds.toString();
        // 动画效果
        countdownValue.style.preTransformScale2d = '1.5';
        $.Schedule(0.1, () => {
            countdownValue.style.preTransformScale2d = '1.0';
        });
    }
    else if (seconds <= 0) {
        countdownPanel.style.visible = 'false';
    }
}
// 更新玩家准备状态
function updatePlayerReady(playerId, isReady) {
    const playerItem = $.GetContextPanel().FindChildInLayoutFile(`PlayerItem_${playerId}`);
    if (playerItem) {
        const readyStatus = playerItem.FindChildInLayoutFile('ReadyStatus');
        if (readyStatus) {
            readyStatus.text = isReady ? '✅ 已准备' : '⏳ 等待中...';
            readyStatus.style.color = isReady ? PREPARATION_THEME.success : PREPARATION_THEME.warning;
            readyStatus.SetAttributeString('data-ready', isReady ? 'true' : 'false');
        }
    }
}
// 显示/隐藏准备界面
function showPreparationScreen(show) {
    const container = $.GetContextPanel().FindChildInLayoutFile('PreparationScreenContainer');
    if (container) {
        container.style.visible = show ? 'true' : 'false';
    }
}
// 监听游戏事件
GameEvents.Subscribe('preparation_start', () => {
    $.Msg('Preparation started');
    showPreparationScreen(true);
});
GameEvents.Subscribe('preparation_end', () => {
    $.Msg('Preparation ended');
    showPreparationScreen(false);
});
GameEvents.Subscribe('player_ready_changed', (data) => {
    $.Msg('Player ready changed:', data);
    updatePlayerReady(data.playerId, data.isReady);
});
GameEvents.Subscribe('countdown_update', (data) => {
    $.Msg('Countdown update:', data);
    updateCountdown(data.seconds);
});
// 监听 NetTable 变化
function setupNetTableListener() {
    const netTable = CustomNetTables.GetTableValue('game_state', 'preparation');
    if (netTable) {
        updatePreparationState(netTable);
    }
    CustomNetTables.SubscribeNetTableListener('game_state', (tableName, key, value) => {
        if (key === 'preparation') {
            updatePreparationState(value);
        }
    });
}
function updatePreparationState(state) {
    if (!state)
        return;
    if (state.isActive !== undefined) {
        showPreparationScreen(state.isActive);
    }
    if (state.countdown !== undefined) {
        updateCountdown(state.countdown);
    }
    if (state.players) {
        Object.keys(state.players).forEach((playerId) => {
            const player = state.players[playerId];
            updatePlayerReady(parseInt(playerId), player.isReady);
        });
    }
}
// 初始化
function initializePreparationScreen() {
    $.Msg('=== Initializing Preparation Screen ===');
    $.Schedule(0.5, createPreparationScreen);
    $.Schedule(1.0, setupNetTableListener);
}
// 导出全局函数
globalThis.PreparationScreen = {
    create: createPreparationScreen,
    show: showPreparationScreen,
    updateReady: updateReadyButton,
    updateCountdown: updateCountdown,
    updatePlayerReady: updatePlayerReady
};
// 立即执行初始化
initializePreparationScreen();
$.Msg('=== Preparation Screen module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTCxJQUFJLENBQUM7QUFDTCxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xccHJlcGFyYXRpb24tc2NyZWVuXFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBAdHMtbm9jaGVja1xuLy8g5ri45oiP5YeG5aSH55WM6Z2iIC0g5Y+C6ICDIERvdGEyQ3VzdG9tR2FtZSDorr7orqHpo47moLxcbiQuTXNnKCc9PT0gUHJlcGFyYXRpb24gU2NyZWVuIExvYWRpbmcgPT09Jyk7XG4vLyDkuLvpopjphY3nva7vvIjlj4LogIMgRG90YTJDdXN0b21HYW1lIOmjjuagvO+8iVxuY29uc3QgUFJFUEFSQVRJT05fVEhFTUUgPSB7XG4gICAgYmFja2dyb3VuZDogJ3JnYmEoMCwgMCwgMCwgMC44NSknLFxuICAgIHBhbmVsQmc6ICdyZ2JhKDMzLCAzNCwgMzEsIDAuOTUpJyxcbiAgICBib3JkZXJDb2xvcjogJ3JnYmEoMTM5LCAxOTUsIDc0LCAwLjQpJyxcbiAgICB0ZXh0UHJpbWFyeTogJyM4YmMzNGEnLFxuICAgIHRleHRTZWNvbmRhcnk6ICcjZmZmZmZmJyxcbiAgICB0ZXh0QWNjZW50OiAnI2ZmYzU3YScsXG4gICAgc3VjY2VzczogJyM0Y2FmNTAnLFxuICAgIHdhcm5pbmc6ICcjZmY5ODAwJyxcbiAgICBkYW5nZXI6ICcjZjQ0MzM2Jyxcbn07XG4vLyDliJvlu7rlh4blpIfnlYzpnaJcbmZ1bmN0aW9uIGNyZWF0ZVByZXBhcmF0aW9uU2NyZWVuKCkge1xuICAgICQuTXNnKCdDcmVhdGluZyBwcmVwYXJhdGlvbiBzY3JlZW4uLi4nKTtcbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdFcnJvcjogUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDliKDpmaTlt7LlrZjlnKjnmoTlrrnlmahcbiAgICBjb25zdCBleGlzdGluZ0NvbnRhaW5lciA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1ByZXBhcmF0aW9uU2NyZWVuQ29udGFpbmVyJyk7XG4gICAgaWYgKGV4aXN0aW5nQ29udGFpbmVyKSB7XG4gICAgICAgIGV4aXN0aW5nQ29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgIH1cbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ1ByZXBhcmF0aW9uU2NyZWVuQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgLy8g56e76ZmkaGl0dGVzdOiuvue9ru+8jOmBv+WFjVBhbm9yYW1hIEFQSemXrumimFxuICAgIGNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQUkVQQVJBVElPTl9USEVNRS5iYWNrZ3JvdW5kO1xuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnNTAwMCc7XG4gICAgY29udGFpbmVyLkFkZENsYXNzKCdwcmVwYXJhdGlvbl9zY3JlZW5fcm9vdCcpO1xuICAgIC8vIOWIm+W7uuiDjOaZr+mBrue9qVxuICAgIGNyZWF0ZUJhY2tncm91bmRNYXNrKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65Li76Z2i5p2/XG4gICAgY29uc3QgbWFpblBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdQcmVwYXJhdGlvbk1haW5QYW5lbCcpO1xuICAgIG1haW5QYW5lbC5zdHlsZS53aWR0aCA9ICc4MDBweCc7XG4gICAgbWFpblBhbmVsLnN0eWxlLmhlaWdodCA9ICc2MDBweCc7XG4gICAgbWFpblBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1haW5QYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFpblBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBSRVBBUkFUSU9OX1RIRU1FLnBhbmVsQmc7XG4gICAgbWFpblBhbmVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtQUkVQQVJBVElPTl9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIG1haW5QYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgbWFpblBhbmVsLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggMHB4IDIwcHggcmdiYSgxMzksIDE5NSwgNzQsIDAuMyknO1xuICAgIG1haW5QYW5lbC5zdHlsZS5wYWRkaW5nID0gJzMwcHgnO1xuICAgIC8vIOWIm+W7uuagh+mimFxuICAgIGNyZWF0ZVRpdGxlKG1haW5QYW5lbCk7XG4gICAgLy8g5Yib5bu6546p5a625L+h5oGv5Yy65Z+fXG4gICAgY3JlYXRlUGxheWVySW5mb1NlY3Rpb24obWFpblBhbmVsKTtcbiAgICAvLyDliJvlu7rmuLjmiI/phY3nva7ljLrln59cbiAgICBjcmVhdGVHYW1lQ29uZmlnU2VjdGlvbihtYWluUGFuZWwpO1xuICAgIC8vIOWIm+W7uuWHhuWkh+aMiemSruWMuuWfn1xuICAgIGNyZWF0ZVJlYWR5QnV0dG9uU2VjdGlvbihtYWluUGFuZWwpO1xuICAgIC8vIOWIm+W7uuWAkuiuoeaXtuaYvuekulxuICAgIGNyZWF0ZUNvdW50ZG93bkRpc3BsYXkoY29udGFpbmVyKTtcbiAgICAkLk1zZygnUHJlcGFyYXRpb24gc2NyZWVuIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xufVxuLy8g5Yib5bu66IOM5pmv6YGu572pXG5mdW5jdGlvbiBjcmVhdGVCYWNrZ3JvdW5kTWFzayhwYXJlbnQpIHtcbiAgICBjb25zdCBtYXNrID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdQcmVwYXJhdGlvbkJhY2tncm91bmRNYXNrJyk7XG4gICAgbWFzay5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdncmFkaWVudChsaW5lYXIsIDAlIDAlLCAwJSAxMDAlLCBmcm9tKCMwMDAwMDAwMCksIGNvbG9yLXN0b3AoMC44LCAjMDAwMDAwMDApLCBjb2xvci1zdG9wKDAuOSwgIzAwMDAwMDkxKSwgdG8oIzAwMDAwMCkpJztcbiAgICBtYXNrLnN0eWxlLnpJbmRleCA9ICctMSc7XG59XG4vLyDliJvlu7rmoIfpophcbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlKHBhcmVudCkge1xuICAgIGNvbnN0IHRpdGxlUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1ByZXBhcmF0aW9uVGl0bGVQYW5lbCcpO1xuICAgIHRpdGxlUGFuZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGl0bGVQYW5lbC5zdHlsZS5oZWlnaHQgPSAnODBweCc7XG4gICAgdGl0bGVQYW5lbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMjBweCc7XG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlUGFuZWwsICdQcmVwYXJhdGlvblRpdGxlJyk7XG4gICAgdGl0bGUudGV4dCA9ICfimpTvuI8g5ri45oiP5YeG5aSHJztcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICczNnB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gUFJFUEFSQVRJT05fVEhFTUUudGV4dFByaW1hcnk7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDEwcHggcmdiYSgxMzksIDE5NSwgNzQsIDAuOCknO1xuICAgIHRpdGxlLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCBzdWJ0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVQYW5lbCwgJ1ByZXBhcmF0aW9uU3VidGl0bGUnKTtcbiAgICBzdWJ0aXRsZS50ZXh0ID0gJ+ivt+etieW+heaJgOacieeOqeWutuWHhuWkh+Wwsee7qi4uLic7XG4gICAgc3VidGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgc3VidGl0bGUuc3R5bGUuY29sb3IgPSBQUkVQQVJBVElPTl9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIHN1YnRpdGxlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHN1YnRpdGxlLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHN1YnRpdGxlLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICBzdWJ0aXRsZS5zdHlsZS5tYXJnaW5Ub3AgPSAnNDVweCc7XG4gICAgc3VidGl0bGUuc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xufVxuLy8g5Yib5bu6546p5a625L+h5oGv5Yy65Z+fXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJJbmZvU2VjdGlvbihwYXJlbnQpIHtcbiAgICBjb25zdCBwbGF5ZXJTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdQbGF5ZXJJbmZvU2VjdGlvbicpO1xuICAgIHBsYXllclNlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgcGxheWVyU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMjUwcHgnO1xuICAgIHBsYXllclNlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgcGxheWVyU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgcGxheWVyU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIHBsYXllclNlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzIwcHgnO1xuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgcGxheWVyU2VjdGlvbiwgJ1BsYXllclNlY3Rpb25UaXRsZScpO1xuICAgIHNlY3Rpb25UaXRsZS50ZXh0ID0gJ/CfkaUg546p5a625YiX6KGoJztcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgc2VjdGlvblRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgc2VjdGlvblRpdGxlLnN0eWxlLmNvbG9yID0gUFJFUEFSQVRJT05fVEhFTUUudGV4dEFjY2VudDtcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIC8vIOWIm+W7uueOqeWutuWIl+ihqOWuueWZqFxuICAgIGNvbnN0IHBsYXllckxpc3QgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBsYXllclNlY3Rpb24sICdQbGF5ZXJMaXN0Q29udGFpbmVyJyk7XG4gICAgcGxheWVyTGlzdC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBwbGF5ZXJMaXN0LnN0eWxlLmhlaWdodCA9ICcxODBweCc7XG4gICAgcGxheWVyTGlzdC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgcGxheWVyTGlzdC5zdHlsZS5vdmVyZmxvdyA9ICdzcXVpc2ggc2Nyb2xsJztcbiAgICAvLyDnpLrkvovnjqnlrrbpobnvvIjlrp7pmYXlupTor6Xku47mnI3liqHlmajojrflj5bvvIlcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICBjcmVhdGVQbGF5ZXJJdGVtKHBsYXllckxpc3QsIGksIGDnjqnlrrYgJHtpICsgMX1gLCBpID09PSAwKTsgLy8g56ys5LiA5Liq546p5a625Li65pys5Zyw546p5a62XG4gICAgfVxufVxuLy8g5Yib5bu6546p5a626aG5XG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJJdGVtKHBhcmVudCwgaW5kZXgsIHBsYXllck5hbWUsIGlzTG9jYWwpIHtcbiAgICBjb25zdCBwbGF5ZXJJdGVtID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBQbGF5ZXJJdGVtXyR7aW5kZXh9YCk7XG4gICAgcGxheWVySXRlbS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBwbGF5ZXJJdGVtLnN0eWxlLmhlaWdodCA9ICc0MHB4JztcbiAgICBwbGF5ZXJJdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGlzTG9jYWwgPyAncmdiYSgxMzksIDE5NSwgNzQsIDAuMiknIDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSknO1xuICAgIHBsYXllckl0ZW0uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzVweCc7XG4gICAgcGxheWVySXRlbS5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG4gICAgcGxheWVySXRlbS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICBwbGF5ZXJJdGVtLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgLy8g546p5a625aS05YOP5Y2g5L2NXG4gICAgY29uc3QgYXZhdGFyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwbGF5ZXJJdGVtLCAnUGxheWVyQXZhdGFyJyk7XG4gICAgYXZhdGFyLnN0eWxlLndpZHRoID0gJzI0cHgnO1xuICAgIGF2YXRhci5zdHlsZS5oZWlnaHQgPSAnMjRweCc7XG4gICAgYXZhdGFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBSRVBBUkFUSU9OX1RIRU1FLmJvcmRlckNvbG9yO1xuICAgIGF2YXRhci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTJweCc7XG4gICAgYXZhdGFyLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIC8vIOeOqeWutuWQjeensFxuICAgIGNvbnN0IG5hbWVMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgcGxheWVySXRlbSwgJ1BsYXllck5hbWUnKTtcbiAgICBuYW1lTGFiZWwudGV4dCA9IGlzTG9jYWwgPyBg4piFICR7cGxheWVyTmFtZX0gKOS9oClgIDogcGxheWVyTmFtZTtcbiAgICBuYW1lTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLmNvbG9yID0gaXNMb2NhbCA/IFBSRVBBUkFUSU9OX1RIRU1FLnRleHRQcmltYXJ5IDogUFJFUEFSQVRJT05fVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBuYW1lTGFiZWwuc3R5bGUuZm9udFdlaWdodCA9IGlzTG9jYWwgPyAnYm9sZCcgOiAnbm9ybWFsJztcbiAgICBuYW1lTGFiZWwuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICAgIC8vIOWHhuWkh+eKtuaAgVxuICAgIGNvbnN0IHJlYWR5U3RhdHVzID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBwbGF5ZXJJdGVtLCAnUmVhZHlTdGF0dXMnKTtcbiAgICByZWFkeVN0YXR1cy50ZXh0ID0gJ+KPsyDnrYnlvoXkuK0uLi4nO1xuICAgIHJlYWR5U3RhdHVzLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIHJlYWR5U3RhdHVzLnN0eWxlLmNvbG9yID0gUFJFUEFSQVRJT05fVEhFTUUud2FybmluZztcbiAgICByZWFkeVN0YXR1cy5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgIHJlYWR5U3RhdHVzLnN0eWxlLndpZHRoID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIHJlYWR5U3RhdHVzLlNldEF0dHJpYnV0ZVN0cmluZygnZGF0YS1yZWFkeScsICdmYWxzZScpO1xufVxuLy8g5Yib5bu65ri45oiP6YWN572u5Yy65Z+fXG5mdW5jdGlvbiBjcmVhdGVHYW1lQ29uZmlnU2VjdGlvbihwYXJlbnQpIHtcbiAgICBjb25zdCBjb25maWdTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdHYW1lQ29uZmlnU2VjdGlvbicpO1xuICAgIGNvbmZpZ1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29uZmlnU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTIwcHgnO1xuICAgIGNvbmZpZ1NlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgY29uZmlnU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgY29uZmlnU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIGNvbmZpZ1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzIwcHgnO1xuICAgIGNvbmZpZ1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY29uZmlnU2VjdGlvbiwgJ0NvbmZpZ1NlY3Rpb25UaXRsZScpO1xuICAgIHNlY3Rpb25UaXRsZS50ZXh0ID0gJ+Kame+4jyDmuLjmiI/orr7nva4nO1xuICAgIHNlY3Rpb25UaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUuY29sb3IgPSBQUkVQQVJBVElPTl9USEVNRS50ZXh0QWNjZW50O1xuICAgIHNlY3Rpb25UaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgLy8g5ri45oiP5qih5byPXG4gICAgY29uc3QgbW9kZVJvdyA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29uZmlnU2VjdGlvbiwgJ0dhbWVNb2RlUm93Jyk7XG4gICAgbW9kZVJvdy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtb2RlUm93LnN0eWxlLmhlaWdodCA9ICczMHB4JztcbiAgICBtb2RlUm93LnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgY29uc3QgbW9kZUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBtb2RlUm93LCAnR2FtZU1vZGVMYWJlbCcpO1xuICAgIG1vZGVMYWJlbC50ZXh0ID0gJ+a4uOaIj+aooeW8jzonO1xuICAgIG1vZGVMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBtb2RlTGFiZWwuc3R5bGUuY29sb3IgPSBQUkVQQVJBVElPTl9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIG1vZGVMYWJlbC5zdHlsZS53aWR0aCA9ICcxMDBweCc7XG4gICAgY29uc3QgbW9kZVZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBtb2RlUm93LCAnR2FtZU1vZGVWYWx1ZScpO1xuICAgIG1vZGVWYWx1ZS50ZXh0ID0gJ+agh+WHhuWvueaImCc7XG4gICAgbW9kZVZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIG1vZGVWYWx1ZS5zdHlsZS5jb2xvciA9IFBSRVBBUkFUSU9OX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIG1vZGVWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIC8vIOWcsOWbvuS/oeaBr1xuICAgIGNvbnN0IG1hcFJvdyA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29uZmlnU2VjdGlvbiwgJ0dhbWVNYXBSb3cnKTtcbiAgICBtYXBSb3cuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFwUm93LnN0eWxlLmhlaWdodCA9ICczMHB4JztcbiAgICBtYXBSb3cuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBtYXBSb3cuc3R5bGUubWFyZ2luVG9wID0gJzVweCc7XG4gICAgY29uc3QgbWFwTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIG1hcFJvdywgJ0dhbWVNYXBMYWJlbCcpO1xuICAgIG1hcExhYmVsLnRleHQgPSAn5Zyw5Zu+Oic7XG4gICAgbWFwTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgbWFwTGFiZWwuc3R5bGUuY29sb3IgPSBQUkVQQVJBVElPTl9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIG1hcExhYmVsLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICBjb25zdCBtYXBWYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbWFwUm93LCAnR2FtZU1hcFZhbHVlJyk7XG4gICAgbWFwVmFsdWUudGV4dCA9ICdCYXR0bGUgTWFwJztcbiAgICBtYXBWYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBtYXBWYWx1ZS5zdHlsZS5jb2xvciA9IFBSRVBBUkFUSU9OX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIG1hcFZhbHVlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG59XG4vLyDliJvlu7rlh4blpIfmjInpkq7ljLrln59cbmZ1bmN0aW9uIGNyZWF0ZVJlYWR5QnV0dG9uU2VjdGlvbihwYXJlbnQpIHtcbiAgICBjb25zdCBidXR0b25TZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdSZWFkeUJ1dHRvblNlY3Rpb24nKTtcbiAgICBidXR0b25TZWN0aW9uLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGJ1dHRvblNlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzYwcHgnO1xuICAgIGJ1dHRvblNlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBidXR0b25TZWN0aW9uLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIC8vIOWPlua2iOWHhuWkh+aMiemSrlxuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGJ1dHRvblNlY3Rpb24sICdDYW5jZWxSZWFkeUJ1dHRvbicpO1xuICAgIGNhbmNlbEJ1dHRvbi50ZXh0ID0gJ+KdjCDlj5bmtojlh4blpIcnO1xuICAgIGNhbmNlbEJ1dHRvbi5zdHlsZS53aWR0aCA9ICcxODBweCc7XG4gICAgY2FuY2VsQnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICBjYW5jZWxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUFJFUEFSQVRJT05fVEhFTUUuZGFuZ2VyO1xuICAgIGNhbmNlbEJ1dHRvbi5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICBjYW5jZWxCdXR0b24uc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgY2FuY2VsQnV0dG9uLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgY2FuY2VsQnV0dG9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGNhbmNlbEJ1dHRvbi5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcbiAgICBjYW5jZWxCdXR0b24uc3R5bGUuYm94U2hhZG93ID0gJzBweCAycHggOHB4IHJnYmEoMjQ0LCA2NywgNTQsIDAuNCknO1xuICAgIGNhbmNlbEJ1dHRvbi5zdHlsZS52aXNpYmxlID0gJ2ZhbHNlJzsgLy8g6buY6K6k6ZqQ6JePXG4gICAgY2FuY2VsQnV0dG9uLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCflj5bmtojlh4blpIcnKTtcbiAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3BsYXllcl9ub3RfcmVhZHknLCB7fSk7XG4gICAgICAgIHVwZGF0ZVJlYWR5QnV0dG9uKGZhbHNlKTtcbiAgICB9KTtcbiAgICAvLyDlh4blpIfmjInpkq5cbiAgICBjb25zdCByZWFkeUJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGJ1dHRvblNlY3Rpb24sICdSZWFkeUJ1dHRvbicpO1xuICAgIHJlYWR5QnV0dG9uLnRleHQgPSAn4pyFIOWHhuWkh+Wwsee7qic7XG4gICAgcmVhZHlCdXR0b24uc3R5bGUud2lkdGggPSAnMTgwcHgnO1xuICAgIHJlYWR5QnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICByZWFkeUJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQUkVQQVJBVElPTl9USEVNRS5zdWNjZXNzO1xuICAgIHJlYWR5QnV0dG9uLnN0eWxlLmNvbG9yID0gJyNmZmZmZmYnO1xuICAgIHJlYWR5QnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIHJlYWR5QnV0dG9uLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgcmVhZHlCdXR0b24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgcmVhZHlCdXR0b24uc3R5bGUuYm94U2hhZG93ID0gJzBweCAycHggOHB4IHJnYmEoNzYsIDE3NSwgODAsIDAuNCknO1xuICAgIHJlYWR5QnV0dG9uLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCflh4blpIflsLHnu6onKTtcbiAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3BsYXllcl9yZWFkeScsIHt9KTtcbiAgICAgICAgdXBkYXRlUmVhZHlCdXR0b24odHJ1ZSk7XG4gICAgfSk7XG59XG4vLyDmm7TmlrDlh4blpIfmjInpkq7nirbmgIFcbmZ1bmN0aW9uIHVwZGF0ZVJlYWR5QnV0dG9uKGlzUmVhZHkpIHtcbiAgICBjb25zdCByZWFkeUJ1dHRvbiA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZWFkeUJ1dHRvbicpO1xuICAgIGNvbnN0IGNhbmNlbEJ1dHRvbiA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdDYW5jZWxSZWFkeUJ1dHRvbicpO1xuICAgIGlmIChyZWFkeUJ1dHRvbilcbiAgICAgICAgcmVhZHlCdXR0b24uc3R5bGUudmlzaWJsZSA9IGlzUmVhZHkgPyAnZmFsc2UnIDogJ3RydWUnO1xuICAgIGlmIChjYW5jZWxCdXR0b24pXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5zdHlsZS52aXNpYmxlID0gaXNSZWFkeSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgLy8g5pu05paw5pys5Zyw546p5a6254q25oCB5pi+56S6XG4gICAgY29uc3QgbG9jYWxQbGF5ZXJJdGVtID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1BsYXllckl0ZW1fMCcpO1xuICAgIGlmIChsb2NhbFBsYXllckl0ZW0pIHtcbiAgICAgICAgY29uc3QgcmVhZHlTdGF0dXMgPSBsb2NhbFBsYXllckl0ZW0uRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZWFkeVN0YXR1cycpO1xuICAgICAgICBpZiAocmVhZHlTdGF0dXMpIHtcbiAgICAgICAgICAgIHJlYWR5U3RhdHVzLnRleHQgPSBpc1JlYWR5ID8gJ+KchSDlt7Llh4blpIcnIDogJ+KPsyDnrYnlvoXkuK0uLi4nO1xuICAgICAgICAgICAgcmVhZHlTdGF0dXMuc3R5bGUuY29sb3IgPSBpc1JlYWR5ID8gUFJFUEFSQVRJT05fVEhFTUUuc3VjY2VzcyA6IFBSRVBBUkFUSU9OX1RIRU1FLndhcm5pbmc7XG4gICAgICAgICAgICByZWFkeVN0YXR1cy5TZXRBdHRyaWJ1dGVTdHJpbmcoJ2RhdGEtcmVhZHknLCBpc1JlYWR5ID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyDliJvlu7rlgJLorqHml7bmmL7npLpcbmZ1bmN0aW9uIGNyZWF0ZUNvdW50ZG93bkRpc3BsYXkocGFyZW50KSB7XG4gICAgY29uc3QgY291bnRkb3duUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0NvdW50ZG93bkRpc3BsYXknKTtcbiAgICBjb3VudGRvd25QYW5lbC5zdHlsZS53aWR0aCA9ICczMDBweCc7XG4gICAgY291bnRkb3duUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMHB4JztcbiAgICBjb3VudGRvd25QYW5lbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb3VudGRvd25QYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgY291bnRkb3duUGFuZWwuc3R5bGUubWFyZ2luVG9wID0gJzUwcHgnO1xuICAgIGNvdW50ZG93blBhbmVsLnN0eWxlLnZpc2libGUgPSAnZmFsc2UnO1xuICAgIGNvbnN0IGNvdW50ZG93bkxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBjb3VudGRvd25QYW5lbCwgJ0NvdW50ZG93bkxhYmVsJyk7XG4gICAgY291bnRkb3duTGFiZWwudGV4dCA9ICfmuLjmiI/ljbPlsIblvIDlp4suLi4nO1xuICAgIGNvdW50ZG93bkxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzI0cHgnO1xuICAgIGNvdW50ZG93bkxhYmVsLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgY291bnRkb3duTGFiZWwuc3R5bGUuY29sb3IgPSBQUkVQQVJBVElPTl9USEVNRS50ZXh0QWNjZW50O1xuICAgIGNvdW50ZG93bkxhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvdW50ZG93bkxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvdW50ZG93bkxhYmVsLnN0eWxlLnRleHRTaGFkb3cgPSAnMHB4IDBweCAxMHB4IHJnYmEoMjU1LCAxOTcsIDEyMiwgMC44KSc7XG4gICAgY291bnRkb3duTGFiZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIGNvbnN0IGNvdW50ZG93blZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBjb3VudGRvd25QYW5lbCwgJ0NvdW50ZG93blZhbHVlJyk7XG4gICAgY291bnRkb3duVmFsdWUudGV4dCA9ICc1JztcbiAgICBjb3VudGRvd25WYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICc0OHB4JztcbiAgICBjb3VudGRvd25WYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGNvdW50ZG93blZhbHVlLnN0eWxlLmNvbG9yID0gUFJFUEFSQVRJT05fVEhFTUUudGV4dFByaW1hcnk7XG4gICAgY291bnRkb3duVmFsdWUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY291bnRkb3duVmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY291bnRkb3duVmFsdWUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDE1cHggcmdiYSgxMzksIDE5NSwgNzQsIDEpJztcbn1cbi8vIOabtOaWsOWAkuiuoeaXtlxuZnVuY3Rpb24gdXBkYXRlQ291bnRkb3duKHNlY29uZHMpIHtcbiAgICBjb25zdCBjb3VudGRvd25QYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdDb3VudGRvd25EaXNwbGF5Jyk7XG4gICAgaWYgKCFjb3VudGRvd25QYW5lbClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGNvdW50ZG93blZhbHVlID0gY291bnRkb3duUGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdDb3VudGRvd25WYWx1ZScpO1xuICAgIGlmIChjb3VudGRvd25WYWx1ZSAmJiBzZWNvbmRzID4gMCkge1xuICAgICAgICBjb3VudGRvd25QYW5lbC5zdHlsZS52aXNpYmxlID0gJ3RydWUnO1xuICAgICAgICBjb3VudGRvd25WYWx1ZS50ZXh0ID0gc2Vjb25kcy50b1N0cmluZygpO1xuICAgICAgICAvLyDliqjnlLvmlYjmnpxcbiAgICAgICAgY291bnRkb3duVmFsdWUuc3R5bGUucHJlVHJhbnNmb3JtU2NhbGUyZCA9ICcxLjUnO1xuICAgICAgICAkLlNjaGVkdWxlKDAuMSwgKCkgPT4ge1xuICAgICAgICAgICAgY291bnRkb3duVmFsdWUuc3R5bGUucHJlVHJhbnNmb3JtU2NhbGUyZCA9ICcxLjAnO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc2Vjb25kcyA8PSAwKSB7XG4gICAgICAgIGNvdW50ZG93blBhbmVsLnN0eWxlLnZpc2libGUgPSAnZmFsc2UnO1xuICAgIH1cbn1cbi8vIOabtOaWsOeOqeWutuWHhuWkh+eKtuaAgVxuZnVuY3Rpb24gdXBkYXRlUGxheWVyUmVhZHkocGxheWVySWQsIGlzUmVhZHkpIHtcbiAgICBjb25zdCBwbGF5ZXJJdGVtID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFBsYXllckl0ZW1fJHtwbGF5ZXJJZH1gKTtcbiAgICBpZiAocGxheWVySXRlbSkge1xuICAgICAgICBjb25zdCByZWFkeVN0YXR1cyA9IHBsYXllckl0ZW0uRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZWFkeVN0YXR1cycpO1xuICAgICAgICBpZiAocmVhZHlTdGF0dXMpIHtcbiAgICAgICAgICAgIHJlYWR5U3RhdHVzLnRleHQgPSBpc1JlYWR5ID8gJ+KchSDlt7Llh4blpIcnIDogJ+KPsyDnrYnlvoXkuK0uLi4nO1xuICAgICAgICAgICAgcmVhZHlTdGF0dXMuc3R5bGUuY29sb3IgPSBpc1JlYWR5ID8gUFJFUEFSQVRJT05fVEhFTUUuc3VjY2VzcyA6IFBSRVBBUkFUSU9OX1RIRU1FLndhcm5pbmc7XG4gICAgICAgICAgICByZWFkeVN0YXR1cy5TZXRBdHRyaWJ1dGVTdHJpbmcoJ2RhdGEtcmVhZHknLCBpc1JlYWR5ID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyDmmL7npLov6ZqQ6JeP5YeG5aSH55WM6Z2iXG5mdW5jdGlvbiBzaG93UHJlcGFyYXRpb25TY3JlZW4oc2hvdykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdQcmVwYXJhdGlvblNjcmVlbkNvbnRhaW5lcicpO1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2libGUgPSBzaG93ID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICB9XG59XG4vLyDnm5HlkKzmuLjmiI/kuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdwcmVwYXJhdGlvbl9zdGFydCcsICgpID0+IHtcbiAgICAkLk1zZygnUHJlcGFyYXRpb24gc3RhcnRlZCcpO1xuICAgIHNob3dQcmVwYXJhdGlvblNjcmVlbih0cnVlKTtcbn0pO1xuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3ByZXBhcmF0aW9uX2VuZCcsICgpID0+IHtcbiAgICAkLk1zZygnUHJlcGFyYXRpb24gZW5kZWQnKTtcbiAgICBzaG93UHJlcGFyYXRpb25TY3JlZW4oZmFsc2UpO1xufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgncGxheWVyX3JlYWR5X2NoYW5nZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdQbGF5ZXIgcmVhZHkgY2hhbmdlZDonLCBkYXRhKTtcbiAgICB1cGRhdGVQbGF5ZXJSZWFkeShkYXRhLnBsYXllcklkLCBkYXRhLmlzUmVhZHkpO1xufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnY291bnRkb3duX3VwZGF0ZScsIChkYXRhKSA9PiB7XG4gICAgJC5Nc2coJ0NvdW50ZG93biB1cGRhdGU6JywgZGF0YSk7XG4gICAgdXBkYXRlQ291bnRkb3duKGRhdGEuc2Vjb25kcyk7XG59KTtcbi8vIOebkeWQrCBOZXRUYWJsZSDlj5jljJZcbmZ1bmN0aW9uIHNldHVwTmV0VGFibGVMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBuZXRUYWJsZSA9IEN1c3RvbU5ldFRhYmxlcy5HZXRUYWJsZVZhbHVlKCdnYW1lX3N0YXRlJywgJ3ByZXBhcmF0aW9uJyk7XG4gICAgaWYgKG5ldFRhYmxlKSB7XG4gICAgICAgIHVwZGF0ZVByZXBhcmF0aW9uU3RhdGUobmV0VGFibGUpO1xuICAgIH1cbiAgICBDdXN0b21OZXRUYWJsZXMuU3Vic2NyaWJlTmV0VGFibGVMaXN0ZW5lcignZ2FtZV9zdGF0ZScsICh0YWJsZU5hbWUsIGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3ByZXBhcmF0aW9uJykge1xuICAgICAgICAgICAgdXBkYXRlUHJlcGFyYXRpb25TdGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVByZXBhcmF0aW9uU3RhdGUoc3RhdGUpIHtcbiAgICBpZiAoIXN0YXRlKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHN0YXRlLmlzQWN0aXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2hvd1ByZXBhcmF0aW9uU2NyZWVuKHN0YXRlLmlzQWN0aXZlKTtcbiAgICB9XG4gICAgaWYgKHN0YXRlLmNvdW50ZG93biAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVwZGF0ZUNvdW50ZG93bihzdGF0ZS5jb3VudGRvd24pO1xuICAgIH1cbiAgICBpZiAoc3RhdGUucGxheWVycykge1xuICAgICAgICBPYmplY3Qua2V5cyhzdGF0ZS5wbGF5ZXJzKS5mb3JFYWNoKChwbGF5ZXJJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxheWVyID0gc3RhdGUucGxheWVyc1twbGF5ZXJJZF07XG4gICAgICAgICAgICB1cGRhdGVQbGF5ZXJSZWFkeShwYXJzZUludChwbGF5ZXJJZCksIHBsYXllci5pc1JlYWR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuLy8g5Yid5aeL5YyWXG5mdW5jdGlvbiBpbml0aWFsaXplUHJlcGFyYXRpb25TY3JlZW4oKSB7XG4gICAgJC5Nc2coJz09PSBJbml0aWFsaXppbmcgUHJlcGFyYXRpb24gU2NyZWVuID09PScpO1xuICAgICQuU2NoZWR1bGUoMC41LCBjcmVhdGVQcmVwYXJhdGlvblNjcmVlbik7XG4gICAgJC5TY2hlZHVsZSgxLjAsIHNldHVwTmV0VGFibGVMaXN0ZW5lcik7XG59XG4vLyDlr7zlh7rlhajlsYDlh73mlbBcbmdsb2JhbFRoaXMuUHJlcGFyYXRpb25TY3JlZW4gPSB7XG4gICAgY3JlYXRlOiBjcmVhdGVQcmVwYXJhdGlvblNjcmVlbixcbiAgICBzaG93OiBzaG93UHJlcGFyYXRpb25TY3JlZW4sXG4gICAgdXBkYXRlUmVhZHk6IHVwZGF0ZVJlYWR5QnV0dG9uLFxuICAgIHVwZGF0ZUNvdW50ZG93bjogdXBkYXRlQ291bnRkb3duLFxuICAgIHVwZGF0ZVBsYXllclJlYWR5OiB1cGRhdGVQbGF5ZXJSZWFkeVxufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuaW5pdGlhbGl6ZVByZXBhcmF0aW9uU2NyZWVuKCk7XG4kLk1zZygnPT09IFByZXBhcmF0aW9uIFNjcmVlbiBtb2R1bGUgbG9hZGVkIGNvbXBsZXRlbHkgPT09Jyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=