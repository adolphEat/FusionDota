-- Lion Hex技能
-- 将目标单位变成青蛙，使其无法攻击和施法，移动速度降低到120

lion_hex = class({})

LinkLuaModifier("modifier_lion_hex", "heroes/hero_lion/lion_hex.lua", LUA_MODIFIER_MOTION_NONE)

-- 自走棋式自动施法功能
function lion_hex:OnCreated()
    if not IsServer() then return end
    print("Lion Hex: OnCreated called")
end

function lion_hex:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    print("Lion Hex: OnUpgrade called for", caster:GetUnitName())
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        print("Lion Hex: Starting auto cast timer")
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            local current_time = GameRules:GetGameTime()
            if current_time - self.last_cast_time < 1.0 then
                return 0.1
            end
            
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            print("Lion Hex Auto Cast Check - Mana:", current_mana, "Max:", max_mana, "IsFullyCastable:", self:IsFullyCastable())
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local target = self:FindNearestEnemy()
                if target then
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        print("Lion Hex: Auto casting skill!")
                        
                        local success = pcall(function()
                            caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                        end)
                        
                        if success then
                            print("Lion Hex: CastAbilityNoTarget succeeded")
                        else
                            print("Lion Hex: CastAbilityNoTarget failed")
                        end
                        
                        self.last_cast_time = current_time
                    end
                end
            end
            return 0.1
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function lion_hex:FindNearestEnemy()
    local caster = self:GetCaster()
    local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
    
    print("Lion Hex: Checking for enemies in range", auto_cast_range)
    
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        auto_cast_range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    print("Lion Hex: Found", #enemies, "enemies in range")
    
    if #enemies == 0 then
        return nil
    end
    
    -- 找到距离最近的敌方单位
    local nearest_enemy = nil
    local min_distance = math.huge
    
    for _, enemy in pairs(enemies) do
        if enemy:IsAlive() and not enemy:IsNull() then
            local distance = (enemy:GetAbsOrigin() - caster:GetAbsOrigin()):Length()
            if distance < min_distance then
                min_distance = distance
                nearest_enemy = enemy
            end
        end
    end
    
    if nearest_enemy then
        print("Lion Hex: Nearest enemy found:", nearest_enemy:GetUnitName(), "at distance:", min_distance)
    else
        print("Lion Hex: No valid enemy found")
    end
    
    return nearest_enemy
end

function lion_hex:Precache(context)
    -- 使用Dota2原生的青蛙模型，不需要预加载自定义模型
    PrecacheResource("particle", "particles/heroes/lion/lion_spell_voodoo.vpcf", context)
    PrecacheResource("soundfile", "soundevents/game_sounds_heroes/game_sounds_lion.vsndevts", context)
end

function lion_hex:OnSpellStart()
    print("=== LION HEX OnSpellStart CALLED ===")
    
    local caster = self:GetCaster()
    local target = self:FindNearestEnemy()
    
    print("Lion Hex: Target found:", target and target:GetUnitName() or "nil")
    
    if not target or target:IsNull() or not target:IsAlive() then
        print("Lion Hex: No valid target found")
        return
    end
    
    -- 应用hex效果
    local duration = self:GetSpecialValueFor("duration")
    target:AddNewModifier(caster, self, "modifier_lion_hex", {duration = duration})
    
    -- 播放音效
    EmitSoundOn("Hero_Lion.Voodoo", target)
    
    -- 播放特效
    local particle = ParticleManager:CreateParticle("particles/heroes/lion/lion_spell_voodoo.vpcf", PATTACH_ABSORIGIN_FOLLOW, target)
    ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
    ParticleManager:ReleaseParticleIndex(particle)
    
    -- 重置单位状态，确保继续普通攻击
    caster:Stop()
    caster:MoveToPosition(caster:GetAbsOrigin())
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
