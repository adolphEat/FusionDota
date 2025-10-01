/**
 * 对战系统配置加载器
 * Battle System Configuration Loader
 */

import { 
    LevelConfig, 
    TeamConfig, 
    UnitSpawnConfig,
    RewardConfig,
    WinConditionType,
    FormationType,
    ConfigValidationResult,
    isValidLevelConfig,
    isValidTeamConfig
} from './DataTypes';

export class BattleConfigLoader {
    private static instance: BattleConfigLoader;
    private levelConfigs: Map<string, LevelConfig> = new Map();
    private teamConfigs: Map<string, TeamConfig> = new Map();
    private loadStatus: {
        loaded: boolean;
        lastLoadTime: number;
        errors: string[];
    } = {
        loaded: false,
        lastLoadTime: 0,
        errors: []
    };

    public static getInstance(): BattleConfigLoader {
        if (!BattleConfigLoader.instance) {
            BattleConfigLoader.instance = new BattleConfigLoader();
        }
        return BattleConfigLoader.instance;
    }

    private constructor() {
        this.initialize();
    }

    /**
     * 初始化配置加载器
     */
    private initialize(): void {
        try {
            this.loadConfigs();
            print('[BattleConfigLoader] Initialized successfully');
        } catch (error) {
            print(`[BattleConfigLoader] Initialization failed: ${error}`);
        }
    }

    /**
     * 加载所有配置
     */
    public loadConfigs(): boolean {
        try {
            this.loadStatus.errors = [];
            const startTime = Date.now();

            // 清空现有配置
            this.levelConfigs.clear();
            this.teamConfigs.clear();

            // 加载关卡配置
            this.loadLevelConfigs();
            
            // 加载队伍配置  
            this.loadTeamConfigs();
            
            // 验证配置完整性
            const validation = this.validateConfigs();
            if (validation.errors.length > 0) {
                this.loadStatus.errors.push(...validation.errors);
                print(`[BattleConfigLoader] Validation errors: ${validation.errors.join(', ')}`);
            }

            if (validation.warnings.length > 0) {
                print(`[BattleConfigLoader] Validation warnings: ${validation.warnings.join(', ')}`);
            }
            
            // 更新加载状态
            this.loadStatus.loaded = true;
            this.loadStatus.lastLoadTime = Date.now();
            
            const loadTime = Date.now() - startTime;
            print(`[BattleConfigLoader] Loaded ${this.levelConfigs.size} levels, ${this.teamConfigs.size} team configs in ${loadTime}ms`);
            
            // 同步到网络表
            this.syncToNetTable();
            
            return this.loadStatus.errors.length === 0;
            
        } catch (error) {
            const errorMsg = `Failed to load configs: ${error}`;
            print(`[BattleConfigLoader] ${errorMsg}`);
            this.loadStatus.errors.push(errorMsg);
            return false;
        }
    }

    /**
     * 加载关卡配置
     */
    private loadLevelConfigs(): void {
        try {
            // 尝试从JSON文件加载关卡配置
            let levelData: any = {};
            
            try {
                // levelData = require('../json/guan_qia_pei_zhi_biao.json');
                levelData = this.getDefaultLevelConfigs();  // 暂时使用默认配置
            } catch (error) {
                print(`[BattleConfigLoader] Level config file not found, using defaults: ${error}`);
                levelData = this.getDefaultLevelConfigs();
            }
            
            for (const [key, config] of Object.entries(levelData)) {
                const levelConfig = this.parseLevelConfig(key as string, config as any);
                if (levelConfig && isValidLevelConfig(levelConfig)) {
                    this.levelConfigs.set(levelConfig.level_id, levelConfig);
                } else {
                    print(`[BattleConfigLoader] Invalid level config: ${key}`);
                }
            }
            
        } catch (error) {
            print(`[BattleConfigLoader] Error loading level configs: ${error}`);
            // 使用默认配置作为后备
            const defaultConfigs = this.getDefaultLevelConfigs();
            for (const [key, config] of Object.entries(defaultConfigs)) {
                const levelConfig = this.parseLevelConfig(key, config);
                if (levelConfig) {
                    this.levelConfigs.set(levelConfig.level_id, levelConfig);
                }
            }
        }
    }

