-- ogre_magi_fireblast.lua
-- 食人魔法师火球术：多重施法版本
-- 效果：mana满后自动对范围9999内距离自己最近的敌方单位释放
-- 造成250点伤害和1秒眩晕
-- 多重施法判定：
-- 25%概率对自己释放一次（同样造成伤害和眩晕）
-- 25%概率对敌人释放一次
-- 25%概率对敌人释放2次
-- 25%概率对敌人释放3次

LinkLuaModifier("modifier_ogre_magi_fireblast_stun", "heroes/hero_ogre_magi/ogre_magi_fireblast.lua", LUA_MODIFIER_MOTION_NONE)

ogre_magi_fireblast = class({})

function ogre_magi_fireblast:GetCooldown(level)
    return 0 -- 确保技能没有冷却时间
end

function ogre_magi_fireblast:OnUpgrade()
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
            -- 移除冷却时间限制，实现真正的0CD
            -- if current_time - self.last_cast_time < 1.0 then
            --     return 0.1
            -- end
            
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

function ogre_magi_fireblast:FindNearestEnemy()
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

function ogre_magi_fireblast:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    
    -- 查找最近敌人
    local target = self:FindNearestEnemy()
    if not target then
        return
    end
    
    -- 获取技能数值
    local damage = self:GetSpecialValueFor("damage")
    local stun_duration = self:GetSpecialValueFor("stun_duration")
    
    -- 播放施法音效
    EmitSoundOn("Hero_OgreMagi.Fireblast.Cast", caster)
    
    -- 多重施法判定
    local multicast_result = self:DetermineMulticast()
    
    if multicast_result == "self" then
        -- 25%概率对自己释放（1次施法，眩晕时长不变）
        self:CastFireblastOnTarget(caster, damage, stun_duration)
    else
        -- 对敌人释放1-3次，眩晕时长根据施法次数加倍
        local cast_count = multicast_result
        local multiplied_stun_duration = stun_duration * cast_count
        
        for i = 1, cast_count do
            -- 每次施法都重新查找最近的敌人（可能之前的敌人已经死亡）
            local current_target = self:FindNearestEnemy()
            if current_target then
                -- 只有第一次施法时施加眩晕效果，后续施法只造成伤害
                if i == 1 then
                    self:CastFireblastOnTarget(current_target, damage, multiplied_stun_duration)
                else
                    self:CastFireblastOnTarget(current_target, damage, 0) -- 眩晕时长为0，只造成伤害
                end
            end
        end
    end
end

function ogre_magi_fireblast:DetermineMulticast()
    local random = RandomInt(1, 100)
    
    if random <= 25 then
        return "self"  -- 对自己释放
    elseif random <= 50 then
        return 1       -- 对敌人释放1次
    elseif random <= 75 then
        return 2       -- 对敌人释放2次
    else
        return 3       -- 对敌人释放3次
    end
end

function ogre_magi_fireblast:CastFireblastOnTarget(target, damage, stun_duration)
    if not IsValidEntity(target) or not target:IsAlive() then
        return
    end
    
    local caster = self:GetCaster()
    local target_pos = target:GetAbsOrigin()
    
    -- 播放命中音效
    EmitSoundOn("Hero_OgreMagi.Fireblast.Target", target)
    
    -- 创建粒子特效
    local particle = ParticleManager:CreateParticle(
        "particles/heroes/ogre_magi/ogre_magi_fireblast.vpcf",
        PATTACH_ABSORIGIN_FOLLOW,
        target
    )
    ParticleManager:SetParticleControl(particle, 0, target_pos)
    ParticleManager:ReleaseParticleIndex(particle)
    
    -- 造成伤害
    local damage_table = {
        victim = target,
        attacker = caster,
        damage = damage,
        damage_type = DAMAGE_TYPE_MAGICAL,
        ability = self
    }
    ApplyDamage(damage_table)
    
    -- 施加眩晕效果（如果眩晕时长大于0）
    if stun_duration > 0 then
        target:AddNewModifier(caster, self, "modifier_ogre_magi_fireblast_stun", {duration = stun_duration})
    end
end

-- 眩晕效果修饰符
modifier_ogre_magi_fireblast_stun = class({})

function modifier_ogre_magi_fireblast_stun:IsHidden()
    return false
end

function modifier_ogre_magi_fireblast_stun:IsDebuff()
    return true
end

function modifier_ogre_magi_fireblast_stun:IsPurgable()
    return true
end

function modifier_ogre_magi_fireblast_stun:IsStunDebuff()
    return true
end

function modifier_ogre_magi_fireblast_stun:CheckState()
    return {
        [MODIFIER_STATE_STUNNED] = true,
    }
end

function modifier_ogre_magi_fireblast_stun:GetEffectName()
    return "particles/generic_gameplay/generic_stunned.vpcf"
end

function modifier_ogre_magi_fireblast_stun:GetEffectAttachType()
    return PATTACH_OVERHEAD_FOLLOW
end

function modifier_ogre_magi_fireblast_stun:GetStatusEffectName()
    return "particles/status_fx/status_effect_stunned.vpcf"
end

function modifier_ogre_magi_fireblast_stun:GetStatusEffectPriority()
    return MODIFIER_PRIORITY_NORMAL
end
