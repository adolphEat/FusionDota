local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__NumberToFixed = ____lualib.__TS__NumberToFixed
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__ArrayIndexOf = ____lualib.__TS__ArrayIndexOf
local __TS__ArraySplice = ____lualib.__TS__ArraySplice
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["12"] = 6,["13"] = 6,["14"] = 41,["15"] = 41,["16"] = 41,["18"] = 44,["19"] = 45,["20"] = 46,["21"] = 47,["22"] = 50,["23"] = 51,["24"] = 52,["25"] = 49,["26"] = 55,["27"] = 56,["28"] = 57,["30"] = 59,["31"] = 55,["32"] = 65,["33"] = 66,["34"] = 67,["37"] = 71,["38"] = 72,["39"] = 73,["42"] = 77,["43"] = 78,["44"] = 79,["45"] = 81,["46"] = 84,["47"] = 65,["48"] = 90,["49"] = 91,["52"] = 95,["53"] = 96,["54"] = 97,["55"] = 99,["56"] = 102,["57"] = 90,["58"] = 108,["59"] = 109,["60"] = 110,["61"] = 111,["62"] = 112,["64"] = 116,["65"] = 118,["66"] = 119,["67"] = 122,["68"] = 123,["70"] = 127,["71"] = 129,["72"] = 132,["73"] = 137,["74"] = 108,["75"] = 143,["76"] = 144,["79"] = 148,["80"] = 149,["81"] = 152,["82"] = 155,["83"] = 157,["84"] = 160,["85"] = 166,["86"] = 167,["87"] = 143,["88"] = 173,["89"] = 174,["90"] = 175,["92"] = 177,["93"] = 177,["94"] = 178,["95"] = 178,["96"] = 178,["97"] = 178,["98"] = 178,["99"] = 184,["100"] = 189,["101"] = 190,["102"] = 190,["104"] = 177,["108"] = 195,["109"] = 173,["110"] = 201,["111"] = 201,["112"] = 201,["116"] = 236,["117"] = 237,["120"] = 203,["121"] = 203,["122"] = 203,["123"] = 203,["124"] = 203,["125"] = 203,["126"] = 203,["127"] = 203,["128"] = 212,["129"] = 213,["130"] = 214,["132"] = 218,["133"] = 219,["135"] = 220,["136"] = 220,["137"] = 221,["138"] = 220,["143"] = 227,["144"] = 228,["146"] = 232,["147"] = 234,["153"] = 202,["156"] = 201,["157"] = 244,["160"] = 273,["163"] = 246,["164"] = 247,["165"] = 248,["167"] = 251,["168"] = 252,["170"] = 255,["171"] = 256,["172"] = 257,["174"] = 260,["175"] = 261,["177"] = 264,["178"] = 265,["180"] = 268,["181"] = 269,["188"] = 244,["189"] = 280,["190"] = 281,["191"] = 282,["192"] = 283,["195"] = 286,["196"] = 280,["197"] = 292,["198"] = 293,["199"] = 294,["200"] = 295,["201"] = 296,["202"] = 296,["203"] = 296,["204"] = 296,["205"] = 296,["207"] = 304,["208"] = 292,["209"] = 310,["210"] = 311,["211"] = 312,["212"] = 313,["214"] = 315,["215"] = 310,["216"] = 321,["217"] = 323,["218"] = 324,["220"] = 327,["221"] = 328,["223"] = 331,["224"] = 332,["226"] = 336,["227"] = 337,["229"] = 321,["230"] = 344,["231"] = 346,["233"] = 347,["234"] = 347,["235"] = 348,["236"] = 349,["238"] = 347,["241"] = 344,["242"] = 357,["243"] = 359,["244"] = 360,["245"] = 361,["247"] = 357,["248"] = 368,["249"] = 368,["250"] = 375,["251"] = 376,["252"] = 377,["255"] = 379,["256"] = 380,["257"] = 380,["258"] = 380,["259"] = 380,["260"] = 380,["261"] = 380,["262"] = 387,["263"] = 388,["264"] = 388,["265"] = 388,["266"] = 388,["267"] = 388,["268"] = 388,["269"] = 388,["270"] = 388,["271"] = 397,["272"] = 398,["273"] = 398,["276"] = 375,["277"] = 406,["278"] = 407,["279"] = 408,["281"] = 406,["282"] = 417,["283"] = 418,["284"] = 417,["285"] = 424,["286"] = 425,["287"] = 425,["288"] = 425,["289"] = 425,["290"] = 425,["291"] = 426,["292"] = 426,["293"] = 426,["294"] = 426,["295"] = 426,["296"] = 424,["297"] = 432,["298"] = 432,["299"] = 440,["300"] = 441,["301"] = 443,["302"] = 444,["304"] = 440,["305"] = 451,["306"] = 453,["307"] = 454,["308"] = 455,["310"] = 459,["311"] = 460,["313"] = 464,["314"] = 464,["315"] = 464,["316"] = 464,["317"] = 464,["318"] = 464,["319"] = 464,["320"] = 451,["321"] = 473,["322"] = 474,["325"] = 476,["326"] = 477,["327"] = 479,["328"] = 482,["329"] = 489,["330"] = 490,["332"] = 493,["333"] = 494,["334"] = 473,["335"] = 500,["336"] = 501,["337"] = 502,["338"] = 503,["339"] = 505,["340"] = 507,["341"] = 507,["342"] = 507,["343"] = 508,["344"] = 509,["345"] = 507,["346"] = 507,["349"] = 500,["350"] = 518,["351"] = 520,["352"] = 520,["353"] = 520,["354"] = 521,["355"] = 522,["356"] = 523,["358"] = 525,["359"] = 520,["360"] = 520,["361"] = 518,["362"] = 532,["363"] = 533,["364"] = 534,["366"] = 535,["367"] = 536,["368"] = 537,["369"] = 538,["370"] = 539,["371"] = 539,["372"] = 539,["374"] = 539,["378"] = 534,["379"] = 534,["380"] = 534,["381"] = 534,["382"] = 534,["383"] = 534,["384"] = 534,["385"] = 534,["386"] = 534,["387"] = 534,["390"] = 532,["391"] = 548,["392"] = 549,["393"] = 549,["394"] = 549,["395"] = 549,["396"] = 549,["397"] = 549,["398"] = 549,["399"] = 549,["400"] = 549,["401"] = 548,["402"] = 563,["403"] = 565,["404"] = 566,["405"] = 566,["406"] = 566,["407"] = 566,["408"] = 566,["409"] = 565,["410"] = 603,["411"] = 563,["412"] = 609,["413"] = 610,["414"] = 612,["415"] = 613,["417"] = 616,["418"] = 609,["419"] = 622,["420"] = 624,["421"] = 625,["422"] = 626,["423"] = 627,["424"] = 628,["425"] = 628,["426"] = 628,["428"] = 628,["430"] = 623,["431"] = 623,["432"] = 623,["433"] = 623,["434"] = 623,["435"] = 623,["436"] = 623,["437"] = 622});
local ____exports = {}
local ____GameModeManager = require("modules.GameModeManager")
local GameModeManager = ____GameModeManager.GameModeManager
____exports.TrainingMode = __TS__Class()
local TrainingMode = ____exports.TrainingMode
TrainingMode.name = "TrainingMode"
function TrainingMode.prototype.____constructor(self)
    self.activeScenario = nil
    self.spawnedUnits = {}
    self.testStartTime = 0
    self.isActive = false
    self.settings = self:getDefaultSettings()
    self:initializeTrainingMode()
    print("[TrainingMode] Initialized")
