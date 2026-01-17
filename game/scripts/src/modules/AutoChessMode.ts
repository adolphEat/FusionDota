/**
 * 自走棋模式核心逻辑 - 完整的自走棋游戏系统
 * AutoChess Mode Core - Complete auto chess game system
 */

import { GameMode, GameModeManager } from './GameModeManager';
import { ChessBattleSystem } from './autochess/ChessBattleSystem';
import { StageConfigManager, NodeType } from './autochess/StageConfigManager';
import { getTimestamp } from '../utils/time_utils';
import { inventoryHandler } from './InventoryHandler';
import { saveDataManager } from '../utils/SaveDataManager';

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
    private isBattlePhaseEnding: boolean = false; // 🔑 防止战斗阶段重复结束
    private firstRoundPiecesCreated: Map<PlayerID, boolean> = new Map(); // 🔑 记录第一回合是否已创建初始棋子
    private autoDeployTriggeredThisRound: boolean = false; // 🔑 记录本回合是否已触发自动部署
    
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
        
        // 🔑 尝试从本地文件加载背包数据（如果存在存档）
        for (const [playerId] of this.gameState.playerStates) {
            if (saveDataManager.hasSaveData(playerId)) {
                print(`[AutoChessMode] 检测到玩家 ${playerId} 的存档，尝试加载...`);
                this.loadBackpackFromFile(playerId);
            } else {
                print(`[AutoChessMode] 玩家 ${playerId} 没有存档，将使用默认初始化`);
            }
        }
        
        // 🔑 不在这里创建初始棋子，在准备阶段创建
        
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
            
            // 开始准备阶段倒计时（10秒）
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
        this.gameState.phaseTimeLeft = 10; // 准备阶段时长：10秒
        
        // 🔑 重置自动部署标记
        this.autoDeployTriggeredThisRound = false;
        
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
        this.gameState.currentPhase = RoundPhase.BATTLE;
        this.gameState.phaseTimeLeft = 45; // 45秒战斗时间
        
        print(`[AutoChessMode] ========== 战斗阶段开始 ==========`);
        
        // 🔑 先部署所有玩家的棋子（包括自动部署），让UI有时间更新
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                const benchBefore = (playerState.benchPieces || []).length;
                print(`[AutoChessMode] 🔍 战斗开始前，玩家 ${playerId} 背包有 ${benchBefore} 个棋子`);
                
                // 设置玩家为受保护状态（无敌但可移动）
                this.battleSystem.setPlayerAsProtected(playerId);
                
                // 部署玩家棋子到战斗位置（如果场上没有，会自动从背包部署并更新UI）
                this.deployPlayerChessPieces(playerId);
                
                // 🔑 应用羁绊系统 - 在棋子部署后，战斗开始前
                this.applySynergySystem(playerId);
                
                const benchAfter = (playerState.benchPieces || []).length;
                print(`[AutoChessMode] 🔍 部署后，玩家 ${playerId} 背包剩余 ${benchAfter} 个棋子`);
            }
        }
        
        // 🔑 战斗阶段隐藏背包UI（自动部署已在准备阶段剩余3秒时完成）
        (CustomGameEventManager.Send_ServerToAllClients as any)('hide_inventory', {});
        
        // 创建敌人棋子（根据当前波次配置）
        this.createEnemyPieces();
        
        // 设置对战配对
        this.setupBattleMatching();
        
        // 开始战斗
        this.startAllBattles();
        
        // 启动计时器
        this.startPhaseTimer();
        
        print(`[AutoChessMode] Started battle phase for round ${this.gameState.currentRound}`);
        
        // 🔑 通知客户端显示playing-hud并隐藏原生UI
        (CustomGameEventManager.Send_ServerToAllClients as any)('show_playing_hud', {});
        
        // 通知客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_phase_started', {
            phase: RoundPhase.BATTLE,
            timeLeft: this.gameState.phaseTimeLeft,
            round: this.gameState.currentRound
        });
    }

    /**
     * 部署玩家棋子到战场（战斗阶段）
     * 🔑 激活已部署的棋子（自动部署已在准备阶段倒计时剩余3秒时完成）
     */
    private deployPlayerChessPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] ERROR: Player state not found for player ${playerId}`);
            return;
        }

        if (this.gameState.currentPhase === RoundPhase.BATTLE) {
            // 检查场上是否有棋子
            const deployedPieces = this.battleSystem.getPlayerPieces(playerId);
            print(`[AutoChessMode] 玩家 ${playerId} 场上有 ${deployedPieces.length} 个棋子`);
            
            // 🔑 如果还是没有棋子（极端情况：准备阶段背包为空），这里是最后的保障
            if (deployedPieces.length === 0) {
                print(`[AutoChessMode] ⚠️ 战斗开始时场上还是没有棋子，尝试最后一次自动部署`);
                this.autoDeployFromBench(playerId);
            }
            
            // 激活已部署的棋子
            this.battleSystem.activatePlayerPieces(playerId);
        }
    }

    /**
     * 如果场上没有棋子，随机部署一个
     */
    private deployRandomPieceIfNeeded(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;

        // 优先从备战席选择
        const benchPieces = playerState.benchPieces || [];
        let pieceToDeploy: any = null;

        if (benchPieces.length > 0) {
            // 从备战席随机选择一个
            const randomIndex = Math.floor(RandomFloat(0, benchPieces.length));
            pieceToDeploy = benchPieces[randomIndex];
            print(`[AutoChessMode] 从备战席随机选择: ${pieceToDeploy.displayName}`);
        } else {
            // 如果备战席也没有，从数据库随机选择一个1费棋子
            const availablePieces: any[] = [];
            for (const [pieceId, piece] of this.chessPieceDatabase) {
                if (piece.cost === 1) {
                    availablePieces.push(piece);
                }
            }
            
            if (availablePieces.length > 0) {
                const randomIndex = Math.floor(RandomFloat(0, availablePieces.length));
                pieceToDeploy = availablePieces[randomIndex];
                // 添加到备战席
                playerState.benchPieces.push(pieceToDeploy);
                print(`[AutoChessMode] 从数据库随机选择1费棋子: ${pieceToDeploy.displayName}`);
            }
        }

        if (pieceToDeploy) {
            // 随机选择一个位置部署
            const position = {
                x: Math.floor(RandomFloat(0, 8)),
                y: Math.floor(RandomFloat(0, 4)) // 玩家半场：0-3
            };
            
            print(`[AutoChessMode] 随机部署棋子 ${pieceToDeploy.displayName}(${pieceToDeploy.id}) 到位置 (${position.x}, ${position.y})`);
            this.battleSystem.deployPiece(playerId, pieceToDeploy.id, position);
        } else {
            print(`[AutoChessMode] 警告: 无法找到可部署的棋子`);
        }
    }

    /**
     * 为玩家创建初始棋子（准备阶段）
     * 🔑 只在第1回合（回合0）创建初始棋子到背包（游戏启动资金）
     * 自动部署逻辑在战斗开始时执行
     */
    private createPlayerInitialPieces(): void {
        // 🔑 只在第1回合（回合0）创建初始棋子到背包
        if (this.gameState.currentRound === 0) {
            for (const [playerId, playerState] of this.gameState.playerStates) {
                if (playerState.isAlive) {
                    // 🔑 检查背包 + 场上的棋子总数
                    const benchPieces = playerState.benchPieces || [];
                    const deployedPieces = this.battleSystem.getPlayerPieces(playerId);
                    const totalPieces = benchPieces.length + deployedPieces.length;
                    
                    if (totalPieces === 0) {
                        print(`[AutoChessMode] 第1回合，玩家完全没有棋子（背包:${benchPieces.length} + 场上:${deployedPieces.length}），创建初始棋子到背包`);
                        this.createFirstRoundPieces(playerId);
                    } else {
                        print(`[AutoChessMode] 第1回合，玩家已有棋子（背包:${benchPieces.length} + 场上:${deployedPieces.length} = ${totalPieces}），跳过创建`);
                    }
                }
            }
        }
        
        print(`[AutoChessMode] ========== 玩家初始棋子检查完成 ==========`);
    }

    /**
     * 计算并应用羁绊效果
     * 在棋子部署时调用，给满足条件的棋子添加羁绊能力，并更新UI
     */
    public applySynergySystem(playerId: PlayerID): void {
        print(`[AutoChessMode] ========== 计算玩家 ${playerId} 的羁绊效果 ==========`);
        
        const deployedUnits = this.battleSystem.getPlayerPieces(playerId);
        
        if (!deployedUnits || deployedUnits.length === 0) {
            print(`[AutoChessMode] 玩家 ${playerId} 场上没有棋子，跳过羁绊计算`);
            // 🔑 即使没有棋子，也发送空的羁绊数据以清空UI
            this.sendSynergyDataToUI(playerId, []);
            return;
        }
        
        // 从场上单位获取对应的ChessPiece数据
        const chessPieces: ChessPiece[] = [];
        for (const deployedPiece of deployedUnits) {
            const unit = deployedPiece.unit;
            if (!unit || unit.IsNull()) continue;
            
            const unitName = unit.GetUnitName();
            // 根据unitName查找对应的ChessPiece数据
            for (const piece of this.chessPieceDatabase.values()) {
                if (piece.unitName === unitName) {
                    chessPieces.push(piece);
                    break;
                }
            }
        }
        
        print(`[AutoChessMode] 场上有 ${chessPieces.length} 个棋子`);
        
        // 统计种族和职业数量
        const raceCount = new Map<string, number>();
        const classCount = new Map<string, number>();
        
        // 第一遍：统计所有棋子的种族和职业
        for (const piece of chessPieces) {
            // 统计种族
            if (piece.race) {
                for (const race of piece.race) {
                    raceCount.set(race, (raceCount.get(race) || 0) + 1);
                }
            }
            // 统计职业
            if (piece.class) {
                for (const cls of piece.class) {
                    classCount.set(cls, (classCount.get(cls) || 0) + 1);
                }
            }
        }
        
        // 🔑 特殊处理：创造羁绊（卡尔）- 为所有其他种族+1
        const creationCount = raceCount.get('创造') || 0;
        if (creationCount > 0) {
            print(`[AutoChessMode] 🌟 检测到创造羁绊 ${creationCount} 个，所有种族计数+${creationCount}`);
            for (const [race, count] of raceCount) {
                if (race !== '创造') {
                    raceCount.set(race, count + creationCount);
                    print(`[AutoChessMode]   ${race}: ${count} → ${count + creationCount}`);
                }
            }
        }
        
        print(`[AutoChessMode] 种族统计:`);
        for (const [race, count] of raceCount) {
            print(`[AutoChessMode]   ${race}: ${count}`);
        }
        
        print(`[AutoChessMode] 职业统计:`);
        for (const [cls, count] of classCount) {
            print(`[AutoChessMode]   ${cls}: ${count}`);
        }
        
        // 定义羁绊阈值和对应的能力（每个阈值对应不同层级的能力）
        const synergyThresholds = [
            // 种族羁绊
            { type: 'race', name: '仙灵', abilities: ['sylph_1', 'sylph_2', 'sylph_3'], thresholds: [2, 3, 4] },
            { type: 'race', name: '神将', abilities: ['divine_general_1', 'divine_general_2', 'divine_general_3'], thresholds: [2, 3, 5] },
            { type: 'race', name: '狂野', abilities: ['wild_1', 'wild_2', 'wild_3'], thresholds: [3, 4, 5] },
            { type: 'race', name: '虚空', abilities: ['void_1', 'void_2'], thresholds: [2, 5] },
            { type: 'race', name: '战斗狂人', abilities: ['berserker_1', 'berserker_2'], thresholds: [2, 4] },
            { type: 'race', name: '创造', abilities: ['creation'], thresholds: [1] },
            // 职业羁绊
            { type: 'class', name: '游侠', abilities: ['ranger_1', 'ranger_2', 'ranger_3'], thresholds: [2, 3, 5] },
            { type: 'class', name: '骑士', abilities: ['knight_1', 'knight_2', 'knight_3'], thresholds: [2, 4, 5] },
            { type: 'class', name: '斗士', abilities: ['warrior_1', 'warrior_2'], thresholds: [2, 4] },
            { type: 'class', name: '法师', abilities: ['mage_1', 'mage_2'], thresholds: [2, 4] },
            { type: 'class', name: '术士', abilities: ['warlock_1', 'warlock_2'], thresholds: [1, 3] },
            { type: 'class', name: '毁灭者', abilities: ['destroyer_1', 'destroyer_2'], thresholds: [1, 2] },
        ];
        
        // 应用羁绊buff
        for (const synergy of synergyThresholds) {
            // 🔑 跳过创造羁绊（它不添加能力，只用于计数）
            if (synergy.name === '创造') {
                continue;
            }
            
            const count = synergy.type === 'race' ? raceCount.get(synergy.name) || 0 : classCount.get(synergy.name) || 0;
            
            if (count > 0) {
                // 找到最高的已满足阈值及其对应的能力
                let activeTierIndex = -1;
                for (let i = 0; i < synergy.thresholds.length; i++) {
                    if (count >= synergy.thresholds[i]) {
                        activeTierIndex = i;
                    }
                }
                
                if (activeTierIndex >= 0) {
                    const activeTier = synergy.thresholds[activeTierIndex];
                    const abilityName = synergy.abilities[activeTierIndex];
                    
                    print(`[AutoChessMode] ✅ 羁绊激活: ${synergy.name} (${count}/${activeTier}) - 能力: ${abilityName} (Tier ${activeTierIndex + 1})`);
                    
                    // 给对应的单位添加羁绊能力
                    for (let i = 0; i < deployedUnits.length; i++) {
                        const deployedPiece = deployedUnits[i];
                        const unit = deployedPiece.unit;
                        const piece = chessPieces[i];
                        
                        if (!unit || unit.IsNull() || !piece) continue;
                        
                        // 检查该单位是否属于这个羁绊
                        let belongsToSynergy = false;
                        if (synergy.type === 'race' && piece.race) {
                            belongsToSynergy = piece.race.includes(synergy.name);
                            // 🔑 特殊处理：创造种族（卡尔）享受所有种族羁绊加成
                            if (!belongsToSynergy && piece.race.includes('创造')) {
                                belongsToSynergy = true;
                                print(`[AutoChessMode]   🌟 ${unit.GetUnitName()} (创造) 享受 ${synergy.name} 羁绊加成`);
                            }
                        } else if (synergy.type === 'class' && piece.class) {
                            belongsToSynergy = piece.class.includes(synergy.name);
                        }
                        
                        if (belongsToSynergy) {
                            // 先移除该羁绊的所有低级能力，再添加当前层级的能力
                            for (const oldAbilityName of synergy.abilities) {
                                const oldAbility = unit.FindAbilityByName(oldAbilityName);
                                if (oldAbility) {
                                    unit.RemoveAbility(oldAbilityName);
                                }
                            }
                            
                            // 添加当前层级的能力
                            unit.AddAbility(abilityName);
                            const ability = unit.FindAbilityByName(abilityName);
                            if (ability) {
                                ability.SetLevel(1);
                                print(`[AutoChessMode]   ➕ ${unit.GetUnitName()} 获得羁绊能力: ${abilityName} (Tier ${activeTierIndex + 1})`);
                            }
                        }
                    }
                }
            }
        }
        
        print(`[AutoChessMode] ========== 羁绊计算完成 ==========`);
        
        // 🔑 收集羁绊数据并发送到UI
        this.collectAndSendSynergyData(playerId, raceCount, classCount, synergyThresholds);
    }
    
    /**
     * 收集羁绊数据并发送到UI
     */
    private collectAndSendSynergyData(
        playerId: PlayerID,
        raceCount: Map<string, number>,
        classCount: Map<string, number>,
        synergyThresholds: any[]
    ): void {
        const synergyDataArray: any[] = [];
        
        for (const synergy of synergyThresholds) {
            // 🔑 跳过创造羁绊（它不显示在UI中）
            if (synergy.name === '创造') {
                continue;
            }
            
            const count = synergy.type === 'race' 
                ? raceCount.get(synergy.name) || 0 
                : classCount.get(synergy.name) || 0;
            
            // 找出已激活的阶梯
            const activeTiers: number[] = [];
            for (let i = 0; i < synergy.thresholds.length; i++) {
                if (count >= synergy.thresholds[i]) {
                    activeTiers.push(i);
                }
            }
            
            // 构建羁绊数据
            const synergyData = {
                id: synergy.abilities[0], // 使用第一个能力作为ID
                name: synergy.name,
                type: synergy.type,
                currentCount: count,
                activeTiers: activeTiers
            };
            
            synergyDataArray.push(synergyData);
            print(`[AutoChessMode] 📊 羁绊数据: ${synergy.name} - 数量:${count}, 激活层级:${activeTiers.join(',')}`);
        }
        
        this.sendSynergyDataToUI(playerId, synergyDataArray);
    }
    
    /**
     * 发送羁绊数据到UI
     */
    private sendSynergyDataToUI(playerId: PlayerID, synergies: any[]): void {
        print(`[AutoChessMode] 📤 发送羁绊数据到UI，玩家 ${playerId}，羁绊数量: ${synergies.length}`);
        
        // 通过事件发送到客户端
        (CustomGameEventManager.Send_ServerToAllClients as any)('synergy_data_update', {
            playerId: playerId,
            synergies: synergies
        });
    }

    /**
     * 从背包自动部署棋子到场上
     * 🔑 随机部署1个棋子，部署后从背包移除
     */
    private autoDeployFromBench(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        const benchPieces = playerState.benchPieces || [];
        if (benchPieces.length === 0) {
            print(`[AutoChessMode] 玩家 ${playerId} 背包为空，无法自动部署`);
            return;
        }
        
        print(`[AutoChessMode] 从背包随机部署1个棋子到场上`);
        
        // 🔑 随机选择背包中的1个棋子
        const randomIndex = Math.floor(RandomFloat(0, benchPieces.length));
        const selectedPiece = benchPieces[randomIndex];
        
        // 随机位置部署（玩家半场）
        const position = {
            x: Math.floor(RandomFloat(0, 8)),
            y: Math.floor(RandomFloat(0, 4)) // 玩家半场：0-3
        };
        
        // 部署到场上
        this.battleSystem.deployPiece(playerId, selectedPiece.id, position);
        print(`[AutoChessMode] 自动部署: ${selectedPiece.displayName}(${selectedPiece.id}) 到位置 (${position.x}, ${position.y})`);
        
        // 从背包移除选中的棋子
        benchPieces.splice(randomIndex, 1);
        
        // 🔑 自动部署后立即计算羁绊效果
        print(`[AutoChessMode] 🎯 自动部署后触发羁绊计算（玩家 ${playerId}）...`);
        this.applySynergySystem(playerId);
        
        // 🔑 通知客户端更新背包UI
        inventoryHandler.sendInventoryData(playerId);
        print(`[AutoChessMode] 已通知客户端更新背包，剩余 ${benchPieces.length} 个棋子`);
    }

    /**
     * 为第一回合创建初始棋子
     * 🔑 从棋子库随机生成1个1费棋子到背包（游戏启动资金）
     */
    private createFirstRoundPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        // 🔑 防止重复添加：如果备战席已有棋子，说明已经初始化过，直接返回
        if (playerState.benchPieces && playerState.benchPieces.length > 0) {
            print(`[AutoChessMode] ⚠️ 玩家 ${playerId} 备战席已有 ${playerState.benchPieces.length} 个棋子，跳过重复初始化`);
            return;
        }
        
        print(`[AutoChessMode] ========== 第一回合生成玩家初始棋子 ==========`);
        
        // 🔑 从棋子库收集所有1费棋子
        const oneCostPieces: ChessPiece[] = [];
        for (const piece of this.chessPieceDatabase.values()) {
            if (piece.cost === 1) {
                oneCostPieces.push(piece);
            }
        }
        
        if (oneCostPieces.length === 0) {
            print(`[AutoChessMode] ❌ 错误：棋子库中没有1费棋子`);
            return;
        }
        
        // 🔑 随机生成1个1费棋子到背包
        const randomIndex = Math.floor(RandomFloat(0, oneCostPieces.length));
        const selectedPiece = oneCostPieces[randomIndex];
        
        // 直接添加到背包（不部署到场上）
        playerState.benchPieces.push(selectedPiece);
        print(`[AutoChessMode] 玩家 ${playerId} - 随机生成1个1费棋子到背包: ${selectedPiece.displayName}(${selectedPiece.id})`);

        
        // 🔑 通知客户端更新背包UI
        inventoryHandler.sendInventoryData(playerId);
        print(`[AutoChessMode] 已通知客户端更新背包，当前背包数量: ${playerState.benchPieces.length}`);
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
    /**
     * 创建默认初始棋子（降级方案）
     * 🔑 只部署到场上，不添加到背包（避免重复）
     */
    private createDefaultInitialPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        const defaultPieces = ['axe', 'crystal_maiden', 'drow_ranger'];
        print(`[AutoChessMode] 🔧 降级方案：创建 ${defaultPieces.length} 个默认棋子到场上（不添加到背包）`);
        
        for (let i = 0; i < defaultPieces.length; i++) {
            const pieceId = defaultPieces[i];
            const piece = this.chessPieceDatabase.get(pieceId);
            
            if (piece) {
                const position = { x: 1 + i, y: 1 };
                this.battleSystem.deployPiece(playerId, pieceId, position);
                print(`[AutoChessMode] 创建默认棋子: ${piece.displayName}(${pieceId}) 到位置 (${position.x}, ${position.y})`);
            }
        }
        
        // 🔑 不添加到背包，战斗结束后存活的会自动回到背包
    }

    /**
     * 从备战席部署棋子
     * 🔑 部署后清空背包，避免重复添加
     */
    private deployPiecesFromBench(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        const benchPieces = playerState.benchPieces || [];
        print(`[AutoChessMode] 玩家 ${playerId} 备战席棋子数量: ${benchPieces.length}`);
        
        // 将备战席的棋子部署到棋盘上
        const deployedCount = Math.min(benchPieces.length, 7);
        for (let i = 0; i < deployedCount; i++) {
            const piece = benchPieces[i];
            const position = {
                x: 1 + i,
                y: 1
            };
            
            print(`[AutoChessMode] 部署备战席棋子: ${piece.id} 到位置 (${position.x}, ${position.y})`);
            this.battleSystem.deployPiece(playerId, piece.id, position);
        }
        
        // 🔑 部署后清空背包（因为棋子已经在场上了）
        playerState.benchPieces = [];
        print(`[AutoChessMode] ✅ 已部署 ${deployedCount} 个棋子，背包已清空`);
        
        // 🔑 通知客户端更新背包UI
        inventoryHandler.sendInventoryData(playerId);
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
        
        // 🔑 调试：打印当前 benchPieces 状态
        const benchPieces = playerState.benchPieces || [];
        const boardPieces = playerState.boardPieces || [];
        print(`[AutoChessMode] 🔍 DEBUG: benchPieces.length = ${benchPieces.length}`);
        print(`[AutoChessMode] 🔍 DEBUG: boardPieces.length = ${boardPieces.length}`);
        if (benchPieces.length > 0) {
            for (let i = 0; i < benchPieces.length; i++) {
                const p = benchPieces[i];
                print(`[AutoChessMode] 🔍 DEBUG: benchPieces[${i}] = ${p.displayName}(${p.id})`);
            }
        }
        
        // 先清理该玩家的所有棋子（确保干净状态）
        this.battleSystem.clearPlayerPieces(playerId);
        
        // 优先从棋盘位置恢复棋子（如果有保存的位置信息）
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
            if (benchPieces.length > 0) {
                print(`[AutoChessMode] 从备战席恢复 ${benchPieces.length} 个棋子`);
                this.deployPiecesFromBench(playerId);
            } else {
                // 如果都没有，创建默认初始棋子（降级方案）
                print(`[AutoChessMode] ⚠️ 警告: 玩家 ${playerId} 没有棋子（benchPieces=${benchPieces.length}, boardPieces=${boardPieces.length}），创建默认棋子`);
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
                
                // 🔑 准备阶段剩余3秒时，检查并自动部署（在背包UI还可见时）
                if (this.gameState.phaseTimeLeft === 3 && !this.autoDeployTriggeredThisRound) {
                    this.autoDeployTriggeredThisRound = true;
                    print(`[AutoChessMode] ⏰ 准备阶段剩余3秒，检查是否需要自动部署...`);
                    
                    for (const [playerId, playerState] of this.gameState.playerStates) {
                        if (playerState.isAlive) {
                            const deployedPieces = this.battleSystem.getPlayerPieces(playerId);
                            if (deployedPieces.length === 0) {
                                print(`[AutoChessMode] 玩家 ${playerId} 未部署棋子，准备自动部署...`);
                                this.autoDeployFromBench(playerId);
                            } else {
                                print(`[AutoChessMode] 玩家 ${playerId} 已有 ${deployedPieces.length} 个棋子，跳过自动部署`);
                            }
                        }
                    }
                }
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

        // 🔑 先回收存活棋子到背包（在删除棋子之前）
        print(`[AutoChessMode] Returning surviving pieces to bench...`);
        this.returnPiecesToBench();
        
        // 停止所有战斗（这会清理战场，但玩家棋子已经在上面回收了）
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
     * 清除玩家所有棋子的羁绊buff
     * 在回合结束时调用，确保下一回合重新计算
     */
    private clearSynergyBuffs(playerId: PlayerID): void {
        print(`[AutoChessMode] ========== 清除玩家 ${playerId} 的羁绊buff ==========`);
        
        const deployedPieces = this.battleSystem.getPlayerPieces(playerId);
        
        if (!deployedPieces || deployedPieces.length === 0) {
            print(`[AutoChessMode] 玩家 ${playerId} 场上没有棋子，跳过清除`);
            return;
        }
        
        // 定义所有羁绊能力的列表（用于清除）
        const synergyAbilities = [
            // 种族羁绊
            'sylph_1', 'sylph_2', 'sylph_3',
            'divine_general_1', 'divine_general_2', 'divine_general_3',
            'wild_1', 'wild_2', 'wild_3',
            'void_1', 'void_2',
            'berserker_1', 'berserker_2',
            // 职业羁绊
            'ranger_1', 'ranger_2', 'ranger_3',
            'knight_1', 'knight_2', 'knight_3',
            'warrior_1', 'warrior_2',
            'mage_1', 'mage_2',
            'warlock_1', 'warlock_2',
            'destroyer_1', 'destroyer_2',
        ];
        
        let removedCount = 0;
        
        // 遍历所有部署的棋子，移除羁绊能力
        for (const deployedPiece of deployedPieces) {
            const unit = deployedPiece.unit;
            if (!unit || unit.IsNull()) continue;
            
            for (const abilityName of synergyAbilities) {
                const ability = unit.FindAbilityByName(abilityName);
                if (ability) {
                    unit.RemoveAbility(abilityName);
                    removedCount++;
                    print(`[AutoChessMode]   ➖ ${unit.GetUnitName()} 移除羁绊能力: ${abilityName}`);
                }
            }
        }
        
        print(`[AutoChessMode] 共移除 ${removedCount} 个羁绊能力`);
        print(`[AutoChessMode] ========== 羁绊buff清除完成 ==========`);
    }

    /**
     * 将场上棋子回收到背包
     */
    private returnPiecesToBench(): void {
        print(`[AutoChessMode] ========== 开始回收棋子到背包 ==========`);
        
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (!playerState.isAlive) continue;
            
            // 🔑 先清除羁绊buff，再回收棋子
            this.clearSynergyBuffs(playerId);
            
            // 获取场上部署的棋子
            const deployedPieces = this.battleSystem.getPlayerPieces(playerId);
            
            print(`[AutoChessMode] 玩家 ${playerId} 场上共有 ${deployedPieces.length} 个棋子`);
            
            // 🔑 获取当前备战席的棋子（这些都是未部署的，因为部署时已经从备战席移除了）
            const oldBenchPieces = playerState.benchPieces || [];
            print(`[AutoChessMode] 玩家 ${playerId} 备战席有 ${oldBenchPieces.length} 个未部署的棋子`);
            
            // 🔑 记录存活棋子的血量和数据
            const survivors: Array<{ pieceId: string; health: number }> = [];
            const survivorPieces: ChessPiece[] = [];
            
            // 遍历场上棋子，收集存活的
            for (const deployedPiece of deployedPieces) {
                // 🔑 只回收存活的棋子
                if (!deployedPiece.unit || deployedPiece.unit.IsNull() || !deployedPiece.unit.IsAlive()) {
                    print(`[AutoChessMode] 跳过阵亡的棋子: ${deployedPiece.pieceId}`);
                    continue;
                }
                
                // 🔑 记录存活棋子的血量
                const currentHealth = deployedPiece.unit.GetHealth();
                survivors.push({ pieceId: deployedPiece.pieceId, health: currentHealth });
                print(`[AutoChessMode] 📝 记录存活棋子 ${deployedPiece.pieceId} 的血量: ${currentHealth.toFixed(0)}`);
                
                // 获取棋子定义
                const piece = this.chessPieceDatabase.get(deployedPiece.pieceId);
                if (!piece) {
                    print(`[AutoChessMode] 警告: 棋子 ${deployedPiece.pieceId} 不存在于数据库中，跳过`);
                    continue;
                }
                
                survivorPieces.push(piece);
                print(`[AutoChessMode] ✅ 存活棋子: ${piece.displayName}(${deployedPiece.pieceId})，血量: ${currentHealth.toFixed(0)}`);
            }
            
            print(`[AutoChessMode] 存活棋子数量: ${survivorPieces.length}`);
            
            // 🔑 重建备战席：旧备战席（未部署的）+ 存活棋子
            playerState.benchPieces = [];
            
            // 先保留旧备战席的棋子（这些是未部署的，因为部署时已经移除了）
            for (const piece of oldBenchPieces) {
                if (playerState.benchPieces.length >= 8) {
                    print(`[AutoChessMode] 警告: 备战席已满（8/8），无法添加更多棋子`);
                    break;
                }
                playerState.benchPieces.push(piece);
            }
            
            // 再添加存活的棋子（从场上回收）
            for (const piece of survivorPieces) {
                if (playerState.benchPieces.length >= 8) {
                    print(`[AutoChessMode] 警告: 备战席已满（8/8），无法回收棋子 ${piece.displayName}`);
                    break;
                }
                playerState.benchPieces.push(piece);
            }
            
            // 🔑 保存存活棋子的血量记录到战斗系统
            if (survivors.length > 0) {
                this.battleSystem.setPlayerSurvivorHealth(playerId, survivors);
                print(`[AutoChessMode] ✅ 已保存 ${survivors.length} 个存活棋子的血量记录`);
            }
            
            // 🔑 只删除单位实体，不删除部署记录（因为已经在上面回收了）
            // 清空场上棋子的单位实体
            const pieces = this.battleSystem.getPlayerPieces(playerId);
            for (const piece of pieces) {
                if (piece.unit && !piece.unit.IsNull()) {
                    piece.unit.RemoveSelf();
                }
            }
            // 清空部署记录
            (this.battleSystem as any).playerDeployedPieces.delete(playerId);
            
            print(`[AutoChessMode] ========== 玩家 ${playerId} 棋子回收汇总 ==========`);
            print(`[AutoChessMode] 旧备战席（未部署）: ${oldBenchPieces.length} 个`);
            print(`[AutoChessMode] 场上存活: ${survivorPieces.length} 个`);
            print(`[AutoChessMode] 场上阵亡: ${deployedPieces.length - survivorPieces.length} 个`);
            print(`[AutoChessMode] 最终备战席: ${playerState.benchPieces.length} = ${oldBenchPieces.length}(未部署) + ${survivorPieces.length}(存活)`);
            print(`[AutoChessMode] =====================================`);
        }
        
        print(`[AutoChessMode] ========== 棋子回收完成 ==========`);
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
            unitName: 'treant_protector1',
            displayName: '树精卫士',
            position: '坦克',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['仙灵'],
            class: ['斗士'],
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
            attackSpeed: 1.67,
            attackInterval: 1.00,
            dps: 30.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['treant_protector_living_armor']
        });
        
        // 风行者 - 射手
        database.set('windrunner', {
            id: 'windrunner',
            unitName: 'windrunner1',
            displayName: '风行者',
            position: '射手',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['仙灵'],
            class: ['游侠'],
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
            abilities: ['windrunner_piercing_arrow']
        });
        
        // 战争之矛 (Mars) - 战士
        database.set('mars', {
            id: 'mars',
            unitName: 'mars1',
            displayName: '战争之矛',
            position: '战士',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['战斗狂人'],
            class: ['骑士'],
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
            attackSpeed: 0.80,
            attackInterval: 1.54,
            dps: 35.75,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['mars_spear']
        });
        
        // 雷泽 (Razor) - 法师
        database.set('razor', {
            id: 'razor',
            unitName: 'razor1',
            displayName: '雷泽',
            position: '法师',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['虚空'],
            class: ['游侠'],
            health: 550,
            maxMana: 100,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 2,
            attackManaRecovery: 6,
            damageManaRecovery: 0,
            skillCooldown: 12.50,
            damage: 50,
            armor: 2,
            physicalDamageReduction: 10.71,
            magicDefense: 5,
            attackRange: 400,
            attackSpeed: 0.7,
            attackInterval: 1.43,
            dps: 30.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['razor_storm_eye']
        });
        
        // 恶魔巫师 (Lion) - 辅助
        database.set('lion', {
            id: 'lion',
            unitName: 'lion1',
            displayName: '恶魔巫师',
            position: '辅助',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['狂野'],
            class: ['术士'],
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
            attackSpeed: 0.7,
            attackInterval: 1.54,
            dps: 26.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['lion_hex']
        });
        
        // 魅惑魔女 (Enchantress) - 辅助
        database.set('enchantress', {
            id: 'enchantress',
            unitName: 'enchantress1',
            displayName: '魅惑魔女',
            position: '辅助',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['狂野'],
            class: ['法师'],
            health: 550,
            maxMana: 100,
            initialMana: 20,
            healthRecovery: 0,
            naturalManaRecovery: 2,
            attackManaRecovery: 5.6,
            damageManaRecovery: 0,
            skillCooldown: 13.16,
            damage: 50,
            armor: 1.5,
            physicalDamageReduction: 8.26,
            magicDefense: 5,
            attackRange: 400,
            attackSpeed: 0.7,
            attackInterval: 1.43,
            dps: 31.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['enchantress1_natures_attendants_heal']
        });
        
        // ========== 二费棋子 (Cost 2) ==========
        
        // 斧王 - 战士
        database.set('axe', {
            id: 'axe',
            unitName: 'axe1',
            displayName: '斧王',
            position: '战士',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['战斗狂人'],
            class: ['斗士'],
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
            attackSpeed: 0.6,
            attackInterval: 1.33,
            dps: 48.75,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['axe_battle_hunger_custom']
        });
        
        // 熊战士 (Ursa) - 坦克
        database.set('ursa', {
            id: 'ursa',
            unitName: 'ursa1',
            displayName: '熊战士',
            position: '坦克',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['狂野'],
            class: ['骑士'],
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
            abilities: ['ursa_ground_slam']
        });
        
        // 神谕者 (Oracle) - 辅助
        database.set('oracle', {
            id: 'oracle',
            unitName: 'oracle1',
            displayName: '神谕者',
            position: '辅助',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['仙灵'],
            class: ['术士'],
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
            attackSpeed: 0.5,
            attackInterval: 1.54,
            dps: 35.75,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['oracle1_fatesedict']
        });
        
        // 卓尔游侠 - 射手
        database.set('drow_ranger', {
            id: 'drow_ranger',
            unitName: 'drow_ranger1',
            displayName: '卓尔游侠',
            position: '射手',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['虚空'],
            class: ['游侠'],
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
            abilities: ['drow_multishot']
        });
        
        // 秀逗魔导师 (Lina) - 法师
        database.set('lina', {
            id: 'lina',
            unitName: 'lina1',
            displayName: '秀逗魔导师',
            position: '法师',
            rarity: ChessRarity.UNCOMMON,
            cost: 2,
            race: ['神将'],
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
            attackSpeed: 0.65,
            attackInterval: 1.43,
            dps: 38.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['lina_flame_strike']
        });
        
        // ========== 三费棋子 (Cost 3) ==========
        
        // 灰烬之灵 (Ember Spirit) - 战士
        database.set('ember_spirit', {
            id: 'ember_spirit',
            unitName: 'ember_spirit1',
            displayName: '灰烬之灵',
            position: '战士',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['神将'],
            class: ['骑士'],
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
            attackSpeed: 0.75,
            attackInterval: 1.54,
            dps: 42.25,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['ember_spirit_inner_Fire']
        });
        
        // 敌法师 - 坦克
        database.set('anti_mage', {
            id: 'anti_mage',
            unitName: 'anti_mage1',
            displayName: '敌法师',
            position: '坦克',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['战斗狂人'],
            class: ['斗士'],
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
            attackSpeed: 0.9,
            attackInterval: 1.54,
            dps: 39.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['anti_mage_counterspell']
        });
        
        // 恐怖利刃 (Terrorblade) - 法师
        database.set('terrorblade', {
            id: 'terrorblade',
            unitName: 'terrorblade1',
            displayName: '恐怖利刃',
            position: '法师',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['仙灵'],
            class: ['毁灭者'],
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
            abilities: ['terrorblade_demon_form']
        });
        
        // 冥界亚龙 (Viper) - 射手
        database.set('viper', {
            id: 'viper',
            unitName: 'viper1',
            displayName: '冥界亚龙',
            position: '射手',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['狂野'],
            class: ['游侠'],
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
            attackSpeed: 0.55,
            attackInterval: 1.33,
            dps: 52.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['viper_poison_burst']
        });
        
        // 死亡先知 (Death Prophet) - 辅助
        database.set('death_prophet', {
            id: 'death_prophet',
            unitName: 'death_prophet1',
            displayName: '死亡先知',
            position: '辅助',
            rarity: ChessRarity.RARE,
            cost: 3,
            race: ['虚空'],
            class: ['术士'],
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
            attackSpeed: 0.7,
            attackInterval: 1.43,
            dps: 42.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['death_prophet1_silence']
        });
        
        // ========== 四费棋子 (Cost 4) ==========
        
        // 孽主 (Underlord) - 坦克
        database.set('underlord', {
            id: 'underlord',
            unitName: 'underlord1',
            displayName: '孽主',
            position: '坦克',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['战斗狂人'],
            class: ['骑士'],
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
            abilities: ['underlord_pit_of_malice']
        });
        
        // 影魔 (Shadow Fiend) - 射手
        database.set('shadow_fiend', {
            id: 'shadow_fiend',
            unitName: 'shadow_fiend1',
            displayName: '影魔',
            position: '射手',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['虚空'],
            class: ['毁灭者'],
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
            abilities: ['shadow_fiend_Shadowraze']
        });
        
        // 水晶室女 - 法师
        database.set('crystal_maiden', {
            id: 'crystal_maiden',
            unitName: 'crystal_maiden1',
            displayName: '水晶室女',
            position: '法师',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['仙灵'],
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
            attackSpeed: 0.80,
            attackInterval: 1.54,
            dps: 39.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['tidehunter_ravage']
        });
        
        // 食人魔法师 (Ogre Magi) - 辅助
        database.set('ogre_magi', {
            id: 'ogre_magi',
            unitName: 'ogre_magi1',
            displayName: '食人魔法师',
            position: '辅助',
            rarity: ChessRarity.EPIC,
            cost: 4,
            race: ['狂野'],
            class: ['斗士'],
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
            attackSpeed: 1.00,
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
            unitName: 'enigma1',
            displayName: '谜团',
            position: '法师',
            rarity: ChessRarity.LEGENDARY,
            cost: 5,
            race: ['虚空'],
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
            attackSpeed: 0.8,
            attackInterval: 1.54,
            dps: 45.50,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['enigma_black_hole']
        });
        
        // 破晓晨星 (Dawnbreaker) - 坦克
        database.set('dawnbreaker', {
            id: 'dawnbreaker',
            unitName: 'dawnbreaker1',
            displayName: '破晓晨星',
            position: '坦克',
            rarity: ChessRarity.LEGENDARY,
            cost: 5,
            race: ['神将'],
            class: ['骑士'],
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
            attackSpeed: 0.8,
            attackInterval: 1.67,
            dps: 42.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['dawnbreaker1_solar_guardian_land']
        });
        
        // 宙斯 (Zeus) - 射手
        database.set('zeus', {
            id: 'zeus',
            unitName: 'zeus1',
            displayName: '宙斯',
            position: '射手',
            rarity: ChessRarity.LEGENDARY,
            cost: 5,
            race: ['神将'],
            class: ['游侠'],
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
            attackSpeed: 0.6,
            attackInterval: 1.33,
            dps: 60.00,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['zeus_Thundergods_Wrath']
        });
        
        // 卡尔 (Invoker) - 辅助
        database.set('invoker', {
            id: 'invoker',
            unitName: 'invoker1',
            displayName: '卡尔',
            position: '辅助',
            rarity: ChessRarity.LEGENDARY,
            cost: 5,
            race: ['创造'],
            class: ['毁灭者'],
            health: 1000,
            maxMana: 60,
            initialMana: 0,
            healthRecovery: 0,
            naturalManaRecovery: 3,
            attackManaRecovery: 5.2,
            damageManaRecovery: 0,
            skillCooldown: 0,
            damage: 65,
            armor: 5,
            physicalDamageReduction: 23.08,
            magicDefense: 25,
            attackRange: 800,
            attackSpeed: 0.8,
            attackInterval: 1.54,
            dps: 42.25,
            criticalChance: 0,
            criticalDamage: 150,
            abilities: ['invoker_elemental_invoke']
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
     * 🔑 直接从棋子数据库中随机选择，不受棋子池库存限制
     */
    private selectRandomPieceByRarity(rarity: ChessRarity): ChessPiece | null {
        const pieces: ChessPiece[] = [];
        
        // 从棋子数据库中筛选对应稀有度的棋子
        for (const piece of this.chessPieceDatabase.values()) {
            if (piece.rarity === rarity) {
                pieces.push(piece);
            }
        }
        
        if (pieces.length === 0) {
            print(`[AutoChessMode] ⚠️ 稀有度 ${ChessRarity[rarity]} 没有可用棋子`);
            return null;
        }
        
        // 随机选择一个
        const randomIndex = RandomInt(0, pieces.length - 1);
        return pieces[randomIndex];
    }

    /**
     * 根据关卡层级计算稀有度概率（基于Excel配置表）
     * @param stageLevel 关卡层级（已完成关卡数量）
     * @returns 稀有度概率映射
     */
    private calculateRarityChancesByStageLevel(stageLevel: number): Map<ChessRarity, number> {
        const chances = new Map<ChessRarity, number>();
        
        // 根据关卡层级配置概率（来自Excel配置表）
        if (stageLevel <= 1) {
            // 第1层：100%普通
            chances.set(ChessRarity.COMMON, 100);
        } else if (stageLevel === 2) {
            // 第2层：80%普通，20%不常见
            chances.set(ChessRarity.COMMON, 80);
            chances.set(ChessRarity.UNCOMMON, 20);
        } else if (stageLevel === 3) {
            // 第3层：75%普通，25%不常见
            chances.set(ChessRarity.COMMON, 75);
            chances.set(ChessRarity.UNCOMMON, 25);
        } else if (stageLevel === 4 || stageLevel === 5) {
            // 第4-5层：55%普通，30%不常见，15%稀有
            chances.set(ChessRarity.COMMON, 55);
            chances.set(ChessRarity.UNCOMMON, 30);
            chances.set(ChessRarity.RARE, 15);
        } else if (stageLevel === 6) {
            // 第6层：45%普通，33%不常见，20%稀有，2%史诗
            chances.set(ChessRarity.COMMON, 45);
            chances.set(ChessRarity.UNCOMMON, 33);
            chances.set(ChessRarity.RARE, 20);
            chances.set(ChessRarity.EPIC, 2);
        } else if (stageLevel === 7 || stageLevel === 8) {
            // 第7-8层：30%普通，40%不常见，25%稀有，5%史诗
            chances.set(ChessRarity.COMMON, 30);
            chances.set(ChessRarity.UNCOMMON, 40);
            chances.set(ChessRarity.RARE, 25);
            chances.set(ChessRarity.EPIC, 5);
        } else if (stageLevel === 9 || stageLevel === 10) {
            // 第9-10层：25%普通，35%不常见，30%稀有，8%史诗，2%传奇
            chances.set(ChessRarity.COMMON, 25);
            chances.set(ChessRarity.UNCOMMON, 35);
            chances.set(ChessRarity.RARE, 30);
            chances.set(ChessRarity.EPIC, 8);
            chances.set(ChessRarity.LEGENDARY, 2);
        } else {
            // 第11层及以上（Boss及更高）：25%普通，35%不常见，30%稀有，8%史诗，2%传奇
            chances.set(ChessRarity.COMMON, 25);
            chances.set(ChessRarity.UNCOMMON, 35);
            chances.set(ChessRarity.RARE, 30);
            chances.set(ChessRarity.EPIC, 8);
            chances.set(ChessRarity.LEGENDARY, 2);
        }
        
        return chances;
    }

    /**
     * 通关后按概率解锁新棋子
     * 🔑 每通过一关解锁一个棋子，概率根据关卡层级决定
     * @param playerId 玩家ID
     * @returns 解锁的棋子，如果没有解锁则返回null
     */
    private unlockRandomPieceAfterVictory(playerId: PlayerID): ChessPiece | null {
        print(`[AutoChessMode] ========== 通关解锁新棋子 ==========`);
        
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] ⚠️ 玩家状态不存在: ${playerId}`);
            return null;
        }
        
        // 🔑 每通过一关必定解锁一个棋子
        const unlockChance = 100;
        
        // 🔑 根据已完成关卡数量确定当前关卡层级
        const stageLevel = this.completedStages.size;
        print(`[AutoChessMode] 📊 当前关卡层级: ${stageLevel} (已完成关卡数: ${this.completedStages.size})`);
        
        // 根据关卡层级计算稀有度概率
        const rarityChances = this.calculateRarityChancesByStageLevel(stageLevel);
        
        // 输出当前层级的概率配置
        print(`[AutoChessMode] 🎲 第${stageLevel}层稀有度概率:`);
        for (const [rarity, chance] of rarityChances) {
            print(`[AutoChessMode]   ${ChessRarity[rarity]}: ${chance}%`);
        }
        
        const selectedRarity = this.selectRandomRarity(rarityChances);
        print(`[AutoChessMode] 🎯 选中稀有度: ${ChessRarity[selectedRarity]}`);
        
        // 选择一个该稀有度的棋子
        const unlockedPiece = this.selectRandomPieceByRarity(selectedRarity);
        
        if (!unlockedPiece) {
            print(`[AutoChessMode] ⚠️ 该稀有度没有可用棋子`);
            return null;
        }
        
        print(`[AutoChessMode] ✨ 解锁新棋子: ${unlockedPiece.displayName} (${ChessRarity[unlockedPiece.rarity]})`);
        
        // 🔑 添加到玩家背包
        playerState.benchPieces.push(unlockedPiece);
        print(`[AutoChessMode] ➕ 已添加到背包，当前背包数量: ${playerState.benchPieces.length}`);
        
        // 🔑 更新背包UI
        inventoryHandler.sendInventoryData(playerId);
        
        // 🔑 发送解锁事件到UI显示特效
        (CustomGameEventManager.Send_ServerToAllClients as any)('piece_unlocked', {
            playerId: playerId,
            piece: {
                id: unlockedPiece.id,
                unitName: unlockedPiece.unitName,
                displayName: unlockedPiece.displayName,
                rarity: unlockedPiece.rarity,
                cost: unlockedPiece.cost,
                race: unlockedPiece.race,
                class: unlockedPiece.class
            }
        });
        
        print(`[AutoChessMode] ========== 解锁完成 ==========`);
        return unlockedPiece;
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
        // 🔑 只清理敌人棋子（AI），玩家棋子已经在returnPiecesToBench中处理了
        // 清理AI棋子（playerId = -1）
        this.battleSystem.clearPlayerPieces(-1);
        
        // 清理玩家棋子（但只删除单位，不删除记录，因为已经在returnPiecesToBench中回收了）
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                // 只删除单位实体，保留部署记录（因为已经回收了）
                const pieces = this.battleSystem.getPlayerPieces(playerId);
                for (const piece of pieces) {
                    if (piece.unit && !piece.unit.IsNull()) {
                        piece.unit.RemoveSelf();
                    }
                }
                // 清空部署记录
                (this.battleSystem as any).playerDeployedPieces.delete(playerId);
            }
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
     * 获取玩家状态（公开方法）
     * 单机模式：默认返回玩家 0 的状态
     */
    public getPlayerState(playerId?: PlayerID): PlayerState | undefined {
        // 单机模式默认使用玩家 0
        const pid = playerId ?? 0 as PlayerID;
        return this.gameState.playerStates.get(pid);
    }
    
    /**
     * 获取当前游戏阶段（公开方法）
     */
    public getCurrentPhase(): RoundPhase {
        return this.gameState.currentPhase;
    }
    
    /**
     * 获取当前回合数（公开方法）
     */
    public getCurrentRound(): number {
        return this.gameState.currentRound;
    }
    
    /**
     * 获取玩家备战席棋子
     * @param playerId 玩家ID，如果不传则使用玩家0（单机模式）
     */
    public getBenchPieces(playerId?: PlayerID): ChessPiece[] {
        const playerState = this.getPlayerState(playerId);
        return playerState?.benchPieces || [];
    }
    
    /**
     * 获取玩家棋盘上的棋子（单机模式简化 API）
     */
    public getBoardPieces(): ChessPiece[] {
        const playerState = this.getPlayerState();
        return playerState?.boardPieces || [];
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

            // 🔑 玩家胜利时，按概率解锁新棋子
            if (playerWon) {
                print(`[AutoChessMode] 🎉 玩家 ${playerId} 胜利，尝试解锁新棋子...`);
                const unlockedPiece = this.unlockRandomPieceAfterVictory(playerId);
                if (unlockedPiece) {
                    print(`[AutoChessMode] ✨ 成功解锁: ${unlockedPiece.displayName}`);
                } else {
                    print(`[AutoChessMode] 💫 本次未解锁新棋子`);
                }
            }

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
     * 点击选关后：10秒准备阶段 -> 生成怪物 -> 开始战斗
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

        // 开始10秒准备阶段
        print(`[AutoChessMode] 开始10秒准备阶段...`);
        this.startPreparationCountdown(playerId, stageIdNum);
    }

    /**
     * 开始准备阶段倒计时
     */
    private startPreparationCountdown(playerId: PlayerID, stageId: number): void {
        const PREP_TIME = 10;  // 准备阶段时长：10秒
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
        let autoDeployTriggered = false; // 🔑 标记是否已触发自动部署
        const countdownTimer = Timers.CreateTimer(1.0, () => {
            timeLeft--;
            
            print(`[AutoChessMode] 准备阶段倒计时: ${timeLeft}秒 (stageId: ${stageId}, playerId: ${playerId})`);
            
            // 🔑 剩余3秒时，检查并自动部署（在背包UI还可见时）
            if (timeLeft === 3 && !autoDeployTriggered) {
                autoDeployTriggered = true;
                print(`[AutoChessMode] ⏰ 倒计时剩余3秒，检查是否需要自动部署...`);
                
                for (const [pid, playerState] of this.gameState.playerStates) {
                    if (playerState.isAlive) {
                        const deployedPieces = this.battleSystem.getPlayerPieces(pid);
                        if (deployedPieces.length === 0) {
                            print(`[AutoChessMode] 玩家 ${pid} 未部署棋子，准备自动部署...`);
                            this.autoDeployFromBench(pid);
                        } else {
                            print(`[AutoChessMode] 玩家 ${pid} 已有 ${deployedPieces.length} 个棋子，跳过自动部署`);
                        }
                    }
                }
            }
            
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
            print(`[AutoChessMode] 敌人已在准备阶段创建，将在稍后统一启用攻击能力`);
            // 攻击能力将在稍后统一启用（避免重复调用）
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

        // 检查玩家是否已有部署的棋子（准备阶段已部署）
        print(`[AutoChessMode] 检查玩家棋子状态...`);
        for (const [pid, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                this.battleSystem.setPlayerAsProtected(pid);
                
                // 检查是否已有部署的棋子
                const deployedPieces = this.battleSystem.getPlayerPieces(pid);
                if (deployedPieces && deployedPieces.length > 0) {
                    print(`[AutoChessMode] 玩家 ${pid} 已有 ${deployedPieces.length} 个部署的棋子，无需重新创建`);
                    // 准备阶段已部署，无需重新创建
                } else {
                    print(`[AutoChessMode] 玩家 ${pid} 没有部署棋子，尝试从背包部署...`);
                    // 如果没有部署棋子，从背包部署
                    const benchPieces = playerState.benchPieces || [];
                    if (benchPieces.length > 0) {
                        print(`[AutoChessMode] 从背包自动部署1个棋子...`);
                        this.autoDeployFromBench(pid);
                    } else {
                        print(`[AutoChessMode] ⚠️ 警告：玩家 ${pid} 背包和场上都没有棋子，跳过部署`);
                    }
                }
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

    /**
     * 保存背包数据到本地文件（同步）
     */
    private saveBackpackToFile(playerId: PlayerID): boolean {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState || !playerState.benchPieces) {
            print(`[AutoChessMode] 玩家 ${playerId} 没有背包数据，跳过保存`);
            return false;
        }

        // 转换ChessPiece为ChessPieceData（只保存必要字段）
        const benchData = playerState.benchPieces.map(piece => ({
            id: piece.id,
            unitName: piece.unitName,
            displayName: piece.displayName,
            rarity: piece.rarity,
            cost: piece.cost,
            health: piece.health,
            maxHealth: piece.health, // 使用当前health作为maxHealth
            damage: piece.damage,
            armor: piece.armor,
            attackRange: piece.attackRange
        }));

        const success = saveDataManager.saveBackpackData(playerId, benchData);
        if (success) {
            print(`[AutoChessMode] 💾 玩家 ${playerId} 背包数据已保存到本地文件（${benchData.length} 个棋子）`);
        } else {
            print(`[AutoChessMode] ⚠️ 玩家 ${playerId} 背包数据保存失败`);
        }
        return success;
    }

    /**
     * 从本地文件加载背包数据（同步）
     */
    private loadBackpackFromFile(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] 玩家 ${playerId} 状态不存在，无法加载`);
            return;
        }

        const loadedData = saveDataManager.loadBackpackData(playerId);
        if (loadedData && loadedData.length > 0) {
            // 从数据库中获取完整的ChessPiece数据
            const fullPieces: ChessPiece[] = [];
            for (const data of loadedData) {
                const fullPiece = this.chessPieceDatabase.get(data.id);
                if (fullPiece) {
                    // 复制一份并保留存档中的health值
                    fullPieces.push({
                        ...fullPiece,
                        health: data.health
                    });
                } else {
                    print(`[AutoChessMode] ⚠️ 存档中的棋子ID ${data.id} 在数据库中不存在`);
                }
            }
            
            playerState.benchPieces = fullPieces;
            print(`[AutoChessMode] 📂 玩家 ${playerId} 背包数据已从本地文件加载（${fullPieces.length} 个棋子）`);
            
            // 通知客户端更新UI
            inventoryHandler.sendInventoryData(playerId);
        } else {
            print(`[AutoChessMode] ℹ️ 玩家 ${playerId} 没有存档数据，使用默认初始化`);
        }
    }

    /**
     * 重启游戏（保存背包数据后重置）
     */
    public restartGame(): void {
        print('[AutoChessMode] ========== 🔄 重启游戏 ==========');
        
        // 1. 保存所有玩家背包数据到本地文件（同步）
        for (const [playerId] of this.gameState.playerStates) {
            this.saveBackpackToFile(playerId);
        }
        
        // 2. 清理战斗系统中所有玩家的棋子
        for (const [playerId] of this.gameState.playerStates) {
            this.battleSystem.clearPlayerPieces(playerId);
        }
        // 清理敌人棋子（playerId为-1）
        this.battleSystem.clearPlayerPieces(-1);
        
        // 3. 清理所有棋盘上的单位（保险起见）
        const allUnits = Entities.FindAllByClassname('npc_dota_creature');
        for (const unit of allUnits) {
            if (unit && !unit.IsNull()) {
                unit.RemoveSelf();
            }
        }
        
        // 4. 重置游戏状态
        this.gameState.currentRound = 0;
        this.gameState.currentPhase = RoundPhase.PREPARATION;
        this.gameState.isGameActive = false;
        this.resetWaveSettlementState();
        this.completedStages.clear();
        this.availableStages.clear();
        this.initializeStageUnlock();
        
        // 5. 重置所有玩家状态（暂时清空背包）
        for (const [playerId, playerState] of this.gameState.playerStates) {
            playerState.health = 100;
            playerState.gold = 0;
            playerState.level = 1;
            playerState.benchPieces = [];
            playerState.boardPieces = [];
            playerState.isAlive = true;
            playerState.winStreak = 0;
            playerState.lossStreak = 0;
        }
        
        // 6. 从本地文件重新加载背包数据（同步）
        for (const [playerId] of this.gameState.playerStates) {
            this.loadBackpackFromFile(playerId);
        }
        
        // 7. 延迟1秒后重新开始游戏
        Timers.CreateTimer(1, () => {
            this.startGame();
            return undefined;
        });
        
        // 8. 通知客户端游戏已重置
        (CustomGameEventManager.Send_ServerToAllClients as any)('game_reset', {});
        print('[AutoChessMode] ✅ 游戏重启完成，背包数据已恢复');
    }

    /**
     * 从保存的背包中随机抽取指定数量的棋子
     */
    private loadRandomPiecesFromBackpack(playerId: PlayerID, count: number): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] ⚠️ 玩家 ${playerId} 状态不存在，无法加载`);
            return;
        }

        // 从本地文件加载背包数据
        const loadedPieces = saveDataManager.loadBackpackData(playerId);
        if (!loadedPieces || loadedPieces.length === 0) {
            print(`[AutoChessMode] ℹ️ 玩家 ${playerId} 没有存档数据，背包为空`);
            playerState.benchPieces = [];
            inventoryHandler.sendInventoryData(playerId);
            return;
        }

        // 将存档数据转换为完整的ChessPiece对象
        const fullPieces: ChessPiece[] = [];
        for (const data of loadedPieces) {
            const fullPiece = this.chessPieceDatabase.get(data.id);
            if (fullPiece) {
                fullPieces.push({
                    ...fullPiece,
                    health: data.health
                });
            } else {
                print(`[AutoChessMode] ⚠️ 存档中的棋子ID ${data.id} 在数据库中不存在`);
            }
        }

        // 随机抽取指定数量的棋子
        const selectedPieces: ChessPiece[] = [];
        const remainingPieces: ChessPiece[] = [...fullPieces]; // 复制一份用于追踪剩余棋子
        const actualCount = Math.min(count, fullPieces.length);
        
        if (actualCount >= fullPieces.length) {
            // 如果数量不足，全部使用
            selectedPieces.push(...fullPieces);
            remainingPieces.length = 0; // 清空剩余棋子
            print(`[AutoChessMode] 📦 玩家 ${playerId} 背包棋子不足${count}个，全部消耗（${fullPieces.length} 个）`);
        } else {
            // 随机抽取
            for (let i = 0; i < actualCount; i++) {
                const randomIndex = Math.floor(Math.random() * remainingPieces.length);
                const selectedPiece = remainingPieces[randomIndex];
                selectedPieces.push(selectedPiece);
                remainingPieces.splice(randomIndex, 1); // 从剩余列表中移除
            }
            print(`[AutoChessMode] 🎲 玩家 ${playerId} 从背包随机抽取并消耗 ${actualCount} 个棋子，剩余 ${remainingPieces.length} 个`);
        }

        // 将剩余的棋子重新保存回存档（消耗已抽取的）
        const remainingData = remainingPieces.map(piece => ({
            id: piece.id,
            unitName: piece.unitName,
            displayName: piece.displayName,
            rarity: piece.rarity,
            cost: piece.cost,
            health: piece.health,
            maxHealth: piece.health,
            damage: piece.damage,
            armor: piece.armor,
            attackRange: piece.attackRange
        }));
        saveDataManager.saveBackpackData(playerId, remainingData);
        print(`[AutoChessMode] 💾 已更新存档，剩余 ${remainingData.length} 个棋子`);

        // 设置到玩家背包
        playerState.benchPieces = selectedPieces;
        
        // 通知客户端更新UI
        inventoryHandler.sendInventoryData(playerId);
        
        print(`[AutoChessMode] ✅ 玩家 ${playerId} 背包已更新（${selectedPieces.length} 个棋子）`);
    }

    /**
     * 追加背包数据到存档（用于累积棋子）
     */
    private appendBackpackToFile(playerId: PlayerID): boolean {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState || !playerState.benchPieces) {
            print(`[AutoChessMode] 玩家 ${playerId} 没有背包数据，跳过追加`);
            return false;
        }

        // 先加载存档中的剩余棋子
        const existingData = saveDataManager.loadBackpackData(playerId) || [];
        print(`[AutoChessMode] 📂 加载现有存档：${existingData.length} 个棋子`);

        // 转换当前背包为数据格式
        const currentData = playerState.benchPieces.map(piece => ({
            id: piece.id,
            unitName: piece.unitName,
            displayName: piece.displayName,
            rarity: piece.rarity,
            cost: piece.cost,
            health: piece.health,
            maxHealth: piece.health,
            damage: piece.damage,
            armor: piece.armor,
            attackRange: piece.attackRange
        }));

        // 合并：存档中的剩余棋子 + 本局获得的棋子
        const mergedData = [...existingData, ...currentData];
        print(`[AutoChessMode] 🔗 合并数据：${existingData.length} (旧) + ${currentData.length} (新) = ${mergedData.length} (总)`);

        // 保存合并后的数据
        const success = saveDataManager.saveBackpackData(playerId, mergedData);
        if (success) {
            print(`[AutoChessMode] 💾 玩家 ${playerId} 背包数据已累积保存（总计 ${mergedData.length} 个棋子）`);
        } else {
            print(`[AutoChessMode] ⚠️ 玩家 ${playerId} 背包数据追加失败`);
        }
        return success;
    }

    /**
     * 退出到主菜单（保存背包数据，重新开始游戏并随机抽取3个棋子）
     */
    public exitToMenu(): void {
        print('[AutoChessMode] ========== 🔄 重新开始游戏 ==========');
        
        // 1. 追加所有玩家背包数据到本地文件（累积模式）
        for (const [playerId] of this.gameState.playerStates) {
            this.appendBackpackToFile(playerId);
        }
        
        // 2. 清理战斗系统
        for (const [playerId] of this.gameState.playerStates) {
            this.battleSystem.clearPlayerPieces(playerId);
        }
        this.battleSystem.clearPlayerPieces(-1);
        
        // 3. 清理所有棋盘上的单位
        const allUnits = Entities.FindAllByClassname('npc_dota_creature');
        for (const unit of allUnits) {
            if (unit && !unit.IsNull()) {
                unit.RemoveSelf();
            }
        }
        
        // 4. 重置游戏状态
        this.gameState.currentRound = 0;
        this.gameState.currentPhase = RoundPhase.PREPARATION;
        this.gameState.isGameActive = false;
        this.resetWaveSettlementState();
        
        // 5. 重置所有玩家状态（清空背包和棋盘）
        for (const [playerId, playerState] of this.gameState.playerStates) {
            playerState.health = 100;
            playerState.gold = 0;
            playerState.level = 1;
            playerState.benchPieces = [];
            playerState.boardPieces = [];
            playerState.isAlive = true;
            playerState.winStreak = 0;
            playerState.lossStreak = 0;
        }
        
        // 6. 从保存的背包中随机抽取3个棋子
        for (const [playerId] of this.gameState.playerStates) {
            this.loadRandomPiecesFromBackpack(playerId, 3);
        }
        
        // 7. 延迟1秒后重新开始游戏（进入准备阶段）
        Timers.CreateTimer(1, () => {
            this.startGame();
            return undefined;
        });
        
        // 8. 通知客户端游戏已重置
        (CustomGameEventManager.Send_ServerToAllClients as any)('game_reset', {});
        print('[AutoChessMode] ✅ 游戏重新开始，已从背包随机抽取3个棋子');
    }
}