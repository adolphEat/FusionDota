-- Tidehunter Tidal Wave技能 - 支持自走棋式自动释放：当Mana回满时自动释放
-- 以自身为中心向外扩散出一道冲击波，行进3000距离
-- 对范围内的所有敌人造成400点伤害，并对所有友军治疗200点血量

tidehunter_tidal_wave = class({})

function tidehunter_tidal_wave:GetManaCost(level)
    return 150 -- 固定150点Mana消耗
end

function tidehunter_tidal_wave:OnUpgrade()
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
            -- if current_time - self.last_cast_time < 1.5 then
            --     return 0.1 -- 继续定时器，但跳过这次检查
            -- end
            
            -- 检查Mana是否回满（达到最大Mana值）
            local current_mana = caster:GetMana()
            local max_mana = caster:GetMaxMana()
            
            
            if current_mana >= max_mana and self:IsFullyCastable() then
                -- 检查是否有敌人或友军在范围内
                local has_targets = self:HasTargetsInRange()
                if has_targets then
                    -- 检查是否已经在施法
                    if not caster:IsChanneling() and not caster:IsSilenced() and not caster:IsStunned() then
                        -- 直接调用技能释放，让Dota 2自动处理Mana消耗
                        caster:CastAbilityNoTarget(self, caster:GetPlayerOwnerID())
                        self.last_cast_time = current_time -- 记录释放时间
                    end
                end
            end
            
            -- 继续定时器
            return 0.1 -- 每0.1秒检查一次
        end
        
        -- 启动定时器
        GameRules:GetGameModeEntity():SetThink(CheckAutoCast, "CheckAutoCast_" .. caster:GetEntityIndex(), 0.1)
    end
end

function tidehunter_tidal_wave:HasTargetsInRange()
    local caster = self:GetCaster()
    local auto_cast_range = self:GetSpecialValueFor("auto_cast_range")
    
    -- 检查范围内是否有敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        auto_cast_range,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 检查范围内是否有友军（除了施法者自己）
    local allies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster:GetAbsOrigin(),
        nil,
        auto_cast_range,
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 移除施法者自己
    for i = #allies, 1, -1 do
        if allies[i] == caster then
            table.remove(allies, i)
        end
    end
    
    return #enemies > 0 or #allies > 0
end

function tidehunter_tidal_wave:OnSpellStart()
    if not IsServer() then return end
    
    local caster = self:GetCaster()
    local caster_pos = caster:GetAbsOrigin()
    
    -- 获取技能参数
    local damage = self:GetSpecialValueFor("damage")
    local radius = self:GetSpecialValueFor("radius")
    local heal_amount = self:GetSpecialValueFor("heal_amount")
    
    -- 创建冲击波粒子特效
    
    local ravage_particle = ParticleManager:CreateParticle("particles/heroes/crystal_maiden/tide_2021_ravage.vpcf", PATTACH_WORLDORIGIN, nil)
    if ravage_particle ~= -1 then
        ParticleManager:SetParticleControl(ravage_particle, 0, caster_pos)
        ParticleManager:SetParticleControl(ravage_particle, 1, Vector(radius, 0, 0))
        ParticleManager:ReleaseParticleIndex(ravage_particle)
    end
    
    -- 播放音效
    EmitSoundOn("Ability.Ravage", caster)
    
    -- 直接对范围内的所有单位造成伤害和治疗
    
    -- 找到范围内的所有敌人
    local enemies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster_pos,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    -- 找到范围内的所有友军
    local allies = FindUnitsInRadius(
        caster:GetTeamNumber(),
        caster_pos,
        nil,
        radius,
        DOTA_UNIT_TARGET_TEAM_FRIENDLY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        DOTA_UNIT_TARGET_FLAG_NONE,
        FIND_ANY_ORDER,
        false
    )
    
    
    -- 对敌人造成伤害
    for _, enemy in pairs(enemies) do
        if enemy ~= caster then
            local damage_table = {
                victim = enemy,
                attacker = caster,
                damage = damage,
                damage_type = DAMAGE_TYPE_MAGICAL,
                ability = self
            }
            ApplyDamage(damage_table)
            
            -- 播放命中音效
            EmitSoundOn("Hero_Tidehunter.Ravage.Target", enemy)
        end
    end
    
    -- 对友军进行治疗
    for _, ally in pairs(allies) do
        ally:Heal(heal_amount, caster)
        
        -- 显示治疗数字
        SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, ally, heal_amount, nil)
        
        -- 播放治疗音效
        EmitSoundOn("Hero_Tidehunter.Ravage.Target", ally)
    end
    
    -- 移除强制停止，让单位继续正常攻击
    -- caster:Stop()
    -- caster:MoveToPosition(caster:GetAbsOrigin())
end

