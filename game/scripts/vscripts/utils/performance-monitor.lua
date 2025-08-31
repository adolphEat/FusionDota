local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__NumberToString = ____lualib.__TS__NumberToString
local __TS__StringSubstr = ____lualib.__TS__StringSubstr
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 28,["13"] = 28,["14"] = 28,["16"] = 33,["17"] = 34,["18"] = 35,["19"] = 36,["20"] = 37,["21"] = 40,["22"] = 41,["23"] = 39,["24"] = 44,["25"] = 45,["26"] = 46,["28"] = 48,["29"] = 44,["30"] = 54,["31"] = 55,["32"] = 55,["33"] = 55,["34"] = 55,["35"] = 55,["36"] = 55,["37"] = 55,["38"] = 55,["39"] = 57,["40"] = 57,["41"] = 57,["42"] = 57,["43"] = 57,["44"] = 57,["45"] = 57,["46"] = 57,["47"] = 63,["48"] = 54,["49"] = 69,["50"] = 70,["51"] = 71,["52"] = 72,["53"] = 73,["55"] = 76,["56"] = 77,["57"] = 79,["58"] = 86,["59"] = 89,["60"] = 90,["61"] = 91,["63"] = 94,["64"] = 69,["65"] = 100,["66"] = 101,["67"] = 101,["68"] = 101,["69"] = 101,["70"] = 101,["71"] = 101,["72"] = 109,["73"] = 110,["74"] = 111,["76"] = 100,["77"] = 118,["78"] = 119,["79"] = 118,["80"] = 125,["81"] = 126,["82"] = 128,["83"] = 129,["85"] = 132,["86"] = 125,["87"] = 138,["88"] = 139,["89"] = 141,["90"] = 141,["91"] = 141,["92"] = 141,["93"] = 141,["94"] = 141,["95"] = 141,["96"] = 149,["97"] = 138,["98"] = 155,["99"] = 156,["100"] = 157,["101"] = 158,["102"] = 159,["103"] = 155,["104"] = 164,["105"] = 166,["106"] = 166,["107"] = 169,["108"] = 170,["110"] = 174,["111"] = 164,["112"] = 177,["113"] = 178,["114"] = 180,["115"] = 181,["116"] = 182,["117"] = 183,["118"] = 184,["119"] = 185,["120"] = 186,["122"] = 188,["123"] = 188,["124"] = 188,["125"] = 188,["126"] = 188,["127"] = 188,["128"] = 188,["129"] = 188,["131"] = 177,["132"] = 199,["133"] = 200,["134"] = 201,["137"] = 206,["138"] = 207,["139"] = 199,["140"] = 210,["141"] = 211,["146"] = 229,["149"] = 216,["150"] = 217,["151"] = 217,["152"] = 217,["153"] = 218,["154"] = 218,["155"] = 218,["156"] = 218,["157"] = 218,["158"] = 218,["159"] = 218,["161"] = 227,["167"] = 210,["168"] = 233,["169"] = 234,["170"] = 235,["172"] = 238,["173"] = 239,["175"] = 233,["176"] = 243,["177"] = 245,["178"] = 246,["179"] = 248,["180"] = 249,["183"] = 250,["184"] = 251,["185"] = 252,["186"] = 252,["187"] = 252,["188"] = 252,["189"] = 252,["190"] = 257,["193"] = 261,["194"] = 243,["195"] = 264,["196"] = 265,["197"] = 265,["198"] = 265,["199"] = 265,["200"] = 265,["201"] = 265,["202"] = 265,["203"] = 265,["204"] = 264,["205"] = 275,["208"] = 283,["211"] = 278,["212"] = 279,["214"] = 281,["220"] = 277,["223"] = 275,["224"] = 287,["225"] = 289,["226"] = 290,["227"] = 291,["228"] = 289,["229"] = 287,["230"] = 30,["231"] = 31,["232"] = 297,["233"] = 302,["234"] = 304,["235"] = 305,["237"] = 308,["238"] = 308,["239"] = 309,["242"] = 311,["243"] = 311,["244"] = 311,["245"] = 311,["246"] = 312,["249"] = 314,["252"] = 310,["255"] = 308,["256"] = 297,["257"] = 320,["258"] = 321,["259"] = 323,["260"] = 324,["262"] = 327,["265"] = 329,["268"] = 331,["271"] = 328,["274"] = 320,["275"] = 336,["276"] = 339,["277"] = 342});
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
    local timerId = (((operation .. "_") .. tostring(self:getCurrentTime())) .. "_") .. __TS__StringSubstr(
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
    local result = {}
    local addedCount = 0
    for operation in pairs(self.stats:keys()) do
        if addedCount >= count then
            break
        end
        local stats = self.stats:get(operation)
        if stats then
            result[#result + 1] = {
                operation = operation,
                avgTime = math.floor(stats.averageTime * 100 + 0.5) / 100,
                maxTime = math.floor(stats.maxTime * 100 + 0.5) / 100
            }
            addedCount = addedCount + 1
        end
    end
    return result
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
    do
        local function ____catch(____error)
            return true, 0
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            if type(GameRules) ~= "nil" and GameRules.GetGameTime then
                return true, GameRules:GetGameTime() * 1000
            end
            return true, 0
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
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
