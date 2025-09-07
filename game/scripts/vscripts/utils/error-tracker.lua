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
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__StringCharCodeAt = ____lualib.__TS__StringCharCodeAt
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ArraySlice = ____lualib.__TS__ArraySlice
local __TS__ArrayMap = ____lualib.__TS__ArrayMap
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["21"] = 36,["22"] = 36,["23"] = 36,["25"] = 43,["26"] = 44,["27"] = 45,["28"] = 46,["29"] = 47,["30"] = 50,["31"] = 51,["32"] = 52,["33"] = 49,["34"] = 55,["35"] = 56,["36"] = 57,["38"] = 59,["39"] = 55,["40"] = 65,["41"] = 67,["42"] = 68,["43"] = 69,["47"] = 120,["48"] = 121,["51"] = 73,["52"] = 75,["53"] = 76,["54"] = 77,["55"] = 80,["56"] = 81,["57"] = 82,["58"] = 83,["59"] = 86,["60"] = 87,["62"] = 90,["64"] = 94,["65"] = 94,["66"] = 94,["67"] = 94,["68"] = 94,["69"] = 94,["70"] = 94,["71"] = 94,["72"] = 94,["73"] = 94,["74"] = 94,["75"] = 107,["76"] = 110,["77"] = 113,["78"] = 114,["80"] = 117,["86"] = 123,["89"] = 72,["92"] = 65,["93"] = 130,["94"] = 131,["95"] = 133,["96"] = 133,["97"] = 133,["98"] = 133,["99"] = 133,["100"] = 139,["102"] = 130,["103"] = 150,["104"] = 151,["105"] = 156,["106"] = 150,["107"] = 162,["108"] = 163,["109"] = 164,["110"] = 164,["111"] = 164,["112"] = 164,["113"] = 167,["114"] = 167,["115"] = 167,["116"] = 167,["117"] = 167,["118"] = 167,["119"] = 167,["120"] = 162,["121"] = 179,["122"] = 180,["123"] = 181,["124"] = 182,["125"] = 179,["126"] = 187,["127"] = 188,["128"] = 188,["129"] = 188,["131"] = 188,["133"] = 188,["134"] = 189,["135"] = 190,["136"] = 191,["137"] = 194,["139"] = 195,["140"] = 195,["141"] = 196,["142"] = 197,["143"] = 195,["146"] = 200,["147"] = 187,["148"] = 203,["149"] = 205,["150"] = 206,["152"] = 209,["153"] = 203,["154"] = 212,["155"] = 213,["156"] = 213,["157"] = 215,["158"] = 215,["159"] = 215,["160"] = 215,["161"] = 215,["162"] = 213,["163"] = 213,["164"] = 223,["165"] = 223,["166"] = 212,["167"] = 226,["168"] = 227,["169"] = 228,["170"] = 230,["171"] = 230,["172"] = 230,["173"] = 231,["174"] = 232,["177"] = 236,["178"] = 226,["179"] = 239,["180"] = 241,["181"] = 242,["182"] = 243,["183"] = 241,["184"] = 239,["185"] = 247,["186"] = 249,["187"] = 250,["188"] = 251,["189"] = 249,["190"] = 247,["191"] = 255,["192"] = 256,["197"] = 290,["200"] = 262,["201"] = 263,["202"] = 263,["203"] = 265,["204"] = 265,["205"] = 265,["206"] = 265,["207"] = 263,["208"] = 263,["209"] = 273,["210"] = 274,["211"] = 274,["212"] = 274,["213"] = 274,["214"] = 274,["215"] = 274,["216"] = 277,["217"] = 277,["218"] = 277,["219"] = 274,["220"] = 274,["221"] = 274,["223"] = 288,["229"] = 255,["230"] = 294,["231"] = 295,["232"] = 296,["233"] = 297,["235"] = 299,["236"] = 300,["238"] = 294,["239"] = 306,["240"] = 307,["241"] = 307,["242"] = 307,["244"] = 307,["246"] = 307,["247"] = 306,["248"] = 310,["249"] = 311,["250"] = 310,["251"] = 314,["252"] = 316,["253"] = 314,["254"] = 319,["255"] = 320,["256"] = 319,["257"] = 323,["260"] = 331,["263"] = 326,["264"] = 327,["266"] = 329,["272"] = 325,["275"] = 323,["276"] = 335,["279"] = 350,["282"] = 338,["283"] = 339,["285"] = 341,["286"] = 342,["288"] = 344,["289"] = 345,["291"] = 348,["297"] = 336,["300"] = 335,["301"] = 38,["302"] = 39,["303"] = 40,["304"] = 41,["305"] = 356,["306"] = 358,["307"] = 356,["308"] = 362,["309"] = 365});
local ____exports = {}
____exports.ErrorTracker = __TS__Class()
local ErrorTracker = ____exports.ErrorTracker
ErrorTracker.name = "ErrorTracker"
function ErrorTracker.prototype.____constructor(self)
    self.errorCache = __TS__New(Map)
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
            local errorHash = self:generateErrorHash(____error, context)
            local now = self:getCurrentTime()
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
                message = ____error.message or "Unknown error",
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
    local totalErrors = self.errorCache.size
    local recentErrors = __TS__ArrayFilter(
        __TS__ArrayFrom(self.errorCache:values()),
        function(____, ____error) return self:getCurrentTime() - ____error.timestamp < 60 * 60 * 1000 end
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
            timestamp = self:getCurrentTime()
        }
    }
    local ____self_reportQueue_1 = self.reportQueue
    ____self_reportQueue_1[#____self_reportQueue_1 + 1] = report
end
function ErrorTracker.prototype.cleanupCache(self)
    local now = self:getCurrentTime()
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
