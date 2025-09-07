-- Lion Hex技能
-- 将目标单位变成青蛙，使其无法攻击和施法，移动速度降低到120

lion_hex = class({})

LinkLuaModifier("modifier_lion_hex", "heroes/hero_lion/lion_hex.lua", LUA_MODIFIER_MOTION_NONE)

function lion_hex:Precache(context)
    -- 使用Dota2原生的青蛙模型，不需要预加载自定义模型
    PrecacheResource("particle", "particles/heroes/lion/lion_spell_voodoo.vpcf", context)
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_lion.vsndevts", context)
end

function lion_hex:OnSpellStart()
    local caster = self:GetCaster()
    local target = self:GetCursorTarget()
    
    if not target then return end
    
    -- 应用hex效果
    local duration = self:GetSpecialValueFor("duration")
    target:AddNewModifier(caster, self, "modifier_lion_hex", {duration = duration})
    
    -- 播放音效
    EmitSoundOn("Hero_Lion.Voodoo", target)
    
    -- 播放特效
    local particle = ParticleManager:CreateParticle("particles/heroes/lion/lion_spell_voodoo.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
    ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
    ParticleManager:ReleaseParticleIndex(particle)
end

-- Hex效果modifier
modifier_lion_hex = class({})

function modifier_lion_hex:IsHidden() 
    return false 
end

function modifier_lion_hex:IsDebuff() 
    return true 
end

function modifier_lion_hex:IsPurgable() 
    return true 
end

function modifier_lion_hex:OnCreated()
    if not IsServer() then return end
    
    local parent = self:GetParent()
    
    -- 保存原始模型信息
    self.original_model = parent:GetModelName()
    self.original_model_scale = parent:GetModelScale()
    
    -- 直接尝试改变模型，不使用延迟
    self:ChangeModelToFrog(parent)
end

function modifier_lion_hex:ChangeModelToFrog(parent)
    -- 使用Dota2原生的青蛙模型，这些模型是已知可用的
    local frog_models = {
        "models/props_gameplay/frog.vmdl",           -- Dota2原生青蛙模型
        "models/creeps/lane_creeps/creep_radiant_ranged/radiant_ranged_creep.vmdl",  -- 备用：小兵模型
        "models/creeps/lane_creeps/creep_dire_ranged/dire_ranged_creep.vmdl"         -- 备用：小兵模型
    }
    
    local model_changed = false
    
    for _, model_path in ipairs(frog_models) do
        if not model_changed then
            local success = pcall(function()
                parent:SetModelScale(0.8)  -- 设置合适的比例
                parent:SetModel(model_path)
                parent:SetOriginalModel(model_path)
                
                -- 强制刷新模型
                parent:SetModelScale(0.8)
                
                print("Lion Hex: Successfully changed model to " .. model_path)
                model_changed = true
            end)
            
            if success and model_changed then
                break
            end
        end
    end
    
    if not model_changed then
        print("Lion Hex: Failed to change model, using original")
    end
end

function modifier_lion_hex:OnDestroy()
    if not IsServer() then return end
    
    local parent = self:GetParent()
    
    -- 恢复原始模型
    if self.original_model and not parent:IsNull() then
        parent:SetModel(self.original_model)
        parent:SetModelScale(self.original_model_scale or 1.0)
        parent:SetOriginalModel(self.original_model)
        
        print("Lion Hex removed from: " .. parent:GetUnitName() .. ", Model restored to: " .. self.original_model)
    end
end

function modifier_lion_hex:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_MOVESPEED_BASE_OVERRIDE,
        MODIFIER_PROPERTY_DISABLE_ATTACKING,
        MODIFIER_PROPERTY_DISABLE_CASTING_ABILITIES,
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_lion_hex:GetModifierMoveSpeedOverride()
    return self:GetAbility():GetSpecialValueFor("movespeed")
end

function modifier_lion_hex:GetModifierAttackSpeedBonus_Constant()
    return -1000  -- 大幅降低攻击速度，实际上禁用攻击
end

function modifier_lion_hex:GetDisableAttacking()
    return 1
end

function modifier_lion_hex:GetDisableCastingAbilities()
    return 1
end

function modifier_lion_hex:GetEffectName()
    return "particles/heroes/lion/lion_spell_voodoo.vpcf"
end

function modifier_lion_hex:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

-- 额外禁用攻击和施法
function modifier_lion_hex:CheckState()
    return {
        [MODIFIER_STATE_DISARMED] = true,
        [MODIFIER_STATE_SILENCED] = true,
        [MODIFIER_STATE_MUTED] = true
    }
end
