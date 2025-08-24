LinkLuaModifier( "modifier_ember_spirit_inner_fire", "heroes/hero_ember_spirit/ember_spirit_inner_fire.lua.lua", LUA_MODIFIER_MOTION_NONE )
--Abilities
if ember_spirit_inner_fire == nil then
	ember_spirit_inner_fire = class({})
end
function ember_spirit_inner_fire:GetIntrinsicModifierName()
	return "modifier_ember_spirit_inner_fire"
end
---------------------------------------------------------------------
--Modifiers
if modifier_ember_spirit_inner_fire == nil then
	modifier_ember_spirit_inner_fire = class({})
end
function modifier_ember_spirit_inner_fire:OnCreated(params)
	if IsServer() then
	end
end
function modifier_ember_spirit_inner_fire:OnRefresh(params)
	if IsServer() then
	end
end
function modifier_ember_spirit_inner_fire:OnDestroy()
	if IsServer() then
	end
end
function modifier_ember_spirit_inner_fire:DeclareFunctions()
	return {
	}
end