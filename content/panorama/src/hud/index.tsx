// @ts-nocheck
// 简单的HUD测试 - 证明FusionDota框架正常运行

// 输出加载消息
$.Msg('=== FusionDota HUD Loading ===');

// 创建简单的测试按钮
function createSimpleTestButtons(): void {
    $.Msg('Creating simple test buttons...');
    
    // 获取根面板
    const rootPanel = $.GetContextPanel();
    $.Msg('Root panel: ' + (rootPanel ? 'Found' : 'Not found'));
    
    // 先删除之前的容器（如果存在）
    const existingContainer = rootPanel.FindChildInLayoutFile('TestButtonContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
        $.Msg('Removed existing container');
    }
    
    // 创建按钮容器 - 使用更明显的位置和样式
    const container = $.CreatePanel('Panel', rootPanel, 'TestButtonContainer');
    container.style.position = 'absolute';
    container.style.top = '50px';     // 更靠上
    container.style.right = '50px';   // 右上角更明显
    container.style.width = '350px';
    container.style.height = '120px';
    container.style.backgroundColor = 'rgba(255, 0, 0, 0.9)'; // 更明显的红色背景
    container.style.border = '5px solid #ffff00'; // 更粗的黄色边框
    container.style.borderRadius = '10px';
    container.style.zIndex = '99999'; // 更高的层级
    container.style.padding = '15px';
    container.style.boxShadow = '0 0 20px rgba(255, 255, 0, 0.8)'; // 发光效果
    
    $.Msg('Button container created');
    
    // 添加标题
    const title = $.CreatePanel('Label', container, 'TitleLabel');
    title.text = '🎮 FusionDota 测试面板';
    title.style.color = '#ffff00';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '10px';
    title.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';

    // 按钮1
    const button1 = $.CreatePanel('Button', container, 'TestButton1');
    button1.text = '🔵 测试按钮1';
    button1.style.width = '140px';
    button1.style.height = '45px';
    button1.style.margin = '5px';
    button1.style.backgroundColor = '#007bff';
    button1.style.color = 'white';
    button1.style.fontSize = '16px';
    button1.style.fontWeight = 'bold';
    button1.style.border = '2px solid #0056b3';
    button1.style.borderRadius = '8px';
    button1.style.cursor = 'pointer';
    button1.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
    
    button1.SetPanelEvent('onactivate', () => {
        $.Msg('=== 按钮1被点击了！时间: ' + new Date().toLocaleTimeString() + ' ===');
        button1.text = '✅ 已点击!';
        button1.style.backgroundColor = '#28a745';
        button1.style.border = '2px solid #1e7e34';
    });
    
    // 按钮2
    const button2 = $.CreatePanel('Button', container, 'TestButton2');
    button2.text = '🔴 测试按钮2';
    button2.style.width = '140px';
    button2.style.height = '45px';
    button2.style.margin = '5px';
    button2.style.backgroundColor = '#dc3545';
    button2.style.color = 'white';
    button2.style.fontSize = '16px';
    button2.style.fontWeight = 'bold';
    button2.style.border = '2px solid #c82333';
    button2.style.borderRadius = '8px';
    button2.style.cursor = 'pointer';
    button2.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
    
    button2.SetPanelEvent('onactivate', () => {
        $.Msg('=== 按钮2被点击了！时间: ' + new Date().toLocaleTimeString() + ' ===');
        button2.text = '🟡 成功!';
        button2.style.backgroundColor = '#ffc107';
        button2.style.color = 'black';
        button2.style.border = '2px solid #d39e00';
    });
    
    $.Msg('Both test buttons created successfully!');
    
    // 添加游戏模式信息标签
    const infoLabel = $.CreatePanel('Label', container, 'InfoLabel');
    infoLabel.text = '当前模式: 加载中...';
    infoLabel.style.color = '#00ff00';
    infoLabel.style.fontSize = '16px';
    infoLabel.style.fontWeight = 'bold';
    infoLabel.style.textAlign = 'center';
    infoLabel.style.marginTop = '10px';
    infoLabel.style.textShadow = '2px 2px 4px rgba(0,0,0,1)';
    
    // 监听游戏模式变化
    GameEvents.Subscribe('game_mode_changed', (data: any) => {
        $.Msg('收到游戏模式变化事件:', data);
        updateGameModeLabel(infoLabel, data.newMode);
    });
    
    // 从网络表读取当前模式（多次尝试）
    let checkAttempts = 0;
    const checkGameMode = () => {
        checkAttempts++;
        const gameModeData = CustomNetTables.GetTableValue('game_mode', 'current');
        $.Msg(`尝试读取游戏模式 #${checkAttempts}:`, gameModeData);
        
        if (gameModeData && gameModeData.mode) {
            updateGameModeLabel(infoLabel, gameModeData.mode);
        } else if (checkAttempts < 10) {
            $.Schedule(1.0, checkGameMode);
        }
    };
    
    $.Schedule(0.5, checkGameMode);
    
    // 监听网络表变化
    CustomNetTables.SubscribeNetTableListener('game_mode', (tableName, key, data) => {
        $.Msg('网络表更新:', tableName, key, data);
        if (key === 'current' && data && data.mode) {
            updateGameModeLabel(infoLabel, data.mode);
        }
    });
}

