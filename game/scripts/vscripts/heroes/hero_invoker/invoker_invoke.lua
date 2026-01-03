-- invoker_invoke.lua
-- 第一步：实现法球生成与法球属性加成
-- 法球生成概率：根据场上友军类型（远程/近战）决定
-- 每个红法球：3%攻击加成
-- 每个蓝法球：1/s魔法恢复速度
-- 最多3个法球
-- 当法球达到3个时，根据法球组合释放技能，释放后法球被消耗但属性增益保留

LinkLuaModifier("modifier_invoker_fire_orb", "heroes/hero_invoker/invoker_invoke.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_invoker_ice_orb", "heroes/hero_invoker/invoker_invoke.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_invoker_fire_orb_bonus", "heroes/hero_invoker/invoker_invoke.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_invoker_ice_orb_bonus", "heroes/hero_invoker/invoker_invoke.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_lina_flame_strike_burn", "heroes/hero_lina/lina_flame_strike.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_invoker_arctic_blast_slow", "heroes/hero_invoker/invoker_invoke.lua", LUA_MODIFIER_MOTION_NONE)

if invoker_elemental_invoke == nil then
    invoker_elemental_invoke = class({})
end

function invoker_elemental_invoke:GetAbilityTextureName()
    return "invoker_invoke"
end

function invoker_elemental_invoke:GetCooldown(level)
    return 0 -- 确保技能没有冷却时间
end

-- 自走棋式自动施法功能：满蓝时自动生成法球
function invoker_elemental_invoke:OnUpgrade()
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
            
            -- 检查Mana是否回满（达到最大Mana值）
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                -- 检查是否已经在施法
                if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                    local success = pcall(function()
                        caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                    end)
                    
                    if success then
                        self.last_cast_time = current_time
                    end
                end
            end
            return 0.1 -- 每0.1秒检查一次
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "InvokerElementalInvokeAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function invoker_elemental_invoke:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    if not caster or caster:IsNull() then return end
    
    -- 消耗所有蓝量（因为技能蓝耗为0，需要手动清零）
    caster:SetMana(0)
    
    -- 检查当前法球数量
    local current_orbs = self:GetCurrentOrbCount(caster)
    local max_orbs = self:GetSpecialValueFor("max_orbs")
    
    if current_orbs >= max_orbs then
        -- 已经达到最大法球数，检查法球组合并释放技能
        local orb_combination = self:GetOrbCombination(caster)
        local spell_cast_success = self:CastSpellByOrbCombination(caster, orb_combination)
        -- 只有当技能成功释放时，才清空法球（但保留属性增益）
        if spell_cast_success then
            self:ConsumeOrbs(caster)
        else
            print("Invoker: Cannot cast spell, no valid targets found. Orbs not consumed.")
        end
        return
    end
    
    -- 计算法球生成概率
    local fire_chance, ice_chance = self:CalculateOrbChances(caster)
    
    -- 随机生成法球
    local random = RandomFloat(0, 100)
    local orb_type = nil
    
    if random <= fire_chance then
        orb_type = "fire"
    else
        orb_type = "ice"
    end
    
    -- 添加法球（使用 stack count 跟踪数量）
    if orb_type == "fire" then
        local modifier = caster:FindModifierByName("modifier_invoker_fire_orb")
        if modifier then
            modifier:IncrementStackCount()
        else
            modifier = caster:AddNewModifier(caster, self, "modifier_invoker_fire_orb", {})
            if modifier then
                modifier:SetStackCount(1)
            end
        end
        
        -- 更新粒子（延迟确保 stack count 已更新）
        if modifier then
            GameRules:GetGameModeEntity():SetThink(function()
                if modifier and not modifier:IsNull() then
                    modifier:UpdateParticles()
                end
                return nil
            end, "UpdateFireOrbParticles_" .. caster:GetEntityIndex() .. "_" .. GameRules:GetGameTime(), 0.05)
        end
        
        -- 同时增加累计属性增益（永久保留）
        local bonus_modifier = caster:FindModifierByName("modifier_invoker_fire_orb_bonus")
        if bonus_modifier then
            bonus_modifier:IncrementStackCount()
        else
            bonus_modifier = caster:AddNewModifier(caster, self, "modifier_invoker_fire_orb_bonus", {})
            if bonus_modifier then
                bonus_modifier:SetStackCount(1)
            end
        end
        
        print("Invoker: Generated Fire Orb (Red), current fire orbs:", modifier and modifier:GetStackCount() or 1, "total fire bonus stacks:", bonus_modifier and bonus_modifier:GetStackCount() or 1)
    else
        local modifier = caster:FindModifierByName("modifier_invoker_ice_orb")
        if modifier then
            modifier:IncrementStackCount()
        else
            modifier = caster:AddNewModifier(caster, self, "modifier_invoker_ice_orb", {})
            if modifier then
                modifier:SetStackCount(1)
            end
        end
        
        -- 更新粒子（延迟确保 stack count 已更新）
        if modifier then
            GameRules:GetGameModeEntity():SetThink(function()
                if modifier and not modifier:IsNull() then
                    modifier:UpdateParticles()
                end
                return nil
            end, "UpdateIceOrbParticles_" .. caster:GetEntityIndex() .. "_" .. GameRules:GetGameTime(), 0.05)
        end
        
        -- 同时增加累计属性增益（永久保留）
        local bonus_modifier = caster:FindModifierByName("modifier_invoker_ice_orb_bonus")
        if bonus_modifier then
            bonus_modifier:IncrementStackCount()
        else
            bonus_modifier = caster:AddNewModifier(caster, self, "modifier_invoker_ice_orb_bonus", {})
            if bonus_modifier then
                bonus_modifier:SetStackCount(1)
            end
        end
        
        print("Invoker: Generated Ice Orb (Blue), current ice orbs:", modifier and modifier:GetStackCount() or 1, "total ice bonus stacks:", bonus_modifier and bonus_modifier:GetStackCount() or 1)
    end
    
    -- 检查是否达到3个法球
    local new_orb_count = self:GetCurrentOrbCount(caster)
    if new_orb_count >= max_orbs then
        -- 达到最大法球数，检查法球组合并释放技能
        local orb_combination = self:GetOrbCombination(caster)
        local spell_cast_success = self:CastSpellByOrbCombination(caster, orb_combination)
        -- 只有当技能成功释放时，才清空法球（但保留属性增益）
        if spell_cast_success then
            self:ConsumeOrbs(caster)
        else
            print("Invoker: Cannot cast spell, no valid targets found. Orbs not consumed.")
        end
    end
    
    -- 播放音效
    EmitSoundOn("Hero_Invoker.Invoke", caster)
