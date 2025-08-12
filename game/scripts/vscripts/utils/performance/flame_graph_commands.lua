local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__New = ____lualib.__TS__New
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__StringSplit = ____lualib.__TS__StringSplit
local __TS__ParseInt = ____lualib.__TS__ParseInt
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 5,["11"] = 5,["12"] = 7,["13"] = 7,["14"] = 7,["16"] = 9,["17"] = 10,["18"] = 11,["19"] = 12,["20"] = 15,["21"] = 16,["22"] = 17,["23"] = 14,["24"] = 23,["25"] = 24,["26"] = 25,["28"] = 27,["29"] = 23,["30"] = 33,["31"] = 34,["32"] = 34,["33"] = 34,["34"] = 34,["35"] = 34,["36"] = 35,["37"] = 33,["38"] = 41,["39"] = 42,["40"] = 42,["41"] = 42,["42"] = 42,["43"] = 43,["44"] = 43,["45"] = 43,["46"] = 43,["47"] = 44,["48"] = 44,["49"] = 44,["50"] = 44,["51"] = 45,["52"] = 41,["53"] = 51,["54"] = 52,["55"] = 51,["56"] = 61,["57"] = 63,["58"] = 64,["60"] = 61,["61"] = 71,["62"] = 72,["65"] = 73,["66"] = 71,["67"] = 79,["68"] = 80,["69"] = 82,["70"] = 83,["71"] = 85,["73"] = 79,["74"] = 92,["75"] = 93,["76"] = 94,["77"] = 95,["78"] = 97,["79"] = 97,["80"] = 97,["81"] = 98,["82"] = 99,["83"] = 100,["85"] = 102,["86"] = 97,["87"] = 97,["88"] = 105,["89"] = 106,["90"] = 92,["91"] = 112,["92"] = 113,["93"] = 114,["94"] = 115,["95"] = 116,["96"] = 112,["97"] = 122,["98"] = 123,["99"] = 124,["100"] = 125,["101"] = 126,["102"] = 122,["103"] = 132,["104"] = 133,["105"] = 134,["106"] = 136,["107"] = 137,["108"] = 138,["110"] = 141,["111"] = 142,["112"] = 132,["113"] = 148,["114"] = 149,["115"] = 150,["116"] = 153,["119"] = 156,["120"] = 157,["121"] = 158,["123"] = 160,["124"] = 162,["125"] = 161,["127"] = 162,["128"] = 163,["129"] = 164,["130"] = 164,["131"] = 164,["132"] = 164,["134"] = 164,["136"] = 164,["139"] = 167,["141"] = 168,["142"] = 169,["145"] = 173,["147"] = 174,["148"] = 175,["150"] = 177,["152"] = 178,["155"] = 180,["160"] = 148,["161"] = 190,["162"] = 191,["163"] = 192,["166"] = 193,["167"] = 190,["168"] = 199,["169"] = 200,["170"] = 207,["171"] = 199,["172"] = 213,["173"] = 214,["174"] = 215,["175"] = 216,["177"] = 213,["178"] = 222,["179"] = 223,["180"] = 222});
local ____exports = {}
local ____flame_graph_profiler = require("utils.performance.flame_graph_profiler")
local GetFlameGraphProfiler = ____flame_graph_profiler.GetFlameGraphProfiler
____exports.FlameGraphCommands = __TS__Class()
local FlameGraphCommands = ____exports.FlameGraphCommands
FlameGraphCommands.name = "FlameGraphCommands"
function FlameGraphCommands.prototype.____constructor(self)
    self.profiler = GetFlameGraphProfiler(nil)
    self.recordingState = 0
    self.recordingTime = 0
    self.timerHandle = nil
    self:registerCommands()
    self:registerUIEvents()
    self:updateDebugState()
end
function FlameGraphCommands.getInstance(self)
    if not ____exports.FlameGraphCommands.instance then
        ____exports.FlameGraphCommands.instance = __TS__New(____exports.FlameGraphCommands)
    end
    return ____exports.FlameGraphCommands.instance
end
function FlameGraphCommands.prototype.registerCommands(self)
    ListenToGameEvent(
        "player_chat",
        function(event) return self:handleChatCommand(event) end,
        nil
    )
    print("[FlameGraphCommands] 已注册性能分析命令")
end
function FlameGraphCommands.prototype.registerUIEvents(self)
    CustomGameEventManager:RegisterListener(
        "performance_start",
        function(_) return self:handleStart() end
    )
    CustomGameEventManager:RegisterListener(
        "performance_stop",
        function(_) return self:handleStop() end
    )
    CustomGameEventManager:RegisterListener(
        "performance_paused",
        function(_) return self:handlePaused() end
    )
    print("[FlameGraphCommands] 已注册性能分析UI事件")
