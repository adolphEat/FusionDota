/**
 * 对战管理器
 * Battle Manager - Core battle system controller
 */

import { 
    Battle,
    BattleTeam,
    BattleResult,
    BattleStatus,
    WinConditionType,
    FormationType,
    BattleEvent,
    BattleEventType,
    LevelConfig,
    TeamConfig,
    UnitSpawnConfig
} from '../Data/DataTypes';
import { BattleConfigLoader } from '../Data/ConfigLoader';
import { EntityManager } from './EntityManager';
import { unitFactory } from '../../UnitFactory';
import { UnitCreationOptions } from '../../types/UnitTypes';
import { getTimestampMs } from '../../../utils/time_utils';

export class BattleManager {
    private static instance: BattleManager;
    private currentBattle: Battle | null = null;
    private battleHistory: BattleResult[] = [];
    private configLoader: BattleConfigLoader;
    private entityManager: EntityManager;
    private eventListeners: Map<BattleEventType, Array<(event: BattleEvent) => void>> = new Map();

    public static getInstance(): BattleManager {
        if (!BattleManager.instance) {
            BattleManager.instance = new BattleManager();
        }
        return BattleManager.instance;
    }

    private constructor() {
        this.configLoader = BattleConfigLoader.getInstance();
        this.entityManager = EntityManager.getInstance();
        this.initializeEventListeners();
        print('[BattleManager] Initialized');
    }

    /**
     * 初始化事件监听器
     */
    private initializeEventListeners(): void {
        // 监听游戏事件
        CustomGameEventManager.RegisterListener('start_new_battle', (_, event: any) => {
            const levelId = event.levelId;
            if (levelId) {
                this.startBattle(levelId);
            }
        });

        CustomGameEventManager.RegisterListener('end_current_battle', (_, event: any) => {
            const winner = event.winner;
            this.endBattle(winner);
        });
    }

    /**
     * 开始对战
     */
    public async startBattle(levelId: string): Promise<boolean> {
        try {
            print(`[BattleManager] Starting battle: ${levelId}`);

            // 获取关卡配置
            const levelConfig = this.configLoader.getLevelConfig(levelId);
            if (!levelConfig) {
                throw new Error(`Level config not found: ${levelId}`);
            }

            // 清理之前的对战
            await this.cleanupCurrentBattle();

            // 创建新对战
            this.currentBattle = this.createBattle(levelConfig);

            // 生成队伍
            await this.spawnTeams();

            // 设置AI
            this.setupBattleAI();

            // 开始对战
            this.currentBattle.status = BattleStatus.FIGHTING;
            
            // 发送对战开始事件
            this.emitBattleEvent(BattleEventType.BATTLE_STARTED, {
                battleId: this.currentBattle.id,
                levelId: levelConfig.level_id,
                levelName: levelConfig.level_name
            });

            // 开始监控
            this.startBattleMonitoring();

            print(`[BattleManager] Battle started successfully: ${levelConfig.level_name}`);
            return true;

        } catch (error) {
            print(`[BattleManager] Failed to start battle: ${error}`);
            return false;
        }
    }

    /**
     * 创建对战实例
     */
    private createBattle(levelConfig: LevelConfig): Battle {
        const battle: Battle = {
            id: this.generateBattleId(),
            levelConfig: levelConfig,
            teams: new Map(),
            startTime: getTimestampMs(),
            status: BattleStatus.PREPARING,
            entities: new Set(),
            timeRemaining: levelConfig.time_limit
        };

        return battle;
    }

    /**
     * 生成队伍
     */
    private async spawnTeams(): Promise<void> {
        if (!this.currentBattle) return;

        const { levelConfig } = this.currentBattle;

        // 生成队伍1
        const team1Config = this.configLoader.getTeamConfig(levelConfig.team1_config);
        if (team1Config) {
            const team1 = this.spawnTeam(team1Config, DotaTeam.GOODGUYS, 'team1');
            this.currentBattle.teams.set(DotaTeam.GOODGUYS, team1);
        }

        // 生成队伍2
        const team2Config = this.configLoader.getTeamConfig(levelConfig.team2_config);
        if (team2Config) {
            const team2 = this.spawnTeam(team2Config, DotaTeam.BADGUYS, 'team2');
            this.currentBattle.teams.set(DotaTeam.BADGUYS, team2);
        }

        print(`[BattleManager] Teams spawned successfully`);
    }

