// Panorama 全局类型定义文件
// 为 DOTA2 Panorama UI 系统提供类型支持

declare global {
    // jQuery 全局对象
    const $: any;
    
    // React 全局对象
    const React: typeof import('react');
    const ReactDOM: typeof import('react-dom');
    
    // DOTA2 游戏事件系统
    namespace GameEvents {
        function Subscribe(eventName: string, callback: (data: any) => void): void;
        function Unsubscribe(eventName: string): void;
        function SendCustomGameEventToServer(eventName: string, data: any): void;
    }
    
    // DOTA2 自定义网络表系统
    namespace CustomNetTables {
        function GetTableValue(tableName: string, key: string): any;
        function SubscribeNetTableListener(tableName: string, callback: (tableName: string, key: string, data: any) => void): void;
        function UnsubscribeNetTableListener(tableName: string): void;
    }
    
    // DOTA2 玩家系统
    namespace Players {
        function GetLocalPlayer(): number;
        function GetLocalPlayerPortraitUnit(): any;
        function GetPlayerName(playerId: number): string;
        function GetPlayerCount(): number;
        function IsValidPlayer(playerId: number): boolean;
    }
    
    // DOTA2 游戏系统
    namespace Game {
        function GetGameTime(): number;
        function GetDOTATime(bIncludePreGame?: boolean, bIncludeNegativeTime?: boolean): number;
        function IsInToolsMode(): boolean;
        function GetMapInfo(): any;
    }
    
    // DOTA2 单位系统
    namespace Entities {
        function GetLocalHero(): any;
        function GetAllHeroes(): any[];
        function GetAllUnits(): any[];
    }
    
    // DOTA2 UI 系统
    namespace DOTAHud {
        function SetVisible(visible: boolean): void;
        function GetHUDElement(elementName: string): any;
    }
    
    // DOTA2 音效系统
    namespace GameSounds {
        function PlaySound(soundName: string): void;
        function StopSound(soundName: string): void;
    }
    
    // 类型别名
    type PlayerID = number;
    type EntityID = number;
    type AbilityID = number;
    type ItemID = number;
    
    // 向量类型
    interface Vector {
        x: number;
        y: number;
        z: number;
    }
    
    // 游戏事件参数类型
    interface CustomGameEventDeclarations {
        // 自定义UI事件
        button_clicked: { count: number; PlayerID?: PlayerID };
        request_gold_bonus: { playerId: PlayerID; amount: number };
        custom_panel_action: { playerId: PlayerID; action: string; params?: any };
        
        // UI响应事件
        button_click_response: { playerId: PlayerID; count: number; message: string };
        gold_bonus_granted: { amount: number; newTotal: number };
        unit_spawned: { unitName: string; position: Vector };
        hero_teleported: { position: Vector };
        show_ui_message: { message: string; duration: number };
        ui_data_update: { currentTime: number; gameMode: string; playersConnected: number };
        
        // 系统事件
        show_custom_panel: { panelType: string };
        
        // 训练模式事件
        training_scenario_started: { scenario: any; startTime: number };
        training_scenario_stopped: { scenario: any; duration: number; completed: boolean };
        training_scenario_completed: { scenario: any; duration: number; success: boolean };
        training_unit_killed: { unitName: string; remainingUnits: number };
        game_mode_changed: { oldMode: string; newMode: string };
        
        // 自走棋模式事件
        autochess_game_started: { round: number; phase: string };
        autochess_game_ended: { winner: number; round: number };
        autochess_phase_started: { phase: string; timeLeft: number; round: number };
        autochess_time_update: { timeLeft: number; phase: string };
        autochess_battle_match: { player1: number; player2: number; round: number };
        
        // 训练模式控制事件
        show_custom_message: { message: string; duration: number };
        training_activate: {};
        training_deactivate: {};
        training_refresh_hero: {};
        training_toggle_god_mode: {};
        training_clear_units: {};
        training_spawn_units: { unitName: string; count: number; level: number };
        training_start_scenario: { scenarioId: string };
        training_stop_scenario: {};
        
        // 自走棋模式控制事件
        autochess_buy_piece: { pieceId: string; playerId: number };
        autochess_refresh_shop: { playerId: number };
        autochess_level_up: { playerId: number };
        autochess_start_game: {};
        autochess_end_game: {};
        autochess_surrender: { playerId: number };
        
        // 调试事件
        debug_autochess_activate: {};
        debug_autochess_deactivate: {};
        debug_add_gold: { playerId: number; amount: number };
        
        // 主界面事件
        start_autochess_mode: {};
        start_training_mode: {};
        open_settings: {};
        open_friends: {};
        open_mail: {};
    }
    
    // 自定义网络表类型
    interface CustomNetTableDeclarations {
        game_timer: {
            game_timer: {
                current_time: number;
                current_state: 1 | 2 | 3 | 4 | 5;
                current_round: number;
            };
        };
        hero_list: {
            hero_list: Record<string, string> | string[];
        };
        custom_net_table_1: {
            key_1: number;
            key_2: string;
        };
        custom_net_table_3: {
            key_1: number;
            key_2: string;
        };
        // 服务器选择界面控制
        server_selection: {
            [playerId: string]: {
                show: boolean;
            };
        };
        // 游戏模式相关
        game_mode: {
            current: {
                mode: string;
                timestamp: number;
            };
        };
        // 训练模式相关
        training_mode: {
            status: {
                isActive: boolean;
                settings: any;
                activeScenario: any;
                spawnedUnitsCount: number;
                testDuration: number;
                timestamp: number;
            };
        };
        // 自走棋相关
        autochess_game: {
            state: {
                isActive: boolean;
                gameState: {
                    currentRound: number;
                    currentPhase: string;
                    phaseTimeLeft: number;
                    isGameActive: boolean;
                };
                timestamp: number;
            };
        };
        autochess_player: {
            [key: string]: {
                health: number;
                maxHealth: number;
                gold: number;
                level: number;
                experience: number;
                winStreak: number;
                lossStreak: number;
                boardPieces: any[];
                benchPieces: any[];
                isAlive: boolean;
                rank: number;
                timestamp: number;
            };
        };
        autochess_shop: {
            [key: string]: {
                pieces: Array<{
                    id: string;
                    unitName: string;
                    displayName: string;
                    rarity: number;
                    cost: number;
                    race: string[];
                    class: string[];
                    health: number;
                    damage: number;
                    armor: number;
                    attackRange: number;
                    abilities: string[];
                }>;
                refreshCount: number;
                timestamp: number;
            };
        };
        // 调试信息
        debug_info: {
            system_status: {
                errorTracking: boolean;
                performanceMonitoring: boolean;
                debugMode: boolean;
                timestamp: number;
            };
        };
        // 玩家信息
        player_info: {
            local_player: {
                playerId: number;
                name: string;
                level: number;
                experience: number;
                rank: string;
                avatar: string;
                stats: {
                    wins: number;
                    losses: number;
                    totalGames: number;
                    winRate: number;
                };
                timestamp: number;
            };
        };
    }
}

export {};
