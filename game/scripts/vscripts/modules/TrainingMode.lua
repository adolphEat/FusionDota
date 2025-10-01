local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__ParseFloat = ____lualib.__TS__ParseFloat
local __TS__Number = ____lualib.__TS__Number
local __TS__NumberIsNaN = ____lualib.__TS__NumberIsNaN
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 6,["17"] = 6,["18"] = 7,["19"] = 7,["20"] = 67,["21"] = 67,["22"] = 67,["24"] = 70,["25"] = 71,["26"] = 72,["27"] = 73,["28"] = 78,["29"] = 79,["30"] = 80,["31"] = 81,["32"] = 82,["33"] = 85,["34"] = 86,["35"] = 89,["36"] = 90,["37"] = 91,["38"] = 92,["39"] = 93,["40"] = 88,["41"] = 96,["42"] = 97,["43"] = 98,["45"] = 100,["46"] = 96,["47"] = 106,["48"] = 107,["49"] = 108,["52"] = 112,["53"] = 113,["54"] = 114,["57"] = 118,["58"] = 119,["59"] = 120,["60"] = 122,["61"] = 125,["62"] = 106,["63"] = 131,["64"] = 132,["67"] = 136,["68"] = 137,["69"] = 138,["70"] = 139,["71"] = 140,["72"] = 141,["73"] = 142,["74"] = 144,["75"] = 147,["76"] = 131,["77"] = 153,["78"] = 154,["79"] = 155,["80"] = 156,["81"] = 157,["83"] = 161,["84"] = 163,["85"] = 164,["86"] = 167,["87"] = 168,["89"] = 172,["90"] = 174,["91"] = 177,["92"] = 182,["93"] = 153,["94"] = 188,["95"] = 189,["98"] = 193,["99"] = 194,["100"] = 197,["101"] = 200,["102"] = 202,["103"] = 205,["104"] = 211,["105"] = 212,["106"] = 188,["107"] = 218,["108"] = 219,["109"] = 220,["111"] = 222,["112"] = 222,["113"] = 223,["114"] = 223,["115"] = 223,["116"] = 223,["117"] = 223,["118"] = 229,["119"] = 234,["120"] = 235,["121"] = 235,["123"] = 222,["127"] = 240,["128"] = 218,["129"] = 246,["130"] = 246,["131"] = 246,["135"] = 281,["136"] = 282,["139"] = 248,["140"] = 248,["141"] = 248,["142"] = 248,["143"] = 248,["144"] = 248,["145"] = 248,["146"] = 248,["147"] = 257,["148"] = 258,["149"] = 259,["151"] = 263,["152"] = 264,["154"] = 265,["155"] = 265,["156"] = 266,["157"] = 265,["162"] = 272,["163"] = 273,["165"] = 277,["166"] = 279,["172"] = 247,["175"] = 246,["176"] = 289,["179"] = 318,["182"] = 291,["183"] = 292,["184"] = 293,["186"] = 296,["187"] = 297,["189"] = 300,["190"] = 301,["191"] = 302,["193"] = 305,["194"] = 306,["196"] = 309,["197"] = 310,["199"] = 313,["200"] = 314,["207"] = 289,["208"] = 325,["209"] = 326,["210"] = 327,["211"] = 328,["214"] = 331,["215"] = 325,["216"] = 337,["217"] = 338,["218"] = 339,["219"] = 340,["220"] = 341,["221"] = 341,["222"] = 341,["223"] = 341,["224"] = 341,["226"] = 349,["227"] = 337,["228"] = 355,["229"] = 356,["230"] = 357,["231"] = 358,["233"] = 360,["234"] = 355,["235"] = 366,["236"] = 368,["237"] = 369,["239"] = 372,["240"] = 373,["242"] = 376,["243"] = 377,["245"] = 381,["246"] = 382,["248"] = 386,["249"] = 387,["251"] = 391,["252"] = 392,["254"] = 366,["255"] = 399,["256"] = 401,["258"] = 402,["259"] = 402,["260"] = 403,["261"] = 404,["263"] = 402,["266"] = 399,["267"] = 412,["268"] = 414,["269"] = 415,["270"] = 416,["272"] = 412,["273"] = 423,["274"] = 423,["275"] = 430,["276"] = 431,["277"] = 432,["280"] = 434,["281"] = 435,["282"] = 435,["283"] = 435,["284"] = 435,["285"] = 435,["286"] = 435,["287"] = 442,["288"] = 443,["289"] = 443,["290"] = 443,["291"] = 443,["292"] = 443,["293"] = 443,["294"] = 443,["295"] = 443,["296"] = 452,["297"] = 453,["298"] = 453,["301"] = 430,["302"] = 461,["303"] = 462,["304"] = 463,["306"] = 461,["307"] = 472,["308"] = 473,["309"] = 472,["310"] = 479,["311"] = 480,["312"] = 480,["313"] = 480,["314"] = 480,["315"] = 480,["316"] = 481,["317"] = 481,["318"] = 481,["319"] = 481,["320"] = 481,["321"] = 479,["322"] = 487,["323"] = 487,["324"] = 495,["325"] = 496,["326"] = 498,["327"] = 499,["329"] = 495,["330"] = 506,["331"] = 508,["332"] = 509,["333"] = 510,["335"] = 514,["336"] = 515,["338"] = 519,["339"] = 519,["340"] = 519,["341"] = 519,["342"] = 519,["343"] = 519,["344"] = 519,["345"] = 506,["346"] = 528,["347"] = 529,["350"] = 531,["351"] = 532,["352"] = 534,["353"] = 537,["354"] = 544,["355"] = 545,["357"] = 548,["358"] = 549,["359"] = 528,["360"] = 555,["361"] = 556,["362"] = 557,["363"] = 558,["364"] = 560,["365"] = 562,["366"] = 562,["367"] = 562,["368"] = 563,["369"] = 564,["370"] = 562,["371"] = 562,["374"] = 555,["375"] = 573,["376"] = 574,["377"] = 577,["378"] = 577,["379"] = 577,["380"] = 578,["381"] = 579,["382"] = 581,["383"] = 582,["384"] = 584,["385"] = 585,["386"] = 586,["388"] = 588,["389"] = 589,["390"] = 589,["391"] = 589,["392"] = 589,["394"] = 589,["396"] = 589,["398"] = 591,["399"] = 577,["400"] = 577,["401"] = 595,["402"] = 595,["403"] = 595,["404"] = 596,["405"] = 597,["406"] = 598,["407"] = 599,["408"] = 595,["409"] = 595,["410"] = 573,["411"] = 606,["412"] = 607,["413"] = 608,["415"] = 609,["416"] = 610,["417"] = 611,["418"] = 612,["419"] = 613,["420"] = 613,["421"] = 613,["423"] = 613,["427"] = 608,["428"] = 608,["429"] = 608,["430"] = 608,["431"] = 608,["432"] = 608,["433"] = 608,["434"] = 608,["435"] = 608,["436"] = 608,["439"] = 606,["440"] = 622,["441"] = 623,["442"] = 623,["443"] = 623,["444"] = 623,["445"] = 623,["446"] = 623,["447"] = 623,["448"] = 623,["449"] = 623,["450"] = 623,["451"] = 623,["452"] = 623,["453"] = 622,["454"] = 640,["455"] = 642,["456"] = 643,["457"] = 643,["458"] = 643,["459"] = 643,["460"] = 643,["461"] = 642,["462"] = 680,["463"] = 640,["464"] = 686,["465"] = 687,["466"] = 689,["467"] = 690,["469"] = 693,["470"] = 686,["471"] = 699,["472"] = 701,["473"] = 702,["474"] = 703,["475"] = 704,["476"] = 705,["477"] = 705,["478"] = 705,["480"] = 705,["482"] = 700,["483"] = 700,["484"] = 700,["485"] = 700,["486"] = 700,["487"] = 700,["488"] = 700,["489"] = 700,["490"] = 700,["491"] = 700,["492"] = 700,["493"] = 699,["494"] = 731,["495"] = 731,["496"] = 731,["498"] = 732,["499"] = 733,["500"] = 734,["502"] = 738,["503"] = 741,["504"] = 744,["505"] = 745,["507"] = 749,["508"] = 752,["509"] = 752,["510"] = 752,["511"] = 753,["512"] = 754,["513"] = 755,["515"] = 757,["516"] = 752,["517"] = 752,["518"] = 760,["519"] = 761,["520"] = 762,["521"] = 731,["522"] = 768,["523"] = 769,["524"] = 771,["525"] = 772,["526"] = 773,["528"] = 776,["529"] = 777,["530"] = 768,["531"] = 783,["532"] = 785,["533"] = 787,["536"] = 791,["537"] = 792,["540"] = 796,["541"] = 797,["543"] = 802,["544"] = 802,["545"] = 803,["546"] = 804,["547"] = 806,["548"] = 807,["549"] = 808,["550"] = 808,["552"] = 802,["555"] = 812,["556"] = 813,["557"] = 783,["558"] = 819,["559"] = 820,["560"] = 821,["561"] = 826,["562"] = 826,["563"] = 826,["564"] = 826,["565"] = 826,["566"] = 819,["567"] = 836,["568"] = 837,["569"] = 838,["571"] = 842,["572"] = 843,["573"] = 836,["574"] = 849,["575"] = 850,["576"] = 850,["577"] = 850,["578"] = 850,["579"] = 849,["580"] = 858,["581"] = 859,["582"] = 861,["583"] = 862,["584"] = 863,["586"] = 866,["587"] = 867,["588"] = 868,["590"] = 871,["591"] = 872,["592"] = 873,["594"] = 876,["595"] = 858,["596"] = 882,["597"] = 882,["598"] = 882,["600"] = 883,["601"] = 884,["602"] = 885,["604"] = 889,["605"] = 892,["606"] = 895,["607"] = 896,["609"] = 900,["610"] = 903,["611"] = 903,["612"] = 903,["613"] = 904,["614"] = 905,["615"] = 906,["617"] = 908,["618"] = 903,["619"] = 903,["620"] = 911,["621"] = 912,["622"] = 913,["623"] = 882,["624"] = 919,["625"] = 920,["626"] = 922,["627"] = 923,["628"] = 924,["630"] = 928,["631"] = 930,["632"] = 931,["633"] = 919,["634"] = 937,["636"] = 938,["637"] = 938,["638"] = 939,["639"] = 940,["640"] = 941,["641"] = 942,["642"] = 942,["644"] = 938,["647"] = 937,["648"] = 950,["651"] = 976,["652"] = 977,["655"] = 952,["656"] = 952,["657"] = 952,["658"] = 952,["659"] = 952,["660"] = 952,["661"] = 952,["662"] = 952,["663"] = 961,["664"] = 962,["666"] = 966,["667"] = 967,["668"] = 970,["669"] = 971,["671"] = 974,["677"] = 951,["680"] = 950,["681"] = 984,["682"] = 985,["683"] = 986,["684"] = 987,["686"] = 990,["687"] = 991,["688"] = 992,["690"] = 995,["691"] = 995,["692"] = 996,["693"] = 997,["694"] = 997,["695"] = 997,["696"] = 997,["697"] = 997,["698"] = 995,["701"] = 1004,["702"] = 984,["703"] = 1010,["704"] = 1012,["705"] = 1012,["706"] = 1012,["707"] = 1012,["708"] = 1017,["709"] = 1018,["711"] = 1019,["712"] = 1019,["713"] = 1020,["714"] = 1021,["715"] = 1022,["716"] = 1023,["717"] = 1024,["718"] = 1025,["719"] = 1025,["722"] = 1019,["725"] = 1029,["727"] = 1010,["728"] = 1036,["729"] = 1037,["730"] = 1038,["731"] = 1039,["734"] = 1042,["735"] = 1036,["736"] = 1048,["737"] = 1049,["738"] = 1052,["739"] = 1053,["740"] = 1055,["741"] = 1056,["742"] = 1058,["743"] = 1059,["746"] = 1063,["747"] = 1048,["748"] = 1069,["749"] = 1070,["750"] = 1073,["751"] = 1076,["752"] = 1078,["753"] = 1069,["754"] = 1084,["757"] = 1108,["758"] = 1109,["761"] = 1086,["762"] = 1088,["763"] = 1088,["764"] = 1088,["765"] = 1088,["766"] = 1088,["767"] = 1088,["768"] = 1088,["769"] = 1088,["770"] = 1097,["771"] = 1098,["772"] = 1099,["774"] = 1103,["775"] = 1105,["776"] = 1106,["782"] = 1085,["785"] = 1084,["786"] = 1116,["787"] = 1117,["788"] = 1117,["789"] = 1117,["790"] = 1117,["791"] = 1117,["792"] = 1117,["793"] = 1117,["794"] = 1117,["795"] = 1117,["796"] = 1117,["797"] = 1117,["798"] = 1116,["799"] = 1133,["800"] = 1134,["801"] = 1134,["802"] = 1134,["803"] = 1134,["804"] = 1134,["805"] = 1134,["806"] = 1134,["807"] = 1134,["808"] = 1134,["809"] = 1133,["810"] = 1148,["811"] = 1149,["814"] = 1153,["815"] = 1156,["816"] = 1156,["817"] = 1156,["818"] = 1157,["819"] = 1158,["820"] = 1159,["822"] = 1161,["823"] = 1156,["824"] = 1156,["825"] = 1164,["826"] = 1165,["827"] = 1148,["828"] = 1171,["829"] = 1172,["830"] = 1174,["831"] = 1175,["832"] = 1176,["834"] = 1179,["835"] = 1180,["836"] = 1171,["837"] = 1186,["838"] = 1187,["839"] = 1188,["842"] = 1193,["843"] = 1194,["844"] = 1195,["845"] = 1196,["847"] = 1200,["848"] = 1201,["849"] = 1202,["850"] = 1203,["852"] = 1186,["853"] = 1210,["854"] = 1211,["857"] = 1215,["858"] = 1218,["859"] = 1218,["860"] = 1218,["861"] = 1219,["862"] = 1220,["863"] = 1221,["865"] = 1223,["866"] = 1218,["867"] = 1218,["868"] = 1226,["869"] = 1227,["870"] = 1210,["871"] = 1233,["872"] = 1234,["873"] = 1236,["874"] = 1237,["875"] = 1238,["877"] = 1241,["878"] = 1242,["879"] = 1233,["880"] = 1248,["881"] = 1249,["882"] = 1250,["886"] = 1255,["887"] = 1255,["888"] = 1256,["889"] = 1257,["890"] = 1258,["891"] = 1261,["892"] = 1263,["893"] = 1264,["894"] = 1266,["898"] = 1255,["902"] = 1273,["903"] = 1273,["904"] = 1274,["905"] = 1275,["906"] = 1276,["907"] = 1279,["908"] = 1281,["909"] = 1282,["910"] = 1283,["914"] = 1273,["917"] = 1248,["918"] = 1293,["919"] = 1294,["920"] = 1295,["921"] = 1296,["922"] = 1297,["924"] = 1300,["925"] = 1301,["926"] = 1302,["927"] = 1293,["928"] = 1308,["929"] = 1309,["930"] = 1310,["932"] = 1312,["934"] = 1308,["935"] = 1319,["936"] = 1320,["937"] = 1321,["939"] = 1323,["941"] = 1319,["942"] = 1342,["943"] = 1343,["944"] = 1344,["947"] = 1348,["948"] = 1350,["949"] = 1351,["952"] = 1355,["953"] = 1357,["954"] = 1358,["955"] = 1359,["957"] = 1361,["958"] = 1362,["960"] = 1342,["961"] = 1370,["962"] = 1371,["963"] = 1372,["966"] = 1376,["967"] = 1378,["968"] = 1379,["969"] = 1380,["972"] = 1384,["973"] = 1385,["974"] = 1386,["977"] = 1390,["978"] = 1391,["979"] = 1392,["980"] = 1370,["981"] = 1399,["982"] = 1400,["983"] = 1401,["986"] = 1405,["987"] = 1406,["988"] = 1407,["989"] = 1408,["990"] = 1409,["991"] = 1410,["992"] = 1411,["993"] = 1412,["994"] = 1399,["995"] = 1419,["996"] = 1420,["997"] = 1421,["1000"] = 1425,["1001"] = 1426,["1002"] = 1427,["1005"] = 1431,["1006"] = 1432,["1007"] = 1433,["1010"] = 1437,["1011"] = 1438,["1012"] = 1439,["1013"] = 1419,["1014"] = 1446,["1015"] = 1447,["1016"] = 1448,["1019"] = 1452,["1020"] = 1453,["1021"] = 1454,["1022"] = 1446,["1023"] = 1461,["1024"] = 1462,["1025"] = 1463,["1028"] = 1468,["1029"] = 1469,["1030"] = 1470,["1031"] = 1472,["1032"] = 1473,["1033"] = 1474,["1034"] = 1475,["1035"] = 1461});
local ____exports = {}
local ____GameModeManager = require("modules.GameModeManager")
local GameModeManager = ____GameModeManager.GameModeManager
local ____time_utils = require("utils.time_utils")
local getTimestampMs = ____time_utils.getTimestampMs
____exports.TrainingMode = __TS__Class()
local TrainingMode = ____exports.TrainingMode
TrainingMode.name = "TrainingMode"
function TrainingMode.prototype.____constructor(self)
    self.activeScenario = nil
    self.spawnedUnits = {}
    self.testStartTime = 0
    self.isActive = false
    self.autoSpawnTimer = nil
    self.autoDummyTimer = nil
    self.autoSpawnedUnits = {}
    self.autoDummies = {}
    self.spawnCounter = 0
    self.regenTimer = nil
    self.cooldownTimer = nil
    self.settings = self:getDefaultSettings()
    self.autoSpawnConfig = self:getDefaultAutoSpawnConfig()
    self.autoDummyConfig = self:getDefaultAutoDummyConfig()
    self:initializeTrainingMode()
    print("[TrainingMode] Initialized")
