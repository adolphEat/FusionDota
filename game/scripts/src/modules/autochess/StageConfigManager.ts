/**
 * 关卡配置管理器
 * Stage Configuration Manager
 * 
 * 管理游戏关卡配置，包括节点类型、掉落概率等
 */

/**
 * 节点类型枚举
 */
export enum NodeType {
    NORMAL_BATTLE = 'normal_battle',      // 普通战斗
    ELITE_BATTLE = 'elite_battle',       // 精英战斗
    EVENT = 'event',                     // 事件
    EVENT_EVACUATE = 'event_evacuate',   // 事件/撤离
    BOSS = 'boss'                        // Boss
}

/**
 * 费用卡掉落概率配置
 */
export interface CardDropRates {
    cost1: number;  // 1费卡概率 (0-100)
    cost2: number;  // 2费卡概率 (0-100)
    cost3: number;  // 3费卡概率 (0-100)
    cost4: number;  // 4费卡概率 (0-100)
    cost5: number;  // 5费卡概率 (0-100)
}

/**
 * 关卡节点配置
 */
export interface StageNodeConfig {
    stageId: number;                    // 关卡ID
    nodeLevel: number;                  // 节点层级 (配表用)
    primaryNodeType: NodeType;          // 主节点类型
    secondaryNodeType: NodeType;        // 次节点类型
    normalNodeDropRates: CardDropRates; // 普通节点出率
    eliteNodeDropRates: CardDropRates;  // 精英节点出率
    averageDropRates: CardDropRates;    // 平均出率
    monsterCountConfig: MonsterCountConfig; // 怪物数量配置
}

/**
 * 英雄费用配置
 */
export interface HeroCostConfig {
    heroId: string;      // 英雄ID
    displayName: string; // 显示名称
    cost: number;        // 费用 (1-5)
}

/**
 * 英雄费用映射
 */
export interface HeroCostMapping {
    [heroId: string]: number; // 英雄ID -> 费用
}

/**
 * 怪物数量选项（带概率）
 */
export interface MonsterCountOption {
    count: number;      // 怪物数量
    probability: number; // 概率 (0-100)
}

/**
 * 怪物数量配置
 */
export interface MonsterCountConfig {
    options: MonsterCountOption[]; // 数量选项列表
    specialCount?: number;         // 特殊怪物数量（如Boss）
    specialType?: string;          // 特殊怪物类型（如"boss", "elite"）
}

/**
 * 关卡配置管理器
 */
export class StageConfigManager {
    private static stageConfigs: Map<number, StageNodeConfig> = new Map();
    
    // 英雄费用配置
    private static heroCostMap: Map<string, number> = new Map(); // 英雄ID -> 费用
    private static costHeroMap: Map<number, string[]> = new Map(); // 费用 -> 英雄ID列表
    private static heroConfigs: Map<string, HeroCostConfig> = new Map(); // 英雄ID -> 完整配置

