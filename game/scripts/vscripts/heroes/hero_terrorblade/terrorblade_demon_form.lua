-- Terrorblade Demon Form技能
-- 变身持续10秒，变身后获得额外的400攻击距离与15%攻速加成，且每次普攻附带50点额外魔法伤害
-- 每2秒偷取场上所有单位100点生命值

terrorblade_demon_form = class({})

LinkLuaModifier("modifier_terrorblade_demon_form_custom", "heroes/hero_terrorblade/terrorblade_demon_form.lua", LUA_MODIFIER_MOTION_NONE)

-- 预加载模型资源
function terrorblade_demon_form:Precache(context)
    PrecacheResource("model", "models/heroes/terrorblade/demon.vmdl", context)
end

-- 确保技能没有冷却时间
function terrorblade_demon_form:GetCooldown(level)
    return 0
end

-- 自走棋式自动施法功能
function terrorblade_demon_form:OnCreated()
    if not IsServer() then return end
end

function terrorblade_demon_form:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
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
            
            -- 如果满蓝且技能可用，且当前没有变身效果，则自动施法
            if current_mana >= max_mana and self:IsFullyCastable() then
                local has_demon_form = caster:HasModifier("modifier_terrorblade_demon_form_custom")
                if not has_demon_form then
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        local success = pcall(function()
                            caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                        end)
                        
                        if success then
                            self.last_cast_time = current_time
                        end
                    end
                end
            end
            return 0.5
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "TerrorbladeDemonFormAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function terrorblade_demon_form:OnSpellStart()
    local caster = self:GetCaster()
    local duration = self:GetSpecialValueFor("duration")
    
    -- 强制清除冷却时间
    self:EndCooldown()
    
    -- 如果已经有变身效果，先移除
    if caster:HasModifier("modifier_terrorblade_demon_form_custom") then
        caster:RemoveModifierByName("modifier_terrorblade_demon_form_custom")
    end
    
    -- 添加变身效果（最简单的 modifier）
    caster:AddNewModifier(caster, self, "modifier_terrorblade_demon_form_custom", {duration = duration})
    
    -- 播放音效
    EmitSoundOn("Hero_Terrorblade.Metamorphosis", caster)
    
    -- 播放变身时的特效
    local transform_particle = ParticleManager:CreateParticle(
        "particles/heroes/terrorblade/terrorblade_metamorphosis_transform.vpcf",
        PATTACH_ABSORIGIN_FOLLOW,
        caster
    )
    ParticleManager:SetParticleControl(transform_particle, 0, caster:GetAbsOrigin())
    ParticleManager:ReleaseParticleIndex(transform_particle)
end

-- 变身效果modifier（使用不同的名称避免冲突）
if modifier_terrorblade_demon_form_custom == nil then
    modifier_terrorblade_demon_form_custom = class({})
end

function modifier_terrorblade_demon_form_custom:IsHidden()
    return false
end

function modifier_terrorblade_demon_form_custom:IsDebuff()
    return false
end

function modifier_terrorblade_demon_form_custom:IsPurgable()
    return true
end

