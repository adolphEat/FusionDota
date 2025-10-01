/**
 * 单位配置管理器
 * Unit Configuration Manager
 */

import { 
    UnitConfig, 
    UnitConfigDictionary, 
    ConfigManagerOptions, 
    ConfigLoadStatus,
    ConfigValidationResult 
} from './types/UnitTypes';
import { getTimestampMs } from '../utils/time_utils';

export class UnitConfigManager {
    private static instance: UnitConfigManager;
    private configs: UnitConfigDictionary = {};
    private loadStatus: ConfigLoadStatus;
    private options: ConfigManagerOptions;

    private constructor(options: ConfigManagerOptions = {}) {
        this.options = {
            configPath: '../json/custom_units.json',
            enableHotReload: true,
            cacheConfigs: true,
            validateConfigs: true,
            ...options
        };

        this.loadStatus = {
            loaded: false,
            configCount: 0,
            lastLoadTime: 0,
            loadErrors: []
        };

        this.initialize();
    }

    /**
     * 获取单例实例
     */
    public static getInstance(options?: ConfigManagerOptions): UnitConfigManager {
        if (!UnitConfigManager.instance) {
            UnitConfigManager.instance = new UnitConfigManager(options);
        }
        return UnitConfigManager.instance;
    }

    /**
     * 初始化配置管理器
     */
    private initialize(): void {
        try {
            this.loadConfigs();
            
            if (this.options.enableHotReload) {
                this.setupHotReload();
            }

            print(`[UnitConfigManager] Initialized with ${this.getConfigCount()} configurations`);
        } catch (error) {
            print(`[UnitConfigManager] Initialization failed: ${error}`);
        }
    }

    /**
     * 加载配置文件
     */
    public loadConfigs(): boolean {
        try {
            const startTime = getTimestampMs();
            
            // 尝试加载JSON配置文件
            const configData = this.loadConfigFile();
            
            if (!configData) {
                throw new Error('Failed to load config file');
            }

            // 验证配置
            if (this.options.validateConfigs) {
                const validation = this.validateConfigs(configData);
                if (!validation.isValid) {
                    print(`[UnitConfigManager] Config validation warnings: ${validation.warnings.join(', ')}`);
                    if (validation.errors.length > 0) {
                        throw new Error(`Config validation errors: ${validation.errors.join(', ')}`);
                    }
                }
            }

            // 更新配置
            this.configs = configData;
            
            // 更新加载状态
            this.loadStatus = {
                loaded: true,
                configCount: Object.keys(this.configs).length,
                lastLoadTime: getTimestampMs(),
                loadErrors: []
            };

            const loadTime = getTimestampMs() - startTime;
            print(`[UnitConfigManager] Loaded ${this.loadStatus.configCount} configurations in ${loadTime}ms`);
            
            return true;

        } catch (error) {
            const errorMsg = `Failed to load configs: ${error}`;
            print(`[UnitConfigManager] ${errorMsg}`);
            
            this.loadStatus.loadErrors.push(errorMsg);
            return false;
        }
    }

    /**
     * 加载配置文件
     */
    private loadConfigFile(): UnitConfigDictionary | null {
        try {
            // 在DOTA2 Lua环境中，我们需要使用特殊的方式加载JSON
            // 这里假设配置已经通过构建流程转换为可访问的格式
            
            // 方法1: 尝试直接require（如果文件在正确位置）
            try {
                const customUnits = require(this.options.configPath!);
                return customUnits as UnitConfigDictionary;
            } catch (requireError) {
                print(`[UnitConfigManager] Direct require failed: ${requireError}`);
            }

            // 方法2: 尝试从全局变量获取（如果在其他地方已加载）
            if ((globalThis as any).UNIT_CONFIGS) {
                return (globalThis as any).UNIT_CONFIGS as UnitConfigDictionary;
            }

            // 方法3: 返回默认配置
            print('[UnitConfigManager] Using fallback default configurations');
            return this.getDefaultConfigs();

        } catch (error) {
            print(`[UnitConfigManager] Error loading config file: ${error}`);
            return null;
        }
    }

    /**
     * 获取默认配置（作为后备方案）
     */
    private getDefaultConfigs(): UnitConfigDictionary {
        return {
            'default_unit': {
                BaseClass: 'npc_dota_creature',
                Level: 1,
                StatusHealth: 500,
                StatusMana: 100,
                AttackDamageMin: 50,
                AttackDamageMax: 60,
                ArmorPhysical: 2,
                MagicalResistance: 25,
                MovementSpeed: 300,
                AttackRange: 128,
                ModelScale: 1.0
            },
            'training_dummy': {
                BaseClass: 'npc_dota_training_dummy',
                Level: 1,
                StatusHealth: 10000,
                StatusMana: 0,
                AttackDamageMin: 0,
                AttackDamageMax: 0,
                ArmorPhysical: 0,
                MagicalResistance: 0,
                MovementSpeed: 0,
                AttackRange: 0,
                ModelScale: 1.0,
                AttackCapabilities: 'DOTA_UNIT_CAP_NO_ATTACK'
            }
        };
    }

