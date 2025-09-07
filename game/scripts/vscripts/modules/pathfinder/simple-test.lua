local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__New = ____lualib.__TS__New
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 4,["11"] = 4,["12"] = 4,["15"] = 10,["16"] = 10,["18"] = 11,["19"] = 12,["20"] = 10,["21"] = 17,["22"] = 18,["23"] = 17,["24"] = 28,["25"] = 29,["26"] = 30,["27"] = 32,["28"] = 32,["29"] = 32,["30"] = 32,["31"] = 28,["32"] = 41,["33"] = 42,["34"] = 41,["35"] = 48,["36"] = 49,["37"] = 48,["38"] = 55,["39"] = 56,["40"] = 55,["42"] = 63,["43"] = 63,["44"] = 70,["45"] = 68,["46"] = 71,["47"] = 72,["48"] = 73,["49"] = 74,["50"] = 70,["51"] = 80,["52"] = 81,["53"] = 80,["54"] = 87,["55"] = 88,["56"] = 87,["57"] = 94,["58"] = 95,["59"] = 96,["62"] = 100,["63"] = 103,["64"] = 104,["65"] = 107,["66"] = 108,["67"] = 94,["69"] = 115,["70"] = 116,["73"] = 263,["76"] = 120,["77"] = 124,["78"] = 125,["79"] = 125,["80"] = 125,["81"] = 125,["82"] = 125,["83"] = 125,["84"] = 125,["85"] = 125,["86"] = 125,["87"] = 124,["88"] = 126,["89"] = 126,["90"] = 126,["91"] = 126,["92"] = 126,["93"] = 126,["94"] = 126,["95"] = 126,["96"] = 126,["97"] = 124,["98"] = 127,["99"] = 127,["100"] = 127,["101"] = 127,["102"] = 127,["103"] = 127,["104"] = 127,["105"] = 127,["106"] = 127,["107"] = 124,["108"] = 128,["109"] = 128,["110"] = 128,["111"] = 128,["112"] = 128,["113"] = 128,["114"] = 128,["115"] = 128,["116"] = 128,["117"] = 124,["118"] = 129,["119"] = 129,["120"] = 129,["121"] = 129,["122"] = 129,["123"] = 129,["124"] = 129,["125"] = 129,["126"] = 129,["127"] = 124,["128"] = 130,["129"] = 130,["130"] = 130,["131"] = 130,["132"] = 130,["133"] = 130,["134"] = 130,["135"] = 130,["136"] = 130,["137"] = 124,["138"] = 131,["139"] = 131,["140"] = 131,["141"] = 131,["142"] = 131,["143"] = 131,["144"] = 131,["145"] = 131,["146"] = 131,["147"] = 124,["148"] = 132,["149"] = 132,["150"] = 132,["151"] = 132,["152"] = 132,["153"] = 132,["154"] = 132,["155"] = 132,["156"] = 132,["157"] = 124,["158"] = 124,["159"] = 135,["160"] = 136,["161"] = 136,["162"] = 136,["163"] = 137,["164"] = 136,["165"] = 136,["166"] = 139,["167"] = 142,["168"] = 143,["169"] = 146,["170"] = 147,["171"] = 149,["172"] = 150,["173"] = 151,["174"] = 151,["175"] = 151,["176"] = 151,["177"] = 152,["178"] = 153,["179"] = 156,["180"] = 157,["181"] = 157,["182"] = 157,["183"] = 157,["184"] = 157,["185"] = 157,["186"] = 156,["187"] = 158,["188"] = 158,["189"] = 158,["190"] = 158,["191"] = 158,["192"] = 158,["193"] = 156,["194"] = 159,["195"] = 159,["196"] = 159,["197"] = 159,["198"] = 159,["199"] = 159,["200"] = 156,["201"] = 160,["202"] = 160,["203"] = 160,["204"] = 160,["205"] = 160,["206"] = 160,["207"] = 156,["208"] = 156,["209"] = 163,["210"] = 164,["211"] = 164,["212"] = 164,["213"] = 165,["214"] = 166,["215"] = 164,["216"] = 164,["217"] = 168,["218"] = 171,["219"] = 174,["220"] = 175,["221"] = 176,["222"] = 177,["223"] = 177,["224"] = 177,["225"] = 177,["226"] = 178,["227"] = 181,["228"] = 182,["229"] = 183,["230"] = 183,["231"] = 183,["232"] = 184,["233"] = 185,["234"] = 183,["235"] = 183,["236"] = 189,["238"] = 191,["240"] = 195,["241"] = 196,["242"] = 197,["243"] = 198,["244"] = 198,["245"] = 198,["246"] = 198,["247"] = 199,["248"] = 201,["249"] = 202,["250"] = 203,["251"] = 203,["252"] = 203,["253"] = 204,["254"] = 205,["255"] = 203,["256"] = 203,["257"] = 208,["259"] = 210,["261"] = 214,["262"] = 215,["263"] = 216,["264"] = 217,["265"] = 219,["266"] = 219,["267"] = 219,["268"] = 220,["269"] = 221,["270"] = 223,["271"] = 224,["272"] = 226,["273"] = 227,["274"] = 227,["275"] = 227,["276"] = 227,["278"] = 229,["280"] = 219,["281"] = 219,["282"] = 234,["283"] = 235,["284"] = 238,["285"] = 239,["286"] = 241,["287"] = 242,["288"] = 243,["289"] = 243,["290"] = 243,["291"] = 243,["292"] = 244,["293"] = 245,["294"] = 246,["295"] = 246,["296"] = 246,["297"] = 247,["298"] = 248,["299"] = 246,["300"] = 246,["302"] = 251,["304"] = 254,["305"] = 255,["306"] = 256,["307"] = 257,["308"] = 258,["309"] = 259,["310"] = 260,["316"] = 115,["318"] = 270,["319"] = 271,["320"] = 272,["321"] = 270,["322"] = 276});
local ____exports = {}
local ____index = require("modules.pathfinder.index")
local Pathfinder = ____index.Pathfinder
local Grid = ____index.Grid
--- 模拟zizouqi项目的坐标系统
-- 基于8x8的棋盘网格，每个格子128x128单位
local ChessCoordinateSystem = __TS__Class()
ChessCoordinateSystem.name = "ChessCoordinateSystem"
function ChessCoordinateSystem.prototype.____constructor(self)
    self.baseVector = {x = 0, y = 0, z = 256}
    self.gridSize = 128
