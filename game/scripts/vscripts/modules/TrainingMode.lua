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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 6,["17"] = 6,["18"] = 66,["19"] = 66,["20"] = 66,["22"] = 69,["23"] = 70,["24"] = 71,["25"] = 72,["26"] = 77,["27"] = 78,["28"] = 79,["29"] = 80,["30"] = 81,["31"] = 84,["32"] = 85,["33"] = 88,["34"] = 89,["35"] = 90,["36"] = 91,["37"] = 92,["38"] = 87,["39"] = 95,["40"] = 96,["41"] = 97,["43"] = 99,["44"] = 95,["45"] = 105,["46"] = 106,["47"] = 107,["50"] = 111,["51"] = 112,["52"] = 113,["55"] = 117,["56"] = 118,["57"] = 119,["58"] = 121,["59"] = 124,["60"] = 105,["61"] = 130,["62"] = 131,["65"] = 135,["66"] = 136,["67"] = 137,["68"] = 138,["69"] = 139,["70"] = 140,["71"] = 141,["72"] = 143,["73"] = 146,["74"] = 130,["75"] = 152,["76"] = 153,["77"] = 154,["78"] = 155,["79"] = 156,["81"] = 160,["82"] = 162,["83"] = 163,["84"] = 166,["85"] = 167,["87"] = 171,["88"] = 173,["89"] = 176,["90"] = 181,["91"] = 152,["92"] = 187,["93"] = 188,["96"] = 192,["97"] = 193,["98"] = 196,["99"] = 199,["100"] = 201,["101"] = 204,["102"] = 210,["103"] = 211,["104"] = 187,["105"] = 217,["106"] = 218,["107"] = 219,["109"] = 221,["110"] = 221,["111"] = 222,["112"] = 222,["113"] = 222,["114"] = 222,["115"] = 222,["116"] = 228,["117"] = 233,["118"] = 234,["119"] = 234,["121"] = 221,["125"] = 239,["126"] = 217,["127"] = 245,["128"] = 245,["129"] = 245,["133"] = 280,["134"] = 281,["137"] = 247,["138"] = 247,["139"] = 247,["140"] = 247,["141"] = 247,["142"] = 247,["143"] = 247,["144"] = 247,["145"] = 256,["146"] = 257,["147"] = 258,["149"] = 262,["150"] = 263,["152"] = 264,["153"] = 264,["154"] = 265,["155"] = 264,["160"] = 271,["161"] = 272,["163"] = 276,["164"] = 278,["170"] = 246,["173"] = 245,["174"] = 288,["177"] = 317,["180"] = 290,["181"] = 291,["182"] = 292,["184"] = 295,["185"] = 296,["187"] = 299,["188"] = 300,["189"] = 301,["191"] = 304,["192"] = 305,["194"] = 308,["195"] = 309,["197"] = 312,["198"] = 313,["205"] = 288,["206"] = 324,["207"] = 325,["208"] = 326,["209"] = 327,["212"] = 330,["213"] = 324,["214"] = 336,["215"] = 337,["216"] = 338,["217"] = 339,["218"] = 340,["219"] = 340,["220"] = 340,["221"] = 340,["222"] = 340,["224"] = 348,["225"] = 336,["226"] = 354,["227"] = 355,["228"] = 356,["229"] = 357,["231"] = 359,["232"] = 354,["233"] = 365,["234"] = 367,["235"] = 368,["237"] = 371,["238"] = 372,["240"] = 375,["241"] = 376,["243"] = 380,["244"] = 381,["246"] = 385,["247"] = 386,["249"] = 390,["250"] = 391,["252"] = 365,["253"] = 398,["254"] = 400,["256"] = 401,["257"] = 401,["258"] = 402,["259"] = 403,["261"] = 401,["264"] = 398,["265"] = 411,["266"] = 413,["267"] = 414,["268"] = 415,["270"] = 411,["271"] = 422,["272"] = 422,["273"] = 429,["274"] = 430,["275"] = 431,["278"] = 433,["279"] = 434,["280"] = 434,["281"] = 434,["282"] = 434,["283"] = 434,["284"] = 434,["285"] = 441,["286"] = 442,["287"] = 442,["288"] = 442,["289"] = 442,["290"] = 442,["291"] = 442,["292"] = 442,["293"] = 442,["294"] = 451,["295"] = 452,["296"] = 452,["299"] = 429,["300"] = 460,["301"] = 461,["302"] = 462,["304"] = 460,["305"] = 471,["306"] = 472,["307"] = 471,["308"] = 478,["309"] = 479,["310"] = 479,["311"] = 479,["312"] = 479,["313"] = 479,["314"] = 480,["315"] = 480,["316"] = 480,["317"] = 480,["318"] = 480,["319"] = 478,["320"] = 486,["321"] = 486,["322"] = 494,["323"] = 495,["324"] = 497,["325"] = 498,["327"] = 494,["328"] = 505,["329"] = 507,["330"] = 508,["331"] = 509,["333"] = 513,["334"] = 514,["336"] = 518,["337"] = 518,["338"] = 518,["339"] = 518,["340"] = 518,["341"] = 518,["342"] = 518,["343"] = 505,["344"] = 527,["345"] = 528,["348"] = 530,["349"] = 531,["350"] = 533,["351"] = 536,["352"] = 543,["353"] = 544,["355"] = 547,["356"] = 548,["357"] = 527,["358"] = 554,["359"] = 555,["360"] = 556,["361"] = 557,["362"] = 559,["363"] = 561,["364"] = 561,["365"] = 561,["366"] = 562,["367"] = 563,["368"] = 561,["369"] = 561,["372"] = 554,["373"] = 572,["374"] = 573,["375"] = 576,["376"] = 576,["377"] = 576,["378"] = 577,["379"] = 578,["380"] = 580,["381"] = 581,["382"] = 583,["383"] = 584,["384"] = 585,["386"] = 587,["387"] = 588,["388"] = 588,["389"] = 588,["390"] = 588,["392"] = 588,["394"] = 588,["396"] = 590,["397"] = 576,["398"] = 576,["399"] = 594,["400"] = 594,["401"] = 594,["402"] = 595,["403"] = 596,["404"] = 597,["405"] = 598,["406"] = 594,["407"] = 594,["408"] = 572,["409"] = 605,["410"] = 606,["411"] = 607,["413"] = 608,["414"] = 609,["415"] = 610,["416"] = 611,["417"] = 612,["418"] = 612,["419"] = 612,["421"] = 612,["425"] = 607,["426"] = 607,["427"] = 607,["428"] = 607,["429"] = 607,["430"] = 607,["431"] = 607,["432"] = 607,["433"] = 607,["434"] = 607,["437"] = 605,["438"] = 621,["439"] = 622,["440"] = 622,["441"] = 622,["442"] = 622,["443"] = 622,["444"] = 622,["445"] = 622,["446"] = 622,["447"] = 622,["448"] = 622,["449"] = 622,["450"] = 622,["451"] = 621,["452"] = 639,["453"] = 641,["454"] = 642,["455"] = 642,["456"] = 642,["457"] = 642,["458"] = 642,["459"] = 641,["460"] = 679,["461"] = 639,["462"] = 685,["463"] = 686,["464"] = 688,["465"] = 689,["467"] = 692,["468"] = 685,["469"] = 698,["470"] = 700,["471"] = 701,["472"] = 702,["473"] = 703,["474"] = 704,["475"] = 704,["476"] = 704,["478"] = 704,["480"] = 699,["481"] = 699,["482"] = 699,["483"] = 699,["484"] = 699,["485"] = 699,["486"] = 699,["487"] = 699,["488"] = 699,["489"] = 699,["490"] = 699,["491"] = 698,["492"] = 730,["493"] = 730,["494"] = 730,["496"] = 731,["497"] = 732,["498"] = 733,["500"] = 737,["501"] = 740,["502"] = 743,["503"] = 744,["505"] = 748,["506"] = 751,["507"] = 751,["508"] = 751,["509"] = 752,["510"] = 753,["511"] = 754,["513"] = 756,["514"] = 751,["515"] = 751,["516"] = 759,["517"] = 760,["518"] = 761,["519"] = 730,["520"] = 767,["521"] = 768,["522"] = 770,["523"] = 771,["524"] = 772,["526"] = 775,["527"] = 776,["528"] = 767,["529"] = 782,["530"] = 784,["531"] = 786,["534"] = 790,["535"] = 791,["538"] = 795,["539"] = 796,["541"] = 801,["542"] = 801,["543"] = 802,["544"] = 803,["545"] = 805,["546"] = 806,["547"] = 807,["548"] = 807,["550"] = 801,["553"] = 811,["554"] = 812,["555"] = 782,["556"] = 818,["557"] = 819,["558"] = 820,["559"] = 825,["560"] = 825,["561"] = 825,["562"] = 825,["563"] = 825,["564"] = 818,["565"] = 835,["566"] = 836,["567"] = 837,["569"] = 841,["570"] = 842,["571"] = 835,["572"] = 848,["573"] = 849,["574"] = 849,["575"] = 849,["576"] = 849,["577"] = 848,["578"] = 857,["579"] = 858,["580"] = 860,["581"] = 861,["582"] = 862,["584"] = 865,["585"] = 866,["586"] = 867,["588"] = 870,["589"] = 871,["590"] = 872,["592"] = 875,["593"] = 857,["594"] = 881,["595"] = 881,["596"] = 881,["598"] = 882,["599"] = 883,["600"] = 884,["602"] = 888,["603"] = 891,["604"] = 894,["605"] = 895,["607"] = 899,["608"] = 902,["609"] = 902,["610"] = 902,["611"] = 903,["612"] = 904,["613"] = 905,["615"] = 907,["616"] = 902,["617"] = 902,["618"] = 910,["619"] = 911,["620"] = 912,["621"] = 881,["622"] = 918,["623"] = 919,["624"] = 921,["625"] = 922,["626"] = 923,["628"] = 927,["629"] = 929,["630"] = 930,["631"] = 918,["632"] = 936,["634"] = 937,["635"] = 937,["636"] = 938,["637"] = 939,["638"] = 940,["639"] = 941,["640"] = 941,["642"] = 937,["645"] = 936,["646"] = 949,["649"] = 975,["650"] = 976,["653"] = 951,["654"] = 951,["655"] = 951,["656"] = 951,["657"] = 951,["658"] = 951,["659"] = 951,["660"] = 951,["661"] = 960,["662"] = 961,["664"] = 965,["665"] = 966,["666"] = 969,["667"] = 970,["669"] = 973,["675"] = 950,["678"] = 949,["679"] = 983,["680"] = 984,["681"] = 985,["682"] = 986,["684"] = 989,["685"] = 990,["686"] = 991,["688"] = 994,["689"] = 994,["690"] = 995,["691"] = 996,["692"] = 996,["693"] = 996,["694"] = 996,["695"] = 996,["696"] = 994,["699"] = 1003,["700"] = 983,["701"] = 1009,["702"] = 1011,["703"] = 1011,["704"] = 1011,["705"] = 1011,["706"] = 1016,["707"] = 1017,["709"] = 1018,["710"] = 1018,["711"] = 1019,["712"] = 1020,["713"] = 1021,["714"] = 1022,["715"] = 1023,["716"] = 1024,["717"] = 1024,["720"] = 1018,["723"] = 1028,["725"] = 1009,["726"] = 1035,["727"] = 1036,["728"] = 1037,["729"] = 1038,["732"] = 1041,["733"] = 1035,["734"] = 1047,["735"] = 1048,["736"] = 1051,["737"] = 1052,["738"] = 1054,["739"] = 1055,["740"] = 1057,["741"] = 1058,["744"] = 1062,["745"] = 1047,["746"] = 1068,["747"] = 1069,["748"] = 1072,["749"] = 1075,["750"] = 1077,["751"] = 1068,["752"] = 1083,["755"] = 1107,["756"] = 1108,["759"] = 1085,["760"] = 1087,["761"] = 1087,["762"] = 1087,["763"] = 1087,["764"] = 1087,["765"] = 1087,["766"] = 1087,["767"] = 1087,["768"] = 1096,["769"] = 1097,["770"] = 1098,["772"] = 1102,["773"] = 1104,["774"] = 1105,["780"] = 1084,["783"] = 1083,["784"] = 1115,["785"] = 1116,["786"] = 1116,["787"] = 1116,["788"] = 1116,["789"] = 1116,["790"] = 1116,["791"] = 1116,["792"] = 1116,["793"] = 1116,["794"] = 1116,["795"] = 1116,["796"] = 1115,["797"] = 1132,["798"] = 1133,["799"] = 1133,["800"] = 1133,["801"] = 1133,["802"] = 1133,["803"] = 1133,["804"] = 1133,["805"] = 1133,["806"] = 1133,["807"] = 1132,["808"] = 1147,["809"] = 1148,["812"] = 1152,["813"] = 1155,["814"] = 1155,["815"] = 1155,["816"] = 1156,["817"] = 1157,["818"] = 1158,["820"] = 1160,["821"] = 1155,["822"] = 1155,["823"] = 1163,["824"] = 1164,["825"] = 1147,["826"] = 1170,["827"] = 1171,["828"] = 1173,["829"] = 1174,["830"] = 1175,["832"] = 1178,["833"] = 1179,["834"] = 1170,["835"] = 1185,["836"] = 1186,["837"] = 1187,["840"] = 1192,["841"] = 1193,["842"] = 1194,["843"] = 1195,["845"] = 1199,["846"] = 1200,["847"] = 1201,["848"] = 1202,["850"] = 1185,["851"] = 1209,["852"] = 1210,["855"] = 1214,["856"] = 1217,["857"] = 1217,["858"] = 1217,["859"] = 1218,["860"] = 1219,["861"] = 1220,["863"] = 1222,["864"] = 1217,["865"] = 1217,["866"] = 1225,["867"] = 1226,["868"] = 1209,["869"] = 1232,["870"] = 1233,["871"] = 1235,["872"] = 1236,["873"] = 1237,["875"] = 1240,["876"] = 1241,["877"] = 1232,["878"] = 1247,["879"] = 1248,["880"] = 1249,["884"] = 1254,["885"] = 1254,["886"] = 1255,["887"] = 1256,["888"] = 1257,["889"] = 1260,["890"] = 1262,["891"] = 1263,["892"] = 1265,["896"] = 1254,["900"] = 1272,["901"] = 1272,["902"] = 1273,["903"] = 1274,["904"] = 1275,["905"] = 1278,["906"] = 1280,["907"] = 1281,["908"] = 1282,["912"] = 1272,["915"] = 1247,["916"] = 1292,["917"] = 1293,["918"] = 1294,["919"] = 1295,["920"] = 1296,["922"] = 1299,["923"] = 1300,["924"] = 1301,["925"] = 1292,["926"] = 1307,["927"] = 1308,["928"] = 1309,["930"] = 1311,["932"] = 1307,["933"] = 1318,["934"] = 1319,["935"] = 1320,["937"] = 1322,["939"] = 1318,["940"] = 1341,["941"] = 1342,["942"] = 1343,["945"] = 1347,["946"] = 1349,["947"] = 1350,["950"] = 1354,["951"] = 1356,["952"] = 1357,["953"] = 1358,["955"] = 1360,["956"] = 1361,["958"] = 1341,["959"] = 1369,["960"] = 1370,["961"] = 1371,["964"] = 1375,["965"] = 1377,["966"] = 1378,["967"] = 1379,["970"] = 1383,["971"] = 1384,["972"] = 1385,["975"] = 1389,["976"] = 1390,["977"] = 1391,["978"] = 1369,["979"] = 1398,["980"] = 1399,["981"] = 1400,["984"] = 1404,["985"] = 1405,["986"] = 1406,["987"] = 1407,["988"] = 1408,["989"] = 1409,["990"] = 1410,["991"] = 1411,["992"] = 1398,["993"] = 1418,["994"] = 1419,["995"] = 1420,["998"] = 1424,["999"] = 1425,["1000"] = 1426,["1003"] = 1430,["1004"] = 1431,["1005"] = 1432,["1008"] = 1436,["1009"] = 1437,["1010"] = 1438,["1011"] = 1418,["1012"] = 1445,["1013"] = 1446,["1014"] = 1447,["1017"] = 1451,["1018"] = 1452,["1019"] = 1453,["1020"] = 1445,["1021"] = 1460,["1022"] = 1461,["1023"] = 1462,["1026"] = 1467,["1027"] = 1468,["1028"] = 1469,["1029"] = 1471,["1030"] = 1472,["1031"] = 1473,["1032"] = 1474,["1033"] = 1460});
local ____exports = {}
local ____GameModeManager = require("modules.GameModeManager")
local GameModeManager = ____GameModeManager.GameModeManager
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
                timestamp = Date:now()
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
