local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__Iterator = ____lualib.__TS__Iterator
local __TS__ArrayFrom = ____lualib.__TS__ArrayFrom
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 15,["12"] = 15,["13"] = 15,["15"] = 15,["16"] = 22,["17"] = 23,["20"] = 27,["21"] = 30,["22"] = 31,["23"] = 31,["24"] = 31,["25"] = 31,["26"] = 31,["27"] = 31,["28"] = 31,["29"] = 30,["30"] = 39,["31"] = 39,["32"] = 39,["33"] = 39,["34"] = 39,["35"] = 39,["36"] = 39,["37"] = 30,["38"] = 47,["39"] = 47,["40"] = 47,["41"] = 47,["42"] = 47,["43"] = 47,["44"] = 47,["45"] = 30,["46"] = 55,["47"] = 55,["48"] = 55,["49"] = 55,["50"] = 55,["51"] = 55,["52"] = 55,["53"] = 30,["54"] = 63,["55"] = 63,["56"] = 63,["57"] = 63,["58"] = 63,["59"] = 63,["60"] = 63,["61"] = 30,["62"] = 71,["63"] = 71,["64"] = 71,["65"] = 71,["66"] = 71,["67"] = 71,["68"] = 71,["69"] = 30,["70"] = 79,["71"] = 79,["72"] = 79,["73"] = 79,["74"] = 79,["75"] = 79,["76"] = 79,["77"] = 30,["78"] = 87,["79"] = 87,["80"] = 87,["81"] = 87,["82"] = 87,["83"] = 87,["84"] = 87,["85"] = 30,["86"] = 95,["87"] = 95,["88"] = 95,["89"] = 95,["90"] = 95,["91"] = 95,["92"] = 95,["93"] = 30,["94"] = 103,["95"] = 103,["96"] = 103,["97"] = 103,["98"] = 103,["99"] = 103,["100"] = 103,["101"] = 30,["102"] = 111,["103"] = 111,["104"] = 111,["105"] = 111,["106"] = 111,["107"] = 111,["108"] = 111,["109"] = 30,["110"] = 119,["111"] = 119,["112"] = 119,["113"] = 119,["114"] = 119,["115"] = 119,["116"] = 119,["117"] = 30,["118"] = 30,["119"] = 130,["120"] = 131,["122"] = 134,["123"] = 135,["124"] = 22,["125"] = 144,["126"] = 145,["127"] = 148,["128"] = 148,["129"] = 148,["130"] = 149,["131"] = 150,["134"] = 155,["135"] = 156,["137"] = 160,["138"] = 161,["140"] = 164,["141"] = 164,["142"] = 165,["143"] = 166,["144"] = 166,["145"] = 166,["146"] = 164,["150"] = 170,["151"] = 170,["152"] = 171,["153"] = 170,["156"] = 174,["157"] = 144,["158"] = 182,["159"] = 183,["160"] = 182,["161"] = 190,["162"] = 191,["163"] = 190,["164"] = 199,["165"] = 200,["166"] = 201,["167"] = 202,["168"] = 203,["171"] = 206,["172"] = 199,["173"] = 214,["174"] = 215,["175"] = 216,["176"] = 217,["177"] = 218,["180"] = 221,["181"] = 214,["182"] = 16,["183"] = 17});
local ____exports = {}
____exports.HextechAugmentConfig = __TS__Class()
local HextechAugmentConfig = ____exports.HextechAugmentConfig
HextechAugmentConfig.name = "HextechAugmentConfig"
function HextechAugmentConfig.prototype.____constructor(self)
end
function HextechAugmentConfig.initialize(self)
    if self.initialized then
        return
    end
    print("[HextechAugmentConfig] Initializing hextech augment pool...")
    local augments = {
        {
            id = "vampiric_vitality",
            displayName = "吸血活力",
            description = "攻击时获得10%生命偷取",
            icon = "file://{images}/spellicons/bloodseeker_blood_bath.png",
            rarity = "common",
            category = "combat"
        },
        {
            id = "staff_will",
            displayName = "意志之杖",
            description = "+10攻速，20%暴击率，1.5倍暴击伤害",
            icon = "file://{images}/spellicons/abaddon_death_coil.png",
            rarity = "rare",
            category = "combat"
        },
        {
            id = "clockwork_accelerator",
            displayName = "发条加速器",
            description = "每5秒增加10点攻击速度",
            icon = "file://{images}/spellicons/faceless_void_time_zone.png",
            rarity = "rare",
            category = "combat"
        },
        {
            id = "ascension",
            displayName = "升华",
            description = "40秒后造成的伤害提升15%",
            icon = "file://{images}/spellicons/brewmaster_storm_wind_walk.png",
            rarity = "epic",
            category = "combat"
        },
        {
            id = "healing_orb",
            displayName = "治疗宝珠",
            description = "恢复400点生命值",
            icon = "file://{images}/spellicons/frogmen_water_bubble_small.png",
            rarity = "common",
            category = "utility"
        },
        {
            id = "blue_battery",
            displayName = "蓝色电池",
            description = "+5%法术伤害，+5点法力恢复",
            icon = "file://{images}/spellicons/keeper_of_the_light_mana_leak.png",
            rarity = "rare",
            category = "magic"
        },
        {
            id = "titans_power",
            displayName = "泰坦之力",
            description = "每100点生命值增加1.3点伤害",
            icon = "file://{images}/spellicons/lone_druid_spirit_bear_demolish.png",
            rarity = "epic",
            category = "combat"
        },
        {
            id = "overheal",
            displayName = "超量治疗",
            description = "每3次攻击造成50%额外伤害并恢复50%生命",
            icon = "file://{images}/spellicons/lone_druid_spirit_bear_return.png",
            rarity = "epic",
            category = "combat"
        },
        {
            id = "soul_link",
            displayName = "灵魂链接",
            description = "每5秒恢复5%生命值",
            icon = "file://{images}/spellicons/skywrath_mage_arcane_bolt.png",
            rarity = "common",
            category = "utility"
        },
        {
            id = "ludens_echo",
            displayName = "卢登的回声",
            description = "技能伤害翻倍",
            icon = "file://{images}/spellicons/wisp_tether.png",
            rarity = "epic",
            category = "magic"
        },
        {
            id = "double_cast",
            displayName = "双重施法",
            description = "15%几率施放技能两次",
            icon = "file://{images}/spellicons/chaos_knight_reality_rift.png",
            rarity = "epic",
            category = "magic"
        },
        {
            id = "living_bomb",
            displayName = "活体炸弹",
            description = "死亡时爆炸造成200点范围伤害",
            icon = "file://{images}/spellicons/centaur_khan_endurance_aura.png",
            rarity = "rare",
            category = "combat"
        }
    }
    for ____, augment in ipairs(augments) do
        self.augments:set(augment.id, augment)
    end
    self.initialized = true
    print(("[HextechAugmentConfig] Initialized " .. tostring(self.augments.size)) .. " hextech augments")
