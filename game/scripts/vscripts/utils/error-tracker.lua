local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__StringCharCodeAt = ____lualib.__TS__StringCharCodeAt
local __TS__NumberToString = ____lualib.__TS__NumberToString
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["23"] = 36,["24"] = 36,["25"] = 36,["27"] = 43,["28"] = 44,["29"] = 45,["30"] = 46,["31"] = 49,["32"] = 50,["33"] = 51,["34"] = 48,["35"] = 54,["36"] = 55,["37"] = 56,["39"] = 58,["40"] = 54,["41"] = 64,["44"] = 111,["45"] = 112,["48"] = 66,["49"] = 67,["50"] = 68,["51"] = 71,["52"] = 72,["53"] = 73,["54"] = 74,["55"] = 77,["56"] = 78,["58"] = 81,["60"] = 85,["61"] = 85,["62"] = 85,["63"] = 85,["64"] = 85,["65"] = 85,["66"] = 85,["67"] = 85,["68"] = 85,["69"] = 85,["70"] = 85,["71"] = 98,["72"] = 101,["73"] = 104,["74"] = 105,["76"] = 108,["82"] = 65,["85"] = 64,["86"] = 119,["87"] = 120,["88"] = 121,["89"] = 121,["90"] = 121,["91"] = 121,["92"] = 122,["93"] = 122,["94"] = 122,["95"] = 122,["96"] = 122,["97"] = 122,["98"] = 122,["99"] = 122,["101"] = 119,["102"] = 133,["103"] = 134,["104"] = 135,["105"] = 133,["106"] = 141,["107"] = 142,["108"] = 143,["109"] = 143,["110"] = 143,["111"] = 143,["112"] = 146,["113"] = 146,["114"] = 146,["115"] = 146,["116"] = 146,["117"] = 146,["118"] = 146,["119"] = 141,["120"] = 158,["121"] = 159,["122"] = 160,["123"] = 161,["124"] = 158,["125"] = 166,["126"] = 167,["127"] = 167,["128"] = 167,["130"] = 167,["132"] = 167,["133"] = 168,["134"] = 171,["136"] = 172,["137"] = 172,["138"] = 173,["139"] = 174,["140"] = 175,["141"] = 172,["144"] = 178,["145"] = 178,["146"] = 178,["147"] = 178,["148"] = 166,["149"] = 181,["150"] = 183,["151"] = 184,["153"] = 187,["154"] = 181,["155"] = 190,["156"] = 191,["157"] = 191,["158"] = 193,["159"] = 193,["160"] = 193,["161"] = 193,["162"] = 193,["163"] = 191,["164"] = 191,["165"] = 201,["166"] = 201,["167"] = 190,["168"] = 204,["169"] = 205,["170"] = 206,["171"] = 208,["172"] = 208,["173"] = 208,["174"] = 209,["175"] = 210,["178"] = 214,["179"] = 204,["180"] = 217,["181"] = 219,["182"] = 220,["183"] = 221,["184"] = 219,["185"] = 217,["186"] = 225,["187"] = 227,["188"] = 228,["189"] = 229,["190"] = 227,["191"] = 225,["192"] = 233,["193"] = 234,["198"] = 268,["201"] = 240,["202"] = 241,["203"] = 241,["204"] = 243,["205"] = 243,["206"] = 243,["207"] = 243,["208"] = 241,["209"] = 241,["210"] = 251,["211"] = 252,["212"] = 252,["213"] = 252,["214"] = 252,["215"] = 252,["216"] = 252,["217"] = 255,["218"] = 255,["219"] = 255,["220"] = 252,["221"] = 252,["222"] = 252,["224"] = 266,["230"] = 233,["231"] = 272,["232"] = 273,["233"] = 274,["234"] = 275,["236"] = 277,["237"] = 278,["239"] = 272,["240"] = 284,["241"] = 285,["242"] = 285,["243"] = 285,["245"] = 285,["247"] = 285,["248"] = 284,["249"] = 288,["250"] = 289,["251"] = 288,["252"] = 292,["253"] = 294,["254"] = 292,["255"] = 297,["256"] = 298,["257"] = 297,["258"] = 38,["259"] = 39,["260"] = 40,["261"] = 41,["262"] = 303,["263"] = 304,["264"] = 307,["265"] = 308,["266"] = 309,["267"] = 315,["268"] = 316,["270"] = 308,["271"] = 320,["272"] = 303,["273"] = 324,["274"] = 327});
local ____exports = {}
____exports.ErrorTracker = __TS__Class()
local ErrorTracker = ____exports.ErrorTracker
ErrorTracker.name = "ErrorTracker"
function ErrorTracker.prototype.____constructor(self)
    self.errorCache = __TS__New(Map)
    self.reportQueue = {}
    self.lastCleanup = 0
    self.isInitialized = false
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
    do
        local function ____catch(trackingError)
            print("[ErrorTracker] Failed to track error: " .. tostring(trackingError))
            return true, "tracking_failed"
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local errorHash = self:generateErrorHash(____error, context)
            local now = Date:now()
            local gameTime = self:getGameTime()
            if self.errorCache:has(errorHash) then
                local existingError = self.errorCache:get(errorHash)
                existingError.reportCount = existingError.reportCount + 1
                existingError.lastReported = now
                if existingError.reportCount <= ____exports.ErrorTracker.MAX_REPORTS_PER_ERROR then
                    self:addToReportQueue(existingError)
                end
                return true, errorHash
            end
            local errorInfo = {
                message = ____error.message,
                stack = ____error.stack,
                context = context,
                timestamp = now,
                gameTime = gameTime,
                gameVersion = self:getGameVersion(),
                errorHash = errorHash,
                reportCount = 1,
                lastReported = now
            }
            self:addToCache(errorInfo)
            self:addToReportQueue(errorInfo)
            if self:isInDevelopmentMode() then
                self:logErrorToConsole(errorInfo)
            end
            return true, errorHash
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function ErrorTracker.prototype.trackPerformanceIssue(self, operation, duration, threshold, context)
    if duration > threshold then
        local performanceError = __TS__New(
            Error,
            ((((("Performance issue: " .. operation) .. " took ") .. tostring(duration)) .. "ms (threshold: ") .. tostring(threshold)) .. "ms)"
        )
        self:trackError(
            performanceError,
            {
                module = "PerformanceMonitor",
                ["function"] = operation,
                customData = __TS__ObjectAssign({duration = duration, threshold = threshold}, context)
            }
        )
    end
