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
const RARITY_COLORS: Record<string, string> = {
    '1': INVENTORY_THEME.textRarity.common,
    '2': INVENTORY_THEME.textRarity.uncommon,
    '3': INVENTORY_THEME.textRarity.rare,
    '4': INVENTORY_THEME.textRarity.epic,
    '5': INVENTORY_THEME.textRarity.legendary
};

// ============================================================================
// 接口定义
// ============================================================================

interface ChessPiece {
    id: string;
    unitName: string;
    displayName: string;
    rarity: number;
    cost: number;
    race: string[];
    class: string[];
    health: number;
    damage: number;
    armor: number;
    attackRange: number;
}

interface InventorySlot {
    index: number;
    piece: ChessPiece | null;
    panelId: string;
}

// ============================================================================
// 全局状态
// ============================================================================

let rootPanel: Panel | null = null;
let containerPanel: Panel | null = null;
let slotsContainer: Panel | null = null;
let isVisible = false;
let inventorySlots: InventorySlot[] = [];
let draggedPiece: ChessPiece | null = null;
let draggedSlotIndex: number = -1;
let dragOverlay: Panel | null = null;

const MAX_SLOTS = 8; // 最大备战席位数

// ============================================================================
// 初始化
// ============================================================================

function initialize(): void {
    $.Msg('[Inventory] Initializing...');
    
    // 获取或创建根面板
    rootPanel = $('#InventoryRoot') as Panel;
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

function createContainer(): void {
    containerPanel = $.CreatePanel('Panel', rootPanel!, 'InventoryContainer');
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

function initializeSlots(): void {
    if (!slotsContainer) return;
    
    inventorySlots = [];
    
    for (let i = 0; i < MAX_SLOTS; i++) {
        const slotPanel = createSlotPanel(i);
        const slot: InventorySlot = {
            index: i,
            piece: null,
            panelId: slotPanel.id
        };
        inventorySlots.push(slot);
    }
    
    $.Msg(`[Inventory] Created ${MAX_SLOTS} slots`);
}

function createSlotPanel(index: number): Panel {
    const slot = $.CreatePanel('Panel', slotsContainer!, `InventorySlot_${index}`);
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

function updateSlot(slotIndex: number, piece: ChessPiece | null): void {
    const slot = inventorySlots[slotIndex];
    if (!slot) return;
    
    slot.piece = piece;
    
    const slotPanel = $(`#${slot.panelId}`) as Panel;
    if (!slotPanel) return;
    
    // 清空槽位
    slotPanel.RemoveAndDeleteChildren();
    
    if (piece) {
        renderPieceInSlot(slotPanel, piece, slotIndex);
    } else {
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

function renderPieceInSlot(slotPanel: Panel, piece: ChessPiece, slotIndex: number): void {
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

function setupDragEvents(slotPanel: Panel, piece: ChessPiece, slotIndex: number): void {
    slotPanel.hittest = true;
    slotPanel.draggable = true;
    
    slotPanel.SetPanelEvent('ondragstart', (panelId: string, dragCallbacks: any) => {
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
    
    slotPanel.SetPanelEvent('ondragend', (panelId: string, draggedPanel: Panel) => {
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

function createDragOverlay(piece: ChessPiece): void {
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

function createDragDisplayPanel(piece: ChessPiece): Panel {
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

function deployPieceAtCursor(piece: ChessPiece, slotIndex: number): void {
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

function show(): void {
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

function hide(): void {
    if (!rootPanel) return;
    
    rootPanel.style.visibility = 'collapse';
    isVisible = false;
    $.Msg('[Inventory] Inventory hidden');
}

function toggle(): void {
    if (isVisible) {
        hide();
    } else {
        show();
    }
}

// ============================================================================
// 数据更新
// ============================================================================

function requestInventoryData(): void {
    $.Msg('[Inventory] Requesting inventory data from server...');
    GameEvents.SendCustomGameEventToServer('request_inventory_data', {
        playerId: Players.GetLocalPlayer()
    });
}

// Helper to convert Lua table (object) to JS array
function convertToArray(obj: any): any[] {
    $.Msg(`[Inventory] convertToArray - 输入类型: ${typeof obj}`);
    $.Msg(`[Inventory] convertToArray - 是数组: ${Array.isArray(obj)}`);
    
    if (Array.isArray(obj)) {
        $.Msg(`[Inventory] convertToArray - 已经是数组，长度: ${obj.length}`);
        return obj;
    }
    
    if (typeof obj === 'object' && obj !== null) {
        const arr: any[] = [];
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

function updateInventoryData(data: any): void {
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
    piecesArray.forEach((piece: ChessPiece, index: number) => {
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

function registerEventHandlers(): void {
    $.Msg('[Inventory] Registering event handlers...');
    
    // 接收服务端发送的背包数据
    GameEvents.Subscribe('update_inventory_data', (data: any) => {
        $.Msg('[Inventory] Received update_inventory_data event');
        updateInventoryData(data);
    });
    
    // 部署反馈
    GameEvents.Subscribe('deployment_feedback', (data: any) => {
        $.Msg(`[Inventory] Deployment feedback: ${data.success ? '✅' : '❌'} ${data.message}`);
        if (data.success) {
            Game.EmitSound('General.CoinsBig');
        } else {
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

function exposeGlobalAPI(): void {
    (globalThis as any).Inventory = {
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
    } catch (error) {
        $.Msg(`[Inventory] ❌ Initialization error: ${error}`);
    }
});

$.Msg('[Inventory] Script loaded successfully');