end
function TrainingMode.getInstance(self)
    if not ____exports.TrainingMode.instance then
        ____exports.TrainingMode.instance = __TS__New(____exports.TrainingMode)
    end
    return ____exports.TrainingMode.instance
end
function TrainingMode.prototype.activate(self)
    if self.isActive then
        print("[TrainingMode] Already active")
        return
    end
    local gameModeManager = GameModeManager:getInstance()
    if not gameModeManager:isTrainingMode() then
        print("[TrainingMode] Game is not in training mode")
        return
    end
    self.isActive = true
    self:setupTrainingEnvironment()
    self:registerEvents()
    print("[TrainingMode] Activated")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.deactivate(self)
    if not self.isActive then
        return
    end
    self.isActive = false
    self:cleanupSpawnedUnits()
    self:unregisterEvents()
    print("[TrainingMode] Deactivated")
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.startTestScenario(self, scenarioId)
    local scenario = self:getTestScenario(scenarioId)
    if not scenario then
        print("[TrainingMode] Unknown test scenario: " .. scenarioId)
        return false
    end
    self:stopCurrentTest()
    self.activeScenario = scenario
    self.testStartTime = GameRules:GetGameTime()
    if scenario.environment then
        self:setupTestEnvironment(scenario.environment)
    end
    self:spawnTestMonsters(scenario.monsters)
    print("[TrainingMode] Started test scenario: " .. scenario.name)
    CustomGameEventManager:Send_ServerToAllClients("training_scenario_started", {scenario = scenario, startTime = self.testStartTime})
    return true
