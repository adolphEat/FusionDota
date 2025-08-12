local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 7,["11"] = 7,["12"] = 7,["13"] = 7,["14"] = 8,["15"] = 8,["16"] = 8,["18"] = 13,["19"] = 13,["21"] = 13,["22"] = 15,["23"] = 18,["24"] = 21,["27"] = 15,["32"] = 25,["33"] = 28,["36"] = 25,["41"] = 32,["42"] = 33,["43"] = 34,["45"] = 32,["47"] = 43,["48"] = 43,["50"] = 43,["51"] = 45,["52"] = 47,["53"] = 50,["54"] = 45,["55"] = 53,["56"] = 55,["57"] = 58,["58"] = 53,["59"] = 61,["60"] = 63,["61"] = 61,["62"] = 66,["63"] = 67,["64"] = 68,["66"] = 66,["67"] = 43,["69"] = 77,["70"] = 77,["72"] = 78,["73"] = 77,["74"] = 80,["75"] = 82,["76"] = 85,["77"] = 88,["78"] = 91,["79"] = 80,["80"] = 94,["81"] = 96,["82"] = 99,["83"] = 102,["84"] = 94,["85"] = 105,["86"] = 106,["87"] = 107,["89"] = 105,["90"] = 114,["91"] = 114,["93"] = 117,["94"] = 118,["96"] = 119,["97"] = 119,["98"] = 120,["99"] = 119,["102"] = 122,["103"] = 117,["104"] = 116,["105"] = 127,["107"] = 128,["108"] = 128,["109"] = 129,["110"] = 130,["111"] = 131,["112"] = 132,["113"] = 128,["116"] = 127,["117"] = 136,["118"] = 137,["119"] = 138,["120"] = 139,["121"] = 140,["122"] = 136,["123"] = 114,["124"] = 144,["125"] = 144,["126"] = 144,["128"] = 147,["129"] = 148,["130"] = 149,["131"] = 149,["132"] = 149,["133"] = 149,["134"] = 149,["135"] = 145,["136"] = 152,["137"] = 153,["138"] = 154,["139"] = 155,["140"] = 157,["141"] = 158,["142"] = 159,["144"] = 161,["145"] = 163,["146"] = 164,["147"] = 165,["149"] = 166,["150"] = 166,["151"] = 167,["152"] = 166,["155"] = 171,["156"] = 172,["158"] = 174,["159"] = 174,["160"] = 175,["161"] = 174,["164"] = 179,["165"] = 180,["167"] = 181,["168"] = 181,["169"] = 182,["170"] = 181,["173"] = 184,["175"] = 152});
local ____exports = {}
local ____flame_graph_profiler = require("utils.performance.flame_graph_profiler")
local GetFlameGraphProfiler = ____flame_graph_profiler.GetFlameGraphProfiler
local Profile = ____flame_graph_profiler.Profile
local ProfileClass = ____flame_graph_profiler.ProfileClass
local ____flame_graph_commands = require("utils.performance.flame_graph_commands")
local InitFlameGraphCommands = ____flame_graph_commands.InitFlameGraphCommands
local FlameGraphCommands = ____flame_graph_commands.FlameGraphCommands
--- 测试类 - 使用单个方法装饰器
local ProfileDecoratorTest = __TS__Class()
ProfileDecoratorTest.name = "ProfileDecoratorTest"
function ProfileDecoratorTest.prototype.____constructor(self)
end
function ProfileDecoratorTest.prototype.testMethod1(self)
    self:simulateWork(50)
    self:testMethod2()
end
__TS__DecorateLegacy(
    {Profile(nil)},
    ProfileDecoratorTest.prototype,
    "testMethod1",
    true
)
function ProfileDecoratorTest.prototype.testMethod2(self)
    self:simulateWork(30)
end
__TS__DecorateLegacy(
    {Profile(nil, "自定义方法名.testMethod2")},
    ProfileDecoratorTest.prototype,
    "testMethod2",
    true
)
function ProfileDecoratorTest.prototype.simulateWork(self, ms)
    local startTime = GetSystemTimeMS()
    while GetSystemTimeMS() - startTime < ms do
    end
