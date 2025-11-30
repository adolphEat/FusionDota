-- Zeus Thundergod's Wrath - Auto-Cast/Passive Hybrid Skill
-- Auto-Cast: When mana is full, automatically cast Thundergod's Wrath on all enemies
-- Passive: Resistance reduction on damage, kill-triggered Arc Lightning

LinkLuaModifier("modifier_zeus_resistance_reduction", "heroes/hero_zeus/zeus_Thundergods_Wrath.lua", LUA_MODIFIER_MOTION_NONE)
LinkLuaModifier("modifier_zeus_resistance_reduction_debuff", "heroes/hero_zeus/zeus_Thundergods_Wrath.lua", LUA_MODIFIER_MOTION_NONE)

zeus_Thundergods_Wrath = class({})

function zeus_Thundergods_Wrath:GetIntrinsicModifierName()
    return "modifier_zeus_resistance_reduction"
end

function zeus_Thundergods_Wrath:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0
        
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return nil -- Stop the timer
            end
            
            local current_time = GameRules:GetGameTime()
            
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                    self:CastThundergodsWrath()
                    self.last_cast_time = current_time
                end
            end
            return 0.1
        end
        
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

-- Cast Thundergod's Wrath on all enemies
function zeus_Thundergods_Wrath:CastThundergodsWrath()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local damage = self:GetSpecialValueFor("thundergods_wrath_damage")
    local range = self:GetSpecialValueFor("thundergods_wrath_range")
    
    -- Find all enemies
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    if #enemies == 0 then
        return
    end
    
    -- Clear mana to prevent continuous casting
    caster:SetMana(0)
    
    -- Play sound
    EmitSoundOn("Hero_Zeus.ThundergodsWrath", caster)
    
    -- Damage all enemies and create target particle effects
    for _, enemy in pairs(enemies) do
        if IsValidEntity(enemy) and enemy:IsAlive() then
            -- Create particle effect on each enemy - Thundergod's Wrath
            local enemy_particle = ParticleManager:CreateParticle(
                "particles/heroes/zeus/zuus_thundergods_wrath.vpcf",
                PATTACH_ABSORIGIN,
                enemy
            )
            ParticleManager:SetParticleControl(enemy_particle, 0, enemy:GetAbsOrigin())
            ParticleManager:SetParticleControl(enemy_particle, 1, enemy:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(enemy_particle)
            
            -- Create start particle effect on each enemy
            local start_particle = ParticleManager:CreateParticle(
                "particles/heroes/zeus/zuus_thundergods_wrath_start.vpcf",
                PATTACH_ABSORIGIN,
                enemy
            )
            ParticleManager:SetParticleControl(start_particle, 0, enemy:GetAbsOrigin())
            ParticleManager:SetParticleControl(start_particle, 1, enemy:GetAbsOrigin())
            ParticleManager:ReleaseParticleIndex(start_particle)
            
            self:DealDamageToTarget(enemy, damage, DAMAGE_TYPE_PURE)
        end
    end
end

-- Trigger Arc Lightning when a unit is killed
function zeus_Thundergods_Wrath:TriggerArcLightningOnKill(killed_unit)
    if not IsServer() then return end
    
    local range = self:GetSpecialValueFor("arc_lightning_range")
    
    -- Find nearest enemy to the killed unit
    local enemies = FindUnitsInRadius(
        self:GetCaster():GetTeamNumber(),
        killed_unit:GetAbsOrigin(),
        nil,
        range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #enemies > 0 then
        self:CastArcLightning(enemies[1])
    end
end

-- Cast Arc Lightning with bouncing effect (with delays like Dota 2 original)
function zeus_Thundergods_Wrath:CastArcLightning(target)
    if not IsServer() then return end
    
    local damage = self:GetSpecialValueFor("arc_lightning_damage")
    local bounces = self:GetSpecialValueFor("arc_lightning_bounces")
    local range = self:GetSpecialValueFor("arc_lightning_range")
    
    local hit_units = {}
    local current_target = target
    local bounce_count = 0
    
    -- Play sound
    EmitSoundOn("Hero_Zeus.ArcLightning.Cast", self:GetCaster())
    
    -- Start the chain with a delay
    self:ArcLightningChain(current_target, hit_units, bounce_count, bounces, damage, range)
end

-- Recursive function to handle Arc Lightning chain with delays
function zeus_Thundergods_Wrath:ArcLightningChain(current_target, hit_units, bounce_count, max_bounces, damage, range, previous_target)
    if not IsServer() then return end
    
    if not current_target or bounce_count >= max_bounces then
        return
    end
    
    if not IsValidEntity(current_target) or not current_target:IsAlive() then
        return
    end
    
    -- Add to hit list (for this specific chain only)
    table.insert(hit_units, current_target)
    
    -- Get start and end positions
    local start_pos = previous_target and previous_target:GetAbsOrigin() or current_target:GetAbsOrigin()
    local end_pos = current_target:GetAbsOrigin()
    
    -- Create particle effect that moves from start to end
    local particle = ParticleManager:CreateParticle(
        "particles/heroes/zeus/zuus_arc_lightning.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    ParticleManager:SetParticleControl(particle, 0, start_pos)  -- Start position
    ParticleManager:SetParticleControl(particle, 1, end_pos)    -- End position (target)
    
    -- Calculate distance for travel time
    local distance = (end_pos - start_pos):Length2D()
    local travel_time = math.max(0.3, distance / 700)  -- Approximate travel time based on distance
    
    -- Create a timer to deal damage when lightning reaches target
    GameRules:GetGameModeEntity():SetThink(function()
        if IsValidEntity(current_target) and current_target:IsAlive() then
            self:DealDamageToTarget(current_target, damage, DAMAGE_TYPE_MAGICAL)
        end
        ParticleManager:ReleaseParticleIndex(particle)
        return nil
    end, "ArcLightningDamage_" .. self:GetCaster():GetEntityIndex() .. "_" .. bounce_count .. "_" .. GameRules:GetGameTime(), travel_time)
    
    -- Find next target for bouncing (regardless of whether current target was killed)
    local next_enemies = FindUnitsInRadius(
        self:GetCaster():GetTeamNumber(),
        current_target:GetAbsOrigin(),
        nil,
        range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    -- Find next target that hasn't been hit in this specific chain
    local next_target = nil
    for _, enemy in pairs(next_enemies) do
        local already_hit = false
        for _, hit_unit in pairs(hit_units) do
            if enemy == hit_unit then
                already_hit = true
                break
            end
        end
        if not already_hit then
            next_target = enemy
            break
        end
    end
    
    -- Continue chain with delay (travel_time + 0.5 seconds between bounces)
    if next_target then
        GameRules:GetGameModeEntity():SetThink(function()
            self:ArcLightningChain(next_target, hit_units, bounce_count + 1, max_bounces, damage, range, current_target)
            return nil
        end, "ArcLightningChain_" .. self:GetCaster():GetEntityIndex() .. "_" .. bounce_count .. "_" .. GameRules:GetGameTime(), travel_time + 0.5)
    end
end

-- Deal damage to target (all effects handled by event listeners)
function zeus_Thundergods_Wrath:DealDamageToTarget(target, damage, damage_type)
    if not IsServer() then return end
    
    -- Deal damage
    local damage_table = {
        victim = target,
        attacker = self:GetCaster(),
        damage = damage,
        damage_type = damage_type,
        ability = self
    }
    ApplyDamage(damage_table)
end

-- Passive modifier that handles:
-- 1. Resistance reduction when Zeus deals damage
-- 2. Arc Lightning chain when Zeus kills enemies
modifier_zeus_resistance_reduction = class({})

function modifier_zeus_resistance_reduction:IsHidden()
    return false
end

function modifier_zeus_resistance_reduction:IsPurgable()
    return false
end

function modifier_zeus_resistance_reduction:IsDebuff()
    return false
end

function modifier_zeus_resistance_reduction:OnCreated()
    if not IsServer() then return end
    
    self.caster = self:GetCaster()
    self.ability = self:GetAbility()
end

function modifier_zeus_resistance_reduction:DeclareFunctions()
    return {
        MODIFIER_EVENT_ON_TAKEDAMAGE,  -- For resistance reduction
        MODIFIER_EVENT_ON_DEATH        -- For Arc Lightning trigger
    }
end

-- Handle unit death events for Arc Lightning (Passive Effect)
function modifier_zeus_resistance_reduction:OnDeath(event)
    if not IsServer() then return end
    
    local killed_unit = event.unit
    local attacker = event.attacker
    
    -- Check if Zeus killed an enemy (any type of damage)
    if attacker == self.caster and killed_unit:GetTeamNumber() ~= self.caster:GetTeamNumber() then
        self.ability:TriggerArcLightningOnKill(killed_unit)
    end
end

-- Handle damage events for resistance reduction (Passive Effect)
function modifier_zeus_resistance_reduction:OnTakeDamage(event)
    if not IsServer() then return end
    
    local victim = event.unit
    local attacker = event.attacker
    
    -- Check if Zeus dealt damage to an enemy
    if attacker == self.caster and victim:GetTeamNumber() ~= self.caster:GetTeamNumber() then
        -- Apply resistance reduction modifier
        victim:AddNewModifier(self.caster, self.ability, "modifier_zeus_resistance_reduction_debuff", {})
    end
end

-- Resistance reduction debuff modifier
modifier_zeus_resistance_reduction_debuff = class({})

function modifier_zeus_resistance_reduction_debuff:IsHidden()
    return false
end

function modifier_zeus_resistance_reduction_debuff:IsPurgable()
    return true
end

function modifier_zeus_resistance_reduction_debuff:IsDebuff()
    return true
end

function modifier_zeus_resistance_reduction_debuff:OnCreated()
    if not IsServer() then return end
    
    local ability = self:GetAbility()
    local duration = ability:GetSpecialValueFor("resistance_reduction_duration")
    
    self:SetStackCount(1)
    self:SetDuration(duration, true) -- 持续时间从KV文件读取，叠加时刷新持续时间
    
    -- Debug: Print when modifier is applied
    print("Zeus resistance reduction modifier applied to: " .. self:GetParent():GetUnitName() .. " for " .. duration .. " seconds")
end

function modifier_zeus_resistance_reduction_debuff:OnRefresh()
    if not IsServer() then return end
    
    local ability = self:GetAbility()
    local duration = ability:GetSpecialValueFor("resistance_reduction_duration")
    
    self:IncrementStackCount()
    self:SetDuration(duration, true) -- 叠加时刷新持续时间，从KV文件读取
    
    -- Debug: Print when modifier is refreshed
    print("Zeus resistance reduction modifier refreshed, stacks: " .. self:GetStackCount() .. " for " .. duration .. " seconds")
end

function modifier_zeus_resistance_reduction_debuff:DeclareFunctions()
    return {
        MODIFIER_PROPERTY_PHYSICAL_ARMOR_BONUS,
        MODIFIER_PROPERTY_MAGICAL_RESISTANCE_BONUS
    }
end

function modifier_zeus_resistance_reduction_debuff:GetModifierPhysicalArmorBonus()
    local ability = self:GetAbility()
    local armor_reduction = ability:GetSpecialValueFor("resistance_reduction_armor")
    local stack_count = self:GetStackCount()
    
    -- 每次叠加减少固定值护甲，可无限叠加，可为负值
    return -armor_reduction * stack_count
end

function modifier_zeus_resistance_reduction_debuff:GetModifierMagicalResistanceBonus()
    local ability = self:GetAbility()
    local magic_reduction = ability:GetSpecialValueFor("resistance_reduction_magic")
    local stack_count = self:GetStackCount()
    
    -- 每次叠加减少固定值魔法抗性，可无限叠加，可为负值
    return -magic_reduction * stack_count
end

function modifier_zeus_resistance_reduction_debuff:GetTexture()
    return "zeus_thundergods_wrath"
end