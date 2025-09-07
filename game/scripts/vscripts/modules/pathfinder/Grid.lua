local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayIsArray = ____lualib.__TS__ArrayIsArray
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__New = ____lualib.__TS__New
local __TS__StringAccess = ____lualib.__TS__StringAccess
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__SparseArrayNew = ____lualib.__TS__SparseArrayNew
local __TS__SparseArrayPush = ____lualib.__TS__SparseArrayPush
local __TS__SparseArraySpread = ____lualib.__TS__SparseArraySpread
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["19"] = 2,["20"] = 2,["24"] = 9,["25"] = 9,["26"] = 9,["27"] = 17,["28"] = 18,["29"] = 18,["31"] = 20,["32"] = 21,["33"] = 23,["34"] = 24,["35"] = 26,["37"] = 29,["41"] = 32,["45"] = 16,["46"] = 39,["47"] = 40,["48"] = 41,["49"] = 42,["51"] = 44,["52"] = 44,["53"] = 45,["54"] = 46,["56"] = 48,["57"] = 48,["58"] = 49,["59"] = 50,["60"] = 48,["63"] = 44,["66"] = 39,["67"] = 58,["68"] = 59,["69"] = 60,["70"] = 61,["72"] = 63,["73"] = 63,["74"] = 64,["75"] = 65,["77"] = 67,["78"] = 67,["79"] = 68,["80"] = 67,["83"] = 63,["86"] = 58,["87"] = 76,["88"] = 77,["89"] = 78,["91"] = 80,["92"] = 76,["93"] = 86,["94"] = 87,["95"] = 86,["96"] = 94,["97"] = 95,["98"] = 96,["100"] = 99,["101"] = 100,["103"] = 104,["104"] = 105,["105"] = 94,["106"] = 111,["107"] = 112,["108"] = 113,["109"] = 114,["111"] = 116,["112"] = 117,["114"] = 111,["115"] = 125,["116"] = 131,["117"] = 132,["118"] = 134,["119"] = 134,["120"] = 134,["124"] = 135,["125"] = 136,["126"] = 138,["127"] = 139,["130"] = 142,["131"] = 144,["132"] = 145,["133"] = 146,["134"] = 149,["135"] = 151,["136"] = 152,["146"] = 157,["147"] = 125,["148"] = 164,["149"] = 165,["150"] = 169,["151"] = 170,["153"] = 173,["154"] = 177,["157"] = 177,["159"] = 177,["160"] = 164,["161"] = 184,["163"] = 185,["164"] = 185,["166"] = 186,["167"] = 186,["168"] = 188,["169"] = 186,["172"] = 185,["175"] = 184,["176"] = 196,["177"] = 197,["178"] = 196,["179"] = 203,["180"] = 204,["181"] = 203,["182"] = 210,["183"] = 211,["184"] = 210});
local ____exports = {}
local ____Node = require("modules.pathfinder.core.Node")
local Node = ____Node.Node
--- 2D grid representation for pathfinding
-- Manages nodes and provides neighbor access
-- Based on zizouqi autochess project's grid implementation
____exports.Grid = __TS__Class()
local Grid = ____exports.Grid
Grid.name = "Grid"
function Grid.prototype.____constructor(self, map, walkableValue)
    if walkableValue == nil then
        walkableValue = 0
    end
    self.walkableValue = walkableValue
    self.originalMap = map
    if __TS__ArrayIsArray(map) and #map > 0 then
        if type(map[1]) == "string" then
            self:initializeFromStringMap(map)
        else
            self:initializeFromNumberMap(map)
        end
    else
        error(
            __TS__New(Error, "Invalid map format. Expected 2D array or string array."),
            0
        )
    end
