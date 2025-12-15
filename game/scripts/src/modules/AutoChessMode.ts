/**
 * 自走棋模式核心逻辑 - 完整的自走棋游戏系统
 * AutoChess Mode Core - Complete auto chess game system
 */

import { GameMode, GameModeManager } from './GameModeManager';
import { ChessBattleSystem } from './autochess/ChessBattleSystem';
import { StageConfigManager, NodeType } from './autochess/StageConfigManager';
import { getTimestamp } from '../utils/time_utils';

export enum ChessRarity {
    COMMON = 1,      // 普通 (白色)
    UNCOMMON = 2,    // 不常见 (绿色)
    RARE = 3,        // 稀有 (蓝色)
    EPIC = 4,        // 史诗 (紫色)
    LEGENDARY = 5    // 传奇 (橙色)
}

export enum RoundPhase {
    PREPARATION = 'preparation',  // 准备阶段
    BATTLE = 'battle',           // 战斗阶段
    INTERMISSION = 'intermission' // 间歇阶段
}

export interface ChessPiece {
    id: string;
    unitName: string;      // DOTA2单位名
    displayName: string;   // 显示名称
    position?: string;      // 定位（坦克、战士、射手、法师、辅助）
    rarity: ChessRarity;   // 稀有度
    cost: number;          // 购买费用
    race: string[];        // 种族
    class: string[];       // 职业
    health: number;        // 生命值
    maxMana?: number;      // 法力上限
    initialMana?: number;   // 初始法力
    healthRecovery?: number; // 血量恢复
    naturalManaRecovery?: number; // 自然法力恢复量/s
    attackManaRecovery?: number;  // 攻击法力恢复量/s
    damageManaRecovery?: number;   // 承伤法力恢复量/s
    skillCooldown?: number;       // 技能充能时长/s
    damage: number;        // 攻击力
    armor: number;         // 物理防御
    physicalDamageReduction?: number; // 物伤减免率 (%)
    magicDefense?: number; // 魔法防御 (%)
    attackRange: number;   // 攻击距离
    attackSpeed?: number;  // 攻速
    attackInterval?: number; // 攻击间隔
    dps?: number;          // DPS (Damage Per Second)
    criticalChance?: number; // 暴击概率 (%)
    criticalDamage?: number; // 暴击伤害 (%)
    abilities: string[];   // 技能列表
    synergy?: string[];    // 羁绊
}

export interface PlayerState {
    playerId: PlayerID;
    health: number;        // 生命值
    maxHealth: number;     // 最大生命值
    gold: number;          // 金币
    level: number;         // 等级
    experience: number;    // 经验值
    winStreak: number;     // 连胜
    lossStreak: number;    // 连败
    boardPieces: ChessPiece[];  // 棋盘上的棋子
    benchPieces: ChessPiece[];  // 备战席棋子
    isAlive: boolean;      // 是否存活
    rank: number;          // 排名
}

export interface GameState {
    currentRound: number;
    currentPhase: RoundPhase;
    phaseTimeLeft: number;
    playerStates: Map<PlayerID, PlayerState>;
    chessPool: Map<string, number>; // 棋子池
    isGameActive: boolean;
    winnerPlayerId?: PlayerID;
}

export class AutoChessMode {
    private static instance: AutoChessMode;
    private gameState: GameState;
    private phaseTimer?: string;
    private chessPieceDatabase: Map<string, ChessPiece>;
    private isActive: boolean = false;
    private battleSystem: ChessBattleSystem;
    
    // 波次结算相关状态
    private currentWaveSettlementShown: boolean = false;
    private currentWaveSettlementPending: boolean = false;
    private currentWaveRewardAmount: number = 100;
    private currentWaveRewardClaimed: Set<PlayerID> = new Set();
    private currentWaveStageSelection?: string;
    private battleResultsProcessed: Set<string> = new Set(); // 已处理的战斗ID

    // 关卡解锁系统
    private completedStages: Set<string> = new Set(); // 已完成的关卡ID
    private availableStages: Set<string> = new Set(); // 可用的关卡ID（初始为第一层）

    private constructor() {
        // 初始化关卡配置和英雄费用配置
        StageConfigManager.initialize();
        
        this.chessPieceDatabase = this.initializeChessDatabase();
        this.gameState = this.initializeGameState();
        this.battleSystem = ChessBattleSystem.getInstance();
        
        // 初始化关卡解锁系统：第一层关卡（n2, n3）初始可用
        this.initializeStageUnlock();
        
        this.initializeAutoChessMode();
    }

    /**
     * 初始化关卡解锁系统
     * 第一层关卡（n2, n3）初始可用，起始点（n1）已完成
     */
    private initializeStageUnlock(): void {
        // 起始点已完成
        this.completedStages.add('n1');
        
        // 第一层关卡初始可用（从起始点连接的关卡）
        this.availableStages.add('n2'); // 森林小径
        this.availableStages.add('n3'); // 危险矿洞
        
        print(`[AutoChessMode] 关卡解锁系统初始化完成`);
        print(`[AutoChessMode] 已完成关卡: n1`);
        print(`[AutoChessMode] 可用关卡: n2, n3`);
    }

    public static getInstance(): AutoChessMode {
        if (!AutoChessMode.instance) {
            AutoChessMode.instance = new AutoChessMode();
        }
        return AutoChessMode.instance;
    }

    private resetWaveSettlementState(): void {
        this.currentWaveSettlementShown = false;
        this.currentWaveSettlementPending = false;
        this.currentWaveRewardAmount = 0;
        this.currentWaveRewardClaimed.clear();
        this.currentWaveStageSelection = undefined;
        this.battleResultsProcessed.clear(); // 重置已处理的战斗ID
    }

    /**
     * 激活自走棋模式
     */
    public activate(): void {
        if (this.isActive) {
            print('[AutoChessMode] Already active');
            return;
        }

        const gameModeManager = GameModeManager.getInstance();
        if (!gameModeManager.isAutoChessMode()) {
            print('[AutoChessMode] Game is not in autochess mode');
            return;
        }

        this.isActive = true;
        this.setupGame();
        
        this.registerEvents();
        
        print('[AutoChessMode] Activated');
        
        // 同步状态到网络表
        this.syncStateToNetTable();
    }

    /**
     * 停用自走棋模式
     */
    public deactivate(): void {
        if (!this.isActive) {
            return;
        }

        this.isActive = false;
        this.cleanupGame();
        this.unregisterEvents();
        
        print('[AutoChessMode] Deactivated');
        
        // 同步状态到网络表
        this.syncStateToNetTable();
    }

