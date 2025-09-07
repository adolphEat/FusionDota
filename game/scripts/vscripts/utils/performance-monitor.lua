local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__NumberToString = ____lualib.__TS__NumberToString
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 28,["17"] = 28,["18"] = 28,["20"] = 33,["21"] = 34,["22"] = 35,["23"] = 36,["24"] = 37,["25"] = 40,["26"] = 41,["27"] = 39,["28"] = 44,["29"] = 45,["30"] = 46,["32"] = 48,["33"] = 44,["34"] = 54,["35"] = 55,["36"] = 55,["37"] = 55,["38"] = 55,["39"] = 55,["40"] = 55,["41"] = 55,["42"] = 55,["43"] = 57,["44"] = 57,["45"] = 57,["46"] = 57,["47"] = 57,["48"] = 57,["49"] = 57,["50"] = 57,["51"] = 63,["52"] = 54,["53"] = 69,["54"] = 70,["55"] = 71,["56"] = 72,["57"] = 73,["59"] = 76,["60"] = 77,["61"] = 79,["62"] = 86,["63"] = 89,["64"] = 90,["65"] = 91,["67"] = 94,["68"] = 69,["69"] = 100,["70"] = 101,["71"] = 101,["72"] = 101,["73"] = 101,["74"] = 101,["75"] = 101,["76"] = 109,["77"] = 110,["78"] = 111,["80"] = 100,["81"] = 118,["82"] = 119,["83"] = 118,["84"] = 125,["85"] = 126,["86"] = 128,["87"] = 129,["89"] = 132,["90"] = 125,["91"] = 138,["92"] = 139,["93"] = 141,["94"] = 141,["95"] = 141,["96"] = 141,["97"] = 141,["98"] = 141,["99"] = 141,["100"] = 149,["101"] = 138,["102"] = 155,["103"] = 156,["104"] = 157,["105"] = 158,["106"] = 159,["107"] = 155,["108"] = 164,["109"] = 166,["110"] = 166,["111"] = 169,["112"] = 170,["114"] = 174,["115"] = 164,["116"] = 177,["117"] = 178,["118"] = 180,["119"] = 181,["120"] = 182,["121"] = 183,["122"] = 184,["123"] = 185,["124"] = 186,["126"] = 188,["127"] = 188,["128"] = 188,["129"] = 188,["130"] = 188,["131"] = 188,["132"] = 188,["133"] = 188,["135"] = 177,["136"] = 199,["137"] = 200,["138"] = 201,["141"] = 206,["142"] = 207,["143"] = 199,["144"] = 210,["145"] = 211,["150"] = 229,["153"] = 216,["154"] = 217,["155"] = 217,["156"] = 217,["157"] = 218,["158"] = 218,["159"] = 218,["160"] = 218,["161"] = 218,["162"] = 218,["163"] = 218,["165"] = 227,["171"] = 210,["172"] = 233,["173"] = 234,["174"] = 235,["176"] = 238,["177"] = 239,["179"] = 233,["180"] = 243,["181"] = 244,["182"] = 244,["183"] = 244,["184"] = 244,["185"] = 245,["186"] = 245,["187"] = 245,["188"] = 245,["189"] = 245,["190"] = 245,["191"] = 245,["192"] = 245,["193"] = 245,["194"] = 245,["195"] = 244,["196"] = 244,["197"] = 244,["198"] = 244,["199"] = 244,["200"] = 244,["201"] = 244,["202"] = 243,["203"] = 254,["204"] = 255,["205"] = 255,["206"] = 255,["207"] = 255,["208"] = 255,["209"] = 255,["210"] = 255,["211"] = 255,["212"] = 254,["213"] = 265,["214"] = 267,["215"] = 268,["217"] = 270,["218"] = 265,["219"] = 273,["220"] = 275,["221"] = 276,["222"] = 277,["223"] = 275,["224"] = 273,["225"] = 30,["226"] = 31,["227"] = 283,["228"] = 288,["229"] = 290,["230"] = 291,["232"] = 294,["233"] = 294,["234"] = 295,["237"] = 297,["238"] = 297,["239"] = 297,["240"] = 297,["241"] = 298,["244"] = 300,["247"] = 296,["250"] = 294,["251"] = 283,["252"] = 306,["253"] = 307,["254"] = 309,["255"] = 310,["257"] = 313,["260"] = 315,["263"] = 317,["266"] = 314,["269"] = 306,["270"] = 322,["271"] = 325,["272"] = 328});
local ____exports = {}
____exports.PerformanceMonitor = __TS__Class()
local PerformanceMonitor = ____exports.PerformanceMonitor
PerformanceMonitor.name = "PerformanceMonitor"
function PerformanceMonitor.prototype.____constructor(self)
    self.metrics = {}
    self.stats = __TS__New(Map)
    self.activeTimers = __TS__New(Map)
    self.thresholds = __TS__New(Map)
    self.lastStatsUpdate = 0
    self:startStatsUpdateTimer()
    print("[PerformanceMonitor] Initialized")
