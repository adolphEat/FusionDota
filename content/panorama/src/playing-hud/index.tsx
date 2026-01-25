// @ts-nocheck
// 战斗中的HUD界面 - 参考 Dota2CustomGame 设计风格
// 立即显示一个测试消息
Game.EmitSound('General.ButtonClick');
$.Msg('🎮 Playing HUD script is executing!');

// 主题配置（参考 Dota2CustomGame 风格）
const PLAYING_HUD_THEME = {
    background: 'rgba(15, 23, 42, 0.85)',
    panelBg: 'rgba(33, 34, 31, 0.95)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    textPrimary: '#3b82f6',
    textSecondary: '#ffffff',
    textAccent: '#ffc57a',
    success: '#4caf50',
    warning: '#ff9800',
    danger: '#f44336',
    health: '#f44336',
    mana: '#2196f3',
};

// 羁绊系统接口定义
interface SynergyTier {
    count: number;      // 需要的棋子数量
    effect: string;     // 效果描述
    active: boolean;    // 是否已激活
}

interface SynergyData {
    id: string;              // 羁绊ID
    name: string;            // 羁绊名称
    type: 'race' | 'class';  // 类型：种族或职业
    icon: string;            // 图标路径
    currentCount: number;    // 当前拥有的棋子数量
    tiers: SynergyTier[];    // 羁绊等级阶梯
}

// 羁绊图标映射 - 使用 icon 文件夹中的图标
// 注意：使用基础文件名（不含 _png 后缀和 .png 扩展名）
const SYNERGY_ICON_MAP: Record<string, string> = {
    sylph_1: 'hazard_chillingtouch',        // 仙灵 - 寒冰触摸图标
    divine_general_1: 'hazard_armor',        // 神将 - 护甲图标
    wild_1: 'hazard_enrage_2',              // 狂野 - 狂暴图标
    void_1: 'hazard_meteor',                // 虚空 - 流星图标
    berserker_1: 'hazard_attack',           // 战斗狂人 - 攻击图标
    creation: 'hazard_glimmer',             // 创造 - 闪光图标
    ranger_1: 'hazard_speed',               // 游侠 - 速度图标
    knight_1: 'hazard_frontreduction',      // 骑士 - 正面减伤图标
    warrior_1: 'hazard_armor',              // 斗士 - 护甲图标
    mage_1: 'hazard_magicresist',           // 法师 - 魔抗图标
    warlock_1: 'hazard_bubble',             // 术师 - 气泡图标
    destroyer_1: 'hazard_attack',           // 毁灭者 - 攻击图标（临时使用）
};

// 模板羁绊数据（用于UI展示）
const TEMPLATE_SYNERGIES: SynergyData[] = [
    {
        id: 'sylph_1',
        name: '仙灵',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_chillingtouch_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '仙灵的普攻有30%机率减少目标法力，并恢复5法力', active: false },
            { count: 3, effect: '仙灵的普攻有30%机率减少目标法力，并恢复10法力', active: false },
            { count: 4, effect: '仙灵的普攻有30%机率减少目标法力，并恢复15法力', active: false }
        ]
    },
    {
        id: 'divine_general_1',
        name: '神将',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_armor_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '神将获得+3护甲，+3魔抗，每次普攻命中回复全体友军10生命', active: false },
            { count: 3, effect: '神将获得+6护甲，+6魔抗，每次普攻命中回复全体友军20生命', active: false },
            { count: 5, effect: '神将获得+10护甲，+10魔抗，每次普攻命中回复全体友军40生命', active: false }
        ]
    },
    {
        id: 'wild_1',
        name: '狂野',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_enrage_2_png.png',
        currentCount: 0,
        tiers: [
            { count: 3, effect: '战斗开始后每10秒触发一次：增加10%攻击速度（可叠加）', active: false },
            { count: 4, effect: '战斗开始后每10秒触发一次：增加10%攻击速度（可叠加），增加10点物理攻击（可叠加）', active: false },
            { count: 5, effect: '战斗开始后每10秒触发一次：增加10%攻击速度（可叠加），增加10点物理攻击（可叠加），向场上生命值最低的单位投掷长矛造成伤害，目标血量低于20%时处决', active: false }
        ]
    },
    {
        id: 'void_1',
        name: '虚空',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_meteor_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '虚空单位普攻与技能附带5%真实伤害', active: false },
            { count: 5, effect: '虚空单位普攻与技能附带15%真实伤害', active: false }
        ]
    },
    {
        id: 'berserker_1',
        name: '战斗狂人',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_attack_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '场上有单位死亡时，战斗狂人获得10%攻击速度和20%全能增伤', active: false },
            { count: 4, effect: '场上有单位死亡时，战斗狂人获得30%攻击速度和50%全能增伤', active: false }
        ]
    },
    {
        id: 'creation',
        name: '创造',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_glimmer_png.png',
        currentCount: 0,
        tiers: [
            { count: 1, effect: '卡尔可以视为任何种族（即所有种族计数+1，且卡尔可以享受到所有种族的加成）', active: false }
        ]
    },
    {
        id: 'ranger_1',
        name: '游侠',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_speed_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '每过9秒，所有游侠获得3秒+50%攻速提升', active: false },
            { count: 3, effect: '每过9秒，所有游侠获得3秒+100%攻速提升', active: false },
            { count: 5, effect: '每过5秒，所有游侠获得3秒+150%攻速提升', active: false }
        ]
    },
    {
        id: 'knight_1',
        name: '骑士',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_frontreduction_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '所有友军格挡10伤害', active: false },
            { count: 4, effect: '所有友军格挡20伤害', active: false },
            { count: 5, effect: '所有友军格挡40伤害', active: false }
        ]
    },
    {
        id: 'warrior_1',
        name: '斗士',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_armor_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '所有友军获得250额外生命值，斗士单位额外获得100生命值', active: false },
            { count: 4, effect: '所有友军获得500额外生命值，斗士单位额外获得200生命值', active: false }
        ]
    },
    {
        id: 'mage_1',
        name: '法师',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_magicresist_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '所有友军获得1/秒法力恢复，法师单位获得2/秒法力恢复', active: false },
            { count: 4, effect: '所有友军获得2/秒法力恢复，法师单位获得4/秒法力恢复', active: false }
        ]
    },
    {
        id: 'warlock_1',
        name: '术师',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_bubble_png.png',
        currentCount: 0,
        tiers: [
            { count: 1, effect: '所有友军获得10%魔法抗性，术士获得20%魔法抗性', active: false },
            { count: 3, effect: '所有友军获得15%魔法抗性，术士获得30%魔法抗性', active: false }
        ]
    }
];