end
function FlameGraphCommands.prototype.updateDebugState(self)
    GameRules.XNetTable:SetTableValue("performance_debug", "debug_state", {state = self.recordingState, time = self.recordingTime})
end
function FlameGraphCommands.prototype.handleStart(self)
    if self.recordingState == 0 then
        self:startRecording()
    end
end
function FlameGraphCommands.prototype.handleStop(self)
    if self.recordingState == 0 then
        return
    end
    self:stopRecording()
end
function FlameGraphCommands.prototype.handlePaused(self)
    if self.recordingState == 1 then
        self:pauseRecording()
    elseif self.recordingState == 2 then
        self:resumeRecording()
    end
end
function FlameGraphCommands.prototype.startRecording(self)
    self.recordingState = 1
    self.recordingTime = 0
    self.profiler:startRecording(0)
    self.timerHandle = Timers:CreateTimer(
        1,
        function()
            if self.recordingState == 1 then
                self.recordingTime = self.recordingTime + 1
                self:updateDebugState()
            end
            return self.recordingState ~= 0 and 1 or nil
        end
    )
    self:updateDebugState()
    print("[FlameGraphProfiler] 开始记录性能数据")
end
function FlameGraphCommands.prototype.pauseRecording(self)
    self.recordingState = 2
    self.profiler:pauseRecording()
    self:updateDebugState()
    print("[FlameGraphProfiler] 暂停记录性能数据")
end
function FlameGraphCommands.prototype.resumeRecording(self)
    self.recordingState = 1
    self.profiler:resumeRecording()
    self:updateDebugState()
    print("[FlameGraphProfiler] 恢复记录性能数据")
end
function FlameGraphCommands.prototype.stopRecording(self)
    self.recordingState = 0
    self.profiler:stopRecording()
    if self.timerHandle then
        Timers:RemoveTimer(self.timerHandle)
        self.timerHandle = nil
    end
    self:updateDebugState()
    print("[FlameGraphProfiler] 停止记录性能数据")
end
function FlameGraphCommands.prototype.handleChatCommand(self, event)
    local text = event.text
    local playerID = event.playerid
    if not IsInToolsMode() and playerID ~= 0 then
        return
    end
    if __TS__StringStartsWith(text, "-flamegraph") or __TS__StringStartsWith(text, "-fg") then
        local args = __TS__StringSplit(text, " ")
        local subCommand = args[2]
        repeat
            local ____switch29 = subCommand
            local duration
            local ____cond29 = ____switch29 == "start"
            if ____cond29 then
                duration = __TS__ParseInt(args[3] or "0")
                self.profiler:startRecording(duration)
                local ____self_sendMessageToPlayer_1 = self.sendMessageToPlayer
                local ____temp_0
                if duration > 0 then
                    ____temp_0 = ("，持续" .. tostring(duration)) .. "秒"
                else
                    ____temp_0 = ""
                end
                ____self_sendMessageToPlayer_1(self, playerID, "开始记录性能数据" .. ____temp_0)
                break
            end
            ____cond29 = ____cond29 or ____switch29 == "stop"
            if ____cond29 then
                self.profiler:stopRecording()
                self:sendMessageToPlayer(playerID, "停止记录性能数据")
                break
            end
            ____cond29 = ____cond29 or ____switch29 == "dev"
            if ____cond29 then
                self:startRecording()
                self:sendMessageToPlayer(playerID, "开始持续记录性能数据")
            end
            ____cond29 = ____cond29 or ____switch29 == "help"
            if ____cond29 then
                self:sendHelpMessage(playerID)
            end
            do
                self:toggleFlameGraph(playerID)
                break
            end
        until true
    end
end
function FlameGraphCommands.prototype.toggleFlameGraph(self, playerID)
    local player = PlayerResource:GetPlayer(playerID)
    if not player then
        return
    end
    CustomGameEventManager:Send_ServerToPlayer(player, "performance_toggle_flamegraph", {})
end
function FlameGraphCommands.prototype.sendHelpMessage(self, playerID)
    local message = ((("火焰图性能分析命令:\n" .. "-flamegraph start [持续时间] - 开始记录性能数据\n") .. "-flamegraph stop - 停止记录性能数据\n") .. "-flamegraph export - 导出火焰图数据\n") .. "-flamegraph help - 显示帮助信息"
    self:sendMessageToPlayer(playerID, message)
end
function FlameGraphCommands.prototype.sendMessageToPlayer(self, playerID, message)
    local player = PlayerResource:GetPlayer(playerID)
    if player then
        CustomGameEventManager:Send_ServerToPlayer(player, "game_msg_tip", {msg = message})
    end
end
function ____exports.InitFlameGraphCommands(self)
    ____exports.FlameGraphCommands:getInstance()
end
return ____exports
