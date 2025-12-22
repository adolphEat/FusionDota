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
    
    // 🔑 关键：根面板必须允许事件传递（但自身不拦截）
    // hittest="false" 会阻止所有子元素的事件，所以不设置或设置为 true
    // 但为了不影响其他UI，我们让根面板不拦截事件，但允许事件传递到子元素
    rootPanel.hittest = false;  // 根面板不拦截，但允许事件传递
    
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
    
    // 🔑 关键：设置拖拽属性（需要 draggable 才能拖拽）
    slot.hittest = true;
    slot.draggable = true;  // 需要设置为 true 才能拖拽
    
    // 🔑 确保容器允许拖拽（重要！）
    if (slotsContainer) {
        slotsContainer.hittest = true;  // 容器必须能接收事件
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
    const slot = inventorySlots[slotIndex];
    if (!slot) return;
    
    slot.piece = piece;
    
    const slotPanel = $(`#${slot.panelId}`) as Panel;
    if (!slotPanel) return;
    
    // 清空槽位
    slotPanel.RemoveAndDeleteChildren();
    
    // 🔑 清空后确保拖拽属性（防御性编程）
    slotPanel.hittest = true;
    slotPanel.draggable = true;
    
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
    // 🔑 确保可以接收拖拽事件
    slotPanel.hittest = true;
    slotPanel.draggable = true;  // 需要设置为 true 才能拖拽
    
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

function setupDragEvents(slotPanel: Panel, piece: ChessPiece, slotIndex: number): void {
    // 🔑 确保可以接收拖拽事件
    slotPanel.hittest = true;
    slotPanel.draggable = true;  // 需要设置为 true 才能拖拽
    
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
            shouldHandleClick = false;  // 标记为不再处理
        };
        
        // 设置事件监听（只设置一次，通过标志控制）
        contextPanel.SetPanelEvent('onactivate', deployOnClick);
        
        // 30秒后自动清理
        $.Schedule(30.0, () => {
            if (draggedPiece && isDragging && draggedSlotIndex === slotIndex) {
                $.Msg(`[Inventory] ⚠️ 部署超时，清理状态`);
                cleanupDrag();
                shouldHandleClick = false;  // 标记为不再处理
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
            shouldHandleClick = false;  // 标记为不再处理
        };
        
        // 设置事件监听（只设置一次，通过标志控制）
        contextPanel.SetPanelEvent('onactivate', deployOnClick);
        
        // 30秒后自动清理
        $.Schedule(30.0, () => {
            if (draggedPiece && isDragging && draggedSlotIndex === slotIndex) {
                $.Msg(`[Inventory] ⚠️ 部署超时，清理状态`);
                cleanupDrag();
                shouldHandleClick = false;  // 标记为不再处理
            }
        });
    });
    
    // 清理拖拽状态
    function cleanupDrag() {
        // 恢复槽位样式
        const slot = $(`#InventorySlot_${draggedSlotIndex}`) as Panel;
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
    slotPanel.SetPanelEvent('ondragstart', (panelId: string, dragCallbacks: any) => {
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
            } catch (e) {
                $.Msg(`[Inventory] ❌ 设置拖拽数据时出错: ${e}`);
            }
        } else {
            $.Msg(`[Inventory] ❌ dragCallbacks 为 null 或 undefined!`);
        }
        
        return true;
    });
    
    slotPanel.SetPanelEvent('ondragend', (panelId: string, draggedPanel: Panel) => {
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

function createDragDisplayPanel(piece: ChessPiece): Panel {
    const display = $.CreatePanel('Panel', $.GetContextPanel(), 'DragDisplay');
    display.style.width = '80px';
    display.style.height = '80px';
    display.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    display.style.border = `2px solid ${INVENTORY_THEME.borderGold}`;
    display.style.borderRadius = '8px';
    display.style.overflow = 'clip';
    
    // 使用 DOTAHeroImage 显示英雄头像
    const heroImage = $.CreatePanel('DOTAHeroImage', display, 'DragHeroImage') as DOTAHeroImage;
    heroImage.style.width = '100%';
    heroImage.style.height = '100%';
    
    const heroName = getFullHeroName(piece.unitName, piece.id);
    heroImage.heroname = heroName;
    heroImage.heroimagestyle = 'portrait';
    
    return display;
}


function deployPieceAtCursor(piece: ChessPiece, slotIndex: number): void {
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

