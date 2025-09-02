-- death_prophet1_silence.lua
-- 沉默技能：对周围敌人造成沉默效果，阻止他们施放技能

death_prophet1_silence = class({})
LinkLuaModifier("modifier_death_prophet1_silence", "heroes/hero_death_prophet/death_prophet1_silence.lua", LUA_MODIFIER_MOTION_NONE)

function death_prophet1_silence:OnSpellStart()
    local caster = self:GetCaster()
    local target_point = self:GetCursorPosition()
    local silence_radius = self:GetSpecialValueFor("silence_radius")
    local silence_duration = self:GetSpecialValueFor("silence_duration")
    
    -- 查找目标点范围内的敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        target_point,
        nil,
        silence_radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 对每个敌人应用沉默效果
    for _, enemy in pairs(enemies) do
        enemy:AddNewModifier(caster, self, "modifier_death_prophet1_silence", {duration = silence_duration})
    end
    
    -- 创建沉默特效
    local silence_particle = ParticleManager:CreateParticle(
        "particles/heroes/deat_prophet/death_prophet_silence.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    ParticleManager:SetParticleControl(silence_particle, 0, target_point)
    ParticleManager:SetParticleControl(silence_particle, 1, Vector(silence_radius, 0, 0))
    ParticleManager:ReleaseParticleIndex(silence_particle)
    
    -- 播放施法音效
    EmitSoundOn("Hero_Death_Prophet.Silence", caster)
end

-- 沉默修改器
modifier_death_prophet1_silence = class({})

function modifier_death_prophet1_silence:IsHidden()
    return false
end

function modifier_death_prophet1_silence:IsDebuff()
    return true
end

function modifier_death_prophet1_silence:IsPurgable()
    return true
end

function modifier_death_prophet1_silence:OnCreated()
    if IsServer() then
        -- 创建沉默特效
        self.silence_particle = ParticleManager:CreateParticle(
            "particles/generic_gameplay/generic_silence.vpcf",
            PATTACH_OVERHEAD_FOLLOW,
            self:GetParent()
        )
        self:AddParticle(self.silence_particle, false, false, -1, false, false)
    end
end

function modifier_death_prophet1_silence:CheckState()
    return {
        [MODIFIER_STATE_SILENCED] = true
    }
end

function modifier_death_prophet1_silence:GetEffectName()
    return "particles/generic_gameplay/generic_silence.vpcf"
end

function modifier_death_prophet1_silence:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

function modifier_death_prophet1_silence:GetModifierName()
    return "modifier_death_prophet1_silence"
end
