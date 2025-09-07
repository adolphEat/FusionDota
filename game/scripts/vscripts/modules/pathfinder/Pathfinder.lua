local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Set = ____lualib.Set
local __TS__New = ____lualib.__TS__New
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["15"] = 10,["16"] = 10,["17"] = 11,["18"] = 11,["19"] = 12,["20"] = 12,["21"] = 13,["22"] = 13,["23"] = 14,["24"] = 14,["25"] = 15,["26"] = 15,["30"] = 22,["31"] = 22,["32"] = 22,["33"] = 33,["34"] = 34,["35"] = 34,["37"] = 35,["38"] = 35,["40"] = 24,["41"] = 25,["42"] = 26,["43"] = 27,["44"] = 29,["45"] = 30,["46"] = 37,["47"] = 38,["48"] = 39,["49"] = 40,["50"] = 41,["51"] = 32,["52"] = 48,["53"] = 49,["54"] = 50,["55"] = 48,["56"] = 56,["57"] = 57,["58"] = 56,["59"] = 64,["60"] = 65,["61"] = 65,["62"] = 65,["63"] = 65,["64"] = 65,["65"] = 65,["66"] = 65,["67"] = 66,["69"] = 67,["70"] = 67,["71"] = 67,["72"] = 67,["76"] = 69,["77"] = 70,["78"] = 64,["79"] = 76,["80"] = 77,["81"] = 76,["82"] = 84,["83"] = 85,["84"] = 85,["85"] = 85,["86"] = 85,["87"] = 85,["88"] = 85,["89"] = 85,["90"] = 84,["91"] = 92,["92"] = 93,["93"] = 94,["94"] = 92,["95"] = 100,["96"] = 101,["97"] = 100,["98"] = 108,["99"] = 109,["100"] = 110,["101"] = 108,["102"] = 116,["103"] = 117,["104"] = 116,["105"] = 123,["106"] = 124,["107"] = 123,["108"] = 131,["109"] = 132,["110"] = 133,["112"] = 135,["114"] = 137,["115"] = 131,["116"] = 143,["117"] = 144,["118"] = 143,["119"] = 151,["120"] = 152,["121"] = 151,["122"] = 159,["123"] = 164,["124"] = 164,["126"] = 167,["127"] = 168,["129"] = 172,["130"] = 173,["131"] = 175,["132"] = 176,["134"] = 180,["135"] = 183,["136"] = 186,["138"] = 188,["139"] = 189,["141"] = 190,["142"] = 190,["143"] = 190,["144"] = 190,["145"] = 190,["146"] = 190,["147"] = 190,["150"] = 192,["152"] = 193,["153"] = 193,["154"] = 193,["155"] = 193,["156"] = 193,["157"] = 193,["158"] = 193,["161"] = 195,["163"] = 196,["164"] = 196,["165"] = 196,["166"] = 196,["167"] = 196,["168"] = 196,["169"] = 196,["172"] = 198,["174"] = 199,["175"] = 199,["176"] = 199,["177"] = 199,["178"] = 199,["179"] = 199,["180"] = 199,["183"] = 201,["185"] = 203,["186"] = 203,["187"] = 203,["188"] = 203,["189"] = 203,["190"] = 203,["191"] = 203,["195"] = 207,["196"] = 208,["198"] = 212,["199"] = 213,["200"] = 215,["201"] = 159,["202"] = 222,["203"] = 223,["204"] = 224,["205"] = 226,["206"] = 227,["207"] = 228,["209"] = 232,["210"] = 233,["211"] = 222,["212"] = 240,["213"] = 241,["214"] = 240,["215"] = 248,["216"] = 249,["217"] = 248,["218"] = 255,["219"] = 256,["220"] = 255});
local ____exports = {}
local ____Heuristics = require("modules.pathfinder.core.Heuristics")
local Heuristics = ____Heuristics.Heuristics
local ____Path = require("modules.pathfinder.core.Path")
local PathClass = ____Path.Path
local ____AStar = require("modules.pathfinder.search.AStar")
local AStar = ____AStar.AStar
local ____Dijkstra = require("modules.pathfinder.search.Dijkstra")
local Dijkstra = ____Dijkstra.Dijkstra
local ____BFS = require("modules.pathfinder.search.BFS")
local BFS = ____BFS.BFS
local ____DFS = require("modules.pathfinder.search.DFS")
local DFS = ____DFS.DFS
--- Main pathfinder class that integrates all search algorithms
-- Provides a unified interface for different pathfinding methods
-- Based on zizouqi autochess project's pathfinder architecture
____exports.Pathfinder = __TS__Class()
local Pathfinder = ____exports.Pathfinder
Pathfinder.name = "Pathfinder"
function Pathfinder.prototype.____constructor(self, grid, algorithm, walkable)
    if algorithm == nil then
        algorithm = "ASTAR"
    end
    if walkable == nil then
        walkable = 0
    end
    self.algorithm = "ASTAR"
    self.walkable = 0
    self.allowDiagonal = true
    self.heuristic = Heuristics.MANHATTAN
    self.toClear = __TS__New(Set)
    self.lastPathCost = 0
    self:setGrid(grid)
    self:setAlgorithm(algorithm)
    self:setWalkable(walkable)
    self:setMode("DIAGONAL")
    self:setHeuristic("MANHATTAN")
