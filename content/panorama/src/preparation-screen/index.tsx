// @ts-nocheck
// 游戏准备界面 - 参考 Dota2CustomGame 设计风格

$.Msg('=== Preparation Screen Loading ===');

// 主题配置（参考 Dota2CustomGame 风格）
const PREPARATION_THEME = {
    background: 'rgba(0, 0, 0, 0.85)',
    panelBg: 'rgba(33, 34, 31, 0.95)',
    borderColor: 'rgba(139, 195, 74, 0.4)',
    textPrimary: '#8bc34a',
    textSecondary: '#ffffff',
    textAccent: '#ffc57a',
    success: '#4caf50',
    warning: '#ff9800',
    danger: '#f44336',
};

// 创建准备界面
function createPreparationScreen(): void {
    $.Msg('Creating preparation screen...');
    
    const rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Error: Root panel not found');
        return;
    }
    
    // 删除已存在的容器
    const existingContainer = rootPanel.FindChildInLayoutFile('PreparationScreenContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    
    // 创建主容器
    const container = $.CreatePanel('Panel', rootPanel, 'PreparationScreenContainer');
    container.style.width = '100%';
    container.style.height = '100%';
    // 移除hittest设置，避免Panorama API问题
    container.style.backgroundColor = PREPARATION_THEME.background;
    container.style.zIndex = '5000';
    container.AddClass('preparation_screen_root');
    
    // 创建背景遮罩
    createBackgroundMask(container);
    
    // 创建主面板
    const mainPanel = $.CreatePanel('Panel', container, 'PreparationMainPanel');
    mainPanel.style.width = '800px';
    mainPanel.style.height = '600px';
    mainPanel.style.horizontalAlign = 'center';
    mainPanel.style.verticalAlign = 'center';
    mainPanel.style.backgroundColor = PREPARATION_THEME.panelBg;
    mainPanel.style.border = `2px solid ${PREPARATION_THEME.borderColor}`;
    mainPanel.style.borderRadius = '15px';
    mainPanel.style.boxShadow = '0px 0px 20px rgba(139, 195, 74, 0.3)';
    mainPanel.style.padding = '30px';
    
    // 创建标题
    createTitle(mainPanel);
    
    // 创建玩家信息区域
    createPlayerInfoSection(mainPanel);
    
    // 创建游戏配置区域
    createGameConfigSection(mainPanel);
    
    // 创建准备按钮区域
    createReadyButtonSection(mainPanel);
    
    // 创建倒计时显示
    createCountdownDisplay(container);
    
    $.Msg('Preparation screen created successfully!');
}

// 创建背景遮罩
function createBackgroundMask(parent: Panel): void {
    const mask = $.CreatePanel('Panel', parent, 'PreparationBackgroundMask');
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = 'gradient(linear, 0% 0%, 0% 100%, from(#00000000), color-stop(0.8, #00000000), color-stop(0.9, #00000091), to(#000000))';
    mask.style.zIndex = '-1';
}

// 创建标题
function createTitle(parent: Panel): void {
    const titlePanel = $.CreatePanel('Panel', parent, 'PreparationTitlePanel');
    titlePanel.style.width = '100%';
    titlePanel.style.height = '80px';
    titlePanel.style.marginBottom = '20px';
    
    const title = $.CreatePanel('Label', titlePanel, 'PreparationTitle');
    title.text = '⚔️ 游戏准备';
    title.style.fontSize = '36px';
    title.style.fontWeight = 'bold';
    title.style.color = PREPARATION_THEME.textPrimary;
    title.style.textAlign = 'center';
    title.style.textShadow = '0px 0px 10px rgba(139, 195, 74, 0.8)';
    title.style.horizontalAlign = 'center';
    title.style.verticalAlign = 'center';
    
    const subtitle = $.CreatePanel('Label', titlePanel, 'PreparationSubtitle');
    subtitle.text = '请等待所有玩家准备就绪...';
    subtitle.style.fontSize = '18px';
    subtitle.style.color = PREPARATION_THEME.textSecondary;
    subtitle.style.textAlign = 'center';
    subtitle.style.horizontalAlign = 'center';
    subtitle.style.verticalAlign = 'bottom';
    subtitle.style.marginTop = '45px';
    subtitle.style.opacity = '0.8';
}

