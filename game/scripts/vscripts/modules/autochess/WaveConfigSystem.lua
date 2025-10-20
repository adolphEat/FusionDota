local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local __TS__ArrayFilter = ____lualib.__TS__ArrayFilter
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 43,["11"] = 43,["12"] = 43,["14"] = 46,["15"] = 50,["16"] = 51,["17"] = 56,["18"] = 57,["19"] = 49,["20"] = 60,["21"] = 61,["22"] = 62,["24"] = 64,["25"] = 60,["26"] = 67,["27"] = 68,["28"] = 67,["29"] = 71,["30"] = 73,["31"] = 73,["32"] = 73,["33"] = 73,["34"] = 73,["35"] = 73,["36"] = 73,["37"] = 73,["38"] = 92,["39"] = 92,["40"] = 92,["41"] = 92,["42"] = 92,["43"] = 92,["44"] = 92,["45"] = 92,["46"] = 111,["47"] = 111,["48"] = 111,["49"] = 111,["50"] = 111,["51"] = 111,["52"] = 117,["53"] = 122,["54"] = 122,["55"] = 122,["56"] = 122,["57"] = 122,["58"] = 111,["59"] = 111,["60"] = 131,["61"] = 131,["62"] = 131,["63"] = 131,["64"] = 131,["65"] = 131,["66"] = 131,["67"] = 131,["68"] = 71,["69"] = 157,["70"] = 158,["71"] = 157,["72"] = 161,["73"] = 162,["74"] = 163,["75"] = 164,["77"] = 166,["78"] = 166,["79"] = 166,["80"] = 166,["81"] = 170,["82"] = 171,["83"] = 172,["86"] = 176,["87"] = 177,["88"] = 178,["89"] = 179,["90"] = 180,["92"] = 183,["93"] = 184,["94"] = 161,["95"] = 187,["96"] = 188,["97"] = 187,["98"] = 191,["99"] = 192,["100"] = 197,["101"] = 191,["102"] = 200,["103"] = 201,["104"] = 202,["105"] = 203,["107"] = 205,["108"] = 206,["109"] = 207,["111"] = 209,["112"] = 200});
local ____exports = {}
____exports.WaveConfigSystem = __TS__Class()
local WaveConfigSystem = ____exports.WaveConfigSystem
WaveConfigSystem.name = "WaveConfigSystem"
function WaveConfigSystem.prototype.____constructor(self)
    self.chessPieceDatabase = nil
    self.waveConfigs = __TS__New(Map)
    self.waveState = {currentWave = 0, lastWaveConfigId = nil, availableNextWaves = {}}
    self:initializeWaveConfigs()
    print("[WaveConfigSystem] Initialized")
end
function WaveConfigSystem.getInstance(self)
    if not ____exports.WaveConfigSystem.instance then
        ____exports.WaveConfigSystem.instance = __TS__New(____exports.WaveConfigSystem)
    end
    return ____exports.WaveConfigSystem.instance
end
function WaveConfigSystem.prototype.setChessPieceDatabase(self, database)
    self.chessPieceDatabase = database
end
function WaveConfigSystem.prototype.initializeWaveConfigs(self)
    self.waveConfigs:set("wave_1_basic", {
        id = "wave_1_basic",
        name = "基础训练",
        description = "第一波基础怪物",
        difficulty = 1,
        waveNumber = 1,
        monsterGroups = {{name = "小怪群", spawnDelay = 0, monsters = {{pieceId = "axe", count = 2, level = 1, position = "front"}, {pieceId = "crystal_maiden", count = 1, level = 1, position = "back"}}}}
    })
    self.waveConfigs:set("wave_2_swarm", {
        id = "wave_2_swarm",
        name = "数量压制",
        description = "以数量取胜的怪物群",
        difficulty = 3,
        waveNumber = 2,
        monsterGroups = {{name = "小怪群", spawnDelay = 0, monsters = {{pieceId = "axe", count = 4, level = 1, position = "front"}, {pieceId = "drow_ranger", count = 2, level = 1, position = "back"}}}}
    })
    self.waveConfigs:set("wave_2_elite", {
        id = "wave_2_elite",
        name = "精英挑战",
        description = "包含精英单位的怪物群",
        difficulty = 4,
        waveNumber = 2,
        monsterGroups = {{name = "精英小队", spawnDelay = 0, monsters = {{
            pieceId = "axe",
            count = 1,
            level = 3,
            position = "front",
            customStats = {healthMultiplier = 1.5, damageMultiplier = 1.2}
        }, {pieceId = "bounty_hunter", count = 1, level = 2, position = "front"}, {pieceId = "crystal_maiden", count = 1, level = 2, position = "back"}}}}
    })
    self.waveConfigs:set("wave_3_mixed", {
        id = "wave_3_mixed",
        name = "混合部队",
        description = "多种类型怪物的混合波次",
        difficulty = 5,
        waveNumber = 3,
        monsterGroups = {{name = "前排", spawnDelay = 0, monsters = {{pieceId = "axe", count = 2, level = 2, position = "front"}, {pieceId = "bounty_hunter", count = 1, level = 2, position = "front"}}}, {name = "后排", spawnDelay = 2, monsters = {{pieceId = "drow_ranger", count = 2, level = 2, position = "back"}}}}
    })
end
function WaveConfigSystem.prototype.getWaveConfig(self, id)
    return self.waveConfigs:get(id)
end
function WaveConfigSystem.prototype.startNewWave(self, waveNumber)
    local selectedWave = nil
    if waveNumber == 1 then
        selectedWave = self.waveConfigs:get("wave_1_basic") or nil
    else
        local availableWaves = __TS__ArrayFilter(
            __TS__ArrayFrom(self.waveConfigs:values()),
            function(____, wave) return wave.waveNumber == waveNumber and wave.id ~= self.waveState.lastWaveConfigId end
        )
        if #availableWaves > 0 then
            local randomIndex = RandomInt(0, #availableWaves - 1)
            selectedWave = availableWaves[randomIndex + 1]
        end
    end
    if selectedWave then
        self.waveState.currentWave = waveNumber
        self.waveState.lastWaveConfigId = selectedWave.id
        print(((((("[WaveConfigSystem] Selected wave " .. tostring(waveNumber)) .. ": ") .. selectedWave.name) .. " (") .. selectedWave.id) .. ")")
        return selectedWave
    end
    print("[WaveConfigSystem] No wave configuration found for wave number " .. tostring(waveNumber))
    return nil
end
function WaveConfigSystem.prototype.getCurrentWaveState(self)
    return self.waveState
end
function WaveConfigSystem.prototype.resetWaveState(self)
    self.waveState = {currentWave = 0, lastWaveConfigId = nil, availableNextWaves = {}}
    print("[WaveConfigSystem] Wave state reset.")
end
function WaveConfigSystem.prototype.getChessPieceDefinition(self, pieceId)
    if not self.chessPieceDatabase then
        print("[WaveConfigSystem] Error: ChessPieceDatabase not set.")
        return nil
    end
    local piece = self.chessPieceDatabase:get(pieceId)
    if not piece then
        print(("[WaveConfigSystem] Warning: Chess piece '" .. pieceId) .. "' not found in database.")
    end
    return piece or nil
end
return ____exports
