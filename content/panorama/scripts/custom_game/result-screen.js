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
/*!****************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\result-screen\index.tsx ***!
  \****************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
// 结算界面 - 参考 Dota2CustomGame 设计风格
$.Msg('=== Result Screen Loading ===');
// 主题配置（参考 Dota2CustomGame 风格）
const RESULT_THEME = {
    background: 'rgba(0, 0, 0, 0.9)',
    panelBg: 'rgba(33, 34, 31, 0.98)',
    borderColor: 'rgba(255, 197, 122, 0.5)',
    textPrimary: '#ffc57a',
    textSecondary: '#ffffff',
    success: '#4caf50',
    victory: '#ffd700',
    defeat: '#f44336',
    accent: '#9c27b0',
};
// 创建结算界面
function createResultScreen() {
    $.Msg('🔥 CREATING RESULT SCREEN - NEW VERSION 22:44 🔥');
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('ResultScreenContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'ResultScreenContainer');
    container.style.width = '100%';
    container.style.height = '100%';
    // 移除hittest设置，避免Panorama API问题
    container.style.backgroundColor = RESULT_THEME.background;
    container.style.zIndex = '10000';
    container.style.visible = 'false';
    container.AddClass('result_screen_root');
    // 创建背景遮罩
    createBackgroundMask(container);
    // 创建主面板
    const mainPanel = $.CreatePanel('Panel', container, 'ResultMainPanel');
    mainPanel.style.width = '900px';
    mainPanel.style.height = '700px';
    mainPanel.style.horizontalAlign = 'center';
    mainPanel.style.verticalAlign = 'center';
    mainPanel.style.backgroundColor = RESULT_THEME.panelBg;
    mainPanel.style.border = `3px solid ${RESULT_THEME.borderColor}`;
    mainPanel.style.borderRadius = '20px';
    mainPanel.style.boxShadow = '0px 0px 40px rgba(255, 197, 122, 0.4)';
    mainPanel.style.padding = '40px';
    mainPanel.style.flowChildren = 'down';
    // 创建结果标题
    createResultTitle(mainPanel);
    // 创建统计信息区域
    createStatsSection(mainPanel);
    // 创建奖励区域
    createRewardSection(mainPanel);
    // 创建按钮区域
    createButtonSection(mainPanel);
    $.Msg('Result screen created successfully!');
}
// 创建背景遮罩
function createBackgroundMask(parent) {
    const mask = $.CreatePanel('Panel', parent, 'ResultBackgroundMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'gradient(linear, 0% 0%, 0% 100%, from(#00000000), color-stop(0.5, #000000aa), to(#000000))';
    mask.style.zIndex = '-1';
}
// 创建结果标题
function createResultTitle(parent) {
    const titleSection = $.CreatePanel('Panel', parent, 'ResultTitleSection');
    titleSection.style.width = '100%';
    titleSection.style.height = '120px';
    titleSection.style.marginBottom = '30px';
    titleSection.style.flowChildren = 'down';
    const titleIcon = $.CreatePanel('Label', titleSection, 'ResultTitleIcon');
    titleIcon.text = '🏆';
    titleIcon.style.fontSize = '60px';
    titleIcon.style.textAlign = 'center';
    titleIcon.style.horizontalAlign = 'center';
    titleIcon.style.marginBottom = '10px';
    const titleText = $.CreatePanel('Label', titleSection, 'ResultTitleText');
    titleText.text = '胜利！';
    titleText.style.fontSize = '48px';
    titleText.style.fontWeight = 'bold';
    titleText.style.color = RESULT_THEME.victory;
    titleText.style.textAlign = 'center';
    titleText.style.horizontalAlign = 'center';
    titleText.style.textShadow = '0px 0px 20px rgba(255, 215, 0, 0.8)';
    const subtitle = $.CreatePanel('Label', titleSection, 'ResultSubtitle');
    subtitle.text = '恭喜你完成了本局游戏！';
    subtitle.style.fontSize = '20px';
    subtitle.style.color = RESULT_THEME.textSecondary;
    subtitle.style.textAlign = 'center';
    subtitle.style.horizontalAlign = 'center';
    subtitle.style.opacity = '0.8';
}
// 创建统计信息区域
function createStatsSection(parent) {
    const statsSection = $.CreatePanel('Panel', parent, 'StatsSection');
    statsSection.style.width = '100%';
    statsSection.style.height = '300px';
    statsSection.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    statsSection.style.borderRadius = '15px';
    statsSection.style.padding = '20px';
    statsSection.style.marginBottom = '30px';
    statsSection.style.flowChildren = 'down';
    const sectionTitle = $.CreatePanel('Label', statsSection, 'StatsSectionTitle');
    sectionTitle.text = '📊 本局统计';
    sectionTitle.style.fontSize = '24px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = RESULT_THEME.textPrimary;
    sectionTitle.style.marginBottom = '20px';
    // 创建统计项容器
    const statsContainer = $.CreatePanel('Panel', statsSection, 'StatsContainer');
    statsContainer.style.width = '100%';
    statsContainer.style.height = 'fill-parent-flow(1)';
    statsContainer.style.flowChildren = 'right';
    // 左列统计
    const leftStats = $.CreatePanel('Panel', statsContainer, 'LeftStats');
    leftStats.style.width = '50%';
    leftStats.style.height = '100%';
    leftStats.style.flowChildren = 'down';
    leftStats.style.padding = '10px';
    // 右列统计
    const rightStats = $.CreatePanel('Panel', statsContainer, 'RightStats');
    rightStats.style.width = '50%';
    rightStats.style.height = '100%';
    rightStats.style.flowChildren = 'down';
    rightStats.style.padding = '10px';
    // 统计项
    const statItems = [
        { id: 'kills', label: '⚔️ 击杀数', icon: '⚔️', side: 'left' },
        { id: 'deaths', label: '💀 死亡数', icon: '💀', side: 'left' },
        { id: 'assists', label: '🤝 助攻数', icon: '🤝', side: 'left' },
        { id: 'damage_dealt', label: '💥 造成伤害', icon: '💥', side: 'right' },
        { id: 'damage_taken', label: '🛡️ 受到伤害', icon: '🛡️', side: 'right' },
        { id: 'healing', label: '💚 治疗量', icon: '💚', side: 'right' },
        { id: 'gold_earned', label: '💰 获得金币', icon: '💰', side: 'left' },
        { id: 'exp_gained', label: '⭐ 获得经验', icon: '⭐', side: 'left' },
        { id: 'game_time', label: '⏰ 游戏时长', icon: '⏰', side: 'right' },
        { id: 'level_reached', label: '📈 达到等级', icon: '📈', side: 'right' },
    ];
    statItems.forEach((item) => {
        const parentPanel = item.side === 'left' ? leftStats : rightStats;
        createStatItem(parentPanel, item.id, item.label, item.icon);
    });
}
// 创建统计项
function createStatItem(parent, id, label, icon) {
    const statItem = $.CreatePanel('Panel', parent, `StatItem_${id}`);
    statItem.style.width = '100%';
    statItem.style.height = '35px';
    statItem.style.marginBottom = '10px';
    statItem.style.flowChildren = 'right';
    statItem.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    statItem.style.borderRadius = '8px';
    statItem.style.padding = '8px';
    const iconLabel = $.CreatePanel('Label', statItem, `${id}_Icon`);
    iconLabel.text = icon;
    iconLabel.style.fontSize = '18px';
    iconLabel.style.width = '30px';
    iconLabel.style.verticalAlign = 'center';
    const labelText = $.CreatePanel('Label', statItem, `${id}_Label`);
    labelText.text = label;
    labelText.style.fontSize = '14px';
    labelText.style.color = RESULT_THEME.textSecondary;
    labelText.style.width = '150px';
    labelText.style.verticalAlign = 'center';
    const valueText = $.CreatePanel('Label', statItem, `${id}_Value`);
    valueText.text = '0';
    valueText.style.fontSize = '16px';
    valueText.style.fontWeight = 'bold';
    valueText.style.color = RESULT_THEME.textPrimary;
    valueText.style.horizontalAlign = 'right';
    valueText.style.width = 'fill-parent-flow(1)';
    valueText.style.verticalAlign = 'center';
}
// 创建奖励区域
function createRewardSection(parent) {
    const rewardSection = $.CreatePanel('Panel', parent, 'RewardSection');
    rewardSection.style.width = '100%';
    rewardSection.style.height = '120px';
    rewardSection.style.backgroundColor = 'rgba(156, 39, 176, 0.2)';
    rewardSection.style.borderRadius = '15px';
    rewardSection.style.padding = '20px';
    rewardSection.style.marginBottom = '30px';
    rewardSection.style.flowChildren = 'down';
    const sectionTitle = $.CreatePanel('Label', rewardSection, 'RewardSectionTitle');
    sectionTitle.text = '🎁 本局奖励';
    sectionTitle.style.fontSize = '20px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = RESULT_THEME.textAccent;
    sectionTitle.style.marginBottom = '15px';
    const rewardContainer = $.CreatePanel('Panel', rewardSection, 'RewardContainer');
    rewardContainer.style.width = '100%';
    rewardContainer.style.height = 'fill-parent-flow(1)';
    rewardContainer.style.flowChildren = 'right';
    const rewards = [
        { id: 'gold_reward', label: '💰 金币', value: '0', color: RESULT_THEME.victory },
        { id: 'exp_reward', label: '⭐ 经验', value: '0', color: RESULT_THEME.textPrimary },
        { id: 'items_reward', label: '📦 物品', value: '0', color: RESULT_THEME.accent },
    ];
    rewards.forEach((reward, index) => {
        const rewardItem = $.CreatePanel('Panel', rewardContainer, `RewardItem_${reward.id}`);
        rewardItem.style.width = '33.33%';
        rewardItem.style.height = '100%';
        rewardItem.style.flowChildren = 'down';
        rewardItem.style.horizontalAlign = 'center';
        const rewardIcon = $.CreatePanel('Label', rewardItem, `${reward.id}_Icon`);
        rewardIcon.text = reward.label.split(' ')[0];
        rewardIcon.style.fontSize = '32px';
        rewardIcon.style.horizontalAlign = 'center';
        rewardIcon.style.marginBottom = '5px';
        const rewardLabel = $.CreatePanel('Label', rewardItem, `${reward.id}_Label`);
        rewardLabel.text = reward.label.split(' ')[1];
        rewardLabel.style.fontSize = '14px';
        rewardLabel.style.color = RESULT_THEME.textSecondary;
        rewardLabel.style.horizontalAlign = 'center';
        rewardLabel.style.marginBottom = '5px';
        const rewardValue = $.CreatePanel('Label', rewardItem, `${reward.id}_Value`);
        rewardValue.text = reward.value;
        rewardValue.style.fontSize = '20px';
        rewardValue.style.fontWeight = 'bold';
        rewardValue.style.color = reward.color;
        rewardValue.style.horizontalAlign = 'center';
    });
}
// 创建按钮区域
function createButtonSection(parent) {
    const buttonSection = $.CreatePanel('Panel', parent, 'ButtonSection');
    buttonSection.style.width = '100%';
    buttonSection.style.height = '60px';
    buttonSection.style.flowChildren = 'right';
    buttonSection.style.horizontalAlign = 'center';
    // 返回大厅按钮
    const lobbyButton = $.CreatePanel('Button', buttonSection, 'LobbyButton');
    lobbyButton.text = '🏠 返回大厅';
    lobbyButton.style.width = '200px';
    lobbyButton.style.height = '50px';
    lobbyButton.style.backgroundColor = RESULT_THEME.textPrimary;
    lobbyButton.style.color = '#ffffff';
    lobbyButton.style.fontSize = '16px';
    lobbyButton.style.fontWeight = 'bold';
    lobbyButton.style.borderRadius = '10px';
    lobbyButton.style.marginRight = '20px';
    lobbyButton.style.boxShadow = '0px 2px 10px rgba(255, 197, 122, 0.4)';
    lobbyButton.SetPanelEvent('onactivate', () => {
        $.Msg('返回大厅');
        GameEvents.SendCustomGameEventToServer('return_to_lobby', {});
    });
    // 再来一局按钮
    const replayButton = $.CreatePanel('Button', buttonSection, 'ReplayButton');
    replayButton.text = '🔄 再来一局';
    replayButton.style.width = '200px';
    replayButton.style.height = '50px';
    replayButton.style.backgroundColor = RESULT_THEME.success;
    replayButton.style.color = '#ffffff';
    replayButton.style.fontSize = '16px';
    replayButton.style.fontWeight = 'bold';
    replayButton.style.borderRadius = '10px';
    replayButton.style.boxShadow = '0px 2px 10px rgba(76, 175, 80, 0.4)';
    replayButton.SetPanelEvent('onactivate', () => {
        $.Msg('再来一局');
        GameEvents.SendCustomGameEventToServer('play_again', {});
    });
}
// 更新结果（胜利/失败）
function updateResult(isVictory, stats) {
    const container = $.GetContextPanel().FindChildInLayoutFile('ResultScreenContainer');
    if (!container)
        return;
    const titleIcon = container.FindChildInLayoutFile('ResultTitleIcon');
    const titleText = container.FindChildInLayoutFile('ResultTitleText');
    if (titleIcon && titleText) {
        if (isVictory) {
            titleIcon.text = '🏆';
            titleText.text = '胜利！';
            titleText.style.color = RESULT_THEME.victory;
            titleText.style.textShadow = '0px 0px 20px rgba(255, 215, 0, 0.8)';
        }
        else {
            titleIcon.text = '💀';
            titleText.text = '失败';
            titleText.style.color = RESULT_THEME.defeat;
            titleText.style.textShadow = '0px 0px 20px rgba(244, 67, 54, 0.8)';
        }
    }
    // 更新统计数据
    if (stats) {
        Object.keys(stats).forEach((key) => {
            var _a;
            const valueLabel = (_a = container.FindChildInLayoutFile(`StatItem_${key}`)) === null || _a === void 0 ? void 0 : _a.FindChildInLayoutFile(`${key}_Value`);
            if (valueLabel && stats[key] !== undefined) {
                valueLabel.text = formatStatValue(key, stats[key]);
            }
        });
    }
    // 更新奖励
    updateRewards(stats);
}
// 格式化统计值
function formatStatValue(key, value) {
    if (typeof value === 'number') {
        if (key.includes('damage') || key.includes('healing')) {
            return value.toLocaleString();
        }
        else if (key.includes('time')) {
            return formatTime(value);
        }
        return value.toString();
    }
    return String(value);
}
// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
// 更新奖励
function updateRewards(stats) {
    var _a, _b, _c;
    const container = $.GetContextPanel().FindChildInLayoutFile('ResultScreenContainer');
    if (!container || !stats)
        return;
    if (stats.gold_reward !== undefined) {
        const goldValue = (_a = container.FindChildInLayoutFile('RewardItem_gold_reward')) === null || _a === void 0 ? void 0 : _a.FindChildInLayoutFile('gold_reward_Value');
        if (goldValue)
            goldValue.text = stats.gold_reward.toString();
    }
    if (stats.exp_reward !== undefined) {
        const expValue = (_b = container.FindChildInLayoutFile('RewardItem_exp_reward')) === null || _b === void 0 ? void 0 : _b.FindChildInLayoutFile('exp_reward_Value');
        if (expValue)
            expValue.text = stats.exp_reward.toString();
    }
    if (stats.items_reward !== undefined) {
        const itemsValue = (_c = container.FindChildInLayoutFile('RewardItem_items_reward')) === null || _c === void 0 ? void 0 : _c.FindChildInLayoutFile('items_reward_Value');
        if (itemsValue)
            itemsValue.text = stats.items_reward.toString();
    }
}
// 显示/隐藏结算界面
function showResultScreen(show) {
    const container = $.GetContextPanel().FindChildInLayoutFile('ResultScreenContainer');
    if (container) {
        container.style.visible = show ? 'true' : 'false';
        if (show) {
            // 添加动画效果
            container.style.preTransformScale2d = '0.8';
            container.style.opacity = '0';
            $.Schedule(0.1, () => {
                container.style.preTransformScale2d = '1.0';
                container.style.opacity = '1';
                container.style.transition = 'all 0.3s ease';
            });
        }
    }
}
// 监听游戏事件
GameEvents.Subscribe('game_end', (data) => {
    $.Msg('Game ended:', data);
    updateResult(data.isVictory, data.stats);
    showResultScreen(true);
});
// 监听 NetTable 变化
function setupNetTableListener() {
    const netTable = CustomNetTables.GetTableValue('game_state', 'result');
    if (netTable) {
        updateResultState(netTable);
    }
    CustomNetTables.SubscribeNetTableListener('game_state', (tableName, key, value) => {
        if (key === 'result') {
            updateResultState(value);
        }
    });
}
function updateResultState(state) {
    if (!state)
        return;
    if (state.isVisible !== undefined) {
        showResultScreen(state.isVisible);
    }
    if (state.isVictory !== undefined && state.stats) {
        updateResult(state.isVictory, state.stats);
    }
}
// 初始化
function initializeResultScreen() {
    $.Msg('=== Initializing Result Screen ===');
    $.Schedule(0.5, createResultScreen);
    $.Schedule(1.0, setupNetTableListener);
}
// 导出全局函数
globalThis.ResultScreen = {
    create: createResultScreen,
    show: showResultScreen,
    update: updateResult,
    updateRewards: updateRewards
};
// 立即执行初始化
initializeResultScreen();
$.Msg('=== Result Screen module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLENBQUM7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTCxJQUFJLENBQUM7QUFDTCxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgdmFyIFwiJFwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vRDpcXFN0ZWFtQXBwXFxzdGVhbWFwcHNcXGNvbW1vblxcZG90YSAyIGJldGFcXGNvbnRlbnRcXGRvdGFfYWRkb25zXFxmdXNpb25cXHBhbm9yYW1hXFxzcmNcXHJlc3VsdC1zY3JlZW5cXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIEB0cy1ub2NoZWNrXG4vLyDnu5PnrpfnlYzpnaIgLSDlj4LogIMgRG90YTJDdXN0b21HYW1lIOiuvuiuoemjjuagvFxuJC5Nc2coJz09PSBSZXN1bHQgU2NyZWVuIExvYWRpbmcgPT09Jyk7XG4vLyDkuLvpopjphY3nva7vvIjlj4LogIMgRG90YTJDdXN0b21HYW1lIOmjjuagvO+8iVxuY29uc3QgUkVTVUxUX1RIRU1FID0ge1xuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuOSknLFxuICAgIHBhbmVsQmc6ICdyZ2JhKDMzLCAzNCwgMzEsIDAuOTgpJyxcbiAgICBib3JkZXJDb2xvcjogJ3JnYmEoMjU1LCAxOTcsIDEyMiwgMC41KScsXG4gICAgdGV4dFByaW1hcnk6ICcjZmZjNTdhJyxcbiAgICB0ZXh0U2Vjb25kYXJ5OiAnI2ZmZmZmZicsXG4gICAgc3VjY2VzczogJyM0Y2FmNTAnLFxuICAgIHZpY3Rvcnk6ICcjZmZkNzAwJyxcbiAgICBkZWZlYXQ6ICcjZjQ0MzM2JyxcbiAgICBhY2NlbnQ6ICcjOWMyN2IwJyxcbn07XG4vLyDliJvlu7rnu5PnrpfnlYzpnaJcbmZ1bmN0aW9uIGNyZWF0ZVJlc3VsdFNjcmVlbigpIHtcbiAgICAkLk1zZygn8J+UpSBDUkVBVElORyBSRVNVTFQgU0NSRUVOIC0gTkVXIFZFUlNJT04gMjI6NDQg8J+UpScpO1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ0Vycm9yOiBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOWIoOmZpOW3suWtmOWcqOeahOWuueWZqFxuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUmVzdWx0U2NyZWVuQ29udGFpbmVyJyk7XG4gICAgaWYgKGV4aXN0aW5nQ29udGFpbmVyKSB7XG4gICAgICAgIGV4aXN0aW5nQ29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgIH1cbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ1Jlc3VsdFNjcmVlbkNvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIC8vIOenu+mZpGhpdHRlc3Torr7nva7vvIzpgb/lhY1QYW5vcmFtYSBBUEnpl67pophcbiAgICBjb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUkVTVUxUX1RIRU1FLmJhY2tncm91bmQ7XG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICcxMDAwMCc7XG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2libGUgPSAnZmFsc2UnO1xuICAgIGNvbnRhaW5lci5BZGRDbGFzcygncmVzdWx0X3NjcmVlbl9yb290Jyk7XG4gICAgLy8g5Yib5bu66IOM5pmv6YGu572pXG4gICAgY3JlYXRlQmFja2dyb3VuZE1hc2soY29udGFpbmVyKTtcbiAgICAvLyDliJvlu7rkuLvpnaLmnb9cbiAgICBjb25zdCBtYWluUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ1Jlc3VsdE1haW5QYW5lbCcpO1xuICAgIG1haW5QYW5lbC5zdHlsZS53aWR0aCA9ICc5MDBweCc7XG4gICAgbWFpblBhbmVsLnN0eWxlLmhlaWdodCA9ICc3MDBweCc7XG4gICAgbWFpblBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1haW5QYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFpblBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFJFU1VMVF9USEVNRS5wYW5lbEJnO1xuICAgIG1haW5QYW5lbC5zdHlsZS5ib3JkZXIgPSBgM3B4IHNvbGlkICR7UkVTVUxUX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgbWFpblBhbmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcyMHB4JztcbiAgICBtYWluUGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJzBweCAwcHggNDBweCByZ2JhKDI1NSwgMTk3LCAxMjIsIDAuNCknO1xuICAgIG1haW5QYW5lbC5zdHlsZS5wYWRkaW5nID0gJzQwcHgnO1xuICAgIG1haW5QYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g5Yib5bu657uT5p6c5qCH6aKYXG4gICAgY3JlYXRlUmVzdWx0VGl0bGUobWFpblBhbmVsKTtcbiAgICAvLyDliJvlu7rnu5/orqHkv6Hmga/ljLrln59cbiAgICBjcmVhdGVTdGF0c1NlY3Rpb24obWFpblBhbmVsKTtcbiAgICAvLyDliJvlu7rlpZblirHljLrln59cbiAgICBjcmVhdGVSZXdhcmRTZWN0aW9uKG1haW5QYW5lbCk7XG4gICAgLy8g5Yib5bu65oyJ6ZKu5Yy65Z+fXG4gICAgY3JlYXRlQnV0dG9uU2VjdGlvbihtYWluUGFuZWwpO1xuICAgICQuTXNnKCdSZXN1bHQgc2NyZWVuIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xufVxuLy8g5Yib5bu66IOM5pmv6YGu572pXG5mdW5jdGlvbiBjcmVhdGVCYWNrZ3JvdW5kTWFzayhwYXJlbnQpIHtcbiAgICBjb25zdCBtYXNrID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdSZXN1bHRCYWNrZ3JvdW5kTWFzaycpO1xuICAgIG1hc2suc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JhZGllbnQobGluZWFyLCAwJSAwJSwgMCUgMTAwJSwgZnJvbSgjMDAwMDAwMDApLCBjb2xvci1zdG9wKDAuNSwgIzAwMDAwMGFhKSwgdG8oIzAwMDAwMCkpJztcbiAgICBtYXNrLnN0eWxlLnpJbmRleCA9ICctMSc7XG59XG4vLyDliJvlu7rnu5PmnpzmoIfpophcbmZ1bmN0aW9uIGNyZWF0ZVJlc3VsdFRpdGxlKHBhcmVudCkge1xuICAgIGNvbnN0IHRpdGxlU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnUmVzdWx0VGl0bGVTZWN0aW9uJyk7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTIwcHgnO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMzBweCc7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBjb25zdCB0aXRsZUljb24gPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlU2VjdGlvbiwgJ1Jlc3VsdFRpdGxlSWNvbicpO1xuICAgIHRpdGxlSWNvbi50ZXh0ID0gJ/Cfj4YnO1xuICAgIHRpdGxlSWNvbi5zdHlsZS5mb250U2l6ZSA9ICc2MHB4JztcbiAgICB0aXRsZUljb24uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGl0bGVJY29uLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlSWNvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgY29uc3QgdGl0bGVUZXh0ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aXRsZVNlY3Rpb24sICdSZXN1bHRUaXRsZVRleHQnKTtcbiAgICB0aXRsZVRleHQudGV4dCA9ICfog5zliKnvvIEnO1xuICAgIHRpdGxlVGV4dC5zdHlsZS5mb250U2l6ZSA9ICc0OHB4JztcbiAgICB0aXRsZVRleHQuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZVRleHQuc3R5bGUuY29sb3IgPSBSRVNVTFRfVEhFTUUudmljdG9yeTtcbiAgICB0aXRsZVRleHQuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGl0bGVUZXh0LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlVGV4dC5zdHlsZS50ZXh0U2hhZG93ID0gJzBweCAwcHggMjBweCByZ2JhKDI1NSwgMjE1LCAwLCAwLjgpJztcbiAgICBjb25zdCBzdWJ0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUmVzdWx0U3VidGl0bGUnKTtcbiAgICBzdWJ0aXRsZS50ZXh0ID0gJ+aBreWWnOS9oOWujOaIkOS6huacrOWxgOa4uOaIj++8gSc7XG4gICAgc3VidGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgc3VidGl0bGUuc3R5bGUuY29sb3IgPSBSRVNVTFRfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBzdWJ0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBzdWJ0aXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBzdWJ0aXRsZS5zdHlsZS5vcGFjaXR5ID0gJzAuOCc7XG59XG4vLyDliJvlu7rnu5/orqHkv6Hmga/ljLrln59cbmZ1bmN0aW9uIGNyZWF0ZVN0YXRzU2VjdGlvbihwYXJlbnQpIHtcbiAgICBjb25zdCBzdGF0c1NlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1N0YXRzU2VjdGlvbicpO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzMwMHB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC40KSc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzMwcHgnO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzdGF0c1NlY3Rpb24sICdTdGF0c1NlY3Rpb25UaXRsZScpO1xuICAgIHNlY3Rpb25UaXRsZS50ZXh0ID0gJ/Cfk4og5pys5bGA57uf6K6hJztcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgc2VjdGlvblRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgc2VjdGlvblRpdGxlLnN0eWxlLmNvbG9yID0gUkVTVUxUX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIHNlY3Rpb25UaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMjBweCc7XG4gICAgLy8g5Yib5bu657uf6K6h6aG55a655ZmoXG4gICAgY29uc3Qgc3RhdHNDb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzQ29udGFpbmVyJyk7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIHN0YXRzQ29udGFpbmVyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgLy8g5bem5YiX57uf6K6hXG4gICAgY29uc3QgbGVmdFN0YXRzID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBzdGF0c0NvbnRhaW5lciwgJ0xlZnRTdGF0cycpO1xuICAgIGxlZnRTdGF0cy5zdHlsZS53aWR0aCA9ICc1MCUnO1xuICAgIGxlZnRTdGF0cy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbGVmdFN0YXRzLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBsZWZ0U3RhdHMuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICAvLyDlj7PliJfnu5/orqFcbiAgICBjb25zdCByaWdodFN0YXRzID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBzdGF0c0NvbnRhaW5lciwgJ1JpZ2h0U3RhdHMnKTtcbiAgICByaWdodFN0YXRzLnN0eWxlLndpZHRoID0gJzUwJSc7XG4gICAgcmlnaHRTdGF0cy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgcmlnaHRTdGF0cy5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgcmlnaHRTdGF0cy5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgIC8vIOe7n+iuoemhuVxuICAgIGNvbnN0IHN0YXRJdGVtcyA9IFtcbiAgICAgICAgeyBpZDogJ2tpbGxzJywgbGFiZWw6ICfimpTvuI8g5Ye75p2A5pWwJywgaWNvbjogJ+KalO+4jycsIHNpZGU6ICdsZWZ0JyB9LFxuICAgICAgICB7IGlkOiAnZGVhdGhzJywgbGFiZWw6ICfwn5KAIOatu+S6oeaVsCcsIGljb246ICfwn5KAJywgc2lkZTogJ2xlZnQnIH0sXG4gICAgICAgIHsgaWQ6ICdhc3Npc3RzJywgbGFiZWw6ICfwn6SdIOWKqeaUu+aVsCcsIGljb246ICfwn6SdJywgc2lkZTogJ2xlZnQnIH0sXG4gICAgICAgIHsgaWQ6ICdkYW1hZ2VfZGVhbHQnLCBsYWJlbDogJ/CfkqUg6YCg5oiQ5Lyk5a6zJywgaWNvbjogJ/CfkqUnLCBzaWRlOiAncmlnaHQnIH0sXG4gICAgICAgIHsgaWQ6ICdkYW1hZ2VfdGFrZW4nLCBsYWJlbDogJ/Cfm6HvuI8g5Y+X5Yiw5Lyk5a6zJywgaWNvbjogJ/Cfm6HvuI8nLCBzaWRlOiAncmlnaHQnIH0sXG4gICAgICAgIHsgaWQ6ICdoZWFsaW5nJywgbGFiZWw6ICfwn5KaIOayu+eWl+mHjycsIGljb246ICfwn5KaJywgc2lkZTogJ3JpZ2h0JyB9LFxuICAgICAgICB7IGlkOiAnZ29sZF9lYXJuZWQnLCBsYWJlbDogJ/CfkrAg6I635b6X6YeR5biBJywgaWNvbjogJ/CfkrAnLCBzaWRlOiAnbGVmdCcgfSxcbiAgICAgICAgeyBpZDogJ2V4cF9nYWluZWQnLCBsYWJlbDogJ+KtkCDojrflvpfnu4/pqownLCBpY29uOiAn4q2QJywgc2lkZTogJ2xlZnQnIH0sXG4gICAgICAgIHsgaWQ6ICdnYW1lX3RpbWUnLCBsYWJlbDogJ+KPsCDmuLjmiI/ml7bplb8nLCBpY29uOiAn4o+wJywgc2lkZTogJ3JpZ2h0JyB9LFxuICAgICAgICB7IGlkOiAnbGV2ZWxfcmVhY2hlZCcsIGxhYmVsOiAn8J+TiCDovr7liLDnrYnnuqcnLCBpY29uOiAn8J+TiCcsIHNpZGU6ICdyaWdodCcgfSxcbiAgICBdO1xuICAgIHN0YXRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudFBhbmVsID0gaXRlbS5zaWRlID09PSAnbGVmdCcgPyBsZWZ0U3RhdHMgOiByaWdodFN0YXRzO1xuICAgICAgICBjcmVhdGVTdGF0SXRlbShwYXJlbnRQYW5lbCwgaXRlbS5pZCwgaXRlbS5sYWJlbCwgaXRlbS5pY29uKTtcbiAgICB9KTtcbn1cbi8vIOWIm+W7uue7n+iuoemhuVxuZnVuY3Rpb24gY3JlYXRlU3RhdEl0ZW0ocGFyZW50LCBpZCwgbGFiZWwsIGljb24pIHtcbiAgICBjb25zdCBzdGF0SXRlbSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgU3RhdEl0ZW1fJHtpZH1gKTtcbiAgICBzdGF0SXRlbS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzdGF0SXRlbS5zdHlsZS5oZWlnaHQgPSAnMzVweCc7XG4gICAgc3RhdEl0ZW0uc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIHN0YXRJdGVtLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgc3RhdEl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSknO1xuICAgIHN0YXRJdGVtLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIHN0YXRJdGVtLnN0eWxlLnBhZGRpbmcgPSAnOHB4JztcbiAgICBjb25zdCBpY29uTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRJdGVtLCBgJHtpZH1fSWNvbmApO1xuICAgIGljb25MYWJlbC50ZXh0ID0gaWNvbjtcbiAgICBpY29uTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgaWNvbkxhYmVsLnN0eWxlLndpZHRoID0gJzMwcHgnO1xuICAgIGljb25MYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29uc3QgbGFiZWxUZXh0ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzdGF0SXRlbSwgYCR7aWR9X0xhYmVsYCk7XG4gICAgbGFiZWxUZXh0LnRleHQgPSBsYWJlbDtcbiAgICBsYWJlbFRleHQuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgbGFiZWxUZXh0LnN0eWxlLmNvbG9yID0gUkVTVUxUX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgbGFiZWxUZXh0LnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICBsYWJlbFRleHQuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnN0IHZhbHVlVGV4dCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdEl0ZW0sIGAke2lkfV9WYWx1ZWApO1xuICAgIHZhbHVlVGV4dC50ZXh0ID0gJzAnO1xuICAgIHZhbHVlVGV4dC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICB2YWx1ZVRleHQuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB2YWx1ZVRleHQuc3R5bGUuY29sb3IgPSBSRVNVTFRfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgdmFsdWVUZXh0LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgdmFsdWVUZXh0LnN0eWxlLndpZHRoID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIHZhbHVlVGV4dC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG59XG4vLyDliJvlu7rlpZblirHljLrln59cbmZ1bmN0aW9uIGNyZWF0ZVJld2FyZFNlY3Rpb24ocGFyZW50KSB7XG4gICAgY29uc3QgcmV3YXJkU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnUmV3YXJkU2VjdGlvbicpO1xuICAgIHJld2FyZFNlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgcmV3YXJkU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTIwcHgnO1xuICAgIHJld2FyZFNlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTU2LCAzOSwgMTc2LCAwLjIpJztcbiAgICByZXdhcmRTZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICByZXdhcmRTZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgcmV3YXJkU2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMzBweCc7XG4gICAgcmV3YXJkU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByZXdhcmRTZWN0aW9uLCAnUmV3YXJkU2VjdGlvblRpdGxlJyk7XG4gICAgc2VjdGlvblRpdGxlLnRleHQgPSAn8J+OgSDmnKzlsYDlpZblirEnO1xuICAgIHNlY3Rpb25UaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUuY29sb3IgPSBSRVNVTFRfVEhFTUUudGV4dEFjY2VudDtcbiAgICBzZWN0aW9uVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIGNvbnN0IHJld2FyZENvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcmV3YXJkU2VjdGlvbiwgJ1Jld2FyZENvbnRhaW5lcicpO1xuICAgIHJld2FyZENvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICByZXdhcmRDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIHJld2FyZENvbnRhaW5lci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGNvbnN0IHJld2FyZHMgPSBbXG4gICAgICAgIHsgaWQ6ICdnb2xkX3Jld2FyZCcsIGxhYmVsOiAn8J+SsCDph5HluIEnLCB2YWx1ZTogJzAnLCBjb2xvcjogUkVTVUxUX1RIRU1FLnZpY3RvcnkgfSxcbiAgICAgICAgeyBpZDogJ2V4cF9yZXdhcmQnLCBsYWJlbDogJ+KtkCDnu4/pqownLCB2YWx1ZTogJzAnLCBjb2xvcjogUkVTVUxUX1RIRU1FLnRleHRQcmltYXJ5IH0sXG4gICAgICAgIHsgaWQ6ICdpdGVtc19yZXdhcmQnLCBsYWJlbDogJ/Cfk6Yg54mp5ZOBJywgdmFsdWU6ICcwJywgY29sb3I6IFJFU1VMVF9USEVNRS5hY2NlbnQgfSxcbiAgICBdO1xuICAgIHJld2FyZHMuZm9yRWFjaCgocmV3YXJkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCByZXdhcmRJdGVtID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByZXdhcmRDb250YWluZXIsIGBSZXdhcmRJdGVtXyR7cmV3YXJkLmlkfWApO1xuICAgICAgICByZXdhcmRJdGVtLnN0eWxlLndpZHRoID0gJzMzLjMzJSc7XG4gICAgICAgIHJld2FyZEl0ZW0uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICByZXdhcmRJdGVtLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAgICAgcmV3YXJkSXRlbS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY29uc3QgcmV3YXJkSWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgcmV3YXJkSXRlbSwgYCR7cmV3YXJkLmlkfV9JY29uYCk7XG4gICAgICAgIHJld2FyZEljb24udGV4dCA9IHJld2FyZC5sYWJlbC5zcGxpdCgnICcpWzBdO1xuICAgICAgICByZXdhcmRJY29uLnN0eWxlLmZvbnRTaXplID0gJzMycHgnO1xuICAgICAgICByZXdhcmRJY29uLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICByZXdhcmRJY29uLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgICAgICBjb25zdCByZXdhcmRMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgcmV3YXJkSXRlbSwgYCR7cmV3YXJkLmlkfV9MYWJlbGApO1xuICAgICAgICByZXdhcmRMYWJlbC50ZXh0ID0gcmV3YXJkLmxhYmVsLnNwbGl0KCcgJylbMV07XG4gICAgICAgIHJld2FyZExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgICAgICByZXdhcmRMYWJlbC5zdHlsZS5jb2xvciA9IFJFU1VMVF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgICAgICByZXdhcmRMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgcmV3YXJkTGFiZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzVweCc7XG4gICAgICAgIGNvbnN0IHJld2FyZFZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByZXdhcmRJdGVtLCBgJHtyZXdhcmQuaWR9X1ZhbHVlYCk7XG4gICAgICAgIHJld2FyZFZhbHVlLnRleHQgPSByZXdhcmQudmFsdWU7XG4gICAgICAgIHJld2FyZFZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgICAgICByZXdhcmRWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICByZXdhcmRWYWx1ZS5zdHlsZS5jb2xvciA9IHJld2FyZC5jb2xvcjtcbiAgICAgICAgcmV3YXJkVmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgfSk7XG59XG4vLyDliJvlu7rmjInpkq7ljLrln59cbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvblNlY3Rpb24ocGFyZW50KSB7XG4gICAgY29uc3QgYnV0dG9uU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQnV0dG9uU2VjdGlvbicpO1xuICAgIGJ1dHRvblNlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgYnV0dG9uU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnNjBweCc7XG4gICAgYnV0dG9uU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGJ1dHRvblNlY3Rpb24uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g6L+U5Zue5aSn5Y6F5oyJ6ZKuXG4gICAgY29uc3QgbG9iYnlCdXR0b24gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBidXR0b25TZWN0aW9uLCAnTG9iYnlCdXR0b24nKTtcbiAgICBsb2JieUJ1dHRvbi50ZXh0ID0gJ/Cfj6Ag6L+U5Zue5aSn5Y6FJztcbiAgICBsb2JieUJ1dHRvbi5zdHlsZS53aWR0aCA9ICcyMDBweCc7XG4gICAgbG9iYnlCdXR0b24uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgIGxvYmJ5QnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFJFU1VMVF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICBsb2JieUJ1dHRvbi5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICBsb2JieUJ1dHRvbi5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBsb2JieUJ1dHRvbi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGxvYmJ5QnV0dG9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBsb2JieUJ1dHRvbi5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcbiAgICBsb2JieUJ1dHRvbi5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDJweCAxMHB4IHJnYmEoMjU1LCAxOTcsIDEyMiwgMC40KSc7XG4gICAgbG9iYnlCdXR0b24uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ+i/lOWbnuWkp+WOhScpO1xuICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncmV0dXJuX3RvX2xvYmJ5Jywge30pO1xuICAgIH0pO1xuICAgIC8vIOWGjeadpeS4gOWxgOaMiemSrlxuICAgIGNvbnN0IHJlcGxheUJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGJ1dHRvblNlY3Rpb24sICdSZXBsYXlCdXR0b24nKTtcbiAgICByZXBsYXlCdXR0b24udGV4dCA9ICfwn5SEIOWGjeadpeS4gOWxgCc7XG4gICAgcmVwbGF5QnV0dG9uLnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgICByZXBsYXlCdXR0b24uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgIHJlcGxheUJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBSRVNVTFRfVEhFTUUuc3VjY2VzcztcbiAgICByZXBsYXlCdXR0b24uc3R5bGUuY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgcmVwbGF5QnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIHJlcGxheUJ1dHRvbi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJlcGxheUJ1dHRvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgcmVwbGF5QnV0dG9uLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggMnB4IDEwcHggcmdiYSg3NiwgMTc1LCA4MCwgMC40KSc7XG4gICAgcmVwbGF5QnV0dG9uLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCflho3mnaXkuIDlsYAnKTtcbiAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3BsYXlfYWdhaW4nLCB7fSk7XG4gICAgfSk7XG59XG4vLyDmm7TmlrDnu5PmnpzvvIjog5zliKkv5aSx6LSl77yJXG5mdW5jdGlvbiB1cGRhdGVSZXN1bHQoaXNWaWN0b3J5LCBzdGF0cykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZXN1bHRTY3JlZW5Db250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IHRpdGxlSWNvbiA9IGNvbnRhaW5lci5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1Jlc3VsdFRpdGxlSWNvbicpO1xuICAgIGNvbnN0IHRpdGxlVGV4dCA9IGNvbnRhaW5lci5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1Jlc3VsdFRpdGxlVGV4dCcpO1xuICAgIGlmICh0aXRsZUljb24gJiYgdGl0bGVUZXh0KSB7XG4gICAgICAgIGlmIChpc1ZpY3RvcnkpIHtcbiAgICAgICAgICAgIHRpdGxlSWNvbi50ZXh0ID0gJ/Cfj4YnO1xuICAgICAgICAgICAgdGl0bGVUZXh0LnRleHQgPSAn6IOc5Yip77yBJztcbiAgICAgICAgICAgIHRpdGxlVGV4dC5zdHlsZS5jb2xvciA9IFJFU1VMVF9USEVNRS52aWN0b3J5O1xuICAgICAgICAgICAgdGl0bGVUZXh0LnN0eWxlLnRleHRTaGFkb3cgPSAnMHB4IDBweCAyMHB4IHJnYmEoMjU1LCAyMTUsIDAsIDAuOCknO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGl0bGVJY29uLnRleHQgPSAn8J+SgCc7XG4gICAgICAgICAgICB0aXRsZVRleHQudGV4dCA9ICflpLHotKUnO1xuICAgICAgICAgICAgdGl0bGVUZXh0LnN0eWxlLmNvbG9yID0gUkVTVUxUX1RIRU1FLmRlZmVhdDtcbiAgICAgICAgICAgIHRpdGxlVGV4dC5zdHlsZS50ZXh0U2hhZG93ID0gJzBweCAwcHggMjBweCByZ2JhKDI0NCwgNjcsIDU0LCAwLjgpJztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDmm7TmlrDnu5/orqHmlbDmja5cbiAgICBpZiAoc3RhdHMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoc3RhdHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgY29uc3QgdmFsdWVMYWJlbCA9IChfYSA9IGNvbnRhaW5lci5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFN0YXRJdGVtXyR7a2V5fWApKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuRmluZENoaWxkSW5MYXlvdXRGaWxlKGAke2tleX1fVmFsdWVgKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZUxhYmVsICYmIHN0YXRzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlTGFiZWwudGV4dCA9IGZvcm1hdFN0YXRWYWx1ZShrZXksIHN0YXRzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8g5pu05paw5aWW5YqxXG4gICAgdXBkYXRlUmV3YXJkcyhzdGF0cyk7XG59XG4vLyDmoLzlvI/ljJbnu5/orqHlgLxcbmZ1bmN0aW9uIGZvcm1hdFN0YXRWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKGtleS5pbmNsdWRlcygnZGFtYWdlJykgfHwga2V5LmluY2x1ZGVzKCdoZWFsaW5nJykpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0xvY2FsZVN0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleS5pbmNsdWRlcygndGltZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0VGltZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xufVxuLy8g5qC85byP5YyW5pe26Ze0XG5mdW5jdGlvbiBmb3JtYXRUaW1lKHNlY29uZHMpIHtcbiAgICBjb25zdCBtaW5zID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjApO1xuICAgIGNvbnN0IHNlY3MgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCk7XG4gICAgcmV0dXJuIGAke21pbnN9OiR7c2Vjcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YDtcbn1cbi8vIOabtOaWsOWlluWKsVxuZnVuY3Rpb24gdXBkYXRlUmV3YXJkcyhzdGF0cykge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZXN1bHRTY3JlZW5Db250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lciB8fCAhc3RhdHMpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoc3RhdHMuZ29sZF9yZXdhcmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBnb2xkVmFsdWUgPSAoX2EgPSBjb250YWluZXIuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZXdhcmRJdGVtX2dvbGRfcmV3YXJkJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ2dvbGRfcmV3YXJkX1ZhbHVlJyk7XG4gICAgICAgIGlmIChnb2xkVmFsdWUpXG4gICAgICAgICAgICBnb2xkVmFsdWUudGV4dCA9IHN0YXRzLmdvbGRfcmV3YXJkLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChzdGF0cy5leHBfcmV3YXJkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZXhwVmFsdWUgPSAoX2IgPSBjb250YWluZXIuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZXdhcmRJdGVtX2V4cF9yZXdhcmQnKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnZXhwX3Jld2FyZF9WYWx1ZScpO1xuICAgICAgICBpZiAoZXhwVmFsdWUpXG4gICAgICAgICAgICBleHBWYWx1ZS50ZXh0ID0gc3RhdHMuZXhwX3Jld2FyZC50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoc3RhdHMuaXRlbXNfcmV3YXJkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgaXRlbXNWYWx1ZSA9IChfYyA9IGNvbnRhaW5lci5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1Jld2FyZEl0ZW1faXRlbXNfcmV3YXJkJykpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ2l0ZW1zX3Jld2FyZF9WYWx1ZScpO1xuICAgICAgICBpZiAoaXRlbXNWYWx1ZSlcbiAgICAgICAgICAgIGl0ZW1zVmFsdWUudGV4dCA9IHN0YXRzLml0ZW1zX3Jld2FyZC50b1N0cmluZygpO1xuICAgIH1cbn1cbi8vIOaYvuekui/pmpDol4/nu5PnrpfnlYzpnaJcbmZ1bmN0aW9uIHNob3dSZXN1bHRTY3JlZW4oc2hvdykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdSZXN1bHRTY3JlZW5Db250YWluZXInKTtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmxlID0gc2hvdyA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgICAgIGlmIChzaG93KSB7XG4gICAgICAgICAgICAvLyDmt7vliqDliqjnlLvmlYjmnpxcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5wcmVUcmFuc2Zvcm1TY2FsZTJkID0gJzAuOCc7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAgICQuU2NoZWR1bGUoMC4xLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLnByZVRyYW5zZm9ybVNjYWxlMmQgPSAnMS4wJztcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC4zcyBlYXNlJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8g55uR5ZCs5ri45oiP5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9lbmQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdHYW1lIGVuZGVkOicsIGRhdGEpO1xuICAgIHVwZGF0ZVJlc3VsdChkYXRhLmlzVmljdG9yeSwgZGF0YS5zdGF0cyk7XG4gICAgc2hvd1Jlc3VsdFNjcmVlbih0cnVlKTtcbn0pO1xuLy8g55uR5ZCsIE5ldFRhYmxlIOWPmOWMllxuZnVuY3Rpb24gc2V0dXBOZXRUYWJsZUxpc3RlbmVyKCkge1xuICAgIGNvbnN0IG5ldFRhYmxlID0gQ3VzdG9tTmV0VGFibGVzLkdldFRhYmxlVmFsdWUoJ2dhbWVfc3RhdGUnLCAncmVzdWx0Jyk7XG4gICAgaWYgKG5ldFRhYmxlKSB7XG4gICAgICAgIHVwZGF0ZVJlc3VsdFN0YXRlKG5ldFRhYmxlKTtcbiAgICB9XG4gICAgQ3VzdG9tTmV0VGFibGVzLlN1YnNjcmliZU5ldFRhYmxlTGlzdGVuZXIoJ2dhbWVfc3RhdGUnLCAodGFibGVOYW1lLCBrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09ICdyZXN1bHQnKSB7XG4gICAgICAgICAgICB1cGRhdGVSZXN1bHRTdGF0ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZVJlc3VsdFN0YXRlKHN0YXRlKSB7XG4gICAgaWYgKCFzdGF0ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChzdGF0ZS5pc1Zpc2libGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzaG93UmVzdWx0U2NyZWVuKHN0YXRlLmlzVmlzaWJsZSk7XG4gICAgfVxuICAgIGlmIChzdGF0ZS5pc1ZpY3RvcnkgIT09IHVuZGVmaW5lZCAmJiBzdGF0ZS5zdGF0cykge1xuICAgICAgICB1cGRhdGVSZXN1bHQoc3RhdGUuaXNWaWN0b3J5LCBzdGF0ZS5zdGF0cyk7XG4gICAgfVxufVxuLy8g5Yid5aeL5YyWXG5mdW5jdGlvbiBpbml0aWFsaXplUmVzdWx0U2NyZWVuKCkge1xuICAgICQuTXNnKCc9PT0gSW5pdGlhbGl6aW5nIFJlc3VsdCBTY3JlZW4gPT09Jyk7XG4gICAgJC5TY2hlZHVsZSgwLjUsIGNyZWF0ZVJlc3VsdFNjcmVlbik7XG4gICAgJC5TY2hlZHVsZSgxLjAsIHNldHVwTmV0VGFibGVMaXN0ZW5lcik7XG59XG4vLyDlr7zlh7rlhajlsYDlh73mlbBcbmdsb2JhbFRoaXMuUmVzdWx0U2NyZWVuID0ge1xuICAgIGNyZWF0ZTogY3JlYXRlUmVzdWx0U2NyZWVuLFxuICAgIHNob3c6IHNob3dSZXN1bHRTY3JlZW4sXG4gICAgdXBkYXRlOiB1cGRhdGVSZXN1bHQsXG4gICAgdXBkYXRlUmV3YXJkczogdXBkYXRlUmV3YXJkc1xufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuaW5pdGlhbGl6ZVJlc3VsdFNjcmVlbigpO1xuJC5Nc2coJz09PSBSZXN1bHQgU2NyZWVuIG1vZHVsZSBsb2FkZWQgY29tcGxldGVseSA9PT0nKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==