// 创建玩家信息区域
function createPlayerInfoSection(parent: Panel): void {
    const playerSection = $.CreatePanel('Panel', parent, 'PlayerInfoSection');
    playerSection.style.width = '100%';
    playerSection.style.height = '250px';
    playerSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    playerSection.style.borderRadius = '10px';
    playerSection.style.padding = '15px';
    playerSection.style.marginBottom = '20px';
    
    const sectionTitle = $.CreatePanel('Label', playerSection, 'PlayerSectionTitle');
    sectionTitle.text = '👥 玩家列表';
    sectionTitle.style.fontSize = '20px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = PREPARATION_THEME.textAccent;
    sectionTitle.style.marginBottom = '15px';
    
    // 创建玩家列表容器
    const playerList = $.CreatePanel('Panel', playerSection, 'PlayerListContainer');
    playerList.style.width = '100%';
    playerList.style.height = '180px';
    playerList.style.flowChildren = 'down';
    playerList.style.overflow = 'squish scroll';
    
    // 示例玩家项（实际应该从服务器获取）
    for (let i = 0; i < 4; i++) {
        createPlayerItem(playerList, i, `玩家 ${i + 1}`, i === 0); // 第一个玩家为本地玩家
    }
}

// 创建玩家项
function createPlayerItem(parent: Panel, index: number, playerName: string, isLocal: boolean): void {
    const playerItem = $.CreatePanel('Panel', parent, `PlayerItem_${index}`);
    playerItem.style.width = '100%';
    playerItem.style.height = '40px';
    playerItem.style.backgroundColor = isLocal ? 'rgba(139, 195, 74, 0.2)' : 'rgba(255, 255, 255, 0.05)';
    playerItem.style.borderRadius = '5px';
    playerItem.style.padding = '8px';
    playerItem.style.marginBottom = '5px';
    playerItem.style.flowChildren = 'right';
    
    // 玩家头像占位
    const avatar = $.CreatePanel('Panel', playerItem, 'PlayerAvatar');
    avatar.style.width = '24px';
    avatar.style.height = '24px';
    avatar.style.backgroundColor = PREPARATION_THEME.borderColor;
    avatar.style.borderRadius = '12px';
    avatar.style.marginRight = '10px';
    
    // 玩家名称
    const nameLabel = $.CreatePanel('Label', playerItem, 'PlayerName');
    nameLabel.text = isLocal ? `★ ${playerName} (你)` : playerName;
    nameLabel.style.fontSize = '16px';
    nameLabel.style.color = isLocal ? PREPARATION_THEME.textPrimary : PREPARATION_THEME.textSecondary;
    nameLabel.style.fontWeight = isLocal ? 'bold' : 'normal';
    nameLabel.style.width = '200px';
    
    // 准备状态
    const readyStatus = $.CreatePanel('Label', playerItem, 'ReadyStatus');
    readyStatus.text = '⏳ 等待中...';
    readyStatus.style.fontSize = '14px';
    readyStatus.style.color = PREPARATION_THEME.warning;
    readyStatus.style.horizontalAlign = 'right';
    readyStatus.style.width = 'fill-parent-flow(1)';
    readyStatus.SetAttributeString('data-ready', 'false');
}

// 创建游戏配置区域
function createGameConfigSection(parent: Panel): void {
    const configSection = $.CreatePanel('Panel', parent, 'GameConfigSection');
    configSection.style.width = '100%';
    configSection.style.height = '120px';
    configSection.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    configSection.style.borderRadius = '10px';
    configSection.style.padding = '15px';
    configSection.style.marginBottom = '20px';
    configSection.style.flowChildren = 'down';
    
    const sectionTitle = $.CreatePanel('Label', configSection, 'ConfigSectionTitle');
    sectionTitle.text = '⚙️ 游戏设置';
    sectionTitle.style.fontSize = '20px';
    sectionTitle.style.fontWeight = 'bold';
    sectionTitle.style.color = PREPARATION_THEME.textAccent;
    sectionTitle.style.marginBottom = '10px';
    
    // 游戏模式
    const modeRow = $.CreatePanel('Panel', configSection, 'GameModeRow');
    modeRow.style.width = '100%';
    modeRow.style.height = '30px';
    modeRow.style.flowChildren = 'right';
    
    const modeLabel = $.CreatePanel('Label', modeRow, 'GameModeLabel');
    modeLabel.text = '游戏模式:';
    modeLabel.style.fontSize = '14px';
    modeLabel.style.color = PREPARATION_THEME.textSecondary;
    modeLabel.style.width = '100px';
    
    const modeValue = $.CreatePanel('Label', modeRow, 'GameModeValue');
    modeValue.text = '标准对战';
    modeValue.style.fontSize = '14px';
    modeValue.style.color = PREPARATION_THEME.textPrimary;
    modeValue.style.fontWeight = 'bold';
    
    // 地图信息
    const mapRow = $.CreatePanel('Panel', configSection, 'GameMapRow');
    mapRow.style.width = '100%';
    mapRow.style.height = '30px';
    mapRow.style.flowChildren = 'right';
    mapRow.style.marginTop = '5px';
    
    const mapLabel = $.CreatePanel('Label', mapRow, 'GameMapLabel');
    mapLabel.text = '地图:';
    mapLabel.style.fontSize = '14px';
    mapLabel.style.color = PREPARATION_THEME.textSecondary;
    mapLabel.style.width = '100px';
    
    const mapValue = $.CreatePanel('Label', mapRow, 'GameMapValue');
    mapValue.text = 'Battle Map';
    mapValue.style.fontSize = '14px';
    mapValue.style.color = PREPARATION_THEME.textPrimary;
    mapValue.style.fontWeight = 'bold';
}

