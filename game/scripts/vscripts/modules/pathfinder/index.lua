local ____lualib = require("lualib_bundle")
local __TS__InstanceOf = ____lualib.__TS__InstanceOf
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 5,["9"] = 5,["12"] = 6,["13"] = 6,["16"] = 7,["17"] = 7,["20"] = 8,["21"] = 8,["24"] = 9,["25"] = 9,["28"] = 10,["29"] = 10,["32"] = 13,["33"] = 13,["36"] = 14,["37"] = 14,["40"] = 15,["41"] = 15,["44"] = 16,["45"] = 16,["48"] = 19,["55"] = 22,["56"] = 24,["57"] = 24,["59"] = 25,["60"] = 25,["62"] = 27,["63"] = 27,["64"] = 27,["65"] = 28,["66"] = 28,["67"] = 30,["68"] = 31,["69"] = 32,["71"] = 34,["73"] = 37,["74"] = 22,["75"] = 41,["76"] = 42,["77"] = 41});
local ____exports = {}
do
    local ____Pathfinder = require("modules.pathfinder.Pathfinder")
    ____exports.Pathfinder = ____Pathfinder.Pathfinder
end
do
    local ____Grid = require("modules.pathfinder.Grid")
    ____exports.Grid = ____Grid.Grid
end
do
    local ____Path = require("modules.pathfinder.core.Path")
    ____exports.Path = ____Path.Path
end
do
    local ____Node = require("modules.pathfinder.core.Node")
    ____exports.Node = ____Node.Node
end
do
    local ____BinaryHeap = require("modules.pathfinder.core.BinaryHeap")
    ____exports.BinaryHeap = ____BinaryHeap.BinaryHeap
end
do
    local ____Heuristics = require("modules.pathfinder.core.Heuristics")
    ____exports.Heuristics = ____Heuristics.Heuristics
end
do
    local ____AStar = require("modules.pathfinder.search.AStar")
    ____exports.AStar = ____AStar.AStar
end
do
    local ____Dijkstra = require("modules.pathfinder.search.Dijkstra")
    ____exports.Dijkstra = ____Dijkstra.Dijkstra
end
do
    local ____BFS = require("modules.pathfinder.search.BFS")
    ____exports.BFS = ____BFS.BFS
end
do
    local ____DFS = require("modules.pathfinder.search.DFS")
    ____exports.DFS = ____DFS.DFS
end
do
    local ____export = require("modules.pathfinder.types")
    for ____exportKey, ____exportValue in pairs(____export) do
        if ____exportKey ~= "default" then
            ____exports[____exportKey] = ____exportValue
        end
    end
end
____exports.createPathfinder = function(____, grid, algorithm, walkable)
    if algorithm == nil then
        algorithm = "ASTAR"
    end
    if walkable == nil then
        walkable = 0
    end
    local ____require_result_0 = require("modules.pathfinder.Pathfinder")
    local PathfinderClass = ____require_result_0.Pathfinder
    local GridClass = ____require_result_0.Grid
    local ____require_result_1 = require("modules.pathfinder.Grid")
    local GridImpl = ____require_result_1.Grid
    local gridInstance
    if __TS__InstanceOf(grid, GridImpl) then
        gridInstance = grid
    else
        gridInstance = __TS__New(GridImpl, grid, walkable)
    end
    return __TS__New(PathfinderClass, gridInstance, algorithm, walkable)
end
____exports.exampleUsage = function()
    print("\n// Pathfinding Module Usage Example\n\n// 1. Create a collision map\nconst map = [\n    [0, 1, 0, 1, 0],\n    [0, 1, 0, 1, 0],\n    [0, 1, 1, 1, 0],\n    [0, 0, 0, 0, 0],\n];\n\n// 2. Create grid and pathfinder\nconst grid = new Grid(map, 0); // 0 = walkable\nconst pathfinder = new Pathfinder(grid, 'ASTAR', 0);\n\n// 3. Find path\nconst path = pathfinder.getPath(0, 0, 4, 0);\n\nif (path) {\n    console.log('Path found! Length:', path.getLength());\n    console.log('Path nodes:', path.toPositions());\n} else {\n    console.log('No path found');\n}\n\n// 4. Change algorithm\npathfinder.setAlgorithm('DIJKSTRA');\npathfinder.setHeuristic('EUCLIDEAN');\n\n// 5. Find path with different settings\nconst path2 = pathfinder.getPath(0, 0, 4, 0);\n    ")
end
return ____exports
