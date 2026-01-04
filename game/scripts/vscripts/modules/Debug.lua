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
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["25"] = 1,["26"] = 1,["27"] = 3,["28"] = 3,["29"] = 8,["31"] = 8,["32"] = 9,["33"] = 9,["34"] = 11,["35"] = 12,["36"] = 13,["37"] = 13,["39"] = 16,["41"] = 16,["43"] = 9,["44"] = 8,["45"] = 19,["46"] = 19,["47"] = 21,["48"] = 22,["49"] = 23,["50"] = 23,["52"] = 25,["54"] = 25,["56"] = 19,["57"] = 8,["58"] = 28,["59"] = 28,["60"] = 30,["61"] = 31,["62"] = 32,["63"] = 32,["65"] = 34,["67"] = 34,["69"] = 28,["70"] = 8,["71"] = 37,["72"] = 37,["73"] = 39,["74"] = 40,["75"] = 41,["76"] = 41,["78"] = 44,["79"] = 45,["80"] = 45,["83"] = 47,["84"] = 47,["87"] = 51,["88"] = 51,["89"] = 52,["90"] = 52,["92"] = 55,["93"] = 56,["94"] = 56,["95"] = 56,["96"] = 56,["97"] = 56,["99"] = 59,["101"] = 59,["103"] = 60,["104"] = 60,["106"] = 37,["107"] = 8,["108"] = 63,["109"] = 63,["110"] = 65,["111"] = 66,["112"] = 67,["113"] = 68,["114"] = 69,["116"] = 63,["117"] = 8,["118"] = 73,["119"] = 73,["120"] = 75,["121"] = 76,["122"] = 77,["123"] = 77,["125"] = 78,["126"] = 78,["127"] = 78,["129"] = 78,["130"] = 78,["132"] = 78,["133"] = 78,["134"] = 78,["135"] = 78,["136"] = 78,["138"] = 79,["139"] = 79,["140"] = 79,["142"] = 79,["143"] = 79,["145"] = 79,["146"] = 79,["147"] = 79,["148"] = 79,["149"] = 79,["151"] = 80,["152"] = 80,["153"] = 80,["154"] = 80,["155"] = 80,["157"] = 81,["158"] = 81,["159"] = 81,["160"] = 81,["161"] = 81,["163"] = 82,["164"] = 82,["165"] = 82,["166"] = 82,["167"] = 82,["168"] = 82,["169"] = 82,["170"] = 82,["171"] = 82,["173"] = 83,["174"] = 83,["176"] = 84,["177"] = 84,["178"] = 84,["179"] = 84,["180"] = 84,["182"] = 85,["183"] = 86,["184"] = 86,["185"] = 86,["186"] = 86,["187"] = 86,["190"] = 73,["191"] = 8,["192"] = 90,["193"] = 90,["194"] = 92,["195"] = 92,["196"] = 93,["197"] = 94,["198"] = 95,["199"] = 96,["203"] = 101,["204"] = 102,["205"] = 103,["206"] = 104,["207"] = 105,["208"] = 106,["209"] = 107,["211"] = 110,["212"] = 111,["214"] = 90,["215"] = 8,["216"] = 115,["217"] = 115,["218"] = 117,["219"] = 118,["220"] = 119,["221"] = 115,["222"] = 8,["223"] = 122,["224"] = 122,["225"] = 124,["226"] = 125,["227"] = 126,["228"] = 122,["229"] = 8,["230"] = 129,["231"] = 129,["232"] = 131,["233"] = 131,["234"] = 132,["235"] = 133,["236"] = 134,["237"] = 135,["238"] = 135,["240"] = 129,["241"] = 8,["242"] = 138,["243"] = 138,["244"] = 140,["245"] = 140,["246"] = 141,["247"] = 142,["248"] = 143,["249"] = 144,["250"] = 144,["252"] = 138,["253"] = 8,["254"] = 147,["255"] = 147,["256"] = 149,["257"] = 149,["258"] = 150,["259"] = 150,["260"] = 150,["261"] = 150,["262"] = 150,["263"] = 151,["264"] = 152,["265"] = 153,["266"] = 154,["267"] = 155,["268"] = 155,["269"] = 155,["270"] = 155,["271"] = 155,["272"] = 155,["273"] = 155,["274"] = 156,["275"] = 157,["276"] = 158,["277"] = 159,["278"] = 160,["279"] = 161,["280"] = 162,["282"] = 164,["283"] = 165,["284"] = 166,["286"] = 157,["287"] = 147,["288"] = 8,["289"] = 171,["290"] = 171,["291"] = 173,["292"] = 174,["293"] = 175,["294"] = 176,["295"] = 177,["296"] = 177,["297"] = 177,["298"] = 177,["299"] = 177,["302"] = 179,["303"] = 179,["306"] = 171,["307"] = 8,["308"] = 183,["309"] = 183,["310"] = 185,["311"] = 186,["312"] = 187,["313"] = 188,["314"] = 189,["315"] = 189,["318"] = 191,["319"] = 191,["322"] = 183,["323"] = 8,["324"] = 195,["325"] = 195,["326"] = 197,["327"] = 197,["328"] = 198,["329"] = 199,["330"] = 202,["331"] = 204,["332"] = 205,["333"] = 205,["334"] = 205,["335"] = 205,["336"] = 205,["337"] = 206,["338"] = 206,["340"] = 207,["341"] = 208,["342"] = 209,["343"] = 209,["344"] = 209,["345"] = 209,["346"] = 209,["347"] = 210,["348"] = 210,["350"] = 211,["352"] = 213,["353"] = 213,["355"] = 214,["358"] = 195,["359"] = 8,["360"] = 219,["361"] = 219,["362"] = 221,["363"] = 221,["364"] = 222,["365"] = 223,["366"] = 225,["367"] = 225,["369"] = 226,["370"] = 229,["371"] = 229,["372"] = 229,["373"] = 230,["374"] = 231,["375"] = 229,["376"] = 229,["377"] = 219,["378"] = 8,["379"] = 235,["380"] = 235,["381"] = 237,["382"] = 237,["383"] = 238,["384"] = 239,["385"] = 240,["386"] = 241,["387"] = 241,["388"] = 241,["389"] = 241,["390"] = 241,["391"] = 241,["392"] = 241,["393"] = 241,["394"] = 241,["395"] = 247,["396"] = 247,["399"] = 249,["400"] = 249,["403"] = 235,["404"] = 8,["405"] = 253,["406"] = 253,["407"] = 255,["408"] = 256,["409"] = 257,["410"] = 257,["411"] = 257,["412"] = 257,["413"] = 257,["414"] = 257,["415"] = 257,["416"] = 264,["417"] = 264,["418"] = 264,["419"] = 264,["420"] = 264,["422"] = 253,["423"] = 8,["424"] = 267,["425"] = 267,["426"] = 269,["427"] = 270,["428"] = 271,["429"] = 272,["430"] = 272,["436"] = 281,["437"] = 282,["438"] = 282,["439"] = 282,["440"] = 282,["441"] = 282,["442"] = 282,["443"] = 282,["444"] = 282,["445"] = 282,["447"] = 289,["448"] = 289,["452"] = 278,["453"] = 279,["459"] = 267,["460"] = 8,["461"] = 293,["462"] = 293,["463"] = 295,["464"] = 295,["465"] = 296,["466"] = 297,["467"] = 298,["468"] = 299,["469"] = 300,["470"] = 300,["471"] = 300,["472"] = 300,["473"] = 300,["475"] = 302,["476"] = 303,["477"] = 303,["478"] = 303,["479"] = 303,["480"] = 303,["483"] = 306,["485"] = 293,["486"] = 8,["487"] = 310,["488"] = 310,["489"] = 312,["490"] = 313,["491"] = 314,["492"] = 315,["494"] = 317,["496"] = 310,["497"] = 8,["498"] = 321,["499"] = 321,["500"] = 323,["501"] = 323,["502"] = 324,["503"] = 326,["504"] = 327,["505"] = 330,["506"] = 331,["507"] = 333,["509"] = 336,["510"] = 337,["511"] = 337,["512"] = 337,["513"] = 337,["514"] = 337,["516"] = 339,["518"] = 321,["519"] = 8,["520"] = 343,["521"] = 343,["522"] = 345,["523"] = 345,["524"] = 346,["525"] = 347,["526"] = 349,["527"] = 350,["530"] = 354,["531"] = 355,["532"] = 356,["533"] = 356,["534"] = 356,["535"] = 356,["536"] = 356,["538"] = 358,["540"] = 343,["541"] = 8,["542"] = 362,["543"] = 362,["544"] = 364,["545"] = 364,["546"] = 365,["547"] = 366,["550"] = 370,["551"] = 371,["552"] = 372,["553"] = 373,["554"] = 374,["556"] = 376,["559"] = 379,["560"] = 380,["561"] = 380,["562"] = 380,["563"] = 380,["564"] = 380,["565"] = 381,["566"] = 381,["567"] = 381,["568"] = 381,["569"] = 381,["571"] = 362,["572"] = 8,["573"] = 385,["574"] = 385,["575"] = 387,["576"] = 387,["577"] = 388,["578"] = 389,["579"] = 390,["580"] = 390,["584"] = 394,["586"] = 395,["587"] = 405,["588"] = 396,["590"] = 397,["591"] = 398,["592"] = 398,["596"] = 400,["598"] = 401,["599"] = 402,["600"] = 402,["604"] = 404,["606"] = 405,["607"] = 406,["608"] = 406,["610"] = 407,["611"] = 407,["612"] = 407,["613"] = 407,["614"] = 407,["616"] = 408,["617"] = 409,["618"] = 409,["619"] = 409,["620"] = 409,["621"] = 409,["623"] = 410,["624"] = 410,["625"] = 410,["626"] = 410,["627"] = 410,["632"] = 413,["634"] = 414,["635"] = 415,["636"] = 415,["637"] = 415,["638"] = 415,["639"] = 415,["644"] = 418,["645"] = 418,["649"] = 385,["650"] = 8,["651"] = 422,["652"] = 422,["653"] = 424,["654"] = 424,["655"] = 425,["656"] = 426,["657"] = 426,["658"] = 427,["659"] = 427,["663"] = 431,["664"] = 432,["665"] = 433,["666"] = 435,["667"] = 436,["668"] = 436,["670"] = 437,["671"] = 437,["677"] = 466,["678"] = 466,["679"] = 466,["680"] = 466,["681"] = 466,["685"] = 442,["686"] = 443,["688"] = 445,["689"] = 445,["690"] = 446,["691"] = 446,["692"] = 446,["693"] = 446,["694"] = 446,["695"] = 452,["696"] = 452,["697"] = 452,["698"] = 452,["699"] = 452,["700"] = 452,["701"] = 452,["702"] = 452,["703"] = 453,["704"] = 455,["706"] = 456,["707"] = 456,["708"] = 457,["709"] = 456,["713"] = 460,["715"] = 445,["718"] = 464,["719"] = 464,["720"] = 464,["721"] = 464,["722"] = 464,["729"] = 422,["730"] = 8,["731"] = 470,["732"] = 470,["733"] = 472,["734"] = 472,["735"] = 473,["736"] = 474,["739"] = 478,["740"] = 479,["742"] = 481,["743"] = 487,["744"] = 482,["746"] = 483,["747"] = 484,["750"] = 487,["751"] = 488,["752"] = 489,["754"] = 491,["758"] = 494,["760"] = 495,["761"] = 496,["764"] = 498,["766"] = 499,["767"] = 500,["768"] = 501,["772"] = 504,["775"] = 470,["776"] = 8,["777"] = 508,["778"] = 508,["779"] = 510,["780"] = 511,["781"] = 511,["782"] = 512,["785"] = 516,["786"] = 517,["787"] = 517,["788"] = 517,["789"] = 517,["790"] = 517,["791"] = 517,["792"] = 517,["793"] = 517,["794"] = 517,["795"] = 517,["796"] = 517,["797"] = 529,["798"] = 530,["799"] = 531,["800"] = 532,["803"] = 536,["804"] = 536,["805"] = 536,["806"] = 536,["807"] = 536,["808"] = 508,["809"] = 8,["810"] = 539,["811"] = 539,["812"] = 541,["813"] = 541,["814"] = 542,["815"] = 543,["818"] = 547,["819"] = 547,["820"] = 548,["823"] = 552,["825"] = 553,["826"] = 555,["827"] = 554,["829"] = 555,["830"] = 556,["831"] = 557,["832"] = 558,["833"] = 560,["834"] = 567,["835"] = 568,["836"] = 568,["837"] = 568,["838"] = 568,["839"] = 568,["841"] = 570,["845"] = 574,["847"] = 575,["848"] = 576,["851"] = 579,["853"] = 580,["854"] = 581,["855"] = 582,["856"] = 583,["857"] = 583,["858"] = 583,["859"] = 583,["860"] = 583,["861"] = 584,["862"] = 584,["863"] = 584,["864"] = 584,["865"] = 584,["866"] = 585,["867"] = 585,["868"] = 585,["869"] = 585,["870"] = 585,["875"] = 590,["876"] = 591,["879"] = 539,["880"] = 8,["881"] = 595,["882"] = 595,["883"] = 597,["884"] = 597,["885"] = 598,["886"] = 599,["889"] = 603,["890"] = 603,["891"] = 604,["894"] = 608,["896"] = 609,["897"] = 611,["898"] = 610,["900"] = 611,["901"] = 612,["902"] = 613,["903"] = 615,["904"] = 621,["905"] = 622,["906"] = 622,["907"] = 622,["908"] = 622,["909"] = 622,["910"] = 623,["911"] = 624,["914"] = 627,["918"] = 631,["920"] = 632,["921"] = 633,["924"] = 636,["926"] = 637,["927"] = 638,["928"] = 639,["929"] = 640,["930"] = 640,["931"] = 640,["932"] = 640,["933"] = 640,["934"] = 641,["935"] = 641,["936"] = 641,["937"] = 641,["938"] = 641,["939"] = 642,["940"] = 642,["941"] = 642,["942"] = 642,["943"] = 642,["948"] = 647,["949"] = 648,["952"] = 595,["953"] = 8,["954"] = 652,["955"] = 652,["956"] = 654,["957"] = 655,["958"] = 655,["959"] = 656,["962"] = 660,["963"] = 661,["964"] = 662,["966"] = 664,["968"] = 652,["969"] = 8,["970"] = 668,["971"] = 668,["972"] = 670,["973"] = 671,["974"] = 671,["975"] = 672,["978"] = 676,["979"] = 677,["980"] = 678,["982"] = 680,["984"] = 668,["985"] = 8,["986"] = 684,["987"] = 684,["988"] = 686,["989"] = 686,["990"] = 687,["991"] = 687,["992"] = 688,["995"] = 692,["996"] = 693,["997"] = 694,["998"] = 695,["1001"] = 699,["1002"] = 700,["1003"] = 701,["1004"] = 702,["1006"] = 704,["1009"] = 707,["1011"] = 684,["1012"] = 8,["1013"] = 711,["1014"] = 711,["1015"] = 713,["1016"] = 713,["1017"] = 714,["1018"] = 715,["1021"] = 719,["1022"] = 719,["1023"] = 720,["1026"] = 724,["1028"] = 725,["1029"] = 738,["1030"] = 726,["1032"] = 727,["1033"] = 728,["1036"] = 731,["1038"] = 732,["1039"] = 733,["1042"] = 736,["1044"] = 737,["1045"] = 738,["1046"] = 739,["1049"] = 742,["1051"] = 743,["1052"] = 744,["1053"] = 745,["1057"] = 749,["1058"] = 750,["1061"] = 711,["1062"] = 8,["1063"] = 754,["1064"] = 754,["1065"] = 756,["1066"] = 756,["1067"] = 757,["1068"] = 758,["1071"] = 762,["1072"] = 762,["1073"] = 763,["1076"] = 767,["1077"] = 768,["1079"] = 770,["1080"] = 776,["1081"] = 771,["1083"] = 772,["1084"] = 773,["1086"] = 775,["1087"] = 776,["1088"] = 777,["1089"] = 777,["1090"] = 777,["1091"] = 777,["1092"] = 777,["1095"] = 780,["1097"] = 781,["1098"] = 782,["1101"] = 785,["1103"] = 786,["1104"] = 787,["1105"] = 788,["1106"] = 789,["1107"] = 790,["1108"] = 790,["1109"] = 790,["1110"] = 790,["1111"] = 790,["1115"] = 794,["1117"] = 795,["1118"] = 796,["1119"] = 797,["1120"] = 798,["1121"] = 798,["1122"] = 798,["1123"] = 798,["1124"] = 798,["1128"] = 802,["1129"] = 803,["1130"] = 804,["1133"] = 754,["1134"] = 8,["1135"] = 808,["1136"] = 808,["1137"] = 810,["1138"] = 810,["1139"] = 811,["1140"] = 812,["1143"] = 816,["1144"] = 816,["1145"] = 817,["1148"] = 821,["1149"] = 822,["1150"] = 823,["1151"] = 824,["1152"] = 824,["1153"] = 824,["1154"] = 824,["1155"] = 824,["1156"] = 825,["1159"] = 829,["1160"] = 830,["1161"] = 831,["1162"] = 831,["1163"] = 831,["1164"] = 831,["1165"] = 831,["1166"] = 808,["1167"] = 8,["1168"] = 834,["1169"] = 834,["1170"] = 836,["1171"] = 837,["1172"] = 838,["1175"] = 842,["1176"] = 842,["1177"] = 843,["1180"] = 847,["1181"] = 848,["1182"] = 849,["1183"] = 834,["1184"] = 8,["1185"] = 852,["1186"] = 852,["1187"] = 854,["1188"] = 855,["1189"] = 856,["1192"] = 860,["1193"] = 860,["1194"] = 861,["1197"] = 866,["1198"] = 867,["1199"] = 868,["1200"] = 870,["1201"] = 871,["1202"] = 872,["1203"] = 873,["1204"] = 852,["1205"] = 8,["1206"] = 876,["1207"] = 876,["1208"] = 878,["1209"] = 879,["1210"] = 879,["1211"] = 880,["1214"] = 884,["1215"] = 885,["1216"] = 886,["1218"] = 888,["1219"] = 889,["1221"] = 876,["1222"] = 8,["1223"] = 893,["1224"] = 893,["1225"] = 895,["1226"] = 896,["1227"] = 896,["1228"] = 897,["1231"] = 901,["1232"] = 902,["1234"] = 905,["1235"] = 905,["1236"] = 906,["1237"] = 907,["1238"] = 908,["1239"] = 909,["1241"] = 905,["1245"] = 914,["1246"] = 914,["1247"] = 915,["1248"] = 916,["1249"] = 917,["1251"] = 914,["1254"] = 921,["1255"] = 893,["1256"] = 8,["1257"] = 924,["1258"] = 924,["1259"] = 926,["1260"] = 926,["1261"] = 927,["1262"] = 927,["1263"] = 928,["1266"] = 932,["1268"] = 933,["1269"] = 933,["1270"] = 934,["1271"] = 933,["1274"] = 937,["1275"] = 937,["1276"] = 937,["1277"] = 937,["1278"] = 937,["1279"] = 924,["1280"] = 8,["1281"] = 940,["1282"] = 940,["1283"] = 942,["1284"] = 942,["1285"] = 943,["1286"] = 943,["1287"] = 944,["1290"] = 948,["1291"] = 949,["1292"] = 951,["1293"] = 952,["1294"] = 953,["1295"] = 954,["1296"] = 954,["1297"] = 954,["1298"] = 954,["1299"] = 954,["1302"] = 940,["1303"] = 8,["1304"] = 959,["1305"] = 959,["1306"] = 961,["1307"] = 961,["1308"] = 962,["1309"] = 963,["1310"] = 964,["1312"] = 966,["1313"] = 987,["1314"] = 967,["1316"] = 969,["1317"] = 970,["1320"] = 972,["1322"] = 974,["1323"] = 975,["1326"] = 977,["1328"] = 978,["1329"] = 979,["1330"] = 980,["1332"] = 982,["1336"] = 985,["1338"] = 987,["1339"] = 988,["1340"] = 988,["1341"] = 988,["1342"] = 988,["1343"] = 988,["1347"] = 959,["1348"] = 8,["1349"] = 993,["1350"] = 993,["1351"] = 995,["1352"] = 995,["1353"] = 996,["1354"] = 998,["1355"] = 998,["1356"] = 999,["1359"] = 1003,["1360"] = 1004,["1362"] = 1006,["1364"] = 993,["1365"] = 8,["1366"] = 8,["1367"] = 1012,["1368"] = 1013,["1369"] = 1012,["1371"] = 1014,["1372"] = 1015,["1373"] = 1019,["1374"] = 1040,["1375"] = 1042,["1376"] = 1043,["1377"] = 1044,["1378"] = 1045,["1379"] = 1046,["1380"] = 1047,["1381"] = 1050,["1382"] = 1051,["1383"] = 1054,["1384"] = 1055,["1386"] = 1059,["1387"] = 1060,["1388"] = 1061,["1390"] = 1064,["1391"] = 1065,["1392"] = 1068,["1395"] = 1079,["1398"] = 1072,["1399"] = 1073,["1400"] = 1073,["1401"] = 1073,["1402"] = 1074,["1403"] = 1075,["1404"] = 1073,["1405"] = 1073,["1406"] = 1073,["1407"] = 1077,["1413"] = 1083,["1414"] = 1083,["1415"] = 1083,["1416"] = 1084,["1417"] = 1085,["1420"] = 1094,["1423"] = 1087,["1424"] = 1088,["1425"] = 1088,["1426"] = 1088,["1427"] = 1089,["1428"] = 1090,["1429"] = 1088,["1430"] = 1088,["1431"] = 1088,["1432"] = 1092,["1439"] = 1097,["1441"] = 1101,["1442"] = 1102,["1443"] = 1103,["1444"] = 1104,["1445"] = 1105,["1446"] = 1106,["1447"] = 1108,["1448"] = 1083,["1449"] = 1083,["1450"] = 1112,["1451"] = 1115,["1452"] = 1115,["1453"] = 1115,["1454"] = 1116,["1455"] = 1117,["1456"] = 1117,["1457"] = 1117,["1458"] = 1117,["1459"] = 1117,["1460"] = 1117,["1461"] = 1117,["1462"] = 1117,["1463"] = 1118,["1464"] = 1119,["1465"] = 1120,["1466"] = 1122,["1467"] = 1115,["1468"] = 1115,["1469"] = 1125,["1470"] = 1128,["1471"] = 1129,["1472"] = 1129,["1473"] = 1129,["1474"] = 1130,["1475"] = 1131,["1476"] = 1129,["1477"] = 1129,["1478"] = 1134,["1479"] = 1134,["1480"] = 1134,["1481"] = 1135,["1482"] = 1136,["1483"] = 1134,["1484"] = 1134,["1485"] = 1139,["1486"] = 1139,["1487"] = 1139,["1488"] = 1140,["1489"] = 1141,["1490"] = 1139,["1491"] = 1139,["1492"] = 1145,["1493"] = 1145,["1494"] = 1145,["1495"] = 1146,["1496"] = 1147,["1497"] = 1148,["1498"] = 1149,["1499"] = 1150,["1501"] = 1152,["1503"] = 1156,["1504"] = 1157,["1505"] = 1158,["1506"] = 1160,["1507"] = 1161,["1508"] = 1145,["1509"] = 1145,["1510"] = 1165,["1511"] = 1165,["1512"] = 1165,["1513"] = 1166,["1514"] = 1165,["1515"] = 1165,["1516"] = 1038,["1517"] = 1026,["1518"] = 1028,["1519"] = 1029,["1521"] = 1033,["1522"] = 1034,["1524"] = 1026,["1525"] = 1173,["1528"] = 1189,["1531"] = 1175,["1532"] = 1176,["1533"] = 1177,["1534"] = 1178,["1535"] = 1179,["1536"] = 1180,["1537"] = 1180,["1538"] = 1180,["1539"] = 1180,["1541"] = 1180,["1543"] = 1180,["1544"] = 1181,["1545"] = 1181,["1546"] = 1181,["1547"] = 1181,["1548"] = 1181,["1549"] = 1181,["1550"] = 1181,["1551"] = 1181,["1552"] = 1182,["1553"] = 1185,["1554"] = 1186,["1555"] = 1186,["1556"] = 1186,["1557"] = 1186,["1564"] = 1173,["1565"] = 1196,["1568"] = 1253,["1571"] = 1200,["1572"] = 1201,["1573"] = 1202,["1574"] = 1203,["1575"] = 1204,["1576"] = 1205,["1578"] = 1207,["1580"] = 1209,["1581"] = 1200,["1582"] = 1213,["1583"] = 1214,["1584"] = 1215,["1585"] = 1216,["1586"] = 1217,["1587"] = 1218,["1589"] = 1220,["1591"] = 1222,["1592"] = 1213,["1593"] = 1225,["1594"] = 1226,["1595"] = 1227,["1596"] = 1228,["1597"] = 1229,["1598"] = 1230,["1600"] = 1232,["1602"] = 1234,["1603"] = 1225,["1604"] = 1237,["1605"] = 1238,["1606"] = 1239,["1607"] = 1240,["1608"] = 1241,["1609"] = 1242,["1610"] = 1237,["1611"] = 1245,["1612"] = 1246,["1613"] = 1247,["1614"] = 1248,["1615"] = 1249,["1616"] = 1250,["1617"] = 1251,["1623"] = 1196,["1624"] = 1257,["1625"] = 1258,["1626"] = 1259,["1628"] = 1261,["1630"] = 1263,["1631"] = 1264,["1633"] = 1266,["1635"] = 1257,["1636"] = 1270,["1639"] = 1332,["1642"] = 1272,["1643"] = 1273,["1644"] = 1273,["1645"] = 1273,["1646"] = 1273,["1647"] = 1275,["1648"] = 1276,["1649"] = 1277,["1651"] = 1280,["1652"] = 1281,["1653"] = 1282,["1654"] = 1284,["1655"] = 1287,["1656"] = 1288,["1657"] = 1288,["1658"] = 1288,["1659"] = 1288,["1661"] = 1288,["1663"] = 1288,["1664"] = 1291,["1665"] = 1292,["1666"] = 1293,["1667"] = 1294,["1669"] = 1298,["1670"] = 1299,["1671"] = 1300,["1672"] = 1301,["1673"] = 1301,["1674"] = 1301,["1675"] = 1301,["1677"] = 1303,["1679"] = 1305,["1681"] = 1309,["1682"] = 1310,["1683"] = 1311,["1684"] = 1312,["1686"] = 1316,["1687"] = 1317,["1688"] = 1318,["1689"] = 1319,["1691"] = 1323,["1692"] = 1324,["1693"] = 1325,["1694"] = 1325,["1695"] = 1325,["1696"] = 1325,["1698"] = 1327,["1699"] = 1328,["1706"] = 1271,["1709"] = 1270,["1710"] = 1336,["1713"] = 1378,["1716"] = 1338,["1717"] = 1339,["1718"] = 1340,["1720"] = 1343,["1721"] = 1346,["1722"] = 1347,["1723"] = 1348,["1724"] = 1348,["1725"] = 1348,["1726"] = 1348,["1727"] = 1350,["1728"] = 1353,["1729"] = 1353,["1730"] = 1353,["1731"] = 1353,["1732"] = 1353,["1733"] = 1353,["1734"] = 1353,["1735"] = 1353,["1736"] = 1353,["1737"] = 1350,["1739"] = 1368,["1740"] = 1369,["1741"] = 1370,["1742"] = 1370,["1743"] = 1370,["1744"] = 1370,["1745"] = 1370,["1746"] = 1370,["1747"] = 1370,["1748"] = 1370,["1749"] = 1370,["1757"] = 1337,["1760"] = 1336,["1761"] = 1012,["1762"] = 1013});
local ____exports = {}
local ____tstl_2Dutils = require("utils.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local ____tween = require("utils.tween")
local tween = ____tween.tween
local DebugCallbacks
--- 所有的测试指令的回调
DebugCallbacks = {
    ["-show_custom_ui"] = {
        desc = "显示自定义UI面板",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "Showing custom UI panel")
            end
            local ____opt_2 = GameRules.CustomUIHandler
            if ____opt_2 ~= nil then
                ____opt_2:handleDebugUICommand("show_custom")
            end
        end
    },
    ["-show_simple_ui"] = {
        desc = "显示简单按钮UI",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "Showing simple button UI")
            end
            local ____opt_6 = GameRules.CustomUIHandler
            if ____opt_6 ~= nil then
                ____opt_6:handleDebugUICommand("show_simple")
            end
        end
    },
    ["-hide_all_ui"] = {
        desc = "隐藏所有自定义UI",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "Hiding all custom UI")
            end
            local ____opt_10 = GameRules.CustomUIHandler
            if ____opt_10 ~= nil then
                ____opt_10:handleDebugUICommand("hide_all")
            end
        end
    },
    ["-ui_test"] = {
        desc = "测试UI系统集成",
        func = function(____, hero)
            local ____debug = GameRules.DebugInstance or nil
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "=== UI System Test ===")
            end
            if GameRules.CustomUIHandler then
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "CustomUIHandler: ✓ Initialized")
                end
            else
                if ____debug ~= nil then
                    ____debug:debugOutput(hero, "CustomUIHandler: ✗ Not found")
                end
            end
            local ____opt_18 = GameRules.GameModeManager
            local currentMode = ____opt_18 and ____opt_18:getCurrentMode() or "unknown"
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "Current Game Mode: " .. currentMode)
            end
            local isToolsMode = IsInToolsMode()
            if ____debug ~= nil then
                ____debug:debugOutput(
                    hero,
                    "Tools Mode: " .. tostring(isToolsMode)
                )
            end
            local ____opt_24 = GameRules.CustomUIHandler
            if ____opt_24 ~= nil then
                ____opt_24:updateClientUI()
            end
            if ____debug ~= nil then
                ____debug:debugOutput(hero, "UI data update sent to clients")
            end
        end
    },
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
                local ____opt_30_debugOutput_35 = ____debug.debugOutput
                local ____hero_34 = hero
                local ____opt_result_33
                if ____debug ~= nil then
                    ____opt_result_33 = ____debug.DebugEnabled
                end
                ____opt_30_debugOutput_35(
                    ____debug,
                    ____hero_34,
                    "Debug Enabled: " .. tostring(____opt_result_33 or false)
                )
            end
            if ____debug ~= nil then
                local ____opt_37_debugOutput_42 = ____debug.debugOutput
                local ____hero_41 = hero
                local ____opt_result_40
                if ____debug ~= nil then
                    ____opt_result_40 = ____debug.outputToConsole
                end
                ____opt_37_debugOutput_42(
                    ____debug,
                    ____hero_41,
                    "Console Output: " .. tostring(____opt_result_40 or false)
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
                local ____opt_48_debugOutput_52 = ____debug.debugOutput
                local ____hero_51 = hero
                local ____opt_49 = GameRules.GameModeManager
                ____opt_48_debugOutput_52(
                    ____debug,
                    ____hero_51,
                    "Game Mode: " .. (____opt_49 and ____opt_49:getCurrentMode() or "unknown")
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
                local ____switch72 = action
                local status, settings
                local ____cond72 = ____switch72 == "start"
                if ____cond72 then
                    GameRules.TrainingMode:activate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode activated")
                    end
                    break
                end
                ____cond72 = ____cond72 or ____switch72 == "stop"
                if ____cond72 then
                    GameRules.TrainingMode:deactivate()
                    if ____debug ~= nil then
                        ____debug:debugOutput(hero, "Training mode deactivated")
                    end
                    break
                end
                ____cond72 = ____cond72 or ____switch72 == "status"
                if ____cond72 then
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
                ____cond72 = ____cond72 or ____switch72 == "settings"
                if ____cond72 then
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
            local ____opt_108 = GameRules.GameModeManager
            if not (____opt_108 and ____opt_108:isTrainingMode()) then
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
                local ____switch87 = action
                local success
                local ____cond87 = ____switch87 == "start"
                if ____cond87 then
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
                ____cond87 = ____cond87 or ____switch87 == "stop"
                if ____cond87 then
                    GameRules.TrainingMode:stopCurrentTest()
                    Say(hero, "Stopped current test scenario", true)
                    break
                end
                ____cond87 = ____cond87 or ____switch87 == "list"
                if ____cond87 then
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
            local ____opt_120 = GameRules.GameModeManager
            if not (____opt_120 and ____opt_120:isTrainingMode()) then
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
            local ____opt_122 = GameRules.GameModeManager
            if not (____opt_122 and ____opt_122:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            repeat
                local ____switch99 = action
                local unitType, count, level, interval, success, status
                local ____cond99 = ____switch99 == "start"
                if ____cond99 then
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
                ____cond99 = ____cond99 or ____switch99 == "stop"
                if ____cond99 then
                    GameRules.TrainingMode:stopAutoSpawn()
                    Say(hero, "Auto spawn stopped", true)
                    break
                end
                ____cond99 = ____cond99 or ____switch99 == "status"
                if ____cond99 then
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
            local ____opt_124 = GameRules.GameModeManager
            if not (____opt_124 and ____opt_124:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            repeat
                local ____switch106 = action
                local count, health, invulnerable, success, status
                local ____cond106 = ____switch106 == "start"
                if ____cond106 then
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
                ____cond106 = ____cond106 or ____switch106 == "stop"
                if ____cond106 then
                    GameRules.TrainingMode:stopAutoDummy()
                    Say(hero, "Auto dummy stopped", true)
                    break
                end
                ____cond106 = ____cond106 or ____switch106 == "status"
                if ____cond106 then
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
            local ____opt_126 = GameRules.GameModeManager
            if not (____opt_126 and ____opt_126:isTrainingMode()) then
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
            local ____opt_128 = GameRules.GameModeManager
            if not (____opt_128 and ____opt_128:isTrainingMode()) then
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
            local ____opt_130 = GameRules.GameModeManager
            if not (____opt_130 and ____opt_130:isTrainingMode()) then
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
            local ____opt_132 = GameRules.GameModeManager
            if not (____opt_132 and ____opt_132:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            repeat
                local ____switch129 = action
                local toggleStatus, status
                local ____cond129 = ____switch129 == "on"
                if ____cond129 then
                    GameRules.TrainingMode:enableAutoRegeneration()
                    Say(hero, "Auto regeneration enabled", true)
                    break
                end
                ____cond129 = ____cond129 or ____switch129 == "off"
                if ____cond129 then
                    GameRules.TrainingMode:disableAutoRegeneration()
                    Say(hero, "Auto regeneration disabled", true)
                    break
                end
                ____cond129 = ____cond129 or ____switch129 == "toggle"
                if ____cond129 then
                    GameRules.TrainingMode:toggleAutoRegeneration()
                    toggleStatus = GameRules.TrainingMode:getStatus()
                    Say(hero, "Auto regeneration: " .. (toggleStatus.autoRegeneration.enabled and "ON" or "OFF"), true)
                    break
                end
                ____cond129 = ____cond129 or ____switch129 == "status"
                if ____cond129 then
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
            local ____opt_134 = GameRules.GameModeManager
            if not (____opt_134 and ____opt_134:isTrainingMode()) then
                Say(hero, "This command only works in training mode", true)
                return
            end
            local action = args[1]
            local seconds = __TS__ParseFloat(args[2])
            repeat
                local ____switch133 = action
                local onStatus, toggleStatus, status
                local ____cond133 = ____switch133 == "on"
                if ____cond133 then
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
                ____cond133 = ____cond133 or ____switch133 == "off"
                if ____cond133 then
                    GameRules.TrainingMode:disableCustomCooldowns()
                    Say(hero, "Fast cooldowns disabled", true)
                    break
                end
                ____cond133 = ____cond133 or ____switch133 == "toggle"
                if ____cond133 then
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
                ____cond133 = ____cond133 or ____switch133 == "status"
                if ____cond133 then
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
            local ____opt_136 = GameRules.GameModeManager
            if not (____opt_136 and ____opt_136:isTrainingMode()) then
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
            local ____opt_138 = GameRules.GameModeManager
            if not (____opt_138 and ____opt_138:isTrainingMode()) then
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
            local ____opt_140 = GameRules.GameModeManager
            if not (____opt_140 and ____opt_140:isTrainingMode()) then
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
            local ____opt_142 = GameRules.GameModeManager
            if not (____opt_142 and ____opt_142:isTrainingMode()) then
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
            local ____opt_144 = GameRules.GameModeManager
            if not (____opt_144 and ____opt_144:isTrainingMode()) then
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
            local ____opt_146 = GameRules.GameModeManager
            if not (____opt_146 and ____opt_146:isTrainingMode()) then
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
            local ____opt_148 = GameRules.GameModeManager
            if not (____opt_148 and ____opt_148:isTrainingMode()) then
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
                local ____switch166 = action
                local status
                local ____cond166 = ____switch166 == "activate" or ____switch166 == "start"
                if ____cond166 then
                    autoChess:activate()
                    Say(hero, "自走棋模式已激活", true)
                    break
                end
                ____cond166 = ____cond166 or (____switch166 == "deactivate" or ____switch166 == "stop")
                if ____cond166 then
                    autoChess:deactivate()
                    Say(hero, "自走棋模式已停用", true)
                    break
                end
                ____cond166 = ____cond166 or ____switch166 == "game"
                if ____cond166 then
                    if args[2] == "start" then
                        autoChess:startGame()
                        Say(hero, "自走棋游戏已开始", true)
                    else
                        Say(hero, "用法: -autochess game start", true)
                    end
                    break
                end
                ____cond166 = ____cond166 or ____switch166 == "status"
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
    ["-chess_info"] = {
        desc = "查看棋子信息 chess_info [棋子ID]",
        func = function(____, hero, ...)
            local args = {...}
            local pieceId = args[1]
            local ____opt_152 = GameRules.GameModeManager
            if not (____opt_152 and ____opt_152:isAutoChessMode()) then
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
            local ____print_155 = print
            local ____hero_154
            if hero then
                ____hero_154 = hero:GetUnitName()
            else
                ____hero_154 = "null"
            end
            ____print_155("[Debug] Hero: " .. ____hero_154)
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
            local ____print_157 = print
            local ____hero_156
            if hero then
                ____hero_156 = hero:GetUnitName()
            else
                ____hero_156 = "null"
            end
            ____print_157("[Debug] Hero found: " .. ____hero_156)
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
