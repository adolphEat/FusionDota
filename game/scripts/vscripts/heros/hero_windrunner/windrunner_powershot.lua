-- 风行者-强力击（修改版）
-- 基于原版风行者的强力击，但修改了一些数值

windrunner_powershot = class({})

LinkLuaModifier("modifier_windrunner_powershot_debuff", "heroes/hero_windrunner/windrunner_powershot.lua", LUA_MODIFIER_MOTION_NONE)

function windrunner_powershot:GetBehavior()
    return DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR_DIRECTIONAL
end

function windrunner_powershot:GetCastRange(location, target)
    return self:GetSpecialValueFor("arrow_range")
end

function windrunner_powershot:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local point = self:GetCursorPosition()
    
    -- 获取技能数据
    local damage = self:GetSpecialValueFor("arrow_damage")
    local arrow_speed = self:GetSpecialValueFor("arrow_speed")
    local arrow_width = self:GetSpecialValueFor("arrow_width")
    local arrow_range = self:GetSpecialValueFor("arrow_range")
    
    -- 创建箭矢
    local direction = (point - caster:GetAbsOrigin()):Normalized()
    local start_pos = caster:GetAbsOrigin() + direction * 100
    
    -- 创建线性投射物
    local projectile_info = {
        Ability = self,
        EffectName = "particles/heros/windrunner/windrunner_spell_powershot.vpcf",
        vSpawnOrigin = start_pos,
        fDistance = arrow_range,
        fStartRadius = arrow_width,
        fEndRadius = arrow_width,
        Source = caster,
        bHasFrontalCone = false,
        bReplaceExisting = false,
        iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
        iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_NONE,
        iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        fExpireTime = GameRules:GetGameTime() + 10.0,
        bDeleteOnHit = false,
        vVelocity = direction * arrow_speed,
        bProvidesVision = true,
        iVisionRadius = 300,
        iVisionTeamNumber = caster:GetTeamNumber(),
    }
    
    ProjectileManager:CreateLinearProjectile(projectile_info)
    
    -- 播放施法音效
    EmitSoundOn("Hero_Windrunner.PowershotPull", caster)
    
    -- 播放施法特效
    self:PlayCastEffects()
end

function windrunner_powershot:OnProjectileHit(target, location)
    if not target then return false end
    
    local caster = self:GetCaster()
    local damage = self:GetSpecialValueFor("arrow_damage")
    local damage_reduction = self:GetSpecialValueFor("damage_reduction_per_target")
    
    -- 计算实际伤害（这里简化处理，实际应该根据穿透的目标数量计算）
    local actual_damage = damage
    
    -- 应用伤害
    local damage_table = {
        attacker = caster,
        damage = actual_damage,
        damage_type = DAMAGE_TYPE_MAGICAL,
        ability = self,
        victim = target,
    }
    
    ApplyDamage(damage_table)
    
    -- 播放击中特效
    self:PlayHitEffects(target)
    
    -- 播放击中音效
    EmitSoundOn("Hero_Windrunner.PowershotDamage", target)
    
    return false -- 不停止投射物，继续穿透
end

function windrunner_powershot:PlayCastEffects()
    local caster = self:GetCaster()
    local particle = "particles/heros/windrunner/windrunner_spell_powershot_channel.vpcf"
    
    local effect = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, caster)
    ParticleManager:ReleaseParticleIndex(effect)
end

function windrunner_powershot:PlayHitEffects(target)
    local particle = "particles/heros/windrunner/windrunner_spell_powershot_destruction.vpcf"
    
    local effect = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, target)
    ParticleManager:ReleaseParticleIndex(effect)
end

-- 技能预加载
function windrunner_powershot:Precache(context)
    PrecacheResource("particle", "particles/heros/windrunner/windrunner_spell_powershot.vpcf", context)
    PrecacheResource("particle", "particles/heros/windrunner/windrunner_spell_powershot_channel.vpcf", context)
    PrecacheResource("particle", "particles/heros/windrunner/windrunner_spell_powershot_destruction.vpcf", context)
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_windrunner.vsndevts", context)
end 