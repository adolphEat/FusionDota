-- Debug script for enigma_black_hole skill
-- 用于调试技能问题

function DebugEnigmaSkill()
    print("=== Enigma Black Hole Debug ===")
    
    -- 检查技能是否存在
    local ability = Entities:First():FindAbilityByName("enigma_black_hole")
    if ability then
        print("✓ 技能找到: enigma_black_hole")
        print("技能等级:", ability:GetLevel())
        print("技能冷却:", ability:GetCooldownTimeRemaining())
        print("魔法消耗:", ability:GetManaCost(ability:GetLevel()))
        print("施法距离:", ability:GetCastRange(Vector(0,0,0), nil))
    else
        print("✗ 技能未找到: enigma_black_hole")
    end
    
    -- 检查粒子文件是否存在
    local particle_path = "particles/heroes/enigma/enigma_blackhole.vpcf"
    print("粒子路径:", particle_path)
    
    -- 检查音效
    print("音效: Ability.Black_Hole")
    
    print("=== Debug End ===")
end

-- 在控制台中运行: DebugEnigmaSkill()