end
function Grid.prototype.initializeFromStringMap(self, stringMap)
    self.height = #stringMap
    self.width = #stringMap[1]
    self.nodes = {}
    do
        local y = 0
        while y < self.height do
            self.nodes[y + 1] = {}
            local row = stringMap[y + 1]
            do
                local x = 0
                while x < self.width do
                    local value = __TS__ParseInt(__TS__StringAccess(row, x))
                    self.nodes[y + 1][x + 1] = __TS__New(Node, x, y)
                    x = x + 1
                end
            end
            y = y + 1
        end
    end
end
function Grid.prototype.initializeFromNumberMap(self, numberMap)
    self.height = #numberMap
    self.width = #numberMap[1]
    self.nodes = {}
    do
        local y = 0
        while y < self.height do
            self.nodes[y + 1] = {}
            local row = numberMap[y + 1]
            do
                local x = 0
                while x < self.width do
                    self.nodes[y + 1][x + 1] = __TS__New(Node, x, y)
                    x = x + 1
                end
            end
            y = y + 1
        end
    end
end
function Grid.prototype.getNode(self, x, y)
    if not self:isValidPosition(x, y) then
        return nil
    end
    return self.nodes[y + 1][x + 1]
end
function Grid.prototype.isValidPosition(self, x, y)
    return x >= 0 and x < self.width and y >= 0 and y < self.height
end
function Grid.prototype.isWalkable(self, x, y)
    if not self:isValidPosition(x, y) then
        return false
    end
    if type(self.walkableValue) == "function" then
        return self:walkableValue(self:getMapValue(x, y))
    end
    local mapValue = self:getMapValue(x, y)
    return mapValue == self.walkableValue
end
function Grid.prototype.getMapValue(self, x, y)
    if type(self.originalMap[1]) == "string" then
        local stringMap = self.originalMap
        return __TS__ParseInt(__TS__StringAccess(stringMap[y + 1], x))
    else
        local numberMap = self.originalMap
        return numberMap[y + 1][x + 1]
    end
end
function Grid.prototype.getNeighbours(self, node, walkable, allowDiagonal, tunnel)
    local neighbours = {}
    local directions = self:getDirections(allowDiagonal)
    for ____, ____value in ipairs(directions) do
        local dx = ____value[1]
        local dy = ____value[2]
        do
            local __continue27
            repeat
                local nx = node.x + dx
                local ny = node.y + dy
                if not self:isValidPosition(nx, ny) then
                    __continue27 = true
                    break
                end
                local neighbor = self.nodes[ny + 1][nx + 1]
                if self:isWalkable(nx, ny) then
                    neighbours[#neighbours + 1] = neighbor
                elseif tunnel and allowDiagonal and dx ~= 0 and dy ~= 0 then
                    local canTunnel = self:isWalkable(node.x + dx, node.y) and self:isWalkable(node.x, node.y + dy)
                    if canTunnel then
                        neighbours[#neighbours + 1] = neighbor
                    end
                end
                __continue27 = true
            until true
            if not __continue27 then
                break
            end
        end
    end
    return neighbours
end
function Grid.prototype.getDirections(self, allowDiagonal)
    local orthogonal = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
    if not allowDiagonal then
        return orthogonal
    end
    local diagonal = {{-1, -1}, {-1, 1}, {1, -1}, {1, 1}}
    local ____array_0 = __TS__SparseArrayNew(unpack(orthogonal))
    __TS__SparseArrayPush(
        ____array_0,
        unpack(diagonal)
    )
    return {__TS__SparseArraySpread(____array_0)}
end
function Grid.prototype.resetNodes(self)
    do
        local y = 0
        while y < self.height do
            do
                local x = 0
                while x < self.width do
                    self.nodes[y + 1][x + 1]:reset()
                    x = x + 1
                end
            end
            y = y + 1
        end
    end
end
function Grid.prototype.getDimensions(self)
    return {width = self.width, height = self.height}
end
function Grid.prototype.isEmpty(self)
    return self.width == 0 or self.height == 0
end
function Grid.prototype.__tostring(self)
    return ((("Grid[" .. tostring(self.width)) .. "x") .. tostring(self.height)) .. "]"
end
return ____exports
