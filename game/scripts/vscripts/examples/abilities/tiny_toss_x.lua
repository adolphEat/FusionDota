local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 1,["12"] = 1,["13"] = 1,["14"] = 2,["15"] = 2,["16"] = 4,["17"] = 5,["18"] = 4,["19"] = 5,["20"] = 10,["21"] = 11,["24"] = 12,["25"] = 13,["26"] = 14,["27"] = 14,["28"] = 14,["29"] = 14,["30"] = 14,["31"] = 14,["32"] = 14,["33"] = 14,["34"] = 14,["35"] = 14,["36"] = 14,["37"] = 25,["39"] = 26,["40"] = 26,["41"] = 27,["42"] = 28,["43"] = 29,["46"] = 26,["49"] = 33,["50"] = 10,["51"] = 37,["52"] = 38,["55"] = 39,["56"] = 37,["57"] = 48,["58"] = 49,["59"] = 50,["60"] = 51,["61"] = 52,["63"] = 54,["65"] = 56,["66"] = 48,["67"] = 59,["68"] = 60,["71"] = 61,["72"] = 62,["73"] = 63,["76"] = 65,["77"] = 66,["78"] = 66,["80"] = 67,["81"] = 68,["82"] = 59,["83"] = 71,["84"] = 72,["87"] = 73,["88"] = 74,["89"] = 74,["90"] = 74,["91"] = 74,["92"] = 74,["93"] = 74,["94"] = 74,["95"] = 74,["96"] = 74,["97"] = 74,["98"] = 74,["99"] = 74,["100"] = 74,["101"] = 71,["102"] = 84,["103"] = 85,["104"] = 86,["106"] = 88,["107"] = 84,["108"] = 91,["109"] = 92,["110"] = 93,["112"] = 95,["113"] = 91,["114"] = 98,["115"] = 99,["116"] = 98,["117"] = 5,["118"] = 4,["119"] = 5,["121"] = 5,["122"] = 112,["123"] = 113,["124"] = 112,["125"] = 113,["126"] = 128,["127"] = 129,["128"] = 130,["129"] = 131,["130"] = 132,["131"] = 133,["132"] = 134,["135"] = 136,["136"] = 137,["137"] = 138,["138"] = 139,["139"] = 141,["140"] = 141,["141"] = 141,["142"] = 141,["143"] = 141,["144"] = 141,["145"] = 141,["146"] = 141,["147"] = 150,["148"] = 151,["151"] = 152,["152"] = 154,["155"] = 156,["156"] = 156,["157"] = 156,["158"] = 156,["159"] = 156,["160"] = 156,["161"] = 156,["162"] = 156,["163"] = 156,["164"] = 156,["165"] = 156,["166"] = 168,["167"] = 170,["168"] = 170,["169"] = 170,["170"] = 171,["171"] = 171,["172"] = 171,["173"] = 171,["174"] = 171,["175"] = 171,["176"] = 171,["177"] = 171,["178"] = 179,["179"] = 180,["181"] = 182,["182"] = 170,["183"] = 170,["184"] = 185,["185"] = 185,["186"] = 185,["187"] = 185,["188"] = 185,["189"] = 186,["190"] = 150,["191"] = 189,["192"] = 190,["193"] = 191,["194"] = 192,["195"] = 193,["196"] = 194,["197"] = 194,["199"] = 195,["200"] = 196,["201"] = 197,["202"] = 198,["203"] = 200,["204"] = 201,["207"] = 205,["208"] = 206,["209"] = 128,["210"] = 209,["211"] = 210,["214"] = 211,["215"] = 209,["216"] = 214,["217"] = 215,["218"] = 214,["219"] = 218,["220"] = 219,["223"] = 220,["224"] = 221,["225"] = 222,["226"] = 223,["227"] = 224,["228"] = 225,["229"] = 226,["230"] = 227,["231"] = 228,["232"] = 229,["233"] = 229,["235"] = 230,["237"] = 231,["238"] = 231,["240"] = 232,["242"] = 233,["243"] = 234,["244"] = 218,["245"] = 237,["246"] = 238,["249"] = 239,["250"] = 237,["251"] = 242,["252"] = 243,["253"] = 242,["254"] = 246,["255"] = 247,["256"] = 246,["257"] = 250,["258"] = 251,["259"] = 250,["260"] = 254,["261"] = 255,["262"] = 254,["263"] = 258,["264"] = 259,["265"] = 258,["266"] = 262,["267"] = 263,["268"] = 262,["269"] = 113,["270"] = 112,["271"] = 113,["273"] = 113});
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local BaseAbility = ____dota_ts_adapter.BaseAbility
local BaseModifierMotionBoth = ____dota_ts_adapter.BaseModifierMotionBoth
local registerAbility = ____dota_ts_adapter.registerAbility
local registerModifier = ____dota_ts_adapter.registerModifier
local ____modifier_generic_arc = require("examples.modifiers.modifier_generic_arc")
local modifier_generic_arc = ____modifier_generic_arc.modifier_generic_arc
____exports.tiny_toss_x = __TS__Class()
local tiny_toss_x = ____exports.tiny_toss_x
tiny_toss_x.name = "tiny_toss_x"
__TS__ClassExtends(tiny_toss_x, BaseAbility)
function tiny_toss_x.prototype.FindTossTarget(self)
    if not IsServer() then
        return
    end
    local caster = self:GetCaster()
    local radius = self:GetSpecialValueFor("grab_radius")
    local units = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_BOTH,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    local target
    do
        local i = 0
        while i < #units do
            local unit = units[i + 1]
            if unit ~= caster and not unit:IsAncient() and not ____exports.modifier_tiny_toss_x:find_on(unit) then
                target = unit
                break
            end
            i = i + 1
        end
    end
    return target
