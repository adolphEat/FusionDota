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
    // 游戏时间
    const timePanel = $.CreatePanel('Panel', topBar, 'GameTimePanel');
    timePanel.style.width = '150px';
    timePanel.style.height = '100%';
    timePanel.style.flowChildren = 'down';
    const timeLabel = $.CreatePanel('Label', timePanel, 'GameTimeLabel');
    timeLabel.text = '⏰ 游戏时间';
    timeLabel.style.fontSize = '12px';
    timeLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    timeLabel.style.opacity = '0.7';
    const timeValue = $.CreatePanel('Label', timePanel, 'GameTimeValue');
    timeValue.text = '00:00';
    timeValue.style.fontSize = '20px';
    timeValue.style.fontWeight = 'bold';
    timeValue.style.color = PLAYING_HUD_THEME.textPrimary;
    // 分隔线
    const divider1 = $.CreatePanel('Panel', topBar, 'Divider1');
    divider1.style.width = '1px';
    divider1.style.height = '80%';
    divider1.style.backgroundColor = PLAYING_HUD_THEME.borderColor;
    divider1.style.opacity = '0.3';
    divider1.style.verticalAlign = 'center';
    // 金币信息
    const goldPanel = $.CreatePanel('Panel', topBar, 'GoldPanel');
    goldPanel.style.width = '150px';
    goldPanel.style.height = '100%';
    goldPanel.style.flowChildren = 'down';
    const goldLabel = $.CreatePanel('Label', goldPanel, 'GoldLabel');
    goldLabel.text = '💰 金币';
    goldLabel.style.fontSize = '12px';
    goldLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    goldLabel.style.opacity = '0.7';
    const goldValue = $.CreatePanel('Label', goldPanel, 'GoldValue');
    goldValue.text = '500';
    goldValue.style.fontSize = '20px';
    goldValue.style.fontWeight = 'bold';
    goldValue.style.color = PLAYING_HUD_THEME.warning;
    // 分隔线
    const divider2 = $.CreatePanel('Panel', topBar, 'Divider2');
    divider2.style.width = '1px';
    divider2.style.height = '80%';
    divider2.style.backgroundColor = PLAYING_HUD_THEME.borderColor;
    divider2.style.opacity = '0.3';
    divider2.style.verticalAlign = 'center';
    // 击杀信息
    const killPanel = $.CreatePanel('Panel', topBar, 'KillPanel');
    killPanel.style.width = 'fill-parent-flow(1)';
    killPanel.style.height = '100%';
    killPanel.style.flowChildren = 'down';
    const killLabel = $.CreatePanel('Label', killPanel, 'KillLabel');
    killLabel.text = '⚔️ 击杀/死亡/助攻';
    killLabel.style.fontSize = '12px';
    killLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    killLabel.style.opacity = '0.7';
    const killValue = $.CreatePanel('Label', killPanel, 'KillValue');
    killValue.text = '0 / 0 / 0';
    killValue.style.fontSize = '20px';
    killValue.style.fontWeight = 'bold';
    killValue.style.color = PLAYING_HUD_THEME.textAccent;
}
// 旧的英雄信息面板函数已删除，替换为羁绊面板
// 创建右侧战斗信息面板
function createRightBattlePanel(parent) {
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
function createDamageStats(parent) {
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
function createBattleLog(parent) {
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
// 添加战斗记录
function addBattleLog(message, type = 'info') {
    const logContainer = $.GetContextPanel().FindChildInLayoutFile('LogContainer');
    if (!logContainer)
        return;
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
GameEvents.Subscribe('battle_log', (data) => {
    addBattleLog(data.message, data.type);
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
    addLog: addBattleLog,
    hideNativeUI: hideNativeUI,
    // 🔑 已删除showNativeUI - 不再需要恢复原生UI
    // 预留羁绊更新接口
    updateSynergy: (synergyData) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQSx1Q0FBdUM7QUFDdkMsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVCwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxDQUFDO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksQ0FBQztBQUNiO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xccGxheWluZy1odWRcXGluZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9ICQ7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIEB0cy1ub2NoZWNrXG4vLyDmiJjmlpfkuK3nmoRIVUTnlYzpnaIgLSDlj4LogIMgRG90YTJDdXN0b21HYW1lIOiuvuiuoemjjuagvFxuLy8g56uL5Y2z5pi+56S65LiA5Liq5rWL6K+V5raI5oGvXG5HYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuJC5Nc2coJ/Cfjq4gUGxheWluZyBIVUQgc2NyaXB0IGlzIGV4ZWN1dGluZyEnKTtcbi8vIOS4u+mimOmFjee9ru+8iOWPguiAgyBEb3RhMkN1c3RvbUdhbWUg6aOO5qC877yJXG5jb25zdCBQTEFZSU5HX0hVRF9USEVNRSA9IHtcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwgMjMsIDQyLCAwLjg1KScsXG4gICAgcGFuZWxCZzogJ3JnYmEoMzMsIDM0LCAzMSwgMC45NSknLFxuICAgIGJvcmRlckNvbG9yOiAncmdiYSg1OSwgMTMwLCAyNDYsIDAuNCknLFxuICAgIHRleHRQcmltYXJ5OiAnIzNiODJmNicsXG4gICAgdGV4dFNlY29uZGFyeTogJyNmZmZmZmYnLFxuICAgIHRleHRBY2NlbnQ6ICcjZmZjNTdhJyxcbiAgICBzdWNjZXNzOiAnIzRjYWY1MCcsXG4gICAgd2FybmluZzogJyNmZjk4MDAnLFxuICAgIGRhbmdlcjogJyNmNDQzMzYnLFxuICAgIGhlYWx0aDogJyNmNDQzMzYnLFxuICAgIG1hbmE6ICcjMjE5NmYzJyxcbn07XG4vLyDnvoHnu4rlm77moIfmmKDlsIQgLSDkvb/nlKggaWNvbiDmlofku7blpLnkuK3nmoTlm77moIdcbi8vIOazqOaEj++8muS9v+eUqOWfuuehgOaWh+S7tuWQje+8iOS4jeWQqyBfcG5nIOWQjue8gOWSjCAucG5nIOaJqeWxleWQje+8iVxuY29uc3QgU1lORVJHWV9JQ09OX01BUCA9IHtcbiAgICBzeWxwaF8xOiAnaGF6YXJkX2NoaWxsaW5ndG91Y2gnLCAvLyDku5nngbUgLSDlr5LlhrDop6bmkbjlm77moIdcbiAgICBkaXZpbmVfZ2VuZXJhbF8xOiAnaGF6YXJkX2FybW9yJywgLy8g56We5bCGIC0g5oqk55Sy5Zu+5qCHXG4gICAgd2lsZF8xOiAnaGF6YXJkX2VucmFnZV8yJywgLy8g54uC6YeOIC0g54uC5pq05Zu+5qCHXG4gICAgdm9pZF8xOiAnaGF6YXJkX21ldGVvcicsIC8vIOiZmuepuiAtIOa1geaYn+Wbvuagh1xuICAgIGJlcnNlcmtlcl8xOiAnaGF6YXJkX2F0dGFjaycsIC8vIOaImOaWl+eLguS6uiAtIOaUu+WHu+Wbvuagh1xuICAgIGNyZWF0aW9uOiAnaGF6YXJkX2dsaW1tZXInLCAvLyDliJvpgKAgLSDpl6rlhYnlm77moIdcbiAgICByYW5nZXJfMTogJ2hhemFyZF9zcGVlZCcsIC8vIOa4uOS+oCAtIOmAn+W6puWbvuagh1xuICAgIGtuaWdodF8xOiAnaGF6YXJkX2Zyb250cmVkdWN0aW9uJywgLy8g6aqR5aOrIC0g5q2j6Z2i5YeP5Lyk5Zu+5qCHXG4gICAgd2Fycmlvcl8xOiAnaGF6YXJkX2FybW9yJywgLy8g5paX5aOrIC0g5oqk55Sy5Zu+5qCHXG4gICAgbWFnZV8xOiAnaGF6YXJkX21hZ2ljcmVzaXN0JywgLy8g5rOV5biIIC0g6a2U5oqX5Zu+5qCHXG4gICAgd2FybG9ja18xOiAnaGF6YXJkX2J1YmJsZScsIC8vIOacr+W4iCAtIOawlOazoeWbvuagh1xuICAgIGRlc3Ryb3llcl8xOiAnaGF6YXJkX2F0dGFjaycsIC8vIOavgeeBreiAhSAtIOaUu+WHu+Wbvuagh++8iOS4tOaXtuS9v+eUqO+8iVxufTtcbi8vIOaooeadv+e+gee7iuaVsOaNru+8iOeUqOS6jlVJ5bGV56S677yJXG5jb25zdCBURU1QTEFURV9TWU5FUkdJRVMgPSBbXG4gICAge1xuICAgICAgICBpZDogJ3N5bHBoXzEnLFxuICAgICAgICBuYW1lOiAn5LuZ54G1JyxcbiAgICAgICAgdHlwZTogJ3JhY2UnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2NoaWxsaW5ndG91Y2hfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMCxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+S7meeBteeahOaZruaUu+aciTMwJeacuueOh+WHj+Wwkeebruagh+azleWKm++8jOW5tuaBouWkjTXms5XlipsnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiAzLCBlZmZlY3Q6ICfku5nngbXnmoTmma7mlLvmnIkzMCXmnLrnjoflh4/lsJHnm67moIfms5XlipvvvIzlubbmgaLlpI0xMOazleWKmycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDQsIGVmZmVjdDogJ+S7meeBteeahOaZruaUu+aciTMwJeacuueOh+WHj+Wwkeebruagh+azleWKm++8jOW5tuaBouWkjTE15rOV5YqbJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdkaXZpbmVfZ2VuZXJhbF8xJyxcbiAgICAgICAgbmFtZTogJ+elnuWwhicsXG4gICAgICAgIHR5cGU6ICdyYWNlJyxcbiAgICAgICAgaWNvbjogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uL2hhemFyZF9hcm1vcl9wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAwLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMiwgZWZmZWN0OiAn56We5bCG6I635b6XKzPmiqTnlLLvvIwrM+mtlOaKl++8jOavj+asoeaZruaUu+WRveS4reWbnuWkjeWFqOS9k+WPi+WGmzEw55Sf5ZG9JywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogMywgZWZmZWN0OiAn56We5bCG6I635b6XKzbmiqTnlLLvvIwrNumtlOaKl++8jOavj+asoeaZruaUu+WRveS4reWbnuWkjeWFqOS9k+WPi+WGmzIw55Sf5ZG9JywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNSwgZWZmZWN0OiAn56We5bCG6I635b6XKzEw5oqk55Sy77yMKzEw6a2U5oqX77yM5q+P5qyh5pmu5pS75ZG95Lit5Zue5aSN5YWo5L2T5Y+L5YabNDDnlJ/lkb0nLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3dpbGRfMScsXG4gICAgICAgIG5hbWU6ICfni4Lph44nLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfZW5yYWdlXzJfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMCxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDMsIGVmZmVjdDogJ+aImOaWl+W8gOWni+WQjuavjzEw56eS6Kem5Y+R5LiA5qyh77ya5aKe5YqgMTAl5pS75Ye76YCf5bqm77yI5Y+v5Y+g5Yqg77yJJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5oiY5paX5byA5aeL5ZCO5q+PMTDnp5Lop6blj5HkuIDmrKHvvJrlop7liqAxMCXmlLvlh7vpgJ/luqbvvIjlj6/lj6DliqDvvInvvIzlop7liqAxMOeCueeJqeeQhuaUu+WHu++8iOWPr+WPoOWKoO+8iScsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDUsIGVmZmVjdDogJ+aImOaWl+W8gOWni+WQjuavjzEw56eS6Kem5Y+R5LiA5qyh77ya5aKe5YqgMTAl5pS75Ye76YCf5bqm77yI5Y+v5Y+g5Yqg77yJ77yM5aKe5YqgMTDngrnniannkIbmlLvlh7vvvIjlj6/lj6DliqDvvInvvIzlkJHlnLrkuIrnlJ/lkb3lgLzmnIDkvY7nmoTljZXkvY3mipXmjrfplb/nn5vpgKDmiJDkvKTlrrPvvIznm67moIfooYDph4/kvY7kuo4yMCXml7blpITlhrMnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3ZvaWRfMScsXG4gICAgICAgIG5hbWU6ICfomZrnqbonLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfbWV0ZW9yX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfomZrnqbrljZXkvY3mma7mlLvkuI7mioDog73pmYTluKY1Jeecn+WunuS8pOWusycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDUsIGVmZmVjdDogJ+iZmuepuuWNleS9jeaZruaUu+S4juaKgOiDvemZhOW4pjE1Jeecn+WunuS8pOWusycsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnYmVyc2Vya2VyXzEnLFxuICAgICAgICBuYW1lOiAn5oiY5paX54uC5Lq6JyxcbiAgICAgICAgdHlwZTogJ3JhY2UnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2F0dGFja19wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAwLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMiwgZWZmZWN0OiAn5Zy65LiK5pyJ5Y2V5L2N5q275Lqh5pe277yM5oiY5paX54uC5Lq66I635b6XMTAl5pS75Ye76YCf5bqm5ZKMMjAl5YWo6IO95aKe5LykJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5Zy65LiK5pyJ5Y2V5L2N5q275Lqh5pe277yM5oiY5paX54uC5Lq66I635b6XMzAl5pS75Ye76YCf5bqm5ZKMNTAl5YWo6IO95aKe5LykJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdjcmVhdGlvbicsXG4gICAgICAgIG5hbWU6ICfliJvpgKAnLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfZ2xpbW1lcl9wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAwLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMSwgZWZmZWN0OiAn5Y2h5bCU5Y+v5Lul6KeG5Li65Lu75L2V56eN5peP77yI5Y2z5omA5pyJ56eN5peP6K6h5pWwKzHvvIzkuJTljaHlsJTlj6/ku6Xkuqvlj5fliLDmiYDmnInnp43ml4/nmoTliqDmiJDvvIknLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3Jhbmdlcl8xJyxcbiAgICAgICAgbmFtZTogJ+a4uOS+oCcsXG4gICAgICAgIHR5cGU6ICdjbGFzcycsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfc3BlZWRfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMCxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+avj+i/hznnp5LvvIzmiYDmnInmuLjkvqDojrflvpcz56eSKzUwJeaUu+mAn+aPkOWNhycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDMsIGVmZmVjdDogJ+avj+i/hznnp5LvvIzmiYDmnInmuLjkvqDojrflvpcz56eSKzEwMCXmlLvpgJ/mj5DljYcnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA1LCBlZmZlY3Q6ICfmr4/ov4c156eS77yM5omA5pyJ5ri45L6g6I635b6XM+enkisxNTAl5pS76YCf5o+Q5Y2HJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdrbmlnaHRfMScsXG4gICAgICAgIG5hbWU6ICfpqpHlo6snLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2Zyb250cmVkdWN0aW9uX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvmoLzmjKExMOS8pOWusycsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDQsIGVmZmVjdDogJ+aJgOacieWPi+WGm+agvOaMoTIw5Lyk5a6zJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNSwgZWZmZWN0OiAn5omA5pyJ5Y+L5Yab5qC85oyhNDDkvKTlrrMnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3dhcnJpb3JfMScsXG4gICAgICAgIG5hbWU6ICfmlpflo6snLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2FybW9yX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcyNTDpop3lpJbnlJ/lkb3lgLzvvIzmlpflo6vljZXkvY3pop3lpJbojrflvpcxMDDnlJ/lkb3lgLwnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA0LCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpc1MDDpop3lpJbnlJ/lkb3lgLzvvIzmlpflo6vljZXkvY3pop3lpJbojrflvpcyMDDnlJ/lkb3lgLwnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ21hZ2VfMScsXG4gICAgICAgIG5hbWU6ICfms5XluIgnLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX21hZ2ljcmVzaXN0X3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcxL+enkuazleWKm+aBouWkje+8jOazleW4iOWNleS9jeiOt+W+lzIv56eS5rOV5Yqb5oGi5aSNJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5omA5pyJ5Y+L5Yab6I635b6XMi/np5Lms5XlipvmgaLlpI3vvIzms5XluIjljZXkvY3ojrflvpc0L+enkuazleWKm+aBouWkjScsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnd2FybG9ja18xJyxcbiAgICAgICAgbmFtZTogJ+acr+W4iCcsXG4gICAgICAgIHR5cGU6ICdjbGFzcycsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfYnViYmxlX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDAsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAxLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcxMCXprZTms5XmipfmgKfvvIzmnK/lo6vojrflvpcyMCXprZTms5XmipfmgKcnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiAzLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvojrflvpcxNSXprZTms5XmipfmgKfvvIzmnK/lo6vojrflvpczMCXprZTms5XmipfmgKcnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG4vLyDliJvlu7rmiJjmlpdIVURcbmZ1bmN0aW9uIGNyZWF0ZVBsYXlpbmdIVUQoKSB7XG4gICAgJC5Nc2coJ/Cfjq4gQ1JFQVRJTkcgUExBWUlORyBIVUQgLSBORVcgVkVSU0lPTiAyMjo1MCDwn46uJyk7XG4gICAgLy8g8J+UkSDnoa7kv53pmpDol4/ljp/nlJ9VSe+8iOWcqOWIm+W7ukhVROS5i+WJje+8iVxuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ0Vycm9yOiBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOWIoOmZpOW3suWtmOWcqOeahOWuueWZqFxuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICB9XG4gICAgLy8g5Yib5bu65Li75a655ZmoXG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgLy8g56e76ZmkaGl0dGVzdOiuvue9ru+8jOmBv+WFjVBhbm9yYW1hIEFQSemXrumimFxuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMCc7XG4gICAgY29udGFpbmVyLkFkZENsYXNzKCdwbGF5aW5nX2h1ZF9yb290Jyk7XG4gICAgLy8g5Yib5bu66aG26YOo5L+h5oGv5qCPXG4gICAgY3JlYXRlVG9wSW5mb0Jhcihjb250YWluZXIpO1xuICAgIC8vIOWIm+W7uuW3puS+p+e+gee7iumdouadv1xuICAgIGNyZWF0ZUxlZnRTeW5lcmd5UGFuZWwoY29udGFpbmVyKTtcbiAgICAvLyDliJvlu7rlj7PkvqfmiJjmlpfkv6Hmga/pnaLmnb9cbiAgICBjcmVhdGVSaWdodEJhdHRsZVBhbmVsKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65bqV6YOo5b+r5o235qCPXG4gICAgY3JlYXRlQm90dG9tUXVpY2tCYXIoY29udGFpbmVyKTtcbn1cbi8vIOWIm+W7uue+gee7iuaViOaenOadoeebrlxuZnVuY3Rpb24gY3JlYXRlU3luZXJneVRpZXIocGFyZW50LCB0aWVyLCBpbmRleCkge1xuICAgIGNvbnN0IHRpZXJJdGVtID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBTeW5lcmd5VGllcl8ke2luZGV4fWApO1xuICAgIHRpZXJJdGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRpZXJJdGVtLnN0eWxlLmhlaWdodCA9ICcyMnB4JztcbiAgICB0aWVySXRlbS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnM3B4JztcbiAgICB0aWVySXRlbS5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIHRpZXJJdGVtLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDVweCc7XG4gICAgLy8g5re75Yqg5r+A5rS754q25oCB57G7XG4gICAgaWYgKHRpZXIuYWN0aXZlKSB7XG4gICAgICAgIHRpZXJJdGVtLkFkZENsYXNzKCdzeW5lcmd5X3RpZXInKTtcbiAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ3N5bmVyZ3lfdGllcicpO1xuICAgICAgICB0aWVySXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICB9XG4gICAgLy8g54q25oCB5Zu+5qCHXG4gICAgY29uc3Qgc3RhdHVzSWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGllckl0ZW0sIGBUaWVyU3RhdHVzXyR7aW5kZXh9YCk7XG4gICAgc3RhdHVzSWNvbi50ZXh0ID0gdGllci5hY3RpdmUgPyAn4pyTJyA6ICfil4snO1xuICAgIHN0YXR1c0ljb24uQWRkQ2xhc3MoJ3RpZXJfaWNvbicpO1xuICAgIHN0YXR1c0ljb24uc3R5bGUud2lkdGggPSAnMjBweCc7XG4gICAgc3RhdHVzSWNvbi5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBzdGF0dXNJY29uLnN0eWxlLmNvbG9yID0gdGllci5hY3RpdmUgPyAnI2ZmZDcwMCcgOiAnIzY0NzQ4Yic7XG4gICAgc3RhdHVzSWNvbi5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g6ZyA5rGC5pWw6YePXG4gICAgY29uc3QgcmVxdWlyZW1lbnQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpZXJJdGVtLCBgVGllclJlcXVpcmVtZW50XyR7aW5kZXh9YCk7XG4gICAgcmVxdWlyZW1lbnQudGV4dCA9IGAoJHt0aWVyLmNvdW50fSlgO1xuICAgIHJlcXVpcmVtZW50LkFkZENsYXNzKCd0aWVyX3JlcXVpcmVtZW50Jyk7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUud2lkdGggPSAnMzVweCc7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUuZm9udFNpemUgPSAnMTFweCc7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUuY29sb3IgPSB0aWVyLmFjdGl2ZSA/ICcjZmZkNzAwJyA6ICcjOTRhM2I4JztcbiAgICByZXF1aXJlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJlcXVpcmVtZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDmlYjmnpzmj4/ov7BcbiAgICBjb25zdCBlZmZlY3QgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpZXJJdGVtLCBgVGllckVmZmVjdF8ke2luZGV4fWApO1xuICAgIGVmZmVjdC50ZXh0ID0gdGllci5lZmZlY3Q7XG4gICAgZWZmZWN0LkFkZENsYXNzKCd0aWVyX2VmZmVjdCcpO1xuICAgIGVmZmVjdC5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBlZmZlY3Quc3R5bGUuZm9udFNpemUgPSAnMTFweCc7XG4gICAgZWZmZWN0LnN0eWxlLmNvbG9yID0gdGllci5hY3RpdmUgPyAnI2ZmZmZmZicgOiAnIzk0YTNiOCc7XG4gICAgZWZmZWN0LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbn1cbi8vIOWIm+W7uuWNleS4que+gee7iumhuVxuZnVuY3Rpb24gY3JlYXRlU3luZXJneUl0ZW0ocGFyZW50LCBzeW5lcmd5KSB7XG4gICAgY29uc3Qgc3luZXJneUl0ZW0gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgYFN5bmVyZ3lfJHtzeW5lcmd5LmlkfWApO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG4gICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDEwMCwgMTE2LCAxMzksIDAuNSknO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAvLyDliKTmlq3mv4DmtLvnirbmgIFcbiAgICBjb25zdCBoYXNBY3RpdmVFZmZlY3QgPSBzeW5lcmd5LnRpZXJzLnNvbWUodGllciA9PiB0aWVyLmFjdGl2ZSk7XG4gICAgY29uc3QgYWxsRWZmZWN0c0FjdGl2ZSA9IHN5bmVyZ3kudGllcnMuZXZlcnkodGllciA9PiB0aWVyLmFjdGl2ZSk7XG4gICAgLy8g5re75Yqg54q25oCB57G7XG4gICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ3N5bmVyZ3lfaXRlbScpO1xuICAgIGlmIChhbGxFZmZlY3RzQWN0aXZlKSB7XG4gICAgICAgIHN5bmVyZ3lJdGVtLkFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDI1NSwgMjE1LCAwLCAwLjgpJztcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm94U2hhZG93ID0gJzAgMCAxNXB4IHJnYmEoMjU1LCAyMTUsIDAsIDAuNCknO1xuICAgIH1cbiAgICBlbHNlIGlmIChoYXNBY3RpdmVFZmZlY3QpIHtcbiAgICAgICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ3BhcnRpYWwnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDU5LCAxMzAsIDI0NiwgMC44KSc7XG4gICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTBweCByZ2JhKDU5LCAxMzAsIDI0NiwgMC4zKSc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzeW5lcmd5SXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgIH1cbiAgICAvLyDnvoHnu4rlpLTpg6hcbiAgICBjb25zdCBoZWFkZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN5bmVyZ3lJdGVtLCBgU3luZXJneUhlYWRlcl8ke3N5bmVyZ3kuaWR9YCk7XG4gICAgaGVhZGVyLkFkZENsYXNzKCdzeW5lcmd5X2hlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzQwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICBoZWFkZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICAvLyDlm77moIcgLSDkvb/nlKhJbWFnZemdouadv++8iFBhbm9yYW1h5o6o6I2Q5pa55byP77yJXG4gICAgY29uc3QgaWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0ltYWdlJywgaGVhZGVyLCBgU3luZXJneUljb25fJHtzeW5lcmd5LmlkfWApO1xuICAgIGljb24uQWRkQ2xhc3MoJ3N5bmVyZ3lfaWNvbicpO1xuICAgIC8vIOS7juaYoOWwhOS4reiOt+WPluWbvuagh+aWh+S7tuWQjeW5tuaehOW7uuWujOaVtOi3r+W+hFxuICAgIC8vIFBhbm9yYW1hIOWbvuagh+ezu+e7n+S8muiHquWKqOWkhOeQhiBfcG5nLnBuZyDlkI7nvIBcbiAgICBjb25zdCBpY29uRmlsZU5hbWUgPSBTWU5FUkdZX0lDT05fTUFQW3N5bmVyZ3kuaWRdO1xuICAgIGNvbnN0IGljb25QYXRoID0gaWNvbkZpbGVOYW1lXG4gICAgICAgID8gYGZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uLyR7aWNvbkZpbGVOYW1lfV9wbmcucG5nYFxuICAgICAgICA6IHN5bmVyZ3kuaWNvbjsgLy8g5aaC5p6c5pig5bCE5LiN5a2Y5Zyo77yM5L2/55So5Y6f6Lev5b6E5L2c5Li65ZCO5aSHXG4gICAgLy8g6LCD6K+V5pel5b+X77ya6L6T5Ye65Zu+5qCH6Lev5b6EXG4gICAgJC5Nc2coYPCflrzvuI8gTG9hZGluZyBzeW5lcmd5IGljb246ICR7c3luZXJneS5uYW1lfSAoJHtzeW5lcmd5LmlkfSkgLSAke2ljb25QYXRofWApO1xuICAgIC8vIOS9v+eUqFNldEltYWdl5pa55rOV5Yqg6L295Zu+54mH77yI6ZyA6KaBWE1M6aKE5Yqg6L295omN6IO96Ieq5Yqo57yW6K+RUE5H77yJXG4gICAgLy8g6Lev5b6E5qC85byP77yaZmlsZTovL3tpbWFnZXN9Ly4uLiDkvJrooqvoh6rliqjovazmjaLkuLrnvJbor5HlkI7nmoR2dGV4X2NcbiAgICBpY29uLlNldEltYWdlKGljb25QYXRoKTtcbiAgICBpY29uLnN0eWxlLndpZHRoID0gJzMycHgnO1xuICAgIGljb24uc3R5bGUuaGVpZ2h0ID0gJzMycHgnO1xuICAgIGljb24uc3R5bGUubWFyZ2luUmlnaHQgPSAnOHB4JztcbiAgICBpY29uLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBpY29uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc2cHgnO1xuICAgIGljb24uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknO1xuICAgIGljb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMyYTJhM2EnOyAvLyDmt7vliqDog4zmma/oibLkvr/kuo7osIPor5VcbiAgICAvLyDkv6Hmga/ljLrln59cbiAgICBjb25zdCBpbmZvID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBoZWFkZXIsIGBTeW5lcmd5SW5mb18ke3N5bmVyZ3kuaWR9YCk7XG4gICAgaW5mby5BZGRDbGFzcygnc3luZXJneV9pbmZvJyk7XG4gICAgaW5mby5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBpbmZvLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBpbmZvLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAvLyDlkI3np7BcbiAgICBjb25zdCBuYW1lID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBpbmZvLCBgU3luZXJneU5hbWVfJHtzeW5lcmd5LmlkfWApO1xuICAgIG5hbWUuQWRkQ2xhc3MoJ3N5bmVyZ3lfbmFtZScpO1xuICAgIG5hbWUudGV4dCA9IHN5bmVyZ3kubmFtZTtcbiAgICBuYW1lLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIG5hbWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBuYW1lLnN0eWxlLmNvbG9yID0gaGFzQWN0aXZlRWZmZWN0ID8gJyNmZmQ3MDAnIDogJyNmZmZmZmYnO1xuICAgIG5hbWUuc3R5bGUubWFyZ2luQm90dG9tID0gJzJweCc7XG4gICAgLy8g6K6h5pWwXG4gICAgY29uc3QgbWF4Q291bnQgPSBNYXRoLm1heCguLi5zeW5lcmd5LnRpZXJzLm1hcCh0ID0+IHQuY291bnQpKTtcbiAgICBjb25zdCBjb3VudCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaW5mbywgYFN5bmVyZ3lDb3VudF8ke3N5bmVyZ3kuaWR9YCk7XG4gICAgY291bnQuQWRkQ2xhc3MoJ3N5bmVyZ3lfY291bnQnKTtcbiAgICBjb3VudC50ZXh0ID0gYCR7c3luZXJneS5jdXJyZW50Q291bnR9LyR7bWF4Q291bnR9YDtcbiAgICBjb3VudC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBjb3VudC5zdHlsZS5jb2xvciA9IGhhc0FjdGl2ZUVmZmVjdCA/ICcjZmZjNTdhJyA6ICcjOTRhM2I4JztcbiAgICAvLyDmlYjmnpzliJfooahcbiAgICBjb25zdCB0aWVyc0NvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc3luZXJneUl0ZW0sIGBTeW5lcmd5VGllcnNfJHtzeW5lcmd5LmlkfWApO1xuICAgIHRpZXJzQ29udGFpbmVyLkFkZENsYXNzKCdzeW5lcmd5X3RpZXJzJyk7XG4gICAgdGllcnNDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGllcnNDb250YWluZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIHRpZXJzQ29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gJzVweCc7XG4gICAgLy8g5Yib5bu65q+P5Liq5pWI5p6c5p2h55uuXG4gICAgc3luZXJneS50aWVycy5mb3JFYWNoKCh0aWVyLCBpbmRleCkgPT4ge1xuICAgICAgICBjcmVhdGVTeW5lcmd5VGllcih0aWVyc0NvbnRhaW5lciwgdGllciwgaW5kZXgpO1xuICAgIH0pO1xufVxuLy8g5Yib5bu65bem5L6n576B57uK6Z2i5p2/XG5mdW5jdGlvbiBjcmVhdGVMZWZ0U3luZXJneVBhbmVsKHBhcmVudCkge1xuICAgICQuTXNnKCfwn46uIENyZWF0aW5nIGxlZnQgc3luZXJneSBwYW5lbC4uLicpO1xuICAgIGNvbnN0IGxlZnRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnTGVmdFN5bmVyZ3lQYW5lbCcpO1xuICAgIGxlZnRQYW5lbC5zdHlsZS53aWR0aCA9ICcyODBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLm1heEhlaWdodCA9ICc2MDBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdsZWZ0JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTAwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJzIwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7UExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBsZWZ0UGFuZWwuc3R5bGUub3ZlcmZsb3cgPSAnc3F1aXNoIHNjcm9sbCc7XG4gICAgLy8g6Z2i5p2/5qCH6aKYXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxlZnRQYW5lbCwgJ1N5bmVyZ3lQYW5lbFRpdGxlJyk7XG4gICAgdGl0bGUuQWRkQ2xhc3MoJ3N5bmVyZ3lfcGFuZWxfdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ/Cfjq8g576B57uK5pWI5p6cJztcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g5Yib5bu65omA5pyJ576B57uK6aG5XG4gICAgVEVNUExBVEVfU1lORVJHSUVTLmZvckVhY2goc3luZXJneSA9PiB7XG4gICAgICAgIGNyZWF0ZVN5bmVyZ3lJdGVtKGxlZnRQYW5lbCwgc3luZXJneSk7XG4gICAgfSk7XG4gICAgJC5Nc2coYPCfjq4gU3luZXJneSBwYW5lbCBjcmVhdGVkIHdpdGggJHtURU1QTEFURV9TWU5FUkdJRVMubGVuZ3RofSBzeW5lcmdpZXNgKTtcbn1cbi8vIOWIm+W7uumhtumDqOS/oeaBr+agj1xuZnVuY3Rpb24gY3JlYXRlVG9wSW5mb0JhcihwYXJlbnQpIHtcbiAgICBjb25zdCB0b3BCYXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1RvcEluZm9CYXInKTtcbiAgICB0b3BCYXIuc3R5bGUud2lkdGggPSAnNzAwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5oZWlnaHQgPSAnNjBweCc7XG4gICAgdG9wQmFyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRvcEJhci5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgdG9wQmFyLnN0eWxlLm1hcmdpblRvcCA9ICcyMHB4JztcbiAgICB0b3BCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUucGFuZWxCZztcbiAgICB0b3BCYXIuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgdG9wQmFyLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICB0b3BCYXIuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgdG9wQmFyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgLy8g5ri45oiP5pe26Ze0XG4gICAgY29uc3QgdGltZVBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdHYW1lVGltZVBhbmVsJyk7XG4gICAgdGltZVBhbmVsLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICB0aW1lUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHRpbWVQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3QgdGltZUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aW1lUGFuZWwsICdHYW1lVGltZUxhYmVsJyk7XG4gICAgdGltZUxhYmVsLnRleHQgPSAn4o+wIOa4uOaIj+aXtumXtCc7XG4gICAgdGltZUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIHRpbWVMYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgdGltZUxhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC43JztcbiAgICBjb25zdCB0aW1lVmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpbWVQYW5lbCwgJ0dhbWVUaW1lVmFsdWUnKTtcbiAgICB0aW1lVmFsdWUudGV4dCA9ICcwMDowMCc7XG4gICAgdGltZVZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIHRpbWVWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpbWVWYWx1ZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIC8vIOWIhumalOe6v1xuICAgIGNvbnN0IGRpdmlkZXIxID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdEaXZpZGVyMScpO1xuICAgIGRpdmlkZXIxLnN0eWxlLndpZHRoID0gJzFweCc7XG4gICAgZGl2aWRlcjEuc3R5bGUuaGVpZ2h0ID0gJzgwJSc7XG4gICAgZGl2aWRlcjEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3I7XG4gICAgZGl2aWRlcjEuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGRpdmlkZXIxLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDph5HluIHkv6Hmga9cbiAgICBjb25zdCBnb2xkUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ0dvbGRQYW5lbCcpO1xuICAgIGdvbGRQYW5lbC5zdHlsZS53aWR0aCA9ICcxNTBweCc7XG4gICAgZ29sZFBhbmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBnb2xkUGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IGdvbGRMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgZ29sZFBhbmVsLCAnR29sZExhYmVsJyk7XG4gICAgZ29sZExhYmVsLnRleHQgPSAn8J+SsCDph5HluIEnO1xuICAgIGdvbGRMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBnb2xkTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGdvbGRMYWJlbC5zdHlsZS5vcGFjaXR5ID0gJzAuNyc7XG4gICAgY29uc3QgZ29sZFZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBnb2xkUGFuZWwsICdHb2xkVmFsdWUnKTtcbiAgICBnb2xkVmFsdWUudGV4dCA9ICc1MDAnO1xuICAgIGdvbGRWYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICBnb2xkVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBnb2xkVmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS53YXJuaW5nO1xuICAgIC8vIOWIhumalOe6v1xuICAgIGNvbnN0IGRpdmlkZXIyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdEaXZpZGVyMicpO1xuICAgIGRpdmlkZXIyLnN0eWxlLndpZHRoID0gJzFweCc7XG4gICAgZGl2aWRlcjIuc3R5bGUuaGVpZ2h0ID0gJzgwJSc7XG4gICAgZGl2aWRlcjIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3I7XG4gICAgZGl2aWRlcjIuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGRpdmlkZXIyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDlh7vmnYDkv6Hmga9cbiAgICBjb25zdCBraWxsUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ0tpbGxQYW5lbCcpO1xuICAgIGtpbGxQYW5lbC5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBraWxsUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGtpbGxQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3Qga2lsbExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBraWxsUGFuZWwsICdLaWxsTGFiZWwnKTtcbiAgICBraWxsTGFiZWwudGV4dCA9ICfimpTvuI8g5Ye75p2AL+atu+S6oS/liqnmlLsnO1xuICAgIGtpbGxMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBraWxsTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGtpbGxMYWJlbC5zdHlsZS5vcGFjaXR5ID0gJzAuNyc7XG4gICAgY29uc3Qga2lsbFZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBraWxsUGFuZWwsICdLaWxsVmFsdWUnKTtcbiAgICBraWxsVmFsdWUudGV4dCA9ICcwIC8gMCAvIDAnO1xuICAgIGtpbGxWYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICBraWxsVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBraWxsVmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0QWNjZW50O1xufVxuLy8g5pen55qE6Iux6ZuE5L+h5oGv6Z2i5p2/5Ye95pWw5bey5Yig6Zmk77yM5pu/5o2i5Li6576B57uK6Z2i5p2/XG4vLyDliJvlu7rlj7PkvqfmiJjmlpfkv6Hmga/pnaLmnb9cbmZ1bmN0aW9uIGNyZWF0ZVJpZ2h0QmF0dGxlUGFuZWwocGFyZW50KSB7XG4gICAgY29uc3QgcmlnaHRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnUmlnaHRCYXR0bGVQYW5lbCcpO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUud2lkdGggPSAnMjgwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzQwMHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTAwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIC8vIOmdouadv+agh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByaWdodFBhbmVsLCAnQmF0dGxlUGFuZWxUaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn4pqU77iPIOaImOaWl+S/oeaBryc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIC8vIOS8pOWus+e7n+iuoVxuICAgIGNyZWF0ZURhbWFnZVN0YXRzKHJpZ2h0UGFuZWwpO1xuICAgIC8vIOaImOaWl+iusOW9lVxuICAgIGNyZWF0ZUJhdHRsZUxvZyhyaWdodFBhbmVsKTtcbn1cbi8vIOWIm+W7uuS8pOWus+e7n+iuoVxuZnVuY3Rpb24gY3JlYXRlRGFtYWdlU3RhdHMocGFyZW50KSB7XG4gICAgY29uc3Qgc3RhdHNTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdEYW1hZ2VTdGF0c1NlY3Rpb24nKTtcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICcxNTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzVGl0bGUnKTtcbiAgICBzdGF0c1RpdGxlLnRleHQgPSAn8J+TiiDkvKTlrrPnu5/orqEnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIHN0YXRzVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIGNvbnN0IHN0YXRzID0gW1xuICAgICAgICB7IGlkOiAnZGFtYWdlX2RlYWx0JywgbGFiZWw6ICfpgKDmiJDkvKTlrrM6JywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGlkOiAnZGFtYWdlX3Rha2VuJywgbGFiZWw6ICflj5fliLDkvKTlrrM6JywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGlkOiAnaGVhbGluZycsIGxhYmVsOiAn5rK755aX6YePOicsIHZhbHVlOiAnMCcgfSxcbiAgICAgICAgeyBpZDogJ2RwcycsIGxhYmVsOiAnRFBTOicsIHZhbHVlOiAnMCcgfSxcbiAgICBdO1xuICAgIHN0YXRzLmZvckVhY2goKHN0YXQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRSb3cgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN0YXRzU2VjdGlvbiwgYFN0YXRSb3dfJHtzdGF0LmlkfWApO1xuICAgICAgICBzdGF0Um93LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBzdGF0Um93LnN0eWxlLmhlaWdodCA9ICcyNXB4JztcbiAgICAgICAgc3RhdFJvdy5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAgICAgc3RhdFJvdy5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgICAgICBjb25zdCBsYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdFJvdywgYCR7c3RhdC5pZH1fTGFiZWxgKTtcbiAgICAgICAgbGFiZWwudGV4dCA9IHN0YXQubGFiZWw7XG4gICAgICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICBsYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxhYmVsLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICAgICAgY29uc3QgdmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRSb3csIGAke3N0YXQuaWR9X1ZhbHVlYCk7XG4gICAgICAgIHZhbHVlLnRleHQgPSBzdGF0LnZhbHVlO1xuICAgICAgICB2YWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgdmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgdmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICAgICAgdmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgdmFsdWUuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgfSk7XG59XG4vLyDliJvlu7rmiJjmlpforrDlvZVcbmZ1bmN0aW9uIGNyZWF0ZUJhdHRsZUxvZyhwYXJlbnQpIHtcbiAgICBjb25zdCBsb2dTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdCYXR0bGVMb2dTZWN0aW9uJyk7XG4gICAgbG9nU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLm92ZXJmbG93ID0gJ3NxdWlzaCBzY3JvbGwnO1xuICAgIGNvbnN0IGxvZ1RpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBsb2dTZWN0aW9uLCAnTG9nVGl0bGUnKTtcbiAgICBsb2dUaXRsZS50ZXh0ID0gJ/Cfk50g5oiY5paX6K6w5b2VJztcbiAgICBsb2dUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBsb2dUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGxvZ1RpdGxlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBsb2dUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgY29uc3QgbG9nQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBsb2dTZWN0aW9uLCAnTG9nQ29udGFpbmVyJyk7XG4gICAgbG9nQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxvZ0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgbG9nQ29udGFpbmVyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbn1cbi8vIOWIm+W7uuW6lemDqOW/q+aNt+agj1xuZnVuY3Rpb24gY3JlYXRlQm90dG9tUXVpY2tCYXIocGFyZW50KSB7XG4gICAgY29uc3QgYm90dG9tQmFyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdCb3R0b21RdWlja0JhcicpO1xuICAgIGNvbnN0IHF1aWNrQWN0aW9ucyA9IFtcbiAgICAgICAgeyBpZDogJ2ludmVudG9yeScsIG5hbWU6ICfog4zljIUnIH0sXG4gICAgICAgIHsgaWQ6ICdza2lsbHMnLCBuYW1lOiAn5oqA6IO9JyB9LFxuICAgICAgICB7IGlkOiAnc3RhZ2Vfc2VsZWN0JywgbmFtZTogJ+mAieWFsycgfSxcbiAgICAgICAgeyBpZDogJ3Rlc3Rfa2lsbCcsIG5hbWU6ICfmtYvor5Xnu5PnrpcnIH0sXG4gICAgXTtcbiAgICBxdWlja0FjdGlvbnMuZm9yRWFjaCgoYWN0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBidG4gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBib3R0b21CYXIsIGBRdWlja0FjdGlvbl8ke2FjdGlvbi5pZH1gKTtcbiAgICAgICAgYnRuLkFkZENsYXNzKCdxdWlja19hY3Rpb25fYnRuJyk7XG4gICAgICAgIGJ0bi5zdHlsZS53aWR0aCA9ICcxMTBweCc7XG4gICAgICAgIGJ0bi5zdHlsZS5oZWlnaHQgPSAnNjBweCc7XG4gICAgICAgIGJ0bi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgICAgIC8vIOWIm+W7uuS4gOS4quWNleeLrOeahCBMYWJlbCDmmL7npLrmiYDmnInlhoXlrrlcbiAgICAgICAgY29uc3QgY29udGVudExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBidG4sIGAke2FjdGlvbi5pZH1fY29udGVudGApO1xuICAgICAgICBjb250ZW50TGFiZWwudGV4dCA9IGFjdGlvbi5uYW1lO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUuY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5oaXR0ZXN0ID0gZmFsc2U7IC8vIOmHjeimge+8muS4jeaLpuaIqueCueWHu1xuICAgICAgICAvLyDnu5Hlrprngrnlh7vkuovku7ZcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29uYWN0aXZhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAkLk1zZyhgW1BsYXlpbmdIVURdIOKcheKcheKchSBDTElDS0VEOiAke2FjdGlvbi5uYW1lfWApO1xuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiAgICAgICAgICAgIC8vIOeJueauiuWkhOeQhu+8mumAieWFs+aMiemSriAtIOmAmui/h+S6i+S7tuinpuWPke+8iOS4jeWQjFVJ57uE5Lu25pyJ54us56uL55qESlPkuIrkuIvmlofvvIzml6Dms5XlhbHkuqtnbG9iYWxUaGlz77yJXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmlkID09PSAnc3RhZ2Vfc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0gT3BlbmluZyBTdGFnZVNlbGVjdCB2aWEgZXZlbnQuLi4nKTtcbiAgICAgICAgICAgICAgICAvLyDlj5HpgIHkuovku7bliLDmnI3liqHnq6/vvIzmnI3liqHnq6/kvJrlub/mkq3nu5nmiYDmnInlrqLmiLfnq69cbiAgICAgICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcignb3Blbl9sZXZlbF9zZWxlY3Rpb24nLCB7fSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g54m55q6K5aSE55CG77ya6IOM5YyF5oyJ6ZKuIC0g5YiH5o2i5pi+56S6L+makOiXj1xuICAgICAgICAgICAgaWYgKGFjdGlvbi5pZCA9PT0gJ2ludmVudG9yeScpIHtcbiAgICAgICAgICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIFRvZ2dsaW5nIGludmVudG9yeS4uLicpO1xuICAgICAgICAgICAgICAgIC8vIOmAmui/h+acjeWKoeerr+i9rOWPkeS6i+S7tu+8iOWDj+mAieWFs+aMiemSruS4gOagt++8iVxuICAgICAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCd0b2dnbGVfaW52ZW50b3J5X3JlcXVlc3QnLCB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllcklkOiBQbGF5ZXJzLkdldExvY2FsUGxheWVyKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDlhbbku5bmjInpkq7pgJrov4fmnI3liqHlmajkuovku7blpITnkIZcbiAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdxdWlja19hY3Rpb24nLCB7XG4gICAgICAgICAgICAgICAgYWN0aW9uOiBhY3Rpb24uaWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8g5re75Yqg6byg5qCH5oKs5YGc5pWI5p6cXG4gICAgICAgIGJ0bi5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0g8J+RhiBNb3VzZSBvdmVyOiAke2FjdGlvbi5uYW1lfWApO1xuICAgICAgICB9KTtcbiAgICAgICAgJC5Nc2coYPCfjq4gQ3JlYXRlZCBidXR0b246ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgfSk7XG4gICAgJC5Nc2coYPCfjq4gQm90dG9tIHF1aWNrIGJhciBjcmVhdGVkIHdpdGggJHtxdWlja0FjdGlvbnMubGVuZ3RofSBidXR0b25zYCk7XG59XG4vLyDmt7vliqDmiJjmlpforrDlvZVcbmZ1bmN0aW9uIGFkZEJhdHRsZUxvZyhtZXNzYWdlLCB0eXBlID0gJ2luZm8nKSB7XG4gICAgY29uc3QgbG9nQ29udGFpbmVyID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0xvZ0NvbnRhaW5lcicpO1xuICAgIGlmICghbG9nQ29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgbG9nRW50cnkgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxvZ0NvbnRhaW5lciwgYExvZ0VudHJ5XyR7RGF0ZS5ub3coKX1gKTtcbiAgICBsb2dFbnRyeS50ZXh0ID0gbWVzc2FnZTtcbiAgICBsb2dFbnRyeS5zdHlsZS5mb250U2l6ZSA9ICcxMXB4JztcbiAgICBsb2dFbnRyeS5zdHlsZS5jb2xvciA9IHR5cGUgPT09ICdraWxsJyA/IFBMQVlJTkdfSFVEX1RIRU1FLnN1Y2Nlc3MgOlxuICAgICAgICB0eXBlID09PSAnZGVhdGgnID8gUExBWUlOR19IVURfVEhFTUUuZGFuZ2VyIDpcbiAgICAgICAgICAgIFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgbG9nRW50cnkuc3R5bGUubWFyZ2luQm90dG9tID0gJzJweCc7XG4gICAgLy8g6ZmQ5Yi25pel5b+X5pWw6YePXG4gICAgY29uc3QgY2hpbGRyZW4gPSBsb2dDb250YWluZXIuQ2hpbGRyZW4oKTtcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMTApIHtcbiAgICAgICAgY2hpbGRyZW5bMF0uRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxufVxuLy8g8J+UkSDmm7TmlrDnvoHnu4pVSeaYvuekulxuZnVuY3Rpb24gdXBkYXRlU3luZXJneVVJKHN5bmVyZ2llc0RhdGEpIHtcbiAgICAkLk1zZyhgW1BsYXlpbmdIVURdIPCflIQgVXBkYXRpbmcgc3luZXJneSBVSSB3aXRoICR7c3luZXJnaWVzRGF0YS5sZW5ndGh9IHN5bmVyZ2llc2ApO1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSDimqDvuI8gUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDpgY3ljobmiYDmnInnvoHnu4rmlbDmja7lubbmm7TmlrBVSVxuICAgIGZvciAoY29uc3Qgc3luZXJneURhdGEgb2Ygc3luZXJnaWVzRGF0YSkge1xuICAgICAgICAkLk1zZyhgW1BsYXlpbmdIVURdIPCfk4ogVXBkYXRpbmcgJHtzeW5lcmd5RGF0YS5uYW1lfTogY291bnQ9JHtzeW5lcmd5RGF0YS5jdXJyZW50Q291bnR9LCBhY3RpdmUgdGllcnM9JHtzeW5lcmd5RGF0YS5hY3RpdmVUaWVycy5qb2luKCcsJyl9YCk7XG4gICAgICAgIC8vIOafpeaJvuWvueW6lOeahOe+gee7iumdouadv1xuICAgICAgICBjb25zdCBzeW5lcmd5SXRlbSA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFN5bmVyZ3lfJHtzeW5lcmd5RGF0YS5pZH1gKTtcbiAgICAgICAgaWYgKCFzeW5lcmd5SXRlbSkge1xuICAgICAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDimqDvuI8gU3luZXJneSBpdGVtIG5vdCBmb3VuZDogJHtzeW5lcmd5RGF0YS5pZH1gKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIOabtOaWsOe+gee7iuiuoeaVsOaYvuekulxuICAgICAgICBjb25zdCBjb3VudExhYmVsID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgU3luZXJneUNvdW50XyR7c3luZXJneURhdGEuaWR9YCk7XG4gICAgICAgIGlmIChjb3VudExhYmVsKSB7XG4gICAgICAgICAgICAvLyDmib7liLDlr7nlupTmqKHmnb/mlbDmja7kuK3nmoTmnIDlpKfpmLbmoq9cbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlU3luZXJneSA9IFRFTVBMQVRFX1NZTkVSR0lFUy5maW5kKHMgPT4gcy5pZCA9PT0gc3luZXJneURhdGEuaWQpO1xuICAgICAgICAgICAgaWYgKHRlbXBsYXRlU3luZXJneSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heENvdW50ID0gTWF0aC5tYXgoLi4udGVtcGxhdGVTeW5lcmd5LnRpZXJzLm1hcCh0ID0+IHQuY291bnQpKTtcbiAgICAgICAgICAgICAgICBjb3VudExhYmVsLnRleHQgPSBgJHtzeW5lcmd5RGF0YS5jdXJyZW50Q291bnR9LyR7bWF4Q291bnR9YDtcbiAgICAgICAgICAgICAgICAvLyDmoLnmja7mmK/lkKbmv4DmtLvmm7TmlrDpopzoibJcbiAgICAgICAgICAgICAgICBjb25zdCBoYXNBY3RpdmVFZmZlY3QgPSBzeW5lcmd5RGF0YS5hY3RpdmVUaWVycy5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgIGNvdW50TGFiZWwuc3R5bGUuY29sb3IgPSBoYXNBY3RpdmVFZmZlY3QgPyAnI2ZmYzU3YScgOiAnIzk0YTNiOCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8g5pu05paw5ZCN56ew6aKc6ImyXG4gICAgICAgIGNvbnN0IG5hbWVMYWJlbCA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFN5bmVyZ3lOYW1lXyR7c3luZXJneURhdGEuaWR9YCk7XG4gICAgICAgIGlmIChuYW1lTGFiZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhc0FjdGl2ZUVmZmVjdCA9IHN5bmVyZ3lEYXRhLmFjdGl2ZVRpZXJzLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICBuYW1lTGFiZWwuc3R5bGUuY29sb3IgPSBoYXNBY3RpdmVFZmZlY3QgPyAnI2ZmZDcwMCcgOiAnI2ZmZmZmZic7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5pu05paw5ZCE5Liq6Zi25qKv55qE5r+A5rS754q25oCBXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlU3luZXJneSA9IFRFTVBMQVRFX1NZTkVSR0lFUy5maW5kKHMgPT4gcy5pZCA9PT0gc3luZXJneURhdGEuaWQpO1xuICAgICAgICBpZiAodGVtcGxhdGVTeW5lcmd5KSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVN5bmVyZ3kudGllcnMuZm9yRWFjaCgodGllciwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2c7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBzeW5lcmd5RGF0YS5hY3RpdmVUaWVycy5pbmNsdWRlcyhpbmRleCk7XG4gICAgICAgICAgICAgICAgLy8g5pu05paw6Zi25qKv6aG555qE5qC35byPXG4gICAgICAgICAgICAgICAgY29uc3QgdGllckl0ZW0gPSByb290UGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKGBTeW5lcmd5VGllcl8ke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGlmICh0aWVySXRlbSAmJiAoKF9hID0gdGllckl0ZW0uR2V0UGFyZW50KCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCkgPT09IGBTeW5lcmd5VGllcnNfJHtzeW5lcmd5RGF0YS5pZH1gKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGllckl0ZW0uUmVtb3ZlQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWVySXRlbS5BZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWVySXRlbS5SZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWVySXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDmm7TmlrDnirbmgIHlm77moIdcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNJY29uID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgVGllclN0YXR1c18ke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXNJY29uICYmICgoX2MgPSAoX2IgPSBzdGF0dXNJY29uLkdldFBhcmVudCgpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuR2V0UGFyZW50KCkpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5pZCkgPT09IGBTeW5lcmd5VGllcnNfJHtzeW5lcmd5RGF0YS5pZH1gKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb24udGV4dCA9IGlzQWN0aXZlID8gJ+KckycgOiAn4peLJztcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbi5zdHlsZS5jb2xvciA9IGlzQWN0aXZlID8gJyNmZmQ3MDAnIDogJyM2NDc0OGInO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDmm7TmlrDpnIDmsYLmlbDph4/popzoibJcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1aXJlbWVudCA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoYFRpZXJSZXF1aXJlbWVudF8ke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlbWVudCAmJiAoKF9lID0gKF9kID0gcmVxdWlyZW1lbnQuR2V0UGFyZW50KCkpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5HZXRQYXJlbnQoKSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmlkKSA9PT0gYFN5bmVyZ3lUaWVyc18ke3N5bmVyZ3lEYXRhLmlkfWApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZW1lbnQuc3R5bGUuY29sb3IgPSBpc0FjdGl2ZSA/ICcjZmZkNzAwJyA6ICcjOTRhM2I4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8g5pu05paw5pWI5p6c5o+P6L+w6aKc6ImyXG4gICAgICAgICAgICAgICAgY29uc3QgZWZmZWN0ID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZShgVGllckVmZmVjdF8ke2luZGV4fWApO1xuICAgICAgICAgICAgICAgIGlmIChlZmZlY3QgJiYgKChfZyA9IChfZiA9IGVmZmVjdC5HZXRQYXJlbnQoKSkgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLkdldFBhcmVudCgpKSA9PT0gbnVsbCB8fCBfZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2cuaWQpID09PSBgU3luZXJneVRpZXJzXyR7c3luZXJneURhdGEuaWR9YCkge1xuICAgICAgICAgICAgICAgICAgICBlZmZlY3Quc3R5bGUuY29sb3IgPSBpc0FjdGl2ZSA/ICcjZmZmZmZmJyA6ICcjOTRhM2I4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyDmm7TmlrDmlbTkuKrnvoHnu4rpobnnmoTmoLflvI9cbiAgICAgICAgY29uc3QgaGFzQWN0aXZlRWZmZWN0ID0gc3luZXJneURhdGEuYWN0aXZlVGllcnMubGVuZ3RoID4gMDtcbiAgICAgICAgY29uc3QgYWxsRWZmZWN0c0FjdGl2ZSA9IHRlbXBsYXRlU3luZXJneSAmJiBzeW5lcmd5RGF0YS5hY3RpdmVUaWVycy5sZW5ndGggPT09IHRlbXBsYXRlU3luZXJneS50aWVycy5sZW5ndGg7XG4gICAgICAgIHN5bmVyZ3lJdGVtLlJlbW92ZUNsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICBzeW5lcmd5SXRlbS5SZW1vdmVDbGFzcygncGFydGlhbCcpO1xuICAgICAgICBzeW5lcmd5SXRlbS5SZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGlmIChhbGxFZmZlY3RzQWN0aXZlKSB7XG4gICAgICAgICAgICBzeW5lcmd5SXRlbS5BZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICBzeW5lcmd5SXRlbS5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJnYmEoMjU1LCAyMTUsIDAsIDAuOCknO1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm94U2hhZG93ID0gJzAgMCAxNXB4IHJnYmEoMjU1LCAyMTUsIDAsIDAuNCknO1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUub3BhY2l0eSA9ICcxLjAnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc0FjdGl2ZUVmZmVjdCkge1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ3BhcnRpYWwnKTtcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmdiYSg1OSwgMTMwLCAyNDYsIDAuOCknO1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm94U2hhZG93ID0gJzAgMCAxMHB4IHJnYmEoNTksIDEzMCwgMjQ2LCAwLjMpJztcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLm9wYWNpdHkgPSAnMS4wJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN5bmVyZ3lJdGVtLkFkZENsYXNzKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDEwMCwgMTE2LCAxMzksIDAuNSknO1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm94U2hhZG93ID0gJ25vbmUnO1xuICAgICAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgICAgICB9XG4gICAgfVxuICAgICQuTXNnKCdbUGxheWluZ0hVRF0g4pyFIFN5bmVyZ3kgVUkgdXBkYXRlZCcpO1xufVxuLy8g55uR5ZCs5ri45oiP5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgncGxheWVyX3N0YXRzX3VwZGF0ZScsIChkYXRhKSA9PiB7XG4gICAgLy8g5pu05paw57uf6K6h5pWw5o2uXG4gICAgaWYgKGRhdGEuZ29sZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGdvbGRWYWx1ZSA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdHb2xkVmFsdWUnKTtcbiAgICAgICAgaWYgKGdvbGRWYWx1ZSlcbiAgICAgICAgICAgIGdvbGRWYWx1ZS50ZXh0ID0gZGF0YS5nb2xkLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChkYXRhLmtpbGxzICE9PSB1bmRlZmluZWQgfHwgZGF0YS5kZWF0aHMgIT09IHVuZGVmaW5lZCB8fCBkYXRhLmFzc2lzdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBraWxsVmFsdWUgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnS2lsbFZhbHVlJyk7XG4gICAgICAgIGlmIChraWxsVmFsdWUpIHtcbiAgICAgICAgICAgIGtpbGxWYWx1ZS50ZXh0ID0gYCR7ZGF0YS5raWxscyB8fCAwfSAvICR7ZGF0YS5kZWF0aHMgfHwgMH0gLyAke2RhdGEuYXNzaXN0cyB8fCAwfWA7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdoZXJvX3N0YXRzX3VwZGF0ZScsIChkYXRhKSA9PiB7XG4gICAgaWYgKGRhdGEuaGVhbHRoICE9PSB1bmRlZmluZWQgJiYgZGF0YS5tYXhIZWFsdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cGRhdGVIZWFsdGhCYXIoZGF0YS5oZWFsdGgsIGRhdGEubWF4SGVhbHRoKTtcbiAgICB9XG4gICAgaWYgKGRhdGEubWFuYSAhPT0gdW5kZWZpbmVkICYmIGRhdGEubWF4TWFuYSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVwZGF0ZU1hbmFCYXIoZGF0YS5tYW5hLCBkYXRhLm1heE1hbmEpO1xuICAgIH1cbn0pO1xuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2JhdHRsZV9sb2cnLCAoZGF0YSkgPT4ge1xuICAgIGFkZEJhdHRsZUxvZyhkYXRhLm1lc3NhZ2UsIGRhdGEudHlwZSk7XG59KTtcbi8vIPCflJEg55uR5ZCs5oiY5paX57uT5p2f5LqL5Lu277yM56Gu5L+d5Y6f55SfVUnkv53mjIHpmpDol49cbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdiYXR0bGVfZW5kZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdbUGxheWluZ0hVRF0gQmF0dGxlIGVuZGVkIC0gZW5zdXJpbmcgbmF0aXZlIFVJIHN0YXlzIGhpZGRlbicpO1xuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGhpZGVNaW5pbWFwRWxlbWVudHMoKTtcbn0pO1xuLy8g8J+UkSDnm5HlkKzoh6rotbDmo4vpmLbmrrXlj5jljJbkuovku7bvvIznoa7kv53ljp/nlJ9VSeS/neaMgemakOiXj1xuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2F1dG9jaGVzc19waGFzZV9zdGFydGVkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZyhgW1BsYXlpbmdIVURdIFBoYXNlIGNoYW5nZWQgdG8gJHtkYXRhLnBoYXNlfSAtIGVuc3VyaW5nIG5hdGl2ZSBVSSBzdGF5cyBoaWRkZW5gKTtcbiAgICBoaWRlTmF0aXZlVUkoKTtcbiAgICBoaWRlTWluaW1hcEVsZW1lbnRzKCk7XG4gICAgLy8g8J+UkSDlpoLmnpzmmK/miJjmlpfpmLbmrrXvvIzmmL7npLpwbGF5aW5nLWh1ZFxuICAgIGlmIChkYXRhLnBoYXNlID09PSAnYmF0dGxlJykge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIEJhdHRsZSBwaGFzZSBzdGFydGVkIC0gc2hvd2luZyBwbGF5aW5nIEhVRCcpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgY3JlYXRlUGxheWluZ0hVRCgpO1xuICAgICAgICB9XG4gICAgICAgIHNob3dQbGF5aW5nSFVEKHRydWUpO1xuICAgICAgICBoaWRlTmF0aXZlVUkoKTtcbiAgICAgICAgaGlkZU1pbmltYXBFbGVtZW50cygpO1xuICAgIH1cbn0pO1xuLy8g8J+UkSDnm5HlkKzmmL7npLpwbGF5aW5nLWh1ZOS6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3Nob3dfcGxheWluZ19odWQnLCAoKSA9PiB7XG4gICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSBTaG93IHBsYXlpbmcgSFVEIGV2ZW50IHJlY2VpdmVkJyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1BsYXlpbmdIVURDb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgfVxuICAgIHNob3dQbGF5aW5nSFVEKHRydWUpO1xuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGhpZGVNaW5pbWFwRWxlbWVudHMoKTtcbn0pO1xuLy8g8J+UkSDnm5HlkKznvoHnu4rmlbDmja7mm7TmlrDkuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdzeW5lcmd5X2RhdGFfdXBkYXRlJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZyhgW1BsYXlpbmdIVURdIPCfjq8gU3luZXJneSBkYXRhIHVwZGF0ZSByZWNlaXZlZCBmb3IgcGxheWVyICR7ZGF0YS5wbGF5ZXJJZH1gKTtcbiAgICAkLk1zZyhgW1BsYXlpbmdIVURdIFN5bmVyZ2llcyBjb3VudDogJHtkYXRhLnN5bmVyZ2llcy5sZW5ndGh9YCk7XG4gICAgLy8g8J+UkSDljZXmnLrmqKHlvI/vvJrmo4Dmn6XmmK/lkKbkuLrmnKzlnLDnjqnlrrbnmoTmlbDmja5cbiAgICBjb25zdCBsb2NhbFBsYXllcklkID0gUGxheWVycy5HZXRMb2NhbFBsYXllcigpO1xuICAgICQuTXNnKGBbUGxheWluZ0hVRF0gTG9jYWwgcGxheWVyIElEOiAke2xvY2FsUGxheWVySWR9LCBFdmVudCBwbGF5ZXIgSUQ6ICR7ZGF0YS5wbGF5ZXJJZH1gKTtcbiAgICAvLyDljZXmnLrmqKHlvI/kuIvpgJrluLjmmK/njqnlrrYw77yM5L2G5Lmf5pSv5oyB5YW25LuW546p5a62SURcbiAgICBpZiAoZGF0YS5wbGF5ZXJJZCA9PT0gbG9jYWxQbGF5ZXJJZCkge1xuICAgICAgICAkLk1zZyhgW1BsYXlpbmdIVURdIOKchSDmnKzlnLDnjqnlrrbmlbDmja7vvIzmm7TmlrDnvoHnu4pVSWApO1xuICAgICAgICAvLyDmm7TmlrDnvoHnu4pVSVxuICAgICAgICB1cGRhdGVTeW5lcmd5VUkoZGF0YS5zeW5lcmdpZXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDij63vuI8g6Z2e5pys5Zyw546p5a625pWw5o2u77yM6Lez6L+HVUnmm7TmlrBgKTtcbiAgICB9XG59KTtcbi8vIOaYvuekui/pmpDol4/miJjmlpdIVURcbmZ1bmN0aW9uIHNob3dQbGF5aW5nSFVEKHNob3cpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSBzaG93ID8gJ3Zpc2libGUnIDogJ2NvbGxhcHNlJztcbiAgICAgICAgJC5Nc2coYFBsYXlpbmcgSFVEICR7c2hvdyA/ICdzaG93bicgOiAnaGlkZGVuJ31gKTtcbiAgICB9XG59XG4vLyDmo4Dmn6XmuLjmiI/nirbmgIHlubblhrPlrprmmK/lkKbmmL7npLpIVURcbmZ1bmN0aW9uIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpIHtcbiAgICAvLyDmo4Dmn6XmuLjmiI/mqKHlvI/vvIjnlKjkuo7osIPor5XvvIlcbiAgICBsZXQgY3VycmVudE1vZGUgPSAnbm9ybWFsJztcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBnYW1lTW9kZURhdGEgPSBDdXN0b21OZXRUYWJsZXMuR2V0VGFibGVWYWx1ZSgnZ2FtZV9tb2RlJywgJ2N1cnJlbnQnKTtcbiAgICAgICAgaWYgKGdhbWVNb2RlRGF0YSAmJiBnYW1lTW9kZURhdGEubW9kZSkge1xuICAgICAgICAgICAgY3VycmVudE1vZGUgPSBnYW1lTW9kZURhdGEubW9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAkLk1zZygnRXJyb3IgcmVhZGluZyBnYW1lIG1vZGUgZnJvbSBOZXRUYWJsZTonLCBlKTtcbiAgICB9XG4gICAgJC5Nc2coYEN1cnJlbnQgZ2FtZSBtb2RlOiAke2N1cnJlbnRNb2RlfWApO1xuICAgIC8vIOajgOafpeaYr+WQpuWcqOa4uOaIj+i/m+ihjOS4rVxuICAgIGNvbnN0IGdhbWVTdGF0ZSA9IEdhbWUuR2V0U3RhdGUoKTtcbiAgICAkLk1zZyhgQ3VycmVudCBnYW1lIHN0YXRlOiAke2dhbWVTdGF0ZX1gKTtcbiAgICAvLyDmoLnmja7lrp7pmYXnmoTmuLjmiI/nirbmgIHluLjph4/vvJpcbiAgICAvLyBET1RBX0dBTUVSVUxFU19TVEFURV9QUkVfR0FNRSA9IDhcbiAgICAvLyBET1RBX0dBTUVSVUxFU19TVEFURV9HQU1FX0lOX1BST0dSRVNTID0gMTBcbiAgICAvLyDlnKjoh6rotbDmo4vmqKHlvI/kuIvvvIzlj6/og73muLjmiI/nirbmgIHkuI3lkIzvvIzmiYDku6XmlL7lrr3mnaHku7bmiJbnm7TmjqXmmL7npLpcbiAgICBsZXQgc2hvdWxkU2hvdyA9IGdhbWVTdGF0ZSA+PSA4ICYmIGdhbWVTdGF0ZSA8PSAxMDtcbiAgICAvLyDlpoLmnpzmmK/oh6rotbDmo4vmqKHlvI/vvIzljbPkvb/muLjmiI/nirbmgIHkuI3nrKblkIjvvIzkuZ/lsJ3or5XmmL7npLrvvIjlm6DkuLroh6rotbDmo4vlj6/og73mnInkuI3lkIznmoTnirbmgIHlgLzvvIlcbiAgICBpZiAoY3VycmVudE1vZGUgPT09ICdhdXRvY2hlc3MnKSB7XG4gICAgICAgICQuTXNnKCdBdXRvQ2hlc3MgbW9kZSBkZXRlY3RlZCAtIGZvcmNpbmcgSFVEIGRpc3BsYXknKTtcbiAgICAgICAgLy8g5Zyo6Ieq6LWw5qOL5qih5byP5LiL77yM5Y+q6KaB5LiN5piv5Yid5aeL5YyW6Zi25q615bCx5pi+56S6XG4gICAgICAgIHNob3VsZFNob3cgPSBnYW1lU3RhdGUgPj0gMTsgLy8g5pu05a695p2+55qE5p2h5Lu2XG4gICAgfVxuICAgICQuTXNnKGBTaG91bGQgc2hvdyBQbGF5aW5nIEhVRDogJHtzaG91bGRTaG93fSAobW9kZTogJHtjdXJyZW50TW9kZX0sIHN0YXRlOiAke2dhbWVTdGF0ZX0pYCk7XG4gICAgc2hvd1BsYXlpbmdIVUQoc2hvdWxkU2hvdyk7XG59XG4vLyDpmpDol4/ljp/nlJ8gRG90YSAyIFVJIOWFg+e0oFxuZnVuY3Rpb24gaGlkZU5hdGl2ZVVJKCkge1xuICAgICQuTXNnKCfwn46uIEhpZGluZyBuYXRpdmUgRG90YSAyIFVJIGVsZW1lbnRzLi4uJyk7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8g6ZqQ6JeP5Y6f55SfIEhVRCDlhYPntKBcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfVE9QX1RJTUVPRkRBWSwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9UT1BfSEVST0VTLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0ZMWU9VVF9TQ09SRUJPQVJELCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0FDVElPTl9QQU5FTCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9BQ1RJT05fTUlOSU1BUCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUEFORUwsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1NIT1AsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX0lURU1TLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9RVUlDS0JVWSwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfQ09VUklFUiwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUFJPVEVDVCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfR09MRCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9TSE9QX1NVR0dFU1RFRElURU1TLCBmYWxzZSk7XG4gICAgICAgIC8vIPCflJEg5ZCM5pe26ZqQ6JeP5bCP5Zyw5Zu+5YWD57SgXG4gICAgICAgIGhpZGVNaW5pbWFwRWxlbWVudHMoKTtcbiAgICAgICAgJC5Nc2coJ+KchSBOYXRpdmUgVUkgZWxlbWVudHMgaGlkZGVuIHN1Y2Nlc3NmdWxseScpO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAkLk1zZygn4p2MIEVycm9yIGhpZGluZyBuYXRpdmUgVUk6JywgZSk7XG4gICAgfVxufVxuLy8g8J+UkSDpmpDol4/lsI/lnLDlm77lhYPntKBcbmZ1bmN0aW9uIGhpZGVNaW5pbWFwRWxlbWVudHMoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgcm9vdFBhbmVsID0gJC5HZXRDb250ZXh0UGFuZWwoKTtcbiAgICAgICAgY29uc3QgbWluaW1hcElkcyA9IFsnbWluaW1hcCcsICdNaW5pbWFwQ29udGFpbmVyJywgJ21pbmltYXBfY29udGFpbmVyJywgJ01pbmltYXBCdXR0b24nXTtcbiAgICAgICAgbWluaW1hcElkcy5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhbmVsID0gcm9vdFBhbmVsLkZpbmRDaGlsZFRyYXZlcnNlKGlkKTtcbiAgICAgICAgICAgIGlmIChwYW5lbCkge1xuICAgICAgICAgICAgICAgIHBhbmVsLnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgICAgICAgICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0gSGlkZGVuIG1pbmltYXAgZWxlbWVudDogJHtpZH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKCfinYwgRXJyb3IgaGlkaW5nIG1pbmltYXAgZWxlbWVudHM6JywgZSk7XG4gICAgfVxufVxuLy8g8J+UkSDlt7LliKDpmaRzaG93TmF0aXZlVUnlh73mlbAgLSDkuI3lho3pnIDopoHmgaLlpI3ljp/nlJ9VSVxuLy8g5Yid5aeL5YyWXG5mdW5jdGlvbiBpbml0aWFsaXplUGxheWluZ0hVRCgpIHtcbiAgICAkLk1zZygn8J+OriBQbGF5aW5nIEhVRCBpbml0aWFsaXppbmcuLi4nKTtcbiAgICAvLyDwn5SRIOeri+WNs+WIm+W7ukhVROW5tumakOiXj+WOn+eUn1VJXG4gICAgY3JlYXRlUGxheWluZ0hVRCgpO1xuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGhpZGVNaW5pbWFwRWxlbWVudHMoKTtcbiAgICAvLyDwn5SRIOWIneWni+eKtuaAgemakOiXj++8jOetieW+heaImOaWl+mYtuauteaYvuekulxuICAgIHNob3dQbGF5aW5nSFVEKHRydWUpO1xuICAgICQuTXNnKCfwn46uIFBsYXlpbmcgSFVEIGluaXRpYWxpemVkJyk7XG59XG4vLyDwn5SRIOaaguaXtuemgeeUqOaJgOacieiHquWKqOaYvuekukhVROeahOS6i+S7tuebkeWQrOWZqFxuLy8g55uR5ZCs5ri45oiP54q25oCB5Y+Y5YyW5LqL5Lu2XG4vLyBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9zdGF0ZV9jaGFuZ2VkJywgKGRhdGE6IGFueSkgPT4ge1xuLy8gICAgICQuTXNnKCdHYW1lIHN0YXRlIGNoYW5nZWQ6JywgZGF0YSk7XG4vLyAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4vLyB9KTtcbi8vIOebkeWQrOa4uOaIj+aooeW8j+WPmOWMluS6i+S7tlxuLy8gR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfbW9kZV9jaGFuZ2VkJywgKGRhdGE6IGFueSkgPT4ge1xuLy8gICAgICQuTXNnKCdHYW1lIG1vZGUgY2hhbmdlZDonLCBkYXRhKTtcbi8vICAgICBpZiAoZGF0YSAmJiBkYXRhLm5ld01vZGUpIHtcbi8vICAgICAgICAgJC5Nc2coYE5ldyBnYW1lIG1vZGU6ICR7ZGF0YS5uZXdNb2RlfWApO1xuLy8gICAgICAgICBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKTtcbi8vICAgICB9XG4vLyB9KTtcbi8vIOebkeWQrOe9kee7nOihqOS4reeahOa4uOaIj+aooeW8j+WPmOWMllxuLy8gQ3VzdG9tTmV0VGFibGVzLlN1YnNjcmliZU5ldFRhYmxlTGlzdGVuZXIoJ2dhbWVfbW9kZScsICh0YWJsZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIGRhdGE6IGFueSkgPT4ge1xuLy8gICAgIGlmIChrZXkgPT09ICdjdXJyZW50Jykge1xuLy8gICAgICAgICAkLk1zZygnR2FtZSBtb2RlIHVwZGF0ZWQgaW4gTmV0VGFibGU6JywgZGF0YSk7XG4vLyAgICAgICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuLy8gICAgIH1cbi8vIH0pO1xuLy8g55uR5ZCs5ri45oiP5byA5aeL5LqL5Lu2XG4vLyBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9zdGFydCcsICgpID0+IHtcbi8vICAgICAkLk1zZygnR2FtZSBzdGFydGVkIC0gc2hvd2luZyBwbGF5aW5nIEhVRCcpO1xuLy8gICAgIHNob3dQbGF5aW5nSFVEKHRydWUpO1xuLy8gfSk7XG4vLyDnm5HlkKzmuLjmiI/nu5PmnZ/kuovku7Zcbi8vIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX2VuZCcsICgpID0+IHtcbi8vICAgICAkLk1zZygnR2FtZSBlbmRlZCAtIGhpZGluZyBwbGF5aW5nIEhVRCcpO1xuLy8gICAgIHNob3dQbGF5aW5nSFVEKGZhbHNlKTtcbi8vIH0pO1xuLy8g5a6a5pyf5qOA5p+l5ri45oiP54q25oCB77yI5aSH55So5pa55qGI77yJXG5mdW5jdGlvbiBzdGFydEdhbWVTdGF0ZU1vbml0b3IoKSB7XG4gICAgLy8g8J+UkSDmmoLml7bnpoHnlKjoh6rliqjnm5HmjqdcbiAgICAvLyBjb25zdCBjaGVja0ludGVydmFsID0gKCkgPT4ge1xuICAgIC8vICAgICBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKTtcbiAgICAvLyAgICAgJC5TY2hlZHVsZSgyLjAsIGNoZWNrSW50ZXJ2YWwpOyAvLyDmr48y56eS5qOA5p+l5LiA5qyhXG4gICAgLy8gfTtcbiAgICAvLyAkLlNjaGVkdWxlKDUuMCwgY2hlY2tJbnRlcnZhbCk7IC8vIDXnp5LlkI7lvIDlp4vnm5HmjqdcbiAgICAkLk1zZygn8J+OriBHYW1lIHN0YXRlIG1vbml0b3IgZGlzYWJsZWQnKTtcbn1cbi8vIOWvvOWHuuWFqOWxgOWHveaVsFxuZ2xvYmFsVGhpcy5QbGF5aW5nSFVEID0ge1xuICAgIGNyZWF0ZTogY3JlYXRlUGxheWluZ0hVRCxcbiAgICBzaG93OiBzaG93UGxheWluZ0hVRCxcbiAgICBjaGVja1N0YXRlOiBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQsXG4gICAgYWRkTG9nOiBhZGRCYXR0bGVMb2csXG4gICAgaGlkZU5hdGl2ZVVJOiBoaWRlTmF0aXZlVUksXG4gICAgLy8g8J+UkSDlt7LliKDpmaRzaG93TmF0aXZlVUkgLSDkuI3lho3pnIDopoHmgaLlpI3ljp/nlJ9VSVxuICAgIC8vIOmihOeVmee+gee7iuabtOaWsOaOpeWPo1xuICAgIHVwZGF0ZVN5bmVyZ3k6IChzeW5lcmd5RGF0YSkgPT4ge1xuICAgICAgICAkLk1zZygnU3luZXJneSB1cGRhdGUgcmVjZWl2ZWQ6Jywgc3luZXJneURhdGEpO1xuICAgICAgICAvLyBUT0RPOiDlrp7njrDnvoHnu4rmlbDmja7mm7TmlrDpgLvovpFcbiAgICB9XG59O1xuLy8g8J+UkSDnq4vljbPliJ3lp4vljJZcbmluaXRpYWxpemVQbGF5aW5nSFVEKCk7XG4vLyDwn5SRIOaaguaXtuemgeeUqOiHquWKqOebkeaOp1xuLy8gc3RhcnRHYW1lU3RhdGVNb25pdG9yKCk7XG4kLk1zZygn8J+OriBQbGF5aW5nIEhVRCBzY3JpcHQgbG9hZGVkJyk7XG4vLyDmt7vliqDlhajlsYDmtYvor5Xlh73mlbAgICAgXG5nbG9iYWxUaGlzLlRlc3RQbGF5aW5nSFVEID0ge1xuICAgIHNob3c6ICgpID0+IHNob3dQbGF5aW5nSFVEKHRydWUpLFxuICAgIGhpZGU6ICgpID0+IHNob3dQbGF5aW5nSFVEKGZhbHNlKSxcbiAgICBjaGVja1N0YXRlOiBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQsXG4gICAgaGlkZU5hdGl2ZTogaGlkZU5hdGl2ZVVJLFxuICAgIC8vIPCflJEg5bey5Yig6Zmkc2hvd05hdGl2ZSAtIOS4jeWGjemcgOimgeaBouWkjeWOn+eUn1VJXG4gICAgZm9yY2VTaG93OiAoKSA9PiB7XG4gICAgICAgICQuTXNnKCdGb3JjZSBzaG93aW5nIFBsYXlpbmcgSFVEIGZvciB0ZXN0aW5nLi4uJyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgfSxcbiAgICB0ZXN0QmF0dGxlRW5kVmljdG9yeTogKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIFRlc3RpbmcgYmF0dGxlIGVuZCB2aWV3IC0gVmljdG9yeSAoZGlyZWN0IGNhbGwpJyk7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkJhdHRsZUVuZFZpZXcpIHtcbiAgICAgICAgICAgIGdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldy5zaG93VmljdG9yeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSDinYwgQmF0dGxlRW5kVmlldyBub3QgbG9hZGVkIHlldCEnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdGVzdEJhdHRsZUVuZERlZmVhdDogKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIFRlc3RpbmcgYmF0dGxlIGVuZCB2aWV3IC0gRGVmZWF0IChkaXJlY3QgY2FsbCknKTtcbiAgICAgICAgaWYgKGdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldykge1xuICAgICAgICAgICAgZ2xvYmFsVGhpcy5CYXR0bGVFbmRWaWV3LnNob3dEZWZlYXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0g4p2MIEJhdHRsZUVuZFZpZXcgbm90IGxvYWRlZCB5ZXQhJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9