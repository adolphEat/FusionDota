local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 10,["8"] = 12,["9"] = 10,["12"] = 19,["13"] = 20,["14"] = 19});
local ____exports = {}
--- 获取当前时间戳（秒）
-- Lua兼容版本，使用游戏时间而不是系统时间
function ____exports.getTimestamp(self)
    return GameRules:GetGameTime()
end
--- 获取当前时间戳（毫秒模拟）
-- 注意：这不是真实的毫秒时间戳，只是游戏时间 * 1000
function ____exports.getTimestampMs(self)
    return GameRules:GetGameTime() * 1000
end
return ____exports
