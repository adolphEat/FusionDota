local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 363,["19"] = 13,["20"] = 14,["21"] = 32,["22"] = 32,["23"] = 32,["25"] = 36,["26"] = 37,["27"] = 38,["28"] = 40,["29"] = 44,["30"] = 50,["31"] = 51,["32"] = 43,["33"] = 57,["34"] = 58,["35"] = 59,["37"] = 61,["38"] = 57,["39"] = 67,["40"] = 68,["41"] = 69,["42"] = 70,["43"] = 67,["44"] = 76,["46"] = 78,["47"] = 78,["48"] = 79,["49"] = 78,["52"] = 82,["53"] = 82,["54"] = 82,["55"] = 83,["59"] = 84,["60"] = 84,["61"] = 85,["62"] = 84,["65"] = 87,["66"] = 82,["67"] = 82,["68"] = 76,["69"] = 95,["70"] = 95,["71"] = 95,["73"] = 96,["74"] = 97,["77"] = 102,["78"] = 102,["79"] = 102,["80"] = 102,["81"] = 102,["82"] = 102,["83"] = 108,["84"] = 109,["85"] = 110,["86"] = 111,["87"] = 112,["88"] = 112,["89"] = 112,["90"] = 112,["92"] = 112,["94"] = 112,["95"] = 115,["96"] = 116,["97"] = 116,["98"] = 116,["99"] = 117,["100"] = 118,["101"] = 116,["102"] = 116,["104"] = 121,["105"] = 121,["106"] = 121,["107"] = 122,["110"] = 123,["111"] = 124,["112"] = 125,["113"] = 126,["114"] = 127,["115"] = 128,["116"] = 121,["117"] = 121,["119"] = 95,["120"] = 136,["121"] = 137,["122"] = 137,["124"] = 138,["125"] = 140,["126"] = 141,["127"] = 144,["128"] = 145,["129"] = 146,["130"] = 147,["131"] = 148,["132"] = 149,["133"] = 150,["134"] = 151,["135"] = 136,["136"] = 157,["137"] = 158,["138"] = 159,["141"] = 163,["142"] = 157,["143"] = 169,["144"] = 170,["145"] = 171,["148"] = 175,["149"] = 176,["150"] = 169,["151"] = 180,["152"] = 181,["153"] = 181,["154"] = 181,["155"] = 181,["156"] = 181,["157"] = 186,["158"] = 186,["160"] = 187,["161"] = 188,["162"] = 189,["163"] = 189,["165"] = 191,["166"] = 180,["167"] = 195,["168"] = 196,["169"] = 197,["170"] = 198,["171"] = 199,["174"] = 202,["175"] = 195,["176"] = 209,["177"] = 210,["180"] = 213,["181"] = 214,["182"] = 215,["183"] = 216,["187"] = 221,["188"] = 223,["189"] = 224,["190"] = 225,["191"] = 226,["193"] = 229,["194"] = 229,["195"] = 229,["196"] = 229,["197"] = 229,["198"] = 229,["199"] = 229,["200"] = 236,["201"] = 236,["202"] = 237,["204"] = 209,["205"] = 244,["206"] = 245,["209"] = 247,["210"] = 248,["211"] = 248,["212"] = 248,["213"] = 248,["214"] = 249,["215"] = 251,["216"] = 252,["218"] = 244,["219"] = 260,["220"] = 261,["221"] = 262,["222"] = 263,["223"] = 265,["224"] = 265,["225"] = 266,["226"] = 267,["227"] = 269,["230"] = 277,["231"] = 278,["234"] = 271,["235"] = 272,["237"] = 274,["238"] = 274,["239"] = 274,["240"] = 274,["247"] = 280,["250"] = 283,["251"] = 265,["252"] = 286,["253"] = 287,["254"] = 261,["255"] = 260,["256"] = 296,["257"] = 296,["258"] = 296,["260"] = 297,["261"] = 300,["265"] = 302,["266"] = 303,["269"] = 307,["270"] = 308,["271"] = 310,["272"] = 310,["273"] = 311,["274"] = 312,["275"] = 313,["278"] = 321,["279"] = 322,["282"] = 315,["283"] = 316,["285"] = 318,["286"] = 318,["287"] = 318,["288"] = 318,["295"] = 324,["298"] = 327,["299"] = 310,["300"] = 329,["308"] = 331,["309"] = 332,["310"] = 296,["311"] = 336,["312"] = 337,["313"] = 336,["314"] = 342,["315"] = 343,["316"] = 342,["317"] = 347,["318"] = 348,["319"] = 349,["320"] = 348,["321"] = 347,["322"] = 354,["323"] = 355,["324"] = 354,["325"] = 359,["326"] = 360,["327"] = 363,["328"] = 363,["330"] = 363,["331"] = 364,["334"] = 364});
local ____exports = {}
local Test
--- 火焰图性能分析模块
-- 用于收集函数调用信息并生成火焰图数据
-- by: 三村
-- 日期: 2025-04-15
-- version: 1.0.0
-- //@example
-- 示例用法：
-- //@ProfileClass
-- class Myclass{}
local get_time = GetSystemTimeMS
local sync_time = 5
____exports.FlameGraphProfiler = __TS__Class()
local FlameGraphProfiler = ____exports.FlameGraphProfiler
FlameGraphProfiler.name = "FlameGraphProfiler"
function FlameGraphProfiler.prototype.____constructor(self)
    self.isRecording = false
    self.startTime = 0
    self.endTime = 0
    self.maxNode = 1
    self.rootNode = {name = "root", startTime = 0, children = {}, calls = 1}
    self.currentNode = self.rootNode
    self.testObj = __TS__New(Test)