end
function ChessCoordinateSystem.prototype.gridToWorld(self, x, y)
    return {x = self.baseVector.x + (x - 1) * self.gridSize, y = self.baseVector.y + (y - 1) * self.gridSize, z = self.baseVector.z}
end
function ChessCoordinateSystem.prototype.worldToGrid(self, worldPos)
    local relativeX = worldPos.x - self.baseVector.x
    local relativeY = worldPos.y - self.baseVector.y
    return {
        x = math.floor((relativeX + 192) / self.gridSize),
        y = math.floor((relativeY + 192) / self.gridSize)
    }
end
function ChessCoordinateSystem.prototype.isValidPosition(self, x, y)
    return x >= 1 and x <= 8 and y >= 1 and y <= 8
end
function ChessCoordinateSystem.prototype.isInDefendArea(self, x, y)
    return x >= 1 and x <= 8 and y >= 1 and y <= 4
end
function ChessCoordinateSystem.prototype.isInAttackArea(self, x, y)
    return x >= 1 and x <= 8 and y >= 5 and y <= 8
end
--- 模拟棋子类 (基于zizouqi项目的棋子实现)
local ChessPiece = __TS__Class()
ChessPiece.name = "ChessPiece"
function ChessPiece.prototype.____constructor(self, name, x, y, teamId)
    self.isMoving = false
    self.name = name
    self.x = x
    self.y = y
    self.teamId = teamId
end
function ChessPiece.prototype.getGridPosition(self)
    return {x = self.x, y = self.y}
end
function ChessPiece.prototype.getWorldPosition(self, coordinateSystem)
    return coordinateSystem:gridToWorld(self.x, self.y)
