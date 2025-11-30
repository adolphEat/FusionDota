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
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\battleEndView\index.tsx ***!
  \****************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
// 自走棋战斗结算界面 - 初始版本（仅 UI 展示与本地测试钩子）
$.Msg('=== Battle End View Loading ===');
const DEFAULT_STAGE_OPTIONS = [
    { id: 'stage_easy', name: '绿意平原', difficulty: '简单' },
    { id: 'stage_medium', name: '霜冻峡谷', difficulty: '普通' },
    { id: 'stage_hard', name: '灼炎堡垒', difficulty: '困难' }
];
function getRoot() {
    const root = $.GetContextPanel();
    if (!root) {
        $.Msg('[BattleEndView] ERROR: Root panel not found!');
        return null;
    }
    return root;
}
function find(id) {
    const root = getRoot();
    if (!root) {
        return null;
    }
    const element = root.FindChildInLayoutFile(id);
    if (!element) {
        $.Msg(`[BattleEndView] WARNING: Element not found: ${id}`);
    }
    return element;
}
function ensureContainer() {
    const existing = find('BattleEndViewContainer');
    if (existing) {
        return existing;
    }
    const root = getRoot();
    const container = $.CreatePanel('Panel', root, 'BattleEndViewContainer');
    container.AddClass('battle_end_view_root');
    const background = $.CreatePanel('Panel', container, 'BattleEndBackground');
    background.AddClass('battle_end_view_background');
    const mask = $.CreatePanel('Panel', container, 'BattleEndMask');
    mask.AddClass('battle_end_view_mask');
    const main = $.CreatePanel('Panel', container, 'BattleEndMain');
    main.AddClass('battle_end_view_main');
    const title = $.CreatePanel('Panel', main, 'BattleEndTitle');
    title.AddClass('battle_end_view_title');
    $.CreatePanel('Label', title, 'BattleEndRound').AddClass('battle_end_view_round');
    $.CreatePanel('Label', title, 'BattleEndSummary').AddClass('battle_end_view_summary');
    const content = $.CreatePanel('Panel', main, 'BattleEndContent');
    content.AddClass('battle_end_view_content');
    const buttons = $.CreatePanel('Panel', main, 'BattleEndButtons');
    buttons.AddClass('battle_end_view_buttons');
    createButton(buttons, 'BattleEndContinueButton', '继续战斗', () => fireServerEvent('autochess_wave_continue'));
    createButton(buttons, 'BattleEndRewardButton', '领取奖励', () => fireServerEvent('autochess_wave_claim_reward'));
    createButton(buttons, 'BattleEndStageButton', '选择新关卡', () => toggleStageList());
    const stageList = $.CreatePanel('Panel', main, 'BattleEndStageList');
    stageList.AddClass('battle_end_view_stage_list');
    stageList.visible = false;
    return container;
}
function createButton(parent, id, text, onActivate) {
    const button = $.CreatePanel('Button', parent, id);
    button.AddClass('battle_end_view_button');
    const label = $.CreatePanel('Label', button, `${id}_Label`);
    label.text = text;
    button.SetPanelEvent('onactivate', () => {
        $.Msg(`[BattleEndView] Button clicked: ${text}`);
        onActivate();
    });
}
function fireServerEvent(eventName, payload = {}) {
    try {
        GameEvents.SendCustomGameEventToServer(eventName, payload);
    }
    catch (err) {
        $.Msg(`[BattleEndView] Failed to send event ${eventName}:`, err);
    }
}
function toggleStageList() {
    const list = find('BattleEndStageList');
    if (!list)
        return;
    list.visible = !list.visible;
}
function clearStats() {
    const content = find('BattleEndContent');
    if (!content)
        return;
    content.RemoveAndDeleteChildren();
}
function clearStageList() {
    const stageList = find('BattleEndStageList');
    if (!stageList)
        return;
    stageList.RemoveAndDeleteChildren();
}
function populateStats(stats) {
    const content = find('BattleEndContent');
    if (!content)
        return;
    stats.forEach((item, index) => {
        const row = $.CreatePanel('Panel', content, `BattleEndStat_${index}`);
        row.AddClass('battle_end_view_stat_line');
        const label = $.CreatePanel('Label', row, '');
        label.text = item.label;
        const value = $.CreatePanel('Label', row, '');
        value.AddClass('battle_end_view_stat_value');
        value.text = item.value;
    });
}
function populateStages(stages) {
    const stageList = find('BattleEndStageList');
    if (!stageList)
        return;
    stages.forEach((stage, index) => {
        const item = $.CreatePanel('Panel', stageList, `BattleEndStage_${index}`);
        item.AddClass('battle_end_view_stage_item');
        item.SetPanelEvent('onactivate', () => {
            $.Msg(`[BattleEndView] Stage selected: ${stage.id}`);
            fireServerEvent('autochess_wave_select_stage', { stageId: stage.id });
        });
        const nameLabel = $.CreatePanel('Label', item, `StageName_${index}`);
        nameLabel.text = `${stage.name} (${stage.difficulty})`;
    });
}
function updateView(payload) {
    if (!payload) {
        $.Msg('[BattleEndView] ERROR: updateView called with null/undefined payload');
        return;
    }
    
    // 确保容器存在
    const container = ensureContainer();
    if (!container) {
        $.Msg('[BattleEndView] ERROR: Failed to create container');
        return;
    }
    
    const roundLabel = find('BattleEndRound');
    if (roundLabel) {
        roundLabel.text = payload.round !== undefined ? `第 ${payload.round} 波战斗结束` : '战斗结算';
    } else {
        $.Msg('[BattleEndView] WARNING: BattleEndRound label not found');
    }
    
    const summaryLabel = find('BattleEndSummary');
    if (summaryLabel) {
        summaryLabel.text = payload.summary || '战斗统计与奖励如下：';
    } else {
        $.Msg('[BattleEndView] WARNING: BattleEndSummary label not found');
    }
    
    clearStats();
    populateStats(payload.stats || [
        { label: '造成伤害', value: '0' },
        { label: '承受伤害', value: '0' },
        { label: '击杀数', value: '0' }
    ]);
    clearStageList();
    populateStages(payload.stageOptions || DEFAULT_STAGE_OPTIONS);
    
    // 显示容器
    container.visible = true;
    container.style.visibility = 'visible';
    
    $.Msg('[BattleEndView] View updated successfully');
}
function hideView() {
    const container = find('BattleEndViewContainer');
    if (!container)
        return;
    container.visible = false;
    container.style.visibility = 'collapse';
}
function handleSettlement(event) {
    $.Msg('[BattleEndView] Received settlement payload:', event);
    updateView(event);
}
function handleDismiss() {
    $.Msg('[BattleEndView] Dismiss event received');
    hideView();
}
function handleRewardGranted(data) {
    $.Msg('[BattleEndView] Reward granted:', data);
}
function initializeSubscriptions() {
    GameEvents.Subscribe('autochess_wave_settlement', handleSettlement);
    GameEvents.Subscribe('autochess_wave_settlement_dismiss', handleDismiss);
    GameEvents.Subscribe('autochess_wave_reward_granted', handleRewardGranted);
}
function showDummy() {
    const dummyPayload = {
        round: 1,
        summary: '你成功抵御了第一波进攻！',
        rewardGold: 30,
        stats: [
            { label: '造成伤害', value: '12,540' },
            { label: '承受伤害', value: '8,320' },
            { label: '剩余棋子', value: '5' }
        ],
        stageOptions: DEFAULT_STAGE_OPTIONS
    };
    updateView(dummyPayload);
}
function initializeBattleEndView() {
    // 立即初始化容器，不延迟
    ensureContainer();
    initializeSubscriptions();
    $.Msg('=== Battle End View Initialized ===');
}

