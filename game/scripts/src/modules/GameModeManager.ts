/**
 * 游戏模式管理器 - 管理不同的游戏模式（正常模式、练功房模式等）
 * Game Mode Manager - Manages different game modes (normal, training, etc.)
 */

import { getTimestamp } from '../utils/time_utils';

export enum GameMode {
    NORMAL = 'normal',
    TRAINING = 'training',
    AUTOCHESS = 'autochess',
    CUSTOM = 'custom'
}

export interface GameModeConfig {
    mode: GameMode;
    displayName: string;
    description: string;
    maxPlayers: number;
    allowBots: boolean;
    enableCheats: boolean;
    customRules?: any;
}

interface GameModeSettings {
    currentMode: GameMode;
    modeConfigs: Record<GameMode, GameModeConfig>;
    initialized: boolean;
}

export class GameModeManager {
    private static instance: GameModeManager;
    private settings: GameModeSettings;

    private constructor() {
        this.settings = {
            currentMode: GameMode.AUTOCHESS, // 默认自走棋模式
            modeConfigs: this.getDefaultModeConfigs(),
            initialized: false
        };
        
        this.initializeGameMode();
    }

    public static getInstance(): GameModeManager {
        if (!GameModeManager.instance) {
            GameModeManager.instance = new GameModeManager();
        }
        return GameModeManager.instance;
    }

    /**
     * 切换游戏模式
     */
    public switchMode(mode: GameMode, force: boolean = false): boolean {

        print("_____________________________________1")
        if (this.settings.initialized && !force) {
            print(`[GameModeManager] Cannot switch mode after game initialization. Use force=true to override.`);
            return false;
        }

        print("_____________________________________2")
        const config = this.settings.modeConfigs[mode];
        if (!config) {
            print(`[GameModeManager] Unknown game mode: ${mode}`);
            return false;
        }

        print("_____________________________________3")
        const previousMode = this.settings.currentMode;
        this.settings.currentMode = mode;

        // 应用模式设置
        this.applyModeSettings(config);

        // 通知模式切换
        this.onModeChanged(previousMode, mode);

        print(`[GameModeManager] Switched from ${previousMode} to ${mode}`);
        return true;
    }

    /**
     * 获取当前游戏模式
     */
    public getCurrentMode(): GameMode {
        return this.settings.currentMode;
    }

    /**
     * 获取模式配置
     */
    public getModeConfig(mode?: GameMode): GameModeConfig {
        const targetMode = mode || this.settings.currentMode;
        return this.settings.modeConfigs[targetMode];
    }

    /**
     * 检查是否为训练模式
     */
    public isTrainingMode(): boolean {
        return this.settings.currentMode === GameMode.TRAINING;
    }

    /**
     * 检查是否为自走棋模式
     */
    public isAutoChessMode(): boolean {
        return this.settings.currentMode === GameMode.AUTOCHESS;
    }

    /**
     * 检查是否启用作弊
     */
    public isCheatsEnabled(): boolean {
        return this.getModeConfig().enableCheats;
    }

    /**
     * 初始化游戏模式
     */
    private initializeGameMode(): void {
        // 检测启动参数或配置来确定初始模式
        const detectedMode = this.detectGameMode();
        
        print(`[GameModeManager] Initializing game mode. Current: ${this.settings.currentMode}, Detected: ${detectedMode}`);
        
        // 如果检测到的模式与当前模式不同，或者当前模式是默认的，则切换
        if (detectedMode !== this.settings.currentMode) {
            print(`[GameModeManager] Switching from ${this.settings.currentMode} to ${detectedMode}`);
            this.switchMode(detectedMode);
        } else {
            // 即使模式相同，也要应用设置以确保配置正确
            print(`[GameModeManager] Mode already set to ${detectedMode}, applying settings...`);
            const config = this.settings.modeConfigs[detectedMode];
            if (config) {
                this.applyModeSettings(config);
            }
        }

        // 设置基础游戏规则
        this.setupBaseGameRules();
        
        // 在模式切换完成后才标记为已初始化
        this.settings.initialized = true;
        
        // 同步状态到网络表
        this.syncToNetTable();
        
        print(`[GameModeManager] Game mode initialized: ${this.settings.currentMode}`);
        
        // 延迟发送初始模式通知，确保客户端已加载
        Timers.CreateTimer(2.0, () => {
            print(`[GameModeManager] Sending initial mode notification: ${this.settings.currentMode}`);
            (CustomGameEventManager.Send_ServerToAllClients as any)('game_mode_changed', {
                previousMode: GameMode.NORMAL,
                newMode: this.settings.currentMode,
                config: this.getModeConfig()
            });
            return undefined;
        });
    }

