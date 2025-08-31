local ____lualib = require("lualib_bundle")
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ParseFloat = ____lualib.__TS__ParseFloat
local __TS__Number = ____lualib.__TS__Number
local __TS__NumberIsNaN = ____lualib.__TS__NumberIsNaN
local __TS__Class = ____lualib.__TS__Class
local __TS__StringTrim = ____lualib.__TS__StringTrim
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["26"] = 1,["27"] = 1,["28"] = 3,["29"] = 3,["30"] = 8,["32"] = 8,["33"] = 9,["34"] = 9,["35"] = 11,["36"] = 12,["37"] = 13,["38"] = 14,["39"] = 15,["41"] = 9,["42"] = 8,["43"] = 19,["44"] = 19,["45"] = 21,["46"] = 22,["47"] = 23,["48"] = 23,["50"] = 24,["51"] = 24,["52"] = 24,["54"] = 24,["55"] = 24,["57"] = 24,["58"] = 24,["59"] = 24,["60"] = 24,["61"] = 24,["63"] = 25,["64"] = 25,["65"] = 25,["67"] = 25,["68"] = 25,["70"] = 25,["71"] = 25,["72"] = 25,["73"] = 25,["74"] = 25,["76"] = 26,["77"] = 26,["78"] = 26,["79"] = 26,["80"] = 26,["82"] = 27,["83"] = 27,["84"] = 27,["85"] = 27,["86"] = 27,["88"] = 28,["89"] = 28,["90"] = 28,["91"] = 28,["92"] = 28,["93"] = 28,["94"] = 28,["95"] = 28,["96"] = 28,["98"] = 29,["99"] = 29,["101"] = 30,["102"] = 30,["103"] = 30,["104"] = 30,["105"] = 30,["107"] = 31,["108"] = 32,["109"] = 32,["110"] = 32,["111"] = 32,["112"] = 32,["115"] = 19,["116"] = 8,["117"] = 36,["118"] = 36,["119"] = 38,["120"] = 38,["121"] = 39,["122"] = 40,["123"] = 41,["124"] = 42,["128"] = 47,["129"] = 48,["130"] = 49,["131"] = 50,["132"] = 51,["133"] = 52,["134"] = 53,["136"] = 56,["137"] = 57,["139"] = 36,["140"] = 8,["141"] = 61,["142"] = 61,["143"] = 63,["144"] = 64,["145"] = 65,["146"] = 61,["147"] = 8,["148"] = 68,["149"] = 68,["150"] = 70,["151"] = 71,["152"] = 72,["153"] = 68,["154"] = 8,["155"] = 75,["156"] = 75,["157"] = 77,["158"] = 77,["159"] = 78,["160"] = 79,["161"] = 80,["162"] = 81,["163"] = 81,["165"] = 75,["166"] = 8,["167"] = 84,["168"] = 84,["169"] = 86,["170"] = 86,["171"] = 87,["172"] = 88,["173"] = 89,["174"] = 90,["175"] = 90,["177"] = 84,["178"] = 8,["179"] = 93,["180"] = 93,["181"] = 95,["182"] = 95,["183"] = 96,["184"] = 96,["185"] = 96,["186"] = 96,["187"] = 96,["188"] = 97,["189"] = 98,["190"] = 99,["191"] = 100,["192"] = 101,["193"] = 101,["194"] = 101,["195"] = 101,["196"] = 101,["197"] = 101,["198"] = 101,["199"] = 102,["200"] = 103,["201"] = 104,["202"] = 105,["203"] = 106,["204"] = 107,["205"] = 108,["207"] = 110,["208"] = 111,["209"] = 112,["211"] = 103,["212"] = 93,["213"] = 8,["214"] = 117,["215"] = 117,["216"] = 119,["217"] = 120,["218"] = 121,["219"] = 122,["220"] = 123,["221"] = 123,["222"] = 123,["223"] = 123,["224"] = 123,["227"] = 125,["228"] = 125,["231"] = 117,["232"] = 8,["233"] = 129,["234"] = 129,["235"] = 131,["236"] = 132,["237"] = 133,["238"] = 134,["239"] = 135,["240"] = 135,["243"] = 137,["244"] = 137,["247"] = 129,["248"] = 8,["249"] = 141,["250"] = 141,["251"] = 143,["252"] = 143,["253"] = 144,["254"] = 145,["255"] = 148,["256"] = 150,["257"] = 151,["258"] = 151,["259"] = 151,["260"] = 151,["261"] = 151,["262"] = 152,["263"] = 152,["265"] = 153,["266"] = 154,["267"] = 155,["268"] = 155,["269"] = 155,["270"] = 155,["271"] = 155,["272"] = 156,["273"] = 156,["275"] = 157,["277"] = 159,["278"] = 159,["280"] = 160,["283"] = 141,["284"] = 8,["285"] = 165,["286"] = 165,["287"] = 167,["288"] = 167,["289"] = 168,["290"] = 169,["291"] = 171,["292"] = 171,["294"] = 172,["295"] = 175,["296"] = 175,["297"] = 175,["298"] = 176,["299"] = 177,["300"] = 175,["301"] = 175,["302"] = 165,["303"] = 8,["304"] = 181,["305"] = 181,["306"] = 183,["307"] = 183,["308"] = 184,["309"] = 185,["310"] = 186,["311"] = 187,["313"] = 188,["314"] = 188,["315"] = 189,["316"] = 189,["318"] = 190,["319"] = 188,["323"] = 193,["324"] = 194,["325"] = 194,["326"] = 194,["327"] = 194,["328"] = 194,["329"] = 194,["330"] = 194,["331"] = 194,["332"] = 194,["333"] = 200,["334"] = 200,["337"] = 202,["338"] = 202,["341"] = 181,["342"] = 8,["343"] = 206,["344"] = 206,["345"] = 208,["346"] = 209,["347"] = 210,["348"] = 210,["349"] = 210,["350"] = 210,["351"] = 210,["352"] = 210,["353"] = 210,["354"] = 217,["355"] = 217,["356"] = 217,["357"] = 217,["358"] = 217,["360"] = 206,["361"] = 8,["362"] = 220,["363"] = 220,["364"] = 222,["365"] = 223,["366"] = 224,["367"] = 225,["368"] = 225,["374"] = 234,["375"] = 235,["376"] = 235,["377"] = 235,["378"] = 235,["379"] = 235,["380"] = 235,["381"] = 235,["382"] = 235,["383"] = 235,["385"] = 242,["386"] = 242,["390"] = 231,["391"] = 232,["397"] = 220,["398"] = 8,["399"] = 246,["400"] = 246,["401"] = 248,["402"] = 248,["403"] = 249,["404"] = 250,["405"] = 251,["406"] = 252,["407"] = 253,["408"] = 253,["409"] = 253,["410"] = 253,["411"] = 253,["413"] = 255,["414"] = 256,["415"] = 256,["416"] = 256,["417"] = 256,["418"] = 256,["421"] = 259,["423"] = 246,["424"] = 8,["425"] = 263,["426"] = 263,["427"] = 265,["428"] = 266,["429"] = 267,["430"] = 268,["432"] = 270,["434"] = 263,["435"] = 8,["436"] = 274,["437"] = 274,["438"] = 276,["439"] = 276,["440"] = 277,["441"] = 279,["442"] = 280,["443"] = 283,["444"] = 284,["445"] = 286,["447"] = 289,["448"] = 290,["449"] = 290,["450"] = 290,["451"] = 290,["452"] = 290,["454"] = 292,["456"] = 274,["457"] = 8,["458"] = 296,["459"] = 296,["460"] = 298,["461"] = 298,["462"] = 299,["463"] = 300,["464"] = 302,["465"] = 303,["468"] = 307,["469"] = 308,["470"] = 309,["471"] = 309,["472"] = 309,["473"] = 309,["474"] = 309,["476"] = 311,["478"] = 296,["479"] = 8,["480"] = 315,["481"] = 315,["482"] = 317,["483"] = 317,["484"] = 318,["485"] = 319,["488"] = 323,["489"] = 324,["490"] = 325,["491"] = 326,["492"] = 327,["494"] = 329,["497"] = 332,["498"] = 333,["499"] = 333,["500"] = 333,["501"] = 333,["502"] = 333,["503"] = 334,["505"] = 335,["506"] = 335,["507"] = 336,["508"] = 336,["510"] = 337,["511"] = 335,["514"] = 339,["516"] = 315,["517"] = 8,["518"] = 343,["519"] = 343,["520"] = 345,["521"] = 345,["522"] = 346,["523"] = 347,["524"] = 348,["525"] = 348,["529"] = 352,["531"] = 353,["532"] = 363,["533"] = 354,["535"] = 355,["536"] = 356,["537"] = 356,["541"] = 358,["543"] = 359,["544"] = 360,["545"] = 360,["549"] = 362,["551"] = 363,["552"] = 364,["553"] = 364,["555"] = 365,["556"] = 365,["557"] = 365,["558"] = 365,["559"] = 365,["561"] = 366,["562"] = 367,["563"] = 367,["564"] = 367,["565"] = 367,["566"] = 367,["568"] = 368,["569"] = 368,["570"] = 368,["571"] = 368,["572"] = 368,["577"] = 371,["579"] = 372,["580"] = 373,["581"] = 373,["582"] = 373,["583"] = 373,["584"] = 373,["589"] = 376,["590"] = 376,["594"] = 343,["595"] = 8,["596"] = 380,["597"] = 380,["598"] = 382,["599"] = 382,["600"] = 383,["601"] = 384,["602"] = 384,["603"] = 385,["604"] = 385,["608"] = 389,["609"] = 390,["610"] = 391,["611"] = 393,["612"] = 394,["613"] = 394,["615"] = 395,["616"] = 395,["622"] = 424,["623"] = 424,["624"] = 424,["625"] = 424,["626"] = 424,["630"] = 400,["631"] = 401,["633"] = 403,["634"] = 403,["635"] = 404,["636"] = 404,["637"] = 404,["638"] = 404,["639"] = 404,["640"] = 410,["641"] = 410,["642"] = 410,["643"] = 410,["644"] = 410,["645"] = 410,["646"] = 410,["647"] = 410,["648"] = 411,["649"] = 413,["651"] = 414,["652"] = 414,["653"] = 415,["654"] = 414,["658"] = 418,["660"] = 403,["663"] = 422,["664"] = 422,["665"] = 422,["666"] = 422,["667"] = 422,["674"] = 380,["675"] = 8,["676"] = 428,["677"] = 428,["678"] = 430,["679"] = 430,["680"] = 431,["681"] = 432,["684"] = 436,["685"] = 437,["687"] = 439,["688"] = 445,["689"] = 440,["691"] = 441,["692"] = 442,["695"] = 445,["696"] = 446,["697"] = 447,["699"] = 449,["703"] = 452,["705"] = 453,["706"] = 454,["709"] = 456,["711"] = 457,["712"] = 458,["713"] = 459,["717"] = 462,["720"] = 428,["721"] = 8,["722"] = 466,["723"] = 466,["724"] = 468,["725"] = 469,["726"] = 469,["727"] = 470,["730"] = 474,["731"] = 475,["732"] = 475,["733"] = 475,["734"] = 475,["735"] = 475,["736"] = 475,["737"] = 475,["738"] = 475,["739"] = 475,["740"] = 475,["741"] = 475,["742"] = 487,["743"] = 488,["744"] = 489,["745"] = 490,["748"] = 494,["749"] = 494,["750"] = 494,["751"] = 494,["752"] = 494,["753"] = 466,["754"] = 8,["755"] = 497,["756"] = 497,["757"] = 499,["758"] = 499,["759"] = 500,["760"] = 501,["763"] = 505,["764"] = 505,["765"] = 506,["768"] = 510,["770"] = 511,["771"] = 513,["772"] = 512,["774"] = 513,["775"] = 514,["776"] = 515,["777"] = 516,["778"] = 518,["779"] = 525,["780"] = 526,["781"] = 526,["782"] = 526,["783"] = 526,["784"] = 526,["786"] = 528,["790"] = 532,["792"] = 533,["793"] = 534,["796"] = 537,["798"] = 538,["799"] = 539,["800"] = 540,["801"] = 541,["802"] = 541,["803"] = 541,["804"] = 541,["805"] = 541,["806"] = 542,["807"] = 542,["808"] = 542,["809"] = 542,["810"] = 542,["811"] = 543,["812"] = 543,["813"] = 543,["814"] = 543,["815"] = 543,["820"] = 548,["821"] = 549,["824"] = 497,["825"] = 8,["826"] = 553,["827"] = 553,["828"] = 555,["829"] = 555,["830"] = 556,["831"] = 557,["834"] = 561,["835"] = 561,["836"] = 562,["839"] = 566,["841"] = 567,["842"] = 569,["843"] = 568,["845"] = 569,["846"] = 570,["847"] = 571,["848"] = 573,["849"] = 579,["850"] = 580,["851"] = 580,["852"] = 580,["853"] = 580,["854"] = 580,["855"] = 581,["856"] = 582,["859"] = 585,["863"] = 589,["865"] = 590,["866"] = 591,["869"] = 594,["871"] = 595,["872"] = 596,["873"] = 597,["874"] = 598,["875"] = 598,["876"] = 598,["877"] = 598,["878"] = 598,["879"] = 599,["880"] = 599,["881"] = 599,["882"] = 599,["883"] = 599,["884"] = 600,["885"] = 600,["886"] = 600,["887"] = 600,["888"] = 600,["893"] = 605,["894"] = 606,["897"] = 553,["898"] = 8,["899"] = 610,["900"] = 610,["901"] = 612,["902"] = 613,["903"] = 613,["904"] = 614,["907"] = 618,["908"] = 619,["909"] = 620,["911"] = 622,["913"] = 610,["914"] = 8,["915"] = 626,["916"] = 626,["917"] = 628,["918"] = 629,["919"] = 629,["920"] = 630,["923"] = 634,["924"] = 635,["925"] = 636,["927"] = 638,["929"] = 626,["930"] = 8,["931"] = 642,["932"] = 642,["933"] = 644,["934"] = 644,["935"] = 645,["936"] = 645,["937"] = 646,["940"] = 650,["941"] = 651,["942"] = 652,["943"] = 653,["946"] = 657,["947"] = 658,["948"] = 659,["949"] = 660,["951"] = 662,["954"] = 665,["956"] = 642,["957"] = 8,["958"] = 669,["959"] = 669,["960"] = 671,["961"] = 671,["962"] = 672,["963"] = 673,["966"] = 677,["967"] = 677,["968"] = 678,["971"] = 682,["973"] = 683,["974"] = 696,["975"] = 684,["977"] = 685,["978"] = 686,["981"] = 689,["983"] = 690,["984"] = 691,["987"] = 694,["989"] = 695,["990"] = 696,["991"] = 697,["994"] = 700,["996"] = 701,["997"] = 702,["998"] = 703,["1002"] = 707,["1003"] = 708,["1006"] = 669,["1007"] = 8,["1008"] = 712,["1009"] = 712,["1010"] = 714,["1011"] = 714,["1012"] = 715,["1013"] = 716,["1016"] = 720,["1017"] = 720,["1018"] = 721,["1021"] = 725,["1022"] = 726,["1024"] = 728,["1025"] = 734,["1026"] = 729,["1028"] = 730,["1029"] = 731,["1031"] = 733,["1032"] = 734,["1033"] = 735,["1034"] = 735,["1035"] = 735,["1036"] = 735,["1037"] = 735,["1040"] = 738,["1042"] = 739,["1043"] = 740,["1046"] = 743,["1048"] = 744,["1049"] = 745,["1050"] = 746,["1051"] = 747,["1052"] = 748,["1053"] = 748,["1054"] = 748,["1055"] = 748,["1056"] = 748,["1060"] = 752,["1062"] = 753,["1063"] = 754,["1064"] = 755,["1065"] = 756,["1066"] = 756,["1067"] = 756,["1068"] = 756,["1069"] = 756,["1073"] = 760,["1074"] = 761,["1075"] = 762,["1078"] = 712,["1079"] = 8,["1080"] = 766,["1081"] = 766,["1082"] = 768,["1083"] = 768,["1084"] = 769,["1085"] = 770,["1088"] = 774,["1089"] = 774,["1090"] = 775,["1093"] = 779,["1094"] = 780,["1095"] = 781,["1096"] = 782,["1097"] = 782,["1098"] = 782,["1099"] = 782,["1100"] = 782,["1101"] = 783,["1104"] = 787,["1105"] = 788,["1106"] = 789,["1107"] = 789,["1108"] = 789,["1109"] = 789,["1110"] = 789,["1111"] = 766,["1112"] = 8,["1113"] = 792,["1114"] = 792,["1115"] = 794,["1116"] = 795,["1117"] = 796,["1120"] = 800,["1121"] = 800,["1122"] = 801,["1125"] = 805,["1126"] = 806,["1127"] = 807,["1128"] = 792,["1129"] = 8,["1130"] = 810,["1131"] = 810,["1132"] = 812,["1133"] = 813,["1134"] = 814,["1137"] = 818,["1138"] = 818,["1139"] = 819,["1142"] = 824,["1143"] = 825,["1144"] = 826,["1145"] = 828,["1146"] = 829,["1147"] = 830,["1148"] = 831,["1149"] = 810,["1150"] = 8,["1151"] = 834,["1152"] = 834,["1153"] = 836,["1154"] = 837,["1155"] = 837,["1156"] = 838,["1159"] = 842,["1160"] = 843,["1161"] = 844,["1163"] = 846,["1164"] = 847,["1166"] = 834,["1167"] = 8,["1168"] = 851,["1169"] = 851,["1170"] = 853,["1171"] = 854,["1172"] = 854,["1173"] = 855,["1176"] = 859,["1177"] = 860,["1179"] = 863,["1180"] = 863,["1181"] = 864,["1182"] = 865,["1183"] = 866,["1184"] = 867,["1186"] = 863,["1190"] = 872,["1191"] = 872,["1192"] = 873,["1193"] = 874,["1194"] = 875,["1196"] = 872,["1199"] = 879,["1200"] = 851,["1201"] = 8,["1202"] = 882,["1203"] = 882,["1204"] = 884,["1205"] = 884,["1206"] = 885,["1207"] = 885,["1208"] = 886,["1211"] = 890,["1213"] = 891,["1214"] = 891,["1215"] = 892,["1216"] = 891,["1219"] = 895,["1220"] = 895,["1221"] = 895,["1222"] = 895,["1223"] = 895,["1224"] = 882,["1225"] = 8,["1226"] = 898,["1227"] = 898,["1228"] = 900,["1229"] = 900,["1230"] = 901,["1231"] = 901,["1232"] = 902,["1235"] = 906,["1236"] = 907,["1237"] = 909,["1238"] = 910,["1239"] = 911,["1240"] = 912,["1241"] = 912,["1242"] = 912,["1243"] = 912,["1244"] = 912,["1247"] = 898,["1248"] = 8,["1249"] = 917,["1250"] = 917,["1251"] = 919,["1252"] = 919,["1253"] = 920,["1254"] = 921,["1255"] = 922,["1257"] = 924,["1258"] = 945,["1259"] = 925,["1261"] = 927,["1262"] = 928,["1265"] = 930,["1267"] = 932,["1268"] = 933,["1271"] = 935,["1273"] = 936,["1274"] = 937,["1275"] = 938,["1277"] = 940,["1281"] = 943,["1283"] = 945,["1284"] = 946,["1285"] = 946,["1286"] = 946,["1287"] = 946,["1288"] = 946,["1292"] = 917,["1293"] = 8,["1294"] = 951,["1295"] = 951,["1296"] = 953,["1297"] = 953,["1298"] = 954,["1299"] = 955,["1300"] = 956,["1303"] = 960,["1304"] = 960,["1305"] = 961,["1308"] = 965,["1309"] = 966,["1310"] = 967,["1311"] = 969,["1312"] = 970,["1314"] = 972,["1316"] = 951,["1317"] = 8,["1318"] = 976,["1319"] = 976,["1320"] = 978,["1321"] = 978,["1322"] = 979,["1323"] = 981,["1324"] = 981,["1325"] = 982,["1329"] = 986,["1330"] = 987,["1332"] = 989,["1335"] = 991,["1337"] = 993,["1341"] = 976,["1342"] = 8,["1343"] = 998,["1344"] = 998,["1345"] = 1000,["1346"] = 1000,["1347"] = 1001,["1348"] = 1003,["1349"] = 1003,["1350"] = 1004,["1353"] = 1008,["1354"] = 1009,["1356"] = 1011,["1358"] = 998,["1359"] = 8,["1360"] = 8,["1361"] = 1017,["1362"] = 1018,["1363"] = 1017,["1365"] = 1019,["1366"] = 1020,["1367"] = 1024,["1368"] = 1045,["1369"] = 1047,["1370"] = 1048,["1371"] = 1049,["1372"] = 1050,["1373"] = 1051,["1374"] = 1052,["1375"] = 1055,["1376"] = 1056,["1377"] = 1059,["1378"] = 1060,["1380"] = 1064,["1381"] = 1065,["1382"] = 1066,["1384"] = 1069,["1385"] = 1070,["1386"] = 1073,["1387"] = 1076,["1388"] = 1080,["1389"] = 1080,["1390"] = 1080,["1391"] = 1081,["1392"] = 1080,["1393"] = 1080,["1394"] = 1043,["1395"] = 1031,["1396"] = 1033,["1397"] = 1034,["1399"] = 1038,["1400"] = 1039,["1402"] = 1031,["1403"] = 1088,["1404"] = 1089,["1405"] = 1092,["1406"] = 1092,["1407"] = 1092,["1408"] = 1093,["1409"] = 1094,["1410"] = 1097,["1411"] = 1098,["1412"] = 1099,["1413"] = 1100,["1414"] = 1102,["1415"] = 1092,["1416"] = 1092,["1417"] = 1106,["1418"] = 1106,["1419"] = 1106,["1420"] = 1107,["1421"] = 1108,["1422"] = 1109,["1423"] = 1110,["1425"] = 1112,["1426"] = 1113,["1427"] = 1106,["1428"] = 1106,["1429"] = 1117,["1430"] = 1117,["1431"] = 1117,["1432"] = 1118,["1433"] = 1119,["1434"] = 1120,["1435"] = 1117,["1436"] = 1117,["1437"] = 1124,["1438"] = 1124,["1439"] = 1124,["1440"] = 1125,["1441"] = 1126,["1442"] = 1127,["1443"] = 1128,["1444"] = 1124,["1445"] = 1124,["1446"] = 1088,["1447"] = 1135,["1450"] = 1154,["1453"] = 1137,["1454"] = 1138,["1455"] = 1139,["1457"] = 1142,["1458"] = 1143,["1459"] = 1143,["1460"] = 1143,["1461"] = 1144,["1462"] = 1145,["1463"] = 1143,["1464"] = 1143,["1465"] = 1143,["1466"] = 1148,["1467"] = 1149,["1469"] = 1151,["1476"] = 1136,["1479"] = 1135,["1480"] = 1161,["1481"] = 1162,["1482"] = 1163,["1483"] = 1164,["1484"] = 1165,["1485"] = 1166,["1486"] = 1167,["1487"] = 1168,["1488"] = 1169,["1489"] = 1170,["1491"] = 1172,["1492"] = 1173,["1493"] = 1174,["1494"] = 1161,["1495"] = 1180,["1496"] = 1181,["1497"] = 1184,["1498"] = 1185,["1499"] = 1186,["1500"] = 1187,["1502"] = 1189,["1504"] = 1192,["1505"] = 1193,["1506"] = 1194,["1507"] = 1195,["1508"] = 1196,["1509"] = 1180,["1510"] = 1202,["1513"] = 1222,["1514"] = 1223,["1518"] = 1205,["1519"] = 1205,["1520"] = 1206,["1521"] = 1207,["1522"] = 1208,["1523"] = 1209,["1526"] = 1205,["1529"] = 1215,["1530"] = 1216,["1531"] = 1217,["1533"] = 1220,["1539"] = 1203,["1542"] = 1202,["1543"] = 1230,["1546"] = 1254,["1549"] = 1232,["1550"] = 1233,["1551"] = 1234,["1552"] = 1235,["1553"] = 1236,["1554"] = 1237,["1555"] = 1237,["1556"] = 1237,["1557"] = 1237,["1559"] = 1237,["1561"] = 1237,["1562"] = 1238,["1563"] = 1239,["1564"] = 1240,["1565"] = 1241,["1568"] = 1242,["1569"] = 1242,["1571"] = 1243,["1572"] = 1244,["1574"] = 1246,["1575"] = 1247,["1576"] = 1250,["1577"] = 1251,["1578"] = 1251,["1579"] = 1251,["1580"] = 1251,["1587"] = 1230,["1588"] = 1261,["1591"] = 1335,["1594"] = 1263,["1595"] = 1266,["1596"] = 1269,["1597"] = 1270,["1598"] = 1271,["1599"] = 1272,["1600"] = 1273,["1601"] = 1274,["1603"] = 1276,["1605"] = 1278,["1606"] = 1269,["1607"] = 1282,["1608"] = 1283,["1609"] = 1284,["1610"] = 1285,["1611"] = 1286,["1612"] = 1287,["1614"] = 1289,["1616"] = 1291,["1617"] = 1282,["1618"] = 1295,["1619"] = 1296,["1620"] = 1297,["1621"] = 1298,["1622"] = 1299,["1623"] = 1300,["1625"] = 1302,["1627"] = 1304,["1628"] = 1295,["1629"] = 1308,["1630"] = 1309,["1631"] = 1310,["1632"] = 1311,["1633"] = 1312,["1634"] = 1313,["1635"] = 1308,["1636"] = 1317,["1637"] = 1318,["1638"] = 1319,["1639"] = 1320,["1640"] = 1321,["1641"] = 1317,["1642"] = 1324,["1643"] = 1325,["1644"] = 1326,["1645"] = 1327,["1646"] = 1328,["1647"] = 1329,["1648"] = 1330,["1649"] = 1331,["1650"] = 1332,["1656"] = 1261,["1657"] = 1339,["1658"] = 1340,["1659"] = 1341,["1661"] = 1343,["1663"] = 1345,["1664"] = 1346,["1666"] = 1348,["1668"] = 1339,["1669"] = 1352,["1672"] = 1444,["1675"] = 1354,["1676"] = 1356,["1677"] = 1357,["1678"] = 1358,["1680"] = 1361,["1681"] = 1362,["1682"] = 1364,["1684"] = 1367,["1685"] = 1368,["1686"] = 1369,["1687"] = 1371,["1689"] = 1372,["1690"] = 1372,["1691"] = 1373,["1692"] = 1373,["1694"] = 1374,["1695"] = 1372,["1698"] = 1376,["1699"] = 1379,["1700"] = 1380,["1701"] = 1383,["1702"] = 1384,["1704"] = 1388,["1705"] = 1389,["1707"] = 1392,["1708"] = 1392,["1709"] = 1392,["1710"] = 1392,["1712"] = 1392,["1714"] = 1392,["1715"] = 1395,["1716"] = 1396,["1717"] = 1397,["1718"] = 1398,["1720"] = 1402,["1721"] = 1403,["1722"] = 1404,["1723"] = 1405,["1724"] = 1406,["1725"] = 1406,["1726"] = 1406,["1727"] = 1406,["1729"] = 1408,["1730"] = 1409,["1732"] = 1411,["1734"] = 1415,["1735"] = 1416,["1736"] = 1417,["1737"] = 1418,["1739"] = 1422,["1740"] = 1423,["1741"] = 1424,["1742"] = 1425,["1744"] = 1429,["1745"] = 1430,["1748"] = 1435,["1749"] = 1436,["1750"] = 1436,["1751"] = 1436,["1752"] = 1436,["1755"] = 1432,["1756"] = 1432,["1757"] = 1432,["1758"] = 1432,["1759"] = 1433,["1766"] = 1439,["1767"] = 1440,["1774"] = 1353,["1777"] = 1352,["1778"] = 1448,["1781"] = 1495,["1784"] = 1450,["1785"] = 1451,["1786"] = 1452,["1788"] = 1455,["1789"] = 1458,["1790"] = 1459,["1791"] = 1460,["1792"] = 1460,["1793"] = 1460,["1794"] = 1460,["1795"] = 1462,["1796"] = 1465,["1797"] = 1465,["1798"] = 1465,["1799"] = 1465,["1800"] = 1465,["1801"] = 1465,["1802"] = 1465,["1803"] = 1465,["1804"] = 1465,["1805"] = 1462,["1807"] = 1480,["1808"] = 1481,["1809"] = 1482,["1810"] = 1482,["1811"] = 1482,["1812"] = 1482,["1813"] = 1482,["1814"] = 1482,["1815"] = 1482,["1816"] = 1482,["1817"] = 1490,["1825"] = 1449,["1828"] = 1448,["1829"] = 1017,["1830"] = 1018});
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
            local message = "Test error from debug command"
            if #args > 0 then
                message = ""
                do
                    local i = 0
                    while i < #args do
                        if i > 0 then
                            message = message .. " "
                        end
                        message = message .. args[i + 1]
                        i = i + 1
                    end
                end
            end
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
                local startTime = GameRules:GetGameTime() * 1000
                while GameRules:GetGameTime() * 1000 - startTime < duration do
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
                local availableModes = ""
                do
                    local i = 0
                    while i < status.availableModes.length do
                        if i > 0 then
                            availableModes = availableModes .. ", "
                        end
                        availableModes = availableModes .. tostring(status.availableModes[i])
                        i = i + 1
                    end
                end
                Say(hero, "Available modes: " .. availableModes, true)
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
                local ____switch73 = action
                local status, settings
                local ____cond73 = ____switch73 == "start"
                if ____cond73 then
                    GameRules.TrainingMode:activate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode activated")
                    end
                    break
                end
                ____cond73 = ____cond73 or ____switch73 == "stop"
                if ____cond73 then
                    GameRules.TrainingMode:deactivate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode deactivated")
                    end
                    break
                end
                ____cond73 = ____cond73 or ____switch73 == "status"
                if ____cond73 then
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
                ____cond73 = ____cond73 or ____switch73 == "settings"
                if ____cond73 then
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
                local ____switch88 = action
                local success
                local ____cond88 = ____switch88 == "start"
                if ____cond88 then
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
                ____cond88 = ____cond88 or ____switch88 == "stop"
                if ____cond88 then
                    GameRules.TrainingMode:stopCurrentTest()
                    Say(hero, "Stopped current test scenario", true)
                    break
                end
                ____cond88 = ____cond88 or ____switch88 == "list"
                if ____cond88 then
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
                local ____switch100 = action
                local unitType, count, level, interval, success, status
                local ____cond100 = ____switch100 == "start"
                if ____cond100 then
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
                ____cond100 = ____cond100 or ____switch100 == "stop"
                if ____cond100 then
                    GameRules.TrainingMode:stopAutoSpawn()
                    Say(hero, "Auto spawn stopped", true)
                    break
                end
                ____cond100 = ____cond100 or ____switch100 == "status"
                if ____cond100 then
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
                local ____switch107 = action
                local count, health, invulnerable, success, status
                local ____cond107 = ____switch107 == "start"
                if ____cond107 then
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
                ____cond107 = ____cond107 or ____switch107 == "stop"
                if ____cond107 then
                    GameRules.TrainingMode:stopAutoDummy()
                    Say(hero, "Auto dummy stopped", true)
                    break
                end
                ____cond107 = ____cond107 or ____switch107 == "status"
                if ____cond107 then
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
                local ____switch130 = action
                local toggleStatus, status
                local ____cond130 = ____switch130 == "on"
                if ____cond130 then
                    GameRules.TrainingMode:enableAutoRegeneration()
                    Say(hero, "Auto regeneration enabled", true)
                    break
                end
                ____cond130 = ____cond130 or ____switch130 == "off"
                if ____cond130 then
                    GameRules.TrainingMode:disableAutoRegeneration()
                    Say(hero, "Auto regeneration disabled", true)
                    break
                end
                ____cond130 = ____cond130 or ____switch130 == "toggle"
                if ____cond130 then
                    GameRules.TrainingMode:toggleAutoRegeneration()
                    toggleStatus = GameRules.TrainingMode:getStatus()
                    Say(hero, "Auto regeneration: " .. (toggleStatus.autoRegeneration.enabled and "ON" or "OFF"), true)
                    break
                end
                ____cond130 = ____cond130 or ____switch130 == "status"
                if ____cond130 then
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
                local ____switch134 = action
                local onStatus, toggleStatus, status
                local ____cond134 = ____switch134 == "on"
                if ____cond134 then
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
                ____cond134 = ____cond134 or ____switch134 == "off"
                if ____cond134 then
                    GameRules.TrainingMode:disableCustomCooldowns()
                    Say(hero, "Fast cooldowns disabled", true)
                    break
                end
                ____cond134 = ____cond134 or ____switch134 == "toggle"
                if ____cond134 then
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
                ____cond134 = ____cond134 or ____switch134 == "status"
                if ____cond134 then
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
                local ____switch167 = action
                local status
                local ____cond167 = ____switch167 == "activate" or ____switch167 == "start"
                if ____cond167 then
                    autoChess:activate()
                    Say(hero, "自走棋模式已激活", true)
                    break
                end
                ____cond167 = ____cond167 or (____switch167 == "deactivate" or ____switch167 == "stop")
                if ____cond167 then
                    autoChess:deactivate()
                    Say(hero, "自走棋模式已停用", true)
                    break
                end
                ____cond167 = ____cond167 or ____switch167 == "game"
                if ____cond167 then
                    if args[2] == "start" then
                        autoChess:startGame()
                        Say(hero, "自走棋游戏已开始", true)
                    else
                        Say(hero, "用法: -autochess game start", true)
                    end
                    break
                end
                ____cond167 = ____cond167 or ____switch167 == "status"
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
                local ____switch177 = action
                local ____cond177 = ____switch177 == "refresh"
                if ____cond177 then
                    Say(hero, "商店已刷新", true)
                    break
                end
                ____cond177 = ____cond177 or ____switch177 == "show"
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
    self:setupDelayedInitialization()
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
function Debug.prototype.setupDelayedInitialization(self)
    print("[Debug] Setting up delayed initialization...")
    Timers:CreateTimer(
        1,
        function()
            print("[Debug] ===== 1-second initialization checkpoint =====")
            self:registerChatListener()
            print("[Debug] Verifying modules after 1 second...")
            print("[Debug] GameRules.DebugInstance exists: " .. (GameRules.DebugInstance and "YES" or "NO"))
            print("[Debug] GameRules.TrainingMode exists: " .. (GameRules.TrainingMode and "YES" or "NO"))
            print("[Debug] GameRules.GameModeManager exists: " .. (GameRules.GameModeManager and "YES" or "NO"))
            return nil
        end
    )
    Timers:CreateTimer(
        3,
        function()
            print("[Debug] ===== 3-second verification checkpoint =====")
            if not self._chatListener then
                print("[Debug] Chat listener missing, attempting to re-register...")
                self:registerChatListener()
            end
            self:verifyDebugSystem()
            return nil
        end
    )
    Timers:CreateTimer(
        5,
        function()
            print("[Debug] ===== 5-second startup completion =====")
            self:announceDebugSystemReady()
            return nil
        end
    )
    Timers:CreateTimer(
        30,
        function()
            print("[Debug] ===== Periodic status check =====")
            print("[Debug] Debug system operational - type -help for commands")
            self:executeDebugStatus()
            return 30
        end
    )