end
function tiny_toss_x.prototype.OnAbilityPhaseStart(self)
    if not IsServer() then
        return
    end
    return self:FindTossTarget() ~= nil
end
function tiny_toss_x.prototype.GetBehavior(self)
    local level = self:GetLevel()
    local behavior = DOTA_ABILITY_BEHAVIOR_AOE + DOTA_ABILITY_BEHAVIOR_IGNORE_BACKSWING
    if level >= 4 then
        behavior = behavior + DOTA_ABILITY_BEHAVIOR_POINT
    else
        behavior = behavior + DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
    end
    return behavior
end
function tiny_toss_x.prototype.OnSpellStart(self)
    if not IsServer() then
        return
    end
    local target = self:GetCursorTarget()
    local victim = self:FindTossTarget()
    if victim == nil then
        return
    end
    local target_pos = self:GetCursorPosition()
    if target ~= nil then
        target_pos = target:GetOrigin()
    end
    local victim_origin = victim:GetOrigin()
    self:StartToss(victim, victim_origin, target_pos)
end
function tiny_toss_x.prototype.StartToss(self, victim, victim_origin, target_pos)
    if not IsServer() then
        return
    end
    local direction = target_pos - victim_origin
    ____exports.modifier_tiny_toss_x:apply(
        victim,
        self:GetCaster(),
        self,
        {
            target_x = target_pos.x,
            target_y = target_pos.y,
            target_z = target_pos.z,
            direction_x = direction.x,
            direction_y = direction.y,
            direction_z = 0
        }
    )
end
function tiny_toss_x.prototype.CastFilterResultTarget(self, target)
    if self:GetCaster() == target then
        return UF_FAIL_CUSTOM
    end
    return UF_SUCCESS
end
function tiny_toss_x.prototype.GetCustomCastErrorTarget(self, target)
    if self:GetCaster() == target then
        return "#dota_hud_error_cant_cast_on_self"
    end
    return ""
end
function tiny_toss_x.prototype.GetAOERadius(self)
    return self:GetSpecialValueFor("radius")
