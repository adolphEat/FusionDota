local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__New = ____lualib.__TS__New
local __TS__ObjectEntries = ____lualib.__TS__ObjectEntries
local Error = ____lualib.Error
local RangeError = ____lualib.RangeError
local ReferenceError = ____lualib.ReferenceError
local SyntaxError = ____lualib.SyntaxError
local TypeError = ____lualib.TypeError
local URIError = ____lualib.URIError
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["15"] = 17,["16"] = 17,["17"] = 18,["18"] = 18,["19"] = 20,["20"] = 20,["21"] = 20,["22"] = 26,["23"] = 26,["24"] = 26,["26"] = 27,["27"] = 34,["28"] = 41,["29"] = 42,["30"] = 26,["31"] = 48,["32"] = 49,["33"] = 50,["35"] = 52,["36"] = 48,["37"] = 58,["38"] = 59,["39"] = 61,["40"] = 62,["41"] = 63,["42"] = 59,["43"] = 65,["44"] = 66,["45"] = 59,["46"] = 68,["47"] = 69,["48"] = 70,["49"] = 59,["50"] = 72,["51"] = 73,["52"] = 74,["54"] = 59,["55"] = 79,["56"] = 80,["57"] = 59,["58"] = 82,["59"] = 83,["60"] = 59,["61"] = 85,["62"] = 86,["63"] = 59,["64"] = 88,["67"] = 93,["71"] = 91,["72"] = 91,["74"] = 91,["81"] = 59,["82"] = 96,["85"] = 101,["89"] = 99,["90"] = 99,["92"] = 99,["99"] = 59,["100"] = 106,["101"] = 107,["102"] = 59,["103"] = 109,["104"] = 110,["105"] = 59,["106"] = 114,["107"] = 115,["108"] = 59,["109"] = 119,["110"] = 120,["111"] = 59,["112"] = 124,["113"] = 125,["114"] = 59,["115"] = 127,["116"] = 128,["117"] = 59,["118"] = 132,["119"] = 133,["120"] = 59,["121"] = 135,["122"] = 136,["123"] = 59,["124"] = 138,["125"] = 139,["126"] = 59,["127"] = 143,["128"] = 59,["129"] = 144,["130"] = 59,["131"] = 145,["132"] = 59,["133"] = 146,["134"] = 59,["135"] = 147,["136"] = 59,["137"] = 148,["138"] = 59,["139"] = 149,["140"] = 59,["141"] = 150,["142"] = 59,["143"] = 151,["144"] = 59,["145"] = 152,["146"] = 59,["147"] = 153,["148"] = 59,["149"] = 154,["150"] = 59,["151"] = 155,["152"] = 59,["153"] = 156,["154"] = 59,["155"] = 157,["156"] = 59,["157"] = 158,["158"] = 59,["159"] = 159,["160"] = 59,["161"] = 160,["162"] = 59,["163"] = 161,["164"] = 59,["165"] = 162,["166"] = 59,["167"] = 163,["168"] = 59,["169"] = 164,["170"] = 59,["171"] = 165,["172"] = 59,["173"] = 166,["174"] = 59,["175"] = 167,["176"] = 59,["177"] = 59,["178"] = 58,["179"] = 174,["180"] = 175,["183"] = 222,["184"] = 222,["185"] = 222,["186"] = 222,["187"] = 222,["188"] = 223,["189"] = 224,["190"] = 226,["193"] = 179,["194"] = 180,["195"] = 181,["197"] = 188,["198"] = 191,["199"] = 192,["200"] = 193,["202"] = 200,["203"] = 203,["204"] = 204,["206"] = 208,["207"] = 211,["208"] = 211,["209"] = 211,["210"] = 211,["211"] = 211,["212"] = 213,["213"] = 215,["219"] = 177,["222"] = 174,["223"] = 236,["224"] = 241,["225"] = 242,["226"] = 244,["227"] = 244,["228"] = 244,["229"] = 244,["230"] = 244,["231"] = 244,["232"] = 244,["233"] = 244,["234"] = 253,["235"] = 254,["236"] = 255,["238"] = 258,["239"] = 236,["240"] = 264,["241"] = 265,["242"] = 266,["244"] = 269,["245"] = 264,["246"] = 275,["249"] = 294,["252"] = 278,["253"] = 279,["255"] = 283,["256"] = 283,["257"] = 283,["258"] = 284,["261"] = 288,["264"] = 286,["265"] = 286,["278"] = 275,["279"] = 301,["280"] = 302,["281"] = 303,["283"] = 304,["284"] = 304,["285"] = 305,["286"] = 304,["290"] = 301,["291"] = 313,["294"] = 343,["297"] = 315,["298"] = 316,["299"] = 317,["301"] = 320,["302"] = 321,["303"] = 322,["305"] = 325,["306"] = 326,["307"] = 327,["309"] = 330,["310"] = 331,["312"] = 334,["313"] = 335,["315"] = 338,["316"] = 339,["323"] = 313,["324"] = 350,["327"] = 368,["330"] = 353,["331"] = 354,["333"] = 358,["334"] = 359,["336"] = 363,["337"] = 364,["344"] = 350,["345"] = 375,["346"] = 376,["347"] = 376,["348"] = 376,["349"] = 376,["350"] = 376,["351"] = 376,["352"] = 376,["353"] = 384,["354"] = 385,["355"] = 390,["356"] = 392,["357"] = 393,["358"] = 393,["359"] = 394,["361"] = 396,["362"] = 397,["363"] = 398,["364"] = 398,["368"] = 403,["369"] = 404,["370"] = 375,["371"] = 410,["372"] = 413,["373"] = 413,["375"] = 415,["376"] = 416,["377"] = 416,["378"] = 416,["380"] = 416,["382"] = 416,["383"] = 410,["384"] = 422,["385"] = 423,["386"] = 422,["387"] = 429,["388"] = 430,["389"] = 429,["390"] = 436,["391"] = 437,["392"] = 436,["393"] = 443,["394"] = 444,["395"] = 444,["396"] = 446,["397"] = 448,["399"] = 453,["400"] = 443,["401"] = 460,["402"] = 461,["403"] = 460,["404"] = 467,["405"] = 468,["406"] = 467,["407"] = 479,["408"] = 480,["409"] = 481,["411"] = 479,["412"] = 488,["413"] = 489,["414"] = 491,["415"] = 492,["416"] = 492,["417"] = 492,["418"] = 492,["420"] = 488,["421"] = 502,["422"] = 503,["423"] = 504,["424"] = 502,["425"] = 509});
local ____exports = {}
local ____UnitConfigManager = require("modules.UnitConfigManager")
local unitConfigManager = ____UnitConfigManager.unitConfigManager
local ____time_utils = require("utils.time_utils")
local getTimestampMs = ____time_utils.getTimestampMs
____exports.UnitFactory = __TS__Class()
local UnitFactory = ____exports.UnitFactory
UnitFactory.name = "UnitFactory"
function UnitFactory.prototype.____constructor(self, config)
    if config == nil then
        config = {}
    end
    self.config = __TS__ObjectAssign({enableLogging = true, enableErrorTracking = true, defaultTeam = DOTA_TEAM_NEUTRALS}, config)
    self.stats = {totalCreated = 0, successRate = 0, mostUsedConfigs = {}, averageCreationTime = 0}
    self:initializeAttributeMapping()
    self:log("UnitFactory initialized")
