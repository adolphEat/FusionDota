/**
 * 对战系统数据类型定义
 * Battle System Data Types
 */

/**
 * 关卡配置接口
 */
export interface LevelConfig {
    level_id: string;
    level_name: string;
    level_desc: string;
    difficulty: number;
    map_area: string;
    time_limit: number;
    win_condition: WinConditionType;
    team1_config: string;
    team2_config: string;
    rewards: RewardConfig;
    unlock_condition: string;
}

/**
 * 队伍配置接口
 */
export interface TeamConfig {
    team_config_id: string;
    team_name: string;
    formation: FormationType;
    spawn_area: Vector;
    unit_configs: UnitSpawnConfig[];
}

/**
 * 单位生成配置
 */
export interface UnitSpawnConfig {
    unit_id: string;
    count: number;
    level?: number;
    spawn_delay?: number;
    custom_stats?: {
        health?: number;
        mana?: number;
        damage?: number;
        armor?: number;
        magicResistance?: number;
        moveSpeed?: number;
    };
}

/**
 * 对战实例
 */
export interface Battle {
    id: string;
    levelConfig: LevelConfig;
    teams: Map<DotaTeam, BattleTeam>;
    startTime: number;
    endTime?: number;
    status: BattleStatus;
    winner?: DotaTeam | null;
    entities: Set<CDOTA_BaseNPC>;
    timeRemaining?: number;
}

/**
 * 对战队伍
 */
export interface BattleTeam {
    configId: string;
    team: DotaTeam;
    name: string;
    units: CDOTA_BaseNPC[];
    isAlive: boolean;
    formation: FormationType;
    spawnedCount: number;
    totalCount: number;
}

/**
 * 对战结果
 */
export interface BattleResult {
    battleId: string;
    levelId: string;
    levelName: string;
    winner: DotaTeam | null;
    duration: number;
    timestamp: number;
    teams: BattleTeamResult[];
    rewards?: RewardConfig;
}

/**
 * 队伍结果
 */
export interface BattleTeamResult {
    configId: string;
    team: DotaTeam;
    name: string;
    unitsAlive: number;
    totalUnits: number;
    isWinner: boolean;
    damageDealt?: number;
    damageTaken?: number;
}

/**
 * 奖励配置
 */
export interface RewardConfig {
    [key: string]: number;
}

/**
 * 实体事件监听器
 */
export interface EntityEventListeners {
    onDeath?: (entity: CDOTA_BaseNPC) => void;
    onDamage?: (entity: CDOTA_BaseNPC, damage: number) => void;
    onSpawn?: (entity: CDOTA_BaseNPC) => void;
}

/**
 * 玩家进度
 */
export interface PlayerProgress {
    completedLevels: string[];
    totalBattles: number;
    totalWins: number;
    totalRewards: RewardConfig;
    lastPlayTime: number;
}

/**
 * 胜利条件类型
 */
export enum WinConditionType {
    ELIMINATE_ALL = 'eliminate_all',
    SURVIVE_TIME = 'survive_time',
    PROTECT_TARGET = 'protect_target',
    CAPTURE_POINT = 'capture_point',
    KILL_TARGET = 'kill_target',
    COLLECT_ITEMS = 'collect_items'
}

/**
 * 阵型类型
 */
export enum FormationType {
    LINE = 'line',
    CIRCLE = 'circle',
    WEDGE = 'wedge',
    GRID = 'grid',
    CUSTOM = 'custom',
    RANDOM = 'random'
}

/**
 * 对战状态
 */
export enum BattleStatus {
    PREPARING = 'preparing',
    SPAWNING = 'spawning',
    FIGHTING = 'fighting',
    FINISHED = 'finished',
    PAUSED = 'paused',
    CANCELLED = 'cancelled'
}

/**
 * 单位AI类型
 */
export enum AIType {
    AGGRESSIVE = 'aggressive',
    DEFENSIVE = 'defensive',
    SUPPORT = 'support',
    PATROL = 'patrol',
    GUARD = 'guard',
    PASSIVE = 'passive'
}

/**
 * 地图区域类型
 */