end
function FlameGraphProfiler.getInstance(self)
    if not ____exports.FlameGraphProfiler.instance then
        ____exports.FlameGraphProfiler.instance = __TS__New(____exports.FlameGraphProfiler)
    end
    return ____exports.FlameGraphProfiler.instance
end
function FlameGraphProfiler.prototype.getAverageOffset(self)
    local test_node = self.rootNode.children[1]
    test_node.totalTime = test_node.totalTime or 0
    return test_node.totalTime / test_node.calls or 0
end
function FlameGraphProfiler.prototype.executeTimeOffset(self)
    do
        local i = 0
        while i < 10 do
            self.testObj:time_offet_test()
            i = i + 1
        end
    end
    Timers:CreateTimer(
        0.1,
        function()
            if not self.isRecording then
                return
            end
            do
                local i = 0
                while i < 10 do
                    self.testObj:time_offet_test()
                    i = i + 1
                end
            end
            return 0.1
        end
    )
end
function FlameGraphProfiler.prototype.startRecording(self, duration)
    if duration == nil then
        duration = 0
    end
    if self.isRecording then
        print("[FlameGraphProfiler] 已经在记录中，请先停止当前记录")
        return
    end
    self.rootNode = {
        name = "root",
        startTime = get_time(),
        children = {},
        calls = 1
    }
    self.currentNode = self.rootNode
    self.startTime = get_time()
    self.isRecording = true
    self:executeTimeOffset()
    local ____print_1 = print
    local ____temp_0
    if duration > 0 then
        ____temp_0 = ("，持续" .. tostring(duration)) .. "秒"
    else
        ____temp_0 = ""
    end
    ____print_1("[FlameGraphProfiler] 开始记录性能数据" .. ____temp_0)
    if duration > 0 then
        self.Timerid = Timers:CreateTimer(
            duration,
            function()
                self:stopRecording()
                return nil
            end
        )
    else
        self.Timerid = Timers:CreateTimer(
            sync_time,
            function()
                if not self.isRecording then
                    return
                end
                local rootNodeChildren = self:transformNode(self.rootNode)
                rootNodeChildren.totalTime = self:getTotalTime(rootNodeChildren)
                rootNodeChildren.rate = math.floor(rootNodeChildren.totalTime / (get_time() - self.startTime) * 10000 * self.maxNode + 0.5)
                self:syncToNetTable(rootNodeChildren)
                print("[FlameGraphProfiler] 性能诊断运行中..")
                return sync_time
            end
        )
    end
end
function FlameGraphProfiler.prototype.stopRecording(self)
    if self.Timerid then
        Timers:RemoveTimer(self.Timerid)
    end
    self.Timerid = nil
    self.isRecording = false
    self.endTime = get_time()
    self.rootNode.endTime = self.endTime
    self.rootNode.totalTime = self.endTime - self.rootNode.startTime
    local rootNodeChildren = self:transformNode(self.rootNode)
    rootNodeChildren.totalTime = self:getTotalTime(rootNodeChildren)
    rootNodeChildren.rate = math.floor(rootNodeChildren.totalTime / (self.endTime - self.startTime) * 10000 * self.maxNode + 0.5)
    DeepPrintTable(rootNodeChildren)
    self:syncToNetTable(rootNodeChildren)
    print(("[FlameGraphProfiler] 记录已停止，总时间: " .. tostring(self.endTime - self.startTime)) .. "毫秒,P键打开火焰图")
end
function FlameGraphProfiler.prototype.pauseRecording(self)
    if not self.isRecording then
        print("[FlameGraphProfiler] 没有正在进行的记录")
        return
    end
    self.isRecording = false
end
function FlameGraphProfiler.prototype.resumeRecording(self)
    if self.isRecording then
        print("[FlameGraphProfiler] 已经在记录中")
        return
    end
    self.isRecording = true
    print("[FlameGraphProfiler] 已恢复记录性能数据")
