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
/*!****************************************************************************************************************!*\
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\battleEndView\index.tsx ***!
  \****************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
var _a;
// @ts-nocheck
// 战斗结算界面 - 基于 playing-hud 的设计经验
Game.EmitSound('General.ButtonClick');
$.Msg('🏆 Battle End View script loading...');
// 主题配置（保持与 playing-hud 一致）
const BATTLE_END_THEME = {
    background: 'rgba(15, 23, 42, 0.95)',
    panelBg: 'rgba(33, 34, 31, 0.95)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
    textPrimary: '#3b82f6',
    textSecondary: '#ffffff',
    textAccent: '#ffc57a',
    success: '#4caf50',
    warning: '#ff9800',
    danger: '#f44336',
    victoryGlow: '#ffd700',
    defeatGlow: '#ff4444',
};
// 获取根面板
function getRoot() {
    return $.GetContextPanel();
}
// 查找子面板（从 layout 文件）
function find(id) {
    return getRoot().FindChildInLayoutFile(id);
}
// 查找动态创建的子面板
function findChild(parent, id) {
    return parent.FindChild(id);
}
// 创建结算容器（像 playing-hud 一样动态创建）
function createBattleEndContainer() {
    var _a;
    $.Msg('📦 Creating battle end container...');
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('❌ Error: Root panel not found');
        return null;
    }
    // 检查是否已存在
    let container = rootPanel.FindChild('BattleEndContainer');
    if (container && container.IsValid()) {
        $.Msg('[BattleEndView] Container already exists, reusing');
        return container;
    }
    // 删除已存在的无效容器
    if (container && !container.IsValid()) {
        container.DeleteAsync(0);
    }
    // 创建主容器 - 使用与 playing-hud 完全相同的方式
    container = $.CreatePanel('Panel', rootPanel, 'BattleEndContainer');
    if (!container) {
        $.Msg('❌ Failed to create container panel');
        return null;
    }
    // 立即验证父元素
    const containerParent = container.GetParent();
    if (!containerParent) {
        $.Msg('❌ Container created but has no parent!');
        container.DeleteAsync(0);
        return null;
    }
    if (containerParent !== rootPanel) {
        $.Msg(`⚠️ Container parent (${containerParent.id}) is not root panel (${rootPanel.id})`);
    }
    container.AddClass('battle_end_container');
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.horizontalAlign = 'center';
    container.style.verticalAlign = 'center';
    container.style.visibility = 'collapse'; // 默认隐藏
    container.style.zIndex = '10000'; // 比 playing-hud (1000) 高
    container.hittest = false;
    $.Msg(`[BattleEndView] Container created, parent: ${((_a = container.GetParent()) === null || _a === void 0 ? void 0 : _a.id) || 'null'}`);
    // 确保容器在根面板的最后（最上层）
    try {
        const rootChildren = rootPanel.Children();
        if (rootChildren.length > 1) {
            const lastChild = rootChildren[rootChildren.length - 1];
            if (lastChild !== container) {
                container.MoveChildAfter(container, lastChild);
            }
        }
    }
    catch (e) {
        $.Msg(`[BattleEndView] Note: Could not move container to top: ${e}`);
    }
    // 半透明遮罩
    const mask = $.CreatePanel('Panel', container, 'BattleEndMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    mask.style.horizontalAlign = 'center';
    mask.style.verticalAlign = 'center';
    mask.hittest = true; // 拦截点击
    $.Msg('✅ Battle end container created');
    return container;
}
// 获取结算容器
function getBattleEndContainer() {
    const root = getRoot();
    // 优先从 layout 查找（布局文件中已定义）
    let container = root.FindChildInLayoutFile('BattleEndContainer');
    // 如果找不到，尝试直接查找（动态创建的）
    if (!container) {
        container = root.FindChild('BattleEndContainer');
    }
    return container;
}
// 更新标题区域（使用 layout 中的面板）
function updateTitleSection(titleSection, result) {
    // 清空旧内容（保留 layout 中定义的子元素）
    const existingChildren = titleSection.Children();
    for (let i = 0; i < existingChildren.length; i++) {
        const child = existingChildren[i];
        if (child.id !== 'ResultTitle' && child.id !== 'RoundInfo' && child.id !== 'LevelInfo') {
            child.DeleteAsync(0);
        }
    }
    // 更新或创建标题
    let resultTitle = titleSection.FindChild('ResultTitle');
    if (!resultTitle) {
        resultTitle = $.CreatePanel('Label', titleSection, 'ResultTitle');
    }
    resultTitle.style.fontSize = '64px';
    resultTitle.style.fontWeight = 'bold';
    resultTitle.style.textAlign = 'center';
    resultTitle.style.horizontalAlign = 'center';
    resultTitle.style.marginBottom = '10px';
    resultTitle.style.textShadow = '0px 0px 20px rgba(0, 0, 0, 0.8)';
    if (result.winner === 'player') {
        resultTitle.text = '🎉 胜利！';
        resultTitle.style.color = BATTLE_END_THEME.success;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.victoryGlow}`;
    }
    else if (result.winner === 'enemy') {
        resultTitle.text = '💀 失败';
        resultTitle.style.color = BATTLE_END_THEME.danger;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.defeatGlow}`;
    }
    else {
        resultTitle.text = '🤝 平局';
        resultTitle.style.color = BATTLE_END_THEME.warning;
    }
    // 更新回合信息
    let roundInfo = titleSection.FindChild('RoundInfo');
    if (!roundInfo) {
        roundInfo = $.CreatePanel('Label', titleSection, 'RoundInfo');
    }
    roundInfo.text = `第 ${result.round} 回合结束`;
    roundInfo.style.fontSize = '28px';
    roundInfo.style.color = BATTLE_END_THEME.textAccent;
    roundInfo.style.textAlign = 'center';
    roundInfo.style.horizontalAlign = 'center';
    roundInfo.style.marginBottom = '5px';
    // 更新关卡信息
    let levelInfo = titleSection.FindChild('LevelInfo');
    if (result.levelName) {
        if (!levelInfo) {
            levelInfo = $.CreatePanel('Label', titleSection, 'LevelInfo');
        }
        levelInfo.text = `关卡：${result.levelName}`;
        levelInfo.style.fontSize = '20px';
        levelInfo.style.color = BATTLE_END_THEME.textSecondary;
        levelInfo.style.textAlign = 'center';
        levelInfo.style.horizontalAlign = 'center';
        levelInfo.style.opacity = '0.8';
        levelInfo.style.visibility = 'visible';
    }
    else if (levelInfo) {
        levelInfo.style.visibility = 'collapse';
    }
}
// 创建标题区域（保留用于兼容）
function createTitleSection(parent, result) {
    const titleSection = $.CreatePanel('Panel', parent, 'BattleEndTitle');
    titleSection.style.width = '100%';
    titleSection.style.height = '150px';
    titleSection.style.flowChildren = 'down';
    titleSection.style.horizontalAlign = 'center';
    titleSection.style.marginBottom = '30px';
    // 胜负标题
    const resultTitle = $.CreatePanel('Label', titleSection, 'ResultTitle');
    resultTitle.style.fontSize = '64px';
    resultTitle.style.fontWeight = 'bold';
    resultTitle.style.textAlign = 'center';
    resultTitle.style.horizontalAlign = 'center';
    resultTitle.style.marginBottom = '10px';
    resultTitle.style.textShadow = '0px 0px 20px rgba(0, 0, 0, 0.8)';
    if (result.winner === 'player') {
        resultTitle.text = '🎉 胜利！';
        resultTitle.style.color = BATTLE_END_THEME.success;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.victoryGlow}`;
    }
    else if (result.winner === 'enemy') {
        resultTitle.text = '💀 失败';
        resultTitle.style.color = BATTLE_END_THEME.danger;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.defeatGlow}`;
    }
    else {
        resultTitle.text = '🤝 平局';
        resultTitle.style.color = BATTLE_END_THEME.warning;
    }
    // 回合信息
    const roundInfo = $.CreatePanel('Label', titleSection, 'RoundInfo');
    roundInfo.text = `第 ${result.round} 回合结束`;
    roundInfo.style.fontSize = '28px';
    roundInfo.style.color = BATTLE_END_THEME.textAccent;
    roundInfo.style.textAlign = 'center';
    roundInfo.style.horizontalAlign = 'center';
    roundInfo.style.marginBottom = '5px';
    // 关卡信息
    if (result.levelName) {
        const levelInfo = $.CreatePanel('Label', titleSection, 'LevelInfo');
        levelInfo.text = `关卡：${result.levelName}`;
        levelInfo.style.fontSize = '20px';
        levelInfo.style.color = BATTLE_END_THEME.textSecondary;
        levelInfo.style.textAlign = 'center';
        levelInfo.style.horizontalAlign = 'center';
        levelInfo.style.opacity = '0.8';
    }
    return titleSection;
}
// 更新统计信息区域（使用 layout 中的面板）
function updateStatsSection(statsSection, result) {
    // 清空统计行（保留标题）
    const existingChildren = statsSection.Children();
    for (let i = 0; i < existingChildren.length; i++) {
        const child = existingChildren[i];
        if (child.id !== 'StatsTitle') {
            child.DeleteAsync(0);
        }
    }
    // 确保标题存在
    let statsTitle = statsSection.FindChild('StatsTitle');
    if (!statsTitle) {
        statsTitle = $.CreatePanel('Label', statsSection, 'StatsTitle');
        statsTitle.text = '战斗统计';
        statsTitle.style.fontSize = '24px';
        statsTitle.style.color = BATTLE_END_THEME.textPrimary;
        statsTitle.style.fontWeight = 'bold';
        statsTitle.style.marginBottom = '15px';
    }
    // 统计数据
    const stats = result.stats || {};
    createStatLine(statsSection, '战斗时长', `${Math.floor(result.duration / 1000)}秒`, 0);
    if (stats.damageDealt !== undefined) {
        createStatLine(statsSection, '造成伤害', formatNumber(stats.damageDealt), 1);
    }
    if (stats.damageTaken !== undefined) {
        createStatLine(statsSection, '承受伤害', formatNumber(stats.damageTaken), 2);
    }
    if (stats.unitsKilled !== undefined) {
        createStatLine(statsSection, '击杀单位', stats.unitsKilled.toString(), 3);
    }
    if (stats.unitsSurvived !== undefined) {
        createStatLine(statsSection, '存活单位', stats.unitsSurvived.toString(), 4);
    }
}
// 创建统计信息区域（保留用于兼容）
function createStatsSection(parent, result) {
    const statsSection = $.CreatePanel('Panel', parent, 'BattleEndStats');
    statsSection.style.width = '100%';
    statsSection.style.height = '200px';
    statsSection.style.flowChildren = 'down';
    statsSection.style.marginBottom = '30px';
    statsSection.style.padding = '20px';
    statsSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    statsSection.style.borderRadius = '10px';
    // 标题
    const statsTitle = $.CreatePanel('Label', statsSection, 'StatsTitle');
    statsTitle.text = '战斗统计';
    statsTitle.style.fontSize = '24px';
    statsTitle.style.color = BATTLE_END_THEME.textPrimary;
    statsTitle.style.fontWeight = 'bold';
    statsTitle.style.marginBottom = '15px';
    // 统计数据
    const stats = result.stats || {};
    createStatLine(statsSection, '战斗时长', `${Math.floor(result.duration / 1000)}秒`, 0);
    if (stats.damageDealt !== undefined) {
        createStatLine(statsSection, '造成伤害', formatNumber(stats.damageDealt), 1);
    }
    if (stats.damageTaken !== undefined) {
        createStatLine(statsSection, '承受伤害', formatNumber(stats.damageTaken), 2);
    }
    if (stats.unitsKilled !== undefined) {
        createStatLine(statsSection, '击杀单位', stats.unitsKilled.toString(), 3);
    }
    if (stats.unitsSurvived !== undefined) {
        createStatLine(statsSection, '存活单位', stats.unitsSurvived.toString(), 4);
    }
    return statsSection;
}
// 创建单个统计行
function createStatLine(parent, label, value, index) {
    const line = $.CreatePanel('Panel', parent, `StatLine_${index}`);
    line.style.width = '100%';
    line.style.height = '30px';
    line.style.flowChildren = 'right';
    line.style.marginTop = '5px';
    const labelText = $.CreatePanel('Label', line, `StatLabel_${index}`);
    labelText.text = label;
    labelText.style.fontSize = '18px';
    labelText.style.color = BATTLE_END_THEME.textSecondary;
    labelText.style.width = 'fill-parent-flow(1)';
    labelText.style.opacity = '0.8';
    const valueText = $.CreatePanel('Label', line, `StatValue_${index}`);
    valueText.text = value;
    valueText.style.fontSize = '20px';
    valueText.style.color = BATTLE_END_THEME.textAccent;
    valueText.style.fontWeight = 'bold';
    valueText.style.textAlign = 'right';
}
// 更新按钮区域（使用 layout 中的面板）
function updateButtonsSection(buttonsSection, result) {
    // 清空所有按钮
    buttonsSection.RemoveAndDeleteChildren();
    if (result.winner === 'player') {
        // 胜利时显示两个按钮
        buttonsSection.style.flowChildren = 'right';
        buttonsSection.style.horizontalAlign = 'center';
        // 选择关卡按钮
        const selectLevelBtn = createStyledButton(buttonsSection, 'SelectLevelButton', '🗺️ 选择关卡', () => {
            $.Msg('🗺️ Opening level selection...');
            Game.EmitSound('ui.button_click');
            hideView();
            GameEvents.SendCustomGameEventToServer('open_level_selection', {});
        });
        selectLevelBtn.style.marginRight = '20px';
        // 退出游戏按钮
        createStyledButton(buttonsSection, 'QuitGameButton', '🚪 退出游戏', () => {
            $.Msg('🚪 Quitting game...');
            Game.EmitSound('ui.button_click');
            GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
        });
    }
    else {
        // 失败时只显示退出按钮（居中）
        buttonsSection.style.flowChildren = 'none';
        const quitBtn = createStyledButton(buttonsSection, 'QuitGameButton', '🚪 退出游戏', () => {
            $.Msg('🚪 Quitting game after defeat...');
            Game.EmitSound('ui.button_click');
            GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
        });
        quitBtn.style.horizontalAlign = 'center';
    }
}
// 创建按钮区域（保留用于兼容）
function createButtonsSection(parent, result) {
    const buttonsSection = $.CreatePanel('Panel', parent, 'BattleEndButtons');
    buttonsSection.style.width = '100%';
    buttonsSection.style.height = '100px';
    buttonsSection.style.flowChildren = 'right';
    buttonsSection.style.horizontalAlign = 'center';
    if (result.winner === 'player') {
        // 胜利时显示两个按钮
        // 选择关卡按钮
        const selectLevelBtn = createStyledButton(buttonsSection, 'SelectLevelButton', '🗺️ 选择关卡', () => {
            $.Msg('🗺️ Opening level selection...');
            Game.EmitSound('ui.button_click');
            hideView();
            // TODO: 打开关卡选择界面
            GameEvents.SendCustomGameEventToServer('open_level_selection', {});
        });
        selectLevelBtn.style.marginRight = '20px';
        // 退出游戏按钮
        createStyledButton(buttonsSection, 'QuitGameButton', '🚪 退出游戏', () => {
            $.Msg('🚪 Quitting game...');
            Game.EmitSound('ui.button_click');
            GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
        });
    }
    else {
        // 失败时只显示退出按钮（居中）
        buttonsSection.style.flowChildren = 'none';
        const quitBtn = createStyledButton(buttonsSection, 'QuitGameButton', '🚪 退出游戏', () => {
            $.Msg('🚪 Quitting game after defeat...');
            Game.EmitSound('ui.button_click');
            GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
        });
        quitBtn.style.horizontalAlign = 'center';
    }
    return buttonsSection;
}
// 创建样式化按钮（参考 playing-hud 风格）
function createStyledButton(parent, id, text, onClick) {
    const button = $.CreatePanel('Button', parent, id);
    button.AddClass('battle_end_button');
    button.style.width = '280px';
    button.style.height = '60px';
    button.style.backgroundColor = BATTLE_END_THEME.textPrimary;
    button.style.border = '2px solid rgba(255, 255, 255, 0.3)';
    button.style.borderRadius = '10px';
    button.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.3)';
    const label = $.CreatePanel('Label', button, `${id}_Label`);
    label.text = text;
    label.style.fontSize = '24px';
    label.style.color = '#ffffff';
    label.style.fontWeight = 'bold';
    label.style.textAlign = 'center';
    label.style.verticalAlign = 'center';
    label.style.horizontalAlign = 'center';
    label.style.width = '100%';
    label.style.height = '100%';
    label.style.textShadow = '2px 2px 4px #000000';
    label.hittest = false;
    button.SetPanelEvent('onactivate', () => {
        $.Msg(`[BattleEndView] Button clicked: ${text}`);
        onClick();
    });
    // 悬停效果
    button.SetPanelEvent('onmouseover', () => {
        button.style.backgroundColor = BATTLE_END_THEME.textAccent;
        button.style.transform = 'scale3d(1.05, 1.05, 1.0)';
        Game.EmitSound('ui.button_over');
    });
    button.SetPanelEvent('onmouseout', () => {
        button.style.backgroundColor = BATTLE_END_THEME.textPrimary;
        button.style.transform = 'scale3d(1.0, 1.0, 1.0)';
    });
    return button;
}
// 格式化数字
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
// 显示结算界面（完全动态创建，像 playing-hud 一样）
function showView(result) {
    $.Msg('🏆 Showing battle end view with result:', result);
    // 获取根面板（与 playing-hud 完全一致）
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('❌ Root panel not found');
        return;
    }
    $.Msg(`[BattleEndView] Root panel id: ${rootPanel.id || 'empty'}, size: ${rootPanel.actuallayoutwidth}x${rootPanel.actuallayoutheight}, children: ${rootPanel.Children().length}`);
    // 如果根面板尺寸为 0，使用屏幕分辨率作为备用
    let useScreenSize = false;
    if (rootPanel.actuallayoutwidth === 0 || rootPanel.actuallayoutheight === 0) {
        $.Msg('[BattleEndView] ⚠️ Root panel size is 0, will use screen resolution');
        useScreenSize = true;
    }
    // 删除已存在的容器（如果存在）
    let existingContainer = rootPanel.FindChild('BattleEndContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    existingContainer = rootPanel.FindChildInLayoutFile('BattleEndContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    // 完全动态创建容器（像 playing-hud 一样）
    $.Msg('[BattleEndView] Creating container dynamically (like playing-hud)...');
    const container = $.CreatePanel('Panel', rootPanel, 'BattleEndContainer');
    if (!container) {
        $.Msg('❌ Failed to create container');
        return;
    }
    // 设置容器样式（与 playing-hud 完全一致的方式）
    container.AddClass('battle_end_container');
    // 如果根面板尺寸为 0，使用屏幕分辨率
    if (useScreenSize) {
        // 获取屏幕分辨率（通常 Panorama 使用 1920x1080 或实际分辨率）
        const screenWidth = Game.GetScreenWidth();
        const screenHeight = Game.GetScreenHeight();
        $.Msg(`[BattleEndView] Using screen size: ${screenWidth}x${screenHeight}`);
        container.style.width = `${screenWidth}px`;
        container.style.height = `${screenHeight}px`;
    }
    else {
        container.style.width = '100%';
        container.style.height = '100%';
    }
    container.style.horizontalAlign = 'center';
    container.style.verticalAlign = 'center';
    container.style.zIndex = '10000'; // 比 playing-hud (1000) 高
    container.hittest = false;
    container.style.visibility = 'visible'; // 显式设置为可见
    // 验证父元素
    const containerParent = container.GetParent();
    if (!containerParent) {
        $.Msg('❌ Container has no parent!');
        return;
    }
    $.Msg(`[BattleEndView] Container parent: ${containerParent.id || 'root'}, parent size: ${containerParent.actuallayoutwidth}x${containerParent.actuallayoutheight}`);
    // 创建遮罩
    const mask = $.CreatePanel('Panel', container, 'BattleEndMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    mask.style.horizontalAlign = 'center';
    mask.style.verticalAlign = 'center';
    mask.hittest = true;
    // 创建主面板（完全动态创建）
    const main = $.CreatePanel('Panel', container, 'BattleEndMain');
    main.style.width = '800px';
    main.style.height = '600px';
    main.style.backgroundColor = BATTLE_END_THEME.panelBg;
    main.style.border = `2px solid ${BATTLE_END_THEME.borderColor}`;
    main.style.borderRadius = '20px';
    main.style.boxShadow = '0px 0px 40px rgba(0, 0, 0, 0.8)';
    main.style.horizontalAlign = 'center';
    main.style.verticalAlign = 'center';
    main.style.flowChildren = 'down';
    main.style.padding = '40px';
    // 创建各个区域（完全动态创建）
    createTitleSection(main, result);
    createStatsSection(main, result);
    createButtonsSection(main, result);
    // 确保容器在根面板的最后（最上层）
    try {
        const rootChildren = rootPanel.Children();
        if (rootChildren.length > 1) {
            const lastChild = rootChildren[rootChildren.length - 1];
            if (lastChild !== container) {
                container.MoveChildAfter(container, lastChild);
                $.Msg(`[BattleEndView] Container moved to top`);
            }
        }
    }
    catch (e) {
        $.Msg(`[BattleEndView] Note: Could not move container: ${e}`);
    }
    // 强制刷新布局
    container.SetHasClass('battle_end_container', true);
    // 最终验证
    const finalParent = container.GetParent();
    $.Msg(`[BattleEndView] ✅ Container visibility: ${container.style.visibility}`);
    $.Msg(`[BattleEndView] ✅ Container zIndex: ${container.style.zIndex}`);
    $.Msg(`[BattleEndView] ✅ Container parent: ${finalParent ? (finalParent.id || 'root') : 'null'}`);
    $.Msg(`[BattleEndView] ✅ Container valid: ${container.IsValid()}`);
    $.Msg(`[BattleEndView] ✅ Container style width: ${container.style.width}, height: ${container.style.height}`);
    if (finalParent) {
        $.Msg(`[BattleEndView] ✅ Parent size: ${finalParent.actuallayoutwidth}x${finalParent.actuallayoutheight}`);
    }
    $.Msg(`[BattleEndView] ✅ Main panel children: ${main.Children().length}`);
    // 延迟检查实际尺寸（Panorama 需要时间计算布局）
    $.Schedule(0.1, () => {
        const actualWidth = container.actuallayoutwidth;
        const actualHeight = container.actuallayoutheight;
        $.Msg(`[BattleEndView] ✅ Container actual size (after 0.1s): ${actualWidth}x${actualHeight}`);
        // 如果尺寸仍然为 0，使用屏幕分辨率
        if (actualWidth === 0 || actualHeight === 0) {
            $.Msg('[BattleEndView] ⚠️ Container size is still 0, using screen resolution...');
            const screenWidth = Game.GetScreenWidth();
            const screenHeight = Game.GetScreenHeight();
            container.style.width = `${screenWidth}px`;
            container.style.height = `${screenHeight}px`;
            $.Msg(`[BattleEndView] Set container size to ${screenWidth}x${screenHeight}px`);
            // 再次检查
            $.Schedule(0.1, () => {
                const newWidth = container.actuallayoutwidth;
                const newHeight = container.actuallayoutheight;
                $.Msg(`[BattleEndView] ✅ Container size after fix: ${newWidth}x${newHeight}`);
            });
        }
    });
    // 播放音效
    if (result.winner === 'player') {
        Game.EmitSound('ui.victory');
    }
    else if (result.winner === 'enemy') {
        Game.EmitSound('ui.defeat');
    }
    $.Msg('✅ Battle end view shown successfully');
}
// 隐藏结算界面
function hideView() {
    const container = getBattleEndContainer();
    if (container) {
        container.style.visibility = 'collapse';
        $.Msg('🔒 Battle end view hidden');
    }
    else {
        $.Msg('⚠️ BattleEndContainer not found when trying to hide');
    }
}
// 处理战斗结束事件
function handleBattleEnded(data) {
    $.Msg('[BattleEndView] Battle ended event received:', data);
    const result = data.result || {};
    // 转换数据格式
    const battleResult = {
        winner: result.winner || 'draw',
        round: result.round || 1,
        duration: result.duration || 0,
        stats: result.stats,
        levelId: result.levelId,
        levelName: result.levelName
    };
    // 延迟显示，让战斗场景有时间清理
    $.Schedule(0.5, () => {
        showView(battleResult);
    });
}
// 处理波次结算事件（自走棋模式）
function handleWaveSettlement(data) {
    $.Msg('[BattleEndView] Wave settlement event received:', data);
    // 从 AutoChessMode 获取胜负信息
    // 注意：stats 应该来自 data.stats，而不是 data.playerSummary
    const battleResult = {
        winner: data.winner || 'player', // 默认玩家胜利
        round: data.round || 1,
        duration: data.duration || 0,
        stats: data.stats || {}, // 使用 data.stats 而不是 data.playerSummary
        levelName: data.levelName || undefined
    };
    $.Msg('[BattleEndView] Processed battle result:', battleResult);
    showView(battleResult);
}
// 初始化事件订阅
function initializeEventListeners() {
    $.Msg('📡 Initializing battle end view event listeners...');
    // 监听战斗结束事件
    GameEvents.Subscribe('battle_ended', handleBattleEnded);
    // 监听自走棋波次结算
    GameEvents.Subscribe('autochess_wave_settlement', handleWaveSettlement);
    // 监听关闭事件
    GameEvents.Subscribe('battle_end_dismiss', hideView);
    GameEvents.Subscribe('autochess_wave_settlement_dismiss', hideView);
    $.Msg('✅ Event listeners initialized');
}
// 初始化（像 playing-hud 一样）
function initializeBattleEndView() {
    $.Msg('🚀 Initializing Battle End View...');
    // 立即创建容器，不等待
    createBattleEndContainer();
    // 初始化事件监听
    initializeEventListeners();
    $.Msg('✅ Battle End View initialized successfully');
}
// 测试用的 showDummy 函数
function showDummy() {
    showView({
        winner: 'player',
        round: 1,
        duration: 0,
        stats: {
            damageDealt: 12540,
            damageTaken: 8320,
            unitsKilled: 5
        },
        levelName: '测试关卡'
    });
}
// 暴露全局API（用于调试）
globalThis.BattleEndView = {
    show: showView,
    hide: hideView,
    showDummy: showDummy,
    // 测试数据
    showVictory: () => {
        showView({
            winner: 'player',
            round: 5,
            duration: 45000,
            stats: {
                damageDealt: 12540,
                damageTaken: 8320,
                unitsKilled: 15,
                unitsSurvived: 5
            },
            levelName: '绿意平原'
        });
    },
    showDefeat: () => {
        showView({
            winner: 'enemy',
            round: 3,
            duration: 32000,
            stats: {
                damageDealt: 5420,
                damageTaken: 15680,
                unitsKilled: 8,
                unitsSurvived: 0
            },
            levelName: '霜冻峡谷'
        });
    }
};
// 启动
initializeBattleEndView();
// 添加调试信息
$.Msg('[BattleEndView] ✅ BattleEndView module loaded and exported to globalThis');
$.Msg('[BattleEndView] ✅ BattleEndView object:', globalThis.BattleEndView);
$.Msg('[BattleEndView] ✅ BattleEndView.show function:', typeof ((_a = globalThis.BattleEndView) === null || _a === void 0 ? void 0 : _a.show));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bmFsIHZhciBcIiRcIiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL0Q6XFxTdGVhbUFwcFxcc3RlYW1hcHBzXFxjb21tb25cXGRvdGEgMiBiZXRhXFxjb250ZW50XFxkb3RhX2FkZG9uc1xcZnVzaW9uXFxwYW5vcmFtYVxcc3JjXFxiYXR0bGVFbmRWaWV3XFxpbmRleC50c3giXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSAkOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJ2YXIgX2E7XG4vLyBAdHMtbm9jaGVja1xuLy8g5oiY5paX57uT566X55WM6Z2iIC0g5Z+65LqOIHBsYXlpbmctaHVkIOeahOiuvuiuoee7j+mqjFxuR2FtZS5FbWl0U291bmQoJ0dlbmVyYWwuQnV0dG9uQ2xpY2snKTtcbiQuTXNnKCfwn4+GIEJhdHRsZSBFbmQgVmlldyBzY3JpcHQgbG9hZGluZy4uLicpO1xuLy8g5Li76aKY6YWN572u77yI5L+d5oyB5LiOIHBsYXlpbmctaHVkIOS4gOiHtO+8iVxuY29uc3QgQkFUVExFX0VORF9USEVNRSA9IHtcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgxNSwgMjMsIDQyLCAwLjk1KScsXG4gICAgcGFuZWxCZzogJ3JnYmEoMzMsIDM0LCAzMSwgMC45NSknLFxuICAgIGJvcmRlckNvbG9yOiAncmdiYSg1OSwgMTMwLCAyNDYsIDAuNCknLFxuICAgIHRleHRQcmltYXJ5OiAnIzNiODJmNicsXG4gICAgdGV4dFNlY29uZGFyeTogJyNmZmZmZmYnLFxuICAgIHRleHRBY2NlbnQ6ICcjZmZjNTdhJyxcbiAgICBzdWNjZXNzOiAnIzRjYWY1MCcsXG4gICAgd2FybmluZzogJyNmZjk4MDAnLFxuICAgIGRhbmdlcjogJyNmNDQzMzYnLFxuICAgIHZpY3RvcnlHbG93OiAnI2ZmZDcwMCcsXG4gICAgZGVmZWF0R2xvdzogJyNmZjQ0NDQnLFxufTtcbi8vIOiOt+WPluaguemdouadv1xuZnVuY3Rpb24gZ2V0Um9vdCgpIHtcbiAgICByZXR1cm4gJC5HZXRDb250ZXh0UGFuZWwoKTtcbn1cbi8vIOafpeaJvuWtkOmdouadv++8iOS7jiBsYXlvdXQg5paH5Lu277yJXG5mdW5jdGlvbiBmaW5kKGlkKSB7XG4gICAgcmV0dXJuIGdldFJvb3QoKS5GaW5kQ2hpbGRJbkxheW91dEZpbGUoaWQpO1xufVxuLy8g5p+l5om+5Yqo5oCB5Yib5bu655qE5a2Q6Z2i5p2/XG5mdW5jdGlvbiBmaW5kQ2hpbGQocGFyZW50LCBpZCkge1xuICAgIHJldHVybiBwYXJlbnQuRmluZENoaWxkKGlkKTtcbn1cbi8vIOWIm+W7uue7k+eul+WuueWZqO+8iOWDjyBwbGF5aW5nLWh1ZCDkuIDmoLfliqjmgIHliJvlu7rvvIlcbmZ1bmN0aW9uIGNyZWF0ZUJhdHRsZUVuZENvbnRhaW5lcigpIHtcbiAgICB2YXIgX2E7XG4gICAgJC5Nc2coJ/Cfk6YgQ3JlYXRpbmcgYmF0dGxlIGVuZCBjb250YWluZXIuLi4nKTtcbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCfinYwgRXJyb3I6IFJvb3QgcGFuZWwgbm90IGZvdW5kJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyDmo4Dmn6XmmK/lkKblt7LlrZjlnKhcbiAgICBsZXQgY29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZCgnQmF0dGxlRW5kQ29udGFpbmVyJyk7XG4gICAgaWYgKGNvbnRhaW5lciAmJiBjb250YWluZXIuSXNWYWxpZCgpKSB7XG4gICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gQ29udGFpbmVyIGFscmVhZHkgZXhpc3RzLCByZXVzaW5nJyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIC8vIOWIoOmZpOW3suWtmOWcqOeahOaXoOaViOWuueWZqFxuICAgIGlmIChjb250YWluZXIgJiYgIWNvbnRhaW5lci5Jc1ZhbGlkKCkpIHtcbiAgICAgICAgY29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgIH1cbiAgICAvLyDliJvlu7rkuLvlrrnlmaggLSDkvb/nlKjkuI4gcGxheWluZy1odWQg5a6M5YWo55u45ZCM55qE5pa55byPXG4gICAgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAkLk1zZygn4p2MIEZhaWxlZCB0byBjcmVhdGUgY29udGFpbmVyIHBhbmVsJyk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyDnq4vljbPpqozor4HniLblhYPntKBcbiAgICBjb25zdCBjb250YWluZXJQYXJlbnQgPSBjb250YWluZXIuR2V0UGFyZW50KCk7XG4gICAgaWYgKCFjb250YWluZXJQYXJlbnQpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBDb250YWluZXIgY3JlYXRlZCBidXQgaGFzIG5vIHBhcmVudCEnKTtcbiAgICAgICAgY29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGNvbnRhaW5lclBhcmVudCAhPT0gcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKGDimqDvuI8gQ29udGFpbmVyIHBhcmVudCAoJHtjb250YWluZXJQYXJlbnQuaWR9KSBpcyBub3Qgcm9vdCBwYW5lbCAoJHtyb290UGFuZWwuaWR9KWApO1xuICAgIH1cbiAgICBjb250YWluZXIuQWRkQ2xhc3MoJ2JhdHRsZV9lbmRfY29udGFpbmVyJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lci5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnOyAvLyDpu5jorqTpmpDol49cbiAgICBjb250YWluZXIuc3R5bGUuekluZGV4ID0gJzEwMDAwJzsgLy8g5q+UIHBsYXlpbmctaHVkICgxMDAwKSDpq5hcbiAgICBjb250YWluZXIuaGl0dGVzdCA9IGZhbHNlO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gQ29udGFpbmVyIGNyZWF0ZWQsIHBhcmVudDogJHsoKF9hID0gY29udGFpbmVyLkdldFBhcmVudCgpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpIHx8ICdudWxsJ31gKTtcbiAgICAvLyDnoa7kv53lrrnlmajlnKjmoLnpnaLmnb/nmoTmnIDlkI7vvIjmnIDkuIrlsYLvvIlcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByb290Q2hpbGRyZW4gPSByb290UGFuZWwuQ2hpbGRyZW4oKTtcbiAgICAgICAgaWYgKHJvb3RDaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0Q2hpbGQgPSByb290Q2hpbGRyZW5bcm9vdENoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGxhc3RDaGlsZCAhPT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLk1vdmVDaGlsZEFmdGVyKGNvbnRhaW5lciwgbGFzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIE5vdGU6IENvdWxkIG5vdCBtb3ZlIGNvbnRhaW5lciB0byB0b3A6ICR7ZX1gKTtcbiAgICB9XG4gICAgLy8g5Y2K6YCP5piO6YGu572pXG4gICAgY29uc3QgbWFzayA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnQmF0dGxlRW5kTWFzaycpO1xuICAgIG1hc2suc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBtYXNrLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hc2suc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hc2suaGl0dGVzdCA9IHRydWU7IC8vIOaLpuaIqueCueWHu1xuICAgICQuTXNnKCfinIUgQmF0dGxlIGVuZCBjb250YWluZXIgY3JlYXRlZCcpO1xuICAgIHJldHVybiBjb250YWluZXI7XG59XG4vLyDojrflj5bnu5PnrpflrrnlmahcbmZ1bmN0aW9uIGdldEJhdHRsZUVuZENvbnRhaW5lcigpIHtcbiAgICBjb25zdCByb290ID0gZ2V0Um9vdCgpO1xuICAgIC8vIOS8mOWFiOS7jiBsYXlvdXQg5p+l5om+77yI5biD5bGA5paH5Lu25Lit5bey5a6a5LmJ77yJXG4gICAgbGV0IGNvbnRhaW5lciA9IHJvb3QuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICAvLyDlpoLmnpzmib7kuI3liLDvvIzlsJ3or5Xnm7TmjqXmn6Xmib7vvIjliqjmgIHliJvlu7rnmoTvvIlcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIgPSByb290LkZpbmRDaGlsZCgnQmF0dGxlRW5kQ29udGFpbmVyJyk7XG4gICAgfVxuICAgIHJldHVybiBjb250YWluZXI7XG59XG4vLyDmm7TmlrDmoIfpopjljLrln5/vvIjkvb/nlKggbGF5b3V0IOS4reeahOmdouadv++8iVxuZnVuY3Rpb24gdXBkYXRlVGl0bGVTZWN0aW9uKHRpdGxlU2VjdGlvbiwgcmVzdWx0KSB7XG4gICAgLy8g5riF56m65pen5YaF5a6577yI5L+d55WZIGxheW91dCDkuK3lrprkuYnnmoTlrZDlhYPntKDvvIlcbiAgICBjb25zdCBleGlzdGluZ0NoaWxkcmVuID0gdGl0bGVTZWN0aW9uLkNoaWxkcmVuKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleGlzdGluZ0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZXhpc3RpbmdDaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKGNoaWxkLmlkICE9PSAnUmVzdWx0VGl0bGUnICYmIGNoaWxkLmlkICE9PSAnUm91bmRJbmZvJyAmJiBjaGlsZC5pZCAhPT0gJ0xldmVsSW5mbycpIHtcbiAgICAgICAgICAgIGNoaWxkLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOabtOaWsOaIluWIm+W7uuagh+mimFxuICAgIGxldCByZXN1bHRUaXRsZSA9IHRpdGxlU2VjdGlvbi5GaW5kQ2hpbGQoJ1Jlc3VsdFRpdGxlJyk7XG4gICAgaWYgKCFyZXN1bHRUaXRsZSkge1xuICAgICAgICByZXN1bHRUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUmVzdWx0VGl0bGUnKTtcbiAgICB9XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFNpemUgPSAnNjRweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICfwn46JIOiDnOWIqe+8gSc7XG4gICAgICAgIHJlc3VsdFRpdGxlLnN0eWxlLmNvbG9yID0gQkFUVExFX0VORF9USEVNRS5zdWNjZXNzO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gYDBweCAwcHggMjBweCAke0JBVFRMRV9FTkRfVEhFTUUudmljdG9yeUdsb3d9YDtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ2VuZW15Jykge1xuICAgICAgICByZXN1bHRUaXRsZS50ZXh0ID0gJ/CfkoAg5aSx6LSlJztcbiAgICAgICAgcmVzdWx0VGl0bGUuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLmRhbmdlcjtcbiAgICAgICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9IGAwcHggMHB4IDIwcHggJHtCQVRUTEVfRU5EX1RIRU1FLmRlZmVhdEdsb3d9YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdFRpdGxlLnRleHQgPSAn8J+knSDlubPlsYAnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUud2FybmluZztcbiAgICB9XG4gICAgLy8g5pu05paw5Zue5ZCI5L+h5oGvXG4gICAgbGV0IHJvdW5kSW5mbyA9IHRpdGxlU2VjdGlvbi5GaW5kQ2hpbGQoJ1JvdW5kSW5mbycpO1xuICAgIGlmICghcm91bmRJbmZvKSB7XG4gICAgICAgIHJvdW5kSW5mbyA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUm91bmRJbmZvJyk7XG4gICAgfVxuICAgIHJvdW5kSW5mby50ZXh0ID0gYOesrCAke3Jlc3VsdC5yb3VuZH0g5Zue5ZCI57uT5p2fYDtcbiAgICByb3VuZEluZm8uc3R5bGUuZm9udFNpemUgPSAnMjhweCc7XG4gICAgcm91bmRJbmZvLnN0eWxlLmNvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0QWNjZW50O1xuICAgIHJvdW5kSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByb3VuZEluZm8uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgcm91bmRJbmZvLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgIC8vIOabtOaWsOWFs+WNoeS/oeaBr1xuICAgIGxldCBsZXZlbEluZm8gPSB0aXRsZVNlY3Rpb24uRmluZENoaWxkKCdMZXZlbEluZm8nKTtcbiAgICBpZiAocmVzdWx0LmxldmVsTmFtZSkge1xuICAgICAgICBpZiAoIWxldmVsSW5mbykge1xuICAgICAgICAgICAgbGV2ZWxJbmZvID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aXRsZVNlY3Rpb24sICdMZXZlbEluZm8nKTtcbiAgICAgICAgfVxuICAgICAgICBsZXZlbEluZm8udGV4dCA9IGDlhbPljaHvvJoke3Jlc3VsdC5sZXZlbE5hbWV9YDtcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gICAgZWxzZSBpZiAobGV2ZWxJbmZvKSB7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICB9XG59XG4vLyDliJvlu7rmoIfpopjljLrln5/vvIjkv53nlZnnlKjkuo7lhbzlrrnvvIlcbmZ1bmN0aW9uIGNyZWF0ZVRpdGxlU2VjdGlvbihwYXJlbnQsIHJlc3VsdCkge1xuICAgIGNvbnN0IHRpdGxlU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQmF0dGxlRW5kVGl0bGUnKTtcbiAgICB0aXRsZVNlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICcxNTBweCc7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICB0aXRsZVNlY3Rpb24uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICczMHB4JztcbiAgICAvLyDog5zotJ/moIfpophcbiAgICBjb25zdCByZXN1bHRUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUmVzdWx0VGl0bGUnKTtcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICc2NHB4JztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHJlc3VsdFRpdGxlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHJlc3VsdFRpdGxlLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHJlc3VsdFRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxMHB4JztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gJzBweCAwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuOCknO1xuICAgIGlmIChyZXN1bHQud2lubmVyID09PSAncGxheWVyJykge1xuICAgICAgICByZXN1bHRUaXRsZS50ZXh0ID0gJ/Cfjokg6IOc5Yip77yBJztcbiAgICAgICAgcmVzdWx0VGl0bGUuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnN1Y2Nlc3M7XG4gICAgICAgIHJlc3VsdFRpdGxlLnN0eWxlLnRleHRTaGFkb3cgPSBgMHB4IDBweCAyMHB4ICR7QkFUVExFX0VORF9USEVNRS52aWN0b3J5R2xvd31gO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN1bHQud2lubmVyID09PSAnZW5lbXknKSB7XG4gICAgICAgIHJlc3VsdFRpdGxlLnRleHQgPSAn8J+SgCDlpLHotKUnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuZGFuZ2VyO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gYDBweCAwcHggMjBweCAke0JBVFRMRV9FTkRfVEhFTUUuZGVmZWF0R2xvd31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICfwn6SdIOW5s+WxgCc7XG4gICAgICAgIHJlc3VsdFRpdGxlLnN0eWxlLmNvbG9yID0gQkFUVExFX0VORF9USEVNRS53YXJuaW5nO1xuICAgIH1cbiAgICAvLyDlm57lkIjkv6Hmga9cbiAgICBjb25zdCByb3VuZEluZm8gPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlU2VjdGlvbiwgJ1JvdW5kSW5mbycpO1xuICAgIHJvdW5kSW5mby50ZXh0ID0gYOesrCAke3Jlc3VsdC5yb3VuZH0g5Zue5ZCI57uT5p2fYDtcbiAgICByb3VuZEluZm8uc3R5bGUuZm9udFNpemUgPSAnMjhweCc7XG4gICAgcm91bmRJbmZvLnN0eWxlLmNvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0QWNjZW50O1xuICAgIHJvdW5kSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByb3VuZEluZm8uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgcm91bmRJbmZvLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgIC8vIOWFs+WNoeS/oeaBr1xuICAgIGlmIChyZXN1bHQubGV2ZWxOYW1lKSB7XG4gICAgICAgIGNvbnN0IGxldmVsSW5mbyA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnTGV2ZWxJbmZvJyk7XG4gICAgICAgIGxldmVsSW5mby50ZXh0ID0gYOWFs+WNoe+8miR7cmVzdWx0LmxldmVsTmFtZX1gO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUuZm9udFNpemUgPSAnMjBweCc7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS5vcGFjaXR5ID0gJzAuOCc7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZVNlY3Rpb247XG59XG4vLyDmm7TmlrDnu5/orqHkv6Hmga/ljLrln5/vvIjkvb/nlKggbGF5b3V0IOS4reeahOmdouadv++8iVxuZnVuY3Rpb24gdXBkYXRlU3RhdHNTZWN0aW9uKHN0YXRzU2VjdGlvbiwgcmVzdWx0KSB7XG4gICAgLy8g5riF56m657uf6K6h6KGM77yI5L+d55WZ5qCH6aKY77yJXG4gICAgY29uc3QgZXhpc3RpbmdDaGlsZHJlbiA9IHN0YXRzU2VjdGlvbi5DaGlsZHJlbigpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXhpc3RpbmdDaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjaGlsZCA9IGV4aXN0aW5nQ2hpbGRyZW5baV07XG4gICAgICAgIGlmIChjaGlsZC5pZCAhPT0gJ1N0YXRzVGl0bGUnKSB7XG4gICAgICAgICAgICBjaGlsZC5EZWxldGVBc3luYygwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDnoa7kv53moIfpopjlrZjlnKhcbiAgICBsZXQgc3RhdHNUaXRsZSA9IHN0YXRzU2VjdGlvbi5GaW5kQ2hpbGQoJ1N0YXRzVGl0bGUnKTtcbiAgICBpZiAoIXN0YXRzVGl0bGUpIHtcbiAgICAgICAgc3RhdHNUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdHNTZWN0aW9uLCAnU3RhdHNUaXRsZScpO1xuICAgICAgICBzdGF0c1RpdGxlLnRleHQgPSAn5oiY5paX57uf6K6hJztcbiAgICAgICAgc3RhdHNUaXRsZS5zdHlsZS5mb250U2l6ZSA9ICcyNHB4JztcbiAgICAgICAgc3RhdHNUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICAgICAgc3RhdHNUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTVweCc7XG4gICAgfVxuICAgIC8vIOe7n+iuoeaVsOaNrlxuICAgIGNvbnN0IHN0YXRzID0gcmVzdWx0LnN0YXRzIHx8IHt9O1xuICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+aImOaWl+aXtumVvycsIGAke01hdGguZmxvb3IocmVzdWx0LmR1cmF0aW9uIC8gMTAwMCl956eSYCwgMCk7XG4gICAgaWYgKHN0YXRzLmRhbWFnZURlYWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn6YCg5oiQ5Lyk5a6zJywgZm9ybWF0TnVtYmVyKHN0YXRzLmRhbWFnZURlYWx0KSwgMSk7XG4gICAgfVxuICAgIGlmIChzdGF0cy5kYW1hZ2VUYWtlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+aJv+WPl+S8pOWusycsIGZvcm1hdE51bWJlcihzdGF0cy5kYW1hZ2VUYWtlbiksIDIpO1xuICAgIH1cbiAgICBpZiAoc3RhdHMudW5pdHNLaWxsZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICflh7vmnYDljZXkvY0nLCBzdGF0cy51bml0c0tpbGxlZC50b1N0cmluZygpLCAzKTtcbiAgICB9XG4gICAgaWYgKHN0YXRzLnVuaXRzU3Vydml2ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICflrZjmtLvljZXkvY0nLCBzdGF0cy51bml0c1N1cnZpdmVkLnRvU3RyaW5nKCksIDQpO1xuICAgIH1cbn1cbi8vIOWIm+W7uue7n+iuoeS/oeaBr+WMuuWfn++8iOS/neeVmeeUqOS6juWFvOWuue+8iVxuZnVuY3Rpb24gY3JlYXRlU3RhdHNTZWN0aW9uKHBhcmVudCwgcmVzdWx0KSB7XG4gICAgY29uc3Qgc3RhdHNTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdCYXR0bGVFbmRTdGF0cycpO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuaGVpZ2h0ID0gJzIwMHB4JztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMzBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLnBhZGRpbmcgPSAnMjBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgLy8g5qCH6aKYXG4gICAgY29uc3Qgc3RhdHNUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgc3RhdHNTZWN0aW9uLCAnU3RhdHNUaXRsZScpO1xuICAgIHN0YXRzVGl0bGUudGV4dCA9ICfmiJjmlpfnu5/orqEnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgc3RhdHNUaXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIC8vIOe7n+iuoeaVsOaNrlxuICAgIGNvbnN0IHN0YXRzID0gcmVzdWx0LnN0YXRzIHx8IHt9O1xuICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+aImOaWl+aXtumVvycsIGAke01hdGguZmxvb3IocmVzdWx0LmR1cmF0aW9uIC8gMTAwMCl956eSYCwgMCk7XG4gICAgaWYgKHN0YXRzLmRhbWFnZURlYWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn6YCg5oiQ5Lyk5a6zJywgZm9ybWF0TnVtYmVyKHN0YXRzLmRhbWFnZURlYWx0KSwgMSk7XG4gICAgfVxuICAgIGlmIChzdGF0cy5kYW1hZ2VUYWtlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+aJv+WPl+S8pOWusycsIGZvcm1hdE51bWJlcihzdGF0cy5kYW1hZ2VUYWtlbiksIDIpO1xuICAgIH1cbiAgICBpZiAoc3RhdHMudW5pdHNLaWxsZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICflh7vmnYDljZXkvY0nLCBzdGF0cy51bml0c0tpbGxlZC50b1N0cmluZygpLCAzKTtcbiAgICB9XG4gICAgaWYgKHN0YXRzLnVuaXRzU3Vydml2ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICflrZjmtLvljZXkvY0nLCBzdGF0cy51bml0c1N1cnZpdmVkLnRvU3RyaW5nKCksIDQpO1xuICAgIH1cbiAgICByZXR1cm4gc3RhdHNTZWN0aW9uO1xufVxuLy8g5Yib5bu65Y2V5Liq57uf6K6h6KGMXG5mdW5jdGlvbiBjcmVhdGVTdGF0TGluZShwYXJlbnQsIGxhYmVsLCB2YWx1ZSwgaW5kZXgpIHtcbiAgICBjb25zdCBsaW5lID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsIGBTdGF0TGluZV8ke2luZGV4fWApO1xuICAgIGxpbmUuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbGluZS5zdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgbGluZS5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgIGxpbmUuc3R5bGUubWFyZ2luVG9wID0gJzVweCc7XG4gICAgY29uc3QgbGFiZWxUZXh0ID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBsaW5lLCBgU3RhdExhYmVsXyR7aW5kZXh9YCk7XG4gICAgbGFiZWxUZXh0LnRleHQgPSBsYWJlbDtcbiAgICBsYWJlbFRleHQuc3R5bGUuZm9udFNpemUgPSAnMThweCc7XG4gICAgbGFiZWxUZXh0LnN0eWxlLmNvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0U2Vjb25kYXJ5O1xuICAgIGxhYmVsVGV4dC5zdHlsZS53aWR0aCA9ICdmaWxsLXBhcmVudC1mbG93KDEpJztcbiAgICBsYWJlbFRleHQuc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgIGNvbnN0IHZhbHVlVGV4dCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbGluZSwgYFN0YXRWYWx1ZV8ke2luZGV4fWApO1xuICAgIHZhbHVlVGV4dC50ZXh0ID0gdmFsdWU7XG4gICAgdmFsdWVUZXh0LnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgIHZhbHVlVGV4dC5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dEFjY2VudDtcbiAgICB2YWx1ZVRleHQuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICB2YWx1ZVRleHQuc3R5bGUudGV4dEFsaWduID0gJ3JpZ2h0Jztcbn1cbi8vIOabtOaWsOaMiemSruWMuuWfn++8iOS9v+eUqCBsYXlvdXQg5Lit55qE6Z2i5p2/77yJXG5mdW5jdGlvbiB1cGRhdGVCdXR0b25zU2VjdGlvbihidXR0b25zU2VjdGlvbiwgcmVzdWx0KSB7XG4gICAgLy8g5riF56m65omA5pyJ5oyJ6ZKuXG4gICAgYnV0dG9uc1NlY3Rpb24uUmVtb3ZlQW5kRGVsZXRlQ2hpbGRyZW4oKTtcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgLy8g6IOc5Yip5pe25pi+56S65Lik5Liq5oyJ6ZKuXG4gICAgICAgIGJ1dHRvbnNTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgICAgIGJ1dHRvbnNTZWN0aW9uLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAvLyDpgInmi6nlhbPljaHmjInpkq5cbiAgICAgICAgY29uc3Qgc2VsZWN0TGV2ZWxCdG4gPSBjcmVhdGVTdHlsZWRCdXR0b24oYnV0dG9uc1NlY3Rpb24sICdTZWxlY3RMZXZlbEJ1dHRvbicsICfwn5e677iPIOmAieaLqeWFs+WNoScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCfwn5e677iPIE9wZW5pbmcgbGV2ZWwgc2VsZWN0aW9uLi4uJyk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBoaWRlVmlldygpO1xuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ29wZW5fbGV2ZWxfc2VsZWN0aW9uJywge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZWN0TGV2ZWxCdG4uc3R5bGUubWFyZ2luUmlnaHQgPSAnMjBweCc7XG4gICAgICAgIC8vIOmAgOWHuua4uOaIj+aMiemSrlxuICAgICAgICBjcmVhdGVTdHlsZWRCdXR0b24oYnV0dG9uc1NlY3Rpb24sICdRdWl0R2FtZUJ1dHRvbicsICfwn5qqIOmAgOWHuua4uOaIjycsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCfwn5qqIFF1aXR0aW5nIGdhbWUuLi4nKTtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5idXR0b25fY2xpY2snKTtcbiAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdxdWl0X3RvX21lbnUnLCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8g5aSx6LSl5pe25Y+q5pi+56S66YCA5Ye65oyJ6ZKu77yI5bGF5Lit77yJXG4gICAgICAgIGJ1dHRvbnNTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdub25lJztcbiAgICAgICAgY29uc3QgcXVpdEJ0biA9IGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1F1aXRHYW1lQnV0dG9uJywgJ/Cfmqog6YCA5Ye65ri45oiPJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coJ/CfmqogUXVpdHRpbmcgZ2FtZSBhZnRlciBkZWZlYXQuLi4nKTtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5idXR0b25fY2xpY2snKTtcbiAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdxdWl0X3RvX21lbnUnLCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICBxdWl0QnRuLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIH1cbn1cbi8vIOWIm+W7uuaMiemSruWMuuWfn++8iOS/neeVmeeUqOS6juWFvOWuue+8iVxuZnVuY3Rpb24gY3JlYXRlQnV0dG9uc1NlY3Rpb24ocGFyZW50LCByZXN1bHQpIHtcbiAgICBjb25zdCBidXR0b25zU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQmF0dGxlRW5kQnV0dG9ucycpO1xuICAgIGJ1dHRvbnNTZWN0aW9uLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGJ1dHRvbnNTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICcxMDBweCc7XG4gICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgLy8g6IOc5Yip5pe25pi+56S65Lik5Liq5oyJ6ZKuXG4gICAgICAgIC8vIOmAieaLqeWFs+WNoeaMiemSrlxuICAgICAgICBjb25zdCBzZWxlY3RMZXZlbEJ0biA9IGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1NlbGVjdExldmVsQnV0dG9uJywgJ/Cfl7rvuI8g6YCJ5oup5YWz5Y2hJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coJ/Cfl7rvuI8gT3BlbmluZyBsZXZlbCBzZWxlY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5idXR0b25fY2xpY2snKTtcbiAgICAgICAgICAgIGhpZGVWaWV3KCk7XG4gICAgICAgICAgICAvLyBUT0RPOiDmiZPlvIDlhbPljaHpgInmi6nnlYzpnaJcbiAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdvcGVuX2xldmVsX3NlbGVjdGlvbicsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGVjdExldmVsQnRuLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwcHgnO1xuICAgICAgICAvLyDpgIDlh7rmuLjmiI/mjInpkq5cbiAgICAgICAgY3JlYXRlU3R5bGVkQnV0dG9uKGJ1dHRvbnNTZWN0aW9uLCAnUXVpdEdhbWVCdXR0b24nLCAn8J+aqiDpgIDlh7rmuLjmiI8nLCAoKSA9PiB7XG4gICAgICAgICAgICAkLk1zZygn8J+aqiBRdWl0dGluZyBnYW1lLi4uJyk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncXVpdF90b19tZW51Jywge30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIOWksei0peaXtuWPquaYvuekuumAgOWHuuaMiemSru+8iOWxheS4re+8iVxuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnbm9uZSc7XG4gICAgICAgIGNvbnN0IHF1aXRCdG4gPSBjcmVhdGVTdHlsZWRCdXR0b24oYnV0dG9uc1NlY3Rpb24sICdRdWl0R2FtZUJ1dHRvbicsICfwn5qqIOmAgOWHuua4uOaIjycsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCfwn5qqIFF1aXR0aW5nIGdhbWUgYWZ0ZXIgZGVmZWF0Li4uJyk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncXVpdF90b19tZW51Jywge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgcXVpdEJ0bi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICB9XG4gICAgcmV0dXJuIGJ1dHRvbnNTZWN0aW9uO1xufVxuLy8g5Yib5bu65qC35byP5YyW5oyJ6ZKu77yI5Y+C6ICDIHBsYXlpbmctaHVkIOmjjuagvO+8iVxuZnVuY3Rpb24gY3JlYXRlU3R5bGVkQnV0dG9uKHBhcmVudCwgaWQsIHRleHQsIG9uQ2xpY2spIHtcbiAgICBjb25zdCBidXR0b24gPSAkLkNyZWF0ZVBhbmVsKCdCdXR0b24nLCBwYXJlbnQsIGlkKTtcbiAgICBidXR0b24uQWRkQ2xhc3MoJ2JhdHRsZV9lbmRfYnV0dG9uJyk7XG4gICAgYnV0dG9uLnN0eWxlLndpZHRoID0gJzI4MHB4JztcbiAgICBidXR0b24uc3R5bGUuaGVpZ2h0ID0gJzYwcHgnO1xuICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIGJ1dHRvbi5zdHlsZS5ib3JkZXIgPSAnMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKSc7XG4gICAgYnV0dG9uLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4JztcbiAgICBidXR0b24uc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBidXR0b24sIGAke2lkfV9MYWJlbGApO1xuICAgIGxhYmVsLnRleHQgPSB0ZXh0O1xuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzI0cHgnO1xuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gJyNmZmZmZmYnO1xuICAgIGxhYmVsLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgbGFiZWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgbGFiZWwuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxhYmVsLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxhYmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxhYmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBsYWJlbC5zdHlsZS50ZXh0U2hhZG93ID0gJzJweCAycHggNHB4ICMwMDAwMDAnO1xuICAgIGxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICBidXR0b24uU2V0UGFuZWxFdmVudCgnb25hY3RpdmF0ZScsICgpID0+IHtcbiAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBCdXR0b24gY2xpY2tlZDogJHt0ZXh0fWApO1xuICAgICAgICBvbkNsaWNrKCk7XG4gICAgfSk7XG4gICAgLy8g5oKs5YGc5pWI5p6cXG4gICAgYnV0dG9uLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0QWNjZW50O1xuICAgICAgICBidXR0b24uc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMS4wNSwgMS4wNSwgMS4wKSc7XG4gICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5idXR0b25fb3ZlcicpO1xuICAgIH0pO1xuICAgIGJ1dHRvbi5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICAgICAgYnV0dG9uLnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKDEuMCwgMS4wLCAxLjApJztcbiAgICB9KTtcbiAgICByZXR1cm4gYnV0dG9uO1xufVxuLy8g5qC85byP5YyW5pWw5a2XXG5mdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtKSB7XG4gICAgaWYgKG51bSA+PSAxMDAwMDAwKSB7XG4gICAgICAgIHJldHVybiAobnVtIC8gMTAwMDAwMCkudG9GaXhlZCgxKSArICdNJztcbiAgICB9XG4gICAgZWxzZSBpZiAobnVtID49IDEwMDApIHtcbiAgICAgICAgcmV0dXJuIChudW0gLyAxMDAwKS50b0ZpeGVkKDEpICsgJ0snO1xuICAgIH1cbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCk7XG59XG4vLyDmmL7npLrnu5PnrpfnlYzpnaLvvIjlrozlhajliqjmgIHliJvlu7rvvIzlg48gcGxheWluZy1odWQg5LiA5qC377yJXG5mdW5jdGlvbiBzaG93VmlldyhyZXN1bHQpIHtcbiAgICAkLk1zZygn8J+PhiBTaG93aW5nIGJhdHRsZSBlbmQgdmlldyB3aXRoIHJlc3VsdDonLCByZXN1bHQpO1xuICAgIC8vIOiOt+WPluaguemdouadv++8iOS4jiBwbGF5aW5nLWh1ZCDlrozlhajkuIDoh7TvvIlcbiAgICBjb25zdCByb290UGFuZWwgPSAkLkdldENvbnRleHRQYW5lbCgpO1xuICAgIGlmICghcm9vdFBhbmVsKSB7XG4gICAgICAgICQuTXNnKCfinYwgUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIFJvb3QgcGFuZWwgaWQ6ICR7cm9vdFBhbmVsLmlkIHx8ICdlbXB0eSd9LCBzaXplOiAke3Jvb3RQYW5lbC5hY3R1YWxsYXlvdXR3aWR0aH14JHtyb290UGFuZWwuYWN0dWFsbGF5b3V0aGVpZ2h0fSwgY2hpbGRyZW46ICR7cm9vdFBhbmVsLkNoaWxkcmVuKCkubGVuZ3RofWApO1xuICAgIC8vIOWmguaenOaguemdouadv+WwuuWvuOS4uiAw77yM5L2/55So5bGP5bmV5YiG6L6o546H5L2c5Li65aSH55SoXG4gICAgbGV0IHVzZVNjcmVlblNpemUgPSBmYWxzZTtcbiAgICBpZiAocm9vdFBhbmVsLmFjdHVhbGxheW91dHdpZHRoID09PSAwIHx8IHJvb3RQYW5lbC5hY3R1YWxsYXlvdXRoZWlnaHQgPT09IDApIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDimqDvuI8gUm9vdCBwYW5lbCBzaXplIGlzIDAsIHdpbGwgdXNlIHNjcmVlbiByZXNvbHV0aW9uJyk7XG4gICAgICAgIHVzZVNjcmVlblNpemUgPSB0cnVlO1xuICAgIH1cbiAgICAvLyDliKDpmaTlt7LlrZjlnKjnmoTlrrnlmajvvIjlpoLmnpzlrZjlnKjvvIlcbiAgICBsZXQgZXhpc3RpbmdDb250YWluZXIgPSByb290UGFuZWwuRmluZENoaWxkKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQmF0dGxlRW5kQ29udGFpbmVyJyk7XG4gICAgaWYgKGV4aXN0aW5nQ29udGFpbmVyKSB7XG4gICAgICAgIGV4aXN0aW5nQ29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgIH1cbiAgICAvLyDlrozlhajliqjmgIHliJvlu7rlrrnlmajvvIjlg48gcGxheWluZy1odWQg5LiA5qC377yJXG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBDcmVhdGluZyBjb250YWluZXIgZHluYW1pY2FsbHkgKGxpa2UgcGxheWluZy1odWQpLi4uJyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAkLk1zZygn4p2MIEZhaWxlZCB0byBjcmVhdGUgY29udGFpbmVyJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g6K6+572u5a655Zmo5qC35byP77yI5LiOIHBsYXlpbmctaHVkIOWujOWFqOS4gOiHtOeahOaWueW8j++8iVxuICAgIGNvbnRhaW5lci5BZGRDbGFzcygnYmF0dGxlX2VuZF9jb250YWluZXInKTtcbiAgICAvLyDlpoLmnpzmoLnpnaLmnb/lsLrlr7jkuLogMO+8jOS9v+eUqOWxj+W5leWIhui+qOeOh1xuICAgIGlmICh1c2VTY3JlZW5TaXplKSB7XG4gICAgICAgIC8vIOiOt+WPluWxj+W5leWIhui+qOeOh++8iOmAmuW4uCBQYW5vcmFtYSDkvb/nlKggMTkyMHgxMDgwIOaIluWunumZheWIhui+qOeOh++8iVxuICAgICAgICBjb25zdCBzY3JlZW5XaWR0aCA9IEdhbWUuR2V0U2NyZWVuV2lkdGgoKTtcbiAgICAgICAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gR2FtZS5HZXRTY3JlZW5IZWlnaHQoKTtcbiAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBVc2luZyBzY3JlZW4gc2l6ZTogJHtzY3JlZW5XaWR0aH14JHtzY3JlZW5IZWlnaHR9YCk7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGAke3NjcmVlbldpZHRofXB4YDtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke3NjcmVlbkhlaWdodH1weGA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgfVxuICAgIGNvbnRhaW5lci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250YWluZXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMDAnOyAvLyDmr5QgcGxheWluZy1odWQgKDEwMDApIOmrmFxuICAgIGNvbnRhaW5lci5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7IC8vIOaYvuW8j+iuvue9ruS4uuWPr+ingVxuICAgIC8vIOmqjOivgeeItuWFg+e0oFxuICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudCA9IGNvbnRhaW5lci5HZXRQYXJlbnQoKTtcbiAgICBpZiAoIWNvbnRhaW5lclBhcmVudCkge1xuICAgICAgICAkLk1zZygn4p2MIENvbnRhaW5lciBoYXMgbm8gcGFyZW50IScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gQ29udGFpbmVyIHBhcmVudDogJHtjb250YWluZXJQYXJlbnQuaWQgfHwgJ3Jvb3QnfSwgcGFyZW50IHNpemU6ICR7Y29udGFpbmVyUGFyZW50LmFjdHVhbGxheW91dHdpZHRofXgke2NvbnRhaW5lclBhcmVudC5hY3R1YWxsYXlvdXRoZWlnaHR9YCk7XG4gICAgLy8g5Yib5bu66YGu572pXG4gICAgY29uc3QgbWFzayA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnQmF0dGxlRW5kTWFzaycpO1xuICAgIG1hc2suc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBtYXNrLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hc2suc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hc2suaGl0dGVzdCA9IHRydWU7XG4gICAgLy8g5Yib5bu65Li76Z2i5p2/77yI5a6M5YWo5Yqo5oCB5Yib5bu677yJXG4gICAgY29uc3QgbWFpbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnQmF0dGxlRW5kTWFpbicpO1xuICAgIG1haW4uc3R5bGUud2lkdGggPSAnODAwcHgnO1xuICAgIG1haW4uc3R5bGUuaGVpZ2h0ID0gJzYwMHB4JztcbiAgICBtYWluLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUucGFuZWxCZztcbiAgICBtYWluLnN0eWxlLmJvcmRlciA9IGAycHggc29saWQgJHtCQVRUTEVfRU5EX1RIRU1FLmJvcmRlckNvbG9yfWA7XG4gICAgbWFpbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMjBweCc7XG4gICAgbWFpbi5zdHlsZS5ib3hTaGFkb3cgPSAnMHB4IDBweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC44KSc7XG4gICAgbWFpbi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBtYWluLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBtYWluLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBtYWluLnN0eWxlLnBhZGRpbmcgPSAnNDBweCc7XG4gICAgLy8g5Yib5bu65ZCE5Liq5Yy65Z+f77yI5a6M5YWo5Yqo5oCB5Yib5bu677yJXG4gICAgY3JlYXRlVGl0bGVTZWN0aW9uKG1haW4sIHJlc3VsdCk7XG4gICAgY3JlYXRlU3RhdHNTZWN0aW9uKG1haW4sIHJlc3VsdCk7XG4gICAgY3JlYXRlQnV0dG9uc1NlY3Rpb24obWFpbiwgcmVzdWx0KTtcbiAgICAvLyDnoa7kv53lrrnlmajlnKjmoLnpnaLmnb/nmoTmnIDlkI7vvIjmnIDkuIrlsYLvvIlcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByb290Q2hpbGRyZW4gPSByb290UGFuZWwuQ2hpbGRyZW4oKTtcbiAgICAgICAgaWYgKHJvb3RDaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0Q2hpbGQgPSByb290Q2hpbGRyZW5bcm9vdENoaWxkcmVuLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgaWYgKGxhc3RDaGlsZCAhPT0gY29udGFpbmVyKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLk1vdmVDaGlsZEFmdGVyKGNvbnRhaW5lciwgbGFzdENoaWxkKTtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIENvbnRhaW5lciBtb3ZlZCB0byB0b3BgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIE5vdGU6IENvdWxkIG5vdCBtb3ZlIGNvbnRhaW5lcjogJHtlfWApO1xuICAgIH1cbiAgICAvLyDlvLrliLbliLfmlrDluIPlsYBcbiAgICBjb250YWluZXIuU2V0SGFzQ2xhc3MoJ2JhdHRsZV9lbmRfY29udGFpbmVyJywgdHJ1ZSk7XG4gICAgLy8g5pyA57uI6aqM6K+BXG4gICAgY29uc3QgZmluYWxQYXJlbnQgPSBjb250YWluZXIuR2V0UGFyZW50KCk7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDinIUgQ29udGFpbmVyIHZpc2liaWxpdHk6ICR7Y29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHl9YCk7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDinIUgQ29udGFpbmVyIHpJbmRleDogJHtjb250YWluZXIuc3R5bGUuekluZGV4fWApO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g4pyFIENvbnRhaW5lciBwYXJlbnQ6ICR7ZmluYWxQYXJlbnQgPyAoZmluYWxQYXJlbnQuaWQgfHwgJ3Jvb3QnKSA6ICdudWxsJ31gKTtcbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIOKchSBDb250YWluZXIgdmFsaWQ6ICR7Y29udGFpbmVyLklzVmFsaWQoKX1gKTtcbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIOKchSBDb250YWluZXIgc3R5bGUgd2lkdGg6ICR7Y29udGFpbmVyLnN0eWxlLndpZHRofSwgaGVpZ2h0OiAke2NvbnRhaW5lci5zdHlsZS5oZWlnaHR9YCk7XG4gICAgaWYgKGZpbmFsUGFyZW50KSB7XG4gICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g4pyFIFBhcmVudCBzaXplOiAke2ZpbmFsUGFyZW50LmFjdHVhbGxheW91dHdpZHRofXgke2ZpbmFsUGFyZW50LmFjdHVhbGxheW91dGhlaWdodH1gKTtcbiAgICB9XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDinIUgTWFpbiBwYW5lbCBjaGlsZHJlbjogJHttYWluLkNoaWxkcmVuKCkubGVuZ3RofWApO1xuICAgIC8vIOW7tui/n+ajgOafpeWunumZheWwuuWvuO+8iFBhbm9yYW1hIOmcgOimgeaXtumXtOiuoeeul+W4g+WxgO+8iVxuICAgICQuU2NoZWR1bGUoMC4xLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdHVhbFdpZHRoID0gY29udGFpbmVyLmFjdHVhbGxheW91dHdpZHRoO1xuICAgICAgICBjb25zdCBhY3R1YWxIZWlnaHQgPSBjb250YWluZXIuYWN0dWFsbGF5b3V0aGVpZ2h0O1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIOKchSBDb250YWluZXIgYWN0dWFsIHNpemUgKGFmdGVyIDAuMXMpOiAke2FjdHVhbFdpZHRofXgke2FjdHVhbEhlaWdodH1gKTtcbiAgICAgICAgLy8g5aaC5p6c5bC65a+45LuN54S25Li6IDDvvIzkvb/nlKjlsY/luZXliIbovqjnjodcbiAgICAgICAgaWYgKGFjdHVhbFdpZHRoID09PSAwIHx8IGFjdHVhbEhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDimqDvuI8gQ29udGFpbmVyIHNpemUgaXMgc3RpbGwgMCwgdXNpbmcgc2NyZWVuIHJlc29sdXRpb24uLi4nKTtcbiAgICAgICAgICAgIGNvbnN0IHNjcmVlbldpZHRoID0gR2FtZS5HZXRTY3JlZW5XaWR0aCgpO1xuICAgICAgICAgICAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gR2FtZS5HZXRTY3JlZW5IZWlnaHQoKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGAke3NjcmVlbldpZHRofXB4YDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBgJHtzY3JlZW5IZWlnaHR9cHhgO1xuICAgICAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBTZXQgY29udGFpbmVyIHNpemUgdG8gJHtzY3JlZW5XaWR0aH14JHtzY3JlZW5IZWlnaHR9cHhgKTtcbiAgICAgICAgICAgIC8vIOWGjeasoeajgOafpVxuICAgICAgICAgICAgJC5TY2hlZHVsZSgwLjEsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdXaWR0aCA9IGNvbnRhaW5lci5hY3R1YWxsYXlvdXR3aWR0aDtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdIZWlnaHQgPSBjb250YWluZXIuYWN0dWFsbGF5b3V0aGVpZ2h0O1xuICAgICAgICAgICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g4pyFIENvbnRhaW5lciBzaXplIGFmdGVyIGZpeDogJHtuZXdXaWR0aH14JHtuZXdIZWlnaHR9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOaSreaUvumfs+aViFxuICAgIGlmIChyZXN1bHQud2lubmVyID09PSAncGxheWVyJykge1xuICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkudmljdG9yeScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN1bHQud2lubmVyID09PSAnZW5lbXknKSB7XG4gICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5kZWZlYXQnKTtcbiAgICB9XG4gICAgJC5Nc2coJ+KchSBCYXR0bGUgZW5kIHZpZXcgc2hvd24gc3VjY2Vzc2Z1bGx5Jyk7XG59XG4vLyDpmpDol4/nu5PnrpfnlYzpnaJcbmZ1bmN0aW9uIGhpZGVWaWV3KCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGdldEJhdHRsZUVuZENvbnRhaW5lcigpO1xuICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnY29sbGFwc2UnO1xuICAgICAgICAkLk1zZygn8J+UkiBCYXR0bGUgZW5kIHZpZXcgaGlkZGVuJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAkLk1zZygn4pqg77iPIEJhdHRsZUVuZENvbnRhaW5lciBub3QgZm91bmQgd2hlbiB0cnlpbmcgdG8gaGlkZScpO1xuICAgIH1cbn1cbi8vIOWkhOeQhuaImOaWl+e7k+adn+S6i+S7tlxuZnVuY3Rpb24gaGFuZGxlQmF0dGxlRW5kZWQoZGF0YSkge1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gQmF0dGxlIGVuZGVkIGV2ZW50IHJlY2VpdmVkOicsIGRhdGEpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGRhdGEucmVzdWx0IHx8IHt9O1xuICAgIC8vIOi9rOaNouaVsOaNruagvOW8j1xuICAgIGNvbnN0IGJhdHRsZVJlc3VsdCA9IHtcbiAgICAgICAgd2lubmVyOiByZXN1bHQud2lubmVyIHx8ICdkcmF3JyxcbiAgICAgICAgcm91bmQ6IHJlc3VsdC5yb3VuZCB8fCAxLFxuICAgICAgICBkdXJhdGlvbjogcmVzdWx0LmR1cmF0aW9uIHx8IDAsXG4gICAgICAgIHN0YXRzOiByZXN1bHQuc3RhdHMsXG4gICAgICAgIGxldmVsSWQ6IHJlc3VsdC5sZXZlbElkLFxuICAgICAgICBsZXZlbE5hbWU6IHJlc3VsdC5sZXZlbE5hbWVcbiAgICB9O1xuICAgIC8vIOW7tui/n+aYvuekuu+8jOiuqeaImOaWl+WcuuaZr+acieaXtumXtOa4heeQhlxuICAgICQuU2NoZWR1bGUoMC41LCAoKSA9PiB7XG4gICAgICAgIHNob3dWaWV3KGJhdHRsZVJlc3VsdCk7XG4gICAgfSk7XG59XG4vLyDlpITnkIbms6LmrKHnu5Pnrpfkuovku7bvvIjoh6rotbDmo4vmqKHlvI/vvIlcbmZ1bmN0aW9uIGhhbmRsZVdhdmVTZXR0bGVtZW50KGRhdGEpIHtcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIFdhdmUgc2V0dGxlbWVudCBldmVudCByZWNlaXZlZDonLCBkYXRhKTtcbiAgICAvLyDku44gQXV0b0NoZXNzTW9kZSDojrflj5bog5zotJ/kv6Hmga9cbiAgICAvLyDms6jmhI/vvJpzdGF0cyDlupTor6XmnaXoh6ogZGF0YS5zdGF0c++8jOiAjOS4jeaYryBkYXRhLnBsYXllclN1bW1hcnlcbiAgICBjb25zdCBiYXR0bGVSZXN1bHQgPSB7XG4gICAgICAgIHdpbm5lcjogZGF0YS53aW5uZXIgfHwgJ3BsYXllcicsIC8vIOm7mOiupOeOqeWutuiDnOWIqVxuICAgICAgICByb3VuZDogZGF0YS5yb3VuZCB8fCAxLFxuICAgICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbiB8fCAwLFxuICAgICAgICBzdGF0czogZGF0YS5zdGF0cyB8fCB7fSwgLy8g5L2/55SoIGRhdGEuc3RhdHMg6ICM5LiN5pivIGRhdGEucGxheWVyU3VtbWFyeVxuICAgICAgICBsZXZlbE5hbWU6IGRhdGEubGV2ZWxOYW1lIHx8IHVuZGVmaW5lZFxuICAgIH07XG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBQcm9jZXNzZWQgYmF0dGxlIHJlc3VsdDonLCBiYXR0bGVSZXN1bHQpO1xuICAgIHNob3dWaWV3KGJhdHRsZVJlc3VsdCk7XG59XG4vLyDliJ3lp4vljJbkuovku7borqLpmIVcbmZ1bmN0aW9uIGluaXRpYWxpemVFdmVudExpc3RlbmVycygpIHtcbiAgICAkLk1zZygn8J+ToSBJbml0aWFsaXppbmcgYmF0dGxlIGVuZCB2aWV3IGV2ZW50IGxpc3RlbmVycy4uLicpO1xuICAgIC8vIOebkeWQrOaImOaWl+e7k+adn+S6i+S7tlxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdiYXR0bGVfZW5kZWQnLCBoYW5kbGVCYXR0bGVFbmRlZCk7XG4gICAgLy8g55uR5ZCs6Ieq6LWw5qOL5rOi5qyh57uT566XXG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2F1dG9jaGVzc193YXZlX3NldHRsZW1lbnQnLCBoYW5kbGVXYXZlU2V0dGxlbWVudCk7XG4gICAgLy8g55uR5ZCs5YWz6Zet5LqL5Lu2XG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2JhdHRsZV9lbmRfZGlzbWlzcycsIGhpZGVWaWV3KTtcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3dhdmVfc2V0dGxlbWVudF9kaXNtaXNzJywgaGlkZVZpZXcpO1xuICAgICQuTXNnKCfinIUgRXZlbnQgbGlzdGVuZXJzIGluaXRpYWxpemVkJyk7XG59XG4vLyDliJ3lp4vljJbvvIjlg48gcGxheWluZy1odWQg5LiA5qC377yJXG5mdW5jdGlvbiBpbml0aWFsaXplQmF0dGxlRW5kVmlldygpIHtcbiAgICAkLk1zZygn8J+agCBJbml0aWFsaXppbmcgQmF0dGxlIEVuZCBWaWV3Li4uJyk7XG4gICAgLy8g56uL5Y2z5Yib5bu65a655Zmo77yM5LiN562J5b6FXG4gICAgY3JlYXRlQmF0dGxlRW5kQ29udGFpbmVyKCk7XG4gICAgLy8g5Yid5aeL5YyW5LqL5Lu255uR5ZCsXG4gICAgaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgJC5Nc2coJ+KchSBCYXR0bGUgRW5kIFZpZXcgaW5pdGlhbGl6ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG59XG4vLyDmtYvor5XnlKjnmoQgc2hvd0R1bW15IOWHveaVsFxuZnVuY3Rpb24gc2hvd0R1bW15KCkge1xuICAgIHNob3dWaWV3KHtcbiAgICAgICAgd2lubmVyOiAncGxheWVyJyxcbiAgICAgICAgcm91bmQ6IDEsXG4gICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgZGFtYWdlRGVhbHQ6IDEyNTQwLFxuICAgICAgICAgICAgZGFtYWdlVGFrZW46IDgzMjAsXG4gICAgICAgICAgICB1bml0c0tpbGxlZDogNVxuICAgICAgICB9LFxuICAgICAgICBsZXZlbE5hbWU6ICfmtYvor5XlhbPljaEnXG4gICAgfSk7XG59XG4vLyDmmrTpnLLlhajlsYBBUEnvvIjnlKjkuo7osIPor5XvvIlcbmdsb2JhbFRoaXMuQmF0dGxlRW5kVmlldyA9IHtcbiAgICBzaG93OiBzaG93VmlldyxcbiAgICBoaWRlOiBoaWRlVmlldyxcbiAgICBzaG93RHVtbXk6IHNob3dEdW1teSxcbiAgICAvLyDmtYvor5XmlbDmja5cbiAgICBzaG93VmljdG9yeTogKCkgPT4ge1xuICAgICAgICBzaG93Vmlldyh7XG4gICAgICAgICAgICB3aW5uZXI6ICdwbGF5ZXInLFxuICAgICAgICAgICAgcm91bmQ6IDUsXG4gICAgICAgICAgICBkdXJhdGlvbjogNDUwMDAsXG4gICAgICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgICAgIGRhbWFnZURlYWx0OiAxMjU0MCxcbiAgICAgICAgICAgICAgICBkYW1hZ2VUYWtlbjogODMyMCxcbiAgICAgICAgICAgICAgICB1bml0c0tpbGxlZDogMTUsXG4gICAgICAgICAgICAgICAgdW5pdHNTdXJ2aXZlZDogNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxldmVsTmFtZTogJ+e7v+aEj+W5s+WOnydcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzaG93RGVmZWF0OiAoKSA9PiB7XG4gICAgICAgIHNob3dWaWV3KHtcbiAgICAgICAgICAgIHdpbm5lcjogJ2VuZW15JyxcbiAgICAgICAgICAgIHJvdW5kOiAzLFxuICAgICAgICAgICAgZHVyYXRpb246IDMyMDAwLFxuICAgICAgICAgICAgc3RhdHM6IHtcbiAgICAgICAgICAgICAgICBkYW1hZ2VEZWFsdDogNTQyMCxcbiAgICAgICAgICAgICAgICBkYW1hZ2VUYWtlbjogMTU2ODAsXG4gICAgICAgICAgICAgICAgdW5pdHNLaWxsZWQ6IDgsXG4gICAgICAgICAgICAgICAgdW5pdHNTdXJ2aXZlZDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxldmVsTmFtZTogJ+mcnOWGu+WzoeiwtydcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbi8vIOWQr+WKqFxuaW5pdGlhbGl6ZUJhdHRsZUVuZFZpZXcoKTtcbi8vIOa3u+WKoOiwg+ivleS/oeaBr1xuJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDinIUgQmF0dGxlRW5kVmlldyBtb2R1bGUgbG9hZGVkIGFuZCBleHBvcnRlZCB0byBnbG9iYWxUaGlzJyk7XG4kLk1zZygnW0JhdHRsZUVuZFZpZXddIOKchSBCYXR0bGVFbmRWaWV3IG9iamVjdDonLCBnbG9iYWxUaGlzLkJhdHRsZUVuZFZpZXcpO1xuJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDinIUgQmF0dGxlRW5kVmlldy5zaG93IGZ1bmN0aW9uOicsIHR5cGVvZiAoKF9hID0gZ2xvYmFsVGhpcy5CYXR0bGVFbmRWaWV3KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2hvdykpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9