local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Set = ____lualib.Set
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 9,["12"] = 9,["13"] = 9,["15"] = 9,["16"] = 93,["17"] = 94,["18"] = 95,["19"] = 97,["20"] = 99,["22"] = 102,["24"] = 93,["25"] = 14,["26"] = 19,["27"] = 19,["29"] = 21,["30"] = 24,["31"] = 25,["32"] = 26,["33"] = 27,["34"] = 28,["35"] = 32,["36"] = 34,["37"] = 36,["39"] = 37,["40"] = 37,["41"] = 38,["42"] = 39,["44"] = 37,["47"] = 43,["48"] = 44,["49"] = 47,["50"] = 48,["52"] = 52,["53"] = 59,["57"] = 60,["58"] = 61,["61"] = 64,["62"] = 67,["63"] = 69,["64"] = 72,["65"] = 73,["66"] = 74,["67"] = 75,["68"] = 77,["69"] = 78,["70"] = 79,["81"] = 86,["82"] = 14});
local ____exports = {}
--- A* pathfinding algorithm implementation
-- Combines the best of Dijkstra's algorithm and greedy best-first search
-- Based on zizouqi autochess project's A* implementation
____exports.AStar = __TS__Class()
local AStar = ____exports.AStar
AStar.name = "AStar"
function AStar.prototype.____constructor(self)
end
function AStar.calculateCost(self, from, to)
    local dx = math.abs(to.x - from.x)
    local dy = math.abs(to.y - from.y)
    if dx == 0 or dy == 0 then
        return 1
    else
        return 1.4142135623730951
    end
end
AStar.search = function(____, finder, startNode, endNode, toClear, tunnel)
    if tunnel == nil then
        tunnel = false
    end
    local heuristic = finder.heuristic
    startNode.g = 0
    startNode.h = heuristic(nil, endNode.x - startNode.x, endNode.y - startNode.y)
    startNode.f = startNode.g + startNode.h
    startNode.opened = true
    toClear:add(startNode)
    local openList = {startNode}
    while #openList > 0 do
        local currentIndex = 0
        do
            local i = 1
            while i < #openList do
                if openList[i + 1].f < openList[currentIndex + 1].f then
                    currentIndex = i
                end
                i = i + 1
            end
        end
        local currentNode = __TS__ArraySplice(openList, currentIndex, 1)[1]
        currentNode.closed = true
        if currentNode == endNode then
            return currentNode
        end
        local neighbors = finder.grid:getNeighbours(currentNode, finder.walkable, finder.allowDiagonal, tunnel)
        for ____, neighbor in ipairs(neighbors) do
            do
                local __continue12
                repeat
                    if neighbor.closed then
                        __continue12 = true
                        break
                    end
                    toClear:add(neighbor)
                    local tentativeG = currentNode.g + self:calculateCost(currentNode, neighbor)
                    if not neighbor.opened or tentativeG < neighbor.g then
                        neighbor.parent = currentNode
                        neighbor.g = tentativeG
                        neighbor.h = heuristic(nil, endNode.x - neighbor.x, endNode.y - neighbor.y)
                        neighbor.f = neighbor.g + neighbor.h
                        if not neighbor.opened then
                            openList[#openList + 1] = neighbor
                            neighbor.opened = true
                        end
                    end
                    __continue12 = true
                until true
                if not __continue12 then
                    break
                end
            end
        end
    end
    return nil
end
return ____exports
