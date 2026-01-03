-- Viper Poison Burst技能
-- 每5次普通攻击触发一次，造成伤害并施加中毒debuff
-- 同时扩散目标身上的其他debuff到范围内所有敌人

viper_poison_burst = class({})

LinkLuaModifier("modifier_viper_poison_burst_passive", "heroes/hero_viper/viper_poison_burst.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_viper_poison_burst_poison", "heroes/hero_viper/viper_poison_burst.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_viper_poison_burst_burn", "heroes/hero_viper/viper_poison_burst.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_viper_poison_burst_attack_speed", "heroes/hero_viper/viper_poison_burst.lua", LUA_MODIFIER_MOTION_NONE)

function viper_poison_burst:GetIntrinsicModifierName()
    return "modifier_viper_poison_burst_passive"
end

-- 被动效果modifier
modifier_viper_poison_burst_passive = class({})

function modifier_viper_poison_burst_passive:IsHidden() 
    return true 
end

function modifier_viper_poison_burst_passive:IsDebuff() 
    return false 
end

function modifier_viper_poison_burst_passive:IsPurgable() 
    return false 
end

function modifier_viper_poison_burst_passive:OnCreated()
    if not IsServer() then return end
    
    self.attacks_to_trigger = self:GetAbility():GetSpecialValueFor("attacks_to_trigger")
    self.attack_count = 0
    self.viper_id = self:GetParent():GetEntityIndex() -- 获取viper的唯一ID
end

function modifier_viper_poison_burst_passive:OnRefresh()
    if not IsServer() then return end
    
    self.attacks_to_trigger = self:GetAbility():GetSpecialValueFor("attacks_to_trigger")
end

function modifier_viper_poison_burst_passive:OnDestroy()
    if not IsServer() then return end
    -- 不需要特殊清理
end

function modifier_viper_poison_burst_passive:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

function modifier_viper_poison_burst_passive:OnAttackLanded(params)
    if not IsServer() then return end
    
    local parent = self:GetParent()
    if not parent:IsAlive() then return end
    
    -- 检查是否是viper的攻击
    if params.attacker == parent then
        local target = params.target
        if target and target:IsAlive() then
            self.attack_count = self.attack_count + 1
            
            
            -- 检查是否达到触发条件
            if self.attack_count >= self.attacks_to_trigger then
                self.attack_count = 0  -- 立即重置计数，防止重复触发
                self:TriggerPoisonBurst(target)
            end
        end
    end
end

function modifier_viper_poison_burst_passive:TriggerPoisonBurst(target)
    if not IsServer() then return end
    
    local caster = self:GetParent()
    local ability = self:GetAbility()
    
    -- 获取技能参数
    local damage = ability:GetSpecialValueFor("damage")
    local poison_radius = ability:GetSpecialValueFor("poison_radius")
    local poison_duration = ability:GetSpecialValueFor("poison_duration")
    
    
    -- 对目标造成伤害
    local damage_table = {
        victim = target,
        attacker = caster,
        damage = damage,
        damage_type = DAMAGE_TYPE_MAGICAL,
        ability = ability
    }
    ApplyDamage(damage_table)
    
    -- 播放特效
    self:PlayPoisonBurstEffects(target:GetAbsOrigin())
    
    -- 播放音效
    EmitSoundOn("Hero_Viper.Nethertoxin.Cast", target)
    
    -- 查找范围内的敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        target:GetAbsOrigin(),
        nil,
        poison_radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 先扩散目标身上已有的debuff到范围内敌人
    for _, enemy in pairs(enemies) do
        if enemy:IsAlive() then
            -- 扩散目标身上的debuff（只在技能触发时检测一次）
            self:SpreadDebuffs(target, enemy)
        end
    end
    
    -- 然后对范围内敌人施加中毒效果
    for _, enemy in pairs(enemies) do
        if enemy:IsAlive() then
            -- 施加中毒效果（支持叠加）
            self:ApplyPoisonDebuff(enemy, poison_duration)
        end
    end
