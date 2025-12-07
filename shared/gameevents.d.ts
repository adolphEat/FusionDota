declare interface CustomGameEventDeclarations {
    /**
     * 在前后端之间（UI的ts代码和游戏逻辑的ts代码之间）传递的事件，需要在此处声明事件的参数类型
     *  events and it's parameters between ui and game mode typescript code should be declared here
     */
    c2s_test_event: { key: string };
    c2s_test_event_with_params: {
        foo: number;
        bar: string;
    };
    
    // 训练模式事件
    training_scenario_started: { scenario: any; startTime: number; };
    training_scenario_stopped: { scenario: any; duration: number; completed: boolean; };
    training_scenario_completed: { scenario: any; duration: number; success: boolean; };
    training_unit_killed: { unitName: string; remainingUnits: number; };
    game_mode_changed: { oldMode: string; newMode: string; };
    
    // 游戏状态事件
    game_state_changed: { state: number; timestamp: number; };
    game_start: { timestamp: number; };
    game_end: { timestamp: number; };
    
    // 自走棋模式事件
    autochess_game_started: { round: number; phase: string; };
    autochess_game_ended: { winner: number; round: number; };
    autochess_phase_started: { phase: string; timeLeft: number; round: number; };
    autochess_time_update: { timeLeft: number; phase: string; };
    autochess_battle_match: { player1: number; player2: number; round: number; };
    
    // 训练模式控制事件
    show_custom_message: { message: string; duration: number; };
    training_activate: {};
    training_deactivate: {};
    training_refresh_hero: {};
    training_toggle_god_mode: {};
    training_clear_units: {};
    training_spawn_units: { unitName: string; count: number; level: number; };
    training_start_scenario: { scenarioId: string; };
    training_stop_scenario: {};
    
    // 自走棋模式控制事件
    autochess_buy_piece: { pieceId: string; playerId: number; };
    autochess_refresh_shop: { playerId: number; };
    autochess_level_up: { playerId: number; };
    autochess_start_game: {};
    autochess_end_game: {};
    autochess_surrender: { playerId: number; };
    
    // 调试事件
    debug_autochess_activate: {};
    debug_autochess_deactivate: {};
    debug_add_gold: { playerId: number; amount: number; };
    
    // 主界面事件
    start_autochess_mode: {};
    start_training_mode: {};
    open_settings: {};
    open_friends: {};
    open_mail: {};
    
    // 自定义UI事件
    button_clicked: { count: number; PlayerID?: number };
    request_gold_bonus: { playerId: number; amount: number };
    custom_panel_action: { playerId: number; action: string; params?: any };
    
    // UI响应事件
    button_click_response: { playerId: number; count: number; message: string };
    gold_bonus_granted: { amount: number; newTotal: number };
    unit_spawned: { unitName: string; position: any };
    hero_teleported: { position: any };
    show_ui_message: { message: string; duration: number };
    ui_data_update: { currentTime: number; gameMode: string; playersConnected: number };
    
    // 系统事件
    show_custom_panel: { panelType: string };
    hide_all_panels: {};
    
    // 选关界面事件
    open_level_selection: {};  // 客户端到服务端：请求打开选关界面
    open_stage_select: {};     // 服务端到客户端：打开选关界面
    close_stage_select: {};    // 服务端到客户端：关闭选关界面
    update_stage_data: {        // 服务端到客户端：更新关卡数据
        currentStage: number;
        maxStages: number;
        nodes: any[];
    };
    stage_selected: {           // 客户端到服务端：选择关卡
        stageId: string;
        stageType: string;
    };
    stage_select_closed: {};    // 客户端到服务端：关闭选关界面
    
    // 自走棋波次结算事件
    autochess_wave_settlement: {        // 服务端到客户端：显示波次结算界面
        round: number;
        winner: 'player' | 'enemy' | 'draw';  // 胜负结果
        rewardGold: number;
        availableStages: string[];
        playerSummary: any;
        stats?: {                          // 战斗统计（可选）
            damageDealt?: number;
            damageTaken?: number;
            unitsKilled?: number;
            unitsSurvived?: number;
        };
        levelName?: string;                // 关卡名称（可选）
    };
    autochess_wave_settlement_dismiss: {};  // 服务端到客户端：关闭波次结算界面
    autochess_wave_reward_granted: {        // 服务端到客户端：奖励已发放
        amount: number;
        newTotal: number;
    };
    autochess_stages_available: {           // 服务端到客户端：发送可选关卡列表
        stages: Array<{
            id: string;
            name: string;
            type: string;
            nodeLevel: number;
            description: string;
        }>;
        round: number;
    };
    autochess_wave_stage_ack: {             // 服务端到客户端：关卡选择确认
        playerId: number;
        stageId: string;
        success: boolean;
        stageName?: string;
        stageType?: string;
        message?: string;
    };
    
    // 准备阶段事件
    autochess_preparation_started: {        // 服务端到客户端：准备阶段开始
        timeLeft: number;
        stageId: number;
    };
    autochess_preparation_countdown: {      // 服务端到客户端：准备阶段倒计时
        timeLeft: number;
        stageId: number;
    };
    autochess_battle_started: {             // 服务端到客户端：战斗开始
        stageId: number;
        round: number;
        timeLeft: number;
    };
}