end
function TrainingMode.getInstance(self)
    if not ____exports.TrainingMode.instance then
        ____exports.TrainingMode.instance = __TS__New(____exports.TrainingMode)
    end
    return ____exports.TrainingMode.instance
end
function TrainingMode.prototype.activate(self)
    if self.isActive then
        print("[TrainingMode] Already active")
        return
    end
    local gameModeManager = GameModeManager:getInstance()
    if not gameModeManager:isTrainingMode() then
        print("[TrainingMode] Game is not in training mode")
        return
    end
    self.isActive = true
    self:setupTrainingEnvironment()
    self:registerEvents()
    print("[TrainingMode] Activated")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.deactivate(self)
    if not self.isActive then
        return
    end
    self.isActive = false
    self:cleanupSpawnedUnits()
    self:stopAutoSpawn()
    self:stopAutoDummy()
    self:disableAutoRegeneration()
    self:disableCustomCooldowns()
    self:unregisterEvents()
    print("[TrainingMode] Deactivated")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.startTestScenario(self, scenarioId)
    local scenario = self:getTestScenario(scenarioId)
    if not scenario then
        print("[TrainingMode] Unknown test scenario: " .. scenarioId)
        return false
    end
    self:stopCurrentTest()
    self.activeScenario = scenario
    self.testStartTime = GameRules:GetGameTime()
    if scenario.environment then
        self:setupTestEnvironment(scenario.environment)
    end
    self:spawnTestMonsters(scenario.monsters)
    print("[TrainingMode] Started test scenario: " .. scenario.name)
    CustomGameEventManager:Send_ServerToAllClients("training_scenario_started", {scenario = scenario, startTime = self.testStartTime})
    return true
