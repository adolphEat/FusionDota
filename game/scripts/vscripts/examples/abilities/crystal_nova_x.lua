local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 1,["12"] = 1,["13"] = 1,["19"] = 10,["20"] = 11,["21"] = 10,["22"] = 11,["23"] = 17,["24"] = 18,["25"] = 17,["26"] = 21,["27"] = 22,["28"] = 21,["29"] = 25,["30"] = 26,["31"] = 27,["32"] = 29,["33"] = 30,["34"] = 31,["35"] = 32,["36"] = 33,["37"] = 36,["38"] = 36,["39"] = 36,["40"] = 36,["41"] = 36,["42"] = 36,["43"] = 36,["44"] = 36,["45"] = 36,["46"] = 36,["47"] = 36,["48"] = 48,["49"] = 48,["50"] = 48,["51"] = 48,["52"] = 48,["53"] = 48,["54"] = 48,["55"] = 56,["56"] = 56,["57"] = 56,["58"] = 57,["59"] = 58,["60"] = 61,["61"] = 56,["62"] = 56,["63"] = 65,["64"] = 65,["65"] = 65,["66"] = 65,["67"] = 65,["68"] = 65,["69"] = 65,["70"] = 66,["71"] = 25,["72"] = 72,["73"] = 73,["74"] = 74,["75"] = 77,["76"] = 78,["77"] = 79,["78"] = 79,["79"] = 79,["80"] = 79,["81"] = 79,["82"] = 82,["83"] = 82,["84"] = 82,["85"] = 82,["86"] = 82,["87"] = 72,["88"] = 85,["89"] = 86,["90"] = 87,["91"] = 88,["92"] = 85,["93"] = 11,["94"] = 10,["95"] = 11,["97"] = 11,["98"] = 92,["99"] = 93,["100"] = 92,["101"] = 93,["103"] = 93,["104"] = 94,["105"] = 95,["106"] = 92,["107"] = 96,["108"] = 97,["109"] = 96,["110"] = 100,["111"] = 101,["112"] = 100,["113"] = 104,["114"] = 105,["115"] = 104,["116"] = 108,["117"] = 109,["118"] = 110,["119"] = 111,["120"] = 112,["121"] = 108,["122"] = 115,["123"] = 116,["124"] = 115,["125"] = 125,["126"] = 126,["127"] = 125,["128"] = 129,["129"] = 130,["130"] = 129,["131"] = 133,["132"] = 134,["133"] = 133,["134"] = 138,["135"] = 139,["136"] = 138,["137"] = 142,["138"] = 143,["139"] = 142,["140"] = 93,["141"] = 92,["142"] = 93,["144"] = 93});
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local BaseAbility = ____dota_ts_adapter.BaseAbility
local BaseModifier = ____dota_ts_adapter.BaseModifier
local registerAbility = ____dota_ts_adapter.registerAbility
local registerModifier = ____dota_ts_adapter.registerModifier
--- 【x-template 技能范例】
-- 水晶室女-冰霜新星
-- 
-- 请到 excels/技能表.xlsx 中查看技能配置
-- 也可以到 scripts/npc/abilities.txt 中检查生成的kv文件
____exports.crystal_nova_x = __TS__Class()
local crystal_nova_x = ____exports.crystal_nova_x
crystal_nova_x.name = "crystal_nova_x"
__TS__ClassExtends(crystal_nova_x, BaseAbility)
function crystal_nova_x.prototype.GetBehavior(self)
    return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_AOE
end
function crystal_nova_x.prototype.GetAOERadius(self)
    return self:GetSpecialValueFor("aoe_radius")
