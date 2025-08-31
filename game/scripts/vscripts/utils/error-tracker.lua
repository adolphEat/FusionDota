local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__StringCharCodeAt = ____lualib.__TS__StringCharCodeAt
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["16"] = 36,["17"] = 36,["18"] = 36,["20"] = 43,["21"] = 44,["22"] = 45,["23"] = 46,["24"] = 47,["25"] = 50,["26"] = 51,["27"] = 52,["28"] = 49,["29"] = 55,["30"] = 56,["31"] = 57,["33"] = 59,["34"] = 55,["35"] = 65,["36"] = 67,["37"] = 68,["38"] = 69,["42"] = 89,["43"] = 90,["46"] = 73,["47"] = 76,["48"] = 77,["49"] = 80,["50"] = 81,["51"] = 82,["52"] = 83,["55"] = 87,["61"] = 92,["64"] = 72,["67"] = 65,["68"] = 99,["69"] = 100,["70"] = 102,["71"] = 102,["72"] = 102,["73"] = 102,["74"] = 102,["75"] = 107,["77"] = 99,["78"] = 118,["79"] = 120,["80"] = 125,["81"] = 118,["82"] = 131,["83"] = 133,["84"] = 133,["85"] = 133,["86"] = 133,["87"] = 133,["88"] = 133,["89"] = 133,["90"] = 131,["91"] = 145,["92"] = 146,["93"] = 147,["94"] = 148,["95"] = 145,["96"] = 153,["97"] = 154,["98"] = 154,["99"] = 154,["101"] = 154,["103"] = 154,["104"] = 155,["105"] = 156,["106"] = 157,["107"] = 160,["109"] = 161,["110"] = 161,["111"] = 162,["112"] = 163,["113"] = 161,["116"] = 166,["117"] = 153,["118"] = 169,["119"] = 171,["120"] = 172,["121"] = 173,["123"] = 175,["124"] = 176,["126"] = 179,["127"] = 169,["128"] = 182,["129"] = 183,["130"] = 183,["131"] = 185,["132"] = 185,["133"] = 185,["134"] = 185,["135"] = 185,["136"] = 183,["137"] = 183,["138"] = 193,["139"] = 193,["140"] = 182,["141"] = 196,["142"] = 197,["143"] = 198,["144"] = 200,["145"] = 201,["146"] = 202,["147"] = 203,["150"] = 207,["151"] = 196,["152"] = 210,["153"] = 212,["154"] = 213,["155"] = 214,["156"] = 212,["157"] = 210,["158"] = 218,["159"] = 220,["160"] = 221,["161"] = 222,["162"] = 220,["163"] = 218,["164"] = 226,["165"] = 227,["170"] = 257,["173"] = 233,["174"] = 234,["175"] = 234,["176"] = 236,["177"] = 236,["178"] = 236,["179"] = 236,["180"] = 234,["181"] = 234,["182"] = 244,["183"] = 245,["184"] = 245,["185"] = 245,["186"] = 245,["187"] = 245,["188"] = 245,["189"] = 245,["190"] = 245,["191"] = 245,["193"] = 255,["199"] = 226,["200"] = 261,["201"] = 262,["202"] = 263,["203"] = 264,["205"] = 266,["206"] = 267,["208"] = 261,["209"] = 273,["210"] = 274,["211"] = 274,["212"] = 274,["214"] = 274,["216"] = 274,["217"] = 273,["218"] = 277,["219"] = 278,["220"] = 277,["221"] = 281,["222"] = 283,["223"] = 281,["224"] = 286,["225"] = 287,["226"] = 286,["227"] = 290,["230"] = 298,["233"] = 293,["234"] = 294,["236"] = 296,["242"] = 292,["245"] = 290,["246"] = 302,["249"] = 317,["252"] = 305,["253"] = 306,["255"] = 308,["256"] = 309,["258"] = 311,["259"] = 312,["261"] = 315,["267"] = 303,["270"] = 302,["271"] = 38,["272"] = 39,["273"] = 40,["274"] = 41,["275"] = 323,["276"] = 325,["277"] = 323,["278"] = 329,["279"] = 332});
local ____exports = {}
____exports.ErrorTracker = __TS__Class()
local ErrorTracker = ____exports.ErrorTracker
ErrorTracker.name = "ErrorTracker"
function ErrorTracker.prototype.____constructor(self)
    self.errorCache = {}
    self.reportQueue = {}
    self.lastCleanup = 0
    self.isInitialized = false
    self.isProcessingError = false
    self:startCleanupTimer()
    self:startReportTimer()
    self.isInitialized = true