end
function PerformanceMonitor.getInstance(self)
    if not ____exports.PerformanceMonitor.instance then
        ____exports.PerformanceMonitor.instance = __TS__New(____exports.PerformanceMonitor)
    end
    return ____exports.PerformanceMonitor.instance
end
function PerformanceMonitor.prototype.startTimer(self, operation, context)
    local timerId = (((operation .. "_") .. tostring(Date:now())) .. "_") .. __TS__StringSubstr(
        __TS__NumberToString(
            math.random(),
            36
        ),
        2,
        9
    )
    self.activeTimers:set(
        timerId,
        {
            operation = operation,
            startTime = self:getCurrentTime(),
            context = context
        }
    )
    return timerId
end
function PerformanceMonitor.prototype.endTimer(self, timerId)
    local timer = self.activeTimers:get(timerId)
    if not timer then
        print("[PerformanceMonitor] Timer not found: " .. timerId)
        return 0
    end
    local endTime = self:getCurrentTime()
    local duration = endTime - timer.startTime
    self:recordMetric({operation = timer.operation, duration = duration, timestamp = endTime, context = timer.context})
    self.activeTimers:delete(timerId)
    local threshold = self.thresholds:get(timer.operation)
    if threshold and duration > threshold then
        self:reportPerformanceIssue(timer.operation, duration, threshold, timer.context)
    end
    return duration
end
function PerformanceMonitor.prototype.recordDuration(self, operation, duration, context)
    self:recordMetric({
        operation = operation,
        duration = duration,
        timestamp = self:getCurrentTime(),
        context = context
    })
    local threshold = self.thresholds:get(operation)
    if threshold and duration > threshold then
        self:reportPerformanceIssue(operation, duration, threshold, context)
    end
end
function PerformanceMonitor.prototype.setThreshold(self, operation, thresholdMs)
    self.thresholds:set(operation, thresholdMs)
end
function PerformanceMonitor.prototype.getStats(self, operation)
    self:updateStats()
    if operation then
        return self.stats:get(operation) or self:createEmptyStats()
    end
    return __TS__New(Map, self.stats)
end
function PerformanceMonitor.prototype.getSummary(self)
    self:updateStats()
    local summary = {
        totalOperations = #self.metrics,
        uniqueOperations = self.stats.size,
        activeTimers = self.activeTimers.size,
        lastUpdate = self.lastStatsUpdate,
        topSlowOperations = self:getTopSlowOperations(5)
    }
    return summary
end
function PerformanceMonitor.prototype.clearMetrics(self)
    self.metrics = {}
    self.stats:clear()
    self.activeTimers:clear()
    print("[PerformanceMonitor] All metrics cleared")
