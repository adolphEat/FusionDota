local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Set = ____lualib.Set
local __TS__New = ____lualib.__TS__New
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__StringCharAt = ____lualib.__TS__StringCharAt
local __TS__StringSubstring = ____lualib.__TS__StringSubstring
local __TS__ParseInt = ____lualib.__TS__ParseInt
local Map = ____lualib.Map
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["15"] = 6,["16"] = 6,["17"] = 7,["18"] = 7,["19"] = 8,["20"] = 8,["21"] = 8,["22"] = 9,["23"] = 9,["24"] = 11,["25"] = 12,["26"] = 12,["27"] = 13,["28"] = 13,["29"] = 14,["30"] = 14,["31"] = 15,["32"] = 15,["33"] = 16,["34"] = 16,["35"] = 19,["36"] = 20,["37"] = 21,["38"] = 22,["39"] = 81,["40"] = 81,["41"] = 81,["43"] = 86,["44"] = 90,["45"] = 91,["46"] = 92,["47"] = 93,["48"] = 95,["49"] = 99,["50"] = 101,["51"] = 102,["52"] = 103,["53"] = 104,["54"] = 97,["55"] = 107,["56"] = 108,["57"] = 109,["59"] = 111,["60"] = 107,["61"] = 114,["62"] = 115,["63"] = 116,["64"] = 117,["65"] = 118,["66"] = 119,["67"] = 120,["68"] = 114,["69"] = 126,["70"] = 127,["71"] = 128,["74"] = 132,["75"] = 133,["76"] = 134,["79"] = 138,["80"] = 139,["81"] = 141,["82"] = 143,["83"] = 146,["84"] = 126,["85"] = 152,["86"] = 153,["89"] = 157,["90"] = 158,["91"] = 159,["92"] = 161,["93"] = 164,["94"] = 152,["95"] = 170,["96"] = 171,["97"] = 172,["100"] = 176,["101"] = 177,["102"] = 178,["103"] = 181,["104"] = 184,["105"] = 186,["106"] = 189,["107"] = 170,["108"] = 198,["109"] = 199,["110"] = 200,["111"] = 201,["112"] = 204,["113"] = 204,["114"] = 204,["115"] = 205,["116"] = 206,["119"] = 211,["120"] = 214,["121"] = 217,["122"] = 220,["123"] = 223,["124"] = 225,["126"] = 227,["128"] = 231,["129"] = 233,["130"] = 236,["131"] = 198,["132"] = 246,["133"] = 247,["134"] = 248,["135"] = 251,["136"] = 251,["137"] = 251,["138"] = 252,["139"] = 254,["140"] = 257,["143"] = 262,["144"] = 265,["145"] = 268,["146"] = 271,["147"] = 273,["148"] = 276,["149"] = 246,["150"] = 286,["151"] = 287,["152"] = 288,["153"] = 289,["156"] = 293,["157"] = 294,["159"] = 286,["160"] = 301,["161"] = 304,["162"] = 304,["163"] = 304,["164"] = 305,["165"] = 307,["166"] = 310,["167"] = 311,["169"] = 314,["171"] = 317,["174"] = 321,["175"] = 301,["176"] = 328,["177"] = 329,["178"] = 330,["181"] = 333,["182"] = 335,["183"] = 336,["185"] = 339,["186"] = 339,["187"] = 340,["188"] = 341,["189"] = 343,["190"] = 345,["191"] = 345,["192"] = 348,["193"] = 353,["194"] = 354,["196"] = 356,["198"] = 339,["201"] = 360,["202"] = 361,["203"] = 328,["204"] = 369,["205"] = 371,["207"] = 372,["208"] = 372,["209"] = 373,["210"] = 374,["211"] = 375,["214"] = 372,["217"] = 380,["218"] = 381,["220"] = 383,["221"] = 369,["222"] = 389,["223"] = 390,["224"] = 392,["225"] = 393,["226"] = 394,["229"] = 398,["230"] = 399,["232"] = 402,["233"] = 403,["234"] = 389,["235"] = 409,["236"] = 410,["237"] = 411,["240"] = 413,["242"] = 415,["243"] = 415,["244"] = 416,["245"] = 417,["246"] = 419,["247"] = 420,["248"] = 420,["249"] = 421,["250"] = 422,["252"] = 415,["255"] = 409,["256"] = 430,["257"] = 431,["258"] = 432,["261"] = 434,["262"] = 435,["264"] = 438,["265"] = 438,["266"] = 439,["267"] = 440,["268"] = 445,["269"] = 446,["270"] = 438,["273"] = 430,["274"] = 453,["275"] = 454,["276"] = 455,["277"] = 459,["278"] = 460,["279"] = 462,["280"] = 463,["282"] = 466,["283"] = 467,["284"] = 468,["286"] = 471,["287"] = 472,["290"] = 477,["291"] = 478,["292"] = 479,["293"] = 480,["295"] = 484,["296"] = 484,["297"] = 484,["298"] = 485,["299"] = 486,["300"] = 487,["303"] = 491,["304"] = 453,["305"] = 497,["306"] = 498,["307"] = 499,["308"] = 500,["311"] = 504,["312"] = 505,["313"] = 508,["314"] = 509,["315"] = 511,["316"] = 514,["318"] = 518,["319"] = 518,["320"] = 519,["321"] = 520,["322"] = 521,["323"] = 522,["324"] = 524,["325"] = 526,["326"] = 531,["327"] = 533,["329"] = 535,["330"] = 536,["331"] = 537,["332"] = 538,["333"] = 539,["334"] = 540,["335"] = 541,["340"] = 518,["343"] = 549,["345"] = 550,["346"] = 550,["347"] = 552,["348"] = 553,["349"] = 554,["350"] = 555,["351"] = 557,["352"] = 558,["353"] = 563,["354"] = 564,["357"] = 550,["361"] = 570,["362"] = 497,["363"] = 576,["364"] = 577,["365"] = 578,["367"] = 581,["368"] = 581,["369"] = 581,["370"] = 582,["371"] = 582,["372"] = 585,["373"] = 586,["375"] = 590,["376"] = 596,["377"] = 597,["378"] = 598,["380"] = 601,["381"] = 581,["382"] = 581,["383"] = 576,["384"] = 608,["386"] = 609,["387"] = 610,["389"] = 611,["392"] = 613,["394"] = 614,["398"] = 608,["399"] = 622,["400"] = 623,["401"] = 624,["402"] = 625,["404"] = 629,["405"] = 632,["406"] = 635,["407"] = 636,["410"] = 641,["411"] = 641,["412"] = 641,["413"] = 642,["414"] = 643,["415"] = 641,["416"] = 641,["417"] = 622,["418"] = 650,["419"] = 651,["420"] = 651,["421"] = 651,["422"] = 651,["423"] = 651,["424"] = 651,["425"] = 651,["426"] = 651,["427"] = 650,["428"] = 664,["429"] = 665,["430"] = 674,["431"] = 674,["432"] = 674,["433"] = 675,["435"] = 676,["436"] = 677,["438"] = 678,["441"] = 680,["443"] = 681,["446"] = 683,["448"] = 684,["451"] = 686,["453"] = 687,["456"] = 689,["458"] = 690,["462"] = 693,["464"] = 696,["465"] = 664,["466"] = 703,["467"] = 704,["468"] = 709,["469"] = 709,["470"] = 709,["471"] = 709,["472"] = 709,["473"] = 709,["474"] = 709,["475"] = 709,["476"] = 709,["477"] = 709,["478"] = 709,["479"] = 709,["480"] = 709,["481"] = 709,["482"] = 709,["483"] = 709,["484"] = 709,["485"] = 709,["486"] = 709,["487"] = 709,["488"] = 709,["489"] = 709,["490"] = 709,["491"] = 709,["492"] = 709,["493"] = 709,["494"] = 709,["495"] = 709,["496"] = 709,["497"] = 740,["498"] = 740,["499"] = 740,["500"] = 740,["501"] = 740,["502"] = 740,["503"] = 740,["504"] = 740,["505"] = 740,["506"] = 740,["507"] = 740,["508"] = 740,["509"] = 740,["510"] = 740,["511"] = 740,["512"] = 740,["513"] = 740,["514"] = 740,["515"] = 740,["516"] = 740,["517"] = 740,["518"] = 740,["519"] = 740,["520"] = 740,["521"] = 740,["522"] = 740,["523"] = 740,["524"] = 740,["525"] = 740,["526"] = 771,["527"] = 771,["528"] = 771,["529"] = 771,["530"] = 771,["531"] = 771,["532"] = 771,["533"] = 771,["534"] = 771,["535"] = 771,["536"] = 771,["537"] = 771,["538"] = 771,["539"] = 771,["540"] = 771,["541"] = 771,["542"] = 771,["543"] = 771,["544"] = 771,["545"] = 771,["546"] = 771,["547"] = 771,["548"] = 771,["549"] = 771,["550"] = 771,["551"] = 771,["552"] = 771,["553"] = 771,["554"] = 771,["555"] = 802,["556"] = 802,["557"] = 802,["558"] = 802,["559"] = 802,["560"] = 802,["561"] = 802,["562"] = 802,["563"] = 802,["564"] = 802,["565"] = 802,["566"] = 802,["567"] = 802,["568"] = 802,["569"] = 802,["570"] = 802,["571"] = 802,["572"] = 802,["573"] = 802,["574"] = 802,["575"] = 802,["576"] = 802,["577"] = 802,["578"] = 802,["579"] = 802,["580"] = 802,["581"] = 802,["582"] = 802,["583"] = 802,["584"] = 833,["585"] = 833,["586"] = 833,["587"] = 833,["588"] = 833,["589"] = 833,["590"] = 833,["591"] = 833,["592"] = 833,["593"] = 833,["594"] = 833,["595"] = 833,["596"] = 833,["597"] = 833,["598"] = 833,["599"] = 833,["600"] = 833,["601"] = 833,["602"] = 833,["603"] = 833,["604"] = 833,["605"] = 833,["606"] = 833,["607"] = 833,["608"] = 833,["609"] = 833,["610"] = 833,["611"] = 833,["612"] = 833,["613"] = 864,["614"] = 864,["615"] = 864,["616"] = 864,["617"] = 864,["618"] = 864,["619"] = 864,["620"] = 864,["621"] = 864,["622"] = 864,["623"] = 864,["624"] = 864,["625"] = 864,["626"] = 864,["627"] = 864,["628"] = 864,["629"] = 864,["630"] = 864,["631"] = 864,["632"] = 864,["633"] = 864,["634"] = 864,["635"] = 864,["636"] = 864,["637"] = 864,["638"] = 864,["639"] = 864,["640"] = 864,["641"] = 864,["642"] = 897,["643"] = 897,["644"] = 897,["645"] = 897,["646"] = 897,["647"] = 897,["648"] = 897,["649"] = 897,["650"] = 897,["651"] = 897,["652"] = 897,["653"] = 897,["654"] = 897,["655"] = 897,["656"] = 897,["657"] = 897,["658"] = 897,["659"] = 897,["660"] = 897,["661"] = 897,["662"] = 897,["663"] = 897,["664"] = 897,["665"] = 897,["666"] = 897,["667"] = 897,["668"] = 897,["669"] = 897,["670"] = 897,["671"] = 928,["672"] = 928,["673"] = 928,["674"] = 928,["675"] = 928,["676"] = 928,["677"] = 928,["678"] = 928,["679"] = 928,["680"] = 928,["681"] = 928,["682"] = 928,["683"] = 928,["684"] = 928,["685"] = 928,["686"] = 928,["687"] = 928,["688"] = 928,["689"] = 928,["690"] = 928,["691"] = 928,["692"] = 928,["693"] = 928,["694"] = 928,["695"] = 928,["696"] = 928,["697"] = 928,["698"] = 928,["699"] = 928,["700"] = 959,["701"] = 959,["702"] = 959,["703"] = 959,["704"] = 959,["705"] = 959,["706"] = 959,["707"] = 959,["708"] = 959,["709"] = 959,["710"] = 959,["711"] = 959,["712"] = 959,["713"] = 959,["714"] = 959,["715"] = 959,["716"] = 959,["717"] = 959,["718"] = 959,["719"] = 959,["720"] = 959,["721"] = 959,["722"] = 959,["723"] = 959,["724"] = 959,["725"] = 959,["726"] = 959,["727"] = 959,["728"] = 959,["729"] = 990,["730"] = 990,["731"] = 990,["732"] = 990,["733"] = 990,["734"] = 990,["735"] = 990,["736"] = 990,["737"] = 990,["738"] = 990,["739"] = 990,["740"] = 990,["741"] = 990,["742"] = 990,["743"] = 990,["744"] = 990,["745"] = 990,["746"] = 990,["747"] = 990,["748"] = 990,["749"] = 990,["750"] = 990,["751"] = 990,["752"] = 990,["753"] = 990,["754"] = 990,["755"] = 990,["756"] = 990,["757"] = 990,["758"] = 1021,["759"] = 1021,["760"] = 1021,["761"] = 1021,["762"] = 1021,["763"] = 1021,["764"] = 1021,["765"] = 1021,["766"] = 1021,["767"] = 1021,["768"] = 1021,["769"] = 1021,["770"] = 1021,["771"] = 1021,["772"] = 1021,["773"] = 1021,["774"] = 1021,["775"] = 1021,["776"] = 1021,["777"] = 1021,["778"] = 1021,["779"] = 1021,["780"] = 1021,["781"] = 1021,["782"] = 1021,["783"] = 1021,["784"] = 1021,["785"] = 1021,["786"] = 1021,["787"] = 1054,["788"] = 1054,["789"] = 1054,["790"] = 1054,["791"] = 1054,["792"] = 1054,["793"] = 1054,["794"] = 1054,["795"] = 1054,["796"] = 1054,["797"] = 1054,["798"] = 1054,["799"] = 1054,["800"] = 1054,["801"] = 1054,["802"] = 1054,["803"] = 1054,["804"] = 1054,["805"] = 1054,["806"] = 1054,["807"] = 1054,["808"] = 1054,["809"] = 1054,["810"] = 1054,["811"] = 1054,["812"] = 1054,["813"] = 1054,["814"] = 1054,["815"] = 1054,["816"] = 1085,["817"] = 1085,["818"] = 1085,["819"] = 1085,["820"] = 1085,["821"] = 1085,["822"] = 1085,["823"] = 1085,["824"] = 1085,["825"] = 1085,["826"] = 1085,["827"] = 1085,["828"] = 1085,["829"] = 1085,["830"] = 1085,["831"] = 1085,["832"] = 1085,["833"] = 1085,["834"] = 1085,["835"] = 1085,["836"] = 1085,["837"] = 1085,["838"] = 1085,["839"] = 1085,["840"] = 1085,["841"] = 1085,["842"] = 1085,["843"] = 1085,["844"] = 1085,["845"] = 1116,["846"] = 1116,["847"] = 1116,["848"] = 1116,["849"] = 1116,["850"] = 1116,["851"] = 1116,["852"] = 1116,["853"] = 1116,["854"] = 1116,["855"] = 1116,["856"] = 1116,["857"] = 1116,["858"] = 1116,["859"] = 1116,["860"] = 1116,["861"] = 1116,["862"] = 1116,["863"] = 1116,["864"] = 1116,["865"] = 1116,["866"] = 1116,["867"] = 1116,["868"] = 1116,["869"] = 1116,["870"] = 1116,["871"] = 1116,["872"] = 1116,["873"] = 1116,["874"] = 1147,["875"] = 1147,["876"] = 1147,["877"] = 1147,["878"] = 1147,["879"] = 1147,["880"] = 1147,["881"] = 1147,["882"] = 1147,["883"] = 1147,["884"] = 1147,["885"] = 1147,["886"] = 1147,["887"] = 1147,["888"] = 1147,["889"] = 1147,["890"] = 1147,["891"] = 1147,["892"] = 1147,["893"] = 1147,["894"] = 1147,["895"] = 1147,["896"] = 1147,["897"] = 1147,["898"] = 1147,["899"] = 1147,["900"] = 1147,["901"] = 1147,["902"] = 1147,["903"] = 1178,["904"] = 1178,["905"] = 1178,["906"] = 1178,["907"] = 1178,["908"] = 1178,["909"] = 1178,["910"] = 1178,["911"] = 1178,["912"] = 1178,["913"] = 1178,["914"] = 1178,["915"] = 1178,["916"] = 1178,["917"] = 1178,["918"] = 1178,["919"] = 1178,["920"] = 1178,["921"] = 1178,["922"] = 1178,["923"] = 1178,["924"] = 1178,["925"] = 1178,["926"] = 1178,["927"] = 1178,["928"] = 1178,["929"] = 1178,["930"] = 1178,["931"] = 1178,["932"] = 1211,["933"] = 1211,["934"] = 1211,["935"] = 1211,["936"] = 1211,["937"] = 1211,["938"] = 1211,["939"] = 1211,["940"] = 1211,["941"] = 1211,["942"] = 1211,["943"] = 1211,["944"] = 1211,["945"] = 1211,["946"] = 1211,["947"] = 1211,["948"] = 1211,["949"] = 1211,["950"] = 1211,["951"] = 1211,["952"] = 1211,["953"] = 1211,["954"] = 1211,["955"] = 1211,["956"] = 1211,["957"] = 1211,["958"] = 1211,["959"] = 1211,["960"] = 1211,["961"] = 1242,["962"] = 1242,["963"] = 1242,["964"] = 1242,["965"] = 1242,["966"] = 1242,["967"] = 1242,["968"] = 1242,["969"] = 1242,["970"] = 1242,["971"] = 1242,["972"] = 1242,["973"] = 1242,["974"] = 1242,["975"] = 1242,["976"] = 1242,["977"] = 1242,["978"] = 1242,["979"] = 1242,["980"] = 1242,["981"] = 1242,["982"] = 1242,["983"] = 1242,["984"] = 1242,["985"] = 1242,["986"] = 1242,["987"] = 1242,["988"] = 1242,["989"] = 1242,["990"] = 1273,["991"] = 1273,["992"] = 1273,["993"] = 1273,["994"] = 1273,["995"] = 1273,["996"] = 1273,["997"] = 1273,["998"] = 1273,["999"] = 1273,["1000"] = 1273,["1001"] = 1273,["1002"] = 1273,["1003"] = 1273,["1004"] = 1273,["1005"] = 1273,["1006"] = 1273,["1007"] = 1273,["1008"] = 1273,["1009"] = 1273,["1010"] = 1273,["1011"] = 1273,["1012"] = 1273,["1013"] = 1273,["1014"] = 1273,["1015"] = 1273,["1016"] = 1273,["1017"] = 1273,["1018"] = 1273,["1019"] = 1304,["1020"] = 1304,["1021"] = 1304,["1022"] = 1304,["1023"] = 1304,["1024"] = 1304,["1025"] = 1304,["1026"] = 1304,["1027"] = 1304,["1028"] = 1304,["1029"] = 1304,["1030"] = 1304,["1031"] = 1304,["1032"] = 1304,["1033"] = 1304,["1034"] = 1304,["1035"] = 1304,["1036"] = 1304,["1037"] = 1304,["1038"] = 1304,["1039"] = 1304,["1040"] = 1304,["1041"] = 1304,["1042"] = 1304,["1043"] = 1304,["1044"] = 1304,["1045"] = 1304,["1046"] = 1304,["1047"] = 1304,["1048"] = 1337,["1049"] = 1337,["1050"] = 1337,["1051"] = 1337,["1052"] = 1337,["1053"] = 1337,["1054"] = 1337,["1055"] = 1337,["1056"] = 1337,["1057"] = 1337,["1058"] = 1337,["1059"] = 1337,["1060"] = 1337,["1061"] = 1337,["1062"] = 1337,["1063"] = 1337,["1064"] = 1337,["1065"] = 1337,["1066"] = 1337,["1067"] = 1337,["1068"] = 1337,["1069"] = 1337,["1070"] = 1337,["1071"] = 1337,["1072"] = 1337,["1073"] = 1337,["1074"] = 1337,["1075"] = 1337,["1076"] = 1337,["1077"] = 1368,["1078"] = 1368,["1079"] = 1368,["1080"] = 1368,["1081"] = 1368,["1082"] = 1368,["1083"] = 1368,["1084"] = 1368,["1085"] = 1368,["1086"] = 1368,["1087"] = 1368,["1088"] = 1368,["1089"] = 1368,["1090"] = 1368,["1091"] = 1368,["1092"] = 1368,["1093"] = 1368,["1094"] = 1368,["1095"] = 1368,["1096"] = 1368,["1097"] = 1368,["1098"] = 1368,["1099"] = 1368,["1100"] = 1368,["1101"] = 1368,["1102"] = 1368,["1103"] = 1368,["1104"] = 1368,["1105"] = 1368,["1106"] = 1399,["1107"] = 1399,["1108"] = 1399,["1109"] = 1399,["1110"] = 1399,["1111"] = 1399,["1112"] = 1399,["1113"] = 1399,["1114"] = 1399,["1115"] = 1399,["1116"] = 1399,["1117"] = 1399,["1118"] = 1399,["1119"] = 1399,["1120"] = 1399,["1121"] = 1399,["1122"] = 1399,["1123"] = 1399,["1124"] = 1399,["1125"] = 1399,["1126"] = 1399,["1127"] = 1399,["1128"] = 1399,["1129"] = 1399,["1130"] = 1399,["1131"] = 1399,["1132"] = 1399,["1133"] = 1399,["1134"] = 1399,["1135"] = 1429,["1136"] = 703,["1137"] = 1435,["1138"] = 1436,["1140"] = 1437,["1141"] = 1437,["1142"] = 1438,["1143"] = 1439,["1144"] = 1439,["1145"] = 1439,["1146"] = 1439,["1147"] = 1439,["1148"] = 1439,["1149"] = 1439,["1150"] = 1439,["1151"] = 1439,["1152"] = 1439,["1153"] = 1439,["1154"] = 1439,["1155"] = 1439,["1156"] = 1439,["1157"] = 1454,["1159"] = 1437,["1162"] = 1435,["1163"] = 1462,["1164"] = 1463,["1165"] = 1463,["1166"] = 1463,["1170"] = 1464,["1171"] = 1464,["1174"] = 1467,["1175"] = 1470,["1176"] = 1470,["1177"] = 1470,["1178"] = 1470,["1179"] = 1471,["1180"] = 1474,["1181"] = 1475,["1183"] = 1477,["1184"] = 1478,["1186"] = 1481,["1187"] = 1483,["1195"] = 1462,["1196"] = 1490,["1197"] = 1491,["1198"] = 1491,["1199"] = 1491,["1203"] = 1492,["1204"] = 1492,["1207"] = 1494,["1208"] = 1497,["1209"] = 1498,["1210"] = 1498,["1211"] = 1498,["1212"] = 1498,["1213"] = 1498,["1214"] = 1498,["1215"] = 1498,["1216"] = 1498,["1217"] = 1498,["1226"] = 1490,["1227"] = 1510,["1228"] = 1511,["1229"] = 1512,["1230"] = 1515,["1232"] = 1517,["1233"] = 1517,["1234"] = 1518,["1235"] = 1519,["1236"] = 1520,["1237"] = 1521,["1239"] = 1517,["1242"] = 1525,["1243"] = 1510,["1244"] = 1531,["1245"] = 1532,["1247"] = 1535,["1248"] = 1536,["1250"] = 1537,["1253"] = 1539,["1255"] = 1540,["1256"] = 1541,["1259"] = 1543,["1261"] = 1544,["1262"] = 1545,["1263"] = 1546,["1267"] = 1550,["1268"] = 1551,["1269"] = 1552,["1270"] = 1553,["1271"] = 1554,["1274"] = 1557,["1275"] = 1531,["1276"] = 1563,["1277"] = 1564,["1278"] = 1565,["1279"] = 1566,["1281"] = 1569,["1282"] = 1570,["1283"] = 1572,["1284"] = 1572,["1285"] = 1572,["1286"] = 1573,["1287"] = 1574,["1288"] = 1575,["1291"] = 1579,["1292"] = 1563,["1293"] = 1585,["1294"] = 1586,["1295"] = 1588,["1296"] = 1589,["1297"] = 1591,["1298"] = 1592,["1299"] = 1593,["1303"] = 1598,["1304"] = 1599,["1306"] = 1602,["1307"] = 1603,["1308"] = 1585,["1309"] = 1609,["1310"] = 1611,["1311"] = 1611,["1312"] = 1611,["1313"] = 1612,["1314"] = 1614,["1315"] = 1614,["1316"] = 1614,["1317"] = 1614,["1318"] = 1614,["1319"] = 1614,["1320"] = 1614,["1321"] = 1614,["1324"] = 1609,["1325"] = 1626,["1326"] = 1628,["1327"] = 1628,["1328"] = 1628,["1329"] = 1629,["1330"] = 1631,["1331"] = 1633,["1332"] = 1636,["1335"] = 1640,["1336"] = 1626,["1337"] = 1646,["1338"] = 1648,["1339"] = 1648,["1340"] = 1648,["1341"] = 1649,["1343"] = 1652,["1344"] = 1646,["1345"] = 1659,["1346"] = 1660,["1347"] = 1662,["1351"] = 1663,["1352"] = 1664,["1355"] = 1668,["1356"] = 1671,["1357"] = 1672,["1360"] = 1675,["1361"] = 1676,["1362"] = 1678,["1363"] = 1679,["1366"] = 1683,["1367"] = 1686,["1368"] = 1688,["1369"] = 1689,["1370"] = 1691,["1372"] = 1694,["1373"] = 1695,["1374"] = 1698,["1375"] = 1699,["1376"] = 1701,["1377"] = 1704,["1378"] = 1705,["1379"] = 1706,["1380"] = 1707,["1390"] = 1712,["1391"] = 1659,["1392"] = 1718,["1393"] = 1719,["1394"] = 1719,["1395"] = 1719,["1396"] = 1719,["1397"] = 1722,["1398"] = 1718,["1399"] = 1728,["1400"] = 1729,["1401"] = 1732,["1402"] = 1732,["1403"] = 1732,["1404"] = 1733,["1405"] = 1734,["1409"] = 1739,["1410"] = 1742,["1411"] = 1728,["1412"] = 1751,["1413"] = 1751,["1414"] = 1759,["1415"] = 1760,["1416"] = 1761,["1417"] = 1762,["1419"] = 1759,["1420"] = 1772,["1421"] = 1773,["1422"] = 1776,["1423"] = 1776,["1424"] = 1776,["1425"] = 1777,["1426"] = 1778,["1427"] = 1776,["1428"] = 1776,["1429"] = 1781,["1430"] = 1772,["1431"] = 1787,["1432"] = 1788,["1433"] = 1789,["1434"] = 1790,["1435"] = 1793,["1436"] = 1795,["1437"] = 1798,["1438"] = 1799,["1441"] = 1804,["1442"] = 1805,["1445"] = 1810,["1446"] = 1813,["1447"] = 1814,["1448"] = 1815,["1449"] = 1817,["1450"] = 1818,["1451"] = 1819,["1452"] = 1820,["1453"] = 1821,["1455"] = 1823,["1456"] = 1824,["1457"] = 1825,["1458"] = 1826,["1459"] = 1827,["1460"] = 1829,["1461"] = 1830,["1462"] = 1831,["1463"] = 1832,["1467"] = 1838,["1468"] = 1840,["1469"] = 1841,["1470"] = 1843,["1472"] = 1845,["1474"] = 1787,["1475"] = 1852,["1476"] = 1853,["1477"] = 1854,["1478"] = 1854,["1479"] = 1854,["1480"] = 1854,["1481"] = 1858,["1482"] = 1859,["1484"] = 1863,["1485"] = 1864,["1486"] = 1865,["1489"] = 1870,["1490"] = 1852,["1491"] = 1876,["1492"] = 1876,["1493"] = 1884,["1494"] = 1885,["1495"] = 1888,["1496"] = 1888,["1497"] = 1888,["1498"] = 1889,["1499"] = 1888,["1500"] = 1888,["1501"] = 1888,["1502"] = 1892,["1503"] = 1884,["1504"] = 1898,["1505"] = 1899,["1506"] = 1902,["1507"] = 1902,["1508"] = 1902,["1509"] = 1902,["1510"] = 1902,["1511"] = 1902,["1512"] = 1902,["1513"] = 1902,["1514"] = 1902,["1515"] = 1902,["1516"] = 1902,["1517"] = 1902,["1518"] = 1902,["1519"] = 1902,["1520"] = 1916,["1521"] = 1918,["1522"] = 1925,["1523"] = 1926,["1524"] = 1927,["1525"] = 1928,["1528"] = 1933,["1529"] = 1934,["1530"] = 1935,["1531"] = 1936,["1534"] = 1898,["1535"] = 1944,["1536"] = 1945,["1537"] = 1947,["1538"] = 1948,["1541"] = 1952,["1542"] = 1953,["1543"] = 1956,["1544"] = 1957,["1545"] = 1957,["1546"] = 1957,["1547"] = 1958,["1548"] = 1959,["1549"] = 1960,["1551"] = 1962,["1552"] = 1957,["1553"] = 1957,["1554"] = 1944,["1555"] = 1969,["1556"] = 1970,["1557"] = 1971,["1560"] = 1975,["1561"] = 1976,["1562"] = 1969,["1563"] = 1982,["1564"] = 1983,["1565"] = 1984,["1566"] = 1984,["1567"] = 1984,["1568"] = 1984,["1569"] = 1984,["1570"] = 1984,["1571"] = 1984,["1572"] = 1984,["1573"] = 1984,["1575"] = 1982,["1576"] = 2000,["1577"] = 2001,["1578"] = 2000,["1579"] = 2011,["1580"] = 2012,["1581"] = 2013,["1582"] = 2015,["1583"] = 2016,["1585"] = 2020,["1586"] = 2021,["1588"] = 2025,["1589"] = 2026,["1590"] = 2027,["1592"] = 2031,["1593"] = 2032,["1595"] = 2036,["1596"] = 2037,["1597"] = 2037,["1598"] = 2038,["1599"] = 2040,["1600"] = 2043,["1601"] = 2045,["1602"] = 2011,["1603"] = 2051,["1604"] = 2052,["1605"] = 2053,["1608"] = 2057,["1609"] = 2057,["1610"] = 2057,["1611"] = 2057,["1612"] = 2057,["1613"] = 2057,["1614"] = 2057,["1615"] = 2057,["1616"] = 2057,["1617"] = 2057,["1618"] = 2057,["1619"] = 2057,["1620"] = 2057,["1621"] = 2057,["1622"] = 2057,["1623"] = 2057,["1624"] = 2057,["1625"] = 2057,["1626"] = 2051,["1627"] = 2076,["1628"] = 2077,["1629"] = 2076,["1630"] = 2083,["1631"] = 2084,["1632"] = 2083,["1633"] = 2090,["1634"] = 2091,["1635"] = 2092,["1638"] = 2097,["1639"] = 2098,["1640"] = 2101,["1641"] = 2101,["1642"] = 2101,["1643"] = 2101,["1644"] = 2101,["1645"] = 2101,["1646"] = 2108,["1647"] = 2111,["1648"] = 2090,["1649"] = 2117,["1650"] = 2118,["1651"] = 2119,["1652"] = 2119,["1653"] = 2119,["1654"] = 2120,["1655"] = 2120,["1656"] = 2120,["1657"] = 2120,["1658"] = 2120,["1659"] = 2120,["1660"] = 2120,["1662"] = 2128,["1663"] = 2117,["1664"] = 2134,["1665"] = 2135,["1666"] = 2136,["1669"] = 2140,["1670"] = 2143,["1671"] = 2146,["1672"] = 2149,["1673"] = 2149,["1674"] = 2150,["1675"] = 2134,["1676"] = 2156,["1677"] = 2157,["1678"] = 2158,["1681"] = 2162,["1682"] = 2163,["1683"] = 2164,["1686"] = 2169,["1687"] = 2170,["1688"] = 2172,["1689"] = 2175,["1690"] = 2175,["1691"] = 2175,["1692"] = 2175,["1693"] = 2175,["1694"] = 2185,["1695"] = 2156,["1696"] = 2191,["1697"] = 2193,["1698"] = 2194,["1699"] = 2196,["1700"] = 2196,["1701"] = 2196,["1702"] = 2197,["1703"] = 2197,["1704"] = 2197,["1705"] = 2197,["1706"] = 2197,["1707"] = 2197,["1708"] = 2197,["1710"] = 2207,["1711"] = 2212,["1712"] = 2191,["1713"] = 2218,["1714"] = 2219,["1715"] = 2219,["1716"] = 2219,["1717"] = 2219,["1718"] = 2219,["1719"] = 2219,["1720"] = 2219,["1721"] = 2227,["1722"] = 2228,["1723"] = 2229,["1724"] = 2231,["1725"] = 2218,["1726"] = 2237,["1727"] = 2239,["1728"] = 2240,["1729"] = 2242,["1730"] = 2243,["1731"] = 2245,["1732"] = 2245,["1733"] = 2245,["1734"] = 2245,["1735"] = 2245,["1738"] = 2257,["1739"] = 2260,["1740"] = 2263,["1741"] = 2265,["1742"] = 2265,["1743"] = 2265,["1744"] = 2265,["1745"] = 2265,["1746"] = 2265,["1747"] = 2263,["1748"] = 2275,["1749"] = 2237});
local ____exports = {}
local ____GameModeManager = require("modules.GameModeManager")
local GameModeManager = ____GameModeManager.GameModeManager
local ____ChessBattleSystem = require("modules.autochess.ChessBattleSystem")
local ChessBattleSystem = ____ChessBattleSystem.ChessBattleSystem
local ____StageConfigManager = require("modules.autochess.StageConfigManager")
local StageConfigManager = ____StageConfigManager.StageConfigManager
local NodeType = ____StageConfigManager.NodeType
local ____time_utils = require("utils.time_utils")
local getTimestamp = ____time_utils.getTimestamp
____exports.ChessRarity = ChessRarity or ({})
____exports.ChessRarity.COMMON = 1
____exports.ChessRarity[____exports.ChessRarity.COMMON] = "COMMON"
____exports.ChessRarity.UNCOMMON = 2
____exports.ChessRarity[____exports.ChessRarity.UNCOMMON] = "UNCOMMON"
____exports.ChessRarity.RARE = 3
____exports.ChessRarity[____exports.ChessRarity.RARE] = "RARE"
____exports.ChessRarity.EPIC = 4
____exports.ChessRarity[____exports.ChessRarity.EPIC] = "EPIC"
____exports.ChessRarity.LEGENDARY = 5
____exports.ChessRarity[____exports.ChessRarity.LEGENDARY] = "LEGENDARY"
____exports.RoundPhase = RoundPhase or ({})
____exports.RoundPhase.PREPARATION = "preparation"
____exports.RoundPhase.BATTLE = "battle"
____exports.RoundPhase.INTERMISSION = "intermission"
____exports.AutoChessMode = __TS__Class()
local AutoChessMode = ____exports.AutoChessMode
AutoChessMode.name = "AutoChessMode"
function AutoChessMode.prototype.____constructor(self)
    self.isActive = false
    self.currentWaveSettlementShown = false
    self.currentWaveSettlementPending = false
    self.currentWaveRewardAmount = 100
    self.currentWaveRewardClaimed = __TS__New(Set)
    self.battleResultsProcessed = __TS__New(Set)
    StageConfigManager:initialize()
    self.chessPieceDatabase = self:initializeChessDatabase()
    self.gameState = self:initializeGameState()
    self.battleSystem = ChessBattleSystem:getInstance()
    self:initializeAutoChessMode()
