/**
 * 训练模式核心逻辑 - 练功房模式的主要功能实现
 * Training Mode Core - Main functionality for training room mode
 */

import { GameMode, GameModeManager } from './GameModeManager';

export interface TrainingSettings {
    autoRespawn: boolean;
    infiniteResources: boolean;
    noCooldowns: boolean;
    fastLevelUp: boolean;
    showDamageNumbers: boolean;
    pauseAfterKill: boolean;
    enableTargetDummies: boolean;
}

export interface TestScenario {
    id: string;
    name: string;
    description: string;
    monsters: Array<{
        unitName: string;
        count: number;
        level?: number;
        position?: Vector;
        customStats?: any;
    }>;
    environment?: {
        timeOfDay?: number;
        weather?: string;
        terrain?: string;
    };
    objectives?: Array<{
        type: 'kill_all' | 'survive_time' | 'damage_test';
        target?: number;
        description: string;
    }>;
}

export class TrainingMode {
    private static instance: TrainingMode;
    private settings: TrainingSettings;
    private activeScenario: TestScenario | null = null;
    private spawnedUnits: CDOTA_BaseNPC[] = [];
    private testStartTime: number = 0;
    private isActive: boolean = false;

    private constructor() {
        this.settings = this.getDefaultSettings();
        this.initializeTrainingMode();
        print('[TrainingMode] Initialized');
    }

    public static getInstance(): TrainingMode {
        if (!TrainingMode.instance) {
            TrainingMode.instance = new TrainingMode();
        }
        return TrainingMode.instance;
    }

    /**
     * 激活训练模式
     */
    public activate(): void {
        if (this.isActive) {
            print('[TrainingMode] Already active');
            return;
        }

        const gameModeManager = GameModeManager.getInstance();
        if (!gameModeManager.isTrainingMode()) {
            print('[TrainingMode] Game is not in training mode');
            return;
        }

        this.isActive = true;
        this.setupTrainingEnvironment();
        this.registerEvents();
        
        print('[TrainingMode] Activated');
        
        // 同步状态到网络表
        this.syncStatusToNetTable();
    }

    /**
     * 停用训练模式
     */
    public deactivate(): void {
        if (!this.isActive) {
            return;
        }

        this.isActive = false;
        this.cleanupSpawnedUnits();
        this.unregisterEvents();
        
        print('[TrainingMode] Deactivated');
        
        // 同步状态到网络表
        this.syncStatusToNetTable();
    }

    /**
     * 开始测试场景
     */
    public startTestScenario(scenarioId: string): boolean {
        const scenario = this.getTestScenario(scenarioId);
        if (!scenario) {
            print(`[TrainingMode] Unknown test scenario: ${scenarioId}`);
            return false;
        }

        // 清理之前的测试
        this.stopCurrentTest();

        this.activeScenario = scenario;
        this.testStartTime = GameRules.GetGameTime();

        // 设置环境
        if (scenario.environment) {
            this.setupTestEnvironment(scenario.environment);
        }

        // 生成怪物
        this.spawnTestMonsters(scenario.monsters);

        print(`[TrainingMode] Started test scenario: ${scenario.name}`);
        
        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('training_scenario_started', {
            scenario: scenario,
            startTime: this.testStartTime
        });

        return true;
    }

    /**
     * 停止当前测试
     */
    public stopCurrentTest(): void {
        if (!this.activeScenario) {
            return;
        }

        const scenario = this.activeScenario;
        const duration = GameRules.GetGameTime() - this.testStartTime;

        // 清理生成的单位
        this.cleanupSpawnedUnits();

        // 重置环境
        this.resetTestEnvironment();

        print(`[TrainingMode] Stopped test scenario: ${scenario.name} (Duration: ${duration.toFixed(1)}s)`);

        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('training_scenario_stopped', {
            scenario: scenario,
            duration: duration,
            completed: false
        });

        this.activeScenario = null;
        this.testStartTime = 0;
    }

