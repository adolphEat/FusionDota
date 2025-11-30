// @ts-nocheck
// 结算界面 - 参考 Dota2CustomGame 设计风格

$.Msg('=== Result Screen Loading ===');

// 主题配置（参考 Dota2CustomGame 风格）
const RESULT_THEME = {
    background: 'rgba(0, 0, 0, 0.9)',
    panelBg: 'rgba(33, 34, 31, 0.98)',
    borderColor: 'rgba(255, 197, 122, 0.5)',
    textPrimary: '#ffc57a',
    textSecondary: '#ffffff',
    success: '#4caf50',
    victory: '#ffd700',
    defeat: '#f44336',
    accent: '#9c27b0',
};

// 创建结算界面
function createResultScreen(): void {
    $.Msg('🔥 CREATING RESULT SCREEN - NEW VERSION 22:44 🔥');
    
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('ResultScreenContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'ResultScreenContainer');
    container.style.width = '100%';
    container.style.height = '100%';
    // 移除hittest设置，避免Panorama API问题
    container.style.backgroundColor = RESULT_THEME.background;
    container.style.zIndex = '10000';
    container.style.visible = 'false';
    container.AddClass('result_screen_root');
    
    // 创建背景遮罩
    createBackgroundMask(container);
    
    // 创建主面板
    const mainPanel = $.CreatePanel('Panel', container, 'ResultMainPanel');
    mainPanel.style.width = '900px';
    mainPanel.style.height = '700px';
    mainPanel.style.horizontalAlign = 'center';
    mainPanel.style.verticalAlign = 'center';
    mainPanel.style.backgroundColor = RESULT_THEME.panelBg;
    mainPanel.style.border = `3px solid ${RESULT_THEME.borderColor}`;
    mainPanel.style.borderRadius = '20px';
    mainPanel.style.boxShadow = '0px 0px 40px rgba(255, 197, 122, 0.4)';
    mainPanel.style.padding = '40px';
    mainPanel.style.flowChildren = 'down';
    
    // 创建结果标题
    createResultTitle(mainPanel);
    
    // 创建统计信息区域
    createStatsSection(mainPanel);
    
    // 创建奖励区域
    createRewardSection(mainPanel);
    
    // 创建按钮区域
    createButtonSection(mainPanel);
    
    $.Msg('Result screen created successfully!');
}

// 创建背景遮罩
function createBackgroundMask(parent: Panel): void {
    const mask = $.CreatePanel('Panel', parent, 'ResultBackgroundMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'gradient(linear, 0% 0%, 0% 100%, from(#00000000), color-stop(0.5, #000000aa), to(#000000))';
    mask.style.zIndex = '-1';
}

// 创建结果标题
function createResultTitle(parent: Panel): void {
    const titleSection = $.CreatePanel('Panel', parent, 'ResultTitleSection');
    titleSection.style.width = '100%';
    titleSection.style.height = '120px';
    titleSection.style.marginBottom = '30px';
    titleSection.style.flowChildren = 'down';
    
    const titleIcon = $.CreatePanel('Label', titleSection, 'ResultTitleIcon');
    titleIcon.text = '🏆';
    titleIcon.style.fontSize = '60px';
    titleIcon.style.textAlign = 'center';
    titleIcon.style.horizontalAlign = 'center';
    titleIcon.style.marginBottom = '10px';
    
    const titleText = $.CreatePanel('Label', titleSection, 'ResultTitleText');
    titleText.text = '胜利！';
    titleText.style.fontSize = '48px';
    titleText.style.fontWeight = 'bold';
    titleText.style.color = RESULT_THEME.victory;
    titleText.style.textAlign = 'center';
    titleText.style.horizontalAlign = 'center';
    titleText.style.textShadow = '0px 0px 20px rgba(255, 215, 0, 0.8)';
    
    const subtitle = $.CreatePanel('Label', titleSection, 'ResultSubtitle');
    subtitle.text = '恭喜你完成了本局游戏！';
    subtitle.style.fontSize = '20px';
    subtitle.style.color = RESULT_THEME.textSecondary;
    subtitle.style.textAlign = 'center';
    subtitle.style.horizontalAlign = 'center';
    subtitle.style.opacity = '0.8';
}

// 创建统计信息区域
function createStatsSection(parent: Panel): void {
    const statsSection = $.CreatePanel('Panel', parent, 'StatsSection');
    statsSection.style.width = '100%';
    statsSection.style.height = '300px';
    statsSection.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    statsSection.style.borderRadius = '15px';
    statsSection.style.padding = '20px';
    statsSection.style.marginBottom = '30px';
    statsSection.style.flowChildren = 'down';
    
    const sectionTitle = $.CreatePanel('Label', statsSection, 'StatsSectionTitle');
    sectionTitle.text = '📊 本局统计';
    sectionTitle.style.fontSize = '24px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = RESULT_THEME.textPrimary;
    sectionTitle.style.marginBottom = '20px';
    
    // 创建统计项容器
    const statsContainer = $.CreatePanel('Panel', statsSection, 'StatsContainer');
    statsContainer.style.width = '100%';
    statsContainer.style.height = 'fill-parent-flow(1)';
    statsContainer.style.flowChildren = 'right';
    
    // 左列统计
    const leftStats = $.CreatePanel('Panel', statsContainer, 'LeftStats');
    leftStats.style.width = '50%';
    leftStats.style.height = '100%';
    leftStats.style.flowChildren = 'down';
    leftStats.style.padding = '10px';
    
    // 右列统计
    const rightStats = $.CreatePanel('Panel', statsContainer, 'RightStats');
    rightStats.style.width = '50%';
    rightStats.style.height = '100%';
    rightStats.style.flowChildren = 'down';
    rightStats.style.padding = '10px';
    
    // 统计项
    const statItems = [
        { id: 'kills', label: '⚔️ 击杀数', icon: '⚔️', side: 'left' },
        { id: 'deaths', label: '💀 死亡数', icon: '💀', side: 'left' },
        { id: 'assists', label: '🤝 助攻数', icon: '🤝', side: 'left' },
        { id: 'damage_dealt', label: '💥 造成伤害', icon: '💥', side: 'right' },
        { id: 'damage_taken', label: '🛡️ 受到伤害', icon: '🛡️', side: 'right' },
        { id: 'healing', label: '💚 治疗量', icon: '💚', side: 'right' },
        { id: 'gold_earned', label: '💰 获得金币', icon: '💰', side: 'left' },
        { id: 'exp_gained', label: '⭐ 获得经验', icon: '⭐', side: 'left' },
        { id: 'game_time', label: '⏰ 游戏时长', icon: '⏰', side: 'right' },
        { id: 'level_reached', label: '📈 达到等级', icon: '📈', side: 'right' },
    ];
    
    statItems.forEach((item) => {
        const parentPanel = item.side === 'left' ? leftStats : rightStats;
        createStatItem(parentPanel, item.id, item.label, item.icon);
    });
}

// 创建统计项
function createStatItem(parent: Panel, id: string, label: string, icon: string): void {
    const statItem = $.CreatePanel('Panel', parent, `StatItem_${id}`);
    statItem.style.width = '100%';
    statItem.style.height = '35px';
    statItem.style.marginBottom = '10px';
    statItem.style.flowChildren = 'right';
    statItem.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    statItem.style.borderRadius = '8px';
    statItem.style.padding = '8px';
    
    const iconLabel = $.CreatePanel('Label', statItem, `${id}_Icon`);
    iconLabel.text = icon;
    iconLabel.style.fontSize = '18px';
    iconLabel.style.width = '30px';
    iconLabel.style.verticalAlign = 'center';
    
    const labelText = $.CreatePanel('Label', statItem, `${id}_Label`);
    labelText.text = label;
    labelText.style.fontSize = '14px';
    labelText.style.color = RESULT_THEME.textSecondary;
    labelText.style.width = '150px';
    labelText.style.verticalAlign = 'center';
    
    const valueText = $.CreatePanel('Label', statItem, `${id}_Value`);
    valueText.text = '0';
    valueText.style.fontSize = '16px';
    valueText.style.fontWeight = 'bold';
    valueText.style.color = RESULT_THEME.textPrimary;
    valueText.style.horizontalAlign = 'right';
    valueText.style.width = 'fill-parent-flow(1)';
    valueText.style.verticalAlign = 'center';
}

// 创建奖励区域
function createRewardSection(parent: Panel): void {
    const rewardSection = $.CreatePanel('Panel', parent, 'RewardSection');
    rewardSection.style.width = '100%';
    rewardSection.style.height = '120px';
    rewardSection.style.backgroundColor = 'rgba(156, 39, 176, 0.2)';
    rewardSection.style.borderRadius = '15px';
    rewardSection.style.padding = '20px';
    rewardSection.style.marginBottom = '30px';
    rewardSection.style.flowChildren = 'down';
    
    const sectionTitle = $.CreatePanel('Label', rewardSection, 'RewardSectionTitle');
    sectionTitle.text = '🎁 本局奖励';
    sectionTitle.style.fontSize = '20px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = RESULT_THEME.textAccent;
    sectionTitle.style.marginBottom = '15px';
    
    const rewardContainer = $.CreatePanel('Panel', rewardSection, 'RewardContainer');
    rewardContainer.style.width = '100%';
    rewardContainer.style.height = 'fill-parent-flow(1)';
    rewardContainer.style.flowChildren = 'right';
    
    const rewards = [
        { id: 'gold_reward', label: '💰 金币', value: '0', color: RESULT_THEME.victory },
        { id: 'exp_reward', label: '⭐ 经验', value: '0', color: RESULT_THEME.textPrimary },
        { id: 'items_reward', label: '📦 物品', value: '0', color: RESULT_THEME.accent },
    ];
    
    rewards.forEach((reward, index) => {
        const rewardItem = $.CreatePanel('Panel', rewardContainer, `RewardItem_${reward.id}`);
        rewardItem.style.width = '33.33%';
        rewardItem.style.height = '100%';
        rewardItem.style.flowChildren = 'down';
        rewardItem.style.horizontalAlign = 'center';
        
        const rewardIcon = $.CreatePanel('Label', rewardItem, `${reward.id}_Icon`);
        rewardIcon.text = reward.label.split(' ')[0];
        rewardIcon.style.fontSize = '32px';
        rewardIcon.style.horizontalAlign = 'center';
        rewardIcon.style.marginBottom = '5px';
        
        const rewardLabel = $.CreatePanel('Label', rewardItem, `${reward.id}_Label`);
        rewardLabel.text = reward.label.split(' ')[1];
        rewardLabel.style.fontSize = '14px';
        rewardLabel.style.color = RESULT_THEME.textSecondary;
        rewardLabel.style.horizontalAlign = 'center';
        rewardLabel.style.marginBottom = '5px';
        
        const rewardValue = $.CreatePanel('Label', rewardItem, `${reward.id}_Value`);
        rewardValue.text = reward.value;
        rewardValue.style.fontSize = '20px';
        rewardValue.style.fontWeight = 'bold';
        rewardValue.style.color = reward.color;
        rewardValue.style.horizontalAlign = 'center';
    });
}

// 创建按钮区域
function createButtonSection(parent: Panel): void {
    const buttonSection = $.CreatePanel('Panel', parent, 'ButtonSection');
    buttonSection.style.width = '100%';
    buttonSection.style.height = '60px';
    buttonSection.style.flowChildren = 'right';
    buttonSection.style.horizontalAlign = 'center';
    
    // 返回大厅按钮
    const lobbyButton = $.CreatePanel('Button', buttonSection, 'LobbyButton');
    lobbyButton.text = '🏠 返回大厅';
    lobbyButton.style.width = '200px';
    lobbyButton.style.height = '50px';
    lobbyButton.style.backgroundColor = RESULT_THEME.textPrimary;
    lobbyButton.style.color = '#ffffff';
    lobbyButton.style.fontSize = '16px';
    lobbyButton.style.fontWeight = 'bold';
    lobbyButton.style.borderRadius = '10px';
    lobbyButton.style.marginRight = '20px';
    lobbyButton.style.boxShadow = '0px 2px 10px rgba(255, 197, 122, 0.4)';
    
    lobbyButton.SetPanelEvent('onactivate', () => {
        $.Msg('返回大厅');
        GameEvents.SendCustomGameEventToServer('return_to_lobby', {});
    });
    
    // 再来一局按钮
    const replayButton = $.CreatePanel('Button', buttonSection, 'ReplayButton');
    replayButton.text = '🔄 再来一局';
    replayButton.style.width = '200px';
    replayButton.style.height = '50px';
    replayButton.style.backgroundColor = RESULT_THEME.success;
    replayButton.style.color = '#ffffff';
    replayButton.style.fontSize = '16px';
    replayButton.style.fontWeight = 'bold';
    replayButton.style.borderRadius = '10px';
    replayButton.style.boxShadow = '0px 2px 10px rgba(76, 175, 80, 0.4)';
    
    replayButton.SetPanelEvent('onactivate', () => {
        $.Msg('再来一局');
        GameEvents.SendCustomGameEventToServer('play_again', {});
    });
}

// 更新结果（胜利/失败）
function updateResult(isVictory: boolean, stats: any): void {
    const container = $.GetContextPanel().FindChildInLayoutFile('ResultScreenContainer');
    if (!container) return;
    
    const titleIcon = container.FindChildInLayoutFile('ResultTitleIcon');
    const titleText = container.FindChildInLayoutFile('ResultTitleText');
    
    if (titleIcon && titleText) {
        if (isVictory) {
            titleIcon.text = '🏆';
            titleText.text = '胜利！';
            titleText.style.color = RESULT_THEME.victory;
            titleText.style.textShadow = '0px 0px 20px rgba(255, 215, 0, 0.8)';
        } else {
            titleIcon.text = '💀';
            titleText.text = '失败';
            titleText.style.color = RESULT_THEME.defeat;
            titleText.style.textShadow = '0px 0px 20px rgba(244, 67, 54, 0.8)';
        }
    }
    
    // 更新统计数据
    if (stats) {
        Object.keys(stats).forEach((key) => {
            const valueLabel = container.FindChildInLayoutFile(`StatItem_${key}`)?.FindChildInLayoutFile(`${key}_Value`);
            if (valueLabel && stats[key] !== undefined) {
                valueLabel.text = formatStatValue(key, stats[key]);
            }
        });
    }
    
    // 更新奖励
    updateRewards(stats);
}

// 格式化统计值
function formatStatValue(key: string, value: any): string {
    if (typeof value === 'number') {
        if (key.includes('damage') || key.includes('healing')) {
            return value.toLocaleString();
        } else if (key.includes('time')) {
            return formatTime(value);
        }
        return value.toString();
    }
    return String(value);
}

// 格式化时间
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 更新奖励
function updateRewards(stats: any): void {
    const container = $.GetContextPanel().FindChildInLayoutFile('ResultScreenContainer');
    if (!container || !stats) return;
    
    if (stats.gold_reward !== undefined) {
        const goldValue = container.FindChildInLayoutFile('RewardItem_gold_reward')?.FindChildInLayoutFile('gold_reward_Value');
        if (goldValue) goldValue.text = stats.gold_reward.toString();
    }
    
    if (stats.exp_reward !== undefined) {
        const expValue = container.FindChildInLayoutFile('RewardItem_exp_reward')?.FindChildInLayoutFile('exp_reward_Value');
        if (expValue) expValue.text = stats.exp_reward.toString();
    }
    
    if (stats.items_reward !== undefined) {
        const itemsValue = container.FindChildInLayoutFile('RewardItem_items_reward')?.FindChildInLayoutFile('items_reward_Value');
        if (itemsValue) itemsValue.text = stats.items_reward.toString();
    }
}

// 显示/隐藏结算界面
function showResultScreen(show: boolean): void {
    const container = $.GetContextPanel().FindChildInLayoutFile('ResultScreenContainer');
    if (container) {
        container.style.visible = show ? 'true' : 'false';
        
        if (show) {
            // 添加动画效果
            container.style.preTransformScale2d = '0.8';
            container.style.opacity = '0';
            $.Schedule(0.1, () => {
                container.style.preTransformScale2d = '1.0';
                container.style.opacity = '1';
                container.style.transition = 'all 0.3s ease';
            });
        }
    }
}

// 监听游戏事件
GameEvents.Subscribe('game_end', (data: any) => {
    $.Msg('Game ended:', data);
    updateResult(data.isVictory, data.stats);
    showResultScreen(true);
});

// 监听 NetTable 变化
function setupNetTableListener(): void {
    const netTable = CustomNetTables.GetTableValue('game_state', 'result');
    if (netTable) {
        updateResultState(netTable);
    }
    
    CustomNetTables.SubscribeNetTableListener('game_state', (tableName, key, value) => {
        if (key === 'result') {
            updateResultState(value);
        }
    });
}

function updateResultState(state: any): void {
    if (!state) return;
    
    if (state.isVisible !== undefined) {
        showResultScreen(state.isVisible);
    }
    
    if (state.isVictory !== undefined && state.stats) {
        updateResult(state.isVictory, state.stats);
    }
}

// 初始化
function initializeResultScreen(): void {
    $.Msg('=== Initializing Result Screen ===');
    $.Schedule(0.5, createResultScreen);
    $.Schedule(1.0, setupNetTableListener);
}

// 导出全局函数
(globalThis as any).ResultScreen = {
    create: createResultScreen,
    show: showResultScreen,
    update: updateResult,
    updateRewards: updateRewards
};

// 立即执行初始化
initializeResultScreen();

$.Msg('=== Result Screen module loaded completely ===');


