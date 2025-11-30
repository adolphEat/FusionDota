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
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\autochess-panel\index.tsx ***!
  \******************************************************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
// 自走棋模式面板 - FusionDota
$.Msg('=== AutoChess Panel Loading ===');
// 创建自走棋UI
function createAutoChessPanelUI() {
    $.Msg('Creating AutoChess panel UI...');
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('AutoChessPanelContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'AutoChessPanelContainer');
    container.style.position = 'absolute';
    container.style.top = '50px';
    container.style.left = '50px';
    container.style.width = '500px';
    container.style.height = '600px';
    container.style.backgroundColor = 'rgba(40, 20, 60, 0.95)';
    container.style.border = '3px solid #9c27b0';
    container.style.borderRadius = '15px';
    container.style.zIndex = '1000';
    container.style.padding = '20px';
    container.style.boxShadow = '0 0 30px rgba(156, 39, 176, 0.4)';
    // 标题
    const title = $.CreatePanel('Label', container, 'AutoChessPanelTitle');
    title.text = '♟️ 自走棋控制台';
    title.style.color = '#9c27b0';
    title.style.fontSize = '28px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';
    // 游戏状态区域
    const statusSection = $.CreatePanel('Panel', container, 'StatusSection');
    statusSection.style.width = '100%';
    statusSection.style.height = '100px';
    statusSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    statusSection.style.borderRadius = '10px';
    statusSection.style.padding = '15px';
    statusSection.style.marginBottom = '15px';
    const statusTitle = $.CreatePanel('Label', statusSection, 'StatusTitle');
    statusTitle.text = '📊 游戏状态';
    statusTitle.style.color = '#ffd700';
    statusTitle.style.fontSize = '16px';
    statusTitle.style.fontWeight = 'bold';
    statusTitle.style.marginBottom = '10px';
    // 状态信息
    const statusInfo = [
        { id: 'round', label: '当前回合:', value: '1', color: '#4caf50' },
        { id: 'phase', label: '阶段:', value: '准备阶段', color: '#2196f3' },
        { id: 'gold', label: '金币:', value: '10', color: '#ff9800' },
        { id: 'health', label: '生命值:', value: '100', color: '#f44336' }
    ];
    statusInfo.forEach((info, index) => {
        const infoPanel = $.CreatePanel('Panel', statusSection, `StatusInfo_${info.id}`);
        infoPanel.style.width = '50%';
        infoPanel.style.height = '25px';
        infoPanel.style.marginBottom = '5px';
        const label = $.CreatePanel('Label', infoPanel, `${info.id}_Label`);
        label.text = info.label;
        label.style.color = '#cccccc';
        label.style.fontSize = '14px';
        label.style.width = '80px';
        const value = $.CreatePanel('Label', infoPanel, `${info.id}_Value`);
        value.text = info.value;
        value.style.color = info.color;
        value.style.fontSize = '14px';
        value.style.fontWeight = 'bold';
        value.style.horizontalAlign = 'right';
        value.style.width = '100px';
    });
    // 商店区域
    const shopSection = $.CreatePanel('Panel', container, 'ShopSection');
    shopSection.style.width = '100%';
    shopSection.style.height = '150px';
    shopSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    shopSection.style.borderRadius = '10px';
    shopSection.style.padding = '15px';
    shopSection.style.marginBottom = '15px';
    const shopTitle = $.CreatePanel('Label', shopSection, 'ShopTitle');
    shopTitle.text = '🛒 英雄商店';
    shopTitle.style.color = '#ffd700';
    shopTitle.style.fontSize = '16px';
    shopTitle.style.fontWeight = 'bold';
    shopTitle.style.marginBottom = '10px';
    // 商店按钮
    const shopButtons = [
        { id: 'refresh', name: '刷新商店', cost: '2', color: '#4caf50' },
        { id: 'buy_xp', name: '购买经验', cost: '4', color: '#2196f3' },
        { id: 'reroll', name: '重掷', cost: '1', color: '#ff9800' }
    ];
    shopButtons.forEach((button, index) => {
        const buttonPanel = $.CreatePanel('Panel', shopSection, `ShopButton_${button.id}`);
        buttonPanel.style.width = '30%';
        buttonPanel.style.height = '40px';
        buttonPanel.style.margin = '5px';
        const btn = $.CreatePanel('Button', buttonPanel, button.id);
        btn.text = `${button.name}\n(${button.cost}金币)`;
        btn.style.width = '100%';
        btn.style.height = '100%';
        btn.style.backgroundColor = button.color;
        btn.style.color = 'white';
        btn.style.fontSize = '12px';
        btn.style.fontWeight = 'bold';
        btn.style.border = '1px solid rgba(255,255,255,0.2)';
        btn.style.borderRadius = '5px';
        btn.SetPanelEvent('onactivate', () => {
            $.Msg(`商店操作: ${button.name}`);
            GameEvents.SendCustomGameEventToServer('shop_action', { action: button.id });
        });
    });
    // 英雄展示区域
    const heroesSection = $.CreatePanel('Panel', container, 'HeroesSection');
    heroesSection.style.width = '100%';
    heroesSection.style.height = '200px';
    heroesSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    heroesSection.style.borderRadius = '10px';
    heroesSection.style.padding = '15px';
    heroesSection.style.marginBottom = '15px';
    const heroesTitle = $.CreatePanel('Label', heroesSection, 'HeroesTitle');
    heroesTitle.text = '⚔️ 当前阵容';
    heroesTitle.style.color = '#ffd700';
    heroesTitle.style.fontSize = '16px';
    heroesTitle.style.fontWeight = 'bold';
    heroesTitle.style.marginBottom = '10px';
    // 英雄槽位
    const heroSlots = [];
    for (let i = 0; i < 8; i++) {
        const slot = $.CreatePanel('Panel', heroesSection, `HeroSlot_${i}`);
        slot.style.width = '50px';
        slot.style.height = '50px';
        slot.style.backgroundColor = 'rgba(100, 100, 100, 0.3)';
        slot.style.border = '2px dashed #666666';
        slot.style.borderRadius = '8px';
        slot.style.margin = '5px';
        slot.style.horizontalAlign = 'center';
        slot.style.verticalAlign = 'center';
        const slotLabel = $.CreatePanel('Label', slot, `SlotLabel_${i}`);
        slotLabel.text = `${i + 1}`;
        slotLabel.style.color = '#999999';
        slotLabel.style.fontSize = '12px';
        slotLabel.style.textAlign = 'center';
        heroSlots.push(slot);
    }
    // 控制按钮区域
    const controlSection = $.CreatePanel('Panel', container, 'ControlSection');
    controlSection.style.width = '100%';
    controlSection.style.height = '80px';
    controlSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    controlSection.style.borderRadius = '10px';
    controlSection.style.padding = '15px';
    const controlTitle = $.CreatePanel('Label', controlSection, 'ControlTitle');
    controlTitle.text = '🎮 游戏控制';
    controlTitle.style.color = '#ffd700';
    controlTitle.style.fontSize = '16px';
    controlTitle.style.fontWeight = 'bold';
    controlTitle.style.marginBottom = '10px';
    // 控制按钮
    const controls = [
        { id: 'start_battle', name: '开始战斗', color: '#4caf50' },
        { id: 'end_turn', name: '结束回合', color: '#ff9800' },
        { id: 'surrender', name: '投降', color: '#f44336' }
    ];
    controls.forEach((control, index) => {
        const button = $.CreatePanel('Button', controlSection, `ControlButton_${control.id}`);
        button.text = control.name;
        button.style.width = '120px';
        button.style.height = '35px';
        button.style.backgroundColor = control.color;
        button.style.color = 'white';
        button.style.fontSize = '12px';
        button.style.fontWeight = 'bold';
        button.style.border = '1px solid rgba(255,255,255,0.2)';
        button.style.borderRadius = '5px';
        button.style.margin = '2px';
        button.SetPanelEvent('onactivate', () => {
            $.Msg(`自走棋控制: ${control.name}`);
            GameEvents.SendCustomGameEventToServer('autochess_control', { action: control.id });
        });
    });
    $.Msg('AutoChess panel UI created successfully!');
}
// 更新游戏状态
function updateGameStatus(status) {
    $.Msg('Updating AutoChess game status:', status);
    const updateStatus = (id, value, color) => {
        var _a;
        const statusValue = (_a = $.GetContextPanel().FindChildInLayoutFile(`StatusInfo_${id}`)) === null || _a === void 0 ? void 0 : _a.FindChildInLayoutFile(`${id}_Value`);
        if (statusValue) {
            statusValue.text = value;
            if (color) {
                statusValue.style.color = color;
            }
        }
    };
    if (status.round)
        updateStatus('round', status.round.toString());
    if (status.phase)
        updateStatus('phase', status.phase);
    if (status.gold)
        updateStatus('gold', status.gold.toString());
    if (status.health) {
        const healthColor = status.health > 50 ? '#4caf50' : status.health > 20 ? '#ff9800' : '#f44336';
        updateStatus('health', status.health.toString(), healthColor);
    }
}
// 更新英雄阵容
function updateHeroLineup(heroes) {
    $.Msg('Updating hero lineup:', heroes);
    for (let i = 0; i < 8; i++) {
        const slot = $.GetContextPanel().FindChildInLayoutFile(`HeroSlot_${i}`);
        const slotLabel = slot === null || slot === void 0 ? void 0 : slot.FindChildInLayoutFile(`SlotLabel_${i}`);
        if (heroes[i]) {
            const hero = heroes[i];
            slot.style.backgroundColor = 'rgba(76, 175, 80, 0.3)';
            slot.style.border = '2px solid #4caf50';
            slotLabel.text = hero.name || 'H';
            slotLabel.style.color = '#4caf50';
        }
        else {
            slot.style.backgroundColor = 'rgba(100, 100, 100, 0.3)';
            slot.style.border = '2px dashed #666666';
            slotLabel.text = `${i + 1}`;
            slotLabel.style.color = '#999999';
        }
    }
}
// 更新商店
function updateShop(shopItems) {
    $.Msg('Updating shop items:', shopItems);
    // 这里可以根据商店物品更新UI
}
// 监听自走棋事件
GameEvents.Subscribe('autochess_status_updated', (data) => {
    $.Msg('AutoChess status updated:', data);
    updateGameStatus(data);
});
GameEvents.Subscribe('autochess_heroes_updated', (data) => {
    $.Msg('AutoChess heroes updated:', data);
    updateHeroLineup(data.heroes);
});
GameEvents.Subscribe('autochess_shop_updated', (data) => {
    $.Msg('AutoChess shop updated:', data);
    updateShop(data.items);
});
GameEvents.Subscribe('autochess_phase_changed', (data) => {
    $.Msg('AutoChess phase changed:', data);
    const phaseNames = {
        'preparation': '准备阶段',
        'battle': '战斗阶段',
        'shopping': '购物阶段',
        'planning': '规划阶段'
    };
    updateGameStatus({ phase: phaseNames[data.phase] || data.phase });
});
// 初始化
function initializeAutoChessPanel() {
    $.Msg('=== Initializing AutoChess Panel ===');
    // 延迟创建UI
    $.Schedule(0.5, createAutoChessPanelUI);
    // 设置快捷键
    $.RegisterKeyBind($.GetContextPanel(), 'key_f9', () => {
        $.Msg('=== F9: Recreating AutoChess Panel UI ===');
        createAutoChessPanelUI();
    });
    $.RegisterKeyBind($.GetContextPanel(), 'key_f11', () => {
        $.Msg('=== F11: Toggle AutoChess Panel ===');
        const container = $.GetContextPanel().FindChildInLayoutFile('AutoChessPanelContainer');
        if (container) {
            container.visible = !container.visible;
        }
    });
}
// 导出全局函数
globalThis.AutoChessPanelTest = {
    createUI: createAutoChessPanelUI,
    updateStatus: updateGameStatus,
    updateHeroes: updateHeroLineup,
    updateShop: updateShop
};
// 立即执行初始化
initializeAutoChessPanel();
// 导出React组件（保持兼容性）
const AutoChessPanel = () => {
    return null; // 使用原生Panorama
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AutoChessPanel);
$.Msg('=== AutoChess Panel module loaded completely ===');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpRUFBZSxjQUFjLEVBQUM7QUFDOUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxhdXRvY2hlc3MtcGFuZWxcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBAdHMtbm9jaGVja1xuLy8g6Ieq6LWw5qOL5qih5byP6Z2i5p2/IC0gRnVzaW9uRG90YVxuJC5Nc2coJz09PSBBdXRvQ2hlc3MgUGFuZWwgTG9hZGluZyA9PT0nKTtcbi8vIOWIm+W7uuiHqui1sOaji1VJXG5mdW5jdGlvbiBjcmVhdGVBdXRvQ2hlc3NQYW5lbFVJKCkge1xuICAgICQuTXNnKCdDcmVhdGluZyBBdXRvQ2hlc3MgcGFuZWwgVUkuLi4nKTtcbiAgICAvLyDojrflj5bmoLnpnaLmnb9cbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdFcnJvcjogUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDliKDpmaTlt7LlrZjlnKjnmoTlrrnlmahcbiAgICBjb25zdCBleGlzdGluZ0NvbnRhaW5lciA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0F1dG9DaGVzc1BhbmVsQ29udGFpbmVyJyk7XG4gICAgaWYgKGV4aXN0aW5nQ29udGFpbmVyKSB7XG4gICAgICAgIGV4aXN0aW5nQ29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgIH1cbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ0F1dG9DaGVzc1BhbmVsQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjb250YWluZXIuc3R5bGUudG9wID0gJzUwcHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gJzUwcHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICc1MDBweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICc2MDBweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDQwLCAyMCwgNjAsIDAuOTUpJztcbiAgICBjb250YWluZXIuc3R5bGUuYm9yZGVyID0gJzNweCBzb2xpZCAjOWMyN2IwJztcbiAgICBjb250YWluZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMCc7XG4gICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgY29udGFpbmVyLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMzBweCByZ2JhKDE1NiwgMzksIDE3NiwgMC40KSc7XG4gICAgLy8g5qCH6aKYXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGNvbnRhaW5lciwgJ0F1dG9DaGVzc1BhbmVsVGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+KZn++4jyDoh6rotbDmo4vmjqfliLblj7AnO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gJyM5YzI3YjAnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gJzI4cHgnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzIwcHgnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRTaGFkb3cgPSAnMnB4IDJweCA0cHggcmdiYSgwLDAsMCwxKSc7XG4gICAgLy8g5ri45oiP54q25oCB5Yy65Z+fXG4gICAgY29uc3Qgc3RhdHVzU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnU3RhdHVzU2VjdGlvbicpO1xuICAgIHN0YXR1c1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3RhdHVzU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTAwcHgnO1xuICAgIHN0YXR1c1NlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgc3RhdHVzU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgc3RhdHVzU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIHN0YXR1c1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIGNvbnN0IHN0YXR1c1RpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzdGF0dXNTZWN0aW9uLCAnU3RhdHVzVGl0bGUnKTtcbiAgICBzdGF0dXNUaXRsZS50ZXh0ID0gJ/Cfk4og5ri45oiP54q25oCBJztcbiAgICBzdGF0dXNUaXRsZS5zdHlsZS5jb2xvciA9ICcjZmZkNzAwJztcbiAgICBzdGF0dXNUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBzdGF0dXNUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHN0YXR1c1RpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICAvLyDnirbmgIHkv6Hmga9cbiAgICBjb25zdCBzdGF0dXNJbmZvID0gW1xuICAgICAgICB7IGlkOiAncm91bmQnLCBsYWJlbDogJ+W9k+WJjeWbnuWQiDonLCB2YWx1ZTogJzEnLCBjb2xvcjogJyM0Y2FmNTAnIH0sXG4gICAgICAgIHsgaWQ6ICdwaGFzZScsIGxhYmVsOiAn6Zi25q61OicsIHZhbHVlOiAn5YeG5aSH6Zi25q61JywgY29sb3I6ICcjMjE5NmYzJyB9LFxuICAgICAgICB7IGlkOiAnZ29sZCcsIGxhYmVsOiAn6YeR5biBOicsIHZhbHVlOiAnMTAnLCBjb2xvcjogJyNmZjk4MDAnIH0sXG4gICAgICAgIHsgaWQ6ICdoZWFsdGgnLCBsYWJlbDogJ+eUn+WRveWAvDonLCB2YWx1ZTogJzEwMCcsIGNvbG9yOiAnI2Y0NDMzNicgfVxuICAgIF07XG4gICAgc3RhdHVzSW5mby5mb3JFYWNoKChpbmZvLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBpbmZvUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN0YXR1c1NlY3Rpb24sIGBTdGF0dXNJbmZvXyR7aW5mby5pZH1gKTtcbiAgICAgICAgaW5mb1BhbmVsLnN0eWxlLndpZHRoID0gJzUwJSc7XG4gICAgICAgIGluZm9QYW5lbC5zdHlsZS5oZWlnaHQgPSAnMjVweCc7XG4gICAgICAgIGluZm9QYW5lbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAgICAgY29uc3QgbGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGluZm9QYW5lbCwgYCR7aW5mby5pZH1fTGFiZWxgKTtcbiAgICAgICAgbGFiZWwudGV4dCA9IGluZm8ubGFiZWw7XG4gICAgICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gJyNjY2NjY2MnO1xuICAgICAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICAgICAgbGFiZWwuc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBpbmZvUGFuZWwsIGAke2luZm8uaWR9X1ZhbHVlYCk7XG4gICAgICAgIHZhbHVlLnRleHQgPSBpbmZvLnZhbHVlO1xuICAgICAgICB2YWx1ZS5zdHlsZS5jb2xvciA9IGluZm8uY29sb3I7XG4gICAgICAgIHZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgICAgICB2YWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICB2YWx1ZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgICAgICB2YWx1ZS5zdHlsZS53aWR0aCA9ICcxMDBweCc7XG4gICAgfSk7XG4gICAgLy8g5ZWG5bqX5Yy65Z+fXG4gICAgY29uc3Qgc2hvcFNlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ1Nob3BTZWN0aW9uJyk7XG4gICAgc2hvcFNlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc2hvcFNlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzE1MHB4JztcbiAgICBzaG9wU2VjdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBzaG9wU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgc2hvcFNlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcxNXB4JztcbiAgICBzaG9wU2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgY29uc3Qgc2hvcFRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzaG9wU2VjdGlvbiwgJ1Nob3BUaXRsZScpO1xuICAgIHNob3BUaXRsZS50ZXh0ID0gJ/Cfm5Ig6Iux6ZuE5ZWG5bqXJztcbiAgICBzaG9wVGl0bGUuc3R5bGUuY29sb3IgPSAnI2ZmZDcwMCc7XG4gICAgc2hvcFRpdGxlLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIHNob3BUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHNob3BUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgLy8g5ZWG5bqX5oyJ6ZKuXG4gICAgY29uc3Qgc2hvcEJ1dHRvbnMgPSBbXG4gICAgICAgIHsgaWQ6ICdyZWZyZXNoJywgbmFtZTogJ+WIt+aWsOWVhuW6lycsIGNvc3Q6ICcyJywgY29sb3I6ICcjNGNhZjUwJyB9LFxuICAgICAgICB7IGlkOiAnYnV5X3hwJywgbmFtZTogJ+i0reS5sOe7j+mqjCcsIGNvc3Q6ICc0JywgY29sb3I6ICcjMjE5NmYzJyB9LFxuICAgICAgICB7IGlkOiAncmVyb2xsJywgbmFtZTogJ+mHjeaOtycsIGNvc3Q6ICcxJywgY29sb3I6ICcjZmY5ODAwJyB9XG4gICAgXTtcbiAgICBzaG9wQnV0dG9ucy5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvblBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBzaG9wU2VjdGlvbiwgYFNob3BCdXR0b25fJHtidXR0b24uaWR9YCk7XG4gICAgICAgIGJ1dHRvblBhbmVsLnN0eWxlLndpZHRoID0gJzMwJSc7XG4gICAgICAgIGJ1dHRvblBhbmVsLnN0eWxlLmhlaWdodCA9ICc0MHB4JztcbiAgICAgICAgYnV0dG9uUGFuZWwuc3R5bGUubWFyZ2luID0gJzVweCc7XG4gICAgICAgIGNvbnN0IGJ0biA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGJ1dHRvblBhbmVsLCBidXR0b24uaWQpO1xuICAgICAgICBidG4udGV4dCA9IGAke2J1dHRvbi5uYW1lfVxcbigke2J1dHRvbi5jb3N0femHkeW4gSlgO1xuICAgICAgICBidG4uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGJ0bi5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBidXR0b24uY29sb3I7XG4gICAgICAgIGJ0bi5zdHlsZS5jb2xvciA9ICd3aGl0ZSc7XG4gICAgICAgIGJ0bi5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgYnRuLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgICAgIGJ0bi5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKSc7XG4gICAgICAgIGJ0bi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNXB4JztcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAkLk1zZyhg5ZWG5bqX5pON5L2cOiAke2J1dHRvbi5uYW1lfWApO1xuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3Nob3BfYWN0aW9uJywgeyBhY3Rpb246IGJ1dHRvbi5pZCB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy8g6Iux6ZuE5bGV56S65Yy65Z+fXG4gICAgY29uc3QgaGVyb2VzU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnSGVyb2VzU2VjdGlvbicpO1xuICAgIGhlcm9lc1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgaGVyb2VzU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMjAwcHgnO1xuICAgIGhlcm9lc1NlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgaGVyb2VzU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgaGVyb2VzU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIGhlcm9lc1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIGNvbnN0IGhlcm9lc1RpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBoZXJvZXNTZWN0aW9uLCAnSGVyb2VzVGl0bGUnKTtcbiAgICBoZXJvZXNUaXRsZS50ZXh0ID0gJ+KalO+4jyDlvZPliY3pmLXlrrknO1xuICAgIGhlcm9lc1RpdGxlLnN0eWxlLmNvbG9yID0gJyNmZmQ3MDAnO1xuICAgIGhlcm9lc1RpdGxlLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIGhlcm9lc1RpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgaGVyb2VzVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIC8vIOiLsembhOanveS9jVxuICAgIGNvbnN0IGhlcm9TbG90cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNsb3QgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGhlcm9lc1NlY3Rpb24sIGBIZXJvU2xvdF8ke2l9YCk7XG4gICAgICAgIHNsb3Quc3R5bGUud2lkdGggPSAnNTBweCc7XG4gICAgICAgIHNsb3Quc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgICAgICBzbG90LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDEwMCwgMTAwLCAxMDAsIDAuMyknO1xuICAgICAgICBzbG90LnN0eWxlLmJvcmRlciA9ICcycHggZGFzaGVkICM2NjY2NjYnO1xuICAgICAgICBzbG90LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgICAgICBzbG90LnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgICAgICBzbG90LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBzbG90LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY29uc3Qgc2xvdExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90LCBgU2xvdExhYmVsXyR7aX1gKTtcbiAgICAgICAgc2xvdExhYmVsLnRleHQgPSBgJHtpICsgMX1gO1xuICAgICAgICBzbG90TGFiZWwuc3R5bGUuY29sb3IgPSAnIzk5OTk5OSc7XG4gICAgICAgIHNsb3RMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgc2xvdExhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBoZXJvU2xvdHMucHVzaChzbG90KTtcbiAgICB9XG4gICAgLy8g5o6n5Yi25oyJ6ZKu5Yy65Z+fXG4gICAgY29uc3QgY29udHJvbFNlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ0NvbnRyb2xTZWN0aW9uJyk7XG4gICAgY29udHJvbFNlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udHJvbFNlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xuICAgIGNvbnRyb2xTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGNvbnRyb2xTZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBjb250cm9sU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIGNvbnN0IGNvbnRyb2xUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY29udHJvbFNlY3Rpb24sICdDb250cm9sVGl0bGUnKTtcbiAgICBjb250cm9sVGl0bGUudGV4dCA9ICfwn46uIOa4uOaIj+aOp+WItic7XG4gICAgY29udHJvbFRpdGxlLnN0eWxlLmNvbG9yID0gJyNmZmQ3MDAnO1xuICAgIGNvbnRyb2xUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBjb250cm9sVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBjb250cm9sVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIC8vIOaOp+WItuaMiemSrlxuICAgIGNvbnN0IGNvbnRyb2xzID0gW1xuICAgICAgICB7IGlkOiAnc3RhcnRfYmF0dGxlJywgbmFtZTogJ+W8gOWni+aImOaWlycsIGNvbG9yOiAnIzRjYWY1MCcgfSxcbiAgICAgICAgeyBpZDogJ2VuZF90dXJuJywgbmFtZTogJ+e7k+adn+WbnuWQiCcsIGNvbG9yOiAnI2ZmOTgwMCcgfSxcbiAgICAgICAgeyBpZDogJ3N1cnJlbmRlcicsIG5hbWU6ICfmipXpmY0nLCBjb2xvcjogJyNmNDQzMzYnIH1cbiAgICBdO1xuICAgIGNvbnRyb2xzLmZvckVhY2goKGNvbnRyb2wsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGNvbnRyb2xTZWN0aW9uLCBgQ29udHJvbEJ1dHRvbl8ke2NvbnRyb2wuaWR9YCk7XG4gICAgICAgIGJ1dHRvbi50ZXh0ID0gY29udHJvbC5uYW1lO1xuICAgICAgICBidXR0b24uc3R5bGUud2lkdGggPSAnMTIwcHgnO1xuICAgICAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gJzM1cHgnO1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29udHJvbC5jb2xvcjtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICBidXR0b24uc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1cHgnO1xuICAgICAgICBidXR0b24uc3R5bGUubWFyZ2luID0gJzJweCc7XG4gICAgICAgIGJ1dHRvbi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coYOiHqui1sOaji+aOp+WItjogJHtjb250cm9sLm5hbWV9YCk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcignYXV0b2NoZXNzX2NvbnRyb2wnLCB7IGFjdGlvbjogY29udHJvbC5pZCB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgJC5Nc2coJ0F1dG9DaGVzcyBwYW5lbCBVSSBjcmVhdGVkIHN1Y2Nlc3NmdWxseSEnKTtcbn1cbi8vIOabtOaWsOa4uOaIj+eKtuaAgVxuZnVuY3Rpb24gdXBkYXRlR2FtZVN0YXR1cyhzdGF0dXMpIHtcbiAgICAkLk1zZygnVXBkYXRpbmcgQXV0b0NoZXNzIGdhbWUgc3RhdHVzOicsIHN0YXR1cyk7XG4gICAgY29uc3QgdXBkYXRlU3RhdHVzID0gKGlkLCB2YWx1ZSwgY29sb3IpID0+IHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBzdGF0dXNWYWx1ZSA9IChfYSA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBTdGF0dXNJbmZvXyR7aWR9YCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYCR7aWR9X1ZhbHVlYCk7XG4gICAgICAgIGlmIChzdGF0dXNWYWx1ZSkge1xuICAgICAgICAgICAgc3RhdHVzVmFsdWUudGV4dCA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgc3RhdHVzVmFsdWUuc3R5bGUuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKHN0YXR1cy5yb3VuZClcbiAgICAgICAgdXBkYXRlU3RhdHVzKCdyb3VuZCcsIHN0YXR1cy5yb3VuZC50b1N0cmluZygpKTtcbiAgICBpZiAoc3RhdHVzLnBoYXNlKVxuICAgICAgICB1cGRhdGVTdGF0dXMoJ3BoYXNlJywgc3RhdHVzLnBoYXNlKTtcbiAgICBpZiAoc3RhdHVzLmdvbGQpXG4gICAgICAgIHVwZGF0ZVN0YXR1cygnZ29sZCcsIHN0YXR1cy5nb2xkLnRvU3RyaW5nKCkpO1xuICAgIGlmIChzdGF0dXMuaGVhbHRoKSB7XG4gICAgICAgIGNvbnN0IGhlYWx0aENvbG9yID0gc3RhdHVzLmhlYWx0aCA+IDUwID8gJyM0Y2FmNTAnIDogc3RhdHVzLmhlYWx0aCA+IDIwID8gJyNmZjk4MDAnIDogJyNmNDQzMzYnO1xuICAgICAgICB1cGRhdGVTdGF0dXMoJ2hlYWx0aCcsIHN0YXR1cy5oZWFsdGgudG9TdHJpbmcoKSwgaGVhbHRoQ29sb3IpO1xuICAgIH1cbn1cbi8vIOabtOaWsOiLsembhOmYteWuuVxuZnVuY3Rpb24gdXBkYXRlSGVyb0xpbmV1cChoZXJvZXMpIHtcbiAgICAkLk1zZygnVXBkYXRpbmcgaGVybyBsaW5ldXA6JywgaGVyb2VzKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICBjb25zdCBzbG90ID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYEhlcm9TbG90XyR7aX1gKTtcbiAgICAgICAgY29uc3Qgc2xvdExhYmVsID0gc2xvdCA9PT0gbnVsbCB8fCBzbG90ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzbG90LkZpbmRDaGlsZEluTGF5b3V0RmlsZShgU2xvdExhYmVsXyR7aX1gKTtcbiAgICAgICAgaWYgKGhlcm9lc1tpXSkge1xuICAgICAgICAgICAgY29uc3QgaGVybyA9IGhlcm9lc1tpXTtcbiAgICAgICAgICAgIHNsb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoNzYsIDE3NSwgODAsIDAuMyknO1xuICAgICAgICAgICAgc2xvdC5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkICM0Y2FmNTAnO1xuICAgICAgICAgICAgc2xvdExhYmVsLnRleHQgPSBoZXJvLm5hbWUgfHwgJ0gnO1xuICAgICAgICAgICAgc2xvdExhYmVsLnN0eWxlLmNvbG9yID0gJyM0Y2FmNTAnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2xvdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMDAsIDEwMCwgMTAwLCAwLjMpJztcbiAgICAgICAgICAgIHNsb3Quc3R5bGUuYm9yZGVyID0gJzJweCBkYXNoZWQgIzY2NjY2Nic7XG4gICAgICAgICAgICBzbG90TGFiZWwudGV4dCA9IGAke2kgKyAxfWA7XG4gICAgICAgICAgICBzbG90TGFiZWwuc3R5bGUuY29sb3IgPSAnIzk5OTk5OSc7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyDmm7TmlrDllYblupdcbmZ1bmN0aW9uIHVwZGF0ZVNob3Aoc2hvcEl0ZW1zKSB7XG4gICAgJC5Nc2coJ1VwZGF0aW5nIHNob3AgaXRlbXM6Jywgc2hvcEl0ZW1zKTtcbiAgICAvLyDov5nph4zlj6/ku6XmoLnmja7llYblupfnianlk4Hmm7TmlrBVSVxufVxuLy8g55uR5ZCs6Ieq6LWw5qOL5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3N0YXR1c191cGRhdGVkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZygnQXV0b0NoZXNzIHN0YXR1cyB1cGRhdGVkOicsIGRhdGEpO1xuICAgIHVwZGF0ZUdhbWVTdGF0dXMoZGF0YSk7XG59KTtcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdhdXRvY2hlc3NfaGVyb2VzX3VwZGF0ZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdBdXRvQ2hlc3MgaGVyb2VzIHVwZGF0ZWQ6JywgZGF0YSk7XG4gICAgdXBkYXRlSGVyb0xpbmV1cChkYXRhLmhlcm9lcyk7XG59KTtcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdhdXRvY2hlc3Nfc2hvcF91cGRhdGVkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZygnQXV0b0NoZXNzIHNob3AgdXBkYXRlZDonLCBkYXRhKTtcbiAgICB1cGRhdGVTaG9wKGRhdGEuaXRlbXMpO1xufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3BoYXNlX2NoYW5nZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdBdXRvQ2hlc3MgcGhhc2UgY2hhbmdlZDonLCBkYXRhKTtcbiAgICBjb25zdCBwaGFzZU5hbWVzID0ge1xuICAgICAgICAncHJlcGFyYXRpb24nOiAn5YeG5aSH6Zi25q61JyxcbiAgICAgICAgJ2JhdHRsZSc6ICfmiJjmlpfpmLbmrrUnLFxuICAgICAgICAnc2hvcHBpbmcnOiAn6LSt54mp6Zi25q61JyxcbiAgICAgICAgJ3BsYW5uaW5nJzogJ+inhOWIkumYtuautSdcbiAgICB9O1xuICAgIHVwZGF0ZUdhbWVTdGF0dXMoeyBwaGFzZTogcGhhc2VOYW1lc1tkYXRhLnBoYXNlXSB8fCBkYXRhLnBoYXNlIH0pO1xufSk7XG4vLyDliJ3lp4vljJZcbmZ1bmN0aW9uIGluaXRpYWxpemVBdXRvQ2hlc3NQYW5lbCgpIHtcbiAgICAkLk1zZygnPT09IEluaXRpYWxpemluZyBBdXRvQ2hlc3MgUGFuZWwgPT09Jyk7XG4gICAgLy8g5bu26L+f5Yib5bu6VUlcbiAgICAkLlNjaGVkdWxlKDAuNSwgY3JlYXRlQXV0b0NoZXNzUGFuZWxVSSk7XG4gICAgLy8g6K6+572u5b+r5o236ZSuXG4gICAgJC5SZWdpc3RlcktleUJpbmQoJC5HZXRDb250ZXh0UGFuZWwoKSwgJ2tleV9mOScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSBGOTogUmVjcmVhdGluZyBBdXRvQ2hlc3MgUGFuZWwgVUkgPT09Jyk7XG4gICAgICAgIGNyZWF0ZUF1dG9DaGVzc1BhbmVsVUkoKTtcbiAgICB9KTtcbiAgICAkLlJlZ2lzdGVyS2V5QmluZCgkLkdldENvbnRleHRQYW5lbCgpLCAna2V5X2YxMScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJz09PSBGMTE6IFRvZ2dsZSBBdXRvQ2hlc3MgUGFuZWwgPT09Jyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdBdXRvQ2hlc3NQYW5lbENvbnRhaW5lcicpO1xuICAgICAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIudmlzaWJsZSA9ICFjb250YWluZXIudmlzaWJsZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8g5a+85Ye65YWo5bGA5Ye95pWwXG5nbG9iYWxUaGlzLkF1dG9DaGVzc1BhbmVsVGVzdCA9IHtcbiAgICBjcmVhdGVVSTogY3JlYXRlQXV0b0NoZXNzUGFuZWxVSSxcbiAgICB1cGRhdGVTdGF0dXM6IHVwZGF0ZUdhbWVTdGF0dXMsXG4gICAgdXBkYXRlSGVyb2VzOiB1cGRhdGVIZXJvTGluZXVwLFxuICAgIHVwZGF0ZVNob3A6IHVwZGF0ZVNob3Bcbn07XG4vLyDnq4vljbPmiafooYzliJ3lp4vljJZcbmluaXRpYWxpemVBdXRvQ2hlc3NQYW5lbCgpO1xuLy8g5a+85Ye6UmVhY3Tnu4Tku7bvvIjkv53mjIHlhbzlrrnmgKfvvIlcbmNvbnN0IEF1dG9DaGVzc1BhbmVsID0gKCkgPT4ge1xuICAgIHJldHVybiBudWxsOyAvLyDkvb/nlKjljp/nlJ9QYW5vcmFtYVxufTtcbmV4cG9ydCBkZWZhdWx0IEF1dG9DaGVzc1BhbmVsO1xuJC5Nc2coJz09PSBBdXRvQ2hlc3MgUGFuZWwgbW9kdWxlIGxvYWRlZCBjb21wbGV0ZWx5ID09PScpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9