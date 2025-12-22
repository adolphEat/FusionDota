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
    // 🔑 关键：根面板必须允许事件传递（但自身不拦截）
    // hittest="false" 会阻止所有子元素的事件，所以不设置或设置为 true
    // 但为了不影响其他UI，我们让根面板不拦截事件，但允许事件传递到子元素
    rootPanel.hittest = false; // 根面板不拦截，但允许事件传递
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
    // 🔑 关键：设置拖拽属性（需要 draggable 才能拖拽）
    slot.hittest = true;
    slot.draggable = true; // 需要设置为 true 才能拖拽
    // 🔑 确保容器允许拖拽（重要！）
    if (slotsContainer) {
        slotsContainer.hittest = true; // 容器必须能接收事件
    }
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
    const slot = inventorySlots[slotIndex];
    if (!slot)
        return;
    slot.piece = piece;
    const slotPanel = $(`#${slot.panelId}`);
    if (!slotPanel)
        return;
    // 清空槽位
    slotPanel.RemoveAndDeleteChildren();
    // 🔑 清空后确保拖拽属性（防御性编程）
    slotPanel.hittest = true;
    slotPanel.draggable = true;
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
    // 🔑 确保可以接收拖拽事件
    slotPanel.hittest = true;
    slotPanel.draggable = true; // 需要设置为 true 才能拖拽
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
    $.Msg(`[Inventory] 为槽位 ${slotIndex} 设置拖拽事件 (${piece.displayName})`);
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
function setupDragEvents(slotPanel, piece, slotIndex) {
    // 🔑 确保可以接收拖拽事件
    slotPanel.hittest = true;
    slotPanel.draggable = true; // 需要设置为 true 才能拖拽
    // 🔑 确保所有子元素不拦截事件（防御性编程）
    const children = slotPanel.Children();
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child) {
            child.hittest = false;
        }
    }
    $.Msg(`[Inventory] 🎯 注册点击事件: 槽位=${slotIndex}, 棋子=${piece.displayName}, hittest=${slotPanel.hittest}`);
    // 🔑 使用 onmousedown 开始拖拽（不阻止默认行为，让鼠标可以移动）
    slotPanel.SetPanelEvent('onmousedown', () => {
        $.Msg(`[Inventory] 🖱️ 鼠标按下 - 槽位 ${slotIndex}, 棋子: ${piece.displayName}`);
        // 如果已经在拖拽状态，取消之前的拖拽
        if (isDragging && draggedPiece) {
            cleanupDrag();
        }
        // 设置部署模式
        draggedPiece = piece;
        draggedSlotIndex = slotIndex;
        isDragging = true;
        $.Msg(`[Inventory] 🔧 设置拖拽状态: isDragging=${isDragging}, draggedPiece=${piece.displayName}`);
        // 创建部署提示
        createDragOverlay(piece);
        // 高亮原始槽位
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBgDragging;
        slotPanel.style.opacity = '0.5';
        $.Msg(`[Inventory] ✅ 已选择棋子，拖拽到棋盘位置部署`);
        // 🔑 在根面板上监听点击（用于部署）
        const contextPanel = $.GetContextPanel();
        // 使用一个标志来跟踪是否应该处理点击
        let shouldHandleClick = true;
        const deployOnClick = () => {
            // 如果已经清理或不应该处理，直接返回
            if (!shouldHandleClick || !draggedPiece || !isDragging) {
                return;
            }
            $.Msg(`[Inventory] 🎯 检测到点击，执行部署: ${draggedPiece.displayName}`);
            deployPieceAtCursor(draggedPiece, draggedSlotIndex);
            cleanupDrag();
            shouldHandleClick = false; // 标记为不再处理
        };
        // 设置事件监听（只设置一次，通过标志控制）
        contextPanel.SetPanelEvent('onactivate', deployOnClick);
        // 30秒后自动清理
        $.Schedule(30.0, () => {
            if (draggedPiece && isDragging && draggedSlotIndex === slotIndex) {
                $.Msg(`[Inventory] ⚠️ 部署超时，清理状态`);
                cleanupDrag();
                shouldHandleClick = false; // 标记为不再处理
            }
        });
        // 🔑 不返回 true，让默认行为继续（允许鼠标移动）
        // return true;  // 注释掉，让鼠标可以移动
    });
    // 🔑 也支持 onactivate（点击事件）作为备用
    slotPanel.SetPanelEvent('onactivate', () => {
        // 如果已经在拖拽状态，不处理（避免重复）
        if (isDragging && draggedSlotIndex === slotIndex) {
            return;
        }
        $.Msg(`[Inventory] 🖱️ 点击棋子 - 槽位 ${slotIndex}, 棋子: ${piece.displayName}`);
        // 设置部署模式（点击模式）
        draggedPiece = piece;
        draggedSlotIndex = slotIndex;
        isDragging = true;
        // 创建部署提示
        createDragOverlay(piece);
        // 高亮原始槽位
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBgDragging;
        slotPanel.style.opacity = '0.5';
        $.Msg(`[Inventory] ✅ 已选择棋子，点击棋盘位置部署`);
        // 🔑 在根面板上监听点击（用于部署）
        const contextPanel = $.GetContextPanel();
        // 使用一个标志来跟踪是否应该处理点击
        let shouldHandleClick = true;
        const deployOnClick = () => {
            // 如果已经清理或不应该处理，直接返回
            if (!shouldHandleClick || !draggedPiece || !isDragging) {
                return;
            }
            $.Msg(`[Inventory] 🎯 检测到点击，执行部署: ${draggedPiece.displayName}`);
            deployPieceAtCursor(draggedPiece, draggedSlotIndex);
            cleanupDrag();
            shouldHandleClick = false; // 标记为不再处理
        };
        // 设置事件监听（只设置一次，通过标志控制）
        contextPanel.SetPanelEvent('onactivate', deployOnClick);
        // 30秒后自动清理
        $.Schedule(30.0, () => {
            if (draggedPiece && isDragging && draggedSlotIndex === slotIndex) {
                $.Msg(`[Inventory] ⚠️ 部署超时，清理状态`);
                cleanupDrag();
                shouldHandleClick = false; // 标记为不再处理
            }
        });
    });
    // 清理拖拽状态
    function cleanupDrag() {
        // 恢复槽位样式
        const slot = $(`#InventorySlot_${draggedSlotIndex}`);
        if (slot) {
            slot.style.backgroundColor = INVENTORY_THEME.slotBg;
            slot.style.opacity = '1.0';
        }
        // 清理
        if (dragOverlay) {
            dragOverlay.DeleteAsync(0);
            dragOverlay = null;
        }
        draggedPiece = null;
        draggedSlotIndex = -1;
        isDragging = false;
    }
    // 保留原生拖拽事件作为备用
    slotPanel.SetPanelEvent('ondragstart', (panelId, dragCallbacks) => {
        $.Msg(`[Inventory] 🚀 拖拽开始: ${piece.displayName} (槽位 ${slotIndex})`);
        $.Msg(`[Inventory] 🚀 panelId: ${panelId}`);
        $.Msg(`[Inventory] 🚀 dragCallbacks 存在: ${dragCallbacks != null}`);
        if (dragCallbacks) {
            $.Msg(`[Inventory] 🚀 dragCallbacks 键: ${JSON.stringify(Object.keys(dragCallbacks))}`);
        }
        draggedPiece = piece;
        draggedSlotIndex = slotIndex;
        // 创建拖拽视觉反馈
        createDragOverlay(piece);
        // 高亮原始槽位
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBgDragging;
        slotPanel.style.opacity = '0.5';
        // 设置拖拽数据
        if (dragCallbacks) {
            try {
                dragCallbacks.displayPanel = createDragDisplayPanel(piece);
                dragCallbacks.offsetX = 0;
                dragCallbacks.offsetY = 0;
                $.Msg(`[Inventory] ✅ 拖拽数据已设置`);
            }
            catch (e) {
                $.Msg(`[Inventory] ❌ 设置拖拽数据时出错: ${e}`);
            }
        }
        else {
            $.Msg(`[Inventory] ❌ dragCallbacks 为 null 或 undefined!`);
        }
        return true;
    });
    slotPanel.SetPanelEvent('ondragend', (panelId, draggedPanel) => {
        $.Msg(`[Inventory] 🏁 拖拽结束: ${piece.displayName}`);
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
    $.Msg(`[Inventory] ✅ 拖拽事件注册完成 - 槽位 ${slotIndex}`);
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
        hint.text = '点击棋盘位置部署棋子（或按ESC取消）';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXVCLG9CQUFvQjtBQUNoRDtBQUNBLG9CQUFvQixlQUFlO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksQ0FBQyxvQ0FBb0MsTUFBTTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxZQUFZLENBQUMseUJBQXlCLE1BQU0sSUFBSSxtQkFBbUIsR0FBRyxlQUFlO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLFlBQVksQ0FBQyx1Q0FBdUMsTUFBTSxJQUFJLGtCQUFrQjtBQUNoRjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSSxDQUFDLDhCQUE4QixZQUFZLEdBQUcsVUFBVTtBQUM1RCxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLENBQUMseUNBQXlDLDBCQUEwQixFQUFFLGFBQWE7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQyw0Q0FBNEMsTUFBTTtBQUMzRDtBQUNBLENBQUM7QUFDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIHZhciBcIiRcIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxpbnZlbnRvcnlcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIEB0cy1ub2NoZWNrXG4vKipcbiAqIEludmVudG9yeSBVSSAtIOiDjOWMheeVjOmdolxuICog55So5LqO5pi+56S65ZKM566h55CG546p5a6255qE5qOL5a2Q6Zi15a65XG4gKiDmlK/mjIHmi5bmi73pg6jnvbLmo4vlrZBcbiAqL1xuJC5Nc2coJ/CfjpIgSW52ZW50b3J5IHNjcmlwdCBpcyBleGVjdXRpbmchJyk7XG5HYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5Li76aKY6YWN572uXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5jb25zdCBJTlZFTlRPUllfVEhFTUUgPSB7XG4gICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsIDIzLCA0MiwgMC45NSknLFxuICAgIHBhbmVsQmc6ICdyZ2JhKDMzLCAzNCwgMzEsIDAuOTgpJyxcbiAgICBzbG90Qmc6ICdyZ2JhKDUwLCA1MCwgNTAsIDAuOCknLFxuICAgIHNsb3RCZ0hvdmVyOiAncmdiYSg3MCwgNzAsIDcwLCAwLjkpJyxcbiAgICBzbG90QmdEcmFnZ2luZzogJ3JnYmEoMTAwLCAxNDksIDIzNywgMC41KScsXG4gICAgYm9yZGVyQ29sb3I6ICdyZ2JhKDU5LCAxMzAsIDI0NiwgMC42KScsXG4gICAgYm9yZGVyR29sZDogJ3JnYmEoMjU1LCAyMTUsIDAsIDAuOCknLFxuICAgIHRleHRQcmltYXJ5OiAnI2ZmZmZmZicsXG4gICAgdGV4dFNlY29uZGFyeTogJyNiOGI4YjgnLFxuICAgIHRleHRHb2xkOiAnI2ZmZDcwMCcsXG4gICAgdGV4dFJhcml0eToge1xuICAgICAgICBjb21tb246ICcjZmZmZmZmJyxcbiAgICAgICAgdW5jb21tb246ICcjNGNhZjUwJyxcbiAgICAgICAgcmFyZTogJyMyMTk2ZjMnLFxuICAgICAgICBlcGljOiAnIzljMjdiMCcsXG4gICAgICAgIGxlZ2VuZGFyeTogJyNmZjk4MDAnXG4gICAgfVxufTtcbi8vIOeogOacieW6puminOiJsuaYoOWwhFxuY29uc3QgUkFSSVRZX0NPTE9SUyA9IHtcbiAgICAnMSc6IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LmNvbW1vbixcbiAgICAnMic6IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LnVuY29tbW9uLFxuICAgICczJzogSU5WRU5UT1JZX1RIRU1FLnRleHRSYXJpdHkucmFyZSxcbiAgICAnNCc6IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LmVwaWMsXG4gICAgJzUnOiBJTlZFTlRPUllfVEhFTUUudGV4dFJhcml0eS5sZWdlbmRhcnlcbn07XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDlhajlsYDnirbmgIFcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCByb290UGFuZWwgPSBudWxsO1xubGV0IGNvbnRhaW5lclBhbmVsID0gbnVsbDtcbmxldCBzbG90c0NvbnRhaW5lciA9IG51bGw7XG5sZXQgaXNWaXNpYmxlID0gZmFsc2U7XG5sZXQgaW52ZW50b3J5U2xvdHMgPSBbXTtcbmxldCBkcmFnZ2VkUGllY2UgPSBudWxsO1xubGV0IGRyYWdnZWRTbG90SW5kZXggPSAtMTtcbmxldCBkcmFnT3ZlcmxheSA9IG51bGw7XG5sZXQgaXNEcmFnZ2luZyA9IGZhbHNlOyAvLyDwn5SRIOWFqOWxgOaLluaLveeKtuaAgVxuY29uc3QgTUFYX1NMT1RTID0gMTI7IC8vIOacgOWkp+Wkh+aImOW4reS9jeaVsFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5Yid5aeL5YyWXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSBJbml0aWFsaXppbmcuLi4nKTtcbiAgICAvLyDojrflj5bmiJbliJvlu7rmoLnpnaLmnb9cbiAgICByb290UGFuZWwgPSAkKCcjSW52ZW50b3J5Um9vdCcpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgIHJvb3RQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgJC5HZXRDb250ZXh0UGFuZWwoKSwgJ0ludmVudG9yeVJvb3QnKTtcbiAgICAgICAgcm9vdFBhbmVsLkFkZENsYXNzKCdpbnZlbnRvcnlfcm9vdCcpO1xuICAgIH1cbiAgICAvLyDwn5SRIOWFs+mUru+8muaguemdouadv+W/hemhu+WFgeiuuOS6i+S7tuS8oOmAku+8iOS9huiHqui6q+S4jeaLpuaIqu+8iVxuICAgIC8vIGhpdHRlc3Q9XCJmYWxzZVwiIOS8mumYu+atouaJgOacieWtkOWFg+e0oOeahOS6i+S7tu+8jOaJgOS7peS4jeiuvue9ruaIluiuvue9ruS4uiB0cnVlXG4gICAgLy8g5L2G5Li65LqG5LiN5b2x5ZON5YW25LuWVUnvvIzmiJHku6zorqnmoLnpnaLmnb/kuI3mi6bmiKrkuovku7bvvIzkvYblhYHorrjkuovku7bkvKDpgJLliLDlrZDlhYPntKBcbiAgICByb290UGFuZWwuaGl0dGVzdCA9IGZhbHNlOyAvLyDmoLnpnaLmnb/kuI3mi6bmiKrvvIzkvYblhYHorrjkuovku7bkvKDpgJJcbiAgICAvLyDwn5SRIOWmguaenOWuueWZqOW3suWtmOWcqO+8jOWFiOWIoOmZpO+8iOmYsuatoumHjeWkjeWIm+W7uuWvvOiHtOWkmuS4quanveS9je+8iVxuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gJCgnI0ludmVudG9yeUNvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICAgICAgY29udGFpbmVyUGFuZWwgPSBudWxsO1xuICAgICAgICBzbG90c0NvbnRhaW5lciA9IG51bGw7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDmuIXnkIbml6fnmoTlrrnlmajvvIzpmLLmraLph43lpI3liJvlu7onKTtcbiAgICB9XG4gICAgLy8g5Yib5bu65a655ZmoXG4gICAgY3JlYXRlQ29udGFpbmVyKCk7XG4gICAgLy8g5Yid5aeL5YyW5o+S5qe9XG4gICAgaW5pdGlhbGl6ZVNsb3RzKCk7XG4gICAgLy8g5rOo5YaM5LqL5Lu255uR5ZCsXG4gICAgcmVnaXN0ZXJFdmVudEhhbmRsZXJzKCk7XG4gICAgLy8g5pq06Zyy5YWo5bGAQVBJXG4gICAgZXhwb3NlR2xvYmFsQVBJKCk7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKchSBJbml0aWFsaXphdGlvbiBjb21wbGV0ZScpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVUkg5Yib5bu6XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBjcmVhdGVDb250YWluZXIoKSB7XG4gICAgY29udGFpbmVyUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ0ludmVudG9yeUNvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lclBhbmVsLkFkZENsYXNzKCdpbnZlbnRvcnlfY29udGFpbmVyJyk7XG4gICAgLy8g8J+UkSDlhbPplK7vvJrlrrnlmajpnaLmnb/lv4Xpobvog73mjqXmlLbpvKDmoIfkuovku7ZcbiAgICBjb250YWluZXJQYW5lbC5oaXR0ZXN0ID0gdHJ1ZTtcbiAgICAvLyDorr7nva7moLflvI9cbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTUwcHgnO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuYmFja2dyb3VuZDtcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5ib3JkZXJUb3AgPSBgMnB4IHNvbGlkICR7SU5WRU5UT1JZX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g5Yib5bu65qCH6aKYXG4gICAgY29uc3QgaGVhZGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXJQYW5lbCwgJ0ludmVudG9yeUhlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGhlYWRlci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5VGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+aji+WtkOiDjOWMhSc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dEdvbGQ7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgdGl0bGUuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTBweCc7XG4gICAgY29uc3QgaGludCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhZGVyLCAnSW52ZW50b3J5SGludCcpO1xuICAgIGhpbnQudGV4dCA9ICfmi5bmi73mo4vlrZDliLDmo4vnm5jpg6jnvbInO1xuICAgIGhpbnQuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgaGludC5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGhpbnQuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICBoaW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoaW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIC8vIOWIm+W7uuWFs+mXreaMiemSrlxuICAgIGNvbnN0IGNsb3NlQnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgaGVhZGVyLCAnSW52ZW50b3J5Q2xvc2VCdG4nKTtcbiAgICBjbG9zZUJ0bi50ZXh0ID0gJ+KclSc7XG4gICAgY2xvc2VCdG4uc3R5bGUud2lkdGggPSAnMzBweCc7XG4gICAgY2xvc2VCdG4uc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgY2xvc2VCdG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuYm9yZGVyID0gYDFweCBzb2xpZCAke0lOVkVOVE9SWV9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIGNsb3NlQnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc0cHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgY2xvc2VCdG4uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzEwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDlhbPpl63mjInpkq7ooqvngrnlh7snKTtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiAgICAgICAgaGlkZSgpO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyMzksIDY4LCA2OCwgMC44KSc7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmNvbG9yID0gJyNmZmZmZmYnO1xuICAgIH0pO1xuICAgIGNsb3NlQnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGNsb3NlQnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknO1xuICAgICAgICBjbG9zZUJ0bi5zdHlsZS5jb2xvciA9IElOVkVOVE9SWV9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIH0pO1xuICAgIC8vIOWIm+W7uuaPkuanveWuueWZqFxuICAgIC8vIPCflJEg5qOA5p+l5piv5ZCm5bey5a2Y5Zyo77yM6YG/5YWN6YeN5aSN5Yib5bu6XG4gICAgY29uc3QgZXhpc3RpbmdTbG90c0NvbnRhaW5lciA9ICQoJyNJbnZlbnRvcnlTbG90c0NvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ1Nsb3RzQ29udGFpbmVyKSB7XG4gICAgICAgIGV4aXN0aW5nU2xvdHNDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDliKDpmaTml6fnmoTmp73kvY3lrrnlmagnKTtcbiAgICB9XG4gICAgc2xvdHNDb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lclBhbmVsLCAnSW52ZW50b3J5U2xvdHNDb250YWluZXInKTtcbiAgICAvLyDorqHnrpflm7rlrprlrr3luqbvvJoxMuS4quanveS9jSAqICg5MHB45a695bqmICsgMTBweOW3puWPs21hcmdpbikgKyAxMHB45a655ZmocGFkZGluZyA9IDEyMTBweFxuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEyMTBweCc7IC8vIOWbuuWumuWuveW6pu+8jOehruS/neaJgOacieanveS9jee0p+WvhuaOkuWIl1xuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDBweCc7XG4gICAgc2xvdHNDb250YWluZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7IC8vIOmdoOW3puWvuem9kO+8jOanveS9jeS7juW3puWIsOWPs+S+neasoeaOkuWIl1xuICAgIHNsb3RzQ29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBzbG90c0NvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gJzVweCc7XG4gICAgLy8g8J+UkSDlhbPplK7vvJrlrrnlmajlv4Xpobvog73mjqXmlLbpvKDmoIfkuovku7bvvIzlkKbliJnmi5bmi73ml6Dms5Xlt6XkvZxcbiAgICBzbG90c0NvbnRhaW5lci5oaXR0ZXN0ID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGluaXRpYWxpemVTbG90cygpIHtcbiAgICBpZiAoIXNsb3RzQ29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgaW52ZW50b3J5U2xvdHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9TTE9UUzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNsb3RQYW5lbCA9IGNyZWF0ZVNsb3RQYW5lbChpKTtcbiAgICAgICAgY29uc3Qgc2xvdCA9IHtcbiAgICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgICAgcGllY2U6IG51bGwsXG4gICAgICAgICAgICBwYW5lbElkOiBzbG90UGFuZWwuaWRcbiAgICAgICAgfTtcbiAgICAgICAgaW52ZW50b3J5U2xvdHMucHVzaChzbG90KTtcbiAgICB9XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIENyZWF0ZWQgJHtNQVhfU0xPVFN9IHNsb3RzYCk7XG59XG5mdW5jdGlvbiBjcmVhdGVTbG90UGFuZWwoaW5kZXgpIHtcbiAgICBjb25zdCBzbG90ID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBzbG90c0NvbnRhaW5lciwgYEludmVudG9yeVNsb3RfJHtpbmRleH1gKTtcbiAgICBzbG90LkFkZENsYXNzKCdpbnZlbnRvcnlfc2xvdCcpO1xuICAgIC8vIPCflJEg5YWz6ZSu77ya6K6+572u5ouW5ou95bGe5oCn77yI6ZyA6KaBIGRyYWdnYWJsZSDmiY3og73mi5bmi73vvIlcbiAgICBzbG90LmhpdHRlc3QgPSB0cnVlO1xuICAgIHNsb3QuZHJhZ2dhYmxlID0gdHJ1ZTsgLy8g6ZyA6KaB6K6+572u5Li6IHRydWUg5omN6IO95ouW5ou9XG4gICAgLy8g8J+UkSDnoa7kv53lrrnlmajlhYHorrjmi5bmi73vvIjph43opoHvvIHvvIlcbiAgICBpZiAoc2xvdHNDb250YWluZXIpIHtcbiAgICAgICAgc2xvdHNDb250YWluZXIuaGl0dGVzdCA9IHRydWU7IC8vIOWuueWZqOW/hemhu+iDveaOpeaUtuS6i+S7tlxuICAgIH1cbiAgICAvLyDorr7nva7moLflvI8gLSDkuI3kvb/nlKggZmxvd0NoaWxkcmVu77yM6K6p5a2Q5YWD57Sg5Y+v5Lul5Y+g5Yqg5a6a5L2NXG4gICAgc2xvdC5zdHlsZS53aWR0aCA9ICc5MHB4JztcbiAgICBzbG90LnN0eWxlLmhlaWdodCA9ICc5MHB4JztcbiAgICBzbG90LnN0eWxlLm1hcmdpbiA9ICc1cHgnO1xuICAgIHNsb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICBzbG90LnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtJTlZFTlRPUllfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBzbG90LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIC8vIOS4jeiuvue9riBmbG93Q2hpbGRyZW7vvIzkvb/nlKjnu53lr7nlrprkvY3lj6DliqDlrZDlhYPntKBcbiAgICAvLyDliJvlu7rnqbrmp73mj5DnpLpcbiAgICBjb25zdCBlbXB0eUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90LCBgRW1wdHlMYWJlbF8ke2luZGV4fWApO1xuICAgIGVtcHR5TGFiZWwudGV4dCA9ICcrJztcbiAgICBlbXB0eUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzMycHgnO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBlbXB0eUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGVtcHR5TGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGVtcHR5TGFiZWwuaGl0dGVzdCA9IGZhbHNlOyAvLyDlrZDlhYPntKDkuI3mi6bmiKrkuovku7ZcbiAgICByZXR1cm4gc2xvdDtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOi+heWKqeWHveaVsFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLyoqXG4gKiDojrflj5blrozmlbTnmoToi7Hpm4TlkI3np7DvvIhucGNfZG90YV9oZXJvX3h4eCDmoLzlvI/vvIlcbiAqIERPVEFIZXJvSW1hZ2Ug6Z2i5p2/6ZyA6KaB5a6M5pW055qE6Iux6ZuE5ZCN56ewXG4gKiBAcGFyYW0gdW5pdE5hbWUgRE9UQTIg5Y2V5L2N5ZCNIChucGNfZG90YV9oZXJvX3h4eClcbiAqIEBwYXJhbSBwaWVjZUlkIOaji+WtkElEICjpgJrluLjmmK/nn63lkI3np7DlpoIgYXhlKVxuICovXG5mdW5jdGlvbiBnZXRGdWxsSGVyb05hbWUodW5pdE5hbWUsIHBpZWNlSWQpIHtcbiAgICAvLyDlpoLmnpwgdW5pdE5hbWUg5bey57uP5piv5a6M5pW05qC85byP77yM55u05o6l6L+U5ZueXG4gICAgaWYgKHVuaXROYW1lICYmIHVuaXROYW1lLnN0YXJ0c1dpdGgoJ25wY19kb3RhX2hlcm9fJykpIHtcbiAgICAgICAgcmV0dXJuIHVuaXROYW1lO1xuICAgIH1cbiAgICAvLyDlpoLmnpwgcGllY2VJZCDmmK/nn63lkI3np7DvvIzmt7vliqDliY3nvIBcbiAgICBpZiAocGllY2VJZCAmJiAhcGllY2VJZC5zdGFydHNXaXRoKCducGNfJykpIHtcbiAgICAgICAgcmV0dXJuIGBucGNfZG90YV9oZXJvXyR7cGllY2VJZH1gO1xuICAgIH1cbiAgICAvLyDlpoLmnpwgcGllY2VJZCDlt7Lnu4/mmK/lrozmlbTmoLzlvI9cbiAgICBpZiAocGllY2VJZCAmJiBwaWVjZUlkLnN0YXJ0c1dpdGgoJ25wY19kb3RhX2hlcm9fJykpIHtcbiAgICAgICAgcmV0dXJuIHBpZWNlSWQ7XG4gICAgfVxuICAgIC8vIOWbnumAgO+8muWwneivleS9v+eUqCB1bml0TmFtZSDmiJYgcGllY2VJZFxuICAgIHJldHVybiB1bml0TmFtZSB8fCBgbnBjX2RvdGFfaGVyb18ke3BpZWNlSWR9YCB8fCAnbnBjX2RvdGFfaGVyb19heGUnO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5qOL5a2Q5pi+56S6XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiB1cGRhdGVTbG90KHNsb3RJbmRleCwgcGllY2UpIHtcbiAgICBjb25zdCBzbG90ID0gaW52ZW50b3J5U2xvdHNbc2xvdEluZGV4XTtcbiAgICBpZiAoIXNsb3QpXG4gICAgICAgIHJldHVybjtcbiAgICBzbG90LnBpZWNlID0gcGllY2U7XG4gICAgY29uc3Qgc2xvdFBhbmVsID0gJChgIyR7c2xvdC5wYW5lbElkfWApO1xuICAgIGlmICghc2xvdFBhbmVsKVxuICAgICAgICByZXR1cm47XG4gICAgLy8g5riF56m65qe95L2NXG4gICAgc2xvdFBhbmVsLlJlbW92ZUFuZERlbGV0ZUNoaWxkcmVuKCk7XG4gICAgLy8g8J+UkSDmuIXnqbrlkI7noa7kv53mi5bmi73lsZ7mgKfvvIjpmLLlvqHmgKfnvJbnqIvvvIlcbiAgICBzbG90UGFuZWwuaGl0dGVzdCA9IHRydWU7XG4gICAgc2xvdFBhbmVsLmRyYWdnYWJsZSA9IHRydWU7XG4gICAgaWYgKHBpZWNlKSB7XG4gICAgICAgIHJlbmRlclBpZWNlSW5TbG90KHNsb3RQYW5lbCwgcGllY2UsIHNsb3RJbmRleCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyDmgaLlpI3nqbrmp73mj5DnpLpcbiAgICAgICAgY29uc3QgZW1wdHlMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc2xvdFBhbmVsLCBgRW1wdHlMYWJlbF8ke3Nsb3RJbmRleH1gKTtcbiAgICAgICAgZW1wdHlMYWJlbC50ZXh0ID0gJysnO1xuICAgICAgICBlbXB0eUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzMycHgnO1xuICAgICAgICBlbXB0eUxhYmVsLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGVtcHR5TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBlbXB0eUxhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC4zJztcbiAgICAgICAgZW1wdHlMYWJlbC5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVuZGVyUGllY2VJblNsb3Qoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KSB7XG4gICAgLy8g8J+UkSDnoa7kv53lj6/ku6XmjqXmlLbmi5bmi73kuovku7ZcbiAgICBzbG90UGFuZWwuaGl0dGVzdCA9IHRydWU7XG4gICAgc2xvdFBhbmVsLmRyYWdnYWJsZSA9IHRydWU7IC8vIOmcgOimgeiuvue9ruS4uiB0cnVlIOaJjeiDveaLluaLvVxuICAgIC8vIOS9v+eUqCBET1RBMiDlhoXnva7nmoQgRE9UQUhlcm9JbWFnZSDpnaLmnb/mmL7npLroi7Hpm4TlpLTlg49cbiAgICBjb25zdCBoZXJvSW1hZ2UgPSAkLkNyZWF0ZVBhbmVsKCdET1RBSGVyb0ltYWdlJywgc2xvdFBhbmVsLCBgSGVyb0ltYWdlXyR7c2xvdEluZGV4fWApO1xuICAgIC8vIOWktOWDj+Whq+a7oeaVtOS4quanveS9jVxuICAgIGhlcm9JbWFnZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZXJvSW1hZ2Uuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGhlcm9JbWFnZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoZXJvSW1hZ2Uuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIC8vIPCflJEg5YWz6ZSu77ya5a2Q5YWD57Sg5LiN5oum5oiq6byg5qCH5LqL5Lu2XG4gICAgaGVyb0ltYWdlLmhpdHRlc3QgPSBmYWxzZTtcbiAgICAvLyDojrflj5blrozmlbTnmoToi7Hpm4TlkI3np7DvvIhucGNfZG90YV9oZXJvX3h4eCDmoLzlvI/vvIlcbiAgICBjb25zdCBoZXJvTmFtZSA9IGdldEZ1bGxIZXJvTmFtZShwaWVjZS51bml0TmFtZSwgcGllY2UuaWQpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDorr7nva7oi7Hpm4Tlm77moIc6ICR7aGVyb05hbWV9YCk7XG4gICAgLy8g6K6+572u6Iux6ZuE5ZCN56ew5ZKM5Zu+5YOP5qC35byPXG4gICAgLy8gRE9UQUhlcm9JbWFnZSDlsZ7mgKc6IGhlcm9uYW1lLCBoZXJvaWQsIGhlcm9pbWFnZXN0eWxlXG4gICAgaGVyb0ltYWdlLmhlcm9uYW1lID0gaGVyb05hbWU7XG4gICAgaGVyb0ltYWdlLmhlcm9pbWFnZXN0eWxlID0gJ3BvcnRyYWl0JzsgLy8gcG9ydHJhaXQ6IDcxeDk0LCBpY29uOiAzMngzMiwgbGFuZHNjYXBlOiAxMjh4NzJcbiAgICAvLyDnqIDmnInluqbovrnmoYZcbiAgICBjb25zdCByYXJpdHlDb2xvciA9IFJBUklUWV9DT0xPUlNbcGllY2UucmFyaXR5LnRvU3RyaW5nKCldIHx8IElOVkVOVE9SWV9USEVNRS50ZXh0UmFyaXR5LmNvbW1vbjtcbiAgICBzbG90UGFuZWwuc3R5bGUuYm9yZGVyID0gYDNweCBzb2xpZCAke3Jhcml0eUNvbG9yfWA7XG4gICAgc2xvdFBhbmVsLnN0eWxlLmJveFNoYWRvdyA9IGAwIDAgMTBweCAke3Jhcml0eUNvbG9yfWA7XG4gICAgLy8g6LS555So5qCH562+XG4gICAgY29uc3QgY29zdExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzbG90UGFuZWwsIGBDb3N0XyR7c2xvdEluZGV4fWApO1xuICAgIGNvc3RMYWJlbC50ZXh0ID0gYCR7cGllY2UuY29zdH3wn5KwYDtcbiAgICBjb3N0TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgY29zdExhYmVsLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRHb2xkO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgY29zdExhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJztcbiAgICBjb3N0TGFiZWwuc3R5bGUubWFyZ2luTGVmdCA9ICc1cHgnO1xuICAgIGNvc3RMYWJlbC5zdHlsZS5tYXJnaW5Ub3AgPSAnNXB4JztcbiAgICBjb3N0TGFiZWwuc3R5bGUudGV4dFNoYWRvdyA9ICcxcHggMXB4IDJweCAjMDAwMDAwJztcbiAgICBjb3N0TGFiZWwuaGl0dGVzdCA9IGZhbHNlOyAvLyDkuI3mi6bmiKrkuovku7ZcbiAgICAvLyDlkI3np7DmoIfnrb7vvIjmgqzlgZzml7bmmL7npLrvvIlcbiAgICBjb25zdCBuYW1lTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHNsb3RQYW5lbCwgYE5hbWVfJHtzbG90SW5kZXh9YCk7XG4gICAgbmFtZUxhYmVsLnRleHQgPSBwaWVjZS5kaXNwbGF5TmFtZTtcbiAgICBuYW1lTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLmNvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIG5hbWVMYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBuYW1lTGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdib3R0b20nO1xuICAgIG5hbWVMYWJlbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMnB4JztcbiAgICBuYW1lTGFiZWwuc3R5bGUudGV4dFNoYWRvdyA9ICcxcHggMXB4IDNweCAjMDAwMDAwJztcbiAgICBuYW1lTGFiZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC43KSc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDVweCc7XG4gICAgbmFtZUxhYmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICczcHgnO1xuICAgIG5hbWVMYWJlbC5oaXR0ZXN0ID0gZmFsc2U7IC8vIOS4jeaLpuaIquS6i+S7tlxuICAgIC8vIOiuvue9ruaLluaLveS6i+S7tlxuICAgICQuTXNnKGBbSW52ZW50b3J5XSDkuLrmp73kvY0gJHtzbG90SW5kZXh9IOiuvue9ruaLluaLveS6i+S7tiAoJHtwaWVjZS5kaXNwbGF5TmFtZX0pYCk7XG4gICAgc2V0dXBEcmFnRXZlbnRzKHNsb3RQYW5lbCwgcGllY2UsIHNsb3RJbmRleCk7XG4gICAgLy8g5oKs5YGc5pWI5p6cXG4gICAgc2xvdFBhbmVsLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZ0hvdmVyO1xuICAgICAgICBzbG90UGFuZWwuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMS4wNSwgMS4wNSwgMS4wKSc7XG4gICAgfSk7XG4gICAgc2xvdFBhbmVsLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2VkU2xvdEluZGV4ICE9PSBzbG90SW5kZXgpIHtcbiAgICAgICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnO1xuICAgICAgICAgICAgc2xvdFBhbmVsLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKDEuMCwgMS4wLCAxLjApJztcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5ouW5ou95Yqf6IO9XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBzZXR1cERyYWdFdmVudHMoc2xvdFBhbmVsLCBwaWVjZSwgc2xvdEluZGV4KSB7XG4gICAgLy8g8J+UkSDnoa7kv53lj6/ku6XmjqXmlLbmi5bmi73kuovku7ZcbiAgICBzbG90UGFuZWwuaGl0dGVzdCA9IHRydWU7XG4gICAgc2xvdFBhbmVsLmRyYWdnYWJsZSA9IHRydWU7IC8vIOmcgOimgeiuvue9ruS4uiB0cnVlIOaJjeiDveaLluaLvVxuICAgIC8vIPCflJEg56Gu5L+d5omA5pyJ5a2Q5YWD57Sg5LiN5oum5oiq5LqL5Lu277yI6Ziy5b6h5oCn57yW56iL77yJXG4gICAgY29uc3QgY2hpbGRyZW4gPSBzbG90UGFuZWwuQ2hpbGRyZW4oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaGlsZCkge1xuICAgICAgICAgICAgY2hpbGQuaGl0dGVzdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIOazqOWGjOeCueWHu+S6i+S7tjog5qe95L2NPSR7c2xvdEluZGV4fSwg5qOL5a2QPSR7cGllY2UuZGlzcGxheU5hbWV9LCBoaXR0ZXN0PSR7c2xvdFBhbmVsLmhpdHRlc3R9YCk7XG4gICAgLy8g8J+UkSDkvb/nlKggb25tb3VzZWRvd24g5byA5aeL5ouW5ou977yI5LiN6Zi75q2i6buY6K6k6KGM5Li677yM6K6p6byg5qCH5Y+v5Lul56e75Yqo77yJXG4gICAgc2xvdFBhbmVsLlNldFBhbmVsRXZlbnQoJ29ubW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+Wse+4jyDpvKDmoIfmjInkuIsgLSDmp73kvY0gJHtzbG90SW5kZXh9LCDmo4vlrZA6ICR7cGllY2UuZGlzcGxheU5hbWV9YCk7XG4gICAgICAgIC8vIOWmguaenOW3sue7j+WcqOaLluaLveeKtuaAge+8jOWPlua2iOS5i+WJjeeahOaLluaLvVxuICAgICAgICBpZiAoaXNEcmFnZ2luZyAmJiBkcmFnZ2VkUGllY2UpIHtcbiAgICAgICAgICAgIGNsZWFudXBEcmFnKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6K6+572u6YOo572y5qih5byPXG4gICAgICAgIGRyYWdnZWRQaWVjZSA9IHBpZWNlO1xuICAgICAgICBkcmFnZ2VkU2xvdEluZGV4ID0gc2xvdEluZGV4O1xuICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCflKcg6K6+572u5ouW5ou954q25oCBOiBpc0RyYWdnaW5nPSR7aXNEcmFnZ2luZ30sIGRyYWdnZWRQaWVjZT0ke3BpZWNlLmRpc3BsYXlOYW1lfWApO1xuICAgICAgICAvLyDliJvlu7rpg6jnvbLmj5DnpLpcbiAgICAgICAgY3JlYXRlRHJhZ092ZXJsYXkocGllY2UpO1xuICAgICAgICAvLyDpq5jkuq7ljp/lp4vmp73kvY1cbiAgICAgICAgc2xvdFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IElOVkVOVE9SWV9USEVNRS5zbG90QmdEcmFnZ2luZztcbiAgICAgICAgc2xvdFBhbmVsLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDlt7LpgInmi6nmo4vlrZDvvIzmi5bmi73liLDmo4vnm5jkvY3nva7pg6jnvbJgKTtcbiAgICAgICAgLy8g8J+UkSDlnKjmoLnpnaLmnb/kuIrnm5HlkKzngrnlh7vvvIjnlKjkuo7pg6jnvbLvvIlcbiAgICAgICAgY29uc3QgY29udGV4dFBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKTtcbiAgICAgICAgLy8g5L2/55So5LiA5Liq5qCH5b+X5p2l6Lef6Liq5piv5ZCm5bqU6K+l5aSE55CG54K55Ye7XG4gICAgICAgIGxldCBzaG91bGRIYW5kbGVDbGljayA9IHRydWU7XG4gICAgICAgIGNvbnN0IGRlcGxveU9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlt7Lnu4/muIXnkIbmiJbkuI3lupTor6XlpITnkIbvvIznm7TmjqXov5Tlm55cbiAgICAgICAgICAgIGlmICghc2hvdWxkSGFuZGxlQ2xpY2sgfHwgIWRyYWdnZWRQaWVjZSB8fCAhaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIOajgOa1i+WIsOeCueWHu++8jOaJp+ihjOmDqOe9sjogJHtkcmFnZ2VkUGllY2UuZGlzcGxheU5hbWV9YCk7XG4gICAgICAgICAgICBkZXBsb3lQaWVjZUF0Q3Vyc29yKGRyYWdnZWRQaWVjZSwgZHJhZ2dlZFNsb3RJbmRleCk7XG4gICAgICAgICAgICBjbGVhbnVwRHJhZygpO1xuICAgICAgICAgICAgc2hvdWxkSGFuZGxlQ2xpY2sgPSBmYWxzZTsgLy8g5qCH6K6w5Li65LiN5YaN5aSE55CGXG4gICAgICAgIH07XG4gICAgICAgIC8vIOiuvue9ruS6i+S7tuebkeWQrO+8iOWPquiuvue9ruS4gOasoe+8jOmAmui/h+agh+W/l+aOp+WItu+8iVxuICAgICAgICBjb250ZXh0UGFuZWwuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsIGRlcGxveU9uQ2xpY2spO1xuICAgICAgICAvLyAzMOenkuWQjuiHquWKqOa4heeQhlxuICAgICAgICAkLlNjaGVkdWxlKDMwLjAsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChkcmFnZ2VkUGllY2UgJiYgaXNEcmFnZ2luZyAmJiBkcmFnZ2VkU2xvdEluZGV4ID09PSBzbG90SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pqg77iPIOmDqOe9sui2heaXtu+8jOa4heeQhueKtuaAgWApO1xuICAgICAgICAgICAgICAgIGNsZWFudXBEcmFnKCk7XG4gICAgICAgICAgICAgICAgc2hvdWxkSGFuZGxlQ2xpY2sgPSBmYWxzZTsgLy8g5qCH6K6w5Li65LiN5YaN5aSE55CGXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDwn5SRIOS4jei/lOWbniB0cnVl77yM6K6p6buY6K6k6KGM5Li657un57ut77yI5YWB6K646byg5qCH56e75Yqo77yJXG4gICAgICAgIC8vIHJldHVybiB0cnVlOyAgLy8g5rOo6YeK5o6J77yM6K6p6byg5qCH5Y+v5Lul56e75YqoXG4gICAgfSk7XG4gICAgLy8g8J+UkSDkuZ/mlK/mjIEgb25hY3RpdmF0Ze+8iOeCueWHu+S6i+S7tu+8ieS9nOS4uuWkh+eUqFxuICAgIHNsb3RQYW5lbC5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAvLyDlpoLmnpzlt7Lnu4/lnKjmi5bmi73nirbmgIHvvIzkuI3lpITnkIbvvIjpgb/lhY3ph43lpI3vvIlcbiAgICAgICAgaWYgKGlzRHJhZ2dpbmcgJiYgZHJhZ2dlZFNsb3RJbmRleCA9PT0gc2xvdEluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCflrHvuI8g54K55Ye75qOL5a2QIC0g5qe95L2NICR7c2xvdEluZGV4fSwg5qOL5a2QOiAke3BpZWNlLmRpc3BsYXlOYW1lfWApO1xuICAgICAgICAvLyDorr7nva7pg6jnvbLmqKHlvI/vvIjngrnlh7vmqKHlvI/vvIlcbiAgICAgICAgZHJhZ2dlZFBpZWNlID0gcGllY2U7XG4gICAgICAgIGRyYWdnZWRTbG90SW5kZXggPSBzbG90SW5kZXg7XG4gICAgICAgIGlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAvLyDliJvlu7rpg6jnvbLmj5DnpLpcbiAgICAgICAgY3JlYXRlRHJhZ092ZXJsYXkocGllY2UpO1xuICAgICAgICAvLyDpq5jkuq7ljp/lp4vmp73kvY1cbiAgICAgICAgc2xvdFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IElOVkVOVE9SWV9USEVNRS5zbG90QmdEcmFnZ2luZztcbiAgICAgICAgc2xvdFBhbmVsLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDlt7LpgInmi6nmo4vlrZDvvIzngrnlh7vmo4vnm5jkvY3nva7pg6jnvbJgKTtcbiAgICAgICAgLy8g8J+UkSDlnKjmoLnpnaLmnb/kuIrnm5HlkKzngrnlh7vvvIjnlKjkuo7pg6jnvbLvvIlcbiAgICAgICAgY29uc3QgY29udGV4dFBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKTtcbiAgICAgICAgLy8g5L2/55So5LiA5Liq5qCH5b+X5p2l6Lef6Liq5piv5ZCm5bqU6K+l5aSE55CG54K55Ye7XG4gICAgICAgIGxldCBzaG91bGRIYW5kbGVDbGljayA9IHRydWU7XG4gICAgICAgIGNvbnN0IGRlcGxveU9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyDlpoLmnpzlt7Lnu4/muIXnkIbmiJbkuI3lupTor6XlpITnkIbvvIznm7TmjqXov5Tlm55cbiAgICAgICAgICAgIGlmICghc2hvdWxkSGFuZGxlQ2xpY2sgfHwgIWRyYWdnZWRQaWVjZSB8fCAhaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn46vIOajgOa1i+WIsOeCueWHu++8jOaJp+ihjOmDqOe9sjogJHtkcmFnZ2VkUGllY2UuZGlzcGxheU5hbWV9YCk7XG4gICAgICAgICAgICBkZXBsb3lQaWVjZUF0Q3Vyc29yKGRyYWdnZWRQaWVjZSwgZHJhZ2dlZFNsb3RJbmRleCk7XG4gICAgICAgICAgICBjbGVhbnVwRHJhZygpO1xuICAgICAgICAgICAgc2hvdWxkSGFuZGxlQ2xpY2sgPSBmYWxzZTsgLy8g5qCH6K6w5Li65LiN5YaN5aSE55CGXG4gICAgICAgIH07XG4gICAgICAgIC8vIOiuvue9ruS6i+S7tuebkeWQrO+8iOWPquiuvue9ruS4gOasoe+8jOmAmui/h+agh+W/l+aOp+WItu+8iVxuICAgICAgICBjb250ZXh0UGFuZWwuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsIGRlcGxveU9uQ2xpY2spO1xuICAgICAgICAvLyAzMOenkuWQjuiHquWKqOa4heeQhlxuICAgICAgICAkLlNjaGVkdWxlKDMwLjAsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChkcmFnZ2VkUGllY2UgJiYgaXNEcmFnZ2luZyAmJiBkcmFnZ2VkU2xvdEluZGV4ID09PSBzbG90SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pqg77iPIOmDqOe9sui2heaXtu+8jOa4heeQhueKtuaAgWApO1xuICAgICAgICAgICAgICAgIGNsZWFudXBEcmFnKCk7XG4gICAgICAgICAgICAgICAgc2hvdWxkSGFuZGxlQ2xpY2sgPSBmYWxzZTsgLy8g5qCH6K6w5Li65LiN5YaN5aSE55CGXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8vIOa4heeQhuaLluaLveeKtuaAgVxuICAgIGZ1bmN0aW9uIGNsZWFudXBEcmFnKCkge1xuICAgICAgICAvLyDmgaLlpI3mp73kvY3moLflvI9cbiAgICAgICAgY29uc3Qgc2xvdCA9ICQoYCNJbnZlbnRvcnlTbG90XyR7ZHJhZ2dlZFNsb3RJbmRleH1gKTtcbiAgICAgICAgaWYgKHNsb3QpIHtcbiAgICAgICAgICAgIHNsb3Quc3R5bGUuYmFja2dyb3VuZENvbG9yID0gSU5WRU5UT1JZX1RIRU1FLnNsb3RCZztcbiAgICAgICAgICAgIHNsb3Quc3R5bGUub3BhY2l0eSA9ICcxLjAnO1xuICAgICAgICB9XG4gICAgICAgIC8vIOa4heeQhlxuICAgICAgICBpZiAoZHJhZ092ZXJsYXkpIHtcbiAgICAgICAgICAgIGRyYWdPdmVybGF5LkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICAgICAgZHJhZ092ZXJsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGRyYWdnZWRQaWVjZSA9IG51bGw7XG4gICAgICAgIGRyYWdnZWRTbG90SW5kZXggPSAtMTtcbiAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyDkv53nlZnljp/nlJ/mi5bmi73kuovku7bkvZzkuLrlpIfnlKhcbiAgICBzbG90UGFuZWwuU2V0UGFuZWxFdmVudCgnb25kcmFnc3RhcnQnLCAocGFuZWxJZCwgZHJhZ0NhbGxiYWNrcykgPT4ge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+agCDmi5bmi73lvIDlp4s6ICR7cGllY2UuZGlzcGxheU5hbWV9ICjmp73kvY0gJHtzbG90SW5kZXh9KWApO1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g8J+agCBwYW5lbElkOiAke3BhbmVsSWR9YCk7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn5qAIGRyYWdDYWxsYmFja3Mg5a2Y5ZyoOiAke2RyYWdDYWxsYmFja3MgIT0gbnVsbH1gKTtcbiAgICAgICAgaWYgKGRyYWdDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDwn5qAIGRyYWdDYWxsYmFja3Mg6ZSuOiAke0pTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKGRyYWdDYWxsYmFja3MpKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBkcmFnZ2VkUGllY2UgPSBwaWVjZTtcbiAgICAgICAgZHJhZ2dlZFNsb3RJbmRleCA9IHNsb3RJbmRleDtcbiAgICAgICAgLy8g5Yib5bu65ouW5ou96KeG6KeJ5Y+N6aaIXG4gICAgICAgIGNyZWF0ZURyYWdPdmVybGF5KHBpZWNlKTtcbiAgICAgICAgLy8g6auY5Lqu5Y6f5aeL5qe95L2NXG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBJTlZFTlRPUllfVEhFTUUuc2xvdEJnRHJhZ2dpbmc7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG4gICAgICAgIC8vIOiuvue9ruaLluaLveaVsOaNrlxuICAgICAgICBpZiAoZHJhZ0NhbGxiYWNrcykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkcmFnQ2FsbGJhY2tzLmRpc3BsYXlQYW5lbCA9IGNyZWF0ZURyYWdEaXNwbGF5UGFuZWwocGllY2UpO1xuICAgICAgICAgICAgICAgIGRyYWdDYWxsYmFja3Mub2Zmc2V0WCA9IDA7XG4gICAgICAgICAgICAgICAgZHJhZ0NhbGxiYWNrcy5vZmZzZXRZID0gMDtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pyFIOaLluaLveaVsOaNruW3suiuvue9rmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4p2MIOiuvue9ruaLluaLveaVsOaNruaXtuWHuumUmTogJHtlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOKdjCBkcmFnQ2FsbGJhY2tzIOS4uiBudWxsIOaIliB1bmRlZmluZWQhYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgc2xvdFBhbmVsLlNldFBhbmVsRXZlbnQoJ29uZHJhZ2VuZCcsIChwYW5lbElkLCBkcmFnZ2VkUGFuZWwpID0+IHtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfj4Eg5ouW5ou957uT5p2fOiAke3BpZWNlLmRpc3BsYXlOYW1lfWApO1xuICAgICAgICAvLyDmgaLlpI3mp73kvY3moLflvI9cbiAgICAgICAgc2xvdFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IElOVkVOVE9SWV9USEVNRS5zbG90Qmc7XG4gICAgICAgIHNsb3RQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzEuMCc7XG4gICAgICAgIC8vIOWPkemAgemDqOe9suivt+axguWIsOacjeWKoeerr1xuICAgICAgICBpZiAoZHJhZ2dlZFBpZWNlKSB7XG4gICAgICAgICAgICBkZXBsb3lQaWVjZUF0Q3Vyc29yKGRyYWdnZWRQaWVjZSwgc2xvdEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICAvLyDmuIXnkIZcbiAgICAgICAgaWYgKGRyYWdPdmVybGF5KSB7XG4gICAgICAgICAgICBkcmFnT3ZlcmxheS5EZWxldGVBc3luYygwKTtcbiAgICAgICAgICAgIGRyYWdPdmVybGF5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkcmFnZ2VkUGllY2UgPSBudWxsO1xuICAgICAgICBkcmFnZ2VkU2xvdEluZGV4ID0gLTE7XG4gICAgfSk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOKchSDmi5bmi73kuovku7bms6jlhozlrozmiJAgLSDmp73kvY0gJHtzbG90SW5kZXh9YCk7XG59XG5mdW5jdGlvbiBjcmVhdGVEcmFnT3ZlcmxheShwaWVjZSkge1xuICAgIC8vIOWIm+W7uuWFqOWxj+aLluaLveaPkOekulxuICAgIGlmICghZHJhZ092ZXJsYXkpIHtcbiAgICAgICAgZHJhZ092ZXJsYXkgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsICQuR2V0Q29udGV4dFBhbmVsKCksICdEcmFnT3ZlcmxheScpO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgZHJhZ092ZXJsYXkuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgZHJhZ092ZXJsYXkuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBkcmFnT3ZlcmxheS5zdHlsZS56SW5kZXggPSAnMTAwMDAnO1xuICAgICAgICBkcmFnT3ZlcmxheS5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGhpbnQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGRyYWdPdmVybGF5LCAnRHJhZ0hpbnQnKTtcbiAgICAgICAgaGludC50ZXh0ID0gJ+eCueWHu+aji+ebmOS9jee9rumDqOe9suaji+WtkO+8iOaIluaMiUVTQ+WPlua2iO+8iSc7XG4gICAgICAgIGhpbnQuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgICAgIGhpbnQuc3R5bGUuY29sb3IgPSBJTlZFTlRPUllfVEhFTUUudGV4dEdvbGQ7XG4gICAgICAgIGhpbnQuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGhpbnQuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBoaW50LnN0eWxlLnRleHRTaGFkb3cgPSAnMnB4IDJweCA0cHggIzAwMDAwMCc7XG4gICAgICAgIGhpbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC44KSc7XG4gICAgICAgIGhpbnQuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuICAgICAgICBoaW50LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZURyYWdEaXNwbGF5UGFuZWwocGllY2UpIHtcbiAgICBjb25zdCBkaXNwbGF5ID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCAkLkdldENvbnRleHRQYW5lbCgpLCAnRHJhZ0Rpc3BsYXknKTtcbiAgICBkaXNwbGF5LnN0eWxlLndpZHRoID0gJzgwcHgnO1xuICAgIGRpc3BsYXkuc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xuICAgIGRpc3BsYXkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC43KSc7XG4gICAgZGlzcGxheS5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7SU5WRU5UT1JZX1RIRU1FLmJvcmRlckdvbGR9YDtcbiAgICBkaXNwbGF5LnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGRpc3BsYXkuc3R5bGUub3ZlcmZsb3cgPSAnY2xpcCc7XG4gICAgLy8g5L2/55SoIERPVEFIZXJvSW1hZ2Ug5pi+56S66Iux6ZuE5aS05YOPXG4gICAgY29uc3QgaGVyb0ltYWdlID0gJC5DcmVhdGVQYW5lbCgnRE9UQUhlcm9JbWFnZScsIGRpc3BsYXksICdEcmFnSGVyb0ltYWdlJyk7XG4gICAgaGVyb0ltYWdlLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGhlcm9JbWFnZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29uc3QgaGVyb05hbWUgPSBnZXRGdWxsSGVyb05hbWUocGllY2UudW5pdE5hbWUsIHBpZWNlLmlkKTtcbiAgICBoZXJvSW1hZ2UuaGVyb25hbWUgPSBoZXJvTmFtZTtcbiAgICBoZXJvSW1hZ2UuaGVyb2ltYWdlc3R5bGUgPSAncG9ydHJhaXQnO1xuICAgIHJldHVybiBkaXNwbGF5O1xufVxuZnVuY3Rpb24gZGVwbG95UGllY2VBdEN1cnNvcihwaWVjZSwgc2xvdEluZGV4KSB7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIPCfjq8gRGVwbG95aW5nIHBpZWNlOiAke3BpZWNlLmRpc3BsYXlOYW1lfSBmcm9tIHNsb3QgJHtzbG90SW5kZXh9YCk7XG4gICAgLy8g6I635Y+W6byg5qCH5bGP5bmV5L2N572uXG4gICAgY29uc3Qgc2NyZWVuUG9zID0gR2FtZVVJLkdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgLy8g5bCG5bGP5bmV5Z2Q5qCH6L2s5o2i5Li65LiW55WM5Z2Q5qCH77yI5Zyw6Z2i5L2N572u77yJXG4gICAgLy8g5rOo5oSP77yaR2V0U2NyZWVuV29ybGRQb3NpdGlvbiDpnIDopoHkuKTkuKrljZXni6znmoTlj4LmlbBcbiAgICBjb25zdCB3b3JsZFBvcyA9IEdhbWVVSS5HZXRTY3JlZW5Xb3JsZFBvc2l0aW9uKHNjcmVlblBvc1swXSwgc2NyZWVuUG9zWzFdKTtcbiAgICBpZiAoIXdvcmxkUG9zKSB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinYwgQ2Fubm90IGdldCB3b3JsZCBwb3NpdGlvbiBmcm9tIHNjcmVlbiAoJHtzY3JlZW5Qb3NbMF19LCAke3NjcmVlblBvc1sxXX0pYCk7XG4gICAgICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkNhbmNlbCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSBTY3JlZW46ICgke3NjcmVlblBvc1swXX0sICR7c2NyZWVuUG9zWzFdfSkg4oaSIFdvcmxkOiAoJHt3b3JsZFBvc1swXS50b0ZpeGVkKDEpfSwgJHt3b3JsZFBvc1sxXS50b0ZpeGVkKDEpfSwgJHt3b3JsZFBvc1syXS50b0ZpeGVkKDEpfSlgKTtcbiAgICAvLyDojrflj5bmnKzlnLDnjqnlrrZJRO+8iOWNleacuuaooeW8j+S4i+mAmuW4uOaYrzDvvIlcbiAgICBjb25zdCBsb2NhbFBsYXllcklkID0gUGxheWVycy5HZXRMb2NhbFBsYXllcigpO1xuICAgIC8vIOWPkemAgemDqOe9suivt+axguWIsOacjeWKoeerr++8iOS9v+eUqOS4lueVjOWdkOagh++8iVxuICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdpbnZlbnRvcnlfZGVwbG95X3BpZWNlJywge1xuICAgICAgICBwbGF5ZXJJZDogbG9jYWxQbGF5ZXJJZCxcbiAgICAgICAgcGllY2VJZDogcGllY2UuaWQsXG4gICAgICAgIHVuaXROYW1lOiBwaWVjZS51bml0TmFtZSxcbiAgICAgICAgc2xvdEluZGV4OiBzbG90SW5kZXgsXG4gICAgICAgIHdvcmxkWDogd29ybGRQb3NbMF0sXG4gICAgICAgIHdvcmxkWTogd29ybGRQb3NbMV0sXG4gICAgICAgIHdvcmxkWjogd29ybGRQb3NbMl1cbiAgICB9KTtcbiAgICAvLyDmkq3mlL7pn7PmlYhcbiAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5DYXN0U3RhcnQnKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOaYvuekui/pmpDol49cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIHNob3coKSB7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKaoO+4jyBSb290IHBhbmVsIG5vdCBpbml0aWFsaXplZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJvb3RQYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIGlzVmlzaWJsZSA9IHRydWU7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIOKchSBJbnZlbnRvcnkgc2hvd24nKTtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g5b2T5YmN546p5a62SUQ6ICR7UGxheWVycy5HZXRMb2NhbFBsYXllcigpfWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDmp73kvY3mlbDph486ICR7aW52ZW50b3J5U2xvdHMubGVuZ3RofWApO1xuICAgIC8vIOivt+axguacgOaWsOaVsOaNrlxuICAgIHJlcXVlc3RJbnZlbnRvcnlEYXRhKCk7XG59XG5mdW5jdGlvbiBoaWRlKCkge1xuICAgIGlmICghcm9vdFBhbmVsKVxuICAgICAgICByZXR1cm47XG4gICAgcm9vdFBhbmVsLnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgIGlzVmlzaWJsZSA9IGZhbHNlO1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSBJbnZlbnRvcnkgaGlkZGVuJyk7XG59XG5mdW5jdGlvbiB0b2dnbGUoKSB7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICBoaWRlKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93KCk7XG4gICAgfVxufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5pWw5o2u5pu05pawXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiByZXF1ZXN0SW52ZW50b3J5RGF0YSgpIHtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gUmVxdWVzdGluZyBpbnZlbnRvcnkgZGF0YSBmcm9tIHNlcnZlci4uLicpO1xuICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdyZXF1ZXN0X2ludmVudG9yeV9kYXRhJywge1xuICAgICAgICBwbGF5ZXJJZDogUGxheWVycy5HZXRMb2NhbFBsYXllcigpXG4gICAgfSk7XG59XG4vLyBIZWxwZXIgdG8gY29udmVydCBMdWEgdGFibGUgKG9iamVjdCkgdG8gSlMgYXJyYXlcbmZ1bmN0aW9uIGNvbnZlcnRUb0FycmF5KG9iaikge1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOi+k+WFpeexu+WeizogJHt0eXBlb2Ygb2JqfWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOaYr+aVsOe7hDogJHtBcnJheS5pc0FycmF5KG9iail9YCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0gY29udmVydFRvQXJyYXkgLSDlt7Lnu4/mmK/mlbDnu4TvvIzplb/luqY6ICR7b2JqLmxlbmd0aH1gKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g5byA5aeL6YGN5Y6G5a+56LGhLi4uYCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0ga2V5OiAke2tleX0sIHZhbHVlOiAke0pTT04uc3RyaW5naWZ5KG9ialtrZXldKX1gKTtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKG9ialtrZXldKTtcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOmBjeWOhuWujOaIkO+8jOaJvuWIsCAke2NvdW50fSDkuKrlhYPntKBgKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIGNvbnZlcnRUb0FycmF5IC0g57uT5p6c5pWw57uE6ZW/5bqmOiAke2Fyci5sZW5ndGh9YCk7XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgICQuTXNnKGBbSW52ZW50b3J5XSBjb252ZXJ0VG9BcnJheSAtIOaXoOazlei9rOaNou+8jOi/lOWbnuepuuaVsOe7hGApO1xuICAgIHJldHVybiBbXTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUludmVudG9yeURhdGEoZGF0YSkge1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSA9PT09PT09PT09IOabtOaWsOiDjOWMheaVsOaNriA9PT09PT09PT09Jyk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIOaVsOaNruWvueixoTogJHtKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhkYXRhKSl9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGRhdGEucGllY2VzIOexu+WeizogJHt0eXBlb2YgZGF0YS5waWVjZXN9YCk7XG4gICAgJC5Nc2coYFtJbnZlbnRvcnldIGRhdGEucGllY2VzIOaYr+aVsOe7hDogJHtBcnJheS5pc0FycmF5KGRhdGEucGllY2VzKX1gKTtcbiAgICBpZiAoIWRhdGEucGllY2VzKSB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSDimqDvuI8gZGF0YS5waWVjZXMgaXMgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgICAgJC5Nc2coYFtJbnZlbnRvcnldIOWujOaVtOaVsOaNrjogJHtKU09OLnN0cmluZ2lmeShkYXRhKX1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDovazmjaIgTHVhIOihqOS4uiBKYXZhU2NyaXB0IOaVsOe7hFxuICAgIGNvbnN0IHBpZWNlc0FycmF5ID0gY29udmVydFRvQXJyYXkoZGF0YS5waWVjZXMpO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDovazmjaLlkI7nmoTmlbDnu4Tplb/luqY6ICR7cGllY2VzQXJyYXkubGVuZ3RofWApO1xuICAgICQuTXNnKGBbSW52ZW50b3J5XSDmlLbliLAgJHtwaWVjZXNBcnJheS5sZW5ndGh9IOS4quaji+WtkGApO1xuICAgIC8vIPCflJEg5riF56m65omA5pyJ5qe95L2N77yI56Gu5L+d5rKh5pyJ5q6L55WZ5pWw5o2u77yJXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNQVhfU0xPVFM7IGkrKykge1xuICAgICAgICB1cGRhdGVTbG90KGksIG51bGwpO1xuICAgIH1cbiAgICAvLyDwn5SRIOabtOaWsOaji+WtkO+8iOWPquabtOaWsOacieaViOeahOaji+WtkO+8jOehruS/neaVsOaNruWujOaVtO+8iVxuICAgIHBpZWNlc0FycmF5LmZvckVhY2goKHBpZWNlLCBpbmRleCkgPT4ge1xuICAgICAgICAvLyDmo4Dmn6Xmo4vlrZDmlbDmja7mmK/lkKblrozmlbRcbiAgICAgICAgaWYgKCFwaWVjZSB8fCAhcGllY2UuaWQgfHwgIXBpZWNlLnVuaXROYW1lKSB7XG4gICAgICAgICAgICAkLk1zZyhgW0ludmVudG9yeV0g4pqg77iPIOi3s+i/h+aXoOaViOaji+WtkOaVsOaNru+8jOe0ouW8lTogJHtpbmRleH1gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPCBNQVhfU0xPVFMpIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDmm7TmlrDmp73kvY0gJHtpbmRleH06ICR7cGllY2UuZGlzcGxheU5hbWV9ICgke3BpZWNlLnVuaXROYW1lfSlgKTtcbiAgICAgICAgICAgIHVwZGF0ZVNsb3QoaW5kZXgsIHBpZWNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDimqDvuI8g5qOL5a2Q5pWw6YeP6LaF5Ye65qe95L2N6ZmQ5Yi277yM6Lez6L+H57Si5byVICR7aW5kZXh9OiAke3BpZWNlLmRpc3BsYXlOYW1lfWApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8g8J+UkSDorrDlvZXlrp7pmYXmm7TmlrDnmoTmp73kvY3mlbDph49cbiAgICBjb25zdCBmaWxsZWRTbG90cyA9IHBpZWNlc0FycmF5LmZpbHRlcigocCwgaSkgPT4gcCAmJiBwLmlkICYmIGkgPCBNQVhfU0xPVFMpLmxlbmd0aDtcbiAgICAkLk1zZyhgW0ludmVudG9yeV0g5a6e6ZmF5aGr5YWF5qe95L2N5pWw6YePOiAke2ZpbGxlZFNsb3RzfS8ke01BWF9TTE9UU31gKTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0gPT09PT09PT09PSDog4zljIXmm7TmlrDlrozmiJAgPT09PT09PT09PScpO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g5LqL5Lu25aSE55CGXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiByZWdpc3RlckV2ZW50SGFuZGxlcnMoKSB7XG4gICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlZ2lzdGVyaW5nIGV2ZW50IGhhbmRsZXJzLi4uJyk7XG4gICAgLy8g5o6l5pS25pyN5Yqh56uv5Y+R6YCB55qE6IOM5YyF5pWw5o2uXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3VwZGF0ZV9pbnZlbnRvcnlfZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdbSW52ZW50b3J5XSBSZWNlaXZlZCB1cGRhdGVfaW52ZW50b3J5X2RhdGEgZXZlbnQnKTtcbiAgICAgICAgdXBkYXRlSW52ZW50b3J5RGF0YShkYXRhKTtcbiAgICB9KTtcbiAgICAvLyDpg6jnvbLlj43ppohcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZGVwbG95bWVudF9mZWVkYmFjaycsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSBEZXBsb3ltZW50IGZlZWRiYWNrOiAke2RhdGEuc3VjY2VzcyA/ICfinIUnIDogJ+KdjCd9ICR7ZGF0YS5tZXNzYWdlfWApO1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5Db2luc0JpZycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQ2FuY2VsJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzog5pi+56S6VUnmj5DnpLpcbiAgICB9KTtcbiAgICAvLyDlv6vmjbfplK7liIfmjaLog4zljIVcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgndG9nZ2xlX2ludmVudG9yeScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlY2VpdmVkIHRvZ2dsZV9pbnZlbnRvcnkgZXZlbnQnKTtcbiAgICAgICAgdG9nZ2xlKCk7XG4gICAgfSk7XG4gICAgLy8g5pi+56S66IOM5YyFXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3Nob3dfaW52ZW50b3J5JywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnW0ludmVudG9yeV0gUmVjZWl2ZWQgc2hvd19pbnZlbnRvcnkgZXZlbnQnKTtcbiAgICAgICAgc2hvdygpO1xuICAgIH0pO1xuICAgIC8vIOmakOiXj+iDjOWMhVxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdoaWRlX2ludmVudG9yeScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tJbnZlbnRvcnldIFJlY2VpdmVkIGhpZGVfaW52ZW50b3J5IGV2ZW50Jyk7XG4gICAgICAgIGhpZGUoKTtcbiAgICB9KTtcbiAgICAkLk1zZygnW0ludmVudG9yeV0g4pyFIEV2ZW50IGhhbmRsZXJzIHJlZ2lzdGVyZWQnKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWFqOWxgEFQSVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gZXhwb3NlR2xvYmFsQVBJKCkge1xuICAgIGdsb2JhbFRoaXMuSW52ZW50b3J5ID0ge1xuICAgICAgICBzaG93OiBzaG93LFxuICAgICAgICBoaWRlOiBoaWRlLFxuICAgICAgICB0b2dnbGU6IHRvZ2dsZSxcbiAgICAgICAgdXBkYXRlOiB1cGRhdGVJbnZlbnRvcnlEYXRhLFxuICAgICAgICByZXF1ZXN0RGF0YTogcmVxdWVzdEludmVudG9yeURhdGFcbiAgICB9O1xuICAgICQuTXNnKCdbSW52ZW50b3J5XSDinIUgR2xvYmFsIEFQSSBleHBvc2VkOiBJbnZlbnRvcnkuc2hvdygpLCAuaGlkZSgpLCAudG9nZ2xlKCknKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIOWQr+WKqFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8g562J5b6FRE9N5Yqg6L295a6M5oiQ5ZCO5Yid5aeL5YyWXG4kLlNjaGVkdWxlKDAuMSwgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAgIGluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICQuTXNnKGBbSW52ZW50b3J5XSDinYwgSW5pdGlhbGl6YXRpb24gZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgfVxufSk7XG4kLk1zZygnW0ludmVudG9yeV0gU2NyaXB0IGxvYWRlZCBzdWNjZXNzZnVsbHknKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==