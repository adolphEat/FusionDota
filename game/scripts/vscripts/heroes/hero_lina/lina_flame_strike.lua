-- lina_flame_strike.lua
-- 自走棋式技能：以9999距离内最近敌人为目标，对目标及400范围内敌人造成伤害和灼烧效果
-- 灼烧效果：每1秒造成最大生命值1%伤害，持续10秒
-- 击杀回蓝：任何单位被灼烧击杀时，lina恢复5点蓝量

LinkLuaModifier("modifier_lina_flame_strike_burn", "heroes/hero_lina/lina_flame_strike.lua", LUA_MODIFIER_MOTION_NONE)

lina_flame_strike = class({})

function lina_flame_strike:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            -- 移除冷却时间限制，实现真正的0CD
            local current_time = GameRules:GetGameTime()
            -- if current_time - self.last_cast_time < 1.0 then
            --     return 0.1
            -- end
            
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

function lina_flame_strike:FindNearestEnemy()
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

function lina_flame_strike:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 查找最近敌人
    local target = self:FindNearestEnemy()
    if not target then
        return
    end
    
    local target_pos = target:GetAbsOrigin()
    local aoe = self:GetSpecialValueFor("flame_strike_aoe")
    local damage = self:GetSpecialValueFor("flame_strike_damage")
    local delay = self:GetSpecialValueFor("flame_strike_delay_time")
    
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
                    enemy:AddNewModifier(caster, self, "modifier_lina_flame_strike_burn", {})
                    
                end
            end
            
            return nil -- 停止计时器
        end
        return 0.1 -- 继续检查
    end
    
    GameRules:GetGameModeEntity():SetThink(DelayedEffect, "DelayedEffect_" .. caster:GetEntityIndex(), 0.1)
end

-- 灼烧效果修饰符
modifier_lina_flame_strike_burn = class({})

function modifier_lina_flame_strike_burn:IsHidden()
    return false
end

function modifier_lina_flame_strike_burn:IsDebuff()
    return true
end

function modifier_lina_flame_strike_burn:IsPurgable()
    return true
end

function modifier_lina_flame_strike_burn:OnCreated(params)
    if not IsServer() then return end
    
    self.ability = self:GetAbility()
    self.caster = self:GetCaster()
    self.parent = self:GetParent()
    
    if not self.ability then return end
    
    -- 读取灼烧参数（统一使用flame_strike_burn_*参数名）
    self.damage_percent = self.ability:GetSpecialValueFor("flame_strike_burn_damage_percent") or 1.0
    self.interval = self.ability:GetSpecialValueFor("flame_strike_burn_interval") or 1.0
    self.duration = self.ability:GetSpecialValueFor("flame_strike_burn_duration") or 10.0
    
    -- 如果通过params传递了duration，使用传递的值
    if params.duration then
        self.duration = params.duration
    end
    
    -- 设置修饰符持续时间
    self:SetDuration(self.duration, true)
    
    -- 开始灼烧计时器
    self:StartIntervalThink(self.interval)
    
end

function modifier_lina_flame_strike_burn:OnIntervalThink()
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
        -- 查找所有lina单位并恢复蓝量（支持combo）
        local team = self.caster:GetTeamNumber()
        local all_allies = FindUnitsInRadius(
            team,
            self.caster:GetAbsOrigin(),
            nil,
            9999, -- 全地图范围
            DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        local mana_restore = self.ability:GetSpecialValueFor("flame_strike_mana_restore")
        if not mana_restore or mana_restore <= 0 then
            mana_restore = 5.0  -- 默认值
        end
        
        -- 为所有lina单位恢复蓝量
        for _, ally in pairs(all_allies) do
            if ally and not ally:IsNull() and ally:IsAlive() then
                local unit_name = ally:GetUnitName()
                if unit_name == "lina1" then
                    ally:GiveMana(mana_restore)
                end
            end
        end
        
        -- 播放击杀音效
        EmitSoundOn("Hero_Lina.LightStrikeArray.Target", self.parent)
    end
    
end

function modifier_lina_flame_strike_burn:GetEffectName()
    return "particles/generic_gameplay/phoenix_fire_spirit_burn.vpcf"
end

function modifier_lina_flame_strike_burn:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

