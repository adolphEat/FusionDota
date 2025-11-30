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

    private constructor() {
        // 初始化关卡配置和英雄费用配置
        StageConfigManager.initialize();
        
        this.chessPieceDatabase = this.initializeChessDatabase();
        this.gameState = this.initializeGameState();
        this.battleSystem = ChessBattleSystem.getInstance();
        this.initializeAutoChessMode();
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
     * 开始游戏
     */
    public startGame(): void {
        if (!this.isActive) {
            print('[AutoChessMode] Mode not active');
            return;
        }

        this.gameState.isGameActive = true;
        this.gameState.currentRound = 1;
        this.gameState.currentPhase = RoundPhase.PREPARATION;
        
        // 初始化所有玩家状态
        this.initializePlayerStates();
        
        // 开始第一回合
        this.startPreparationPhase();
        
        print('[AutoChessMode] Game started');
        
        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_game_started', {
            round: this.gameState.currentRound,
            phase: this.gameState.currentPhase
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
            this.currentWaveStageSelection = '1';
        }
        
        // 启动计时器
        this.startPhaseTimer();
        
        print(`[AutoChessMode] Started preparation phase for round ${this.gameState.currentRound}`);
        
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
                
                // 为第一回合创建初始棋子
                if (this.gameState.currentRound === 1) {
                    this.createFirstRoundPieces(playerId);
                } else {
                    // 后续回合，棋子已经在备战席中
                    this.deployPiecesFromBench(playerId);
                }
                
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
     */
    private createEnemyForPlayer(playerId: PlayerID, stageId: number): void {
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
                    // 创建敌人棋子（在敌方棋盘上）
                    const position = {
                        x: 1 + i,
                        y: 7 // 敌方棋盘位置（假设玩家在y=1，敌人在y=7）
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
                            const position = { x: 1 + i, y: 7 };
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
                        const position = {
                            x: 1 + monsterCount.normalCount + i,
                            y: 7
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
        if (this.phaseTimer) {
            Timers.RemoveTimer(this.phaseTimer);
        }

        this.phaseTimer = Timers.CreateTimer(1.0, () => {
            this.gameState.phaseTimeLeft--;
            
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
        switch (this.gameState.currentPhase) {
            case RoundPhase.PREPARATION:
                this.startBattlePhase();
                break;
            case RoundPhase.BATTLE:
                this.endBattlePhase();
                break;
        }
    }

    /**
     * 结束战斗阶段
     */
    private endBattlePhase(): void {
        if (this.phaseTimer) {
            Timers.RemoveTimer(this.phaseTimer);
            this.phaseTimer = undefined;
        }

        // 停止所有战斗
        this.stopAllBattles();
        
        // 计算战斗结果（如果还没有通过 onBattleCompleted 处理）
        this.calculateBattleResults();
        
        // 检查游戏是否结束
        if (this.checkGameEnd()) {
            this.endGame();
            return;
        }
        
        // 触发结算界面（延迟一点确保战场清理完成）
        Timers.CreateTimer(0.5, () => {
        this.triggerWaveSettlement();
            return undefined;
        });
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
        const aliveCount = Array.from(this.gameState.playerStates.values())
            .filter(state => state.isAlive).length;
        
        return aliveCount <= 1 || this.gameState.currentRound >= 50;
    }

    /**
     * 结束游戏
     */
    private endGame(): void {
        this.gameState.isGameActive = false;
        
        // 确定获胜者
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                this.gameState.winnerPlayerId = playerId;
                break;
            }
        }
        
        print(`[AutoChessMode] Game ended. Winner: Player ${this.gameState.winnerPlayerId}`);
        
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
        print('[AutoChessMode] Registering battle_completed event listener...');
        
        // 监听战斗完成事件
        CustomGameEventManager.RegisterListener('battle_completed', (userId, data) => {
            print(`[AutoChessMode] ===== battle_completed event triggered! userId: ${userId} =====`);
            this.onBattleCompleted(data);
        });
        
        print('[AutoChessMode] Event listener registered successfully');
    }
    
    /**
     * 战斗完成事件处理
     */
    private onBattleCompleted(data: any): void {
        const battleId = data.battleId || `battle_${data.player1}_${Date.now()}`;
        const player1 = data.player1;
        const player2 = data.player2 || -1; // AI对战时 player2 是 -1
        
        // 使用 player1 和 player2 的组合作为唯一标识（与 calculateBattleResults 保持一致）
        const battleKey = `${player1}_vs_${player2}`;
        
        print(`[AutoChessMode] Battle completed event received: ${battleId} (key: ${battleKey})`);
        
        // 如果当前不在战斗阶段或游戏未激活，忽略
        if (!this.isActive || this.gameState.currentPhase !== RoundPhase.BATTLE) {
            print(`[AutoChessMode] Ignoring battle_completed: not in battle phase or not active`);
            return;
        }
        
        // 防止重复处理同一个战斗
        if (this.battleResultsProcessed.has(battleKey)) {
            print(`[AutoChessMode] Battle ${battleKey} already processed, ignoring`);
            return;
        }
        
        // 标记为已处理
        this.battleResultsProcessed.add(battleKey);
        
        // 记录战斗结果
        const playerId = player1;
        const winnerId = data.winnerId;
        const playerState = this.gameState.playerStates.get(playerId);
        
        if (playerState) {
            if (winnerId === playerId) {
                playerState.winStreak++;
                playerState.lossStreak = 0;
                print(`[AutoChessMode] Player ${playerId} won the battle!`);
            } else {
                const damage = Math.min(10, this.gameState.currentRound);
                playerState.health -= damage;
                playerState.lossStreak++;
                playerState.winStreak = 0;
                print(`[AutoChessMode] Player ${playerId} lost (${damage} damage, health: ${playerState.health})`);
                
                if (playerState.health <= 0) {
                    playerState.isAlive = false;
                    playerState.health = 0;
                    print(`[AutoChessMode] Player ${playerId} eliminated!`);
                }
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
        print("[AutoChessMode] ========== 监听游戏状态事件 ==========");
        
        // 监听游戏状态变化
        ListenToGameEvent('game_rules_state_change', () => {
            this.onGameStateChanged();
        }, this);
        
        print("[AutoChessMode] ✅ 游戏状态事件监听已注册");
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
        
        if (!gameModeManager.isAutoChessMode()) {
            print('[AutoChessMode] ⚠️ 不是自走棋模式，跳过激活');
            return;
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

        // 构造结算数据
        const settlementData = {
            round: this.gameState.currentRound,
            rewardGold: this.currentWaveRewardAmount,
            availableStages: ['stage_1', 'stage_2', 'stage_3'], // 占位数据
            playerSummary: this.buildPlayerSummary()
        };

        print(`[AutoChessMode] Triggering wave settlement for round ${this.gameState.currentRound}`);

        // 发送结算事件到客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_wave_settlement', settlementData);
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
     */
    public handleWaveStageSelection(playerId: PlayerID, stageId: string): void {
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
        
        print(`[AutoChessMode] Player ${playerId} selected stage: ${stageId} (${stageConfig.primaryNodeType})`);

        // 记录选择（用于下一波战斗）
        this.currentWaveStageSelection = stageId;

        // 通知客户端确认
        (CustomGameEventManager.Send_ServerToAllClients as any)(
            'autochess_wave_stage_ack',
            {
                playerId: playerId,
                stageId: stageId,
                success: true,
                stageName: `关卡${stageId}`,
                stageType: stageConfig.primaryNodeType,
                message: `已选择关卡${stageId}，将在战斗阶段生成怪物`
            }
        );
        
        print(`[AutoChessMode] 关卡选择已记录，将在战斗阶段使用关卡${stageId}生成怪物`);
    }
}