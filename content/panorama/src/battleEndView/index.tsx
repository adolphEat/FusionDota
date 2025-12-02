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

// 战斗结果数据接口
interface BattleResult {
    winner: 'player' | 'enemy' | 'draw';  // 胜利方
    round: number;                         // 回合数
    duration: number;                      // 战斗时长（秒）
    stats?: {                             // 战斗统计
        damageDealt?: number;
        damageTaken?: number;
        unitsKilled?: number;
        unitsSurvived?: number;
    };
    levelId?: string;                     // 关卡ID
    levelName?: string;                   // 关卡名称
}

// 获取根面板
function getRoot(): Panel {
    return $.GetContextPanel();
}

// 查找子面板（从 layout 文件）
function find(id: string): Panel | null {
    return getRoot().FindChildInLayoutFile(id);
}

// 查找动态创建的子面板
function findChild(parent: Panel, id: string): Panel | null {
    return parent.FindChild(id);
}

// 创建结算容器（像 playing-hud 一样动态创建）
function createBattleEndContainer(): Panel | null {
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
    container.style.visibility = 'collapse';  // 默认隐藏
    container.style.zIndex = '10000';  // 比 playing-hud (1000) 高
    container.hittest = false;
    
    $.Msg(`[BattleEndView] Container created, parent: ${container.GetParent()?.id || 'null'}`);
    
    // 确保容器在根面板的最后（最上层）
    try {
        const rootChildren = rootPanel.Children();
        if (rootChildren.length > 1) {
            const lastChild = rootChildren[rootChildren.length - 1];
            if (lastChild !== container) {
                container.MoveChildAfter(container, lastChild);
            }
        }
    } catch (e) {
        $.Msg(`[BattleEndView] Note: Could not move container to top: ${e}`);
    }
    
    // 半透明遮罩
    const mask = $.CreatePanel('Panel', container, 'BattleEndMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    mask.style.horizontalAlign = 'center';
    mask.style.verticalAlign = 'center';
    mask.hittest = true;  // 拦截点击
    
    $.Msg('✅ Battle end container created');
    return container;
}

// 获取结算容器
function getBattleEndContainer(): Panel | null {
    const root = getRoot();
    let container = root.FindChildInLayoutFile('BattleEndContainer');
    if (!container) {
        container = root.FindChild('BattleEndContainer');
    }
    return container;
}

// 更新标题区域（使用 layout 中的面板）
function updateTitleSection(titleSection: Panel, result: BattleResult): void {
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
    } else if (result.winner === 'enemy') {
        resultTitle.text = '失败';
        resultTitle.style.color = BATTLE_END_THEME.danger;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.defeatGlow}`;
    } else {
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
    } else if (levelInfo) {
        levelInfo.style.visibility = 'collapse';
    }
}

function createTitleSection(parent: Panel, result: BattleResult): Panel {
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
    } else if (result.winner === 'enemy') {
        resultTitle.text = '失败';
        resultTitle.style.color = BATTLE_END_THEME.danger;
        resultTitle.style.textShadow = `0px 0px 20px ${BATTLE_END_THEME.defeatGlow}`;
    } else {
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
function updateStatsSection(statsSection: Panel, result: BattleResult): void {
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
function createStatsSection(parent: Panel, result: BattleResult): Panel {
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
function createStatLine(parent: Panel, label: string, value: string, index: number): void {
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
function updateButtonsSection(buttonsSection: Panel, result: BattleResult): void {
    // 清空所有按钮
    buttonsSection.RemoveAndDeleteChildren();
    
    if (result.winner === 'player') {
        // 胜利时显示两个按钮，水平排列，居中对齐
        buttonsSection.style.flowChildren = 'right';
        buttonsSection.style.horizontalAlign = 'center';
        buttonsSection.style.verticalAlign = 'center';
        buttonsSection.style.width = '100%';
        
        // 选择关卡按钮
        const selectBtn = createStyledButton(
            buttonsSection, 
            'SelectLevelButton', 
            '选择关卡',
            () => {
                $.Msg('Opening level selection...');
                Game.EmitSound('ui.button_click');
                hideView();
                GameEvents.SendCustomGameEventToServer('open_level_selection', {});
            }
        );
        selectBtn.style.marginRight = '40px';  // 按钮之间的间距
        
        // 退出游戏按钮
        createStyledButton(
            buttonsSection, 
            'QuitGameButton', 
            '退出游戏',
            () => {
                Game.EmitSound('ui.button_click');
                GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
            }
        );
        
    } else {
        // 失败时只显示退出按钮（居中）
        buttonsSection.style.flowChildren = 'none';
        
        const quitBtn = createStyledButton(
            buttonsSection, 
            'QuitGameButton', 
            '退出游戏',
            () => {
                Game.EmitSound('ui.button_click');
                GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
            }
        );
        quitBtn.style.horizontalAlign = 'center';
    }
}

// 创建按钮区域（保留用于兼容）
function createButtonsSection(parent: Panel, result: BattleResult): Panel {
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
        const selectBtn = createStyledButton(
            buttonsSection, 
            'SelectLevelButton', 
            '选择关卡',
            () => {
                $.Msg('[BattleEndView] Opening level selection...');
                Game.EmitSound('ui.button_click');
                hideView();
                GameEvents.SendCustomGameEventToServer('open_level_selection', {});
            }
        );
        selectBtn.style.marginRight = '40px';  // 按钮之间的间距
        
        // 退出游戏按钮
        createStyledButton(
            buttonsSection, 
            'QuitGameButton', 
            '退出游戏',
            () => {
                $.Msg('[BattleEndView] Quitting game...');
                Game.EmitSound('ui.button_click');
                GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
            }
        );
        
    } else {
        // 失败时只显示退出按钮（居中）
        buttonsSection.style.flowChildren = 'right';
        buttonsSection.style.horizontalAlign = 'center';
        
        createStyledButton(
            buttonsSection, 
            'QuitGameButton', 
            '退出游戏',
            () => {
                $.Msg('[BattleEndView] Quitting game after defeat...');
                Game.EmitSound('ui.button_click');
                GameEvents.SendCustomGameEventToServer('quit_to_menu', {});
            }
        );
    }
    
    return buttonsSection;
}

// 创建样式化按钮（参考 playing-hud 风格）
function createStyledButton(parent: Panel, id: string, text: string, onClick: () => void): Panel {
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
    (label.style as any).align = 'center center';
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
function formatNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// 显示结算界面（完全动态创建，像 playing-hud 一样）
function showView(result: BattleResult): void {
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
    } else {
        container.style.width = '100%';
        container.style.height = '100%';
    }
    
    container.style.horizontalAlign = 'center';
    container.style.verticalAlign = 'center';
    container.style.zIndex = '10000';  // 比 playing-hud (1000) 高
    container.hittest = false;
    container.style.visibility = 'visible';  // 显式设置为可见
    
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
    } catch (e) {
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
    } else if (result.winner === 'enemy') {
        Game.EmitSound('ui.defeat');
    }
}

// 隐藏结算界面
function hideView(): void {
    const container = getBattleEndContainer();
    if (container) {
        container.style.visibility = 'collapse';
        $.Msg('🔒 Battle end view hidden');
    } else {
        $.Msg('⚠️ BattleEndContainer not found when trying to hide');
    }
}

// 处理战斗结束事件
function handleBattleEnded(data: any): void {
    $.Msg('[BattleEndView] Battle ended event received:', data);
    
    const result = data.result || {};
    
    // 转换数据格式
    const battleResult: BattleResult = {
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
function handleWaveSettlement(data: any): void {
    $.Msg('[BattleEndView] Wave settlement event received:', data);
    
    // 从 AutoChessMode 获取胜负信息
    // 注意：stats 应该来自 data.stats，而不是 data.playerSummary
    const battleResult: BattleResult = {
        winner: data.winner || 'player',  // 默认玩家胜利
        round: data.round || 1,
        duration: data.duration || 0,
        stats: data.stats || {},  // 使用 data.stats 而不是 data.playerSummary
        levelName: data.levelName || undefined
    };
    
    $.Msg('[BattleEndView] Processed battle result:', battleResult);
    showView(battleResult);
}

// 初始化事件订阅
function initializeEventListeners(): void {
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
function initializeBattleEndView(): void {
    $.Msg('🚀 Initializing Battle End View...');
    
    // 立即创建容器，不等待
    createBattleEndContainer();
    
    // 初始化事件监听
    initializeEventListeners();
    
    $.Msg('✅ Battle End View initialized successfully');
}

// 测试用的 showDummy 函数
function showDummy(): void {
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
(globalThis as any).BattleEndView = {
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
