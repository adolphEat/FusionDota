-- underlord_pit_of_malice.lua
-- 深渊技能：以9999距离内最近敌人为目标，在该目标位置创建持续6秒、半径450的深渊
-- 深渊效果：区域内敌方减少10%攻击力，每秒受到50点魔法伤害
-- 孽主增益：增加该技能减少的敌方攻击力之和，恢复等量造成的伤害

LinkLuaModifier("modifier_underlord_pit_of_malice_debuff", "heroes/hero_underlord/underlord_pit_of_malice.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_underlord_pit_of_malice_buff", "heroes/hero_underlord/underlord_pit_of_malice.lua", LUA_MODIFIER_MOTION_NONE)

underlord_pit_of_malice = class({})

-- 自走棋式自动施法功能
function underlord_pit_of_malice:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            local current_time = GameRules:GetGameTime()
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local nearest_enemy = self:FindNearestEnemy()
                if nearest_enemy then
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                        self.last_cast_time = current_time
                    end
                end
            end
            return 0.1
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function underlord_pit_of_malice:FindNearestEnemy()
    local caster = self:GetCaster()
    local range = self:GetSpecialValueFor("auto_cast_range")
    
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #enemies > 0 then
        return enemies[1]
    end
    
    return nil
end

function underlord_pit_of_malice:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 查找最近敌人
    local target = self:FindNearestEnemy()
    if not target or not IsValidEntity(target) then
        return
    end
    
    -- 获取目标位置，使用Vector构造函数确保是有效的Vector
    local target_origin = target:GetAbsOrigin()
    local target_pos = Vector(target_origin.x, target_origin.y, target_origin.z)
    
    -- 验证位置是否有效（不是0,0,0）
    if target_pos.x == 0 and target_pos.y == 0 and target_pos.z == 0 then
        target_pos = caster:GetAbsOrigin()
    end
    
    local radius = self:GetSpecialValueFor("pit_radius")
    local duration = self:GetSpecialValueFor("pit_duration")
    
    -- 创建粒子特效（参考Enigma的方式，直接在OnSpellStart中创建）
    local particle = ParticleManager:CreateParticle(
        "particles/heroes/underlord/underlord_2021_immortal_darkrift_ambient.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    if particle ~= -1 then
        -- Control 0: 位置（主位置）
        ParticleManager:SetParticleControl(particle, 0, target_pos)
        -- 尝试设置其他可能的位置控制点（但保持它们的位置值，不设置大小）
        -- Control 1可能是位置或大小，先尝试设置为位置
        ParticleManager:SetParticleControl(particle, 1, target_pos)
        -- Control 2-7可能也是位置控制点
        ParticleManager:SetParticleControl(particle, 2, target_pos)
        ParticleManager:SetParticleControl(particle, 3, target_pos)
        ParticleManager:SetParticleControl(particle, 4, target_pos)
        ParticleManager:SetParticleControl(particle, 5, target_pos)
        ParticleManager:SetParticleControl(particle, 6, target_pos)
        ParticleManager:SetParticleControl(particle, 7, target_pos)
    end
    
    -- 创建深渊区域（使用Think函数持续检测）
    self:CreatePitOfMalice(target_pos, radius, duration, particle)
end

-- 全局Think函数（使用数据表而不是thinker单位，避免碰撞问题）
function PitOfMaliceThinkGlobal(pit_data)
    if not pit_data then
        return nil
    end
    
    -- 确保数据已初始化
    if not pit_data.start_time then
        pit_data.start_time = GameRules:GetGameTime()
    end
    if not pit_data.pit_duration then
        pit_data.pit_duration = 6.0 -- 默认6秒
    end
    
    local current_time = GameRules:GetGameTime()
    local elapsed_time = current_time - pit_data.start_time
    
    if elapsed_time >= pit_data.pit_duration then
        -- 清理粒子效果
        if pit_data.pit_particle and pit_data.pit_particle ~= -1 then
            ParticleManager:DestroyParticle(pit_data.pit_particle, false)
            ParticleManager:ReleaseParticleIndex(pit_data.pit_particle)
        end
        
        -- 清理所有受影响的单位的debuff（会在OnDestroy中自动减少攻击力）
        for unit, _ in pairs(pit_data.pit_affected_units or {}) do
            if IsValidEntity(unit) and not unit:IsNull() then
                local debuff = unit:FindModifierByName("modifier_underlord_pit_of_malice_debuff")
                if debuff then
                    debuff:Destroy()
                end
            end
        end
        
        return nil
    end
    
    local caster = pit_data.pit_caster
    local ability = pit_data.pit_ability
    
    if not caster or not ability or not IsValidEntity(caster) or not IsValidEntity(ability) then
        return 0.1
    end
    
    -- 使用存储的实际中心位置（地面位置）
    local center = pit_data.pit_center
    local radius = pit_data.pit_radius or 450
    local damage_per_second = ability:GetSpecialValueFor("damage_per_second") or 50
    local attack_reduction_percent = ability:GetSpecialValueFor("attack_damage_reduction_percent") or 10
    local damage_interval = ability:GetSpecialValueFor("damage_interval") or 1.0
    
    -- 持续更新粒子特效位置（更新所有可能的位置控制点）
    if pit_data.pit_particle and pit_data.pit_particle ~= -1 and center then
        ParticleManager:SetParticleControl(pit_data.pit_particle, 0, center)
        ParticleManager:SetParticleControl(pit_data.pit_particle, 1, center)
        ParticleManager:SetParticleControl(pit_data.pit_particle, 2, center)
        ParticleManager:SetParticleControl(pit_data.pit_particle, 3, center)
        ParticleManager:SetParticleControl(pit_data.pit_particle, 4, center)
        ParticleManager:SetParticleControl(pit_data.pit_particle, 5, center)
        ParticleManager:SetParticleControl(pit_data.pit_particle, 6, center)
        ParticleManager:SetParticleControl(pit_data.pit_particle, 7, center)
    end
    
    -- 查找区域内所有敌方单位
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        center,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    local current_damage_dealt = 0
    local current_units_in_pit = {}
    
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and not enemy:IsNull() and enemy:IsAlive() then
            current_units_in_pit[enemy] = true
            
            -- 应用debuff（减攻击力）
            local debuff = enemy:FindModifierByName("modifier_underlord_pit_of_malice_debuff")
            if not debuff then
                -- 首次进入，计算攻击力减少量
                local base_damage = enemy:GetBaseDamageMax()
                local reduction_amount = math.floor(base_damage * attack_reduction_percent / 100)
                if not pit_data.pit_affected_units[enemy] then
                    pit_data.pit_affected_units[enemy] = reduction_amount
                end
                
                -- 创建debuff，使用固定减少值，并传递caster和ability引用
                local remaining_time = pit_data.pit_duration - elapsed_time
                local new_debuff = enemy:AddNewModifier(caster, ability, "modifier_underlord_pit_of_malice_debuff", {
                    duration = remaining_time + 0.1,
                    reduction = reduction_amount
                })
                
                -- 立即给孽主增加攻击力
                if new_debuff and reduction_amount > 0 then
                    local buff = caster:FindModifierByName("modifier_underlord_pit_of_malice_buff")
                    if buff then
                        buff:SetStackCount(buff:GetStackCount() + reduction_amount)
                    else
                        local modifier = caster:AddNewModifier(caster, ability, "modifier_underlord_pit_of_malice_buff", {duration = -1})
                        if modifier then
                            modifier:SetStackCount(reduction_amount)
                        end
                    end
                end
            else
                -- 如果已存在，持续刷新
                local remaining_time = pit_data.pit_duration - elapsed_time
                debuff:SetDuration(remaining_time + 0.1, true)
            end
            
            -- 造成伤害并立即恢复等量生命值
            local damage_amount = damage_per_second * damage_interval
            local damage_table = {
                victim = enemy,
                attacker = caster,
                damage = damage_amount,
                damage_type = DAMAGE_TYPE_MAGICAL,
                ability = ability
            }
            ApplyDamage(damage_table)
            
            -- 立即恢复等量生命值
            if damage_amount > 0 and IsValidEntity(caster) and caster:IsAlive() then
                caster:Heal(damage_amount, ability)
                SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, caster, damage_amount, nil)
            end
            
            current_damage_dealt = current_damage_dealt + damage_amount
        end
    end
    
    -- 移除离开区域的单位的debuff
    local units_to_remove = {}
    for unit, _ in pairs(pit_data.pit_affected_units or {}) do
        if IsValidEntity(unit) and not unit:IsNull() then
            if not current_units_in_pit[unit] then
                table.insert(units_to_remove, unit)
            end
        else
            table.insert(units_to_remove, unit)
        end
    end
    
    for _, unit in ipairs(units_to_remove) do
        if IsValidEntity(unit) and not unit:IsNull() then
            local debuff = unit:FindModifierByName("modifier_underlord_pit_of_malice_debuff")
            if debuff then
                -- Destroy会触发OnDestroy，自动减少孽主的攻击力
                debuff:Destroy()
            end
        end
        pit_data.pit_affected_units[unit] = nil
    end
    
    return damage_interval
