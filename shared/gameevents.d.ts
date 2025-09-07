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
}
