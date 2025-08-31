local ____lualib = require("lualib_bundle")
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 2,["9"] = 3,["10"] = 6,["11"] = 8,["12"] = 9,["13"] = 11,["14"] = 12,["15"] = 13,["16"] = 16,["17"] = 16,["18"] = 16,["19"] = 17,["21"] = 21,["22"] = 22,["23"] = 24,["24"] = 2});
local ____exports = {}
function ____exports.testMap(self)
    print("[TestMap] Starting Map compatibility test")
    local testMap = __TS__New(Map)
    testMap:set("key1", 100)
    testMap:set("key2", 200)
    print("[TestMap] Map size: " .. tostring(testMap.size))
    print("[TestMap] key1 value: " .. tostring(testMap:get("key1")))
    print("[TestMap] has key2: " .. tostring(testMap:has("key2")))
    for ____, ____value in __TS__Iterator(testMap) do
        local key = ____value[1]
        local value = ____value[2]
        print((("[TestMap] " .. key) .. ": ") .. tostring(value))
    end
    testMap:delete("key1")
    print("[TestMap] After delete key1, size: " .. tostring(testMap.size))
    print("[TestMap] Map test completed")
end
return ____exports
