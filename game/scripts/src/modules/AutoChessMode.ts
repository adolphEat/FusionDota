/**
 * 自走棋模式核心逻辑 - 完整的自走棋游戏系统
 * AutoChess Mode Core - Complete auto chess game system
 */

import { GameMode, GameModeManager } from './GameModeManager';

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
<<<<<<< Updated upstream
    playerStates: Record<string, PlayerState>;
    chessPool: Record<string, number>; // 棋子池
=======
    playerStates: Map<PlayerID, PlayerState>;
    chessPool: Map<string, number>; // 棋子池
>>>>>>> Stashed changes
    isGameActive: boolean;
    winnerPlayerId?: PlayerID;
}

export class AutoChessMode {
    private static instance: AutoChessMode;
    private gameState: GameState;
    private phaseTimer?: string;
<<<<<<< Updated upstream
    private chessPieceDatabase: Record<string, ChessPiece>;
    private isActive: boolean = false;

    private constructor() {
        // 先初始化数据库，再初始化游戏状态
        this.chessPieceDatabase = this.initializeChessDatabase();
        this.gameState = this.initializeGameState();
=======
    private chessPieceDatabase: Map<string, ChessPiece>;
    private isActive: boolean = false;

    private constructor() {
        this.gameState = this.initializeGameState();
        this.chessPieceDatabase = this.initializeChessDatabase();
>>>>>>> Stashed changes
        this.initializeAutoChessMode();
        print('[AutoChessMode] Initialized');
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
        this.gameState.phaseTimeLeft = 30; // 30秒准备时间
        
        // 发放回合收入
        this.distributeRoundIncome();
        
        // 刷新商店
        this.refreshAllPlayersShop();
        
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
     * 阶段计时器
     */
    private startPhaseTimer(): void {
        if (this.phaseTimer) {
            Timers.RemoveTimer(this.phaseTimer);
        }

        this.phaseTimer = Timers.CreateTimer(1.0, () => {
            this.gameState.phaseTimeLeft--;
            
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
<<<<<<< Updated upstream
            playerStates: {},
=======
            playerStates: new Map(),
>>>>>>> Stashed changes
            chessPool: this.initializeChessPool(),
            isGameActive: false
        };
    }

    /**
     * 初始化棋子池
     */
<<<<<<< Updated upstream
    private initializeChessPool(): Record<string, number> {
        const pool: Record<string, number> = {};
        
        // 安全检查：确保数据库已初始化
        if (!this.chessPieceDatabase) {
            print('[AutoChessMode] Warning: chessPieceDatabase not initialized, returning empty pool');
            return pool;
        }
=======
    private initializeChessPool(): Map<string, number> {
        const pool = new Map<string, number>();
>>>>>>> Stashed changes
        
        // 根据稀有度设置棋子数量
        // 1费棋子：45个
        // 2费棋子：30个
        // 3费棋子：25个
        // 4费棋子：15个
        // 5费棋子：10个
        
<<<<<<< Updated upstream
        for (const pieceId in this.chessPieceDatabase) {
            const piece = this.chessPieceDatabase[pieceId];
=======
        for (const [pieceId, piece] of this.chessPieceDatabase) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            pool[pieceId] = count;
=======
            pool.set(pieceId, count);
>>>>>>> Stashed changes
        }
        
        return pool;
    }

    /**
     * 初始化棋子数据库
     */
<<<<<<< Updated upstream
    private initializeChessDatabase(): Record<string, ChessPiece> {
        const database: Record<string, ChessPiece> = {};
        
        // 示例棋子 - 1费普通棋子
        database['anti_mage'] = {
=======
    private initializeChessDatabase(): Map<string, ChessPiece> {
        const database = new Map<string, ChessPiece>();
        
        // 示例棋子 - 1费普通棋子
        database.set('anti_mage', {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        };
        
        database['crystal_maiden'] = {
=======
        });
        
        database.set('crystal_maiden', {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        };
=======
        });
>>>>>>> Stashed changes
        
        // TODO: 添加更多棋子...
        
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
                
<<<<<<< Updated upstream
                this.gameState.playerStates[playerId] = playerState;
=======
                this.gameState.playerStates.set(playerId, playerState);
>>>>>>> Stashed changes
            }
        }
    }

    /**
     * 发放回合收入
     */
    private distributeRoundIncome(): void {
<<<<<<< Updated upstream
        for (const playerId in this.gameState.playerStates) {
            const playerState = this.gameState.playerStates[playerId];
=======
        for (const [playerId, playerState] of this.gameState.playerStates) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        for (const playerId in this.gameState.playerStates) {
            const playerState = this.gameState.playerStates[playerId];
=======
        for (const [playerId, playerState] of this.gameState.playerStates) {
>>>>>>> Stashed changes
            if (!playerState.isAlive) continue;
            
            const shopPieces = this.generateShopPieces(playerState.level);
            
            // 通过网络表发送商店数据
            if (GameRules.XNetTable) {
                GameRules.XNetTable.SetTableValue('autochess_shop', `player_${playerId}`, {
                    pieces: shopPieces,
                    refreshCount: 0,
<<<<<<< Updated upstream
                    timestamp: GameRules.GetGameTime() * 1000
=======
                    timestamp: Date.now()
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    private calculateRarityChances(playerLevel: number): Record<ChessRarity, number> {
        const chances: Record<ChessRarity, number> = {} as Record<ChessRarity, number>;
=======
    private calculateRarityChances(playerLevel: number): Map<ChessRarity, number> {
        const chances = new Map<ChessRarity, number>();
>>>>>>> Stashed changes
        
        // 根据等级设置概率 (示例数据)
        switch (playerLevel) {
            case 1:
<<<<<<< Updated upstream
                chances[ChessRarity.COMMON] = 100;
                break;
            case 2:
                chances[ChessRarity.COMMON] = 70;
                chances[ChessRarity.UNCOMMON] = 30;
                break;
            case 3:
                chances[ChessRarity.COMMON] = 60;
                chances[ChessRarity.UNCOMMON] = 35;
                chances[ChessRarity.RARE] = 5;
                break;
            // TODO: 添加更多等级...
            default:
                chances[ChessRarity.COMMON] = 50;
                chances[ChessRarity.UNCOMMON] = 35;
                chances[ChessRarity.RARE] = 10;
                chances[ChessRarity.EPIC] = 4;
                chances[ChessRarity.LEGENDARY] = 1;
=======
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
>>>>>>> Stashed changes
        }
        
        return chances;
    }

    /**
     * 随机选择稀有度
     */
<<<<<<< Updated upstream
    private selectRandomRarity(chances: Record<ChessRarity, number>): ChessRarity {
        let totalChance = 0;
        for (const rarity in chances) {
            totalChance += chances[Number(rarity) as ChessRarity];
=======
    private selectRandomRarity(chances: Map<ChessRarity, number>): ChessRarity {
        let totalChance = 0;
        for (const chance of chances.values()) {
            totalChance += chance;
>>>>>>> Stashed changes
        }
        
        const random = RandomFloat(0, totalChance);
        let currentChance = 0;
        
<<<<<<< Updated upstream
        for (const rarity in chances) {
            const chance = chances[Number(rarity) as ChessRarity];
            currentChance += chance;
            if (random <= currentChance) {
                return Number(rarity) as ChessRarity;
=======
        for (const [rarity, chance] of chances) {
            currentChance += chance;
            if (random <= currentChance) {
                return rarity;
>>>>>>> Stashed changes
            }
        }
        
        return ChessRarity.COMMON; // 默认返回普通
    }

    /**
     * 根据稀有度随机选择棋子
     */
    private selectRandomPieceByRarity(rarity: ChessRarity): ChessPiece | null {
        const pieces: ChessPiece[] = [];
        
<<<<<<< Updated upstream
        for (const pieceId in this.chessPieceDatabase) {
            const piece = this.chessPieceDatabase[pieceId];
            if (piece.rarity === rarity) {
                // 检查棋子池是否还有库存
                const remaining = this.gameState.chessPool[piece.id] || 0;
=======
        for (const piece of this.chessPieceDatabase.values()) {
            if (piece.rarity === rarity) {
                // 检查棋子池是否还有库存
                const remaining = this.gameState.chessPool.get(piece.id) || 0;
>>>>>>> Stashed changes
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
     * 设置战斗配对
     */
    private setupBattleMatching(): void {
        const alivePlayers: PlayerID[] = [];
        
<<<<<<< Updated upstream
        for (const playerId in this.gameState.playerStates) {
            const playerState = this.gameState.playerStates[playerId];
            if (playerState.isAlive) {
                alivePlayers.push(Number(playerId) as PlayerID);
=======
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                alivePlayers.push(playerId);
>>>>>>> Stashed changes
            }
        }
        
        // 随机配对 (简单实现)
        for (let i = 0; i < alivePlayers.length; i += 2) {
            if (i + 1 < alivePlayers.length) {
                const player1 = alivePlayers[i];
                const player2 = alivePlayers[i + 1];
                
                // 通知客户端战斗配对
                (CustomGameEventManager.Send_ServerToAllClients as any)('autochess_battle_match', {
                    player1: player1,
                    player2: player2,
                    round: this.gameState.currentRound
                });
            }
        }
    }

    /**
     * 开始所有战斗
     */
    private startAllBattles(): void {
        // TODO: 实现战斗逻辑
        print('[AutoChessMode] Started all battles');
    }

    /**
     * 停止所有战斗
     */
    private stopAllBattles(): void {
        // TODO: 实现战斗停止逻辑
        print('[AutoChessMode] Stopped all battles');
    }

    /**
     * 计算战斗结果
     */
    private calculateBattleResults(): void {
        // TODO: 实现战斗结果计算
        print('[AutoChessMode] Calculated battle results');
    }

    /**
     * 检查游戏是否结束
     */
    private checkGameEnd(): boolean {
<<<<<<< Updated upstream
        let aliveCount = 0;
        for (const playerId in this.gameState.playerStates) {
            const playerState = this.gameState.playerStates[playerId];
            if (playerState.isAlive) {
                aliveCount++;
            }
        }
=======
        const aliveCount = Array.from(this.gameState.playerStates.values())
            .filter(state => state.isAlive).length;
>>>>>>> Stashed changes
        
        return aliveCount <= 1 || this.gameState.currentRound >= 50;
    }

    /**
     * 结束游戏
     */
    private endGame(): void {
        this.gameState.isGameActive = false;
        
        // 确定获胜者
<<<<<<< Updated upstream
        for (const playerId in this.gameState.playerStates) {
            const playerState = this.gameState.playerStates[playerId];
            if (playerState.isAlive) {
                this.gameState.winnerPlayerId = Number(playerId) as PlayerID;
=======
        for (const [playerId, playerState] of this.gameState.playerStates) {
            if (playerState.isAlive) {
                this.gameState.winnerPlayerId = playerId;
>>>>>>> Stashed changes
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
     * 初始化自走棋模式
     */
    private initializeAutoChessMode(): void {
        // 等待游戏开始后激活
        Timers.CreateTimer(1.0, () => {
            const gameModeManager = GameModeManager.getInstance();
            if (gameModeManager.isAutoChessMode()) {
                this.activate();
            }
            return null;
        });
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
<<<<<<< Updated upstream
                timestamp: GameRules.GetGameTime() * 1000
=======
                timestamp: Date.now()
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            chessPieceCount: Object.keys(this.chessPieceDatabase).length
=======
            chessPieceCount: this.chessPieceDatabase.size
>>>>>>> Stashed changes
        };
    }

    /**
     * 购买棋子
     */
    public buyChessPiece(playerId: PlayerID, pieceId: string): boolean {
<<<<<<< Updated upstream
        const playerState = this.gameState.playerStates[playerId];
        const piece = this.chessPieceDatabase[pieceId];
=======
        const playerState = this.gameState.playerStates.get(playerId);
        const piece = this.chessPieceDatabase.get(pieceId);
>>>>>>> Stashed changes
        
        if (!playerState || !piece) {
            return false;
        }
        
        // 检查金币是否足够
        if (playerState.gold < piece.cost) {
            return false;
        }
        
        // 检查棋子池是否有库存
<<<<<<< Updated upstream
        const remaining = this.gameState.chessPool[pieceId] || 0;
=======
        const remaining = this.gameState.chessPool.get(pieceId) || 0;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        this.gameState.chessPool[pieceId] = remaining - 1;
=======
        this.gameState.chessPool.set(pieceId, remaining - 1);
>>>>>>> Stashed changes
        
        print(`[AutoChessMode] Player ${playerId} bought ${piece.displayName}`);
        
        // 同步到客户端
        this.syncPlayerState(playerId);
        
        return true;
    }

    /**
     * 同步玩家状态到客户端
     */
    private syncPlayerState(playerId: PlayerID): void {
<<<<<<< Updated upstream
        const playerState = this.gameState.playerStates[playerId];
=======
        const playerState = this.gameState.playerStates.get(playerId);
>>>>>>> Stashed changes
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
            timestamp: Date.now()
        });
    }
}