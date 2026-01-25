/**
 * 海克斯强化配置系统
 * 管理所有可用的Rogue技能强化
 */

export interface HextechAugment {
    id: string;               // 技能ID，如 'vampiric_vitality'
    displayName: string;      // 显示名称
    description: string;      // 技能描述
    icon: string;            // 图标路径
    rarity: 'common' | 'rare' | 'epic';  // 稀有度
    category: 'combat' | 'magic' | 'utility';  // 类别
}

export class HextechAugmentConfig {
    private static augments: Map<string, HextechAugment> = new Map();
    private static initialized = false;

    /**
     * 初始化强化池
     */
    public static initialize(): void {
        if (this.initialized) {
            return;
        }

        print('[HextechAugmentConfig] Initializing hextech augment pool...');

        // 从 npc_abilities_custom.txt 第733-973行提取的12个Rogue技能
        const augments: HextechAugment[] = [
            {
                id: 'vampiric_vitality',
                displayName: '吸血活力',
                description: '攻击时获得10%生命偷取',
                icon: 'file://{images}/spellicons/bloodseeker_blood_bath.png',
                rarity: 'common',
                category: 'combat'
            },
            {
                id: 'staff_will',
                displayName: '意志之杖',
                description: '+10攻速，20%暴击率，1.5倍暴击伤害',
                icon: 'file://{images}/spellicons/abaddon_death_coil.png',
                rarity: 'rare',
                category: 'combat'
            },
            {
                id: 'clockwork_accelerator',
                displayName: '发条加速器',
                description: '每5秒增加10点攻击速度',
                icon: 'file://{images}/spellicons/faceless_void_time_zone.png',
                rarity: 'rare',
                category: 'combat'
            },
            {
                id: 'ascension',
                displayName: '升华',
                description: '40秒后造成的伤害提升15%',
                icon: 'file://{images}/spellicons/brewmaster_storm_wind_walk.png',
                rarity: 'epic',
                category: 'combat'
            },
            {
                id: 'healing_orb',
                displayName: '治疗宝珠',
                description: '恢复400点生命值',
                icon: 'file://{images}/spellicons/frogmen_water_bubble_small.png',
                rarity: 'common',
                category: 'utility'
            },
            {
                id: 'blue_battery',
                displayName: '蓝色电池',
                description: '+5%法术伤害，+5点法力恢复',
                icon: 'file://{images}/spellicons/keeper_of_the_light_mana_leak.png',
                rarity: 'rare',
                category: 'magic'
            },
            {
                id: 'titans_power',
                displayName: '泰坦之力',
                description: '每100点生命值增加1.3点伤害',
                icon: 'file://{images}/spellicons/lone_druid_spirit_bear_demolish.png',
                rarity: 'epic',
                category: 'combat'
            },
            {
                id: 'overheal',
                displayName: '超量治疗',
                description: '每3次攻击造成50%额外伤害并恢复50%生命',
                icon: 'file://{images}/spellicons/lone_druid_spirit_bear_return.png',
                rarity: 'epic',
                category: 'combat'
            },
            {
                id: 'soul_link',
                displayName: '灵魂链接',
                description: '每5秒恢复5%生命值',
                icon: 'file://{images}/spellicons/skywrath_mage_arcane_bolt.png',
                rarity: 'common',
                category: 'utility'
            },
            {
                id: 'ludens_echo',
                displayName: '卢登的回声',
                description: '技能伤害翻倍',
                icon: 'file://{images}/spellicons/wisp_tether.png',
                rarity: 'epic',
                category: 'magic'
            },
            {
                id: 'double_cast',
                displayName: '双重施法',
                description: '15%几率施放技能两次',
                icon: 'file://{images}/spellicons/chaos_knight_reality_rift.png',
                rarity: 'epic',
                category: 'magic'
            },
            {
                id: 'living_bomb',
                displayName: '活体炸弹',
                description: '死亡时爆炸造成200点范围伤害',
                icon: 'file://{images}/spellicons/centaur_khan_endurance_aura.png',
                rarity: 'rare',
                category: 'combat'
            }
        ];

        // 添加到Map中
        for (const augment of augments) {
            this.augments.set(augment.id, augment);
        }

        this.initialized = true;
        print(`[HextechAugmentConfig] Initialized ${this.augments.size} hextech augments`);
    }

    /**
     * 获取随机N个强化（排除已选）
     * @param excludeIds 要排除的ID列表
     * @param count 需要的数量
     * @returns 随机选择的强化数组
     */
    public static getRandomAugments(excludeIds: string[], count: number): HextechAugment[] {
        const availableAugments: HextechAugment[] = [];
        
        // 过滤掉已选的强化
        for (const [id, augment] of this.augments) {
            if (!excludeIds.includes(id)) {
                availableAugments.push(augment);
            }
        }

        // 如果可用强化不足，返回所有可用的
        if (availableAugments.length <= count) {
            return availableAugments;
        }

        // 随机选择
        const selected: HextechAugment[] = [];
        const shuffled = [...availableAugments];
        
        // Fisher-Yates洗牌算法
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // 取前N个
        for (let i = 0; i < count && i < shuffled.length; i++) {
            selected.push(shuffled[i]);
        }

        return selected;
    }

    /**
     * 根据ID获取强化
     * @param id 强化ID
     * @returns 强化对象，如果不存在则返回null
     */
    public static getAugment(id: string): HextechAugment | null {
        return this.augments.get(id) || null;
    }

    /**
     * 获取所有强化
     * @returns 所有强化的数组
     */
    public static getAllAugments(): HextechAugment[] {
        return Array.from(this.augments.values());
    }

    /**
     * 根据稀有度获取强化
     * @param rarity 稀有度
     * @returns 该稀有度的所有强化
     */
    public static getAugmentsByRarity(rarity: 'common' | 'rare' | 'epic'): HextechAugment[] {
        const result: HextechAugment[] = [];
        for (const augment of this.augments.values()) {
            if (augment.rarity === rarity) {
                result.push(augment);
            }
        }
        return result;
    }

    /**
     * 根据类别获取强化
     * @param category 类别
     * @returns 该类别的所有强化
     */
    public static getAugmentsByCategory(category: 'combat' | 'magic' | 'utility'): HextechAugment[] {
        const result: HextechAugment[] = [];
        for (const augment of this.augments.values()) {
            if (augment.category === category) {
                result.push(augment);
            }
        }
        return result;
    }
}