    /**
     * 加载队伍配置
     */
    private loadTeamConfigs(): void {
        try {
            // 尝试从JSON文件加载队伍配置
            let teamData: any = {};
            
            try {
                // teamData = require('../json/dui_wu_pei_zhi_biao.json');
                teamData = this.getDefaultTeamConfigs();  // 暂时使用默认配置
            } catch (error) {
                print(`[BattleConfigLoader] Team config file not found, using defaults: ${error}`);
                teamData = this.getDefaultTeamConfigs();
            }
            
            for (const [key, config] of Object.entries(teamData)) {
                const teamConfig = this.parseTeamConfig(key as string, config as any);
                if (teamConfig && isValidTeamConfig(teamConfig)) {
                    this.teamConfigs.set(teamConfig.team_config_id, teamConfig);
                } else {
                    print(`[BattleConfigLoader] Invalid team config: ${key}`);
                }
            }
            
        } catch (error) {
            print(`[BattleConfigLoader] Error loading team configs: ${error}`);
            // 使用默认配置作为后备
            const defaultConfigs = this.getDefaultTeamConfigs();
            for (const [key, config] of Object.entries(defaultConfigs)) {
                const teamConfig = this.parseTeamConfig(key, config);
                if (teamConfig) {
                    this.teamConfigs.set(teamConfig.team_config_id, teamConfig);
                }
            }
        }
    }

    /**
     * 解析关卡配置
     */
    private parseLevelConfig(key: string, data: any): LevelConfig | null {
        try {
            return {
                level_id: data.level_id || key,
                level_name: data.level_name || `Level ${key}`,
                level_desc: data.level_desc || '',
                difficulty: this.parseNumber(data.difficulty, 1),
                map_area: data.map_area || 'center_area',
                time_limit: this.parseNumber(data.time_limit, 300),
                win_condition: this.parseWinCondition(data.win_condition),
                team1_config: data.team1_config || 'team_config_001',
                team2_config: data.team2_config || 'team_config_002',
                rewards: this.parseRewards(data.rewards),
                unlock_condition: data.unlock_condition || ''
            };
        } catch (error) {
            print(`[BattleConfigLoader] Error parsing level config ${key}: ${error}`);
            return null;
        }
    }

    /**
     * 解析队伍配置
     */
    private parseTeamConfig(key: string, data: any): TeamConfig | null {
        try {
            return {
                team_config_id: data.team_config_id || key,
                team_name: data.team_name || `Team ${key}`,
                formation: this.parseFormation(data.formation),
                spawn_area: this.parseVector(data.spawn_area),
                unit_configs: this.parseUnitConfigs(data.unit_configs)
            };
        } catch (error) {
            print(`[BattleConfigLoader] Error parsing team config ${key}: ${error}`);
            return null;
        }
    }

    /**
     * 解析数字
     */
    private parseNumber(value: any, defaultValue: number): number {
        const parsed = typeof value === 'string' ? parseInt(value) : value;
        return typeof parsed === 'number' && !isNaN(parsed) ? parsed : defaultValue;
    }

    /**
     * 解析胜利条件
     */
    private parseWinCondition(condition: any): WinConditionType {
        if (Object.values(WinConditionType).includes(condition)) {
            return condition as WinConditionType;
        }
        return WinConditionType.ELIMINATE_ALL;
    }

    /**
     * 解析阵型
     */
    private parseFormation(formation: any): FormationType {
        if (Object.values(FormationType).includes(formation)) {
            return formation as FormationType;
        }
        return FormationType.LINE;
    }

    /**
     * 解析坐标
     */
    private parseVector(vectorStr: any): Vector {
        if (typeof vectorStr !== 'string') {
            return Vector(0, 0, 128);
        }
        
        const parts = vectorStr.split(',').map((s: string) => parseFloat(s.trim()));
        return Vector(
            parts[0] || 0,
            parts[1] || 0,
            parts[2] || 128
        );
    }

    /**
     * 解析单位配置
     */
    private parseUnitConfigs(configStr: any): UnitSpawnConfig[] {
        const configs: UnitSpawnConfig[] = [];
        
        if (typeof configStr !== 'string' || !configStr) {
            // 返回默认配置
            return [{
                unit_id: 'npc_dota_neutral_kobold',
                count: 1
            }];
        }
        
        const pairs = configStr.split(',');
        for (const pair of pairs) {
            const [unitId, countStr, levelStr] = pair.split(':');
            if (unitId && countStr) {
                configs.push({
                    unit_id: unitId.trim(),
                    count: parseInt(countStr.trim()) || 1,
                    level: levelStr ? parseInt(levelStr.trim()) : undefined
                });
            }
        }
        
        return configs.length > 0 ? configs : [{
            unit_id: 'npc_dota_neutral_kobold',
            count: 1
        }];
    }

    /**
     * 解析奖励
     */
    private parseRewards(rewardStr: any): RewardConfig {
        const rewards: RewardConfig = {};
        
        if (typeof rewardStr !== 'string' || !rewardStr) {
            return rewards;
        }
        
        const pairs = rewardStr.split(',');
        for (const pair of pairs) {
            const [type, valueStr] = pair.split(':');
            if (type && valueStr) {
                rewards[type.trim()] = parseInt(valueStr.trim()) || 0;
            }
        }
        
        return rewards;
    }

