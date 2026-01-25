// @ts-nocheck
/**
 * 海克斯强化技能显示面板
 * 显示玩家当前拥有的所有强化技能
 */

$.Msg('🔮 Augment Panel script loading...');

// 玩家强化数据接口
interface PlayerAugment {
    id: string;
    displayName: string;
    icon: string;
    rarity: string;
}

// 全局状态
let playerAugments: PlayerAugment[] = [];
let panelCreated = false;

/**
 * 创建强化面板
 */
function createAugmentPanel(): Panel | null {
    if (panelCreated) {
        $.Msg('[AugmentPanel] Panel already created');
        return $('#PlayerAugmentPanel') as Panel;
    }

    const root = $.GetContextPanel();
    if (!root) {
        $.Msg('[AugmentPanel] ERROR: Root panel not found');
        return null;
    }

    $.Msg('[AugmentPanel] Creating augment panel...');
    
    const panel = $.CreatePanel('Panel', root, 'PlayerAugmentPanel');
    panel.style.position = '20px 80px 0px';  // 左上角，留出空间给其他UI
    panel.style.width = '220px';
    panel.style.maxHeight = '600px';
    panel.style.flowChildren = 'down';
    panel.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    panel.style.padding = '12px';
    panel.style.borderRadius = '8px';
    panel.style.border = '2px solid rgba(255, 215, 0, 0.4)';
    panel.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.5)';
    panel.style.visibility = 'collapse';  // 默认隐藏
    panel.hittest = false;  // 不拦截鼠标事件
    
    // 标题
    const title = $.CreatePanel('Label', panel, 'AugmentPanelTitle');
    title.text = '强化技能';
    title.style.fontSize = '20px';
    title.style.color = '#ffd700';
    title.style.fontWeight = 'bold';
    title.style.horizontalAlign = 'center';
    title.style.marginBottom = '10px';
    title.style.textShadow = '2px 2px 6px rgba(0, 0, 0, 0.8)';
    title.hittest = false;
    
    // 分隔线
    const separator = $.CreatePanel('Panel', panel, 'AugmentSeparator');
    separator.style.width = '100%';
    separator.style.height = '2px';
    separator.style.backgroundColor = 'rgba(255, 215, 0, 0.3)';
    separator.style.marginBottom = '10px';
    separator.hittest = false;
    
    // 技能列表容器
    const list = $.CreatePanel('Panel', panel, 'AugmentList');
    list.style.flowChildren = 'down';
    list.style.width = '100%';
    list.hittest = false;
    
    // 提示文本（当没有强化时显示）
    const emptyHint = $.CreatePanel('Label', list, 'AugmentEmptyHint');
    emptyHint.text = '暂无强化技能';
    emptyHint.style.fontSize = '14px';
    emptyHint.style.color = '#888888';
    emptyHint.style.horizontalAlign = 'center';
    emptyHint.style.marginTop = '10px';
    emptyHint.hittest = false;
    
    panelCreated = true;
    $.Msg('[AugmentPanel] Panel created successfully');
    return panel;
}

/**
 * 更新强化面板内容
 */
function updateAugmentPanel(augments: PlayerAugment[]): void {
    $.Msg(`[AugmentPanel] Updating panel with ${augments.length} augments`);
    
    playerAugments = augments;
    
    const panel = $('#PlayerAugmentPanel') as Panel;
    const list = $('#AugmentList') as Panel;
    const emptyHint = $('#AugmentEmptyHint') as Panel;
    
    if (!list) {
        $.Msg('[AugmentPanel] ERROR: List not found');
        return;
    }
    
    // 清空现有内容（保留提示文本）
    const children = list.Children();
    for (const child of children) {
        if (child.id !== 'AugmentEmptyHint') {
            child.DeleteAsync(0);
        }
    }
    
    // 显示/隐藏提示文本
    if (emptyHint) {
        emptyHint.style.visibility = augments.length === 0 ? 'visible' : 'collapse';
    }
    
    // 显示/隐藏整个面板
    if (panel) {
        panel.style.visibility = augments.length > 0 ? 'visible' : 'collapse';
    }
    
    // 创建强化项目
    augments.forEach((aug, index) => {
        const item = $.CreatePanel('Panel', list, `Augment_${aug.id}`);
        item.style.flowChildren = 'right';
        item.style.marginBottom = '8px';
        item.style.height = '36px';
        item.style.padding = '4px';
        item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        item.style.borderRadius = '6px';
        item.hittest = false;
        
        // 图标
        const icon = $.CreatePanel('Image', item, `AugmentIcon_${index}`) as ImagePanel;
        icon.SetImage(aug.icon || 'file://{images}/default_item.png');
        icon.style.width = '32px';
        icon.style.height = '32px';
        icon.style.marginRight = '8px';
        icon.hittest = false;
        
        // 名称
        const name = $.CreatePanel('Label', item, `AugmentName_${index}`);
        name.text = aug.displayName;
        name.style.fontSize = '14px';
        name.style.color = getRarityTextColor(aug.rarity);
        name.style.verticalAlign = 'center';
        name.style.fontWeight = 'bold';
        name.hittest = false;
    });
    
    $.Msg(`[AugmentPanel] Panel updated with ${augments.length} augments`);
}

/**
 * 根据稀有度获取文本颜色
 */
function getRarityTextColor(rarity: string): string {
    switch (rarity) {
        case 'common': return '#c0c0c0';
        case 'rare': return '#4da6ff';
        case 'epic': return '#b366ff';
        default: return '#ffffff';
    }
}

/**
 * 显示强化面板
 */
function showAugmentPanel(): void {
    const panel = $('#PlayerAugmentPanel') as Panel;
    if (panel) {
        panel.style.visibility = 'visible';
    }
}

/**
 * 隐藏强化面板
 */
function hideAugmentPanel(): void {
    const panel = $('#PlayerAugmentPanel') as Panel;
    if (panel) {
        panel.style.visibility = 'collapse';
    }
}

// ==================================================
// 事件监听
// ==================================================

function registerEvents(): void {
    $.Msg('[AugmentPanel] Registering events...');
    
    // 监听强化更新事件
    GameEvents.Subscribe('update_player_augments', (data: any) => {
        $.Msg('[AugmentPanel] Received augment update event');
        updateAugmentPanel(data.augments || []);
    });
    
    // 监听游戏重置事件
    GameEvents.Subscribe('game_reset', () => {
        $.Msg('[AugmentPanel] Game reset, clearing augments');
        updateAugmentPanel([]);
    });
    
    $.Msg('[AugmentPanel] Events registered');
}

// ==================================================
// 初始化
// ==================================================

function initialize(): void {
    $.Msg('[AugmentPanel] ========================================');
    $.Msg('[AugmentPanel] Initializing...');
    
    // 延迟创建以确保根面板就绪
    $.Schedule(0.1, () => {
        createAugmentPanel();
        registerEvents();
        $.Msg('[AugmentPanel] ✅ Initialization complete');
    });
}

// 立即初始化
initialize();

// 暴露全局API（用于调试）
(globalThis as any).AugmentPanel = {
    show: showAugmentPanel,
    hide: hideAugmentPanel,
    update: updateAugmentPanel,
    test: () => {
        // 测试数据
        updateAugmentPanel([
            { id: 'vampiric_vitality', displayName: '吸血活力', icon: 'file://{images}/spellicons/bloodseeker_blood_bath.png', rarity: 'common' },
            { id: 'staff_will', displayName: '意志之杖', icon: 'file://{images}/spellicons/abaddon_death_coil.png', rarity: 'rare' }
        ]);
    }
};

$.Msg('[AugmentPanel] Script loaded');