end

function underlord_pit_of_malice:CreatePitOfMalice(center, radius, duration, particle)
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local ability = self
    
    -- 使用全局Think函数而不是创建thinker单位，完全避免碰撞问题
    local pit_data = {
        pit_particle = particle,
        pit_radius = radius,
        pit_duration = duration,
        pit_caster = caster,
        pit_ability = ability,
        pit_center = center,
        start_time = GameRules:GetGameTime(),
        pit_total_damage_dealt = 0,
        pit_total_attack_reduction = 0,
        pit_affected_units = {}
    }
    
    -- 使用全局Think函数，避免创建会阻挡的单位
    local think_name = "PitOfMaliceThink_" .. GameRules:GetGameTime() .. "_" .. math.random(10000)
    GameRules:GetGameModeEntity():SetThink(function()
        return PitOfMaliceThinkGlobal(pit_data)
    end, think_name, 0.1)
end

-- 敌方单位debuff：减少攻击力
modifier_underlord_pit_of_malice_debuff = class({})

function modifier_underlord_pit_of_malice_debuff:IsHidden() return false end
function modifier_underlord_pit_of_malice_debuff:IsDebuff() return true end
function modifier_underlord_pit_of_malice_debuff:IsPurgable() return true end

function modifier_underlord_pit_of_malice_debuff:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE
    }
