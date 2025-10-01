declare interface XNetTableDefinitions {
    test_table: {
        test_key: {
            data_1: string;
            data_2?: number;
            data_3?: boolean[];
            data_t?: any;
        };
    };
    settings: {
        basicSettings: BasicSettings;
    };
    error_reports: {
        latest_batch: {
            count: number;
            timestamp: number;
            summary: Array<{
                message: string;
                hash: string;
                count: number;
            }>;
        };
        stats: {
            totalErrors: number;
            recentErrors: number;
            cacheSize: number;
            queueSize: number;
            lastUpdate: number;
        };
    };
    debug_info: {
        system_status: {
            errorTracking: boolean;
            performanceMonitoring: boolean;
            debugMode: boolean;
            timestamp: number;
        };
        performance_metrics: {
            [operation: string]: {
                count: number;
                totalTime: number;
                averageTime: number;
                maxTime: number;
                lastUpdate: number;
            };
        };
    };
    game_mode: {
        current: {
            mode: string;
            config: any;
            initialized: boolean;
            timestamp: number;
        };
    };
    training_mode: {
        status: {
            isActive: boolean;
            settings: any;
            activeScenario: any;
            spawnedUnitsCount: number;
            testDuration: number;
            timestamp: number;
        };
        scenarios: {
            [scenarioId: string]: {
                id: string;
                name: string;
                description: string;
                monsters: Array<any>;
                environment?: any;
                objectives?: Array<any>;
            };
        };
        commands: {
            available_commands: Array<{
                command: string;
                description: string;
                usage: string;
                category: string;
            }>;
        };
    };
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
    autochess_shop: {
        [playerId: string]: {
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
    autochess_player: {
        [playerId: string]: {
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
    battle_system: {
        current_battle: {
            battleId: string;
            status: string;
            levelId: string;
            levelName: string;
            timestamp: number;
        };
        latest_result: any;
        battle_history: {
            battles: any[];
            totalBattles: number;
        };
        available_levels?: any;
        config_status?: any;
        [key: string]: any;
    };
    player_inventory: {
        [playerKey: string]: {
            playerId: number;
            capacity: number;
            usedSlots: number;
            gold: number;
            slots: Array<{
                slotId: number;
                locked: boolean;
                item: {
                    instanceId: string;
                    itemId: string;
                    stackCount: number;
                    equipped: boolean;
                    locked: boolean;
                    charges?: number;
                } | null;
            }>;
        };
    };
    crafting_system: {
        [playerKey: string]: {
            items: string[];
            timestamp: number;
        };
    };
    performance_debug: {
        debug_state?: any;
        debug_data?: any;
        [key: string]: any;
    };
}

declare interface BasicSettings {}

// 以下是库内部使用的，勿动
declare interface CustomGameEventDeclarations {
    x_net_table: {
        data:
            | string // 要么是以字符串形式发送的数据块
            | XNetTableObject; // 要么是一次性发送的数据
    };
}

declare interface XNetTableObject {
    table_name: string;
    key: string;
    content: any;
}

declare interface XNetTableDataJSON {
    table: string;
    key: string;
    value: any;
}