function modifier_terrorblade_demon_form_custom:OnCreated(params)
    -- 客户端和服务器端都需要初始化（因为 GetModifierAttackSpeedBonus_Constant 可能在客户端被调用）
    local ability = self:GetAbility()
    
    if ability and not ability:IsNull() then
        self.bonus_attack_range = ability:GetSpecialValueFor("bonus_attack_range") or 400
        self.attack_speed_bonus_percent = ability:GetSpecialValueFor("attack_speed_bonus_percent") or 15.0
        self.bonus_magic_damage = ability:GetSpecialValueFor("bonus_magic_damage") or 50
        self.life_steal_interval = ability:GetSpecialValueFor("life_steal_interval") or 2.0
        self.life_steal_amount = ability:GetSpecialValueFor("life_steal_amount") or 100
    else
        -- 如果 ability 不存在，使用默认值
        self.bonus_attack_range = 400
        self.attack_speed_bonus_percent = 15.0
        self.bonus_magic_damage = 50
        self.life_steal_interval = 2.0
        self.life_steal_amount = 100
    end
    
    if IsServer() then
        local caster = self:GetParent()
        
        -- 确保在服务器端也初始化这些值（防止客户端初始化但服务器端未初始化）
        if not self.life_steal_interval then
            self.life_steal_interval = 2.0
        end
        if not self.life_steal_amount then
            self.life_steal_amount = 100
        end
        
        -- 保存原始模型和模型缩放
        self.original_model = caster:GetModelName()
        self.original_model_scale = caster:GetModelScale()
        
        -- 保存原始攻击类型
        self.original_attack_capability = caster:GetAttackCapability()
        
        -- 将攻击类型从近战改为远程（这样才能显示投掷物）
        caster:SetAttackCapability(DOTA_UNIT_CAP_RANGED_ATTACK)
        -- 设置投掷物速度（必须设置才能显示投掷物）
        caster:SetRangedProjectileName("particles/heroes/terrorblade/terrorblade_metamorphosis_base_attack.vpcf")
        
        -- 保存并隐藏所有装饰物（Wearable1-6），因为恶魔模型是完整模型
        self.hidden_wearables = {}
        
        -- 使用GetWearable方法（如果可用）或FirstMoveChild方法隐藏所有装饰物
        local function HideAllWearables()
            -- 方法1: 使用GetWearable（如果可用）
            local success_check, _ = pcall(function() return caster.GetWearable end)
            if success_check then
                -- 隐藏所有装饰物（Wearable1-6）
                for i = 0, 5 do
                    local success_wearable, wearable = pcall(function() return caster:GetWearable(i) end)
                    if success_wearable and wearable and not wearable:IsNull() then
                        wearable:AddEffects(EF_NODRAW)
                        table.insert(self.hidden_wearables, wearable)
                    end
                end
            else
                -- 方法2: 使用FirstMoveChild和NextMovePeer遍历所有装饰物
                local model = caster:FirstMoveChild()
                while model ~= nil do
                    if model:GetClassname() == "dota_item_wearable" then
                        model:AddEffects(EF_NODRAW)
                        table.insert(self.hidden_wearables, model)
                    end
                    model = model:NextMovePeer()
                end
            end
        end
        
        -- 立即执行装饰物隐藏
        HideAllWearables()
        
        -- 如果第一次没有找到装饰物，延迟再试一次
        if #self.hidden_wearables == 0 then
            GameRules:GetGameModeEntity():SetThink(function()
                if not IsValidEntity(caster) or caster:IsNull() then return nil end
                if not caster:HasModifier("modifier_terrorblade_demon_form_custom") then return nil end
                
                HideAllWearables()
                return nil
            end, "TerrorbladeHideWearables_" .. caster:GetEntityIndex(), 0.2)
        end
        
        -- 设置恶魔模型（从 Wearable6 获取模型路径，或使用已知路径）
        local demon_model_path = nil
        
        -- 尝试从 Wearable6 获取模型路径
        local success_wearable6, wearable6 = pcall(function() return caster:GetWearable(5) end)
        if success_wearable6 and wearable6 and not wearable6:IsNull() then
            demon_model_path = wearable6:GetModelName()
        end
        
        -- 如果无法从 Wearable6 获取，使用已知的模型路径
        if not demon_model_path or demon_model_path == "" then
            demon_model_path = "models/heroes/terrorblade/demon.vmdl"
        end
        
        -- 设置恶魔模型
        caster:SetModel(demon_model_path)
        caster:SetOriginalModel(demon_model_path)
        
        -- 设置模型后，再次确保所有装饰物被隐藏（因为设置模型可能会重新显示装饰物）
        GameRules:GetGameModeEntity():SetThink(function()
            if not IsValidEntity(caster) or caster:IsNull() then return nil end
            if not caster:HasModifier("modifier_terrorblade_demon_form_custom") then return nil end
            
            -- 再次隐藏所有装饰物
            HideAllWearables()
            return nil
        end, "TerrorbladeHideWearablesAfterModel_" .. caster:GetEntityIndex(), 0.1)
        
        -- 记录变身时的mana值，用于阻止mana获取
        self.locked_mana = caster:GetMana()
        self.last_life_steal_time = GameRules:GetGameTime()
        
        -- 启动计时器（每0.1秒检查一次，用于mana锁定和生命偷取）
        self:StartIntervalThink(0.1)
        
        -- 调试信息
        print("Terrorblade Demon Form: OnCreated")
        print("  Original model:", self.original_model)
        print("  Demon model:", demon_model_path)
        print("  Hidden wearables count:", #self.hidden_wearables)
        print("  life_steal_interval:", self.life_steal_interval)
        print("  life_steal_amount:", self.life_steal_amount)
        print("  last_life_steal_time:", self.last_life_steal_time)
    end
end

function modifier_terrorblade_demon_form_custom:OnDestroy()
    if IsServer() then
        local caster = self:GetParent()
        if caster and not caster:IsNull() then
            -- 恢复原始模型
            if self.original_model then
                caster:SetModel(self.original_model)
                caster:SetOriginalModel(self.original_model)
            end
            if self.original_model_scale then
                caster:SetModelScale(self.original_model_scale)
            end
            
            -- 恢复原始攻击类型和投掷物
            if self.original_attack_capability then
                caster:SetAttackCapability(self.original_attack_capability)
            end
            -- 清除投掷物设置
            caster:SetRangedProjectileName("")
            
            -- 恢复所有装饰物的显示
            if self.hidden_wearables then
                for _, wearable in pairs(self.hidden_wearables) do
                    if wearable and not wearable:IsNull() then
                        wearable:RemoveEffects(EF_NODRAW)
                    end
                end
            end
        end
    end
end

function modifier_terrorblade_demon_form_custom:OnIntervalThink()
    if not IsServer() then return 0.1 end
    
    local caster = self:GetParent()
    if not caster or caster:IsNull() or not caster:IsAlive() then return 0.1 end
    
    -- 持续确保所有装饰物保持隐藏状态（防止被重新显示）
    if self.hidden_wearables then
        for _, wearable in pairs(self.hidden_wearables) do
            if wearable and not wearable:IsNull() then
                wearable:AddEffects(EF_NODRAW)
            end
        end
    end
    
    -- 也检查是否有新的装饰物被添加（通过遍历所有子节点）
    local model = caster:FirstMoveChild()
    while model ~= nil do
        if model:GetClassname() == "dota_item_wearable" then
            -- 如果这个装饰物不在隐藏列表中，添加到列表并隐藏
            local found = false
            if self.hidden_wearables then
                for _, hidden_wearable in pairs(self.hidden_wearables) do
                    if hidden_wearable == model then
                        found = true
                        break
                    end
                end
            end
            if not found then
                model:AddEffects(EF_NODRAW)
                if not self.hidden_wearables then
                    self.hidden_wearables = {}
                end
                table.insert(self.hidden_wearables, model)
            else
                -- 确保已隐藏的装饰物保持隐藏
                model:AddEffects(EF_NODRAW)
            end
        end
        model = model:NextMovePeer()
    end
    
    -- 锁定mana，防止任何方式获取mana（每0.1秒检查一次）
    if self.locked_mana then
        local current_mana = caster:GetMana()
        if current_mana > self.locked_mana then
            caster:SetMana(self.locked_mana)
        end
    end
    
    -- 检查是否是生命偷取间隔时间（每2秒）
    local current_time = GameRules:GetGameTime()
    local life_steal_interval = self.life_steal_interval or 2.0
    local life_steal_amount = self.life_steal_amount or 100
    
    -- 确保 last_life_steal_time 已初始化
    if not self.last_life_steal_time then
        self.last_life_steal_time = current_time
    end
    
    if current_time - self.last_life_steal_time >= life_steal_interval then
        self.last_life_steal_time = current_time
        
        -- 查找场上所有敌方单位（全地图范围）
        local all_units = FindUnitsInRadius(
            caster:GetTeamNumber(),
            caster:GetAbsOrigin(),
            nil,
            99999, -- 全地图范围
            DOTA_UNIT_TARGET_TEAM_ENEMY, -- 只包括敌方单位
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        local total_stolen = 0
        
        -- 对每个敌方单位造成伤害并偷取生命值
        for _, unit in pairs(all_units) do
            if unit and not unit:IsNull() and unit:IsAlive() then
                -- 造成伤害
                local damage_table = {
                    victim = unit,
                    attacker = caster,
                    damage = life_steal_amount,
                    damage_type = DAMAGE_TYPE_PURE,
                    damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
                    ability = self:GetAbility()
                }
                ApplyDamage(damage_table)
                
                -- 播放吸血粒子特效（从敌人到自己，类似原版terrorblade_sunder）
                -- 原版terrorblade_sunder的粒子特效是从目标到施法者的方向
                -- 使用 PATTACH_WORLDORIGIN 来精确控制粒子特效的位置和方向
                -- 注意：粒子特效本身的起点和终点可能是反着的，所以调换位置
                local sunder_particle = ParticleManager:CreateParticle(
                    "particles/heroes/terrorblade/terrorblade_sunder.vpcf",
                    PATTACH_WORLDORIGIN,
                    nil
                )
                -- 控制点 0: 终点（自己位置）- 粒子特效本身起点和终点可能是反着的
                ParticleManager:SetParticleControl(sunder_particle, 0, caster:GetAbsOrigin())
                -- 控制点 1: 起点（敌人位置）- 粒子特效本身起点和终点可能是反着的
                ParticleManager:SetParticleControl(sunder_particle, 1, unit:GetAbsOrigin())
                ParticleManager:ReleaseParticleIndex(sunder_particle)
                
                total_stolen = total_stolen + life_steal_amount
            end
        end
        
        -- 治疗施法者（偷取的生命值）
        if total_stolen > 0 then
            caster:Heal(total_stolen, caster)
            
            -- 显示治疗效果
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, caster, math.floor(total_stolen), nil)
            
            -- 调试信息
            print("Terrorblade Demon Form: Life steal triggered, total_stolen:", total_stolen)
        end
    end
    
    -- 返回检查间隔（0.1秒）
    return 0.1
end

function modifier_terrorblade_demon_form_custom:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACK_RANGE_BONUS,
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT,
        MODIFIER_PROPERTY_MANA_REGEN_CONSTANT,
        MODIFIER_PROPERTY_PROJECTILE_NAME,
        MODIFIER_EVENT_ON_ATTACK_LANDED,
        MODIFIER_EVENT_ON_TAKEDAMAGE
    }
