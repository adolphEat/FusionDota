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
    // 创建左侧英雄信息面板
    createLeftHeroPanel(container);
    // 创建右侧战斗信息面板
    createRightBattlePanel(container);
    // 创建底部快捷栏
    createBottomQuickBar(container);
    // 创建中央提示信息
    createCenterAlert(container);
    $.Msg('Playing HUD created successfully!');
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
// 创建左侧英雄信息面板
function createLeftHeroPanel(parent) {
    const leftPanel = $.CreatePanel('Panel', parent, 'LeftHeroPanel');
    leftPanel.style.width = '280px';
    leftPanel.style.height = '400px';
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
    // 面板标题
    const title = $.CreatePanel('Label', leftPanel, 'HeroPanelTitle');
    title.text = '👤 英雄信息';
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.color = PLAYING_HUD_THEME.textAccent;
    title.style.marginBottom = '15px';
    // 英雄头像
    const heroAvatar = $.CreatePanel('Panel', leftPanel, 'HeroAvatar');
    heroAvatar.style.width = '100px';
    heroAvatar.style.height = '100px';
    heroAvatar.style.horizontalAlign = 'center';
    heroAvatar.style.backgroundColor = PLAYING_HUD_THEME.borderColor;
    heroAvatar.style.borderRadius = '10px';
    heroAvatar.style.marginBottom = '15px';
    // 英雄名称
    const heroName = $.CreatePanel('Label', leftPanel, 'HeroName');
    heroName.text = '未知英雄';
    heroName.style.fontSize = '18px';
    heroName.style.fontWeight = 'bold';
    heroName.style.color = PLAYING_HUD_THEME.textPrimary;
    heroName.style.textAlign = 'center';
    heroName.style.horizontalAlign = 'center';
    heroName.style.marginBottom = '20px';
    // 等级和经验
    const levelPanel = $.CreatePanel('Panel', leftPanel, 'LevelPanel');
    levelPanel.style.width = '100%';
    levelPanel.style.height = '40px';
    levelPanel.style.marginBottom = '10px';
    const levelLabel = $.CreatePanel('Label', levelPanel, 'LevelLabel');
    levelLabel.text = '⭐ 等级:';
    levelLabel.style.fontSize = '14px';
    levelLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    levelLabel.style.width = '80px';
    const levelValue = $.CreatePanel('Label', levelPanel, 'LevelValue');
    levelValue.text = '1';
    levelValue.style.fontSize = '16px';
    levelValue.style.fontWeight = 'bold';
    levelValue.style.color = PLAYING_HUD_THEME.textAccent;
    levelValue.style.horizontalAlign = 'right';
    levelValue.style.width = 'fill-parent-flow(1)';
    // 生命值条
    createHealthBar(leftPanel);
    // 魔法值条
    createManaBar(leftPanel);
    // 属性显示
    createAttributeDisplay(leftPanel);
}
// 创建生命值条
function createHealthBar(parent) {
    const healthContainer = $.CreatePanel('Panel', parent, 'HealthContainer');
    healthContainer.style.width = '100%';
    healthContainer.style.height = '30px';
    healthContainer.style.marginBottom = '10px';
    healthContainer.style.flowChildren = 'right';
    const healthLabel = $.CreatePanel('Label', healthContainer, 'HealthLabel');
    healthLabel.text = '❤️ 生命值:';
    healthLabel.style.fontSize = '12px';
    healthLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    healthLabel.style.width = '80px';
    healthLabel.style.verticalAlign = 'center';
    const healthBarContainer = $.CreatePanel('Panel', healthContainer, 'HealthBarContainer');
    healthBarContainer.style.width = 'fill-parent-flow(1)';
    healthBarContainer.style.height = '20px';
    healthBarContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    healthBarContainer.style.borderRadius = '10px';
    healthBarContainer.style.border = '1px solid rgba(244, 67, 54, 0.5)';
    const healthBar = $.CreatePanel('Panel', healthBarContainer, 'HealthBar');
    healthBar.style.width = '100%';
    healthBar.style.height = '100%';
    healthBar.style.backgroundColor = PLAYING_HUD_THEME.health;
    healthBar.style.borderRadius = '10px';
    healthBar.style.backgroundImage = 'url("s2r://panorama/images/hud/healthbar_fill.vtex")';
    const healthValue = $.CreatePanel('Label', healthBarContainer, 'HealthValue');
    healthValue.text = '1000 / 1000';
    healthValue.style.fontSize = '11px';
    healthValue.style.fontWeight = 'bold';
    healthValue.style.color = '#ffffff';
    healthValue.style.horizontalAlign = 'center';
    healthValue.style.verticalAlign = 'center';
    healthValue.style.textShadow = '0px 0px 3px rgba(0, 0, 0, 1)';
}
// 创建魔法值条
function createManaBar(parent) {
    const manaContainer = $.CreatePanel('Panel', parent, 'ManaContainer');
    manaContainer.style.width = '100%';
    manaContainer.style.height = '30px';
    manaContainer.style.marginBottom = '15px';
    manaContainer.style.flowChildren = 'right';
    const manaLabel = $.CreatePanel('Label', manaContainer, 'ManaLabel');
    manaLabel.text = '💙 魔法值:';
    manaLabel.style.fontSize = '12px';
    manaLabel.style.color = PLAYING_HUD_THEME.textSecondary;
    manaLabel.style.width = '80px';
    manaLabel.style.verticalAlign = 'center';
    const manaBarContainer = $.CreatePanel('Panel', manaContainer, 'ManaBarContainer');
    manaBarContainer.style.width = 'fill-parent-flow(1)';
    manaBarContainer.style.height = '20px';
    manaBarContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    manaBarContainer.style.borderRadius = '10px';
    manaBarContainer.style.border = '1px solid rgba(33, 150, 243, 0.5)';
    const manaBar = $.CreatePanel('Panel', manaBarContainer, 'ManaBar');
    manaBar.style.width = '100%';
    manaBar.style.height = '100%';
    manaBar.style.backgroundColor = PLAYING_HUD_THEME.mana;
    manaBar.style.borderRadius = '10px';
    const manaValue = $.CreatePanel('Label', manaBarContainer, 'ManaValue');
    manaValue.text = '500 / 500';
    manaValue.style.fontSize = '11px';
    manaValue.style.fontWeight = 'bold';
    manaValue.style.color = '#ffffff';
    manaValue.style.horizontalAlign = 'center';
    manaValue.style.verticalAlign = 'center';
    manaValue.style.textShadow = '0px 0px 3px rgba(0, 0, 0, 1)';
}
// 创建属性显示
function createAttributeDisplay(parent) {
    const attributes = [
        { id: 'attack', label: '攻击力', icon: '⚔️' },
        { id: 'defense', label: '防御力', icon: '🛡️' },
        { id: 'speed', label: '移动速度', icon: '🏃' },
    ];
    attributes.forEach((attr, index) => {
        const attrPanel = $.CreatePanel('Panel', parent, `AttributePanel_${attr.id}`);
        attrPanel.style.width = '100%';
        attrPanel.style.height = '25px';
        attrPanel.style.marginBottom = '5px';
        attrPanel.style.flowChildren = 'right';
        attrPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        attrPanel.style.borderRadius = '5px';
        attrPanel.style.padding = '5px';
        const iconLabel = $.CreatePanel('Label', attrPanel, `${attr.id}_Icon`);
        iconLabel.text = attr.icon;
        iconLabel.style.fontSize = '14px';
        iconLabel.style.width = '30px';
        const nameLabel = $.CreatePanel('Label', attrPanel, `${attr.id}_Label`);
        nameLabel.text = attr.label;
        nameLabel.style.fontSize = '12px';
        nameLabel.style.color = PLAYING_HUD_THEME.textSecondary;
        nameLabel.style.width = '100px';
        const valueLabel = $.CreatePanel('Label', attrPanel, `${attr.id}_Value`);
        valueLabel.text = '0';
        valueLabel.style.fontSize = '12px';
        valueLabel.style.fontWeight = 'bold';
        valueLabel.style.color = PLAYING_HUD_THEME.textPrimary;
        valueLabel.style.horizontalAlign = 'right';
        valueLabel.style.width = 'fill-parent-flow(1)';
    });
}
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
            GameEvents.SendCustomGameEventToServer('quick_action', { action: action.id });
        });
        // 添加鼠标悬停效果
        btn.SetPanelEvent('onmouseover', () => {
            $.Msg(`[PlayingHUD] 👆 Mouse over: ${action.name}`);
        });
        $.Msg(`🎮 Created button: ${action.name} (${action.icon})`);
    });
    $.Msg(`🎮 Bottom quick bar created with ${quickActions.length} buttons`);
}
// 创建中央提示信息
function createCenterAlert(parent) {
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
    alertPanel.style.visible = 'false';
    alertPanel.style.zIndex = '5000';
    const alertLabel = $.CreatePanel('Label', alertPanel, 'AlertLabel');
    alertLabel.text = '';
    alertLabel.style.fontSize = '18px';
    alertLabel.style.fontWeight = 'bold';
    alertLabel.style.color = PLAYING_HUD_THEME.textAccent;
    alertLabel.style.textAlign = 'center';
    alertLabel.style.horizontalAlign = 'center';
}
// 显示中央提示
function showCenterAlert(message, duration = 3.0) {
    const alertPanel = $.GetContextPanel().FindChildInLayoutFile('CenterAlertPanel');
    if (alertPanel) {
        const alertLabel = alertPanel.FindChildInLayoutFile('AlertLabel');
        if (alertLabel) {
            alertLabel.text = message;
            alertPanel.style.visible = 'true';
            $.Schedule(duration, () => {
                alertPanel.style.visible = 'false';
            });
        }
    }
}
// 更新生命值条
function updateHealthBar(current, max) {
    const healthBar = $.GetContextPanel().FindChildInLayoutFile('HealthBar');
    const healthValue = $.GetContextPanel().FindChildInLayoutFile('HealthValue');
    if (healthBar && healthValue) {
        const percentage = Math.max(0, Math.min(100, (current / max) * 100));
        healthBar.style.width = `${percentage}%`;
        healthValue.text = `${Math.floor(current)} / ${Math.floor(max)}`;
    }
}
// 更新魔法值条
function updateManaBar(current, max) {
    const manaBar = $.GetContextPanel().FindChildInLayoutFile('ManaBar');
    const manaValue = $.GetContextPanel().FindChildInLayoutFile('ManaValue');
    if (manaBar && manaValue) {
        const percentage = Math.max(0, Math.min(100, (current / max) * 100));
        manaBar.style.width = `${percentage}%`;
        manaValue.text = `${Math.floor(current)} / ${Math.floor(max)}`;
    }
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
GameEvents.Subscribe('center_alert', (data) => {
    showCenterAlert(data.message, data.duration || 3.0);
});
// 显示/隐藏战斗HUD
function showPlayingHUD(show) {
    const container = $.GetContextPanel().FindChildInLayoutFile('PlayingHUDContainer');
    if (container) {
        container.style.visible = show ? 'true' : 'false';
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
    $.Msg('🎮 ========================================');
    $.Msg('🎮 INITIALIZING PLAYING HUD...');
    $.Msg('🎮 ========================================');
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
    updateHealth: updateHealthBar,
    updateMana: updateManaBar,
    addLog: addBattleLog,
    showAlert: showCenterAlert,
    hideNativeUI: hideNativeUI,
    showNativeUI: showNativeUI
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
    }
};
$.Msg('🎮 ========================================');
$.Msg('🎮 PLAYING HUD MODULE LOADED COMPLETELY!');
$.Msg('🎮 Test commands available:');
$.Msg('🎮 - TestPlayingHUD.show()');
$.Msg('🎮 - TestPlayingHUD.hide()');
$.Msg('🎮 - TestPlayingHUD.forceShow()');
$.Msg('🎮 - TestPlayingHUD.hideNative() - 隐藏原生UI');
$.Msg('🎮 - TestPlayingHUD.showNative() - 显示原生UI');
$.Msg('🎮 ========================================');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWluZy1odWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1COzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTCxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsQ0FBQztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsOEJBQThCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsQ0FBQztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsQ0FBQztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLENBQUM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsOEJBQThCO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsQ0FBQztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsQ0FBQztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixDQUFDO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsQ0FBQztBQUN4QjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsQ0FBQztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixDQUFDO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixDQUFDO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLENBQUM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixDQUFDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLENBQUM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsQ0FBQztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLENBQUM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSx3Q0FBd0M7QUFDbEQsVUFBVSwwQ0FBMEM7QUFDcEQsVUFBVSx3Q0FBd0M7QUFDbEQ7QUFDQTtBQUNBLDBCQUEwQixDQUFDLGdEQUFnRCxRQUFRO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLENBQUMsb0NBQW9DLFFBQVE7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLENBQUMsb0NBQW9DLFFBQVE7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsQ0FBQyxvQ0FBb0MsUUFBUTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLENBQUM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsOEJBQThCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsQ0FBQztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsQ0FBQztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixDQUFDO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0RBQWdEO0FBQzFELFVBQVUsZ0RBQWdEO0FBQzFELFVBQVUsMENBQTBDO0FBQ3BELFVBQVUsc0NBQXNDO0FBQ2hEO0FBQ0E7QUFDQSx3QkFBd0IsQ0FBQywrQ0FBK0MsUUFBUTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixDQUFDLGtDQUFrQyxRQUFRO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLENBQUMsa0NBQWtDLFFBQVE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixDQUFDO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLENBQUM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixDQUFDO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0EsVUFBVSx5Q0FBeUM7QUFDbkQsVUFBVSxxQ0FBcUM7QUFDL0MsVUFBVSxxQ0FBcUM7QUFDL0MsVUFBVSwyQ0FBMkM7QUFDckQ7QUFDQTtBQUNBLG9CQUFvQixDQUFDLGlEQUFpRCxVQUFVO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsQ0FBQyw4QkFBOEIsVUFBVTtBQUN0RSwrQkFBK0IsWUFBWSxJQUFJLFlBQVk7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxZQUFZLENBQUMsa0NBQWtDLFlBQVk7QUFDM0Q7QUFDQSxxRUFBcUUsbUJBQW1CO0FBQ3hGLFNBQVM7QUFDVDtBQUNBO0FBQ0EsWUFBWSxDQUFDLG9DQUFvQyxZQUFZO0FBQzdELFNBQVM7QUFDVCxRQUFRLENBQUMsMkJBQTJCLGFBQWEsR0FBRyxZQUFZO0FBQ2hFLEtBQUs7QUFDTCxJQUFJLENBQUMseUNBQXlDLHFCQUFxQjtBQUNuRTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsQ0FBQztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLDhCQUE4QjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLENBQUM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLENBQUM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksQ0FBQztBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsQ0FBQztBQUN2Qix3QkFBd0IsQ0FBQztBQUN6QjtBQUNBO0FBQ0EsbUNBQW1DLFdBQVc7QUFDOUMsOEJBQThCLHFCQUFxQixJQUFJLGdCQUFnQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixDQUFDO0FBQ3JCLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0E7QUFDQSxpQ0FBaUMsV0FBVztBQUM1Qyw0QkFBNEIscUJBQXFCLElBQUksZ0JBQWdCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLENBQUM7QUFDMUI7QUFDQTtBQUNBLHFCQUFxQixDQUFDLGdEQUFnRCxXQUFXO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLENBQUM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsQ0FBQztBQUMzQjtBQUNBLGdDQUFnQyxpQkFBaUIsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0I7QUFDN0Y7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLHNCQUFzQixDQUFDO0FBQ3ZCO0FBQ0E7QUFDQSxRQUFRLENBQUMsb0JBQW9CLDBCQUEwQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0EsSUFBSSxDQUFDLDJCQUEyQixZQUFZO0FBQzVDO0FBQ0E7QUFDQSxJQUFJLENBQUMsNEJBQTRCLFVBQVU7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLENBQUM7QUFDVDtBQUNBLHFDQUFxQztBQUNyQztBQUNBLElBQUksQ0FBQyxpQ0FBaUMsWUFBWSxTQUFTLFlBQVksV0FBVyxVQUFVO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1Q7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0wsSUFBSSxDQUFDO0FBQ0wsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTCxRQUFRLENBQUM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksQ0FBQztBQUNMLFFBQVEsQ0FBQztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBLFFBQVEsQ0FBQyx1QkFBdUIsYUFBYTtBQUM3QztBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsQ0FBQywrQkFBK0I7QUFDeEM7QUFDQSxJQUFJLENBQUMsK0JBQStCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxDQUFDO0FBQ1QsMEJBQTBCLENBQUM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELENBQUM7QUFDRCxDQUFDO0FBQ0QsQ0FBQztBQUNELENBQUM7QUFDRCxDQUFDO0FBQ0QsQ0FBQztBQUNELENBQUM7QUFDRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIHZhciBcIiRcIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxwbGF5aW5nLWh1ZFxcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gQHRzLW5vY2hlY2tcbi8vIOaImOaWl+S4reeahEhVROeVjOmdoiAtIOWPguiAgyBEb3RhMkN1c3RvbUdhbWUg6K6+6K6h6aOO5qC8XG4vLyDnq4vljbPmmL7npLrkuIDkuKrmtYvor5Xmtojmga9cbkdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4kLk1zZygn8J+OriBQbGF5aW5nIEhVRCBzY3JpcHQgaXMgZXhlY3V0aW5nIScpO1xuLy8g5Li76aKY6YWN572u77yI5Y+C6ICDIERvdGEyQ3VzdG9tR2FtZSDpo47moLzvvIlcbmNvbnN0IFBMQVlJTkdfSFVEX1RIRU1FID0ge1xuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDE1LCAyMywgNDIsIDAuODUpJyxcbiAgICBwYW5lbEJnOiAncmdiYSgzMywgMzQsIDMxLCAwLjk1KScsXG4gICAgYm9yZGVyQ29sb3I6ICdyZ2JhKDU5LCAxMzAsIDI0NiwgMC40KScsXG4gICAgdGV4dFByaW1hcnk6ICcjM2I4MmY2JyxcbiAgICB0ZXh0U2Vjb25kYXJ5OiAnI2ZmZmZmZicsXG4gICAgdGV4dEFjY2VudDogJyNmZmM1N2EnLFxuICAgIHN1Y2Nlc3M6ICcjNGNhZjUwJyxcbiAgICB3YXJuaW5nOiAnI2ZmOTgwMCcsXG4gICAgZGFuZ2VyOiAnI2Y0NDMzNicsXG4gICAgaGVhbHRoOiAnI2Y0NDMzNicsXG4gICAgbWFuYTogJyMyMTk2ZjMnLFxufTtcbi8vIOWIm+W7uuaImOaWl0hVRFxuZnVuY3Rpb24gY3JlYXRlUGxheWluZ0hVRCgpIHtcbiAgICAkLk1zZygn8J+OriBDUkVBVElORyBQTEFZSU5HIEhVRCAtIE5FVyBWRVJTSU9OIDIyOjUwIPCfjq4nKTtcbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCdFcnJvcjogUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDliKDpmaTlt7LlrZjlnKjnmoTlrrnlmahcbiAgICBjb25zdCBleGlzdGluZ0NvbnRhaW5lciA9IHJvb3RQYW5lbC5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ1BsYXlpbmdIVURDb250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIC8vIOWIm+W7uuS4u+WuueWZqFxuICAgIGNvbnN0IGNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcm9vdFBhbmVsLCAnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIC8vIOenu+mZpGhpdHRlc3Torr7nva7vvIzpgb/lhY1QYW5vcmFtYSBBUEnpl67pophcbiAgICBjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzEwMDAnO1xuICAgIGNvbnRhaW5lci5BZGRDbGFzcygncGxheWluZ19odWRfcm9vdCcpO1xuICAgIC8vIOWIm+W7uumhtumDqOS/oeaBr+agj1xuICAgIGNyZWF0ZVRvcEluZm9CYXIoY29udGFpbmVyKTtcbiAgICAvLyDliJvlu7rlt6bkvqfoi7Hpm4Tkv6Hmga/pnaLmnb9cbiAgICBjcmVhdGVMZWZ0SGVyb1BhbmVsKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65Y+z5L6n5oiY5paX5L+h5oGv6Z2i5p2/XG4gICAgY3JlYXRlUmlnaHRCYXR0bGVQYW5lbChjb250YWluZXIpO1xuICAgIC8vIOWIm+W7uuW6lemDqOW/q+aNt+agj1xuICAgIGNyZWF0ZUJvdHRvbVF1aWNrQmFyKGNvbnRhaW5lcik7XG4gICAgLy8g5Yib5bu65Lit5aSu5o+Q56S65L+h5oGvXG4gICAgY3JlYXRlQ2VudGVyQWxlcnQoY29udGFpbmVyKTtcbiAgICAkLk1zZygnUGxheWluZyBIVUQgY3JlYXRlZCBzdWNjZXNzZnVsbHkhJyk7XG59XG4vLyDliJvlu7rpobbpg6jkv6Hmga/moI9cbmZ1bmN0aW9uIGNyZWF0ZVRvcEluZm9CYXIocGFyZW50KSB7XG4gICAgY29uc3QgdG9wQmFyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdUb3BJbmZvQmFyJyk7XG4gICAgdG9wQmFyLnN0eWxlLndpZHRoID0gJzcwMHB4JztcbiAgICB0b3BCYXIuc3R5bGUuaGVpZ2h0ID0gJzYwcHgnO1xuICAgIHRvcEJhci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICB0b3BCYXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICd0b3AnO1xuICAgIHRvcEJhci5zdHlsZS5tYXJnaW5Ub3AgPSAnMjBweCc7XG4gICAgdG9wQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnBhbmVsQmc7XG4gICAgdG9wQmFyLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtQTEFZSU5HX0hVRF9USEVNRS5ib3JkZXJDb2xvcn1gO1xuICAgIHRvcEJhci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgdG9wQmFyLnN0eWxlLnBhZGRpbmcgPSAnMTBweCAyMHB4JztcbiAgICB0b3BCYXIuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIHRvcEJhci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIC8vIOa4uOaIj+aXtumXtFxuICAgIGNvbnN0IHRpbWVQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgdG9wQmFyLCAnR2FtZVRpbWVQYW5lbCcpO1xuICAgIHRpbWVQYW5lbC5zdHlsZS53aWR0aCA9ICcxNTBweCc7XG4gICAgdGltZVBhbmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICB0aW1lUGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IHRpbWVMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGltZVBhbmVsLCAnR2FtZVRpbWVMYWJlbCcpO1xuICAgIHRpbWVMYWJlbC50ZXh0ID0gJ+KPsCDmuLjmiI/ml7bpl7QnO1xuICAgIHRpbWVMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICB0aW1lTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIHRpbWVMYWJlbC5zdHlsZS5vcGFjaXR5ID0gJzAuNyc7XG4gICAgY29uc3QgdGltZVZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aW1lUGFuZWwsICdHYW1lVGltZVZhbHVlJyk7XG4gICAgdGltZVZhbHVlLnRleHQgPSAnMDA6MDAnO1xuICAgIHRpbWVWYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB0aW1lVmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aW1lVmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICAvLyDliIbpmpTnur9cbiAgICBjb25zdCBkaXZpZGVyMSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgdG9wQmFyLCAnRGl2aWRlcjEnKTtcbiAgICBkaXZpZGVyMS5zdHlsZS53aWR0aCA9ICcxcHgnO1xuICAgIGRpdmlkZXIxLnN0eWxlLmhlaWdodCA9ICc4MCUnO1xuICAgIGRpdmlkZXIxLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yO1xuICAgIGRpdmlkZXIxLnN0eWxlLm9wYWNpdHkgPSAnMC4zJztcbiAgICBkaXZpZGVyMS5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g6YeR5biB5L+h5oGvXG4gICAgY29uc3QgZ29sZFBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdHb2xkUGFuZWwnKTtcbiAgICBnb2xkUGFuZWwuc3R5bGUud2lkdGggPSAnMTUwcHgnO1xuICAgIGdvbGRQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgZ29sZFBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBjb25zdCBnb2xkTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGdvbGRQYW5lbCwgJ0dvbGRMYWJlbCcpO1xuICAgIGdvbGRMYWJlbC50ZXh0ID0gJ/CfkrAg6YeR5biBJztcbiAgICBnb2xkTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgZ29sZExhYmVsLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBnb2xkTGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjcnO1xuICAgIGNvbnN0IGdvbGRWYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgZ29sZFBhbmVsLCAnR29sZFZhbHVlJyk7XG4gICAgZ29sZFZhbHVlLnRleHQgPSAnNTAwJztcbiAgICBnb2xkVmFsdWUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgZ29sZFZhbHVlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgZ29sZFZhbHVlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUud2FybmluZztcbiAgICAvLyDliIbpmpTnur9cbiAgICBjb25zdCBkaXZpZGVyMiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgdG9wQmFyLCAnRGl2aWRlcjInKTtcbiAgICBkaXZpZGVyMi5zdHlsZS53aWR0aCA9ICcxcHgnO1xuICAgIGRpdmlkZXIyLnN0eWxlLmhlaWdodCA9ICc4MCUnO1xuICAgIGRpdmlkZXIyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yO1xuICAgIGRpdmlkZXIyLnN0eWxlLm9wYWNpdHkgPSAnMC4zJztcbiAgICBkaXZpZGVyMi5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgLy8g5Ye75p2A5L+h5oGvXG4gICAgY29uc3Qga2lsbFBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCB0b3BCYXIsICdLaWxsUGFuZWwnKTtcbiAgICBraWxsUGFuZWwuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAga2lsbFBhbmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBraWxsUGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IGtpbGxMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywga2lsbFBhbmVsLCAnS2lsbExhYmVsJyk7XG4gICAga2lsbExhYmVsLnRleHQgPSAn4pqU77iPIOWHu+adgC/mrbvkuqEv5Yqp5pS7JztcbiAgICBraWxsTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAga2lsbExhYmVsLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBraWxsTGFiZWwuc3R5bGUub3BhY2l0eSA9ICcwLjcnO1xuICAgIGNvbnN0IGtpbGxWYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywga2lsbFBhbmVsLCAnS2lsbFZhbHVlJyk7XG4gICAga2lsbFZhbHVlLnRleHQgPSAnMCAvIDAgLyAwJztcbiAgICBraWxsVmFsdWUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAga2lsbFZhbHVlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAga2lsbFZhbHVlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbn1cbi8vIOWIm+W7uuW3puS+p+iLsembhOS/oeaBr+mdouadv1xuZnVuY3Rpb24gY3JlYXRlTGVmdEhlcm9QYW5lbChwYXJlbnQpIHtcbiAgICBjb25zdCBsZWZ0UGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0xlZnRIZXJvUGFuZWwnKTtcbiAgICBsZWZ0UGFuZWwuc3R5bGUud2lkdGggPSAnMjgwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5oZWlnaHQgPSAnNDAwcHgnO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnbGVmdCc7XG4gICAgbGVmdFBhbmVsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAndG9wJztcbiAgICBsZWZ0UGFuZWwuc3R5bGUubWFyZ2luVG9wID0gJzEwMHB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUubWFyZ2luTGVmdCA9ICcyMHB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUucGFuZWxCZztcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgbGVmdFBhbmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICBsZWZ0UGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIGxlZnRQYW5lbC5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgLy8g6Z2i5p2/5qCH6aKYXG4gICAgY29uc3QgdGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxlZnRQYW5lbCwgJ0hlcm9QYW5lbFRpdGxlJyk7XG4gICAgdGl0bGUudGV4dCA9ICfwn5GkIOiLsembhOS/oeaBryc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIC8vIOiLsembhOWktOWDj1xuICAgIGNvbnN0IGhlcm9BdmF0YXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGxlZnRQYW5lbCwgJ0hlcm9BdmF0YXInKTtcbiAgICBoZXJvQXZhdGFyLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICBoZXJvQXZhdGFyLnN0eWxlLmhlaWdodCA9ICcxMDBweCc7XG4gICAgaGVyb0F2YXRhci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBoZXJvQXZhdGFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yO1xuICAgIGhlcm9BdmF0YXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIGhlcm9BdmF0YXIuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIC8vIOiLsembhOWQjeensFxuICAgIGNvbnN0IGhlcm9OYW1lID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBsZWZ0UGFuZWwsICdIZXJvTmFtZScpO1xuICAgIGhlcm9OYW1lLnRleHQgPSAn5pyq55+l6Iux6ZuEJztcbiAgICBoZXJvTmFtZS5zdHlsZS5mb250U2l6ZSA9ICcxOHB4JztcbiAgICBoZXJvTmFtZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGhlcm9OYW1lLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgaGVyb05hbWUuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVyb05hbWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVyb05hbWUuc3R5bGUubWFyZ2luQm90dG9tID0gJzIwcHgnO1xuICAgIC8vIOetiee6p+WSjOe7j+mqjFxuICAgIGNvbnN0IGxldmVsUGFuZWwgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIGxlZnRQYW5lbCwgJ0xldmVsUGFuZWwnKTtcbiAgICBsZXZlbFBhbmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxldmVsUGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzQwcHgnO1xuICAgIGxldmVsUGFuZWwuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIGNvbnN0IGxldmVsTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxldmVsUGFuZWwsICdMZXZlbExhYmVsJyk7XG4gICAgbGV2ZWxMYWJlbC50ZXh0ID0gJ+KtkCDnrYnnuqc6JztcbiAgICBsZXZlbExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgIGxldmVsTGFiZWwuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGxldmVsTGFiZWwuc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgY29uc3QgbGV2ZWxWYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbGV2ZWxQYW5lbCwgJ0xldmVsVmFsdWUnKTtcbiAgICBsZXZlbFZhbHVlLnRleHQgPSAnMSc7XG4gICAgbGV2ZWxWYWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcxNnB4JztcbiAgICBsZXZlbFZhbHVlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgbGV2ZWxWYWx1ZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgbGV2ZWxWYWx1ZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAncmlnaHQnO1xuICAgIGxldmVsVmFsdWUuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgLy8g55Sf5ZG95YC85p2hXG4gICAgY3JlYXRlSGVhbHRoQmFyKGxlZnRQYW5lbCk7XG4gICAgLy8g6a2U5rOV5YC85p2hXG4gICAgY3JlYXRlTWFuYUJhcihsZWZ0UGFuZWwpO1xuICAgIC8vIOWxnuaAp+aYvuekulxuICAgIGNyZWF0ZUF0dHJpYnV0ZURpc3BsYXkobGVmdFBhbmVsKTtcbn1cbi8vIOWIm+W7uueUn+WRveWAvOadoVxuZnVuY3Rpb24gY3JlYXRlSGVhbHRoQmFyKHBhcmVudCkge1xuICAgIGNvbnN0IGhlYWx0aENvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnSGVhbHRoQ29udGFpbmVyJyk7XG4gICAgaGVhbHRoQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGhlYWx0aENvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgaGVhbHRoQ29udGFpbmVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICBoZWFsdGhDb250YWluZXIuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBjb25zdCBoZWFsdGhMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgaGVhbHRoQ29udGFpbmVyLCAnSGVhbHRoTGFiZWwnKTtcbiAgICBoZWFsdGhMYWJlbC50ZXh0ID0gJ+KdpO+4jyDnlJ/lkb3lgLw6JztcbiAgICBoZWFsdGhMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICBoZWFsdGhMYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgaGVhbHRoTGFiZWwuc3R5bGUud2lkdGggPSAnODBweCc7XG4gICAgaGVhbHRoTGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnN0IGhlYWx0aEJhckNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgaGVhbHRoQ29udGFpbmVyLCAnSGVhbHRoQmFyQ29udGFpbmVyJyk7XG4gICAgaGVhbHRoQmFyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIGhlYWx0aEJhckNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMjBweCc7XG4gICAgaGVhbHRoQmFyQ29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIGhlYWx0aEJhckNvbnRhaW5lci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgaGVhbHRoQmFyQ29udGFpbmVyLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgyNDQsIDY3LCA1NCwgMC41KSc7XG4gICAgY29uc3QgaGVhbHRoQmFyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBoZWFsdGhCYXJDb250YWluZXIsICdIZWFsdGhCYXInKTtcbiAgICBoZWFsdGhCYXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgaGVhbHRoQmFyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBoZWFsdGhCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUExBWUlOR19IVURfVEhFTUUuaGVhbHRoO1xuICAgIGhlYWx0aEJhci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgaGVhbHRoQmFyLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCJzMnI6Ly9wYW5vcmFtYS9pbWFnZXMvaHVkL2hlYWx0aGJhcl9maWxsLnZ0ZXhcIiknO1xuICAgIGNvbnN0IGhlYWx0aFZhbHVlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBoZWFsdGhCYXJDb250YWluZXIsICdIZWFsdGhWYWx1ZScpO1xuICAgIGhlYWx0aFZhbHVlLnRleHQgPSAnMTAwMCAvIDEwMDAnO1xuICAgIGhlYWx0aFZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzExcHgnO1xuICAgIGhlYWx0aFZhbHVlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgaGVhbHRoVmFsdWUuc3R5bGUuY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgaGVhbHRoVmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgaGVhbHRoVmFsdWUuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGhlYWx0aFZhbHVlLnN0eWxlLnRleHRTaGFkb3cgPSAnMHB4IDBweCAzcHggcmdiYSgwLCAwLCAwLCAxKSc7XG59XG4vLyDliJvlu7rprZTms5XlgLzmnaFcbmZ1bmN0aW9uIGNyZWF0ZU1hbmFCYXIocGFyZW50KSB7XG4gICAgY29uc3QgbWFuYUNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnTWFuYUNvbnRhaW5lcicpO1xuICAgIG1hbmFDb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFuYUNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgbWFuYUNvbnRhaW5lci5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgbWFuYUNvbnRhaW5lci5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGNvbnN0IG1hbmFMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbWFuYUNvbnRhaW5lciwgJ01hbmFMYWJlbCcpO1xuICAgIG1hbmFMYWJlbC50ZXh0ID0gJ/Cfkpkg6a2U5rOV5YC8Oic7XG4gICAgbWFuYUxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgIG1hbmFMYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgbWFuYUxhYmVsLnN0eWxlLndpZHRoID0gJzgwcHgnO1xuICAgIG1hbmFMYWJlbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29uc3QgbWFuYUJhckNvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgbWFuYUNvbnRhaW5lciwgJ01hbmFCYXJDb250YWluZXInKTtcbiAgICBtYW5hQmFyQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJ2ZpbGwtcGFyZW50LWZsb3coMSknO1xuICAgIG1hbmFCYXJDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gJzIwcHgnO1xuICAgIG1hbmFCYXJDb250YWluZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwgMCwgMCwgMC41KSc7XG4gICAgbWFuYUJhckNvbnRhaW5lci5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgbWFuYUJhckNvbnRhaW5lci5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkIHJnYmEoMzMsIDE1MCwgMjQzLCAwLjUpJztcbiAgICBjb25zdCBtYW5hQmFyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBtYW5hQmFyQ29udGFpbmVyLCAnTWFuYUJhcicpO1xuICAgIG1hbmFCYXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFuYUJhci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbWFuYUJhci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5tYW5hO1xuICAgIG1hbmFCYXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIGNvbnN0IG1hbmFWYWx1ZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbWFuYUJhckNvbnRhaW5lciwgJ01hbmFWYWx1ZScpO1xuICAgIG1hbmFWYWx1ZS50ZXh0ID0gJzUwMCAvIDUwMCc7XG4gICAgbWFuYVZhbHVlLnN0eWxlLmZvbnRTaXplID0gJzExcHgnO1xuICAgIG1hbmFWYWx1ZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIG1hbmFWYWx1ZS5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICBtYW5hVmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFuYVZhbHVlLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBtYW5hVmFsdWUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDNweCByZ2JhKDAsIDAsIDAsIDEpJztcbn1cbi8vIOWIm+W7uuWxnuaAp+aYvuekulxuZnVuY3Rpb24gY3JlYXRlQXR0cmlidXRlRGlzcGxheShwYXJlbnQpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gW1xuICAgICAgICB7IGlkOiAnYXR0YWNrJywgbGFiZWw6ICfmlLvlh7vlipsnLCBpY29uOiAn4pqU77iPJyB9LFxuICAgICAgICB7IGlkOiAnZGVmZW5zZScsIGxhYmVsOiAn6Ziy5b6h5YqbJywgaWNvbjogJ/Cfm6HvuI8nIH0sXG4gICAgICAgIHsgaWQ6ICdzcGVlZCcsIGxhYmVsOiAn56e75Yqo6YCf5bqmJywgaWNvbjogJ/Cfj4MnIH0sXG4gICAgXTtcbiAgICBhdHRyaWJ1dGVzLmZvckVhY2goKGF0dHIsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dHJQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgQXR0cmlidXRlUGFuZWxfJHthdHRyLmlkfWApO1xuICAgICAgICBhdHRyUGFuZWwuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGF0dHJQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMjVweCc7XG4gICAgICAgIGF0dHJQYW5lbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAgICAgYXR0clBhbmVsLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgICAgIGF0dHJQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjIpJztcbiAgICAgICAgYXR0clBhbmVsLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1cHgnO1xuICAgICAgICBhdHRyUGFuZWwuc3R5bGUucGFkZGluZyA9ICc1cHgnO1xuICAgICAgICBjb25zdCBpY29uTGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGF0dHJQYW5lbCwgYCR7YXR0ci5pZH1fSWNvbmApO1xuICAgICAgICBpY29uTGFiZWwudGV4dCA9IGF0dHIuaWNvbjtcbiAgICAgICAgaWNvbkxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE0cHgnO1xuICAgICAgICBpY29uTGFiZWwuc3R5bGUud2lkdGggPSAnMzBweCc7XG4gICAgICAgIGNvbnN0IG5hbWVMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgYXR0clBhbmVsLCBgJHthdHRyLmlkfV9MYWJlbGApO1xuICAgICAgICBuYW1lTGFiZWwudGV4dCA9IGF0dHIubGFiZWw7XG4gICAgICAgIG5hbWVMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgbmFtZUxhYmVsLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICAgICAgbmFtZUxhYmVsLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICAgICAgY29uc3QgdmFsdWVMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgYXR0clBhbmVsLCBgJHthdHRyLmlkfV9WYWx1ZWApO1xuICAgICAgICB2YWx1ZUxhYmVsLnRleHQgPSAnMCc7XG4gICAgICAgIHZhbHVlTGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMTJweCc7XG4gICAgICAgIHZhbHVlTGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgdmFsdWVMYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgICAgICB2YWx1ZUxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgICAgIHZhbHVlTGFiZWwuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgfSk7XG59XG4vLyDliJvlu7rlj7PkvqfmiJjmlpfkv6Hmga/pnaLmnb9cbmZ1bmN0aW9uIGNyZWF0ZVJpZ2h0QmF0dGxlUGFuZWwocGFyZW50KSB7XG4gICAgY29uc3QgcmlnaHRQYW5lbCA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnUmlnaHRCYXR0bGVQYW5lbCcpO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUud2lkdGggPSAnMjgwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuaGVpZ2h0ID0gJzQwMHB4JztcbiAgICByaWdodFBhbmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdyaWdodCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTAwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgcmlnaHRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIHJpZ2h0UGFuZWwuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIC8vIOmdouadv+agh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCByaWdodFBhbmVsLCAnQmF0dGxlUGFuZWxUaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn4pqU77iPIOaImOaWl+S/oeaBryc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgdGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgdGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIC8vIOS8pOWus+e7n+iuoVxuICAgIGNyZWF0ZURhbWFnZVN0YXRzKHJpZ2h0UGFuZWwpO1xuICAgIC8vIOaImOaWl+iusOW9lVxuICAgIGNyZWF0ZUJhdHRsZUxvZyhyaWdodFBhbmVsKTtcbn1cbi8vIOWIm+W7uuS8pOWus+e7n+iuoVxuZnVuY3Rpb24gY3JlYXRlRGFtYWdlU3RhdHMocGFyZW50KSB7XG4gICAgY29uc3Qgc3RhdHNTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdEYW1hZ2VTdGF0c1NlY3Rpb24nKTtcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICcxNTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSAnMTBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNvbnN0IHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzVGl0bGUnKTtcbiAgICBzdGF0c1RpdGxlLnRleHQgPSAn8J+TiiDkvKTlrrPnu5/orqEnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMTRweCc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIHN0YXRzVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICAgIGNvbnN0IHN0YXRzID0gW1xuICAgICAgICB7IGlkOiAnZGFtYWdlX2RlYWx0JywgbGFiZWw6ICfpgKDmiJDkvKTlrrM6JywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGlkOiAnZGFtYWdlX3Rha2VuJywgbGFiZWw6ICflj5fliLDkvKTlrrM6JywgdmFsdWU6ICcwJyB9LFxuICAgICAgICB7IGlkOiAnaGVhbGluZycsIGxhYmVsOiAn5rK755aX6YePOicsIHZhbHVlOiAnMCcgfSxcbiAgICAgICAgeyBpZDogJ2RwcycsIGxhYmVsOiAnRFBTOicsIHZhbHVlOiAnMCcgfSxcbiAgICBdO1xuICAgIHN0YXRzLmZvckVhY2goKHN0YXQsIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRSb3cgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHN0YXRzU2VjdGlvbiwgYFN0YXRSb3dfJHtzdGF0LmlkfWApO1xuICAgICAgICBzdGF0Um93LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgICAgICBzdGF0Um93LnN0eWxlLmhlaWdodCA9ICcyNXB4JztcbiAgICAgICAgc3RhdFJvdy5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAgICAgc3RhdFJvdy5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgICAgICBjb25zdCBsYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdFJvdywgYCR7c3RhdC5pZH1fTGFiZWxgKTtcbiAgICAgICAgbGFiZWwudGV4dCA9IHN0YXQubGFiZWw7XG4gICAgICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnO1xuICAgICAgICBsYWJlbC5zdHlsZS5jb2xvciA9IFBMQVlJTkdfSFVEX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxhYmVsLnN0eWxlLndpZHRoID0gJzEwMHB4JztcbiAgICAgICAgY29uc3QgdmFsdWUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRSb3csIGAke3N0YXQuaWR9X1ZhbHVlYCk7XG4gICAgICAgIHZhbHVlLnRleHQgPSBzdGF0LnZhbHVlO1xuICAgICAgICB2YWx1ZS5zdHlsZS5mb250U2l6ZSA9ICcxMnB4JztcbiAgICAgICAgdmFsdWUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgdmFsdWUuc3R5bGUuY29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICAgICAgdmFsdWUuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgdmFsdWUuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgfSk7XG59XG4vLyDliJvlu7rmiJjmlpforrDlvZVcbmZ1bmN0aW9uIGNyZWF0ZUJhdHRsZUxvZyhwYXJlbnQpIHtcbiAgICBjb25zdCBsb2dTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdCYXR0bGVMb2dTZWN0aW9uJyk7XG4gICAgbG9nU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIGxvZ1NlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBsb2dTZWN0aW9uLnN0eWxlLm92ZXJmbG93ID0gJ3NxdWlzaCBzY3JvbGwnO1xuICAgIGNvbnN0IGxvZ1RpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBsb2dTZWN0aW9uLCAnTG9nVGl0bGUnKTtcbiAgICBsb2dUaXRsZS50ZXh0ID0gJ/Cfk50g5oiY5paX6K6w5b2VJztcbiAgICBsb2dUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICBsb2dUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGxvZ1RpdGxlLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBsb2dUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgY29uc3QgbG9nQ29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBsb2dTZWN0aW9uLCAnTG9nQ29udGFpbmVyJyk7XG4gICAgbG9nQ29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxvZ0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgbG9nQ29udGFpbmVyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbn1cbi8vIOWIm+W7uuW6lemDqOW/q+aNt+agj1xuZnVuY3Rpb24gY3JlYXRlQm90dG9tUXVpY2tCYXIocGFyZW50KSB7XG4gICAgJC5Nc2coJ/Cfjq4gQ3JlYXRpbmcgYm90dG9tIHF1aWNrIGJhci4uLicpO1xuICAgIGNvbnN0IGJvdHRvbUJhciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQm90dG9tUXVpY2tCYXInKTtcbiAgICBjb25zdCBxdWlja0FjdGlvbnMgPSBbXG4gICAgICAgIHsgaWQ6ICdpbnZlbnRvcnknLCBuYW1lOiAn6IOM5YyFJywgaWNvbjogJ/CfjpInIH0sXG4gICAgICAgIHsgaWQ6ICdza2lsbHMnLCBuYW1lOiAn5oqA6IO9JywgaWNvbjogJ+KcqCcgfSxcbiAgICAgICAgeyBpZDogJ3N0YXRzJywgbmFtZTogJ+e7n+iuoScsIGljb246ICfwn5OKJyB9LFxuICAgICAgICB7IGlkOiAndGVzdF9raWxsJywgbmFtZTogJ+a1i+ivlee7k+eulycsIGljb246ICfwn5KAJyB9LFxuICAgIF07XG4gICAgcXVpY2tBY3Rpb25zLmZvckVhY2goKGFjdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgYnRuID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgYm90dG9tQmFyLCBgUXVpY2tBY3Rpb25fJHthY3Rpb24uaWR9YCk7XG4gICAgICAgIGJ0bi5BZGRDbGFzcygncXVpY2tfYWN0aW9uX2J0bicpO1xuICAgICAgICBidG4uc3R5bGUud2lkdGggPSAnMTEwcHgnO1xuICAgICAgICBidG4uc3R5bGUuaGVpZ2h0ID0gJzYwcHgnO1xuICAgICAgICBidG4uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgICAgICAvLyDliJvlu7rkuIDkuKrljZXni6znmoQgTGFiZWwg5pi+56S65omA5pyJ5YaF5a65XG4gICAgICAgIGNvbnN0IGNvbnRlbnRMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgYnRuLCBgJHthY3Rpb24uaWR9X2NvbnRlbnRgKTtcbiAgICAgICAgY29udGVudExhYmVsLnRleHQgPSBgJHthY3Rpb24uaWNvbn1cXG4ke2FjdGlvbi5uYW1lfWA7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgY29udGVudExhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBjb250ZW50TGFiZWwuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgICAgIGNvbnRlbnRMYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICAgICAgY29udGVudExhYmVsLmhpdHRlc3QgPSBmYWxzZTsgLy8g6YeN6KaB77ya5LiN5oum5oiq54K55Ye7XG4gICAgICAgIC8vIOe7keWumueCueWHu+S6i+S7tlxuICAgICAgICBidG4uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKGBbUGxheWluZ0hVRF0g4pyF4pyF4pyFIENMSUNLRUQ6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgnR2VuZXJhbC5CdXR0b25DbGljaycpO1xuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3F1aWNrX2FjdGlvbicsIHsgYWN0aW9uOiBhY3Rpb24uaWQgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDmt7vliqDpvKDmoIfmgqzlgZzmlYjmnpxcbiAgICAgICAgYnRuLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coYFtQbGF5aW5nSFVEXSDwn5GGIE1vdXNlIG92ZXI6ICR7YWN0aW9uLm5hbWV9YCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkLk1zZyhg8J+OriBDcmVhdGVkIGJ1dHRvbjogJHthY3Rpb24ubmFtZX0gKCR7YWN0aW9uLmljb259KWApO1xuICAgIH0pO1xuICAgICQuTXNnKGDwn46uIEJvdHRvbSBxdWljayBiYXIgY3JlYXRlZCB3aXRoICR7cXVpY2tBY3Rpb25zLmxlbmd0aH0gYnV0dG9uc2ApO1xufVxuLy8g5Yib5bu65Lit5aSu5o+Q56S65L+h5oGvXG5mdW5jdGlvbiBjcmVhdGVDZW50ZXJBbGVydChwYXJlbnQpIHtcbiAgICBjb25zdCBhbGVydFBhbmVsID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdDZW50ZXJBbGVydFBhbmVsJyk7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS53aWR0aCA9ICc0MDBweCc7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS5oZWlnaHQgPSAnMTAwcHgnO1xuICAgIGFsZXJ0UGFuZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBQTEFZSU5HX0hVRF9USEVNRS5wYW5lbEJnO1xuICAgIGFsZXJ0UGFuZWwuc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke1BMQVlJTkdfSFVEX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCc7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIGFsZXJ0UGFuZWwuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIGFsZXJ0UGFuZWwuc3R5bGUudmlzaWJsZSA9ICdmYWxzZSc7XG4gICAgYWxlcnRQYW5lbC5zdHlsZS56SW5kZXggPSAnNTAwMCc7XG4gICAgY29uc3QgYWxlcnRMYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgYWxlcnRQYW5lbCwgJ0FsZXJ0TGFiZWwnKTtcbiAgICBhbGVydExhYmVsLnRleHQgPSAnJztcbiAgICBhbGVydExhYmVsLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIGFsZXJ0TGFiZWwuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBhbGVydExhYmVsLnN0eWxlLmNvbG9yID0gUExBWUlOR19IVURfVEhFTUUudGV4dEFjY2VudDtcbiAgICBhbGVydExhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGFsZXJ0TGFiZWwuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG59XG4vLyDmmL7npLrkuK3lpK7mj5DnpLpcbmZ1bmN0aW9uIHNob3dDZW50ZXJBbGVydChtZXNzYWdlLCBkdXJhdGlvbiA9IDMuMCkge1xuICAgIGNvbnN0IGFsZXJ0UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQ2VudGVyQWxlcnRQYW5lbCcpO1xuICAgIGlmIChhbGVydFBhbmVsKSB7XG4gICAgICAgIGNvbnN0IGFsZXJ0TGFiZWwgPSBhbGVydFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQWxlcnRMYWJlbCcpO1xuICAgICAgICBpZiAoYWxlcnRMYWJlbCkge1xuICAgICAgICAgICAgYWxlcnRMYWJlbC50ZXh0ID0gbWVzc2FnZTtcbiAgICAgICAgICAgIGFsZXJ0UGFuZWwuc3R5bGUudmlzaWJsZSA9ICd0cnVlJztcbiAgICAgICAgICAgICQuU2NoZWR1bGUoZHVyYXRpb24sICgpID0+IHtcbiAgICAgICAgICAgICAgICBhbGVydFBhbmVsLnN0eWxlLnZpc2libGUgPSAnZmFsc2UnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyDmm7TmlrDnlJ/lkb3lgLzmnaFcbmZ1bmN0aW9uIHVwZGF0ZUhlYWx0aEJhcihjdXJyZW50LCBtYXgpIHtcbiAgICBjb25zdCBoZWFsdGhCYXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnSGVhbHRoQmFyJyk7XG4gICAgY29uc3QgaGVhbHRoVmFsdWUgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnSGVhbHRoVmFsdWUnKTtcbiAgICBpZiAoaGVhbHRoQmFyICYmIGhlYWx0aFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIChjdXJyZW50IC8gbWF4KSAqIDEwMCkpO1xuICAgICAgICBoZWFsdGhCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50YWdlfSVgO1xuICAgICAgICBoZWFsdGhWYWx1ZS50ZXh0ID0gYCR7TWF0aC5mbG9vcihjdXJyZW50KX0gLyAke01hdGguZmxvb3IobWF4KX1gO1xuICAgIH1cbn1cbi8vIOabtOaWsOmtlOazleWAvOadoVxuZnVuY3Rpb24gdXBkYXRlTWFuYUJhcihjdXJyZW50LCBtYXgpIHtcbiAgICBjb25zdCBtYW5hQmFyID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ01hbmFCYXInKTtcbiAgICBjb25zdCBtYW5hVmFsdWUgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnTWFuYVZhbHVlJyk7XG4gICAgaWYgKG1hbmFCYXIgJiYgbWFuYVZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIChjdXJyZW50IC8gbWF4KSAqIDEwMCkpO1xuICAgICAgICBtYW5hQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudGFnZX0lYDtcbiAgICAgICAgbWFuYVZhbHVlLnRleHQgPSBgJHtNYXRoLmZsb29yKGN1cnJlbnQpfSAvICR7TWF0aC5mbG9vcihtYXgpfWA7XG4gICAgfVxufVxuLy8g5re75Yqg5oiY5paX6K6w5b2VXG5mdW5jdGlvbiBhZGRCYXR0bGVMb2cobWVzc2FnZSwgdHlwZSA9ICdpbmZvJykge1xuICAgIGNvbnN0IGxvZ0NvbnRhaW5lciA9ICQuR2V0Q29udGV4dFBhbmVsKCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdMb2dDb250YWluZXInKTtcbiAgICBpZiAoIWxvZ0NvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0IGxvZ0VudHJ5ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBsb2dDb250YWluZXIsIGBMb2dFbnRyeV8ke0RhdGUubm93KCl9YCk7XG4gICAgbG9nRW50cnkudGV4dCA9IG1lc3NhZ2U7XG4gICAgbG9nRW50cnkuc3R5bGUuZm9udFNpemUgPSAnMTFweCc7XG4gICAgbG9nRW50cnkuc3R5bGUuY29sb3IgPSB0eXBlID09PSAna2lsbCcgPyBQTEFZSU5HX0hVRF9USEVNRS5zdWNjZXNzIDpcbiAgICAgICAgdHlwZSA9PT0gJ2RlYXRoJyA/IFBMQVlJTkdfSFVEX1RIRU1FLmRhbmdlciA6XG4gICAgICAgICAgICBQTEFZSU5HX0hVRF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGxvZ0VudHJ5LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcycHgnO1xuICAgIC8vIOmZkOWItuaXpeW/l+aVsOmHj1xuICAgIGNvbnN0IGNoaWxkcmVuID0gbG9nQ29udGFpbmVyLkNoaWxkcmVuKCk7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDEwKSB7XG4gICAgICAgIGNoaWxkcmVuWzBdLkRlbGV0ZUFzeW5jKDApO1xuICAgIH1cbn1cbi8vIOebkeWQrOa4uOaIj+S6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ3BsYXllcl9zdGF0c191cGRhdGUnLCAoZGF0YSkgPT4ge1xuICAgIC8vIOabtOaWsOe7n+iuoeaVsOaNrlxuICAgIGlmIChkYXRhLmdvbGQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBnb2xkVmFsdWUgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnR29sZFZhbHVlJyk7XG4gICAgICAgIGlmIChnb2xkVmFsdWUpXG4gICAgICAgICAgICBnb2xkVmFsdWUudGV4dCA9IGRhdGEuZ29sZC50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZGF0YS5raWxscyAhPT0gdW5kZWZpbmVkIHx8IGRhdGEuZGVhdGhzICE9PSB1bmRlZmluZWQgfHwgZGF0YS5hc3Npc3RzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3Qga2lsbFZhbHVlID0gJC5HZXRDb250ZXh0UGFuZWwoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoJ0tpbGxWYWx1ZScpO1xuICAgICAgICBpZiAoa2lsbFZhbHVlKSB7XG4gICAgICAgICAgICBraWxsVmFsdWUudGV4dCA9IGAke2RhdGEua2lsbHMgfHwgMH0gLyAke2RhdGEuZGVhdGhzIHx8IDB9IC8gJHtkYXRhLmFzc2lzdHMgfHwgMH1gO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnaGVyb19zdGF0c191cGRhdGUnLCAoZGF0YSkgPT4ge1xuICAgIGlmIChkYXRhLmhlYWx0aCAhPT0gdW5kZWZpbmVkICYmIGRhdGEubWF4SGVhbHRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdXBkYXRlSGVhbHRoQmFyKGRhdGEuaGVhbHRoLCBkYXRhLm1heEhlYWx0aCk7XG4gICAgfVxuICAgIGlmIChkYXRhLm1hbmEgIT09IHVuZGVmaW5lZCAmJiBkYXRhLm1heE1hbmEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB1cGRhdGVNYW5hQmFyKGRhdGEubWFuYSwgZGF0YS5tYXhNYW5hKTtcbiAgICB9XG59KTtcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdiYXR0bGVfbG9nJywgKGRhdGEpID0+IHtcbiAgICBhZGRCYXR0bGVMb2coZGF0YS5tZXNzYWdlLCBkYXRhLnR5cGUpO1xufSk7XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnY2VudGVyX2FsZXJ0JywgKGRhdGEpID0+IHtcbiAgICBzaG93Q2VudGVyQWxlcnQoZGF0YS5tZXNzYWdlLCBkYXRhLmR1cmF0aW9uIHx8IDMuMCk7XG59KTtcbi8vIOaYvuekui/pmpDol4/miJjmlpdIVURcbmZ1bmN0aW9uIHNob3dQbGF5aW5nSFVEKHNob3cpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2libGUgPSBzaG93ID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICAgICAgJC5Nc2coYFBsYXlpbmcgSFVEICR7c2hvdyA/ICdzaG93bicgOiAnaGlkZGVuJ31gKTtcbiAgICB9XG59XG4vLyDmo4Dmn6XmuLjmiI/nirbmgIHlubblhrPlrprmmK/lkKbmmL7npLpIVURcbmZ1bmN0aW9uIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpIHtcbiAgICAvLyDmo4Dmn6XmuLjmiI/mqKHlvI/vvIjnlKjkuo7osIPor5XvvIlcbiAgICBsZXQgY3VycmVudE1vZGUgPSAnbm9ybWFsJztcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBnYW1lTW9kZURhdGEgPSBDdXN0b21OZXRUYWJsZXMuR2V0VGFibGVWYWx1ZSgnZ2FtZV9tb2RlJywgJ2N1cnJlbnQnKTtcbiAgICAgICAgaWYgKGdhbWVNb2RlRGF0YSAmJiBnYW1lTW9kZURhdGEubW9kZSkge1xuICAgICAgICAgICAgY3VycmVudE1vZGUgPSBnYW1lTW9kZURhdGEubW9kZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAkLk1zZygnRXJyb3IgcmVhZGluZyBnYW1lIG1vZGUgZnJvbSBOZXRUYWJsZTonLCBlKTtcbiAgICB9XG4gICAgJC5Nc2coYEN1cnJlbnQgZ2FtZSBtb2RlOiAke2N1cnJlbnRNb2RlfWApO1xuICAgIC8vIOajgOafpeaYr+WQpuWcqOa4uOaIj+i/m+ihjOS4rVxuICAgIGNvbnN0IGdhbWVTdGF0ZSA9IEdhbWUuR2V0U3RhdGUoKTtcbiAgICAkLk1zZyhgQ3VycmVudCBnYW1lIHN0YXRlOiAke2dhbWVTdGF0ZX1gKTtcbiAgICAvLyDmoLnmja7lrp7pmYXnmoTmuLjmiI/nirbmgIHluLjph4/vvJpcbiAgICAvLyBET1RBX0dBTUVSVUxFU19TVEFURV9QUkVfR0FNRSA9IDhcbiAgICAvLyBET1RBX0dBTUVSVUxFU19TVEFURV9HQU1FX0lOX1BST0dSRVNTID0gMTBcbiAgICAvLyDlnKjoh6rotbDmo4vmqKHlvI/kuIvvvIzlj6/og73muLjmiI/nirbmgIHkuI3lkIzvvIzmiYDku6XmlL7lrr3mnaHku7bmiJbnm7TmjqXmmL7npLpcbiAgICBsZXQgc2hvdWxkU2hvdyA9IGdhbWVTdGF0ZSA+PSA4ICYmIGdhbWVTdGF0ZSA8PSAxMDtcbiAgICAvLyDlpoLmnpzmmK/oh6rotbDmo4vmqKHlvI/vvIzljbPkvb/muLjmiI/nirbmgIHkuI3nrKblkIjvvIzkuZ/lsJ3or5XmmL7npLrvvIjlm6DkuLroh6rotbDmo4vlj6/og73mnInkuI3lkIznmoTnirbmgIHlgLzvvIlcbiAgICBpZiAoY3VycmVudE1vZGUgPT09ICdhdXRvY2hlc3MnKSB7XG4gICAgICAgICQuTXNnKCdBdXRvQ2hlc3MgbW9kZSBkZXRlY3RlZCAtIGZvcmNpbmcgSFVEIGRpc3BsYXknKTtcbiAgICAgICAgLy8g5Zyo6Ieq6LWw5qOL5qih5byP5LiL77yM5Y+q6KaB5LiN5piv5Yid5aeL5YyW6Zi25q615bCx5pi+56S6XG4gICAgICAgIHNob3VsZFNob3cgPSBnYW1lU3RhdGUgPj0gMTsgLy8g5pu05a695p2+55qE5p2h5Lu2XG4gICAgfVxuICAgICQuTXNnKGBTaG91bGQgc2hvdyBQbGF5aW5nIEhVRDogJHtzaG91bGRTaG93fSAobW9kZTogJHtjdXJyZW50TW9kZX0sIHN0YXRlOiAke2dhbWVTdGF0ZX0pYCk7XG4gICAgc2hvd1BsYXlpbmdIVUQoc2hvdWxkU2hvdyk7XG59XG4vLyDpmpDol4/ljp/nlJ8gRG90YSAyIFVJIOWFg+e0oFxuZnVuY3Rpb24gaGlkZU5hdGl2ZVVJKCkge1xuICAgICQuTXNnKCfwn46uIEhpZGluZyBuYXRpdmUgRG90YSAyIFVJIGVsZW1lbnRzLi4uJyk7XG4gICAgdHJ5IHtcbiAgICAgICAgLy8g6ZqQ6JeP5Y6f55SfIEhVRCDlhYPntKBcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfVE9QX1RJTUVPRkRBWSwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9UT1BfSEVST0VTLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0ZMWU9VVF9TQ09SRUJPQVJELCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0FDVElPTl9QQU5FTCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9BQ1RJT05fTUlOSU1BUCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUEFORUwsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1NIT1AsIGZhbHNlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX0lURU1TLCBmYWxzZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9RVUlDS0JVWSwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfQ09VUklFUiwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUFJPVEVDVCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfR09MRCwgZmFsc2UpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9TSE9QX1NVR0dFU1RFRElURU1TLCBmYWxzZSk7XG4gICAgICAgICQuTXNnKCfinIUgTmF0aXZlIFVJIGVsZW1lbnRzIGhpZGRlbiBzdWNjZXNzZnVsbHknKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBFcnJvciBoaWRpbmcgbmF0aXZlIFVJOicsIGUpO1xuICAgIH1cbn1cbi8vIOaBouWkjeWOn+eUnyBEb3RhIDIgVUkg5YWD57SgXG5mdW5jdGlvbiBzaG93TmF0aXZlVUkoKSB7XG4gICAgJC5Nc2coJ/Cfjq4gUmVzdG9yaW5nIG5hdGl2ZSBEb3RhIDIgVUkgZWxlbWVudHMuLi4nKTtcbiAgICB0cnkge1xuICAgICAgICAvLyDmgaLlpI3ljp/nlJ8gSFVEIOWFg+e0oFxuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9UT1BfVElNRU9GREFZLCB0cnVlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfVE9QX0hFUk9FUywgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0ZMWU9VVF9TQ09SRUJPQVJELCB0cnVlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfQUNUSU9OX1BBTkVMLCB0cnVlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfQUNUSU9OX01JTklNQVAsIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfUEFORUwsIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfU0hPUCwgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9JVEVNUywgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9RVUlDS0JVWSwgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX0lOVkVOVE9SWV9DT1VSSUVSLCB0cnVlKTtcbiAgICAgICAgR2FtZVVJLlNldERlZmF1bHRVSUVuYWJsZWQoRG90YURlZmF1bHRVSUVsZW1lbnRfdC5ET1RBX0RFRkFVTFRfVUlfSU5WRU5UT1JZX1BST1RFQ1QsIHRydWUpO1xuICAgICAgICBHYW1lVUkuU2V0RGVmYXVsdFVJRW5hYmxlZChEb3RhRGVmYXVsdFVJRWxlbWVudF90LkRPVEFfREVGQVVMVF9VSV9JTlZFTlRPUllfR09MRCwgdHJ1ZSk7XG4gICAgICAgIEdhbWVVSS5TZXREZWZhdWx0VUlFbmFibGVkKERvdGFEZWZhdWx0VUlFbGVtZW50X3QuRE9UQV9ERUZBVUxUX1VJX1NIT1BfU1VHR0VTVEVESVRFTVMsIHRydWUpO1xuICAgICAgICAkLk1zZygn4pyFIE5hdGl2ZSBVSSBlbGVtZW50cyByZXN0b3JlZCBzdWNjZXNzZnVsbHknKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBFcnJvciByZXN0b3JpbmcgbmF0aXZlIFVJOicsIGUpO1xuICAgIH1cbn1cbi8vIOWIneWni+WMllxuZnVuY3Rpb24gaW5pdGlhbGl6ZVBsYXlpbmdIVUQoKSB7XG4gICAgJC5Nc2coJ/Cfjq4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuICAgICQuTXNnKCfwn46uIElOSVRJQUxJWklORyBQTEFZSU5HIEhVRC4uLicpO1xuICAgICQuTXNnKCfwn46uID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbiAgICAvLyDpmpDol4/ljp/nlJ8gVUlcbiAgICBoaWRlTmF0aXZlVUkoKTtcbiAgICAvLyDnq4vljbPliJvlu7pIVUTvvIzkuI3nrYnlvoVcbiAgICBjcmVhdGVQbGF5aW5nSFVEKCk7XG4gICAgLy8g5YWI5by65Yi25pi+56S677yM55So5LqO5rWL6K+VXG4gICAgJC5Nc2coJ/Cfjq4gRm9yY2Ugc2hvd2luZyBIVUQgZm9yIHRlc3RpbmcuLi4nKTtcbiAgICBzaG93UGxheWluZ0hVRCh0cnVlKTtcbiAgICAvLyDlu7bov5/mo4Dmn6XmuLjmiI/nirbmgIHlkozmqKHlvI/vvIjnrYnlvoXnvZHnu5zooajmlbDmja7lkIzmraXvvIlcbiAgICAkLlNjaGVkdWxlKDEuMCwgKCkgPT4ge1xuICAgICAgICAkLk1zZygn8J+OriBDaGVja2luZyBnYW1lIHN0YXRlIGFuZCBtb2RlIGFmdGVyIDEgc2Vjb25kLi4uJyk7XG4gICAgICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuICAgIH0pO1xuICAgIC8vIOWGjeasoeW7tui/n+ajgOafpe+8jOehruS/nee9kee7nOihqOaVsOaNruW3suWQjOatpVxuICAgICQuU2NoZWR1bGUoMy4wLCAoKSA9PiB7XG4gICAgICAgICQuTXNnKCfwn46uIFJlLWNoZWNraW5nIGdhbWUgc3RhdGUgYW5kIG1vZGUgYWZ0ZXIgMyBzZWNvbmRzLi4uJyk7XG4gICAgICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuICAgIH0pO1xufVxuLy8g55uR5ZCs5ri45oiP54q25oCB5Y+Y5YyW5LqL5Lu2XG5HYW1lRXZlbnRzLlN1YnNjcmliZSgnZ2FtZV9zdGF0ZV9jaGFuZ2VkJywgKGRhdGEpID0+IHtcbiAgICAkLk1zZygnR2FtZSBzdGF0ZSBjaGFuZ2VkOicsIGRhdGEpO1xuICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xufSk7XG4vLyDnm5HlkKzmuLjmiI/mqKHlvI/lj5jljJbkuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX21vZGVfY2hhbmdlZCcsIChkYXRhKSA9PiB7XG4gICAgJC5Nc2coJ0dhbWUgbW9kZSBjaGFuZ2VkOicsIGRhdGEpO1xuICAgIGlmIChkYXRhICYmIGRhdGEubmV3TW9kZSkge1xuICAgICAgICAkLk1zZyhgTmV3IGdhbWUgbW9kZTogJHtkYXRhLm5ld01vZGV9YCk7XG4gICAgICAgIGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCgpO1xuICAgIH1cbn0pO1xuLy8g55uR5ZCs572R57uc6KGo5Lit55qE5ri45oiP5qih5byP5Y+Y5YyWXG5DdXN0b21OZXRUYWJsZXMuU3Vic2NyaWJlTmV0VGFibGVMaXN0ZW5lcignZ2FtZV9tb2RlJywgKHRhYmxlTmFtZSwga2V5LCBkYXRhKSA9PiB7XG4gICAgaWYgKGtleSA9PT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgICQuTXNnKCdHYW1lIG1vZGUgdXBkYXRlZCBpbiBOZXRUYWJsZTonLCBkYXRhKTtcbiAgICAgICAgY2hlY2tHYW1lU3RhdGVBbmRTaG93SFVEKCk7XG4gICAgfVxufSk7XG4vLyDnm5HlkKzmuLjmiI/lvIDlp4vkuovku7ZcbkdhbWVFdmVudHMuU3Vic2NyaWJlKCdnYW1lX3N0YXJ0JywgKCkgPT4ge1xuICAgICQuTXNnKCdHYW1lIHN0YXJ0ZWQgLSBzaG93aW5nIHBsYXlpbmcgSFVEJyk7XG4gICAgc2hvd1BsYXlpbmdIVUQodHJ1ZSk7XG59KTtcbi8vIOebkeWQrOa4uOaIj+e7k+adn+S6i+S7tlxuR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2dhbWVfZW5kJywgKCkgPT4ge1xuICAgICQuTXNnKCdHYW1lIGVuZGVkIC0gaGlkaW5nIHBsYXlpbmcgSFVEJyk7XG4gICAgc2hvd1BsYXlpbmdIVUQoZmFsc2UpO1xufSk7XG4vLyDlrprmnJ/mo4Dmn6XmuLjmiI/nirbmgIHvvIjlpIfnlKjmlrnmoYjvvIlcbmZ1bmN0aW9uIHN0YXJ0R2FtZVN0YXRlTW9uaXRvcigpIHtcbiAgICBjb25zdCBjaGVja0ludGVydmFsID0gKCkgPT4ge1xuICAgICAgICBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQoKTtcbiAgICAgICAgJC5TY2hlZHVsZSgyLjAsIGNoZWNrSW50ZXJ2YWwpOyAvLyDmr48y56eS5qOA5p+l5LiA5qyhXG4gICAgfTtcbiAgICAkLlNjaGVkdWxlKDUuMCwgY2hlY2tJbnRlcnZhbCk7IC8vIDXnp5LlkI7lvIDlp4vnm5Hmjqdcbn1cbi8vIOWvvOWHuuWFqOWxgOWHveaVsFxuZ2xvYmFsVGhpcy5QbGF5aW5nSFVEID0ge1xuICAgIGNyZWF0ZTogY3JlYXRlUGxheWluZ0hVRCxcbiAgICBzaG93OiBzaG93UGxheWluZ0hVRCxcbiAgICBjaGVja1N0YXRlOiBjaGVja0dhbWVTdGF0ZUFuZFNob3dIVUQsXG4gICAgdXBkYXRlSGVhbHRoOiB1cGRhdGVIZWFsdGhCYXIsXG4gICAgdXBkYXRlTWFuYTogdXBkYXRlTWFuYUJhcixcbiAgICBhZGRMb2c6IGFkZEJhdHRsZUxvZyxcbiAgICBzaG93QWxlcnQ6IHNob3dDZW50ZXJBbGVydCxcbiAgICBoaWRlTmF0aXZlVUk6IGhpZGVOYXRpdmVVSSxcbiAgICBzaG93TmF0aXZlVUk6IHNob3dOYXRpdmVVSVxufTtcbi8vIOeri+WNs+aJp+ihjOWIneWni+WMllxuaW5pdGlhbGl6ZVBsYXlpbmdIVUQoKTtcbi8vIOWQr+WKqOa4uOaIj+eKtuaAgeebkeaOp1xuc3RhcnRHYW1lU3RhdGVNb25pdG9yKCk7XG4vLyDmt7vliqDlhajlsYDmtYvor5Xlh73mlbBcbmdsb2JhbFRoaXMuVGVzdFBsYXlpbmdIVUQgPSB7XG4gICAgc2hvdzogKCkgPT4gc2hvd1BsYXlpbmdIVUQodHJ1ZSksXG4gICAgaGlkZTogKCkgPT4gc2hvd1BsYXlpbmdIVUQoZmFsc2UpLFxuICAgIGNoZWNrU3RhdGU6IGNoZWNrR2FtZVN0YXRlQW5kU2hvd0hVRCxcbiAgICBoaWRlTmF0aXZlOiBoaWRlTmF0aXZlVUksXG4gICAgc2hvd05hdGl2ZTogc2hvd05hdGl2ZVVJLFxuICAgIGZvcmNlU2hvdzogKCkgPT4ge1xuICAgICAgICAkLk1zZygnRm9yY2Ugc2hvd2luZyBQbGF5aW5nIEhVRCBmb3IgdGVzdGluZy4uLicpO1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSAkLkdldENvbnRleHRQYW5lbCgpLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnUGxheWluZ0hVRENvbnRhaW5lcicpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAgICAgY3JlYXRlUGxheWluZ0hVRCgpO1xuICAgICAgICB9XG4gICAgICAgIHNob3dQbGF5aW5nSFVEKHRydWUpO1xuICAgIH1cbn07XG4kLk1zZygn8J+OriA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Jyk7XG4kLk1zZygn8J+OriBQTEFZSU5HIEhVRCBNT0RVTEUgTE9BREVEIENPTVBMRVRFTFkhJyk7XG4kLk1zZygn8J+OriBUZXN0IGNvbW1hbmRzIGF2YWlsYWJsZTonKTtcbiQuTXNnKCfwn46uIC0gVGVzdFBsYXlpbmdIVUQuc2hvdygpJyk7XG4kLk1zZygn8J+OriAtIFRlc3RQbGF5aW5nSFVELmhpZGUoKScpO1xuJC5Nc2coJ/Cfjq4gLSBUZXN0UGxheWluZ0hVRC5mb3JjZVNob3coKScpO1xuJC5Nc2coJ/Cfjq4gLSBUZXN0UGxheWluZ0hVRC5oaWRlTmF0aXZlKCkgLSDpmpDol4/ljp/nlJ9VSScpO1xuJC5Nc2coJ/Cfjq4gLSBUZXN0UGxheWluZ0hVRC5zaG93TmF0aXZlKCkgLSDmmL7npLrljp/nlJ9VSScpO1xuJC5Nc2coJ/Cfjq4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PScpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9