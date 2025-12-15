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
/*!************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\inventory\index.tsx ***!
  \************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
/**
 * Inventory UI - 背包界面
 * 用于显示和管理玩家的棋子阵容
 * 支持拖拽部署棋子
 */
$.Msg('🎒 Inventory script is executing!');
Game.EmitSound('General.ButtonClick');
// ============================================================================
// 主题配置
// ============================================================================
const INVENTORY_THEME = {
    background: 'rgba(15, 23, 42, 0.95)',
    panelBg: 'rgba(33, 34, 31, 0.98)',
    slotBg: 'rgba(50, 50, 50, 0.8)',
    slotBgHover: 'rgba(70, 70, 70, 0.9)',
    slotBgDragging: 'rgba(100, 149, 237, 0.5)',
    borderColor: 'rgba(59, 130, 246, 0.6)',
    borderGold: 'rgba(255, 215, 0, 0.8)',
    textPrimary: '#ffffff',
    textSecondary: '#b8b8b8',
    textGold: '#ffd700',
    textRarity: {
        common: '#ffffff',
        uncommon: '#4caf50',
        rare: '#2196f3',
        epic: '#9c27b0',
        legendary: '#ff9800'
    }
};
// 稀有度颜色映射
const RARITY_COLORS = {
    '1': INVENTORY_THEME.textRarity.common,
    '2': INVENTORY_THEME.textRarity.uncommon,
    '3': INVENTORY_THEME.textRarity.rare,
    '4': INVENTORY_THEME.textRarity.epic,
    '5': INVENTORY_THEME.textRarity.legendary
};
// ============================================================================
// 全局状态
// ============================================================================
let rootPanel = null;
let containerPanel = null;
let slotsContainer = null;
let isVisible = false;
let inventorySlots = [];
let draggedPiece = null;
let draggedSlotIndex = -1;
let dragOverlay = null;
const MAX_SLOTS = 8; // 最大备战席位数
// ============================================================================
// 初始化
// ============================================================================
function initialize() {
    $.Msg('[Inventory] Initializing...');
    // 获取或创建根面板
    rootPanel = $('#InventoryRoot');
    if (!rootPanel) {
        rootPanel = $.CreatePanel('Panel', $.GetContextPanel(), 'InventoryRoot');
        rootPanel.AddClass('inventory_root');
    }
    // 创建容器
    createContainer();
    // 初始化插槽
    initializeSlots();
    // 注册事件监听
    registerEventHandlers();
    // 暴露全局API
    exposeGlobalAPI();
    $.Msg('[Inventory] ✅ Initialization complete');
}
// ============================================================================
// UI 创建
// ============================================================================
function createContainer() {
    containerPanel = $.CreatePanel('Panel', rootPanel, 'InventoryContainer');
    containerPanel.AddClass('inventory_container');
    // 设置样式
    containerPanel.style.width = '100%';
    containerPanel.style.height = '150px';
    containerPanel.style.horizontalAlign = 'center';
    containerPanel.style.verticalAlign = 'bottom';
    containerPanel.style.backgroundColor = INVENTORY_THEME.background;
    containerPanel.style.borderTop = `2px solid ${INVENTORY_THEME.borderColor}`;
    containerPanel.style.padding = '10px';
    containerPanel.style.flowChildren = 'down';
    // 创建标题
    const header = $.CreatePanel('Panel', containerPanel, 'InventoryHeader');
    header.style.width = '100%';
    header.style.height = '30px';
    header.style.flowChildren = 'right';
    header.style.horizontalAlign = 'center';
    const title = $.CreatePanel('Label', header, 'InventoryTitle');
    title.text = '棋子背包';
    title.style.fontSize = '20px';
    title.style.color = INVENTORY_THEME.textGold;
    title.style.fontWeight = 'bold';
    title.style.horizontalAlign = 'left';
    title.style.verticalAlign = 'center';
    title.style.marginLeft = '10px';
    const hint = $.CreatePanel('Label', header, 'InventoryHint');
    hint.text = '拖拽棋子到棋盘部署';
    hint.style.fontSize = '14px';
    hint.style.color = INVENTORY_THEME.textSecondary;
    hint.style.horizontalAlign = 'right';
    hint.style.verticalAlign = 'center';
    hint.style.marginRight = '10px';
    // 创建关闭按钮
    const closeBtn = $.CreatePanel('Button', header, 'InventoryCloseBtn');
    closeBtn.text = '✕';
    closeBtn.style.width = '30px';
    closeBtn.style.height = '30px';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.color = INVENTORY_THEME.textSecondary;
    closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    closeBtn.style.border = `1px solid ${INVENTORY_THEME.borderColor}`;
    closeBtn.style.borderRadius = '4px';
    closeBtn.style.horizontalAlign = 'right';
    closeBtn.style.verticalAlign = 'center';
    closeBtn.style.marginRight = '10px';
    closeBtn.style.textAlign = 'center';
    closeBtn.SetPanelEvent('onactivate', () => {
        $.Msg('[Inventory] 关闭按钮被点击');
        Game.EmitSound('General.ButtonClick');
        hide();
    });
    closeBtn.SetPanelEvent('onmouseover', () => {
        closeBtn.style.backgroundColor = 'rgba(239, 68, 68, 0.8)';
        closeBtn.style.color = '#ffffff';
    });
    closeBtn.SetPanelEvent('onmouseout', () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        closeBtn.style.color = INVENTORY_THEME.textSecondary;
    });
    // 创建插槽容器
    slotsContainer = $.CreatePanel('Panel', containerPanel, 'InventorySlotsContainer');
    slotsContainer.style.width = '100%';
    slotsContainer.style.height = '100px';
    slotsContainer.style.flowChildren = 'right';
    slotsContainer.style.horizontalAlign = 'center';
    slotsContainer.style.verticalAlign = 'center';
    slotsContainer.style.padding = '5px';
}
function initializeSlots() {
    if (!slotsContainer)
        return;
    inventorySlots = [];
    for (let i = 0; i < MAX_SLOTS; i++) {
        const slotPanel = createSlotPanel(i);
        const slot = {
            index: i,
            piece: null,
            panelId: slotPanel.id
        };
        inventorySlots.push(slot);
    }
    $.Msg(`[Inventory] Created ${MAX_SLOTS} slots`);
}
function createSlotPanel(index) {
    const slot = $.CreatePanel('Panel', slotsContainer, `InventorySlot_${index}`);
    slot.AddClass('inventory_slot');
    // 设置样式
    slot.style.width = '90px';
    slot.style.height = '90px';
    slot.style.margin = '5px';
    slot.style.backgroundColor = INVENTORY_THEME.slotBg;
    slot.style.border = `2px solid ${INVENTORY_THEME.borderColor}`;
    slot.style.borderRadius = '8px';
    slot.style.flowChildren = 'down';
    slot.style.horizontalAlign = 'center';
    slot.style.verticalAlign = 'center';
    // 创建空槽提示
    const emptyLabel = $.CreatePanel('Label', slot, `EmptyLabel_${index}`);
    emptyLabel.text = '+';
    emptyLabel.style.fontSize = '32px';
    emptyLabel.style.color = INVENTORY_THEME.textSecondary;
    emptyLabel.style.horizontalAlign = 'center';
    emptyLabel.style.verticalAlign = 'center';
    emptyLabel.style.opacity = '0.3';
    emptyLabel.hittest = false;
    return slot;
}
// ============================================================================
// 棋子显示
// ============================================================================
function updateSlot(slotIndex, piece) {
    const slot = inventorySlots[slotIndex];
    if (!slot)
        return;
    slot.piece = piece;
    const slotPanel = $(`#${slot.panelId}`);
    if (!slotPanel)
        return;
    // 清空槽位
    slotPanel.RemoveAndDeleteChildren();
    if (piece) {
        renderPieceInSlot(slotPanel, piece, slotIndex);
    }
    else {
        // 恢复空槽提示
        const emptyLabel = $.CreatePanel('Label', slotPanel, `EmptyLabel_${slotIndex}`);
        emptyLabel.text = '+';
        emptyLabel.style.fontSize = '32px';
        emptyLabel.style.color = INVENTORY_THEME.textSecondary;
        emptyLabel.style.horizontalAlign = 'center';
        emptyLabel.style.verticalAlign = 'center';
        emptyLabel.style.opacity = '0.3';
        emptyLabel.hittest = false;
    }
}
function renderPieceInSlot(slotPanel, piece, slotIndex) {
    // 创建图标容器
    const iconContainer = $.CreatePanel('Panel', slotPanel, `IconContainer_${slotIndex}`);
    iconContainer.style.width = '70px';
    iconContainer.style.height = '70px';
    iconContainer.style.horizontalAlign = 'center';
    iconContainer.style.verticalAlign = 'center';
    iconContainer.style.backgroundSize = 'contain';
    iconContainer.style.backgroundPosition = 'center';
    iconContainer.style.backgroundRepeat = 'no-repeat';
    // 设置英雄图标
    const heroIconPath = `file://{images}/heroes/${piece.unitName}.png`;
    iconContainer.style.backgroundImage = `url("${heroIconPath}")`;
    // 稀有度边框
    const rarityColor = RARITY_COLORS[piece.rarity.toString()] || INVENTORY_THEME.textRarity.common;
    slotPanel.style.border = `3px solid ${rarityColor}`;
    slotPanel.style.boxShadow = `0 0 10px ${rarityColor}`;
    // 费用标签
    const costLabel = $.CreatePanel('Label', slotPanel, `Cost_${slotIndex}`);
    costLabel.text = `${piece.cost}💰`;
    costLabel.style.fontSize = '14px';
    costLabel.style.color = INVENTORY_THEME.textGold;
    costLabel.style.fontWeight = 'bold';
    costLabel.style.horizontalAlign = 'left';
    costLabel.style.verticalAlign = 'top';
    costLabel.style.marginLeft = '5px';
    costLabel.style.marginTop = '5px';
    costLabel.style.textShadow = '1px 1px 2px #000000';
    costLabel.hittest = false;
    // 名称标签（悬停时显示）
    const nameLabel = $.CreatePanel('Label', slotPanel, `Name_${slotIndex}`);
    nameLabel.text = piece.displayName;
    nameLabel.style.fontSize = '12px';
    nameLabel.style.color = INVENTORY_THEME.textPrimary;
    nameLabel.style.horizontalAlign = 'center';
    nameLabel.style.verticalAlign = 'bottom';
    nameLabel.style.marginBottom = '2px';
    nameLabel.style.textShadow = '1px 1px 3px #000000';
    nameLabel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    nameLabel.style.padding = '2px 5px';
    nameLabel.style.borderRadius = '3px';
    nameLabel.hittest = false;
    // 设置拖拽事件
    setupDragEvents(slotPanel, piece, slotIndex);
    // 悬停效果
    slotPanel.SetPanelEvent('onmouseover', () => {
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBgHover;
        slotPanel.style.transform = 'scale(1.05)';
    });
    slotPanel.SetPanelEvent('onmouseout', () => {
        if (draggedSlotIndex !== slotIndex) {
            slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
            slotPanel.style.transform = 'scale(1.0)';
        }
    });
}
// ============================================================================
// 拖拽功能
// ============================================================================
function setupDragEvents(slotPanel, piece, slotIndex) {
    slotPanel.hittest = true;
    slotPanel.draggable = true;
    slotPanel.SetPanelEvent('ondragstart', (panelId, dragCallbacks) => {
        $.Msg(`[Inventory] Drag start: ${piece.displayName} from slot ${slotIndex}`);
        draggedPiece = piece;
        draggedSlotIndex = slotIndex;
        // 创建拖拽视觉反馈
        createDragOverlay(piece);
        // 高亮原始槽位
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBgDragging;
        slotPanel.style.opacity = '0.5';
        // 设置拖拽数据
        dragCallbacks.displayPanel = createDragDisplayPanel(piece);
        dragCallbacks.offsetX = 0;
        dragCallbacks.offsetY = 0;
        return true;
    });
    slotPanel.SetPanelEvent('ondragend', (panelId, draggedPanel) => {
        $.Msg(`[Inventory] Drag end: ${piece.displayName}`);
        // 恢复槽位样式
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
        slotPanel.style.opacity = '1.0';
        // 发送部署请求到服务端
        if (draggedPiece) {
            deployPieceAtCursor(draggedPiece, slotIndex);
        }
        // 清理
        if (dragOverlay) {
            dragOverlay.DeleteAsync(0);
            dragOverlay = null;
        }
        draggedPiece = null;
        draggedSlotIndex = -1;
    });
}
function createDragOverlay(piece) {
    // 创建全屏拖拽提示
    if (!dragOverlay) {
        dragOverlay = $.CreatePanel('Panel', $.GetContextPanel(), 'DragOverlay');
        dragOverlay.style.width = '100%';
        dragOverlay.style.height = '100%';
        dragOverlay.style.horizontalAlign = 'center';
        dragOverlay.style.verticalAlign = 'center';
        dragOverlay.style.zIndex = '10000';
        dragOverlay.hittest = false;
        const hint = $.CreatePanel('Label', dragOverlay, 'DragHint');
        hint.text = '松开鼠标部署棋子';
        hint.style.fontSize = '24px';
        hint.style.color = INVENTORY_THEME.textGold;
        hint.style.horizontalAlign = 'center';
        hint.style.verticalAlign = 'center';
        hint.style.textShadow = '2px 2px 4px #000000';
        hint.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        hint.style.padding = '10px 20px';
        hint.style.borderRadius = '8px';
    }
}
function createDragDisplayPanel(piece) {
    const display = $.CreatePanel('Panel', $.GetContextPanel(), 'DragDisplay');
    display.style.width = '80px';
    display.style.height = '80px';
    display.style.backgroundSize = 'contain';
    display.style.backgroundPosition = 'center';
    display.style.backgroundRepeat = 'no-repeat';
    display.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    display.style.border = `2px solid ${INVENTORY_THEME.borderGold}`;
    display.style.borderRadius = '8px';
    const heroIconPath = `file://{images}/heroes/${piece.unitName}.png`;
    display.style.backgroundImage = `url("${heroIconPath}")`;
    return display;
}
function deployPieceAtCursor(piece, slotIndex) {
    $.Msg(`[Inventory] 🎯 Deploying piece: ${piece.displayName} from slot ${slotIndex}`);
    // 获取鼠标在游戏世界中的位置
    const cursorPos = GameUI.GetCursorPosition();
    $.Msg(`[Inventory] Cursor position: (${cursorPos[0]}, ${cursorPos[1]})`);
    // 获取本地玩家ID（单机模式下通常是0）
    const localPlayerId = Players.GetLocalPlayer();
    // 发送部署请求到服务端
    GameEvents.SendCustomGameEventToServer('inventory_deploy_piece', {
        playerId: localPlayerId,
        pieceId: piece.id,
        unitName: piece.unitName,
        slotIndex: slotIndex,
        cursorX: cursorPos[0],
        cursorY: cursorPos[1]
    });
    // 播放音效
    Game.EmitSound('General.CastStart');
}
// ============================================================================
// 显示/隐藏
// ============================================================================
function show() {
    if (!rootPanel) {
        $.Msg('[Inventory] ⚠️ Root panel not initialized');
        return;
    }
    rootPanel.style.visibility = 'visible';
    isVisible = true;
    $.Msg('[Inventory] ✅ Inventory shown');
    $.Msg(`[Inventory] 当前玩家ID: ${Players.GetLocalPlayer()}`);
    $.Msg(`[Inventory] 槽位数量: ${inventorySlots.length}`);
    // 请求最新数据
    requestInventoryData();
}
function hide() {
    if (!rootPanel)
        return;
    rootPanel.style.visibility = 'collapse';
    isVisible = false;
    $.Msg('[Inventory] Inventory hidden');
}
function toggle() {
    if (isVisible) {
        hide();
    }
    else {
        show();
    }
}
// ============================================================================
// 数据更新
// ============================================================================
function requestInventoryData() {
    $.Msg('[Inventory] Requesting inventory data from server...');
    GameEvents.SendCustomGameEventToServer('request_inventory_data', {
        playerId: Players.GetLocalPlayer()
    });
}
// Helper to convert Lua table (object) to JS array
function convertToArray(obj) {
    $.Msg(`[Inventory] convertToArray - 输入类型: ${typeof obj}`);
    $.Msg(`[Inventory] convertToArray - 是数组: ${Array.isArray(obj)}`);
    if (Array.isArray(obj)) {
        $.Msg(`[Inventory] convertToArray - 已经是数组，长度: ${obj.length}`);
        return obj;
    }
    if (typeof obj === 'object' && obj !== null) {
        const arr = [];
        let count = 0;
        $.Msg(`[Inventory] convertToArray - 开始遍历对象...`);
        for (const key in obj) {
            $.Msg(`[Inventory] convertToArray - key: ${key}, value: ${JSON.stringify(obj[key])}`);
            if (obj.hasOwnProperty(key)) {
                arr.push(obj[key]);
                count++;
            }
        }
        $.Msg(`[Inventory] convertToArray - 遍历完成，找到 ${count} 个元素`);
        $.Msg(`[Inventory] convertToArray - 结果数组长度: ${arr.length}`);
        return arr;
    }
    $.Msg(`[Inventory] convertToArray - 无法转换，返回空数组`);
    return [];
}
function updateInventoryData(data) {
    $.Msg('[Inventory] ========== 更新背包数据 ==========');
    $.Msg(`[Inventory] 数据对象: ${JSON.stringify(Object.keys(data))}`);
    $.Msg(`[Inventory] data.pieces 类型: ${typeof data.pieces}`);
    $.Msg(`[Inventory] data.pieces 是数组: ${Array.isArray(data.pieces)}`);
    if (!data.pieces) {
        $.Msg('[Inventory] ⚠️ data.pieces is null or undefined');
        $.Msg(`[Inventory] 完整数据: ${JSON.stringify(data)}`);
        return;
    }
    // 转换 Lua 表为 JavaScript 数组
    const piecesArray = convertToArray(data.pieces);
    $.Msg(`[Inventory] 转换后的数组长度: ${piecesArray.length}`);
    $.Msg(`[Inventory] 收到 ${piecesArray.length} 个棋子`);
    // 清空所有槽位
    for (let i = 0; i < MAX_SLOTS; i++) {
        updateSlot(i, null);
    }
    // 更新棋子
    piecesArray.forEach((piece, index) => {
        if (index < MAX_SLOTS) {
            $.Msg(`[Inventory] 更新槽位 ${index}: ${piece.displayName} (${piece.unitName})`);
            updateSlot(index, piece);
        }
    });
    $.Msg('[Inventory] ========== 背包更新完成 ==========');
}
// ============================================================================
// 事件处理
// ============================================================================
function registerEventHandlers() {
    $.Msg('[Inventory] Registering event handlers...');
    // 接收服务端发送的背包数据
    GameEvents.Subscribe('update_inventory_data', (data) => {
        $.Msg('[Inventory] Received update_inventory_data event');
        updateInventoryData(data);
    });
    // 部署反馈
    GameEvents.Subscribe('deployment_feedback', (data) => {
        $.Msg(`[Inventory] Deployment feedback: ${data.success ? '✅' : '❌'} ${data.message}`);
        if (data.success) {
            Game.EmitSound('General.CoinsBig');
        }
        else {
            Game.EmitSound('General.Cancel');
        }
        // TODO: 显示UI提示
    });
    // 快捷键切换背包
    GameEvents.Subscribe('toggle_inventory', () => {
        $.Msg('[Inventory] Received toggle_inventory event');
        toggle();
    });
    // 显示背包
    GameEvents.Subscribe('show_inventory', () => {
        $.Msg('[Inventory] Received show_inventory event');
        show();
    });
    // 隐藏背包
    GameEvents.Subscribe('hide_inventory', () => {
        $.Msg('[Inventory] Received hide_inventory event');
        hide();
    });
    $.Msg('[Inventory] ✅ Event handlers registered');
}
// ============================================================================
// 全局API
// ============================================================================
function exposeGlobalAPI() {
    globalThis.Inventory = {
        show: show,
        hide: hide,
        toggle: toggle,
        update: updateInventoryData,
        requestData: requestInventoryData
    };
    $.Msg('[Inventory] ✅ Global API exposed: Inventory.show(), .hide(), .toggle()');
}
// ============================================================================
// 启动
// ============================================================================
// 等待DOM加载完成后初始化
$.Schedule(0.1, () => {
    try {
        initialize();
    }
    catch (error) {
        $.Msg(`[Inventory] ❌ Initialization error: ${error}`);
    }
});
$.Msg('[Inventory] Script loaded successfully');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBb0IsZUFBZTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxDQUFDLHlCQUF5QixNQUFNLElBQUksbUJBQW1CLEdBQUcsZUFBZTtBQUNyRjtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsQ0FBQyx5Q0FBeUMsMEJBQTBCLEVBQUUsYUFBYTtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTCxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDLDRDQUE0QyxNQUFNO0FBQzNEO0FBQ0EsQ0FBQztBQUNELENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgdmFyIFwiJFwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vRDpcXFN0ZWFtQXBwXFxzdGVhbWFwcHNcXGNvbW1vblxcZG90YSAyIGJldGFcXGNvbnRlbnRcXGRvdGFfYWRkb25zXFxmdXNpb25cXHBhbm9yYW1hXFxzcmNcXGludmVudG9yeVxcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gQHRzLW5vY2hlY2tcbi8qKlxuICogSW52ZW50b3J5IFVJIC0g6IOM5YyF55WM6Z2iXG4gKiDnlKjkuo7mmL7npLrlkoznrqHnkIbnjqnlrrbnmoTmo4vlrZDpmLXlrrlcbiAqIOaUr+aMgeaLluaLvemDqOe9suaji+WtkFxuICovXG4kLk1zZygn8J+OkiBJbnZlbnRvcnkgc2NyaXB0IGlzIGV4ZWN1dGluZyEnKTtcbkdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDkuLvpopjphY3nva5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNvbnN0IElOVkVOVE9SWV9USEVNRSA9IHtcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwgMjMsIDQyLCAwLjk1KScsXG4gICAgcGFuZWxCZzogJ3JnYmEoMzMsIDM0LCAzMSwgMC45OCknLFxuICAgIHNsb3RCZzogJ3JnYmEoNTAsIDUwLCA1MCwgMC44KScsXG4gICAgc2xvdEJnSG92ZXI6ICdyZ2JhKDcwLCA3MCwgNzAsIDAuOSknLFxuICAgIHNsb3RCZ0RyYWdnaW5nOiAncmdiYSgxMDAsIDE0OSwgMjM3LCAwLjUpJyxcbiAgICBib3JkZXJDb2xvcjogJ3JnYmEoNTksIDEzMCwgMjQ2LCAwLjYpJyxcbiAgICBib3JkZXJHb2xkOiAncmdiYSgyNTUsIDIxNSwgMCwgMC44KScsXG4gICAgdGV4dFByaW1hcnk6ICcjZmZmZmZmJyxcbiAgICB0ZXh0U2Vjb25kYXJ5OiAnI2I4YjhiOCcsXG4gICAgdGV4dEdvbGQ6ICcjZmZkNzAwJyxcbiAgICB0ZXh0UmFyaXR5OiB7XG4gICAgICAgIGNvbW1vbjogJyNmZmZmZmYnLFxuICAgICAgICB1bmNvbW1vbjogJyM0Y2FmNTAnLFxuICAgICAgICByYXJlOiAnIzIxOTZmMycsXG4gICAgICAgIGVwaWM6ICcjOWMyN2IwJyxcbiAgICAgICAgbGVnZW5kYXJ5OiAnI2ZmOTgwMCdcbiAgICB9XG59O1xuLy8g56iA5pyJ5bqm6aKc6Imy5pig5bCEXG5jb25zdCBSQVJJVFlfQ09MT1JTID0ge1xuICAgICcxJzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkuY29tbW9uLFxuICAgICcyJzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkudW5jb21tb24sXG4gICAgJzMnOiBJTlZFTlRPUllfVEhFTUUudGV4dFJhcml0eS5yYXJlLFxuICAgICc0JzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkuZXBpYyxcbiAgICAnNSc6IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LmxlZ2VuZGFyeVxufTtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWFqOWxgOeKtuaAgVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHJvb3RQYW5lbCA9IG51bGw7XG5sZXQgY29udGFpbmVyUGFuZWwgPSBudWxsO1xubGV0IHNsb3RzQ29udGFpbmVyID0gbnVsbDtcbmxldCBpc1Zpc2libGUgPSBmYWxzZTtcbmxldCBpbnZlbnRvcnlTbG90cyA9IFtdO1xubGV0IGRyYWdnZWRQaWVjZSA9IG51bGw7XG5sZXQgZHJhZ2dlZFNsb3RJbmRleCA9IC0xO1xubGV0IGRyYWdPdmVybGF5ID0gbnVsbDtcbmNvbnN0IE1BWF9TTE9UUyA9IDg7IC8vIOacgOWkp+Wkh+aImOW4reS9jeaVsFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5Yid5aeL5YyWXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSBJbml0aWFsaXppbmcuLi4nKTtcbiAgICAvLyDojrflj5bmiJbliJvlu7rmoLnpnaLmnb9cbiAgICByb290UGFuZWwgPSAkKCcjSW52ZW50b3J5Um9vdCcpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgIHJvb3RQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgJC5HZXRDb250ZXh0UGFuZWwoKSwgJ0ludmVudG9yeVJvb3QnKTtcbiAgICAgICAgcm9vdFBhbmVsLkFkZENsYXNzKCdpbnZlbnRvcnlfcm9vdCcpO1xuICAgIH1cbiAgICAvLyDliJvlu7rlrrnlmahcbiAgICBjcmVhdGVDb250YWluZXIoKTtcbiAgICAvLyDliJ3lp4vljJbmj5Lmp71cbiAgICBpbml0aWFsaXplU2xvdHMoKTtcbiAgICAvLyDms6jlhozkuovku7bnm5HlkKxcbiAgICByZWdpc3RlckV2ZW50SGFuZGxlcnMoKTtcbiAgICAvLyDmmrTpnLLlhajlsYBBUElcbiAgICBleHBvc2VHbG9iYWxBUEkoKTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyFIEluaXRpYWxpemF0aW9uIGNvbXBsZXRlJyk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBVSSDliJvlu7pcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgICBjb250YWluZXJQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnSW52ZW50b3J5Q29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyUGFuZWwuQWRkQ2xhc3MoJ2ludmVudG9yeV9jb250YWluZXInKTtcbiAgICAvLyDorr7nva7moLflvI9cbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTUwcHgnO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuYmFja2dyb3VuZDtcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5ib3JkZXJUb3AgPSBgMnB4IHNvbGlkICR7SU5WRU5UT1JZX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g5Yib5bu65qCH6aKYXG4gICAgY29uc3QgaGVhZGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXJQYW5lbCwgJ0ludmVudG9yeUhlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGhlYWRlci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5VGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+aji+WtkOiDjOWMhSc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dEdvbGQ7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgdGl0bGUuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTBweCc7XG4gICAgY29uc3QgaGludCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5SGludCcpO1xuICAgIGhpbnQudGV4dCA9ICfmi5bmi73mo4vlrZDliLDmo4vnm5jpg6jnvbInO1xuICAgIGhpbnQuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgaGludC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGhpbnQuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICBoaW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoaW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIC8vIOWIm+W7uuWFs+mXreaMiemSrlxuICAgIGNvbnN0IGNsb3NlQnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgaGVhZGVyLCAnSW52ZW50b3J5Q2xvc2VCdG4nKTtcbiAgICBjbG9zZUJ0bi50ZXh0ID0gJ+KclSc7XG4gICAgY2xvc2VCdG4uc3R5bGUud2lkdGggPSAnMzBweCc7XG4gICAgY2xvc2VCdG4uc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgY2xvc2VCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuYm9yZGVyID0gYDFweCBzb2xpZCAke0lOVkVOVE9SWV9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIGNsb3NlQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc0cHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgY2xvc2VCdG4uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDlhbPpl63mjInpkq7ooqvngrnlh7snKTtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyMzksIDY4LCA2OCwgMC44KSc7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmNvbG9yID0gJyNmZmZmZmYnO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknO1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIH0pO1xuICAgIC8vIOWIm+W7uuaPkuanveWuueWZqFxuICAgIHNsb3RzQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXJQYW5lbCwgJ0ludmVudG9yeVNsb3RzQ29udGFpbmVyJyk7XG4gICAgc2xvdHNDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc2xvdHNDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMHB4JztcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gJzVweCc7XG59XG5mdW5jdGlvbiBpbml0aWFsaXplU2xvdHMoKSB7XG4gICAgaWYgKCFzbG90c0NvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGludmVudG9yeVNsb3RzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfU0xPVFM7IGkrKykge1xuICAgICAgICBjb25zdCBzbG90UGFuZWwgPSBjcmVhdGVTbG90UGFuZWwoaSk7XG4gICAgICAgIGNvbnN0IHNsb3QgPSB7XG4gICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgIHBpZWNlOiBudWxsLFxuICAgICAgICAgICAgcGFuZWxJZDogc2xvdFBhbmVsLmlkXG4gICAgICAgIH07XG4gICAgICAgIGludmVudG9yeVNsb3RzLnB1c2goc2xvdCk7XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSBDcmVhdGVkICR7TUFYX1NMT1RTfSBzbG90c2ApO1xufVxuZnVuY3Rpb24gY3JlYXRlU2xvdFBhbmVsKGluZGV4KSB7XG4gICAgY29uc3Qgc2xvdCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc2xvdHNDb250YWluZXIsIGBJbnZlbnRvcnlTbG90XyR7aW5kZXh9YCk7XG4gICAgc2xvdC5BZGRDbGFzcygnaW52ZW50b3J5X3Nsb3QnKTtcbiAgICAvLyDorr7nva7moLflvI9cbiAgICBzbG90LnN0eWxlLndpZHRoID0gJzkwcHgnO1xuICAgIHNsb3Quc3R5bGUuaGVpZ2h0ID0gJzkwcHgnO1xuICAgIHNsb3Quc3R5bGUubWFyZ2luID0gJzVweCc7XG4gICAgc2xvdC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnO1xuICAgIHNsb3Quc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke0lOVkVOVE9SWV9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIHNsb3Quc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgc2xvdC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgc2xvdC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBzbG90LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDliJvlu7rnqbrmp73mj5DnpLpcbiAgICBjb25zdCBlbXB0eUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90LCBgRW1wdHlMYWJlbF8ke2luZGV4fWApO1xuICAgIGVtcHR5TGFiZWwudGV4dCA9ICcrJztcbiAgICBlbXB0eUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzMycHgnO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBlbXB0eUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGVtcHR5TGFiZWwuaGl0dGVzdCA9IGZhbHNlO1xuICAgIHJldHVybiBzbG90O1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5qOL5a2Q5pi+56S6XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiB1cGRhdGVTbG90KHNsb3RJbmRleCwgcGllY2UpIHtcbiAgICBjb25zdCBzbG90ID0gaW52ZW50b3J5U2xvdHNbc2xvdEluZGV4XTtcbiAgICBpZiAoIXNsb3QpXG4gICAgICAgIHJldHVybjtcbiAgICBzbG90LnBpZWNlID0gcGllY2U7XG4gICAgY29uc3Qgc2xvdFBhbmVsID0gJChgIyR7c2xvdC5wYW5lbElkfWApO1xuICAgIGlmICghc2xvdFBhbmVsKVxuICAgICAgICByZXR1cm47XG4gICAgLy8g5riF56m65qe95L2NXG4gICAgc2xvdFBhbmVsLlJlbW92ZUFuZERlbGV0ZUNoaWxkcmVuKCk7XG4gICAgaWYgKHBpZWNlKSB7XG4gICAgICAgIHJlbmRlclBpZWNlSW5TbG90KHNsb3RQYW5lbCwgcGllY2UsIHNsb3RJbmRleCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyDmgaLlpI3nqbrmp73mj5DnpLpcbiAgICAgICAgY29uc3QgZW1wdHlMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc2xvdFBhbmVsLCBgRW1wdHlMYWJlbF8ke3Nsb3RJbmRleH1gKTtcbiAgICAgICAgZW1wdHlMYWJlbC50ZXh0ID0gJysnO1xuICAgICAgICBlbXB0eUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzMycHgnO1xuICAgICAgICBlbXB0eUxhYmVsLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBlbXB0eUxhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC4zJztcbiAgICAgICAgZW1wdHlMYWJlbC5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyUGllY2VJblNsb3Qoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KSB7XG4gICAgLy8g5Yib5bu65Zu+5qCH5a655ZmoXG4gICAgY29uc3QgaWNvbkNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc2xvdFBhbmVsLCBgSWNvbkNvbnRhaW5lcl8ke3Nsb3RJbmRleH1gKTtcbiAgICBpY29uQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzcwcHgnO1xuICAgIGljb25Db250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzcwcHgnO1xuICAgIGljb25Db250YWluZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaWNvbkNvbnRhaW5lci5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaWNvbkNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb250YWluJztcbiAgICBpY29uQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgIGljb25Db250YWluZXIuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgIC8vIOiuvue9ruiLsembhOWbvuagh1xuICAgIGNvbnN0IGhlcm9JY29uUGF0aCA9IGBmaWxlOi8ve2ltYWdlc30vaGVyb2VzLyR7cGllY2UudW5pdE5hbWV9LnBuZ2A7XG4gICAgaWNvbkNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtoZXJvSWNvblBhdGh9XCIpYDtcbiAgICAvLyDnqIDmnInluqbovrnmoYZcbiAgICBjb25zdCByYXJpdHlDb2xvciA9IFJBUklUWV9DT0xPUlNbcGllY2UucmFyaXR5LnRvU3RyaW5nKCldIHx8IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LmNvbW1vbjtcbiAgICBzbG90UGFuZWwuc3R5bGUuYm9yZGVyID0gYDNweCBzb2xpZCAke3Jhcml0eUNvbG9yfWA7XG4gICAgc2xvdFBhbmVsLnN0eWxlLmJveFNoYWRvdyA9IGAwIDAgMTBweCAke3Jhcml0eUNvbG9yfWA7XG4gICAgLy8g6LS555So5qCH562+XG4gICAgY29uc3QgY29zdExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90UGFuZWwsIGBDb3N0XyR7c2xvdEluZGV4fWApO1xuICAgIGNvc3RMYWJlbC50ZXh0ID0gYCR7cGllY2UuY29zdH3wn5KwYDtcbiAgICBjb3N0TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgY29zdExhYmVsLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRHb2xkO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgY29zdExhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJztcbiAgICBjb3N0TGFiZWwuc3R5bGUubWFyZ2luTGVmdCA9ICc1cHgnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5tYXJnaW5Ub3AgPSAnNXB4JztcbiAgICBjb3N0TGFiZWwuc3R5bGUudGV4dFNoYWRvdyA9ICcxcHggMXB4IDJweCAjMDAwMDAwJztcbiAgICBjb3N0TGFiZWwuaGl0dGVzdCA9IGZhbHNlO1xuICAgIC8vIOWQjeensOagh+etvu+8iOaCrOWBnOaXtuaYvuekuu+8iVxuICAgIGNvbnN0IG5hbWVMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc2xvdFBhbmVsLCBgTmFtZV8ke3Nsb3RJbmRleH1gKTtcbiAgICBuYW1lTGFiZWwudGV4dCA9IHBpZWNlLmRpc3BsYXlOYW1lO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBuYW1lTGFiZWwuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgbmFtZUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG5hbWVMYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2JvdHRvbSc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcycHgnO1xuICAgIG5hbWVMYWJlbC5zdHlsZS50ZXh0U2hhZG93ID0gJzFweCAxcHggM3B4ICMwMDAwMDAnO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjcpJztcbiAgICBuYW1lTGFiZWwuc3R5bGUucGFkZGluZyA9ICcycHggNXB4JztcbiAgICBuYW1lTGFiZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzNweCc7XG4gICAgbmFtZUxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICAvLyDorr7nva7mi5bmi73kuovku7ZcbiAgICBzZXR1cERyYWdFdmVudHMoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KTtcbiAgICAvLyDmgqzlgZzmlYjmnpxcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25tb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnSG92ZXI7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wNSknO1xuICAgIH0pO1xuICAgIHNsb3RQYW5lbC5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBpZiAoZHJhZ2dlZFNsb3RJbmRleCAhPT0gc2xvdEluZGV4KSB7XG4gICAgICAgICAgICBzbG90UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICAgICAgICAgIHNsb3RQYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wKSc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOaLluaLveWKn+iDvVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gc2V0dXBEcmFnRXZlbnRzKHNsb3RQYW5lbCwgcGllY2UsIHNsb3RJbmRleCkge1xuICAgIHNsb3RQYW5lbC5oaXR0ZXN0ID0gdHJ1ZTtcbiAgICBzbG90UGFuZWwuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25kcmFnc3RhcnQnLCAocGFuZWxJZCwgZHJhZ0NhbGxiYWNrcykgPT4ge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gRHJhZyBzdGFydDogJHtwaWVjZS5kaXNwbGF5TmFtZX0gZnJvbSBzbG90ICR7c2xvdEluZGV4fWApO1xuICAgICAgICBkcmFnZ2VkUGllY2UgPSBwaWVjZTtcbiAgICAgICAgZHJhZ2dlZFNsb3RJbmRleCA9IHNsb3RJbmRleDtcbiAgICAgICAgLy8g5Yib5bu65ouW5ou96KeG6KeJ5Y+N6aaIXG4gICAgICAgIGNyZWF0ZURyYWdPdmVybGF5KHBpZWNlKTtcbiAgICAgICAgLy8g6auY5Lqu5Y6f5aeL5qe95L2NXG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnRHJhZ2dpbmc7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgICAgIC8vIOiuvue9ruaLluaLveaVsOaNrlxuICAgICAgICBkcmFnQ2FsbGJhY2tzLmRpc3BsYXlQYW5lbCA9IGNyZWF0ZURyYWdEaXNwbGF5UGFuZWwocGllY2UpO1xuICAgICAgICBkcmFnQ2FsbGJhY2tzLm9mZnNldFggPSAwO1xuICAgICAgICBkcmFnQ2FsbGJhY2tzLm9mZnNldFkgPSAwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25kcmFnZW5kJywgKHBhbmVsSWQsIGRyYWdnZWRQYW5lbCkgPT4ge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gRHJhZyBlbmQ6ICR7cGllY2UuZGlzcGxheU5hbWV9YCk7XG4gICAgICAgIC8vIOaBouWkjeanveS9jeagt+W8j1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICAgICAgc2xvdFBhbmVsLnN0eWxlLm9wYWNpdHkgPSAnMS4wJztcbiAgICAgICAgLy8g5Y+R6YCB6YOo572y6K+35rGC5Yiw5pyN5Yqh56uvXG4gICAgICAgIGlmIChkcmFnZ2VkUGllY2UpIHtcbiAgICAgICAgICAgIGRlcGxveVBpZWNlQXRDdXJzb3IoZHJhZ2dlZFBpZWNlLCBzbG90SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOa4heeQhlxuICAgICAgICBpZiAoZHJhZ092ZXJsYXkpIHtcbiAgICAgICAgICAgIGRyYWdPdmVybGF5LkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAgICAgZHJhZ092ZXJsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRyYWdnZWRQaWVjZSA9IG51bGw7XG4gICAgICAgIGRyYWdnZWRTbG90SW5kZXggPSAtMTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZURyYWdPdmVybGF5KHBpZWNlKSB7XG4gICAgLy8g5Yib5bu65YWo5bGP5ouW5ou95o+Q56S6XG4gICAgaWYgKCFkcmFnT3ZlcmxheSkge1xuICAgICAgICBkcmFnT3ZlcmxheSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgJC5HZXRDb250ZXh0UGFuZWwoKSwgJ0RyYWdPdmVybGF5Jyk7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLnpJbmRleCA9ICcxMDAwMCc7XG4gICAgICAgIGRyYWdPdmVybGF5LmhpdHRlc3QgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgaGludCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgZHJhZ092ZXJsYXksICdEcmFnSGludCcpO1xuICAgICAgICBoaW50LnRleHQgPSAn5p2+5byA6byg5qCH6YOo572y5qOL5a2QJztcbiAgICAgICAgaGludC5zdHlsZS5mb250U2l6ZSA9ICcyNHB4JztcbiAgICAgICAgaGludC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0R29sZDtcbiAgICAgICAgaGludC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgaGludC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGhpbnQuc3R5bGUudGV4dFNoYWRvdyA9ICcycHggMnB4IDRweCAjMDAwMDAwJztcbiAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICAgICAgaGludC5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG4gICAgICAgIGhpbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlRHJhZ0Rpc3BsYXlQYW5lbChwaWVjZSkge1xuICAgIGNvbnN0IGRpc3BsYXkgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsICQuR2V0Q29udGV4dFBhbmVsKCksICdEcmFnRGlzcGxheScpO1xuICAgIGRpc3BsYXkuc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnODBweCc7XG4gICAgZGlzcGxheS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb250YWluJztcbiAgICBkaXNwbGF5LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXInO1xuICAgIGRpc3BsYXkuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgIGRpc3BsYXkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC43KSc7XG4gICAgZGlzcGxheS5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7SU5WRU5UT1JZX1RIRU1FLmJvcmRlckdvbGR9YDtcbiAgICBkaXNwbGF5LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGNvbnN0IGhlcm9JY29uUGF0aCA9IGBmaWxlOi8ve2ltYWdlc30vaGVyb2VzLyR7cGllY2UudW5pdE5hbWV9LnBuZ2A7XG4gICAgZGlzcGxheS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtoZXJvSWNvblBhdGh9XCIpYDtcbiAgICByZXR1cm4gZGlzcGxheTtcbn1cbmZ1bmN0aW9uIGRlcGxveVBpZWNlQXRDdXJzb3IocGllY2UsIHNsb3RJbmRleCkge1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIERlcGxveWluZyBwaWVjZTogJHtwaWVjZS5kaXNwbGF5TmFtZX0gZnJvbSBzbG90ICR7c2xvdEluZGV4fWApO1xuICAgIC8vIOiOt+WPlum8oOagh+WcqOa4uOaIj+S4lueVjOS4reeahOS9jee9rlxuICAgIGNvbnN0IGN1cnNvclBvcyA9IEdhbWVVSS5HZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSBDdXJzb3IgcG9zaXRpb246ICgke2N1cnNvclBvc1swXX0sICR7Y3Vyc29yUG9zWzFdfSlgKTtcbiAgICAvLyDojrflj5bmnKzlnLDnjqnlrrZJRO+8iOWNleacuuaooeW8j+S4i+mAmuW4uOaYrzDvvIlcbiAgICBjb25zdCBsb2NhbFBsYXllcklkID0gUGxheWVycy5HZXRMb2NhbFBsYXllcigpO1xuICAgIC8vIOWPkemAgemDqOe9suivt+axguWIsOacjeWKoeerr1xuICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdpbnZlbnRvcnlfZGVwbG95X3BpZWNlJywge1xuICAgICAgICBwbGF5ZXJJZDogbG9jYWxQbGF5ZXJJZCxcbiAgICAgICAgcGllY2VJZDogcGllY2UuaWQsXG4gICAgICAgIHVuaXROYW1lOiBwaWVjZS51bml0TmFtZSxcbiAgICAgICAgc2xvdEluZGV4OiBzbG90SW5kZXgsXG4gICAgICAgIGN1cnNvclg6IGN1cnNvclBvc1swXSxcbiAgICAgICAgY3Vyc29yWTogY3Vyc29yUG9zWzFdXG4gICAgfSk7XG4gICAgLy8g5pKt5pS+6Z+z5pWIXG4gICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ2FzdFN0YXJ0Jyk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDmmL7npLov6ZqQ6JePXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBzaG93KCkge1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDimqDvuI8gUm9vdCBwYW5lbCBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByb290UGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICBpc1Zpc2libGUgPSB0cnVlO1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSDinIUgSW52ZW50b3J5IHNob3duJyk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOW9k+WJjeeOqeWutklEOiAke1BsYXllcnMuR2V0TG9jYWxQbGF5ZXIoKX1gKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g5qe95L2N5pWw6YePOiAke2ludmVudG9yeVNsb3RzLmxlbmd0aH1gKTtcbiAgICAvLyDor7fmsYLmnIDmlrDmlbDmja5cbiAgICByZXF1ZXN0SW52ZW50b3J5RGF0YSgpO1xufVxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBpZiAoIXJvb3RQYW5lbClcbiAgICAgICAgcmV0dXJuO1xuICAgIHJvb3RQYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICBpc1Zpc2libGUgPSBmYWxzZTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gSW52ZW50b3J5IGhpZGRlbicpO1xufVxuZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2hvdygpO1xuICAgIH1cbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOaVsOaNruabtOaWsFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gcmVxdWVzdEludmVudG9yeURhdGEoKSB7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlcXVlc3RpbmcgaW52ZW50b3J5IGRhdGEgZnJvbSBzZXJ2ZXIuLi4nKTtcbiAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncmVxdWVzdF9pbnZlbnRvcnlfZGF0YScsIHtcbiAgICAgICAgcGxheWVySWQ6IFBsYXllcnMuR2V0TG9jYWxQbGF5ZXIoKVxuICAgIH0pO1xufVxuLy8gSGVscGVyIHRvIGNvbnZlcnQgTHVhIHRhYmxlIChvYmplY3QpIHRvIEpTIGFycmF5XG5mdW5jdGlvbiBjb252ZXJ0VG9BcnJheShvYmopIHtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDovpPlhaXnsbvlnos6ICR7dHlwZW9mIG9ian1gKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDmmK/mlbDnu4Q6ICR7QXJyYXkuaXNBcnJheShvYmopfWApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g5bey57uP5piv5pWw57uE77yM6ZW/5bqmOiAke29iai5sZW5ndGh9YCk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOW8gOWni+mBjeWOhuWvueixoS4uLmApO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIGtleTogJHtrZXl9LCB2YWx1ZTogJHtKU09OLnN0cmluZ2lmeShvYmpba2V5XSl9YCk7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaChvYmpba2V5XSk7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDpgY3ljoblrozmiJDvvIzmib7liLAgJHtjb3VudH0g5Liq5YWD57SgYCk7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOe7k+aenOaVsOe7hOmVv+W6pjogJHthcnIubGVuZ3RofWApO1xuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cbiAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDml6Dms5XovazmjaLvvIzov5Tlm57nqbrmlbDnu4RgKTtcbiAgICByZXR1cm4gW107XG59XG5mdW5jdGlvbiB1cGRhdGVJbnZlbnRvcnlEYXRhKGRhdGEpIHtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gPT09PT09PT09PSDmm7TmlrDog4zljIXmlbDmja4gPT09PT09PT09PScpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDmlbDmja7lr7nosaE6ICR7SlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoZGF0YSkpfWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSBkYXRhLnBpZWNlcyDnsbvlnos6ICR7dHlwZW9mIGRhdGEucGllY2VzfWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSBkYXRhLnBpZWNlcyDmmK/mlbDnu4Q6ICR7QXJyYXkuaXNBcnJheShkYXRhLnBpZWNlcyl9YCk7XG4gICAgaWYgKCFkYXRhLnBpZWNlcykge1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0g4pqg77iPIGRhdGEucGllY2VzIGlzIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDlrozmlbTmlbDmja46ICR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g6L2s5o2iIEx1YSDooajkuLogSmF2YVNjcmlwdCDmlbDnu4RcbiAgICBjb25zdCBwaWVjZXNBcnJheSA9IGNvbnZlcnRUb0FycmF5KGRhdGEucGllY2VzKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g6L2s5o2i5ZCO55qE5pWw57uE6ZW/5bqmOiAke3BpZWNlc0FycmF5Lmxlbmd0aH1gKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g5pS25YiwICR7cGllY2VzQXJyYXkubGVuZ3RofSDkuKrmo4vlrZBgKTtcbiAgICAvLyDmuIXnqbrmiYDmnInmp73kvY1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9TTE9UUzsgaSsrKSB7XG4gICAgICAgIHVwZGF0ZVNsb3QoaSwgbnVsbCk7XG4gICAgfVxuICAgIC8vIOabtOaWsOaji+WtkFxuICAgIHBpZWNlc0FycmF5LmZvckVhY2goKHBpZWNlLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPCBNQVhfU0xPVFMpIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDmm7TmlrDmp73kvY0gJHtpbmRleH06ICR7cGllY2UuZGlzcGxheU5hbWV9ICgke3BpZWNlLnVuaXROYW1lfSlgKTtcbiAgICAgICAgICAgIHVwZGF0ZVNsb3QoaW5kZXgsIHBpZWNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSA9PT09PT09PT09IOiDjOWMheabtOaWsOWujOaIkCA9PT09PT09PT09Jyk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDkuovku7blpITnkIZcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIHJlZ2lzdGVyRXZlbnRIYW5kbGVycygpIHtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gUmVnaXN0ZXJpbmcgZXZlbnQgaGFuZGxlcnMuLi4nKTtcbiAgICAvLyDmjqXmlLbmnI3liqHnq6/lj5HpgIHnmoTog4zljIXmlbDmja5cbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgndXBkYXRlX2ludmVudG9yeV9kYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlY2VpdmVkIHVwZGF0ZV9pbnZlbnRvcnlfZGF0YSBldmVudCcpO1xuICAgICAgICB1cGRhdGVJbnZlbnRvcnlEYXRhKGRhdGEpO1xuICAgIH0pO1xuICAgIC8vIOmDqOe9suWPjemmiFxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdkZXBsb3ltZW50X2ZlZWRiYWNrJywgKGRhdGEpID0+IHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIERlcGxveW1lbnQgZmVlZGJhY2s6ICR7ZGF0YS5zdWNjZXNzID8gJ+KchScgOiAn4p2MJ30gJHtkYXRhLm1lc3NhZ2V9YCk7XG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkNvaW5zQmlnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5DYW5jZWwnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOiDmmL7npLpVSeaPkOekulxuICAgIH0pO1xuICAgIC8vIOW/q+aNt+mUruWIh+aNouiDjOWMhVxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCd0b2dnbGVfaW52ZW50b3J5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0gUmVjZWl2ZWQgdG9nZ2xlX2ludmVudG9yeSBldmVudCcpO1xuICAgICAgICB0b2dnbGUoKTtcbiAgICB9KTtcbiAgICAvLyDmmL7npLrog4zljIVcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnc2hvd19pbnZlbnRvcnknLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSBSZWNlaXZlZCBzaG93X2ludmVudG9yeSBldmVudCcpO1xuICAgICAgICBzaG93KCk7XG4gICAgfSk7XG4gICAgLy8g6ZqQ6JeP6IOM5YyFXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2hpZGVfaW52ZW50b3J5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0gUmVjZWl2ZWQgaGlkZV9pbnZlbnRvcnkgZXZlbnQnKTtcbiAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSDinIUgRXZlbnQgaGFuZGxlcnMgcmVnaXN0ZXJlZCcpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5YWo5bGAQVBJXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBleHBvc2VHbG9iYWxBUEkoKSB7XG4gICAgZ2xvYmFsVGhpcy5JbnZlbnRvcnkgPSB7XG4gICAgICAgIHNob3c6IHNob3csXG4gICAgICAgIGhpZGU6IGhpZGUsXG4gICAgICAgIHRvZ2dsZTogdG9nZ2xlLFxuICAgICAgICB1cGRhdGU6IHVwZGF0ZUludmVudG9yeURhdGEsXG4gICAgICAgIHJlcXVlc3REYXRhOiByZXF1ZXN0SW52ZW50b3J5RGF0YVxuICAgIH07XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKchSBHbG9iYWwgQVBJIGV4cG9zZWQ6IEludmVudG9yeS5zaG93KCksIC5oaWRlKCksIC50b2dnbGUoKScpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5ZCv5YqoXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDnrYnlvoVET03liqDovb3lrozmiJDlkI7liJ3lp4vljJZcbiQuU2NoZWR1bGUoMC4xLCAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKdjCBJbml0aWFsaXphdGlvbiBlcnJvcjogJHtlcnJvcn1gKTtcbiAgICB9XG59KTtcbiQuTXNnKCdbSW52ZW50b3J5XSBTY3JpcHQgbG9hZGVkIHN1Y2Nlc3NmdWxseScpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9