-- 虚空2羁绊技能 - 全局buff技能
-- 虚空单位的普通攻击与技能附带15%的真实伤害
-- 虚空单位：雷泽(razor1)、死亡先知(death_prophet1)、影魔(shadow_fiend1)、谜团(enigma1)

LinkLuaModifier("modifier_void_2", "heroes/universal/void_2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_void_2_effect", "heroes/universal/void_2", LUA_MODIFIER_MOTION_NONE)

if void_2 == nil then
    void_2 = class({})
end

function void_2:GetIntrinsicModifierName()
    return "modifier_void_2"
end

function void_2:GetAbilityTextureName()
    return "dazzle_nothl_projection"
end

-- 全局虚空羁绊效果修饰符
if modifier_void_2 == nil then
    modifier_void_2 = class({})
end

function modifier_void_2:IsHidden()
    return false
end

function modifier_void_2:IsPurgable()
    return false
end

function modifier_void_2:IsDebuff()
    return false
end

function modifier_void_2:IsPassive()
    return true
end

function modifier_void_2:GetTexture()
    return "dazzle_nothl_projection"
end

-- 虚空单位列表
function modifier_void_2:IsVoidUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local void_units = {
        "razor1",           -- 雷泽
        "death_prophet1",   -- 死亡先知
        "shadow_fiend1",    -- 影魔
        "enigma1",          -- 谜团
        "drow_ranger1"      -- 卓尔游侠
    }
    
    for _, void_name in pairs(void_units) do
        if unit_name == void_name then
            return true
        end
    end
    
    return false
end

function modifier_void_2:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取真实伤害百分比
        self.pure_damage_percent = self:GetAbility():GetSpecialValueFor("pure_damage_percent") or 15.0
        
        -- 为所有己方虚空单位添加效果
        self:ApplyVoidEffectToAllies()
        
        -- 定期检查并更新所有友军的虚空效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_void_2:OnIntervalThink()
    if IsServer() then
        self:ApplyVoidEffectToAllies()
    end
end

function modifier_void_2:ApplyVoidEffectToAllies()
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
    
    -- 为每个虚空单位添加效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否是虚空单位
            if self:IsVoidUnit(ally) then
                -- 检查是否已经有虚空效果
                if not ally:HasModifier("modifier_void_2_effect") then
                    -- 直接添加虚空效果修饰符
                    local success = pcall(function()
                        ally:AddNewModifier(caster, self:GetAbility(), "modifier_void_2_effect", {})
                    end)
                end
            else
                -- 如果不是虚空单位，移除效果（如果存在）
                if ally:HasModifier("modifier_void_2_effect") then
                    ally:RemoveModifierByName("modifier_void_2_effect")
                end
            end
        end
    end
end

function modifier_void_2:GetEffectName()
    return "particles/items_fx/aegis_respawn.vpcf"
end

function modifier_void_2:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 虚空单位效果修饰符
if modifier_void_2_effect == nil then
    modifier_void_2_effect = class({})
end

function modifier_void_2_effect:IsHidden()
    return true
end

function modifier_void_2_effect:IsPurgable()
    return false
end

function modifier_void_2_effect:IsDebuff()
    return false
end

function modifier_void_2_effect:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ATTACK_LANDED,
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

function modifier_void_2_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取真实伤害百分比
        self.pure_damage_percent = self:GetAbility():GetSpecialValueFor("pure_damage_percent") or 15.0
    end
end

-- 处理普通攻击的真实伤害
function modifier_void_2_effect:OnAttackLanded(params)
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
    
    -- 计算真实伤害（15%的原始伤害）
    local pure_damage = damage * (self.pure_damage_percent / 100.0)
    
    if pure_damage > 0 then
        -- 应用真实伤害
        local damage_table = {
            victim = target,
            attacker = attacker,
            damage = pure_damage,
            damage_type = DAMAGE_TYPE_PURE,
            damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
            ability = self:GetAbility()
        }
        ApplyDamage(damage_table)
        
        -- 播放特效
        local particle = ParticleManager:CreateParticle(
            "particles/generic_gameplay/faceless_void_time_lock_bash.vpcf",
            PATTACH_ABSORIGIN_FOLLOW,
            target
        )
        ParticleManager:SetParticleControl(particle, 0, target:GetAbsOrigin())
        ParticleManager:ReleaseParticleIndex(particle)
    end
end

-- 处理技能伤害的真实伤害
function modifier_void_2_effect:OnTakeDamage(params)
    if not IsServer() then return end
    
    local attacker = params.attacker
    local victim = params.unit
    local damage = params.damage
    local damage_type = params.damage_type
    local inflictor = params.inflictor
    
    -- 检查是否是拥有此modifier的单位造成的伤害
    if attacker ~= self:GetParent() or attacker == victim then return end
    
    -- 检查是否是敌人
    if attacker:GetTeamNumber() == victim:GetTeamNumber() then return end
    
    -- 检查是否是技能伤害（有inflictor表示是技能，且不是普通攻击）
    if not inflictor then return end
    
    -- 检查伤害类型（排除真实伤害本身，避免无限循环）
    if damage_type == DAMAGE_TYPE_PURE then return end
    
    -- 避免重复处理（如果已经在OnAttackLanded中处理过普通攻击）
    -- 这里只处理技能伤害，所以不需要额外检查
    
    -- 计算真实伤害（15%的原始伤害）
    local pure_damage = damage * (self.pure_damage_percent / 100.0)
    
    if pure_damage > 0 then
        -- 应用真实伤害
        local damage_table = {
            victim = victim,
            attacker = attacker,
            damage = pure_damage,
            damage_type = DAMAGE_TYPE_PURE,
            damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
            ability = self:GetAbility()
        }
        ApplyDamage(damage_table)
        
        -- 播放特效
        local particle = ParticleManager:CreateParticle(
            "particles/generic_gameplay/faceless_void_time_lock_bash.vpcf",
            PATTACH_ABSORIGIN_FOLLOW,
            victim
        )
        ParticleManager:SetParticleControl(particle, 0, victim:GetAbsOrigin())
        ParticleManager:ReleaseParticleIndex(particle)
    end
end

