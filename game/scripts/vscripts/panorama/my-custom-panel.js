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
/*!******************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\my-custom-panel\index.tsx ***!
  \******************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// 使用FusionDota的React导入方式
const React = globalThis.React;
const { useState, useEffect } = React;
// 主组件
const CustomPanel = () => {
    const [state, setState] = useState({
        isVisible: true,
        playerGold: 0,
        selectedUnit: null,
        messages: []
    });
    // 组件挂载时的初始化
    useEffect(() => {
        // 监听游戏事件
        GameEvents.Subscribe('update_player_gold', onGoldUpdate);
        GameEvents.Subscribe('unit_selected', onUnitSelected);
        // 监听网络表变化
        CustomNetTables.SubscribeNetTableListener('game_mode', onGameModeChanged);
        // 获取初始数据
        loadInitialData();
        // 清理函数
        return () => {
            GameEvents.Unsubscribe('update_player_gold');
            GameEvents.Unsubscribe('unit_selected');
        };
    }, []);
    // 事件处理函数
    const onGoldUpdate = (data) => {
        setState(prev => ({
            ...prev,
            playerGold: data.gold
        }));
    };
    const onUnitSelected = (data) => {
        setState(prev => ({
            ...prev,
            selectedUnit: data.unitName
        }));
    };
    const onGameModeChanged = (tableName, key, data) => {
        addMessage(`Game mode changed: ${data.mode}`);
    };
    const loadInitialData = () => {
        // 获取玩家初始金币
        const playerData = CustomNetTables.GetTableValue('game_mode', 'current');
        if (playerData) {
            setState(prev => ({
                ...prev,
                playerGold: playerData.gold || 0
            }));
        }
    };
    // 工具函数
    const addMessage = (message) => {
        setState(prev => ({
            ...prev,
            messages: [...prev.messages.slice(-4), message] // 只保留最新5条消息
        }));
    };
    const toggleVisibility = () => {
        setState(prev => ({
            ...prev,
            isVisible: !prev.isVisible
        }));
    };
    const requestGoldBonus = () => {
        // 发送事件到服务端
        GameEvents.SendCustomGameEventToServer('request_gold_bonus', {
            playerId: Players.GetLocalPlayer(),
            amount: 100
        });
        addMessage('Requested gold bonus');
    };
    const clearMessages = () => {
        setState(prev => ({
            ...prev,
            messages: []
        }));
    };
    // 如果面板不可见，不渲染内容
    if (!state.isVisible) {
        return (React.createElement("div", { className: "custom-panel-toggle" },
            React.createElement("button", { onClick: toggleVisibility, className: "toggle-button" }, "Show Panel")));
    }
    // 主界面渲染
    return (React.createElement("div", { className: "custom-panel-container" },
        React.createElement("div", { className: "panel-header" },
            React.createElement("h2", { className: "panel-title" }, "Custom Game Panel"),
            React.createElement("button", { onClick: toggleVisibility, className: "close-button" }, "\u00D7")),
        React.createElement("div", { className: "player-info-section" },
            React.createElement("h3", null, "Player Information"),
            React.createElement("div", { className: "info-item" },
                React.createElement("span", { className: "info-label" }, "Gold:"),
                React.createElement("span", { className: "info-value gold" }, state.playerGold)),
            React.createElement("div", { className: "info-item" },
                React.createElement("span", { className: "info-label" }, "Selected Unit:"),
                React.createElement("span", { className: "info-value" }, state.selectedUnit || 'None'))),
        React.createElement("div", { className: "action-section" },
            React.createElement("h3", null, "Actions"),
            React.createElement("button", { onClick: requestGoldBonus, className: "action-button primary" }, "Request Gold (+100)"),
            React.createElement("button", { onClick: clearMessages, className: "action-button secondary" }, "Clear Messages")),
        React.createElement("div", { className: "message-section" },
            React.createElement("h3", null, "Messages"),
            React.createElement("div", { className: "message-list" }, state.messages.length === 0 ? (React.createElement("div", { className: "no-messages" }, "No messages")) : (state.messages.map((message, index) => (React.createElement("div", { key: index, className: "message-item" }, message)))))),
        React.createElement("div", { className: "status-section" },
            React.createElement("div", { className: "status-indicator" },
                React.createElement("span", { className: "status-dot active" }),
                React.createElement("span", null, "Panel Active")))));
};
// 样式定义（内联CSS，也可以单独文件）
const styles = `
.custom-panel-container {
    position: fixed;
    top: 50px;
    right: 20px;
    width: 320px;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    border: 2px solid #3498db;
    border-radius: 8px;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
    color: #ecf0f1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #3498db;
    border-radius: 6px 6px 0 0;
}

.panel-title {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: white;
}

.close-button {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
}

.player-info-section,
.action-section,
.message-section,
.status-section {
    padding: 16px;
    border-bottom: 1px solid #34495e;
}

.player-info-section:last-child,
.action-section:last-child,
.message-section:last-child,
.status-section:last-child {
    border-bottom: none;
}

.player-info-section h3,
.action-section h3,
.message-section h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #3498db;
    font-weight: bold;
}

.info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.info-label {
    color: #bdc3c7;
}

.info-value {
    font-weight: bold;
}

.info-value.gold {
    color: #f1c40f;
}

.action-button {
    width: 100%;
    padding: 10px;
    margin-bottom: 8px;
    border: none;
    border-radius: 4px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
}

.action-button.primary {
    background: #27ae60;
    color: white;
}

.action-button.primary:hover {
    background: #2ecc71;
    transform: translateY(-1px);
}

.action-button.secondary {
    background: #95a5a6;
    color: white;
}

.action-button.secondary:hover {
    background: #bdc3c7;
}

.message-list {
    max-height: 120px;
    overflow-y: auto;
}

.message-item {
    padding: 6px 8px;
    margin-bottom: 4px;
    background: rgba(52, 73, 94, 0.3);
    border-radius: 4px;
    font-size: 12px;
    border-left: 3px solid #3498db;
}

.no-messages {
    color: #95a5a6;
    font-style: italic;
    text-align: center;
    padding: 20px;
}

.status-section {
    padding: 12px 16px;
}

.status-indicator {
    display: flex;
    align-items: center;
    font-size: 12px;
}

.status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

.status-dot.active {
    background: #27ae60;
    box-shadow: 0 0 6px #27ae60;
}

.custom-panel-toggle {
    position: fixed;
    top: 50px;
    right: 20px;
    z-index: 1000;
}

.toggle-button {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

.toggle-button:hover {
    background: #2980b9;
}
`;
// 注入样式到页面
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);
// 渲染组件到 Panorama
$.Msg('Custom Panel loaded');
// 导出组件
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomPanel);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgdmFyIFwiJFwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xcbXktY3VzdG9tLXBhbmVsXFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8g5L2/55SoRnVzaW9uRG90YeeahFJlYWN05a+85YWl5pa55byPXG5jb25zdCBSZWFjdCA9IGdsb2JhbFRoaXMuUmVhY3Q7XG5jb25zdCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSA9IFJlYWN0O1xuLy8g5Li757uE5Lu2XG5jb25zdCBDdXN0b21QYW5lbCA9ICgpID0+IHtcbiAgICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKHtcbiAgICAgICAgaXNWaXNpYmxlOiB0cnVlLFxuICAgICAgICBwbGF5ZXJHb2xkOiAwLFxuICAgICAgICBzZWxlY3RlZFVuaXQ6IG51bGwsXG4gICAgICAgIG1lc3NhZ2VzOiBbXVxuICAgIH0pO1xuICAgIC8vIOe7hOS7tuaMgui9veaXtueahOWIneWni+WMllxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIOebkeWQrOa4uOaIj+S6i+S7tlxuICAgICAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgndXBkYXRlX3BsYXllcl9nb2xkJywgb25Hb2xkVXBkYXRlKTtcbiAgICAgICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3VuaXRfc2VsZWN0ZWQnLCBvblVuaXRTZWxlY3RlZCk7XG4gICAgICAgIC8vIOebkeWQrOe9kee7nOihqOWPmOWMllxuICAgICAgICBDdXN0b21OZXRUYWJsZXMuU3Vic2NyaWJlTmV0VGFibGVMaXN0ZW5lcignZ2FtZV9tb2RlJywgb25HYW1lTW9kZUNoYW5nZWQpO1xuICAgICAgICAvLyDojrflj5bliJ3lp4vmlbDmja5cbiAgICAgICAgbG9hZEluaXRpYWxEYXRhKCk7XG4gICAgICAgIC8vIOa4heeQhuWHveaVsFxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgR2FtZUV2ZW50cy5VbnN1YnNjcmliZSgndXBkYXRlX3BsYXllcl9nb2xkJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlVuc3Vic2NyaWJlKCd1bml0X3NlbGVjdGVkJyk7XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xuICAgIC8vIOS6i+S7tuWkhOeQhuWHveaVsFxuICAgIGNvbnN0IG9uR29sZFVwZGF0ZSA9IChkYXRhKSA9PiB7XG4gICAgICAgIHNldFN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBwbGF5ZXJHb2xkOiBkYXRhLmdvbGRcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgY29uc3Qgb25Vbml0U2VsZWN0ZWQgPSAoZGF0YSkgPT4ge1xuICAgICAgICBzZXRTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgc2VsZWN0ZWRVbml0OiBkYXRhLnVuaXROYW1lXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIGNvbnN0IG9uR2FtZU1vZGVDaGFuZ2VkID0gKHRhYmxlTmFtZSwga2V5LCBkYXRhKSA9PiB7XG4gICAgICAgIGFkZE1lc3NhZ2UoYEdhbWUgbW9kZSBjaGFuZ2VkOiAke2RhdGEubW9kZX1gKTtcbiAgICB9O1xuICAgIGNvbnN0IGxvYWRJbml0aWFsRGF0YSA9ICgpID0+IHtcbiAgICAgICAgLy8g6I635Y+W546p5a625Yid5aeL6YeR5biBXG4gICAgICAgIGNvbnN0IHBsYXllckRhdGEgPSBDdXN0b21OZXRUYWJsZXMuR2V0VGFibGVWYWx1ZSgnZ2FtZV9tb2RlJywgJ2N1cnJlbnQnKTtcbiAgICAgICAgaWYgKHBsYXllckRhdGEpIHtcbiAgICAgICAgICAgIHNldFN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgIHBsYXllckdvbGQ6IHBsYXllckRhdGEuZ29sZCB8fCAwXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOW3peWFt+WHveaVsFxuICAgIGNvbnN0IGFkZE1lc3NhZ2UgPSAobWVzc2FnZSkgPT4ge1xuICAgICAgICBzZXRTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgbWVzc2FnZXM6IFsuLi5wcmV2Lm1lc3NhZ2VzLnNsaWNlKC00KSwgbWVzc2FnZV0gLy8g5Y+q5L+d55WZ5pyA5pawNeadoea2iOaBr1xuICAgICAgICB9KSk7XG4gICAgfTtcbiAgICBjb25zdCB0b2dnbGVWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgICBzZXRTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgaXNWaXNpYmxlOiAhcHJldi5pc1Zpc2libGVcbiAgICAgICAgfSkpO1xuICAgIH07XG4gICAgY29uc3QgcmVxdWVzdEdvbGRCb251cyA9ICgpID0+IHtcbiAgICAgICAgLy8g5Y+R6YCB5LqL5Lu25Yiw5pyN5Yqh56uvXG4gICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdyZXF1ZXN0X2dvbGRfYm9udXMnLCB7XG4gICAgICAgICAgICBwbGF5ZXJJZDogUGxheWVycy5HZXRMb2NhbFBsYXllcigpLFxuICAgICAgICAgICAgYW1vdW50OiAxMDBcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZE1lc3NhZ2UoJ1JlcXVlc3RlZCBnb2xkIGJvbnVzJyk7XG4gICAgfTtcbiAgICBjb25zdCBjbGVhck1lc3NhZ2VzID0gKCkgPT4ge1xuICAgICAgICBzZXRTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgbWVzc2FnZXM6IFtdXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIC8vIOWmguaenOmdouadv+S4jeWPr+inge+8jOS4jea4suafk+WGheWuuVxuICAgIGlmICghc3RhdGUuaXNWaXNpYmxlKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJjdXN0b20tcGFuZWwtdG9nZ2xlXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiB0b2dnbGVWaXNpYmlsaXR5LCBjbGFzc05hbWU6IFwidG9nZ2xlLWJ1dHRvblwiIH0sIFwiU2hvdyBQYW5lbFwiKSkpO1xuICAgIH1cbiAgICAvLyDkuLvnlYzpnaLmuLLmn5NcbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY3VzdG9tLXBhbmVsLWNvbnRhaW5lclwiIH0sXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicGFuZWwtaGVhZGVyXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMlwiLCB7IGNsYXNzTmFtZTogXCJwYW5lbC10aXRsZVwiIH0sIFwiQ3VzdG9tIEdhbWUgUGFuZWxcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogdG9nZ2xlVmlzaWJpbGl0eSwgY2xhc3NOYW1lOiBcImNsb3NlLWJ1dHRvblwiIH0sIFwiXFx1MDBEN1wiKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwicGxheWVyLWluZm8tc2VjdGlvblwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiaDNcIiwgbnVsbCwgXCJQbGF5ZXIgSW5mb3JtYXRpb25cIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImluZm8taXRlbVwiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaW5mby1sYWJlbFwiIH0sIFwiR29sZDpcIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBjbGFzc05hbWU6IFwiaW5mby12YWx1ZSBnb2xkXCIgfSwgc3RhdGUucGxheWVyR29sZCkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJpbmZvLWl0ZW1cIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImluZm8tbGFiZWxcIiB9LCBcIlNlbGVjdGVkIFVuaXQ6XCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcImluZm8tdmFsdWVcIiB9LCBzdGF0ZS5zZWxlY3RlZFVuaXQgfHwgJ05vbmUnKSkpLFxuICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImFjdGlvbi1zZWN0aW9uXCIgfSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoM1wiLCBudWxsLCBcIkFjdGlvbnNcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogcmVxdWVzdEdvbGRCb251cywgY2xhc3NOYW1lOiBcImFjdGlvbi1idXR0b24gcHJpbWFyeVwiIH0sIFwiUmVxdWVzdCBHb2xkICgrMTAwKVwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiBjbGVhck1lc3NhZ2VzLCBjbGFzc05hbWU6IFwiYWN0aW9uLWJ1dHRvbiBzZWNvbmRhcnlcIiB9LCBcIkNsZWFyIE1lc3NhZ2VzXCIpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJtZXNzYWdlLXNlY3Rpb25cIiB9LFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImgzXCIsIG51bGwsIFwiTWVzc2FnZXNcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm1lc3NhZ2UtbGlzdFwiIH0sIHN0YXRlLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMCA/IChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcIm5vLW1lc3NhZ2VzXCIgfSwgXCJObyBtZXNzYWdlc1wiKSkgOiAoc3RhdGUubWVzc2FnZXMubWFwKChtZXNzYWdlLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBrZXk6IGluZGV4LCBjbGFzc05hbWU6IFwibWVzc2FnZS1pdGVtXCIgfSwgbWVzc2FnZSkpKSkpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJzdGF0dXMtc2VjdGlvblwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInN0YXR1cy1pbmRpY2F0b3JcIiB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3NOYW1lOiBcInN0YXR1cy1kb3QgYWN0aXZlXCIgfSksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCwgXCJQYW5lbCBBY3RpdmVcIikpKSkpO1xufTtcbi8vIOagt+W8j+WumuS5ie+8iOWGheiBlENTU++8jOS5n+WPr+S7peWNleeLrOaWh+S7tu+8iVxuY29uc3Qgc3R5bGVzID0gYFxyXG4uY3VzdG9tLXBhbmVsLWNvbnRhaW5lciB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDUwcHg7XHJcbiAgICByaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAzMjBweDtcclxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyYzNlNTAgMCUsICMzNDQ5NWUgMTAwJSk7XHJcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjMzQ5OGRiO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgZm9udC1mYW1pbHk6ICdBcmlhbCcsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBjb2xvcjogI2VjZjBmMTtcclxuICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgei1pbmRleDogMTAwMDtcclxufVxyXG5cclxuLnBhbmVsLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDEycHggMTZweDtcclxuICAgIGJhY2tncm91bmQ6ICMzNDk4ZGI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHggNnB4IDAgMDtcclxufVxyXG5cclxuLnBhbmVsLXRpdGxlIHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4uY2xvc2UtYnV0dG9uIHtcclxuICAgIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgd2lkdGg6IDI0cHg7XHJcbiAgICBoZWlnaHQ6IDI0cHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uY2xvc2UtYnV0dG9uOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxufVxyXG5cclxuLnBsYXllci1pbmZvLXNlY3Rpb24sXHJcbi5hY3Rpb24tc2VjdGlvbixcclxuLm1lc3NhZ2Utc2VjdGlvbixcclxuLnN0YXR1cy1zZWN0aW9uIHtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzM0NDk1ZTtcclxufVxyXG5cclxuLnBsYXllci1pbmZvLXNlY3Rpb246bGFzdC1jaGlsZCxcclxuLmFjdGlvbi1zZWN0aW9uOmxhc3QtY2hpbGQsXHJcbi5tZXNzYWdlLXNlY3Rpb246bGFzdC1jaGlsZCxcclxuLnN0YXR1cy1zZWN0aW9uOmxhc3QtY2hpbGQge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxufVxyXG5cclxuLnBsYXllci1pbmZvLXNlY3Rpb24gaDMsXHJcbi5hY3Rpb24tc2VjdGlvbiBoMyxcclxuLm1lc3NhZ2Utc2VjdGlvbiBoMyB7XHJcbiAgICBtYXJnaW46IDAgMCAxMnB4IDA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBjb2xvcjogIzM0OThkYjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG59XHJcblxyXG4uaW5mby1pdGVtIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbn1cclxuXHJcbi5pbmZvLWxhYmVsIHtcclxuICAgIGNvbG9yOiAjYmRjM2M3O1xyXG59XHJcblxyXG4uaW5mby12YWx1ZSB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLmluZm8tdmFsdWUuZ29sZCB7XHJcbiAgICBjb2xvcjogI2YxYzQwZjtcclxufVxyXG5cclxuLmFjdGlvbi1idXR0b24ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG59XHJcblxyXG4uYWN0aW9uLWJ1dHRvbi5wcmltYXJ5IHtcclxuICAgIGJhY2tncm91bmQ6ICMyN2FlNjA7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5hY3Rpb24tYnV0dG9uLnByaW1hcnk6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzJlY2M3MTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTtcclxufVxyXG5cclxuLmFjdGlvbi1idXR0b24uc2Vjb25kYXJ5IHtcclxuICAgIGJhY2tncm91bmQ6ICM5NWE1YTY7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi5hY3Rpb24tYnV0dG9uLnNlY29uZGFyeTpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjYmRjM2M3O1xyXG59XHJcblxyXG4ubWVzc2FnZS1saXN0IHtcclxuICAgIG1heC1oZWlnaHQ6IDEyMHB4O1xyXG4gICAgb3ZlcmZsb3cteTogYXV0bztcclxufVxyXG5cclxuLm1lc3NhZ2UtaXRlbSB7XHJcbiAgICBwYWRkaW5nOiA2cHggOHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG4gICAgYmFja2dyb3VuZDogcmdiYSg1MiwgNzMsIDk0LCAwLjMpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCAjMzQ5OGRiO1xyXG59XHJcblxyXG4ubm8tbWVzc2FnZXMge1xyXG4gICAgY29sb3I6ICM5NWE1YTY7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG59XHJcblxyXG4uc3RhdHVzLXNlY3Rpb24ge1xyXG4gICAgcGFkZGluZzogMTJweCAxNnB4O1xyXG59XHJcblxyXG4uc3RhdHVzLWluZGljYXRvciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxufVxyXG5cclxuLnN0YXR1cy1kb3Qge1xyXG4gICAgd2lkdGg6IDhweDtcclxuICAgIGhlaWdodDogOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbn1cclxuXHJcbi5zdGF0dXMtZG90LmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjMjdhZTYwO1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDZweCAjMjdhZTYwO1xyXG59XHJcblxyXG4uY3VzdG9tLXBhbmVsLXRvZ2dsZSB7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDUwcHg7XHJcbiAgICByaWdodDogMjBweDtcclxuICAgIHotaW5kZXg6IDEwMDA7XHJcbn1cclxuXHJcbi50b2dnbGUtYnV0dG9uIHtcclxuICAgIGJhY2tncm91bmQ6ICMzNDk4ZGI7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxufVxyXG5cclxuLnRvZ2dsZS1idXR0b246aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogIzI5ODBiOTtcclxufVxyXG5gO1xuLy8g5rOo5YWl5qC35byP5Yiw6aG16Z2iXG5jb25zdCBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gc3R5bGVzO1xuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuLy8g5riy5p+T57uE5Lu25YiwIFBhbm9yYW1hXG4kLk1zZygnQ3VzdG9tIFBhbmVsIGxvYWRlZCcpO1xuLy8g5a+85Ye657uE5Lu2XG5leHBvcnQgZGVmYXVsdCBDdXN0b21QYW5lbDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==