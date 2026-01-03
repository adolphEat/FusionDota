-- Mars Spear技能 - 支持自走棋式自动释放：当Mana回满时自动寻找1000距离内最近的敌方单位
-- 以1000距离内最近的一名敌方单位为目标，以自身为起点投掷一把累计行进1000距离的长矛
-- 长矛对命中的首个敌人造成200点伤害，并造成击退，当被击退目标撞到第二名敌人时，对第二名单位造成100点伤害，并使两名单位眩晕1.5s

mars_spear = class({})

function mars_spear:GetManaCost(level)
    return 100 -- 固定100点Mana消耗
end

function mars_spear:OnUpgrade()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 启动自走棋式自动释放检查定时器
    if not self.auto_cast_timer then
        self.auto_cast_timer = true
        self.last_cast_time = 0 -- 添加冷却时间记录
        
        -- 使用Dota 2内置的定时器系统
        local function CheckAutoCast()
            if not IsValidEntity(caster) or not caster:IsAlive() then
                return -- 停止定时器
            end
            
            -- 移除冷却时间限制，实现真正的0CD
            local current_time = GameRules:GetGameTime()
            -- if current_time - self.last_cast_time < 1.0 then
            --     return 0.1 -- 继续定时器，但跳过这次检查
            -- end
            
            -- 检查Mana是否回满（达到最大Mana值）
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            -- 调试信息（减少输出频率）
            if current_mana >= max_mana then
            end
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local nearest_enemy = self:FindNearestEnemy()
                if nearest_enemy then
                    -- 检查是否已经在施法
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        -- 检查目标是否有效
                        if nearest_enemy and IsValidEntity(nearest_enemy) then
                            -- 设置自动释放目标
                            self.auto_cast_target = nearest_enemy
                            -- 直接释放技能，让Dota 2自动处理Mana消耗
                            caster:CastAbilityOnPosition(nearest_enemy:GetAbsOrigin(), self, caster:GetPlayerOwnerID())
                            self.last_cast_time = current_time -- 记录释放时间
                        else
                        end
                    else
                    end
                else
                end
            end
            
            -- 继续定时器
            return 0.1 -- 每0.1秒检查一次
        end
        
        -- 启动定时器
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function mars_spear:FindNearestEnemy()
    local caster = self:GetCaster()
    local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
    
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        auto_cast_range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    return enemies[1] -- 返回最近的敌人
end

function mars_spear:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local point = self:GetCursorPosition()
    
    -- 如果是自动释放，使用最近的目标位置
    if self.auto_cast_target then
        point = self.auto_cast_target:GetAbsOrigin()
        self.auto_cast_target = nil -- 清除目标
    end
    
    -- Dota 2会自动处理Mana消耗，不需要手动检查
    
    -- 获取技能参数
    local spear_range = self:GetSpecialValueFor("spear_range")
    local spear_width = self:GetSpecialValueFor("spear_width")
    local spear_speed = self:GetSpecialValueFor("spear_speed")
    local damage = self:GetSpecialValueFor("damage")
    local chain_damage = self:GetSpecialValueFor("chain_damage")
    local chain_stun_duration = self:GetSpecialValueFor("chain_stun_duration")
    
    
    -- 创建投射物
    local direction = (point - caster:GetAbsOrigin()):Normalized()
    local start_pos = caster:GetAbsOrigin() + direction * 100
    
    -- 使用投射物系统
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

LinkLuaModifier("modifier_mars_spear_stun", "heroes/hero_mars/mars_spear.lua", LUA_MODIFIER_MOTION_NONE)

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