end
tiny_toss_x = __TS__DecorateLegacy(
    {registerAbility(nil)},
    tiny_toss_x
)
____exports.tiny_toss_x = tiny_toss_x
____exports.modifier_tiny_toss_x = __TS__Class()
local modifier_tiny_toss_x = ____exports.modifier_tiny_toss_x
modifier_tiny_toss_x.name = "modifier_tiny_toss_x"
__TS__ClassExtends(modifier_tiny_toss_x, BaseModifierMotionBoth)
function modifier_tiny_toss_x.prototype.OnCreated(self, params)
    self.caster = self:GetCaster()
    self.parent = self:GetParent()
    self.ability = self:GetAbility()
    self.damage = self.ability:GetSpecialValueFor("toss_damage") or 0
    self.radius = self.ability:GetSpecialValueFor("radius") or 0
    if not IsServer() then
        return
    end
    local duration = self.ability:GetSpecialValueFor("duration")
    local height = 850
    self.start_position = self.parent:GetOrigin()
    self.target_position = Vector(params.target_x, params.target_y, params.target_z)
    self.arc = modifier_generic_arc:apply(self.parent, self.caster, self.ability, {
        duration = duration,
        distance = 0,
        height = height,
        fix_duration = 0,
        isStun = 1,
        activity = ACT_DOTA_FLAIL
    })
    self.arc:SetEndCallback(function(____, interrupted)
        if not self then
            return
        end
        self:Destroy()
        if interrupted then
            return
        end
        local enemies = FindUnitsInRadius(
            self.caster:GetTeamNumber(),
            self.parent:GetOrigin(),
            nil,
            self.radius,
            DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        print(("find " .. tostring(#enemies)) .. " enemies")
        __TS__ArrayForEach(
            enemies,
            function(____, enemy)
                local damage = {
                    attacker = self.caster,
                    damage = self.damage,
                    damage_type = self.ability:GetAbilityDamageType(),
                    damage_flags = DOTA_DAMAGE_FLAG_NONE,
                    ability = self.ability,
                    victim = enemy
                }
                if enemy == self.parent then
                    damage.damage = damage.damage * (1 + self.ability:GetSpecialValueFor("bonus_damage_pct") / 100)
                end
                ApplyDamage(damage)
            end
        )
        GridNav:DestroyTreesAroundPoint(
            self.parent:GetOrigin(),
            self.radius,
            false
        )
        EmitSoundOn("Ability.TossImpact", self.parent)
    end)
    local direction = self.target_position - self.parent:GetOrigin()
    local distance = direction:Length2D()
    direction = direction:Normalized()
    direction.z = 0
    self.distance = distance
    if self.distance == 0 then
        self.distance = 1
    end
    self.duration = duration
    self.speed = distance / self.duration
    self.accel = 100
    self.maxSpeed = 3000
    if not self:ApplyHorizontalMotionController() then
        self:Destroy()
        return
    end
    EmitSoundOn("Ability.TossThrow", self.caster)
    EmitSoundOn("Hero_Tiny.Toss.Target", self.parent)
end
function modifier_tiny_toss_x.prototype.OnDestroy(self)
    if not IsServer() then
        return
    end
    self:GetParent():RemoveHorizontalMotionController(self)
end
function modifier_tiny_toss_x.prototype.CheckState(self)
    return {[MODIFIER_STATE_STUNNED] = true}
end
function modifier_tiny_toss_x.prototype.UpdateHorizontalMotion(self, me, dt)
    if not IsServer() then
        return
    end
    local target = self.target_position
    local parent = self.parent:GetOrigin()
    local duration = self:GetElapsedTime()
    local direction = target - parent
    local distance = direction:Length2D()
    direction.z = 0
    direction = direction:Normalized()
    local originalDistance = duration / self.duration * self.distance
    local expectedSpeed
    if self:GetElapsedTime() >= self.duration then
        expectedSpeed = self.speed
    else
        expectedSpeed = distance / (self.duration - self:GetElapsedTime())
    end
    if self.speed < expectedSpeed then
        self.speed = math.min(self.speed + self.accel, self.maxSpeed)
    else
        self.speed = math.max(self.speed - self.accel, 0)
    end
    local pos = parent + direction * self.speed * dt
    me:SetOrigin(pos)
end
function modifier_tiny_toss_x.prototype.OnHorizontalMotionInterrupted(self)
    if not IsServer() then
        return
    end
    self:Destroy()
end
function modifier_tiny_toss_x.prototype.GetEffectName(self)
    return "particles/units/heroes/hero_tiny/tiny_toss_blur.vpcf"
end
function modifier_tiny_toss_x.prototype.GetEffectAttachType(self)
    return PATTACH_ABSORIGIN_FOLLOW
end
function modifier_tiny_toss_x.prototype.IsHidden(self)
    return true
end
function modifier_tiny_toss_x.prototype.IsDebuff(self)
    return self:GetCaster():GetTeamNumber() ~= self:GetParent():GetTeamNumber()
end
function modifier_tiny_toss_x.prototype.IsStunDebuff(self)
    return true
end
function modifier_tiny_toss_x.prototype.IsPurgable(self)
    return true
end
modifier_tiny_toss_x = __TS__DecorateLegacy(
    {registerModifier(nil)},
    modifier_tiny_toss_x
)
____exports.modifier_tiny_toss_x = modifier_tiny_toss_x
return ____exports
