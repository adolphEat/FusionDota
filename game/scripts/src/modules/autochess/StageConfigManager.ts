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
 * 层级配置接口
 */
export interface LayerConfig {
    layerId: number;           // 层级ID (1-11)
    nodes: LayerNodeConfig[];  // 该层的所有节点选项
}

/**
 * 怪物强度配置
 */
export interface MonsterStrengthConfig {
    healthMultiplier: number;  // 生命值倍数 (例如: 0.45 表示基础值的45%)
    damageMultiplier: number;  // 攻击力倍数 (例如: 0.45 表示基础值的45%)
    armorBonus?: number;       // 护甲加成 (可选)
    baseValue: number;         // 基础强度值 (0.45 - 0.80)
}

/**
 * 层级节点配置接口
 */
export interface LayerNodeConfig {
    nodeId: string;            // 节点ID，格式: L{layer}_{index}，如 L1_1, L2_1
    layerId: number;           // 所属层级
    nodeIndex: number;         // 节点在该层的索引
    nodeType: NodeType;        // 节点类型
    isEventNode: boolean;      // 是否为事件节点
    healPercentage?: number;   // 事件节点回血百分比
    dropRates: CardDropRates;  // 掉落概率
    monsterCountConfig: MonsterCountConfig; // 怪物数量配置
    monsterStrength: MonsterStrengthConfig; // 怪物强度配置
}

/**
 * 关卡配置管理器
 */
export class StageConfigManager {
    // 层级配置（新）
    private static layerConfigs: Map<number, LayerConfig> = new Map();
    private static nodeConfigs: Map<string, LayerNodeConfig> = new Map();
    
