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
let isDragging = false; // 🔑 全局拖拽状态
let currentDragInterval = null; // 🔑 当前拖拽的定时器引用
let currentMouseUpHandler = null; // 🔑 当前鼠标释放事件处理器引用
let dragCapturePanel = null; // 🔑 拖拽捕获面板
const MAX_SLOTS = 12; // 最大备战席位数
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
    // 🔑 关键：根面板必须允许事件传递
    // 注意：hittest 控制面板是否拦截鼠标事件
    // false = 不拦截，事件会穿透到子元素
    // true = 拦截，事件会被面板接收
    // 我们需要设置为 true，让子元素能接收事件
    rootPanel.hittest = true; // 允许事件传递到子元素
    // 🔑 如果容器已存在，先删除（防止重复创建导致多个槽位）
    const existingContainer = $('#InventoryContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
        containerPanel = null;
        slotsContainer = null;
        $.Msg('[Inventory] 清理旧的容器，防止重复创建');
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
    // 🔑 关键：容器面板必须能接收鼠标事件
    containerPanel.hittest = true;
    // 设置样式
    containerPanel.style.width = '100%';
    containerPanel.style.height = '150px';
    containerPanel.style.horizontalAlign = 'center';
    containerPanel.style.verticalAlign = 'bottom';
    containerPanel.style.backgroundColor = INVENTORY_THEME.background;
    containerPanel.style.borderTop = `2px solid ${INVENTORY_THEME.borderColor}`;
    containerPanel.style.padding = '10px';
    containerPanel.style.flowChildren = 'down';
    containerPanel.style.zIndex = '1000'; // 🔑 确保背包在最上层
    $.Msg(`[Inventory] 创建容器面板: hittest=${containerPanel.hittest}, zIndex=${containerPanel.style.zIndex}`);
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
    closeBtn.style.zIndex = '10001'; // 🔑 确保关闭按钮在最上层，高于捕获面板
    closeBtn.SetPanelEvent('onactivate', () => {
        $.Msg('[Inventory] ✅✅✅ 关闭按钮被点击 - 开始关闭背包');
        Game.EmitSound('General.ButtonClick');
        // 🔑 先清理选择状态（如果有）
        if (isDragging) {
            $.Msg('[Inventory] ⚠️ 关闭时检测到选择状态，先清理');
            clearSelection();
        }
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
    // 🔑 检查是否已存在，避免重复创建
    const existingSlotsContainer = $('#InventorySlotsContainer');
    if (existingSlotsContainer) {
        existingSlotsContainer.DeleteAsync(0);
        $.Msg('[Inventory] 删除旧的槽位容器');
    }
    slotsContainer = $.CreatePanel('Panel', containerPanel, 'InventorySlotsContainer');
    // 计算固定宽度：12个槽位 * (90px宽度 + 10px左右margin) + 10px容器padding = 1210px
    slotsContainer.style.width = '1210px'; // 固定宽度，确保所有槽位紧密排列
    slotsContainer.style.height = '100px';
    slotsContainer.style.flowChildren = 'right';
    slotsContainer.style.horizontalAlign = 'left'; // 靠左对齐，槽位从左到右依次排列
    slotsContainer.style.verticalAlign = 'center';
    slotsContainer.style.padding = '5px';
    // 🔑 关键：容器必须能接收鼠标事件，否则拖拽无法工作
    slotsContainer.hittest = true;
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
    // 🔑 关键：确保可以接收鼠标事件
    slot.hittest = true;
    slot.draggable = false; // Panorama可能不支持draggable属性，使用鼠标事件模拟
    // 🔑 确保容器允许接收事件（重要！）
    if (slotsContainer) {
        slotsContainer.hittest = true; // 容器必须能接收事件
    }
    $.Msg(`[Inventory] 创建槽位 ${index}, hittest=${slot.hittest}`);
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
    emptyLabel.hittest = false; // 子元素不拦截事件
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
    $.Msg(`[Inventory] 🔄 updateSlot 被调用: slotIndex=${slotIndex}, piece=${piece ? piece.displayName : 'null'}`);
    const slot = inventorySlots[slotIndex];
    if (!slot) {
        $.Msg(`[Inventory] ⚠️ updateSlot: 槽位 ${slotIndex} 不存在`);
        return;
    }
    slot.piece = piece;
    const slotPanel = $(`#${slot.panelId}`);
    if (!slotPanel) {
        $.Msg(`[Inventory] ⚠️ updateSlot: 槽位面板 ${slot.panelId} 不存在`);
        return;
    }
    $.Msg(`[Inventory] ✅ updateSlot: 找到槽位面板 ${slot.panelId}，准备${piece ? '更新' : '清空'}`);
    // 清空槽位
    slotPanel.RemoveAndDeleteChildren();
    // 🔑 清空后确保可以接收鼠标事件（防御性编程）
    slotPanel.hittest = true;
    slotPanel.draggable = false; // Panorama可能不支持draggable属性
    if (piece) {
        renderPieceInSlot(slotPanel, piece, slotIndex);
    }
    else {
        // 🔑 清空槽位时，强制恢复默认样式（确保选中高亮被清除）
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
        slotPanel.style.border = `2px solid ${INVENTORY_THEME.borderColor}`;
        slotPanel.style.opacity = '1.0';
        slotPanel.style.transform = 'scale3d(1.0, 1.0, 1.0)';
        slotPanel.style.boxShadow = 'none'; // 🔑 清除稀有度发光效果
        $.Msg(`[Inventory] ✅ updateSlot: 已恢复槽位 ${slotIndex} 的默认样式`);
        // 🔑 清除槽位的事件监听器（空槽不需要点击选择功能）
        slotPanel.SetPanelEvent('onactivate', () => { });
        slotPanel.SetPanelEvent('onmouseover', () => { });
        slotPanel.SetPanelEvent('onmouseout', () => { });
        $.Msg(`[Inventory] ✅ updateSlot: 已清除槽位 ${slotIndex} 的事件监听器`);
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
    // 🔑 确保可以接收鼠标事件
    slotPanel.hittest = true;
    slotPanel.draggable = false; // Panorama可能不支持draggable属性，使用鼠标事件模拟
    $.Msg(`[Inventory] 📦 渲染棋子到槽位 ${slotIndex}: ${piece.displayName}, hittest=${slotPanel.hittest}`);
    // 使用 DOTA2 内置的 DOTAHeroImage 面板显示英雄头像
    const heroImage = $.CreatePanel('DOTAHeroImage', slotPanel, `HeroImage_${slotIndex}`);
    // 头像填满整个槽位
    heroImage.style.width = '100%';
    heroImage.style.height = '100%';
    heroImage.style.horizontalAlign = 'center';
    heroImage.style.verticalAlign = 'center';
    // 🔑 关键：子元素不拦截鼠标事件
    heroImage.hittest = false;
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
    costLabel.hittest = false; // 不拦截事件
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
    nameLabel.hittest = false; // 不拦截事件
    // 设置拖拽事件
    $.Msg(`[Inventory] ⚙️ 为槽位 ${slotIndex} 设置拖拽事件 (${piece.displayName})`);
    $.Msg(`[Inventory] ⚙️ 槽位面板ID: ${slotPanel.id}, hittest: ${slotPanel.hittest}`);
    // 🔑 先设置拖拽事件，避免被其他事件覆盖
    setupDragEvents(slotPanel, piece, slotIndex);
    // 悬停效果
    slotPanel.SetPanelEvent('onmouseover', () => {
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBgHover;
        slotPanel.style.transform = 'scale3d(1.05, 1.05, 1.0)';
    });
    slotPanel.SetPanelEvent('onmouseout', () => {
        if (draggedSlotIndex !== slotIndex) {
            slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
            slotPanel.style.transform = 'scale3d(1.0, 1.0, 1.0)';
        }
    });
}
// ============================================================================
// 拖拽功能
// ============================================================================
// 拖拽状态变量
let dragStartPos = null;
let dragGhostPanel = null;
function setupDragEvents(slotPanel, piece, slotIndex) {
    // 🔑 确保可以接收鼠标事件
    slotPanel.hittest = true;
    // 🔑 确保所有子元素不拦截事件（防御性编程）
    const children = slotPanel.Children();
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child) {
            child.hittest = false;
        }
    }
    $.Msg(`[Inventory] 🎯 注册点击选择事件: 槽位=${slotIndex}, 棋子=${piece.displayName}`);
    // 🔑 点击选择模式：点击背包中的棋子 -> 高亮选中
    const handleClick = () => {
        $.Msg(`[Inventory] 🎯 点击选择棋子: 槽位 ${slotIndex}, 棋子: ${piece.displayName}`);
        $.Msg(`[Inventory] 🎯 当前选中状态: isDragging=${isDragging}, draggedSlotIndex=${draggedSlotIndex}`);
        // 如果点击的是已选中的棋子，取消选择
        if (isDragging && draggedSlotIndex === slotIndex) {
            $.Msg(`[Inventory] 🔄 取消选择`);
            clearSelection();
            return;
        }
        // 🔑 如果已经选中了其他棋子，先取消之前的选择
        if (isDragging && draggedPiece && draggedSlotIndex !== slotIndex) {
            $.Msg(`[Inventory] 🔄 切换选择：从槽位 ${draggedSlotIndex} 切换到槽位 ${slotIndex}`);
            clearSelection();
            // 🔑 等待一帧，确保 clearSelection 完成后再设置新选择
            $.Schedule(0.01, () => {
                setSelection(slotPanel, piece, slotIndex);
            });
            return;
        }
        // 🔑 设置选中状态
        setSelection(slotPanel, piece, slotIndex);
    };
    // 🔑 提取设置选中状态的逻辑为独立函数
    function setSelection(slotPanel, piece, slotIndex) {
        // 设置选中状态
        draggedPiece = piece;
        draggedSlotIndex = slotIndex;
        isDragging = true;
        // 高亮选中的槽位
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBgDragging;
        slotPanel.style.border = `4px solid ${INVENTORY_THEME.borderGold}`;
        slotPanel.style.opacity = '0.8';
        slotPanel.style.transform = 'scale3d(1.1, 1.1, 1.0)';
        $.Msg(`[Inventory] ✅ 已选中棋子: ${piece.displayName}, 请点击棋盘位置进行部署`);
        Game.EmitSound('General.ButtonClick');
        // 🔑 注册全局点击监听，检测点击棋盘位置
        setupBoardClickHandler();
    }
    // 🔑 注册点击事件
    slotPanel.SetPanelEvent('onactivate', handleClick);
    $.Msg(`[Inventory] ✅ 点击选择事件注册完成 - 槽位 ${slotIndex}`);
}
// 点击捕获面板（用于捕获棋盘区域的点击）
let boardClickCapture = null;
// 设置棋盘点击处理器（使用专门的点击捕获面板）
function setupBoardClickHandler() {
    // 🔑 如果已经存在点击捕获面板，先删除
    if (boardClickCapture) {
        boardClickCapture.DeleteAsync(0);
        boardClickCapture = null;
    }
    // 🔑 获取 HUD 根面板（而不是 InventoryRoot）
    // 这样点击捕获面板可以覆盖整个屏幕
    const hudRoot = $.GetContextPanel().GetParent();
    if (!hudRoot) {
        $.Msg(`[Inventory] ❌ 无法获取 HUD 根面板`);
        return;
    }
    // 🔑 创建一个透明的点击捕获面板，只覆盖棋盘区域（不覆盖背包UI）
    const screenHeight = Game.GetScreenHeight();
    const inventoryHeight = 150;
    const boardHeight = screenHeight - inventoryHeight;
    boardClickCapture = $.CreatePanel('Panel', hudRoot, 'BoardClickCapture');
    boardClickCapture.style.width = '100%';
    boardClickCapture.style.height = `${boardHeight}px`;
    boardClickCapture.style.horizontalAlign = 'center';
    boardClickCapture.style.verticalAlign = 'top'; // 🔑 从顶部开始，不覆盖底部的背包UI
    boardClickCapture.style.zIndex = '50'; // 🔑 较低的 zIndex，确保不会阻挡其他 UI
    boardClickCapture.style.backgroundColor = 'transparent';
    boardClickCapture.hittest = true;
    $.Msg(`[Inventory] ✅ 创建棋盘点击捕获面板，高度: ${boardHeight}px，父面板: ${hudRoot.id}`);
    const handleBoardClick = () => {
        // 🔑 首先检查是否有选中棋子
        if (!isDragging || !draggedPiece) {
            $.Msg(`[Inventory] ⚠️ 没有选中棋子，移除捕获面板`);
            if (boardClickCapture) {
                boardClickCapture.DeleteAsync(0);
                boardClickCapture = null;
            }
            currentMouseUpHandler = null;
            return;
        }
        $.Msg(`[Inventory] 🖱️🖱️🖱️ 棋盘点击事件触发`);
        $.Msg(`[Inventory] 🎯 当前状态: isDragging=${isDragging}, draggedPiece=${draggedPiece.displayName}, draggedSlotIndex=${draggedSlotIndex}`);
        const cursorPos = GameUI.GetCursorPosition();
        $.Msg(`[Inventory] 📍 点击位置: (${cursorPos[0]}, ${cursorPos[1]})`);
        // 🔑 点击棋盘区域 -> 部署棋子
        $.Msg(`[Inventory] 🎯 点击棋盘区域，部署棋子到鼠标位置`);
        // 保存当前选中的棋子信息
        const pieceToDeply = draggedPiece;
        const slotToDeply = draggedSlotIndex;
        // 🔑 立即删除捕获面板，避免阻挡后续点击
        if (boardClickCapture) {
            boardClickCapture.DeleteAsync(0);
            boardClickCapture = null;
        }
        currentMouseUpHandler = null;
        $.Msg(`[Inventory] 🔄 部署前立即删除捕获面板`);
        // 部署棋子
        deployPieceAtCursor(pieceToDeply, slotToDeply);
    };
    // 🔑 在捕获面板上注册点击事件
    boardClickCapture.SetPanelEvent('onactivate', handleBoardClick);
    currentMouseUpHandler = handleBoardClick;
    $.Msg(`[Inventory] ✅ 已注册棋盘点击监听器（使用捕获面板）`);
}
// 清除选择状态
function clearSelection() {
    $.Msg(`[Inventory] 🧹 清除选择状态`);
    $.Msg(`[Inventory] 🧹 当前状态: isDragging=${isDragging}, draggedPiece=${draggedPiece ? draggedPiece.displayName : 'null'}, draggedSlotIndex=${draggedSlotIndex}`);
    // 🔑 首先删除点击捕获面板（如果存在）
    if (boardClickCapture) {
        boardClickCapture.DeleteAsync(0);
        boardClickCapture = null;
        $.Msg(`[Inventory] ✅ 已删除棋盘点击捕获面板`);
    }
    currentMouseUpHandler = null;
    $.Msg(`[Inventory] ✅✅✅ 已清除点击捕获状态`);
    // 🔑 恢复选中槽位的样式（无论槽位是否还有棋子）
    if (draggedSlotIndex >= 0) {
        const slotPanel = $(`#InventorySlot_${draggedSlotIndex}`);
        if (slotPanel) {
            const slot = inventorySlots[draggedSlotIndex];
            if (slot) {
                // 🔑 如果槽位还有棋子，使用棋子的稀有度颜色
                // 如果槽位已经被清空，使用默认边框颜色
                let borderColor = INVENTORY_THEME.borderColor; // 默认边框颜色
                if (slot.piece) {
                    borderColor = RARITY_COLORS[slot.piece.rarity.toString()] || INVENTORY_THEME.textRarity.common;
                }
                slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
                slotPanel.style.border = `2px solid ${borderColor}`; // 恢复为默认边框宽度（2px）
                slotPanel.style.opacity = '1.0';
                slotPanel.style.transform = 'scale3d(1.0, 1.0, 1.0)';
                $.Msg(`[Inventory] ✅ 已恢复槽位 ${draggedSlotIndex} 的样式（棋子: ${slot.piece ? slot.piece.displayName : '已清空'}）`);
            }
            else {
                $.Msg(`[Inventory] ⚠️ 槽位 ${draggedSlotIndex} 不存在于 inventorySlots`);
            }
        }
        else {
            $.Msg(`[Inventory] ⚠️ 槽位面板 InventorySlot_${draggedSlotIndex} 不存在`);
        }
    }
    // 清理拖拽图标（如果有）
    if (dragGhostPanel) {
        dragGhostPanel.DeleteAsync(0);
        dragGhostPanel = null;
    }
    // 🔑 删除点击覆盖层（如果存在）
    const overlay = $('#BoardClickOverlay');
    if (overlay) {
        overlay.DeleteAsync(0);
        $.Msg(`[Inventory] ✅ 已删除点击覆盖层`);
    }
    // 重置状态
    draggedPiece = null;
    draggedSlotIndex = -1;
    isDragging = false;
    dragStartPos = null;
    $.Msg(`[Inventory] ✅✅✅ 选择状态已完全清除`);
    $.Msg(`[Inventory] ✅✅✅ 最终状态: isDragging=${isDragging}, draggedPiece=${draggedPiece ? draggedPiece.displayName : 'null'}, draggedSlotIndex=${draggedSlotIndex}, currentMouseUpHandler=${currentMouseUpHandler ? '存在' : 'null'}`);
}
// 清理拖拽状态（全局函数）
// 清理拖拽状态（全局函数，现在调用 clearSelection）
function cleanupDrag() {
    clearSelection();
}
// 创建跟随鼠标的拖拽图标
function createDragGhost(piece, x, y) {
    // 清理旧的拖拽图标
    if (dragGhostPanel) {
        dragGhostPanel.DeleteAsync(0);
        dragGhostPanel = null;
    }
    $.Msg(`[Inventory] 🎯 开始创建拖拽图标，位置: (${x}, ${y})`);
    // 创建拖拽图标面板
    // 🔑 关键：创建一个专门的拖拽容器，禁用自动布局
    const contextPanel = $.GetContextPanel();
    // 检查是否已存在拖拽容器
    let dragContainer = $('#DragGhostContainer');
    if (!dragContainer) {
        dragContainer = $.CreatePanel('Panel', contextPanel, 'DragGhostContainer');
        // 🔑 关键：禁用自动布局，允许子面板自由定位
        dragContainer.style.flowChildren = 'none';
        dragContainer.style.width = '100%';
        dragContainer.style.height = '100%';
        dragContainer.style.horizontalAlign = 'left';
        dragContainer.style.verticalAlign = 'top';
        dragContainer.hittest = false; // 容器不拦截事件
        dragContainer.style.zIndex = '9999';
        $.Msg(`[Inventory] ✅ 创建拖拽容器`);
    }
    dragGhostPanel = $.CreatePanel('Panel', dragContainer, 'DragGhost');
    if (!dragGhostPanel) {
        $.Msg(`[Inventory] ❌❌❌ 无法创建拖拽图标面板！`);
        return;
    }
    dragGhostPanel.style.width = '80px';
    dragGhostPanel.style.height = '80px';
    // 🔑 Panorama UI 不支持 style.x 和 style.y，使用 marginLeft 和 marginTop
    // 🔑 关键：必须先设置对齐方式，再设置margin
    dragGhostPanel.style.horizontalAlign = 'left';
    dragGhostPanel.style.verticalAlign = 'top';
    dragGhostPanel.style.marginLeft = `${x - 40}px`;
    dragGhostPanel.style.marginTop = `${y - 40}px`;
    // 🔑 确保面板在最上层
    dragGhostPanel.style.zIndex = '10000';
    // 🔑 确保面板可见
    dragGhostPanel.style.visibility = 'visible';
    dragGhostPanel.style.backgroundColor = 'rgba(255, 255, 0, 0.8)'; // 🔑 临时改为黄色，便于调试
    dragGhostPanel.style.border = `3px solid ${INVENTORY_THEME.borderGold}`;
    dragGhostPanel.style.borderRadius = '8px';
    dragGhostPanel.style.opacity = '1.0'; // 🔑 临时改为完全不透明，便于调试
    dragGhostPanel.hittest = true; // 🔑 改为true，允许接收鼠标事件
    $.Msg(`[Inventory] 🎯 创建拖拽图标面板，ID: ${dragGhostPanel.id}, 初始位置: (${x - 40}, ${y - 40})`);
    $.Msg(`[Inventory] 🎯 面板属性: width=${dragGhostPanel.style.width}, height=${dragGhostPanel.style.height}, zIndex=${dragGhostPanel.style.zIndex}`);
    // 使用 DOTAHeroImage 显示英雄头像
    const heroImage = $.CreatePanel('DOTAHeroImage', dragGhostPanel, 'DragGhostHeroImage');
    heroImage.style.width = '100%';
    heroImage.style.height = '100%';
    const heroName = getFullHeroName(piece.unitName, piece.id);
    heroImage.heroname = heroName;
    heroImage.heroimagestyle = 'portrait';
    heroImage.hittest = false;
    $.Msg(`[Inventory] ✅ 创建拖拽图标: ${piece.displayName}, 英雄名称: ${heroName}`);
    $.Msg(`[Inventory] ✅ 拖拽图标面板创建完成，面板ID: ${dragGhostPanel.id}`);
}
// 获取槽位的屏幕矩形区域
function getSlotRect(slotIndex) {
    const slotPanel = $(`#InventorySlot_${slotIndex}`);
    if (!slotPanel) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    // 获取槽位的实际布局位置和尺寸
    // 注意：Panorama的布局系统可能不直接提供屏幕坐标
    // 这里使用估算值，实际需要根据容器位置计算
    const slotsContainer = $('#InventorySlotsContainer');
    if (!slotsContainer) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    // 计算槽位在容器中的位置
    // 每个槽位宽度90px + 左右margin 5px = 100px
    const slotWidth = 90;
    const slotHeight = 90;
    const slotSpacing = 10; // 左右间距
    // 获取容器位置（这里需要实际测量，暂时使用估算）
    // 背包在底部，从左侧开始排列
    const containerX = 0; // 需要实际测量
    const containerY = 0; // 需要实际测量
    const slotX = containerX + slotIndex * (slotWidth + slotSpacing);
    const slotY = containerY;
    return {
        x: slotX,
        y: slotY,
        width: slotWidth,
        height: slotHeight
    };
}
// 判断点是否在矩形内
function isPointInRect(px, py, rect) {
    return px >= rect.x &&
        px <= rect.x + rect.width &&
        py >= rect.y &&
        py <= rect.y + rect.height;
}
// 回到原位置（取消部署）
function returnToOriginalPosition(slotIndex) {
    $.Msg(`[Inventory] 🔄 棋子回到原位置: 槽位 ${slotIndex}`);
    // 恢复槽位样式
    const slotPanel = $(`#InventorySlot_${slotIndex}`);
    if (slotPanel) {
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
        slotPanel.style.opacity = '1.0';
    }
    // 播放音效
    Game.EmitSound('General.Cancel');
}
function createDragOverlay(piece) {
    // 创建全屏拖拽提示
    if (!dragOverlay) {
        dragOverlay = $.CreatePanel('Panel', $.GetContextPanel(), 'DragOverlay');
        dragOverlay.style.width = '100%';
        dragOverlay.style.height = '100%';
        dragOverlay.style.horizontalAlign = 'center';
        dragOverlay.style.verticalAlign = 'center';
        dragOverlay.style.zIndex = '9999';
        dragOverlay.hittest = false;
        const hint = $.CreatePanel('Label', dragOverlay, 'DragHint');
        hint.text = '拖拽到棋盘位置部署（释放鼠标在背包外）';
        hint.style.fontSize = '20px';
        hint.style.color = INVENTORY_THEME.textGold;
        hint.style.horizontalAlign = 'center';
        hint.style.verticalAlign = 'top';
        hint.style.marginTop = '50px';
        hint.style.textShadow = '2px 2px 4px #000000';
        hint.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        hint.style.padding = '10px 20px';
        hint.style.borderRadius = '8px';
        hint.hittest = false;
    }
}
function deployPieceAtCursor(piece, slotIndex) {
    $.Msg(`[Inventory] 🎯 部署棋子: ${piece.displayName} 从槽位 ${slotIndex}`);
    // 获取鼠标屏幕位置
    const screenPos = GameUI.GetCursorPosition();
    // 将屏幕坐标转换为世界坐标（地面位置）
    // 注意：GetScreenWorldPosition 需要两个单独的参数
    const worldPos = GameUI.GetScreenWorldPosition(screenPos[0], screenPos[1]);
    if (!worldPos) {
        $.Msg(`[Inventory] ❌ 无法获取世界坐标 (屏幕坐标: ${screenPos[0]}, ${screenPos[1]})`);
        Game.EmitSound('General.Cancel');
        // 部署失败，回到原位置
        returnToOriginalPosition(slotIndex);
        return;
    }
    $.Msg(`[Inventory] 屏幕坐标: (${screenPos[0]}, ${screenPos[1]}) → 世界坐标: (${worldPos[0].toFixed(1)}, ${worldPos[1].toFixed(1)}, ${worldPos[2].toFixed(1)})`);
    // 获取本地玩家ID
    const localPlayerId = Players.GetLocalPlayer();
    // 🔑 发送部署请求到服务端（使用世界坐标）
    // 服务端会验证位置是否可部署，如果成功则从背包删除
    const deployData = {
        playerId: localPlayerId,
        pieceId: piece.id,
        unitName: piece.unitName,
        slotIndex: slotIndex,
        worldX: worldPos[0],
        worldY: worldPos[1],
        worldZ: worldPos[2]
    };
    $.Msg(`[Inventory] 📤 发送部署请求: ${JSON.stringify(deployData)}`);
    try {
        GameEvents.SendCustomGameEventToServer('inventory_deploy_piece', deployData);
        $.Msg(`[Inventory] ✅ 部署请求已发送`);
    }
    catch (e) {
        $.Msg(`[Inventory] ❌ 发送部署请求失败: ${e}`);
        Game.EmitSound('General.Cancel');
        returnToOriginalPosition(slotIndex);
        clearSelection();
    }
    // 播放音效
    Game.EmitSound('General.CastStart');
    // 🔑 单机模式：立即清除选择状态和监听器，允许用户继续操作
    $.Msg(`[Inventory] 🔄 单机模式：部署请求已发送，立即清除选择状态和监听器`);
    // 🔑 删除点击捕获面板（如果存在）
    if (boardClickCapture) {
        boardClickCapture.DeleteAsync(0);
        boardClickCapture = null;
        $.Msg(`[Inventory] ✅ 已删除棋盘点击捕获面板`);
    }
    currentMouseUpHandler = null;
    $.Msg(`[Inventory] ✅✅✅ 已清除点击捕获状态`);
    // 🔑 先恢复槽位样式，再重置状态变量
    // 注意：使用传入的 slotIndex 参数，而不是 draggedSlotIndex 全局变量
    $.Msg(`[Inventory] 🔄 准备恢复槽位 ${slotIndex} 的样式`);
    const slotPanelToRestore = $(`#InventorySlot_${slotIndex}`);
    if (slotPanelToRestore) {
        slotPanelToRestore.style.backgroundColor = INVENTORY_THEME.slotBg;
        slotPanelToRestore.style.border = `2px solid ${INVENTORY_THEME.borderColor}`;
        slotPanelToRestore.style.opacity = '1.0';
        slotPanelToRestore.style.transform = 'scale3d(1.0, 1.0, 1.0)';
        $.Msg(`[Inventory] ✅ 已恢复部署槽位 ${slotIndex} 的样式`);
    }
    else {
        $.Msg(`[Inventory] ⚠️ 未找到槽位面板 InventorySlot_${slotIndex}`);
    }
    // 🔑 删除拖拽相关的面板（可能阻挡点击）
    if (dragGhostPanel) {
        dragGhostPanel.DeleteAsync(0);
        dragGhostPanel = null;
        $.Msg(`[Inventory] ✅ 已删除拖拽图标`);
    }
    if (dragOverlay) {
        dragOverlay.DeleteAsync(0);
        dragOverlay = null;
        $.Msg(`[Inventory] ✅ 已删除拖拽覆盖层`);
    }
    const boardOverlay = $('#BoardClickOverlay');
    if (boardOverlay) {
        boardOverlay.DeleteAsync(0);
        $.Msg(`[Inventory] ✅ 已删除棋盘点击覆盖层`);
    }
    const dragContainer = $('#DragGhostContainer');
    if (dragContainer) {
        dragContainer.DeleteAsync(0);
        $.Msg(`[Inventory] ✅ 已删除拖拽容器`);
    }
    // 重置状态变量
    draggedPiece = null;
    draggedSlotIndex = -1;
    isDragging = false;
    // 立即清空槽位（单机模式，不需要等待服务端确认）
    updateSlot(slotIndex, null);
    $.Msg(`[Inventory] ✅ 单机模式：已清空槽位 ${slotIndex}`);
}
// ============================================================================
// 显示/隐藏
// ============================================================================
function show() {
    $.Msg('[Inventory] 🔍 show() 被调用');
    $.Msg(`[Inventory] rootPanel: ${rootPanel ? '存在' : '不存在'}`);
    $.Msg(`[Inventory] isVisible: ${isVisible}`);
    $.Msg(`[Inventory] currentMouseUpHandler: ${currentMouseUpHandler ? '存在' : '不存在'}`);
    // 🔑 确保在显示背包前，清除任何残留的点击捕获面板
    if (boardClickCapture) {
        $.Msg('[Inventory] ⚠️ 检测到残留的点击捕获面板，正在清除...');
        boardClickCapture.DeleteAsync(0);
        boardClickCapture = null;
        currentMouseUpHandler = null;
    }
    if (!rootPanel) {
        $.Msg('[Inventory] ⚠️ Root panel not initialized, 尝试重新初始化...');
        // 🔑 如果根面板不存在，尝试重新初始化
        initialize();
        rootPanel = $('#InventoryRoot');
        if (!rootPanel) {
            $.Msg('[Inventory] ❌ 重新初始化失败，无法显示背包');
            return;
        }
    }
    // 🔑 确保根面板存在且可见
    rootPanel.style.visibility = 'visible';
    rootPanel.style.opacity = '1.0';
    rootPanel.style.zIndex = '1000'; // 🔑 确保背包在最上层
    rootPanel.hittest = true; // 确保可以接收事件
    isVisible = true;
    $.Msg('[Inventory] ✅✅✅ Inventory shown');
    $.Msg(`[Inventory] 当前玩家ID: ${Players.GetLocalPlayer()}`);
    $.Msg(`[Inventory] 槽位数量: ${inventorySlots.length}`);
    $.Msg(`[Inventory] Root panel hittest: ${rootPanel.hittest}, visibility: ${rootPanel.style.visibility}, opacity: ${rootPanel.style.opacity}`);
    // 🔑 验证槽位面板是否存在且可点击
    for (let i = 0; i < Math.min(3, inventorySlots.length); i++) {
        const slotPanel = $(`#InventorySlot_${i}`);
        if (slotPanel) {
            $.Msg(`[Inventory] 槽位 ${i}: ID=${slotPanel.id}, hittest=${slotPanel.hittest}, visible=${slotPanel.style.visibility}`);
        }
        else {
            $.Msg(`[Inventory] ⚠️ 槽位 ${i} 面板不存在！`);
        }
    }
    // 请求最新数据
    requestInventoryData();
}
function hide() {
    if (!rootPanel)
        return;
    // 🔑 关闭背包时，清理所有拖拽状态和事件监听器
    if (isDragging) {
        $.Msg('[Inventory] ⚠️ 背包关闭时检测到拖拽状态，正在清理...');
        // 停止拖拽定时器
        if (currentDragInterval) {
            $.CancelScheduled(currentDragInterval);
            currentDragInterval = null;
        }
        // 🔑 直接删除面板（删除面板会自动移除所有事件监听器）
        if (dragCapturePanel) {
            dragCapturePanel.DeleteAsync(0);
            dragCapturePanel = null;
        }
        if (dragGhostPanel) {
            dragGhostPanel.DeleteAsync(0);
            dragGhostPanel = null;
        }
        // 🔑 删除点击捕获面板
        if (boardClickCapture) {
            boardClickCapture.DeleteAsync(0);
            boardClickCapture = null;
        }
        currentMouseUpHandler = null;
        // 恢复槽位样式
        if (draggedSlotIndex >= 0) {
            const slot = $(`#InventorySlot_${draggedSlotIndex}`);
            if (slot) {
                slot.style.backgroundColor = INVENTORY_THEME.slotBg;
                slot.style.opacity = '1.0';
            }
        }
        // 清理提示覆盖层
        if (dragOverlay) {
            dragOverlay.DeleteAsync(0);
            dragOverlay = null;
        }
        // 重置状态
        draggedPiece = null;
        draggedSlotIndex = -1;
        isDragging = false;
        dragStartPos = null;
    }
    rootPanel.style.visibility = 'collapse';
    isVisible = false;
    $.Msg('[Inventory] ✅✅✅ Inventory hidden');
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
    // 🔑 清空所有槽位（确保没有残留数据）
    for (let i = 0; i < MAX_SLOTS; i++) {
        updateSlot(i, null);
    }
    // 🔑 更新棋子（只更新有效的棋子，确保数据完整）
    piecesArray.forEach((piece, index) => {
        // 检查棋子数据是否完整
        if (!piece || !piece.id || !piece.unitName) {
            $.Msg(`[Inventory] ⚠️ 跳过无效棋子数据，索引: ${index}`);
            return;
        }
        if (index < MAX_SLOTS) {
            $.Msg(`[Inventory] 更新槽位 ${index}: ${piece.displayName} (${piece.unitName})`);
            updateSlot(index, piece);
        }
        else {
            $.Msg(`[Inventory] ⚠️ 棋子数量超出槽位限制，跳过索引 ${index}: ${piece.displayName}`);
        }
    });
    // 🔑 记录实际更新的槽位数量
    const filledSlots = piecesArray.filter((p, i) => p && p.id && i < MAX_SLOTS).length;
    $.Msg(`[Inventory] 实际填充槽位数量: ${filledSlots}/${MAX_SLOTS}`);
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
        $.Msg(`[Inventory] 📬 部署反馈: ${data.success ? '✅' : '❌'} ${data.message || ''}`);
        $.Msg(`[Inventory] 📬 反馈数据: slotIndex=${data.slotIndex}, success=${data.success}`);
        $.Msg(`[Inventory] 📬 完整反馈数据: ${JSON.stringify(data)}`);
        if (data.success) {
            // 🔑 部署成功 - 立即清理选择状态（在清空槽位之前）
            // 这样可以确保状态被清除，即使槽位已经被清空
            $.Msg(`[Inventory] 🔄 部署成功，开始清理选择状态`);
            clearSelection();
            // 🔑 双重保险：确保点击捕获面板被删除（延迟一帧）
            $.Schedule(0.01, () => {
                if (boardClickCapture) {
                    boardClickCapture.DeleteAsync(0);
                    boardClickCapture = null;
                }
                currentMouseUpHandler = null;
                $.Msg(`[Inventory] ✅✅✅ 双重保险：确保点击捕获面板已清除`);
            });
            // 🔑 然后清空槽位
            if (data.slotIndex !== undefined && data.slotIndex >= 0) {
                $.Msg(`[Inventory] ✅ 部署成功，立即清空槽位 ${data.slotIndex}`);
                updateSlot(data.slotIndex, null); // 立即清空槽位
                // 🔑 延迟请求最新数据，确保服务端已经更新
                $.Schedule(0.1, () => {
                    $.Msg(`[Inventory] 🔄 延迟请求最新背包数据`);
                    requestInventoryData();
                });
            }
            else {
                $.Msg(`[Inventory] ⚠️ 部署成功但 slotIndex 无效: ${data.slotIndex}`);
                // 即使 slotIndex 无效，也请求最新数据
                $.Schedule(0.1, () => {
                    requestInventoryData();
                });
            }
            Game.EmitSound('General.CoinsBig');
        }
        else {
            // 🔑 部署失败 - 回到原位置
            if (data.slotIndex !== undefined && data.slotIndex >= 0) {
                $.Msg(`[Inventory] ❌ 部署失败，恢复槽位 ${data.slotIndex}`);
                returnToOriginalPosition(data.slotIndex);
            }
            Game.EmitSound('General.Cancel');
            // 🔑 部署失败也要清理选择状态
            clearSelection();
            // 🔑 双重保险：确保点击捕获面板被删除
            $.Schedule(0.01, () => {
                if (boardClickCapture) {
                    boardClickCapture.DeleteAsync(0);
                    boardClickCapture = null;
                }
                currentMouseUpHandler = null;
                $.Msg(`[Inventory] ✅✅✅ 双重保险：确保点击捕获面板已清除（部署失败）`);
            });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNiO0FBQ0E7QUFDQSxZQUFZLENBQUM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLENBQUM7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZ0IsQ0FBQyxrQ0FBa0MsZUFBZTtBQUNsRSxrREFBa0Q7QUFDbEQ7QUFDQSxnQkFBZ0IsQ0FBQztBQUNqQixvQkFBb0IsQ0FBQztBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsZ0JBQWdCLENBQUMsMkNBQTJDLGVBQWU7QUFDM0U7QUFDQSxnQkFBZ0IsQ0FBQztBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsQ0FBQyxnQ0FBZ0MsZUFBZTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLENBQUM7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLENBQUM7QUFDakIsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0EsS0FBSztBQUNMLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUMsNENBQTRDLE1BQU07QUFDM0Q7QUFDQSxDQUFDO0FBQ0QsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xcaW52ZW50b3J5XFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBAdHMtbm9jaGVja1xuLyoqXG4gKiBJbnZlbnRvcnkgVUkgLSDog4zljIXnlYzpnaJcbiAqIOeUqOS6juaYvuekuuWSjOeuoeeQhueOqeWutueahOaji+WtkOmYteWuuVxuICog5pSv5oyB5ouW5ou96YOo572y5qOL5a2QXG4gKi9cbiQuTXNnKCfwn46SIEludmVudG9yeSBzY3JpcHQgaXMgZXhlY3V0aW5nIScpO1xuR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOS4u+mimOmFjee9rlxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuY29uc3QgSU5WRU5UT1JZX1RIRU1FID0ge1xuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDE1LCAyMywgNDIsIDAuOTUpJyxcbiAgICBwYW5lbEJnOiAncmdiYSgzMywgMzQsIDMxLCAwLjk4KScsXG4gICAgc2xvdEJnOiAncmdiYSg1MCwgNTAsIDUwLCAwLjgpJyxcbiAgICBzbG90QmdIb3ZlcjogJ3JnYmEoNzAsIDcwLCA3MCwgMC45KScsXG4gICAgc2xvdEJnRHJhZ2dpbmc6ICdyZ2JhKDEwMCwgMTQ5LCAyMzcsIDAuNSknLFxuICAgIGJvcmRlckNvbG9yOiAncmdiYSg1OSwgMTMwLCAyNDYsIDAuNiknLFxuICAgIGJvcmRlckdvbGQ6ICdyZ2JhKDI1NSwgMjE1LCAwLCAwLjgpJyxcbiAgICB0ZXh0UHJpbWFyeTogJyNmZmZmZmYnLFxuICAgIHRleHRTZWNvbmRhcnk6ICcjYjhiOGI4JyxcbiAgICB0ZXh0R29sZDogJyNmZmQ3MDAnLFxuICAgIHRleHRSYXJpdHk6IHtcbiAgICAgICAgY29tbW9uOiAnI2ZmZmZmZicsXG4gICAgICAgIHVuY29tbW9uOiAnIzRjYWY1MCcsXG4gICAgICAgIHJhcmU6ICcjMjE5NmYzJyxcbiAgICAgICAgZXBpYzogJyM5YzI3YjAnLFxuICAgICAgICBsZWdlbmRhcnk6ICcjZmY5ODAwJ1xuICAgIH1cbn07XG4vLyDnqIDmnInluqbpopzoibLmmKDlsIRcbmNvbnN0IFJBUklUWV9DT0xPUlMgPSB7XG4gICAgJzEnOiBJTlZFTlRPUllfVEhFTUUudGV4dFJhcml0eS5jb21tb24sXG4gICAgJzInOiBJTlZFTlRPUllfVEhFTUUudGV4dFJhcml0eS51bmNvbW1vbixcbiAgICAnMyc6IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LnJhcmUsXG4gICAgJzQnOiBJTlZFTlRPUllfVEhFTUUudGV4dFJhcml0eS5lcGljLFxuICAgICc1JzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkubGVnZW5kYXJ5XG59O1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5YWo5bGA54q25oCBXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgcm9vdFBhbmVsID0gbnVsbDtcbmxldCBjb250YWluZXJQYW5lbCA9IG51bGw7XG5sZXQgc2xvdHNDb250YWluZXIgPSBudWxsO1xubGV0IGlzVmlzaWJsZSA9IGZhbHNlO1xubGV0IGludmVudG9yeVNsb3RzID0gW107XG5sZXQgZHJhZ2dlZFBpZWNlID0gbnVsbDtcbmxldCBkcmFnZ2VkU2xvdEluZGV4ID0gLTE7XG5sZXQgZHJhZ092ZXJsYXkgPSBudWxsO1xubGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTsgLy8g8J+UkSDlhajlsYDmi5bmi73nirbmgIFcbmxldCBjdXJyZW50RHJhZ0ludGVydmFsID0gbnVsbDsgLy8g8J+UkSDlvZPliY3mi5bmi73nmoTlrprml7blmajlvJXnlKhcbmxldCBjdXJyZW50TW91c2VVcEhhbmRsZXIgPSBudWxsOyAvLyDwn5SRIOW9k+WJjem8oOagh+mHiuaUvuS6i+S7tuWkhOeQhuWZqOW8leeUqFxubGV0IGRyYWdDYXB0dXJlUGFuZWwgPSBudWxsOyAvLyDwn5SRIOaLluaLveaNleiOt+mdouadv1xuY29uc3QgTUFYX1NMT1RTID0gMTI7IC8vIOacgOWkp+Wkh+aImOW4reS9jeaVsFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5Yid5aeL5YyWXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSBJbml0aWFsaXppbmcuLi4nKTtcbiAgICAvLyDojrflj5bmiJbliJvlu7rmoLnpnaLmnb9cbiAgICByb290UGFuZWwgPSAkKCcjSW52ZW50b3J5Um9vdCcpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgIHJvb3RQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgJC5HZXRDb250ZXh0UGFuZWwoKSwgJ0ludmVudG9yeVJvb3QnKTtcbiAgICAgICAgcm9vdFBhbmVsLkFkZENsYXNzKCdpbnZlbnRvcnlfcm9vdCcpO1xuICAgIH1cbiAgICAvLyDwn5SRIOWFs+mUru+8muaguemdouadv+W/hemhu+WFgeiuuOS6i+S7tuS8oOmAklxuICAgIC8vIOazqOaEj++8mmhpdHRlc3Qg5o6n5Yi26Z2i5p2/5piv5ZCm5oum5oiq6byg5qCH5LqL5Lu2XG4gICAgLy8gZmFsc2UgPSDkuI3mi6bmiKrvvIzkuovku7bkvJrnqb/pgI/liLDlrZDlhYPntKBcbiAgICAvLyB0cnVlID0g5oum5oiq77yM5LqL5Lu25Lya6KKr6Z2i5p2/5o6l5pS2XG4gICAgLy8g5oiR5Lus6ZyA6KaB6K6+572u5Li6IHRydWXvvIzorqnlrZDlhYPntKDog73mjqXmlLbkuovku7ZcbiAgICByb290UGFuZWwuaGl0dGVzdCA9IHRydWU7IC8vIOWFgeiuuOS6i+S7tuS8oOmAkuWIsOWtkOWFg+e0oFxuICAgIC8vIPCflJEg5aaC5p6c5a655Zmo5bey5a2Y5Zyo77yM5YWI5Yig6Zmk77yI6Ziy5q2i6YeN5aSN5Yib5bu65a+86Ie05aSa5Liq5qe95L2N77yJXG4gICAgY29uc3QgZXhpc3RpbmdDb250YWluZXIgPSAkKCcjSW52ZW50b3J5Q29udGFpbmVyJyk7XG4gICAgaWYgKGV4aXN0aW5nQ29udGFpbmVyKSB7XG4gICAgICAgIGV4aXN0aW5nQ29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICBjb250YWluZXJQYW5lbCA9IG51bGw7XG4gICAgICAgIHNsb3RzQ29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIOa4heeQhuaXp+eahOWuueWZqO+8jOmYsuatoumHjeWkjeWIm+W7uicpO1xuICAgIH1cbiAgICAvLyDliJvlu7rlrrnlmahcbiAgICBjcmVhdGVDb250YWluZXIoKTtcbiAgICAvLyDliJ3lp4vljJbmj5Lmp71cbiAgICBpbml0aWFsaXplU2xvdHMoKTtcbiAgICAvLyDms6jlhozkuovku7bnm5HlkKxcbiAgICByZWdpc3RlckV2ZW50SGFuZGxlcnMoKTtcbiAgICAvLyDmmrTpnLLlhajlsYBBUElcbiAgICBleHBvc2VHbG9iYWxBUEkoKTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyFIEluaXRpYWxpemF0aW9uIGNvbXBsZXRlJyk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBVSSDliJvlu7pcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lcigpIHtcbiAgICBjb250YWluZXJQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnSW52ZW50b3J5Q29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyUGFuZWwuQWRkQ2xhc3MoJ2ludmVudG9yeV9jb250YWluZXInKTtcbiAgICAvLyDwn5SRIOWFs+mUru+8muWuueWZqOmdouadv+W/hemhu+iDveaOpeaUtum8oOagh+S6i+S7tlxuICAgIGNvbnRhaW5lclBhbmVsLmhpdHRlc3QgPSB0cnVlO1xuICAgIC8vIOiuvue9ruagt+W8j1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLmhlaWdodCA9ICcxNTBweCc7XG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdib3R0b20nO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IElOVkVOVE9SWV9USEVNRS5iYWNrZ3JvdW5kO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLmJvcmRlclRvcCA9IGAycHggc29saWQgJHtJTlZFTlRPUllfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS56SW5kZXggPSAnMTAwMCc7IC8vIPCflJEg56Gu5L+d6IOM5YyF5Zyo5pyA5LiK5bGCXG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOWIm+W7uuWuueWZqOmdouadvzogaGl0dGVzdD0ke2NvbnRhaW5lclBhbmVsLmhpdHRlc3R9LCB6SW5kZXg9JHtjb250YWluZXJQYW5lbC5zdHlsZS56SW5kZXh9YCk7XG4gICAgLy8g5Yib5bu65qCH6aKYXG4gICAgY29uc3QgaGVhZGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXJQYW5lbCwgJ0ludmVudG9yeUhlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGhlYWRlci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5VGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+aji+WtkOiDjOWMhSc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dEdvbGQ7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgdGl0bGUuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTBweCc7XG4gICAgY29uc3QgaGludCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5SGludCcpO1xuICAgIGhpbnQudGV4dCA9ICfmi5bmi73mo4vlrZDliLDmo4vnm5jpg6jnvbInO1xuICAgIGhpbnQuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgaGludC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGhpbnQuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICBoaW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoaW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIC8vIOWIm+W7uuWFs+mXreaMiemSrlxuICAgIGNvbnN0IGNsb3NlQnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgaGVhZGVyLCAnSW52ZW50b3J5Q2xvc2VCdG4nKTtcbiAgICBjbG9zZUJ0bi50ZXh0ID0gJ+KclSc7XG4gICAgY2xvc2VCdG4uc3R5bGUud2lkdGggPSAnMzBweCc7XG4gICAgY2xvc2VCdG4uc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgY2xvc2VCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuYm9yZGVyID0gYDFweCBzb2xpZCAke0lOVkVOVE9SWV9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIGNsb3NlQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc0cHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgY2xvc2VCdG4uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLnN0eWxlLnpJbmRleCA9ICcxMDAwMSc7IC8vIPCflJEg56Gu5L+d5YWz6Zet5oyJ6ZKu5Zyo5pyA5LiK5bGC77yM6auY5LqO5o2V6I636Z2i5p2/XG4gICAgY2xvc2VCdG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKcheKcheKchSDlhbPpl63mjInpkq7ooqvngrnlh7sgLSDlvIDlp4vlhbPpl63og4zljIUnKTtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiAgICAgICAgLy8g8J+UkSDlhYjmuIXnkIbpgInmi6nnirbmgIHvvIjlpoLmnpzmnInvvIlcbiAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDimqDvuI8g5YWz6Zet5pe25qOA5rWL5Yiw6YCJ5oup54q25oCB77yM5YWI5riF55CGJyk7XG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGhpZGUoKTtcbiAgICB9KTtcbiAgICBjbG9zZUJ0bi5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgY2xvc2VCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjM5LCA2OCwgNjgsIDAuOCknO1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICB9KTtcbiAgICBjbG9zZUJ0bi5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpJztcbiAgICAgICAgY2xvc2VCdG4uc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICB9KTtcbiAgICAvLyDliJvlu7rmj5Lmp73lrrnlmahcbiAgICAvLyDwn5SRIOajgOafpeaYr+WQpuW3suWtmOWcqO+8jOmBv+WFjemHjeWkjeWIm+W7ulxuICAgIGNvbnN0IGV4aXN0aW5nU2xvdHNDb250YWluZXIgPSAkKCcjSW52ZW50b3J5U2xvdHNDb250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdTbG90c0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ1Nsb3RzQ29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0g5Yig6Zmk5pen55qE5qe95L2N5a655ZmoJyk7XG4gICAgfVxuICAgIHNsb3RzQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXJQYW5lbCwgJ0ludmVudG9yeVNsb3RzQ29udGFpbmVyJyk7XG4gICAgLy8g6K6h566X5Zu65a6a5a695bqm77yaMTLkuKrmp73kvY0gKiAoOTBweOWuveW6piArIDEwcHjlt6blj7NtYXJnaW4pICsgMTBweOWuueWZqHBhZGRpbmcgPSAxMjEwcHhcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMjEwcHgnOyAvLyDlm7rlrprlrr3luqbvvIznoa7kv53miYDmnInmp73kvY3ntKflr4bmjpLliJdcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwcHgnO1xuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgc2xvdHNDb250YWluZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2xlZnQnOyAvLyDpnaDlt6blr7npvZDvvIzmp73kvY3ku47lt6bliLDlj7Pkvp3mrKHmjpLliJdcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgc2xvdHNDb250YWluZXIuc3R5bGUucGFkZGluZyA9ICc1cHgnO1xuICAgIC8vIPCflJEg5YWz6ZSu77ya5a655Zmo5b+F6aG76IO95o6l5pS26byg5qCH5LqL5Lu277yM5ZCm5YiZ5ouW5ou95peg5rOV5bel5L2cXG4gICAgc2xvdHNDb250YWluZXIuaGl0dGVzdCA9IHRydWU7XG59XG5mdW5jdGlvbiBpbml0aWFsaXplU2xvdHMoKSB7XG4gICAgaWYgKCFzbG90c0NvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGludmVudG9yeVNsb3RzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfU0xPVFM7IGkrKykge1xuICAgICAgICBjb25zdCBzbG90UGFuZWwgPSBjcmVhdGVTbG90UGFuZWwoaSk7XG4gICAgICAgIGNvbnN0IHNsb3QgPSB7XG4gICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgIHBpZWNlOiBudWxsLFxuICAgICAgICAgICAgcGFuZWxJZDogc2xvdFBhbmVsLmlkXG4gICAgICAgIH07XG4gICAgICAgIGludmVudG9yeVNsb3RzLnB1c2goc2xvdCk7XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSBDcmVhdGVkICR7TUFYX1NMT1RTfSBzbG90c2ApO1xufVxuZnVuY3Rpb24gY3JlYXRlU2xvdFBhbmVsKGluZGV4KSB7XG4gICAgY29uc3Qgc2xvdCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc2xvdHNDb250YWluZXIsIGBJbnZlbnRvcnlTbG90XyR7aW5kZXh9YCk7XG4gICAgc2xvdC5BZGRDbGFzcygnaW52ZW50b3J5X3Nsb3QnKTtcbiAgICAvLyDwn5SRIOWFs+mUru+8muehruS/neWPr+S7peaOpeaUtum8oOagh+S6i+S7tlxuICAgIHNsb3QuaGl0dGVzdCA9IHRydWU7XG4gICAgc2xvdC5kcmFnZ2FibGUgPSBmYWxzZTsgLy8gUGFub3JhbWHlj6/og73kuI3mlK/mjIFkcmFnZ2FibGXlsZ7mgKfvvIzkvb/nlKjpvKDmoIfkuovku7bmqKHmi59cbiAgICAvLyDwn5SRIOehruS/neWuueWZqOWFgeiuuOaOpeaUtuS6i+S7tu+8iOmHjeimge+8ge+8iVxuICAgIGlmIChzbG90c0NvbnRhaW5lcikge1xuICAgICAgICBzbG90c0NvbnRhaW5lci5oaXR0ZXN0ID0gdHJ1ZTsgLy8g5a655Zmo5b+F6aG76IO95o6l5pS25LqL5Lu2XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSDliJvlu7rmp73kvY0gJHtpbmRleH0sIGhpdHRlc3Q9JHtzbG90LmhpdHRlc3R9YCk7XG4gICAgLy8g6K6+572u5qC35byPIC0g5LiN5L2/55SoIGZsb3dDaGlsZHJlbu+8jOiuqeWtkOWFg+e0oOWPr+S7peWPoOWKoOWumuS9jVxuICAgIHNsb3Quc3R5bGUud2lkdGggPSAnOTBweCc7XG4gICAgc2xvdC5zdHlsZS5oZWlnaHQgPSAnOTBweCc7XG4gICAgc2xvdC5zdHlsZS5tYXJnaW4gPSAnNXB4JztcbiAgICBzbG90LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IElOVkVOVE9SWV9USEVNRS5zbG90Qmc7XG4gICAgc2xvdC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7SU5WRU5UT1JZX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgc2xvdC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICAvLyDkuI3orr7nva4gZmxvd0NoaWxkcmVu77yM5L2/55So57ud5a+55a6a5L2N5Y+g5Yqg5a2Q5YWD57SgXG4gICAgLy8g5Yib5bu656m65qe95o+Q56S6XG4gICAgY29uc3QgZW1wdHlMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc2xvdCwgYEVtcHR5TGFiZWxfJHtpbmRleH1gKTtcbiAgICBlbXB0eUxhYmVsLnRleHQgPSAnKyc7XG4gICAgZW1wdHlMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICczMnB4JztcbiAgICBlbXB0eUxhYmVsLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgZW1wdHlMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBlbXB0eUxhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBlbXB0eUxhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC4zJztcbiAgICBlbXB0eUxhYmVsLmhpdHRlc3QgPSBmYWxzZTsgLy8g5a2Q5YWD57Sg5LiN5oum5oiq5LqL5Lu2XG4gICAgcmV0dXJuIHNsb3Q7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDovoXliqnlh73mlbBcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8qKlxuICog6I635Y+W5a6M5pW055qE6Iux6ZuE5ZCN56ew77yIbnBjX2RvdGFfaGVyb194eHgg5qC85byP77yJXG4gKiBET1RBSGVyb0ltYWdlIOmdouadv+mcgOimgeWujOaVtOeahOiLsembhOWQjeensFxuICogQHBhcmFtIHVuaXROYW1lIERPVEEyIOWNleS9jeWQjSAobnBjX2RvdGFfaGVyb194eHgpXG4gKiBAcGFyYW0gcGllY2VJZCDmo4vlrZBJRCAo6YCa5bi45piv55+t5ZCN56ew5aaCIGF4ZSlcbiAqL1xuZnVuY3Rpb24gZ2V0RnVsbEhlcm9OYW1lKHVuaXROYW1lLCBwaWVjZUlkKSB7XG4gICAgLy8g5aaC5p6cIHVuaXROYW1lIOW3sue7j+aYr+WujOaVtOagvOW8j++8jOebtOaOpei/lOWbnlxuICAgIGlmICh1bml0TmFtZSAmJiB1bml0TmFtZS5zdGFydHNXaXRoKCducGNfZG90YV9oZXJvXycpKSB7XG4gICAgICAgIHJldHVybiB1bml0TmFtZTtcbiAgICB9XG4gICAgLy8g5aaC5p6cIHBpZWNlSWQg5piv55+t5ZCN56ew77yM5re75Yqg5YmN57yAXG4gICAgaWYgKHBpZWNlSWQgJiYgIXBpZWNlSWQuc3RhcnRzV2l0aCgnbnBjXycpKSB7XG4gICAgICAgIHJldHVybiBgbnBjX2RvdGFfaGVyb18ke3BpZWNlSWR9YDtcbiAgICB9XG4gICAgLy8g5aaC5p6cIHBpZWNlSWQg5bey57uP5piv5a6M5pW05qC85byPXG4gICAgaWYgKHBpZWNlSWQgJiYgcGllY2VJZC5zdGFydHNXaXRoKCducGNfZG90YV9oZXJvXycpKSB7XG4gICAgICAgIHJldHVybiBwaWVjZUlkO1xuICAgIH1cbiAgICAvLyDlm57pgIDvvJrlsJ3or5Xkvb/nlKggdW5pdE5hbWUg5oiWIHBpZWNlSWRcbiAgICByZXR1cm4gdW5pdE5hbWUgfHwgYG5wY19kb3RhX2hlcm9fJHtwaWVjZUlkfWAgfHwgJ25wY19kb3RhX2hlcm9fYXhlJztcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOaji+WtkOaYvuekulxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gdXBkYXRlU2xvdChzbG90SW5kZXgsIHBpZWNlKSB7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIPCflIQgdXBkYXRlU2xvdCDooqvosIPnlKg6IHNsb3RJbmRleD0ke3Nsb3RJbmRleH0sIHBpZWNlPSR7cGllY2UgPyBwaWVjZS5kaXNwbGF5TmFtZSA6ICdudWxsJ31gKTtcbiAgICBjb25zdCBzbG90ID0gaW52ZW50b3J5U2xvdHNbc2xvdEluZGV4XTtcbiAgICBpZiAoIXNsb3QpIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKaoO+4jyB1cGRhdGVTbG90OiDmp73kvY0gJHtzbG90SW5kZXh9IOS4jeWtmOWcqGApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNsb3QucGllY2UgPSBwaWVjZTtcbiAgICBjb25zdCBzbG90UGFuZWwgPSAkKGAjJHtzbG90LnBhbmVsSWR9YCk7XG4gICAgaWYgKCFzbG90UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKaoO+4jyB1cGRhdGVTbG90OiDmp73kvY3pnaLmnb8gJHtzbG90LnBhbmVsSWR9IOS4jeWtmOWcqGApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUgdXBkYXRlU2xvdDog5om+5Yiw5qe95L2N6Z2i5p2/ICR7c2xvdC5wYW5lbElkfe+8jOWHhuWkhyR7cGllY2UgPyAn5pu05pawJyA6ICfmuIXnqbonfWApO1xuICAgIC8vIOa4heepuuanveS9jVxuICAgIHNsb3RQYW5lbC5SZW1vdmVBbmREZWxldGVDaGlsZHJlbigpO1xuICAgIC8vIPCflJEg5riF56m65ZCO56Gu5L+d5Y+v5Lul5o6l5pS26byg5qCH5LqL5Lu277yI6Ziy5b6h5oCn57yW56iL77yJXG4gICAgc2xvdFBhbmVsLmhpdHRlc3QgPSB0cnVlO1xuICAgIHNsb3RQYW5lbC5kcmFnZ2FibGUgPSBmYWxzZTsgLy8gUGFub3JhbWHlj6/og73kuI3mlK/mjIFkcmFnZ2FibGXlsZ7mgKdcbiAgICBpZiAocGllY2UpIHtcbiAgICAgICAgcmVuZGVyUGllY2VJblNsb3Qoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIPCflJEg5riF56m65qe95L2N5pe277yM5by65Yi25oGi5aSN6buY6K6k5qC35byP77yI56Gu5L+d6YCJ5Lit6auY5Lqu6KKr5riF6Zmk77yJXG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnO1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke0lOVkVOVE9SWV9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUub3BhY2l0eSA9ICcxLjAnO1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMS4wLCAxLjAsIDEuMCknO1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnOyAvLyDwn5SRIOa4hemZpOeogOacieW6puWPkeWFieaViOaenFxuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIHVwZGF0ZVNsb3Q6IOW3suaBouWkjeanveS9jSAke3Nsb3RJbmRleH0g55qE6buY6K6k5qC35byPYCk7XG4gICAgICAgIC8vIPCflJEg5riF6Zmk5qe95L2N55qE5LqL5Lu255uR5ZCs5Zmo77yI56m65qe95LiN6ZyA6KaB54K55Ye76YCJ5oup5Yqf6IO977yJXG4gICAgICAgIHNsb3RQYW5lbC5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4geyB9KTtcbiAgICAgICAgc2xvdFBhbmVsLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4geyB9KTtcbiAgICAgICAgc2xvdFBhbmVsLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7IH0pO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIHVwZGF0ZVNsb3Q6IOW3sua4hemZpOanveS9jSAke3Nsb3RJbmRleH0g55qE5LqL5Lu255uR5ZCs5ZmoYCk7XG4gICAgICAgIC8vIOaBouWkjeepuuanveaPkOekulxuICAgICAgICBjb25zdCBlbXB0eUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90UGFuZWwsIGBFbXB0eUxhYmVsXyR7c2xvdEluZGV4fWApO1xuICAgICAgICBlbXB0eUxhYmVsLnRleHQgPSAnKyc7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMzJweCc7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICAgICAgZW1wdHlMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgZW1wdHlMYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgICAgICBlbXB0eUxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW5kZXJQaWVjZUluU2xvdChzbG90UGFuZWwsIHBpZWNlLCBzbG90SW5kZXgpIHtcbiAgICAvLyDwn5SRIOehruS/neWPr+S7peaOpeaUtum8oOagh+S6i+S7tlxuICAgIHNsb3RQYW5lbC5oaXR0ZXN0ID0gdHJ1ZTtcbiAgICBzbG90UGFuZWwuZHJhZ2dhYmxlID0gZmFsc2U7IC8vIFBhbm9yYW1h5Y+v6IO95LiN5pSv5oyBZHJhZ2dhYmxl5bGe5oCn77yM5L2/55So6byg5qCH5LqL5Lu25qih5oufXG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfk6Yg5riy5p+T5qOL5a2Q5Yiw5qe95L2NICR7c2xvdEluZGV4fTogJHtwaWVjZS5kaXNwbGF5TmFtZX0sIGhpdHRlc3Q9JHtzbG90UGFuZWwuaGl0dGVzdH1gKTtcbiAgICAvLyDkvb/nlKggRE9UQTIg5YaF572u55qEIERPVEFIZXJvSW1hZ2Ug6Z2i5p2/5pi+56S66Iux6ZuE5aS05YOPXG4gICAgY29uc3QgaGVyb0ltYWdlID0gJC5DcmVhdGVQYW5lbCgnRE9UQUhlcm9JbWFnZScsIHNsb3RQYW5lbCwgYEhlcm9JbWFnZV8ke3Nsb3RJbmRleH1gKTtcbiAgICAvLyDlpLTlg4/loavmu6HmlbTkuKrmp73kvY1cbiAgICBoZXJvSW1hZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgaGVyb0ltYWdlLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBoZXJvSW1hZ2Uuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVyb0ltYWdlLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDwn5SRIOWFs+mUru+8muWtkOWFg+e0oOS4jeaLpuaIqum8oOagh+S6i+S7tlxuICAgIGhlcm9JbWFnZS5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgLy8g6I635Y+W5a6M5pW055qE6Iux6ZuE5ZCN56ew77yIbnBjX2RvdGFfaGVyb194eHgg5qC85byP77yJXG4gICAgY29uc3QgaGVyb05hbWUgPSBnZXRGdWxsSGVyb05hbWUocGllY2UudW5pdE5hbWUsIHBpZWNlLmlkKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g6K6+572u6Iux6ZuE5Zu+5qCHOiAke2hlcm9OYW1lfWApO1xuICAgIC8vIOiuvue9ruiLsembhOWQjeensOWSjOWbvuWDj+agt+W8j1xuICAgIC8vIERPVEFIZXJvSW1hZ2Ug5bGe5oCnOiBoZXJvbmFtZSwgaGVyb2lkLCBoZXJvaW1hZ2VzdHlsZVxuICAgIGhlcm9JbWFnZS5oZXJvbmFtZSA9IGhlcm9OYW1lO1xuICAgIGhlcm9JbWFnZS5oZXJvaW1hZ2VzdHlsZSA9ICdwb3J0cmFpdCc7IC8vIHBvcnRyYWl0OiA3MXg5NCwgaWNvbjogMzJ4MzIsIGxhbmRzY2FwZTogMTI4eDcyXG4gICAgLy8g56iA5pyJ5bqm6L655qGGXG4gICAgY29uc3QgcmFyaXR5Q29sb3IgPSBSQVJJVFlfQ09MT1JTW3BpZWNlLnJhcml0eS50b1N0cmluZygpXSB8fCBJTlZFTlRPUllfVEhFTUUudGV4dFJhcml0eS5jb21tb247XG4gICAgc2xvdFBhbmVsLnN0eWxlLmJvcmRlciA9IGAzcHggc29saWQgJHtyYXJpdHlDb2xvcn1gO1xuICAgIHNsb3RQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSBgMCAwIDEwcHggJHtyYXJpdHlDb2xvcn1gO1xuICAgIC8vIOi0ueeUqOagh+etvlxuICAgIGNvbnN0IGNvc3RMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc2xvdFBhbmVsLCBgQ29zdF8ke3Nsb3RJbmRleH1gKTtcbiAgICBjb3N0TGFiZWwudGV4dCA9IGAke3BpZWNlLmNvc3R98J+SsGA7XG4gICAgY29zdExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0R29sZDtcbiAgICBjb3N0TGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBjb3N0TGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2xlZnQnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgY29zdExhYmVsLnN0eWxlLm1hcmdpbkxlZnQgPSAnNXB4JztcbiAgICBjb3N0TGFiZWwuc3R5bGUubWFyZ2luVG9wID0gJzVweCc7XG4gICAgY29zdExhYmVsLnN0eWxlLnRleHRTaGFkb3cgPSAnMXB4IDFweCAycHggIzAwMDAwMCc7XG4gICAgY29zdExhYmVsLmhpdHRlc3QgPSBmYWxzZTsgLy8g5LiN5oum5oiq5LqL5Lu2XG4gICAgLy8g5ZCN56ew5qCH562+77yI5oKs5YGc5pe25pi+56S677yJXG4gICAgY29uc3QgbmFtZUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90UGFuZWwsIGBOYW1lXyR7c2xvdEluZGV4fWApO1xuICAgIG5hbWVMYWJlbC50ZXh0ID0gcGllY2UuZGlzcGxheU5hbWU7XG4gICAgbmFtZUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICBuYW1lTGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbmFtZUxhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICBuYW1lTGFiZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzJweCc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLnRleHRTaGFkb3cgPSAnMXB4IDFweCAzcHggIzAwMDAwMCc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuNyknO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5wYWRkaW5nID0gJzJweCA1cHgnO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnM3B4JztcbiAgICBuYW1lTGFiZWwuaGl0dGVzdCA9IGZhbHNlOyAvLyDkuI3mi6bmiKrkuovku7ZcbiAgICAvLyDorr7nva7mi5bmi73kuovku7ZcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g4pqZ77iPIOS4uuanveS9jSAke3Nsb3RJbmRleH0g6K6+572u5ouW5ou95LqL5Lu2ICgke3BpZWNlLmRpc3BsYXlOYW1lfSlgKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g4pqZ77iPIOanveS9jemdouadv0lEOiAke3Nsb3RQYW5lbC5pZH0sIGhpdHRlc3Q6ICR7c2xvdFBhbmVsLmhpdHRlc3R9YCk7XG4gICAgLy8g8J+UkSDlhYjorr7nva7mi5bmi73kuovku7bvvIzpgb/lhY3ooqvlhbbku5bkuovku7bopobnm5ZcbiAgICBzZXR1cERyYWdFdmVudHMoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KTtcbiAgICAvLyDmgqzlgZzmlYjmnpxcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25tb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnSG92ZXI7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgxLjA1LCAxLjA1LCAxLjApJztcbiAgICB9KTtcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25tb3VzZW91dCcsICgpID0+IHtcbiAgICAgICAgaWYgKGRyYWdnZWRTbG90SW5kZXggIT09IHNsb3RJbmRleCkge1xuICAgICAgICAgICAgc2xvdFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IElOVkVOVE9SWV9USEVNRS5zbG90Qmc7XG4gICAgICAgICAgICBzbG90UGFuZWwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMS4wLCAxLjAsIDEuMCknO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDmi5bmi73lip/og71cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOaLluaLveeKtuaAgeWPmOmHj1xubGV0IGRyYWdTdGFydFBvcyA9IG51bGw7XG5sZXQgZHJhZ0dob3N0UGFuZWwgPSBudWxsO1xuZnVuY3Rpb24gc2V0dXBEcmFnRXZlbnRzKHNsb3RQYW5lbCwgcGllY2UsIHNsb3RJbmRleCkge1xuICAgIC8vIPCflJEg56Gu5L+d5Y+v5Lul5o6l5pS26byg5qCH5LqL5Lu2XG4gICAgc2xvdFBhbmVsLmhpdHRlc3QgPSB0cnVlO1xuICAgIC8vIPCflJEg56Gu5L+d5omA5pyJ5a2Q5YWD57Sg5LiN5oum5oiq5LqL5Lu277yI6Ziy5b6h5oCn57yW56iL77yJXG4gICAgY29uc3QgY2hpbGRyZW4gPSBzbG90UGFuZWwuQ2hpbGRyZW4oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgY2hpbGQuaGl0dGVzdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIOazqOWGjOeCueWHu+mAieaLqeS6i+S7tjog5qe95L2NPSR7c2xvdEluZGV4fSwg5qOL5a2QPSR7cGllY2UuZGlzcGxheU5hbWV9YCk7XG4gICAgLy8g8J+UkSDngrnlh7vpgInmi6nmqKHlvI/vvJrngrnlh7vog4zljIXkuK3nmoTmo4vlrZAgLT4g6auY5Lqu6YCJ5LitXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIOeCueWHu+mAieaLqeaji+WtkDog5qe95L2NICR7c2xvdEluZGV4fSwg5qOL5a2QOiAke3BpZWNlLmRpc3BsYXlOYW1lfWApO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+OryDlvZPliY3pgInkuK3nirbmgIE6IGlzRHJhZ2dpbmc9JHtpc0RyYWdnaW5nfSwgZHJhZ2dlZFNsb3RJbmRleD0ke2RyYWdnZWRTbG90SW5kZXh9YCk7XG4gICAgICAgIC8vIOWmguaenOeCueWHu+eahOaYr+W3sumAieS4reeahOaji+WtkO+8jOWPlua2iOmAieaLqVxuICAgICAgICBpZiAoaXNEcmFnZ2luZyAmJiBkcmFnZ2VkU2xvdEluZGV4ID09PSBzbG90SW5kZXgpIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn5SEIOWPlua2iOmAieaLqWApO1xuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyDwn5SRIOWmguaenOW3sue7j+mAieS4reS6huWFtuS7luaji+WtkO+8jOWFiOWPlua2iOS5i+WJjeeahOmAieaLqVxuICAgICAgICBpZiAoaXNEcmFnZ2luZyAmJiBkcmFnZ2VkUGllY2UgJiYgZHJhZ2dlZFNsb3RJbmRleCAhPT0gc2xvdEluZGV4KSB7XG4gICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+UhCDliIfmjaLpgInmi6nvvJrku47mp73kvY0gJHtkcmFnZ2VkU2xvdEluZGV4fSDliIfmjaLliLDmp73kvY0gJHtzbG90SW5kZXh9YCk7XG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgLy8g8J+UkSDnrYnlvoXkuIDluKfvvIznoa7kv50gY2xlYXJTZWxlY3Rpb24g5a6M5oiQ5ZCO5YaN6K6+572u5paw6YCJ5oupXG4gICAgICAgICAgICAkLlNjaGVkdWxlKDAuMDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3Rpb24oc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIPCflJEg6K6+572u6YCJ5Lit54q25oCBXG4gICAgICAgIHNldFNlbGVjdGlvbihzbG90UGFuZWwsIHBpZWNlLCBzbG90SW5kZXgpO1xuICAgIH07XG4gICAgLy8g8J+UkSDmj5Dlj5borr7nva7pgInkuK3nirbmgIHnmoTpgLvovpHkuLrni6znq4vlh73mlbBcbiAgICBmdW5jdGlvbiBzZXRTZWxlY3Rpb24oc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KSB7XG4gICAgICAgIC8vIOiuvue9rumAieS4reeKtuaAgVxuICAgICAgICBkcmFnZ2VkUGllY2UgPSBwaWVjZTtcbiAgICAgICAgZHJhZ2dlZFNsb3RJbmRleCA9IHNsb3RJbmRleDtcbiAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIC8vIOmrmOS6rumAieS4reeahOanveS9jVxuICAgICAgICBzbG90UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZ0RyYWdnaW5nO1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUuYm9yZGVyID0gYDRweCBzb2xpZCAke0lOVkVOVE9SWV9USEVNRS5ib3JkZXJHb2xkfWA7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzAuOCc7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgxLjEsIDEuMSwgMS4wKSc7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUg5bey6YCJ5Lit5qOL5a2QOiAke3BpZWNlLmRpc3BsYXlOYW1lfSwg6K+354K55Ye75qOL55uY5L2N572u6L+b6KGM6YOo572yYCk7XG4gICAgICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4gICAgICAgIC8vIPCflJEg5rOo5YaM5YWo5bGA54K55Ye755uR5ZCs77yM5qOA5rWL54K55Ye75qOL55uY5L2N572uXG4gICAgICAgIHNldHVwQm9hcmRDbGlja0hhbmRsZXIoKTtcbiAgICB9XG4gICAgLy8g8J+UkSDms6jlhozngrnlh7vkuovku7ZcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsIGhhbmRsZUNsaWNrKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIOeCueWHu+mAieaLqeS6i+S7tuazqOWGjOWujOaIkCAtIOanveS9jSAke3Nsb3RJbmRleH1gKTtcbn1cbi8vIOeCueWHu+aNleiOt+mdouadv++8iOeUqOS6juaNleiOt+aji+ebmOWMuuWfn+eahOeCueWHu++8iVxubGV0IGJvYXJkQ2xpY2tDYXB0dXJlID0gbnVsbDtcbi8vIOiuvue9ruaji+ebmOeCueWHu+WkhOeQhuWZqO+8iOS9v+eUqOS4k+mXqOeahOeCueWHu+aNleiOt+mdouadv++8iVxuZnVuY3Rpb24gc2V0dXBCb2FyZENsaWNrSGFuZGxlcigpIHtcbiAgICAvLyDwn5SRIOWmguaenOW3sue7j+WtmOWcqOeCueWHu+aNleiOt+mdouadv++8jOWFiOWIoOmZpFxuICAgIGlmIChib2FyZENsaWNrQ2FwdHVyZSkge1xuICAgICAgICBib2FyZENsaWNrQ2FwdHVyZS5EZWxldGVBc3luYygwKTtcbiAgICAgICAgYm9hcmRDbGlja0NhcHR1cmUgPSBudWxsO1xuICAgIH1cbiAgICAvLyDwn5SRIOiOt+WPliBIVUQg5qC56Z2i5p2/77yI6ICM5LiN5pivIEludmVudG9yeVJvb3TvvIlcbiAgICAvLyDov5nmoLfngrnlh7vmjZXojrfpnaLmnb/lj6/ku6Xopobnm5bmlbTkuKrlsY/luZVcbiAgICBjb25zdCBodWRSb290ID0gJC5HZXRDb250ZXh0UGFuZWwoKS5HZXRQYXJlbnQoKTtcbiAgICBpZiAoIWh1ZFJvb3QpIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKdjCDml6Dms5Xojrflj5YgSFVEIOaguemdouadv2ApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIPCflJEg5Yib5bu65LiA5Liq6YCP5piO55qE54K55Ye75o2V6I636Z2i5p2/77yM5Y+q6KaG55uW5qOL55uY5Yy65Z+f77yI5LiN6KaG55uW6IOM5YyFVUnvvIlcbiAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSBHYW1lLkdldFNjcmVlbkhlaWdodCgpO1xuICAgIGNvbnN0IGludmVudG9yeUhlaWdodCA9IDE1MDtcbiAgICBjb25zdCBib2FyZEhlaWdodCA9IHNjcmVlbkhlaWdodCAtIGludmVudG9yeUhlaWdodDtcbiAgICBib2FyZENsaWNrQ2FwdHVyZSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgaHVkUm9vdCwgJ0JvYXJkQ2xpY2tDYXB0dXJlJyk7XG4gICAgYm9hcmRDbGlja0NhcHR1cmUuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgYm9hcmRDbGlja0NhcHR1cmUuc3R5bGUuaGVpZ2h0ID0gYCR7Ym9hcmRIZWlnaHR9cHhgO1xuICAgIGJvYXJkQ2xpY2tDYXB0dXJlLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGJvYXJkQ2xpY2tDYXB0dXJlLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJzsgLy8g8J+UkSDku47pobbpg6jlvIDlp4vvvIzkuI3opobnm5blupXpg6jnmoTog4zljIVVSVxuICAgIGJvYXJkQ2xpY2tDYXB0dXJlLnN0eWxlLnpJbmRleCA9ICc1MCc7IC8vIPCflJEg6L6D5L2O55qEIHpJbmRleO+8jOehruS/neS4jeS8mumYu+aMoeWFtuS7liBVSVxuICAgIGJvYXJkQ2xpY2tDYXB0dXJlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgYm9hcmRDbGlja0NhcHR1cmUuaGl0dGVzdCA9IHRydWU7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDliJvlu7rmo4vnm5jngrnlh7vmjZXojrfpnaLmnb/vvIzpq5jluqY6ICR7Ym9hcmRIZWlnaHR9cHjvvIzniLbpnaLmnb86ICR7aHVkUm9vdC5pZH1gKTtcbiAgICBjb25zdCBoYW5kbGVCb2FyZENsaWNrID0gKCkgPT4ge1xuICAgICAgICAvLyDwn5SRIOmmluWFiOajgOafpeaYr+WQpuaciemAieS4reaji+WtkFxuICAgICAgICBpZiAoIWlzRHJhZ2dpbmcgfHwgIWRyYWdnZWRQaWVjZSkge1xuICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKaoO+4jyDmsqHmnInpgInkuK3mo4vlrZDvvIznp7vpmaTmjZXojrfpnaLmnb9gKTtcbiAgICAgICAgICAgIGlmIChib2FyZENsaWNrQ2FwdHVyZSkge1xuICAgICAgICAgICAgICAgIGJvYXJkQ2xpY2tDYXB0dXJlLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAgICAgICAgIGJvYXJkQ2xpY2tDYXB0dXJlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRNb3VzZVVwSGFuZGxlciA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCflrHvuI/wn5ax77iP8J+Wse+4jyDmo4vnm5jngrnlh7vkuovku7bop6blj5FgKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfjq8g5b2T5YmN54q25oCBOiBpc0RyYWdnaW5nPSR7aXNEcmFnZ2luZ30sIGRyYWdnZWRQaWVjZT0ke2RyYWdnZWRQaWVjZS5kaXNwbGF5TmFtZX0sIGRyYWdnZWRTbG90SW5kZXg9JHtkcmFnZ2VkU2xvdEluZGV4fWApO1xuICAgICAgICBjb25zdCBjdXJzb3JQb3MgPSBHYW1lVUkuR2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfk40g54K55Ye75L2N572uOiAoJHtjdXJzb3JQb3NbMF19LCAke2N1cnNvclBvc1sxXX0pYCk7XG4gICAgICAgIC8vIPCflJEg54K55Ye75qOL55uY5Yy65Z+fIC0+IOmDqOe9suaji+WtkFxuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+OryDngrnlh7vmo4vnm5jljLrln5/vvIzpg6jnvbLmo4vlrZDliLDpvKDmoIfkvY3nva5gKTtcbiAgICAgICAgLy8g5L+d5a2Y5b2T5YmN6YCJ5Lit55qE5qOL5a2Q5L+h5oGvXG4gICAgICAgIGNvbnN0IHBpZWNlVG9EZXBseSA9IGRyYWdnZWRQaWVjZTtcbiAgICAgICAgY29uc3Qgc2xvdFRvRGVwbHkgPSBkcmFnZ2VkU2xvdEluZGV4O1xuICAgICAgICAvLyDwn5SRIOeri+WNs+WIoOmZpOaNleiOt+mdouadv++8jOmBv+WFjemYu+aMoeWQjue7reeCueWHu1xuICAgICAgICBpZiAoYm9hcmRDbGlja0NhcHR1cmUpIHtcbiAgICAgICAgICAgIGJvYXJkQ2xpY2tDYXB0dXJlLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAgICAgYm9hcmRDbGlja0NhcHR1cmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRNb3VzZVVwSGFuZGxlciA9IG51bGw7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn5SEIOmDqOe9suWJjeeri+WNs+WIoOmZpOaNleiOt+mdouadv2ApO1xuICAgICAgICAvLyDpg6jnvbLmo4vlrZBcbiAgICAgICAgZGVwbG95UGllY2VBdEN1cnNvcihwaWVjZVRvRGVwbHksIHNsb3RUb0RlcGx5KTtcbiAgICB9O1xuICAgIC8vIPCflJEg5Zyo5o2V6I636Z2i5p2/5LiK5rOo5YaM54K55Ye75LqL5Lu2XG4gICAgYm9hcmRDbGlja0NhcHR1cmUuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsIGhhbmRsZUJvYXJkQ2xpY2spO1xuICAgIGN1cnJlbnRNb3VzZVVwSGFuZGxlciA9IGhhbmRsZUJvYXJkQ2xpY2s7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDlt7Lms6jlhozmo4vnm5jngrnlh7vnm5HlkKzlmajvvIjkvb/nlKjmjZXojrfpnaLmnb/vvIlgKTtcbn1cbi8vIOa4hemZpOmAieaLqeeKtuaAgVxuZnVuY3Rpb24gY2xlYXJTZWxlY3Rpb24oKSB7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfp7kg5riF6Zmk6YCJ5oup54q25oCBYCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfp7kg5b2T5YmN54q25oCBOiBpc0RyYWdnaW5nPSR7aXNEcmFnZ2luZ30sIGRyYWdnZWRQaWVjZT0ke2RyYWdnZWRQaWVjZSA/IGRyYWdnZWRQaWVjZS5kaXNwbGF5TmFtZSA6ICdudWxsJ30sIGRyYWdnZWRTbG90SW5kZXg9JHtkcmFnZ2VkU2xvdEluZGV4fWApO1xuICAgIC8vIPCflJEg6aaW5YWI5Yig6Zmk54K55Ye75o2V6I636Z2i5p2/77yI5aaC5p6c5a2Y5Zyo77yJXG4gICAgaWYgKGJvYXJkQ2xpY2tDYXB0dXJlKSB7XG4gICAgICAgIGJvYXJkQ2xpY2tDYXB0dXJlLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICBib2FyZENsaWNrQ2FwdHVyZSA9IG51bGw7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUg5bey5Yig6Zmk5qOL55uY54K55Ye75o2V6I636Z2i5p2/YCk7XG4gICAgfVxuICAgIGN1cnJlbnRNb3VzZVVwSGFuZGxlciA9IG51bGw7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOKcheKcheKchSDlt7LmuIXpmaTngrnlh7vmjZXojrfnirbmgIFgKTtcbiAgICAvLyDwn5SRIOaBouWkjemAieS4reanveS9jeeahOagt+W8j++8iOaXoOiuuuanveS9jeaYr+WQpui/mOacieaji+WtkO+8iVxuICAgIGlmIChkcmFnZ2VkU2xvdEluZGV4ID49IDApIHtcbiAgICAgICAgY29uc3Qgc2xvdFBhbmVsID0gJChgI0ludmVudG9yeVNsb3RfJHtkcmFnZ2VkU2xvdEluZGV4fWApO1xuICAgICAgICBpZiAoc2xvdFBhbmVsKSB7XG4gICAgICAgICAgICBjb25zdCBzbG90ID0gaW52ZW50b3J5U2xvdHNbZHJhZ2dlZFNsb3RJbmRleF07XG4gICAgICAgICAgICBpZiAoc2xvdCkge1xuICAgICAgICAgICAgICAgIC8vIPCflJEg5aaC5p6c5qe95L2N6L+Y5pyJ5qOL5a2Q77yM5L2/55So5qOL5a2Q55qE56iA5pyJ5bqm6aKc6ImyXG4gICAgICAgICAgICAgICAgLy8g5aaC5p6c5qe95L2N5bey57uP6KKr5riF56m677yM5L2/55So6buY6K6k6L655qGG6aKc6ImyXG4gICAgICAgICAgICAgICAgbGV0IGJvcmRlckNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLmJvcmRlckNvbG9yOyAvLyDpu5jorqTovrnmoYbpopzoibJcbiAgICAgICAgICAgICAgICBpZiAoc2xvdC5waWVjZSkge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvciA9IFJBUklUWV9DT0xPUlNbc2xvdC5waWVjZS5yYXJpdHkudG9TdHJpbmcoKV0gfHwgSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkuY29tbW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzbG90UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICAgICAgICAgICAgICBzbG90UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke2JvcmRlckNvbG9yfWA7IC8vIOaBouWkjeS4uum7mOiupOi+ueahhuWuveW6pu+8iDJweO+8iVxuICAgICAgICAgICAgICAgIHNsb3RQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzEuMCc7XG4gICAgICAgICAgICAgICAgc2xvdFBhbmVsLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKDEuMCwgMS4wLCAxLjApJztcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIOW3suaBouWkjeanveS9jSAke2RyYWdnZWRTbG90SW5kZXh9IOeahOagt+W8j++8iOaji+WtkDogJHtzbG90LnBpZWNlID8gc2xvdC5waWVjZS5kaXNwbGF5TmFtZSA6ICflt7LmuIXnqbonfe+8iWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKaoO+4jyDmp73kvY0gJHtkcmFnZ2VkU2xvdEluZGV4fSDkuI3lrZjlnKjkuo4gaW52ZW50b3J5U2xvdHNgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDimqDvuI8g5qe95L2N6Z2i5p2/IEludmVudG9yeVNsb3RfJHtkcmFnZ2VkU2xvdEluZGV4fSDkuI3lrZjlnKhgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDmuIXnkIbmi5bmi73lm77moIfvvIjlpoLmnpzmnInvvIlcbiAgICBpZiAoZHJhZ0dob3N0UGFuZWwpIHtcbiAgICAgICAgZHJhZ0dob3N0UGFuZWwuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgIGRyYWdHaG9zdFBhbmVsID0gbnVsbDtcbiAgICB9XG4gICAgLy8g8J+UkSDliKDpmaTngrnlh7vopobnm5blsYLvvIjlpoLmnpzlrZjlnKjvvIlcbiAgICBjb25zdCBvdmVybGF5ID0gJCgnI0JvYXJkQ2xpY2tPdmVybGF5Jyk7XG4gICAgaWYgKG92ZXJsYXkpIHtcbiAgICAgICAgb3ZlcmxheS5EZWxldGVBc3luYygwKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDlt7LliKDpmaTngrnlh7vopobnm5blsYJgKTtcbiAgICB9XG4gICAgLy8g6YeN572u54q25oCBXG4gICAgZHJhZ2dlZFBpZWNlID0gbnVsbDtcbiAgICBkcmFnZ2VkU2xvdEluZGV4ID0gLTE7XG4gICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIGRyYWdTdGFydFBvcyA9IG51bGw7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOKcheKcheKchSDpgInmi6nnirbmgIHlt7LlrozlhajmuIXpmaRgKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyF4pyF4pyFIOacgOe7iOeKtuaAgTogaXNEcmFnZ2luZz0ke2lzRHJhZ2dpbmd9LCBkcmFnZ2VkUGllY2U9JHtkcmFnZ2VkUGllY2UgPyBkcmFnZ2VkUGllY2UuZGlzcGxheU5hbWUgOiAnbnVsbCd9LCBkcmFnZ2VkU2xvdEluZGV4PSR7ZHJhZ2dlZFNsb3RJbmRleH0sIGN1cnJlbnRNb3VzZVVwSGFuZGxlcj0ke2N1cnJlbnRNb3VzZVVwSGFuZGxlciA/ICflrZjlnKgnIDogJ251bGwnfWApO1xufVxuLy8g5riF55CG5ouW5ou954q25oCB77yI5YWo5bGA5Ye95pWw77yJXG4vLyDmuIXnkIbmi5bmi73nirbmgIHvvIjlhajlsYDlh73mlbDvvIznjrDlnKjosIPnlKggY2xlYXJTZWxlY3Rpb27vvIlcbmZ1bmN0aW9uIGNsZWFudXBEcmFnKCkge1xuICAgIGNsZWFyU2VsZWN0aW9uKCk7XG59XG4vLyDliJvlu7rot5/pmo/pvKDmoIfnmoTmi5bmi73lm77moIdcbmZ1bmN0aW9uIGNyZWF0ZURyYWdHaG9zdChwaWVjZSwgeCwgeSkge1xuICAgIC8vIOa4heeQhuaXp+eahOaLluaLveWbvuagh1xuICAgIGlmIChkcmFnR2hvc3RQYW5lbCkge1xuICAgICAgICBkcmFnR2hvc3RQYW5lbC5EZWxldGVBc3luYygwKTtcbiAgICAgICAgZHJhZ0dob3N0UGFuZWwgPSBudWxsO1xuICAgIH1cbiAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+OryDlvIDlp4vliJvlu7rmi5bmi73lm77moIfvvIzkvY3nva46ICgke3h9LCAke3l9KWApO1xuICAgIC8vIOWIm+W7uuaLluaLveWbvuagh+mdouadv1xuICAgIC8vIPCflJEg5YWz6ZSu77ya5Yib5bu65LiA5Liq5LiT6Zeo55qE5ouW5ou95a655Zmo77yM56aB55So6Ieq5Yqo5biD5bGAXG4gICAgY29uc3QgY29udGV4dFBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKTtcbiAgICAvLyDmo4Dmn6XmmK/lkKblt7LlrZjlnKjmi5bmi73lrrnlmahcbiAgICBsZXQgZHJhZ0NvbnRhaW5lciA9ICQoJyNEcmFnR2hvc3RDb250YWluZXInKTtcbiAgICBpZiAoIWRyYWdDb250YWluZXIpIHtcbiAgICAgICAgZHJhZ0NvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGV4dFBhbmVsLCAnRHJhZ0dob3N0Q29udGFpbmVyJyk7XG4gICAgICAgIC8vIPCflJEg5YWz6ZSu77ya56aB55So6Ieq5Yqo5biD5bGA77yM5YWB6K645a2Q6Z2i5p2/6Ieq55Sx5a6a5L2NXG4gICAgICAgIGRyYWdDb250YWluZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ25vbmUnO1xuICAgICAgICBkcmFnQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBkcmFnQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgZHJhZ0NvbnRhaW5lci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgICAgIGRyYWdDb250YWluZXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgICAgICBkcmFnQ29udGFpbmVyLmhpdHRlc3QgPSBmYWxzZTsgLy8g5a655Zmo5LiN5oum5oiq5LqL5Lu2XG4gICAgICAgIGRyYWdDb250YWluZXIuc3R5bGUuekluZGV4ID0gJzk5OTknO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIOWIm+W7uuaLluaLveWuueWZqGApO1xuICAgIH1cbiAgICBkcmFnR2hvc3RQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgZHJhZ0NvbnRhaW5lciwgJ0RyYWdHaG9zdCcpO1xuICAgIGlmICghZHJhZ0dob3N0UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKdjOKdjOKdjCDml6Dms5XliJvlu7rmi5bmi73lm77moIfpnaLmnb/vvIFgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFnR2hvc3RQYW5lbC5zdHlsZS53aWR0aCA9ICc4MHB4JztcbiAgICBkcmFnR2hvc3RQYW5lbC5zdHlsZS5oZWlnaHQgPSAnODBweCc7XG4gICAgLy8g8J+UkSBQYW5vcmFtYSBVSSDkuI3mlK/mjIEgc3R5bGUueCDlkowgc3R5bGUuee+8jOS9v+eUqCBtYXJnaW5MZWZ0IOWSjCBtYXJnaW5Ub3BcbiAgICAvLyDwn5SRIOWFs+mUru+8muW/hemhu+WFiOiuvue9ruWvuem9kOaWueW8j++8jOWGjeiuvue9rm1hcmdpblxuICAgIGRyYWdHaG9zdFBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdsZWZ0JztcbiAgICBkcmFnR2hvc3RQYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgZHJhZ0dob3N0UGFuZWwuc3R5bGUubWFyZ2luTGVmdCA9IGAke3ggLSA0MH1weGA7XG4gICAgZHJhZ0dob3N0UGFuZWwuc3R5bGUubWFyZ2luVG9wID0gYCR7eSAtIDQwfXB4YDtcbiAgICAvLyDwn5SRIOehruS/nemdouadv+WcqOacgOS4iuWxglxuICAgIGRyYWdHaG9zdFBhbmVsLnN0eWxlLnpJbmRleCA9ICcxMDAwMCc7XG4gICAgLy8g8J+UkSDnoa7kv53pnaLmnb/lj6/op4FcbiAgICBkcmFnR2hvc3RQYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIGRyYWdHaG9zdFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAwLCAwLjgpJzsgLy8g8J+UkSDkuLTml7bmlLnkuLrpu4ToibLvvIzkvr/kuo7osIPor5VcbiAgICBkcmFnR2hvc3RQYW5lbC5zdHlsZS5ib3JkZXIgPSBgM3B4IHNvbGlkICR7SU5WRU5UT1JZX1RIRU1FLmJvcmRlckdvbGR9YDtcbiAgICBkcmFnR2hvc3RQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICBkcmFnR2hvc3RQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzEuMCc7IC8vIPCflJEg5Li05pe25pS55Li65a6M5YWo5LiN6YCP5piO77yM5L6/5LqO6LCD6K+VXG4gICAgZHJhZ0dob3N0UGFuZWwuaGl0dGVzdCA9IHRydWU7IC8vIPCflJEg5pS55Li6dHJ1Ze+8jOWFgeiuuOaOpeaUtum8oOagh+S6i+S7tlxuICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIOWIm+W7uuaLluaLveWbvuagh+mdouadv++8jElEOiAke2RyYWdHaG9zdFBhbmVsLmlkfSwg5Yid5aeL5L2N572uOiAoJHt4IC0gNDB9LCAke3kgLSA0MH0pYCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfjq8g6Z2i5p2/5bGe5oCnOiB3aWR0aD0ke2RyYWdHaG9zdFBhbmVsLnN0eWxlLndpZHRofSwgaGVpZ2h0PSR7ZHJhZ0dob3N0UGFuZWwuc3R5bGUuaGVpZ2h0fSwgekluZGV4PSR7ZHJhZ0dob3N0UGFuZWwuc3R5bGUuekluZGV4fWApO1xuICAgIC8vIOS9v+eUqCBET1RBSGVyb0ltYWdlIOaYvuekuuiLsembhOWktOWDj1xuICAgIGNvbnN0IGhlcm9JbWFnZSA9ICQuQ3JlYXRlUGFuZWwoJ0RPVEFIZXJvSW1hZ2UnLCBkcmFnR2hvc3RQYW5lbCwgJ0RyYWdHaG9zdEhlcm9JbWFnZScpO1xuICAgIGhlcm9JbWFnZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZXJvSW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnN0IGhlcm9OYW1lID0gZ2V0RnVsbEhlcm9OYW1lKHBpZWNlLnVuaXROYW1lLCBwaWVjZS5pZCk7XG4gICAgaGVyb0ltYWdlLmhlcm9uYW1lID0gaGVyb05hbWU7XG4gICAgaGVyb0ltYWdlLmhlcm9pbWFnZXN0eWxlID0gJ3BvcnRyYWl0JztcbiAgICBoZXJvSW1hZ2UuaGl0dGVzdCA9IGZhbHNlO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUg5Yib5bu65ouW5ou95Zu+5qCHOiAke3BpZWNlLmRpc3BsYXlOYW1lfSwg6Iux6ZuE5ZCN56ewOiAke2hlcm9OYW1lfWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUg5ouW5ou95Zu+5qCH6Z2i5p2/5Yib5bu65a6M5oiQ77yM6Z2i5p2/SUQ6ICR7ZHJhZ0dob3N0UGFuZWwuaWR9YCk7XG59XG4vLyDojrflj5bmp73kvY3nmoTlsY/luZXnn6nlvaLljLrln59cbmZ1bmN0aW9uIGdldFNsb3RSZWN0KHNsb3RJbmRleCkge1xuICAgIGNvbnN0IHNsb3RQYW5lbCA9ICQoYCNJbnZlbnRvcnlTbG90XyR7c2xvdEluZGV4fWApO1xuICAgIGlmICghc2xvdFBhbmVsKSB7XG4gICAgICAgIHJldHVybiB7IHg6IDAsIHk6IDAsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfTtcbiAgICB9XG4gICAgLy8g6I635Y+W5qe95L2N55qE5a6e6ZmF5biD5bGA5L2N572u5ZKM5bC65a+4XG4gICAgLy8g5rOo5oSP77yaUGFub3JhbWHnmoTluIPlsYDns7vnu5/lj6/og73kuI3nm7TmjqXmj5DkvpvlsY/luZXlnZDmoIdcbiAgICAvLyDov5nph4zkvb/nlKjkvLDnrpflgLzvvIzlrp7pmYXpnIDopoHmoLnmja7lrrnlmajkvY3nva7orqHnrpdcbiAgICBjb25zdCBzbG90c0NvbnRhaW5lciA9ICQoJyNJbnZlbnRvcnlTbG90c0NvbnRhaW5lcicpO1xuICAgIGlmICghc2xvdHNDb250YWluZXIpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogMCwgeTogMCwgd2lkdGg6IDAsIGhlaWdodDogMCB9O1xuICAgIH1cbiAgICAvLyDorqHnrpfmp73kvY3lnKjlrrnlmajkuK3nmoTkvY3nva5cbiAgICAvLyDmr4/kuKrmp73kvY3lrr3luqY5MHB4ICsg5bem5Y+zbWFyZ2luIDVweCA9IDEwMHB4XG4gICAgY29uc3Qgc2xvdFdpZHRoID0gOTA7XG4gICAgY29uc3Qgc2xvdEhlaWdodCA9IDkwO1xuICAgIGNvbnN0IHNsb3RTcGFjaW5nID0gMTA7IC8vIOW3puWPs+mXtOi3nVxuICAgIC8vIOiOt+WPluWuueWZqOS9jee9ru+8iOi/memHjOmcgOimgeWunumZhea1i+mHj++8jOaaguaXtuS9v+eUqOS8sOeul++8iVxuICAgIC8vIOiDjOWMheWcqOW6lemDqO+8jOS7juW3puS+p+W8gOWni+aOkuWIl1xuICAgIGNvbnN0IGNvbnRhaW5lclggPSAwOyAvLyDpnIDopoHlrp7pmYXmtYvph49cbiAgICBjb25zdCBjb250YWluZXJZID0gMDsgLy8g6ZyA6KaB5a6e6ZmF5rWL6YePXG4gICAgY29uc3Qgc2xvdFggPSBjb250YWluZXJYICsgc2xvdEluZGV4ICogKHNsb3RXaWR0aCArIHNsb3RTcGFjaW5nKTtcbiAgICBjb25zdCBzbG90WSA9IGNvbnRhaW5lclk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogc2xvdFgsXG4gICAgICAgIHk6IHNsb3RZLFxuICAgICAgICB3aWR0aDogc2xvdFdpZHRoLFxuICAgICAgICBoZWlnaHQ6IHNsb3RIZWlnaHRcbiAgICB9O1xufVxuLy8g5Yik5pat54K55piv5ZCm5Zyo55+p5b2i5YaFXG5mdW5jdGlvbiBpc1BvaW50SW5SZWN0KHB4LCBweSwgcmVjdCkge1xuICAgIHJldHVybiBweCA+PSByZWN0LnggJiZcbiAgICAgICAgcHggPD0gcmVjdC54ICsgcmVjdC53aWR0aCAmJlxuICAgICAgICBweSA+PSByZWN0LnkgJiZcbiAgICAgICAgcHkgPD0gcmVjdC55ICsgcmVjdC5oZWlnaHQ7XG59XG4vLyDlm57liLDljp/kvY3nva7vvIjlj5bmtojpg6jnvbLvvIlcbmZ1bmN0aW9uIHJldHVyblRvT3JpZ2luYWxQb3NpdGlvbihzbG90SW5kZXgpIHtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+UhCDmo4vlrZDlm57liLDljp/kvY3nva46IOanveS9jSAke3Nsb3RJbmRleH1gKTtcbiAgICAvLyDmgaLlpI3mp73kvY3moLflvI9cbiAgICBjb25zdCBzbG90UGFuZWwgPSAkKGAjSW52ZW50b3J5U2xvdF8ke3Nsb3RJbmRleH1gKTtcbiAgICBpZiAoc2xvdFBhbmVsKSB7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnO1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUub3BhY2l0eSA9ICcxLjAnO1xuICAgIH1cbiAgICAvLyDmkq3mlL7pn7PmlYhcbiAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5DYW5jZWwnKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZURyYWdPdmVybGF5KHBpZWNlKSB7XG4gICAgLy8g5Yib5bu65YWo5bGP5ouW5ou95o+Q56S6XG4gICAgaWYgKCFkcmFnT3ZlcmxheSkge1xuICAgICAgICBkcmFnT3ZlcmxheSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgJC5HZXRDb250ZXh0UGFuZWwoKSwgJ0RyYWdPdmVybGF5Jyk7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGRyYWdPdmVybGF5LnN0eWxlLnpJbmRleCA9ICc5OTk5JztcbiAgICAgICAgZHJhZ092ZXJsYXkuaGl0dGVzdCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBoaW50ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBkcmFnT3ZlcmxheSwgJ0RyYWdIaW50Jyk7XG4gICAgICAgIGhpbnQudGV4dCA9ICfmi5bmi73liLDmo4vnm5jkvY3nva7pg6jnvbLvvIjph4rmlL7pvKDmoIflnKjog4zljIXlpJbvvIknO1xuICAgICAgICBoaW50LnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgICAgICBoaW50LnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRHb2xkO1xuICAgICAgICBoaW50LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBoaW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJztcbiAgICAgICAgaGludC5zdHlsZS5tYXJnaW5Ub3AgPSAnNTBweCc7XG4gICAgICAgIGhpbnQuc3R5bGUudGV4dFNoYWRvdyA9ICcycHggMnB4IDRweCAjMDAwMDAwJztcbiAgICAgICAgaGludC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjcpJztcbiAgICAgICAgaGludC5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG4gICAgICAgIGhpbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgICAgIGhpbnQuaGl0dGVzdCA9IGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRlcGxveVBpZWNlQXRDdXJzb3IocGllY2UsIHNsb3RJbmRleCkge1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIOmDqOe9suaji+WtkDogJHtwaWVjZS5kaXNwbGF5TmFtZX0g5LuO5qe95L2NICR7c2xvdEluZGV4fWApO1xuICAgIC8vIOiOt+WPlum8oOagh+Wxj+W5leS9jee9rlxuICAgIGNvbnN0IHNjcmVlblBvcyA9IEdhbWVVSS5HZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgIC8vIOWwhuWxj+W5leWdkOagh+i9rOaNouS4uuS4lueVjOWdkOagh++8iOWcsOmdouS9jee9ru+8iVxuICAgIC8vIOazqOaEj++8mkdldFNjcmVlbldvcmxkUG9zaXRpb24g6ZyA6KaB5Lik5Liq5Y2V54us55qE5Y+C5pWwXG4gICAgY29uc3Qgd29ybGRQb3MgPSBHYW1lVUkuR2V0U2NyZWVuV29ybGRQb3NpdGlvbihzY3JlZW5Qb3NbMF0sIHNjcmVlblBvc1sxXSk7XG4gICAgaWYgKCF3b3JsZFBvcykge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4p2MIOaXoOazleiOt+WPluS4lueVjOWdkOaghyAo5bGP5bmV5Z2Q5qCHOiAke3NjcmVlblBvc1swXX0sICR7c2NyZWVuUG9zWzFdfSlgKTtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ2FuY2VsJyk7XG4gICAgICAgIC8vIOmDqOe9suWksei0pe+8jOWbnuWIsOWOn+S9jee9rlxuICAgICAgICByZXR1cm5Ub09yaWdpbmFsUG9zaXRpb24oc2xvdEluZGV4KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkLk1zZyhgW0ludmVudG9yeV0g5bGP5bmV5Z2Q5qCHOiAoJHtzY3JlZW5Qb3NbMF19LCAke3NjcmVlblBvc1sxXX0pIOKGkiDkuJbnlYzlnZDmoIc6ICgke3dvcmxkUG9zWzBdLnRvRml4ZWQoMSl9LCAke3dvcmxkUG9zWzFdLnRvRml4ZWQoMSl9LCAke3dvcmxkUG9zWzJdLnRvRml4ZWQoMSl9KWApO1xuICAgIC8vIOiOt+WPluacrOWcsOeOqeWutklEXG4gICAgY29uc3QgbG9jYWxQbGF5ZXJJZCA9IFBsYXllcnMuR2V0TG9jYWxQbGF5ZXIoKTtcbiAgICAvLyDwn5SRIOWPkemAgemDqOe9suivt+axguWIsOacjeWKoeerr++8iOS9v+eUqOS4lueVjOWdkOagh++8iVxuICAgIC8vIOacjeWKoeerr+S8mumqjOivgeS9jee9ruaYr+WQpuWPr+mDqOe9su+8jOWmguaenOaIkOWKn+WImeS7juiDjOWMheWIoOmZpFxuICAgIGNvbnN0IGRlcGxveURhdGEgPSB7XG4gICAgICAgIHBsYXllcklkOiBsb2NhbFBsYXllcklkLFxuICAgICAgICBwaWVjZUlkOiBwaWVjZS5pZCxcbiAgICAgICAgdW5pdE5hbWU6IHBpZWNlLnVuaXROYW1lLFxuICAgICAgICBzbG90SW5kZXg6IHNsb3RJbmRleCxcbiAgICAgICAgd29ybGRYOiB3b3JsZFBvc1swXSxcbiAgICAgICAgd29ybGRZOiB3b3JsZFBvc1sxXSxcbiAgICAgICAgd29ybGRaOiB3b3JsZFBvc1syXVxuICAgIH07XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfk6Qg5Y+R6YCB6YOo572y6K+35rGCOiAke0pTT04uc3RyaW5naWZ5KGRlcGxveURhdGEpfWApO1xuICAgIHRyeSB7XG4gICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdpbnZlbnRvcnlfZGVwbG95X3BpZWNlJywgZGVwbG95RGF0YSk7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUg6YOo572y6K+35rGC5bey5Y+R6YCBYCk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinYwg5Y+R6YCB6YOo572y6K+35rGC5aSx6LSlOiAke2V9YCk7XG4gICAgICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkNhbmNlbCcpO1xuICAgICAgICByZXR1cm5Ub09yaWdpbmFsUG9zaXRpb24oc2xvdEluZGV4KTtcbiAgICAgICAgY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG4gICAgLy8g5pKt5pS+6Z+z5pWIXG4gICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ2FzdFN0YXJ0Jyk7XG4gICAgLy8g8J+UkSDljZXmnLrmqKHlvI/vvJrnq4vljbPmuIXpmaTpgInmi6nnirbmgIHlkoznm5HlkKzlmajvvIzlhYHorrjnlKjmiLfnu6fnu63mk43kvZxcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+UhCDljZXmnLrmqKHlvI/vvJrpg6jnvbLor7fmsYLlt7Llj5HpgIHvvIznq4vljbPmuIXpmaTpgInmi6nnirbmgIHlkoznm5HlkKzlmahgKTtcbiAgICAvLyDwn5SRIOWIoOmZpOeCueWHu+aNleiOt+mdouadv++8iOWmguaenOWtmOWcqO+8iVxuICAgIGlmIChib2FyZENsaWNrQ2FwdHVyZSkge1xuICAgICAgICBib2FyZENsaWNrQ2FwdHVyZS5EZWxldGVBc3luYygwKTtcbiAgICAgICAgYm9hcmRDbGlja0NhcHR1cmUgPSBudWxsO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIOW3suWIoOmZpOaji+ebmOeCueWHu+aNleiOt+mdouadv2ApO1xuICAgIH1cbiAgICBjdXJyZW50TW91c2VVcEhhbmRsZXIgPSBudWxsO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIXinIXinIUg5bey5riF6Zmk54K55Ye75o2V6I6354q25oCBYCk7XG4gICAgLy8g8J+UkSDlhYjmgaLlpI3mp73kvY3moLflvI/vvIzlho3ph43nva7nirbmgIHlj5jph49cbiAgICAvLyDms6jmhI/vvJrkvb/nlKjkvKDlhaXnmoQgc2xvdEluZGV4IOWPguaVsO+8jOiAjOS4jeaYryBkcmFnZ2VkU2xvdEluZGV4IOWFqOWxgOWPmOmHj1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn5SEIOWHhuWkh+aBouWkjeanveS9jSAke3Nsb3RJbmRleH0g55qE5qC35byPYCk7XG4gICAgY29uc3Qgc2xvdFBhbmVsVG9SZXN0b3JlID0gJChgI0ludmVudG9yeVNsb3RfJHtzbG90SW5kZXh9YCk7XG4gICAgaWYgKHNsb3RQYW5lbFRvUmVzdG9yZSkge1xuICAgICAgICBzbG90UGFuZWxUb1Jlc3RvcmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICAgICAgc2xvdFBhbmVsVG9SZXN0b3JlLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtJTlZFTlRPUllfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICAgICAgc2xvdFBhbmVsVG9SZXN0b3JlLnN0eWxlLm9wYWNpdHkgPSAnMS4wJztcbiAgICAgICAgc2xvdFBhbmVsVG9SZXN0b3JlLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKDEuMCwgMS4wLCAxLjApJztcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDlt7LmgaLlpI3pg6jnvbLmp73kvY0gJHtzbG90SW5kZXh9IOeahOagt+W8j2ApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKaoO+4jyDmnKrmib7liLDmp73kvY3pnaLmnb8gSW52ZW50b3J5U2xvdF8ke3Nsb3RJbmRleH1gKTtcbiAgICB9XG4gICAgLy8g8J+UkSDliKDpmaTmi5bmi73nm7jlhbPnmoTpnaLmnb/vvIjlj6/og73pmLvmjKHngrnlh7vvvIlcbiAgICBpZiAoZHJhZ0dob3N0UGFuZWwpIHtcbiAgICAgICAgZHJhZ0dob3N0UGFuZWwuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgIGRyYWdHaG9zdFBhbmVsID0gbnVsbDtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDlt7LliKDpmaTmi5bmi73lm77moIdgKTtcbiAgICB9XG4gICAgaWYgKGRyYWdPdmVybGF5KSB7XG4gICAgICAgIGRyYWdPdmVybGF5LkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICBkcmFnT3ZlcmxheSA9IG51bGw7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUg5bey5Yig6Zmk5ouW5ou96KaG55uW5bGCYCk7XG4gICAgfVxuICAgIGNvbnN0IGJvYXJkT3ZlcmxheSA9ICQoJyNCb2FyZENsaWNrT3ZlcmxheScpO1xuICAgIGlmIChib2FyZE92ZXJsYXkpIHtcbiAgICAgICAgYm9hcmRPdmVybGF5LkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIOW3suWIoOmZpOaji+ebmOeCueWHu+imhuebluWxgmApO1xuICAgIH1cbiAgICBjb25zdCBkcmFnQ29udGFpbmVyID0gJCgnI0RyYWdHaG9zdENvbnRhaW5lcicpO1xuICAgIGlmIChkcmFnQ29udGFpbmVyKSB7XG4gICAgICAgIGRyYWdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIUg5bey5Yig6Zmk5ouW5ou95a655ZmoYCk7XG4gICAgfVxuICAgIC8vIOmHjee9rueKtuaAgeWPmOmHj1xuICAgIGRyYWdnZWRQaWVjZSA9IG51bGw7XG4gICAgZHJhZ2dlZFNsb3RJbmRleCA9IC0xO1xuICAgIGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAvLyDnq4vljbPmuIXnqbrmp73kvY3vvIjljZXmnLrmqKHlvI/vvIzkuI3pnIDopoHnrYnlvoXmnI3liqHnq6/noa7orqTvvIlcbiAgICB1cGRhdGVTbG90KHNsb3RJbmRleCwgbnVsbCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDljZXmnLrmqKHlvI/vvJrlt7LmuIXnqbrmp73kvY0gJHtzbG90SW5kZXh9YCk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDmmL7npLov6ZqQ6JePXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBzaG93KCkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSDwn5SNIHNob3coKSDooqvosIPnlKgnKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0gcm9vdFBhbmVsOiAke3Jvb3RQYW5lbCA/ICflrZjlnKgnIDogJ+S4jeWtmOWcqCd9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGlzVmlzaWJsZTogJHtpc1Zpc2libGV9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGN1cnJlbnRNb3VzZVVwSGFuZGxlcjogJHtjdXJyZW50TW91c2VVcEhhbmRsZXIgPyAn5a2Y5ZyoJyA6ICfkuI3lrZjlnKgnfWApO1xuICAgIC8vIPCflJEg56Gu5L+d5Zyo5pi+56S66IOM5YyF5YmN77yM5riF6Zmk5Lu75L2V5q6L55WZ55qE54K55Ye75o2V6I636Z2i5p2/XG4gICAgaWYgKGJvYXJkQ2xpY2tDYXB0dXJlKSB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDimqDvuI8g5qOA5rWL5Yiw5q6L55WZ55qE54K55Ye75o2V6I636Z2i5p2/77yM5q2j5Zyo5riF6ZmkLi4uJyk7XG4gICAgICAgIGJvYXJkQ2xpY2tDYXB0dXJlLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICBib2FyZENsaWNrQ2FwdHVyZSA9IG51bGw7XG4gICAgICAgIGN1cnJlbnRNb3VzZVVwSGFuZGxlciA9IG51bGw7XG4gICAgfVxuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDimqDvuI8gUm9vdCBwYW5lbCBub3QgaW5pdGlhbGl6ZWQsIOWwneivlemHjeaWsOWIneWni+WMli4uLicpO1xuICAgICAgICAvLyDwn5SRIOWmguaenOaguemdouadv+S4jeWtmOWcqO+8jOWwneivlemHjeaWsOWIneWni+WMllxuICAgICAgICBpbml0aWFsaXplKCk7XG4gICAgICAgIHJvb3RQYW5lbCA9ICQoJyNJbnZlbnRvcnlSb290Jyk7XG4gICAgICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICAgICAkLk1zZygnW0ludmVudG9yeV0g4p2MIOmHjeaWsOWIneWni+WMluWksei0pe+8jOaXoOazleaYvuekuuiDjOWMhScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIPCflJEg56Gu5L+d5qC56Z2i5p2/5a2Y5Zyo5LiU5Y+v6KeBXG4gICAgcm9vdFBhbmVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgcm9vdFBhbmVsLnN0eWxlLm9wYWNpdHkgPSAnMS4wJztcbiAgICByb290UGFuZWwuc3R5bGUuekluZGV4ID0gJzEwMDAnOyAvLyDwn5SRIOehruS/neiDjOWMheWcqOacgOS4iuWxglxuICAgIHJvb3RQYW5lbC5oaXR0ZXN0ID0gdHJ1ZTsgLy8g56Gu5L+d5Y+v5Lul5o6l5pS25LqL5Lu2XG4gICAgaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyF4pyF4pyFIEludmVudG9yeSBzaG93bicpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDlvZPliY3njqnlrrZJRDogJHtQbGF5ZXJzLkdldExvY2FsUGxheWVyKCl9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOanveS9jeaVsOmHjzogJHtpbnZlbnRvcnlTbG90cy5sZW5ndGh9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIFJvb3QgcGFuZWwgaGl0dGVzdDogJHtyb290UGFuZWwuaGl0dGVzdH0sIHZpc2liaWxpdHk6ICR7cm9vdFBhbmVsLnN0eWxlLnZpc2liaWxpdHl9LCBvcGFjaXR5OiAke3Jvb3RQYW5lbC5zdHlsZS5vcGFjaXR5fWApO1xuICAgIC8vIPCflJEg6aqM6K+B5qe95L2N6Z2i5p2/5piv5ZCm5a2Y5Zyo5LiU5Y+v54K55Ye7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbigzLCBpbnZlbnRvcnlTbG90cy5sZW5ndGgpOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2xvdFBhbmVsID0gJChgI0ludmVudG9yeVNsb3RfJHtpfWApO1xuICAgICAgICBpZiAoc2xvdFBhbmVsKSB7XG4gICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g5qe95L2NICR7aX06IElEPSR7c2xvdFBhbmVsLmlkfSwgaGl0dGVzdD0ke3Nsb3RQYW5lbC5oaXR0ZXN0fSwgdmlzaWJsZT0ke3Nsb3RQYW5lbC5zdHlsZS52aXNpYmlsaXR5fWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKaoO+4jyDmp73kvY0gJHtpfSDpnaLmnb/kuI3lrZjlnKjvvIFgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDor7fmsYLmnIDmlrDmlbDmja5cbiAgICByZXF1ZXN0SW52ZW50b3J5RGF0YSgpO1xufVxuZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBpZiAoIXJvb3RQYW5lbClcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vIPCflJEg5YWz6Zet6IOM5YyF5pe277yM5riF55CG5omA5pyJ5ouW5ou954q25oCB5ZKM5LqL5Lu255uR5ZCs5ZmoXG4gICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKaoO+4jyDog4zljIXlhbPpl63ml7bmo4DmtYvliLDmi5bmi73nirbmgIHvvIzmraPlnKjmuIXnkIYuLi4nKTtcbiAgICAgICAgLy8g5YGc5q2i5ouW5ou95a6a5pe25ZmoXG4gICAgICAgIGlmIChjdXJyZW50RHJhZ0ludGVydmFsKSB7XG4gICAgICAgICAgICAkLkNhbmNlbFNjaGVkdWxlZChjdXJyZW50RHJhZ0ludGVydmFsKTtcbiAgICAgICAgICAgIGN1cnJlbnREcmFnSW50ZXJ2YWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIPCflJEg55u05o6l5Yig6Zmk6Z2i5p2/77yI5Yig6Zmk6Z2i5p2/5Lya6Ieq5Yqo56e76Zmk5omA5pyJ5LqL5Lu255uR5ZCs5Zmo77yJXG4gICAgICAgIGlmIChkcmFnQ2FwdHVyZVBhbmVsKSB7XG4gICAgICAgICAgICBkcmFnQ2FwdHVyZVBhbmVsLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAgICAgZHJhZ0NhcHR1cmVQYW5lbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRyYWdHaG9zdFBhbmVsKSB7XG4gICAgICAgICAgICBkcmFnR2hvc3RQYW5lbC5EZWxldGVBc3luYygwKTtcbiAgICAgICAgICAgIGRyYWdHaG9zdFBhbmVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyDwn5SRIOWIoOmZpOeCueWHu+aNleiOt+mdouadv1xuICAgICAgICBpZiAoYm9hcmRDbGlja0NhcHR1cmUpIHtcbiAgICAgICAgICAgIGJvYXJkQ2xpY2tDYXB0dXJlLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAgICAgYm9hcmRDbGlja0NhcHR1cmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRNb3VzZVVwSGFuZGxlciA9IG51bGw7XG4gICAgICAgIC8vIOaBouWkjeanveS9jeagt+W8j1xuICAgICAgICBpZiAoZHJhZ2dlZFNsb3RJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBzbG90ID0gJChgI0ludmVudG9yeVNsb3RfJHtkcmFnZ2VkU2xvdEluZGV4fWApO1xuICAgICAgICAgICAgaWYgKHNsb3QpIHtcbiAgICAgICAgICAgICAgICBzbG90LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IElOVkVOVE9SWV9USEVNRS5zbG90Qmc7XG4gICAgICAgICAgICAgICAgc2xvdC5zdHlsZS5vcGFjaXR5ID0gJzEuMCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5riF55CG5o+Q56S66KaG55uW5bGCXG4gICAgICAgIGlmIChkcmFnT3ZlcmxheSkge1xuICAgICAgICAgICAgZHJhZ092ZXJsYXkuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgICAgICBkcmFnT3ZlcmxheSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6YeN572u54q25oCBXG4gICAgICAgIGRyYWdnZWRQaWVjZSA9IG51bGw7XG4gICAgICAgIGRyYWdnZWRTbG90SW5kZXggPSAtMTtcbiAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICBkcmFnU3RhcnRQb3MgPSBudWxsO1xuICAgIH1cbiAgICByb290UGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKcheKcheKchSBJbnZlbnRvcnkgaGlkZGVuJyk7XG59XG5mdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICBoaWRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93KCk7XG4gICAgfVxufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5pWw5o2u5pu05pawXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiByZXF1ZXN0SW52ZW50b3J5RGF0YSgpIHtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gUmVxdWVzdGluZyBpbnZlbnRvcnkgZGF0YSBmcm9tIHNlcnZlci4uLicpO1xuICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdyZXF1ZXN0X2ludmVudG9yeV9kYXRhJywge1xuICAgICAgICBwbGF5ZXJJZDogUGxheWVycy5HZXRMb2NhbFBsYXllcigpXG4gICAgfSk7XG59XG4vLyBIZWxwZXIgdG8gY29udmVydCBMdWEgdGFibGUgKG9iamVjdCkgdG8gSlMgYXJyYXlcbmZ1bmN0aW9uIGNvbnZlcnRUb0FycmF5KG9iaikge1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOi+k+WFpeexu+WeizogJHt0eXBlb2Ygb2JqfWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOaYr+aVsOe7hDogJHtBcnJheS5pc0FycmF5KG9iail9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDlt7Lnu4/mmK/mlbDnu4TvvIzplb/luqY6ICR7b2JqLmxlbmd0aH1gKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g5byA5aeL6YGN5Y6G5a+56LGhLi4uYCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0ga2V5OiAke2tleX0sIHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KG9ialtrZXldKX1gKTtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOmBjeWOhuWujOaIkO+8jOaJvuWIsCAke2NvdW50fSDkuKrlhYPntKBgKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g57uT5p6c5pWw57uE6ZW/5bqmOiAke2Fyci5sZW5ndGh9YCk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOaXoOazlei9rOaNou+8jOi/lOWbnuepuuaVsOe7hGApO1xuICAgIHJldHVybiBbXTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUludmVudG9yeURhdGEoZGF0YSkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSA9PT09PT09PT09IOabtOaWsOiDjOWMheaVsOaNriA9PT09PT09PT09Jyk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOaVsOaNruWvueixoTogJHtKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhkYXRhKSl9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGRhdGEucGllY2VzIOexu+WeizogJHt0eXBlb2YgZGF0YS5waWVjZXN9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGRhdGEucGllY2VzIOaYr+aVsOe7hDogJHtBcnJheS5pc0FycmF5KGRhdGEucGllY2VzKX1gKTtcbiAgICBpZiAoIWRhdGEucGllY2VzKSB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDimqDvuI8gZGF0YS5waWVjZXMgaXMgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOWujOaVtOaVsOaNrjogJHtKU09OLnN0cmluZ2lmeShkYXRhKX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDovazmjaIgTHVhIOihqOS4uiBKYXZhU2NyaXB0IOaVsOe7hFxuICAgIGNvbnN0IHBpZWNlc0FycmF5ID0gY29udmVydFRvQXJyYXkoZGF0YS5waWVjZXMpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDovazmjaLlkI7nmoTmlbDnu4Tplb/luqY6ICR7cGllY2VzQXJyYXkubGVuZ3RofWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDmlLbliLAgJHtwaWVjZXNBcnJheS5sZW5ndGh9IOS4quaji+WtkGApO1xuICAgIC8vIPCflJEg5riF56m65omA5pyJ5qe95L2N77yI56Gu5L+d5rKh5pyJ5q6L55WZ5pWw5o2u77yJXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfU0xPVFM7IGkrKykge1xuICAgICAgICB1cGRhdGVTbG90KGksIG51bGwpO1xuICAgIH1cbiAgICAvLyDwn5SRIOabtOaWsOaji+WtkO+8iOWPquabtOaWsOacieaViOeahOaji+WtkO+8jOehruS/neaVsOaNruWujOaVtO+8iVxuICAgIHBpZWNlc0FycmF5LmZvckVhY2goKHBpZWNlLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyDmo4Dmn6Xmo4vlrZDmlbDmja7mmK/lkKblrozmlbRcbiAgICAgICAgaWYgKCFwaWVjZSB8fCAhcGllY2UuaWQgfHwgIXBpZWNlLnVuaXROYW1lKSB7XG4gICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pqg77iPIOi3s+i/h+aXoOaViOaji+WtkOaVsOaNru+8jOe0ouW8lTogJHtpbmRleH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCBNQVhfU0xPVFMpIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDmm7TmlrDmp73kvY0gJHtpbmRleH06ICR7cGllY2UuZGlzcGxheU5hbWV9ICgke3BpZWNlLnVuaXROYW1lfSlgKTtcbiAgICAgICAgICAgIHVwZGF0ZVNsb3QoaW5kZXgsIHBpZWNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDimqDvuI8g5qOL5a2Q5pWw6YeP6LaF5Ye65qe95L2N6ZmQ5Yi277yM6Lez6L+H57Si5byVICR7aW5kZXh9OiAke3BpZWNlLmRpc3BsYXlOYW1lfWApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8g8J+UkSDorrDlvZXlrp7pmYXmm7TmlrDnmoTmp73kvY3mlbDph49cbiAgICBjb25zdCBmaWxsZWRTbG90cyA9IHBpZWNlc0FycmF5LmZpbHRlcigocCwgaSkgPT4gcCAmJiBwLmlkICYmIGkgPCBNQVhfU0xPVFMpLmxlbmd0aDtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g5a6e6ZmF5aGr5YWF5qe95L2N5pWw6YePOiAke2ZpbGxlZFNsb3RzfS8ke01BWF9TTE9UU31gKTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gPT09PT09PT09PSDog4zljIXmm7TmlrDlrozmiJAgPT09PT09PT09PScpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5LqL5Lu25aSE55CGXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiByZWdpc3RlckV2ZW50SGFuZGxlcnMoKSB7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlZ2lzdGVyaW5nIGV2ZW50IGhhbmRsZXJzLi4uJyk7XG4gICAgLy8g5o6l5pS25pyN5Yqh56uv5Y+R6YCB55qE6IOM5YyF5pWw5o2uXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3VwZGF0ZV9pbnZlbnRvcnlfZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSBSZWNlaXZlZCB1cGRhdGVfaW52ZW50b3J5X2RhdGEgZXZlbnQnKTtcbiAgICAgICAgdXBkYXRlSW52ZW50b3J5RGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICAvLyDpg6jnvbLlj43ppohcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZGVwbG95bWVudF9mZWVkYmFjaycsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn5OsIOmDqOe9suWPjemmiDogJHtkYXRhLnN1Y2Nlc3MgPyAn4pyFJyA6ICfinYwnfSAke2RhdGEubWVzc2FnZSB8fCAnJ31gKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfk6wg5Y+N6aaI5pWw5o2uOiBzbG90SW5kZXg9JHtkYXRhLnNsb3RJbmRleH0sIHN1Y2Nlc3M9JHtkYXRhLnN1Y2Nlc3N9YCk7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn5OsIOWujOaVtOWPjemmiOaVsOaNrjogJHtKU09OLnN0cmluZ2lmeShkYXRhKX1gKTtcbiAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgLy8g8J+UkSDpg6jnvbLmiJDlip8gLSDnq4vljbPmuIXnkIbpgInmi6nnirbmgIHvvIjlnKjmuIXnqbrmp73kvY3kuYvliY3vvIlcbiAgICAgICAgICAgIC8vIOi/meagt+WPr+S7peehruS/neeKtuaAgeiiq+a4hemZpO+8jOWNs+S9v+anveS9jeW3sue7j+iiq+a4heepulxuICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCflIQg6YOo572y5oiQ5Yqf77yM5byA5aeL5riF55CG6YCJ5oup54q25oCBYCk7XG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgLy8g8J+UkSDlj4zph43kv53pmanvvJrnoa7kv53ngrnlh7vmjZXojrfpnaLmnb/ooqvliKDpmaTvvIjlu7bov5/kuIDluKfvvIlcbiAgICAgICAgICAgICQuU2NoZWR1bGUoMC4wMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChib2FyZENsaWNrQ2FwdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICBib2FyZENsaWNrQ2FwdHVyZS5EZWxldGVBc3luYygwKTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRDbGlja0NhcHR1cmUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJyZW50TW91c2VVcEhhbmRsZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinIXinIXinIUg5Y+M6YeN5L+d6Zmp77ya56Gu5L+d54K55Ye75o2V6I636Z2i5p2/5bey5riF6ZmkYCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIPCflJEg54S25ZCO5riF56m65qe95L2NXG4gICAgICAgICAgICBpZiAoZGF0YS5zbG90SW5kZXggIT09IHVuZGVmaW5lZCAmJiBkYXRhLnNsb3RJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDpg6jnvbLmiJDlip/vvIznq4vljbPmuIXnqbrmp73kvY0gJHtkYXRhLnNsb3RJbmRleH1gKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVTbG90KGRhdGEuc2xvdEluZGV4LCBudWxsKTsgLy8g56uL5Y2z5riF56m65qe95L2NXG4gICAgICAgICAgICAgICAgLy8g8J+UkSDlu7bov5/or7fmsYLmnIDmlrDmlbDmja7vvIznoa7kv53mnI3liqHnq6/lt7Lnu4/mm7TmlrBcbiAgICAgICAgICAgICAgICAkLlNjaGVkdWxlKDAuMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+UhCDlu7bov5/or7fmsYLmnIDmlrDog4zljIXmlbDmja5gKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEludmVudG9yeURhdGEoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDimqDvuI8g6YOo572y5oiQ5Yqf5L2GIHNsb3RJbmRleCDml6DmlYg6ICR7ZGF0YS5zbG90SW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgLy8g5Y2z5L2/IHNsb3RJbmRleCDml6DmlYjvvIzkuZ/or7fmsYLmnIDmlrDmlbDmja5cbiAgICAgICAgICAgICAgICAkLlNjaGVkdWxlKDAuMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0SW52ZW50b3J5RGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ29pbnNCaWcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIPCflJEg6YOo572y5aSx6LSlIC0g5Zue5Yiw5Y6f5L2N572uXG4gICAgICAgICAgICBpZiAoZGF0YS5zbG90SW5kZXggIT09IHVuZGVmaW5lZCAmJiBkYXRhLnNsb3RJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKdjCDpg6jnvbLlpLHotKXvvIzmgaLlpI3mp73kvY0gJHtkYXRhLnNsb3RJbmRleH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm5Ub09yaWdpbmFsUG9zaXRpb24oZGF0YS5zbG90SW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ2FuY2VsJyk7XG4gICAgICAgICAgICAvLyDwn5SRIOmDqOe9suWksei0peS5n+imgea4heeQhumAieaLqeeKtuaAgVxuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIC8vIPCflJEg5Y+M6YeN5L+d6Zmp77ya56Gu5L+d54K55Ye75o2V6I636Z2i5p2/6KKr5Yig6ZmkXG4gICAgICAgICAgICAkLlNjaGVkdWxlKDAuMDEsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRDbGlja0NhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmRDbGlja0NhcHR1cmUuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgICAgICAgICAgICAgIGJvYXJkQ2xpY2tDYXB0dXJlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VycmVudE1vdXNlVXBIYW5kbGVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyF4pyF4pyFIOWPjOmHjeS/nemZqe+8muehruS/neeCueWHu+aNleiOt+mdouadv+W3sua4hemZpO+8iOmDqOe9suWksei0pe+8iWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyDlv6vmjbfplK7liIfmjaLog4zljIVcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgndG9nZ2xlX2ludmVudG9yeScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlY2VpdmVkIHRvZ2dsZV9pbnZlbnRvcnkgZXZlbnQnKTtcbiAgICAgICAgdG9nZ2xlKCk7XG4gICAgfSk7XG4gICAgLy8g5pi+56S66IOM5YyFXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3Nob3dfaW52ZW50b3J5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0gUmVjZWl2ZWQgc2hvd19pbnZlbnRvcnkgZXZlbnQnKTtcbiAgICAgICAgc2hvdygpO1xuICAgIH0pO1xuICAgIC8vIOmakOiXj+iDjOWMhVxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdoaWRlX2ludmVudG9yeScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlY2VpdmVkIGhpZGVfaW52ZW50b3J5IGV2ZW50Jyk7XG4gICAgICAgIGhpZGUoKTtcbiAgICB9KTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyFIEV2ZW50IGhhbmRsZXJzIHJlZ2lzdGVyZWQnKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWFqOWxgEFQSVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gZXhwb3NlR2xvYmFsQVBJKCkge1xuICAgIGdsb2JhbFRoaXMuSW52ZW50b3J5ID0ge1xuICAgICAgICBzaG93OiBzaG93LFxuICAgICAgICBoaWRlOiBoaWRlLFxuICAgICAgICB0b2dnbGU6IHRvZ2dsZSxcbiAgICAgICAgdXBkYXRlOiB1cGRhdGVJbnZlbnRvcnlEYXRhLFxuICAgICAgICByZXF1ZXN0RGF0YTogcmVxdWVzdEludmVudG9yeURhdGFcbiAgICB9O1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSDinIUgR2xvYmFsIEFQSSBleHBvc2VkOiBJbnZlbnRvcnkuc2hvdygpLCAuaGlkZSgpLCAudG9nZ2xlKCknKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWQr+WKqFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g562J5b6FRE9N5Yqg6L295a6M5oiQ5ZCO5Yid5aeL5YyWXG4kLlNjaGVkdWxlKDAuMSwgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinYwgSW5pdGlhbGl6YXRpb24gZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgfVxufSk7XG4kLk1zZygnW0ludmVudG9yeV0gU2NyaXB0IGxvYWRlZCBzdWNjZXNzZnVsbHknKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==