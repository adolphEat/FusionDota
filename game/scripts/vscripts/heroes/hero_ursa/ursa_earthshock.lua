ursa_earthshock = class({})

LinkLuaModifier("modifier_ursa_earthshock_slow", "heroes/hero_ursa/ursa_earthshock.lua", LUA_MODIFIER_MOTION_NONE)

function ursa_earthshock:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local caster_pos = caster:GetAbsOrigin()
    
    -- 强制设置CD为0
    self:EndCooldown()
    
    -- 获取技能参数
    local damage = self:GetSpecialValueFor("earthshock_damage")
    local radius = self:GetSpecialValueFor("shock_radius")
    local slow_duration = 4.0
    
    print("Ursa Earthshock parameters - Damage:", damage, "Radius:", radius)
    print("Skill level:", self:GetLevel(), "Caster:", caster:GetUnitName())
    
    -- 播放施法音效
    EmitSoundOn("Hero_Ursa.Earthshock", caster)
    
    -- 直接执行地震效果
    self:PerformEarthshock(caster, caster_pos, radius, damage, slow_duration)
end

function ursa_earthshock:PerformEarthshock(caster, center_pos, radius, damage, slow_duration)
    if not IsServer() then return end
    
    print("Performing earthshock at position:", center_pos)
    
    -- 查找范围内的敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        center_pos,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    print("Found enemies in radius:", #enemies)
    
    -- 对敌人造成伤害和攻速降低
    for _, enemy in pairs(enemies) do
        if enemy:IsAlive() then
            print("Applying damage to enemy:", enemy:GetUnitName(), "Damage:", damage)
            
            -- 造成伤害
            local damage_table = {
                victim = enemy,
                attacker = caster,
                damage = damage,
                damage_type = DAMAGE_TYPE_PHYSICAL,
                ability = self
            }
            ApplyDamage(damage_table)
            
            -- 施加攻速降低效果
            enemy:AddNewModifier(caster, self, "modifier_ursa_earthshock_slow", {duration = slow_duration})
            
            -- 播放命中音效
            EmitSoundOn("Hero_Ursa.Earthshock.Target", enemy)
        end
    end
    
    -- 播放地震特效
    self:PlayEarthshockEffects(center_pos, radius)
end

function ursa_earthshock:PlayEarthshockEffects(center_pos, radius)
    -- 创建地震粒子特效
    local earthshock_particle = ParticleManager:CreateParticle("particles/heroes/ursa/ursa_earthshock.vpcf", PATTACH_WORLDORIGIN, nil)
    if earthshock_particle ~= -1 then
        ParticleManager:SetParticleControl(earthshock_particle, 0, center_pos)
        ParticleManager:SetParticleControl(earthshock_particle, 1, Vector(radius, 0, 0))
        ParticleManager:ReleaseParticleIndex(earthshock_particle)
    end
    
    -- 播放地震音效
    EmitSoundOnLocationWithCaster(center_pos, "Hero_Ursa.Earthshock.Impact", self:GetCaster())
end

-- 攻速降低效果modifier
modifier_ursa_earthshock_slow = class({})

function modifier_ursa_earthshock_slow:IsHidden() 
    return false 
end

function modifier_ursa_earthshock_slow:IsDebuff() 
    return true 
end

function modifier_ursa_earthshock_slow:IsPurgable() 
    return true 
end

function modifier_ursa_earthshock_slow:OnCreated()
    if not IsServer() then return end
    
    self.attackspeed_slow = self:GetAbility():GetSpecialValueFor("attackspeed_slow")
    self:SetDuration(4.0, true)
end

function modifier_ursa_earthshock_slow:OnRefresh()
    if not IsServer() then return end
    
    self.attackspeed_slow = self:GetAbility():GetSpecialValueFor("attackspeed_slow")
    self:SetDuration(4.0, true)
end

function modifier_ursa_earthshock_slow:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_ursa_earthshock_slow:GetModifierAttackSpeedBonus_Constant()
    return self.attackspeed_slow
end

function modifier_ursa_earthshock_slow:GetEffectName()
    return "particles/generic_gameplay/generic_slowed_cold.vpcf"
end

function modifier_ursa_earthshock_slow:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_ursa_earthshock_slow:GetEffectColor()
    return Vector(255, 0, 0) -- 红色攻速降低效果
end 