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
(globalThis as any).StageSelect = {
    show: () => $.Msg('[StageSelect] Early API: show called before init'),
    test: () => $.Msg('[StageSelect] Early API: test called before init')
};
$.Msg('[StageSelect] Early global API exposed');

// ============================================================================
// Types & Interfaces
// ============================================================================

type NodeType = 'normal' | 'hard' | 'boss' | 'event';
type NodeStatus = 'locked' | 'available' | 'current' | 'completed';

interface StageNode {
    id: string;
    name: string;
    type: NodeType;
    status: NodeStatus;
    x: number;  // Position percentage (0-100)
    y: number;
    description: string;
    rewards: string;
    icon: string;
    connections: string[];  // Connected node IDs
}

interface StageData {
    currentStage: number;
    maxStages: number;
    nodes: StageNode[];
}

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

const NODE_ICONS: Record<NodeType, string> = {
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

let rootPanel: Panel | null = null;
let containerPanel: Panel | null = null;
let selectedNode: StageNode | null = null;
let currentStageData: StageData | null = null;
let isVisible = false;

// ============================================================================
// Mock Data (for testing)
// ============================================================================

function getMockStageData(): StageData {
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
function createStageSelectContainer(): Panel | null {
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
    container.style.visibility = 'collapse';  // 默认隐藏
    container.style.zIndex = '9000';
    container.hittest = false;
    
    // 创建遮罩
    const mask = $.CreatePanel('Panel', container, 'StageSelectMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    mask.hittest = true;  // 拦截点击
    
    $.Msg('[StageSelect] ✅ Container created successfully');
    return container;
}

function initStageSelect(): void {
    $.Msg('[StageSelect] ========================================');
    $.Msg('[StageSelect] Initializing...');
    
    // 创建容器
    containerPanel = createStageSelectContainer();
    if (!containerPanel) {
        $.Msg('[StageSelect] ❌ Failed to create container, aborting');
        return;
    }
    
    rootPanel = $.GetContextPanel();
    rootPanel?.AddClass('stage_select_root');
    
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
    } catch (e) {
        $.Msg(`[StageSelect] ❌ ERROR creating UI: ${e}`);
    }
    
    // 注册事件
    registerEvents();
    
    // 暴露全局API
    exposeGlobalAPI();
    
    $.Msg('[StageSelect] ✅ Initialization complete');
    $.Msg('[StageSelect] ========================================');
}

function createBackground(parent: Panel): void {
    const bg = $.CreatePanel('Panel', parent, 'StageSelectBg');
    bg.AddClass('stage_select_bg');
    bg.style.backgroundImage = `url("${STAGE_BACKGROUNDS[0]}")`;
    bg.style.backgroundSize = 'cover';
    bg.style.backgroundPosition = 'center';
}

function createHeader(parent: Panel): void {
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

function createMapArea(parent: Panel): void {
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

function createFooter(parent: Panel): void {
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
        } else {
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

function createButton(parent: Panel, id: string, text: string, isPrimary: boolean): Panel {
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

function createProgressBar(parent: Panel): void {
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

function createStageNodes(data: StageData): void {
    // 层级：containerPanel > StageMapContainer > StageMapContent > StageNodesLayer
    const mapContainer = containerPanel?.FindChild('StageMapContainer');
    const mapContent = mapContainer?.FindChild('StageMapContent');
    const nodesLayer = mapContent?.FindChild('StageNodesLayer');
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

function createStageNode(parent: Panel, node: StageNode): Panel {
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
    const icon = $.CreatePanel('Image', frame, `NodeIcon_${node.id}`) as ImagePanel;
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
    } else if (node.status === 'completed') {
        nodePanel.style.opacity = '0.6';
    } else if (node.status === 'current') {
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

function drawConnections(parent: Panel, nodes: StageNode[]): void {
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

function drawConnection(parent: Panel, from: StageNode, to: StageNode): void {
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
    } else {
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

function selectNode(node: StageNode): void {
    $.Msg(`[StageSelect] Node selected: ${node.name} (${node.type})`);
    Game.EmitSound('General.ButtonClick');
    
    // Clear previous selection
    if (selectedNode) {
        const prevPanel = containerPanel?.FindChildInLayoutFile(`Node_${selectedNode.id}`);
        if (prevPanel) {
            prevPanel.RemoveClass('selected');
        }
    }
    
    selectedNode = node;
    
    // Highlight new selection
    const nodePanel = containerPanel?.FindChildInLayoutFile(`Node_${node.id}`);
    if (nodePanel) {
        nodePanel.AddClass('selected');
        nodePanel.style.transform = 'scale3d(1.2, 1.2, 1.0)';
    }
    
    // Update start button
    updateStartButton();
}

function updateStartButton(): void {
    const startBtn = containerPanel?.FindChildInLayoutFile('StartStageBtn');
    if (!startBtn) return;
    
    if (selectedNode && selectedNode.status === 'available') {
        startBtn.RemoveClass('stage_btn_disabled');
        startBtn.style.opacity = '1.0';
    } else {
        startBtn.AddClass('stage_btn_disabled');
        startBtn.style.opacity = '0.5';
    }
}

function startStage(node: StageNode): void {
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

let tooltipPanel: Panel | null = null;

function showNodeTooltip(nodePanel: Panel, node: StageNode): void {
    hideNodeTooltip();
    
    tooltipPanel = $.CreatePanel('Panel', containerPanel!, 'NodeTooltip');
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

function hideNodeTooltip(): void {
    if (tooltipPanel) {
        tooltipPanel.DeleteAsync(0);
        tooltipPanel = null;
    }
}

function getTypeDisplayName(type: NodeType): string {
    const names: Record<NodeType, string> = {
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

function updateProgress(data: StageData): void {
    const progressFill = containerPanel?.FindChildInLayoutFile('ProgressBarFill');
    const progressText = containerPanel?.FindChildInLayoutFile('ProgressText') as LabelPanel;
    
    if (progressFill && progressText) {
        const percentage = (data.currentStage / data.maxStages) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.text = `${data.currentStage}/${data.maxStages}`;
    }
}

// ============================================================================
// Show/Hide
// ============================================================================

function showStageSelect(stageData?: StageData): void {
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

function hideStageSelect(): void {
    $.Msg('[StageSelect] Hiding stage selection UI');
    
    if (!containerPanel) return;
    
    containerPanel.style.visibility = 'collapse';
    isVisible = false;
    selectedNode = null;
    
    hideNodeTooltip();
    
    // Notify server
    GameEvents.SendCustomGameEventToServer('stage_select_closed', {});
}

function toggleStageSelect(): void {
    if (isVisible) {
        hideStageSelect();
    } else {
        showStageSelect();
    }
}

// ============================================================================
// Event Handlers
// ============================================================================

function registerEvents(): void {
    $.Msg('[StageSelect] Registering event handlers...');
    
    // 只使用 GameEvents，不使用 RegisterEventHandler
    // RegisterEventHandler 只支持内置事件类型，自定义事件会报错
    
    GameEvents.Subscribe('open_stage_select', (data: any) => {
        $.Msg('[StageSelect] ✅ Received open_stage_select event');
        showStageSelect(data);
    });
    
    GameEvents.Subscribe('close_stage_select', () => {
        $.Msg('[StageSelect] Received close_stage_select event');
        hideStageSelect();
    });
    
    GameEvents.Subscribe('update_stage_data', (data: StageData) => {
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

function exposeGlobalAPI(): void {
    $.Msg('[StageSelect] Exposing global API...');
    
    // @ts-ignore
    (globalThis as any).StageSelect = {
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
    $.Msg(`[StageSelect] Verify: globalThis.StageSelect = ${!!(globalThis as any).StageSelect}`);
}

// ============================================================================
// Initialization
// ============================================================================

$.Msg('[StageSelect] ========================================');
$.Msg('[StageSelect] Stage Selection UI Loading...');
$.Msg('[StageSelect] ========================================');

// 立即初始化
initStageSelect();

