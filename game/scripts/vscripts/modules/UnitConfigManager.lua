local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__New = ____lualib.__TS__New
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectValues = ____lualib.__TS__ObjectValues
local __TS__StringIncludes = ____lualib.__TS__StringIncludes
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["20"] = 13,["21"] = 13,["22"] = 15,["23"] = 15,["24"] = 15,["25"] = 21,["26"] = 21,["27"] = 21,["29"] = 17,["30"] = 22,["31"] = 30,["32"] = 37,["33"] = 21,["34"] = 43,["35"] = 44,["36"] = 45,["38"] = 47,["39"] = 43,["40"] = 53,["43"] = 63,["46"] = 55,["47"] = 57,["48"] = 58,["50"] = 61,["56"] = 53,["57"] = 70,["60"] = 109,["61"] = 110,["62"] = 112,["63"] = 112,["64"] = 113,["67"] = 72,["68"] = 75,["69"] = 77,["71"] = 78,["75"] = 82,["76"] = 83,["77"] = 84,["78"] = 85,["79"] = 86,["81"] = 87,["82"] = 87,["83"] = 87,["84"] = 87,["90"] = 93,["91"] = 96,["92"] = 96,["93"] = 96,["94"] = 96,["95"] = 96,["96"] = 96,["97"] = 103,["98"] = 104,["99"] = 106,["105"] = 71,["108"] = 70,["109"] = 120,["112"] = 143,["113"] = 144,["118"] = 130,["121"] = 127,["122"] = 128,["128"] = 126,["131"] = 134,["132"] = 135,["134"] = 139,["135"] = 140,["141"] = 121,["144"] = 120,["145"] = 151,["146"] = 152,["147"] = 153,["148"] = 153,["149"] = 153,["150"] = 153,["151"] = 153,["152"] = 153,["153"] = 153,["154"] = 153,["155"] = 153,["156"] = 153,["157"] = 153,["158"] = 152,["159"] = 166,["160"] = 166,["161"] = 166,["162"] = 166,["163"] = 166,["164"] = 166,["165"] = 166,["166"] = 166,["167"] = 166,["168"] = 166,["169"] = 166,["170"] = 166,["171"] = 152,["172"] = 151,["173"] = 186,["174"] = 187,["175"] = 193,["176"] = 193,["177"] = 193,["178"] = 195,["179"] = 196,["180"] = 196,["182"] = 200,["183"] = 201,["184"] = 201,["185"] = 202,["187"] = 205,["188"] = 206,["189"] = 206,["190"] = 207,["192"] = 211,["193"] = 212,["194"] = 213,["195"] = 213,["196"] = 214,["200"] = 219,["201"] = 186,["202"] = 225,["203"] = 228,["204"] = 230,["206"] = 225,["207"] = 237,["208"] = 238,["209"] = 239,["210"] = 240,["211"] = 241,["213"] = 245,["214"] = 237,["215"] = 251,["216"] = 252,["217"] = 251,["218"] = 258,["219"] = 259,["220"] = 258,["221"] = 265,["222"] = 266,["223"] = 265,["224"] = 272,["225"] = 273,["226"] = 272,["227"] = 279,["228"] = 280,["229"] = 281,["230"] = 279,["231"] = 287,["232"] = 288,["233"] = 289,["234"] = 287,["235"] = 295,["236"] = 296,["237"] = 297,["238"] = 298,["239"] = 299,["241"] = 301,["242"] = 295,["243"] = 307,["244"] = 308,["245"] = 308,["246"] = 308,["247"] = 308,["248"] = 308,["249"] = 315,["250"] = 316,["251"] = 317,["253"] = 320,["254"] = 307,["255"] = 326,["256"] = 327,["257"] = 328,["258"] = 330,["259"] = 331,["260"] = 331,["261"] = 331,["262"] = 331,["263"] = 332,["266"] = 336,["267"] = 326,["268"] = 342,["269"] = 343,["270"] = 342,["271"] = 349,["272"] = 350,["273"] = 351,["274"] = 352,["275"] = 349,["276"] = 357});
local ____exports = {}
local ____time_utils = require("utils.time_utils")
local getTimestampMs = ____time_utils.getTimestampMs
____exports.UnitConfigManager = __TS__Class()
local UnitConfigManager = ____exports.UnitConfigManager
UnitConfigManager.name = "UnitConfigManager"
function UnitConfigManager.prototype.____constructor(self, options)
    if options == nil then
        options = {}
    end
    self.configs = {}
    self.options = __TS__ObjectAssign({configPath = "../json/custom_units.json", enableHotReload = true, cacheConfigs = true, validateConfigs = true}, options)
    self.loadStatus = {loaded = false, configCount = 0, lastLoadTime = 0, loadErrors = {}}
    self:initialize()