    /**
     * 获取默认关卡配置
     */
    private getDefaultLevelConfigs(): Record<string, any> {
        return {
            'level_001': {
                level_id: 'level_001',
                level_name: '基础对战',
                level_desc: '简单的单位对战训练',
                difficulty: 1,
                map_area: 'center_area',
                time_limit: 300,
                win_condition: WinConditionType.ELIMINATE_ALL,
                team1_config: 'team_config_001',
                team2_config: 'team_config_002',
                rewards: 'exp:100,gold:50',
                unlock_condition: ''
            },
            'level_002': {
                level_id: 'level_002',
                level_name: '混合部队',
                level_desc: '不同类型单位的混合对战',
                difficulty: 2,
                map_area: 'center_area',
                time_limit: 400,
                win_condition: WinConditionType.ELIMINATE_ALL,
                team1_config: 'team_config_003',
                team2_config: 'team_config_004',
                rewards: 'exp:200,gold:100',
                unlock_condition: 'level_001:win'
            },
            'level_003': {
                level_id: 'level_003',
                level_name: '精英对决',
                level_desc: '强化单位的激烈对战',
                difficulty: 3,
                map_area: 'center_area',
                time_limit: 500,
                win_condition: WinConditionType.ELIMINATE_ALL,
                team1_config: 'team_config_005',
                team2_config: 'team_config_006',
                rewards: 'exp:300,gold:200',
                unlock_condition: 'level_002:win'
            }
        };
    }

    /**
     * 获取默认队伍配置
     */
    private getDefaultTeamConfigs(): Record<string, any> {
        return {
            'team_config_001': {
                team_config_id: 'team_config_001',
                team_name: '哥布林小队',
                formation: FormationType.LINE,
                spawn_area: '-500,0,128',
                unit_configs: 'npc_dota_neutral_kobold:3'
            },
            'team_config_002': {
                team_config_id: 'team_config_002',
                team_name: '敌方小队',
                formation: FormationType.LINE,
                spawn_area: '500,0,128',
                unit_configs: 'npc_dota_neutral_kobold:3'
            },
            'team_config_003': {
                team_config_id: 'team_config_003',
                team_name: '混合部队A',
                formation: FormationType.CIRCLE,
                spawn_area: '-600,0,128',
                unit_configs: 'npc_dota_neutral_kobold:2,npc_dota_neutral_centaur_khan:1'
            },
            'team_config_004': {
                team_config_id: 'team_config_004',
                team_name: '混合部队B',
                formation: FormationType.CIRCLE,
                spawn_area: '600,0,128',
                unit_configs: 'npc_dota_neutral_kobold:2,npc_dota_neutral_centaur_khan:1'
            },
            'team_config_005': {
                team_config_id: 'team_config_005',
                team_name: '精英战士',
                formation: FormationType.CUSTOM,
                spawn_area: '-400,0,128',
                unit_configs: 'npc_dota_neutral_centaur_khan:1:5'
            },
            'team_config_006': {
                team_config_id: 'team_config_006',
                team_name: '精英对手',
                formation: FormationType.CUSTOM,
                spawn_area: '400,0,128',
                unit_configs: 'npc_dota_neutral_centaur_khan:1:5'
            }
        };
    }

    /**
     * 验证配置完整性
     */
    private validateConfigs(): ConfigValidationResult {
        const result: ConfigValidationResult = {
            isValid: true,
            errors: [],
            warnings: [],
            missingConfigs: []
        };

        // 验证关卡配置
        for (const [levelId, levelConfig] of this.levelConfigs) {
            // 检查队伍配置是否存在
            if (!this.teamConfigs.has(levelConfig.team1_config)) {
                result.warnings.push(`Level ${levelId}: Team config ${levelConfig.team1_config} not found`);
                result.missingConfigs.push(levelConfig.team1_config);
            }
            
            if (!this.teamConfigs.has(levelConfig.team2_config)) {
                result.warnings.push(`Level ${levelId}: Team config ${levelConfig.team2_config} not found`);
                result.missingConfigs.push(levelConfig.team2_config);
            }

            // 检查数值范围
            if (levelConfig.difficulty < 1 || levelConfig.difficulty > 5) {
                result.warnings.push(`Level ${levelId}: Difficulty ${levelConfig.difficulty} out of range (1-5)`);
            }

            if (levelConfig.time_limit <= 0) {
                result.errors.push(`Level ${levelId}: Invalid time limit ${levelConfig.time_limit}`);
                result.isValid = false;
            }
        }

        // 验证队伍配置
        for (const [teamId, teamConfig] of this.teamConfigs) {
            if (teamConfig.unit_configs.length === 0) {
                result.errors.push(`Team ${teamId}: No unit configs defined`);
                result.isValid = false;
            }

            // 检查单位配置
            for (const unitConfig of teamConfig.unit_configs) {
                if (unitConfig.count <= 0) {
                    result.errors.push(`Team ${teamId}: Invalid unit count ${unitConfig.count} for ${unitConfig.unit_id}`);
                    result.isValid = false;
                }
            }
        }

        return result;
    }