    /**
     * 生成单个队伍
     */
    private spawnTeam(teamConfig: TeamConfig, team: DotaTeam, groupId: string): BattleTeam {
        const battleTeam: BattleTeam = {
            configId: teamConfig.team_config_id,
            team: team,
            name: teamConfig.team_name,
            units: [],
            isAlive: true,
            formation: teamConfig.formation,
            spawnedCount: 0,
            totalCount: teamConfig.unit_configs.reduce((sum, config) => sum + config.count, 0)
        };

        // 计算生成位置
        const spawnPositions = this.calculateSpawnPositions(
            teamConfig.spawn_area,
            teamConfig.formation,
            battleTeam.totalCount
        );

        let positionIndex = 0;

        // 生成单位
        for (const unitConfig of teamConfig.unit_configs) {
            for (let i = 0; i < unitConfig.count; i++) {
                const spawnPos = spawnPositions[positionIndex] || teamConfig.spawn_area;
                
                // 延迟生成
                if (unitConfig.spawn_delay && unitConfig.spawn_delay > 0) {
                    Timers.CreateTimer(unitConfig.spawn_delay, () => {
                        this.spawnUnit(unitConfig, spawnPos, team, battleTeam, groupId);
                    });
                } else {
                    this.spawnUnit(unitConfig, spawnPos, team, battleTeam, groupId);
                }
                
                positionIndex++;
            }
        }

        return battleTeam;
    }

    /**
     * 生成单个单位
     */
    private spawnUnit(
        unitConfig: UnitSpawnConfig,
        position: Vector,
        team: DotaTeam,
        battleTeam: BattleTeam,
        groupId: string
    ): void {
        const creationOptions: UnitCreationOptions = {
            position: position,
            team: team,
            customStats: unitConfig.custom_stats,
            level: unitConfig.level
        };

        const result = unitFactory.createUnit(unitConfig.unit_id, creationOptions);
        
        if (result.success && result.unit) {
            battleTeam.units.push(result.unit);
            battleTeam.spawnedCount++;
            
            if (this.currentBattle) {
                this.currentBattle.entities.add(result.unit);
            }
            
            // 注册到实体管理器
            this.entityManager.registerEntity(result.unit, {
                onDeath: () => this.onUnitDeath(result.unit!, battleTeam),
                onSpawn: () => this.onUnitSpawn(result.unit!, battleTeam)
            }, groupId);

            // 发送单位生成事件
            this.emitBattleEvent(BattleEventType.UNIT_SPAWNED, {
                unitId: result.unit.GetEntityIndex(),
                unitName: unitConfig.unit_id,
                team: team,
                groupId: groupId
            });
        }
    }

    /**
     * 计算生成位置
     */
    private calculateSpawnPositions(
        basePosition: Vector,
        formation: FormationType,
        unitCount: number
    ): Vector[] {
        const positions: Vector[] = [];
        
        switch (formation) {
            case FormationType.LINE:
                for (let i = 0; i < unitCount; i++) {
                    positions.push(Vector(basePosition.x + i * 150, basePosition.y, basePosition.z));
                }
                break;
                
            case FormationType.CIRCLE:
                const radius = Math.max(200, unitCount * 40);
                for (let i = 0; i < unitCount; i++) {
                    const angle = (i / unitCount) * 2 * Math.PI;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    positions.push(Vector(basePosition.x + x, basePosition.y + y, basePosition.z));
                }
                break;
                
            case FormationType.WEDGE:
                // V字形阵型
                for (let i = 0; i < unitCount; i++) {
                    const row = Math.floor(i / 2);
                    const side = i % 2 === 0 ? -1 : 1;
                    positions.push(Vector(basePosition.x + side * row * 100, basePosition.y + row * 150, basePosition.z));
                }
                break;

            case FormationType.GRID:
                const gridSize = Math.ceil(Math.sqrt(unitCount));
                for (let i = 0; i < unitCount; i++) {
                    const row = Math.floor(i / gridSize);
                    const col = i % gridSize;
                    positions.push(Vector(basePosition.x + col * 120, basePosition.y + row * 120, basePosition.z));
                }
                break;
                
            default:
                for (let i = 0; i < unitCount; i++) {
                    const randomOffset = RandomVector(200);
                    positions.push(Vector(basePosition.x + randomOffset.x, basePosition.y + randomOffset.y, basePosition.z));
                }
        }
        
        return positions;
    }

