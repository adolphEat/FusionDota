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
/*!*************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\end_screen\index.tsx ***!
  \*************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
// 游戏结束界面 - FusionDota
$.Msg('=== End Screen Panel Loading ===');
// 创建结束界面UI
function createEndScreenUI() {
    $.Msg('Creating end screen UI...');
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('EndScreenContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'EndScreenContainer');
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    container.style.zIndex = '1000';
    // 创建内容面板
    const contentPanel = $.CreatePanel('Panel', container, 'EndScreenContent');
    contentPanel.style.position = 'absolute';
    contentPanel.style.width = '800px';
    contentPanel.style.height = '600px';
    contentPanel.style.backgroundColor = 'rgba(20, 20, 40, 0.95)';
    contentPanel.style.border = '3px solid #4a90e2';
    contentPanel.style.borderRadius = '15px';
    contentPanel.style.horizontalAlign = 'center';
    contentPanel.style.verticalAlign = 'center';
    contentPanel.style.padding = '30px';
    contentPanel.style.boxShadow = '0 0 30px rgba(74, 144, 226, 0.5)';
    // 标题
    const title = $.CreatePanel('Label', contentPanel, 'EndScreenTitle');
    title.text = '🎮 游戏结束';
    title.style.color = '#4a90e2';
    title.style.fontSize = '36px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '30px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';
    // 结果信息
    const resultLabel = $.CreatePanel('Label', contentPanel, 'GameResult');
    resultLabel.text = '等待游戏结果...';
    resultLabel.style.color = '#ffffff';
    resultLabel.style.fontSize = '24px';
    resultLabel.style.textAlign = 'center';
    resultLabel.style.marginBottom = '20px';
    // 统计信息容器
    const statsContainer = $.CreatePanel('Panel', contentPanel, 'StatsContainer');
    statsContainer.style.width = '100%';
    statsContainer.style.height = '300px';
    statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    statsContainer.style.borderRadius = '10px';
    statsContainer.style.padding = '20px';
    statsContainer.style.marginBottom = '30px';
    // 统计标题
    const statsTitle = $.CreatePanel('Label', statsContainer, 'StatsTitle');
    statsTitle.text = '📊 游戏统计';
    statsTitle.style.color = '#ffd700';
    statsTitle.style.fontSize = '20px';
    statsTitle.style.fontWeight = 'bold';
    statsTitle.style.marginBottom = '15px';
    // 统计项目
    const statsItems = [
        { label: '游戏时长:', value: '00:00:00', id: 'GameTime' },
        { label: '击杀数:', value: '0', id: 'Kills' },
        { label: '死亡数:', value: '0', id: 'Deaths' },
        { label: '助攻数:', value: '0', id: 'Assists' },
        { label: '获得金币:', value: '0', id: 'GoldEarned' },
        { label: '造成伤害:', value: '0', id: 'DamageDealt' }
    ];
    statsItems.forEach((item, index) => {
        const itemPanel = $.CreatePanel('Panel', statsContainer, `StatsItem_${item.id}`);
        itemPanel.style.width = '100%';
        itemPanel.style.height = '30px';
        itemPanel.style.marginBottom = '8px';
        const label = $.CreatePanel('Label', itemPanel, `${item.id}_Label`);
        label.text = item.label;
        label.style.color = '#cccccc';
        label.style.fontSize = '16px';
        label.style.width = '150px';
        const value = $.CreatePanel('Label', itemPanel, `${item.id}_Value`);
        value.text = item.value;
        value.style.color = '#ffffff';
        value.style.fontSize = '16px';
        value.style.fontWeight = 'bold';
        value.style.horizontalAlign = 'right';
        value.style.width = '200px';
    });
    // 按钮容器
    const buttonContainer = $.CreatePanel('Panel', contentPanel, 'EndScreenButtons');
    buttonContainer.style.width = '100%';
    buttonContainer.style.height = '60px';
    buttonContainer.style.horizontalAlign = 'center';
    // 重新开始按钮
    const restartButton = $.CreatePanel('Button', buttonContainer, 'RestartButton');
    restartButton.text = '🔄 重新开始';
    restartButton.style.width = '180px';
    restartButton.style.height = '50px';
    restartButton.style.backgroundColor = '#28a745';
    restartButton.style.color = 'white';
    restartButton.style.fontSize = '18px';
    restartButton.style.fontWeight = 'bold';
    restartButton.style.border = '2px solid #1e7e34';
    restartButton.style.borderRadius = '8px';
    restartButton.style.margin = '5px';
    restartButton.SetPanelEvent('onactivate', () => {
        $.Msg('重新开始按钮被点击');
        GameEvents.SendCustomGameEventToServer('restart_game', {});
    });
    // 返回主菜单按钮
    const menuButton = $.CreatePanel('Button', buttonContainer, 'MenuButton');
    menuButton.text = '🏠 返回主菜单';
    menuButton.style.width = '180px';
    menuButton.style.height = '50px';
    menuButton.style.backgroundColor = '#6c757d';
    menuButton.style.color = 'white';
    menuButton.style.fontSize = '18px';
    menuButton.style.fontWeight = 'bold';
    menuButton.style.border = '2px solid #545b62';
    menuButton.style.borderRadius = '8px';
    menuButton.style.margin = '5px';
    menuButton.SetPanelEvent('onactivate', () => {
        $.Msg('返回主菜单按钮被点击');
        GameEvents.SendCustomGameEventToServer('return_to_menu', {});
    });
    $.Msg('End screen UI created successfully!');
}
// 更新游戏统计
function updateGameStats(stats) {
    $.Msg('Updating game stats:', stats);
    const updateStat = (id, value) => {
        var _a;
        const statValue = (_a = $.GetContextPanel().FindChildInLayoutFile(`StatsItem_${id}`)) === null || _a === void 0 ? void 0 : _a.FindChildInLayoutFile(`${id}_Value`);
        if (statValue) {
            statValue.text = value;
        }
    };
    if (stats.gameTime)
        updateStat('GameTime', stats.gameTime);
    if (stats.kills)
        updateStat('Kills', stats.kills.toString());
    if (stats.deaths)
        updateStat('Deaths', stats.deaths.toString());
    if (stats.assists)
        updateStat('Assists', stats.assists.toString());
    if (stats.goldEarned)
        updateStat('GoldEarned', stats.goldEarned.toString());
    if (stats.damageDealt)
        updateStat('DamageDealt', stats.damageDealt.toString());
}
// 更新游戏结果
function updateGameResult(result) {
    const resultLabel = $.GetContextPanel().FindChildInLayoutFile('GameResult');
    if (resultLabel) {
        const resultTexts = {
            'victory': '🏆 胜利！',
            'defeat': '💀 失败',
            'draw': '🤝 平局'
        };
        resultLabel.text = resultTexts[result] || result;
        resultLabel.style.color = result === 'victory' ? '#28a745' : result === 'defeat' ? '#dc3545' : '#ffc107';
    }
}
// 监听游戏事件
GameEvents.Subscribe('game_ended', (data) => {
    $.Msg('Game ended event received:', data);
    updateGameResult(data.result);
    updateGameStats(data.stats);
});
// 监听统计更新
GameEvents.Subscribe('stats_updated', (data) => {
    $.Msg('Stats updated event received:', data);
    updateGameStats(data);
});
// 初始化
function initializeEndScreen() {
    $.Msg('=== Initializing End Screen ===');
    // 延迟创建UI，确保面板准备就绪
    $.Schedule(0.5, createEndScreenUI);
    // 设置快捷键
    $.RegisterKeyBind($.GetContextPanel(), 'key_f9', () => {
        $.Msg('=== F9: Recreating End Screen UI ===');
        createEndScreenUI();
    });
}
// 导出全局函数
globalThis.EndScreenTest = {
    createUI: createEndScreenUI,
    updateStats: updateGameStats,
    updateResult: updateGameResult
};
// 立即执行初始化
initializeEndScreen();
// 导出React组件（保持兼容性）
const EndScreenPanel = () => {
    return null; // 使用原生Panorama
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EndScreenPanel);
$.Msg('=== End Screen module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpRUFBZSxjQUFjLEVBQUM7QUFDOUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxlbmRfc2NyZWVuXFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQHRzLW5vY2hlY2tcbi8vIOa4uOaIj+e7k+adn+eVjOmdoiAtIEZ1c2lvbkRvdGFcbiQuTXNnKCc9PT0gRW5kIFNjcmVlbiBQYW5lbCBMb2FkaW5nID09PScpO1xuLy8g5Yib5bu657uT5p2f55WM6Z2iVUlcbmZ1bmN0aW9uIGNyZWF0ZUVuZFNjcmVlblVJKCkge1xuICAgICQuTXNnKCdDcmVhdGluZyBlbmQgc2NyZWVuIFVJLi4uJyk7XG4gICAgLy8g6I635Y+W5qC56Z2i5p2/XG4gICAgY29uc3Qgcm9vdFBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKTtcbiAgICBpZiAoIXJvb3RQYW5lbCkge1xuICAgICAgICAkLk1zZygnRXJyb3I6IFJvb3QgcGFuZWwgbm90IGZvdW5kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g5Yig6Zmk5bey5a2Y5Zyo55qE5a655ZmoXG4gICAgY29uc3QgZXhpc3RpbmdDb250YWluZXIgPSByb290UGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdFbmRTY3JlZW5Db250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIC8vIOWIm+W7uuS4u+WuueWZqFxuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnRW5kU2NyZWVuQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC44KSc7XG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICcxMDAwJztcbiAgICAvLyDliJvlu7rlhoXlrrnpnaLmnb9cbiAgICBjb25zdCBjb250ZW50UGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ0VuZFNjcmVlbkNvbnRlbnQnKTtcbiAgICBjb250ZW50UGFuZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS53aWR0aCA9ICc4MDBweCc7XG4gICAgY29udGVudFBhbmVsLnN0eWxlLmhlaWdodCA9ICc2MDBweCc7XG4gICAgY29udGVudFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDIwLCAyMCwgNDAsIDAuOTUpJztcbiAgICBjb250ZW50UGFuZWwuc3R5bGUuYm9yZGVyID0gJzNweCBzb2xpZCAjNGE5MGUyJztcbiAgICBjb250ZW50UGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250ZW50UGFuZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzMwcHgnO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDMwcHggcmdiYSg3NCwgMTQ0LCAyMjYsIDAuNSknO1xuICAgIC8vIOagh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBjb250ZW50UGFuZWwsICdFbmRTY3JlZW5UaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn8J+OriDmuLjmiI/nu5PmnZ8nO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gJyM0YTkwZTInO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gJzM2cHgnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzMwcHgnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRTaGFkb3cgPSAnMnB4IDJweCA0cHggcmdiYSgwLDAsMCwxKSc7XG4gICAgLy8g57uT5p6c5L+h5oGvXG4gICAgY29uc3QgcmVzdWx0TGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGNvbnRlbnRQYW5lbCwgJ0dhbWVSZXN1bHQnKTtcbiAgICByZXN1bHRMYWJlbC50ZXh0ID0gJ+etieW+hea4uOaIj+e7k+aenC4uLic7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUuY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzIwcHgnO1xuICAgIC8vIOe7n+iuoeS/oeaBr+WuueWZqFxuICAgIGNvbnN0IHN0YXRzQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250ZW50UGFuZWwsICdTdGF0c0NvbnRhaW5lcicpO1xuICAgIHN0YXRzQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHN0YXRzQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICczMDBweCc7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIHN0YXRzQ29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUubWFyZ2luQm90dG9tID0gJzMwcHgnO1xuICAgIC8vIOe7n+iuoeagh+mimFxuICAgIGNvbnN0IHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzQ29udGFpbmVyLCAnU3RhdHNUaXRsZScpO1xuICAgIHN0YXRzVGl0bGUudGV4dCA9ICfwn5OKIOa4uOaIj+e7n+iuoSc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5jb2xvciA9ICcjZmZkNzAwJztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICAvLyDnu5/orqHpobnnm65cbiAgICBjb25zdCBzdGF0c0l0ZW1zID0gW1xuICAgICAgICB7IGxhYmVsOiAn5ri45oiP5pe26ZW/OicsIHZhbHVlOiAnMDA6MDA6MDAnLCBpZDogJ0dhbWVUaW1lJyB9LFxuICAgICAgICB7IGxhYmVsOiAn5Ye75p2A5pWwOicsIHZhbHVlOiAnMCcsIGlkOiAnS2lsbHMnIH0sXG4gICAgICAgIHsgbGFiZWw6ICfmrbvkuqHmlbA6JywgdmFsdWU6ICcwJywgaWQ6ICdEZWF0aHMnIH0sXG4gICAgICAgIHsgbGFiZWw6ICfliqnmlLvmlbA6JywgdmFsdWU6ICcwJywgaWQ6ICdBc3Npc3RzJyB9LFxuICAgICAgICB7IGxhYmVsOiAn6I635b6X6YeR5biBOicsIHZhbHVlOiAnMCcsIGlkOiAnR29sZEVhcm5lZCcgfSxcbiAgICAgICAgeyBsYWJlbDogJ+mAoOaIkOS8pOWuszonLCB2YWx1ZTogJzAnLCBpZDogJ0RhbWFnZURlYWx0JyB9XG4gICAgXTtcbiAgICBzdGF0c0l0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW1QYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc3RhdHNDb250YWluZXIsIGBTdGF0c0l0ZW1fJHtpdGVtLmlkfWApO1xuICAgICAgICBpdGVtUGFuZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGl0ZW1QYW5lbC5zdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgICAgIGl0ZW1QYW5lbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnOHB4JztcbiAgICAgICAgY29uc3QgbGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGl0ZW1QYW5lbCwgYCR7aXRlbS5pZH1fTGFiZWxgKTtcbiAgICAgICAgbGFiZWwudGV4dCA9IGl0ZW0ubGFiZWw7XG4gICAgICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gJyNjY2NjY2MnO1xuICAgICAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICAgICAgbGFiZWwuc3R5bGUud2lkdGggPSAnMTUwcHgnO1xuICAgICAgICBjb25zdCB2YWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaXRlbVBhbmVsLCBgJHtpdGVtLmlkfV9WYWx1ZWApO1xuICAgICAgICB2YWx1ZS50ZXh0ID0gaXRlbS52YWx1ZTtcbiAgICAgICAgdmFsdWUuc3R5bGUuY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgIHZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgICAgICB2YWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICB2YWx1ZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgICAgICB2YWx1ZS5zdHlsZS53aWR0aCA9ICcyMDBweCc7XG4gICAgfSk7XG4gICAgLy8g5oyJ6ZKu5a655ZmoXG4gICAgY29uc3QgYnV0dG9uQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250ZW50UGFuZWwsICdFbmRTY3JlZW5CdXR0b25zJyk7XG4gICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnNjBweCc7XG4gICAgYnV0dG9uQ29udGFpbmVyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIC8vIOmHjeaWsOW8gOWni+aMiemSrlxuICAgIGNvbnN0IHJlc3RhcnRCdXR0b24gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBidXR0b25Db250YWluZXIsICdSZXN0YXJ0QnV0dG9uJyk7XG4gICAgcmVzdGFydEJ1dHRvbi50ZXh0ID0gJ/CflIQg6YeN5paw5byA5aeLJztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLndpZHRoID0gJzE4MHB4JztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMjhhNzQ1JztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIHJlc3RhcnRCdXR0b24uc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgIzFlN2UzNCc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgIHJlc3RhcnRCdXR0b24uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ+mHjeaWsOW8gOWni+aMiemSruiiq+eCueWHuycpO1xuICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncmVzdGFydF9nYW1lJywge30pO1xuICAgIH0pO1xuICAgIC8vIOi/lOWbnuS4u+iPnOWNleaMiemSrlxuICAgIGNvbnN0IG1lbnVCdXR0b24gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBidXR0b25Db250YWluZXIsICdNZW51QnV0dG9uJyk7XG4gICAgbWVudUJ1dHRvbi50ZXh0ID0gJ/Cfj6Ag6L+U5Zue5Li76I+c5Y2VJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLndpZHRoID0gJzE4MHB4JztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNmM3NTdkJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIG1lbnVCdXR0b24uc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgIzU0NWI2Mic7XG4gICAgbWVudUJ1dHRvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICBtZW51QnV0dG9uLnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgIG1lbnVCdXR0b24uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ+i/lOWbnuS4u+iPnOWNleaMiemSruiiq+eCueWHuycpO1xuICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncmV0dXJuX3RvX21lbnUnLCB7fSk7XG4gICAgfSk7XG4gICAgJC5Nc2coJ0VuZCBzY3JlZW4gVUkgY3JlYXRlZCBzdWNjZXNzZnVsbHkhJyk7XG59XG4vLyDmm7TmlrDmuLjmiI/nu5/orqFcbmZ1bmN0aW9uIHVwZGF0ZUdhbWVTdGF0cyhzdGF0cykge1xuICAgICQuTXNnKCdVcGRhdGluZyBnYW1lIHN0YXRzOicsIHN0YXRzKTtcbiAgICBjb25zdCB1cGRhdGVTdGF0ID0gKGlkLCB2YWx1ZSkgPT4ge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHN0YXRWYWx1ZSA9IChfYSA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBTdGF0c0l0ZW1fJHtpZH1gKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgJHtpZH1fVmFsdWVgKTtcbiAgICAgICAgaWYgKHN0YXRWYWx1ZSkge1xuICAgICAgICAgICAgc3RhdFZhbHVlLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHN0YXRzLmdhbWVUaW1lKVxuICAgICAgICB1cGRhdGVTdGF0KCdHYW1lVGltZScsIHN0YXRzLmdhbWVUaW1lKTtcbiAgICBpZiAoc3RhdHMua2lsbHMpXG4gICAgICAgIHVwZGF0ZVN0YXQoJ0tpbGxzJywgc3RhdHMua2lsbHMudG9TdHJpbmcoKSk7XG4gICAgaWYgKHN0YXRzLmRlYXRocylcbiAgICAgICAgdXBkYXRlU3RhdCgnRGVhdGhzJywgc3RhdHMuZGVhdGhzLnRvU3RyaW5nKCkpO1xuICAgIGlmIChzdGF0cy5hc3Npc3RzKVxuICAgICAgICB1cGRhdGVTdGF0KCdBc3Npc3RzJywgc3RhdHMuYXNzaXN0cy50b1N0cmluZygpKTtcbiAgICBpZiAoc3RhdHMuZ29sZEVhcm5lZClcbiAgICAgICAgdXBkYXRlU3RhdCgnR29sZEVhcm5lZCcsIHN0YXRzLmdvbGRFYXJuZWQudG9TdHJpbmcoKSk7XG4gICAgaWYgKHN0YXRzLmRhbWFnZURlYWx0KVxuICAgICAgICB1cGRhdGVTdGF0KCdEYW1hZ2VEZWFsdCcsIHN0YXRzLmRhbWFnZURlYWx0LnRvU3RyaW5nKCkpO1xufVxuLy8g5pu05paw5ri45oiP57uT5p6cXG5mdW5jdGlvbiB1cGRhdGVHYW1lUmVzdWx0KHJlc3VsdCkge1xuICAgIGNvbnN0IHJlc3VsdExhYmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0dhbWVSZXN1bHQnKTtcbiAgICBpZiAocmVzdWx0TGFiZWwpIHtcbiAgICAgICAgY29uc3QgcmVzdWx0VGV4dHMgPSB7XG4gICAgICAgICAgICAndmljdG9yeSc6ICfwn4+GIOiDnOWIqe+8gScsXG4gICAgICAgICAgICAnZGVmZWF0JzogJ/CfkoAg5aSx6LSlJyxcbiAgICAgICAgICAgICdkcmF3JzogJ/CfpJ0g5bmz5bGAJ1xuICAgICAgICB9O1xuICAgICAgICByZXN1bHRMYWJlbC50ZXh0ID0gcmVzdWx0VGV4dHNbcmVzdWx0XSB8fCByZXN1bHQ7XG4gICAgICAgIHJlc3VsdExhYmVsLnN0eWxlLmNvbG9yID0gcmVzdWx0ID09PSAndmljdG9yeScgPyAnIzI4YTc0NScgOiByZXN1bHQgPT09ICdkZWZlYXQnID8gJyNkYzM1NDUnIDogJyNmZmMxMDcnO1xuICAgIH1cbn1cbi8vIOebkeWQrOa4uOaIj+S6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfZW5kZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdHYW1lIGVuZGVkIGV2ZW50IHJlY2VpdmVkOicsIGRhdGEpO1xuICAgIHVwZGF0ZUdhbWVSZXN1bHQoZGF0YS5yZXN1bHQpO1xuICAgIHVwZGF0ZUdhbWVTdGF0cyhkYXRhLnN0YXRzKTtcbn0pO1xuLy8g55uR5ZCs57uf6K6h5pu05pawXG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnc3RhdHNfdXBkYXRlZCcsIChkYXRhKSA9PiB7XG4gICAgJC5Nc2coJ1N0YXRzIHVwZGF0ZWQgZXZlbnQgcmVjZWl2ZWQ6JywgZGF0YSk7XG4gICAgdXBkYXRlR2FtZVN0YXRzKGRhdGEpO1xufSk7XG4vLyDliJ3lp4vljJZcbmZ1bmN0aW9uIGluaXRpYWxpemVFbmRTY3JlZW4oKSB7XG4gICAgJC5Nc2coJz09PSBJbml0aWFsaXppbmcgRW5kIFNjcmVlbiA9PT0nKTtcbiAgICAvLyDlu7bov5/liJvlu7pVSe+8jOehruS/nemdouadv+WHhuWkh+Wwsee7qlxuICAgICQuU2NoZWR1bGUoMC41LCBjcmVhdGVFbmRTY3JlZW5VSSk7XG4gICAgLy8g6K6+572u5b+r5o236ZSuXG4gICAgJC5SZWdpc3RlcktleUJpbmQoJC5HZXRDb250ZXh0UGFuZWwoKSwgJ2tleV9mOScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSBGOTogUmVjcmVhdGluZyBFbmQgU2NyZWVuIFVJID09PScpO1xuICAgICAgICBjcmVhdGVFbmRTY3JlZW5VSSgpO1xuICAgIH0pO1xufVxuLy8g5a+85Ye65YWo5bGA5Ye95pWwXG5nbG9iYWxUaGlzLkVuZFNjcmVlblRlc3QgPSB7XG4gICAgY3JlYXRlVUk6IGNyZWF0ZUVuZFNjcmVlblVJLFxuICAgIHVwZGF0ZVN0YXRzOiB1cGRhdGVHYW1lU3RhdHMsXG4gICAgdXBkYXRlUmVzdWx0OiB1cGRhdGVHYW1lUmVzdWx0XG59O1xuLy8g56uL5Y2z5omn6KGM5Yid5aeL5YyWXG5pbml0aWFsaXplRW5kU2NyZWVuKCk7XG4vLyDlr7zlh7pSZWFjdOe7hOS7tu+8iOS/neaMgeWFvOWuueaAp++8iVxuY29uc3QgRW5kU2NyZWVuUGFuZWwgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG51bGw7IC8vIOS9v+eUqOWOn+eUn1Bhbm9yYW1hXG59O1xuZXhwb3J0IGRlZmF1bHQgRW5kU2NyZWVuUGFuZWw7XG4kLk1zZygnPT09IEVuZCBTY3JlZW4gbW9kdWxlIGxvYWRlZCBjb21wbGV0ZWx5ID09PScpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9