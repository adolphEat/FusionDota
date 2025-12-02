// 创建结束界面UI
function createEndScreenUI(): void {
    $.Msg('Creating end screen UI...');
    
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        return;
    }
    
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('EndScreenContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }

    const container = $.CreatePanel('Panel', rootPanel, 'EndScreenContainer');
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    container.style.zIndex = '1000';

    const contentPanel = $.CreatePanel('Panel', container, 'EndScreenContent');
    contentPanel.style.position = 'absolute';
    contentPanel.style.width = '800px';
    contentPanel.style.height = '600px';
    contentPanel.style.backgroundColor = 'rgba(20, 20, 40, 0.95)';
    contentPanel.style.border = '3px solid #4a90e2';
    contentPanel.style.borderRadius = '15px';
    contentPanel.style.horizontalAlign = 'center';
    contentPanel.style.verticalAlign = 'center';
    contentPanel.style.padding = '30px';
    contentPanel.style.boxShadow = '0 0 30px rgba(74, 144, 226, 0.5)';
    
    // 标题
    const title = $.CreatePanel('Label', contentPanel, 'EndScreenTitle');
    title.text = '🎮 游戏结束';
    title.style.color = '#4a90e2';
    title.style.fontSize = '36px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '30px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';
    
    // 结果信息
    const resultLabel = $.CreatePanel('Label', contentPanel, 'GameResult');
    resultLabel.text = '等待游戏结果...';
    resultLabel.style.color = '#ffffff';
    resultLabel.style.fontSize = '24px';
    resultLabel.style.textAlign = 'center';
    resultLabel.style.marginBottom = '20px';
    
    // 统计信息容器
    const statsContainer = $.CreatePanel('Panel', contentPanel, 'StatsContainer');
    statsContainer.style.width = '100%';
    statsContainer.style.height = '300px';
    statsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    statsContainer.style.borderRadius = '10px';
    statsContainer.style.padding = '20px';
    statsContainer.style.marginBottom = '30px';
    
    // 统计标题
    const statsTitle = $.CreatePanel('Label', statsContainer, 'StatsTitle');
    statsTitle.text = '游戏统计';
    statsTitle.style.color = '#ffd700';
    statsTitle.style.fontSize = '20px';
    statsTitle.style.fontWeight = 'bold';
    statsTitle.style.marginBottom = '15px';
    
    // 统计项目
    const statsItems = [
        { label: '游戏时长:', value: '00:00:00', id: 'GameTime' },
        { label: '击杀数:', value: '0', id: 'Kills' },
        { label: '死亡数:', value: '0', id: 'Deaths' },
        { label: '助攻数:', value: '0', id: 'Assists' },
        { label: '获得金币:', value: '0', id: 'GoldEarned' },
        { label: '造成伤害:', value: '0', id: 'DamageDealt' }
    ];
    
    statsItems.forEach((item, index) => {
        const itemPanel = $.CreatePanel('Panel', statsContainer, `StatsItem_${item.id}`);
        itemPanel.style.width = '100%';
        itemPanel.style.height = '30px';
        itemPanel.style.marginBottom = '8px';
        
        const label = $.CreatePanel('Label', itemPanel, `${item.id}_Label`);
        label.text = item.label;
        label.style.color = '#cccccc';
        label.style.fontSize = '16px';
        label.style.width = '150px';
        
        const value = $.CreatePanel('Label', itemPanel, `${item.id}_Value`);
        value.text = item.value;
        value.style.color = '#ffffff';
        value.style.fontSize = '16px';
        value.style.fontWeight = 'bold';
        value.style.horizontalAlign = 'right';
        value.style.width = '200px';
    });
    
    // 按钮容器
    const buttonContainer = $.CreatePanel('Panel', contentPanel, 'EndScreenButtons');
    buttonContainer.style.width = '100%';
    buttonContainer.style.height = '60px';
    buttonContainer.style.horizontalAlign = 'center';
    
    // 重新开始按钮
    const restartButton = $.CreatePanel('Button', buttonContainer, 'RestartButton');
    restartButton.text = '🔄 重新开始';
    restartButton.style.width = '180px';
    restartButton.style.height = '50px';
    restartButton.style.backgroundColor = '#28a745';
    restartButton.style.color = 'white';
    restartButton.style.fontSize = '18px';
    restartButton.style.fontWeight = 'bold';
    restartButton.style.border = '2px solid #1e7e34';
    restartButton.style.borderRadius = '8px';
    restartButton.style.margin = '5px';
    
    restartButton.SetPanelEvent('onactivate', () => {
        GameEvents.SendCustomGameEventToServer('restart_game', {});
    });
    
    // 返回主菜单按钮
    const menuButton = $.CreatePanel('Button', buttonContainer, 'MenuButton');
    menuButton.text = '返回主菜单';
    menuButton.style.width = '180px';
    menuButton.style.height = '50px';
    menuButton.style.backgroundColor = '#6c757d';
    menuButton.style.color = 'white';
    menuButton.style.fontSize = '18px';
    menuButton.style.fontWeight = 'bold';
    menuButton.style.border = '2px solid #545b62';
    menuButton.style.borderRadius = '8px';
    menuButton.style.margin = '5px';
    
    menuButton.SetPanelEvent('onactivate', () => {
        GameEvents.SendCustomGameEventToServer('return_to_menu', {});
    });
    
    $.Msg('End screen UI created successfully!');
}

