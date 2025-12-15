/**
 * Inventory Handler - 背包处理模块
 * 处理单机自走棋模式下的棋子背包逻辑
 */

import type { ChessPiece } from './AutoChessMode';
import type { BoardPosition } from './autochess/ChessBattleSystem';

export class InventoryHandler {
    private static instance: InventoryHandler;

    private constructor() {
        this.registerEventHandlers();
    }

    public static getInstance(): InventoryHandler {
        if (!InventoryHandler.instance) {
            InventoryHandler.instance = new InventoryHandler();
        }
        return InventoryHandler.instance;
    }

    /**
     * 注册事件监听
     */
    private registerEventHandlers(): void {
        // 客户端请求背包数据
        (CustomGameEventManager.RegisterListener as any)('request_inventory_data', (_: any, data: any) => {
            print(`[InventoryHandler] ========== 收到背包数据请求 ==========`);
            print(`[InventoryHandler] data 是否为 nil: ${data == null}`);
            
            if (!data) {
                print(`[InventoryHandler] ⚠️ data is nil, using default playerId 0`);
                this.sendInventoryData(0 as PlayerID);
                return;
            }
            
            const playerId = (data.PlayerID || data.playerId || 0) as PlayerID;
            print(`[InventoryHandler] Player ${playerId} requested inventory data`);
            this.sendInventoryData(playerId);
        });

        // 客户端部署棋子
        (CustomGameEventManager.RegisterListener as any)('inventory_deploy_piece', (_: any, data: any) => {
            print(`[InventoryHandler] ========== 部署棋子请求 ==========`);
            
            if (!data) {
                print(`[InventoryHandler] ⚠️ data is nil, cannot deploy piece`);
                return;
            }
            
            const playerId = (data.PlayerID || data.playerId || 0) as PlayerID;
            print(`[InventoryHandler] PlayerId: ${playerId}`);
            print(`[InventoryHandler] PieceId: ${data.pieceId}`);
            print(`[InventoryHandler] UnitName: ${data.unitName}`);
            print(`[InventoryHandler] SlotIndex: ${data.slotIndex}`);
            print(`[InventoryHandler] Cursor: (${data.cursorX}, ${data.cursorY})`);
            
            this.handleDeployPiece(playerId, data);
        });

        print('[InventoryHandler] Event handlers registered');
    }

