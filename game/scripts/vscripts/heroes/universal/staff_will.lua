-- 权杖意志技能 - 全局buff技能
-- 为所有己方单位提供10%攻速和20%暴击几率（类似Rogue圣物）

LinkLuaModifier("modifier_staff_will", "heroes/universal/staff_will", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_staff_will_effect", "heroes/universal/staff_will", LUA_MODIFIER_MOTION_NONE)

if staff_will == nil then
    staff_will = class({})
end

function staff_will:GetIntrinsicModifierName()
    return "modifier_staff_will"
end

-- 全局攻速暴击效果修饰符
if modifier_staff_will == nil then
    modifier_staff_will = class({})
end

function modifier_staff_will:IsHidden()
    return false
end

function modifier_staff_will:IsPurgable()
    return false
end

function modifier_staff_will:IsDebuff()
    return false
end

function modifier_staff_will:IsPassive()
    return true
end

function modifier_staff_will:GetTexture()
    return "item_bfury"
end

function modifier_staff_will:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

function modifier_staff_will:OnCreated()
    if IsServer() then
        -- 从技能配置获取攻速、暴击和暴击伤害倍率
        self.attack_speed_bonus = self:GetAbility():GetSpecialValueFor("attack_speed_bonus")
        self.crit_chance = self:GetAbility():GetSpecialValueFor("crit_chance")
        self.crit_damage_multiplier = self:GetAbility():GetSpecialValueFor("crit_damage_multiplier")
        
        -- 为所有己方单位添加攻速暴击效果
        self:ApplyStaffWillToAllies()
        
        -- 定期检查并更新所有友军的攻速暴击效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_staff_will:OnIntervalThink()
    if IsServer() then
        self:ApplyStaffWillToAllies()
    end
end

function modifier_staff_will:ApplyStaffWillToAllies()
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
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
    
    -- 为每个友军单位添加攻速暴击效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否已经有攻速暴击效果
            if not ally:HasModifier("modifier_staff_will_effect") then
                -- 直接添加攻速暴击效果修饰符
                local success = pcall(function()
                    ally:AddNewModifier(caster, self:GetAbility(), "modifier_staff_will_effect", {})
                end)
            end
        end
    end
end

function modifier_staff_will:OnTakeDamage(params)
    if IsServer() then
        local attacker = params.attacker
        local victim = params.unit
        local damage = params.damage
        local damage_type = params.damage_type
        
        -- 检查是否是攻击者造成的伤害
        if attacker == self:GetParent() and attacker ~= victim then
            -- 检查伤害类型（物理伤害）和伤害来源（普通攻击）
            if damage_type == DAMAGE_TYPE_PHYSICAL and params.damage_flags == DOTA_DAMAGE_FLAG_NONE then
                -- 检查是否暴击
                local crit_roll = RandomFloat(0, 100)
                if crit_roll <= self.crit_chance then
                    -- 计算暴击伤害（使用KV配置的倍率）
                    local crit_damage = damage * self.crit_damage_multiplier
                    local actual_crit_damage = crit_damage - damage
                    
                    -- 应用暴击伤害
                    local damage_table = {
                        victim = victim,
                        attacker = attacker,
                        damage = actual_crit_damage,
                        damage_type = DAMAGE_TYPE_PHYSICAL,
                        damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
                        ability = self:GetAbility()
                    }
                    
                    ApplyDamage(damage_table)
                    
                    -- 播放暴击特效
                    local particle = ParticleManager:CreateParticle("particles/units/heroes/hero_juggernaut/juggernaut_crit_tgt.vpcf", PATTACH_ABSORIGIN_FOLLOW, victim)
                    ParticleManager:SetParticleControl(particle, 0, victim:GetAbsOrigin())
                    ParticleManager:ReleaseParticleIndex(particle)
                    
                end
            end
        end
    end
end

function modifier_staff_will:GetEffectName()
    return "particles/items_fx/aegis_respawn.vpcf"
end

function modifier_staff_will:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 友军攻速暴击效果修饰符
if modifier_staff_will_effect == nil then
    modifier_staff_will_effect = class({})
end

function modifier_staff_will_effect:IsHidden()
    return true
end

function modifier_staff_will_effect:IsPurgable()
    return false
end

function modifier_staff_will_effect:IsDebuff()
    return false
end

function modifier_staff_will_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

function modifier_staff_will_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取攻速、暴击和暴击伤害倍率
        self.attack_speed_bonus = self:GetAbility():GetSpecialValueFor("attack_speed_bonus")
        self.crit_chance = self:GetAbility():GetSpecialValueFor("crit_chance")
        self.crit_damage_multiplier = self:GetAbility():GetSpecialValueFor("crit_damage_multiplier")
    end
end

function modifier_staff_will_effect:GetModifierAttackSpeedBonus_Constant()
    local bonus = self.attack_speed_bonus or 10.0
    return bonus
end

function modifier_staff_will_effect:OnTakeDamage(params)
    if IsServer() then
        local attacker = params.attacker
        local victim = params.unit
        local damage = params.damage
        local damage_type = params.damage_type
        
        -- 检查是否是攻击者造成的伤害
        if attacker == self:GetParent() and attacker ~= victim then
            -- 检查伤害类型（物理伤害）和伤害来源（普通攻击）
            if damage_type == DAMAGE_TYPE_PHYSICAL and params.damage_flags == DOTA_DAMAGE_FLAG_NONE then
                -- 检查是否暴击
                local crit_roll = RandomFloat(0, 100)
                if crit_roll <= self.crit_chance then
                    -- 计算暴击伤害（使用KV配置的倍率）
                    local crit_damage = damage * self.crit_damage_multiplier
                    local actual_crit_damage = crit_damage - damage
                    
                    -- 应用暴击伤害
                    local damage_table = {
                        victim = victim,
                        attacker = attacker,
                        damage = actual_crit_damage,
                        damage_type = DAMAGE_TYPE_PHYSICAL,
                        damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
                        ability = self:GetAbility()
                    }
                    
                    ApplyDamage(damage_table)
                    
                    -- 播放暴击特效
                    local particle = ParticleManager:CreateParticle("particles/units/heroes/hero_juggernaut/juggernaut_crit_tgt.vpcf", PATTACH_ABSORIGIN_FOLLOW, victim)
                    ParticleManager:SetParticleControl(particle, 0, victim:GetAbsOrigin())
                    ParticleManager:ReleaseParticleIndex(particle)
                end
            end
        end
    end
end
