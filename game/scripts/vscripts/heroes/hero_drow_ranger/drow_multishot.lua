-- 卓尔游侠多重箭技能
-- 被动效果1：增加卓尔游侠所有造成的伤害，增加方式与距离相关（每100距离增加5%伤害）
-- 被动效果2：普通攻击时产生两根分裂箭，攻击距离卓尔游侠最近的两个单位（不受普攻距离限制，且不是当前攻击的目标）

LinkLuaModifier("modifier_drow_multishot", "heroes/hero_drow_ranger/drow_multishot", LUA_MODIFIER_MOTION_NONE)

if drow_multishot == nil then
    drow_multishot = class({})
end

function drow_multishot:GetIntrinsicModifierName()
    return "modifier_drow_multishot"
end

-- 投射物命中处理
function drow_multishot:OnProjectileHit(target, location)
    if not IsServer() then return false end
    
    if not target or target:IsNull() or not target:IsAlive() then
        return false
    end
    
    -- 从技能类中获取伤害数据
    if not self.split_arrow_damages then
        return false
    end
    
    -- 查找对应的伤害数据（通过目标匹配）
    local damage_data = nil
    local found_key = nil
    for key, data in pairs(self.split_arrow_damages) do
        if data.target == target then
            damage_data = data
            found_key = key
            break
        end
    end
    
    if not damage_data then
        return false
    end
    
    -- 应用伤害
    local damage_table = {
        victim = target,
        attacker = damage_data.attacker,
        damage = damage_data.damage,
        damage_type = DAMAGE_TYPE_PHYSICAL,
        damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
        ability = self
    }
    ApplyDamage(damage_table)
    
    -- 清理已使用的伤害数据
    if found_key then
        self.split_arrow_damages[found_key] = nil
    end
    
    return true
end

-- 多重箭效果修饰符
if modifier_drow_multishot == nil then
    modifier_drow_multishot = class({})
end

function modifier_drow_multishot:IsHidden()
    return true
end

function modifier_drow_multishot:IsPurgable()
    return false
end

function modifier_drow_multishot:IsDebuff()
    return false
end

function modifier_drow_multishot:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ATTACK_LANDED,
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

function modifier_drow_multishot:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取数值
        local ability = self:GetAbility()
        self.split_arrow_count = ability:GetSpecialValueFor("split_arrow_count") or 2
        self.damage_bonus_per_100_range = ability:GetSpecialValueFor("damage_bonus_per_100_range") or 5.0
        -- 标记：用于避免距离增益伤害触发OnTakeDamage导致循环
        self.processing_distance_bonus = false
    end
end

-- 处理所有伤害的距离增益（简化版本：统一在OnTakeDamage中处理）
function modifier_drow_multishot:OnTakeDamage(params)
    if not IsServer() then return end
    
    -- 如果正在处理距离增益伤害，跳过（避免循环）
    if self.processing_distance_bonus then return end
    
    local attacker = params.attacker
    local victim = params.unit
    local damage = params.damage
    local damage_type = params.damage_type
    
    -- 检查是否是拥有此modifier的单位造成的伤害
    if attacker ~= self:GetParent() then return end
    
    -- 检查是否是敌人
    if attacker:GetTeamNumber() == victim:GetTeamNumber() then return end
    
    -- 检查目标是否有效
    if not victim or victim:IsNull() or not victim:IsAlive() then return end
    
    -- 获取技能配置
    local ability = self:GetAbility()
    if not ability or ability:IsNull() then return end
    
    local damage_bonus_per_100_range = self.damage_bonus_per_100_range
    
    -- 计算距离
    local attacker_pos = attacker:GetAbsOrigin()
    local victim_pos = victim:GetAbsOrigin()
    local distance = (victim_pos - attacker_pos):Length2D()
    
    -- 计算伤害加成：每100距离增加5%伤害
    local distance_in_100s = distance / 100.0
    local damage_multiplier = distance_in_100s * damage_bonus_per_100_range / 100.0
    local bonus_damage = damage * damage_multiplier
    
    -- 应用额外伤害
    if bonus_damage > 0 then
        self.processing_distance_bonus = true
        local damage_table = {
            victim = victim,
            attacker = attacker,
            damage = bonus_damage,
            damage_type = damage_type,
            damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
            ability = ability
        }
        ApplyDamage(damage_table)
        self.processing_distance_bonus = false
    end
