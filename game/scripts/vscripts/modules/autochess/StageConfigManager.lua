local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["15"] = 11,["16"] = 12,["17"] = 13,["18"] = 14,["19"] = 15,["20"] = 16,["22"] = 113,["23"] = 113,["24"] = 113,["26"] = 113,["27"] = 129,["28"] = 131,["29"] = 131,["30"] = 131,["31"] = 131,["32"] = 131,["33"] = 131,["34"] = 131,["35"] = 131,["36"] = 141,["37"] = 141,["38"] = 141,["39"] = 141,["40"] = 141,["41"] = 141,["42"] = 141,["43"] = 150,["44"] = 150,["45"] = 150,["46"] = 150,["47"] = 150,["48"] = 150,["49"] = 150,["50"] = 159,["51"] = 167,["52"] = 174,["55"] = 174,["59"] = 174,["63"] = 174,["67"] = 174,["69"] = 174,["70"] = 176,["71"] = 177,["72"] = 178,["73"] = 181,["74"] = 182,["76"] = 184,["77"] = 184,["79"] = 187,["80"] = 188,["81"] = 129,["82"] = 194,["83"] = 195,["84"] = 195,["85"] = 195,["86"] = 195,["87"] = 195,["88"] = 195,["89"] = 195,["90"] = 196,["91"] = 197,["92"] = 200,["93"] = 201,["94"] = 201,["95"] = 201,["96"] = 201,["97"] = 201,["98"] = 207,["99"] = 207,["100"] = 207,["101"] = 207,["102"] = 207,["103"] = 207,["104"] = 201,["105"] = 201,["106"] = 201,["107"] = 200,["108"] = 212,["109"] = 213,["110"] = 213,["111"] = 213,["112"] = 213,["113"] = 216,["114"] = 217,["115"] = 217,["116"] = 217,["117"] = 217,["118"] = 217,["119"] = 223,["120"] = 223,["121"] = 223,["122"] = 223,["123"] = 223,["124"] = 223,["125"] = 217,["126"] = 217,["127"] = 217,["128"] = 216,["129"] = 227,["130"] = 227,["131"] = 227,["132"] = 227,["133"] = 227,["134"] = 233,["135"] = 233,["136"] = 233,["137"] = 233,["138"] = 233,["139"] = 233,["140"] = 227,["141"] = 227,["142"] = 227,["143"] = 216,["144"] = 237,["145"] = 237,["146"] = 237,["147"] = 237,["148"] = 237,["149"] = 243,["150"] = 243,["151"] = 243,["152"] = 243,["153"] = 243,["154"] = 243,["155"] = 237,["156"] = 237,["157"] = 237,["158"] = 216,["159"] = 248,["160"] = 249,["161"] = 249,["162"] = 249,["163"] = 249,["164"] = 252,["165"] = 253,["166"] = 253,["167"] = 253,["168"] = 253,["169"] = 253,["170"] = 259,["171"] = 259,["172"] = 259,["173"] = 259,["174"] = 259,["175"] = 259,["176"] = 253,["177"] = 253,["178"] = 253,["179"] = 252,["180"] = 268,["181"] = 268,["182"] = 268,["183"] = 268,["184"] = 268,["185"] = 268,["186"] = 268,["187"] = 268,["188"] = 268,["189"] = 252,["190"] = 279,["191"] = 279,["192"] = 279,["193"] = 279,["194"] = 279,["195"] = 279,["196"] = 279,["197"] = 279,["198"] = 279,["199"] = 252,["200"] = 291,["201"] = 292,["202"] = 292,["203"] = 292,["204"] = 292,["205"] = 295,["206"] = 296,["207"] = 296,["208"] = 296,["209"] = 296,["210"] = 296,["211"] = 296,["212"] = 296,["213"] = 296,["214"] = 296,["215"] = 295,["216"] = 307,["217"] = 307,["218"] = 307,["219"] = 307,["220"] = 307,["221"] = 313,["222"] = 313,["223"] = 313,["224"] = 313,["225"] = 313,["226"] = 313,["227"] = 307,["228"] = 307,["229"] = 307,["230"] = 295,["231"] = 322,["232"] = 322,["233"] = 322,["234"] = 322,["235"] = 322,["236"] = 328,["237"] = 328,["238"] = 328,["239"] = 328,["240"] = 328,["241"] = 328,["242"] = 322,["243"] = 322,["244"] = 322,["245"] = 295,["246"] = 338,["247"] = 339,["248"] = 339,["249"] = 339,["250"] = 339,["251"] = 342,["252"] = 343,["253"] = 343,["254"] = 343,["255"] = 343,["256"] = 343,["257"] = 349,["258"] = 349,["259"] = 349,["260"] = 349,["261"] = 349,["262"] = 349,["263"] = 343,["264"] = 343,["265"] = 343,["266"] = 342,["267"] = 358,["268"] = 358,["269"] = 358,["270"] = 358,["271"] = 358,["272"] = 358,["273"] = 358,["274"] = 358,["275"] = 358,["276"] = 342,["277"] = 369,["278"] = 369,["279"] = 369,["280"] = 369,["281"] = 369,["282"] = 375,["283"] = 375,["284"] = 375,["285"] = 375,["286"] = 375,["287"] = 375,["288"] = 369,["289"] = 369,["290"] = 369,["291"] = 342,["292"] = 385,["293"] = 386,["294"] = 386,["295"] = 386,["296"] = 386,["297"] = 389,["298"] = 390,["299"] = 390,["300"] = 390,["301"] = 390,["302"] = 390,["303"] = 396,["304"] = 396,["305"] = 396,["306"] = 396,["307"] = 396,["308"] = 396,["309"] = 390,["310"] = 390,["311"] = 390,["312"] = 389,["313"] = 400,["314"] = 400,["315"] = 400,["316"] = 400,["317"] = 400,["318"] = 406,["319"] = 406,["320"] = 406,["321"] = 406,["322"] = 406,["323"] = 406,["324"] = 400,["325"] = 400,["326"] = 400,["327"] = 389,["328"] = 410,["329"] = 410,["330"] = 410,["331"] = 410,["332"] = 410,["333"] = 410,["334"] = 410,["335"] = 410,["336"] = 410,["337"] = 389,["338"] = 422,["339"] = 423,["340"] = 423,["341"] = 423,["342"] = 423,["343"] = 426,["344"] = 427,["345"] = 427,["346"] = 427,["347"] = 427,["348"] = 427,["349"] = 433,["350"] = 433,["351"] = 433,["352"] = 433,["353"] = 433,["354"] = 433,["355"] = 427,["356"] = 427,["357"] = 427,["358"] = 426,["359"] = 438,["360"] = 439,["361"] = 439,["362"] = 439,["363"] = 439,["364"] = 442,["365"] = 443,["366"] = 443,["367"] = 443,["368"] = 443,["369"] = 443,["370"] = 449,["371"] = 449,["372"] = 449,["373"] = 449,["374"] = 449,["375"] = 449,["376"] = 443,["377"] = 443,["378"] = 443,["379"] = 442,["380"] = 454,["381"] = 455,["382"] = 455,["383"] = 455,["384"] = 455,["385"] = 458,["386"] = 459,["387"] = 459,["388"] = 459,["389"] = 459,["390"] = 459,["391"] = 459,["392"] = 459,["393"] = 459,["394"] = 459,["395"] = 458,["396"] = 471,["397"] = 472,["398"] = 472,["399"] = 472,["400"] = 472,["401"] = 475,["402"] = 476,["403"] = 476,["404"] = 476,["405"] = 476,["406"] = 476,["407"] = 482,["408"] = 482,["409"] = 482,["410"] = 482,["411"] = 482,["412"] = 482,["413"] = 476,["414"] = 476,["415"] = 476,["416"] = 475,["417"] = 487,["418"] = 488,["419"] = 488,["420"] = 488,["421"] = 488,["422"] = 491,["423"] = 492,["424"] = 492,["425"] = 492,["426"] = 492,["427"] = 492,["428"] = 498,["429"] = 498,["430"] = 498,["431"] = 498,["432"] = 498,["433"] = 498,["434"] = 492,["435"] = 492,["436"] = 492,["437"] = 491,["438"] = 507,["439"] = 508,["440"] = 508,["441"] = 508,["442"] = 508,["443"] = 510,["444"] = 194,["445"] = 516,["446"] = 518,["447"] = 518,["448"] = 518,["449"] = 518,["450"] = 518,["451"] = 523,["452"] = 523,["453"] = 523,["454"] = 523,["455"] = 523,["456"] = 523,["457"] = 518,["458"] = 524,["459"] = 524,["460"] = 524,["461"] = 524,["462"] = 524,["463"] = 524,["464"] = 518,["465"] = 525,["466"] = 525,["467"] = 525,["468"] = 525,["469"] = 525,["470"] = 525,["471"] = 518,["472"] = 518,["473"] = 518,["474"] = 532,["475"] = 532,["476"] = 532,["477"] = 532,["478"] = 532,["479"] = 537,["480"] = 537,["481"] = 537,["482"] = 537,["483"] = 537,["484"] = 537,["485"] = 532,["486"] = 538,["487"] = 538,["488"] = 538,["489"] = 538,["490"] = 538,["491"] = 538,["492"] = 532,["493"] = 539,["494"] = 539,["495"] = 539,["496"] = 539,["497"] = 539,["498"] = 539,["499"] = 532,["500"] = 532,["501"] = 532,["502"] = 546,["503"] = 546,["504"] = 546,["505"] = 546,["506"] = 546,["507"] = 551,["508"] = 551,["509"] = 551,["510"] = 551,["511"] = 551,["512"] = 551,["513"] = 546,["514"] = 552,["515"] = 552,["516"] = 552,["517"] = 552,["518"] = 552,["519"] = 552,["520"] = 546,["521"] = 553,["522"] = 553,["523"] = 553,["524"] = 553,["525"] = 553,["526"] = 553,["527"] = 546,["528"] = 546,["529"] = 546,["530"] = 563,["531"] = 563,["532"] = 563,["533"] = 563,["534"] = 563,["535"] = 568,["536"] = 568,["537"] = 568,["538"] = 568,["539"] = 568,["540"] = 568,["541"] = 563,["542"] = 569,["543"] = 569,["544"] = 569,["545"] = 569,["546"] = 569,["547"] = 569,["548"] = 563,["549"] = 570,["550"] = 570,["551"] = 570,["552"] = 570,["553"] = 570,["554"] = 570,["555"] = 563,["556"] = 563,["557"] = 563,["558"] = 580,["559"] = 580,["560"] = 580,["561"] = 580,["562"] = 580,["563"] = 585,["564"] = 585,["565"] = 585,["566"] = 585,["567"] = 585,["568"] = 585,["569"] = 580,["570"] = 586,["571"] = 586,["572"] = 586,["573"] = 586,["574"] = 586,["575"] = 586,["576"] = 580,["577"] = 587,["578"] = 587,["579"] = 587,["580"] = 587,["581"] = 587,["582"] = 587,["583"] = 580,["584"] = 580,["585"] = 580,["586"] = 597,["587"] = 597,["588"] = 597,["589"] = 597,["590"] = 597,["591"] = 602,["592"] = 602,["593"] = 602,["594"] = 602,["595"] = 602,["596"] = 602,["597"] = 597,["598"] = 603,["599"] = 603,["600"] = 603,["601"] = 603,["602"] = 603,["603"] = 603,["604"] = 597,["605"] = 604,["606"] = 604,["607"] = 604,["608"] = 604,["609"] = 604,["610"] = 604,["611"] = 597,["612"] = 597,["613"] = 597,["614"] = 611,["615"] = 611,["616"] = 611,["617"] = 611,["618"] = 611,["619"] = 616,["620"] = 616,["621"] = 616,["622"] = 616,["623"] = 616,["624"] = 616,["625"] = 611,["626"] = 617,["627"] = 617,["628"] = 617,["629"] = 617,["630"] = 617,["631"] = 617,["632"] = 611,["633"] = 618,["634"] = 618,["635"] = 618,["636"] = 618,["637"] = 618,["638"] = 618,["639"] = 611,["640"] = 611,["641"] = 611,["642"] = 625,["643"] = 625,["644"] = 625,["645"] = 625,["646"] = 625,["647"] = 630,["648"] = 630,["649"] = 630,["650"] = 630,["651"] = 630,["652"] = 630,["653"] = 625,["654"] = 631,["655"] = 631,["656"] = 631,["657"] = 631,["658"] = 631,["659"] = 631,["660"] = 625,["661"] = 632,["662"] = 632,["663"] = 632,["664"] = 632,["665"] = 632,["666"] = 632,["667"] = 625,["668"] = 625,["669"] = 625,["670"] = 639,["671"] = 639,["672"] = 639,["673"] = 639,["674"] = 639,["675"] = 644,["676"] = 644,["677"] = 644,["678"] = 644,["679"] = 644,["680"] = 644,["681"] = 639,["682"] = 645,["683"] = 645,["684"] = 645,["685"] = 645,["686"] = 645,["687"] = 645,["688"] = 639,["689"] = 646,["690"] = 646,["691"] = 646,["692"] = 646,["693"] = 646,["694"] = 646,["695"] = 639,["696"] = 639,["697"] = 639,["698"] = 653,["699"] = 653,["700"] = 653,["701"] = 653,["702"] = 653,["703"] = 658,["704"] = 658,["705"] = 658,["706"] = 658,["707"] = 658,["708"] = 658,["709"] = 653,["710"] = 659,["711"] = 659,["712"] = 659,["713"] = 659,["714"] = 659,["715"] = 659,["716"] = 653,["717"] = 660,["718"] = 660,["719"] = 660,["720"] = 660,["721"] = 660,["722"] = 660,["723"] = 653,["724"] = 653,["725"] = 653,["726"] = 667,["727"] = 667,["728"] = 667,["729"] = 667,["730"] = 667,["731"] = 672,["732"] = 672,["733"] = 672,["734"] = 672,["735"] = 672,["736"] = 672,["737"] = 667,["738"] = 673,["739"] = 673,["740"] = 673,["741"] = 673,["742"] = 673,["743"] = 673,["744"] = 667,["745"] = 674,["746"] = 674,["747"] = 674,["748"] = 674,["749"] = 674,["750"] = 674,["751"] = 667,["752"] = 667,["753"] = 667,["754"] = 682,["755"] = 516,["756"] = 688,["757"] = 689,["758"] = 690,["759"] = 691,["760"] = 688,["761"] = 697,["762"] = 698,["763"] = 697,["764"] = 704,["765"] = 705,["766"] = 704,["767"] = 711,["768"] = 712,["769"] = 713,["770"] = 713,["771"] = 713,["773"] = 713,["775"] = 713,["776"] = 711,["777"] = 719,["778"] = 720,["779"] = 721,["780"] = 721,["781"] = 721,["783"] = 721,["785"] = 721,["786"] = 719,["787"] = 727,["788"] = 728,["789"] = 727,["790"] = 734,["791"] = 735,["792"] = 734,["793"] = 741,["794"] = 742,["795"] = 741,["796"] = 748,["797"] = 749,["798"] = 750,["799"] = 751,["801"] = 753,["802"] = 754,["803"] = 748,["804"] = 760,["805"] = 761,["806"] = 762,["807"] = 760,["808"] = 768,["809"] = 769,["810"] = 768,["811"] = 775,["812"] = 776,["814"] = 777,["815"] = 777,["816"] = 778,["817"] = 777,["820"] = 780,["821"] = 775,["822"] = 787,["823"] = 789,["824"] = 790,["825"] = 791,["826"] = 793,["827"] = 793,["828"] = 793,["829"] = 793,["830"] = 793,["831"] = 793,["832"] = 793,["833"] = 793,["834"] = 793,["835"] = 793,["837"] = 804,["839"] = 808,["840"] = 809,["841"] = 810,["842"] = 811,["843"] = 811,["844"] = 811,["845"] = 811,["846"] = 811,["847"] = 811,["848"] = 811,["849"] = 811,["850"] = 811,["851"] = 811,["853"] = 824,["854"] = 787,["855"] = 830,["856"] = 831,["857"] = 830,["858"] = 837,["859"] = 839,["860"] = 840,["861"] = 841,["862"] = 841,["863"] = 841,["865"] = 841,["867"] = 841,["869"] = 845,["870"] = 846,["871"] = 847,["872"] = 848,["874"] = 852,["875"] = 853,["876"] = 854,["878"] = 856,["879"] = 856,["880"] = 856,["882"] = 856,["884"] = 856,["885"] = 837,["886"] = 862,["887"] = 863,["888"] = 864,["889"] = 865,["891"] = 868,["892"] = 869,["893"] = 872,["894"] = 873,["895"] = 873,["897"] = 876,["898"] = 877,["899"] = 877,["901"] = 880,["902"] = 881,["903"] = 881,["905"] = 884,["906"] = 885,["907"] = 885,["909"] = 888,["910"] = 862,["911"] = 894,["912"] = 895,["913"] = 896,["914"] = 894,["915"] = 902,["916"] = 903,["917"] = 904,["918"] = 905,["920"] = 908,["921"] = 909,["922"] = 911,["923"] = 912,["925"] = 916,["926"] = 917,["928"] = 925,["929"] = 926,["930"] = 928,["931"] = 929,["932"] = 930,["933"] = 931,["936"] = 940,["937"] = 941,["938"] = 902,["939"] = 951,["940"] = 952,["941"] = 953,["942"] = 953,["943"] = 953,["945"] = 953,["947"] = 953,["948"] = 951,["949"] = 959,["950"] = 960,["951"] = 961,["952"] = 959,["953"] = 969,["954"] = 971,["955"] = 972,["956"] = 973,["957"] = 974,["959"] = 976,["961"] = 979,["962"] = 980,["963"] = 981,["964"] = 982,["966"] = 986,["967"] = 987,["968"] = 988,["969"] = 989,["972"] = 994,["973"] = 995,["974"] = 969,["975"] = 1003,["976"] = 1004,["977"] = 1005,["978"] = 1005,["979"] = 1005,["980"] = 1005,["981"] = 1007,["982"] = 1008,["984"] = 1011,["985"] = 1012,["986"] = 1013,["987"] = 1015,["988"] = 1016,["989"] = 1017,["990"] = 1018,["992"] = 1021,["993"] = 1022,["994"] = 1003,["995"] = 1036,["996"] = 1042,["997"] = 1043,["998"] = 1045,["999"] = 1046,["1000"] = 1047,["1001"] = 1048,["1002"] = 1050,["1003"] = 1051,["1004"] = 1052,["1006"] = 1055,["1007"] = 1036,["1008"] = 115,["1009"] = 116,["1010"] = 119,["1011"] = 122,["1012"] = 123,["1013"] = 124});
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
function StageConfigManager.initializeLayerConfigs(self)
    local emptyDropRates = {
        cost1 = 0,
        cost2 = 0,
        cost3 = 0,
        cost4 = 0,
        cost5 = 0
    }
    local emptyMonsterConfig = {options = {{count = 0, probability = 100}}}
    local emptyStrength = {healthMultiplier = 1, damageMultiplier = 1, baseValue = 0}
    local layer1Nodes = {{
        nodeId = "L1_1",
        layerId = 1,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 1, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.45, damageMultiplier = 0.45, baseValue = 0.45}
    }}
    self.layerConfigs:set(1, {layerId = 1, nodes = layer1Nodes})
    __TS__ArrayForEach(
        layer1Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer2Nodes = {{
        nodeId = "L2_1",
        layerId = 2,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.ELITE_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 70,
            cost2 = 27,
            cost3 = 3,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 2, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.45, damageMultiplier = 0.45, baseValue = 0.45}
    }, {
        nodeId = "L2_2",
        layerId = 2,
        nodeIndex = 2,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 2, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.45, damageMultiplier = 0.45, baseValue = 0.45}
    }, {
        nodeId = "L2_3",
        layerId = 2,
        nodeIndex = 3,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 2, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.45, damageMultiplier = 0.45, baseValue = 0.45}
    }}
    self.layerConfigs:set(2, {layerId = 2, nodes = layer2Nodes})
    __TS__ArrayForEach(
        layer2Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer3Nodes = {{
        nodeId = "L3_1",
        layerId = 3,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 3, probability = 40}, {count = 2, probability = 60}}},
        monsterStrength = {healthMultiplier = 0.5, damageMultiplier = 0.5, baseValue = 0.5}
    }, {
        nodeId = "L3_2",
        layerId = 3,
        nodeIndex = 2,
        nodeType = ____exports.NodeType.EVENT,
        isEventNode = true,
        healPercentage = 20,
        dropRates = emptyDropRates,
        monsterCountConfig = emptyMonsterConfig,
        monsterStrength = emptyStrength
    }, {
        nodeId = "L3_3",
        layerId = 3,
        nodeIndex = 3,
        nodeType = ____exports.NodeType.EVENT,
        isEventNode = true,
        healPercentage = 20,
        dropRates = emptyDropRates,
        monsterCountConfig = emptyMonsterConfig,
        monsterStrength = emptyStrength
    }}
    self.layerConfigs:set(3, {layerId = 3, nodes = layer3Nodes})
    __TS__ArrayForEach(
        layer3Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer4Nodes = {{
        nodeId = "L4_1",
        layerId = 4,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.EVENT,
        isEventNode = true,
        healPercentage = 20,
        dropRates = emptyDropRates,
        monsterCountConfig = emptyMonsterConfig,
        monsterStrength = emptyStrength
    }, {
        nodeId = "L4_2",
        layerId = 4,
        nodeIndex = 2,
        nodeType = ____exports.NodeType.ELITE_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 50,
            cost2 = 35,
            cost3 = 10,
            cost4 = 4,
            cost5 = 1
        },
        monsterCountConfig = {options = {{count = 4, probability = 50}, {count = 3, probability = 50}}},
        monsterStrength = {healthMultiplier = 0.5, damageMultiplier = 0.5, baseValue = 0.5}
    }, {
        nodeId = "L4_3",
        layerId = 4,
        nodeIndex = 3,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 100,
            cost2 = 0,
            cost3 = 0,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 4, probability = 50}, {count = 3, probability = 50}}},
        monsterStrength = {healthMultiplier = 0.5, damageMultiplier = 0.5, baseValue = 0.5}
    }}
    self.layerConfigs:set(4, {layerId = 4, nodes = layer4Nodes})
    __TS__ArrayForEach(
        layer4Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer5Nodes = {{
        nodeId = "L5_1",
        layerId = 5,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.ELITE_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 50,
            cost2 = 35,
            cost3 = 10,
            cost4 = 4,
            cost5 = 1
        },
        monsterCountConfig = {options = {{count = 4, probability = 50}, {count = 3, probability = 50}}},
        monsterStrength = {healthMultiplier = 0.55, damageMultiplier = 0.55, baseValue = 0.55}
    }, {
        nodeId = "L5_2",
        layerId = 5,
        nodeIndex = 2,
        nodeType = ____exports.NodeType.EVENT,
        isEventNode = true,
        healPercentage = 20,
        dropRates = emptyDropRates,
        monsterCountConfig = emptyMonsterConfig,
        monsterStrength = emptyStrength
    }, {
        nodeId = "L5_3",
        layerId = 5,
        nodeIndex = 3,
        nodeType = ____exports.NodeType.ELITE_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 50,
            cost2 = 35,
            cost3 = 10,
            cost4 = 4,
            cost5 = 1
        },
        monsterCountConfig = {options = {{count = 4, probability = 50}, {count = 3, probability = 50}}},
        monsterStrength = {healthMultiplier = 0.55, damageMultiplier = 0.55, baseValue = 0.55}
    }}
    self.layerConfigs:set(5, {layerId = 5, nodes = layer5Nodes})
    __TS__ArrayForEach(
        layer5Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer6Nodes = {{
        nodeId = "L6_1",
        layerId = 6,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 60,
            cost2 = 35,
            cost3 = 5,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 5, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.55, damageMultiplier = 0.55, baseValue = 0.55}
    }, {
        nodeId = "L6_2",
        layerId = 6,
        nodeIndex = 2,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 60,
            cost2 = 35,
            cost3 = 5,
            cost4 = 0,
            cost5 = 0
        },
        monsterCountConfig = {options = {{count = 5, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.55, damageMultiplier = 0.55, baseValue = 0.55}
    }, {
        nodeId = "L6_3",
        layerId = 6,
        nodeIndex = 3,
        nodeType = ____exports.NodeType.EVENT,
        isEventNode = true,
        healPercentage = 20,
        dropRates = emptyDropRates,
        monsterCountConfig = emptyMonsterConfig,
        monsterStrength = emptyStrength
    }}
    self.layerConfigs:set(6, {layerId = 6, nodes = layer6Nodes})
    __TS__ArrayForEach(
        layer6Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer7Nodes = {{
        nodeId = "L7_1",
        layerId = 7,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.NORMAL_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 50,
            cost2 = 35,
            cost3 = 10,
            cost4 = 4,
            cost5 = 1
        },
        monsterCountConfig = {options = {{count = 6, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.6, damageMultiplier = 0.6, baseValue = 0.6}
    }}
    self.layerConfigs:set(7, {layerId = 7, nodes = layer7Nodes})
    __TS__ArrayForEach(
        layer7Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer8Nodes = {{
        nodeId = "L8_1",
        layerId = 8,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.ELITE_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 25,
            cost2 = 30,
            cost3 = 30,
            cost4 = 12,
            cost5 = 3
        },
        monsterCountConfig = {options = {{count = 7, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.65, damageMultiplier = 0.65, baseValue = 0.65}
    }}
    self.layerConfigs:set(8, {layerId = 8, nodes = layer8Nodes})
    __TS__ArrayForEach(
        layer8Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer9Nodes = {{
        nodeId = "L9_1",
        layerId = 9,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.EVENT_EVACUATE,
        isEventNode = true,
        healPercentage = 0,
        dropRates = emptyDropRates,
        monsterCountConfig = emptyMonsterConfig,
        monsterStrength = emptyStrength
    }}
    self.layerConfigs:set(9, {layerId = 9, nodes = layer9Nodes})
    __TS__ArrayForEach(
        layer9Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer10Nodes = {{
        nodeId = "L10_1",
        layerId = 10,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.ELITE_BATTLE,
        isEventNode = false,
        dropRates = {
            cost1 = 20,
            cost2 = 25,
            cost3 = 30,
            cost4 = 20,
            cost5 = 5
        },
        monsterCountConfig = {options = {{count = 8, probability = 100}}},
        monsterStrength = {healthMultiplier = 0.75, damageMultiplier = 0.75, baseValue = 0.75}
    }}
    self.layerConfigs:set(10, {layerId = 10, nodes = layer10Nodes})
    __TS__ArrayForEach(
        layer10Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    local layer11Nodes = {{
        nodeId = "L11_1",
        layerId = 11,
        nodeIndex = 1,
        nodeType = ____exports.NodeType.BOSS,
        isEventNode = false,
        dropRates = {
            cost1 = 15,
            cost2 = 20,
            cost3 = 25,
            cost4 = 30,
            cost5 = 10
        },
        monsterCountConfig = {options = {{count = 7, probability = 100}}, specialCount = 1, specialType = "boss"},
        monsterStrength = {healthMultiplier = 0.8, damageMultiplier = 0.8, baseValue = 0.8}
    }}
    self.layerConfigs:set(11, {layerId = 11, nodes = layer11Nodes})
    __TS__ArrayForEach(
        layer11Nodes,
        function(____, node) return self.nodeConfigs:set(node.nodeId, node) end
    )
    print(((("[StageConfigManager] Initialized " .. tostring(self.layerConfigs.size)) .. " layers with ") .. tostring(self.nodeConfigs.size)) .. " nodes")
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
    self:initializeLayerConfigs()
    self:initializeStageConfigs()
end
function StageConfigManager.getLayerConfig(self, layerId)
    return self.layerConfigs:get(layerId) or nil
end
function StageConfigManager.getNodeConfig(self, nodeId)
    return self.nodeConfigs:get(nodeId) or nil
end
function StageConfigManager.getLayerNodes(self, layerId)
    local layerConfig = self:getLayerConfig(layerId)
    local ____layerConfig_2
    if layerConfig then
        ____layerConfig_2 = layerConfig.nodes
    else
        ____layerConfig_2 = {}
    end
    return ____layerConfig_2
end
function StageConfigManager.isEventNode(self, nodeId)
    local nodeConfig = self:getNodeConfig(nodeId)
    local ____nodeConfig_3
    if nodeConfig then
        ____nodeConfig_3 = nodeConfig.isEventNode
    else
        ____nodeConfig_3 = false
    end
    return ____nodeConfig_3
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
function StageConfigManager.rollHeroByStage(self, stageIdOrNodeId, isElite)
    local cost = self:rollCardCost(stageIdOrNodeId, isElite)
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
function StageConfigManager.getStageConfig(self, stageIdOrNodeId)
    if type(stageIdOrNodeId) == "string" then
        local nodeConfig = self:getNodeConfig(stageIdOrNodeId)
        if nodeConfig then
            return {
                stageId = nodeConfig.layerId,
                nodeLevel = nodeConfig.layerId,
                primaryNodeType = nodeConfig.nodeType,
                secondaryNodeType = nodeConfig.nodeType,
                normalNodeDropRates = nodeConfig.dropRates,
                eliteNodeDropRates = nodeConfig.dropRates,
                averageDropRates = nodeConfig.dropRates,
                monsterCountConfig = nodeConfig.monsterCountConfig
            }
        end
        return nil
    end
    local nodeId = ("L" .. tostring(stageIdOrNodeId)) .. "_1"
    local nodeConfig = self:getNodeConfig(nodeId)
    if nodeConfig then
        return {
            stageId = nodeConfig.layerId,
            nodeLevel = nodeConfig.layerId,
            primaryNodeType = nodeConfig.nodeType,
            secondaryNodeType = nodeConfig.nodeType,
            normalNodeDropRates = nodeConfig.dropRates,
            eliteNodeDropRates = nodeConfig.dropRates,
            averageDropRates = nodeConfig.dropRates,
            monsterCountConfig = nodeConfig.monsterCountConfig
        }
    end
    return self.stageConfigs:get(stageIdOrNodeId) or nil
end
function StageConfigManager.getAllStageConfigs(self)
    return self.stageConfigs
end
function StageConfigManager.getDropRates(self, stageIdOrNodeId, isElite)
    if type(stageIdOrNodeId) == "string" then
        local nodeConfig = self:getNodeConfig(stageIdOrNodeId)
        local ____nodeConfig_4
        if nodeConfig then
            ____nodeConfig_4 = nodeConfig.dropRates
        else
            ____nodeConfig_4 = nil
        end
        return ____nodeConfig_4
    end
    local nodeId = ("L" .. tostring(stageIdOrNodeId)) .. "_1"
    local nodeConfig = self:getNodeConfig(nodeId)
    if nodeConfig then
        return nodeConfig.dropRates
    end
    local config = self.stageConfigs:get(stageIdOrNodeId)
    if not config then
        return nil
    end
    local ____isElite_5
    if isElite then
        ____isElite_5 = config.eliteNodeDropRates
    else
        ____isElite_5 = config.normalNodeDropRates
    end
    return ____isElite_5
end
function StageConfigManager.rollCardCost(self, stageIdOrNodeId, isElite)
    local dropRates = self:getDropRates(stageIdOrNodeId, isElite)
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
function StageConfigManager.rollMonsterCount(self, stageIdOrNodeId)
    local config = self:getStageConfig(stageIdOrNodeId)
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
function StageConfigManager.getMonsterCountConfig(self, stageIdOrNodeId)
    local config = self:getStageConfig(stageIdOrNodeId)
    local ____config_6
    if config then
        ____config_6 = config.monsterCountConfig
    else
        ____config_6 = nil
    end
    return ____config_6
end
function StageConfigManager.getTotalMonsterCount(self, stageIdOrNodeId)
    local result = self:rollMonsterCount(stageIdOrNodeId)
    return result.normalCount + (result.specialCount or 0)
end
function StageConfigManager.getMonsterStrength(self, stageIdOrNodeId)
    local nodeId
    if type(stageIdOrNodeId) == "number" then
        nodeId = ("L" .. tostring(stageIdOrNodeId)) .. "_1"
        print((("[StageConfigManager] Converting stage ID " .. tostring(stageIdOrNodeId)) .. " to node ID: ") .. nodeId)
    else
        nodeId = stageIdOrNodeId
    end
    local nodeConfig = self:getNodeConfig(nodeId)
    if nodeConfig and nodeConfig.monsterStrength then
        print((((("[StageConfigManager] ✅ Found monster strength for " .. nodeId) .. ": HP=") .. tostring(nodeConfig.monsterStrength.healthMultiplier)) .. ", DMG=") .. tostring(nodeConfig.monsterStrength.damageMultiplier))
        return nodeConfig.monsterStrength
    end
    if type(stageIdOrNodeId) == "number" then
        local stageConfig = self.stageConfigs:get(stageIdOrNodeId)
        if stageConfig then
            print(("[StageConfigManager] ⚠️ Using fallback: stage " .. tostring(stageIdOrNodeId)) .. " found in old configs, returning default strength")
        end
    end
    print(("[StageConfigManager] ⚠️ Node " .. nodeId) .. " not found, returning default strength (100%)")
    return {healthMultiplier = 1, damageMultiplier = 1, baseValue = 1}
end
function StageConfigManager.getLayerAverageStrength(self, layerId)
    local layerNodes = self:getLayerNodes(layerId)
    local battleNodes = __TS__ArrayFilter(
        layerNodes,
        function(____, node) return not node.isEventNode end
    )
    if #battleNodes == 0 then
        return {healthMultiplier = 1, damageMultiplier = 1, baseValue = 1}
    end
    local totalHealth = 0
    local totalDamage = 0
    local totalBase = 0
    for ____, node in ipairs(battleNodes) do
        totalHealth = totalHealth + node.monsterStrength.healthMultiplier
        totalDamage = totalDamage + node.monsterStrength.damageMultiplier
        totalBase = totalBase + node.monsterStrength.baseValue
    end
    local count = #battleNodes
    return {healthMultiplier = totalHealth / count, damageMultiplier = totalDamage / count, baseValue = totalBase / count}
end
function StageConfigManager.applyMonsterStrength(self, unit, baseHealth, baseDamage, strength)
    local finalHealth = math.floor(baseHealth * strength.healthMultiplier)
    local finalDamage = math.floor(baseDamage * strength.damageMultiplier)
    unit:SetMaxHealth(finalHealth)
    unit:SetHealth(finalHealth)
    unit:SetBaseDamageMin(finalDamage)
    unit:SetBaseDamageMax(finalDamage)
    if strength.armorBonus then
        local currentArmor = unit:GetPhysicalArmorBaseValue()
        unit:SetPhysicalArmorBaseValue(currentArmor + strength.armorBonus)
    end
    print(((((((((((("[StageConfigManager] Applied strength: HP " .. tostring(baseHealth)) .. " → ") .. tostring(finalHealth)) .. " (") .. __TS__NumberToFixed(strength.healthMultiplier * 100, 0)) .. "%), DMG ") .. tostring(baseDamage)) .. " → ") .. tostring(finalDamage)) .. " (") .. __TS__NumberToFixed(strength.damageMultiplier * 100, 0)) .. "%)")
end
StageConfigManager.layerConfigs = __TS__New(Map)
StageConfigManager.nodeConfigs = __TS__New(Map)
StageConfigManager.stageConfigs = __TS__New(Map)
StageConfigManager.heroCostMap = __TS__New(Map)
StageConfigManager.costHeroMap = __TS__New(Map)
StageConfigManager.heroConfigs = __TS__New(Map)
return ____exports