    /**
     * 初始化英雄费用配置
     */
    public static initializeHeroCostConfigs(): void {
        // 一费英雄 (Cost 1)
        const cost1Heroes: HeroCostConfig[] = [
            { heroId: 'treant_protector1', displayName: '树精卫士', cost: 1 },
            { heroId: 'windrunner1', displayName: '风行者', cost: 1 },
            { heroId: 'mars1', displayName: '战争之矛', cost: 1 },
            { heroId: 'razor1', displayName: '雷泽', cost: 1 },
            { heroId: 'lion1', displayName: '恶魔巫师', cost: 1 },
            { heroId: 'enchantress1', displayName: '魅惑魔女', cost: 1 }
        ];

        // 二费英雄 (Cost 2)
        const cost2Heroes: HeroCostConfig[] = [
            { heroId: 'axe1', displayName: '斧王', cost: 2 },
            { heroId: 'ursa1', displayName: '熊战士', cost: 2 },
            { heroId: 'oracle1', displayName: '神谕者', cost: 2 },
            { heroId: 'drow_ranger1', displayName: '卓尔游侠', cost: 2 }, // 补充缺失的ID
            { heroId: 'lina1', displayName: '秀逗魔导师', cost: 2 }
        ];

        // 三费英雄 (Cost 3)
        const cost3Heroes: HeroCostConfig[] = [
            { heroId: 'ember_spirit1', displayName: '灰烬之灵', cost: 3 },
            { heroId: 'anti_mage1', displayName: '敌法师', cost: 3 },
            { heroId: 'placeholder_hero1', displayName: '1111', cost: 3 }, // 占位符英雄
            { heroId: 'viper1', displayName: '冥界亚龙', cost: 3 },
            { heroId: 'death_prophet1', displayName: '死亡先知', cost: 3 }
        ];

        // 四费英雄 (Cost 4)
        const cost4Heroes: HeroCostConfig[] = [
            { heroId: 'underlord1', displayName: '孽主', cost: 4 },
            { heroId: 'shadow_fiend1', displayName: '影魔', cost: 4 },
            { heroId: 'crystal_maiden1', displayName: '水晶室女', cost: 4 },
            { heroId: 'ogre_magi1', displayName: '食人魔法师', cost: 4 }
        ];

        // 五费英雄 (Cost 5)
        const cost5Heroes: HeroCostConfig[] = [
            { heroId: 'enigma1', displayName: '谜团', cost: 5 },
            { heroId: 'dawnbreaker1', displayName: '破晓晨星', cost: 5 },
            { heroId: 'zeus1', displayName: '宙斯', cost: 5 }
        ];

        // 注册所有英雄配置
        const allHeroes = [...cost1Heroes, ...cost2Heroes, ...cost3Heroes, ...cost4Heroes, ...cost5Heroes];
        
        for (const hero of allHeroes) {
            this.heroCostMap.set(hero.heroId, hero.cost);
            this.heroConfigs.set(hero.heroId, hero);
            
            // 按费用分组
            if (!this.costHeroMap.has(hero.cost)) {
                this.costHeroMap.set(hero.cost, []);
            }
            this.costHeroMap.get(hero.cost)!.push(hero.heroId);
        }

        print(`[StageConfigManager] Initialized ${allHeroes.length} hero cost configurations`);
        print(`[StageConfigManager] Cost distribution: 1费=${cost1Heroes.length}, 2费=${cost2Heroes.length}, 3费=${cost3Heroes.length}, 4费=${cost4Heroes.length}, 5费=${cost5Heroes.length}`);
    }