    /**
     * 生成测试怪物
     */
    private spawnTestMonsters(monsters: Array<any>): void {
        for (const monsterData of monsters) {
            const position = monsterData.position || this.getRandomSpawnPosition();
            
            for (let i = 0; i < monsterData.count; i++) {
                const spawnPos = Vector(
                    position.x + RandomFloat(-200, 200),
                    position.y + RandomFloat(-200, 200),
                    position.z
                );

                const unit = this.spawnMonster(monsterData.unitName, spawnPos, {
                    level: monsterData.level || 1,
                    customStats: monsterData.customStats
                });

                if (unit) {
                    this.spawnedUnits.push(unit);
                }
            }
        }

        print(`[TrainingMode] Spawned ${this.spawnedUnits.length} test units`);
    }

    /**
     * 生成单个怪物
     */
    private spawnMonster(unitName: string, position: Vector, options: any = {}): CDOTA_BaseNPC | null {
        try {
            const unit = CreateUnitByName(
                unitName,
                position,
                true,
                null,
                null,
                DotaTeam.BADGUYS
            );

            if (!unit || unit.IsNull()) {
                print(`[TrainingMode] Failed to spawn unit: ${unitName}`);
                return null;
            }

            // 设置等级
            if (options.level && options.level > 1) {
                if (unit.IsHero()) {
                    for (let i = 1; i < options.level; i++) {
                        (unit as CDOTA_BaseNPC_Hero).HeroLevelUp(false);
                    }
                }
            }

            // 应用自定义属性
            if (options.customStats) {
                this.applyCustomStats(unit, options.customStats);
            }

            // 设置AI行为
            unit.SetInitialGoalEntity(this.getPlayerHero());

            return unit;
        } catch (error) {
            print(`[TrainingMode] Error spawning unit ${unitName}: ${error}`);
            return null;
        }
    }

    /**
     * 应用自定义属性
     */
    private applyCustomStats(unit: CDOTA_BaseNPC, stats: any): void {
        try {
            if (stats.health) {
                unit.SetMaxHealth(stats.health);
                unit.SetHealth(stats.health);
            }
            
            if (stats.mana) {
                unit.SetMana(stats.mana);
            }
            
            if (stats.damage) {
                unit.SetBaseDamageMin(stats.damage);
                unit.SetBaseDamageMax(stats.damage);
            }
            
            if (stats.armor) {
                unit.SetPhysicalArmorBaseValue(stats.armor);
            }
            
            if (stats.magicResistance) {
                unit.SetBaseMagicalResistanceValue(stats.magicResistance);
            }
            
            if (stats.moveSpeed) {
                unit.SetBaseMoveSpeed(stats.moveSpeed);
            }

        } catch (error) {
            print(`[TrainingMode] Error applying custom stats: ${error}`);
        }
    }

    /**
     * 清理生成的单位
     */
    private cleanupSpawnedUnits(): void {
        for (const unit of this.spawnedUnits) {
            if (unit && !unit.IsNull()) {
                unit.RemoveSelf();
            }
        }
        this.spawnedUnits = [];
    }

    /**
     * 获取随机生成位置
     */
    private getRandomSpawnPosition(): Vector {
        const hero = this.getPlayerHero();
        if (hero) {
            const heroPos = hero.GetAbsOrigin();
            return Vector(
                heroPos.x + RandomFloat(-800, 800),
                heroPos.y + RandomFloat(-800, 800),
                heroPos.z
            );
        }
        
        // 默认位置
        return Vector(0, 0, 256);
    }

    /**
     * 获取玩家英雄
     */
    private getPlayerHero(): CDOTA_BaseNPC | null {
        const player = PlayerResource.GetPlayer(0);
        if (player) {
            return player.GetAssignedHero();
        }
        return null;
    }

