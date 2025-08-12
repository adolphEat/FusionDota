tidehunter_ravage = class({})

function tidehunter_ravage:OnSpellStart()
    if not IsServer() then return end
    
    print("=== TIDEHUNTER RAVAGE SPELL STARTED ===")
    
    local caster = self:GetCaster()
    local caster_pos = caster:GetAbsOrigin()
    
    -- 获取技能参数
    local damage = self:GetAbilityDamage()
    local radius = self:GetSpecialValueFor("radius")
    local heal_amount = self:GetSpecialValueFor("heal_amount")
    
    print("Skill parameters - Damage:", damage, "Radius:", radius, "Heal amount:", heal_amount)
    print("Caster position:", caster_pos)
    print("Caster team:", caster:GetTeamNumber())
    
    
    -- 使用完整的 ravage 动画
    print("Creating complete ravage animation...")
    
    local ravage_particle = ParticleManager:CreateParticle("particles/heros/crystal_maiden/tide_2021_ravage.vpcf", PATTACH_WORLDORIGIN, nil)
    print("ravage_particle index:", ravage_particle)
    if ravage_particle ~= -1 then
        ParticleManager:SetParticleControl(ravage_particle, 0, caster_pos)
        ParticleManager:SetParticleControl(ravage_particle, 1, Vector(radius, 0, 0))
        ParticleManager:ReleaseParticleIndex(ravage_particle)
        print("ravage_particle created successfully")
    else
        print("Failed to create ravage_particle")
    end
    
    -- 播放音效
    EmitSoundOn("Ability.Ravage", caster)
    
    -- 波浪扩散逻辑（配合粒子特效的波浪扩散动画）
    local wave_speed = 800 -- 波浪扩散速度
    local wave_duration = radius / wave_speed -- 波浪到达最大范围的时间
    
    print("Wave parameters - Speed:", wave_speed, "Duration:", wave_duration, "Interval:", 0.05)
    
    -- 创建波浪扩散的定时器
    local wave_timer = 0
    local wave_interval = 0.05 -- 每0.05秒检查一次波浪位置
    
    -- 使用 Dota 2 的 SetThink 定时器
    local function wave_tick()
        if wave_timer >= wave_duration then
            print("Wave timer finished, duration:", wave_duration)
            return nil -- 停止定时器
        end
        
        local current_radius = wave_speed * wave_timer
        local wave_alpha = 1 - (wave_timer / wave_duration) -- 波浪透明度随距离递减
        
        print("Wave timer:", wave_timer, "Current radius:", current_radius, "Alpha:", wave_alpha)
        
        -- 检查当前波浪范围内的单位
        local current_enemies = FindUnitsInRadius(
            caster:GetTeamNumber(),
            caster_pos,
            nil,
            current_radius,
            DOTA_UNIT_TARGET_TEAM_ENEMY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        local current_allies = FindUnitsInRadius(
            caster:GetTeamNumber(),
            caster_pos,
            nil,
            current_radius,
            DOTA_UNIT_TARGET_TEAM_FRIENDLY,
            DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
            DOTA_UNIT_TARGET_FLAG_NONE,
            FIND_ANY_ORDER,
            false
        )
        
        -- 检查上一帧的单位，避免重复处理
        local last_enemies = self.last_enemies or {}
        local last_allies = self.last_allies or {}
        
        -- 处理新被波浪触碰的敌人
        for _, enemy in pairs(current_enemies) do
            local already_hit = false
            for _, last_enemy in pairs(last_enemies) do
                if enemy == last_enemy then
                    already_hit = true
                    break
                end
            end
            
            if not already_hit and enemy ~= caster then
                -- 造成伤害
                print("Applying damage to enemy:", enemy:GetUnitName(), "Damage:", damage)
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
        
        -- 处理新被波浪触碰的友军
        for _, ally in pairs(current_allies) do
            local already_hit = false
            for _, last_ally in pairs(last_allies) do
                if ally == last_ally then
                    already_hit = true
                    break
                end
            end
            
            if not already_hit then
                -- 治疗友军（包括施法者自己）
                print("Healing ally:", ally:GetUnitName(), "Heal amount:", heal_amount)
                ally:Heal(heal_amount, caster)
                
                -- 显示治疗数字
                SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, ally, heal_amount, nil)
                
                -- 播放治疗音效
                EmitSoundOn("Hero_Tidehunter.Ravage.Target", ally)
            end
        end
        
        -- 更新上一帧的单位列表
        self.last_enemies = current_enemies
        self.last_allies = current_allies
        
        wave_timer = wave_timer + wave_interval
        return wave_interval
    end
    
    -- 启动波浪扩散定时器
    GameRules:GetGameModeEntity():SetThink(wave_tick, "wave_tick", 0)
    
    -- 备用方案：如果定时器失败，使用延迟的即时AOE
    print("Starting backup instant AOE after delay...")
    GameRules:GetGameModeEntity():SetThink(function()
        print("Executing backup instant AOE...")
        
        -- 查找范围内的敌人
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
        
        -- 查找范围内的友军
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
        
        print("Backup AOE - Found enemies:", #enemies, "Found allies:", #allies)
        
        -- 对敌人造成伤害
        for _, enemy in pairs(enemies) do
            if enemy ~= caster then
                print("Backup - Applying damage to enemy:", enemy:GetUnitName(), "Damage:", damage)
                local damage_table = {
                    victim = enemy,
                    attacker = caster,
                    damage = damage,
                    damage_type = DAMAGE_TYPE_MAGICAL,
                    ability = self
                }
                ApplyDamage(damage_table)
                EmitSoundOn("Hero_Tidehunter.Ravage.Target", enemy)
            end
        end
        
        -- 对友军进行治疗
        for _, ally in pairs(allies) do
            print("Backup - Healing ally:", ally:GetUnitName(), "Heal amount:", heal_amount)
            ally:Heal(heal_amount, caster)
            SendOverheadEventMessage(nil, OVERHEAD_ALERT_HEAL, ally, heal_amount, nil)
            EmitSoundOn("Hero_Tidehunter.Ravage.Target", ally)
        end
        
        return nil -- 只执行一次
    end, "backup_aoe", 0.5) -- 0.5秒后执行备用方案
end 