    /**
     * 验证配置
     */
    private validateConfigs(configs: UnitConfigDictionary): ConfigValidationResult {
        const result: ConfigValidationResult = {
            isValid: true,
            errors: [],
            warnings: []
        };

        for (const [unitName, config] of Object.entries(configs)) {
            // 检查必要字段
            if (!config.BaseClass && !unitName.startsWith('npc_')) {
                result.warnings.push(`Unit '${unitName}' has no BaseClass and doesn't follow npc_ naming convention`);
            }

            // 检查数值范围
            if (config.StatusHealth !== undefined && config.StatusHealth <= 0) {
                result.errors.push(`Unit '${unitName}' has invalid health: ${config.StatusHealth}`);
                result.isValid = false;
            }

            if (config.MovementSpeed !== undefined && config.MovementSpeed < 0) {
                result.errors.push(`Unit '${unitName}' has invalid movement speed: ${config.MovementSpeed}`);
                result.isValid = false;
            }

            // 检查攻击力配置
            if (config.AttackDamageMin !== undefined && config.AttackDamageMax !== undefined) {
                if (config.AttackDamageMin > config.AttackDamageMax) {
                    result.errors.push(`Unit '${unitName}' has min damage > max damage`);
                    result.isValid = false;
                }
            }
        }

        return result;
    }

    /**
     * 设置热重载
     */
    private setupHotReload(): void {
        // 在DOTA2环境中，我们可以通过定时器检查配置更新
        // 这里设置一个简单的重载机制
        if (this.options.enableHotReload) {
            // 可以通过调试命令触发重载
            print('[UnitConfigManager] Hot reload enabled - use debug command to reload configs');
        }
    }

    /**
     * 获取单位配置
     */
    public getUnitConfig(unitName: string): UnitConfig | null {
        const config = this.configs[unitName];
        if (!config) {
            print(`[UnitConfigManager] No configuration found for unit: ${unitName}`);
            return null;
        }
        
        // 返回配置的深拷贝以防止意外修改
        return { ...config };
    }

    /**
     * 获取所有可用的单位名称
     */
    public getAvailableUnits(): string[] {
        return Object.keys(this.configs);
    }

    /**
     * 检查单位是否存在配置
     */
    public hasConfig(unitName: string): boolean {
        return unitName in this.configs;
    }

    /**
     * 获取配置数量
     */
    public getConfigCount(): number {
        return Object.keys(this.configs).length;
    }

    /**
     * 获取加载状态
     */
    public getLoadStatus(): ConfigLoadStatus {
        return { ...this.loadStatus };
    }

    /**
     * 重新加载配置
     */
    public reloadConfigs(): boolean {
        print('[UnitConfigManager] Reloading configurations...');
        return this.loadConfigs();
    }

    /**
     * 添加或更新单位配置
     */
    public setUnitConfig(unitName: string, config: UnitConfig): void {
        this.configs[unitName] = { ...config };
        print(`[UnitConfigManager] Updated configuration for unit: ${unitName}`);
    }

    /**
     * 删除单位配置
     */
    public removeUnitConfig(unitName: string): boolean {
        if (this.hasConfig(unitName)) {
            delete this.configs[unitName];
            print(`[UnitConfigManager] Removed configuration for unit: ${unitName}`);
            return true;
        }
        return false;
    }

    /**
     * 获取配置统计信息
     */
    public getConfigStats(): any {
        const stats = {
            totalConfigs: this.getConfigCount(),
            loadStatus: this.getLoadStatus(),
            configTypes: {} as Record<string, number>
        };

        // 统计配置类型
        for (const config of Object.values(this.configs)) {
            const baseClass = config.BaseClass || 'unknown';
            stats.configTypes[baseClass] = (stats.configTypes[baseClass] || 0) + 1;
        }

        return stats;
    }

    /**
     * 搜索配置
     */
    public searchConfigs(searchTerm: string): string[] {
        const results: string[] = [];
        const term = searchTerm.toLowerCase();

        for (const unitName of Object.keys(this.configs)) {
            if (unitName.toLowerCase().includes(term)) {
                results.push(unitName);
            }
        }

        return results;
    }

    /**
     * 导出配置
     */
    public exportConfigs(): UnitConfigDictionary {
        return { ...this.configs };
    }

    /**
     * 清理资源
     */
    public cleanup(): void {
        this.configs = {};
        this.loadStatus.loaded = false;
        print('[UnitConfigManager] Cleaned up resources');
    }
}

// 导出单例实例
export const unitConfigManager = UnitConfigManager.getInstance();
