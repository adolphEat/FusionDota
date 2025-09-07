-- Enigma Black Hole Ability
-- 基于Dota2原版enigma_black_hole技能实现，但改为减攻速效果

-- 黑洞思考函数 - 必须在全局作用域
function BlackHoleThink(thinker)
    if not IsValidEntity(thinker) then
        print("Thinker is invalid, stopping think")
        return nil
    end
    
    local current_time = GameRules:GetGameTime()
    local elapsed_time = current_time - thinker.start_time
    
    if elapsed_time >= thinker.duration then
        -- 清理粒子效果
        if thinker.particle and thinker.particle ~= -1 then
            ParticleManager:DestroyParticle(thinker.particle, false)
            ParticleManager:ReleaseParticleIndex(thinker.particle)
        end
        -- 移除thinker
        thinker:RemoveSelf()
        return nil
    end
    
    local radius = thinker.radius or 900
    local total_damage = thinker.total_damage or 1000 -- 从技能获取总伤害
    local caster = thinker.caster
    local ability = thinker.ability
    
    if not caster or not ability then
        return 0.1
    end
    
    -- 参考其他技能的单位检测方式
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        thinker:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    
    -- 对敌人造成伤害和减攻速效果
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and not enemy:IsNull() and enemy:IsAlive() then
            -- 检查是否直接击杀（生命值小于最大生命值的10%）
            local current_health = enemy:GetHealth()
            local max_health = enemy:GetMaxHealth()
            local health_percentage = (current_health / max_health) * 100
            
            if health_percentage <= 10 then
                -- 直接击杀
                local kill_damage_table = {
                    victim = enemy,
                    attacker = caster,
                    damage = max_health * 2, -- 确保击杀
                    damage_type = DAMAGE_TYPE_PURE,
                    ability = ability
                }
                ApplyDamage(kill_damage_table)
            else
                -- 计算累计伤害（每0.1秒递增）
                local damage_per_tick = total_damage * 0.1 / thinker.duration -- 每0.1秒的伤害
                local damage_table = {
                    victim = enemy,
                    attacker = caster,
                    damage = damage_per_tick,
                    damage_type = DAMAGE_TYPE_MAGICAL,
                    ability = ability
                }
                ApplyDamage(damage_table)
                
                -- 应用减攻速效果（替换拖拽效果）
                enemy:AddNewModifier(caster, ability, "modifier_enigma_black_hole_slow", {duration = 0.2})
            end
        end
    end
    
    return 0.1 -- 每0.1秒执行一次
end

enigma_black_hole = class({})

LinkLuaModifier("modifier_enigma_black_hole_slow", "heroes/hero_enigma/enigma_black_hole.lua", LUA_MODIFIER_MOTION_NONE)

-- 自走棋式自动施法功能
function enigma_black_hole:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 启动自动施法检查
    self:StartAutoCastCheck()
end

function enigma_black_hole:StartAutoCastCheck()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 使用GameRules的SetThink来创建定时检查
    GameRules:GetGameModeEntity():SetThink(function()
        if not caster or caster:IsNull() or not caster:IsAlive() then
            return nil -- 停止检查
        end
        
        -- 检查是否满足自动施法条件
        self:CheckAutoCast()
        
        return 0.5 -- 每0.5秒检查一次
    end, "enigma_black_hole_auto_cast_" .. caster:GetEntityIndex())
end

function enigma_black_hole:CheckAutoCast()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() or not caster:IsAlive() then return end
    
    -- 检查是否正在引导
    if caster:IsChanneling() then
        return
    end
    
    -- 检查是否正在尝试施法（防重复）
    if self.is_trying_to_cast then
        return
    end
    
    -- 检查技能是否可用
    if not self:IsFullyCastable() then
        return
    end
    
    -- 检查蓝量是否足够
    local mana_cost = self:GetManaCost(self:GetLevel())
    local current_mana = caster:GetMana()
    
    if current_mana >= mana_cost then
        -- 检查是否已经在冷却中或正在施法
        if not caster:IsSilenced() and not caster:IsStunned() then
            -- 查找最远的敌方单位
            local target = self:FindFarthestEnemy()
            if target then
                self:AutoCastOnTarget(target)
            end
        end
    end
end

function enigma_black_hole:FindFarthestEnemy()
    if not IsServer() then return nil end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return nil end
    
    local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
    local caster_pos = caster:GetAbsOrigin()
    local farthest_enemy = nil
    local max_distance = 0
    
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster_pos,
        nil,
        auto_cast_range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and enemy:IsAlive() then
            local distance = (enemy:GetAbsOrigin() - caster_pos):Length()
            if distance > max_distance then
                max_distance = distance
                farthest_enemy = enemy
            end
        end
    end
    
    return farthest_enemy
end

function enigma_black_hole:AutoCastOnTarget(target)
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() or not caster:IsAlive() then return end
    if not target or target:IsNull() or not target:IsAlive() then return end
    
    -- 设置正在尝试施法标志
    self.is_trying_to_cast = true
    
    -- 设置自动施法目标
    self.auto_cast_target = target
    
    -- 使用CastAbilityOnPosition来释放技能
    caster:CastAbilityOnPosition(target:GetAbsOrigin(), self, caster:GetPlayerOwnerID())
    
    -- 对于引导技能，不要立即重置状态，让技能正常引导