end
function ErrorTracker.prototype.reportCustomError(self, message, context)
    local customError = __TS__New(Error, message)
    return self:trackError(customError, context)
end
function ErrorTracker.prototype.getErrorStats(self)
    local totalErrors = self.errorCache.size
    local recentErrors = __TS__ArrayFilter(
        __TS__ArrayFrom(self.errorCache:values()),
        function(____, ____error) return Date:now() - ____error.timestamp < 60 * 60 * 1000 end
    )
    return {
        totalErrors = totalErrors,
        recentErrors = #recentErrors,
        cacheSize = self.errorCache.size,
        queueSize = #self.reportQueue,
        isInitialized = self.isInitialized
    }
end
function ErrorTracker.prototype.clearErrorCache(self)
    self.errorCache:clear()
    self.reportQueue = {}
    print("[ErrorTracker] Error cache cleared")
end
function ErrorTracker.prototype.generateErrorHash(self, ____error, context)
    local ____context_0
    if context then
        ____context_0 = JSON:stringify(context)
    else
        ____context_0 = ""
    end
    local contextString = ____context_0
    local hashInput = (((____error.message .. "|") .. ____error.stack) .. "|") .. contextString
    local hash = 0
    do
        local i = 0
        while i < #hashInput do
            local char = __TS__StringCharCodeAt(hashInput, i)
            hash = bit.lshift(hash, 5) - hash + char
            hash = bit.band(hash, hash)
            i = i + 1
        end
    end
    return "error_" .. __TS__NumberToString(
        math.abs(hash),
        16
    )
end
function ErrorTracker.prototype.addToCache(self, errorInfo)
    if self.errorCache.size >= ____exports.ErrorTracker.MAX_CACHE_SIZE then
        self:cleanupCache()
    end
    self.errorCache:set(errorInfo.errorHash, errorInfo)
end
function ErrorTracker.prototype.addToReportQueue(self, errorInfo)
    local report = {
        error = errorInfo,
        environment = {
            isToolsMode = self:isInDevelopmentMode(),
            playerCount = self:getPlayerCount(),
            gameVersion = self:getGameVersion(),
            timestamp = Date:now()
        }
    }
    local ____self_reportQueue_1 = self.reportQueue
    ____self_reportQueue_1[#____self_reportQueue_1 + 1] = report
end
function ErrorTracker.prototype.cleanupCache(self)
    local now = Date:now()
    local cutoffTime = now - ____exports.ErrorTracker.CACHE_TTL
    for ____, ____value in __TS__Iterator(self.errorCache) do
        local hash = ____value[1]
        local errorInfo = ____value[2]
        if errorInfo.timestamp < cutoffTime then
            self.errorCache:delete(hash)
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
                    timestamp = Date:now(),
                    reportCount = #reports
                }
            }
            if GameRules.XNetTable then
                GameRules.XNetTable:SetTableValue(
                    "error_reports",
                    "latest_batch",
                    {
                        count = #reports,
                        timestamp = Date:now(),
                        summary = __TS__ArrayMap(
                            __TS__ArraySlice(reports, 0, 5),
                            function(____, r) return {message = r.error.message, hash = r.error.errorHash, count = r.error.reportCount} end
                        )
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
        print("[CONTEXT] " .. JSON:stringify(errorInfo.context))
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
ErrorTracker.MAX_CACHE_SIZE = 500
ErrorTracker.CACHE_TTL = 30 * 60 * 1000
ErrorTracker.REPORT_INTERVAL = 5 * 60 * 1000
ErrorTracker.MAX_REPORTS_PER_ERROR = 10
function ____exports.initializeGlobalErrorHandling(self)
    local tracker = ____exports.ErrorTracker:getInstance()
    local originalError = error
    _G.error = function(self, message, level)
        tracker:reportCustomError(message, {module = "Global", ["function"] = "error", customData = {level = level}})
        if originalError then
            originalError(message, level)
        end
    end
    print("[ErrorTracker] Global error handling initialized")
end
____exports.trackError = function(____, ____error, context) return ____exports.ErrorTracker:getInstance():trackError(____error, context) end
____exports.reportError = function(____, message, context) return ____exports.ErrorTracker:getInstance():reportCustomError(message, context) end
return ____exports
