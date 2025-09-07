local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Set = ____lualib.Set
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 7,["11"] = 7,["12"] = 7,["14"] = 7,["15"] = 83,["16"] = 84,["17"] = 85,["18"] = 87,["19"] = 89,["21"] = 92,["23"] = 83,["24"] = 11,["25"] = 16,["26"] = 16,["28"] = 19,["29"] = 20,["30"] = 21,["31"] = 22,["32"] = 25,["33"] = 27,["34"] = 29,["36"] = 30,["37"] = 30,["38"] = 31,["39"] = 32,["41"] = 30,["44"] = 36,["45"] = 37,["46"] = 40,["47"] = 41,["49"] = 45,["50"] = 52,["54"] = 53,["55"] = 54,["58"] = 57,["59"] = 60,["60"] = 62,["61"] = 64,["62"] = 65,["63"] = 66,["64"] = 68,["65"] = 69,["66"] = 70,["77"] = 77,["78"] = 11});
local ____exports = {}
--- Dijkstra's algorithm implementation
-- Finds shortest path without using heuristics
____exports.Dijkstra = __TS__Class()
local Dijkstra = ____exports.Dijkstra
Dijkstra.name = "Dijkstra"
function Dijkstra.prototype.____constructor(self)
end
function Dijkstra.calculateCost(self, from, to)
    local dx = math.abs(to.x - from.x)
    local dy = math.abs(to.y - from.y)
    if dx == 0 or dy == 0 then
        return 1
    else
        return 1.4142135623730951
    end
end
Dijkstra.search = function(____, finder, startNode, endNode, toClear, tunnel)
    if tunnel == nil then
        tunnel = false
    end
    startNode.g = 0
    startNode.f = 0
    startNode.opened = true
    toClear:add(startNode)
    local openList = {startNode}
    while #openList > 0 do
        local currentIndex = 0
        do
            local i = 1
            while i < #openList do
                if openList[i + 1].g < openList[currentIndex + 1].g then
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
                        neighbor.f = tentativeG
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
