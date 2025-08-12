local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 2,["7"] = 12,["8"] = 12,["9"] = 12,["11"] = 12,["12"] = 14,["13"] = 15,["14"] = 14});
local ____exports = {}
local round_settings = require("json.round_settings")
____exports.RoundSettings = __TS__Class()
local RoundSettings = ____exports.RoundSettings
RoundSettings.name = "RoundSettings"
function RoundSettings.prototype.____constructor(self)
end
function RoundSettings.GetRoundSettings(self, round)
    return round_settings["round_" .. tostring(round)]
end
return ____exports
