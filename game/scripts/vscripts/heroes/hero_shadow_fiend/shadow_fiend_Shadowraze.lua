-- shadow_fiend_Shadowraze.lua
-- 影压技能：以9999距离内最近的敌方单位为目标，对该目标造成物理伤害，每次释放伤害增加80点

shadow_fiend_Shadowraze = class({})

-- 自走棋式自动施法功能
function shadow_fiend_Shadowraze:OnCreated()
    if not IsServer() then return end
    -- 初始化累积伤害计数
    self.cumulative_damage = 0
end

function shadow_fiend_Shadowraze:OnUpgrade()
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
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
                local nearest_enemy = self:FindNearestEnemy(caster, auto_cast_range)
                
                if nearest_enemy then
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
        
        local function StartTimer()
            CheckAutoCast()
            return 0.5
        end
        
        GameRules:GetGameModeEntity():SetThink(StartTimer, "ShadowFiendShadowrazeAutoCast", 0.1)
    end
end

function shadow_fiend_Shadowraze:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
    local base_damage = self:GetSpecialValueFor("base_damage")
    local damage_per_cast = self:GetSpecialValueFor("damage_per_cast")
    
    -- 找到9999距离内最近的敌方单位
    local nearest_enemy = self:FindNearestEnemy(caster, auto_cast_range)
    
    if not nearest_enemy then
        return
    end
    
    -- 初始化累积伤害（如果是第一次释放）
    if not self.cumulative_damage then
        self.cumulative_damage = 0
    end
    
    -- 计算当前伤害 = 基础伤害 + 累积伤害增量
    local current_damage = base_damage + self.cumulative_damage
    
    -- 对目标造成物理伤害
    local damage_table = {
        victim = nearest_enemy,
        attacker = caster,
        damage = current_damage,
        damage_type = DAMAGE_TYPE_PHYSICAL,
        ability = self
    }
    ApplyDamage(damage_table)
    
    -- 显示伤害数字
    SendOverheadEventMessage(nil, OVERHEAD_ALERT_DAMAGE, nearest_enemy, current_damage, nil)
    
    -- 增加累积伤害（下次释放时伤害+80）
    self.cumulative_damage = self.cumulative_damage + damage_per_cast
    
    -- 创建粒子特效在目标位置
    local target_pos = nearest_enemy:GetAbsOrigin()
    
    -- 主粒子特效
    local shadowraze_particle = ParticleManager:CreateParticle(
        "particles/heroes/shadow_fiend/nevermore_shadowraze.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    ParticleManager:SetParticleControl(shadowraze_particle, 0, target_pos)
    ParticleManager:SetParticleControl(shadowraze_particle, 1, target_pos)
    ParticleManager:ReleaseParticleIndex(shadowraze_particle)
    
    -- 地面特效
    local ground_particle = ParticleManager:CreateParticle(
        "particles/heroes/shadow_fiend/nevermore_shadowraze_ground.vpcf",
        PATTACH_WORLDORIGIN,
        nil
    )
    ParticleManager:SetParticleControl(ground_particle, 0, target_pos)
    ParticleManager:ReleaseParticleIndex(ground_particle)
    
    -- 播放施法音效
    EmitSoundOn("Hero_Nevermore.Shadowraze", caster)
end

-- 找到距离最近的敌方单位
function shadow_fiend_Shadowraze:FindNearestEnemy(caster, radius)
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_CLOSEST,
        false
    )
    
    if #enemies == 0 then
        return nil
    end
    
    local nearest_enemy = enemies[1]  -- FIND_CLOSEST 已经返回最近的敌人
    
    return nearest_enemy
end

