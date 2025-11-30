-- Anti-Mage Counterspell (custom)

LinkLuaModifier("modifier_anti_mage_counterspell_passive", "heroes/hero_antimage/anti_mage_counterspell.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_anti_mage_counterspell_shield", "heroes/hero_antimage/anti_mage_counterspell.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_anti_mage_counterspell_buff", "heroes/hero_antimage/anti_mage_counterspell.lua", LUA_MODIFIER_MOTION_NONE)

anti_mage_counterspell = class({})

function anti_mage_counterspell:OnUpgrade()
	if not IsServer() then return end
	local caster = self:GetCaster()
	if not IsValidEntity(caster) then return end

    -- 首次升级时注册全局过滤器（仅注册一次，逻辑实现也在本文件）
    if not _G.AntiMageCounterspell_FiltersRegistered then
        local mode = GameRules:GetGameModeEntity()
        if mode and mode.SetDamageFilter then
            mode:SetDamageFilter(Dynamic_Wrap(anti_mage_counterspell, "DamageFilter"), self)
        end
        if mode and mode.SetModifierGainedFilter then
            mode:SetModifierGainedFilter(Dynamic_Wrap(anti_mage_counterspell, "ModifierGainedFilter"), self)
        end
        _G.AntiMageCounterspell_FiltersRegistered = true
    end

	if not self._auto_think_started then
		self._auto_think_started = true
		local function ThinkAutoCast()
			if not IsValidEntity(caster) or caster:IsNull() or not caster:IsAlive() then
				return
			end
    			local hasShield = caster:HasModifier("modifier_anti_mage_counterspell_shield")
    			-- 不使用额外阈值：与其他技能一致，仅判断技能是否可施放（包含法力/冷却），且无护盾
    			if not hasShield and self:IsFullyCastable() then
				if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
					caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
				end
			end
			return 0.1
		end
		GameRules:GetGameModeEntity():SetThink(ThinkAutoCast, "AntiMageCounterspellAuto" .. caster:GetEntityIndex(), 0.1)
	end
end

function anti_mage_counterspell:GetIntrinsicModifierName()
	return "modifier_anti_mage_counterspell_passive"
end

function anti_mage_counterspell:OnSpellStart()
	if not IsServer() then return end

	local caster = self:GetCaster()
	if not IsValidEntity(caster) then return end

	-- 不可叠加：已有护盾则不重复添加
	if caster:HasModifier("modifier_anti_mage_counterspell_shield") then
		return
	end

	-- 创建“始终存在直到触发”的护盾（用超长持续时间模拟）
	caster:AddNewModifier(caster, self, "modifier_anti_mage_counterspell_shield", { duration = 3600.0 })

	-- 释放后清空法力
	caster:SetMana(0)
end

---------------------------------------------------------------------------------------------------
-- 被动攻速 +15
modifier_anti_mage_counterspell_passive = class({})

function modifier_anti_mage_counterspell_passive:IsHidden() return true end
function modifier_anti_mage_counterspell_passive:IsPurgable() return false end
function modifier_anti_mage_counterspell_passive:RemoveOnDeath() return false end

function modifier_anti_mage_counterspell_passive:DeclareFunctions()
	return { MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT }
end

function modifier_anti_mage_counterspell_passive:GetModifierAttackSpeedBonus_Constant()
	local ability = self:GetAbility()
	if not ability then return 0 end
	return ability:GetSpecialValueFor("passive_attack_speed")
end

---------------------------------------------------------------------------------------------------
-- 主动护盾：吸收下一次敌方法术，并触发增益与治疗
modifier_anti_mage_counterspell_shield = class({})

function modifier_anti_mage_counterspell_shield:IsHidden() return false end
function modifier_anti_mage_counterspell_shield:IsPurgable() return false end
function modifier_anti_mage_counterspell_shield:GetEffectName() return "particles/heroes/anti_mage/rune_shield_bubble.vpcf" end
function modifier_anti_mage_counterspell_shield:GetEffectAttachType() return PATTACH_CENTER_FOLLOW end

function modifier_anti_mage_counterspell_shield:DeclareFunctions()
	return { MODIFIER_PROPERTY_ABSORB_SPELL }
end

function modifier_anti_mage_counterspell_shield:GetAbsorbSpell(keys)
	if not IsServer() then return 0 end

	local parent = self:GetParent()
	local ability = self:GetAbility()
	local inflictor = keys.ability

	if not parent or not ability or not inflictor then return 0 end

	local caster = inflictor:GetCaster()
	if not caster or caster:GetTeamNumber() == parent:GetTeamNumber() then
		return 0
	end

	-- 吸收一次施法
	self:OnShieldTriggered(inflictor)
	return 1
end

function modifier_anti_mage_counterspell_shield:OnShieldTriggered(blockedAbility, healAmountFromFilter)
	local parent = self:GetParent()
	local ability = self:GetAbility()
	if not IsServer() or not parent or not ability then return end

	-- 触发后移除护盾
	self:Destroy()

	-- 给予3倍被动等效的攻速加成，持续10秒
	local duration = ability:GetSpecialValueFor("buff_duration")
	parent:AddNewModifier(parent, ability, "modifier_anti_mage_counterspell_buff", { duration = duration })

    -- 若为伤害技能，进行等额治疗：优先使用过滤器提供的实际即将造成的伤害值
    local healAmount = tonumber(healAmountFromFilter) or 0
    if healAmount <= 0 and blockedAbility and not blockedAbility:IsNull() then
        -- 退化：若无实际伤害值，尝试名义伤害
        local ok, val = pcall(function() return blockedAbility:GetSpecialValueFor("damage") end)
        if ok and type(val) == "number" and val > 0 then
            healAmount = val
        else
            local nominal = 0
            if blockedAbility.GetAbilityDamage then
                nominal = blockedAbility:GetAbilityDamage() or 0
            end
            if nominal and nominal > 0 then
                healAmount = nominal
            end
        end
    end

	if healAmount > 0 then
		parent:Heal(healAmount, ability)
		SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, parent, healAmount, nil)
	end