end

-- 计算法球生成概率
-- 远程单位列表（攻击距离为600或800）
local RANGED_UNITS = {
    "windrunner1",      -- 风行者 800
    "lion1",           -- 莱恩 600
    "drow_ranger1",    -- 卓尔游侠 800
    "lina1",           -- 莉娜 600
    "viper1",          -- 冥界亚龙 600
    "crystal_maiden1", -- 水晶室女 600
    "enigma1",         -- 谜团 800
    "zeus1",           -- 宙斯 600
    "invoker1"         -- 召唤师 800
}

-- 判断单位是否为远程单位（攻击距离600或800）
function invoker_elemental_invoke:IsRangedUnit(unit)
    if not unit or unit:IsNull() then return false end
    
    local unit_name = unit:GetUnitName()
    for _, ranged_name in pairs(RANGED_UNITS) do
        if unit_name == ranged_name then
            return true
        end
    end
    
    return false
end

function invoker_elemental_invoke:CalculateOrbChances(caster)
    if not IsServer() then return 50, 50 end
    
    local team = caster:GetTeamNumber()
    local allies = FindUnitsInRadius(
        team,
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    local ranged_count = 0
    local melee_count = 0
    
    -- 统计远程和近战单位数量（使用单位名称判断）
    for _, ally in pairs(allies) do
        if ally and not ally:IsNull() and ally:IsAlive() then
            if self:IsRangedUnit(ally) then
                ranged_count = ranged_count + 1
            else
                melee_count = melee_count + 1
            end
        end
    end
    
    local fire_chance = 50
    local ice_chance = 50
    
    if ranged_count > melee_count then
        -- 远程友军更多：火法球70%，冰法球30%
        fire_chance = 70
        ice_chance = 30
    elseif melee_count > ranged_count then
        -- 近战友军更多：冰法球70%，火法球30%
        fire_chance = 30
        ice_chance = 70
    else
        -- 相同：各50%
        fire_chance = 50
        ice_chance = 50
    end
    
    print("Invoker Orb Chance Calculation: Ranged=" .. ranged_count .. ", Melee=" .. melee_count .. ", Fire=" .. fire_chance .. "%, Ice=" .. ice_chance .. "%")
    
    return fire_chance, ice_chance
end

-- 获取当前法球数量
function invoker_elemental_invoke:GetCurrentOrbCount(caster)
    if not caster or caster:IsNull() then return 0 end
    
    local fire_count = 0
    local ice_count = 0
    
    -- 通过 stack count 获取法球数量
    local fire_modifier = caster:FindModifierByName("modifier_invoker_fire_orb")
    if fire_modifier then
        fire_count = fire_modifier:GetStackCount()
    end
    
    local ice_modifier = caster:FindModifierByName("modifier_invoker_ice_orb")
    if ice_modifier then
        ice_count = ice_modifier:GetStackCount()
    end
    
    return fire_count + ice_count
end

-- 获取法球组合（用于后续技能释放）
function invoker_elemental_invoke:GetOrbCombination(caster)
    if not caster or caster:IsNull() then return {fire = 0, ice = 0, total = 0} end
    
    local fire_count = 0
    local ice_count = 0
    
    -- 通过 stack count 获取法球数量
    local fire_modifier = caster:FindModifierByName("modifier_invoker_fire_orb")
    if fire_modifier then
        fire_count = fire_modifier:GetStackCount()
    end
    
    local ice_modifier = caster:FindModifierByName("modifier_invoker_ice_orb")
    if ice_modifier then
        ice_count = ice_modifier:GetStackCount()
    end
    
    return {
        fire = fire_count,
        ice = ice_count,
        total = fire_count + ice_count
    }
end

-- 根据法球组合释放技能
-- 返回 true 表示成功释放，false 表示没有满足条件的单位
function invoker_elemental_invoke:CastSpellByOrbCombination(caster, orb_combination)
    if not IsServer() then return false end
    if not caster or caster:IsNull() then return false end
    
    local fire_count = orb_combination.fire
    local ice_count = orb_combination.ice
    
    print("Invoker: Casting spell with Fire=" .. fire_count .. ", Ice=" .. ice_count)
    
    -- 赤炎炼狱（红红红）：对所有敌方单位施加持续10s的灼烧伤害
    if fire_count == 3 and ice_count == 0 then
        return self:CastInferno(caster)
    -- 轨道轰击（红红蓝）：fire_count == 2 and ice_count == 1
    elseif fire_count == 2 and ice_count == 1 then
        return self:CastOrbitalStrike(caster)
    -- 复苏之风（红蓝蓝）：fire_count == 1 and ice_count == 2
    elseif fire_count == 1 and ice_count == 2 then
        return self:CastRecoveryWind(caster)
    -- 极寒领域（蓝蓝蓝）：ice_count == 3
    elseif fire_count == 0 and ice_count == 3 then
        return self:CastArcticBlast(caster)
    end
    
    return false
end

-- 赤炎炼狱（红红红）：对所有敌方单位施加持续10s的灼烧伤害
-- 返回 true 表示成功释放，false 表示没有敌方单位
function invoker_elemental_invoke:CastInferno(caster)
    if not IsServer() then return false end
    if not caster or caster:IsNull() then return false end
    
    local duration = self:GetSpecialValueFor("flame_strike_burn_duration") or 10.0
    
    -- 查找所有敌方单位
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 过滤出活着的敌方单位
    local valid_enemies = {}
    for _, enemy in pairs(enemies) do
        if enemy and not enemy:IsNull() and enemy:IsAlive() then
            table.insert(valid_enemies, enemy)
        end
    end
    
    -- 如果没有有效的敌方单位，不释放技能
    if #valid_enemies == 0 then
        print("Invoker: Cannot cast Inferno, no enemies found")
        return false
    end
    
    -- 查找距离卡尔最近的敌方单位（用于粒子特效位置）
    local nearest_enemy = nil
    local nearest_distance = 99999
    local caster_pos = caster:GetAbsOrigin()
    
    for _, enemy in pairs(valid_enemies) do
        local distance = (enemy:GetAbsOrigin() - caster_pos):Length2D()
        if distance < nearest_distance then
            nearest_distance = distance
            nearest_enemy = enemy
        end
    end
    
    -- 在最近单位位置创建粒子特效
    if nearest_enemy then
        -- 获取目标位置，使用Vector构造函数确保是有效的Vector
        local target_origin = nearest_enemy:GetAbsOrigin()
        local target_pos = Vector(target_origin.x, target_origin.y, target_origin.z)
        
        -- 验证位置是否有效（不是0,0,0）
        if target_pos.x == 0 and target_pos.y == 0 and target_pos.z == 0 then
            target_pos = caster:GetAbsOrigin()
        end
        
        -- 调整Z轴高度，让粒子特效显示在单位上方（增加100单位高度）
        target_pos.z = target_pos.z + 100
        
        local particle = ParticleManager:CreateParticle(
            "particles/heroes/invoker/invoker_forge_spirit_death_d.vpcf",
            PATTACH_WORLDORIGIN,
            nil
        )
        if particle ~= -1 then
            -- 设置多个控制点以确保粒子特效正确显示
            ParticleManager:SetParticleControl(particle, 0, target_pos)
            ParticleManager:SetParticleControl(particle, 1, target_pos)
            ParticleManager:SetParticleControl(particle, 2, target_pos)
            ParticleManager:SetParticleControl(particle, 3, target_pos)
            ParticleManager:ReleaseParticleIndex(particle)
        end
    end
    
    -- 直接使用lina的灼烧debuff（已链接）
    -- 使用卡尔的技能作为ability，但使用lina的modifier
    for _, enemy in pairs(valid_enemies) do
        -- 直接使用lina的灼烧效果，传递duration参数
        -- 这样就能和lina产生combo，因为使用的是同一个modifier
        enemy:AddNewModifier(caster, self, "modifier_lina_flame_strike_burn", {duration = duration})
    end
    
    -- 播放音效
    EmitSoundOn("Hero_Invoker.SunStrike.Cast", caster)
    
    print("Invoker: Cast Inferno on " .. #valid_enemies .. " enemies with " .. duration .. "s burn duration")
    return true
end

-- 轨道轰击（红红蓝）：对距离自己最近的目标和以该目标为中心400距离内的其他单位造成300点物理伤害
-- 如本次技能击杀了单位则直接生成1个火法球
-- 返回 true 表示成功释放，false 表示没有敌方单位
function invoker_elemental_invoke:CastOrbitalStrike(caster)
    if not IsServer() then return false end
    if not caster or caster:IsNull() then return false end
    
    local damage = self:GetSpecialValueFor("orbital_strike_damage") or 300
    local radius = self:GetSpecialValueFor("orbital_strike_radius") or 400
    
    -- 查找所有敌方单位
    local all_enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    -- 过滤出活着的敌方单位
    local valid_enemies = {}
    for _, enemy in pairs(all_enemies) do
        if enemy and not enemy:IsNull() and enemy:IsAlive() then
            table.insert(valid_enemies, enemy)
        end
    end
    
    -- 如果没有有效的敌方单位，不释放技能
    if #valid_enemies == 0 then
        print("Invoker: Cannot cast Orbital Strike, no enemies found")
        return false
    end
    
    -- 找到距离卡尔最近的敌方单位
    local nearest_enemy = valid_enemies[1]
    local target_pos = nearest_enemy:GetAbsOrigin()
    
    -- 创建粒子特效（在最近目标位置）
    local particle = ParticleManager:CreateParticle(
        "particles/heroes/invoker/invoker_sun_strike.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    if particle then
        ParticleManager:SetParticleControl(particle, 0, target_pos)
        ParticleManager:ReleaseParticleIndex(particle)
    end
    
    -- 查找以最近目标为中心400范围内的所有敌方单位
    local targets = FindUnitsInRadius(
        caster:GetTeamNumber(),
        target_pos,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 记录击杀数量
    local kill_count = 0
    
    -- 对所有目标造成物理伤害
    for _, target in pairs(targets) do
        if target and not target:IsNull() and target:IsAlive() then
            -- 记录伤害前的生命值
            local health_before = target:GetHealth()
            
            -- 造成物理伤害
            local damage_table = {
                victim = target,
                attacker = caster,
                damage = damage,
                damage_type = DAMAGE_TYPE_PHYSICAL,
                ability = self
            }
            ApplyDamage(damage_table)
            
            -- 检查是否被击杀
            if not target:IsAlive() then
                kill_count = kill_count + 1
            end
        end
    end
    
    -- 如果击杀了单位，生成1个火法球（不管击杀几个单位都只生成1个）
    if kill_count > 0 then
        local fire_modifier = caster:FindModifierByName("modifier_invoker_fire_orb")
        if fire_modifier then
            fire_modifier:IncrementStackCount()
        else
            fire_modifier = caster:AddNewModifier(caster, self, "modifier_invoker_fire_orb", {})
            if fire_modifier then
                fire_modifier:SetStackCount(1)
            end
        end
        
        -- 更新粒子
        if fire_modifier then
            GameRules:GetGameModeEntity():SetThink(function()
                if fire_modifier and not fire_modifier:IsNull() then
                    fire_modifier:UpdateParticles()
                end
                return nil
            end, "UpdateFireOrbParticles_Orbital_" .. caster:GetEntityIndex() .. "_" .. GameRules:GetGameTime(), 0.05)
        end
        
        -- 同时增加累计属性增益（永久保留）
        local bonus_modifier = caster:FindModifierByName("modifier_invoker_fire_orb_bonus")
        if bonus_modifier then
            bonus_modifier:IncrementStackCount()
        else
            bonus_modifier = caster:AddNewModifier(caster, self, "modifier_invoker_fire_orb_bonus", {})
            if bonus_modifier then
                bonus_modifier:SetStackCount(1)
            end
        end
        
        print("Invoker: Orbital Strike killed " .. kill_count .. " units, generated 1 Fire Orb")
    end
    
    -- 播放音效
    EmitSoundOn("Hero_Invoker.SunStrike.Cast", caster)
    
    print("Invoker: Cast Orbital Strike on " .. #targets .. " targets, killed " .. kill_count .. " units")
    return true
end

-- 复苏之风（红蓝蓝）：吹出一条行进1000距离的飓风，对经过的所有敌方单位造成300点魔法伤害，对经过的所有友军恢复150点血量
-- 如本次技能击杀了单位则直接生成1个冰法球
-- 返回 true 表示成功释放，false 表示没有敌方单位
function invoker_elemental_invoke:CastRecoveryWind(caster)
    if not IsServer() then return false end
    if not caster or caster:IsNull() then return false end
    
    local distance = self:GetSpecialValueFor("recovery_wind_distance") or 1000
    local enemy_damage = self:GetSpecialValueFor("recovery_wind_enemy_damage") or 300
    local ally_heal = self:GetSpecialValueFor("recovery_wind_ally_heal") or 150
    local wind_speed = 1000  -- 飓风移动速度
    local wind_radius = 200  -- 飓风影响半径
    local check_interval = 0.1  -- 检查间隔（秒）
    
    -- 查找最近的敌方单位来确定方向
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    -- 如果没有敌方单位，不释放技能
    if #enemies == 0 then
        print("Invoker: Cannot cast Recovery Wind, no enemies found")
        return false
    end
    
    local nearest_enemy = enemies[1]
    local caster_pos = caster:GetAbsOrigin()
    local target_pos = nearest_enemy:GetAbsOrigin()
    
    -- 计算方向
    local direction_vec = target_pos - caster_pos
    direction_vec.z = 0  -- 确保是水平方向
    local direction = direction_vec:Normalized()
    
    -- 创建粒子特效（在卡尔位置）
    local particle = ParticleManager:CreateParticle(
        "particles/heroes/invoker/invoker_tornado.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    if particle then
        ParticleManager:SetParticleControl(particle, 0, caster_pos)
        -- 创建速度向量
        local velocity = Vector(direction.x * wind_speed, direction.y * wind_speed, 0)
        ParticleManager:SetParticleControl(particle, 1, velocity)
    end
    
    -- 记录已处理的单位（避免重复处理）
    local processed_units = {}
    -- 记录被伤害的敌方单位（用于检查击杀）
    local damaged_enemies = {}
    local current_pos = caster_pos
    local traveled_distance = 0
    
    -- 使用定时器模拟移动的飓风
    local function WindThink()
        if not caster or caster:IsNull() then
            -- 清理粒子特效
            if particle then
                ParticleManager:DestroyParticle(particle, false)
                ParticleManager:ReleaseParticleIndex(particle)
            end
            return nil
        end
        
        -- 更新位置
        traveled_distance = traveled_distance + wind_speed * check_interval
        if traveled_distance >= distance then
            -- 飓风到达最大距离，结束
            if particle then
                ParticleManager:DestroyParticle(particle, false)
                ParticleManager:ReleaseParticleIndex(particle)
            end
            
            -- 检查击杀（延迟一小段时间确保伤害已处理）
            GameRules:GetGameModeEntity():SetThink(function()
                local kill_count = 0
                for unit_index, enemy_data in pairs(damaged_enemies) do
                    if enemy_data.unit and not enemy_data.unit:IsNull() and not enemy_data.unit:IsAlive() then
                        kill_count = kill_count + 1
                    end
                end
                
                -- 如果击杀了单位，生成1个冰法球
                if kill_count > 0 then
                    local ice_modifier = caster:FindModifierByName("modifier_invoker_ice_orb")
                    if ice_modifier then
                        ice_modifier:IncrementStackCount()
                    else
                        ice_modifier = caster:AddNewModifier(caster, self, "modifier_invoker_ice_orb", {})
                        if ice_modifier then
                            ice_modifier:SetStackCount(1)
                        end
                    end
                    
                    -- 更新粒子
                    if ice_modifier then
                        GameRules:GetGameModeEntity():SetThink(function()
                            if ice_modifier and not ice_modifier:IsNull() then
                                ice_modifier:UpdateParticles()
                            end
                            return nil
                        end, "UpdateIceOrbParticles_Recovery_" .. caster:GetEntityIndex() .. "_" .. GameRules:GetGameTime(), 0.05)
                    end
                    
                    -- 同时增加累计属性增益（永久保留）
                    local bonus_modifier = caster:FindModifierByName("modifier_invoker_ice_orb_bonus")
                    if bonus_modifier then
                        bonus_modifier:IncrementStackCount()
                    else
                        bonus_modifier = caster:AddNewModifier(caster, self, "modifier_invoker_ice_orb_bonus", {})
                        if bonus_modifier then
                            bonus_modifier:SetStackCount(1)
                        end
                    end
                    
                    print("Invoker: Recovery Wind killed " .. kill_count .. " units, generated 1 Ice Orb")
                end
                return nil
            end, "CheckRecoveryWindKills_" .. caster:GetEntityIndex(), 0.2)
            
            return nil
        end
        
        current_pos = current_pos + direction * (wind_speed * check_interval)
        
        -- 更新粒子位置
        if particle then
            ParticleManager:SetParticleControl(particle, 0, current_pos)
        end
        
        -- 查找范围内的所有单位
        local units = FindUnitsInRadius(
            caster:GetTeamNumber(),
            current_pos,
            nil,
            wind_radius,
            DOTA_UNIT_TARGET_TEAM_BOTH,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        -- 处理范围内的单位
        for _, unit in pairs(units) do
            if unit and not unit:IsNull() and unit:IsAlive() then
                local unit_index = unit:GetEntityIndex()
                
                -- 检查是否已经处理过（每个单位只处理一次）
                if not processed_units[unit_index] then
                    processed_units[unit_index] = true
                    
                    if unit:GetTeamNumber() ~= caster:GetTeamNumber() then
                        -- 敌方单位：造成魔法伤害
                        local health_before = unit:GetHealth()
                        
                        local damage_table = {
                            victim = unit,
                            attacker = caster,
                            damage = enemy_damage,
                            damage_type = DAMAGE_TYPE_MAGICAL,
                            ability = self
                        }
                        ApplyDamage(damage_table)
                        
                        -- 记录被伤害的单位（用于后续检查击杀）
                        if not damaged_enemies[unit_index] then
                            damaged_enemies[unit_index] = {
                                unit = unit,
                                health_before = health_before
                            }
                        end
                    else
                        -- 友军单位：恢复血量
                        local current_health = unit:GetHealth()
                        local max_health = unit:GetMaxHealth()
                        local new_health = math.min(current_health + ally_heal, max_health)
                        unit:SetHealth(new_health)
                    end
                end
            end
        end
        
        return check_interval
    end
    
    -- 启动定时器
    GameRules:GetGameModeEntity():SetThink(WindThink, "RecoveryWind_" .. caster:GetEntityIndex(), check_interval)
    
    -- 播放音效
    EmitSoundOn("Hero_Invoker.Tornado.Cast", caster)
    
    print("Invoker: Cast Recovery Wind, traveling " .. distance .. " distance")
    return true
end

-- 极寒领域（蓝蓝蓝）：对所有敌方单位造成200点魔法伤害，并施加持续10s的15%的攻速降低
-- 返回 true 表示成功释放，false 表示没有敌方单位
function invoker_elemental_invoke:CastArcticBlast(caster)
    if not IsServer() then return false end
    if not caster or caster:IsNull() then return false end
    
    local damage = self:GetSpecialValueFor("arctic_blast_damage") or 200
    local attack_slow_percent = self:GetSpecialValueFor("arctic_blast_attack_slow_percent") or 15.0
    local duration = self:GetSpecialValueFor("arctic_blast_duration") or 10.0
    
    -- 查找所有敌方单位
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        9999, -- 全地图范围
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 过滤出活着的敌方单位
    local valid_enemies = {}
    for _, enemy in pairs(enemies) do
        if enemy and not enemy:IsNull() and enemy:IsAlive() then
            table.insert(valid_enemies, enemy)
        end
    end
    
    -- 如果没有有效的敌方单位，不释放技能
    if #valid_enemies == 0 then
        print("Invoker: Cannot cast Arctic Blast, no enemies found")
        return false
    end
    
    -- 查找距离卡尔最近的敌方单位（用于粒子特效位置）
    local nearest_enemy = nil
    local nearest_distance = 99999
    local caster_pos = caster:GetAbsOrigin()
    
    for _, enemy in pairs(valid_enemies) do
        local distance = (enemy:GetAbsOrigin() - caster_pos):Length2D()
        if distance < nearest_distance then
            nearest_distance = distance
            nearest_enemy = enemy
        end
    end
    
    -- 在最近敌方单位位置创建粒子特效
    if nearest_enemy then
        -- 获取目标位置，使用Vector构造函数确保是有效的Vector
        local target_origin = nearest_enemy:GetAbsOrigin()
        local target_pos = Vector(target_origin.x, target_origin.y, target_origin.z)
        
        -- 验证位置是否有效（不是0,0,0）
        if target_pos.x == 0 and target_pos.y == 0 and target_pos.z == 0 then
            target_pos = caster:GetAbsOrigin()
        end
        
        -- 调整Z轴高度，让粒子特效显示在单位上方（增加100单位高度）
        target_pos.z = target_pos.z + 100
        
        local particle = ParticleManager:CreateParticle(
            "particles/heroes/invoker/invoker_cold_snap.vpcf",
            PATTACH_WORLDORIGIN,
            nil
        )
        if particle ~= -1 then
            -- 设置多个控制点以确保粒子特效正确显示
            ParticleManager:SetParticleControl(particle, 0, target_pos)
            ParticleManager:SetParticleControl(particle, 1, target_pos)
            ParticleManager:SetParticleControl(particle, 2, target_pos)
            ParticleManager:SetParticleControl(particle, 3, target_pos)
            ParticleManager:ReleaseParticleIndex(particle)
        end
    end
    
    -- 对所有敌方单位造成伤害并施加减攻速效果
    for _, enemy in pairs(valid_enemies) do
        -- 造成魔法伤害
        local damage_table = {
            victim = enemy,
            attacker = caster,
            damage = damage,
            damage_type = DAMAGE_TYPE_MAGICAL,
            ability = self
        }
        ApplyDamage(damage_table)
        
        -- 施加减攻速效果（使用自定义modifier，包含粒子特效）
        enemy:AddNewModifier(caster, self, "modifier_invoker_arctic_blast_slow", {
            duration = duration,
            attack_slow_percent = attack_slow_percent
        })
    end
    
    -- 播放音效
    EmitSoundOn("Hero_Invoker.ColdSnap.Cast", caster)
    
    print("Invoker: Cast Arctic Blast on " .. #valid_enemies .. " enemies with " .. attack_slow_percent .. "% attack speed slow for " .. duration .. "s")
    return true
end

-- 消耗法球（清空当前法球，但保留属性增益）
function invoker_elemental_invoke:ConsumeOrbs(caster)
    if not IsServer() then return end
    if not caster or caster:IsNull() then return end
    
    -- 清空火法球（但保留累计属性增益）
    local fire_modifier = caster:FindModifierByName("modifier_invoker_fire_orb")
    if fire_modifier then
        fire_modifier:SetStackCount(0)
        -- 更新粒子（清理所有粒子）
        fire_modifier:UpdateParticles()
    end
    
    -- 清空冰法球（但保留累计属性增益）
    local ice_modifier = caster:FindModifierByName("modifier_invoker_ice_orb")
    if ice_modifier then
        ice_modifier:SetStackCount(0)
        -- 更新粒子（清理所有粒子）
        ice_modifier:UpdateParticles()
    end
    
    print("Invoker: Orbs consumed, ready for new orbs")
end

-- 火法球 Modifier
if modifier_invoker_fire_orb == nil then
    modifier_invoker_fire_orb = class({})
end

function modifier_invoker_fire_orb:IsHidden()
    return false
end

function modifier_invoker_fire_orb:IsPurgable()
    return false
end

function modifier_invoker_fire_orb:IsDebuff()
    return false
end

function modifier_invoker_fire_orb:GetTexture()
    return "invoker_exort"
end

function modifier_invoker_fire_orb:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_PREATTACK_BONUS_DAMAGE_PERCENTAGE
    }
end

function modifier_invoker_fire_orb:GetModifierPreAttack_BonusDamage_Percentage()
    -- 这个 modifier 只用于显示当前法球数量，不提供属性加成
    -- 属性加成由 modifier_invoker_fire_orb_bonus 提供
    return 0
end

function modifier_invoker_fire_orb:OnCreated(params)
    if IsServer() then
        self.parent = self:GetParent()
        self.rotation_speed = 1.0  -- 旋转速度（弧度/秒）
        self.radius = 80  -- 旋转半径
        self.base_angle = 0  -- 基础旋转角度
        self.particles = {}  -- 存储所有粒子的索引
        
        -- 启动定时器更新位置
        self:StartIntervalThink(0.03)  -- 每0.03秒更新一次位置
        
        -- 延迟创建粒子，确保 stack count 已更新
        GameRules:GetGameModeEntity():SetThink(function()
            if self and not self:IsNull() then
                self:UpdateParticles()
            end
            return nil
        end, "UpdateFireOrbParticles_Stack_" .. self.parent:GetEntityIndex() .. "_" .. GameRules:GetGameTime(), 0.1)
    end
end

function modifier_invoker_fire_orb:OnRefresh(params)
    if IsServer() then
        -- Stack count 改变时更新粒子数量
        self:UpdateParticles()
    end
end

function modifier_invoker_fire_orb:OnDestroy()
    if IsServer() then
        -- 销毁所有粒子
        for _, particle_index in pairs(self.particles) do
            if particle_index then
                ParticleManager:DestroyParticle(particle_index, false)
                ParticleManager:ReleaseParticleIndex(particle_index)
            end
        end
        self.particles = {}
    end
end

function modifier_invoker_fire_orb:OnIntervalThink()
    if IsServer() then
        if not self.parent or self.parent:IsNull() or not self.parent:IsAlive() then
            return
        end
        
        -- 更新基础旋转角度
        self.base_angle = self.base_angle + self.rotation_speed * 0.03
        
        -- 更新所有粒子的位置
        self:UpdateParticlePositions()
    end
end

function modifier_invoker_fire_orb:UpdateParticles()
    if not IsServer() then return end
    if not self.parent or self.parent:IsNull() then return end
    
    local stack_count = self:GetStackCount()
    
    -- 如果 stack count 为 0，清理所有粒子
    if stack_count <= 0 then
        for _, particle_index in pairs(self.particles) do
            if particle_index then
                ParticleManager:DestroyParticle(particle_index, false)
                ParticleManager:ReleaseParticleIndex(particle_index)
            end
        end
        self.particles = {}
        return
    end
    
    -- 如果粒子数量与 stack count 不匹配，重新创建
    local current_particle_count = #self.particles
    if current_particle_count ~= stack_count then
        -- 销毁所有现有粒子
        for _, particle_index in pairs(self.particles) do
            if particle_index then
                ParticleManager:DestroyParticle(particle_index, false)
                ParticleManager:ReleaseParticleIndex(particle_index)
            end
        end
        self.particles = {}
        
        -- 创建新粒子
        for i = 1, stack_count do
            local particle_index = ParticleManager:CreateParticle(
                "particles/heroes/invoker/invoker_kid_exort_orb.vpcf",
                PATTACH_WORLDORIGIN,
                nil
            )
            if particle_index then
                table.insert(self.particles, particle_index)
            end
        end
    end
    
    -- 更新所有粒子位置
    self:UpdateParticlePositions()
end

function modifier_invoker_fire_orb:UpdateParticlePositions()
    if not IsServer() then return end
    if not self.parent or self.parent:IsNull() then return end
    
    local stack_count = self:GetStackCount()
    if stack_count <= 0 then
        return
    end
    
    local parent_pos = self.parent:GetAbsOrigin()
    
    -- 为每个法球计算位置
    for i = 1, math.min(stack_count, #self.particles) do
        -- 计算每个法球的初始角度（均匀分布）
        local angle_offset = (i - 1) * (2 * math.pi / stack_count)
        local current_angle = self.base_angle + angle_offset
        
        -- 计算法球位置
        local offset_x = math.cos(current_angle) * self.radius
        local offset_y = math.sin(current_angle) * self.radius
        local orb_pos = parent_pos + Vector(offset_x, offset_y, 100)  -- Z轴高度100
        
        -- 更新粒子位置
        if self.particles[i] then
            ParticleManager:SetParticleControl(self.particles[i], 0, orb_pos)
            ParticleManager:SetParticleControl(self.particles[i], 1, orb_pos)
        end
    end
end

-- 冰法球 Modifier
if modifier_invoker_ice_orb == nil then
    modifier_invoker_ice_orb = class({})
end

function modifier_invoker_ice_orb:IsHidden()
    return false
end

function modifier_invoker_ice_orb:IsPurgable()
    return false
end

function modifier_invoker_ice_orb:IsDebuff()
    return false
end

function modifier_invoker_ice_orb:GetTexture()
    return "invoker_quas"
end

function modifier_invoker_ice_orb:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_MANA_REGEN_CONSTANT
    }
end

function modifier_invoker_ice_orb:GetModifierConstantManaRegen()
    -- 这个 modifier 只用于显示当前法球数量，不提供属性加成
    -- 属性加成由 modifier_invoker_ice_orb_bonus 提供
    return 0
end

function modifier_invoker_ice_orb:OnCreated(params)
    if IsServer() then
        self.parent = self:GetParent()
        self.rotation_speed = 1.0  -- 旋转速度（弧度/秒）
        self.radius = 80  -- 旋转半径
        self.base_angle = 0  -- 基础旋转角度
        self.particles = {}  -- 存储所有粒子的索引
        
        -- 启动定时器更新位置
        self:StartIntervalThink(0.03)  -- 每0.03秒更新一次位置
        
        -- 延迟创建粒子，确保 stack count 已更新
        GameRules:GetGameModeEntity():SetThink(function()
            if self and not self:IsNull() then
                self:UpdateParticles()
            end
            return nil
        end, "UpdateIceOrbParticles_Stack_" .. self.parent:GetEntityIndex() .. "_" .. GameRules:GetGameTime(), 0.1)
    end
end

function modifier_invoker_ice_orb:OnRefresh(params)
    if IsServer() then
        -- Stack count 改变时更新粒子数量
        self:UpdateParticles()
    end
end

function modifier_invoker_ice_orb:OnDestroy()
    if IsServer() then
        -- 销毁所有粒子
        for _, particle_index in pairs(self.particles) do
            if particle_index then
                ParticleManager:DestroyParticle(particle_index, false)
                ParticleManager:ReleaseParticleIndex(particle_index)
            end
        end
        self.particles = {}
    end
end

function modifier_invoker_ice_orb:OnIntervalThink()
    if IsServer() then
        if not self.parent or self.parent:IsNull() or not self.parent:IsAlive() then
            return
        end
        
        -- 更新基础旋转角度
        self.base_angle = self.base_angle + self.rotation_speed * 0.03
        
        -- 更新所有粒子的位置
        self:UpdateParticlePositions()
    end
end

function modifier_invoker_ice_orb:UpdateParticles()
    if not IsServer() then return end
    if not self.parent or self.parent:IsNull() then return end
    
    local stack_count = self:GetStackCount()
    
    -- 如果 stack count 为 0，清理所有粒子
    if stack_count <= 0 then
        for _, particle_index in pairs(self.particles) do
            if particle_index then
                ParticleManager:DestroyParticle(particle_index, false)
                ParticleManager:ReleaseParticleIndex(particle_index)
            end
        end
        self.particles = {}
        return
    end
    
    -- 如果粒子数量与 stack count 不匹配，重新创建
    local current_particle_count = #self.particles
    if current_particle_count ~= stack_count then
        -- 销毁所有现有粒子
        for _, particle_index in pairs(self.particles) do
            if particle_index then
                ParticleManager:DestroyParticle(particle_index, false)
                ParticleManager:ReleaseParticleIndex(particle_index)
            end
        end
        self.particles = {}
        
        -- 创建新粒子
        for i = 1, stack_count do
            local particle_index = ParticleManager:CreateParticle(
                "particles/heroes/invoker/invoker_kid_quas_orb.vpcf",
                PATTACH_WORLDORIGIN,
                nil
            )
            if particle_index then
                table.insert(self.particles, particle_index)
            end
        end
    end
    
    -- 更新所有粒子位置
    self:UpdateParticlePositions()
end

function modifier_invoker_ice_orb:UpdateParticlePositions()
    if not IsServer() then return end
    if not self.parent or self.parent:IsNull() then return end
    
    local stack_count = self:GetStackCount()
    if stack_count <= 0 then
        return
    end
    
    local parent_pos = self.parent:GetAbsOrigin()
    
    -- 为每个法球计算位置
    for i = 1, math.min(stack_count, #self.particles) do
        -- 计算每个法球的初始角度（均匀分布）
        local angle_offset = (i - 1) * (2 * math.pi / stack_count)
        local current_angle = self.base_angle + angle_offset
        
        -- 计算法球位置
        local offset_x = math.cos(current_angle) * self.radius
        local offset_y = math.sin(current_angle) * self.radius
        local orb_pos = parent_pos + Vector(offset_x, offset_y, 100)  -- Z轴高度100
        
        -- 更新粒子位置
        if self.particles[i] then
            ParticleManager:SetParticleControl(self.particles[i], 0, orb_pos)
            ParticleManager:SetParticleControl(self.particles[i], 1, orb_pos)
        end
    end
end

-- 火法球累计属性增益 Modifier（永久保留）
if modifier_invoker_fire_orb_bonus == nil then
    modifier_invoker_fire_orb_bonus = class({})
end

function modifier_invoker_fire_orb_bonus:IsHidden()
    return false
end

function modifier_invoker_fire_orb_bonus:IsPurgable()
    return false
end

function modifier_invoker_fire_orb_bonus:IsDebuff()
    return false
end

function modifier_invoker_fire_orb_bonus:GetTexture()
    return "invoker_exort"
end

function modifier_invoker_fire_orb_bonus:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_BASEATTACK_BONUSDAMAGE
    }
end

function modifier_invoker_fire_orb_bonus:GetModifierBaseAttack_BonusDamage()
    local ability = self:GetAbility()
    if not ability or ability:IsNull() then return 0 end
    
    -- 使用定值攻击力加成（每个法球提供5点攻击力）
    local attack_bonus_flat = ability:GetSpecialValueFor("fire_orb_attack_bonus_flat") or 5.0
    local stack_count = self:GetStackCount()
    if stack_count <= 0 then
        stack_count = 1
    end
    
    -- 每个法球提供定值攻击力加成，根据累计的stack count计算总加成
    return attack_bonus_flat * stack_count
end

-- 冰法球累计属性增益 Modifier（永久保留）
if modifier_invoker_ice_orb_bonus == nil then
    modifier_invoker_ice_orb_bonus = class({})
end

function modifier_invoker_ice_orb_bonus:IsHidden()
    return false
end

function modifier_invoker_ice_orb_bonus:IsPurgable()
    return false
end

function modifier_invoker_ice_orb_bonus:IsDebuff()
    return false
end

function modifier_invoker_ice_orb_bonus:GetTexture()
    return "invoker_quas"
end

function modifier_invoker_ice_orb_bonus:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_MANA_REGEN_CONSTANT
    }
end

function modifier_invoker_ice_orb_bonus:GetModifierConstantManaRegen()
    local ability = self:GetAbility()
    if not ability or ability:IsNull() then return 0 end
    
    local mana_regen = ability:GetSpecialValueFor("ice_orb_mana_regen") or 1.0
    local stack_count = self:GetStackCount()
    if stack_count <= 0 then
        stack_count = 1
    end
    
    -- 每个法球提供1/s魔法恢复，根据累计的stack count计算总恢复速度
    return mana_regen * stack_count
end

-- 极寒领域减攻速 Modifier
if modifier_invoker_arctic_blast_slow == nil then
    modifier_invoker_arctic_blast_slow = class({})
end

function modifier_invoker_arctic_blast_slow:IsHidden()
    return false
end

function modifier_invoker_arctic_blast_slow:IsDebuff()
    return true
end

function modifier_invoker_arctic_blast_slow:IsPurgable()
    return true
end

function modifier_invoker_arctic_blast_slow:OnCreated(params)
    if not IsServer() then return end
    
    -- 从参数或技能配置获取减攻速百分比
    self.attack_slow_percent = params.attack_slow_percent or self:GetAbility():GetSpecialValueFor("arctic_blast_attack_slow_percent") or 15.0
    
    -- 设置持续时间
    if params.duration then
        self:SetDuration(params.duration, true)
    end
end

function modifier_invoker_arctic_blast_slow:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_ATTACKSPEED_BONUS_CONSTANT
    }
end

function modifier_invoker_arctic_blast_slow:GetModifierAttackSpeedBonus_Constant()
    if not self.attack_slow_percent then
        return 0
    end
    -- 返回负值表示减攻速
    return -self.attack_slow_percent
end

function modifier_invoker_arctic_blast_slow:GetEffectName()
    -- 使用Ursa地震的减攻速粒子特效
    return "particles/generic_gameplay/generic_slowed_cold.vpcf"
end

function modifier_invoker_arctic_blast_slow:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

function modifier_invoker_arctic_blast_slow:GetTexture()
    return "invoker_quas"
end

