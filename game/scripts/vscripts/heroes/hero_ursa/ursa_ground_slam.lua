-- ursa_ground_slam.lua
-- 自走棋式技能：以自身为中心400距离内的敌人造成影响
-- 造成200点伤害，和持续5s的15%的攻速降低

LinkLuaModifier("modifier_ursa_ground_slam_slow", "heroes/hero_ursa/ursa_ground_slam.lua", LUA_MODIFIER_MOTION_NONE)

ursa_ground_slam = class({})

function ursa_ground_slam:GetCooldown(level)
    return 0 -- 确保技能没有冷却时间
end

function ursa_ground_slam:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            local current_time = GameRules:GetGameTime()
            -- 移除冷却时间限制，实现真正的0CD
            -- if current_time - self.last_cast_time < 1.0 then
            --     return 0.1
            -- end
            
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local has_enemies = self:HasEnemiesInRange()
                if has_enemies then
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                        self.last_cast_time = current_time
                    end
                end
            end
            return 0.1
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function ursa_ground_slam:HasEnemiesInRange()
    local caster = self:GetCaster()
    local radius = self:GetSpecialValueFor("slam_radius")
    
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    return #enemies > 0
end

function ursa_ground_slam:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local caster_pos = caster:GetAbsOrigin()
    
    local radius = self:GetSpecialValueFor("slam_radius")
    local damage = self:GetSpecialValueFor("ground_slam_damage")
    local slow_duration = self:GetSpecialValueFor("slow_duration")
    
    -- 播放音效
    EmitSoundOn("Hero_Ursa.Earthshock", caster)
    
    -- 创建粒子特效
    local particle = ParticleManager:CreateParticle(
        "particles/heroes/ursa/ursa_earthshock.vpcf",
        PATTACH_ABSORIGIN_FOLLOW,
        caster
    )
    ParticleManager:SetParticleControl(particle, 0, caster_pos)
    ParticleManager:SetParticleControl(particle, 1, Vector(radius, 0, 0))
    ParticleManager:ReleaseParticleIndex(particle)
    
    -- 查找范围内的所有敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster_pos,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    
    -- 对每个敌人造成伤害和攻速降低效果
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and enemy:IsAlive() then
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
            enemy:AddNewModifier(caster, self, "modifier_ursa_ground_slam_slow", {duration = slow_duration})
            
        end
    end
end

-- 攻速降低修饰符
modifier_ursa_ground_slam_slow = class({})

function modifier_ursa_ground_slam_slow:IsHidden()
    return false
end

function modifier_ursa_ground_slam_slow:IsDebuff()
    return true
end

function modifier_ursa_ground_slam_slow:IsPurgable()
    return true
end

function modifier_ursa_ground_slam_slow:OnCreated(params)
    if not IsServer() then return end
    
    self.ability = self:GetAbility()
    if not self.ability then 
        return 
    end
    
    self.attackspeed_slow = self.ability:GetSpecialValueFor("attackspeed_slow")
    
    if not self.attackspeed_slow then
        self.attackspeed_slow = 15
    end
    
end

function modifier_ursa_ground_slam_slow:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_ursa_ground_slam_slow:GetModifierAttackSpeedBonus_Constant()
    if not self.attackspeed_slow then
        return 0
    end
    return -self.attackspeed_slow
end

function modifier_ursa_ground_slam_slow:GetEffectName()
    return "particles/generic_gameplay/generic_slowed_cold.vpcf"
end

function modifier_ursa_ground_slam_slow:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end 

