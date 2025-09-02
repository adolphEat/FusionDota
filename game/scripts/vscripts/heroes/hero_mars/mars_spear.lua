mars_spear = class({})

LinkLuaModifier("modifier_mars_spear_stun", "heroes/hero_mars/mars_spear.lua", LUA_MODIFIER_MOTION_NONE)

function mars_spear:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local point = self:GetCursorPosition()
    
    -- 获取技能参数
    local spear_range = self:GetSpecialValueFor("spear_range")
    local spear_width = self:GetSpecialValueFor("spear_width")
    local spear_speed = self:GetSpecialValueFor("spear_speed")
    local damage = self:GetSpecialValueFor("damage")
    local chain_damage = self:GetSpecialValueFor("chain_damage")
    local chain_stun_duration = self:GetSpecialValueFor("chain_stun_duration")
    
    print("Mars Spear parameters - Damage:", damage, "Chain damage:", chain_damage, "Chain stun duration:", chain_stun_duration)
    print("Skill level:", self:GetLevel(), "Caster:", caster:GetUnitName())
    print("Ability name:", self:GetAbilityName())
    print("Max level:", self:GetMaxLevel())
    
    -- 创建投射物
    local direction = (point - caster:GetAbsOrigin()):Normalized()
    local start_pos = caster:GetAbsOrigin() + direction * 100
    
    -- 使用Windrunner的投射物格式
    local projectile_info = {
        Ability = self,
        EffectName = "particles/heroes/mars/mars_spear.vpcf",
        vSpawnOrigin = start_pos,
        fDistance = spear_range,
        fStartRadius = spear_width,
        fEndRadius = spear_width,
        Source = caster,
        bHasFrontalCone = false,
        bReplaceExisting = false,
        iUnitTargetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY,
        iUnitTargetFlags = DOTA_UNIT_TARGET_FLAG_NONE,
        iUnitTargetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        fExpireTime = GameRules:GetGameTime() + 10.0,
        bDeleteOnHit = false, -- 不删除投射物，让它继续移动
        vVelocity = direction * spear_speed,
        bProvidesVision = true,
        iVisionRadius = self:GetSpecialValueFor("spear_vision"),
        iVisionTeamNumber = caster:GetTeamNumber(),
        ExtraData = {
            damage = damage,
            chain_damage = chain_damage,
            chain_stun_duration = chain_stun_duration,
            direction_x = direction.x,
            direction_y = direction.y,
            direction_z = direction.z,
            range = spear_range,
            width = spear_width,
            speed = spear_speed,
            first_hit = false,
            carried_target = nil,
            has_collided = false,
            should_stop = false
        }
    }
    
    ProjectileManager:CreateLinearProjectile(projectile_info)
    
    -- 播放施法音效
    EmitSoundOn("Hero_Mars.Spear.Cast", caster)
end

