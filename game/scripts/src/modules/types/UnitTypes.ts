/**
 * 单位配置系统类型定义
 * Unit Configuration System Type Definitions
 */

/**
 * 单位基础配置接口
 */
export interface UnitConfig {
    // 基础属性
    BaseClass?: string;
    Level?: number;
    Model?: string;
    ModelScale?: number;
    
    // 生命和魔法
    StatusHealth?: number;
    StatusHealthRegen?: number;
    StatusMana?: number;
    StatusManaRegen?: number;
    StatusStartingMana?: number;
    
    // 攻击属性
    AttackDamageMin?: number;
    AttackDamageMax?: number;
    AttackRate?: number;
    AttackRange?: number;
    AttackAnimationPoint?: number;
    AttackCapabilities?: string;
    BaseAttackSpeed?: number;
    
    // 防御属性
    ArmorPhysical?: number;
    MagicalResistance?: number;
    
    // 移动属性
    MovementSpeed?: number;
    MovementCapabilities?: string;
    MovementTurnRate?: number;
    
    // 视野属性
    VisionDaytimeRange?: number;
    VisionNighttimeRange?: number;
    
    // 奖励属性
    BountyXP?: number;
    BountyGoldMin?: number;
    BountyGoldMax?: number;
    
    // 技能配置
    Ability1?: string;
    Ability2?: string;
    Ability3?: string;
    Ability4?: string;
    Ability5?: string;
    Ability6?: string;
    Ability7?: string;
    Ability8?: string;
    
    // 声音和特效
    SoundSet?: string;
    GameSoundsFile?: string;
    ProjectileModel?: string;
    ProjectileSpeed?: number;
    
    // 其他属性
    UnitLabel?: string;
    TeamName?: string;
    CombatClassAttack?: string;
    CombatClassDefend?: string;
    UnitRelationshipClass?: string;
}

/**
 * 单位创建选项
 */
export interface UnitCreationOptions {
    // 基础选项
    position: Vector;
    team?: DotaTeam;
    owner?: CDOTA_BaseNPC;
    
    // 属性覆盖
    overrideConfig?: Partial<UnitConfig>;
    
    // 创建后处理
    level?: number;
    customStats?: {
        health?: number;
        mana?: number;
        damage?: number;
        armor?: number;
        magicResistance?: number;
        moveSpeed?: number;
    };
    
    // 行为设置
    aiTarget?: CDOTA_BaseNPC;
    controllable?: boolean;
    invulnerable?: boolean;
}

/**
 * 批量创建选项
 */
export interface BatchCreationOptions extends Omit<UnitCreationOptions, 'position'> {
    positions: Vector[];
    spacing?: number;
    formation?: 'line' | 'circle' | 'grid' | 'random';
}

/**
 * 单位工厂配置
 */
export interface UnitFactoryConfig {
    enableLogging?: boolean;
    enableErrorTracking?: boolean;
    defaultTeam?: DotaTeam;
    configReloadInterval?: number;
}

/**
 * 配置管理器选项
 */
export interface ConfigManagerOptions {
    configPath?: string;
    enableHotReload?: boolean;
    cacheConfigs?: boolean;
    validateConfigs?: boolean;
}

/**
 * 单位创建结果
 */
export interface UnitCreationResult {
    success: boolean;
    unit?: CDOTA_BaseNPC;
    error?: string;
    configUsed?: UnitConfig;
}

/**
 * 批量创建结果
 */
export interface BatchCreationResult {
    totalRequested: number;
    successCount: number;
    failedCount: number;
    units: CDOTA_BaseNPC[];
    errors: string[];
}

/**
 * 配置验证结果
 */
export interface ConfigValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

/**
 * 单位统计信息
 */
export interface UnitStats {
    totalCreated: number;
    successRate: number;
    mostUsedConfigs: Array<{ name: string; count: number }>;
    averageCreationTime: number;
}

/**
 * 配置加载状态
 */
export interface ConfigLoadStatus {
    loaded: boolean;
    configCount: number;
    lastLoadTime: number;
    loadErrors: string[];
}

/**
 * 单位类型枚举
 */
export enum UnitType {
    HERO = 'hero',
    CREEP = 'creep',
    BUILDING = 'building',
    WARD = 'ward',
    COURIER = 'courier',
    NEUTRAL = 'neutral',
    CUSTOM = 'custom'
}

/**
 * 单位队伍枚举扩展
 */
export enum ExtendedTeam {
    GOODGUYS = DotaTeam.GOODGUYS,
    BADGUYS = DotaTeam.BADGUYS,
    NEUTRALS = DotaTeam.NEUTRALS,
    CUSTOM_1 = DotaTeam.CUSTOM_1,
    CUSTOM_2 = DotaTeam.CUSTOM_2,
    CUSTOM_3 = DotaTeam.CUSTOM_3,
    CUSTOM_4 = DotaTeam.CUSTOM_4,
    CUSTOM_5 = DotaTeam.CUSTOM_5,
    CUSTOM_6 = DotaTeam.CUSTOM_6,
    CUSTOM_7 = DotaTeam.CUSTOM_7,
    CUSTOM_8 = DotaTeam.CUSTOM_8
}

/**
 * 属性应用策略
 */
export enum AttributeApplyStrategy {
    OVERRIDE = 'override',      // 完全覆盖
    MERGE = 'merge',           // 合并非空值
    ADD = 'add',               // 数值相加
    MULTIPLY = 'multiply'      // 数值相乘
}

/**
 * 单位创建事件类型
 */
export interface UnitCreationEvent {
    eventType: 'unit_created' | 'unit_failed' | 'batch_completed';
    unitName: string;
    success: boolean;
    timestamp: number;
    details?: any;
}

/**
 * 配置文件格式
 */
export type ConfigFileFormat = 'json' | 'kv' | 'lua';

/**
 * 单位配置字典类型
 */
export type UnitConfigDictionary = Record<string, UnitConfig>;

/**
 * 属性设置函数类型
 */
export type AttributeSetter = (unit: CDOTA_BaseNPC, value: any) => void;

/**
 * 属性映射表类型
 */
export type AttributeMapping = Record<keyof UnitConfig, AttributeSetter>;
