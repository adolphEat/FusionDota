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
/*!*****************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\training-panel\index.tsx ***!
  \*****************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
// 训练模式面板 - FusionDota
$.Msg('=== Training Panel Loading ===');
// 创建训练模式UI
function createTrainingPanelUI() {
    $.Msg('Creating training panel UI...');
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('TrainingPanelContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'TrainingPanelContainer');
    container.style.position = 'absolute';
    container.style.top = '100px';
    container.style.right = '20px';
    container.style.width = '400px';
    container.style.height = '500px';
    container.style.backgroundColor = 'rgba(30, 30, 60, 0.95)';
    container.style.border = '3px solid #ff6b35';
    container.style.borderRadius = '15px';
    container.style.zIndex = '1000';
    container.style.padding = '20px';
    container.style.boxShadow = '0 0 25px rgba(255, 107, 53, 0.4)';
    // 标题
    const title = $.CreatePanel('Label', container, 'TrainingPanelTitle');
    title.text = '🏟️ 练功房控制台';
    title.style.color = '#ff6b35';
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';
    // 模式选择区域
    const modeSection = $.CreatePanel('Panel', container, 'ModeSection');
    modeSection.style.width = '100%';
    modeSection.style.height = '120px';
    modeSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    modeSection.style.borderRadius = '10px';
    modeSection.style.padding = '15px';
    modeSection.style.marginBottom = '15px';
    const modeTitle = $.CreatePanel('Label', modeSection, 'ModeTitle');
    modeTitle.text = '🎯 训练模式';
    modeTitle.style.color = '#ffd700';
    modeTitle.style.fontSize = '16px';
    modeTitle.style.fontWeight = 'bold';
    modeTitle.style.marginBottom = '10px';
    // 模式按钮
    const modes = [
        { id: 'dummy', name: '木桩训练', color: '#28a745' },
        { id: 'wave', name: '波次训练', color: '#17a2b8' },
        { id: 'boss', name: 'Boss挑战', color: '#dc3545' },
        { id: 'survival', name: '生存模式', color: '#6f42c1' }
    ];
    modes.forEach((mode, index) => {
        const button = $.CreatePanel('Button', modeSection, `ModeButton_${mode.id}`);
        button.text = mode.name;
        button.style.width = '80px';
        button.style.height = '35px';
        button.style.backgroundColor = mode.color;
        button.style.color = 'white';
        button.style.fontSize = '12px';
        button.style.fontWeight = 'bold';
        button.style.border = '1px solid rgba(255,255,255,0.2)';
        button.style.borderRadius = '5px';
        button.style.margin = '2px';
        button.SetPanelEvent('onactivate', () => {
            $.Msg(`训练模式切换: ${mode.name}`);
            GameEvents.SendCustomGameEventToServer('set_training_mode', { mode: mode.id });
            updateActiveMode(mode.id);
        });
    });
    // 设置区域
    const settingsSection = $.CreatePanel('Panel', container, 'SettingsSection');
    settingsSection.style.width = '100%';
    settingsSection.style.height = '200px';
    settingsSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    settingsSection.style.borderRadius = '10px';
    settingsSection.style.padding = '15px';
    settingsSection.style.marginBottom = '15px';
    const settingsTitle = $.CreatePanel('Label', settingsSection, 'SettingsTitle');
    settingsTitle.text = '⚙️ 训练设置';
    settingsTitle.style.color = '#ffd700';
    settingsTitle.style.fontSize = '16px';
    settingsTitle.style.fontWeight = 'bold';
    settingsTitle.style.marginBottom = '10px';
    // 设置项目
    const settings = [
        { id: 'difficulty', name: '难度等级:', options: ['简单', '普通', '困难', '地狱'] },
        { id: 'enemyCount', name: '敌人数量:', options: ['1', '3', '5', '10'] },
        { id: 'timeLimit', name: '时间限制:', options: ['无限制', '5分钟', '10分钟', '30分钟'] }
    ];
    settings.forEach((setting, index) => {
        const settingPanel = $.CreatePanel('Panel', settingsSection, `Setting_${setting.id}`);
        settingPanel.style.width = '100%';
        settingPanel.style.height = '40px';
        settingPanel.style.marginBottom = '8px';
        const label = $.CreatePanel('Label', settingPanel, `${setting.id}_Label`);
        label.text = setting.name;
        label.style.color = '#cccccc';
        label.style.fontSize = '14px';
        label.style.width = '100px';
        // 创建选项按钮
        setting.options.forEach((option, optIndex) => {
            const optionButton = $.CreatePanel('Button', settingPanel, `${setting.id}_Option_${optIndex}`);
            optionButton.text = option;
            optionButton.style.width = '60px';
            optionButton.style.height = '25px';
            optionButton.style.backgroundColor = '#495057';
            optionButton.style.color = 'white';
            optionButton.style.fontSize = '11px';
            optionButton.style.border = '1px solid rgba(255,255,255,0.2)';
            optionButton.style.borderRadius = '3px';
            optionButton.style.margin = '2px';
            optionButton.SetPanelEvent('onactivate', () => {
                $.Msg(`设置更新: ${setting.id} = ${option}`);
                GameEvents.SendCustomGameEventToServer('update_training_setting', {
                    setting: setting.id,
                    value: option
                });
                updateSettingButton(setting.id, optIndex);
            });
        });
    });
    // 控制按钮区域
    const controlSection = $.CreatePanel('Panel', container, 'ControlSection');
    controlSection.style.width = '100%';
    controlSection.style.height = '80px';
    controlSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    controlSection.style.borderRadius = '10px';
    controlSection.style.padding = '15px';
    const controlTitle = $.CreatePanel('Label', controlSection, 'ControlTitle');
    controlTitle.text = '🎮 控制面板';
    controlTitle.style.color = '#ffd700';
    controlTitle.style.fontSize = '16px';
    controlTitle.style.fontWeight = 'bold';
    controlTitle.style.marginBottom = '10px';
    // 控制按钮
    const controls = [
        { id: 'start', name: '开始训练', color: '#28a745' },
        { id: 'pause', name: '暂停', color: '#ffc107' },
        { id: 'stop', name: '停止', color: '#dc3545' },
        { id: 'reset', name: '重置', color: '#6c757d' }
    ];
    controls.forEach((control, index) => {
        const button = $.CreatePanel('Button', controlSection, `ControlButton_${control.id}`);
        button.text = control.name;
        button.style.width = '80px';
        button.style.height = '35px';
        button.style.backgroundColor = control.color;
        button.style.color = 'white';
        button.style.fontSize = '12px';
        button.style.fontWeight = 'bold';
        button.style.border = '1px solid rgba(255,255,255,0.2)';
        button.style.borderRadius = '5px';
        button.style.margin = '2px';
        button.SetPanelEvent('onactivate', () => {
            $.Msg(`训练控制: ${control.name}`);
            GameEvents.SendCustomGameEventToServer('training_control', { action: control.id });
        });
    });
    $.Msg('Training panel UI created successfully!');
}
// 更新活跃模式
function updateActiveMode(activeMode) {
    const modes = ['dummy', 'wave', 'boss', 'survival'];
    modes.forEach(mode => {
        const button = $.GetContextPanel().FindChildInLayoutFile(`ModeButton_${mode}`);
        if (button) {
            if (mode === activeMode) {
                button.style.backgroundColor = '#ff6b35';
                button.style.border = '2px solid #ffd700';
            }
            else {
                const colors = {
                    'dummy': '#28a745',
                    'wave': '#17a2b8',
                    'boss': '#dc3545',
                    'survival': '#6f42c1'
                };
                button.style.backgroundColor = colors[mode];
                button.style.border = '1px solid rgba(255,255,255,0.2)';
            }
        }
    });
}
// 更新设置按钮
function updateSettingButton(settingId, activeIndex) {
    const settingPanel = $.GetContextPanel().FindChildInLayoutFile(`Setting_${settingId}`);
    if (settingPanel) {
        // 重置所有按钮
        for (let i = 0; i < 4; i++) {
            const button = settingPanel.FindChildInLayoutFile(`${settingId}_Option_${i}`);
            if (button) {
                button.style.backgroundColor = '#495057';
                button.style.border = '1px solid rgba(255,255,255,0.2)';
            }
        }
        // 高亮活跃按钮
        const activeButton = settingPanel.FindChildInLayoutFile(`${settingId}_Option_${activeIndex}`);
        if (activeButton) {
            activeButton.style.backgroundColor = '#ff6b35';
            activeButton.style.border = '2px solid #ffd700';
        }
    }
}
// 监听训练事件
GameEvents.Subscribe('training_mode_changed', (data) => {
    $.Msg('Training mode changed:', data);
    updateActiveMode(data.mode);
});
GameEvents.Subscribe('training_setting_updated', (data) => {
    $.Msg('Training setting updated:', data);
    // 这里可以根据具体设置更新UI
});
GameEvents.Subscribe('training_status_changed', (data) => {
    $.Msg('Training status changed:', data);
    const status = data.status;
    // 更新控制按钮状态
    const startButton = $.GetContextPanel().FindChildInLayoutFile('ControlButton_start');
    const pauseButton = $.GetContextPanel().FindChildInLayoutFile('ControlButton_pause');
    const stopButton = $.GetContextPanel().FindChildInLayoutFile('ControlButton_stop');
    if (startButton)
        startButton.enabled = status !== 'running';
    if (pauseButton)
        pauseButton.enabled = status === 'running';
    if (stopButton)
        stopButton.enabled = status !== 'stopped';
});
// 初始化
function initializeTrainingPanel() {
    $.Msg('=== Initializing Training Panel ===');
    // 延迟创建UI
    $.Schedule(0.5, createTrainingPanelUI);
    // 设置快捷键
    $.RegisterKeyBind($.GetContextPanel(), 'key_f9', () => {
        $.Msg('=== F9: Recreating Training Panel UI ===');
        createTrainingPanelUI();
    });
    $.RegisterKeyBind($.GetContextPanel(), 'key_f10', () => {
        $.Msg('=== F10: Toggle Training Panel ===');
        const container = $.GetContextPanel().FindChildInLayoutFile('TrainingPanelContainer');
        if (container) {
            container.visible = !container.visible;
        }
    });
}
// 导出全局函数
globalThis.TrainingPanelTest = {
    createUI: createTrainingPanelUI,
    updateMode: updateActiveMode,
    updateSetting: updateSettingButton
};
// 立即执行初始化
initializeTrainingPanel();
// 导出React组件（保持兼容性）
const TrainingPanel = () => {
    return null; // 使用原生Panorama
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrainingPanel);
$.Msg('=== Training Panel module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixDQUFDLG9EQUFvRCxVQUFVO0FBQ3hGO0FBQ0E7QUFDQSx3QkFBd0IsT0FBTztBQUMvQixpRUFBaUUsVUFBVSxVQUFVLEVBQUU7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLFVBQVUsVUFBVSxZQUFZO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QixDQUFDO0FBQ3pCLHdCQUF3QixDQUFDO0FBQ3pCLHVCQUF1QixDQUFDO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztBQUN2QixRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTCxJQUFJLENBQUMsaUJBQWlCLENBQUM7QUFDdkIsUUFBUSxDQUFDO0FBQ1QsMEJBQTBCLENBQUM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpRUFBZSxhQUFhLEVBQUM7QUFDN0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFx0cmFpbmluZy1wYW5lbFxcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEB0cy1ub2NoZWNrXG4vLyDorq3nu4PmqKHlvI/pnaLmnb8gLSBGdXNpb25Eb3RhXG4kLk1zZygnPT09IFRyYWluaW5nIFBhbmVsIExvYWRpbmcgPT09Jyk7XG4vLyDliJvlu7rorq3nu4PmqKHlvI9VSVxuZnVuY3Rpb24gY3JlYXRlVHJhaW5pbmdQYW5lbFVJKCkge1xuICAgICQuTXNnKCdDcmVhdGluZyB0cmFpbmluZyBwYW5lbCBVSS4uLicpO1xuICAgIC8vIOiOt+WPluaguemdouadv1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ0Vycm9yOiBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOWIoOmZpOW3suWtmOWcqOeahOWuueWZqFxuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnVHJhaW5pbmdQYW5lbENvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICB9XG4gICAgLy8g5Yib5bu65Li75a655ZmoXG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdUcmFpbmluZ1BhbmVsQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjb250YWluZXIuc3R5bGUudG9wID0gJzEwMHB4JztcbiAgICBjb250YWluZXIuc3R5bGUucmlnaHQgPSAnMjBweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzQwMHB4JztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzUwMHB4JztcbiAgICBjb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMzAsIDMwLCA2MCwgMC45NSknO1xuICAgIGNvbnRhaW5lci5zdHlsZS5ib3JkZXIgPSAnM3B4IHNvbGlkICNmZjZiMzUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICcxMDAwJztcbiAgICBjb250YWluZXIuc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICBjb250YWluZXIuc3R5bGUuYm94U2hhZG93ID0gJzAgMCAyNXB4IHJnYmEoMjU1LCAxMDcsIDUzLCAwLjQpJztcbiAgICAvLyDmoIfpophcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY29udGFpbmVyLCAnVHJhaW5pbmdQYW5lbFRpdGxlJyk7XG4gICAgdGl0bGUudGV4dCA9ICfwn4+f77iPIOe7g+WKn+aIv+aOp+WItuWPsCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSAnI2ZmNmIzNSc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcycHggMnB4IDRweCByZ2JhKDAsMCwwLDEpJztcbiAgICAvLyDmqKHlvI/pgInmi6nljLrln59cbiAgICBjb25zdCBtb2RlU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnTW9kZVNlY3Rpb24nKTtcbiAgICBtb2RlU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtb2RlU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTIwcHgnO1xuICAgIG1vZGVTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIG1vZGVTZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBtb2RlU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIG1vZGVTZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICBjb25zdCBtb2RlVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIG1vZGVTZWN0aW9uLCAnTW9kZVRpdGxlJyk7XG4gICAgbW9kZVRpdGxlLnRleHQgPSAn8J+OryDorq3nu4PmqKHlvI8nO1xuICAgIG1vZGVUaXRsZS5zdHlsZS5jb2xvciA9ICcjZmZkNzAwJztcbiAgICBtb2RlVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgbW9kZVRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgbW9kZVRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICAvLyDmqKHlvI/mjInpkq5cbiAgICBjb25zdCBtb2RlcyA9IFtcbiAgICAgICAgeyBpZDogJ2R1bW15JywgbmFtZTogJ+acqOahqeiuree7gycsIGNvbG9yOiAnIzI4YTc0NScgfSxcbiAgICAgICAgeyBpZDogJ3dhdmUnLCBuYW1lOiAn5rOi5qyh6K6t57uDJywgY29sb3I6ICcjMTdhMmI4JyB9LFxuICAgICAgICB7IGlkOiAnYm9zcycsIG5hbWU6ICdCb3Nz5oyR5oiYJywgY29sb3I6ICcjZGMzNTQ1JyB9LFxuICAgICAgICB7IGlkOiAnc3Vydml2YWwnLCBuYW1lOiAn55Sf5a2Y5qih5byPJywgY29sb3I6ICcjNmY0MmMxJyB9XG4gICAgXTtcbiAgICBtb2Rlcy5mb3JFYWNoKChtb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b24gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBtb2RlU2VjdGlvbiwgYE1vZGVCdXR0b25fJHttb2RlLmlkfWApO1xuICAgICAgICBidXR0b24udGV4dCA9IG1vZGUubmFtZTtcbiAgICAgICAgYnV0dG9uLnN0eWxlLndpZHRoID0gJzgwcHgnO1xuICAgICAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gJzM1cHgnO1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gbW9kZS5jb2xvcjtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICBidXR0b24uc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1cHgnO1xuICAgICAgICBidXR0b24uc3R5bGUubWFyZ2luID0gJzJweCc7XG4gICAgICAgIGJ1dHRvbi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coYOiuree7g+aooeW8j+WIh+aNojogJHttb2RlLm5hbWV9YCk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcignc2V0X3RyYWluaW5nX21vZGUnLCB7IG1vZGU6IG1vZGUuaWQgfSk7XG4gICAgICAgICAgICB1cGRhdGVBY3RpdmVNb2RlKG1vZGUuaWQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyDorr7nva7ljLrln59cbiAgICBjb25zdCBzZXR0aW5nc1NlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ1NldHRpbmdzU2VjdGlvbicpO1xuICAgIHNldHRpbmdzU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzIwMHB4JztcbiAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgc2V0dGluZ3NTZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcxNXB4JztcbiAgICBzZXR0aW5nc1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIGNvbnN0IHNldHRpbmdzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHNldHRpbmdzU2VjdGlvbiwgJ1NldHRpbmdzVGl0bGUnKTtcbiAgICBzZXR0aW5nc1RpdGxlLnRleHQgPSAn4pqZ77iPIOiuree7g+iuvue9ric7XG4gICAgc2V0dGluZ3NUaXRsZS5zdHlsZS5jb2xvciA9ICcjZmZkNzAwJztcbiAgICBzZXR0aW5nc1RpdGxlLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIHNldHRpbmdzVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBzZXR0aW5nc1RpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICAvLyDorr7nva7pobnnm65cbiAgICBjb25zdCBzZXR0aW5ncyA9IFtcbiAgICAgICAgeyBpZDogJ2RpZmZpY3VsdHknLCBuYW1lOiAn6Zq+5bqm562J57qnOicsIG9wdGlvbnM6IFsn566A5Y2VJywgJ+aZrumAmicsICflm7Dpmr4nLCAn5Zyw54uxJ10gfSxcbiAgICAgICAgeyBpZDogJ2VuZW15Q291bnQnLCBuYW1lOiAn5pWM5Lq65pWw6YePOicsIG9wdGlvbnM6IFsnMScsICczJywgJzUnLCAnMTAnXSB9LFxuICAgICAgICB7IGlkOiAndGltZUxpbWl0JywgbmFtZTogJ+aXtumXtOmZkOWItjonLCBvcHRpb25zOiBbJ+aXoOmZkOWIticsICc15YiG6ZKfJywgJzEw5YiG6ZKfJywgJzMw5YiG6ZKfJ10gfVxuICAgIF07XG4gICAgc2V0dGluZ3MuZm9yRWFjaCgoc2V0dGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qgc2V0dGluZ1BhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBzZXR0aW5nc1NlY3Rpb24sIGBTZXR0aW5nXyR7c2V0dGluZy5pZH1gKTtcbiAgICAgICAgc2V0dGluZ1BhbmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBzZXR0aW5nUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzQwcHgnO1xuICAgICAgICBzZXR0aW5nUGFuZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzZXR0aW5nUGFuZWwsIGAke3NldHRpbmcuaWR9X0xhYmVsYCk7XG4gICAgICAgIGxhYmVsLnRleHQgPSBzZXR0aW5nLm5hbWU7XG4gICAgICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gJyNjY2NjY2MnO1xuICAgICAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICAgICAgbGFiZWwuc3R5bGUud2lkdGggPSAnMTAwcHgnO1xuICAgICAgICAvLyDliJvlu7rpgInpobnmjInpkq5cbiAgICAgICAgc2V0dGluZy5vcHRpb25zLmZvckVhY2goKG9wdGlvbiwgb3B0SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIHNldHRpbmdQYW5lbCwgYCR7c2V0dGluZy5pZH1fT3B0aW9uXyR7b3B0SW5kZXh9YCk7XG4gICAgICAgICAgICBvcHRpb25CdXR0b24udGV4dCA9IG9wdGlvbjtcbiAgICAgICAgICAgIG9wdGlvbkJ1dHRvbi5zdHlsZS53aWR0aCA9ICc2MHB4JztcbiAgICAgICAgICAgIG9wdGlvbkJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnMjVweCc7XG4gICAgICAgICAgICBvcHRpb25CdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM0OTUwNTcnO1xuICAgICAgICAgICAgb3B0aW9uQnV0dG9uLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgICAgIG9wdGlvbkJ1dHRvbi5zdHlsZS5mb250U2l6ZSA9ICcxMXB4JztcbiAgICAgICAgICAgIG9wdGlvbkJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKSc7XG4gICAgICAgICAgICBvcHRpb25CdXR0b24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzNweCc7XG4gICAgICAgICAgICBvcHRpb25CdXR0b24uc3R5bGUubWFyZ2luID0gJzJweCc7XG4gICAgICAgICAgICBvcHRpb25CdXR0b24uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAkLk1zZyhg6K6+572u5pu05pawOiAke3NldHRpbmcuaWR9ID0gJHtvcHRpb259YCk7XG4gICAgICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3VwZGF0ZV90cmFpbmluZ19zZXR0aW5nJywge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nOiBzZXR0aW5nLmlkLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdXBkYXRlU2V0dGluZ0J1dHRvbihzZXR0aW5nLmlkLCBvcHRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8g5o6n5Yi25oyJ6ZKu5Yy65Z+fXG4gICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ0NvbnRyb2xTZWN0aW9uJyk7XG4gICAgY29udHJvbFNlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udHJvbFNlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xuICAgIGNvbnRyb2xTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGNvbnRyb2xTZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBjb250cm9sU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIGNvbnN0IGNvbnRyb2xUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY29udHJvbFNlY3Rpb24sICdDb250cm9sVGl0bGUnKTtcbiAgICBjb250cm9sVGl0bGUudGV4dCA9ICfwn46uIOaOp+WItumdouadvyc7XG4gICAgY29udHJvbFRpdGxlLnN0eWxlLmNvbG9yID0gJyNmZmQ3MDAnO1xuICAgIGNvbnRyb2xUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBjb250cm9sVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBjb250cm9sVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIC8vIOaOp+WItuaMiemSrlxuICAgIGNvbnN0IGNvbnRyb2xzID0gW1xuICAgICAgICB7IGlkOiAnc3RhcnQnLCBuYW1lOiAn5byA5aeL6K6t57uDJywgY29sb3I6ICcjMjhhNzQ1JyB9LFxuICAgICAgICB7IGlkOiAncGF1c2UnLCBuYW1lOiAn5pqC5YGcJywgY29sb3I6ICcjZmZjMTA3JyB9LFxuICAgICAgICB7IGlkOiAnc3RvcCcsIG5hbWU6ICflgZzmraInLCBjb2xvcjogJyNkYzM1NDUnIH0sXG4gICAgICAgIHsgaWQ6ICdyZXNldCcsIG5hbWU6ICfph43nva4nLCBjb2xvcjogJyM2Yzc1N2QnIH1cbiAgICBdO1xuICAgIGNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGNvbnRyb2xTZWN0aW9uLCBgQ29udHJvbEJ1dHRvbl8ke2NvbnRyb2wuaWR9YCk7XG4gICAgICAgIGJ1dHRvbi50ZXh0ID0gY29udHJvbC5uYW1lO1xuICAgICAgICBidXR0b24uc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnMzVweCc7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb250cm9sLmNvbG9yO1xuICAgICAgICBidXR0b24uc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgICAgICBidXR0b24uc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICBidXR0b24uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMiknO1xuICAgICAgICBidXR0b24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzVweCc7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5tYXJnaW4gPSAnMnB4JztcbiAgICAgICAgYnV0dG9uLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAkLk1zZyhg6K6t57uD5o6n5Yi2OiAke2NvbnRyb2wubmFtZX1gKTtcbiAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCd0cmFpbmluZ19jb250cm9sJywgeyBhY3Rpb246IGNvbnRyb2wuaWQgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgICQuTXNnKCdUcmFpbmluZyBwYW5lbCBVSSBjcmVhdGVkIHN1Y2Nlc3NmdWxseSEnKTtcbn1cbi8vIOabtOaWsOa0u+i3g+aooeW8j1xuZnVuY3Rpb24gdXBkYXRlQWN0aXZlTW9kZShhY3RpdmVNb2RlKSB7XG4gICAgY29uc3QgbW9kZXMgPSBbJ2R1bW15JywgJ3dhdmUnLCAnYm9zcycsICdzdXJ2aXZhbCddO1xuICAgIG1vZGVzLmZvckVhY2gobW9kZSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBNb2RlQnV0dG9uXyR7bW9kZX1gKTtcbiAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgICAgaWYgKG1vZGUgPT09IGFjdGl2ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZjZiMzUnO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICNmZmQ3MDAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgICAgICAgICAgICAgICAnZHVtbXknOiAnIzI4YTc0NScsXG4gICAgICAgICAgICAgICAgICAgICd3YXZlJzogJyMxN2EyYjgnLFxuICAgICAgICAgICAgICAgICAgICAnYm9zcyc6ICcjZGMzNTQ1JyxcbiAgICAgICAgICAgICAgICAgICAgJ3N1cnZpdmFsJzogJyM2ZjQyYzEnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JzW21vZGVdO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIOabtOaWsOiuvue9ruaMiemSrlxuZnVuY3Rpb24gdXBkYXRlU2V0dGluZ0J1dHRvbihzZXR0aW5nSWQsIGFjdGl2ZUluZGV4KSB7XG4gICAgY29uc3Qgc2V0dGluZ1BhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFNldHRpbmdfJHtzZXR0aW5nSWR9YCk7XG4gICAgaWYgKHNldHRpbmdQYW5lbCkge1xuICAgICAgICAvLyDph43nva7miYDmnInmjInpkq5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IHNldHRpbmdQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYCR7c2V0dGluZ0lkfV9PcHRpb25fJHtpfWApO1xuICAgICAgICAgICAgaWYgKGJ1dHRvbikge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzQ5NTA1Nyc7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDpq5jkuq7mtLvot4PmjInpkq5cbiAgICAgICAgY29uc3QgYWN0aXZlQnV0dG9uID0gc2V0dGluZ1BhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgJHtzZXR0aW5nSWR9X09wdGlvbl8ke2FjdGl2ZUluZGV4fWApO1xuICAgICAgICBpZiAoYWN0aXZlQnV0dG9uKSB7XG4gICAgICAgICAgICBhY3RpdmVCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyNmZjZiMzUnO1xuICAgICAgICAgICAgYWN0aXZlQnV0dG9uLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgI2ZmZDcwMCc7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyDnm5HlkKzorq3nu4Pkuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCd0cmFpbmluZ19tb2RlX2NoYW5nZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdUcmFpbmluZyBtb2RlIGNoYW5nZWQ6JywgZGF0YSk7XG4gICAgdXBkYXRlQWN0aXZlTW9kZShkYXRhLm1vZGUpO1xufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgndHJhaW5pbmdfc2V0dGluZ191cGRhdGVkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZygnVHJhaW5pbmcgc2V0dGluZyB1cGRhdGVkOicsIGRhdGEpO1xuICAgIC8vIOi/memHjOWPr+S7peagueaNruWFt+S9k+iuvue9ruabtOaWsFVJXG59KTtcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCd0cmFpbmluZ19zdGF0dXNfY2hhbmdlZCcsIChkYXRhKSA9PiB7XG4gICAgJC5Nc2coJ1RyYWluaW5nIHN0YXR1cyBjaGFuZ2VkOicsIGRhdGEpO1xuICAgIGNvbnN0IHN0YXR1cyA9IGRhdGEuc3RhdHVzO1xuICAgIC8vIOabtOaWsOaOp+WItuaMiemSrueKtuaAgVxuICAgIGNvbnN0IHN0YXJ0QnV0dG9uID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0NvbnRyb2xCdXR0b25fc3RhcnQnKTtcbiAgICBjb25zdCBwYXVzZUJ1dHRvbiA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdDb250cm9sQnV0dG9uX3BhdXNlJyk7XG4gICAgY29uc3Qgc3RvcEJ1dHRvbiA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdDb250cm9sQnV0dG9uX3N0b3AnKTtcbiAgICBpZiAoc3RhcnRCdXR0b24pXG4gICAgICAgIHN0YXJ0QnV0dG9uLmVuYWJsZWQgPSBzdGF0dXMgIT09ICdydW5uaW5nJztcbiAgICBpZiAocGF1c2VCdXR0b24pXG4gICAgICAgIHBhdXNlQnV0dG9uLmVuYWJsZWQgPSBzdGF0dXMgPT09ICdydW5uaW5nJztcbiAgICBpZiAoc3RvcEJ1dHRvbilcbiAgICAgICAgc3RvcEJ1dHRvbi5lbmFibGVkID0gc3RhdHVzICE9PSAnc3RvcHBlZCc7XG59KTtcbi8vIOWIneWni+WMllxuZnVuY3Rpb24gaW5pdGlhbGl6ZVRyYWluaW5nUGFuZWwoKSB7XG4gICAgJC5Nc2coJz09PSBJbml0aWFsaXppbmcgVHJhaW5pbmcgUGFuZWwgPT09Jyk7XG4gICAgLy8g5bu26L+f5Yib5bu6VUlcbiAgICAkLlNjaGVkdWxlKDAuNSwgY3JlYXRlVHJhaW5pbmdQYW5lbFVJKTtcbiAgICAvLyDorr7nva7lv6vmjbfplK5cbiAgICAkLlJlZ2lzdGVyS2V5QmluZCgkLkdldENvbnRleHRQYW5lbCgpLCAna2V5X2Y5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnPT09IEY5OiBSZWNyZWF0aW5nIFRyYWluaW5nIFBhbmVsIFVJID09PScpO1xuICAgICAgICBjcmVhdGVUcmFpbmluZ1BhbmVsVUkoKTtcbiAgICB9KTtcbiAgICAkLlJlZ2lzdGVyS2V5QmluZCgkLkdldENvbnRleHRQYW5lbCgpLCAna2V5X2YxMCcsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSBGMTA6IFRvZ2dsZSBUcmFpbmluZyBQYW5lbCA9PT0nKTtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1RyYWluaW5nUGFuZWxDb250YWluZXInKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgY29udGFpbmVyLnZpc2libGUgPSAhY29udGFpbmVyLnZpc2libGU7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIOWvvOWHuuWFqOWxgOWHveaVsFxuZ2xvYmFsVGhpcy5UcmFpbmluZ1BhbmVsVGVzdCA9IHtcbiAgICBjcmVhdGVVSTogY3JlYXRlVHJhaW5pbmdQYW5lbFVJLFxuICAgIHVwZGF0ZU1vZGU6IHVwZGF0ZUFjdGl2ZU1vZGUsXG4gICAgdXBkYXRlU2V0dGluZzogdXBkYXRlU2V0dGluZ0J1dHRvblxufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuaW5pdGlhbGl6ZVRyYWluaW5nUGFuZWwoKTtcbi8vIOWvvOWHulJlYWN057uE5Lu277yI5L+d5oyB5YW85a655oCn77yJXG5jb25zdCBUcmFpbmluZ1BhbmVsID0gKCkgPT4ge1xuICAgIHJldHVybiBudWxsOyAvLyDkvb/nlKjljp/nlJ9QYW5vcmFtYVxufTtcbmV4cG9ydCBkZWZhdWx0IFRyYWluaW5nUGFuZWw7XG4kLk1zZygnPT09IFRyYWluaW5nIFBhbmVsIG1vZHVsZSBsb2FkZWQgY29tcGxldGVseSA9PT0nKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==