-- 术士2羁绊技能 - 全局buff技能
-- 所有友军获得15%魔抗，术士单位获得双倍增益（30%魔抗）
-- 术士单位：恶魔术士(lion1)、神谕者(oracle1)、死亡先知(death_prophet1)

LinkLuaModifier("modifier_warlock_2", "heroes/universal/warlock_2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_warlock_2_effect", "heroes/universal/warlock_2", LUA_MODIFIER_MOTION_NONE)

if warlock_2 == nil then
    warlock_2 = class({})
end

function warlock_2:GetIntrinsicModifierName()
    return "modifier_warlock_2"
end

-- 全局术士羁绊效果修饰符
if modifier_warlock_2 == nil then
    modifier_warlock_2 = class({})
end

function modifier_warlock_2:IsHidden()
    return false
end

function modifier_warlock_2:IsPurgable()
    return false
end

function modifier_warlock_2:IsDebuff()
    return false
end

function modifier_warlock_2:IsPassive()
    return true
end

function modifier_warlock_2:GetTexture()
    return "item_cloak"
end

-- 术士单位列表
function modifier_warlock_2:IsWarlockUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local warlock_units = {
        "lion1",             -- 恶魔术士
        "oracle1",           -- 神谕者
        "death_prophet1"     -- 死亡先知
    }
    
    for _, warlock_name in pairs(warlock_units) do
        if unit_name == warlock_name then
            return true
        end
    end
    
    return false
end

function modifier_warlock_2:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 为所有己方单位添加魔抗效果
        self:ApplyWarlockEffectToAllies()
        
        -- 定期检查并更新所有友军的术士效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_warlock_2:OnIntervalThink()
    if IsServer() then
        self:ApplyWarlockEffectToAllies()
    end
end

function modifier_warlock_2:ApplyWarlockEffectToAllies()
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
    
    -- 为每个己方单位添加魔抗效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否已经有术士魔抗效果
            if not ally:HasModifier("modifier_warlock_2_effect") then
                -- 直接添加术士魔抗效果修饰符
                local success = pcall(function()
                    ally:AddNewModifier(caster, self:GetAbility(), "modifier_warlock_2_effect", {})
                end)
            end
        end
    end
end

-- 己方单位魔抗效果修饰符
if modifier_warlock_2_effect == nil then
    modifier_warlock_2_effect = class({})
end

function modifier_warlock_2_effect:IsHidden()
    return false
end

function modifier_warlock_2_effect:IsPurgable()
    return false
end

function modifier_warlock_2_effect:IsDebuff()
    return false
end

function modifier_warlock_2_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS
    }
end

function modifier_warlock_2_effect:OnCreated(params)
    -- 从技能配置获取魔抗值（客户端和服务器端都需要）
    local ability = self:GetAbility()
    if ability and not ability:IsNull() then
        self.magic_resistance = ability:GetSpecialValueFor("magic_resistance") or 15.0
        self.warlock_magic_resistance = ability:GetSpecialValueFor("warlock_magic_resistance") or 30.0
    else
        self.magic_resistance = 15.0
        self.warlock_magic_resistance = 30.0
    end
    
    -- 记录单位名称（客户端和服务器端都需要）
    local parent = self:GetParent()
    if parent and not parent:IsNull() then
        self.unit_name = parent:GetUnitName()
        -- 在服务器端输出调试信息
        if IsServer() then
            print(string.format("Warlock 2: Modifier created for unit %s", self.unit_name))
        end
    end
end

-- 提供魔抗加成（百分比）
function modifier_warlock_2_effect:GetModifierMagicalResistanceBonus()
    -- 使用在 OnCreated 中初始化的值（客户端和服务器端都可用）
    local magic_resistance = self.magic_resistance or 15.0
    local warlock_magic_resistance = self.warlock_magic_resistance or 30.0
    
    -- 获取单位名称（优先使用缓存的名称）
    local unit_name = self.unit_name
    if not unit_name or unit_name == "" then
        local parent = self:GetParent()
        if parent and not parent:IsNull() then
            unit_name = parent:GetUnitName()
            if unit_name and unit_name ~= "" then
                self.unit_name = unit_name  -- 缓存单位名称
            end
        end
    end
    
    if not unit_name or unit_name == "" then
        return magic_resistance
    end
    
    local warlock_units = {
        "lion1",             -- 恶魔术士
        "oracle1",           -- 神谕者
        "death_prophet1"     -- 死亡先知
    }
    
    local is_warlock = false
    for _, warlock_name in pairs(warlock_units) do
        if unit_name == warlock_name then
            is_warlock = true
            break
        end
    end
    
    -- 调试信息
    if IsServer() then
        print(string.format("Warlock 2: Unit %s, is_warlock: %s, returning: %.1f (magic_resistance: %.1f, warlock_magic_resistance: %.1f)", 
            unit_name, tostring(is_warlock), is_warlock and warlock_magic_resistance or magic_resistance, magic_resistance, warlock_magic_resistance))
    end
    
    -- 术士单位获得双倍增益
    return is_warlock and warlock_magic_resistance or magic_resistance
end

function modifier_warlock_2_effect:GetTexture()
    return "item_cloak"
end

