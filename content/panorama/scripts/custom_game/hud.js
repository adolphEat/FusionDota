// 简单的HUD测试脚本 - 使用Panorama支持的属性

$.Msg('=== FusionDota HUD Loading (Panorama Style) ===');

// 创建测试按钮的函数
function createTestButtons() {
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
    
    // 使用Panorama支持的样式设置
    container.SetHasClass('test-container', true);
    container.style.width = '350px';
    container.style.height = '180px';
    container.style.backgroundColor = '#ff0000ee';  // 红色背景
    container.style.border = '5px solid #ffff00';   // 黄色边框
    container.style.borderRadius = '10px';
    container.style.padding = '20px';
    container.style.marginTop = '80px';
    container.style.marginRight = '80px';
    container.style.horizontalAlign = 'right';
    container.style.verticalAlign = 'top';
    container.style.zIndex = '1000';
    
    $.Msg('Container created with Panorama styles');
    
    // 创建标题
    var title = $.CreatePanel('Label', container, 'Title');
    title.text = '🎮 FusionDota Panorama测试';
    title.style.color = '#ffff00';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    title.style.textAlign = 'center';
    title.style.marginBottom = '15px';
    
    // 创建按钮容器
    var buttonContainer = $.CreatePanel('Panel', container, 'ButtonContainer');
    buttonContainer.style.width = '100%';
    buttonContainer.style.flowChildren = 'down';
    
    // 创建测试按钮1
    var button1 = $.CreatePanel('Button', buttonContainer, 'PanoramaButton1');
    button1.text = '🔵 Panorama按钮1';
    button1.style.width = '280px';
    button1.style.height = '40px';
    button1.style.marginBottom = '10px';
    button1.style.backgroundColor = '#007bff';
    button1.style.color = '#ffffff';
    button1.style.fontSize = '16px';
    button1.style.textAlign = 'center';
    
    button1.SetPanelEvent('onactivate', function() {
        $.Msg('=== Panorama按钮1被点击！时间: ' + new Date().toLocaleTimeString() + ' ===');
        button1.text = '✅ 点击成功!';
        button1.style.backgroundColor = '#28a745';
    });
    
    // 创建测试按钮2
    var button2 = $.CreatePanel('Button', buttonContainer, 'PanoramaButton2');
    button2.text = '🔴 Panorama按钮2';
    button2.style.width = '280px';
    button2.style.height = '40px';
    button2.style.marginBottom = '10px';
    button2.style.backgroundColor = '#dc3545';
    button2.style.color = '#ffffff';
    button2.style.fontSize = '16px';
    button2.style.textAlign = 'center';
    
    button2.SetPanelEvent('onactivate', function() {
        $.Msg('=== Panorama按钮2被点击！时间: ' + new Date().toLocaleTimeString() + ' ===');
        button2.text = '🟡 操作完成!';
        button2.style.backgroundColor = '#ffc107';
        button2.style.color = '#000000';
    });
    
    // 创建信息标签
    var infoLabel = $.CreatePanel('Label', container, 'InfoLabel');
    infoLabel.text = 'Panorama样式测试成功！';
    infoLabel.style.color = '#ffffff';
    infoLabel.style.fontSize = '14px';
    infoLabel.style.textAlign = 'center';
    infoLabel.style.marginTop = '10px';
    
    $.Msg('Panorama test buttons created successfully!');
}

// 立即创建按钮
$.Schedule(0.2, createTestButtons);

// 多次尝试，确保成功
$.Schedule(1.0, createTestButtons);

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