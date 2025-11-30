/**
 * 自走棋战斗系统
 * Auto Chess Battle System
 * 
 * 管理玩家棋子部署和战斗
 */

import { ChessPiece, ChessRarity } from '../AutoChessMode';
import { unitFactory } from '../UnitFactory';
import { getTimestampMs } from '../../utils/time_utils';
import { WaveConfigSystem } from './WaveConfigSystem';

/**
 * 棋盘位置
 */
export interface BoardPosition {
    x: number;  // 0-7
    y: number;  // 0-7
}

/**
 * 部署的棋子
 */
export interface DeployedPiece {
    pieceId: string;
    unit: CDOTA_BaseNPC;
    position: BoardPosition;
    team: DotaTeam;
    ownerId: PlayerID;
}

/**
 * 战斗配对
 */
export interface BattleMatch {
    player1: PlayerID;
    player2: PlayerID;
    player1Pieces: DeployedPiece[];
    player2Pieces: DeployedPiece[];
    winnerId?: PlayerID;
    completed: boolean;
}

export class ChessBattleSystem {
    private static instance: ChessBattleSystem;
    private activeBattles: Map<string, BattleMatch>;  // battleId -> BattleMatch
    private playerDeployedPieces: Map<PlayerID, DeployedPiece[]>;
    private waveConfigSystem: WaveConfigSystem;
    
    // 持久化：上一场战斗幸存棋子的血量（按 pieceId 顺序消费）
    private playerSurvivorHealth: Map<PlayerID, Array<{ pieceId: string; health: number }>> = new Map();
    
    // 棋盘配置
    private readonly BOARD_SIZE = 8;
    private readonly CELL_SIZE = 128;  // 每格大小
    private readonly BOARD_OFFSET = Vector(1058, 978, 200);  // 棋盘起始位置（实际地图中心，Z轴提高避免地形问题）

    private constructor() {
        this.activeBattles = new Map();
        this.playerDeployedPieces = new Map();
        this.waveConfigSystem = WaveConfigSystem.getInstance();
        this.initialize();
        print('[ChessBattleSystem] Initialized');
    }

    public static getInstance(): ChessBattleSystem {
        if (!ChessBattleSystem.instance) {
            ChessBattleSystem.instance = new ChessBattleSystem();
        }
        return ChessBattleSystem.instance;
    }

    /**
     * 初始化系统
     */
    private initialize(): void {
        // 注册事件监听
        this.registerEvents();
    }

    /**
     * 注册事件
     */
    private registerEvents(): void {
        // 玩家部署棋子
        CustomGameEventManager.RegisterListener('deploy_chess_piece', (userId, event) => {
            const playerId = (event as any).PlayerID as PlayerID;
            const pieceId = (event as any).pieceId as string;
            const position = (event as any).position as BoardPosition;
            this.deployPiece(playerId, pieceId, position);
        });

        // 玩家撤回棋子
        CustomGameEventManager.RegisterListener('recall_chess_piece', (userId, event) => {
            const playerId = (event as any).PlayerID as PlayerID;
            const position = (event as any).position as BoardPosition;
            this.recallPiece(playerId, position);
        });
    }

    /**
     * 设置玩家为受保护状态（无敌但保持正常移动和可见）
     */
    public setPlayerAsProtected(playerId: PlayerID): void {
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero || hero.IsNull()) {
            return;
        }

        // 设置为无敌（防止被攻击）
        hero.AddNewModifier(hero, undefined, 'modifier_invulnerable', {});
        
        // 禁止攻击（防止攻击棋子）
        hero.AddNewModifier(hero, undefined, 'modifier_disarmed', {});
        
        // 确保可以移动且可控
        hero.SetMoveCapability(UnitMoveCapability.GROUND);
        hero.SetControllableByPlayer(playerId, true);
        hero.RemoveModifierByName('modifier_rooted');
        hero.RemoveModifierByName('modifier_stunned');

