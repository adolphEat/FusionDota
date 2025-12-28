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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGFBQWE7QUFDaEQ7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBLHVDQUF1QztBQUN2QyxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNULDBCQUEwQixDQUFDO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLENBQUM7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxDQUFDO0FBQ2I7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIHZhciBcIiRcIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxwbGF5aW5nLWh1ZFxcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gQHRzLW5vY2hlY2tcbi8vIOaImOaWl+S4reeahEhVROeVjOmdoiAtIOWPguiAgyBEb3RhMkN1c3RvbUdhbWUg6K6+6K6h6aOO5qC8XG4vLyDnq4vljbPmmL7npLrkuIDkuKrmtYvor5Xmtojmga9cbkdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4kLk1zZygn8J+OriBQbGF5aW5nIEhVRCBzY3JpcHQgaXMgZXhlY3V0aW5nIScpO1xuLy8g5Li76aKY6YWN572u77yI5Y+C6ICDIERvdGEyQ3VzdG9tR2FtZSDpo47moLzvvIlcbmNvbnN0IFBMQVlJTkdfSFVEX1RIRU1FID0ge1xuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDE1LCAyMywgNDIsIDAuODUpJyxcbiAgICBwYW5lbEJnOiAncmdiYSgzMywgMzQsIDMxLCAwLjk1KScsXG4gICAgYm9yZGVyQ29sb3I6ICdyZ2JhKDU5LCAxMzAsIDI0NiwgMC40KScsXG4gICAgdGV4dFByaW1hcnk6ICcjM2I4MmY2JyxcbiAgICB0ZXh0U2Vjb25kYXJ5OiAnI2ZmZmZmZicsXG4gICAgdGV4dEFjY2VudDogJyNmZmM1N2EnLFxuICAgIHN1Y2Nlc3M6ICcjNGNhZjUwJyxcbiAgICB3YXJuaW5nOiAnI2ZmOTgwMCcsXG4gICAgZGFuZ2VyOiAnI2Y0NDMzNicsXG4gICAgaGVhbHRoOiAnI2Y0NDMzNicsXG4gICAgbWFuYTogJyMyMTk2ZjMnLFxufTtcbi8vIOe+gee7iuWbvuagh+aYoOWwhCAtIOS9v+eUqCBpY29uIOaWh+S7tuWkueS4reeahOWbvuagh1xuY29uc3QgU1lORVJHWV9JQ09OX01BUCA9IHtcbiAgICB3YXJyaW9yOiAnaGF6YXJkX2FybW9yX3BuZy5wbmcnLCAvLyDmiJjlo6sgLSDmiqTnlLLlm77moIdcbiAgICBtYWdlOiAnaGF6YXJkX21hZ2ljcmVzaXN0X3BuZy5wbmcnLCAvLyDms5XluIggLSDprZTmipflm77moIdcbiAgICBhc3Nhc3NpbjogJ2hhemFyZF9hdHRhY2tfcG5nLnBuZycsIC8vIOWIuuWuoiAtIOaUu+WHu+Wbvuagh1xuICAgIGh1bnRlcjogJ2hhemFyZF9zcGVlZF9wbmcucG5nJywgLy8g54yO5Lq6IC0g6YCf5bqm5Zu+5qCHXG4gICAgb3JjOiAnaGF6YXJkX2VucmFnZV8yX3BuZy5wbmcnLCAvLyDlhb3kurogLSDni4LmmrTlm77moIdcbiAgICB1bmRlYWQ6ICdoYXphcmRfdmFtcGlyaWNfcG5nLnBuZycsIC8vIOS4jeatuyAtIOWQuOihgOWbvuagh1xuICAgIGh1bWFuOiAnaGF6YXJkX2dsaW1tZXJfcG5nLnBuZycsIC8vIOS6uuexuyAtIOmXquWFieWbvuagh1xuICAgIGdvYmxpbjogJ2hhemFyZF9lbWJpZ2dlbl9wbmcucG5nJywgLy8g5Zyw57K+IC0g5Y+Y5aSn5Zu+5qCHXG59O1xuLy8g5qih5p2/576B57uK5pWw5o2u77yI55So5LqOVUnlsZXnpLrvvIlcbmNvbnN0IFRFTVBMQVRFX1NZTkVSR0lFUyA9IFtcbiAgICB7XG4gICAgICAgIGlkOiAnd2FycmlvcicsXG4gICAgICAgIG5hbWU6ICfmiJjlo6snLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX2FybW9yX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDIsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpsrMjAw55Sf5ZG95YC8JywgYWN0aXZlOiB0cnVlIH0sXG4gICAgICAgICAgICB7IGNvdW50OiA0LCBlZmZlY3Q6ICfmiYDmnInlj4vlhpsrNDAw55Sf5ZG95YC8JywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNiwgZWZmZWN0OiAn5omA5pyJ5Y+L5YabKzgwMOeUn+WRveWAvCcsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnbWFnZScsXG4gICAgICAgIG5hbWU6ICfms5XluIgnLFxuICAgICAgICB0eXBlOiAnY2xhc3MnLFxuICAgICAgICBpY29uOiAnZmlsZTovL3tpbWFnZXN9L2N1c3RvbV9nYW1lL2ljb24vaGF6YXJkX21hZ2ljcmVzaXN0X3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDEsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAzLCBlZmZlY3Q6ICfmiYDmnInlj4vlhpvprZTmipctMzAlJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNiwgZWZmZWN0OiAn5omA5pyJ5Y+L5Yab6a2U5oqXLTYwJScsIGFjdGl2ZTogZmFsc2UgfVxuICAgICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGlkOiAnYXNzYXNzaW4nLFxuICAgICAgICBuYW1lOiAn5Yi65a6iJyxcbiAgICAgICAgdHlwZTogJ2NsYXNzJyxcbiAgICAgICAgaWNvbjogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uL2hhemFyZF9hdHRhY2tfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMyxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDMsIGVmZmVjdDogJ+WIuuWuouaciTEwJeWHoOeOh+mAoOaIkDPlgI3kvKTlrrMnLCBhY3RpdmU6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDYsIGVmZmVjdDogJ+WIuuWuouaciTIwJeWHoOeOh+mAoOaIkDTlgI3kvKTlrrMnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ29yYycsXG4gICAgICAgIG5hbWU6ICflhb3kuronLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfZW5yYWdlXzJfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMixcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+aJgOacieWFveS6uisyNTDnlJ/lkb3lgLwnLCBhY3RpdmU6IHRydWUgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDQsIGVmZmVjdDogJ+aJgOacieWFveS6uis0MDDnlJ/lkb3lgLzvvIwrMTXmiqTnlLInLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ3VuZGVhZCcsXG4gICAgICAgIG5hbWU6ICfkuI3mrbsnLFxuICAgICAgICB0eXBlOiAncmFjZScsXG4gICAgICAgIGljb246ICdmaWxlOi8ve2ltYWdlc30vY3VzdG9tX2dhbWUvaWNvbi9oYXphcmRfdmFtcGlyaWNfcG5nLnBuZycsXG4gICAgICAgIGN1cnJlbnRDb3VudDogMCxcbiAgICAgICAgdGllcnM6IFtcbiAgICAgICAgICAgIHsgY291bnQ6IDIsIGVmZmVjdDogJ+aJgOacieWPi+WGm+aKpOeUsi01JywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5omA5pyJ5Y+L5Yab5oqk55SyLTcnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgICBpZDogJ2h1bWFuJyxcbiAgICAgICAgbmFtZTogJ+S6uuexuycsXG4gICAgICAgIHR5cGU6ICdyYWNlJyxcbiAgICAgICAgaWNvbjogJ2ZpbGU6Ly97aW1hZ2VzfS9jdXN0b21fZ2FtZS9pY29uL2hhemFyZF9nbGltbWVyX3BuZy5wbmcnLFxuICAgICAgICBjdXJyZW50Q291bnQ6IDEsXG4gICAgICAgIHRpZXJzOiBbXG4gICAgICAgICAgICB7IGNvdW50OiAyLCBlZmZlY3Q6ICfmiYDmnInkurrnsbsrMjAl5pS75Ye76YCf5bqmJywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgICAgeyBjb3VudDogNCwgZWZmZWN0OiAn5omA5pyJ5Lq657G7KzM1JeaUu+WHu+mAn+W6picsIGFjdGl2ZTogZmFsc2UgfSxcbiAgICAgICAgICAgIHsgY291bnQ6IDYsIGVmZmVjdDogJ+aJgOacieS6uuexuys1MCXmlLvlh7vpgJ/luqYnLCBhY3RpdmU6IGZhbHNlIH1cbiAgICAgICAgXVxuICAgIH1cbl07XG4vLyDliJvlu7rmiJjmlpdIVURcbmZ1bmN0aW9uIGNyZWF0ZVBsYXlpbmdIVUQoKSB7XG4gICAgJC5Nc2coJ/Cfjq4gQ1JFQVRJTkcgUExBWUlORyBIVUQgLSBORVcgVkVSU0lPTiAyMjo1MCDwn46uJyk7XG4gICAgLy8g8J+UkSDnoa7kv53pmpDol4/ljp/nlJ9VSe+8iOWcqOWIm+W7ukhVROS5i+WJje+8iVxuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ0Vycm9yOiBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIOWIoOmZpOW3suWtmOWcqOeahOWuueWZqFxuICAgIGNvbnN0IGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICB9XG4gICAgLy8g5Yib5bu65Li75a655ZmoXG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgLy8g56e76ZmkaGl0dGVzdOiuvue9ru+8jOmBv+WFjVBhbm9yYW1hIEFQSemXrumimFxuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMCc7XG4gICAgY29udGFpbmVyLkFkZENsYXNzKCdwbGF5aW5nX2h1ZF9yb290Jyk7XG4gICAgLy8g5Yib5bu66aG26YOo5L+h5oGv5qCPXG4gICAgY3JlYXRlVG9wSW5mb0Jhcihjb250YWluZXIpO1xuICAgIC8vIOWIm+W7uuW3puS+p+e+gee7iumdouadv1xuICAgIGNyZWF0ZUxlZnRTeW5lcmd5UGFuZWwoY29udGFpbmVyKTtcbiAgICAvLyDliJvlu7rlj7PkvqfmiJjmlpfkv6Hmga/pnaLmnb9cbiAgICBjcmVhdGVSaWdodEJhdHRsZVBhbmVsKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65bqV6YOo5b+r5o235qCPXG4gICAgY3JlYXRlQm90dG9tUXVpY2tCYXIoY29udGFpbmVyKTtcbn1cbi8vIOWIm+W7uue+gee7iuaViOaenOadoeebrlxuZnVuY3Rpb24gY3JlYXRlU3luZXJneVRpZXIocGFyZW50LCB0aWVyLCBpbmRleCkge1xuICAgIGNvbnN0IHRpZXJJdGVtID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBTeW5lcmd5VGllcl8ke2luZGV4fWApO1xuICAgIHRpZXJJdGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRpZXJJdGVtLnN0eWxlLmhlaWdodCA9ICcyMnB4JztcbiAgICB0aWVySXRlbS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnM3B4JztcbiAgICB0aWVySXRlbS5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIHRpZXJJdGVtLnN0eWxlLnBhZGRpbmcgPSAnMnB4IDVweCc7XG4gICAgLy8g5re75Yqg5r+A5rS754q25oCB57G7XG4gICAgaWYgKHRpZXIuYWN0aXZlKSB7XG4gICAgICAgIHRpZXJJdGVtLkFkZENsYXNzKCdzeW5lcmd5X3RpZXInKTtcbiAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGllckl0ZW0uQWRkQ2xhc3MoJ3N5bmVyZ3lfdGllcicpO1xuICAgICAgICB0aWVySXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICB9XG4gICAgLy8g54q25oCB5Zu+5qCHXG4gICAgY29uc3Qgc3RhdHVzSWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGllckl0ZW0sIGBUaWVyU3RhdHVzXyR7aW5kZXh9YCk7XG4gICAgc3RhdHVzSWNvbi50ZXh0ID0gdGllci5hY3RpdmUgPyAn4pyTJyA6ICfil4snO1xuICAgIHN0YXR1c0ljb24uQWRkQ2xhc3MoJ3RpZXJfaWNvbicpO1xuICAgIHN0YXR1c0ljb24uc3R5bGUud2lkdGggPSAnMjBweCc7XG4gICAgc3RhdHVzSWNvbi5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBzdGF0dXNJY29uLnN0eWxlLmNvbG9yID0gdGllci5hY3RpdmUgPyAnI2ZmZDcwMCcgOiAnIzY0NzQ4Yic7XG4gICAgc3RhdHVzSWNvbi5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g6ZyA5rGC5pWw6YePXG4gICAgY29uc3QgcmVxdWlyZW1lbnQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpZXJJdGVtLCBgVGllclJlcXVpcmVtZW50XyR7aW5kZXh9YCk7XG4gICAgcmVxdWlyZW1lbnQudGV4dCA9IGAoJHt0aWVyLmNvdW50fSlgO1xuICAgIHJlcXVpcmVtZW50LkFkZENsYXNzKCd0aWVyX3JlcXVpcmVtZW50Jyk7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUud2lkdGggPSAnMzVweCc7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUuZm9udFNpemUgPSAnMTFweCc7XG4gICAgcmVxdWlyZW1lbnQuc3R5bGUuY29sb3IgPSB0aWVyLmFjdGl2ZSA/ICcjZmZkNzAwJyA6ICcjOTRhM2I4JztcbiAgICByZXF1aXJlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJlcXVpcmVtZW50LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDmlYjmnpzmj4/ov7BcbiAgICBjb25zdCBlZmZlY3QgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpZXJJdGVtLCBgVGllckVmZmVjdF8ke2luZGV4fWApO1xuICAgIGVmZmVjdC50ZXh0ID0gdGllci5lZmZlY3Q7XG4gICAgZWZmZWN0LkFkZENsYXNzKCd0aWVyX2VmZmVjdCcpO1xuICAgIGVmZmVjdC5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBlZmZlY3Quc3R5bGUuZm9udFNpemUgPSAnMTFweCc7XG4gICAgZWZmZWN0LnN0eWxlLmNvbG9yID0gdGllci5hY3RpdmUgPyAnI2ZmZmZmZicgOiAnIzk0YTNiOCc7XG4gICAgZWZmZWN0LnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbn1cbi8vIOWIm+W7uuWNleS4que+gee7iumhuVxuZnVuY3Rpb24gY3JlYXRlU3luZXJneUl0ZW0ocGFyZW50LCBzeW5lcmd5KSB7XG4gICAgY29uc3Qgc3luZXJneUl0ZW0gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgYFN5bmVyZ3lfJHtzeW5lcmd5LmlkfWApO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnOHB4JztcbiAgICBzeW5lcmd5SXRlbS5zdHlsZS5wYWRkaW5nID0gJzhweCc7XG4gICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDEwMCwgMTE2LCAxMzksIDAuNSknO1xuICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAvLyDliKTmlq3mv4DmtLvnirbmgIFcbiAgICBjb25zdCBoYXNBY3RpdmVFZmZlY3QgPSBzeW5lcmd5LnRpZXJzLnNvbWUodGllciA9PiB0aWVyLmFjdGl2ZSk7XG4gICAgY29uc3QgYWxsRWZmZWN0c0FjdGl2ZSA9IHN5bmVyZ3kudGllcnMuZXZlcnkodGllciA9PiB0aWVyLmFjdGl2ZSk7XG4gICAgLy8g5re75Yqg54q25oCB57G7XG4gICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ3N5bmVyZ3lfaXRlbScpO1xuICAgIGlmIChhbGxFZmZlY3RzQWN0aXZlKSB7XG4gICAgICAgIHN5bmVyZ3lJdGVtLkFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDI1NSwgMjE1LCAwLCAwLjgpJztcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm94U2hhZG93ID0gJzAgMCAxNXB4IHJnYmEoMjU1LCAyMTUsIDAsIDAuNCknO1xuICAgIH1cbiAgICBlbHNlIGlmIChoYXNBY3RpdmVFZmZlY3QpIHtcbiAgICAgICAgc3luZXJneUl0ZW0uQWRkQ2xhc3MoJ3BhcnRpYWwnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDU5LCAxMzAsIDI0NiwgMC44KSc7XG4gICAgICAgIHN5bmVyZ3lJdGVtLnN0eWxlLmJveFNoYWRvdyA9ICcwIDAgMTBweCByZ2JhKDU5LCAxMzAsIDI0NiwgMC4zKSc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzeW5lcmd5SXRlbS5BZGRDbGFzcygnaW5hY3RpdmUnKTtcbiAgICAgICAgc3luZXJneUl0ZW0uc3R5bGUub3BhY2l0eSA9ICcwLjYnO1xuICAgIH1cbiAgICAvLyDnvoHnu4rlpLTpg6hcbiAgICBjb25zdCBoZWFkZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN5bmVyZ3lJdGVtLCBgU3luZXJneUhlYWRlcl8ke3N5bmVyZ3kuaWR9YCk7XG4gICAgaGVhZGVyLkFkZENsYXNzKCdzeW5lcmd5X2hlYWRlcicpO1xuICAgIGhlYWRlci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBoZWFkZXIuc3R5bGUuaGVpZ2h0ID0gJzQwcHgnO1xuICAgIGhlYWRlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICBoZWFkZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICAvLyDlm77moIcgLSDkvb/nlKhJbWFnZemdouadv++8iFBhbm9yYW1h5o6o6I2Q5pa55byP77yJXG4gICAgY29uc3QgaWNvbiA9ICQuQ3JlYXRlUGFuZWwoJ0ltYWdlJywgaGVhZGVyLCBgU3luZXJneUljb25fJHtzeW5lcmd5LmlkfWApO1xuICAgIGljb24uQWRkQ2xhc3MoJ3N5bmVyZ3lfaWNvbicpO1xuICAgIC8vIOiwg+ivleaXpeW/l++8mui+k+WHuuWbvuagh+i3r+W+hFxuICAgICQuTXNnKGDwn5a877iPIExvYWRpbmcgc3luZXJneSBpY29uOiAke3N5bmVyZ3kubmFtZX0gLSAke3N5bmVyZ3kuaWNvbn1gKTtcbiAgICAvLyDkvb/nlKhTZXRJbWFnZeaWueazleWKoOi9veWbvueJh++8iOmcgOimgVhNTOmihOWKoOi9veaJjeiDveiHquWKqOe8luivkVBOR++8iVxuICAgIC8vIOi3r+W+hOagvOW8j++8mmZpbGU6Ly97aW1hZ2VzfS8uLi4g5Lya6KKr6Ieq5Yqo6L2s5o2i5Li657yW6K+R5ZCO55qEdnRleF9jXG4gICAgaWNvbi5TZXRJbWFnZShzeW5lcmd5Lmljb24pO1xuICAgIGljb24uc3R5bGUud2lkdGggPSAnMzJweCc7XG4gICAgaWNvbi5zdHlsZS5oZWlnaHQgPSAnMzJweCc7XG4gICAgaWNvbi5zdHlsZS5tYXJnaW5SaWdodCA9ICc4cHgnO1xuICAgIGljb24uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGljb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzZweCc7XG4gICAgaWNvbi5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKSc7XG4gICAgaWNvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzJhMmEzYSc7IC8vIOa3u+WKoOiDjOaZr+iJsuS+v+S6juiwg+ivlVxuICAgIC8vIOS/oeaBr+WMuuWfn1xuICAgIGNvbnN0IGluZm8gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGhlYWRlciwgYFN5bmVyZ3lJbmZvXyR7c3luZXJneS5pZH1gKTtcbiAgICBpbmZvLkFkZENsYXNzKCdzeW5lcmd5X2luZm8nKTtcbiAgICBpbmZvLnN0eWxlLndpZHRoID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIGluZm8uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGluZm8uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIC8vIOWQjeensFxuICAgIGNvbnN0IG5hbWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGluZm8sIGBTeW5lcmd5TmFtZV8ke3N5bmVyZ3kuaWR9YCk7XG4gICAgbmFtZS5BZGRDbGFzcygnc3luZXJneV9uYW1lJyk7XG4gICAgbmFtZS50ZXh0ID0gc3luZXJneS5uYW1lO1xuICAgIG5hbWUuc3R5bGUuZm9udFNpemUgPSAnMTZweCc7XG4gICAgbmFtZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIG5hbWUuc3R5bGUuY29sb3IgPSBoYXNBY3RpdmVFZmZlY3QgPyAnI2ZmZDcwMCcgOiAnI2ZmZmZmZic7XG4gICAgbmFtZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMnB4JztcbiAgICAvLyDorqHmlbBcbiAgICBjb25zdCBtYXhDb3VudCA9IE1hdGgubWF4KC4uLnN5bmVyZ3kudGllcnMubWFwKHQgPT4gdC5jb3VudCkpO1xuICAgIGNvbnN0IGNvdW50ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBpbmZvLCBgU3luZXJneUNvdW50XyR7c3luZXJneS5pZH1gKTtcbiAgICBjb3VudC5BZGRDbGFzcygnc3luZXJneV9jb3VudCcpO1xuICAgIGNvdW50LnRleHQgPSBgJHtzeW5lcmd5LmN1cnJlbnRDb3VudH0vJHttYXhDb3VudH1gO1xuICAgIGNvdW50LnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIGNvdW50LnN0eWxlLmNvbG9yID0gaGFzQWN0aXZlRWZmZWN0ID8gJyNmZmM1N2EnIDogJyM5NGEzYjgnO1xuICAgIC8vIOaViOaenOWIl+ihqFxuICAgIGNvbnN0IHRpZXJzQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBzeW5lcmd5SXRlbSwgYFN5bmVyZ3lUaWVyc18ke3N5bmVyZ3kuaWR9YCk7XG4gICAgdGllcnNDb250YWluZXIuQWRkQ2xhc3MoJ3N5bmVyZ3lfdGllcnMnKTtcbiAgICB0aWVyc0NvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aWVyc0NvbnRhaW5lci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgdGllcnNDb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgPSAnNXB4JztcbiAgICAvLyDliJvlu7rmr4/kuKrmlYjmnpzmnaHnm65cbiAgICBzeW5lcmd5LnRpZXJzLmZvckVhY2goKHRpZXIsIGluZGV4KSA9PiB7XG4gICAgICAgIGNyZWF0ZVN5bmVyZ3lUaWVyKHRpZXJzQ29udGFpbmVyLCB0aWVyLCBpbmRleCk7XG4gICAgfSk7XG59XG4vLyDliJvlu7rlt6bkvqfnvoHnu4rpnaLmnb9cbmZ1bmN0aW9uIGNyZWF0ZUxlZnRTeW5lcmd5UGFuZWwocGFyZW50KSB7XG4gICAgJC5Nc2coJ/Cfjq4gQ3JlYXRpbmcgbGVmdCBzeW5lcmd5IHBhbmVsLi4uJyk7XG4gICAgY29uc3QgbGVmdFBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdMZWZ0U3luZXJneVBhbmVsJyk7XG4gICAgbGVmdFBhbmVsLnN0eWxlLndpZHRoID0gJzI4MHB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUubWF4SGVpZ2h0ID0gJzYwMHB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2xlZnQnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLm1hcmdpblRvcCA9ICcxMDBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLm1hcmdpbkxlZnQgPSAnMjBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnBhbmVsQmc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtQTEFZSU5HX0hVRF9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjUpJztcbiAgICBsZWZ0UGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5vdmVyZmxvdyA9ICdzcXVpc2ggc2Nyb2xsJztcbiAgICAvLyDpnaLmnb/moIfpophcbiAgICBjb25zdCB0aXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbGVmdFBhbmVsLCAnU3luZXJneVBhbmVsVGl0bGUnKTtcbiAgICB0aXRsZS5BZGRDbGFzcygnc3luZXJneV9wYW5lbF90aXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn8J+OryDnvoHnu4rmlYjmnpwnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIHRpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdGl0bGUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0QWNjZW50O1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICB0aXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAvLyDliJvlu7rmiYDmnInnvoHnu4rpoblcbiAgICBURU1QTEFURV9TWU5FUkdJRVMuZm9yRWFjaChzeW5lcmd5ID0+IHtcbiAgICAgICAgY3JlYXRlU3luZXJneUl0ZW0obGVmdFBhbmVsLCBzeW5lcmd5KTtcbiAgICB9KTtcbiAgICAkLk1zZyhg8J+OriBTeW5lcmd5IHBhbmVsIGNyZWF0ZWQgd2l0aCAke1RFTVBMQVRFX1NZTkVSR0lFUy5sZW5ndGh9IHN5bmVyZ2llc2ApO1xufVxuLy8g5Yib5bu66aG26YOo5L+h5oGv5qCPXG5mdW5jdGlvbiBjcmVhdGVUb3BJbmZvQmFyKHBhcmVudCkge1xuICAgIGNvbnN0IHRvcEJhciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnVG9wSW5mb0JhcicpO1xuICAgIHRvcEJhci5zdHlsZS53aWR0aCA9ICc3MDBweCc7XG4gICAgdG9wQmFyLnN0eWxlLmhlaWdodCA9ICc2MHB4JztcbiAgICB0b3BCYXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgdG9wQmFyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJztcbiAgICB0b3BCYXIuc3R5bGUubWFyZ2luVG9wID0gJzIwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIHRvcEJhci5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7UExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICB0b3BCYXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnO1xuICAgIHRvcEJhci5zdHlsZS5wYWRkaW5nID0gJzEwcHggMjBweCc7XG4gICAgdG9wQmFyLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjUpJztcbiAgICB0b3BCYXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICAvLyDmuLjmiI/ml7bpl7RcbiAgICBjb25zdCB0aW1lUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ0dhbWVUaW1lUGFuZWwnKTtcbiAgICB0aW1lUGFuZWwuc3R5bGUud2lkdGggPSAnMTUwcHgnO1xuICAgIHRpbWVQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGltZVBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBjb25zdCB0aW1lTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpbWVQYW5lbCwgJ0dhbWVUaW1lTGFiZWwnKTtcbiAgICB0aW1lTGFiZWwudGV4dCA9ICfij7Ag5ri45oiP5pe26Ze0JztcbiAgICB0aW1lTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgdGltZUxhYmVsLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICB0aW1lTGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjcnO1xuICAgIGNvbnN0IHRpbWVWYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGltZVBhbmVsLCAnR2FtZVRpbWVWYWx1ZScpO1xuICAgIHRpbWVWYWx1ZS50ZXh0ID0gJzAwOjAwJztcbiAgICB0aW1lVmFsdWUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGltZVZhbHVlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdGltZVZhbHVlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgLy8g5YiG6ZqU57q/XG4gICAgY29uc3QgZGl2aWRlcjEgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ0RpdmlkZXIxJyk7XG4gICAgZGl2aWRlcjEuc3R5bGUud2lkdGggPSAnMXB4JztcbiAgICBkaXZpZGVyMS5zdHlsZS5oZWlnaHQgPSAnODAlJztcbiAgICBkaXZpZGVyMS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5ib3JkZXJDb2xvcjtcbiAgICBkaXZpZGVyMS5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XG4gICAgZGl2aWRlcjEuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIC8vIOmHkeW4geS/oeaBr1xuICAgIGNvbnN0IGdvbGRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgdG9wQmFyLCAnR29sZFBhbmVsJyk7XG4gICAgZ29sZFBhbmVsLnN0eWxlLndpZHRoID0gJzE1MHB4JztcbiAgICBnb2xkUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIGdvbGRQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3QgZ29sZExhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBnb2xkUGFuZWwsICdHb2xkTGFiZWwnKTtcbiAgICBnb2xkTGFiZWwudGV4dCA9ICfwn5KwIOmHkeW4gSc7XG4gICAgZ29sZExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIGdvbGRMYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgZ29sZExhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC43JztcbiAgICBjb25zdCBnb2xkVmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGdvbGRQYW5lbCwgJ0dvbGRWYWx1ZScpO1xuICAgIGdvbGRWYWx1ZS50ZXh0ID0gJzUwMCc7XG4gICAgZ29sZFZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGdvbGRWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGdvbGRWYWx1ZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLndhcm5pbmc7XG4gICAgLy8g5YiG6ZqU57q/XG4gICAgY29uc3QgZGl2aWRlcjIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHRvcEJhciwgJ0RpdmlkZXIyJyk7XG4gICAgZGl2aWRlcjIuc3R5bGUud2lkdGggPSAnMXB4JztcbiAgICBkaXZpZGVyMi5zdHlsZS5oZWlnaHQgPSAnODAlJztcbiAgICBkaXZpZGVyMi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5ib3JkZXJDb2xvcjtcbiAgICBkaXZpZGVyMi5zdHlsZS5vcGFjaXR5ID0gJzAuMyc7XG4gICAgZGl2aWRlcjIuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIC8vIOWHu+adgOS/oeaBr1xuICAgIGNvbnN0IGtpbGxQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgdG9wQmFyLCAnS2lsbFBhbmVsJyk7XG4gICAga2lsbFBhbmVsLnN0eWxlLndpZHRoID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIGtpbGxQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAga2lsbFBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBjb25zdCBraWxsTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGtpbGxQYW5lbCwgJ0tpbGxMYWJlbCcpO1xuICAgIGtpbGxMYWJlbC50ZXh0ID0gJ+KalO+4jyDlh7vmnYAv5q275LqhL+WKqeaUuyc7XG4gICAga2lsbExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIGtpbGxMYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAga2lsbExhYmVsLnN0eWxlLm9wYWNpdHkgPSAnMC43JztcbiAgICBjb25zdCBraWxsVmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGtpbGxQYW5lbCwgJ0tpbGxWYWx1ZScpO1xuICAgIGtpbGxWYWx1ZS50ZXh0ID0gJzAgLyAwIC8gMCc7XG4gICAga2lsbFZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIGtpbGxWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGtpbGxWYWx1ZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRBY2NlbnQ7XG59XG4vLyDml6fnmoToi7Hpm4Tkv6Hmga/pnaLmnb/lh73mlbDlt7LliKDpmaTvvIzmm7/mjaLkuLrnvoHnu4rpnaLmnb9cbi8vIOWIm+W7uuWPs+S+p+aImOaWl+S/oeaBr+mdouadv1xuZnVuY3Rpb24gY3JlYXRlUmlnaHRCYXR0bGVQYW5lbChwYXJlbnQpIHtcbiAgICBjb25zdCByaWdodFBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdSaWdodEJhdHRsZVBhbmVsJyk7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS53aWR0aCA9ICcyODBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5oZWlnaHQgPSAnNDAwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICByaWdodFBhbmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJztcbiAgICByaWdodFBhbmVsLnN0eWxlLm1hcmdpblRvcCA9ICcxMDBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5tYXJnaW5SaWdodCA9ICcyMHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnBhbmVsQmc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7UExBWUlOR19IVURfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICByaWdodFBhbmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g6Z2i5p2/5qCH6aKYXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHJpZ2h0UGFuZWwsICdCYXR0bGVQYW5lbFRpdGxlJyk7XG4gICAgdGl0bGUudGV4dCA9ICfimpTvuI8g5oiY5paX5L+h5oGvJztcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbiAgICB0aXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgLy8g5Lyk5a6z57uf6K6hXG4gICAgY3JlYXRlRGFtYWdlU3RhdHMocmlnaHRQYW5lbCk7XG4gICAgLy8g5oiY5paX6K6w5b2VXG4gICAgY3JlYXRlQmF0dGxlTG9nKHJpZ2h0UGFuZWwpO1xufVxuLy8g5Yib5bu65Lyk5a6z57uf6K6hXG5mdW5jdGlvbiBjcmVhdGVEYW1hZ2VTdGF0cyhwYXJlbnQpIHtcbiAgICBjb25zdCBzdGF0c1NlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0RhbWFnZVN0YXRzU2VjdGlvbicpO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzE1MHB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgY29uc3Qgc3RhdHNUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdHNTZWN0aW9uLCAnU3RhdHNUaXRsZScpO1xuICAgIHN0YXRzVGl0bGUudGV4dCA9ICfwn5OKIOS8pOWus+e7n+iuoSc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgY29uc3Qgc3RhdHMgPSBbXG4gICAgICAgIHsgaWQ6ICdkYW1hZ2VfZGVhbHQnLCBsYWJlbDogJ+mAoOaIkOS8pOWuszonLCB2YWx1ZTogJzAnIH0sXG4gICAgICAgIHsgaWQ6ICdkYW1hZ2VfdGFrZW4nLCBsYWJlbDogJ+WPl+WIsOS8pOWuszonLCB2YWx1ZTogJzAnIH0sXG4gICAgICAgIHsgaWQ6ICdoZWFsaW5nJywgbGFiZWw6ICfmsrvnlpfph486JywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGlkOiAnZHBzJywgbGFiZWw6ICdEUFM6JywgdmFsdWU6ICcwJyB9LFxuICAgIF07XG4gICAgc3RhdHMuZm9yRWFjaCgoc3RhdCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdFJvdyA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgc3RhdHNTZWN0aW9uLCBgU3RhdFJvd18ke3N0YXQuaWR9YCk7XG4gICAgICAgIHN0YXRSb3cuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIHN0YXRSb3cuc3R5bGUuaGVpZ2h0ID0gJzI1cHgnO1xuICAgICAgICBzdGF0Um93LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgICAgICBzdGF0Um93LnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBzdGF0Um93LCBgJHtzdGF0LmlkfV9MYWJlbGApO1xuICAgICAgICBsYWJlbC50ZXh0ID0gc3RhdC5sYWJlbDtcbiAgICAgICAgbGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICAgICAgbGFiZWwuc3R5bGUud2lkdGggPSAnMTAwcHgnO1xuICAgICAgICBjb25zdCB2YWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdFJvdywgYCR7c3RhdC5pZH1fVmFsdWVgKTtcbiAgICAgICAgdmFsdWUudGV4dCA9IHN0YXQudmFsdWU7XG4gICAgICAgIHZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICB2YWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgICAgICB2YWx1ZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgICAgICB2YWx1ZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgICAgICB2YWx1ZS5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICB9KTtcbn1cbi8vIOWIm+W7uuaImOaWl+iusOW9lVxuZnVuY3Rpb24gY3JlYXRlQmF0dGxlTG9nKHBhcmVudCkge1xuICAgIGNvbnN0IGxvZ1NlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0JhdHRsZUxvZ1NlY3Rpb24nKTtcbiAgICBsb2dTZWN0aW9uLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC4zKSc7XG4gICAgbG9nU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgbG9nU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzEwcHgnO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUub3ZlcmZsb3cgPSAnc3F1aXNoIHNjcm9sbCc7XG4gICAgY29uc3QgbG9nVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxvZ1NlY3Rpb24sICdMb2dUaXRsZScpO1xuICAgIGxvZ1RpdGxlLnRleHQgPSAn8J+TnSDmiJjmlpforrDlvZUnO1xuICAgIGxvZ1RpdGxlLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIGxvZ1RpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgbG9nVGl0bGUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGxvZ1RpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICBjb25zdCBsb2dDb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGxvZ1NlY3Rpb24sICdMb2dDb250YWluZXInKTtcbiAgICBsb2dDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbG9nQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBsb2dDb250YWluZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xufVxuLy8g5Yib5bu65bqV6YOo5b+r5o235qCPXG5mdW5jdGlvbiBjcmVhdGVCb3R0b21RdWlja0JhcihwYXJlbnQpIHtcbiAgICBjb25zdCBib3R0b21CYXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0JvdHRvbVF1aWNrQmFyJyk7XG4gICAgY29uc3QgcXVpY2tBY3Rpb25zID0gW1xuICAgICAgICB7IGlkOiAnaW52ZW50b3J5JywgbmFtZTogJ+iDjOWMhScgfSxcbiAgICAgICAgeyBpZDogJ3NraWxscycsIG5hbWU6ICfmioDog70nIH0sXG4gICAgICAgIHsgaWQ6ICdzdGFnZV9zZWxlY3QnLCBuYW1lOiAn6YCJ5YWzJyB9LFxuICAgICAgICB7IGlkOiAndGVzdF9raWxsJywgbmFtZTogJ+a1i+ivlee7k+eulycgfSxcbiAgICBdO1xuICAgIHF1aWNrQWN0aW9ucy5mb3JFYWNoKChhY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGJ0biA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIGJvdHRvbUJhciwgYFF1aWNrQWN0aW9uXyR7YWN0aW9uLmlkfWApO1xuICAgICAgICBidG4uQWRkQ2xhc3MoJ3F1aWNrX2FjdGlvbl9idG4nKTtcbiAgICAgICAgYnRuLnN0eWxlLndpZHRoID0gJzExMHB4JztcbiAgICAgICAgYnRuLnN0eWxlLmhlaWdodCA9ICc2MHB4JztcbiAgICAgICAgYnRuLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICAgICAgLy8g5Yib5bu65LiA5Liq5Y2V54us55qEIExhYmVsIOaYvuekuuaJgOacieWGheWuuVxuICAgICAgICBjb25zdCBjb250ZW50TGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGJ0biwgYCR7YWN0aW9uLmlkfV9jb250ZW50YCk7XG4gICAgICAgIGNvbnRlbnRMYWJlbC50ZXh0ID0gYWN0aW9uLm5hbWU7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICAgICAgY29udGVudExhYmVsLmhpdHRlc3QgPSBmYWxzZTsgLy8g6YeN6KaB77ya5LiN5oum5oiq54K55Ye7XG4gICAgICAgIC8vIOe7keWumueCueWHu+S6i+S7tlxuICAgICAgICBidG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0g4pyF4pyF4pyFIENMSUNLRUQ6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuICAgICAgICAgICAgLy8g54m55q6K5aSE55CG77ya6YCJ5YWz5oyJ6ZKuIC0g6YCa6L+H5LqL5Lu26Kem5Y+R77yI5LiN5ZCMVUnnu4Tku7bmnInni6znq4vnmoRKU+S4iuS4i+aWh++8jOaXoOazleWFseS6q2dsb2JhbFRoaXPvvIlcbiAgICAgICAgICAgIGlmIChhY3Rpb24uaWQgPT09ICdzdGFnZV9zZWxlY3QnKSB7XG4gICAgICAgICAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSBPcGVuaW5nIFN0YWdlU2VsZWN0IHZpYSBldmVudC4uLicpO1xuICAgICAgICAgICAgICAgIC8vIOWPkemAgeS6i+S7tuWIsOacjeWKoeerr++8jOacjeWKoeerr+S8muW5v+aSree7meaJgOacieWuouaIt+err1xuICAgICAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdvcGVuX2xldmVsX3NlbGVjdGlvbicsIHt9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDnibnmrorlpITnkIbvvJrog4zljIXmjInpkq4gLSDliIfmjaLmmL7npLov6ZqQ6JePXG4gICAgICAgICAgICBpZiAoYWN0aW9uLmlkID09PSAnaW52ZW50b3J5Jykge1xuICAgICAgICAgICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0gVG9nZ2xpbmcgaW52ZW50b3J5Li4uJyk7XG4gICAgICAgICAgICAgICAgLy8g6YCa6L+H5pyN5Yqh56uv6L2s5Y+R5LqL5Lu277yI5YOP6YCJ5YWz5oyJ6ZKu5LiA5qC377yJXG4gICAgICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3RvZ2dsZV9pbnZlbnRvcnlfcmVxdWVzdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySWQ6IFBsYXllcnMuR2V0TG9jYWxQbGF5ZXIoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOWFtuS7luaMiemSrumAmui/h+acjeWKoeWZqOS6i+S7tuWkhOeQhlxuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3F1aWNrX2FjdGlvbicsIHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IGFjdGlvbi5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDmt7vliqDpvKDmoIfmgqzlgZzmlYjmnpxcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDwn5GGIE1vdXNlIG92ZXI6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkLk1zZyhg8J+OriBDcmVhdGVkIGJ1dHRvbjogJHthY3Rpb24ubmFtZX1gKTtcbiAgICB9KTtcbiAgICAkLk1zZyhg8J+OriBCb3R0b20gcXVpY2sgYmFyIGNyZWF0ZWQgd2l0aCAke3F1aWNrQWN0aW9ucy5sZW5ndGh9IGJ1dHRvbnNgKTtcbn1cbi8vIOa3u+WKoOaImOaWl+iusOW9lVxuZnVuY3Rpb24gYWRkQmF0dGxlTG9nKG1lc3NhZ2UsIHR5cGUgPSAnaW5mbycpIHtcbiAgICBjb25zdCBsb2dDb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnTG9nQ29udGFpbmVyJyk7XG4gICAgaWYgKCFsb2dDb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBsb2dFbnRyeSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbG9nQ29udGFpbmVyLCBgTG9nRW50cnlfJHtEYXRlLm5vdygpfWApO1xuICAgIGxvZ0VudHJ5LnRleHQgPSBtZXNzYWdlO1xuICAgIGxvZ0VudHJ5LnN0eWxlLmZvbnRTaXplID0gJzExcHgnO1xuICAgIGxvZ0VudHJ5LnN0eWxlLmNvbG9yID0gdHlwZSA9PT0gJ2tpbGwnID8gUExBWUlOR19IVURfVEhFTUUuc3VjY2VzcyA6XG4gICAgICAgIHR5cGUgPT09ICdkZWF0aCcgPyBQTEFZSU5HX0hVRF9USEVNRS5kYW5nZXIgOlxuICAgICAgICAgICAgUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBsb2dFbnRyeS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMnB4JztcbiAgICAvLyDpmZDliLbml6Xlv5fmlbDph49cbiAgICBjb25zdCBjaGlsZHJlbiA9IGxvZ0NvbnRhaW5lci5DaGlsZHJlbigpO1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAxMCkge1xuICAgICAgICBjaGlsZHJlblswXS5EZWxldGVBc3luYygwKTtcbiAgICB9XG59XG4vLyDnm5HlkKzmuLjmiI/kuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdwbGF5ZXJfc3RhdHNfdXBkYXRlJywgKGRhdGEpID0+IHtcbiAgICAvLyDmm7TmlrDnu5/orqHmlbDmja5cbiAgICBpZiAoZGF0YS5nb2xkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZ29sZFZhbHVlID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0dvbGRWYWx1ZScpO1xuICAgICAgICBpZiAoZ29sZFZhbHVlKVxuICAgICAgICAgICAgZ29sZFZhbHVlLnRleHQgPSBkYXRhLmdvbGQudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKGRhdGEua2lsbHMgIT09IHVuZGVmaW5lZCB8fCBkYXRhLmRlYXRocyAhPT0gdW5kZWZpbmVkIHx8IGRhdGEuYXNzaXN0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGtpbGxWYWx1ZSA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdLaWxsVmFsdWUnKTtcbiAgICAgICAgaWYgKGtpbGxWYWx1ZSkge1xuICAgICAgICAgICAga2lsbFZhbHVlLnRleHQgPSBgJHtkYXRhLmtpbGxzIHx8IDB9IC8gJHtkYXRhLmRlYXRocyB8fCAwfSAvICR7ZGF0YS5hc3Npc3RzIHx8IDB9YDtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2hlcm9fc3RhdHNfdXBkYXRlJywgKGRhdGEpID0+IHtcbiAgICBpZiAoZGF0YS5oZWFsdGggIT09IHVuZGVmaW5lZCAmJiBkYXRhLm1heEhlYWx0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHVwZGF0ZUhlYWx0aEJhcihkYXRhLmhlYWx0aCwgZGF0YS5tYXhIZWFsdGgpO1xuICAgIH1cbiAgICBpZiAoZGF0YS5tYW5hICE9PSB1bmRlZmluZWQgJiYgZGF0YS5tYXhNYW5hICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXBkYXRlTWFuYUJhcihkYXRhLm1hbmEsIGRhdGEubWF4TWFuYSk7XG4gICAgfVxufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnYmF0dGxlX2xvZycsIChkYXRhKSA9PiB7XG4gICAgYWRkQmF0dGxlTG9nKGRhdGEubWVzc2FnZSwgZGF0YS50eXBlKTtcbn0pO1xuLy8g8J+UkSDnm5HlkKzmiJjmlpfnu5PmnZ/kuovku7bvvIznoa7kv53ljp/nlJ9VSeS/neaMgemakOiXj1xuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2JhdHRsZV9lbmRlZCcsIChkYXRhKSA9PiB7XG4gICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSBCYXR0bGUgZW5kZWQgLSBlbnN1cmluZyBuYXRpdmUgVUkgc3RheXMgaGlkZGVuJyk7XG4gICAgaGlkZU5hdGl2ZVVJKCk7XG4gICAgaGlkZU1pbmltYXBFbGVtZW50cygpO1xufSk7XG4vLyDwn5SRIOebkeWQrOiHqui1sOaji+mYtuauteWPmOWMluS6i+S7tu+8jOehruS/neWOn+eUn1VJ5L+d5oyB6ZqQ6JePXG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3BoYXNlX3N0YXJ0ZWQnLCAoZGF0YSkgPT4ge1xuICAgICQuTXNnKGBbUGxheWluZ0hVRF0gUGhhc2UgY2hhbmdlZCB0byAke2RhdGEucGhhc2V9IC0gZW5zdXJpbmcgbmF0aXZlIFVJIHN0YXlzIGhpZGRlbmApO1xuICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgIGhpZGVNaW5pbWFwRWxlbWVudHMoKTtcbiAgICAvLyDwn5SRIOWmguaenOaYr+aImOaWl+mYtuaute+8jOaYvuekunBsYXlpbmctaHVkXG4gICAgaWYgKGRhdGEucGhhc2UgPT09ICdiYXR0bGUnKSB7XG4gICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0gQmF0dGxlIHBoYXNlIHN0YXJ0ZWQgLSBzaG93aW5nIHBsYXlpbmcgSFVEJyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgICAgIGhpZGVOYXRpdmVVSSgpO1xuICAgICAgICBoaWRlTWluaW1hcEVsZW1lbnRzKCk7XG4gICAgfVxufSk7XG4vLyDwn5SRIOebkeWQrOaYvuekunBsYXlpbmctaHVk5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnc2hvd19wbGF5aW5nX2h1ZCcsICgpID0+IHtcbiAgICAkLk1zZygnW1BsYXlpbmdIVURdIFNob3cgcGxheWluZyBIVUQgZXZlbnQgcmVjZWl2ZWQnKTtcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgIGNyZWF0ZVBsYXlpbmdIVUQoKTtcbiAgICB9XG4gICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgaGlkZU5hdGl2ZVVJKCk7XG4gICAgaGlkZU1pbmltYXBFbGVtZW50cygpO1xufSk7XG4vLyDmmL7npLov6ZqQ6JeP5oiY5paXSFVEXG5mdW5jdGlvbiBzaG93UGxheWluZ0hVRChzaG93KSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1BsYXlpbmdIVURDb250YWluZXInKTtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gc2hvdyA/ICd2aXNpYmxlJyA6ICdjb2xsYXBzZSc7XG4gICAgICAgICQuTXNnKGBQbGF5aW5nIEhVRCAke3Nob3cgPyAnc2hvd24nIDogJ2hpZGRlbid9YCk7XG4gICAgfVxufVxuLy8g5qOA5p+l5ri45oiP54q25oCB5bm25Yaz5a6a5piv5ZCm5pi+56S6SFVEXG5mdW5jdGlvbiBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKSB7XG4gICAgLy8g5qOA5p+l5ri45oiP5qih5byP77yI55So5LqO6LCD6K+V77yJXG4gICAgbGV0IGN1cnJlbnRNb2RlID0gJ25vcm1hbCc7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZ2FtZU1vZGVEYXRhID0gQ3VzdG9tTmV0VGFibGVzLkdldFRhYmxlVmFsdWUoJ2dhbWVfbW9kZScsICdjdXJyZW50Jyk7XG4gICAgICAgIGlmIChnYW1lTW9kZURhdGEgJiYgZ2FtZU1vZGVEYXRhLm1vZGUpIHtcbiAgICAgICAgICAgIGN1cnJlbnRNb2RlID0gZ2FtZU1vZGVEYXRhLm1vZGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coJ0Vycm9yIHJlYWRpbmcgZ2FtZSBtb2RlIGZyb20gTmV0VGFibGU6JywgZSk7XG4gICAgfVxuICAgICQuTXNnKGBDdXJyZW50IGdhbWUgbW9kZTogJHtjdXJyZW50TW9kZX1gKTtcbiAgICAvLyDmo4Dmn6XmmK/lkKblnKjmuLjmiI/ov5vooYzkuK1cbiAgICBjb25zdCBnYW1lU3RhdGUgPSBHYW1lLkdldFN0YXRlKCk7XG4gICAgJC5Nc2coYEN1cnJlbnQgZ2FtZSBzdGF0ZTogJHtnYW1lU3RhdGV9YCk7XG4gICAgLy8g5qC55o2u5a6e6ZmF55qE5ri45oiP54q25oCB5bi46YeP77yaXG4gICAgLy8gRE9UQV9HQU1FUlVMRVNfU1RBVEVfUFJFX0dBTUUgPSA4XG4gICAgLy8gRE9UQV9HQU1FUlVMRVNfU1RBVEVfR0FNRV9JTl9QUk9HUkVTUyA9IDEwXG4gICAgLy8g5Zyo6Ieq6LWw5qOL5qih5byP5LiL77yM5Y+v6IO95ri45oiP54q25oCB5LiN5ZCM77yM5omA5Lul5pS+5a695p2h5Lu25oiW55u05o6l5pi+56S6XG4gICAgbGV0IHNob3VsZFNob3cgPSBnYW1lU3RhdGUgPj0gOCAmJiBnYW1lU3RhdGUgPD0gMTA7XG4gICAgLy8g5aaC5p6c5piv6Ieq6LWw5qOL5qih5byP77yM5Y2z5L2/5ri45oiP54q25oCB5LiN56ym5ZCI77yM5Lmf5bCd6K+V5pi+56S677yI5Zug5Li66Ieq6LWw5qOL5Y+v6IO95pyJ5LiN5ZCM55qE54q25oCB5YC877yJXG4gICAgaWYgKGN1cnJlbnRNb2RlID09PSAnYXV0b2NoZXNzJykge1xuICAgICAgICAkLk1zZygnQXV0b0NoZXNzIG1vZGUgZGV0ZWN0ZWQgLSBmb3JjaW5nIEhVRCBkaXNwbGF5Jyk7XG4gICAgICAgIC8vIOWcqOiHqui1sOaji+aooeW8j+S4i++8jOWPquimgeS4jeaYr+WIneWni+WMlumYtuauteWwseaYvuekulxuICAgICAgICBzaG91bGRTaG93ID0gZ2FtZVN0YXRlID49IDE7IC8vIOabtOWuveadvueahOadoeS7tlxuICAgIH1cbiAgICAkLk1zZyhgU2hvdWxkIHNob3cgUGxheWluZyBIVUQ6ICR7c2hvdWxkU2hvd30gKG1vZGU6ICR7Y3VycmVudE1vZGV9LCBzdGF0ZTogJHtnYW1lU3RhdGV9KWApO1xuICAgIHNob3dQbGF5aW5nSFVEKHNob3VsZFNob3cpO1xufVxuLy8g6ZqQ6JeP5Y6f55SfIERvdGEgMiBVSSDlhYPntKBcbmZ1bmN0aW9uIGhpZGVOYXRpdmVVSSgpIHtcbiAgICAkLk1zZygn8J+OriBIaWRpbmcgbmF0aXZlIERvdGEgMiBVSSBlbGVtZW50cy4uLicpO1xuICAgIHRyeSB7XG4gICAgICAgIC8vIOmakOiXj+WOn+eUnyBIVUQg5YWD57SgXG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX1RPUF9USU1FT0ZEQVksIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfVE9QX0hFUk9FUywgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9GTFlPVVRfU0NPUkVCT0FSRCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9BQ1RJT05fUEFORUwsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfQUNUSU9OX01JTklNQVAsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1BBTkVMLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9TSE9QLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9JVEVNUywgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUVVJQ0tCVVksIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX0NPVVJJRVIsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1BST1RFQ1QsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX0dPTEQsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfU0hPUF9TVUdHRVNURURJVEVNUywgZmFsc2UpO1xuICAgICAgICAvLyDwn5SRIOWQjOaXtumakOiXj+Wwj+WcsOWbvuWFg+e0oFxuICAgICAgICBoaWRlTWluaW1hcEVsZW1lbnRzKCk7XG4gICAgICAgICQuTXNnKCfinIUgTmF0aXZlIFVJIGVsZW1lbnRzIGhpZGRlbiBzdWNjZXNzZnVsbHknKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBFcnJvciBoaWRpbmcgbmF0aXZlIFVJOicsIGUpO1xuICAgIH1cbn1cbi8vIPCflJEg6ZqQ6JeP5bCP5Zyw5Zu+5YWD57SgXG5mdW5jdGlvbiBoaWRlTWluaW1hcEVsZW1lbnRzKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgICAgIGNvbnN0IG1pbmltYXBJZHMgPSBbJ21pbmltYXAnLCAnTWluaW1hcENvbnRhaW5lcicsICdtaW5pbWFwX2NvbnRhaW5lcicsICdNaW5pbWFwQnV0dG9uJ107XG4gICAgICAgIG1pbmltYXBJZHMuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYW5lbCA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRUcmF2ZXJzZShpZCk7XG4gICAgICAgICAgICBpZiAocGFuZWwpIHtcbiAgICAgICAgICAgICAgICBwYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgICAgICAgICAkLk1zZyhgW1BsYXlpbmdIVURdIEhpZGRlbiBtaW5pbWFwIGVsZW1lbnQ6ICR7aWR9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAkLk1zZygn4p2MIEVycm9yIGhpZGluZyBtaW5pbWFwIGVsZW1lbnRzOicsIGUpO1xuICAgIH1cbn1cbi8vIPCflJEg5bey5Yig6Zmkc2hvd05hdGl2ZVVJ5Ye95pWwIC0g5LiN5YaN6ZyA6KaB5oGi5aSN5Y6f55SfVUlcbi8vIOWIneWni+WMllxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBsYXlpbmdIVUQoKSB7XG4gICAgJC5Nc2coJ/Cfjq4gUGxheWluZyBIVUQgaW5pdGlhbGl6aW5nLi4uJyk7XG4gICAgLy8g8J+UkSDnq4vljbPliJvlu7pIVUTlubbpmpDol4/ljp/nlJ9VSVxuICAgIGNyZWF0ZVBsYXlpbmdIVUQoKTtcbiAgICBoaWRlTmF0aXZlVUkoKTtcbiAgICBoaWRlTWluaW1hcEVsZW1lbnRzKCk7XG4gICAgLy8g8J+UkSDliJ3lp4vnirbmgIHpmpDol4/vvIznrYnlvoXmiJjmlpfpmLbmrrXmmL7npLpcbiAgICBzaG93UGxheWluZ0hVRCh0cnVlKTtcbiAgICAkLk1zZygn8J+OriBQbGF5aW5nIEhVRCBpbml0aWFsaXplZCcpO1xufVxuLy8g8J+UkSDmmoLml7bnpoHnlKjmiYDmnInoh6rliqjmmL7npLpIVUTnmoTkuovku7bnm5HlkKzlmahcbi8vIOebkeWQrOa4uOaIj+eKtuaAgeWPmOWMluS6i+S7tlxuLy8gR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfc3RhdGVfY2hhbmdlZCcsIChkYXRhOiBhbnkpID0+IHtcbi8vICAgICAkLk1zZygnR2FtZSBzdGF0ZSBjaGFuZ2VkOicsIGRhdGEpO1xuLy8gICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuLy8gfSk7XG4vLyDnm5HlkKzmuLjmiI/mqKHlvI/lj5jljJbkuovku7Zcbi8vIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX21vZGVfY2hhbmdlZCcsIChkYXRhOiBhbnkpID0+IHtcbi8vICAgICAkLk1zZygnR2FtZSBtb2RlIGNoYW5nZWQ6JywgZGF0YSk7XG4vLyAgICAgaWYgKGRhdGEgJiYgZGF0YS5uZXdNb2RlKSB7XG4vLyAgICAgICAgICQuTXNnKGBOZXcgZ2FtZSBtb2RlOiAke2RhdGEubmV3TW9kZX1gKTtcbi8vICAgICAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4vLyAgICAgfVxuLy8gfSk7XG4vLyDnm5HlkKznvZHnu5zooajkuK3nmoTmuLjmiI/mqKHlvI/lj5jljJZcbi8vIEN1c3RvbU5ldFRhYmxlcy5TdWJzY3JpYmVOZXRUYWJsZUxpc3RlbmVyKCdnYW1lX21vZGUnLCAodGFibGVOYW1lOiBzdHJpbmcsIGtleTogc3RyaW5nLCBkYXRhOiBhbnkpID0+IHtcbi8vICAgICBpZiAoa2V5ID09PSAnY3VycmVudCcpIHtcbi8vICAgICAgICAgJC5Nc2coJ0dhbWUgbW9kZSB1cGRhdGVkIGluIE5ldFRhYmxlOicsIGRhdGEpO1xuLy8gICAgICAgICBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKTtcbi8vICAgICB9XG4vLyB9KTtcbi8vIOebkeWQrOa4uOaIj+W8gOWni+S6i+S7tlxuLy8gR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfc3RhcnQnLCAoKSA9PiB7XG4vLyAgICAgJC5Nc2coJ0dhbWUgc3RhcnRlZCAtIHNob3dpbmcgcGxheWluZyBIVUQnKTtcbi8vICAgICBzaG93UGxheWluZ0hVRCh0cnVlKTtcbi8vIH0pO1xuLy8g55uR5ZCs5ri45oiP57uT5p2f5LqL5Lu2XG4vLyBHYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9lbmQnLCAoKSA9PiB7XG4vLyAgICAgJC5Nc2coJ0dhbWUgZW5kZWQgLSBoaWRpbmcgcGxheWluZyBIVUQnKTtcbi8vICAgICBzaG93UGxheWluZ0hVRChmYWxzZSk7XG4vLyB9KTtcbi8vIOWumuacn+ajgOafpea4uOaIj+eKtuaAge+8iOWkh+eUqOaWueahiO+8iVxuZnVuY3Rpb24gc3RhcnRHYW1lU3RhdGVNb25pdG9yKCkge1xuICAgIC8vIPCflJEg5pqC5pe256aB55So6Ieq5Yqo55uR5o6nXG4gICAgLy8gY29uc3QgY2hlY2tJbnRlcnZhbCA9ICgpID0+IHtcbiAgICAvLyAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4gICAgLy8gICAgICQuU2NoZWR1bGUoMi4wLCBjaGVja0ludGVydmFsKTsgLy8g5q+PMuenkuajgOafpeS4gOasoVxuICAgIC8vIH07XG4gICAgLy8gJC5TY2hlZHVsZSg1LjAsIGNoZWNrSW50ZXJ2YWwpOyAvLyA156eS5ZCO5byA5aeL55uR5o6nXG4gICAgJC5Nc2coJ/Cfjq4gR2FtZSBzdGF0ZSBtb25pdG9yIGRpc2FibGVkJyk7XG59XG4vLyDlr7zlh7rlhajlsYDlh73mlbBcbmdsb2JhbFRoaXMuUGxheWluZ0hVRCA9IHtcbiAgICBjcmVhdGU6IGNyZWF0ZVBsYXlpbmdIVUQsXG4gICAgc2hvdzogc2hvd1BsYXlpbmdIVUQsXG4gICAgY2hlY2tTdGF0ZTogY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVELFxuICAgIGFkZExvZzogYWRkQmF0dGxlTG9nLFxuICAgIGhpZGVOYXRpdmVVSTogaGlkZU5hdGl2ZVVJLFxuICAgIC8vIPCflJEg5bey5Yig6Zmkc2hvd05hdGl2ZVVJIC0g5LiN5YaN6ZyA6KaB5oGi5aSN5Y6f55SfVUlcbiAgICAvLyDpooTnlZnnvoHnu4rmm7TmlrDmjqXlj6NcbiAgICB1cGRhdGVTeW5lcmd5OiAoc3luZXJneURhdGEpID0+IHtcbiAgICAgICAgJC5Nc2coJ1N5bmVyZ3kgdXBkYXRlIHJlY2VpdmVkOicsIHN5bmVyZ3lEYXRhKTtcbiAgICAgICAgLy8gVE9ETzog5a6e546w576B57uK5pWw5o2u5pu05paw6YC76L6RXG4gICAgfVxufTtcbi8vIPCflJEg56uL5Y2z5Yid5aeL5YyWXG5pbml0aWFsaXplUGxheWluZ0hVRCgpO1xuLy8g8J+UkSDmmoLml7bnpoHnlKjoh6rliqjnm5Hmjqdcbi8vIHN0YXJ0R2FtZVN0YXRlTW9uaXRvcigpO1xuJC5Nc2coJ/Cfjq4gUGxheWluZyBIVUQgc2NyaXB0IGxvYWRlZCcpO1xuLy8g5re75Yqg5YWo5bGA5rWL6K+V5Ye95pWwXG5nbG9iYWxUaGlzLlRlc3RQbGF5aW5nSFVEID0ge1xuICAgIHNob3c6ICgpID0+IHNob3dQbGF5aW5nSFVEKHRydWUpLFxuICAgIGhpZGU6ICgpID0+IHNob3dQbGF5aW5nSFVEKGZhbHNlKSxcbiAgICBjaGVja1N0YXRlOiBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQsXG4gICAgaGlkZU5hdGl2ZTogaGlkZU5hdGl2ZVVJLFxuICAgIC8vIPCflJEg5bey5Yig6Zmkc2hvd05hdGl2ZSAtIOS4jeWGjemcgOimgeaBouWkjeWOn+eUn1VJXG4gICAgZm9yY2VTaG93OiAoKSA9PiB7XG4gICAgICAgICQuTXNnKCdGb3JjZSBzaG93aW5nIFBsYXlpbmcgSFVEIGZvciB0ZXN0aW5nLi4uJyk7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdQbGF5aW5nSFVEQ29udGFpbmVyJyk7XG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG4gICAgfSxcbiAgICB0ZXN0QmF0dGxlRW5kVmljdG9yeTogKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIFRlc3RpbmcgYmF0dGxlIGVuZCB2aWV3IC0gVmljdG9yeSAoZGlyZWN0IGNhbGwpJyk7XG4gICAgICAgIGlmIChnbG9iYWxUaGlzLkJhdHRsZUVuZFZpZXcpIHtcbiAgICAgICAgICAgIGdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldy5zaG93VmljdG9yeSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgJC5Nc2coJ1tQbGF5aW5nSFVEXSDinYwgQmF0dGxlRW5kVmlldyBub3QgbG9hZGVkIHlldCEnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdGVzdEJhdHRsZUVuZERlZmVhdDogKCkgPT4ge1xuICAgICAgICAkLk1zZygnW1BsYXlpbmdIVURdIFRlc3RpbmcgYmF0dGxlIGVuZCB2aWV3IC0gRGVmZWF0IChkaXJlY3QgY2FsbCknKTtcbiAgICAgICAgaWYgKGdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldykge1xuICAgICAgICAgICAgZ2xvYmFsVGhpcy5CYXR0bGVFbmRWaWV3LnNob3dEZWZlYXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICQuTXNnKCdbUGxheWluZ0hVRF0g4p2MIEJhdHRsZUVuZFZpZXcgbm90IGxvYWRlZCB5ZXQhJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9