// 创建战斗HUD
function createPlayingHUD(): void {
    $.Msg('🎮 CREATING PLAYING HUD - NEW VERSION 22:50 🎮');
    
    // 🔑 确保隐藏原生UI（在创建HUD之前）
    hideNativeUI();
    
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('PlayingHUDContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'PlayingHUDContainer');
    container.style.width = '100%';
    container.style.height = '100%';
    // 移除hittest设置，避免Panorama API问题
    container.style.zIndex = '1000';
    container.AddClass('playing_hud_root');
    
    // 创建顶部信息栏
    createTopInfoBar(container);
    
    // 创建左侧羁绊面板
    createLeftSynergyPanel(container);
    
    // 创建右侧战斗信息面板
    createRightBattlePanel(container);
    
    // 创建底部快捷栏
    createBottomQuickBar(container);
    
}

// 创建羁绊效果条目
function createSynergyTier(parent: Panel, tier: SynergyTier, index: number): void {
    const tierItem = $.CreatePanel('Panel', parent, `SynergyTier_${index}`);
    tierItem.style.width = '100%';
    tierItem.style.height = '22px';
    tierItem.style.marginBottom = '3px';
    tierItem.style.flowChildren = 'right';
    tierItem.style.padding = '2px 5px';
    
    // 添加激活状态类
    if (tier.active) {
        tierItem.AddClass('synergy_tier');
        tierItem.AddClass('active');
    } else {
        tierItem.AddClass('synergy_tier');
        tierItem.AddClass('inactive');
    }
    
    // 状态图标
    const statusIcon = $.CreatePanel('Label', tierItem, `TierStatus_${index}`);
    statusIcon.text = tier.active ? '✓' : '○';
    statusIcon.AddClass('tier_icon');
    statusIcon.style.width = '20px';
    statusIcon.style.fontSize = '14px';
    statusIcon.style.color = tier.active ? '#ffd700' : '#64748b';
    statusIcon.style.verticalAlign = 'center';
    
    // 需求数量
    const requirement = $.CreatePanel('Label', tierItem, `TierRequirement_${index}`);
    requirement.text = `(${tier.count})`;
    requirement.AddClass('tier_requirement');
    requirement.style.width = '35px';
    requirement.style.fontSize = '11px';
    requirement.style.color = tier.active ? '#ffd700' : '#94a3b8';
    requirement.style.fontWeight = 'bold';
    requirement.style.verticalAlign = 'center';
    
    // 效果描述
    const effect = $.CreatePanel('Label', tierItem, `TierEffect_${index}`);
    effect.text = tier.effect;
    effect.AddClass('tier_effect');
    effect.style.width = 'fill-parent-flow(1)';
    effect.style.fontSize = '11px';
    effect.style.color = tier.active ? '#ffffff' : '#94a3b8';
    effect.style.verticalAlign = 'center';
}

// 创建单个羁绊项
function createSynergyItem(parent: Panel, synergy: SynergyData): void {
    const synergyItem = $.CreatePanel('Panel', parent, `Synergy_${synergy.id}`);
    synergyItem.style.width = '100%';
    synergyItem.style.marginBottom = '10px';
    synergyItem.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    synergyItem.style.borderRadius = '8px';
    synergyItem.style.padding = '8px';
    synergyItem.style.border = '2px solid rgba(100, 116, 139, 0.5)';
    synergyItem.style.flowChildren = 'down';
    
    // 判断激活状态
    const hasActiveEffect = synergy.tiers.some(tier => tier.active);
    const allEffectsActive = synergy.tiers.every(tier => tier.active);
    
    // 添加状态类
    synergyItem.AddClass('synergy_item');
    if (allEffectsActive) {
        synergyItem.AddClass('active');
        synergyItem.style.border = '2px solid rgba(255, 215, 0, 0.8)';
        synergyItem.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
    } else if (hasActiveEffect) {
        synergyItem.AddClass('partial');
        synergyItem.style.border = '2px solid rgba(59, 130, 246, 0.8)';
        synergyItem.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
    } else {
        synergyItem.AddClass('inactive');
        synergyItem.style.opacity = '0.6';
    }
    
    // 羁绊头部
    const header = $.CreatePanel('Panel', synergyItem, `SynergyHeader_${synergy.id}`);
    header.AddClass('synergy_header');
    header.style.width = '100%';
    header.style.height = '40px';
    header.style.marginBottom = '5px';
    header.style.flowChildren = 'right';
    
    // 图标 - 使用Image面板（Panorama推荐方式）
    const icon = $.CreatePanel('Image', header, `SynergyIcon_${synergy.id}`);
    icon.AddClass('synergy_icon');
    
    // 从映射中获取图标文件名并构建完整路径
    // Panorama 图标系统会自动处理 _png.png 后缀
    const iconFileName = SYNERGY_ICON_MAP[synergy.id];
    const iconPath = iconFileName 
        ? `file://{images}/custom_game/icon/${iconFileName}_png.png` 
        : synergy.icon; // 如果映射不存在，使用原路径作为后备
    
    // 调试日志：输出图标路径
    $.Msg(`🖼️ Loading synergy icon: ${synergy.name} (${synergy.id}) - ${iconPath}`);
    
    // 使用SetImage方法加载图片（需要XML预加载才能自动编译PNG）
    // 路径格式：file://{images}/... 会被自动转换为编译后的vtex_c
    icon.SetImage(iconPath);
    
    icon.style.width = '32px';
    icon.style.height = '32px';
    icon.style.marginRight = '8px';
    icon.style.verticalAlign = 'center';
    icon.style.borderRadius = '6px';
    icon.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    icon.style.backgroundColor = '#2a2a3a'; // 添加背景色便于调试
    
    // 信息区域
    const info = $.CreatePanel('Panel', header, `SynergyInfo_${synergy.id}`);
    info.AddClass('synergy_info');
    info.style.width = 'fill-parent-flow(1)';
    info.style.height = '100%';
    info.style.flowChildren = 'down';
    
    // 名称
    const name = $.CreatePanel('Label', info, `SynergyName_${synergy.id}`);
    name.AddClass('synergy_name');
    name.text = synergy.name;
    name.style.fontSize = '16px';
    name.style.fontWeight = 'bold';
    name.style.color = hasActiveEffect ? '#ffd700' : '#ffffff';
    name.style.marginBottom = '2px';
    
    // 计数
    const maxCount = Math.max(...synergy.tiers.map(t => t.count));
    const count = $.CreatePanel('Label', info, `SynergyCount_${synergy.id}`);
    count.AddClass('synergy_count');
    count.text = `${synergy.currentCount}/${maxCount}`;
    count.style.fontSize = '12px';
    count.style.color = hasActiveEffect ? '#ffc57a' : '#94a3b8';
    
    // 效果列表
    const tiersContainer = $.CreatePanel('Panel', synergyItem, `SynergyTiers_${synergy.id}`);
    tiersContainer.AddClass('synergy_tiers');
    tiersContainer.style.width = '100%';
    tiersContainer.style.flowChildren = 'down';
    tiersContainer.style.paddingLeft = '5px';
    
    // 创建每个效果条目
    synergy.tiers.forEach((tier, index) => {
        createSynergyTier(tiersContainer, tier, index);
    });
}

// 创建左侧羁绊面板
function createLeftSynergyPanel(parent: Panel): void {
    $.Msg('🎮 Creating left synergy panel...');
    
    const leftPanel = $.CreatePanel('Panel', parent, 'LeftSynergyPanel');
    leftPanel.style.width = '280px';
    leftPanel.style.maxHeight = '600px';
    leftPanel.style.horizontalAlign = 'left';
    leftPanel.style.verticalAlign = 'top';
    leftPanel.style.marginTop = '100px';
    leftPanel.style.marginLeft = '20px';
    leftPanel.style.backgroundColor = PLAYING_HUD_THEME.panelBg;
    leftPanel.style.border = `2px solid ${PLAYING_HUD_THEME.borderColor}`;
    leftPanel.style.borderRadius = '15px';
    leftPanel.style.padding = '20px';
    leftPanel.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.5)';
    leftPanel.style.flowChildren = 'down';
    leftPanel.style.overflow = 'squish scroll';
    
    // 面板标题
    const title = $.CreatePanel('Label', leftPanel, 'SynergyPanelTitle');
    title.AddClass('synergy_panel_title');
    title.text = '🎯 羁绊效果';
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.color = PLAYING_HUD_THEME.textAccent;
    title.style.marginBottom = '15px';
    title.style.textAlign = 'center';
    
    // 创建所有羁绊项
    TEMPLATE_SYNERGIES.forEach(synergy => {
        createSynergyItem(leftPanel, synergy);
    });
    
    $.Msg(`🎮 Synergy panel created with ${TEMPLATE_SYNERGIES.length} synergies`);
}

