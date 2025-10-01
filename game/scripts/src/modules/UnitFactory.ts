/**
 * 单位工厂类 - 负责创建和配置单位
 * Unit Factory - Responsible for creating and configuring units
 */

import { 
    UnitConfig, 
    UnitCreationOptions, 
    BatchCreationOptions,
    UnitCreationResult,
    BatchCreationResult,
    UnitFactoryConfig,
    UnitStats,
    AttributeMapping,
    AttributeApplyStrategy
} from './types/UnitTypes';
import { unitConfigManager } from './UnitConfigManager';
import { getTimestampMs } from '../utils/time_utils';

export class UnitFactory {
    private static instance: UnitFactory;
    private config: UnitFactoryConfig;
    private stats: UnitStats;
    private attributeMapping: AttributeMapping;

    private constructor(config: UnitFactoryConfig = {}) {
        this.config = {
            enableLogging: true,
            enableErrorTracking: true,
            defaultTeam: DotaTeam.NEUTRALS,
            ...config
        };

        this.stats = {
            totalCreated: 0,
            successRate: 0,
            mostUsedConfigs: [],
            averageCreationTime: 0
        };

        this.initializeAttributeMapping();
        this.log('UnitFactory initialized');
    }

    /**
     * 获取单例实例
     */
    public static getInstance(config?: UnitFactoryConfig): UnitFactory {
        if (!UnitFactory.instance) {
            UnitFactory.instance = new UnitFactory(config);
        }
        return UnitFactory.instance;
    }

