-- 仙灵2羁绊技能 - 全局buff技能
-- 己方仙灵的普攻有30%机率减少目标10点法力，并恢复自身等额法力
-- 仙灵单位：树精卫士(treant_protector1)、风行者(windrunner1)、神谕者(oracle1)、水晶室女(crystal_maiden1)

LinkLuaModifier("modifier_sylph_2", "heroes/universal/sylph_2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_sylph_2_effect", "heroes/universal/sylph_2", LUA_MODIFIER_MOTION_NONE)

if sylph_2 == nil then
    sylph_2 = class({})
end

function sylph_2:GetIntrinsicModifierName()
    return "modifier_sylph_2"
end

function sylph_2:GetAbilityTextureName()
    return "brewmaster_primal_companion_fire"
end

-- 全局仙灵羁绊效果修饰符
if modifier_sylph_2 == nil then
    modifier_sylph_2 = class({})
end

function modifier_sylph_2:IsHidden()
    return false
end

function modifier_sylph_2:IsPurgable()
    return false
end

function modifier_sylph_2:IsDebuff()
    return false
end

function modifier_sylph_2:IsPassive()
    return true
end

function modifier_sylph_2:GetTexture()
    return "brewmaster_primal_companion_fire"
end

-- 仙灵单位列表
function modifier_sylph_2:IsSylphUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local sylph_units = {
        "treant_protector1",
        "windrunner1",
        "oracle1",
        "crystal_maiden1"
    }
    
    for _, sylph_name in pairs(sylph_units) do
        if unit_name == sylph_name then
            return true
        end
    end
    
    return false
end

function modifier_sylph_2:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取触发机率和法力燃烧值
        self.proc_chance = self:GetAbility():GetSpecialValueFor("proc_chance") or 30.0
        self.mana_burn = self:GetAbility():GetSpecialValueFor("mana_burn") or 10.0
        
        -- 为所有己方仙灵单位添加效果
        self:ApplySylphEffectToAllies()
        
        -- 定期检查并更新所有友军的仙灵效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_sylph_2:OnIntervalThink()
    if IsServer() then
        self:ApplySylphEffectToAllies()
    end
end

function modifier_sylph_2:ApplySylphEffectToAllies()
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
    
    -- 为每个仙灵单位添加效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否是仙灵单位
            if self:IsSylphUnit(ally) then
                -- 检查是否已经有仙灵效果
                if not ally:HasModifier("modifier_sylph_2_effect") then
                    -- 直接添加仙灵效果修饰符
                    local success = pcall(function()
                        ally:AddNewModifier(caster, self:GetAbility(), "modifier_sylph_2_effect", {})
                    end)
                end
            else
                -- 如果不是仙灵单位，移除效果（如果存在）
                if ally:HasModifier("modifier_sylph_2_effect") then
                    ally:RemoveModifierByName("modifier_sylph_2_effect")
                end
            end
        end
    end
end

function modifier_sylph_2:GetEffectName()
    return "particles/items_fx/aegis_respawn.vpcf"
end

function modifier_sylph_2:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 仙灵单位效果修饰符
if modifier_sylph_2_effect == nil then
    modifier_sylph_2_effect = class({})
end

function modifier_sylph_2_effect:IsHidden()
    return true
end

function modifier_sylph_2_effect:IsPurgable()
    return false
end

function modifier_sylph_2_effect:IsDebuff()
    return false
end

function modifier_sylph_2_effect:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

function modifier_sylph_2_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取触发机率和法力燃烧值
        self.proc_chance = self:GetAbility():GetSpecialValueFor("proc_chance") or 30.0
        self.mana_burn = self:GetAbility():GetSpecialValueFor("mana_burn") or 10.0
    end
end

function modifier_sylph_2_effect:OnAttackLanded(params)
    if not IsServer() then return end
    
    local attacker = params.attacker
    local target = params.target
    
    -- 检查是否是拥有此modifier的单位发起的攻击
    if attacker ~= self:GetParent() then return end
    
    -- 检查目标是否有效
    if not target or target:IsNull() then return end
    
    -- 检查目标是否是敌人
    if attacker:GetTeamNumber() == target:GetTeamNumber() then return end
    
    -- 检查是否是普通攻击（不是技能攻击）
    if params.inflictor then return end
    
    -- 30%机率触发
    local roll = RandomFloat(0, 100)
    if roll <= self.proc_chance then
        -- 减少目标法力
        local target_mana = target:GetMana()
        local mana_to_burn = math.min(self.mana_burn, target_mana)
        
        if mana_to_burn > 0 then
            -- 使用 SetMana 减少目标法力
            local new_target_mana = math.max(0, target_mana - mana_to_burn)
            target:SetMana(new_target_mana)
            
            -- 恢复自身等额法力
            local attacker_mana = attacker:GetMana()
            local attacker_max_mana = attacker:GetMaxMana()
            local new_attacker_mana = math.min(attacker_mana + mana_to_burn, attacker_max_mana)
            attacker:SetMana(new_attacker_mana)
            
            -- 播放特效
            local particle = ParticleManager:CreateParticle(
                "particles/generic_gameplay/generic_manaburn.vpcf",
                PATTACH_ABSORIGIN_FOLLOW,
                target
            )
            ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(particle)
            
            -- 播放音效
            EmitSoundOn("Hero_Antimage.ManaBreak", target)
        end
    end
end

