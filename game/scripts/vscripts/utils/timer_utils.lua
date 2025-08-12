local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 7,["11"] = 8,["12"] = 9,["13"] = 10,["14"] = 11,["15"] = 12,["18"] = 15,["19"] = 15,["21"] = 9,["22"] = 7});
local ____exports = {}
--- 启动一个执行N次的定时器
-- 
-- @export
-- @param callback 回调函数，如果返回数值，可以变成一个可变间隔的定时器
-- @param times 执行次数，如果不提供，那么只执行1次，如果不提供或者提供的数值为负数，那么会一直执行
function ____exports.LoopByTimer(self, callback, times)
    local repeatTimes = times or -10
    Timers:CreateTimer(function()
        repeatTimes = repeatTimes - 1
        local newInterval = callback(nil, repeatTimes)
        if repeatTimes == 0 then
            return
        end
        if newInterval and newInterval >= 0 then
            return newInterval
        end
    end)
end
return ____exports
