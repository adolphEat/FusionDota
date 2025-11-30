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

// 注意：类型定义在 shared/global-types.d.ts 中，这里使用类型断言来避免冲突
// 实际的类型会在运行时正确工作

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
            // 使用类型断言避免类型冲突，运行时类型是正确的
            (GameRules as any).XNetTable = new XNetTable();
            
            // 初始化错误追踪系统（最优先级）
            (GameRules as any).ErrorTracker = ErrorTracker.getInstance();
            initializeGlobalErrorHandling();
            
            // 初始化性能监控系统
            (GameRules as any).PerformanceMonitor = PerformanceMonitor.getInstance();
            
            // 设置一些基础的性能阈值
            (GameRules as any).PerformanceMonitor.setThreshold('module_activation', 1000); // 1秒
            (GameRules as any).PerformanceMonitor.setThreshold('config_loading', 500); // 0.5秒
            (GameRules as any).PerformanceMonitor.setThreshold('debug_command', 100); // 0.1秒
            
            // 初始化游戏模式管理器（优先级高）
            (GameRules as any).GameModeManager = GameModeManager.getInstance();
  
            // 初始化训练模式
            print('[Modules] ========== 准备初始化 TrainingMode ==========');
            (GameRules as any).TrainingMode = TrainingMode.getInstance();
            print('[Modules] ========== TrainingMode 初始化完成 ==========');
            
            // 初始化自走棋模式
            print('[Modules] ========== 准备初始化 AutoChessMode ==========');
            (GameRules as any).AutoChessMode = AutoChessMode.getInstance();
            print('[Modules] ========== AutoChessMode 初始化完成 ==========');
            
            // 初始化自定义UI处理器
            (GameRules as any).CustomUIHandler = CustomUIHandler.getInstance();
            
            // 初始化背包系统
            (GameRules as any).InventorySystem = InventorySystem.getInstance();
            
            // 初始化合成系统
            (GameRules as any).CraftingSystem = CraftingSystem.getInstance();
            
            // 延迟集成UI到游戏模式系统（确保所有模块都已初始化）
            Timers.CreateTimer(2.0, () => {
                (GameRules as any).CustomUIHandler.integrateWithGameMode();
                return undefined;
            });
            
            
            // 更新系统状态到网络表
            (GameRules as any).XNetTable.SetTableValue('debug_info', 'system_status', {
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
            if ((GameRules as any).ErrorTracker) {
                (GameRules as any).ErrorTracker.trackError(error as Error, {
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
