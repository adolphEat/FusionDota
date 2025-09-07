-- lina_light_strike_array.lua
-- 自走棋式技能：以9999距离内最近敌人为目标，对目标及400范围内敌人造成伤害和灼烧效果
-- 灼烧效果：每1秒造成最大生命值1%伤害，持续10秒
-- 击杀回蓝：任何单位被灼烧击杀时，lina恢复5点蓝量

LinkLuaModifier("modifier_lina_light_strike_array_burn", "heroes/hero_lina/lina_light_strike_array.lua", LUA_MODIFIER_MOTION_NONE)

lina_light_strike_array = class({})

function lina_light_strike_array:OnUpgrade()
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
            if current_time - self.last_cast_time < 1.0 then
                return 0.1
            end
            
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local nearest_enemy = self:FindNearestEnemy()
                if nearest_enemy then
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

function lina_light_strike_array:FindNearestEnemy()
    local caster = self:GetCaster()
    local range = self:GetSpecialValueFor("auto_cast_range")
    
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #enemies > 0 then
        return enemies[1]
    end
    
    return nil
end

function lina_light_strike_array:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 强制恢复角色状态，确保能继续攻击
    caster:Stop()
    caster:MoveToPosition(caster:GetAbsOrigin())
    
    -- 查找最近敌人
    local target = self:FindNearestEnemy()
    if not target then
        return
    end
    
    local target_pos = target:GetAbsOrigin()
    local aoe = self:GetSpecialValueFor("light_strike_array_aoe")
    local damage = self:GetSpecialValueFor("light_strike_array_damage")
    local delay = self:GetSpecialValueFor("light_strike_array_delay_time")
    
    -- 播放音效
    EmitSoundOn("Hero_Lina.LightStrikeArray.Cast", caster)
    
    -- 使用Dota 2的延迟机制
    local start_time = GameRules:GetGameTime()
    local function DelayedEffect()
        local current_time = GameRules:GetGameTime()
        if current_time - start_time >= delay then
            -- 播放命中音效
            EmitSoundOn("Hero_Lina.LightStrikeArray.Target", target)
            
            -- 创建粒子特效
            local particle = ParticleManager:CreateParticle(
                "particles/heroes/lina/lina_spell_light_strike_array.vpcf",
                PATTACH_ABSORIGIN_FOLLOW,
                target
            )
            ParticleManager:SetParticleControl(particle, 0, target_pos)
            ParticleManager:SetParticleControl(particle, 1, Vector(aoe, 0, 0))
            ParticleManager:ReleaseParticleIndex(particle)
            
            -- 查找范围内的所有敌人
            local enemies = FindUnitsInRadius(
                caster:GetTeamNumber(),
                target_pos,
                nil,
                aoe,
                DOTA_UNIT_TARGET_TEAM_ENEMY,
                DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
                DOTA_UNIT_TARGET_FLAG_NONE,
                FIND_ANY_ORDER,
                false
            )
            
            print("=== Lina Light Strike Array ===")
            print("Target:", target:GetUnitName())
            print("AOE:", aoe)
            print("Damage:", damage)
            print("Enemies in range:", #enemies)
            
            -- 对每个敌人造成伤害和灼烧效果
            for _, enemy in pairs(enemies) do
                if IsValidEntity(enemy) and enemy:IsAlive() then
                    -- 造成直接伤害
                    local damage_table = {
                        victim = enemy,
                        attacker = caster,
                        damage = damage,
                        damage_type = DAMAGE_TYPE_MAGICAL,
                        ability = self
                    }
                    ApplyDamage(damage_table)
                    
                    -- 施加灼烧效果
                    enemy:AddNewModifier(caster, self, "modifier_lina_light_strike_array_burn", {})
                    
                    print("Applied damage and burn to", enemy:GetUnitName())
                end
            end
            
            return nil -- 停止计时器
        end
        return 0.1 -- 继续检查
    end
    
    GameRules:GetGameModeEntity():SetThink(DelayedEffect, "DelayedEffect_" .. caster:GetEntityIndex(), 0.1)
end

-- 灼烧效果修饰符
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

function modifier_lina_light_strike_array_burn:OnCreated(params)
    if not IsServer() then return end
    
    self.ability = self:GetAbility()
    self.caster = self:GetCaster()
    self.parent = self:GetParent()
    
    if not self.ability then return end
    
    self.damage_percent = self.ability:GetSpecialValueFor("light_strike_array_burn_damage_percent")
    self.interval = self.ability:GetSpecialValueFor("light_strike_array_burn_interval")
    self.duration = self.ability:GetSpecialValueFor("light_strike_array_burn_duration")
    
    -- 设置修饰符持续时间
    self:SetDuration(self.duration, true)
    
    -- 开始灼烧计时器
    self:StartIntervalThink(self.interval)
    
    print("=== Burn modifier created ===")
    print("Target:", self.parent:GetUnitName())
    print("Damage percent:", self.damage_percent)
    print("Interval:", self.interval)
    print("Duration:", self.duration)
end

function modifier_lina_light_strike_array_burn:OnIntervalThink()
    if not IsServer() then return end
    
    if not IsValidEntity(self.parent) or not self.parent:IsAlive() then
        return
    end
    
    if not self.ability or not self.caster then
        return
    end
    
    -- 检查修饰符是否已过期
    if self:GetRemainingTime() <= 0 then
        return
    end
    
    -- 计算灼烧伤害（最大生命值的百分比）
    local max_health = self.parent:GetMaxHealth()
    local burn_damage = max_health * self.damage_percent / 100.0
    
    -- 造成灼烧伤害
    local damage_table = {
        victim = self.parent,
        attacker = self.caster,
        damage = burn_damage,
        damage_type = DAMAGE_TYPE_MAGICAL,
        ability = self.ability
    }
    
    -- 记录伤害前的生命值
    local health_before = self.parent:GetHealth()
    
    ApplyDamage(damage_table)
    
    -- 检查是否被灼烧击杀
    if not self.parent:IsAlive() then
        -- 恢复lina的蓝量
        local mana_restore = self.ability:GetSpecialValueFor("light_strike_array_mana_restore")
        self.caster:GiveMana(mana_restore)
        
        print("=== Burn kill detected ===")
        print("Killed by burn:", self.parent:GetUnitName())
        print("Mana restored to", self.caster:GetUnitName(), ":", mana_restore)
        
        -- 播放击杀音效
        EmitSoundOn("Hero_Lina.LightStrikeArray.Target", self.parent)
    end
    
    print("Burn damage to", self.parent:GetUnitName(), ":", burn_damage, "Health before:", health_before, "Health after:", self.parent:GetHealth())
end

function modifier_lina_light_strike_array_burn:GetEffectName()
    return "particles/generic_gameplay/lina_liphoenix_fire_spirit_burn.vpcf"
end

function modifier_lina_light_strike_array_burn:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end