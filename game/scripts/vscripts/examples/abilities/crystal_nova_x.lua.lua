LinkLuaModifier( "modifier_crystal_nova_x", "examples/abilities/crystal_nova_x.lua.lua", LUA_MODIFIER_MOTION_NONE )
--Abilities
if crystal_nova_x == nil then
	crystal_nova_x = class({})
end
function crystal_nova_x:GetIntrinsicModifierName()
	return "modifier_crystal_nova_x"
end
---------------------------------------------------------------------
--Modifiers
if modifier_crystal_nova_x == nil then
	modifier_crystal_nova_x = class({})
end
function modifier_crystal_nova_x:OnCreated(params)
	if IsServer() then
	end
end
function modifier_crystal_nova_x:OnRefresh(params)
	if IsServer() then
	end
end
function modifier_crystal_nova_x:OnDestroy()
	if IsServer() then
	end
end
function modifier_crystal_nova_x:DeclareFunctions()
	return {
	}
end