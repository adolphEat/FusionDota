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
        // 🔑 注意：RegisterListener 的回调参数是 (userId, event)，其中 userId 是玩家ID，event 是数据对象
        CustomGameEventManager.RegisterListener('inventory_deploy_piece', (userId, event: any) => {
            print(`[InventoryHandler] ========== 部署棋子请求 ==========`);
            print(`[InventoryHandler] userId: ${userId}, event: ${event ? 'not nil' : 'nil'}`);
            
            if (!event) {
                print(`[InventoryHandler] ⚠️ event is nil, cannot deploy piece`);
                return;
            }
            
            // userId 是第一个参数（玩家ID），event 是第二个参数（数据对象）
            // 但 event 中也可能包含 playerId，优先使用 event 中的 playerId
            const playerId = (event.PlayerID || event.playerId || userId || 0) as PlayerID;
            
            print(`[InventoryHandler] PlayerId: ${playerId}`);
            print(`[InventoryHandler] PieceId: ${event.pieceId}`);
            print(`[InventoryHandler] UnitName: ${event.unitName}`);
            print(`[InventoryHandler] SlotIndex: ${event.slotIndex}`);
            print(`[InventoryHandler] WorldPos: (${event.worldX}, ${event.worldY}, ${event.worldZ})`);
            
            this.handleDeployPiece(playerId, event);
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

        // 单机模式：获取玩家0的备战席棋子（单机模式只有一个玩家）
        // 注意：getBenchPieces() 不传参数时默认使用玩家0
        const benchPieces = GameRules.AutoChessMode.getBenchPieces();
        print(`[InventoryHandler] 获取玩家 0 的备战席棋子，类型: ${typeof benchPieces}, 数量: ${benchPieces ? (Array.isArray(benchPieces) ? benchPieces.length : Object.keys(benchPieces).length) : 0}`);
        
        // 计算数组长度（兼容数组和 Lua 表）
        let pieceCount = 0;
        if (benchPieces) {
            if (Array.isArray(benchPieces)) {
                pieceCount = benchPieces.length;
            } else {
                // 如果不是数组，可能是 Lua 表，使用 Object.keys 计算长度
                pieceCount = Object.keys(benchPieces).length;
            }
        }
        print(`[InventoryHandler] Sending ${pieceCount} pieces to player ${playerId}`);

        // 构建数组数据
        const piecesData: any[] = [];
        if (benchPieces && pieceCount > 0) {
            if (Array.isArray(benchPieces)) {
                // 标准数组遍历
                for (let i = 0; i < benchPieces.length; i++) {
                    const piece = benchPieces[i];
                    if (piece && piece.id) {
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
            } else {
                // Lua 表：使用 Object.keys 遍历
                const keys = Object.keys(benchPieces);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i] as string;
                    const piece = (benchPieces as any)[key];
                    if (piece && piece.id) {
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
        }
        
        // 获取 piecesData 长度（标准数组）
        const piecesDataLength = piecesData.length;
        print(`[InventoryHandler] piecesData 长度: ${piecesDataLength}`);
        print(`[InventoryHandler] piecesData 类型: ${typeof piecesData}`);
        
        // 打印 piecesData 的每个元素用于调试
        for (let i = 0; i < piecesData.length; i++) {
            const p = piecesData[i];
            print(`[InventoryHandler] piecesData[${i}]: ${p.displayName || 'unknown'}`);
        }

        // 构建发送的数据对象
        const sendData = {
            pieces: piecesData
        };
        
        print(`[InventoryHandler] 准备发送数据，棋子数量: ${piecesDataLength}`);
        
        // 发送给指定玩家
        const player = PlayerResource.GetPlayer(playerId);
        if (player) {
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

        // 单机模式：直接获取玩家状态和备战席
        const playerState = GameRules.AutoChessMode.getPlayerState();
        if (!playerState) {
            print('[InventoryHandler] ⚠️ Player state not found');
            return;
        }

        const slotIndex = data.slotIndex;
        const benchPieces = playerState.benchPieces;
        
        // 兼容 Lua：计算数组长度
        let benchPiecesLength = 0;
        if (benchPieces) {
            if (Array.isArray(benchPieces)) {
                benchPiecesLength = benchPieces.length;
            } else {
                benchPiecesLength = Object.keys(benchPieces).length;
            }
        }
        
        if (slotIndex < 0 || slotIndex >= benchPiecesLength) {
            print(`[InventoryHandler] ⚠️ Invalid slot index: ${slotIndex}, benchPiecesLength: ${benchPiecesLength}`);
            return;
        }

        // 兼容 Lua 1-based 索引：在 Lua 中数组从 1 开始
        // slotIndex 来自客户端，是 0-based，需要转换
        const luaIndex = slotIndex + 1;
        const piece = benchPieces[luaIndex] || benchPieces[slotIndex];
        if (!piece) {
            print(`[InventoryHandler] ⚠️ No piece in slot ${slotIndex} (luaIndex: ${luaIndex})`);
            return;
        }

        // 获取世界坐标对应的棋盘格子
        const worldX = data.worldX as number;
        const worldY = data.worldY as number;
        
        if (worldX === undefined || worldY === undefined) {
            print(`[InventoryHandler] ⚠️ Missing world coordinates`);
            this.sendDeploymentFeedback(playerId, false, '坐标无效', slotIndex);
            return;
        }
        
        const boardPosition = this.worldToBoardPosition(worldX, worldY, playerId);
        
        if (!boardPosition) {
            print(`[InventoryHandler] ⚠️ Position outside player's half`);
            this.sendDeploymentFeedback(playerId, false, '只能放置在己方半场（下半区）', slotIndex);
            return;
        }

        print(`[InventoryHandler] Deploying ${piece.displayName} to board position (${boardPosition.x}, ${boardPosition.y})`);

        // 单机模式：获取当前游戏阶段
        const currentPhase = GameRules.AutoChessMode.getCurrentPhase();
        // 单机模式：暂时允许任何阶段部署（方便测试）
        // 如果需要限制，可以取消下面的注释
        // if (currentPhase !== 'preparation' && currentPhase !== 'planning') {
        //     print(`[InventoryHandler] ⚠️ Cannot deploy during ${currentPhase} phase`);
        //     this.sendDeploymentFeedback(playerId, false, '只能在准备阶段部署');
        //     return;
        // }
        print(`[InventoryHandler] 当前阶段: ${currentPhase}，允许部署`);

        // 部署棋子
        const success = this.deployPieceToBoard(playerId, piece, boardPosition, slotIndex);
        
        if (success) {
            // 从备战席移除 - 使用兼容 Lua 的方式
            // 不使用 splice，而是重建数组
            this.removePieceFromBench(playerState, slotIndex);
            print(`[InventoryHandler] ✅ Piece deployed successfully`);
            
            // 🔑 先发送成功反馈，让客户端立即更新UI
            this.sendDeploymentFeedback(playerId, true, `${piece.displayName} 已部署`, slotIndex);
            
            // 🔑 延迟发送背包数据更新，确保数据已经正确移除
            // 使用延迟确保 removePieceFromBench 已经完成
            Timers.CreateTimer(0.1, () => {
                print(`[InventoryHandler] 🔄 延迟发送背包数据更新`);
                this.sendInventoryData(playerId);
                return; // 不重复执行
            });
        } else {
            print(`[InventoryHandler] ❌ Failed to deploy piece`);
            this.sendDeploymentFeedback(playerId, false, '部署失败', slotIndex);
        }
    }
    
    /**
     * 从备战席移除棋子（兼容 Lua）
     * 不使用 splice，而是使用 table.remove 或重建数组
     */
    private removePieceFromBench(playerState: any, slotIndex: number): void {
        const benchPieces = playerState.benchPieces;
        if (!benchPieces) {
            print(`[InventoryHandler] ⚠️ removePieceFromBench: benchPieces is null or undefined`);
            return;
        }
        
        print(`[InventoryHandler] 🔄 removePieceFromBench: slotIndex=${slotIndex}, benchPieces类型=${typeof benchPieces}, 是数组=${Array.isArray(benchPieces)}`);
        
        // 🔑 方法1：重建数组（更安全可靠）
        const newBenchPieces: any[] = [];
        if (Array.isArray(benchPieces)) {
            // 标准数组：直接遍历
            for (let i = 0; i < benchPieces.length; i++) {
                if (i !== slotIndex) {
                    newBenchPieces.push(benchPieces[i]);
                } else {
                    print(`[InventoryHandler] 跳过索引 ${i}（要移除的棋子）`);
                }
            }
            print(`[InventoryHandler] 重建数组移除棋子，原长度: ${benchPieces.length}, 新长度: ${newBenchPieces.length}`);
        } else {
            // Lua 表：使用 Object.keys 遍历
            const keys = Object.keys(benchPieces);
            let currentIndex = 0;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i] as string;
                if (currentIndex !== slotIndex) {
                    newBenchPieces.push((benchPieces as any)[key]);
                } else {
                    print(`[InventoryHandler] 跳过索引 ${currentIndex}（要移除的棋子）`);
                }
                currentIndex++;
            }
            print(`[InventoryHandler] 重建Lua表移除棋子，原长度: ${keys.length}, 新长度: ${newBenchPieces.length}`);
        }
        
        // 🔑 更新 playerState.benchPieces
        playerState.benchPieces = newBenchPieces;
        print(`[InventoryHandler] ✅ 棋子已从备战席移除`);
    }

    // 棋盘配置（与 ChessBattleSystem 保持一致）
    private readonly BOARD_SIZE = 8;
    private readonly CELL_SIZE = 128;
    private readonly BOARD_OFFSET_X = 1058;  // 棋盘中心X
    private readonly BOARD_OFFSET_Y = 978;   // 棋盘中心Y

    // 玩家半场：Y = 0-3，敌方半场：Y = 4-7
    private readonly PLAYER_HALF_MAX_Y = 3;

    /**
     * 将世界坐标转换为棋盘格子坐标
     * 注意：玩家只能在自己的半场（Y=0-3）部署棋子
     */
    private worldToBoardPosition(worldX: number, worldY: number, playerId: PlayerID): BoardPosition | null {
        // 计算棋盘的总尺寸和中心偏移
        const boardTotalSize = this.BOARD_SIZE * this.CELL_SIZE; // 8 * 128 = 1024
        const centerOffset = boardTotalSize / 2; // 512
        
        // 计算玩家棋盘偏移（多玩家时每个玩家有独立棋盘）
        const playerOffset = playerId >= 0 ? playerId * 2000 : 0;
        
        // 棋盘左下角的世界坐标
        const boardStartX = this.BOARD_OFFSET_X - centerOffset + playerOffset;
        const boardStartY = this.BOARD_OFFSET_Y - centerOffset;
        
        // 计算点击位置相对于棋盘的偏移
        const relativeX = worldX - boardStartX;
        const relativeY = worldY - boardStartY;
        
        // 转换为格子坐标
        const gridX = Math.floor(relativeX / this.CELL_SIZE);
        const gridY = Math.floor(relativeY / this.CELL_SIZE);
        
        print(`[InventoryHandler] 🎯 世界坐标(${worldX.toFixed(1)}, ${worldY.toFixed(1)}) → 棋盘格子(${gridX}, ${gridY})`);
        
        // 验证X范围（0-7）
        if (gridX < 0 || gridX >= this.BOARD_SIZE) {
            print(`[InventoryHandler] ⚠️ X坐标超出棋盘范围: ${gridX}`);
            return null;
        }
        
        // 验证Y范围：玩家只能在自己的半场（Y=0-3）部署
        if (gridY < 0 || gridY > this.PLAYER_HALF_MAX_Y) {
            print(`[InventoryHandler] ⚠️ Y坐标超出玩家半场范围: ${gridY} (允许范围: 0-${this.PLAYER_HALF_MAX_Y})`);
            return null;
        }
        
        return { x: gridX, y: gridY };
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
            // 使用 piece.id (如 'axe') 而不是 piece.unitName (如 'npc_dota_hero_axe')
            (battleSystem as any).deployPiece(playerId, piece.id, position);
            
            print(`[InventoryHandler] ✅ Deployed ${piece.id} (${piece.displayName}) at (${position.x}, ${position.y})`);
            return true;
        } catch (error) {
            print(`[InventoryHandler] ❌ Deploy error: ${error}`);
            return false;
        }
    }

    /**
     * 发送部署反馈到客户端
     */
    private sendDeploymentFeedback(playerId: PlayerID, success: boolean, message: string, slotIndex?: number): void {
        const player = PlayerResource.GetPlayer(playerId);
        if (player) {
            (CustomGameEventManager.Send_ServerToPlayer as any)(player, 'deployment_feedback', {
                success: success,
                message: message,
                slotIndex: slotIndex !== undefined ? slotIndex : -1
            });
            print(`[InventoryHandler] 📤 Feedback: ${success ? '✅' : '❌'} ${message}, slotIndex: ${slotIndex}`);
        }
    }
}

// 导出单例
export const inventoryHandler = InventoryHandler.getInstance();