end

-- 处理普通攻击的分裂箭
function modifier_drow_multishot:OnAttackLanded(params)
    if not IsServer() then return end
    
    local attacker = params.attacker
    local target = params.target
    local damage = params.damage
    
    -- 检查是否是拥有此modifier的单位发起的攻击
    if attacker ~= self:GetParent() then return end
    
    -- 检查目标是否有效
    if not target or target:IsNull() then return end
    
    -- 检查是否是敌人
    if attacker:GetTeamNumber() == target:GetTeamNumber() then return end
    
    -- 检查是否是普通攻击（不是技能攻击）
    if params.inflictor then return end
    
    -- 检查目标是否还活着
    if not target:IsAlive() then return end
    
    -- 获取技能配置
    local ability = self:GetAbility()
    if not ability or ability:IsNull() then 
        return 
    end
    
    local split_arrow_count = ability:GetSpecialValueFor("split_arrow_count") or 2
    
    -- 获取攻击者位置
    local attacker_pos = attacker:GetAbsOrigin()
    
    -- 找到全地图范围内的所有敌人（不受攻击距离限制，排除主目标）
    local enemies = FindUnitsInRadius(
        attacker:GetTeamNumber(),
        attacker_pos,
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    -- 排除主目标，并排序（按距离从近到远）
    -- 注意：每次普攻都独立选择目标，不检查是否有其他分裂箭在飞行中
    local valid_targets = {}
    for _, enemy in pairs(enemies) do
        if enemy and not enemy:IsNull() and enemy:IsAlive() and enemy ~= target then
            local distance = (enemy:GetAbsOrigin() - attacker_pos):Length2D()
            table.insert(valid_targets, {
                unit = enemy,
                distance = distance
            })
        end
    end
    
    -- 按距离排序
    table.sort(valid_targets, function(a, b)
        return a.distance < b.distance
    end)
    
    -- 选择最近的 split_arrow_count 个目标（确保同一普攻的2根分裂箭不命中同一单位）
    local targets_to_hit = {}
    local selected_units = {}  -- 用于本次普攻去重
    for i = 1, #valid_targets do
        if #targets_to_hit >= split_arrow_count then
            break
        end
        local target_data = valid_targets[i]
        local target_unit = target_data.unit
        -- 检查是否已经在本次普攻中选中
        if not selected_units[target_unit] then
            selected_units[target_unit] = true
            table.insert(targets_to_hit, target_data)
        end
    end
    
    -- 获取原始攻击伤害（用于分裂箭）
    local base_damage = damage
    
    -- 投射物速度（使用固定值900，与单位配置一致）
    local projectile_speed = 900
    
    -- 初始化伤害数据存储（如果还没有）
    if not ability.split_arrow_damages then
        ability.split_arrow_damages = {}
    end
    
    -- 对每个额外目标创建分裂箭投射物
    for _, target_data in pairs(targets_to_hit) do
        local extra_target = target_data.unit
        
        -- 多重安全检查
        if extra_target and not extra_target:IsNull() and extra_target:IsAlive() 
           and attacker and not attacker:IsNull() 
           and ability and not ability:IsNull() then
            
            -- 使用基础伤害（无距离增益）
            local split_damage = base_damage
            
            -- 确保伤害值有效
            if split_damage > 0 then
                -- 存储伤害数据到技能类中（参考狂野3的实现方式）
                local target_key = tostring(extra_target:GetEntityIndex())
                ability.split_arrow_damages[target_key] = {
                    damage = split_damage,
                    attacker = attacker,
                    target = extra_target
                }
                
                -- 创建追踪投射物（从攻击者飞向目标，参考狂野3的实现方式）
                local projectile_info = {
                    Target = extra_target,
                    Source = attacker,
                    Ability = ability,
                    EffectName = "particles/heroes/drow_ranger/drow_base_attack.vpcf",
                    iMoveSpeed = projectile_speed,
                    bDodgeable = false,
                    bIsAttack = false,
                    bReplaceExisting = false,
                    bProvidesVision = false,
                    iSourceAttachment = DOTA_PROJECTILE_ATTACHMENT_ATTACK_1,
                    bVisibleToEnemies = true,
                    flExpireTime = GameRules:GetGameTime() + 10.0
                }
                
                ProjectileManager:CreateTrackingProjectile(projectile_info)
            end
        end
    end
end