    // 保留旧的关卡配置以保证兼容性
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
     * 初始化层级配置（新）
     */
    public static initializeLayerConfigs(): void {
        const emptyDropRates: CardDropRates = { cost1: 0, cost2: 0, cost3: 0, cost4: 0, cost5: 0 };
        const emptyMonsterConfig: MonsterCountConfig = { options: [{ count: 0, probability: 100 }] };
        const emptyStrength: MonsterStrengthConfig = { healthMultiplier: 1.0, damageMultiplier: 1.0, baseValue: 0.0 };

        // 第1层: 1个节点 - 基础强度 45%
        const layer1Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L1_1',
                layerId: 1,
                nodeIndex: 1,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
                monsterCountConfig: { options: [{ count: 1, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.45, damageMultiplier: 0.45, baseValue: 0.45 }
            }
        ];
        this.layerConfigs.set(1, { layerId: 1, nodes: layer1Nodes });
        layer1Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第2层: 3个节点 (精英战斗/普通战斗/普通战斗) - 基础强度 45%
        const layer2Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L2_1',
                layerId: 2,
                nodeIndex: 1,
                nodeType: NodeType.ELITE_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 70, cost2: 27, cost3: 3, cost4: 0, cost5: 0 },
                monsterCountConfig: { options: [{ count: 2, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.45, damageMultiplier: 0.45, baseValue: 0.45 }
            },
            {
                nodeId: 'L2_2',
                layerId: 2,
                nodeIndex: 2,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
                monsterCountConfig: { options: [{ count: 2, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.45, damageMultiplier: 0.45, baseValue: 0.45 }
            },
            {
                nodeId: 'L2_3',
                layerId: 2,
                nodeIndex: 3,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
                monsterCountConfig: { options: [{ count: 2, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.45, damageMultiplier: 0.45, baseValue: 0.45 }
            }
        ];
        this.layerConfigs.set(2, { layerId: 2, nodes: layer2Nodes });
        layer2Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第3层: 3个节点 (普通战斗/事件/事件) - 基础强度 50%
        const layer3Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L3_1',
                layerId: 3,
                nodeIndex: 1,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
                monsterCountConfig: {
                    options: [
                        { count: 3, probability: 40 },
                        { count: 2, probability: 60 }
                    ]
                },
                monsterStrength: { healthMultiplier: 0.50, damageMultiplier: 0.50, baseValue: 0.50 }
            },
            {
                nodeId: 'L3_2',
                layerId: 3,
                nodeIndex: 2,
                nodeType: NodeType.EVENT,
                isEventNode: true,
                healPercentage: 20,
                dropRates: emptyDropRates,
                monsterCountConfig: emptyMonsterConfig,
                monsterStrength: emptyStrength
            },
            {
                nodeId: 'L3_3',
                layerId: 3,
                nodeIndex: 3,
                nodeType: NodeType.EVENT,
                isEventNode: true,
                healPercentage: 20,
                dropRates: emptyDropRates,
                monsterCountConfig: emptyMonsterConfig,
                monsterStrength: emptyStrength
            }
        ];
        this.layerConfigs.set(3, { layerId: 3, nodes: layer3Nodes });
        layer3Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第4层: 3个节点 (事件/精英战斗/普通战斗) - 基础强度 50%
        const layer4Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L4_1',
                layerId: 4,
                nodeIndex: 1,
                nodeType: NodeType.EVENT,
                isEventNode: true,
                healPercentage: 20,
                dropRates: emptyDropRates,
                monsterCountConfig: emptyMonsterConfig,
                monsterStrength: emptyStrength
            },
            {
                nodeId: 'L4_2',
                layerId: 4,
                nodeIndex: 2,
                nodeType: NodeType.ELITE_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 50, cost2: 35, cost3: 10, cost4: 4, cost5: 1 },
                monsterCountConfig: {
                    options: [
                        { count: 4, probability: 50 },
                        { count: 3, probability: 50 }
                    ]
                },
                monsterStrength: { healthMultiplier: 0.50, damageMultiplier: 0.50, baseValue: 0.50 }
            },
            {
                nodeId: 'L4_3',
                layerId: 4,
                nodeIndex: 3,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 100, cost2: 0, cost3: 0, cost4: 0, cost5: 0 },
                monsterCountConfig: {
                    options: [
                        { count: 4, probability: 50 },
                        { count: 3, probability: 50 }
                    ]
                },
                monsterStrength: { healthMultiplier: 0.50, damageMultiplier: 0.50, baseValue: 0.50 }
            }
        ];
        this.layerConfigs.set(4, { layerId: 4, nodes: layer4Nodes });
        layer4Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第5层: 3个节点 (精英战斗/事件/精英战斗) - 基础强度 55%
        const layer5Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L5_1',
                layerId: 5,
                nodeIndex: 1,
                nodeType: NodeType.ELITE_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 50, cost2: 35, cost3: 10, cost4: 4, cost5: 1 },
                monsterCountConfig: {
                    options: [
                        { count: 4, probability: 50 },
                        { count: 3, probability: 50 }
                    ]
                },
                monsterStrength: { healthMultiplier: 0.55, damageMultiplier: 0.55, baseValue: 0.55 }
            },
            {
                nodeId: 'L5_2',
                layerId: 5,
                nodeIndex: 2,
                nodeType: NodeType.EVENT,
                isEventNode: true,
                healPercentage: 20,
                dropRates: emptyDropRates,
                monsterCountConfig: emptyMonsterConfig,
                monsterStrength: emptyStrength
            },
            {
                nodeId: 'L5_3',
                layerId: 5,
                nodeIndex: 3,
                nodeType: NodeType.ELITE_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 50, cost2: 35, cost3: 10, cost4: 4, cost5: 1 },
                monsterCountConfig: {
                    options: [
                        { count: 4, probability: 50 },
                        { count: 3, probability: 50 }
                    ]
                },
                monsterStrength: { healthMultiplier: 0.55, damageMultiplier: 0.55, baseValue: 0.55 }
            }
        ];
        this.layerConfigs.set(5, { layerId: 5, nodes: layer5Nodes });
        layer5Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第6层: 3个节点 (普通战斗/普通战斗/事件) - 基础强度 55%
        const layer6Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L6_1',
                layerId: 6,
                nodeIndex: 1,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 60, cost2: 35, cost3: 5, cost4: 0, cost5: 0 },
                monsterCountConfig: { options: [{ count: 5, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.55, damageMultiplier: 0.55, baseValue: 0.55 }
            },
            {
                nodeId: 'L6_2',
                layerId: 6,
                nodeIndex: 2,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 60, cost2: 35, cost3: 5, cost4: 0, cost5: 0 },
                monsterCountConfig: { options: [{ count: 5, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.55, damageMultiplier: 0.55, baseValue: 0.55 }
            },
            {
                nodeId: 'L6_3',
                layerId: 6,
                nodeIndex: 3,
                nodeType: NodeType.EVENT,
                isEventNode: true,
                healPercentage: 20,
                dropRates: emptyDropRates,
                monsterCountConfig: emptyMonsterConfig,
                monsterStrength: emptyStrength
            }
        ];
        this.layerConfigs.set(6, { layerId: 6, nodes: layer6Nodes });
        layer6Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第7层: 1个节点 (普通战斗) - 基础强度 60%
        const layer7Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L7_1',
                layerId: 7,
                nodeIndex: 1,
                nodeType: NodeType.NORMAL_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 50, cost2: 35, cost3: 10, cost4: 4, cost5: 1 },
                monsterCountConfig: { options: [{ count: 6, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.60, damageMultiplier: 0.60, baseValue: 0.60 }
            }
        ];
        this.layerConfigs.set(7, { layerId: 7, nodes: layer7Nodes });
        layer7Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第8层: 1个节点 (精英战斗) - 基础强度 65%
        const layer8Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L8_1',
                layerId: 8,
                nodeIndex: 1,
                nodeType: NodeType.ELITE_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 25, cost2: 30, cost3: 30, cost4: 12, cost5: 3 },
                monsterCountConfig: { options: [{ count: 7, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.65, damageMultiplier: 0.65, baseValue: 0.65 }
            }
        ];
        this.layerConfigs.set(8, { layerId: 8, nodes: layer8Nodes });
        layer8Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第9层: 1个节点 (事件/撤离 - 不回血) - 基础强度 70%
        const layer9Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L9_1',
                layerId: 9,
                nodeIndex: 1,
                nodeType: NodeType.EVENT_EVACUATE,
                isEventNode: true,
                healPercentage: 0, // 特殊事件，不回血
                dropRates: emptyDropRates,
                monsterCountConfig: emptyMonsterConfig,
                monsterStrength: emptyStrength
            }
        ];
        this.layerConfigs.set(9, { layerId: 9, nodes: layer9Nodes });
        layer9Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第10层: 1个节点 (精英战斗) - 基础强度 75%
        const layer10Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L10_1',
                layerId: 10,
                nodeIndex: 1,
                nodeType: NodeType.ELITE_BATTLE,
                isEventNode: false,
                dropRates: { cost1: 20, cost2: 25, cost3: 30, cost4: 20, cost5: 5 },
                monsterCountConfig: { options: [{ count: 8, probability: 100 }] },
                monsterStrength: { healthMultiplier: 0.75, damageMultiplier: 0.75, baseValue: 0.75 }
            }
        ];
        this.layerConfigs.set(10, { layerId: 10, nodes: layer10Nodes });
        layer10Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        // 第11层: 1个节点 (Boss) - 基础强度 80%
        const layer11Nodes: LayerNodeConfig[] = [
            {
                nodeId: 'L11_1',
                layerId: 11,
                nodeIndex: 1,
                nodeType: NodeType.BOSS,
                isEventNode: false,
                dropRates: { cost1: 15, cost2: 20, cost3: 25, cost4: 30, cost5: 10 },
                monsterCountConfig: {
                    options: [{ count: 7, probability: 100 }],
                    specialCount: 1,
                    specialType: 'boss'
                },
                monsterStrength: { healthMultiplier: 0.80, damageMultiplier: 0.80, baseValue: 0.80 }
            }
        ];
        this.layerConfigs.set(11, { layerId: 11, nodes: layer11Nodes });
        layer11Nodes.forEach(node => this.nodeConfigs.set(node.nodeId, node));

        print(`[StageConfigManager] Initialized ${this.layerConfigs.size} layers with ${this.nodeConfigs.size} nodes`);
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
        this.initializeLayerConfigs();
        this.initializeStageConfigs();
    }

    /**
     * 获取层级配置
     */
    public static getLayerConfig(layerId: number): LayerConfig | null {
        return this.layerConfigs.get(layerId) || null;
    }

    /**
     * 获取节点配置（主要使用）
     */
    public static getNodeConfig(nodeId: string): LayerNodeConfig | null {
        return this.nodeConfigs.get(nodeId) || null;
    }

    /**
     * 获取层级的所有节点
     */
    public static getLayerNodes(layerId: number): LayerNodeConfig[] {
        const layerConfig = this.getLayerConfig(layerId);
        return layerConfig ? layerConfig.nodes : [];
    }

    /**
     * 检查节点是否为事件节点
     */
    public static isEventNode(nodeId: string): boolean {
        const nodeConfig = this.getNodeConfig(nodeId);
        return nodeConfig ? nodeConfig.isEventNode : false;
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
     * 根据关卡和节点类型随机获取一个英雄ID（兼容性方法）
     */
    public static rollHeroByStage(stageIdOrNodeId: number | string, isElite: boolean): string | null {
        const cost = this.rollCardCost(stageIdOrNodeId, isElite);
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
     * 获取关卡配置（兼容性方法）
     * 支持旧的stageId(number)和新的nodeId(string)格式
     */
    public static getStageConfig(stageIdOrNodeId: number | string): StageNodeConfig | null {
        // 如果是string，尝试从新的nodeConfigs中获取
        if (typeof stageIdOrNodeId === 'string') {
            const nodeConfig = this.getNodeConfig(stageIdOrNodeId);
            if (nodeConfig) {
                // 转换为StageNodeConfig格式
                return {
                    stageId: nodeConfig.layerId,
                    nodeLevel: nodeConfig.layerId,
                    primaryNodeType: nodeConfig.nodeType,
                    secondaryNodeType: nodeConfig.nodeType,
                    normalNodeDropRates: nodeConfig.dropRates,
                    eliteNodeDropRates: nodeConfig.dropRates,
                    averageDropRates: nodeConfig.dropRates,
                    monsterCountConfig: nodeConfig.monsterCountConfig
                };
            }
            return null;
        }
        
        // 如果是number，尝试转换为nodeId格式
        const nodeId = `L${stageIdOrNodeId}_1`;
        const nodeConfig = this.getNodeConfig(nodeId);
        if (nodeConfig) {
            return {
                stageId: nodeConfig.layerId,
                nodeLevel: nodeConfig.layerId,
                primaryNodeType: nodeConfig.nodeType,
                secondaryNodeType: nodeConfig.nodeType,
                normalNodeDropRates: nodeConfig.dropRates,
                eliteNodeDropRates: nodeConfig.dropRates,
                averageDropRates: nodeConfig.dropRates,
                monsterCountConfig: nodeConfig.monsterCountConfig
            };
        }
        
        // 后备：从旧的stageConfigs中获取
        return this.stageConfigs.get(stageIdOrNodeId) || null;
    }

    /**
     * 获取所有关卡配置
     */
    public static getAllStageConfigs(): Map<number, StageNodeConfig> {
        return this.stageConfigs;
    }

    /**
     * 根据节点类型和关卡ID获取掉落概率（兼容性方法）
     */
    public static getDropRates(stageIdOrNodeId: number | string, isElite: boolean): CardDropRates | null {
        // 如果是string，直接从nodeConfig获取
        if (typeof stageIdOrNodeId === 'string') {
            const nodeConfig = this.getNodeConfig(stageIdOrNodeId);
            return nodeConfig ? nodeConfig.dropRates : null;
        }
        
        // 如果是number，尝试转换为nodeId
        const nodeId = `L${stageIdOrNodeId}_1`;
        const nodeConfig = this.getNodeConfig(nodeId);
        if (nodeConfig) {
            return nodeConfig.dropRates;
        }
        
        // 后备：使用旧逻辑
        const config = this.stageConfigs.get(stageIdOrNodeId);
        if (!config) {
            return null;
        }
        return isElite ? config.eliteNodeDropRates : config.normalNodeDropRates;
    }

    /**
     * 根据概率随机获取费用卡（兼容性方法）
     */
    public static rollCardCost(stageIdOrNodeId: number | string, isElite: boolean): number {
        const dropRates = this.getDropRates(stageIdOrNodeId, isElite);
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
     * 根据关卡配置随机获取怪物数量（兼容性方法）
     */
    public static rollMonsterCount(stageIdOrNodeId: number | string): { normalCount: number; specialCount?: number; specialType?: string } {
        const config = this.getStageConfig(stageIdOrNodeId);
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
     * 获取关卡的怪物数量配置（兼容性方法）
     */
    public static getMonsterCountConfig(stageIdOrNodeId: number | string): MonsterCountConfig | null {
        const config = this.getStageConfig(stageIdOrNodeId);
        return config ? config.monsterCountConfig : null;
    }

    /**
     * 获取关卡的怪物总数（普通怪物 + 特殊怪物）（兼容性方法）
     */
    public static getTotalMonsterCount(stageIdOrNodeId: number | string): number {
        const result = this.rollMonsterCount(stageIdOrNodeId);
        return result.normalCount + (result.specialCount || 0);
    }

    /**
     * 获取节点的怪物强度配置（兼容性方法）
     * @param stageIdOrNodeId 节点ID（如 "L1_1"）或关卡ID（数字）
     * @returns 怪物强度配置，如果节点不存在则返回默认配置
     */
    public static getMonsterStrength(stageIdOrNodeId: string | number): MonsterStrengthConfig {
        // 如果是数字，转换为节点ID格式
        let nodeId: string;
        if (typeof stageIdOrNodeId === 'number') {
            nodeId = `L${stageIdOrNodeId}_1`;
            print(`[StageConfigManager] Converting stage ID ${stageIdOrNodeId} to node ID: ${nodeId}`);
        } else {
            nodeId = stageIdOrNodeId;
        }

        const nodeConfig = this.getNodeConfig(nodeId);
        if (nodeConfig && nodeConfig.monsterStrength) {
            print(`[StageConfigManager] ✅ Found monster strength for ${nodeId}: HP=${nodeConfig.monsterStrength.healthMultiplier}, DMG=${nodeConfig.monsterStrength.damageMultiplier}`);
            return nodeConfig.monsterStrength;
        }
        
        // 如果是数字类型，尝试从旧的 stageConfigs 中获取
        if (typeof stageIdOrNodeId === 'number') {
            const stageConfig = this.stageConfigs.get(stageIdOrNodeId);
            if (stageConfig) {
                print(`[StageConfigManager] ⚠️ Using fallback: stage ${stageIdOrNodeId} found in old configs, returning default strength`);
            }
        }
        
        // 返回默认配置（100%基础强度）
        print(`[StageConfigManager] ⚠️ Node ${nodeId} not found, returning default strength (100%)`);
        return { healthMultiplier: 1.0, damageMultiplier: 1.0, baseValue: 1.0 };
    }

    /**
     * 获取层级的平均怪物强度配置
     * @param layerId 层级ID（1-11）
     * @returns 该层所有战斗节点的平均强度配置
     */
    public static getLayerAverageStrength(layerId: number): MonsterStrengthConfig {
        const layerNodes = this.getLayerNodes(layerId);
        const battleNodes = layerNodes.filter(node => !node.isEventNode);
        
        if (battleNodes.length === 0) {
            return { healthMultiplier: 1.0, damageMultiplier: 1.0, baseValue: 1.0 };
        }

        let totalHealth = 0;
        let totalDamage = 0;
        let totalBase = 0;

        for (const node of battleNodes) {
            totalHealth += node.monsterStrength.healthMultiplier;
            totalDamage += node.monsterStrength.damageMultiplier;
            totalBase += node.monsterStrength.baseValue;
        }

        const count = battleNodes.length;
        return {
            healthMultiplier: totalHealth / count,
            damageMultiplier: totalDamage / count,
            baseValue: totalBase / count
        };
    }

    /**
     * 应用怪物强度倍数到单位属性
     * @param unit 要应用的单位
     * @param baseHealth 基础生命值
     * @param baseDamage 基础攻击力
     * @param strength 强度配置
     */
    public static applyMonsterStrength(
        unit: CDOTA_BaseNPC, 
        baseHealth: number, 
        baseDamage: number, 
        strength: MonsterStrengthConfig
    ): void {
        const finalHealth = Math.floor(baseHealth * strength.healthMultiplier);
        const finalDamage = Math.floor(baseDamage * strength.damageMultiplier);

        unit.SetMaxHealth(finalHealth);
        unit.SetHealth(finalHealth);
        unit.SetBaseDamageMin(finalDamage);
        unit.SetBaseDamageMax(finalDamage);

        if (strength.armorBonus) {
            const currentArmor = unit.GetPhysicalArmorBaseValue();
            unit.SetPhysicalArmorBaseValue(currentArmor + strength.armorBonus);
        }

        print(`[StageConfigManager] Applied strength: HP ${baseHealth} → ${finalHealth} (${(strength.healthMultiplier * 100).toFixed(0)}%), DMG ${baseDamage} → ${finalDamage} (${(strength.damageMultiplier * 100).toFixed(0)}%)`);
    }
}

