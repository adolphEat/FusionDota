import { Debug } from './Debug';
import { GameConfig } from './GameConfig';
import { XNetTable } from '../utils/xnet-table';
import { ErrorTracker, initializeGlobalErrorHandling } from '../utils/error-tracker';
import { PerformanceMonitor } from '../utils/performance-monitor';
import { GameModeManager } from './GameModeManager';
import { TrainingMode } from './TrainingMode';
import { AutoChessMode } from './AutoChessMode';
import { CustomUIHandler } from './CustomUIHandler';
import { UnitFactory } from './UnitFactory';
import { UnitConfigManager } from './UnitConfigManager';
// import { BattleManager } from './battle-system/Core/BattleManager';
// import { BattleConfigLoader } from './battle-system/Data/ConfigLoader';
// import { EntityManager } from './battle-system/Core/EntityManager';
import { InventorySystem } from './inventory/InventorySystem';
import { CraftingSystem } from './inventory/CraftingSystem';

declare global {
    interface CDOTAGameRules {
        // 声明所有的GameRules模块，这个主要是为了方便其他地方的引用（保证单例模式）
        XNetTable: XNetTable;
        ErrorTracker: ErrorTracker;
        PerformanceMonitor: PerformanceMonitor;
        GameModeManager: GameModeManager;
        TrainingMode: TrainingMode;
        AutoChessMode: AutoChessMode;
        CustomUIHandler: CustomUIHandler;
        InventorySystem: InventorySystem;
        CraftingSystem: CraftingSystem;
    }
}

/**
 * 这个方法会在game_mode实体生成之后调用，且仅调用一次
 * 因此在这里作为单例模式使用
 **/
export function ActivateModules() {
    print('+++++++++++++++++++++++++++++++++++++++++');
    print('[Modules] ActivateModules() function called');
    print(`[Modules] GameRules exists: ${GameRules ? 'YES' : 'NO'}`);
    print(`[Modules] XNetTable is null: ${GameRules.XNetTable == null}`);
    print('+++++++++++++++++++++++++++++++++++++++++');
    
    if (GameRules.XNetTable == null) {
        print('[Modules] Starting module initialization...');
        try {
            print('[Modules] About to create GameConfig...');
            new GameConfig();

            // 初始化所有的GameRules模块
            GameRules.XNetTable = new XNetTable();
            
            // 初始化错误追踪系统（最优先级）
            GameRules.ErrorTracker = ErrorTracker.getInstance();
            initializeGlobalErrorHandling();
            
            // 初始化性能监控系统
            GameRules.PerformanceMonitor = PerformanceMonitor.getInstance();
            
            // 设置一些基础的性能阈值
            GameRules.PerformanceMonitor.setThreshold('module_activation', 1000); // 1秒
            GameRules.PerformanceMonitor.setThreshold('config_loading', 500); // 0.5秒
            GameRules.PerformanceMonitor.setThreshold('debug_command', 100); // 0.1秒
            
            // 初始化游戏模式管理器（优先级高）
            GameRules.GameModeManager = GameModeManager.getInstance();
  
            // 初始化训练模式
            print('[Modules] ========== 准备初始化 TrainingMode ==========');
            GameRules.TrainingMode = TrainingMode.getInstance();
            print('[Modules] ========== TrainingMode 初始化完成 ==========');
            
            // 初始化自走棋模式
            print('[Modules] ========== 准备初始化 AutoChessMode ==========');
            GameRules.AutoChessMode = AutoChessMode.getInstance();
            print('[Modules] ========== AutoChessMode 初始化完成 ==========');
            
            // 初始化自定义UI处理器
            GameRules.CustomUIHandler = CustomUIHandler.getInstance();
            
            // 初始化背包系统
            GameRules.InventorySystem = InventorySystem.getInstance();
            
            // 初始化合成系统
            GameRules.CraftingSystem = CraftingSystem.getInstance();
            
            // 延迟集成UI到游戏模式系统（确保所有模块都已初始化）
            Timers.CreateTimer(2.0, () => {
                GameRules.CustomUIHandler.integrateWithGameMode();
                return undefined;
            });
            
            
            // 更新系统状态到网络表
            GameRules.XNetTable.SetTableValue('debug_info', 'system_status', {
                errorTracking: true,
                performanceMonitoring: true,
                debugMode: IsInToolsMode(),
                timestamp: GameRules.GetGameTime()
            });
            
           // 如果某个模块不需要在其他地方使用，那么直接在这里使用即可
            print('[Modules] GameConfig created successfully');
            
            // 初始化调试模块（已增强错误追踪功能）
            print('[Modules] About to create Debug module...');
            new Debug();
            print('[Modules] Debug module created successfully');
            
            print('[Modules] All modules activated successfully');
            
                 } catch (error) {
             // 如果错误追踪还未初始化，直接打印错误
             if (GameRules.ErrorTracker) {
                 GameRules.ErrorTracker.trackError(error as Error, {
                     module: 'ActivateModules',
                     function: 'initialization'
                 });
             } else {
                 print(`[FATAL] Failed to activate modules: ${error}`);
             }
             throw error;
         }
    } else {
        print('[Modules] XNetTable already exists, skipping initialization');
        print(`[Modules] Debug instance exists: ${(GameRules as any).DebugInstance ? 'YES' : 'NO'}`);
    }
    print('[Modules] ActivateModules() function finished');
}
