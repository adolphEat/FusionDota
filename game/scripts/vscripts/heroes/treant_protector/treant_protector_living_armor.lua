treant_protector_living_armor = class({})

LinkLuaModifier("modifier_treant_protector_living_armor", "heroes/treant_protector/treant_protector_living_armor.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_treant_protector_living_armor_timer", "heroes/treant_protector/treant_protector_living_armor.lua", LUA_MODIFIER_MOTION_NONE)

-- 自走棋式自动施法功能
function treant_protector_living_armor:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 启动自动施法检查
    self:StartAutoCastCheck()
end

function treant_protector_living_armor:StartAutoCastCheck()
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
        
        return 0.1 -- 每0.1秒检查一次
    end, "treant_living_armor_auto_cast_" .. caster:GetEntityIndex())
end

function treant_protector_living_armor:CheckAutoCast()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() or not caster:IsAlive() then return end
    
    -- 检查蓝量是否足够
    local mana_cost = self:GetManaCost(self:GetLevel())
    local current_mana = caster:GetMana()
    local max_mana = caster:GetMaxMana()
    
    if current_mana >= mana_cost and self:IsFullyCastable() then
        -- 检查是否已经在冷却中或正在施法
        if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
            -- 检查是否已经有Living Armor效果
            local existing_modifier = caster:FindModifierByName("modifier_treant_protector_living_armor")
            if not existing_modifier then
                self:AutoCastOnSelf()
            end
        end
    end
end

function treant_protector_living_armor:AutoCastOnSelf()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() or not caster:IsAlive() then return end
    
    -- 使用CastAbilityNoTarget来释放技能
    caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
end

function treant_protector_living_armor:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local target = caster -- 直接对自己释放
    
    -- 播放施法音效
    EmitSoundOn("Hero_Treant.Living_Armor.Cast", caster)
    
    -- 为自己添加Living Armor效果
    local modifier = target:AddNewModifier(caster, self, "modifier_treant_protector_living_armor", {duration = self:GetSpecialValueFor("duration")})
    
    if modifier then
        -- 播放目标音效
        EmitSoundOn("Hero_Treant.Living_Armor.Target", target)
        
        -- 显示施法成功提示
        SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, target, 0, nil)
    end
end

-- Living Armor效果modifier
modifier_treant_protector_living_armor = class({})

function modifier_treant_protector_living_armor:IsHidden() 
    return false 
end

function modifier_treant_protector_living_armor:IsDebuff() 
    return false 
end

function modifier_treant_protector_living_armor:IsPurgable() 
    return true 
end

function modifier_treant_protector_living_armor:OnCreated()
    if not IsServer() then return end
    
    -- 确保技能存在且有效
    local ability = self:GetAbility()
    if not ability or ability:IsNull() then
        return
    end
    
    self.armor_bonus = ability:GetSpecialValueFor("armor_bonus")
    self.magic_resistance = ability:GetSpecialValueFor("magic_resistance")
    self.health_regen = ability:GetSpecialValueFor("health_regen")
    
    -- 如果获取失败，使用默认值
    if not self.armor_bonus then
        self.armor_bonus = 5
    end
    if not self.magic_resistance then
        self.magic_resistance = 10
    end
    if not self.health_regen then
        self.health_regen = 30
    end
    
    -- 启动生命恢复定时器
    self:StartHealTimer()
    
    -- 手动创建粒子特效，确保跟随单位
    local parent = self:GetParent()
    if parent and parent:IsAlive() and not parent:IsNull() then
        self.particle_effect = ParticleManager:CreateParticle("particles/heroes/treant_protector/treant_livingarmor.vpcf", PATTACH_ABSORIGIN_FOLLOW, parent)
        if self.particle_effect then
            ParticleManager:SetParticleControl(self.particle_effect, 0, parent:GetAbsOrigin())
            ParticleManager:SetParticleControlEnt(self.particle_effect, 1, parent, PATTACH_ABSORIGIN_FOLLOW, "attach_hitloc", parent:GetAbsOrigin(), true)
        end
    end
end



function modifier_treant_protector_living_armor:StartHealTimer()
    if not IsServer() then return end
    
    local parent = self:GetParent()
    if parent and parent:IsAlive() and not parent:IsNull() then
        local heal_amount = self.health_regen or 0 -- 每秒恢复一次，直接使用设定值
        
        -- 立即恢复一次生命
        local new_health = math.min(parent:GetHealth() + heal_amount, parent:GetMaxHealth())
        parent:SetHealth(new_health)
        
        -- 创建1秒的定时器modifier
        self.timer_handle = parent:AddNewModifier(parent, nil, "modifier_treant_protector_living_armor_timer", {duration = 1.0})
    end
end

function modifier_treant_protector_living_armor:OnRefresh()
    if not IsServer() then return end
    
    self.armor_bonus = self:GetAbility():GetSpecialValueFor("armor_bonus")
    self.magic_resistance = self:GetAbility():GetSpecialValueFor("magic_resistance")
    self.health_regen = self:GetAbility():GetSpecialValueFor("health_regen")
    
    -- 刷新时也重新启动生命恢复定时器
    self:OnCreated()
end

function modifier_treant_protector_living_armor:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
        MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
        MODIFIER_PROPERTY_HEALTH_REGEN_CONSTANT
    }
end

function modifier_treant_protector_living_armor:GetModifierPhysicalArmorBonus()
    return self.armor_bonus or 5
end

function modifier_treant_protector_living_armor:GetModifierMagicalResistanceBonus()
    return self.magic_resistance or 10
end

function modifier_treant_protector_living_armor:GetModifierHealthRegenConstant()
    return self.health_regen
end





function modifier_treant_protector_living_armor:GetEffectName()
    return "" -- 手动创建粒子特效，不需要自动绑定
end

function modifier_treant_protector_living_armor:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

function modifier_treant_protector_living_armor:GetEffectColor()
    return Vector(0, 255, 0) -- 绿色护甲效果
end

function modifier_treant_protector_living_armor:OnDestroy()
    if not IsServer() then return end
    
    -- 播放效果结束音效
    EmitSoundOn("Hero_Treant.Living_Armor.End", self:GetParent())
    
    -- 清理定时器
    if self.timer_handle then
        self.timer_handle:Destroy()
        self.timer_handle = nil
    end
    
    -- 清理粒子特效
    if self.particle_effect then
        ParticleManager:DestroyParticle(self.particle_effect, false)
        ParticleManager:ReleaseParticleIndex(self.particle_effect)
        self.particle_effect = nil
    end
end

-- 定时器modifier
modifier_treant_protector_living_armor_timer = class({})

function modifier_treant_protector_living_armor_timer:IsHidden() 
    return true 
end

function modifier_treant_protector_living_armor_timer:IsDebuff() 
    return false 
end

function modifier_treant_protector_living_armor_timer:IsPurgable() 
    return false 
end

function modifier_treant_protector_living_armor_timer:OnDestroy()
    if not IsServer() then return end
    
    -- 当这个定时器modifier结束时，触发下一次生命恢复
    local parent = self:GetParent()
    if parent and parent:IsAlive() and not parent:IsNull() then
        local living_armor_modifier = parent:FindModifierByName("modifier_treant_protector_living_armor")
        if living_armor_modifier and not living_armor_modifier:IsNull() then
            -- 重新启动定时器
            living_armor_modifier:StartHealTimer()
        end
    end
end