// 更新游戏模式标签
function updateGameModeLabel(label: Panel, mode: string): void {
    const modeNames: Record<string, string> = {
        'normal': '🎮 正常模式',
        'training': '🏟️ 练功房模式',
        'autochess': '♟️ 自走棋模式',
        'custom': '⚙️ 自定义模式'
    };
    
    const displayName = modeNames[mode] || `🎯 ${mode}`;
    label.text = `当前模式: ${displayName}`;
    
    // 根据模式改变颜色
    const modeColors: Record<string, string> = {
        'normal': '#00ff00',
        'training': '#ffff00',
        'autochess': '#ff00ff',
        'custom': '#00ffff'
    };
    label.style.color = modeColors[mode] || '#ffffff';
    
    $.Msg(`游戏模式标签已更新: ${displayName}`);
}

// 初始化函数
function initializeHUD(): void {
    $.Msg('=== Initializing HUD ===');
    
    // 多次尝试初始化，确保按钮能显示
    let attempts = 0;
    const maxAttempts = 5;
    
    function tryCreateButtons() {
        attempts++;
        $.Msg('=== 创建按钮尝试 #' + attempts + ' ===');
        
        try {
            createSimpleTestButtons();
            $.Msg('按钮创建成功！');
        } catch (error) {
            $.Msg('按钮创建失败: ' + error);
        }
        
        if (attempts < maxAttempts) {
            $.Schedule(1.0, tryCreateButtons);
        }
    }
    
    // 立即尝试
    tryCreateButtons();
    
    // 设置键盘快捷键
    $.RegisterKeyBind($.GetContextPanel(), 'key_f9', () => {
        $.Msg('=== F9键被按下，重新创建按钮 ===');
        createSimpleTestButtons();
    });
    
    $.RegisterKeyBind($.GetContextPanel(), 'key_f8', () => {
        $.Msg('=== F8键被按下，显示面板信息 ===');
        const root = $.GetContextPanel();
        $.Msg('Root panel: ' + root);
        $.Msg('Panel ID: ' + (root ? root.id : 'None'));
        $.Msg('Panel class: ' + (root ? root.GetAttributeString('class', 'no-class') : 'None'));
    });
    
    $.Msg('=== HUD initialization complete ===');
}

// 导出全局函数供控制台调用
(globalThis as any).FusionTest = {
    createButtons: createSimpleTestButtons,
    test: () => {
        $.Msg('FusionDota框架测试函数调用成功！');
        return 'Framework is working!';
    }
};

// 立即执行初始化
$.Msg('=== Starting HUD initialization ===');
initializeHUD();

// 紧急备用方案已禁用 - 使用主UI系统
// $.Schedule(2.0, () => {
//     $.Msg('=== Emergency UI creation ===');
// });

// 导出React组件（保持兼容性）
const HudPanel = () => {
    return null; // 使用原生Panorama，不需要React渲染
};

export default HudPanel;

$.Msg('=== HUD module loaded completely ===');