end

-- 应用毒debuff的函数，支持叠加（最多max_stacks层）
function modifier_viper_poison_burst_passive:ApplyPoisonDebuff(target, duration)
    if not IsServer() then return end
    
    local caster = self:GetParent()
    local ability = self:GetAbility()
    local max_stacks = ability:GetSpecialValueFor("max_stacks")
    
    -- 检查目标是否已有毒debuff
    local existing_poison = target:FindModifierByName("modifier_viper_poison_burst_poison")
    
    if existing_poison then
        
        -- 如果已有毒debuff，增加叠加层数（最多max_stacks层）
        if not existing_poison.stack_count then
            existing_poison.stack_count = 1
        end
        
        if existing_poison.stack_count < max_stacks then
            existing_poison.stack_count = existing_poison.stack_count + 1
        else
        end
        
        -- 重新设置持续时间（取最大值）
        local current_duration = existing_poison:GetRemainingTime()
        if duration > current_duration then
            existing_poison:SetDuration(duration, true)
        end
        
        
        -- 确保只有一个毒debuff实例，移除其他重复的
        local all_poison_modifiers = target:FindAllModifiersByName("modifier_viper_poison_burst_poison")
        if #all_poison_modifiers > 1 then
            for i = 2, #all_poison_modifiers do
                if all_poison_modifiers[i] ~= existing_poison then
                    all_poison_modifiers[i]:Destroy()
                end
            end
        end
        
    else
        -- 创建新的毒debuff
        local poison_modifier = target:AddNewModifier(caster, ability, "modifier_viper_poison_burst_poison", {duration = duration})
        if poison_modifier then
            poison_modifier.stack_count = 1
        end
    end
end

function modifier_viper_poison_burst_passive:SpreadDebuffs(source_target, target_enemy)
    if not IsServer() then return end
    
    local caster = self:GetParent()
    local ability = self:GetAbility()
    
    -- 获取源目标身上的所有debuff
    local modifiers = source_target:FindAllModifiers()
    
    
    for _, modifier in pairs(modifiers) do
        if modifier:IsDebuff() then
            local modifier_name = modifier:GetName()
            local modifier_caster = modifier:GetCaster()
            
            
            -- 检查是否是灼烧相关的debuff
            local is_burn_related = string.find(modifier_name, "burn") or string.find(modifier_name, "fire") or string.find(modifier_name, "light_strike_array") or string.find(modifier_name, "lina")
            if is_burn_related then
            end
            
            -- 排除毒buff和扩散的debuff的扩散
            if string.find(modifier_name, "poison") or string.find(modifier_name, "nethertoxin") or string.find(modifier_name, "viper_poison_burst") then
                goto continue
            end
            
            -- 扩散Lina的灼烧debuff（可以是任何英雄施放的）
            if string.find(modifier_name, "burn") or string.find(modifier_name, "fire") or string.find(modifier_name, "light_strike_array") or string.find(modifier_name, "lina") then
                -- 直接扩散原始的灼烧debuff，保持原始施法者
                self:SpreadBurnDebuff(target_enemy, modifier, modifier_caster)
            end
            
            -- 删除Ursa攻速减速的扩散功能
            
            ::continue::
        end
    end
end