end
function UnitFactory.getInstance(self, config)
    if not ____exports.UnitFactory.instance then
        ____exports.UnitFactory.instance = __TS__New(____exports.UnitFactory, config)
    end
    return ____exports.UnitFactory.instance
end
function UnitFactory.prototype.initializeAttributeMapping(self)
    self.attributeMapping = {
        StatusHealth = function(____, unit, value)
            unit:SetMaxHealth(value)
            unit:SetHealth(value)
        end,
        StatusHealthRegen = function(____, unit, value)
            unit:SetBaseHealthRegen(value)
        end,
        StatusMana = function(____, unit, value)
            unit:SetMaxMana(value)
            unit:SetMana(value)
        end,
        StatusManaRegen = function(____, unit, value)
            if type(value) == "number" then
                unit:SetBaseManaRegen(value)
            end
        end,
        AttackDamageMin = function(____, unit, value)
            unit:SetBaseDamageMin(value)
        end,
        AttackDamageMax = function(____, unit, value)
            unit:SetBaseDamageMax(value)
        end,
        AttackRate = function(____, unit, value)
            unit:SetBaseAttackTime(value)
        end,
        AttackRange = function(____, unit, value)
            do
                local function ____catch(____error)
                    self:log("Warning: Could not set attack range: " .. tostring(____error))
                end
                local ____try, ____hasReturned = pcall(function()
                    local ____this_1
                    ____this_1 = unit
                    local ____opt_0 = ____this_1.SetAttackRange
                    if ____opt_0 ~= nil then
                        ____opt_0(____this_1, value)
                    end
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end,
        BaseAttackSpeed = function(____, unit, value)
            do
                local function ____catch(____error)
                    self:log("Warning: Could not set base attack speed: " .. tostring(____error))
                end
                local ____try, ____hasReturned = pcall(function()
                    local ____this_3
                    ____this_3 = unit
                    local ____opt_2 = ____this_3.SetBaseAttackSpeed
                    if ____opt_2 ~= nil then
                        ____opt_2(____this_3, value)
                    end
                end)
                if not ____try then
                    ____catch(____hasReturned)
                end
            end
        end,
        ArmorPhysical = function(____, unit, value)
            unit:SetPhysicalArmorBaseValue(value)
        end,
        MagicalResistance = function(____, unit, value)
            unit:SetBaseMagicalResistanceValue(value)
        end,
        MovementSpeed = function(____, unit, value)
            unit:SetBaseMoveSpeed(value)
        end,
        ModelScale = function(____, unit, value)
            unit:SetModelScale(value)
        end,
        VisionDaytimeRange = function(____, unit, value)
            unit:SetDayTimeVisionRange(value)
        end,
        VisionNighttimeRange = function(____, unit, value)
            unit:SetNightTimeVisionRange(value)
        end,
        BountyXP = function(____, unit, value)
            unit:SetDeathXP(value)
        end,
        BountyGoldMin = function(____, unit, value)
            unit:SetMinimumGoldBounty(value)
        end,
        BountyGoldMax = function(____, unit, value)
            unit:SetMaximumGoldBounty(value)
        end,
        Level = function()
        end,
        BaseClass = function()
        end,
        Model = function()
        end,
        Ability1 = function()
        end,
        Ability2 = function()
        end,
        Ability3 = function()
        end,
        Ability4 = function()
        end,
        Ability5 = function()
        end,
        Ability6 = function()
        end,
        Ability7 = function()
        end,
        Ability8 = function()
        end,
        SoundSet = function()
        end,
        GameSoundsFile = function()
        end,
        ProjectileModel = function()
        end,
        ProjectileSpeed = function()
        end,
        AttackAnimationPoint = function()
        end,
        AttackCapabilities = function()
        end,
        MovementCapabilities = function()
        end,
        MovementTurnRate = function()
        end,
        StatusStartingMana = function()
        end,
        UnitLabel = function()
        end,
        TeamName = function()
        end,
        CombatClassAttack = function()
        end,
        CombatClassDefend = function()
        end,
        UnitRelationshipClass = function()
        end
    }
end
function UnitFactory.prototype.createUnit(self, unitName, options)
    local startTime = getTimestampMs(nil)
    do
        local function ____catch(____error)
            self:updateStats(
                unitName,
                getTimestampMs(nil) - startTime,
                false
            )
            local errorMsg = (("Error creating unit " .. unitName) .. ": ") .. tostring(____error)
            self:logError(errorMsg)
            return true, {success = false, error = errorMsg}
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local config = unitConfigManager:getUnitConfig(unitName)
            if not config then
                return true, {success = false, error = "No configuration found for unit: " .. unitName}
            end
            local finalConfig = self:mergeConfigs(config, options.overrideConfig)
            local unit = self:createUnitInstance(unitName, finalConfig, options)
            if not unit then
                return true, {success = false, error = "Failed to create unit instance: " .. unitName}
            end
            self:applyUnitConfig(unit, finalConfig)
            if options.customStats then
                self:applyCustomStats(unit, options.customStats)
            end
            self:applyPostProcessing(unit, options)
            self:updateStats(
                unitName,
                getTimestampMs(nil) - startTime,
                true
            )
            self:log("Successfully created unit: " .. unitName)
            return true, {success = true, unit = unit, configUsed = finalConfig}
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function UnitFactory.prototype.createUnitInstance(self, unitName, config, options)
    local baseClass = config.BaseClass or unitName
    local team = options.team or self.config.defaultTeam
    local unit = CreateUnitByName(
        baseClass,
        options.position,
        true,
        options.owner,
        options.owner,
        team
    )
    if not unit or unit:IsNull() then
        self:logError("Failed to create unit with BaseClass: " .. baseClass)
        return nil
    end
    return unit
end
function UnitFactory.prototype.mergeConfigs(self, baseConfig, overrideConfig)
    if not overrideConfig then
        return __TS__ObjectAssign({}, baseConfig)
    end
    return __TS__ObjectAssign({}, baseConfig, overrideConfig)
end
function UnitFactory.prototype.applyUnitConfig(self, unit, config)
    do
        local function ____catch(____error)
            self:logError("Error applying unit config: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            if config.Level and config.Level > 1 then
                self:setUnitLevel(unit, config.Level)
            end
            for ____, ____value in ipairs(__TS__ObjectEntries(config)) do
                local key = ____value[1]
                local value = ____value[2]
                if value ~= nil and self.attributeMapping[key] ~= nil then
                    do
                        local function ____catch(____error)
                            self:log((("Warning: Failed to apply " .. key) .. ": ") .. tostring(____error))
                        end
                        local ____try, ____hasReturned = pcall(function()
                            local ____self_4 = self.attributeMapping
                            ____self_4[key](____self_4, unit, value)
                        end)
                        if not ____try then
                            ____catch(____hasReturned)
                        end
                    end
                end
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function UnitFactory.prototype.setUnitLevel(self, unit, level)
    if unit:IsHero() then
        local hero = unit
        do
            local i = 1
            while i < level do
                hero:HeroLevelUp(false)
                i = i + 1
            end
        end
    end
end
function UnitFactory.prototype.applyCustomStats(self, unit, stats)
    do
        local function ____catch(____error)
            self:logError("Error applying custom stats: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            if stats.health then
                unit:SetMaxHealth(stats.health)
                unit:SetHealth(stats.health)
            end
            if stats.mana then
                unit:SetMaxMana(stats.mana)
                unit:SetMana(stats.mana)
            end
            if stats.damage then
                unit:SetBaseDamageMin(stats.damage)
                unit:SetBaseDamageMax(stats.damage)
            end
            if stats.armor ~= nil then
                unit:SetPhysicalArmorBaseValue(stats.armor)
            end
            if stats.magicResistance ~= nil then
                unit:SetBaseMagicalResistanceValue(stats.magicResistance)
            end
            if stats.moveSpeed then
                unit:SetBaseMoveSpeed(stats.moveSpeed)
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function UnitFactory.prototype.applyPostProcessing(self, unit, options)
    do
        local function ____catch(____error)
            self:log("Warning: Post-processing failed: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            if options.aiTarget then
                unit:SetInitialGoalEntity(options.aiTarget)
            end
            if options.controllable ~= nil then
                unit:SetControllableByPlayer(0, options.controllable)
            end
            if options.invulnerable then
                unit:AddNewModifier(unit, nil, "modifier_invulnerable", {})
            end
        end)
        if not ____try then
            ____catch(____hasReturned)
        end
    end
end
function UnitFactory.prototype.createUnits(self, unitName, options)
    local result = {
        totalRequested = #options.positions,
        successCount = 0,
        failedCount = 0,
        units = {},
        errors = {}
    }
    for ____, position in ipairs(options.positions) do
        local unitOptions = __TS__ObjectAssign({}, options, {position = position})
        local createResult = self:createUnit(unitName, unitOptions)
        if createResult.success and createResult.unit then
            local ____result_units_5 = result.units
            ____result_units_5[#____result_units_5 + 1] = createResult.unit
            result.successCount = result.successCount + 1
        else
            result.failedCount = result.failedCount + 1
            if createResult.error then
                local ____result_errors_6 = result.errors
                ____result_errors_6[#____result_errors_6 + 1] = createResult.error
            end
        end
    end
    self:log(((("Batch creation completed: " .. tostring(result.successCount)) .. "/") .. tostring(result.totalRequested)) .. " units created")
    return result
end
function UnitFactory.prototype.quickCreate(self, unitName, position, team)
    if team == nil then
        team = DOTA_TEAM_NEUTRALS
    end
    local result = self:createUnit(unitName, {position = position, team = team})
    local ____result_success_7
    if result.success then
        ____result_success_7 = result.unit
    else
        ____result_success_7 = nil
    end
    return ____result_success_7
end
function UnitFactory.prototype.getAvailableUnits(self)
    return unitConfigManager:getAvailableUnits()
end
function UnitFactory.prototype.canCreateUnit(self, unitName)
    return unitConfigManager:hasConfig(unitName)
end
function UnitFactory.prototype.getUnitPreview(self, unitName)
    return unitConfigManager:getUnitConfig(unitName)
end
function UnitFactory.prototype.updateStats(self, unitName, creationTime, success)
    local ____self_stats_8, ____totalCreated_9 = self.stats, "totalCreated"
    ____self_stats_8[____totalCreated_9] = ____self_stats_8[____totalCreated_9] + 1
    if success then
        self.stats.averageCreationTime = (self.stats.averageCreationTime + creationTime) / 2
    end
    self.stats.successRate = (self.stats.successRate * (self.stats.totalCreated - 1) + (success and 1 or 0)) / self.stats.totalCreated
end
function UnitFactory.prototype.getStats(self)
    return __TS__ObjectAssign({}, self.stats)
end
function UnitFactory.prototype.resetStats(self)
    self.stats = {totalCreated = 0, successRate = 0, mostUsedConfigs = {}, averageCreationTime = 0}
end
function UnitFactory.prototype.log(self, message)
    if self.config.enableLogging then
        print("[UnitFactory] " .. message)
    end
end
function UnitFactory.prototype.logError(self, message)
    print("[UnitFactory ERROR] " .. message)
    if self.config.enableErrorTracking and GameRules.ErrorTracker then
        GameRules.ErrorTracker:trackError(
            __TS__New(Error, message),
            {module = "UnitFactory", ["function"] = "createUnit"}
        )
    end
end
function UnitFactory.prototype.cleanup(self)
    self:resetStats()
    self:log("UnitFactory cleaned up")
end
____exports.unitFactory = ____exports.UnitFactory:getInstance()
return ____exports
