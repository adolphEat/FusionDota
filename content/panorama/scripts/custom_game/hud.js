// 简单的HUD测试脚本 - 使用Panorama支持的属性

$.Msg('=== FusionDota HUD Loading (Panorama Style) ===');

// 全局变量保存UI引用
var globalInfoLabel = null;
var uiCreated = false;

// 创建测试按钮的函数
function createTestButtons() {
    if (uiCreated) {
        $.Msg('UI already created, skipping...');
        return;  // 防止重复创建
    }
    $.Msg('Creating test buttons with Panorama styles...');
    
    var rootPanel = $.GetContextPanel();
    if (!rootPanel) {
        $.Msg('Root panel not found!');
        return;
    }
    
    // 删除已存在的容器
    var existingContainer = rootPanel.FindChildInLayoutFile('PanoramaTestContainer');
    if (existingContainer) {
        existingContainer.DeleteAsync(0);
    }
    
    // 创建容器 - 使用Panorama样式属性
    var container = $.CreatePanel('Panel', rootPanel, 'PanoramaTestContainer');
    
    // 使用Panorama支持的样式设置 - 蓝色主题
    container.SetHasClass('test-container', true);
    container.style.width = '380px';
    container.style.height = '200px';
    container.style.backgroundColor = '#0066ffee';  // 蓝色背景
    container.style.border = '5px solid #00ccff';   // 亮蓝色边框
    container.style.borderRadius = '10px';
    container.style.padding = '20px';
    container.style.marginTop = '80px';
    container.style.marginRight = '80px';
    container.style.horizontalAlign = 'right';
    container.style.verticalAlign = 'top';
    container.style.zIndex = '1000';
    container.style.boxShadow = '0 0 30px rgba(0, 150, 255, 0.8)';  // 蓝色发光
    
    $.Msg('Container created with Panorama styles');
    
    // 创建标题
    var title = $.CreatePanel('Label', container, 'Title');
    title.text = '♟️ 自走棋控制面板';
    title.style.color = '#00ffff';  // 青色标题
    title.style.fontSize = '20px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '15px';
    title.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8)';
    
    // 创建按钮容器
    var buttonContainer = $.CreatePanel('Panel', container, 'ButtonContainer');
    buttonContainer.style.width = '100%';
    buttonContainer.style.flowChildren = 'down';
    
    // 创建测试按钮1 - 开始游戏
    var button1 = $.CreatePanel('Button', buttonContainer, 'PanoramaButton1');
    button1.text = '▶️ 开始游戏';
    button1.style.width = '320px';
    button1.style.height = '45px';
    button1.style.marginBottom = '10px';
    button1.style.backgroundColor = '#0088ff';  // 蓝色按钮
    button1.style.color = '#ffffff';
    button1.style.fontSize = '18px';
    button1.style.fontWeight = 'bold';
    button1.style.textAlign = 'center';
    button1.style.border = '2px solid #00ccff';
    button1.style.borderRadius = '8px';
    button1.style.boxShadow = '0 0 15px rgba(0, 136, 255, 0.6)';
    
    button1.SetPanelEvent('onactivate', function() {
        $.Msg('=== 开始游戏按钮被点击！ ===');
        button1.text = '✅ 游戏已开始!';
        button1.style.backgroundColor = '#00ff88';  // 绿色表示成功
        button1.style.border = '2px solid #00ffaa';
        
        // 发送开始游戏事件
        GameEvents.SendCustomGameEventToServer('autochess_start_game', {});
    });
    
    // 创建测试按钮2 - 刷新商店
    var button2 = $.CreatePanel('Button', buttonContainer, 'PanoramaButton2');
    button2.text = '🔄 刷新商店';
    button2.style.width = '320px';
    button2.style.height = '45px';
    button2.style.marginBottom = '10px';
    button2.style.backgroundColor = '#0066cc';  // 深蓝色按钮
    button2.style.color = '#ffffff';
    button2.style.fontSize = '18px';
    button2.style.fontWeight = 'bold';
    button2.style.textAlign = 'center';
    button2.style.border = '2px solid #0099ff';
    button2.style.borderRadius = '8px';
    button2.style.boxShadow = '0 0 15px rgba(0, 102, 204, 0.6)';
    
    button2.SetPanelEvent('onactivate', function() {
        $.Msg('=== 刷新商店按钮被点击！ ===');
        button2.text = '✨ 商店已刷新!';
        button2.style.backgroundColor = '#00aaff';  // 亮蓝色
        button2.style.border = '2px solid #00ddff';
        
        // 发送刷新商店事件
        GameEvents.SendCustomGameEventToServer('autochess_refresh_shop', {});
        
        // 2秒后恢复原状
        $.Schedule(2.0, function() {
            button2.text = '🔄 刷新商店';
            button2.style.backgroundColor = '#0066cc';
            button2.style.border = '2px solid #0099ff';
        });
    });
    
    // 创建游戏模式信息标签
    globalInfoLabel = $.CreatePanel('Label', container, 'InfoLabel');
    globalInfoLabel.text = '当前模式: 加载中...';
    globalInfoLabel.style.color = '#00ffff';  // 青色文字
    globalInfoLabel.style.fontSize = '18px';
    globalInfoLabel.style.fontWeight = 'bold';
    globalInfoLabel.style.textAlign = 'center';
    globalInfoLabel.style.marginTop = '15px';
    globalInfoLabel.style.textShadow = '0 0 10px rgba(0, 255, 255, 0.8)';  // 青色发光
    
    // 标记UI已创建
    uiCreated = true;
    
    // 更新游戏模式标签函数（使用全局引用）
    $.Msg('Panorama test buttons created successfully!');
}