end
function Debug.prototype.registerChatListener(self)
    do
        local function ____catch(____error)
            print("[Debug] FAILED to register chat listener: " .. tostring(____error))
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            if self._chatListener then
                print("[Debug] Chat listener already registered, skipping...")
                return true
            end
            print("[Debug] Attempting to register chat listener...")
            self._chatListener = ListenToGameEvent(
                "player_chat",
                function(keys)
                    print(("[Debug] *** CHAT EVENT RECEIVED *** Text: \"" .. keys.text) .. "\"")
                    self:OnPlayerChat(keys)
                end,
                nil
            )
            if self._chatListener then
                print("[Debug] Chat listener registered successfully with ID: " .. tostring(self._chatListener))
            else
                print("[Debug] Chat listener registration returned falsy value")
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
function Debug.prototype.verifyDebugSystem(self)
    print("[Debug] ===== Debug System Verification =====")
    print("[Debug] - Debug Enabled: " .. tostring(self.DebugEnabled))
    print("[Debug] - Console Output: " .. tostring(self.outputToConsole))
    print("[Debug] - Chat Listener: " .. (self._chatListener and "REGISTERED" or "MISSING"))
    print("[Debug] - Tools Mode: " .. tostring(IsInToolsMode()))
    print("[Debug] - Player Count: " .. tostring(PlayerResource:GetPlayerCount()))
    local commandCount = 0
    for _ in pairs(DebugCallbacks) do
        commandCount = commandCount + 1
    end
    print("[Debug] - Available Commands: " .. tostring(commandCount))
    print("[Debug] - Game Time: " .. tostring(GameRules:GetGameTime()))
    print("[Debug] ===== End Verification =====")
