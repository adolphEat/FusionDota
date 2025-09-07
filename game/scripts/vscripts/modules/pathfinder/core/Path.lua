local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayReverse = ____lualib.__TS__ArrayReverse
local __TS__New = ____lualib.__TS__New
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 7,["12"] = 7,["13"] = 7,["14"] = 12,["15"] = 8,["16"] = 9,["17"] = 13,["18"] = 12,["19"] = 19,["20"] = 20,["21"] = 21,["23"] = 24,["25"] = 25,["26"] = 25,["27"] = 26,["28"] = 27,["29"] = 28,["30"] = 25,["33"] = 31,["34"] = 19,["35"] = 37,["36"] = 38,["37"] = 37,["38"] = 44,["39"] = 45,["40"] = 45,["41"] = 46,["42"] = 44,["43"] = 52,["44"] = 53,["45"] = 54,["46"] = 52,["47"] = 60,["48"] = 61,["49"] = 60,["50"] = 67,["51"] = 68,["52"] = 67,["53"] = 74,["54"] = 75,["55"] = 74,["56"] = 81,["57"] = 82,["58"] = 81,["59"] = 88,["60"] = 89,["61"] = 88,["62"] = 95,["63"] = 96,["64"] = 95,["65"] = 102,["66"] = 103,["67"] = 104,["68"] = 105,["70"] = 107,["71"] = 107,["72"] = 108,["73"] = 107,["76"] = 111,["77"] = 102,["78"] = 117,["79"] = 118,["80"] = 119,["81"] = 120,["82"] = 117,["83"] = 126,["84"] = 127,["85"] = 127,["86"] = 127,["87"] = 127,["88"] = 126,["89"] = 133,["90"] = 134,["91"] = 134,["92"] = 134,["93"] = 134,["94"] = 133});
local ____exports = {}
--- Represents a path found by pathfinding algorithms
____exports.Path = __TS__Class()
local Path = ____exports.Path
Path.name = "Path"
function Path.prototype.____constructor(self, grid)
    self.nodes = {}
    self.length = 0
    self.grid = grid
end
function Path.prototype.getLength(self)
    if self.length > 0 then
        return self.length
    end
    self.length = 0
    do
        local i = 1
        while i < #self.nodes do
            local prev = self.nodes[i]
            local curr = self.nodes[i + 1]
            self.length = self.length + self:calculateDistance(prev, curr)
            i = i + 1
        end
    end
    return self.length
end
function Path.prototype.getNodes(self)
    return {unpack(self.nodes)}
end
function Path.prototype.addNode(self, node)
    local ____self_nodes_0 = self.nodes
    ____self_nodes_0[#____self_nodes_0 + 1] = node
    self.length = 0
end
function Path.prototype.clear(self)
    self.nodes = {}
    self.length = 0
end
function Path.prototype.getStartNode(self)
    return self.nodes[1]
end
function Path.prototype.getEndNode(self)
    return self.nodes[#self.nodes]
end
function Path.prototype.getNode(self, index)
    return self.nodes[index + 1]
end
function Path.prototype.getNodeCount(self)
    return #self.nodes
end
function Path.prototype.isEmpty(self)
    return #self.nodes == 0
end
function Path.prototype.reverse(self)
    __TS__ArrayReverse(self.nodes)
end
function Path.prototype.getSubPath(self, startIndex, endIndex)
    local subPath = __TS__New(____exports.Path, self.grid)
    local start = math.max(0, startIndex)
    local ____end = math.min(#self.nodes, endIndex)
    do
        local i = start
        while i < ____end do
            subPath:addNode(self.nodes[i + 1])
            i = i + 1
        end
    end
    return subPath
end
function Path.prototype.calculateDistance(self, a, b)
    local dx = a.x - b.x
    local dy = a.y - b.y
    return math.sqrt(dx * dx + dy * dy)
end
function Path.prototype.toPositions(self)
    return __TS__ArrayMap(
        self.nodes,
        function(____, node) return {x = node.x, y = node.y} end
    )
end
function Path.prototype.__tostring(self)
    return ((("Path[" .. tostring(#self.nodes)) .. " nodes, length: ") .. __TS__NumberToFixed(
        self:getLength(),
        2
    )) .. "]"
end
return ____exports
