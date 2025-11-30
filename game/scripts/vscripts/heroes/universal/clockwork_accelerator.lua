-- 发条加速器技能 - 全局buff技能
-- 为所有己方单位每过3秒增加10%攻速（可无限累加）

LinkLuaModifier("modifier_clockwork_accelerator", "heroes/universal/clockwork_accelerator", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_clockwork_accelerator_effect", "heroes/universal/clockwork_accelerator", LUA_MODIFIER_MOTION_NONE)

if clockwork_accelerator == nil then
    clockwork_accelerator = class({})
end

function clockwork_accelerator:GetIntrinsicModifierName()
    return "modifier_clockwork_accelerator"
end

-- 全局发条加速器效果修饰符
if modifier_clockwork_accelerator == nil then
    modifier_clockwork_accelerator = class({})
end

function modifier_clockwork_accelerator:IsHidden()
    return false
end

function modifier_clockwork_accelerator:IsPurgable()
    return false
end

function modifier_clockwork_accelerator:IsDebuff()
    return false
end

function modifier_clockwork_accelerator:IsPassive()
    return true
end

function modifier_clockwork_accelerator:GetTexture()
    return "item_hyperstone"
end

function modifier_clockwork_accelerator:OnCreated()
    if IsServer() then
        -- 从技能配置获取间隔时间和攻速增量
        self.interval_time = self:GetAbility():GetSpecialValueFor("interval_time")
        self.attack_speed_increment = self:GetAbility():GetSpecialValueFor("attack_speed_increment")
        
        -- 为所有己方单位添加发条加速器效果
        self:ApplyClockworkAcceleratorToAllies()
        
        -- 定期检查并更新所有友军的发条加速器效果
        self:StartIntervalThink(2.0)
    end
end

function modifier_clockwork_accelerator:OnIntervalThink()
    if IsServer() then
        self:ApplyClockworkAcceleratorToAllies()
    end
end

function modifier_clockwork_accelerator:ApplyClockworkAcceleratorToAllies()
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
    
    -- 为每个友军单位添加发条加速器效果
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否已经有发条加速器效果
            if not ally:HasModifier("modifier_clockwork_accelerator_effect") then
                -- 直接添加发条加速器效果修饰符
                local success = pcall(function()
                    ally:AddNewModifier(caster, self:GetAbility(), "modifier_clockwork_accelerator_effect", {})
                end)
            end
        end
    end
end

function modifier_clockwork_accelerator:GetEffectName()
    return "particles/items_fx/aegis_respawn.vpcf"
end

function modifier_clockwork_accelerator:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 友军发条加速器效果修饰符
if modifier_clockwork_accelerator_effect == nil then
    modifier_clockwork_accelerator_effect = class({})
end

function modifier_clockwork_accelerator_effect:IsHidden()
    return false
end

function modifier_clockwork_accelerator_effect:IsPurgable()
    return false
end

function modifier_clockwork_accelerator_effect:IsDebuff()
    return false
end

function modifier_clockwork_accelerator_effect:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_clockwork_accelerator_effect:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取间隔时间和攻速增量
        self.interval_time = self:GetAbility():GetSpecialValueFor("interval_time")
        self.attack_speed_increment = self:GetAbility():GetSpecialValueFor("attack_speed_increment")
        
        -- 初始化攻速加成计数器
        self.attack_speed_stacks = 0
        
        
        -- 启动定时器，每3秒增加一次攻速
        self:StartIntervalThink(self.interval_time)
    end
end

function modifier_clockwork_accelerator_effect:OnIntervalThink()
    if IsServer() then
        -- 增加攻速层数
        self.attack_speed_stacks = self.attack_speed_stacks + 1
        local total_bonus = self.attack_speed_stacks * self.attack_speed_increment
        
        
        -- 播放加速特效
        local particle = ParticleManager:CreateParticle("particles/items_fx/aegis_respawn.vpcf", PATTACH_ABSORIGIN_FOLLOW, self:GetParent())
        ParticleManager:SetParticleControl(particle, 0, self:GetParent():GetAbsOrigin())
        ParticleManager:ReleaseParticleIndex(particle)
    end
end

function modifier_clockwork_accelerator_effect:GetModifierAttackSpeedBonus_Constant()
    local bonus = self.attack_speed_stacks * self.attack_speed_increment
    return bonus
end

function modifier_clockwork_accelerator_effect:GetTexture()
    return "item_hyperstone"
end
