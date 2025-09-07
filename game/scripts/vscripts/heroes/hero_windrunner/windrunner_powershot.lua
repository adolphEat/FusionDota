-- 风行者-强力击（修改版）
-- 基于原版风行者的强力击，但修改了一些数值
-- 支持自走棋式自动释放：当Mana回满时自动寻找3000距离内最近的敌方单位

windrunner_powershot = class({})

LinkLuaModifier("modifier_windrunner_powershot_debuff", "heroes/hero_windrunner/windrunner_powershot.lua", LUA_MODIFIER_MOTION_NONE)

function windrunner_powershot:GetBehavior()
    return DOTA_ABILITY_BEHAVIOR_POINT
end

function windrunner_powershot:GetCastRange(location, target)
    return self:GetSpecialValueFor("arrow_range")
end

function windrunner_powershot:GetCooldown(level)
    return 0 -- 无冷却时间
end

function windrunner_powershot:GetManaCost(level)
    return 80 -- 固定80点Mana消耗
end

function windrunner_powershot:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 启动自走棋式自动释放检查定时器
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0 -- 添加冷却时间记录
        
        -- 使用Dota 2内置的定时器系统
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return -- 停止定时器
            end
            
            -- 检查冷却时间（防止频繁尝试）
            local current_time = GameRules:GetGameTime()
            if current_time - self.last_cast_time < 1.0 then
                return 0.1 -- 继续定时器，但跳过这次检查
            end
            
            -- 检查Mana是否回满（达到最大Mana值）
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            -- 调试信息（减少输出频率）
            if current_mana >= max_mana then
                print("Auto Cast Check - Mana Full! Current:", current_mana, "Max:", max_mana, "IsFullyCastable:", self:IsFullyCastable())
            end
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local nearest_enemy_pos = self:FindNearestEnemy()
                if nearest_enemy_pos then
                    print("Auto Cast: Found enemy, casting skill!")
                    -- 检查是否已经在施法
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        print("Auto Cast: Attempting to cast skill...")
                        -- 直接释放技能，让Dota 2自动处理Mana消耗
                        caster:CastAbilityOnPosition(nearest_enemy_pos, self, caster:GetPlayerOwnerID())
                        self.last_cast_time = current_time -- 记录释放时间
                    else
                        print("Auto Cast: Caster is channeling/silenced/stunned")
                    end
                else
                    print("Auto Cast: No enemy found")
                end
            end
            
            -- 继续定时器
            return 0.1 -- 每0.1秒检查一次
        end
        
        -- 启动定时器
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function windrunner_powershot:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local point = self:GetCursorPosition()
    
    -- 重置穿透计数
    self.penetration_count = 0
    
    -- Dota 2会自动处理Mana消耗，不需要手动检查
    
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
        EffectName = "particles/heroes/windrunner/windrunner_spell_powershot.vpcf",
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
    
    -- 强制恢复角色状态，确保能继续攻击
    caster:Stop()
    caster:MoveToPosition(caster:GetAbsOrigin())
end

function windrunner_powershot:FindNearestEnemy()
    local caster = self:GetCaster()
    local range = self:GetSpecialValueFor("auto_cast_range")
    
    -- 寻找范围内最近的敌方单位
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
        return enemies[1]:GetAbsOrigin()
    end
    
    return nil
end


function windrunner_powershot:OnProjectileHit(target, location)
    if not target then return false end
    
    local caster = self:GetCaster()
    local damage = self:GetSpecialValueFor("arrow_damage")
    local damage_reduction = self:GetSpecialValueFor("damage_reduction_per_target")
    
    -- 初始化穿透计数
    if not self.penetration_count then
        self.penetration_count = 0
    end
    
    -- 增加穿透计数
    self.penetration_count = self.penetration_count + 1
    
    -- 计算实际伤害（每穿透一个目标减少伤害）
    local actual_damage = damage - (self.penetration_count - 1) * damage_reduction
    actual_damage = math.max(actual_damage, 0) -- 确保伤害不为负数
    
    print("Powershot hit target", self.penetration_count, "damage:", actual_damage, "original:", damage)
    
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
    local particle = "particles/heroes/windrunner/windrunner_spell_powershot_channel.vpcf"
    
    local effect = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, caster)
    ParticleManager:ReleaseParticleIndex(effect)
end

function windrunner_powershot:PlayHitEffects(target)
    local particle = "particles/heroes/windrunner/windrunner_spell_powershot_destruction.vpcf"
    
    local effect = ParticleManager:CreateParticle(particle, PATTACH_ABSORIGIN_FOLLOW, target)
    ParticleManager:ReleaseParticleIndex(effect)
end

-- 技能预加载
function windrunner_powershot:Precache(context)
    PrecacheResource("particle", "particles/heroes/windrunner/windrunner_spell_powershot.vpcf", context)
    PrecacheResource("particle", "particles/heroes/windrunner/windrunner_spell_powershot_channel.vpcf", context)
    PrecacheResource("particle", "particles/heroes/windrunner/windrunner_spell_powershot_destruction.vpcf", context)
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_windrunner.vsndevts", context)
end 