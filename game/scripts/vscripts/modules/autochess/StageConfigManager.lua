local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 11,["13"] = 12,["14"] = 13,["15"] = 14,["16"] = 15,["17"] = 16,["19"] = 80,["20"] = 80,["21"] = 80,["23"] = 80,["24"] = 91,["25"] = 93,["26"] = 93,["27"] = 93,["28"] = 93,["29"] = 93,["30"] = 93,["31"] = 93,["32"] = 93,["33"] = 103,["34"] = 103,["35"] = 103,["36"] = 103,["37"] = 103,["38"] = 103,["39"] = 103,["40"] = 112,["41"] = 112,["42"] = 112,["43"] = 112,["44"] = 112,["45"] = 112,["46"] = 112,["47"] = 121,["48"] = 129,["49"] = 136,["52"] = 136,["56"] = 136,["60"] = 136,["64"] = 136,["66"] = 136,["67"] = 138,["68"] = 139,["69"] = 140,["70"] = 143,["71"] = 144,["73"] = 146,["74"] = 146,["76"] = 149,["77"] = 150,["78"] = 91,["79"] = 156,["80"] = 158,["81"] = 158,["82"] = 158,["83"] = 158,["84"] = 158,["85"] = 163,["86"] = 163,["87"] = 163,["88"] = 163,["89"] = 163,["90"] = 163,["91"] = 158,["92"] = 164,["93"] = 164,["94"] = 164,["95"] = 164,["96"] = 164,["97"] = 164,["98"] = 158,["99"] = 165,["100"] = 165,["101"] = 165,["102"] = 165,["103"] = 165,["104"] = 165,["105"] = 158,["106"] = 158,["107"] = 158,["108"] = 172,["109"] = 172,["110"] = 172,["111"] = 172,["112"] = 172,["113"] = 177,["114"] = 177,["115"] = 177,["116"] = 177,["117"] = 177,["118"] = 177,["119"] = 172,["120"] = 178,["121"] = 178,["122"] = 178,["123"] = 178,["124"] = 178,["125"] = 178,["126"] = 172,["127"] = 179,["128"] = 179,["129"] = 179,["130"] = 179,["131"] = 179,["132"] = 179,["133"] = 172,["134"] = 172,["135"] = 172,["136"] = 186,["137"] = 186,["138"] = 186,["139"] = 186,["140"] = 186,["141"] = 191,["142"] = 191,["143"] = 191,["144"] = 191,["145"] = 191,["146"] = 191,["147"] = 186,["148"] = 192,["149"] = 192,["150"] = 192,["151"] = 192,["152"] = 192,["153"] = 192,["154"] = 186,["155"] = 193,["156"] = 193,["157"] = 193,["158"] = 193,["159"] = 193,["160"] = 193,["161"] = 186,["162"] = 186,["163"] = 186,["164"] = 203,["165"] = 203,["166"] = 203,["167"] = 203,["168"] = 203,["169"] = 208,["170"] = 208,["171"] = 208,["172"] = 208,["173"] = 208,["174"] = 208,["175"] = 203,["176"] = 209,["177"] = 209,["178"] = 209,["179"] = 209,["180"] = 209,["181"] = 209,["182"] = 203,["183"] = 210,["184"] = 210,["185"] = 210,["186"] = 210,["187"] = 210,["188"] = 210,["189"] = 203,["190"] = 203,["191"] = 203,["192"] = 220,["193"] = 220,["194"] = 220,["195"] = 220,["196"] = 220,["197"] = 225,["198"] = 225,["199"] = 225,["200"] = 225,["201"] = 225,["202"] = 225,["203"] = 220,["204"] = 226,["205"] = 226,["206"] = 226,["207"] = 226,["208"] = 226,["209"] = 226,["210"] = 220,["211"] = 227,["212"] = 227,["213"] = 227,["214"] = 227,["215"] = 227,["216"] = 227,["217"] = 220,["218"] = 220,["219"] = 220,["220"] = 237,["221"] = 237,["222"] = 237,["223"] = 237,["224"] = 237,["225"] = 242,["226"] = 242,["227"] = 242,["228"] = 242,["229"] = 242,["230"] = 242,["231"] = 237,["232"] = 243,["233"] = 243,["234"] = 243,["235"] = 243,["236"] = 243,["237"] = 243,["238"] = 237,["239"] = 244,["240"] = 244,["241"] = 244,["242"] = 244,["243"] = 244,["244"] = 244,["245"] = 237,["246"] = 237,["247"] = 237,["248"] = 251,["249"] = 251,["250"] = 251,["251"] = 251,["252"] = 251,["253"] = 256,["254"] = 256,["255"] = 256,["256"] = 256,["257"] = 256,["258"] = 256,["259"] = 251,["260"] = 257,["261"] = 257,["262"] = 257,["263"] = 257,["264"] = 257,["265"] = 257,["266"] = 251,["267"] = 258,["268"] = 258,["269"] = 258,["270"] = 258,["271"] = 258,["272"] = 258,["273"] = 251,["274"] = 251,["275"] = 251,["276"] = 265,["277"] = 265,["278"] = 265,["279"] = 265,["280"] = 265,["281"] = 270,["282"] = 270,["283"] = 270,["284"] = 270,["285"] = 270,["286"] = 270,["287"] = 265,["288"] = 271,["289"] = 271,["290"] = 271,["291"] = 271,["292"] = 271,["293"] = 271,["294"] = 265,["295"] = 272,["296"] = 272,["297"] = 272,["298"] = 272,["299"] = 272,["300"] = 272,["301"] = 265,["302"] = 265,["303"] = 265,["304"] = 279,["305"] = 279,["306"] = 279,["307"] = 279,["308"] = 279,["309"] = 284,["310"] = 284,["311"] = 284,["312"] = 284,["313"] = 284,["314"] = 284,["315"] = 279,["316"] = 285,["317"] = 285,["318"] = 285,["319"] = 285,["320"] = 285,["321"] = 285,["322"] = 279,["323"] = 286,["324"] = 286,["325"] = 286,["326"] = 286,["327"] = 286,["328"] = 286,["329"] = 279,["330"] = 279,["331"] = 279,["332"] = 293,["333"] = 293,["334"] = 293,["335"] = 293,["336"] = 293,["337"] = 298,["338"] = 298,["339"] = 298,["340"] = 298,["341"] = 298,["342"] = 298,["343"] = 293,["344"] = 299,["345"] = 299,["346"] = 299,["347"] = 299,["348"] = 299,["349"] = 299,["350"] = 293,["351"] = 300,["352"] = 300,["353"] = 300,["354"] = 300,["355"] = 300,["356"] = 300,["357"] = 293,["358"] = 293,["359"] = 293,["360"] = 307,["361"] = 307,["362"] = 307,["363"] = 307,["364"] = 307,["365"] = 312,["366"] = 312,["367"] = 312,["368"] = 312,["369"] = 312,["370"] = 312,["371"] = 307,["372"] = 313,["373"] = 313,["374"] = 313,["375"] = 313,["376"] = 313,["377"] = 313,["378"] = 307,["379"] = 314,["380"] = 314,["381"] = 314,["382"] = 314,["383"] = 314,["384"] = 314,["385"] = 307,["386"] = 307,["387"] = 307,["388"] = 322,["389"] = 156,["390"] = 328,["391"] = 329,["392"] = 330,["393"] = 328,["394"] = 336,["395"] = 337,["396"] = 336,["397"] = 343,["398"] = 344,["399"] = 343,["400"] = 350,["401"] = 351,["402"] = 350,["403"] = 357,["404"] = 358,["405"] = 359,["406"] = 360,["408"] = 362,["409"] = 363,["410"] = 357,["411"] = 369,["412"] = 370,["413"] = 371,["414"] = 369,["415"] = 377,["416"] = 378,["417"] = 377,["418"] = 384,["419"] = 385,["421"] = 386,["422"] = 386,["423"] = 387,["424"] = 386,["427"] = 389,["428"] = 384,["429"] = 395,["430"] = 396,["431"] = 395,["432"] = 402,["433"] = 403,["434"] = 402,["435"] = 409,["436"] = 410,["437"] = 411,["438"] = 412,["440"] = 415,["441"] = 415,["442"] = 415,["444"] = 415,["446"] = 415,["447"] = 409,["448"] = 421,["449"] = 422,["450"] = 423,["451"] = 424,["453"] = 427,["454"] = 428,["455"] = 431,["456"] = 432,["457"] = 432,["459"] = 435,["460"] = 436,["461"] = 436,["463"] = 439,["464"] = 440,["465"] = 440,["467"] = 443,["468"] = 444,["469"] = 444,["471"] = 447,["472"] = 421,["473"] = 453,["474"] = 454,["475"] = 455,["476"] = 453,["477"] = 461,["478"] = 462,["479"] = 463,["480"] = 464,["482"] = 467,["483"] = 468,["484"] = 470,["485"] = 471,["487"] = 475,["488"] = 476,["490"] = 484,["491"] = 485,["492"] = 487,["493"] = 488,["494"] = 489,["495"] = 490,["498"] = 499,["499"] = 500,["500"] = 461,["501"] = 510,["502"] = 511,["503"] = 512,["504"] = 512,["505"] = 512,["507"] = 512,["509"] = 512,["510"] = 510,["511"] = 518,["512"] = 519,["513"] = 520,["514"] = 518,["515"] = 81,["516"] = 84,["517"] = 85,["518"] = 86});
local ____exports = {}
--- 节点类型枚举
____exports.NodeType = NodeType or ({})
____exports.NodeType.NORMAL_BATTLE = "normal_battle"
____exports.NodeType.ELITE_BATTLE = "elite_battle"
____exports.NodeType.EVENT = "event"
____exports.NodeType.EVENT_EVACUATE = "event_evacuate"
____exports.NodeType.BOSS = "boss"
--- 关卡配置管理器
____exports.StageConfigManager = __TS__Class()
local StageConfigManager = ____exports.StageConfigManager
StageConfigManager.name = "StageConfigManager"
function StageConfigManager.prototype.____constructor(self)
end
function StageConfigManager.initializeHeroCostConfigs(self)
    local cost1Heroes = {
        {heroId = "treant_protector1", displayName = "树精卫士", cost = 1},
        {heroId = "windrunner1", displayName = "风行者", cost = 1},
        {heroId = "mars1", displayName = "战争之矛", cost = 1},
        {heroId = "razor1", displayName = "雷泽", cost = 1},
        {heroId = "lion1", displayName = "恶魔巫师", cost = 1},
        {heroId = "enchantress1", displayName = "魅惑魔女", cost = 1}
    }
    local cost2Heroes = {
        {heroId = "axe1", displayName = "斧王", cost = 2},
        {heroId = "ursa1", displayName = "熊战士", cost = 2},
        {heroId = "oracle1", displayName = "神谕者", cost = 2},
        {heroId = "drow_ranger1", displayName = "卓尔游侠", cost = 2},
        {heroId = "lina1", displayName = "秀逗魔导师", cost = 2}
    }
    local cost3Heroes = {
        {heroId = "ember_spirit1", displayName = "灰烬之灵", cost = 3},
        {heroId = "anti_mage1", displayName = "敌法师", cost = 3},
        {heroId = "placeholder_hero1", displayName = "1111", cost = 3},
        {heroId = "viper1", displayName = "冥界亚龙", cost = 3},
        {heroId = "death_prophet1", displayName = "死亡先知", cost = 3}
    }
    local cost4Heroes = {{heroId = "underlord1", displayName = "孽主", cost = 4}, {heroId = "shadow_fiend1", displayName = "影魔", cost = 4}, {heroId = "crystal_maiden1", displayName = "水晶室女", cost = 4}, {heroId = "ogre_magi1", displayName = "食人魔法师", cost = 4}}
    local cost5Heroes = {{heroId = "enigma1", displayName = "谜团", cost = 5}, {heroId = "dawnbreaker1", displayName = "破晓晨星", cost = 5}, {heroId = "zeus1", displayName = "宙斯", cost = 5}}
    local ____array_0 = __TS__SparseArrayNew(unpack(cost1Heroes))
    __TS__SparseArrayPush(
        ____array_0,
        unpack(cost2Heroes)
    )
    __TS__SparseArrayPush(
        ____array_0,
        unpack(cost3Heroes)
    )
    __TS__SparseArrayPush(
        ____array_0,
        unpack(cost4Heroes)
    )
    __TS__SparseArrayPush(
        ____array_0,
        unpack(cost5Heroes)
    )
    local allHeroes = {__TS__SparseArraySpread(____array_0)}
    for ____, hero in ipairs(allHeroes) do
        self.heroCostMap:set(hero.heroId, hero.cost)
        self.heroConfigs:set(hero.heroId, hero)
        if not self.costHeroMap:has(hero.cost) then
            self.costHeroMap:set(hero.cost, {})
        end
        local ____temp_1 = self.costHeroMap:get(hero.cost)
        ____temp_1[#____temp_1 + 1] = hero.heroId
    end
    print(("[StageConfigManager] Initialized " .. tostring(#allHeroes)) .. " hero cost configurations")
    print((((((((("[StageConfigManager] Cost distribution: 1费=" .. tostring(#cost1Heroes)) .. ", 2费=") .. tostring(#cost2Heroes)) .. ", 3费=") .. tostring(#cost3Heroes)) .. ", 4费=") .. tostring(#cost4Heroes)) .. ", 5费=") .. tostring(#cost5Heroes))
end
function StageConfigManager.initializeStageConfigs(self)
    self.stageConfigs:set(1, {
        stageId = 1,
        nodeLevel = 1,
        primaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        secondaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        normalNodeDropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        eliteNodeDropRates = {
            cost1 = 70,
            cost2 = 27,
            cost3 = 3,
            cost4 = 0,
            cost5 = 0
        },
        averageDropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 1, probability = 100}}}
    })
    self.stageConfigs:set(2, {
        stageId = 2,
        nodeLevel = 2,
        primaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        secondaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        normalNodeDropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        eliteNodeDropRates = {
            cost1 = 70,
            cost2 = 27,
            cost3 = 3,
            cost4 = 0,
            cost5 = 0
        },
        averageDropRates = {
            cost1 = 70,
            cost2 = 30,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 2, probability = 100}}}
    })
    self.stageConfigs:set(3, {
        stageId = 3,
        nodeLevel = 3,
        primaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        secondaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        normalNodeDropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        eliteNodeDropRates = {
            cost1 = 60,
            cost2 = 35,
            cost3 = 5,
            cost4 = 0,
            cost5 = 0
        },
        averageDropRates = {
            cost1 = 60,
            cost2 = 35,
            cost3 = 5,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 3, probability = 40}, {count = 2, probability = 60}}}
    })
    self.stageConfigs:set(4, {
        stageId = 4,
        nodeLevel = 4,
        primaryNodeType = ____exports.NodeType.EVENT,
        secondaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        normalNodeDropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        eliteNodeDropRates = {
            cost1 = 50,
            cost2 = 35,
            cost3 = 10,
            cost4 = 4,
            cost5 = 1
        },
        averageDropRates = {
            cost1 = 45,
            cost2 = 29,
            cost3 = 16,
            cost4 = 1,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 4, probability = 50}, {count = 3, probability = 50}}}
    })
    self.stageConfigs:set(5, {
        stageId = 5,
        nodeLevel = 5,
        primaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        secondaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        normalNodeDropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        eliteNodeDropRates = {
            cost1 = 50,
            cost2 = 35,
            cost3 = 10,
            cost4 = 4,
            cost5 = 1
        },
        averageDropRates = {
            cost1 = 40,
            cost2 = 35,
            cost3 = 20,
            cost4 = 4,
            cost5 = 1
        },
        monsterCountConfig = {options = {{count = 4, probability = 50}, {count = 3, probability = 50}}}
    })
    self.stageConfigs:set(6, {
        stageId = 6,
        nodeLevel = 6,
        primaryNodeType = ____exports.NodeType.ELITE_BATTLE,
        secondaryNodeType = ____exports.NodeType.ELITE_BATTLE,
        normalNodeDropRates = {
            cost1 = 60,
            cost2 = 35,
            cost3 = 5,
            cost4 = 0,
            cost5 = 0
        },
        eliteNodeDropRates = {
            cost1 = 40,
            cost2 = 35,
            cost3 = 20,
            cost4 = 4,
            cost5 = 1
        },
        averageDropRates = {
            cost1 = 35,
            cost2 = 35,
            cost3 = 25,
            cost4 = 4,
            cost5 = 1
        },
        monsterCountConfig = {options = {{count = 5, probability = 100}}}
    })
    self.stageConfigs:set(7, {
        stageId = 7,
        nodeLevel = 7,
        primaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        secondaryNodeType = ____exports.NodeType.NORMAL_BATTLE,
        normalNodeDropRates = {
            cost1 = 50,
            cost2 = 35,
            cost3 = 10,
            cost4 = 4,
            cost5 = 1
        },
        eliteNodeDropRates = {
            cost1 = 30,
            cost2 = 35,
            cost3 = 25,
            cost4 = 8,
            cost5 = 2
        },
        averageDropRates = {
            cost1 = 30,
            cost2 = 35,
            cost3 = 25,
            cost4 = 8,
            cost5 = 2
        },
        monsterCountConfig = {options = {{count = 6, probability = 100}}}
    })
    self.stageConfigs:set(8, {
        stageId = 8,
        nodeLevel = 8,
        primaryNodeType = ____exports.NodeType.ELITE_BATTLE,
        secondaryNodeType = ____exports.NodeType.ELITE_BATTLE,
        normalNodeDropRates = {
            cost1 = 40,
            cost2 = 35,
            cost3 = 20,
            cost4 = 4,
            cost5 = 1
        },
        eliteNodeDropRates = {
            cost1 = 25,
            cost2 = 30,
            cost3 = 30,
            cost4 = 12,
            cost5 = 3
        },
        averageDropRates = {
            cost1 = 25,
            cost2 = 30,
            cost3 = 30,
            cost4 = 12,
            cost5 = 3
        },
        monsterCountConfig = {options = {{count = 7, probability = 100}}}
    })
    self.stageConfigs:set(9, {
        stageId = 9,
        nodeLevel = 9,
        primaryNodeType = ____exports.NodeType.EVENT_EVACUATE,
        secondaryNodeType = ____exports.NodeType.EVENT_EVACUATE,
        normalNodeDropRates = {
            cost1 = 25,
            cost2 = 35,
            cost3 = 30,
            cost4 = 8,
            cost5 = 2
        },
        eliteNodeDropRates = {
            cost1 = 20,
            cost2 = 25,
            cost3 = 30,
            cost4 = 20,
            cost5 = 5
        },
        averageDropRates = {
            cost1 = 0,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 8, probability = 100}}}
    })
    self.stageConfigs:set(10, {
        stageId = 10,
        nodeLevel = 10,
        primaryNodeType = ____exports.NodeType.ELITE_BATTLE,
        secondaryNodeType = ____exports.NodeType.ELITE_BATTLE,
        normalNodeDropRates = {
            cost1 = 30,
            cost2 = 35,
            cost3 = 25,
            cost4 = 8,
            cost5 = 2
        },
        eliteNodeDropRates = {
            cost1 = 20,
            cost2 = 25,
            cost3 = 30,
            cost4 = 20,
            cost5 = 5
        },
        averageDropRates = {
            cost1 = 20,
            cost2 = 25,
            cost3 = 30,
            cost4 = 20,
            cost5 = 5
        },
        monsterCountConfig = {options = {{count = 8, probability = 100}}}
    })
    self.stageConfigs:set(11, {
        stageId = 11,
        nodeLevel = 11,
        primaryNodeType = ____exports.NodeType.BOSS,
        secondaryNodeType = ____exports.NodeType.BOSS,
        normalNodeDropRates = {
            cost1 = 20,
            cost2 = 25,
            cost3 = 30,
            cost4 = 20,
            cost5 = 5
        },
        eliteNodeDropRates = {
            cost1 = 15,
            cost2 = 20,
            cost3 = 25,
            cost4 = 30,
            cost5 = 10
        },
        averageDropRates = {
            cost1 = 15,
            cost2 = 20,
            cost3 = 25,
            cost4 = 30,
            cost5 = 10
        },
        monsterCountConfig = {options = {{count = 7, probability = 100}}, specialCount = 1, specialType = "boss"}
    })
    print(("[StageConfigManager] Initialized " .. tostring(self.stageConfigs.size)) .. " stage configurations")
end
function StageConfigManager.initialize(self)
    self:initializeHeroCostConfigs()
    self:initializeStageConfigs()
end
function StageConfigManager.getHeroCost(self, heroId)
    return self.heroCostMap:get(heroId) or nil
end
function StageConfigManager.getHeroesByCost(self, cost)
    return self.costHeroMap:get(cost) or ({})
end
function StageConfigManager.getHeroConfig(self, heroId)
    return self.heroConfigs:get(heroId) or nil
end
function StageConfigManager.getRandomHeroByCost(self, cost)
    local heroes = self:getHeroesByCost(cost)
    if #heroes == 0 then
        return nil
    end
    local randomIndex = math.floor(RandomFloat(0, #heroes))
    return heroes[randomIndex + 1]
end
function StageConfigManager.rollHeroByStage(self, stageId, isElite)
    local cost = self:rollCardCost(stageId, isElite)
    return self:getRandomHeroByCost(cost)
end
function StageConfigManager.getAllHeroConfigs(self)
    return self.heroConfigs
end
function StageConfigManager.getCostDistribution(self)
    local distribution = {}
    do
        local cost = 1
        while cost <= 5 do
            distribution[cost] = #self:getHeroesByCost(cost)
            cost = cost + 1
        end
    end
    return distribution
end
function StageConfigManager.getStageConfig(self, stageId)
    return self.stageConfigs:get(stageId) or nil
end
function StageConfigManager.getAllStageConfigs(self)
    return self.stageConfigs
end
function StageConfigManager.getDropRates(self, stageId, isElite)
    local config = self:getStageConfig(stageId)
    if not config then
        return nil
    end
    local ____isElite_2
    if isElite then
        ____isElite_2 = config.eliteNodeDropRates
    else
        ____isElite_2 = config.normalNodeDropRates
    end
    return ____isElite_2
end
function StageConfigManager.rollCardCost(self, stageId, isElite)
    local dropRates = self:getDropRates(stageId, isElite)
    if not dropRates then
        return 1
    end
    local random = RandomFloat(0, 100)
    local cumulative = 0
    cumulative = cumulative + dropRates.cost1
    if random <= cumulative then
        return 1
    end
    cumulative = cumulative + dropRates.cost2
    if random <= cumulative then
        return 2
    end
    cumulative = cumulative + dropRates.cost3
    if random <= cumulative then
        return 3
    end
    cumulative = cumulative + dropRates.cost4
    if random <= cumulative then
        return 4
    end
    return 5
end
function StageConfigManager.validateDropRates(self, rates)
    local total = rates.cost1 + rates.cost2 + rates.cost3 + rates.cost4 + rates.cost5
    return math.abs(total - 100) < 0.01
end
function StageConfigManager.rollMonsterCount(self, stageId)
    local config = self:getStageConfig(stageId)
    if not config or not config.monsterCountConfig then
        return {normalCount = 1}
    end
    local monsterConfig = config.monsterCountConfig
    local options = monsterConfig.options
    if #options == 0 then
        return {normalCount = 1}
    end
    if #options == 1 and options[1].probability == 100 then
        return {normalCount = options[1].count, specialCount = monsterConfig.specialCount, specialType = monsterConfig.specialType}
    end
    local random = RandomFloat(0, 100)
    local cumulative = 0
    for ____, option in ipairs(options) do
        cumulative = cumulative + option.probability
        if random <= cumulative then
            return {normalCount = option.count, specialCount = monsterConfig.specialCount, specialType = monsterConfig.specialType}
        end
    end
    local lastOption = options[#options]
    return {normalCount = lastOption.count, specialCount = monsterConfig.specialCount, specialType = monsterConfig.specialType}
end
function StageConfigManager.getMonsterCountConfig(self, stageId)
    local config = self:getStageConfig(stageId)
    local ____config_3
    if config then
        ____config_3 = config.monsterCountConfig
    else
        ____config_3 = nil
    end
    return ____config_3
end
function StageConfigManager.getTotalMonsterCount(self, stageId)
    local result = self:rollMonsterCount(stageId)
    return result.normalCount + (result.specialCount or 0)
end
StageConfigManager.stageConfigs = __TS__New(Map)
StageConfigManager.heroCostMap = __TS__New(Map)
StageConfigManager.costHeroMap = __TS__New(Map)
StageConfigManager.heroConfigs = __TS__New(Map)
return ____exports
