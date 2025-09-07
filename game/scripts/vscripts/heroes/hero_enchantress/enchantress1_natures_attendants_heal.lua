-- enchantress1_natures_attendants_heal.lua
-- 自然之助治疗技能：召唤治疗精灵，持续治疗周围友军

enchantress1_natures_attendants_heal = class({})
LinkLuaModifier("modifier_enchantress1_natures_attendants_heal", "heroes/hero_enchantress/enchantress1_natures_attendants_heal.lua", LUA_MODIFIER_MOTION_NONE)

function enchantress1_natures_attendants_heal:OnSpellStart()
    local caster = self:GetCaster()
    local heal_radius = self:GetSpecialValueFor("heal_radius")
    local duration = self:GetSpecialValueFor("duration")
    
    -- 为施法者添加治疗修改器
    caster:AddNewModifier(caster, self, "modifier_enchantress1_natures_attendants_heal", {duration = duration})
    
    -- 创建治疗特效
    local heal_particle = ParticleManager:CreateParticle(
        "particles/heroes/enchantress/enchantress_natures_attendants_heal.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    ParticleManager:SetParticleControl(heal_particle, 0, caster:GetAbsOrigin())
    ParticleManager:SetParticleControl(heal_particle, 1, Vector(heal_radius, 0, 0))
    
    -- 将特效绑定到修改器，确保在修改器销毁时自动清理
    local modifier = caster:FindModifierByName("modifier_enchantress1_natures_attendants_heal")
    if modifier then
        modifier:AddParticle(heal_particle, false, false, -1, false, false)
        
        -- 创建持续飞行的精灵特效
        local flying_wisps_particle = ParticleManager:CreateParticle(
            "particles/heroes/enchantress/enchantress_natures_attendants_count8.vpcf",
            PATTACH_WORLDORIGIN,
            nil
        )
        ParticleManager:SetParticleControl(flying_wisps_particle, 0, caster:GetAbsOrigin())
        ParticleManager:SetParticleControl(flying_wisps_particle, 1, Vector(heal_radius, 0, 0))
        ParticleManager:SetParticleControl(flying_wisps_particle, 2, caster:GetAbsOrigin())
        modifier:AddParticle(flying_wisps_particle, false, false, -1, false, false)
    end
    
    -- 播放施法音效
    EmitSoundOn("Hero_Enchantress.Natures_Attendants", caster)
end

-- 治疗修改器
modifier_enchantress1_natures_attendants_heal = class({})

function modifier_enchantress1_natures_attendants_heal:IsHidden()
    return false
end

function modifier_enchantress1_natures_attendants_heal:IsDebuff()
    return false
end

function modifier_enchantress1_natures_attendants_heal:IsPurgable()
    return true
end

function modifier_enchantress1_natures_attendants_heal:OnCreated()
    if IsServer() then
        local ability = self:GetAbility()
        local heal_interval = ability:GetSpecialValueFor("heal_interval")
        local heal_per_interval = ability:GetSpecialValueFor("heal_per_interval")
        local heal_radius = ability:GetSpecialValueFor("heal_radius")
        
        -- 存储治疗参数
        self.heal_interval = heal_interval
        self.heal_per_interval = heal_per_interval
        self.heal_radius = heal_radius
        
        -- 开始治疗计时器
        self:StartIntervalThink(heal_interval)
    end
end

function modifier_enchantress1_natures_attendants_heal:OnIntervalThink()
    if IsServer() then
        local caster = self:GetCaster()
        local heal_per_interval = self.heal_per_interval
        local heal_radius = self.heal_radius
        
        -- 查找范围内的友军
        local allies = FindUnitsInRadius(
            caster:GetTeamNumber(),
            caster:GetAbsOrigin(),
            nil,
            heal_radius,
            DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        -- 治疗每个友军
        for _, ally in pairs(allies) do
            if ally:IsAlive() and not ally:IsNull() then
                -- 计算实际治疗量（考虑魔法抗性等）
                local heal_amount = heal_per_interval
                
                -- 应用治疗
                ally:Heal(heal_amount, caster)
                
                -- 显示治疗效果
                SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, ally, math.floor(heal_amount), nil)
                
                -- 创建治疗粒子特效
                local heal_particle = ParticleManager:CreateParticle(
                    "particles/heroes/enchantress/enchantress_natures_attendants_heal.vpcf",
                    PATTACH_ABSORIGIN_FOLLOW,
                    ally
                )
                ParticleManager:SetParticleControl(heal_particle, 0, ally:GetAbsOrigin())
                ParticleManager:ReleaseParticleIndex(heal_particle)
            end
        end
    end
end

function modifier_enchantress1_natures_attendants_heal:OnDestroy()
    if IsServer() then
        self:StartIntervalThink(-1) -- 停止计时器
    end
end

function modifier_enchantress1_natures_attendants_heal:GetModifierName()
    return "modifier_enchantress1_natures_attendants_heal"
end