    /**
     * 初始化属性映射
     */
    private initializeAttributeMapping(): void {
        this.attributeMapping = {
            // 生命和魔法
            StatusHealth: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetMaxHealth(value);
                unit.SetHealth(value);
            },
            StatusHealthRegen: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetBaseHealthRegen(value);
            },
            StatusMana: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetMaxMana(value);
                unit.SetMana(value);
            },
            StatusManaRegen: (unit: CDOTA_BaseNPC, value: number) => {
                if (typeof value === 'number') {
                    unit.SetBaseManaRegen(value);
                }
            },

            // 攻击属性
            AttackDamageMin: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetBaseDamageMin(value);
            },
            AttackDamageMax: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetBaseDamageMax(value);
            },
            AttackRate: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetBaseAttackTime(value);
            },
            AttackRange: (unit: CDOTA_BaseNPC, value: number) => {
                // 注意：DOTA2中攻击距离通常在KV文件中设置，运行时修改可能有限制
                try {
                    (unit as any).SetAttackRange?.(value);
                } catch (error) {
                    this.log(`Warning: Could not set attack range: ${error}`);
                }
            },
            BaseAttackSpeed: (unit: CDOTA_BaseNPC, value: number) => {
                // 注意：DOTA2中攻击速度的设置可能需要特殊处理
                try {
                    (unit as any).SetBaseAttackSpeed?.(value);
                } catch (error) {
                    this.log(`Warning: Could not set base attack speed: ${error}`);
                }
            },

            // 防御属性
            ArmorPhysical: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetPhysicalArmorBaseValue(value);
            },
            MagicalResistance: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetBaseMagicalResistanceValue(value);
            },

            // 移动属性
            MovementSpeed: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetBaseMoveSpeed(value);
            },

            // 模型属性
            ModelScale: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetModelScale(value);
            },

            // 视野属性
            VisionDaytimeRange: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetDayTimeVisionRange(value);
            },
            VisionNighttimeRange: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetNightTimeVisionRange(value);
            },

            // 奖励属性
            BountyXP: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetDeathXP(value);
            },
            BountyGoldMin: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetMinimumGoldBounty(value);
            },
            BountyGoldMax: (unit: CDOTA_BaseNPC, value: number) => {
                unit.SetMaximumGoldBounty(value);
            },

            // 其他属性的默认处理
            Level: () => {}, // 等级在其他地方处理
            BaseClass: () => {}, // BaseClass在创建时使用
            Model: () => {}, // 模型在KV中定义
            Ability1: () => {}, // 技能在KV中定义
            Ability2: () => {},
            Ability3: () => {},
            Ability4: () => {},
            Ability5: () => {},
            Ability6: () => {},
            Ability7: () => {},
            Ability8: () => {},
            SoundSet: () => {},
            GameSoundsFile: () => {},
            ProjectileModel: () => {},
            ProjectileSpeed: () => {},
            AttackAnimationPoint: () => {},
            AttackCapabilities: () => {},
            MovementCapabilities: () => {},
            MovementTurnRate: () => {},
            StatusStartingMana: () => {},
            UnitLabel: () => {},
            TeamName: () => {},
            CombatClassAttack: () => {},
            CombatClassDefend: () => {},
            UnitRelationshipClass: () => {}
        };
    }

    /**
     * 创建单位
     */
    public createUnit(unitName: string, options: UnitCreationOptions): UnitCreationResult {
        const startTime = getTimestampMs();
        
        try {
            // 获取配置
            const config = unitConfigManager.getUnitConfig(unitName);
            if (!config) {
                return {
                    success: false,
                    error: `No configuration found for unit: ${unitName}`
                };
            }

            // 合并配置
            const finalConfig = this.mergeConfigs(config, options.overrideConfig);

            // 创建单位
            const unit = this.createUnitInstance(unitName, finalConfig, options);
            if (!unit) {
                return {
                    success: false,
                    error: `Failed to create unit instance: ${unitName}`
                };
            }

            // 应用配置属性
            this.applyUnitConfig(unit, finalConfig);

            // 应用自定义属性
            if (options.customStats) {
                this.applyCustomStats(unit, options.customStats);
            }

            // 应用后处理
            this.applyPostProcessing(unit, options);

            // 更新统计
            this.updateStats(unitName, getTimestampMs() - startTime, true);

            this.log(`Successfully created unit: ${unitName}`);
            
            return {
                success: true,
                unit: unit,
                configUsed: finalConfig
            };

        } catch (error) {
            this.updateStats(unitName, getTimestampMs() - startTime, false);
            const errorMsg = `Error creating unit ${unitName}: ${error}`;
            this.logError(errorMsg);
            
            return {
                success: false,
                error: errorMsg
            };
        }
    }

    /**
     * 创建单位实例
     */
    private createUnitInstance(
        unitName: string, 
        config: UnitConfig, 
        options: UnitCreationOptions
    ): CDOTA_BaseNPC | null {
        const baseClass = config.BaseClass || unitName;
        const team = options.team || this.config.defaultTeam!;
        
        const unit = CreateUnitByName(
            baseClass,
            options.position,
            true,
            options.owner,
            options.owner,
            team
        );

        if (!unit || unit.IsNull()) {
            this.logError(`Failed to create unit with BaseClass: ${baseClass}`);
            return null;
        }

        return unit;
    }

    /**
     * 合并配置
     */
    private mergeConfigs(baseConfig: UnitConfig, overrideConfig?: Partial<UnitConfig>): UnitConfig {
        if (!overrideConfig) {
            return { ...baseConfig };
        }
        
        return { ...baseConfig, ...overrideConfig };
    }

    /**
     * 应用单位配置
     */
    private applyUnitConfig(unit: CDOTA_BaseNPC, config: UnitConfig): void {
        try {
            // 处理等级
            if (config.Level && config.Level > 1) {
                this.setUnitLevel(unit, config.Level);
            }

            // 应用所有配置属性
            for (const [key, value] of Object.entries(config)) {
                if (value !== undefined && key in this.attributeMapping) {
                    try {
                        this.attributeMapping[key as keyof UnitConfig](unit, value);
                    } catch (error) {
                        this.log(`Warning: Failed to apply ${key}: ${error}`);
                    }
                }
            }

        } catch (error) {
            this.logError(`Error applying unit config: ${error}`);
        }
    }

    /**
     * 设置单位等级
     */
    private setUnitLevel(unit: CDOTA_BaseNPC, level: number): void {
        if (unit.IsHero()) {
            const hero = unit as CDOTA_BaseNPC_Hero;
            for (let i = 1; i < level; i++) {
                hero.HeroLevelUp(false);
            }
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
                unit.SetMaxMana(stats.mana);
                unit.SetMana(stats.mana);
            }
            
            if (stats.damage) {
                unit.SetBaseDamageMin(stats.damage);
                unit.SetBaseDamageMax(stats.damage);
            }
            
            if (stats.armor !== undefined) {
                unit.SetPhysicalArmorBaseValue(stats.armor);
            }
            
            if (stats.magicResistance !== undefined) {
                unit.SetBaseMagicalResistanceValue(stats.magicResistance);
            }
            
            if (stats.moveSpeed) {
                unit.SetBaseMoveSpeed(stats.moveSpeed);
            }

        } catch (error) {
            this.logError(`Error applying custom stats: ${error}`);
        }
    }

    /**
     * 应用后处理
     */
    private applyPostProcessing(unit: CDOTA_BaseNPC, options: UnitCreationOptions): void {
        try {
            // 设置AI目标
            if (options.aiTarget) {
                unit.SetInitialGoalEntity(options.aiTarget);
            }

            // 设置可控制性
            if (options.controllable !== undefined) {
                unit.SetControllableByPlayer(0, options.controllable);
            }

            // 设置无敌状态
            if (options.invulnerable) {
                unit.AddNewModifier(unit, null, 'modifier_invulnerable', {});
            }

        } catch (error) {
            this.log(`Warning: Post-processing failed: ${error}`);
        }
    }

    /**
     * 批量创建单位
     */
    public createUnits(unitName: string, options: BatchCreationOptions): BatchCreationResult {
        const result: BatchCreationResult = {
            totalRequested: options.positions.length,
            successCount: 0,
            failedCount: 0,
            units: [],
            errors: []
        };

        for (const position of options.positions) {
            const unitOptions: UnitCreationOptions = {
                ...options,
                position: position
            };

            const createResult = this.createUnit(unitName, unitOptions);
            
            if (createResult.success && createResult.unit) {
                result.units.push(createResult.unit);
                result.successCount++;
            } else {
                result.failedCount++;
                if (createResult.error) {
                    result.errors.push(createResult.error);
                }
            }
        }

        this.log(`Batch creation completed: ${result.successCount}/${result.totalRequested} units created`);
        return result;
    }

    /**
     * 快速创建单位（简化接口）
     */
    public quickCreate(
        unitName: string, 
        position: Vector, 
        team: DotaTeam = DotaTeam.NEUTRALS
    ): CDOTA_BaseNPC | null {
        const result = this.createUnit(unitName, { position, team });
        return result.success ? result.unit! : null;
    }

    /**
     * 获取可用单位列表
     */
    public getAvailableUnits(): string[] {
        return unitConfigManager.getAvailableUnits();
    }

    /**
     * 检查单位是否可创建
     */
    public canCreateUnit(unitName: string): boolean {
        return unitConfigManager.hasConfig(unitName);
    }

    /**
     * 获取单位配置预览
     */
    public getUnitPreview(unitName: string): UnitConfig | null {
        return unitConfigManager.getUnitConfig(unitName);
    }

    /**
     * 更新统计信息
     */
    private updateStats(unitName: string, creationTime: number, success: boolean): void {
        this.stats.totalCreated++;
        
        if (success) {
            // 更新平均创建时间
            this.stats.averageCreationTime = 
                (this.stats.averageCreationTime + creationTime) / 2;
        }

        // 更新成功率
        this.stats.successRate = (this.stats.successRate * (this.stats.totalCreated - 1) + 
                                 (success ? 1 : 0)) / this.stats.totalCreated;
    }

    /**
     * 获取统计信息
     */
    public getStats(): UnitStats {
        return { ...this.stats };
    }

    /**
     * 重置统计信息
     */
    public resetStats(): void {
        this.stats = {
            totalCreated: 0,
            successRate: 0,
            mostUsedConfigs: [],
            averageCreationTime: 0
        };
    }

    /**
     * 日志记录
     */
    private log(message: string): void {
        if (this.config.enableLogging) {
            print(`[UnitFactory] ${message}`);
        }
    }

    /**
     * 错误日志记录
     */
    private logError(message: string): void {
        print(`[UnitFactory ERROR] ${message}`);
        
        if (this.config.enableErrorTracking && GameRules.ErrorTracker) {
            GameRules.ErrorTracker.trackError(new Error(message), {
                module: 'UnitFactory',
                function: 'createUnit'
            });
        }
    }

    /**
     * 清理资源
     */
    public cleanup(): void {
        this.resetStats();
        this.log('UnitFactory cleaned up');
    }
}

// 导出单例实例
export const unitFactory = UnitFactory.getInstance();
