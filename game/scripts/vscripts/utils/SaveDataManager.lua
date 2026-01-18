local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 25,["8"] = 25,["9"] = 25,["11"] = 27,["12"] = 30,["13"] = 29,["14"] = 33,["15"] = 34,["16"] = 35,["18"] = 37,["19"] = 33,["20"] = 44,["21"] = 44,["22"] = 53,["23"] = 56,["24"] = 53,["25"] = 63,["26"] = 66,["27"] = 63,["28"] = 73,["29"] = 76,["30"] = 73,["31"] = 91,["32"] = 94,["33"] = 91,["34"] = 98});
local ____exports = {}
____exports.SaveDataManager = __TS__Class()
local SaveDataManager = ____exports.SaveDataManager
SaveDataManager.name = "SaveDataManager"
function SaveDataManager.prototype.____constructor(self)
    self.SAVE_DIR = "saves"
    self:ensureSaveDirectory()
end
function SaveDataManager.getInstance(self)
    if not self.instance then
        self.instance = __TS__New(____exports.SaveDataManager)
    end
    return self.instance
end
function SaveDataManager.prototype.ensureSaveDirectory(self)
end
function SaveDataManager.prototype.saveBackpackData(self, playerId, benchPieces)
    return false
end
function SaveDataManager.prototype.loadBackpackData(self, playerId)
    return nil
end
function SaveDataManager.prototype.deleteBackpackData(self, playerId)
    return false
end
function SaveDataManager.prototype.hasSaveData(self, playerId)
    return false
end
____exports.saveDataManager = ____exports.SaveDataManager:getInstance()
return ____exports
