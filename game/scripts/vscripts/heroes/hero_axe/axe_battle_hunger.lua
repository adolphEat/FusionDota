-- axe_battle_hunger_custom.lua
-- 被动技能：当单位受到伤害导致生命值减少时，根据生命值损失百分比增加攻速和吸血

axe_battle_hunger_custom = class({})
LinkLuaModifier("modifier_axe_battle_hunger_custom", "heroes/hero_axe/axe_battle_hunger.lua", LUA_MODIFIER_MOTION_NONE)

function axe_battle_hunger_custom:GetIntrinsicModifierName()
    return "modifier_axe_battle_hunger_custom"
end

-- 修改器类
modifier_axe_battle_hunger_custom = class({})

function modifier_axe_battle_hunger_custom:IsHidden()
    return false
end

function modifier_axe_battle_hunger_custom:IsDebuff()
    return false
end

function modifier_axe_battle_hunger_custom:IsPurgable()
    return false
end

function modifier_axe_battle_hunger_custom:OnCreated()
    if IsServer() then
        print("=== axe_battle_hunger_custom modifier created ===")
        -- 创建粒子特效
        self:CreateParticleEffect()
        -- 初始化调试输出冷却
        self.last_debug_time = 0
    end
end

function modifier_axe_battle_hunger_custom:OnDestroy()
    if IsServer() then
        if self.particle_effect then
            ParticleManager:DestroyParticle(self.particle_effect, false)
            self.particle_effect = nil
        end
    end
end

function modifier_axe_battle_hunger_custom:CreateParticleEffect()
    local parent = self:GetParent()
    
    if parent and parent:IsAlive() and not parent:IsNull() then
        self.particle_effect = ParticleManager:CreateParticle(
            "particles/heroes/axe/troll_warlord_battletrance_buff.vpcf",
            PATTACH_OVERHEAD_FOLLOW,
            parent
        )
        if self.particle_effect then
            ParticleManager:SetParticleControl(self.particle_effect, 0, parent:GetAbsOrigin())
            ParticleManager:SetParticleControl(self.particle_effect, 1, Vector(0, 0, 0))
        end
    end
end

-- 声明修改器提供的函数
function modifier_axe_battle_hunger_custom:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
        MODIFIER_PROPERTY_LIFESTEAL,
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

-- 获取攻速加成 - 基于生命值损失百分比
function modifier_axe_battle_hunger_custom:GetModifierAttackSpeedBonus_Constant()
    local parent = self:GetParent()
    local ability = self:GetAbility()
    
    if parent:IsNull() or ability:IsNull() then
        return 0
    end
    
    local current_health = parent:GetHealth()
    local max_health = parent:GetMaxHealth()
    local missing_health_pct = ((max_health - current_health) / max_health) * 100
    
    local attackspeed_per_health_percent = ability:GetSpecialValueFor("attackspeed_per_health_percent")
    local bonus = missing_health_pct * attackspeed_per_health_percent
    
    -- 调试信息（每5秒输出一次）
    local current_time = GameRules:GetGameTime()
    if bonus > 0 and (current_time - (self.last_debug_time or 0)) >= 5.0 then
        print("=== axe_battle_hunger_custom attack speed bonus ===")
        print("Current health:", current_health, "/", max_health)
        print("Missing health %:", missing_health_pct)
        print("Attack speed bonus:", bonus)
        self.last_debug_time = current_time
    end
    
    return bonus
end

-- 获取吸血加成 - 基于生命值损失百分比
function modifier_axe_battle_hunger_custom:GetModifierLifesteal()
    local parent = self:GetParent()
    local ability = self:GetAbility()
    
    if parent:IsNull() or ability:IsNull() then
        return 0
    end
    
    local current_health = parent:GetHealth()
    local max_health = parent:GetMaxHealth()
    local missing_health_pct = ((max_health - current_health) / max_health) * 100
    
    local lifesteal_per_health_percent = ability:GetSpecialValueFor("lifesteal_per_health_percent")
    local bonus = missing_health_pct * lifesteal_per_health_percent
    
    -- 调试信息（每5秒输出一次）
    local current_time = GameRules:GetGameTime()
    if bonus > 0 and (current_time - (self.last_debug_time or 0)) >= 5.0 then
        print("=== axe_battle_hunger_custom lifesteal bonus ===")
        print("Current health:", current_health, "/", max_health)
        print("Missing health %:", missing_health_pct)
        print("Lifesteal bonus:", bonus)
        self.last_debug_time = current_time
    end
    
    return bonus
end

-- 处理攻击命中事件，实现吸血效果
function modifier_axe_battle_hunger_custom:OnAttackLanded(params)
    if not IsServer() then return end
    
    local parent = self:GetParent()
    local target = params.target
    
    -- 检查是否是我们的攻击
    if params.attacker == parent and target and target:IsAlive() then
        local ability = self:GetAbility()
        if ability:IsNull() then return end
        
        -- 计算吸血加成
        local current_health = parent:GetHealth()
        local max_health = parent:GetMaxHealth()
        local missing_health_pct = ((max_health - current_health) / max_health) * 100
        
        local lifesteal_per_health_percent = ability:GetSpecialValueFor("lifesteal_per_health_percent")
        local lifesteal_bonus = missing_health_pct * lifesteal_per_health_percent
        
        -- 如果生命值损失超过10%，提供吸血效果
        if missing_health_pct > 10 and lifesteal_bonus > 0 then
            -- 计算吸血量（基于攻击伤害）
            local attack_damage = parent:GetAttackDamage()
            local lifesteal_amount = attack_damage * (lifesteal_bonus / 100)
            
            -- 应用吸血效果
            local new_health = math.min(parent:GetHealth() + lifesteal_amount, max_health)
            parent:SetHealth(new_health)
            
            -- 显示吸血效果
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, parent, math.floor(lifesteal_amount), nil)
            
            -- 调试信息
            local current_time = GameRules:GetGameTime()
            if (current_time - (self.last_debug_time or 0)) >= 5.0 then
                print("=== axe_battle_hunger_custom lifesteal triggered ===")
                print("Attack damage:", attack_damage)
                print("Lifesteal bonus:", lifesteal_bonus, "%")
                print("Lifesteal amount:", lifesteal_amount)
                print("Health restored:", new_health - parent:GetHealth())
                self.last_debug_time = current_time
            end
        end
    end
end

-- 获取修改器属性
function modifier_axe_battle_hunger_custom:GetAttributes()
    return MODIFIER_ATTRIBUTE_PERMANENT
end

-- 获取修改器名称
function modifier_axe_battle_hunger_custom:GetModifierName()
    return "modifier_axe_battle_hunger_custom"
end

-- 获取特效名称
function modifier_axe_battle_hunger_custom:GetEffectName()
    return "particles/heroes/axe/troll_warlord_buff.vpcf"
end

-- 获取特效附加类型
function modifier_axe_battle_hunger_custom:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end
