declare interface CustomNetTableDeclarations {
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
<<<<<<< Updated upstream
    // 服务器选择界面控制
    server_selection: {
        [playerId: string]: {
            show: boolean;
        };
    };
=======
>>>>>>> Stashed changes
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
}