export enum MapAreaType {
    CENTER = 'center_area',
    NORTH = 'north_area',
    SOUTH = 'south_area',
    EAST = 'east_area',
    WEST = 'west_area',
    CUSTOM = 'custom_area'
}

/**
 * 事件类型
 */
export enum BattleEventType {
    BATTLE_STARTED = 'battle_started',
    BATTLE_ENDED = 'battle_ended',
    UNIT_SPAWNED = 'unit_spawned',
    UNIT_DIED = 'unit_died',
    TEAM_ELIMINATED = 'team_eliminated',
    TIME_WARNING = 'time_warning',
    OBJECTIVE_COMPLETED = 'objective_completed'
}

/**
 * 对战事件数据
 */
export interface BattleEvent {
    type: BattleEventType;
    battleId: string;
    timestamp: number;
    data: any;
}

/**
 * 配置验证结果
 */
export interface ConfigValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
    missingConfigs: string[];
}

/**
 * 生成区域配置
 */
export interface SpawnAreaConfig {
    center: Vector;
    radius: number;
    shape: 'circle' | 'rectangle' | 'line';
    rotation?: number;
    exclusionZones?: Vector[];
}

/**
 * 战斗统计
 */
export interface BattleStatistics {
    totalDamageDealt: Map<DotaTeam, number>;
    totalDamageTaken: Map<DotaTeam, number>;
    unitsKilled: Map<DotaTeam, number>;
    unitsLost: Map<DotaTeam, number>;
    averageBattleTime: number;
    mostUsedUnits: Array<{ unitId: string; count: number }>;
}

/**
 * 关卡解锁条件
 */
export interface UnlockCondition {
    type: 'level_complete' | 'win_streak' | 'total_wins' | 'time_limit';
    target: string | number;
    value: any;
}

/**
 * 动态难度配置
 */
export interface DynamicDifficultyConfig {
    enabled: boolean;
    baseMultiplier: number;
    winStreakBonus: number;
    lossStreakReduction: number;
    maxMultiplier: number;
    minMultiplier: number;
}

/**
 * 对战配置选项
 */
export interface BattleOptions {
    enableDynamicDifficulty?: boolean;
    allowPlayerControl?: boolean;
    showBattleUI?: boolean;
    recordStatistics?: boolean;
    enableSpectatorMode?: boolean;
    customRules?: { [key: string]: any };
}

/**
 * 队伍AI配置
 */
export interface TeamAIConfig {
    aiType: AIType;
    aggressionLevel: number; // 0-100
    formationMaintenance: boolean;
    targetPriority: string[];
    retreatThreshold: number; // 0-100
    supportBehavior: boolean;
}

/**
 * 关卡元数据
 */
export interface LevelMetadata {
    author: string;
    version: string;
    tags: string[];
    estimatedDuration: number;
    recommendedPlayerLevel: number;
    balanceVersion: string;
    lastModified: number;
}

/**
 * 对战系统配置
 */
export interface BattleSystemConfig {
    maxConcurrentBattles: number;
    defaultTimeLimit: number;
    enableAutoCleanup: boolean;
    cleanupDelay: number;
    enableBattleHistory: boolean;
    maxHistorySize: number;
    enableReplay: boolean;
    debugMode: boolean;
}

/**
 * 类型守卫函数
 */
export function isValidLevelConfig(config: any): config is LevelConfig {
    return config &&
           typeof config.level_id === 'string' &&
           typeof config.level_name === 'string' &&
           typeof config.difficulty === 'number' &&
           Object.values(WinConditionType).includes(config.win_condition);
}

export function isValidTeamConfig(config: any): config is TeamConfig {
    return config &&
           typeof config.team_config_id === 'string' &&
           typeof config.team_name === 'string' &&
           Object.values(FormationType).includes(config.formation) &&
           Array.isArray(config.unit_configs);
}

export function isValidBattleResult(result: any): result is BattleResult {
    return result &&
           typeof result.battleId === 'string' &&
           typeof result.levelId === 'string' &&
           typeof result.duration === 'number' &&
           Array.isArray(result.teams);
}