// 创建顶部信息栏
function createTopInfoBar(parent: Panel): void {
    const topBar = $.CreatePanel('Panel', parent, 'TopInfoBar');
    topBar.style.width = '700px';
    topBar.style.height = '60px';
    topBar.style.horizontalAlign = 'center';
    topBar.style.verticalAlign = 'top';
    topBar.style.marginTop = '20px';
    topBar.style.backgroundColor = PLAYING_HUD_THEME.panelBg;
    topBar.style.border = `2px solid ${PLAYING_HUD_THEME.borderColor}`;
    topBar.style.borderRadius = '15px';
    topBar.style.padding = '10px 20px';
    topBar.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.5)';
    topBar.style.flowChildren = 'right';
    
    // 1. 当前游戏状态
    const statePanel = $.CreatePanel('Panel', topBar, 'GameStatePanel');
    statePanel.style.width = '150px';
    statePanel.style.height = '100%';
    statePanel.style.flowChildren = 'down';
    
    const stateLabel = $.CreatePanel('Label', statePanel, 'GameStateLabel');
    stateLabel.text = '游戏状态';
    stateLabel.style.fontSize = '12px';
    stateLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    stateLabel.style.opacity = '0.7';
    
    const stateValue = $.CreatePanel('Label', statePanel, 'GameStateValue');
    stateValue.text = '等待中';
    stateValue.style.fontSize = '20px';
    stateValue.style.fontWeight = 'bold';
    stateValue.style.color = PLAYING_HUD_THEME.textPrimary;
    
    // 分隔线
    const divider1 = $.CreatePanel('Panel', topBar, 'Divider1');
    divider1.style.width = '1px';
    divider1.style.height = '80%';
    divider1.style.backgroundColor = PLAYING_HUD_THEME.borderColor;
    divider1.style.opacity = '0.3';
    divider1.style.verticalAlign = 'center';
    
    // 2. 备战倒计时
    const countdownPanel = $.CreatePanel('Panel', topBar, 'PreparationCountdownPanel');
    countdownPanel.style.width = '150px';
    countdownPanel.style.height = '100%';
    countdownPanel.style.flowChildren = 'down';
    
    const countdownLabel = $.CreatePanel('Label', countdownPanel, 'CountdownLabel');
    countdownLabel.text = '⏳ 备战倒计时';
    countdownLabel.style.fontSize = '12px';
    countdownLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    countdownLabel.style.opacity = '0.7';
    
    const countdownValue = $.CreatePanel('Label', countdownPanel, 'CountdownValue');
    countdownValue.text = '--';
    countdownValue.style.fontSize = '20px';
    countdownValue.style.fontWeight = 'bold';
    countdownValue.style.color = PLAYING_HUD_THEME.warning;
    
    // 分隔线
    const divider2 = $.CreatePanel('Panel', topBar, 'Divider2');
    divider2.style.width = '1px';
    divider2.style.height = '80%';
    divider2.style.backgroundColor = PLAYING_HUD_THEME.borderColor;
    divider2.style.opacity = '0.3';
    divider2.style.verticalAlign = 'center';
    
    // 3. 当前游戏时长
    const durationPanel = $.CreatePanel('Panel', topBar, 'GameDurationPanel');
    durationPanel.style.width = 'fill-parent-flow(1)';
    durationPanel.style.height = '100%';
    durationPanel.style.flowChildren = 'down';
    
    const durationLabel = $.CreatePanel('Label', durationPanel, 'GameDurationLabel');
    durationLabel.text = '⏰ 游戏时长';
    durationLabel.style.fontSize = '12px';
    durationLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    durationLabel.style.opacity = '0.7';
    
    const durationValue = $.CreatePanel('Label', durationPanel, 'GameDurationValue');
    durationValue.text = '00:00';
    durationValue.style.fontSize = '20px';
    durationValue.style.fontWeight = 'bold';
    durationValue.style.color = PLAYING_HUD_THEME.textAccent;
}

