-- 战斗狂人2羁绊技能 - 全局buff技能
-- 场上有单位死亡时，战斗狂人单位获得5秒的30%攻击速度提升和50%的全能增伤（普攻和技能均增伤）
-- 如果在获得BUFF时战斗狂人单位的血量小于50%，则buff持续时间为10秒
-- 战斗狂人单位：战争之矛(mars1)、斧王(axe1)、敌法师(anti_mage1)、孽主(underlord1)

LinkLuaModifier("modifier_berserker_2", "heroes/universal/berserker_2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_berserker_2_buff", "heroes/universal/berserker_2", LUA_MODIFIER_MOTION_NONE)

-- 全局死亡监听器（与berserker_1共享）
BerserkerDeathListener = BerserkerDeathListener or {
    listeners = {},
    is_listening = false
}

if berserker_2 == nil then
    berserker_2 = class({})
end

function berserker_2:GetIntrinsicModifierName()
    return "modifier_berserker_2"
end

function berserker_2:GetAbilityTextureName()
    return "axe_counter_helix_unleashed"
end

-- 全局战斗狂人羁绊效果修饰符
if modifier_berserker_2 == nil then
    modifier_berserker_2 = class({})
end

function modifier_berserker_2:IsHidden()
    return false
end

function modifier_berserker_2:IsPurgable()
    return false
end

function modifier_berserker_2:IsDebuff()
    return false
end

function modifier_berserker_2:IsPassive()
    return true
end

function modifier_berserker_2:GetTexture()
    return "axe_counter_helix_unleashed"
end

-- 战斗狂人单位列表
function modifier_berserker_2:IsBerserkerUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local berserker_units = {
        "mars1",           -- 战争之矛
        "axe1",            -- 斧王
        "anti_mage1",      -- 敌法师
        "underlord1"       -- 孽主
    }
    
    for _, berserker_name in pairs(berserker_units) do
        if unit_name == berserker_name then
            return true
        end
    end
    
    return false
end

function modifier_berserker_2:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取数值
        self.attack_speed_bonus_percent = self:GetAbility():GetSpecialValueFor("attack_speed_bonus_percent") or 30.0
        self.damage_amplification_percent = self:GetAbility():GetSpecialValueFor("damage_amplification_percent") or 50.0
        self.buff_duration_normal = self:GetAbility():GetSpecialValueFor("buff_duration_normal") or 5.0
        self.buff_duration_low_health = self:GetAbility():GetSpecialValueFor("buff_duration_low_health") or 10.0
        self.low_health_threshold = self:GetAbility():GetSpecialValueFor("low_health_threshold") or 0.5
        
        -- 添加到监听器列表
        table.insert(BerserkerDeathListener.listeners, self)
        
        -- 注册全局死亡监听器（只注册一次）
        if not BerserkerDeathListener.is_listening then
            BerserkerDeathListener.is_listening = true
            
            ListenToGameEvent("entity_killed", function(keys)
                local killed_unit = EntIndexToHScript(keys.entindex_killed)
                if killed_unit and IsValidEntity(killed_unit) then
                    BerserkerDeathListener:OnDeath(killed_unit)
                end
            end, nil)
            
            print("Berserker Death listener registered")
        end
    end
end

function modifier_berserker_2:OnDestroy()
    if IsServer() then
        -- 从监听器列表中移除
        for i, listener in ipairs(BerserkerDeathListener.listeners or {}) do
            if listener == self then
                table.remove(BerserkerDeathListener.listeners, i)
                break
            end
        end
    end
end

-- 全局函数：处理死亡事件
function BerserkerDeathListener:OnDeath(dead_unit)
    if not IsServer() then return end
    
    -- 检查死亡单位是否有效
    if not IsValidEntity(dead_unit) or dead_unit:IsNull() then
        return
    end
    
    -- 通知所有监听器
    for _, listener in pairs(self.listeners or {}) do
        if listener and not listener:IsNull() then
            listener:OnUnitDeath(dead_unit)
        end
    end
end