    /**
     * 检测游戏模式（通过启动参数、地图名等）
     */
    private detectGameMode(): GameMode {
        // 检查地图名称（优先级最高）
        const mapName = GetMapName();
        print(`[GameModeManager] Detecting game mode... Map name: ${mapName}`);
        
        // battlemap 应该启动自走棋模式
        if (mapName.includes('battlemap') || mapName.includes('battle') || mapName.includes('autochess')) {
            print(`[GameModeManager] Detected AUTOCHESS mode from map name`);
            return GameMode.AUTOCHESS;
        }
        
        if (mapName.includes('training') || mapName.includes('temp')) {
            print(`[GameModeManager] Detected TRAINING mode from map name`);
            return GameMode.TRAINING;
        }
        
        // 检查是否在工具模式（开发环境）- 作为后备
        if (IsInToolsMode()) {
            print(`[GameModeManager] Detected tools mode, defaulting to AUTOCHESS`);
            return GameMode.AUTOCHESS; // 工具模式默认自走棋（便于测试）
        }

        // 检查玩家数量
        const playerCount = PlayerResource.GetPlayerCount();
        if (playerCount === 1) {
            // 单人模式默认自走棋（单机自走棋）
            return GameMode.AUTOCHESS;
        }

        // 默认返回自走棋模式
        return GameMode.AUTOCHESS;
    }

