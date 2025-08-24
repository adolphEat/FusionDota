lina_light_strike_array = class({})

LinkLuaModifier("modifier_lina_light_strike_array_burn", "heroes/hero_lina/lina_light_strike_array.lua", LUA_MODIFIER_MOTION_NONE)

function lina_light_strike_array:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local target = self:GetCursorTarget()
    
    if not target then
        print("No target selected for lina_light_strike_array")
        return
    end
    
    -- 获取技能参数
    local direct_damage = self:GetSpecialValueFor("light_strike_array_damage")
    local radius = self:GetSpecialValueFor("light_strike_array_aoe")
    local delay_time = self:GetSpecialValueFor("light_strike_array_delay_time")
    local burn_duration = self:GetSpecialValueFor("light_strike_array_burn_duration")
    local burn_damage_percent = self:GetSpecialValueFor("light_strike_array_burn_damage_percent")
    local mana_restore = self:GetSpecialValueFor("light_strike_array_mana_restore")
    
    print("Lina Light Strike Array parameters - Direct damage:", direct_damage, "Radius:", radius, "Delay:", delay_time)
    print("Burn damage percent:", burn_damage_percent, "Burn duration:", burn_duration, "Mana restore:", mana_restore)
    print("Skill level:", self:GetLevel(), "Caster:", caster:GetUnitName(), "Target:", target:GetUnitName())
    
    -- 播放施法音效
    EmitSoundOn("Ability.LightStrikeArray", caster)
    
    -- 创建延迟的伤害效果
    local function delayed_damage()
        if not IsServer() then return end
        
        local target_pos = target:GetAbsOrigin()
        print("Executing delayed damage at target position:", target_pos)
        
        -- 查找以目标为中心的AOE范围内的敌人
        local enemies = FindUnitsInRadius(
            caster:GetTeamNumber(),
            target_pos,
            nil,
            radius,
            DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        print("Found enemies in radius:", #enemies)
        
        -- 对目标单位造成直接伤害和灼烧效果（无论是否为敌人）
        if target:IsAlive() then
            print("Applying direct damage to target:", target:GetUnitName(), "Damage:", direct_damage)
            
            -- 造成直接伤害
            local damage_table = {
                victim = target,
                attacker = caster,
                damage = direct_damage,
                damage_type = DAMAGE_TYPE_MAGICAL,
                ability = self
            }
            ApplyDamage(damage_table)
            
            -- 施加灼烧效果
            target:AddNewModifier(caster, self, "modifier_lina_light_strike_array_burn", {duration = burn_duration})
            
            -- 播放命中音效
            EmitSoundOn("Hero_Lina.LightStrikeArray.Target", target)
        end
        
        -- 对AOE范围内的敌人造成直接伤害和灼烧效果
        for _, enemy in pairs(enemies) do
            if enemy:IsAlive() and enemy ~= target then
                print("Applying direct damage to enemy:", enemy:GetUnitName(), "Damage:", direct_damage)
                
                -- 造成直接伤害
                local damage_table = {
                    victim = enemy,
                    attacker = caster,
                    damage = direct_damage,
                    damage_type = DAMAGE_TYPE_MAGICAL,
                    ability = self
                }
                ApplyDamage(damage_table)
                
                -- 施加灼烧效果
                enemy:AddNewModifier(caster, self, "modifier_lina_light_strike_array_burn", {duration = burn_duration})
                
                -- 播放命中音效
                EmitSoundOn("Hero_Lina.LightStrikeArray.Target", enemy)
            end
        end
        
        -- 播放特效
        self:PlayEffects(target_pos, radius)
    end
    
    -- 延迟执行伤害
    GameRules:GetGameModeEntity():SetThink(delayed_damage, "delayed_damage", delay_time)
    
    -- 播放预警特效
    self:PlayWarningEffects(target:GetAbsOrigin(), radius, delay_time)
end

function lina_light_strike_array:PlayWarningEffects(point, radius, delay_time)
    -- 创建预警粒子特效
    local warning_particle = ParticleManager:CreateParticle("particles/heroes/lina/lina_spell_light_strike_array.vpcf", PATTACH_WORLDORIGIN, nil)
    if warning_particle ~= -1 then
        ParticleManager:SetParticleControl(warning_particle, 0, point)
        ParticleManager:SetParticleControl(warning_particle, 1, Vector(radius, 0, 0))
        ParticleManager:SetParticleControl(warning_particle, 2, Vector(delay_time, 0, 0))
        ParticleManager:ReleaseParticleIndex(warning_particle)
    end
    
    -- 播放预警音效
    EmitSoundOnLocationWithCaster(point, "Hero_Lina.LightStrikeArray.PreCast", self:GetCaster())
end

function lina_light_strike_array:PlayEffects(point, radius)
    -- 创建爆炸粒子特效
    local explosion_particle = ParticleManager:CreateParticle("particles/heroes/lina/lina_spell_light_strike_array.vpcf", PATTACH_WORLDORIGIN, nil)
    if explosion_particle ~= -1 then
        ParticleManager:SetParticleControl(explosion_particle, 0, point)
        ParticleManager:SetParticleControl(explosion_particle, 1, Vector(radius, 0, 0))
        ParticleManager:SetParticleControl(explosion_particle, 2, Vector(0, 0, 0)) -- 爆炸效果
        ParticleManager:ReleaseParticleIndex(explosion_particle)
    end
    
    -- 播放爆炸音效
    EmitSoundOnLocationWithCaster(point, "Hero_Lina.LightStrikeArray.Explosion", self:GetCaster())
end

-- 灼烧效果modifier
modifier_lina_light_strike_array_burn = class({})

function modifier_lina_light_strike_array_burn:IsHidden() 
    return false 
end

function modifier_lina_light_strike_array_burn:IsDebuff() 
    return true 
end

function modifier_lina_light_strike_array_burn:IsPurgable() 
    return true 
end

function modifier_lina_light_strike_array_burn:OnDestroy()
    if not IsServer() then return end
    
    -- 清理灼烧标记特效
    if self.burn_mark_particle and self.burn_mark_particle ~= -1 then
        ParticleManager:DestroyParticle(self.burn_mark_particle, false)
        ParticleManager:ReleaseParticleIndex(self.burn_mark_particle)
        self.burn_mark_particle = nil
    end
end

function modifier_lina_light_strike_array_burn:OnCreated()
    if not IsServer() then return end
    
    self.burn_damage_percent = self:GetAbility():GetSpecialValueFor("light_strike_array_burn_damage_percent")
    self.burn_interval = self:GetAbility():GetSpecialValueFor("light_strike_array_burn_interval")
    self.mana_restore = self:GetAbility():GetSpecialValueFor("light_strike_array_mana_restore")
    self.caster = self:GetCaster()
    self.ability = self:GetAbility()
    
    -- 创建灼烧标记特效
            self.burn_mark_particle = ParticleManager:CreateParticle("particles/generic_gameplay/huskar_burning_spear_debuff.vpcf", PATTACH_ABSORIGIN_FOLLOW, self:GetParent())
    if self.burn_mark_particle ~= -1 then
        ParticleManager:SetParticleControl(self.burn_mark_particle, 0, self:GetParent():GetAbsOrigin())
        ParticleManager:SetParticleControlEnt(self.burn_mark_particle, 1, self:GetParent(), PATTACH_ABSORIGIN_FOLLOW, "", self:GetParent():GetAbsOrigin(), true)
    end
    
    -- 开始灼烧伤害定时器
    self:StartIntervalThink(self.burn_interval)
end

function modifier_lina_light_strike_array_burn:OnRefresh()
    if not IsServer() then return end
    
    -- 刷新时重新获取参数
    self.burn_damage_percent = self:GetAbility():GetSpecialValueFor("light_strike_array_burn_damage_percent")
    self.burn_interval = self:GetAbility():GetSpecialValueFor("light_strike_array_burn_interval")
    self.mana_restore = self:GetAbility():GetSpecialValueFor("light_strike_array_mana_restore")
    
    -- 重新设置持续时间
    local burn_duration = self:GetAbility():GetSpecialValueFor("light_strike_array_burn_duration")
    self:SetDuration(burn_duration, true)
    
    -- 如果灼烧标记特效不存在，重新创建
    if not self.burn_mark_particle or self.burn_mark_particle == -1 then
        self.burn_mark_particle = ParticleManager:CreateParticle("particles/generic_gameplay/huskar_burning_spear_debuff.vpcf", PATTACH_ABSORIGIN_FOLLOW, self:GetParent())
        if self.burn_mark_particle ~= -1 then
            ParticleManager:SetParticleControl(self.burn_mark_particle, 0, self:GetParent():GetAbsOrigin())
            ParticleManager:SetParticleControlEnt(self.burn_mark_particle, 1, self:GetParent(), PATTACH_ABSORIGIN_FOLLOW, "", self:GetParent():GetAbsOrigin(), true)
        end
    end
end

function modifier_lina_light_strike_array_burn:OnIntervalThink()
    if not IsServer() then return end
    
    local parent = self:GetParent()
    if not parent:IsAlive() then return end
    
    -- 计算每次灼烧伤害（目标最大生命值的1%）
    local max_health = parent:GetMaxHealth()
    local damage_per_tick = max_health * (self.burn_damage_percent / 100.0)
    
    -- 造成灼烧伤害
    local damage_table = {
        victim = parent,
        attacker = self.caster,
        damage = damage_per_tick,
        damage_type = DAMAGE_TYPE_MAGICAL,
        ability = self.ability
    }
    
    -- 检查目标是否会被击杀
    local will_die = parent:GetHealth() <= damage_per_tick
    
    ApplyDamage(damage_table)
    
    -- 如果目标被灼烧效果击杀，恢复施法者的魔法值
    if will_die and parent:GetHealth() <= 0 then
        print("Target killed by burn effect, restoring mana to caster")
        self.caster:GiveMana(self.mana_restore)
        
        -- 显示回蓝效果
        SendOverheadEventMessage(nil, OVERHEAD_ALERT_MANA_ADD, self.caster, self.mana_restore, nil)
        
        -- 播放回蓝音效
        EmitSoundOn("Hero_Lina.LightStrikeArray.Target", self.caster)
    end
    
    -- 播放灼烧音效
    EmitSoundOn("Hero_Lina.LightStrikeArray.Target", parent)
end

function modifier_lina_light_strike_array_burn:GetEffectName()
    return "particles/generic_gameplay/huskar_burning_spear_debuff.vpcf"
end

function modifier_lina_light_strike_array_burn:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_lina_light_strike_array_burn:GetEffectColor()
    return Vector(255, 100, 0) -- 橙红色灼烧效果
end 