end

-- 提供攻击距离加成
function modifier_terrorblade_demon_form_custom:GetModifierAttackRangeBonus()
    return self.bonus_attack_range or 400
end

-- 提供攻击速度加成（使用安全的实现方式）
function modifier_terrorblade_demon_form_custom:GetModifierAttackSpeedBonus_Constant()
    -- 确保总是返回有效的数值（客户端和服务器端都需要）
    local attack_speed_bonus_percent = 15.0
    
    if self.attack_speed_bonus_percent then
        attack_speed_bonus_percent = self.attack_speed_bonus_percent
    else
        -- 如果未初始化，尝试从 ability 获取
        local ability = self:GetAbility()
        if ability and not ability:IsNull() then
            attack_speed_bonus_percent = ability:GetSpecialValueFor("attack_speed_bonus_percent") or 15.0
        end
    end
    
    return attack_speed_bonus_percent
end

-- 阻止mana回复（返回很大的负值来抵消所有mana回复）
function modifier_terrorblade_demon_form_custom:GetModifierConstantManaRegen()
    return -9999
end

-- 提供普攻投掷物（变身恶魔后的投掷物）
function modifier_terrorblade_demon_form_custom:GetModifierProjectileName()
    -- 客户端和服务器端都需要返回投掷物路径
    local caster = self:GetParent()
    if caster and not caster:IsNull() then
        -- 变身恶魔后，攻击距离会增加400，总攻击距离为600（200+400）
        -- 只要攻击距离大于150，就返回投掷物
        local attack_range = caster:GetBaseAttackRange()
        if not attack_range then
            attack_range = caster:GetAttackRange() or 0
        end
        
        -- 如果攻击距离大于150，说明是远程攻击，返回投掷物
        if attack_range and attack_range > 150 then
            return "particles/heroes/terrorblade/terrorblade_metamorphosis_base_attack.vpcf"
        end
    end
    return ""
