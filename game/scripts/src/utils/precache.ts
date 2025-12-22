/** @noSelfInFile */
// 导出的预载入方法，用来给addon_game_mode.ts调用
export default function Precache(context: CScriptPrecacheContext) {
    // 需要预载的所有资源
    precacheResource(
        [
            // 粒子系统资源
            'particles/units/heroes/hero_razor/razor_base_attack.vpcf',
            'particles/heroes/razor/razor_base_attack.vpcf',
            'particles/heroes/enchantress/enchantress_base_attack.vpcf',
            'particles/heroes/oracle/oracle_base_attack.vpcf',
            'particles/heroes/ember_spirit/huskar_inner_fire.vpcf',
            'particles/heroes/oracle/oracle_fatesedict.vpcf',
            'particles/heroes/enchantress/enchantress_natures_attendants_count8.vpcf',
            'particles/heroes/crystal_maiden/maiden_base_attack.vpcf',  // 水晶室女基础攻击
            
            // 声音事件资源
            'soundevents/game_sounds_heroes/game_sounds_razor.vsndevts',
            'soundevents/game_sounds_heroes/game_sounds_enchantress.vsndevts',
            'soundevents/game_sounds_heroes/game_sounds_oracle.vsndevts',
            'soundevents/game_sounds_heroes/game_sounds_ember_spirit.vsndevts',
            
            // 材质资源
            'materials/vgui/hud/heroportraits/portraitbackground_oracle.vmat',
        ],
        context
    );
    // 需要预载入的kv文件，会自动解析KV文件中的所有vpcf资源等等
    precacheEveryResourceInKV(
        [
            // kv文件路径
            // 'npc_abilities_custom.txt',
        ],
        context
    );
    // 需要预载入的单位
    precacheUnits(
        [
            // ========== 自走棋模式使用的英雄 ==========
            
            // 一费英雄 (Cost 1)
            'npc_dota_hero_treant',          // 树精卫士
            'npc_dota_hero_windrunner',     // 风行者
            'npc_dota_hero_mars',           // 战争之矛
            'npc_dota_hero_razor',          // 雷泽
            'npc_dota_hero_lion',           // 恶魔巫师
            'npc_dota_hero_enchantress',    // 魅惑魔女
            
            // 二费英雄 (Cost 2)
            'npc_dota_hero_axe',            // 斧王
            'npc_dota_hero_ursa',          // 熊战士
            'npc_dota_hero_oracle',        // 神谕者
            'npc_dota_hero_drow_ranger',   // 卓尔游侠
            'npc_dota_hero_lina',          // 秀逗魔导师
            
            // 三费英雄 (Cost 3)
            'npc_dota_hero_ember_spirit',  // 灰烬之灵
            'npc_dota_hero_antimage',      // 敌法师
            'npc_dota_hero_terrorblade',   // 恐怖利刃
            'npc_dota_hero_viper',        // 冥界亚龙
            'npc_dota_hero_death_prophet', // 死亡先知
            
            // 四费英雄 (Cost 4)
            'npc_dota_hero_abyssal_underlord', // 孽主
            'npc_dota_hero_nevermore',     // 影魔
            'npc_dota_hero_crystal_maiden', // 水晶室女
            'npc_dota_hero_ogre_magi',    // 食人魔法师
            
            // 五费英雄 (Cost 5)
            'npc_dota_hero_enigma',       // 谜团
            'npc_dota_hero_dawnbreaker',  // 破晓晨星
            'npc_dota_hero_zuus',         // 宙斯
            
            // 玩家默认英雄
            'npc_dota_hero_gyrocopter',    // 矮人直升机（GameConfig中的默认英雄）
        ],
        context
    );
    // 需要预载入的物品
    precacheItems(
        [
            // 物品名称
            // 'item_***',
        ],
        context
    );
    print(`[Precache] Precache finished.`);
}

// 预载入KV文件中的所有资源
function precacheEveryResourceInKV(kvFileList: string[], context: CScriptPrecacheContext) {
    kvFileList.forEach(file => {
        const kvTable = LoadKeyValues(file);
        precacheEverythingFromTable(kvTable, context);
    });
}
// 预载入资源列表
function precacheResource(resourceList: string[], context: CScriptPrecacheContext) {
    resourceList.forEach(resource => {
        precacheResString(resource, context);
    });
}
function precacheResString(res: string, context: CScriptPrecacheContext) {
    if (res.endsWith('.vpcf')) {
        PrecacheResource('particle', res, context);
    } else if (res.endsWith('.vsndevts')) {
        PrecacheResource('soundfile', res, context);
    } else if (res.endsWith('.vmdl')) {
        PrecacheResource('model', res, context);
    }
}

// 预载入单位列表
function precacheUnits(unitNamesList: string[], context?: CScriptPrecacheContext) {
    if (context != null) {
        unitNamesList.forEach(unitName => {
            PrecacheUnitByNameSync(unitName, context);
        });
    } else {
        unitNamesList.forEach(unitName => {
            PrecacheUnitByNameAsync(unitName, () => {});
        });
    }
}
// 预载入物品列表
function precacheItems(itemList: string[], context: CScriptPrecacheContext) {
    itemList.forEach(itemName => {
        PrecacheItemByNameSync(itemName, context);
    });
}

// 一个辅助的，从KV表中解析出所有资源并预载入的方法
function precacheEverythingFromTable(kvTable: any, context: CScriptPrecacheContext) {
    for (const [k, v] of pairs(kvTable)) {
        if (type(v) === 'table') {
            precacheEverythingFromTable(v, context);
        } else if (type(v) === 'string') {
            precacheResString(v, context);
        }
    }
}