    /**
     * 同步配置到网络表
     */
    private syncToNetTable(): void {
        try {
            if (GameRules.XNetTable) {
                // 同步关卡列表
                const levelList = Array.from(this.levelConfigs.values()).map(level => ({
                    id: level.level_id,
                    name: level.level_name,
                    description: level.level_desc,
                    difficulty: level.difficulty,
                    timeLimit: level.time_limit,
                    rewards: level.rewards
                }));

                GameRules.XNetTable.SetTableValue('battle_system', 'available_levels', {
                    levels: levelList,
                    lastUpdate: Date.now()
                });

                // 同步加载状态
                GameRules.XNetTable.SetTableValue('battle_system', 'config_status', {
                    loaded: this.loadStatus.loaded,
                    levelCount: this.levelConfigs.size,
                    teamCount: this.teamConfigs.size,
                    lastLoadTime: this.loadStatus.lastLoadTime,
                    errors: this.loadStatus.errors
                });
            }
        } catch (error) {
            print(`[BattleConfigLoader] Failed to sync to net table: ${error}`);
        }
    }

    /**
     * 获取关卡配置
     */
    public getLevelConfig(levelId: string): LevelConfig | null {
        return this.levelConfigs.get(levelId) || null;
    }

    /**
     * 获取队伍配置
     */
    public getTeamConfig(teamConfigId: string): TeamConfig | null {
        return this.teamConfigs.get(teamConfigId) || null;
    }

    /**
     * 获取所有关卡
     */
    public getAllLevels(): LevelConfig[] {
        return Array.from(this.levelConfigs.values());
    }

    /**
     * 获取可用关卡（根据解锁条件）
     */
    public getAvailableLevels(playerProgress?: any): LevelConfig[] {
        return this.getAllLevels().filter(level => 
            this.isLevelUnlocked(level, playerProgress || {})
        );
    }

    /**
     * 检查关卡是否解锁
     */
    private isLevelUnlocked(level: LevelConfig, playerProgress: any): boolean {
        if (!level.unlock_condition) return true;
        
        try {
            // 解析解锁条件 (例如: "level_001:win")
            const [requiredLevel, condition] = level.unlock_condition.split(':');
            
            if (condition === 'win') {
                return playerProgress.completedLevels?.includes(requiredLevel) || false;
            }
            
            return true;
        } catch (error) {
            print(`[BattleConfigLoader] Error checking unlock condition for ${level.level_id}: ${error}`);
            return true;
        }
    }

    /**
     * 搜索关卡
     */
    public searchLevels(searchTerm: string): LevelConfig[] {
        const term = searchTerm.toLowerCase();
        return this.getAllLevels().filter(level =>
            level.level_name.toLowerCase().includes(term) ||
            level.level_desc.toLowerCase().includes(term) ||
            level.level_id.toLowerCase().includes(term)
        );
    }

    /**
     * 获取加载状态
     */
    public getLoadStatus(): typeof this.loadStatus {
        return { ...this.loadStatus };
    }

    /**
     * 获取配置统计
     */
    public getConfigStats(): any {
        const stats = {
            totalLevels: this.levelConfigs.size,
            totalTeams: this.teamConfigs.size,
            difficultyDistribution: {} as Record<number, number>,
            winConditionDistribution: {} as Record<string, number>,
            formationDistribution: {} as Record<string, number>
        };

        // 统计难度分布
        for (const level of this.levelConfigs.values()) {
            stats.difficultyDistribution[level.difficulty] = 
                (stats.difficultyDistribution[level.difficulty] || 0) + 1;
            
            stats.winConditionDistribution[level.win_condition] = 
                (stats.winConditionDistribution[level.win_condition] || 0) + 1;
        }

        // 统计阵型分布
        for (const team of this.teamConfigs.values()) {
            stats.formationDistribution[team.formation] = 
                (stats.formationDistribution[team.formation] || 0) + 1;
        }

        return stats;
    }

    /**
     * 重新加载配置
     */
    public reloadConfigs(): boolean {
        print('[BattleConfigLoader] Reloading configurations...');
        return this.loadConfigs();
    }
}
