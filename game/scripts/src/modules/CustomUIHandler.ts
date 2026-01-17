/**
 * 自定义UI事件处理器
 * 处理来自客户端UI的事件
 */

import { inventoryHandler } from './InventoryHandler';

export class CustomUIHandler {
    private static instance: CustomUIHandler;

    private constructor() {
        this.registerEventHandlers();
        // 初始化背包处理器
        inventoryHandler;
        print('[CustomUIHandler] Initialized (with InventoryHandler)');
    }

    public static getInstance(): CustomUIHandler {
        if (!CustomUIHandler.instance) {
            CustomUIHandler.instance = new CustomUIHandler();
        }
        return CustomUIHandler.instance;
    }

    /**
     * 注册事件处理器
     */
    private registerEventHandlers(): void {
        // 注册按钮点击事件
        CustomGameEventManager.RegisterListener('button_clicked', (_, data) => {
            this.onButtonClicked(data);
        });

        // 注册金币奖励请求事件
        CustomGameEventManager.RegisterListener('request_gold_bonus', (_, data) => {
            this.onGoldBonusRequested(data);
        });

        // 注册自定义面板事件
        CustomGameEventManager.RegisterListener('custom_panel_action', (_, data) => {
            this.onCustomPanelAction(data);
        });

        // 注册自走棋结算相关事件
        CustomGameEventManager.RegisterListener('autochess_wave_continue', (_, data) => {
            this.onWaveContinue(data);
        });

        CustomGameEventManager.RegisterListener('autochess_wave_claim_reward', (_, data) => {
            this.onWaveClaimReward(data);
        });

        CustomGameEventManager.RegisterListener('autochess_wave_select_stage', (userId, data: any) => {
            print(`[CustomUIHandler] ========== 收到 autochess_wave_select_stage 事件 ==========`);
            print(`[CustomUIHandler] userId: ${userId}`);
            print(`[CustomUIHandler] data.playerId: ${(data as any).playerId}, data.stageId: ${(data as any).stageId}`);
            this.onWaveSelectStage(data);
        });

        // 注册快速操作事件（用于测试结算等）
        CustomGameEventManager.RegisterListener('quick_action', (_, data) => {
            this.onQuickAction(data);
        });

        // 注册打开选关界面事件（从 playing-hud 或 battleendview 触发）
        CustomGameEventManager.RegisterListener('open_level_selection', (_, data) => {
            this.onOpenLevelSelection(data);
        });

        // 注册切换背包请求事件（从 playing-hud 触发）
        CustomGameEventManager.RegisterListener('toggle_inventory_request', (_, data) => {
            this.onToggleInventoryRequest(data);
        });

        // 注册重启游戏事件（从 end_screen 触发）
        CustomGameEventManager.RegisterListener('restart_game', (_, data) => {
            this.onRestartGame(data);
        });

        // 注册返回主菜单事件（从 end_screen 触发）
        CustomGameEventManager.RegisterListener('return_to_menu', (_, data) => {
            this.onReturnToMenu(data);
        });

        // 注册退出游戏事件（从 battleendview 触发）
        CustomGameEventManager.RegisterListener('quit_to_menu', (_, data) => {
            this.onReturnToMenu(data);
        });
    }

    /**
     * 处理按钮点击事件
     */
    private onButtonClicked(data: any): void {
        const playerId = data.PlayerID;
        const count = data.count || 1;

        print(`[CustomUIHandler] Player ${playerId} clicked button ${count} times`);

        // 可以在这里添加游戏逻辑
        // 例如：给玩家奖励、触发特效等
        
        // 发送反馈事件回客户端
        CustomGameEventManager.Send_ServerToAllClients('button_click_response', {
            playerId: playerId,
            count: count,
            message: `Server received click #${count}!`
        });
    }

    /**
     * 处理金币奖励请求
     */
    private onGoldBonusRequested(data: any): void {
        const playerId = data.playerId;
        const amount = data.amount || 100;

        print(`[CustomUIHandler] Player ${playerId} requested ${amount} gold bonus`);

        // 检查是否是有效玩家
        if (!PlayerResource.IsValidPlayer(playerId)) {
            print(`[CustomUIHandler] Invalid player ID: ${playerId}`);
            return;
        }

        // 获取玩家英雄
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero) {
            print(`[CustomUIHandler] No hero found for player ${playerId}`);
            return;
        }