end
function ErrorTracker.getInstance(self)
    if not ____exports.ErrorTracker.instance then
        ____exports.ErrorTracker.instance = __TS__New(____exports.ErrorTracker)
    end
    return ____exports.ErrorTracker.instance
end
function ErrorTracker.prototype.trackError(self, ____error, context)
    if self.isProcessingError then
        print("[ErrorTracker] Recursive error detected, skipping")
        return "recursive_error"
    end
    do
        local function ____catch(trackingError)
            print("[ErrorTracker] Failed to track error: " .. tostring(trackingError))
            return true, "tracking_failed"
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            self.isProcessingError = true
            local message = ____error.message or "Unknown error"
            local timestamp = self:getCurrentTime()
            if self:isInDevelopmentMode() then
                print("[ErrorTracker] Error: " .. message)
                if context then
                    print("[ErrorTracker] Context: " .. self:safeStringify(context))
                end
            end
            return true, "error_logged"
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        do
            self.isProcessingError = false
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function ErrorTracker.prototype.trackPerformanceIssue(self, operation, duration, threshold, context)
    if duration > threshold then
        local performanceError = {
            message = ((((("Performance issue: " .. operation) .. " took ") .. tostring(duration)) .. "ms (threshold: ") .. tostring(threshold)) .. "ms)",
            stack = "",
            name = "PerformanceError"
        }
        self:trackError(performanceError, {module = "PerformanceMonitor", ["function"] = operation, customData = {duration = duration, threshold = threshold, context = context}})
    end
end
function ErrorTracker.prototype.reportCustomError(self, message, context)
    local customError = {message = message, stack = "", name = "CustomError"}
    return self:trackError(customError, context)
end
function ErrorTracker.prototype.getErrorStats(self)
    return {
        totalErrors = 0,
        recentErrors = 0,
        cacheSize = 0,
        queueSize = 0,
        isInitialized = self.isInitialized
    }
end
function ErrorTracker.prototype.clearErrorCache(self)
    self.errorCache = {}
    self.reportQueue = {}
    print("[ErrorTracker] Error cache cleared")
end
function ErrorTracker.prototype.generateErrorHash(self, ____error, context)
    local ____context_0
    if context then
        ____context_0 = self:safeStringify(context)
    else
        ____context_0 = ""
    end
    local contextString = ____context_0
    local errorMessage = ____error.message or tostring(____error) or "Unknown error"
    local errorStack = ____error.stack or ""
    local hashInput = (((errorMessage .. "|") .. errorStack) .. "|") .. contextString
    local hash = 0
    do
        local i = 0
        while i < #hashInput do
            local char = __TS__StringCharCodeAt(hashInput, i)
            hash = (hash * 31 + char) % 2147483647
            i = i + 1
        end
    end
    return "error_" .. tostring(math.abs(hash))
end
function ErrorTracker.prototype.addToCache(self, errorInfo)
    local cacheSize = 0
    for _ in pairs(self.errorCache) do
        cacheSize = cacheSize + 1
    end
    if cacheSize >= ____exports.ErrorTracker.MAX_CACHE_SIZE then
        self:cleanupCache()
    end
    self.errorCache[errorInfo.errorHash] = errorInfo
