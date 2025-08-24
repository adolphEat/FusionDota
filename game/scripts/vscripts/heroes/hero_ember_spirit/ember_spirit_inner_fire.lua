-- ember_spirit_inner_Fire.lua
-- 基于Dota2原版huskar_inner_fire技能实现
-- 效果：消耗魔法值，对周围敌人造成魔法伤害
-- 连携效果：如果目标身上有lina_light_strike_array_burn debuff，则立即结算剩余伤害并移除debuff

ember_spirit_inner_Fire = class({})

function ember_spirit_inner_Fire:OnSpellStart()
    local caster = self:GetCaster()
    local ability = self
    
    if not caster or not ability then
        return
    end
    
    -- 获取技能参数
    local damage = ability:GetSpecialValueFor("damage")
    local radius = ability:GetSpecialValueFor("radius")
    
    -- 播放施法音效
    EmitSoundOn("Hero_Huskar.Inner_Vitality", caster)
    
    -- 创建粒子特效
    local particle = ParticleManager:CreateParticle(
        "particles/heroes/ember_spirit/huskar_inner_fire.vpcf",
        PATTACH_ABSORIGIN_FOLLOW,
        caster
    )
    
    if particle then
        ParticleManager:SetParticleControl(particle, 0, caster:GetAbsOrigin())
        ParticleManager:SetParticleControl(particle, 1, Vector(radius, 0, 0))
        ParticleManager:ReleaseParticleIndex(particle)
    end
    
    -- 查找范围内的敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    print("=== ember_spirit_inner_Fire executed ===")
    print("Caster:", caster:GetUnitName())
    print("Damage:", damage)
    print("Radius:", radius)
    print("Enemies found:", #enemies)
    
    -- 对每个敌人造成伤害和效果
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and not enemy:IsNull() and enemy:IsAlive() then
            print("Processing enemy:", enemy:GetUnitName())
            
            -- 检查目标是否有lina_light_strike_array_burn debuff
            local burn_modifier = enemy:FindModifierByName("modifier_lina_light_strike_array_burn")
            
            if burn_modifier then
                -- 计算剩余时间内可以造成的灼烧伤害
                local remaining_time = burn_modifier:GetRemainingTime()
                local burn_damage_percent = 1.0 -- 每秒造成目标最大生命值的1%
                local burn_interval = 1.0 -- 每秒触发一次
                local max_health = enemy:GetMaxHealth()
                
                -- 计算剩余时间内可以造成的总灼烧伤害
                local remaining_ticks = math.ceil(remaining_time / burn_interval)
                local total_burn_damage = remaining_ticks * (max_health * burn_damage_percent / 100.0)
                
                print("=== Burn debuff synergy triggered ===")
                print("Target:", enemy:GetUnitName())
                print("Remaining burn time:", remaining_time)
                print("Remaining ticks:", remaining_ticks)
                print("Total burn damage to trigger:", total_burn_damage)
                
                -- 移除burn debuff
                burn_modifier:Destroy()
                
                -- 立即造成剩余时间内可以造成的灼烧伤害
                local burn_damage_table = {
                    victim = enemy,
                    attacker = caster,
                    damage = total_burn_damage,
                    damage_type = DAMAGE_TYPE_MAGICAL,
                    ability = ability
                }
                ApplyDamage(burn_damage_table)
                
                print("Applied instant burn damage to", enemy:GetUnitName(), "- Damage:", total_burn_damage)
                
                -- 播放特殊的连携特效音效
                EmitSoundOn("Hero_Lina.LightStrikeArray.Target", enemy)
            end
            
            -- 造成技能本身的魔法伤害
            local damage_table = {
                victim = enemy,
                attacker = caster,
                damage = damage,
                damage_type = DAMAGE_TYPE_MAGICAL,
                ability = ability
            }
            ApplyDamage(damage_table)
            
            print("Applied skill damage to", enemy:GetUnitName(), "- Damage:", damage)
        end
    end
end
