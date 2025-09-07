local ____lualib = require("lualib_bundle")
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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["25"] = 1,["26"] = 1,["27"] = 3,["28"] = 3,["29"] = 8,["31"] = 8,["32"] = 9,["33"] = 9,["34"] = 11,["35"] = 12,["36"] = 13,["37"] = 14,["38"] = 15,["40"] = 9,["41"] = 8,["42"] = 19,["43"] = 19,["44"] = 21,["45"] = 22,["46"] = 23,["47"] = 23,["49"] = 24,["50"] = 24,["51"] = 24,["53"] = 24,["54"] = 24,["56"] = 24,["57"] = 24,["58"] = 24,["59"] = 24,["60"] = 24,["62"] = 25,["63"] = 25,["64"] = 25,["66"] = 25,["67"] = 25,["69"] = 25,["70"] = 25,["71"] = 25,["72"] = 25,["73"] = 25,["75"] = 26,["76"] = 26,["77"] = 26,["78"] = 26,["79"] = 26,["81"] = 27,["82"] = 27,["83"] = 27,["84"] = 27,["85"] = 27,["87"] = 28,["88"] = 28,["89"] = 28,["90"] = 28,["91"] = 28,["92"] = 28,["93"] = 28,["94"] = 28,["95"] = 28,["97"] = 29,["98"] = 29,["100"] = 30,["101"] = 30,["102"] = 30,["103"] = 30,["104"] = 30,["106"] = 31,["107"] = 32,["108"] = 32,["109"] = 32,["110"] = 32,["111"] = 32,["114"] = 19,["115"] = 8,["116"] = 36,["117"] = 36,["118"] = 38,["119"] = 38,["120"] = 39,["121"] = 40,["122"] = 41,["123"] = 42,["127"] = 47,["128"] = 48,["129"] = 49,["130"] = 50,["131"] = 51,["132"] = 52,["133"] = 53,["135"] = 56,["136"] = 57,["138"] = 36,["139"] = 8,["140"] = 61,["141"] = 61,["142"] = 63,["143"] = 64,["144"] = 65,["145"] = 61,["146"] = 8,["147"] = 68,["148"] = 68,["149"] = 70,["150"] = 71,["151"] = 72,["152"] = 68,["153"] = 8,["154"] = 75,["155"] = 75,["156"] = 77,["157"] = 77,["158"] = 78,["159"] = 79,["160"] = 80,["161"] = 81,["162"] = 81,["164"] = 75,["165"] = 8,["166"] = 84,["167"] = 84,["168"] = 86,["169"] = 86,["170"] = 87,["171"] = 88,["172"] = 89,["173"] = 90,["174"] = 90,["176"] = 84,["177"] = 8,["178"] = 93,["179"] = 93,["180"] = 95,["181"] = 95,["182"] = 96,["183"] = 96,["184"] = 96,["185"] = 96,["186"] = 96,["187"] = 97,["188"] = 98,["189"] = 99,["190"] = 100,["191"] = 101,["192"] = 101,["193"] = 101,["194"] = 101,["195"] = 101,["196"] = 101,["197"] = 101,["198"] = 102,["199"] = 103,["200"] = 104,["201"] = 105,["202"] = 106,["203"] = 107,["204"] = 108,["206"] = 110,["207"] = 111,["208"] = 112,["210"] = 103,["211"] = 93,["212"] = 8,["213"] = 117,["214"] = 117,["215"] = 119,["216"] = 120,["217"] = 121,["218"] = 122,["219"] = 123,["220"] = 123,["221"] = 123,["222"] = 123,["223"] = 123,["226"] = 125,["227"] = 125,["230"] = 117,["231"] = 8,["232"] = 129,["233"] = 129,["234"] = 131,["235"] = 132,["236"] = 133,["237"] = 134,["238"] = 135,["239"] = 135,["242"] = 137,["243"] = 137,["246"] = 129,["247"] = 8,["248"] = 141,["249"] = 141,["250"] = 143,["251"] = 143,["252"] = 144,["253"] = 145,["254"] = 148,["255"] = 150,["256"] = 151,["257"] = 151,["258"] = 151,["259"] = 151,["260"] = 151,["261"] = 152,["262"] = 152,["264"] = 153,["265"] = 154,["266"] = 155,["267"] = 155,["268"] = 155,["269"] = 155,["270"] = 155,["271"] = 156,["272"] = 156,["274"] = 157,["276"] = 159,["277"] = 159,["279"] = 160,["282"] = 141,["283"] = 8,["284"] = 165,["285"] = 165,["286"] = 167,["287"] = 167,["288"] = 168,["289"] = 169,["290"] = 171,["291"] = 171,["293"] = 172,["294"] = 175,["295"] = 175,["296"] = 175,["297"] = 176,["298"] = 177,["299"] = 175,["300"] = 175,["301"] = 165,["302"] = 8,["303"] = 181,["304"] = 181,["305"] = 183,["306"] = 183,["307"] = 184,["308"] = 185,["309"] = 186,["310"] = 187,["311"] = 187,["312"] = 187,["313"] = 187,["314"] = 187,["315"] = 187,["316"] = 187,["317"] = 187,["318"] = 187,["319"] = 193,["320"] = 193,["323"] = 195,["324"] = 195,["327"] = 181,["328"] = 8,["329"] = 199,["330"] = 199,["331"] = 201,["332"] = 202,["333"] = 203,["334"] = 203,["335"] = 203,["336"] = 203,["337"] = 203,["338"] = 203,["339"] = 203,["340"] = 210,["341"] = 210,["342"] = 210,["343"] = 210,["344"] = 210,["346"] = 199,["347"] = 8,["348"] = 213,["349"] = 213,["350"] = 215,["351"] = 216,["352"] = 217,["353"] = 218,["354"] = 218,["360"] = 227,["361"] = 228,["362"] = 228,["363"] = 228,["364"] = 228,["365"] = 228,["366"] = 228,["367"] = 228,["368"] = 228,["369"] = 228,["371"] = 235,["372"] = 235,["376"] = 224,["377"] = 225,["383"] = 213,["384"] = 8,["385"] = 239,["386"] = 239,["387"] = 241,["388"] = 241,["389"] = 242,["390"] = 243,["391"] = 244,["392"] = 245,["393"] = 246,["394"] = 246,["395"] = 246,["396"] = 246,["397"] = 246,["399"] = 248,["400"] = 249,["401"] = 249,["402"] = 249,["403"] = 249,["404"] = 249,["407"] = 252,["409"] = 239,["410"] = 8,["411"] = 256,["412"] = 256,["413"] = 258,["414"] = 259,["415"] = 260,["416"] = 261,["418"] = 263,["420"] = 256,["421"] = 8,["422"] = 267,["423"] = 267,["424"] = 269,["425"] = 269,["426"] = 270,["427"] = 272,["428"] = 273,["429"] = 276,["430"] = 277,["431"] = 279,["433"] = 282,["434"] = 283,["435"] = 283,["436"] = 283,["437"] = 283,["438"] = 283,["440"] = 285,["442"] = 267,["443"] = 8,["444"] = 289,["445"] = 289,["446"] = 291,["447"] = 291,["448"] = 292,["449"] = 293,["450"] = 295,["451"] = 296,["454"] = 300,["455"] = 301,["456"] = 302,["457"] = 302,["458"] = 302,["459"] = 302,["460"] = 302,["462"] = 304,["464"] = 289,["465"] = 8,["466"] = 308,["467"] = 308,["468"] = 310,["469"] = 310,["470"] = 311,["471"] = 312,["474"] = 316,["475"] = 317,["476"] = 318,["477"] = 319,["478"] = 320,["480"] = 322,["483"] = 325,["484"] = 326,["485"] = 326,["486"] = 326,["487"] = 326,["488"] = 326,["489"] = 327,["490"] = 327,["491"] = 327,["492"] = 327,["493"] = 327,["495"] = 308,["496"] = 8,["497"] = 331,["498"] = 331,["499"] = 333,["500"] = 333,["501"] = 334,["502"] = 335,["503"] = 336,["504"] = 336,["508"] = 340,["510"] = 341,["511"] = 351,["512"] = 342,["514"] = 343,["515"] = 344,["516"] = 344,["520"] = 346,["522"] = 347,["523"] = 348,["524"] = 348,["528"] = 350,["530"] = 351,["531"] = 352,["532"] = 352,["534"] = 353,["535"] = 353,["536"] = 353,["537"] = 353,["538"] = 353,["540"] = 354,["541"] = 355,["542"] = 355,["543"] = 355,["544"] = 355,["545"] = 355,["547"] = 356,["548"] = 356,["549"] = 356,["550"] = 356,["551"] = 356,["556"] = 359,["558"] = 360,["559"] = 361,["560"] = 361,["561"] = 361,["562"] = 361,["563"] = 361,["568"] = 364,["569"] = 364,["573"] = 331,["574"] = 8,["575"] = 368,["576"] = 368,["577"] = 370,["578"] = 370,["579"] = 371,["580"] = 372,["581"] = 372,["582"] = 373,["583"] = 373,["587"] = 377,["588"] = 378,["589"] = 379,["590"] = 381,["591"] = 382,["592"] = 382,["594"] = 383,["595"] = 383,["601"] = 412,["602"] = 412,["603"] = 412,["604"] = 412,["605"] = 412,["609"] = 388,["610"] = 389,["612"] = 391,["613"] = 391,["614"] = 392,["615"] = 392,["616"] = 392,["617"] = 392,["618"] = 392,["619"] = 398,["620"] = 398,["621"] = 398,["622"] = 398,["623"] = 398,["624"] = 398,["625"] = 398,["626"] = 398,["627"] = 399,["628"] = 401,["630"] = 402,["631"] = 402,["632"] = 403,["633"] = 402,["637"] = 406,["639"] = 391,["642"] = 410,["643"] = 410,["644"] = 410,["645"] = 410,["646"] = 410,["653"] = 368,["654"] = 8,["655"] = 416,["656"] = 416,["657"] = 418,["658"] = 418,["659"] = 419,["660"] = 420,["663"] = 424,["664"] = 425,["666"] = 427,["667"] = 433,["668"] = 428,["670"] = 429,["671"] = 430,["674"] = 433,["675"] = 434,["676"] = 435,["678"] = 437,["682"] = 440,["684"] = 441,["685"] = 442,["688"] = 444,["690"] = 445,["691"] = 446,["692"] = 447,["696"] = 450,["699"] = 416,["700"] = 8,["701"] = 454,["702"] = 454,["703"] = 456,["704"] = 457,["705"] = 457,["706"] = 458,["709"] = 462,["710"] = 463,["711"] = 463,["712"] = 463,["713"] = 463,["714"] = 463,["715"] = 463,["716"] = 463,["717"] = 463,["718"] = 463,["719"] = 463,["720"] = 463,["721"] = 475,["722"] = 476,["723"] = 477,["724"] = 478,["727"] = 482,["728"] = 482,["729"] = 482,["730"] = 482,["731"] = 482,["732"] = 454,["733"] = 8,["734"] = 485,["735"] = 485,["736"] = 487,["737"] = 487,["738"] = 488,["739"] = 489,["742"] = 493,["743"] = 493,["744"] = 494,["747"] = 498,["749"] = 499,["750"] = 501,["751"] = 500,["753"] = 501,["754"] = 502,["755"] = 503,["756"] = 504,["757"] = 506,["758"] = 513,["759"] = 514,["760"] = 514,["761"] = 514,["762"] = 514,["763"] = 514,["765"] = 516,["769"] = 520,["771"] = 521,["772"] = 522,["775"] = 525,["777"] = 526,["778"] = 527,["779"] = 528,["780"] = 529,["781"] = 529,["782"] = 529,["783"] = 529,["784"] = 529,["785"] = 530,["786"] = 530,["787"] = 530,["788"] = 530,["789"] = 530,["790"] = 531,["791"] = 531,["792"] = 531,["793"] = 531,["794"] = 531,["799"] = 536,["800"] = 537,["803"] = 485,["804"] = 8,["805"] = 541,["806"] = 541,["807"] = 543,["808"] = 543,["809"] = 544,["810"] = 545,["813"] = 549,["814"] = 549,["815"] = 550,["818"] = 554,["820"] = 555,["821"] = 557,["822"] = 556,["824"] = 557,["825"] = 558,["826"] = 559,["827"] = 561,["828"] = 567,["829"] = 568,["830"] = 568,["831"] = 568,["832"] = 568,["833"] = 568,["834"] = 569,["835"] = 570,["838"] = 573,["842"] = 577,["844"] = 578,["845"] = 579,["848"] = 582,["850"] = 583,["851"] = 584,["852"] = 585,["853"] = 586,["854"] = 586,["855"] = 586,["856"] = 586,["857"] = 586,["858"] = 587,["859"] = 587,["860"] = 587,["861"] = 587,["862"] = 587,["863"] = 588,["864"] = 588,["865"] = 588,["866"] = 588,["867"] = 588,["872"] = 593,["873"] = 594,["876"] = 541,["877"] = 8,["878"] = 598,["879"] = 598,["880"] = 600,["881"] = 601,["882"] = 601,["883"] = 602,["886"] = 606,["887"] = 607,["888"] = 608,["890"] = 610,["892"] = 598,["893"] = 8,["894"] = 614,["895"] = 614,["896"] = 616,["897"] = 617,["898"] = 617,["899"] = 618,["902"] = 622,["903"] = 623,["904"] = 624,["906"] = 626,["908"] = 614,["909"] = 8,["910"] = 630,["911"] = 630,["912"] = 632,["913"] = 632,["914"] = 633,["915"] = 633,["916"] = 634,["919"] = 638,["920"] = 639,["921"] = 640,["922"] = 641,["925"] = 645,["926"] = 646,["927"] = 647,["928"] = 648,["930"] = 650,["933"] = 653,["935"] = 630,["936"] = 8,["937"] = 657,["938"] = 657,["939"] = 659,["940"] = 659,["941"] = 660,["942"] = 661,["945"] = 665,["946"] = 665,["947"] = 666,["950"] = 670,["952"] = 671,["953"] = 684,["954"] = 672,["956"] = 673,["957"] = 674,["960"] = 677,["962"] = 678,["963"] = 679,["966"] = 682,["968"] = 683,["969"] = 684,["970"] = 685,["973"] = 688,["975"] = 689,["976"] = 690,["977"] = 691,["981"] = 695,["982"] = 696,["985"] = 657,["986"] = 8,["987"] = 700,["988"] = 700,["989"] = 702,["990"] = 702,["991"] = 703,["992"] = 704,["995"] = 708,["996"] = 708,["997"] = 709,["1000"] = 713,["1001"] = 714,["1003"] = 716,["1004"] = 722,["1005"] = 717,["1007"] = 718,["1008"] = 719,["1010"] = 721,["1011"] = 722,["1012"] = 723,["1013"] = 723,["1014"] = 723,["1015"] = 723,["1016"] = 723,["1019"] = 726,["1021"] = 727,["1022"] = 728,["1025"] = 731,["1027"] = 732,["1028"] = 733,["1029"] = 734,["1030"] = 735,["1031"] = 736,["1032"] = 736,["1033"] = 736,["1034"] = 736,["1035"] = 736,["1039"] = 740,["1041"] = 741,["1042"] = 742,["1043"] = 743,["1044"] = 744,["1045"] = 744,["1046"] = 744,["1047"] = 744,["1048"] = 744,["1052"] = 748,["1053"] = 749,["1054"] = 750,["1057"] = 700,["1058"] = 8,["1059"] = 754,["1060"] = 754,["1061"] = 756,["1062"] = 756,["1063"] = 757,["1064"] = 758,["1067"] = 762,["1068"] = 762,["1069"] = 763,["1072"] = 767,["1073"] = 768,["1074"] = 769,["1075"] = 770,["1076"] = 770,["1077"] = 770,["1078"] = 770,["1079"] = 770,["1080"] = 771,["1083"] = 775,["1084"] = 776,["1085"] = 777,["1086"] = 777,["1087"] = 777,["1088"] = 777,["1089"] = 777,["1090"] = 754,["1091"] = 8,["1092"] = 780,["1093"] = 780,["1094"] = 782,["1095"] = 783,["1096"] = 784,["1099"] = 788,["1100"] = 788,["1101"] = 789,["1104"] = 793,["1105"] = 794,["1106"] = 795,["1107"] = 780,["1108"] = 8,["1109"] = 798,["1110"] = 798,["1111"] = 800,["1112"] = 801,["1113"] = 802,["1116"] = 806,["1117"] = 806,["1118"] = 807,["1121"] = 812,["1122"] = 813,["1123"] = 814,["1124"] = 816,["1125"] = 817,["1126"] = 818,["1127"] = 819,["1128"] = 798,["1129"] = 8,["1130"] = 822,["1131"] = 822,["1132"] = 824,["1133"] = 825,["1134"] = 825,["1135"] = 826,["1138"] = 830,["1139"] = 831,["1140"] = 832,["1142"] = 834,["1143"] = 835,["1145"] = 822,["1146"] = 8,["1147"] = 839,["1148"] = 839,["1149"] = 841,["1150"] = 842,["1151"] = 842,["1152"] = 843,["1155"] = 847,["1156"] = 848,["1158"] = 851,["1159"] = 851,["1160"] = 852,["1161"] = 853,["1162"] = 854,["1163"] = 855,["1165"] = 851,["1169"] = 860,["1170"] = 860,["1171"] = 861,["1172"] = 862,["1173"] = 863,["1175"] = 860,["1178"] = 867,["1179"] = 839,["1180"] = 8,["1181"] = 870,["1182"] = 870,["1183"] = 872,["1184"] = 872,["1185"] = 873,["1186"] = 873,["1187"] = 874,["1190"] = 878,["1192"] = 879,["1193"] = 879,["1194"] = 880,["1195"] = 879,["1198"] = 883,["1199"] = 883,["1200"] = 883,["1201"] = 883,["1202"] = 883,["1203"] = 870,["1204"] = 8,["1205"] = 886,["1206"] = 886,["1207"] = 888,["1208"] = 888,["1209"] = 889,["1210"] = 889,["1211"] = 890,["1214"] = 894,["1215"] = 895,["1216"] = 897,["1217"] = 898,["1218"] = 899,["1219"] = 900,["1220"] = 900,["1221"] = 900,["1222"] = 900,["1223"] = 900,["1226"] = 886,["1227"] = 8,["1228"] = 905,["1229"] = 905,["1230"] = 907,["1231"] = 907,["1232"] = 908,["1233"] = 909,["1234"] = 910,["1236"] = 912,["1237"] = 933,["1238"] = 913,["1240"] = 915,["1241"] = 916,["1244"] = 918,["1246"] = 920,["1247"] = 921,["1250"] = 923,["1252"] = 924,["1253"] = 925,["1254"] = 926,["1256"] = 928,["1260"] = 931,["1262"] = 933,["1263"] = 934,["1264"] = 934,["1265"] = 934,["1266"] = 934,["1267"] = 934,["1271"] = 905,["1272"] = 8,["1273"] = 939,["1274"] = 939,["1275"] = 941,["1276"] = 941,["1277"] = 942,["1278"] = 943,["1279"] = 944,["1282"] = 948,["1283"] = 948,["1284"] = 949,["1287"] = 953,["1288"] = 954,["1289"] = 955,["1290"] = 957,["1291"] = 958,["1293"] = 960,["1295"] = 939,["1296"] = 8,["1297"] = 964,["1298"] = 964,["1299"] = 966,["1300"] = 966,["1301"] = 967,["1302"] = 969,["1303"] = 969,["1304"] = 970,["1308"] = 974,["1309"] = 975,["1311"] = 977,["1314"] = 979,["1316"] = 981,["1320"] = 964,["1321"] = 8,["1322"] = 986,["1323"] = 986,["1324"] = 988,["1325"] = 988,["1326"] = 989,["1327"] = 991,["1328"] = 991,["1329"] = 992,["1332"] = 996,["1333"] = 997,["1335"] = 999,["1337"] = 986,["1338"] = 8,["1339"] = 8,["1340"] = 1005,["1341"] = 1006,["1342"] = 1005,["1344"] = 1007,["1345"] = 1008,["1346"] = 1012,["1347"] = 1033,["1348"] = 1035,["1349"] = 1036,["1350"] = 1037,["1351"] = 1038,["1352"] = 1039,["1353"] = 1040,["1354"] = 1043,["1355"] = 1044,["1356"] = 1047,["1357"] = 1048,["1359"] = 1052,["1360"] = 1053,["1361"] = 1054,["1363"] = 1057,["1364"] = 1058,["1365"] = 1061,["1368"] = 1072,["1371"] = 1065,["1372"] = 1066,["1373"] = 1066,["1374"] = 1066,["1375"] = 1067,["1376"] = 1068,["1377"] = 1066,["1378"] = 1066,["1379"] = 1066,["1380"] = 1070,["1386"] = 1076,["1387"] = 1076,["1388"] = 1076,["1389"] = 1077,["1390"] = 1078,["1393"] = 1087,["1396"] = 1080,["1397"] = 1081,["1398"] = 1081,["1399"] = 1081,["1400"] = 1082,["1401"] = 1083,["1402"] = 1081,["1403"] = 1081,["1404"] = 1081,["1405"] = 1085,["1412"] = 1090,["1414"] = 1094,["1415"] = 1095,["1416"] = 1096,["1417"] = 1097,["1418"] = 1098,["1419"] = 1099,["1420"] = 1101,["1421"] = 1076,["1422"] = 1076,["1423"] = 1105,["1424"] = 1108,["1425"] = 1108,["1426"] = 1108,["1427"] = 1109,["1428"] = 1110,["1429"] = 1110,["1430"] = 1110,["1431"] = 1110,["1432"] = 1110,["1433"] = 1110,["1434"] = 1110,["1435"] = 1110,["1436"] = 1111,["1437"] = 1112,["1438"] = 1113,["1439"] = 1115,["1440"] = 1108,["1441"] = 1108,["1442"] = 1118,["1443"] = 1121,["1444"] = 1122,["1445"] = 1122,["1446"] = 1122,["1447"] = 1123,["1448"] = 1124,["1449"] = 1122,["1450"] = 1122,["1451"] = 1127,["1452"] = 1127,["1453"] = 1127,["1454"] = 1128,["1455"] = 1129,["1456"] = 1127,["1457"] = 1127,["1458"] = 1132,["1459"] = 1132,["1460"] = 1132,["1461"] = 1133,["1462"] = 1134,["1463"] = 1132,["1464"] = 1132,["1465"] = 1138,["1466"] = 1138,["1467"] = 1138,["1468"] = 1139,["1469"] = 1140,["1470"] = 1141,["1471"] = 1142,["1472"] = 1143,["1474"] = 1145,["1476"] = 1149,["1477"] = 1150,["1478"] = 1151,["1479"] = 1153,["1480"] = 1154,["1481"] = 1138,["1482"] = 1138,["1483"] = 1158,["1484"] = 1158,["1485"] = 1158,["1486"] = 1159,["1487"] = 1158,["1488"] = 1158,["1489"] = 1031,["1490"] = 1019,["1491"] = 1021,["1492"] = 1022,["1494"] = 1026,["1495"] = 1027,["1497"] = 1019,["1498"] = 1166,["1501"] = 1182,["1504"] = 1168,["1505"] = 1169,["1506"] = 1170,["1507"] = 1171,["1508"] = 1172,["1509"] = 1173,["1510"] = 1173,["1511"] = 1173,["1512"] = 1173,["1514"] = 1173,["1516"] = 1173,["1517"] = 1174,["1518"] = 1174,["1519"] = 1174,["1520"] = 1174,["1521"] = 1174,["1522"] = 1174,["1523"] = 1174,["1524"] = 1174,["1525"] = 1175,["1526"] = 1178,["1527"] = 1179,["1528"] = 1179,["1529"] = 1179,["1530"] = 1179,["1537"] = 1166,["1538"] = 1189,["1541"] = 1246,["1544"] = 1193,["1545"] = 1194,["1546"] = 1195,["1547"] = 1196,["1548"] = 1197,["1549"] = 1198,["1551"] = 1200,["1553"] = 1202,["1554"] = 1193,["1555"] = 1206,["1556"] = 1207,["1557"] = 1208,["1558"] = 1209,["1559"] = 1210,["1560"] = 1211,["1562"] = 1213,["1564"] = 1215,["1565"] = 1206,["1566"] = 1218,["1567"] = 1219,["1568"] = 1220,["1569"] = 1221,["1570"] = 1222,["1571"] = 1223,["1573"] = 1225,["1575"] = 1227,["1576"] = 1218,["1577"] = 1230,["1578"] = 1231,["1579"] = 1232,["1580"] = 1233,["1581"] = 1234,["1582"] = 1235,["1583"] = 1230,["1584"] = 1238,["1585"] = 1239,["1586"] = 1240,["1587"] = 1241,["1588"] = 1242,["1589"] = 1243,["1590"] = 1244,["1596"] = 1189,["1597"] = 1250,["1598"] = 1251,["1599"] = 1252,["1601"] = 1254,["1603"] = 1256,["1604"] = 1257,["1606"] = 1259,["1608"] = 1250,["1609"] = 1263,["1612"] = 1325,["1615"] = 1265,["1616"] = 1266,["1617"] = 1266,["1618"] = 1266,["1619"] = 1266,["1620"] = 1268,["1621"] = 1269,["1622"] = 1270,["1624"] = 1273,["1625"] = 1274,["1626"] = 1275,["1627"] = 1277,["1628"] = 1280,["1629"] = 1281,["1630"] = 1281,["1631"] = 1281,["1632"] = 1281,["1634"] = 1281,["1636"] = 1281,["1637"] = 1284,["1638"] = 1285,["1639"] = 1286,["1640"] = 1287,["1642"] = 1291,["1643"] = 1292,["1644"] = 1293,["1645"] = 1294,["1646"] = 1294,["1647"] = 1294,["1648"] = 1294,["1650"] = 1296,["1652"] = 1298,["1654"] = 1302,["1655"] = 1303,["1656"] = 1304,["1657"] = 1305,["1659"] = 1309,["1660"] = 1310,["1661"] = 1311,["1662"] = 1312,["1664"] = 1316,["1665"] = 1317,["1666"] = 1318,["1667"] = 1318,["1668"] = 1318,["1669"] = 1318,["1671"] = 1320,["1672"] = 1321,["1679"] = 1264,["1682"] = 1263,["1683"] = 1329,["1686"] = 1371,["1689"] = 1331,["1690"] = 1332,["1691"] = 1333,["1693"] = 1336,["1694"] = 1339,["1695"] = 1340,["1696"] = 1341,["1697"] = 1341,["1698"] = 1341,["1699"] = 1341,["1700"] = 1343,["1701"] = 1346,["1702"] = 1346,["1703"] = 1346,["1704"] = 1346,["1705"] = 1346,["1706"] = 1346,["1707"] = 1346,["1708"] = 1346,["1709"] = 1346,["1710"] = 1343,["1712"] = 1361,["1713"] = 1362,["1714"] = 1363,["1715"] = 1363,["1716"] = 1363,["1717"] = 1363,["1718"] = 1363,["1719"] = 1363,["1720"] = 1363,["1721"] = 1363,["1722"] = 1363,["1730"] = 1330,["1733"] = 1329,["1734"] = 1005,["1735"] = 1006});
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
            for cmd in pairs(DebugCallbacks) do
                local desc = DebugCallbacks[cmd].desc
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
    ["-server"] = {
        desc = "显示/隐藏服务器选择界面 -server [show|hide]",
        func = function(____, hero, ...)
            local args = {...}
            local ____debug = GameRules.DebugInstance or nil
            local action = args[1] or "show"
            local playerId = hero:GetPlayerID()
            if action == "show" then
                CustomNetTables:SetTableValue(
                    "server_selection",
                    tostring(playerId),
                    {show = true}
                )
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "简单服务器选择器已显示")
                end
                Say(hero, "假服务器选择界面已显示", false)
            elseif action == "hide" then
                CustomNetTables:SetTableValue(
                    "server_selection",
                    tostring(playerId),
                    {show = false}
                )
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "简单服务器选择器已隐藏")
                end
                Say(hero, "假服务器选择界面已隐藏", false)
            else
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "用法: -server [show|hide]")
                end
                Say(hero, "用法: -server show 或 -server hide", true)
                return
            end
        end
    },
    ["-fake_connect"] = {
        desc = "模拟假连接到指定服务器 -fake_connect [server_name]",
        func = function(____, hero, ...)
            local args = {...}
            local ____debug = GameRules.DebugInstance or nil
            local serverName = args[1] or "默认服务器"
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "模拟连接到: " .. serverName)
            end
            Say(hero, "假装连接到服务器: " .. serverName, false)
            Timers:CreateTimer(
                1,
                function()
                    Say(hero, "连接成功！欢迎来到 " .. serverName, false)
                    return nil
                end
            )
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
                local ____switch66 = action
                local status, settings
                local ____cond66 = ____switch66 == "start"
                if ____cond66 then
                    GameRules.TrainingMode:activate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode activated")
                    end
                    break
                end
                ____cond66 = ____cond66 or ____switch66 == "stop"
                if ____cond66 then
                    GameRules.TrainingMode:deactivate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode deactivated")
                    end
                    break
                end
                ____cond66 = ____cond66 or ____switch66 == "status"
                if ____cond66 then
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
                ____cond66 = ____cond66 or ____switch66 == "settings"
                if ____cond66 then
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
            local ____opt_80 = GameRules.GameModeManager
            if not (____opt_80 and ____opt_80:isTrainingMode()) then
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
                local ____switch81 = action
                local success
                local ____cond81 = ____switch81 == "start"
                if ____cond81 then
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
                ____cond81 = ____cond81 or ____switch81 == "stop"
                if ____cond81 then
                    GameRules.TrainingMode:stopCurrentTest()
                    Say(hero, "Stopped current test scenario", true)
                    break
                end
                ____cond81 = ____cond81 or ____switch81 == "list"
                if ____cond81 then
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
            local ____opt_92 = GameRules.GameModeManager
            if not (____opt_92 and ____opt_92:isTrainingMode()) then
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
    ["-auto_spawn"] = {
        desc = "自动刷怪控制 auto_spawn <start|stop|status> [unit_type] [count] [level] [interval]",
        func = function(____, hero, ...)
            local args = {...}
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local ____opt_94 = GameRules.GameModeManager
            if not (____opt_94 and ____opt_94:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            repeat
                local ____switch93 = action
                local unitType, count, level, interval, success, status
                local ____cond93 = ____switch93 == "start"
                if ____cond93 then
                    unitType = args[2] or "npc_dota_neutral_kobold"
                    count = __TS__ParseInt(args[3]) or 2
                    level = __TS__ParseInt(args[4]) or 1
                    interval = __TS__ParseInt(args[5]) or 10
                    success = GameRules.TrainingMode:startAutoSpawn({unitType = unitType, count = count, level = level, interval = interval})
                    if success then
                        Say(
                            hero,
                            ((((((("Auto spawn started: " .. unitType) .. " x") .. tostring(count)) .. " level ") .. tostring(level)) .. " every ") .. tostring(interval)) .. "s",
                            true
                        )
                    else
                        Say(hero, "Failed to start auto spawn", true)
                    end
                    break
                end
                ____cond93 = ____cond93 or ____switch93 == "stop"
                if ____cond93 then
                    GameRules.TrainingMode:stopAutoSpawn()
                    Say(hero, "Auto spawn stopped", true)
                    break
                end
                ____cond93 = ____cond93 or ____switch93 == "status"
                if ____cond93 then
                    status = GameRules.TrainingMode:getStatus()
                    Say(hero, "Auto spawn: " .. (status.autoSpawn.enabled and "Enabled" or "Disabled"), true)
                    if status.autoSpawn.enabled then
                        Say(
                            hero,
                            "Active units: " .. tostring(status.autoSpawn.unitsCount),
                            true
                        )
                        Say(
                            hero,
                            "Unit type: " .. tostring(status.autoSpawn.config.unitType),
                            true
                        )
                        Say(
                            hero,
                            ("Interval: " .. tostring(status.autoSpawn.config.interval)) .. "s",
                            true
                        )
                    end
                    break
                end
                do
                    Say(hero, "Usage: auto_spawn <start|stop|status> [unit_type] [count] [level] [interval]", true)
                    Say(hero, "Example: auto_spawn start npc_dota_neutral_kobold 3 5 15", true)
                end
            until true
        end
    },
    ["-auto_dummy"] = {
        desc = "自动木桩控制 auto_dummy <start|stop|status> [count] [health] [invulnerable]",
        func = function(____, hero, ...)
            local args = {...}
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local ____opt_96 = GameRules.GameModeManager
            if not (____opt_96 and ____opt_96:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            repeat
                local ____switch100 = action
                local count, health, invulnerable, success, status
                local ____cond100 = ____switch100 == "start"
                if ____cond100 then
                    count = __TS__ParseInt(args[2]) or 4
                    health = __TS__ParseInt(args[3]) or 5000
                    invulnerable = args[4] == "true" or args[4] == "1"
                    success = GameRules.TrainingMode:startAutoDummy({count = count, health = health, invulnerable = invulnerable})
                    if success then
                        Say(
                            hero,
                            ((("Auto dummy started: " .. tostring(count)) .. " dummies with ") .. tostring(health)) .. " HP",
                            true
                        )
                        if invulnerable then
                            Say(hero, "Dummies are invulnerable", true)
                        end
                    else
                        Say(hero, "Failed to start auto dummy", true)
                    end
                    break
                end
                ____cond100 = ____cond100 or ____switch100 == "stop"
                if ____cond100 then
                    GameRules.TrainingMode:stopAutoDummy()
                    Say(hero, "Auto dummy stopped", true)
                    break
                end
                ____cond100 = ____cond100 or ____switch100 == "status"
                if ____cond100 then
                    status = GameRules.TrainingMode:getStatus()
                    Say(hero, "Auto dummy: " .. (status.autoDummy.enabled and "Enabled" or "Disabled"), true)
                    if status.autoDummy.enabled then
                        Say(
                            hero,
                            "Active dummies: " .. tostring(status.autoDummy.dummiesCount),
                            true
                        )
                        Say(
                            hero,
                            "Health: " .. tostring(status.autoDummy.config.health),
                            true
                        )
                        Say(
                            hero,
                            "Invulnerable: " .. tostring(status.autoDummy.config.invulnerable),
                            true
                        )
                    end
                    break
                end
                do
                    Say(hero, "Usage: auto_dummy <start|stop|status> [count] [health] [invulnerable]", true)
                    Say(hero, "Example: auto_dummy start 6 10000 true", true)
                end
            until true
        end
    },
    ["-spawnneutrals"] = {
        desc = "刷新所有中性野怪营地",
        func = function(____, hero)
            local ____opt_98 = GameRules.GameModeManager
            if not (____opt_98 and ____opt_98:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            if GameRules.TrainingMode then
                GameRules.TrainingMode:spawnNeutrals()
                Say(hero, "Neutral camps spawned", true)
            else
                Say(hero, "Training mode not initialized", true)
            end
        end
    },
    ["-spawncreeps"] = {
        desc = "刷新三路小兵",
        func = function(____, hero)
            local ____opt_100 = GameRules.GameModeManager
            if not (____opt_100 and ____opt_100:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            if GameRules.TrainingMode then
                GameRules.TrainingMode:spawnCreeps()
                Say(hero, "Lane creeps spawned", true)
            else
                Say(hero, "Training mode not initialized", true)
            end
        end
    },
    ["-createhero"] = {
        desc = "创建英雄 createhero <hero_name>",
        func = function(____, hero, ...)
            local args = {...}
            local ____opt_102 = GameRules.GameModeManager
            if not (____opt_102 and ____opt_102:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local heroName = args[1]
            if not heroName then
                Say(hero, "Usage: createhero <hero_name>", true)
                Say(hero, "Example: createhero npc_dota_hero_pudge", true)
                return
            end
            if GameRules.TrainingMode then
                local createdHero = GameRules.TrainingMode:createHero(heroName)
                if createdHero then
                    Say(hero, "Created hero: " .. heroName, true)
                else
                    Say(hero, "Failed to create hero: " .. heroName, true)
                end
            else
                Say(hero, "Training mode not initialized", true)
            end
        end
    },
    ["-auto_regen"] = {
        desc = "自动回血回蓝控制 auto_regen <on|off|toggle|status>",
        func = function(____, hero, ...)
            local args = {...}
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local ____opt_104 = GameRules.GameModeManager
            if not (____opt_104 and ____opt_104:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            repeat
                local ____switch123 = action
                local toggleStatus, status
                local ____cond123 = ____switch123 == "on"
                if ____cond123 then
                    GameRules.TrainingMode:enableAutoRegeneration()
                    Say(hero, "Auto regeneration enabled", true)
                    break
                end
                ____cond123 = ____cond123 or ____switch123 == "off"
                if ____cond123 then
                    GameRules.TrainingMode:disableAutoRegeneration()
                    Say(hero, "Auto regeneration disabled", true)
                    break
                end
                ____cond123 = ____cond123 or ____switch123 == "toggle"
                if ____cond123 then
                    GameRules.TrainingMode:toggleAutoRegeneration()
                    toggleStatus = GameRules.TrainingMode:getStatus()
                    Say(hero, "Auto regeneration: " .. (toggleStatus.autoRegeneration.enabled and "ON" or "OFF"), true)
                    break
                end
                ____cond123 = ____cond123 or ____switch123 == "status"
                if ____cond123 then
                    status = GameRules.TrainingMode:getStatus()
                    Say(hero, "Auto regeneration: " .. (status.autoRegeneration.enabled and "Enabled" or "Disabled"), true)
                    Say(hero, "Active: " .. (status.autoRegeneration.active and "YES" or "NO"), true)
                    break
                end
                do
                    Say(hero, "Usage: auto_regen <on|off|toggle|status>", true)
                    Say(hero, "Automatically restores hero HP and MP to full", true)
                end
            until true
        end
    },
    ["-fast_cd"] = {
        desc = "快速技能CD控制 fast_cd <on|off|toggle|status> [seconds]",
        func = function(____, hero, ...)
            local args = {...}
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local ____opt_106 = GameRules.GameModeManager
            if not (____opt_106 and ____opt_106:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            local seconds = __TS__ParseFloat(args[2])
            repeat
                local ____switch127 = action
                local onStatus, toggleStatus, status
                local ____cond127 = ____switch127 == "on"
                if ____cond127 then
                    if seconds and seconds > 0 then
                        GameRules.TrainingMode:setCooldownSeconds(seconds)
                    end
                    GameRules.TrainingMode:enableCustomCooldowns()
                    onStatus = GameRules.TrainingMode:getStatus()
                    Say(
                        hero,
                        ("Fast cooldowns enabled: " .. tostring(onStatus.customCooldowns.seconds)) .. "s",
                        true
                    )
                    break
                end
                ____cond127 = ____cond127 or ____switch127 == "off"
                if ____cond127 then
                    GameRules.TrainingMode:disableCustomCooldowns()
                    Say(hero, "Fast cooldowns disabled", true)
                    break
                end
                ____cond127 = ____cond127 or ____switch127 == "toggle"
                if ____cond127 then
                    GameRules.TrainingMode:toggleCustomCooldowns()
                    toggleStatus = GameRules.TrainingMode:getStatus()
                    Say(hero, "Fast cooldowns: " .. (toggleStatus.customCooldowns.enabled and "ON" or "OFF"), true)
                    if toggleStatus.customCooldowns.enabled then
                        Say(
                            hero,
                            ("Cooldown time: " .. tostring(toggleStatus.customCooldowns.seconds)) .. "s",
                            true
                        )
                    end
                    break
                end
                ____cond127 = ____cond127 or ____switch127 == "status"
                if ____cond127 then
                    status = GameRules.TrainingMode:getStatus()
                    Say(hero, "Fast cooldowns: " .. (status.customCooldowns.enabled and "Enabled" or "Disabled"), true)
                    Say(hero, "Active: " .. (status.customCooldowns.active and "YES" or "NO"), true)
                    Say(
                        hero,
                        ("Cooldown time: " .. tostring(status.customCooldowns.seconds)) .. "s",
                        true
                    )
                    break
                end
                do
                    Say(hero, "Usage: fast_cd <on|off|toggle|status> [seconds]", true)
                    Say(hero, "Example: fast_cd on 3  (sets all cooldowns to 3 seconds)", true)
                    Say(hero, "Example: fast_cd toggle  (toggles fast cooldowns)", true)
                end
            until true
        end
    },
    ["-cd"] = {
        desc = "快速设置CD时间 cd <seconds>",
        func = function(____, hero, ...)
            local args = {...}
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local ____opt_108 = GameRules.GameModeManager
            if not (____opt_108 and ____opt_108:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local seconds = __TS__ParseFloat(args[1])
            if not args[1] or __TS__NumberIsNaN(__TS__Number(seconds)) or seconds < 0.1 then
                local status = GameRules.TrainingMode:getStatus()
                Say(
                    hero,
                    ((("Current CD: " .. tostring(status.customCooldowns.seconds)) .. "s (") .. (status.customCooldowns.enabled and "ON" or "OFF")) .. ")",
                    true
                )
                Say(hero, "Usage: cd <seconds>  Example: cd 3", true)
                return
            end
            GameRules.TrainingMode:setCooldownSeconds(seconds)
            GameRules.TrainingMode:enableCustomCooldowns()
            Say(
                hero,
                ("Cooldown set to " .. tostring(seconds)) .. "s",
                true
            )
        end
    },
    ["-regen"] = {
        desc = "切换自动回血回蓝",
        func = function(____, hero)
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local ____opt_110 = GameRules.GameModeManager
            if not (____opt_110 and ____opt_110:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            GameRules.TrainingMode:toggleAutoRegeneration()
            local status = GameRules.TrainingMode:getStatus()
            Say(hero, "Auto regeneration: " .. (status.autoRegeneration.enabled and "ON" or "OFF"), true)
        end
    },
    ["-练功"] = {
        desc = "一键开启练功模式",
        func = function(____, hero)
            if not GameRules.TrainingMode then
                Say(hero, "Training mode not initialized", true)
                return
            end
            local ____opt_112 = GameRules.GameModeManager
            if not (____opt_112 and ____opt_112:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            GameRules.TrainingMode:enableAutoRegeneration()
            GameRules.TrainingMode:setCooldownSeconds(3)
            GameRules.TrainingMode:enableCustomCooldowns()
            Say(hero, "Practice mode activated!", true)
            Say(hero, "- Auto regeneration: ON", true)
            Say(hero, "- Fast cooldowns: ON (3s)", true)
            Say(hero, "Ready for training!", true)
        end
    },
    ["-god"] = {
        desc = "切换无敌模式",
        func = function(____, hero)
            local ____opt_114 = GameRules.GameModeManager
            if not (____opt_114 and ____opt_114:isTrainingMode()) then
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
            local ____opt_116 = GameRules.GameModeManager
            if not (____opt_116 and ____opt_116:isTrainingMode()) then
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
            local ____opt_118 = GameRules.GameModeManager
            if not (____opt_118 and ____opt_118:isTrainingMode()) then
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
            local ____opt_120 = GameRules.GameModeManager
            if not (____opt_120 and ____opt_120:isTrainingMode()) then
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
                local ____switch160 = action
                local status
                local ____cond160 = ____switch160 == "activate" or ____switch160 == "start"
                if ____cond160 then
                    autoChess:activate()
                    Say(hero, "自走棋模式已激活", true)
                    break
                end
                ____cond160 = ____cond160 or (____switch160 == "deactivate" or ____switch160 == "stop")
                if ____cond160 then
                    autoChess:deactivate()
                    Say(hero, "自走棋模式已停用", true)
                    break
                end
                ____cond160 = ____cond160 or ____switch160 == "game"
                if ____cond160 then
                    if args[2] == "start" then
                        autoChess:startGame()
                        Say(hero, "自走棋游戏已开始", true)
                    else
                        Say(hero, "用法: -autochess game start", true)
                    end
                    break
                end
                ____cond160 = ____cond160 or ____switch160 == "status"
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
            local ____opt_124 = GameRules.GameModeManager
            if not (____opt_124 and ____opt_124:isAutoChessMode()) then
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
            local ____opt_126 = GameRules.GameModeManager
            if not (____opt_126 and ____opt_126:isAutoChessMode()) then
                Say(hero, "This command only works in autochess mode", true)
                return
            end
            repeat
                local ____switch170 = action
                local ____cond170 = ____switch170 == "refresh"
                if ____cond170 then
                    Say(hero, "商店已刷新", true)
                    break
                end
                ____cond170 = ____cond170 or ____switch170 == "show"
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
            local ____opt_128 = GameRules.GameModeManager
            if not (____opt_128 and ____opt_128:isAutoChessMode()) then
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
    print("[Debug] ==============初始化调试系统==========================")
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
            local ____print_131 = print
            local ____hero_130
            if hero then
                ____hero_130 = hero:GetUnitName()
            else
                ____hero_130 = "null"
            end
            ____print_131("[Debug] Hero: " .. ____hero_130)
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
            local ____print_133 = print
            local ____hero_132
            if hero then
                ____hero_132 = hero:GetUnitName()
            else
                ____hero_132 = "null"
            end
            ____print_133("[Debug] Hero found: " .. ____hero_132)
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
