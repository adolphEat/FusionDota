-- 狂野3羁绊技能 - 全局buff技能
-- 狂野单位出现后每10秒触发一次增益（只对狂野单位生效），增加10%攻击速度（可叠加）
-- 额外效果：每10秒增加10点物理攻击（可叠加）
-- 额外效果：每10秒向场上生命值最低的单位投掷一支长矛，造成所有狂野单位攻击力之和的伤害，如果伤害后血量低于20%最大生命值则斩杀
-- 狂野单位：恶魔巫师(lion1)、魅惑魔女(enchantress1)、熊战士(ursa1)、冥界亚龙(viper1)、食人魔法师(ogre_magi1)

LinkLuaModifier("modifier_wild_3", "heroes/universal/wild_3", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wild_3_stack", "heroes/universal/wild_3", LUA_MODIFIER_MOTION_NONE)

if wild_3 == nil then
    wild_3 = class({})
end

function wild_3:GetIntrinsicModifierName()
    return "modifier_wild_3"
end

-- 确保技能升级时创建modifier
function wild_3:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 确保modifier被创建
    if not caster:HasModifier("modifier_wild_3") then
        caster:AddNewModifier(caster, self, "modifier_wild_3", {})
    end
end

-- 全局狂野羁绊效果修饰符
if modifier_wild_3 == nil then
    modifier_wild_3 = class({})
end

function modifier_wild_3:IsHidden()
    return false
end

function modifier_wild_3:IsPurgable()
    return false
end

function modifier_wild_3:IsDebuff()
    return false
end

function modifier_wild_3:IsPassive()
    return true
end

function modifier_wild_3:GetTexture()
    return "item_hyperstone"
end

-- 狂野单位列表
function modifier_wild_3:IsWildUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local wild_units = {
        "lion1",
        "enchantress1",
        "ursa1",
        "viper1",
        "ogre_magi1"
    }
    
    for _, wild_name in pairs(wild_units) do
        if unit_name == wild_name then
            return true
        end
    end
    
    return false
end

function modifier_wild_3:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取数值
        self.trigger_interval = self:GetAbility():GetSpecialValueFor("trigger_interval") or 10.0
        self.attack_speed_bonus_percent = self:GetAbility():GetSpecialValueFor("attack_speed_bonus_percent") or 10.0
        self.attack_damage_bonus = self:GetAbility():GetSpecialValueFor("attack_damage_bonus") or 10.0
        self.execute_threshold = self:GetAbility():GetSpecialValueFor("execute_threshold") or 0.2
        
        print("Wild 3: Modifier created, trigger_interval =", self.trigger_interval)
        
        -- 立即触发一次（战斗开始时立即给所有狂野单位第一层）
        self:ApplyWildBuffToAllies()
        
        -- 使用GameRules的SetThink来创建全局共享的10秒计时器
        self:StartGlobalTimer()
    end
end

function modifier_wild_3:StartGlobalTimer()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    local timer_name = "Wild3_Timer_" .. caster:GetEntityIndex()
    local trigger_interval = self.trigger_interval
    
    GameRules:GetGameModeEntity():SetThink(function()
        local modifier = caster:FindModifierByName("modifier_wild_3")
        if not modifier or modifier:IsNull() then
            return nil -- 停止计时器
        end
        
        -- 每10秒为所有在场的狂野单位添加一层增益
        modifier:ApplyWildBuffToAllies()
        
        return trigger_interval -- 继续计时器
    end, timer_name, trigger_interval)
    
    print("Wild 3: Global timer started, interval =", trigger_interval)
end

function modifier_wild_3:ApplyWildBuffToAllies()
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then 
        print("Wild 3: Caster is null!")
        return 
    end
    
    -- 获取所有己方单位
    local allies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    print("Wild 3: Found", #allies, "allies")
    local wild_count = 0
    local wild_units = {}
    
    -- 为每个在场的狂野单位增加一层增益（通过stack计数）
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否是狂野单位
            if self:IsWildUnit(ally) then
                wild_count = wild_count + 1
                table.insert(wild_units, ally)
                print("Wild 3: Found wild unit:", ally:GetUnitName())
                
                -- 检查是否已经有stack modifier
                local modifier = ally:FindModifierByName("modifier_wild_3_stack")
                if modifier then
                    -- 增加层数
                    modifier:IncrementStackCount()
                    print("Wild 3: Incremented stack for", ally:GetUnitName(), "new stack =", modifier:GetStackCount())
                    
                    -- 播放狂野特效（野性风暴环境特效，符合狂野主题）
                    local particle = ParticleManager:CreateParticle(
                        "particles/generic_gameplay/wildkin_ripper_hurricane_ambient.vpcf",
                        PATTACH_ABSORIGIN_FOLLOW,
                        ally
                    )
                    ParticleManager:SetParticleControl(particle, 0, ally:GetAbsOrigin())
                    ParticleManager:ReleaseParticleIndex(particle)
                else
                    -- 创建新的stack modifier，初始层数为1
                    local success = pcall(function()
                        modifier = ally:AddNewModifier(caster, self:GetAbility(), "modifier_wild_3_stack", { duration = -1 })
                        if modifier then
                            modifier:SetStackCount(1)
                            print("Wild 3: Created new stack modifier for", ally:GetUnitName(), "stack = 1")
                            
                            -- 播放狂野特效（野性风暴环境特效，符合狂野主题）
                            local particle = ParticleManager:CreateParticle(
                                "particles/generic_gameplay/wildkin_ripper_hurricane_ambient.vpcf",
                                PATTACH_ABSORIGIN_FOLLOW,
                                ally
                            )
                            ParticleManager:SetParticleControl(particle, 0, ally:GetAbsOrigin())
                            ParticleManager:ReleaseParticleIndex(particle)
                        else
                            print("Wild 3: Failed to create modifier for", ally:GetUnitName())
                        end
                    end)
                    if not success then
                        print("Wild 3: Error creating modifier for", ally:GetUnitName())
                    end
                end
            end
        end
    end
    
    print("Wild 3: Applied buff to", wild_count, "wild units")
    
    -- 如果有狂野单位，尝试投掷长矛
    if wild_count > 0 then
        self:ThrowSpear(wild_units)
    end
end

-- 投掷长矛到生命值最低的单位
function modifier_wild_3:ThrowSpear(wild_units)
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 找到场上所有敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    if #enemies == 0 then
        print("Wild 3: No enemies found for spear throw")
        return
    end
    
    -- 找到生命值最低的敌人
    local lowest_health_enemy = nil
    local lowest_health = math.huge
    
    for _, enemy in pairs(enemies) do
        if enemy:IsAlive() and not enemy:IsNull() then
            local current_health = enemy:GetHealth()
            if current_health < lowest_health then
                lowest_health = current_health
                lowest_health_enemy = enemy
            end
        end
    end
    
    if not lowest_health_enemy or lowest_health_enemy:IsNull() then
        print("Wild 3: No valid target found")
        return
    end
    
    local target = lowest_health_enemy
    local target_pos = target:GetAbsOrigin()
    
    -- 找到距离目标最远的狂野单位作为发射点
    local farthest_wild_unit = nil
    local farthest_distance = 0
    
    for _, wild_unit in pairs(wild_units) do
        if wild_unit:IsAlive() and not wild_unit:IsNull() then
            local distance = (target_pos - wild_unit:GetAbsOrigin()):Length2D()
            if distance > farthest_distance then
                farthest_distance = distance
                farthest_wild_unit = wild_unit
            end
        end
    end
    
    if not farthest_wild_unit or farthest_wild_unit:IsNull() then
        print("Wild 3: No valid wild unit found for spear throw")
        return
    end
    
    local shooter = farthest_wild_unit
    local shooter_pos = shooter:GetAbsOrigin()
    
    -- 计算所有狂野单位的攻击力之和
    local total_attack_damage = 0
    for _, wild_unit in pairs(wild_units) do
        if wild_unit:IsAlive() and not wild_unit:IsNull() then
            total_attack_damage = total_attack_damage + wild_unit:GetAttackDamage()
        end
    end
    
    print("Wild 3: Throwing spear from", shooter:GetUnitName(), "to", target:GetUnitName(), "with damage", total_attack_damage)
    
    -- 计算投射物速度（使用enchantress的投射物速度900）
    local projectile_speed = 900
    
    -- 在技能类中存储伤害值（用于投射物命中时读取）
    local ability = self:GetAbility()
    if ability then
        ability.projectile_damage = total_attack_damage
        ability.projectile_target = target
    end
    
    -- 创建追踪投射物（从一个单位射向另一个单位）
    -- 使用攻击附着点，让投射物从单位攻击位置发射
    local projectile_info = {
        Target = target,
        Source = shooter,
        Ability = ability,
        EffectName = "particles/heroes/enchantress/enchantress_base_attack.vpcf",
        iMoveSpeed = projectile_speed,
        bDodgeable = false,
        bIsAttack = false,
        bReplaceExisting = false,
        bProvidesVision = false,
        iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
        bVisibleToEnemies = true,
        flExpireTime = GameRules:GetGameTime() + 10.0
    }
    
    local projectile_id = ProjectileManager:CreateTrackingProjectile(projectile_info)
    print("Wild 3: Created tracking projectile with ID:", projectile_id, "from", shooter:GetUnitName(), "to", target:GetUnitName(), "speed:", projectile_speed)
end

-- 投射物命中处理
function wild_3:OnProjectileHit(target, location)
    if not IsServer() then return false end
    
    if not target or target:IsNull() or not target:IsAlive() then
        return false
    end
    
    -- 从技能类中获取伤害值
    local damage = self.projectile_damage or 0
    
    if damage > 0 then
        local caster = self:GetCaster()
        if not caster or caster:IsNull() then return false end
        
        -- 获取目标的最大生命值
        local max_health = target:GetMaxHealth()
        
        -- 造成伤害
        local damage_table = {
            victim = target,
            attacker = caster,
            damage = damage,
            damage_type = DAMAGE_TYPE_PHYSICAL,
            ability = self
        }
        ApplyDamage(damage_table)
        
        -- 检查是否低于20%最大生命值
        local new_health = target:GetHealth()
        local health_percent = new_health / max_health
        local execute_threshold = self:GetSpecialValueFor("execute_threshold") or 0.2
        
        if health_percent <= execute_threshold or new_health <= 0 then
            -- 斩杀
            print("Wild 3: Executing target", target:GetUnitName(), "health percent:", health_percent)
            target:Kill(self, caster)
        end
        
        -- 清理存储的数据
        self.projectile_damage = nil
        self.projectile_target = nil
    end
    
    return true
end

function modifier_wild_3:GetEffectName()
    return "particles/generic_gameplay/wildkin_ripper_hurricane_ambient.vpcf"
end

function modifier_wild_3:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 狂野单位攻击速度和物理攻击力效果修饰符（通过stack计数实现叠加）
if modifier_wild_3_stack == nil then
    modifier_wild_3_stack = class({})
end

function modifier_wild_3_stack:IsHidden()
    return true  -- 隐藏buff图标，但效果仍然生效
end

function modifier_wild_3_stack:IsPurgable()
    return false
end

function modifier_wild_3_stack:IsDebuff()
    return false
end

function modifier_wild_3_stack:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
        MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE
    }
end

function modifier_wild_3_stack:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取攻击速度加成百分比和物理攻击力加成
        self.attack_speed_bonus_percent = self:GetAbility():GetSpecialValueFor("attack_speed_bonus_percent") or 10.0
        self.attack_damage_bonus = self:GetAbility():GetSpecialValueFor("attack_damage_bonus") or 10.0
        print("Wild 3 Stack: Created, attack_speed_bonus_percent =", self.attack_speed_bonus_percent, "attack_damage_bonus =", self.attack_damage_bonus, "initial stack =", self:GetStackCount())
    end
end

-- 提供攻击速度固定值加成（根据stack层数计算）
function modifier_wild_3_stack:GetModifierAttackSpeedBonus_Constant()
    local stack_count = self:GetStackCount()
    if stack_count <= 0 then
        stack_count = 1  -- 至少1层
    end
    
    -- 从技能配置获取攻击速度加成百分比（客户端和服务器端都需要）
    local ability = self:GetAbility()
    local attack_speed_bonus_percent = 10.0
    if ability and not ability:IsNull() then
        attack_speed_bonus_percent = ability:GetSpecialValueFor("attack_speed_bonus_percent") or 10.0
    elseif self.attack_speed_bonus_percent then
        attack_speed_bonus_percent = self.attack_speed_bonus_percent
    end
    
    -- 参考clockwork_accelerator的实现方式
    -- 10%攻速加成 ≈ 10固定值（根据Dota 2的攻速计算公式）
    -- 百分比攻速：10% = 基础攻速(100) * 0.1 = 10固定值
    local percent_bonus = attack_speed_bonus_percent * stack_count
    local constant_bonus = percent_bonus  -- 直接使用百分比值作为固定值（10% = 10固定值）
    
    return constant_bonus
end

-- 提供物理攻击力加成（根据stack层数计算）
function modifier_wild_3_stack:GetModifierBaseAttack_BonusDamage()
    local stack_count = self:GetStackCount()
    if stack_count <= 0 then
        stack_count = 1  -- 至少1层
    end
    
    -- 从技能配置获取物理攻击力加成（客户端和服务器端都需要）
    local ability = self:GetAbility()
    local attack_damage_bonus = 10.0
    if ability and not ability:IsNull() then
        attack_damage_bonus = ability:GetSpecialValueFor("attack_damage_bonus") or 10.0
    elseif self.attack_damage_bonus then
        attack_damage_bonus = self.attack_damage_bonus
    end
    
    -- 每层增加10点物理攻击力
    local damage_bonus = attack_damage_bonus * stack_count
    
    return damage_bonus
end

