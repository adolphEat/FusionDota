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
let isDragging: boolean = false;  // 🔑 全局拖拽状态
let currentDragInterval: any = null;  // 🔑 当前拖拽的定时器引用
let currentMouseUpHandler: any = null;  // 🔑 当前鼠标释放事件处理器引用
let dragCapturePanel: Panel | null = null;  // 🔑 拖拽捕获面板

const MAX_SLOTS = 12; // 最大备战席位数

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
    
    // 🔑 关键：根面板必须允许事件传递
    // 注意：hittest 控制面板是否拦截鼠标事件
    // false = 不拦截，事件会穿透到子元素
    // true = 拦截，事件会被面板接收
    // 我们需要设置为 true，让子元素能接收事件
    rootPanel.hittest = true;  // 允许事件传递到子元素
    
    // 🔑 如果容器已存在，先删除（防止重复创建导致多个槽位）
    const existingContainer = $('#InventoryContainer') as Panel;
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

function createContainer(): void {
    containerPanel = $.CreatePanel('Panel', rootPanel!, 'InventoryContainer');
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
    containerPanel.style.zIndex = '1000';  // 🔑 确保背包在最上层
    
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
    closeBtn.style.zIndex = '10001';  // 🔑 确保关闭按钮在最上层，高于捕获面板
    
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
    const existingSlotsContainer = $('#InventorySlotsContainer') as Panel;
    if (existingSlotsContainer) {
        existingSlotsContainer.DeleteAsync(0);
        $.Msg('[Inventory] 删除旧的槽位容器');
    }
    
    slotsContainer = $.CreatePanel('Panel', containerPanel, 'InventorySlotsContainer');
    // 计算固定宽度：12个槽位 * (90px宽度 + 10px左右margin) + 10px容器padding = 1210px
    slotsContainer.style.width = '1210px';  // 固定宽度，确保所有槽位紧密排列
    slotsContainer.style.height = '100px';
    slotsContainer.style.flowChildren = 'right';
    slotsContainer.style.horizontalAlign = 'left';  // 靠左对齐，槽位从左到右依次排列
    slotsContainer.style.verticalAlign = 'center';
    slotsContainer.style.padding = '5px';
    // 🔑 关键：容器必须能接收鼠标事件，否则拖拽无法工作
    slotsContainer.hittest = true;
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
    
    // 🔑 关键：确保可以接收鼠标事件
    slot.hittest = true;
    slot.draggable = false;  // Panorama可能不支持draggable属性，使用鼠标事件模拟
    
    // 🔑 确保容器允许接收事件（重要！）
    if (slotsContainer) {
        slotsContainer.hittest = true;  // 容器必须能接收事件
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
    emptyLabel.hittest = false;  // 子元素不拦截事件
    
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
function getFullHeroName(unitName: string, pieceId: string): string {
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

function updateSlot(slotIndex: number, piece: ChessPiece | null): void {
    $.Msg(`[Inventory] 🔄 updateSlot 被调用: slotIndex=${slotIndex}, piece=${piece ? piece.displayName : 'null'}`);
    
    const slot = inventorySlots[slotIndex];
    if (!slot) {
        $.Msg(`[Inventory] ⚠️ updateSlot: 槽位 ${slotIndex} 不存在`);
        return;
    }
    
    slot.piece = piece;
    
    const slotPanel = $(`#${slot.panelId}`) as Panel;
    if (!slotPanel) {
        $.Msg(`[Inventory] ⚠️ updateSlot: 槽位面板 ${slot.panelId} 不存在`);
        return;
    }
    
    $.Msg(`[Inventory] ✅ updateSlot: 找到槽位面板 ${slot.panelId}，准备${piece ? '更新' : '清空'}`);
    
    // 清空槽位
    slotPanel.RemoveAndDeleteChildren();
    
    // 🔑 清空后确保可以接收鼠标事件（防御性编程）
    slotPanel.hittest = true;
    slotPanel.draggable = false;  // Panorama可能不支持draggable属性
    
    if (piece) {
        renderPieceInSlot(slotPanel, piece, slotIndex);
    } else {
        // 🔑 清空槽位时，强制恢复默认样式（确保选中高亮被清除）
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
        slotPanel.style.border = `2px solid ${INVENTORY_THEME.borderColor}`;
        slotPanel.style.opacity = '1.0';
        slotPanel.style.transform = 'scale3d(1.0, 1.0, 1.0)';
        slotPanel.style.boxShadow = 'none';  // 🔑 清除稀有度发光效果
        $.Msg(`[Inventory] ✅ updateSlot: 已恢复槽位 ${slotIndex} 的默认样式`);
        
        // 🔑 清除槽位的事件监听器（空槽不需要点击选择功能）
        slotPanel.SetPanelEvent('onactivate', () => {});
        slotPanel.SetPanelEvent('onmouseover', () => {});
        slotPanel.SetPanelEvent('onmouseout', () => {});
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

function renderPieceInSlot(slotPanel: Panel, piece: ChessPiece, slotIndex: number): void {
    // 🔑 确保可以接收鼠标事件
    slotPanel.hittest = true;
    slotPanel.draggable = false;  // Panorama可能不支持draggable属性，使用鼠标事件模拟
    
    $.Msg(`[Inventory] 📦 渲染棋子到槽位 ${slotIndex}: ${piece.displayName}, hittest=${slotPanel.hittest}`);
    
    // 使用 DOTA2 内置的 DOTAHeroImage 面板显示英雄头像
    const heroImage = $.CreatePanel('DOTAHeroImage', slotPanel, `HeroImage_${slotIndex}`) as DOTAHeroImage;
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
    costLabel.hittest = false;  // 不拦截事件
    
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
    nameLabel.hittest = false;  // 不拦截事件
    
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
let dragStartPos: { x: number; y: number } | null = null;
let dragGhostPanel: Panel | null = null;

function setupDragEvents(slotPanel: Panel, piece: ChessPiece, slotIndex: number): void {
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
    function setSelection(slotPanel: Panel, piece: ChessPiece, slotIndex: number): void {
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
let boardClickCapture: Panel | null = null;

// 设置棋盘点击处理器（使用专门的点击捕获面板）
function setupBoardClickHandler(): void {
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
    boardClickCapture.style.verticalAlign = 'top';  // 🔑 从顶部开始，不覆盖底部的背包UI
    boardClickCapture.style.zIndex = '50';  // 🔑 较低的 zIndex，确保不会阻挡其他 UI
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
function clearSelection(): void {
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
        const slotPanel = $(`#InventorySlot_${draggedSlotIndex}`) as Panel;
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
            } else {
                $.Msg(`[Inventory] ⚠️ 槽位 ${draggedSlotIndex} 不存在于 inventorySlots`);
            }
        } else {
            $.Msg(`[Inventory] ⚠️ 槽位面板 InventorySlot_${draggedSlotIndex} 不存在`);
        }
    }
    
    // 清理拖拽图标（如果有）
    if (dragGhostPanel) {
        dragGhostPanel.DeleteAsync(0);
        dragGhostPanel = null;
    }
    
    // 🔑 删除点击覆盖层（如果存在）
    const overlay = $('#BoardClickOverlay') as Panel;
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
function cleanupDrag(): void {
    clearSelection();
}

// 创建跟随鼠标的拖拽图标
function createDragGhost(piece: ChessPiece, x: number, y: number): void {
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
    let dragContainer = $('#DragGhostContainer') as Panel;
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
    const heroImage = $.CreatePanel('DOTAHeroImage', dragGhostPanel, 'DragGhostHeroImage') as DOTAHeroImage;
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
function getSlotRect(slotIndex: number): { x: number; y: number; width: number; height: number } {
    const slotPanel = $(`#InventorySlot_${slotIndex}`) as Panel;
    if (!slotPanel) {
        return { x: 0, y: 0, width: 0, height: 0 };
    }
    
    // 获取槽位的实际布局位置和尺寸
    // 注意：Panorama的布局系统可能不直接提供屏幕坐标
    // 这里使用估算值，实际需要根据容器位置计算
    const slotsContainer = $('#InventorySlotsContainer') as Panel;
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
function isPointInRect(px: number, py: number, rect: { x: number; y: number; width: number; height: number }): boolean {
    return px >= rect.x && 
           px <= rect.x + rect.width && 
           py >= rect.y && 
           py <= rect.y + rect.height;
}

// 回到原位置（取消部署）
function returnToOriginalPosition(slotIndex: number): void {
    $.Msg(`[Inventory] 🔄 棋子回到原位置: 槽位 ${slotIndex}`);
    
    // 恢复槽位样式
    const slotPanel = $(`#InventorySlot_${slotIndex}`) as Panel;
    if (slotPanel) {
        slotPanel.style.backgroundColor = INVENTORY_THEME.slotBg;
        slotPanel.style.opacity = '1.0';
    }
    
    // 播放音效
    Game.EmitSound('General.Cancel');
}

function createDragOverlay(piece: ChessPiece): void {
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

function deployPieceAtCursor(piece: ChessPiece, slotIndex: number): void {
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
    } catch (e) {
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
    const slotPanelToRestore = $(`#InventorySlot_${slotIndex}`) as Panel;
    if (slotPanelToRestore) {
        slotPanelToRestore.style.backgroundColor = INVENTORY_THEME.slotBg;
        slotPanelToRestore.style.border = `2px solid ${INVENTORY_THEME.borderColor}`;
        slotPanelToRestore.style.opacity = '1.0';
        slotPanelToRestore.style.transform = 'scale3d(1.0, 1.0, 1.0)';
        $.Msg(`[Inventory] ✅ 已恢复部署槽位 ${slotIndex} 的样式`);
    } else {
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
    const boardOverlay = $('#BoardClickOverlay') as Panel;
    if (boardOverlay) {
        boardOverlay.DeleteAsync(0);
        $.Msg(`[Inventory] ✅ 已删除棋盘点击覆盖层`);
    }
    const dragContainer = $('#DragGhostContainer') as Panel;
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

function show(): void {
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
        rootPanel = $('#InventoryRoot') as Panel;
        if (!rootPanel) {
            $.Msg('[Inventory] ❌ 重新初始化失败，无法显示背包');
            return;
        }
    }
    
    // 🔑 确保根面板存在且可见
    rootPanel.style.visibility = 'visible';
    rootPanel.style.opacity = '1.0';
    rootPanel.style.zIndex = '1000';  // 🔑 确保背包在最上层
    rootPanel.hittest = true;  // 确保可以接收事件
    isVisible = true;
    
    $.Msg('[Inventory] ✅✅✅ Inventory shown');
    $.Msg(`[Inventory] 当前玩家ID: ${Players.GetLocalPlayer()}`);
    $.Msg(`[Inventory] 槽位数量: ${inventorySlots.length}`);
    $.Msg(`[Inventory] Root panel hittest: ${rootPanel.hittest}, visibility: ${rootPanel.style.visibility}, opacity: ${rootPanel.style.opacity}`);
    
    // 🔑 验证槽位面板是否存在且可点击
    for (let i = 0; i < Math.min(3, inventorySlots.length); i++) {
        const slotPanel = $(`#InventorySlot_${i}`) as Panel;
        if (slotPanel) {
            $.Msg(`[Inventory] 槽位 ${i}: ID=${slotPanel.id}, hittest=${slotPanel.hittest}, visible=${slotPanel.style.visibility}`);
        } else {
            $.Msg(`[Inventory] ⚠️ 槽位 ${i} 面板不存在！`);
        }
    }
    
    // 请求最新数据
    requestInventoryData();
}

function hide(): void {
    if (!rootPanel) return;
    
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
            const slot = $(`#InventorySlot_${draggedSlotIndex}`) as Panel;
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
    
    // 🔑 清空所有槽位（确保没有残留数据）
    for (let i = 0; i < MAX_SLOTS; i++) {
        updateSlot(i, null);
    }
    
    // 🔑 更新棋子（只更新有效的棋子，确保数据完整）
    piecesArray.forEach((piece: ChessPiece, index: number) => {
        // 检查棋子数据是否完整
        if (!piece || !piece.id || !piece.unitName) {
            $.Msg(`[Inventory] ⚠️ 跳过无效棋子数据，索引: ${index}`);
            return;
        }
        
        if (index < MAX_SLOTS) {
            $.Msg(`[Inventory] 更新槽位 ${index}: ${piece.displayName} (${piece.unitName})`);
            updateSlot(index, piece);
        } else {
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

function registerEventHandlers(): void {
    $.Msg('[Inventory] Registering event handlers...');
    
    // 接收服务端发送的背包数据
    GameEvents.Subscribe('update_inventory_data', (data: any) => {
        $.Msg('[Inventory] Received update_inventory_data event');
        updateInventoryData(data);
    });
    
    // 部署反馈
    GameEvents.Subscribe('deployment_feedback', (data: any) => {
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
            } else {
                $.Msg(`[Inventory] ⚠️ 部署成功但 slotIndex 无效: ${data.slotIndex}`);
                // 即使 slotIndex 无效，也请求最新数据
                $.Schedule(0.1, () => {
                    requestInventoryData();
                });
            }
            Game.EmitSound('General.CoinsBig');
        } else {
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