-- 直接扩散原始的灼烧debuff（保持原始施法者）
function modifier_viper_poison_burst_passive:SpreadBurnDebuff(target, source_modifier, original_caster)
    if not IsServer() then return end
    
    local ability = self:GetAbility()
    local burn_duration = source_modifier:GetRemainingTime()
    
    
    -- 检查目标是否已有同种灼烧debuff
    local existing_burn = target:FindModifierByName("modifier_lina_flame_strike_burn")
    
    if existing_burn then
        -- 如果已有灼烧debuff，比较剩余时长，保留更长的
        local existing_remaining = existing_burn:GetRemainingTime()
        
        
        if burn_duration > existing_remaining then
            -- 源debuff剩余时间更长，更新现有debuff
            existing_burn:SetDuration(burn_duration, true)
        else
        end
    else
        -- 创建新的原始灼烧debuff，使用原始施法者
        
        -- 使用原始施法者的技能来创建debuff，确保所有参数都正确
        local original_ability = source_modifier:GetAbility()
        if original_ability then
            local burn_modifier = target:AddNewModifier(original_caster, original_ability, "modifier_lina_flame_strike_burn", {duration = burn_duration})
            if burn_modifier then
            else
            end
        else
            -- 如果无法获取原始技能，使用Viper的技能作为备选
            local burn_modifier = target:AddNewModifier(original_caster, ability, "modifier_lina_flame_strike_burn", {duration = burn_duration})
            if burn_modifier then
            else
            end
        end
    end
end

-- 已删除Ursa攻速减速的扩散功能

function modifier_viper_poison_burst_passive:PlayPoisonBurstEffects(position)
    -- 创建网毒特效
    local poison_burst_particle = ParticleManager:CreateParticle("particles/units/heroes/hero_viper/viper_nethertoxin.vpcf", PATTACH_WORLDORIGIN, nil)
    if poison_burst_particle ~= -1 then
        ParticleManager:SetParticleControl(poison_burst_particle, 0, position)
        ParticleManager:SetParticleControl(poison_burst_particle, 1, Vector(400, 0, 0)) -- 半径
        ParticleManager:ReleaseParticleIndex(poison_burst_particle)
    end
end

-- 中毒效果modifier
modifier_viper_poison_burst_poison = class({})

function modifier_viper_poison_burst_poison:IsHidden() 
    return false 
end

function modifier_viper_poison_burst_poison:GetModifierStackCount()
    return self.stack_count or 1
end

function modifier_viper_poison_burst_poison:OnTooltip()
    local stack_count = self.stack_count or 1
    return "中毒层数: " .. stack_count
end

function modifier_viper_poison_burst_poison:IsDebuff() 
    return true 
end

function modifier_viper_poison_burst_poison:IsPurgable() 
    return true 
end

function modifier_viper_poison_burst_poison:OnCreated()
    if not IsServer() then return end
    
    self.poison_damage = self:GetAbility():GetSpecialValueFor("poison_damage_per_second")
    self.poison_interval = self:GetAbility():GetSpecialValueFor("poison_interval")
    
    -- 确保stack_count被正确初始化
    if not self.stack_count then
        self.stack_count = 1
    end
    
    -- 使用内置计时器开始中毒伤害
    self:StartIntervalThink(self.poison_interval)
    
end

function modifier_viper_poison_burst_poison:OnRefresh()
    if not IsServer() then return end
    
    self.poison_damage = self:GetAbility():GetSpecialValueFor("poison_damage_per_second")
    self.poison_interval = self:GetAbility():GetSpecialValueFor("poison_interval")
    
    -- 保持现有的叠加层数，不重新设置持续时间
    -- 持续时间由ApplyPoisonDebuff函数管理
    
    -- 确保只有一个计时器在运行
    if self:IsNull() then return end
    self:StartIntervalThink(self.poison_interval)
end

function modifier_viper_poison_burst_poison:OnDestroy()
    if not IsServer() then return end
    
    -- 停止内置计时器（Dota2会自动处理，无需手动停止）
    -- self:StopIntervalThink() -- 此方法不存在
end

function modifier_viper_poison_burst_poison:OnIntervalThink()
    if not IsServer() then return end
    
    local parent = self:GetParent()
    if not parent:IsAlive() then return end
    
    local caster = self:GetCaster()
    local ability = self:GetAbility()
    
    -- 根据叠加层数计算伤害
    local stack_count = self.stack_count or 1
    local total_damage = self.poison_damage * stack_count
    
    -- 造成中毒伤害
    local damage_table = {
        victim = parent,
        attacker = caster,
        damage = total_damage,
        damage_type = DAMAGE_TYPE_MAGICAL,
        ability = ability
    }
    ApplyDamage(damage_table)
    
    -- 播放中毒音效
    EmitSoundOn("Hero_Viper.PoisonAttack", parent)
    
    -- 打印调试信息
