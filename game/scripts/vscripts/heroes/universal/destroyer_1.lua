-- 毁灭者1羁绊技能 - 全局buff技能
-- 毁灭者击杀单位后立即恢复最大魔法值的50%
-- 毁灭者单位：影魔(shadow_fiend1)、恐怖利刃(terrorblade1)

LinkLuaModifier("modifier_destroyer_1", "heroes/universal/destroyer_1", LUA_MODIFIER_MOTION_NONE)

-- 全局死亡监听器
DestroyerDeathListener = DestroyerDeathListener or {
    listeners = {},
    is_listening = false
}

if destroyer_1 == nil then
    destroyer_1 = class({})
end

function destroyer_1:GetIntrinsicModifierName()
    return "modifier_destroyer_1"
end

function destroyer_1:GetAbilityTextureName()
    return "axe_berserkers_call_shoutmask"
end

-- 全局毁灭者羁绊效果修饰符
if modifier_destroyer_1 == nil then
    modifier_destroyer_1 = class({})
end

function modifier_destroyer_1:IsHidden()
    return false
end

function modifier_destroyer_1:IsPurgable()
    return false
end

function modifier_destroyer_1:IsDebuff()
    return false
end

function modifier_destroyer_1:IsPassive()
    return true
end

function modifier_destroyer_1:GetTexture()
    return "axe_berserkers_call_shoutmask"
end

-- 毁灭者单位列表
function modifier_destroyer_1:IsDestroyerUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local destroyer_units = {
        "shadow_fiend1",      -- 影魔
        "terrorblade1"        -- 恐怖利刃
    }
    
    for _, destroyer_name in pairs(destroyer_units) do
        if unit_name == destroyer_name then
            return true
        end
    end
    
    return false
end

function modifier_destroyer_1:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取数值
        self.mana_restore_percent = self:GetAbility():GetSpecialValueFor("mana_restore_percent") or 50.0
        
        -- 添加到监听器列表
        table.insert(DestroyerDeathListener.listeners, self)
        
        -- 注册全局死亡监听器（只注册一次）
        if not DestroyerDeathListener.is_listening then
            DestroyerDeathListener.is_listening = true
            
            ListenToGameEvent("entity_killed", function(keys)
                local killed_unit = EntIndexToHScript(keys.entindex_killed)
                local attacker = nil
                
                -- 尝试从事件参数中获取攻击者
                if keys.entindex_attacker then
                    attacker = EntIndexToHScript(keys.entindex_attacker)
                elseif keys.entindex_attacker_const then
                    attacker = EntIndexToHScript(keys.entindex_attacker_const)
                end
                
                if killed_unit and IsValidEntity(killed_unit) and attacker and IsValidEntity(attacker) then
                    DestroyerDeathListener:OnDeath(killed_unit, attacker)
                end
            end, nil)
        end
    end
end

function modifier_destroyer_1:OnDestroy()
    if IsServer() then
        -- 从监听器列表中移除
        for i, listener in ipairs(DestroyerDeathListener.listeners or {}) do
            if listener == self then
                table.remove(DestroyerDeathListener.listeners, i)
                break
            end
        end
    end
end

-- 全局函数：处理死亡事件
function DestroyerDeathListener:OnDeath(dead_unit, attacker)
    if not IsServer() then return end
    
    -- 检查死亡单位和攻击者是否有效
    if not IsValidEntity(dead_unit) or dead_unit:IsNull() then
        return
    end
    
    if not attacker or attacker:IsNull() or not IsValidEntity(attacker) then
        return
    end
    
    -- 通知所有监听器
    for _, listener in pairs(self.listeners or {}) do
        if listener and not listener:IsNull() then
            listener:OnUnitKilled(attacker, dead_unit)
        end
    end
end

-- 处理单位击杀，为毁灭者单位恢复魔法
function modifier_destroyer_1:OnUnitKilled(killer, dead_unit)
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 检查击杀者是否是毁灭者单位
    if not self:IsDestroyerUnit(killer) then
        return
    end
    
    -- 检查击杀者是否还活着
    if not killer:IsAlive() or killer:IsNull() then
        return
    end
    
    -- 检查击杀者是否是友军（只对己方单位生效）
    if killer:GetTeamNumber() ~= caster:GetTeamNumber() then
        return
    end
    
    -- 计算恢复的魔法值（最大魔法值的50%）
    local max_mana = killer:GetMaxMana()
    local mana_to_restore = max_mana * (self.mana_restore_percent / 100.0)
    
    if mana_to_restore > 0 then
        -- 恢复魔法值
        local current_mana = killer:GetMana()
        local new_mana = math.min(current_mana + mana_to_restore, max_mana)
        killer:SetMana(new_mana)
        
        -- 显示恢复魔法值的提示
        SendOverheadEventMessage(nil, OVERHEAD_ALERT_MANA_ADD, killer, mana_to_restore, nil)
    end
end