    /**
     * 应用模式设置
     */
    private applyModeSettings(config: GameModeConfig): void {
        // 设置最大玩家数
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, config.maxPlayers);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 0); // 训练模式不需要敌方玩家

        // 设置作弊模式
        if (config.enableCheats) {
            GameRules.SetCustomGameSetupAutoLaunchDelay(0);
            GameRules.EnableCustomGameSetupAutoLaunch(false);
            SendToServerConsole('sv_cheats 1');
        }

        // 应用自定义规则
        if (config.customRules) {
            this.applyCustomRules(config.customRules);
        }

        // 特定模式的设置
        switch (config.mode) {
            case GameMode.TRAINING:
                this.setupTrainingMode();
                break;
            case GameMode.AUTOCHESS:
                this.setupAutoChessMode();
                break;
            case GameMode.NORMAL:
                this.setupNormalMode();
                break;
        }
    }

    /**
     * 设置训练模式
     */
    private setupTrainingMode(): void {
        // 禁用游戏结束条件
        // GameRules.SetCustomVictoryCondition(DOTA_VICTORY_CONDITION_NEVER); // API暂不可用
        
        // 设置无限时间
        GameRules.SetTimeOfDay(0.25); // 白天
        // GameRules.SetCustomGameDifficulty(DOTA_GameMode.DOTA_GAMEMODE_PRACTICE); // API暂不可用
        
        // 启用练功房特性
        GameRules.SetHeroSelectionTime(10); // 快速选英雄
        GameRules.SetStrategyTime(0); // 跳过策略时间
        GameRules.SetShowcaseTime(0); // 跳过展示时间
        
        print('[GameModeManager] Training mode configured');
    }

    /**
     * 设置自走棋模式
     */
    private setupAutoChessMode(): void {
        // 自走棋游戏设置
        // GameRules.SetCustomVictoryCondition(DOTA_VICTORY_CONDITION_NEVER); // API暂不可用 // 不通过古迹胜利
        GameRules.SetHeroSelectionTime(0); // 跳过英雄选择
        GameRules.SetStrategyTime(0); // 跳过策略时间
        GameRules.SetShowcaseTime(0); // 跳过展示时间
        GameRules.SetPreGameTime(5); // 简短的准备时间
        
        // 设置自走棋特有的规则
        // GameRules.SetCustomGameDifficulty(DOTA_GameMode.DOTA_GAMEMODE_RD); // 禁用自动技能 - API暂不可用
        GameRules.SetUseUniversalShopMode(true); // 启用全球商店
        
        // 禁用一些DOTA2的标准功能
        GameRules.SetHeroRespawnEnabled(false); // 禁用英雄复活
        GameRules.SetUseBaseGoldBountyOnHeroes(false); // 禁用标准金币奖励
        GameRules.SetTreeRegrowTime(0); // 禁用树木重生
        
        // 设置固定白天
        GameRules.SetTimeOfDay(0.25);
        
        // 启用作弊模式并关闭战争迷雾 (battlemap专用)
        SendToServerConsole('sv_cheats 1');
        SendToServerConsole('dota_fog_of_war_disabled 1');
        
        print('[GameModeManager] AutoChess mode configured with fog disabled');
    }

    /**
     * 设置正常模式
     */
    private setupNormalMode(): void {
        // 标准游戏设置
        // GameRules.SetCustomVictoryCondition(DOTA_VICTORY_CONDITION_ANCIENT_DESTROYED); // API暂不可用
        GameRules.SetHeroSelectionTime(30);
        GameRules.SetStrategyTime(30);
        GameRules.SetShowcaseTime(5);
        
        print('[GameModeManager] Normal mode configured');
    }

    /**
     * 设置基础游戏规则
     */
    private setupBaseGameRules(): void {
        GameRules.SetCustomGameSetupAutoLaunchDelay(10);
        GameRules.SetCustomGameSetupTimeout(60);
        GameRules.SetHeroSelectionTime(30);
        GameRules.SetHeroSelectPenaltyTime(10);
        GameRules.SetPreGameTime(15);
        GameRules.SetTreeRegrowTime(300);
        GameRules.SetCustomGameSetupRemainingTime(10);
        GameRules.SetUseUniversalShopMode(false);
        
        // 金钱和经验设置
        GameRules.SetGoldPerTick(2);
        GameRules.SetGoldTickTime(0.6);
        GameRules.SetRuneSpawnTime(120);
        
        print('[GameModeManager] Base game rules configured');
    }

    /**
     * 应用自定义规则
     */
    private applyCustomRules(rules: any): void {
        for (const [key, value] of Object.entries(rules)) {
            try {
                // 根据规则类型应用设置
                switch (key) {
                    case 'startingGold':
                        // 设置初始金钱将在玩家生成时处理
                        break;
                    case 'startingLevel':
                        // 设置初始等级将在英雄生成时处理
                        break;
                    case 'customSpeed':
                        GameRules.SetCustomGameDifficulty(value as number);
                        break;
                }
            } catch (error) {
                print(`[GameModeManager] Failed to apply custom rule ${key}: ${error}`);
            }
        }
    }

    /**
     * 模式切换事件
     */
    private onModeChanged(previousMode: GameMode, newMode: GameMode): void {
        // 触发自定义事件
        (CustomGameEventManager.Send_ServerToAllClients as any)('game_mode_changed', {
            previousMode,
            newMode,
            config: this.getModeConfig(newMode)
        });

        print("_____________________________________onModeChanged")
        // 如果有错误追踪系统，记录模式切换
        if (GameRules.ErrorTracker) {
            GameRules.ErrorTracker.reportCustomError(`Game mode switched: ${previousMode} → ${newMode}`, {
                module: 'GameModeManager',
                function: 'onModeChanged',
                customData: { previousMode, newMode }
            });
        }
    }

    /**
     * 同步状态到网络表
     */
    private syncToNetTable(): void {
        if (GameRules.XNetTable) {
            const data = {
                mode: this.settings.currentMode,
                config: this.getModeConfig(),
                initialized: this.settings.initialized,
                timestamp: getTimestamp()
            };
            
            GameRules.XNetTable.SetTableValue('game_mode', 'current', data);
            print(`[GameModeManager] Synced to NetTable: mode=${this.settings.currentMode}, initialized=${this.settings.initialized}`);
        } else {
            print(`[GameModeManager] Warning: XNetTable not available for sync`);
        }
    }

    /**
     * 获取默认模式配置
     */
    private getDefaultModeConfigs(): Record<GameMode, GameModeConfig> {
        return {
            [GameMode.NORMAL]: {
                mode: GameMode.NORMAL,
                displayName: '正常模式',
                description: '标准的DOTA2游戏模式',
                maxPlayers: 10,
                allowBots: true,
                enableCheats: false
            },
            [GameMode.TRAINING]: {
                mode: GameMode.TRAINING,
                displayName: '练功房模式',
                description: '用于测试和训练的模式，支持怪物生成和强度测试',
                maxPlayers: 1,
                allowBots: true,
                enableCheats: true,
                customRules: {
                    startingGold: 10000,
                    startingLevel: 1,
                    infiniteTime: true,
                    fastRespawn: true
                }
            },
            [GameMode.AUTOCHESS]: {
                mode: GameMode.AUTOCHESS,
                displayName: '自走棋模式',
                description: '8人自走棋对战模式，策略布阵，自动战斗',
                maxPlayers: 8,
                allowBots: false,
                enableCheats: false,
                customRules: {
                    roundBasedGame: true,
                    autoTurnLength: 30,
                    battleTurnLength: 45,
                    maxRounds: 50,
                    chessPoolEnabled: true,
                    economySystem: true
                }
            },
            [GameMode.CUSTOM]: {
                mode: GameMode.CUSTOM,
                displayName: '自定义模式',
                description: '可自定义规则的游戏模式',
                maxPlayers: 10,
                allowBots: true,
                enableCheats: true
            }
        };
    }

    /**
     * 获取游戏模式状态
     */
    public getStatus(): any {
        return {
            currentMode: this.settings.currentMode,
            config: this.getModeConfig(),
            initialized: this.settings.initialized,
            availableModes: Object.keys(this.settings.modeConfigs),
            isCheatsEnabled: this.isCheatsEnabled(),
            isTrainingMode: this.isTrainingMode()
        };
    }
}