end
--- 测试类 - 使用类装饰器监控所有方法
local ProfileClassTest = __TS__Class()
ProfileClassTest.name = "ProfileClassTest"
function ProfileClassTest.prototype.____constructor(self)
end
function ProfileClassTest.prototype.testMethod1(self)
    self:simulateWork(40)
    self:testMethod2()
end
function ProfileClassTest.prototype.testMethod2(self)
    self:simulateWork(25)
    self:testMethod3()
end
function ProfileClassTest.prototype.testMethod3(self)
    self:simulateWork(15)
end
function ProfileClassTest.prototype.simulateWork(self, ms)
    local startTime = GetSystemTimeMS()
    while GetSystemTimeMS() - startTime < ms do
    end
end
ProfileClassTest = __TS__DecorateLegacy({ProfileClass}, ProfileClassTest)
--- 手动性能分析测试类
local ManualProfileTest = __TS__Class()
ManualProfileTest.name = "ManualProfileTest"
function ManualProfileTest.prototype.____constructor(self)
    self.profiler = GetFlameGraphProfiler(nil)
end
function ManualProfileTest.prototype.testManualProfiling(self)
    self.profiler:enterFunction("ManualProfileTest.testManualProfiling")
    self:simulateWork(60)
    self:nestedFunction()
    self.profiler:exitFunction()
end
function ManualProfileTest.prototype.nestedFunction(self)
    self.profiler:enterFunction("ManualProfileTest.nestedFunction")
    self:simulateWork(35)
    self.profiler:exitFunction()
end
function ManualProfileTest.prototype.simulateWork(self, ms)
    local startTime = GetSystemTimeMS()
    while GetSystemTimeMS() - startTime < ms do
    end
end
local Debug_Test = __TS__Class()
Debug_Test.name = "Debug_Test"
function Debug_Test.prototype.____constructor(self)
    Timers:CreateTimer(function()
        self:Test()
        do
            local i = 0
            while i < 10000 do
                self:Test2()
                i = i + 1
            end
        end
        return 0.2
    end)
end
function Debug_Test.prototype.Test(self)
    do
        local i = 0
        while i < 10000 do
            math.random(0, 10000)
            math.random(0, 10000)
            math.random(0, 10000)
            math.random(0, 10000)
            i = i + 1
        end
    end
end
function Debug_Test.prototype.Test2(self)
    math.random(0, 10000)
    math.random(0, 10000)
    math.random(0, 10000)
    math.random(0, 10000)
end
Debug_Test = __TS__DecorateLegacy({ProfileClass}, Debug_Test)
____exports.FlameGraphProfilerTests = __TS__Class()
local FlameGraphProfilerTests = ____exports.FlameGraphProfilerTests
FlameGraphProfilerTests.name = "FlameGraphProfilerTests"
function FlameGraphProfilerTests.prototype.____constructor(self)
    InitFlameGraphCommands(nil)
    print("初始化性能测试!")
    ListenToGameEvent(
        "player_chat",
        function(____, keys) return self:OnPlayerChat(keys) end,
        self
    )
end
function FlameGraphProfilerTests.prototype.OnPlayerChat(self, keys)
    local strs = __TS__StringSplit(keys.text, " ")
    local cmd = strs[1]
    local args = __TS__ArraySlice(strs, 1)
    if cmd == "-test" then
        FlameGraphCommands:getInstance():handleStart()
        __TS__New(Debug_Test)
    end
    if cmd == "-test2" then
        FlameGraphCommands:getInstance():handleStart()
        print("测试单个方法装饰器...")
        local decoratorTest = __TS__New(ProfileDecoratorTest)
        do
            local i = 0
            while i < 5 do
                decoratorTest:testMethod1()
                i = i + 1
            end
        end
        print("测试类装饰器...")
        local classTest = __TS__New(ProfileClassTest)
        do
            local i = 0
            while i < 5 do
                classTest:testMethod1()
                i = i + 1
            end
        end
        print("测试手动性能分析...")
        local manualTest = __TS__New(ManualProfileTest)
        do
            local i = 0
            while i < 5 do
                manualTest:testManualProfiling()
                i = i + 1
            end
        end
        FlameGraphCommands:getInstance():handleStop()
    end
end
return ____exports