end
function PerformanceMonitor.prototype.recordMetric(self, metric)
    local ____self_metrics_0 = self.metrics
    ____self_metrics_0[#____self_metrics_0 + 1] = metric
    if #self.metrics > ____exports.PerformanceMonitor.MAX_METRICS_HISTORY then
        table.remove(self.metrics, 1)
    end
    self:updateOperationStats(metric)
end
function PerformanceMonitor.prototype.updateOperationStats(self, metric)
    local existing = self.stats:get(metric.operation)
    if existing then
        existing.count = existing.count + 1
        existing.totalTime = existing.totalTime + metric.duration
        existing.averageTime = existing.totalTime / existing.count
        existing.maxTime = math.max(existing.maxTime, metric.duration)
        existing.minTime = math.min(existing.minTime, metric.duration)
        existing.lastUpdate = metric.timestamp
    else
        self.stats:set(metric.operation, {
            count = 1,
            totalTime = metric.duration,
            averageTime = metric.duration,
            maxTime = metric.duration,
            minTime = metric.duration,
            lastUpdate = metric.timestamp
        })
    end
end
function PerformanceMonitor.prototype.updateStats(self)
    local now = self:getCurrentTime()
    if now - self.lastStatsUpdate < ____exports.PerformanceMonitor.STATS_UPDATE_INTERVAL * 1000 then
        return
    end
    self:syncStatsToNetTable()
    self.lastStatsUpdate = now
end
function PerformanceMonitor.prototype.syncStatsToNetTable(self)
    if not GameRules.XNetTable then
        return
    end
    do
        local function ____catch(____error)
            print("[PerformanceMonitor] Failed to sync stats: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            local statsData = {}
            for ____, ____value in __TS__Iterator(self.stats) do
                local operation = ____value[1]
                local stats = ____value[2]
                statsData[operation] = {
                    count = stats.count,
                    totalTime = math.floor(stats.totalTime * 100 + 0.5) / 100,
                    averageTime = math.floor(stats.averageTime * 100 + 0.5) / 100,
                    maxTime = math.floor(stats.maxTime * 100 + 0.5) / 100,
                    lastUpdate = stats.lastUpdate
                }
            end
            GameRules.XNetTable:SetTableValue("debug_info", "performance_metrics", statsData)
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function PerformanceMonitor.prototype.reportPerformanceIssue(self, operation, duration, threshold, context)
    if GameRules.ErrorTracker then
        GameRules.ErrorTracker:trackPerformanceIssue(operation, duration, threshold, context)
    end
    if IsInToolsMode() then
        print(((((("[PERFORMANCE] " .. operation) .. " took ") .. __TS__NumberToFixed(duration, 2)) .. "ms (threshold: ") .. tostring(threshold)) .. "ms)")
    end
end
function PerformanceMonitor.prototype.getTopSlowOperations(self, count)
    return __TS__ArraySlice(
        __TS__ArraySort(
            __TS__ArrayMap(
                __TS__ArrayFrom(self.stats:entries()),
                function(____, ____bindingPattern0)
                    local stats
                    local operation
                    operation = ____bindingPattern0[1]
                    stats = ____bindingPattern0[2]
                    return {
                        operation = operation,
                        avgTime = math.floor(stats.averageTime * 100 + 0.5) / 100,
                        maxTime = math.floor(stats.maxTime * 100 + 0.5) / 100
                    }
                end
            ),
            function(____, a, b) return b.avgTime - a.avgTime end
        ),
        0,
        count
    )
end
function PerformanceMonitor.prototype.createEmptyStats(self)
    return {
        count = 0,
        totalTime = 0,
        averageTime = 0,
        maxTime = 0,
        minTime = 0,
        lastUpdate = 0
    }
end
function PerformanceMonitor.prototype.getCurrentTime(self)
    if type(GameRules) ~= "nil" and GameRules.GetGameTime then
        return GameRules:GetGameTime() * 1000
    end
    return Date:now()
end
function PerformanceMonitor.prototype.startStatsUpdateTimer(self)
    Timers:CreateTimer(function()
        self:updateStats()
        return ____exports.PerformanceMonitor.STATS_UPDATE_INTERVAL
    end)
end
PerformanceMonitor.MAX_METRICS_HISTORY = 1000
PerformanceMonitor.STATS_UPDATE_INTERVAL = 30
function ____exports.measurePerformance(self, func, operationName, threshold)
    local monitor = ____exports.PerformanceMonitor:getInstance()
    if threshold then
        monitor:setThreshold(operationName, threshold)
    end
    return function(____, ...)
        local args = {...}
        local timerId = monitor:startTimer(operationName)
        do
            local ____try, ____hasReturned, ____returnValue = pcall(function()
                local result = func(
                    self,
                    unpack(args)
                )
                return true, result
            end)
            do
                monitor:endTimer(timerId)
            end
            if ____try and ____hasReturned then
                return ____returnValue
            end
        end
    end
end
function ____exports.withTiming(self, operation, func, threshold)
    local monitor = ____exports.PerformanceMonitor:getInstance()
    if threshold then
        monitor:setThreshold(operation, threshold)
    end
    local timerId = monitor:startTimer(operation)
    do
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            return true, func(nil)
        end)
        do
            monitor:endTimer(timerId)
        end
        if ____try and ____hasReturned then
            return ____returnValue
        end
    end
end
____exports.startTimer = function(____, operation, context) return ____exports.PerformanceMonitor:getInstance():startTimer(operation, context) end
____exports.endTimer = function(____, timerId) return ____exports.PerformanceMonitor:getInstance():endTimer(timerId) end
____exports.recordDuration = function(____, operation, duration, context) return ____exports.PerformanceMonitor:getInstance():recordDuration(operation, duration, context) end
return ____exports
