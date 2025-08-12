local ____lualib = require("lualib_bundle")
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ParseFloat = ____lualib.__TS__ParseFloat
local __TS__Number = ____lualib.__TS__Number
local __TS__NumberIsNaN = ____lualib.__TS__NumberIsNaN
local __TS__Class = ____lualib.__TS__Class
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["26"] = 1,["27"] = 1,["28"] = 3,["29"] = 3,["30"] = 8,["32"] = 8,["33"] = 9,["34"] = 9,["35"] = 11,["36"] = 12,["37"] = 13,["38"] = 13,["39"] = 13,["40"] = 14,["42"] = 9,["43"] = 8,["44"] = 18,["45"] = 18,["46"] = 20,["47"] = 21,["48"] = 22,["49"] = 22,["51"] = 23,["52"] = 23,["53"] = 23,["55"] = 23,["56"] = 23,["58"] = 23,["59"] = 23,["60"] = 23,["61"] = 23,["62"] = 23,["64"] = 24,["65"] = 24,["66"] = 24,["68"] = 24,["69"] = 24,["71"] = 24,["72"] = 24,["73"] = 24,["74"] = 24,["75"] = 24,["77"] = 25,["78"] = 25,["79"] = 25,["80"] = 25,["81"] = 25,["83"] = 26,["84"] = 26,["85"] = 26,["86"] = 26,["87"] = 26,["89"] = 27,["90"] = 27,["91"] = 27,["92"] = 27,["93"] = 27,["94"] = 27,["95"] = 27,["96"] = 27,["97"] = 27,["99"] = 28,["100"] = 28,["102"] = 29,["103"] = 29,["104"] = 29,["105"] = 29,["106"] = 29,["108"] = 30,["109"] = 31,["110"] = 31,["111"] = 31,["112"] = 31,["113"] = 31,["116"] = 18,["117"] = 8,["118"] = 35,["119"] = 35,["120"] = 37,["121"] = 37,["122"] = 38,["123"] = 39,["124"] = 40,["125"] = 41,["129"] = 46,["130"] = 47,["131"] = 48,["132"] = 49,["133"] = 50,["134"] = 51,["135"] = 52,["137"] = 55,["138"] = 56,["140"] = 35,["141"] = 8,["142"] = 60,["143"] = 60,["144"] = 62,["145"] = 63,["146"] = 64,["147"] = 60,["148"] = 8,["149"] = 67,["150"] = 67,["151"] = 69,["152"] = 70,["153"] = 71,["154"] = 67,["155"] = 8,["156"] = 74,["157"] = 74,["158"] = 76,["159"] = 76,["160"] = 77,["161"] = 78,["162"] = 79,["163"] = 80,["164"] = 80,["166"] = 74,["167"] = 8,["168"] = 83,["169"] = 83,["170"] = 85,["171"] = 85,["172"] = 86,["173"] = 87,["174"] = 88,["175"] = 89,["176"] = 89,["178"] = 83,["179"] = 8,["180"] = 92,["181"] = 92,["182"] = 94,["183"] = 94,["184"] = 95,["185"] = 95,["186"] = 95,["187"] = 95,["188"] = 95,["189"] = 96,["190"] = 97,["191"] = 98,["192"] = 99,["193"] = 100,["194"] = 100,["195"] = 100,["196"] = 100,["197"] = 100,["198"] = 100,["199"] = 100,["200"] = 101,["201"] = 102,["202"] = 103,["203"] = 104,["204"] = 105,["205"] = 106,["206"] = 107,["208"] = 109,["209"] = 110,["210"] = 111,["212"] = 102,["213"] = 92,["214"] = 8,["215"] = 116,["216"] = 116,["217"] = 118,["218"] = 119,["219"] = 120,["220"] = 121,["221"] = 122,["222"] = 122,["223"] = 122,["224"] = 122,["225"] = 122,["228"] = 124,["229"] = 124,["232"] = 116,["233"] = 8,["234"] = 128,["235"] = 128,["236"] = 130,["237"] = 131,["238"] = 132,["239"] = 133,["240"] = 134,["241"] = 134,["244"] = 136,["245"] = 136,["248"] = 128,["249"] = 8,["250"] = 140,["251"] = 140,["252"] = 142,["253"] = 142,["254"] = 143,["255"] = 144,["256"] = 145,["257"] = 146,["258"] = 146,["259"] = 146,["260"] = 146,["261"] = 146,["262"] = 146,["263"] = 146,["264"] = 146,["265"] = 146,["266"] = 152,["267"] = 152,["270"] = 154,["271"] = 154,["274"] = 140,["275"] = 8,["276"] = 158,["277"] = 158,["278"] = 160,["279"] = 161,["280"] = 162,["281"] = 162,["282"] = 162,["283"] = 162,["284"] = 162,["285"] = 162,["286"] = 162,["287"] = 169,["288"] = 169,["289"] = 169,["290"] = 169,["291"] = 169,["293"] = 158,["294"] = 8,["295"] = 172,["296"] = 172,["297"] = 174,["298"] = 175,["299"] = 176,["300"] = 177,["301"] = 177,["307"] = 186,["308"] = 187,["309"] = 187,["310"] = 187,["311"] = 187,["312"] = 187,["313"] = 187,["314"] = 187,["315"] = 187,["316"] = 187,["318"] = 194,["319"] = 194,["323"] = 183,["324"] = 184,["330"] = 172,["331"] = 8,["332"] = 198,["333"] = 198,["334"] = 200,["335"] = 200,["336"] = 201,["337"] = 202,["338"] = 203,["339"] = 204,["340"] = 205,["341"] = 205,["342"] = 205,["343"] = 205,["344"] = 205,["346"] = 207,["347"] = 208,["348"] = 208,["349"] = 208,["350"] = 208,["351"] = 208,["354"] = 211,["356"] = 198,["357"] = 8,["358"] = 215,["359"] = 215,["360"] = 217,["361"] = 218,["362"] = 219,["363"] = 220,["365"] = 222,["367"] = 215,["368"] = 8,["369"] = 226,["370"] = 226,["371"] = 228,["372"] = 228,["373"] = 229,["374"] = 231,["375"] = 232,["376"] = 235,["377"] = 236,["378"] = 238,["380"] = 241,["381"] = 242,["382"] = 242,["383"] = 242,["384"] = 242,["385"] = 242,["387"] = 244,["389"] = 226,["390"] = 8,["391"] = 248,["392"] = 248,["393"] = 250,["394"] = 250,["395"] = 251,["396"] = 252,["397"] = 254,["398"] = 255,["401"] = 259,["402"] = 260,["403"] = 261,["404"] = 261,["405"] = 261,["406"] = 261,["407"] = 261,["409"] = 263,["411"] = 248,["412"] = 8,["413"] = 267,["414"] = 267,["415"] = 269,["416"] = 269,["417"] = 270,["418"] = 271,["421"] = 275,["422"] = 276,["423"] = 277,["424"] = 278,["425"] = 279,["427"] = 281,["430"] = 284,["431"] = 285,["432"] = 285,["433"] = 285,["434"] = 285,["435"] = 285,["436"] = 286,["437"] = 286,["438"] = 286,["439"] = 286,["440"] = 286,["442"] = 267,["443"] = 8,["444"] = 290,["445"] = 290,["446"] = 292,["447"] = 292,["448"] = 293,["449"] = 294,["450"] = 295,["451"] = 295,["455"] = 299,["457"] = 300,["458"] = 310,["459"] = 301,["461"] = 302,["462"] = 303,["463"] = 303,["467"] = 305,["469"] = 306,["470"] = 307,["471"] = 307,["475"] = 309,["477"] = 310,["478"] = 311,["479"] = 311,["481"] = 312,["482"] = 312,["483"] = 312,["484"] = 312,["485"] = 312,["487"] = 313,["488"] = 314,["489"] = 314,["490"] = 314,["491"] = 314,["492"] = 314,["494"] = 315,["495"] = 315,["496"] = 315,["497"] = 315,["498"] = 315,["503"] = 318,["505"] = 319,["506"] = 320,["507"] = 320,["508"] = 320,["509"] = 320,["510"] = 320,["515"] = 323,["516"] = 323,["520"] = 290,["521"] = 8,["522"] = 327,["523"] = 327,["524"] = 329,["525"] = 329,["526"] = 330,["527"] = 331,["528"] = 331,["529"] = 332,["530"] = 332,["534"] = 336,["535"] = 337,["536"] = 338,["537"] = 340,["538"] = 341,["539"] = 341,["541"] = 342,["542"] = 342,["548"] = 371,["549"] = 371,["550"] = 371,["551"] = 371,["552"] = 371,["556"] = 347,["557"] = 348,["559"] = 350,["560"] = 350,["561"] = 351,["562"] = 351,["563"] = 351,["564"] = 351,["565"] = 351,["566"] = 357,["567"] = 357,["568"] = 357,["569"] = 357,["570"] = 357,["571"] = 357,["572"] = 357,["573"] = 357,["574"] = 358,["575"] = 360,["577"] = 361,["578"] = 361,["579"] = 362,["580"] = 361,["584"] = 365,["586"] = 350,["589"] = 369,["590"] = 369,["591"] = 369,["592"] = 369,["593"] = 369,["600"] = 327,["601"] = 8,["602"] = 375,["603"] = 375,["604"] = 377,["605"] = 377,["606"] = 378,["607"] = 379,["610"] = 383,["611"] = 384,["613"] = 386,["614"] = 392,["615"] = 387,["617"] = 388,["618"] = 389,["621"] = 392,["622"] = 393,["623"] = 394,["625"] = 396,["629"] = 399,["631"] = 400,["632"] = 401,["635"] = 403,["637"] = 404,["638"] = 405,["639"] = 406,["643"] = 409,["646"] = 375,["647"] = 8,["648"] = 413,["649"] = 413,["650"] = 415,["651"] = 416,["652"] = 416,["653"] = 417,["656"] = 421,["657"] = 422,["658"] = 422,["659"] = 422,["660"] = 422,["661"] = 422,["662"] = 422,["663"] = 422,["664"] = 422,["665"] = 422,["666"] = 422,["667"] = 422,["668"] = 434,["669"] = 435,["670"] = 436,["671"] = 437,["674"] = 441,["675"] = 441,["676"] = 441,["677"] = 441,["678"] = 441,["679"] = 413,["680"] = 8,["681"] = 444,["682"] = 444,["683"] = 446,["684"] = 447,["685"] = 447,["686"] = 448,["689"] = 452,["690"] = 453,["691"] = 454,["693"] = 456,["694"] = 457,["696"] = 444,["697"] = 8,["698"] = 461,["699"] = 461,["700"] = 463,["701"] = 464,["702"] = 464,["703"] = 465,["706"] = 469,["707"] = 470,["709"] = 473,["710"] = 473,["711"] = 474,["712"] = 475,["713"] = 476,["714"] = 477,["716"] = 473,["720"] = 482,["721"] = 482,["722"] = 483,["723"] = 484,["724"] = 485,["726"] = 482,["729"] = 489,["730"] = 461,["731"] = 8,["732"] = 492,["733"] = 492,["734"] = 494,["735"] = 494,["736"] = 495,["737"] = 495,["738"] = 496,["741"] = 500,["743"] = 501,["744"] = 501,["745"] = 502,["746"] = 501,["749"] = 505,["750"] = 505,["751"] = 505,["752"] = 505,["753"] = 505,["754"] = 492,["755"] = 8,["756"] = 508,["757"] = 508,["758"] = 510,["759"] = 510,["760"] = 511,["761"] = 511,["762"] = 512,["765"] = 516,["766"] = 517,["767"] = 519,["768"] = 520,["769"] = 521,["770"] = 522,["771"] = 522,["772"] = 522,["773"] = 522,["774"] = 522,["777"] = 508,["778"] = 8,["779"] = 527,["780"] = 527,["781"] = 529,["782"] = 529,["783"] = 530,["784"] = 531,["785"] = 532,["787"] = 534,["788"] = 555,["789"] = 535,["791"] = 537,["792"] = 538,["795"] = 540,["797"] = 542,["798"] = 543,["801"] = 545,["803"] = 546,["804"] = 547,["805"] = 548,["807"] = 550,["811"] = 553,["813"] = 555,["814"] = 556,["815"] = 556,["816"] = 556,["817"] = 556,["818"] = 556,["822"] = 527,["823"] = 8,["824"] = 561,["825"] = 561,["826"] = 563,["827"] = 563,["828"] = 564,["829"] = 565,["830"] = 566,["833"] = 570,["834"] = 570,["835"] = 571,["838"] = 575,["839"] = 576,["840"] = 577,["841"] = 579,["842"] = 580,["844"] = 582,["846"] = 561,["847"] = 8,["848"] = 586,["849"] = 586,["850"] = 588,["851"] = 588,["852"] = 589,["853"] = 591,["854"] = 591,["855"] = 592,["859"] = 596,["860"] = 597,["862"] = 599,["865"] = 601,["867"] = 603,["871"] = 586,["872"] = 8,["873"] = 608,["874"] = 608,["875"] = 610,["876"] = 610,["877"] = 611,["878"] = 613,["879"] = 613,["880"] = 614,["883"] = 618,["884"] = 619,["886"] = 621,["888"] = 608,["889"] = 8,["890"] = 8,["891"] = 627,["892"] = 628,["893"] = 627,["895"] = 629,["896"] = 630,["897"] = 634,["898"] = 655,["899"] = 657,["900"] = 658,["901"] = 659,["902"] = 660,["903"] = 661,["904"] = 662,["905"] = 665,["906"] = 666,["907"] = 669,["908"] = 670,["910"] = 674,["911"] = 675,["912"] = 676,["914"] = 679,["915"] = 680,["916"] = 683,["919"] = 694,["922"] = 687,["923"] = 688,["924"] = 688,["925"] = 688,["926"] = 689,["927"] = 690,["928"] = 688,["929"] = 688,["930"] = 688,["931"] = 692,["937"] = 698,["938"] = 698,["939"] = 698,["940"] = 699,["941"] = 700,["944"] = 709,["947"] = 702,["948"] = 703,["949"] = 703,["950"] = 703,["951"] = 704,["952"] = 705,["953"] = 703,["954"] = 703,["955"] = 703,["956"] = 707,["963"] = 712,["965"] = 716,["966"] = 717,["967"] = 718,["968"] = 719,["969"] = 720,["970"] = 721,["971"] = 723,["972"] = 698,["973"] = 698,["974"] = 727,["975"] = 730,["976"] = 730,["977"] = 730,["978"] = 731,["979"] = 732,["980"] = 732,["981"] = 732,["982"] = 732,["983"] = 732,["984"] = 732,["985"] = 732,["986"] = 732,["987"] = 733,["988"] = 734,["989"] = 735,["990"] = 737,["991"] = 730,["992"] = 730,["993"] = 740,["994"] = 743,["995"] = 744,["996"] = 744,["997"] = 744,["998"] = 745,["999"] = 746,["1000"] = 744,["1001"] = 744,["1002"] = 749,["1003"] = 749,["1004"] = 749,["1005"] = 750,["1006"] = 751,["1007"] = 749,["1008"] = 749,["1009"] = 754,["1010"] = 754,["1011"] = 754,["1012"] = 755,["1013"] = 756,["1014"] = 754,["1015"] = 754,["1016"] = 760,["1017"] = 760,["1018"] = 760,["1019"] = 761,["1020"] = 762,["1021"] = 763,["1022"] = 764,["1023"] = 765,["1025"] = 767,["1027"] = 771,["1028"] = 772,["1029"] = 773,["1030"] = 775,["1031"] = 776,["1032"] = 760,["1033"] = 760,["1034"] = 780,["1035"] = 780,["1036"] = 780,["1037"] = 781,["1038"] = 780,["1039"] = 780,["1040"] = 653,["1041"] = 641,["1042"] = 643,["1043"] = 644,["1045"] = 648,["1046"] = 649,["1048"] = 641,["1049"] = 788,["1052"] = 804,["1055"] = 790,["1056"] = 791,["1057"] = 792,["1058"] = 793,["1059"] = 794,["1060"] = 795,["1061"] = 795,["1062"] = 795,["1063"] = 795,["1065"] = 795,["1067"] = 795,["1068"] = 796,["1069"] = 796,["1070"] = 796,["1071"] = 796,["1072"] = 796,["1073"] = 796,["1074"] = 796,["1075"] = 796,["1076"] = 797,["1077"] = 800,["1078"] = 801,["1079"] = 801,["1080"] = 801,["1081"] = 801,["1088"] = 788,["1089"] = 811,["1092"] = 868,["1095"] = 815,["1096"] = 816,["1097"] = 817,["1098"] = 818,["1099"] = 819,["1100"] = 820,["1102"] = 822,["1104"] = 824,["1105"] = 815,["1106"] = 828,["1107"] = 829,["1108"] = 830,["1109"] = 831,["1110"] = 832,["1111"] = 833,["1113"] = 835,["1115"] = 837,["1116"] = 828,["1117"] = 840,["1118"] = 841,["1119"] = 842,["1120"] = 843,["1121"] = 844,["1122"] = 845,["1124"] = 847,["1126"] = 849,["1127"] = 840,["1128"] = 852,["1129"] = 853,["1130"] = 854,["1131"] = 855,["1132"] = 856,["1133"] = 857,["1134"] = 852,["1135"] = 860,["1136"] = 861,["1137"] = 862,["1138"] = 863,["1139"] = 864,["1140"] = 865,["1141"] = 866,["1147"] = 811,["1148"] = 872,["1149"] = 873,["1150"] = 874,["1152"] = 876,["1154"] = 878,["1155"] = 879,["1157"] = 881,["1159"] = 872,["1160"] = 885,["1163"] = 947,["1166"] = 887,["1167"] = 888,["1168"] = 888,["1169"] = 888,["1170"] = 888,["1171"] = 890,["1172"] = 891,["1173"] = 892,["1175"] = 895,["1176"] = 896,["1177"] = 897,["1178"] = 899,["1179"] = 902,["1180"] = 903,["1181"] = 903,["1182"] = 903,["1183"] = 903,["1185"] = 903,["1187"] = 903,["1188"] = 906,["1189"] = 907,["1190"] = 908,["1191"] = 909,["1193"] = 913,["1194"] = 914,["1195"] = 915,["1196"] = 916,["1197"] = 916,["1198"] = 916,["1199"] = 916,["1201"] = 918,["1203"] = 920,["1205"] = 924,["1206"] = 925,["1207"] = 926,["1208"] = 927,["1210"] = 931,["1211"] = 932,["1212"] = 933,["1213"] = 934,["1215"] = 938,["1216"] = 939,["1217"] = 940,["1218"] = 940,["1219"] = 940,["1220"] = 940,["1222"] = 942,["1223"] = 943,["1230"] = 886,["1233"] = 885,["1234"] = 951,["1237"] = 993,["1240"] = 953,["1241"] = 954,["1242"] = 955,["1244"] = 958,["1245"] = 961,["1246"] = 962,["1247"] = 963,["1248"] = 963,["1249"] = 963,["1250"] = 963,["1251"] = 965,["1252"] = 968,["1253"] = 968,["1254"] = 968,["1255"] = 968,["1256"] = 968,["1257"] = 968,["1258"] = 968,["1259"] = 968,["1260"] = 968,["1261"] = 965,["1263"] = 983,["1264"] = 984,["1265"] = 985,["1266"] = 985,["1267"] = 985,["1268"] = 985,["1269"] = 985,["1270"] = 985,["1271"] = 985,["1272"] = 985,["1273"] = 985,["1281"] = 952,["1284"] = 951,["1285"] = 627,["1286"] = 628});
local ____exports = {}
local ____tstl_2Dutils = require("utils.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local ____tween = require("utils.tween")
local tween = ____tween.tween
local DebugCallbacks
--- 所有的测试指令的回调
DebugCallbacks = {
    ["-help"] = {
        desc = "显示所有的测试指令",
        func = function()
            print("所有的测试指令:")
            for ____, ____value in ipairs(__TS__ObjectEntries(DebugCallbacks)) do
                local cmd = ____value[1]
                local desc = ____value[2].desc
                print((cmd .. ": ") .. desc)
            end
        end
    },
    ["-debug_status"] = {
        desc = "显示调试模式状态和系统信息",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "=== Debug Status ===")
            end
            if ____debug ~= nil then
                local ____opt_2_debugOutput_7 = ____debug.debugOutput
                local ____hero_6 = hero
                local ____opt_result_5
                if ____debug ~= nil then
                    ____opt_result_5 = ____debug.DebugEnabled
                end
                ____opt_2_debugOutput_7(
                    ____debug,
                    ____hero_6,
                    "Debug Enabled: " .. tostring(____opt_result_5 or false)
                )
            end
            if ____debug ~= nil then
                local ____opt_9_debugOutput_14 = ____debug.debugOutput
                local ____hero_13 = hero
                local ____opt_result_12
                if ____debug ~= nil then
                    ____opt_result_12 = ____debug.outputToConsole
                end
                ____opt_9_debugOutput_14(
                    ____debug,
                    ____hero_13,
                    "Console Output: " .. tostring(____opt_result_12 or false)
                )
            end
            if ____debug ~= nil then
                ____debug:debugOutput(
                    hero,
                    "Tools Mode: " .. tostring(IsInToolsMode())
                )
            end
            if ____debug ~= nil then
                ____debug:debugOutput(
                    hero,
                    "Player Count: " .. tostring(PlayerResource:GetPlayerCount())
                )
            end
            if ____debug ~= nil then
                local ____opt_20_debugOutput_24 = ____debug.debugOutput
                local ____hero_23 = hero
                local ____opt_21 = GameRules.GameModeManager
                ____opt_20_debugOutput_24(
                    ____debug,
                    ____hero_23,
                    "Game Mode: " .. (____opt_21 and ____opt_21:getCurrentMode() or "unknown")
                )
            end
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "Training Mode: " .. (GameRules.TrainingMode and "initialized" or "not initialized"))
            end
            if ____debug ~= nil then
                ____debug:debugOutput(
                    hero,
                    "Hero Valid: " .. tostring(hero and not hero:IsNull())
                )
            end
            if hero and not hero:IsNull() then
                if ____debug ~= nil then
                    ____debug:debugOutput(
                        hero,
                        "Hero Name: " .. hero:GetUnitName()
                    )
                end
            end
        end
    },
    ["-console_output"] = {
        desc = "切换控制台输出模式 console_output [on|off]",
        func = function(____, hero, ...)
            local args = {...}
            local ____debug = GameRules.DebugInstance or nil
            if not ____debug then
                if hero and not hero:IsNull() then
                    Say(hero, "Debug instance not found", true)
                end
                return
            end
            local action = args[1]
            if action == "on" then
                ____debug.outputToConsole = true
                ____debug:debugOutput(hero, "Console output enabled")
            elseif action == "off" then
                ____debug.outputToConsole = false
                Say(hero, "Console output disabled", true)
            else
                ____debug.outputToConsole = not ____debug.outputToConsole
                ____debug:debugOutput(hero, "Console output " .. (____debug.outputToConsole and "enabled" or "disabled"))
            end
        end
    },
    ["-s"] = {
        desc = "重载脚本",
        func = function()
            SendToConsole("script_reload")
            print("-r 命令script_reload!重载脚本!")
        end
    },
    ["-r"] = {
        desc = "重启游戏",
        func = function()
            SendToConsole("restart")
            print("-r 命令restart重启游戏!")
        end
    },
    get_key_v3 = {
        desc = "获取v3版本的key",
        func = function(____, hero, ...)
            local args = {...}
            local version = args[1]
            local key = GetDedicatedServerKeyV3(version)
            local ____debug = GameRules.DebugInstance or nil
            if ____debug ~= nil then
                ____debug:debugOutput(hero, (version .. ": ") .. key)
            end
        end
    },
    get_key_v2 = {
        desc = "获取v2版本的key， get_key_v2 version",
        func = function(____, hero, ...)
            local args = {...}
            local version = args[1]
            local key = GetDedicatedServerKeyV2(version)
            local ____debug = GameRules.DebugInstance or nil
            if ____debug ~= nil then
                ____debug:debugOutput(hero, (version .. ": ") .. key)
            end
        end
    },
    ["-tween"] = {
        desc = "测试Tween",
        func = function(____, hero, ...)
            local args = {...}
            FindClearSpaceForUnit(
                hero,
                hero:GetAbsOrigin(),
                true
            )
            local source = {scale = 1}
            local target = {scale = 3}
            local duration = 0.3
            local funcName = args[1]
            local myTween = tween(
                nil,
                duration,
                source,
                target,
                funcName
            )
            local now = GameRules:GetGameTime()
            Timers:CreateTimer(function()
                local dt = GameRules:GetGameTime() - now
                now = GameRules:GetGameTime()
                local finished = myTween:update(dt)
                if finished then
                    return nil
                else
                    print(source.scale)
                    hero:SetModelScale(source.scale)
                    return 0.03
                end
            end)
        end
    },
    ["-error_stats"] = {
        desc = "显示错误统计信息",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if GameRules.ErrorTracker then
                local stats = GameRules.ErrorTracker:getErrorStats()
                if ____debug ~= nil then
                    ____debug:debugOutput(
                        hero,
                        (((((("Error Stats: Total=" .. tostring(stats.totalErrors)) .. ", Recent=") .. tostring(stats.recentErrors)) .. ", Cache=") .. tostring(stats.cacheSize)) .. ", Queue=") .. tostring(stats.queueSize)
                    )
                end
            else
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Error tracker not initialized")
                end
            end
        end
    },
    ["-clear_errors"] = {
        desc = "清除错误缓存",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if GameRules.ErrorTracker then
                GameRules.ErrorTracker:clearErrorCache()
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Error cache cleared")
                end
            else
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Error tracker not initialized")
                end
            end
        end
    },
    ["-test_error"] = {
        desc = "测试错误追踪 test_error [message]",
        func = function(____, hero, ...)
            local args = {...}
            local ____debug = GameRules.DebugInstance or nil
            local message = table.concat(args, " ") or "Test error from debug command"
            if GameRules.ErrorTracker then
                local errorHash = GameRules.ErrorTracker:reportCustomError(
                    message,
                    {
                        module = "Debug",
                        ["function"] = "test_error",
                        playerId = hero:GetPlayerOwnerID(),
                        customData = {testMode = true}
                    }
                )
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Test error reported with hash: " .. errorHash)
                end
            else
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Error tracker not initialized")
                end
            end
        end
    },
    ["-system_info"] = {
        desc = "显示系统信息",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            local info = {
                gameTime = GameRules:GetGameTime(),
                isToolsMode = IsInToolsMode(),
                playerCount = PlayerResource:GetPlayerCount(),
                errorTracking = GameRules.ErrorTracker and "enabled" or "disabled",
                xNetTable = GameRules.XNetTable and "enabled" or "disabled"
            }
            if ____debug ~= nil then
                ____debug:debugOutput(
                    hero,
                    "System Info: " .. JSON:stringify(info)
                )
            end
        end
    },
    ["-trigger_crash"] = {
        desc = "触发一个崩溃测试（仅工具模式）",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if not IsInToolsMode() then
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "This command only works in tools mode")
                end
                return
            end
            do
                local function ____catch(____error)
                    if GameRules.ErrorTracker then
                        GameRules.ErrorTracker:trackError(
                            ____error,
                            {
                                module = "Debug",
                                ["function"] = "trigger_crash",
                                playerId = hero:GetPlayerOwnerID(),
                                customData = {intentional = true}
                            }
                        )
                    end
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Crash test completed, error tracked")
                    end
                end
                local ____try, ____hasReturned = pcall(function()
                    local invalidObject = nil
                    invalidObject:someMethod()
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end
    },
    ["-perf_stats"] = {
        desc = "显示性能统计信息 perf_stats [operation]",
        func = function(____, hero, ...)
            local args = {...}
            if GameRules.PerformanceMonitor then
                local operation = args[1]
                if operation then
                    local stats = GameRules.PerformanceMonitor:getStats(operation)
                    Say(
                        hero,
                        (("Performance for " .. operation) .. ": ") .. JSON:stringify(stats),
                        true
                    )
                else
                    local summary = GameRules.PerformanceMonitor:getSummary()
                    Say(
                        hero,
                        "Performance Summary: " .. JSON:stringify(summary),
                        true
                    )
                end
            else
                Say(hero, "Performance monitor not initialized", true)
            end
        end
    },
    ["-perf_clear"] = {
        desc = "清除性能指标缓存",
        func = function(____, hero)
            if GameRules.PerformanceMonitor then
                GameRules.PerformanceMonitor:clearMetrics()
                Say(hero, "Performance metrics cleared", true)
            else
                Say(hero, "Performance monitor not initialized", true)
            end
        end
    },
    ["-perf_test"] = {
        desc = "执行性能测试 perf_test [duration_ms]",
        func = function(____, hero, ...)
            local args = {...}
            local duration = __TS__ParseInt(args[1]) or 100
            if GameRules.PerformanceMonitor then
                local timerId = GameRules.PerformanceMonitor:startTimer("debug_performance_test")
                local startTime = Date:now()
                while Date:now() - startTime < duration do
                    math.random()
                end
                local actualDuration = GameRules.PerformanceMonitor:endTimer(timerId)
                Say(
                    hero,
                    ((("Performance test completed: " .. __TS__NumberToFixed(actualDuration, 2)) .. "ms (target: ") .. tostring(duration)) .. "ms)",
                    true
                )
            else
                Say(hero, "Performance monitor not initialized", true)
            end
        end
    },
    ["-set_threshold"] = {
        desc = "设置性能阈值 set_threshold <operation> <threshold_ms>",
        func = function(____, hero, ...)
            local args = {...}
            local operation = args[1]
            local threshold = __TS__ParseFloat(args[2])
            if not operation or __TS__NumberIsNaN(__TS__Number(threshold)) then
                Say(hero, "Usage: set_threshold <operation> <threshold_ms>", true)
                return
            end
            if GameRules.PerformanceMonitor then
                GameRules.PerformanceMonitor:setThreshold(operation, threshold)
                Say(
                    hero,
                    ((("Threshold set for " .. operation) .. ": ") .. tostring(threshold)) .. "ms",
                    true
                )
            else
                Say(hero, "Performance monitor not initialized", true)
            end
        end
    },
    ["-mode"] = {
        desc = "显示或切换游戏模式 mode [new_mode]",
        func = function(____, hero, ...)
            local args = {...}
            if not GameRules.GameModeManager then
                Say(hero, "Game mode manager not initialized", true)
                return
            end
            local newMode = args[1]
            if newMode then
                local success = GameRules.GameModeManager:switchMode(newMode, true)
                if success then
                    Say(hero, "Game mode switched to: " .. newMode, true)
                else
                    Say(hero, "Failed to switch to mode: " .. newMode, true)
                end
            else
                local status = GameRules.GameModeManager:getStatus()
                Say(
                    hero,
                    "Current mode: " .. tostring(status.currentMode),
                    true
                )
                Say(
                    hero,
                    "Available modes: " .. tostring(status.availableModes:join(", ")),
                    true
                )
            end
        end
    },
    ["-training"] = {
        desc = "训练模式控制 training <start|stop|status|settings>",
        func = function(____, hero, ...)
            local args = {...}
            local ____debug = GameRules.DebugInstance or nil
            if not GameRules.TrainingMode then
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Training mode not initialized")
                end
                return
            end
            local action = args[1]
            repeat
                local ____switch60 = action
                local status, settings
                local ____cond60 = ____switch60 == "start"
                if ____cond60 then
                    GameRules.TrainingMode:activate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode activated")
                    end
                    break
                end
                ____cond60 = ____cond60 or ____switch60 == "stop"
                if ____cond60 then
                    GameRules.TrainingMode:deactivate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode deactivated")
                    end
                    break
                end
                ____cond60 = ____cond60 or ____switch60 == "status"
                if ____cond60 then
                    status = GameRules.TrainingMode:getStatus()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode: " .. (status.isActive and "Active" or "Inactive"))
                    end
                    if ____debug ~= nil then
                        ____debug:debugOutput(
                            hero,
                            "Spawned units: " .. tostring(status.spawnedUnitsCount)
                        )
                    end
                    if status.activeScenario then
                        if ____debug ~= nil then
                            ____debug:debugOutput(
                                hero,
                                "Active scenario: " .. tostring(status.activeScenario.name)
                            )
                        end
                        if ____debug ~= nil then
                            ____debug:debugOutput(
                                hero,
                                ("Test duration: " .. tostring(status.testDuration:toFixed(1))) .. "s"
                            )
                        end
                    end
                    break
                end
                ____cond60 = ____cond60 or ____switch60 == "settings"
                if ____cond60 then
                    settings = GameRules.TrainingMode:getStatus().settings
                    if ____debug ~= nil then
                        ____debug:debugOutput(
                            hero,
                            "Settings: " .. JSON:stringify(settings)
                        )
                    end
                    break
                end
                do
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Usage: training <start|stop|status|settings>")
                    end
                end
            until true
        end
    },
    ["-spawn"] = {
        desc = "生成测试怪物 spawn <unit_name> [count] [level]",
        func = function(____, hero, ...)
            local args = {...}
            local ____debug = GameRules.DebugInstance or nil
            local ____opt_72 = GameRules.GameModeManager
            if not (____opt_72 and ____opt_72:isTrainingMode()) then
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "This command only works in training mode")
                end
                return
            end
            local unitName = args[1]
            local count = __TS__ParseInt(args[2]) or 1
            local level = __TS__ParseInt(args[3]) or 1
            if not unitName then
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Usage: spawn <unit_name> [count] [level]")
                end
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "Examples: spawn npc_dota_neutral_kobold 3 5")
                end
                return
            end
            do
                local function ____catch(____error)
                    if ____debug ~= nil then
                        ____debug:debugOutput(
                            hero,
                            (("Failed to spawn " .. unitName) .. ": ") .. tostring(____error)
                        )
                    end
                end
                local ____try, ____hasReturned = pcall(function()
                    local heroPos = hero:GetAbsOrigin()
                    local spawned = 0
                    do
                        local i = 0
                        while i < count do
                            local spawnPos = Vector(
                                heroPos.x + RandomFloat(-300, 300),
                                heroPos.y + RandomFloat(-300, 300),
                                heroPos.z
                            )
                            local unit = CreateUnitByName(
                                unitName,
                                spawnPos,
                                true,
                                nil,
                                nil,
                                DOTA_TEAM_BADGUYS
                            )
                            if unit and not unit:IsNull() then
                                if unit:IsHero() then
                                    do
                                        local lvl = 1
                                        while lvl < level do
                                            unit:HeroLevelUp(false)
                                            lvl = lvl + 1
                                        end
                                    end
                                end
                                spawned = spawned + 1
                            end
                            i = i + 1
                        end
                    end
                    if ____debug ~= nil then
                        ____debug:debugOutput(
                            hero,
                            (((((("Spawned " .. tostring(spawned)) .. "/") .. tostring(count)) .. " units of type ") .. unitName) .. " at level ") .. tostring(level)
                        )
                    end
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end
    },
    ["-scenario"] = {
        desc = "测试场景控制 scenario <start|stop|list> [scenario_id]",
        func = function(____, hero, ...)
            local args = {...}
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local action = args[1]
            local scenarioId = args[2]
            repeat
                local ____switch75 = action
                local success
                local ____cond75 = ____switch75 == "start"
                if ____cond75 then
                    if not scenarioId then
                        Say(hero, "Usage: scenario start <scenario_id>", true)
                        return
                    end
                    success = GameRules.TrainingMode:startTestScenario(scenarioId)
                    if success then
                        Say(hero, "Started test scenario: " .. scenarioId, true)
                    else
                        Say(hero, "Failed to start scenario: " .. scenarioId, true)
                    end
                    break
                end
                ____cond75 = ____cond75 or ____switch75 == "stop"
                if ____cond75 then
                    GameRules.TrainingMode:stopCurrentTest()
                    Say(hero, "Stopped current test scenario", true)
                    break
                end
                ____cond75 = ____cond75 or ____switch75 == "list"
                if ____cond75 then
                    Say(hero, "Available scenarios:", true)
                    Say(hero, "- basic_combat: 基础战斗测试", true)
                    Say(hero, "- damage_test: 伤害测试", true)
                    break
                end
                do
                    Say(hero, "Usage: scenario <start|stop|list> [scenario_id]", true)
                end
            until true
        end
    },
    ["-clear"] = {
        desc = "清理所有生成的单位",
        func = function(____, hero)
            local ____opt_84 = GameRules.GameModeManager
            if not (____opt_84 and ____opt_84:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local cleared = 0
            local allUnits = FindUnitsInRadius(
                DOTA_TEAM_GOODGUYS,
                Vector(0, 0, 0),
                nil,
                9999,
                DOTA_UNIT_TARGET_TEAM_ENEMY,
                DOTA_UNIT_TARGET_ALL,
                DOTA_UNIT_TARGET_FLAG_NONE,
                0,
                false
            )
            for ____, unit in ipairs(allUnits) do
                if unit and not unit:IsNull() and not unit:IsRealHero() then
                    unit:RemoveSelf()
                    cleared = cleared + 1
                end
            end
            Say(
                hero,
                ("Cleared " .. tostring(cleared)) .. " units",
                true
            )
        end
    },
    ["-god"] = {
        desc = "切换无敌模式",
        func = function(____, hero)
            local ____opt_86 = GameRules.GameModeManager
            if not (____opt_86 and ____opt_86:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            if hero:HasModifier("modifier_invulnerable") then
                hero:RemoveModifierByName("modifier_invulnerable")
                Say(hero, "God mode disabled", true)
            else
                hero:AddNewModifier(hero, nil, "modifier_invulnerable", {})
                Say(hero, "God mode enabled", true)
            end
        end
    },
    ["-refresh"] = {
        desc = "刷新英雄状态（满血满蓝，重置CD）",
        func = function(____, hero)
            local ____opt_88 = GameRules.GameModeManager
            if not (____opt_88 and ____opt_88:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            hero:SetHealth(hero:GetMaxHealth())
            hero:SetMana(hero:GetMaxMana())
            do
                local i = 0
                while i < 24 do
                    local ability = hero:GetAbilityByIndex(i)
                    if ability then
                        ability:EndCooldown()
                        ability:RefreshCharges()
                    end
                    i = i + 1
                end
            end
            do
                local i = 0
                while i < 15 do
                    local item = hero:GetItemInSlot(i)
                    if item then
                        item:EndCooldown()
                    end
                    i = i + 1
                end
            end
            Say(hero, "Hero refreshed", true)
        end
    },
    ["-lvlup"] = {
        desc = "提升英雄等级 lvlup [levels]",
        func = function(____, hero, ...)
            local args = {...}
            local ____opt_90 = GameRules.GameModeManager
            if not (____opt_90 and ____opt_90:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local levels = __TS__ParseInt(args[1]) or 1
            do
                local i = 0
                while i < levels do
                    hero:HeroLevelUp(true)
                    i = i + 1
                end
            end
            Say(
                hero,
                ((("Gained " .. tostring(levels)) .. " levels (now level ") .. tostring(hero:GetLevel())) .. ")",
                true
            )
        end
    },
    ["-gold"] = {
        desc = "给予金币 gold [amount]",
        func = function(____, hero, ...)
            local args = {...}
            local ____opt_92 = GameRules.GameModeManager
            if not (____opt_92 and ____opt_92:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local amount = __TS__ParseInt(args[1]) or 1000
            local playerId = hero:GetPlayerOwnerID()
            if PlayerResource:IsValidPlayer(playerId) then
                PlayerResource:ModifyGold(playerId, amount, true, DOTA_ModifyGold_CheatCommand)
                local ____debug = GameRules.DebugInstance or nil
                if ____debug ~= nil then
                    ____debug:debugOutput(
                        hero,
                        ("Gained " .. tostring(amount)) .. " gold"
                    )
                end
            end
        end
    },
    ["-autochess"] = {
        desc = "自走棋模式控制 autochess <activate|deactivate|start|status>",
        func = function(____, hero, ...)
            local args = {...}
            local action = args[1] or "status"
            local autoChess = GameRules.AutoChessMode
            local playerId = hero:GetPlayerOwnerID()
            repeat
                local ____switch104 = action
                local status
                local ____cond104 = ____switch104 == "activate" or ____switch104 == "start"
                if ____cond104 then
                    autoChess:activate()
                    Say(hero, "自走棋模式已激活", true)
                    break
                end
                ____cond104 = ____cond104 or (____switch104 == "deactivate" or ____switch104 == "stop")
                if ____cond104 then
                    autoChess:deactivate()
                    Say(hero, "自走棋模式已停用", true)
                    break
                end
                ____cond104 = ____cond104 or ____switch104 == "game"
                if ____cond104 then
                    if args[2] == "start" then
                        autoChess:startGame()
                        Say(hero, "自走棋游戏已开始", true)
                    else
                        Say(hero, "用法: -autochess game start", true)
                    end
                    break
                end
                ____cond104 = ____cond104 or ____switch104 == "status"
                do
                    status = autoChess:getStatus()
                    Say(
                        hero,
                        (((("自走棋状态: " .. (status.isActive and "激活" or "未激活")) .. ", 游戏进行中: ") .. (status.gameState.isGameActive and "是" or "否")) .. ", 回合: ") .. tostring(status.gameState.currentRound),
                        true
                    )
                    break
                end
            until true
        end
    },
    ["-buy"] = {
        desc = "购买棋子 buy <棋子ID>",
        func = function(____, hero, ...)
            local args = {...}
            local pieceId = args[1]
            if not pieceId then
                Say(hero, "用法: -buy <棋子ID>，例如: -buy anti_mage", true)
                return
            end
            local ____opt_96 = GameRules.GameModeManager
            if not (____opt_96 and ____opt_96:isAutoChessMode()) then
                Say(hero, "This command only works in autochess mode", true)
                return
            end
            local autoChess = GameRules.AutoChessMode
            local playerId = hero:GetPlayerOwnerID()
            local success = autoChess:buyChessPiece(playerId, pieceId)
            if success then
                Say(hero, "成功购买棋子: " .. pieceId, true)
            else
                Say(hero, ("购买失败: " .. pieceId) .. " (金币不足/库存不足/备战席已满)", true)
            end
        end
    },
    ["-shop"] = {
        desc = "商店操作 shop <refresh|show>",
        func = function(____, hero, ...)
            local args = {...}
            local action = args[1] or "show"
            local ____opt_98 = GameRules.GameModeManager
            if not (____opt_98 and ____opt_98:isAutoChessMode()) then
                Say(hero, "This command only works in autochess mode", true)
                return
            end
            repeat
                local ____switch114 = action
                local ____cond114 = ____switch114 == "refresh"
                if ____cond114 then
                    Say(hero, "商店已刷新", true)
                    break
                end
                ____cond114 = ____cond114 or ____switch114 == "show"
                do
                    Say(hero, "请查看游戏界面中的商店信息", true)
                    break
                end
            until true
        end
    },
    ["-chess_info"] = {
        desc = "查看棋子信息 chess_info [棋子ID]",
        func = function(____, hero, ...)
            local args = {...}
            local pieceId = args[1]
            local ____opt_100 = GameRules.GameModeManager
            if not (____opt_100 and ____opt_100:isAutoChessMode()) then
                Say(hero, "This command only works in autochess mode", true)
                return
            end
            if pieceId then
                Say(hero, ("棋子信息: " .. pieceId) .. " - 详细信息请查看游戏界面", true)
            else
                Say(hero, "可用棋子: anti_mage, crystal_maiden (更多棋子待添加)", true)
            end
        end
    }
}
____exports.Debug = __TS__Class()
local Debug = ____exports.Debug
Debug.name = "Debug"
function Debug.prototype.____constructor(self)
    self.DebugEnabled = false
    self.outputToConsole = true
    self.OnlineDebugWhiteList = {86815341}
    GameRules.DebugInstance = self
    print("[Debug] ==============注册注册==========================")
    print("[Debug] Debug module constructor called")
    print("[Debug] IsInToolsMode(): " .. tostring(IsInToolsMode()))
    print("[Debug] PlayerCount: " .. tostring(PlayerResource:GetPlayerCount()))
    print("[Debug] GameTime: " .. tostring(GameRules:GetGameTime()))
    print("[Debug] =================================================")
    self:_toggleDebugMode(true)
    print("[Debug] Debug mode force enabled for testing")
    if IsInToolsMode() then
        print("[Debug] Tools mode detected - enhanced debugging enabled")
    end
    local playerCount = PlayerResource:GetPlayerCount()
    if playerCount == 1 then
        print("[Debug] Single player mode detected - debug commands available")
    end
    print("[Debug] Debug enabled: " .. tostring(self.DebugEnabled))
    print("[Debug] Console output enabled: " .. tostring(self.outputToConsole))
    self:createGlobalDebugFunctions()
    do
        local function ____catch(____error)
            print("[Debug] FAILED to register chat listener immediately:", ____error)
        end
        local ____try, ____hasReturned = pcall(function()
            print("[Debug] Attempting to register chat listener immediately...")
            self._chatListener = ListenToGameEvent(
                "player_chat",
                function(keys)
                    print(("[Debug] *** CHAT EVENT RECEIVED *** Text: \"" .. keys.text) .. "\"")
                    self:OnPlayerChat(keys)
                end,
                nil
            )
            print("[Debug] Chat listener registered successfully with ID:", self._chatListener)
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
    Timers:CreateTimer(
        3,
        function()
            print("[Debug] ===== 3-second checkpoint =====")
            if not self._chatListener then
                do
                    local function ____catch(____error)
                        print("[Debug] FAILED delayed chat listener registration:", ____error)
                    end
                    local ____try, ____hasReturned = pcall(function()
                        print("[Debug] Attempting DELAYED chat listener registration...")
                        self._chatListener = ListenToGameEvent(
                            "player_chat",
                            function(keys)
                                print(("[Debug] *** DELAYED CHAT EVENT *** Text: \"" .. keys.text) .. "\"")
                                self:OnPlayerChat(keys)
                            end,
                            nil
                        )
                        print("[Debug] Delayed chat listener registered successfully")
                    end)
                    if not ____try then
                        ____catch(____hasReturned)
                    end
                end
            else
                print("[Debug] Chat listener already exists, ID:", self._chatListener)
            end
            print("[Debug] Debug instance status check:")
            print("[Debug] - DebugEnabled: " .. tostring(self.DebugEnabled))
            print("[Debug] - OutputToConsole: " .. tostring(self.outputToConsole))
            print("[Debug] - ChatListener: " .. (self._chatListener and "REGISTERED" or "MISSING"))
            print("[Debug] - Available commands: " .. tostring(#__TS__ObjectKeys(DebugCallbacks)))
            print("[Debug] ===== End 3-second checkpoint =====")
            return nil
        end
    )
    print("[Debug] Creating 10-second timer...")
    local firstTimer = Timers:CreateTimer(
        10,
        function()
            print("[Debug] ===== 10-second status check =====")
            print(("[Debug] Debug system active, commands available: " .. table.concat(
                __TS__ArraySlice(
                    __TS__ObjectKeys(DebugCallbacks),
                    0,
                    5
                ),
                ", "
            )) .. "...")
            print("[Debug] Try typing -debug_status in chat or use script_reload")
            print("[Debug] Available global functions: debug_simple_test(), debug_status(), debug_help(), debug_test()")
            print("[Debug] ===== End status check =====")
            return 10
        end
    )
    print("[Debug] Timer created with result: " .. firstTimer)
    print("[Debug] Creating test timers to verify timer system...")
    Timers:CreateTimer(
        2,
        function()
            print("[Debug] *** 2-second test timer fired! ***")
            return nil
        end
    )
    Timers:CreateTimer(
        5,
        function()
            print("[Debug] *** 5-second test timer fired! ***")
            return nil
        end
    )
    Timers:CreateTimer(
        15,
        function()
            print("[Debug] *** 15-second test timer fired! ***")
            return nil
        end
    )
    Timers:CreateTimer(
        5,
        function()
            print("[Debug] ===== Debug system startup complete =====")
            local hero = HeroList:GetHero(0)
            if hero and not hero:IsNull() then
                self:debugOutput(hero, "Debug system loaded! Try -debug_status or use console commands")
                print("[Debug] Startup message sent to hero")
            else
                print("[Debug] No hero found for startup message")
            end
            print("[Debug] ===== MANUAL STATUS CHECK (startup) =====")
            self:executeDebugStatus()
            print("[Debug] ===== END MANUAL STATUS CHECK =====")
            print("[Debug] ===== End startup =====")
            return nil
        end
    )
    CustomGameEventManager:RegisterListener(
        "frontend_error_report",
        function(_, event)
            self:OnFrontendErrorReport(event)
        end
    )
end
function Debug.prototype.debugOutput(self, hero, message)
    if hero and not hero:IsNull() then
        Say(hero, message, true)
    end
    if self.outputToConsole then
        print("[Debug Output] " .. message)
    end
end
function Debug.prototype.executeDebugStatus(self)
    do
        local function ____catch(____error)
            print("[Debug] ERROR in executeDebugStatus: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            local hero = HeroList:GetHero(0)
            print("[Debug] DebugEnabled: " .. tostring(self.DebugEnabled))
            print("[Debug] OutputToConsole: " .. tostring(self.outputToConsole))
            print("[Debug] IsInToolsMode: " .. tostring(IsInToolsMode()))
            print("[Debug] PlayerCount: " .. tostring(PlayerResource:GetPlayerCount()))
            local ____print_103 = print
            local ____hero_102
            if hero then
                ____hero_102 = hero:GetUnitName()
            else
                ____hero_102 = "null"
            end
            ____print_103("[Debug] Hero: " .. ____hero_102)
            print("[Debug] Available commands: " .. table.concat(
                __TS__ArraySlice(
                    __TS__ObjectKeys(DebugCallbacks),
                    0,
                    8
                ),
                ", "
            ))
            print("[Debug] Chat listener: " .. (self._chatListener and "registered" or "missing"))
            if hero and not hero:IsNull() then
                self:debugOutput(
                    hero,
                    (((("Debug Status: Enabled=" .. tostring(self.DebugEnabled)) .. ", Console=") .. tostring(self.outputToConsole)) .. ", Tools=") .. tostring(IsInToolsMode())
                )
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function Debug.prototype.createGlobalDebugFunctions(self)
    do
        local function ____catch(____error)
            print("[Debug] FAILED to create global debug functions:", ____error)
        end
        local ____try, ____hasReturned = pcall(function()
            _G.debug_simple_test = function()
                print("[Debug] ===== SIMPLE TEST CALLED =====")
                print("[Debug] If you see this, console commands work!")
                local hero = HeroList:GetHero(0)
                if hero and not hero:IsNull() then
                    print("[Debug] Hero found: " .. hero:GetUnitName())
                else
                    print("[Debug] No hero found")
                end
                print("[Debug] ===== END SIMPLE TEST =====")
            end
            _G.debug_status = function()
                print("[Debug] ===== Global debug_status() called =====")
                local hero = HeroList:GetHero(0)
                if DebugCallbacks["-debug_status"] then
                    DebugCallbacks["-debug_status"]:func(hero)
                    print("[Debug] debug_status command executed")
                else
                    print("[Debug] ERROR: debug_status callback not found")
                end
                print("[Debug] ===== End global debug_status =====")
            end
            _G.debug_help = function()
                print("[Debug] ===== Global debug_help() called =====")
                local hero = HeroList:GetHero(0)
                if DebugCallbacks["-help"] then
                    DebugCallbacks["-help"]:func(hero)
                    print("[Debug] help command executed")
                else
                    print("[Debug] ERROR: help callback not found")
                end
                print("[Debug] ===== End global debug_help =====")
            end
            _G.debug_test = function()
                print("[Debug] ===== Global debug_test() called =====")
                local hero = HeroList:GetHero(0)
                self:debugOutput(hero, "Global debug test works! Debug system is functional.")
                print("[Debug] debug test completed")
                print("[Debug] ===== End global debug_test =====")
            end
            print("[Debug] Global debug functions created: debug_status(), debug_help(), debug_test()")
            print("[Debug] ===================================")
            print("[Debug] DOTA2 CONSOLE USAGE INSTRUCTIONS:")
            print("[Debug] 1. Type \"script_reload\" to reload and see debug status")
            print("[Debug] 2. Chat commands like -debug_status work if GC is connected")
            print("[Debug] 3. Watch for 10-second periodic status updates")
            print("[Debug] ===================================")
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function Debug.prototype._toggleDebugMode(self, on)
    if on == nil then
        self.DebugEnabled = not self.DebugEnabled
    else
        self.DebugEnabled = on
    end
    if self.DebugEnabled then
        print("Debug mode enabled!")
    else
        print("Debug mode disabled!")
    end
end
function Debug.prototype.OnPlayerChat(self, keys)
    do
        local function ____catch(____error)
            print("[Debug] Error in OnPlayerChat: " .. tostring(____error))
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            print(("[Debug] OnPlayerChat called with text: \"" .. keys.text) .. "\"")
            print(
                "[Debug] Keys object:",
                JSON:stringify(keys)
            )
            if not keys.text then
                print("[Debug] No text in chat message")
                return true
            end
            local strs = __TS__StringSplit(keys.text, " ")
            local cmd = strs[1]
            local args = __TS__ArraySlice(strs, 1)
            print(((("[Debug] Parsed - Command: \"" .. cmd) .. "\", Args: [") .. table.concat(args, ", ")) .. "]")
            local hero = HeroList:GetHero(0)
            local ____print_105 = print
            local ____hero_104
            if hero then
                ____hero_104 = hero:GetUnitName()
            else
                ____hero_104 = "null"
            end
            ____print_105("[Debug] Hero found: " .. ____hero_104)
            if cmd == "-test" then
                print("[Debug] Test command received!")
                self:debugOutput(hero, "Test command works!")
                return true
            end
            if cmd == "-debug_status" then
                print("[Debug] Executing -debug_status command")
                if DebugCallbacks[cmd] then
                    DebugCallbacks[cmd]:func(
                        hero,
                        unpack(args)
                    )
                else
                    print("[Debug] -debug_status callback not found")
                end
                return true
            end
            if cmd == "-debug_enable" then
                self:_toggleDebugMode(true)
                self:debugOutput(hero, "Debug mode enabled!")
                return true
            end
            if not self.DebugEnabled then
                print("[Debug] Debug mode not enabled")
                self:debugOutput(hero, "Debug disabled. Use -debug_enable or -test. Command was: " .. cmd)
                return true
            end
            if DebugCallbacks[cmd] then
                print("[Debug] Executing command: " .. cmd)
                DebugCallbacks[cmd]:func(
                    hero,
                    unpack(args)
                )
            else
                print("[Debug] Unknown command: " .. cmd)
                self:debugOutput(hero, "Unknown command: " .. cmd)
            end
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function Debug.prototype.OnFrontendErrorReport(self, event)
    do
        local function ____catch(____error)
            print("[Debug] Failed to process frontend error report: " .. tostring(____error))
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local report = event
            if not report.errors or not __TS__ArrayIsArray(report.errors) then
                return true
            end
            print(("[Debug] Received " .. tostring(report.errors.length)) .. " frontend error(s)")
            if GameRules.ErrorTracker then
                for ____, frontendError in __TS__Iterator(report.errors) do
                    local serverError = __TS__New(
                        Error,
                        "[Frontend] " .. tostring(frontendError.message)
                    )
                    GameRules.ErrorTracker:trackError(serverError, {module = "Frontend", ["function"] = frontendError.filename or "unknown", customData = {
                        frontend = true,
                        filename = frontendError.filename,
                        lineno = frontendError.lineno,
                        colno = frontendError.colno,
                        stack = frontendError.stack,
                        userAgent = frontendError.userAgent,
                        url = frontendError.url,
                        clientTimestamp = frontendError.timestamp,
                        clientGameTime = frontendError.gameTime
                    }})
                end
                if GameRules.XNetTable then
                    local currentStats = GameRules.ErrorTracker:getErrorStats()
                    GameRules.XNetTable:SetTableValue(
                        "error_reports",
                        "stats",
                        __TS__ObjectAssign(
                            {},
                            currentStats,
                            {lastUpdate = Date:now()}
                        )
                    )
                end
            end
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
Debug = __TS__DecorateLegacy({reloadable}, Debug)
____exports.Debug = Debug
return ____exports
