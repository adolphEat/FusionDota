local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 23,["12"] = 24,["13"] = 23,["14"] = 24,["16"] = 24,["17"] = 25,["18"] = 26,["19"] = 27,["20"] = 28,["21"] = 29,["22"] = 30,["23"] = 31,["24"] = 32,["25"] = 33,["26"] = 34,["27"] = 35,["28"] = 36,["29"] = 37,["30"] = 38,["31"] = 39,["32"] = 40,["33"] = 41,["34"] = 42,["35"] = 42,["36"] = 23,["37"] = 44,["38"] = 45,["41"] = 46,["42"] = 47,["43"] = 48,["44"] = 44,["45"] = 51,["46"] = 52,["47"] = 51,["48"] = 55,["49"] = 56,["52"] = 57,["53"] = 58,["54"] = 59,["55"] = 60,["56"] = 60,["58"] = 61,["59"] = 61,["61"] = 55,["62"] = 64,["63"] = 65,["64"] = 66,["65"] = 66,["67"] = 67,["68"] = 64,["69"] = 70,["70"] = 71,["71"] = 71,["73"] = 72,["74"] = 70,["75"] = 75,["76"] = 76,["77"] = 75,["78"] = 79,["79"] = 80,["80"] = 79,["81"] = 87,["82"] = 88,["85"] = 89,["86"] = 90,["87"] = 87,["88"] = 93,["89"] = 94,["92"] = 95,["93"] = 96,["94"] = 97,["95"] = 98,["96"] = 99,["97"] = 100,["98"] = 101,["99"] = 102,["100"] = 103,["101"] = 104,["102"] = 105,["103"] = 106,["106"] = 93,["107"] = 111,["108"] = 112,["109"] = 113,["110"] = 111,["111"] = 116,["112"] = 117,["113"] = 118,["114"] = 116,["115"] = 121,["116"] = 122,["117"] = 124,["118"] = 125,["119"] = 126,["120"] = 127,["121"] = 127,["123"] = 128,["124"] = 128,["126"] = 129,["127"] = 129,["129"] = 130,["130"] = 131,["131"] = 132,["132"] = 133,["133"] = 134,["134"] = 135,["135"] = 136,["136"] = 137,["137"] = 138,["138"] = 139,["139"] = 140,["141"] = 142,["142"] = 143,["144"] = 145,["145"] = 146,["147"] = 148,["148"] = 149,["149"] = 150,["150"] = 151,["151"] = 151,["153"] = 152,["154"] = 152,["156"] = 153,["157"] = 154,["158"] = 155,["160"] = 157,["161"] = 158,["162"] = 159,["163"] = 160,["164"] = 161,["165"] = 162,["166"] = 163,["167"] = 164,["168"] = 165,["169"] = 166,["171"] = 168,["172"] = 169,["173"] = 170,["175"] = 172,["176"] = 173,["177"] = 174,["178"] = 175,["179"] = 176,["181"] = 178,["182"] = 179,["183"] = 180,["184"] = 181,["186"] = 183,["189"] = 186,["190"] = 121,["191"] = 189,["192"] = 190,["193"] = 191,["194"] = 192,["195"] = 192,["197"] = 193,["198"] = 193,["200"] = 194,["201"] = 195,["202"] = 196,["203"] = 189,["204"] = 199,["205"] = 200,["206"] = 201,["207"] = 202,["208"] = 203,["211"] = 206,["212"] = 207,["213"] = 208,["214"] = 209,["217"] = 199,["218"] = 214,["219"] = 215,["220"] = 214,["221"] = 218,["222"] = 219,["223"] = 218,["224"] = 222,["225"] = 223,["226"] = 222,["227"] = 226,["228"] = 227,["229"] = 226,["230"] = 230,["231"] = 231,["232"] = 230,["233"] = 234,["234"] = 235,["235"] = 234,["236"] = 238,["237"] = 239,["238"] = 238,["239"] = 242,["240"] = 243,["241"] = 242,["242"] = 24,["243"] = 23,["244"] = 24,["246"] = 24});
local ____exports = {}
local ____dota_ts_adapter = require("utils.dota_ts_adapter")
local BaseModifierMotionBoth = ____dota_ts_adapter.BaseModifierMotionBoth
local registerModifier = ____dota_ts_adapter.registerModifier
____exports.modifier_generic_arc = __TS__Class()
local modifier_generic_arc = ____exports.modifier_generic_arc
modifier_generic_arc.name = "modifier_generic_arc"
__TS__ClassExtends(modifier_generic_arc, BaseModifierMotionBoth)
function modifier_generic_arc.prototype.____constructor(self, ...)
    BaseModifierMotionBoth.prototype.____constructor(self, ...)
    self.direction = Vector(1, 1, 0)
    self.speed = 0
    self.duration = 0
    self.distance = 100
    self.height = 100
    self.start_offset = 0
    self.end_offset = 0
    self.fix_end = false
    self.fix_duration = false
    self.fix_height = false
    self.isStun = true
    self.isRestricted = true
    self.isForward = true
    self.activity = ACT_DOTA_FLAIL
    self.interrupted = false
    self.const1 = 0
    self.const2 = 0
    self.endCallback = function()
    end
