local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 2,["8"] = 2,["9"] = 3,["10"] = 3,["11"] = 5,["12"] = 5,["13"] = 5,["14"] = 6,["15"] = 7,["16"] = 8,["17"] = 9,["18"] = 10,["21"] = 15,["24"] = 12,["25"] = 13,["31"] = 17,["32"] = 5,["33"] = 5,["34"] = 5,["35"] = 5});
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
