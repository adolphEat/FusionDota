LinkLuaModifier( "modifier_viper_nethertoxin", "heroes/hero_viper/viper_nethertoxin.lua.lua", LUA_MODIFIER_MOTION_NONE )
--Abilities
if viper_nethertoxin == nil then
	viper_nethertoxin = class({})
end
function viper_nethertoxin:GetIntrinsicModifierName()
	return "modifier_viper_nethertoxin"
end
---------------------------------------------------------------------
--Modifiers
if modifier_viper_nethertoxin == nil then
	modifier_viper_nethertoxin = class({})
end
function modifier_viper_nethertoxin:OnCreated(params)
	if IsServer() then
	end
end
function modifier_viper_nethertoxin:OnRefresh(params)
	if IsServer() then
	end
end
function modifier_viper_nethertoxin:OnDestroy()
	if IsServer() then
	end
end
function modifier_viper_nethertoxin:DeclareFunctions()
	return {
	}
end