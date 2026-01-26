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
        // 胜利时显示按钮，水平排列，居中对齐
        buttonsSection.style.flowChildren = 'right';
        buttonsSection.style.horizontalAlign = 'center';
        buttonsSection.style.verticalAlign = 'center';
        buttonsSection.style.width = '100%';
        // 检查是否有海克斯强化选项
        const hasAugments = result.augmentOptions && result.augmentOptions.length > 0;
        // 如果没有海克斯强化，显示"选择关卡"按钮（有海克斯强化时，直接点击卡片跳转）
        if (!hasAugments) {
            const selectBtn = createStyledButton(buttonsSection, 'SelectLevelButton', '选择关卡', () => {
                Game.EmitSound('ui.button_click');
                // 先打开选关界面
                if (globalThis.StageSelect && globalThis.StageSelect.show) {
                    globalThis.StageSelect.show();
                }
                // 再隐藏结算界面
                hideView();
            });
            selectBtn.style.marginRight = '40px';
        }
        // 第9关时添加撤离按钮
        if (result.round === 9) {
            const evacuateBtn = createStyledButton(buttonsSection, 'EvacuateButton', '撤离', () => {
                $.Msg('[BattleEndView] Evacuating from round 9...');
                Game.EmitSound('ui.button_click');
                GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
            });
            evacuateBtn.style.marginRight = '40px';
        }
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
        // 胜利时显示按钮，水平排列，居中对齐
        // 检查是否有海克斯强化选项
        const hasAugments = result.augmentOptions && result.augmentOptions.length > 0;
        // 如果没有海克斯强化，显示"选择关卡"按钮（有海克斯强化时，直接点击卡片跳转）
        if (!hasAugments) {
            const selectBtn = createStyledButton(buttonsSection, 'SelectLevelButton', '选择关卡', () => {
                $.Msg('[BattleEndView] Opening level selection directly...');
                Game.EmitSound('ui.button_click');
                hideView();
                // 单机模式：直接打开选关界面
                if (globalThis.StageSelect && globalThis.StageSelect.show) {
                    globalThis.StageSelect.show();
                }
                else {
                    $.Msg('[BattleEndView] Warning: StageSelect.show not available');
                }
            });
            selectBtn.style.marginRight = '40px';
        }
        // 第9关时添加撤离按钮
        if (result.round === 9) {
            const evacuateBtn = createStyledButton(buttonsSection, 'EvacuateButton', '撤离', () => {
                $.Msg('[BattleEndView] Evacuating from round 9...');
                Game.EmitSound('ui.button_click');
                GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
            });
            evacuateBtn.style.marginRight = '40px';
        }
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
    // 按钮尺寸缩小到0.5倍
    button.style.width = '140px';
    button.style.height = '30px';
    button.style.backgroundColor = BATTLE_END_THEME.textPrimary;
    button.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    button.style.borderRadius = '5px';
    button.style.boxShadow = '0px 2px 5px rgba(0, 0, 0, 0.3)';
    const label = $.CreatePanel('Label', button, `${id}_Label`);
    label.text = text;
    label.style.fontSize = '12px'; // 字体缩小到0.5倍
    label.style.color = '#ffffff';
    label.style.fontWeight = 'bold';
    label.style.textAlign = 'center';
    label.style.width = '100%';
    label.style.height = '100%';
    label.style.textShadow = '1px 1px 2px #000000';
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
// 海克斯强化选择相关
let selectedAugmentId = null;
// 创建海克斯强化选择区域
function createAugmentSection(parent, augmentOptions) {
    $.Msg(`[BattleEndView] 🎁 ========== Creating augment section ==========`);
    $.Msg(`[BattleEndView] 🎁 Options count: ${augmentOptions.length}`);
    $.Msg(`[BattleEndView] 🎁 Parent panel: ${parent.id}`);
    const augmentSection = $.CreatePanel('Panel', parent, 'AugmentSection');
    if (!augmentSection) {
        $.Msg('[BattleEndView] ❌ Failed to create augment section!');
        return parent;
    }
    augmentSection.style.width = '100%';
    augmentSection.style.flowChildren = 'down';
    augmentSection.style.marginBottom = '30px';
    augmentSection.style.padding = '20px';
    augmentSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    augmentSection.style.borderRadius = '10px';
    $.Msg(`[BattleEndView] 🎁 Augment section created successfully`);
    // 标题
    const title = $.CreatePanel('Label', augmentSection, 'AugmentTitle');
    title.text = '选择海克斯强化';
    title.style.fontSize = '32px';
    title.style.color = BATTLE_END_THEME.textAccent;
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '20px';
    title.style.width = '100%';
    $.Msg(`[BattleEndView] 🎁 Title created`);
    // 提示文字
    const hint = $.CreatePanel('Label', augmentSection, 'AugmentHint');
    hint.text = '选择一个强化来增强你的实力';
    hint.style.fontSize = '18px';
    hint.style.color = BATTLE_END_THEME.textSecondary;
    hint.style.textAlign = 'center';
    hint.style.marginBottom = '30px';
    hint.style.width = '100%';
    hint.style.opacity = '0.8';
    $.Msg(`[BattleEndView] 🎁 Hint created`);
    // 卡片容器（缩小高度）
    const cardsContainer = $.CreatePanel('Panel', augmentSection, 'AugmentCards');
    cardsContainer.style.width = '100%';
    cardsContainer.style.height = '220px';
    cardsContainer.style.flowChildren = 'right';
    cardsContainer.style.horizontalAlign = 'center';
    $.Msg(`[BattleEndView] 🎁 Cards container created`);
    // 创建每个强化卡片
    for (let i = 0; i < augmentOptions.length; i++) {
        const augment = augmentOptions[i];
        $.Msg(`[BattleEndView] 🎁 Creating card ${i}: ${augment.displayName} (${augment.id})`);
        createAugmentCard(cardsContainer, augment, i);
    }
    $.Msg(`[BattleEndView] 🎁 ========== Augment section complete ==========`);
    return augmentSection;
}
// 创建单个海克斯强化卡片
function createAugmentCard(parent, augment, index) {
    $.Msg(`[BattleEndView] 🃏 Creating card ${index}: ${augment.displayName}`);
    const card = $.CreatePanel('Panel', parent, `AugmentCard_${index}`);
    if (!card) {
        $.Msg(`[BattleEndView] ❌ Failed to create card ${index}!`);
        return;
    }
    // 缩小卡片尺寸到200x200
    card.style.width = '200px';
    card.style.height = '200px';
    card.style.flowChildren = 'down';
    card.style.marginLeft = index > 0 ? '15px' : '0px';
    card.style.padding = '10px';
    card.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    card.style.borderRadius = '10px';
    card.style.border = '2px solid rgba(255, 255, 255, 0.3)';
    card.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.5)';
    $.Msg(`[BattleEndView] 🃏 Card ${index} panel created`);
    // 根据稀有度设置边框颜色
    let borderColor = '#ffffff';
    if (augment.rarity === 'common') {
        borderColor = '#aaaaaa'; // 灰色
    }
    else if (augment.rarity === 'rare') {
        borderColor = '#4a9eff'; // 蓝色
    }
    else if (augment.rarity === 'epic') {
        borderColor = '#a335ee'; // 紫色
    }
    $.Msg(`[BattleEndView] 🃏 Card ${index} border color: ${borderColor} (rarity: ${augment.rarity})`);
    // 图标（缩小）
    const icon = $.CreatePanel('Image', card, `AugmentIcon_${index}`);
    icon.SetImage(augment.icon);
    icon.style.width = '60px';
    icon.style.height = '60px';
    icon.style.horizontalAlign = 'center';
    icon.style.marginBottom = '8px';
    icon.hittest = false;
    // 名称（缩小字体）
    const name = $.CreatePanel('Label', card, `AugmentName_${index}`);
    name.text = augment.displayName;
    name.style.fontSize = '18px';
    name.style.color = borderColor;
    name.style.fontWeight = 'bold';
    name.style.textAlign = 'center';
    name.style.marginBottom = '6px';
    name.style.width = '100%';
    name.hittest = false;
    // 稀有度标签（缩小字体）
    const rarityLabel = $.CreatePanel('Label', card, `AugmentRarity_${index}`);
    let rarityText = '';
    if (augment.rarity === 'common')
        rarityText = '普通';
    else if (augment.rarity === 'rare')
        rarityText = '稀有';
    else if (augment.rarity === 'epic')
        rarityText = '史诗';
    rarityLabel.text = rarityText;
    rarityLabel.style.fontSize = '14px';
    rarityLabel.style.color = borderColor;
    rarityLabel.style.textAlign = 'center';
    rarityLabel.style.marginBottom = '6px';
    rarityLabel.style.width = '100%';
    rarityLabel.hittest = false;
    // 描述（缩小字体）
    const desc = $.CreatePanel('Label', card, `AugmentDesc_${index}`);
    desc.text = augment.description;
    desc.style.fontSize = '13px';
    desc.style.color = BATTLE_END_THEME.textSecondary;
    desc.style.textAlign = 'center';
    desc.style.width = '100%';
    desc.style.opacity = '0.9';
    desc.hittest = false;
    // 点击事件：直接打开选关界面
    card.SetPanelEvent('onactivate', () => {
        $.Msg(`[BattleEndView] 🎯 Augment selected: ${augment.id}`);
        Game.EmitSound('ui.button_click');
        selectedAugmentId = augment.id;
        // 打开选关界面
        if (globalThis.StageSelect && globalThis.StageSelect.show) {
            globalThis.StageSelect.show();
        }
        // 隐藏结算界面
        hideView();
    });
    // 悬停效果
    card.SetPanelEvent('onmouseover', () => {
        card.style.border = `2px solid ${borderColor}`;
        card.style.transform = 'scale3d(1.05, 1.05, 1.0)';
        card.style.boxShadow = `0px 0px 15px ${borderColor}`;
        Game.EmitSound('ui.button_over');
    });
    card.SetPanelEvent('onmouseout', () => {
        card.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        card.style.transform = 'scale3d(1.0, 1.0, 1.0)';
        card.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.5)';
    });
    $.Msg(`[BattleEndView] 🃏 Card ${index} completed: ${augment.displayName}`);
}
// 显示结算界面（完全动态创建，像 playing-hud 一样）
function showView(result) {
    $.Msg('[BattleEndView] ========== showView() called ==========');
    $.Msg('[BattleEndView] Result:', JSON.stringify(result));
    $.Msg('[BattleEndView] Winner:', result.winner);
    $.Msg('[BattleEndView] Round:', result.round);
    // 获取根面板（与 playing-hud 完全一致）
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('[BattleEndView] ❌ Root panel not found');
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
    main.style.width = '900px';
    // 检查是否有海克斯强化（只有胜利时才显示）
    const hasAugments = result.winner === 'player' && result.augmentOptions && result.augmentOptions.length > 0;
    // 根据是否有海克斯强化调整高度（卡片变小后，整体高度也减小）
    if (hasAugments) {
        main.style.height = '600px'; // 有海克斯强化时的高度（已缩小）
        $.Msg('[BattleEndView] Setting panel height to 600px (with augments)');
    }
    else {
        main.style.height = '600px'; // 没有海克斯强化时使用默认高度
        $.Msg('[BattleEndView] Setting panel height to 600px (no augments)');
    }
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
    // 只有在没有海克斯强化时才显示战斗统计
    if (!hasAugments) {
        $.Msg('[BattleEndView] Creating stats section (no augments)');
        createStatsSection(main, result);
    }
    else {
        $.Msg('[BattleEndView] Skipping stats section (has augments)');
    }
    // 如果有海克斯强化选项，显示选择区域
    if (hasAugments) {
        $.Msg(`[BattleEndView] 🎁 Creating augment section with ${result.augmentOptions.length} options`);
        createAugmentSection(main, result.augmentOptions);
        // 重置选择状态
        selectedAugmentId = null;
    }
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
    // 强制设置可见性（确保界面显示）
    container.style.visibility = 'visible';
    container.style.opacity = '1';
    container.RemoveClass('hidden');
    container.SetHasClass('battle_end_container', true);
    $.Msg(`[BattleEndView] Container visibility: ${container.style.visibility}`);
    $.Msg(`[BattleEndView] Container opacity: ${container.style.opacity}`);
    $.Msg(`[BattleEndView] Container z-index: ${container.style.zIndex}`);
    // 延迟检查实际尺寸（Panorama 需要时间计算布局）
    $.Schedule(0.1, () => {
        const actualWidth = container.actuallayoutwidth;
        const actualHeight = container.actuallayoutheight;
        $.Msg(`[BattleEndView] Container size after 0.1s: ${actualWidth}x${actualHeight}`);
        // 如果尺寸仍然为 0，使用屏幕分辨率
        if (actualWidth === 0 || actualHeight === 0) {
            $.Msg('[BattleEndView] ⚠️ Container size is still 0, using screen resolution...');
            const screenWidth = Game.GetScreenWidth();
            const screenHeight = Game.GetScreenHeight();
            container.style.width = `${screenWidth}px`;
            container.style.height = `${screenHeight}px`;
            container.style.visibility = 'visible';
            $.Msg(`[BattleEndView] Set container size to ${screenWidth}x${screenHeight}px`);
            // 再次检查
            $.Schedule(0.1, () => {
                const newWidth = container.actuallayoutwidth;
                const newHeight = container.actuallayoutheight;
                $.Msg(`[BattleEndView] ✅ Container size after fix: ${newWidth}x${newHeight}`);
                $.Msg(`[BattleEndView] Container visibility: ${container.style.visibility}`);
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
    $.Msg('[BattleEndView] ========== showView() completed ==========');
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
// 将 Lua 对象数组转换为 JavaScript 数组
function convertLuaArrayToJSArray(luaArray) {
    if (!luaArray) {
        return [];
    }
    // 如果已经是数组，直接返回
    if (Array.isArray(luaArray)) {
        return luaArray;
    }
    // 如果是对象，转换为数组（Lua 数组在传输过程中会变成 {1: {...}, 2: {...}, 3: {...}}）
    if (typeof luaArray === 'object') {
        const result = [];
        const keys = Object.keys(luaArray).map(k => parseInt(k)).filter(k => !isNaN(k)).sort((a, b) => a - b);
        for (const key of keys) {
            result.push(luaArray[key]);
        }
        $.Msg(`[BattleEndView] 🔄 Converted Lua array (${keys.length} items) to JS array`);
        return result;
    }
    return [];
}
// 处理波次结算事件（自走棋模式）
function handleWaveSettlement(data) {
    var _a;
    $.Msg('[BattleEndView] ========== Wave settlement event received ==========');
    $.Msg('[BattleEndView] Event data:', JSON.stringify(data));
    // 🔑 转换 augmentOptions（Lua 数组 -> JS 数组）
    const augmentOptions = convertLuaArrayToJSArray(data.augmentOptions);
    $.Msg(`[BattleEndView] 🎯 Converted augmentOptions: ${augmentOptions.length} items`);
    if (augmentOptions.length > 0) {
        $.Msg('[BattleEndView] Augment options:', JSON.stringify(augmentOptions));
    }
    // 从 AutoChessMode 获取胜负信息
    const battleResult = {
        winner: data.winner || 'player',
        round: data.round || 1,
        duration: data.duration || 0,
        stats: data.stats || {},
        levelName: data.levelName || undefined,
        isEventNode: data.isEventNode || false,
        augmentOptions: augmentOptions
    };
    $.Msg('[BattleEndView] Processed battle result:', JSON.stringify(battleResult));
    $.Msg('[BattleEndView] Winner:', battleResult.winner);
    $.Msg('[BattleEndView] Round:', battleResult.round);
    $.Msg('[BattleEndView] isEventNode:', battleResult.isEventNode);
    $.Msg('[BattleEndView] augmentOptions count:', ((_a = battleResult.augmentOptions) === null || _a === void 0 ? void 0 : _a.length) || 0);
    // 确保界面显示
    try {
        showView(battleResult);
        $.Msg('[BattleEndView] ✅ showView() called successfully');
    }
    catch (e) {
        $.Msg('[BattleEndView] ❌ Error calling showView():', e);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCB2YXIgXCIkXCIiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLy9EOlxcU3RlYW1BcHBcXHN0ZWFtYXBwc1xcY29tbW9uXFxkb3RhIDIgYmV0YVxcY29udGVudFxcZG90YV9hZGRvbnNcXGZ1c2lvblxccGFub3JhbWFcXHNyY1xcYmF0dGxlZW5kdmlld1xcaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gJDsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gQHRzLW5vY2hlY2tcbi8vIOaImOaWl+e7k+eul+eVjOmdoiAtIOWfuuS6jiBwbGF5aW5nLWh1ZCDnmoTorr7orqHnu4/pqoxcbkdhbWUuRW1pdFNvdW5kKCdHZW5lcmFsLkJ1dHRvbkNsaWNrJyk7XG4kLk1zZygn8J+PhiBCYXR0bGUgRW5kIFZpZXcgc2NyaXB0IGxvYWRpbmcuLi4nKTtcbi8vIOS4u+mimOmFjee9ru+8iOS/neaMgeS4jiBwbGF5aW5nLWh1ZCDkuIDoh7TvvIlcbmNvbnN0IEJBVFRMRV9FTkRfVEhFTUUgPSB7XG4gICAgYmFja2dyb3VuZDogJ3JnYmEoMTUsIDIzLCA0MiwgMC45NSknLFxuICAgIHBhbmVsQmc6ICdyZ2JhKDMzLCAzNCwgMzEsIDAuOTUpJyxcbiAgICBib3JkZXJDb2xvcjogJ3JnYmEoNTksIDEzMCwgMjQ2LCAwLjQpJyxcbiAgICB0ZXh0UHJpbWFyeTogJyMzYjgyZjYnLFxuICAgIHRleHRTZWNvbmRhcnk6ICcjZmZmZmZmJyxcbiAgICB0ZXh0QWNjZW50OiAnI2ZmYzU3YScsXG4gICAgc3VjY2VzczogJyM0Y2FmNTAnLFxuICAgIHdhcm5pbmc6ICcjZmY5ODAwJyxcbiAgICBkYW5nZXI6ICcjZjQ0MzM2JyxcbiAgICB2aWN0b3J5R2xvdzogJyNmZmQ3MDAnLFxuICAgIGRlZmVhdEdsb3c6ICcjZmY0NDQ0Jyxcbn07XG4vLyDojrflj5bmoLnpnaLmnb9cbmZ1bmN0aW9uIGdldFJvb3QoKSB7XG4gICAgcmV0dXJuICQuR2V0Q29udGV4dFBhbmVsKCk7XG59XG4vLyDmn6Xmib7lrZDpnaLmnb/vvIjku44gbGF5b3V0IOaWh+S7tu+8iVxuZnVuY3Rpb24gZmluZChpZCkge1xuICAgIHJldHVybiBnZXRSb290KCkuRmluZENoaWxkSW5MYXlvdXRGaWxlKGlkKTtcbn1cbi8vIOafpeaJvuWKqOaAgeWIm+W7uueahOWtkOmdouadv1xuZnVuY3Rpb24gZmluZENoaWxkKHBhcmVudCwgaWQpIHtcbiAgICByZXR1cm4gcGFyZW50LkZpbmRDaGlsZChpZCk7XG59XG4vLyDliJvlu7rnu5PnrpflrrnlmajvvIjlg48gcGxheWluZy1odWQg5LiA5qC35Yqo5oCB5Yib5bu677yJXG5mdW5jdGlvbiBjcmVhdGVCYXR0bGVFbmRDb250YWluZXIoKSB7XG4gICAgdmFyIF9hO1xuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ+KdjCBFcnJvcjogUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIOajgOafpeaYr+WQpuW3suWtmOWcqFxuICAgIGxldCBjb250YWluZXIgPSByb290UGFuZWwuRmluZENoaWxkKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoY29udGFpbmVyICYmIGNvbnRhaW5lci5Jc1ZhbGlkKCkpIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBDb250YWluZXIgYWxyZWFkeSBleGlzdHMsIHJldXNpbmcnKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgLy8g5Yig6Zmk5bey5a2Y5Zyo55qE5peg5pWI5a655ZmoXG4gICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLklzVmFsaWQoKSkge1xuICAgICAgICBjb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIC8vIOWIm+W7uuS4u+WuueWZqCAtIOS9v+eUqOS4jiBwbGF5aW5nLWh1ZCDlrozlhajnm7jlkIznmoTmlrnlvI9cbiAgICBjb250YWluZXIgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHJvb3RQYW5lbCwgJ0JhdHRsZUVuZENvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSB7XG4gICAgICAgICQuTXNnKCfinYwgRmFpbGVkIHRvIGNyZWF0ZSBjb250YWluZXIgcGFuZWwnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIOeri+WNs+mqjOivgeeItuWFg+e0oFxuICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudCA9IGNvbnRhaW5lci5HZXRQYXJlbnQoKTtcbiAgICBpZiAoIWNvbnRhaW5lclBhcmVudCkge1xuICAgICAgICAkLk1zZygn4p2MIENvbnRhaW5lciBjcmVhdGVkIGJ1dCBoYXMgbm8gcGFyZW50IScpO1xuICAgICAgICBjb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoY29udGFpbmVyUGFyZW50ICE9PSByb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coYOKaoO+4jyBDb250YWluZXIgcGFyZW50ICgke2NvbnRhaW5lclBhcmVudC5pZH0pIGlzIG5vdCByb290IHBhbmVsICgke3Jvb3RQYW5lbC5pZH0pYCk7XG4gICAgfVxuICAgIGNvbnRhaW5lci5BZGRDbGFzcygnYmF0dGxlX2VuZF9jb250YWluZXInKTtcbiAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBjb250YWluZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgY29udGFpbmVyLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7IC8vIOm7mOiupOmakOiXj1xuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMDAnOyAvLyDmr5QgcGxheWluZy1odWQgKDEwMDApIOmrmFxuICAgIGNvbnRhaW5lci5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBDb250YWluZXIgY3JlYXRlZCwgcGFyZW50OiAkeygoX2EgPSBjb250YWluZXIuR2V0UGFyZW50KCkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCkgfHwgJ251bGwnfWApO1xuICAgIC8vIOehruS/neWuueWZqOWcqOaguemdouadv+eahOacgOWQju+8iOacgOS4iuWxgu+8iVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJvb3RDaGlsZHJlbiA9IHJvb3RQYW5lbC5DaGlsZHJlbigpO1xuICAgICAgICBpZiAocm9vdENoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RDaGlsZCA9IHJvb3RDaGlsZHJlbltyb290Q2hpbGRyZW4ubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAobGFzdENoaWxkICE9PSBjb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuTW92ZUNoaWxkQWZ0ZXIoY29udGFpbmVyLCBsYXN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gTm90ZTogQ291bGQgbm90IG1vdmUgY29udGFpbmVyIHRvIHRvcDogJHtlfWApO1xuICAgIH1cbiAgICAvLyDljYrpgI/mmI7pga7nvalcbiAgICBjb25zdCBtYXNrID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBjb250YWluZXIsICdCYXR0bGVFbmRNYXNrJyk7XG4gICAgbWFzay5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBtYXNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuOCknO1xuICAgIG1hc2suc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFzay5zdHlsZS52ZXJ0aWNhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgbWFzay5oaXR0ZXN0ID0gdHJ1ZTsgLy8g5oum5oiq54K55Ye7XG4gICAgJC5Nc2coJ+KchSBCYXR0bGUgZW5kIGNvbnRhaW5lciBjcmVhdGVkJyk7XG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbi8vIOiOt+WPlue7k+eul+WuueWZqFxuZnVuY3Rpb24gZ2V0QmF0dGxlRW5kQ29udGFpbmVyKCkge1xuICAgIGNvbnN0IHJvb3QgPSBnZXRSb290KCk7XG4gICAgbGV0IGNvbnRhaW5lciA9IHJvb3QuRmluZENoaWxkSW5MYXlvdXRGaWxlKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIgPSByb290LkZpbmRDaGlsZCgnQmF0dGxlRW5kQ29udGFpbmVyJyk7XG4gICAgfVxuICAgIHJldHVybiBjb250YWluZXI7XG59XG4vLyDmm7TmlrDmoIfpopjljLrln5/vvIjkvb/nlKggbGF5b3V0IOS4reeahOmdouadv++8iVxuZnVuY3Rpb24gdXBkYXRlVGl0bGVTZWN0aW9uKHRpdGxlU2VjdGlvbiwgcmVzdWx0KSB7XG4gICAgLy8g5riF56m65pen5YaF5a6577yI5L+d55WZIGxheW91dCDkuK3lrprkuYnnmoTlrZDlhYPntKDvvIlcbiAgICBjb25zdCBleGlzdGluZ0NoaWxkcmVuID0gdGl0bGVTZWN0aW9uLkNoaWxkcmVuKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleGlzdGluZ0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkID0gZXhpc3RpbmdDaGlsZHJlbltpXTtcbiAgICAgICAgaWYgKGNoaWxkLmlkICE9PSAnUmVzdWx0VGl0bGUnICYmIGNoaWxkLmlkICE9PSAnUm91bmRJbmZvJyAmJiBjaGlsZC5pZCAhPT0gJ0xldmVsSW5mbycpIHtcbiAgICAgICAgICAgIGNoaWxkLkRlbGV0ZUFzeW5jKDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOabtOaWsOaIluWIm+W7uuagh+mimFxuICAgIGxldCByZXN1bHRUaXRsZSA9IHRpdGxlU2VjdGlvbi5GaW5kQ2hpbGQoJ1Jlc3VsdFRpdGxlJyk7XG4gICAgaWYgKCFyZXN1bHRUaXRsZSkge1xuICAgICAgICByZXN1bHRUaXRsZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUmVzdWx0VGl0bGUnKTtcbiAgICB9XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFNpemUgPSAnNjRweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICfog5zliKnvvIEnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuc3VjY2VzcztcbiAgICAgICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9IGAwcHggMHB4IDIwcHggJHtCQVRUTEVfRU5EX1RIRU1FLnZpY3RvcnlHbG93fWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdC53aW5uZXIgPT09ICdlbmVteScpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflpLHotKUnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuZGFuZ2VyO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gYDBweCAwcHggMjBweCAke0JBVFRMRV9FTkRfVEhFTUUuZGVmZWF0R2xvd31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflubPlsYAnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUud2FybmluZztcbiAgICB9XG4gICAgLy8g5pu05paw5Zue5ZCI5L+h5oGvXG4gICAgbGV0IHJvdW5kSW5mbyA9IHRpdGxlU2VjdGlvbi5GaW5kQ2hpbGQoJ1JvdW5kSW5mbycpO1xuICAgIGlmICghcm91bmRJbmZvKSB7XG4gICAgICAgIHJvdW5kSW5mbyA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgdGl0bGVTZWN0aW9uLCAnUm91bmRJbmZvJyk7XG4gICAgfVxuICAgIHJvdW5kSW5mby50ZXh0ID0gYOesrCAke3Jlc3VsdC5yb3VuZH0g5Zue5ZCI57uT5p2fYDtcbiAgICByb3VuZEluZm8uc3R5bGUuZm9udFNpemUgPSAnMjhweCc7XG4gICAgcm91bmRJbmZvLnN0eWxlLmNvbG9yID0gQkFUVExFX0VORF9USEVNRS50ZXh0QWNjZW50O1xuICAgIHJvdW5kSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByb3VuZEluZm8uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgcm91bmRJbmZvLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc1cHgnO1xuICAgIC8vIOabtOaWsOWFs+WNoeS/oeaBr1xuICAgIGxldCBsZXZlbEluZm8gPSB0aXRsZVNlY3Rpb24uRmluZENoaWxkKCdMZXZlbEluZm8nKTtcbiAgICBpZiAocmVzdWx0LmxldmVsTmFtZSkge1xuICAgICAgICBpZiAoIWxldmVsSW5mbykge1xuICAgICAgICAgICAgbGV2ZWxJbmZvID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aXRsZVNlY3Rpb24sICdMZXZlbEluZm8nKTtcbiAgICAgICAgfVxuICAgICAgICBsZXZlbEluZm8udGV4dCA9IGDlhbPljaHvvJoke3Jlc3VsdC5sZXZlbE5hbWV9YDtcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gICAgZWxzZSBpZiAobGV2ZWxJbmZvKSB7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS52aXNpYmlsaXR5ID0gJ2NvbGxhcHNlJztcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVUaXRsZVNlY3Rpb24ocGFyZW50LCByZXN1bHQpIHtcbiAgICBjb25zdCB0aXRsZVNlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0JhdHRsZUVuZFRpdGxlJyk7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTUwcHgnO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnZG93bic7XG4gICAgdGl0bGVTZWN0aW9uLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlU2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMzBweCc7XG4gICAgLy8g6IOc6LSf5qCH6aKYXG4gICAgY29uc3QgcmVzdWx0VGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlU2VjdGlvbiwgJ1Jlc3VsdFRpdGxlJyk7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFNpemUgPSAnNjRweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICByZXN1bHRUaXRsZS5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMTBweCc7XG4gICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9ICcwcHggMHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBpZiAocmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICfog5zliKnvvIEnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuc3VjY2VzcztcbiAgICAgICAgcmVzdWx0VGl0bGUuc3R5bGUudGV4dFNoYWRvdyA9IGAwcHggMHB4IDIwcHggJHtCQVRUTEVfRU5EX1RIRU1FLnZpY3RvcnlHbG93fWA7XG4gICAgfVxuICAgIGVsc2UgaWYgKHJlc3VsdC53aW5uZXIgPT09ICdlbmVteScpIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflpLHotKUnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUuZGFuZ2VyO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS50ZXh0U2hhZG93ID0gYDBweCAwcHggMjBweCAke0JBVFRMRV9FTkRfVEhFTUUuZGVmZWF0R2xvd31gO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0VGl0bGUudGV4dCA9ICflubPlsYAnO1xuICAgICAgICByZXN1bHRUaXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUud2FybmluZztcbiAgICB9XG4gICAgLy8g5Zue5ZCI5L+h5oGvXG4gICAgY29uc3Qgcm91bmRJbmZvID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCB0aXRsZVNlY3Rpb24sICdSb3VuZEluZm8nKTtcbiAgICByb3VuZEluZm8udGV4dCA9IGDnrKwgJHtyZXN1bHQucm91bmR9IOWbnuWQiOe7k+adn2A7XG4gICAgcm91bmRJbmZvLnN0eWxlLmZvbnRTaXplID0gJzI4cHgnO1xuICAgIHJvdW5kSW5mby5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dEFjY2VudDtcbiAgICByb3VuZEluZm8uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgcm91bmRJbmZvLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIHJvdW5kSW5mby5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNXB4JztcbiAgICAvLyDlhbPljaHkv6Hmga9cbiAgICBpZiAocmVzdWx0LmxldmVsTmFtZSkge1xuICAgICAgICBjb25zdCBsZXZlbEluZm8gPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHRpdGxlU2VjdGlvbiwgJ0xldmVsSW5mbycpO1xuICAgICAgICBsZXZlbEluZm8udGV4dCA9IGDlhbPljaHvvJoke3Jlc3VsdC5sZXZlbE5hbWV9YDtcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgICAgIGxldmVsSW5mby5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgbGV2ZWxJbmZvLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBsZXZlbEluZm8uc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGVTZWN0aW9uO1xufVxuLy8g5pu05paw57uf6K6h5L+h5oGv5Yy65Z+f77yI5L2/55SoIGxheW91dCDkuK3nmoTpnaLmnb/vvIlcbmZ1bmN0aW9uIHVwZGF0ZVN0YXRzU2VjdGlvbihzdGF0c1NlY3Rpb24sIHJlc3VsdCkge1xuICAgIC8vIOa4heepuue7n+iuoeihjO+8iOS/neeVmeagh+mimO+8iVxuICAgIGNvbnN0IGV4aXN0aW5nQ2hpbGRyZW4gPSBzdGF0c1NlY3Rpb24uQ2hpbGRyZW4oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4aXN0aW5nQ2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY2hpbGQgPSBleGlzdGluZ0NoaWxkcmVuW2ldO1xuICAgICAgICBpZiAoY2hpbGQuaWQgIT09ICdTdGF0c1RpdGxlJykge1xuICAgICAgICAgICAgY2hpbGQuRGVsZXRlQXN5bmMoMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8g56Gu5L+d5qCH6aKY5a2Y5ZyoXG4gICAgbGV0IHN0YXRzVGl0bGUgPSBzdGF0c1NlY3Rpb24uRmluZENoaWxkKCdTdGF0c1RpdGxlJyk7XG4gICAgaWYgKCFzdGF0c1RpdGxlKSB7XG4gICAgICAgIHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzVGl0bGUnKTtcbiAgICAgICAgc3RhdHNUaXRsZS50ZXh0ID0gJ+aImOaWl+e7n+iuoSc7XG4gICAgICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFNpemUgPSAnMjRweCc7XG4gICAgICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgICAgICBzdGF0c1RpdGxlLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgICAgIHN0YXRzVGl0bGUuc3R5bGUubWFyZ2luQm90dG9tID0gJzE1cHgnO1xuICAgIH1cbiAgICAvLyDnu5/orqHmlbDmja5cbiAgICBjb25zdCBzdGF0cyA9IHJlc3VsdC5zdGF0cyB8fCB7fTtcbiAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmiJjmlpfml7bplb8nLCBgJHtNYXRoLmZsb29yKHJlc3VsdC5kdXJhdGlvbiAvIDEwMDApfeenkmAsIDApO1xuICAgIGlmIChzdGF0cy5kYW1hZ2VEZWFsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+mAoOaIkOS8pOWusycsIGZvcm1hdE51bWJlcihzdGF0cy5kYW1hZ2VEZWFsdCksIDEpO1xuICAgIH1cbiAgICBpZiAoc3RhdHMuZGFtYWdlVGFrZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmib/lj5fkvKTlrrMnLCBmb3JtYXROdW1iZXIoc3RhdHMuZGFtYWdlVGFrZW4pLCAyKTtcbiAgICB9XG4gICAgaWYgKHN0YXRzLnVuaXRzS2lsbGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5Ye75p2A5Y2V5L2NJywgc3RhdHMudW5pdHNLaWxsZWQudG9TdHJpbmcoKSwgMyk7XG4gICAgfVxuICAgIGlmIChzdGF0cy51bml0c1N1cnZpdmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5a2Y5rS75Y2V5L2NJywgc3RhdHMudW5pdHNTdXJ2aXZlZC50b1N0cmluZygpLCA0KTtcbiAgICB9XG59XG4vLyDliJvlu7rnu5/orqHkv6Hmga/ljLrln5/vvIjkv53nlZnnlKjkuo7lhbzlrrnvvIlcbmZ1bmN0aW9uIGNyZWF0ZVN0YXRzU2VjdGlvbihwYXJlbnQsIHJlc3VsdCkge1xuICAgIGNvbnN0IHN0YXRzU2VjdGlvbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCAnQmF0dGxlRW5kU3RhdHMnKTtcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmhlaWdodCA9ICcyMDBweCc7XG4gICAgc3RhdHNTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzMwcHgnO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5wYWRkaW5nID0gJzIwcHgnO1xuICAgIHN0YXRzU2VjdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBzdGF0c1NlY3Rpb24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIC8vIOagh+mimFxuICAgIGNvbnN0IHN0YXRzVGl0bGUgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIHN0YXRzU2VjdGlvbiwgJ1N0YXRzVGl0bGUnKTtcbiAgICBzdGF0c1RpdGxlLnRleHQgPSAn5oiY5paX57uf6K6hJztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLmZvbnRTaXplID0gJzI0cHgnO1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgIHN0YXRzVGl0bGUuc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJztcbiAgICBzdGF0c1RpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcxNXB4JztcbiAgICAvLyDnu5/orqHmlbDmja5cbiAgICBjb25zdCBzdGF0cyA9IHJlc3VsdC5zdGF0cyB8fCB7fTtcbiAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmiJjmlpfml7bplb8nLCBgJHtNYXRoLmZsb29yKHJlc3VsdC5kdXJhdGlvbiAvIDEwMDApfeenkmAsIDApO1xuICAgIGlmIChzdGF0cy5kYW1hZ2VEZWFsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNyZWF0ZVN0YXRMaW5lKHN0YXRzU2VjdGlvbiwgJ+mAoOaIkOS8pOWusycsIGZvcm1hdE51bWJlcihzdGF0cy5kYW1hZ2VEZWFsdCksIDEpO1xuICAgIH1cbiAgICBpZiAoc3RhdHMuZGFtYWdlVGFrZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjcmVhdGVTdGF0TGluZShzdGF0c1NlY3Rpb24sICfmib/lj5fkvKTlrrMnLCBmb3JtYXROdW1iZXIoc3RhdHMuZGFtYWdlVGFrZW4pLCAyKTtcbiAgICB9XG4gICAgaWYgKHN0YXRzLnVuaXRzS2lsbGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5Ye75p2A5Y2V5L2NJywgc3RhdHMudW5pdHNLaWxsZWQudG9TdHJpbmcoKSwgMyk7XG4gICAgfVxuICAgIGlmIChzdGF0cy51bml0c1N1cnZpdmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3JlYXRlU3RhdExpbmUoc3RhdHNTZWN0aW9uLCAn5a2Y5rS75Y2V5L2NJywgc3RhdHMudW5pdHNTdXJ2aXZlZC50b1N0cmluZygpLCA0KTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRzU2VjdGlvbjtcbn1cbi8vIOWIm+W7uuWNleS4que7n+iuoeihjFxuZnVuY3Rpb24gY3JlYXRlU3RhdExpbmUocGFyZW50LCBsYWJlbCwgdmFsdWUsIGluZGV4KSB7XG4gICAgY29uc3QgbGluZSA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgcGFyZW50LCBgU3RhdExpbmVfJHtpbmRleH1gKTtcbiAgICBsaW5lLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxpbmUuc3R5bGUuaGVpZ2h0ID0gJzMwcHgnO1xuICAgIGxpbmUuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICBsaW5lLnN0eWxlLm1hcmdpblRvcCA9ICc1cHgnO1xuICAgIGNvbnN0IGxhYmVsVGV4dCA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgbGluZSwgYFN0YXRMYWJlbF8ke2luZGV4fWApO1xuICAgIGxhYmVsVGV4dC50ZXh0ID0gbGFiZWw7XG4gICAgbGFiZWxUZXh0LnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIGxhYmVsVGV4dC5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBsYWJlbFRleHQuc3R5bGUud2lkdGggPSAnZmlsbC1wYXJlbnQtZmxvdygxKSc7XG4gICAgbGFiZWxUZXh0LnN0eWxlLm9wYWNpdHkgPSAnMC44JztcbiAgICBjb25zdCB2YWx1ZVRleHQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGxpbmUsIGBTdGF0VmFsdWVfJHtpbmRleH1gKTtcbiAgICB2YWx1ZVRleHQudGV4dCA9IHZhbHVlO1xuICAgIHZhbHVlVGV4dC5zdHlsZS5mb250U2l6ZSA9ICcyMHB4JztcbiAgICB2YWx1ZVRleHQuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgdmFsdWVUZXh0LnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgdmFsdWVUZXh0LnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCc7XG59XG4vLyDmm7TmlrDmjInpkq7ljLrln5/vvIjkvb/nlKggbGF5b3V0IOS4reeahOmdouadv++8iVxuZnVuY3Rpb24gdXBkYXRlQnV0dG9uc1NlY3Rpb24oYnV0dG9uc1NlY3Rpb24sIHJlc3VsdCkge1xuICAgIC8vIOa4heepuuaJgOacieaMiemSrlxuICAgIGJ1dHRvbnNTZWN0aW9uLlJlbW92ZUFuZERlbGV0ZUNoaWxkcmVuKCk7XG4gICAgaWYgKHJlc3VsdC53aW5uZXIgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIC8vIOiDnOWIqeaXtuaYvuekuuaMiemSru+8jOawtOW5s+aOkuWIl++8jOWxheS4reWvuem9kFxuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAncmlnaHQnO1xuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgICAgLy8g5qOA5p+l5piv5ZCm5pyJ5rW35YWL5pav5by65YyW6YCJ6aG5XG4gICAgICAgIGNvbnN0IGhhc0F1Z21lbnRzID0gcmVzdWx0LmF1Z21lbnRPcHRpb25zICYmIHJlc3VsdC5hdWdtZW50T3B0aW9ucy5sZW5ndGggPiAwO1xuICAgICAgICAvLyDlpoLmnpzmsqHmnInmtbflhYvmlq/lvLrljJbvvIzmmL7npLpcIumAieaLqeWFs+WNoVwi5oyJ6ZKu77yI5pyJ5rW35YWL5pav5by65YyW5pe277yM55u05o6l54K55Ye75Y2h54mH6Lez6L2s77yJXG4gICAgICAgIGlmICghaGFzQXVnbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdEJ0biA9IGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1NlbGVjdExldmVsQnV0dG9uJywgJ+mAieaLqeWFs+WNoScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgLy8g5YWI5omT5byA6YCJ5YWz55WM6Z2iXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3QgJiYgZ2xvYmFsVGhpcy5TdGFnZVNlbGVjdC5zaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3Quc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDlho3pmpDol4/nu5PnrpfnlYzpnaJcbiAgICAgICAgICAgICAgICBoaWRlVmlldygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxlY3RCdG4uc3R5bGUubWFyZ2luUmlnaHQgPSAnNDBweCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8g56ysOeWFs+aXtua3u+WKoOaSpOemu+aMiemSrlxuICAgICAgICBpZiAocmVzdWx0LnJvdW5kID09PSA5KSB7XG4gICAgICAgICAgICBjb25zdCBldmFjdWF0ZUJ0biA9IGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ0V2YWN1YXRlQnV0dG9uJywgJ+aSpOemuycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIEV2YWN1YXRpbmcgZnJvbSByb3VuZCA5Li4uJyk7XG4gICAgICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9jbGljaycpO1xuICAgICAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdxdWl0X3RvX21lbnUnLCB7fSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGV2YWN1YXRlQnRuLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzQwcHgnO1xuICAgICAgICB9XG4gICAgICAgIC8vIOmAgOWHuua4uOaIj+aMiemSrlxuICAgICAgICBjcmVhdGVTdHlsZWRCdXR0b24oYnV0dG9uc1NlY3Rpb24sICdRdWl0R2FtZUJ1dHRvbicsICfpgIDlh7rmuLjmiI8nLCAoKSA9PiB7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncXVpdF90b19tZW51Jywge30pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIC8vIOWksei0peaXtuWPquaYvuekuumAgOWHuuaMiemSru+8iOWxheS4re+8iVxuICAgICAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5mbG93Q2hpbGRyZW4gPSAnbm9uZSc7XG4gICAgICAgIGNvbnN0IHF1aXRCdG4gPSBjcmVhdGVTdHlsZWRCdXR0b24oYnV0dG9uc1NlY3Rpb24sICdRdWl0R2FtZUJ1dHRvbicsICfpgIDlh7rmuLjmiI8nLCAoKSA9PiB7XG4gICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICBHYW1lRXZlbnRzLlNlbmRDdXN0b21HYW1lRXZlbnRUb1NlcnZlcigncXVpdF90b19tZW51Jywge30pO1xuICAgICAgICB9KTtcbiAgICAgICAgcXVpdEJ0bi5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICB9XG59XG4vLyDliJvlu7rmjInpkq7ljLrln5/vvIjkv53nlZnnlKjkuo7lhbzlrrnvvIlcbmZ1bmN0aW9uIGNyZWF0ZUJ1dHRvbnNTZWN0aW9uKHBhcmVudCwgcmVzdWx0KSB7XG4gICAgY29uc3QgYnV0dG9uc1NlY3Rpb24gPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgJ0JhdHRsZUVuZEJ1dHRvbnMnKTtcbiAgICBidXR0b25zU2VjdGlvbi5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBidXR0b25zU2VjdGlvbi5zdHlsZS5oZWlnaHQgPSAnMTAwcHgnO1xuICAgIGJ1dHRvbnNTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUucGFkZGluZ0xlZnQgPSAnNDBweCc7XG4gICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUucGFkZGluZ1JpZ2h0ID0gJzQwcHgnO1xuICAgIGlmIChyZXN1bHQud2lubmVyID09PSAncGxheWVyJykge1xuICAgICAgICAvLyDog5zliKnml7bmmL7npLrmjInpkq7vvIzmsLTlubPmjpLliJfvvIzlsYXkuK3lr7npvZBcbiAgICAgICAgLy8g5qOA5p+l5piv5ZCm5pyJ5rW35YWL5pav5by65YyW6YCJ6aG5XG4gICAgICAgIGNvbnN0IGhhc0F1Z21lbnRzID0gcmVzdWx0LmF1Z21lbnRPcHRpb25zICYmIHJlc3VsdC5hdWdtZW50T3B0aW9ucy5sZW5ndGggPiAwO1xuICAgICAgICAvLyDlpoLmnpzmsqHmnInmtbflhYvmlq/lvLrljJbvvIzmmL7npLpcIumAieaLqeWFs+WNoVwi5oyJ6ZKu77yI5pyJ5rW35YWL5pav5by65YyW5pe277yM55u05o6l54K55Ye75Y2h54mH6Lez6L2s77yJXG4gICAgICAgIGlmICghaGFzQXVnbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdEJ0biA9IGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1NlbGVjdExldmVsQnV0dG9uJywgJ+mAieaLqeWFs+WNoScsICgpID0+IHtcbiAgICAgICAgICAgICAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIE9wZW5pbmcgbGV2ZWwgc2VsZWN0aW9uIGRpcmVjdGx5Li4uJyk7XG4gICAgICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9jbGljaycpO1xuICAgICAgICAgICAgICAgIGhpZGVWaWV3KCk7XG4gICAgICAgICAgICAgICAgLy8g5Y2V5py65qih5byP77ya55u05o6l5omT5byA6YCJ5YWz55WM6Z2iXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3QgJiYgZ2xvYmFsVGhpcy5TdGFnZVNlbGVjdC5zaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3Quc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBXYXJuaW5nOiBTdGFnZVNlbGVjdC5zaG93IG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGVjdEJ0bi5zdHlsZS5tYXJnaW5SaWdodCA9ICc0MHB4JztcbiAgICAgICAgfVxuICAgICAgICAvLyDnrKw55YWz5pe25re75Yqg5pKk56a75oyJ6ZKuXG4gICAgICAgIGlmIChyZXN1bHQucm91bmQgPT09IDkpIHtcbiAgICAgICAgICAgIGNvbnN0IGV2YWN1YXRlQnRuID0gY3JlYXRlU3R5bGVkQnV0dG9uKGJ1dHRvbnNTZWN0aW9uLCAnRXZhY3VhdGVCdXR0b24nLCAn5pKk56a7JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gRXZhY3VhdGluZyBmcm9tIHJvdW5kIDkuLi4nKTtcbiAgICAgICAgICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3F1aXRfdG9fbWVudScsIHt9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZXZhY3VhdGVCdG4uc3R5bGUubWFyZ2luUmlnaHQgPSAnNDBweCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6YCA5Ye65ri45oiP5oyJ6ZKuXG4gICAgICAgIGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1F1aXRHYW1lQnV0dG9uJywgJ+mAgOWHuua4uOaIjycsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gUXVpdHRpbmcgZ2FtZS4uLicpO1xuICAgICAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9jbGljaycpO1xuICAgICAgICAgICAgR2FtZUV2ZW50cy5TZW5kQ3VzdG9tR2FtZUV2ZW50VG9TZXJ2ZXIoJ3F1aXRfdG9fbWVudScsIHt9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyDlpLHotKXml7blj6rmmL7npLrpgIDlh7rmjInpkq7vvIjlsYXkuK3vvIlcbiAgICAgICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ3JpZ2h0JztcbiAgICAgICAgYnV0dG9uc1NlY3Rpb24uc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIGNyZWF0ZVN0eWxlZEJ1dHRvbihidXR0b25zU2VjdGlvbiwgJ1F1aXRHYW1lQnV0dG9uJywgJ+mAgOWHuua4uOaIjycsICgpID0+IHtcbiAgICAgICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gUXVpdHRpbmcgZ2FtZSBhZnRlciBkZWZlYXQuLi4nKTtcbiAgICAgICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5idXR0b25fY2xpY2snKTtcbiAgICAgICAgICAgIEdhbWVFdmVudHMuU2VuZEN1c3RvbUdhbWVFdmVudFRvU2VydmVyKCdxdWl0X3RvX21lbnUnLCB7fSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYnV0dG9uc1NlY3Rpb247XG59XG4vLyDliJvlu7rmoLflvI/ljJbmjInpkq7vvIjlj4LogIMgcGxheWluZy1odWQg6aOO5qC877yJXG5mdW5jdGlvbiBjcmVhdGVTdHlsZWRCdXR0b24ocGFyZW50LCBpZCwgdGV4dCwgb25DbGljaykge1xuICAgIGNvbnN0IGJ1dHRvbiA9ICQuQ3JlYXRlUGFuZWwoJ0J1dHRvbicsIHBhcmVudCwgaWQpO1xuICAgIGJ1dHRvbi5BZGRDbGFzcygnYmF0dGxlX2VuZF9idXR0b24nKTtcbiAgICAvLyDmjInpkq7lsLrlr7jnvKnlsI/liLAwLjXlgI1cbiAgICBidXR0b24uc3R5bGUud2lkdGggPSAnMTQwcHgnO1xuICAgIGJ1dHRvbi5zdHlsZS5oZWlnaHQgPSAnMzBweCc7XG4gICAgYnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dFByaW1hcnk7XG4gICAgYnV0dG9uLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpJztcbiAgICBidXR0b24uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzVweCc7XG4gICAgYnV0dG9uLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggMnB4IDVweCByZ2JhKDAsIDAsIDAsIDAuMyknO1xuICAgIGNvbnN0IGxhYmVsID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBidXR0b24sIGAke2lkfV9MYWJlbGApO1xuICAgIGxhYmVsLnRleHQgPSB0ZXh0O1xuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gJzEycHgnOyAvLyDlrZfkvZPnvKnlsI/liLAwLjXlgI1cbiAgICBsYWJlbC5zdHlsZS5jb2xvciA9ICcjZmZmZmZmJztcbiAgICBsYWJlbC5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIGxhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxhYmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGxhYmVsLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICBsYWJlbC5zdHlsZS50ZXh0U2hhZG93ID0gJzFweCAxcHggMnB4ICMwMDAwMDAnO1xuICAgIC8vIOS9v+eUqCBQYW5vcmFtYSDnmoQgYWxpZ24g5bGe5oCn6K6p5paH5a2X5bGF5LitXG4gICAgbGFiZWwuc3R5bGUuYWxpZ24gPSAnY2VudGVyIGNlbnRlcic7XG4gICAgbGFiZWwuaGl0dGVzdCA9IGZhbHNlO1xuICAgIGJ1dHRvbi5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIEJ1dHRvbiBjbGlja2VkOiAke3RleHR9YCk7XG4gICAgICAgIG9uQ2xpY2soKTtcbiAgICB9KTtcbiAgICAvLyDmgqzlgZzmlYjmnpxcbiAgICBidXR0b24uU2V0UGFuZWxFdmVudCgnb25tb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRBY2NlbnQ7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgxLjA1LCAxLjA1LCAxLjApJztcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9vdmVyJyk7XG4gICAgfSk7XG4gICAgYnV0dG9uLlNldFBhbmVsRXZlbnQoJ29ubW91c2VvdXQnLCAoKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRQcmltYXJ5O1xuICAgICAgICBidXR0b24uc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMS4wLCAxLjAsIDEuMCknO1xuICAgIH0pO1xuICAgIHJldHVybiBidXR0b247XG59XG4vLyDmoLzlvI/ljJbmlbDlrZdcbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW0pIHtcbiAgICBpZiAobnVtID49IDEwMDAwMDApIHtcbiAgICAgICAgcmV0dXJuIChudW0gLyAxMDAwMDAwKS50b0ZpeGVkKDEpICsgJ00nO1xuICAgIH1cbiAgICBlbHNlIGlmIChudW0gPj0gMTAwMCkge1xuICAgICAgICByZXR1cm4gKG51bSAvIDEwMDApLnRvRml4ZWQoMSkgKyAnSyc7XG4gICAgfVxuICAgIHJldHVybiBudW0udG9TdHJpbmcoKTtcbn1cbi8vIOa1t+WFi+aWr+W8uuWMlumAieaLqeebuOWFs1xubGV0IHNlbGVjdGVkQXVnbWVudElkID0gbnVsbDtcbi8vIOWIm+W7uua1t+WFi+aWr+W8uuWMlumAieaLqeWMuuWfn1xuZnVuY3Rpb24gY3JlYXRlQXVnbWVudFNlY3Rpb24ocGFyZW50LCBhdWdtZW50T3B0aW9ucykge1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+OgSA9PT09PT09PT09IENyZWF0aW5nIGF1Z21lbnQgc2VjdGlvbiA9PT09PT09PT09YCk7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDwn46BIE9wdGlvbnMgY291bnQ6ICR7YXVnbWVudE9wdGlvbnMubGVuZ3RofWApO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+OgSBQYXJlbnQgcGFuZWw6ICR7cGFyZW50LmlkfWApO1xuICAgIGNvbnN0IGF1Z21lbnRTZWN0aW9uID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCBwYXJlbnQsICdBdWdtZW50U2VjdGlvbicpO1xuICAgIGlmICghYXVnbWVudFNlY3Rpb24pIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDinYwgRmFpbGVkIHRvIGNyZWF0ZSBhdWdtZW50IHNlY3Rpb24hJyk7XG4gICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgfVxuICAgIGF1Z21lbnRTZWN0aW9uLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGF1Z21lbnRTZWN0aW9uLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdkb3duJztcbiAgICBhdWdtZW50U2VjdGlvbi5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnMzBweCc7XG4gICAgYXVnbWVudFNlY3Rpb24uc3R5bGUucGFkZGluZyA9ICcyMHB4JztcbiAgICBhdWdtZW50U2VjdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjMpJztcbiAgICBhdWdtZW50U2VjdGlvbi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDwn46BIEF1Z21lbnQgc2VjdGlvbiBjcmVhdGVkIHN1Y2Nlc3NmdWxseWApO1xuICAgIC8vIOagh+mimFxuICAgIGNvbnN0IHRpdGxlID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBhdWdtZW50U2VjdGlvbiwgJ0F1Z21lbnRUaXRsZScpO1xuICAgIHRpdGxlLnRleHQgPSAn6YCJ5oup5rW35YWL5pav5by65YyWJztcbiAgICB0aXRsZS5zdHlsZS5mb250U2l6ZSA9ICczMnB4JztcbiAgICB0aXRsZS5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dEFjY2VudDtcbiAgICB0aXRsZS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnO1xuICAgIHRpdGxlLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHRpdGxlLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcyMHB4JztcbiAgICB0aXRsZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIPCfjoEgVGl0bGUgY3JlYXRlZGApO1xuICAgIC8vIOaPkOekuuaWh+Wtl1xuICAgIGNvbnN0IGhpbnQgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGF1Z21lbnRTZWN0aW9uLCAnQXVnbWVudEhpbnQnKTtcbiAgICBoaW50LnRleHQgPSAn6YCJ5oup5LiA5Liq5by65YyW5p2l5aKe5by65L2g55qE5a6e5YqbJztcbiAgICBoaW50LnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIGhpbnQuc3R5bGUuY29sb3IgPSBCQVRUTEVfRU5EX1RIRU1FLnRleHRTZWNvbmRhcnk7XG4gICAgaGludC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBoaW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICczMHB4JztcbiAgICBoaW50LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGhpbnQuc3R5bGUub3BhY2l0eSA9ICcwLjgnO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+OgSBIaW50IGNyZWF0ZWRgKTtcbiAgICAvLyDljaHniYflrrnlmajvvIjnvKnlsI/pq5jluqbvvIlcbiAgICBjb25zdCBjYXJkc0NvbnRhaW5lciA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgYXVnbWVudFNlY3Rpb24sICdBdWdtZW50Q2FyZHMnKTtcbiAgICBjYXJkc0NvbnRhaW5lci5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICBjYXJkc0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMjIwcHgnO1xuICAgIGNhcmRzQ29udGFpbmVyLnN0eWxlLmZsb3dDaGlsZHJlbiA9ICdyaWdodCc7XG4gICAgY2FyZHNDb250YWluZXIuc3R5bGUuaG9yaXpvbnRhbEFsaWduID0gJ2NlbnRlcic7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDwn46BIENhcmRzIGNvbnRhaW5lciBjcmVhdGVkYCk7XG4gICAgLy8g5Yib5bu65q+P5Liq5by65YyW5Y2h54mHXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdWdtZW50T3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBhdWdtZW50ID0gYXVnbWVudE9wdGlvbnNbaV07XG4gICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+OgSBDcmVhdGluZyBjYXJkICR7aX06ICR7YXVnbWVudC5kaXNwbGF5TmFtZX0gKCR7YXVnbWVudC5pZH0pYCk7XG4gICAgICAgIGNyZWF0ZUF1Z21lbnRDYXJkKGNhcmRzQ29udGFpbmVyLCBhdWdtZW50LCBpKTtcbiAgICB9XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDwn46BID09PT09PT09PT0gQXVnbWVudCBzZWN0aW9uIGNvbXBsZXRlID09PT09PT09PT1gKTtcbiAgICByZXR1cm4gYXVnbWVudFNlY3Rpb247XG59XG4vLyDliJvlu7rljZXkuKrmtbflhYvmlq/lvLrljJbljaHniYdcbmZ1bmN0aW9uIGNyZWF0ZUF1Z21lbnRDYXJkKHBhcmVudCwgYXVnbWVudCwgaW5kZXgpIHtcbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIPCfg48gQ3JlYXRpbmcgY2FyZCAke2luZGV4fTogJHthdWdtZW50LmRpc3BsYXlOYW1lfWApO1xuICAgIGNvbnN0IGNhcmQgPSAkLkNyZWF0ZVBhbmVsKCdQYW5lbCcsIHBhcmVudCwgYEF1Z21lbnRDYXJkXyR7aW5kZXh9YCk7XG4gICAgaWYgKCFjYXJkKSB7XG4gICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g4p2MIEZhaWxlZCB0byBjcmVhdGUgY2FyZCAke2luZGV4fSFgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyDnvKnlsI/ljaHniYflsLrlr7jliLAyMDB4MjAwXG4gICAgY2FyZC5zdHlsZS53aWR0aCA9ICcyMDBweCc7XG4gICAgY2FyZC5zdHlsZS5oZWlnaHQgPSAnMjAwcHgnO1xuICAgIGNhcmQuc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIGNhcmQuc3R5bGUubWFyZ2luTGVmdCA9IGluZGV4ID4gMCA/ICcxNXB4JyA6ICcwcHgnO1xuICAgIGNhcmQuc3R5bGUucGFkZGluZyA9ICcxMHB4JztcbiAgICBjYXJkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsIDAsIDAsIDAuNiknO1xuICAgIGNhcmQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xuICAgIGNhcmQuc3R5bGUuYm9yZGVyID0gJzJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknO1xuICAgIGNhcmQuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+DjyBDYXJkICR7aW5kZXh9IHBhbmVsIGNyZWF0ZWRgKTtcbiAgICAvLyDmoLnmja7nqIDmnInluqborr7nva7ovrnmoYbpopzoibJcbiAgICBsZXQgYm9yZGVyQ29sb3IgPSAnI2ZmZmZmZic7XG4gICAgaWYgKGF1Z21lbnQucmFyaXR5ID09PSAnY29tbW9uJykge1xuICAgICAgICBib3JkZXJDb2xvciA9ICcjYWFhYWFhJzsgLy8g54Gw6ImyXG4gICAgfVxuICAgIGVsc2UgaWYgKGF1Z21lbnQucmFyaXR5ID09PSAncmFyZScpIHtcbiAgICAgICAgYm9yZGVyQ29sb3IgPSAnIzRhOWVmZic7IC8vIOiTneiJslxuICAgIH1cbiAgICBlbHNlIGlmIChhdWdtZW50LnJhcml0eSA9PT0gJ2VwaWMnKSB7XG4gICAgICAgIGJvcmRlckNvbG9yID0gJyNhMzM1ZWUnOyAvLyDntKvoibJcbiAgICB9XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSDwn4OPIENhcmQgJHtpbmRleH0gYm9yZGVyIGNvbG9yOiAke2JvcmRlckNvbG9yfSAocmFyaXR5OiAke2F1Z21lbnQucmFyaXR5fSlgKTtcbiAgICAvLyDlm77moIfvvIjnvKnlsI/vvIlcbiAgICBjb25zdCBpY29uID0gJC5DcmVhdGVQYW5lbCgnSW1hZ2UnLCBjYXJkLCBgQXVnbWVudEljb25fJHtpbmRleH1gKTtcbiAgICBpY29uLlNldEltYWdlKGF1Z21lbnQuaWNvbik7XG4gICAgaWNvbi5zdHlsZS53aWR0aCA9ICc2MHB4JztcbiAgICBpY29uLnN0eWxlLmhlaWdodCA9ICc2MHB4JztcbiAgICBpY29uLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGljb24uc3R5bGUubWFyZ2luQm90dG9tID0gJzhweCc7XG4gICAgaWNvbi5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgLy8g5ZCN56ew77yI57yp5bCP5a2X5L2T77yJXG4gICAgY29uc3QgbmFtZSA9ICQuQ3JlYXRlUGFuZWwoJ0xhYmVsJywgY2FyZCwgYEF1Z21lbnROYW1lXyR7aW5kZXh9YCk7XG4gICAgbmFtZS50ZXh0ID0gYXVnbWVudC5kaXNwbGF5TmFtZTtcbiAgICBuYW1lLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xuICAgIG5hbWUuc3R5bGUuY29sb3IgPSBib3JkZXJDb2xvcjtcbiAgICBuYW1lLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCc7XG4gICAgbmFtZS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBuYW1lLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc2cHgnO1xuICAgIG5hbWUuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbmFtZS5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgLy8g56iA5pyJ5bqm5qCH562+77yI57yp5bCP5a2X5L2T77yJXG4gICAgY29uc3QgcmFyaXR5TGFiZWwgPSAkLkNyZWF0ZVBhbmVsKCdMYWJlbCcsIGNhcmQsIGBBdWdtZW50UmFyaXR5XyR7aW5kZXh9YCk7XG4gICAgbGV0IHJhcml0eVRleHQgPSAnJztcbiAgICBpZiAoYXVnbWVudC5yYXJpdHkgPT09ICdjb21tb24nKVxuICAgICAgICByYXJpdHlUZXh0ID0gJ+aZrumAmic7XG4gICAgZWxzZSBpZiAoYXVnbWVudC5yYXJpdHkgPT09ICdyYXJlJylcbiAgICAgICAgcmFyaXR5VGV4dCA9ICfnqIDmnIknO1xuICAgIGVsc2UgaWYgKGF1Z21lbnQucmFyaXR5ID09PSAnZXBpYycpXG4gICAgICAgIHJhcml0eVRleHQgPSAn5Y+y6K+XJztcbiAgICByYXJpdHlMYWJlbC50ZXh0ID0gcmFyaXR5VGV4dDtcbiAgICByYXJpdHlMYWJlbC5zdHlsZS5mb250U2l6ZSA9ICcxNHB4JztcbiAgICByYXJpdHlMYWJlbC5zdHlsZS5jb2xvciA9IGJvcmRlckNvbG9yO1xuICAgIHJhcml0eUxhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIHJhcml0eUxhYmVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc2cHgnO1xuICAgIHJhcml0eUxhYmVsLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHJhcml0eUxhYmVsLmhpdHRlc3QgPSBmYWxzZTtcbiAgICAvLyDmj4/ov7DvvIjnvKnlsI/lrZfkvZPvvIlcbiAgICBjb25zdCBkZXNjID0gJC5DcmVhdGVQYW5lbCgnTGFiZWwnLCBjYXJkLCBgQXVnbWVudERlc2NfJHtpbmRleH1gKTtcbiAgICBkZXNjLnRleHQgPSBhdWdtZW50LmRlc2NyaXB0aW9uO1xuICAgIGRlc2Muc3R5bGUuZm9udFNpemUgPSAnMTNweCc7XG4gICAgZGVzYy5zdHlsZS5jb2xvciA9IEJBVFRMRV9FTkRfVEhFTUUudGV4dFNlY29uZGFyeTtcbiAgICBkZXNjLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGRlc2Muc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgZGVzYy5zdHlsZS5vcGFjaXR5ID0gJzAuOSc7XG4gICAgZGVzYy5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgLy8g54K55Ye75LqL5Lu277ya55u05o6l5omT5byA6YCJ5YWz55WM6Z2iXG4gICAgY2FyZC5TZXRQYW5lbEV2ZW50KCdvbmFjdGl2YXRlJywgKCkgPT4ge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIPCfjq8gQXVnbWVudCBzZWxlY3RlZDogJHthdWdtZW50LmlkfWApO1xuICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkuYnV0dG9uX2NsaWNrJyk7XG4gICAgICAgIHNlbGVjdGVkQXVnbWVudElkID0gYXVnbWVudC5pZDtcbiAgICAgICAgLy8g5omT5byA6YCJ5YWz55WM6Z2iXG4gICAgICAgIGlmIChnbG9iYWxUaGlzLlN0YWdlU2VsZWN0ICYmIGdsb2JhbFRoaXMuU3RhZ2VTZWxlY3Quc2hvdykge1xuICAgICAgICAgICAgZ2xvYmFsVGhpcy5TdGFnZVNlbGVjdC5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6ZqQ6JeP57uT566X55WM6Z2iXG4gICAgICAgIGhpZGVWaWV3KCk7XG4gICAgfSk7XG4gICAgLy8g5oKs5YGc5pWI5p6cXG4gICAgY2FyZC5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgY2FyZC5zdHlsZS5ib3JkZXIgPSBgMnB4IHNvbGlkICR7Ym9yZGVyQ29sb3J9YDtcbiAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgxLjA1LCAxLjA1LCAxLjApJztcbiAgICAgICAgY2FyZC5zdHlsZS5ib3hTaGFkb3cgPSBgMHB4IDBweCAxNXB4ICR7Ym9yZGVyQ29sb3J9YDtcbiAgICAgICAgR2FtZS5FbWl0U291bmQoJ3VpLmJ1dHRvbl9vdmVyJyk7XG4gICAgfSk7XG4gICAgY2FyZC5TZXRQYW5lbEV2ZW50KCdvbm1vdXNlb3V0JywgKCkgPT4ge1xuICAgICAgICBjYXJkLnN0eWxlLmJvcmRlciA9ICcycHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpJztcbiAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSAnc2NhbGUzZCgxLjAsIDEuMCwgMS4wKSc7XG4gICAgICAgIGNhcmQuc3R5bGUuYm94U2hhZG93ID0gJzBweCA0cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuNSknO1xuICAgIH0pO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+DjyBDYXJkICR7aW5kZXh9IGNvbXBsZXRlZDogJHthdWdtZW50LmRpc3BsYXlOYW1lfWApO1xufVxuLy8g5pi+56S657uT566X55WM6Z2i77yI5a6M5YWo5Yqo5oCB5Yib5bu677yM5YOPIHBsYXlpbmctaHVkIOS4gOagt++8iVxuZnVuY3Rpb24gc2hvd1ZpZXcocmVzdWx0KSB7XG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSA9PT09PT09PT09IHNob3dWaWV3KCkgY2FsbGVkID09PT09PT09PT0nKTtcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIFJlc3VsdDonLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIFdpbm5lcjonLCByZXN1bHQud2lubmVyKTtcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIFJvdW5kOicsIHJlc3VsdC5yb3VuZCk7XG4gICAgLy8g6I635Y+W5qC56Z2i5p2/77yI5LiOIHBsYXlpbmctaHVkIOWujOWFqOS4gOiHtO+8iVxuICAgIGNvbnN0IHJvb3RQYW5lbCA9ICQuR2V0Q29udGV4dFBhbmVsKCk7XG4gICAgaWYgKCFyb290UGFuZWwpIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDinYwgUm9vdCBwYW5lbCBub3QgZm91bmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIFJvb3QgcGFuZWwgaWQ6ICR7cm9vdFBhbmVsLmlkIHx8ICdlbXB0eSd9LCBzaXplOiAke3Jvb3RQYW5lbC5hY3R1YWxsYXlvdXR3aWR0aH14JHtyb290UGFuZWwuYWN0dWFsbGF5b3V0aGVpZ2h0fSwgY2hpbGRyZW46ICR7cm9vdFBhbmVsLkNoaWxkcmVuKCkubGVuZ3RofWApO1xuICAgIC8vIOWmguaenOaguemdouadv+WwuuWvuOS4uiAw77yM5L2/55So5bGP5bmV5YiG6L6o546H5L2c5Li65aSH55SoXG4gICAgbGV0IHVzZVNjcmVlblNpemUgPSBmYWxzZTtcbiAgICBpZiAocm9vdFBhbmVsLmFjdHVhbGxheW91dHdpZHRoID09PSAwIHx8IHJvb3RQYW5lbC5hY3R1YWxsYXlvdXRoZWlnaHQgPT09IDApIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDimqDvuI8gUm9vdCBwYW5lbCBzaXplIGlzIDAsIHdpbGwgdXNlIHNjcmVlbiByZXNvbHV0aW9uJyk7XG4gICAgICAgIHVzZVNjcmVlblNpemUgPSB0cnVlO1xuICAgIH1cbiAgICAvLyDliKDpmaTlt7LlrZjlnKjnmoTlrrnlmajvvIjlpoLmnpzlrZjlnKjvvIlcbiAgICBsZXQgZXhpc3RpbmdDb250YWluZXIgPSByb290UGFuZWwuRmluZENoaWxkKCdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoZXhpc3RpbmdDb250YWluZXIpIHtcbiAgICAgICAgZXhpc3RpbmdDb250YWluZXIuRGVsZXRlQXN5bmMoMCk7XG4gICAgfVxuICAgIGV4aXN0aW5nQ29udGFpbmVyID0gcm9vdFBhbmVsLkZpbmRDaGlsZEluTGF5b3V0RmlsZSgnQmF0dGxlRW5kQ29udGFpbmVyJyk7XG4gICAgaWYgKGV4aXN0aW5nQ29udGFpbmVyKSB7XG4gICAgICAgIGV4aXN0aW5nQ29udGFpbmVyLkRlbGV0ZUFzeW5jKDApO1xuICAgIH1cbiAgICAvLyDlrozlhajliqjmgIHliJvlu7rlrrnlmajvvIjlg48gcGxheWluZy1odWQg5LiA5qC377yJXG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBDcmVhdGluZyBjb250YWluZXIgZHluYW1pY2FsbHkgKGxpa2UgcGxheWluZy1odWQpLi4uJyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gJC5DcmVhdGVQYW5lbCgnUGFuZWwnLCByb290UGFuZWwsICdCYXR0bGVFbmRDb250YWluZXInKTtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgICAkLk1zZygn4p2MIEZhaWxlZCB0byBjcmVhdGUgY29udGFpbmVyJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8g6K6+572u5a655Zmo5qC35byP77yI5LiOIHBsYXlpbmctaHVkIOWujOWFqOS4gOiHtOeahOaWueW8j++8iVxuICAgIGNvbnRhaW5lci5BZGRDbGFzcygnYmF0dGxlX2VuZF9jb250YWluZXInKTtcbiAgICAvLyDlpoLmnpzmoLnpnaLmnb/lsLrlr7jkuLogMO+8jOS9v+eUqOWxj+W5leWIhui+qOeOh1xuICAgIGlmICh1c2VTY3JlZW5TaXplKSB7XG4gICAgICAgIC8vIOiOt+WPluWxj+W5leWIhui+qOeOh++8iOmAmuW4uCBQYW5vcmFtYSDkvb/nlKggMTkyMHgxMDgwIOaIluWunumZheWIhui+qOeOh++8iVxuICAgICAgICBjb25zdCBzY3JlZW5XaWR0aCA9IEdhbWUuR2V0U2NyZWVuV2lkdGgoKTtcbiAgICAgICAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gR2FtZS5HZXRTY3JlZW5IZWlnaHQoKTtcbiAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBVc2luZyBzY3JlZW4gc2l6ZTogJHtzY3JlZW5XaWR0aH14JHtzY3JlZW5IZWlnaHR9YCk7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGAke3NjcmVlbldpZHRofXB4YDtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke3NjcmVlbkhlaWdodH1weGA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgfVxuICAgIGNvbnRhaW5lci5zdHlsZS5ob3Jpem9udGFsQWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250YWluZXIuc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAnMTAwMDAnOyAvLyDmr5QgcGxheWluZy1odWQgKDEwMDApIOmrmFxuICAgIGNvbnRhaW5lci5oaXR0ZXN0ID0gZmFsc2U7XG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7IC8vIOaYvuW8j+iuvue9ruS4uuWPr+ingVxuICAgIC8vIOmqjOivgeeItuWFg+e0oFxuICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudCA9IGNvbnRhaW5lci5HZXRQYXJlbnQoKTtcbiAgICBpZiAoIWNvbnRhaW5lclBhcmVudCkge1xuICAgICAgICAkLk1zZygn4p2MIENvbnRhaW5lciBoYXMgbm8gcGFyZW50IScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gQ29udGFpbmVyIHBhcmVudDogJHtjb250YWluZXJQYXJlbnQuaWQgfHwgJ3Jvb3QnfSwgcGFyZW50IHNpemU6ICR7Y29udGFpbmVyUGFyZW50LmFjdHVhbGxheW91dHdpZHRofXgke2NvbnRhaW5lclBhcmVudC5hY3R1YWxsYXlvdXRoZWlnaHR9YCk7XG4gICAgLy8g5Yib5bu66YGu572pXG4gICAgY29uc3QgbWFzayA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnQmF0dGxlRW5kTWFzaycpO1xuICAgIG1hc2suc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgbWFzay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBtYXNrLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hc2suc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1hc2suaGl0dGVzdCA9IHRydWU7XG4gICAgLy8g5Yib5bu65Li76Z2i5p2/77yI5a6M5YWo5Yqo5oCB5Yib5bu677yJXG4gICAgY29uc3QgbWFpbiA9ICQuQ3JlYXRlUGFuZWwoJ1BhbmVsJywgY29udGFpbmVyLCAnQmF0dGxlRW5kTWFpbicpO1xuICAgIG1haW4uc3R5bGUud2lkdGggPSAnOTAwcHgnO1xuICAgIC8vIOajgOafpeaYr+WQpuaciea1t+WFi+aWr+W8uuWMlu+8iOWPquacieiDnOWIqeaXtuaJjeaYvuekuu+8iVxuICAgIGNvbnN0IGhhc0F1Z21lbnRzID0gcmVzdWx0Lndpbm5lciA9PT0gJ3BsYXllcicgJiYgcmVzdWx0LmF1Z21lbnRPcHRpb25zICYmIHJlc3VsdC5hdWdtZW50T3B0aW9ucy5sZW5ndGggPiAwO1xuICAgIC8vIOagueaNruaYr+WQpuaciea1t+WFi+aWr+W8uuWMluiwg+aVtOmrmOW6pu+8iOWNoeeJh+WPmOWwj+WQju+8jOaVtOS9k+mrmOW6puS5n+WHj+Wwj++8iVxuICAgIGlmIChoYXNBdWdtZW50cykge1xuICAgICAgICBtYWluLnN0eWxlLmhlaWdodCA9ICc2MDBweCc7IC8vIOaciea1t+WFi+aWr+W8uuWMluaXtueahOmrmOW6pu+8iOW3sue8qeWwj++8iVxuICAgICAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIFNldHRpbmcgcGFuZWwgaGVpZ2h0IHRvIDYwMHB4ICh3aXRoIGF1Z21lbnRzKScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbWFpbi5zdHlsZS5oZWlnaHQgPSAnNjAwcHgnOyAvLyDmsqHmnInmtbflhYvmlq/lvLrljJbml7bkvb/nlKjpu5jorqTpq5jluqZcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBTZXR0aW5nIHBhbmVsIGhlaWdodCB0byA2MDBweCAobm8gYXVnbWVudHMpJyk7XG4gICAgfVxuICAgIG1haW4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gQkFUVExFX0VORF9USEVNRS5wYW5lbEJnO1xuICAgIG1haW4uc3R5bGUuYm9yZGVyID0gYDJweCBzb2xpZCAke0JBVFRMRV9FTkRfVEhFTUUuYm9yZGVyQ29sb3J9YDtcbiAgICBtYWluLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcyMHB4JztcbiAgICBtYWluLnN0eWxlLmJveFNoYWRvdyA9ICcwcHggMHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjgpJztcbiAgICBtYWluLnN0eWxlLmhvcml6b250YWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1haW4uc3R5bGUudmVydGljYWxBbGlnbiA9ICdjZW50ZXInO1xuICAgIG1haW4uc3R5bGUuZmxvd0NoaWxkcmVuID0gJ2Rvd24nO1xuICAgIG1haW4uc3R5bGUucGFkZGluZyA9ICc0MHB4JztcbiAgICAvLyDliJvlu7rlkITkuKrljLrln5/vvIjlrozlhajliqjmgIHliJvlu7rvvIlcbiAgICBjcmVhdGVUaXRsZVNlY3Rpb24obWFpbiwgcmVzdWx0KTtcbiAgICAvLyDlj6rmnInlnKjmsqHmnInmtbflhYvmlq/lvLrljJbml7bmiY3mmL7npLrmiJjmlpfnu5/orqFcbiAgICBpZiAoIWhhc0F1Z21lbnRzKSB7XG4gICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gQ3JlYXRpbmcgc3RhdHMgc2VjdGlvbiAobm8gYXVnbWVudHMpJyk7XG4gICAgICAgIGNyZWF0ZVN0YXRzU2VjdGlvbihtYWluLCByZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBTa2lwcGluZyBzdGF0cyBzZWN0aW9uIChoYXMgYXVnbWVudHMpJyk7XG4gICAgfVxuICAgIC8vIOWmguaenOaciea1t+WFi+aWr+W8uuWMlumAiemhue+8jOaYvuekuumAieaLqeWMuuWfn1xuICAgIGlmIChoYXNBdWdtZW50cykge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIPCfjoEgQ3JlYXRpbmcgYXVnbWVudCBzZWN0aW9uIHdpdGggJHtyZXN1bHQuYXVnbWVudE9wdGlvbnMubGVuZ3RofSBvcHRpb25zYCk7XG4gICAgICAgIGNyZWF0ZUF1Z21lbnRTZWN0aW9uKG1haW4sIHJlc3VsdC5hdWdtZW50T3B0aW9ucyk7XG4gICAgICAgIC8vIOmHjee9rumAieaLqeeKtuaAgVxuICAgICAgICBzZWxlY3RlZEF1Z21lbnRJZCA9IG51bGw7XG4gICAgfVxuICAgIGNyZWF0ZUJ1dHRvbnNTZWN0aW9uKG1haW4sIHJlc3VsdCk7XG4gICAgLy8g56Gu5L+d5a655Zmo5Zyo5qC56Z2i5p2/55qE5pyA5ZCO77yI5pyA5LiK5bGC77yJXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgcm9vdENoaWxkcmVuID0gcm9vdFBhbmVsLkNoaWxkcmVuKCk7XG4gICAgICAgIGlmIChyb290Q2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgbGFzdENoaWxkID0gcm9vdENoaWxkcmVuW3Jvb3RDaGlsZHJlbi5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgIGlmIChsYXN0Q2hpbGQgIT09IGNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5Nb3ZlQ2hpbGRBZnRlcihjb250YWluZXIsIGxhc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBDb250YWluZXIgbW92ZWQgdG8gdG9wYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBOb3RlOiBDb3VsZCBub3QgbW92ZSBjb250YWluZXI6ICR7ZX1gKTtcbiAgICB9XG4gICAgLy8g5by65Yi25Yi35paw5biD5bGAXG4gICAgY29udGFpbmVyLlNldEhhc0NsYXNzKCdiYXR0bGVfZW5kX2NvbnRhaW5lcicsIHRydWUpO1xuICAgIC8vIOacgOe7iOmqjOivgVxuICAgIGNvbnN0IGZpbmFsUGFyZW50ID0gY29udGFpbmVyLkdldFBhcmVudCgpO1xuICAgIGlmIChmaW5hbFBhcmVudCkge1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIOKchSBQYXJlbnQgc2l6ZTogJHtmaW5hbFBhcmVudC5hY3R1YWxsYXlvdXR3aWR0aH14JHtmaW5hbFBhcmVudC5hY3R1YWxsYXlvdXRoZWlnaHR9YCk7XG4gICAgfVxuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g4pyFIE1haW4gcGFuZWwgY2hpbGRyZW46ICR7bWFpbi5DaGlsZHJlbigpLmxlbmd0aH1gKTtcbiAgICAvLyDlvLrliLborr7nva7lj6/op4HmgKfvvIjnoa7kv53nlYzpnaLmmL7npLrvvIlcbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICBjb250YWluZXIuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICBjb250YWluZXIuUmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgIGNvbnRhaW5lci5TZXRIYXNDbGFzcygnYmF0dGxlX2VuZF9jb250YWluZXInLCB0cnVlKTtcbiAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIENvbnRhaW5lciB2aXNpYmlsaXR5OiAke2NvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5fWApO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gQ29udGFpbmVyIG9wYWNpdHk6ICR7Y29udGFpbmVyLnN0eWxlLm9wYWNpdHl9YCk7XG4gICAgJC5Nc2coYFtCYXR0bGVFbmRWaWV3XSBDb250YWluZXIgei1pbmRleDogJHtjb250YWluZXIuc3R5bGUuekluZGV4fWApO1xuICAgIC8vIOW7tui/n+ajgOafpeWunumZheWwuuWvuO+8iFBhbm9yYW1hIOmcgOimgeaXtumXtOiuoeeul+W4g+WxgO+8iVxuICAgICQuU2NoZWR1bGUoMC4xLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdHVhbFdpZHRoID0gY29udGFpbmVyLmFjdHVhbGxheW91dHdpZHRoO1xuICAgICAgICBjb25zdCBhY3R1YWxIZWlnaHQgPSBjb250YWluZXIuYWN0dWFsbGF5b3V0aGVpZ2h0O1xuICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIENvbnRhaW5lciBzaXplIGFmdGVyIDAuMXM6ICR7YWN0dWFsV2lkdGh9eCR7YWN0dWFsSGVpZ2h0fWApO1xuICAgICAgICAvLyDlpoLmnpzlsLrlr7jku43nhLbkuLogMO+8jOS9v+eUqOWxj+W5leWIhui+qOeOh1xuICAgICAgICBpZiAoYWN0dWFsV2lkdGggPT09IDAgfHwgYWN0dWFsSGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIOKaoO+4jyBDb250YWluZXIgc2l6ZSBpcyBzdGlsbCAwLCB1c2luZyBzY3JlZW4gcmVzb2x1dGlvbi4uLicpO1xuICAgICAgICAgICAgY29uc3Qgc2NyZWVuV2lkdGggPSBHYW1lLkdldFNjcmVlbldpZHRoKCk7XG4gICAgICAgICAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSBHYW1lLkdldFNjcmVlbkhlaWdodCgpO1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gYCR7c2NyZWVuV2lkdGh9cHhgO1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGAke3NjcmVlbkhlaWdodH1weGA7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gU2V0IGNvbnRhaW5lciBzaXplIHRvICR7c2NyZWVuV2lkdGh9eCR7c2NyZWVuSGVpZ2h0fXB4YCk7XG4gICAgICAgICAgICAvLyDlho3mrKHmo4Dmn6VcbiAgICAgICAgICAgICQuU2NoZWR1bGUoMC4xLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3V2lkdGggPSBjb250YWluZXIuYWN0dWFsbGF5b3V0d2lkdGg7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SGVpZ2h0ID0gY29udGFpbmVyLmFjdHVhbGxheW91dGhlaWdodDtcbiAgICAgICAgICAgICAgICAkLk1zZyhgW0JhdHRsZUVuZFZpZXddIOKchSBDb250YWluZXIgc2l6ZSBhZnRlciBmaXg6ICR7bmV3V2lkdGh9eCR7bmV3SGVpZ2h0fWApO1xuICAgICAgICAgICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10gQ29udGFpbmVyIHZpc2liaWxpdHk6ICR7Y29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHl9YCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIOaSreaUvumfs+aViFxuICAgIGlmIChyZXN1bHQud2lubmVyID09PSAncGxheWVyJykge1xuICAgICAgICBHYW1lLkVtaXRTb3VuZCgndWkudmljdG9yeScpO1xuICAgIH1cbiAgICBlbHNlIGlmIChyZXN1bHQud2lubmVyID09PSAnZW5lbXknKSB7XG4gICAgICAgIEdhbWUuRW1pdFNvdW5kKCd1aS5kZWZlYXQnKTtcbiAgICB9XG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSA9PT09PT09PT09IHNob3dWaWV3KCkgY29tcGxldGVkID09PT09PT09PT0nKTtcbn1cbi8vIOmakOiXj+e7k+eul+eVjOmdolxuZnVuY3Rpb24gaGlkZVZpZXcoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZ2V0QmF0dGxlRW5kQ29udGFpbmVyKCk7XG4gICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdjb2xsYXBzZSc7XG4gICAgICAgICQuTXNnKCfwn5SSIEJhdHRsZSBlbmQgdmlldyBoaWRkZW4nKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgICQuTXNnKCfimqDvuI8gQmF0dGxlRW5kQ29udGFpbmVyIG5vdCBmb3VuZCB3aGVuIHRyeWluZyB0byBoaWRlJyk7XG4gICAgfVxufVxuLy8g5aSE55CG5oiY5paX57uT5p2f5LqL5Lu2XG5mdW5jdGlvbiBoYW5kbGVCYXR0bGVFbmRlZChkYXRhKSB7XG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBCYXR0bGUgZW5kZWQgZXZlbnQgcmVjZWl2ZWQ6JywgZGF0YSk7XG4gICAgY29uc3QgcmVzdWx0ID0gZGF0YS5yZXN1bHQgfHwge307XG4gICAgLy8g6L2s5o2i5pWw5o2u5qC85byPXG4gICAgY29uc3QgYmF0dGxlUmVzdWx0ID0ge1xuICAgICAgICB3aW5uZXI6IHJlc3VsdC53aW5uZXIgfHwgJ2RyYXcnLFxuICAgICAgICByb3VuZDogcmVzdWx0LnJvdW5kIHx8IDEsXG4gICAgICAgIGR1cmF0aW9uOiByZXN1bHQuZHVyYXRpb24gfHwgMCxcbiAgICAgICAgc3RhdHM6IHJlc3VsdC5zdGF0cyxcbiAgICAgICAgbGV2ZWxJZDogcmVzdWx0LmxldmVsSWQsXG4gICAgICAgIGxldmVsTmFtZTogcmVzdWx0LmxldmVsTmFtZVxuICAgIH07XG4gICAgLy8g5bu26L+f5pi+56S677yM6K6p5oiY5paX5Zy65pmv5pyJ5pe26Ze05riF55CGXG4gICAgJC5TY2hlZHVsZSgwLjUsICgpID0+IHtcbiAgICAgICAgc2hvd1ZpZXcoYmF0dGxlUmVzdWx0KTtcbiAgICB9KTtcbn1cbi8vIOWwhiBMdWEg5a+56LGh5pWw57uE6L2s5o2i5Li6IEphdmFTY3JpcHQg5pWw57uEXG5mdW5jdGlvbiBjb252ZXJ0THVhQXJyYXlUb0pTQXJyYXkobHVhQXJyYXkpIHtcbiAgICBpZiAoIWx1YUFycmF5KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgLy8g5aaC5p6c5bey57uP5piv5pWw57uE77yM55u05o6l6L+U5ZueXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobHVhQXJyYXkpKSB7XG4gICAgICAgIHJldHVybiBsdWFBcnJheTtcbiAgICB9XG4gICAgLy8g5aaC5p6c5piv5a+56LGh77yM6L2s5o2i5Li65pWw57uE77yITHVhIOaVsOe7hOWcqOS8oOi+k+i/h+eoi+S4reS8muWPmOaIkCB7MTogey4uLn0sIDI6IHsuLi59LCAzOiB7Li4ufX3vvIlcbiAgICBpZiAodHlwZW9mIGx1YUFycmF5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGx1YUFycmF5KS5tYXAoayA9PiBwYXJzZUludChrKSkuZmlsdGVyKGsgPT4gIWlzTmFOKGspKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGx1YUFycmF5W2tleV0pO1xuICAgICAgICB9XG4gICAgICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+UhCBDb252ZXJ0ZWQgTHVhIGFycmF5ICgke2tleXMubGVuZ3RofSBpdGVtcykgdG8gSlMgYXJyYXlgKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIFtdO1xufVxuLy8g5aSE55CG5rOi5qyh57uT566X5LqL5Lu277yI6Ieq6LWw5qOL5qih5byP77yJXG5mdW5jdGlvbiBoYW5kbGVXYXZlU2V0dGxlbWVudChkYXRhKSB7XG4gICAgdmFyIF9hO1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gPT09PT09PT09PSBXYXZlIHNldHRsZW1lbnQgZXZlbnQgcmVjZWl2ZWQgPT09PT09PT09PScpO1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gRXZlbnQgZGF0YTonLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgLy8g8J+UkSDovazmjaIgYXVnbWVudE9wdGlvbnPvvIhMdWEg5pWw57uEIC0+IEpTIOaVsOe7hO+8iVxuICAgIGNvbnN0IGF1Z21lbnRPcHRpb25zID0gY29udmVydEx1YUFycmF5VG9KU0FycmF5KGRhdGEuYXVnbWVudE9wdGlvbnMpO1xuICAgICQuTXNnKGBbQmF0dGxlRW5kVmlld10g8J+OryBDb252ZXJ0ZWQgYXVnbWVudE9wdGlvbnM6ICR7YXVnbWVudE9wdGlvbnMubGVuZ3RofSBpdGVtc2ApO1xuICAgIGlmIChhdWdtZW50T3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gQXVnbWVudCBvcHRpb25zOicsIEpTT04uc3RyaW5naWZ5KGF1Z21lbnRPcHRpb25zKSk7XG4gICAgfVxuICAgIC8vIOS7jiBBdXRvQ2hlc3NNb2RlIOiOt+WPluiDnOi0n+S/oeaBr1xuICAgIGNvbnN0IGJhdHRsZVJlc3VsdCA9IHtcbiAgICAgICAgd2lubmVyOiBkYXRhLndpbm5lciB8fCAncGxheWVyJyxcbiAgICAgICAgcm91bmQ6IGRhdGEucm91bmQgfHwgMSxcbiAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24gfHwgMCxcbiAgICAgICAgc3RhdHM6IGRhdGEuc3RhdHMgfHwge30sXG4gICAgICAgIGxldmVsTmFtZTogZGF0YS5sZXZlbE5hbWUgfHwgdW5kZWZpbmVkLFxuICAgICAgICBpc0V2ZW50Tm9kZTogZGF0YS5pc0V2ZW50Tm9kZSB8fCBmYWxzZSxcbiAgICAgICAgYXVnbWVudE9wdGlvbnM6IGF1Z21lbnRPcHRpb25zXG4gICAgfTtcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIFByb2Nlc3NlZCBiYXR0bGUgcmVzdWx0OicsIEpTT04uc3RyaW5naWZ5KGJhdHRsZVJlc3VsdCkpO1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gV2lubmVyOicsIGJhdHRsZVJlc3VsdC53aW5uZXIpO1xuICAgICQuTXNnKCdbQmF0dGxlRW5kVmlld10gUm91bmQ6JywgYmF0dGxlUmVzdWx0LnJvdW5kKTtcbiAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIGlzRXZlbnROb2RlOicsIGJhdHRsZVJlc3VsdC5pc0V2ZW50Tm9kZSk7XG4gICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSBhdWdtZW50T3B0aW9ucyBjb3VudDonLCAoKF9hID0gYmF0dGxlUmVzdWx0LmF1Z21lbnRPcHRpb25zKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubGVuZ3RoKSB8fCAwKTtcbiAgICAvLyDnoa7kv53nlYzpnaLmmL7npLpcbiAgICB0cnkge1xuICAgICAgICBzaG93VmlldyhiYXR0bGVSZXN1bHQpO1xuICAgICAgICAkLk1zZygnW0JhdHRsZUVuZFZpZXddIOKchSBzaG93VmlldygpIGNhbGxlZCBzdWNjZXNzZnVsbHknKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgJC5Nc2coJ1tCYXR0bGVFbmRWaWV3XSDinYwgRXJyb3IgY2FsbGluZyBzaG93VmlldygpOicsIGUpO1xuICAgIH1cbn1cbi8vIOWIneWni+WMluS6i+S7tuiuoumYhVxuZnVuY3Rpb24gaW5pdGlhbGl6ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICQuTXNnKCfwn5OhIEluaXRpYWxpemluZyBiYXR0bGUgZW5kIHZpZXcgZXZlbnQgbGlzdGVuZXJzLi4uJyk7XG4gICAgLy8g55uR5ZCs5oiY5paX57uT5p2f5LqL5Lu2XG4gICAgR2FtZUV2ZW50cy5TdWJzY3JpYmUoJ2JhdHRsZV9lbmRlZCcsIGhhbmRsZUJhdHRsZUVuZGVkKTtcbiAgICAvLyDnm5HlkKzoh6rotbDmo4vms6LmrKHnu5PnrpdcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnYXV0b2NoZXNzX3dhdmVfc2V0dGxlbWVudCcsIGhhbmRsZVdhdmVTZXR0bGVtZW50KTtcbiAgICAvLyDnm5HlkKzlhbPpl63kuovku7ZcbiAgICBHYW1lRXZlbnRzLlN1YnNjcmliZSgnYmF0dGxlX2VuZF9kaXNtaXNzJywgaGlkZVZpZXcpO1xuICAgIEdhbWVFdmVudHMuU3Vic2NyaWJlKCdhdXRvY2hlc3Nfd2F2ZV9zZXR0bGVtZW50X2Rpc21pc3MnLCBoaWRlVmlldyk7XG4gICAgJC5Nc2coJ+KchSBFdmVudCBsaXN0ZW5lcnMgaW5pdGlhbGl6ZWQnKTtcbn1cbi8vIOWIneWni+WMlu+8iOWDjyBwbGF5aW5nLWh1ZCDkuIDmoLfvvIlcbmZ1bmN0aW9uIGluaXRpYWxpemVCYXR0bGVFbmRWaWV3KCkge1xuICAgICQuTXNnKCfwn5qAIEluaXRpYWxpemluZyBCYXR0bGUgRW5kIFZpZXcuLi4nKTtcbiAgICAvLyDnq4vljbPliJvlu7rlrrnlmajvvIzkuI3nrYnlvoVcbiAgICBjcmVhdGVCYXR0bGVFbmRDb250YWluZXIoKTtcbiAgICAvLyDliJ3lp4vljJbkuovku7bnm5HlkKxcbiAgICBpbml0aWFsaXplRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAkLk1zZygn4pyFIEJhdHRsZSBFbmQgVmlldyBpbml0aWFsaXplZCBzdWNjZXNzZnVsbHknKTtcbn1cbi8vIOa1i+ivleeUqOeahCBzaG93RHVtbXkg5Ye95pWwXG5mdW5jdGlvbiBzaG93RHVtbXkoKSB7XG4gICAgc2hvd1ZpZXcoe1xuICAgICAgICB3aW5uZXI6ICdwbGF5ZXInLFxuICAgICAgICByb3VuZDogMSxcbiAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgIHN0YXRzOiB7XG4gICAgICAgICAgICBkYW1hZ2VEZWFsdDogMTI1NDAsXG4gICAgICAgICAgICBkYW1hZ2VUYWtlbjogODMyMCxcbiAgICAgICAgICAgIHVuaXRzS2lsbGVkOiA1XG4gICAgICAgIH0sXG4gICAgICAgIGxldmVsTmFtZTogJ+a1i+ivleWFs+WNoSdcbiAgICB9KTtcbn1cbi8vIOaatOmcsuWFqOWxgEFQSe+8iOeUqOS6juiwg+ivle+8iVxuZ2xvYmFsVGhpcy5CYXR0bGVFbmRWaWV3ID0ge1xuICAgIHNob3c6IHNob3dWaWV3LFxuICAgIGhpZGU6IGhpZGVWaWV3LFxuICAgIHNob3dEdW1teTogc2hvd0R1bW15LFxuICAgIC8vIOa1i+ivleaVsOaNrlxuICAgIHNob3dWaWN0b3J5OiAoKSA9PiB7XG4gICAgICAgIHNob3dWaWV3KHtcbiAgICAgICAgICAgIHdpbm5lcjogJ3BsYXllcicsXG4gICAgICAgICAgICByb3VuZDogNSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0NTAwMCxcbiAgICAgICAgICAgIHN0YXRzOiB7XG4gICAgICAgICAgICAgICAgZGFtYWdlRGVhbHQ6IDEyNTQwLFxuICAgICAgICAgICAgICAgIGRhbWFnZVRha2VuOiA4MzIwLFxuICAgICAgICAgICAgICAgIHVuaXRzS2lsbGVkOiAxNSxcbiAgICAgICAgICAgICAgICB1bml0c1N1cnZpdmVkOiA1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGV2ZWxOYW1lOiAn57u/5oSP5bmz5Y6fJ1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHNob3dEZWZlYXQ6ICgpID0+IHtcbiAgICAgICAgc2hvd1ZpZXcoe1xuICAgICAgICAgICAgd2lubmVyOiAnZW5lbXknLFxuICAgICAgICAgICAgcm91bmQ6IDMsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzIwMDAsXG4gICAgICAgICAgICBzdGF0czoge1xuICAgICAgICAgICAgICAgIGRhbWFnZURlYWx0OiA1NDIwLFxuICAgICAgICAgICAgICAgIGRhbWFnZVRha2VuOiAxNTY4MCxcbiAgICAgICAgICAgICAgICB1bml0c0tpbGxlZDogOCxcbiAgICAgICAgICAgICAgICB1bml0c1N1cnZpdmVkOiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbGV2ZWxOYW1lOiAn6Zyc5Ya75bOh6LC3J1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuLy8g5ZCv5YqoXG5pbml0aWFsaXplQmF0dGxlRW5kVmlldygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9