    /**
     * 发送背包数据到客户端
     */
    public sendInventoryData(playerId: PlayerID): void {
        print(`[InventoryHandler] ========== sendInventoryData ==========`);
        print(`[InventoryHandler] playerId: ${playerId}`);
        
        if (!GameRules.AutoChessMode) {
            print('[InventoryHandler] ⚠️ AutoChessMode not initialized');
            return;
        }

        const playerState = (GameRules.AutoChessMode as any).gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[InventoryHandler] ⚠️ Player ${playerId} state not found`);
            return;
        }

        print(`[InventoryHandler] playerState found: ${playerState != null}`);
        print(`[InventoryHandler] playerState.benchPieces 类型: ${typeof playerState.benchPieces}`);
        
        const benchPieces = playerState.benchPieces || [];
        const pieceCount = benchPieces.length || 0;
        print(`[InventoryHandler] Sending ${pieceCount} pieces to player ${playerId}`);

        // 手动构建数组，避免使用 Lua 不支持的 map 方法
        const piecesData: any[] = [];
        if (benchPieces && pieceCount > 0) {
            for (let i = 0; i < pieceCount; i++) {
                const piece = benchPieces[i];
                if (piece) {
                    piecesData.push({
                        id: piece.id,
                        unitName: piece.unitName,
                        displayName: piece.displayName,
                        rarity: piece.rarity,
                        cost: piece.cost,
                        race: piece.race,
                        class: piece.class,
                        health: piece.health,
                        damage: piece.damage,
                        armor: piece.armor,
                        attackRange: piece.attackRange
                    });
                    print(`[InventoryHandler] 添加棋子 ${i}: ${piece.displayName}`);
                }
            }
        }
        
        print(`[InventoryHandler] piecesData 长度: ${piecesData.length}`);
        print(`[InventoryHandler] piecesData 类型: ${typeof piecesData}`);
        
        // 打印 piecesData 的每个元素用于调试
        for (let i = 0; i < piecesData.length; i++) {
            const p = piecesData[i];
            print(`[InventoryHandler] piecesData[${i}]: ${p.displayName || 'unknown'}`);
        }

        const player = PlayerResource.GetPlayer(playerId);
        print(`[InventoryHandler] player 对象: ${player != null}`);
        
        if (player) {
            // 构建发送的数据对象
            const sendData = {
                pieces: piecesData
            };
            
            print(`[InventoryHandler] 准备发送数据...`);
            print(`[InventoryHandler] sendData.pieces 类型: ${typeof sendData.pieces}`);
            print(`[InventoryHandler] sendData.pieces 长度: ${sendData.pieces.length}`);
            
            (CustomGameEventManager.Send_ServerToPlayer as any)(player, 'update_inventory_data', sendData);
            print(`[InventoryHandler] ✅ Inventory data sent to player ${playerId}`);
        }
    }

    /**
     * 处理棋子部署
     */
    private handleDeployPiece(playerId: PlayerID, data: any): void {
        if (!GameRules.AutoChessMode) {
            print('[InventoryHandler] ⚠️ AutoChessMode not initialized');
            return;
        }

        const autoChessMode = GameRules.AutoChessMode as any;
        const playerState = autoChessMode.gameState.playerStates.get(playerId);
        
        if (!playerState) {
            print(`[InventoryHandler] ⚠️ Player ${playerId} state not found`);
            return;
        }

        const slotIndex = data.slotIndex;
        const benchPieces = playerState.benchPieces || [];
        
        if (slotIndex < 0 || slotIndex >= benchPieces.length) {
            print(`[InventoryHandler] ⚠️ Invalid slot index: ${slotIndex}`);
            return;
        }

        const piece = benchPieces[slotIndex];
        if (!piece) {
            print(`[InventoryHandler] ⚠️ No piece in slot ${slotIndex}`);
            return;
        }

        // 获取鼠标位置对应的棋盘格子
        const boardPosition = this.cursorToBoardPosition(data.cursorX, data.cursorY);
        
        if (!boardPosition) {
            print(`[InventoryHandler] ⚠️ Invalid board position from cursor`);
            this.sendDeploymentFeedback(playerId, false, '无效位置');
            return;
        }

        print(`[InventoryHandler] Deploying ${piece.displayName} to board position (${boardPosition.x}, ${boardPosition.y})`);

        // 检查当前游戏阶段
        const currentPhase = autoChessMode.currentPhase;
        if (currentPhase !== 'preparation' && currentPhase !== 'planning') {
            print(`[InventoryHandler] ⚠️ Cannot deploy during ${currentPhase} phase`);
            this.sendDeploymentFeedback(playerId, false, '只能在准备阶段部署');
            return;
        }

        // 部署棋子
        const success = this.deployPieceToBoard(playerId, piece, boardPosition, slotIndex);
        
        if (success) {
            // 从备战席移除
            benchPieces.splice(slotIndex, 1);
            print(`[InventoryHandler] ✅ Piece deployed successfully`);
            
            // 更新客户端背包
            this.sendInventoryData(playerId);
            
            // 发送成功反馈
            this.sendDeploymentFeedback(playerId, true, `${piece.displayName} 已部署`);
        } else {
            print(`[InventoryHandler] ❌ Failed to deploy piece`);
            this.sendDeploymentFeedback(playerId, false, '部署失败');
        }
    }

    /**
     * 将鼠标屏幕坐标转换为棋盘坐标
     */
    private cursorToBoardPosition(screenX: number, screenY: number): BoardPosition | null {
        // 这里需要根据实际棋盘布局实现坐标转换
        // 简化实现：根据屏幕位置估算棋盘格子
        
        // 棋盘范围（需要根据实际地图调整）
        const BOARD_START_X = 500;  // 棋盘起始世界X坐标
        const BOARD_START_Y = 500;  // 棋盘起始世界Y坐标
        const CELL_SIZE = 128;      // 每个格子的大小
        
        // 简单的屏幕到世界坐标转换（实际应该使用 GameUI.GetScreenWorldPosition）
        // 这里使用简化算法
        const worldX = BOARD_START_X + (screenX / 1920) * 1024;
        const worldY = BOARD_START_Y + (screenY / 1080) * 768;
        
        const gridX = Math.floor((worldX - BOARD_START_X) / CELL_SIZE);
        const gridY = Math.floor((worldY - BOARD_START_Y) / CELL_SIZE);
        
        // 验证范围（8x8棋盘）
        if (gridX >= 0 && gridX < 8 && gridY >= 0 && gridY < 8) {
            return { x: gridX, y: gridY };
        }
        
        return null;
    }

    /**
     * 部署棋子到棋盘
     */
    private deployPieceToBoard(
        playerId: PlayerID,
        piece: ChessPiece,
        position: BoardPosition,
        slotIndex: number
    ): boolean {
        if (!GameRules.AutoChessMode) return false;

        const autoChessMode = GameRules.AutoChessMode as any;
        const battleSystem = autoChessMode.battleSystem;

        if (!battleSystem) {
            print('[InventoryHandler] ⚠️ BattleSystem not found');
            return false;
        }

        try {
            // 调用 ChessBattleSystem 的部署方法
            (battleSystem as any).deployPiece(playerId, piece.unitName, position);
            
            print(`[InventoryHandler] ✅ Deployed ${piece.unitName} at (${position.x}, ${position.y})`);
            return true;
        } catch (error) {
            print(`[InventoryHandler] ❌ Deploy error: ${error}`);
            return false;
        }
    }

    /**
     * 发送部署反馈到客户端
     */
    private sendDeploymentFeedback(playerId: PlayerID, success: boolean, message: string): void {
        const player = PlayerResource.GetPlayer(playerId);
        if (player) {
            (CustomGameEventManager.Send_ServerToPlayer as any)(player, 'deployment_feedback', {
                success: success,
                message: message
            });
        }
    }
}

// 导出单例
export const inventoryHandler = InventoryHandler.getInstance();

