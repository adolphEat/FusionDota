-- 吸血生机技能 - 全局buff技能
-- 为所有己方单位提供10%全能吸血效果（类似Rogue圣物）

LinkLuaModifier("modifier_vampiric_vitality", "heroes/universal/vampiric_vitality", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_vampiric_vitality_effect", "heroes/universal/vampiric_vitality", LUA_MODIFIER_MOTION_NONE)

if vampiric_vitality == nil then
    vampiric_vitality = class({})
end

function vampiric_vitality:GetIntrinsicModifierName()
    return "modifier_vampiric_vitality"
end

function vampiric_vitality:GetAbilityTextureName()
    return "bloodseeker_blood_bath"
end

-- 全局吸血效果修饰符
if modifier_vampiric_vitality == nil then
    modifier_vampiric_vitality = class({})
end

function modifier_vampiric_vitality:IsHidden()
    return false
end

function modifier_vampiric_vitality:IsPurgable()
    return false
end

function modifier_vampiric_vitality:IsDebuff()
    return false
end

function modifier_vampiric_vitality:IsPassive()
    return true
end

function modifier_vampiric_vitality:GetTexture()
    return "item_satanic"
end

function modifier_vampiric_vitality:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

function modifier_vampiric_vitality:OnCreated()
    if IsServer() then
        -- 从技能配置获取吸血百分比
        self.lifesteal_percent = self:GetAbility():GetSpecialValueFor("lifesteal_percent")
        
        -- 为所有己方单位添加吸血效果
        self:ApplyVampiricVitalityToAllies()
        
        -- 定期检查并更新所有友军的吸血效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_vampiric_vitality:OnIntervalThink()
    if IsServer() then
        self:ApplyVampiricVitalityToAllies()
    end
end

function modifier_vampiric_vitality:ApplyVampiricVitalityToAllies()
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
    
    -- 为每个友军单位添加吸血效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否已经有吸血效果
            if not ally:HasModifier("modifier_vampiric_vitality_effect") then
                -- 直接添加吸血效果修饰符
                local success = pcall(function()
                    ally:AddNewModifier(caster, self:GetAbility(), "modifier_vampiric_vitality_effect", {})
                end)
            end
        end
    end
end

function modifier_vampiric_vitality:OnTakeDamage(params)
    if IsServer() then
        local attacker = params.attacker
        local victim = params.unit
        local damage = params.damage
        local damage_type = params.damage_type
        
        -- 检查是否是攻击者造成的伤害
        if attacker == self:GetParent() and attacker ~= victim then
            -- 检查伤害类型（物理伤害或魔法伤害）
            if damage_type == DAMAGE_TYPE_PHYSICAL or damage_type == DAMAGE_TYPE_MAGICAL then
                -- 计算吸血量
                local lifesteal_amount = damage * (self.lifesteal_percent / 100.0)
                
                -- 确保不会超过最大生命值
                local current_health = attacker:GetHealth()
                local max_health = attacker:GetMaxHealth()
                local new_health = math.min(current_health + lifesteal_amount, max_health)
                local actual_heal = new_health - current_health
                
                if actual_heal > 0 then
                    -- 恢复生命值
                    attacker:SetHealth(new_health)
                    
                    -- 播放吸血特效
                    local particle = ParticleManager:CreateParticle("particles/generic_gameplay/generic_lifesteal.vpcf", PATTACH_ABSORIGIN_FOLLOW, attacker)
                    ParticleManager:SetParticleControl(particle, 0, attacker:GetAbsOrigin())
                    ParticleManager:ReleaseParticleIndex(particle)
                end
            end
        end
    end
end

function modifier_vampiric_vitality:GetEffectName()
    return "particles/items_fx/aegis_respawn.vpcf"
end

function modifier_vampiric_vitality:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 友军吸血效果修饰符
if modifier_vampiric_vitality_effect == nil then
    modifier_vampiric_vitality_effect = class({})
end

function modifier_vampiric_vitality_effect:IsHidden()
    return true
end

function modifier_vampiric_vitality_effect:IsPurgable()
    return false
end

function modifier_vampiric_vitality_effect:IsDebuff()
    return false
end

function modifier_vampiric_vitality_effect:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

function modifier_vampiric_vitality_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取吸血百分比
        self.lifesteal_percent = self:GetAbility():GetSpecialValueFor("lifesteal_percent")
    end
end

function modifier_vampiric_vitality_effect:OnTakeDamage(params)
    if IsServer() then
        local attacker = params.attacker
        local victim = params.unit
        local damage = params.damage
        local damage_type = params.damage_type
        
        -- 检查是否是攻击者造成的伤害
        if attacker == self:GetParent() and attacker ~= victim then
            -- 检查伤害类型（物理伤害或魔法伤害）
            if damage_type == DAMAGE_TYPE_PHYSICAL or damage_type == DAMAGE_TYPE_MAGICAL then
                -- 计算吸血量
                local lifesteal_amount = damage * (self.lifesteal_percent / 100.0)
                
                -- 确保不会超过最大生命值
                local current_health = attacker:GetHealth()
                local max_health = attacker:GetMaxHealth()
                local new_health = math.min(current_health + lifesteal_amount, max_health)
                local actual_heal = new_health - current_health
                
                if actual_heal > 0 then
                    -- 恢复生命值
                    attacker:SetHealth(new_health)
                    
                    -- 播放吸血特效
                    local particle = ParticleManager:CreateParticle("particles/generic_gameplay/generic_lifesteal.vpcf", PATTACH_ABSORIGIN_FOLLOW, attacker)
                    ParticleManager:SetParticleControl(particle, 0, attacker:GetAbsOrigin())
                    ParticleManager:ReleaseParticleIndex(particle)
                end
            end
        end
    end
end