end

-- 处理攻击附加魔法伤害
function modifier_terrorblade_demon_form_custom:OnAttackLanded(params)
    if not IsServer() then return end
    
    local attacker = params.attacker
    local target = params.target
    
    -- 检查是否是拥有此modifier的单位发起的攻击
    if not attacker or attacker:IsNull() or attacker ~= self:GetParent() then return end
    
    -- 检查目标是否有效
    if not target or target:IsNull() or not target:IsAlive() then return end
    
    -- 检查是否是敌人
    if attacker:GetTeamNumber() == target:GetTeamNumber() then return end
    
    -- 检查是否是普通攻击（不是技能攻击）
    if params.inflictor then return end
    
    -- 立即锁定mana，防止通过攻击获得的mana
    if self.locked_mana then
        local current_mana = attacker:GetMana()
        if current_mana > self.locked_mana then
            attacker:SetMana(self.locked_mana)
        end
    end
    
    -- 应用额外魔法伤害
    local bonus_damage = self.bonus_magic_damage or 50
    if bonus_damage > 0 then
        local ability = self:GetAbility()
        if ability and not ability:IsNull() then
            local damage_table = {
                victim = target,
                attacker = attacker,
                damage = bonus_damage,
                damage_type = DAMAGE_TYPE_MAGICAL,
                damage_flags = DOTA_DAMAGE_FLAG_NO_SPELL_AMPLIFICATION,
                ability = ability
            }
            ApplyDamage(damage_table)
            
            -- 显示魔法伤害数字
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_DAMAGE, target, math.floor(bonus_damage), nil)
        end
    end
    
    -- 再次锁定mana，防止通过攻击获得的mana
    if self.locked_mana then
        local current_mana = attacker:GetMana()
        if current_mana > self.locked_mana then
            attacker:SetMana(self.locked_mana)
        end
    end
end

-- 阻止通过受到伤害获得的mana
function modifier_terrorblade_demon_form_custom:OnTakeDamage(params)
    if not IsServer() then return end
    
    local unit = params.unit
    if unit ~= self:GetParent() then return end
    
    -- 立即锁定mana，防止通过受到伤害获得的mana
    if self.locked_mana then
        local current_mana = unit:GetMana()
        if current_mana > self.locked_mana then
            unit:SetMana(self.locked_mana)
        end
    end
end

function modifier_terrorblade_demon_form_custom:GetEffectName()
    return "particles/heroes/terrorblade/terrorblade_metamorphosis.vpcf"
end

function modifier_terrorblade_demon_form_custom:GetEffectAttachType()
    return PATTACH_ABSORIGIN_FOLLOW
end