end
function FlameGraphProfiler.prototype.transformNode(self, node)
    local result = {
        name = node.name,
        totalTime = math.floor((node.totalTime or 0) + 0.5),
        calls = node.calls
    }
    if #node.children == 0 then
        return result
    end
    result.children = {}
    for ____, child in ipairs(node.children) do
        local ____result_children_2 = result.children
        ____result_children_2[#____result_children_2 + 1] = self:transformNode(child)
    end
    return result
end
function FlameGraphProfiler.prototype.getTotalTime(self, node)
    local totalTime = 0
    if node.children then
        for ____, child in ipairs(node.children) do
            totalTime = totalTime + child.totalTime
        end
    end
    return totalTime
end
function FlameGraphProfiler.prototype.enterFunction(self, functionName)
    if not self.isRecording then
        return
    end
    local existingNode
    for ____, child in ipairs(self.currentNode.children) do
        if child.name == functionName then
            existingNode = child
            break
        end
    end
    if existingNode then
        existingNode.calls = existingNode.calls + 1
        existingNode.parent = self.currentNode
        existingNode.startTime = get_time()
        self.currentNode = existingNode
    else
        local newNode = {
            name = functionName,
            startTime = get_time(),
            children = {},
            parent = self.currentNode,
            calls = 1
        }
        local ____self_currentNode_children_3 = self.currentNode.children
        ____self_currentNode_children_3[#____self_currentNode_children_3 + 1] = newNode
        self.currentNode = newNode
    end
end
function FlameGraphProfiler.prototype.exitFunction(self)
    if not self.isRecording or self.currentNode == self.rootNode then
        return
    end
    local now = get_time()
    self.currentNode.endTime = math.max(
        0.00001,
        now - self:getAverageOffset()
    )
    self.currentNode.totalTime = (self.currentNode.totalTime or 0) + (self.currentNode.endTime - self.currentNode.startTime)
    if self.currentNode.parent then
        self.currentNode = self.currentNode.parent
    end
end
function FlameGraphProfiler.profile(self, name)
    return function(self, target, propertyKey, descriptor)
        local originalMethod = descriptor.value
        local profilerName = name or (tostring(target.constructor.name) .. ".") .. propertyKey
        descriptor.value = function(self, ...)
            local args = {...}
            local profiler = ____exports.FlameGraphProfiler:getInstance()
            profiler:enterFunction(profilerName)
            local result
            do
                local function ____catch(____error)
                    print("函数执行出错:", ____error)
                    error(____error, 0)
                end
                local ____try, ____hasReturned = pcall(function()
                    if not args then
                        result = originalMethod(self)
                    else
                        result = originalMethod(
                            self,
                            unpack(args)
                        )
                    end
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
                do
                    profiler:exitFunction()
                end
            end
            return result
        end
        print("[FlameGraphProfiler] 装饰器已应用于:", profilerName)
        return descriptor
    end
end
function FlameGraphProfiler.profileClass(self, classInstance, prefix)
    if prefix == nil then
        prefix = ""
    end
    local className = classInstance.name
    for name in pairs(classInstance.prototype) do
        do
            local __continue53
            repeat
                if type(classInstance.prototype[name]) ~= "function" or __TS__StringStartsWith(name, "__") then
                    __continue53 = true
                    break
                end
                local originalMethod = classInstance.prototype[name]
                local fullName = (tostring(className) .. ".") .. name
                classInstance.prototype[name] = function(self, ...)
                    local args = {...}
                    local profiler = ____exports.FlameGraphProfiler:getInstance()
                    profiler:enterFunction(fullName)
                    local result
                    do
                        local function ____catch(____error)
                            print("函数执行出错:", ____error)
                            error(____error, 0)
                        end
                        local ____try, ____hasReturned = pcall(function()
                            if not args then
                                result = originalMethod(self)
                            else
                                result = originalMethod(
                                    self,
                                    unpack(args)
                                )
                            end
                        end)
                        if not ____try then
                            ____catch(____hasReturned)
                        end
                        do
                            profiler:exitFunction()
                        end
                    end
                    return result
                end
                print(("[FlameGraphProfiler] 已为 " .. fullName) .. " 添加性能分析")
                __continue53 = true
            until true
            if not __continue53 then
                break
            end
        end
    end
    classInstance.prototype.print = "123"
    print(("[FlameGraphProfiler] 已为 " .. tostring(className)) .. " 的所有方法添加性能分析")
end
function FlameGraphProfiler.prototype.syncToNetTable(self, rootNodeChildren)
    GameRules.XNetTable:SetTableValue("performance_debug", "debug_data", rootNodeChildren)
end
function ____exports.GetFlameGraphProfiler(self)
    return ____exports.FlameGraphProfiler:getInstance()
end
local function emptyDecorator(____, str)
    return function(____, target, propertyKey, descriptor)
        return descriptor
    end
end
local function emptyClassDecorator(____, target)
    return target
end
____exports.Profile = ____exports.FlameGraphProfiler.profile
____exports.ProfileClass = ____exports.FlameGraphProfiler.profileClass
Test = __TS__Class()
Test.name = "Test"
function Test.prototype.____constructor(self)
end
function Test.prototype.time_offet_test(self)
end
__TS__DecorateLegacy(
    {____exports.Profile(nil)},
    Test.prototype,
    "time_offet_test",
    true
)
return ____exports