end
function AutoChessMode.getInstance(self)
    if not ____exports.AutoChessMode.instance then
        ____exports.AutoChessMode.instance = __TS__New(____exports.AutoChessMode)
    end
    return ____exports.AutoChessMode.instance
end
function AutoChessMode.prototype.resetWaveSettlementState(self)
    self.currentWaveSettlementShown = false
    self.currentWaveSettlementPending = false
    self.currentWaveRewardAmount = 0
    self.currentWaveRewardClaimed:clear()
    self.currentWaveStageSelection = nil
    self.battleResultsProcessed:clear()
end
function AutoChessMode.prototype.activate(self)
    if self.isActive then
        print("[AutoChessMode] Already active")
        return
    end
    local gameModeManager = GameModeManager:getInstance()
    if not gameModeManager:isAutoChessMode() then
        print("[AutoChessMode] Game is not in autochess mode")
        return
    end
    self.isActive = true
    self:setupGame()
    self:registerEvents()
    print("[AutoChessMode] Activated")
    self:syncStateToNetTable()
end
function AutoChessMode.prototype.deactivate(self)
    if not self.isActive then
        return
    end
    self.isActive = false
    self:cleanupGame()
    self:unregisterEvents()
    print("[AutoChessMode] Deactivated")
    self:syncStateToNetTable()
