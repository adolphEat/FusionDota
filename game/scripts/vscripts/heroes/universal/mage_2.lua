-- 法师2羁绊技能 - 全局buff技能
-- 所有友军每秒蓝量回复增加2点/s，法师单位获得双倍增益（4点/s）
-- 法师单位：魅惑魔女(enchantress1)、秀逗魔导师(lina1)、水晶室女(crystal_maiden1)、谜团(enigma1)

LinkLuaModifier("modifier_mage_2", "heroes/universal/mage_2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_mage_2_effect", "heroes/universal/mage_2", LUA_MODIFIER_MOTION_NONE)

if mage_2 == nil then
    mage_2 = class({})
end

function mage_2:GetIntrinsicModifierName()
    return "modifier_mage_2"
end

-- 全局法师羁绊效果修饰符
if modifier_mage_2 == nil then
    modifier_mage_2 = class({})
end

function modifier_mage_2:IsHidden()
    return false
end

function modifier_mage_2:IsPurgable()
    return false
end

function modifier_mage_2:IsDebuff()
    return false
end

function modifier_mage_2:IsPassive()
    return true
end

function modifier_mage_2:GetTexture()
    return "item_energy_booster"
end

-- 法师单位列表
function modifier_mage_2:IsMageUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local mage_units = {
        "enchantress1",      -- 魅惑魔女
        "lina1",             -- 秀逗魔导师
        "crystal_maiden1",   -- 水晶室女
        "enigma1"            -- 谜团
    }
    
    for _, mage_name in pairs(mage_units) do
        if unit_name == mage_name then
            return true
        end
    end
    
    return false
end

function modifier_mage_2:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 为所有己方单位添加蓝量回复效果
        self:ApplyMageEffectToAllies()
        
        -- 定期检查并更新所有友军的法师效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_mage_2:OnIntervalThink()
    if IsServer() then
        self:ApplyMageEffectToAllies()
    end
end

function modifier_mage_2:ApplyMageEffectToAllies()
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
    
    -- 为每个己方单位添加蓝量回复效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否已经有法师蓝量回复效果
            if not ally:HasModifier("modifier_mage_2_effect") then
                -- 直接添加法师蓝量回复效果修饰符
                local success = pcall(function()
                    ally:AddNewModifier(caster, self:GetAbility(), "modifier_mage_2_effect", {})
                end)
            end
        end
    end
end

-- 己方单位蓝量回复效果修饰符
if modifier_mage_2_effect == nil then
    modifier_mage_2_effect = class({})
end

function modifier_mage_2_effect:IsHidden()
    return false
end

function modifier_mage_2_effect:IsPurgable()
    return false
end

function modifier_mage_2_effect:IsDebuff()
    return false
end

function modifier_mage_2_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_MANA_REGEN_CONSTANT
    }
end

function modifier_mage_2_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取蓝量回复值
        local ability = self:GetAbility()
        if ability and not ability:IsNull() then
            self.mana_regen = ability:GetSpecialValueFor("mana_regen") or 2.0
            self.mage_mana_regen = ability:GetSpecialValueFor("mage_mana_regen") or 4.0
        else
            self.mana_regen = 2.0
            self.mage_mana_regen = 4.0
        end
    end
end

-- 提供固定蓝量回复（每秒回复）
function modifier_mage_2_effect:GetModifierConstantManaRegen()
    -- 从技能配置获取蓝量回复值（客户端和服务器端都需要）
    local ability = self:GetAbility()
    local mana_regen = 2.0
    local mage_mana_regen = 4.0
    
    if ability and not ability:IsNull() then
        mana_regen = ability:GetSpecialValueFor("mana_regen") or 2.0
        mage_mana_regen = ability:GetSpecialValueFor("mage_mana_regen") or 4.0
    elseif self.mana_regen and self.mage_mana_regen then
        mana_regen = self.mana_regen
        mage_mana_regen = self.mage_mana_regen
    end
    
    -- 检查是否是法师单位
    local parent = self:GetParent()
    if parent and not parent:IsNull() then
        local unit_name = parent:GetUnitName()
        local mage_units = {
            "enchantress1",      -- 魅惑魔女
            "lina1",             -- 秀逗魔导师
            "crystal_maiden1",   -- 水晶室女
            "enigma1"            -- 谜团
        }
        
        local is_mage = false
        for _, mage_name in pairs(mage_units) do
            if unit_name == mage_name then
                is_mage = true
                break
            end
        end
        
        -- 法师单位获得双倍增益
        return is_mage and mage_mana_regen or mana_regen
    end
    
    return mana_regen
end

function modifier_mage_2_effect:GetTexture()
    return "item_energy_booster"
end

