local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 25,["8"] = 25,["9"] = 25,["11"] = 27,["12"] = 30,["13"] = 29,["14"] = 33,["15"] = 34,["16"] = 35,["18"] = 37,["19"] = 33,["20"] = 43,["23"] = 53,["26"] = 47,["27"] = 48,["28"] = 49,["29"] = 50,["36"] = 43,["37"] = 60,["40"] = 83,["41"] = 84,["44"] = 62,["45"] = 62,["46"] = 62,["47"] = 62,["48"] = 62,["49"] = 68,["50"] = 69,["51"] = 72,["52"] = 73,["53"] = 74,["54"] = 75,["55"] = 76,["56"] = 77,["58"] = 79,["59"] = 80,["66"] = 61,["69"] = 60,["70"] = 91,["73"] = 119,["74"] = 120,["77"] = 93,["78"] = 94,["79"] = 96,["80"] = 97,["81"] = 98,["82"] = 100,["83"] = 101,["84"] = 102,["85"] = 103,["86"] = 104,["87"] = 105,["89"] = 107,["90"] = 108,["93"] = 111,["94"] = 112,["97"] = 115,["98"] = 116,["105"] = 92,["108"] = 91,["109"] = 127,["112"] = 139,["113"] = 140,["116"] = 129,["117"] = 130,["118"] = 131,["119"] = 132,["120"] = 133,["122"] = 135,["123"] = 136,["130"] = 128,["133"] = 127,["134"] = 147,["135"] = 148,["136"] = 149,["137"] = 150,["138"] = 151,["139"] = 152,["141"] = 154,["142"] = 147,["143"] = 158});
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
    do
        local function ____catch(____error)
            print("[SaveDataManager] ⚠️ 无法访问存档目录，尝试创建: " .. self.SAVE_DIR)
        end
        local ____try, ____hasReturned = pcall(function()
            local testFile = io.open(self.SAVE_DIR .. "/test.txt", "w")
            if testFile then
                testFile:close()
                os.remove(self.SAVE_DIR .. "/test.txt")
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function SaveDataManager.prototype.saveBackpackData(self, playerId, benchPieces)
    do
        local function ____catch(____error)
            print("[SaveDataManager] ❌ 保存失败: " .. tostring(____error))
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local saveData = {
                playerId = playerId,
                benchPieces = benchPieces,
                timestamp = Date:now()
            }
            local jsonData = json.encode(saveData)
            local filePath = ((self.SAVE_DIR .. "/player_") .. tostring(playerId)) .. "_backpack.json"
            local file = io.open(filePath, "w")
            if file then
                file:write(jsonData)
                file:close()
                print(((("[SaveDataManager] 💾 保存成功: " .. filePath) .. " (") .. tostring(#benchPieces)) .. " 个棋子)")
                return true, true
            else
                print("[SaveDataManager] ❌ 无法打开文件: " .. filePath)
                return true, false
            end
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function SaveDataManager.prototype.loadBackpackData(self, playerId)
    do
        local function ____catch(____error)
            print("[SaveDataManager] ⚠️ 加载失败: " .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local filePath = ((self.SAVE_DIR .. "/player_") .. tostring(playerId)) .. "_backpack.json"
            local file = io.open(filePath, "r")
            if file then
                local jsonData = file:read("*a")
                file:close()
                if jsonData and #jsonData > 0 then
                    local saveData = json.decode(jsonData)
                    if saveData and saveData.benchPieces then
                        local typedData = saveData
                        print(((("[SaveDataManager] 📂 加载成功: " .. filePath) .. " (") .. tostring(#typedData.benchPieces)) .. " 个棋子)")
                        return true, typedData.benchPieces
                    else
                        print("[SaveDataManager] ⚠️ 数据格式错误: " .. filePath)
                        return true, nil
                    end
                else
                    print("[SaveDataManager] ⚠️ 文件为空: " .. filePath)
                    return true, nil
                end
            else
                print("[SaveDataManager] ℹ️ 存档文件不存在: " .. filePath)
                return true, nil
            end
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function SaveDataManager.prototype.deleteBackpackData(self, playerId)
    do
        local function ____catch(____error)
            print("[SaveDataManager] ⚠️ 删除失败: " .. tostring(____error))
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local filePath = ((self.SAVE_DIR .. "/player_") .. tostring(playerId)) .. "_backpack.json"
            local success = {os.remove(filePath)}
            if success then
                print("[SaveDataManager] 🗑️ 已删除存档: " .. filePath)
                return true, true
            else
                print("[SaveDataManager] ⚠️ 删除失败（文件可能不存在）: " .. filePath)
                return true, false
            end
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function SaveDataManager.prototype.hasSaveData(self, playerId)
    local filePath = ((self.SAVE_DIR .. "/player_") .. tostring(playerId)) .. "_backpack.json"
    local file = io.open(filePath, "r")
    if file then
        file:close()
        return true
    end
    return false
end
____exports.saveDataManager = ____exports.SaveDataManager:getInstance()
return ____exports
