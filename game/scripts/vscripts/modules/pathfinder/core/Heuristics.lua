local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 7,["9"] = 7,["10"] = 7,["12"] = 7,["13"] = 60,["14"] = 61,["15"] = 61,["16"] = 61,["17"] = 61,["18"] = 61,["19"] = 61,["20"] = 61,["21"] = 61,["22"] = 70,["23"] = 60,["24"] = 76,["25"] = 77,["26"] = 77,["27"] = 77,["28"] = 77,["29"] = 77,["30"] = 77,["31"] = 77,["32"] = 77,["33"] = 76,["34"] = 12,["35"] = 13,["36"] = 12,["37"] = 20,["38"] = 21,["39"] = 20,["40"] = 28,["41"] = 29,["42"] = 29,["43"] = 29,["44"] = 29,["45"] = 28,["46"] = 36,["47"] = 37,["48"] = 38,["49"] = 38,["50"] = 38,["52"] = 38,["54"] = 38,["55"] = 36,["56"] = 45,["57"] = 46,["58"] = 46,["59"] = 46,["60"] = 46,["61"] = 46,["62"] = 46,["63"] = 46,["64"] = 45,["65"] = 53,["66"] = 54,["67"] = 53});
local ____exports = {}
--- Collection of heuristic functions for pathfinding algorithms
-- These functions estimate the cost from a node to the goal
____exports.Heuristics = __TS__Class()
local Heuristics = ____exports.Heuristics
Heuristics.name = "Heuristics"
function Heuristics.prototype.____constructor(self)
end
function Heuristics.get(self, name)
    local heuristics = {
        MANHATTAN = self.MANHATTAN,
        EUCLIDEAN = self.EUCLIDEAN,
        CHEBYSHEV = self.CHEBYSHEV,
        OCTILE = self.OCTILE,
        DIAGONAL = self.DIAGONAL,
        ZERO = self.ZERO
    }
    return heuristics[string.upper(name)] or self.MANHATTAN
end
function Heuristics.getNames(self)
    return {
        "MANHATTAN",
        "EUCLIDEAN",
        "CHEBYSHEV",
        "OCTILE",
        "DIAGONAL",
        "ZERO"
    }
end
Heuristics.MANHATTAN = function(____, dx, dy)
    return math.abs(dx) + math.abs(dy)
end
Heuristics.EUCLIDEAN = function(____, dx, dy)
    return math.sqrt(dx * dx + dy * dy)
end
Heuristics.CHEBYSHEV = function(____, dx, dy)
    return math.max(
        math.abs(dx),
        math.abs(dy)
    )
end
Heuristics.OCTILE = function(____, dx, dy)
    local F = 1.4142135623730951 - 1
    local ____temp_0
    if dx < dy then
        ____temp_0 = F * dx + dy
    else
        ____temp_0 = F * dy + dx
    end
    return ____temp_0
end
Heuristics.DIAGONAL = function(____, dx, dy)
    return math.max(
        math.abs(dx),
        math.abs(dy)
    ) + (1.4142135623730951 - 1) * math.min(
        math.abs(dx),
        math.abs(dy)
    )
end
Heuristics.ZERO = function(____, dx, dy)
    return 0
end
return ____exports