        // 移动到观战位置（靠近棋盘，落在地面上，可行走）
        const spectatorPos = this.getSpectatorPosition(playerId);
        const groundPos = GetGroundPosition(spectatorPos, hero);
        FindClearSpaceForUnit(hero, groundPos, true);
        hero.AddNewModifier(hero, undefined, 'modifier_phased', { duration: 0.03 });
        
        print(`[ChessBattleSystem] Player ${playerId} set as protected and moved to spectator position`);
    }

    /**
     * 恢复玩家正常状态
     */
    public restorePlayerNormalState(playerId: PlayerID): void {
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero || hero.IsNull()) {
            return;
        }

        // 移除无敌状态
        hero.RemoveModifierByName('modifier_invulnerable');
        
        // 移除禁止攻击状态
        hero.RemoveModifierByName('modifier_disarmed');
        
        print(`[ChessBattleSystem] Player ${playerId} restored to normal state`);
    }

    /**
     * 将玩家移动到观战区域（准备阶段）
     */
    public movePlayerToSpectatorArea(playerId: PlayerID): void {
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero || hero.IsNull()) {
            return;
        }

        // 移动到观战位置（不设置保护状态）
        const spectatorPos = this.getSpectatorPosition(playerId);
        hero.SetAbsOrigin(spectatorPos);
        
        print(`[ChessBattleSystem] Player ${playerId} moved to spectator area`);
    }

    /**
     * 设置玩家为无敌观察者（完全观察者模式）
     */
    public setPlayerAsSpectator(playerId: PlayerID): void {
        const hero = PlayerResource.GetSelectedHeroEntity(playerId);
        if (!hero || hero.IsNull()) {
            return;
        }

        // 设置为无敌
        hero.AddNewModifier(hero, undefined, 'modifier_invulnerable', {});
        
        // 禁止攻击
        hero.AddNewModifier(hero, undefined, 'modifier_disarmed', {});
        
        // 设置为中立
        hero.SetTeam(DotaTeam.NEUTRALS);
        
        // 隐藏（可选）
        hero.AddNoDraw();
        
        // 移动到观战位置
        const spectatorPos = this.getSpectatorPosition(playerId);
        hero.SetAbsOrigin(spectatorPos);
        
        print(`[ChessBattleSystem] Player ${playerId} set as spectator`);
    }

    /**
     * 获取观战位置
     */
    private getSpectatorPosition(playerId: PlayerID): Vector {
        // 地图中心位置 (与棋盘同心)
        const mapCenter = Vector(this.BOARD_OFFSET.x, this.BOARD_OFFSET.y, 0);
        
        // 根据玩家ID计算观战位置（在棋盘边缘外圈，避免高台）
        const angle = (playerId / 8) * 2 * Math.PI;
        const ringDistance = (this.BOARD_SIZE * this.CELL_SIZE) / 2 + 200; // 棋盘半径外再偏移200
        const x = mapCenter.x + Math.cos(angle) * ringDistance;
        const y = mapCenter.y + Math.sin(angle) * ringDistance;
        
        // 使用地表高度，避免被放到高处
        const pos = Vector(x, y, 0);
        const ground = GetGroundPosition(pos, undefined as any);
        
        print(`[ChessBattleSystem] Spectator position for player ${playerId}: (${ground.x.toFixed(1)}, ${ground.y.toFixed(1)}, ${ground.z.toFixed(1)})`);
        return ground;
    }

    /**
     * 部署棋子到棋盘
     */
    public deployPiece(playerId: PlayerID, pieceId: string, position: BoardPosition): boolean {
        // 验证位置
        if (!this.isValidPosition(position)) {
            print(`[ChessBattleSystem] Invalid position: ${position.x}, ${position.y}`);
            return false;
        }

        // 检查位置是否已占用
        if (this.isPieceAtPosition(playerId, position)) {
            print(`[ChessBattleSystem] Position already occupied`);
            return false;
        }

        // 获取棋子定义（从AutoChessMode的数据库）
        const chessPiece = this.getChessPieceDefinition(pieceId);
        if (!chessPiece) {
            print(`[ChessBattleSystem] Chess piece not found: ${pieceId}`);
            return false;
        }

        // 创建单位
        const worldPos = this.boardToWorldPosition(position, playerId);
        const team = this.getPlayerTeam(playerId);
        
        const unit = CreateUnitByName(
            chessPiece.unitName,
            worldPos,
            true,
            undefined,
            undefined,
            team
        );

        if (!unit || unit.IsNull()) {
            print(`[ChessBattleSystem] Failed to create unit: ${chessPiece.unitName}`);
            return false;
        }

        // 应用棋子属性
        this.applyChessPieceStats(unit, chessPiece);

        // 若存在上一场的剩余血量，设置为初始血量（按 pieceId 顺序消费）
        const survivorList = this.playerSurvivorHealth.get(playerId);
        if (survivorList && survivorList.length > 0) {
            const idx = survivorList.findIndex(s => s.pieceId === pieceId);
            if (idx !== -1) {
                const val = survivorList.splice(idx, 1)[0];
                const maxHp = unit.GetMaxHealth();
                unit.SetHealth(Math.max(1, Math.min(val.health, maxHp)));
                print(`[ChessBattleSystem] Apply survivor HP ${val.health} to ${pieceId}`);
            }
            // 若该玩家列表消费完，清空存根
            if (survivorList.length === 0) {
                this.playerSurvivorHealth.delete(playerId);
            } else {
                this.playerSurvivorHealth.set(playerId, survivorList);
            }
        }

        // 记录部署的棋子
        const deployed: DeployedPiece = {
            pieceId: pieceId,
            unit: unit,
            position: position,
            team: team,
            ownerId: playerId
        };

        const playerPieces = this.playerDeployedPieces.get(playerId) || [];
        playerPieces.push(deployed);
        this.playerDeployedPieces.set(playerId, playerPieces);

        print(`[ChessBattleSystem] Player ${playerId} deployed ${pieceId} at (${position.x}, ${position.y})`);
        return true;
    }

    /**
     * 撤回棋子
     */
    public recallPiece(playerId: PlayerID, position: BoardPosition): boolean {
        const playerPieces = this.playerDeployedPieces.get(playerId);
        if (!playerPieces) {
            return false;
        }

        const index = playerPieces.findIndex(p => 
            p.position.x === position.x && p.position.y === position.y
        );

        if (index === -1) {
            return false;
        }

        const piece = playerPieces[index];
        
        // 移除单位
        if (piece.unit && !piece.unit.IsNull()) {
            piece.unit.RemoveSelf();
        }

        // 从列表中移除
        playerPieces.splice(index, 1);
        this.playerDeployedPieces.set(playerId, playerPieces);

        print(`[ChessBattleSystem] Player ${playerId} recalled piece from (${position.x}, ${position.y})`);
        return true;
    }

    /**
     * 清空玩家所有棋子
     */
    public clearPlayerPieces(playerId: PlayerID): void {
        const playerPieces = this.playerDeployedPieces.get(playerId);
        if (!playerPieces) {
            return;
        }

        for (const piece of playerPieces) {
            if (piece.unit && !piece.unit.IsNull()) {
                piece.unit.RemoveSelf();
            }
        }

        this.playerDeployedPieces.delete(playerId);
        print(`[ChessBattleSystem] Cleared all pieces for player ${playerId}`);
    }

    /**
     * 开始战斗（玩家 vs 玩家）
     */
    public startBattle(player1: PlayerID, player2: PlayerID): string {
        const battleId = `battle_${player1}_vs_${player2}_${getTimestampMs()}`;

        // 获取双方棋子
        const player1Pieces = this.playerDeployedPieces.get(player1) || [];
        const player2Pieces = this.playerDeployedPieces.get(player2) || [];

        // 创建战斗记录
        const battle: BattleMatch = {
            player1: player1,
            player2: player2,
            player1Pieces: player1Pieces,
            player2Pieces: player2Pieces,
            completed: false
        };

        this.activeBattles.set(battleId, battle);

        // 开始战斗逻辑
        this.executeBattle(battleId);

        print(`[ChessBattleSystem] Started battle: ${battleId}`);
        return battleId;
    }

    /**
     * 开始战斗（玩家 vs AI）
     */
    public startBattleVsAI(playerId: PlayerID, aiLevel: number = 1): string {
        const battleId = `battle_${playerId}_vs_ai_${getTimestampMs()}`;

        // 获取玩家棋子
        const playerPieces = this.playerDeployedPieces.get(playerId) || [];

        // 生成AI棋子
        const aiPieces = this.generateAIPieces(aiLevel);

        // 创建战斗记录
        const battle: BattleMatch = {
            player1: playerId,
            player2: -1,  // AI没有玩家ID
            player1Pieces: playerPieces,
            player2Pieces: aiPieces,
            completed: false
        };

        this.activeBattles.set(battleId, battle);

        // 开始战斗逻辑
        this.executeBattle(battleId);

        print(`[ChessBattleSystem] Started battle vs AI: ${battleId}`);
        return battleId;
    }

    /**
     * 生成AI棋子阵容
     */
    private generateAIPieces(level: number): DeployedPiece[] {
        const aiPieces: DeployedPiece[] = [];
        const pieceCount = Math.min(3 + level, 8);  // AI棋子数量随等级增加

        // 获取可用的棋子列表
        const availablePieces = this.getAvailableChessPieces();

        for (let i = 0; i < pieceCount; i++) {
            // 随机选择一个棋子
            const randomPiece = availablePieces[RandomInt(0, availablePieces.length - 1)];
            
            // 随机位置（敌方区域）
            const position: BoardPosition = {
                x: RandomInt(0, 7),
                y: RandomInt(4, 7)  // 敌方半场
            };

            // 创建敌方单位
            const worldPos = this.boardToWorldPosition(position, -1);
            const unit = CreateUnitByName(
                randomPiece.unitName,
                worldPos,
                true,
                undefined,
                undefined,
                DotaTeam.BADGUYS
            );

            if (unit && !unit.IsNull()) {
                this.applyChessPieceStats(unit, randomPiece);

                aiPieces.push({
                    pieceId: randomPiece.id,
                    unit: unit,
                    position: position,
                    team: DotaTeam.BADGUYS,
                    ownerId: -1
                });
            }
        }

        return aiPieces;
    }

    /**
     * 执行战斗
     */
    private executeBattle(battleId: string): void {
        const battle = this.activeBattles.get(battleId);
        if (!battle) {
            return;
        }

        // 让棋子开始攻击（AI自动寻找目标）
        for (const piece of battle.player1Pieces) {
            if (piece.unit && !piece.unit.IsNull()) {
                // 设置为主动攻击
                piece.unit.SetIdleAcquire(true);
                piece.unit.SetAcquisitionRange(2000);
            }
        }

        for (const piece of battle.player2Pieces) {
            if (piece.unit && !piece.unit.IsNull()) {
                piece.unit.SetIdleAcquire(true);
                piece.unit.SetAcquisitionRange(2000);
            }
        }

        // 定期检查战斗是否结束
        this.checkBattleStatus(battleId);
    }

    /**
     * 检查战斗状态
     */
    private checkBattleStatus(battleId: string): void {
        Timers.CreateTimer(1.0, () => {
            const battle = this.activeBattles.get(battleId);
            if (!battle || battle.completed) {
                return undefined;
            }

            // 统计存活棋子
            const player1Alive = battle.player1Pieces.filter(p => 
                p.unit && !p.unit.IsNull() && p.unit.IsAlive()
            ).length;

            const player2Alive = battle.player2Pieces.filter(p => 
                p.unit && !p.unit.IsNull() && p.unit.IsAlive()
            ).length;

            // 判断胜负
            if (player1Alive === 0 || player2Alive === 0) {
                battle.winnerId = player1Alive > 0 ? battle.player1 : battle.player2;
                battle.completed = true;
                this.onBattleComplete(battleId);
                return undefined;
            }

            return 1.0;  // 继续检查
        });
    }

    /**
     * 战斗完成处理
     */
    private onBattleComplete(battleId: string): void {
        const battle = this.activeBattles.get(battleId);
        if (!battle) {
            return;
        }

        // 记录双方幸存棋子的当前血量，供下一场作为初始血量
        this.recordSurvivorHealth(battle);

        print(`[ChessBattleSystem] Battle ${battleId} completed. Winner: ${battle.winnerId}`);

        // 取快照用于测试重开一局
        const playerSnapshot: Array<{ pieceId: string; position: BoardPosition }> = battle.player1Pieces
            .filter(p => p.unit && !p.unit.IsNull() && p.unit.IsAlive())
            .map(p => ({ pieceId: p.pieceId, position: { x: p.position.x, y: p.position.y } }));
        const playerIdForTest = battle.player1;

        // 清理战场
        this.cleanupBattle(battleId);

        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('battle_completed', {
            battleId: battleId,
            winnerId: battle.winnerId,
            player1: battle.player1,
            player2: battle.player2
        });

        // 通知 AutoChessMode 战斗已完成（让它处理结算逻辑）
        if (GameRules.AutoChessMode) {
            print('[ChessBattleSystem] Notifying AutoChessMode of battle completion');
            // AutoChessMode 会在 calculateBattleResults 中处理，这里不再自动重启
        }
    }

    /**
     * 清理战斗
     */
    private cleanupBattle(battleId: string): void {
        const battle = this.activeBattles.get(battleId);
        if (!battle) {
            return;
        }

        // 移除所有棋子
        const allPieces = [...battle.player1Pieces, ...battle.player2Pieces];
        for (const piece of allPieces) {
            if (piece.unit && !piece.unit.IsNull()) {
                piece.unit.RemoveSelf();
            }
        }

        this.activeBattles.delete(battleId);
    }

    /**
     * 棋盘坐标转世界坐标
     */
    private boardToWorldPosition(position: BoardPosition, playerId: PlayerID): Vector {
        // 计算棋盘的总尺寸
        const boardTotalSize = this.BOARD_SIZE * this.CELL_SIZE; // 8 * 128 = 1024
        
        // 让棋盘以地图中心为中心，所以需要减去一半尺寸
        const centerOffset = boardTotalSize / 2; // 512
        
        const baseX = this.BOARD_OFFSET.x + position.x * this.CELL_SIZE - centerOffset;
        const baseY = this.BOARD_OFFSET.y + position.y * this.CELL_SIZE - centerOffset;
        
        // 根据玩家ID偏移棋盘（多个战场）
        const playerOffset = playerId >= 0 ? playerId * 2000 : 0;
        
        const finalPos = Vector(baseX + playerOffset, baseY, this.BOARD_OFFSET.z);
        
        print(`[ChessBattleSystem] 🎯 位置转换: 棋盘(${position.x},${position.y}) → 世界(${finalPos.x.toFixed(1)},${finalPos.y.toFixed(1)},${finalPos.z.toFixed(1)})`);
        
        return finalPos;
    }

    /**
     * 验证位置合法性
     */
    private isValidPosition(position: BoardPosition): boolean {
        return position.x >= 0 && position.x < this.BOARD_SIZE &&
               position.y >= 0 && position.y < this.BOARD_SIZE;
    }

    /**
     * 检查位置是否有棋子
     */
    private isPieceAtPosition(playerId: PlayerID, position: BoardPosition): boolean {
        const playerPieces = this.playerDeployedPieces.get(playerId);
        if (!playerPieces) {
            return false;
        }

        return playerPieces.some(p => 
            p.position.x === position.x && p.position.y === position.y
        );
    }

    /**
     * 获取玩家队伍
     */
    private getPlayerTeam(playerId: PlayerID): DotaTeam {
        // 玩家1-4 = GOODGUYS, 5-8 = BADGUYS
        return playerId < 4 ? DotaTeam.GOODGUYS : DotaTeam.BADGUYS;
    }

    /**
     * 应用棋子属性
     */
    private applyChessPieceStats(unit: CDOTA_BaseNPC, piece: ChessPiece): void {
        unit.SetMaxHealth(piece.health);
        unit.SetHealth(piece.health);
        unit.SetBaseDamageMin(piece.damage);
        unit.SetBaseDamageMax(piece.damage);
        unit.SetPhysicalArmorBaseValue(piece.armor);
        // 可以继续添加更多属性...
    }

    /**
     * 获取棋子定义
     */
    private getChessPieceDefinition(pieceId: string): ChessPiece | null {
        // 从AutoChessMode获取
        if (GameRules.AutoChessMode) {
            const piece = GameRules.AutoChessMode.getChessPiece(pieceId);
            if (!piece) {
                print(`[ChessBattleSystem] Warning: Chess piece '${pieceId}' not found in database`);
                print(`[ChessBattleSystem] Available pieces: ${GameRules.AutoChessMode.getAllChessPieces().map(p => p.id).join(', ')}`);
            }
            return piece;
        }
        print(`[ChessBattleSystem] Error: AutoChessMode not initialized`);
        return null;
    }

    /**
     * 获取可用棋子列表
     */
    private getAvailableChessPieces(): ChessPiece[] {
        if (!GameRules.AutoChessMode) {
            print(`[ChessBattleSystem] Error: AutoChessMode not available`);
            return [];
        }

        const pieces = GameRules.AutoChessMode.getAllChessPieces();
        print(`[ChessBattleSystem] Available chess pieces: ${pieces.length}`);
        return pieces;
    }

    /**
     * 获取玩家部署的棋子
     */
    public getPlayerPieces(playerId: PlayerID): DeployedPiece[] {
        return this.playerDeployedPieces.get(playerId) || [];
    }

    /**
     * 获取激活的战斗列表
     */
    public getActiveBattles(): BattleMatch[] {
        return Array.from(this.activeBattles.values());
    }

    /**
     * 激活玩家的棋子（准备阶段 -> 战斗阶段）
     */
    public activatePlayerPieces(playerId: PlayerID): void {
        print(`[ChessBattleSystem] 激活玩家 ${playerId} 的棋子`);
        
        const pieces = this.playerDeployedPieces.get(playerId) || [];
        
        for (const piece of pieces) {
            if (piece.unit && IsValidEntity(piece.unit)) {
                // 移除准备阶段的限制（如沉默、缴械等）
                this.removePreparationModifiers(piece.unit);
                
                // 确保单位可以攻击和移动
                piece.unit.SetMoveCapability(UnitMoveCapability.GROUND);
                // piece.unit.SetAttackCapability(UnitAttackCapability.ATTACK_RANGED); // TODO: 修复攻击能力设置
                
                print(`[ChessBattleSystem] 激活棋子: ${piece.pieceId} (${piece.unit.GetUnitName()})`);
            }
        }
        
        print(`[ChessBattleSystem] 玩家 ${playerId} 的 ${pieces.length} 个棋子已激活`);
    }

    /**
     * 移除准备阶段的修饰符
     */
    private removePreparationModifiers(unit: CDOTA_BaseNPC): void {
        // 移除沉默效果
        unit.RemoveModifierByName('modifier_silence');
        
        // 移除缴械效果
        unit.RemoveModifierByName('modifier_disarmed');
        
        // 移除其他准备阶段的限制
        unit.RemoveModifierByName('modifier_autochess_preparation');
        
        print(`[ChessBattleSystem] 移除单位 ${unit.GetUnitName()} 的准备阶段修饰符`);
    }

    /**
     * 获取波次配置系统
     */
    public getWaveConfigSystem(): WaveConfigSystem {
        return this.waveConfigSystem;
    }

    /**
     * 开始新波次
     */
    public startNewWave(waveNumber: number): void {
        print(`[ChessBattleSystem] 开始新波次: ${waveNumber}`);
        
        const waveConfig = this.waveConfigSystem.startNewWave(waveNumber);
        if (waveConfig) {
            print(`[ChessBattleSystem] 使用波次配置: ${waveConfig.name}`);
            // 这里可以添加具体的波次生成逻辑
        } else {
            print(`[ChessBattleSystem] ERROR: 无法获取波次配置 for wave ${waveNumber}`);
        }
    }

    /**
     * 重新创建棋盘六边形网格（蓝色，尖角朝上/蜂窝紧密排列）
     */
    public recreateHexBoard(): void {
        // this.clearHexBoard?.(); // 若存在清理函数则先清理粒子/线

        const r = this.CELL_SIZE * 0.5;                 // 六边形半径
        const w = Math.sqrt(3) * r;                     // 点朝上宽度
        const vert = 1.5 * r;                           // 行间垂直间距
        const cols = this.BOARD_SIZE;
        const rows = this.BOARD_SIZE;

        const duration = 1.2;                            // Debug 线持续时间（由计时器循环刷新）
        const colorR = 0, colorG = 120, colorB = 255;    // 蓝色

        // 以棋盘中心为原点，向四周排布
        const origin = Vector(this.BOARD_OFFSET.x - 100, this.BOARD_OFFSET.y, this.BOARD_OFFSET.z - 100);
        const colOffset = (cols - 1) * w * 0.5;          // 使网格整体居中
        const rowOffset = (rows - 1) * vert * 0.5;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // 点朝上布局（pointy-top）：同行列间距 w，奇偶行在 X 方向偏移 w/2
                const x = origin.x + (col * w + (row % 2) * (w * 0.5)) - colOffset;
                const y = origin.y + (row * vert) - rowOffset;
                const center = Vector(x, y, origin.z);

                this.drawHexAt(center, r, duration, colorR, colorG, colorB);
            }
        }
        // print('[ChessBattleSystem] Recreated pointy-top blue hex grid.');
    }

    private drawHexAt(center: Vector, radius: number, duration: number, r: number, g: number, b: number): void {
        const corners = this.getHexCornersPointy(center, radius);
        for (let i = 0; i < 6; i++) {
            const a = corners[i];
            const c = corners[(i + 1) % 6];
            DebugDrawLine(a, c, r, g, b, true, duration);
        }
    }

    private getHexCornersPointy(center: Vector, radius: number): Vector[] {
        const pts: Vector[] = [];
        // 点朝上（pointy-top）：初始角度 30° 以让尖角向上
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 180) * (60 * i - 30); // -30,30,90,...
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            pts.push(Vector(x, y, center.z));
        }
        return pts;
    }

    /** 记录幸存棋子的血量 */
    private recordSurvivorHealth(battle: BattleMatch): void {
        const updateFor = (playerId: PlayerID, pieces: DeployedPiece[]) => {
            const survivors: Array<{ pieceId: string; health: number }> = [];
            for (const p of pieces) {
                if (p.unit && !p.unit.IsNull() && p.unit.IsAlive()) {
                    survivors.push({ pieceId: p.pieceId, health: p.unit.GetHealth() });
                }
            }
            if (survivors.length > 0) {
                this.playerSurvivorHealth.set(playerId, survivors);
                print(`[ChessBattleSystem] Stored ${survivors.length} survivor HP entries for player ${playerId}`);
            } else {
                this.playerSurvivorHealth.delete(playerId);
            }
        };

        updateFor(battle.player1, battle.player1Pieces);
        updateFor(battle.player2, battle.player2Pieces);
    }
}

// 导出单例
export const chessBattleSystem = ChessBattleSystem.getInstance();