// 创建准备按钮区域
function createReadyButtonSection(parent: Panel): void {
    const buttonSection = $.CreatePanel('Panel', parent, 'ReadyButtonSection');
    buttonSection.style.width = '100%';
    buttonSection.style.height = '60px';
    buttonSection.style.flowChildren = 'right';
    buttonSection.style.horizontalAlign = 'center';
    
    // 取消准备按钮
    const cancelButton = $.CreatePanel('Button', buttonSection, 'CancelReadyButton');
    cancelButton.text = '❌ 取消准备';
    cancelButton.style.width = '180px';
    cancelButton.style.height = '50px';
    cancelButton.style.backgroundColor = PREPARATION_THEME.danger;
    cancelButton.style.color = '#ffffff';
    cancelButton.style.fontSize = '16px';
    cancelButton.style.fontWeight = 'bold';
    cancelButton.style.borderRadius = '8px';
    cancelButton.style.marginRight = '20px';
    cancelButton.style.boxShadow = '0px 2px 8px rgba(244, 67, 54, 0.4)';
    cancelButton.style.visible = 'false'; // 默认隐藏
    
    cancelButton.SetPanelEvent('onactivate', () => {
        $.Msg('取消准备');
        GameEvents.SendCustomGameEventToServer('player_not_ready', {});
        updateReadyButton(false);
    });
    
    // 准备按钮
    const readyButton = $.CreatePanel('Button', buttonSection, 'ReadyButton');
    readyButton.text = '✅ 准备就绪';
    readyButton.style.width = '180px';
    readyButton.style.height = '50px';
    readyButton.style.backgroundColor = PREPARATION_THEME.success;
    readyButton.style.color = '#ffffff';
    readyButton.style.fontSize = '16px';
    readyButton.style.fontWeight = 'bold';
    readyButton.style.borderRadius = '8px';
    readyButton.style.boxShadow = '0px 2px 8px rgba(76, 175, 80, 0.4)';
    
    readyButton.SetPanelEvent('onactivate', () => {
        $.Msg('准备就绪');
        GameEvents.SendCustomGameEventToServer('player_ready', {});
        updateReadyButton(true);
    });
}

// 更新准备按钮状态
function updateReadyButton(isReady: boolean): void {
    const readyButton = $.GetContextPanel().FindChildInLayoutFile('ReadyButton');
    const cancelButton = $.GetContextPanel().FindChildInLayoutFile('CancelReadyButton');
    
    if (readyButton) readyButton.style.visible = isReady ? 'false' : 'true';
    if (cancelButton) cancelButton.style.visible = isReady ? 'true' : 'false';
    
    // 更新本地玩家状态显示
    const localPlayerItem = $.GetContextPanel().FindChildInLayoutFile('PlayerItem_0');
    if (localPlayerItem) {
        const readyStatus = localPlayerItem.FindChildInLayoutFile('ReadyStatus');
        if (readyStatus) {
            readyStatus.text = isReady ? '✅ 已准备' : '⏳ 等待中...';
            readyStatus.style.color = isReady ? PREPARATION_THEME.success : PREPARATION_THEME.warning;
            readyStatus.SetAttributeString('data-ready', isReady ? 'true' : 'false');
        }
    }
}