    /**
     * 设置战斗AI
     */
    private setupBattleAI(): void {
        if (!this.currentBattle) return;

        // 为队伍1设置AI，目标是队伍2
        this.entityManager.setGroupAI('team1', 'team2', {
            aggressionLevel: 70,
            attackRange: 800,
            updateInterval: 1.0
        });

        // 为队伍2设置AI，目标是队伍1
        this.entityManager.setGroupAI('team2', 'team1', {
            aggressionLevel: 70,
            attackRange: 800,
            updateInterval: 1.0
        });

        print('[BattleManager] Battle AI configured');
    }

    /**
     * 开始对战监控
     */
    private startBattleMonitoring(): void {
        if (!this.currentBattle) return;

        const battle = this.currentBattle;
        
        // 创建监控定时器
        const monitoringTimer = Timers.CreateTimer(1.0, () => {
            if (!this.currentBattle || this.currentBattle.status !== BattleStatus.FIGHTING) {
                return null; // 停止监控
            }

            // 更新剩余时间
            if (this.currentBattle.timeRemaining !== undefined) {
                this.currentBattle.timeRemaining -= 1;
                
                // 时间警告
                if (this.currentBattle.timeRemaining === 30) {
                    this.emitBattleEvent(BattleEventType.TIME_WARNING, {
                        timeRemaining: 30
                    });
                }
                
                // 时间到
                if (this.currentBattle.timeRemaining <= 0) {
                    this.checkTimeLimit();
                    return null;
                }
            }

            // 检查胜利条件
            this.checkBattleEnd();

            return 1.0; // 每秒检查一次
        });

        // 保存定时器ID
        (battle as any).__monitoringTimer = monitoringTimer;
    }

    /**
     * 单位生成处理
     */
    private onUnitSpawn(unit: CDOTA_BaseNPC, team: BattleTeam): void {
        print(`[BattleManager] Unit spawned: ${unit.GetUnitName()} for team ${team.name}`);
    }

    /**
     * 单位死亡处理
     */
    private onUnitDeath(unit: CDOTA_BaseNPC, team: BattleTeam): void {
        // 从队伍中移除死亡单位
        team.units = team.units.filter(u => u !== unit);
        
        // 检查队伍是否全灭
        const aliveUnits = team.units.filter(u => u && !u.IsNull() && u.IsAlive());
        if (aliveUnits.length === 0) {
            team.isAlive = false;
            
            // 发送队伍全灭事件
            this.emitBattleEvent(BattleEventType.TEAM_ELIMINATED, {
                team: team.team,
                teamName: team.name
            });
        }

        // 发送单位死亡事件
        this.emitBattleEvent(BattleEventType.UNIT_DIED, {
            unitId: unit.GetEntityIndex(),
            unitName: unit.GetUnitName(),
            team: team.team,
            remainingUnits: aliveUnits.length
        });

        // 检查对战结束
        this.checkBattleEnd();
    }

    /**
     * 检查对战结束
     */
    private checkBattleEnd(): void {
        if (!this.currentBattle || this.currentBattle.status !== BattleStatus.FIGHTING) {
            return;
        }

        const { levelConfig } = this.currentBattle;

        // 根据胜利条件检查
        switch (levelConfig.win_condition) {
            case WinConditionType.ELIMINATE_ALL:
                this.checkEliminateAllCondition();
                break;
                
            case WinConditionType.SURVIVE_TIME:
                this.checkSurviveTimeCondition();
                break;
                
            // 可以添加更多胜利条件
            default:
                this.checkEliminateAllCondition();
        }
    }

    /**
     * 检查全歼胜利条件
     */
    private checkEliminateAllCondition(): void {
        if (!this.currentBattle) return;

        const team1 = this.currentBattle.teams.get(DotaTeam.GOODGUYS);
        const team2 = this.currentBattle.teams.get(DotaTeam.BADGUYS);

        if (!team1?.isAlive && team2?.isAlive) {
            this.endBattle(DotaTeam.BADGUYS);
        } else if (team1?.isAlive && !team2?.isAlive) {
            this.endBattle(DotaTeam.GOODGUYS);
        } else if (!team1?.isAlive && !team2?.isAlive) {
            this.endBattle(null); // 平局
        }
    }

