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
        print("Black hole duration finished, cleaning up")
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
    
    print("=== Black Hole Think Executed (Elapsed:", elapsed_time, "/", thinker.duration, ") ===")
    print("Thinker position:", thinker:GetAbsOrigin())
    print("Radius:", radius, "Total damage:", total_damage)
    
    if not caster or not ability then
        print("Caster or ability is invalid")
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
    
    print("Found enemies in range:", #enemies)
    
    -- 如果没有找到敌人，尝试查找所有单位来调试
    if #enemies == 0 then
        local all_units = FindUnitsInRadius(
            caster:GetTeamNumber(),
            thinker:GetAbsOrigin(),
            nil,
            radius,
            DOTA_UNIT_TARGET_TEAM_BOTH,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        print("Total units in range (both teams):", #all_units)
        for i, unit in ipairs(all_units) do
            if IsValidEntity(unit) then
                print("Unit", i, ":", unit:GetUnitName(), "Team:", unit:GetTeamNumber(), "Position:", unit:GetAbsOrigin())
            end
        end
    end
    
    -- 对敌人造成伤害和减攻速效果
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and not enemy:IsNull() and enemy:IsAlive() then
            print("Processing enemy:", enemy:GetUnitName())
            
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
                print("Instantly killed", enemy:GetUnitName(), "due to low health (", health_percentage, "%)")
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
                print("Applied damage to", enemy:GetUnitName(), ":", damage_per_tick, "Health remaining:", health_percentage, "%")
                
                -- 应用减攻速效果（替换拖拽效果）
                enemy:AddNewModifier(caster, ability, "modifier_enigma_black_hole_slow", {duration = 0.2})
                print("Applied attack speed slow to", enemy:GetUnitName())
            end
        end
    end
    
    return 0.1 -- 每0.1秒执行一次
end

enigma_black_hole = class({})

LinkLuaModifier("modifier_enigma_black_hole_slow", "heroes/hero_enigma/enigma_black_hole.lua", LUA_MODIFIER_MOTION_NONE)

function enigma_black_hole:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local target_point = self:GetCursorPosition()
    local radius = self:GetSpecialValueFor("radius")
    local duration = self:GetSpecialValueFor("duration")
    local total_damage = self:GetSpecialValueFor("total_damage")
    
    print("=== Enigma Black Hole Started ===")
    print("Target point:", target_point)
    print("Radius:", radius)
    print("Duration:", duration)
    print("Total damage:", total_damage)
    print("Caster team:", caster:GetTeamNumber())
    print("Caster position:", caster:GetAbsOrigin())
    
    -- 创建黑洞效果 - 使用黑洞的粒子特效
    local particle = ParticleManager:CreateParticle("particles/heroes/enigma/enigma_blackhole.vpcf", PATTACH_WORLDORIGIN, nil)
    if particle ~= -1 then
        ParticleManager:SetParticleControl(particle, 0, target_point)
        ParticleManager:SetParticleControl(particle, 1, Vector(radius, 0, 0))
        print("Particle created successfully:", particle)
    else
        print("Failed to create particle")
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
        print("Black hole thinker created successfully, entity index:", black_hole_thinker:GetEntityIndex())
        
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
        
        print("Black hole thinker started with SetThink")
    else
        print("Failed to create black hole thinker")
        if black_hole_thinker then
            print("Thinker object exists but is invalid")
        else
            print("Thinker object is nil")
        end
    end
end

function enigma_black_hole:OnChannelFinish(bInterrupted)
    if not IsServer() then return end
    
    print("=== Enigma Black Hole Channel Finished ===")
    print("Interrupted:", bInterrupted)
    
    -- 无论是否中断，都要清理粒子效果
    if self.particle and self.particle ~= -1 then
        ParticleManager:DestroyParticle(self.particle, false)
        ParticleManager:ReleaseParticleIndex(self.particle)
        print("Particle destroyed on channel finish")
    end
    
    -- 清理thinker
    if self.black_hole_thinker and IsValidEntity(self.black_hole_thinker) then
        self.black_hole_thinker:RemoveSelf()
        print("Black hole thinker removed on channel finish")
    end
end

function enigma_black_hole:OnChannelInterrupted()
    if not IsServer() then return end
    
    print("=== Enigma Black Hole Channel Interrupted ===")
    
    -- 施法被中断时的处理
    if self.particle and self.particle ~= -1 then
        ParticleManager:DestroyParticle(self.particle, false)
        ParticleManager:ReleaseParticleIndex(self.particle)
        print("Particle destroyed due to interruption")
    end
    
    -- 清理thinker
    if self.black_hole_thinker and IsValidEntity(self.black_hole_thinker) then
        self.black_hole_thinker:RemoveSelf()
        print("Black hole thinker removed due to interruption")
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
    
    print("Applied attack speed slow:", self.attackspeed_slow)
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
