/**
 * 波次配置系统
 * Wave Configuration System
 * 
 * 管理自走棋的怪物波次配置
 */

import { ChessPiece } from '../AutoChessMode';

export interface MonsterSpawn {
    pieceId: string;
    count: number;
    level: number;
    position?: string; // 'front', 'back', 'center', 'random'
    customStats?: {
        healthMultiplier?: number;
        damageMultiplier?: number;
        armorBonus?: number;
    };
}

export interface MonsterGroup {
    name: string;
    monsters: MonsterSpawn[];
    spawnDelay: number; // 延迟生成时间（秒）
}

export interface WaveConfig {
    id: string;
    name: string;
    description: string;
    difficulty: number;
    waveNumber: number;
    monsterGroups: MonsterGroup[];
}

export interface WaveState {
    currentWave: number;
    lastWaveConfigId: string | null;
    availableNextWaves: string[]; // 可用的下一波次ID列表
}

export class WaveConfigSystem {
    private static instance: WaveConfigSystem;
    private waveConfigs: Map<string, WaveConfig>;
    private chessPieceDatabase: Map<string, ChessPiece> | null = null;
    private waveState: WaveState;

    private constructor() {
        this.waveConfigs = new Map();
        this.waveState = {
            currentWave: 0,
            lastWaveConfigId: null,
            availableNextWaves: []
        };
        this.initializeWaveConfigs();
        print('[WaveConfigSystem] Initialized');
    }

    public static getInstance(): WaveConfigSystem {
        if (!WaveConfigSystem.instance) {
            WaveConfigSystem.instance = new WaveConfigSystem();
        }
        return WaveConfigSystem.instance;
    }

    public setChessPieceDatabase(database: Map<string, ChessPiece>): void {
        this.chessPieceDatabase = database;
    }

    private initializeWaveConfigs(): void {
        // 第一波配置
        this.waveConfigs.set('wave_1_basic', {
            id: 'wave_1_basic',
            name: '基础训练',
            description: '第一波基础怪物',
            difficulty: 1,
            waveNumber: 1,
            monsterGroups: [
                {
                    name: '小怪群',
                    spawnDelay: 0,
                    monsters: [
                        { pieceId: 'axe', count: 2, level: 1, position: 'front' },
                        { pieceId: 'crystal_maiden', count: 1, level: 1, position: 'back' }
                    ]
                }
            ]
        });

        // 第二波配置 - 数量优势
        this.waveConfigs.set('wave_2_swarm', {
            id: 'wave_2_swarm',
            name: '数量压制',
            description: '以数量取胜的怪物群',
            difficulty: 3,
            waveNumber: 2,
            monsterGroups: [
                {
                    name: '小怪群',
                    spawnDelay: 0,
                    monsters: [
                        { pieceId: 'axe', count: 4, level: 1, position: 'front' },
                        { pieceId: 'drow_ranger', count: 2, level: 1, position: 'back' }
                    ]
                }
            ]
        });

        // 第二波配置 - 精英单位
        this.waveConfigs.set('wave_2_elite', {
            id: 'wave_2_elite',
            name: '精英挑战',
            description: '包含精英单位的怪物群',
            difficulty: 4,
            waveNumber: 2,
            monsterGroups: [
                {
                    name: '精英小队',
                    spawnDelay: 0,
                    monsters: [
                        { pieceId: 'axe', count: 1, level: 3, position: 'front', customStats: { healthMultiplier: 1.5, damageMultiplier: 1.2 } },
                        { pieceId: 'bounty_hunter', count: 1, level: 2, position: 'front' },
                        { pieceId: 'crystal_maiden', count: 1, level: 2, position: 'back' }
                    ]
                }
            ]
        });

        // 第三波配置 - 更多挑战
        this.waveConfigs.set('wave_3_mixed', {
            id: 'wave_3_mixed',
            name: '混合部队',
            description: '多种类型怪物的混合波次',
            difficulty: 5,
            waveNumber: 3,
            monsterGroups: [
                {
                    name: '前排',
                    spawnDelay: 0,
                    monsters: [
                        { pieceId: 'axe', count: 2, level: 2, position: 'front' },
                        { pieceId: 'bounty_hunter', count: 1, level: 2, position: 'front' }
                    ]
                },
                {
                    name: '后排',
                    spawnDelay: 2, // 延迟2秒生成
                    monsters: [
                        { pieceId: 'drow_ranger', count: 2, level: 2, position: 'back' }
                    ]
                }
            ]
        });
    }

    public getWaveConfig(id: string): WaveConfig | undefined {
        return this.waveConfigs.get(id);
    }

    public startNewWave(waveNumber: number): WaveConfig | null {
        let selectedWave: WaveConfig | null = null;
        if (waveNumber === 1) {
            selectedWave = this.waveConfigs.get('wave_1_basic') || null;
        } else {
            const availableWaves = Array.from(this.waveConfigs.values()).filter(
                (wave) => wave.waveNumber === waveNumber && wave.id !== this.waveState.lastWaveConfigId
            );

            if (availableWaves.length > 0) {
                const randomIndex = RandomInt(0, availableWaves.length - 1);
                selectedWave = availableWaves[randomIndex];
            }
        }

        if (selectedWave) {
            this.waveState.currentWave = waveNumber;
            this.waveState.lastWaveConfigId = selectedWave.id;
            print(`[WaveConfigSystem] Selected wave ${waveNumber}: ${selectedWave.name} (${selectedWave.id})`);
            return selectedWave;
        }

        print(`[WaveConfigSystem] No wave configuration found for wave number ${waveNumber}`);
        return null;
    }

    public getCurrentWaveState(): WaveState {
        return this.waveState;
    }

    public resetWaveState(): void {
        this.waveState = {
            currentWave: 0,
            lastWaveConfigId: null,
            availableNextWaves: []
        };
        print('[WaveConfigSystem] Wave state reset.');
    }

    private getChessPieceDefinition(pieceId: string): ChessPiece | null {
        if (!this.chessPieceDatabase) {
            print(`[WaveConfigSystem] Error: ChessPieceDatabase not set.`);
            return null;
        }
        const piece = this.chessPieceDatabase.get(pieceId);
        if (!piece) {
            print(`[WaveConfigSystem] Warning: Chess piece '${pieceId}' not found in database.`);
        }
        return piece || null;
    }
}
