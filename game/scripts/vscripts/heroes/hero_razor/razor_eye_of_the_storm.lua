-- razor_eye_of_the_storm.lua
-- 风暴之眼技能：持续3秒，每1秒对9999范围内的1名随机敌人造成120点魔法伤害
-- razor身上的粒子特效为razor_rain_storm（头顶，跟随移动）
-- 敌人被闪电击中时使用Zeus的雷击粒子特效

razor_eye_of_the_storm = class({})

-- 自走棋式自动施法功能
function razor_eye_of_the_storm:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            local current_time = GameRules:GetGameTime()
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                    caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                    self.last_cast_time = current_time
                end
            end
            return 0.1
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function razor_eye_of_the_storm:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local caster_pos = caster:GetAbsOrigin()
    
    -- 获取技能参数
    local duration = self:GetSpecialValueFor("duration") or 3.0
    local damage_interval = self:GetSpecialValueFor("damage_interval") or 1.0
    local damage = self:GetSpecialValueFor("damage") or 120
    local target_range = self:GetSpecialValueFor("target_range") or 9999
    
    -- 创建razor身上的粒子特效（头顶，跟随移动）
    local caster_particle = ParticleManager:CreateParticle(
        "particles/heroes/razor/razor_rain_storm.vpcf",
        PATTACH_OVERHEAD_FOLLOW,
        caster
    )
    
    -- 创建风暴数据
    local storm_data = {
        caster = caster,
        ability = self,
        caster_particle = caster_particle,
        duration = duration,
        damage_interval = damage_interval,
        damage = damage,
        target_range = target_range,
        start_time = GameRules:GetGameTime(),
        next_strike_time = GameRules:GetGameTime()
    }
    
    -- 启动Think函数来持续造成伤害
    local think_name = "EyeOfTheStormThink_" .. GameRules:GetGameTime() .. "_" .. math.random(10000)
    GameRules:GetGameModeEntity():SetThink(function()
        return EyeOfTheStormThink(storm_data)
    end, think_name, 0.1)
end

-- 全局Think函数：持续造成伤害
function EyeOfTheStormThink(data)
    if not data or not data.caster or not IsValidEntity(data.caster) then
        -- 清理粒子特效
        if data and data.caster_particle and data.caster_particle ~= -1 then
            ParticleManager:DestroyParticle(data.caster_particle, false)
            ParticleManager:ReleaseParticleIndex(data.caster_particle)
        end
        return nil
    end
    
    local caster = data.caster
    local ability = data.ability
    local current_time = GameRules:GetGameTime()
    local elapsed_time = current_time - data.start_time
    
    -- 检查持续时间是否结束
    if elapsed_time >= data.duration then
        -- 清理粒子特效
        if data.caster_particle and data.caster_particle ~= -1 then
            ParticleManager:DestroyParticle(data.caster_particle, false)
            ParticleManager:ReleaseParticleIndex(data.caster_particle)
        end
        return nil
    end
    
    -- 检查是否到了下一次闪电攻击的时间
    if current_time >= data.next_strike_time then
        -- 确保在Think函数开始时获取最新的caster位置
        if not IsValidEntity(caster) or caster:IsNull() then
            return 0.1
        end
        
        -- 获取caster当前位置（每次Think都重新获取）
        local caster_pos = caster:GetAbsOrigin()
        
        -- 验证位置是否有效
        if not caster_pos or (caster_pos.x == 0 and caster_pos.y == 0 and caster_pos.z == 0) then
            return 0.1
        end
        
        -- 查找范围内的所有敌人
        local enemies = FindUnitsInRadius(
            caster:GetTeamNumber(),
            caster_pos,
            nil,
            data.target_range,
            DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        -- 随机选择一个敌人
        if #enemies > 0 then
            local random_index = math.random(1, #enemies)
            local target = enemies[random_index]
            
            if IsValidEntity(target) and not target:IsNull() and target:IsAlive() then
                -- 创建闪电粒子特效（从razor头顶到目标）
                local target_pos = target:GetAbsOrigin()
                
                -- 计算razor头顶位置（确保使用最新的位置）
                -- 使用Vector构造函数创建新的Vector对象
                local caster_head_pos = Vector(caster_pos.x, caster_pos.y, caster_pos.z + 150)
                
                -- 验证位置是否有效
                if not caster_head_pos or (caster_head_pos.x == 0 and caster_head_pos.y == 0 and caster_head_pos.z == 0) then
                    return 0.1
                end
                
                -- 创建闪电粒子特效
                -- 使用Zeus的雷击开始特效（zuus_thundergods_wrath_start.vpcf）
                local lightning_particle = ParticleManager:CreateParticle(
                    "particles/heroes/zeus/zuus_thundergods_wrath_start.vpcf",
                    PATTACH_WORLDORIGIN,
                    nil
                )
                if lightning_particle ~= -1 then
                    -- Control 0: 起始位置（razor头顶的世界坐标）
                    ParticleManager:SetParticleControl(lightning_particle, 0, caster_head_pos)
                    -- Control 1: 目标位置（敌人位置）
                    ParticleManager:SetParticleControl(lightning_particle, 1, target_pos)
                end
                
                -- 造成伤害
                local damage_table = {
                    victim = target,
                    attacker = caster,
                    damage = data.damage,
                    damage_type = DAMAGE_TYPE_MAGICAL,
                    ability = ability
                }
                ApplyDamage(damage_table)
                
                -- 播放音效
                EmitSoundOn("Hero_Razor.StaticLink.Attach", caster)
                EmitSoundOn("Hero_Razor.StaticLink.Target", target)
            end
        end
        
        -- 设置下一次攻击时间
        data.next_strike_time = current_time + data.damage_interval
    end
    
    return 0.1
end

