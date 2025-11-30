-- living_bomb.lua
-- 全局技能：活体炸弹
-- 效果：所有己方和敌方单位死亡时会对周围200范围内的所有单位造成200点魔法伤害

LinkLuaModifier("modifier_living_bomb", "heroes/universal/living_bomb", LUA_MODIFIER_MOTION_NONE)

-- 全局死亡监听器
LivingBombListener = LivingBombListener or {
    listeners = {},
    processed_deaths = {},
    ability = nil,
    explosion_damage = 0,
    explosion_radius = 0
}

-- 全局函数：处理死亡事件
function LivingBombListener:OnDeath(dead_unit)
    if not IsServer() then return end
    
    -- 检查死亡单位是否有效
    if not IsValidEntity(dead_unit) then
        return
    end
    
    -- 获取死亡单位的唯一标识符（entity index）
    local dead_unit_index = dead_unit:GetEntityIndex()
    
    -- 检查是否已经处理过这个单位的死亡事件
    if self.processed_deaths[dead_unit_index] then
        return
    end
    
    -- 标记为已处理
    self.processed_deaths[dead_unit_index] = true
    
    -- 延迟0.01秒后触发爆炸，确保死亡事件完全处理
    GameRules:GetGameModeEntity():SetThink(function()
        LivingBombListener:TriggerExplosion(dead_unit)
        return nil
    end, "LivingBombExplosion_" .. dead_unit_index, 0.01)
end

-- 全局函数：触发爆炸效果
function LivingBombListener:TriggerExplosion(dead_unit)
    if not IsServer() then return end
    
    local ability = self.ability
    if not ability then return end
    
    local explosion_damage = self.explosion_damage
    local explosion_radius = self.explosion_radius
    local explosion_pos = dead_unit:GetAbsOrigin()
    
    -- 播放爆炸音效
    EmitSoundOn("Hero_Techies.Suicide", dead_unit)
    
    -- 创建爆炸粒子效果
    local explosion_particle = ParticleManager:CreateParticle(
        "particles/units/heroes/hero_techies/techies_suicide.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    ParticleManager:SetParticleControl(explosion_particle, 0, explosion_pos)
    ParticleManager:SetParticleControl(explosion_particle, 1, Vector(explosion_radius, 0, 0))
    ParticleManager:ReleaseParticleIndex(explosion_particle)
    
    -- 查找爆炸范围内的所有单位
    local units_in_radius = FindUnitsInRadius(
        DOTA_TEAM_GOODGUYS,  -- 使用任意有效的队伍编号，搜索范围由target_team控制
        explosion_pos,
        nil,
        explosion_radius,
        DOTA_UNIT_TARGET_TEAM_BOTH,  -- 对己方和敌方都造成伤害
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 对范围内的所有单位造成伤害
    for _, unit in pairs(units_in_radius) do
        if IsValidEntity(unit) and unit:IsAlive() then
            -- Debug: 打印目标单位信息
            print("Living Bomb target: " .. unit:GetUnitName() .. " team: " .. unit:GetTeamNumber() .. " alive: " .. tostring(unit:IsAlive()))
            
            -- 创建伤害表
            local damage_table = {
                victim = unit,
                attacker = ability:GetCaster(),  -- 使用技能拥有者作为攻击者
                damage = explosion_damage,
                damage_type = DAMAGE_TYPE_MAGICAL,
                ability = ability
            }
            
            -- 应用伤害
            ApplyDamage(damage_table)
            
            -- 显示伤害数字
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_DAMAGE, unit, explosion_damage, nil)
        end
    end
    
    -- Debug信息
    print("Living Bomb explosion triggered by: " .. dead_unit:GetUnitName() .. " at position: " .. tostring(explosion_pos))
    print("Units affected: " .. #units_in_radius)
end

living_bomb = class({})

function living_bomb:GetIntrinsicModifierName()
    return "modifier_living_bomb"
end

modifier_living_bomb = class({})

function modifier_living_bomb:IsHidden()
    return true
end

function modifier_living_bomb:IsPurgable()
    return false
end

function modifier_living_bomb:IsDebuff()
    return false
end

function modifier_living_bomb:OnCreated()
    if not IsServer() then return end
    
    self.ability = self:GetAbility()
    if not self.ability then return end
    
    self.explosion_damage = self.ability:GetSpecialValueFor("explosion_damage")
    self.explosion_radius = self.ability:GetSpecialValueFor("explosion_radius")
    
    -- 更新全局监听器的参数
    LivingBombListener.ability = self.ability
    LivingBombListener.explosion_damage = self.explosion_damage
    LivingBombListener.explosion_radius = self.explosion_radius
    
    -- 添加到监听器列表
    table.insert(LivingBombListener.listeners, self)
    
    -- 注册全局死亡监听器（只注册一次）
    if not LivingBombListener.is_listening then
        LivingBombListener.is_listening = true
        
        ListenToGameEvent("entity_killed", function(keys)
            local killed_unit = EntIndexToHScript(keys.entindex_killed)
            if killed_unit and IsValidEntity(killed_unit) then
                LivingBombListener:OnDeath(killed_unit)
            end
        end, nil)
        
        print("Living Bomb listener registered")
    end
end

function modifier_living_bomb:OnDestroy()
    if not IsServer() then return end
    
    -- 从监听器列表中移除
    for i, listener in ipairs(LivingBombListener.listeners or {}) do
        if listener == self then
            table.remove(LivingBombListener.listeners, i)
            break
        end
    end
end