    /**
     * 设置训练环境
     */
    private setupTrainingEnvironment(): void {
        // 应用训练设置
        if (this.settings.infiniteResources) {
            this.enableInfiniteResources();
        }
        
        if (this.settings.noCooldowns) {
            this.enableNoCooldowns();
        }
        
        if (this.settings.autoRespawn) {
            this.enableAutoRespawn();
        }

        // 生成目标假人
        if (this.settings.enableTargetDummies) {
            this.spawnTargetDummies();
        }
    }

    /**
     * 启用无限资源
     */
    private enableInfiniteResources(): void {
        // 给所有玩家无限金币和经验
        const playerCount = PlayerResource.GetPlayerCount();
        for (let playerId = 0; playerId < playerCount; playerId++) {
            if (PlayerResource.IsValidPlayer(playerId)) {
                PlayerResource.SetGold(playerId, 99999, true);
            }
        }
    }

    /**
     * 启用无CD
     */
    private enableNoCooldowns(): void {
        // 这里可以添加修饰符来移除技能CD
        const hero = this.getPlayerHero();
        if (hero) {
            hero.AddNewModifier(hero, null, 'modifier_dummy_no_cooldown', {});
        }
    }

    /**
     * 启用自动复活
     */
    private enableAutoRespawn(): void {
        // 在事件监听中处理
    }

    /**
     * 生成目标假人
     */
    private spawnTargetDummies(): void {
        const hero = this.getPlayerHero();
        if (!hero) return;

        const heroPos = hero.GetAbsOrigin();
        const positions = [
            Vector(heroPos.x + 500, heroPos.y, heroPos.z),
            Vector(heroPos.x - 500, heroPos.y, heroPos.z),
            Vector(heroPos.x, heroPos.y + 500, heroPos.z),
            Vector(heroPos.x, heroPos.y - 500, heroPos.z)
        ];

        for (const pos of positions) {
            const dummy = CreateUnitByName(
                'npc_dota_training_dummy',
                pos,
                true,
                null,
                null,
                DotaTeam.NEUTRALS
            );

            if (dummy) {
                this.spawnedUnits.push(dummy);
            }
        }
    }

    /**
     * 设置测试环境
     */
    private setupTestEnvironment(environment: any): void {
        if (environment.timeOfDay !== undefined) {
            GameRules.SetTimeOfDay(environment.timeOfDay);
        }
        
        // TODO: 实现天气和地形设置
    }

    /**
     * 重置测试环境
     */
    private resetTestEnvironment(): void {
        GameRules.SetTimeOfDay(0.25); // 重置为白天
    }

    /**
     * 注册事件监听
     */
    private registerEvents(): void {
        ListenToGameEvent('entity_killed', (event) => this.onEntityKilled(event), this);
        ListenToGameEvent('dota_player_killed', (event) => this.onPlayerKilled(event), this);
    }

    /**
     * 取消注册事件
     */
    private unregisterEvents(): void {
        // StopListeningToGameEvent('entity_killed'); // 需要事件ID
        // StopListeningToGameEvent('dota_player_killed'); // 需要事件ID
    }

    /**
     * 实体死亡事件
     */
    private onEntityKilled(event: any): void {
        const killedUnit = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC;
        
        if (this.spawnedUnits.includes(killedUnit)) {
            this.onTestUnitKilled(killedUnit);
        }
    }

    /**
     * 测试单位死亡处理
     */
    private onTestUnitKilled(unit: CDOTA_BaseNPC): void {
        // 从列表中移除
        const index = this.spawnedUnits.indexOf(unit);
        if (index > -1) {
            this.spawnedUnits.splice(index, 1);
        }

        // 检查是否完成测试
        if (this.activeScenario && this.spawnedUnits.length === 0) {
            this.onTestScenarioCompleted();
        }

        // 发送击杀通知
        (CustomGameEventManager.Send_ServerToAllClients as any)('training_unit_killed', {
            unitName: unit.GetUnitName(),
            remainingUnits: this.spawnedUnits.length
        });
    }

