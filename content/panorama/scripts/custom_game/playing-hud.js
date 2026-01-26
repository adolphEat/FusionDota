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
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\playing-hud\index.tsx ***!
  \**************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
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
// 羁绊图标映射 - 使用 icon 文件夹中的图标
// 注意：使用基础文件名（不含 _png 后缀和 .png 扩展名）
const SYNERGY_ICON_MAP = {
    sylph_1: 'hazard_chillingtouch', // 仙灵 - 寒冰触摸图标
    divine_general_1: 'hazard_armor', // 神将 - 护甲图标
    wild_1: 'hazard_enrage_2', // 狂野 - 狂暴图标
    void_1: 'hazard_meteor', // 虚空 - 流星图标
    berserker_1: 'hazard_attack', // 战斗狂人 - 攻击图标
    creation: 'hazard_glimmer', // 创造 - 闪光图标
    ranger_1: 'hazard_speed', // 游侠 - 速度图标
    knight_1: 'hazard_frontreduction', // 骑士 - 正面减伤图标
    warrior_1: 'hazard_armor', // 斗士 - 护甲图标
    mage_1: 'hazard_magicresist', // 法师 - 魔抗图标
    warlock_1: 'hazard_bubble', // 术师 - 气泡图标
    destroyer_1: 'hazard_attack', // 毁灭者 - 攻击图标（临时使用）
};
// 模板羁绊数据（用于UI展示）
const TEMPLATE_SYNERGIES = [
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
function createPlayingHUD() {
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
function createSynergyTier(parent, tier, index) {
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
    }
    else {
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
function createSynergyItem(parent, synergy) {
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
    }
    else if (hasActiveEffect) {
        synergyItem.AddClass('partial');
        synergyItem.style.border = '2px solid rgba(59, 130, 246, 0.8)';
        synergyItem.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
    }
    else {
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
function createLeftSynergyPanel(parent) {
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
function createTopInfoBar(parent) {
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
// 创建右侧海克斯强化面板
function createRightBattlePanel(parent) {
    const rightPanel = $.CreatePanel('Panel', parent, 'RightBattlePanel');
    rightPanel.style.width = '280px';
    rightPanel.style.maxHeight = '600px';
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
    rightPanel.style.overflow = 'squish scroll';
    // 面板标题
    const title = $.CreatePanel('Label', rightPanel, 'AugmentPanelTitle');
    title.text = '✨ 海克斯强化';
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.color = PLAYING_HUD_THEME.textAccent;
    title.style.marginBottom = '15px';
    title.style.textAlign = 'center';
    // 海克斯强化列表容器
    const augmentList = $.CreatePanel('Panel', rightPanel, 'AugmentList');
    augmentList.style.width = '100%';
    augmentList.style.flowChildren = 'down';
}
// 创建单个海克斯强化项
function createAugmentItem(parent, augment) {
    const augmentItem = $.CreatePanel('Panel', parent, `Augment_${augment.id}`);
    augmentItem.style.width = '100%';
    augmentItem.style.marginBottom = '12px';
    augmentItem.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    augmentItem.style.borderRadius = '10px';
    augmentItem.style.padding = '12px';
    augmentItem.style.flowChildren = 'right';
    // 稀有度边框颜色
    const rarityColors = {
        'common': 'rgba(148, 163, 184, 0.6)',
        'rare': 'rgba(59, 130, 246, 0.8)',
        'epic': 'rgba(168, 85, 247, 0.8)'
    };
    augmentItem.style.border = `2px solid ${rarityColors[augment.rarity] || rarityColors['common']}`;
    // 图标
    const icon = $.CreatePanel('Image', augmentItem, `AugmentIcon_${augment.id}`);
    icon.SetImage(augment.icon);
    icon.style.width = '48px';
    icon.style.height = '48px';
    icon.style.marginRight = '12px';
    icon.style.borderRadius = '8px';
    icon.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    icon.style.backgroundColor = '#2a2a3a';
    // 信息区域
    const infoPanel = $.CreatePanel('Panel', augmentItem, `AugmentInfo_${augment.id}`);
    infoPanel.style.width = 'fill-parent-flow(1)';
    infoPanel.style.flowChildren = 'down';
    // 名称和稀有度行
    const nameRow = $.CreatePanel('Panel', infoPanel, `AugmentNameRow_${augment.id}`);
    nameRow.style.width = '100%';
    nameRow.style.height = '22px';
    nameRow.style.flowChildren = 'right';
    nameRow.style.marginBottom = '4px';
    const name = $.CreatePanel('Label', nameRow, `AugmentName_${augment.id}`);
    name.text = augment.displayName;
    name.style.fontSize = '16px';
    name.style.fontWeight = 'bold';
    name.style.color = '#ffffff';
    name.style.width = 'fill-parent-flow(1)';
    // 稀有度标签
    const rarityLabel = $.CreatePanel('Label', nameRow, `AugmentRarity_${augment.id}`);
    const rarityText = {
        'common': '普通',
        'rare': '稀有',
        'epic': '史诗'
    };
    rarityLabel.text = rarityText[augment.rarity] || '';
    rarityLabel.style.fontSize = '11px';
    rarityLabel.style.color = rarityColors[augment.rarity] || rarityColors['common'];
    rarityLabel.style.padding = '2px 8px';
    rarityLabel.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    rarityLabel.style.borderRadius = '4px';
    rarityLabel.style.marginLeft = '8px';
    // 描述
    const description = $.CreatePanel('Label', infoPanel, `AugmentDesc_${augment.id}`);
    description.text = augment.description || '';
    description.style.fontSize = '12px';
    description.style.color = '#cbd5e1';
    description.style.width = '100%';
}
// 更新海克斯强化显示
function updateAugmentsDisplay(augments) {
    $.Msg(`[PlayingHUD] 🔄 Updating augments display with ${augments.length} augments`);
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('[PlayingHUD] ⚠️ Root panel not found');
        return;
    }
    const augmentList = rootPanel.FindChildInLayoutFile('AugmentList');
    if (!augmentList) {
        $.Msg('[PlayingHUD] ⚠️ Augment list container not found');
        return;
    }
    // 清空现有内容
    augmentList.RemoveAndDeleteChildren();
    if (augments.length === 0) {
        // 显示空状态提示
        const emptyHint = $.CreatePanel('Label', augmentList, 'EmptyAugmentHint');
        emptyHint.text = '暂无已选强化';
        emptyHint.style.fontSize = '14px';
        emptyHint.style.color = '#94a3b8';
        emptyHint.style.textAlign = 'center';
        emptyHint.style.marginTop = '20px';
        emptyHint.style.opacity = '0.7';
    }
    else {
        // 显示强化列表
        for (const augment of augments) {
            createAugmentItem(augmentList, augment);
        }
    }
    $.Msg(`[PlayingHUD] ✅ Augments display updated`);
}
// 创建底部快捷栏
function createBottomQuickBar(parent) {
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
// 🔑 更新羁绊UI显示
function updateSynergyUI(synergiesData) {
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
                var _a, _b, _c, _d, _e, _f, _g;
                const isActive = synergyData.activeTiers.includes(index);
                // 更新阶梯项的样式
                const tierItem = rootPanel.FindChildInLayoutFile(`SynergyTier_${index}`);
                if (tierItem && ((_a = tierItem.GetParent()) === null || _a === void 0 ? void 0 : _a.id) === `SynergyTiers_${synergyData.id}`) {
                    if (isActive) {
                        tierItem.RemoveClass('inactive');
                        tierItem.AddClass('active');
                    }
                    else {
                        tierItem.RemoveClass('active');
                        tierItem.AddClass('inactive');
                    }
                }
                // 更新状态图标
                const statusIcon = rootPanel.FindChildInLayoutFile(`TierStatus_${index}`);
                if (statusIcon && ((_c = (_b = statusIcon.GetParent()) === null || _b === void 0 ? void 0 : _b.GetParent()) === null || _c === void 0 ? void 0 : _c.id) === `SynergyTiers_${synergyData.id}`) {
                    statusIcon.text = isActive ? '✓' : '○';
                    statusIcon.style.color = isActive ? '#ffd700' : '#64748b';
                }
                // 更新需求数量颜色
                const requirement = rootPanel.FindChildInLayoutFile(`TierRequirement_${index}`);
                if (requirement && ((_e = (_d = requirement.GetParent()) === null || _d === void 0 ? void 0 : _d.GetParent()) === null || _e === void 0 ? void 0 : _e.id) === `SynergyTiers_${synergyData.id}`) {
                    requirement.style.color = isActive ? '#ffd700' : '#94a3b8';
                }
                // 更新效果描述颜色
                const effect = rootPanel.FindChildInLayoutFile(`TierEffect_${index}`);
                if (effect && ((_g = (_f = effect.GetParent()) === null || _f === void 0 ? void 0 : _f.GetParent()) === null || _g === void 0 ? void 0 : _g.id) === `SynergyTiers_${synergyData.id}`) {
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
        }
        else if (hasActiveEffect) {
            synergyItem.AddClass('partial');
            synergyItem.style.border = '2px solid rgba(59, 130, 246, 0.8)';
            synergyItem.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.3)';
            synergyItem.style.opacity = '1.0';
        }
        else {
            synergyItem.AddClass('inactive');
            synergyItem.style.border = '2px solid rgba(100, 116, 139, 0.5)';
            synergyItem.style.boxShadow = 'none';
            synergyItem.style.opacity = '0.6';
        }
    }
    $.Msg('[PlayingHUD] ✅ Synergy UI updated');
}
// 监听游戏事件
GameEvents.Subscribe('player_stats_update', (data) => {
    // 更新统计数据
    if (data.gold !== undefined) {
        const goldValue = $.GetContextPanel().FindChildInLayoutFile('GoldValue');
        if (goldValue)
            goldValue.text = data.gold.toString();
    }
    if (data.kills !== undefined || data.deaths !== undefined || data.assists !== undefined) {
        const killValue = $.GetContextPanel().FindChildInLayoutFile('KillValue');
        if (killValue) {
            killValue.text = `${data.kills || 0} / ${data.deaths || 0} / ${data.assists || 0}`;
        }
    }
});
GameEvents.Subscribe('hero_stats_update', (data) => {
    if (data.health !== undefined && data.maxHealth !== undefined) {
        updateHealthBar(data.health, data.maxHealth);
    }
    if (data.mana !== undefined && data.maxMana !== undefined) {
        updateManaBar(data.mana, data.maxMana);
    }
});
// 🔑 监听海克斯强化更新事件
GameEvents.Subscribe('update_player_augments', (data) => {
    $.Msg(`[PlayingHUD] 🎯 Player augments update received`);
    $.Msg(`[PlayingHUD] Augments count: ${data.augments.length}`);
    // 更新海克斯强化显示
    updateAugmentsDisplay(data.augments);
});
// 🔑 监听战斗结束事件，确保原生UI保持隐藏
GameEvents.Subscribe('battle_ended', (data) => {
    $.Msg('[PlayingHUD] Battle ended - ensuring native UI stays hidden');
    hideNativeUI();
    hideMinimapElements();
});
// 🔑 监听自走棋阶段变化事件，确保原生UI保持隐藏
GameEvents.Subscribe('autochess_phase_started', (data) => {
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
GameEvents.Subscribe('synergy_data_update', (data) => {
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
    }
    else {
        $.Msg(`[PlayingHUD] ⏭️ 非本地玩家数据，跳过UI更新`);
    }
});
// 显示/隐藏战斗HUD
function showPlayingHUD(show) {
    const container = $.GetContextPanel().FindChildInLayoutFile('PlayingHUDContainer');
    if (container) {
        container.style.visibility = show ? 'visible' : 'collapse';
        $.Msg(`Playing HUD ${show ? 'shown' : 'hidden'}`);
    }
}
// 检查游戏状态并决定是否显示HUD
function checkGameStateAndShowHUD() {
    // 检查游戏模式（用于调试）
    let currentMode = 'normal';
    try {
        const gameModeData = CustomNetTables.GetTableValue('game_mode', 'current');
        if (gameModeData && gameModeData.mode) {
            currentMode = gameModeData.mode;
        }
    }
    catch (e) {
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
function hideNativeUI() {
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
    }
    catch (e) {
        $.Msg('❌ Error hiding native UI:', e);
    }
}
// 🔑 隐藏小地图元素
function hideMinimapElements() {
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
    }
    catch (e) {
        $.Msg('❌ Error hiding minimap elements:', e);
    }
}
// 🔑 已删除showNativeUI函数 - 不再需要恢复原生UI
// 初始化
function initializePlayingHUD() {
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
function startGameStateMonitor() {
    // 🔑 暂时禁用自动监控
    // const checkInterval = () => {
    //     checkGameStateAndShowHUD();
    //     $.Schedule(2.0, checkInterval); // 每2秒检查一次
    // };
    // $.Schedule(5.0, checkInterval); // 5秒后开始监控
    $.Msg('🎮 Game state monitor disabled');
}
// 导出全局函数
globalThis.PlayingHUD = {
    create: createPlayingHUD,
    show: showPlayingHUD,
    checkState: checkGameStateAndShowHUD,
    hideNativeUI: hideNativeUI,
    // 🔑 已删除showNativeUI - 不再需要恢复原生UI
    // 羁绊更新接口
    updateSynergy: (synergyData) => {
        $.Msg('Synergy update received:', synergyData);
        // TODO: 实现羁绊数据更新逻辑
    },
    // 海克斯强化更新接口
    updateAugments: (augments) => {
        $.Msg('Augments update received:', augments);
        updateAugmentsDisplay(augments);
    }
};
// 🔑 立即初始化
initializePlayingHUD();
// 🔑 暂时禁用自动监控
// startGameStateMonitor();
$.Msg('🎮 Playing HUD script loaded');
// 添加全局测试函数    
globalThis.TestPlayingHUD = {
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
        if (globalThis.BattleEndView) {
            globalThis.BattleEndView.showVictory();
        }
        else {
            $.Msg('[PlayingHUD] ❌ BattleEndView not loaded yet!');
        }
    },
    testBattleEndDefeat: () => {
        $.Msg('[PlayingHUD] Testing battle end view - Defeat (direct call)');
        if (globalThis.BattleEndView) {
            globalThis.BattleEndView.showDefeat();
        }
        else {
            $.Msg('[PlayingHUD] ❌ BattleEndView not loaded yet!');
        }
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWluZy1odWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1COzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLGNBQWMsNkRBQTZEO0FBQzNFLGNBQWMsOERBQThEO0FBQzVFLGNBQWM7QUFDZDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQSxjQUFjLG1FQUFtRTtBQUNqRixjQUFjLG1FQUFtRTtBQUNqRixjQUFjO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0EsY0FBYyxpRUFBaUU7QUFDL0UsY0FBYyxnRkFBZ0Y7QUFDOUYsY0FBYztBQUNkO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLGNBQWMsc0RBQXNEO0FBQ3BFLGNBQWM7QUFDZDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQSxjQUFjLG1FQUFtRTtBQUNqRixjQUFjO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLGNBQWMsMERBQTBEO0FBQ3hFLGNBQWMsMkRBQTJEO0FBQ3pFLGNBQWM7QUFDZDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQSxjQUFjLCtDQUErQztBQUM3RCxjQUFjLCtDQUErQztBQUM3RCxjQUFjO0FBQ2Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0EsY0FBYyxrRUFBa0U7QUFDaEYsY0FBYztBQUNkO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBLGNBQWMsZ0VBQWdFO0FBQzlFLGNBQWM7QUFDZDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQSxjQUFjLDhEQUE4RDtBQUM1RSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixDQUFDLDZDQUE2QyxNQUFNO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixDQUFDLDhDQUE4QyxNQUFNO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLENBQUMsbURBQW1ELE1BQU07QUFDbEYsMkJBQTJCLFdBQVc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsQ0FBQyw4Q0FBOEMsTUFBTTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsQ0FBQyx5Q0FBeUMsV0FBVztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsQ0FBQyxvREFBb0QsV0FBVztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsQ0FBQyw2Q0FBNkMsV0FBVztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU8sb0JBQW9CLGFBQWE7QUFDM0Qsd0JBQXdCO0FBQ3hCO0FBQ0EsSUFBSSxDQUFDLGtDQUFrQyxjQUFjLEdBQUcsV0FBVyxNQUFNLFNBQVM7QUFDbEY7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLGlCQUFpQixDQUFDLDZDQUE2QyxXQUFXO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsQ0FBQywyQ0FBMkMsV0FBVztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLENBQUMsNENBQTRDLFdBQVc7QUFDMUU7QUFDQSxvQkFBb0IscUJBQXFCLEdBQUcsU0FBUztBQUNyRDtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsQ0FBQyxtREFBbUQsV0FBVztBQUMxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTCxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw4QkFBOEI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLENBQUM7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSxDQUFDLHNDQUFzQywyQkFBMkI7QUFDdEU7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLENBQUM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLDhCQUE4QjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLENBQUM7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLENBQUM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsQ0FBQztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLENBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLENBQUM7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLENBQUM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsQ0FBQztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLENBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLENBQUM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLENBQUM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLENBQUM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsOEJBQThCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixDQUFDO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLENBQUM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixDQUFDLHlDQUF5QyxXQUFXO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx1REFBdUQ7QUFDbkc7QUFDQSxpQkFBaUIsQ0FBQyxrREFBa0QsV0FBVztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLENBQUMsa0RBQWtELFdBQVc7QUFDcEY7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLENBQUMsbURBQW1ELFdBQVc7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsQ0FBQyw4Q0FBOEMsV0FBVztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsQ0FBQyxnREFBZ0QsV0FBVztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixDQUFDLGdEQUFnRCxXQUFXO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDLHVEQUF1RCxpQkFBaUI7QUFDN0Usc0JBQXNCLENBQUM7QUFDdkI7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixDQUFDO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLENBQUM7QUFDdkI7QUFDQSxVQUFVLDZCQUE2QjtBQUN2QyxVQUFVLDBCQUEwQjtBQUNwQyxVQUFVLGdDQUFnQztBQUMxQyxVQUFVLCtCQUErQjtBQUN6QztBQUNBO0FBQ0Esb0JBQW9CLENBQUMsaURBQWlELFVBQVU7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixDQUFDLDhCQUE4QixVQUFVO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxZQUFZLENBQUMsa0NBQWtDLFlBQVk7QUFDM0Q7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLENBQUM7QUFDakI7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsQ0FBQztBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVksQ0FBQyxvQ0FBb0MsWUFBWTtBQUM3RCxTQUFTO0FBQ1QsUUFBUSxDQUFDLDJCQUEyQixZQUFZO0FBQ2hELEtBQUs7QUFDTCxJQUFJLENBQUMseUNBQXlDLHFCQUFxQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUMsaURBQWlELHNCQUFzQjtBQUM1RSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDLGlDQUFpQyxpQkFBaUIsVUFBVSx5QkFBeUIsaUJBQWlCLGtDQUFrQztBQUNqSjtBQUNBLHVFQUF1RSxlQUFlO0FBQ3RGO0FBQ0EsWUFBWSxDQUFDLGdEQUFnRCxlQUFlO0FBQzVFO0FBQ0E7QUFDQTtBQUNBLDJFQUEyRSxlQUFlO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMseUJBQXlCLEdBQUcsU0FBUztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsZUFBZTtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0ZBQWdGLE1BQU07QUFDdEYsNkhBQTZILGVBQWU7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUYsTUFBTTtBQUN2Riw0TEFBNEwsZUFBZTtBQUMzTTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1RixNQUFNO0FBQzdGLDhMQUE4TCxlQUFlO0FBQzdNO0FBQ0E7QUFDQTtBQUNBLDZFQUE2RSxNQUFNO0FBQ25GLG9MQUFvTCxlQUFlO0FBQ25NO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixDQUFDO0FBQzNCO0FBQ0EsZ0NBQWdDLGlCQUFpQixJQUFJLGtCQUFrQixJQUFJLGtCQUFrQjtBQUM3RjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTCxJQUFJLENBQUMscUNBQXFDLHFCQUFxQjtBQUMvRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUMsc0NBQXNDLFlBQVk7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVCwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0wsc0JBQXNCLENBQUM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUMsZ0VBQWdFLGNBQWM7QUFDbkYsSUFBSSxDQUFDLHNDQUFzQyxzQkFBc0I7QUFDakU7QUFDQTtBQUNBLElBQUksQ0FBQyxzQ0FBc0MsY0FBYyxxQkFBcUIsY0FBYztBQUM1RjtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0Esc0JBQXNCLENBQUM7QUFDdkI7QUFDQTtBQUNBLFFBQVEsQ0FBQyxvQkFBb0IsMEJBQTBCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQSxJQUFJLENBQUMsMkJBQTJCLFlBQVk7QUFDNUM7QUFDQTtBQUNBLElBQUksQ0FBQyw0QkFBNEIsVUFBVTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsSUFBSSxDQUFDLGlDQUFpQyxZQUFZLFNBQVMsWUFBWSxXQUFXLFVBQVU7QUFDNUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLENBQUMsNkNBQTZDLEdBQUc7QUFDakU7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsYUFBYTtBQUNoRDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0EsdUNBQXVDO0FBQ3ZDLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVCwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxDQUFDO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksQ0FBQztBQUNiO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xccGxheWluZy1odWRcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIEB0cy1ub2NoZWNrXG4vLyDmiJjmlpfkuK3nmoRIVUTnlYzpnaIgLSDlj4LogIMgRG90YTJDdXN0b21HYW1lIOiuvuiuoemjjuagvFxuLy8g56uL5Y2z5pi+56S65LiA5Liq5rWL6K+V5raI5oGvXG5HYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuJC5Nc2coJ/Cfjq4gUGxheWluZyBIVUQgc2NyaXB0IGlzIGV4ZWN1dGluZyEnKTtcbi8vIOS4u+mimOmFjee9ru+8iOWPguiAgyBEb3RhMkN1c3RvbUdhbWUg6aOO5qC877yJXG5jb25zdCBQTEFZSU5HX0hVRF9USEVNRSA9IHtcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwgMjMsIDQyLCAwLjg1KScsXG4gICAgcGFuZWxCZzogJ3JnYmEoMzMsIDM0LCAzMSwgMC45NSknLFxuICAgIGJvcmRlckNvbG9yOiAncmdiYSg1OSwgMTMwLCAyNDYsIDAuNCknLFxuICAgIHRleHRQcmltYXJ5OiAnIzNiODJmNicsXG4gICAgdGV4dFNlY29uZGFyeTogJyNmZmZmZmYnLFxuICAgIHRleHRBY2NlbnQ6ICcjZmZjNTdhJyxcbiAgICBzdWNjZXNzOiAnIzRjYWY1MCcsXG4gICAgd2FybmluZzogJyNmZjk4MDAnLFxuICAgIGRhbmdlcjogJyNmNDQzMzYnLFxuICAgIGhlYWx0aDogJyNmNDQzMzYnLFxuICAgIG1hbmE6ICcjMjE5NmYzJyxcbn07XG4vLyDnvoHnu4rlm77moIfmmKDlsIQgLSDkvb/nlKggaWNvbiDmlofku7blpLnkuK3nmoTlm77moIdcbi8vIOazqOaEj++8muS9v+eUqOWfuuehgOaWh+S7tuWQje+8iOS4jeWQqyBfcG5nIOWQjue8gOWSjCAucG5nIOaJqeWxleWQje+8iVxuY29uc3QgU1lORVJHWV9JQ09OX01BUCA9IHtcbiAgICBzeWxwaF8xOiAnaGF6YXJkX2NoaWxsaW5ndG91Y2gnLCAvLyDku5nngbUgLSDlr5LlhrDop6bmkbjlm77moIdcbiAgICBkaXZpbmVfZ2VuZXJhbF8xOiAnaGF6YXJkX2FybW9yJywgLy8g56We5bCGIC0g5oqk55Sy5Zu+5qCHXG4gICAgd2lsZF8xOiAnaGF6YXJkX2VucmFnZV8yJywgLy8g54uC6YeOIC0g54uC5pq05Zu+5qCHXG4gICAgdm9pZF8xOiAnaGF6YXJkX21ldGVvcicsIC8vIOiZmuepuiAtIOa1geaYn+Wbvuagh1xuICAgIGJlcnNlcmtlcl8xOiAnaGF6YXJkX2F0dGFjaycsIC8vIOaImOaWl+eLguS6uiAtIOaUu+WHu+Wbvuagh1xuICAgIGNyZWF0aW9uOiAnaGF6YXJkX2dsaW1tZXInLCAvLyDliJvpgKAgLSDpl6rlhYnlm77moIdcbiAgICByYW5nZXJfMTogJ2hhemFyZF9zcGVlZCcsIC8vIOa4uOS+oCAtIOmAn+W6puWbvuagh1xuICAgIGtuaWdodF8xOiAnaGF6YXJkX2Zyb250cmVkdWN0aW9uJywgLy8g6aqR5aOrIC0g5q2j6Z2i5YeP5Lyk5Zu+5qCHXG4gICAgd2Fycmlvcl8xOiAnaGF6YXJkX2FybW9yJywgLy8g5paX5aOrIC0g5oqk55Sy5Zu+5qCHXG4gICAgbWFnZV8xOiAnaGF6YXJkX21hZ2ljcmVzaXN0JywgLy8g5rOV5biIIC0g6a2U5oqX5Zu+5qCHXG4gICAgd2FybG9ja18xOiAnaGF6YXJkX2J1YmJsZScsIC8vIOacr+W4iCAtIOawlOazoeWbvuagh1xuICAgIGRlc3Ryb3llcl8xOiAnaGF6YXJkX2F0dGFjaycsIC8vIOavgeeBreiAhSAtIOaUu+WHu+Wbvuagh++8iOS4tOaXtuS9v+eUqO+8iVxufTtcbi8vIOaooeadv+e+gee7iuaVsOaNru+8iOeUqOS6jlVJ5bGV56S677yJXG5jb25zdCBURU1QTEFURV9TWU5FUkdJRVMgPSBbXG4gICAge1xuICAgICAgICBpZDogJ3N5bHBoXzEnLFxuICAgICAgICBuYW1lOiAn5LuZ54G1JyxcbiAgICAgICAgdHlwZTogJ3JhY2UnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2NoaWxsaW5ndG91Y2hfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMCxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+S7meeBteeahOaZruaUu+aciTMwJeacuueOh+WHj+Wwkeebruagh+azleWKm++8jOW5tuaBouWkjTXms5XlipsnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiAzLCBlZmZlY3Q6ICfku5nngbXnmoTmma7mlLvmnIkzMCXmnLrnjoflh4/lsJHnm67moIfms5XlipvvvIzlubbmgaLlpI0xMOazleWKmycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDQsIGVmZmVjdDogJ+S7meeBteeahOaZruaUu+aciTMwJeacuueOh+WHj+Wwkeebruagh+azleWKm++8jOW5tuaBouWkjTE15rOV5YqbJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdkaXZpbmVfZ2VuZXJhbF8xJyxcbiAgICAgICAgbmFtZTogJ+elnuWwhicsXG4gICAgICAgIHR5cGU6ICdyYWNlJyxcbiAgICAgICAgaWNvbjogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uL2hhemFyZF9hcm1vcl9wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAwLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMiwgZWZmZWN0OiAn56We5bCG6I635b6XKzPmiqTnlLLvvIwrM+mtlOaKl++8jOavj+asoeaZruaUu+WRveS4reWbnuWkjeWFqOS9k+WPi+WGmzEw55Sf5ZG9JywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogMywgZWZmZWN0OiAn56We5bCG6I635b6XKzbmiqTnlLLvvIwrNumtlOaKl++8jOavj+asoeaZruaUu+WRveS4reWbnuWkjeWFqOS9k+WPi+WGmzIw55Sf5ZG9JywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNSwgZWZmZWN0OiAn56We5bCG6I635b6XKzEw5oqk55Sy77yMKzEw6a2U5oqX77yM5q+P5qyh5pmu5pS75ZG95Lit5Zue5aSN5YWo5L2T5Y+L5YabNDDnlJ/lkb0nLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3dpbGRfMScsXG4gICAgICAgIG5hbWU6ICfni4Lph44nLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfZW5yYWdlXzJfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMCxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDMsIGVmZmVjdDogJ+aImOaWl+W8gOWni+WQjuavjzEw56eS6Kem5Y+R5LiA5qyh77ya5aKe5YqgMTAl5pS75Ye76YCf5bqm77yI5Y+v5Y+g5Yqg77yJJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5oiY5paX5byA5aeL5ZCO5q+PMTDnp5Lop6blj5HkuIDmrKHvvJrlop7liqAxMCXmlLvlh7vpgJ/luqbvvIjlj6/lj6DliqDvvInvvIzlop7liqAxMOeCueeJqeeQhuaUu+WHu++8iOWPr+WPoOWKoO+8iScsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDUsIGVmZmVjdDogJ+aImOaWl+W8gOWni+WQjuavjzEw56eS6Kem5Y+R5LiA5qyh77ya5aKe5YqgMTAl5pS75Ye76YCf5bqm77yI5Y+v5Y+g5Yqg77yJ77yM5aKe5YqgMTDngrnniannkIbmlLvlh7vvvIjlj6/lj6DliqDvvInvvIzlkJHlnLrkuIrnlJ/lkb3lgLzmnIDkvY7nmoTljZXkvY3mipXmjrfplb/nn5vpgKDmiJDkvKTlrrPvvIznm67moIfooYDph4/kvY7kuo4yMCXml7blpITlhrMnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3ZvaWRfMScsXG4gICAgICAgIG5hbWU6ICfomZrnqbonLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfbWV0ZW9yX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfomZrnqbrljZXkvY3mma7mlLvkuI7mioDog73pmYTluKY1Jeecn+WunuS8pOWusycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDUsIGVmZmVjdDogJ+iZmuepuuWNleS9jeaZruaUu+S4juaKgOiDvemZhOW4pjE1Jeecn+WunuS8pOWusycsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnYmVyc2Vya2VyXzEnLFxuICAgICAgICBuYW1lOiAn5oiY5paX54uC5Lq6JyxcbiAgICAgICAgdHlwZTogJ3JhY2UnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2F0dGFja19wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAwLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMiwgZWZmZWN0OiAn5Zy65LiK5pyJ5Y2V5L2N5q275Lqh5pe277yM5oiY5paX54uC5Lq66I635b6XMTAl5pS75Ye76YCf5bqm5ZKMMjAl5YWo6IO95aKe5LykJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5Zy65LiK5pyJ5Y2V5L2N5q275Lqh5pe277yM5oiY5paX54uC5Lq66I635b6XMzAl5pS75Ye76YCf5bqm5ZKMNTAl5YWo6IO95aKe5LykJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdjcmVhdGlvbicsXG4gICAgICAgIG5hbWU6ICfliJvpgKAnLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfZ2xpbW1lcl9wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAwLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMSwgZWZmZWN0OiAn5Y2h5bCU5Y+v5Lul6KeG5Li65Lu75L2V56eN5peP77yI5Y2z5omA5pyJ56eN5peP6K6h5pWwKzHvvIzkuJTljaHlsJTlj6/ku6Xkuqvlj5fliLDmiYDmnInnp43ml4/nmoTliqDmiJDvvIknLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3Jhbmdlcl8xJyxcbiAgICAgICAgbmFtZTogJ+a4uOS+oCcsXG4gICAgICAgIHR5cGU6ICdjbGFzcycsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfc3BlZWRfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMCxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+avj+i/hznnp5LvvIzmiYDmnInmuLjkvqDojrflvpcz56eSKzUwJeaUu+mAn+aPkOWNhycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDMsIGVmZmVjdDogJ+avj+i/hznnp5LvvIzmiYDmnInmuLjkvqDojrflvpcz56eSKzEwMCXmlLvpgJ/mj5DljYcnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA1LCBlZmZlY3Q6ICfmr4/ov4c156eS77yM5omA5pyJ5ri45L6g6I635b6XM+enkisxNTAl5pS76YCf5o+Q5Y2HJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdrbmlnaHRfMScsXG4gICAgICAgIG5hbWU6ICfpqpHlo6snLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2Zyb250cmVkdWN0aW9uX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvmoLzmjKExMOS8pOWusycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDQsIGVmZmVjdDogJ+aJgOacieWPi+WGm+agvOaMoTIw5Lyk5a6zJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNSwgZWZmZWN0OiAn5omA5pyJ5Y+L5Yab5qC85oyhNDDkvKTlrrMnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3dhcnJpb3JfMScsXG4gICAgICAgIG5hbWU6ICfmlpflo6snLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2FybW9yX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcyNTDpop3lpJbnlJ/lkb3lgLzvvIzmlpflo6vljZXkvY3pop3lpJbojrflvpcxMDDnlJ/lkb3lgLwnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA0LCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpc1MDDpop3lpJbnlJ/lkb3lgLzvvIzmlpflo6vljZXkvY3pop3lpJbojrflvpcyMDDnlJ/lkb3lgLwnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ21hZ2VfMScsXG4gICAgICAgIG5hbWU6ICfms5XluIgnLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX21hZ2ljcmVzaXN0X3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcxL+enkuazleWKm+aBouWkje+8jOazleW4iOWNleS9jeiOt+W+lzIv56eS5rOV5Yqb5oGi5aSNJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5omA5pyJ5Y+L5Yab6I635b6XMi/np5Lms5XlipvmgaLlpI3vvIzms5XluIjljZXkvY3ojrflvpc0L+enkuazleWKm+aBouWkjScsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnd2FybG9ja18xJyxcbiAgICAgICAgbmFtZTogJ+acr+W4iCcsXG4gICAgICAgIHR5cGU6ICdjbGFzcycsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfYnViYmxlX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAxLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcxMCXprZTms5XmipfmgKfvvIzmnK/lo6vojrflvpcyMCXprZTms5XmipfmgKcnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiAzLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcxNSXprZTms5XmipfmgKfvvIzmnK/lo6vojrflvpczMCXprZTms5XmipfmgKcnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG4vLyDliJvlu7rmiJjmlpdIVURcbmZ1bmN0aW9uIGNyZWF0ZVBsYXlpbmdIVUQoKSB7XG4gICAgJC5Nc2coJ/Cfjq4gQ1JFQVRJTkcgUExBWUlORyBIVUQgLSBORVcgVkVSU0lPTiAyMjo1MCDwn46uJyk7XG4gICAgLy8g8J+UkSDnoa7kv53pmpDol4/ljp/nlJ9VSe+8iOWcqOWIm+W7ukhVROS5i+WJje+8iVxuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ0Vycm9yOiBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOWIoOmZpOW3suWtmOWcqOeahOWuueWZqFxuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICB9XG4gICAgLy8g5Yib5bu65Li75a655ZmoXG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgLy8g56e76ZmkaGl0dGVzdOiuvue9ru+8jOmBv+WFjVBhbm9yYW1hIEFQSemXrumimFxuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMCc7XG4gICAgY29udGFpbmVyLkFkZENsYXNzKCdwbGF5aW5nX2h1ZF9yb290Jyk7XG4gICAgLy8g5Yib5bu66aG26YOo5L+h5oGv5qCPXG4gICAgY3JlYXRlVG9wSW5mb0Jhcihjb250YWluZXIpO1xuICAgIC8vIOWIm+W7uuW3puS+p+e+gee7iumdouadv1xuICAgIGNyZWF0ZUxlZnRTeW5lcmd5UGFuZWwoY29udGFpbmVyKTtcbiAgICAvLyDliJvlu7rlj7PkvqfmiJjmlpfkv6Hmga/pnaLmnb9cbiAgICBjcmVhdGVSaWdodEJhdHRsZVBhbmVsKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65bqV6YOo5b+r5o235qCPXG4gICAgY3JlYXRlQm90dG9tUXVpY2tCYXIoY29udGFpbmVyKTtcbn1cbi8vIOWIm+W7uue+gee7iuaViOaenOadoeebrlxuZnVuY3Rpb24gY3JlYXRlU3luZXJneVRpZXIocGFyZW50LCB0aWVyLCBpbmRleCkge1xuICAgIGNvbnN0IHRpZXJJdGVtID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBTeW5lcmd5VGllcl8ke2luZGV4fWApO1xuICAgIHRpZXJJdGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRpZXJJdGVtLnN0eWxlLmhlaWdodCA9ICcyMnB4JztcbiAgICB0aWVySXRlbS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnM3B4JztcbiAgICB0aWVySXRlbS5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIHRpZXJJdGVtLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDVweCc7XG4gICAgLy8g5re75Yqg5r+A5rS754q25oCB57G7XG4gICAgaWYgKHRpZXIuYWN0aXZlKSB7XG4gICAgICAgIHRpZXJJdGVtLkFkZENsYXNzKCdzeW5lcmd5X3RpZXInKTtcbiAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ3N5bmVyZ3lfdGllcicpO1xuICAgICAgICB0aWVySXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICB9XG4gICAgLy8g54q25oCB5Zu+5qCHXG4gICAgY29uc3Qgc3RhdHVzSWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGllckl0ZW0sIGBUaWVyU3RhdHVzXyR7aW5kZXh9YCk7XG4gICAgc3RhdHVzSWNvbi50ZXh0ID0gdGllci5hY3RpdmUgPyAn4pyTJyA6ICfil4snO1xuICAgIHN0YXR1c0ljb24uQWRkQ2xhc3MoJ3RpZXJfaWNvbicpO1xuICAgIHN0YXR1c0ljb24uc3R5bGUud2lkdGggPSAnMjBweCc7XG4gICAgc3RhdHVzSWNvbi5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBzdGF0dXNJY29uLnN0eWxlLmNvbG9yID0gdGllci5hY3RpdmUgPyAnI2ZmZDcwMCcgOiAnIzY0NzQ4Yic7XG4gICAgc3RhdHVzSWNvbi5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g6ZyA5rGC5pWw6YePXG4gICAgY29uc3QgcmVxdWlyZW1lbnQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpZXJJdGVtLCBgVGllclJlcXVpcmVtZW50XyR7aW5kZXh9YCk7XG4gICAgcmVxdWlyZW1lbnQudGV4dCA9IGAoJHt0aWVyLmNvdW50fSlgO1xuICAgIHJlcXVpcmVtZW50LkFkZENsYXNzKCd0aWVyX3JlcXVpcmVtZW50Jyk7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUud2lkdGggPSAnMzVweCc7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUuZm9udFNpemUgPSAnMTFweCc7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUuY29sb3IgPSB0aWVyLmFjdGl2ZSA/ICcjZmZkNzAwJyA6ICcjOTRhM2I4JztcbiAgICByZXF1aXJlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJlcXVpcmVtZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDmlYjmnpzmj4/ov7BcbiAgICBjb25zdCBlZmZlY3QgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpZXJJdGVtLCBgVGllckVmZmVjdF8ke2luZGV4fWApO1xuICAgIGVmZmVjdC50ZXh0ID0gdGllci5lZmZlY3Q7XG4gICAgZWZmZWN0LkFkZENsYXNzKCd0aWVyX2VmZmVjdCcpO1xuICAgIGVmZmVjdC5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBlZmZlY3Quc3R5bGUuZm9udFNpemUgPSAnMTFweCc7XG4gICAgZWZmZWN0LnN0eWxlLmNvbG9yID0gdGllci5hY3RpdmUgPyAnI2ZmZmZmZicgOiAnIzk0YTNiOCc7XG4gICAgZWZmZWN0LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbn1cbi8vIOWIm+W7uuWNleS4que+gee7iumhuVxuZnVuY3Rpb24gY3JlYXRlU3luZXJneUl0ZW0ocGFyZW50LCBzeW5lcmd5KSB7XG4gICAgY29uc3Qgc3luZXJneUl0ZW0gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgYFN5bmVyZ3lfJHtzeW5lcmd5LmlkfWApO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG4gICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDEwMCwgMTE2LCAxMzksIDAuNSknO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAvLyDliKTmlq3mv4DmtLvnirbmgIFcbiAgICBjb25zdCBoYXNBY3RpdmVFZmZlY3QgPSBzeW5lcmd5LnRpZXJzLnNvbWUodGllciA9PiB0aWVyLmFjdGl2ZSk7XG4gICAgY29uc3QgYWxsRWZmZWN0c0FjdGl2ZSA9IHN5bmVyZ3kudGllcnMuZXZlcnkodGllciA9PiB0aWVyLmFjdGl2ZSk7XG4gICAgLy8g5re75Yqg54q25oCB57G7XG4gICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ3N5bmVyZ3lfaXRlbScpO1xuICAgIGlmIChhbGxFZmZlY3RzQWN0aXZlKSB7XG4gICAgICAgIHN5bmVyZ3lJdGVtLkFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDI1NSwgMjE1LCAwLCAwLjgpJztcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm94U2hhZG93ID0gJzAgMCAxNXB4IHJnYmEoMjU1LCAyMTUsIDAsIDAuNCknO1xuICAgIH1cbiAgICBlbHNlIGlmIChoYXNBY3RpdmVFZmZlY3QpIHtcbiAgICAgICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ3BhcnRpYWwnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDU5LCAxMzAsIDI0NiwgMC44KSc7XG4gICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTBweCByZ2JhKDU5LCAxMzAsIDI0NiwgMC4zKSc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzeW5lcmd5SXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgIH1cbiAgICAvLyDnvoHnu4rlpLTpg6hcbiAgICBjb25zdCBoZWFkZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN5bmVyZ3lJdGVtLCBgU3luZXJneUhlYWRlcl8ke3N5bmVyZ3kuaWR9YCk7XG4gICAgaGVhZGVyLkFkZENsYXNzKCdzeW5lcmd5X2hlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzQwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICBoZWFkZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICAvLyDlm77moIcgLSDkvb/nlKhJbWFnZemdouadv++8iFBhbm9yYW1h5o6o6I2Q5pa55byP77yJXG4gICAgY29uc3QgaWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0ltYWdlJywgaGVhZGVyLCBgU3luZXJneUljb25fJHtzeW5lcmd5LmlkfWApO1xuICAgIGljb24uQWRkQ2xhc3MoJ3N5bmVyZ3lfaWNvbicpO1xuICAgIC8vIOS7juaYoOWwhOS4reiOt+WPluWbvuagh+aWh+S7tuWQjeW5tuaehOW7uuWujOaVtOi3r+W+hFxuICAgIC8vIFBhbm9yYW1hIOWbvuagh+ezu+e7n+S8muiHquWKqOWkhOeQhiBfcG5nLnBuZyDlkI7nvIBcbiAgICBjb25zdCBpY29uRmlsZU5hbWUgPSBTWU5FUkdZX0lDT05fTUFQW3N5bmVyZ3kuaWRdO1xuICAgIGNvbnN0IGljb25QYXRoID0gaWNvbkZpbGVOYW1lXG4gICAgICAgID8gYGZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uLyR7aWNvbkZpbGVOYW1lfV9wbmcucG5nYFxuICAgICAgICA6IHN5bmVyZ3kuaWNvbjsgLy8g5aaC5p6c5pig5bCE5LiN5a2Y5Zyo77yM5L2/55So5Y6f6Lev5b6E5L2c5Li65ZCO5aSHXG4gICAgLy8g6LCD6K+V5pel5b+X77ya6L6T5Ye65Zu+5qCH6Lev5b6EXG4gICAgJC5Nc2coYPCflrzvuI8gTG9hZGluZyBzeW5lcmd5IGljb246ICR7c3luZXJneS5uYW1lfSAoJHtzeW5lcmd5LmlkfSkgLSAke2ljb25QYXRofWApO1xuICAgIC8vIOS9v+eUqFNldEltYWdl5pa55rOV5Yqg6L295Zu+54mH77yI6ZyA6KaBWE1M6aKE5Yqg6L295omN6IO96Ieq5Yqo57yW6K+RUE5H77yJXG4gICAgLy8g6Lev5b6E5qC85byP77yaZmlsZTovL3tpbWFnZXN9Ly4uLiDkvJrooqvoh6rliqjovazmjaLkuLrnvJbor5HlkI7nmoR2dGV4X2NcbiAgICBpY29uLlNldEltYWdlKGljb25QYXRoKTtcbiAgICBpY29uLnN0eWxlLndpZHRoID0gJzMycHgnO1xuICAgIGljb24uc3R5bGUuaGVpZ2h0ID0gJzMycHgnO1xuICAgIGljb24uc3R5bGUubWFyZ2luUmlnaHQgPSAnOHB4JztcbiAgICBpY29uLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBpY29uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc2cHgnO1xuICAgIGljb24uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknO1xuICAgIGljb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMyYTJhM2EnOyAvLyDmt7vliqDog4zmma/oibLkvr/kuo7osIPor5VcbiAgICAvLyDkv6Hmga/ljLrln59cbiAgICBjb25zdCBpbmZvID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBoZWFkZXIsIGBTeW5lcmd5SW5mb18ke3N5bmVyZ3kuaWR9YCk7XG4gICAgaW5mby5BZGRDbGFzcygnc3luZXJneV9pbmZvJyk7XG4gICAgaW5mby5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBpbmZvLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBpbmZvLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAvLyDlkI3np7BcbiAgICBjb25zdCBuYW1lID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBpbmZvLCBgU3luZXJneU5hbWVfJHtzeW5lcmd5LmlkfWApO1xuICAgIG5hbWUuQWRkQ2xhc3MoJ3N5bmVyZ3lfbmFtZScpO1xuICAgIG5hbWUudGV4dCA9IHN5bmVyZ3kubmFtZTtcbiAgICBuYW1lLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIG5hbWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBuYW1lLnN0eWxlLmNvbG9yID0gaGFzQWN0aXZlRWZmZWN0ID8gJyNmZmQ3MDAnIDogJyNmZmZmZmYnO1xuICAgIG5hbWUuc3R5bGUubWFyZ2luQm90dG9tID0gJzJweCc7XG4gICAgLy8g6K6h5pWwXG4gICAgY29uc3QgbWF4Q291bnQgPSBNYXRoLm1heCguLi5zeW5lcmd5LnRpZXJzLm1hcCh0ID0+IHQuY291bnQpKTtcbiAgICBjb25zdCBjb3VudCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaW5mbywgYFN5bmVyZ3lDb3VudF8ke3N5bmVyZ3kuaWR9YCk7XG4gICAgY291bnQuQWRkQ2xhc3MoJ3N5bmVyZ3lfY291bnQnKTtcbiAgICBjb3VudC50ZXh0ID0gYCR7c3luZXJneS5jdXJyZW50Q291bnR9LyR7bWF4Q291bnR9YDtcbiAgICBjb3VudC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBjb3VudC5zdHlsZS5jb2xvciA9IGhhc0FjdGl2ZUVmZmVjdCA/ICcjZmZjNTdhJyA6ICcjOTRhM2I4JztcbiAgICAvLyDmlYjmnpzliJfooahcbiAgICBjb25zdCB0aWVyc0NvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc3luZXJneUl0ZW0sIGBTeW5lcmd5VGllcnNfJHtzeW5lcmd5LmlkfWApO1xuICAgIHRpZXJzQ29udGFpbmVyLkFkZENsYXNzKCdzeW5lcmd5X3RpZXJzJyk7XG4gICAgdGllcnNDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGllcnNDb250YWluZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIHRpZXJzQ29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gJzVweCc7XG4gICAgLy8g5Yib5bu65q+P5Liq5pWI5p6c5p2h55uuXG4gICAgc3luZXJneS50aWVycy5mb3JFYWNoKCh0aWVyLCBpbmRleCkgPT4ge1xuICAgICAgICBjcmVhdGVTeW5lcmd5VGllcih0aWVyc0NvbnRhaW5lciwgdGllciwgaW5kZXgpO1xuICAgIH0pO1xufVxuLy8g5Yib5bu65bem5L6n576B57uK6Z2i5p2/XG5mdW5jdGlvbiBjcmVhdGVMZWZ0U3luZXJneVBhbmVsKHBhcmVudCkge1xuICAgICQuTXNnKCfwn46uIENyZWF0aW5nIGxlZnQgc3luZXJneSBwYW5lbC4uLicpO1xuICAgIGNvbnN0IGxlZnRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnTGVmdFN5bmVyZ3lQYW5lbCcpO1xuICAgIGxlZnRQYW5lbC5zdHlsZS53aWR0aCA9ICcyODBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLm1heEhlaWdodCA9ICc2MDBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdsZWZ0JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTAwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJzIwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7UExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBsZWZ0UGFuZWwuc3R5bGUub3ZlcmZsb3cgPSAnc3F1aXNoIHNjcm9sbCc7XG4gICAgLy8g6Z2i5p2/5qCH6aKYXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxlZnRQYW5lbCwgJ1N5bmVyZ3lQYW5lbFRpdGxlJyk7XG4gICAgdGl0bGUuQWRkQ2xhc3MoJ3N5bmVyZ3lfcGFuZWxfdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ/Cfjq8g576B57uK5pWI5p6cJztcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g5Yib5bu65omA5pyJ576B57uK6aG5XG4gICAgVEVNUExBVEVfU1lORVJHSUVTLmZvckVhY2goc3luZXJneSA9PiB7XG4gICAgICAgIGNyZWF0ZVN5bmVyZ3lJdGVtKGxlZnRQYW5lbCwgc3luZXJneSk7XG4gICAgfSk7XG4gICAgJC5Nc2coYPCfjq4gU3luZXJneSBwYW5lbCBjcmVhdGVkIHdpdGggJHtURU1QTEFURV9TWU5FUkdJRVMubGVuZ3RofSBzeW5lcmdpZXNgKTtcbn1cbi8vIOWIm+W7uumhtumDqOS/oeaBr+agj1xuZnVuY3Rpb24gY3JlYXRlVG9wSW5mb0JhcihwYXJlbnQpIHtcbiAgICBjb25zdCB0b3BCYXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1RvcEluZm9CYXInKTtcbiAgICB0b3BCYXIuc3R5bGUud2lkdGggPSAnNzAwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5oZWlnaHQgPSAnNjBweCc7XG4gICAgdG9wQmFyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRvcEJhci5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgdG9wQmFyLnN0eWxlLm1hcmdpblRvcCA9ICcyMHB4JztcbiAgICB0b3BCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUucGFuZWxCZztcbiAgICB0b3BCYXIuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgdG9wQmFyLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICB0b3BCYXIuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgdG9wQmFyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgLy8gMS4g5b2T5YmN5ri45oiP54q25oCBXG4gICAgY29uc3Qgc3RhdGVQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgdG9wQmFyLCAnR2FtZVN0YXRlUGFuZWwnKTtcbiAgICBzdGF0ZVBhbmVsLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICBzdGF0ZVBhbmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBzdGF0ZVBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBjb25zdCBzdGF0ZUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzdGF0ZVBhbmVsLCAnR2FtZVN0YXRlTGFiZWwnKTtcbiAgICBzdGF0ZUxhYmVsLnRleHQgPSAn5ri45oiP54q25oCBJztcbiAgICBzdGF0ZUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIHN0YXRlTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIHN0YXRlTGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjcnO1xuICAgIGNvbnN0IHN0YXRlVmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRlUGFuZWwsICdHYW1lU3RhdGVWYWx1ZScpO1xuICAgIHN0YXRlVmFsdWUudGV4dCA9ICfnrYnlvoXkuK0nO1xuICAgIHN0YXRlVmFsdWUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgc3RhdGVWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHN0YXRlVmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICAvLyDliIbpmpTnur9cbiAgICBjb25zdCBkaXZpZGVyMSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgdG9wQmFyLCAnRGl2aWRlcjEnKTtcbiAgICBkaXZpZGVyMS5zdHlsZS53aWR0aCA9ICcxcHgnO1xuICAgIGRpdmlkZXIxLnN0eWxlLmhlaWdodCA9ICc4MCUnO1xuICAgIGRpdmlkZXIxLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yO1xuICAgIGRpdmlkZXIxLnN0eWxlLm9wYWNpdHkgPSAnMC4zJztcbiAgICBkaXZpZGVyMS5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8gMi4g5aSH5oiY5YCS6K6h5pe2XG4gICAgY29uc3QgY291bnRkb3duUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ1ByZXBhcmF0aW9uQ291bnRkb3duUGFuZWwnKTtcbiAgICBjb3VudGRvd25QYW5lbC5zdHlsZS53aWR0aCA9ICcxNTBweCc7XG4gICAgY291bnRkb3duUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGNvdW50ZG93blBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBjb25zdCBjb3VudGRvd25MYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY291bnRkb3duUGFuZWwsICdDb3VudGRvd25MYWJlbCcpO1xuICAgIGNvdW50ZG93bkxhYmVsLnRleHQgPSAn4o+zIOWkh+aImOWAkuiuoeaXtic7XG4gICAgY291bnRkb3duTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgY291bnRkb3duTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGNvdW50ZG93bkxhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC43JztcbiAgICBjb25zdCBjb3VudGRvd25WYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY291bnRkb3duUGFuZWwsICdDb3VudGRvd25WYWx1ZScpO1xuICAgIGNvdW50ZG93blZhbHVlLnRleHQgPSAnLS0nO1xuICAgIGNvdW50ZG93blZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGNvdW50ZG93blZhbHVlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgY291bnRkb3duVmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS53YXJuaW5nO1xuICAgIC8vIOWIhumalOe6v1xuICAgIGNvbnN0IGRpdmlkZXIyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdEaXZpZGVyMicpO1xuICAgIGRpdmlkZXIyLnN0eWxlLndpZHRoID0gJzFweCc7XG4gICAgZGl2aWRlcjIuc3R5bGUuaGVpZ2h0ID0gJzgwJSc7XG4gICAgZGl2aWRlcjIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3I7XG4gICAgZGl2aWRlcjIuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGRpdmlkZXIyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyAzLiDlvZPliY3muLjmiI/ml7bplb9cbiAgICBjb25zdCBkdXJhdGlvblBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdHYW1lRHVyYXRpb25QYW5lbCcpO1xuICAgIGR1cmF0aW9uUGFuZWwuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgZHVyYXRpb25QYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgZHVyYXRpb25QYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3QgZHVyYXRpb25MYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgZHVyYXRpb25QYW5lbCwgJ0dhbWVEdXJhdGlvbkxhYmVsJyk7XG4gICAgZHVyYXRpb25MYWJlbC50ZXh0ID0gJ+KPsCDmuLjmiI/ml7bplb8nO1xuICAgIGR1cmF0aW9uTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgZHVyYXRpb25MYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgZHVyYXRpb25MYWJlbC5zdHlsZS5vcGFjaXR5ID0gJzAuNyc7XG4gICAgY29uc3QgZHVyYXRpb25WYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgZHVyYXRpb25QYW5lbCwgJ0dhbWVEdXJhdGlvblZhbHVlJyk7XG4gICAgZHVyYXRpb25WYWx1ZS50ZXh0ID0gJzAwOjAwJztcbiAgICBkdXJhdGlvblZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGR1cmF0aW9uVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBkdXJhdGlvblZhbHVlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbn1cbi8vIOaXp+eahOiLsembhOS/oeaBr+mdouadv+WHveaVsOW3suWIoOmZpO+8jOabv+aNouS4uue+gee7iumdouadv1xuLy8g5Yib5bu65Y+z5L6n5rW35YWL5pav5by65YyW6Z2i5p2/XG5mdW5jdGlvbiBjcmVhdGVSaWdodEJhdHRsZVBhbmVsKHBhcmVudCkge1xuICAgIGNvbnN0IHJpZ2h0UGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1JpZ2h0QmF0dGxlUGFuZWwnKTtcbiAgICByaWdodFBhbmVsLnN0eWxlLndpZHRoID0gJzI4MHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLm1heEhlaWdodCA9ICc2MDBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUubWFyZ2luVG9wID0gJzEwMHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUucGFuZWxCZztcbiAgICByaWdodFBhbmVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtQTEFZSU5HX0hVRF9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjUpJztcbiAgICByaWdodFBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICByaWdodFBhbmVsLnN0eWxlLm92ZXJmbG93ID0gJ3NxdWlzaCBzY3JvbGwnO1xuICAgIC8vIOmdouadv+agh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByaWdodFBhbmVsLCAnQXVnbWVudFBhbmVsVGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ+KcqCDmtbflhYvmlq/lvLrljJYnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0QWNjZW50O1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDmtbflhYvmlq/lvLrljJbliJfooajlrrnlmahcbiAgICBjb25zdCBhdWdtZW50TGlzdCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcmlnaHRQYW5lbCwgJ0F1Z21lbnRMaXN0Jyk7XG4gICAgYXVnbWVudExpc3Quc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgYXVnbWVudExpc3Quc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xufVxuLy8g5Yib5bu65Y2V5Liq5rW35YWL5pav5by65YyW6aG5XG5mdW5jdGlvbiBjcmVhdGVBdWdtZW50SXRlbShwYXJlbnQsIGF1Z21lbnQpIHtcbiAgICBjb25zdCBhdWdtZW50SXRlbSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgQXVnbWVudF8ke2F1Z21lbnQuaWR9YCk7XG4gICAgYXVnbWVudEl0ZW0uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgYXVnbWVudEl0ZW0uc3R5bGUubWFyZ2luQm90dG9tID0gJzEycHgnO1xuICAgIGF1Z21lbnRJdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuNCknO1xuICAgIGF1Z21lbnRJdGVtLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBhdWdtZW50SXRlbS5zdHlsZS5wYWRkaW5nID0gJzEycHgnO1xuICAgIGF1Z21lbnRJdGVtLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgLy8g56iA5pyJ5bqm6L655qGG6aKc6ImyXG4gICAgY29uc3QgcmFyaXR5Q29sb3JzID0ge1xuICAgICAgICAnY29tbW9uJzogJ3JnYmEoMTQ4LCAxNjMsIDE4NCwgMC42KScsXG4gICAgICAgICdyYXJlJzogJ3JnYmEoNTksIDEzMCwgMjQ2LCAwLjgpJyxcbiAgICAgICAgJ2VwaWMnOiAncmdiYSgxNjgsIDg1LCAyNDcsIDAuOCknXG4gICAgfTtcbiAgICBhdWdtZW50SXRlbS5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7cmFyaXR5Q29sb3JzW2F1Z21lbnQucmFyaXR5XSB8fCByYXJpdHlDb2xvcnNbJ2NvbW1vbiddfWA7XG4gICAgLy8g5Zu+5qCHXG4gICAgY29uc3QgaWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0ltYWdlJywgYXVnbWVudEl0ZW0sIGBBdWdtZW50SWNvbl8ke2F1Z21lbnQuaWR9YCk7XG4gICAgaWNvbi5TZXRJbWFnZShhdWdtZW50Lmljb24pO1xuICAgIGljb24uc3R5bGUud2lkdGggPSAnNDhweCc7XG4gICAgaWNvbi5zdHlsZS5oZWlnaHQgPSAnNDhweCc7XG4gICAgaWNvbi5zdHlsZS5tYXJnaW5SaWdodCA9ICcxMnB4JztcbiAgICBpY29uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc4cHgnO1xuICAgIGljb24uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknO1xuICAgIGljb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMyYTJhM2EnO1xuICAgIC8vIOS/oeaBr+WMuuWfn1xuICAgIGNvbnN0IGluZm9QYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgYXVnbWVudEl0ZW0sIGBBdWdtZW50SW5mb18ke2F1Z21lbnQuaWR9YCk7XG4gICAgaW5mb1BhbmVsLnN0eWxlLndpZHRoID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIGluZm9QYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g5ZCN56ew5ZKM56iA5pyJ5bqm6KGMXG4gICAgY29uc3QgbmFtZVJvdyA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgaW5mb1BhbmVsLCBgQXVnbWVudE5hbWVSb3dfJHthdWdtZW50LmlkfWApO1xuICAgIG5hbWVSb3cuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbmFtZVJvdy5zdHlsZS5oZWlnaHQgPSAnMjJweCc7XG4gICAgbmFtZVJvdy5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIG5hbWVSb3cuc3R5bGUubWFyZ2luQm90dG9tID0gJzRweCc7XG4gICAgY29uc3QgbmFtZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbmFtZVJvdywgYEF1Z21lbnROYW1lXyR7YXVnbWVudC5pZH1gKTtcbiAgICBuYW1lLnRleHQgPSBhdWdtZW50LmRpc3BsYXlOYW1lO1xuICAgIG5hbWUuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgbmFtZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIG5hbWUuc3R5bGUuY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgbmFtZS5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICAvLyDnqIDmnInluqbmoIfnrb5cbiAgICBjb25zdCByYXJpdHlMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbmFtZVJvdywgYEF1Z21lbnRSYXJpdHlfJHthdWdtZW50LmlkfWApO1xuICAgIGNvbnN0IHJhcml0eVRleHQgPSB7XG4gICAgICAgICdjb21tb24nOiAn5pmu6YCaJyxcbiAgICAgICAgJ3JhcmUnOiAn56iA5pyJJyxcbiAgICAgICAgJ2VwaWMnOiAn5Y+y6K+XJ1xuICAgIH07XG4gICAgcmFyaXR5TGFiZWwudGV4dCA9IHJhcml0eVRleHRbYXVnbWVudC5yYXJpdHldIHx8ICcnO1xuICAgIHJhcml0eUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzExcHgnO1xuICAgIHJhcml0eUxhYmVsLnN0eWxlLmNvbG9yID0gcmFyaXR5Q29sb3JzW2F1Z21lbnQucmFyaXR5XSB8fCByYXJpdHlDb2xvcnNbJ2NvbW1vbiddO1xuICAgIHJhcml0eUxhYmVsLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDhweCc7XG4gICAgcmFyaXR5TGFiZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgcmFyaXR5TGFiZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzRweCc7XG4gICAgcmFyaXR5TGFiZWwuc3R5bGUubWFyZ2luTGVmdCA9ICc4cHgnO1xuICAgIC8vIOaPj+i/sFxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBpbmZvUGFuZWwsIGBBdWdtZW50RGVzY18ke2F1Z21lbnQuaWR9YCk7XG4gICAgZGVzY3JpcHRpb24udGV4dCA9IGF1Z21lbnQuZGVzY3JpcHRpb24gfHwgJyc7XG4gICAgZGVzY3JpcHRpb24uc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgZGVzY3JpcHRpb24uc3R5bGUuY29sb3IgPSAnI2NiZDVlMSc7XG4gICAgZGVzY3JpcHRpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG59XG4vLyDmm7TmlrDmtbflhYvmlq/lvLrljJbmmL7npLpcbmZ1bmN0aW9uIHVwZGF0ZUF1Z21lbnRzRGlzcGxheShhdWdtZW50cykge1xuICAgICQuTXNnKGBbUGxheWluZ0hVRF0g8J+UhCBVcGRhdGluZyBhdWdtZW50cyBkaXNwbGF5IHdpdGggJHthdWdtZW50cy5sZW5ndGh9IGF1Z21lbnRzYCk7XG4gICAgY29uc3Qgcm9vdFBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKTtcbiAgICBpZiAoIXJvb3RQYW5lbCkge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIOKaoO+4jyBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGF1Z21lbnRMaXN0ID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQXVnbWVudExpc3QnKTtcbiAgICBpZiAoIWF1Z21lbnRMaXN0KSB7XG4gICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0g4pqg77iPIEF1Z21lbnQgbGlzdCBjb250YWluZXIgbm90IGZvdW5kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g5riF56m6546w5pyJ5YaF5a65XG4gICAgYXVnbWVudExpc3QuUmVtb3ZlQW5kRGVsZXRlQ2hpbGRyZW4oKTtcbiAgICBpZiAoYXVnbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIOaYvuekuuepuueKtuaAgeaPkOekulxuICAgICAgICBjb25zdCBlbXB0eUhpbnQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGF1Z21lbnRMaXN0LCAnRW1wdHlBdWdtZW50SGludCcpO1xuICAgICAgICBlbXB0eUhpbnQudGV4dCA9ICfmmoLml6Dlt7LpgInlvLrljJYnO1xuICAgICAgICBlbXB0eUhpbnQuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgICAgIGVtcHR5SGludC5zdHlsZS5jb2xvciA9ICcjOTRhM2I4JztcbiAgICAgICAgZW1wdHlIaW50LnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBlbXB0eUhpbnQuc3R5bGUubWFyZ2luVG9wID0gJzIwcHgnO1xuICAgICAgICBlbXB0eUhpbnQuc3R5bGUub3BhY2l0eSA9ICcwLjcnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8g5pi+56S65by65YyW5YiX6KGoXG4gICAgICAgIGZvciAoY29uc3QgYXVnbWVudCBvZiBhdWdtZW50cykge1xuICAgICAgICAgICAgY3JlYXRlQXVnbWVudEl0ZW0oYXVnbWVudExpc3QsIGF1Z21lbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgICQuTXNnKGBbUGxheWluZ0hVRF0g4pyFIEF1Z21lbnRzIGRpc3BsYXkgdXBkYXRlZGApO1xufVxuLy8g5Yib5bu65bqV6YOo5b+r5o235qCPXG5mdW5jdGlvbiBjcmVhdGVCb3R0b21RdWlja0JhcihwYXJlbnQpIHtcbiAgICBjb25zdCBib3R0b21CYXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0JvdHRvbVF1aWNrQmFyJyk7XG4gICAgY29uc3QgcXVpY2tBY3Rpb25zID0gW1xuICAgICAgICB7IGlkOiAnaW52ZW50b3J5JywgbmFtZTogJ+iDjOWMhScgfSxcbiAgICAgICAgeyBpZDogJ3NraWxscycsIG5hbWU6ICfmioDog70nIH0sXG4gICAgICAgIHsgaWQ6ICdzdGFnZV9zZWxlY3QnLCBuYW1lOiAn6YCJ5YWzJyB9LFxuICAgICAgICB7IGlkOiAndGVzdF9raWxsJywgbmFtZTogJ+a1i+ivlee7k+eulycgfSxcbiAgICBdO1xuICAgIHF1aWNrQWN0aW9ucy5mb3JFYWNoKChhY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJ0biA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGJvdHRvbUJhciwgYFF1aWNrQWN0aW9uXyR7YWN0aW9uLmlkfWApO1xuICAgICAgICBidG4uQWRkQ2xhc3MoJ3F1aWNrX2FjdGlvbl9idG4nKTtcbiAgICAgICAgYnRuLnN0eWxlLndpZHRoID0gJzExMHB4JztcbiAgICAgICAgYnRuLnN0eWxlLmhlaWdodCA9ICc2MHB4JztcbiAgICAgICAgYnRuLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAgICAgLy8g5Yib5bu65LiA5Liq5Y2V54us55qEIExhYmVsIOaYvuekuuaJgOacieWGheWuuVxuICAgICAgICBjb25zdCBjb250ZW50TGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGJ0biwgYCR7YWN0aW9uLmlkfV9jb250ZW50YCk7XG4gICAgICAgIGNvbnRlbnRMYWJlbC50ZXh0ID0gYWN0aW9uLm5hbWU7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICAgICAgY29udGVudExhYmVsLmhpdHRlc3QgPSBmYWxzZTsgLy8g6YeN6KaB77ya5LiN5oum5oiq54K55Ye7XG4gICAgICAgIC8vIOe7keWumueCueWHu+S6i+S7tlxuICAgICAgICBidG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0g4pyF4pyF4pyFIENMSUNLRUQ6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuICAgICAgICAgICAgLy8g54m55q6K5aSE55CG77ya6YCJ5YWz5oyJ6ZKuIC0g6YCa6L+H5LqL5Lu26Kem5Y+R77yI5LiN5ZCMVUnnu4Tku7bmnInni6znq4vnmoRKU+S4iuS4i+aWh++8jOaXoOazleWFseS6q2dsb2JhbFRoaXPvvIlcbiAgICAgICAgICAgIGlmIChhY3Rpb24uaWQgPT09ICdzdGFnZV9zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSBPcGVuaW5nIFN0YWdlU2VsZWN0IHZpYSBldmVudC4uLicpO1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgeS6i+S7tuWIsOacjeWKoeerr++8jOacjeWKoeerr+S8muW5v+aSree7meaJgOacieWuouaIt+err1xuICAgICAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdvcGVuX2xldmVsX3NlbGVjdGlvbicsIHt9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnibnmrorlpITnkIbvvJrog4zljIXmjInpkq4gLSDliIfmjaLmmL7npLov6ZqQ6JePXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmlkID09PSAnaW52ZW50b3J5Jykge1xuICAgICAgICAgICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0gVG9nZ2xpbmcgaW52ZW50b3J5Li4uJyk7XG4gICAgICAgICAgICAgICAgLy8g6YCa6L+H5pyN5Yqh56uv6L2s5Y+R5LqL5Lu277yI5YOP6YCJ5YWz5oyJ6ZKu5LiA5qC377yJXG4gICAgICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3RvZ2dsZV9pbnZlbnRvcnlfcmVxdWVzdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IFBsYXllcnMuR2V0TG9jYWxQbGF5ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWFtuS7luaMiemSrumAmui/h+acjeWKoeWZqOS6i+S7tuWkhOeQhlxuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3F1aWNrX2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbi5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDmt7vliqDpvKDmoIfmgqzlgZzmlYjmnpxcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDwn5GGIE1vdXNlIG92ZXI6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkLk1zZyhg8J+OriBDcmVhdGVkIGJ1dHRvbjogJHthY3Rpb24ubmFtZX1gKTtcbiAgICB9KTtcbiAgICAkLk1zZyhg8J+OriBCb3R0b20gcXVpY2sgYmFyIGNyZWF0ZWQgd2l0aCAke3F1aWNrQWN0aW9ucy5sZW5ndGh9IGJ1dHRvbnNgKTtcbn1cbi8vIPCflJEg5pu05paw576B57uKVUnmmL7npLpcbmZ1bmN0aW9uIHVwZGF0ZVN5bmVyZ3lVSShzeW5lcmdpZXNEYXRhKSB7XG4gICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDwn5SEIFVwZGF0aW5nIHN5bmVyZ3kgVUkgd2l0aCAke3N5bmVyZ2llc0RhdGEubGVuZ3RofSBzeW5lcmdpZXNgKTtcbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0g4pqg77iPIFJvb3QgcGFuZWwgbm90IGZvdW5kJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g6YGN5Y6G5omA5pyJ576B57uK5pWw5o2u5bm25pu05pawVUlcbiAgICBmb3IgKGNvbnN0IHN5bmVyZ3lEYXRhIG9mIHN5bmVyZ2llc0RhdGEpIHtcbiAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDwn5OKIFVwZGF0aW5nICR7c3luZXJneURhdGEubmFtZX06IGNvdW50PSR7c3luZXJneURhdGEuY3VycmVudENvdW50fSwgYWN0aXZlIHRpZXJzPSR7c3luZXJneURhdGEuYWN0aXZlVGllcnMuam9pbignLCcpfWApO1xuICAgICAgICAvLyDmn6Xmib7lr7nlupTnmoTnvoHnu4rpnaLmnb9cbiAgICAgICAgY29uc3Qgc3luZXJneUl0ZW0gPSByb290UGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBTeW5lcmd5XyR7c3luZXJneURhdGEuaWR9YCk7XG4gICAgICAgIGlmICghc3luZXJneUl0ZW0pIHtcbiAgICAgICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0g4pqg77iPIFN5bmVyZ3kgaXRlbSBub3QgZm91bmQ6ICR7c3luZXJneURhdGEuaWR9YCk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyDmm7TmlrDnvoHnu4rorqHmlbDmmL7npLpcbiAgICAgICAgY29uc3QgY291bnRMYWJlbCA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFN5bmVyZ3lDb3VudF8ke3N5bmVyZ3lEYXRhLmlkfWApO1xuICAgICAgICBpZiAoY291bnRMYWJlbCkge1xuICAgICAgICAgICAgLy8g5om+5Yiw5a+55bqU5qih5p2/5pWw5o2u5Lit55qE5pyA5aSn6Zi25qKvXG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZVN5bmVyZ3kgPSBURU1QTEFURV9TWU5FUkdJRVMuZmluZChzID0+IHMuaWQgPT09IHN5bmVyZ3lEYXRhLmlkKTtcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZVN5bmVyZ3kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhDb3VudCA9IE1hdGgubWF4KC4uLnRlbXBsYXRlU3luZXJneS50aWVycy5tYXAodCA9PiB0LmNvdW50KSk7XG4gICAgICAgICAgICAgICAgY291bnRMYWJlbC50ZXh0ID0gYCR7c3luZXJneURhdGEuY3VycmVudENvdW50fS8ke21heENvdW50fWA7XG4gICAgICAgICAgICAgICAgLy8g5qC55o2u5piv5ZCm5r+A5rS75pu05paw6aKc6ImyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFzQWN0aXZlRWZmZWN0ID0gc3luZXJneURhdGEuYWN0aXZlVGllcnMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgICAgICBjb3VudExhYmVsLnN0eWxlLmNvbG9yID0gaGFzQWN0aXZlRWZmZWN0ID8gJyNmZmM1N2EnIDogJyM5NGEzYjgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIOabtOaWsOWQjeensOminOiJslxuICAgICAgICBjb25zdCBuYW1lTGFiZWwgPSByb290UGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBTeW5lcmd5TmFtZV8ke3N5bmVyZ3lEYXRhLmlkfWApO1xuICAgICAgICBpZiAobmFtZUxhYmVsKSB7XG4gICAgICAgICAgICBjb25zdCBoYXNBY3RpdmVFZmZlY3QgPSBzeW5lcmd5RGF0YS5hY3RpdmVUaWVycy5sZW5ndGggPiAwO1xuICAgICAgICAgICAgbmFtZUxhYmVsLnN0eWxlLmNvbG9yID0gaGFzQWN0aXZlRWZmZWN0ID8gJyNmZmQ3MDAnIDogJyNmZmZmZmYnO1xuICAgICAgICB9XG4gICAgICAgIC8vIOabtOaWsOWQhOS4qumYtuair+eahOa/gOa0u+eKtuaAgVxuICAgICAgICBjb25zdCB0ZW1wbGF0ZVN5bmVyZ3kgPSBURU1QTEFURV9TWU5FUkdJRVMuZmluZChzID0+IHMuaWQgPT09IHN5bmVyZ3lEYXRhLmlkKTtcbiAgICAgICAgaWYgKHRlbXBsYXRlU3luZXJneSkge1xuICAgICAgICAgICAgdGVtcGxhdGVTeW5lcmd5LnRpZXJzLmZvckVhY2goKHRpZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZSwgX2YsIF9nO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gc3luZXJneURhdGEuYWN0aXZlVGllcnMuaW5jbHVkZXMoaW5kZXgpO1xuICAgICAgICAgICAgICAgIC8vIOabtOaWsOmYtuair+mhueeahOagt+W8j1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpZXJJdGVtID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgU3luZXJneVRpZXJfJHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICBpZiAodGllckl0ZW0gJiYgKChfYSA9IHRpZXJJdGVtLkdldFBhcmVudCgpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpID09PSBgU3luZXJneVRpZXJzXyR7c3luZXJneURhdGEuaWR9YCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpZXJJdGVtLlJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGllckl0ZW0uUmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5pu05paw54q25oCB5Zu+5qCHXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzSWNvbiA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFRpZXJTdGF0dXNfJHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHVzSWNvbiAmJiAoKF9jID0gKF9iID0gc3RhdHVzSWNvbi5HZXRQYXJlbnQoKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLkdldFBhcmVudCgpKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuaWQpID09PSBgU3luZXJneVRpZXJzXyR7c3luZXJneURhdGEuaWR9YCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNJY29uLnRleHQgPSBpc0FjdGl2ZSA/ICfinJMnIDogJ+KXiyc7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb24uc3R5bGUuY29sb3IgPSBpc0FjdGl2ZSA/ICcjZmZkNzAwJyA6ICcjNjQ3NDhiJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5pu05paw6ZyA5rGC5pWw6YeP6aKc6ImyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWlyZW1lbnQgPSByb290UGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBUaWVyUmVxdWlyZW1lbnRfJHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZW1lbnQgJiYgKChfZSA9IChfZCA9IHJlcXVpcmVtZW50LkdldFBhcmVudCgpKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuR2V0UGFyZW50KCkpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5pZCkgPT09IGBTeW5lcmd5VGllcnNfJHtzeW5lcmd5RGF0YS5pZH1gKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVtZW50LnN0eWxlLmNvbG9yID0gaXNBY3RpdmUgPyAnI2ZmZDcwMCcgOiAnIzk0YTNiOCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIOabtOaWsOaViOaenOaPj+i/sOminOiJslxuICAgICAgICAgICAgICAgIGNvbnN0IGVmZmVjdCA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFRpZXJFZmZlY3RfJHtpbmRleH1gKTtcbiAgICAgICAgICAgICAgICBpZiAoZWZmZWN0ICYmICgoX2cgPSAoX2YgPSBlZmZlY3QuR2V0UGFyZW50KCkpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5HZXRQYXJlbnQoKSkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLmlkKSA9PT0gYFN5bmVyZ3lUaWVyc18ke3N5bmVyZ3lEYXRhLmlkfWApIHtcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0LnN0eWxlLmNvbG9yID0gaXNBY3RpdmUgPyAnI2ZmZmZmZicgOiAnIzk0YTNiOCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5pu05paw5pW05Liq576B57uK6aG555qE5qC35byPXG4gICAgICAgIGNvbnN0IGhhc0FjdGl2ZUVmZmVjdCA9IHN5bmVyZ3lEYXRhLmFjdGl2ZVRpZXJzLmxlbmd0aCA+IDA7XG4gICAgICAgIGNvbnN0IGFsbEVmZmVjdHNBY3RpdmUgPSB0ZW1wbGF0ZVN5bmVyZ3kgJiYgc3luZXJneURhdGEuYWN0aXZlVGllcnMubGVuZ3RoID09PSB0ZW1wbGF0ZVN5bmVyZ3kudGllcnMubGVuZ3RoO1xuICAgICAgICBzeW5lcmd5SXRlbS5SZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uUmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uUmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBpZiAoYWxsRWZmZWN0c0FjdGl2ZSkge1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDI1NSwgMjE1LCAwLCAwLjgpJztcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTVweCByZ2JhKDI1NSwgMjE1LCAwLCAwLjQpJztcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLm9wYWNpdHkgPSAnMS4wJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNBY3RpdmVFZmZlY3QpIHtcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLkFkZENsYXNzKCdwYXJ0aWFsJyk7XG4gICAgICAgICAgICBzeW5lcmd5SXRlbS5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJnYmEoNTksIDEzMCwgMjQ2LCAwLjgpJztcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTBweCByZ2JhKDU5LCAxMzAsIDI0NiwgMC4zKSc7XG4gICAgICAgICAgICBzeW5lcmd5SXRlbS5zdHlsZS5vcGFjaXR5ID0gJzEuMCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzeW5lcmd5SXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmdiYSgxMDAsIDExNiwgMTM5LCAwLjUpJztcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJveFNoYWRvdyA9ICdub25lJztcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLm9wYWNpdHkgPSAnMC42JztcbiAgICAgICAgfVxuICAgIH1cbiAgICAkLk1zZygnW1BsYXlpbmdIVURdIOKchSBTeW5lcmd5IFVJIHVwZGF0ZWQnKTtcbn1cbi8vIOebkeWQrOa4uOaIj+S6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3BsYXllcl9zdGF0c191cGRhdGUnLCAoZGF0YSkgPT4ge1xuICAgIC8vIOabtOaWsOe7n+iuoeaVsOaNrlxuICAgIGlmIChkYXRhLmdvbGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBnb2xkVmFsdWUgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnR29sZFZhbHVlJyk7XG4gICAgICAgIGlmIChnb2xkVmFsdWUpXG4gICAgICAgICAgICBnb2xkVmFsdWUudGV4dCA9IGRhdGEuZ29sZC50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZGF0YS5raWxscyAhPT0gdW5kZWZpbmVkIHx8IGRhdGEuZGVhdGhzICE9PSB1bmRlZmluZWQgfHwgZGF0YS5hc3Npc3RzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3Qga2lsbFZhbHVlID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0tpbGxWYWx1ZScpO1xuICAgICAgICBpZiAoa2lsbFZhbHVlKSB7XG4gICAgICAgICAgICBraWxsVmFsdWUudGV4dCA9IGAke2RhdGEua2lsbHMgfHwgMH0gLyAke2RhdGEuZGVhdGhzIHx8IDB9IC8gJHtkYXRhLmFzc2lzdHMgfHwgMH1gO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnaGVyb19zdGF0c191cGRhdGUnLCAoZGF0YSkgPT4ge1xuICAgIGlmIChkYXRhLmhlYWx0aCAhPT0gdW5kZWZpbmVkICYmIGRhdGEubWF4SGVhbHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXBkYXRlSGVhbHRoQmFyKGRhdGEuaGVhbHRoLCBkYXRhLm1heEhlYWx0aCk7XG4gICAgfVxuICAgIGlmIChkYXRhLm1hbmEgIT09IHVuZGVmaW5lZCAmJiBkYXRhLm1heE1hbmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cGRhdGVNYW5hQmFyKGRhdGEubWFuYSwgZGF0YS5tYXhNYW5hKTtcbiAgICB9XG59KTtcbi8vIPCflJEg55uR5ZCs5rW35YWL5pav5by65YyW5pu05paw5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgndXBkYXRlX3BsYXllcl9hdWdtZW50cycsIChkYXRhKSA9PiB7XG4gICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDwn46vIFBsYXllciBhdWdtZW50cyB1cGRhdGUgcmVjZWl2ZWRgKTtcbiAgICAkLk1zZyhgW1BsYXlpbmdIVURdIEF1Z21lbnRzIGNvdW50OiAke2RhdGEuYXVnbWVudHMubGVuZ3RofWApO1xuICAgIC8vIOabtOaWsOa1t+WFi+aWr+W8uuWMluaYvuekulxuICAgIHVwZGF0ZUF1Z21lbnRzRGlzcGxheShkYXRhLmF1Z21lbnRzKTtcbn0pO1xuLy8g8J+UkSDnm5HlkKzmiJjmlpfnu5PmnZ/kuovku7bvvIznoa7kv53ljp/nlJ9VSeS/neaMgemakOiXj1xuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2JhdHRsZV9lbmRlZCcsIChkYXRhKSA9PiB7XG4gICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSBCYXR0bGUgZW5kZWQgLSBlbnN1cmluZyBuYXRpdmUgVUkgc3RheXMgaGlkZGVuJyk7XG4gICAgaGlkZU5hdGl2ZVVJKCk7XG4gICAgaGlkZU1pbmltYXBFbGVtZW50cygpO1xufSk7XG4vLyDwn5SRIOebkeWQrOiHqui1sOaji+mYtuauteWPmOWMluS6i+S7tu+8jOehruS/neWOn+eUn1VJ5L+d5oyB6ZqQ6JePXG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3BoYXNlX3N0YXJ0ZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKGBbUGxheWluZ0hVRF0gUGhhc2UgY2hhbmdlZCB0byAke2RhdGEucGhhc2V9IC0gZW5zdXJpbmcgbmF0aXZlIFVJIHN0YXlzIGhpZGRlbmApO1xuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGhpZGVNaW5pbWFwRWxlbWVudHMoKTtcbiAgICAvLyDwn5SRIOWmguaenOaYr+aImOaWl+mYtuaute+8jOaYvuekunBsYXlpbmctaHVkXG4gICAgaWYgKGRhdGEucGhhc2UgPT09ICdiYXR0bGUnKSB7XG4gICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0gQmF0dGxlIHBoYXNlIHN0YXJ0ZWQgLSBzaG93aW5nIHBsYXlpbmcgSFVEJyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgICAgICBoaWRlTWluaW1hcEVsZW1lbnRzKCk7XG4gICAgfVxufSk7XG4vLyDwn5SRIOebkeWQrOaYvuekunBsYXlpbmctaHVk5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnc2hvd19wbGF5aW5nX2h1ZCcsICgpID0+IHtcbiAgICAkLk1zZygnW1BsYXlpbmdIVURdIFNob3cgcGxheWluZyBIVUQgZXZlbnQgcmVjZWl2ZWQnKTtcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgIGNyZWF0ZVBsYXlpbmdIVUQoKTtcbiAgICB9XG4gICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgaGlkZU5hdGl2ZVVJKCk7XG4gICAgaGlkZU1pbmltYXBFbGVtZW50cygpO1xufSk7XG4vLyDwn5SRIOebkeWQrOe+gee7iuaVsOaNruabtOaWsOS6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3N5bmVyZ3lfZGF0YV91cGRhdGUnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKGBbUGxheWluZ0hVRF0g8J+OryBTeW5lcmd5IGRhdGEgdXBkYXRlIHJlY2VpdmVkIGZvciBwbGF5ZXIgJHtkYXRhLnBsYXllcklkfWApO1xuICAgICQuTXNnKGBbUGxheWluZ0hVRF0gU3luZXJnaWVzIGNvdW50OiAke2RhdGEuc3luZXJnaWVzLmxlbmd0aH1gKTtcbiAgICAvLyDwn5SRIOWNleacuuaooeW8j++8muajgOafpeaYr+WQpuS4uuacrOWcsOeOqeWutueahOaVsOaNrlxuICAgIGNvbnN0IGxvY2FsUGxheWVySWQgPSBQbGF5ZXJzLkdldExvY2FsUGxheWVyKCk7XG4gICAgJC5Nc2coYFtQbGF5aW5nSFVEXSBMb2NhbCBwbGF5ZXIgSUQ6ICR7bG9jYWxQbGF5ZXJJZH0sIEV2ZW50IHBsYXllciBJRDogJHtkYXRhLnBsYXllcklkfWApO1xuICAgIC8vIOWNleacuuaooeW8j+S4i+mAmuW4uOaYr+eOqeWutjDvvIzkvYbkuZ/mlK/mjIHlhbbku5bnjqnlrrZJRFxuICAgIGlmIChkYXRhLnBsYXllcklkID09PSBsb2NhbFBsYXllcklkKSB7XG4gICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0g4pyFIOacrOWcsOeOqeWutuaVsOaNru+8jOabtOaWsOe+gee7ilVJYCk7XG4gICAgICAgIC8vIOabtOaWsOe+gee7ilVJXG4gICAgICAgIHVwZGF0ZVN5bmVyZ3lVSShkYXRhLnN5bmVyZ2llcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAkLk1zZyhgW1BsYXlpbmdIVURdIOKPre+4jyDpnZ7mnKzlnLDnjqnlrrbmlbDmja7vvIzot7Pov4dVSeabtOaWsGApO1xuICAgIH1cbn0pO1xuLy8g5pi+56S6L+makOiXj+aImOaWl0hVRFxuZnVuY3Rpb24gc2hvd1BsYXlpbmdIVUQoc2hvdykge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IHNob3cgPyAndmlzaWJsZScgOiAnY29sbGFwc2UnO1xuICAgICAgICAkLk1zZyhgUGxheWluZyBIVUQgJHtzaG93ID8gJ3Nob3duJyA6ICdoaWRkZW4nfWApO1xuICAgIH1cbn1cbi8vIOajgOafpea4uOaIj+eKtuaAgeW5tuWGs+WumuaYr+WQpuaYvuekukhVRFxuZnVuY3Rpb24gY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCkge1xuICAgIC8vIOajgOafpea4uOaIj+aooeW8j++8iOeUqOS6juiwg+ivle+8iVxuICAgIGxldCBjdXJyZW50TW9kZSA9ICdub3JtYWwnO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGdhbWVNb2RlRGF0YSA9IEN1c3RvbU5ldFRhYmxlcy5HZXRUYWJsZVZhbHVlKCdnYW1lX21vZGUnLCAnY3VycmVudCcpO1xuICAgICAgICBpZiAoZ2FtZU1vZGVEYXRhICYmIGdhbWVNb2RlRGF0YS5tb2RlKSB7XG4gICAgICAgICAgICBjdXJyZW50TW9kZSA9IGdhbWVNb2RlRGF0YS5tb2RlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKCdFcnJvciByZWFkaW5nIGdhbWUgbW9kZSBmcm9tIE5ldFRhYmxlOicsIGUpO1xuICAgIH1cbiAgICAkLk1zZyhgQ3VycmVudCBnYW1lIG1vZGU6ICR7Y3VycmVudE1vZGV9YCk7XG4gICAgLy8g5qOA5p+l5piv5ZCm5Zyo5ri45oiP6L+b6KGM5LitXG4gICAgY29uc3QgZ2FtZVN0YXRlID0gR2FtZS5HZXRTdGF0ZSgpO1xuICAgICQuTXNnKGBDdXJyZW50IGdhbWUgc3RhdGU6ICR7Z2FtZVN0YXRlfWApO1xuICAgIC8vIOagueaNruWunumZheeahOa4uOaIj+eKtuaAgeW4uOmHj++8mlxuICAgIC8vIERPVEFfR0FNRVJVTEVTX1NUQVRFX1BSRV9HQU1FID0gOFxuICAgIC8vIERPVEFfR0FNRVJVTEVTX1NUQVRFX0dBTUVfSU5fUFJPR1JFU1MgPSAxMFxuICAgIC8vIOWcqOiHqui1sOaji+aooeW8j+S4i++8jOWPr+iDvea4uOaIj+eKtuaAgeS4jeWQjO+8jOaJgOS7peaUvuWuveadoeS7tuaIluebtOaOpeaYvuekulxuICAgIGxldCBzaG91bGRTaG93ID0gZ2FtZVN0YXRlID49IDggJiYgZ2FtZVN0YXRlIDw9IDEwO1xuICAgIC8vIOWmguaenOaYr+iHqui1sOaji+aooeW8j++8jOWNs+S9v+a4uOaIj+eKtuaAgeS4jeespuWQiO+8jOS5n+WwneivleaYvuekuu+8iOWboOS4uuiHqui1sOaji+WPr+iDveacieS4jeWQjOeahOeKtuaAgeWAvO+8iVxuICAgIGlmIChjdXJyZW50TW9kZSA9PT0gJ2F1dG9jaGVzcycpIHtcbiAgICAgICAgJC5Nc2coJ0F1dG9DaGVzcyBtb2RlIGRldGVjdGVkIC0gZm9yY2luZyBIVUQgZGlzcGxheScpO1xuICAgICAgICAvLyDlnKjoh6rotbDmo4vmqKHlvI/kuIvvvIzlj6ropoHkuI3mmK/liJ3lp4vljJbpmLbmrrXlsLHmmL7npLpcbiAgICAgICAgc2hvdWxkU2hvdyA9IGdhbWVTdGF0ZSA+PSAxOyAvLyDmm7Tlrr3mnb7nmoTmnaHku7ZcbiAgICB9XG4gICAgJC5Nc2coYFNob3VsZCBzaG93IFBsYXlpbmcgSFVEOiAke3Nob3VsZFNob3d9IChtb2RlOiAke2N1cnJlbnRNb2RlfSwgc3RhdGU6ICR7Z2FtZVN0YXRlfSlgKTtcbiAgICBzaG93UGxheWluZ0hVRChzaG91bGRTaG93KTtcbn1cbi8vIOmakOiXj+WOn+eUnyBEb3RhIDIgVUkg5YWD57SgXG5mdW5jdGlvbiBoaWRlTmF0aXZlVUkoKSB7XG4gICAgJC5Nc2coJ/Cfjq4gSGlkaW5nIG5hdGl2ZSBEb3RhIDIgVUkgZWxlbWVudHMuLi4nKTtcbiAgICB0cnkge1xuICAgICAgICAvLyDpmpDol4/ljp/nlJ8gSFVEIOWFg+e0oFxuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9UT1BfVElNRU9GREFZLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX1RPUF9IRVJPRVMsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfRkxZT1VUX1NDT1JFQk9BUkQsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfQUNUSU9OX1BBTkVMLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0FDVElPTl9NSU5JTUFQLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9QQU5FTCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfU0hPUCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfSVRFTVMsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1FVSUNLQlVZLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9DT1VSSUVSLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9QUk9URUNULCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9HT0xELCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX1NIT1BfU1VHR0VTVEVESVRFTVMsIGZhbHNlKTtcbiAgICAgICAgLy8g8J+UkSDlkIzml7bpmpDol4/lsI/lnLDlm77lhYPntKBcbiAgICAgICAgaGlkZU1pbmltYXBFbGVtZW50cygpO1xuICAgICAgICAkLk1zZygn4pyFIE5hdGl2ZSBVSSBlbGVtZW50cyBoaWRkZW4gc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKCfinYwgRXJyb3IgaGlkaW5nIG5hdGl2ZSBVSTonLCBlKTtcbiAgICB9XG59XG4vLyDwn5SRIOmakOiXj+Wwj+WcsOWbvuWFg+e0oFxuZnVuY3Rpb24gaGlkZU1pbmltYXBFbGVtZW50cygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgICAgICBjb25zdCBtaW5pbWFwSWRzID0gWydtaW5pbWFwJywgJ01pbmltYXBDb250YWluZXInLCAnbWluaW1hcF9jb250YWluZXInLCAnTWluaW1hcEJ1dHRvbiddO1xuICAgICAgICBtaW5pbWFwSWRzLmZvckVhY2goaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFuZWwgPSByb290UGFuZWwuRmluZENoaWxkVHJhdmVyc2UoaWQpO1xuICAgICAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICAgICAgcGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICAgICAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSBIaWRkZW4gbWluaW1hcCBlbGVtZW50OiAke2lkfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBFcnJvciBoaWRpbmcgbWluaW1hcCBlbGVtZW50czonLCBlKTtcbiAgICB9XG59XG4vLyDwn5SRIOW3suWIoOmZpHNob3dOYXRpdmVVSeWHveaVsCAtIOS4jeWGjemcgOimgeaBouWkjeWOn+eUn1VJXG4vLyDliJ3lp4vljJZcbmZ1bmN0aW9uIGluaXRpYWxpemVQbGF5aW5nSFVEKCkge1xuICAgICQuTXNnKCfwn46uIFBsYXlpbmcgSFVEIGluaXRpYWxpemluZy4uLicpO1xuICAgIC8vIPCflJEg56uL5Y2z5Yib5bu6SFVE5bm26ZqQ6JeP5Y6f55SfVUlcbiAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgaGlkZU5hdGl2ZVVJKCk7XG4gICAgaGlkZU1pbmltYXBFbGVtZW50cygpO1xuICAgIC8vIPCflJEg5Yid5aeL54q25oCB6ZqQ6JeP77yM562J5b6F5oiY5paX6Zi25q615pi+56S6XG4gICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgJC5Nc2coJ/Cfjq4gUGxheWluZyBIVUQgaW5pdGlhbGl6ZWQnKTtcbn1cbi8vIPCflJEg5pqC5pe256aB55So5omA5pyJ6Ieq5Yqo5pi+56S6SFVE55qE5LqL5Lu255uR5ZCs5ZmoXG4vLyDnm5HlkKzmuLjmiI/nirbmgIHlj5jljJbkuovku7Zcbi8vIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX3N0YXRlX2NoYW5nZWQnLCAoZGF0YTogYW55KSA9PiB7XG4vLyAgICAgJC5Nc2coJ0dhbWUgc3RhdGUgY2hhbmdlZDonLCBkYXRhKTtcbi8vICAgICBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKTtcbi8vIH0pO1xuLy8g55uR5ZCs5ri45oiP5qih5byP5Y+Y5YyW5LqL5Lu2XG4vLyBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9tb2RlX2NoYW5nZWQnLCAoZGF0YTogYW55KSA9PiB7XG4vLyAgICAgJC5Nc2coJ0dhbWUgbW9kZSBjaGFuZ2VkOicsIGRhdGEpO1xuLy8gICAgIGlmIChkYXRhICYmIGRhdGEubmV3TW9kZSkge1xuLy8gICAgICAgICAkLk1zZyhgTmV3IGdhbWUgbW9kZTogJHtkYXRhLm5ld01vZGV9YCk7XG4vLyAgICAgICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuLy8gICAgIH1cbi8vIH0pO1xuLy8g55uR5ZCs572R57uc6KGo5Lit55qE5ri45oiP5qih5byP5Y+Y5YyWXG4vLyBDdXN0b21OZXRUYWJsZXMuU3Vic2NyaWJlTmV0VGFibGVMaXN0ZW5lcignZ2FtZV9tb2RlJywgKHRhYmxlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgZGF0YTogYW55KSA9PiB7XG4vLyAgICAgaWYgKGtleSA9PT0gJ2N1cnJlbnQnKSB7XG4vLyAgICAgICAgICQuTXNnKCdHYW1lIG1vZGUgdXBkYXRlZCBpbiBOZXRUYWJsZTonLCBkYXRhKTtcbi8vICAgICAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4vLyAgICAgfVxuLy8gfSk7XG4vLyDnm5HlkKzmuLjmiI/lvIDlp4vkuovku7Zcbi8vIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX3N0YXJ0JywgKCkgPT4ge1xuLy8gICAgICQuTXNnKCdHYW1lIHN0YXJ0ZWQgLSBzaG93aW5nIHBsYXlpbmcgSFVEJyk7XG4vLyAgICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4vLyB9KTtcbi8vIOebkeWQrOa4uOaIj+e7k+adn+S6i+S7tlxuLy8gR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfZW5kJywgKCkgPT4ge1xuLy8gICAgICQuTXNnKCdHYW1lIGVuZGVkIC0gaGlkaW5nIHBsYXlpbmcgSFVEJyk7XG4vLyAgICAgc2hvd1BsYXlpbmdIVUQoZmFsc2UpO1xuLy8gfSk7XG4vLyDlrprmnJ/mo4Dmn6XmuLjmiI/nirbmgIHvvIjlpIfnlKjmlrnmoYjvvIlcbmZ1bmN0aW9uIHN0YXJ0R2FtZVN0YXRlTW9uaXRvcigpIHtcbiAgICAvLyDwn5SRIOaaguaXtuemgeeUqOiHquWKqOebkeaOp1xuICAgIC8vIGNvbnN0IGNoZWNrSW50ZXJ2YWwgPSAoKSA9PiB7XG4gICAgLy8gICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuICAgIC8vICAgICAkLlNjaGVkdWxlKDIuMCwgY2hlY2tJbnRlcnZhbCk7IC8vIOavjzLnp5Lmo4Dmn6XkuIDmrKFcbiAgICAvLyB9O1xuICAgIC8vICQuU2NoZWR1bGUoNS4wLCBjaGVja0ludGVydmFsKTsgLy8gNeenkuWQjuW8gOWni+ebkeaOp1xuICAgICQuTXNnKCfwn46uIEdhbWUgc3RhdGUgbW9uaXRvciBkaXNhYmxlZCcpO1xufVxuLy8g5a+85Ye65YWo5bGA5Ye95pWwXG5nbG9iYWxUaGlzLlBsYXlpbmdIVUQgPSB7XG4gICAgY3JlYXRlOiBjcmVhdGVQbGF5aW5nSFVELFxuICAgIHNob3c6IHNob3dQbGF5aW5nSFVELFxuICAgIGNoZWNrU3RhdGU6IGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCxcbiAgICBoaWRlTmF0aXZlVUk6IGhpZGVOYXRpdmVVSSxcbiAgICAvLyDwn5SRIOW3suWIoOmZpHNob3dOYXRpdmVVSSAtIOS4jeWGjemcgOimgeaBouWkjeWOn+eUn1VJXG4gICAgLy8g576B57uK5pu05paw5o6l5Y+jXG4gICAgdXBkYXRlU3luZXJneTogKHN5bmVyZ3lEYXRhKSA9PiB7XG4gICAgICAgICQuTXNnKCdTeW5lcmd5IHVwZGF0ZSByZWNlaXZlZDonLCBzeW5lcmd5RGF0YSk7XG4gICAgICAgIC8vIFRPRE86IOWunueOsOe+gee7iuaVsOaNruabtOaWsOmAu+i+kVxuICAgIH0sXG4gICAgLy8g5rW35YWL5pav5by65YyW5pu05paw5o6l5Y+jXG4gICAgdXBkYXRlQXVnbWVudHM6IChhdWdtZW50cykgPT4ge1xuICAgICAgICAkLk1zZygnQXVnbWVudHMgdXBkYXRlIHJlY2VpdmVkOicsIGF1Z21lbnRzKTtcbiAgICAgICAgdXBkYXRlQXVnbWVudHNEaXNwbGF5KGF1Z21lbnRzKTtcbiAgICB9XG59O1xuLy8g8J+UkSDnq4vljbPliJ3lp4vljJZcbmluaXRpYWxpemVQbGF5aW5nSFVEKCk7XG4vLyDwn5SRIOaaguaXtuemgeeUqOiHquWKqOebkeaOp1xuLy8gc3RhcnRHYW1lU3RhdGVNb25pdG9yKCk7XG4kLk1zZygn8J+OriBQbGF5aW5nIEhVRCBzY3JpcHQgbG9hZGVkJyk7XG4vLyDmt7vliqDlhajlsYDmtYvor5Xlh73mlbAgICAgXG5nbG9iYWxUaGlzLlRlc3RQbGF5aW5nSFVEID0ge1xuICAgIHNob3c6ICgpID0+IHNob3dQbGF5aW5nSFVEKHRydWUpLFxuICAgIGhpZGU6ICgpID0+IHNob3dQbGF5aW5nSFVEKGZhbHNlKSxcbiAgICBjaGVja1N0YXRlOiBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQsXG4gICAgaGlkZU5hdGl2ZTogaGlkZU5hdGl2ZVVJLFxuICAgIC8vIPCflJEg5bey5Yig6Zmkc2hvd05hdGl2ZSAtIOS4jeWGjemcgOimgeaBouWkjeWOn+eUn1VJXG4gICAgZm9yY2VTaG93OiAoKSA9PiB7XG4gICAgICAgICQuTXNnKCdGb3JjZSBzaG93aW5nIFBsYXlpbmcgSFVEIGZvciB0ZXN0aW5nLi4uJyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgfSxcbiAgICB0ZXN0QmF0dGxlRW5kVmljdG9yeTogKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIFRlc3RpbmcgYmF0dGxlIGVuZCB2aWV3IC0gVmljdG9yeSAoZGlyZWN0IGNhbGwpJyk7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkJhdHRsZUVuZFZpZXcpIHtcbiAgICAgICAgICAgIGdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldy5zaG93VmljdG9yeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSDinYwgQmF0dGxlRW5kVmlldyBub3QgbG9hZGVkIHlldCEnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdGVzdEJhdHRsZUVuZERlZmVhdDogKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIFRlc3RpbmcgYmF0dGxlIGVuZCB2aWV3IC0gRGVmZWF0IChkaXJlY3QgY2FsbCknKTtcbiAgICAgICAgaWYgKGdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldykge1xuICAgICAgICAgICAgZ2xvYmFsVGhpcy5CYXR0bGVFbmRWaWV3LnNob3dEZWZlYXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0g4p2MIEJhdHRsZUVuZFZpZXcgbm90IGxvYWRlZCB5ZXQhJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9