    /**
     * 初始化关卡配置
     */
    public static initializeStageConfigs(): void {
        // 关卡1: 普通战斗
        this.stageConfigs.set(1, {
            stageId: 1,
            nodeLevel: 1,
            primaryNodeType: NodeType.NORMAL_BATTLE,
            secondaryNodeType: NodeType.NORMAL_BATTLE,
            normalNodeDropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
            eliteNodeDropRates: { cost1: 70, cost2: 27, cost3: 3, cost4: 0, cost5: 0 },
            averageDropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
            monsterCountConfig: {
                options: [{ count: 1, probability: 100 }]
            }
        });

        // 关卡2: 普通战斗
        this.stageConfigs.set(2, {
            stageId: 2,
            nodeLevel: 2,
            primaryNodeType: NodeType.NORMAL_BATTLE,
            secondaryNodeType: NodeType.NORMAL_BATTLE,
            normalNodeDropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
            eliteNodeDropRates: { cost1: 70, cost2: 27, cost3: 3, cost4: 0, cost5: 0 },
            averageDropRates: { cost1: 70, cost2: 30, cost3: 0, cost4: 0, cost5: 0 },
            monsterCountConfig: {
                options: [{ count: 2, probability: 100 }]
            }
        });

        // 关卡3: 普通战斗
        this.stageConfigs.set(3, {
            stageId: 3,
            nodeLevel: 3,
            primaryNodeType: NodeType.NORMAL_BATTLE,
            secondaryNodeType: NodeType.NORMAL_BATTLE,
            normalNodeDropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
            eliteNodeDropRates: { cost1: 60, cost2: 35, cost3: 5, cost4: 0, cost5: 0 },
            averageDropRates: { cost1: 60, cost2: 35, cost3: 5, cost4: 0, cost5: 0 },
            monsterCountConfig: {
                options: [
                    { count: 3, probability: 40 },
                    { count: 2, probability: 60 }
                ]
            }
        });

        // 关卡4: 事件/普通战斗
        this.stageConfigs.set(4, {
            stageId: 4,
            nodeLevel: 4,
            primaryNodeType: NodeType.EVENT,
            secondaryNodeType: NodeType.NORMAL_BATTLE,
            normalNodeDropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
            eliteNodeDropRates: { cost1: 50, cost2: 35, cost3: 10, cost4: 4, cost5: 1 },
            averageDropRates: { cost1: 45, cost2: 29, cost3: 16, cost4: 1, cost5: 0 },
            monsterCountConfig: {
                options: [
                    { count: 4, probability: 50 },
                    { count: 3, probability: 50 }
                ]
            }
        });

        // 关卡5: 普通战斗
        this.stageConfigs.set(5, {
            stageId: 5,
            nodeLevel: 5,
            primaryNodeType: NodeType.NORMAL_BATTLE,
            secondaryNodeType: NodeType.NORMAL_BATTLE,
            normalNodeDropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
            eliteNodeDropRates: { cost1: 50, cost2: 35, cost3: 10, cost4: 4, cost5: 1 },
            averageDropRates: { cost1: 40, cost2: 35, cost3: 20, cost4: 4, cost5: 1 },
            monsterCountConfig: {
                options: [
                    { count: 4, probability: 50 },
                    { count: 3, probability: 50 }
                ]
            }
        });

        // 关卡6: 精英战斗
        this.stageConfigs.set(6, {
            stageId: 6,
            nodeLevel: 6,
            primaryNodeType: NodeType.ELITE_BATTLE,
            secondaryNodeType: NodeType.ELITE_BATTLE,
            normalNodeDropRates: { cost1: 60, cost2: 35, cost3: 5, cost4: 0, cost5: 0 },
            eliteNodeDropRates: { cost1: 40, cost2: 35, cost3: 20, cost4: 4, cost5: 1 },
            averageDropRates: { cost1: 35, cost2: 35, cost3: 25, cost4: 4, cost5: 1 },
            monsterCountConfig: {
                options: [{ count: 5, probability: 100 }]
            }
        });

        // 关卡7: 普通战斗
        this.stageConfigs.set(7, {
            stageId: 7,
            nodeLevel: 7,
            primaryNodeType: NodeType.NORMAL_BATTLE,
            secondaryNodeType: NodeType.NORMAL_BATTLE,
            normalNodeDropRates: { cost1: 50, cost2: 35, cost3: 10, cost4: 4, cost5: 1 },
            eliteNodeDropRates: { cost1: 30, cost2: 35, cost3: 25, cost4: 8, cost5: 2 },
            averageDropRates: { cost1: 30, cost2: 35, cost3: 25, cost4: 8, cost5: 2 },
            monsterCountConfig: {
                options: [{ count: 6, probability: 100 }]
            }
        });

        // 关卡8: 精英战斗
        this.stageConfigs.set(8, {
            stageId: 8,
            nodeLevel: 8,
            primaryNodeType: NodeType.ELITE_BATTLE,
            secondaryNodeType: NodeType.ELITE_BATTLE,
            normalNodeDropRates: { cost1: 40, cost2: 35, cost3: 20, cost4: 4, cost5: 1 },
            eliteNodeDropRates: { cost1: 25, cost2: 30, cost3: 30, cost4: 12, cost5: 3 },
            averageDropRates: { cost1: 25, cost2: 30, cost3: 30, cost4: 12, cost5: 3 },
            monsterCountConfig: {
                options: [{ count: 7, probability: 100 }]
            }
        });

        // 关卡9: 事件/撤离
        this.stageConfigs.set(9, {
            stageId: 9,
            nodeLevel: 9,
            primaryNodeType: NodeType.EVENT_EVACUATE,
            secondaryNodeType: NodeType.EVENT_EVACUATE,
            normalNodeDropRates: { cost1: 25, cost2: 35, cost3: 30, cost4: 8, cost5: 2 },
            eliteNodeDropRates: { cost1: 20, cost2: 25, cost3: 30, cost4: 20, cost5: 5 },
            averageDropRates: { cost1: 0, cost2: 0, cost3: 0, cost4: 0, cost5: 0 }, // 特殊节点，平均出率为0
            monsterCountConfig: {
                options: [{ count: 8, probability: 100 }]
            }
        });

        // 关卡10: 精英战斗
        this.stageConfigs.set(10, {
            stageId: 10,
            nodeLevel: 10,
            primaryNodeType: NodeType.ELITE_BATTLE,
            secondaryNodeType: NodeType.ELITE_BATTLE,
            normalNodeDropRates: { cost1: 30, cost2: 35, cost3: 25, cost4: 8, cost5: 2 },
            eliteNodeDropRates: { cost1: 20, cost2: 25, cost3: 30, cost4: 20, cost5: 5 },
            averageDropRates: { cost1: 20, cost2: 25, cost3: 30, cost4: 20, cost5: 5 },
            monsterCountConfig: {
                options: [{ count: 8, probability: 100 }]
            }
        });

        // 关卡11: Boss (7+1: 7个普通怪物 + 1个Boss)
        this.stageConfigs.set(11, {
            stageId: 11,
            nodeLevel: 11,
            primaryNodeType: NodeType.BOSS,
            secondaryNodeType: NodeType.BOSS,
            normalNodeDropRates: { cost1: 20, cost2: 25, cost3: 30, cost4: 20, cost5: 5 },
            eliteNodeDropRates: { cost1: 15, cost2: 20, cost3: 25, cost4: 30, cost5: 10 },
            averageDropRates: { cost1: 15, cost2: 20, cost3: 25, cost4: 30, cost5: 10 },
            monsterCountConfig: {
                options: [{ count: 7, probability: 100 }],
                specialCount: 1,
                specialType: 'boss'
            }
        });

        print(`[StageConfigManager] Initialized ${this.stageConfigs.size} stage configurations`);
    }

