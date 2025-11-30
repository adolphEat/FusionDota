local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 2,["8"] = 2,["9"] = 4,["10"] = 4,["11"] = 6,["12"] = 6,["13"] = 6,["14"] = 7,["15"] = 8,["16"] = 9,["17"] = 10,["18"] = 11,["21"] = 16,["24"] = 13,["25"] = 14,["31"] = 18,["32"] = 6,["33"] = 6,["34"] = 6,["35"] = 6});
local ____exports = {}
require("utils.index")
local ____modules = require("modules.index")
local ActivateModules = ____modules.ActivateModules
local ____precache = require("utils.precache")
local Precache = ____precache.default
__TS__ObjectAssign(
    getfenv(),
    {
        Activate = function()
            print("========================================")
            print("[GameMode] ADDON GAME MODE ACTIVATING")
            print("[GameMode] About to call ActivateModules()")
            print("========================================")
            do
                local function ____catch(____error)
                    print("[GameMode] ERROR in ActivateModules():", ____error)
                end
                local ____try, ____hasReturned = pcall(function()
                    ActivateModules(nil)
                    print("[GameMode] ActivateModules() completed successfully")
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
            print("[GameMode] Addon activation complete")
        end,
        Precache = Precache
    }
)
return ____exports