// 创建一个安全的包装函数，确保容器存在
function safeUpdateView(payload) {
    try {
        ensureContainer();
        updateView(payload);
    } catch (error) {
        $.Msg('[BattleEndView] Error in updateView:', error);
        // 如果出错，尝试重新初始化
        ensureContainer();
        updateView(payload);
    }
}

function safeHideView() {
    try {
        hideView();
    } catch (error) {
        $.Msg('[BattleEndView] Error in hideView:', error);
    }
}

function safeShowDummy() {
    try {
        ensureContainer();
        showDummy();
    } catch (error) {
        $.Msg('[BattleEndView] Error in showDummy:', error);
        // 如果出错，尝试重新初始化
        ensureContainer();
        showDummy();
    }
}

// 导出全局对象，使用安全包装函数
globalThis.BattleEndView = {
    show: safeUpdateView,
    hide: safeHideView,
    showDummy: safeShowDummy,
    // 保留原始函数供内部使用
    _updateView: updateView,
    _hideView: hideView,
    _showDummy: showDummy
};

// 立即初始化
initializeBattleEndView();

// 添加调试信息
$.Msg('[BattleEndView] BattleEndView module loaded and exported to globalThis');
$.Msg('[BattleEndView] BattleEndView object:', globalThis.BattleEndView);
$.Msg('[BattleEndView] BattleEndView.show function:', typeof globalThis.BattleEndView.show);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmF0dGxlRW5kVmlldy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUI7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsTUFBTSxrREFBa0Q7QUFDeEQsTUFBTSxvREFBb0Q7QUFDMUQsTUFBTTtBQUNOO0FBQ0E7QUFDQSxXQUFXLENBQUM7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0EsdUJBQXVCLENBQUM7QUFDeEI7QUFDQSxpQkFBaUIsQ0FBQztBQUNsQjtBQUNBLGlCQUFpQixDQUFDO0FBQ2xCO0FBQ0Esa0JBQWtCLENBQUM7QUFDbkI7QUFDQSxJQUFJLENBQUM7QUFDTCxJQUFJLENBQUM7QUFDTCxvQkFBb0IsQ0FBQztBQUNyQjtBQUNBLG9CQUFvQixDQUFDO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLENBQUM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixDQUFDO0FBQ3BCO0FBQ0Esa0JBQWtCLENBQUMsaUNBQWlDLEdBQUc7QUFDdkQ7QUFDQTtBQUNBLFFBQVEsQ0FBQyx3Q0FBd0MsS0FBSztBQUN0RDtBQUNBLEtBQUs7QUFDTDtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQyw2Q0FBNkMsVUFBVTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixDQUFDLGdEQUFnRCxNQUFNO0FBQzNFO0FBQ0Esc0JBQXNCLENBQUM7QUFDdkI7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixDQUFDLG1EQUFtRCxNQUFNO0FBQy9FO0FBQ0E7QUFDQSxZQUFZLENBQUMsd0NBQXdDLFNBQVM7QUFDOUQsNkRBQTZELG1CQUFtQjtBQUNoRixTQUFTO0FBQ1QsMEJBQTBCLENBQUMseUNBQXlDLE1BQU07QUFDMUUsNEJBQTRCLFlBQVksR0FBRyxpQkFBaUI7QUFDNUQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsZUFBZTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMkJBQTJCO0FBQ3JDLFVBQVUsMkJBQTJCO0FBQ3JDLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGdDQUFnQztBQUM5QyxjQUFjLCtCQUErQjtBQUM3QyxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xcYmF0dGxlRW5kVmlld1xcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gQHRzLW5vY2hlY2tcbi8vIOiHqui1sOaji+aImOaWl+e7k+eul+eVjOmdoiAtIOWIneWni+eJiOacrO+8iOS7hSBVSSDlsZXnpLrkuI7mnKzlnLDmtYvor5XpkqnlrZDvvIlcbiQuTXNnKCc9PT0gQmF0dGxlIEVuZCBWaWV3IExvYWRpbmcgPT09Jyk7XG5jb25zdCBERUZBVUxUX1NUQUdFX09QVElPTlMgPSBbXG4gICAgeyBpZDogJ3N0YWdlX2Vhc3knLCBuYW1lOiAn57u/5oSP5bmz5Y6fJywgZGlmZmljdWx0eTogJ+eugOWNlScgfSxcbiAgICB7IGlkOiAnc3RhZ2VfbWVkaXVtJywgbmFtZTogJ+mcnOWGu+WzoeiwtycsIGRpZmZpY3VsdHk6ICfmma7pgJonIH0sXG4gICAgeyBpZDogJ3N0YWdlX2hhcmQnLCBuYW1lOiAn54G854KO5aCh5Z6SJywgZGlmZmljdWx0eTogJ+WbsOmavicgfVxuXTtcbmZ1bmN0aW9uIGdldFJvb3QoKSB7XG4gICAgcmV0dXJuICQuR2V0Q29udGV4dFBhbmVsKCk7XG59XG5mdW5jdGlvbiBmaW5kKGlkKSB7XG4gICAgcmV0dXJuIGdldFJvb3QoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoaWQpO1xufVxuZnVuY3Rpb24gZW5zdXJlQ29udGFpbmVyKCkge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gZmluZCgnQmF0dGxlRW5kVmlld0NvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZykge1xuICAgICAgICByZXR1cm4gZXhpc3Rpbmc7XG4gICAgfVxuICAgIGNvbnN0IHJvb3QgPSBnZXRSb290KCk7XG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290LCAnQmF0dGxlRW5kVmlld0NvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5BZGRDbGFzcygnYmF0dGxlX2VuZF92aWV3X3Jvb3QnKTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdCYXR0bGVFbmRCYWNrZ3JvdW5kJyk7XG4gICAgYmFja2dyb3VuZC5BZGRDbGFzcygnYmF0dGxlX2VuZF92aWV3X2JhY2tncm91bmQnKTtcbiAgICBjb25zdCBtYXNrID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdCYXR0bGVFbmRNYXNrJyk7XG4gICAgbWFzay5BZGRDbGFzcygnYmF0dGxlX2VuZF92aWV3X21hc2snKTtcbiAgICBjb25zdCBtYWluID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdCYXR0bGVFbmRNYWluJyk7XG4gICAgbWFpbi5BZGRDbGFzcygnYmF0dGxlX2VuZF92aWV3X21haW4nKTtcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgbWFpbiwgJ0JhdHRsZUVuZFRpdGxlJyk7XG4gICAgdGl0bGUuQWRkQ2xhc3MoJ2JhdHRsZV9lbmRfdmlld190aXRsZScpO1xuICAgICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGUsICdCYXR0bGVFbmRSb3VuZCcpLkFkZENsYXNzKCdiYXR0bGVfZW5kX3ZpZXdfcm91bmQnKTtcbiAgICAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlLCAnQmF0dGxlRW5kU3VtbWFyeScpLkFkZENsYXNzKCdiYXR0bGVfZW5kX3ZpZXdfc3VtbWFyeScpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIG1haW4sICdCYXR0bGVFbmRDb250ZW50Jyk7XG4gICAgY29udGVudC5BZGRDbGFzcygnYmF0dGxlX2VuZF92aWV3X2NvbnRlbnQnKTtcbiAgICBjb25zdCBidXR0b25zID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBtYWluLCAnQmF0dGxlRW5kQnV0dG9ucycpO1xuICAgIGJ1dHRvbnMuQWRkQ2xhc3MoJ2JhdHRsZV9lbmRfdmlld19idXR0b25zJyk7XG4gICAgY3JlYXRlQnV0dG9uKGJ1dHRvbnMsICdCYXR0bGVFbmRDb250aW51ZUJ1dHRvbicsICfnu6fnu63miJjmlpcnLCAoKSA9PiBmaXJlU2VydmVyRXZlbnQoJ2F1dG9jaGVzc193YXZlX2NvbnRpbnVlJykpO1xuICAgIGNyZWF0ZUJ1dHRvbihidXR0b25zLCAnQmF0dGxlRW5kUmV3YXJkQnV0dG9uJywgJ+mihuWPluWlluWKsScsICgpID0+IGZpcmVTZXJ2ZXJFdmVudCgnYXV0b2NoZXNzX3dhdmVfY2xhaW1fcmV3YXJkJykpO1xuICAgIGNyZWF0ZUJ1dHRvbihidXR0b25zLCAnQmF0dGxlRW5kU3RhZ2VCdXR0b24nLCAn6YCJ5oup5paw5YWz5Y2hJywgKCkgPT4gdG9nZ2xlU3RhZ2VMaXN0KCkpO1xuICAgIGNvbnN0IHN0YWdlTGlzdCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgbWFpbiwgJ0JhdHRsZUVuZFN0YWdlTGlzdCcpO1xuICAgIHN0YWdlTGlzdC5BZGRDbGFzcygnYmF0dGxlX2VuZF92aWV3X3N0YWdlX2xpc3QnKTtcbiAgICBzdGFnZUxpc3QudmlzaWJsZSA9IGZhbHNlO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG5mdW5jdGlvbiBjcmVhdGVCdXR0b24ocGFyZW50LCBpZCwgdGV4dCwgb25BY3RpdmF0ZSkge1xuICAgIGNvbnN0IGJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIHBhcmVudCwgaWQpO1xuICAgIGJ1dHRvbi5BZGRDbGFzcygnYmF0dGxlX2VuZF92aWV3X2J1dHRvbicpO1xuICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBidXR0b24sIGAke2lkfV9MYWJlbGApO1xuICAgIGxhYmVsLnRleHQgPSB0ZXh0O1xuICAgIGJ1dHRvbi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIEJ1dHRvbiBjbGlja2VkOiAke3RleHR9YCk7XG4gICAgICAgIG9uQWN0aXZhdGUoKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZpcmVTZXJ2ZXJFdmVudChldmVudE5hbWUsIHBheWxvYWQgPSB7fSkge1xuICAgIHRyeSB7XG4gICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKGV2ZW50TmFtZSwgcGF5bG9hZCk7XG4gICAgfVxuICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBGYWlsZWQgdG8gc2VuZCBldmVudCAke2V2ZW50TmFtZX06YCwgZXJyKTtcbiAgICB9XG59XG5mdW5jdGlvbiB0b2dnbGVTdGFnZUxpc3QoKSB7XG4gICAgY29uc3QgbGlzdCA9IGZpbmQoJ0JhdHRsZUVuZFN0YWdlTGlzdCcpO1xuICAgIGlmICghbGlzdClcbiAgICAgICAgcmV0dXJuO1xuICAgIGxpc3QudmlzaWJsZSA9ICFsaXN0LnZpc2libGU7XG59XG5mdW5jdGlvbiBjbGVhclN0YXRzKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBmaW5kKCdCYXR0bGVFbmRDb250ZW50Jyk7XG4gICAgaWYgKCFjb250ZW50KVxuICAgICAgICByZXR1cm47XG4gICAgY29udGVudC5SZW1vdmVBbmREZWxldGVDaGlsZHJlbigpO1xufVxuZnVuY3Rpb24gY2xlYXJTdGFnZUxpc3QoKSB7XG4gICAgY29uc3Qgc3RhZ2VMaXN0ID0gZmluZCgnQmF0dGxlRW5kU3RhZ2VMaXN0Jyk7XG4gICAgaWYgKCFzdGFnZUxpc3QpXG4gICAgICAgIHJldHVybjtcbiAgICBzdGFnZUxpc3QuUmVtb3ZlQW5kRGVsZXRlQ2hpbGRyZW4oKTtcbn1cbmZ1bmN0aW9uIHBvcHVsYXRlU3RhdHMoc3RhdHMpIHtcbiAgICBjb25zdCBjb250ZW50ID0gZmluZCgnQmF0dGxlRW5kQ29udGVudCcpO1xuICAgIGlmICghY29udGVudClcbiAgICAgICAgcmV0dXJuO1xuICAgIHN0YXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGVudCwgYEJhdHRsZUVuZFN0YXRfJHtpbmRleH1gKTtcbiAgICAgICAgcm93LkFkZENsYXNzKCdiYXR0bGVfZW5kX3ZpZXdfc3RhdF9saW5lJyk7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByb3csICcnKTtcbiAgICAgICAgbGFiZWwudGV4dCA9IGl0ZW0ubGFiZWw7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByb3csICcnKTtcbiAgICAgICAgdmFsdWUuQWRkQ2xhc3MoJ2JhdHRsZV9lbmRfdmlld19zdGF0X3ZhbHVlJyk7XG4gICAgICAgIHZhbHVlLnRleHQgPSBpdGVtLnZhbHVlO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcG9wdWxhdGVTdGFnZXMoc3RhZ2VzKSB7XG4gICAgY29uc3Qgc3RhZ2VMaXN0ID0gZmluZCgnQmF0dGxlRW5kU3RhZ2VMaXN0Jyk7XG4gICAgaWYgKCFzdGFnZUxpc3QpXG4gICAgICAgIHJldHVybjtcbiAgICBzdGFnZXMuZm9yRWFjaCgoc3RhZ2UsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN0YWdlTGlzdCwgYEJhdHRsZUVuZFN0YWdlXyR7aW5kZXh9YCk7XG4gICAgICAgIGl0ZW0uQWRkQ2xhc3MoJ2JhdHRsZV9lbmRfdmlld19zdGFnZV9pdGVtJyk7XG4gICAgICAgIGl0ZW0uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gU3RhZ2Ugc2VsZWN0ZWQ6ICR7c3RhZ2UuaWR9YCk7XG4gICAgICAgICAgICBmaXJlU2VydmVyRXZlbnQoJ2F1dG9jaGVzc193YXZlX3NlbGVjdF9zdGFnZScsIHsgc3RhZ2VJZDogc3RhZ2UuaWQgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuYW1lTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGl0ZW0sIGBTdGFnZU5hbWVfJHtpbmRleH1gKTtcbiAgICAgICAgbmFtZUxhYmVsLnRleHQgPSBgJHtzdGFnZS5uYW1lfSAoJHtzdGFnZS5kaWZmaWN1bHR5fSlgO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gdXBkYXRlVmlldyhwYXlsb2FkKSB7XG4gICAgZW5zdXJlQ29udGFpbmVyKCk7XG4gICAgY29uc3Qgcm91bmRMYWJlbCA9IGZpbmQoJ0JhdHRsZUVuZFJvdW5kJyk7XG4gICAgaWYgKHJvdW5kTGFiZWwpIHtcbiAgICAgICAgcm91bmRMYWJlbC50ZXh0ID0gcGF5bG9hZC5yb3VuZCAhPT0gdW5kZWZpbmVkID8gYOesrCAke3BheWxvYWQucm91bmR9IOazouaImOaWl+e7k+adn2AgOiAn5oiY5paX57uT566XJztcbiAgICB9XG4gICAgY29uc3Qgc3VtbWFyeUxhYmVsID0gZmluZCgnQmF0dGxlRW5kU3VtbWFyeScpO1xuICAgIGlmIChzdW1tYXJ5TGFiZWwpIHtcbiAgICAgICAgc3VtbWFyeUxhYmVsLnRleHQgPSBwYXlsb2FkLnN1bW1hcnkgfHwgJ+aImOaWl+e7n+iuoeS4juWlluWKseWmguS4i++8mic7XG4gICAgfVxuICAgIGNsZWFyU3RhdHMoKTtcbiAgICBwb3B1bGF0ZVN0YXRzKHBheWxvYWQuc3RhdHMgfHwgW1xuICAgICAgICB7IGxhYmVsOiAn6YCg5oiQ5Lyk5a6zJywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGxhYmVsOiAn5om/5Y+X5Lyk5a6zJywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGxhYmVsOiAn5Ye75p2A5pWwJywgdmFsdWU6ICcwJyB9XG4gICAgXSk7XG4gICAgY2xlYXJTdGFnZUxpc3QoKTtcbiAgICBwb3B1bGF0ZVN0YWdlcyhwYXlsb2FkLnN0YWdlT3B0aW9ucyB8fCBERUZBVUxUX1NUQUdFX09QVElPTlMpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGVuc3VyZUNvbnRhaW5lcigpO1xuICAgIGNvbnRhaW5lci52aXNpYmxlID0gdHJ1ZTtcbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbn1cbmZ1bmN0aW9uIGhpZGVWaWV3KCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGZpbmQoJ0JhdHRsZUVuZFZpZXdDb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnRhaW5lci52aXNpYmxlID0gZmFsc2U7XG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xufVxuZnVuY3Rpb24gaGFuZGxlU2V0dGxlbWVudChldmVudCkge1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gUmVjZWl2ZWQgc2V0dGxlbWVudCBwYXlsb2FkOicsIGV2ZW50KTtcbiAgICB1cGRhdGVWaWV3KGV2ZW50KTtcbn1cbmZ1bmN0aW9uIGhhbmRsZURpc21pc3MoKSB7XG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBEaXNtaXNzIGV2ZW50IHJlY2VpdmVkJyk7XG4gICAgaGlkZVZpZXcoKTtcbn1cbmZ1bmN0aW9uIGhhbmRsZVJld2FyZEdyYW50ZWQoZGF0YSkge1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gUmV3YXJkIGdyYW50ZWQ6JywgZGF0YSk7XG59XG5mdW5jdGlvbiBpbml0aWFsaXplU3Vic2NyaXB0aW9ucygpIHtcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3dhdmVfc2V0dGxlbWVudCcsIGhhbmRsZVNldHRsZW1lbnQpO1xuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdhdXRvY2hlc3Nfd2F2ZV9zZXR0bGVtZW50X2Rpc21pc3MnLCBoYW5kbGVEaXNtaXNzKTtcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3dhdmVfcmV3YXJkX2dyYW50ZWQnLCBoYW5kbGVSZXdhcmRHcmFudGVkKTtcbn1cbmZ1bmN0aW9uIHNob3dEdW1teSgpIHtcbiAgICBjb25zdCBkdW1teVBheWxvYWQgPSB7XG4gICAgICAgIHJvdW5kOiAxLFxuICAgICAgICBzdW1tYXJ5OiAn5L2g5oiQ5Yqf5oq15b6h5LqG56ys5LiA5rOi6L+b5pS777yBJyxcbiAgICAgICAgcmV3YXJkR29sZDogMzAsXG4gICAgICAgIHN0YXRzOiBbXG4gICAgICAgICAgICB7IGxhYmVsOiAn6YCg5oiQ5Lyk5a6zJywgdmFsdWU6ICcxMiw1NDAnIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiAn5om/5Y+X5Lyk5a6zJywgdmFsdWU6ICc4LDMyMCcgfSxcbiAgICAgICAgICAgIHsgbGFiZWw6ICfliankvZnmo4vlrZAnLCB2YWx1ZTogJzUnIH1cbiAgICAgICAgXSxcbiAgICAgICAgc3RhZ2VPcHRpb25zOiBERUZBVUxUX1NUQUdFX09QVElPTlNcbiAgICB9O1xuICAgIHVwZGF0ZVZpZXcoZHVtbXlQYXlsb2FkKTtcbn1cbmZ1bmN0aW9uIGluaXRpYWxpemVCYXR0bGVFbmRWaWV3KCkge1xuICAgICQuU2NoZWR1bGUoMC4xLCAoKSA9PiB7XG4gICAgICAgIGVuc3VyZUNvbnRhaW5lcigpO1xuICAgICAgICBpbml0aWFsaXplU3Vic2NyaXB0aW9ucygpO1xuICAgICAgICAkLk1zZygnPT09IEJhdHRsZSBFbmQgVmlldyBJbml0aWFsaXplZCA9PT0nKTtcbiAgICB9KTtcbn1cbmdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldyA9IHtcbiAgICBzaG93OiB1cGRhdGVWaWV3LFxuICAgIGhpZGU6IGhpZGVWaWV3LFxuICAgIHNob3dEdW1teTogc2hvd0R1bW15XG59O1xuaW5pdGlhbGl6ZUJhdHRsZUVuZFZpZXcoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==