end
function Debug.prototype.announceDebugSystemReady(self)
    print("[Debug] ===== Debug System Ready =====")
    local hero = self:getFirstAvailableHero()
    if hero then
        self:debugOutput(hero, "调试系统已就绪！输入 -help 查看所有命令")
        self:debugOutput(hero, "常用命令: -cd <秒数>, -regen, -练功, -auto_spawn, -training")
    else
        print("[Debug] No hero available for startup message")
    end
    print("[Debug] Debug system fully operational")
    print("[Debug] Available commands: -help, -training, -cd, -regen, -练功, -auto_spawn")
    print("[Debug] Console commands: debug_test(), debug_status(), debug_help()")
    print("[Debug] Training console commands: training_cd(3), training_regen(), training_practice()")
    print("[Debug] ===== End Ready Announcement =====")
end
function Debug.prototype.getFirstAvailableHero(self)
    do
        local function ____catch(____error)
            print("[Debug] Error getting hero: " .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            do
                local playerId = 0
                while playerId < PlayerResource:GetPlayerCount() do
                    if PlayerResource:IsValidPlayer(playerId) then
                        local hero = PlayerResource:GetSelectedHeroEntity(playerId)
                        if hero and not hero:IsNull() then
                            return true, hero
                        end
                    end
                    playerId = playerId + 1
                end
            end
            local hero = HeroList:GetHero(0)
            if hero and not hero:IsNull() then
                return true, hero
            end
            return true, nil
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
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
            local commandList = ""
            local count = 0
            for cmd in pairs(DebugCallbacks) do
                if count >= 8 then
                    break
                end
                if count > 0 then
                    commandList = commandList .. ", "
                end
                commandList = commandList .. cmd
                count = count + 1
            end
            print("[Debug] Available commands: " .. commandList)
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
            print("[Debug] FAILED to create global debug functions: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            print("[Debug] Creating global debug functions...")
            local globalEnv = getfenv()
            globalEnv.debug_simple_test = function()
                print("[Debug] ===== SIMPLE TEST CALLED =====")
                print("[Debug] If you see this, console commands work!")
                local hero = self:getFirstAvailableHero()
                if hero then
                    print("[Debug] Hero found: " .. hero:GetUnitName())
                else
                    print("[Debug] No hero found")
                end
                print("[Debug] ===== END SIMPLE TEST =====")
            end
            globalEnv.debug_status = function()
                print("[Debug] ===== Global debug_status() called =====")
                local hero = self:getFirstAvailableHero()
                if DebugCallbacks["-debug_status"] then
                    DebugCallbacks["-debug_status"]:func(hero)
                    print("[Debug] debug_status command executed")
                else
                    print("[Debug] ERROR: debug_status callback not found")
                end
                print("[Debug] ===== End global debug_status =====")
            end
            globalEnv.debug_help = function()
                print("[Debug] ===== Global debug_help() called =====")
                local hero = self:getFirstAvailableHero()
                if DebugCallbacks["-help"] then
                    DebugCallbacks["-help"]:func(hero)
                    print("[Debug] help command executed")
                else
                    print("[Debug] ERROR: help callback not found")
                end
                print("[Debug] ===== End global debug_help =====")
            end
            globalEnv.debug_test = function()
                print("[Debug] ===== Global debug_test() called =====")
                local hero = self:getFirstAvailableHero()
                self:debugOutput(hero, "Global debug test works! Debug system is functional.")
                print("[Debug] debug test completed")
                print("[Debug] ===== End global debug_test =====")
            end
            globalEnv.debug_reload = function()
                print("[Debug] ===== Debug Reload =====")
                SendToConsole("script_reload")
                print("[Debug] Script reload command sent")
                print("[Debug] ===== End Debug Reload =====")
            end
            print("[Debug] Global debug functions created successfully")
            print("[Debug] Available functions: debug_test(), debug_status(), debug_help(), debug_reload()")
            print("[Debug] ===================================")
            print("[Debug] DOTA2 CONSOLE USAGE INSTRUCTIONS:")
            print("[Debug] 1. Type \"debug_test()\" to test the debug system")
            print("[Debug] 2. Type \"debug_status()\" to check system status")
            print("[Debug] 3. Type \"debug_help()\" to see all available commands")
            print("[Debug] 4. Chat commands like -debug_status work in-game")
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
            if not keys.text then
                print("[Debug] No text in chat message")
                return true
            end
            local text = __TS__StringTrim(keys.text)
            if not __TS__StringStartsWith(text, "-") then
                return true
            end
            local strs = __TS__StringSplit(text, " ")
            local cmd = strs[1]
            local args = __TS__ArraySlice(strs, 1)
            local argsList = ""
            do
                local i = 0
                while i < #args do
                    if i > 0 then
                        argsList = argsList .. ", "
                    end
                    argsList = argsList .. args[i + 1]
                    i = i + 1
                end
            end
            print(((("[Debug] Parsed - Command: \"" .. cmd) .. "\", Args: [") .. argsList) .. "]")
            local playerId = keys.playerid
            local hero = nil
            if PlayerResource:IsValidPlayer(playerId) then
                hero = PlayerResource:GetSelectedHeroEntity(playerId)
            end
            if not hero or hero:IsNull() then
                hero = self:getFirstAvailableHero()
            end
            local ____print_133 = print
            local ____hero_132
            if hero then
                ____hero_132 = hero:GetUnitName()
            else
                ____hero_132 = "null"
            end
            ____print_133((("[Debug] Hero found: " .. ____hero_132) .. " for player ") .. tostring(playerId))
            if cmd == "-test" then
                print("[Debug] Test command received!")
                self:debugOutput(hero, "Test command works! Debug system is operational.")
                return true
            end
            local alwaysAvailableCommands = {"-debug_status", "-help", "-debug_enable"}
            if __TS__ArrayIncludes(alwaysAvailableCommands, cmd) then
                print("[Debug] Executing always-available command: " .. cmd)
                if DebugCallbacks[cmd] then
                    DebugCallbacks[cmd]:func(
                        hero,
                        unpack(args)
                    )
                else
                    print("[Debug] Callback not found for command: " .. cmd)
                    self:debugOutput(hero, ("Command " .. cmd) .. " is not implemented")
                end
                return true
            end
            if cmd == "-debug_enable" then
                self:_toggleDebugMode(true)
                self:debugOutput(hero, "Debug mode enabled!")
                return true
            end
            if not self.DebugEnabled then
                print("[Debug] Debug mode not enabled for command:", cmd)
                self:debugOutput(hero, "调试模式未启用。使用 -debug_enable 启用或使用 -test 测试。命令: " .. cmd)
                return true
            end
            if DebugCallbacks[cmd] then
                print("[Debug] Executing command: " .. cmd)
                do
                    local function ____catch(cmdError)
                        print((("[Debug] Error executing command " .. cmd) .. ": ") .. tostring(cmdError))
                        self:debugOutput(
                            hero,
                            "命令执行错误: " .. tostring(cmdError)
                        )
                    end
                    local ____try, ____hasReturned = pcall(function()
                        DebugCallbacks[cmd]:func(
                            hero,
                            unpack(args)
                        )
                        print(("[Debug] Command " .. cmd) .. " executed successfully")
                    end)
                    if not ____try then
                        ____catch(____hasReturned)
                    end
                end
            else
                print("[Debug] Unknown command: " .. cmd)
                self:debugOutput(hero, ("未知命令: " .. cmd) .. "。使用 -help 查看可用命令。")
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
                    local updatedStats = {
                        totalErrors = currentStats.totalErrors,
                        recentErrors = currentStats.recentErrors,
                        cacheSize = currentStats.cacheSize,
                        queueSize = currentStats.queueSize,
                        isInitialized = currentStats.isInitialized,
                        lastUpdate = GameRules:GetGameTime() * 1000
                    }
                    GameRules.XNetTable:SetTableValue("error_reports", "stats", updatedStats)
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
