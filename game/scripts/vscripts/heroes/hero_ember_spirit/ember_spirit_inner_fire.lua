-- ember_spirit_inner_Fire.lua
-- 基于Dota2原版huskar_inner_fire技能实现
-- 效果：消耗魔法值，对周围敌人造成魔法伤害
-- 连携效果：如果目标身上有lina_light_strike_array_burn debuff，则立即结算剩余伤害并移除debuff

ember_spirit_inner_Fire = class({})


-- 自走棋式自动施法功能 (复制Ursa的成功实现)
function ember_spirit_inner_Fire:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return
            end
            
            -- 移除冷却时间限制，实现真正的0CD
            local current_time = GameRules:GetGameTime()
            -- if current_time - self.last_cast_time < 1.0 then
            --     return 0.1
            -- end
            
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local has_enemies = self:HasEnemiesInRange()
                if has_enemies then
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

function ember_spirit_inner_Fire:HasEnemiesInRange()
    local caster = self:GetCaster()
    local radius = self:GetSpecialValueFor("radius")
    
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
    
    return #enemies > 0
end

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
    
    
    -- 对每个敌人造成伤害和效果
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and not enemy:IsNull() and enemy:IsAlive() then
            -- 检查目标是否有lina_flame_strike_burn debuff
            local burn_modifier = enemy:FindModifierByName("modifier_lina_flame_strike_burn")
            
            if burn_modifier then
                -- 计算剩余时间内可以造成的灼烧伤害
                local remaining_time = burn_modifier:GetRemainingTime()
                local burn_damage_percent = 1.0 -- 每秒造成目标最大生命值的1%
                local burn_interval = 1.0 -- 每秒触发一次
                local max_health = enemy:GetMaxHealth()
                
                -- 计算剩余时间内可以造成的总灼烧伤害
                local remaining_ticks = math.ceil(remaining_time / burn_interval)
                local total_burn_damage = remaining_ticks * (max_health * burn_damage_percent / 100.0)
                
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
        end
    end
    
    -- 强制重置单位状态，确保能继续攻击
    caster:Stop()
    caster:MoveToPosition(caster:GetAbsOrigin())
end
