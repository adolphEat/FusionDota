local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 1,["12"] = 1,["13"] = 1,["20"] = 11,["21"] = 12,["22"] = 11,["23"] = 12,["24"] = 13,["25"] = 14,["26"] = 13,["27"] = 17,["28"] = 18,["29"] = 17,["30"] = 12,["31"] = 11,["32"] = 12,["34"] = 12,["35"] = 22,["36"] = 23,["37"] = 22,["38"] = 23,["40"] = 23,["41"] = 24,["42"] = 25,["43"] = 26,["44"] = 22,["45"] = 29,["46"] = 30,["47"] = 29,["48"] = 33,["49"] = 34,["50"] = 33,["51"] = 37,["52"] = 38,["53"] = 39,["54"] = 40,["55"] = 42,["58"] = 44,["59"] = 45,["60"] = 45,["61"] = 45,["62"] = 45,["63"] = 45,["64"] = 45,["65"] = 45,["66"] = 45,["67"] = 37,["68"] = 56,["69"] = 57,["72"] = 58,["73"] = 59,["74"] = 60,["75"] = 61,["76"] = 56,["77"] = 68,["78"] = 69,["79"] = 68,["80"] = 72,["81"] = 73,["84"] = 76,["87"] = 77,["90"] = 78,["93"] = 79,["96"] = 81,["97"] = 82,["98"] = 83,["99"] = 85,["100"] = 86,["101"] = 89,["102"] = 89,["103"] = 89,["104"] = 89,["105"] = 89,["106"] = 89,["107"] = 89,["108"] = 89,["109"] = 89,["110"] = 89,["111"] = 89,["112"] = 101,["113"] = 101,["114"] = 101,["115"] = 102,["116"] = 103,["117"] = 101,["118"] = 101,["119"] = 106,["121"] = 72,["122"] = 110,["123"] = 111,["124"] = 112,["125"] = 114,["126"] = 114,["127"] = 114,["128"] = 114,["129"] = 114,["130"] = 115,["131"] = 117,["132"] = 117,["133"] = 117,["134"] = 117,["135"] = 110,["136"] = 23,["137"] = 22,["138"] = 23,["140"] = 23});
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local BaseAbility = ____dota_ts_adapter.BaseAbility
local BaseModifier = ____dota_ts_adapter.BaseModifier
local registerAbility = ____dota_ts_adapter.registerAbility
local registerModifier = ____dota_ts_adapter.registerModifier
--- 【x-template 技能范例】
-- 被动技能：反击螺旋
-- 
-- 
-- 请到 excels/技能表.xlsx 中查看技能配置
-- 也可以到 scripts/npc/abilities.txt 中检查生成的kv文件
____exports.counter_helix_x = __TS__Class()
local counter_helix_x = ____exports.counter_helix_x
counter_helix_x.name = "counter_helix_x"
__TS__ClassExtends(counter_helix_x, BaseAbility)
function counter_helix_x.prototype.GetBehavior(self)
    return DOTA_ABILITY_BEHAVIOR_PASSIVE
end
function counter_helix_x.prototype.GetIntrinsicModifierName(self)
    return ____exports.modifier_counter_helix_x.name
end
counter_helix_x = __TS__DecorateLegacy(
    {registerAbility(nil)},
    counter_helix_x
)
____exports.counter_helix_x = counter_helix_x
____exports.modifier_counter_helix_x = __TS__Class()
local modifier_counter_helix_x = ____exports.modifier_counter_helix_x
modifier_counter_helix_x.name = "modifier_counter_helix_x"
__TS__ClassExtends(modifier_counter_helix_x, BaseModifier)
function modifier_counter_helix_x.prototype.____constructor(self, ...)
    BaseModifier.prototype.____constructor(self, ...)
    self.radius = 100
    self.hit_count = 99
    self.hits = 0
end
function modifier_counter_helix_x.prototype.IsHidden(self)
    return false
end
function modifier_counter_helix_x.prototype.IsPurgable(self)
    return false
end
function modifier_counter_helix_x.prototype.OnCreated(self, params)
    self.radius = self:GetAbility():GetSpecialValueFor("radius")
    self.hit_count = self:GetAbility():GetSpecialValueFor("hit_count")
    local damage = self:GetAbility():GetSpecialValueFor("damage")
    if not IsServer() then
        return
    end
    self:SetStackCount(self.hit_count)
    self.damageTable = {
        victim = nil,
        attacker = self:GetCaster(),
        damage = damage,
        ability = self:GetAbility(),
        damage_type = DAMAGE_TYPE_PURE,
        damage_flags = DOTA_DAMAGE_FLAG_NONE
    }
end
function modifier_counter_helix_x.prototype.OnRefresh(self, params)
    if not IsServer() then
        return
    end
    local damage = self:GetAbility():GetSpecialValueFor("damage")
    self.damageTable.damage = damage
    self.hit_count = self:GetAbility():GetSpecialValueFor("hit_count")
    self:SetStackCount(self.hit_count - self.hits)
end
function modifier_counter_helix_x.prototype.DeclareFunctions(self)
    return {MODIFIER_EVENT_ON_ATTACK_LANDED}
end
function modifier_counter_helix_x.prototype.OnAttackLanded(self, event)
    if not IsServer() then
        return
    end
    if event.target ~= self:GetParent() then
        return
    end
    if self:GetParent():PassivesDisabled() then
        return
    end
    if event.attacker:GetTeamNumber() == self:GetParent():GetTeamNumber() then
        return
    end
    if event.attacker:IsOther() or event.attacker:IsBuilding() then
        return
    end
    self.hits = self.hits + 1
    self:SetStackCount(self.hit_count - self.hits)
    if self.hits >= self.hit_count then
        self.hits = 0
        self:SetStackCount(self.hit_count)
        local enemies = FindUnitsInRadius(
            self:GetParent():GetTeamNumber(),
            self:GetParent():GetAbsOrigin(),
            nil,
            self.radius,
            DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_MAGIC_IMMUNE_ENEMIES,
            FIND_ANY_ORDER,
            false
        )
        __TS__ArrayForEach(
            enemies,
            function(____, enemy)
                self.damageTable.victim = enemy
                ApplyDamage(self.damageTable)
            end
        )
        self:PlayEffects()
    end
end
function modifier_counter_helix_x.prototype.PlayEffects(self)
    local particle = "particles/units/heroes/hero_axe/axe_counterhelix_ad.vpcf"
    local sound = "Hero_Axe.CounterHelix"
    local effect = ParticleManager:CreateParticle(
        particle,
        PATTACH_ABSORIGIN_FOLLOW,
        self:GetCaster()
    )
    ParticleManager:ReleaseParticleIndex(effect)
    EmitSoundOn(
        sound,
        self:GetParent()
    )
end
modifier_counter_helix_x = __TS__DecorateLegacy(
    {registerModifier(nil)},
    modifier_counter_helix_x
)
____exports.modifier_counter_helix_x = modifier_counter_helix_x
return ____exports