    /**
     * 检查生存时间条件
     */
    private checkSurviveTimeCondition(): void {
        if (!this.currentBattle) return;

        // 如果时间到了，检查哪个队伍还活着
        if (this.currentBattle.timeRemaining !== undefined && this.currentBattle.timeRemaining <= 0) {
            const team1 = this.currentBattle.teams.get(DotaTeam.GOODGUYS);
            const team2 = this.currentBattle.teams.get(DotaTeam.BADGUYS);

            if (team1?.isAlive && !team2?.isAlive) {
                this.endBattle(DotaTeam.GOODGUYS);
            } else if (!team1?.isAlive && team2?.isAlive) {
                this.endBattle(DotaTeam.BADGUYS);
            } else if (team1?.isAlive && team2?.isAlive) {
                // 都活着，比较剩余单位数量
                const team1Count = team1.units.filter(u => u && !u.IsNull() && u.IsAlive()).length;
                const team2Count = team2.units.filter(u => u && !u.IsNull() && u.IsAlive()).length;
                
                if (team1Count > team2Count) {
                    this.endBattle(DotaTeam.GOODGUYS);
                } else if (team2Count > team1Count) {
                    this.endBattle(DotaTeam.BADGUYS);
                } else {
                    this.endBattle(null); // 平局
                }
            } else {
                this.endBattle(null); // 都死了，平局
            }
        }
    }

    /**
     * 检查时间限制
     */
    private checkTimeLimit(): void {
        if (!this.currentBattle) return;

        // 时间到，根据胜利条件处理
        if (this.currentBattle.levelConfig.win_condition === WinConditionType.SURVIVE_TIME) {
            this.checkSurviveTimeCondition();
        } else {
            // 其他条件下，时间到算平局
            this.endBattle(null);
        }
    }

    /**
     * 结束对战
     */
    public endBattle(winner: DotaTeam | null): void {
        if (!this.currentBattle) return;

        print(`[BattleManager] Ending battle. Winner: ${winner ? `Team ${winner}` : 'Draw'}`);

        this.currentBattle.status = BattleStatus.FINISHED;
        this.currentBattle.winner = winner;
        this.currentBattle.endTime = getTimestampMs();

        // 停止监控定时器
        const monitoringTimer = (this.currentBattle as any).__monitoringTimer;
        if (monitoringTimer) {
            Timers.RemoveTimer(monitoringTimer);
        }

        // 创建对战结果
        const result = this.createBattleResult();

        // 保存结果
        this.saveBattleResult(result);

        // 发送对战结束事件
        this.emitBattleEvent(BattleEventType.BATTLE_ENDED, result);

        // 通知UI
        (CustomGameEventManager.Send_ServerToAllClients as any)('battle_ended', {
            result: result,
            showLevelSelection: true
        });

        print(`[BattleManager] Battle ended successfully`);
    }

    /**
     * 创建对战结果
     */
    private createBattleResult(): BattleResult {
        if (!this.currentBattle) {
            throw new Error('No current battle');
        }

        return {
            battleId: this.currentBattle.id,
            levelId: this.currentBattle.levelConfig.level_id,
            levelName: this.currentBattle.levelConfig.level_name,
            winner: this.currentBattle.winner,
            duration: (this.currentBattle.endTime || getTimestampMs()) - this.currentBattle.startTime,
            timestamp: getTimestampMs(),
            teams: Array.from(this.currentBattle.teams.values()).map(team => ({
                configId: team.configId,
                team: team.team,
                name: team.name,
                unitsAlive: team.units.filter(u => u && !u.IsNull() && u.IsAlive()).length,
                totalUnits: team.totalCount,
                isWinner: team.team === this.currentBattle?.winner
            })),
            rewards: this.currentBattle.levelConfig.rewards
        };
    }

    /**
     * 保存对战结果
     */
    private saveBattleResult(result: BattleResult): void {
        this.battleHistory.push(result);
        
        // 限制历史记录数量
        if (this.battleHistory.length > 50) {
            this.battleHistory = this.battleHistory.slice(-50);
        }
        
        // 同步到网络表
        if (GameRules.XNetTable) {
            GameRules.XNetTable.SetTableValue('battle_system', 'current_battle', {
                battleId: result.battleId,
                status: 'ended',
                levelId: result.levelId || '',
                levelName: '',
                timestamp: getTimestampMs()
            });
            (GameRules.XNetTable as any).SetTableValue('battle_system', 'latest_result', result);
            (GameRules.XNetTable as any).SetTableValue('battle_system', 'battle_history', {
                battles: this.battleHistory.slice(-10), // 只同步最近10场
                totalBattles: this.battleHistory.length
            });
        }
    }

