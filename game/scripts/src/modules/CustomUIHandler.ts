/**
 * 自定义UI事件处理器
 * 处理来自客户端UI的事件
 */

export class CustomUIHandler {
    private static instance: CustomUIHandler;

    private constructor() {
        this.registerEventHandlers();
        print('[CustomUIHandler] Initialized');
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
}

// 导出单例实例
export const CustomUI = CustomUIHandler.getInstance();
