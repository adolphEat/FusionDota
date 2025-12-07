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
// ============================================================================
// Mock Data (for testing)
// ============================================================================
function getMockStageData() {
    return {
        currentStage: 1,
        maxStages: 10,
        nodes: [
            // Row 1 - Starting area (y: 25-65, 中心45，在屏幕中间)
            { id: 'n1', name: '起始点', type: 'normal', status: 'completed', x: 10, y: 45, description: '旅程的起点', rewards: '无', icon: '', connections: ['n2', 'n3'] },
            // Row 2
            { id: 'n2', name: '森林小径', type: 'normal', status: 'available', x: 25, y: 30, description: '穿越茂密的森林', rewards: '金币 +50', icon: '', connections: ['n4', 'n5'] },
            { id: 'n3', name: '危险矿洞', type: 'hard', status: 'available', x: 25, y: 60, description: '充满危险的矿洞', rewards: '稀有装备', icon: '', connections: ['n5', 'n6'] },
            // Row 3
            { id: 'n4', name: '神秘商人', type: 'event', status: 'locked', x: 40, y: 20, description: '遇到神秘的商人', rewards: '特殊物品', icon: '', connections: ['n7'] },
            { id: 'n5', name: '野兽巢穴', type: 'normal', status: 'locked', x: 40, y: 45, description: '野兽的栖息地', rewards: '经验 +100', icon: '', connections: ['n7', 'n8'] },
            { id: 'n6', name: '精英守卫', type: 'hard', status: 'locked', x: 40, y: 70, description: '强力的精英怪物', rewards: '史诗装备', icon: '', connections: ['n8'] },
            // Row 4
            { id: 'n7', name: '休息营地', type: 'event', status: 'locked', x: 55, y: 28, description: '可以恢复和升级', rewards: '恢复生命', icon: '', connections: ['n9'] },
            { id: 'n8', name: '古老遗迹', type: 'normal', status: 'locked', x: 55, y: 58, description: '探索古老的遗迹', rewards: '金币 +100', icon: '', connections: ['n9', 'n10'] },
            // Row 5 - Pre-boss
            { id: 'n9', name: '黑暗前厅', type: 'hard', status: 'locked', x: 70, y: 40, description: 'Boss前的最后挑战', rewards: '大量经验', icon: '', connections: ['n10'] },
            // Boss
            { id: 'n10', name: '远古巨龙', type: 'boss', status: 'locked', x: 88, y: 40, description: '本章节最终Boss', rewards: '传说装备', icon: '', connections: [] }
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
    // Map content with background
    const mapContent = $.CreatePanel('Panel', mapContainer, 'StageMapContent');
    mapContent.AddClass('stage_map_content');
    mapContent.style.width = '1200px';
    mapContent.style.height = '700px';
    mapContent.style.horizontalAlign = 'center';
    mapContent.style.verticalAlign = 'center';
    mapContent.style.backgroundColor = 'rgba(20, 15, 10, 0.6)';
    mapContent.style.borderRadius = '20px';
    mapContent.style.border = '3px solid rgba(139, 90, 43, 0.5)';
    // Nodes layer
    const nodesLayer = $.CreatePanel('Panel', mapContent, 'StageNodesLayer');
    nodesLayer.AddClass('stage_nodes_layer');
    nodesLayer.style.width = '100%';
    nodesLayer.style.height = '100%';
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
    const nodePanel = $.CreatePanel('Panel', parent, `Node_${node.id}`);
    nodePanel.AddClass('stage_node');
    nodePanel.AddClass(`stage_node_${node.status}`);
    // Calculate position
    const mapWidth = 1200;
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
    // Click handler
    if (node.status === 'available' || node.status === 'current') {
        nodePanel.SetPanelEvent('onactivate', () => {
            selectNode(node);
        });
        nodePanel.SetPanelEvent('onmouseover', () => {
            showNodeTooltip(nodePanel, node);
        });
        nodePanel.SetPanelEvent('onmouseout', () => {
            hideNodeTooltip();
        });
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
    const mapWidth = 1200;
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
    $.Msg(`[StageSelect] Sending stage selection to server: stageId=${stageId}`);
    // 发送关卡选择事件到服务端
    GameEvents.SendCustomGameEventToServer('autochess_wave_select_stage', {
        playerId: Players.GetLocalPlayer(),
        stageId: stageId
    });
    // Hide selection UI
    hideStageSelect();
    // 显示准备中提示
    $.Msg(`[StageSelect] Stage selected, preparing...`);
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
    currentStageData = stageData || getMockStageData();
    // Create nodes
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
        $.Msg('[StageSelect] Received stage data update');
        if (isVisible && currentStageData) {
            currentStageData = data;
            createStageNodes(currentStageData);
        }
    });
    GameEvents.Subscribe('open_level_selection', () => {
        $.Msg('[StageSelect] ✅ Received open_level_selection event');
        showStageSelect();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsQ0FBQztBQUNELENBQUM7QUFDRCxDQUFDO0FBQ0Q7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xcc3RhZ2VzZWxlY3RcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIEB0cy1ub2NoZWNrXG4vKipcbiAqIFN0YWdlIFNlbGVjdGlvbiBVSVxuICogUm9ndWVsaWtlIHN0eWxlIG1hcCBzZWxlY3Rpb24gaW50ZXJmYWNlXG4gKlxuICogRmVhdHVyZXM6XG4gKiAtIE1hcCB3aXRoIG11bHRpcGxlIHN0YWdlIG5vZGVzXG4gKiAtIERpZmZlcmVudCBub2RlIHR5cGVzOiBub3JtYWwsIGhhcmQsIGJvc3MsIGV2ZW50XG4gKiAtIFBhdGggY29ubmVjdGlvbnMgYmV0d2VlbiBub2Rlc1xuICogLSBQcm9ncmVzcyB0cmFja2luZ1xuICovXG4vLyDnq4vljbPmiafooYzml6Xlv5dcbiQuTXNnKCfwn5e677iPIFN0YWdlU2VsZWN0IHNjcmlwdCBmaWxlIGlzIGV4ZWN1dGluZyEnKTtcbkdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4vLyDnq4vljbPmmrTpnLLlhajlsYBBUEnvvIjnoa7kv53ljbPkvb/liJ3lp4vljJblpLHotKXkuZ/og73orr/pl67vvIlcbmdsb2JhbFRoaXMuU3RhZ2VTZWxlY3QgPSB7XG4gICAgc2hvdzogKCkgPT4gJC5Nc2coJ1tTdGFnZVNlbGVjdF0gRWFybHkgQVBJOiBzaG93IGNhbGxlZCBiZWZvcmUgaW5pdCcpLFxuICAgIHRlc3Q6ICgpID0+ICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEVhcmx5IEFQSTogdGVzdCBjYWxsZWQgYmVmb3JlIGluaXQnKVxufTtcbiQuTXNnKCdbU3RhZ2VTZWxlY3RdIEVhcmx5IGdsb2JhbCBBUEkgZXhwb3NlZCcpO1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ29uc3RhbnRzICYgVGhlbWVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmNvbnN0IFNUQUdFX1RIRU1FID0ge1xuICAgIGNvbG9yczoge1xuICAgICAgICBub3JtYWw6ICdyZ2JhKDEwMCwgMTQ5LCAyMzcsIDAuOCknLFxuICAgICAgICBoYXJkOiAncmdiYSgyMjAsIDIwLCA2MCwgMC44KScsXG4gICAgICAgIGJvc3M6ICdyZ2JhKDI1NSwgMjE1LCAwLCAwLjkpJyxcbiAgICAgICAgZXZlbnQ6ICdyZ2JhKDUwLCAyMDUsIDUwLCAwLjgpJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjYsIDI2LCA0NiwgMC45NSknLFxuICAgICAgICBnb2xkOiAnI2ZmZDcwMCcsXG4gICAgICAgIHRleHQ6ICcjZDRhZjM3J1xuICAgIH0sXG4gICAgbm9kZVNpemU6IDkwLFxuICAgIGljb25TaXplOiA3MFxufTtcbmNvbnN0IE5PREVfSUNPTlMgPSB7XG4gICAgbm9ybWFsOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL25vZGUvbm9ybWFsTm9kZS5wbmcnLFxuICAgIGhhcmQ6ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvbm9kZS9oYXJkTm9kZS5wbmcnLFxuICAgIGJvc3M6ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvbm9kZS9ib3NzTm9kZS5wbmcnLFxuICAgIGV2ZW50OiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL25vZGUvZXZlbnROb2RlLnBuZydcbn07XG5jb25zdCBTVEFHRV9CQUNLR1JPVU5EUyA9IFtcbiAgICAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2JnL3Nob3djYXNlX2JnX2ZpZWxkXzAwMV9wbmcucG5nJyxcbiAgICAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2JnL2JnMS5wbmcnLFxuICAgICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvYmcvYmcyLnBuZycsXG4gICAgJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9iZy9iZzMucG5nJ1xuXTtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFN0YXRlIE1hbmFnZW1lbnRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmxldCByb290UGFuZWwgPSBudWxsO1xubGV0IGNvbnRhaW5lclBhbmVsID0gbnVsbDtcbmxldCBzZWxlY3RlZE5vZGUgPSBudWxsO1xubGV0IGN1cnJlbnRTdGFnZURhdGEgPSBudWxsO1xubGV0IGlzVmlzaWJsZSA9IGZhbHNlO1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTW9jayBEYXRhIChmb3IgdGVzdGluZylcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGdldE1vY2tTdGFnZURhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudFN0YWdlOiAxLFxuICAgICAgICBtYXhTdGFnZXM6IDEwLFxuICAgICAgICBub2RlczogW1xuICAgICAgICAgICAgLy8gUm93IDEgLSBTdGFydGluZyBhcmVhICh5OiAyNS02NSwg5Lit5b+DNDXvvIzlnKjlsY/luZXkuK3pl7QpXG4gICAgICAgICAgICB7IGlkOiAnbjEnLCBuYW1lOiAn6LW35aeL54K5JywgdHlwZTogJ25vcm1hbCcsIHN0YXR1czogJ2NvbXBsZXRlZCcsIHg6IDEwLCB5OiA0NSwgZGVzY3JpcHRpb246ICfml4XnqIvnmoTotbfngrknLCByZXdhcmRzOiAn5pegJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ24yJywgJ24zJ10gfSxcbiAgICAgICAgICAgIC8vIFJvdyAyXG4gICAgICAgICAgICB7IGlkOiAnbjInLCBuYW1lOiAn5qOu5p6X5bCP5b6EJywgdHlwZTogJ25vcm1hbCcsIHN0YXR1czogJ2F2YWlsYWJsZScsIHg6IDI1LCB5OiAzMCwgZGVzY3JpcHRpb246ICfnqb/otorojILlr4bnmoTmo67mnpcnLCByZXdhcmRzOiAn6YeR5biBICs1MCcsIGljb246ICcnLCBjb25uZWN0aW9uczogWyduNCcsICduNSddIH0sXG4gICAgICAgICAgICB7IGlkOiAnbjMnLCBuYW1lOiAn5Y2x6Zmp55+/5rSeJywgdHlwZTogJ2hhcmQnLCBzdGF0dXM6ICdhdmFpbGFibGUnLCB4OiAyNSwgeTogNjAsIGRlc2NyaXB0aW9uOiAn5YWF5ruh5Y2x6Zmp55qE55+/5rSeJywgcmV3YXJkczogJ+eogOacieijheWkhycsIGljb246ICcnLCBjb25uZWN0aW9uczogWyduNScsICduNiddIH0sXG4gICAgICAgICAgICAvLyBSb3cgM1xuICAgICAgICAgICAgeyBpZDogJ240JywgbmFtZTogJ+elnuenmOWVhuS6uicsIHR5cGU6ICdldmVudCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDQwLCB5OiAyMCwgZGVzY3JpcHRpb246ICfpgYfliLDnpZ7np5jnmoTllYbkuronLCByZXdhcmRzOiAn54m55q6K54mp5ZOBJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ243J10gfSxcbiAgICAgICAgICAgIHsgaWQ6ICduNScsIG5hbWU6ICfph47lhb3lt6LnqbQnLCB0eXBlOiAnbm9ybWFsJywgc3RhdHVzOiAnbG9ja2VkJywgeDogNDAsIHk6IDQ1LCBkZXNjcmlwdGlvbjogJ+mHjuWFveeahOagluaBr+WcsCcsIHJld2FyZHM6ICfnu4/pqowgKzEwMCcsIGljb246ICcnLCBjb25uZWN0aW9uczogWyduNycsICduOCddIH0sXG4gICAgICAgICAgICB7IGlkOiAnbjYnLCBuYW1lOiAn57K+6Iux5a6I5Y2rJywgdHlwZTogJ2hhcmQnLCBzdGF0dXM6ICdsb2NrZWQnLCB4OiA0MCwgeTogNzAsIGRlc2NyaXB0aW9uOiAn5by65Yqb55qE57K+6Iux5oCq54mpJywgcmV3YXJkczogJ+WPsuivl+ijheWkhycsIGljb246ICcnLCBjb25uZWN0aW9uczogWyduOCddIH0sXG4gICAgICAgICAgICAvLyBSb3cgNFxuICAgICAgICAgICAgeyBpZDogJ243JywgbmFtZTogJ+S8keaBr+iQpeWcsCcsIHR5cGU6ICdldmVudCcsIHN0YXR1czogJ2xvY2tlZCcsIHg6IDU1LCB5OiAyOCwgZGVzY3JpcHRpb246ICflj6/ku6XmgaLlpI3lkozljYfnuqcnLCByZXdhcmRzOiAn5oGi5aSN55Sf5ZG9JywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ245J10gfSxcbiAgICAgICAgICAgIHsgaWQ6ICduOCcsIG5hbWU6ICflj6TogIHpgZfov7knLCB0eXBlOiAnbm9ybWFsJywgc3RhdHVzOiAnbG9ja2VkJywgeDogNTUsIHk6IDU4LCBkZXNjcmlwdGlvbjogJ+aOoue0ouWPpOiAgeeahOmBl+i/uScsIHJld2FyZHM6ICfph5HluIEgKzEwMCcsIGljb246ICcnLCBjb25uZWN0aW9uczogWyduOScsICduMTAnXSB9LFxuICAgICAgICAgICAgLy8gUm93IDUgLSBQcmUtYm9zc1xuICAgICAgICAgICAgeyBpZDogJ245JywgbmFtZTogJ+m7keaal+WJjeWOhScsIHR5cGU6ICdoYXJkJywgc3RhdHVzOiAnbG9ja2VkJywgeDogNzAsIHk6IDQwLCBkZXNjcmlwdGlvbjogJ0Jvc3PliY3nmoTmnIDlkI7mjJHmiJgnLCByZXdhcmRzOiAn5aSn6YeP57uP6aqMJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbJ24xMCddIH0sXG4gICAgICAgICAgICAvLyBCb3NzXG4gICAgICAgICAgICB7IGlkOiAnbjEwJywgbmFtZTogJ+i/nOWPpOW3qOm+mScsIHR5cGU6ICdib3NzJywgc3RhdHVzOiAnbG9ja2VkJywgeDogODgsIHk6IDQwLCBkZXNjcmlwdGlvbjogJ+acrOeroOiKguacgOe7iEJvc3MnLCByZXdhcmRzOiAn5Lyg6K+06KOF5aSHJywgaWNvbjogJycsIGNvbm5lY3Rpb25zOiBbXSB9XG4gICAgICAgIF1cbiAgICB9O1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVUkgQ3JlYXRpb24gRnVuY3Rpb25zXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyDliJvlu7rpgInlhbPlrrnlmajvvIjlj4LogIMgYmF0dGxlRW5kVmlld++8iVxuZnVuY3Rpb24gY3JlYXRlU3RhZ2VTZWxlY3RDb250YWluZXIoKSB7XG4gICAgY29uc3Qgcm9vdCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290KSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKdjCBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8g5qOA5p+l5piv5ZCm5bey5a2Y5ZyoXG4gICAgbGV0IGNvbnRhaW5lciA9IHJvb3QuRmluZENoaWxkKCdTdGFnZVNlbGVjdENvbnRhaW5lcicpO1xuICAgIGlmIChjb250YWluZXIgJiYgY29udGFpbmVyLklzVmFsaWQoKSkge1xuICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBDb250YWluZXIgYWxyZWFkeSBleGlzdHMsIHJldXNpbmcnKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLy8g5Yig6Zmk5peg5pWI5a655ZmoXG4gICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLklzVmFsaWQoKSkge1xuICAgICAgICBjb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIENyZWF0aW5nIG5ldyBjb250YWluZXIuLi4nKTtcbiAgICAvLyDliJvlu7rkuLvlrrnlmahcbiAgICBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3QsICdTdGFnZVNlbGVjdENvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKdjCBGYWlsZWQgdG8gY3JlYXRlIGNvbnRhaW5lcicpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLy8g6aqM6K+B54i25YWD57SgXG4gICAgY29uc3QgcGFyZW50ID0gY29udGFpbmVyLkdldFBhcmVudCgpO1xuICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIENvbnRhaW5lciBwYXJlbnQ6ICR7cGFyZW50ID8gcGFyZW50LmlkIDogJ251bGwnfWApO1xuICAgIGNvbnRhaW5lci5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2NvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250YWluZXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJzsgLy8g6buY6K6k6ZqQ6JePXG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICc5MDAwJztcbiAgICBjb250YWluZXIuaGl0dGVzdCA9IGZhbHNlO1xuICAgIC8vIOWIm+W7uumBrue9qVxuICAgIGNvbnN0IG1hc2sgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lciwgJ1N0YWdlU2VsZWN0TWFzaycpO1xuICAgIG1hc2suc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjg1KSc7XG4gICAgbWFzay5oaXR0ZXN0ID0gdHJ1ZTsgLy8g5oum5oiq54K55Ye7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0g4pyFIENvbnRhaW5lciBjcmVhdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG5mdW5jdGlvbiBpbml0U3RhZ2VTZWxlY3QoKSB7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEluaXRpYWxpemluZy4uLicpO1xuICAgIC8vIOWIm+W7uuWuueWZqFxuICAgIGNvbnRhaW5lclBhbmVsID0gY3JlYXRlU3RhZ2VTZWxlY3RDb250YWluZXIoKTtcbiAgICBpZiAoIWNvbnRhaW5lclBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKdjCBGYWlsZWQgdG8gY3JlYXRlIGNvbnRhaW5lciwgYWJvcnRpbmcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIHJvb3RQYW5lbCA9PT0gbnVsbCB8fCByb290UGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJvb3RQYW5lbC5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X3Jvb3QnKTtcbiAgICAvLyDliJvlu7pVSeWFg+e0oCAtIOa3u+WKoOmUmeivr+WkhOeQhlxuICAgIHRyeSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIENyZWF0aW5nIGJhY2tncm91bmQuLi4nKTtcbiAgICAgICAgY3JlYXRlQmFja2dyb3VuZChjb250YWluZXJQYW5lbCk7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIENyZWF0aW5nIGhlYWRlci4uLicpO1xuICAgICAgICBjcmVhdGVIZWFkZXIoY29udGFpbmVyUGFuZWwpO1xuICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBDcmVhdGluZyBtYXAgYXJlYS4uLicpO1xuICAgICAgICBjcmVhdGVNYXBBcmVhKGNvbnRhaW5lclBhbmVsKTtcbiAgICAgICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gQ3JlYXRpbmcgZm9vdGVyLi4uJyk7XG4gICAgICAgIGNyZWF0ZUZvb3Rlcihjb250YWluZXJQYW5lbCk7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIFVJIGVsZW1lbnRzIGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIOKdjCBFUlJPUiBjcmVhdGluZyBVSTogJHtlfWApO1xuICAgIH1cbiAgICAvLyDms6jlhozkuovku7ZcbiAgICByZWdpc3RlckV2ZW50cygpO1xuICAgIC8vIOaatOmcsuWFqOWxgEFQSVxuICAgIGV4cG9zZUdsb2JhbEFQSSgpO1xuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKchSBJbml0aWFsaXphdGlvbiBjb21wbGV0ZScpO1xuICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUJhY2tncm91bmQocGFyZW50KSB7XG4gICAgY29uc3QgYmcgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1N0YWdlU2VsZWN0QmcnKTtcbiAgICBiZy5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2JnJyk7XG4gICAgYmcuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7U1RBR0VfQkFDS0dST1VORFNbMF19XCIpYDtcbiAgICBiZy5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb3Zlcic7XG4gICAgYmcuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlcic7XG59XG5mdW5jdGlvbiBjcmVhdGVIZWFkZXIocGFyZW50KSB7XG4gICAgY29uc3QgaGVhZGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdTdGFnZVNlbGVjdEhlYWRlcicpO1xuICAgIGhlYWRlci5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2hlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzgwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGhlYWRlci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoZWFkZXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgIGhlYWRlci5zdHlsZS5wYWRkaW5nID0gJzE1cHggNDBweCc7XG4gICAgaGVhZGVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuNyknO1xuICAgIC8vIFRpdGxlXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGhlYWRlciwgJ1N0YWdlVGl0bGUnKTtcbiAgICB0aXRsZS5BZGRDbGFzcygnc3RhZ2VfdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+mAieaLqeWFs+WNoSc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMzJweCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnMuZ29sZDtcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRTaGFkb3cgPSAnMnB4IDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICB0aXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICB0aXRsZS5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8gQ2xvc2UgYnV0dG9uXG4gICAgY29uc3QgY2xvc2VCdG4gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBoZWFkZXIsICdDbG9zZUJ1dHRvbicpO1xuICAgIGNsb3NlQnRuLnN0eWxlLndpZHRoID0gJzQwcHgnO1xuICAgIGNsb3NlQnRuLnN0eWxlLmhlaWdodCA9ICc0MHB4JztcbiAgICBjbG9zZUJ0bi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgIGNsb3NlQnRuLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjbG9zZUJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyMjAsIDIwLCA2MCwgMC44KSc7XG4gICAgY2xvc2VCdG4uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgY29uc3QgY2xvc2VMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY2xvc2VCdG4sICdDbG9zZUJ0bkxhYmVsJyk7XG4gICAgY2xvc2VMYWJlbC50ZXh0ID0gJ1gnO1xuICAgIGNsb3NlTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgY2xvc2VMYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICBjbG9zZUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlTGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNsb3NlTGFiZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY2xvc2VMYWJlbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY2xvc2VMYWJlbC5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgY2xvc2VCdG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgaGlkZVN0YWdlU2VsZWN0KCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVNYXBBcmVhKHBhcmVudCkge1xuICAgIGNvbnN0IG1hcENvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnU3RhZ2VNYXBDb250YWluZXInKTtcbiAgICBtYXBDb250YWluZXIuQWRkQ2xhc3MoJ3N0YWdlX21hcF9jb250YWluZXInKTtcbiAgICBtYXBDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFwQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBtYXBDb250YWluZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFwQ29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyBNYXAgY29udGVudCB3aXRoIGJhY2tncm91bmRcbiAgICBjb25zdCBtYXBDb250ZW50ID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBtYXBDb250YWluZXIsICdTdGFnZU1hcENvbnRlbnQnKTtcbiAgICBtYXBDb250ZW50LkFkZENsYXNzKCdzdGFnZV9tYXBfY29udGVudCcpO1xuICAgIG1hcENvbnRlbnQuc3R5bGUud2lkdGggPSAnMTIwMHB4JztcbiAgICBtYXBDb250ZW50LnN0eWxlLmhlaWdodCA9ICc3MDBweCc7XG4gICAgbWFwQ29udGVudC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBtYXBDb250ZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBtYXBDb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDIwLCAxNSwgMTAsIDAuNiknO1xuICAgIG1hcENvbnRlbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzIwcHgnO1xuICAgIG1hcENvbnRlbnQuc3R5bGUuYm9yZGVyID0gJzNweCBzb2xpZCByZ2JhKDEzOSwgOTAsIDQzLCAwLjUpJztcbiAgICAvLyBOb2RlcyBsYXllclxuICAgIGNvbnN0IG5vZGVzTGF5ZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIG1hcENvbnRlbnQsICdTdGFnZU5vZGVzTGF5ZXInKTtcbiAgICBub2Rlc0xheWVyLkFkZENsYXNzKCdzdGFnZV9ub2Rlc19sYXllcicpO1xuICAgIG5vZGVzTGF5ZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbm9kZXNMYXllci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG59XG5mdW5jdGlvbiBjcmVhdGVGb290ZXIocGFyZW50KSB7XG4gICAgY29uc3QgZm9vdGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdTdGFnZVNlbGVjdEZvb3RlcicpO1xuICAgIGZvb3Rlci5BZGRDbGFzcygnc3RhZ2Vfc2VsZWN0X2Zvb3RlcicpO1xuICAgIGZvb3Rlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBmb290ZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMHB4JztcbiAgICBmb290ZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBmb290ZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgZm9vdGVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICBmb290ZXIuc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICBmb290ZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC43KSc7XG4gICAgLy8gUHJvZ3Jlc3MgaW5kaWNhdG9yXG4gICAgY3JlYXRlUHJvZ3Jlc3NCYXIoZm9vdGVyKTtcbiAgICAvLyBTcGFjZXJcbiAgICBjb25zdCBzcGFjZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGZvb3RlciwgJ0Zvb3RlclNwYWNlcicpO1xuICAgIHNwYWNlci5zdHlsZS53aWR0aCA9ICcxMDBweCc7XG4gICAgLy8gU3RhcnQgYnV0dG9uXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBjcmVhdGVCdXR0b24oZm9vdGVyLCAnU3RhcnRTdGFnZUJ0bicsICflvIDlp4vmiJjmlpcnLCB0cnVlKTtcbiAgICBzdGFydEJ0bi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICBpZiAoc2VsZWN0ZWROb2RlICYmIHNlbGVjdGVkTm9kZS5zdGF0dXMgPT09ICdhdmFpbGFibGUnKSB7XG4gICAgICAgICAgICBzdGFydFN0YWdlKHNlbGVjdGVkTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBObyBhdmFpbGFibGUgc3RhZ2Ugc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkNhbmNlbCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gQmFjayBidXR0b25cbiAgICBjb25zdCBiYWNrQnRuID0gY3JlYXRlQnV0dG9uKGZvb3RlciwgJ0JhY2tCdG4nLCAn6L+U5ZueJywgZmFsc2UpO1xuICAgIGJhY2tCdG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgaGlkZVN0YWdlU2VsZWN0KCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVCdXR0b24ocGFyZW50LCBpZCwgdGV4dCwgaXNQcmltYXJ5KSB7XG4gICAgY29uc3QgYnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgcGFyZW50LCBpZCk7XG4gICAgYnRuLkFkZENsYXNzKCdzdGFnZV9idG4nKTtcbiAgICBpZiAoaXNQcmltYXJ5KSB7XG4gICAgICAgIGJ0bi5BZGRDbGFzcygnc3RhZ2VfYnRuX3ByaW1hcnknKTtcbiAgICB9XG4gICAgYnRuLnN0eWxlLndpZHRoID0gJzE4MHB4JztcbiAgICBidG4uc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xuICAgIGJ0bi5zdHlsZS5tYXJnaW5MZWZ0ID0gJzE1cHgnO1xuICAgIGJ0bi5zdHlsZS5tYXJnaW5SaWdodCA9ICcxNXB4JztcbiAgICBidG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gaXNQcmltYXJ5ID8gJ3JnYmEoMjE4LCAxNjUsIDMyLCAwLjkpJyA6ICdyZ2JhKDEzOSwgOTAsIDQzLCAwLjkpJztcbiAgICBidG4uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDIxOCwgMTY1LCAzMiwgMC43KSc7XG4gICAgYnRuLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBidG4sIGAke2lkfV9MYWJlbGApO1xuICAgIGxhYmVsLnRleHQgPSB0ZXh0O1xuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gU1RBR0VfVEhFTUUuY29sb3JzLmdvbGQ7XG4gICAgbGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBsYWJlbC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBsYWJlbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBsYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbGFiZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbGFiZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICByZXR1cm4gYnRuO1xufVxuZnVuY3Rpb24gY3JlYXRlUHJvZ3Jlc3NCYXIocGFyZW50KSB7XG4gICAgY29uc3QgcHJvZ3Jlc3NDb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1N0YWdlUHJvZ3Jlc3MnKTtcbiAgICBwcm9ncmVzc0NvbnRhaW5lci5BZGRDbGFzcygnc3RhZ2VfcHJvZ3Jlc3MnKTtcbiAgICBwcm9ncmVzc0NvbnRhaW5lci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIHByb2dyZXNzQ29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCBwcm9ncmVzc0xhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBwcm9ncmVzc0NvbnRhaW5lciwgJ1Byb2dyZXNzTGFiZWwnKTtcbiAgICBwcm9ncmVzc0xhYmVsLnRleHQgPSAn6L+b5bqmOic7XG4gICAgcHJvZ3Jlc3NMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBwcm9ncmVzc0xhYmVsLnN0eWxlLmNvbG9yID0gU1RBR0VfVEhFTUUuY29sb3JzLnRleHQ7XG4gICAgcHJvZ3Jlc3NMYWJlbC5zdHlsZS5tYXJnaW5SaWdodCA9ICcxMHB4JztcbiAgICBwcm9ncmVzc0xhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb25zdCBwcm9ncmVzc0JnID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwcm9ncmVzc0NvbnRhaW5lciwgJ1Byb2dyZXNzQmFyQmcnKTtcbiAgICBwcm9ncmVzc0JnLkFkZENsYXNzKCdwcm9ncmVzc19iYXJfYmcnKTtcbiAgICBwcm9ncmVzc0JnLnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgICBwcm9ncmVzc0JnLnN0eWxlLmhlaWdodCA9ICcxNnB4JztcbiAgICBwcm9ncmVzc0JnLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDUwLCA0MCwgMzAsIDAuOCknO1xuICAgIHByb2dyZXNzQmcuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDEzOSwgOTAsIDQzLCAwLjYpJztcbiAgICBwcm9ncmVzc0JnLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIHByb2dyZXNzQmcuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnN0IHByb2dyZXNzRmlsbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcHJvZ3Jlc3NCZywgJ1Byb2dyZXNzQmFyRmlsbCcpO1xuICAgIHByb2dyZXNzRmlsbC5BZGRDbGFzcygncHJvZ3Jlc3NfYmFyX2ZpbGwnKTtcbiAgICBwcm9ncmVzc0ZpbGwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHByb2dyZXNzRmlsbC5zdHlsZS53aWR0aCA9ICcxMCUnO1xuICAgIHByb2dyZXNzRmlsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnMuZ29sZDtcbiAgICBwcm9ncmVzc0ZpbGwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzZweCc7XG4gICAgY29uc3QgcHJvZ3Jlc3NUZXh0ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBwcm9ncmVzc0NvbnRhaW5lciwgJ1Byb2dyZXNzVGV4dCcpO1xuICAgIHByb2dyZXNzVGV4dC5BZGRDbGFzcygncHJvZ3Jlc3NfdGV4dCcpO1xuICAgIHByb2dyZXNzVGV4dC50ZXh0ID0gJzEvMTAnO1xuICAgIHByb2dyZXNzVGV4dC5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBwcm9ncmVzc1RleHQuc3R5bGUuY29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnMudGV4dDtcbiAgICBwcm9ncmVzc1RleHQuc3R5bGUubWFyZ2luTGVmdCA9ICcxNXB4JztcbiAgICBwcm9ncmVzc1RleHQuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xufVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTm9kZSBDcmVhdGlvbiAmIE1hbmFnZW1lbnRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZVN0YWdlTm9kZXMoZGF0YSkge1xuICAgIC8vIOWxgue6p++8mmNvbnRhaW5lclBhbmVsID4gU3RhZ2VNYXBDb250YWluZXIgPiBTdGFnZU1hcENvbnRlbnQgPiBTdGFnZU5vZGVzTGF5ZXJcbiAgICBjb25zdCBtYXBDb250YWluZXIgPSBjb250YWluZXJQYW5lbCA9PT0gbnVsbCB8fCBjb250YWluZXJQYW5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyUGFuZWwuRmluZENoaWxkKCdTdGFnZU1hcENvbnRhaW5lcicpO1xuICAgIGNvbnN0IG1hcENvbnRlbnQgPSBtYXBDb250YWluZXIgPT09IG51bGwgfHwgbWFwQ29udGFpbmVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYXBDb250YWluZXIuRmluZENoaWxkKCdTdGFnZU1hcENvbnRlbnQnKTtcbiAgICBjb25zdCBub2Rlc0xheWVyID0gbWFwQ29udGVudCA9PT0gbnVsbCB8fCBtYXBDb250ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYXBDb250ZW50LkZpbmRDaGlsZCgnU3RhZ2VOb2Rlc0xheWVyJyk7XG4gICAgaWYgKCFub2Rlc0xheWVyKSB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIEVSUk9SOiBOb2RlcyBsYXllciBub3QgZm91bmQnKTtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ29udGFpbmVyOiAke2NvbnRhaW5lclBhbmVsID8gJ2V4aXN0cycgOiAnbnVsbCd9YCk7XG4gICAgICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIE1hcENvbnRhaW5lcjogJHttYXBDb250YWluZXIgPyAnZXhpc3RzJyA6ICdudWxsJ31gKTtcbiAgICAgICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gTWFwQ29udGVudDogJHttYXBDb250ZW50ID8gJ2V4aXN0cycgOiAnbnVsbCd9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ3JlYXRpbmcgJHtkYXRhLm5vZGVzLmxlbmd0aH0gbm9kZXMuLi5gKTtcbiAgICAvLyBDbGVhciBleGlzdGluZyBub2Rlc1xuICAgIG5vZGVzTGF5ZXIuUmVtb3ZlQW5kRGVsZXRlQ2hpbGRyZW4oKTtcbiAgICAvLyBGaXJzdCBkcmF3IGNvbm5lY3Rpb25zXG4gICAgZHJhd0Nvbm5lY3Rpb25zKG5vZGVzTGF5ZXIsIGRhdGEubm9kZXMpO1xuICAgIC8vIFRoZW4gY3JlYXRlIG5vZGVzXG4gICAgZGF0YS5ub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBjcmVhdGVTdGFnZU5vZGUobm9kZXNMYXllciwgbm9kZSk7XG4gICAgfSk7XG4gICAgLy8gVXBkYXRlIHByb2dyZXNzXG4gICAgdXBkYXRlUHJvZ3Jlc3MoZGF0YSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTdGFnZU5vZGUocGFyZW50LCBub2RlKSB7XG4gICAgY29uc3Qgbm9kZVBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBOb2RlXyR7bm9kZS5pZH1gKTtcbiAgICBub2RlUGFuZWwuQWRkQ2xhc3MoJ3N0YWdlX25vZGUnKTtcbiAgICBub2RlUGFuZWwuQWRkQ2xhc3MoYHN0YWdlX25vZGVfJHtub2RlLnN0YXR1c31gKTtcbiAgICAvLyBDYWxjdWxhdGUgcG9zaXRpb25cbiAgICBjb25zdCBtYXBXaWR0aCA9IDEyMDA7XG4gICAgY29uc3QgbWFwSGVpZ2h0ID0gNzAwO1xuICAgIGNvbnN0IG5vZGVYID0gKG5vZGUueCAvIDEwMCkgKiBtYXBXaWR0aCAtIFNUQUdFX1RIRU1FLm5vZGVTaXplIC8gMjtcbiAgICBjb25zdCBub2RlWSA9IChub2RlLnkgLyAxMDApICogbWFwSGVpZ2h0IC0gU1RBR0VfVEhFTUUubm9kZVNpemUgLyAyO1xuICAgIG5vZGVQYW5lbC5zdHlsZS53aWR0aCA9IGAke1NUQUdFX1RIRU1FLm5vZGVTaXplfXB4YDtcbiAgICBub2RlUGFuZWwuc3R5bGUuaGVpZ2h0ID0gYCR7U1RBR0VfVEhFTUUubm9kZVNpemV9cHhgO1xuICAgIC8vIOS9v+eUqCBwb3NpdGlvbiDlsZ7mgKfov5vooYznu53lr7nlrprkvY1cbiAgICBub2RlUGFuZWwuc3R5bGUucG9zaXRpb24gPSBgJHtub2RlWH1weCAke25vZGVZfXB4IDBweGA7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ3JlYXRlZCBub2RlICR7bm9kZS5pZH0gYXQgKCR7bm9kZVh9LCAke25vZGVZfSlgKTtcbiAgICAvLyBOb2RlIGZyYW1lXG4gICAgY29uc3QgZnJhbWUgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIG5vZGVQYW5lbCwgYE5vZGVGcmFtZV8ke25vZGUuaWR9YCk7XG4gICAgZnJhbWUuQWRkQ2xhc3MoJ3N0YWdlX25vZGVfZnJhbWUnKTtcbiAgICBmcmFtZS5BZGRDbGFzcyhgc3RhZ2Vfbm9kZV9mcmFtZV8ke25vZGUudHlwZX1gKTtcbiAgICBmcmFtZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBmcmFtZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgZnJhbWUuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEycHgnO1xuICAgIGZyYW1lLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDMwLCAyMCwgMTAsIDAuOSknO1xuICAgIC8vIEFwcGx5IHR5cGUtc3BlY2lmaWMgYm9yZGVyIGNvbG9yXG4gICAgY29uc3QgYm9yZGVyQ29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnNbbm9kZS50eXBlXTtcbiAgICBmcmFtZS5zdHlsZS5ib3JkZXIgPSBgM3B4IHNvbGlkICR7Ym9yZGVyQ29sb3J9YDtcbiAgICBmcmFtZS5zdHlsZS5ib3hTaGFkb3cgPSBgMHB4IDBweCAxNXB4ICR7Ym9yZGVyQ29sb3IucmVwbGFjZSgnMC44JywgJzAuNCcpLnJlcGxhY2UoJzAuOScsICcwLjUnKX1gO1xuICAgIC8vIE5vZGUgaWNvblxuICAgIGNvbnN0IGljb24gPSAkLkNyZWF0ZVBhbmVsKCdJbWFnZScsIGZyYW1lLCBgTm9kZUljb25fJHtub2RlLmlkfWApO1xuICAgIGljb24uQWRkQ2xhc3MoJ3N0YWdlX25vZGVfaWNvbicpO1xuICAgIGljb24uU2V0SW1hZ2UoTk9ERV9JQ09OU1tub2RlLnR5cGVdKTtcbiAgICBpY29uLnN0eWxlLndpZHRoID0gYCR7U1RBR0VfVEhFTUUuaWNvblNpemV9cHhgO1xuICAgIGljb24uc3R5bGUuaGVpZ2h0ID0gYCR7U1RBR0VfVEhFTUUuaWNvblNpemV9cHhgO1xuICAgIGljb24uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaWNvbi5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8gQXBwbHkgc3RhdHVzIGVmZmVjdHNcbiAgICBpZiAobm9kZS5zdGF0dXMgPT09ICdsb2NrZWQnKSB7XG4gICAgICAgIG5vZGVQYW5lbC5zdHlsZS5vcGFjaXR5ID0gJzAuNCc7XG4gICAgICAgIGZyYW1lLnN0eWxlLnNhdHVyYXRpb24gPSAnMCc7XG4gICAgfVxuICAgIGVsc2UgaWYgKG5vZGUuc3RhdHVzID09PSAnY29tcGxldGVkJykge1xuICAgICAgICBub2RlUGFuZWwuc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgIH1cbiAgICBlbHNlIGlmIChub2RlLnN0YXR1cyA9PT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgIC8vIEFkZCBwdWxzZSBhbmltYXRpb24gY2xhc3NcbiAgICAgICAgbm9kZVBhbmVsLkFkZENsYXNzKCdzdGFnZV9ub2RlX2N1cnJlbnQnKTtcbiAgICB9XG4gICAgLy8gQ2xpY2sgaGFuZGxlclxuICAgIGlmIChub2RlLnN0YXR1cyA9PT0gJ2F2YWlsYWJsZScgfHwgbm9kZS5zdGF0dXMgPT09ICdjdXJyZW50Jykge1xuICAgICAgICBub2RlUGFuZWwuU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgIHNlbGVjdE5vZGUobm9kZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBub2RlUGFuZWwuU2V0UGFuZWxFdmVudCgnb25tb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBzaG93Tm9kZVRvb2x0aXAobm9kZVBhbmVsLCBub2RlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5vZGVQYW5lbC5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICAgICAgaGlkZU5vZGVUb29sdGlwKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZVBhbmVsO1xufVxuZnVuY3Rpb24gZHJhd0Nvbm5lY3Rpb25zKHBhcmVudCwgbm9kZXMpIHtcbiAgICAvLyBDcmVhdGUgYSBsYXllciBmb3IgY29ubmVjdGlvbnNcbiAgICBjb25zdCBjb25uZWN0aW9uc0xheWVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdDb25uZWN0aW9uc0xheWVyJyk7XG4gICAgY29ubmVjdGlvbnNMYXllci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb25uZWN0aW9uc0xheWVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICBub2RlLmNvbm5lY3Rpb25zLmZvckVhY2godGFyZ2V0SWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Tm9kZSA9IG5vZGVzLmZpbmQobiA9PiBuLmlkID09PSB0YXJnZXRJZCk7XG4gICAgICAgICAgICBpZiAodGFyZ2V0Tm9kZSkge1xuICAgICAgICAgICAgICAgIGRyYXdDb25uZWN0aW9uKGNvbm5lY3Rpb25zTGF5ZXIsIG5vZGUsIHRhcmdldE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGRyYXdDb25uZWN0aW9uKHBhcmVudCwgZnJvbSwgdG8pIHtcbiAgICBjb25zdCBtYXBXaWR0aCA9IDEyMDA7XG4gICAgY29uc3QgbWFwSGVpZ2h0ID0gNzAwO1xuICAgIGNvbnN0IHgxID0gKGZyb20ueCAvIDEwMCkgKiBtYXBXaWR0aDtcbiAgICBjb25zdCB5MSA9IChmcm9tLnkgLyAxMDApICogbWFwSGVpZ2h0O1xuICAgIGNvbnN0IHgyID0gKHRvLnggLyAxMDApICogbWFwV2lkdGg7XG4gICAgY29uc3QgeTIgPSAodG8ueSAvIDEwMCkgKiBtYXBIZWlnaHQ7XG4gICAgLy8gQ2FsY3VsYXRlIGxpbmUgcHJvcGVydGllc1xuICAgIGNvbnN0IGR4ID0geDIgLSB4MTtcbiAgICBjb25zdCBkeSA9IHkyIC0geTE7XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KSAqICgxODAgLyBNYXRoLlBJKTtcbiAgICBjb25zdCBsaW5lID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBDb25uZWN0aW9uXyR7ZnJvbS5pZH1fJHt0by5pZH1gKTtcbiAgICBsaW5lLkFkZENsYXNzKCdzdGFnZV9jb25uZWN0aW9uJyk7XG4gICAgLy8gRGV0ZXJtaW5lIGlmIGNvbm5lY3Rpb24gaXMgYWN0aXZlXG4gICAgY29uc3QgaXNBY3RpdmUgPSBmcm9tLnN0YXR1cyA9PT0gJ2NvbXBsZXRlZCcgfHwgZnJvbS5zdGF0dXMgPT09ICdjdXJyZW50JztcbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgbGluZS5BZGRDbGFzcygnc3RhZ2VfY29ubmVjdGlvbl9hY3RpdmUnKTtcbiAgICAgICAgbGluZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyMTgsIDE2NSwgMzIsIDAuOCknO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGluZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgxMzksIDkwLCA0MywgMC40KSc7XG4gICAgfVxuICAgIGxpbmUuc3R5bGUud2lkdGggPSBgJHtsZW5ndGh9cHhgO1xuICAgIGxpbmUuc3R5bGUuaGVpZ2h0ID0gJzRweCc7XG4gICAgLy8g5L2/55SoIHBvc2l0aW9uIOWxnuaAp+i/m+ihjOe7neWvueWumuS9jVxuICAgIGxpbmUuc3R5bGUucG9zaXRpb24gPSBgJHt4MX1weCAke3kxfXB4IDBweGA7XG4gICAgbGluZS5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnMCUgNTAlJztcbiAgICBsaW5lLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVaKCR7YW5nbGV9ZGVnKWA7XG4gICAgbGluZS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMnB4Jztcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFNlbGVjdGlvbiAmIEludGVyYWN0aW9uXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBzZWxlY3ROb2RlKG5vZGUpIHtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSBOb2RlIHNlbGVjdGVkOiAke25vZGUubmFtZX0gKCR7bm9kZS50eXBlfSlgKTtcbiAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuICAgIC8vIENsZWFyIHByZXZpb3VzIHNlbGVjdGlvblxuICAgIGlmIChzZWxlY3RlZE5vZGUpIHtcbiAgICAgICAgY29uc3QgcHJldlBhbmVsID0gY29udGFpbmVyUGFuZWwgPT09IG51bGwgfHwgY29udGFpbmVyUGFuZWwgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbnRhaW5lclBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgTm9kZV8ke3NlbGVjdGVkTm9kZS5pZH1gKTtcbiAgICAgICAgaWYgKHByZXZQYW5lbCkge1xuICAgICAgICAgICAgcHJldlBhbmVsLlJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNlbGVjdGVkTm9kZSA9IG5vZGU7XG4gICAgLy8gSGlnaGxpZ2h0IG5ldyBzZWxlY3Rpb25cbiAgICBjb25zdCBub2RlUGFuZWwgPSBjb250YWluZXJQYW5lbCA9PT0gbnVsbCB8fCBjb250YWluZXJQYW5lbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29udGFpbmVyUGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBOb2RlXyR7bm9kZS5pZH1gKTtcbiAgICBpZiAobm9kZVBhbmVsKSB7XG4gICAgICAgIG5vZGVQYW5lbC5BZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgbm9kZVBhbmVsLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKDEuMiwgMS4yLCAxLjApJztcbiAgICB9XG4gICAgLy8gVXBkYXRlIHN0YXJ0IGJ1dHRvblxuICAgIHVwZGF0ZVN0YXJ0QnV0dG9uKCk7XG59XG5mdW5jdGlvbiB1cGRhdGVTdGFydEJ1dHRvbigpIHtcbiAgICBjb25zdCBzdGFydEJ0biA9IGNvbnRhaW5lclBhbmVsID09PSBudWxsIHx8IGNvbnRhaW5lclBhbmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250YWluZXJQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1N0YXJ0U3RhZ2VCdG4nKTtcbiAgICBpZiAoIXN0YXJ0QnRuKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHNlbGVjdGVkTm9kZSAmJiBzZWxlY3RlZE5vZGUuc3RhdHVzID09PSAnYXZhaWxhYmxlJykge1xuICAgICAgICBzdGFydEJ0bi5SZW1vdmVDbGFzcygnc3RhZ2VfYnRuX2Rpc2FibGVkJyk7XG4gICAgICAgIHN0YXJ0QnRuLnN0eWxlLm9wYWNpdHkgPSAnMS4wJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YXJ0QnRuLkFkZENsYXNzKCdzdGFnZV9idG5fZGlzYWJsZWQnKTtcbiAgICAgICAgc3RhcnRCdG4uc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHN0YXJ0U3RhZ2Uobm9kZSkge1xuICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIFN0YXJ0aW5nIHN0YWdlOiAke25vZGUubmFtZX0gKGlkOiAke25vZGUuaWR9KWApO1xuICAgIEdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkNhc3RBYmlsaXR5Jyk7XG4gICAgLy8g5LuO6IqC54K5SUTkuK3mj5Dlj5blhbPljaHmlbDlrZfvvIjkvovlpoIgXCJzdGFnZV8xXCIgLT4gXCIxXCLvvIlcbiAgICBjb25zdCBzdGFnZUlkTWF0Y2ggPSBub2RlLmlkLm1hdGNoKC9cXGQrLyk7XG4gICAgY29uc3Qgc3RhZ2VJZCA9IHN0YWdlSWRNYXRjaCA/IHN0YWdlSWRNYXRjaFswXSA6IG5vZGUuaWQ7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gU2VuZGluZyBzdGFnZSBzZWxlY3Rpb24gdG8gc2VydmVyOiBzdGFnZUlkPSR7c3RhZ2VJZH1gKTtcbiAgICAvLyDlj5HpgIHlhbPljaHpgInmi6nkuovku7bliLDmnI3liqHnq69cbiAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcignYXV0b2NoZXNzX3dhdmVfc2VsZWN0X3N0YWdlJywge1xuICAgICAgICBwbGF5ZXJJZDogUGxheWVycy5HZXRMb2NhbFBsYXllcigpLFxuICAgICAgICBzdGFnZUlkOiBzdGFnZUlkXG4gICAgfSk7XG4gICAgLy8gSGlkZSBzZWxlY3Rpb24gVUlcbiAgICBoaWRlU3RhZ2VTZWxlY3QoKTtcbiAgICAvLyDmmL7npLrlh4blpIfkuK3mj5DnpLpcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSBTdGFnZSBzZWxlY3RlZCwgcHJlcGFyaW5nLi4uYCk7XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBUb29sdGlwXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5sZXQgdG9vbHRpcFBhbmVsID0gbnVsbDtcbmZ1bmN0aW9uIHNob3dOb2RlVG9vbHRpcChub2RlUGFuZWwsIG5vZGUpIHtcbiAgICBoaWRlTm9kZVRvb2x0aXAoKTtcbiAgICB0b29sdGlwUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGNvbnRhaW5lclBhbmVsLCAnTm9kZVRvb2x0aXAnKTtcbiAgICB0b29sdGlwUGFuZWwuQWRkQ2xhc3MoJ3N0YWdlX25vZGVfdG9vbHRpcCcpO1xuICAgIHRvb2x0aXBQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzE1cHgnO1xuICAgIHRvb2x0aXBQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyMCwgMTUsIDEwLCAwLjk1KSc7XG4gICAgdG9vbHRpcFBhbmVsLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmdiYSgxMzksIDkwLCA0MywgMC43KSc7XG4gICAgdG9vbHRpcFBhbmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICB0b29sdGlwUGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIHRvb2x0aXBQYW5lbC5zdHlsZS56SW5kZXggPSAnMTAwJztcbiAgICAvLyBQb3NpdGlvbiBuZWFyIG5vZGVcbiAgICB0b29sdGlwUGFuZWwuc3R5bGUubWFyZ2luTGVmdCA9IGAke25vZGVQYW5lbC5hY3R1YWx4b2Zmc2V0ICsgU1RBR0VfVEhFTUUubm9kZVNpemUgKyAxMH1weGA7XG4gICAgdG9vbHRpcFBhbmVsLnN0eWxlLm1hcmdpblRvcCA9IGAke25vZGVQYW5lbC5hY3R1YWx5b2Zmc2V0fXB4YDtcbiAgICAvLyBUaXRsZVxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0b29sdGlwUGFuZWwsICdUb29sdGlwVGl0bGUnKTtcbiAgICB0aXRsZS5BZGRDbGFzcygndG9vbHRpcF90aXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSBub2RlLm5hbWU7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBTVEFHRV9USEVNRS5jb2xvcnMuZ29sZDtcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc4cHgnO1xuICAgIC8vIFR5cGUgaW5kaWNhdG9yXG4gICAgY29uc3QgdHlwZUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0b29sdGlwUGFuZWwsICdUb29sdGlwVHlwZScpO1xuICAgIHR5cGVMYWJlbC50ZXh0ID0gZ2V0VHlwZURpc3BsYXlOYW1lKG5vZGUudHlwZSk7XG4gICAgdHlwZUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIHR5cGVMYWJlbC5zdHlsZS5jb2xvciA9IFNUQUdFX1RIRU1FLmNvbG9yc1tub2RlLnR5cGVdO1xuICAgIHR5cGVMYWJlbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAvLyBEZXNjcmlwdGlvblxuICAgIGNvbnN0IGRlc2MgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRvb2x0aXBQYW5lbCwgJ1Rvb2x0aXBEZXNjJyk7XG4gICAgZGVzYy5BZGRDbGFzcygndG9vbHRpcF9kZXNjJyk7XG4gICAgZGVzYy50ZXh0ID0gbm9kZS5kZXNjcmlwdGlvbjtcbiAgICBkZXNjLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIGRlc2Muc3R5bGUuY29sb3IgPSAnI2Q0YWYzNyc7XG4gICAgZGVzYy5zdHlsZS5vcGFjaXR5ID0gJzAuOSc7XG4gICAgZGVzYy5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgLy8gUmV3YXJkc1xuICAgIGNvbnN0IHJld2FyZHMgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRvb2x0aXBQYW5lbCwgJ1Rvb2x0aXBSZXdhcmRzJyk7XG4gICAgcmV3YXJkcy5BZGRDbGFzcygndG9vbHRpcF9yZXdhcmRzJyk7XG4gICAgcmV3YXJkcy50ZXh0ID0gYOWlluWKsTogJHtub2RlLnJld2FyZHN9YDtcbiAgICByZXdhcmRzLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIHJld2FyZHMuc3R5bGUuY29sb3IgPSAnIzMyY2QzMic7XG59XG5mdW5jdGlvbiBoaWRlTm9kZVRvb2x0aXAoKSB7XG4gICAgaWYgKHRvb2x0aXBQYW5lbCkge1xuICAgICAgICB0b29sdGlwUGFuZWwuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgIHRvb2x0aXBQYW5lbCA9IG51bGw7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0VHlwZURpc3BsYXlOYW1lKHR5cGUpIHtcbiAgICBjb25zdCBuYW1lcyA9IHtcbiAgICAgICAgbm9ybWFsOiAn5pmu6YCa5YWz5Y2hJyxcbiAgICAgICAgaGFyZDogJ+WbsOmavuWFs+WNoScsXG4gICAgICAgIGJvc3M6ICdCb3Nz5YWz5Y2hJyxcbiAgICAgICAgZXZlbnQ6ICfkuovku7boioLngrknXG4gICAgfTtcbiAgICByZXR1cm4gbmFtZXNbdHlwZV07XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBQcm9ncmVzc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MoZGF0YSkge1xuICAgIGNvbnN0IHByb2dyZXNzRmlsbCA9IGNvbnRhaW5lclBhbmVsID09PSBudWxsIHx8IGNvbnRhaW5lclBhbmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250YWluZXJQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1Byb2dyZXNzQmFyRmlsbCcpO1xuICAgIGNvbnN0IHByb2dyZXNzVGV4dCA9IGNvbnRhaW5lclBhbmVsID09PSBudWxsIHx8IGNvbnRhaW5lclBhbmVsID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb250YWluZXJQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1Byb2dyZXNzVGV4dCcpO1xuICAgIGlmIChwcm9ncmVzc0ZpbGwgJiYgcHJvZ3Jlc3NUZXh0KSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSAoZGF0YS5jdXJyZW50U3RhZ2UgLyBkYXRhLm1heFN0YWdlcykgKiAxMDA7XG4gICAgICAgIHByb2dyZXNzRmlsbC5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnRhZ2V9JWA7XG4gICAgICAgIHByb2dyZXNzVGV4dC50ZXh0ID0gYCR7ZGF0YS5jdXJyZW50U3RhZ2V9LyR7ZGF0YS5tYXhTdGFnZXN9YDtcbiAgICB9XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTaG93L0hpZGVcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIHNob3dTdGFnZVNlbGVjdChzdGFnZURhdGEpIHtcbiAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBTaG93aW5nIHN0YWdlIHNlbGVjdGlvbiBVSScpO1xuICAgIGlmICghY29udGFpbmVyUGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gRVJST1I6IENvbnRhaW5lciBub3QgaW5pdGlhbGl6ZWQsIHJlaW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgICAgIGluaXRTdGFnZVNlbGVjdCgpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lclBhbmVsKSB7XG4gICAgICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBFUlJPUjogRmFpbGVkIHRvIGluaXRpYWxpemUgY29udGFpbmVyJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3VycmVudFN0YWdlRGF0YSA9IHN0YWdlRGF0YSB8fCBnZXRNb2NrU3RhZ2VEYXRhKCk7XG4gICAgLy8gQ3JlYXRlIG5vZGVzXG4gICAgY3JlYXRlU3RhZ2VOb2RlcyhjdXJyZW50U3RhZ2VEYXRhKTtcbiAgICAvLyBTaG93IGNvbnRhaW5lciAtIOehruS/neaJgOacieagt+W8j+ato+ehrlxuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgY29udGFpbmVyUGFuZWwuc3R5bGUub3BhY2l0eSA9ICcxLjAnO1xuICAgIGNvbnRhaW5lclBhbmVsLnN0eWxlLnpJbmRleCA9ICc5MDAwJztcbiAgICBpc1Zpc2libGUgPSB0cnVlO1xuICAgIC8vIFBsYXkgc291bmRcbiAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuICAgICQuTXNnKGBbU3RhZ2VTZWxlY3RdIENvbnRhaW5lciB2aXNpYmlsaXR5OiAke2NvbnRhaW5lclBhbmVsLnN0eWxlLnZpc2liaWxpdHl9YCk7XG4gICAgJC5Nc2coYFtTdGFnZVNlbGVjdF0gQ29udGFpbmVyIHpJbmRleDogJHtjb250YWluZXJQYW5lbC5zdHlsZS56SW5kZXh9YCk7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gU3RhZ2Ugc2VsZWN0aW9uIFVJIGlzIG5vdyB2aXNpYmxlJyk7XG59XG5mdW5jdGlvbiBoaWRlU3RhZ2VTZWxlY3QoKSB7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gSGlkaW5nIHN0YWdlIHNlbGVjdGlvbiBVSScpO1xuICAgIGlmICghY29udGFpbmVyUGFuZWwpXG4gICAgICAgIHJldHVybjtcbiAgICBjb250YWluZXJQYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICBpc1Zpc2libGUgPSBmYWxzZTtcbiAgICBzZWxlY3RlZE5vZGUgPSBudWxsO1xuICAgIGhpZGVOb2RlVG9vbHRpcCgpO1xuICAgIC8vIE5vdGlmeSBzZXJ2ZXJcbiAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcignc3RhZ2Vfc2VsZWN0X2Nsb3NlZCcsIHt9KTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZVN0YWdlU2VsZWN0KCkge1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgaGlkZVN0YWdlU2VsZWN0KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93U3RhZ2VTZWxlY3QoKTtcbiAgICB9XG59XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBFdmVudCBIYW5kbGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gcmVnaXN0ZXJFdmVudHMoKSB7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gUmVnaXN0ZXJpbmcgZXZlbnQgaGFuZGxlcnMuLi4nKTtcbiAgICAvLyDlj6rkvb/nlKggR2FtZUV2ZW50c++8jOS4jeS9v+eUqCBSZWdpc3RlckV2ZW50SGFuZGxlclxuICAgIC8vIFJlZ2lzdGVyRXZlbnRIYW5kbGVyIOWPquaUr+aMgeWGhee9ruS6i+S7tuexu+Wei++8jOiHquWumuS5ieS6i+S7tuS8muaKpemUmVxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdvcGVuX3N0YWdlX3NlbGVjdCcsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIOKchSBSZWNlaXZlZCBvcGVuX3N0YWdlX3NlbGVjdCBldmVudCcpO1xuICAgICAgICBzaG93U3RhZ2VTZWxlY3QoZGF0YSk7XG4gICAgfSk7XG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2Nsb3NlX3N0YWdlX3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0gUmVjZWl2ZWQgY2xvc2Vfc3RhZ2Vfc2VsZWN0IGV2ZW50Jyk7XG4gICAgICAgIGhpZGVTdGFnZVNlbGVjdCgpO1xuICAgIH0pO1xuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCd1cGRhdGVfc3RhZ2VfZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIFJlY2VpdmVkIHN0YWdlIGRhdGEgdXBkYXRlJyk7XG4gICAgICAgIGlmIChpc1Zpc2libGUgJiYgY3VycmVudFN0YWdlRGF0YSkge1xuICAgICAgICAgICAgY3VycmVudFN0YWdlRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICBjcmVhdGVTdGFnZU5vZGVzKGN1cnJlbnRTdGFnZURhdGEpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ29wZW5fbGV2ZWxfc2VsZWN0aW9uJywgKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSDinIUgUmVjZWl2ZWQgb3Blbl9sZXZlbF9zZWxlY3Rpb24gZXZlbnQnKTtcbiAgICAgICAgc2hvd1N0YWdlU2VsZWN0KCk7XG4gICAgfSk7XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0g4pyFIEV2ZW50IGhhbmRsZXJzIHJlZ2lzdGVyZWQnKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEdsb2JhbCBBUElcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGV4cG9zZUdsb2JhbEFQSSgpIHtcbiAgICAkLk1zZygnW1N0YWdlU2VsZWN0XSBFeHBvc2luZyBnbG9iYWwgQVBJLi4uJyk7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3QgPSB7XG4gICAgICAgIHNob3c6IHNob3dTdGFnZVNlbGVjdCxcbiAgICAgICAgaGlkZTogaGlkZVN0YWdlU2VsZWN0LFxuICAgICAgICB0b2dnbGU6IHRvZ2dsZVN0YWdlU2VsZWN0LFxuICAgICAgICBpc1Zpc2libGU6ICgpID0+IGlzVmlzaWJsZSxcbiAgICAgICAgZ2V0U2VsZWN0ZWROb2RlOiAoKSA9PiBzZWxlY3RlZE5vZGUsXG4gICAgICAgIHRlc3Q6ICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCdbU3RhZ2VTZWxlY3RdIFRlc3QgZnVuY3Rpb24gY2FsbGVkJyk7XG4gICAgICAgICAgICBzaG93U3RhZ2VTZWxlY3QoKTtcbiAgICAgICAgICAgIHJldHVybiAnU3RhZ2UgU2VsZWN0IFVJIHNob3duJztcbiAgICAgICAgfVxuICAgIH07XG4gICAgJC5Nc2coJ1tTdGFnZVNlbGVjdF0g4pyFIEdsb2JhbCBBUEkgZXhwb3NlZCBzdWNjZXNzZnVsbHknKTtcbiAgICAkLk1zZyhgW1N0YWdlU2VsZWN0XSBWZXJpZnk6IGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3QgPSAkeyEhZ2xvYmFsVGhpcy5TdGFnZVNlbGVjdH1gKTtcbn1cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEluaXRpYWxpemF0aW9uXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4kLk1zZygnW1N0YWdlU2VsZWN0XSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4kLk1zZygnW1N0YWdlU2VsZWN0XSBTdGFnZSBTZWxlY3Rpb24gVUkgTG9hZGluZy4uLicpO1xuJC5Nc2coJ1tTdGFnZVNlbGVjdF0gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuLy8g56uL5Y2z5Yid5aeL5YyWXG5pbml0U3RhZ2VTZWxlY3QoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==