end
function Pathfinder.prototype.setGrid(self, grid)
    self.grid = grid
    return self
end
function Pathfinder.prototype.getGrid(self)
    return self.grid
end
function Pathfinder.prototype.setAlgorithm(self, algorithm)
    local validAlgorithms = {
        "ASTAR",
        "DIJKSTRA",
        "BFS",
        "DFS",
        "JPS"
    }
    if not __TS__ArrayIncludes(validAlgorithms, algorithm) then
        error(
            __TS__New(
                Error,
                (("Invalid algorithm: " .. algorithm) .. ". Valid options: ") .. table.concat(validAlgorithms, ", ")
            ),
            0
        )
    end
    self.algorithm = algorithm
    return self
end
function Pathfinder.prototype.getAlgorithm(self)
    return self.algorithm
end
function Pathfinder.prototype.getAlgorithms(self)
    return {
        "ASTAR",
        "DIJKSTRA",
        "BFS",
        "DFS",
        "JPS"
    }
end
function Pathfinder.prototype.setWalkable(self, walkable)
    self.walkable = walkable
    return self
end
function Pathfinder.prototype.getWalkable(self)
    return self.walkable
end
function Pathfinder.prototype.setMode(self, mode)
    self.allowDiagonal = mode == "DIAGONAL"
    return self
end
function Pathfinder.prototype.getMode(self)
    return self.allowDiagonal and "DIAGONAL" or "ORTHOGONAL"
end
function Pathfinder.prototype.getModes(self)
    return {"DIAGONAL", "ORTHOGONAL"}
end
function Pathfinder.prototype.setHeuristic(self, heuristic)
    if type(heuristic) == "string" then
        self.heuristic = Heuristics:get(heuristic)
    else
        self.heuristic = heuristic
    end
    return self
end
function Pathfinder.prototype.getHeuristic(self)
    return self.heuristic
end
function Pathfinder.prototype.getHeuristics(self)
    return Heuristics:getNames()
end
function Pathfinder.prototype.getPath(self, startX, startY, endX, endY, tunnel)
    if tunnel == nil then
        tunnel = false
    end
    if not self.grid:isValidPosition(startX, startY) or not self.grid:isValidPosition(endX, endY) then
        return nil
    end
    local startNode = self.grid:getNode(startX, startY)
    local endNode = self.grid:getNode(endX, endY)
    if not startNode or not endNode then
        return nil
    end
    self.grid:resetNodes()
    self.toClear:clear()
    local resultNode = nil
    repeat
        local ____switch22 = self.algorithm
        local ____cond22 = ____switch22 == "ASTAR"
        if ____cond22 then
            resultNode = AStar:search(
                self,
                startNode,
                endNode,
                self.toClear,
                tunnel
            )
            break
        end
        ____cond22 = ____cond22 or ____switch22 == "DIJKSTRA"
        if ____cond22 then
            resultNode = Dijkstra:search(
                self,
                startNode,
                endNode,
                self.toClear,
                tunnel
            )
            break
        end
        ____cond22 = ____cond22 or ____switch22 == "BFS"
        if ____cond22 then
            resultNode = BFS:search(
                self,
                startNode,
                endNode,
                self.toClear,
                tunnel
            )
            break
        end
        ____cond22 = ____cond22 or ____switch22 == "DFS"
        if ____cond22 then
            resultNode = DFS:search(
                self,
                startNode,
                endNode,
                self.toClear,
                tunnel
            )
            break
        end
        ____cond22 = ____cond22 or ____switch22 == "JPS"
        if ____cond22 then
            resultNode = AStar:search(
                self,
                startNode,
                endNode,
                self.toClear,
                tunnel
            )
            break
        end
    until true
    if not resultNode then
        return nil
    end
    local path = self:buildPath(resultNode, startNode)
    self.lastPathCost = path:getLength()
    return path
end
function Pathfinder.prototype.buildPath(self, endNode, startNode)
    local path = __TS__New(PathClass, self.grid)
    local currentNode = endNode
    while currentNode do
        path:addNode(currentNode)
        currentNode = currentNode.parent
    end
    path:reverse()
    return path
end
function Pathfinder.prototype.getLastPathCost(self)
    return self.lastPathCost
end
function Pathfinder.version(self)
    return "1.0.0"
end
function Pathfinder.releaseDate(self)
    return "2024-01-01"
end
return ____exports