    /**
     * 测试场景完成
     */
    private onTestScenarioCompleted(): void {
        if (!this.activeScenario) return;

        const duration = GameRules.GetGameTime() - this.testStartTime;
        const scenario = this.activeScenario;

        print(`[TrainingMode] Test scenario completed: ${scenario.name} in ${duration.toFixed(1)}s`);

        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('training_scenario_completed', {
            scenario: scenario,
            duration: duration,
            success: true
        });

        // 暂停游戏（如果启用）
        if (this.settings.pauseAfterKill) {
            SendToServerConsole('dota_pause');
        }

        this.activeScenario = null;
        this.testStartTime = 0;
    }

    /**
     * 玩家死亡事件
     */
    private onPlayerKilled(event: any): void {
        if (this.settings.autoRespawn) {
            const playerId = event.PlayerID;
            const hero = PlayerResource.GetSelectedHeroEntity(playerId);
            
            if (hero) {
                // 1秒后复活
                Timers.CreateTimer(1.0, () => {
                    hero.RespawnHero(false, false);
                    return null;
                });
            }
        }
    }

    /**
     * 初始化训练模式
     */
    private initializeTrainingMode(): void {
        // 等待游戏开始后激活
        Timers.CreateTimer(1.0, () => {
            const gameModeManager = GameModeManager.getInstance();
            if (gameModeManager.isTrainingMode()) {
                this.activate();
            }
            return null;
        });
    }

    /**
     * 同步状态到网络表
     */
    private syncStatusToNetTable(): void {
        if (GameRules.XNetTable) {
            GameRules.XNetTable.SetTableValue('training_mode', 'status', {
                isActive: this.isActive,
                settings: this.settings,
                activeScenario: this.activeScenario,
                spawnedUnitsCount: this.spawnedUnits.length,
                testDuration: this.activeScenario ? GameRules.GetGameTime() - this.testStartTime : 0,
                timestamp: Date.now()
            });
        }
    }

    /**
     * 获取默认设置
     */
    private getDefaultSettings(): TrainingSettings {
        return {
            autoRespawn: true,
            infiniteResources: true,
            noCooldowns: false,
            fastLevelUp: true,
            showDamageNumbers: true,
            pauseAfterKill: false,
            enableTargetDummies: true
        };
    }

    /**
     * 获取测试场景
     */
    private getTestScenario(scenarioId: string): TestScenario | null {
        // TODO: 从配置文件或数据库加载
        const scenarios: Record<string, TestScenario> = {
            'basic_combat': {
                id: 'basic_combat',
                name: '基础战斗测试',
                description: '生成几个基础怪物进行战斗测试',
                monsters: [
                    {
                        unitName: 'npc_dota_neutral_kobold',
                        count: 3,
                        level: 1
                    }
                ],
                objectives: [
                    {
                        type: 'kill_all',
                        description: '击杀所有怪物'
                    }
                ]
            },
            'damage_test': {
                id: 'damage_test',
                name: '伤害测试',
                description: '测试技能伤害的固定目标',
                monsters: [
                    {
                        unitName: 'npc_dota_training_dummy',
                        count: 1,
                        level: 1,
                        customStats: {
                            health: 10000,
                            armor: 0,
                            magicResistance: 0
                        }
                    }
                ]
            }
        };

        return scenarios[scenarioId] || null;
    }

    /**
     * 更新设置
     */
    public updateSettings(newSettings: Partial<TrainingSettings>): void {
        this.settings = { ...this.settings, ...newSettings };
        
        if (this.isActive) {
            this.setupTrainingEnvironment();
        }
        
        this.syncStatusToNetTable();
    }

    /**
     * 获取状态
     */
    public getStatus(): any {
        return {
            isActive: this.isActive,
            settings: this.settings,
            activeScenario: this.activeScenario,
            spawnedUnitsCount: this.spawnedUnits.length,
            testDuration: this.activeScenario ? GameRules.GetGameTime() - this.testStartTime : 0
        };
    }
}