// 旧的英雄信息面板函数已删除，替换为羁绊面板

// 创建右侧战斗信息面板
function createRightBattlePanel(parent: Panel): void {
    const rightPanel = $.CreatePanel('Panel', parent, 'RightBattlePanel');
    rightPanel.style.width = '280px';
    rightPanel.style.height = '400px';
    rightPanel.style.horizontalAlign = 'right';
    rightPanel.style.verticalAlign = 'top';
    rightPanel.style.marginTop = '100px';
    rightPanel.style.marginRight = '20px';
    rightPanel.style.backgroundColor = PLAYING_HUD_THEME.panelBg;
    rightPanel.style.border = `2px solid ${PLAYING_HUD_THEME.borderColor}`;
    rightPanel.style.borderRadius = '15px';
    rightPanel.style.padding = '20px';
    rightPanel.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.5)';
    rightPanel.style.flowChildren = 'down';
    
    // 面板标题
    const title = $.CreatePanel('Label', rightPanel, 'BattlePanelTitle');
    title.text = '⚔️ 战斗信息';
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.color = PLAYING_HUD_THEME.textAccent;
    title.style.marginBottom = '15px';
    
    // 伤害统计
    createDamageStats(rightPanel);
    
    // 战斗记录
    createBattleLog(rightPanel);
}

