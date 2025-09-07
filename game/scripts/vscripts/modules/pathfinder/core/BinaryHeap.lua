local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 7,["9"] = 7,["10"] = 7,["11"] = 11,["12"] = 8,["13"] = 12,["14"] = 11,["15"] = 18,["16"] = 19,["17"] = 19,["18"] = 20,["19"] = 18,["20"] = 26,["21"] = 27,["22"] = 28,["24"] = 31,["25"] = 32,["26"] = 34,["27"] = 35,["28"] = 36,["30"] = 39,["31"] = 26,["32"] = 45,["33"] = 46,["34"] = 45,["35"] = 52,["36"] = 53,["37"] = 52,["38"] = 59,["39"] = 60,["40"] = 59,["41"] = 66,["42"] = 67,["43"] = 66,["44"] = 73,["45"] = 74,["46"] = 75,["47"] = 77,["50"] = 81,["51"] = 82,["53"] = 73,["54"] = 89,["55"] = 90,["56"] = 91,["57"] = 92,["58"] = 93,["59"] = 95,["60"] = 97,["62"] = 100,["63"] = 102,["65"] = 105,["68"] = 109,["69"] = 110,["71"] = 89,["72"] = 117,["73"] = 118,["74"] = 118,["75"] = 118,["76"] = 117});
local ____exports = {}
--- Binary heap implementation for efficient priority queue operations
-- Used in A* algorithm for managing the open list
____exports.BinaryHeap = __TS__Class()
local BinaryHeap = ____exports.BinaryHeap
BinaryHeap.name = "BinaryHeap"
function BinaryHeap.prototype.____constructor(self, compareFn)
    self.items = {}
    self.compareFn = compareFn
end
function BinaryHeap.prototype.push(self, item)
    local ____self_items_0 = self.items
    ____self_items_0[#____self_items_0 + 1] = item
    self:bubbleUp(#self.items - 1)
end
function BinaryHeap.prototype.pop(self)
    if #self.items == 0 then
        return nil
    end
    local top = self.items[1]
    local last = table.remove(self.items)
    if #self.items > 0 then
        self.items[1] = last
        self:bubbleDown(0)
    end
    return top
end
function BinaryHeap.prototype.clear(self)
    self.items = {}
end
function BinaryHeap.prototype.empty(self)
    return #self.items == 0
end
function BinaryHeap.prototype.size(self)
    return #self.items
end
function BinaryHeap.prototype.peek(self)
    return self.items[1]
end
function BinaryHeap.prototype.bubbleUp(self, index)
    while index > 0 do
        local parentIndex = math.floor((index - 1) / 2)
        if self:compareFn(self.items[index + 1], self.items[parentIndex + 1]) >= 0 then
            break
        end
        self:swap(index, parentIndex)
        index = parentIndex
    end
end
function BinaryHeap.prototype.bubbleDown(self, index)
    while true do
        local smallest = index
        local leftChild = 2 * index + 1
        local rightChild = 2 * index + 2
        if leftChild < #self.items and self:compareFn(self.items[leftChild + 1], self.items[smallest + 1]) < 0 then
            smallest = leftChild
        end
        if rightChild < #self.items and self:compareFn(self.items[rightChild + 1], self.items[smallest + 1]) < 0 then
            smallest = rightChild
        end
        if smallest == index then
            break
        end
        self:swap(index, smallest)
        index = smallest
    end
end
function BinaryHeap.prototype.swap(self, i, j)
    local ____temp_1 = {self.items[j + 1], self.items[i + 1]}
    self.items[i + 1] = ____temp_1[1]
    self.items[j + 1] = ____temp_1[2]
end
return ____exports
