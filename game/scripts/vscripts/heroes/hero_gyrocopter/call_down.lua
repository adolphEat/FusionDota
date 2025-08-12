--[[Author: YOLOSPAGHETTI
	Date: March 28, 2016
	Gives the caster's team vision in the radius]]
function GiveVision(keys)
	local caster = keys.caster
	local ability = keys.ability
	local point = ability:GetCursorPosition()
	local sight_radius = ability:GetLevelSpecialValueFor("sight_radius", (ability:GetLevel() -1))
	local sight_duration = ability:GetLevelSpecialValueFor("sight_duration", (ability:GetLevel() -1))
	
	AddFOWViewer(caster:GetTeam(), point, sight_radius, sight_duration, false)

	print("_____________________________GiveVisionTest________________________________________")
	-- 添加伤害效果
    local damage = ability:GetLevelSpecialValueFor("damage", (ability:GetLevel() -1))
    local damage_radius = ability:GetLevelSpecialValueFor("damage_radius", (ability:GetLevel() -1))
    damage = 1000
    damage_radius = 1000
	
	print("Damage:", damage)
	print("Damage Radius:", damage_radius)
	print("Caster Team:", caster:GetTeamNumber())
	print("Target Point:", point.x, point.y, point.z)

    -- 寻找范围内的敌方单位
    local units = FindUnitsInRadius(
        caster:GetTeamNumber(),
        point,
        nil,
        damage_radius,
        DOTA_UNIT_TARGET_TEAM_ENEMY,
        DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC,
        0,
        0,
        false
    )
    
	print("Found units:", #units)

    -- 对每个单位造成伤害
    for _, unit in pairs(units) do
        ApplyDamage({
            victim = unit,
            attacker = caster,
            damage = damage,
            damage_type = DAMAGE_TYPE_MAGICAL,
            ability = ability
        })

		 print("After damage HP:", unit:GetHealth())
    end
    
    -- 添加粒子特效
    local particle = ParticleManager:CreateParticle("particles/units/heroes/hero_gyrocopter/gyro_call_down.vpcf", PATTACH_WORLDORIGIN, caster)
    ParticleManager:SetParticleControl(particle, 0, point)
end