// 创建伤害统计
function createDamageStats(parent: Panel): void {
    const statsSection = $.CreatePanel('Panel', parent, 'DamageStatsSection');
    statsSection.style.width = '100%';
    statsSection.style.height = '150px';
    statsSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    statsSection.style.borderRadius = '10px';
    statsSection.style.padding = '10px';
    statsSection.style.marginBottom = '15px';
    statsSection.style.flowChildren = 'down';
    
    const statsTitle = $.CreatePanel('Label', statsSection, 'StatsTitle');
    statsTitle.text = '📊 伤害统计';
    statsTitle.style.fontSize = '14px';
    statsTitle.style.fontWeight = 'bold';
    statsTitle.style.color = PLAYING_HUD_THEME.textSecondary;
    statsTitle.style.marginBottom = '10px';
    
    const stats = [
        { id: 'damage_dealt', label: '造成伤害:', value: '0' },
        { id: 'damage_taken', label: '受到伤害:', value: '0' },
        { id: 'healing', label: '治疗量:', value: '0' },
        { id: 'dps', label: 'DPS:', value: '0' },
    ];
    
    stats.forEach((stat, index) => {
        const statRow = $.CreatePanel('Panel', statsSection, `StatRow_${stat.id}`);
        statRow.style.width = '100%';
        statRow.style.height = '25px';
        statRow.style.marginBottom = '5px';
        statRow.style.flowChildren = 'right';
        
        const label = $.CreatePanel('Label', statRow, `${stat.id}_Label`);
        label.text = stat.label;
        label.style.fontSize = '12px';
        label.style.color = PLAYING_HUD_THEME.textSecondary;
        label.style.width = '100px';
        
        const value = $.CreatePanel('Label', statRow, `${stat.id}_Value`);
        value.text = stat.value;
        value.style.fontSize = '12px';
        value.style.fontWeight = 'bold';
        value.style.color = PLAYING_HUD_THEME.textPrimary;
        value.style.horizontalAlign = 'right';
        value.style.width = 'fill-parent-flow(1)';
    });
}

// 创建战斗记录
function createBattleLog(parent: Panel): void {
    const logSection = $.CreatePanel('Panel', parent, 'BattleLogSection');
    logSection.style.width = '100%';
    logSection.style.height = 'fill-parent-flow(1)';
    logSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    logSection.style.borderRadius = '10px';
    logSection.style.padding = '10px';
    logSection.style.flowChildren = 'down';
    logSection.style.overflow = 'squish scroll';
    
    const logTitle = $.CreatePanel('Label', logSection, 'LogTitle');
    logTitle.text = '📝 战斗记录';
    logTitle.style.fontSize = '14px';
    logTitle.style.fontWeight = 'bold';
    logTitle.style.color = PLAYING_HUD_THEME.textSecondary;
    logTitle.style.marginBottom = '10px';
    
    const logContainer = $.CreatePanel('Panel', logSection, 'LogContainer');
    logContainer.style.width = '100%';
    logContainer.style.height = 'fill-parent-flow(1)';
    logContainer.style.flowChildren = 'down';
}

// 创建底部快捷栏
function createBottomQuickBar(parent: Panel): void {
    const bottomBar = $.CreatePanel('Panel', parent, 'BottomQuickBar');
    
    const quickActions = [
        { id: 'inventory', name: '背包' },
        { id: 'skills', name: '技能' },
        { id: 'stage_select', name: '选关' },
        { id: 'test_kill', name: '测试结算' },
    ];
    
    quickActions.forEach((action, index) => {
        const btn = $.CreatePanel('Button', bottomBar, `QuickAction_${action.id}`);
        btn.AddClass('quick_action_btn');
        btn.style.width = '110px';
        btn.style.height = '60px';
        btn.style.flowChildren = 'down';
        
        // 创建一个单独的 Label 显示所有内容
        const contentLabel = $.CreatePanel('Label', btn, `${action.id}_content`);
        contentLabel.text = action.name;
        contentLabel.style.width = '100%';
        contentLabel.style.height = '100%';
        contentLabel.style.textAlign = 'center';
        contentLabel.style.verticalAlign = 'center';
        contentLabel.style.fontSize = '18px';
        contentLabel.style.color = '#ffffff';
        contentLabel.hittest = false; // 重要：不拦截点击
        
        // 绑定点击事件
        btn.SetPanelEvent('onactivate', () => {
            $.Msg(`[PlayingHUD] ✅✅✅ CLICKED: ${action.name}`);
            Game.EmitSound('General.ButtonClick');
            
            // 特殊处理：选关按钮 - 通过事件触发（不同UI组件有独立的JS上下文，无法共享globalThis）
            if (action.id === 'stage_select') {
                $.Msg('[PlayingHUD] Opening StageSelect via event...');
                // 发送事件到服务端，服务端会广播给所有客户端
                GameEvents.SendCustomGameEventToServer('open_level_selection', {});
                return;
            }
            
            // 特殊处理：背包按钮 - 切换显示/隐藏
            if (action.id === 'inventory') {
                $.Msg('[PlayingHUD] Toggling inventory...');
                // 通过服务端转发事件（像选关按钮一样）
                GameEvents.SendCustomGameEventToServer('toggle_inventory_request', {
                    playerId: Players.GetLocalPlayer()
                });
                return;
            }
            
            // 其他按钮通过服务器事件处理
            GameEvents.SendCustomGameEventToServer('quick_action', { 
                action: action.id 
            });
        });
        
        // 添加鼠标悬停效果
        btn.SetPanelEvent('onmouseover', () => {
            $.Msg(`[PlayingHUD] 👆 Mouse over: ${action.name}`);
        });
        
        $.Msg(`🎮 Created button: ${action.name}`);
    });
    
    $.Msg(`🎮 Bottom quick bar created with ${quickActions.length} buttons`);
}