end
function ErrorTracker.prototype.addToReportQueue(self, errorInfo)
    local report = {
        error = errorInfo,
        environment = {
            isToolsMode = self:isInDevelopmentMode(),
            playerCount = self:getPlayerCount(),
            gameVersion = self:getGameVersion(),
            timestamp = self:getCurrentTime()
        }
    }
    local ____self_reportQueue_1 = self.reportQueue
    ____self_reportQueue_1[#____self_reportQueue_1 + 1] = report
end
function ErrorTracker.prototype.cleanupCache(self)
    local now = self:getCurrentTime()
    local cutoffTime = now - ____exports.ErrorTracker.CACHE_TTL
    for hash in pairs(self.errorCache) do
        local errorInfo = self.errorCache[hash]
        if errorInfo.timestamp < cutoffTime then
            __TS__Delete(self.errorCache, hash)
        end
    end
    self.lastCleanup = now
end
function ErrorTracker.prototype.startCleanupTimer(self)
    Timers:CreateTimer(function()
        self:cleanupCache()
        return 10 * 60
    end)
end
function ErrorTracker.prototype.startReportTimer(self)
    Timers:CreateTimer(function()
        self:sendReportsToServer()
        return 5 * 60
    end)
end
function ErrorTracker.prototype.sendReportsToServer(self)
    if #self.reportQueue == 0 then
        return
    end
    do
        local function ____catch(____error)
            print("[ErrorTracker] Failed to send reports: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            local reports = __TS__ArraySplice(self.reportQueue, 0)
            local payload = {
                reports = reports,
                metadata = {
                    gameVersion = self:getGameVersion(),
                    timestamp = self:getCurrentTime(),
                    reportCount = #reports
                }
            }
            if GameRules.XNetTable then
                GameRules.XNetTable:SetTableValue(
                    "error_reports",
                    "latest_batch",
                    {
                        count = #reports,
                        timestamp = self:getCurrentTime(),
                        summary = {}
                    }
                )
            end
            print(("[ErrorTracker] Sent " .. tostring(#reports)) .. " error reports")
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function ErrorTracker.prototype.logErrorToConsole(self, errorInfo)
    print("[ERROR] " .. errorInfo.message)
    if errorInfo.stack then
        print("[STACK] " .. errorInfo.stack)
    end
    if errorInfo.context then
        print("[CONTEXT] " .. self:safeStringify(errorInfo.context))
    end
end
function ErrorTracker.prototype.getGameTime(self)
    local ____GameRules_GetGameTime_2
    if GameRules.GetGameTime then
        ____GameRules_GetGameTime_2 = GameRules:GetGameTime()
    else
        ____GameRules_GetGameTime_2 = 0
    end
    return ____GameRules_GetGameTime_2
end
function ErrorTracker.prototype.getGameVersion(self)
    return "fusion-v1.0.0"
end
function ErrorTracker.prototype.getPlayerCount(self)
    return 1
end
function ErrorTracker.prototype.isInDevelopmentMode(self)
    return IsInToolsMode()
end
function ErrorTracker.prototype.getCurrentTime(self)
    do
        local function ____catch(____error)
            return true, 0
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            if GameRules and GameRules.GetGameTime then
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
function ErrorTracker.prototype.safeStringify(self, obj)
    do
        local function ____catch(____error)
            return true, "[Unknown]"
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            if obj == nil or obj == nil then
                return true, "null"
            end
            if type(obj) == "string" then
                return true, obj
            end
            if type(obj) == "number" or type(obj) == "boolean" then
                return true, tostring(obj)
            end
            return true, "[Object]"
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
ErrorTracker.MAX_CACHE_SIZE = 500
ErrorTracker.CACHE_TTL = 30 * 60 * 1000
ErrorTracker.REPORT_INTERVAL = 5 * 60 * 1000
ErrorTracker.MAX_REPORTS_PER_ERROR = 10
function ____exports.initializeGlobalErrorHandling(self)
    print("[ErrorTracker] Global error handling initialized")
end
____exports.trackError = function(____, ____error, context) return ____exports.ErrorTracker:getInstance():trackError(____error, context) end
____exports.reportError = function(____, message, context) return ____exports.ErrorTracker:getInstance():reportCustomError(message, context) end
return ____exports