function mars_spear:OnProjectileHit(target, location)
    if not target then
        -- 清理被携带的目标
        if self.carried_target then
            self.carried_target = nil
            self.first_hit = false
            self.has_collided = false
        end
        return false
    end
    
    -- 检查是否应该停止投射物
    if self.should_stop then
        self.should_stop = false
        return true
    end
    
    local caster = self:GetCaster()
    local damage = self:GetSpecialValueFor("damage")
    local chain_damage = self:GetSpecialValueFor("chain_damage")
    local chain_stun_duration = self:GetSpecialValueFor("chain_stun_duration")
    
    -- 检查是否是第一次击中
    if not self.first_hit then
        print("First hit on target:", target:GetUnitName(), "Damage:", damage)
        -- 造成初始伤害
        local damage_table = {
            victim = target,
            attacker = caster,
            damage = damage,
            damage_type = DAMAGE_TYPE_PHYSICAL,
            ability = self
        }
        ApplyDamage(damage_table)
        
        -- 标记为第一次击中，并记录被携带的目标
        self.first_hit = true
        self.carried_target = target
        
        -- 播放第一次命中音效
        EmitSoundOn("Hero_Mars.Spear.Impact", target)
        
        return false -- 继续投射物移动
    else
        -- 这是连锁碰撞，造成额外伤害和眩晕
        print("Chain hit on target:", target:GetUnitName(), "Chain damage:", chain_damage)
        local chain_damage_table = {
            victim = target,
            attacker = caster,
            damage = chain_damage,
            damage_type = DAMAGE_TYPE_PHYSICAL,
            ability = self
        }
        ApplyDamage(chain_damage_table)
        
        -- 对两个目标都应用眩晕
        if self.carried_target and self.carried_target:IsAlive() then
            self.carried_target:AddNewModifier(caster, self, "modifier_mars_spear_stun", {duration = chain_stun_duration})
        end
        
        target:AddNewModifier(caster, self, "modifier_mars_spear_stun", {duration = chain_stun_duration})
        
        -- 播放连锁命中音效
        EmitSoundOn("Hero_Mars.Spear.Impact", target)
        if self.carried_target then
            EmitSoundOn("Hero_Mars.Spear.Impact", self.carried_target)
        end
        
        -- 清理被携带的目标
        self.carried_target = nil
        self.first_hit = false
        self.has_collided = false
        
        return true -- 停止投射物
    end
end

-- 添加投射物移动更新函数
function mars_spear:OnProjectileThink(location)
    if not IsServer() then return end
    
    -- 如果有被携带的目标，更新其位置
    if self.carried_target and self.carried_target:IsAlive() and not self.has_collided then
        self.carried_target:SetAbsOrigin(location)
        
        -- 检查被携带的目标是否撞到其他敌人
        local chain_radius = 150
        local enemies = FindUnitsInRadius(
            self:GetCaster():GetTeamNumber(),
            location,
            nil,
            chain_radius,
            DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_CLOSEST,
            false
        )
        
        -- 找到最近的敌人（不是被携带的目标）
        for _, enemy in pairs(enemies) do
            if enemy ~= self.carried_target and enemy:IsAlive() then
                print("Chain collision detected - Carried target:", self.carried_target:GetUnitName(), "Hit target:", enemy:GetUnitName())
                -- 标记已发生碰撞，避免重复处理
                self.has_collided = true
                
                        -- 对第二个目标造成连锁伤害
        local chain_damage = self:GetSpecialValueFor("chain_damage")
        local chain_stun_duration = self:GetSpecialValueFor("chain_stun_duration")
                
                local chain_damage_table = {
                    victim = enemy,
                    attacker = self:GetCaster(),
                    damage = chain_damage,
                    damage_type = DAMAGE_TYPE_PHYSICAL,
                    ability = self
                }
                ApplyDamage(chain_damage_table)
                
                -- 对两个目标都应用眩晕
                self.carried_target:AddNewModifier(self:GetCaster(), self, "modifier_mars_spear_stun", {duration = chain_stun_duration})
                enemy:AddNewModifier(self:GetCaster(), self, "modifier_mars_spear_stun", {duration = chain_stun_duration})
                
                -- 播放连锁命中音效
                EmitSoundOn("Hero_Mars.Spear.Impact", enemy)
                EmitSoundOn("Hero_Mars.Spear.Impact", self.carried_target)
                
                -- 清理被携带的目标
                self.carried_target = nil
                self.first_hit = false
                self.has_collided = false
                
                -- 标记投射物应该停止
                self.should_stop = true
                
                break
            end
        end
    end
end

-- Stun modifier
modifier_mars_spear_stun = class({})

function modifier_mars_spear_stun:IsHidden() return false end
function modifier_mars_spear_stun:IsDebuff() return true end
function modifier_mars_spear_stun:IsPurgable() return true end

function modifier_mars_spear_stun:CheckState()
    return {
        [MODIFIER_STATE_STUNNED] = true
    }
end

function modifier_mars_spear_stun:GetEffectName()
    return ""
end

function modifier_mars_spear_stun:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end 