// 添加战斗记录
function addBattleLog(message: string, type: string = 'info'): void {
    const logContainer = $.GetContextPanel().FindChildInLayoutFile('LogContainer');
    if (!logContainer) return;
    
    const logEntry = $.CreatePanel('Label', logContainer, `LogEntry_${Date.now()}`);
    logEntry.text = message;
    logEntry.style.fontSize = '11px';
    logEntry.style.color = type === 'kill' ? PLAYING_HUD_THEME.success : 
                           type === 'death' ? PLAYING_HUD_THEME.danger : 
                           PLAYING_HUD_THEME.textSecondary;
    logEntry.style.marginBottom = '2px';
    
    // 限制日志数量
    const children = logContainer.Children();
    if (children.length > 10) {
        children[0].DeleteAsync(0);
    }
}

// 🔑 更新羁绊UI显示
function updateSynergyUI(synergiesData: any[]): void {
    $.Msg(`[PlayingHUD] 🔄 Updating synergy UI with ${synergiesData.length} synergies`);
    
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('[PlayingHUD] ⚠️ Root panel not found');
        return;
    }
    
    // 遍历所有羁绊数据并更新UI
    for (const synergyData of synergiesData) {
        $.Msg(`[PlayingHUD] 📊 Updating ${synergyData.name}: count=${synergyData.currentCount}, active tiers=${synergyData.activeTiers.join(',')}`);
        
        // 查找对应的羁绊面板
        const synergyItem = rootPanel.FindChildInLayoutFile(`Synergy_${synergyData.id}`);
        if (!synergyItem) {
            $.Msg(`[PlayingHUD] ⚠️ Synergy item not found: ${synergyData.id}`);
            continue;
        }
        
        // 更新羁绊计数显示
        const countLabel = rootPanel.FindChildInLayoutFile(`SynergyCount_${synergyData.id}`);
        if (countLabel) {
            // 找到对应模板数据中的最大阶梯
            const templateSynergy = TEMPLATE_SYNERGIES.find(s => s.id === synergyData.id);
            if (templateSynergy) {
                const maxCount = Math.max(...templateSynergy.tiers.map(t => t.count));
                countLabel.text = `${synergyData.currentCount}/${maxCount}`;
                
                // 根据是否激活更新颜色
                const hasActiveEffect = synergyData.activeTiers.length > 0;
                countLabel.style.color = hasActiveEffect ? '#ffc57a' : '#94a3b8';
            }
        }
        
        // 更新名称颜色
        const nameLabel = rootPanel.FindChildInLayoutFile(`SynergyName_${synergyData.id}`);
        if (nameLabel) {
            const hasActiveEffect = synergyData.activeTiers.length > 0;
            nameLabel.style.color = hasActiveEffect ? '#ffd700' : '#ffffff';
        }
        
        // 更新各个阶梯的激活状态
        const templateSynergy = TEMPLATE_SYNERGIES.find(s => s.id === synergyData.id);
        if (templateSynergy) {
            templateSynergy.tiers.forEach((tier, index) => {
                const isActive = synergyData.activeTiers.includes(index);
                
                // 更新阶梯项的样式
                const tierItem = rootPanel.FindChildInLayoutFile(`SynergyTier_${index}`);
                if (tierItem && tierItem.GetParent()?.id === `SynergyTiers_${synergyData.id}`) {
                    if (isActive) {
                        tierItem.RemoveClass('inactive');
                        tierItem.AddClass('active');
                    } else {
                        tierItem.RemoveClass('active');
                        tierItem.AddClass('inactive');
                    }
                }
                
                // 更新状态图标
                const statusIcon = rootPanel.FindChildInLayoutFile(`TierStatus_${index}`);
                if (statusIcon && statusIcon.GetParent()?.GetParent()?.id === `SynergyTiers_${synergyData.id}`) {
                    statusIcon.text = isActive ? '✓' : '○';
                    statusIcon.style.color = isActive ? '#ffd700' : '#64748b';
                }
                
                // 更新需求数量颜色
                const requirement = rootPanel.FindChildInLayoutFile(`TierRequirement_${index}`);
                if (requirement && requirement.GetParent()?.GetParent()?.id === `SynergyTiers_${synergyData.id}`) {
                    requirement.style.color = isActive ? '#ffd700' : '#94a3b8';
                }
                
                // 更新效果描述颜色
                const effect = rootPanel.FindChildInLayoutFile(`TierEffect_${index}`);
                if (effect && effect.GetParent()?.GetParent()?.id === `SynergyTiers_${synergyData.id}`) {
                    effect.style.color = isActive ? '#ffffff' : '#94a3b8';
                }
            });
        }
        
        // 更新整个羁绊项的样式
        const hasActiveEffect = synergyData.activeTiers.length > 0;
        const allEffectsActive = templateSynergy && synergyData.activeTiers.length === templateSynergy.tiers.length;
        
        synergyItem.RemoveClass('inactive');
        synergyItem.RemoveClass('partial');
        synergyItem.RemoveClass('active');
        
        if (allEffectsActive) {
            synergyItem.AddClass('active');
            synergyItem.style.border = '2px solid rgba(255, 215, 0, 0.8)';
            synergyItem.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.4)';
            synergyItem.style.opacity = '1.0';
        } else if (hasActiveEffect) {
            synergyItem.AddClass('partial');
            synergyItem.style.border = '2px solid rgba(59, 130, 246, 0.8)';
            synergyItem.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
            synergyItem.style.opacity = '1.0';
        } else {
            synergyItem.AddClass('inactive');
            synergyItem.style.border = '2px solid rgba(100, 116, 139, 0.5)';
            synergyItem.style.boxShadow = 'none';
            synergyItem.style.opacity = '0.6';
        }
    }
    
    $.Msg('[PlayingHUD] ✅ Synergy UI updated');
}

