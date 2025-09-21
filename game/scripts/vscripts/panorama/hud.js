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
    // 添加信息标签
    const infoLabel = $.CreatePanel('Label', container, 'InfoLabel');
    infoLabel.text = 'FusionDota框架正常运行!';
    infoLabel.style.color = 'white';
    infoLabel.style.fontSize = '14px';
    infoLabel.style.textAlign = 'center';
    infoLabel.style.marginTop = '10px';
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
// 紧急备用方案 - 直接在DOM上创建按钮
$.Schedule(2.0, () => {
    $.Msg('=== Emergency UI creation ===');
    // 尝试在body或其他全局容器上创建UI
    try {
        const body = document.body;
        if (body) {
            const emergencyDiv = document.createElement('div');
            emergencyDiv.innerHTML = `
                <div style="position: fixed; top: 100px; right: 100px; z-index: 99999; 
                           background: rgba(255,0,0,0.9); border: 5px solid yellow; 
                           padding: 20px; border-radius: 10px;">
                    <h3 style="color: yellow; margin: 0 0 10px 0;">🎮 FusionDota 紧急测试</h3>
                    <button onclick="alert('按钮1点击成功！')" 
                           style="padding: 10px 20px; margin: 5px; background: #007bff; 
                                  color: white; border: none; border-radius: 5px; cursor: pointer;">
                        紧急按钮1
                    </button>
                    <button onclick="alert('按钮2点击成功！')" 
                           style="padding: 10px 20px; margin: 5px; background: #dc3545; 
                                  color: white; border: none; border-radius: 5px; cursor: pointer;">
                        紧急按钮2
                    </button>
                </div>
            `;
            body.appendChild(emergencyDiv);
            $.Msg('Emergency UI created with DOM manipulation');
        }
    }
    catch (e) {
        $.Msg('Emergency UI creation failed: ' + e);
    }
});
// 导出React组件（保持兼容性）
const HudPanel = () => {
    return null; // 使用原生Panorama，不需要React渲染
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HudPanel);
$.Msg('=== HUD module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN4QixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIHZhciBcIiRcIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly8vRDpcXFN0ZWFtQXBwXFxzdGVhbWFwcHNcXGNvbW1vblxcZG90YSAyIGJldGFcXGNvbnRlbnRcXGRvdGFfYWRkb25zXFxmdXNpb25cXHBhbm9yYW1hXFxzcmNcXGh1ZFxcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEB0cy1ub2NoZWNrXG4vLyDnroDljZXnmoRIVUTmtYvor5UgLSDor4HmmI5GdXNpb25Eb3Rh5qGG5p625q2j5bi46L+Q6KGMXG4vLyDovpPlh7rliqDovb3mtojmga9cbiQuTXNnKCc9PT0gRnVzaW9uRG90YSBIVUQgTG9hZGluZyA9PT0nKTtcbi8vIOWIm+W7uueugOWNleeahOa1i+ivleaMiemSrlxuZnVuY3Rpb24gY3JlYXRlU2ltcGxlVGVzdEJ1dHRvbnMoKSB7XG4gICAgJC5Nc2coJ0NyZWF0aW5nIHNpbXBsZSB0ZXN0IGJ1dHRvbnMuLi4nKTtcbiAgICAvLyDojrflj5bmoLnpnaLmnb9cbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgICQuTXNnKCdSb290IHBhbmVsOiAnICsgKHJvb3RQYW5lbCA/ICdGb3VuZCcgOiAnTm90IGZvdW5kJykpO1xuICAgIC8vIOWFiOWIoOmZpOS5i+WJjeeahOWuueWZqO+8iOWmguaenOWtmOWcqO+8iVxuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnVGVzdEJ1dHRvbkNvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICAgICAgJC5Nc2coJ1JlbW92ZWQgZXhpc3RpbmcgY29udGFpbmVyJyk7XG4gICAgfVxuICAgIC8vIOWIm+W7uuaMiemSruWuueWZqCAtIOS9v+eUqOabtOaYjuaYvueahOS9jee9ruWSjOagt+W8j1xuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnVGVzdEJ1dHRvbkNvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgY29udGFpbmVyLnN0eWxlLnRvcCA9ICc1MHB4JzsgLy8g5pu06Z2g5LiKXG4gICAgY29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gJzUwcHgnOyAvLyDlj7PkuIrop5Lmm7TmmI7mmL5cbiAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMzUwcHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTIwcHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTUsIDAsIDAsIDAuOSknOyAvLyDmm7TmmI7mmL7nmoTnuqLoibLog4zmma9cbiAgICBjb250YWluZXIuc3R5bGUuYm9yZGVyID0gJzVweCBzb2xpZCAjZmZmZjAwJzsgLy8g5pu057KX55qE6buE6Imy6L655qGGXG4gICAgY29udGFpbmVyLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OTk5JzsgLy8g5pu06auY55qE5bGC57qnXG4gICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSAnMTVweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMjBweCByZ2JhKDI1NSwgMjU1LCAwLCAwLjgpJzsgLy8g5Y+R5YWJ5pWI5p6cXG4gICAgJC5Nc2coJ0J1dHRvbiBjb250YWluZXIgY3JlYXRlZCcpO1xuICAgIC8vIOa3u+WKoOagh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBjb250YWluZXIsICdUaXRsZUxhYmVsJyk7XG4gICAgdGl0bGUudGV4dCA9ICfwn46uIEZ1c2lvbkRvdGEg5rWL6K+V6Z2i5p2/JztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9ICcjZmZmZjAwJztcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxOHB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICB0aXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gJzJweCAycHggNHB4IHJnYmEoMCwwLDAsMSknO1xuICAgIC8vIOaMiemSrjFcbiAgICBjb25zdCBidXR0b24xID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgY29udGFpbmVyLCAnVGVzdEJ1dHRvbjEnKTtcbiAgICBidXR0b24xLnRleHQgPSAn8J+UtSDmtYvor5XmjInpkq4xJztcbiAgICBidXR0b24xLnN0eWxlLndpZHRoID0gJzE0MHB4JztcbiAgICBidXR0b24xLnN0eWxlLmhlaWdodCA9ICc0NXB4JztcbiAgICBidXR0b24xLnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgIGJ1dHRvbjEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMwMDdiZmYnO1xuICAgIGJ1dHRvbjEuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgIGJ1dHRvbjEuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgYnV0dG9uMS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGJ1dHRvbjEuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCAjMDA1NmIzJztcbiAgICBidXR0b24xLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGJ1dHRvbjEuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgIGJ1dHRvbjEuc3R5bGUudGV4dFNoYWRvdyA9ICcxcHggMXB4IDJweCByZ2JhKDAsMCwwLDAuOCknO1xuICAgIGJ1dHRvbjEuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSDmjInpkq4x6KKr54K55Ye75LqG77yB5pe26Ze0OiAnICsgbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSArICcgPT09Jyk7XG4gICAgICAgIGJ1dHRvbjEudGV4dCA9ICfinIUg5bey54K55Ye7ISc7XG4gICAgICAgIGJ1dHRvbjEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMyOGE3NDUnO1xuICAgICAgICBidXR0b24xLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgIzFlN2UzNCc7XG4gICAgfSk7XG4gICAgLy8g5oyJ6ZKuMlxuICAgIGNvbnN0IGJ1dHRvbjIgPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBjb250YWluZXIsICdUZXN0QnV0dG9uMicpO1xuICAgIGJ1dHRvbjIudGV4dCA9ICfwn5S0IOa1i+ivleaMiemSrjInO1xuICAgIGJ1dHRvbjIuc3R5bGUud2lkdGggPSAnMTQwcHgnO1xuICAgIGJ1dHRvbjIuc3R5bGUuaGVpZ2h0ID0gJzQ1cHgnO1xuICAgIGJ1dHRvbjIuc3R5bGUubWFyZ2luID0gJzVweCc7XG4gICAgYnV0dG9uMi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2RjMzU0NSc7XG4gICAgYnV0dG9uMi5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgYnV0dG9uMi5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBidXR0b24yLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgYnV0dG9uMi5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICNjODIzMzMnO1xuICAgIGJ1dHRvbjIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgYnV0dG9uMi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgYnV0dG9uMi5zdHlsZS50ZXh0U2hhZG93ID0gJzFweCAxcHggMnB4IHJnYmEoMCwwLDAsMC44KSc7XG4gICAgYnV0dG9uMi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnPT09IOaMiemSrjLooqvngrnlh7vkuobvvIHml7bpl7Q6ICcgKyBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpICsgJyA9PT0nKTtcbiAgICAgICAgYnV0dG9uMi50ZXh0ID0gJ/Cfn6Eg5oiQ5YqfISc7XG4gICAgICAgIGJ1dHRvbjIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZmMxMDcnO1xuICAgICAgICBidXR0b24yLnN0eWxlLmNvbG9yID0gJ2JsYWNrJztcbiAgICAgICAgYnV0dG9uMi5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICNkMzllMDAnO1xuICAgIH0pO1xuICAgICQuTXNnKCdCb3RoIHRlc3QgYnV0dG9ucyBjcmVhdGVkIHN1Y2Nlc3NmdWxseSEnKTtcbiAgICAvLyDmt7vliqDkv6Hmga/moIfnrb5cbiAgICBjb25zdCBpbmZvTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGNvbnRhaW5lciwgJ0luZm9MYWJlbCcpO1xuICAgIGluZm9MYWJlbC50ZXh0ID0gJ0Z1c2lvbkRvdGHmoYbmnrbmraPluLjov5DooYwhJztcbiAgICBpbmZvTGFiZWwuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgIGluZm9MYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBpbmZvTGFiZWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgaW5mb0xhYmVsLnN0eWxlLm1hcmdpblRvcCA9ICcxMHB4Jztcbn1cbi8vIOWIneWni+WMluWHveaVsFxuZnVuY3Rpb24gaW5pdGlhbGl6ZUhVRCgpIHtcbiAgICAkLk1zZygnPT09IEluaXRpYWxpemluZyBIVUQgPT09Jyk7XG4gICAgLy8g5aSa5qyh5bCd6K+V5Yid5aeL5YyW77yM56Gu5L+d5oyJ6ZKu6IO95pi+56S6XG4gICAgbGV0IGF0dGVtcHRzID0gMDtcbiAgICBjb25zdCBtYXhBdHRlbXB0cyA9IDU7XG4gICAgZnVuY3Rpb24gdHJ5Q3JlYXRlQnV0dG9ucygpIHtcbiAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgJC5Nc2coJz09PSDliJvlu7rmjInpkq7lsJ3or5UgIycgKyBhdHRlbXB0cyArICcgPT09Jyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjcmVhdGVTaW1wbGVUZXN0QnV0dG9ucygpO1xuICAgICAgICAgICAgJC5Nc2coJ+aMiemSruWIm+W7uuaIkOWKn++8gScpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgJC5Nc2coJ+aMiemSruWIm+W7uuWksei0pTogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0ZW1wdHMgPCBtYXhBdHRlbXB0cykge1xuICAgICAgICAgICAgJC5TY2hlZHVsZSgxLjAsIHRyeUNyZWF0ZUJ1dHRvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOeri+WNs+WwneivlVxuICAgIHRyeUNyZWF0ZUJ1dHRvbnMoKTtcbiAgICAvLyDorr7nva7plK7nm5jlv6vmjbfplK5cbiAgICAkLlJlZ2lzdGVyS2V5QmluZCgkLkdldENvbnRleHRQYW5lbCgpLCAna2V5X2Y5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnPT09IEY56ZSu6KKr5oyJ5LiL77yM6YeN5paw5Yib5bu65oyJ6ZKuID09PScpO1xuICAgICAgICBjcmVhdGVTaW1wbGVUZXN0QnV0dG9ucygpO1xuICAgIH0pO1xuICAgICQuUmVnaXN0ZXJLZXlCaW5kKCQuR2V0Q29udGV4dFBhbmVsKCksICdrZXlfZjgnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCc9PT0gRjjplK7ooqvmjInkuIvvvIzmmL7npLrpnaLmnb/kv6Hmga8gPT09Jyk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgICAgICAkLk1zZygnUm9vdCBwYW5lbDogJyArIHJvb3QpO1xuICAgICAgICAkLk1zZygnUGFuZWwgSUQ6ICcgKyAocm9vdCA/IHJvb3QuaWQgOiAnTm9uZScpKTtcbiAgICAgICAgJC5Nc2coJ1BhbmVsIGNsYXNzOiAnICsgKHJvb3QgPyByb290LkdldEF0dHJpYnV0ZVN0cmluZygnY2xhc3MnLCAnbm8tY2xhc3MnKSA6ICdOb25lJykpO1xuICAgIH0pO1xuICAgICQuTXNnKCc9PT0gSFVEIGluaXRpYWxpemF0aW9uIGNvbXBsZXRlID09PScpO1xufVxuLy8g5a+85Ye65YWo5bGA5Ye95pWw5L6b5o6n5Yi25Y+w6LCD55SoXG5nbG9iYWxUaGlzLkZ1c2lvblRlc3QgPSB7XG4gICAgY3JlYXRlQnV0dG9uczogY3JlYXRlU2ltcGxlVGVzdEJ1dHRvbnMsXG4gICAgdGVzdDogKCkgPT4ge1xuICAgICAgICAkLk1zZygnRnVzaW9uRG90Yeahhuaetua1i+ivleWHveaVsOiwg+eUqOaIkOWKn++8gScpO1xuICAgICAgICByZXR1cm4gJ0ZyYW1ld29yayBpcyB3b3JraW5nISc7XG4gICAgfVxufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuJC5Nc2coJz09PSBTdGFydGluZyBIVUQgaW5pdGlhbGl6YXRpb24gPT09Jyk7XG5pbml0aWFsaXplSFVEKCk7XG4vLyDntKfmgKXlpIfnlKjmlrnmoYggLSDnm7TmjqXlnKhET03kuIrliJvlu7rmjInpkq5cbiQuU2NoZWR1bGUoMi4wLCAoKSA9PiB7XG4gICAgJC5Nc2coJz09PSBFbWVyZ2VuY3kgVUkgY3JlYXRpb24gPT09Jyk7XG4gICAgLy8g5bCd6K+V5ZyoYm9keeaIluWFtuS7luWFqOWxgOWuueWZqOS4iuWIm+W7ulVJXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIGlmIChib2R5KSB7XG4gICAgICAgICAgICBjb25zdCBlbWVyZ2VuY3lEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGVtZXJnZW5jeURpdi5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiBmaXhlZDsgdG9wOiAxMDBweDsgcmlnaHQ6IDEwMHB4OyB6LWluZGV4OiA5OTk5OTsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwwLDAsMC45KTsgYm9yZGVyOiA1cHggc29saWQgeWVsbG93OyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDIwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBzdHlsZT1cImNvbG9yOiB5ZWxsb3c7IG1hcmdpbjogMCAwIDEwcHggMDtcIj7wn46uIEZ1c2lvbkRvdGEg57Sn5oCl5rWL6K+VPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwiYWxlcnQoJ+aMiemSrjHngrnlh7vmiJDlip/vvIEnKVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJwYWRkaW5nOiAxMHB4IDIwcHg7IG1hcmdpbjogNXB4OyBiYWNrZ3JvdW5kOiAjMDA3YmZmOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogd2hpdGU7IGJvcmRlcjogbm9uZTsgYm9yZGVyLXJhZGl1czogNXB4OyBjdXJzb3I6IHBvaW50ZXI7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICDntKfmgKXmjInpkq4xXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJhbGVydCgn5oyJ6ZKuMueCueWHu+aIkOWKn++8gScpXCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInBhZGRpbmc6IDEwcHggMjBweDsgbWFyZ2luOiA1cHg7IGJhY2tncm91bmQ6ICNkYzM1NDU7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTsgYm9yZGVyOiBub25lOyBib3JkZXItcmFkaXVzOiA1cHg7IGN1cnNvcjogcG9pbnRlcjtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIOe0p+aApeaMiemSrjJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgO1xuICAgICAgICAgICAgYm9keS5hcHBlbmRDaGlsZChlbWVyZ2VuY3lEaXYpO1xuICAgICAgICAgICAgJC5Nc2coJ0VtZXJnZW5jeSBVSSBjcmVhdGVkIHdpdGggRE9NIG1hbmlwdWxhdGlvbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKCdFbWVyZ2VuY3kgVUkgY3JlYXRpb24gZmFpbGVkOiAnICsgZSk7XG4gICAgfVxufSk7XG4vLyDlr7zlh7pSZWFjdOe7hOS7tu+8iOS/neaMgeWFvOWuueaAp++8iVxuY29uc3QgSHVkUGFuZWwgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG51bGw7IC8vIOS9v+eUqOWOn+eUn1Bhbm9yYW1h77yM5LiN6ZyA6KaBUmVhY3TmuLLmn5Ncbn07XG5leHBvcnQgZGVmYXVsdCBIdWRQYW5lbDtcbiQuTXNnKCc9PT0gSFVEIG1vZHVsZSBsb2FkZWQgY29tcGxldGVseSA9PT0nKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==