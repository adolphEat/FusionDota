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
    // 设置样式 - 不使用 flowChildren，让子元素可以叠加定位
    slot.style.width = '90px';
    slot.style.height = '90px';
    slot.style.margin = '5px';
    slot.style.backgroundColor = INVENTORY_THEME.slotBg;
    slot.style.border = `2px solid ${INVENTORY_THEME.borderColor}`;
    slot.style.borderRadius = '8px';
    // 不设置 flowChildren，使用绝对定位叠加子元素
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
// 辅助函数
// ============================================================================
/**
 * 获取完整的英雄名称（npc_dota_hero_xxx 格式）
 * DOTAHeroImage 面板需要完整的英雄名称
 * @param unitName DOTA2 单位名 (npc_dota_hero_xxx)
 * @param pieceId 棋子ID (通常是短名称如 axe)
 */
function getFullHeroName(unitName, pieceId) {
    // 如果 unitName 已经是完整格式，直接返回
    if (unitName && unitName.startsWith('npc_dota_hero_')) {
        return unitName;
    }
    // 如果 pieceId 是短名称，添加前缀
    if (pieceId && !pieceId.startsWith('npc_')) {
        return `npc_dota_hero_${pieceId}`;
    }
    // 如果 pieceId 已经是完整格式
    if (pieceId && pieceId.startsWith('npc_dota_hero_')) {
        return pieceId;
    }
    // 回退：尝试使用 unitName 或 pieceId
    return unitName || `npc_dota_hero_${pieceId}` || 'npc_dota_hero_axe';
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
    // 使用 DOTA2 内置的 DOTAHeroImage 面板显示英雄头像
    const heroImage = $.CreatePanel('DOTAHeroImage', slotPanel, `HeroImage_${slotIndex}`);
    // 头像填满整个槽位
    heroImage.style.width = '100%';
    heroImage.style.height = '100%';
    heroImage.style.horizontalAlign = 'center';
    heroImage.style.verticalAlign = 'center';
    // 获取完整的英雄名称（npc_dota_hero_xxx 格式）
    const heroName = getFullHeroName(piece.unitName, piece.id);
    $.Msg(`[Inventory] 设置英雄图标: ${heroName}`);
    // 设置英雄名称和图像样式
    // DOTAHeroImage 属性: heroname, heroid, heroimagestyle
    heroImage.heroname = heroName;
    heroImage.heroimagestyle = 'portrait'; // portrait: 71x94, icon: 32x32, landscape: 128x72
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
    display.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    display.style.border = `2px solid ${INVENTORY_THEME.borderGold}`;
    display.style.borderRadius = '8px';
    display.style.overflow = 'clip';
    // 使用 DOTAHeroImage 显示英雄头像
    const heroImage = $.CreatePanel('DOTAHeroImage', display, 'DragHeroImage');
    heroImage.style.width = '100%';
    heroImage.style.height = '100%';
    const heroName = getFullHeroName(piece.unitName, piece.id);
    heroImage.heroname = heroName;
    heroImage.heroimagestyle = 'portrait';
    return display;
}
function deployPieceAtCursor(piece, slotIndex) {
    $.Msg(`[Inventory] 🎯 Deploying piece: ${piece.displayName} from slot ${slotIndex}`);
    // 获取鼠标屏幕位置
    const screenPos = GameUI.GetCursorPosition();
    // 将屏幕坐标转换为世界坐标（地面位置）
    // 注意：GetScreenWorldPosition 需要两个单独的参数
    const worldPos = GameUI.GetScreenWorldPosition(screenPos[0], screenPos[1]);
    if (!worldPos) {
        $.Msg(`[Inventory] ❌ Cannot get world position from screen (${screenPos[0]}, ${screenPos[1]})`);
        Game.EmitSound('General.Cancel');
        return;
    }
    $.Msg(`[Inventory] Screen: (${screenPos[0]}, ${screenPos[1]}) → World: (${worldPos[0].toFixed(1)}, ${worldPos[1].toFixed(1)}, ${worldPos[2].toFixed(1)})`);
    // 获取本地玩家ID（单机模式下通常是0）
    const localPlayerId = Players.GetLocalPlayer();
    // 发送部署请求到服务端（使用世界坐标）
    GameEvents.SendCustomGameEventToServer('inventory_deploy_piece', {
        playerId: localPlayerId,
        pieceId: piece.id,
        unitName: piece.unitName,
        slotIndex: slotIndex,
        worldX: worldPos[0],
        worldY: worldPos[1],
        worldZ: worldPos[2]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dmFyIFwiJFwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vRDpcXFN0ZWFtQXBwXFxzdGVhbWFwcHNcXGNvbW1vblxcZG90YSAyIGJldGFcXGNvbnRlbnRcXGRvdGFfYWRkb25zXFxmdXNpb25cXHBhbm9yYW1hXFxzcmNcXGludmVudG9yeVxcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gQHRzLW5vY2hlY2tcbi8qKlxuICogSW52ZW50b3J5IFVJIC0g6IOM5YyF55WM6Z2iXG4gKiDnlKjkuo7mmL7npLrlkoznrqHnkIbnjqnlrrbnmoTmo4vlrZDpmLXlrrlcbiAqIOaUr+aMgeaLluaLvemDqOe9suaji+WtkFxuICovXG4kLk1zZygn8J+OkiBJbnZlbnRvcnkgc2NyaXB0IGlzIGV4ZWN1dGluZyEnKTtcbkdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDkuLvpopjphY3nva5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNvbnN0IElOVkVOVE9SWV9USEVNRSA9IHtcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwgMjMsIDQyLCAwLjk1KScsXG4gICAgcGFuZWxCZzogJ3JnYmEoMzMsIDM0LCAzMSwgMC45OCknLFxuICAgIHNsb3RCZzogJ3JnYmEoNTAsIDUwLCA1MCwgMC44KScsXG4gICAgc2xvdEJnSG92ZXI6ICdyZ2JhKDcwLCA3MCwgNzAsIDAuOSknLFxuICAgIHNsb3RCZ0RyYWdnaW5nOiAncmdiYSgxMDAsIDE0OSwgMjM3LCAwLjUpJyxcbiAgICBib3JkZXJDb2xvcjogJ3JnYmEoNTksIDEzMCwgMjQ2LCAwLjYpJyxcbiAgICBib3JkZXJHb2xkOiAncmdiYSgyNTUsIDIxNSwgMCwgMC44KScsXG4gICAgdGV4dFByaW1hcnk6ICcjZmZmZmZmJyxcbiAgICB0ZXh0U2Vjb25kYXJ5OiAnI2I4YjhiOCcsXG4gICAgdGV4dEdvbGQ6ICcjZmZkNzAwJyxcbiAgICB0ZXh0UmFyaXR5OiB7XG4gICAgICAgIGNvbW1vbjogJyNmZmZmZmYnLFxuICAgICAgICB1bmNvbW1vbjogJyM0Y2FmNTAnLFxuICAgICAgICByYXJlOiAnIzIxOTZmMycsXG4gICAgICAgIGVwaWM6ICcjOWMyN2IwJyxcbiAgICAgICAgbGVnZW5kYXJ5OiAnI2ZmOTgwMCdcbiAgICB9XG59O1xuLy8g56iA5pyJ5bqm6aKc6Imy5pig5bCEXG5jb25zdCBSQVJJVFlfQ09MT1JTID0ge1xuICAgICcxJzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkuY29tbW9uLFxuICAgICcyJzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkudW5jb21tb24sXG4gICAgJzMnOiBJTlZFTlRPUllfVEhFTUUudGV4dFJhcml0eS5yYXJlLFxuICAgICc0JzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkuZXBpYyxcbiAgICAnNSc6IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LmxlZ2VuZGFyeVxufTtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWFqOWxgOeKtuaAgVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxubGV0IHJvb3RQYW5lbCA9IG51bGw7XG5sZXQgY29udGFpbmVyUGFuZWwgPSBudWxsO1xubGV0IHNsb3RzQ29udGFpbmVyID0gbnVsbDtcbmxldCBpc1Zpc2libGUgPSBmYWxzZTtcbmxldCBpbnZlbnRvcnlTbG90cyA9IFtdO1xubGV0IGRyYWdnZWRQaWVjZSA9IG51bGw7XG5sZXQgZHJhZ2dlZFNsb3RJbmRleCA9IC0xO1xubGV0IGRyYWdPdmVybGF5ID0gbnVsbDtcbmNvbnN0IE1BWF9TTE9UUyA9IDg7IC8vIOacgOWkp+Wkh+aImOW4reS9jeaVsFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5Yid5aeL5YyWXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSBJbml0aWFsaXppbmcuLi4nKTtcbiAgICAvLyDojrflj5bmiJbliJvlu7rmoLnpnaLmnb9cbiAgICByb290UGFuZWwgPSAkKCcjSW52ZW50b3J5Um9vdCcpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgIHJvb3RQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgJC5HZXRDb250ZXh0UGFuZWwoKSwgJ0ludmVudG9yeVJvb3QnKTtcbiAgICAgICAgcm9vdFBhbmVsLkFkZENsYXNzKCdpbnZlbnRvcnlfcm9vdCcpO1xuICAgIH1cbiAgICAvLyDliJvlu7rlrrnlmahcbiAgICBjcmVhdGVDb250YWluZXIoKTtcbiAgICAvLyDliJ3lp4vljJbmj5Lmp71cbiAgICBpbml0aWFsaXplU2xvdHMoKTtcbiAgICAvLyDms6jlhozkuovku7bnm5HlkKxcbiAgICByZWdpc3RlckV2ZW50SGFuZGxlcnMoKTtcbiAgICAvLyDmmrTpnLLlhajlsYBBUElcbiAgICBleHBvc2VHbG9iYWxBUEkoKTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyFIEluaXRpYWxpemF0aW9uIGNvbXBsZXRlJyk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBVSSDliJvlu7pcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgICBjb250YWluZXJQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnSW52ZW50b3J5Q29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyUGFuZWwuQWRkQ2xhc3MoJ2ludmVudG9yeV9jb250YWluZXInKTtcbiAgICAvLyDorr7nva7moLflvI9cbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTUwcHgnO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuYmFja2dyb3VuZDtcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5ib3JkZXJUb3AgPSBgMnB4IHNvbGlkICR7SU5WRU5UT1JZX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g5Yib5bu65qCH6aKYXG4gICAgY29uc3QgaGVhZGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXJQYW5lbCwgJ0ludmVudG9yeUhlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGhlYWRlci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5VGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+aji+WtkOiDjOWMhSc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dEdvbGQ7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgdGl0bGUuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTBweCc7XG4gICAgY29uc3QgaGludCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5SGludCcpO1xuICAgIGhpbnQudGV4dCA9ICfmi5bmi73mo4vlrZDliLDmo4vnm5jpg6jnvbInO1xuICAgIGhpbnQuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgaGludC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGhpbnQuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICBoaW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoaW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIC8vIOWIm+W7uuWFs+mXreaMiemSrlxuICAgIGNvbnN0IGNsb3NlQnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgaGVhZGVyLCAnSW52ZW50b3J5Q2xvc2VCdG4nKTtcbiAgICBjbG9zZUJ0bi50ZXh0ID0gJ+KclSc7XG4gICAgY2xvc2VCdG4uc3R5bGUud2lkdGggPSAnMzBweCc7XG4gICAgY2xvc2VCdG4uc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgY2xvc2VCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuYm9yZGVyID0gYDFweCBzb2xpZCAke0lOVkVOVE9SWV9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIGNsb3NlQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc0cHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgY2xvc2VCdG4uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDlhbPpl63mjInpkq7ooqvngrnlh7snKTtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyMzksIDY4LCA2OCwgMC44KSc7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmNvbG9yID0gJyNmZmZmZmYnO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknO1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIH0pO1xuICAgIC8vIOWIm+W7uuaPkuanveWuueWZqFxuICAgIHNsb3RzQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXJQYW5lbCwgJ0ludmVudG9yeVNsb3RzQ29udGFpbmVyJyk7XG4gICAgc2xvdHNDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc2xvdHNDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMHB4JztcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gJzVweCc7XG59XG5mdW5jdGlvbiBpbml0aWFsaXplU2xvdHMoKSB7XG4gICAgaWYgKCFzbG90c0NvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGludmVudG9yeVNsb3RzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfU0xPVFM7IGkrKykge1xuICAgICAgICBjb25zdCBzbG90UGFuZWwgPSBjcmVhdGVTbG90UGFuZWwoaSk7XG4gICAgICAgIGNvbnN0IHNsb3QgPSB7XG4gICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgIHBpZWNlOiBudWxsLFxuICAgICAgICAgICAgcGFuZWxJZDogc2xvdFBhbmVsLmlkXG4gICAgICAgIH07XG4gICAgICAgIGludmVudG9yeVNsb3RzLnB1c2goc2xvdCk7XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSBDcmVhdGVkICR7TUFYX1NMT1RTfSBzbG90c2ApO1xufVxuZnVuY3Rpb24gY3JlYXRlU2xvdFBhbmVsKGluZGV4KSB7XG4gICAgY29uc3Qgc2xvdCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc2xvdHNDb250YWluZXIsIGBJbnZlbnRvcnlTbG90XyR7aW5kZXh9YCk7XG4gICAgc2xvdC5BZGRDbGFzcygnaW52ZW50b3J5X3Nsb3QnKTtcbiAgICAvLyDorr7nva7moLflvI8gLSDkuI3kvb/nlKggZmxvd0NoaWxkcmVu77yM6K6p5a2Q5YWD57Sg5Y+v5Lul5Y+g5Yqg5a6a5L2NXG4gICAgc2xvdC5zdHlsZS53aWR0aCA9ICc5MHB4JztcbiAgICBzbG90LnN0eWxlLmhlaWdodCA9ICc5MHB4JztcbiAgICBzbG90LnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgIHNsb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICBzbG90LnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtJTlZFTlRPUllfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBzbG90LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIC8vIOS4jeiuvue9riBmbG93Q2hpbGRyZW7vvIzkvb/nlKjnu53lr7nlrprkvY3lj6DliqDlrZDlhYPntKBcbiAgICAvLyDliJvlu7rnqbrmp73mj5DnpLpcbiAgICBjb25zdCBlbXB0eUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90LCBgRW1wdHlMYWJlbF8ke2luZGV4fWApO1xuICAgIGVtcHR5TGFiZWwudGV4dCA9ICcrJztcbiAgICBlbXB0eUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzMycHgnO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBlbXB0eUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGVtcHR5TGFiZWwuaGl0dGVzdCA9IGZhbHNlO1xuICAgIHJldHVybiBzbG90O1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g6L6F5Yqp5Ye95pWwXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vKipcbiAqIOiOt+WPluWujOaVtOeahOiLsembhOWQjeensO+8iG5wY19kb3RhX2hlcm9feHh4IOagvOW8j++8iVxuICogRE9UQUhlcm9JbWFnZSDpnaLmnb/pnIDopoHlrozmlbTnmoToi7Hpm4TlkI3np7BcbiAqIEBwYXJhbSB1bml0TmFtZSBET1RBMiDljZXkvY3lkI0gKG5wY19kb3RhX2hlcm9feHh4KVxuICogQHBhcmFtIHBpZWNlSWQg5qOL5a2QSUQgKOmAmuW4uOaYr+efreWQjeensOWmgiBheGUpXG4gKi9cbmZ1bmN0aW9uIGdldEZ1bGxIZXJvTmFtZSh1bml0TmFtZSwgcGllY2VJZCkge1xuICAgIC8vIOWmguaenCB1bml0TmFtZSDlt7Lnu4/mmK/lrozmlbTmoLzlvI/vvIznm7TmjqXov5Tlm55cbiAgICBpZiAodW5pdE5hbWUgJiYgdW5pdE5hbWUuc3RhcnRzV2l0aCgnbnBjX2RvdGFfaGVyb18nKSkge1xuICAgICAgICByZXR1cm4gdW5pdE5hbWU7XG4gICAgfVxuICAgIC8vIOWmguaenCBwaWVjZUlkIOaYr+efreWQjeensO+8jOa3u+WKoOWJjee8gFxuICAgIGlmIChwaWVjZUlkICYmICFwaWVjZUlkLnN0YXJ0c1dpdGgoJ25wY18nKSkge1xuICAgICAgICByZXR1cm4gYG5wY19kb3RhX2hlcm9fJHtwaWVjZUlkfWA7XG4gICAgfVxuICAgIC8vIOWmguaenCBwaWVjZUlkIOW3sue7j+aYr+WujOaVtOagvOW8j1xuICAgIGlmIChwaWVjZUlkICYmIHBpZWNlSWQuc3RhcnRzV2l0aCgnbnBjX2RvdGFfaGVyb18nKSkge1xuICAgICAgICByZXR1cm4gcGllY2VJZDtcbiAgICB9XG4gICAgLy8g5Zue6YCA77ya5bCd6K+V5L2/55SoIHVuaXROYW1lIOaIliBwaWVjZUlkXG4gICAgcmV0dXJuIHVuaXROYW1lIHx8IGBucGNfZG90YV9oZXJvXyR7cGllY2VJZH1gIHx8ICducGNfZG90YV9oZXJvX2F4ZSc7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDmo4vlrZDmmL7npLpcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIHVwZGF0ZVNsb3Qoc2xvdEluZGV4LCBwaWVjZSkge1xuICAgIGNvbnN0IHNsb3QgPSBpbnZlbnRvcnlTbG90c1tzbG90SW5kZXhdO1xuICAgIGlmICghc2xvdClcbiAgICAgICAgcmV0dXJuO1xuICAgIHNsb3QucGllY2UgPSBwaWVjZTtcbiAgICBjb25zdCBzbG90UGFuZWwgPSAkKGAjJHtzbG90LnBhbmVsSWR9YCk7XG4gICAgaWYgKCFzbG90UGFuZWwpXG4gICAgICAgIHJldHVybjtcbiAgICAvLyDmuIXnqbrmp73kvY1cbiAgICBzbG90UGFuZWwuUmVtb3ZlQW5kRGVsZXRlQ2hpbGRyZW4oKTtcbiAgICBpZiAocGllY2UpIHtcbiAgICAgICAgcmVuZGVyUGllY2VJblNsb3Qoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIOaBouWkjeepuuanveaPkOekulxuICAgICAgICBjb25zdCBlbXB0eUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90UGFuZWwsIGBFbXB0eUxhYmVsXyR7c2xvdEluZGV4fWApO1xuICAgICAgICBlbXB0eUxhYmVsLnRleHQgPSAnKyc7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMzJweCc7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICAgICAgZW1wdHlMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgZW1wdHlMYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgICAgICBlbXB0eUxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJQaWVjZUluU2xvdChzbG90UGFuZWwsIHBpZWNlLCBzbG90SW5kZXgpIHtcbiAgICAvLyDkvb/nlKggRE9UQTIg5YaF572u55qEIERPVEFIZXJvSW1hZ2Ug6Z2i5p2/5pi+56S66Iux6ZuE5aS05YOPXG4gICAgY29uc3QgaGVyb0ltYWdlID0gJC5DcmVhdGVQYW5lbCgnRE9UQUhlcm9JbWFnZScsIHNsb3RQYW5lbCwgYEhlcm9JbWFnZV8ke3Nsb3RJbmRleH1gKTtcbiAgICAvLyDlpLTlg4/loavmu6HmlbTkuKrmp73kvY1cbiAgICBoZXJvSW1hZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgaGVyb0ltYWdlLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBoZXJvSW1hZ2Uuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVyb0ltYWdlLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDojrflj5blrozmlbTnmoToi7Hpm4TlkI3np7DvvIhucGNfZG90YV9oZXJvX3h4eCDmoLzlvI/vvIlcbiAgICBjb25zdCBoZXJvTmFtZSA9IGdldEZ1bGxIZXJvTmFtZShwaWVjZS51bml0TmFtZSwgcGllY2UuaWQpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDorr7nva7oi7Hpm4Tlm77moIc6ICR7aGVyb05hbWV9YCk7XG4gICAgLy8g6K6+572u6Iux6ZuE5ZCN56ew5ZKM5Zu+5YOP5qC35byPXG4gICAgLy8gRE9UQUhlcm9JbWFnZSDlsZ7mgKc6IGhlcm9uYW1lLCBoZXJvaWQsIGhlcm9pbWFnZXN0eWxlXG4gICAgaGVyb0ltYWdlLmhlcm9uYW1lID0gaGVyb05hbWU7XG4gICAgaGVyb0ltYWdlLmhlcm9pbWFnZXN0eWxlID0gJ3BvcnRyYWl0JzsgLy8gcG9ydHJhaXQ6IDcxeDk0LCBpY29uOiAzMngzMiwgbGFuZHNjYXBlOiAxMjh4NzJcbiAgICAvLyDnqIDmnInluqbovrnmoYZcbiAgICBjb25zdCByYXJpdHlDb2xvciA9IFJBUklUWV9DT0xPUlNbcGllY2UucmFyaXR5LnRvU3RyaW5nKCldIHx8IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LmNvbW1vbjtcbiAgICBzbG90UGFuZWwuc3R5bGUuYm9yZGVyID0gYDNweCBzb2xpZCAke3Jhcml0eUNvbG9yfWA7XG4gICAgc2xvdFBhbmVsLnN0eWxlLmJveFNoYWRvdyA9IGAwIDAgMTBweCAke3Jhcml0eUNvbG9yfWA7XG4gICAgLy8g6LS555So5qCH562+XG4gICAgY29uc3QgY29zdExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90UGFuZWwsIGBDb3N0XyR7c2xvdEluZGV4fWApO1xuICAgIGNvc3RMYWJlbC50ZXh0ID0gYCR7cGllY2UuY29zdH3wn5KwYDtcbiAgICBjb3N0TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgY29zdExhYmVsLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRHb2xkO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgY29zdExhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJztcbiAgICBjb3N0TGFiZWwuc3R5bGUubWFyZ2luTGVmdCA9ICc1cHgnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5tYXJnaW5Ub3AgPSAnNXB4JztcbiAgICBjb3N0TGFiZWwuc3R5bGUudGV4dFNoYWRvdyA9ICcxcHggMXB4IDJweCAjMDAwMDAwJztcbiAgICBjb3N0TGFiZWwuaGl0dGVzdCA9IGZhbHNlO1xuICAgIC8vIOWQjeensOagh+etvu+8iOaCrOWBnOaXtuaYvuekuu+8iVxuICAgIGNvbnN0IG5hbWVMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc2xvdFBhbmVsLCBgTmFtZV8ke3Nsb3RJbmRleH1gKTtcbiAgICBuYW1lTGFiZWwudGV4dCA9IHBpZWNlLmRpc3BsYXlOYW1lO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBuYW1lTGFiZWwuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgbmFtZUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG5hbWVMYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2JvdHRvbSc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcycHgnO1xuICAgIG5hbWVMYWJlbC5zdHlsZS50ZXh0U2hhZG93ID0gJzFweCAxcHggM3B4ICMwMDAwMDAnO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjcpJztcbiAgICBuYW1lTGFiZWwuc3R5bGUucGFkZGluZyA9ICcycHggNXB4JztcbiAgICBuYW1lTGFiZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzNweCc7XG4gICAgbmFtZUxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICAvLyDorr7nva7mi5bmi73kuovku7ZcbiAgICBzZXR1cERyYWdFdmVudHMoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KTtcbiAgICAvLyDmgqzlgZzmlYjmnpxcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25tb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnSG92ZXI7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wNSknO1xuICAgIH0pO1xuICAgIHNsb3RQYW5lbC5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBpZiAoZHJhZ2dlZFNsb3RJbmRleCAhPT0gc2xvdEluZGV4KSB7XG4gICAgICAgICAgICBzbG90UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICAgICAgICAgIHNsb3RQYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUoMS4wKSc7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOaLluaLveWKn+iDvVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gc2V0dXBEcmFnRXZlbnRzKHNsb3RQYW5lbCwgcGllY2UsIHNsb3RJbmRleCkge1xuICAgIHNsb3RQYW5lbC5oaXR0ZXN0ID0gdHJ1ZTtcbiAgICBzbG90UGFuZWwuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25kcmFnc3RhcnQnLCAocGFuZWxJZCwgZHJhZ0NhbGxiYWNrcykgPT4ge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gRHJhZyBzdGFydDogJHtwaWVjZS5kaXNwbGF5TmFtZX0gZnJvbSBzbG90ICR7c2xvdEluZGV4fWApO1xuICAgICAgICBkcmFnZ2VkUGllY2UgPSBwaWVjZTtcbiAgICAgICAgZHJhZ2dlZFNsb3RJbmRleCA9IHNsb3RJbmRleDtcbiAgICAgICAgLy8g5Yib5bu65ouW5ou96KeG6KeJ5Y+N6aaIXG4gICAgICAgIGNyZWF0ZURyYWdPdmVybGF5KHBpZWNlKTtcbiAgICAgICAgLy8g6auY5Lqu5Y6f5aeL5qe95L2NXG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnRHJhZ2dpbmc7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgICAgIC8vIOiuvue9ruaLluaLveaVsOaNrlxuICAgICAgICBkcmFnQ2FsbGJhY2tzLmRpc3BsYXlQYW5lbCA9IGNyZWF0ZURyYWdEaXNwbGF5UGFuZWwocGllY2UpO1xuICAgICAgICBkcmFnQ2FsbGJhY2tzLm9mZnNldFggPSAwO1xuICAgICAgICBkcmFnQ2FsbGJhY2tzLm9mZnNldFkgPSAwO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25kcmFnZW5kJywgKHBhbmVsSWQsIGRyYWdnZWRQYW5lbCkgPT4ge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gRHJhZyBlbmQ6ICR7cGllY2UuZGlzcGxheU5hbWV9YCk7XG4gICAgICAgIC8vIOaBouWkjeanveS9jeagt+W8j1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICAgICAgc2xvdFBhbmVsLnN0eWxlLm9wYWNpdHkgPSAnMS4wJztcbiAgICAgICAgLy8g5Y+R6YCB6YOo572y6K+35rGC5Yiw5pyN5Yqh56uvXG4gICAgICAgIGlmIChkcmFnZ2VkUGllY2UpIHtcbiAgICAgICAgICAgIGRlcGxveVBpZWNlQXRDdXJzb3IoZHJhZ2dlZFBpZWNlLCBzbG90SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOa4heeQhlxuICAgICAgICBpZiAoZHJhZ092ZXJsYXkpIHtcbiAgICAgICAgICAgIGRyYWdPdmVybGF5LkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAgICAgZHJhZ092ZXJsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRyYWdnZWRQaWVjZSA9IG51bGw7XG4gICAgICAgIGRyYWdnZWRTbG90SW5kZXggPSAtMTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZURyYWdPdmVybGF5KHBpZWNlKSB7XG4gICAgLy8g5Yib5bu65YWo5bGP5ouW5ou95o+Q56S6XG4gICAgaWYgKCFkcmFnT3ZlcmxheSkge1xuICAgICAgICBkcmFnT3ZlcmxheSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgJC5HZXRDb250ZXh0UGFuZWwoKSwgJ0RyYWdPdmVybGF5Jyk7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLnpJbmRleCA9ICcxMDAwMCc7XG4gICAgICAgIGRyYWdPdmVybGF5LmhpdHRlc3QgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgaGludCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgZHJhZ092ZXJsYXksICdEcmFnSGludCcpO1xuICAgICAgICBoaW50LnRleHQgPSAn5p2+5byA6byg5qCH6YOo572y5qOL5a2QJztcbiAgICAgICAgaGludC5zdHlsZS5mb250U2l6ZSA9ICcyNHB4JztcbiAgICAgICAgaGludC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0R29sZDtcbiAgICAgICAgaGludC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgaGludC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGhpbnQuc3R5bGUudGV4dFNoYWRvdyA9ICcycHggMnB4IDRweCAjMDAwMDAwJztcbiAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICAgICAgaGludC5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG4gICAgICAgIGhpbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlRHJhZ0Rpc3BsYXlQYW5lbChwaWVjZSkge1xuICAgIGNvbnN0IGRpc3BsYXkgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsICQuR2V0Q29udGV4dFBhbmVsKCksICdEcmFnRGlzcGxheScpO1xuICAgIGRpc3BsYXkuc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgZGlzcGxheS5zdHlsZS5oZWlnaHQgPSAnODBweCc7XG4gICAgZGlzcGxheS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjcpJztcbiAgICBkaXNwbGF5LnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtJTlZFTlRPUllfVEhFTUUuYm9yZGVyR29sZH1gO1xuICAgIGRpc3BsYXkuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgZGlzcGxheS5zdHlsZS5vdmVyZmxvdyA9ICdjbGlwJztcbiAgICAvLyDkvb/nlKggRE9UQUhlcm9JbWFnZSDmmL7npLroi7Hpm4TlpLTlg49cbiAgICBjb25zdCBoZXJvSW1hZ2UgPSAkLkNyZWF0ZVBhbmVsKCdET1RBSGVyb0ltYWdlJywgZGlzcGxheSwgJ0RyYWdIZXJvSW1hZ2UnKTtcbiAgICBoZXJvSW1hZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgaGVyb0ltYWdlLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb25zdCBoZXJvTmFtZSA9IGdldEZ1bGxIZXJvTmFtZShwaWVjZS51bml0TmFtZSwgcGllY2UuaWQpO1xuICAgIGhlcm9JbWFnZS5oZXJvbmFtZSA9IGhlcm9OYW1lO1xuICAgIGhlcm9JbWFnZS5oZXJvaW1hZ2VzdHlsZSA9ICdwb3J0cmFpdCc7XG4gICAgcmV0dXJuIGRpc3BsYXk7XG59XG5mdW5jdGlvbiBkZXBsb3lQaWVjZUF0Q3Vyc29yKHBpZWNlLCBzbG90SW5kZXgpIHtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+OryBEZXBsb3lpbmcgcGllY2U6ICR7cGllY2UuZGlzcGxheU5hbWV9IGZyb20gc2xvdCAke3Nsb3RJbmRleH1gKTtcbiAgICAvLyDojrflj5bpvKDmoIflsY/luZXkvY3nva5cbiAgICBjb25zdCBzY3JlZW5Qb3MgPSBHYW1lVUkuR2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAvLyDlsIblsY/luZXlnZDmoIfovazmjaLkuLrkuJbnlYzlnZDmoIfvvIjlnLDpnaLkvY3nva7vvIlcbiAgICAvLyDms6jmhI/vvJpHZXRTY3JlZW5Xb3JsZFBvc2l0aW9uIOmcgOimgeS4pOS4quWNleeLrOeahOWPguaVsFxuICAgIGNvbnN0IHdvcmxkUG9zID0gR2FtZVVJLkdldFNjcmVlbldvcmxkUG9zaXRpb24oc2NyZWVuUG9zWzBdLCBzY3JlZW5Qb3NbMV0pO1xuICAgIGlmICghd29ybGRQb3MpIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKdjCBDYW5ub3QgZ2V0IHdvcmxkIHBvc2l0aW9uIGZyb20gc2NyZWVuICgke3NjcmVlblBvc1swXX0sICR7c2NyZWVuUG9zWzFdfSlgKTtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ2FuY2VsJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIFNjcmVlbjogKCR7c2NyZWVuUG9zWzBdfSwgJHtzY3JlZW5Qb3NbMV19KSDihpIgV29ybGQ6ICgke3dvcmxkUG9zWzBdLnRvRml4ZWQoMSl9LCAke3dvcmxkUG9zWzFdLnRvRml4ZWQoMSl9LCAke3dvcmxkUG9zWzJdLnRvRml4ZWQoMSl9KWApO1xuICAgIC8vIOiOt+WPluacrOWcsOeOqeWutklE77yI5Y2V5py65qih5byP5LiL6YCa5bi45pivMO+8iVxuICAgIGNvbnN0IGxvY2FsUGxheWVySWQgPSBQbGF5ZXJzLkdldExvY2FsUGxheWVyKCk7XG4gICAgLy8g5Y+R6YCB6YOo572y6K+35rGC5Yiw5pyN5Yqh56uv77yI5L2/55So5LiW55WM5Z2Q5qCH77yJXG4gICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ2ludmVudG9yeV9kZXBsb3lfcGllY2UnLCB7XG4gICAgICAgIHBsYXllcklkOiBsb2NhbFBsYXllcklkLFxuICAgICAgICBwaWVjZUlkOiBwaWVjZS5pZCxcbiAgICAgICAgdW5pdE5hbWU6IHBpZWNlLnVuaXROYW1lLFxuICAgICAgICBzbG90SW5kZXg6IHNsb3RJbmRleCxcbiAgICAgICAgd29ybGRYOiB3b3JsZFBvc1swXSxcbiAgICAgICAgd29ybGRZOiB3b3JsZFBvc1sxXSxcbiAgICAgICAgd29ybGRaOiB3b3JsZFBvc1syXVxuICAgIH0pO1xuICAgIC8vIOaSreaUvumfs+aViFxuICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkNhc3RTdGFydCcpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5pi+56S6L+makOiXj1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gc2hvdygpIHtcbiAgICBpZiAoIXJvb3RQYW5lbCkge1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0g4pqg77iPIFJvb3QgcGFuZWwgbm90IGluaXRpYWxpemVkJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcm9vdFBhbmVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyFIEludmVudG9yeSBzaG93bicpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDlvZPliY3njqnlrrZJRDogJHtQbGF5ZXJzLkdldExvY2FsUGxheWVyKCl9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOanveS9jeaVsOmHjzogJHtpbnZlbnRvcnlTbG90cy5sZW5ndGh9YCk7XG4gICAgLy8g6K+35rGC5pyA5paw5pWw5o2uXG4gICAgcmVxdWVzdEludmVudG9yeURhdGEoKTtcbn1cbmZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgaWYgKCFyb290UGFuZWwpXG4gICAgICAgIHJldHVybjtcbiAgICByb290UGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIEludmVudG9yeSBoaWRkZW4nKTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZSgpIHtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgIGhpZGUoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNob3coKTtcbiAgICB9XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDmlbDmja7mm7TmlrBcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIHJlcXVlc3RJbnZlbnRvcnlEYXRhKCkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSBSZXF1ZXN0aW5nIGludmVudG9yeSBkYXRhIGZyb20gc2VydmVyLi4uJyk7XG4gICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3JlcXVlc3RfaW52ZW50b3J5X2RhdGEnLCB7XG4gICAgICAgIHBsYXllcklkOiBQbGF5ZXJzLkdldExvY2FsUGxheWVyKClcbiAgICB9KTtcbn1cbi8vIEhlbHBlciB0byBjb252ZXJ0IEx1YSB0YWJsZSAob2JqZWN0KSB0byBKUyBhcnJheVxuZnVuY3Rpb24gY29udmVydFRvQXJyYXkob2JqKSB7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g6L6T5YWl57G75Z6LOiAke3R5cGVvZiBvYmp9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g5piv5pWw57uEOiAke0FycmF5LmlzQXJyYXkob2JqKX1gKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOW3sue7j+aYr+aVsOe7hO+8jOmVv+W6pjogJHtvYmoubGVuZ3RofWApO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IFtdO1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDlvIDlp4vpgY3ljoblr7nosaEuLi5gKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSBrZXk6ICR7a2V5fSwgdmFsdWU6ICR7SlNPTi5zdHJpbmdpZnkob2JqW2tleV0pfWApO1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2gob2JqW2tleV0pO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g6YGN5Y6G5a6M5oiQ77yM5om+5YiwICR7Y291bnR9IOS4quWFg+e0oGApO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDnu5PmnpzmlbDnu4Tplb/luqY6ICR7YXJyLmxlbmd0aH1gKTtcbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g5peg5rOV6L2s5o2i77yM6L+U5Zue56m65pWw57uEYCk7XG4gICAgcmV0dXJuIFtdO1xufVxuZnVuY3Rpb24gdXBkYXRlSW52ZW50b3J5RGF0YShkYXRhKSB7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldID09PT09PT09PT0g5pu05paw6IOM5YyF5pWw5o2uID09PT09PT09PT0nKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g5pWw5o2u5a+56LGhOiAke0pTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKGRhdGEpKX1gKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0gZGF0YS5waWVjZXMg57G75Z6LOiAke3R5cGVvZiBkYXRhLnBpZWNlc31gKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0gZGF0YS5waWVjZXMg5piv5pWw57uEOiAke0FycmF5LmlzQXJyYXkoZGF0YS5waWVjZXMpfWApO1xuICAgIGlmICghZGF0YS5waWVjZXMpIHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKaoO+4jyBkYXRhLnBpZWNlcyBpcyBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g5a6M5pW05pWw5o2uOiAke0pTT04uc3RyaW5naWZ5KGRhdGEpfWApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOi9rOaNoiBMdWEg6KGo5Li6IEphdmFTY3JpcHQg5pWw57uEXG4gICAgY29uc3QgcGllY2VzQXJyYXkgPSBjb252ZXJ0VG9BcnJheShkYXRhLnBpZWNlcyk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOi9rOaNouWQjueahOaVsOe7hOmVv+W6pjogJHtwaWVjZXNBcnJheS5sZW5ndGh9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOaUtuWIsCAke3BpZWNlc0FycmF5Lmxlbmd0aH0g5Liq5qOL5a2QYCk7XG4gICAgLy8g5riF56m65omA5pyJ5qe95L2NXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfU0xPVFM7IGkrKykge1xuICAgICAgICB1cGRhdGVTbG90KGksIG51bGwpO1xuICAgIH1cbiAgICAvLyDmm7TmlrDmo4vlrZBcbiAgICBwaWVjZXNBcnJheS5mb3JFYWNoKChwaWVjZSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4IDwgTUFYX1NMT1RTKSB7XG4gICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g5pu05paw5qe95L2NICR7aW5kZXh9OiAke3BpZWNlLmRpc3BsYXlOYW1lfSAoJHtwaWVjZS51bml0TmFtZX0pYCk7XG4gICAgICAgICAgICB1cGRhdGVTbG90KGluZGV4LCBwaWVjZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gPT09PT09PT09PSDog4zljIXmm7TmlrDlrozmiJAgPT09PT09PT09PScpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5LqL5Lu25aSE55CGXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiByZWdpc3RlckV2ZW50SGFuZGxlcnMoKSB7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlZ2lzdGVyaW5nIGV2ZW50IGhhbmRsZXJzLi4uJyk7XG4gICAgLy8g5o6l5pS25pyN5Yqh56uv5Y+R6YCB55qE6IOM5YyF5pWw5o2uXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3VwZGF0ZV9pbnZlbnRvcnlfZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSBSZWNlaXZlZCB1cGRhdGVfaW52ZW50b3J5X2RhdGEgZXZlbnQnKTtcbiAgICAgICAgdXBkYXRlSW52ZW50b3J5RGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICAvLyDpg6jnvbLlj43ppohcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZGVwbG95bWVudF9mZWVkYmFjaycsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBEZXBsb3ltZW50IGZlZWRiYWNrOiAke2RhdGEuc3VjY2VzcyA/ICfinIUnIDogJ+KdjCd9ICR7ZGF0YS5tZXNzYWdlfWApO1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5Db2luc0JpZycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzog5pi+56S6VUnmj5DnpLpcbiAgICB9KTtcbiAgICAvLyDlv6vmjbfplK7liIfmjaLog4zljIVcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgndG9nZ2xlX2ludmVudG9yeScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlY2VpdmVkIHRvZ2dsZV9pbnZlbnRvcnkgZXZlbnQnKTtcbiAgICAgICAgdG9nZ2xlKCk7XG4gICAgfSk7XG4gICAgLy8g5pi+56S66IOM5YyFXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3Nob3dfaW52ZW50b3J5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0gUmVjZWl2ZWQgc2hvd19pbnZlbnRvcnkgZXZlbnQnKTtcbiAgICAgICAgc2hvdygpO1xuICAgIH0pO1xuICAgIC8vIOmakOiXj+iDjOWMhVxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdoaWRlX2ludmVudG9yeScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlY2VpdmVkIGhpZGVfaW52ZW50b3J5IGV2ZW50Jyk7XG4gICAgICAgIGhpZGUoKTtcbiAgICB9KTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyFIEV2ZW50IGhhbmRsZXJzIHJlZ2lzdGVyZWQnKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWFqOWxgEFQSVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gZXhwb3NlR2xvYmFsQVBJKCkge1xuICAgIGdsb2JhbFRoaXMuSW52ZW50b3J5ID0ge1xuICAgICAgICBzaG93OiBzaG93LFxuICAgICAgICBoaWRlOiBoaWRlLFxuICAgICAgICB0b2dnbGU6IHRvZ2dsZSxcbiAgICAgICAgdXBkYXRlOiB1cGRhdGVJbnZlbnRvcnlEYXRhLFxuICAgICAgICByZXF1ZXN0RGF0YTogcmVxdWVzdEludmVudG9yeURhdGFcbiAgICB9O1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSDinIUgR2xvYmFsIEFQSSBleHBvc2VkOiBJbnZlbnRvcnkuc2hvdygpLCAuaGlkZSgpLCAudG9nZ2xlKCknKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWQr+WKqFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g562J5b6FRE9N5Yqg6L295a6M5oiQ5ZCO5Yid5aeL5YyWXG4kLlNjaGVkdWxlKDAuMSwgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinYwgSW5pdGlhbGl6YXRpb24gZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgfVxufSk7XG4kLk1zZygnW0ludmVudG9yeV0gU2NyaXB0IGxvYWRlZCBzdWNjZXNzZnVsbHknKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==