end
function HextechAugmentConfig.getRandomAugments(self, excludeIds, count)
    local availableAugments = {}
    for ____, ____value in __TS__Iterator(self.augments) do
        local id = ____value[1]
        local augment = ____value[2]
        if not __TS__ArrayIncludes(excludeIds, id) then
            availableAugments[#availableAugments + 1] = augment
        end
    end
    if #availableAugments <= count then
        return availableAugments
    end
    local selected = {}
    local shuffled = {unpack(availableAugments)}
    do
        local i = #shuffled - 1
        while i > 0 do
            local j = math.floor(math.random() * (i + 1))
            local ____temp_0 = {shuffled[j + 1], shuffled[i + 1]}
            shuffled[i + 1] = ____temp_0[1]
            shuffled[j + 1] = ____temp_0[2]
            i = i - 1
        end
    end
    do
        local i = 0
        while i < count and i < #shuffled do
            selected[#selected + 1] = shuffled[i + 1]
            i = i + 1
        end
    end
    return selected
end
function HextechAugmentConfig.getAugment(self, id)
    return self.augments:get(id) or nil
end
function HextechAugmentConfig.getAllAugments(self)
    return __TS__ArrayFrom(self.augments:values())
end
function HextechAugmentConfig.getAugmentsByRarity(self, rarity)
    local result = {}
    for ____, augment in __TS__Iterator(self.augments:values()) do
        if augment.rarity == rarity then
            result[#result + 1] = augment
        end
    end
    return result
end
function HextechAugmentConfig.getAugmentsByCategory(self, category)
    local result = {}
    for ____, augment in __TS__Iterator(self.augments:values()) do
        if augment.category == category then
            result[#result + 1] = augment
        end
    end
    return result
end
HextechAugmentConfig.augments = __TS__New(Map)
HextechAugmentConfig.initialized = false
return ____exports