end
function TrainingMode.prototype.stopCurrentTest(self)
    if not self.activeScenario then
        return
    end
    local scenario = self.activeScenario
    local duration = GameRules:GetGameTime() - self.testStartTime
    self:cleanupSpawnedUnits()
    self:resetTestEnvironment()
    print(((("[TrainingMode] Stopped test scenario: " .. scenario.name) .. " (Duration: ") .. __TS__NumberToFixed(duration, 1)) .. "s)")
    CustomGameEventManager:Send_ServerToAllClients("training_scenario_stopped", {scenario = scenario, duration = duration, completed = false})
    self.activeScenario = nil
    self.testStartTime = 0
end
function TrainingMode.prototype.spawnTestMonsters(self, monsters)
    for ____, monsterData in ipairs(monsters) do
        local position = monsterData.position or self:getRandomSpawnPosition()
        do
            local i = 0
            while i < monsterData.count do
                local spawnPos = Vector(
                    position.x + RandomFloat(-200, 200),
                    position.y + RandomFloat(-200, 200),
                    position.z
                )
                local unit = self:spawnMonster(monsterData.unitName, spawnPos, {level = monsterData.level or 1, customStats = monsterData.customStats})
                if unit then
                    local ____self_spawnedUnits_0 = self.spawnedUnits
                    ____self_spawnedUnits_0[#____self_spawnedUnits_0 + 1] = unit
                end
                i = i + 1
            end
        end
    end
    print(("[TrainingMode] Spawned " .. tostring(#self.spawnedUnits)) .. " test units")
end
function TrainingMode.prototype.spawnMonster(self, unitName, position, options)
    if options == nil then
        options = {}
    end
    do
        local function ____catch(____error)
            print((("[TrainingMode] Error spawning unit " .. unitName) .. ": ") .. tostring(____error))
            return true, nil
        end
        local ____try, ____hasReturned, ____returnValue = pcall(function()
            local unit = CreateUnitByName(
                unitName,
                position,
                true,
                nil,
                nil,
                DOTA_TEAM_BADGUYS
            )
            if not unit or unit:IsNull() then
                print("[TrainingMode] Failed to spawn unit: " .. unitName)
                return true, nil
            end
            if options.level and options.level > 1 then
                if unit:IsHero() then
                    do
                        local i = 1
                        while i < options.level do
                            unit:HeroLevelUp(false)
                            i = i + 1
                        end
                    end
                end
            end
            if options.customStats then
                self:applyCustomStats(unit, options.customStats)
            end
            unit:SetInitialGoalEntity(self:getPlayerHero())
            return true, unit
        end)
        if not ____try then
            ____hasReturned, ____returnValue = ____catch(____hasReturned)
        end
        if ____hasReturned then
            return ____returnValue
        end
    end
end
function TrainingMode.prototype.applyCustomStats(self, unit, stats)
    do
        local function ____catch(____error)
            print("[TrainingMode] Error applying custom stats: " .. tostring(____error))
        end
        local ____try, ____hasReturned = pcall(function()
            if stats.health then
                unit:SetMaxHealth(stats.health)
                unit:SetHealth(stats.health)
            end
            if stats.mana then
                unit:SetMana(stats.mana)
            end
            if stats.damage then
                unit:SetBaseDamageMin(stats.damage)
                unit:SetBaseDamageMax(stats.damage)
            end
            if stats.armor then
                unit:SetPhysicalArmorBaseValue(stats.armor)
            end
            if stats.magicResistance then
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
function TrainingMode.prototype.cleanupSpawnedUnits(self)
    for ____, unit in ipairs(self.spawnedUnits) do
        if unit and not unit:IsNull() then
            unit:RemoveSelf()
        end
    end
    self.spawnedUnits = {}
end
function TrainingMode.prototype.getRandomSpawnPosition(self)
    local hero = self:getPlayerHero()
    if hero then
        local heroPos = hero:GetAbsOrigin()
        return Vector(
            heroPos.x + RandomFloat(-800, 800),
            heroPos.y + RandomFloat(-800, 800),
            heroPos.z
        )
    end
    return Vector(0, 0, 256)
end
function TrainingMode.prototype.getPlayerHero(self)
    local player = PlayerResource:GetPlayer(0)
    if player then
        return player:GetAssignedHero()
    end
    return nil
end
function TrainingMode.prototype.setupTrainingEnvironment(self)
    if self.settings.infiniteResources then
        self:enableInfiniteResources()
    end
    if self.settings.noCooldowns then
        self:enableNoCooldowns()
    end
    if self.settings.autoRespawn then
        self:enableAutoRespawn()
    end
    if self.settings.enableTargetDummies then
        self:spawnTargetDummies()
    end
end
function TrainingMode.prototype.enableInfiniteResources(self)
    local playerCount = PlayerResource:GetPlayerCount()
    do
        local playerId = 0
        while playerId < playerCount do
            if PlayerResource:IsValidPlayer(playerId) then
                PlayerResource:SetGold(playerId, 99999, true)
            end
            playerId = playerId + 1
        end
    end
end
function TrainingMode.prototype.enableNoCooldowns(self)
    local hero = self:getPlayerHero()
    if hero then
        hero:AddNewModifier(hero, nil, "modifier_dummy_no_cooldown", {})
    end
end
function TrainingMode.prototype.enableAutoRespawn(self)
end
function TrainingMode.prototype.spawnTargetDummies(self)
    local hero = self:getPlayerHero()
    if not hero then
        return
    end
    local heroPos = hero:GetAbsOrigin()
    local positions = {
        Vector(heroPos.x + 500, heroPos.y, heroPos.z),
        Vector(heroPos.x - 500, heroPos.y, heroPos.z),
        Vector(heroPos.x, heroPos.y + 500, heroPos.z),
        Vector(heroPos.x, heroPos.y - 500, heroPos.z)
    }
    for ____, pos in ipairs(positions) do
        local dummy = CreateUnitByName(
            "npc_dota_training_dummy",
            pos,
            true,
            nil,
            nil,
            DOTA_TEAM_NEUTRALS
        )
        if dummy then
            local ____self_spawnedUnits_1 = self.spawnedUnits
            ____self_spawnedUnits_1[#____self_spawnedUnits_1 + 1] = dummy
        end
    end
end
function TrainingMode.prototype.setupTestEnvironment(self, environment)
    if environment.timeOfDay ~= nil then
        GameRules:SetTimeOfDay(environment.timeOfDay)
    end
end
function TrainingMode.prototype.resetTestEnvironment(self)
    GameRules:SetTimeOfDay(0.25)
end
function TrainingMode.prototype.registerEvents(self)
    ListenToGameEvent(
        "entity_killed",
        function(____, event) return self:onEntityKilled(event) end,
        self
    )
    ListenToGameEvent(
        "dota_player_killed",
        function(____, event) return self:onPlayerKilled(event) end,
        self
    )
end
function TrainingMode.prototype.unregisterEvents(self)
end
function TrainingMode.prototype.onEntityKilled(self, event)
    local killedUnit = EntIndexToHScript(event.entindex_killed)
    if __TS__ArrayIncludes(self.spawnedUnits, killedUnit) then
        self:onTestUnitKilled(killedUnit)
    end
end
function TrainingMode.prototype.onTestUnitKilled(self, unit)
    local index = __TS__ArrayIndexOf(self.spawnedUnits, unit)
    if index > -1 then
        __TS__ArraySplice(self.spawnedUnits, index, 1)
    end
    if self.activeScenario and #self.spawnedUnits == 0 then
        self:onTestScenarioCompleted()
    end
    CustomGameEventManager:Send_ServerToAllClients(
        "training_unit_killed",
        {
            unitName = unit:GetUnitName(),
            remainingUnits = #self.spawnedUnits
        }
    )
end
function TrainingMode.prototype.onTestScenarioCompleted(self)
    if not self.activeScenario then
        return
    end
    local duration = GameRules:GetGameTime() - self.testStartTime
    local scenario = self.activeScenario
    print(((("[TrainingMode] Test scenario completed: " .. scenario.name) .. " in ") .. __TS__NumberToFixed(duration, 1)) .. "s")
    CustomGameEventManager:Send_ServerToAllClients("training_scenario_completed", {scenario = scenario, duration = duration, success = true})
    if self.settings.pauseAfterKill then
        SendToServerConsole("dota_pause")
    end
    self.activeScenario = nil
    self.testStartTime = 0
end
function TrainingMode.prototype.onPlayerKilled(self, event)
    if self.settings.autoRespawn then
        local playerId = event.PlayerID
        local hero = PlayerResource:GetSelectedHeroEntity(playerId)
        if hero then
            Timers:CreateTimer(
                1,
                function()
                    hero:RespawnHero(false, false)
                    return nil
                end
            )
        end
    end
end
function TrainingMode.prototype.initializeTrainingMode(self)
    Timers:CreateTimer(
        1,
        function()
            local gameModeManager = GameModeManager:getInstance()
            if gameModeManager:isTrainingMode() then
                self:activate()
            end
            return nil
        end
    )
end
function TrainingMode.prototype.syncStatusToNetTable(self)
    if GameRules.XNetTable then
        local ____self_7 = GameRules.XNetTable
        local ____self_7_SetTableValue_8 = ____self_7.SetTableValue
        local ____self_isActive_3 = self.isActive
        local ____self_settings_4 = self.settings
        local ____self_activeScenario_5 = self.activeScenario
        local ____temp_6 = #self.spawnedUnits
        local ____table_activeScenario_2
        if self.activeScenario then
            ____table_activeScenario_2 = GameRules:GetGameTime() - self.testStartTime
        else
            ____table_activeScenario_2 = 0
        end
        ____self_7_SetTableValue_8(
            ____self_7,
            "training_mode",
            "status",
            {
                isActive = ____self_isActive_3,
                settings = ____self_settings_4,
                activeScenario = ____self_activeScenario_5,
                spawnedUnitsCount = ____temp_6,
                testDuration = ____table_activeScenario_2,
                timestamp = Date:now()
            }
        )
    end
end
function TrainingMode.prototype.getDefaultSettings(self)
    return {
        autoRespawn = true,
        infiniteResources = true,
        noCooldowns = false,
        fastLevelUp = true,
        showDamageNumbers = true,
        pauseAfterKill = false,
        enableTargetDummies = true
    }
end
function TrainingMode.prototype.getTestScenario(self, scenarioId)
    local scenarios = {basic_combat = {
        id = "basic_combat",
        name = "基础战斗测试",
        description = "生成几个基础怪物进行战斗测试",
        monsters = {{unitName = "npc_dota_neutral_kobold", count = 3, level = 1}},
        objectives = {{type = "kill_all", description = "击杀所有怪物"}}
    }, damage_test = {id = "damage_test", name = "伤害测试", description = "测试技能伤害的固定目标", monsters = {{unitName = "npc_dota_training_dummy", count = 1, level = 1, customStats = {health = 10000, armor = 0, magicResistance = 0}}}}}
    return scenarios[scenarioId] or nil
end
function TrainingMode.prototype.updateSettings(self, newSettings)
    self.settings = __TS__ObjectAssign({}, self.settings, newSettings)
    if self.isActive then
        self:setupTrainingEnvironment()
    end
    self:syncStatusToNetTable()
end
function TrainingMode.prototype.getStatus(self)
    local ____self_isActive_10 = self.isActive
    local ____self_settings_11 = self.settings
    local ____self_activeScenario_12 = self.activeScenario
    local ____temp_13 = #self.spawnedUnits
    local ____table_activeScenario_9
    if self.activeScenario then
        ____table_activeScenario_9 = GameRules:GetGameTime() - self.testStartTime
    else
        ____table_activeScenario_9 = 0
    end
    return {
        isActive = ____self_isActive_10,
        settings = ____self_settings_11,
        activeScenario = ____self_activeScenario_12,
        spawnedUnitsCount = ____temp_13,
        testDuration = ____table_activeScenario_9
    }
end
return ____exports
