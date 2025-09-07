local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Set = ____lualib.Set
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 7,["10"] = 7,["11"] = 7,["13"] = 7,["14"] = 11,["15"] = 16,["16"] = 16,["18"] = 19,["19"] = 20,["20"] = 21,["21"] = 24,["22"] = 26,["23"] = 28,["24"] = 29,["25"] = 32,["26"] = 33,["28"] = 37,["29"] = 44,["33"] = 45,["34"] = 46,["37"] = 49,["38"] = 52,["39"] = 53,["40"] = 54,["41"] = 55,["50"] = 60,["51"] = 11});
local ____exports = {}
--- Breadth-First Search algorithm implementation
-- Explores all nodes at current depth before moving to next level
____exports.BFS = __TS__Class()
local BFS = ____exports.BFS
BFS.name = "BFS"
function BFS.prototype.____constructor(self)
end
BFS.search = function(____, finder, startNode, endNode, toClear, tunnel)
    if tunnel == nil then
        tunnel = false
    end
    startNode.g = 0
    startNode.opened = true
    toClear:add(startNode)
    local queue = {startNode}
    while #queue > 0 do
        local currentNode = table.remove(queue, 1)
        currentNode.closed = true
        if currentNode == endNode then
            return currentNode
        end
        local neighbors = finder.grid:getNeighbours(currentNode, finder.walkable, finder.allowDiagonal, tunnel)
        for ____, neighbor in ipairs(neighbors) do
            do
                local __continue6
                repeat
                    if neighbor.opened or neighbor.closed then
                        __continue6 = true
                        break
                    end
                    toClear:add(neighbor)
                    neighbor.parent = currentNode
                    neighbor.g = currentNode.g + 1
                    neighbor.opened = true
                    queue[#queue + 1] = neighbor
                    __continue6 = true
                until true
                if not __continue6 then
                    break
                end
            end
        end
    end
    return nil
end
return ____exports