// 监听游戏事件
GameEvents.Subscribe('player_stats_update', (data: any) => {
    // 更新统计数据
    if (data.gold !== undefined) {
        const goldValue = $.GetContextPanel().FindChildInLayoutFile('GoldValue');
        if (goldValue) goldValue.text = data.gold.toString();
    }
    
    if (data.kills !== undefined || data.deaths !== undefined || data.assists !== undefined) {
        const killValue = $.GetContextPanel().FindChildInLayoutFile('KillValue');
        if (killValue) {
            killValue.text = `${data.kills || 0} / ${data.deaths || 0} / ${data.assists || 0}`;
        }
    }
});

GameEvents.Subscribe('hero_stats_update', (data: any) => {
    if (data.health !== undefined && data.maxHealth !== undefined) {
        updateHealthBar(data.health, data.maxHealth);
    }
    
    if (data.mana !== undefined && data.maxMana !== undefined) {
        updateManaBar(data.mana, data.maxMana);
    }
});

GameEvents.Subscribe('battle_log', (data: any) => {
    addBattleLog(data.message, data.type);
});

// 🔑 监听战斗结束事件，确保原生UI保持隐藏
GameEvents.Subscribe('battle_ended', (data: any) => {
    $.Msg('[PlayingHUD] Battle ended - ensuring native UI stays hidden');
    hideNativeUI();
    hideMinimapElements();
});

// 🔑 监听自走棋阶段变化事件，确保原生UI保持隐藏
GameEvents.Subscribe('autochess_phase_started', (data: any) => {
    $.Msg(`[PlayingHUD] Phase changed to ${data.phase} - ensuring native UI stays hidden`);
    hideNativeUI();
    hideMinimapElements();
    
    // 🔑 如果是战斗阶段，显示playing-hud
    if (data.phase === 'battle') {
        $.Msg('[PlayingHUD] Battle phase started - showing playing HUD');
        const container = $.GetContextPanel().FindChildInLayoutFile('PlayingHUDContainer');
        if (!container) {
            createPlayingHUD();
        }
        showPlayingHUD(true);
        hideNativeUI();
        hideMinimapElements();
    }
});

// 🔑 监听显示playing-hud事件
GameEvents.Subscribe('show_playing_hud', () => {
    $.Msg('[PlayingHUD] Show playing HUD event received');
    const container = $.GetContextPanel().FindChildInLayoutFile('PlayingHUDContainer');
    if (!container) {
        createPlayingHUD();
    }
    showPlayingHUD(true);
    hideNativeUI();
    hideMinimapElements();
});

// 🔑 监听羁绊数据更新事件
GameEvents.Subscribe('synergy_data_update', (data: any) => {
    $.Msg(`[PlayingHUD] 🎯 Synergy data update received for player ${data.playerId}`);
    $.Msg(`[PlayingHUD] Synergies count: ${data.synergies.length}`);
    
    // 🔑 单机模式：检查是否为本地玩家的数据
    const localPlayerId = Players.GetLocalPlayer();
    $.Msg(`[PlayingHUD] Local player ID: ${localPlayerId}, Event player ID: ${data.playerId}`);
    
    // 单机模式下通常是玩家0，但也支持其他玩家ID
    if (data.playerId === localPlayerId) {
        $.Msg(`[PlayingHUD] ✅ 本地玩家数据，更新羁绊UI`);
        // 更新羁绊UI
        updateSynergyUI(data.synergies);
    } else {
        $.Msg(`[PlayingHUD] ⏭️ 非本地玩家数据，跳过UI更新`);
    }
});


// 显示/隐藏战斗HUD
function showPlayingHUD(show: boolean): void {
    const container = $.GetContextPanel().FindChildInLayoutFile('PlayingHUDContainer');
    if (container) {
        container.style.visibility = show ? 'visible' : 'collapse';
        $.Msg(`Playing HUD ${show ? 'shown' : 'hidden'}`);
    }
}

// 检查游戏状态并决定是否显示HUD
function checkGameStateAndShowHUD(): void {
    // 检查游戏模式（用于调试）
    let currentMode = 'normal';
    try {
        const gameModeData = CustomNetTables.GetTableValue('game_mode', 'current');
        if (gameModeData && gameModeData.mode) {
            currentMode = gameModeData.mode;
        }
    } catch (e) {
        $.Msg('Error reading game mode from NetTable:', e);
    }
    
    $.Msg(`Current game mode: ${currentMode}`);
    
    // 检查是否在游戏进行中
    const gameState = Game.GetState();
    $.Msg(`Current game state: ${gameState}`);
    
    // 根据实际的游戏状态常量：
    // DOTA_GAMERULES_STATE_PRE_GAME = 8
    // DOTA_GAMERULES_STATE_GAME_IN_PROGRESS = 10
    // 在自走棋模式下，可能游戏状态不同，所以放宽条件或直接显示
    let shouldShow = gameState >= 8 && gameState <= 10;
    
    // 如果是自走棋模式，即使游戏状态不符合，也尝试显示（因为自走棋可能有不同的状态值）
    if (currentMode === 'autochess') {  
        $.Msg('AutoChess mode detected - forcing HUD display');
        // 在自走棋模式下，只要不是初始化阶段就显示
        shouldShow = gameState >= 1; // 更宽松的条件
    }
    
    $.Msg(`Should show Playing HUD: ${shouldShow} (mode: ${currentMode}, state: ${gameState})`);
    showPlayingHUD(shouldShow);
}

