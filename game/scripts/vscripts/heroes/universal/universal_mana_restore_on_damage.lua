-- 通用Mana恢复技能 - 受到伤害时恢复Mana
-- 恢复伤害/10点Mana，最多50点

universal_mana_restore_on_damage = class({})

function universal_mana_restore_on_damage:GetIntrinsicModifierName()
    return "modifier_universal_mana_restore_on_damage"
end

LinkLuaModifier("modifier_universal_mana_restore_on_damage", "heroes/universal/universal_mana_restore_on_damage", LUA_MODIFIER_MOTION_NONE)

modifier_universal_mana_restore_on_damage = class({})

function modifier_universal_mana_restore_on_damage:IsHidden()
    return true
end

function modifier_universal_mana_restore_on_damage:IsPurgable()
    return false
end

function modifier_universal_mana_restore_on_damage:IsDebuff()
    return false
end

function modifier_universal_mana_restore_on_damage:OnCreated()
    if not IsServer() then return end
end

function modifier_universal_mana_restore_on_damage:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

function modifier_universal_mana_restore_on_damage:OnTakeDamage(keys)
    if not IsServer() then return end
    
    local unit = self:GetParent()
    local damage = keys.damage
    
    -- 确保是当前单位受到伤害
    if keys.unit ~= unit then
        return
    end
    
    -- 计算Mana恢复量：伤害/20，最多50点
    local mana_restore_amount = math.min(damage / 20, 50)
    
    -- 恢复Mana
    unit:GiveMana(mana_restore_amount)
    
    -- 调试信息
end