end

function enigma_black_hole:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local target_point = self:GetCursorPosition()
    
    -- 如果是自动施法，使用最远敌人位置
    if self.auto_cast_target then
        target_point = self.auto_cast_target:GetAbsOrigin()
        self.auto_cast_target = nil -- 清除自动施法目标
    end
    
    -- 清除正在尝试施法标志
    self.is_trying_to_cast = false
    
    local radius = self:GetSpecialValueFor("radius")
    local duration = self:GetSpecialValueFor("duration")
    local total_damage = self:GetSpecialValueFor("total_damage")
    
    
    -- 创建黑洞效果 - 使用黑洞的粒子特效
    local particle = ParticleManager:CreateParticle("particles/heroes/enigma/enigma_blackhole.vpcf", PATTACH_WORLDORIGIN, nil)
    if particle ~= -1 then
        -- Control 0: 位置
        ParticleManager:SetParticleControl(particle, 0, target_point)
        -- Control 1: 大小 (半径)
        ParticleManager:SetParticleControl(particle, 1, Vector(radius, 0, 0))
        -- Control 2: 额外参数 (可能需要设置高度或其他参数)
        ParticleManager:SetParticleControl(particle, 2, Vector(0, 0, 0))
        -- Control 3: 持续时间或其他参数
        ParticleManager:SetParticleControl(particle, 3, Vector(duration, 0, 0))
        
        print("Black Hole Particle: Radius set to", radius)
    end
    
    -- 保存粒子引用到技能实例中
    self.particle = particle
    self.target_point = target_point
    
    -- 播放音效
    EmitSoundOnLocationWithCaster(target_point, "Ability.Black_Hole", caster)
    
    -- 创建黑洞区域
    local black_hole_thinker = CreateUnitByName("npc_dota_thinker", target_point, false, caster, caster, caster:GetTeamNumber())
    if not black_hole_thinker then
        -- 尝试使用CreateUnitByName的替代方法
        black_hole_thinker = CreateUnitByName("npc_dota_thinker", target_point, false, nil, nil, caster:GetTeamNumber())
    end
    
    if black_hole_thinker and IsValidEntity(black_hole_thinker) then
        -- 设置黑洞区域属性
        black_hole_thinker.radius = radius
        black_hole_thinker.total_damage = total_damage
        black_hole_thinker.duration = duration
        black_hole_thinker.caster = caster
        black_hole_thinker.ability = self
        black_hole_thinker.particle = particle
        black_hole_thinker.start_time = GameRules:GetGameTime()
        
        -- 保存thinker引用
        self.black_hole_thinker = black_hole_thinker
        
        -- 开始黑洞逻辑 - 使用SetThink，传入函数名字符串
        black_hole_thinker:SetThink("BlackHoleThink", 0.1)
    end
end

function enigma_black_hole:OnChannelFinish(bInterrupted)
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 无论是否中断，都要清理粒子效果
    if self.particle and self.particle ~= -1 then
        ParticleManager:DestroyParticle(self.particle, false)
        ParticleManager:ReleaseParticleIndex(self.particle)
    end
    
    -- 清理thinker
    if self.black_hole_thinker and IsValidEntity(self.black_hole_thinker) then
        self.black_hole_thinker:RemoveSelf()
    end
    
    -- 引导结束后重置单位状态，确保能继续正常攻击
    if caster and not caster:IsNull() and caster:IsAlive() then
        caster:Stop()
        caster:MoveToPosition(caster:GetAbsOrigin())
    end
end

function enigma_black_hole:OnChannelInterrupted()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 施法被中断时的处理
    if self.particle and self.particle ~= -1 then
        ParticleManager:DestroyParticle(self.particle, false)
        ParticleManager:ReleaseParticleIndex(self.particle)
    end
    
    -- 清理thinker
    if self.black_hole_thinker and IsValidEntity(self.black_hole_thinker) then
        self.black_hole_thinker:RemoveSelf()
    end
    
    -- 引导被中断后重置单位状态，确保能继续正常攻击
    if caster and not caster:IsNull() and caster:IsAlive() then
        caster:Stop()
        caster:MoveToPosition(caster:GetAbsOrigin())
    end
end

-- 黑洞减攻速修饰器 - 使用与ursa earthshock相同的减攻速数值
modifier_enigma_black_hole_slow = class({})

function modifier_enigma_black_hole_slow:IsHidden()
    return false
end

function modifier_enigma_black_hole_slow:IsDebuff()
    return true
end

function modifier_enigma_black_hole_slow:IsPurgable()
    return true
end

function modifier_enigma_black_hole_slow:OnCreated()
    if not IsServer() then return end
    
    -- 全等级都是30%的攻速减速
    self.attackspeed_slow = -30
end

function modifier_enigma_black_hole_slow:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_enigma_black_hole_slow:GetModifierAttackSpeedBonus_Constant()
    return self.attackspeed_slow or -20
end

function modifier_enigma_black_hole_slow:GetEffectName()
    return "particles/generic_gameplay/generic_slowed_cold.vpcf"
end

function modifier_enigma_black_hole_slow:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_enigma_black_hole_slow:GetEffectColor()
    return Vector(255, 0, 0) -- 红色减攻速效果
end