end
function ChessPiece.prototype.moveTo(self, newX, newY, coordinateSystem)
    if not coordinateSystem:isValidPosition(newX, newY) then
        print(((("❌ 无效的移动位置: (" .. tostring(newX)) .. ", ") .. tostring(newY)) .. ")")
        return
    end
    print(((((((((("♟️ " .. self.name) .. " 从 (") .. tostring(self.x)) .. ", ") .. tostring(self.y)) .. ") 移动到 (") .. tostring(newX)) .. ", ") .. tostring(newY)) .. ")")
    self.x = newX
    self.y = newY
    local worldPos = coordinateSystem:gridToWorld(newX, newY)
    print(((((("🌍 世界坐标: (" .. __TS__NumberToFixed(worldPos.x, 1)) .. ", ") .. __TS__NumberToFixed(worldPos.y, 1)) .. ", ") .. __TS__NumberToFixed(worldPos.z, 1)) .. ")")
end
--- 基于zizouqi项目的棋子寻路测试
function ____exports.chessPathfindingTest(self)
    print("♟️ 运行基于zizouqi项目的棋子寻路测试...\n")
    do
        local function ____catch(____error)
            print("❌ 测试失败，错误:", ____error)
        end
        local ____try, ____hasReturned = pcall(function()
            local coordinateSystem = __TS__New(ChessCoordinateSystem)
            local chessMap = {
                {
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                },
                {
                    0,
                    1,
                    0,
                    1,
                    0,
                    1,
                    0,
                    1
                },
                {
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                },
                {
                    0,
                    1,
                    0,
                    1,
                    0,
                    1,
                    0,
                    1
                },
                {
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                },
                {
                    0,
                    1,
                    0,
                    1,
                    0,
                    1,
                    0,
                    1
                },
                {
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                },
                {
                    0,
                    1,
                    0,
                    1,
                    0,
                    1,
                    0,
                    1
                }
            }
            print("🏁 创建8x8棋盘地图:")
            __TS__ArrayForEach(
                chessMap,
                function(____, row, index)
                    print(((("第" .. tostring(index + 1)) .. "行: [") .. table.concat(row, ", ")) .. "]")
                end
            )
            print("")
            local grid = __TS__New(Grid, chessMap, 0)
            local pathfinder = __TS__New(Pathfinder, grid, "ASTAR", 0)
            pathfinder:setHeuristic("MANHATTAN")
            pathfinder:setMode("DIAGONAL")
            print("🧭 寻路器配置:")
            print("- 算法: " .. pathfinder:getAlgorithm())
            print("- 启发式: " .. (__TS__ArrayIndexOf(
                pathfinder:getHeuristics(),
                "MANHATTAN"
            ) >= 0 and "MANHATTAN" or "默认"))
            print("- 移动模式: " .. pathfinder:getMode())
            print("")
            local chessPieces = {
                __TS__New(
                    ChessPiece,
                    "战士",
                    1,
                    1,
                    1
                ),
                __TS__New(
                    ChessPiece,
                    "法师",
                    8,
                    1,
                    1
                ),
                __TS__New(
                    ChessPiece,
                    "射手",
                    1,
                    4,
                    1
                ),
                __TS__New(
                    ChessPiece,
                    "坦克",
                    8,
                    4,
                    1
                )
            }
            print("♟️ 创建棋子:")
            __TS__ArrayForEach(
                chessPieces,
                function(____, piece)
                    local worldPos = piece:getWorldPosition(coordinateSystem)
                    print(((((((((("- " .. piece.name) .. ": 网格(") .. tostring(piece.x)) .. ", ") .. tostring(piece.y)) .. ") -> 世界(") .. __TS__NumberToFixed(worldPos.x, 1)) .. ", ") .. __TS__NumberToFixed(worldPos.y, 1)) .. ")")
                end
            )
            print("")
            print("🛤️ 测试棋子寻路:")
            print("\n📋 测试1: 战士从防守区域移动到进攻区域")
            local warriorPath = pathfinder:getPath(1, 1, 1, 8)
            if warriorPath then
                print("✅ 找到路径! 长度: " .. __TS__NumberToFixed(
                    warriorPath:getLength(),
                    2
                ))
                print("📊 节点数量: " .. tostring(#warriorPath:getNodes()))
                local pathPositions = warriorPath:toPositions()
                print("🔄 移动路径:")
                __TS__ArrayForEach(
                    pathPositions,
                    function(____, pos, index)
                        local worldPos = coordinateSystem:gridToWorld(pos.x, pos.y)
                        print(((((((((("  步骤" .. tostring(index + 1)) .. ": 网格(") .. tostring(pos.x)) .. ", ") .. tostring(pos.y)) .. ") -> 世界(") .. __TS__NumberToFixed(worldPos.x, 1)) .. ", ") .. __TS__NumberToFixed(worldPos.y, 1)) .. ")")
                    end
                )
                chessPieces[1]:moveTo(1, 8, coordinateSystem)
            else
                print("❌ 未找到路径")
            end
            print("\n📋 测试2: 法师对角线移动到中心位置")
            local magePath = pathfinder:getPath(8, 1, 4, 5)
            if magePath then
                print("✅ 找到路径! 长度: " .. __TS__NumberToFixed(
                    magePath:getLength(),
                    2
                ))
                print("📊 节点数量: " .. tostring(#magePath:getNodes()))
                local pathPositions = magePath:toPositions()
                print("🔄 移动路径:")
                __TS__ArrayForEach(
                    pathPositions,
                    function(____, pos, index)
                        local worldPos = coordinateSystem:gridToWorld(pos.x, pos.y)
                        print(((((((((("  步骤" .. tostring(index + 1)) .. ": 网格(") .. tostring(pos.x)) .. ", ") .. tostring(pos.y)) .. ") -> 世界(") .. __TS__NumberToFixed(worldPos.x, 1)) .. ", ") .. __TS__NumberToFixed(worldPos.y, 1)) .. ")")
                    end
                )
                chessPieces[2]:moveTo(4, 5, coordinateSystem)
            else
                print("❌ 未找到路径")
            end
            print("\n📋 测试3: 不同算法的性能比较")
            local algorithms = {"ASTAR", "DIJKSTRA", "BFS", "DFS"}
            local startPos = {x = 1, y = 4}
            local endPos = {x = 8, y = 5}
            __TS__ArrayForEach(
                algorithms,
                function(____, algorithm)
                    pathfinder:setAlgorithm(algorithm)
                    local startTime = Date:now()
                    local path = pathfinder:getPath(startPos.x, startPos.y, endPos.x, endPos.y)
                    local endTime = Date:now()
                    if path then
                        print((((algorithm .. ": 找到路径，耗时") .. tostring(endTime - startTime)) .. "ms，长度") .. __TS__NumberToFixed(
                            path:getLength(),
                            2
                        ))
                    else
                        print(((algorithm .. ": 未找到路径，耗时") .. tostring(endTime - startTime)) .. "ms")
                    end
                end
            )
            print("\n📋 测试4: 障碍物避让测试")
            pathfinder:setAlgorithm("ASTAR")
            chessMap[3][5] = 1
            grid:resetNodes()
            local obstaclePath = pathfinder:getPath(1, 1, 8, 8)
            if obstaclePath then
                print("✅ 成功避开障碍物! 路径长度: " .. __TS__NumberToFixed(
                    obstaclePath:getLength(),
                    2
                ))
                local pathPositions = obstaclePath:toPositions()
                print("🔄 避障路径:")
                __TS__ArrayForEach(
                    pathPositions,
                    function(____, pos, index)
                        local worldPos = coordinateSystem:gridToWorld(pos.x, pos.y)
                        print(((((((((("  步骤" .. tostring(index + 1)) .. ": 网格(") .. tostring(pos.x)) .. ", ") .. tostring(pos.y)) .. ") -> 世界(") .. __TS__NumberToFixed(worldPos.x, 1)) .. ", ") .. __TS__NumberToFixed(worldPos.y, 1)) .. ")")
                    end
                )
            else
                print("❌ 无法避开障碍物")
            end
            print("\n✨ 基于zizouqi项目的棋子寻路测试完成!")
            print("📝 这个测试展示了:")
            print("   - 8x8棋盘网格系统")
            print("   - 网格坐标与世界坐标转换")
            print("   - 棋子的寻路和移动")
            print("   - 不同算法的性能比较")
            print("   - 障碍物避让能力")
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
--- 运行所有测试
function ____exports.runAllTests(self)
    print("🚀 运行所有寻路测试\n")
    ____exports.chessPathfindingTest(nil)
end
____exports.default = {chessPathfindingTest = ____exports.chessPathfindingTest, runAllTests = ____exports.runAllTests}
return ____exports