end
function TrainingMode.prototype.stopCurrentTest(self)
    if not self.activeScenario then
        return
    end
    local scenario = self.activeScenario
    local duration = GameRules:GetGameTime() - self.testStartTime
    self:cleanupSpawnedUnits()
    self:resetTestEnvironment()
    print(((("[TrainingMode] Stopped test scenario: " .. scenario.name) .. " (Duration: ") .. __TS__NumberToFixed(duration, 1)) .. "s)")
    CustomGameEventManager:Send_ServerToAllClients("training_scenario_stopped", {scenario = scenario, duration = duration, completed = false})
    self.activeScenario = nil
    self.testStartTime = 0
end
function TrainingMode.prototype.spawnTestMonsters(self, monsters)
    for ____, monsterData in ipairs(monsters) do
        local position = monsterData.position or self:getRandomSpawnPosition()
        do
            local i = 0
            while i < monsterData.count do
                local spawnPos = Vector(
                    position.x + RandomFloat(-200, 200),
                    position.y + RandomFloat(-200, 200),
                    position.z
                )
                local unit = self:spawnMonster(monsterData.unitName, spawnPos, {level = monsterData.level or 1, customStats = monsterData.customStats})
                if unit then
                    local ____self_spawnedUnits_0 = self.spawnedUnits
                    ____self_spawnedUnits_0[#____self_spawnedUnits_0 + 1] = unit
                end
                i = i + 1
            end
        end
    end
    print(("[TrainingMode] Spawned " .. tostring(#self.spawnedUnits)) .. " test units")
end
function TrainingMode.prototype.spawnMonster(self, unitName, position, options)
    if options == nil then
        options = {}
    end
    do
        local function ____catch(____error)
            print((("[TrainingMode] Error spawning unit " .. unitName) .. ": ") .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local unit = CreateUnitByName(
                unitName,
                position,
                true,
                nil,
                nil,
                DOTA_TEAM_BADGUYS
            )
            if not unit or unit:IsNull() then
                print("[TrainingMode] Failed to spawn unit: " .. unitName)
                return true, nil
            end
            if options.level and options.level > 1 then
                if unit:IsHero() then
                    do
                        local i = 1
                        while i < options.level do
                            unit:HeroLevelUp(false)
                            i = i + 1
                        end
                    end
                end
            end
            if options.customStats then
                self:applyCustomStats(unit, options.customStats)
            end
            unit:SetInitialGoalEntity(self:getPlayerHero())
            return true, unit
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function TrainingMode.prototype.applyCustomStats(self, unit, stats)
    do
        local function ____catch(____error)
            print("[TrainingMode] Error applying custom stats: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            if stats.health then
                unit:SetMaxHealth(stats.health)
                unit:SetHealth(stats.health)
            end
            if stats.mana then
                unit:SetMana(stats.mana)
            end
            if stats.damage then
                unit:SetBaseDamageMin(stats.damage)
                unit:SetBaseDamageMax(stats.damage)
            end
            if stats.armor then
                unit:SetPhysicalArmorBaseValue(stats.armor)
            end
            if stats.magicResistance then
                unit:SetBaseMagicalResistanceValue(stats.magicResistance)
            end
            if stats.moveSpeed then
                unit:SetBaseMoveSpeed(stats.moveSpeed)
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function TrainingMode.prototype.cleanupSpawnedUnits(self)
    for ____, unit in ipairs(self.spawnedUnits) do
        if unit and not unit:IsNull() then
            unit:RemoveSelf()
        end
    end
    self.spawnedUnits = {}
end
function TrainingMode.prototype.getRandomSpawnPosition(self)
    local hero = self:getPlayerHero()
    if hero then
        local heroPos = hero:GetAbsOrigin()
        return Vector(
            heroPos.x + RandomFloat(-800, 800),
            heroPos.y + RandomFloat(-800, 800),
            heroPos.z
        )
    end
    return Vector(0, 0, 256)
end
function TrainingMode.prototype.getPlayerHero(self)
    local player = PlayerResource:GetPlayer(0)
    if player then
        return player:GetAssignedHero()
    end
    return nil
end
function TrainingMode.prototype.setupTrainingEnvironment(self)
    if self.settings.infiniteResources then
        self:enableInfiniteResources()
    end
    if self.settings.noCooldowns then
        self:enableNoCooldowns()
    end
    if self.settings.autoRespawn then
        self:enableAutoRespawn()
    end
    if self.settings.autoRegeneration then
        self:enableAutoRegeneration()
    end
    if self.settings.customCooldowns then
        self:enableCustomCooldowns()
    end
    if self.settings.enableTargetDummies then
        self:spawnTargetDummies()
    end
end
function TrainingMode.prototype.enableInfiniteResources(self)
    local playerCount = PlayerResource:GetPlayerCount()
    do
        local playerId = 0
        while playerId < playerCount do
            if PlayerResource:IsValidPlayer(playerId) then
                PlayerResource:SetGold(playerId, 99999, true)
            end
            playerId = playerId + 1
        end
    end
end
function TrainingMode.prototype.enableNoCooldowns(self)
    local hero = self:getPlayerHero()
    if hero then
        hero:AddNewModifier(hero, nil, "modifier_dummy_no_cooldown", {})
    end
end
function TrainingMode.prototype.enableAutoRespawn(self)
end
function TrainingMode.prototype.spawnTargetDummies(self)
    local hero = self:getPlayerHero()
    if not hero then
        return
    end
    local heroPos = hero:GetAbsOrigin()
    local positions = {
        Vector(heroPos.x + 500, heroPos.y, heroPos.z),
        Vector(heroPos.x - 500, heroPos.y, heroPos.z),
        Vector(heroPos.x, heroPos.y + 500, heroPos.z),
        Vector(heroPos.x, heroPos.y - 500, heroPos.z)
    }
    for ____, pos in ipairs(positions) do
        local dummy = CreateUnitByName(
            "npc_dota_training_dummy",
            pos,
            true,
            nil,
            nil,
            DOTA_TEAM_NEUTRALS
        )
        if dummy then
            local ____self_spawnedUnits_1 = self.spawnedUnits
            ____self_spawnedUnits_1[#____self_spawnedUnits_1 + 1] = dummy
        end
    end
end
function TrainingMode.prototype.setupTestEnvironment(self, environment)
    if environment.timeOfDay ~= nil then
        GameRules:SetTimeOfDay(environment.timeOfDay)
    end
end
function TrainingMode.prototype.resetTestEnvironment(self)
    GameRules:SetTimeOfDay(0.25)
end
function TrainingMode.prototype.registerEvents(self)
    ListenToGameEvent(
        "entity_killed",
        function(____, event) return self:onEntityKilled(event) end,
        self
    )
    ListenToGameEvent(
        "dota_player_killed",
        function(____, event) return self:onPlayerKilled(event) end,
        self
    )
end
function TrainingMode.prototype.unregisterEvents(self)
end
function TrainingMode.prototype.onEntityKilled(self, event)
    local killedUnit = EntIndexToHScript(event.entindex_killed)
    if __TS__ArrayIncludes(self.spawnedUnits, killedUnit) then
        self:onTestUnitKilled(killedUnit)
    end
end
function TrainingMode.prototype.onTestUnitKilled(self, unit)
    local index = __TS__ArrayIndexOf(self.spawnedUnits, unit)
    if index > -1 then
        __TS__ArraySplice(self.spawnedUnits, index, 1)
    end
    if self.activeScenario and #self.spawnedUnits == 0 then
        self:onTestScenarioCompleted()
    end
    CustomGameEventManager:Send_ServerToAllClients(
        "training_unit_killed",
        {
            unitName = unit:GetUnitName(),
            remainingUnits = #self.spawnedUnits
        }
    )
end
function TrainingMode.prototype.onTestScenarioCompleted(self)
    if not self.activeScenario then
        return
    end
    local duration = GameRules:GetGameTime() - self.testStartTime
    local scenario = self.activeScenario
    print(((("[TrainingMode] Test scenario completed: " .. scenario.name) .. " in ") .. __TS__NumberToFixed(duration, 1)) .. "s")
    CustomGameEventManager:Send_ServerToAllClients("training_scenario_completed", {scenario = scenario, duration = duration, success = true})
    if self.settings.pauseAfterKill then
        SendToServerConsole("dota_pause")
    end
    self.activeScenario = nil
    self.testStartTime = 0
end
function TrainingMode.prototype.onPlayerKilled(self, event)
    if self.settings.autoRespawn then
        local playerId = event.PlayerID
        local hero = PlayerResource:GetSelectedHeroEntity(playerId)
        if hero then
            Timers:CreateTimer(
                1,
                function()
                    hero:RespawnHero(false, false)
                    return nil
                end
            )
        end
    end
end
function TrainingMode.prototype.initializeTrainingMode(self)
    print("[TrainingMode] Setting up delayed initialization...")
    Timers:CreateTimer(
        1,
        function()
            print("[TrainingMode] ===== 1-second initialization checkpoint =====")
            print("[TrainingMode] GameRules.GameModeManager exists: " .. (GameRules.GameModeManager and "YES" or "NO"))
            local gameModeManager = GameModeManager:getInstance()
            print("[TrainingMode] GameModeManager instance obtained: " .. (gameModeManager and "YES" or "NO"))
            if gameModeManager and gameModeManager:isTrainingMode() then
                print("[TrainingMode] Training mode detected, activating...")
                self:activate()
            else
                print("[TrainingMode] Not in training mode or GameModeManager unavailable")
                local ____print_3 = print
                local ____gameModeManager_2
                if gameModeManager then
                    ____gameModeManager_2 = gameModeManager:getCurrentMode()
                else
                    ____gameModeManager_2 = "unknown"
                end
                ____print_3("[TrainingMode] Current mode: " .. ____gameModeManager_2)
            end
            return nil
        end
    )
    Timers:CreateTimer(
        5,
        function()
            print("[TrainingMode] ===== 5-second status check =====")
            print("[TrainingMode] Is active: " .. tostring(self.isActive))
            print((("[TrainingMode] Settings: autoRespawn=" .. tostring(self.settings.autoRespawn)) .. ", infiniteResources=") .. tostring(self.settings.infiniteResources))
            return nil
        end
    )
end
function TrainingMode.prototype.syncStatusToNetTable(self)
    if GameRules.XNetTable then
        local ____self_9 = GameRules.XNetTable
        local ____self_9_SetTableValue_10 = ____self_9.SetTableValue
        local ____self_isActive_5 = self.isActive
        local ____self_settings_6 = self.settings
        local ____self_activeScenario_7 = self.activeScenario
        local ____temp_8 = #self.spawnedUnits
        local ____table_activeScenario_4
        if self.activeScenario then
            ____table_activeScenario_4 = GameRules:GetGameTime() - self.testStartTime
        else
            ____table_activeScenario_4 = 0
        end
        ____self_9_SetTableValue_10(
            ____self_9,
            "training_mode",
            "status",
            {
                isActive = ____self_isActive_5,
                settings = ____self_settings_6,
                activeScenario = ____self_activeScenario_7,
                spawnedUnitsCount = ____temp_8,
                testDuration = ____table_activeScenario_4,
                timestamp = getTimestampMs(nil)
            }
        )
    end
end
function TrainingMode.prototype.getDefaultSettings(self)
    return {
        autoRespawn = true,
        infiniteResources = true,
        noCooldowns = false,
        fastLevelUp = true,
        showDamageNumbers = true,
        pauseAfterKill = false,
        enableTargetDummies = true,
        autoRegeneration = true,
        customCooldowns = true,
        cooldownSeconds = 3
    }
end
function TrainingMode.prototype.getTestScenario(self, scenarioId)
    local scenarios = {basic_combat = {
        id = "basic_combat",
        name = "基础战斗测试",
        description = "生成几个基础怪物进行战斗测试",
        monsters = {{unitName = "npc_dota_neutral_kobold", count = 3, level = 1}},
        objectives = {{type = "kill_all", description = "击杀所有怪物"}}
    }, damage_test = {id = "damage_test", name = "伤害测试", description = "测试技能伤害的固定目标", monsters = {{unitName = "npc_dota_training_dummy", count = 1, level = 1, customStats = {health = 10000, armor = 0, magicResistance = 0}}}}}
    return scenarios[scenarioId] or nil
end
function TrainingMode.prototype.updateSettings(self, newSettings)
    self.settings = __TS__ObjectAssign({}, self.settings, newSettings)
    if self.isActive then
        self:setupTrainingEnvironment()
    end
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.getStatus(self)
    local ____self_isActive_12 = self.isActive
    local ____self_settings_13 = self.settings
    local ____self_activeScenario_14 = self.activeScenario
    local ____temp_15 = #self.spawnedUnits
    local ____table_activeScenario_11
    if self.activeScenario then
        ____table_activeScenario_11 = GameRules:GetGameTime() - self.testStartTime
    else
        ____table_activeScenario_11 = 0
    end
    return {
        isActive = ____self_isActive_12,
        settings = ____self_settings_13,
        activeScenario = ____self_activeScenario_14,
        spawnedUnitsCount = ____temp_15,
        testDuration = ____table_activeScenario_11,
        autoSpawn = {enabled = self.autoSpawnConfig.enabled, unitsCount = #self.autoSpawnedUnits, config = self.autoSpawnConfig},
        autoDummy = {enabled = self.autoDummyConfig.enabled, dummiesCount = #self.autoDummies, config = self.autoDummyConfig},
        autoRegeneration = {enabled = self.settings.autoRegeneration, active = self.regenTimer ~= nil},
        customCooldowns = {enabled = self.settings.customCooldowns, active = self.cooldownTimer ~= nil, seconds = self.settings.cooldownSeconds}
    }
end
function TrainingMode.prototype.startAutoSpawn(self, config)
    if config == nil then
        config = {}
    end
    if not self.isActive then
        print("[TrainingMode] Training mode is not active")
        return false
    end
    self:stopAutoSpawn()
    self.autoSpawnConfig = __TS__ObjectAssign({}, self.autoSpawnConfig, config, {enabled = true})
    if not self:validateAutoSpawnConfig() then
        return false
    end
    self:performAutoSpawn()
    self.autoSpawnTimer = Timers:CreateTimer(
        self.autoSpawnConfig.interval,
        function()
            if self.autoSpawnConfig.enabled then
                self:performAutoSpawn()
                return self.autoSpawnConfig.interval
            end
            return nil
        end
    )
    print(((("[TrainingMode] Auto spawn started: " .. self.autoSpawnConfig.unitType) .. " every ") .. tostring(self.autoSpawnConfig.interval)) .. "s")
    self:syncStatusToNetTable()
    return true
end
function TrainingMode.prototype.stopAutoSpawn(self)
    self.autoSpawnConfig.enabled = false
    if self.autoSpawnTimer then
        Timers:RemoveTimer(self.autoSpawnTimer)
        self.autoSpawnTimer = nil
    end
    print("[TrainingMode] Auto spawn stopped")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.performAutoSpawn(self)
    self:cleanupDeadAutoSpawnedUnits()
    if #self.autoSpawnedUnits >= self.autoSpawnConfig.maxUnits then
        return
    end
    local hero = self:getPlayerHero()
    if not hero then
        return
    end
    local heroPos = hero:GetAbsOrigin()
    local spawnCount = math.min(self.autoSpawnConfig.count, self.autoSpawnConfig.maxUnits - #self.autoSpawnedUnits)
    do
        local i = 0
        while i < spawnCount do
            local spawnPos = self:getAutoSpawnPosition(heroPos)
            local level = self:calculateAutoSpawnLevel()
            local unit = self:spawnMonster(self.autoSpawnConfig.unitType, spawnPos, {level = level})
            if unit then
                local ____self_autoSpawnedUnits_16 = self.autoSpawnedUnits
                ____self_autoSpawnedUnits_16[#____self_autoSpawnedUnits_16 + 1] = unit
            end
            i = i + 1
        end
    end
    self.spawnCounter = self.spawnCounter + 1
    print(((("[TrainingMode] Auto spawned " .. tostring(spawnCount)) .. " units (Total: ") .. tostring(#self.autoSpawnedUnits)) .. ")")
end
function TrainingMode.prototype.getAutoSpawnPosition(self, heroPos)
    local angle = RandomFloat(0, 2 * math.pi)
    local distance = RandomFloat(self.autoSpawnConfig.playerRadius, self.autoSpawnConfig.playerRadius + self.autoSpawnConfig.spawnRadius)
    return Vector(
        heroPos.x + math.cos(angle) * distance,
        heroPos.y + math.sin(angle) * distance,
        heroPos.z
    )
end
function TrainingMode.prototype.calculateAutoSpawnLevel(self)
    if not self.autoSpawnConfig.increaseDifficulty then
        return self.autoSpawnConfig.level
    end
    local bonusLevel = math.floor(self.spawnCounter / 10)
    return self.autoSpawnConfig.level + bonusLevel
end
function TrainingMode.prototype.cleanupDeadAutoSpawnedUnits(self)
    self.autoSpawnedUnits = __TS__ArrayFilter(
        self.autoSpawnedUnits,
        function(____, unit) return unit and not unit:IsNull() and unit:IsAlive() end
    )
end
function TrainingMode.prototype.validateAutoSpawnConfig(self)
    local config = self.autoSpawnConfig
    if not config.unitType then
        print("[TrainingMode] Auto spawn: Unit type is required")
        return false
    end
    if config.interval < 1 then
        print("[TrainingMode] Auto spawn: Interval must be at least 1 second")
        return false
    end
    if config.maxUnits < 1 or config.maxUnits > 50 then
        print("[TrainingMode] Auto spawn: Max units must be between 1 and 50")
        return false
    end
    return true
end
function TrainingMode.prototype.startAutoDummy(self, config)
    if config == nil then
        config = {}
    end
    if not self.isActive then
        print("[TrainingMode] Training mode is not active")
        return false
    end
    self:stopAutoDummy()
    self.autoDummyConfig = __TS__ObjectAssign({}, self.autoDummyConfig, config, {enabled = true})
    if #self.autoDummyConfig.positions == 0 then
        self.autoDummyConfig.positions = self:generateDummyPositions()
    end
    self:spawnAutoDummies()
    self.autoDummyTimer = Timers:CreateTimer(
        self.autoDummyConfig.respawnDelay,
        function()
            if self.autoDummyConfig.enabled and self.autoDummyConfig.autoRespawn then
                self:checkAndRespawnDummies()
                return self.autoDummyConfig.respawnDelay
            end
            return nil
        end
    )
    print(("[TrainingMode] Auto dummy started: " .. tostring(self.autoDummyConfig.count)) .. " dummies")
    self:syncStatusToNetTable()
    return true
end
function TrainingMode.prototype.stopAutoDummy(self)
    self.autoDummyConfig.enabled = false
    if self.autoDummyTimer then
        Timers:RemoveTimer(self.autoDummyTimer)
        self.autoDummyTimer = nil
    end
    self:cleanupAutoDummies()
    print("[TrainingMode] Auto dummy stopped")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.spawnAutoDummies(self)
    do
        local i = 0
        while i < self.autoDummyConfig.count and i < #self.autoDummyConfig.positions do
            local position = self.autoDummyConfig.positions[i + 1]
            local dummy = self:createTrainingDummy(position)
            if dummy then
                local ____self_autoDummies_17 = self.autoDummies
                ____self_autoDummies_17[#____self_autoDummies_17 + 1] = dummy
            end
            i = i + 1
        end
    end
end
function TrainingMode.prototype.createTrainingDummy(self, position)
    do
        local function ____catch(____error)
            print("[TrainingMode] Error creating training dummy: " .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local dummy = CreateUnitByName(
                "npc_dota_training_dummy",
                position,
                true,
                nil,
                nil,
                DOTA_TEAM_NEUTRALS
            )
            if not dummy or dummy:IsNull() then
                return true, nil
            end
            dummy:SetMaxHealth(self.autoDummyConfig.health)
            dummy:SetHealth(self.autoDummyConfig.health)
            if self.autoDummyConfig.invulnerable then
                dummy:AddNewModifier(dummy, nil, "modifier_invulnerable", {})
            end
            return true, dummy
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function TrainingMode.prototype.generateDummyPositions(self)
    local hero = self:getPlayerHero()
    if not hero then
        return {}
    end
    local heroPos = hero:GetAbsOrigin()
    local positions = {}
    local radius = 400
    do
        local i = 0
        while i < self.autoDummyConfig.count do
            local angle = i / self.autoDummyConfig.count * 2 * math.pi
            positions[#positions + 1] = Vector(
                heroPos.x + math.cos(angle) * radius,
                heroPos.y + math.sin(angle) * radius,
                heroPos.z
            )
            i = i + 1
        end
    end
    return positions
end
function TrainingMode.prototype.checkAndRespawnDummies(self)
    self.autoDummies = __TS__ArrayFilter(
        self.autoDummies,
        function(____, dummy) return dummy and not dummy:IsNull() and dummy:IsAlive() end
    )
    local missingCount = self.autoDummyConfig.count - #self.autoDummies
    if missingCount > 0 then
        do
            local i = 0
            while i < missingCount do
                local positionIndex = #self.autoDummies + i
                if positionIndex < #self.autoDummyConfig.positions then
                    local position = self.autoDummyConfig.positions[positionIndex + 1]
                    local dummy = self:createTrainingDummy(position)
                    if dummy then
                        local ____self_autoDummies_18 = self.autoDummies
                        ____self_autoDummies_18[#____self_autoDummies_18 + 1] = dummy
                    end
                end
                i = i + 1
            end
        end
        print(("[TrainingMode] Respawned " .. tostring(missingCount)) .. " training dummies")
    end
end
function TrainingMode.prototype.cleanupAutoDummies(self)
    for ____, dummy in ipairs(self.autoDummies) do
        if dummy and not dummy:IsNull() then
            dummy:RemoveSelf()
        end
    end
    self.autoDummies = {}
end
function TrainingMode.prototype.spawnNeutrals(self)
    print("[TrainingMode] Spawning neutral camps...")
    local neutralSpawners = Entities:FindAllByClassname("trigger_neutral_camp")
    local spawnedCamps = 0
    for ____, spawner in ipairs(neutralSpawners) do
        if spawner and not spawner:IsNull() then
            spawner:Trigger()
            spawnedCamps = spawnedCamps + 1
        end
    end
    print(("[TrainingMode] Spawned " .. tostring(spawnedCamps)) .. " neutral camps")
end
function TrainingMode.prototype.spawnCreeps(self)
    print("[TrainingMode] Spawning lane creeps...")
    local creepDirectors = Entities:FindAllByClassname("dota_data_dire_tower")
    GameRules:SpawnNeutralCreeps()
    print("[TrainingMode] Lane creeps spawned")
end
function TrainingMode.prototype.createHero(self, heroName, position)
    do
        local function ____catch(____error)
            print((("[TrainingMode] Error creating hero " .. heroName) .. ": ") .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local spawnPos = position or self:getRandomSpawnPosition()
            local hero = CreateUnitByName(
                heroName,
                spawnPos,
                true,
                nil,
                nil,
                DOTA_TEAM_BADGUYS
            )
            if not hero or hero:IsNull() or not hero:IsHero() then
                print("[TrainingMode] Failed to create hero: " .. heroName)
                return true, nil
            end
            hero:SetControllableByPlayer(0, false)
            print("[TrainingMode] Created hero: " .. heroName)
            return true, hero
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function TrainingMode.prototype.getDefaultAutoSpawnConfig(self)
    return {
        enabled = false,
        unitType = "npc_dota_neutral_kobold",
        count = 2,
        level = 1,
        interval = 10,
        maxUnits = 10,
        spawnRadius = 300,
        playerRadius = 500,
        increaseDifficulty = false
    }
end
function TrainingMode.prototype.getDefaultAutoDummyConfig(self)
    return {
        enabled = false,
        count = 4,
        health = 5000,
        invulnerable = false,
        positions = {},
        autoRespawn = true,
        respawnDelay = 5
    }
end
function TrainingMode.prototype.enableAutoRegeneration(self)
    if self.regenTimer then
        return
    end
    self.settings.autoRegeneration = true
    self.regenTimer = Timers:CreateTimer(
        1,
        function()
            if self.settings.autoRegeneration then
                self:performRegeneration()
                return 1
            end
            return nil
        end
    )
    print("[TrainingMode] Auto regeneration enabled")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.disableAutoRegeneration(self)
    self.settings.autoRegeneration = false
    if self.regenTimer then
        Timers:RemoveTimer(self.regenTimer)
        self.regenTimer = nil
    end
    print("[TrainingMode] Auto regeneration disabled")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.performRegeneration(self)
    local hero = self:getPlayerHero()
    if not hero or hero:IsNull() then
        return
    end
    local currentHealth = hero:GetHealth()
    local maxHealth = hero:GetMaxHealth()
    if currentHealth < maxHealth then
        hero:SetHealth(maxHealth)
    end
    local currentMana = hero:GetMana()
    local maxMana = hero:GetMaxMana()
    if currentMana < maxMana then
        hero:SetMana(maxMana)
    end
end
function TrainingMode.prototype.enableCustomCooldowns(self)
    if self.cooldownTimer then
        return
    end
    self.settings.customCooldowns = true
    self.cooldownTimer = Timers:CreateTimer(
        0.1,
        function()
            if self.settings.customCooldowns then
                self:manageCooldowns()
                return 0.1
            end
            return nil
        end
    )
    print(("[TrainingMode] Custom cooldowns enabled: " .. tostring(self.settings.cooldownSeconds)) .. "s")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.disableCustomCooldowns(self)
    self.settings.customCooldowns = false
    if self.cooldownTimer then
        Timers:RemoveTimer(self.cooldownTimer)
        self.cooldownTimer = nil
    end
    print("[TrainingMode] Custom cooldowns disabled")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.manageCooldowns(self)
    local hero = self:getPlayerHero()
    if not hero or hero:IsNull() then
        return
    end
    do
        local i = 0
        while i < 24 do
            local ability = hero:GetAbilityByIndex(i)
            if ability and not ability:IsNull() then
                local currentCooldown = ability:GetCooldownTimeRemaining()
                if currentCooldown > self.settings.cooldownSeconds then
                    ability:EndCooldown()
                    if self.settings.cooldownSeconds > 0 then
                        ability:StartCooldown(self.settings.cooldownSeconds)
                    end
                end
            end
            i = i + 1
        end
    end
    do
        local i = 0
        while i < 15 do
            local item = hero:GetItemInSlot(i)
            if item and not item:IsNull() then
                local currentCooldown = item:GetCooldownTimeRemaining()
                if currentCooldown > self.settings.cooldownSeconds then
                    item:EndCooldown()
                    if self.settings.cooldownSeconds > 0 then
                        item:StartCooldown(self.settings.cooldownSeconds)
                    end
                end
            end
            i = i + 1
        end
    end
end
function TrainingMode.prototype.setCooldownSeconds(self, seconds)
    if seconds < 0.1 then
        seconds = 0.1
    elseif seconds > 300 then
        seconds = 300
    end
    self.settings.cooldownSeconds = seconds
    print(("[TrainingMode] Cooldown time set to " .. tostring(seconds)) .. " seconds")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.toggleAutoRegeneration(self)
    if self.settings.autoRegeneration then
        self:disableAutoRegeneration()
    else
        self:enableAutoRegeneration()
    end
end
function TrainingMode.prototype.toggleCustomCooldowns(self)
    if self.settings.customCooldowns then
        self:disableCustomCooldowns()
    else
        self:enableCustomCooldowns()
    end
end
_G.training_auto_regen = function(self, enabled)
    if not GameRules.TrainingMode then
        print("[Console] Training mode not initialized")
        return
    end
    if not enabled then
        local status = GameRules.TrainingMode:getStatus()
        print("[Console] Auto regeneration: " .. (status.autoRegeneration.enabled and "ON" or "OFF"))
        return
    end
    local isEnabled = enabled == "1" or string.lower(enabled) == "on" or string.lower(enabled) == "true"
    if isEnabled then
        GameRules.TrainingMode:enableAutoRegeneration()
        print("[Console] Auto regeneration enabled")
    else
        GameRules.TrainingMode:disableAutoRegeneration()
        print("[Console] Auto regeneration disabled")
    end
end
_G.training_fast_cd = function(self, seconds)
    if not GameRules.TrainingMode then
        print("[Console] Training mode not initialized")
        return
    end
    if not seconds then
        local status = GameRules.TrainingMode:getStatus()
        print("[Console] Fast cooldowns: " .. (status.customCooldowns.enabled and "ON" or "OFF"))
        print(("[Console] Cooldown time: " .. tostring(status.customCooldowns.seconds)) .. "s")
        return
    end
    local cdSeconds = __TS__ParseFloat(seconds)
    if __TS__NumberIsNaN(__TS__Number(cdSeconds)) or cdSeconds < 0.1 then
        print("[Console] Invalid cooldown time. Use a number >= 0.1")
        return
    end
    GameRules.TrainingMode:setCooldownSeconds(cdSeconds)
    GameRules.TrainingMode:enableCustomCooldowns()
    print(("[Console] Fast cooldowns enabled: " .. tostring(cdSeconds)) .. "s")
end
_G.training_status = function(self)
    if not GameRules.TrainingMode then
        print("[Console] Training mode not initialized")
        return
    end
    local status = GameRules.TrainingMode:getStatus()
    print("[Console] === Training Mode Status ===")
    print("[Console] Active: " .. (status.isActive and "YES" or "NO"))
    print("[Console] Auto Regeneration: " .. (status.autoRegeneration.enabled and "ON" or "OFF"))
    print(((("[Console] Fast Cooldowns: " .. (status.customCooldowns.enabled and "ON" or "OFF")) .. " (") .. tostring(status.customCooldowns.seconds)) .. "s)")
    print(((("[Console] Auto Spawn: " .. (status.autoSpawn.enabled and "ON" or "OFF")) .. " (") .. tostring(status.autoSpawn.unitsCount)) .. " units)")
    print(((("[Console] Auto Dummy: " .. (status.autoDummy.enabled and "ON" or "OFF")) .. " (") .. tostring(status.autoDummy.dummiesCount)) .. " dummies)")
    print("[Console] ==============================")
end
_G.training_cd = function(self, seconds)
    if not GameRules.TrainingMode then
        print("[Console] Training mode not initialized")
        return
    end
    if not seconds then
        local status = GameRules.TrainingMode:getStatus()
        print(((("[Console] Current cooldown: " .. tostring(status.customCooldowns.seconds)) .. "s (") .. (status.customCooldowns.enabled and "ON" or "OFF")) .. ")")
        return
    end
    local cdSeconds = __TS__ParseFloat(seconds)
    if __TS__NumberIsNaN(__TS__Number(cdSeconds)) or cdSeconds < 0.1 then
        print("[Console] Invalid cooldown time. Use: training_cd 3")
        return
    end
    GameRules.TrainingMode:setCooldownSeconds(cdSeconds)
    GameRules.TrainingMode:enableCustomCooldowns()
    print(("[Console] Cooldown set to " .. tostring(cdSeconds)) .. "s")
end
_G.training_regen = function(self)
    if not GameRules.TrainingMode then
        print("[Console] Training mode not initialized")
        return
    end
    GameRules.TrainingMode:toggleAutoRegeneration()
    local status = GameRules.TrainingMode:getStatus()
    print("[Console] Auto regeneration: " .. (status.autoRegeneration.enabled and "ON" or "OFF"))
end
_G.training_practice = function(self)
    if not GameRules.TrainingMode then
        print("[Console] Training mode not initialized")
        return
    end
    GameRules.TrainingMode:enableAutoRegeneration()
    GameRules.TrainingMode:setCooldownSeconds(3)
    GameRules.TrainingMode:enableCustomCooldowns()
    print("[Console] Practice mode activated:")
    print("[Console] - Auto regeneration: ON")
    print("[Console] - Fast cooldowns: ON (3s)")
    print("[Console] Ready for training!")
end
return ____exports