end
function crystal_nova_x.prototype.OnSpellStart(self)
    local caster = self:GetCaster()
    local point = self:GetCursorPosition()
    local damage = self:GetSpecialValueFor("nova_damage")
    local radius = self:GetAOERadius()
    local visionRadius = self:GetSpecialValueFor("vision_radius")
    local visionDuration = self:GetSpecialValueFor("vision_duration")
    local duration = self:GetSpecialValueFor("duration")
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        point,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    local damageTable = {
        attacker = caster,
        damage = damage,
        damage_type = DAMAGE_TYPE_MAGICAL,
        ability = self,
        victim = nil
    }
    __TS__ArrayForEach(
        enemies,
        function(____, enemy)
            damageTable.victim = enemy
            ApplyDamage(damageTable)
            ____exports.modifier_crystal_nova_x_debuff:apply(enemy, caster, self, {})
        end
    )
    AddFOWViewer(
        caster:GetTeamNumber(),
        point,
        visionRadius,
        visionDuration,
        false
    )
    self:PlayEffects(point, radius)
end
function crystal_nova_x.prototype.PlayEffects(self, point, radius)
    local particle = "particles/units/heroes/hero_crystalmaiden/maiden_crystal_nova.vpcf"
    local sound = "Hero_Crystal.CrystalNova"
    local effect = ParticleManager:CreateParticle(particle, PATTACH_WORLDORIGIN, nil)
    ParticleManager:SetParticleControl(effect, 0, point)
    ParticleManager:SetParticleControl(
        effect,
        1,
        Vector(radius, radius, radius)
    )
    EmitSoundOnLocationWithCaster(
        point,
        sound,
        self:GetCaster()
    )
end
function crystal_nova_x.prototype.Precache(self, context)
    PrecacheResource("particle", "particles/units/heroes/hero_crystalmaiden/maiden_crystal_nova.vpcf", context)
    PrecacheResource("particle", "particles/generic_gameplay/generic_slowed_cold.vpcf", context)
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_crystal.vsndevts", context)
end
crystal_nova_x = __TS__DecorateLegacy(
    {registerAbility(nil)},
    crystal_nova_x
)
____exports.crystal_nova_x = crystal_nova_x
____exports.modifier_crystal_nova_x_debuff = __TS__Class()
local modifier_crystal_nova_x_debuff = ____exports.modifier_crystal_nova_x_debuff
modifier_crystal_nova_x_debuff.name = "modifier_crystal_nova_x_debuff"
__TS__ClassExtends(modifier_crystal_nova_x_debuff, BaseModifier)
function modifier_crystal_nova_x_debuff.prototype.____constructor(self, ...)
    BaseModifier.prototype.____constructor(self, ...)
    self.attackspeed_slow = 0
    self.movespeed_slow = 0
end
function modifier_crystal_nova_x_debuff.prototype.IsHidden(self)
    return false
end
function modifier_crystal_nova_x_debuff.prototype.IsDebuff(self)
    return true
end
function modifier_crystal_nova_x_debuff.prototype.IsPurgable(self)
    return true
end
function modifier_crystal_nova_x_debuff.prototype.OnCreated(self)
    self.attackspeed_slow = self:GetAbility():GetSpecialValueFor("attackspeed_slow")
    self.movespeed_slow = self:GetAbility():GetSpecialValueFor("movespeed_slow")
    local duration = self:GetAbility():GetSpecialValueFor("duration")
    self:SetDuration(duration, true)
end
function modifier_crystal_nova_x_debuff.prototype.OnRefresh(self)
    self:OnCreated()
end
function modifier_crystal_nova_x_debuff.prototype.DeclareFunctions(self)
    return {MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT, MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE}
end
function modifier_crystal_nova_x_debuff.prototype.GetModifierAttackSpeedBonus_Constant(self)
    return self.attackspeed_slow
end
function modifier_crystal_nova_x_debuff.prototype.GetModifierMoveSpeedBonus_Percentage(self)
    return self.movespeed_slow
end
function modifier_crystal_nova_x_debuff.prototype.GetEffectName(self)
    return "particles/generic_gameplay/generic_slowed_cold.vpcf"
end
function modifier_crystal_nova_x_debuff.prototype.GetEffectAttachType(self)
    return PATTACH_ABSORIGIN_FOLLOW
end
modifier_crystal_nova_x_debuff = __TS__DecorateLegacy(
    {registerModifier(nil)},
    modifier_crystal_nova_x_debuff
)
____exports.modifier_crystal_nova_x_debuff = modifier_crystal_nova_x_debuff
return ____exports
