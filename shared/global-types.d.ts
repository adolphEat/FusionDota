/**
 * 全局类型声明文件
 * Global Type Declarations
 * 
 * 扩展 GameRules 接口和声明全局对象
 */

// 扩展 GameRules 接口
declare namespace CDOTAGameRules {
    // 游戏模式管理器
    interface GameModeManager {
        getCurrentMode(): string;
        switchMode(mode: string, force?: boolean): boolean;
        isTrainingMode(): boolean;
        isAutoChessMode(): boolean;
        getStatus(): any;
    }
    
    // 训练模式
    interface TrainingMode {
        getStatus(): any;
        activate(): void;
        deactivate(): void;
        enableAutoRegeneration(): void;
        disableAutoRegeneration(): void;
        toggleAutoRegeneration(): void;
        setCooldownSeconds(seconds: number): void;
        enableCustomCooldowns(): void;
        disableCustomCooldowns(): void;
        toggleCustomCooldowns(): void;
        startTestScenario(scenarioId: string): boolean;
        stopCurrentTest(): void;
        startAutoSpawn(config?: any): boolean;
        stopAutoSpawn(): void;
        startAutoDummy(config?: any): boolean;
        stopAutoDummy(): void;
        spawnNeutrals(): void;
        spawnCreeps(): void;
        createHero(heroName: string, position?: Vector): CDOTA_BaseNPC_Hero | null;
    }
    
    // 自走棋模式
    interface AutoChessMode {
        getChessPiece(pieceId: string): any | null;
        getAllChessPieces(): any[];
        handleWaveContinue(playerId: PlayerID): void;
        handleWaveRewardClaim(playerId: PlayerID): void;
        handleWaveStageSelection(playerId: PlayerID, stageId: string): void;
        sendStageUnlockUpdate(): void;
        activate(): void;
        deactivate(): void;
        startGame(): void;
        getStatus(): any;
        buyChessPiece(playerId: PlayerID, pieceId: string): boolean;
        // 单机模式简化 API
        getPlayerState(playerId?: PlayerID): any | undefined;
        getCurrentPhase(): string;
        getCurrentRound(): number;
        getBenchPieces(): any[];
        getBoardPieces(): any[];
    }
    
    // 错误追踪器
    interface ErrorTracker {
        trackError(error: Error, context?: any): string;
        reportCustomError(message: string, context?: any): string;
        trackPerformanceIssue(operation: string, duration: number, threshold: number, context?: any): void;
        getErrorStats(): any;
        clearErrorCache(): void;
    }
    
    // 性能监控器
    interface PerformanceMonitor {
        startTimer(operation: string, context?: any): string;
        endTimer(timerId: string): number;
        setThreshold(operation: string, thresholdMs: number): void;
        getStats(operation?: string): any;
        getSummary(): any;
        clearMetrics(): void;
        recordDuration(operation: string, duration: number, context?: any): void;
    }
    
    // 自定义UI处理器
    interface CustomUIHandler {
        handleDebugUICommand(command: string, playerId?: PlayerID): void;
        updateClientUI(playerId?: PlayerID): void;
        integrateWithGameMode(): void;
    }
    
    // 扩展网络表
    interface XNetTable {
        SetTableValue(tableName: string, key: string, value: any): void;
        GetTableValue(tableName: string, key: string): any;
    }
}

// 扩展 GameRules 实例
interface CDOTAGameRules {
    GameModeManager?: CDOTAGameRules.GameModeManager;
    TrainingMode?: CDOTAGameRules.TrainingMode;
    AutoChessMode?: CDOTAGameRules.AutoChessMode;
    ErrorTracker?: CDOTAGameRules.ErrorTracker;
    PerformanceMonitor?: CDOTAGameRules.PerformanceMonitor;
    CustomUIHandler?: CDOTAGameRules.CustomUIHandler;
    XNetTable?: CDOTAGameRules.XNetTable;
}

// Timers 全局对象
// 注意：完整的 Timers 接口定义在 game/scripts/src/utils/timers.d.ts 中
// 这里不重复声明，避免类型冲突
// 如果需要全局访问，应该通过 timers.d.ts 中的 declare global 块