end

function modifier_underlord_pit_of_malice_debuff:GetModifierBaseAttack_BonusDamage()
    -- 使用存储在params中的值，避免在客户端计算
    return -(self.reduction or 0)
end

function modifier_underlord_pit_of_malice_debuff:OnCreated(params)
    if not IsServer() then return end
    -- 从params中获取减少值，如果没有则计算
    if params.reduction then
        self.reduction = params.reduction
    else
        local ability = self:GetAbility()
        local parent = self:GetParent()
        if ability and parent and not parent:IsNull() then
            local base_damage = parent:GetBaseDamageMax()
            local reduction_percent = ability:GetSpecialValueFor("attack_damage_reduction_percent") or 10
            self.reduction = math.floor(base_damage * reduction_percent / 100)
        else
            self.reduction = 0
        end
    end
end

function modifier_underlord_pit_of_malice_debuff:OnDestroy()
    if not IsServer() then return end
    
    -- 当debuff被移除时，减少孽主对应的攻击力
    local reduction = self.reduction or 0
    if reduction > 0 then
        local caster = self:GetCaster()
        local ability = self:GetAbility()
        if caster and ability and IsValidEntity(caster) and IsValidEntity(ability) then
            local buff = caster:FindModifierByName("modifier_underlord_pit_of_malice_buff")
            if buff then
                local current_stacks = buff:GetStackCount()
                local new_stacks = math.max(0, current_stacks - reduction)
                buff:SetStackCount(new_stacks)
                
                -- 如果攻击力降为0，可以考虑移除buff（可选）
                if new_stacks <= 0 then
                    -- buff:Destroy() -- 如果希望移除，可以取消注释
                end
            end
        end
    end
end

-- 孽主增益：增加攻击力并恢复生命
modifier_underlord_pit_of_malice_buff = class({})

function modifier_underlord_pit_of_malice_buff:IsHidden() return false end
function modifier_underlord_pit_of_malice_buff:IsDebuff() return false end
function modifier_underlord_pit_of_malice_buff:IsPurgable() return true end

function modifier_underlord_pit_of_malice_buff:OnCreated(params)
    if not IsServer() then return end
    -- 不再需要累计伤害，因为每次伤害都会立即恢复
end

function modifier_underlord_pit_of_malice_buff:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE
    }
end

function modifier_underlord_pit_of_malice_buff:GetModifierBaseAttack_BonusDamage()
    return self:GetStackCount()
end