    /**
     * 清理当前对战
     */
    private async cleanupCurrentBattle(): Promise<void> {
        if (!this.currentBattle) return;

        print('[BattleManager] Cleaning up current battle');

        // 停止监控定时器
        const monitoringTimer = (this.currentBattle as any).__monitoringTimer;
        if (monitoringTimer) {
            Timers.RemoveTimer(monitoringTimer);
        }

        // 清理所有实体
        this.entityManager.cleanupGroup('team1', true);
        this.entityManager.cleanupGroup('team2', true);

        // 清理对战数据
        this.currentBattle = null;

        print('[BattleManager] Battle cleanup completed');
    }

    /**
     * 发送对战事件
     */
    private emitBattleEvent(eventType: BattleEventType, data: any): void {
        const event: BattleEvent = {
            type: eventType,
            battleId: this.currentBattle?.id || '',
            timestamp: Date.now(),
            data: data
        };

        // 调用注册的监听器
        const listeners = this.eventListeners.get(eventType);
        if (listeners) {
            for (const listener of listeners) {
                try {
                    listener(event);
                } catch (error) {
                    print(`[BattleManager] Error in event listener: ${error}`);
                }
            }
        }

        // 发送到客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('battle_event', event);
    }

    /**
     * 注册事件监听器
     */
    public addEventListener(eventType: BattleEventType, listener: (event: BattleEvent) => void): void {
        if (!this.eventListeners.has(eventType)) {
            this.eventListeners.set(eventType, []);
        }
        this.eventListeners.get(eventType)!.push(listener);
    }

    /**
     * 移除事件监听器
     */
    public removeEventListener(eventType: BattleEventType, listener: (event: BattleEvent) => void): void {
        const listeners = this.eventListeners.get(eventType);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }

    /**
     * 生成对战ID
     */
    private generateBattleId(): string {
        return `battle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 获取当前对战
     */
    public getCurrentBattle(): Battle | null {
        return this.currentBattle;
    }

    /**
     * 获取对战历史
     */
    public getBattleHistory(): BattleResult[] {
        return [...this.battleHistory];
    }

    /**
     * 获取对战统计
     */
    public getBattleStats(): any {
        const stats = {
            totalBattles: this.battleHistory.length,
            winsByTeam: { [DotaTeam.GOODGUYS]: 0, [DotaTeam.BADGUYS]: 0, draws: 0 },
            averageDuration: 0,
            levelStats: {} as Record<string, number>
        };

        let totalDuration = 0;

        for (const battle of this.battleHistory) {
            // 统计胜负
            if (battle.winner === DotaTeam.GOODGUYS) {
                stats.winsByTeam[DotaTeam.GOODGUYS]++;
            } else if (battle.winner === DotaTeam.BADGUYS) {
                stats.winsByTeam[DotaTeam.BADGUYS]++;
            } else {
                stats.winsByTeam.draws++;
            }

            // 统计时长
            totalDuration += battle.duration;

            // 统计关卡
            stats.levelStats[battle.levelId] = (stats.levelStats[battle.levelId] || 0) + 1;
        }

        if (this.battleHistory.length > 0) {
            stats.averageDuration = totalDuration / this.battleHistory.length;
        }

        return stats;
    }

    /**
     * 强制停止当前对战
     */
    public forceStopBattle(): void {
        if (this.currentBattle) {
            this.currentBattle.status = BattleStatus.CANCELLED;
            this.cleanupCurrentBattle();
            print('[BattleManager] Battle force stopped');
        }
    }

    /**
     * 暂停/恢复对战
     */
    public pauseBattle(pause: boolean): void {
        if (!this.currentBattle) return;

        if (pause && this.currentBattle.status === BattleStatus.FIGHTING) {
            this.currentBattle.status = BattleStatus.PAUSED;
            print('[BattleManager] Battle paused');
        } else if (!pause && this.currentBattle.status === BattleStatus.PAUSED) {
            this.currentBattle.status = BattleStatus.FIGHTING;
            print('[BattleManager] Battle resumed');
        }
    }
}
