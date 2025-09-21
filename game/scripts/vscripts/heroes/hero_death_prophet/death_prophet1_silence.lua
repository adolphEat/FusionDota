-- death_prophet1_silence.lua
-- 沉默技能：以9999距离内最近的敌方单位为目标，对该目标为中心600距离内的敌方单位造成300点伤害和3秒沉默

death_prophet1_silence = class({})
LinkLuaModifier("modifier_death_prophet1_silence", "heroes/hero_death_prophet/death_prophet1_silence.lua", LUA_MODIFIER_MOTION_NONE)

-- 自走棋式自动施法功能
function death_prophet1_silence:OnCreated()
    if not IsServer() then return end
    print("Death Prophet Silence: OnCreated called")
end

function death_prophet1_silence:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    print("Death Prophet Silence: OnUpgrade called for", caster:GetUnitName())
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        print("Death Prophet Silence: Starting auto cast timer")
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            local current_time = GameRules:GetGameTime()
            if current_time - self.last_cast_time < 1.0 then
                return 0.5
            end
            
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            print("Death Prophet Silence Auto Cast Check - Mana:", current_mana, "Max:", max_mana, "IsFullyCastable:", self:IsFullyCastable())
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
                local nearest_enemy = self:FindNearestEnemy(caster, auto_cast_range)
                
                if nearest_enemy then
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        print("Death Prophet Silence: Auto casting skill!")
                        
                        local success = pcall(function()
                            caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                        end)
                        
                        if success then
                            self.last_cast_time = current_time
                            print("Death Prophet Silence: Auto cast successful!")
                        else
                            print("Death Prophet Silence: Auto cast failed!")
                        end
                    end
                end
            end
            
            return 0.5
        end
        
        -- 使用 Dota 2 原生的定时器系统
        local function StartTimer()
            CheckAutoCast()
            return 0.5
        end
        
        -- 启动定时器
        GameRules:GetGameModeEntity():SetThink(StartTimer, "DeathProphetSilenceAutoCast", 0.1)
    end
end

function death_prophet1_silence:OnSpellStart()
    print("=== DEATH PROPHET SILENCE OnSpellStart CALLED ===")
    local caster = self:GetCaster()
    local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
    local silence_radius = self:GetSpecialValueFor("silence_radius")
    local silence_duration = self:GetSpecialValueFor("silence_duration")
    local damage = self:GetSpecialValueFor("damage")
    
    print("Death Prophet Silence: Caster =", caster:GetUnitName())
    print("Death Prophet Silence: Auto cast range =", auto_cast_range)
    print("Death Prophet Silence: Silence radius =", silence_radius)
    
    -- 找到9999距离内最近的敌方单位
    local nearest_enemy = self:FindNearestEnemy(caster, auto_cast_range)
    
    if not nearest_enemy then
        print("Death Prophet Silence: No enemy found in range")
        return
    end
    
    print("Death Prophet Silence: Nearest enemy =", nearest_enemy:GetUnitName())
    
    -- 以最近敌人为中心，查找600距离内的所有敌方单位
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        nearest_enemy:GetAbsOrigin(),
        nil,
        silence_radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    print("Death Prophet Silence: Found", #enemies, "enemies in silence radius")
    
    -- 对每个敌人造成伤害和沉默效果
    for _, enemy in pairs(enemies) do
        -- 造成伤害
        local damage_table = {
            victim = enemy,
            attacker = caster,
            damage = damage,
            damage_type = DAMAGE_TYPE_MAGICAL,
            ability = self
        }
        ApplyDamage(damage_table)
        
        -- 应用沉默效果
        enemy:AddNewModifier(caster, self, "modifier_death_prophet1_silence", {duration = silence_duration})
        
        print("Death Prophet Silence: Damaged and silenced", enemy:GetUnitName(), "for", damage, "damage and", silence_duration, "seconds")
    end
    
    -- 创建沉默特效
    local silence_particle = ParticleManager:CreateParticle(
        "particles/heroes/death_prophet/death_prophet_silence.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    ParticleManager:SetParticleControl(silence_particle, 0, nearest_enemy:GetAbsOrigin())
    ParticleManager:SetParticleControl(silence_particle, 1, Vector(silence_radius, 0, 0))
    ParticleManager:ReleaseParticleIndex(silence_particle)
    
    -- 播放施法音效
    EmitSoundOn("Hero_Death_Prophet.Silence", caster)
    
    -- 重置单位状态，确保继续普通攻击
    caster:Stop()
    caster:MoveToPosition(caster:GetAbsOrigin())
end

-- 找到距离最近的敌方单位
function death_prophet1_silence:FindNearestEnemy(caster, radius)
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    print("Death Prophet Silence: Found", #enemies, "enemies in auto cast range", radius)
    
    if #enemies == 0 then
        print("Death Prophet Silence: No enemies found")
        return nil
    end
    
    local nearest_enemy = enemies[1]  -- FIND_CLOSEST 已经返回最近的敌人
    
    if nearest_enemy then
        local distance = (nearest_enemy:GetAbsOrigin() - caster:GetAbsOrigin()):Length()
        print("Death Prophet Silence: Nearest enemy is", nearest_enemy:GetUnitName(), "at distance", distance)
    end
    
    return nearest_enemy
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