    /**
     * 开始游戏（单机模式）
     * 单机模式流程：直接开始第一关 → 战斗 → 结算 → 选关界面 → 战斗 → 循环
     */
    public startGame(): void {
        print(`[AutoChessMode] ========== startGame CALLED (单机模式) ==========`);
        print(`[AutoChessMode] isActive: ${this.isActive}`);
        
        if (!this.isActive) {
            print('[AutoChessMode] Mode not active, cannot start game');
            return;
        }

        this.gameState.isGameActive = true;
        this.gameState.currentRound = 0;  // 从0开始，战斗开始时+1
        this.gameState.currentPhase = RoundPhase.PREPARATION;
        
        print(`[AutoChessMode] Game state initialized: round=${this.gameState.currentRound}`);
        
        // 初始化所有玩家状态
        this.initializePlayerStates();
        print(`[AutoChessMode] Player states initialized, count: ${this.gameState.playerStates.size}`);
        
        // 为玩家创建初始棋子（第一回合的3个固定棋子）
        this.createPlayerInitialPieces();
        
        print('[AutoChessMode] ✅ 单机模式游戏已初始化');
        
        // 发送初始关卡解锁状态到客户端
        this.sendStageUnlockUpdate();
        
        // 通知客户端游戏开始
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_game_started', {
            round: this.gameState.currentRound,
            phase: 'battle'
        });

        // 延迟一点开始第一回合准备阶段（关卡1）
        Timers.CreateTimer(1.0, () => {
            print('[AutoChessMode] 📍 第一回合：开始准备阶段...');
            const playerId = 0;  // 单机模式默认玩家0
            
            // 第一回合也进入准备阶段，而不是直接战斗
            // 设置当前关卡选择
            this.currentWaveStageSelection = 'n1';
            print(`[AutoChessMode] 📝 第一关自动设置: currentWaveStageSelection = n1`);
            
            // 开始准备阶段倒计时（5秒）
            this.startPreparationCountdown(playerId, 1);
            
            return undefined;
        });
    }

    /**
     * 开始准备阶段
     */
    private startPreparationPhase(): void {
        this.resetWaveSettlementState();
        this.gameState.currentPhase = RoundPhase.PREPARATION;
        this.gameState.phaseTimeLeft = 10; // 10秒准备时间
        
        // 将玩家移动到观战区域（靠近棋盘）
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                this.battleSystem.movePlayerToSpectatorArea(playerId);
            }
        }
        
        // 绘制蓝色六边形网格
        this.battleSystem.recreateHexBoard();
        
        // 发放回合收入
        this.distributeRoundIncome();
        
        // 刷新商店
        this.refreshAllPlayersShop();
        
        // 为玩家创建初始棋子（准备阶段）
        this.createPlayerInitialPieces();
        
        // 第一回合自动使用关卡1，不需要选择；后续回合发送关卡列表让玩家选择
        if (this.gameState.currentRound > 1) {
            // 发送可用的关卡列表到客户端（让玩家选择）
            this.sendAvailableStages();
        } else {
            // 第一关使用 n1 格式，与关卡解锁系统保持一致
            this.currentWaveStageSelection = 'n1';
            print(`[AutoChessMode] 📝 第一关自动设置: currentWaveStageSelection = n1`);
        }
        
        // 启动计时器
        this.startPhaseTimer();
        
        print(`[AutoChessMode] Started preparation phase for round ${this.gameState.currentRound}`);
        
        // 单机模式：准备阶段显示背包
        (CustomGameEventManager.Send_ServerToAllClients as any)('show_inventory', {});
        
        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_phase_started', {
            phase: RoundPhase.PREPARATION,
            timeLeft: this.gameState.phaseTimeLeft,
            round: this.gameState.currentRound
        });
    }

    /**
     * 开始战斗阶段
     */
    private startBattlePhase(): void {
        // 单机模式：战斗阶段隐藏背包
        (CustomGameEventManager.Send_ServerToAllClients as any)('hide_inventory', {});
        
        this.gameState.currentPhase = RoundPhase.BATTLE;
        this.gameState.phaseTimeLeft = 45; // 45秒战斗时间
        
        // 部署所有玩家的棋子到战场
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                // 设置玩家为受保护状态（无敌但可移动）
                this.battleSystem.setPlayerAsProtected(playerId);
                
                // 部署玩家棋子到战斗位置
                this.deployPlayerChessPieces(playerId);
            }
        }
        
        // 创建敌人棋子（根据当前波次配置）
        this.createEnemyPieces();
        
        // 设置对战配对
        this.setupBattleMatching();
        
        // 开始战斗
        this.startAllBattles();
        
        // 启动计时器
        this.startPhaseTimer();
        
        print(`[AutoChessMode] Started battle phase for round ${this.gameState.currentRound}`);
        
        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_phase_started', {
            phase: RoundPhase.BATTLE,
            timeLeft: this.gameState.phaseTimeLeft,
            round: this.gameState.currentRound
        });
    }

    /**
     * 部署玩家棋子到战场（战斗阶段）
     */
    private deployPlayerChessPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] ERROR: Player state not found for player ${playerId}`);
            return;
        }

        if (this.gameState.currentPhase === RoundPhase.BATTLE) {
            this.battleSystem.activatePlayerPieces(playerId);
        }
    }

    /**
     * 为玩家创建初始棋子（准备阶段）
     */
    private createPlayerInitialPieces(): void {

        
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
      
                this.battleSystem.clearPlayerPieces(playerId);
                
                // 单机模式：创建初始棋子（第一次游戏开始）
                    this.createFirstRoundPieces(playerId);
                
                print(`[AutoChessMode] 玩家 ${playerId} 初始棋子创建完成`);
            }
        }
        
        print(`[AutoChessMode] ========== 玩家初始棋子创建完成 ==========`);
    }

    /**
     * 为第一回合创建初始棋子（固定三个棋子：树精卫士、风行者、斧王）
     * 注意：这是生成玩家自己的棋子，不是敌方怪物
     */
    private createFirstRoundPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        // 第一回合固定给玩家三个棋子（不走随机）
        const fixedPieces = ['treant_protector', 'windrunner', 'axe'];
        
        print(`[AutoChessMode] ========== 第一回合生成玩家初始棋子 ==========`);
        print(`[AutoChessMode] 玩家 ${playerId} - 固定生成3个我方棋子: 树精卫士、风行者、斧王`);
        
        // 创建并部署棋子
        for (let i = 0; i < fixedPieces.length; i++) {
            const pieceId = fixedPieces[i];
            const piece = this.chessPieceDatabase.get(pieceId);
            
            if (piece) {
                // 添加到备战席
                playerState.benchPieces.push(piece);
                
                // 在棋盘上创建棋子（准备阶段，可以拖拽）
                const position = {
                    x: 1 + i,
                    y: 1
                };
                
                print(`[AutoChessMode] 部署我方棋子: ${piece.displayName}(${pieceId}) - ${piece.cost}费 到位置 (${position.x}, ${position.y})`);
                this.battleSystem.deployPiece(playerId, pieceId, position);
            } else {
                print(`[AutoChessMode] 警告: 棋子 ${pieceId} 不存在于数据库中`);
            }
        }
        
        print(`[AutoChessMode] ========== 玩家 ${playerId} 第一回合初始棋子创建完成 ==========`);
        print(`[AutoChessMode] 总计生成 ${fixedPieces.length} 个我方棋子 (固定配置)`);
        
        // 🎒 测试背包：添加额外的棋子到备战席（不部署到棋盘）
        // 使用正确的棋子ID格式（与 chessPieceDatabase 匹配）
        // 选择一些不同费用和类型的棋子用于测试
        const testBenchPieces = [
            'crystal_maiden',  // 水晶室女 - 法师
            'drow_ranger',     // 卓尔游侠 - 射手
            'lina',            // 莉娜 - 法师
            'mars',            // 战争之矛 - 战士
            'enchantress'      // 魅惑魔女 - 射手
        ];
        print(`[AutoChessMode] 🎒 ========== 开始添加测试棋子到备战席 ==========`);
        for (const pieceId of testBenchPieces) {
            const piece = this.chessPieceDatabase.get(pieceId);
            if (piece) {
                playerState.benchPieces.push(piece);
                print(`[AutoChessMode] 🎒 ✅ 添加测试棋子: ${piece.displayName} (${pieceId})`);
            } else {
                print(`[AutoChessMode] 🎒 ❌ 棋子不存在: ${pieceId}`);
            }
        }
        print(`[AutoChessMode] 🎒 备战席总计: ${playerState.benchPieces.length} 个棋子`);
        print(`[AutoChessMode] 🎒 ========== 测试棋子添加完成 ==========`);
    }

    /**
     * 将 StageConfigManager 的 heroId 转换为 chessPieceDatabase 的 pieceId
     * 例如: 'treant_protector1' -> 'treant_protector', 'axe1' -> 'axe'
     * 注意：TSTL不支持正则表达式，使用字符串操作实现
     */
    private convertHeroIdToPieceId(heroId: string): string {
        // 从后往前查找第一个非数字字符的位置
        let lastNonDigitIndex = heroId.length;
        for (let i = heroId.length - 1; i >= 0; i--) {
            const char = heroId.charAt(i);
            if (char < '0' || char > '9') {
                lastNonDigitIndex = i + 1;
                break;
            }
        }
        // 如果末尾有数字，移除它们
        if (lastNonDigitIndex < heroId.length) {
            return heroId.substring(0, lastNonDigitIndex);
        }
        return heroId;
    }

    /**
     * 根据费用从数据库中随机获取一个棋子
     */
    private getRandomPieceByCost(cost: number): ChessPiece | null {
        const pieces: ChessPiece[] = [];
        
        for (const piece of this.chessPieceDatabase.values()) {
            if (piece.cost === cost) {
                pieces.push(piece);
            }
        }
        
        if (pieces.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(RandomFloat(0, pieces.length));
        return pieces[randomIndex];
    }

    /**
     * 创建默认初始棋子（降级方案）
     */
    private createDefaultInitialPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        const defaultPieces = ['axe', 'crystal_maiden', 'drow_ranger'];
        
        for (let i = 0; i < defaultPieces.length; i++) {
            const pieceId = defaultPieces[i];
            const piece = this.chessPieceDatabase.get(pieceId);
            
            if (piece) {
                playerState.benchPieces.push(piece);
                const position = { x: 1 + i, y: 1 };
                this.battleSystem.deployPiece(playerId, pieceId, position);
            }
        }
    }

    /**
     * 从备战席部署棋子
     */
    private deployPiecesFromBench(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        const benchPieces = playerState.benchPieces || [];
        print(`[AutoChessMode] 玩家 ${playerId} 备战席棋子数量: ${benchPieces.length}`);
        
        // 将备战席的棋子部署到棋盘上
        for (let i = 0; i < Math.min(benchPieces.length, 7); i++) {
            const piece = benchPieces[i];
            const position = {
                x: 1 + i,
                y: 1
            };
            
            print(`[AutoChessMode] 部署备战席棋子: ${piece.id} 到位置 (${position.x}, ${position.y})`);
            this.battleSystem.deployPiece(playerId, piece.id, position);
        }
    }

    /**
     * 重新创建玩家棋子（新关卡开始时调用）
     * 从备战席和棋盘位置恢复棋子
     */
    private recreatePlayerPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] 警告: 玩家 ${playerId} 状态不存在`);
            return;
        }

        print(`[AutoChessMode] ========== 重新创建玩家 ${playerId} 的棋子 ==========`);
        
        // 先清理该玩家的所有棋子（确保干净状态）
        this.battleSystem.clearPlayerPieces(playerId);
        
        // 优先从棋盘位置恢复棋子（如果有保存的位置信息）
        const boardPieces = playerState.boardPieces || [];
        if (boardPieces.length > 0) {
            print(`[AutoChessMode] 从棋盘位置恢复 ${boardPieces.length} 个棋子`);
            for (let i = 0; i < boardPieces.length; i++) {
                const piece = boardPieces[i];
                const position = {
                    x: 1 + (i % 7),
                    y: 1 + Math.floor(i / 7)
                };
                
                print(`[AutoChessMode] 恢复棋盘棋子: ${piece.displayName}(${piece.id}) 到位置 (${position.x}, ${position.y})`);
                this.battleSystem.deployPiece(playerId, piece.id, position);
            }
        } else {
            // 如果没有棋盘棋子，从备战席恢复
            const benchPieces = playerState.benchPieces || [];
            if (benchPieces.length > 0) {
                print(`[AutoChessMode] 从备战席恢复 ${benchPieces.length} 个棋子`);
                this.deployPiecesFromBench(playerId);
            } else {
                // 如果都没有，创建默认初始棋子（降级方案）
                print(`[AutoChessMode] 警告: 玩家 ${playerId} 没有棋子，创建默认棋子`);
                this.createDefaultInitialPieces(playerId);
            }
        }
        
        print(`[AutoChessMode] ========== 玩家 ${playerId} 棋子重新创建完成 ==========`);
    }

    /**
     * 在准备阶段创建敌人棋子（禁用攻击）
     */
    private createEnemyPiecesForPreparation(stageId: number): void {
        print(`[AutoChessMode] ========== 准备阶段：创建敌人棋子（禁用攻击） ==========`);
        print(`[AutoChessMode] 使用关卡: ${stageId}`);
        
        const stageConfig = StageConfigManager.getStageConfig(stageId);
        if (!stageConfig) {
            print(`[AutoChessMode] ERROR: 关卡${stageId}配置不存在，使用关卡1`);
            stageId = 1;
        }
        
        // 为每个玩家创建对应的敌人
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                print(`[AutoChessMode] 为玩家 ${playerId} 创建敌人棋子（准备阶段）...`);
                this.createEnemyForPlayer(playerId, stageId, true); // true = 准备阶段，禁用攻击
            }
        }
        
        // 延迟一点禁用所有单位攻击，确保所有单位都已创建
        Timers.CreateTimer(0.3, () => {
            this.battleSystem.disableAllAttacks();
            print(`[AutoChessMode] ✅ 所有棋子已创建，攻击已禁用（准备阶段）`);
            return undefined;
        });
        
        print(`[AutoChessMode] ========== 准备阶段敌人棋子创建完成 ==========`);
    }

    /**
     * 创建敌人棋子（战斗阶段）
     */
    private createEnemyPieces(): void {
        print(`[AutoChessMode] ========== 开始创建敌人棋子 ==========`);
        print(`[AutoChessMode] 当前回合: ${this.gameState.currentRound}`);
        
        // 确定使用的关卡ID
        // 第一回合自动使用关卡1，后续回合使用玩家通过UI选择的关卡
        let stageId: number;
        if (this.gameState.currentRound === 1) {
            // 第一回合自动使用关卡1（单机模式，不需要选择）
            stageId = 1;
            print(`[AutoChessMode] 第一回合，自动使用关卡1配置`);
        } else {
            // 后续回合使用玩家通过UI选择的关卡
            if (this.currentWaveStageSelection) {
                stageId = parseInt(this.currentWaveStageSelection);
                print(`[AutoChessMode] 使用玩家选择的关卡: ${stageId}`);
            } else {
                // 如果没有选择，默认使用关卡1（降级方案）
                stageId = 1;
                print(`[AutoChessMode] 警告: 玩家未选择关卡，默认使用关卡1`);
            }
        }
        
        // 验证关卡配置是否存在
        const stageConfig = StageConfigManager.getStageConfig(stageId);
        if (!stageConfig) {
            print(`[AutoChessMode] ERROR: 关卡${stageId}配置不存在，使用关卡1`);
            stageId = 1;
        }
        
        // 为每个玩家创建对应的敌人
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                print(`[AutoChessMode] 为玩家 ${playerId} 创建敌人棋子...`);
                this.createEnemyForPlayer(playerId, stageId);
            }
        }
        
        print(`[AutoChessMode] ========== 敌人棋子创建完成 ==========`);
    }

    /**
     * 为特定玩家创建敌人棋子（根据关卡配置）
     * @param isPreparationPhase 是否为准备阶段（准备阶段禁用攻击）
     */
    private createEnemyForPlayer(playerId: PlayerID, stageId: number, isPreparationPhase: boolean = false): void {
        const stageConfig = StageConfigManager.getStageConfig(stageId);
        if (!stageConfig) {
            print(`[AutoChessMode] ERROR: 关卡${stageId}配置不存在`);
            return;
        }
        
        print(`[AutoChessMode] 为玩家 ${playerId} 创建敌人，使用关卡${stageId}配置`);
        print(`[AutoChessMode] 关卡类型: ${stageConfig.primaryNodeType}`);
        
        // 根据关卡配置的怪物数量生成敌人
        const monsterCount = StageConfigManager.rollMonsterCount(stageId);
        const totalMonsters = monsterCount.normalCount + (monsterCount.specialCount || 0);
        
        print(`[AutoChessMode] 关卡${stageId}怪物数量: 普通${monsterCount.normalCount}个, 特殊${monsterCount.specialCount || 0}个, 总计${totalMonsters}个`);
        
        // 判断是否为精英节点（根据关卡类型）
        const isElite = stageConfig.primaryNodeType === NodeType.ELITE_BATTLE || 
                       stageConfig.primaryNodeType === NodeType.BOSS;
        
        // 创建普通怪物
        for (let i = 0; i < monsterCount.normalCount; i++) {
            const heroId = StageConfigManager.rollHeroByStage(stageId, isElite);
            if (heroId) {
                const pieceId = this.convertHeroIdToPieceId(heroId);
                const piece = this.chessPieceDatabase.get(pieceId);
                
                if (piece) {
                    // 创建敌人棋子（在敌方半场，随机位置）
                    // 与之前 generateAIPieces 保持一致：x: 0-7, y: 4-7
                    const position = {
                        x: RandomInt(0, 7),
                        y: RandomInt(4, 7)  // 敌方半场
                    };
                    
                    print(`[AutoChessMode] 创建敌人棋子: ${piece.displayName}(${pieceId}) 在位置 (${position.x}, ${position.y})`);
                    // 使用战斗系统创建敌人（playerId=-1表示AI敌人）
                    this.battleSystem.deployPiece(-1, pieceId, position);
                } else {
                    print(`[AutoChessMode] 警告: 棋子 ${pieceId} 不存在，使用同费用替代`);
                    const heroConfig = StageConfigManager.getHeroConfig(heroId);
                    if (heroConfig) {
                        const fallbackPiece = this.getRandomPieceByCost(heroConfig.cost);
                        if (fallbackPiece) {
                            const position = { x: RandomInt(0, 7), y: RandomInt(4, 7) };
                            this.battleSystem.deployPiece(-1, fallbackPiece.id, position);
                        }
                    }
                }
            }
        }
        
        // 创建特殊怪物（如Boss）
        if (monsterCount.specialCount && monsterCount.specialCount > 0) {
            for (let i = 0; i < monsterCount.specialCount; i++) {
                // Boss使用精英节点掉落概率
                const heroId = StageConfigManager.rollHeroByStage(stageId, true);
                if (heroId) {
                    const pieceId = this.convertHeroIdToPieceId(heroId);
                    const piece = this.chessPieceDatabase.get(pieceId);
                    
                    if (piece) {
                        // Boss 放在敌方半场中央位置
                        const position = {
                            x: RandomInt(2, 5),  // 中间区域
                            y: RandomInt(5, 7)   // 敌方半场靠后
                        };
                        
                        print(`[AutoChessMode] 创建特殊敌人: ${piece.displayName}(${pieceId}) [${monsterCount.specialType}] 在位置 (${position.x}, ${position.y})`);
                        this.battleSystem.deployPiece(-1, pieceId, position);
                    }
                }
            }
        }
        
        print(`[AutoChessMode] 玩家 ${playerId} 的敌人棋子创建完成，共${totalMonsters}个`);
    }

    /**
     * 阶段计时器
     */
    private startPhaseTimer(): void {
        print(`[AutoChessMode] 🕐 Starting phase timer for ${this.gameState.currentPhase}, timeLeft: ${this.gameState.phaseTimeLeft}`);
        
        if (this.phaseTimer) {
            Timers.RemoveTimer(this.phaseTimer);
        }

        this.phaseTimer = Timers.CreateTimer(1.0, () => {
            this.gameState.phaseTimeLeft--;
            
            // 每5秒输出一次日志（减少日志量）
            if (this.gameState.phaseTimeLeft % 5 === 0) {
                print(`[AutoChessMode] ⏱️ Phase: ${this.gameState.currentPhase}, Time left: ${this.gameState.phaseTimeLeft}s`);
            }
            
            // 准备阶段刷新一次网格，避免Debug线消失
            if (this.gameState.currentPhase === RoundPhase.PREPARATION) {
                this.battleSystem.recreateHexBoard();
            }
            
            // 同步时间到客户端
            (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_time_update', {
                timeLeft: this.gameState.phaseTimeLeft,
                phase: this.gameState.currentPhase
            });
            
            // 检查是否需要切换阶段
            if (this.gameState.phaseTimeLeft <= 0) {
                print(`[AutoChessMode] ⏱️ Phase time ended! Switching from ${this.gameState.currentPhase}...`);
                this.onPhaseTimeEnd();
                return null; // 停止计时器
            }
            
            return 1.0; // 继续计时
        });
    }

    /**
     * 阶段时间结束处理
     */
    private onPhaseTimeEnd(): void {
        print(`[AutoChessMode] 📍 onPhaseTimeEnd called, current phase: ${this.gameState.currentPhase}`);
        
        switch (this.gameState.currentPhase) {
            case RoundPhase.PREPARATION:
                print(`[AutoChessMode] 📍 Preparation phase ended, starting battle phase...`);
                this.startBattlePhase();
                break;
            case RoundPhase.BATTLE:
                print(`[AutoChessMode] 📍 Battle phase ended, calling endBattlePhase...`);
                this.endBattlePhase();
                break;
        }
    }

    /**
     * 结束战斗阶段
     */
    private endBattlePhase(): void {
        print(`[AutoChessMode] ========== endBattlePhase CALLED ==========`);
        
        if (this.phaseTimer) {
            Timers.RemoveTimer(this.phaseTimer);
            this.phaseTimer = undefined;
            print(`[AutoChessMode] Phase timer removed`);
        }

        // 停止所有战斗
        print(`[AutoChessMode] Stopping all battles...`);
        this.stopAllBattles();
        
        // 计算战斗结果（如果还没有通过 onBattleCompleted 处理）
        print(`[AutoChessMode] Calculating battle results...`);
        this.calculateBattleResults();
        
        // 检查游戏是否结束
        if (this.checkGameEnd()) {
            print(`[AutoChessMode] Game end condition met, ending game...`);
            this.endGame();
            return;
        }
        
        print(`[AutoChessMode] Triggering wave settlement...`);
        this.triggerWaveSettlement();
        
        print(`[AutoChessMode] ========== endBattlePhase COMPLETE ==========`);
    }

    /**
     * 初始化游戏状态
     */
    private initializeGameState(): GameState {
        return {
            currentRound: 0,
            currentPhase: RoundPhase.PREPARATION,
            phaseTimeLeft: 0,
            playerStates: new Map(),
            chessPool: this.initializeChessPool(),
            isGameActive: false
        };
    }

    /**
     * 初始化棋子池
     */
    private initializeChessPool(): Map<string, number> {
        const pool = new Map<string, number>();
        
        // 根据稀有度设置棋子数量
        // 1费棋子：45个
        // 2费棋子：30个
        // 3费棋子：25个
        // 4费棋子：15个
        // 5费棋子：10个
        
        for (const [pieceId, piece] of this.chessPieceDatabase) {
            let count = 0;
            switch (piece.rarity) {
                case ChessRarity.COMMON:
                    count = 45;
                    break;
                case ChessRarity.UNCOMMON:
                    count = 30;
                    break;
                case ChessRarity.RARE:
                    count = 25;
                    break;
                case ChessRarity.EPIC:
                    count = 15;
                    break;
                case ChessRarity.LEGENDARY:
                    count = 10;
                    break;
            }
            pool.set(pieceId, count);
        }
        
        return pool;
    }

    /**
     * 初始化棋子数据库
     * 根据配置表数据初始化所有棋子
     */
    private initializeChessDatabase(): Map<string, ChessPiece> {
        const database = new Map<string, ChessPiece>();
        
        // ========== 一费棋子 (Cost 1) ==========
        
        // 树精卫士 - 坦克
        database.set('treant_protector', {
            id: 'treant_protector',
            unitName: 'npc_dota_hero_treant',
            displayName: '树精卫士',
            position: '坦克',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['自然'],
            class: ['战士'],
            health: 650,
            maxMana: 100,
            initialMana: 40,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 4.8,
            damageManaRecovery: 5,
            skillCooldown: 9.26,
            damage: 50,
            armor: 4,
            physicalDamageReduction: 19.35,
            magicDefense: 15,
            attackRange: 200,
            attackSpeed: 0.60,
            attackInterval: 1.67,
            dps: 30.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['treant_natures_grasp']
        });
        
        // 风行者 - 射手
        database.set('windrunner', {
            id: 'windrunner',
            unitName: 'npc_dota_hero_windrunner',
            displayName: '风行者',
            position: '射手',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['精灵'],
            class: ['射手'],
            health: 500,
            maxMana: 80,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 6.4,
            damageManaRecovery: 0,
            skillCooldown: 10.81,
            damage: 45,
            armor: 2,
            physicalDamageReduction: 10.71,
            magicDefense: 5,
            attackRange: 800,
            attackSpeed: 0.80,
            attackInterval: 1.25,
            dps: 36.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['windrunner_powershot']
        });
        
        // 战争之矛 (Mars) - 战士
        database.set('mars', {
            id: 'mars',
            unitName: 'npc_dota_hero_mars',
            displayName: '战争之矛',
            position: '战士',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['人类'],
            class: ['战士'],
            health: 650,
            maxMana: 100,
            initialMana: 40,
            healthRecovery: 0,
            naturalManaRecovery: 2,
            attackManaRecovery: 5.2,
            damageManaRecovery: 5,
            skillCooldown: 0, // 表格中为'm'，设为0
            damage: 55,
            armor: 3,
            physicalDamageReduction: 15.25,
            magicDefense: 10,
            attackRange: 200,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 35.75,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['mars_spear']
        });
        
        // 雷泽 (Razor) - 法师
        database.set('razor', {
            id: 'razor',
            unitName: 'npc_dota_hero_razor',
            displayName: '雷泽',
            position: '法师',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['元素'],
            class: ['法师'],
            health: 550,
            maxMana: 100,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 2,
            attackManaRecovery: 6,
            damageManaRecovery: 0,
            skillCooldown: 12.50,
            damage: 40,
            armor: 2,
            physicalDamageReduction: 10.71,
            magicDefense: 5,
            attackRange: 400,
            attackSpeed: 0.75,
            attackInterval: 1.33,
            dps: 30.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['razor_plasma_field']
        });
        
        // 恶魔巫师 (Lion) - 辅助
        database.set('lion', {
            id: 'lion',
            unitName: 'npc_dota_hero_lion',
            displayName: '恶魔巫师',
            position: '辅助',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['恶魔'],
            class: ['法师'],
            health: 500,
            maxMana: 70,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 3,
            attackManaRecovery: 5.2,
            damageManaRecovery: 0,
            skillCooldown: 8.54,
            damage: 40,
            armor: 2,
            physicalDamageReduction: 10.71,
            magicDefense: 5,
            attackRange: 600,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 26.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['lion_impale']
        });
        
        // 魅惑魔女 (Enchantress) - 辅助
        database.set('enchantress', {
            id: 'enchantress',
            unitName: 'npc_dota_hero_enchantress',
            displayName: '魅惑魔女',
            position: '辅助',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['自然'],
            class: ['辅助'],
            health: 550,
            maxMana: 100,
            initialMana: 20,
            healthRecovery: 0,
            naturalManaRecovery: 2,
            attackManaRecovery: 5.6,
            damageManaRecovery: 0,
            skillCooldown: 13.16,
            damage: 45,
            armor: 1.5,
            physicalDamageReduction: 8.26,
            magicDefense: 5,
            attackRange: 400,
            attackSpeed: 0.70,
            attackInterval: 1.43,
            dps: 31.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['enchantress_enchant']
        });
        
        // ========== 二费棋子 (Cost 2) ==========
        
        // 斧王 - 战士
        database.set('axe', {
            id: 'axe',
            unitName: 'npc_dota_hero_axe',
            displayName: '斧王',
            position: '战士',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['兽人'],
            class: ['战士'],
            health: 750,
            maxMana: 0,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 0,
            attackManaRecovery: 6,
            damageManaRecovery: 5,
            skillCooldown: 0.00,
            damage: 65,
            armor: 5,
            physicalDamageReduction: 23.08,
            magicDefense: 15,
            attackRange: 200,
            attackSpeed: 0.75,
            attackInterval: 1.33,
            dps: 48.75,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['axe_berserkers_call']
        });
        
        // 熊战士 (Ursa) - 坦克
        database.set('ursa', {
            id: 'ursa',
            unitName: 'npc_dota_hero_ursa',
            displayName: '熊战士',
            position: '坦克',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['野兽'],
            class: ['战士'],
            health: 800,
            maxMana: 100,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 5.2,
            damageManaRecovery: 5,
            skillCooldown: 8.93,
            damage: 60,
            armor: 6,
            physicalDamageReduction: 26.47,
            magicDefense: 25,
            attackRange: 200,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 39.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['ursa_overpower']
        });
        
        // 神谕者 (Oracle) - 辅助
        database.set('oracle', {
            id: 'oracle',
            unitName: 'npc_dota_hero_oracle',
            displayName: '神谕者',
            position: '辅助',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['人类'],
            class: ['辅助'],
            health: 700,
            maxMana: 100,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 3,
            attackManaRecovery: 5.2,
            damageManaRecovery: 0,
            skillCooldown: 12.20,
            damage: 55,
            armor: 4,
            physicalDamageReduction: 19.35,
            magicDefense: 15,
            attackRange: 400,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 35.75,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['oracle_fortunes_end']
        });
        
        // 卓尔游侠 - 射手
        database.set('drow_ranger', {
            id: 'drow_ranger',
            unitName: 'npc_dota_hero_drow_ranger',
            displayName: '卓尔游侠',
            position: '射手',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['不死'],
            class: ['猎人'],
            health: 650,
            maxMana: 0,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 0,
            attackManaRecovery: 5.2,
            damageManaRecovery: 0,
            skillCooldown: 0.00,
            damage: 60,
            armor: 3,
            physicalDamageReduction: 15.25,
            magicDefense: 15,
            attackRange: 800,
            attackSpeed: 0.80,
            attackInterval: 1.25,
            dps: 48.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['drow_ranger_frost_arrows']
        });
        
        // 秀逗魔导师 (Lina) - 法师
        database.set('lina', {
            id: 'lina',
            unitName: 'npc_dota_hero_lina',
            displayName: '秀逗魔导师',
            position: '法师',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['人类'],
            class: ['法师'],
            health: 650,
            maxMana: 100,
            initialMana: 60,
            healthRecovery: 0,
            naturalManaRecovery: 4,
            attackManaRecovery: 5.6,
            damageManaRecovery: 0,
            skillCooldown: 10.42,
            damage: 55,
            armor: 3,
            physicalDamageReduction: 15.25,
            magicDefense: 15,
            attackRange: 600,
            attackSpeed: 0.70,
            attackInterval: 1.43,
            dps: 38.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['lina_dragon_slave']
        });
        
        // ========== 三费棋子 (Cost 3) ==========
        
        // 灰烬之灵 (Ember Spirit) - 战士
        database.set('ember_spirit', {
            id: 'ember_spirit',
            unitName: 'npc_dota_hero_ember_spirit',
            displayName: '灰烬之灵',
            position: '战士',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['元素'],
            class: ['刺客'],
            health: 850,
            maxMana: 100,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 5.2,
            damageManaRecovery: 5,
            skillCooldown: 8.93,
            damage: 65,
            armor: 7,
            physicalDamageReduction: 29.58,
            magicDefense: 25,
            attackRange: 200,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 42.25,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['ember_spirit_searing_chains']
        });
        
        // 敌法师 - 坦克
        database.set('anti_mage', {
            id: 'anti_mage',
            unitName: 'npc_dota_hero_antimage',
            displayName: '敌法师',
            position: '坦克',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['恶魔猎手'],
            class: ['刺客'],
            health: 800,
            maxMana: 80,
            initialMana: 50,
            healthRecovery: 0,
            naturalManaRecovery: 0,
            attackManaRecovery: 5.2,
            damageManaRecovery: 5,
            skillCooldown: 7.84,
            damage: 60,
            armor: 7,
            physicalDamageReduction: 29.58,
            magicDefense: 20,
            attackRange: 200,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 39.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['antimage_mana_break']
        });
        
        // 恐怖利刃 (Terrorblade) - 法师
        database.set('terrorblade', {
            id: 'terrorblade',
            unitName: 'npc_dota_hero_terrorblade',
            displayName: '恐怖利刃',
            position: '法师',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['恶魔'],
            class: ['战士'],
            health: 800,
            maxMana: 140,
            initialMana: 60,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 4.8,
            damageManaRecovery: 5,
            skillCooldown: 12.96,
            damage: 65,
            armor: 6,
            physicalDamageReduction: 26.47,
            magicDefense: 20,
            attackRange: 200,
            attackSpeed: 0.60,
            attackInterval: 1.67,
            dps: 39.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['terrorblade_metamorphosis']
        });
        
        // 冥界亚龙 (Viper) - 射手
        database.set('viper', {
            id: 'viper',
            unitName: 'npc_dota_hero_viper',
            displayName: '冥界亚龙',
            position: '射手',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['龙族'],
            class: ['射手'],
            health: 750,
            maxMana: 0,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 0,
            attackManaRecovery: 6,
            damageManaRecovery: 0,
            skillCooldown: 0.00,
            damage: 70,
            armor: 4,
            physicalDamageReduction: 19.35,
            magicDefense: 15,
            attackRange: 600,
            attackSpeed: 0.75,
            attackInterval: 1.33,
            dps: 52.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['viper_poison_attack']
        });
        
        // 死亡先知 (Death Prophet) - 辅助
        database.set('death_prophet', {
            id: 'death_prophet',
            unitName: 'npc_dota_hero_death_prophet',
            displayName: '死亡先知',
            position: '辅助',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['不死'],
            class: ['法师'],
            health: 750,
            maxMana: 100,
            initialMana: 40,
            healthRecovery: 0,
            naturalManaRecovery: 3,
            attackManaRecovery: 5.6,
            damageManaRecovery: 0,
            skillCooldown: 11.63,
            damage: 60,
            armor: 5,
            physicalDamageReduction: 23.08,
            magicDefense: 15,
            attackRange: 400,
            attackSpeed: 0.70,
            attackInterval: 1.43,
            dps: 42.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['death_prophet_crypt_swarm']
        });
        
        // ========== 四费棋子 (Cost 4) ==========
        
        // 孽主 (Underlord) - 坦克
        database.set('underlord', {
            id: 'underlord',
            unitName: 'npc_dota_hero_abyssal_underlord',
            displayName: '孽主',
            position: '坦克',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['恶魔'],
            class: ['战士'],
            health: 1100,
            maxMana: 130,
            initialMana: 40,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 4.8,
            damageManaRecovery: 5,
            skillCooldown: 12.04,
            damage: 70,
            armor: 8,
            physicalDamageReduction: 32.43,
            magicDefense: 30,
            attackRange: 200,
            attackSpeed: 0.60,
            attackInterval: 1.67,
            dps: 42.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['abyssal_underlord_firestorm']
        });
        
        // 影魔 (Shadow Fiend) - 射手
        database.set('shadow_fiend', {
            id: 'shadow_fiend',
            unitName: 'npc_dota_hero_nevermore',
            displayName: '影魔',
            position: '射手',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['恶魔'],
            class: ['法师'],
            health: 850,
            maxMana: 6,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 0,
            damageManaRecovery: 0,
            skillCooldown: 6.00,
            damage: 0, // 表格中为空，使用默认值
            armor: 6,
            physicalDamageReduction: 26.47,
            magicDefense: 25,
            attackRange: 0, // 表格中为空
            attackSpeed: 0, // 表格中为空
            attackInterval: 0, // 表格中为空
            dps: 55.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['nevermore_shadowraze']
        });
        
        // 水晶室女 - 法师
        database.set('crystal_maiden', {
            id: 'crystal_maiden',
            unitName: 'npc_dota_hero_crystal_maiden',
            displayName: '水晶室女',
            position: '法师',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['人类'],
            class: ['法师'],
            health: 900,
            maxMana: 150,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 5,
            attackManaRecovery: 5.2,
            damageManaRecovery: 0,
            skillCooldown: 14.71,
            damage: 60,
            armor: 5,
            physicalDamageReduction: 23.08,
            magicDefense: 20,
            attackRange: 600,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 39.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['crystal_maiden_crystal_nova']
        });
        
        // 食人魔法师 (Ogre Magi) - 辅助
        database.set('ogre_magi', {
            id: 'ogre_magi',
            unitName: 'npc_dota_hero_ogre_magi',
            displayName: '食人魔法师',
            position: '辅助',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['兽人'],
            class: ['法师'],
            health: 1100,
            maxMana: 80,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 4.8,
            damageManaRecovery: 5,
            skillCooldown: 7.41,
            damage: 60,
            armor: 7,
            physicalDamageReduction: 29.58,
            magicDefense: 25,
            attackRange: 200,
            attackSpeed: 0.60,
            attackInterval: 1.67,
            dps: 36.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['ogre_magi_fireblast']
        });
        
        // ========== 五费棋子 (Cost 5) ==========
        
        // 谜团 (Enigma) - 法师
        database.set('enigma', {
            id: 'enigma',
            unitName: 'npc_dota_hero_enigma',
            displayName: '谜团',
            position: '法师',
            rarity: ChessRarity.LEGENDARY,
            cost: 5,
            race: ['元素'],
            class: ['法师'],
            health: 1000,
            maxMana: 150,
            initialMana: 50,
            healthRecovery: 0,
            naturalManaRecovery: 4,
            attackManaRecovery: 5.2,
            damageManaRecovery: 0,
            skillCooldown: 16.30,
            damage: 70,
            armor: 6,
            physicalDamageReduction: 26.47,
            magicDefense: 20,
            attackRange: 800,
            attackSpeed: 0.65,
            attackInterval: 1.54,
            dps: 45.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['enigma_black_hole']
        });
        
        // 破晓晨星 (Dawnbreaker) - 坦克
        database.set('dawnbreaker', {
            id: 'dawnbreaker',
            unitName: 'npc_dota_hero_dawnbreaker',
            displayName: '破晓晨星',
            position: '坦克',
            rarity: ChessRarity.LEGENDARY,
            cost: 5,
            race: ['人类'],
            class: ['战士'],
            health: 1300,
            maxMana: 140,
            initialMana: 20,
            healthRecovery: 0,
            naturalManaRecovery: 1,
            attackManaRecovery: 4.8,
            damageManaRecovery: 5,
            skillCooldown: 12.96,
            damage: 70,
            armor: 10,
            physicalDamageReduction: 37.50,
            magicDefense: 40,
            attackRange: 200,
            attackSpeed: 0.60,
            attackInterval: 1.67,
            dps: 42.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['dawnbreaker_fire_wreath']
        });
        
        // 宙斯 (Zeus) - 射手
        database.set('zeus', {
            id: 'zeus',
            unitName: 'npc_dota_hero_zuus',
            displayName: '宙斯',
            position: '射手',
            rarity: ChessRarity.LEGENDARY,
            cost: 5,
            race: ['神'],
            class: ['法师'],
            health: 1000,
            maxMana: 100,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 3,
            attackManaRecovery: 6,
            damageManaRecovery: 0,
            skillCooldown: 11.11,
            damage: 80,
            armor: 6,
            physicalDamageReduction: 26.47,
            magicDefense: 20,
            attackRange: 600,
            attackSpeed: 0.75,
            attackInterval: 1.33,
            dps: 60.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['zuus_arc_lightning']
        });
        
        return database;
    }

    /**
     * 初始化玩家状态
     */
    private initializePlayerStates(): void {
        const playerCount = PlayerResource.GetPlayerCount();
        for (let playerId = 0; playerId < playerCount; playerId++) {
            if (PlayerResource.IsValidPlayer(playerId)) {
                const playerState: PlayerState = {
                    playerId: playerId,
                    health: 100,
                    maxHealth: 100,
                    gold: 1,
                    level: 1,
                    experience: 0,
                    winStreak: 0,
                    lossStreak: 0,
                    boardPieces: [],
                    benchPieces: [],
                    isAlive: true,
                    rank: 0
                };
                
                this.gameState.playerStates.set(playerId, playerState);
            }
        }
    }

    /**
     * 发放回合收入
     */
    private distributeRoundIncome(): void {
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (!playerState.isAlive) continue;
            
            // 基础收入
            let income = 5;
            
            // 利息收入 (每10金币获得1金币利息，最多5金币)
            const interestIncome = Math.min(Math.floor(playerState.gold / 10), 5);
            income += interestIncome;
            
            // 连胜/连败奖励
            if (playerState.winStreak >= 2) {
                income += Math.min(playerState.winStreak, 3);
            }
            if (playerState.lossStreak >= 2) {
                income += Math.min(playerState.lossStreak, 3);
            }
            
            playerState.gold += income;
            
            print(`[AutoChessMode] Player ${playerId} received ${income} gold (total: ${playerState.gold})`);
        }
    }

    /**
     * 刷新所有玩家商店
     */
    private refreshAllPlayersShop(): void {
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (!playerState.isAlive) continue;
            
            const shopPieces = this.generateShopPieces(playerState.level);
            
            // 通过网络表发送商店数据
            if (GameRules.XNetTable) {
                GameRules.XNetTable.SetTableValue('autochess_shop', `player_${playerId}`, {
                    pieces: shopPieces,
                    refreshCount: 0,
                    timestamp: getTimestamp()
                });
            }
        }
    }

    /**
     * 生成商店棋子
     */
    private generateShopPieces(playerLevel: number): ChessPiece[] {
        const shopPieces: ChessPiece[] = [];
        const pieceCount = 5; // 商店显示5个棋子
        
        // 根据玩家等级计算各稀有度出现概率
        const rarityChances = this.calculateRarityChances(playerLevel);
        
        for (let i = 0; i < pieceCount; i++) {
            const rarity = this.selectRandomRarity(rarityChances);
            const piece = this.selectRandomPieceByRarity(rarity);
            if (piece) {
                shopPieces.push(piece);
            }
        }
        
        return shopPieces;
    }

    /**
     * 计算稀有度概率
     */
    private calculateRarityChances(playerLevel: number): Map<ChessRarity, number> {
        const chances = new Map<ChessRarity, number>();
        
        // 根据等级设置概率 (示例数据)
        switch (playerLevel) {
            case 1:
                chances.set(ChessRarity.COMMON, 100);
                break;
            case 2:
                chances.set(ChessRarity.COMMON, 70);
                chances.set(ChessRarity.UNCOMMON, 30);
                break;
            case 3:
                chances.set(ChessRarity.COMMON, 60);
                chances.set(ChessRarity.UNCOMMON, 35);
                chances.set(ChessRarity.RARE, 5);
                break;
            // TODO: 添加更多等级...
            default:
                chances.set(ChessRarity.COMMON, 50);
                chances.set(ChessRarity.UNCOMMON, 35);
                chances.set(ChessRarity.RARE, 10);
                chances.set(ChessRarity.EPIC, 4);
                chances.set(ChessRarity.LEGENDARY, 1);
        }
        
        return chances;
    }

    /**
     * 随机选择稀有度
     */
    private selectRandomRarity(chances: Map<ChessRarity, number>): ChessRarity {
        let totalChance = 0;
        for (const chance of chances.values()) {
            totalChance += chance;
        }
        
        const random = RandomFloat(0, totalChance);
        let currentChance = 0;
        
        for (const [rarity, chance] of chances) {
            currentChance += chance;
            if (random <= currentChance) {
                return rarity;
            }
        }
        
        return ChessRarity.COMMON; // 默认返回普通
    }

    /**
     * 根据稀有度随机选择棋子
     */
    private selectRandomPieceByRarity(rarity: ChessRarity): ChessPiece | null {
        const pieces: ChessPiece[] = [];
        
        for (const piece of this.chessPieceDatabase.values()) {
            if (piece.rarity === rarity) {
                // 检查棋子池是否还有库存
                const remaining = this.gameState.chessPool.get(piece.id) || 0;
                if (remaining > 0) {
                    pieces.push(piece);
                }
            }
        }
        
        if (pieces.length === 0) {
            return null;
        }
        
        const randomIndex = RandomInt(0, pieces.length - 1);
        return pieces[randomIndex];
    }

    /**
     * 设置战斗配对（仅AI对战）
     */
    private setupBattleMatching(): void {
        // 所有玩家都对战AI，无需配对
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                // 通知客户端将要对战AI
                (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_battle_vs_ai', {
                    playerId: playerId,
                    round: this.gameState.currentRound,
                    aiLevel: Math.floor(this.gameState.currentRound / 5) + 1
                });
            }
        }
    }

    /**
     * 开始所有战斗（仅AI对战）
     */
    private startAllBattles(): void {
        // 所有玩家都对战AI
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                // AI等级随回合增加
                const aiLevel = Math.floor(this.gameState.currentRound / 5) + 1;
                
                print(`[AutoChessMode] Player ${playerId} vs AI (Level ${aiLevel})`);
                
                // 开始对战AI
                this.battleSystem.startBattleVsAI(playerId, aiLevel);
            }
        }
        
        print('[AutoChessMode] Started all AI battles');
    }

    /**
     * 停止所有战斗
     */
    private stopAllBattles(): void {
        // 清理所有玩家的棋子
        for (const [playerId, playerState] of this.gameState.playerStates) {
            this.battleSystem.clearPlayerPieces(playerId);
        }
        
        print('[AutoChessMode] Stopped all battles');
    }

    /**
     * 计算战斗结果（AI对战）
     * 注意：这个方法现在主要用于时间结束时作为备用计算，正常情况下结果已经在 onBattleCompleted 中处理
     */
    private calculateBattleResults(): void {
        const battles = this.battleSystem.getActiveBattles();
        
        for (const battle of battles) {
            if (!battle.completed) {
                continue;
            }
            
            // 使用 player1 和 player2 的组合作为唯一标识
            const battleKey = `${battle.player1}_vs_${battle.player2}`;
            
            // 如果已经处理过，跳过
            if (this.battleResultsProcessed.has(battleKey)) {
                continue;
            }
            
            const playerId = battle.player1;  // player1总是玩家，player2是AI(-1)
            const playerState = this.gameState.playerStates.get(playerId);
            
            if (!playerState) {
                continue;
            }
            
            // 标记为已处理
            this.battleResultsProcessed.add(battleKey);
            
            // 判断玩家是否获胜
            if (battle.winnerId === playerId) {
                // 玩家胜利
                playerState.winStreak++;
                playerState.lossStreak = 0;
                
                print(`[AutoChessMode] Player ${playerId} defeated AI!`);
            } else {
                // 玩家失败，扣除生命值
                const damage = Math.min(10, this.gameState.currentRound);
                playerState.health -= damage;
                
                // 更新连胜/连败
                playerState.lossStreak++;
                playerState.winStreak = 0;
                
                print(`[AutoChessMode] Player ${playerId} lost to AI (${damage} damage)`);
                
                // 检查是否淘汰
                if (playerState.health <= 0) {
                    playerState.isAlive = false;
                    playerState.health = 0;
                    print(`[AutoChessMode] Player ${playerId} eliminated!`);
                }
            }
        }
        
        print('[AutoChessMode] Calculated battle results');
    }

    /**
     * 检查游戏是否结束
     */
    private checkGameEnd(): boolean {
        // 检查玩家棋子是否全部死亡
        // 玩家没有生命值，只要有棋子活着就继续游戏
        const activeBattles = this.battleSystem.getActiveBattles();
        
        print(`[AutoChessMode] checkGameEnd: activeBattles=${activeBattles.length}, round=${this.gameState.currentRound}`);
        
        // 检查最近完成的战斗结果
        for (const battle of activeBattles) {
            if (battle.completed && battle.player1 >= 0) {
                // 检查玩家棋子是否全部死亡
                const playerPiecesAlive = battle.player1Pieces?.filter(p => 
                    p.unit && !p.unit.IsNull() && p.unit.IsAlive()
                ).length || 0;
                
                print(`[AutoChessMode] Player ${battle.player1} pieces alive: ${playerPiecesAlive}`);
                
                // 如果玩家棋子全部死亡，游戏结束
                if (playerPiecesAlive === 0 && battle.winnerId !== battle.player1) {
                    print(`[AutoChessMode] Player ${battle.player1} lost all pieces, game over`);
                    return true;
                }
            }
        }
        
        // 达到最大回合数也结束（胜利）
        if (this.gameState.currentRound >= 50) {
            print(`[AutoChessMode] Reached max rounds (50), game over (victory)`);
            return true;
        }
        
        return false; // 继续游戏
    }

    /**
     * 结束游戏
     */
    private endGame(): void {
        this.gameState.isGameActive = false;
        
        // 确定获胜者
        let gameWinner: 'player' | 'enemy' = 'enemy'; // 默认玩家输了
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive && playerState.health > 0) {
                this.gameState.winnerPlayerId = playerId;
                gameWinner = 'player';
                break;
            }
        }
        
        print(`[AutoChessMode] Game ended. Winner: ${gameWinner}, Round: ${this.gameState.currentRound}`);
        
        // 为每个玩家发送游戏结束结算界面
        for (const [playerId, playerState] of this.gameState.playerStates) {
            const settlementData = {
                round: this.gameState.currentRound,
                winner: playerState.isAlive && playerState.health > 0 ? 'player' : 'enemy',
                rewardGold: 0,
                availableStages: [],
                playerSummary: this.buildPlayerSummary(),
                stats: {},
                levelName: undefined,
                isGameOver: true  // 标记这是游戏结束
            };
            
            print(`[AutoChessMode] 📤 Sending game over settlement to player ${playerId}`);
            const player = PlayerResource.GetPlayer(playerId);
            if (player) {
                (CustomGameEventManager.Send_ServerToPlayer as any)(player, 'autochess_wave_settlement', settlementData);
                print(`[AutoChessMode] ✅ Game over settlement sent to player ${playerId}`);
            }
        }
        
        // 通知客户端游戏结束
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_game_ended', {
            winner: this.gameState.winnerPlayerId,
            round: this.gameState.currentRound
        });
    }

    /**
     * 设置游戏环境
     */
    private setupGame(): void {
        // 生成游戏英雄和单位
        // TODO: 实现游戏环境设置
    }

    /**
     * 清理游戏环境
     */
    private cleanupGame(): void {
        if (this.phaseTimer) {
            Timers.RemoveTimer(this.phaseTimer);
            this.phaseTimer = undefined;
        }
        
        // 清理游戏实体
        // TODO: 实现游戏环境清理
    }

    /**
     * 注册事件监听
     */
    private registerEvents(): void {
        print('[AutoChessMode] Registering events...');
        
        // 注意：battle_completed 事件现在通过 ChessBattleSystem 直接调用 handleBattleCompleted
        // RegisterListener 只能监听客户端发送的事件，不能监听 Send_ServerToAllClients
        // 这里保留监听以备客户端需要发送此事件
        CustomGameEventManager.RegisterListener('battle_completed', (userId, data) => {
            print(`[AutoChessMode] battle_completed from client! userId: ${userId}`);
            this.handleBattleCompleted(data);
        });
        
        print('[AutoChessMode] Events registered successfully');
    }
    
    /**
     * 战斗完成事件处理（公开方法，供 ChessBattleSystem 直接调用）
     * 玩家没有生命值，胜负完全基于棋子存活情况
     */
    public handleBattleCompleted(data: any): void {
        const battleId = data.battleId || `battle_${data.player1}_${Date.now()}`;
        const player1 = data.player1;
        const player2 = data.player2 || -1; // AI对战时 player2 是 -1
        const winnerId = data.winnerId;
        
        // 使用 player1 和 player2 的组合作为唯一标识
        const battleKey = `${player1}_vs_${player2}`;
        
        // 判断胜负：玩家赢 = winnerId 等于玩家ID
        const playerWon = winnerId === player1;
        const winner: 'player' | 'enemy' = playerWon ? 'player' : 'enemy';
        
        print(`[AutoChessMode] ========== handleBattleCompleted CALLED ==========`);
        print(`[AutoChessMode] battleId: ${battleId}, battleKey: ${battleKey}`);
        print(`[AutoChessMode] player1: ${player1}, player2: ${player2}, winnerId: ${winnerId}`);
        print(`[AutoChessMode] playerWon: ${playerWon}, winner: ${winner}`);
        print(`[AutoChessMode] isActive: ${this.isActive}, currentPhase: ${this.gameState.currentPhase}`);
        
        // 如果当前不在战斗阶段，直接触发结算（适用于 normal 模式）
        if (this.gameState.currentPhase !== RoundPhase.BATTLE) {
            print(`[AutoChessMode] Not in battle phase, triggering settlement directly`);
            
            // 构建结算数据
            const settlementData = {
                round: this.gameState.currentRound || 1,
                winner: winner,
                rewardGold: 0,
                availableStages: [],
                playerSummary: {},
                stats: {},
                levelName: undefined,
                isGameOver: !playerWon  // 玩家输了就是游戏结束
            };
            
            print(`[AutoChessMode] 📤 Sending settlement to player ${player1} (winner: ${winner}, gameOver: ${!playerWon})`);
            const player = PlayerResource.GetPlayer(player1);
            if (player) {
                (CustomGameEventManager.Send_ServerToPlayer as any)(player, 'autochess_wave_settlement', settlementData);
                print(`[AutoChessMode] ✅ Settlement event sent to player ${player1}`);
            }
            return;
        }
        
        // 防止重复处理同一个战斗
        if (this.battleResultsProcessed.has(battleKey)) {
            print(`[AutoChessMode] Battle ${battleKey} already processed, ignoring`);
            return;
        }
        
        // 标记为已处理
        this.battleResultsProcessed.add(battleKey);
        
        // 记录战斗结果（不再扣血，只记录连胜/连败）
        const playerId = player1;
        const playerState = this.gameState.playerStates.get(playerId);
        
        if (playerState) {
            if (playerWon) {
                playerState.winStreak++;
                playerState.lossStreak = 0;
                print(`[AutoChessMode] Player ${playerId} won the battle! (winStreak: ${playerState.winStreak})`);
                
                // 注意：棋子血量恢复已在 ChessBattleSystem.onBattleComplete 中完成
                
                // 战斗胜利后，解锁下一层关卡
                const currentSelection = this.currentWaveStageSelection || 'n1'; // 如果为空，默认使用 n1
                print(`[AutoChessMode] 🔍 检查关卡解锁: currentWaveStageSelection = ${currentSelection}`);
                print(`[AutoChessMode] ✅ 将解锁关卡: ${currentSelection}`);
                this.unlockNextStages(currentSelection);
            } else {
                playerState.lossStreak++;
                playerState.winStreak = 0;
                // 玩家输了（棋子全死），标记为游戏结束
                    playerState.isAlive = false;
                print(`[AutoChessMode] Player ${playerId} lost all pieces! Game over for this player.`);
            }
        }
        
        // 检查是否所有战斗都已完成
        const allBattlesCompleted = this.checkAllBattlesCompleted();
        
        if (allBattlesCompleted) {
            print(`[AutoChessMode] All battles completed, ending battle phase`);
            // 立即结束战斗阶段（会触发结算）
            this.endBattlePhase();
            } else {
            print(`[AutoChessMode] Waiting for other battles to complete...`);
        }
        
        print(`[AutoChessMode] ========== handleBattleCompleted COMPLETE ==========`);
    }
    
    /**
     * 检查所有战斗是否已完成
     */
    private checkAllBattlesCompleted(): boolean {
        const activeBattles = this.battleSystem.getActiveBattles();
        const alivePlayers = Array.from(this.gameState.playerStates.values())
            .filter(state => state.isAlive).length;
        
        // 如果没有存活的玩家，认为所有战斗完成
        if (alivePlayers === 0) {
            return true;
        }
        
        // 检查是否所有战斗都已完成
        for (const battle of activeBattles) {
            if (!battle.completed) {
                return false;
            }
        }
        
        // 如果所有战斗都已完成，或者没有活跃战斗（可能已经清理），返回true
        return true;
    }

    /**
     * 取消注册事件
     */
    private unregisterEvents(): void {
        // 保留为空，事件清理已移至其他位置
    }


    /**
     * 初始化自走棋模式 - 监听游戏状态事件
     */
    private initializeAutoChessMode(): void {
        print("[AutoChessMode] ========== 初始化自走棋模式 ==========");
        
        // 监听游戏状态变化
        ListenToGameEvent('game_rules_state_change', () => {
            this.onGameStateChanged();
        }, this);
        
        print("[AutoChessMode] ✅ 游戏状态事件监听已注册");
        
        // 立即检查当前状态（可能已经在游戏中）
        const currentState = GameRules.State_Get();
        print(`[AutoChessMode] 当前游戏状态: ${currentState}`);
        
        // 如果已经在游戏中（state >= 5），立即尝试激活
        if (currentState >= 5) {
            print(`[AutoChessMode] 游戏已在进行中，立即尝试激活...`);
            Timers.CreateTimer(1.0, () => {
                if (!this.isActive) {
                    print(`[AutoChessMode] 延迟激活自走棋模式...`);
                    this.onPreGame();
                }
                return undefined;
            });
        }
    }
    
    /**
     * 游戏状态变化处理
     */
    private onGameStateChanged(): void {
        const gameState = GameRules.State_Get();
        
        // 获取状态名称
        const stateNames = [
            'INIT',
            'WAIT_FOR_PLAYERS_TO_LOAD',
            'CUSTOM_GAME_SETUP',
            'HERO_SELECTION',
            'STRATEGY_TIME',
            'PRE_GAME',
            'GAME_IN_PROGRESS',
            'POST_GAME',
            'DISCONNECT',
            'TEAM_SHOWCASE',
            'CUSTOM_GAME_SETUP_2',
            'WAIT_FOR_MAP_TO_LOAD'
        ];
        const stateName = stateNames[gameState] || `UNKNOWN_${gameState}`;
        
        print(`[AutoChessMode] ========== 游戏状态变化: ${gameState} (${stateName}) ==========`);
        
        // 根据实际状态名称判断
        // PRE_GAME = 5 (从日志看，这个阶段在后面，可能是状态8)
        // GAME_IN_PROGRESS = 6 (需要确认)
        
        // 在 PRE_GAME 或更晚的阶段激活自走棋
        if (gameState === 5 || gameState === 8) { // PRE_GAME
            if (!this.isActive) {
                print('[AutoChessMode] 📍 PRE_GAME 阶段 - 准备激活自走棋');
                this.onPreGame();
            }
        }
        
        // 在真正的 GAME_IN_PROGRESS 阶段开始游戏
        if (gameState === 6 && stateName === 'GAME_IN_PROGRESS') {
            if (this.isActive && !this.gameState.isGameActive) {
                print('[AutoChessMode] 📍 GAME_IN_PROGRESS 阶段 - 游戏开始');
                this.onGameStart();
            }
        }
    }
    
    /**
     * PRE_GAME 阶段处理
     */
    private onPreGame(): void {
        const gameModeManager = GameModeManager.getInstance();
        const currentMode = gameModeManager.getCurrentMode();
        
        print(`[AutoChessMode] onPreGame called, current mode: ${currentMode}`);
        print(`[AutoChessMode] isAutoChessMode: ${gameModeManager.isAutoChessMode()}`);
        
        // 无论什么模式都激活自走棋（因为战斗系统需要它）
        // 原先的检查导致 normal 模式下无法显示结算界面
        if (!gameModeManager.isAutoChessMode()) {
            print('[AutoChessMode] ⚠️ 不是自走棋模式，但仍然激活以支持战斗系统');
            // 不再 return，继续激活
        }
        
        print('[AutoChessMode] ✅ 激活自走棋模式...');
        this.activate();
        
        // 激活后等待2秒开始游戏（给游戏环境一点时间初始化）
        print('[AutoChessMode] 📍 将在2秒后开始游戏...');
        Timers.CreateTimer(2.0, () => {
            if (this.isActive && !this.gameState.isGameActive) {
                print('[AutoChessMode] ✅ 自动开始游戏...');
                this.startGame();
            }
            return undefined;
        });
    }
    
    /**
     * 游戏开始阶段处理
     */
    private onGameStart(): void {
        if (!this.isActive) {
            print('[AutoChessMode] ⚠️ 自走棋模式未激活，跳过游戏开始');
            return;
        }
        
        print('[AutoChessMode] ✅ 自动开始游戏...');
        this.startGame();
    }

    /**
     * 同步状态到网络表
     */
    private syncStateToNetTable(): void {
        if (GameRules.XNetTable) {
            GameRules.XNetTable.SetTableValue('autochess_game', 'state', {
                isActive: this.isActive,
                gameState: {
                    currentRound: this.gameState.currentRound,
                    currentPhase: this.gameState.currentPhase,
                    phaseTimeLeft: this.gameState.phaseTimeLeft,
                    isGameActive: this.gameState.isGameActive
                },
                timestamp: getTimestamp()
            });
        }
    }

    /**
     * 获取状态
     */
    public getStatus(): any {
        return {
            isActive: this.isActive,
            gameState: this.gameState,
            chessPieceCount: this.chessPieceDatabase.size
        };
    }

    /**
     * 购买棋子
     */
    public buyChessPiece(playerId: PlayerID, pieceId: string): boolean {
        const playerState = this.gameState.playerStates.get(playerId);
        const piece = this.chessPieceDatabase.get(pieceId);
        
        if (!playerState || !piece) {
            return false;
        }
        
        // 检查金币是否足够
        if (playerState.gold < piece.cost) {
            return false;
        }
        
        // 检查棋子池是否有库存
        const remaining = this.gameState.chessPool.get(pieceId) || 0;
        if (remaining <= 0) {
            return false;
        }
        
        // 检查备战席是否有空位
        if (playerState.benchPieces.length >= 8) {
            return false;
        }
        
        // 执行购买
        playerState.gold -= piece.cost;
        playerState.benchPieces.push(piece);
        this.gameState.chessPool.set(pieceId, remaining - 1);
        
        print(`[AutoChessMode] Player ${playerId} bought ${piece.displayName}`);
        
        // 同步到客户端
        this.syncPlayerState(playerId);
        
        return true;
    }

    /**
     * 同步玩家状态到客户端
     */
    private syncPlayerState(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState || !GameRules.XNetTable) {
            return;
        }
        
        GameRules.XNetTable.SetTableValue('autochess_player', `player_${playerId}`, {
            health: playerState.health,
            maxHealth: playerState.maxHealth,
            gold: playerState.gold,
            level: playerState.level,
            experience: playerState.experience,
            winStreak: playerState.winStreak,
            lossStreak: playerState.lossStreak,
            boardPieces: playerState.boardPieces,
            benchPieces: playerState.benchPieces,
            isAlive: playerState.isAlive,
            rank: playerState.rank,
            timestamp: getTimestamp()
        });
    }

    /**
     * 获取棋子定义（公开方法）
     */
    public getChessPiece(pieceId: string): ChessPiece | null {
        return this.chessPieceDatabase.get(pieceId) || null;
    }

    /**
     * 获取所有棋子定义（公开方法）
     */
    public getAllChessPieces(): ChessPiece[] {
        return Array.from(this.chessPieceDatabase.values());
    }

    /**
     * 触发波次结算
     */
    private triggerWaveSettlement(): void {
        if (this.currentWaveSettlementShown) {
            print('[AutoChessMode] Wave settlement already shown');
            return;
        }

        // 标记已显示
        this.currentWaveSettlementShown = true;
        this.currentWaveSettlementPending = true;

        print('[AutoChessMode] ========== Triggering wave settlement ==========');
        print(`[AutoChessMode] Current round: ${this.gameState.currentRound}`);

        // 为所有玩家发送结算事件（不管胜负，都要显示界面）
        for (const [playerId, playerState] of this.gameState.playerStates) {
            // 判断胜负：isAlive 为 true 表示玩家赢了（还有棋子活着）
            // isAlive 为 false 表示玩家输了（棋子全死了）
            const playerWon = playerState.isAlive;
            const winner: 'player' | 'enemy' = playerWon ? 'player' : 'enemy';
            const isGameOver = !playerWon;  // 玩家输了就是游戏结束
            
            print(`[AutoChessMode] Player ${playerId}: isAlive=${playerState.isAlive}, winner=${winner}, isGameOver=${isGameOver}`);

        const settlementData = {
            round: this.gameState.currentRound,
                winner: winner,
                rewardGold: playerWon ? this.currentWaveRewardAmount : 0,
                availableStages: playerWon ? ['stage_1', 'stage_2', 'stage_3'] : [],
                playerSummary: this.buildPlayerSummary(),
                stats: {},
                levelName: undefined as string | undefined,
                isGameOver: isGameOver  // 玩家输了就是游戏结束
            };

            // 如果有选择的关卡，添加关卡名称
            if (this.currentWaveStageSelection) {
                const stageId = parseInt(this.currentWaveStageSelection);
                settlementData.levelName = `关卡${stageId}`;
            }

            print(`[AutoChessMode] 📤 Sending wave settlement to player ${playerId} (winner: ${winner}, gameOver: ${isGameOver})`);
            const player = PlayerResource.GetPlayer(playerId);
            if (player) {
                (CustomGameEventManager.Send_ServerToPlayer as any)(player, 'autochess_wave_settlement', settlementData);
                print(`[AutoChessMode] ✅ Event sent successfully to player ${playerId}`);
            } else {
                print(`[AutoChessMode] ❌ Player ${playerId} not found!`);
            }
        }

        // 同时发送可选关卡列表（用于选关界面）
        // 在结算时总是发送，让玩家可以在结算界面选择下一关
        this.sendAvailableStages();
        
        // 单机模式：立即发送关卡解锁状态更新（确保客户端显示正确的解锁状态）
        this.sendStageUnlockUpdate();

        print('[AutoChessMode] ========== Wave settlement triggered ==========');
    }

    /**
     * 构建玩家摘要信息
     */
    private buildPlayerSummary(): any {
        const summary: any = {};
        for (const [playerId, playerState] of this.gameState.playerStates) {
            summary[playerId] = {
                health: playerState.health,
                gold: playerState.gold,
                isAlive: playerState.isAlive,
                winStreak: playerState.winStreak,
                lossStreak: playerState.lossStreak
            };
        }
        return summary;
    }

    /**
     * 处理继续战斗按钮
     */
    public handleWaveContinue(playerId: PlayerID): void {
        if (!this.currentWaveSettlementPending) {
            print(`[AutoChessMode] No settlement pending for player ${playerId}`);
            return;
        }

        print(`[AutoChessMode] Player ${playerId} chose to continue battle`);

        // 清除pending状态
        this.currentWaveSettlementPending = false;

        // 通知客户端关闭UI
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_wave_settlement_dismiss', {});

        // 进入下一回合
        this.gameState.currentRound++;
        this.startPreparationPhase();
    }

    /**
     * 处理领取奖励按钮
     */
    public handleWaveRewardClaim(playerId: PlayerID): void {
        if (this.currentWaveRewardClaimed.has(playerId)) {
            print(`[AutoChessMode] Player ${playerId} already claimed reward`);
            return;
        }

        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] Player state not found for ${playerId}`);
            return;
        }

        // 发放奖励
        playerState.gold += this.currentWaveRewardAmount;
        this.currentWaveRewardClaimed.add(playerId);

        print(`[AutoChessMode] Player ${playerId} claimed ${this.currentWaveRewardAmount} gold (total: ${playerState.gold})`);

        // 通知客户端奖励已发放
        (CustomGameEventManager.Send_ServerToPlayer as any)(
            PlayerResource.GetPlayer(playerId),
            'autochess_wave_reward_granted',
            {
                amount: this.currentWaveRewardAmount,
                newTotal: playerState.gold
            }
        );

        // 同步玩家状态
        this.syncPlayerState(playerId);
    }

    /**
     * 发送可用的关卡列表到客户端
     */
    private sendAvailableStages(): void {
        // 获取所有关卡配置
        const allStages = StageConfigManager.getAllStageConfigs();
        const availableStages: any[] = [];
        
        for (const [stageId, config] of allStages) {
            availableStages.push({
                id: stageId.toString(),
                name: `关卡${stageId}`,
                type: config.primaryNodeType,
                nodeLevel: config.nodeLevel,
                description: this.getStageDescription(config)
            });
        }
        
        // 发送到所有客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_stages_available', {
            stages: availableStages,
            round: this.gameState.currentRound
        });
        
        print(`[AutoChessMode] Sent ${availableStages.length} available stages to clients`);
    }

    /**
     * 解锁下一层关卡
     * 根据节点连接关系，将已完成关卡的连接关卡标记为可用
     */
    private unlockNextStages(completedStageId: string): void {
        print(`[AutoChessMode] 🔓 ========== 开始解锁关卡流程 ==========`);
        print(`[AutoChessMode] 🔓 输入的关卡ID: ${completedStageId}`);
        
        // 将节点ID转换为关卡节点ID（例如 "2" -> "n2"）
        const nodeId = this.stageIdToNodeId(completedStageId);
        
        if (!nodeId) {
            print(`[AutoChessMode] ❌ 警告: 无法将关卡ID ${completedStageId} 转换为节点ID`);
            return;
        }
        
        print(`[AutoChessMode] 🔓 转换后的节点ID: ${nodeId}`);
        print(`[AutoChessMode] 🔓 解锁前状态:`);
        print(`[AutoChessMode] 🔓   - 已完成: ${this.getSetAsString(this.completedStages)}`);
        print(`[AutoChessMode] 🔓   - 可用: ${this.getSetAsString(this.availableStages)}`);
        
        // 标记为已完成
        this.completedStages.add(nodeId);
        this.availableStages.delete(nodeId); // 从可用列表中移除（已完成）
        
        // 获取节点连接关系（从客户端节点数据）
        const nextNodes = this.getConnectedNodes(nodeId);
        print(`[AutoChessMode] 🔓 节点 ${nodeId} 连接的下一层: ${nextNodes.join(', ')}`);
        
        // 解锁连接的下一层关卡
        for (const nextNodeId of nextNodes) {
            if (!this.completedStages.has(nextNodeId)) {
                this.availableStages.add(nextNodeId);
                print(`[AutoChessMode] ✅ 解锁关卡: ${nextNodeId}`);
            } else {
                print(`[AutoChessMode] ⏭️ 关卡 ${nextNodeId} 已完成，跳过`);
            }
        }
        
        print(`[AutoChessMode] 🔓 解锁后状态:`);
        print(`[AutoChessMode] 🔓   - 已完成: ${this.getSetAsString(this.completedStages)}`);
        print(`[AutoChessMode] 🔓   - 可用: ${this.getSetAsString(this.availableStages)}`);
        
        // 发送更新到客户端
        print(`[AutoChessMode] 🔓 准备发送更新到客户端...`);
        this.sendStageUnlockUpdate();
        print(`[AutoChessMode] 🔓 ========== 解锁关卡流程完成 ==========`);
    }
    
    /** 辅助方法：将Set转换为字符串用于日志 */
    private getSetAsString(set: Set<string>): string {
        const arr: string[] = [];
        set.forEach(item => arr.push(item));
        return arr.length > 0 ? arr.join(', ') : '(空)';
    }

    /**
     * 将关卡ID转换为节点ID
     * 例如: "2" -> "n2", "1" -> "n1"
     */
    private stageIdToNodeId(stageId: string): string | null {
        // 如果已经是节点ID格式（n开头），直接返回
        if (stageId.startsWith('n')) {
            return stageId;
        }
        
        // 否则转换为节点ID格式
        const num = parseInt(stageId);
        if (isNaN(num)) {
            return null;
        }
        
        return `n${num}`;
    }

    /**
     * 获取节点连接的下一层节点
     * 根据节点连接关系返回
     */
    private getConnectedNodes(nodeId: string): string[] {
        // 节点连接关系（与客户端保持一致）
        const nodeConnections: { [key: string]: string[] } = {
            'n1': ['n2', 'n3'],      // 起始点 -> 森林小径, 危险矿洞
            'n2': ['n4', 'n5'],      // 森林小径 -> 神秘商人, 野兽巢穴
            'n3': ['n5', 'n6'],      // 危险矿洞 -> 野兽巢穴, 精英守卫
            'n4': ['n7'],            // 神秘商人 -> 休息营地
            'n5': ['n7', 'n8'],      // 野兽巢穴 -> 休息营地, 古老遗迹
            'n6': ['n8'],            // 精英守卫 -> 古老遗迹
            'n7': ['n9'],            // 休息营地 -> 黑暗前厅
            'n8': ['n9', 'n10'],     // 古老遗迹 -> 黑暗前厅, 远古巨龙
            'n9': ['n10'],           // 黑暗前厅 -> 远古巨龙
            'n10': []                // 远古巨龙（Boss，无后续）
        };
        
        return nodeConnections[nodeId] || [];
    }

    /**
     * 发送关卡解锁更新到客户端（公开方法，供外部调用）
     */
    public sendStageUnlockUpdate(): void {
        print(`[AutoChessMode] ========== 开始发送关卡解锁更新 ==========`);
        
        // 构建节点状态数据
        const nodes: any[] = [];
        
        // 获取所有节点（与客户端节点数据保持一致）
        const allNodeIds = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10'];
        
        for (const nodeId of allNodeIds) {
            let status: 'locked' | 'available' | 'current' | 'completed' = 'locked';
            
            if (this.completedStages.has(nodeId)) {
                status = 'completed';
            } else if (this.availableStages.has(nodeId)) {
                status = 'available';
            }
            
            nodes.push({
                id: nodeId,
                status: status
            });
        }
        
        // 手动构建数组（避免 Array.from 的序列化问题）
        const completedArray: string[] = [];
        this.completedStages.forEach((value) => {
            completedArray.push(value);
        });
        
        const availableArray: string[] = [];
        this.availableStages.forEach((value) => {
            availableArray.push(value);
        });
        
        print(`[AutoChessMode] 已完成关卡数量: ${this.completedStages.size}, 数组长度: ${completedArray.length}`);
        print(`[AutoChessMode] 可用关卡数量: ${this.availableStages.size}, 数组长度: ${availableArray.length}`);
        print(`[AutoChessMode] 节点数量: ${nodes.length}`);
        
        // 输出详细状态
        print(`[AutoChessMode] 节点状态详情:`);
        for (const node of nodes) {
            print(`[AutoChessMode]   - ${node.id}: ${node.status}`);
        }
        
        print(`[AutoChessMode] 已完成关卡列表: ${completedArray.join(', ')}`);
        print(`[AutoChessMode] 可用关卡列表: ${availableArray.join(', ')}`);
        
        // 发送更新事件到客户端
        const updateData = {
            currentStage: this.completedStages.size,
            maxStages: 10,
            nodes: nodes,
            completedStages: completedArray,
            availableStages: availableArray
        };
        
        print(`[AutoChessMode] 📤 准备发送数据...`);
        (CustomGameEventManager.Send_ServerToAllClients as any)('update_stage_data', updateData);
        print(`[AutoChessMode] ✅ 数据已发送`);
    }

    /**
     * 获取关卡描述
     */
    private getStageDescription(config: any): string {
        const typeNames: { [key: string]: string } = {
            'normal_battle': '普通战斗',
            'elite_battle': '精英战斗',
            'event': '事件',
            'event_evacuate': '事件/撤离',
            'boss': 'Boss'
        };
        
        const typeName = typeNames[config.primaryNodeType] || config.primaryNodeType;
        const monsterCount = StageConfigManager.rollMonsterCount(config.stageId);
        const totalCount = monsterCount.normalCount + (monsterCount.specialCount || 0);
        
        return `${typeName} | 怪物数量: ${totalCount}个`;
    }

    /**
     * 处理选择关卡按钮
     * 点击选关后：5秒准备阶段 -> 生成怪物 -> 开始战斗
     */
    public handleWaveStageSelection(playerId: PlayerID, stageId: string): void {
        // 将关卡ID转换为节点ID
        const nodeId = this.stageIdToNodeId(stageId);
        
        // 验证关卡是否已解锁
        if (!nodeId || !this.availableStages.has(nodeId)) {
            print(`[AutoChessMode] ERROR: 关卡未解锁或无效 - stageId: ${stageId}, nodeId: ${nodeId}`);
            print(`[AutoChessMode] 可用关卡: ${Array.from(this.availableStages).join(', ')}`);
            // 通知客户端选择失败
            (CustomGameEventManager.Send_ServerToPlayer as any)(
                PlayerResource.GetPlayer(playerId),
                'autochess_wave_stage_ack',
                {
                    stageId: stageId,
                    success: false,
                    message: '关卡未解锁，请先完成前置关卡'
                }
            );
            return;
        }
        
        // 验证关卡ID是否有效
        const stageIdNum = parseInt(stageId);
        const stageConfig = StageConfigManager.getStageConfig(stageIdNum);
        
        if (!stageConfig) {
            print(`[AutoChessMode] ERROR: 无效的关卡ID: ${stageId}`);
            // 通知客户端选择失败
            (CustomGameEventManager.Send_ServerToPlayer as any)(
                PlayerResource.GetPlayer(playerId),
                'autochess_wave_stage_ack',
                {
                    stageId: stageId,
                    success: false,
                    message: '无效的关卡ID'
                }
            );
            return;
        }
        
        print(`[AutoChessMode] ========== 玩家选择关卡 ==========`);
        print(`[AutoChessMode] Player ${playerId} selected stage: ${stageId} (${stageConfig.primaryNodeType})`);

        // 清理当前状态（如果有正在进行的战斗阶段，先停止）
        if (this.phaseTimer) {
            Timers.RemoveTimer(this.phaseTimer);
            this.phaseTimer = undefined;
            print(`[AutoChessMode] 已停止当前阶段计时器`);
        }

        // 清理所有棋子（包括玩家棋子），新关卡时会重新创建
        this.stopAllBattles();
        print(`[AutoChessMode] 已清理所有棋子（包括玩家棋子），新关卡时会重新创建`);

        // 重置结算状态
        this.resetWaveSettlementState();

        // 记录选择
        this.currentWaveStageSelection = stageId;
        print(`[AutoChessMode] 📝 已设置 currentWaveStageSelection = ${this.currentWaveStageSelection}`);

        // 通知客户端确认，进入准备阶段
        (CustomGameEventManager.Send_ServerToAllClients as any)(
            'autochess_wave_stage_ack',
            {
                playerId: playerId,
                stageId: stageId,
                success: true,
                stageName: `关卡${stageId}`,
                stageType: stageConfig.primaryNodeType,
                message: `已选择关卡${stageId}，准备开始...`
            }
        );

        // 开始5秒准备阶段
        print(`[AutoChessMode] 开始5秒准备阶段...`);
        this.startPreparationCountdown(playerId, stageIdNum);
    }

    /**
     * 开始准备阶段倒计时（5秒）
     */
    private startPreparationCountdown(playerId: PlayerID, stageId: number): void {
        const PREP_TIME = 5;
        let timeLeft = PREP_TIME;
        
        // 如果是第一回合，先进入准备阶段状态并创建初始棋子
        if (this.gameState.currentRound === 0 || this.gameState.currentRound === 1) {
            print(`[AutoChessMode] 第一回合：设置准备阶段状态`);
            this.gameState.currentPhase = RoundPhase.PREPARATION;
            this.gameState.phaseTimeLeft = PREP_TIME;
            
            // 将玩家移动到观战区域（靠近棋盘）
            for (const [pid, playerState] of this.gameState.playerStates) {
                if (playerState.isAlive) {
                    this.battleSystem.movePlayerToSpectatorArea(pid);
                }
            }
            
            // 绘制蓝色六边形网格
            this.battleSystem.recreateHexBoard();
            
            // 为玩家创建初始棋子（准备阶段）
            this.createPlayerInitialPieces();
            
            // 在准备阶段创建敌人棋子（但禁用攻击）
            print(`[AutoChessMode] 准备阶段：创建敌人棋子（禁用攻击）...`);
            this.createEnemyPiecesForPreparation(stageId);
            
            // 单机模式：准备阶段显示背包
            (CustomGameEventManager.Send_ServerToAllClients as any)('show_inventory', {});
            print(`[AutoChessMode] ✅ 第一回合准备阶段状态已设置，棋子已创建`);
        } else {
            // 后续回合：在准备阶段也创建敌人棋子（但禁用攻击）
            print(`[AutoChessMode] 准备阶段：创建敌人棋子（禁用攻击）...`);
            this.createEnemyPiecesForPreparation(stageId);
        }

        // 通知客户端准备阶段开始
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_preparation_started', {
            timeLeft: timeLeft,
            stageId: stageId
        });

        // 创建倒计时计时器
        print(`[AutoChessMode] 创建准备阶段倒计时计时器，初始时间: ${timeLeft}秒`);
        const countdownTimer = Timers.CreateTimer(1.0, () => {
            timeLeft--;
            
            print(`[AutoChessMode] 准备阶段倒计时: ${timeLeft}秒 (stageId: ${stageId}, playerId: ${playerId})`);
            
            // 同步倒计时到客户端
            (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_preparation_countdown', {
                timeLeft: timeLeft,
                stageId: stageId
            });

            if (timeLeft <= 0) {
                // 准备阶段结束，开始战斗
                print(`[AutoChessMode] ========== 准备阶段结束，开始生成怪物并战斗 ==========`);
                print(`[AutoChessMode] 调用 startBattleWithStage(playerId: ${playerId}, stageId: ${stageId})`);
                this.startBattleWithStage(playerId, stageId);
                return undefined; // 停止计时器
            }

            return 1.0; // 继续倒计时
        });
        
        if (!countdownTimer) {
            print(`[AutoChessMode] ❌ 错误：倒计时计时器创建失败！`);
        } else {
            print(`[AutoChessMode] ✅ 倒计时计时器创建成功`);
        }
    }

    /**
     * 使用选定的关卡开始战斗（单机模式）
     */
    private startBattleWithStage(playerId: PlayerID, stageId: number): void {
        print(`[AutoChessMode] ========== 单机模式 - 开始战斗 ==========`);
        print(`[AutoChessMode] 使用关卡: ${stageId}`);
        print(`[AutoChessMode] 选关前回合: ${this.gameState.currentRound}`);

        // 设置游戏状态 - 先增加回合数，再设置阶段
        this.gameState.currentRound++;
        this.gameState.currentPhase = RoundPhase.BATTLE;
        this.gameState.phaseTimeLeft = 45;
        this.gameState.isGameActive = true;  // 确保游戏处于激活状态
        
        print(`[AutoChessMode] 选关后回合: ${this.gameState.currentRound}`);
        print(`[AutoChessMode] 当前阶段: ${this.gameState.currentPhase}`);

        // 检查敌人是否已在准备阶段创建
        const enemyPieces = this.battleSystem.getPlayerPieces(-1);
        const enemiesAlreadyCreated = enemyPieces && enemyPieces.length > 0;
        
        if (enemiesAlreadyCreated) {
            print(`[AutoChessMode] 敌人已在准备阶段创建，启用所有单位攻击能力...`);
            // 启用所有单位攻击
            this.battleSystem.enableAllAttacks();
        } else {
            // 清理之前的AI棋子（如果存在）
        this.battleSystem.clearPlayerPieces(-1);
            
            // 根据关卡配置生成敌人
            print(`[AutoChessMode] 根据关卡 ${stageId} 配置生成敌人...`);
            for (const [pid, playerState] of this.gameState.playerStates) {
                if (playerState.isAlive) {
                    this.createEnemyForPlayer(pid, stageId, false); // false = 战斗阶段，启用攻击
                }
            }
        }
        
        // 重置玩家存活状态
        for (const [pid, playerState] of this.gameState.playerStates) {
            playerState.isAlive = true;
            // 棋子血量已在上一关结束时恢复并保存，重新创建时会自动应用
            print(`[AutoChessMode] 玩家 ${pid} 进入新关卡，准备重新创建棋子`);
        }

        // 重新创建玩家棋子（从备战席或棋盘位置恢复）
        print(`[AutoChessMode] 重新创建玩家棋子...`);
        for (const [pid, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                this.battleSystem.setPlayerAsProtected(pid);
                
                // 从备战席和棋盘位置恢复棋子
                this.recreatePlayerPieces(pid);
                print(`[AutoChessMode] 玩家 ${pid} 棋子已重新创建`);
            }
        }

        // 启用所有单位攻击（战斗阶段）
        print(`[AutoChessMode] 启用所有单位攻击能力...`);
        this.battleSystem.enableAllAttacks();

        // 开始战斗
        this.startAllBattles();

        // 启动战斗计时器
        this.startPhaseTimer();

        // 同步状态到网络表
        this.syncStateToNetTable();

        // 通知客户端战斗开始
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_battle_started', {
            stageId: stageId,
            round: this.gameState.currentRound,
            timeLeft: this.gameState.phaseTimeLeft
        });

        print(`[AutoChessMode] ========== 战斗已开始 ==========`);
    }
}