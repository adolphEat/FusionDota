/**
 * 训练模式核心逻辑 - 练功房模式的主要功能实现
 * Training Mode Core - Main functionality for training room mode
 */

import { GameMode, GameModeManager } from './GameModeManager';

export interface TrainingSettings {
    infiniteResources: boolean;
    noCooldowns: boolean;
    fastLevelUp: boolean;
    showDamageNumbers: boolean;
    pauseAfterKill: boolean;
    enableTargetDummies: boolean;
    autoRegeneration: boolean;    // 自动回血回蓝
    customCooldowns: boolean;     // 自定义技能CD
    cooldownSeconds: number;      // CD秒数
    autoRespawn: boolean;         // 自动重生
}

export interface AutoSpawnConfig {
    enabled: boolean;
    unitType: string;
    count: number;
    level: number;
    interval: number; // 秒
    maxUnits: number;
    spawnRadius: number;
    playerRadius: number;
    increaseDifficulty: boolean;
}

export interface AutoDummyConfig {
    enabled: boolean;
    count: number;
    health: number;
    invulnerable: boolean;
    positions: Vector[];
    autoRespawn: boolean;
    respawnDelay: number; // 秒
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
    
    // 自动刷新系统
    private autoSpawnConfig: AutoSpawnConfig;
    private autoDummyConfig: AutoDummyConfig;
    private autoSpawnTimer: any = null;
    private autoDummyTimer: any = null;
    private autoSpawnedUnits: CDOTA_BaseNPC[] = [];
    private autoDummies: CDOTA_BaseNPC[] = [];
    private spawnCounter: number = 0;
    
    // 自动回血回蓝和CD系统
    private regenTimer: any = null;
    private cooldownTimer: any = null;

