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
// 创建结束界面UI
function createEndScreenUI() {
    $.Msg('Creating end screen UI...');
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        return;
    }
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('EndScreenContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    const container = $.CreatePanel('Panel', rootPanel, 'EndScreenContainer');
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    container.style.zIndex = '1000';
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
    statsTitle.text = '游戏统计';
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
        GameEvents.SendCustomGameEventToServer('restart_game', {});
    });
    // 返回主菜单按钮
    const menuButton = $.CreatePanel('Button', buttonContainer, 'MenuButton');
    menuButton.text = '返回主菜单';
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIHZhciBcIiRcIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vRDpcXFN0ZWFtQXBwXFxzdGVhbWFwcHNcXGNvbW1vblxcZG90YSAyIGJldGFcXGNvbnRlbnRcXGRvdGFfYWRkb25zXFxmdXNpb25cXHBhbm9yYW1hXFxzcmNcXGVuZF9zY3JlZW5cXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyDliJvlu7rnu5PmnZ/nlYzpnaJVSVxuZnVuY3Rpb24gY3JlYXRlRW5kU2NyZWVuVUkoKSB7XG4gICAgJC5Nc2coJ0NyZWF0aW5nIGVuZCBzY3JlZW4gVUkuLi4nKTtcbiAgICAvLyDojrflj5bmoLnpnaLmnb9cbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g5Yig6Zmk5bey5a2Y5Zyo55qE5a655ZmoXG4gICAgY29uc3QgZXhpc3RpbmdDb250YWluZXIgPSByb290UGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdFbmRTY3JlZW5Db250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnRW5kU2NyZWVuQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC44KSc7XG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICcxMDAwJztcbiAgICBjb25zdCBjb250ZW50UGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ0VuZFNjcmVlbkNvbnRlbnQnKTtcbiAgICBjb250ZW50UGFuZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS53aWR0aCA9ICc4MDBweCc7XG4gICAgY29udGVudFBhbmVsLnN0eWxlLmhlaWdodCA9ICc2MDBweCc7XG4gICAgY29udGVudFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDIwLCAyMCwgNDAsIDAuOTUpJztcbiAgICBjb250ZW50UGFuZWwuc3R5bGUuYm9yZGVyID0gJzNweCBzb2xpZCAjNGE5MGUyJztcbiAgICBjb250ZW50UGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250ZW50UGFuZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzMwcHgnO1xuICAgIGNvbnRlbnRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDMwcHggcmdiYSg3NCwgMTQ0LCAyMjYsIDAuNSknO1xuICAgIC8vIOagh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBjb250ZW50UGFuZWwsICdFbmRTY3JlZW5UaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn8J+OriDmuLjmiI/nu5PmnZ8nO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gJyM0YTkwZTInO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gJzM2cHgnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzMwcHgnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRTaGFkb3cgPSAnMnB4IDJweCA0cHggcmdiYSgwLDAsMCwxKSc7XG4gICAgLy8g57uT5p6c5L+h5oGvXG4gICAgY29uc3QgcmVzdWx0TGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGNvbnRlbnRQYW5lbCwgJ0dhbWVSZXN1bHQnKTtcbiAgICByZXN1bHRMYWJlbC50ZXh0ID0gJ+etieW+hea4uOaIj+e7k+aenC4uLic7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUuY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgcmVzdWx0TGFiZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzIwcHgnO1xuICAgIC8vIOe7n+iuoeS/oeaBr+WuueWZqFxuICAgIGNvbnN0IHN0YXRzQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250ZW50UGFuZWwsICdTdGF0c0NvbnRhaW5lcicpO1xuICAgIHN0YXRzQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHN0YXRzQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICczMDBweCc7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIHN0YXRzQ29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgc3RhdHNDb250YWluZXIuc3R5bGUubWFyZ2luQm90dG9tID0gJzMwcHgnO1xuICAgIC8vIOe7n+iuoeagh+mimFxuICAgIGNvbnN0IHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzQ29udGFpbmVyLCAnU3RhdHNUaXRsZScpO1xuICAgIHN0YXRzVGl0bGUudGV4dCA9ICfmuLjmiI/nu5/orqEnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSAnI2ZmZDcwMCc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgLy8g57uf6K6h6aG555uuXG4gICAgY29uc3Qgc3RhdHNJdGVtcyA9IFtcbiAgICAgICAgeyBsYWJlbDogJ+a4uOaIj+aXtumVvzonLCB2YWx1ZTogJzAwOjAwOjAwJywgaWQ6ICdHYW1lVGltZScgfSxcbiAgICAgICAgeyBsYWJlbDogJ+WHu+adgOaVsDonLCB2YWx1ZTogJzAnLCBpZDogJ0tpbGxzJyB9LFxuICAgICAgICB7IGxhYmVsOiAn5q275Lqh5pWwOicsIHZhbHVlOiAnMCcsIGlkOiAnRGVhdGhzJyB9LFxuICAgICAgICB7IGxhYmVsOiAn5Yqp5pS75pWwOicsIHZhbHVlOiAnMCcsIGlkOiAnQXNzaXN0cycgfSxcbiAgICAgICAgeyBsYWJlbDogJ+iOt+W+l+mHkeW4gTonLCB2YWx1ZTogJzAnLCBpZDogJ0dvbGRFYXJuZWQnIH0sXG4gICAgICAgIHsgbGFiZWw6ICfpgKDmiJDkvKTlrrM6JywgdmFsdWU6ICcwJywgaWQ6ICdEYW1hZ2VEZWFsdCcgfVxuICAgIF07XG4gICAgc3RhdHNJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBpdGVtUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN0YXRzQ29udGFpbmVyLCBgU3RhdHNJdGVtXyR7aXRlbS5pZH1gKTtcbiAgICAgICAgaXRlbVBhbmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBpdGVtUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgICAgICBpdGVtUGFuZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBpdGVtUGFuZWwsIGAke2l0ZW0uaWR9X0xhYmVsYCk7XG4gICAgICAgIGxhYmVsLnRleHQgPSBpdGVtLmxhYmVsO1xuICAgICAgICBsYWJlbC5zdHlsZS5jb2xvciA9ICcjY2NjY2NjJztcbiAgICAgICAgbGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgICAgIGxhYmVsLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICAgICAgY29uc3QgdmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGl0ZW1QYW5lbCwgYCR7aXRlbS5pZH1fVmFsdWVgKTtcbiAgICAgICAgdmFsdWUudGV4dCA9IGl0ZW0udmFsdWU7XG4gICAgICAgIHZhbHVlLnN0eWxlLmNvbG9yID0gJyNmZmZmZmYnO1xuICAgICAgICB2YWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICAgICAgdmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgdmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgdmFsdWUuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICAgIH0pO1xuICAgIC8vIOaMiemSruWuueWZqFxuICAgIGNvbnN0IGJ1dHRvbkNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGVudFBhbmVsLCAnRW5kU2NyZWVuQnV0dG9ucycpO1xuICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBidXR0b25Db250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzYwcHgnO1xuICAgIGJ1dHRvbkNvbnRhaW5lci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDph43mlrDlvIDlp4vmjInpkq5cbiAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgYnV0dG9uQ29udGFpbmVyLCAnUmVzdGFydEJ1dHRvbicpO1xuICAgIHJlc3RhcnRCdXR0b24udGV4dCA9ICfwn5SEIOmHjeaWsOW8gOWniyc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS53aWR0aCA9ICcxODBweCc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzI4YTc0NSc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5mb250U2l6ZSA9ICcxOHB4JztcbiAgICByZXN0YXJ0QnV0dG9uLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICMxZTdlMzQnO1xuICAgIHJlc3RhcnRCdXR0b24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgcmVzdGFydEJ1dHRvbi5zdHlsZS5tYXJnaW4gPSAnNXB4JztcbiAgICByZXN0YXJ0QnV0dG9uLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdyZXN0YXJ0X2dhbWUnLCB7fSk7XG4gICAgfSk7XG4gICAgLy8g6L+U5Zue5Li76I+c5Y2V5oyJ6ZKuXG4gICAgY29uc3QgbWVudUJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGJ1dHRvbkNvbnRhaW5lciwgJ01lbnVCdXR0b24nKTtcbiAgICBtZW51QnV0dG9uLnRleHQgPSAn6L+U5Zue5Li76I+c5Y2VJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLndpZHRoID0gJzE4MHB4JztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmhlaWdodCA9ICc1MHB4JztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjNmM3NTdkJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIG1lbnVCdXR0b24uc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBtZW51QnV0dG9uLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgIzU0NWI2Mic7XG4gICAgbWVudUJ1dHRvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICBtZW51QnV0dG9uLnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgIG1lbnVCdXR0b24uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3JldHVybl90b19tZW51Jywge30pO1xuICAgIH0pO1xuICAgICQuTXNnKCdFbmQgc2NyZWVuIFVJIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5IScpO1xufVxuLy8g5pu05paw5ri45oiP57uf6K6hXG5mdW5jdGlvbiB1cGRhdGVHYW1lU3RhdHMoc3RhdHMpIHtcbiAgICAkLk1zZygnVXBkYXRpbmcgZ2FtZSBzdGF0czonLCBzdGF0cyk7XG4gICAgY29uc3QgdXBkYXRlU3RhdCA9IChpZCwgdmFsdWUpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBzdGF0VmFsdWUgPSAoX2EgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgU3RhdHNJdGVtXyR7aWR9YCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYCR7aWR9X1ZhbHVlYCk7XG4gICAgICAgIGlmIChzdGF0VmFsdWUpIHtcbiAgICAgICAgICAgIHN0YXRWYWx1ZS50ZXh0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChzdGF0cy5nYW1lVGltZSlcbiAgICAgICAgdXBkYXRlU3RhdCgnR2FtZVRpbWUnLCBzdGF0cy5nYW1lVGltZSk7XG4gICAgaWYgKHN0YXRzLmtpbGxzKVxuICAgICAgICB1cGRhdGVTdGF0KCdLaWxscycsIHN0YXRzLmtpbGxzLnRvU3RyaW5nKCkpO1xuICAgIGlmIChzdGF0cy5kZWF0aHMpXG4gICAgICAgIHVwZGF0ZVN0YXQoJ0RlYXRocycsIHN0YXRzLmRlYXRocy50b1N0cmluZygpKTtcbiAgICBpZiAoc3RhdHMuYXNzaXN0cylcbiAgICAgICAgdXBkYXRlU3RhdCgnQXNzaXN0cycsIHN0YXRzLmFzc2lzdHMudG9TdHJpbmcoKSk7XG4gICAgaWYgKHN0YXRzLmdvbGRFYXJuZWQpXG4gICAgICAgIHVwZGF0ZVN0YXQoJ0dvbGRFYXJuZWQnLCBzdGF0cy5nb2xkRWFybmVkLnRvU3RyaW5nKCkpO1xuICAgIGlmIChzdGF0cy5kYW1hZ2VEZWFsdClcbiAgICAgICAgdXBkYXRlU3RhdCgnRGFtYWdlRGVhbHQnLCBzdGF0cy5kYW1hZ2VEZWFsdC50b1N0cmluZygpKTtcbn1cbi8vIOabtOaWsOa4uOaIj+e7k+aenFxuZnVuY3Rpb24gdXBkYXRlR2FtZVJlc3VsdChyZXN1bHQpIHtcbiAgICBjb25zdCByZXN1bHRMYWJlbCA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdHYW1lUmVzdWx0Jyk7XG4gICAgaWYgKHJlc3VsdExhYmVsKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdFRleHRzID0ge1xuICAgICAgICAgICAgJ3ZpY3RvcnknOiAn8J+PhiDog5zliKnvvIEnLFxuICAgICAgICAgICAgJ2RlZmVhdCc6ICfwn5KAIOWksei0pScsXG4gICAgICAgICAgICAnZHJhdyc6ICfwn6SdIOW5s+WxgCdcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0TGFiZWwudGV4dCA9IHJlc3VsdFRleHRzW3Jlc3VsdF0gfHwgcmVzdWx0O1xuICAgICAgICByZXN1bHRMYWJlbC5zdHlsZS5jb2xvciA9IHJlc3VsdCA9PT0gJ3ZpY3RvcnknID8gJyMyOGE3NDUnIDogcmVzdWx0ID09PSAnZGVmZWF0JyA/ICcjZGMzNTQ1JyA6ICcjZmZjMTA3JztcbiAgICB9XG59XG4vLyDnm5HlkKzmuLjmiI/kuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX2VuZGVkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZygnR2FtZSBlbmRlZCBldmVudCByZWNlaXZlZDonLCBkYXRhKTtcbiAgICB1cGRhdGVHYW1lUmVzdWx0KGRhdGEucmVzdWx0KTtcbiAgICB1cGRhdGVHYW1lU3RhdHMoZGF0YS5zdGF0cyk7XG59KTtcbi8vIOebkeWQrOe7n+iuoeabtOaWsFxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3N0YXRzX3VwZGF0ZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdTdGF0cyB1cGRhdGVkIGV2ZW50IHJlY2VpdmVkOicsIGRhdGEpO1xuICAgIHVwZGF0ZUdhbWVTdGF0cyhkYXRhKTtcbn0pO1xuLy8g5Yid5aeL5YyWXG5mdW5jdGlvbiBpbml0aWFsaXplRW5kU2NyZWVuKCkge1xuICAgICQuU2NoZWR1bGUoMC41LCBjcmVhdGVFbmRTY3JlZW5VSSk7XG4gICAgLy8g6K6+572u5b+r5o236ZSuXG4gICAgJC5SZWdpc3RlcktleUJpbmQoJC5HZXRDb250ZXh0UGFuZWwoKSwgJ2tleV9mOScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSBGOTogUmVjcmVhdGluZyBFbmQgU2NyZWVuIFVJID09PScpO1xuICAgICAgICBjcmVhdGVFbmRTY3JlZW5VSSgpO1xuICAgIH0pO1xufVxuLy8g5a+85Ye65YWo5bGA5Ye95pWwXG5nbG9iYWxUaGlzLkVuZFNjcmVlblRlc3QgPSB7XG4gICAgY3JlYXRlVUk6IGNyZWF0ZUVuZFNjcmVlblVJLFxuICAgIHVwZGF0ZVN0YXRzOiB1cGRhdGVHYW1lU3RhdHMsXG4gICAgdXBkYXRlUmVzdWx0OiB1cGRhdGVHYW1lUmVzdWx0XG59O1xuLy8g56uL5Y2z5omn6KGM5Yid5aeL5YyWXG5pbml0aWFsaXplRW5kU2NyZWVuKCk7XG4vLyDlr7zlh7pSZWFjdOe7hOS7tu+8iOS/neaMgeWFvOWuueaAp++8iVxuY29uc3QgRW5kU2NyZWVuUGFuZWwgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG51bGw7IC8vIOS9v+eUqOWOn+eUn1Bhbm9yYW1hXG59O1xuZXhwb3J0IGRlZmF1bHQgRW5kU2NyZWVuUGFuZWw7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=