// 更新游戏统计
function updateGameStats(stats: any): void {
    $.Msg('Updating game stats:', stats);
    
    const updateStat = (id: string, value: string) => {
        const statValue = $.GetContextPanel().FindChildInLayoutFile(`StatsItem_${id}`)?.FindChildInLayoutFile(`${id}_Value`);
        if (statValue) {
            statValue.text = value;
        }
    };
    
    if (stats.gameTime) updateStat('GameTime', stats.gameTime);
    if (stats.kills) updateStat('Kills', stats.kills.toString());
    if (stats.deaths) updateStat('Deaths', stats.deaths.toString());
    if (stats.assists) updateStat('Assists', stats.assists.toString());
    if (stats.goldEarned) updateStat('GoldEarned', stats.goldEarned.toString());
    if (stats.damageDealt) updateStat('DamageDealt', stats.damageDealt.toString());
}

// 更新游戏结果
function updateGameResult(result: string): void {
    const resultLabel = $.GetContextPanel().FindChildInLayoutFile('GameResult');
    if (resultLabel) {
        const resultTexts: Record<string, string> = {
            'victory': '🏆 胜利！',
            'defeat': '💀 失败',
            'draw': '🤝 平局'
        };
        resultLabel.text = resultTexts[result] || result;
        resultLabel.style.color = result === 'victory' ? '#28a745' : result === 'defeat' ? '#dc3545' : '#ffc107';
    }
}

// 监听游戏事件
GameEvents.Subscribe('game_ended', (data: any) => {
    $.Msg('Game ended event received:', data);
    updateGameResult(data.result);
    updateGameStats(data.stats);
});

// 监听统计更新
GameEvents.Subscribe('stats_updated', (data: any) => {
    $.Msg('Stats updated event received:', data);
    updateGameStats(data);
});

// 初始化
function initializeEndScreen(): void {
    $.Schedule(0.5, createEndScreenUI);
    
    // 设置快捷键
    $.RegisterKeyBind($.GetContextPanel(), 'key_f9', () => {
        $.Msg('=== F9: Recreating End Screen UI ===');
        createEndScreenUI();
    });
}

// 导出全局函数
(globalThis as any).EndScreenTest = {
    createUI: createEndScreenUI,
    updateStats: updateGameStats,
    updateResult: updateGameResult
};

// 立即执行初始化
initializeEndScreen();

// 导出React组件（保持兼容性）
const EndScreenPanel = () => {
    return null; // 使用原生Panorama
};

export default EndScreenPanel;