// 更新游戏模式标签函数（全局函数）
function updateGameModeLabel(mode) {
    // 检查面板是否有效
    if (!globalInfoLabel || !globalInfoLabel.IsValid()) {
        $.Msg('⚠️ InfoLabel 无效或已删除，跳过更新');
        return;
    }
    
    var modeNames = {
        'normal': '🎮 正常模式',
        'training': '🏟️ 练功房模式',
        'autochess': '♟️ 自走棋模式',
        'custom': '⚙️ 自定义模式'
    };
    
    var displayName = modeNames[mode] || ('🎯 ' + mode);
    
    try {
        globalInfoLabel.text = '当前模式: ' + displayName;
        
        // 根据模式改变颜色 - 全部使用蓝色系
        var modeColors = {
            'normal': '#00ccff',      // 亮蓝色
            'training': '#00aaff',    // 中蓝色
            'autochess': '#0088ff',   // 标准蓝色
            'custom': '#00ffff'       // 青色
        };
        globalInfoLabel.style.color = modeColors[mode] || '#ffffff';
        globalInfoLabel.style.textShadow = '0 0 10px ' + (modeColors[mode] || '#ffffff');
        
        $.Msg('✅ 游戏模式标签已更新: ' + displayName);
    } catch (error) {
        $.Msg('❌ 更新标签失败: ' + error);
    }
}

// 监听游戏模式变化
GameEvents.Subscribe('game_mode_changed', function(data) {
    $.Msg('收到游戏模式变化事件:', data);
    if (data && data.newMode) {
        updateGameModeLabel(data.newMode);
    }
});

// 从网络表读取当前模式（多次尝试，更频繁）
var checkAttempts = 0;
var modeDetected = false;
function checkGameMode() {
    if (modeDetected) return;  // 已检测到，停止检查
    
    checkAttempts++;
    var gameModeData = CustomNetTables.GetTableValue('game_mode', 'current');
    $.Msg('尝试读取游戏模式 #' + checkAttempts + ':', gameModeData);
    
    if (gameModeData && gameModeData.mode) {
        updateGameModeLabel(gameModeData.mode);
        modeDetected = true;
        $.Msg('✅ 游戏模式检测成功！');
    } else if (checkAttempts < 20) {
        $.Schedule(0.5, checkGameMode);  // 每0.5秒检查一次，检查20次（10秒）
    } else {
        $.Msg('⚠️ 无法读取游戏模式，使用默认值');
        updateGameModeLabel('autochess');  // 默认显示自走棋
    }
}

// 监听网络表变化（全局）
CustomNetTables.SubscribeNetTableListener('game_mode', function(tableName, key, data) {
    $.Msg('网络表更新:', tableName, key, data);
    if (key === 'current' && data && data.mode) {
        updateGameModeLabel(data.mode);
    }
});

// 立即创建按钮（只创建一次）
$.Schedule(0.2, createTestButtons);

// 启动游戏模式检测
$.Schedule(1.0, checkGameMode);
$.Schedule(2.0, checkGameMode);
$.Schedule(3.0, checkGameMode);

// 设置全局函数
globalThis.PanoramaTest = {
    create: createTestButtons,
    test: function() {
        $.Msg('Panorama test function works! Framework is operational!');
        return 'Panorama UI is working!';
    }
};

// 设置键盘快捷键
$.RegisterKeyBind($.GetContextPanel(), 'key_f9', function() {
    $.Msg('=== F9 pressed - Recreating Panorama buttons ===');
    createTestButtons();
});

$.RegisterKeyBind($.GetContextPanel(), 'key_f8', function() {
    $.Msg('=== F8 pressed - Panorama panel info ===');
    var root = $.GetContextPanel();
    $.Msg('Root panel: ' + root);
    $.Msg('Panel ID: ' + (root ? root.id : 'None'));
});

$.Msg('=== Panorama HUD script loaded completely ===');