-- 处理单位死亡，为战斗狂人单位添加buff
function modifier_berserker_2:OnUnitDeath(dead_unit)
    if not IsServer() then return end
    
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
    
    -- 为每个战斗狂人单位添加buff
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否是战斗狂人单位
            if self:IsBerserkerUnit(ally) then
                -- 计算buff持续时间
                local current_health = ally:GetHealth()
                local max_health = ally:GetMaxHealth()
                local health_percent = current_health / max_health
                local duration = self.buff_duration_normal
                
                if health_percent < self.low_health_threshold then
                    duration = self.buff_duration_low_health
                end
                
                -- 使用永久 modifier，通过 stack 计数控制是否生效
                -- 这样可以避免添加/移除 modifier 时触发生命值重置
                local buff_modifier = ally:FindModifierByName("modifier_berserker_2_buff")
                if not buff_modifier then
                    -- 如果还没有 modifier，添加永久 modifier
                    buff_modifier = ally:AddNewModifier(caster, self:GetAbility(), "modifier_berserker_2_buff", {})
                end
                
                -- 激活 buff（使用 stack = 1 表示激活，stack = 0 表示未激活）
                -- 同时设置结束时间用于内部管理
                if buff_modifier then
                    buff_modifier:SetStackCount(1)  -- stack = 1 表示激活
                    if IsServer() then
                        buff_modifier.end_time = GameRules:GetGameTime() + duration
                    end
                end
            end
        end
    end
end

-- 战斗狂人单位buff修饰符
if modifier_berserker_2_buff == nil then
    modifier_berserker_2_buff = class({})
end

function modifier_berserker_2_buff:IsHidden()
    return false
end

function modifier_berserker_2_buff:IsPurgable()
    return false  -- 改为不可驱散，使用永久 modifier
end

function modifier_berserker_2_buff:IsDebuff()
    return false
end

function modifier_berserker_2_buff:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
        MODIFIER_PROPERTY_TOTALDAMAGEOUTGOING_PERCENTAGE
    }
end

function modifier_berserker_2_buff:OnCreated(params)
    -- 客户端和服务器端都需要初始化
    -- 从技能配置获取数值
    local ability = self:GetAbility()
    if ability and not ability:IsNull() then
        self.attack_speed_bonus_percent = ability:GetSpecialValueFor("attack_speed_bonus_percent") or 30.0
        self.damage_amplification_percent = ability:GetSpecialValueFor("damage_amplification_percent") or 50.0
    else
        self.attack_speed_bonus_percent = 30.0
        self.damage_amplification_percent = 50.0
    end
    
    if IsServer() then
        -- 初始化 buff 状态（默认不激活，stack = 0）
        self:SetStackCount(0)
        self.end_time = 0
        
        -- 启动定期检查，管理 buff 的持续时间
        self:StartIntervalThink(0.1)
    end
end

function modifier_berserker_2_buff:OnIntervalThink()
    if IsServer() then
        -- 检查 buff 是否应该失效
        if self:GetStackCount() == 1 and self.end_time and GameRules:GetGameTime() >= self.end_time then
            self:SetStackCount(0)  -- stack = 0 表示未激活
        end
    end
end

-- 提供攻击速度固定值加成（参考游侠羁绊的实现方式）
-- 百分比攻速：30% = 基础攻速(100) * 0.3 = 30固定值
function modifier_berserker_2_buff:GetModifierAttackSpeedBonus_Constant()
    -- 只在 buff 激活时提供加成（stack = 1 表示激活）
    if self:GetStackCount() ~= 1 then
        return 0
    end
    
    -- 从技能配置获取攻击速度加成百分比（客户端和服务器端都需要）
    local ability = self:GetAbility()
    local attack_speed_bonus_percent = 30.0
    if ability and not ability:IsNull() then
        attack_speed_bonus_percent = ability:GetSpecialValueFor("attack_speed_bonus_percent") or 30.0
    elseif self.attack_speed_bonus_percent then
        attack_speed_bonus_percent = self.attack_speed_bonus_percent
    end
    
    -- 参考游侠羁绊的实现方式
    -- 百分比攻速：30% = 基础攻速(100) * 0.3 = 30固定值
    local constant_bonus = attack_speed_bonus_percent
    
    return constant_bonus
end

-- 提供全能增伤（普攻和技能都增伤）
function modifier_berserker_2_buff:GetModifierTotalDamageOutgoing_Percentage()
    -- 只在 buff 激活时提供加成（stack = 1 表示激活）
    if self:GetStackCount() ~= 1 then
        return 0
    end
    
    return self.damage_amplification_percent or 50.0
end

function modifier_berserker_2_buff:GetTexture()
    return "item_bfury"
end

