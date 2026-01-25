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
/*!**************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\stageselect\index.tsx ***!
  \**************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
// @ts-nocheck
/**
 * Stage Selection UI
 * Roguelike style map selection interface
 *
 * Features:
 * - Map with multiple stage nodes
 * - Different node types: normal, hard, boss, event
 * - Path connections between nodes
 * - Progress tracking
 */
// 立即执行日志
$.Msg('🗺️ StageSelect script file is executing!');
Game.EmitSound('General.ButtonClick');
// 立即暴露全局API（确保即使初始化失败也能访问）
globalThis.StageSelect = {
    show: () => $.Msg('[StageSelect] Early API: show called before init'),
    test: () => $.Msg('[StageSelect] Early API: test called before init')
};
$.Msg('[StageSelect] Early global API exposed');
// ============================================================================
// Constants & Theme
// ============================================================================
const STAGE_THEME = {
    colors: {
        normal: 'rgba(100, 149, 237, 0.8)',
        hard: 'rgba(220, 20, 60, 0.8)',
        boss: 'rgba(255, 215, 0, 0.9)',
        event: 'rgba(50, 205, 50, 0.8)',
        background: 'rgba(26, 26, 46, 0.95)',
        gold: '#ffd700',
        text: '#d4af37'
    },
    nodeSize: 90,
    iconSize: 70
};
const NODE_ICONS = {
    normal: 'file://{images}/custom_game/node/normalNode.png',
    hard: 'file://{images}/custom_game/node/hardNode.png',
    boss: 'file://{images}/custom_game/node/bossNode.png',
    event: 'file://{images}/custom_game/node/eventNode.png'
};
const STAGE_BACKGROUNDS = [
    'file://{images}/custom_game/bg/showcase_bg_field_001_png.png',
    'file://{images}/custom_game/bg/bg1.png',
    'file://{images}/custom_game/bg/bg2.png',
    'file://{images}/custom_game/bg/bg3.png'
];
// ============================================================================
// State Management
// ============================================================================
let rootPanel = null;
let containerPanel = null;
let selectedNode = null;
let currentStageData = null;
let isVisible = false;
// Drag scroll state
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let scrollStartX = 0;
let scrollStartY = 0;
// ============================================================================
// Mock Data (for testing)
// ============================================================================
function getMockStageData() {
    return {
        currentStage: 1,
        maxStages: 11,
        nodes: [
            // 第1层 - 起始点
            { id: 'L1_1', name: '起始点', type: 'normal', status: 'available', x: 8, y: 50, description: '旅程的起点', rewards: '无', icon: '', connections: ['L2_1', 'L2_2', 'L2_3'] },
            // 第2层 - 3个节点（分支点1：可以选择3条路线）
            { id: 'L2_1', name: '精英战斗', type: 'hard', status: 'locked', x: 18, y: 30, description: '精英怪物战斗', rewards: '高级奖励', icon: '', connections: ['L3_1'] },
            { id: 'L2_2', name: '普通战斗', type: 'normal', status: 'locked', x: 18, y: 50, description: '普通怪物战斗', rewards: '基础奖励', icon: '', connections: ['L3_2'] },
            { id: 'L2_3', name: '普通战斗', type: 'normal', status: 'locked', x: 18, y: 70, description: '普通怪物战斗', rewards: '基础奖励', icon: '', connections: ['L3_3'] },
            // 第3层 - 3个节点（各走各的路线）
            { id: 'L3_1', name: '普通战斗', type: 'normal', status: 'locked', x: 28, y: 30, description: '普通怪物战斗', rewards: '基础奖励', icon: '', connections: ['L4_1'] },
            { id: 'L3_2', name: '回血事件', type: 'event', status: 'locked', x: 28, y: 50, description: '恢复生命值', rewards: '回血20%', icon: '', connections: ['L4_2'] },
            { id: 'L3_3', name: '回血事件', type: 'event', status: 'locked', x: 28, y: 70, description: '恢复生命值', rewards: '回血20%', icon: '', connections: ['L4_3'] },
            // 第4层 - 3个节点（继续各自路线）
            { id: 'L4_1', name: '回血事件', type: 'event', status: 'locked', x: 38, y: 30, description: '恢复生命值', rewards: '回血20%', icon: '', connections: ['L5_1'] },
            { id: 'L4_2', name: '精英战斗', type: 'hard', status: 'locked', x: 38, y: 50, description: '精英怪物战斗', rewards: '高级奖励', icon: '', connections: ['L5_2'] },
            { id: 'L4_3', name: '普通战斗', type: 'normal', status: 'locked', x: 38, y: 70, description: '普通怪物战斗', rewards: '基础奖励', icon: '', connections: ['L5_3'] },
            // 第5层 - 3个节点（分支点2：又可以选择3条路线）
            { id: 'L5_1', name: '精英战斗', type: 'hard', status: 'locked', x: 48, y: 30, description: '精英怪物战斗', rewards: '高级奖励', icon: '', connections: ['L6_1', 'L6_2', 'L6_3'] },
            { id: 'L5_2', name: '回血事件', type: 'event', status: 'locked', x: 48, y: 50, description: '恢复生命值', rewards: '回血20%', icon: '', connections: ['L6_1', 'L6_2', 'L6_3'] },
            { id: 'L5_3', name: '精英战斗', type: 'hard', status: 'locked', x: 48, y: 70, description: '精英怪物战斗', rewards: '高级奖励', icon: '', connections: ['L6_1', 'L6_2', 'L6_3'] },
            // 第6层 - 3个节点（选择后各走各的路，然后汇聚）
            { id: 'L6_1', name: '普通战斗', type: 'normal', status: 'locked', x: 58, y: 30, description: '普通怪物战斗', rewards: '基础奖励', icon: '', connections: ['L7_1'] },
            { id: 'L6_2', name: '普通战斗', type: 'normal', status: 'locked', x: 58, y: 50, description: '普通怪物战斗', rewards: '基础奖励', icon: '', connections: ['L7_1'] },
            { id: 'L6_3', name: '回血事件', type: 'event', status: 'locked', x: 58, y: 70, description: '恢复生命值', rewards: '回血20%', icon: '', connections: ['L7_1'] },
            // 第7层 - 1个节点（汇聚点，后续是单一路线）
            { id: 'L7_1', name: '普通战斗', type: 'normal', status: 'locked', x: 68, y: 50, description: '普通怪物战斗', rewards: '基础奖励', icon: '', connections: ['L8_1'] },
            // 第8层 - 1个节点
            { id: 'L8_1', name: '精英战斗', type: 'hard', status: 'locked', x: 75, y: 50, description: '精英怪物战斗', rewards: '高级奖励', icon: '', connections: ['L9_1'] },
            // 第9层 - 1个节点（撤离事件）
            { id: 'L9_1', name: '撤离事件', type: 'event', status: 'locked', x: 82, y: 50, description: '决定是否继续前进', rewards: '特殊选择', icon: '', connections: ['L10_1'] },
            // 第10层 - 1个节点
            { id: 'L10_1', name: '精英战斗', type: 'hard', status: 'locked', x: 89, y: 50, description: '强力精英战斗', rewards: '史诗奖励', icon: '', connections: ['L11_1'] },
            // 第11层 - Boss
            { id: 'L11_1', name: 'Boss战', type: 'boss', status: 'locked', x: 96, y: 50, description: '最终Boss战斗', rewards: '传说装备', icon: '', connections: [] }
        ]
    };
}
// ============================================================================
// UI Creation Functions
// ============================================================================
// 创建选关容器（参考 battleEndView）
function createStageSelectContainer() {
    const root = $.GetContextPanel();
    if (!root) {
        $.Msg('[StageSelect] ❌ Root panel not found');
        return null;
    }
    // 检查是否已存在
    let container = root.FindChild('StageSelectContainer');
    if (container && container.IsValid()) {
        $.Msg('[StageSelect] Container already exists, reusing');
        return container;
    }
    // 删除无效容器
    if (container && !container.IsValid()) {
        container.DeleteAsync(0);
    }
    $.Msg('[StageSelect] Creating new container...');
    // 创建主容器
    container = $.CreatePanel('Panel', root, 'StageSelectContainer');
    if (!container) {
        $.Msg('[StageSelect] ❌ Failed to create container');
        return null;
    }
    // 验证父元素
    const parent = container.GetParent();
    $.Msg(`[StageSelect] Container parent: ${parent ? parent.id : 'null'}`);
    container.AddClass('stage_select_container');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.horizontalAlign = 'center';
    container.style.verticalAlign = 'center';
    container.style.visibility = 'collapse'; // 默认隐藏
    container.style.zIndex = '9000';
    container.hittest = false;
    // 创建遮罩
    const mask = $.CreatePanel('Panel', container, 'StageSelectMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    mask.hittest = true; // 拦截点击
    $.Msg('[StageSelect] ✅ Container created successfully');
    return container;
}
function initStageSelect() {
    $.Msg('[StageSelect] ========================================');
    $.Msg('[StageSelect] Initializing...');
    // 创建容器
    containerPanel = createStageSelectContainer();
    if (!containerPanel) {
        $.Msg('[StageSelect] ❌ Failed to create container, aborting');
        return;
    }
    rootPanel = $.GetContextPanel();
    rootPanel === null || rootPanel === void 0 ? void 0 : rootPanel.AddClass('stage_select_root');
    // 创建UI元素 - 添加错误处理
    try {
        $.Msg('[StageSelect] Creating background...');
        createBackground(containerPanel);
        $.Msg('[StageSelect] Creating header...');
        createHeader(containerPanel);
        $.Msg('[StageSelect] Creating map area...');
        createMapArea(containerPanel);
        $.Msg('[StageSelect] Creating footer...');
        createFooter(containerPanel);
        $.Msg('[StageSelect] UI elements created successfully');
    }
    catch (e) {
        $.Msg(`[StageSelect] ❌ ERROR creating UI: ${e}`);
    }
    // 注册事件
    registerEvents();
    // 暴露全局API
    exposeGlobalAPI();
    $.Msg('[StageSelect] ✅ Initialization complete');
    $.Msg('[StageSelect] ========================================');
}
function createBackground(parent) {
    const bg = $.CreatePanel('Panel', parent, 'StageSelectBg');
    bg.AddClass('stage_select_bg');
    bg.style.backgroundImage = `url("${STAGE_BACKGROUNDS[0]}")`;
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
}
function createHeader(parent) {
    const header = $.CreatePanel('Panel', parent, 'StageSelectHeader');
    header.AddClass('stage_select_header');
    header.style.width = '100%';
    header.style.height = '80px';
    header.style.flowChildren = 'right';
    header.style.horizontalAlign = 'center';
    header.style.verticalAlign = 'top';
    header.style.padding = '15px 40px';
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    // Title
    const title = $.CreatePanel('Label', header, 'StageTitle');
    title.AddClass('stage_title');
    title.text = '选择关卡';
    title.style.fontSize = '32px';
    title.style.color = STAGE_THEME.colors.gold;
    title.style.fontWeight = 'bold';
    title.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.8)';
    title.style.horizontalAlign = 'center';
    title.style.verticalAlign = 'center';
    // Close button
    const closeBtn = $.CreatePanel('Button', header, 'CloseButton');
    closeBtn.style.width = '40px';
    closeBtn.style.height = '40px';
    closeBtn.style.horizontalAlign = 'right';
    closeBtn.style.verticalAlign = 'center';
    closeBtn.style.backgroundColor = 'rgba(220, 20, 60, 0.8)';
    closeBtn.style.borderRadius = '50%';
    const closeLabel = $.CreatePanel('Label', closeBtn, 'CloseBtnLabel');
    closeLabel.text = 'X';
    closeLabel.style.fontSize = '20px';
    closeLabel.style.color = '#ffffff';
    closeLabel.style.horizontalAlign = 'center';
    closeLabel.style.verticalAlign = 'center';
    closeLabel.style.width = '100%';
    closeLabel.style.height = '100%';
    closeLabel.hittest = false;
    closeBtn.SetPanelEvent('onactivate', () => {
        hideStageSelect();
    });
}
function createMapArea(parent) {
    const mapContainer = $.CreatePanel('Panel', parent, 'StageMapContainer');
    mapContainer.AddClass('stage_map_container');
    mapContainer.style.width = '100%';
    mapContainer.style.height = '100%';
    mapContainer.style.horizontalAlign = 'center';
    mapContainer.style.verticalAlign = 'center';
    mapContainer.hittest = true; // 确保可以接收鼠标事件
    // Map content with background
    const mapContent = $.CreatePanel('Panel', mapContainer, 'StageMapContent');
    mapContent.AddClass('stage_map_content');
    mapContent.style.width = '1800px';
    mapContent.style.height = '700px';
    mapContent.style.horizontalAlign = 'center';
    mapContent.style.verticalAlign = 'center';
    mapContent.style.backgroundColor = 'rgba(20, 15, 10, 0.6)';
    mapContent.style.borderRadius = '20px';
    mapContent.style.border = '3px solid rgba(139, 90, 43, 0.5)';
    // 添加背景拖拽层（在节点层之前创建，这样节点会在上层）
    const dragBg = $.CreatePanel('Panel', mapContent, 'DragBackground');
    dragBg.style.width = '100%';
    dragBg.style.height = '100%';
    dragBg.hittest = true;
    dragBg.SetPanelEvent('onmousedown', () => {
        isDragging = true;
        const cursorPos = GameUI.GetCursorPosition();
        dragStartX = cursorPos[0];
        dragStartY = cursorPos[1];
        scrollStartX = mapContainer.scrollLeft || 0;
        scrollStartY = mapContainer.scrollTop || 0;
        $.Msg('[StageSelect] Background drag started');
        return true;
    });
    dragBg.SetPanelEvent('onmousemove', () => {
        if (!isDragging)
            return false;
        const cursorPos = GameUI.GetCursorPosition();
        const deltaX = dragStartX - cursorPos[0];
        const deltaY = dragStartY - cursorPos[1];
        mapContainer.ScrollToLeftOffset(scrollStartX + deltaX, false);
        mapContainer.ScrollToTopOffset(scrollStartY + deltaY, false);
        return true;
    });
    dragBg.SetPanelEvent('onmouseup', () => {
        if (isDragging) {
            $.Msg('[StageSelect] Background drag ended');
            isDragging = false;
        }
        return true;
    });
    // Nodes layer
    const nodesLayer = $.CreatePanel('Panel', mapContent, 'StageNodesLayer');
    nodesLayer.AddClass('stage_nodes_layer');
    nodesLayer.style.width = '100%';
    nodesLayer.style.height = '100%';
    // 节点层本身不拦截事件，但子节点（节点按钮）会拦截
    // Setup mouse wheel scroll
    $.Schedule(0.1, () => setupDragScroll(mapContainer));
}
function createFooter(parent) {
    const footer = $.CreatePanel('Panel', parent, 'StageSelectFooter');
    footer.AddClass('stage_select_footer');
    footer.style.width = '100%';
    footer.style.height = '100px';
    footer.style.flowChildren = 'right';
    footer.style.horizontalAlign = 'center';
    footer.style.verticalAlign = 'bottom';
    footer.style.padding = '20px';
    footer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    // Progress indicator
    createProgressBar(footer);
    // Spacer
    const spacer = $.CreatePanel('Panel', footer, 'FooterSpacer');
    spacer.style.width = '100px';
    // Start button
    const startBtn = createButton(footer, 'StartStageBtn', '开始战斗', true);
    startBtn.SetPanelEvent('onactivate', () => {
        if (selectedNode && selectedNode.status === 'available') {
            startStage(selectedNode);
        }
        else {
            $.Msg('[StageSelect] No available stage selected');
            Game.EmitSound('General.Cancel');
        }
    });
    // Back button
    const backBtn = createButton(footer, 'BackBtn', '返回', false);
    backBtn.SetPanelEvent('onactivate', () => {
        hideStageSelect();
    });
}
function createButton(parent, id, text, isPrimary) {
    const btn = $.CreatePanel('Button', parent, id);
    btn.AddClass('stage_btn');
    if (isPrimary) {
        btn.AddClass('stage_btn_primary');
    }
    btn.style.width = '180px';
    btn.style.height = '50px';
    btn.style.marginLeft = '15px';
    btn.style.marginRight = '15px';
    btn.style.backgroundColor = isPrimary ? 'rgba(218, 165, 32, 0.9)' : 'rgba(139, 90, 43, 0.9)';
    btn.style.border = '2px solid rgba(218, 165, 32, 0.7)';
    btn.style.borderRadius = '8px';
    const label = $.CreatePanel('Label', btn, `${id}_Label`);
    label.text = text;
    label.style.fontSize = '18px';
    label.style.color = STAGE_THEME.colors.gold;
    label.style.fontWeight = 'bold';
    label.style.textAlign = 'center';
    label.style.horizontalAlign = 'center';
    label.style.verticalAlign = 'center';
    label.style.width = '100%';
    label.style.height = '100%';
    label.hittest = false;
    return btn;
}
function createProgressBar(parent) {
    const progressContainer = $.CreatePanel('Panel', parent, 'StageProgress');
    progressContainer.AddClass('stage_progress');
    progressContainer.style.flowChildren = 'right';
    progressContainer.style.verticalAlign = 'center';
    const progressLabel = $.CreatePanel('Label', progressContainer, 'ProgressLabel');
    progressLabel.text = '进度:';
    progressLabel.style.fontSize = '16px';
    progressLabel.style.color = STAGE_THEME.colors.text;
    progressLabel.style.marginRight = '10px';
    progressLabel.style.verticalAlign = 'center';
    const progressBg = $.CreatePanel('Panel', progressContainer, 'ProgressBarBg');
    progressBg.AddClass('progress_bar_bg');
    progressBg.style.width = '200px';
    progressBg.style.height = '16px';
    progressBg.style.backgroundColor = 'rgba(50, 40, 30, 0.8)';
    progressBg.style.border = '2px solid rgba(139, 90, 43, 0.6)';
    progressBg.style.borderRadius = '8px';
    progressBg.style.verticalAlign = 'center';
    const progressFill = $.CreatePanel('Panel', progressBg, 'ProgressBarFill');
    progressFill.AddClass('progress_bar_fill');
    progressFill.style.height = '100%';
    progressFill.style.width = '10%';
    progressFill.style.backgroundColor = STAGE_THEME.colors.gold;
    progressFill.style.borderRadius = '6px';
    const progressText = $.CreatePanel('Label', progressContainer, 'ProgressText');
    progressText.AddClass('progress_text');
    progressText.text = '1/10';
    progressText.style.fontSize = '16px';
    progressText.style.color = STAGE_THEME.colors.text;
    progressText.style.marginLeft = '15px';
    progressText.style.verticalAlign = 'center';
}
// ============================================================================
// Node Creation & Management
// ============================================================================
function createStageNodes(data) {
    // 层级：containerPanel > StageMapContainer > StageMapContent > StageNodesLayer
    const mapContainer = containerPanel === null || containerPanel === void 0 ? void 0 : containerPanel.FindChild('StageMapContainer');
    const mapContent = mapContainer === null || mapContainer === void 0 ? void 0 : mapContainer.FindChild('StageMapContent');
    const nodesLayer = mapContent === null || mapContent === void 0 ? void 0 : mapContent.FindChild('StageNodesLayer');
    if (!nodesLayer) {
        $.Msg('[StageSelect] ERROR: Nodes layer not found');
        $.Msg(`[StageSelect] Container: ${containerPanel ? 'exists' : 'null'}`);
        $.Msg(`[StageSelect] MapContainer: ${mapContainer ? 'exists' : 'null'}`);
        $.Msg(`[StageSelect] MapContent: ${mapContent ? 'exists' : 'null'}`);
        return;
    }
    $.Msg(`[StageSelect] Creating ${data.nodes.length} nodes...`);
    // Clear existing nodes
    nodesLayer.RemoveAndDeleteChildren();
    // First draw connections
    drawConnections(nodesLayer, data.nodes);
    // Then create nodes
    data.nodes.forEach(node => {
        createStageNode(nodesLayer, node);
    });
    // Update progress
    updateProgress(data);
}
function createStageNode(parent, node) {
    // 检查是否已存在节点，如果存在先删除
    const existingNode = parent.FindChild(`Node_${node.id}`);
    if (existingNode) {
        existingNode.DeleteAsync(0);
    }
    const nodePanel = $.CreatePanel('Panel', parent, `Node_${node.id}`);
    nodePanel.AddClass('stage_node');
    // 清除所有状态类，然后添加当前状态类
    nodePanel.RemoveClass('stage_node_locked');
    nodePanel.RemoveClass('stage_node_available');
    nodePanel.RemoveClass('stage_node_current');
    nodePanel.RemoveClass('stage_node_completed');
    nodePanel.AddClass(`stage_node_${node.status}`);
    $.Msg(`[StageSelect] 创建节点 ${node.id}，状态: ${node.status}`);
    // Calculate position
    const mapWidth = 1800;
    const mapHeight = 700;
    const nodeX = (node.x / 100) * mapWidth - STAGE_THEME.nodeSize / 2;
    const nodeY = (node.y / 100) * mapHeight - STAGE_THEME.nodeSize / 2;
    nodePanel.style.width = `${STAGE_THEME.nodeSize}px`;
    nodePanel.style.height = `${STAGE_THEME.nodeSize}px`;
    // 使用 position 属性进行绝对定位
    nodePanel.style.position = `${nodeX}px ${nodeY}px 0px`;
    $.Msg(`[StageSelect] Created node ${node.id} at (${nodeX}, ${nodeY})`);
    // Node frame
    const frame = $.CreatePanel('Panel', nodePanel, `NodeFrame_${node.id}`);
    frame.AddClass('stage_node_frame');
    frame.AddClass(`stage_node_frame_${node.type}`);
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.borderRadius = '12px';
    frame.style.backgroundColor = 'rgba(30, 20, 10, 0.9)';
    // Apply type-specific border color
    const borderColor = STAGE_THEME.colors[node.type];
    frame.style.border = `3px solid ${borderColor}`;
    frame.style.boxShadow = `0px 0px 15px ${borderColor.replace('0.8', '0.4').replace('0.9', '0.5')}`;
    // Node icon
    const icon = $.CreatePanel('Image', frame, `NodeIcon_${node.id}`);
    icon.AddClass('stage_node_icon');
    icon.SetImage(NODE_ICONS[node.type]);
    icon.style.width = `${STAGE_THEME.iconSize}px`;
    icon.style.height = `${STAGE_THEME.iconSize}px`;
    icon.style.horizontalAlign = 'center';
    icon.style.verticalAlign = 'center';
    // Apply status effects
    if (node.status === 'locked') {
        nodePanel.style.opacity = '0.4';
        frame.style.saturation = '0';
    }
    else if (node.status === 'completed') {
        nodePanel.style.opacity = '0.6';
    }
    else if (node.status === 'current') {
        // Add pulse animation class
        nodePanel.AddClass('stage_node_current');
    }
    // 设置节点可点击性
    if (node.status === 'available' || node.status === 'current') {
        // 确保节点可以接收点击事件
        nodePanel.hittest = true;
        nodePanel.enabled = true;
        // 单机模式：点击节点直接开始，不需要再点"开始战斗"按钮
        nodePanel.SetPanelEvent('onactivate', () => {
            $.Msg(`[StageSelect] 节点 ${node.id} 被点击，状态: ${node.status}`);
            selectNode(node);
            // 直接开始关卡（单机模式优化）
            if (node.status === 'available' || node.status === 'current') {
                $.Msg(`[StageSelect] 单机模式：点击节点直接开始关卡`);
                startStage(node);
            }
            else {
                $.Msg(`[StageSelect] 警告: 节点状态不是 available 或 current，无法开始`);
            }
        });
        nodePanel.SetPanelEvent('onmouseover', () => {
            showNodeTooltip(nodePanel, node);
        });
        nodePanel.SetPanelEvent('onmouseout', () => {
            hideNodeTooltip();
        });
    }
    else {
        // 锁定或已完成的节点不可点击
        nodePanel.hittest = false;
        nodePanel.enabled = false;
    }
    return nodePanel;
}
function drawConnections(parent, nodes) {
    // Create a layer for connections
    const connectionsLayer = $.CreatePanel('Panel', parent, 'ConnectionsLayer');
    connectionsLayer.style.width = '100%';
    connectionsLayer.style.height = '100%';
    nodes.forEach(node => {
        node.connections.forEach(targetId => {
            const targetNode = nodes.find(n => n.id === targetId);
            if (targetNode) {
                drawConnection(connectionsLayer, node, targetNode);
            }
        });
    });
}
function drawConnection(parent, from, to) {
    const mapWidth = 1800;
    const mapHeight = 700;
    const x1 = (from.x / 100) * mapWidth;
    const y1 = (from.y / 100) * mapHeight;
    const x2 = (to.x / 100) * mapWidth;
    const y2 = (to.y / 100) * mapHeight;
    // Calculate line properties
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const line = $.CreatePanel('Panel', parent, `Connection_${from.id}_${to.id}`);
    line.AddClass('stage_connection');
    // Determine if connection is active
    const isActive = from.status === 'completed' || from.status === 'current';
    if (isActive) {
        line.AddClass('stage_connection_active');
        line.style.backgroundColor = 'rgba(218, 165, 32, 0.8)';
    }
    else {
        line.style.backgroundColor = 'rgba(139, 90, 43, 0.4)';
    }
    line.style.width = `${length}px`;
    line.style.height = '4px';
    // 使用 position 属性进行绝对定位
    line.style.position = `${x1}px ${y1}px 0px`;
    line.style.transformOrigin = '0% 50%';
    line.style.transform = `rotateZ(${angle}deg)`;
    line.style.borderRadius = '2px';
}
// ============================================================================
// Selection & Interaction
// ============================================================================
function selectNode(node) {
    $.Msg(`[StageSelect] Node selected: ${node.name} (${node.type})`);
    Game.EmitSound('General.ButtonClick');
    // Clear previous selection
    if (selectedNode) {
        const prevPanel = containerPanel === null || containerPanel === void 0 ? void 0 : containerPanel.FindChildInLayoutFile(`Node_${selectedNode.id}`);
        if (prevPanel) {
            prevPanel.RemoveClass('selected');
        }
    }
    selectedNode = node;
    // Highlight new selection
    const nodePanel = containerPanel === null || containerPanel === void 0 ? void 0 : containerPanel.FindChildInLayoutFile(`Node_${node.id}`);
    if (nodePanel) {
        nodePanel.AddClass('selected');
        nodePanel.style.transform = 'scale3d(1.2, 1.2, 1.0)';
    }
    // Update start button
    updateStartButton();
}
function updateStartButton() {
    const startBtn = containerPanel === null || containerPanel === void 0 ? void 0 : containerPanel.FindChildInLayoutFile('StartStageBtn');
    if (!startBtn)
        return;
    if (selectedNode && selectedNode.status === 'available') {
        startBtn.RemoveClass('stage_btn_disabled');
        startBtn.style.opacity = '1.0';
    }
    else {
        startBtn.AddClass('stage_btn_disabled');
        startBtn.style.opacity = '0.5';
    }
}
function startStage(node) {
    $.Msg(`[StageSelect] Starting stage: ${node.name} (id: ${node.id})`);
    Game.EmitSound('General.CastAbility');
    // 从节点ID中提取关卡数字（例如 "stage_1" -> "1"）
    const stageIdMatch = node.id.match(/\d+/);
    const stageId = stageIdMatch ? stageIdMatch[0] : node.id;
    const localPlayerId = Players.GetLocalPlayer();
    $.Msg(`[StageSelect] ========== 发送选关事件到服务端 ==========`);
    $.Msg(`[StageSelect] 节点ID: ${node.id}`);
    $.Msg(`[StageSelect] 提取的 stageId: ${stageId}`);
    $.Msg(`[StageSelect] 玩家ID: ${localPlayerId}`);
    // 验证数据
    if (localPlayerId === -1 || localPlayerId === undefined) {
        $.Msg(`[StageSelect] ❌ 错误: 无效的玩家ID: ${localPlayerId}`);
        return;
    }
    if (!stageId) {
        $.Msg(`[StageSelect] ❌ 错误: 无效的关卡ID: ${stageId}`);
        return;
    }
    // 发送关卡选择事件到服务端
    const eventData = {
        playerId: localPlayerId,
        stageId: stageId.toString() // 确保是字符串
    };
    $.Msg(`[StageSelect] 事件数据: ${JSON.stringify(eventData)}`);
    $.Msg(`[StageSelect] 事件名称: autochess_wave_select_stage`);
    // 单机模式优化：直接发送事件，添加重试机制
    let retryCount = 0;
    const maxRetries = 3;
    function sendEvent() {
        try {
            $.Msg(`[StageSelect] 尝试发送事件 (第 ${retryCount + 1} 次)...`);
            GameEvents.SendCustomGameEventToServer('autochess_wave_select_stage', eventData);
            $.Msg(`[StageSelect] ✅ 事件发送成功 (尝试 ${retryCount + 1}/${maxRetries})`);
            // 隐藏选关界面
            hideStageSelect();
            // 显示准备中提示
            $.Msg(`[StageSelect] Stage selected, preparing...`);
        }
        catch (error) {
            retryCount++;
            $.Msg(`[StageSelect] ❌ 事件发送失败 (尝试 ${retryCount}/${maxRetries}): ${error}`);
            if (retryCount < maxRetries) {
                // 延迟重试（单机模式下可能需要等待连接建立）
                $.Schedule(0.5, () => {
                    sendEvent();
                });
            }
            else {
                $.Msg(`[StageSelect] ❌ 事件发送最终失败，已重试 ${maxRetries} 次`);
                // 即使失败也隐藏界面，避免卡住
                hideStageSelect();
            }
        }
    }
    // 立即发送
    sendEvent();
}
// ============================================================================
// Tooltip
// ============================================================================
let tooltipPanel = null;
function showNodeTooltip(nodePanel, node) {
    hideNodeTooltip();
    tooltipPanel = $.CreatePanel('Panel', containerPanel, 'NodeTooltip');
    tooltipPanel.AddClass('stage_node_tooltip');
    tooltipPanel.style.padding = '15px';
    tooltipPanel.style.backgroundColor = 'rgba(20, 15, 10, 0.95)';
    tooltipPanel.style.border = '2px solid rgba(139, 90, 43, 0.7)';
    tooltipPanel.style.borderRadius = '10px';
    tooltipPanel.style.flowChildren = 'down';
    tooltipPanel.style.zIndex = '100';
    // Position near node
    tooltipPanel.style.marginLeft = `${nodePanel.actualxoffset + STAGE_THEME.nodeSize + 10}px`;
    tooltipPanel.style.marginTop = `${nodePanel.actualyoffset}px`;
    // Title
    const title = $.CreatePanel('Label', tooltipPanel, 'TooltipTitle');
    title.AddClass('tooltip_title');
    title.text = node.name;
    title.style.fontSize = '18px';
    title.style.color = STAGE_THEME.colors.gold;
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';
    // Type indicator
    const typeLabel = $.CreatePanel('Label', tooltipPanel, 'TooltipType');
    typeLabel.text = getTypeDisplayName(node.type);
    typeLabel.style.fontSize = '14px';
    typeLabel.style.color = STAGE_THEME.colors[node.type];
    typeLabel.style.marginBottom = '5px';
    // Description
    const desc = $.CreatePanel('Label', tooltipPanel, 'TooltipDesc');
    desc.AddClass('tooltip_desc');
    desc.text = node.description;
    desc.style.fontSize = '14px';
    desc.style.color = '#d4af37';
    desc.style.opacity = '0.9';
    desc.style.marginBottom = '10px';
    // Rewards
    const rewards = $.CreatePanel('Label', tooltipPanel, 'TooltipRewards');
    rewards.AddClass('tooltip_rewards');
    rewards.text = `奖励: ${node.rewards}`;
    rewards.style.fontSize = '14px';
    rewards.style.color = '#32cd32';
}
function hideNodeTooltip() {
    if (tooltipPanel) {
        tooltipPanel.DeleteAsync(0);
        tooltipPanel = null;
    }
}
function getTypeDisplayName(type) {
    const names = {
        normal: '普通关卡',
        hard: '困难关卡',
        boss: 'Boss关卡',
        event: '事件节点'
    };
    return names[type];
}
// ============================================================================
// Progress
// ============================================================================
function updateProgress(data) {
    const progressFill = containerPanel === null || containerPanel === void 0 ? void 0 : containerPanel.FindChildInLayoutFile('ProgressBarFill');
    const progressText = containerPanel === null || containerPanel === void 0 ? void 0 : containerPanel.FindChildInLayoutFile('ProgressText');
    if (progressFill && progressText) {
        const percentage = (data.currentStage / data.maxStages) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.text = `${data.currentStage}/${data.maxStages}`;
    }
}
// ============================================================================
// Show/Hide
// ============================================================================
function showStageSelect(stageData) {
    $.Msg('[StageSelect] Showing stage selection UI');
    if (!containerPanel) {
        $.Msg('[StageSelect] ERROR: Container not initialized, reinitializing...');
        initStageSelect();
        if (!containerPanel) {
            $.Msg('[StageSelect] ERROR: Failed to initialize container');
            return;
        }
    }
    // 如果提供了新数据，使用新数据；否则使用现有数据或默认数据
    if (stageData) {
        currentStageData = stageData;
        $.Msg(`[StageSelect] 使用提供的新数据`);
    }
    else if (!currentStageData) {
        currentStageData = getMockStageData();
        $.Msg(`[StageSelect] 使用默认数据`);
    }
    else {
        $.Msg(`[StageSelect] 使用现有数据`);
    }
    // 输出当前节点状态用于调试
    if (currentStageData && currentStageData.nodes) {
        $.Msg(`[StageSelect] 当前节点状态:`);
        for (const node of currentStageData.nodes) {
            $.Msg(`[StageSelect]   - ${node.id}: ${node.status}`);
        }
    }
    // 确保使用最新的节点数据重新创建节点
    $.Msg(`[StageSelect] 使用当前数据创建节点，节点数量: ${currentStageData.nodes.length}`);
    createStageNodes(currentStageData);
    // Show container - 确保所有样式正确
    containerPanel.style.visibility = 'visible';
    containerPanel.style.opacity = '1.0';
    containerPanel.style.zIndex = '9000';
    isVisible = true;
    // Play sound
    Game.EmitSound('General.ButtonClick');
    $.Msg(`[StageSelect] Container visibility: ${containerPanel.style.visibility}`);
    $.Msg(`[StageSelect] Container zIndex: ${containerPanel.style.zIndex}`);
    $.Msg('[StageSelect] Stage selection UI is now visible');
}
function hideStageSelect() {
    $.Msg('[StageSelect] Hiding stage selection UI');
    if (!containerPanel)
        return;
    containerPanel.style.visibility = 'collapse';
    isVisible = false;
    selectedNode = null;
    hideNodeTooltip();
    // Notify server
    GameEvents.SendCustomGameEventToServer('stage_select_closed', {});
}
function toggleStageSelect() {
    if (isVisible) {
        hideStageSelect();
    }
    else {
        showStageSelect();
    }
}
// ============================================================================
// Drag Scroll Functionality
// ============================================================================
function setupDragScroll(mapContainer) {
    $.Msg('[StageSelect] Setting up mouse wheel horizontal scroll...');
    // 使用鼠标滚轮进行水平滚动（Shift+滚轮）
    mapContainer.SetPanelEvent('onmousewheelup', () => {
        const currentScroll = mapContainer.scrollLeft || 0;
        mapContainer.ScrollToLeftOffset(Math.max(0, currentScroll - 100), true);
        return true;
    });
    mapContainer.SetPanelEvent('onmousewheeldown', () => {
        const currentScroll = mapContainer.scrollLeft || 0;
        mapContainer.ScrollToLeftOffset(currentScroll + 100, true);
        return true;
    });
    $.Msg('[StageSelect] Mouse wheel scroll setup complete');
}
// ============================================================================
// Event Handlers
// ============================================================================
function registerEvents() {
    $.Msg('[StageSelect] Registering event handlers...');
    // 只使用 GameEvents，不使用 RegisterEventHandler
    // RegisterEventHandler 只支持内置事件类型，自定义事件会报错
    GameEvents.Subscribe('open_stage_select', (data) => {
        $.Msg('[StageSelect] ✅ Received open_stage_select event');
        showStageSelect(data);
    });
    GameEvents.Subscribe('close_stage_select', () => {
        $.Msg('[StageSelect] Received close_stage_select event');
        hideStageSelect();
    });
    GameEvents.Subscribe('update_stage_data', (data) => {
        $.Msg('[StageSelect] ========== 收到关卡状态更新 ==========');
        $.Msg(`[StageSelect] 数据对象键: ${Object.keys(data).join(', ')}`);
        $.Msg(`[StageSelect] data.nodes 类型: ${typeof data.nodes}, 是数组: ${Array.isArray(data.nodes)}`);
        $.Msg(`[StageSelect] data.completedStages 类型: ${typeof data.completedStages}, 是数组: ${Array.isArray(data.completedStages)}`);
        $.Msg(`[StageSelect] data.availableStages 类型: ${typeof data.availableStages}, 是数组: ${Array.isArray(data.availableStages)}`);
        // 🔧 修复：将 Lua 表（对象）转换为 JavaScript 数组
        const convertToArray = (obj) => {
            if (Array.isArray(obj)) {
                return obj;
            }
            if (typeof obj === 'object' && obj !== null) {
                // Lua 表会被序列化为对象，需要手动转换
                const arr = [];
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        arr.push(obj[key]);
                    }
                }
                $.Msg(`[StageSelect] 🔧 转换对象为数组，长度: ${arr.length}`);
                return arr;
            }
            return [];
        };
        // 转换 nodes
        const nodesArray = convertToArray(data.nodes);
        $.Msg(`[StageSelect] nodes 转换后数组长度: ${nodesArray.length}`);
        // 转换 completedStages
        const completedArray = convertToArray(data.completedStages);
        const completedStagesStr = completedArray.length > 0 ? completedArray.join(', ') : '无';
        $.Msg(`[StageSelect] 已完成关卡: ${completedStagesStr}`);
        // 转换 availableStages
        const availableArray = convertToArray(data.availableStages);
        const availableStagesStr = availableArray.length > 0 ? availableArray.join(', ') : '无';
        $.Msg(`[StageSelect] 可用关卡: ${availableStagesStr}`);
        // 更新节点状态
        if (nodesArray.length > 0) {
            $.Msg(`[StageSelect] nodes 数组长度: ${nodesArray.length}`);
            // 确保 currentStageData 存在
            if (!currentStageData) {
                currentStageData = getMockStageData();
            }
            // 更新节点状态
            if (currentStageData.nodes) {
                let updatedCount = 0;
                for (const updateNode of nodesArray) {
                    const existingNode = currentStageData.nodes.find(n => n.id === updateNode.id);
                    if (existingNode && updateNode.status) {
                        const oldStatus = existingNode.status;
                        existingNode.status = updateNode.status;
                        updatedCount++;
                        $.Msg(`[StageSelect] 更新节点 ${updateNode.id} 状态: ${oldStatus} -> ${updateNode.status}`);
                    }
                    else if (!existingNode) {
                        $.Msg(`[StageSelect] 警告: 节点 ${updateNode.id} 不存在于当前数据中`);
                    }
                    else if (!updateNode.status) {
                        $.Msg(`[StageSelect] 警告: 节点 ${updateNode.id} 没有状态信息`);
                    }
                }
                $.Msg(`[StageSelect] 共更新了 ${updatedCount} 个节点的状态`);
            }
            else {
                $.Msg(`[StageSelect] 警告: currentStageData.nodes 不存在`);
            }
            // 更新进度
            if (data.currentStage !== undefined) {
                currentStageData.currentStage = data.currentStage;
            }
            if (data.maxStages !== undefined) {
                currentStageData.maxStages = data.maxStages;
            }
            // 如果界面可见，立即重新创建所有节点以应用新状态
            if (isVisible && currentStageData) {
                $.Msg(`[StageSelect] 界面可见，立即重新创建节点以应用新状态...`);
                createStageNodes(currentStageData);
            }
            else {
                $.Msg(`[StageSelect] 界面不可见，已更新数据，下次打开时会显示新状态`);
            }
        }
        else {
            $.Msg(`[StageSelect] ❌ 警告: 收到更新但 nodes 数据无效`);
        }
    });
    GameEvents.Subscribe('open_level_selection', () => {
        $.Msg('[StageSelect] ✅ Received open_level_selection event');
        // 请求最新的关卡状态（通过显示界面触发服务端发送更新）
        showStageSelect();
        // 如果界面已打开，服务端应该会发送 update_stage_data 事件
    });
    $.Msg('[StageSelect] ✅ Event handlers registered');
}
// ============================================================================
// Global API
// ============================================================================
function exposeGlobalAPI() {
    $.Msg('[StageSelect] Exposing global API...');
    // @ts-ignore
    globalThis.StageSelect = {
        show: showStageSelect,
        hide: hideStageSelect,
        toggle: toggleStageSelect,
        isVisible: () => isVisible,
        getSelectedNode: () => selectedNode,
        test: () => {
            $.Msg('[StageSelect] Test function called');
            showStageSelect();
            return 'Stage Select UI shown';
        }
    };
    $.Msg('[StageSelect] ✅ Global API exposed successfully');
    $.Msg(`[StageSelect] Verify: globalThis.StageSelect = ${!!globalThis.StageSelect}`);
}
// ============================================================================
// Initialization
// ============================================================================
$.Msg('[StageSelect] ========================================');
$.Msg('[StageSelect] Stage Selection UI Loading...');
$.Msg('[StageSelect] ========================================');
// 立即初始化
initStageSelect();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0JBQXdCLENBQUMsMkJBQTJCLGVBQWUsTUFBTSxXQUFXLEtBQUssa0JBQWtCO0FBQzNHO0FBQ0E7QUFDQSx3QkFBd0IsQ0FBQyw2QkFBNkIsZUFBZTtBQUNyRTtBQUNBO0FBQ0Esd0JBQXdCLENBQUMsNkJBQTZCLGVBQWU7QUFDckU7QUFDQTtBQUNBLGdCQUFnQixDQUFDLDJCQUEyQixjQUFjO0FBQzFEO0FBQ0E7QUFDQSxnQkFBZ0IsQ0FBQztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixDQUFDO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixDQUFDO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFlBQVksQ0FBQztBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxDQUFDO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTCxJQUFJLENBQUMsdURBQXVELHlCQUF5QjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxDQUFDO0FBQ0QsQ0FBQztBQUNEO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgdmFyIFwiJFwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vRDpcXFN0ZWFtQXBwXFxzdGVhbWFwcHNcXGNvbW1vblxcZG90YSAyIGJldGFcXGNvbnRlbnRcXGRvdGFfYWRkb25zXFxmdXNpb25cXHBhbm9yYW1hXFxzcmNcXHN0YWdlc2VsZWN0XFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBAdHMtbm9jaGVja1xuLyoqXG4gKiBTdGFnZSBTZWxlY3Rpb24gVUlcbiAqIFJvZ3VlbGlrZSBzdHlsZSBtYXAgc2VsZWN0aW9uIGludGVyZmFjZVxuICpcbiAqIEZlYXR1cmVzOlxuICogLSBNYXAgd2l0aCBtdWx0aXBsZSBzdGFnZSBub2Rlc1xuICogLSBEaWZmZXJlbnQgbm9kZSB0eXBlczogbm9ybWFsLCBoYXJkLCBib3NzLCBldmVudFxuICogLSBQYXRoIGNvbm5lY3Rpb25zIGJldHdlZW4gbm9kZXNcbiAqIC0gUHJvZ3Jlc3MgdHJhY2tpbmdcbiAqL1xuLy8g56uL5Y2z5omn6KGM5pel5b+XXG4kLk1zZygn8J+Xuu+4jyBTdGFnZVNlbGVjdCBzY3JpcHQgZmlsZSBpcyBleGVjdXRpbmchJyk7XG5HYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuLy8g56uL5Y2z5pq06Zyy5YWo5bGAQVBJ77yI56Gu5L+d5Y2z5L2/5Yid5aeL5YyW5aSx6LSl5Lmf6IO96K6/6Zeu77yJXG5nbG9iYWxUaGlzLlN0YWdlU2VsZWN0ID0ge1xuICAgIHNob3c6ICgpID0+ICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEVhcmx5IEFQSTogc2hvdyBjYWxsZWQgYmVmb3JlIGluaXQnKSxcbiAgICB0ZXN0OiAoKSA9PiAkLk1zZygnW1N0YWdlU2VsZWN0XSBFYXJseSBBUEk6IHRlc3QgY2FsbGVkIGJlZm9yZSBpbml0Jylcbn07XG4kLk1zZygnW1N0YWdlU2VsZWN0XSBFYXJseSBnbG9iYWwgQVBJIGV4cG9zZWQnKTtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENvbnN0YW50cyAmIFRoZW1lXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5jb25zdCBTVEFHRV9USEVNRSA9IHtcbiAgICBjb2xvcnM6IHtcbiAgICAgICAgbm9ybWFsOiAncmdiYSgxMDAsIDE0OSwgMjM3LCAwLjgpJyxcbiAgICAgICAgaGFyZDogJ3JnYmEoMjIwLCAyMCwgNjAsIDAuOCknLFxuICAgICAgICBib3NzOiAncmdiYSgyNTUsIDIxNSwgMCwgMC45KScsXG4gICAgICAgIGV2ZW50OiAncmdiYSg1MCwgMjA1LCA1MCwgMC44KScsXG4gICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI2LCAyNiwgNDYsIDAuOTUpJyxcbiAgICAgICAgZ29sZDogJyNmZmQ3MDAnLFxuICAgICAgICB0ZXh0OiAnI2Q0YWYzNydcbiAgICB9LFxuICAgIG5vZGVTaXplOiA5MCxcbiAgICBpY29uU2l6ZTogNzBcbn07XG5jb25zdCBOT0RFX0lDT05TID0ge1xuICAgIG5vcm1hbDogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9ub2RlL25vcm1hbE5vZGUucG5nJyxcbiAgICBoYXJkOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL25vZGUvaGFyZE5vZGUucG5nJyxcbiAgICBib3NzOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL25vZGUvYm9zc05vZGUucG5nJyxcbiAgICBldmVudDogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9ub2RlL2V2ZW50Tm9kZS5wbmcnXG59O1xuY29uc3QgU1RBR0VfQkFDS0dST1VORFMgPSBbXG4gICAgJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9iZy9zaG93Y2FzZV9iZ19maWVsZF8wMDFfcG5nLnBuZycsXG4gICAgJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9iZy9iZzEucG5nJyxcbiAgICAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2JnL2JnMi5wbmcnLFxuICAgICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvYmcvYmczLnBuZydcbl07XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTdGF0ZSBNYW5hZ2VtZW50XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgcm9vdFBhbmVsID0gbnVsbDtcbmxldCBjb250YWluZXJQYW5lbCA9IG51bGw7XG5sZXQgc2VsZWN0ZWROb2RlID0gbnVsbDtcbmxldCBjdXJyZW50U3RhZ2VEYXRhID0gbnVsbDtcbmxldCBpc1Zpc2libGUgPSBmYWxzZTtcbi8vIERyYWcgc2Nyb2xsIHN0YXRlXG5sZXQgaXNEcmFnZ2luZyA9IGZhbHNlO1xubGV0IGRyYWdTdGFydFggPSAwO1xubGV0IGRyYWdTdGFydFkgPSAwO1xubGV0IHNjcm9sbFN0YXJ0WCA9IDA7XG5sZXQgc2Nyb2xsU3RhcnRZID0gMDtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE1vY2sgRGF0YSAoZm9yIHRlc3RpbmcpXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBnZXRNb2NrU3RhZ2VEYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRTdGFnZTogMSxcbiAgICAgICAgbWF4U3RhZ2VzOiAxMSxcbiAgICAgICAgbm9kZXM6IFtcbiAgICAgICAgICAgIC8vIOesrDHlsYIgLSDotbflp4vngrlcbiAgICAgICAgICAgIHsgaWQ6ICdMMV8xJywgbmFtZTogJ+i1t+Wni+eCuScsIHR5cGU6ICdub3JtYWwnLCBzdGF0dXM6ICdhdmFpbGFibGUnLCB4OiA4LCB5OiA1MCwgZGVzY3JpcHRpb246ICfml4XnqIvnmoTotbfngrknLCByZXdhcmRzOiAn5pegJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ0wyXzEnLCAnTDJfMicsICdMMl8zJ10gfSxcbiAgICAgICAgICAgIC8vIOesrDLlsYIgLSAz5Liq6IqC54K577yI5YiG5pSv54K5Me+8muWPr+S7pemAieaLqTPmnaHot6/nur/vvIlcbiAgICAgICAgICAgIHsgaWQ6ICdMMl8xJywgbmFtZTogJ+eyvuiLseaImOaWlycsIHR5cGU6ICdoYXJkJywgc3RhdHVzOiAnbG9ja2VkJywgeDogMTgsIHk6IDMwLCBkZXNjcmlwdGlvbjogJ+eyvuiLseaAqueJqeaImOaWlycsIHJld2FyZHM6ICfpq5jnuqflpZblirEnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDNfMSddIH0sXG4gICAgICAgICAgICB7IGlkOiAnTDJfMicsIG5hbWU6ICfmma7pgJrmiJjmlpcnLCB0eXBlOiAnbm9ybWFsJywgc3RhdHVzOiAnbG9ja2VkJywgeDogMTgsIHk6IDUwLCBkZXNjcmlwdGlvbjogJ+aZrumAmuaAqueJqeaImOaWlycsIHJld2FyZHM6ICfln7rnoYDlpZblirEnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDNfMiddIH0sXG4gICAgICAgICAgICB7IGlkOiAnTDJfMycsIG5hbWU6ICfmma7pgJrmiJjmlpcnLCB0eXBlOiAnbm9ybWFsJywgc3RhdHVzOiAnbG9ja2VkJywgeDogMTgsIHk6IDcwLCBkZXNjcmlwdGlvbjogJ+aZrumAmuaAqueJqeaImOaWlycsIHJld2FyZHM6ICfln7rnoYDlpZblirEnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDNfMyddIH0sXG4gICAgICAgICAgICAvLyDnrKwz5bGCIC0gM+S4quiKgueCue+8iOWQhOi1sOWQhOeahOi3r+e6v++8iVxuICAgICAgICAgICAgeyBpZDogJ0wzXzEnLCBuYW1lOiAn5pmu6YCa5oiY5paXJywgdHlwZTogJ25vcm1hbCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDI4LCB5OiAzMCwgZGVzY3JpcHRpb246ICfmma7pgJrmgKrnianmiJjmlpcnLCByZXdhcmRzOiAn5Z+656GA5aWW5YqxJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ0w0XzEnXSB9LFxuICAgICAgICAgICAgeyBpZDogJ0wzXzInLCBuYW1lOiAn5Zue6KGA5LqL5Lu2JywgdHlwZTogJ2V2ZW50Jywgc3RhdHVzOiAnbG9ja2VkJywgeDogMjgsIHk6IDUwLCBkZXNjcmlwdGlvbjogJ+aBouWkjeeUn+WRveWAvCcsIHJld2FyZHM6ICflm57ooYAyMCUnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDRfMiddIH0sXG4gICAgICAgICAgICB7IGlkOiAnTDNfMycsIG5hbWU6ICflm57ooYDkuovku7YnLCB0eXBlOiAnZXZlbnQnLCBzdGF0dXM6ICdsb2NrZWQnLCB4OiAyOCwgeTogNzAsIGRlc2NyaXB0aW9uOiAn5oGi5aSN55Sf5ZG95YC8JywgcmV3YXJkczogJ+WbnuihgDIwJScsIGljb246ICcnLCBjb25uZWN0aW9uczogWydMNF8zJ10gfSxcbiAgICAgICAgICAgIC8vIOesrDTlsYIgLSAz5Liq6IqC54K577yI57un57ut5ZCE6Ieq6Lev57q/77yJXG4gICAgICAgICAgICB7IGlkOiAnTDRfMScsIG5hbWU6ICflm57ooYDkuovku7YnLCB0eXBlOiAnZXZlbnQnLCBzdGF0dXM6ICdsb2NrZWQnLCB4OiAzOCwgeTogMzAsIGRlc2NyaXB0aW9uOiAn5oGi5aSN55Sf5ZG95YC8JywgcmV3YXJkczogJ+WbnuihgDIwJScsIGljb246ICcnLCBjb25uZWN0aW9uczogWydMNV8xJ10gfSxcbiAgICAgICAgICAgIHsgaWQ6ICdMNF8yJywgbmFtZTogJ+eyvuiLseaImOaWlycsIHR5cGU6ICdoYXJkJywgc3RhdHVzOiAnbG9ja2VkJywgeDogMzgsIHk6IDUwLCBkZXNjcmlwdGlvbjogJ+eyvuiLseaAqueJqeaImOaWlycsIHJld2FyZHM6ICfpq5jnuqflpZblirEnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDVfMiddIH0sXG4gICAgICAgICAgICB7IGlkOiAnTDRfMycsIG5hbWU6ICfmma7pgJrmiJjmlpcnLCB0eXBlOiAnbm9ybWFsJywgc3RhdHVzOiAnbG9ja2VkJywgeDogMzgsIHk6IDcwLCBkZXNjcmlwdGlvbjogJ+aZrumAmuaAqueJqeaImOaWlycsIHJld2FyZHM6ICfln7rnoYDlpZblirEnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDVfMyddIH0sXG4gICAgICAgICAgICAvLyDnrKw15bGCIC0gM+S4quiKgueCue+8iOWIhuaUr+eCuTLvvJrlj4jlj6/ku6XpgInmi6kz5p2h6Lev57q/77yJXG4gICAgICAgICAgICB7IGlkOiAnTDVfMScsIG5hbWU6ICfnsr7oi7HmiJjmlpcnLCB0eXBlOiAnaGFyZCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDQ4LCB5OiAzMCwgZGVzY3JpcHRpb246ICfnsr7oi7HmgKrnianmiJjmlpcnLCByZXdhcmRzOiAn6auY57qn5aWW5YqxJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ0w2XzEnLCAnTDZfMicsICdMNl8zJ10gfSxcbiAgICAgICAgICAgIHsgaWQ6ICdMNV8yJywgbmFtZTogJ+WbnuihgOS6i+S7ticsIHR5cGU6ICdldmVudCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDQ4LCB5OiA1MCwgZGVzY3JpcHRpb246ICfmgaLlpI3nlJ/lkb3lgLwnLCByZXdhcmRzOiAn5Zue6KGAMjAlJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ0w2XzEnLCAnTDZfMicsICdMNl8zJ10gfSxcbiAgICAgICAgICAgIHsgaWQ6ICdMNV8zJywgbmFtZTogJ+eyvuiLseaImOaWlycsIHR5cGU6ICdoYXJkJywgc3RhdHVzOiAnbG9ja2VkJywgeDogNDgsIHk6IDcwLCBkZXNjcmlwdGlvbjogJ+eyvuiLseaAqueJqeaImOaWlycsIHJld2FyZHM6ICfpq5jnuqflpZblirEnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDZfMScsICdMNl8yJywgJ0w2XzMnXSB9LFxuICAgICAgICAgICAgLy8g56ysNuWxgiAtIDPkuKroioLngrnvvIjpgInmi6nlkI7lkITotbDlkITnmoTot6/vvIznhLblkI7msYfogZrvvIlcbiAgICAgICAgICAgIHsgaWQ6ICdMNl8xJywgbmFtZTogJ+aZrumAmuaImOaWlycsIHR5cGU6ICdub3JtYWwnLCBzdGF0dXM6ICdsb2NrZWQnLCB4OiA1OCwgeTogMzAsIGRlc2NyaXB0aW9uOiAn5pmu6YCa5oCq54mp5oiY5paXJywgcmV3YXJkczogJ+WfuuehgOWlluWKsScsIGljb246ICcnLCBjb25uZWN0aW9uczogWydMN18xJ10gfSxcbiAgICAgICAgICAgIHsgaWQ6ICdMNl8yJywgbmFtZTogJ+aZrumAmuaImOaWlycsIHR5cGU6ICdub3JtYWwnLCBzdGF0dXM6ICdsb2NrZWQnLCB4OiA1OCwgeTogNTAsIGRlc2NyaXB0aW9uOiAn5pmu6YCa5oCq54mp5oiY5paXJywgcmV3YXJkczogJ+WfuuehgOWlluWKsScsIGljb246ICcnLCBjb25uZWN0aW9uczogWydMN18xJ10gfSxcbiAgICAgICAgICAgIHsgaWQ6ICdMNl8zJywgbmFtZTogJ+WbnuihgOS6i+S7ticsIHR5cGU6ICdldmVudCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDU4LCB5OiA3MCwgZGVzY3JpcHRpb246ICfmgaLlpI3nlJ/lkb3lgLwnLCByZXdhcmRzOiAn5Zue6KGAMjAlJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ0w3XzEnXSB9LFxuICAgICAgICAgICAgLy8g56ysN+WxgiAtIDHkuKroioLngrnvvIjmsYfogZrngrnvvIzlkI7nu63mmK/ljZXkuIDot6/nur/vvIlcbiAgICAgICAgICAgIHsgaWQ6ICdMN18xJywgbmFtZTogJ+aZrumAmuaImOaWlycsIHR5cGU6ICdub3JtYWwnLCBzdGF0dXM6ICdsb2NrZWQnLCB4OiA2OCwgeTogNTAsIGRlc2NyaXB0aW9uOiAn5pmu6YCa5oCq54mp5oiY5paXJywgcmV3YXJkczogJ+WfuuehgOWlluWKsScsIGljb246ICcnLCBjb25uZWN0aW9uczogWydMOF8xJ10gfSxcbiAgICAgICAgICAgIC8vIOesrDjlsYIgLSAx5Liq6IqC54K5XG4gICAgICAgICAgICB7IGlkOiAnTDhfMScsIG5hbWU6ICfnsr7oi7HmiJjmlpcnLCB0eXBlOiAnaGFyZCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDc1LCB5OiA1MCwgZGVzY3JpcHRpb246ICfnsr7oi7HmgKrnianmiJjmlpcnLCByZXdhcmRzOiAn6auY57qn5aWW5YqxJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ0w5XzEnXSB9LFxuICAgICAgICAgICAgLy8g56ysOeWxgiAtIDHkuKroioLngrnvvIjmkqTnprvkuovku7bvvIlcbiAgICAgICAgICAgIHsgaWQ6ICdMOV8xJywgbmFtZTogJ+aSpOemu+S6i+S7ticsIHR5cGU6ICdldmVudCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDgyLCB5OiA1MCwgZGVzY3JpcHRpb246ICflhrPlrprmmK/lkKbnu6fnu63liY3ov5snLCByZXdhcmRzOiAn54m55q6K6YCJ5oupJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ0wxMF8xJ10gfSxcbiAgICAgICAgICAgIC8vIOesrDEw5bGCIC0gMeS4quiKgueCuVxuICAgICAgICAgICAgeyBpZDogJ0wxMF8xJywgbmFtZTogJ+eyvuiLseaImOaWlycsIHR5cGU6ICdoYXJkJywgc3RhdHVzOiAnbG9ja2VkJywgeDogODksIHk6IDUwLCBkZXNjcmlwdGlvbjogJ+W8uuWKm+eyvuiLseaImOaWlycsIHJld2FyZHM6ICflj7Lor5flpZblirEnLCBpY29uOiAnJywgY29ubmVjdGlvbnM6IFsnTDExXzEnXSB9LFxuICAgICAgICAgICAgLy8g56ysMTHlsYIgLSBCb3NzXG4gICAgICAgICAgICB7IGlkOiAnTDExXzEnLCBuYW1lOiAnQm9zc+aImCcsIHR5cGU6ICdib3NzJywgc3RhdHVzOiAnbG9ja2VkJywgeDogOTYsIHk6IDUwLCBkZXNjcmlwdGlvbjogJ+acgOe7iEJvc3PmiJjmlpcnLCByZXdhcmRzOiAn5Lyg6K+06KOF5aSHJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbXSB9XG4gICAgICAgIF1cbiAgICB9O1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVUkgQ3JlYXRpb24gRnVuY3Rpb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDliJvlu7rpgInlhbPlrrnlmajvvIjlj4LogIMgYmF0dGxlRW5kVmlld++8iVxuZnVuY3Rpb24gY3JlYXRlU3RhZ2VTZWxlY3RDb250YWluZXIoKSB7XG4gICAgY29uc3Qgcm9vdCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290KSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKdjCBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8g5qOA5p+l5piv5ZCm5bey5a2Y5ZyoXG4gICAgbGV0IGNvbnRhaW5lciA9IHJvb3QuRmluZENoaWxkKCdTdGFnZVNlbGVjdENvbnRhaW5lcicpO1xuICAgIGlmIChjb250YWluZXIgJiYgY29udGFpbmVyLklzVmFsaWQoKSkge1xuICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBDb250YWluZXIgYWxyZWFkeSBleGlzdHMsIHJldXNpbmcnKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLy8g5Yig6Zmk5peg5pWI5a655ZmoXG4gICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLklzVmFsaWQoKSkge1xuICAgICAgICBjb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIENyZWF0aW5nIG5ldyBjb250YWluZXIuLi4nKTtcbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3QsICdTdGFnZVNlbGVjdENvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKdjCBGYWlsZWQgdG8gY3JlYXRlIGNvbnRhaW5lcicpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8g6aqM6K+B54i25YWD57SgXG4gICAgY29uc3QgcGFyZW50ID0gY29udGFpbmVyLkdldFBhcmVudCgpO1xuICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIENvbnRhaW5lciBwYXJlbnQ6ICR7cGFyZW50ID8gcGFyZW50LmlkIDogJ251bGwnfWApO1xuICAgIGNvbnRhaW5lci5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2NvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250YWluZXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJzsgLy8g6buY6K6k6ZqQ6JePXG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICc5MDAwJztcbiAgICBjb250YWluZXIuaGl0dGVzdCA9IGZhbHNlO1xuICAgIC8vIOWIm+W7uumBrue9qVxuICAgIGNvbnN0IG1hc2sgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ1N0YWdlU2VsZWN0TWFzaycpO1xuICAgIG1hc2suc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjg1KSc7XG4gICAgbWFzay5oaXR0ZXN0ID0gdHJ1ZTsgLy8g5oum5oiq54K55Ye7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0g4pyFIENvbnRhaW5lciBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG5mdW5jdGlvbiBpbml0U3RhZ2VTZWxlY3QoKSB7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEluaXRpYWxpemluZy4uLicpO1xuICAgIC8vIOWIm+W7uuWuueWZqFxuICAgIGNvbnRhaW5lclBhbmVsID0gY3JlYXRlU3RhZ2VTZWxlY3RDb250YWluZXIoKTtcbiAgICBpZiAoIWNvbnRhaW5lclBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKdjCBGYWlsZWQgdG8gY3JlYXRlIGNvbnRhaW5lciwgYWJvcnRpbmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIHJvb3RQYW5lbCA9PT0gbnVsbCB8fCByb290UGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3RQYW5lbC5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X3Jvb3QnKTtcbiAgICAvLyDliJvlu7pVSeWFg+e0oCAtIOa3u+WKoOmUmeivr+WkhOeQhlxuICAgIHRyeSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIENyZWF0aW5nIGJhY2tncm91bmQuLi4nKTtcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZChjb250YWluZXJQYW5lbCk7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIENyZWF0aW5nIGhlYWRlci4uLicpO1xuICAgICAgICBjcmVhdGVIZWFkZXIoY29udGFpbmVyUGFuZWwpO1xuICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBDcmVhdGluZyBtYXAgYXJlYS4uLicpO1xuICAgICAgICBjcmVhdGVNYXBBcmVhKGNvbnRhaW5lclBhbmVsKTtcbiAgICAgICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gQ3JlYXRpbmcgZm9vdGVyLi4uJyk7XG4gICAgICAgIGNyZWF0ZUZvb3Rlcihjb250YWluZXJQYW5lbCk7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIFVJIGVsZW1lbnRzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOKdjCBFUlJPUiBjcmVhdGluZyBVSTogJHtlfWApO1xuICAgIH1cbiAgICAvLyDms6jlhozkuovku7ZcbiAgICByZWdpc3RlckV2ZW50cygpO1xuICAgIC8vIOaatOmcsuWFqOWxgEFQSVxuICAgIGV4cG9zZUdsb2JhbEFQSSgpO1xuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKchSBJbml0aWFsaXphdGlvbiBjb21wbGV0ZScpO1xuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUJhY2tncm91bmQocGFyZW50KSB7XG4gICAgY29uc3QgYmcgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1N0YWdlU2VsZWN0QmcnKTtcbiAgICBiZy5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2JnJyk7XG4gICAgYmcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7U1RBR0VfQkFDS0dST1VORFNbMF19XCIpYDtcbiAgICBiZy5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb3Zlcic7XG4gICAgYmcuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG59XG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIocGFyZW50KSB7XG4gICAgY29uc3QgaGVhZGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdTdGFnZVNlbGVjdEhlYWRlcicpO1xuICAgIGhlYWRlci5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2hlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGhlYWRlci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoZWFkZXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgIGhlYWRlci5zdHlsZS5wYWRkaW5nID0gJzE1cHggNDBweCc7XG4gICAgaGVhZGVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuNyknO1xuICAgIC8vIFRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGhlYWRlciwgJ1N0YWdlVGl0bGUnKTtcbiAgICB0aXRsZS5BZGRDbGFzcygnc3RhZ2VfdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+mAieaLqeWFs+WNoSc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMzJweCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnMuZ29sZDtcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRTaGFkb3cgPSAnMnB4IDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICB0aXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICB0aXRsZS5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8gQ2xvc2UgYnV0dG9uXG4gICAgY29uc3QgY2xvc2VCdG4gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBoZWFkZXIsICdDbG9zZUJ1dHRvbicpO1xuICAgIGNsb3NlQnRuLnN0eWxlLndpZHRoID0gJzQwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmhlaWdodCA9ICc0MHB4JztcbiAgICBjbG9zZUJ0bi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgIGNsb3NlQnRuLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjbG9zZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyMjAsIDIwLCA2MCwgMC44KSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgY29uc3QgY2xvc2VMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY2xvc2VCdG4sICdDbG9zZUJ0bkxhYmVsJyk7XG4gICAgY2xvc2VMYWJlbC50ZXh0ID0gJ1gnO1xuICAgIGNsb3NlTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgY2xvc2VMYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICBjbG9zZUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlTGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlTGFiZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY2xvc2VMYWJlbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY2xvc2VMYWJlbC5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgY2xvc2VCdG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgaGlkZVN0YWdlU2VsZWN0KCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVNYXBBcmVhKHBhcmVudCkge1xuICAgIGNvbnN0IG1hcENvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnU3RhZ2VNYXBDb250YWluZXInKTtcbiAgICBtYXBDb250YWluZXIuQWRkQ2xhc3MoJ3N0YWdlX21hcF9jb250YWluZXInKTtcbiAgICBtYXBDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFwQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBtYXBDb250YWluZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFwQ29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBtYXBDb250YWluZXIuaGl0dGVzdCA9IHRydWU7IC8vIOehruS/neWPr+S7peaOpeaUtum8oOagh+S6i+S7tlxuICAgIC8vIE1hcCBjb250ZW50IHdpdGggYmFja2dyb3VuZFxuICAgIGNvbnN0IG1hcENvbnRlbnQgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIG1hcENvbnRhaW5lciwgJ1N0YWdlTWFwQ29udGVudCcpO1xuICAgIG1hcENvbnRlbnQuQWRkQ2xhc3MoJ3N0YWdlX21hcF9jb250ZW50Jyk7XG4gICAgbWFwQ29udGVudC5zdHlsZS53aWR0aCA9ICcxODAwcHgnO1xuICAgIG1hcENvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gJzcwMHB4JztcbiAgICBtYXBDb250ZW50LnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hcENvbnRlbnQuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hcENvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjAsIDE1LCAxMCwgMC42KSc7XG4gICAgbWFwQ29udGVudC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMjBweCc7XG4gICAgbWFwQ29udGVudC5zdHlsZS5ib3JkZXIgPSAnM3B4IHNvbGlkIHJnYmEoMTM5LCA5MCwgNDMsIDAuNSknO1xuICAgIC8vIOa3u+WKoOiDjOaZr+aLluaLveWxgu+8iOWcqOiKgueCueWxguS5i+WJjeWIm+W7uu+8jOi/meagt+iKgueCueS8muWcqOS4iuWxgu+8iVxuICAgIGNvbnN0IGRyYWdCZyA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgbWFwQ29udGVudCwgJ0RyYWdCYWNrZ3JvdW5kJyk7XG4gICAgZHJhZ0JnLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGRyYWdCZy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgZHJhZ0JnLmhpdHRlc3QgPSB0cnVlO1xuICAgIGRyYWdCZy5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIGNvbnN0IGN1cnNvclBvcyA9IEdhbWVVSS5HZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICBkcmFnU3RhcnRYID0gY3Vyc29yUG9zWzBdO1xuICAgICAgICBkcmFnU3RhcnRZID0gY3Vyc29yUG9zWzFdO1xuICAgICAgICBzY3JvbGxTdGFydFggPSBtYXBDb250YWluZXIuc2Nyb2xsTGVmdCB8fCAwO1xuICAgICAgICBzY3JvbGxTdGFydFkgPSBtYXBDb250YWluZXIuc2Nyb2xsVG9wIHx8IDA7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEJhY2tncm91bmQgZHJhZyBzdGFydGVkJyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIGRyYWdCZy5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlbW92ZScsICgpID0+IHtcbiAgICAgICAgaWYgKCFpc0RyYWdnaW5nKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBjdXJzb3JQb3MgPSBHYW1lVUkuR2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgY29uc3QgZGVsdGFYID0gZHJhZ1N0YXJ0WCAtIGN1cnNvclBvc1swXTtcbiAgICAgICAgY29uc3QgZGVsdGFZID0gZHJhZ1N0YXJ0WSAtIGN1cnNvclBvc1sxXTtcbiAgICAgICAgbWFwQ29udGFpbmVyLlNjcm9sbFRvTGVmdE9mZnNldChzY3JvbGxTdGFydFggKyBkZWx0YVgsIGZhbHNlKTtcbiAgICAgICAgbWFwQ29udGFpbmVyLlNjcm9sbFRvVG9wT2Zmc2V0KHNjcm9sbFN0YXJ0WSArIGRlbHRhWSwgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICBkcmFnQmcuU2V0UGFuZWxFdmVudCgnb25tb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gQmFja2dyb3VuZCBkcmFnIGVuZGVkJyk7XG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgLy8gTm9kZXMgbGF5ZXJcbiAgICBjb25zdCBub2Rlc0xheWVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBtYXBDb250ZW50LCAnU3RhZ2VOb2Rlc0xheWVyJyk7XG4gICAgbm9kZXNMYXllci5BZGRDbGFzcygnc3RhZ2Vfbm9kZXNfbGF5ZXInKTtcbiAgICBub2Rlc0xheWVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIG5vZGVzTGF5ZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIC8vIOiKgueCueWxguacrOi6q+S4jeaLpuaIquS6i+S7tu+8jOS9huWtkOiKgueCue+8iOiKgueCueaMiemSru+8ieS8muaLpuaIqlxuICAgIC8vIFNldHVwIG1vdXNlIHdoZWVsIHNjcm9sbFxuICAgICQuU2NoZWR1bGUoMC4xLCAoKSA9PiBzZXR1cERyYWdTY3JvbGwobWFwQ29udGFpbmVyKSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb290ZXIocGFyZW50KSB7XG4gICAgY29uc3QgZm9vdGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdTdGFnZVNlbGVjdEZvb3RlcicpO1xuICAgIGZvb3Rlci5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2Zvb3RlcicpO1xuICAgIGZvb3Rlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBmb290ZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMHB4JztcbiAgICBmb290ZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBmb290ZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgZm9vdGVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICBmb290ZXIuc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICBmb290ZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC43KSc7XG4gICAgLy8gUHJvZ3Jlc3MgaW5kaWNhdG9yXG4gICAgY3JlYXRlUHJvZ3Jlc3NCYXIoZm9vdGVyKTtcbiAgICAvLyBTcGFjZXJcbiAgICBjb25zdCBzcGFjZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGZvb3RlciwgJ0Zvb3RlclNwYWNlcicpO1xuICAgIHNwYWNlci5zdHlsZS53aWR0aCA9ICcxMDBweCc7XG4gICAgLy8gU3RhcnQgYnV0dG9uXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBjcmVhdGVCdXR0b24oZm9vdGVyLCAnU3RhcnRTdGFnZUJ0bicsICflvIDlp4vmiJjmlpcnLCB0cnVlKTtcbiAgICBzdGFydEJ0bi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc2VsZWN0ZWROb2RlICYmIHNlbGVjdGVkTm9kZS5zdGF0dXMgPT09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgICBzdGFydFN0YWdlKHNlbGVjdGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBObyBhdmFpbGFibGUgc3RhZ2Ugc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkNhbmNlbCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQmFjayBidXR0b25cbiAgICBjb25zdCBiYWNrQnRuID0gY3JlYXRlQnV0dG9uKGZvb3RlciwgJ0JhY2tCdG4nLCAn6L+U5ZueJywgZmFsc2UpO1xuICAgIGJhY2tCdG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgaGlkZVN0YWdlU2VsZWN0KCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVCdXR0b24ocGFyZW50LCBpZCwgdGV4dCwgaXNQcmltYXJ5KSB7XG4gICAgY29uc3QgYnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgcGFyZW50LCBpZCk7XG4gICAgYnRuLkFkZENsYXNzKCdzdGFnZV9idG4nKTtcbiAgICBpZiAoaXNQcmltYXJ5KSB7XG4gICAgICAgIGJ0bi5BZGRDbGFzcygnc3RhZ2VfYnRuX3ByaW1hcnknKTtcbiAgICB9XG4gICAgYnRuLnN0eWxlLndpZHRoID0gJzE4MHB4JztcbiAgICBidG4uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgIGJ0bi5zdHlsZS5tYXJnaW5MZWZ0ID0gJzE1cHgnO1xuICAgIGJ0bi5zdHlsZS5tYXJnaW5SaWdodCA9ICcxNXB4JztcbiAgICBidG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gaXNQcmltYXJ5ID8gJ3JnYmEoMjE4LCAxNjUsIDMyLCAwLjkpJyA6ICdyZ2JhKDEzOSwgOTAsIDQzLCAwLjkpJztcbiAgICBidG4uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDIxOCwgMTY1LCAzMiwgMC43KSc7XG4gICAgYnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBidG4sIGAke2lkfV9MYWJlbGApO1xuICAgIGxhYmVsLnRleHQgPSB0ZXh0O1xuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gU1RBR0VfVEhFTUUuY29sb3JzLmdvbGQ7XG4gICAgbGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBsYWJlbC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBsYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBsYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbGFiZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbGFiZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICByZXR1cm4gYnRuO1xufVxuZnVuY3Rpb24gY3JlYXRlUHJvZ3Jlc3NCYXIocGFyZW50KSB7XG4gICAgY29uc3QgcHJvZ3Jlc3NDb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1N0YWdlUHJvZ3Jlc3MnKTtcbiAgICBwcm9ncmVzc0NvbnRhaW5lci5BZGRDbGFzcygnc3RhZ2VfcHJvZ3Jlc3MnKTtcbiAgICBwcm9ncmVzc0NvbnRhaW5lci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIHByb2dyZXNzQ29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCBwcm9ncmVzc0xhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBwcm9ncmVzc0NvbnRhaW5lciwgJ1Byb2dyZXNzTGFiZWwnKTtcbiAgICBwcm9ncmVzc0xhYmVsLnRleHQgPSAn6L+b5bqmOic7XG4gICAgcHJvZ3Jlc3NMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBwcm9ncmVzc0xhYmVsLnN0eWxlLmNvbG9yID0gU1RBR0VfVEhFTUUuY29sb3JzLnRleHQ7XG4gICAgcHJvZ3Jlc3NMYWJlbC5zdHlsZS5tYXJnaW5SaWdodCA9ICcxMHB4JztcbiAgICBwcm9ncmVzc0xhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCBwcm9ncmVzc0JnID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwcm9ncmVzc0NvbnRhaW5lciwgJ1Byb2dyZXNzQmFyQmcnKTtcbiAgICBwcm9ncmVzc0JnLkFkZENsYXNzKCdwcm9ncmVzc19iYXJfYmcnKTtcbiAgICBwcm9ncmVzc0JnLnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgICBwcm9ncmVzc0JnLnN0eWxlLmhlaWdodCA9ICcxNnB4JztcbiAgICBwcm9ncmVzc0JnLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDUwLCA0MCwgMzAsIDAuOCknO1xuICAgIHByb2dyZXNzQmcuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDEzOSwgOTAsIDQzLCAwLjYpJztcbiAgICBwcm9ncmVzc0JnLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIHByb2dyZXNzQmcuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnN0IHByb2dyZXNzRmlsbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcHJvZ3Jlc3NCZywgJ1Byb2dyZXNzQmFyRmlsbCcpO1xuICAgIHByb2dyZXNzRmlsbC5BZGRDbGFzcygncHJvZ3Jlc3NfYmFyX2ZpbGwnKTtcbiAgICBwcm9ncmVzc0ZpbGwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHByb2dyZXNzRmlsbC5zdHlsZS53aWR0aCA9ICcxMCUnO1xuICAgIHByb2dyZXNzRmlsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnMuZ29sZDtcbiAgICBwcm9ncmVzc0ZpbGwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzZweCc7XG4gICAgY29uc3QgcHJvZ3Jlc3NUZXh0ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBwcm9ncmVzc0NvbnRhaW5lciwgJ1Byb2dyZXNzVGV4dCcpO1xuICAgIHByb2dyZXNzVGV4dC5BZGRDbGFzcygncHJvZ3Jlc3NfdGV4dCcpO1xuICAgIHByb2dyZXNzVGV4dC50ZXh0ID0gJzEvMTAnO1xuICAgIHByb2dyZXNzVGV4dC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBwcm9ncmVzc1RleHQuc3R5bGUuY29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnMudGV4dDtcbiAgICBwcm9ncmVzc1RleHQuc3R5bGUubWFyZ2luTGVmdCA9ICcxNXB4JztcbiAgICBwcm9ncmVzc1RleHQuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTm9kZSBDcmVhdGlvbiAmIE1hbmFnZW1lbnRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZVN0YWdlTm9kZXMoZGF0YSkge1xuICAgIC8vIOWxgue6p++8mmNvbnRhaW5lclBhbmVsID4gU3RhZ2VNYXBDb250YWluZXIgPiBTdGFnZU1hcENvbnRlbnQgPiBTdGFnZU5vZGVzTGF5ZXJcbiAgICBjb25zdCBtYXBDb250YWluZXIgPSBjb250YWluZXJQYW5lbCA9PT0gbnVsbCB8fCBjb250YWluZXJQYW5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyUGFuZWwuRmluZENoaWxkKCdTdGFnZU1hcENvbnRhaW5lcicpO1xuICAgIGNvbnN0IG1hcENvbnRlbnQgPSBtYXBDb250YWluZXIgPT09IG51bGwgfHwgbWFwQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYXBDb250YWluZXIuRmluZENoaWxkKCdTdGFnZU1hcENvbnRlbnQnKTtcbiAgICBjb25zdCBub2Rlc0xheWVyID0gbWFwQ29udGVudCA9PT0gbnVsbCB8fCBtYXBDb250ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYXBDb250ZW50LkZpbmRDaGlsZCgnU3RhZ2VOb2Rlc0xheWVyJyk7XG4gICAgaWYgKCFub2Rlc0xheWVyKSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEVSUk9SOiBOb2RlcyBsYXllciBub3QgZm91bmQnKTtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ29udGFpbmVyOiAke2NvbnRhaW5lclBhbmVsID8gJ2V4aXN0cycgOiAnbnVsbCd9YCk7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIE1hcENvbnRhaW5lcjogJHttYXBDb250YWluZXIgPyAnZXhpc3RzJyA6ICdudWxsJ31gKTtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gTWFwQ29udGVudDogJHttYXBDb250ZW50ID8gJ2V4aXN0cycgOiAnbnVsbCd9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ3JlYXRpbmcgJHtkYXRhLm5vZGVzLmxlbmd0aH0gbm9kZXMuLi5gKTtcbiAgICAvLyBDbGVhciBleGlzdGluZyBub2Rlc1xuICAgIG5vZGVzTGF5ZXIuUmVtb3ZlQW5kRGVsZXRlQ2hpbGRyZW4oKTtcbiAgICAvLyBGaXJzdCBkcmF3IGNvbm5lY3Rpb25zXG4gICAgZHJhd0Nvbm5lY3Rpb25zKG5vZGVzTGF5ZXIsIGRhdGEubm9kZXMpO1xuICAgIC8vIFRoZW4gY3JlYXRlIG5vZGVzXG4gICAgZGF0YS5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBjcmVhdGVTdGFnZU5vZGUobm9kZXNMYXllciwgbm9kZSk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIHByb2dyZXNzXG4gICAgdXBkYXRlUHJvZ3Jlc3MoZGF0YSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTdGFnZU5vZGUocGFyZW50LCBub2RlKSB7XG4gICAgLy8g5qOA5p+l5piv5ZCm5bey5a2Y5Zyo6IqC54K577yM5aaC5p6c5a2Y5Zyo5YWI5Yig6ZmkXG4gICAgY29uc3QgZXhpc3RpbmdOb2RlID0gcGFyZW50LkZpbmRDaGlsZChgTm9kZV8ke25vZGUuaWR9YCk7XG4gICAgaWYgKGV4aXN0aW5nTm9kZSkge1xuICAgICAgICBleGlzdGluZ05vZGUuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgTm9kZV8ke25vZGUuaWR9YCk7XG4gICAgbm9kZVBhbmVsLkFkZENsYXNzKCdzdGFnZV9ub2RlJyk7XG4gICAgLy8g5riF6Zmk5omA5pyJ54q25oCB57G777yM54S25ZCO5re75Yqg5b2T5YmN54q25oCB57G7XG4gICAgbm9kZVBhbmVsLlJlbW92ZUNsYXNzKCdzdGFnZV9ub2RlX2xvY2tlZCcpO1xuICAgIG5vZGVQYW5lbC5SZW1vdmVDbGFzcygnc3RhZ2Vfbm9kZV9hdmFpbGFibGUnKTtcbiAgICBub2RlUGFuZWwuUmVtb3ZlQ2xhc3MoJ3N0YWdlX25vZGVfY3VycmVudCcpO1xuICAgIG5vZGVQYW5lbC5SZW1vdmVDbGFzcygnc3RhZ2Vfbm9kZV9jb21wbGV0ZWQnKTtcbiAgICBub2RlUGFuZWwuQWRkQ2xhc3MoYHN0YWdlX25vZGVfJHtub2RlLnN0YXR1c31gKTtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDliJvlu7roioLngrkgJHtub2RlLmlkfe+8jOeKtuaAgTogJHtub2RlLnN0YXR1c31gKTtcbiAgICAvLyBDYWxjdWxhdGUgcG9zaXRpb25cbiAgICBjb25zdCBtYXBXaWR0aCA9IDE4MDA7XG4gICAgY29uc3QgbWFwSGVpZ2h0ID0gNzAwO1xuICAgIGNvbnN0IG5vZGVYID0gKG5vZGUueCAvIDEwMCkgKiBtYXBXaWR0aCAtIFNUQUdFX1RIRU1FLm5vZGVTaXplIC8gMjtcbiAgICBjb25zdCBub2RlWSA9IChub2RlLnkgLyAxMDApICogbWFwSGVpZ2h0IC0gU1RBR0VfVEhFTUUubm9kZVNpemUgLyAyO1xuICAgIG5vZGVQYW5lbC5zdHlsZS53aWR0aCA9IGAke1NUQUdFX1RIRU1FLm5vZGVTaXplfXB4YDtcbiAgICBub2RlUGFuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7U1RBR0VfVEhFTUUubm9kZVNpemV9cHhgO1xuICAgIC8vIOS9v+eUqCBwb3NpdGlvbiDlsZ7mgKfov5vooYznu53lr7nlrprkvY1cbiAgICBub2RlUGFuZWwuc3R5bGUucG9zaXRpb24gPSBgJHtub2RlWH1weCAke25vZGVZfXB4IDBweGA7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ3JlYXRlZCBub2RlICR7bm9kZS5pZH0gYXQgKCR7bm9kZVh9LCAke25vZGVZfSlgKTtcbiAgICAvLyBOb2RlIGZyYW1lXG4gICAgY29uc3QgZnJhbWUgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIG5vZGVQYW5lbCwgYE5vZGVGcmFtZV8ke25vZGUuaWR9YCk7XG4gICAgZnJhbWUuQWRkQ2xhc3MoJ3N0YWdlX25vZGVfZnJhbWUnKTtcbiAgICBmcmFtZS5BZGRDbGFzcyhgc3RhZ2Vfbm9kZV9mcmFtZV8ke25vZGUudHlwZX1gKTtcbiAgICBmcmFtZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBmcmFtZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgZnJhbWUuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEycHgnO1xuICAgIGZyYW1lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDMwLCAyMCwgMTAsIDAuOSknO1xuICAgIC8vIEFwcGx5IHR5cGUtc3BlY2lmaWMgYm9yZGVyIGNvbG9yXG4gICAgY29uc3QgYm9yZGVyQ29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnNbbm9kZS50eXBlXTtcbiAgICBmcmFtZS5zdHlsZS5ib3JkZXIgPSBgM3B4IHNvbGlkICR7Ym9yZGVyQ29sb3J9YDtcbiAgICBmcmFtZS5zdHlsZS5ib3hTaGFkb3cgPSBgMHB4IDBweCAxNXB4ICR7Ym9yZGVyQ29sb3IucmVwbGFjZSgnMC44JywgJzAuNCcpLnJlcGxhY2UoJzAuOScsICcwLjUnKX1gO1xuICAgIC8vIE5vZGUgaWNvblxuICAgIGNvbnN0IGljb24gPSAkLkNyZWF0ZVBhbmVsKCdJbWFnZScsIGZyYW1lLCBgTm9kZUljb25fJHtub2RlLmlkfWApO1xuICAgIGljb24uQWRkQ2xhc3MoJ3N0YWdlX25vZGVfaWNvbicpO1xuICAgIGljb24uU2V0SW1hZ2UoTk9ERV9JQ09OU1tub2RlLnR5cGVdKTtcbiAgICBpY29uLnN0eWxlLndpZHRoID0gYCR7U1RBR0VfVEhFTUUuaWNvblNpemV9cHhgO1xuICAgIGljb24uc3R5bGUuaGVpZ2h0ID0gYCR7U1RBR0VfVEhFTUUuaWNvblNpemV9cHhgO1xuICAgIGljb24uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaWNvbi5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8gQXBwbHkgc3RhdHVzIGVmZmVjdHNcbiAgICBpZiAobm9kZS5zdGF0dXMgPT09ICdsb2NrZWQnKSB7XG4gICAgICAgIG5vZGVQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzAuNCc7XG4gICAgICAgIGZyYW1lLnN0eWxlLnNhdHVyYXRpb24gPSAnMCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUuc3RhdHVzID09PSAnY29tcGxldGVkJykge1xuICAgICAgICBub2RlUGFuZWwuc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnN0YXR1cyA9PT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgIC8vIEFkZCBwdWxzZSBhbmltYXRpb24gY2xhc3NcbiAgICAgICAgbm9kZVBhbmVsLkFkZENsYXNzKCdzdGFnZV9ub2RlX2N1cnJlbnQnKTtcbiAgICB9XG4gICAgLy8g6K6+572u6IqC54K55Y+v54K55Ye75oCnXG4gICAgaWYgKG5vZGUuc3RhdHVzID09PSAnYXZhaWxhYmxlJyB8fCBub2RlLnN0YXR1cyA9PT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgIC8vIOehruS/neiKgueCueWPr+S7peaOpeaUtueCueWHu+S6i+S7tlxuICAgICAgICBub2RlUGFuZWwuaGl0dGVzdCA9IHRydWU7XG4gICAgICAgIG5vZGVQYW5lbC5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgLy8g5Y2V5py65qih5byP77ya54K55Ye76IqC54K555u05o6l5byA5aeL77yM5LiN6ZyA6KaB5YaN54K5XCLlvIDlp4vmiJjmlpdcIuaMiemSrlxuICAgICAgICBub2RlUGFuZWwuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOiKgueCuSAke25vZGUuaWR9IOiiq+eCueWHu++8jOeKtuaAgTogJHtub2RlLnN0YXR1c31gKTtcbiAgICAgICAgICAgIHNlbGVjdE5vZGUobm9kZSk7XG4gICAgICAgICAgICAvLyDnm7TmjqXlvIDlp4vlhbPljaHvvIjljZXmnLrmqKHlvI/kvJjljJbvvIlcbiAgICAgICAgICAgIGlmIChub2RlLnN0YXR1cyA9PT0gJ2F2YWlsYWJsZScgfHwgbm9kZS5zdGF0dXMgPT09ICdjdXJyZW50Jykge1xuICAgICAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOWNleacuuaooeW8j++8mueCueWHu+iKgueCueebtOaOpeW8gOWni+WFs+WNoWApO1xuICAgICAgICAgICAgICAgIHN0YXJ0U3RhZ2Uobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDorablkYo6IOiKgueCueeKtuaAgeS4jeaYryBhdmFpbGFibGUg5oiWIGN1cnJlbnTvvIzml6Dms5XlvIDlp4tgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG5vZGVQYW5lbC5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgIHNob3dOb2RlVG9vbHRpcChub2RlUGFuZWwsIG5vZGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgbm9kZVBhbmVsLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICBoaWRlTm9kZVRvb2x0aXAoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyDplIHlrprmiJblt7LlrozmiJDnmoToioLngrnkuI3lj6/ngrnlh7tcbiAgICAgICAgbm9kZVBhbmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICAgICAgbm9kZVBhbmVsLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVQYW5lbDtcbn1cbmZ1bmN0aW9uIGRyYXdDb25uZWN0aW9ucyhwYXJlbnQsIG5vZGVzKSB7XG4gICAgLy8gQ3JlYXRlIGEgbGF5ZXIgZm9yIGNvbm5lY3Rpb25zXG4gICAgY29uc3QgY29ubmVjdGlvbnNMYXllciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQ29ubmVjdGlvbnNMYXllcicpO1xuICAgIGNvbm5lY3Rpb25zTGF5ZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29ubmVjdGlvbnNMYXllci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgbm9kZS5jb25uZWN0aW9ucy5mb3JFYWNoKHRhcmdldElkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSBub2Rlcy5maW5kKG4gPT4gbi5pZCA9PT0gdGFyZ2V0SWQpO1xuICAgICAgICAgICAgaWYgKHRhcmdldE5vZGUpIHtcbiAgICAgICAgICAgICAgICBkcmF3Q29ubmVjdGlvbihjb25uZWN0aW9uc0xheWVyLCBub2RlLCB0YXJnZXROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBkcmF3Q29ubmVjdGlvbihwYXJlbnQsIGZyb20sIHRvKSB7XG4gICAgY29uc3QgbWFwV2lkdGggPSAxODAwO1xuICAgIGNvbnN0IG1hcEhlaWdodCA9IDcwMDtcbiAgICBjb25zdCB4MSA9IChmcm9tLnggLyAxMDApICogbWFwV2lkdGg7XG4gICAgY29uc3QgeTEgPSAoZnJvbS55IC8gMTAwKSAqIG1hcEhlaWdodDtcbiAgICBjb25zdCB4MiA9ICh0by54IC8gMTAwKSAqIG1hcFdpZHRoO1xuICAgIGNvbnN0IHkyID0gKHRvLnkgLyAxMDApICogbWFwSGVpZ2h0O1xuICAgIC8vIENhbGN1bGF0ZSBsaW5lIHByb3BlcnRpZXNcbiAgICBjb25zdCBkeCA9IHgyIC0geDE7XG4gICAgY29uc3QgZHkgPSB5MiAtIHkxO1xuICAgIGNvbnN0IGxlbmd0aCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKGR5LCBkeCkgKiAoMTgwIC8gTWF0aC5QSSk7XG4gICAgY29uc3QgbGluZSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgQ29ubmVjdGlvbl8ke2Zyb20uaWR9XyR7dG8uaWR9YCk7XG4gICAgbGluZS5BZGRDbGFzcygnc3RhZ2VfY29ubmVjdGlvbicpO1xuICAgIC8vIERldGVybWluZSBpZiBjb25uZWN0aW9uIGlzIGFjdGl2ZVxuICAgIGNvbnN0IGlzQWN0aXZlID0gZnJvbS5zdGF0dXMgPT09ICdjb21wbGV0ZWQnIHx8IGZyb20uc3RhdHVzID09PSAnY3VycmVudCc7XG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgIGxpbmUuQWRkQ2xhc3MoJ3N0YWdlX2Nvbm5lY3Rpb25fYWN0aXZlJyk7XG4gICAgICAgIGxpbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjE4LCAxNjUsIDMyLCAwLjgpJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxpbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMTM5LCA5MCwgNDMsIDAuNCknO1xuICAgIH1cbiAgICBsaW5lLnN0eWxlLndpZHRoID0gYCR7bGVuZ3RofXB4YDtcbiAgICBsaW5lLnN0eWxlLmhlaWdodCA9ICc0cHgnO1xuICAgIC8vIOS9v+eUqCBwb3NpdGlvbiDlsZ7mgKfov5vooYznu53lr7nlrprkvY1cbiAgICBsaW5lLnN0eWxlLnBvc2l0aW9uID0gYCR7eDF9cHggJHt5MX1weCAwcHhgO1xuICAgIGxpbmUuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gJzAlIDUwJSc7XG4gICAgbGluZS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke2FuZ2xlfWRlZylgO1xuICAgIGxpbmUuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzJweCc7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTZWxlY3Rpb24gJiBJbnRlcmFjdGlvblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gc2VsZWN0Tm9kZShub2RlKSB7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gTm9kZSBzZWxlY3RlZDogJHtub2RlLm5hbWV9ICgke25vZGUudHlwZX0pYCk7XG4gICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiAgICAvLyBDbGVhciBwcmV2aW91cyBzZWxlY3Rpb25cbiAgICBpZiAoc2VsZWN0ZWROb2RlKSB7XG4gICAgICAgIGNvbnN0IHByZXZQYW5lbCA9IGNvbnRhaW5lclBhbmVsID09PSBudWxsIHx8IGNvbnRhaW5lclBhbmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250YWluZXJQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYE5vZGVfJHtzZWxlY3RlZE5vZGUuaWR9YCk7XG4gICAgICAgIGlmIChwcmV2UGFuZWwpIHtcbiAgICAgICAgICAgIHByZXZQYW5lbC5SZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RlZE5vZGUgPSBub2RlO1xuICAgIC8vIEhpZ2hsaWdodCBuZXcgc2VsZWN0aW9uXG4gICAgY29uc3Qgbm9kZVBhbmVsID0gY29udGFpbmVyUGFuZWwgPT09IG51bGwgfHwgY29udGFpbmVyUGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRhaW5lclBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgTm9kZV8ke25vZGUuaWR9YCk7XG4gICAgaWYgKG5vZGVQYW5lbCkge1xuICAgICAgICBub2RlUGFuZWwuQWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIG5vZGVQYW5lbC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgxLjIsIDEuMiwgMS4wKSc7XG4gICAgfVxuICAgIC8vIFVwZGF0ZSBzdGFydCBidXR0b25cbiAgICB1cGRhdGVTdGFydEJ1dHRvbigpO1xufVxuZnVuY3Rpb24gdXBkYXRlU3RhcnRCdXR0b24oKSB7XG4gICAgY29uc3Qgc3RhcnRCdG4gPSBjb250YWluZXJQYW5lbCA9PT0gbnVsbCB8fCBjb250YWluZXJQYW5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyUGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdTdGFydFN0YWdlQnRuJyk7XG4gICAgaWYgKCFzdGFydEJ0bilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChzZWxlY3RlZE5vZGUgJiYgc2VsZWN0ZWROb2RlLnN0YXR1cyA9PT0gJ2F2YWlsYWJsZScpIHtcbiAgICAgICAgc3RhcnRCdG4uUmVtb3ZlQ2xhc3MoJ3N0YWdlX2J0bl9kaXNhYmxlZCcpO1xuICAgICAgICBzdGFydEJ0bi5zdHlsZS5vcGFjaXR5ID0gJzEuMCc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdGFydEJ0bi5BZGRDbGFzcygnc3RhZ2VfYnRuX2Rpc2FibGVkJyk7XG4gICAgICAgIHN0YXJ0QnRuLnN0eWxlLm9wYWNpdHkgPSAnMC41JztcbiAgICB9XG59XG5mdW5jdGlvbiBzdGFydFN0YWdlKG5vZGUpIHtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSBTdGFydGluZyBzdGFnZTogJHtub2RlLm5hbWV9IChpZDogJHtub2RlLmlkfSlgKTtcbiAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5DYXN0QWJpbGl0eScpO1xuICAgIC8vIOS7juiKgueCuUlE5Lit5o+Q5Y+W5YWz5Y2h5pWw5a2X77yI5L6L5aaCIFwic3RhZ2VfMVwiIC0+IFwiMVwi77yJXG4gICAgY29uc3Qgc3RhZ2VJZE1hdGNoID0gbm9kZS5pZC5tYXRjaCgvXFxkKy8pO1xuICAgIGNvbnN0IHN0YWdlSWQgPSBzdGFnZUlkTWF0Y2ggPyBzdGFnZUlkTWF0Y2hbMF0gOiBub2RlLmlkO1xuICAgIGNvbnN0IGxvY2FsUGxheWVySWQgPSBQbGF5ZXJzLkdldExvY2FsUGxheWVyKCk7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gPT09PT09PT09PSDlj5HpgIHpgInlhbPkuovku7bliLDmnI3liqHnq68gPT09PT09PT09PWApO1xuICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOiKgueCuUlEOiAke25vZGUuaWR9YCk7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0g5o+Q5Y+W55qEIHN0YWdlSWQ6ICR7c3RhZ2VJZH1gKTtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDnjqnlrrZJRDogJHtsb2NhbFBsYXllcklkfWApO1xuICAgIC8vIOmqjOivgeaVsOaNrlxuICAgIGlmIChsb2NhbFBsYXllcklkID09PSAtMSB8fCBsb2NhbFBsYXllcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0g4p2MIOmUmeivrzog5peg5pWI55qE546p5a62SUQ6ICR7bG9jYWxQbGF5ZXJJZH1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXN0YWdlSWQpIHtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0g4p2MIOmUmeivrzog5peg5pWI55qE5YWz5Y2hSUQ6ICR7c3RhZ2VJZH1gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDlj5HpgIHlhbPljaHpgInmi6nkuovku7bliLDmnI3liqHnq69cbiAgICBjb25zdCBldmVudERhdGEgPSB7XG4gICAgICAgIHBsYXllcklkOiBsb2NhbFBsYXllcklkLFxuICAgICAgICBzdGFnZUlkOiBzdGFnZUlkLnRvU3RyaW5nKCkgLy8g56Gu5L+d5piv5a2X56ym5LiyXG4gICAgfTtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDkuovku7bmlbDmja46ICR7SlNPTi5zdHJpbmdpZnkoZXZlbnREYXRhKX1gKTtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDkuovku7blkI3np7A6IGF1dG9jaGVzc193YXZlX3NlbGVjdF9zdGFnZWApO1xuICAgIC8vIOWNleacuuaooeW8j+S8mOWMlu+8muebtOaOpeWPkemAgeS6i+S7tu+8jOa3u+WKoOmHjeivleacuuWItlxuICAgIGxldCByZXRyeUNvdW50ID0gMDtcbiAgICBjb25zdCBtYXhSZXRyaWVzID0gMztcbiAgICBmdW5jdGlvbiBzZW5kRXZlbnQoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDlsJ3or5Xlj5HpgIHkuovku7YgKOesrCAke3JldHJ5Q291bnQgKyAxfSDmrKEpLi4uYCk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcignYXV0b2NoZXNzX3dhdmVfc2VsZWN0X3N0YWdlJywgZXZlbnREYXRhKTtcbiAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOKchSDkuovku7blj5HpgIHmiJDlip8gKOWwneivlSAke3JldHJ5Q291bnQgKyAxfS8ke21heFJldHJpZXN9KWApO1xuICAgICAgICAgICAgLy8g6ZqQ6JeP6YCJ5YWz55WM6Z2iXG4gICAgICAgICAgICBoaWRlU3RhZ2VTZWxlY3QoKTtcbiAgICAgICAgICAgIC8vIOaYvuekuuWHhuWkh+S4reaPkOekulxuICAgICAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gU3RhZ2Ugc2VsZWN0ZWQsIHByZXBhcmluZy4uLmApO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmV0cnlDb3VudCsrO1xuICAgICAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0g4p2MIOS6i+S7tuWPkemAgeWksei0pSAo5bCd6K+VICR7cmV0cnlDb3VudH0vJHttYXhSZXRyaWVzfSk6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICBpZiAocmV0cnlDb3VudCA8IG1heFJldHJpZXMpIHtcbiAgICAgICAgICAgICAgICAvLyDlu7bov5/ph43or5XvvIjljZXmnLrmqKHlvI/kuIvlj6/og73pnIDopoHnrYnlvoXov57mjqXlu7rnq4vvvIlcbiAgICAgICAgICAgICAgICAkLlNjaGVkdWxlKDAuNSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZW5kRXZlbnQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOKdjCDkuovku7blj5HpgIHmnIDnu4jlpLHotKXvvIzlt7Lph43or5UgJHttYXhSZXRyaWVzfSDmrKFgKTtcbiAgICAgICAgICAgICAgICAvLyDljbPkvb/lpLHotKXkuZ/pmpDol4/nlYzpnaLvvIzpgb/lhY3ljaHkvY9cbiAgICAgICAgICAgICAgICBoaWRlU3RhZ2VTZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDnq4vljbPlj5HpgIFcbiAgICBzZW5kRXZlbnQoKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFRvb2x0aXBcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCB0b29sdGlwUGFuZWwgPSBudWxsO1xuZnVuY3Rpb24gc2hvd05vZGVUb29sdGlwKG5vZGVQYW5lbCwgbm9kZSkge1xuICAgIGhpZGVOb2RlVG9vbHRpcCgpO1xuICAgIHRvb2x0aXBQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyUGFuZWwsICdOb2RlVG9vbHRpcCcpO1xuICAgIHRvb2x0aXBQYW5lbC5BZGRDbGFzcygnc3RhZ2Vfbm9kZV90b29sdGlwJyk7XG4gICAgdG9vbHRpcFBhbmVsLnN0eWxlLnBhZGRpbmcgPSAnMTVweCc7XG4gICAgdG9vbHRpcFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDIwLCAxNSwgMTAsIDAuOTUpJztcbiAgICB0b29sdGlwUGFuZWwuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDEzOSwgOTAsIDQzLCAwLjcpJztcbiAgICB0b29sdGlwUGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIHRvb2x0aXBQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgdG9vbHRpcFBhbmVsLnN0eWxlLnpJbmRleCA9ICcxMDAnO1xuICAgIC8vIFBvc2l0aW9uIG5lYXIgbm9kZVxuICAgIHRvb2x0aXBQYW5lbC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7bm9kZVBhbmVsLmFjdHVhbHhvZmZzZXQgKyBTVEFHRV9USEVNRS5ub2RlU2l6ZSArIDEwfXB4YDtcbiAgICB0b29sdGlwUGFuZWwuc3R5bGUubWFyZ2luVG9wID0gYCR7bm9kZVBhbmVsLmFjdHVhbHlvZmZzZXR9cHhgO1xuICAgIC8vIFRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRvb2x0aXBQYW5lbCwgJ1Rvb2x0aXBUaXRsZScpO1xuICAgIHRpdGxlLkFkZENsYXNzKCd0b29sdGlwX3RpdGxlJyk7XG4gICAgdGl0bGUudGV4dCA9IG5vZGUubmFtZTtcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxOHB4JztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFNUQUdFX1RIRU1FLmNvbG9ycy5nb2xkO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgLy8gVHlwZSBpbmRpY2F0b3JcbiAgICBjb25zdCB0eXBlTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRvb2x0aXBQYW5lbCwgJ1Rvb2x0aXBUeXBlJyk7XG4gICAgdHlwZUxhYmVsLnRleHQgPSBnZXRUeXBlRGlzcGxheU5hbWUobm9kZS50eXBlKTtcbiAgICB0eXBlTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgdHlwZUxhYmVsLnN0eWxlLmNvbG9yID0gU1RBR0VfVEhFTUUuY29sb3JzW25vZGUudHlwZV07XG4gICAgdHlwZUxhYmVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgIC8vIERlc2NyaXB0aW9uXG4gICAgY29uc3QgZGVzYyA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdG9vbHRpcFBhbmVsLCAnVG9vbHRpcERlc2MnKTtcbiAgICBkZXNjLkFkZENsYXNzKCd0b29sdGlwX2Rlc2MnKTtcbiAgICBkZXNjLnRleHQgPSBub2RlLmRlc2NyaXB0aW9uO1xuICAgIGRlc2Muc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgZGVzYy5zdHlsZS5jb2xvciA9ICcjZDRhZjM3JztcbiAgICBkZXNjLnN0eWxlLm9wYWNpdHkgPSAnMC45JztcbiAgICBkZXNjLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICAvLyBSZXdhcmRzXG4gICAgY29uc3QgcmV3YXJkcyA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdG9vbHRpcFBhbmVsLCAnVG9vbHRpcFJld2FyZHMnKTtcbiAgICByZXdhcmRzLkFkZENsYXNzKCd0b29sdGlwX3Jld2FyZHMnKTtcbiAgICByZXdhcmRzLnRleHQgPSBg5aWW5YqxOiAke25vZGUucmV3YXJkc31gO1xuICAgIHJld2FyZHMuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgcmV3YXJkcy5zdHlsZS5jb2xvciA9ICcjMzJjZDMyJztcbn1cbmZ1bmN0aW9uIGhpZGVOb2RlVG9vbHRpcCgpIHtcbiAgICBpZiAodG9vbHRpcFBhbmVsKSB7XG4gICAgICAgIHRvb2x0aXBQYW5lbC5EZWxldGVBc3luYygwKTtcbiAgICAgICAgdG9vbHRpcFBhbmVsID0gbnVsbDtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRUeXBlRGlzcGxheU5hbWUodHlwZSkge1xuICAgIGNvbnN0IG5hbWVzID0ge1xuICAgICAgICBub3JtYWw6ICfmma7pgJrlhbPljaEnLFxuICAgICAgICBoYXJkOiAn5Zuw6Zq+5YWz5Y2hJyxcbiAgICAgICAgYm9zczogJ0Jvc3PlhbPljaEnLFxuICAgICAgICBldmVudDogJ+S6i+S7tuiKgueCuSdcbiAgICB9O1xuICAgIHJldHVybiBuYW1lc1t0eXBlXTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFByb2dyZXNzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyhkYXRhKSB7XG4gICAgY29uc3QgcHJvZ3Jlc3NGaWxsID0gY29udGFpbmVyUGFuZWwgPT09IG51bGwgfHwgY29udGFpbmVyUGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRhaW5lclBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUHJvZ3Jlc3NCYXJGaWxsJyk7XG4gICAgY29uc3QgcHJvZ3Jlc3NUZXh0ID0gY29udGFpbmVyUGFuZWwgPT09IG51bGwgfHwgY29udGFpbmVyUGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRhaW5lclBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUHJvZ3Jlc3NUZXh0Jyk7XG4gICAgaWYgKHByb2dyZXNzRmlsbCAmJiBwcm9ncmVzc1RleHQpIHtcbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChkYXRhLmN1cnJlbnRTdGFnZSAvIGRhdGEubWF4U3RhZ2VzKSAqIDEwMDtcbiAgICAgICAgcHJvZ3Jlc3NGaWxsLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudGFnZX0lYDtcbiAgICAgICAgcHJvZ3Jlc3NUZXh0LnRleHQgPSBgJHtkYXRhLmN1cnJlbnRTdGFnZX0vJHtkYXRhLm1heFN0YWdlc31gO1xuICAgIH1cbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFNob3cvSGlkZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gc2hvd1N0YWdlU2VsZWN0KHN0YWdlRGF0YSkge1xuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIFNob3dpbmcgc3RhZ2Ugc2VsZWN0aW9uIFVJJyk7XG4gICAgaWYgKCFjb250YWluZXJQYW5lbCkge1xuICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBFUlJPUjogQ29udGFpbmVyIG5vdCBpbml0aWFsaXplZCwgcmVpbml0aWFsaXppbmcuLi4nKTtcbiAgICAgICAgaW5pdFN0YWdlU2VsZWN0KCk7XG4gICAgICAgIGlmICghY29udGFpbmVyUGFuZWwpIHtcbiAgICAgICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEVSUk9SOiBGYWlsZWQgdG8gaW5pdGlhbGl6ZSBjb250YWluZXInKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDlpoLmnpzmj5DkvpvkuobmlrDmlbDmja7vvIzkvb/nlKjmlrDmlbDmja7vvJvlkKbliJnkvb/nlKjnjrDmnInmlbDmja7miJbpu5jorqTmlbDmja5cbiAgICBpZiAoc3RhZ2VEYXRhKSB7XG4gICAgICAgIGN1cnJlbnRTdGFnZURhdGEgPSBzdGFnZURhdGE7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOS9v+eUqOaPkOS+m+eahOaWsOaVsOaNrmApO1xuICAgIH1cbiAgICBlbHNlIGlmICghY3VycmVudFN0YWdlRGF0YSkge1xuICAgICAgICBjdXJyZW50U3RhZ2VEYXRhID0gZ2V0TW9ja1N0YWdlRGF0YSgpO1xuICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDkvb/nlKjpu5jorqTmlbDmja5gKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOS9v+eUqOeOsOacieaVsOaNrmApO1xuICAgIH1cbiAgICAvLyDovpPlh7rlvZPliY3oioLngrnnirbmgIHnlKjkuo7osIPor5VcbiAgICBpZiAoY3VycmVudFN0YWdlRGF0YSAmJiBjdXJyZW50U3RhZ2VEYXRhLm5vZGVzKSB7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOW9k+WJjeiKgueCueeKtuaAgTpgKTtcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIGN1cnJlbnRTdGFnZURhdGEubm9kZXMpIHtcbiAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdICAgLSAke25vZGUuaWR9OiAke25vZGUuc3RhdHVzfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOehruS/neS9v+eUqOacgOaWsOeahOiKgueCueaVsOaNrumHjeaWsOWIm+W7uuiKgueCuVxuICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOS9v+eUqOW9k+WJjeaVsOaNruWIm+W7uuiKgueCue+8jOiKgueCueaVsOmHjzogJHtjdXJyZW50U3RhZ2VEYXRhLm5vZGVzLmxlbmd0aH1gKTtcbiAgICBjcmVhdGVTdGFnZU5vZGVzKGN1cnJlbnRTdGFnZURhdGEpO1xuICAgIC8vIFNob3cgY29udGFpbmVyIC0g56Gu5L+d5omA5pyJ5qC35byP5q2j56GuXG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzEuMCc7XG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUuekluZGV4ID0gJzkwMDAnO1xuICAgIGlzVmlzaWJsZSA9IHRydWU7XG4gICAgLy8gUGxheSBzb3VuZFxuICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ29udGFpbmVyIHZpc2liaWxpdHk6ICR7Y29udGFpbmVyUGFuZWwuc3R5bGUudmlzaWJpbGl0eX1gKTtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSBDb250YWluZXIgekluZGV4OiAke2NvbnRhaW5lclBhbmVsLnN0eWxlLnpJbmRleH1gKTtcbiAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBTdGFnZSBzZWxlY3Rpb24gVUkgaXMgbm93IHZpc2libGUnKTtcbn1cbmZ1bmN0aW9uIGhpZGVTdGFnZVNlbGVjdCgpIHtcbiAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBIaWRpbmcgc3RhZ2Ugc2VsZWN0aW9uIFVJJyk7XG4gICAgaWYgKCFjb250YWluZXJQYW5lbClcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgIGlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIHNlbGVjdGVkTm9kZSA9IG51bGw7XG4gICAgaGlkZU5vZGVUb29sdGlwKCk7XG4gICAgLy8gTm90aWZ5IHNlcnZlclxuICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdzdGFnZV9zZWxlY3RfY2xvc2VkJywge30pO1xufVxuZnVuY3Rpb24gdG9nZ2xlU3RhZ2VTZWxlY3QoKSB7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICBoaWRlU3RhZ2VTZWxlY3QoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNob3dTdGFnZVNlbGVjdCgpO1xuICAgIH1cbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIERyYWcgU2Nyb2xsIEZ1bmN0aW9uYWxpdHlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIHNldHVwRHJhZ1Njcm9sbChtYXBDb250YWluZXIpIHtcbiAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBTZXR0aW5nIHVwIG1vdXNlIHdoZWVsIGhvcml6b250YWwgc2Nyb2xsLi4uJyk7XG4gICAgLy8g5L2/55So6byg5qCH5rua6L2u6L+b6KGM5rC05bmz5rua5Yqo77yIU2hpZnQr5rua6L2u77yJXG4gICAgbWFwQ29udGFpbmVyLlNldFBhbmVsRXZlbnQoJ29ubW91c2V3aGVlbHVwJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50U2Nyb2xsID0gbWFwQ29udGFpbmVyLnNjcm9sbExlZnQgfHwgMDtcbiAgICAgICAgbWFwQ29udGFpbmVyLlNjcm9sbFRvTGVmdE9mZnNldChNYXRoLm1heCgwLCBjdXJyZW50U2Nyb2xsIC0gMTAwKSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIG1hcENvbnRhaW5lci5TZXRQYW5lbEV2ZW50KCdvbm1vdXNld2hlZWxkb3duJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50U2Nyb2xsID0gbWFwQ29udGFpbmVyLnNjcm9sbExlZnQgfHwgMDtcbiAgICAgICAgbWFwQ29udGFpbmVyLlNjcm9sbFRvTGVmdE9mZnNldChjdXJyZW50U2Nyb2xsICsgMTAwLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gTW91c2Ugd2hlZWwgc2Nyb2xsIHNldHVwIGNvbXBsZXRlJyk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBFdmVudCBIYW5kbGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gUmVnaXN0ZXJpbmcgZXZlbnQgaGFuZGxlcnMuLi4nKTtcbiAgICAvLyDlj6rkvb/nlKggR2FtZUV2ZW50c++8jOS4jeS9v+eUqCBSZWdpc3RlckV2ZW50SGFuZGxlclxuICAgIC8vIFJlZ2lzdGVyRXZlbnRIYW5kbGVyIOWPquaUr+aMgeWGhee9ruS6i+S7tuexu+Wei++8jOiHquWumuS5ieS6i+S7tuS8muaKpemUmVxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdvcGVuX3N0YWdlX3NlbGVjdCcsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKchSBSZWNlaXZlZCBvcGVuX3N0YWdlX3NlbGVjdCBldmVudCcpO1xuICAgICAgICBzaG93U3RhZ2VTZWxlY3QoZGF0YSk7XG4gICAgfSk7XG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2Nsb3NlX3N0YWdlX3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gUmVjZWl2ZWQgY2xvc2Vfc3RhZ2Vfc2VsZWN0IGV2ZW50Jyk7XG4gICAgICAgIGhpZGVTdGFnZVNlbGVjdCgpO1xuICAgIH0pO1xuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCd1cGRhdGVfc3RhZ2VfZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdID09PT09PT09PT0g5pS25Yiw5YWz5Y2h54q25oCB5pu05pawID09PT09PT09PT0nKTtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0g5pWw5o2u5a+56LGh6ZSuOiAke09iamVjdC5rZXlzKGRhdGEpLmpvaW4oJywgJyl9YCk7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIGRhdGEubm9kZXMg57G75Z6LOiAke3R5cGVvZiBkYXRhLm5vZGVzfSwg5piv5pWw57uEOiAke0FycmF5LmlzQXJyYXkoZGF0YS5ub2Rlcyl9YCk7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIGRhdGEuY29tcGxldGVkU3RhZ2VzIOexu+WeizogJHt0eXBlb2YgZGF0YS5jb21wbGV0ZWRTdGFnZXN9LCDmmK/mlbDnu4Q6ICR7QXJyYXkuaXNBcnJheShkYXRhLmNvbXBsZXRlZFN0YWdlcyl9YCk7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIGRhdGEuYXZhaWxhYmxlU3RhZ2VzIOexu+WeizogJHt0eXBlb2YgZGF0YS5hdmFpbGFibGVTdGFnZXN9LCDmmK/mlbDnu4Q6ICR7QXJyYXkuaXNBcnJheShkYXRhLmF2YWlsYWJsZVN0YWdlcyl9YCk7XG4gICAgICAgIC8vIPCflKcg5L+u5aSN77ya5bCGIEx1YSDooajvvIjlr7nosaHvvInovazmjaLkuLogSmF2YVNjcmlwdCDmlbDnu4RcbiAgICAgICAgY29uc3QgY29udmVydFRvQXJyYXkgPSAob2JqKSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmogIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAvLyBMdWEg6KGo5Lya6KKr5bqP5YiX5YyW5Li65a+56LGh77yM6ZyA6KaB5omL5Yqo6L2s5o2iXG4gICAgICAgICAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2gob2JqW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIPCflKcg6L2s5o2i5a+56LGh5Li65pWw57uE77yM6ZW/5bqmOiAke2Fyci5sZW5ndGh9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8g6L2s5o2iIG5vZGVzXG4gICAgICAgIGNvbnN0IG5vZGVzQXJyYXkgPSBjb252ZXJ0VG9BcnJheShkYXRhLm5vZGVzKTtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gbm9kZXMg6L2s5o2i5ZCO5pWw57uE6ZW/5bqmOiAke25vZGVzQXJyYXkubGVuZ3RofWApO1xuICAgICAgICAvLyDovazmjaIgY29tcGxldGVkU3RhZ2VzXG4gICAgICAgIGNvbnN0IGNvbXBsZXRlZEFycmF5ID0gY29udmVydFRvQXJyYXkoZGF0YS5jb21wbGV0ZWRTdGFnZXMpO1xuICAgICAgICBjb25zdCBjb21wbGV0ZWRTdGFnZXNTdHIgPSBjb21wbGV0ZWRBcnJheS5sZW5ndGggPiAwID8gY29tcGxldGVkQXJyYXkuam9pbignLCAnKSA6ICfml6AnO1xuICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDlt7LlrozmiJDlhbPljaE6ICR7Y29tcGxldGVkU3RhZ2VzU3RyfWApO1xuICAgICAgICAvLyDovazmjaIgYXZhaWxhYmxlU3RhZ2VzXG4gICAgICAgIGNvbnN0IGF2YWlsYWJsZUFycmF5ID0gY29udmVydFRvQXJyYXkoZGF0YS5hdmFpbGFibGVTdGFnZXMpO1xuICAgICAgICBjb25zdCBhdmFpbGFibGVTdGFnZXNTdHIgPSBhdmFpbGFibGVBcnJheS5sZW5ndGggPiAwID8gYXZhaWxhYmxlQXJyYXkuam9pbignLCAnKSA6ICfml6AnO1xuICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDlj6/nlKjlhbPljaE6ICR7YXZhaWxhYmxlU3RhZ2VzU3RyfWApO1xuICAgICAgICAvLyDmm7TmlrDoioLngrnnirbmgIFcbiAgICAgICAgaWYgKG5vZGVzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gbm9kZXMg5pWw57uE6ZW/5bqmOiAke25vZGVzQXJyYXkubGVuZ3RofWApO1xuICAgICAgICAgICAgLy8g56Gu5L+dIGN1cnJlbnRTdGFnZURhdGEg5a2Y5ZyoXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRTdGFnZURhdGEpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U3RhZ2VEYXRhID0gZ2V0TW9ja1N0YWdlRGF0YSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5pu05paw6IqC54K554q25oCBXG4gICAgICAgICAgICBpZiAoY3VycmVudFN0YWdlRGF0YS5ub2Rlcykge1xuICAgICAgICAgICAgICAgIGxldCB1cGRhdGVkQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdXBkYXRlTm9kZSBvZiBub2Rlc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTm9kZSA9IGN1cnJlbnRTdGFnZURhdGEubm9kZXMuZmluZChuID0+IG4uaWQgPT09IHVwZGF0ZU5vZGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdOb2RlICYmIHVwZGF0ZU5vZGUuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRTdGF0dXMgPSBleGlzdGluZ05vZGUuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdOb2RlLnN0YXR1cyA9IHVwZGF0ZU5vZGUuc3RhdHVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDmm7TmlrDoioLngrkgJHt1cGRhdGVOb2RlLmlkfSDnirbmgIE6ICR7b2xkU3RhdHVzfSAtPiAke3VwZGF0ZU5vZGUuc3RhdHVzfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFleGlzdGluZ05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOitpuWRijog6IqC54K5ICR7dXBkYXRlTm9kZS5pZH0g5LiN5a2Y5Zyo5LqO5b2T5YmN5pWw5o2u5LitYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXVwZGF0ZU5vZGUuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDorablkYo6IOiKgueCuSAke3VwZGF0ZU5vZGUuaWR9IOayoeacieeKtuaAgeS/oeaBr2ApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOWFseabtOaWsOS6hiAke3VwZGF0ZWRDb3VudH0g5Liq6IqC54K555qE54q25oCBYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSDorablkYo6IGN1cnJlbnRTdGFnZURhdGEubm9kZXMg5LiN5a2Y5ZyoYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmm7TmlrDov5vluqZcbiAgICAgICAgICAgIGlmIChkYXRhLmN1cnJlbnRTdGFnZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlRGF0YS5jdXJyZW50U3RhZ2UgPSBkYXRhLmN1cnJlbnRTdGFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkYXRhLm1heFN0YWdlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFN0YWdlRGF0YS5tYXhTdGFnZXMgPSBkYXRhLm1heFN0YWdlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWmguaenOeVjOmdouWPr+inge+8jOeri+WNs+mHjeaWsOWIm+W7uuaJgOacieiKgueCueS7peW6lOeUqOaWsOeKtuaAgVxuICAgICAgICAgICAgaWYgKGlzVmlzaWJsZSAmJiBjdXJyZW50U3RhZ2VEYXRhKSB7XG4gICAgICAgICAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0g55WM6Z2i5Y+v6KeB77yM56uL5Y2z6YeN5paw5Yib5bu66IqC54K55Lul5bqU55So5paw54q25oCBLi4uYCk7XG4gICAgICAgICAgICAgICAgY3JlYXRlU3RhZ2VOb2RlcyhjdXJyZW50U3RhZ2VEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOeVjOmdouS4jeWPr+inge+8jOW3suabtOaWsOaVsOaNru+8jOS4i+asoeaJk+W8gOaXtuS8muaYvuekuuaWsOeKtuaAgWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0g4p2MIOitpuWRijog5pS25Yiw5pu05paw5L2GIG5vZGVzIOaVsOaNruaXoOaViGApO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ29wZW5fbGV2ZWxfc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSDinIUgUmVjZWl2ZWQgb3Blbl9sZXZlbF9zZWxlY3Rpb24gZXZlbnQnKTtcbiAgICAgICAgLy8g6K+35rGC5pyA5paw55qE5YWz5Y2h54q25oCB77yI6YCa6L+H5pi+56S655WM6Z2i6Kem5Y+R5pyN5Yqh56uv5Y+R6YCB5pu05paw77yJXG4gICAgICAgIHNob3dTdGFnZVNlbGVjdCgpO1xuICAgICAgICAvLyDlpoLmnpznlYzpnaLlt7LmiZPlvIDvvIzmnI3liqHnq6/lupTor6XkvJrlj5HpgIEgdXBkYXRlX3N0YWdlX2RhdGEg5LqL5Lu2XG4gICAgfSk7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0g4pyFIEV2ZW50IGhhbmRsZXJzIHJlZ2lzdGVyZWQnKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEdsb2JhbCBBUElcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGV4cG9zZUdsb2JhbEFQSSgpIHtcbiAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBFeHBvc2luZyBnbG9iYWwgQVBJLi4uJyk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3QgPSB7XG4gICAgICAgIHNob3c6IHNob3dTdGFnZVNlbGVjdCxcbiAgICAgICAgaGlkZTogaGlkZVN0YWdlU2VsZWN0LFxuICAgICAgICB0b2dnbGU6IHRvZ2dsZVN0YWdlU2VsZWN0LFxuICAgICAgICBpc1Zpc2libGU6ICgpID0+IGlzVmlzaWJsZSxcbiAgICAgICAgZ2V0U2VsZWN0ZWROb2RlOiAoKSA9PiBzZWxlY3RlZE5vZGUsXG4gICAgICAgIHRlc3Q6ICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIFRlc3QgZnVuY3Rpb24gY2FsbGVkJyk7XG4gICAgICAgICAgICBzaG93U3RhZ2VTZWxlY3QoKTtcbiAgICAgICAgICAgIHJldHVybiAnU3RhZ2UgU2VsZWN0IFVJIHNob3duJztcbiAgICAgICAgfVxuICAgIH07XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0g4pyFIEdsb2JhbCBBUEkgZXhwb3NlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSBWZXJpZnk6IGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3QgPSAkeyEhZ2xvYmFsVGhpcy5TdGFnZVNlbGVjdH1gKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEluaXRpYWxpemF0aW9uXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4kLk1zZygnW1N0YWdlU2VsZWN0XSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4kLk1zZygnW1N0YWdlU2VsZWN0XSBTdGFnZSBTZWxlY3Rpb24gVUkgTG9hZGluZy4uLicpO1xuJC5Nc2coJ1tTdGFnZVNlbGVjdF0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuLy8g56uL5Y2z5Yid5aeL5YyWXG5pbml0U3RhZ2VTZWxlY3QoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==