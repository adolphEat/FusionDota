local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 7,["9"] = 7,["10"] = 7,["11"] = 17,["12"] = 10,["13"] = 11,["14"] = 12,["15"] = 14,["16"] = 15,["17"] = 18,["18"] = 19,["19"] = 17,["20"] = 26,["21"] = 27,["22"] = 28,["23"] = 29,["24"] = 30,["25"] = 31,["26"] = 32,["27"] = 26,["28"] = 39,["29"] = 40,["30"] = 39,["31"] = 47,["32"] = 48,["33"] = 47,["34"] = 55,["35"] = 56,["36"] = 57,["37"] = 58,["38"] = 55,["39"] = 65,["40"] = 66,["41"] = 65});
local ____exports = {}
--- Represents a single cell/node in the pathfinding grid
-- Based on zizouqi autochess project's node implementation
____exports.Node = __TS__Class()
local Node = ____exports.Node
Node.name = "Node"
function Node.prototype.____constructor(self, x, y)
    self.g = 0
    self.h = 0
    self.f = 0
    self.opened = false
    self.closed = false
    self.x = x
    self.y = y
end
function Node.prototype.reset(self)
    self.g = 0
    self.h = 0
    self.f = 0
    self.parent = nil
    self.opened = false
    self.closed = false
end
function Node.compare(self, a, b)
    return a.f - b.f
end
function Node.prototype.equals(self, other)
    return self.x == other.x and self.y == other.y
end
function Node.prototype.distanceTo(self, other)
    local dx = self.x - other.x
    local dy = self.y - other.y
    return math.sqrt(dx * dx + dy * dy)
end
function Node.prototype.manhattanDistanceTo(self, other)
    return math.abs(self.x - other.x) + math.abs(self.y - other.y)
end
return ____exports
