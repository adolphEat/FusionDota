LinkLuaModifier( "modifier_double_cast", "heroes/universal/double_cast.lua.lua", LUA_MODIFIER_MOTION_NONE )
--Abilities
if double_cast == nil then
	double_cast = class({})
end
function double_cast:GetIntrinsicModifierName()
	return "modifier_double_cast"
end
---------------------------------------------------------------------
--Modifiers
if modifier_double_cast == nil then
	modifier_double_cast = class({})
end
function modifier_double_cast:OnCreated(params)
	if IsServer() then
	end
end
function modifier_double_cast:OnRefresh(params)
	if IsServer() then
	end
end
function modifier_double_cast:OnDestroy()
	if IsServer() then
	end
end
function modifier_double_cast:DeclareFunctions()
	return {
	}
end