end
function UnitConfigManager.getInstance(self, options)
    if not ____exports.UnitConfigManager.instance then
        ____exports.UnitConfigManager.instance = __TS__New(____exports.UnitConfigManager, options)
    end
    return ____exports.UnitConfigManager.instance
end
function UnitConfigManager.prototype.initialize(self)
    do
        local function ____catch(____error)
            print("[UnitConfigManager] Initialization failed: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            self:loadConfigs()
            if self.options.enableHotReload then
                self:setupHotReload()
            end
            print(("[UnitConfigManager] Initialized with " .. tostring(self:getConfigCount())) .. " configurations")
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function UnitConfigManager.prototype.loadConfigs(self)
    do
        local function ____catch(____error)
            local errorMsg = "Failed to load configs: " .. tostring(____error)
            print("[UnitConfigManager] " .. errorMsg)
            local ____self_loadStatus_loadErrors_0 = self.loadStatus.loadErrors
            ____self_loadStatus_loadErrors_0[#____self_loadStatus_loadErrors_0 + 1] = errorMsg
            return true, false
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local startTime = getTimestampMs(nil)
            local configData = self:loadConfigFile()
            if not configData then
                error(
                    __TS__New(Error, "Failed to load config file"),
                    0
                )
            end
            if self.options.validateConfigs then
                local validation = self:validateConfigs(configData)
                if not validation.isValid then
                    print("[UnitConfigManager] Config validation warnings: " .. table.concat(validation.warnings, ", "))
                    if #validation.errors > 0 then
                        error(
                            __TS__New(
                                Error,
                                "Config validation errors: " .. table.concat(validation.errors, ", ")
                            ),
                            0
                        )
                    end
                end
            end
            self.configs = configData
            self.loadStatus = {
                loaded = true,
                configCount = #__TS__ObjectKeys(self.configs),
                lastLoadTime = getTimestampMs(nil),
                loadErrors = {}
            }
            local loadTime = getTimestampMs(nil) - startTime
            print(((("[UnitConfigManager] Loaded " .. tostring(self.loadStatus.configCount)) .. " configurations in ") .. tostring(loadTime)) .. "ms")
            return true, true
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function UnitConfigManager.prototype.loadConfigFile(self)
    do
        local function ____catch(____error)
            print("[UnitConfigManager] Error loading config file: " .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            do
                local function ____catch(requireError)
                    print("[UnitConfigManager] Direct require failed: " .. tostring(requireError))
                end
                local ____try, ____hasReturned, ____returnValue = pcall(function()
                    local customUnits = require(self.options.configPath)
                    return true, customUnits
                end)
                if not ____try then
                    ____hasReturned, ____returnValue = ____catch(____hasReturned)
                end
                if ____hasReturned then
                    return true, ____returnValue
                end
            end
            if _G.UNIT_CONFIGS then
                return true, _G.UNIT_CONFIGS
            end
            print("[UnitConfigManager] Using fallback default configurations")
            return true, self:getDefaultConfigs()
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function UnitConfigManager.prototype.getDefaultConfigs(self)
    return {default_unit = {
        BaseClass = "npc_dota_creature",
        Level = 1,
        StatusHealth = 500,
        StatusMana = 100,
        AttackDamageMin = 50,
        AttackDamageMax = 60,
        ArmorPhysical = 2,
        MagicalResistance = 25,
        MovementSpeed = 300,
        AttackRange = 128,
        ModelScale = 1
    }, training_dummy = {
        BaseClass = "npc_dota_training_dummy",
        Level = 1,
        StatusHealth = 10000,
        StatusMana = 0,
        AttackDamageMin = 0,
        AttackDamageMax = 0,
        ArmorPhysical = 0,
        MagicalResistance = 0,
        MovementSpeed = 0,
        AttackRange = 0,
        ModelScale = 1,
        AttackCapabilities = "DOTA_UNIT_CAP_NO_ATTACK"
    }}
end
function UnitConfigManager.prototype.validateConfigs(self, configs)
    local result = {isValid = true, errors = {}, warnings = {}}
    for ____, ____value in ipairs(__TS__ObjectEntries(configs)) do
        local unitName = ____value[1]
        local config = ____value[2]
        if not config.BaseClass and not __TS__StringStartsWith(unitName, "npc_") then
            local ____result_warnings_1 = result.warnings
            ____result_warnings_1[#____result_warnings_1 + 1] = ("Unit '" .. unitName) .. "' has no BaseClass and doesn't follow npc_ naming convention"
        end
        if config.StatusHealth ~= nil and config.StatusHealth <= 0 then
            local ____result_errors_2 = result.errors
            ____result_errors_2[#____result_errors_2 + 1] = (("Unit '" .. unitName) .. "' has invalid health: ") .. tostring(config.StatusHealth)
            result.isValid = false
        end
        if config.MovementSpeed ~= nil and config.MovementSpeed < 0 then
            local ____result_errors_3 = result.errors
            ____result_errors_3[#____result_errors_3 + 1] = (("Unit '" .. unitName) .. "' has invalid movement speed: ") .. tostring(config.MovementSpeed)
            result.isValid = false
        end
        if config.AttackDamageMin ~= nil and config.AttackDamageMax ~= nil then
            if config.AttackDamageMin > config.AttackDamageMax then
                local ____result_errors_4 = result.errors
                ____result_errors_4[#____result_errors_4 + 1] = ("Unit '" .. unitName) .. "' has min damage > max damage"
                result.isValid = false
            end
        end
    end
    return result
end
function UnitConfigManager.prototype.setupHotReload(self)
    if self.options.enableHotReload then
        print("[UnitConfigManager] Hot reload enabled - use debug command to reload configs")
    end
end
function UnitConfigManager.prototype.getUnitConfig(self, unitName)
    local config = self.configs[unitName]
    if not config then
        print("[UnitConfigManager] No configuration found for unit: " .. unitName)
        return nil
    end
    return __TS__ObjectAssign({}, config)
end
function UnitConfigManager.prototype.getAvailableUnits(self)
    return __TS__ObjectKeys(self.configs)
end
function UnitConfigManager.prototype.hasConfig(self, unitName)
    return self.configs[unitName] ~= nil
end
function UnitConfigManager.prototype.getConfigCount(self)
    return #__TS__ObjectKeys(self.configs)
end
function UnitConfigManager.prototype.getLoadStatus(self)
    return __TS__ObjectAssign({}, self.loadStatus)
end
function UnitConfigManager.prototype.reloadConfigs(self)
    print("[UnitConfigManager] Reloading configurations...")
    return self:loadConfigs()
end
function UnitConfigManager.prototype.setUnitConfig(self, unitName, config)
    self.configs[unitName] = __TS__ObjectAssign({}, config)
    print("[UnitConfigManager] Updated configuration for unit: " .. unitName)
end
function UnitConfigManager.prototype.removeUnitConfig(self, unitName)
    if self:hasConfig(unitName) then
        __TS__Delete(self.configs, unitName)
        print("[UnitConfigManager] Removed configuration for unit: " .. unitName)
        return true
    end
    return false
end
function UnitConfigManager.prototype.getConfigStats(self)
    local stats = {
        totalConfigs = self:getConfigCount(),
        loadStatus = self:getLoadStatus(),
        configTypes = {}
    }
    for ____, config in ipairs(__TS__ObjectValues(self.configs)) do
        local baseClass = config.BaseClass or "unknown"
        stats.configTypes[baseClass] = (stats.configTypes[baseClass] or 0) + 1
    end
    return stats
end
function UnitConfigManager.prototype.searchConfigs(self, searchTerm)
    local results = {}
    local term = string.lower(searchTerm)
    for ____, unitName in ipairs(__TS__ObjectKeys(self.configs)) do
        if __TS__StringIncludes(
            string.lower(unitName),
            term
        ) then
            results[#results + 1] = unitName
        end
    end
    return results
end
function UnitConfigManager.prototype.exportConfigs(self)
    return __TS__ObjectAssign({}, self.configs)
end
function UnitConfigManager.prototype.cleanup(self)
    self.configs = {}
    self.loadStatus.loaded = false
    print("[UnitConfigManager] Cleaned up resources")
end
____exports.unitConfigManager = ____exports.UnitConfigManager:getInstance()
return ____exports