end

---------------------------------------------------------------------------------------------------
-- 触发后攻速增益（使总被动效果达到3倍）
modifier_anti_mage_counterspell_buff = class({})

function modifier_anti_mage_counterspell_buff:IsHidden() return false end
function modifier_anti_mage_counterspell_buff:IsPurgable() return true end
-- 无粒子表现

function modifier_anti_mage_counterspell_buff:DeclareFunctions()
	return { MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT }
end

---------------------------------------------------------------------------------------------------
-- 以下为过滤器实现，放在技能文件中，集中管理 Counterspell 逻辑

function anti_mage_counterspell:IsPeriodicDOTFromAbility(victim, ability)
    if not victim or not ability then return false end
    local mods = victim:FindAllModifiers() or {}
    for _, m in ipairs(mods) do
        if m and not m:IsNull() and m:IsDebuff() then
            local a = m:GetAbility()
            if a == ability then
                return true
            end
        end
    end
    return false
end

function anti_mage_counterspell:DamageFilter(keys)
    if not IsServer() then return true end

    local victim = EntIndexToHScript(keys.entindex_victim_const or -1)
    if not victim or victim:IsNull() then return true end

    local inflictor = nil
    if keys.entindex_inflictor_const then
        inflictor = EntIndexToHScript(keys.entindex_inflictor_const)
    end
    if not inflictor or type(inflictor) ~= "table" or inflictor:IsNull() then
        return true
    end

    if victim._counterspell_recent_block and victim._counterspell_recent_block.until_time and GameRules:GetGameTime() <= victim._counterspell_recent_block.until_time then
        if victim._counterspell_recent_block.ability == inflictor then
            keys.damage = 0
            return true
        end
    end

    local shield = victim:FindModifierByName("modifier_anti_mage_counterspell_shield")
    if not shield then
        return true
    end

    if self.IsPeriodicDOTFromAbility and self:IsPeriodicDOTFromAbility(victim, inflictor) then
        return true
    end

    local blocked_damage = tonumber(keys.damage) or 0
    keys.damage = 0
    -- 标记本次被拦截的技能，便于同步拦截其同帧效果
    victim._counterspell_recent_block = {
        ability = inflictor,
        until_time = GameRules:GetGameTime() + 0.1,
    }
    if shield.OnShieldTriggered then
        shield:OnShieldTriggered(inflictor, blocked_damage)
    else
        shield:Destroy()
    end

    return true
end

function anti_mage_counterspell:ModifierGainedFilter(keys)
    if not IsServer() then return true end

    local parent = EntIndexToHScript(keys.entindex_parent_const or -1)
    if not parent or parent:IsNull() then return true end

    local caster = nil
    if keys.entindex_caster_const then
        caster = EntIndexToHScript(keys.entindex_caster_const)
    end
    if not caster or caster:IsNull() or caster:GetTeamNumber() == parent:GetTeamNumber() then
        return true
    end

    local ability = nil
    if keys.entindex_ability_const then
        ability = EntIndexToHScript(keys.entindex_ability_const)
    end

    local shield = parent:FindModifierByName("modifier_anti_mage_counterspell_shield")
    if not shield then
        if parent._counterspell_recent_block and parent._counterspell_recent_block.until_time and GameRules:GetGameTime() <= parent._counterspell_recent_block.until_time then
            if ability and parent._counterspell_recent_block.ability == ability then
                return false
            end
        end
        return true
    end

    if not ability or ability:IsNull() then
        return true
    end

    parent._counterspell_recent_block = {
        ability = ability,
        until_time = GameRules:GetGameTime() + 0.1,
    }

    if shield.OnShieldTriggered then
        shield:OnShieldTriggered(ability, 0)
    else
        shield:Destroy()
    end

    -- 保险清理：极短延迟后清除由该技能已附着到目标身上的修饰器（若有竞态已进来）
    local weak_parent = parent
    local weak_ability = ability
    local ctx = GameRules:GetGameModeEntity()
    if ctx then
        ctx:SetContextThink(DoUniqueString("counterspell_cleanup"), function()
            if not IsValidEntity(weak_parent) or not weak_ability then return end
            local mods = weak_parent:FindAllModifiers() or {}
            for _, m in ipairs(mods) do
                if m and not m:IsNull() and m:GetAbility() == weak_ability then
                    m:Destroy()
                end
            end
        end, 0.03)
    end

    return false
end

function modifier_anti_mage_counterspell_buff:GetModifierAttackSpeedBonus_Constant()
	local ability = self:GetAbility()
	if not ability then return 0 end
	local base_as = ability:GetSpecialValueFor("passive_attack_speed")
	local mult = ability:GetSpecialValueFor("buff_multiplier")
	-- 额外加成为 (mult - 1) 倍的被动
	return math.max(0, base_as * (mult - 1))
end


