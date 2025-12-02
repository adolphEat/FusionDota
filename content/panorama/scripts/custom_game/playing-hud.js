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
const SYNERGY_ICON_MAP = {
    warrior: 'hazard_armor_png.png', // 战士 - 护甲图标
    mage: 'hazard_magicresist_png.png', // 法师 - 魔抗图标
    assassin: 'hazard_attack_png.png', // 刺客 - 攻击图标
    hunter: 'hazard_speed_png.png', // 猎人 - 速度图标
    orc: 'hazard_enrage_2_png.png', // 兽人 - 狂暴图标
    undead: 'hazard_vampiric_png.png', // 不死 - 吸血图标
    human: 'hazard_glimmer_png.png', // 人类 - 闪光图标
    goblin: 'hazard_embiggen_png.png', // 地精 - 变大图标
};
// 模板羁绊数据（用于UI展示）
const TEMPLATE_SYNERGIES = [
    {
        id: 'warrior',
        name: '战士',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_armor_png.png',
        currentCount: 2,
        tiers: [
            { count: 2, effect: '所有友军+200生命值', active: true },
            { count: 4, effect: '所有友军+400生命值', active: false },
            { count: 6, effect: '所有友军+800生命值', active: false }
        ]
    },
    {
        id: 'mage',
        name: '法师',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_magicresist_png.png',
        currentCount: 1,
        tiers: [
            { count: 3, effect: '所有友军魔抗-30%', active: false },
            { count: 6, effect: '所有友军魔抗-60%', active: false }
        ]
    },
    {
        id: 'assassin',
        name: '刺客',
        type: 'class',
        icon: 'file://{images}/custom_game/icon/hazard_attack_png.png',
        currentCount: 3,
        tiers: [
            { count: 3, effect: '刺客有10%几率造成3倍伤害', active: true },
            { count: 6, effect: '刺客有20%几率造成4倍伤害', active: false }
        ]
    },
    {
        id: 'orc',
        name: '兽人',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_enrage_2_png.png',
        currentCount: 2,
        tiers: [
            { count: 2, effect: '所有兽人+250生命值', active: true },
            { count: 4, effect: '所有兽人+400生命值，+15护甲', active: false }
        ]
    },
    {
        id: 'undead',
        name: '不死',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_vampiric_png.png',
        currentCount: 0,
        tiers: [
            { count: 2, effect: '所有友军护甲-5', active: false },
            { count: 4, effect: '所有友军护甲-7', active: false }
        ]
    },
    {
        id: 'human',
        name: '人类',
        type: 'race',
        icon: 'file://{images}/custom_game/icon/hazard_glimmer_png.png',
        currentCount: 1,
        tiers: [
            { count: 2, effect: '所有人类+20%攻击速度', active: false },
            { count: 4, effect: '所有人类+35%攻击速度', active: false },
            { count: 6, effect: '所有人类+50%攻击速度', active: false }
        ]
    }
];
// 创建战斗HUD
function createPlayingHUD() {
    $.Msg('🎮 CREATING PLAYING HUD - NEW VERSION 22:50 🎮');
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
    // 创建中央提示信息 - 已禁用，不需要显示
    // createCenterAlert(container);
    $.Msg('Playing HUD created successfully!');
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
    // 调试日志：输出图标路径
    $.Msg(`🖼️ Loading synergy icon: ${synergy.name} - ${synergy.icon}`);
    // 使用SetImage方法加载图片（需要XML预加载才能自动编译PNG）
    // 路径格式：file://{images}/... 会被自动转换为编译后的vtex_c
    icon.SetImage(synergy.icon);
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
    $.Msg('🎮 Creating bottom quick bar...');
    const bottomBar = $.CreatePanel('Panel', parent, 'BottomQuickBar');
    const quickActions = [
        { id: 'inventory', name: '背包', icon: '🎒' },
        { id: 'skills', name: '技能', icon: '✨' },
        { id: 'stats', name: '统计', icon: '📊' },
        { id: 'test_kill', name: '测试结算', icon: '💀' },
    ];
    quickActions.forEach((action, index) => {
        const btn = $.CreatePanel('Button', bottomBar, `QuickAction_${action.id}`);
        btn.AddClass('quick_action_btn');
        btn.style.width = '110px';
        btn.style.height = '60px';
        btn.style.flowChildren = 'down';
        // 创建一个单独的 Label 显示所有内容
        const contentLabel = $.CreatePanel('Label', btn, `${action.id}_content`);
        contentLabel.text = `${action.icon}\n${action.name}`;
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
            // 统一通过服务器事件处理，不直接调用 BattleEndView
            // 服务器会发送 autochess_wave_settlement 事件，由 battleEndView 监听并显示
            GameEvents.SendCustomGameEventToServer('quick_action', {
                action: action.id
            });
        });
        // 添加鼠标悬停效果
        btn.SetPanelEvent('onmouseover', () => {
            $.Msg(`[PlayingHUD] 👆 Mouse over: ${action.name}`);
        });
        $.Msg(`🎮 Created button: ${action.name} (${action.icon})`);
    });
    $.Msg(`🎮 Bottom quick bar created with ${quickActions.length} buttons`);
}
// 创建中央提示信息 - 已禁用
/*
function createCenterAlert(parent: Panel): void {
    const alertPanel = $.CreatePanel('Panel', parent, 'CenterAlertPanel');
    alertPanel.style.width = '400px';
    alertPanel.style.height = '100px';
    alertPanel.style.horizontalAlign = 'center';
    alertPanel.style.verticalAlign = 'center';
    alertPanel.style.backgroundColor = PLAYING_HUD_THEME.panelBg;
    alertPanel.style.border = `2px solid ${PLAYING_HUD_THEME.borderColor}`;
    alertPanel.style.borderRadius = '15px';
    alertPanel.style.padding = '20px';
    alertPanel.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.5)';
    alertPanel.style.visibility = 'collapse';
    alertPanel.style.zIndex = '5000';
    alertPanel.hittest = false; // 不拦截点击事件
    
    const alertLabel = $.CreatePanel('Label', alertPanel, 'AlertLabel');
    alertLabel.text = '';
    alertLabel.style.fontSize = '18px';
    alertLabel.style.fontWeight = 'bold';
    alertLabel.style.color = PLAYING_HUD_THEME.textAccent;
    alertLabel.style.textAlign = 'center';
    alertLabel.style.horizontalAlign = 'center';
}

// 显示中央提示
function showCenterAlert(message: string, duration: number = 3.0): void {
    const alertPanel = $.GetContextPanel().FindChildInLayoutFile('CenterAlertPanel');
    if (alertPanel) {
        const alertLabel = alertPanel.FindChildInLayoutFile('AlertLabel');
        if (alertLabel) {
            alertLabel.text = message;
            alertPanel.style.visibility = 'visible';
            
            $.Schedule(duration, () => {
                alertPanel.style.visibility = 'collapse';
            });
        }
    }
}
*/
// 旧的生命值和魔法值更新函数已删除
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
// 中央提示已禁用
/*
GameEvents.Subscribe('center_alert', (data: any) => {
    showCenterAlert(data.message, data.duration || 3.0);
});
*/
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
        $.Msg('✅ Native UI elements hidden successfully');
    }
    catch (e) {
        $.Msg('❌ Error hiding native UI:', e);
    }
}
// 恢复原生 Dota 2 UI 元素
function showNativeUI() {
    $.Msg('🎮 Restoring native Dota 2 UI elements...');
    try {
        // 恢复原生 HUD 元素
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, true);
        GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, true);
        $.Msg('✅ Native UI elements restored successfully');
    }
    catch (e) {
        $.Msg('❌ Error restoring native UI:', e);
    }
}
// 初始化
function initializePlayingHUD() {
    // 隐藏原生 UI
    hideNativeUI();
    // 立即创建HUD，不等待
    createPlayingHUD();
    // 先强制显示，用于测试
    $.Msg('🎮 Force showing HUD for testing...');
    showPlayingHUD(true);
    // 延迟检查游戏状态和模式（等待网络表数据同步）
    $.Schedule(1.0, () => {
        $.Msg('🎮 Checking game state and mode after 1 second...');
        checkGameStateAndShowHUD();
    });
    // 再次延迟检查，确保网络表数据已同步
    $.Schedule(3.0, () => {
        $.Msg('🎮 Re-checking game state and mode after 3 seconds...');
        checkGameStateAndShowHUD();
    });
}
// 监听游戏状态变化事件
GameEvents.Subscribe('game_state_changed', (data) => {
    $.Msg('Game state changed:', data);
    checkGameStateAndShowHUD();
});
// 监听游戏模式变化事件
GameEvents.Subscribe('game_mode_changed', (data) => {
    $.Msg('Game mode changed:', data);
    if (data && data.newMode) {
        $.Msg(`New game mode: ${data.newMode}`);
        checkGameStateAndShowHUD();
    }
});
// 监听网络表中的游戏模式变化
CustomNetTables.SubscribeNetTableListener('game_mode', (tableName, key, data) => {
    if (key === 'current') {
        $.Msg('Game mode updated in NetTable:', data);
        checkGameStateAndShowHUD();
    }
});
// 监听游戏开始事件
GameEvents.Subscribe('game_start', () => {
    $.Msg('Game started - showing playing HUD');
    showPlayingHUD(true);
});
// 监听游戏结束事件
GameEvents.Subscribe('game_end', () => {
    $.Msg('Game ended - hiding playing HUD');
    showPlayingHUD(false);
});
// 定期检查游戏状态（备用方案）
function startGameStateMonitor() {
    const checkInterval = () => {
        checkGameStateAndShowHUD();
        $.Schedule(2.0, checkInterval); // 每2秒检查一次
    };
    $.Schedule(5.0, checkInterval); // 5秒后开始监控
}
// 导出全局函数
globalThis.PlayingHUD = {
    create: createPlayingHUD,
    show: showPlayingHUD,
    checkState: checkGameStateAndShowHUD,
    addLog: addBattleLog,
    hideNativeUI: hideNativeUI,
    showNativeUI: showNativeUI,
    // 预留羁绊更新接口
    updateSynergy: (synergyData) => {
        $.Msg('Synergy update received:', synergyData);
        // TODO: 实现羁绊数据更新逻辑
    }
};
// 立即执行初始化
initializePlayingHUD();
// 启动游戏状态监控
startGameStateMonitor();
// 添加全局测试函数
globalThis.TestPlayingHUD = {
    show: () => showPlayingHUD(true),
    hide: () => showPlayingHUD(false),
    checkState: checkGameStateAndShowHUD,
    hideNative: hideNativeUI,
    showNative: showNativeUI,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0wsUUFBUSxDQUFDO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLENBQUM7QUFDTCxRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQSxRQUFRLENBQUMsdUJBQXVCLGFBQWE7QUFDN0M7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUMsK0JBQStCO0FBQ3hDO0FBQ0EsSUFBSSxDQUFDLCtCQUErQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1QsMEJBQTBCLENBQUM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksQ0FBQztBQUNiO0FBQ0EsS0FBSztBQUNMO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLENBQUM7QUFDYjtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgdmFyIFwiJFwiIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vRDpcXFN0ZWFtQXBwXFxzdGVhbWFwcHNcXGNvbW1vblxcZG90YSAyIGJldGFcXGNvbnRlbnRcXGRvdGFfYWRkb25zXFxmdXNpb25cXHBhbm9yYW1hXFxzcmNcXHBsYXlpbmctaHVkXFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBAdHMtbm9jaGVja1xuLy8g5oiY5paX5Lit55qESFVE55WM6Z2iIC0g5Y+C6ICDIERvdGEyQ3VzdG9tR2FtZSDorr7orqHpo47moLxcbi8vIOeri+WNs+aYvuekuuS4gOS4qua1i+ivlea2iOaBr1xuR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiQuTXNnKCfwn46uIFBsYXlpbmcgSFVEIHNjcmlwdCBpcyBleGVjdXRpbmchJyk7XG4vLyDkuLvpopjphY3nva7vvIjlj4LogIMgRG90YTJDdXN0b21HYW1lIOmjjuagvO+8iVxuY29uc3QgUExBWUlOR19IVURfVEhFTUUgPSB7XG4gICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsIDIzLCA0MiwgMC44NSknLFxuICAgIHBhbmVsQmc6ICdyZ2JhKDMzLCAzNCwgMzEsIDAuOTUpJyxcbiAgICBib3JkZXJDb2xvcjogJ3JnYmEoNTksIDEzMCwgMjQ2LCAwLjQpJyxcbiAgICB0ZXh0UHJpbWFyeTogJyMzYjgyZjYnLFxuICAgIHRleHRTZWNvbmRhcnk6ICcjZmZmZmZmJyxcbiAgICB0ZXh0QWNjZW50OiAnI2ZmYzU3YScsXG4gICAgc3VjY2VzczogJyM0Y2FmNTAnLFxuICAgIHdhcm5pbmc6ICcjZmY5ODAwJyxcbiAgICBkYW5nZXI6ICcjZjQ0MzM2JyxcbiAgICBoZWFsdGg6ICcjZjQ0MzM2JyxcbiAgICBtYW5hOiAnIzIxOTZmMycsXG59O1xuLy8g576B57uK5Zu+5qCH5pig5bCEIC0g5L2/55SoIGljb24g5paH5Lu25aS55Lit55qE5Zu+5qCHXG5jb25zdCBTWU5FUkdZX0lDT05fTUFQID0ge1xuICAgIHdhcnJpb3I6ICdoYXphcmRfYXJtb3JfcG5nLnBuZycsIC8vIOaImOWjqyAtIOaKpOeUsuWbvuagh1xuICAgIG1hZ2U6ICdoYXphcmRfbWFnaWNyZXNpc3RfcG5nLnBuZycsIC8vIOazleW4iCAtIOmtlOaKl+Wbvuagh1xuICAgIGFzc2Fzc2luOiAnaGF6YXJkX2F0dGFja19wbmcucG5nJywgLy8g5Yi65a6iIC0g5pS75Ye75Zu+5qCHXG4gICAgaHVudGVyOiAnaGF6YXJkX3NwZWVkX3BuZy5wbmcnLCAvLyDnjI7kurogLSDpgJ/luqblm77moIdcbiAgICBvcmM6ICdoYXphcmRfZW5yYWdlXzJfcG5nLnBuZycsIC8vIOWFveS6uiAtIOeLguaatOWbvuagh1xuICAgIHVuZGVhZDogJ2hhemFyZF92YW1waXJpY19wbmcucG5nJywgLy8g5LiN5q27IC0g5ZC46KGA5Zu+5qCHXG4gICAgaHVtYW46ICdoYXphcmRfZ2xpbW1lcl9wbmcucG5nJywgLy8g5Lq657G7IC0g6Zeq5YWJ5Zu+5qCHXG4gICAgZ29ibGluOiAnaGF6YXJkX2VtYmlnZ2VuX3BuZy5wbmcnLCAvLyDlnLDnsr4gLSDlj5jlpKflm77moIdcbn07XG4vLyDmqKHmnb/nvoHnu4rmlbDmja7vvIjnlKjkuo5VSeWxleekuu+8iVxuY29uc3QgVEVNUExBVEVfU1lORVJHSUVTID0gW1xuICAgIHtcbiAgICAgICAgaWQ6ICd3YXJyaW9yJyxcbiAgICAgICAgbmFtZTogJ+aImOWjqycsXG4gICAgICAgIHR5cGU6ICdjbGFzcycsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfYXJtb3JfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMixcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+aJgOacieWPi+WGmysyMDDnlJ/lkb3lgLwnLCBhY3RpdmU6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDQsIGVmZmVjdDogJ+aJgOacieWPi+WGmys0MDDnlJ/lkb3lgLwnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA2LCBlZmZlY3Q6ICfmiYDmnInlj4vlhpsrODAw55Sf5ZG95YC8JywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdtYWdlJyxcbiAgICAgICAgbmFtZTogJ+azleW4iCcsXG4gICAgICAgIHR5cGU6ICdjbGFzcycsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfbWFnaWNyZXNpc3RfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMSxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDMsIGVmZmVjdDogJ+aJgOacieWPi+WGm+mtlOaKly0zMCUnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA2LCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvprZTmipctNjAlJywgYWN0aXZlOiBmYWxzZSB9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgICAgaWQ6ICdhc3Nhc3NpbicsXG4gICAgICAgIG5hbWU6ICfliLrlrqInLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2F0dGFja19wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAzLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMywgZWZmZWN0OiAn5Yi65a6i5pyJMTAl5Yeg546H6YCg5oiQM+WAjeS8pOWusycsIGFjdGl2ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNiwgZWZmZWN0OiAn5Yi65a6i5pyJMjAl5Yeg546H6YCg5oiQNOWAjeS8pOWusycsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnb3JjJyxcbiAgICAgICAgbmFtZTogJ+WFveS6uicsXG4gICAgICAgIHR5cGU6ICdyYWNlJyxcbiAgICAgICAgaWNvbjogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uL2hhemFyZF9lbnJhZ2VfMl9wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAyLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMiwgZWZmZWN0OiAn5omA5pyJ5YW95Lq6KzI1MOeUn+WRveWAvCcsIGFjdGl2ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5omA5pyJ5YW95Lq6KzQwMOeUn+WRveWAvO+8jCsxNeaKpOeUsicsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAndW5kZWFkJyxcbiAgICAgICAgbmFtZTogJ+S4jeatuycsXG4gICAgICAgIHR5cGU6ICdyYWNlJyxcbiAgICAgICAgaWNvbjogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uL2hhemFyZF92YW1waXJpY19wbmcucG5nJyxcbiAgICAgICAgY3VycmVudENvdW50OiAwLFxuICAgICAgICB0aWVyczogW1xuICAgICAgICAgICAgeyBjb3VudDogMiwgZWZmZWN0OiAn5omA5pyJ5Y+L5Yab5oqk55SyLTUnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA0LCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvmiqTnlLItNycsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnaHVtYW4nLFxuICAgICAgICBuYW1lOiAn5Lq657G7JyxcbiAgICAgICAgdHlwZTogJ3JhY2UnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2dsaW1tZXJfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMSxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+aJgOacieS6uuexuysyMCXmlLvlh7vpgJ/luqYnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA0LCBlZmZlY3Q6ICfmiYDmnInkurrnsbsrMzUl5pS75Ye76YCf5bqmJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNiwgZWZmZWN0OiAn5omA5pyJ5Lq657G7KzUwJeaUu+WHu+mAn+W6picsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfVxuXTtcbi8vIOWIm+W7uuaImOaWl0hVRFxuZnVuY3Rpb24gY3JlYXRlUGxheWluZ0hVRCgpIHtcbiAgICAkLk1zZygn8J+OriBDUkVBVElORyBQTEFZSU5HIEhVRCAtIE5FVyBWRVJTSU9OIDIyOjUwIPCfjq4nKTtcbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdFcnJvcjogUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDliKDpmaTlt7LlrZjlnKjnmoTlrrnlmahcbiAgICBjb25zdCBleGlzdGluZ0NvbnRhaW5lciA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1BsYXlpbmdIVURDb250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIC8vIOWIm+W7uuS4u+WuueWZqFxuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIC8vIOenu+mZpGhpdHRlc3Torr7nva7vvIzpgb/lhY1QYW5vcmFtYSBBUEnpl67pophcbiAgICBjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzEwMDAnO1xuICAgIGNvbnRhaW5lci5BZGRDbGFzcygncGxheWluZ19odWRfcm9vdCcpO1xuICAgIC8vIOWIm+W7uumhtumDqOS/oeaBr+agj1xuICAgIGNyZWF0ZVRvcEluZm9CYXIoY29udGFpbmVyKTtcbiAgICAvLyDliJvlu7rlt6bkvqfnvoHnu4rpnaLmnb9cbiAgICBjcmVhdGVMZWZ0U3luZXJneVBhbmVsKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65Y+z5L6n5oiY5paX5L+h5oGv6Z2i5p2/XG4gICAgY3JlYXRlUmlnaHRCYXR0bGVQYW5lbChjb250YWluZXIpO1xuICAgIC8vIOWIm+W7uuW6lemDqOW/q+aNt+agj1xuICAgIGNyZWF0ZUJvdHRvbVF1aWNrQmFyKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65Lit5aSu5o+Q56S65L+h5oGvIC0g5bey56aB55So77yM5LiN6ZyA6KaB5pi+56S6XG4gICAgLy8gY3JlYXRlQ2VudGVyQWxlcnQoY29udGFpbmVyKTtcbiAgICAkLk1zZygnUGxheWluZyBIVUQgY3JlYXRlZCBzdWNjZXNzZnVsbHkhJyk7XG59XG4vLyDliJvlu7rnvoHnu4rmlYjmnpzmnaHnm65cbmZ1bmN0aW9uIGNyZWF0ZVN5bmVyZ3lUaWVyKHBhcmVudCwgdGllciwgaW5kZXgpIHtcbiAgICBjb25zdCB0aWVySXRlbSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgU3luZXJneVRpZXJfJHtpbmRleH1gKTtcbiAgICB0aWVySXRlbS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aWVySXRlbS5zdHlsZS5oZWlnaHQgPSAnMjJweCc7XG4gICAgdGllckl0ZW0uc3R5bGUubWFyZ2luQm90dG9tID0gJzNweCc7XG4gICAgdGllckl0ZW0uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICB0aWVySXRlbS5zdHlsZS5wYWRkaW5nID0gJzJweCA1cHgnO1xuICAgIC8vIOa3u+WKoOa/gOa0u+eKtuaAgeexu1xuICAgIGlmICh0aWVyLmFjdGl2ZSkge1xuICAgICAgICB0aWVySXRlbS5BZGRDbGFzcygnc3luZXJneV90aWVyJyk7XG4gICAgICAgIHRpZXJJdGVtLkFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRpZXJJdGVtLkFkZENsYXNzKCdzeW5lcmd5X3RpZXInKTtcbiAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgfVxuICAgIC8vIOeKtuaAgeWbvuagh1xuICAgIGNvbnN0IHN0YXR1c0ljb24gPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpZXJJdGVtLCBgVGllclN0YXR1c18ke2luZGV4fWApO1xuICAgIHN0YXR1c0ljb24udGV4dCA9IHRpZXIuYWN0aXZlID8gJ+KckycgOiAn4peLJztcbiAgICBzdGF0dXNJY29uLkFkZENsYXNzKCd0aWVyX2ljb24nKTtcbiAgICBzdGF0dXNJY29uLnN0eWxlLndpZHRoID0gJzIwcHgnO1xuICAgIHN0YXR1c0ljb24uc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgc3RhdHVzSWNvbi5zdHlsZS5jb2xvciA9IHRpZXIuYWN0aXZlID8gJyNmZmQ3MDAnIDogJyM2NDc0OGInO1xuICAgIHN0YXR1c0ljb24uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIC8vIOmcgOaxguaVsOmHj1xuICAgIGNvbnN0IHJlcXVpcmVtZW50ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aWVySXRlbSwgYFRpZXJSZXF1aXJlbWVudF8ke2luZGV4fWApO1xuICAgIHJlcXVpcmVtZW50LnRleHQgPSBgKCR7dGllci5jb3VudH0pYDtcbiAgICByZXF1aXJlbWVudC5BZGRDbGFzcygndGllcl9yZXF1aXJlbWVudCcpO1xuICAgIHJlcXVpcmVtZW50LnN0eWxlLndpZHRoID0gJzM1cHgnO1xuICAgIHJlcXVpcmVtZW50LnN0eWxlLmZvbnRTaXplID0gJzExcHgnO1xuICAgIHJlcXVpcmVtZW50LnN0eWxlLmNvbG9yID0gdGllci5hY3RpdmUgPyAnI2ZmZDcwMCcgOiAnIzk0YTNiOCc7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXF1aXJlbWVudC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g5pWI5p6c5o+P6L+wXG4gICAgY29uc3QgZWZmZWN0ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aWVySXRlbSwgYFRpZXJFZmZlY3RfJHtpbmRleH1gKTtcbiAgICBlZmZlY3QudGV4dCA9IHRpZXIuZWZmZWN0O1xuICAgIGVmZmVjdC5BZGRDbGFzcygndGllcl9lZmZlY3QnKTtcbiAgICBlZmZlY3Quc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgZWZmZWN0LnN0eWxlLmZvbnRTaXplID0gJzExcHgnO1xuICAgIGVmZmVjdC5zdHlsZS5jb2xvciA9IHRpZXIuYWN0aXZlID8gJyNmZmZmZmYnIDogJyM5NGEzYjgnO1xuICAgIGVmZmVjdC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG59XG4vLyDliJvlu7rljZXkuKrnvoHnu4rpoblcbmZ1bmN0aW9uIGNyZWF0ZVN5bmVyZ3lJdGVtKHBhcmVudCwgc3luZXJneSkge1xuICAgIGNvbnN0IHN5bmVyZ3lJdGVtID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBTeW5lcmd5XyR7c3luZXJneS5pZH1gKTtcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgc3luZXJneUl0ZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzhweCc7XG4gICAgc3luZXJneUl0ZW0uc3R5bGUucGFkZGluZyA9ICc4cHgnO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmdiYSgxMDAsIDExNiwgMTM5LCAwLjUpJztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g5Yik5pat5r+A5rS754q25oCBXG4gICAgY29uc3QgaGFzQWN0aXZlRWZmZWN0ID0gc3luZXJneS50aWVycy5zb21lKHRpZXIgPT4gdGllci5hY3RpdmUpO1xuICAgIGNvbnN0IGFsbEVmZmVjdHNBY3RpdmUgPSBzeW5lcmd5LnRpZXJzLmV2ZXJ5KHRpZXIgPT4gdGllci5hY3RpdmUpO1xuICAgIC8vIOa3u+WKoOeKtuaAgeexu1xuICAgIHN5bmVyZ3lJdGVtLkFkZENsYXNzKCdzeW5lcmd5X2l0ZW0nKTtcbiAgICBpZiAoYWxsRWZmZWN0c0FjdGl2ZSkge1xuICAgICAgICBzeW5lcmd5SXRlbS5BZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmdiYSgyNTUsIDIxNSwgMCwgMC44KSc7XG4gICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTVweCByZ2JhKDI1NSwgMjE1LCAwLCAwLjQpJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaGFzQWN0aXZlRWZmZWN0KSB7XG4gICAgICAgIHN5bmVyZ3lJdGVtLkFkZENsYXNzKCdwYXJ0aWFsJyk7XG4gICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmdiYSg1OSwgMTMwLCAyNDYsIDAuOCknO1xuICAgICAgICBzeW5lcmd5SXRlbS5zdHlsZS5ib3hTaGFkb3cgPSAnMCAwIDEwcHggcmdiYSg1OSwgMTMwLCAyNDYsIDAuMyknO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ2luYWN0aXZlJyk7XG4gICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLm9wYWNpdHkgPSAnMC42JztcbiAgICB9XG4gICAgLy8g576B57uK5aS06YOoXG4gICAgY29uc3QgaGVhZGVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBzeW5lcmd5SXRlbSwgYFN5bmVyZ3lIZWFkZXJfJHtzeW5lcmd5LmlkfWApO1xuICAgIGhlYWRlci5BZGRDbGFzcygnc3luZXJneV9oZWFkZXInKTtcbiAgICBoZWFkZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgaGVhZGVyLnN0eWxlLmhlaWdodCA9ICc0MHB4JztcbiAgICBoZWFkZXIuc3R5bGUubWFyZ2luQm90dG9tID0gJzVweCc7XG4gICAgaGVhZGVyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgLy8g5Zu+5qCHIC0g5L2/55SoSW1hZ2XpnaLmnb/vvIhQYW5vcmFtYeaOqOiNkOaWueW8j++8iVxuICAgIGNvbnN0IGljb24gPSAkLkNyZWF0ZVBhbmVsKCdJbWFnZScsIGhlYWRlciwgYFN5bmVyZ3lJY29uXyR7c3luZXJneS5pZH1gKTtcbiAgICBpY29uLkFkZENsYXNzKCdzeW5lcmd5X2ljb24nKTtcbiAgICAvLyDosIPor5Xml6Xlv5fvvJrovpPlh7rlm77moIfot6/lvoRcbiAgICAkLk1zZyhg8J+WvO+4jyBMb2FkaW5nIHN5bmVyZ3kgaWNvbjogJHtzeW5lcmd5Lm5hbWV9IC0gJHtzeW5lcmd5Lmljb259YCk7XG4gICAgLy8g5L2/55SoU2V0SW1hZ2Xmlrnms5XliqDovb3lm77niYfvvIjpnIDopoFYTUzpooTliqDovb3miY3og73oh6rliqjnvJbor5FQTkfvvIlcbiAgICAvLyDot6/lvoTmoLzlvI/vvJpmaWxlOi8ve2ltYWdlc30vLi4uIOS8muiiq+iHquWKqOi9rOaNouS4uue8luivkeWQjueahHZ0ZXhfY1xuICAgIGljb24uU2V0SW1hZ2Uoc3luZXJneS5pY29uKTtcbiAgICBpY29uLnN0eWxlLndpZHRoID0gJzMycHgnO1xuICAgIGljb24uc3R5bGUuaGVpZ2h0ID0gJzMycHgnO1xuICAgIGljb24uc3R5bGUubWFyZ2luUmlnaHQgPSAnOHB4JztcbiAgICBpY29uLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBpY29uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc2cHgnO1xuICAgIGljb24uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknO1xuICAgIGljb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyMyYTJhM2EnOyAvLyDmt7vliqDog4zmma/oibLkvr/kuo7osIPor5VcbiAgICAvLyDkv6Hmga/ljLrln59cbiAgICBjb25zdCBpbmZvID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBoZWFkZXIsIGBTeW5lcmd5SW5mb18ke3N5bmVyZ3kuaWR9YCk7XG4gICAgaW5mby5BZGRDbGFzcygnc3luZXJneV9pbmZvJyk7XG4gICAgaW5mby5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBpbmZvLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBpbmZvLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAvLyDlkI3np7BcbiAgICBjb25zdCBuYW1lID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBpbmZvLCBgU3luZXJneU5hbWVfJHtzeW5lcmd5LmlkfWApO1xuICAgIG5hbWUuQWRkQ2xhc3MoJ3N5bmVyZ3lfbmFtZScpO1xuICAgIG5hbWUudGV4dCA9IHN5bmVyZ3kubmFtZTtcbiAgICBuYW1lLnN0eWxlLmZvbnRTaXplID0gJzE2cHgnO1xuICAgIG5hbWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBuYW1lLnN0eWxlLmNvbG9yID0gaGFzQWN0aXZlRWZmZWN0ID8gJyNmZmQ3MDAnIDogJyNmZmZmZmYnO1xuICAgIG5hbWUuc3R5bGUubWFyZ2luQm90dG9tID0gJzJweCc7XG4gICAgLy8g6K6h5pWwXG4gICAgY29uc3QgbWF4Q291bnQgPSBNYXRoLm1heCguLi5zeW5lcmd5LnRpZXJzLm1hcCh0ID0+IHQuY291bnQpKTtcbiAgICBjb25zdCBjb3VudCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaW5mbywgYFN5bmVyZ3lDb3VudF8ke3N5bmVyZ3kuaWR9YCk7XG4gICAgY291bnQuQWRkQ2xhc3MoJ3N5bmVyZ3lfY291bnQnKTtcbiAgICBjb3VudC50ZXh0ID0gYCR7c3luZXJneS5jdXJyZW50Q291bnR9LyR7bWF4Q291bnR9YDtcbiAgICBjb3VudC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBjb3VudC5zdHlsZS5jb2xvciA9IGhhc0FjdGl2ZUVmZmVjdCA/ICcjZmZjNTdhJyA6ICcjOTRhM2I4JztcbiAgICAvLyDmlYjmnpzliJfooahcbiAgICBjb25zdCB0aWVyc0NvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc3luZXJneUl0ZW0sIGBTeW5lcmd5VGllcnNfJHtzeW5lcmd5LmlkfWApO1xuICAgIHRpZXJzQ29udGFpbmVyLkFkZENsYXNzKCdzeW5lcmd5X3RpZXJzJyk7XG4gICAgdGllcnNDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGllcnNDb250YWluZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIHRpZXJzQ29udGFpbmVyLnN0eWxlLnBhZGRpbmdMZWZ0ID0gJzVweCc7XG4gICAgLy8g5Yib5bu65q+P5Liq5pWI5p6c5p2h55uuXG4gICAgc3luZXJneS50aWVycy5mb3JFYWNoKCh0aWVyLCBpbmRleCkgPT4ge1xuICAgICAgICBjcmVhdGVTeW5lcmd5VGllcih0aWVyc0NvbnRhaW5lciwgdGllciwgaW5kZXgpO1xuICAgIH0pO1xufVxuLy8g5Yib5bu65bem5L6n576B57uK6Z2i5p2/XG5mdW5jdGlvbiBjcmVhdGVMZWZ0U3luZXJneVBhbmVsKHBhcmVudCkge1xuICAgICQuTXNnKCfwn46uIENyZWF0aW5nIGxlZnQgc3luZXJneSBwYW5lbC4uLicpO1xuICAgIGNvbnN0IGxlZnRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnTGVmdFN5bmVyZ3lQYW5lbCcpO1xuICAgIGxlZnRQYW5lbC5zdHlsZS53aWR0aCA9ICcyODBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLm1heEhlaWdodCA9ICc2MDBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdsZWZ0JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTAwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJzIwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7UExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBsZWZ0UGFuZWwuc3R5bGUub3ZlcmZsb3cgPSAnc3F1aXNoIHNjcm9sbCc7XG4gICAgLy8g6Z2i5p2/5qCH6aKYXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxlZnRQYW5lbCwgJ1N5bmVyZ3lQYW5lbFRpdGxlJyk7XG4gICAgdGl0bGUuQWRkQ2xhc3MoJ3N5bmVyZ3lfcGFuZWxfdGl0bGUnKTtcbiAgICB0aXRsZS50ZXh0ID0gJ/Cfjq8g576B57uK5pWI5p6cJztcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgdGl0bGUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g5Yib5bu65omA5pyJ576B57uK6aG5XG4gICAgVEVNUExBVEVfU1lORVJHSUVTLmZvckVhY2goc3luZXJneSA9PiB7XG4gICAgICAgIGNyZWF0ZVN5bmVyZ3lJdGVtKGxlZnRQYW5lbCwgc3luZXJneSk7XG4gICAgfSk7XG4gICAgJC5Nc2coYPCfjq4gU3luZXJneSBwYW5lbCBjcmVhdGVkIHdpdGggJHtURU1QTEFURV9TWU5FUkdJRVMubGVuZ3RofSBzeW5lcmdpZXNgKTtcbn1cbi8vIOWIm+W7uumhtumDqOS/oeaBr+agj1xuZnVuY3Rpb24gY3JlYXRlVG9wSW5mb0JhcihwYXJlbnQpIHtcbiAgICBjb25zdCB0b3BCYXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ1RvcEluZm9CYXInKTtcbiAgICB0b3BCYXIuc3R5bGUud2lkdGggPSAnNzAwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5oZWlnaHQgPSAnNjBweCc7XG4gICAgdG9wQmFyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRvcEJhci5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgdG9wQmFyLnN0eWxlLm1hcmdpblRvcCA9ICcyMHB4JztcbiAgICB0b3BCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUucGFuZWxCZztcbiAgICB0b3BCYXIuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgdG9wQmFyLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICB0b3BCYXIuc3R5bGUucGFkZGluZyA9ICcxMHB4IDIwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgdG9wQmFyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgLy8g5ri45oiP5pe26Ze0XG4gICAgY29uc3QgdGltZVBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdHYW1lVGltZVBhbmVsJyk7XG4gICAgdGltZVBhbmVsLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICB0aW1lUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHRpbWVQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3QgdGltZUxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aW1lUGFuZWwsICdHYW1lVGltZUxhYmVsJyk7XG4gICAgdGltZUxhYmVsLnRleHQgPSAn4o+wIOa4uOaIj+aXtumXtCc7XG4gICAgdGltZUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIHRpbWVMYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgdGltZUxhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC43JztcbiAgICBjb25zdCB0aW1lVmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpbWVQYW5lbCwgJ0dhbWVUaW1lVmFsdWUnKTtcbiAgICB0aW1lVmFsdWUudGV4dCA9ICcwMDowMCc7XG4gICAgdGltZVZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIHRpbWVWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpbWVWYWx1ZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIC8vIOWIhumalOe6v1xuICAgIGNvbnN0IGRpdmlkZXIxID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdEaXZpZGVyMScpO1xuICAgIGRpdmlkZXIxLnN0eWxlLndpZHRoID0gJzFweCc7XG4gICAgZGl2aWRlcjEuc3R5bGUuaGVpZ2h0ID0gJzgwJSc7XG4gICAgZGl2aWRlcjEuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3I7XG4gICAgZGl2aWRlcjEuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGRpdmlkZXIxLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDph5HluIHkv6Hmga9cbiAgICBjb25zdCBnb2xkUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ0dvbGRQYW5lbCcpO1xuICAgIGdvbGRQYW5lbC5zdHlsZS53aWR0aCA9ICcxNTBweCc7XG4gICAgZ29sZFBhbmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBnb2xkUGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IGdvbGRMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgZ29sZFBhbmVsLCAnR29sZExhYmVsJyk7XG4gICAgZ29sZExhYmVsLnRleHQgPSAn8J+SsCDph5HluIEnO1xuICAgIGdvbGRMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBnb2xkTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGdvbGRMYWJlbC5zdHlsZS5vcGFjaXR5ID0gJzAuNyc7XG4gICAgY29uc3QgZ29sZFZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBnb2xkUGFuZWwsICdHb2xkVmFsdWUnKTtcbiAgICBnb2xkVmFsdWUudGV4dCA9ICc1MDAnO1xuICAgIGdvbGRWYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICBnb2xkVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBnb2xkVmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS53YXJuaW5nO1xuICAgIC8vIOWIhumalOe6v1xuICAgIGNvbnN0IGRpdmlkZXIyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdEaXZpZGVyMicpO1xuICAgIGRpdmlkZXIyLnN0eWxlLndpZHRoID0gJzFweCc7XG4gICAgZGl2aWRlcjIuc3R5bGUuaGVpZ2h0ID0gJzgwJSc7XG4gICAgZGl2aWRlcjIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3I7XG4gICAgZGl2aWRlcjIuc3R5bGUub3BhY2l0eSA9ICcwLjMnO1xuICAgIGRpdmlkZXIyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDlh7vmnYDkv6Hmga9cbiAgICBjb25zdCBraWxsUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ0tpbGxQYW5lbCcpO1xuICAgIGtpbGxQYW5lbC5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBraWxsUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGtpbGxQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3Qga2lsbExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBraWxsUGFuZWwsICdLaWxsTGFiZWwnKTtcbiAgICBraWxsTGFiZWwudGV4dCA9ICfimpTvuI8g5Ye75p2AL+atu+S6oS/liqnmlLsnO1xuICAgIGtpbGxMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBraWxsTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGtpbGxMYWJlbC5zdHlsZS5vcGFjaXR5ID0gJzAuNyc7XG4gICAgY29uc3Qga2lsbFZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBraWxsUGFuZWwsICdLaWxsVmFsdWUnKTtcbiAgICBraWxsVmFsdWUudGV4dCA9ICcwIC8gMCAvIDAnO1xuICAgIGtpbGxWYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICBraWxsVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBraWxsVmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0QWNjZW50O1xufVxuLy8g5pen55qE6Iux6ZuE5L+h5oGv6Z2i5p2/5Ye95pWw5bey5Yig6Zmk77yM5pu/5o2i5Li6576B57uK6Z2i5p2/XG4vLyDliJvlu7rlj7PkvqfmiJjmlpfkv6Hmga/pnaLmnb9cbmZ1bmN0aW9uIGNyZWF0ZVJpZ2h0QmF0dGxlUGFuZWwocGFyZW50KSB7XG4gICAgY29uc3QgcmlnaHRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnUmlnaHRCYXR0bGVQYW5lbCcpO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUud2lkdGggPSAnMjgwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzQwMHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTAwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIC8vIOmdouadv+agh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByaWdodFBhbmVsLCAnQmF0dGxlUGFuZWxUaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn4pqU77iPIOaImOaWl+S/oeaBryc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIC8vIOS8pOWus+e7n+iuoVxuICAgIGNyZWF0ZURhbWFnZVN0YXRzKHJpZ2h0UGFuZWwpO1xuICAgIC8vIOaImOaWl+iusOW9lVxuICAgIGNyZWF0ZUJhdHRsZUxvZyhyaWdodFBhbmVsKTtcbn1cbi8vIOWIm+W7uuS8pOWus+e7n+iuoVxuZnVuY3Rpb24gY3JlYXRlRGFtYWdlU3RhdHMocGFyZW50KSB7XG4gICAgY29uc3Qgc3RhdHNTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdEYW1hZ2VTdGF0c1NlY3Rpb24nKTtcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICcxNTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzVGl0bGUnKTtcbiAgICBzdGF0c1RpdGxlLnRleHQgPSAn8J+TiiDkvKTlrrPnu5/orqEnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIHN0YXRzVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIGNvbnN0IHN0YXRzID0gW1xuICAgICAgICB7IGlkOiAnZGFtYWdlX2RlYWx0JywgbGFiZWw6ICfpgKDmiJDkvKTlrrM6JywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGlkOiAnZGFtYWdlX3Rha2VuJywgbGFiZWw6ICflj5fliLDkvKTlrrM6JywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGlkOiAnaGVhbGluZycsIGxhYmVsOiAn5rK755aX6YePOicsIHZhbHVlOiAnMCcgfSxcbiAgICAgICAgeyBpZDogJ2RwcycsIGxhYmVsOiAnRFBTOicsIHZhbHVlOiAnMCcgfSxcbiAgICBdO1xuICAgIHN0YXRzLmZvckVhY2goKHN0YXQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRSb3cgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN0YXRzU2VjdGlvbiwgYFN0YXRSb3dfJHtzdGF0LmlkfWApO1xuICAgICAgICBzdGF0Um93LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBzdGF0Um93LnN0eWxlLmhlaWdodCA9ICcyNXB4JztcbiAgICAgICAgc3RhdFJvdy5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAgICAgc3RhdFJvdy5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgICAgICBjb25zdCBsYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdFJvdywgYCR7c3RhdC5pZH1fTGFiZWxgKTtcbiAgICAgICAgbGFiZWwudGV4dCA9IHN0YXQubGFiZWw7XG4gICAgICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICBsYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxhYmVsLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICAgICAgY29uc3QgdmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRSb3csIGAke3N0YXQuaWR9X1ZhbHVlYCk7XG4gICAgICAgIHZhbHVlLnRleHQgPSBzdGF0LnZhbHVlO1xuICAgICAgICB2YWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgdmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgdmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICAgICAgdmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgdmFsdWUuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgfSk7XG59XG4vLyDliJvlu7rmiJjmlpforrDlvZVcbmZ1bmN0aW9uIGNyZWF0ZUJhdHRsZUxvZyhwYXJlbnQpIHtcbiAgICBjb25zdCBsb2dTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdCYXR0bGVMb2dTZWN0aW9uJyk7XG4gICAgbG9nU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLm92ZXJmbG93ID0gJ3NxdWlzaCBzY3JvbGwnO1xuICAgIGNvbnN0IGxvZ1RpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBsb2dTZWN0aW9uLCAnTG9nVGl0bGUnKTtcbiAgICBsb2dUaXRsZS50ZXh0ID0gJ/Cfk50g5oiY5paX6K6w5b2VJztcbiAgICBsb2dUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBsb2dUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGxvZ1RpdGxlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBsb2dUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgY29uc3QgbG9nQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBsb2dTZWN0aW9uLCAnTG9nQ29udGFpbmVyJyk7XG4gICAgbG9nQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxvZ0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgbG9nQ29udGFpbmVyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbn1cbi8vIOWIm+W7uuW6lemDqOW/q+aNt+agj1xuZnVuY3Rpb24gY3JlYXRlQm90dG9tUXVpY2tCYXIocGFyZW50KSB7XG4gICAgJC5Nc2coJ/Cfjq4gQ3JlYXRpbmcgYm90dG9tIHF1aWNrIGJhci4uLicpO1xuICAgIGNvbnN0IGJvdHRvbUJhciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQm90dG9tUXVpY2tCYXInKTtcbiAgICBjb25zdCBxdWlja0FjdGlvbnMgPSBbXG4gICAgICAgIHsgaWQ6ICdpbnZlbnRvcnknLCBuYW1lOiAn6IOM5YyFJywgaWNvbjogJ/CfjpInIH0sXG4gICAgICAgIHsgaWQ6ICdza2lsbHMnLCBuYW1lOiAn5oqA6IO9JywgaWNvbjogJ+KcqCcgfSxcbiAgICAgICAgeyBpZDogJ3N0YXRzJywgbmFtZTogJ+e7n+iuoScsIGljb246ICfwn5OKJyB9LFxuICAgICAgICB7IGlkOiAndGVzdF9raWxsJywgbmFtZTogJ+a1i+ivlee7k+eulycsIGljb246ICfwn5KAJyB9LFxuICAgIF07XG4gICAgcXVpY2tBY3Rpb25zLmZvckVhY2goKGFjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgYnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgYm90dG9tQmFyLCBgUXVpY2tBY3Rpb25fJHthY3Rpb24uaWR9YCk7XG4gICAgICAgIGJ0bi5BZGRDbGFzcygncXVpY2tfYWN0aW9uX2J0bicpO1xuICAgICAgICBidG4uc3R5bGUud2lkdGggPSAnMTEwcHgnO1xuICAgICAgICBidG4uc3R5bGUuaGVpZ2h0ID0gJzYwcHgnO1xuICAgICAgICBidG4uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgICAgICAvLyDliJvlu7rkuIDkuKrljZXni6znmoQgTGFiZWwg5pi+56S65omA5pyJ5YaF5a65XG4gICAgICAgIGNvbnN0IGNvbnRlbnRMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgYnRuLCBgJHthY3Rpb24uaWR9X2NvbnRlbnRgKTtcbiAgICAgICAgY29udGVudExhYmVsLnRleHQgPSBgJHthY3Rpb24uaWNvbn1cXG4ke2FjdGlvbi5uYW1lfWA7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICAgICAgY29udGVudExhYmVsLmhpdHRlc3QgPSBmYWxzZTsgLy8g6YeN6KaB77ya5LiN5oum5oiq54K55Ye7XG4gICAgICAgIC8vIOe7keWumueCueWHu+S6i+S7tlxuICAgICAgICBidG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0g4pyF4pyF4pyFIENMSUNLRUQ6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuICAgICAgICAgICAgLy8g57uf5LiA6YCa6L+H5pyN5Yqh5Zmo5LqL5Lu25aSE55CG77yM5LiN55u05o6l6LCD55SoIEJhdHRsZUVuZFZpZXdcbiAgICAgICAgICAgIC8vIOacjeWKoeWZqOS8muWPkemAgSBhdXRvY2hlc3Nfd2F2ZV9zZXR0bGVtZW50IOS6i+S7tu+8jOeUsSBiYXR0bGVFbmRWaWV3IOebkeWQrOW5tuaYvuekulxuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3F1aWNrX2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbi5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDmt7vliqDpvKDmoIfmgqzlgZzmlYjmnpxcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDwn5GGIE1vdXNlIG92ZXI6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkLk1zZyhg8J+OriBDcmVhdGVkIGJ1dHRvbjogJHthY3Rpb24ubmFtZX0gKCR7YWN0aW9uLmljb259KWApO1xuICAgIH0pO1xuICAgICQuTXNnKGDwn46uIEJvdHRvbSBxdWljayBiYXIgY3JlYXRlZCB3aXRoICR7cXVpY2tBY3Rpb25zLmxlbmd0aH0gYnV0dG9uc2ApO1xufVxuLy8g5Yib5bu65Lit5aSu5o+Q56S65L+h5oGvIC0g5bey56aB55SoXG4vKlxuZnVuY3Rpb24gY3JlYXRlQ2VudGVyQWxlcnQocGFyZW50OiBQYW5lbCk6IHZvaWQge1xuICAgIGNvbnN0IGFsZXJ0UGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0NlbnRlckFsZXJ0UGFuZWwnKTtcbiAgICBhbGVydFBhbmVsLnN0eWxlLndpZHRoID0gJzQwMHB4JztcbiAgICBhbGVydFBhbmVsLnN0eWxlLmhlaWdodCA9ICcxMDBweCc7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBhbGVydFBhbmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBhbGVydFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnBhbmVsQmc7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7UExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBhbGVydFBhbmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICBhbGVydFBhbmVsLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICBhbGVydFBhbmVsLnN0eWxlLnpJbmRleCA9ICc1MDAwJztcbiAgICBhbGVydFBhbmVsLmhpdHRlc3QgPSBmYWxzZTsgLy8g5LiN5oum5oiq54K55Ye75LqL5Lu2XG4gICAgXG4gICAgY29uc3QgYWxlcnRMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgYWxlcnRQYW5lbCwgJ0FsZXJ0TGFiZWwnKTtcbiAgICBhbGVydExhYmVsLnRleHQgPSAnJztcbiAgICBhbGVydExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIGFsZXJ0TGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBhbGVydExhYmVsLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbiAgICBhbGVydExhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGFsZXJ0TGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG59XG5cbi8vIOaYvuekuuS4reWkruaPkOekulxuZnVuY3Rpb24gc2hvd0NlbnRlckFsZXJ0KG1lc3NhZ2U6IHN0cmluZywgZHVyYXRpb246IG51bWJlciA9IDMuMCk6IHZvaWQge1xuICAgIGNvbnN0IGFsZXJ0UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQ2VudGVyQWxlcnRQYW5lbCcpO1xuICAgIGlmIChhbGVydFBhbmVsKSB7XG4gICAgICAgIGNvbnN0IGFsZXJ0TGFiZWwgPSBhbGVydFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQWxlcnRMYWJlbCcpO1xuICAgICAgICBpZiAoYWxlcnRMYWJlbCkge1xuICAgICAgICAgICAgYWxlcnRMYWJlbC50ZXh0ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIGFsZXJ0UGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJC5TY2hlZHVsZShkdXJhdGlvbiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGFsZXJ0UGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiovXG4vLyDml6fnmoTnlJ/lkb3lgLzlkozprZTms5XlgLzmm7TmlrDlh73mlbDlt7LliKDpmaRcbi8vIOa3u+WKoOaImOaWl+iusOW9lVxuZnVuY3Rpb24gYWRkQmF0dGxlTG9nKG1lc3NhZ2UsIHR5cGUgPSAnaW5mbycpIHtcbiAgICBjb25zdCBsb2dDb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnTG9nQ29udGFpbmVyJyk7XG4gICAgaWYgKCFsb2dDb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBsb2dFbnRyeSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbG9nQ29udGFpbmVyLCBgTG9nRW50cnlfJHtEYXRlLm5vdygpfWApO1xuICAgIGxvZ0VudHJ5LnRleHQgPSBtZXNzYWdlO1xuICAgIGxvZ0VudHJ5LnN0eWxlLmZvbnRTaXplID0gJzExcHgnO1xuICAgIGxvZ0VudHJ5LnN0eWxlLmNvbG9yID0gdHlwZSA9PT0gJ2tpbGwnID8gUExBWUlOR19IVURfVEhFTUUuc3VjY2VzcyA6XG4gICAgICAgIHR5cGUgPT09ICdkZWF0aCcgPyBQTEFZSU5HX0hVRF9USEVNRS5kYW5nZXIgOlxuICAgICAgICAgICAgUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBsb2dFbnRyeS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMnB4JztcbiAgICAvLyDpmZDliLbml6Xlv5fmlbDph49cbiAgICBjb25zdCBjaGlsZHJlbiA9IGxvZ0NvbnRhaW5lci5DaGlsZHJlbigpO1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAxMCkge1xuICAgICAgICBjaGlsZHJlblswXS5EZWxldGVBc3luYygwKTtcbiAgICB9XG59XG4vLyDnm5HlkKzmuLjmiI/kuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdwbGF5ZXJfc3RhdHNfdXBkYXRlJywgKGRhdGEpID0+IHtcbiAgICAvLyDmm7TmlrDnu5/orqHmlbDmja5cbiAgICBpZiAoZGF0YS5nb2xkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZ29sZFZhbHVlID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0dvbGRWYWx1ZScpO1xuICAgICAgICBpZiAoZ29sZFZhbHVlKVxuICAgICAgICAgICAgZ29sZFZhbHVlLnRleHQgPSBkYXRhLmdvbGQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKGRhdGEua2lsbHMgIT09IHVuZGVmaW5lZCB8fCBkYXRhLmRlYXRocyAhPT0gdW5kZWZpbmVkIHx8IGRhdGEuYXNzaXN0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGtpbGxWYWx1ZSA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdLaWxsVmFsdWUnKTtcbiAgICAgICAgaWYgKGtpbGxWYWx1ZSkge1xuICAgICAgICAgICAga2lsbFZhbHVlLnRleHQgPSBgJHtkYXRhLmtpbGxzIHx8IDB9IC8gJHtkYXRhLmRlYXRocyB8fCAwfSAvICR7ZGF0YS5hc3Npc3RzIHx8IDB9YDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2hlcm9fc3RhdHNfdXBkYXRlJywgKGRhdGEpID0+IHtcbiAgICBpZiAoZGF0YS5oZWFsdGggIT09IHVuZGVmaW5lZCAmJiBkYXRhLm1heEhlYWx0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVwZGF0ZUhlYWx0aEJhcihkYXRhLmhlYWx0aCwgZGF0YS5tYXhIZWFsdGgpO1xuICAgIH1cbiAgICBpZiAoZGF0YS5tYW5hICE9PSB1bmRlZmluZWQgJiYgZGF0YS5tYXhNYW5hICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXBkYXRlTWFuYUJhcihkYXRhLm1hbmEsIGRhdGEubWF4TWFuYSk7XG4gICAgfVxufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnYmF0dGxlX2xvZycsIChkYXRhKSA9PiB7XG4gICAgYWRkQmF0dGxlTG9nKGRhdGEubWVzc2FnZSwgZGF0YS50eXBlKTtcbn0pO1xuLy8g5Lit5aSu5o+Q56S65bey56aB55SoXG4vKlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2NlbnRlcl9hbGVydCcsIChkYXRhOiBhbnkpID0+IHtcbiAgICBzaG93Q2VudGVyQWxlcnQoZGF0YS5tZXNzYWdlLCBkYXRhLmR1cmF0aW9uIHx8IDMuMCk7XG59KTtcbiovXG4vLyDmmL7npLov6ZqQ6JeP5oiY5paXSFVEXG5mdW5jdGlvbiBzaG93UGxheWluZ0hVRChzaG93KSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1BsYXlpbmdIVURDb250YWluZXInKTtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gc2hvdyA/ICd2aXNpYmxlJyA6ICdjb2xsYXBzZSc7XG4gICAgICAgICQuTXNnKGBQbGF5aW5nIEhVRCAke3Nob3cgPyAnc2hvd24nIDogJ2hpZGRlbid9YCk7XG4gICAgfVxufVxuLy8g5qOA5p+l5ri45oiP54q25oCB5bm25Yaz5a6a5piv5ZCm5pi+56S6SFVEXG5mdW5jdGlvbiBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKSB7XG4gICAgLy8g5qOA5p+l5ri45oiP5qih5byP77yI55So5LqO6LCD6K+V77yJXG4gICAgbGV0IGN1cnJlbnRNb2RlID0gJ25vcm1hbCc7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVEYXRhID0gQ3VzdG9tTmV0VGFibGVzLkdldFRhYmxlVmFsdWUoJ2dhbWVfbW9kZScsICdjdXJyZW50Jyk7XG4gICAgICAgIGlmIChnYW1lTW9kZURhdGEgJiYgZ2FtZU1vZGVEYXRhLm1vZGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRNb2RlID0gZ2FtZU1vZGVEYXRhLm1vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coJ0Vycm9yIHJlYWRpbmcgZ2FtZSBtb2RlIGZyb20gTmV0VGFibGU6JywgZSk7XG4gICAgfVxuICAgICQuTXNnKGBDdXJyZW50IGdhbWUgbW9kZTogJHtjdXJyZW50TW9kZX1gKTtcbiAgICAvLyDmo4Dmn6XmmK/lkKblnKjmuLjmiI/ov5vooYzkuK1cbiAgICBjb25zdCBnYW1lU3RhdGUgPSBHYW1lLkdldFN0YXRlKCk7XG4gICAgJC5Nc2coYEN1cnJlbnQgZ2FtZSBzdGF0ZTogJHtnYW1lU3RhdGV9YCk7XG4gICAgLy8g5qC55o2u5a6e6ZmF55qE5ri45oiP54q25oCB5bi46YeP77yaXG4gICAgLy8gRE9UQV9HQU1FUlVMRVNfU1RBVEVfUFJFX0dBTUUgPSA4XG4gICAgLy8gRE9UQV9HQU1FUlVMRVNfU1RBVEVfR0FNRV9JTl9QUk9HUkVTUyA9IDEwXG4gICAgLy8g5Zyo6Ieq6LWw5qOL5qih5byP5LiL77yM5Y+v6IO95ri45oiP54q25oCB5LiN5ZCM77yM5omA5Lul5pS+5a695p2h5Lu25oiW55u05o6l5pi+56S6XG4gICAgbGV0IHNob3VsZFNob3cgPSBnYW1lU3RhdGUgPj0gOCAmJiBnYW1lU3RhdGUgPD0gMTA7XG4gICAgLy8g5aaC5p6c5piv6Ieq6LWw5qOL5qih5byP77yM5Y2z5L2/5ri45oiP54q25oCB5LiN56ym5ZCI77yM5Lmf5bCd6K+V5pi+56S677yI5Zug5Li66Ieq6LWw5qOL5Y+v6IO95pyJ5LiN5ZCM55qE54q25oCB5YC877yJXG4gICAgaWYgKGN1cnJlbnRNb2RlID09PSAnYXV0b2NoZXNzJykge1xuICAgICAgICAkLk1zZygnQXV0b0NoZXNzIG1vZGUgZGV0ZWN0ZWQgLSBmb3JjaW5nIEhVRCBkaXNwbGF5Jyk7XG4gICAgICAgIC8vIOWcqOiHqui1sOaji+aooeW8j+S4i++8jOWPquimgeS4jeaYr+WIneWni+WMlumYtuauteWwseaYvuekulxuICAgICAgICBzaG91bGRTaG93ID0gZ2FtZVN0YXRlID49IDE7IC8vIOabtOWuveadvueahOadoeS7tlxuICAgIH1cbiAgICAkLk1zZyhgU2hvdWxkIHNob3cgUGxheWluZyBIVUQ6ICR7c2hvdWxkU2hvd30gKG1vZGU6ICR7Y3VycmVudE1vZGV9LCBzdGF0ZTogJHtnYW1lU3RhdGV9KWApO1xuICAgIHNob3dQbGF5aW5nSFVEKHNob3VsZFNob3cpO1xufVxuLy8g6ZqQ6JeP5Y6f55SfIERvdGEgMiBVSSDlhYPntKBcbmZ1bmN0aW9uIGhpZGVOYXRpdmVVSSgpIHtcbiAgICAkLk1zZygn8J+OriBIaWRpbmcgbmF0aXZlIERvdGEgMiBVSSBlbGVtZW50cy4uLicpO1xuICAgIHRyeSB7XG4gICAgICAgIC8vIOmakOiXj+WOn+eUnyBIVUQg5YWD57SgXG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX1RPUF9USU1FT0ZEQVksIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfVE9QX0hFUk9FUywgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9GTFlPVVRfU0NPUkVCT0FSRCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9BQ1RJT05fUEFORUwsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfQUNUSU9OX01JTklNQVAsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1BBTkVMLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9TSE9QLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9JVEVNUywgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUVVJQ0tCVVksIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX0NPVVJJRVIsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1BST1RFQ1QsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX0dPTEQsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfU0hPUF9TVUdHRVNURURJVEVNUywgZmFsc2UpO1xuICAgICAgICAkLk1zZygn4pyFIE5hdGl2ZSBVSSBlbGVtZW50cyBoaWRkZW4gc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKCfinYwgRXJyb3IgaGlkaW5nIG5hdGl2ZSBVSTonLCBlKTtcbiAgICB9XG59XG4vLyDmgaLlpI3ljp/nlJ8gRG90YSAyIFVJIOWFg+e0oFxuZnVuY3Rpb24gc2hvd05hdGl2ZVVJKCkge1xuICAgICQuTXNnKCfwn46uIFJlc3RvcmluZyBuYXRpdmUgRG90YSAyIFVJIGVsZW1lbnRzLi4uJyk7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8g5oGi5aSN5Y6f55SfIEhVRCDlhYPntKBcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfVE9QX1RJTUVPRkRBWSwgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX1RPUF9IRVJPRVMsIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9GTFlPVVRfU0NPUkVCT0FSRCwgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0FDVElPTl9QQU5FTCwgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0FDVElPTl9NSU5JTUFQLCB0cnVlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1BBTkVMLCB0cnVlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1NIT1AsIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfSVRFTVMsIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUVVJQ0tCVVksIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfQ09VUklFUiwgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9QUk9URUNULCB0cnVlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX0dPTEQsIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9TSE9QX1NVR0dFU1RFRElURU1TLCB0cnVlKTtcbiAgICAgICAgJC5Nc2coJ+KchSBOYXRpdmUgVUkgZWxlbWVudHMgcmVzdG9yZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKCfinYwgRXJyb3IgcmVzdG9yaW5nIG5hdGl2ZSBVSTonLCBlKTtcbiAgICB9XG59XG4vLyDliJ3lp4vljJZcbmZ1bmN0aW9uIGluaXRpYWxpemVQbGF5aW5nSFVEKCkge1xuICAgIC8vIOmakOiXj+WOn+eUnyBVSVxuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIC8vIOeri+WNs+WIm+W7ukhVRO+8jOS4jeetieW+hVxuICAgIGNyZWF0ZVBsYXlpbmdIVUQoKTtcbiAgICAvLyDlhYjlvLrliLbmmL7npLrvvIznlKjkuo7mtYvor5VcbiAgICAkLk1zZygn8J+OriBGb3JjZSBzaG93aW5nIEhVRCBmb3IgdGVzdGluZy4uLicpO1xuICAgIHNob3dQbGF5aW5nSFVEKHRydWUpO1xuICAgIC8vIOW7tui/n+ajgOafpea4uOaIj+eKtuaAgeWSjOaooeW8j++8iOetieW+hee9kee7nOihqOaVsOaNruWQjOatpe+8iVxuICAgICQuU2NoZWR1bGUoMS4wLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCfwn46uIENoZWNraW5nIGdhbWUgc3RhdGUgYW5kIG1vZGUgYWZ0ZXIgMSBzZWNvbmQuLi4nKTtcbiAgICAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4gICAgfSk7XG4gICAgLy8g5YaN5qyh5bu26L+f5qOA5p+l77yM56Gu5L+d572R57uc6KGo5pWw5o2u5bey5ZCM5q2lXG4gICAgJC5TY2hlZHVsZSgzLjAsICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ/Cfjq4gUmUtY2hlY2tpbmcgZ2FtZSBzdGF0ZSBhbmQgbW9kZSBhZnRlciAzIHNlY29uZHMuLi4nKTtcbiAgICAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4gICAgfSk7XG59XG4vLyDnm5HlkKzmuLjmiI/nirbmgIHlj5jljJbkuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX3N0YXRlX2NoYW5nZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKCdHYW1lIHN0YXRlIGNoYW5nZWQ6JywgZGF0YSk7XG4gICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG59KTtcbi8vIOebkeWQrOa4uOaIj+aooeW8j+WPmOWMluS6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfbW9kZV9jaGFuZ2VkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZygnR2FtZSBtb2RlIGNoYW5nZWQ6JywgZGF0YSk7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5uZXdNb2RlKSB7XG4gICAgICAgICQuTXNnKGBOZXcgZ2FtZSBtb2RlOiAke2RhdGEubmV3TW9kZX1gKTtcbiAgICAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4gICAgfVxufSk7XG4vLyDnm5HlkKznvZHnu5zooajkuK3nmoTmuLjmiI/mqKHlvI/lj5jljJZcbkN1c3RvbU5ldFRhYmxlcy5TdWJzY3JpYmVOZXRUYWJsZUxpc3RlbmVyKCdnYW1lX21vZGUnLCAodGFibGVOYW1lLCBrZXksIGRhdGEpID0+IHtcbiAgICBpZiAoa2V5ID09PSAnY3VycmVudCcpIHtcbiAgICAgICAgJC5Nc2coJ0dhbWUgbW9kZSB1cGRhdGVkIGluIE5ldFRhYmxlOicsIGRhdGEpO1xuICAgICAgICBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKTtcbiAgICB9XG59KTtcbi8vIOebkeWQrOa4uOaIj+W8gOWni+S6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfc3RhcnQnLCAoKSA9PiB7XG4gICAgJC5Nc2coJ0dhbWUgc3RhcnRlZCAtIHNob3dpbmcgcGxheWluZyBIVUQnKTtcbiAgICBzaG93UGxheWluZ0hVRCh0cnVlKTtcbn0pO1xuLy8g55uR5ZCs5ri45oiP57uT5p2f5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9lbmQnLCAoKSA9PiB7XG4gICAgJC5Nc2coJ0dhbWUgZW5kZWQgLSBoaWRpbmcgcGxheWluZyBIVUQnKTtcbiAgICBzaG93UGxheWluZ0hVRChmYWxzZSk7XG59KTtcbi8vIOWumuacn+ajgOafpea4uOaIj+eKtuaAge+8iOWkh+eUqOaWueahiO+8iVxuZnVuY3Rpb24gc3RhcnRHYW1lU3RhdGVNb25pdG9yKCkge1xuICAgIGNvbnN0IGNoZWNrSW50ZXJ2YWwgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuICAgICAgICAkLlNjaGVkdWxlKDIuMCwgY2hlY2tJbnRlcnZhbCk7IC8vIOavjzLnp5Lmo4Dmn6XkuIDmrKFcbiAgICB9O1xuICAgICQuU2NoZWR1bGUoNS4wLCBjaGVja0ludGVydmFsKTsgLy8gNeenkuWQjuW8gOWni+ebkeaOp1xufVxuLy8g5a+85Ye65YWo5bGA5Ye95pWwXG5nbG9iYWxUaGlzLlBsYXlpbmdIVUQgPSB7XG4gICAgY3JlYXRlOiBjcmVhdGVQbGF5aW5nSFVELFxuICAgIHNob3c6IHNob3dQbGF5aW5nSFVELFxuICAgIGNoZWNrU3RhdGU6IGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCxcbiAgICBhZGRMb2c6IGFkZEJhdHRsZUxvZyxcbiAgICBoaWRlTmF0aXZlVUk6IGhpZGVOYXRpdmVVSSxcbiAgICBzaG93TmF0aXZlVUk6IHNob3dOYXRpdmVVSSxcbiAgICAvLyDpooTnlZnnvoHnu4rmm7TmlrDmjqXlj6NcbiAgICB1cGRhdGVTeW5lcmd5OiAoc3luZXJneURhdGEpID0+IHtcbiAgICAgICAgJC5Nc2coJ1N5bmVyZ3kgdXBkYXRlIHJlY2VpdmVkOicsIHN5bmVyZ3lEYXRhKTtcbiAgICAgICAgLy8gVE9ETzog5a6e546w576B57uK5pWw5o2u5pu05paw6YC76L6RXG4gICAgfVxufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuaW5pdGlhbGl6ZVBsYXlpbmdIVUQoKTtcbi8vIOWQr+WKqOa4uOaIj+eKtuaAgeebkeaOp1xuc3RhcnRHYW1lU3RhdGVNb25pdG9yKCk7XG4vLyDmt7vliqDlhajlsYDmtYvor5Xlh73mlbBcbmdsb2JhbFRoaXMuVGVzdFBsYXlpbmdIVUQgPSB7XG4gICAgc2hvdzogKCkgPT4gc2hvd1BsYXlpbmdIVUQodHJ1ZSksXG4gICAgaGlkZTogKCkgPT4gc2hvd1BsYXlpbmdIVUQoZmFsc2UpLFxuICAgIGNoZWNrU3RhdGU6IGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCxcbiAgICBoaWRlTmF0aXZlOiBoaWRlTmF0aXZlVUksXG4gICAgc2hvd05hdGl2ZTogc2hvd05hdGl2ZVVJLFxuICAgIGZvcmNlU2hvdzogKCkgPT4ge1xuICAgICAgICAkLk1zZygnRm9yY2Ugc2hvd2luZyBQbGF5aW5nIEhVRCBmb3IgdGVzdGluZy4uLicpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgY3JlYXRlUGxheWluZ0hVRCgpO1xuICAgICAgICB9XG4gICAgICAgIHNob3dQbGF5aW5nSFVEKHRydWUpO1xuICAgIH0sXG4gICAgdGVzdEJhdHRsZUVuZFZpY3Rvcnk6ICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSBUZXN0aW5nIGJhdHRsZSBlbmQgdmlldyAtIFZpY3RvcnkgKGRpcmVjdCBjYWxsKScpO1xuICAgICAgICBpZiAoZ2xvYmFsVGhpcy5CYXR0bGVFbmRWaWV3KSB7XG4gICAgICAgICAgICBnbG9iYWxUaGlzLkJhdHRsZUVuZFZpZXcuc2hvd1ZpY3RvcnkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0g4p2MIEJhdHRsZUVuZFZpZXcgbm90IGxvYWRlZCB5ZXQhJyk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRlc3RCYXR0bGVFbmREZWZlYXQ6ICgpID0+IHtcbiAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSBUZXN0aW5nIGJhdHRsZSBlbmQgdmlldyAtIERlZmVhdCAoZGlyZWN0IGNhbGwpJyk7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkJhdHRsZUVuZFZpZXcpIHtcbiAgICAgICAgICAgIGdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldy5zaG93RGVmZWF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIOKdjCBCYXR0bGVFbmRWaWV3IG5vdCBsb2FkZWQgeWV0IScpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==