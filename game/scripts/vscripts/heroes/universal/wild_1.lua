-- 狂野1羁绊技能 - 全局buff技能
-- 狂野单位出现后每10秒触发一次增益（只对狂野单位生效），增加10%攻击速度（可叠加）
-- 狂野单位：恶魔巫师(lion1)、魅惑魔女(enchantress1)、熊战士(ursa1)、冥界亚龙(viper1)、食人魔法师(ogre_magi1)

LinkLuaModifier("modifier_wild_1", "heroes/universal/wild_1", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_wild_1_stack", "heroes/universal/wild_1", LUA_MODIFIER_MOTION_NONE)

if wild_1 == nil then
    wild_1 = class({})
end

function wild_1:GetIntrinsicModifierName()
    return "modifier_wild_1"
end

-- 确保技能升级时创建modifier
function wild_1:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 确保modifier被创建
    if not caster:HasModifier("modifier_wild_1") then
        caster:AddNewModifier(caster, self, "modifier_wild_1", {})
    end
end

-- 全局狂野羁绊效果修饰符
if modifier_wild_1 == nil then
    modifier_wild_1 = class({})
end

function modifier_wild_1:IsHidden()
    return false
end

function modifier_wild_1:IsPurgable()
    return false
end

function modifier_wild_1:IsDebuff()
    return false
end

function modifier_wild_1:IsPassive()
    return true
end

function modifier_wild_1:GetTexture()
    return "item_hyperstone"
end

-- 狂野单位列表
function modifier_wild_1:IsWildUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    local wild_units = {
        "lion1",
        "enchantress1",
        "ursa1",
        "viper1",
        "ogre_magi1"
    }
    
    for _, wild_name in pairs(wild_units) do
        if unit_name == wild_name then
            return true
        end
    end
    
    return false
end

function modifier_wild_1:OnCreated()
    if IsServer() then
        -- 只对玩家团队生效，敌人团队的羁绊不生效
        local caster = self:GetCaster()
        if not caster or caster:IsNull() or caster:GetTeamNumber() ~= DOTA_TEAM_GOODGUYS then
            return
        end
        
        -- 从技能配置获取数值
        self.trigger_interval = self:GetAbility():GetSpecialValueFor("trigger_interval") or 10.0
        self.attack_speed_bonus_percent = self:GetAbility():GetSpecialValueFor("attack_speed_bonus_percent") or 10.0
        
        print("Wild 1: Modifier created, trigger_interval =", self.trigger_interval)
        
        -- 立即触发一次（战斗开始时立即给所有狂野单位第一层）
        self:ApplyWildBuffToAllies()
        
        -- 使用GameRules的SetThink来创建全局共享的10秒计时器
        self:StartGlobalTimer()
    end
end

function modifier_wild_1:StartGlobalTimer()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    local timer_name = "Wild1_Timer_" .. caster:GetEntityIndex()
    local trigger_interval = self.trigger_interval
    
    GameRules:GetGameModeEntity():SetThink(function()
        local modifier = caster:FindModifierByName("modifier_wild_1")
        if not modifier or modifier:IsNull() then
            return nil -- 停止计时器
        end
        
        -- 每10秒为所有在场的狂野单位添加一层增益
        modifier:ApplyWildBuffToAllies()
        
        return trigger_interval -- 继续计时器
    end, timer_name, trigger_interval)
    
    print("Wild 1: Global timer started, interval =", trigger_interval)
end

function modifier_wild_1:ApplyWildBuffToAllies()
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then 
        print("Wild 1: Caster is null!")
        return 
    end
    
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
    
    print("Wild 1: Found", #allies, "allies")
    local wild_count = 0
    
    -- 为每个在场的狂野单位增加一层增益（通过stack计数）
    for _, ally in pairs(allies) do
        if ally:IsAlive() and not ally:IsNull() then
            -- 检查是否是狂野单位
            if self:IsWildUnit(ally) then
                wild_count = wild_count + 1
                print("Wild 1: Found wild unit:", ally:GetUnitName())
                
                -- 检查是否已经有stack modifier
                local modifier = ally:FindModifierByName("modifier_wild_1_stack")
                if modifier then
                    -- 增加层数
                    modifier:IncrementStackCount()
                    print("Wild 1: Incremented stack for", ally:GetUnitName(), "new stack =", modifier:GetStackCount())
                    
                    -- 播放狂野特效（野性风暴环境特效，符合狂野主题）
                    local particle = ParticleManager:CreateParticle(
                        "particles/generic_gameplay/wildkin_ripper_hurricane_ambient.vpcf",
                        PATTACH_ABSORIGIN_FOLLOW,
                        ally
                    )
                    ParticleManager:SetParticleControl(particle, 0, ally:GetAbsOrigin())
                    ParticleManager:ReleaseParticleIndex(particle)
                else
                    -- 创建新的stack modifier，初始层数为1
                    local success = pcall(function()
                        modifier = ally:AddNewModifier(caster, self:GetAbility(), "modifier_wild_1_stack", { duration = -1 })
                        if modifier then
                            modifier:SetStackCount(1)
                            print("Wild 1: Created new stack modifier for", ally:GetUnitName(), "stack = 1")
                            
                            -- 播放狂野特效（野性风暴环境特效，符合狂野主题）
                            local particle = ParticleManager:CreateParticle(
                                "particles/generic_gameplay/wildkin_ripper_hurricane_ambient.vpcf",
                                PATTACH_ABSORIGIN_FOLLOW,
                                ally
                            )
                            ParticleManager:SetParticleControl(particle, 0, ally:GetAbsOrigin())
                            ParticleManager:ReleaseParticleIndex(particle)
                        else
                            print("Wild 1: Failed to create modifier for", ally:GetUnitName())
                        end
                    end)
                    if not success then
                        print("Wild 1: Error creating modifier for", ally:GetUnitName())
                    end
                end
            end
        end
    end
    
    print("Wild 1: Applied buff to", wild_count, "wild units")
end

function modifier_wild_1:GetEffectName()
    return "particles/generic_gameplay/aegis_respawn.vpcf"
end

function modifier_wild_1:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

-- 狂野单位攻击速度效果修饰符（通过stack计数实现叠加）
if modifier_wild_1_stack == nil then
    modifier_wild_1_stack = class({})
end

function modifier_wild_1_stack:IsHidden()
    return true  -- 隐藏buff图标，但效果仍然生效
end

function modifier_wild_1_stack:IsPurgable()
    return false
end

function modifier_wild_1_stack:IsDebuff()
    return false
end

function modifier_wild_1_stack:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_wild_1_stack:OnCreated(params)
    if IsServer() then
        -- 从技能配置获取攻击速度加成百分比
        self.attack_speed_bonus_percent = self:GetAbility():GetSpecialValueFor("attack_speed_bonus_percent") or 10.0
        print("Wild 1 Stack: Created, attack_speed_bonus_percent =", self.attack_speed_bonus_percent, "initial stack =", self:GetStackCount())
    end
end

-- 提供攻击速度固定值加成（根据stack层数计算，参考clockwork_accelerator的实现）
function modifier_wild_1_stack:GetModifierAttackSpeedBonus_Constant()
    local stack_count = self:GetStackCount()
    if stack_count <= 0 then
        stack_count = 1  -- 至少1层
    end
    
    -- 参考clockwork_accelerator的实现方式
    -- 10%攻速加成 ≈ 10固定值（根据Dota 2的攻速计算公式）
    -- 百分比攻速：10% = 基础攻速(100) * 0.1 = 10固定值
    local percent_bonus = self.attack_speed_bonus_percent * stack_count
    local constant_bonus = percent_bonus  -- 直接使用百分比值作为固定值（10% = 10固定值）
    
    return constant_bonus
end


