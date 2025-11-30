-- 治疗法球技能
-- 当敌人死亡时，治疗距离其最近的己方单位

LinkLuaModifier("modifier_healing_orb", "heroes/universal/healing_orb", LUA_MODIFIER_MOTION_NONE)

healing_orb = class({})

function healing_orb:GetIntrinsicModifierName()
    return "modifier_healing_orb"
end

-- 全局buff修饰器
modifier_healing_orb = class({})

function modifier_healing_orb:IsHidden()
    return true
end

function modifier_healing_orb:IsPurgable()
    return false
end

function modifier_healing_orb:OnCreated()
    if IsServer() then
        self.heal_amount = self:GetAbility():GetSpecialValueFor("heal_amount")
        print("Healing Orb: Global buff activated, heal amount:", self.heal_amount)
        
        -- 使用定期检查机制
        self:StartIntervalThink(0.5) -- 每0.5秒检查一次
        self.dead_units = {}
        self.last_check_time = 0
    end
end

function modifier_healing_orb:OnIntervalThink()
    if IsServer() then
        -- 直接检查所有单位
        self:CheckAllUnits()
    end
end

function modifier_healing_orb:CheckAllUnits()
    -- 获取所有单位（包括己方和敌方）
    local all_units = FindUnitsInRadius(
        DOTA_TEAM_NEUTRALS,
        Vector(0, 0, 0),
        nil,
        FIND_UNITS_EVERYWHERE,
        DOTA_UNIT_TARGET_TEAM_BOTH,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    local current_time = GameRules:GetGameTime()
    if current_time - self.last_check_time < 1.0 then
        return -- 限制输出频率
    end
    self.last_check_time = current_time
    
    local alive_enemies = 0
    local dead_enemies = 0
    
    -- 检查所有单位
    for _, unit in pairs(all_units) do
        if unit and not unit:IsNull() then
            if unit:GetTeam() == DOTA_TEAM_BADGUYS then
                if unit:IsAlive() then
                    alive_enemies = alive_enemies + 1
                else
                    dead_enemies = dead_enemies + 1
                    -- 检查这个单位是否已经处理过死亡
                    if not self.dead_units[unit] then
                        self.dead_units[unit] = true
                        print("Healing Orb: Found dead enemy:", unit:GetUnitName())
                        self:OnEnemyDeath(unit)
                    end
                end
            end
        end
    end
    
    -- 检查敌人数量变化
    if not self.last_enemy_count then
        self.last_enemy_count = alive_enemies
    end
    
    if self.last_enemy_count > alive_enemies then
        local enemies_killed = self.last_enemy_count - alive_enemies
        print("Healing Orb: Detected", enemies_killed, "enemies killed!")
        
        -- 尝试找到死亡的敌人位置（使用最后已知位置）
        if self.last_enemy_positions then
            for i = 1, enemies_killed do
                if self.last_enemy_positions[i] then
                    self:OnEnemyDeathAtPosition(self.last_enemy_positions[i])
                end
            end
        end
    end
    
    self.last_enemy_count = alive_enemies
    
    -- 记录当前敌人位置
    self.last_enemy_positions = {}
    for _, unit in pairs(all_units) do
        if unit and not unit:IsNull() and unit:GetTeam() == DOTA_TEAM_BADGUYS and unit:IsAlive() then
            table.insert(self.last_enemy_positions, unit:GetAbsOrigin())
        end
    end
    
    print("Healing Orb: Status - Alive enemies:", alive_enemies, "Dead enemies:", dead_enemies)
end

function modifier_healing_orb:OnEnemyDeath(dead_enemy)
    if IsServer() then
        print("Healing Orb: Enemy died:", dead_enemy:GetUnitName())
        
        -- 找到最近的己方单位
        local nearest_ally = self:FindNearestAlly(dead_enemy:GetAbsOrigin())
        
        if nearest_ally then
            print("Healing Orb: Healing nearest ally:", nearest_ally:GetUnitName())
            self:HealAlly(nearest_ally, dead_enemy:GetAbsOrigin())
        else
            print("Healing Orb: No allies found to heal")
        end
    end
end

function modifier_healing_orb:OnEnemyDeathAtPosition(death_position)
    if IsServer() then
        print("Healing Orb: Enemy died at position:", death_position)
        
        -- 找到最近的己方单位
        local nearest_ally = self:FindNearestAlly(death_position)
        
        if nearest_ally then
            print("Healing Orb: Healing nearest ally:", nearest_ally:GetUnitName())
            self:HealAlly(nearest_ally, death_position)
        else
            print("Healing Orb: No allies found to heal")
        end
    end
end

function modifier_healing_orb:FindNearestAlly(death_position)
    local allies = FindUnitsInRadius(
        DOTA_TEAM_GOODGUYS,
        death_position,
        nil,
        FIND_UNITS_EVERYWHERE,
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #allies > 0 then
        return allies[1]
    end
    
    return nil
end

function modifier_healing_orb:HealAlly(ally, death_position)
    if IsServer() then
        -- 计算实际治疗量（不能超过最大生命值）
        local current_health = ally:GetHealth()
        local max_health = ally:GetMaxHealth()
        local heal_amount = math.min(self.heal_amount, max_health - current_health)
        
        if heal_amount > 0 then
            -- 治疗单位
            ally:SetHealth(current_health + heal_amount)
            
            -- 显示治疗效果
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, ally, heal_amount, nil)
            
            -- 创建治疗粒子效果
            local particle = ParticleManager:CreateParticle("particles/generic_gameplay/generic_lifesteal.vpcf", PATTACH_ABSORIGIN_FOLLOW, ally)
            ParticleManager:SetParticleControl(particle, 0, ally:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(particle)
            
            -- 创建从死亡位置到治疗单位的连线效果
            local beam_particle = ParticleManager:CreateParticle("particles/units/heroes/hero_dazzle/dazzle_shadow_wave.vpcf", PATTACH_ABSORIGIN_FOLLOW, ally)
            ParticleManager:SetParticleControl(beam_particle, 0, death_position)
            ParticleManager:SetParticleControl(beam_particle, 1, ally:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(beam_particle)
            
            print("Healing Orb: Healed", ally:GetUnitName(), "for", heal_amount, "health")
        else
            print("Healing Orb: Ally", ally:GetUnitName(), "is at full health")
        end
    end
end