        // 给予金币奖励（如果有金币系统的话）
        // 这里只是示例，实际实现取决于游戏的经济系统
        try {
            // 假设的金币系统调用
            // PlayerResource.ModifyGold(playerId, amount, false, 0);
            
            // 发送确认消息回客户端
            CustomGameEventManager.Send_ServerToPlayer(PlayerResource.GetPlayer(playerId), 'gold_bonus_granted', {
                amount: amount,
                newTotal: 999 // 假设的新总金币数
            });

            print(`[CustomUIHandler] Granted ${amount} gold to player ${playerId}`);
        } catch (error) {
            print(`[CustomUIHandler] Error granting gold: ${error}`);
        }
    }

    /**
     * 处理打开选关界面事件
     * 从客户端收到请求后，广播给所有客户端打开选关界面
     */
    private onOpenLevelSelection(data: any): void {
        const playerId = data.PlayerID;
        print(`[CustomUIHandler] Open level selection requested by player ${playerId}`);
        
        // 广播给所有客户端打开选关界面
        CustomGameEventManager.Send_ServerToAllClients('open_level_selection', {});
        print('[CustomUIHandler] Broadcasted open_level_selection to all clients');
        
        // 单机模式：立即发送最新的关卡解锁状态（确保客户端显示正确的解锁状态）
        if (GameRules.AutoChessMode) {
            GameRules.AutoChessMode.sendStageUnlockUpdate();
        }
    }

    /**
     * 处理切换背包请求
     * 从客户端收到请求后，广播给所有客户端切换背包显示
     */
    private onToggleInventoryRequest(data: any): void {
        const playerId = data.PlayerID || data.playerId;
        print(`[CustomUIHandler] Toggle inventory requested by player ${playerId}`);
        
        // 广播给所有客户端切换背包
        (CustomGameEventManager.Send_ServerToAllClients as any)('toggle_inventory', {});
        print('[CustomUIHandler] Broadcasted toggle_inventory to all clients');
    }

    /**
     * 处理快速操作事件（来自 playing-hud）
     */
    private onQuickAction(data: any): void {
        const playerId = data.PlayerID;
        const action = data.action;

        print(`[CustomUIHandler] Quick action received: ${action} from player ${playerId}`);

        switch (action) {
            case 'test_kill':
                this.handleTestKillEnemies(playerId);
                break;
            default:
                print(`[CustomUIHandler] Unknown quick action: ${action}`);
        }
    }

    /**
     * 处理自定义面板操作
     */
    private onCustomPanelAction(data: any): void {
        const playerId = data.playerId;
        const action = data.action;
        const params = data.params || {};

        print(`[CustomUIHandler] Player ${playerId} performed action: ${action}`);

        switch (action) {
            case 'spawn_unit':
                this.handleSpawnUnit(playerId, params);
                break;
            case 'teleport_hero':
                this.handleTeleportHero(playerId, params);
                break;
            case 'show_message':
                this.handleShowMessage(playerId, params);
                break;
            case 'test_kill':
                this.handleTestKillEnemies(playerId);
                break;
            default:
                print(`[CustomUIHandler] Unknown action: ${action}`);
        }
    }

    /**
     * 处理生成单位请求
     */
    private handleSpawnUnit(playerId: PlayerID, params: any): void {
        const unitName = params.unitName || 'npc_dota_hero_pudge';
        const position = params.position || Vector(0, 0, 0);

        try {
            const unit = CreateUnitByName(
                unitName,
                position,
                true,
                null,
                null,
                3
            );

            if (unit) {
                print(`[CustomUIHandler] Spawned unit ${unitName} for player ${playerId}`);
                
                // 发送成功消息
                CustomGameEventManager.Send_ServerToPlayer(PlayerResource.GetPlayer(playerId), 'unit_spawned', {
                    unitName: unitName,
                    position: position
                });
            } else {
                print(`[CustomUIHandler] Failed to spawn unit ${unitName}`);
            }
        } catch (error) {
            print(`[CustomUIHandler] Error spawning unit: ${error}`);
        }
    }

    /**
     * 处理英雄传送请求
     */
    private handleTeleportHero(playerId: PlayerID, params: any): void {
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero) {
            print(`[CustomUIHandler] No hero found for teleport request`);
            return;
        }

        const position = params.position || Vector(0, 0, 0);
        
        try {
            FindClearSpaceForUnit(hero, position, true);
            print(`[CustomUIHandler] Teleported hero for player ${playerId}`);
            
            // 发送确认消息
            CustomGameEventManager.Send_ServerToPlayer(PlayerResource.GetPlayer(playerId), 'hero_teleported', {
                position: position
            });
        } catch (error) {
            print(`[CustomUIHandler] Error teleporting hero: ${error}`);
        }
    }

    /**
     * 处理显示消息请求
     */
    private handleShowMessage(playerId: PlayerID, params: any): void {
        const message = params.message || 'Hello from server!';
        const duration = params.duration || 3.0;

        try {
            // 显示消息给指定玩家
            const player = PlayerResource.GetPlayer(playerId);
            if (player) {
                // 这里可以使用游戏内的消息系统
                // 例如：显示在聊天中、显示为弹出消息等
                print(`[CustomUIHandler] Showing message to player ${playerId}: ${message}`);
                
                // 发送消息显示事件
                CustomGameEventManager.Send_ServerToPlayer(player, 'show_ui_message', {
                    message: message,
                    duration: duration
                });
            }
        } catch (error) {
            print(`[CustomUIHandler] Error showing message: ${error}`);
        }
    }

    /**
     * 更新客户端UI数据
     */
    public updateClientUI(playerId?: PlayerID): void {
        const gameState = {
            currentTime: GameRules.GetGameTime(),
            gameMode: GameRules.GameModeManager?.getCurrentMode() || 'unknown',
            playersConnected: PlayerResource.GetPlayerCount()
        };

        if (playerId !== undefined) {
            // 更新特定玩家的UI
            CustomGameEventManager.Send_ServerToPlayer(PlayerResource.GetPlayer(playerId), 'ui_data_update', gameState);
        } else {
            // 更新所有玩家的UI
            CustomGameEventManager.Send_ServerToAllClients('ui_data_update', gameState);
        }
    }

    /**
     * 定期更新UI数据
     */
    public startPeriodicUpdates(): void {
        // 每5秒更新一次UI数据
        Timers.CreateTimer(5.0, () => {
            this.updateClientUI();
            return 5.0; // 重复执行
        });
    }

    /**
     * 根据游戏模式显示对应UI
     */
    public showUIForGameMode(mode: string): void {
        print(`[CustomUIHandler] Showing UI for game mode: ${mode}`);
        
        switch (mode) {
            case 'training':
                CustomGameEventManager.Send_ServerToAllClients('show_custom_panel', {
                    panelType: 'training'
                });
                break;
            case 'autochess':
                CustomGameEventManager.Send_ServerToAllClients('show_custom_panel', {
                    panelType: 'autochess'
                });
                break;
            case 'normal':
            default:
                // 隐藏所有特殊UI
                CustomGameEventManager.Send_ServerToAllClients('hide_all_panels', {});
                break;
        }
    }

    /**
     * 集成到游戏模式管理器
     */
    public integrateWithGameMode(): void {
        // 监听游戏模式变化
        if (GameRules.GameModeManager) {
            // 当游戏模式改变时，自动显示对应UI
            const currentMode = GameRules.GameModeManager.getCurrentMode();
            this.showUIForGameMode(currentMode);
        }

        // 启动定期更新
        this.startPeriodicUpdates();

        print('[CustomUIHandler] Integrated with game mode system');
    }

    /**
     * 处理调试UI命令
     */
    public handleDebugUICommand(command: string, playerId?: PlayerID): void {
        switch (command) {
            case 'show_simple':
                CustomGameEventManager.Send_ServerToAllClients('show_custom_panel', {
                    panelType: 'simple'
                });
                break;
            case 'show_custom':
                CustomGameEventManager.Send_ServerToAllClients('show_custom_panel', {
                    panelType: 'custom'
                });
                break;
            case 'hide_all':
                CustomGameEventManager.Send_ServerToAllClients('hide_all_panels', {});
                break;
            default:
                print(`[CustomUIHandler] Unknown debug UI command: ${command}`);
        }
    }

    /**
     * 处理继续战斗事件
     */
    private onWaveContinue(data: any): void {
        const playerId = data.playerId;
        print(`[CustomUIHandler] Wave continue requested by player ${playerId}`);

        if (GameRules.AutoChessMode) {
            GameRules.AutoChessMode.handleWaveContinue(playerId);
        } else {
            print('[CustomUIHandler] AutoChessMode not available');
        }
    }

    /**
     * 处理领取奖励事件
     */
    private onWaveClaimReward(data: any): void {
        const playerId = data.playerId;
        print(`[CustomUIHandler] Wave reward claim requested by player ${playerId}`);

        if (GameRules.AutoChessMode) {
            GameRules.AutoChessMode.handleWaveRewardClaim(playerId);
        } else {
            print('[CustomUIHandler] AutoChessMode not available');
        }
    }

    /**
     * 处理选择关卡事件
     */
    private onWaveSelectStage(data: any): void {
        print(`[CustomUIHandler] ========== onWaveSelectStage 被调用 ==========`);
        print(`[CustomUIHandler] 原始数据 - playerId: ${data.playerId}, PlayerID: ${data.PlayerID}, stageId: ${data.stageId}`);
        
        // 尝试多种方式获取 playerId
        const playerId = data.playerId !== undefined ? data.playerId : data.PlayerID;
        const stageId = data.stageId;
        
        print(`[CustomUIHandler] 解析后的 playerId: ${playerId}, stageId: ${stageId}`);
        print(`[CustomUIHandler] GameRules.AutoChessMode 存在: ${!!GameRules.AutoChessMode}`);

        if (!playerId && playerId !== 0) {
            print(`[CustomUIHandler] ❌ 错误: playerId 无效 (${playerId})`);
            return;
        }

        if (!stageId) {
            print(`[CustomUIHandler] ❌ 错误: stageId 无效 (${stageId})`);
            return;
        }

        if (GameRules.AutoChessMode) {
            print(`[CustomUIHandler] ✅ 调用 AutoChessMode.handleWaveStageSelection(${playerId}, ${stageId})`);
            GameRules.AutoChessMode.handleWaveStageSelection(playerId, stageId);
        } else {
            print('[CustomUIHandler] ❌ AutoChessMode not available');
            print(`[CustomUIHandler] GameRules 对象: ${GameRules ? '存在' : '不存在'}`);
            print(`[CustomUIHandler] GameRules.AutoChessMode 类型: ${typeof (GameRules as any).AutoChessMode}`);
        }
    }

    /**
     * 处理测试击杀敌人（触发结算界面）
     */
    private handleTestKillEnemies(playerId: PlayerID): void {
        print(`[CustomUIHandler] Test kill enemies requested by player ${playerId}`);

        if (!GameRules.AutoChessMode) {
            print('[CustomUIHandler] AutoChessMode not available');
            return;
        }

        // 获取所有单位
        const allUnits = Entities.FindAllByClassname('npc_dota_creature') as CDOTA_BaseNPC[];
        const heroes = Entities.FindAllByClassname('npc_dota_hero') as CDOTA_BaseNPC[];
        
        let killedCount = 0;

        // 击杀所有非玩家英雄的单位
        for (const unit of allUnits) {
            if (unit && !unit.IsNull() && unit.IsAlive()) {
                // 检查是否是玩家控制的英雄
                const isPlayerHero = heroes.some(hero => 
                    hero === unit && hero.IsRealHero() && hero.GetPlayerOwnerID() >= 0
                );

                if (!isPlayerHero) {
                    unit.ForceKill(false);
                    killedCount++;
                }
            }
        }

        print(`[CustomUIHandler] Test killed ${killedCount} enemy units`);

        // 触发结算界面（测试用）
        // 注意：数据格式需要匹配 battleEndView 期望的格式
        const settlementData = {
            winner: 'player',  // 必须字段
            round: 1,
            duration: 10000,  // 10秒，单位毫秒
            stats: {  // stats 应该是对象，不是数组
                damageDealt: 12540,
                damageTaken: 8320,
                unitsKilled: killedCount,
                unitsSurvived: 1
            },
            levelName: '测试关卡',
            // 可选字段
            rewardGold: 100,
            availableStages: [
                { id: 'stage_easy', name: '绿意平原', difficulty: '简单' },
                { id: 'stage_medium', name: '霜冻峡谷', difficulty: '普通' },
                { id: 'stage_hard', name: '灼炎堡垒', difficulty: '困难' }
            ],
            playerSummary: {
                [playerId]: {
                    health: 100,
                    gold: 500,
                    isAlive: true,
                    winStreak: 0,
                    lossStreak: 0
                }
            }
        };

        // 发送结算事件到客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_wave_settlement', settlementData);
        print(`[CustomUIHandler] Sent settlement event to all clients`);
        print(`[CustomUIHandler] Settlement data - round: ${settlementData.round}, winner: ${settlementData.winner}, duration: ${settlementData.duration}`);
    }

    /**
     * 处理重启游戏请求
     */
    private onRestartGame(data: any): void {
        const playerId = data.PlayerID || 0;
        print(`[CustomUIHandler] 🔄 收到重启游戏请求（玩家 ${playerId}）`);
        
        if ((GameRules as any).AutoChessMode) {
            (GameRules as any).AutoChessMode.restartGame();
        } else {
            print('[CustomUIHandler] ⚠️ AutoChessMode 未初始化');
        }
    }

    /**
     * 处理返回主菜单请求
     */
    private onReturnToMenu(data: any): void {
        const playerId = data.PlayerID || 0;
        print(`[CustomUIHandler] 🏠 收到返回主菜单请求（玩家 ${playerId}）`);
        
        if ((GameRules as any).AutoChessMode) {
            (GameRules as any).AutoChessMode.exitToMenu();
        } else {
            print('[CustomUIHandler] ⚠️ AutoChessMode 未初始化');
        }
    }
}

// 导出单例实例
export const CustomUI = CustomUIHandler.getInstance();
