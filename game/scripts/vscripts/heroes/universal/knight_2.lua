-- 骑士2羁绊技能 - 全局buff技能
-- 己方所有单位受到伤害（普攻和技能都生效）格挡20点伤害
-- 骑士单位：战争之矛(mars1)、熊战士(ursa1)、灰烬之灵(ember_spirit1)、孽主(underlord1)、破晓星辰(dawnbreaker1)

LinkLuaModifier("modifier_knight_2", "heroes/universal/knight_2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_knight_2_effect", "heroes/universal/knight_2", LUA_MODIFIER_MOTION_NONE)

if knight_2 == nil then
    knight_2 = class({})
end

function knight_2:GetIntrinsicModifierName()
    return "modifier_knight_2"
end

-- 全局骑士羁绊效果修饰符
if modifier_knight_2 == nil then
    modifier_knight_2 = class({})
end

function modifier_knight_2:IsHidden()
    return false
end

function modifier_knight_2:IsPurgable()
    return false
end

function modifier_knight_2:IsDebuff()
    return false
end

function modifier_knight_2:IsPassive()
    return true
end

function modifier_knight_2:GetTexture()
    return "item_buckler"
end

-- 骑士单位列表
function modifier_knight_2:IsKnightUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local knight_units = {
        "mars1",           -- 战争之矛
        "ursa1",           -- 熊战士
        "ember_spirit1",  -- 灰烬之灵
        "underlord1",     -- 孽主
        "dawnbreaker1"    -- 破晓星辰
    }
    
    for _, knight_name in pairs(knight_units) do
        if unit_name == knight_name then
            return true
        end
    end
    
    return false
end

function modifier_knight_2:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 为所有己方单位添加格挡效果
        self:ApplyKnightEffectToAllies()
        
        -- 定期检查并更新所有友军的骑士效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_knight_2:OnIntervalThink()
    if IsServer() then
        self:ApplyKnightEffectToAllies()
    end
end

function modifier_knight_2:ApplyKnightEffectToAllies()
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
    
    -- 为每个己方单位添加格挡效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否已经有骑士格挡效果
            if not ally:HasModifier("modifier_knight_2_effect") then
                -- 直接添加骑士格挡效果修饰符
                local success = pcall(function()
                    ally:AddNewModifier(caster, self:GetAbility(), "modifier_knight_2_effect", {})
                end)
            end
        end
    end
end

-- 己方单位格挡效果修饰符
if modifier_knight_2_effect == nil then
    modifier_knight_2_effect = class({})
end

function modifier_knight_2_effect:IsHidden()
    return false
end

function modifier_knight_2_effect:IsPurgable()
    return false
end

function modifier_knight_2_effect:IsDebuff()
    return false
end

function modifier_knight_2_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_INCOMING_DAMAGE_CONSTANT
    }
end

function modifier_knight_2_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取格挡伤害值
        local ability = self:GetAbility()
        if ability and not ability:IsNull() then
            self.damage_block = ability:GetSpecialValueFor("damage_block") or 20.0
        else
            self.damage_block = 20.0
        end
    end
end

-- 提供固定伤害格挡（在抗性计算之前生效）
-- 返回负值表示减少的伤害量（格挡20点伤害）
function modifier_knight_2_effect:GetModifierIncomingDamageConstant(params)
    -- 从技能配置获取格挡伤害值（客户端和服务器端都需要）
    local ability = self:GetAbility()
    local damage_block = 20.0
    if ability and not ability:IsNull() then
        damage_block = ability:GetSpecialValueFor("damage_block") or 20.0
    elseif self.damage_block then
        damage_block = self.damage_block
    end
    
    -- 检查是否是敌人造成的伤害
    local attacker = params.attacker
    local victim = params.target or self:GetParent()
    
    if attacker and not attacker:IsNull() then
        -- 只格挡敌人造成的伤害
        if attacker:GetTeamNumber() ~= victim:GetTeamNumber() then
            -- 返回负值表示减少的伤害量（格挡20点伤害）
            -- 这个值会在抗性计算之前应用
            return -damage_block
        end
    end
    
    return 0
end

function modifier_knight_2_effect:GetTexture()
    return "item_buckler"
end