// 隐藏原生 Dota 2 UI 元素
function hideNativeUI(): void {
    $.Msg('🎮 Hiding native Dota 2 UI elements...');
    
    try {
        // 隐藏原生 HUD 元素
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, false);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, false);
        
        // 🔑 同时隐藏小地图元素
        hideMinimapElements();
        
        $.Msg('✅ Native UI elements hidden successfully');
    } catch (e) {
        $.Msg('❌ Error hiding native UI:', e);
    }
}

// 🔑 隐藏小地图元素
function hideMinimapElements(): void {
    try {
        const rootPanel = $.GetContextPanel();
        const minimapIds = ['minimap', 'MinimapContainer', 'minimap_container', 'MinimapButton'];
        
        minimapIds.forEach(id => {
            const panel = rootPanel.FindChildTraverse(id);
            if (panel) {
                panel.style.visibility = 'collapse';
                $.Msg(`[PlayingHUD] Hidden minimap element: ${id}`);
            }
        });
    } catch (e) {
        $.Msg('❌ Error hiding minimap elements:', e);
    }
}

// 🔑 已删除showNativeUI函数 - 不再需要恢复原生UI

// 初始化
function initializePlayingHUD(): void {
    $.Msg('🎮 Playing HUD initializing...');
    
    // 🔑 立即创建HUD并隐藏原生UI
    createPlayingHUD();
    hideNativeUI();
    hideMinimapElements();
    
    // 🔑 初始状态隐藏，等待战斗阶段显示
    showPlayingHUD(true);
    
    $.Msg('🎮 Playing HUD initialized');
}

// 🔑 暂时禁用所有自动显示HUD的事件监听器
// 监听游戏状态变化事件
// GameEvents.Subscribe('game_state_changed', (data: any) => {
//     $.Msg('Game state changed:', data);
//     checkGameStateAndShowHUD();
// });

// 监听游戏模式变化事件
// GameEvents.Subscribe('game_mode_changed', (data: any) => {
//     $.Msg('Game mode changed:', data);
//     if (data && data.newMode) {
//         $.Msg(`New game mode: ${data.newMode}`);
//         checkGameStateAndShowHUD();
//     }
// });

// 监听网络表中的游戏模式变化
// CustomNetTables.SubscribeNetTableListener('game_mode', (tableName: string, key: string, data: any) => {
//     if (key === 'current') {
//         $.Msg('Game mode updated in NetTable:', data);
//         checkGameStateAndShowHUD();
//     }
// });

// 监听游戏开始事件
// GameEvents.Subscribe('game_start', () => {
//     $.Msg('Game started - showing playing HUD');
//     showPlayingHUD(true);
// });

// 监听游戏结束事件
// GameEvents.Subscribe('game_end', () => {
//     $.Msg('Game ended - hiding playing HUD');
//     showPlayingHUD(false);
// });

// 定期检查游戏状态（备用方案）
function startGameStateMonitor(): void {
    // 🔑 暂时禁用自动监控
    // const checkInterval = () => {
    //     checkGameStateAndShowHUD();
    //     $.Schedule(2.0, checkInterval); // 每2秒检查一次
    // };
    // $.Schedule(5.0, checkInterval); // 5秒后开始监控
    $.Msg('🎮 Game state monitor disabled');
}

// 导出全局函数
(globalThis as any).PlayingHUD = {
    create: createPlayingHUD,
    show: showPlayingHUD,
    checkState: checkGameStateAndShowHUD,
    addLog: addBattleLog,
    hideNativeUI: hideNativeUI,
    // 🔑 已删除showNativeUI - 不再需要恢复原生UI
    // 预留羁绊更新接口
    updateSynergy: (synergyData: any) => {
        $.Msg('Synergy update received:', synergyData);
        // TODO: 实现羁绊数据更新逻辑
    }
};

// 🔑 立即初始化
initializePlayingHUD();

// 🔑 暂时禁用自动监控
// startGameStateMonitor();

$.Msg('🎮 Playing HUD script loaded');

// 添加全局测试函数    
(globalThis as any).TestPlayingHUD = {
    show: () => showPlayingHUD(true),
    hide: () => showPlayingHUD(false),
    checkState: checkGameStateAndShowHUD,
    hideNative: hideNativeUI,
    // 🔑 已删除showNative - 不再需要恢复原生UI
    forceShow: () => {
        $.Msg('Force showing Playing HUD for testing...');
        const container = $.GetContextPanel().FindChildInLayoutFile('PlayingHUDContainer');
        if (!container) {
            createPlayingHUD();
        }
        showPlayingHUD(true);
    },
    testBattleEndVictory: () => {
        $.Msg('[PlayingHUD] Testing battle end view - Victory (direct call)');
        if ((globalThis as any).BattleEndView) {
            (globalThis as any).BattleEndView.showVictory();
        } else {
            $.Msg('[PlayingHUD] ❌ BattleEndView not loaded yet!');
        }
    },
    testBattleEndDefeat: () => {
        $.Msg('[PlayingHUD] Testing battle end view - Defeat (direct call)');
        if ((globalThis as any).BattleEndView) {
            (globalThis as any).BattleEndView.showDefeat();
        } else {
            $.Msg('[PlayingHUD] ❌ BattleEndView not loaded yet!');
        }
    }
}

