/**
 * 自走棋模式核心逻辑 - 完整的自走棋游戏系统
 * AutoChess Mode Core - Complete auto chess game system
 */

import { GameMode, GameModeManager } from './GameModeManager';
import { ChessBattleSystem } from './autochess/ChessBattleSystem';
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
    rarity: ChessRarity;   // 稀有度
    cost: number;          // 购买费用
    race: string[];        // 种族
    class: string[];       // 职业
    health: number;        // 生命值
    damage: number;        // 攻击力
    armor: number;         // 护甲
    attackRange: number;   // 攻击距离
    abilities: string[];   // 技能列表
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

    private constructor() {
        print('[AutoChessMode] ========== 构造函数开始 ==========');
        
        // 先初始化棋子数据库，因为 initializeGameState 需要用到它
        print('[AutoChessMode] 初始化棋子数据库...');
        this.chessPieceDatabase = this.initializeChessDatabase();
        
        // 再初始化游戏状态
        print('[AutoChessMode] 初始化游戏状态...');
        this.gameState = this.initializeGameState();
        
        print('[AutoChessMode] 初始化战斗系统...');
        this.battleSystem = ChessBattleSystem.getInstance();
        
        print('[AutoChessMode] 初始化自走棋模式...');
        this.initializeAutoChessMode();
        
        print('[AutoChessMode] ✅ Initialized');
    }

    public static getInstance(): AutoChessMode {
        if (!AutoChessMode.instance) {
            AutoChessMode.instance = new AutoChessMode();
        }
        return AutoChessMode.instance;
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
        print(`[AutoChessMode] ========== 开始部署玩家棋子到战斗位置 ==========`);
        print(`[AutoChessMode] Player ID: ${playerId}, Phase: ${this.gameState.currentPhase}`);
        
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) {
            print(`[AutoChessMode] ERROR: Player state not found for player ${playerId}`);
            return;
        }

        // 在战斗阶段，棋子已经在准备阶段创建好了
        // 这里只需要确保棋子处于战斗状态
        if (this.gameState.currentPhase === RoundPhase.BATTLE) {
            print(`[AutoChessMode] 战斗阶段：激活玩家 ${playerId} 的棋子`);
            
            // 激活玩家的棋子，使其可以战斗
            this.battleSystem.activatePlayerPieces(playerId);
            
            print(`[AutoChessMode] 玩家 ${playerId} 的棋子已激活，准备战斗`);
        }
        
        print(`[AutoChessMode] ========== 战斗阶段棋子部署完成 ==========`);
    }

    /**
     * 获取默认测试棋子（用于开发测试）
     */
    private getDefaultTestPieces(): string[] {
        // 返回一些默认的测试棋子
        return ['axe', 'axe', 'crystal_maiden'];
    }

    /**
     * 为玩家创建初始棋子（准备阶段）
     */
    private createPlayerInitialPieces(): void {
        print(`[AutoChessMode] ========== 开始创建玩家初始棋子 ==========`);
        
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                print(`[AutoChessMode] 为玩家 ${playerId} 创建初始棋子...`);
                
                // 清空之前的棋子
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
     * 为第一回合创建初始棋子
     */
    private createFirstRoundPieces(playerId: PlayerID): void {
        const playerState = this.gameState.playerStates.get(playerId);
        if (!playerState) return;
        
        // 第一回合给玩家一些初始棋子
        const initialPieces = ['axe', 'crystal_maiden', 'drow_ranger', 'crystal_maiden', 'crystal_maiden'];
        
        for (let i = 0; i < initialPieces.length; i++) {
            const pieceId = initialPieces[i];
            const piece = this.chessPieceDatabase.get(pieceId);
            
            if (piece) {
                // 添加到备战席
                playerState.benchPieces.push(piece);
                
                // 在棋盘上创建棋子（准备阶段，可以拖拽）
                const position = {
                    x: 1 + i,
                    y: 1
                };
                
                print(`[AutoChessMode] 创建初始棋子: ${pieceId} 在位置 (${position.x}, ${position.y})`);
                this.battleSystem.deployPiece(playerId, pieceId, position);
            }
        }
        
        print(`[AutoChessMode] 玩家 ${playerId} 第一回合初始棋子创建完成，共 ${initialPieces.length} 个`);
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
        
        // 获取当前波次配置
        const waveConfigSystem = this.battleSystem.getWaveConfigSystem();
        const waveConfig = waveConfigSystem ? waveConfigSystem.startNewWave(this.gameState.currentRound) : null;
        
        if (!waveConfig) {
            print(`[AutoChessMode] ERROR: 无法获取波次配置 for round ${this.gameState.currentRound}`);
            return;
        }
        
        print(`[AutoChessMode] 使用波次配置: ${waveConfig.name} (${waveConfig.id})`);
        
        // 为每个玩家创建对应的敌人
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                print(`[AutoChessMode] 为玩家 ${playerId} 创建敌人棋子...`);
                this.createEnemyForPlayer(playerId, waveConfig);
            }
        }
        
        print(`[AutoChessMode] ========== 敌人棋子创建完成 ==========`);
    }

    /**
     * 为特定玩家创建敌人棋子
     */
    private createEnemyForPlayer(playerId: PlayerID, waveConfig: any): void {
        print(`[AutoChessMode] 为玩家 ${playerId} 创建敌人，使用配置: ${waveConfig.name}`);
        
        // 使用战斗系统创建敌人棋子
        this.battleSystem.startNewWave(this.gameState.currentRound);
        
        print(`[AutoChessMode] 玩家 ${playerId} 的敌人棋子创建完成`);
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
        // 停止所有战斗
        this.stopAllBattles();
        
        // 计算战斗结果
        this.calculateBattleResults();
        
        // 检查游戏是否结束
        if (this.checkGameEnd()) {
            this.endGame();
            return;
        }
        
        // 进入下一回合
        this.gameState.currentRound++;
        this.startPreparationPhase();
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
     */
    private initializeChessDatabase(): Map<string, ChessPiece> {
        const database = new Map<string, ChessPiece>();
        
        // 示例棋子 - 1费普通棋子
        database.set('anti_mage', {
            id: 'anti_mage',
            unitName: 'npc_dota_hero_antimage',
            displayName: '敌法师',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['恶魔猎手'],
            class: ['刺客'],
            health: 550,
            damage: 50,
            armor: 2,
            attackRange: 150,
            abilities: ['antimage_mana_break']
        });
        
        database.set('crystal_maiden', {
            id: 'crystal_maiden',
            unitName: 'npc_dota_hero_crystal_maiden',
            displayName: '水晶室女',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['人类'],
            class: ['法师'],
            health: 450,
            damage: 35,
            armor: 0,
            attackRange: 600,
            abilities: ['crystal_maiden_crystal_nova']
        });

        database.set('axe', {
            id: 'axe',
            unitName: 'npc_dota_hero_axe',
            displayName: '斧王',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['兽人'],
            class: ['战士'],
            health: 625,
            damage: 52,
            armor: 3,
            attackRange: 150,
            abilities: ['axe_berserkers_call']
        });

        database.set('drow_ranger', {
            id: 'drow_ranger',
            unitName: 'npc_dota_hero_drow_ranger',
            displayName: '卓尔游侠',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['不死'],
            class: ['猎人'],
            health: 435,
            damage: 45,
            armor: 1,
            attackRange: 625,
            abilities: ['drow_ranger_frost_arrows']
        });

        database.set('bounty_hunter', {
            id: 'bounty_hunter',
            unitName: 'npc_dota_hero_bounty_hunter',
            displayName: '赏金猎人',
            rarity: ChessRarity.COMMON,
            cost: 1,
            race: ['地精'],
            class: ['刺客'],
            health: 550,
            damage: 48,
            armor: 2,
            attackRange: 150,
            abilities: ['bounty_hunter_shuriken_toss']
        });
        
        // TODO: 从配置文件读取更多棋子
        
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
     */
    private calculateBattleResults(): void {
        const battles = this.battleSystem.getActiveBattles();
        
        for (const battle of battles) {
            if (!battle.completed) {
                continue;
            }
            
            const playerId = battle.player1;  // player1总是玩家，player2是AI(-1)
            const playerState = this.gameState.playerStates.get(playerId);
            
            if (!playerState) {
                continue;
            }
            
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
        // TODO: 注册自走棋相关事件
    }

    /**
     * 取消注册事件
     */
    private unregisterEvents(): void {
        // TODO: 取消注册事件
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
}