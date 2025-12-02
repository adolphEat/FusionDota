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
  !*** D:\SteamApp\steamapps\common\dota 2 beta\content\dota_addons\fusion\panorama\src\battleendview\index.tsx ***!
  \****************************************************************************************************************/
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "jquery");
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
    let container = root.FindChildInLayoutFile('BattleEndContainer');
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
        resultTitle.text = '胜利！';
        resultTitle.style.color = BATTLE_END_THEME.success;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.victoryGlow}`;
    }
    else if (result.winner === 'enemy') {
        resultTitle.text = '失败';
        resultTitle.style.color = BATTLE_END_THEME.danger;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.defeatGlow}`;
    }
    else {
        resultTitle.text = '平局';
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
        resultTitle.text = '胜利！';
        resultTitle.style.color = BATTLE_END_THEME.success;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.victoryGlow}`;
    }
    else if (result.winner === 'enemy') {
        resultTitle.text = '失败';
        resultTitle.style.color = BATTLE_END_THEME.danger;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.defeatGlow}`;
    }
    else {
        resultTitle.text = '平局';
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
        // 胜利时显示两个按钮，水平排列，居中对齐
        buttonsSection.style.flowChildren = 'right';
        buttonsSection.style.horizontalAlign = 'center';
        buttonsSection.style.verticalAlign = 'center';
        buttonsSection.style.width = '100%';
        // 选择关卡按钮
        const selectBtn = createStyledButton(buttonsSection, 'SelectLevelButton', '选择关卡', () => {
            $.Msg('Opening level selection...');
            Game.EmitSound('ui.button_click');
            hideView();
            GameEvents.SendCustomGameEventToServer('open_level_selection', {});
        });
        selectBtn.style.marginRight = '40px'; // 按钮之间的间距
        // 退出游戏按钮
        createStyledButton(buttonsSection, 'QuitGameButton', '退出游戏', () => {
            Game.EmitSound('ui.button_click');
            GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
        });
    }
    else {
        // 失败时只显示退出按钮（居中）
        buttonsSection.style.flowChildren = 'none';
        const quitBtn = createStyledButton(buttonsSection, 'QuitGameButton', '退出游戏', () => {
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
    buttonsSection.style.paddingLeft = '40px';
    buttonsSection.style.paddingRight = '40px';
    if (result.winner === 'player') {
        // 胜利时显示两个按钮，水平排列，居中对齐
        // 选择关卡按钮
        const selectBtn = createStyledButton(buttonsSection, 'SelectLevelButton', '选择关卡', () => {
            $.Msg('[BattleEndView] Opening level selection...');
            Game.EmitSound('ui.button_click');
            hideView();
            GameEvents.SendCustomGameEventToServer('open_level_selection', {});
        });
        selectBtn.style.marginRight = '40px'; // 按钮之间的间距
        // 退出游戏按钮
        createStyledButton(buttonsSection, 'QuitGameButton', '退出游戏', () => {
            $.Msg('[BattleEndView] Quitting game...');
            Game.EmitSound('ui.button_click');
            GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
        });
    }
    else {
        // 失败时只显示退出按钮（居中）
        buttonsSection.style.flowChildren = 'right';
        buttonsSection.style.horizontalAlign = 'center';
        createStyledButton(buttonsSection, 'QuitGameButton', '退出游戏', () => {
            $.Msg('[BattleEndView] Quitting game after defeat...');
            Game.EmitSound('ui.button_click');
            GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
        });
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
    label.style.width = '100%';
    label.style.height = '100%';
    label.style.textShadow = '2px 2px 4px #000000';
    // 使用 Panorama 的 align 属性让文字居中
    label.style.align = 'center center';
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
    if (finalParent) {
        $.Msg(`[BattleEndView] ✅ Parent size: ${finalParent.actuallayoutwidth}x${finalParent.actuallayoutheight}`);
    }
    $.Msg(`[BattleEndView] ✅ Main panel children: ${main.Children().length}`);
    // 延迟检查实际尺寸（Panorama 需要时间计算布局）
    $.Schedule(0.1, () => {
        const actualWidth = container.actuallayoutwidth;
        const actualHeight = container.actuallayoutheight;
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLENBQUM7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksQ0FBQztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xcYmF0dGxlZW5kdmlld1xcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gQHRzLW5vY2hlY2tcbi8vIOaImOaWl+e7k+eul+eVjOmdoiAtIOWfuuS6jiBwbGF5aW5nLWh1ZCDnmoTorr7orqHnu4/pqoxcbkdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4kLk1zZygn8J+PhiBCYXR0bGUgRW5kIFZpZXcgc2NyaXB0IGxvYWRpbmcuLi4nKTtcbi8vIOS4u+mimOmFjee9ru+8iOS/neaMgeS4jiBwbGF5aW5nLWh1ZCDkuIDoh7TvvIlcbmNvbnN0IEJBVFRMRV9FTkRfVEhFTUUgPSB7XG4gICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsIDIzLCA0MiwgMC45NSknLFxuICAgIHBhbmVsQmc6ICdyZ2JhKDMzLCAzNCwgMzEsIDAuOTUpJyxcbiAgICBib3JkZXJDb2xvcjogJ3JnYmEoNTksIDEzMCwgMjQ2LCAwLjQpJyxcbiAgICB0ZXh0UHJpbWFyeTogJyMzYjgyZjYnLFxuICAgIHRleHRTZWNvbmRhcnk6ICcjZmZmZmZmJyxcbiAgICB0ZXh0QWNjZW50OiAnI2ZmYzU3YScsXG4gICAgc3VjY2VzczogJyM0Y2FmNTAnLFxuICAgIHdhcm5pbmc6ICcjZmY5ODAwJyxcbiAgICBkYW5nZXI6ICcjZjQ0MzM2JyxcbiAgICB2aWN0b3J5R2xvdzogJyNmZmQ3MDAnLFxuICAgIGRlZmVhdEdsb3c6ICcjZmY0NDQ0Jyxcbn07XG4vLyDojrflj5bmoLnpnaLmnb9cbmZ1bmN0aW9uIGdldFJvb3QoKSB7XG4gICAgcmV0dXJuICQuR2V0Q29udGV4dFBhbmVsKCk7XG59XG4vLyDmn6Xmib7lrZDpnaLmnb/vvIjku44gbGF5b3V0IOaWh+S7tu+8iVxuZnVuY3Rpb24gZmluZChpZCkge1xuICAgIHJldHVybiBnZXRSb290KCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKGlkKTtcbn1cbi8vIOafpeaJvuWKqOaAgeWIm+W7uueahOWtkOmdouadv1xuZnVuY3Rpb24gZmluZENoaWxkKHBhcmVudCwgaWQpIHtcbiAgICByZXR1cm4gcGFyZW50LkZpbmRDaGlsZChpZCk7XG59XG4vLyDliJvlu7rnu5PnrpflrrnlmajvvIjlg48gcGxheWluZy1odWQg5LiA5qC35Yqo5oCB5Yib5bu677yJXG5mdW5jdGlvbiBjcmVhdGVCYXR0bGVFbmRDb250YWluZXIoKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBFcnJvcjogUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIOajgOafpeaYr+WQpuW3suWtmOWcqFxuICAgIGxldCBjb250YWluZXIgPSByb290UGFuZWwuRmluZENoaWxkKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5Jc1ZhbGlkKCkpIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBDb250YWluZXIgYWxyZWFkeSBleGlzdHMsIHJldXNpbmcnKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLy8g5Yig6Zmk5bey5a2Y5Zyo55qE5peg5pWI5a655ZmoXG4gICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLklzVmFsaWQoKSkge1xuICAgICAgICBjb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIC8vIOWIm+W7uuS4u+WuueWZqCAtIOS9v+eUqOS4jiBwbGF5aW5nLWh1ZCDlrozlhajnm7jlkIznmoTmlrnlvI9cbiAgICBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ0JhdHRsZUVuZENvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICQuTXNnKCfinYwgRmFpbGVkIHRvIGNyZWF0ZSBjb250YWluZXIgcGFuZWwnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIOeri+WNs+mqjOivgeeItuWFg+e0oFxuICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudCA9IGNvbnRhaW5lci5HZXRQYXJlbnQoKTtcbiAgICBpZiAoIWNvbnRhaW5lclBhcmVudCkge1xuICAgICAgICAkLk1zZygn4p2MIENvbnRhaW5lciBjcmVhdGVkIGJ1dCBoYXMgbm8gcGFyZW50IScpO1xuICAgICAgICBjb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoY29udGFpbmVyUGFyZW50ICE9PSByb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coYOKaoO+4jyBDb250YWluZXIgcGFyZW50ICgke2NvbnRhaW5lclBhcmVudC5pZH0pIGlzIG5vdCByb290IHBhbmVsICgke3Jvb3RQYW5lbC5pZH0pYCk7XG4gICAgfVxuICAgIGNvbnRhaW5lci5BZGRDbGFzcygnYmF0dGxlX2VuZF9jb250YWluZXInKTtcbiAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7IC8vIOm7mOiupOmakOiXj1xuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMDAnOyAvLyDmr5QgcGxheWluZy1odWQgKDEwMDApIOmrmFxuICAgIGNvbnRhaW5lci5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBDb250YWluZXIgY3JlYXRlZCwgcGFyZW50OiAkeygoX2EgPSBjb250YWluZXIuR2V0UGFyZW50KCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCkgfHwgJ251bGwnfWApO1xuICAgIC8vIOehruS/neWuueWZqOWcqOaguemdouadv+eahOacgOWQju+8iOacgOS4iuWxgu+8iVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJvb3RDaGlsZHJlbiA9IHJvb3RQYW5lbC5DaGlsZHJlbigpO1xuICAgICAgICBpZiAocm9vdENoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RDaGlsZCA9IHJvb3RDaGlsZHJlbltyb290Q2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAobGFzdENoaWxkICE9PSBjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuTW92ZUNoaWxkQWZ0ZXIoY29udGFpbmVyLCBsYXN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gTm90ZTogQ291bGQgbm90IG1vdmUgY29udGFpbmVyIHRvIHRvcDogJHtlfWApO1xuICAgIH1cbiAgICAvLyDljYrpgI/mmI7pga7nvalcbiAgICBjb25zdCBtYXNrID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdCYXR0bGVFbmRNYXNrJyk7XG4gICAgbWFzay5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuOCknO1xuICAgIG1hc2suc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFzay5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFzay5oaXR0ZXN0ID0gdHJ1ZTsgLy8g5oum5oiq54K55Ye7XG4gICAgJC5Nc2coJ+KchSBCYXR0bGUgZW5kIGNvbnRhaW5lciBjcmVhdGVkJyk7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbi8vIOiOt+WPlue7k+eul+WuueWZqFxuZnVuY3Rpb24gZ2V0QmF0dGxlRW5kQ29udGFpbmVyKCkge1xuICAgIGNvbnN0IHJvb3QgPSBnZXRSb290KCk7XG4gICAgbGV0IGNvbnRhaW5lciA9IHJvb3QuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIgPSByb290LkZpbmRDaGlsZCgnQmF0dGxlRW5kQ29udGFpbmVyJyk7XG4gICAgfVxuICAgIHJldHVybiBjb250YWluZXI7XG59XG4vLyDmm7TmlrDmoIfpopjljLrln5/vvIjkvb/nlKggbGF5b3V0IOS4reeahOmdouadv++8iVxuZnVuY3Rpb24gdXBkYXRlVGl0bGVTZWN0aW9uKHRpdGxlU2VjdGlvbiwgcmVzdWx0KSB7XG4gICAgLy8g5riF56m65pen5YaF5a6577yI5L+d55WZIGxheW91dCDkuK3lrprkuYnnmoTlrZDlhYPntKDvvIlcbiAgICBjb25zdCBleGlzdGluZ0NoaWxkcmVuID0gdGl0bGVTZWN0aW9uLkNoaWxkcmVuKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleGlzdGluZ0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZXhpc3RpbmdDaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKGNoaWxkLmlkICE9PSAnUmVzdWx0VGl0bGUnICYmIGNoaWxkLmlkICE9PSAnUm91bmRJbmZvJyAmJiBjaGlsZC5pZCAhPT0gJ0xldmVsSW5mbycpIHtcbiAgICAgICAgICAgIGNoaWxkLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOabtOaWsOaIluWIm+W7uuagh+mimFxuICAgIGxldCByZXN1bHRUaXRsZSA9IHRpdGxlU2VjdGlvbi5GaW5kQ2hpbGQoJ1Jlc3VsdFRpdGxlJyk7XG4gICAgaWYgKCFyZXN1bHRUaXRsZSkge1xuICAgICAgICByZXN1bHRUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUmVzdWx0VGl0bGUnKTtcbiAgICB9XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFNpemUgPSAnNjRweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICfog5zliKnvvIEnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuc3VjY2VzcztcbiAgICAgICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9IGAwcHggMHB4IDIwcHggJHtCQVRUTEVfRU5EX1RIRU1FLnZpY3RvcnlHbG93fWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdC53aW5uZXIgPT09ICdlbmVteScpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflpLHotKUnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuZGFuZ2VyO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gYDBweCAwcHggMjBweCAke0JBVFRMRV9FTkRfVEhFTUUuZGVmZWF0R2xvd31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflubPlsYAnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUud2FybmluZztcbiAgICB9XG4gICAgLy8g5pu05paw5Zue5ZCI5L+h5oGvXG4gICAgbGV0IHJvdW5kSW5mbyA9IHRpdGxlU2VjdGlvbi5GaW5kQ2hpbGQoJ1JvdW5kSW5mbycpO1xuICAgIGlmICghcm91bmRJbmZvKSB7XG4gICAgICAgIHJvdW5kSW5mbyA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUm91bmRJbmZvJyk7XG4gICAgfVxuICAgIHJvdW5kSW5mby50ZXh0ID0gYOesrCAke3Jlc3VsdC5yb3VuZH0g5Zue5ZCI57uT5p2fYDtcbiAgICByb3VuZEluZm8uc3R5bGUuZm9udFNpemUgPSAnMjhweCc7XG4gICAgcm91bmRJbmZvLnN0eWxlLmNvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0QWNjZW50O1xuICAgIHJvdW5kSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByb3VuZEluZm8uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgcm91bmRJbmZvLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgIC8vIOabtOaWsOWFs+WNoeS/oeaBr1xuICAgIGxldCBsZXZlbEluZm8gPSB0aXRsZVNlY3Rpb24uRmluZENoaWxkKCdMZXZlbEluZm8nKTtcbiAgICBpZiAocmVzdWx0LmxldmVsTmFtZSkge1xuICAgICAgICBpZiAoIWxldmVsSW5mbykge1xuICAgICAgICAgICAgbGV2ZWxJbmZvID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aXRsZVNlY3Rpb24sICdMZXZlbEluZm8nKTtcbiAgICAgICAgfVxuICAgICAgICBsZXZlbEluZm8udGV4dCA9IGDlhbPljaHvvJoke3Jlc3VsdC5sZXZlbE5hbWV9YDtcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gICAgZWxzZSBpZiAobGV2ZWxJbmZvKSB7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVUaXRsZVNlY3Rpb24ocGFyZW50LCByZXN1bHQpIHtcbiAgICBjb25zdCB0aXRsZVNlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0JhdHRsZUVuZFRpdGxlJyk7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTUwcHgnO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMzBweCc7XG4gICAgLy8g6IOc6LSf5qCH6aKYXG4gICAgY29uc3QgcmVzdWx0VGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlU2VjdGlvbiwgJ1Jlc3VsdFRpdGxlJyk7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFNpemUgPSAnNjRweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICfog5zliKnvvIEnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuc3VjY2VzcztcbiAgICAgICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9IGAwcHggMHB4IDIwcHggJHtCQVRUTEVfRU5EX1RIRU1FLnZpY3RvcnlHbG93fWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdC53aW5uZXIgPT09ICdlbmVteScpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflpLHotKUnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuZGFuZ2VyO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gYDBweCAwcHggMjBweCAke0JBVFRMRV9FTkRfVEhFTUUuZGVmZWF0R2xvd31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflubPlsYAnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUud2FybmluZztcbiAgICB9XG4gICAgLy8g5Zue5ZCI5L+h5oGvXG4gICAgY29uc3Qgcm91bmRJbmZvID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aXRsZVNlY3Rpb24sICdSb3VuZEluZm8nKTtcbiAgICByb3VuZEluZm8udGV4dCA9IGDnrKwgJHtyZXN1bHQucm91bmR9IOWbnuWQiOe7k+adn2A7XG4gICAgcm91bmRJbmZvLnN0eWxlLmZvbnRTaXplID0gJzI4cHgnO1xuICAgIHJvdW5kSW5mby5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dEFjY2VudDtcbiAgICByb3VuZEluZm8uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgcm91bmRJbmZvLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHJvdW5kSW5mby5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAvLyDlhbPljaHkv6Hmga9cbiAgICBpZiAocmVzdWx0LmxldmVsTmFtZSkge1xuICAgICAgICBjb25zdCBsZXZlbEluZm8gPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlU2VjdGlvbiwgJ0xldmVsSW5mbycpO1xuICAgICAgICBsZXZlbEluZm8udGV4dCA9IGDlhbPljaHvvJoke3Jlc3VsdC5sZXZlbE5hbWV9YDtcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGVTZWN0aW9uO1xufVxuLy8g5pu05paw57uf6K6h5L+h5oGv5Yy65Z+f77yI5L2/55SoIGxheW91dCDkuK3nmoTpnaLmnb/vvIlcbmZ1bmN0aW9uIHVwZGF0ZVN0YXRzU2VjdGlvbihzdGF0c1NlY3Rpb24sIHJlc3VsdCkge1xuICAgIC8vIOa4heepuue7n+iuoeihjO+8iOS/neeVmeagh+mimO+8iVxuICAgIGNvbnN0IGV4aXN0aW5nQ2hpbGRyZW4gPSBzdGF0c1NlY3Rpb24uQ2hpbGRyZW4oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4aXN0aW5nQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBleGlzdGluZ0NoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2hpbGQuaWQgIT09ICdTdGF0c1RpdGxlJykge1xuICAgICAgICAgICAgY2hpbGQuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g56Gu5L+d5qCH6aKY5a2Y5ZyoXG4gICAgbGV0IHN0YXRzVGl0bGUgPSBzdGF0c1NlY3Rpb24uRmluZENoaWxkKCdTdGF0c1RpdGxlJyk7XG4gICAgaWYgKCFzdGF0c1RpdGxlKSB7XG4gICAgICAgIHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzVGl0bGUnKTtcbiAgICAgICAgc3RhdHNUaXRsZS50ZXh0ID0gJ+aImOaWl+e7n+iuoSc7XG4gICAgICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgICAgICBzdGF0c1RpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgICAgIHN0YXRzVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIH1cbiAgICAvLyDnu5/orqHmlbDmja5cbiAgICBjb25zdCBzdGF0cyA9IHJlc3VsdC5zdGF0cyB8fCB7fTtcbiAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmiJjmlpfml7bplb8nLCBgJHtNYXRoLmZsb29yKHJlc3VsdC5kdXJhdGlvbiAvIDEwMDApfeenkmAsIDApO1xuICAgIGlmIChzdGF0cy5kYW1hZ2VEZWFsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+mAoOaIkOS8pOWusycsIGZvcm1hdE51bWJlcihzdGF0cy5kYW1hZ2VEZWFsdCksIDEpO1xuICAgIH1cbiAgICBpZiAoc3RhdHMuZGFtYWdlVGFrZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmib/lj5fkvKTlrrMnLCBmb3JtYXROdW1iZXIoc3RhdHMuZGFtYWdlVGFrZW4pLCAyKTtcbiAgICB9XG4gICAgaWYgKHN0YXRzLnVuaXRzS2lsbGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5Ye75p2A5Y2V5L2NJywgc3RhdHMudW5pdHNLaWxsZWQudG9TdHJpbmcoKSwgMyk7XG4gICAgfVxuICAgIGlmIChzdGF0cy51bml0c1N1cnZpdmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5a2Y5rS75Y2V5L2NJywgc3RhdHMudW5pdHNTdXJ2aXZlZC50b1N0cmluZygpLCA0KTtcbiAgICB9XG59XG4vLyDliJvlu7rnu5/orqHkv6Hmga/ljLrln5/vvIjkv53nlZnnlKjkuo7lhbzlrrnvvIlcbmZ1bmN0aW9uIGNyZWF0ZVN0YXRzU2VjdGlvbihwYXJlbnQsIHJlc3VsdCkge1xuICAgIGNvbnN0IHN0YXRzU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQmF0dGxlRW5kU3RhdHMnKTtcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICcyMDBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzMwcHgnO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIC8vIOagh+mimFxuICAgIGNvbnN0IHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzVGl0bGUnKTtcbiAgICBzdGF0c1RpdGxlLnRleHQgPSAn5oiY5paX57uf6K6hJztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLmZvbnRTaXplID0gJzI0cHgnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICAvLyDnu5/orqHmlbDmja5cbiAgICBjb25zdCBzdGF0cyA9IHJlc3VsdC5zdGF0cyB8fCB7fTtcbiAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmiJjmlpfml7bplb8nLCBgJHtNYXRoLmZsb29yKHJlc3VsdC5kdXJhdGlvbiAvIDEwMDApfeenkmAsIDApO1xuICAgIGlmIChzdGF0cy5kYW1hZ2VEZWFsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+mAoOaIkOS8pOWusycsIGZvcm1hdE51bWJlcihzdGF0cy5kYW1hZ2VEZWFsdCksIDEpO1xuICAgIH1cbiAgICBpZiAoc3RhdHMuZGFtYWdlVGFrZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmib/lj5fkvKTlrrMnLCBmb3JtYXROdW1iZXIoc3RhdHMuZGFtYWdlVGFrZW4pLCAyKTtcbiAgICB9XG4gICAgaWYgKHN0YXRzLnVuaXRzS2lsbGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5Ye75p2A5Y2V5L2NJywgc3RhdHMudW5pdHNLaWxsZWQudG9TdHJpbmcoKSwgMyk7XG4gICAgfVxuICAgIGlmIChzdGF0cy51bml0c1N1cnZpdmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5a2Y5rS75Y2V5L2NJywgc3RhdHMudW5pdHNTdXJ2aXZlZC50b1N0cmluZygpLCA0KTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRzU2VjdGlvbjtcbn1cbi8vIOWIm+W7uuWNleS4que7n+iuoeihjFxuZnVuY3Rpb24gY3JlYXRlU3RhdExpbmUocGFyZW50LCBsYWJlbCwgdmFsdWUsIGluZGV4KSB7XG4gICAgY29uc3QgbGluZSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgU3RhdExpbmVfJHtpbmRleH1gKTtcbiAgICBsaW5lLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxpbmUuc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGxpbmUuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBsaW5lLnN0eWxlLm1hcmdpblRvcCA9ICc1cHgnO1xuICAgIGNvbnN0IGxhYmVsVGV4dCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbGluZSwgYFN0YXRMYWJlbF8ke2luZGV4fWApO1xuICAgIGxhYmVsVGV4dC50ZXh0ID0gbGFiZWw7XG4gICAgbGFiZWxUZXh0LnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIGxhYmVsVGV4dC5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBsYWJlbFRleHQuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgbGFiZWxUZXh0LnN0eWxlLm9wYWNpdHkgPSAnMC44JztcbiAgICBjb25zdCB2YWx1ZVRleHQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxpbmUsIGBTdGF0VmFsdWVfJHtpbmRleH1gKTtcbiAgICB2YWx1ZVRleHQudGV4dCA9IHZhbHVlO1xuICAgIHZhbHVlVGV4dC5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB2YWx1ZVRleHQuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgdmFsdWVUZXh0LnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdmFsdWVUZXh0LnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCc7XG59XG4vLyDmm7TmlrDmjInpkq7ljLrln5/vvIjkvb/nlKggbGF5b3V0IOS4reeahOmdouadv++8iVxuZnVuY3Rpb24gdXBkYXRlQnV0dG9uc1NlY3Rpb24oYnV0dG9uc1NlY3Rpb24sIHJlc3VsdCkge1xuICAgIC8vIOa4heepuuaJgOacieaMiemSrlxuICAgIGJ1dHRvbnNTZWN0aW9uLlJlbW92ZUFuZERlbGV0ZUNoaWxkcmVuKCk7XG4gICAgaWYgKHJlc3VsdC53aW5uZXIgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIC8vIOiDnOWIqeaXtuaYvuekuuS4pOS4quaMiemSru+8jOawtOW5s+aOkuWIl++8jOWxheS4reWvuem9kFxuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgLy8g6YCJ5oup5YWz5Y2h5oyJ6ZKuXG4gICAgICAgIGNvbnN0IHNlbGVjdEJ0biA9IGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1NlbGVjdExldmVsQnV0dG9uJywgJ+mAieaLqeWFs+WNoScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCdPcGVuaW5nIGxldmVsIHNlbGVjdGlvbi4uLicpO1xuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9jbGljaycpO1xuICAgICAgICAgICAgaGlkZVZpZXcoKTtcbiAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdvcGVuX2xldmVsX3NlbGVjdGlvbicsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGVjdEJ0bi5zdHlsZS5tYXJnaW5SaWdodCA9ICc0MHB4JzsgLy8g5oyJ6ZKu5LmL6Ze055qE6Ze06LedXG4gICAgICAgIC8vIOmAgOWHuua4uOaIj+aMiemSrlxuICAgICAgICBjcmVhdGVTdHlsZWRCdXR0b24oYnV0dG9uc1NlY3Rpb24sICdRdWl0R2FtZUJ1dHRvbicsICfpgIDlh7rmuLjmiI8nLCAoKSA9PiB7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncXVpdF90b19tZW51Jywge30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIOWksei0peaXtuWPquaYvuekuumAgOWHuuaMiemSru+8iOWxheS4re+8iVxuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnbm9uZSc7XG4gICAgICAgIGNvbnN0IHF1aXRCdG4gPSBjcmVhdGVTdHlsZWRCdXR0b24oYnV0dG9uc1NlY3Rpb24sICdRdWl0R2FtZUJ1dHRvbicsICfpgIDlh7rmuLjmiI8nLCAoKSA9PiB7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncXVpdF90b19tZW51Jywge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgcXVpdEJ0bi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICB9XG59XG4vLyDliJvlu7rmjInpkq7ljLrln5/vvIjkv53nlZnnlKjkuo7lhbzlrrnvvIlcbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbnNTZWN0aW9uKHBhcmVudCwgcmVzdWx0KSB7XG4gICAgY29uc3QgYnV0dG9uc1NlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0JhdHRsZUVuZEJ1dHRvbnMnKTtcbiAgICBidXR0b25zU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTAwcHgnO1xuICAgIGJ1dHRvbnNTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUucGFkZGluZ0xlZnQgPSAnNDBweCc7XG4gICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzQwcHgnO1xuICAgIGlmIChyZXN1bHQud2lubmVyID09PSAncGxheWVyJykge1xuICAgICAgICAvLyDog5zliKnml7bmmL7npLrkuKTkuKrmjInpkq7vvIzmsLTlubPmjpLliJfvvIzlsYXkuK3lr7npvZBcbiAgICAgICAgLy8g6YCJ5oup5YWz5Y2h5oyJ6ZKuXG4gICAgICAgIGNvbnN0IHNlbGVjdEJ0biA9IGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1NlbGVjdExldmVsQnV0dG9uJywgJ+mAieaLqeWFs+WNoScsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gT3BlbmluZyBsZXZlbCBzZWxlY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5idXR0b25fY2xpY2snKTtcbiAgICAgICAgICAgIGhpZGVWaWV3KCk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcignb3Blbl9sZXZlbF9zZWxlY3Rpb24nLCB7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3RCdG4uc3R5bGUubWFyZ2luUmlnaHQgPSAnNDBweCc7IC8vIOaMiemSruS5i+mXtOeahOmXtOi3nVxuICAgICAgICAvLyDpgIDlh7rmuLjmiI/mjInpkq5cbiAgICAgICAgY3JlYXRlU3R5bGVkQnV0dG9uKGJ1dHRvbnNTZWN0aW9uLCAnUXVpdEdhbWVCdXR0b24nLCAn6YCA5Ye65ri45oiPJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBRdWl0dGluZyBnYW1lLi4uJyk7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncXVpdF90b19tZW51Jywge30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIOWksei0peaXtuWPquaYvuekuumAgOWHuuaMiemSru+8iOWxheS4re+8iVxuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY3JlYXRlU3R5bGVkQnV0dG9uKGJ1dHRvbnNTZWN0aW9uLCAnUXVpdEdhbWVCdXR0b24nLCAn6YCA5Ye65ri45oiPJywgKCkgPT4ge1xuICAgICAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBRdWl0dGluZyBnYW1lIGFmdGVyIGRlZmVhdC4uLicpO1xuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9jbGljaycpO1xuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3F1aXRfdG9fbWVudScsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBidXR0b25zU2VjdGlvbjtcbn1cbi8vIOWIm+W7uuagt+W8j+WMluaMiemSru+8iOWPguiAgyBwbGF5aW5nLWh1ZCDpo47moLzvvIlcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlZEJ1dHRvbihwYXJlbnQsIGlkLCB0ZXh0LCBvbkNsaWNrKSB7XG4gICAgY29uc3QgYnV0dG9uID0gJC5DcmVhdGVQYW5lbCgnQnV0dG9uJywgcGFyZW50LCBpZCk7XG4gICAgYnV0dG9uLkFkZENsYXNzKCdiYXR0bGVfZW5kX2J1dHRvbicpO1xuICAgIGJ1dHRvbi5zdHlsZS53aWR0aCA9ICcyODBweCc7XG4gICAgYnV0dG9uLnN0eWxlLmhlaWdodCA9ICc2MHB4JztcbiAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0UHJpbWFyeTtcbiAgICBidXR0b24uc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknO1xuICAgIGJ1dHRvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgYnV0dG9uLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggNHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBjb25zdCBsYWJlbCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgYnV0dG9uLCBgJHtpZH1fTGFiZWxgKTtcbiAgICBsYWJlbC50ZXh0ID0gdGV4dDtcbiAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcyNHB4JztcbiAgICBsYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICBsYWJlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGxhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxhYmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxhYmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBsYWJlbC5zdHlsZS50ZXh0U2hhZG93ID0gJzJweCAycHggNHB4ICMwMDAwMDAnO1xuICAgIC8vIOS9v+eUqCBQYW5vcmFtYSDnmoQgYWxpZ24g5bGe5oCn6K6p5paH5a2X5bGF5LitXG4gICAgbGFiZWwuc3R5bGUuYWxpZ24gPSAnY2VudGVyIGNlbnRlcic7XG4gICAgbGFiZWwuaGl0dGVzdCA9IGZhbHNlO1xuICAgIGJ1dHRvbi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIEJ1dHRvbiBjbGlja2VkOiAke3RleHR9YCk7XG4gICAgICAgIG9uQ2xpY2soKTtcbiAgICB9KTtcbiAgICAvLyDmgqzlgZzmlYjmnpxcbiAgICBidXR0b24uU2V0UGFuZWxFdmVudCgnb25tb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgxLjA1LCAxLjA1LCAxLjApJztcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9vdmVyJyk7XG4gICAgfSk7XG4gICAgYnV0dG9uLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgICAgICBidXR0b24uc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMS4wLCAxLjAsIDEuMCknO1xuICAgIH0pO1xuICAgIHJldHVybiBidXR0b247XG59XG4vLyDmoLzlvI/ljJbmlbDlrZdcbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW0pIHtcbiAgICBpZiAobnVtID49IDEwMDAwMDApIHtcbiAgICAgICAgcmV0dXJuIChudW0gLyAxMDAwMDAwKS50b0ZpeGVkKDEpICsgJ00nO1xuICAgIH1cbiAgICBlbHNlIGlmIChudW0gPj0gMTAwMCkge1xuICAgICAgICByZXR1cm4gKG51bSAvIDEwMDApLnRvRml4ZWQoMSkgKyAnSyc7XG4gICAgfVxuICAgIHJldHVybiBudW0udG9TdHJpbmcoKTtcbn1cbi8vIOaYvuekuue7k+eul+eVjOmdou+8iOWujOWFqOWKqOaAgeWIm+W7uu+8jOWDjyBwbGF5aW5nLWh1ZCDkuIDmoLfvvIlcbmZ1bmN0aW9uIHNob3dWaWV3KHJlc3VsdCkge1xuICAgICQuTXNnKCfwn4+GIFNob3dpbmcgYmF0dGxlIGVuZCB2aWV3IHdpdGggcmVzdWx0OicsIHJlc3VsdCk7XG4gICAgLy8g6I635Y+W5qC56Z2i5p2/77yI5LiOIHBsYXlpbmctaHVkIOWujOWFqOS4gOiHtO+8iVxuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBSb290IHBhbmVsIG5vdCBmb3VuZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gUm9vdCBwYW5lbCBpZDogJHtyb290UGFuZWwuaWQgfHwgJ2VtcHR5J30sIHNpemU6ICR7cm9vdFBhbmVsLmFjdHVhbGxheW91dHdpZHRofXgke3Jvb3RQYW5lbC5hY3R1YWxsYXlvdXRoZWlnaHR9LCBjaGlsZHJlbjogJHtyb290UGFuZWwuQ2hpbGRyZW4oKS5sZW5ndGh9YCk7XG4gICAgLy8g5aaC5p6c5qC56Z2i5p2/5bC65a+45Li6IDDvvIzkvb/nlKjlsY/luZXliIbovqjnjofkvZzkuLrlpIfnlKhcbiAgICBsZXQgdXNlU2NyZWVuU2l6ZSA9IGZhbHNlO1xuICAgIGlmIChyb290UGFuZWwuYWN0dWFsbGF5b3V0d2lkdGggPT09IDAgfHwgcm9vdFBhbmVsLmFjdHVhbGxheW91dGhlaWdodCA9PT0gMCkge1xuICAgICAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIOKaoO+4jyBSb290IHBhbmVsIHNpemUgaXMgMCwgd2lsbCB1c2Ugc2NyZWVuIHJlc29sdXRpb24nKTtcbiAgICAgICAgdXNlU2NyZWVuU2l6ZSA9IHRydWU7XG4gICAgfVxuICAgIC8vIOWIoOmZpOW3suWtmOWcqOeahOWuueWZqO+8iOWmguaenOWtmOWcqO+8iVxuICAgIGxldCBleGlzdGluZ0NvbnRhaW5lciA9IHJvb3RQYW5lbC5GaW5kQ2hpbGQoJ0JhdHRsZUVuZENvbnRhaW5lcicpO1xuICAgIGlmIChleGlzdGluZ0NvbnRhaW5lcikge1xuICAgICAgICBleGlzdGluZ0NvbnRhaW5lci5EZWxldGVBc3luYygwKTtcbiAgICB9XG4gICAgZXhpc3RpbmdDb250YWluZXIgPSByb290UGFuZWwuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIC8vIOWujOWFqOWKqOaAgeWIm+W7uuWuueWZqO+8iOWDjyBwbGF5aW5nLWh1ZCDkuIDmoLfvvIlcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIENyZWF0aW5nIGNvbnRhaW5lciBkeW5hbWljYWxseSAobGlrZSBwbGF5aW5nLWh1ZCkuLi4nKTtcbiAgICBjb25zdCBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ0JhdHRsZUVuZENvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICQuTXNnKCfinYwgRmFpbGVkIHRvIGNyZWF0ZSBjb250YWluZXInKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDorr7nva7lrrnlmajmoLflvI/vvIjkuI4gcGxheWluZy1odWQg5a6M5YWo5LiA6Ie055qE5pa55byP77yJXG4gICAgY29udGFpbmVyLkFkZENsYXNzKCdiYXR0bGVfZW5kX2NvbnRhaW5lcicpO1xuICAgIC8vIOWmguaenOaguemdouadv+WwuuWvuOS4uiAw77yM5L2/55So5bGP5bmV5YiG6L6o546HXG4gICAgaWYgKHVzZVNjcmVlblNpemUpIHtcbiAgICAgICAgLy8g6I635Y+W5bGP5bmV5YiG6L6o546H77yI6YCa5bi4IFBhbm9yYW1hIOS9v+eUqCAxOTIweDEwODAg5oiW5a6e6ZmF5YiG6L6o546H77yJXG4gICAgICAgIGNvbnN0IHNjcmVlbldpZHRoID0gR2FtZS5HZXRTY3JlZW5XaWR0aCgpO1xuICAgICAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSBHYW1lLkdldFNjcmVlbkhlaWdodCgpO1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIFVzaW5nIHNjcmVlbiBzaXplOiAke3NjcmVlbldpZHRofXgke3NjcmVlbkhlaWdodH1gKTtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7c2NyZWVuV2lkdGh9cHhgO1xuICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gYCR7c2NyZWVuSGVpZ2h0fXB4YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICB9XG4gICAgY29udGFpbmVyLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lci5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGFpbmVyLnN0eWxlLnpJbmRleCA9ICcxMDAwMCc7IC8vIOavlCBwbGF5aW5nLWh1ZCAoMTAwMCkg6auYXG4gICAgY29udGFpbmVyLmhpdHRlc3QgPSBmYWxzZTtcbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJzsgLy8g5pi+5byP6K6+572u5Li65Y+v6KeBXG4gICAgLy8g6aqM6K+B54i25YWD57SgXG4gICAgY29uc3QgY29udGFpbmVyUGFyZW50ID0gY29udGFpbmVyLkdldFBhcmVudCgpO1xuICAgIGlmICghY29udGFpbmVyUGFyZW50KSB7XG4gICAgICAgICQuTXNnKCfinYwgQ29udGFpbmVyIGhhcyBubyBwYXJlbnQhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBDb250YWluZXIgcGFyZW50OiAke2NvbnRhaW5lclBhcmVudC5pZCB8fCAncm9vdCd9LCBwYXJlbnQgc2l6ZTogJHtjb250YWluZXJQYXJlbnQuYWN0dWFsbGF5b3V0d2lkdGh9eCR7Y29udGFpbmVyUGFyZW50LmFjdHVhbGxheW91dGhlaWdodH1gKTtcbiAgICAvLyDliJvlu7rpga7nvalcbiAgICBjb25zdCBtYXNrID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdCYXR0bGVFbmRNYXNrJyk7XG4gICAgbWFzay5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuOCknO1xuICAgIG1hc2suc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFzay5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFzay5oaXR0ZXN0ID0gdHJ1ZTtcbiAgICAvLyDliJvlu7rkuLvpnaLmnb/vvIjlrozlhajliqjmgIHliJvlu7rvvIlcbiAgICBjb25zdCBtYWluID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdCYXR0bGVFbmRNYWluJyk7XG4gICAgbWFpbi5zdHlsZS53aWR0aCA9ICc4MDBweCc7XG4gICAgbWFpbi5zdHlsZS5oZWlnaHQgPSAnNjAwcHgnO1xuICAgIG1haW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQkFUVExFX0VORF9USEVNRS5wYW5lbEJnO1xuICAgIG1haW4uc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke0JBVFRMRV9FTkRfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBtYWluLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcyMHB4JztcbiAgICBtYWluLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggMHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBtYWluLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1haW4uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1haW4uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIG1haW4uc3R5bGUucGFkZGluZyA9ICc0MHB4JztcbiAgICAvLyDliJvlu7rlkITkuKrljLrln5/vvIjlrozlhajliqjmgIHliJvlu7rvvIlcbiAgICBjcmVhdGVUaXRsZVNlY3Rpb24obWFpbiwgcmVzdWx0KTtcbiAgICBjcmVhdGVTdGF0c1NlY3Rpb24obWFpbiwgcmVzdWx0KTtcbiAgICBjcmVhdGVCdXR0b25zU2VjdGlvbihtYWluLCByZXN1bHQpO1xuICAgIC8vIOehruS/neWuueWZqOWcqOaguemdouadv+eahOacgOWQju+8iOacgOS4iuWxgu+8iVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJvb3RDaGlsZHJlbiA9IHJvb3RQYW5lbC5DaGlsZHJlbigpO1xuICAgICAgICBpZiAocm9vdENoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RDaGlsZCA9IHJvb3RDaGlsZHJlbltyb290Q2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAobGFzdENoaWxkICE9PSBjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuTW92ZUNoaWxkQWZ0ZXIoY29udGFpbmVyLCBsYXN0Q2hpbGQpO1xuICAgICAgICAgICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gQ29udGFpbmVyIG1vdmVkIHRvIHRvcGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gTm90ZTogQ291bGQgbm90IG1vdmUgY29udGFpbmVyOiAke2V9YCk7XG4gICAgfVxuICAgIC8vIOW8uuWItuWIt+aWsOW4g+WxgFxuICAgIGNvbnRhaW5lci5TZXRIYXNDbGFzcygnYmF0dGxlX2VuZF9jb250YWluZXInLCB0cnVlKTtcbiAgICAvLyDmnIDnu4jpqozor4FcbiAgICBjb25zdCBmaW5hbFBhcmVudCA9IGNvbnRhaW5lci5HZXRQYXJlbnQoKTtcbiAgICBpZiAoZmluYWxQYXJlbnQpIHtcbiAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDinIUgUGFyZW50IHNpemU6ICR7ZmluYWxQYXJlbnQuYWN0dWFsbGF5b3V0d2lkdGh9eCR7ZmluYWxQYXJlbnQuYWN0dWFsbGF5b3V0aGVpZ2h0fWApO1xuICAgIH1cbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIOKchSBNYWluIHBhbmVsIGNoaWxkcmVuOiAke21haW4uQ2hpbGRyZW4oKS5sZW5ndGh9YCk7XG4gICAgLy8g5bu26L+f5qOA5p+l5a6e6ZmF5bC65a+477yIUGFub3JhbWEg6ZyA6KaB5pe26Ze06K6h566X5biD5bGA77yJXG4gICAgJC5TY2hlZHVsZSgwLjEsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsV2lkdGggPSBjb250YWluZXIuYWN0dWFsbGF5b3V0d2lkdGg7XG4gICAgICAgIGNvbnN0IGFjdHVhbEhlaWdodCA9IGNvbnRhaW5lci5hY3R1YWxsYXlvdXRoZWlnaHQ7XG4gICAgICAgIC8vIOWmguaenOWwuuWvuOS7jeeEtuS4uiAw77yM5L2/55So5bGP5bmV5YiG6L6o546HXG4gICAgICAgIGlmIChhY3R1YWxXaWR0aCA9PT0gMCB8fCBhY3R1YWxIZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10g4pqg77iPIENvbnRhaW5lciBzaXplIGlzIHN0aWxsIDAsIHVzaW5nIHNjcmVlbiByZXNvbHV0aW9uLi4uJyk7XG4gICAgICAgICAgICBjb25zdCBzY3JlZW5XaWR0aCA9IEdhbWUuR2V0U2NyZWVuV2lkdGgoKTtcbiAgICAgICAgICAgIGNvbnN0IHNjcmVlbkhlaWdodCA9IEdhbWUuR2V0U2NyZWVuSGVpZ2h0KCk7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBgJHtzY3JlZW5XaWR0aH1weGA7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gYCR7c2NyZWVuSGVpZ2h0fXB4YDtcbiAgICAgICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gU2V0IGNvbnRhaW5lciBzaXplIHRvICR7c2NyZWVuV2lkdGh9eCR7c2NyZWVuSGVpZ2h0fXB4YCk7XG4gICAgICAgICAgICAvLyDlho3mrKHmo4Dmn6VcbiAgICAgICAgICAgICQuU2NoZWR1bGUoMC4xLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSBjb250YWluZXIuYWN0dWFsbGF5b3V0d2lkdGg7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gY29udGFpbmVyLmFjdHVhbGxheW91dGhlaWdodDtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIOKchSBDb250YWluZXIgc2l6ZSBhZnRlciBmaXg6ICR7bmV3V2lkdGh9eCR7bmV3SGVpZ2h0fWApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyDmkq3mlL7pn7PmlYhcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLnZpY3RvcnknKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ2VuZW15Jykge1xuICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuZGVmZWF0Jyk7XG4gICAgfVxufVxuLy8g6ZqQ6JeP57uT566X55WM6Z2iXG5mdW5jdGlvbiBoaWRlVmlldygpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBnZXRCYXR0bGVFbmRDb250YWluZXIoKTtcbiAgICBpZiAoY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICAgICAgJC5Nc2coJ/CflJIgQmF0dGxlIGVuZCB2aWV3IGhpZGRlbicpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJC5Nc2coJ+KaoO+4jyBCYXR0bGVFbmRDb250YWluZXIgbm90IGZvdW5kIHdoZW4gdHJ5aW5nIHRvIGhpZGUnKTtcbiAgICB9XG59XG4vLyDlpITnkIbmiJjmlpfnu5PmnZ/kuovku7ZcbmZ1bmN0aW9uIGhhbmRsZUJhdHRsZUVuZGVkKGRhdGEpIHtcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIEJhdHRsZSBlbmRlZCBldmVudCByZWNlaXZlZDonLCBkYXRhKTtcbiAgICBjb25zdCByZXN1bHQgPSBkYXRhLnJlc3VsdCB8fCB7fTtcbiAgICAvLyDovazmjaLmlbDmja7moLzlvI9cbiAgICBjb25zdCBiYXR0bGVSZXN1bHQgPSB7XG4gICAgICAgIHdpbm5lcjogcmVzdWx0Lndpbm5lciB8fCAnZHJhdycsXG4gICAgICAgIHJvdW5kOiByZXN1bHQucm91bmQgfHwgMSxcbiAgICAgICAgZHVyYXRpb246IHJlc3VsdC5kdXJhdGlvbiB8fCAwLFxuICAgICAgICBzdGF0czogcmVzdWx0LnN0YXRzLFxuICAgICAgICBsZXZlbElkOiByZXN1bHQubGV2ZWxJZCxcbiAgICAgICAgbGV2ZWxOYW1lOiByZXN1bHQubGV2ZWxOYW1lXG4gICAgfTtcbiAgICAvLyDlu7bov5/mmL7npLrvvIzorqnmiJjmlpflnLrmma/mnInml7bpl7TmuIXnkIZcbiAgICAkLlNjaGVkdWxlKDAuNSwgKCkgPT4ge1xuICAgICAgICBzaG93VmlldyhiYXR0bGVSZXN1bHQpO1xuICAgIH0pO1xufVxuLy8g5aSE55CG5rOi5qyh57uT566X5LqL5Lu277yI6Ieq6LWw5qOL5qih5byP77yJXG5mdW5jdGlvbiBoYW5kbGVXYXZlU2V0dGxlbWVudChkYXRhKSB7XG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBXYXZlIHNldHRsZW1lbnQgZXZlbnQgcmVjZWl2ZWQ6JywgZGF0YSk7XG4gICAgLy8g5LuOIEF1dG9DaGVzc01vZGUg6I635Y+W6IOc6LSf5L+h5oGvXG4gICAgLy8g5rOo5oSP77yac3RhdHMg5bqU6K+l5p2l6IeqIGRhdGEuc3RhdHPvvIzogIzkuI3mmK8gZGF0YS5wbGF5ZXJTdW1tYXJ5XG4gICAgY29uc3QgYmF0dGxlUmVzdWx0ID0ge1xuICAgICAgICB3aW5uZXI6IGRhdGEud2lubmVyIHx8ICdwbGF5ZXInLCAvLyDpu5jorqTnjqnlrrbog5zliKlcbiAgICAgICAgcm91bmQ6IGRhdGEucm91bmQgfHwgMSxcbiAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24gfHwgMCxcbiAgICAgICAgc3RhdHM6IGRhdGEuc3RhdHMgfHwge30sIC8vIOS9v+eUqCBkYXRhLnN0YXRzIOiAjOS4jeaYryBkYXRhLnBsYXllclN1bW1hcnlcbiAgICAgICAgbGV2ZWxOYW1lOiBkYXRhLmxldmVsTmFtZSB8fCB1bmRlZmluZWRcbiAgICB9O1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gUHJvY2Vzc2VkIGJhdHRsZSByZXN1bHQ6JywgYmF0dGxlUmVzdWx0KTtcbiAgICBzaG93VmlldyhiYXR0bGVSZXN1bHQpO1xufVxuLy8g5Yid5aeL5YyW5LqL5Lu26K6i6ZiFXG5mdW5jdGlvbiBpbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgJC5Nc2coJ/Cfk6EgSW5pdGlhbGl6aW5nIGJhdHRsZSBlbmQgdmlldyBldmVudCBsaXN0ZW5lcnMuLi4nKTtcbiAgICAvLyDnm5HlkKzmiJjmlpfnu5PmnZ/kuovku7ZcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnYmF0dGxlX2VuZGVkJywgaGFuZGxlQmF0dGxlRW5kZWQpO1xuICAgIC8vIOebkeWQrOiHqui1sOaji+azouasoee7k+eul1xuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdhdXRvY2hlc3Nfd2F2ZV9zZXR0bGVtZW50JywgaGFuZGxlV2F2ZVNldHRsZW1lbnQpO1xuICAgIC8vIOebkeWQrOWFs+mXreS6i+S7tlxuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdiYXR0bGVfZW5kX2Rpc21pc3MnLCBoaWRlVmlldyk7XG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2F1dG9jaGVzc193YXZlX3NldHRsZW1lbnRfZGlzbWlzcycsIGhpZGVWaWV3KTtcbiAgICAkLk1zZygn4pyFIEV2ZW50IGxpc3RlbmVycyBpbml0aWFsaXplZCcpO1xufVxuLy8g5Yid5aeL5YyW77yI5YOPIHBsYXlpbmctaHVkIOS4gOagt++8iVxuZnVuY3Rpb24gaW5pdGlhbGl6ZUJhdHRsZUVuZFZpZXcoKSB7XG4gICAgJC5Nc2coJ/CfmoAgSW5pdGlhbGl6aW5nIEJhdHRsZSBFbmQgVmlldy4uLicpO1xuICAgIC8vIOeri+WNs+WIm+W7uuWuueWZqO+8jOS4jeetieW+hVxuICAgIGNyZWF0ZUJhdHRsZUVuZENvbnRhaW5lcigpO1xuICAgIC8vIOWIneWni+WMluS6i+S7tuebkeWQrFxuICAgIGluaXRpYWxpemVFdmVudExpc3RlbmVycygpO1xuICAgICQuTXNnKCfinIUgQmF0dGxlIEVuZCBWaWV3IGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseScpO1xufVxuLy8g5rWL6K+V55So55qEIHNob3dEdW1teSDlh73mlbBcbmZ1bmN0aW9uIHNob3dEdW1teSgpIHtcbiAgICBzaG93Vmlldyh7XG4gICAgICAgIHdpbm5lcjogJ3BsYXllcicsXG4gICAgICAgIHJvdW5kOiAxLFxuICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgc3RhdHM6IHtcbiAgICAgICAgICAgIGRhbWFnZURlYWx0OiAxMjU0MCxcbiAgICAgICAgICAgIGRhbWFnZVRha2VuOiA4MzIwLFxuICAgICAgICAgICAgdW5pdHNLaWxsZWQ6IDVcbiAgICAgICAgfSxcbiAgICAgICAgbGV2ZWxOYW1lOiAn5rWL6K+V5YWz5Y2hJ1xuICAgIH0pO1xufVxuLy8g5pq06Zyy5YWo5bGAQVBJ77yI55So5LqO6LCD6K+V77yJXG5nbG9iYWxUaGlzLkJhdHRsZUVuZFZpZXcgPSB7XG4gICAgc2hvdzogc2hvd1ZpZXcsXG4gICAgaGlkZTogaGlkZVZpZXcsXG4gICAgc2hvd0R1bW15OiBzaG93RHVtbXksXG4gICAgLy8g5rWL6K+V5pWw5o2uXG4gICAgc2hvd1ZpY3Rvcnk6ICgpID0+IHtcbiAgICAgICAgc2hvd1ZpZXcoe1xuICAgICAgICAgICAgd2lubmVyOiAncGxheWVyJyxcbiAgICAgICAgICAgIHJvdW5kOiA1LFxuICAgICAgICAgICAgZHVyYXRpb246IDQ1MDAwLFxuICAgICAgICAgICAgc3RhdHM6IHtcbiAgICAgICAgICAgICAgICBkYW1hZ2VEZWFsdDogMTI1NDAsXG4gICAgICAgICAgICAgICAgZGFtYWdlVGFrZW46IDgzMjAsXG4gICAgICAgICAgICAgICAgdW5pdHNLaWxsZWQ6IDE1LFxuICAgICAgICAgICAgICAgIHVuaXRzU3Vydml2ZWQ6IDVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZXZlbE5hbWU6ICfnu7/mhI/lubPljp8nXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc2hvd0RlZmVhdDogKCkgPT4ge1xuICAgICAgICBzaG93Vmlldyh7XG4gICAgICAgICAgICB3aW5uZXI6ICdlbmVteScsXG4gICAgICAgICAgICByb3VuZDogMyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMjAwMCxcbiAgICAgICAgICAgIHN0YXRzOiB7XG4gICAgICAgICAgICAgICAgZGFtYWdlRGVhbHQ6IDU0MjAsXG4gICAgICAgICAgICAgICAgZGFtYWdlVGFrZW46IDE1NjgwLFxuICAgICAgICAgICAgICAgIHVuaXRzS2lsbGVkOiA4LFxuICAgICAgICAgICAgICAgIHVuaXRzU3Vydml2ZWQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZXZlbE5hbWU6ICfpnJzlhrvls6HosLcnXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4vLyDlkK/liqhcbmluaXRpYWxpemVCYXR0bGVFbmRWaWV3KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=