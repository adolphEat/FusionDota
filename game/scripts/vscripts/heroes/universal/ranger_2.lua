-- 游侠2羁绊技能 - 全局buff技能
-- 每过9秒，提升所有游侠单位3秒100%的攻击速度
-- 游侠单位：风行者(windrunner1)、冥界亚龙(viper1)、宙斯(zeus1)、雷泽(razor1)

LinkLuaModifier("modifier_ranger_2", "heroes/universal/ranger_2", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_ranger_2_buff", "heroes/universal/ranger_2", LUA_MODIFIER_MOTION_NONE)

-- 全局游侠2羁绊计时器管理器
Ranger2TimerManager = Ranger2TimerManager or {
    listeners = {},
    is_timer_running = false,
    trigger_interval = 9.0,
    attack_speed_bonus_percent = 100.0,
    buff_duration = 3.0
}

if ranger_2 == nil then
    ranger_2 = class({})
end

function ranger_2:GetIntrinsicModifierName()
    return "modifier_ranger_2"
end

function ranger_2:GetAbilityTextureName()
    return "windrunner_windrun"
end

-- 全局游侠羁绊效果修饰符
if modifier_ranger_2 == nil then
    modifier_ranger_2 = class({})
end

function modifier_ranger_2:IsHidden()
    return false
end

function modifier_ranger_2:IsPurgable()
    return false
end

function modifier_ranger_2:IsDebuff()
    return false
end

function modifier_ranger_2:IsPassive()
    return true
end

function modifier_ranger_2:GetTexture()
    return "windrunner_windrun"
end

-- 游侠单位列表
function modifier_ranger_2:IsRangerUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local ranger_units = {
        "windrunner1",   -- 风行者
        "viper1",        -- 冥界亚龙
        "zeus1",         -- 宙斯
        "razor1"         -- 雷泽
    }
    
    for _, ranger_name in pairs(ranger_units) do
        if unit_name == ranger_name then
            return true
        end
    end
    
    return false
end

function modifier_ranger_2:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取数值
        self.trigger_interval = self:GetAbility():GetSpecialValueFor("trigger_interval") or 9.0
        self.attack_speed_bonus_percent = self:GetAbility():GetSpecialValueFor("attack_speed_bonus_percent") or 100.0
        self.buff_duration = self:GetAbility():GetSpecialValueFor("buff_duration") or 3.0
        
        -- 更新全局计时器管理器的数值（使用第一个单位的配置）
        if not Ranger2TimerManager.is_timer_running then
            Ranger2TimerManager.trigger_interval = self.trigger_interval
            Ranger2TimerManager.attack_speed_bonus_percent = self.attack_speed_bonus_percent
            Ranger2TimerManager.buff_duration = self.buff_duration
        end
        
        -- 添加到监听器列表
        table.insert(Ranger2TimerManager.listeners, self)
        
        print("Ranger 2: Modifier created, trigger_interval =", self.trigger_interval)
        
        -- 启动全局共享计时器（只启动一次）
        if not Ranger2TimerManager.is_timer_running then
            Ranger2TimerManager:StartGlobalTimer()
            -- 立即触发一次（战斗开始时立即给所有游侠单位第一次buff）
            Ranger2TimerManager:ApplyRangerBuffToAll()
        end
    end
end

function modifier_ranger_2:OnDestroy()
    if IsServer() then
        -- 从监听器列表中移除
        for i, listener in ipairs(Ranger2TimerManager.listeners or {}) do
            if listener == self then
                table.remove(Ranger2TimerManager.listeners, i)
                break
            end
        end
    end
end

-- 全局计时器管理器：启动全局共享计时器
function Ranger2TimerManager:StartGlobalTimer()
    if not IsServer() then return end
    if self.is_timer_running then return end
    
    self.is_timer_running = true
    local trigger_interval = self.trigger_interval
    
    GameRules:GetGameModeEntity():SetThink(function()
        -- 检查是否还有活跃的监听器
        local has_active_listeners = false
        for i = #self.listeners, 1, -1 do
            local listener = self.listeners[i]
            if listener and not listener:IsNull() then
                local caster = listener:GetCaster()
                if caster and not caster:IsNull() and caster:IsAlive() then
                    has_active_listeners = true
                    break
                else
                    -- 移除无效的监听器
                    table.remove(self.listeners, i)
                end
            else
                -- 移除无效的监听器
                table.remove(self.listeners, i)
            end
        end
        
        if not has_active_listeners then
            self.is_timer_running = false
            return nil -- 停止计时器
        end
        
        -- 每9秒为所有在场的游侠单位添加攻击速度buff
        self:ApplyRangerBuffToAll()
        
        return trigger_interval -- 继续计时器
    end, "Ranger2_GlobalTimer", trigger_interval)
    
    print("Ranger 2: Global timer started, interval =", trigger_interval)
end

-- 全局计时器管理器：为所有游侠单位添加buff
function Ranger2TimerManager:ApplyRangerBuffToAll()
    if not IsServer() then return end
    
    -- 使用第一个有效的监听器来获取团队信息
    local first_listener = nil
    for _, listener in pairs(self.listeners or {}) do
        if listener and not listener:IsNull() then
            local caster = listener:GetCaster()
            if caster and not caster:IsNull() then
                first_listener = listener
                break
            end
        end
    end
    
    if not first_listener then return end
    
    local caster = first_listener:GetCaster()
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
    
    local ranger_count = 0
    
    -- 为每个在场的游侠单位添加攻击速度buff
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否是游侠单位
            if first_listener:IsRangerUnit(ally) then
                ranger_count = ranger_count + 1
                
                -- 使用永久 modifier，通过 stack 计数控制是否生效
                -- 这样可以避免添加/移除 modifier 时触发生命值重置
                local buff_modifier = ally:FindModifierByName("modifier_ranger_2_buff")
                if not buff_modifier then
                    -- 如果还没有 modifier，添加永久 modifier
                    buff_modifier = ally:AddNewModifier(caster, first_listener:GetAbility(), "modifier_ranger_2_buff", {})
                end
                
                -- 激活 buff（使用 stack = 1 表示激活，stack = 0 表示未激活）
                -- 同时设置结束时间用于内部管理
                if buff_modifier then
                    buff_modifier:SetStackCount(1)  -- stack = 1 表示激活
                    if IsServer() then
                        buff_modifier.end_time = GameRules:GetGameTime() + self.buff_duration
                    end
                end
            end
        end
    end
    
    print("Ranger 2: Applied buff to", ranger_count, "ranger units")
end

-- 游侠单位攻击速度buff修饰符
if modifier_ranger_2_buff == nil then
    modifier_ranger_2_buff = class({})
end

function modifier_ranger_2_buff:IsHidden()
    return false
end

function modifier_ranger_2_buff:IsPurgable()
    return false  -- 改为不可驱散，使用永久 modifier
end

function modifier_ranger_2_buff:IsDebuff()
    return false
end

function modifier_ranger_2_buff:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_ranger_2_buff:OnCreated(params)
    -- 客户端和服务器端都需要初始化
    -- 从技能配置获取攻击速度加成百分比
    local ability = self:GetAbility()
    if ability and not ability:IsNull() then
        self.attack_speed_bonus_percent = ability:GetSpecialValueFor("attack_speed_bonus_percent") or 100.0
    else
        self.attack_speed_bonus_percent = 100.0
    end
    
    if IsServer() then
        -- 初始化 buff 状态（默认不激活，stack = 0）
        self:SetStackCount(0)
        self.end_time = 0
        
        -- 启动定期检查，管理 buff 的持续时间
        self:StartIntervalThink(0.1)
    end
end

function modifier_ranger_2_buff:OnIntervalThink()
    if IsServer() then
        -- 检查 buff 是否应该失效
        if self:GetStackCount() == 1 and self.end_time and GameRules:GetGameTime() >= self.end_time then
            self:SetStackCount(0)  -- stack = 0 表示未激活
        end
    end
end

-- 提供攻击速度固定值加成（参考发条增速器的实现方式）
-- 百分比攻速：100% = 基础攻速(100) * 1.0 = 100固定值
function modifier_ranger_2_buff:GetModifierAttackSpeedBonus_Constant()
    -- 只在 buff 激活时提供加成（stack = 1 表示激活）
    if self:GetStackCount() ~= 1 then
        return 0
    end
    
    -- 从技能配置获取攻击速度加成百分比（客户端和服务器端都需要）
    local ability = self:GetAbility()
    local attack_speed_bonus_percent = 100.0
    if ability and not ability:IsNull() then
        attack_speed_bonus_percent = ability:GetSpecialValueFor("attack_speed_bonus_percent") or 100.0
    elseif self.attack_speed_bonus_percent then
        attack_speed_bonus_percent = self.attack_speed_bonus_percent
    end
    
    -- 参考发条增速器的实现方式
    -- 百分比攻速：100% = 基础攻速(100) * 1.0 = 100固定值
    local constant_bonus = attack_speed_bonus_percent
    
    return constant_bonus
end

function modifier_ranger_2_buff:GetTexture()
    return "item_hyperstone"
end