end
function modifier_generic_arc.prototype.OnCreated(self, kv)
    if not IsServer() then
        return
    end
    self.interrupted = false
    self:SetJumpParameters(kv)
    self:Jump()
end
function modifier_generic_arc.prototype.OnRefresh(self, kv)
    self:OnCreated(kv)
end
function modifier_generic_arc.prototype.OnDestroy(self)
    if not IsServer() then
        return
    end
    local pos = self:GetParent():GetOrigin()
    self:GetParent():RemoveHorizontalMotionController(self)
    self:GetParent():RemoveVerticalMotionController(self)
    if self.end_offset ~= 0 then
        self:GetParent():SetOrigin(pos)
    end
    if self.endCallback then
        self:endCallback(self.interrupted)
    end
end
function modifier_generic_arc.prototype.DeclareFunctions(self)
    local funcs = {MODIFIER_PROPERTY_DISABLE_TURNING}
    if self:GetStackCount() > 0 then
        funcs[#funcs + 1] = MODIFIER_PROPERTY_OVERRIDE_ANIMATION
    end
    return funcs
end
function modifier_generic_arc.prototype.GetModifierDisableTurning(self)
    if not self.isForward then
        return 0
    end
    return 1
end
function modifier_generic_arc.prototype.GetOverrideAnimation(self)
    return self:GetStackCount()
end
function modifier_generic_arc.prototype.CheckState(self)
    return {[MODIFIER_STATE_STUNNED] = self.isStun or false, [MODIFIER_STATE_COMMAND_RESTRICTED] = self.isRestricted or false, [MODIFIER_STATE_NO_UNIT_COLLISION] = true}
end
function modifier_generic_arc.prototype.UpdateHorizontalMotion(self, me, dt)
    if self.fix_duration and self:GetElapsedTime() >= self.duration then
        return
    end
    local pos = me:GetOrigin() + self.direction * self.speed * dt
    me:SetOrigin(pos)
end
function modifier_generic_arc.prototype.UpdateVerticalMotion(self, me, dt)
    if self.fix_duration and self:GetElapsedTime() >= self.duration then
        return
    end
    local pos = me:GetOrigin()
    local time = self:GetElapsedTime()
    local height = pos.z
    local speed = self:GetVerticalSpeed(time)
    pos.z = height + speed * dt
    me:SetOrigin(pos)
    if not self.fix_duration then
        local ground = GetGroundHeight(pos, me) + self.end_offset
        if pos.z <= ground then
            pos.z = ground
            me:SetOrigin(pos)
            self:Destroy()
        end
    end
end
function modifier_generic_arc.prototype.OnHorizontalMotionInterrupted(self)
    self.interrupted = true
    self:Destroy()
end
function modifier_generic_arc.prototype.OnVerticalMotionInterrupted(self)
    self.interrupted = true
    self:Destroy()
end
function modifier_generic_arc.prototype.SetJumpParameters(self, kv)
    local parent = self:GetParent()
    self.fix_end = true
    self.fix_duration = true
    self.fix_height = true
    if kv.fix_end then
        self.fix_end = kv.fix_end == 1
    end
    if kv.fix_duration then
        self.fix_duration = kv.fix_duration == 1
    end
    if kv.fix_height then
        self.fix_height = kv.fix_height == 1
    end
    self.isStun = kv.isStun == 1
    self.isRestricted = kv.isRestricted == 1
    self.isForward = kv.isForward == 1
    self.activity = kv.activity or 0
    self:SetStackCount(self.activity)
    if kv.target_x and kv.target_y then
        local origin = parent:GetOrigin()
        local dir = Vector(kv.target_x, kv.target_y, 0) - origin
        dir.z = 0
        dir = dir:Normalized()
        self.direction = dir
    end
    if kv.dir_x and kv.dir_y then
        self.direction = Vector(kv.dir_x, kv.dir_y, 0):Normalized()
    end
    if not self.direction then
        self.direction = parent:GetForwardVector()
    end
    self.duration = kv.duration
    self.distance = kv.distance
    self.speed = kv.speed
    if not self.duration then
        self.duration = self.distance / self.speed
    end
    if not self.distance then
        self.distance = self.speed * self.duration
    end
    if not self.speed then
        self.distance = self.distance or 0
        self.speed = self.distance / self.duration
    end
    self.height = kv.height or 0
    self.start_offset = kv.start_offset or 0
    self.end_offset = kv.end_offset or 0
    local pos_start = parent:GetOrigin()
    local pos_end = pos_start + self.direction * self.distance
    local height_start = GetGroundHeight(pos_start, parent) + self.start_offset
    local height_end = GetGroundHeight(pos_end, parent) + self.end_offset
    local height_max
    if not self.fix_height then
        self.height = math.min(self.height, self.distance / 4)
    end
    if self.fix_end then
        height_end = height_start
        height_max = height_start + self.height
    else
        local tmin = height_start
        local tmax = height_end
        if tmin > tmax then
            tmin = height_end
            tmax = height_start
        end
        local delta = (tmax - tmin) * 2 / 3
        height_max = tmin + delta + self.height
        if not self.fix_duration then
            self:SetDuration(-1, false)
        else
            self:SetDuration(self.duration, true)
        end
    end
    self:InitVerticalArc(height_start, height_max, height_end, self.duration)
end
function modifier_generic_arc.prototype.InitVerticalArc(self, height_start, height_max, height_end, duration)
    height_end = height_end - height_start
    height_max = height_max - height_start
    if height_max < height_end then
        height_max = height_end + 0.01
    end
    if height_max <= 0 then
        height_max = 0.01
    end
    local duration_end = (1 + math.sqrt(1 - height_end / height_max)) / 2
    self.const1 = 4 * height_max * duration_end / duration
    self.const2 = 4 * height_max * duration_end * duration_end / (duration * duration)
end
function modifier_generic_arc.prototype.Jump(self)
    if self.distance > 0 then
        if not self:ApplyHorizontalMotionController() then
            self.interrupted = true
            self:Destroy()
        end
    end
    if self.height > 0 then
        if not self:ApplyVerticalMotionController() then
            self.interrupted = true
            self:Destroy()
        end
    end
end
function modifier_generic_arc.prototype.GetVerticalPos(self, time)
    return self.const1 * time - self.const2 * time * time
end
function modifier_generic_arc.prototype.GetVerticalSpeed(self, time)
    return self.const1 - 2 * self.const2 * time
end
function modifier_generic_arc.prototype.SetEndCallback(self, func)
    self.endCallback = func
end
function modifier_generic_arc.prototype.IsHidden(self)
    return true
end
function modifier_generic_arc.prototype.IsDebuff(self)
    return false
end
function modifier_generic_arc.prototype.IsStunDebuff(self)
    return false
end
function modifier_generic_arc.prototype.IsPurgable(self)
    return true
end
function modifier_generic_arc.prototype.GetAttributes(self)
    return MODIFIER_ATTRIBUTE_MULTIPLE
end
modifier_generic_arc = __TS__DecorateLegacy(
    {registerModifier(nil)},
    modifier_generic_arc
)
____exports.modifier_generic_arc = modifier_generic_arc
return ____exports