    /**
     * 初始化所有配置（关卡配置 + 英雄费用配置）
     */
    public static initialize(): void {
        this.initializeHeroCostConfigs();
        this.initializeStageConfigs();
    }

    /**
     * 获取英雄费用
     */
    public static getHeroCost(heroId: string): number | null {
        return this.heroCostMap.get(heroId) || null;
    }

    /**
     * 根据费用获取英雄ID列表
     */
    public static getHeroesByCost(cost: number): string[] {
        return this.costHeroMap.get(cost) || [];
    }

    /**
     * 获取英雄完整配置
     */
    public static getHeroConfig(heroId: string): HeroCostConfig | null {
        return this.heroConfigs.get(heroId) || null;
    }

    /**
     * 根据费用随机获取一个英雄ID
     */
    public static getRandomHeroByCost(cost: number): string | null {
        const heroes = this.getHeroesByCost(cost);
        if (heroes.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(RandomFloat(0, heroes.length));
        return heroes[randomIndex];
    }

    /**
     * 根据关卡和节点类型随机获取一个英雄ID
     */
    public static rollHeroByStage(stageId: number, isElite: boolean): string | null {
        const cost = this.rollCardCost(stageId, isElite);
        return this.getRandomHeroByCost(cost);
    }

    /**
     * 获取所有英雄配置
     */
    public static getAllHeroConfigs(): Map<string, HeroCostConfig> {
        return this.heroConfigs;
    }

    /**
     * 获取费用分布统计
     */
    public static getCostDistribution(): { [cost: number]: number } {
        const distribution: { [cost: number]: number } = {};
        for (let cost = 1; cost <= 5; cost++) {
            distribution[cost] = this.getHeroesByCost(cost).length;
        }
        return distribution;
    }

    /**
     * 获取关卡配置
     */
    public static getStageConfig(stageId: number): StageNodeConfig | null {
        return this.stageConfigs.get(stageId) || null;
    }

    /**
     * 获取所有关卡配置
     */
    public static getAllStageConfigs(): Map<number, StageNodeConfig> {
        return this.stageConfigs;
    }

    /**
     * 根据节点类型和关卡ID获取掉落概率
     */
    public static getDropRates(stageId: number, isElite: boolean): CardDropRates | null {
        const config = this.getStageConfig(stageId);
        if (!config) {
            return null;
        }

        return isElite ? config.eliteNodeDropRates : config.normalNodeDropRates;
    }

    /**
     * 根据概率随机获取费用卡
     */
    public static rollCardCost(stageId: number, isElite: boolean): number {
        const dropRates = this.getDropRates(stageId, isElite);
        if (!dropRates) {
            return 1; // 默认返回1费卡
        }

        const random = RandomFloat(0, 100);
        let cumulative = 0;

        // 1费卡
        cumulative += dropRates.cost1;
        if (random <= cumulative) return 1;

        // 2费卡
        cumulative += dropRates.cost2;
        if (random <= cumulative) return 2;

        // 3费卡
        cumulative += dropRates.cost3;
        if (random <= cumulative) return 3;

        // 4费卡
        cumulative += dropRates.cost4;
        if (random <= cumulative) return 4;

        // 5费卡
        return 5;
    }

    /**
     * 验证掉落概率配置（总和应为100）
     */
    public static validateDropRates(rates: CardDropRates): boolean {
        const total = rates.cost1 + rates.cost2 + rates.cost3 + rates.cost4 + rates.cost5;
        return Math.abs(total - 100) < 0.01; // 允许浮点数误差
    }

    /**
     * 根据关卡配置随机获取怪物数量
     */
    public static rollMonsterCount(stageId: number): { normalCount: number; specialCount?: number; specialType?: string } {
        const config = this.getStageConfig(stageId);
        if (!config || !config.monsterCountConfig) {
            return { normalCount: 1 }; // 默认返回1个
        }

        const monsterConfig = config.monsterCountConfig;
        const options = monsterConfig.options;

        if (options.length === 0) {
            return { normalCount: 1 };
        }

        // 如果只有一个选项且概率为100%，直接返回
        if (options.length === 1 && options[0].probability === 100) {
            return {
                normalCount: options[0].count,
                specialCount: monsterConfig.specialCount,
                specialType: monsterConfig.specialType
            };
        }

        // 根据概率随机选择
        const random = RandomFloat(0, 100);
        let cumulative = 0;

        for (const option of options) {
            cumulative += option.probability;
            if (random <= cumulative) {
                return {
                    normalCount: option.count,
                    specialCount: monsterConfig.specialCount,
                    specialType: monsterConfig.specialType
                };
            }
        }

        // 如果所有概率都不匹配，返回最后一个选项
        const lastOption = options[options.length - 1];
        return {
            normalCount: lastOption.count,
            specialCount: monsterConfig.specialCount,
            specialType: monsterConfig.specialType
        };
    }

    /**
     * 获取关卡的怪物数量配置
     */
    public static getMonsterCountConfig(stageId: number): MonsterCountConfig | null {
        const config = this.getStageConfig(stageId);
        return config ? config.monsterCountConfig : null;
    }

    /**
     * 获取关卡的怪物总数（普通怪物 + 特殊怪物）
     */
    public static getTotalMonsterCount(stageId: number): number {
        const result = this.rollMonsterCount(stageId);
        return result.normalCount + (result.specialCount || 0);
    }
}

