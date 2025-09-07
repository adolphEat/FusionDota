local ____lualib = require("lualib_bundle")
local __TS__ObjectAssign = ____lualib.__TS__ObjectAssign
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 1,["7"] = 2,["8"] = 2,["9"] = 3,["10"] = 3,["11"] = 5,["12"] = 5,["13"] = 5,["14"] = 6,["15"] = 7,["16"] = 8,["17"] = 9,["18"] = 10,["21"] = 15,["24"] = 12,["25"] = 13,["31"] = 17,["32"] = 5,["33"] = 5,["34"] = 5,["35"] = 5});
local ____exports = {}
require("utils.index")
local ____modules = require("modules.index")
local ActivateModules = ____modules.ActivateModules
local ____precache = require("utils.precache")
local Precache = ____precache.default
__TS__ObjectAssign(
    getfenv(),
    {
        Activate = function()
            print("========================================")
            print("[GameMode] ADDON GAME MODE ACTIVATING")
            print("[GameMode] About to call ActivateModules()")
            print("========================================")
            do
                local function ____catch(____error)
                    print("[GameMode] ERROR in ActivateModules():", ____error)
                end
                local ____try, ____hasReturned = pcall(function()
                    ActivateModules(nil)
                    print("[GameMode] ActivateModules() completed successfully")
                end)
                if not ____try then
                    ____catch(____hasReturned)
            end
        end
        
        -- 测试axe1技能加载
        if unit:GetUnitName() == "axe1" then
            print("=== Testing axe1 abilities ===")
            local ability = unit:FindAbilityByName("axe_battle_hunger_custom")
            if ability then
                print(">>> Found axe_battle_hunger_custom ability")
                ability:SetLevel(1)
                print(">>> Set axe_battle_hunger_custom level to 1")
            else
                print(">>> Ability axe_battle_hunger_custom NOT found!")
            end
            
            -- 测试通用Mana恢复技能
            local mana_ability = unit:FindAbilityByName("universal_mana_restore_on_attack")
            if mana_ability then
                print(">>> Found universal_mana_restore_on_attack ability")
                mana_ability:SetLevel(1)
                print(">>> Set universal_mana_restore_on_attack level to 1")
            else
                print(">>> Ability universal_mana_restore_on_attack NOT found!")
            end
            
            -- 列出所有技能
            for i = 0, unit:GetAbilityCount() - 1 do
                local abil = unit:GetAbilityByIndex(i)
                if abil then
                    print(">>> Ability", i, ":", abil:GetAbilityName())
                end
            end
        end
        
        -- 测试ember_spirit1技能加载
        if unit:GetUnitName() == "ember_spirit1" then
            print("=== Testing ember_spirit1 abilities ===")
            local ability = unit:FindAbilityByName("ember_spirit_inner_Fire")
            if ability then
                print(">>> Found ember_spirit_inner_Fire ability")
                ability:SetLevel(1)
                print(">>> Set ember_spirit_inner_Fire level to 1")
            else
                print(">>> Ability ember_spirit_inner_Fire NOT found!")
            end
            
            -- 测试通用Mana恢复技能
            local mana_ability = unit:FindAbilityByName("universal_mana_restore_on_attack")
            if mana_ability then
                print(">>> Found universal_mana_restore_on_attack ability")
                mana_ability:SetLevel(1)
                print(">>> Set universal_mana_restore_on_attack level to 1")
            else
                print(">>> Ability universal_mana_restore_on_attack NOT found!")
            end
            
            local mana_damage_ability = unit:FindAbilityByName("universal_mana_restore_on_damage")
            if mana_damage_ability then
                print(">>> Found universal_mana_restore_on_damage ability")
                mana_damage_ability:SetLevel(1)
                print(">>> Set universal_mana_restore_on_damage level to 1")
            else
                print(">>> Ability universal_mana_restore_on_damage NOT found!")
            end
            
            -- 列出所有技能
            for i = 0, unit:GetAbilityCount() - 1 do
                local abil = unit:GetAbilityByIndex(i)
                if abil then
                    print(">>> Ability", i, ":", abil:GetAbilityName())
                end
            end
            print("[GameMode] Addon activation complete")
        end,
        Precache = Precache
    }
)
return ____exports
