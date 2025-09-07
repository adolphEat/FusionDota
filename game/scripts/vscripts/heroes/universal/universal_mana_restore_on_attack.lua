-- 通用Mana恢复技能
-- 每次攻击恢复8点Mana

universal_mana_restore_on_attack = class({})

function universal_mana_restore_on_attack:GetIntrinsicModifierName()
    return "modifier_universal_mana_restore_on_attack"
end

LinkLuaModifier("modifier_universal_mana_restore_on_attack", "heroes/universal/universal_mana_restore_on_attack", LUA_MODIFIER_MOTION_NONE)

modifier_universal_mana_restore_on_attack = class({})

function modifier_universal_mana_restore_on_attack:IsHidden()
    return true
end

function modifier_universal_mana_restore_on_attack:IsPurgable()
    return false
end

function modifier_universal_mana_restore_on_attack:IsDebuff()
    return false
end

function modifier_universal_mana_restore_on_attack:OnCreated()
    if not IsServer() then return end
    print("Universal Mana Restore modifier created on:", self:GetParent():GetUnitName())
end

function modifier_universal_mana_restore_on_attack:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_ATTACK_LANDED
    }
end

function modifier_universal_mana_restore_on_attack:OnAttackLanded(keys)
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local target = keys.target
    local attacker = keys.attacker
    
    -- 确保是施法者的攻击
    if attacker ~= caster then
        return
    end
    
    -- 固定的Mana恢复量
    local mana_restore_amount = 8
    
    -- 恢复Mana
    caster:GiveMana(mana_restore_amount)
    
    -- 调试信息
    print("Universal Mana Restore: Restored " .. mana_restore_amount .. " mana to " .. caster:GetUnitName())
end
