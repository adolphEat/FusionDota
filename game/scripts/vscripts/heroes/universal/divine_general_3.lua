-- 神将3羁绊技能 - 全局buff技能
-- 神将单位获得10点护甲，10点魔抗，每次普通攻击命中恢复全体友军40点生命
-- 神将单位：秀逗魔导师(lina1)、灰烬之灵(ember_spirit1)、破晓晨星(dawnbreaker1)、宙斯(zeus1)

LinkLuaModifier("modifier_divine_general_3", "heroes/universal/divine_general_3", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_divine_general_3_effect", "heroes/universal/divine_general_3", LUA_MODIFIER_MOTION_NONE)

if divine_general_3 == nil then
    divine_general_3 = class({})
end

function divine_general_3:GetIntrinsicModifierName()
    return "modifier_divine_general_3"
end

-- 全局神将羁绊效果修饰符
if modifier_divine_general_3 == nil then
    modifier_divine_general_3 = class({})
end

function modifier_divine_general_3:IsHidden()
    return false
end

function modifier_divine_general_3:IsPurgable()
    return false
end

function modifier_divine_general_3:IsDebuff()
    return false
end

function modifier_divine_general_3:IsPassive()
    return true
end

function modifier_divine_general_3:GetTexture()
    return "item_heart"
end

-- 神将单位列表
function modifier_divine_general_3:IsDivineGeneralUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local divine_general_units = {
        "lina1",
        "ember_spirit1",
        "dawnbreaker1",
        "zeus1"
    }
    
    for _, divine_name in pairs(divine_general_units) do
        if unit_name == divine_name then
            return true
        end
    end
    
    return false
end

function modifier_divine_general_3:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取数值
        self.armor_bonus = self:GetAbility():GetSpecialValueFor("armor_bonus") or 10.0
        self.magic_resistance_bonus = self:GetAbility():GetSpecialValueFor("magic_resistance_bonus") or 10.0
        self.heal_per_attack = self:GetAbility():GetSpecialValueFor("heal_per_attack") or 40.0
        
        -- 为所有己方神将单位添加效果
        self:ApplyDivineGeneralEffectToAllies()
        
        -- 定期检查并更新所有友军的神将效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_divine_general_3:OnIntervalThink()
    if IsServer() then
        self:ApplyDivineGeneralEffectToAllies()
    end
end

function modifier_divine_general_3:ApplyDivineGeneralEffectToAllies()
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
    
    -- 为每个神将单位添加效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否是神将单位
            if self:IsDivineGeneralUnit(ally) then
                -- 检查是否已经有神将效果
                if not ally:HasModifier("modifier_divine_general_3_effect") then
                    -- 直接添加神将效果修饰符
                    local success = pcall(function()
                        ally:AddNewModifier(caster, self:GetAbility(), "modifier_divine_general_3_effect", {})
                    end)
                end
            else
                -- 如果不是神将单位，移除效果（如果存在）
                if ally:HasModifier("modifier_divine_general_3_effect") then
                    ally:RemoveModifierByName("modifier_divine_general_3_effect")
                end
            end
        end
    end
end

function modifier_divine_general_3:GetEffectName()
    return "particles/items_fx/aegis_respawn.vpcf"
end

function modifier_divine_general_3:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 神将单位效果修饰符
if modifier_divine_general_3_effect == nil then
    modifier_divine_general_3_effect = class({})
end

function modifier_divine_general_3_effect:IsHidden()
    return true
end

function modifier_divine_general_3_effect:IsPurgable()
    return false
end

function modifier_divine_general_3_effect:IsDebuff()
    return false
end

function modifier_divine_general_3_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
        MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS,
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

function modifier_divine_general_3_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取数值
        self.armor_bonus = self:GetAbility():GetSpecialValueFor("armor_bonus") or 10.0
        self.magic_resistance_bonus = self:GetAbility():GetSpecialValueFor("magic_resistance_bonus") or 10.0
        self.heal_per_attack = self:GetAbility():GetSpecialValueFor("heal_per_attack") or 40.0
    end
end

-- 提供护甲加成
function modifier_divine_general_3_effect:GetModifierPhysicalArmorBonus()
    return self.armor_bonus or 10.0
end

-- 提供魔抗加成
function modifier_divine_general_3_effect:GetModifierMagicalResistanceBonus()
    return self.magic_resistance_bonus or 10.0
end

function modifier_divine_general_3_effect:OnAttackLanded(params)
    if not IsServer() then return end
    
    local attacker = params.attacker
    local target = params.target
    
    -- 检查是否是拥有此modifier的单位发起的攻击
    if attacker ~= self:GetParent() then return end
    
    -- 检查目标是否有效
    if not target or target:IsNull() then return end
    
    -- 检查是否是敌人
    if attacker:GetTeamNumber() == target:GetTeamNumber() then return end
    
    -- 检查是否是普通攻击（不是技能攻击）
    if params.inflictor then return end
    
    -- 恢复全体友军生命
    local caster = self:GetAbility():GetCaster()
    if not caster or caster:IsNull() then return end
    
    local team = attacker:GetTeamNumber()
    local attacker_pos = attacker:GetAbsOrigin()
    
    -- 获取所有友军单位
    local allies = FindUnitsInRadius(
        team,
        attacker_pos,
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 为每个友军恢复生命
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            local current_health = ally:GetHealth()
            local max_health = ally:GetMaxHealth()
            local new_health = math.min(current_health + self.heal_per_attack, max_health)
            ally:SetHealth(new_health)
            
            -- 播放治疗特效
            local particle = ParticleManager:CreateParticle(
                "particles/generic_gameplay/generic_lifesteal.vpcf",
                PATTACH_ABSORIGIN_FOLLOW,
                ally
            )
            ParticleManager:SetParticleControl(particle, 0, ally:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(particle)
        end
    end
end

