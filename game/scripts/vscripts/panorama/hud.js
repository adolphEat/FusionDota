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
// 简单的HUD测试 - 证明FusionDota框架正常运行
// 输出加载消息
$.Msg('=== FusionDota HUD Loading ===');
// 创建简单的测试按钮
function createSimpleTestButtons() {
    $.Msg('Creating simple test buttons...');
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    $.Msg('Root panel: ' + (rootPanel ? 'Found' : 'Not found'));
    // 先删除之前的容器（如果存在）
    const existingContainer = rootPanel.FindChildInLayoutFile('TestButtonContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
        $.Msg('Removed existing container');
    }
    // 创建按钮容器 - 使用更明显的位置和样式
    const container = $.CreatePanel('Panel', rootPanel, 'TestButtonContainer');
    container.style.position = 'absolute';
    container.style.top = '50px'; // 更靠上
    container.style.right = '50px'; // 右上角更明显
    container.style.width = '350px';
    container.style.height = '120px';
    container.style.backgroundColor = 'rgba(255, 0, 0, 0.9)'; // 更明显的红色背景
    container.style.border = '5px solid #ffff00'; // 更粗的黄色边框
    container.style.borderRadius = '10px';
    container.style.zIndex = '99999'; // 更高的层级
    container.style.padding = '15px';
    container.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.8)'; // 发光效果
    $.Msg('Button container created');
    // 添加标题
    const title = $.CreatePanel('Label', container, 'TitleLabel');
    title.text = '🎮 FusionDota 测试面板';
    title.style.color = '#ffff00';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '10px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';
    // 按钮1
    const button1 = $.CreatePanel('Button', container, 'TestButton1');
    button1.text = '🔵 测试按钮1';
    button1.style.width = '140px';
    button1.style.height = '45px';
    button1.style.margin = '5px';
    button1.style.backgroundColor = '#007bff';
    button1.style.color = 'white';
    button1.style.fontSize = '16px';
    button1.style.fontWeight = 'bold';
    button1.style.border = '2px solid #0056b3';
    button1.style.borderRadius = '8px';
    button1.style.cursor = 'pointer';
    button1.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
    button1.SetPanelEvent('onactivate', () => {
        $.Msg('=== 按钮1被点击了！时间: ' + new Date().toLocaleTimeString() + ' ===');
        button1.text = '✅ 已点击!';
        button1.style.backgroundColor = '#28a745';
        button1.style.border = '2px solid #1e7e34';
    });
    // 按钮2
    const button2 = $.CreatePanel('Button', container, 'TestButton2');
    button2.text = '🔴 测试按钮2';
    button2.style.width = '140px';
    button2.style.height = '45px';
    button2.style.margin = '5px';
    button2.style.backgroundColor = '#dc3545';
    button2.style.color = 'white';
    button2.style.fontSize = '16px';
    button2.style.fontWeight = 'bold';
    button2.style.border = '2px solid #c82333';
    button2.style.borderRadius = '8px';
    button2.style.cursor = 'pointer';
    button2.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
    button2.SetPanelEvent('onactivate', () => {
        $.Msg('=== 按钮2被点击了！时间: ' + new Date().toLocaleTimeString() + ' ===');
        button2.text = '🟡 成功!';
        button2.style.backgroundColor = '#ffc107';
        button2.style.color = 'black';
        button2.style.border = '2px solid #d39e00';
    });
    $.Msg('Both test buttons created successfully!');
    // 添加游戏模式信息标签
    const infoLabel = $.CreatePanel('Label', container, 'InfoLabel');
    infoLabel.text = '当前模式: 加载中...';
    infoLabel.style.color = '#00ff00';
    infoLabel.style.fontSize = '16px';
    infoLabel.style.fontWeight = 'bold';
    infoLabel.style.textAlign = 'center';
    infoLabel.style.marginTop = '10px';
    infoLabel.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';
    // 监听游戏模式变化
    GameEvents.Subscribe('game_mode_changed', (data) => {
        $.Msg('收到游戏模式变化事件:', data);
        updateGameModeLabel(infoLabel, data.newMode);
    });
    // 从网络表读取当前模式（多次尝试）
    let checkAttempts = 0;
    const checkGameMode = () => {
        checkAttempts++;
        const gameModeData = CustomNetTables.GetTableValue('game_mode', 'current');
        $.Msg(`尝试读取游戏模式 #${checkAttempts}:`, gameModeData);
        if (gameModeData && gameModeData.mode) {
            updateGameModeLabel(infoLabel, gameModeData.mode);
        }
        else if (checkAttempts < 10) {
            $.Schedule(1.0, checkGameMode);
        }
    };
    $.Schedule(0.5, checkGameMode);
    // 监听网络表变化
    CustomNetTables.SubscribeNetTableListener('game_mode', (tableName, key, data) => {
        $.Msg('网络表更新:', tableName, key, data);
        if (key === 'current' && data && data.mode) {
            updateGameModeLabel(infoLabel, data.mode);
        }
    });
}
// 更新游戏模式标签
function updateGameModeLabel(label, mode) {
    const modeNames = {
        'normal': '🎮 正常模式',
        'training': '🏟️ 练功房模式',
        'autochess': '♟️ 自走棋模式',
        'custom': '⚙️ 自定义模式'
    };
    const displayName = modeNames[mode] || `🎯 ${mode}`;
    label.text = `当前模式: ${displayName}`;
    // 根据模式改变颜色
    const modeColors = {
        'normal': '#00ff00',
        'training': '#ffff00',
        'autochess': '#ff00ff',
        'custom': '#00ffff'
    };
    label.style.color = modeColors[mode] || '#ffffff';
    $.Msg(`游戏模式标签已更新: ${displayName}`);
}
// 初始化函数
function initializeHUD() {
    $.Msg('=== Initializing HUD ===');
    // 多次尝试初始化，确保按钮能显示
    let attempts = 0;
    const maxAttempts = 5;
    function tryCreateButtons() {
        attempts++;
        $.Msg('=== 创建按钮尝试 #' + attempts + ' ===');
        try {
            createSimpleTestButtons();
            $.Msg('按钮创建成功！');
        }
        catch (error) {
            $.Msg('按钮创建失败: ' + error);
        }
        if (attempts < maxAttempts) {
            $.Schedule(1.0, tryCreateButtons);
        }
    }
    // 立即尝试
    tryCreateButtons();
    // 设置键盘快捷键
    $.RegisterKeyBind($.GetContextPanel(), 'key_f9', () => {
        $.Msg('=== F9键被按下，重新创建按钮 ===');
        createSimpleTestButtons();
    });
    $.RegisterKeyBind($.GetContextPanel(), 'key_f8', () => {
        $.Msg('=== F8键被按下，显示面板信息 ===');
        const root = $.GetContextPanel();
        $.Msg('Root panel: ' + root);
        $.Msg('Panel ID: ' + (root ? root.id : 'None'));
        $.Msg('Panel class: ' + (root ? root.GetAttributeString('class', 'no-class') : 'None'));
    });
    $.Msg('=== HUD initialization complete ===');
}
// 导出全局函数供控制台调用
globalThis.FusionTest = {
    createButtons: createSimpleTestButtons,
    test: () => {
        $.Msg('FusionDota框架测试函数调用成功！');
        return 'Framework is working!';
    }
};
// 立即执行初始化
$.Msg('=== Starting HUD initialization ===');
initializeHUD();
// 紧急备用方案已禁用 - 使用主UI系统
// $.Schedule(2.0, () => {
//     $.Msg('=== Emergency UI creation ===');
// });
// 导出React组件（保持兼容性）
const HudPanel = () => {
    return null; // 使用原生Panorama，不需要React渲染
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HudPanel);
$.Msg('=== HUD module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpRUFBZSxRQUFRLEVBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxodWRcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBAdHMtbm9jaGVja1xuLy8g566A5Y2V55qESFVE5rWL6K+VIC0g6K+B5piORnVzaW9uRG90Yeahhuaetuato+W4uOi/kOihjFxuLy8g6L6T5Ye65Yqg6L295raI5oGvXG4kLk1zZygnPT09IEZ1c2lvbkRvdGEgSFVEIExvYWRpbmcgPT09Jyk7XG4vLyDliJvlu7rnroDljZXnmoTmtYvor5XmjInpkq5cbmZ1bmN0aW9uIGNyZWF0ZVNpbXBsZVRlc3RCdXR0b25zKCkge1xuICAgICQuTXNnKCdDcmVhdGluZyBzaW1wbGUgdGVzdCBidXR0b25zLi4uJyk7XG4gICAgLy8g6I635Y+W5qC56Z2i5p2/XG4gICAgY29uc3Qgcm9vdFBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKTtcbiAgICAkLk1zZygnUm9vdCBwYW5lbDogJyArIChyb290UGFuZWwgPyAnRm91bmQnIDogJ05vdCBmb3VuZCcpKTtcbiAgICAvLyDlhYjliKDpmaTkuYvliY3nmoTlrrnlmajvvIjlpoLmnpzlrZjlnKjvvIlcbiAgICBjb25zdCBleGlzdGluZ0NvbnRhaW5lciA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1Rlc3RCdXR0b25Db250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgICQuTXNnKCdSZW1vdmVkIGV4aXN0aW5nIGNvbnRhaW5lcicpO1xuICAgIH1cbiAgICAvLyDliJvlu7rmjInpkq7lrrnlmaggLSDkvb/nlKjmm7TmmI7mmL7nmoTkvY3nva7lkozmoLflvI9cbiAgICBjb25zdCBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ1Rlc3RCdXR0b25Db250YWluZXInKTtcbiAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSAnNTBweCc7IC8vIOabtOmdoOS4ilxuICAgIGNvbnRhaW5lci5zdHlsZS5yaWdodCA9ICc1MHB4JzsgLy8g5Y+z5LiK6KeS5pu05piO5pi+XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzM1MHB4JztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEyMHB4JztcbiAgICBjb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAwLCAwLCAwLjkpJzsgLy8g5pu05piO5pi+55qE57qi6Imy6IOM5pmvXG4gICAgY29udGFpbmVyLnN0eWxlLmJvcmRlciA9ICc1cHggc29saWQgI2ZmZmYwMCc7IC8vIOabtOeyl+eahOm7hOiJsui+ueahhlxuICAgIGNvbnRhaW5lci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICc5OTk5OSc7IC8vIOabtOmrmOeahOWxgue6p1xuICAgIGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDIwcHggcmdiYSgyNTUsIDI1NSwgMCwgMC44KSc7IC8vIOWPkeWFieaViOaenFxuICAgICQuTXNnKCdCdXR0b24gY29udGFpbmVyIGNyZWF0ZWQnKTtcbiAgICAvLyDmt7vliqDmoIfpophcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY29udGFpbmVyLCAnVGl0bGVMYWJlbCcpO1xuICAgIHRpdGxlLnRleHQgPSAn8J+OriBGdXNpb25Eb3RhIOa1i+ivlemdouadvyc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSAnI2ZmZmYwMCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcycHggMnB4IDRweCByZ2JhKDAsMCwwLDEpJztcbiAgICAvLyDmjInpkq4xXG4gICAgY29uc3QgYnV0dG9uMSA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGNvbnRhaW5lciwgJ1Rlc3RCdXR0b24xJyk7XG4gICAgYnV0dG9uMS50ZXh0ID0gJ/CflLUg5rWL6K+V5oyJ6ZKuMSc7XG4gICAgYnV0dG9uMS5zdHlsZS53aWR0aCA9ICcxNDBweCc7XG4gICAgYnV0dG9uMS5zdHlsZS5oZWlnaHQgPSAnNDVweCc7XG4gICAgYnV0dG9uMS5zdHlsZS5tYXJnaW4gPSAnNXB4JztcbiAgICBidXR0b24xLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMDA3YmZmJztcbiAgICBidXR0b24xLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICBidXR0b24xLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIGJ1dHRvbjEuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBidXR0b24xLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgIzAwNTZiMyc7XG4gICAgYnV0dG9uMS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICBidXR0b24xLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICBidXR0b24xLnN0eWxlLnRleHRTaGFkb3cgPSAnMXB4IDFweCAycHggcmdiYSgwLDAsMCwwLjgpJztcbiAgICBidXR0b24xLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCc9PT0g5oyJ6ZKuMeiiq+eCueWHu+S6hu+8geaXtumXtDogJyArIG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCkgKyAnID09PScpO1xuICAgICAgICBidXR0b24xLnRleHQgPSAn4pyFIOW3sueCueWHuyEnO1xuICAgICAgICBidXR0b24xLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjMjhhNzQ1JztcbiAgICAgICAgYnV0dG9uMS5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICMxZTdlMzQnO1xuICAgIH0pO1xuICAgIC8vIOaMiemSrjJcbiAgICBjb25zdCBidXR0b24yID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgY29udGFpbmVyLCAnVGVzdEJ1dHRvbjInKTtcbiAgICBidXR0b24yLnRleHQgPSAn8J+UtCDmtYvor5XmjInpkq4yJztcbiAgICBidXR0b24yLnN0eWxlLndpZHRoID0gJzE0MHB4JztcbiAgICBidXR0b24yLnN0eWxlLmhlaWdodCA9ICc0NXB4JztcbiAgICBidXR0b24yLnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgIGJ1dHRvbjIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNkYzM1NDUnO1xuICAgIGJ1dHRvbjIuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgIGJ1dHRvbjIuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgYnV0dG9uMi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGJ1dHRvbjIuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjYzgyMzMzJztcbiAgICBidXR0b24yLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGJ1dHRvbjIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIGJ1dHRvbjIuc3R5bGUudGV4dFNoYWRvdyA9ICcxcHggMXB4IDJweCByZ2JhKDAsMCwwLDAuOCknO1xuICAgIGJ1dHRvbjIuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSDmjInpkq4y6KKr54K55Ye75LqG77yB5pe26Ze0OiAnICsgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSArICcgPT09Jyk7XG4gICAgICAgIGJ1dHRvbjIudGV4dCA9ICfwn5+hIOaIkOWKnyEnO1xuICAgICAgICBidXR0b24yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjZmZjMTA3JztcbiAgICAgICAgYnV0dG9uMi5zdHlsZS5jb2xvciA9ICdibGFjayc7XG4gICAgICAgIGJ1dHRvbjIuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjZDM5ZTAwJztcbiAgICB9KTtcbiAgICAkLk1zZygnQm90aCB0ZXN0IGJ1dHRvbnMgY3JlYXRlZCBzdWNjZXNzZnVsbHkhJyk7XG4gICAgLy8g5re75Yqg5ri45oiP5qih5byP5L+h5oGv5qCH562+XG4gICAgY29uc3QgaW5mb0xhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBjb250YWluZXIsICdJbmZvTGFiZWwnKTtcbiAgICBpbmZvTGFiZWwudGV4dCA9ICflvZPliY3mqKHlvI86IOWKoOi9veS4rS4uLic7XG4gICAgaW5mb0xhYmVsLnN0eWxlLmNvbG9yID0gJyMwMGZmMDAnO1xuICAgIGluZm9MYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBpbmZvTGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBpbmZvTGFiZWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgaW5mb0xhYmVsLnN0eWxlLm1hcmdpblRvcCA9ICcxMHB4JztcbiAgICBpbmZvTGFiZWwuc3R5bGUudGV4dFNoYWRvdyA9ICcycHggMnB4IDRweCByZ2JhKDAsMCwwLDEpJztcbiAgICAvLyDnm5HlkKzmuLjmiI/mqKHlvI/lj5jljJZcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9tb2RlX2NoYW5nZWQnLCAoZGF0YSkgPT4ge1xuICAgICAgICAkLk1zZygn5pS25Yiw5ri45oiP5qih5byP5Y+Y5YyW5LqL5Lu2OicsIGRhdGEpO1xuICAgICAgICB1cGRhdGVHYW1lTW9kZUxhYmVsKGluZm9MYWJlbCwgZGF0YS5uZXdNb2RlKTtcbiAgICB9KTtcbiAgICAvLyDku47nvZHnu5zooajor7vlj5blvZPliY3mqKHlvI/vvIjlpJrmrKHlsJ3or5XvvIlcbiAgICBsZXQgY2hlY2tBdHRlbXB0cyA9IDA7XG4gICAgY29uc3QgY2hlY2tHYW1lTW9kZSA9ICgpID0+IHtcbiAgICAgICAgY2hlY2tBdHRlbXB0cysrO1xuICAgICAgICBjb25zdCBnYW1lTW9kZURhdGEgPSBDdXN0b21OZXRUYWJsZXMuR2V0VGFibGVWYWx1ZSgnZ2FtZV9tb2RlJywgJ2N1cnJlbnQnKTtcbiAgICAgICAgJC5Nc2coYOWwneivleivu+WPlua4uOaIj+aooeW8jyAjJHtjaGVja0F0dGVtcHRzfTpgLCBnYW1lTW9kZURhdGEpO1xuICAgICAgICBpZiAoZ2FtZU1vZGVEYXRhICYmIGdhbWVNb2RlRGF0YS5tb2RlKSB7XG4gICAgICAgICAgICB1cGRhdGVHYW1lTW9kZUxhYmVsKGluZm9MYWJlbCwgZ2FtZU1vZGVEYXRhLm1vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNoZWNrQXR0ZW1wdHMgPCAxMCkge1xuICAgICAgICAgICAgJC5TY2hlZHVsZSgxLjAsIGNoZWNrR2FtZU1vZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAkLlNjaGVkdWxlKDAuNSwgY2hlY2tHYW1lTW9kZSk7XG4gICAgLy8g55uR5ZCs572R57uc6KGo5Y+Y5YyWXG4gICAgQ3VzdG9tTmV0VGFibGVzLlN1YnNjcmliZU5ldFRhYmxlTGlzdGVuZXIoJ2dhbWVfbW9kZScsICh0YWJsZU5hbWUsIGtleSwgZGF0YSkgPT4ge1xuICAgICAgICAkLk1zZygn572R57uc6KGo5pu05pawOicsIHRhYmxlTmFtZSwga2V5LCBkYXRhKTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2N1cnJlbnQnICYmIGRhdGEgJiYgZGF0YS5tb2RlKSB7XG4gICAgICAgICAgICB1cGRhdGVHYW1lTW9kZUxhYmVsKGluZm9MYWJlbCwgZGF0YS5tb2RlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8g5pu05paw5ri45oiP5qih5byP5qCH562+XG5mdW5jdGlvbiB1cGRhdGVHYW1lTW9kZUxhYmVsKGxhYmVsLCBtb2RlKSB7XG4gICAgY29uc3QgbW9kZU5hbWVzID0ge1xuICAgICAgICAnbm9ybWFsJzogJ/Cfjq4g5q2j5bi45qih5byPJyxcbiAgICAgICAgJ3RyYWluaW5nJzogJ/Cfj5/vuI8g57uD5Yqf5oi/5qih5byPJyxcbiAgICAgICAgJ2F1dG9jaGVzcyc6ICfimZ/vuI8g6Ieq6LWw5qOL5qih5byPJyxcbiAgICAgICAgJ2N1c3RvbSc6ICfimpnvuI8g6Ieq5a6a5LmJ5qih5byPJ1xuICAgIH07XG4gICAgY29uc3QgZGlzcGxheU5hbWUgPSBtb2RlTmFtZXNbbW9kZV0gfHwgYPCfjq8gJHttb2RlfWA7XG4gICAgbGFiZWwudGV4dCA9IGDlvZPliY3mqKHlvI86ICR7ZGlzcGxheU5hbWV9YDtcbiAgICAvLyDmoLnmja7mqKHlvI/mlLnlj5jpopzoibJcbiAgICBjb25zdCBtb2RlQ29sb3JzID0ge1xuICAgICAgICAnbm9ybWFsJzogJyMwMGZmMDAnLFxuICAgICAgICAndHJhaW5pbmcnOiAnI2ZmZmYwMCcsXG4gICAgICAgICdhdXRvY2hlc3MnOiAnI2ZmMDBmZicsXG4gICAgICAgICdjdXN0b20nOiAnIzAwZmZmZidcbiAgICB9O1xuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gbW9kZUNvbG9yc1ttb2RlXSB8fCAnI2ZmZmZmZic7XG4gICAgJC5Nc2coYOa4uOaIj+aooeW8j+agh+etvuW3suabtOaWsDogJHtkaXNwbGF5TmFtZX1gKTtcbn1cbi8vIOWIneWni+WMluWHveaVsFxuZnVuY3Rpb24gaW5pdGlhbGl6ZUhVRCgpIHtcbiAgICAkLk1zZygnPT09IEluaXRpYWxpemluZyBIVUQgPT09Jyk7XG4gICAgLy8g5aSa5qyh5bCd6K+V5Yid5aeL5YyW77yM56Gu5L+d5oyJ6ZKu6IO95pi+56S6XG4gICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICBjb25zdCBtYXhBdHRlbXB0cyA9IDU7XG4gICAgZnVuY3Rpb24gdHJ5Q3JlYXRlQnV0dG9ucygpIHtcbiAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgJC5Nc2coJz09PSDliJvlu7rmjInpkq7lsJ3or5UgIycgKyBhdHRlbXB0cyArICcgPT09Jyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjcmVhdGVTaW1wbGVUZXN0QnV0dG9ucygpO1xuICAgICAgICAgICAgJC5Nc2coJ+aMiemSruWIm+W7uuaIkOWKn++8gScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgJC5Nc2coJ+aMiemSruWIm+W7uuWksei0pTogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0ZW1wdHMgPCBtYXhBdHRlbXB0cykge1xuICAgICAgICAgICAgJC5TY2hlZHVsZSgxLjAsIHRyeUNyZWF0ZUJ1dHRvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOeri+WNs+WwneivlVxuICAgIHRyeUNyZWF0ZUJ1dHRvbnMoKTtcbiAgICAvLyDorr7nva7plK7nm5jlv6vmjbfplK5cbiAgICAkLlJlZ2lzdGVyS2V5QmluZCgkLkdldENvbnRleHRQYW5lbCgpLCAna2V5X2Y5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnPT09IEY56ZSu6KKr5oyJ5LiL77yM6YeN5paw5Yib5bu65oyJ6ZKuID09PScpO1xuICAgICAgICBjcmVhdGVTaW1wbGVUZXN0QnV0dG9ucygpO1xuICAgIH0pO1xuICAgICQuUmVnaXN0ZXJLZXlCaW5kKCQuR2V0Q29udGV4dFBhbmVsKCksICdrZXlfZjgnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCc9PT0gRjjplK7ooqvmjInkuIvvvIzmmL7npLrpnaLmnb/kv6Hmga8gPT09Jyk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgICAgICAkLk1zZygnUm9vdCBwYW5lbDogJyArIHJvb3QpO1xuICAgICAgICAkLk1zZygnUGFuZWwgSUQ6ICcgKyAocm9vdCA/IHJvb3QuaWQgOiAnTm9uZScpKTtcbiAgICAgICAgJC5Nc2coJ1BhbmVsIGNsYXNzOiAnICsgKHJvb3QgPyByb290LkdldEF0dHJpYnV0ZVN0cmluZygnY2xhc3MnLCAnbm8tY2xhc3MnKSA6ICdOb25lJykpO1xuICAgIH0pO1xuICAgICQuTXNnKCc9PT0gSFVEIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlID09PScpO1xufVxuLy8g5a+85Ye65YWo5bGA5Ye95pWw5L6b5o6n5Yi25Y+w6LCD55SoXG5nbG9iYWxUaGlzLkZ1c2lvblRlc3QgPSB7XG4gICAgY3JlYXRlQnV0dG9uczogY3JlYXRlU2ltcGxlVGVzdEJ1dHRvbnMsXG4gICAgdGVzdDogKCkgPT4ge1xuICAgICAgICAkLk1zZygnRnVzaW9uRG90Yeahhuaetua1i+ivleWHveaVsOiwg+eUqOaIkOWKn++8gScpO1xuICAgICAgICByZXR1cm4gJ0ZyYW1ld29yayBpcyB3b3JraW5nISc7XG4gICAgfVxufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuJC5Nc2coJz09PSBTdGFydGluZyBIVUQgaW5pdGlhbGl6YXRpb24gPT09Jyk7XG5pbml0aWFsaXplSFVEKCk7XG4vLyDntKfmgKXlpIfnlKjmlrnmoYjlt7LnpoHnlKggLSDkvb/nlKjkuLtVSeezu+e7n1xuLy8gJC5TY2hlZHVsZSgyLjAsICgpID0+IHtcbi8vICAgICAkLk1zZygnPT09IEVtZXJnZW5jeSBVSSBjcmVhdGlvbiA9PT0nKTtcbi8vIH0pO1xuLy8g5a+85Ye6UmVhY3Tnu4Tku7bvvIjkv53mjIHlhbzlrrnmgKfvvIlcbmNvbnN0IEh1ZFBhbmVsID0gKCkgPT4ge1xuICAgIHJldHVybiBudWxsOyAvLyDkvb/nlKjljp/nlJ9QYW5vcmFtYe+8jOS4jemcgOimgVJlYWN05riy5p+TXG59O1xuZXhwb3J0IGRlZmF1bHQgSHVkUGFuZWw7XG4kLk1zZygnPT09IEhVRCBtb2R1bGUgbG9hZGVkIGNvbXBsZXRlbHkgPT09Jyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=