// 创建倒计时显示
function createCountdownDisplay(parent: Panel): void {
    const countdownPanel = $.CreatePanel('Panel', parent, 'CountdownDisplay');
    countdownPanel.style.width = '300px';
    countdownPanel.style.height = '100px';
    countdownPanel.style.horizontalAlign = 'center';
    countdownPanel.style.verticalAlign = 'top';
    countdownPanel.style.marginTop = '50px';
    countdownPanel.style.visible = 'false';
    
    const countdownLabel = $.CreatePanel('Label', countdownPanel, 'CountdownLabel');
    countdownLabel.text = '游戏即将开始...';
    countdownLabel.style.fontSize = '24px';
    countdownLabel.style.fontWeight = 'bold';
    countdownLabel.style.color = PREPARATION_THEME.textAccent;
    countdownLabel.style.textAlign = 'center';
    countdownLabel.style.horizontalAlign = 'center';
    countdownLabel.style.textShadow = '0px 0px 10px rgba(255, 197, 122, 0.8)';
    countdownLabel.style.marginBottom = '10px';
    
    const countdownValue = $.CreatePanel('Label', countdownPanel, 'CountdownValue');
    countdownValue.text = '5';
    countdownValue.style.fontSize = '48px';
    countdownValue.style.fontWeight = 'bold';
    countdownValue.style.color = PREPARATION_THEME.textPrimary;
    countdownValue.style.textAlign = 'center';
    countdownValue.style.horizontalAlign = 'center';
    countdownValue.style.textShadow = '0px 0px 15px rgba(139, 195, 74, 1)';
}

// 更新倒计时
function updateCountdown(seconds: number): void {
    const countdownPanel = $.GetContextPanel().FindChildInLayoutFile('CountdownDisplay');
    if (!countdownPanel) return;
    
    const countdownValue = countdownPanel.FindChildInLayoutFile('CountdownValue');
    if (countdownValue && seconds > 0) {
        countdownPanel.style.visible = 'true';
        countdownValue.text = seconds.toString();
        
        // 动画效果
        countdownValue.style.preTransformScale2d = '1.5';
        $.Schedule(0.1, () => {
            countdownValue.style.preTransformScale2d = '1.0';
        });
    } else if (seconds <= 0) {
        countdownPanel.style.visible = 'false';
    }
}

// 更新玩家准备状态
function updatePlayerReady(playerId: number, isReady: boolean): void {
    const playerItem = $.GetContextPanel().FindChildInLayoutFile(`PlayerItem_${playerId}`);
    if (playerItem) {
        const readyStatus = playerItem.FindChildInLayoutFile('ReadyStatus');
        if (readyStatus) {
            readyStatus.text = isReady ? '✅ 已准备' : '⏳ 等待中...';
            readyStatus.style.color = isReady ? PREPARATION_THEME.success : PREPARATION_THEME.warning;
            readyStatus.SetAttributeString('data-ready', isReady ? 'true' : 'false');
        }
    }
}

// 显示/隐藏准备界面
function showPreparationScreen(show: boolean): void {
    const container = $.GetContextPanel().FindChildInLayoutFile('PreparationScreenContainer');
    if (container) {
        container.style.visible = show ? 'true' : 'false';
    }
}

// 监听游戏事件
GameEvents.Subscribe('preparation_start', () => {
    $.Msg('Preparation started');
    showPreparationScreen(true);
});

GameEvents.Subscribe('preparation_end', () => {
    $.Msg('Preparation ended');
    showPreparationScreen(false);
});

GameEvents.Subscribe('player_ready_changed', (data: any) => {
    $.Msg('Player ready changed:', data);
    updatePlayerReady(data.playerId, data.isReady);
});

GameEvents.Subscribe('countdown_update', (data: any) => {
    $.Msg('Countdown update:', data);
    updateCountdown(data.seconds);
});

// 监听 NetTable 变化
function setupNetTableListener(): void {
    const netTable = CustomNetTables.GetTableValue('game_state', 'preparation');
    if (netTable) {
        updatePreparationState(netTable);
    }
    
    CustomNetTables.SubscribeNetTableListener('game_state', (tableName, key, value) => {
        if (key === 'preparation') {
            updatePreparationState(value);
        }
    });
}

function updatePreparationState(state: any): void {
    if (!state) return;
    
    if (state.isActive !== undefined) {
        showPreparationScreen(state.isActive);
    }
    
    if (state.countdown !== undefined) {
        updateCountdown(state.countdown);
    }
    
    if (state.players) {
        Object.keys(state.players).forEach((playerId: string) => {
            const player = state.players[playerId];
            updatePlayerReady(parseInt(playerId), player.isReady);
        });
    }
}

// 初始化
function initializePreparationScreen(): void {
    $.Msg('=== Initializing Preparation Screen ===');
    $.Schedule(0.5, createPreparationScreen);
    $.Schedule(1.0, setupNetTableListener);
}

// 导出全局函数
(globalThis as any).PreparationScreen = {
    create: createPreparationScreen,
    show: showPreparationScreen,
    updateReady: updateReadyButton,
    updateCountdown: updateCountdown,
    updatePlayerReady: updatePlayerReady
};

// 立即执行初始化
initializePreparationScreen();

$.Msg('=== Preparation Screen module loaded completely ===');


