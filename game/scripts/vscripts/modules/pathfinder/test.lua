local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 1,["10"] = 1,["13"] = 7,["14"] = 7,["15"] = 7,["17"] = 7,["18"] = 12,["19"] = 13,["22"] = 42,["23"] = 43,["26"] = 16,["27"] = 17,["28"] = 17,["29"] = 17,["30"] = 17,["31"] = 17,["32"] = 16,["33"] = 18,["34"] = 18,["35"] = 18,["36"] = 18,["37"] = 18,["38"] = 16,["39"] = 19,["40"] = 19,["41"] = 19,["42"] = 19,["43"] = 19,["44"] = 16,["45"] = 20,["46"] = 20,["47"] = 20,["48"] = 20,["49"] = 20,["50"] = 16,["51"] = 23,["52"] = 24,["53"] = 26,["54"] = 28,["55"] = 29,["56"] = 30,["58"] = 33,["59"] = 34,["60"] = 35,["62"] = 38,["63"] = 39,["69"] = 15,["72"] = 12,["73"] = 50,["74"] = 51,["77"] = 84,["78"] = 85,["81"] = 54,["82"] = 59,["83"] = 62,["84"] = 63,["85"] = 64,["87"] = 68,["88"] = 69,["89"] = 70,["91"] = 74,["92"] = 75,["93"] = 76,["94"] = 77,["96"] = 80,["97"] = 81,["103"] = 53,["106"] = 50,["107"] = 92,["108"] = 93,["111"] = 126,["112"] = 127,["115"] = 96,["116"] = 97,["117"] = 97,["118"] = 97,["119"] = 97,["120"] = 97,["121"] = 96,["122"] = 98,["123"] = 98,["124"] = 98,["125"] = 98,["126"] = 98,["127"] = 96,["128"] = 99,["129"] = 99,["130"] = 99,["131"] = 99,["132"] = 99,["133"] = 96,["134"] = 102,["135"] = 103,["136"] = 106,["137"] = 107,["138"] = 110,["139"] = 111,["140"] = 114,["141"] = 115,["142"] = 117,["143"] = 118,["144"] = 119,["146"] = 122,["147"] = 123,["153"] = 95,["156"] = 92,["157"] = 134,["158"] = 135,["161"] = 170,["162"] = 171,["165"] = 139,["166"] = 140,["167"] = 141,["168"] = 142,["170"] = 146,["171"] = 147,["172"] = 148,["173"] = 149,["175"] = 153,["176"] = 154,["177"] = 155,["178"] = 156,["180"] = 160,["181"] = 161,["182"] = 162,["183"] = 163,["185"] = 166,["186"] = 167,["192"] = 137,["195"] = 134,["196"] = 178,["197"] = 179,["200"] = 214,["201"] = 215,["204"] = 182,["205"] = 188,["206"] = 189,["207"] = 192,["208"] = 193,["209"] = 196,["210"] = 197,["211"] = 199,["212"] = 200,["213"] = 201,["215"] = 205,["216"] = 206,["217"] = 207,["219"] = 210,["220"] = 211,["226"] = 181,["229"] = 178,["230"] = 222,["231"] = 223,["234"] = 276,["235"] = 277,["238"] = 226,["239"] = 231,["240"] = 232,["241"] = 234,["242"] = 236,["243"] = 237,["244"] = 238,["246"] = 242,["247"] = 243,["248"] = 244,["250"] = 247,["251"] = 248,["252"] = 249,["254"] = 252,["255"] = 253,["256"] = 254,["257"] = 255,["259"] = 259,["260"] = 260,["261"] = 262,["262"] = 263,["263"] = 264,["265"] = 267,["266"] = 268,["267"] = 269,["269"] = 272,["270"] = 273,["276"] = 225,["279"] = 222,["280"] = 284,["281"] = 285,["282"] = 287,["283"] = 287,["284"] = 287,["285"] = 287,["286"] = 287,["287"] = 287,["288"] = 287,["289"] = 287,["290"] = 296,["291"] = 297,["292"] = 299,["293"] = 300,["294"] = 301,["296"] = 303,["298"] = 306,["299"] = 308,["300"] = 309,["302"] = 311,["304"] = 284,["305"] = 317});
local ____exports = {}
local ____index = require("modules.pathfinder.index")
local Pathfinder = ____index.Pathfinder
local Grid = ____index.Grid
local Heuristics = ____index.Heuristics
--- Test suite for the pathfinding module
-- Run this to verify all functionality works correctly
____exports.PathfindingTests = __TS__Class()
local PathfindingTests = ____exports.PathfindingTests
PathfindingTests.name = "PathfindingTests"
function PathfindingTests.prototype.____constructor(self)
end
function PathfindingTests.testBasicAStar(self)
    print("🧪 Testing Basic A*...")
    do
        local function ____catch(____error)
            print("❌ Test failed with error:", ____error)
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local map = {{
                0,
                1,
                0,
                1,
                0
            }, {
                0,
                1,
                0,
                1,
                0
            }, {
                0,
                1,
                1,
                1,
                0
            }, {
                0,
                0,
                0,
                0,
                0
            }}
            local grid = __TS__New(Grid, map, 0)
            local pathfinder = __TS__New(Pathfinder, grid, "ASTAR", 0)
            local path = pathfinder:getPath(0, 0, 4, 0)
            if not path then
                print("❌ Test failed: No path found")
                return true, false
            end
            if path:getNodeCount() < 2 then
                print("❌ Test failed: Path too short")
                return true, false
            end
            print("✅ Basic A* test passed")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function PathfindingTests.testGridValidation(self)
    print("🧪 Testing Grid Validation...")
    do
        local function ____catch(____error)
            print("❌ Test failed with error:", ____error)
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local map = {{0, 0, 0}, {0, 0, 0}}
            local grid = __TS__New(Grid, map, 0)
            if not grid:isValidPosition(0, 0) or not grid:isValidPosition(2, 1) then
                print("❌ Test failed: Valid positions not recognized")
                return true, false
            end
            if grid:isValidPosition(-1, 0) or grid:isValidPosition(3, 1) or grid:isValidPosition(0, 2) then
                print("❌ Test failed: Invalid positions not recognized")
                return true, false
            end
            local node = grid:getNode(1, 1)
            if not node or node.x ~= 1 or node.y ~= 1 then
                print("❌ Test failed: Node retrieval failed")
                return true, false
            end
            print("✅ Grid validation test passed")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function PathfindingTests.testAlgorithmSwitching(self)
    print("🧪 Testing Algorithm Switching...")
    do
        local function ____catch(____error)
            print("❌ Test failed with error:", ____error)
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local map = {{
                0,
                0,
                0,
                0,
                0
            }, {
                0,
                1,
                1,
                1,
                0
            }, {
                0,
                0,
                0,
                0,
                0
            }}
            local grid = __TS__New(Grid, map, 0)
            local pathfinder = __TS__New(Pathfinder, grid, "ASTAR", 0)
            pathfinder:setAlgorithm("ASTAR")
            local astarPath = pathfinder:getPath(0, 0, 4, 2)
            pathfinder:setAlgorithm("DIJKSTRA")
            local dijkstraPath = pathfinder:getPath(0, 0, 4, 2)
            pathfinder:setAlgorithm("BFS")
            local bfsPath = pathfinder:getPath(0, 0, 4, 2)
            if not astarPath or not dijkstraPath or not bfsPath then
                print("❌ Test failed: One or more algorithms failed to find path")
                return true, false
            end
            print("✅ Algorithm switching test passed")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function PathfindingTests.testHeuristics(self)
    print("🧪 Testing Heuristic Functions...")
    do
        local function ____catch(____error)
            print("❌ Test failed with error:", ____error)
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local manhattan = Heuristics:MANHATTAN(3, 4)
            if manhattan ~= 7 then
                print("❌ Test failed: Manhattan heuristic incorrect")
                return true, false
            end
            local euclidean = Heuristics:EUCLIDEAN(3, 4)
            if math.abs(euclidean - 5) > 0.001 then
                print("❌ Test failed: Euclidean heuristic incorrect")
                return true, false
            end
            local chebyshev = Heuristics:CHEBYSHEV(3, 4)
            if chebyshev ~= 4 then
                print("❌ Test failed: Chebyshev heuristic incorrect")
                return true, false
            end
            local manhattan2 = Heuristics:get("MANHATTAN")
            if manhattan2(nil, 3, 4) ~= 7 then
                print("❌ Test failed: Heuristic getter failed")
                return true, false
            end
            print("✅ Heuristic functions test passed")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function PathfindingTests.testMovementModes(self)
    print("🧪 Testing Movement Modes...")
    do
        local function ____catch(____error)
            print("❌ Test failed with error:", ____error)
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local map = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
            local grid = __TS__New(Grid, map, 0)
            local pathfinder = __TS__New(Pathfinder, grid, "ASTAR", 0)
            pathfinder:setMode("DIAGONAL")
            local diagonalPath = pathfinder:getPath(0, 0, 2, 2)
            pathfinder:setMode("ORTHOGONAL")
            local orthogonalPath = pathfinder:getPath(0, 0, 2, 2)
            if not diagonalPath or not orthogonalPath then
                print("❌ Test failed: Movement modes failed to find path")
                return true, false
            end
            if diagonalPath:getLength() >= orthogonalPath:getLength() then
                print("❌ Test failed: Diagonal path not shorter than orthogonal")
                return true, false
            end
            print("✅ Movement modes test passed")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function PathfindingTests.testPathProperties(self)
    print("🧪 Testing Path Properties...")
    do
        local function ____catch(____error)
            print("❌ Test failed with error:", ____error)
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local map = {{0, 0, 0}, {0, 0, 0}}
            local grid = __TS__New(Grid, map, 0)
            local pathfinder = __TS__New(Pathfinder, grid, "ASTAR", 0)
            local path = pathfinder:getPath(0, 0, 2, 1)
            if not path then
                print("❌ Test failed: No path found")
                return true, false
            end
            if path:isEmpty() then
                print("❌ Test failed: Path is empty")
                return true, false
            end
            if path:getNodeCount() < 2 then
                print("❌ Test failed: Path too short")
                return true, false
            end
            local positions = path:toPositions()
            if #positions ~= path:getNodeCount() then
                print("❌ Test failed: Position conversion failed")
                return true, false
            end
            local startNode = path:getStartNode()
            local endNode = path:getEndNode()
            if not startNode or startNode.x ~= 0 or startNode.y ~= 0 then
                print("❌ Test failed: Start node incorrect")
                return true, false
            end
            if not endNode or endNode.x ~= 2 or endNode.y ~= 1 then
                print("❌ Test failed: End node incorrect")
                return true, false
            end
            print("✅ Path properties test passed")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function PathfindingTests.runAllTests(self)
    print("🚀 Starting Pathfinding Module Tests\n")
    local tests = {
        self.testBasicAStar,
        self.testGridValidation,
        self.testAlgorithmSwitching,
        self.testHeuristics,
        self.testMovementModes,
        self.testPathProperties
    }
    local passedTests = 0
    local totalTests = #tests
    for ____, test in ipairs(tests) do
        if test(nil) then
            passedTests = passedTests + 1
        end
        print("")
    end
    print(((("📊 Test Results: " .. tostring(passedTests)) .. "/") .. tostring(totalTests)) .. " tests passed")
    if passedTests == totalTests then
        print("🎉 All tests passed! The pathfinding module is working correctly.")
    else
        print("⚠️  Some tests failed. Please check the implementation.")
    end
end
____exports.default = ____exports.PathfindingTests
return ____exports