    private constructor() {
        this.settings = this.getDefaultSettings();
        this.autoSpawnConfig = this.getDefaultAutoSpawnConfig();
        this.autoDummyConfig = this.getDefaultAutoDummyConfig();
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
        this.stopAutoSpawn();
        this.stopAutoDummy();
        this.disableAutoRegeneration();
        this.disableCustomCooldowns();
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

        // 启用自动回血回蓝
        if (this.settings.autoRegeneration) {
            this.enableAutoRegeneration();
        }

        // 启用自定义技能CD
        if (this.settings.customCooldowns) {
            this.enableCustomCooldowns();
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
        print('[TrainingMode] Setting up delayed initialization...');
        
        // 等待游戏开始后激活
        Timers.CreateTimer(1.0, () => {
            print('[TrainingMode] ===== 1-second initialization checkpoint =====');
            print(`[TrainingMode] GameRules.GameModeManager exists: ${GameRules.GameModeManager ? 'YES' : 'NO'}`);
            
            const gameModeManager = GameModeManager.getInstance();
            print(`[TrainingMode] GameModeManager instance obtained: ${gameModeManager ? 'YES' : 'NO'}`);
            
            if (gameModeManager && gameModeManager.isTrainingMode()) {
                print('[TrainingMode] Training mode detected, activating...');
                this.activate();
            } else {
                print('[TrainingMode] Not in training mode or GameModeManager unavailable');
                print(`[TrainingMode] Current mode: ${gameModeManager ? gameModeManager.getCurrentMode() : 'unknown'}`);
            }
            return null;
        });
        
        // 额外的监控定时器
        Timers.CreateTimer(5.0, () => {
            print('[TrainingMode] ===== 5-second status check =====');
            print(`[TrainingMode] Is active: ${this.isActive}`);
            print(`[TrainingMode] Settings: autoRespawn=${this.settings.autoRespawn}, infiniteResources=${this.settings.infiniteResources}`);
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
            enableTargetDummies: true,
            autoRegeneration: true,    // 默认启用自动回血回蓝
            customCooldowns: true,     // 默认启用自定义CD
            cooldownSeconds: 3         // 默认3秒CD
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
            testDuration: this.activeScenario ? GameRules.GetGameTime() - this.testStartTime : 0,
            autoSpawn: {
                enabled: this.autoSpawnConfig.enabled,
                unitsCount: this.autoSpawnedUnits.length,
                config: this.autoSpawnConfig
            },
            autoDummy: {
                enabled: this.autoDummyConfig.enabled,
                dummiesCount: this.autoDummies.length,
                config: this.autoDummyConfig
            },
            autoRegeneration: {
                enabled: this.settings.autoRegeneration,
                active: this.regenTimer !== null
            },
            customCooldowns: {
                enabled: this.settings.customCooldowns,
                active: this.cooldownTimer !== null,
                seconds: this.settings.cooldownSeconds
            }
        };
    }

    /**
     * 开始自动刷怪
     */
    public startAutoSpawn(config: Partial<AutoSpawnConfig> = {}): boolean {
        if (!this.isActive) {
            print('[TrainingMode] Training mode is not active');
            return false;
        }

        // 停止现有的自动刷怪
        this.stopAutoSpawn();

        // 更新配置
        this.autoSpawnConfig = { ...this.autoSpawnConfig, ...config, enabled: true };

        // 验证配置
        if (!this.validateAutoSpawnConfig()) {
            return false;
        }

        // 立即刷新一次
        this.performAutoSpawn();

        // 启动定时器
        this.autoSpawnTimer = Timers.CreateTimer(this.autoSpawnConfig.interval, () => {
            if (this.autoSpawnConfig.enabled) {
                this.performAutoSpawn();
                return this.autoSpawnConfig.interval;
            }
            return null;
        });

        print(`[TrainingMode] Auto spawn started: ${this.autoSpawnConfig.unitType} every ${this.autoSpawnConfig.interval}s`);
        this.syncStatusToNetTable();
        return true;
    }

    /**
     * 停止自动刷怪
     */
    public stopAutoSpawn(): void {
        this.autoSpawnConfig.enabled = false;
        
        if (this.autoSpawnTimer) {
            Timers.RemoveTimer(this.autoSpawnTimer);
            this.autoSpawnTimer = null;
        }

        print('[TrainingMode] Auto spawn stopped');
        this.syncStatusToNetTable();
    }

    /**
     * 执行自动刷怪
     */
    private performAutoSpawn(): void {
        // 检查单位数量限制
        this.cleanupDeadAutoSpawnedUnits();
        
        if (this.autoSpawnedUnits.length >= this.autoSpawnConfig.maxUnits) {
            return; // 已达到最大数量
        }

        const hero = this.getPlayerHero();
        if (!hero) {
            return;
        }

        const heroPos = hero.GetAbsOrigin();
        const spawnCount = Math.min(
            this.autoSpawnConfig.count,
            this.autoSpawnConfig.maxUnits - this.autoSpawnedUnits.length
        );

        for (let i = 0; i < spawnCount; i++) {
            const spawnPos = this.getAutoSpawnPosition(heroPos);
            const level = this.calculateAutoSpawnLevel();
            
            const unit = this.spawnMonster(this.autoSpawnConfig.unitType, spawnPos, { level });
            if (unit) {
                this.autoSpawnedUnits.push(unit);
            }
        }

        this.spawnCounter++;
        print(`[TrainingMode] Auto spawned ${spawnCount} units (Total: ${this.autoSpawnedUnits.length})`);
    }

    /**
     * 获取自动刷怪位置
     */
    private getAutoSpawnPosition(heroPos: Vector): Vector {
        const angle = RandomFloat(0, 2 * Math.PI);
        const distance = RandomFloat(
            this.autoSpawnConfig.playerRadius,
            this.autoSpawnConfig.playerRadius + this.autoSpawnConfig.spawnRadius
        );
        
        return Vector(
            heroPos.x + Math.cos(angle) * distance,
            heroPos.y + Math.sin(angle) * distance,
            heroPos.z
        );
    }

    /**
     * 计算自动刷怪等级
     */
    private calculateAutoSpawnLevel(): number {
        if (!this.autoSpawnConfig.increaseDifficulty) {
            return this.autoSpawnConfig.level;
        }

        // 每10波增加1级
        const bonusLevel = Math.floor(this.spawnCounter / 10);
        return this.autoSpawnConfig.level + bonusLevel;
    }

    /**
     * 清理死亡的自动刷新单位
     */
    private cleanupDeadAutoSpawnedUnits(): void {
        this.autoSpawnedUnits = this.autoSpawnedUnits.filter(unit => 
            unit && !unit.IsNull() && unit.IsAlive()
        );
    }

    /**
     * 验证自动刷怪配置
     */
    private validateAutoSpawnConfig(): boolean {
        const config = this.autoSpawnConfig;
        
        if (!config.unitType) {
            print('[TrainingMode] Auto spawn: Unit type is required');
            return false;
        }
        
        if (config.interval < 1) {
            print('[TrainingMode] Auto spawn: Interval must be at least 1 second');
            return false;
        }
        
        if (config.maxUnits < 1 || config.maxUnits > 50) {
            print('[TrainingMode] Auto spawn: Max units must be between 1 and 50');
            return false;
        }
        
        return true;
    }

    /**
     * 开始自动木桩
     */
    public startAutoDummy(config: Partial<AutoDummyConfig> = {}): boolean {
        if (!this.isActive) {
            print('[TrainingMode] Training mode is not active');
            return false;
        }

        // 停止现有的自动木桩
        this.stopAutoDummy();

        // 更新配置
        this.autoDummyConfig = { ...this.autoDummyConfig, ...config, enabled: true };

        // 初始化位置
        if (this.autoDummyConfig.positions.length === 0) {
            this.autoDummyConfig.positions = this.generateDummyPositions();
        }

        // 生成木桩
        this.spawnAutoDummies();

        // 启动监控定时器
        this.autoDummyTimer = Timers.CreateTimer(this.autoDummyConfig.respawnDelay, () => {
            if (this.autoDummyConfig.enabled && this.autoDummyConfig.autoRespawn) {
                this.checkAndRespawnDummies();
                return this.autoDummyConfig.respawnDelay;
            }
            return null;
        });

        print(`[TrainingMode] Auto dummy started: ${this.autoDummyConfig.count} dummies`);
        this.syncStatusToNetTable();
        return true;
    }

    /**
     * 停止自动木桩
     */
    public stopAutoDummy(): void {
        this.autoDummyConfig.enabled = false;
        
        if (this.autoDummyTimer) {
            Timers.RemoveTimer(this.autoDummyTimer);
            this.autoDummyTimer = null;
        }

        // 清理现有木桩
        this.cleanupAutoDummies();

        print('[TrainingMode] Auto dummy stopped');
        this.syncStatusToNetTable();
    }

    /**
     * 生成自动木桩
     */
    private spawnAutoDummies(): void {
        for (let i = 0; i < this.autoDummyConfig.count && i < this.autoDummyConfig.positions.length; i++) {
            const position = this.autoDummyConfig.positions[i];
            const dummy = this.createTrainingDummy(position);
            if (dummy) {
                this.autoDummies.push(dummy);
            }
        }
    }

    /**
     * 创建训练木桩
     */
    private createTrainingDummy(position: Vector): CDOTA_BaseNPC | null {
        try {
            const dummy = CreateUnitByName(
                'npc_dota_training_dummy',
                position,
                true,
                null,
                null,
                DotaTeam.NEUTRALS
            );

            if (!dummy || dummy.IsNull()) {
                return null;
            }

            // 设置血量
            dummy.SetMaxHealth(this.autoDummyConfig.health);
            dummy.SetHealth(this.autoDummyConfig.health);

            // 设置无敌状态
            if (this.autoDummyConfig.invulnerable) {
                dummy.AddNewModifier(dummy, null, 'modifier_invulnerable', {});
            }

            return dummy;
        } catch (error) {
            print(`[TrainingMode] Error creating training dummy: ${error}`);
            return null;
        }
    }

    /**
     * 生成木桩位置
     */
    private generateDummyPositions(): Vector[] {
        const hero = this.getPlayerHero();
        if (!hero) {
            return [];
        }

        const heroPos = hero.GetAbsOrigin();
        const positions: Vector[] = [];
        const radius = 400;
        
        // 生成圆形排列的位置
        for (let i = 0; i < this.autoDummyConfig.count; i++) {
            const angle = (i / this.autoDummyConfig.count) * 2 * Math.PI;
            positions.push(Vector(
                heroPos.x + Math.cos(angle) * radius,
                heroPos.y + Math.sin(angle) * radius,
                heroPos.z
            ));
        }

        return positions;
    }

    /**
     * 检查并重新生成木桩
     */
    private checkAndRespawnDummies(): void {
        // 清理死亡的木桩
        this.autoDummies = this.autoDummies.filter(dummy => 
            dummy && !dummy.IsNull() && dummy.IsAlive()
        );

        // 重新生成缺失的木桩
        const missingCount = this.autoDummyConfig.count - this.autoDummies.length;
        if (missingCount > 0) {
            for (let i = 0; i < missingCount; i++) {
                const positionIndex = this.autoDummies.length + i;
                if (positionIndex < this.autoDummyConfig.positions.length) {
                    const position = this.autoDummyConfig.positions[positionIndex];
                    const dummy = this.createTrainingDummy(position);
                    if (dummy) {
                        this.autoDummies.push(dummy);
                    }
                }
            }
            print(`[TrainingMode] Respawned ${missingCount} training dummies`);
        }
    }

    /**
     * 清理自动木桩
     */
    private cleanupAutoDummies(): void {
        for (const dummy of this.autoDummies) {
            if (dummy && !dummy.IsNull()) {
                dummy.RemoveSelf();
            }
        }
        this.autoDummies = [];
    }

    /**
     * 刷新野怪
     */
    public spawnNeutrals(): void {
        print('[TrainingMode] Spawning neutral camps...');
        
        // 查找所有中性野怪营地
        const neutralSpawners = Entities.FindAllByClassname('trigger_neutral_camp');
        let spawnedCamps = 0;
        
        for (const spawner of neutralSpawners) {
            if (spawner && !spawner.IsNull()) {
                // 触发野怪刷新
                spawner.Trigger();
                spawnedCamps++;
            }
        }
        
        print(`[TrainingMode] Spawned ${spawnedCamps} neutral camps`);
    }

    /**
     * 刷新小兵
     */
    public spawnCreeps(): void {
        print('[TrainingMode] Spawning lane creeps...');
        
        // 触发三路小兵刷新
        const creepDirectors = Entities.FindAllByClassname('dota_data_dire_tower');
        
        // 使用游戏事件触发小兵刷新
        GameRules.SpawnNeutralCreeps();
        
        print('[TrainingMode] Lane creeps spawned');
    }

    /**
     * 创建英雄
     */
    public createHero(heroName: string, position?: Vector): CDOTA_BaseNPC_Hero | null {
        try {
            const spawnPos = position || this.getRandomSpawnPosition();
            
            const hero = CreateUnitByName(
                heroName,
                spawnPos,
                true,
                null,
                null,
                DotaTeam.BADGUYS
            ) as CDOTA_BaseNPC_Hero;

            if (!hero || hero.IsNull() || !hero.IsHero()) {
                print(`[TrainingMode] Failed to create hero: ${heroName}`);
                return null;
            }

            // 设置为AI控制
            hero.SetControllableByPlayer(0, false);
            
            print(`[TrainingMode] Created hero: ${heroName}`);
            return hero;
        } catch (error) {
            print(`[TrainingMode] Error creating hero ${heroName}: ${error}`);
            return null;
        }
    }

    /**
     * 获取默认自动刷怪配置
     */
    private getDefaultAutoSpawnConfig(): AutoSpawnConfig {
        return {
            enabled: false,
            unitType: 'npc_dota_neutral_kobold',
            count: 2,
            level: 1,
            interval: 10,
            maxUnits: 10,
            spawnRadius: 300,
            playerRadius: 500,
            increaseDifficulty: false
        };
    }

    /**
     * 获取默认自动木桩配置
     */
    private getDefaultAutoDummyConfig(): AutoDummyConfig {
        return {
            enabled: false,
            count: 4,
            health: 5000,
            invulnerable: false,
            positions: [],
            autoRespawn: true,
            respawnDelay: 5
        };
    }

    /**
     * 启用自动回血回蓝
     */
    public enableAutoRegeneration(): void {
        if (this.regenTimer) {
            return; // 已经启用
        }

        this.settings.autoRegeneration = true;
        
        // 每1秒检查一次英雄状态
        this.regenTimer = Timers.CreateTimer(1.0, () => {
            if (this.settings.autoRegeneration) {
                this.performRegeneration();
                return 1.0; // 继续每秒执行
            }
            return null; // 停止定时器
        });

        print('[TrainingMode] Auto regeneration enabled');
        this.syncStatusToNetTable();
    }

    /**
     * 禁用自动回血回蓝
     */
    public disableAutoRegeneration(): void {
        this.settings.autoRegeneration = false;
        
        if (this.regenTimer) {
            Timers.RemoveTimer(this.regenTimer);
            this.regenTimer = null;
        }

        print('[TrainingMode] Auto regeneration disabled');
        this.syncStatusToNetTable();
    }

    /**
     * 执行自动回血回蓝
     */
    private performRegeneration(): void {
        const hero = this.getPlayerHero();
        if (!hero || hero.IsNull()) {
            return;
        }

        // 检查并回复血量
        const currentHealth = hero.GetHealth();
        const maxHealth = hero.GetMaxHealth();
        if (currentHealth < maxHealth) {
            hero.SetHealth(maxHealth);
        }

        // 检查并回复魔法值
        const currentMana = hero.GetMana();
        const maxMana = hero.GetMaxMana();
        if (currentMana < maxMana) {
            hero.SetMana(maxMana);
        }
    }

    /**
     * 启用自定义技能CD
     */
    public enableCustomCooldowns(): void {
        if (this.cooldownTimer) {
            return; // 已经启用
        }

        this.settings.customCooldowns = true;
        
        // 每0.1秒检查一次技能CD
        this.cooldownTimer = Timers.CreateTimer(0.1, () => {
            if (this.settings.customCooldowns) {
                this.manageCooldowns();
                return 0.1; // 继续每0.1秒执行
            }
            return null; // 停止定时器
        });

        print(`[TrainingMode] Custom cooldowns enabled: ${this.settings.cooldownSeconds}s`);
        this.syncStatusToNetTable();
    }

    /**
     * 禁用自定义技能CD
     */
    public disableCustomCooldowns(): void {
        this.settings.customCooldowns = false;
        
        if (this.cooldownTimer) {
            Timers.RemoveTimer(this.cooldownTimer);
            this.cooldownTimer = null;
        }

        print('[TrainingMode] Custom cooldowns disabled');
        this.syncStatusToNetTable();
    }

    /**
     * 管理技能CD
     */
    private manageCooldowns(): void {
        const hero = this.getPlayerHero();
        if (!hero || hero.IsNull()) {
            return;
        }

        // 管理技能CD
        for (let i = 0; i < 24; i++) {
            const ability = hero.GetAbilityByIndex(i);
            if (ability && !ability.IsNull()) {
                const currentCooldown = ability.GetCooldownTimeRemaining();
                
                // 如果技能在CD中且剩余时间大于设定值，则调整
                if (currentCooldown > this.settings.cooldownSeconds) {
                    // 先结束当前CD，然后设置新的CD时间
                    ability.EndCooldown();
                    if (this.settings.cooldownSeconds > 0) {
                        // 使用ModifyAbilityCooldown来设置新的CD
                        ability.StartCooldown(this.settings.cooldownSeconds);
                    }
                }
            }
        }

        // 管理物品CD
        for (let i = 0; i < 15; i++) {
            const item = hero.GetItemInSlot(i);
            if (item && !item.IsNull()) {
                const currentCooldown = item.GetCooldownTimeRemaining();
                
                // 如果物品在CD中且剩余时间大于设定值，则调整
                if (currentCooldown > this.settings.cooldownSeconds) {
                    // 先结束当前CD，然后设置新的CD时间
                    item.EndCooldown();
                    if (this.settings.cooldownSeconds > 0) {
                        item.StartCooldown(this.settings.cooldownSeconds);
                    }
                }
            }
        }
    }

    /**
     * 设置技能CD秒数
     */
    public setCooldownSeconds(seconds: number): void {
        if (seconds < 0.1) {
            seconds = 0.1; // 最小0.1秒
        } else if (seconds > 300) {
            seconds = 300; // 最大300秒
        }
        
        this.settings.cooldownSeconds = seconds;
        print(`[TrainingMode] Cooldown time set to ${seconds} seconds`);
        this.syncStatusToNetTable();
    }

    /**
     * 切换自动回血回蓝状态
     */
    public toggleAutoRegeneration(): void {
        if (this.settings.autoRegeneration) {
            this.disableAutoRegeneration();
        } else {
            this.enableAutoRegeneration();
        }
    }

    /**
     * 切换自定义技能CD状态
     */
    public toggleCustomCooldowns(): void {
        if (this.settings.customCooldowns) {
            this.disableCustomCooldowns();
        } else {
            this.enableCustomCooldowns();
        }
    }
}

// 全局控制台命令函数
declare global {
    function training_auto_regen(enabled?: string): void;
    function training_fast_cd(seconds?: string): void;
    function training_status(): void;
    function training_cd(seconds?: string): void;
    function training_regen(): void;
    function training_practice(): void;
}

/**
 * 控制台命令：自动回血回蓝控制
 * 用法：training_auto_regen 1/0/on/off
 */
(globalThis as any).training_auto_regen = function(enabled?: string) {
    if (!GameRules.TrainingMode) {
        print('[Console] Training mode not initialized');
        return;
    }

    if (!enabled) {
        // 显示当前状态
        const status = GameRules.TrainingMode.getStatus();
        print(`[Console] Auto regeneration: ${status.autoRegeneration.enabled ? 'ON' : 'OFF'}`);
        return;
    }

    const isEnabled = enabled === '1' || enabled.toLowerCase() === 'on' || enabled.toLowerCase() === 'true';
    
    if (isEnabled) {
        GameRules.TrainingMode.enableAutoRegeneration();
        print('[Console] Auto regeneration enabled');
    } else {
        GameRules.TrainingMode.disableAutoRegeneration();
        print('[Console] Auto regeneration disabled');
    }
};

/**
 * 控制台命令：快速技能CD控制
 * 用法：training_fast_cd 3
 */
(globalThis as any).training_fast_cd = function(seconds?: string) {
    if (!GameRules.TrainingMode) {
        print('[Console] Training mode not initialized');
        return;
    }

    if (!seconds) {
        // 显示当前状态
        const status = GameRules.TrainingMode.getStatus();
        print(`[Console] Fast cooldowns: ${status.customCooldowns.enabled ? 'ON' : 'OFF'}`);
        print(`[Console] Cooldown time: ${status.customCooldowns.seconds}s`);
        return;
    }

    const cdSeconds = parseFloat(seconds);
    if (isNaN(cdSeconds) || cdSeconds < 0.1) {
        print('[Console] Invalid cooldown time. Use a number >= 0.1');
        return;
    }

    GameRules.TrainingMode.setCooldownSeconds(cdSeconds);
    GameRules.TrainingMode.enableCustomCooldowns();
    print(`[Console] Fast cooldowns enabled: ${cdSeconds}s`);
};

/**
 * 控制台命令：显示训练模式状态
 * 用法：training_status
 */
(globalThis as any).training_status = function() {
    if (!GameRules.TrainingMode) {
        print('[Console] Training mode not initialized');
        return;
    }

    const status = GameRules.TrainingMode.getStatus();
    print('[Console] === Training Mode Status ===');
    print(`[Console] Active: ${status.isActive ? 'YES' : 'NO'}`);
    print(`[Console] Auto Regeneration: ${status.autoRegeneration.enabled ? 'ON' : 'OFF'}`);
    print(`[Console] Fast Cooldowns: ${status.customCooldowns.enabled ? 'ON' : 'OFF'} (${status.customCooldowns.seconds}s)`);
    print(`[Console] Auto Spawn: ${status.autoSpawn.enabled ? 'ON' : 'OFF'} (${status.autoSpawn.unitsCount} units)`);
    print(`[Console] Auto Dummy: ${status.autoDummy.enabled ? 'ON' : 'OFF'} (${status.autoDummy.dummiesCount} dummies)`);
    print('[Console] ==============================');
};

/**
 * 控制台命令：快速设置CD时间（简化版）
 * 用法：training_cd 3
 */
(globalThis as any).training_cd = function(seconds?: string) {
    if (!GameRules.TrainingMode) {
        print('[Console] Training mode not initialized');
        return;
    }

    if (!seconds) {
        const status = GameRules.TrainingMode.getStatus();
        print(`[Console] Current cooldown: ${status.customCooldowns.seconds}s (${status.customCooldowns.enabled ? 'ON' : 'OFF'})`);
        return;
    }

    const cdSeconds = parseFloat(seconds);
    if (isNaN(cdSeconds) || cdSeconds < 0.1) {
        print('[Console] Invalid cooldown time. Use: training_cd 3');
        return;
    }

    GameRules.TrainingMode.setCooldownSeconds(cdSeconds);
    GameRules.TrainingMode.enableCustomCooldowns();
    print(`[Console] Cooldown set to ${cdSeconds}s`);
};

/**
 * 控制台命令：切换自动回血回蓝（简化版）
 * 用法：training_regen
 */
(globalThis as any).training_regen = function() {
    if (!GameRules.TrainingMode) {
        print('[Console] Training mode not initialized');
        return;
    }

    GameRules.TrainingMode.toggleAutoRegeneration();
    const status = GameRules.TrainingMode.getStatus();
    print(`[Console] Auto regeneration: ${status.autoRegeneration.enabled ? 'ON' : 'OFF'}`);
};

/**
 * 控制台命令：一键开启练功模式
 * 用法：training_practice
 */
(globalThis as any).training_practice = function() {
    if (!GameRules.TrainingMode) {
        print('[Console] Training mode not initialized');
        return;
    }

    // 启用所有练功功能
    GameRules.TrainingMode.enableAutoRegeneration();
    GameRules.TrainingMode.setCooldownSeconds(3);
    GameRules.TrainingMode.enableCustomCooldowns();
    
    print('[Console] Practice mode activated:');
    print('[Console] - Auto regeneration: ON');
    print('[Console] - Fast cooldowns: ON (3s)');
    print('[Console] Ready for training!');
};