end

function modifier_viper_poison_burst_poison:GetEffectName()
    -- 使用Viper的毒效果粒子
    return "particles/units/heroes/hero_viper/viper_poison_attack.vpcf"
end

function modifier_viper_poison_burst_poison:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_viper_poison_burst_poison:GetEffectColor()
    return Vector(0, 255, 0) -- 绿色中毒效果
end

-- 扩散的灼烧modifier
modifier_viper_poison_burst_burn = class({})

function modifier_viper_poison_burst_burn:IsHidden() return false end
function modifier_viper_poison_burst_burn:IsDebuff() return true end
function modifier_viper_poison_burst_burn:IsPurgable() return true end

function modifier_viper_poison_burst_burn:OnCreated()
    if not IsServer() then return end
end

function modifier_viper_poison_burst_burn:OnRefresh()
    if not IsServer() then return end
end

function modifier_viper_poison_burst_burn:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_DAMAGEOUTGOING_PERCENTAGE
    }
end

function modifier_viper_poison_burst_burn:GetModifierDamageOutgoing_Percentage()
    local damage_reduction = self.burn_damage_reduction or -20
    return damage_reduction
end

function modifier_viper_poison_burst_burn:GetEffectName()
    -- 使用Huskar的灼烧效果粒子
    return "particles/generic_gameplay/huskar_burning_spear_debuff.vpcf"
end

function modifier_viper_poison_burst_burn:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_viper_poison_burst_burn:GetEffectColor()
    return Vector(255, 100, 0) -- 橙红色灼烧效果
end

function modifier_viper_poison_burst_burn:GetTextureName()
    -- 使用Lina灼烧技能的图标
    return "lina_flame_strike"
end

-- 扩散的攻速降低modifier
modifier_viper_poison_burst_attack_speed = class({})

function modifier_viper_poison_burst_attack_speed:IsHidden() return false end
function modifier_viper_poison_burst_attack_speed:IsDebuff() return true end
function modifier_viper_poison_burst_attack_speed:IsPurgable() return true end

function modifier_viper_poison_burst_attack_speed:OnCreated()
    if not IsServer() then return end
end

function modifier_viper_poison_burst_attack_speed:OnRefresh()
    if not IsServer() then return end
end

function modifier_viper_poison_burst_attack_speed:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_viper_poison_burst_attack_speed:GetModifierAttackSpeedBonus_Constant()
    local attack_speed_reduction = self.attack_speed_reduction or -30
    return attack_speed_reduction
end

function modifier_viper_poison_burst_attack_speed:GetEffectName()
    -- 使用Ursa的减速效果粒子
    return "particles/generic_gameplay/generic_slowed_cold.vpcf"
end

function modifier_viper_poison_burst_attack_speed:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_viper_poison_burst_attack_speed:GetEffectColor()
    return Vector(100, 100, 255) -- 蓝色减速效果
end

function modifier_viper_poison_burst_attack_speed:GetTextureName()
    -- 使用Ursa减速技能的图标
    return "ursa_ground_slam"
end

-- 技能预加载
function viper_poison_burst:Precache(context)
    PrecacheResource("particle", "particles/units/heroes/hero_viper/viper_nethertoxin.vpcf", context)
    PrecacheResource("particle", "particles/units/heroes/hero_viper/viper_poison_attack.vpcf", context)
    PrecacheResource("particle", "particles/generic_gameplay/huskar_burning_spear_debuff.vpcf", context)
    PrecacheResource("particle", "particles/generic_gameplay/generic_slowed_cold.vpcf", context)
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_viper.vsndevts", context)
end