end
function AutoChessMode.prototype.startGame(self)
    if not self.isActive then
        print("[AutoChessMode] Mode not active")
        return
    end
    self.gameState.isGameActive = true
    self.gameState.currentRound = 1
    self.gameState.currentPhase = ____exports.RoundPhase.PREPARATION
    self:initializePlayerStates()
    self:startPreparationPhase()
    print("[AutoChessMode] Game started")
    CustomGameEventManager:Send_ServerToAllClients("autochess_game_started", {round = self.gameState.currentRound, phase = self.gameState.currentPhase})
end
function AutoChessMode.prototype.startPreparationPhase(self)
    self:resetWaveSettlementState()
    self.gameState.currentPhase = ____exports.RoundPhase.PREPARATION
    self.gameState.phaseTimeLeft = 10
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.battleSystem:movePlayerToSpectatorArea(playerId)
        end
    end
    self.battleSystem:recreateHexBoard()
    self:distributeRoundIncome()
    self:refreshAllPlayersShop()
    self:createPlayerInitialPieces()
    if self.gameState.currentRound > 1 then
        self:sendAvailableStages()
    else
        self.currentWaveStageSelection = "1"
    end
    self:startPhaseTimer()
    print("[AutoChessMode] Started preparation phase for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_phase_started", {phase = ____exports.RoundPhase.PREPARATION, timeLeft = self.gameState.phaseTimeLeft, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.startBattlePhase(self)
    self.gameState.currentPhase = ____exports.RoundPhase.BATTLE
    self.gameState.phaseTimeLeft = 45
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.battleSystem:setPlayerAsProtected(playerId)
            self:deployPlayerChessPieces(playerId)
        end
    end
    self:createEnemyPieces()
    self:setupBattleMatching()
    self:startAllBattles()
    self:startPhaseTimer()
    print("[AutoChessMode] Started battle phase for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_phase_started", {phase = ____exports.RoundPhase.BATTLE, timeLeft = self.gameState.phaseTimeLeft, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.deployPlayerChessPieces(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        print("[AutoChessMode] ERROR: Player state not found for player " .. tostring(playerId))
        return
    end
    if self.gameState.currentPhase == ____exports.RoundPhase.BATTLE then
        self.battleSystem:activatePlayerPieces(playerId)
    end
end
function AutoChessMode.prototype.createPlayerInitialPieces(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.battleSystem:clearPlayerPieces(playerId)
            if self.gameState.currentRound == 1 then
                self:createFirstRoundPieces(playerId)
            else
                self:deployPiecesFromBench(playerId)
            end
            print(("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 初始棋子创建完成")
        end
    end
    print("[AutoChessMode] ========== 玩家初始棋子创建完成 ==========")
end
function AutoChessMode.prototype.createFirstRoundPieces(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        return
    end
    local fixedPieces = {"treant_protector", "windrunner", "axe"}
    print("[AutoChessMode] ========== 第一回合生成玩家初始棋子 ==========")
    print(("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " - 固定生成3个我方棋子: 树精卫士、风行者、斧王")
    do
        local i = 0
        while i < #fixedPieces do
            local pieceId = fixedPieces[i + 1]
            local piece = self.chessPieceDatabase:get(pieceId)
            if piece then
                local ____playerState_benchPieces_0 = playerState.benchPieces
                ____playerState_benchPieces_0[#____playerState_benchPieces_0 + 1] = piece
                local position = {x = 1 + i, y = 1}
                print(((((((((("[AutoChessMode] 部署我方棋子: " .. piece.displayName) .. "(") .. pieceId) .. ") - ") .. tostring(piece.cost)) .. "费 到位置 (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
                self.battleSystem:deployPiece(playerId, pieceId, position)
            else
                print(("[AutoChessMode] 警告: 棋子 " .. pieceId) .. " 不存在于数据库中")
            end
            i = i + 1
        end
    end
    print(("[AutoChessMode] ========== 玩家 " .. tostring(playerId)) .. " 第一回合初始棋子创建完成 ==========")
    print(("[AutoChessMode] 总计生成 " .. tostring(#fixedPieces)) .. " 个我方棋子 (固定配置)")
end
function AutoChessMode.prototype.convertHeroIdToPieceId(self, heroId)
    local lastNonDigitIndex = #heroId
    do
        local i = #heroId - 1
        while i >= 0 do
            local char = __TS__StringCharAt(heroId, i)
            if char < "0" or char > "9" then
                lastNonDigitIndex = i + 1
                break
            end
            i = i - 1
        end
    end
    if lastNonDigitIndex < #heroId then
        return __TS__StringSubstring(heroId, 0, lastNonDigitIndex)
    end
    return heroId
end
function AutoChessMode.prototype.getRandomPieceByCost(self, cost)
    local pieces = {}
    for ____, piece in __TS__Iterator(self.chessPieceDatabase:values()) do
        if piece.cost == cost then
            pieces[#pieces + 1] = piece
        end
    end
    if #pieces == 0 then
        return nil
    end
    local randomIndex = math.floor(RandomFloat(0, #pieces))
    return pieces[randomIndex + 1]
end
function AutoChessMode.prototype.createDefaultInitialPieces(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        return
    end
    local defaultPieces = {"axe", "crystal_maiden", "drow_ranger"}
    do
        local i = 0
        while i < #defaultPieces do
            local pieceId = defaultPieces[i + 1]
            local piece = self.chessPieceDatabase:get(pieceId)
            if piece then
                local ____playerState_benchPieces_1 = playerState.benchPieces
                ____playerState_benchPieces_1[#____playerState_benchPieces_1 + 1] = piece
                local position = {x = 1 + i, y = 1}
                self.battleSystem:deployPiece(playerId, pieceId, position)
            end
            i = i + 1
        end
    end
end
function AutoChessMode.prototype.deployPiecesFromBench(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        return
    end
    local benchPieces = playerState.benchPieces or ({})
    print((("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 备战席棋子数量: ") .. tostring(#benchPieces))
    do
        local i = 0
        while i < math.min(#benchPieces, 7) do
            local piece = benchPieces[i + 1]
            local position = {x = 1 + i, y = 1}
            print(((((("[AutoChessMode] 部署备战席棋子: " .. piece.id) .. " 到位置 (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
            self.battleSystem:deployPiece(playerId, piece.id, position)
            i = i + 1
        end
    end
end
function AutoChessMode.prototype.createEnemyPieces(self)
    print("[AutoChessMode] ========== 开始创建敌人棋子 ==========")
    print("[AutoChessMode] 当前回合: " .. tostring(self.gameState.currentRound))
    local stageId
    if self.gameState.currentRound == 1 then
        stageId = 1
        print("[AutoChessMode] 第一回合，自动使用关卡1配置")
    else
        if self.currentWaveStageSelection then
            stageId = __TS__ParseInt(self.currentWaveStageSelection)
            print("[AutoChessMode] 使用玩家选择的关卡: " .. tostring(stageId))
        else
            stageId = 1
            print("[AutoChessMode] 警告: 玩家未选择关卡，默认使用关卡1")
        end
    end
    local stageConfig = StageConfigManager:getStageConfig(stageId)
    if not stageConfig then
        print(("[AutoChessMode] ERROR: 关卡" .. tostring(stageId)) .. "配置不存在，使用关卡1")
        stageId = 1
    end
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            print(("[AutoChessMode] 为玩家 " .. tostring(playerId)) .. " 创建敌人棋子...")
            self:createEnemyForPlayer(playerId, stageId)
        end
    end
    print("[AutoChessMode] ========== 敌人棋子创建完成 ==========")
end
function AutoChessMode.prototype.createEnemyForPlayer(self, playerId, stageId)
    local stageConfig = StageConfigManager:getStageConfig(stageId)
    if not stageConfig then
        print(("[AutoChessMode] ERROR: 关卡" .. tostring(stageId)) .. "配置不存在")
        return
    end
    print(((("[AutoChessMode] 为玩家 " .. tostring(playerId)) .. " 创建敌人，使用关卡") .. tostring(stageId)) .. "配置")
    print("[AutoChessMode] 关卡类型: " .. stageConfig.primaryNodeType)
    local monsterCount = StageConfigManager:rollMonsterCount(stageId)
    local totalMonsters = monsterCount.normalCount + (monsterCount.specialCount or 0)
    print(((((((("[AutoChessMode] 关卡" .. tostring(stageId)) .. "怪物数量: 普通") .. tostring(monsterCount.normalCount)) .. "个, 特殊") .. tostring(monsterCount.specialCount or 0)) .. "个, 总计") .. tostring(totalMonsters)) .. "个")
    local isElite = stageConfig.primaryNodeType == NodeType.ELITE_BATTLE or stageConfig.primaryNodeType == NodeType.BOSS
    do
        local i = 0
        while i < monsterCount.normalCount do
            local heroId = StageConfigManager:rollHeroByStage(stageId, isElite)
            if heroId then
                local pieceId = self:convertHeroIdToPieceId(heroId)
                local piece = self.chessPieceDatabase:get(pieceId)
                if piece then
                    local position = {x = 1 + i, y = 7}
                    print(((((((("[AutoChessMode] 创建敌人棋子: " .. piece.displayName) .. "(") .. pieceId) .. ") 在位置 (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
                    self.battleSystem:deployPiece(-1, pieceId, position)
                else
                    print(("[AutoChessMode] 警告: 棋子 " .. pieceId) .. " 不存在，使用同费用替代")
                    local heroConfig = StageConfigManager:getHeroConfig(heroId)
                    if heroConfig then
                        local fallbackPiece = self:getRandomPieceByCost(heroConfig.cost)
                        if fallbackPiece then
                            local position = {x = 1 + i, y = 7}
                            self.battleSystem:deployPiece(-1, fallbackPiece.id, position)
                        end
                    end
                end
            end
            i = i + 1
        end
    end
    if monsterCount.specialCount and monsterCount.specialCount > 0 then
        do
            local i = 0
            while i < monsterCount.specialCount do
                local heroId = StageConfigManager:rollHeroByStage(stageId, true)
                if heroId then
                    local pieceId = self:convertHeroIdToPieceId(heroId)
                    local piece = self.chessPieceDatabase:get(pieceId)
                    if piece then
                        local position = {x = 1 + monsterCount.normalCount + i, y = 7}
                        print(((((((((("[AutoChessMode] 创建特殊敌人: " .. piece.displayName) .. "(") .. pieceId) .. ") [") .. monsterCount.specialType) .. "] 在位置 (") .. tostring(position.x)) .. ", ") .. tostring(position.y)) .. ")")
                        self.battleSystem:deployPiece(-1, pieceId, position)
                    end
                end
                i = i + 1
            end
        end
    end
    print(((("[AutoChessMode] 玩家 " .. tostring(playerId)) .. " 的敌人棋子创建完成，共") .. tostring(totalMonsters)) .. "个")
end
function AutoChessMode.prototype.startPhaseTimer(self)
    if self.phaseTimer then
        Timers:RemoveTimer(self.phaseTimer)
    end
    self.phaseTimer = Timers:CreateTimer(
        1,
        function()
            local ____self_gameState_2, ____phaseTimeLeft_3 = self.gameState, "phaseTimeLeft"
            ____self_gameState_2[____phaseTimeLeft_3] = ____self_gameState_2[____phaseTimeLeft_3] - 1
            if self.gameState.currentPhase == ____exports.RoundPhase.PREPARATION then
                self.battleSystem:recreateHexBoard()
            end
            CustomGameEventManager:Send_ServerToAllClients("autochess_time_update", {timeLeft = self.gameState.phaseTimeLeft, phase = self.gameState.currentPhase})
            if self.gameState.phaseTimeLeft <= 0 then
                self:onPhaseTimeEnd()
                return nil
            end
            return 1
        end
    )
end
function AutoChessMode.prototype.onPhaseTimeEnd(self)
    repeat
        local ____switch86 = self.gameState.currentPhase
        local ____cond86 = ____switch86 == ____exports.RoundPhase.PREPARATION
        if ____cond86 then
            self:startBattlePhase()
            break
        end
        ____cond86 = ____cond86 or ____switch86 == ____exports.RoundPhase.BATTLE
        if ____cond86 then
            self:endBattlePhase()
            break
        end
    until true
end
function AutoChessMode.prototype.endBattlePhase(self)
    if self.phaseTimer then
        Timers:RemoveTimer(self.phaseTimer)
        self.phaseTimer = nil
    end
    self:stopAllBattles()
    self:calculateBattleResults()
    if self:checkGameEnd() then
        self:endGame()
        return
    end
    Timers:CreateTimer(
        0.5,
        function()
            self:triggerWaveSettlement()
            return nil
        end
    )
end
function AutoChessMode.prototype.initializeGameState(self)
    return {
        currentRound = 0,
        currentPhase = ____exports.RoundPhase.PREPARATION,
        phaseTimeLeft = 0,
        playerStates = __TS__New(Map),
        chessPool = self:initializeChessPool(),
        isGameActive = false
    }
end
function AutoChessMode.prototype.initializeChessPool(self)
    local pool = __TS__New(Map)
    for ____, ____value in __TS__Iterator(self.chessPieceDatabase) do
        local pieceId = ____value[1]
        local piece = ____value[2]
        local count = 0
        repeat
            local ____switch94 = piece.rarity
            local ____cond94 = ____switch94 == ____exports.ChessRarity.COMMON
            if ____cond94 then
                count = 45
                break
            end
            ____cond94 = ____cond94 or ____switch94 == ____exports.ChessRarity.UNCOMMON
            if ____cond94 then
                count = 30
                break
            end
            ____cond94 = ____cond94 or ____switch94 == ____exports.ChessRarity.RARE
            if ____cond94 then
                count = 25
                break
            end
            ____cond94 = ____cond94 or ____switch94 == ____exports.ChessRarity.EPIC
            if ____cond94 then
                count = 15
                break
            end
            ____cond94 = ____cond94 or ____switch94 == ____exports.ChessRarity.LEGENDARY
            if ____cond94 then
                count = 10
                break
            end
        until true
        pool:set(pieceId, count)
    end
    return pool
end
function AutoChessMode.prototype.initializeChessDatabase(self)
    local database = __TS__New(Map)
    database:set("treant_protector", {
        id = "treant_protector",
        unitName = "npc_dota_hero_treant",
        displayName = "树精卫士",
        position = "坦克",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"自然"},
        class = {"战士"},
        health = 650,
        maxMana = 100,
        initialMana = 40,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 4.8,
        damageManaRecovery = 5,
        skillCooldown = 9.26,
        damage = 50,
        armor = 4,
        physicalDamageReduction = 19.35,
        magicDefense = 15,
        attackRange = 200,
        attackSpeed = 0.6,
        attackInterval = 1.67,
        dps = 30,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"treant_natures_grasp"}
    })
    database:set("windrunner", {
        id = "windrunner",
        unitName = "npc_dota_hero_windrunner",
        displayName = "风行者",
        position = "射手",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"精灵"},
        class = {"射手"},
        health = 500,
        maxMana = 80,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 6.4,
        damageManaRecovery = 0,
        skillCooldown = 10.81,
        damage = 45,
        armor = 2,
        physicalDamageReduction = 10.71,
        magicDefense = 5,
        attackRange = 800,
        attackSpeed = 0.8,
        attackInterval = 1.25,
        dps = 36,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"windrunner_powershot"}
    })
    database:set("mars", {
        id = "mars",
        unitName = "npc_dota_hero_mars",
        displayName = "战争之矛",
        position = "战士",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"人类"},
        class = {"战士"},
        health = 650,
        maxMana = 100,
        initialMana = 40,
        healthRecovery = 0,
        naturalManaRecovery = 2,
        attackManaRecovery = 5.2,
        damageManaRecovery = 5,
        skillCooldown = 0,
        damage = 55,
        armor = 3,
        physicalDamageReduction = 15.25,
        magicDefense = 10,
        attackRange = 200,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 35.75,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"mars_spear"}
    })
    database:set("razor", {
        id = "razor",
        unitName = "npc_dota_hero_razor",
        displayName = "雷泽",
        position = "法师",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"元素"},
        class = {"法师"},
        health = 550,
        maxMana = 100,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 2,
        attackManaRecovery = 6,
        damageManaRecovery = 0,
        skillCooldown = 12.5,
        damage = 40,
        armor = 2,
        physicalDamageReduction = 10.71,
        magicDefense = 5,
        attackRange = 400,
        attackSpeed = 0.75,
        attackInterval = 1.33,
        dps = 30,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"razor_plasma_field"}
    })
    database:set("lion", {
        id = "lion",
        unitName = "npc_dota_hero_lion",
        displayName = "恶魔巫师",
        position = "辅助",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"恶魔"},
        class = {"法师"},
        health = 500,
        maxMana = 70,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 3,
        attackManaRecovery = 5.2,
        damageManaRecovery = 0,
        skillCooldown = 8.54,
        damage = 40,
        armor = 2,
        physicalDamageReduction = 10.71,
        magicDefense = 5,
        attackRange = 600,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 26,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"lion_impale"}
    })
    database:set("enchantress", {
        id = "enchantress",
        unitName = "npc_dota_hero_enchantress",
        displayName = "魅惑魔女",
        position = "辅助",
        rarity = ____exports.ChessRarity.COMMON,
        cost = 1,
        race = {"自然"},
        class = {"辅助"},
        health = 550,
        maxMana = 100,
        initialMana = 20,
        healthRecovery = 0,
        naturalManaRecovery = 2,
        attackManaRecovery = 5.6,
        damageManaRecovery = 0,
        skillCooldown = 13.16,
        damage = 45,
        armor = 1.5,
        physicalDamageReduction = 8.26,
        magicDefense = 5,
        attackRange = 400,
        attackSpeed = 0.7,
        attackInterval = 1.43,
        dps = 31.5,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"enchantress_enchant"}
    })
    database:set("axe", {
        id = "axe",
        unitName = "npc_dota_hero_axe",
        displayName = "斧王",
        position = "战士",
        rarity = ____exports.ChessRarity.UNCOMMON,
        cost = 2,
        race = {"兽人"},
        class = {"战士"},
        health = 750,
        maxMana = 0,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 0,
        attackManaRecovery = 6,
        damageManaRecovery = 5,
        skillCooldown = 0,
        damage = 65,
        armor = 5,
        physicalDamageReduction = 23.08,
        magicDefense = 15,
        attackRange = 200,
        attackSpeed = 0.75,
        attackInterval = 1.33,
        dps = 48.75,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"axe_berserkers_call"}
    })
    database:set("ursa", {
        id = "ursa",
        unitName = "npc_dota_hero_ursa",
        displayName = "熊战士",
        position = "坦克",
        rarity = ____exports.ChessRarity.UNCOMMON,
        cost = 2,
        race = {"野兽"},
        class = {"战士"},
        health = 800,
        maxMana = 100,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 5.2,
        damageManaRecovery = 5,
        skillCooldown = 8.93,
        damage = 60,
        armor = 6,
        physicalDamageReduction = 26.47,
        magicDefense = 25,
        attackRange = 200,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 39,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"ursa_overpower"}
    })
    database:set("oracle", {
        id = "oracle",
        unitName = "npc_dota_hero_oracle",
        displayName = "神谕者",
        position = "辅助",
        rarity = ____exports.ChessRarity.UNCOMMON,
        cost = 2,
        race = {"人类"},
        class = {"辅助"},
        health = 700,
        maxMana = 100,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 3,
        attackManaRecovery = 5.2,
        damageManaRecovery = 0,
        skillCooldown = 12.2,
        damage = 55,
        armor = 4,
        physicalDamageReduction = 19.35,
        magicDefense = 15,
        attackRange = 400,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 35.75,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"oracle_fortunes_end"}
    })
    database:set("drow_ranger", {
        id = "drow_ranger",
        unitName = "npc_dota_hero_drow_ranger",
        displayName = "卓尔游侠",
        position = "射手",
        rarity = ____exports.ChessRarity.UNCOMMON,
        cost = 2,
        race = {"不死"},
        class = {"猎人"},
        health = 650,
        maxMana = 0,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 0,
        attackManaRecovery = 5.2,
        damageManaRecovery = 0,
        skillCooldown = 0,
        damage = 60,
        armor = 3,
        physicalDamageReduction = 15.25,
        magicDefense = 15,
        attackRange = 800,
        attackSpeed = 0.8,
        attackInterval = 1.25,
        dps = 48,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"drow_ranger_frost_arrows"}
    })
    database:set("lina", {
        id = "lina",
        unitName = "npc_dota_hero_lina",
        displayName = "秀逗魔导师",
        position = "法师",
        rarity = ____exports.ChessRarity.UNCOMMON,
        cost = 2,
        race = {"人类"},
        class = {"法师"},
        health = 650,
        maxMana = 100,
        initialMana = 60,
        healthRecovery = 0,
        naturalManaRecovery = 4,
        attackManaRecovery = 5.6,
        damageManaRecovery = 0,
        skillCooldown = 10.42,
        damage = 55,
        armor = 3,
        physicalDamageReduction = 15.25,
        magicDefense = 15,
        attackRange = 600,
        attackSpeed = 0.7,
        attackInterval = 1.43,
        dps = 38.5,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"lina_dragon_slave"}
    })
    database:set("ember_spirit", {
        id = "ember_spirit",
        unitName = "npc_dota_hero_ember_spirit",
        displayName = "灰烬之灵",
        position = "战士",
        rarity = ____exports.ChessRarity.RARE,
        cost = 3,
        race = {"元素"},
        class = {"刺客"},
        health = 850,
        maxMana = 100,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 5.2,
        damageManaRecovery = 5,
        skillCooldown = 8.93,
        damage = 65,
        armor = 7,
        physicalDamageReduction = 29.58,
        magicDefense = 25,
        attackRange = 200,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 42.25,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"ember_spirit_searing_chains"}
    })
    database:set("anti_mage", {
        id = "anti_mage",
        unitName = "npc_dota_hero_antimage",
        displayName = "敌法师",
        position = "坦克",
        rarity = ____exports.ChessRarity.RARE,
        cost = 3,
        race = {"恶魔猎手"},
        class = {"刺客"},
        health = 800,
        maxMana = 80,
        initialMana = 50,
        healthRecovery = 0,
        naturalManaRecovery = 0,
        attackManaRecovery = 5.2,
        damageManaRecovery = 5,
        skillCooldown = 7.84,
        damage = 60,
        armor = 7,
        physicalDamageReduction = 29.58,
        magicDefense = 20,
        attackRange = 200,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 39,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"antimage_mana_break"}
    })
    database:set("terrorblade", {
        id = "terrorblade",
        unitName = "npc_dota_hero_terrorblade",
        displayName = "恐怖利刃",
        position = "法师",
        rarity = ____exports.ChessRarity.RARE,
        cost = 3,
        race = {"恶魔"},
        class = {"战士"},
        health = 800,
        maxMana = 140,
        initialMana = 60,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 4.8,
        damageManaRecovery = 5,
        skillCooldown = 12.96,
        damage = 65,
        armor = 6,
        physicalDamageReduction = 26.47,
        magicDefense = 20,
        attackRange = 200,
        attackSpeed = 0.6,
        attackInterval = 1.67,
        dps = 39,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"terrorblade_metamorphosis"}
    })
    database:set("viper", {
        id = "viper",
        unitName = "npc_dota_hero_viper",
        displayName = "冥界亚龙",
        position = "射手",
        rarity = ____exports.ChessRarity.RARE,
        cost = 3,
        race = {"龙族"},
        class = {"射手"},
        health = 750,
        maxMana = 0,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 0,
        attackManaRecovery = 6,
        damageManaRecovery = 0,
        skillCooldown = 0,
        damage = 70,
        armor = 4,
        physicalDamageReduction = 19.35,
        magicDefense = 15,
        attackRange = 600,
        attackSpeed = 0.75,
        attackInterval = 1.33,
        dps = 52.5,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"viper_poison_attack"}
    })
    database:set("death_prophet", {
        id = "death_prophet",
        unitName = "npc_dota_hero_death_prophet",
        displayName = "死亡先知",
        position = "辅助",
        rarity = ____exports.ChessRarity.RARE,
        cost = 3,
        race = {"不死"},
        class = {"法师"},
        health = 750,
        maxMana = 100,
        initialMana = 40,
        healthRecovery = 0,
        naturalManaRecovery = 3,
        attackManaRecovery = 5.6,
        damageManaRecovery = 0,
        skillCooldown = 11.63,
        damage = 60,
        armor = 5,
        physicalDamageReduction = 23.08,
        magicDefense = 15,
        attackRange = 400,
        attackSpeed = 0.7,
        attackInterval = 1.43,
        dps = 42,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"death_prophet_crypt_swarm"}
    })
    database:set("underlord", {
        id = "underlord",
        unitName = "npc_dota_hero_abyssal_underlord",
        displayName = "孽主",
        position = "坦克",
        rarity = ____exports.ChessRarity.EPIC,
        cost = 4,
        race = {"恶魔"},
        class = {"战士"},
        health = 1100,
        maxMana = 130,
        initialMana = 40,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 4.8,
        damageManaRecovery = 5,
        skillCooldown = 12.04,
        damage = 70,
        armor = 8,
        physicalDamageReduction = 32.43,
        magicDefense = 30,
        attackRange = 200,
        attackSpeed = 0.6,
        attackInterval = 1.67,
        dps = 42,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"abyssal_underlord_firestorm"}
    })
    database:set("shadow_fiend", {
        id = "shadow_fiend",
        unitName = "npc_dota_hero_nevermore",
        displayName = "影魔",
        position = "射手",
        rarity = ____exports.ChessRarity.EPIC,
        cost = 4,
        race = {"恶魔"},
        class = {"法师"},
        health = 850,
        maxMana = 6,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 0,
        damageManaRecovery = 0,
        skillCooldown = 6,
        damage = 0,
        armor = 6,
        physicalDamageReduction = 26.47,
        magicDefense = 25,
        attackRange = 0,
        attackSpeed = 0,
        attackInterval = 0,
        dps = 55,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"nevermore_shadowraze"}
    })
    database:set("crystal_maiden", {
        id = "crystal_maiden",
        unitName = "npc_dota_hero_crystal_maiden",
        displayName = "水晶室女",
        position = "法师",
        rarity = ____exports.ChessRarity.EPIC,
        cost = 4,
        race = {"人类"},
        class = {"法师"},
        health = 900,
        maxMana = 150,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 5,
        attackManaRecovery = 5.2,
        damageManaRecovery = 0,
        skillCooldown = 14.71,
        damage = 60,
        armor = 5,
        physicalDamageReduction = 23.08,
        magicDefense = 20,
        attackRange = 600,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 39,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"crystal_maiden_crystal_nova"}
    })
    database:set("ogre_magi", {
        id = "ogre_magi",
        unitName = "npc_dota_hero_ogre_magi",
        displayName = "食人魔法师",
        position = "辅助",
        rarity = ____exports.ChessRarity.EPIC,
        cost = 4,
        race = {"兽人"},
        class = {"法师"},
        health = 1100,
        maxMana = 80,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 4.8,
        damageManaRecovery = 5,
        skillCooldown = 7.41,
        damage = 60,
        armor = 7,
        physicalDamageReduction = 29.58,
        magicDefense = 25,
        attackRange = 200,
        attackSpeed = 0.6,
        attackInterval = 1.67,
        dps = 36,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"ogre_magi_fireblast"}
    })
    database:set("enigma", {
        id = "enigma",
        unitName = "npc_dota_hero_enigma",
        displayName = "谜团",
        position = "法师",
        rarity = ____exports.ChessRarity.LEGENDARY,
        cost = 5,
        race = {"元素"},
        class = {"法师"},
        health = 1000,
        maxMana = 150,
        initialMana = 50,
        healthRecovery = 0,
        naturalManaRecovery = 4,
        attackManaRecovery = 5.2,
        damageManaRecovery = 0,
        skillCooldown = 16.3,
        damage = 70,
        armor = 6,
        physicalDamageReduction = 26.47,
        magicDefense = 20,
        attackRange = 800,
        attackSpeed = 0.65,
        attackInterval = 1.54,
        dps = 45.5,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"enigma_black_hole"}
    })
    database:set("dawnbreaker", {
        id = "dawnbreaker",
        unitName = "npc_dota_hero_dawnbreaker",
        displayName = "破晓晨星",
        position = "坦克",
        rarity = ____exports.ChessRarity.LEGENDARY,
        cost = 5,
        race = {"人类"},
        class = {"战士"},
        health = 1300,
        maxMana = 140,
        initialMana = 20,
        healthRecovery = 0,
        naturalManaRecovery = 1,
        attackManaRecovery = 4.8,
        damageManaRecovery = 5,
        skillCooldown = 12.96,
        damage = 70,
        armor = 10,
        physicalDamageReduction = 37.5,
        magicDefense = 40,
        attackRange = 200,
        attackSpeed = 0.6,
        attackInterval = 1.67,
        dps = 42,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"dawnbreaker_fire_wreath"}
    })
    database:set("zeus", {
        id = "zeus",
        unitName = "npc_dota_hero_zuus",
        displayName = "宙斯",
        position = "射手",
        rarity = ____exports.ChessRarity.LEGENDARY,
        cost = 5,
        race = {"神"},
        class = {"法师"},
        health = 1000,
        maxMana = 100,
        initialMana = 0,
        healthRecovery = 0,
        naturalManaRecovery = 3,
        attackManaRecovery = 6,
        damageManaRecovery = 0,
        skillCooldown = 11.11,
        damage = 80,
        armor = 6,
        physicalDamageReduction = 26.47,
        magicDefense = 20,
        attackRange = 600,
        attackSpeed = 0.75,
        attackInterval = 1.33,
        dps = 60,
        criticalChance = 0,
        criticalDamage = 150,
        abilities = {"zuus_arc_lightning"}
    })
    return database
end
function AutoChessMode.prototype.initializePlayerStates(self)
    local playerCount = PlayerResource:GetPlayerCount()
    do
        local playerId = 0
        while playerId < playerCount do
            if PlayerResource:IsValidPlayer(playerId) then
                local playerState = {
                    playerId = playerId,
                    health = 100,
                    maxHealth = 100,
                    gold = 1,
                    level = 1,
                    experience = 0,
                    winStreak = 0,
                    lossStreak = 0,
                    boardPieces = {},
                    benchPieces = {},
                    isAlive = true,
                    rank = 0
                }
                self.gameState.playerStates:set(playerId, playerState)
            end
            playerId = playerId + 1
        end
    end
end
function AutoChessMode.prototype.distributeRoundIncome(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        do
            local __continue102
            repeat
                if not playerState.isAlive then
                    __continue102 = true
                    break
                end
                local income = 5
                local interestIncome = math.min(
                    math.floor(playerState.gold / 10),
                    5
                )
                income = income + interestIncome
                if playerState.winStreak >= 2 then
                    income = income + math.min(playerState.winStreak, 3)
                end
                if playerState.lossStreak >= 2 then
                    income = income + math.min(playerState.lossStreak, 3)
                end
                playerState.gold = playerState.gold + income
                print(((((("[AutoChessMode] Player " .. tostring(playerId)) .. " received ") .. tostring(income)) .. " gold (total: ") .. tostring(playerState.gold)) .. ")")
                __continue102 = true
            until true
            if not __continue102 then
                break
            end
        end
    end
end
function AutoChessMode.prototype.refreshAllPlayersShop(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        do
            local __continue108
            repeat
                if not playerState.isAlive then
                    __continue108 = true
                    break
                end
                local shopPieces = self:generateShopPieces(playerState.level)
                if GameRules.XNetTable then
                    GameRules.XNetTable:SetTableValue(
                        "autochess_shop",
                        "player_" .. tostring(playerId),
                        {
                            pieces = shopPieces,
                            refreshCount = 0,
                            timestamp = getTimestamp(nil)
                        }
                    )
                end
                __continue108 = true
            until true
            if not __continue108 then
                break
            end
        end
    end
end
function AutoChessMode.prototype.generateShopPieces(self, playerLevel)
    local shopPieces = {}
    local pieceCount = 5
    local rarityChances = self:calculateRarityChances(playerLevel)
    do
        local i = 0
        while i < pieceCount do
            local rarity = self:selectRandomRarity(rarityChances)
            local piece = self:selectRandomPieceByRarity(rarity)
            if piece then
                shopPieces[#shopPieces + 1] = piece
            end
            i = i + 1
        end
    end
    return shopPieces
end
function AutoChessMode.prototype.calculateRarityChances(self, playerLevel)
    local chances = __TS__New(Map)
    repeat
        local ____switch117 = playerLevel
        local ____cond117 = ____switch117 == 1
        if ____cond117 then
            chances:set(____exports.ChessRarity.COMMON, 100)
            break
        end
        ____cond117 = ____cond117 or ____switch117 == 2
        if ____cond117 then
            chances:set(____exports.ChessRarity.COMMON, 70)
            chances:set(____exports.ChessRarity.UNCOMMON, 30)
            break
        end
        ____cond117 = ____cond117 or ____switch117 == 3
        if ____cond117 then
            chances:set(____exports.ChessRarity.COMMON, 60)
            chances:set(____exports.ChessRarity.UNCOMMON, 35)
            chances:set(____exports.ChessRarity.RARE, 5)
            break
        end
        do
            chances:set(____exports.ChessRarity.COMMON, 50)
            chances:set(____exports.ChessRarity.UNCOMMON, 35)
            chances:set(____exports.ChessRarity.RARE, 10)
            chances:set(____exports.ChessRarity.EPIC, 4)
            chances:set(____exports.ChessRarity.LEGENDARY, 1)
        end
    until true
    return chances
end
function AutoChessMode.prototype.selectRandomRarity(self, chances)
    local totalChance = 0
    for ____, chance in __TS__Iterator(chances:values()) do
        totalChance = totalChance + chance
    end
    local random = RandomFloat(0, totalChance)
    local currentChance = 0
    for ____, ____value in __TS__Iterator(chances) do
        local rarity = ____value[1]
        local chance = ____value[2]
        currentChance = currentChance + chance
        if random <= currentChance then
            return rarity
        end
    end
    return ____exports.ChessRarity.COMMON
end
function AutoChessMode.prototype.selectRandomPieceByRarity(self, rarity)
    local pieces = {}
    for ____, piece in __TS__Iterator(self.chessPieceDatabase:values()) do
        if piece.rarity == rarity then
            local remaining = self.gameState.chessPool:get(piece.id) or 0
            if remaining > 0 then
                pieces[#pieces + 1] = piece
            end
        end
    end
    if #pieces == 0 then
        return nil
    end
    local randomIndex = RandomInt(0, #pieces - 1)
    return pieces[randomIndex + 1]
end
function AutoChessMode.prototype.setupBattleMatching(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            CustomGameEventManager:Send_ServerToAllClients(
                "autochess_battle_vs_ai",
                {
                    playerId = playerId,
                    round = self.gameState.currentRound,
                    aiLevel = math.floor(self.gameState.currentRound / 5) + 1
                }
            )
        end
    end
end
function AutoChessMode.prototype.startAllBattles(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            local aiLevel = math.floor(self.gameState.currentRound / 5) + 1
            print(((("[AutoChessMode] Player " .. tostring(playerId)) .. " vs AI (Level ") .. tostring(aiLevel)) .. ")")
            self.battleSystem:startBattleVsAI(playerId, aiLevel)
        end
    end
    print("[AutoChessMode] Started all AI battles")
end
function AutoChessMode.prototype.stopAllBattles(self)
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        self.battleSystem:clearPlayerPieces(playerId)
    end
    print("[AutoChessMode] Stopped all battles")
end
function AutoChessMode.prototype.calculateBattleResults(self)
    local battles = self.battleSystem:getActiveBattles()
    for ____, battle in ipairs(battles) do
        do
            local __continue142
            repeat
                if not battle.completed then
                    __continue142 = true
                    break
                end
                local battleKey = (tostring(battle.player1) .. "_vs_") .. tostring(battle.player2)
                if self.battleResultsProcessed:has(battleKey) then
                    __continue142 = true
                    break
                end
                local playerId = battle.player1
                local playerState = self.gameState.playerStates:get(playerId)
                if not playerState then
                    __continue142 = true
                    break
                end
                self.battleResultsProcessed:add(battleKey)
                if battle.winnerId == playerId then
                    playerState.winStreak = playerState.winStreak + 1
                    playerState.lossStreak = 0
                    print(("[AutoChessMode] Player " .. tostring(playerId)) .. " defeated AI!")
                else
                    local damage = math.min(10, self.gameState.currentRound)
                    playerState.health = playerState.health - damage
                    playerState.lossStreak = playerState.lossStreak + 1
                    playerState.winStreak = 0
                    print(((("[AutoChessMode] Player " .. tostring(playerId)) .. " lost to AI (") .. tostring(damage)) .. " damage)")
                    if playerState.health <= 0 then
                        playerState.isAlive = false
                        playerState.health = 0
                        print(("[AutoChessMode] Player " .. tostring(playerId)) .. " eliminated!")
                    end
                end
                __continue142 = true
            until true
            if not __continue142 then
                break
            end
        end
    end
    print("[AutoChessMode] Calculated battle results")
end
function AutoChessMode.prototype.checkGameEnd(self)
    local aliveCount = #__TS__ArrayFilter(
        __TS__ArrayFrom(self.gameState.playerStates:values()),
        function(____, state) return state.isAlive end
    )
    return aliveCount <= 1 or self.gameState.currentRound >= 50
end
function AutoChessMode.prototype.endGame(self)
    self.gameState.isGameActive = false
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        if playerState.isAlive then
            self.gameState.winnerPlayerId = playerId
            break
        end
    end
    print("[AutoChessMode] Game ended. Winner: Player " .. tostring(self.gameState.winnerPlayerId))
    CustomGameEventManager:Send_ServerToAllClients("autochess_game_ended", {winner = self.gameState.winnerPlayerId, round = self.gameState.currentRound})
end
function AutoChessMode.prototype.setupGame(self)
end
function AutoChessMode.prototype.cleanupGame(self)
    if self.phaseTimer then
        Timers:RemoveTimer(self.phaseTimer)
        self.phaseTimer = nil
    end
end
function AutoChessMode.prototype.registerEvents(self)
    print("[AutoChessMode] Registering battle_completed event listener...")
    CustomGameEventManager:RegisterListener(
        "battle_completed",
        function(userId, data)
            print(("[AutoChessMode] ===== battle_completed event triggered! userId: " .. tostring(userId)) .. " =====")
            self:onBattleCompleted(data)
        end
    )
    print("[AutoChessMode] Event listener registered successfully")
end
function AutoChessMode.prototype.onBattleCompleted(self, data)
    local battleId = data.battleId or (("battle_" .. tostring(data.player1)) .. "_") .. tostring(Date:now())
    local player1 = data.player1
    local player2 = data.player2 or -1
    local battleKey = (tostring(player1) .. "_vs_") .. tostring(player2)
    print(((("[AutoChessMode] Battle completed event received: " .. tostring(battleId)) .. " (key: ") .. battleKey) .. ")")
    if not self.isActive or self.gameState.currentPhase ~= ____exports.RoundPhase.BATTLE then
        print("[AutoChessMode] Ignoring battle_completed: not in battle phase or not active")
        return
    end
    if self.battleResultsProcessed:has(battleKey) then
        print(("[AutoChessMode] Battle " .. battleKey) .. " already processed, ignoring")
        return
    end
    self.battleResultsProcessed:add(battleKey)
    local playerId = player1
    local winnerId = data.winnerId
    local playerState = self.gameState.playerStates:get(playerId)
    if playerState then
        if winnerId == playerId then
            playerState.winStreak = playerState.winStreak + 1
            playerState.lossStreak = 0
            print(("[AutoChessMode] Player " .. tostring(playerId)) .. " won the battle!")
        else
            local damage = math.min(10, self.gameState.currentRound)
            playerState.health = playerState.health - damage
            playerState.lossStreak = playerState.lossStreak + 1
            playerState.winStreak = 0
            print(((((("[AutoChessMode] Player " .. tostring(playerId)) .. " lost (") .. tostring(damage)) .. " damage, health: ") .. tostring(playerState.health)) .. ")")
            if playerState.health <= 0 then
                playerState.isAlive = false
                playerState.health = 0
                print(("[AutoChessMode] Player " .. tostring(playerId)) .. " eliminated!")
            end
        end
    end
    local allBattlesCompleted = self:checkAllBattlesCompleted()
    if allBattlesCompleted then
        print("[AutoChessMode] All battles completed, ending battle phase")
        self:endBattlePhase()
    else
        print("[AutoChessMode] Waiting for other battles to complete...")
    end
end
function AutoChessMode.prototype.checkAllBattlesCompleted(self)
    local activeBattles = self.battleSystem:getActiveBattles()
    local alivePlayers = #__TS__ArrayFilter(
        __TS__ArrayFrom(self.gameState.playerStates:values()),
        function(____, state) return state.isAlive end
    )
    if alivePlayers == 0 then
        return true
    end
    for ____, battle in ipairs(activeBattles) do
        if not battle.completed then
            return false
        end
    end
    return true
end
function AutoChessMode.prototype.unregisterEvents(self)
end
function AutoChessMode.prototype.initializeAutoChessMode(self)
    print("[AutoChessMode] ========== 监听游戏状态事件 ==========")
    ListenToGameEvent(
        "game_rules_state_change",
        function()
            self:onGameStateChanged()
        end,
        self
    )
    print("[AutoChessMode] ✅ 游戏状态事件监听已注册")
end
function AutoChessMode.prototype.onGameStateChanged(self)
    local gameState = GameRules:State_Get()
    local stateNames = {
        "INIT",
        "WAIT_FOR_PLAYERS_TO_LOAD",
        "CUSTOM_GAME_SETUP",
        "HERO_SELECTION",
        "STRATEGY_TIME",
        "PRE_GAME",
        "GAME_IN_PROGRESS",
        "POST_GAME",
        "DISCONNECT",
        "TEAM_SHOWCASE",
        "CUSTOM_GAME_SETUP_2",
        "WAIT_FOR_MAP_TO_LOAD"
    }
    local stateName = stateNames[gameState + 1] or "UNKNOWN_" .. tostring(gameState)
    print(((("[AutoChessMode] ========== 游戏状态变化: " .. tostring(gameState)) .. " (") .. stateName) .. ") ==========")
    if gameState == 5 or gameState == 8 then
        if not self.isActive then
            print("[AutoChessMode] 📍 PRE_GAME 阶段 - 准备激活自走棋")
            self:onPreGame()
        end
    end
    if gameState == 6 and stateName == "GAME_IN_PROGRESS" then
        if self.isActive and not self.gameState.isGameActive then
            print("[AutoChessMode] 📍 GAME_IN_PROGRESS 阶段 - 游戏开始")
            self:onGameStart()
        end
    end
end
function AutoChessMode.prototype.onPreGame(self)
    local gameModeManager = GameModeManager:getInstance()
    if not gameModeManager:isAutoChessMode() then
        print("[AutoChessMode] ⚠️ 不是自走棋模式，跳过激活")
        return
    end
    print("[AutoChessMode] ✅ 激活自走棋模式...")
    self:activate()
    print("[AutoChessMode] 📍 将在2秒后开始游戏...")
    Timers:CreateTimer(
        2,
        function()
            if self.isActive and not self.gameState.isGameActive then
                print("[AutoChessMode] ✅ 自动开始游戏...")
                self:startGame()
            end
            return nil
        end
    )
end
function AutoChessMode.prototype.onGameStart(self)
    if not self.isActive then
        print("[AutoChessMode] ⚠️ 自走棋模式未激活，跳过游戏开始")
        return
    end
    print("[AutoChessMode] ✅ 自动开始游戏...")
    self:startGame()
end
function AutoChessMode.prototype.syncStateToNetTable(self)
    if GameRules.XNetTable then
        GameRules.XNetTable:SetTableValue(
            "autochess_game",
            "state",
            {
                isActive = self.isActive,
                gameState = {currentRound = self.gameState.currentRound, currentPhase = self.gameState.currentPhase, phaseTimeLeft = self.gameState.phaseTimeLeft, isGameActive = self.gameState.isGameActive},
                timestamp = getTimestamp(nil)
            }
        )
    end
end
function AutoChessMode.prototype.getStatus(self)
    return {isActive = self.isActive, gameState = self.gameState, chessPieceCount = self.chessPieceDatabase.size}
end
function AutoChessMode.prototype.buyChessPiece(self, playerId, pieceId)
    local playerState = self.gameState.playerStates:get(playerId)
    local piece = self.chessPieceDatabase:get(pieceId)
    if not playerState or not piece then
        return false
    end
    if playerState.gold < piece.cost then
        return false
    end
    local remaining = self.gameState.chessPool:get(pieceId) or 0
    if remaining <= 0 then
        return false
    end
    if #playerState.benchPieces >= 8 then
        return false
    end
    playerState.gold = playerState.gold - piece.cost
    local ____playerState_benchPieces_4 = playerState.benchPieces
    ____playerState_benchPieces_4[#____playerState_benchPieces_4 + 1] = piece
    self.gameState.chessPool:set(pieceId, remaining - 1)
    print((("[AutoChessMode] Player " .. tostring(playerId)) .. " bought ") .. piece.displayName)
    self:syncPlayerState(playerId)
    return true
end
function AutoChessMode.prototype.syncPlayerState(self, playerId)
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState or not GameRules.XNetTable then
        return
    end
    GameRules.XNetTable:SetTableValue(
        "autochess_player",
        "player_" .. tostring(playerId),
        {
            health = playerState.health,
            maxHealth = playerState.maxHealth,
            gold = playerState.gold,
            level = playerState.level,
            experience = playerState.experience,
            winStreak = playerState.winStreak,
            lossStreak = playerState.lossStreak,
            boardPieces = playerState.boardPieces,
            benchPieces = playerState.benchPieces,
            isAlive = playerState.isAlive,
            rank = playerState.rank,
            timestamp = getTimestamp(nil)
        }
    )
end
function AutoChessMode.prototype.getChessPiece(self, pieceId)
    return self.chessPieceDatabase:get(pieceId) or nil
end
function AutoChessMode.prototype.getAllChessPieces(self)
    return __TS__ArrayFrom(self.chessPieceDatabase:values())
end
function AutoChessMode.prototype.triggerWaveSettlement(self)
    if self.currentWaveSettlementShown then
        print("[AutoChessMode] Wave settlement already shown")
        return
    end
    self.currentWaveSettlementShown = true
    self.currentWaveSettlementPending = true
    local settlementData = {
        round = self.gameState.currentRound,
        rewardGold = self.currentWaveRewardAmount,
        availableStages = {"stage_1", "stage_2", "stage_3"},
        playerSummary = self:buildPlayerSummary()
    }
    print("[AutoChessMode] Triggering wave settlement for round " .. tostring(self.gameState.currentRound))
    CustomGameEventManager:Send_ServerToAllClients("autochess_wave_settlement", settlementData)
end
function AutoChessMode.prototype.buildPlayerSummary(self)
    local summary = {}
    for ____, ____value in __TS__Iterator(self.gameState.playerStates) do
        local playerId = ____value[1]
        local playerState = ____value[2]
        summary[playerId] = {
            health = playerState.health,
            gold = playerState.gold,
            isAlive = playerState.isAlive,
            winStreak = playerState.winStreak,
            lossStreak = playerState.lossStreak
        }
    end
    return summary
end
function AutoChessMode.prototype.handleWaveContinue(self, playerId)
    if not self.currentWaveSettlementPending then
        print("[AutoChessMode] No settlement pending for player " .. tostring(playerId))
        return
    end
    print(("[AutoChessMode] Player " .. tostring(playerId)) .. " chose to continue battle")
    self.currentWaveSettlementPending = false
    CustomGameEventManager:Send_ServerToAllClients("autochess_wave_settlement_dismiss", {})
    local ____self_gameState_5, ____currentRound_6 = self.gameState, "currentRound"
    ____self_gameState_5[____currentRound_6] = ____self_gameState_5[____currentRound_6] + 1
    self:startPreparationPhase()
end
function AutoChessMode.prototype.handleWaveRewardClaim(self, playerId)
    if self.currentWaveRewardClaimed:has(playerId) then
        print(("[AutoChessMode] Player " .. tostring(playerId)) .. " already claimed reward")
        return
    end
    local playerState = self.gameState.playerStates:get(playerId)
    if not playerState then
        print("[AutoChessMode] Player state not found for " .. tostring(playerId))
        return
    end
    playerState.gold = playerState.gold + self.currentWaveRewardAmount
    self.currentWaveRewardClaimed:add(playerId)
    print(((((("[AutoChessMode] Player " .. tostring(playerId)) .. " claimed ") .. tostring(self.currentWaveRewardAmount)) .. " gold (total: ") .. tostring(playerState.gold)) .. ")")
    CustomGameEventManager:Send_ServerToPlayer(
        PlayerResource:GetPlayer(playerId),
        "autochess_wave_reward_granted",
        {amount = self.currentWaveRewardAmount, newTotal = playerState.gold}
    )
    self:syncPlayerState(playerId)
end
function AutoChessMode.prototype.sendAvailableStages(self)
    local allStages = StageConfigManager:getAllStageConfigs()
    local availableStages = {}
    for ____, ____value in __TS__Iterator(allStages) do
        local stageId = ____value[1]
        local config = ____value[2]
        availableStages[#availableStages + 1] = {
            id = tostring(stageId),
            name = "关卡" .. tostring(stageId),
            type = config.primaryNodeType,
            nodeLevel = config.nodeLevel,
            description = self:getStageDescription(config)
        }
    end
    CustomGameEventManager:Send_ServerToAllClients("autochess_stages_available", {stages = availableStages, round = self.gameState.currentRound})
    print(("[AutoChessMode] Sent " .. tostring(#availableStages)) .. " available stages to clients")
end
function AutoChessMode.prototype.getStageDescription(self, config)
    local typeNames = {
        normal_battle = "普通战斗",
        elite_battle = "精英战斗",
        event = "事件",
        event_evacuate = "事件/撤离",
        boss = "Boss"
    }
    local typeName = typeNames[config.primaryNodeType] or config.primaryNodeType
    local monsterCount = StageConfigManager:rollMonsterCount(config.stageId)
    local totalCount = monsterCount.normalCount + (monsterCount.specialCount or 0)
    return ((tostring(typeName) .. " | 怪物数量: ") .. tostring(totalCount)) .. "个"
end
function AutoChessMode.prototype.handleWaveStageSelection(self, playerId, stageId)
    local stageIdNum = __TS__ParseInt(stageId)
    local stageConfig = StageConfigManager:getStageConfig(stageIdNum)
    if not stageConfig then
        print("[AutoChessMode] ERROR: 无效的关卡ID: " .. stageId)
        CustomGameEventManager:Send_ServerToPlayer(
            PlayerResource:GetPlayer(playerId),
            "autochess_wave_stage_ack",
            {stageId = stageId, success = false, message = "无效的关卡ID"}
        )
        return
    end
    print(((((("[AutoChessMode] Player " .. tostring(playerId)) .. " selected stage: ") .. stageId) .. " (") .. stageConfig.primaryNodeType) .. ")")
    self.currentWaveStageSelection = stageId
    CustomGameEventManager:Send_ServerToAllClients("autochess_wave_stage_ack", {
        playerId = playerId,
        stageId = stageId,
        success = true,
        stageName = "关卡" .. stageId,
        stageType = stageConfig.primaryNodeType,
        message = ("已选择关卡" .. stageId) .. "，将在战斗阶段生成怪物"
    })
    print(("[AutoChessMode] 关卡选择已记录，将在战斗阶段使用关卡" .. stageId) .. "生成怪物")
end
return ____exports
