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
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\ui-manager\index.tsx ***!
  \*************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// 使用FusionDota的React导入方式
const React = globalThis.React;
const { useState, useEffect } = React;
// UI管理器组件
const UIManager = () => {
    const [uiState, setUIState] = useState({
        showSimpleButton: true, // 默认显示用于测试
        showCustomPanel: false,
        showTrainingPanel: false,
        showAutoChessPanel: false,
        gameMode: 'normal',
        debugMode: true // 默认开启调试模式用于测试
    });
    useEffect(() => {
        // 注册所有UI相关事件
        registerUIEvents();
        // 检查初始游戏状态
        loadInitialState();
        // 设置键盘快捷键
        setupKeyboardShortcuts();
        return () => {
            unregisterUIEvents();
        };
    }, []);
    // 注册UI事件
    const registerUIEvents = () => {
        // 显示自定义面板事件
        GameEvents.Subscribe('show_custom_panel', (data) => {
            handleShowPanel(data.panelType);
        });
        // 隐藏所有面板事件
        GameEvents.Subscribe('hide_all_panels', () => {
            hideAllPanels();
        });
        // 游戏模式变化事件
        GameEvents.Subscribe('game_mode_changed', (data) => {
            setUIState(prev => ({ ...prev, gameMode: data.newMode }));
            adjustUIForGameMode(data.newMode);
        });
        // 训练模式事件
        GameEvents.Subscribe('training_activate', () => {
            setUIState(prev => ({ ...prev, showTrainingPanel: true }));
        });
        GameEvents.Subscribe('training_deactivate', () => {
            setUIState(prev => ({ ...prev, showTrainingPanel: false }));
        });
        // 自走棋模式事件
        GameEvents.Subscribe('autochess_game_started', () => {
            setUIState(prev => ({ ...prev, showAutoChessPanel: true }));
        });
        GameEvents.Subscribe('autochess_game_ended', () => {
            setUIState(prev => ({ ...prev, showAutoChessPanel: false }));
        });
        // 监听网络表变化
        CustomNetTables.SubscribeNetTableListener('game_mode', onGameModeNetTableChanged);
        CustomNetTables.SubscribeNetTableListener('debug_info', onDebugInfoChanged);
    };
    // 取消注册事件
    const unregisterUIEvents = () => {
        GameEvents.Unsubscribe('show_custom_panel');
        GameEvents.Unsubscribe('hide_all_panels');
        GameEvents.Unsubscribe('game_mode_changed');
        GameEvents.Unsubscribe('training_activate');
        GameEvents.Unsubscribe('training_deactivate');
        GameEvents.Unsubscribe('autochess_game_started');
        GameEvents.Unsubscribe('autochess_game_ended');
    };
    // 处理显示面板请求
    const handleShowPanel = (panelType) => {
        switch (panelType) {
            case 'simple':
                setUIState(prev => ({ ...prev, showSimpleButton: true }));
                break;
            case 'custom':
                setUIState(prev => ({ ...prev, showCustomPanel: true }));
                break;
            case 'training':
                setUIState(prev => ({ ...prev, showTrainingPanel: true }));
                break;
            case 'autochess':
                setUIState(prev => ({ ...prev, showAutoChessPanel: true }));
                break;
            default:
                $.Msg(`Unknown panel type: ${panelType}`);
        }
    };
    // 根据游戏模式调整UI
    const adjustUIForGameMode = (mode) => {
        switch (mode) {
            case 'training':
                setUIState(prev => ({
                    ...prev,
                    showTrainingPanel: true,
                    showAutoChessPanel: false
                }));
                break;
            case 'autochess':
                setUIState(prev => ({
                    ...prev,
                    showAutoChessPanel: true,
                    showTrainingPanel: false
                }));
                break;
            case 'normal':
            default:
                setUIState(prev => ({
                    ...prev,
                    showTrainingPanel: false,
                    showAutoChessPanel: false
                }));
                break;
        }
    };
    // 网络表变化处理
    const onGameModeNetTableChanged = (tableName, key, data) => {
        if (key === 'current' && data) {
            setUIState(prev => ({ ...prev, gameMode: data.mode }));
        }
    };
    const onDebugInfoChanged = (tableName, key, data) => {
        if (key === 'system_status' && data) {
            setUIState(prev => ({ ...prev, debugMode: data.debugMode }));
        }
    };
    // 加载初始状态
    const loadInitialState = () => {
        // 获取当前游戏模式
        const gameModeData = CustomNetTables.GetTableValue('game_mode', 'current');
        if (gameModeData) {
            setUIState(prev => ({ ...prev, gameMode: gameModeData.mode }));
            adjustUIForGameMode(gameModeData.mode);
        }
        // 获取调试信息
        const debugInfo = CustomNetTables.GetTableValue('debug_info', 'system_status');
        if (debugInfo) {
            setUIState(prev => ({ ...prev, debugMode: debugInfo.debugMode }));
        }
    };
    // 设置键盘快捷键
    const setupKeyboardShortcuts = () => {
        const handleKeyPress = (event) => {
            // F8 - 切换简单按钮UI
            if (event.key === 'F8') {
                setUIState(prev => ({ ...prev, showSimpleButton: !prev.showSimpleButton }));
                $.Msg('Toggled Simple Button UI');
            }
            // F9 - 切换自定义面板UI
            if (event.key === 'F9') {
                setUIState(prev => ({ ...prev, showCustomPanel: !prev.showCustomPanel }));
                $.Msg('Toggled Custom Panel UI');
            }
            // Ctrl + H - 隐藏所有UI
            if (event.ctrlKey && event.key === 'h') {
                setUIState(prev => ({
                    ...prev,
                    showSimpleButton: false,
                    showCustomPanel: false
                }));
                $.Msg('Hidden all custom UI');
            }
        };
        document.addEventListener('keydown', handleKeyPress);
    };
    // 隐藏所有面板
    const hideAllPanels = () => {
        setUIState(prev => ({
            ...prev,
            showSimpleButton: false,
            showCustomPanel: false,
            showTrainingPanel: false,
            showAutoChessPanel: false
        }));
        $.Msg('All custom UI panels hidden');
    };
    // 切换面板显示状态
    const togglePanel = (panelName) => {
        setUIState(prev => ({
            ...prev,
            [panelName]: !prev[panelName]
        }));
    };
    return (React.createElement("div", { style: { width: '100%', height: '100%', position: 'relative' } },
        uiState.debugMode && (React.createElement("div", { style: {
                position: 'fixed',
                top: '10px',
                right: '10px',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '10px',
                borderRadius: '6px',
                fontSize: '12px',
                zIndex: 2000,
                minWidth: '200px'
            } },
            React.createElement("div", { style: {
                    borderBottom: '1px solid #333',
                    paddingBottom: '8px',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    color: '#00ff00'
                } }, "UI Debug Panel"),
            React.createElement("div", { style: { marginBottom: '4px' } },
                "Mode: ",
                React.createElement("span", { style: { color: '#yellow' } }, uiState.gameMode)),
            React.createElement("div", { style: { marginBottom: '8px', fontSize: '10px', color: '#ccc' } }, "F8: Simple Button | F9: Custom Panel | Ctrl+H: Hide All"),
            React.createElement("button", { onClick: () => togglePanel('showSimpleButton'), style: {
                    background: uiState.showSimpleButton ? '#27ae60' : '#7f8c8d',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    margin: '2px',
                    borderRadius: '3px',
                    fontSize: '10px',
                    cursor: 'pointer'
                } }, "Simple Button"),
            React.createElement("button", { onClick: () => togglePanel('showCustomPanel'), style: {
                    background: uiState.showCustomPanel ? '#27ae60' : '#7f8c8d',
                    color: 'white',
                    border: 'none',
                    padding: '4px 8px',
                    margin: '2px',
                    borderRadius: '3px',
                    fontSize: '10px',
                    cursor: 'pointer'
                } }, "Custom Panel"))),
        React.createElement("div", { style: {
                position: 'fixed',
                top: '10px',
                left: '10px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '14px',
                zIndex: 1000
            } },
            "Mode: ",
            React.createElement("span", { style: {
                    color: uiState.gameMode === 'training' ? '#f39c12' :
                        uiState.gameMode === 'autochess' ? '#9b59b6' : '#00ff00'
                } }, uiState.gameMode)),
        uiState.showSimpleButton && React.createElement(SimpleButtonPanel, null),
        uiState.showCustomPanel && React.createElement(CustomPanel, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIManager);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktbWFuYWdlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUI7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBLFFBQVEsc0JBQXNCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0NBQWtDLGlDQUFpQztBQUNuRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0NBQWtDLGtDQUFrQztBQUNwRSxTQUFTO0FBQ1Q7QUFDQSxrQ0FBa0MsbUNBQW1DO0FBQ3JFLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0NBQWtDLG1DQUFtQztBQUNyRSxTQUFTO0FBQ1Q7QUFDQSxrQ0FBa0Msb0NBQW9DO0FBQ3RFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsaUNBQWlDO0FBQ3ZFO0FBQ0E7QUFDQSxzQ0FBc0MsZ0NBQWdDO0FBQ3RFO0FBQ0E7QUFDQSxzQ0FBc0Msa0NBQWtDO0FBQ3hFO0FBQ0E7QUFDQSxzQ0FBc0MsbUNBQW1DO0FBQ3pFO0FBQ0E7QUFDQSxnQkFBZ0IsQ0FBQyw0QkFBNEIsVUFBVTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDhCQUE4QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0M7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0NBQXNDO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MseUNBQXlDO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG1EQUFtRDtBQUN6RixnQkFBZ0IsQ0FBQztBQUNqQjtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsaURBQWlEO0FBQ3ZGLGdCQUFnQixDQUFDO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGdCQUFnQixDQUFDO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxRQUFRLENBQUM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5Q0FBeUMsU0FBUyx1REFBdUQ7QUFDekcsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLHlDQUF5QyxTQUFTLHVCQUF1QjtBQUN6RTtBQUNBLDhDQUE4QyxTQUFTLG9CQUFvQjtBQUMzRSx5Q0FBeUMsU0FBUyx3REFBd0Q7QUFDMUcsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFNBQVMsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFx1aS1tYW5hZ2VyXFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8g5L2/55SoRnVzaW9uRG90YeeahFJlYWN05a+85YWl5pa55byPXG5jb25zdCBSZWFjdCA9IGdsb2JhbFRoaXMuUmVhY3Q7XG5jb25zdCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSA9IFJlYWN0O1xuLy8gVUnnrqHnkIblmajnu4Tku7ZcbmNvbnN0IFVJTWFuYWdlciA9ICgpID0+IHtcbiAgICBjb25zdCBbdWlTdGF0ZSwgc2V0VUlTdGF0ZV0gPSB1c2VTdGF0ZSh7XG4gICAgICAgIHNob3dTaW1wbGVCdXR0b246IHRydWUsIC8vIOm7mOiupOaYvuekuueUqOS6jua1i+ivlVxuICAgICAgICBzaG93Q3VzdG9tUGFuZWw6IGZhbHNlLFxuICAgICAgICBzaG93VHJhaW5pbmdQYW5lbDogZmFsc2UsXG4gICAgICAgIHNob3dBdXRvQ2hlc3NQYW5lbDogZmFsc2UsXG4gICAgICAgIGdhbWVNb2RlOiAnbm9ybWFsJyxcbiAgICAgICAgZGVidWdNb2RlOiB0cnVlIC8vIOm7mOiupOW8gOWQr+iwg+ivleaooeW8j+eUqOS6jua1i+ivlVxuICAgIH0pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIOazqOWGjOaJgOaciVVJ55u45YWz5LqL5Lu2XG4gICAgICAgIHJlZ2lzdGVyVUlFdmVudHMoKTtcbiAgICAgICAgLy8g5qOA5p+l5Yid5aeL5ri45oiP54q25oCBXG4gICAgICAgIGxvYWRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgLy8g6K6+572u6ZSu55uY5b+r5o236ZSuXG4gICAgICAgIHNldHVwS2V5Ym9hcmRTaG9ydGN1dHMoKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHVucmVnaXN0ZXJVSUV2ZW50cygpO1xuICAgICAgICB9O1xuICAgIH0sIFtdKTtcbiAgICAvLyDms6jlhoxVSeS6i+S7tlxuICAgIGNvbnN0IHJlZ2lzdGVyVUlFdmVudHMgPSAoKSA9PiB7XG4gICAgICAgIC8vIOaYvuekuuiHquWumuS5iemdouadv+S6i+S7tlxuICAgICAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnc2hvd19jdXN0b21fcGFuZWwnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlU2hvd1BhbmVsKGRhdGEucGFuZWxUeXBlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOmakOiXj+aJgOaciemdouadv+S6i+S7tlxuICAgICAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnaGlkZV9hbGxfcGFuZWxzJywgKCkgPT4ge1xuICAgICAgICAgICAgaGlkZUFsbFBhbmVscygpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5ri45oiP5qih5byP5Y+Y5YyW5LqL5Lu2XG4gICAgICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX21vZGVfY2hhbmdlZCcsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHsgLi4ucHJldiwgZ2FtZU1vZGU6IGRhdGEubmV3TW9kZSB9KSk7XG4gICAgICAgICAgICBhZGp1c3RVSUZvckdhbWVNb2RlKGRhdGEubmV3TW9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDorq3nu4PmqKHlvI/kuovku7ZcbiAgICAgICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3RyYWluaW5nX2FjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0VUlTdGF0ZShwcmV2ID0+ICh7IC4uLnByZXYsIHNob3dUcmFpbmluZ1BhbmVsOiB0cnVlIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCd0cmFpbmluZ19kZWFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgc2V0VUlTdGF0ZShwcmV2ID0+ICh7IC4uLnByZXYsIHNob3dUcmFpbmluZ1BhbmVsOiBmYWxzZSB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDoh6rotbDmo4vmqKHlvI/kuovku7ZcbiAgICAgICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2F1dG9jaGVzc19nYW1lX3N0YXJ0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHsgLi4ucHJldiwgc2hvd0F1dG9DaGVzc1BhbmVsOiB0cnVlIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdhdXRvY2hlc3NfZ2FtZV9lbmRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHNldFVJU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBzaG93QXV0b0NoZXNzUGFuZWw6IGZhbHNlIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIOebkeWQrOe9kee7nOihqOWPmOWMllxuICAgICAgICBDdXN0b21OZXRUYWJsZXMuU3Vic2NyaWJlTmV0VGFibGVMaXN0ZW5lcignZ2FtZV9tb2RlJywgb25HYW1lTW9kZU5ldFRhYmxlQ2hhbmdlZCk7XG4gICAgICAgIEN1c3RvbU5ldFRhYmxlcy5TdWJzY3JpYmVOZXRUYWJsZUxpc3RlbmVyKCdkZWJ1Z19pbmZvJywgb25EZWJ1Z0luZm9DaGFuZ2VkKTtcbiAgICB9O1xuICAgIC8vIOWPlua2iOazqOWGjOS6i+S7tlxuICAgIGNvbnN0IHVucmVnaXN0ZXJVSUV2ZW50cyA9ICgpID0+IHtcbiAgICAgICAgR2FtZUV2ZW50cy5VbnN1YnNjcmliZSgnc2hvd19jdXN0b21fcGFuZWwnKTtcbiAgICAgICAgR2FtZUV2ZW50cy5VbnN1YnNjcmliZSgnaGlkZV9hbGxfcGFuZWxzJyk7XG4gICAgICAgIEdhbWVFdmVudHMuVW5zdWJzY3JpYmUoJ2dhbWVfbW9kZV9jaGFuZ2VkJyk7XG4gICAgICAgIEdhbWVFdmVudHMuVW5zdWJzY3JpYmUoJ3RyYWluaW5nX2FjdGl2YXRlJyk7XG4gICAgICAgIEdhbWVFdmVudHMuVW5zdWJzY3JpYmUoJ3RyYWluaW5nX2RlYWN0aXZhdGUnKTtcbiAgICAgICAgR2FtZUV2ZW50cy5VbnN1YnNjcmliZSgnYXV0b2NoZXNzX2dhbWVfc3RhcnRlZCcpO1xuICAgICAgICBHYW1lRXZlbnRzLlVuc3Vic2NyaWJlKCdhdXRvY2hlc3NfZ2FtZV9lbmRlZCcpO1xuICAgIH07XG4gICAgLy8g5aSE55CG5pi+56S66Z2i5p2/6K+35rGCXG4gICAgY29uc3QgaGFuZGxlU2hvd1BhbmVsID0gKHBhbmVsVHlwZSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHBhbmVsVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnc2ltcGxlJzpcbiAgICAgICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHsgLi4ucHJldiwgc2hvd1NpbXBsZUJ1dHRvbjogdHJ1ZSB9KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICAgICAgICAgIHNldFVJU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBzaG93Q3VzdG9tUGFuZWw6IHRydWUgfSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndHJhaW5pbmcnOlxuICAgICAgICAgICAgICAgIHNldFVJU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBzaG93VHJhaW5pbmdQYW5lbDogdHJ1ZSB9KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdhdXRvY2hlc3MnOlxuICAgICAgICAgICAgICAgIHNldFVJU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBzaG93QXV0b0NoZXNzUGFuZWw6IHRydWUgfSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAkLk1zZyhgVW5rbm93biBwYW5lbCB0eXBlOiAke3BhbmVsVHlwZX1gKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8g5qC55o2u5ri45oiP5qih5byP6LCD5pW0VUlcbiAgICBjb25zdCBhZGp1c3RVSUZvckdhbWVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICBjYXNlICd0cmFpbmluZyc6XG4gICAgICAgICAgICAgICAgc2V0VUlTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgIHNob3dUcmFpbmluZ1BhbmVsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzaG93QXV0b0NoZXNzUGFuZWw6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYXV0b2NoZXNzJzpcbiAgICAgICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgc2hvd0F1dG9DaGVzc1BhbmVsOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzaG93VHJhaW5pbmdQYW5lbDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdub3JtYWwnOlxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RyYWluaW5nUGFuZWw6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzaG93QXV0b0NoZXNzUGFuZWw6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDnvZHnu5zooajlj5jljJblpITnkIZcbiAgICBjb25zdCBvbkdhbWVNb2RlTmV0VGFibGVDaGFuZ2VkID0gKHRhYmxlTmFtZSwga2V5LCBkYXRhKSA9PiB7XG4gICAgICAgIGlmIChrZXkgPT09ICdjdXJyZW50JyAmJiBkYXRhKSB7XG4gICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHsgLi4ucHJldiwgZ2FtZU1vZGU6IGRhdGEubW9kZSB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVidWdJbmZvQ2hhbmdlZCA9ICh0YWJsZU5hbWUsIGtleSwgZGF0YSkgPT4ge1xuICAgICAgICBpZiAoa2V5ID09PSAnc3lzdGVtX3N0YXR1cycgJiYgZGF0YSkge1xuICAgICAgICAgICAgc2V0VUlTdGF0ZShwcmV2ID0+ICh7IC4uLnByZXYsIGRlYnVnTW9kZTogZGF0YS5kZWJ1Z01vZGUgfSkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyDliqDovb3liJ3lp4vnirbmgIFcbiAgICBjb25zdCBsb2FkSW5pdGlhbFN0YXRlID0gKCkgPT4ge1xuICAgICAgICAvLyDojrflj5blvZPliY3muLjmiI/mqKHlvI9cbiAgICAgICAgY29uc3QgZ2FtZU1vZGVEYXRhID0gQ3VzdG9tTmV0VGFibGVzLkdldFRhYmxlVmFsdWUoJ2dhbWVfbW9kZScsICdjdXJyZW50Jyk7XG4gICAgICAgIGlmIChnYW1lTW9kZURhdGEpIHtcbiAgICAgICAgICAgIHNldFVJU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBnYW1lTW9kZTogZ2FtZU1vZGVEYXRhLm1vZGUgfSkpO1xuICAgICAgICAgICAgYWRqdXN0VUlGb3JHYW1lTW9kZShnYW1lTW9kZURhdGEubW9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6I635Y+W6LCD6K+V5L+h5oGvXG4gICAgICAgIGNvbnN0IGRlYnVnSW5mbyA9IEN1c3RvbU5ldFRhYmxlcy5HZXRUYWJsZVZhbHVlKCdkZWJ1Z19pbmZvJywgJ3N5c3RlbV9zdGF0dXMnKTtcbiAgICAgICAgaWYgKGRlYnVnSW5mbykge1xuICAgICAgICAgICAgc2V0VUlTdGF0ZShwcmV2ID0+ICh7IC4uLnByZXYsIGRlYnVnTW9kZTogZGVidWdJbmZvLmRlYnVnTW9kZSB9KSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIOiuvue9rumUruebmOW/q+aNt+mUrlxuICAgIGNvbnN0IHNldHVwS2V5Ym9hcmRTaG9ydGN1dHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUtleVByZXNzID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBGOCAtIOWIh+aNoueugOWNleaMiemSrlVJXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRjgnKSB7XG4gICAgICAgICAgICAgICAgc2V0VUlTdGF0ZShwcmV2ID0+ICh7IC4uLnByZXYsIHNob3dTaW1wbGVCdXR0b246ICFwcmV2LnNob3dTaW1wbGVCdXR0b24gfSkpO1xuICAgICAgICAgICAgICAgICQuTXNnKCdUb2dnbGVkIFNpbXBsZSBCdXR0b24gVUknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEY5IC0g5YiH5o2i6Ieq5a6a5LmJ6Z2i5p2/VUlcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09ICdGOScpIHtcbiAgICAgICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHsgLi4ucHJldiwgc2hvd0N1c3RvbVBhbmVsOiAhcHJldi5zaG93Q3VzdG9tUGFuZWwgfSkpO1xuICAgICAgICAgICAgICAgICQuTXNnKCdUb2dnbGVkIEN1c3RvbSBQYW5lbCBVSScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ3RybCArIEggLSDpmpDol4/miYDmnIlVSVxuICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkgJiYgZXZlbnQua2V5ID09PSAnaCcpIHtcbiAgICAgICAgICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgc2hvd1NpbXBsZUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHNob3dDdXN0b21QYW5lbDogZmFsc2VcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgJC5Nc2coJ0hpZGRlbiBhbGwgY3VzdG9tIFVJJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlQcmVzcyk7XG4gICAgfTtcbiAgICAvLyDpmpDol4/miYDmnInpnaLmnb9cbiAgICBjb25zdCBoaWRlQWxsUGFuZWxzID0gKCkgPT4ge1xuICAgICAgICBzZXRVSVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBzaG93U2ltcGxlQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dDdXN0b21QYW5lbDogZmFsc2UsXG4gICAgICAgICAgICBzaG93VHJhaW5pbmdQYW5lbDogZmFsc2UsXG4gICAgICAgICAgICBzaG93QXV0b0NoZXNzUGFuZWw6IGZhbHNlXG4gICAgICAgIH0pKTtcbiAgICAgICAgJC5Nc2coJ0FsbCBjdXN0b20gVUkgcGFuZWxzIGhpZGRlbicpO1xuICAgIH07XG4gICAgLy8g5YiH5o2i6Z2i5p2/5pi+56S654q25oCBXG4gICAgY29uc3QgdG9nZ2xlUGFuZWwgPSAocGFuZWxOYW1lKSA9PiB7XG4gICAgICAgIHNldFVJU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtwYW5lbE5hbWVdOiAhcHJldltwYW5lbE5hbWVdXG4gICAgICAgIH0pKTtcbiAgICB9O1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBwb3NpdGlvbjogJ3JlbGF0aXZlJyB9IH0sXG4gICAgICAgIHVpU3RhdGUuZGVidWdNb2RlICYmIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgICAgICAgICAgICB0b3A6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICByaWdodDogJzEwcHgnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuOCknLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc2cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgekluZGV4OiAyMDAwLFxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAnMjAwcHgnXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkICMzMzMnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwMGZmMDAnXG4gICAgICAgICAgICAgICAgfSB9LCBcIlVJIERlYnVnIFBhbmVsXCIpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogJzRweCcgfSB9LFxuICAgICAgICAgICAgICAgIFwiTW9kZTogXCIsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgeyBzdHlsZTogeyBjb2xvcjogJyN5ZWxsb3cnIH0gfSwgdWlTdGF0ZS5nYW1lTW9kZSkpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IHN0eWxlOiB7IG1hcmdpbkJvdHRvbTogJzhweCcsIGZvbnRTaXplOiAnMTBweCcsIGNvbG9yOiAnI2NjYycgfSB9LCBcIkY4OiBTaW1wbGUgQnV0dG9uIHwgRjk6IEN1c3RvbSBQYW5lbCB8IEN0cmwrSDogSGlkZSBBbGxcIiksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgb25DbGljazogKCkgPT4gdG9nZ2xlUGFuZWwoJ3Nob3dTaW1wbGVCdXR0b24nKSwgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdWlTdGF0ZS5zaG93U2ltcGxlQnV0dG9uID8gJyMyN2FlNjAnIDogJyM3ZjhjOGQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc0cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnM3B4JyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICAgICAgICB9IH0sIFwiU2ltcGxlIEJ1dHRvblwiKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBvbkNsaWNrOiAoKSA9PiB0b2dnbGVQYW5lbCgnc2hvd0N1c3RvbVBhbmVsJyksIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHVpU3RhdGUuc2hvd0N1c3RvbVBhbmVsID8gJyMyN2FlNjAnIDogJyM3ZjhjOGQnLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc0cHggOHB4JyxcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAnMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnM3B4JyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgICAgICAgICB9IH0sIFwiQ3VzdG9tIFBhbmVsXCIpKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBzdHlsZToge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAgIHRvcDogJzEwcHgnLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICcxMHB4JyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDEycHgnLFxuICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDBcbiAgICAgICAgICAgIH0gfSxcbiAgICAgICAgICAgIFwiTW9kZTogXCIsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiB1aVN0YXRlLmdhbWVNb2RlID09PSAndHJhaW5pbmcnID8gJyNmMzljMTInIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpU3RhdGUuZ2FtZU1vZGUgPT09ICdhdXRvY2hlc3MnID8gJyM5YjU5YjYnIDogJyMwMGZmMDAnXG4gICAgICAgICAgICAgICAgfSB9LCB1aVN0YXRlLmdhbWVNb2RlKSksXG4gICAgICAgIHVpU3RhdGUuc2hvd1NpbXBsZUJ1dHRvbiAmJiBSZWFjdC5jcmVhdGVFbGVtZW50KFNpbXBsZUJ1dHRvblBhbmVsLCBudWxsKSxcbiAgICAgICAgdWlTdGF0ZS5zaG93Q3VzdG9tUGFuZWwgJiYgUmVhY3QuY3JlYXRlRWxlbWVudChDdXN0b21QYW5lbCwgbnVsbCkpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBVSU1hbmFnZXI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=