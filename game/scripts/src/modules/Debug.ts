import { reloadable } from '../utils/tstl-utils';
import type { EasingFunctionName } from '../utils/tween';
import { tween } from '../utils/tween';

type DebugCallbackFunction = (hero: CDOTA_BaseNPC_Hero, ...args: string[]) => void;

/** 所有的测试指令的回调 */
const DebugCallbacks: Record<string, { desc: string; func: DebugCallbackFunction }> = {
    ['-show_custom_ui']: {
        desc: '显示自定义UI面板',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            debug?.debugOutput(hero, 'Showing custom UI panel');
            
            // 使用UI处理器显示面板
            GameRules.CustomUIHandler?.handleDebugUICommand('show_custom');
        },
    },
    ['-show_simple_ui']: {
        desc: '显示简单按钮UI',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            debug?.debugOutput(hero, 'Showing simple button UI');
            
            GameRules.CustomUIHandler?.handleDebugUICommand('show_simple');
        },
    },
    ['-hide_all_ui']: {
        desc: '隐藏所有自定义UI',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            debug?.debugOutput(hero, 'Hiding all custom UI');
            
            GameRules.CustomUIHandler?.handleDebugUICommand('hide_all');
        },
    },
    ['-ui_test']: {
        desc: '测试UI系统集成',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            debug?.debugOutput(hero, '=== UI System Test ===');
            
            // 检查UI处理器状态
            if (GameRules.CustomUIHandler) {
                debug?.debugOutput(hero, 'CustomUIHandler: ✓ Initialized');
            } else {
                debug?.debugOutput(hero, 'CustomUIHandler: ✗ Not found');
            }
            
            // 检查游戏模式
            const currentMode = GameRules.GameModeManager?.getCurrentMode() || 'unknown';
            debug?.debugOutput(hero, `Current Game Mode: ${currentMode}`);
            
            // 检查工具模式
            const isToolsMode = IsInToolsMode();
            debug?.debugOutput(hero, `Tools Mode: ${isToolsMode}`);
            
            // 发送测试事件
            GameRules.CustomUIHandler?.updateClientUI();
            debug?.debugOutput(hero, 'UI data update sent to clients');
        },
    },
    ['-help']: {
        desc: '显示所有的测试指令',
        func: () => {
            print('所有的测试指令:');
            for (const cmd in DebugCallbacks) {
                const desc = DebugCallbacks[cmd].desc;
                print(`${cmd}: ${desc}`);
            }
        },
    },
    ['-debug_status']: {
        desc: '显示调试模式状态和系统信息',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            debug?.debugOutput(hero, `=== Debug Status ===`);
            debug?.debugOutput(hero, `Debug Enabled: ${debug?.DebugEnabled || false}`);
            debug?.debugOutput(hero, `Console Output: ${debug?.outputToConsole || false}`);
            debug?.debugOutput(hero, `Tools Mode: ${IsInToolsMode()}`);
            debug?.debugOutput(hero, `Player Count: ${PlayerResource.GetPlayerCount()}`);
            debug?.debugOutput(hero, `Game Mode: ${GameRules.GameModeManager?.getCurrentMode() || 'unknown'}`);
            debug?.debugOutput(hero, `Training Mode: ${GameRules.TrainingMode ? 'initialized' : 'not initialized'}`);
            debug?.debugOutput(hero, `Hero Valid: ${hero && !hero.IsNull()}`);
            if (hero && !hero.IsNull()) {
                debug?.debugOutput(hero, `Hero Name: ${hero.GetUnitName()}`);
            }
        },
    },
    ['-console_output']: {
        desc: '切换控制台输出模式 console_output [on|off]',
        func: (hero, ...args: string[]) => {
            const debug = (GameRules as any).DebugInstance || null;
            if (!debug) {
                if (hero && !hero.IsNull()) {
                    Say(hero, 'Debug instance not found', true);
                }
                return;
            }
            
            const action = args[0];
            if (action === 'on') {
                debug.outputToConsole = true;
                debug.debugOutput(hero, 'Console output enabled');
            } else if (action === 'off') {
                debug.outputToConsole = false;
                Say(hero, 'Console output disabled', true); // 只在聊天中显示
            } else {
                // 切换模式
                debug.outputToConsole = !debug.outputToConsole;
                debug.debugOutput(hero, `Console output ${debug.outputToConsole ? 'enabled' : 'disabled'}`);
            }
        },
    },
    ['-s']: {
        desc: '重载脚本',
        func: () => {
            SendToConsole('script_reload');
            print('-r 命令script_reload!重载脚本!');
        },
    },
    ['-r']: {
        desc: '重启游戏',
        func: () => {
            SendToConsole('restart'); // 重启游戏
            print('-r 命令restart重启游戏!');
        },
    },
    ['get_key_v3']: {
        desc: '获取v3版本的key',
        func: (hero, ...args: string[]) => {
            const version = args[0];
            const key = GetDedicatedServerKeyV3(version);
            const debug = (GameRules as any).DebugInstance || null;
            debug?.debugOutput(hero, `${version}: ${key}`);
        },
    },
    ['get_key_v2']: {
        desc: '获取v2版本的key， get_key_v2 version',
        func: (hero, ...args: string[]) => {
            const version = args[0];
            const key = GetDedicatedServerKeyV2(version);
            const debug = (GameRules as any).DebugInstance || null;
            debug?.debugOutput(hero, `${version}: ${key}`);
        },
    },
    ['-tween']: {
        desc: '测试Tween',
        func: (hero, ...args: string[]) => {
            FindClearSpaceForUnit(hero, hero.GetAbsOrigin(), true);
            const source = { scale: 1 };
            const target = { scale: 3 };
            const duration = 0.3;
            const funcName = args[0];
            const myTween = tween(duration, source, target, funcName as EasingFunctionName);
            let now = GameRules.GetGameTime();
            Timers.CreateTimer(() => {
                const dt = GameRules.GetGameTime() - now;
                now = GameRules.GetGameTime();
                const finished = myTween.update(dt);
                if (finished) {
                    return null;
                } else {
                    print(source.scale);
                    hero.SetModelScale(source.scale);
                    return 0.03;
                }
            });
        },
    },
    ['-error_stats']: {
        desc: '显示错误统计信息',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            if (GameRules.ErrorTracker) {
                const stats = GameRules.ErrorTracker.getErrorStats();
                debug?.debugOutput(hero, `Error Stats: Total=${stats.totalErrors}, Recent=${stats.recentErrors}, Cache=${stats.cacheSize}, Queue=${stats.queueSize}`);
            } else {
                debug?.debugOutput(hero, 'Error tracker not initialized');
            }
        },
    },
    ['-clear_errors']: {
        desc: '清除错误缓存',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            if (GameRules.ErrorTracker) {
                GameRules.ErrorTracker.clearErrorCache();
                debug?.debugOutput(hero, 'Error cache cleared');
            } else {
                debug?.debugOutput(hero, 'Error tracker not initialized');
            }
        },
    },
    ['-server']: {
        desc: '显示/隐藏服务器选择界面 -server [show|hide]',
        func: (hero: CDOTA_BaseNPC_Hero, ...args: string[]) => {
            const debug = (GameRules as any).DebugInstance || null;
            const action = args[0] || 'show';
            
            // 通过网络表通知客户端
            const playerId = hero.GetPlayerID();
            
            if (action === 'show') {
                CustomNetTables.SetTableValue('server_selection', playerId.toString(), { show: true });
                debug?.debugOutput(hero, '简单服务器选择器已显示');
                Say(hero, '假服务器选择界面已显示', false);
            } else if (action === 'hide') {
                CustomNetTables.SetTableValue('server_selection', playerId.toString(), { show: false });
                debug?.debugOutput(hero, '简单服务器选择器已隐藏');
                Say(hero, '假服务器选择界面已隐藏', false);
            } else {
                debug?.debugOutput(hero, '用法: -server [show|hide]');
                Say(hero, '用法: -server show 或 -server hide', true);
                return;
            }
        },
    },
    ['-fake_connect']: {
        desc: '模拟假连接到指定服务器 -fake_connect [server_name]',
        func: (hero: CDOTA_BaseNPC_Hero, ...args: string[]) => {
            const debug = (GameRules as any).DebugInstance || null;
            const serverName = args[0] || '默认服务器';
            
            debug?.debugOutput(hero, `模拟连接到: ${serverName}`);
            Say(hero, `假装连接到服务器: ${serverName}`, false);
            
            // 模拟连接延迟
            Timers.CreateTimer(1, () => {
                Say(hero, `连接成功！欢迎来到 ${serverName}`, false);
                return undefined;
            });
        },
    },
    ['-test_error']: {
        desc: '测试错误追踪 test_error [message]',
        func: (hero, ...args: string[]) => {
            const debug = (GameRules as any).DebugInstance || null;
            const message = args.join(' ') || 'Test error from debug command';
            if (GameRules.ErrorTracker) {
                const errorHash = GameRules.ErrorTracker.reportCustomError(message, {
                    module: 'Debug',
                    function: 'test_error',
                    playerId: hero.GetPlayerOwnerID(),
                    customData: { testMode: true }
                });
                debug?.debugOutput(hero, `Test error reported with hash: ${errorHash}`);
            } else {
                debug?.debugOutput(hero, 'Error tracker not initialized');
            }
        },
    },
    ['-system_info']: {
        desc: '显示系统信息',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            const info = {
                gameTime: GameRules.GetGameTime(),
                isToolsMode: IsInToolsMode(),
                playerCount: PlayerResource.GetPlayerCount(),
                errorTracking: GameRules.ErrorTracker ? 'enabled' : 'disabled',
                xNetTable: GameRules.XNetTable ? 'enabled' : 'disabled'
            };
            debug?.debugOutput(hero, `System Info: ${JSON.stringify(info)}`);
        },
    },
    ['-trigger_crash']: {
        desc: '触发一个崩溃测试（仅工具模式）',
        func: (hero) => {
            const debug = (GameRules as any).DebugInstance || null;
            if (!IsInToolsMode()) {
                debug?.debugOutput(hero, 'This command only works in tools mode');
                return;
            }
            
            try {
                // 故意触发错误
                const invalidObject: any = null;
                invalidObject.someMethod();
            } catch (error) {
                if (GameRules.ErrorTracker) {
                    GameRules.ErrorTracker.trackError(error as Error, {
                        module: 'Debug',
                        function: 'trigger_crash',
                        playerId: hero.GetPlayerOwnerID(),
                        customData: { intentional: true }
                    });
                }
                debug?.debugOutput(hero, `Crash test completed, error tracked`);
            }
        },
    },
    ['-perf_stats']: {
        desc: '显示性能统计信息 perf_stats [operation]',
        func: (hero, ...args: string[]) => {
            if (GameRules.PerformanceMonitor) {
                const operation = args[0];
                if (operation) {
                    const stats = GameRules.PerformanceMonitor.getStats(operation);
                    Say(hero, `Performance for ${operation}: ${JSON.stringify(stats)}`, true);
                } else {
                    const summary = GameRules.PerformanceMonitor.getSummary();
                    Say(hero, `Performance Summary: ${JSON.stringify(summary)}`, true);
                }
            } else {
                Say(hero, 'Performance monitor not initialized', true);
            }
        },
    },
    ['-perf_clear']: {
        desc: '清除性能指标缓存',
        func: (hero) => {
            if (GameRules.PerformanceMonitor) {
                GameRules.PerformanceMonitor.clearMetrics();
                Say(hero, 'Performance metrics cleared', true);
            } else {
                Say(hero, 'Performance monitor not initialized', true);
            }
        },
    },
    ['-perf_test']: {
        desc: '执行性能测试 perf_test [duration_ms]',
        func: (hero, ...args: string[]) => {
            const duration = parseInt(args[0]) || 100;
            
            if (GameRules.PerformanceMonitor) {
                const timerId = GameRules.PerformanceMonitor.startTimer('debug_performance_test');
                
                // 模拟一些计算密集的操作
                const startTime = Date.now();
                while (Date.now() - startTime < duration) {
                    // 忙等待
                    Math.random();
                }
                
                const actualDuration = GameRules.PerformanceMonitor.endTimer(timerId);
                Say(hero, `Performance test completed: ${actualDuration.toFixed(2)}ms (target: ${duration}ms)`, true);
            } else {
                Say(hero, 'Performance monitor not initialized', true);
            }
        },
    },
    ['-set_threshold']: {
        desc: '设置性能阈值 set_threshold <operation> <threshold_ms>',
        func: (hero, ...args: string[]) => {
            const operation = args[0];
            const threshold = parseFloat(args[1]);
            
            if (!operation || isNaN(threshold)) {
                Say(hero, 'Usage: set_threshold <operation> <threshold_ms>', true);
                return;
            }
            
            if (GameRules.PerformanceMonitor) {
                GameRules.PerformanceMonitor.setThreshold(operation, threshold);
                Say(hero, `Threshold set for ${operation}: ${threshold}ms`, true);
            } else {
                Say(hero, 'Performance monitor not initialized', true);
            }
        },
    },
    ['-mode']: {
        desc: '显示或切换游戏模式 mode [new_mode]',
        func: (hero, ...args: string[]) => {
            if (!GameRules.GameModeManager) {
                Say(hero, 'Game mode manager not initialized', true);
                return;
            }

            const newMode = args[0];
            if (newMode) {
                const success = GameRules.GameModeManager.switchMode(newMode as any, true);
                if (success) {
                    Say(hero, `Game mode switched to: ${newMode}`, true);
                } else {
                    Say(hero, `Failed to switch to mode: ${newMode}`, true);
                }
            } else {
                const status = GameRules.GameModeManager.getStatus();
                Say(hero, `Current mode: ${status.currentMode}`, true);
                Say(hero, `Available modes: ${status.availableModes.join(', ')}`, true);
            }
        },
    },
    ['-training']: {
        desc: '训练模式控制 training <start|stop|status|settings>',
        func: (hero, ...args: string[]) => {
            const debug = (GameRules as any).DebugInstance || null;
            if (!GameRules.TrainingMode) {
                debug?.debugOutput(hero, 'Training mode not initialized');
                return;
            }

            const action = args[0];
            switch (action) {
                case 'start':
                    GameRules.TrainingMode.activate();
                    debug?.debugOutput(hero, 'Training mode activated');
                    break;
                case 'stop':
                    GameRules.TrainingMode.deactivate();
                    debug?.debugOutput(hero, 'Training mode deactivated');
                    break;
                case 'status':
                    const status = GameRules.TrainingMode.getStatus();
                    debug?.debugOutput(hero, `Training mode: ${status.isActive ? 'Active' : 'Inactive'}`);
                    debug?.debugOutput(hero, `Spawned units: ${status.spawnedUnitsCount}`);
                    if (status.activeScenario) {
                        debug?.debugOutput(hero, `Active scenario: ${status.activeScenario.name}`);
                        debug?.debugOutput(hero, `Test duration: ${status.testDuration.toFixed(1)}s`);
                    }
                    break;
                case 'settings':
                    const settings = GameRules.TrainingMode.getStatus().settings;
                    debug?.debugOutput(hero, `Settings: ${JSON.stringify(settings)}`);
                    break;
                default:
                    debug?.debugOutput(hero, 'Usage: training <start|stop|status|settings>');
            }
        },
    },
    ['-spawn']: {
        desc: '生成测试怪物 spawn <unit_name> [count] [level]',
        func: (hero, ...args: string[]) => {
            const debug = (GameRules as any).DebugInstance || null;
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                debug?.debugOutput(hero, 'This command only works in training mode');
                return;
            }

            const unitName = args[0];
            const count = parseInt(args[1]) || 1;
            const level = parseInt(args[2]) || 1;

            if (!unitName) {
                debug?.debugOutput(hero, 'Usage: spawn <unit_name> [count] [level]');
                debug?.debugOutput(hero, 'Examples: spawn npc_dota_neutral_kobold 3 5');
                return;
            }

            try {
                const heroPos = hero.GetAbsOrigin();
                let spawned = 0;

                for (let i = 0; i < count; i++) {
                    const spawnPos = Vector(
                        heroPos.x + RandomFloat(-300, 300),
                        heroPos.y + RandomFloat(-300, 300),
                        heroPos.z
                    );

                    const unit = CreateUnitByName(unitName, spawnPos, true, null, null, DotaTeam.BADGUYS);
                    if (unit && !unit.IsNull()) {
                        // 设置等级
                        if (unit.IsHero()) {
                            for (let lvl = 1; lvl < level; lvl++) {
                                (unit as CDOTA_BaseNPC_Hero).HeroLevelUp(false);
                            }
                        }
                        spawned++;
                    }
                }

                debug?.debugOutput(hero, `Spawned ${spawned}/${count} units of type ${unitName} at level ${level}`);
            } catch (error) {
                debug?.debugOutput(hero, `Failed to spawn ${unitName}: ${error}`);
            }
        },
    },
    ['-scenario']: {
        desc: '测试场景控制 scenario <start|stop|list> [scenario_id]',
        func: (hero, ...args: string[]) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            const action = args[0];
            const scenarioId = args[1];

            switch (action) {
                case 'start':
                    if (!scenarioId) {
                        Say(hero, 'Usage: scenario start <scenario_id>', true);
                        return;
                    }
                    const success = GameRules.TrainingMode.startTestScenario(scenarioId);
                    if (success) {
                        Say(hero, `Started test scenario: ${scenarioId}`, true);
                    } else {
                        Say(hero, `Failed to start scenario: ${scenarioId}`, true);
                    }
                    break;
                case 'stop':
                    GameRules.TrainingMode.stopCurrentTest();
                    Say(hero, 'Stopped current test scenario', true);
                    break;
                case 'list':
                    Say(hero, 'Available scenarios:', true);
                    Say(hero, '- basic_combat: 基础战斗测试', true);
                    Say(hero, '- damage_test: 伤害测试', true);
                    break;
                default:
                    Say(hero, 'Usage: scenario <start|stop|list> [scenario_id]', true);
            }
        },
    },
    ['-clear']: {
        desc: '清理所有生成的单位',
        func: (hero) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            let cleared = 0;
            const allUnits = FindUnitsInRadius(
                DotaTeam.GOODGUYS,
                Vector(0, 0, 0),
                null,
                9999,
                UnitTargetTeam.ENEMY,
                UnitTargetType.ALL,
                UnitTargetFlags.NONE,
                0, // FindOrder.ANY_ORDER
                false
            );

            for (const unit of allUnits) {
                if (unit && !unit.IsNull() && !unit.IsRealHero()) {
                    unit.RemoveSelf();
                    cleared++;
                }
            }

            Say(hero, `Cleared ${cleared} units`, true);
        },
    },
    ['-auto_spawn']: {
        desc: '自动刷怪控制 auto_spawn <start|stop|status> [unit_type] [count] [level] [interval]',
        func: (hero, ...args: string[]) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const action = args[0];
            switch (action) {
                case 'start':
                    const unitType = args[1] || 'npc_dota_neutral_kobold';
                    const count = parseInt(args[2]) || 2;
                    const level = parseInt(args[3]) || 1;
                    const interval = parseInt(args[4]) || 10;
                    
                    const success = GameRules.TrainingMode.startAutoSpawn({
                        unitType,
                        count,
                        level,
                        interval
                    });
                    
                    if (success) {
                        Say(hero, `Auto spawn started: ${unitType} x${count} level ${level} every ${interval}s`, true);
                    } else {
                        Say(hero, 'Failed to start auto spawn', true);
                    }
                    break;
                    
                case 'stop':
                    GameRules.TrainingMode.stopAutoSpawn();
                    Say(hero, 'Auto spawn stopped', true);
                    break;
                    
                case 'status':
                    const status = GameRules.TrainingMode.getStatus();
                    Say(hero, `Auto spawn: ${status.autoSpawn.enabled ? 'Enabled' : 'Disabled'}`, true);
                    if (status.autoSpawn.enabled) {
                        Say(hero, `Active units: ${status.autoSpawn.unitsCount}`, true);
                        Say(hero, `Unit type: ${status.autoSpawn.config.unitType}`, true);
                        Say(hero, `Interval: ${status.autoSpawn.config.interval}s`, true);
                    }
                    break;
                    
                default:
                    Say(hero, 'Usage: auto_spawn <start|stop|status> [unit_type] [count] [level] [interval]', true);
                    Say(hero, 'Example: auto_spawn start npc_dota_neutral_kobold 3 5 15', true);
            }
        },
    },
    ['-auto_dummy']: {
        desc: '自动木桩控制 auto_dummy <start|stop|status> [count] [health] [invulnerable]',
        func: (hero, ...args: string[]) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const action = args[0];
            switch (action) {
                case 'start':
                    const count = parseInt(args[1]) || 4;
                    const health = parseInt(args[2]) || 5000;
                    const invulnerable = args[3] === 'true' || args[3] === '1';
                    
                    const success = GameRules.TrainingMode.startAutoDummy({
                        count,
                        health,
                        invulnerable
                    });
                    
                    if (success) {
                        Say(hero, `Auto dummy started: ${count} dummies with ${health} HP`, true);
                        if (invulnerable) {
                            Say(hero, 'Dummies are invulnerable', true);
                        }
                    } else {
                        Say(hero, 'Failed to start auto dummy', true);
                    }
                    break;
                    
                case 'stop':
                    GameRules.TrainingMode.stopAutoDummy();
                    Say(hero, 'Auto dummy stopped', true);
                    break;
                    
                case 'status':
                    const status = GameRules.TrainingMode.getStatus();
                    Say(hero, `Auto dummy: ${status.autoDummy.enabled ? 'Enabled' : 'Disabled'}`, true);
                    if (status.autoDummy.enabled) {
                        Say(hero, `Active dummies: ${status.autoDummy.dummiesCount}`, true);
                        Say(hero, `Health: ${status.autoDummy.config.health}`, true);
                        Say(hero, `Invulnerable: ${status.autoDummy.config.invulnerable}`, true);
                    }
                    break;
                    
                default:
                    Say(hero, 'Usage: auto_dummy <start|stop|status> [count] [health] [invulnerable]', true);
                    Say(hero, 'Example: auto_dummy start 6 10000 true', true);
            }
        },
    },
    ['-spawnneutrals']: {
        desc: '刷新所有中性野怪营地',
        func: (hero) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            if (GameRules.TrainingMode) {
                GameRules.TrainingMode.spawnNeutrals();
                Say(hero, 'Neutral camps spawned', true);
            } else {
                Say(hero, 'Training mode not initialized', true);
            }
        },
    },
    ['-spawncreeps']: {
        desc: '刷新三路小兵',
        func: (hero) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            if (GameRules.TrainingMode) {
                GameRules.TrainingMode.spawnCreeps();
                Say(hero, 'Lane creeps spawned', true);
            } else {
                Say(hero, 'Training mode not initialized', true);
            }
        },
    },
    ['-createhero']: {
        desc: '创建英雄 createhero <hero_name>',
        func: (hero, ...args: string[]) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const heroName = args[0];
            if (!heroName) {
                Say(hero, 'Usage: createhero <hero_name>', true);
                Say(hero, 'Example: createhero npc_dota_hero_pudge', true);
                return;
            }

            if (GameRules.TrainingMode) {
                const createdHero = GameRules.TrainingMode.createHero(heroName);
                if (createdHero) {
                    Say(hero, `Created hero: ${heroName}`, true);
                } else {
                    Say(hero, `Failed to create hero: ${heroName}`, true);
                }
            } else {
                Say(hero, 'Training mode not initialized', true);
            }
        },
    },
    ['-auto_regen']: {
        desc: '自动回血回蓝控制 auto_regen <on|off|toggle|status>',
        func: (hero, ...args: string[]) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const action = args[0];
            switch (action) {
                case 'on':
                    GameRules.TrainingMode.enableAutoRegeneration();
                    Say(hero, 'Auto regeneration enabled', true);
                    break;
                    
                case 'off':
                    GameRules.TrainingMode.disableAutoRegeneration();
                    Say(hero, 'Auto regeneration disabled', true);
                    break;
                    
                case 'toggle':
                    GameRules.TrainingMode.toggleAutoRegeneration();
                    const toggleStatus = GameRules.TrainingMode.getStatus();
                    Say(hero, `Auto regeneration: ${toggleStatus.autoRegeneration.enabled ? 'ON' : 'OFF'}`, true);
                    break;
                    
                case 'status':
                    const status = GameRules.TrainingMode.getStatus();
                    Say(hero, `Auto regeneration: ${status.autoRegeneration.enabled ? 'Enabled' : 'Disabled'}`, true);
                    Say(hero, `Active: ${status.autoRegeneration.active ? 'YES' : 'NO'}`, true);
                    break;
                    
                default:
                    Say(hero, 'Usage: auto_regen <on|off|toggle|status>', true);
                    Say(hero, 'Automatically restores hero HP and MP to full', true);
            }
        },
    },
    ['-fast_cd']: {
        desc: '快速技能CD控制 fast_cd <on|off|toggle|status> [seconds]',
        func: (hero, ...args: string[]) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const action = args[0];
            const seconds = parseFloat(args[1]);
            
            switch (action) {
                case 'on':
                    if (seconds && seconds > 0) {
                        GameRules.TrainingMode.setCooldownSeconds(seconds);
                    }
                    GameRules.TrainingMode.enableCustomCooldowns();
                    const onStatus = GameRules.TrainingMode.getStatus();
                    Say(hero, `Fast cooldowns enabled: ${onStatus.customCooldowns.seconds}s`, true);
                    break;
                    
                case 'off':
                    GameRules.TrainingMode.disableCustomCooldowns();
                    Say(hero, 'Fast cooldowns disabled', true);
                    break;
                    
                case 'toggle':
                    GameRules.TrainingMode.toggleCustomCooldowns();
                    const toggleStatus = GameRules.TrainingMode.getStatus();
                    Say(hero, `Fast cooldowns: ${toggleStatus.customCooldowns.enabled ? 'ON' : 'OFF'}`, true);
                    if (toggleStatus.customCooldowns.enabled) {
                        Say(hero, `Cooldown time: ${toggleStatus.customCooldowns.seconds}s`, true);
                    }
                    break;
                    
                case 'status':
                    const status = GameRules.TrainingMode.getStatus();
                    Say(hero, `Fast cooldowns: ${status.customCooldowns.enabled ? 'Enabled' : 'Disabled'}`, true);
                    Say(hero, `Active: ${status.customCooldowns.active ? 'YES' : 'NO'}`, true);
                    Say(hero, `Cooldown time: ${status.customCooldowns.seconds}s`, true);
                    break;
                    
                default:
                    Say(hero, 'Usage: fast_cd <on|off|toggle|status> [seconds]', true);
                    Say(hero, 'Example: fast_cd on 3  (sets all cooldowns to 3 seconds)', true);
                    Say(hero, 'Example: fast_cd toggle  (toggles fast cooldowns)', true);
            }
        },
    },
    ['-cd']: {
        desc: '快速设置CD时间 cd <seconds>',
        func: (hero, ...args: string[]) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const seconds = parseFloat(args[0]);
            if (!args[0] || isNaN(seconds) || seconds < 0.1) {
                const status = GameRules.TrainingMode.getStatus();
                Say(hero, `Current CD: ${status.customCooldowns.seconds}s (${status.customCooldowns.enabled ? 'ON' : 'OFF'})`, true);
                Say(hero, 'Usage: cd <seconds>  Example: cd 3', true);
                return;
            }

            GameRules.TrainingMode.setCooldownSeconds(seconds);
            GameRules.TrainingMode.enableCustomCooldowns();
            Say(hero, `Cooldown set to ${seconds}s`, true);
        },
    },
    ['-regen']: {
        desc: '切换自动回血回蓝',
        func: (hero) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            GameRules.TrainingMode.toggleAutoRegeneration();
            const status = GameRules.TrainingMode.getStatus();
            Say(hero, `Auto regeneration: ${status.autoRegeneration.enabled ? 'ON' : 'OFF'}`, true);
        },
    },
    ['-练功']: {
        desc: '一键开启练功模式',
        func: (hero) => {
            if (!GameRules.TrainingMode) {
                Say(hero, 'Training mode not initialized', true);
                return;
            }

            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            // 启用所有练功功能
            GameRules.TrainingMode.enableAutoRegeneration();
            GameRules.TrainingMode.setCooldownSeconds(3);
            GameRules.TrainingMode.enableCustomCooldowns();
            
            Say(hero, 'Practice mode activated!', true);
            Say(hero, '- Auto regeneration: ON', true);
            Say(hero, '- Fast cooldowns: ON (3s)', true);
            Say(hero, 'Ready for training!', true);
        },
    },
    ['-god']: {
        desc: '切换无敌模式',
        func: (hero) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            if (hero.HasModifier('modifier_invulnerable')) {
                hero.RemoveModifierByName('modifier_invulnerable');
                Say(hero, 'God mode disabled', true);
            } else {
                hero.AddNewModifier(hero, null, 'modifier_invulnerable', {});
                Say(hero, 'God mode enabled', true);
            }
        },
    },
    ['-refresh']: {
        desc: '刷新英雄状态（满血满蓝，重置CD）',
        func: (hero) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            hero.SetHealth(hero.GetMaxHealth());
            hero.SetMana(hero.GetMaxMana());
            
            // 重置所有技能CD
            for (let i = 0; i < 24; i++) {
                const ability = hero.GetAbilityByIndex(i);
                if (ability) {
                    ability.EndCooldown();
                    ability.RefreshCharges();
                }
            }

            // 重置所有物品CD
            for (let i = 0; i < 15; i++) {
                const item = hero.GetItemInSlot(i);
                if (item) {
                    item.EndCooldown();
                }
            }

            Say(hero, 'Hero refreshed', true);
        },
    },
    ['-lvlup']: {
        desc: '提升英雄等级 lvlup [levels]',
        func: (hero, ...args: string[]) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const levels = parseInt(args[0]) || 1;
            for (let i = 0; i < levels; i++) {
                hero.HeroLevelUp(true);
            }

            Say(hero, `Gained ${levels} levels (now level ${hero.GetLevel()})`, true);
        },
    },
    ['-gold']: {
        desc: '给予金币 gold [amount]',
        func: (hero, ...args: string[]) => {
            if (!GameRules.GameModeManager?.isTrainingMode()) {
                Say(hero, 'This command only works in training mode', true);
                return;
            }

            const amount = parseInt(args[0]) || 1000;
            const playerId = hero.GetPlayerOwnerID();
            
            if (PlayerResource.IsValidPlayer(playerId)) {
                PlayerResource.ModifyGold(playerId, amount, true, ModifyGoldReason.CHEAT_COMMAND);
                const debug = (GameRules as any).DebugInstance || null;
                debug?.debugOutput(hero, `Gained ${amount} gold`);
            }
        },
    },
    // 自走棋模式相关命令
    ['-autochess']: {
        desc: '自走棋模式控制 autochess <activate|deactivate|start|status>',
        func: (hero, ...args: string[]) => {
            const action = args[0] || 'status';
            const autoChess = GameRules.AutoChessMode;
            const playerId = hero.GetPlayerOwnerID();
            
            switch (action) {
                case 'activate':
                case 'start':
                    autoChess.activate();
                    Say(hero, '自走棋模式已激活', true);
                    break;
                case 'deactivate':
                case 'stop':
                    autoChess.deactivate();
                    Say(hero, '自走棋模式已停用', true);
                    break;
                case 'game':
                    if (args[1] === 'start') {
                        autoChess.startGame();
                        Say(hero, '自走棋游戏已开始', true);
                    } else {
                        Say(hero, '用法: -autochess game start', true);
                    }
                    break;
                case 'status':
                default:
                    const status = autoChess.getStatus();
                    Say(hero, `自走棋状态: ${status.isActive ? '激活' : '未激活'}, 游戏进行中: ${status.gameState.isGameActive ? '是' : '否'}, 回合: ${status.gameState.currentRound}`, true);
                    break;
            }
        },
    },
    ['-buy']: {
        desc: '购买棋子 buy <棋子ID>',
        func: (hero, ...args: string[]) => {
            const pieceId = args[0];
            if (!pieceId) {
                Say(hero, '用法: -buy <棋子ID>，例如: -buy anti_mage', true);
                return;
            }
            
            if (!GameRules.GameModeManager?.isAutoChessMode()) {
                Say(hero, 'This command only works in autochess mode', true);
                return;
            }
            
            const autoChess = GameRules.AutoChessMode;
            const playerId = hero.GetPlayerOwnerID();
            const success = autoChess.buyChessPiece(playerId, pieceId);
            
            if (success) {
                Say(hero, `成功购买棋子: ${pieceId}`, true);
            } else {
                Say(hero, `购买失败: ${pieceId} (金币不足/库存不足/备战席已满)`, true);
            }
        },
    },
    ['-shop']: {
        desc: '商店操作 shop <refresh|show>',
        func: (hero, ...args: string[]) => {
            const action = args[0] || 'show';
            
            if (!GameRules.GameModeManager?.isAutoChessMode()) {
                Say(hero, 'This command only works in autochess mode', true);
                return;
            }
            
            switch (action) {
                case 'refresh':
                    // TODO: 实现商店刷新功能
                    Say(hero, '商店已刷新', true);
                    break;
                case 'show':
                default:
                    Say(hero, '请查看游戏界面中的商店信息', true);
                    break;
            }
        },
    },
    ['-chess_info']: {
        desc: '查看棋子信息 chess_info [棋子ID]',
        func: (hero, ...args: string[]) => {
            const pieceId = args[0];
            
            if (!GameRules.GameModeManager?.isAutoChessMode()) {
                Say(hero, 'This command only works in autochess mode', true);
                return;
            }
            
            if (pieceId) {
                Say(hero, `棋子信息: ${pieceId} - 详细信息请查看游戏界面`, true);
            } else {
                Say(hero, '可用棋子: anti_mage, crystal_maiden (更多棋子待添加)', true);
            }
        },
    },
};

@reloadable
export class Debug {
    DebugEnabled = false;
    outputToConsole = true; // 默认启用控制台输出
    private _chatListener: EventListenerID;

    // 在线测试白名单
    OnlineDebugWhiteList = [
        86815341, // Xavier
    ];

    /**
     * 调试输出方法，同时输出到游戏聊天和控制台
     */
    debugOutput(hero: CDOTA_BaseNPC_Hero | null, message: string): void {
        // 输出到游戏聊天
        if (hero && !hero.IsNull()) {
            Say(hero, message, true);
        }
        
        // 如果启用了控制台输出，也输出到控制台
        if (this.outputToConsole) {
            print(`[Debug Output] ${message}`);
        }
    }

    constructor() {
        // 将实例保存到 GameRules 以便外部访问
        (GameRules as any).DebugInstance = this;
        
        print('[Debug] ==============初始化调试系统==========================');
        print('[Debug] Debug module constructor called');
        print(`[Debug] IsInToolsMode(): ${IsInToolsMode()}`);
        print(`[Debug] PlayerCount: ${PlayerResource.GetPlayerCount()}`);
        print(`[Debug] GameTime: ${GameRules.GetGameTime()}`);
        print('[Debug] =================================================');
        
        // 强制启用调试模式（测试用）
        this._toggleDebugMode(true);
        print('[Debug] Debug mode force enabled for testing');
        
        // 工具模式下开启调试
        if (IsInToolsMode()) {
            print('[Debug] Tools mode detected - enhanced debugging enabled');
        }
        
        // 也检查是否是开发环境（单人游戏）
        const playerCount = PlayerResource.GetPlayerCount();
        if (playerCount === 1) {
            print('[Debug] Single player mode detected - debug commands available');
        }
        
        print(`[Debug] Debug enabled: ${this.DebugEnabled}`);
        print(`[Debug] Console output enabled: ${this.outputToConsole}`);
        
        // 创建全局访问函数
        this.createGlobalDebugFunctions();
        
        // 立即注册聊天监听器
        try {
            print('[Debug] Attempting to register chat listener immediately...');
            this._chatListener = ListenToGameEvent(`player_chat`, (keys) => {
                print(`[Debug] *** CHAT EVENT RECEIVED *** Text: "${keys.text}"`);
                this.OnPlayerChat(keys);
            }, undefined);
            print('[Debug] Chat listener registered successfully with ID:', this._chatListener);
        } catch (error) {
            print('[Debug] FAILED to register chat listener immediately:', error);
        }
        
        // 也尝试延迟注册作为备份
        Timers.CreateTimer(3.0, () => {
            print('[Debug] ===== 3-second checkpoint =====');
            if (!this._chatListener) {
                try {
                    print('[Debug] Attempting DELAYED chat listener registration...');
                    this._chatListener = ListenToGameEvent(`player_chat`, (keys) => {
                        print(`[Debug] *** DELAYED CHAT EVENT *** Text: "${keys.text}"`);
                        this.OnPlayerChat(keys);
                    }, undefined);
                    print('[Debug] Delayed chat listener registered successfully');
                } catch (error) {
                    print('[Debug] FAILED delayed chat listener registration:', error);
                }
            } else {
                print('[Debug] Chat listener already exists, ID:', this._chatListener);
            }
            
            // 验证Debug实例状态
            print('[Debug] Debug instance status check:');
            print(`[Debug] - DebugEnabled: ${this.DebugEnabled}`);
            print(`[Debug] - OutputToConsole: ${this.outputToConsole}`);
            print(`[Debug] - ChatListener: ${this._chatListener ? 'REGISTERED' : 'MISSING'}`);
            print(`[Debug] - Available commands: ${Object.keys(DebugCallbacks).length}`);
            print('[Debug] ===== End 3-second checkpoint =====');
            
            return undefined; // 一次性定时器
        });
        
        // 每10秒输出一次状态检查 - 修复版本
        print('[Debug] Creating 10-second timer...');
        
        // 启动循环定时器（正确的API使用方式）
        const firstTimer = Timers.CreateTimer(10.0, () => {
            print('[Debug] ===== 10-second status check =====');
            print(`[Debug] Debug system active, commands available: ${Object.keys(DebugCallbacks).slice(0, 5).join(', ')}...`);
            print('[Debug] Try typing -debug_status in chat or use script_reload');
            print('[Debug] Available global functions: debug_simple_test(), debug_status(), debug_help(), debug_test()');
            print('[Debug] ===== End status check =====');
            
            return 10.0; // 返回间隔时间继续执行
        });
        
        print(`[Debug] Timer created with result: ${firstTimer}`);
        
        // 创建测试定时器来验证定时器系统（修复版本）
        print('[Debug] Creating test timers to verify timer system...');
        Timers.CreateTimer(2.0, () => {
            print('[Debug] *** 2-second test timer fired! ***');
            return undefined; // 一次性定时器
        });
        
        Timers.CreateTimer(5.0, () => {
            print('[Debug] *** 5-second test timer fired! ***');
            return undefined; // 一次性定时器
        });
        
        Timers.CreateTimer(15.0, () => {
            print('[Debug] *** 15-second test timer fired! ***');
            return undefined; // 一次性定时器
        });
        
        // 发送启动消息
        Timers.CreateTimer(5.0, () => {
            print('[Debug] ===== Debug system startup complete =====');
            const hero = HeroList.GetHero(0);
            if (hero && !hero.IsNull()) {
                this.debugOutput(hero, 'Debug system loaded! Try -debug_status or use console commands');
                print('[Debug] Startup message sent to hero');
            } else {
                print('[Debug] No hero found for startup message');
            }
            
            // 执行一次调试状态检查
            print('[Debug] ===== MANUAL STATUS CHECK (startup) =====');
            this.executeDebugStatus();
            print('[Debug] ===== END MANUAL STATUS CHECK =====');
            
            print('[Debug] ===== End startup =====');
            return undefined; // 一次性定时器
        });
        
        // 监听前端错误报告
        CustomGameEventManager.RegisterListener('frontend_error_report', (_, event) => {
            this.OnFrontendErrorReport(event);
        });
    }

    /**
     * 执行调试状态检查（内部方法）
     */
    executeDebugStatus(): void {
        try {
            const hero = HeroList.GetHero(0);
            print(`[Debug] DebugEnabled: ${this.DebugEnabled}`);
            print(`[Debug] OutputToConsole: ${this.outputToConsole}`);
            print(`[Debug] IsInToolsMode: ${IsInToolsMode()}`);
            print(`[Debug] PlayerCount: ${PlayerResource.GetPlayerCount()}`);
            print(`[Debug] Hero: ${hero ? hero.GetUnitName() : 'null'}`);
            print(`[Debug] Available commands: ${Object.keys(DebugCallbacks).slice(0, 8).join(', ')}`);
            print(`[Debug] Chat listener: ${this._chatListener ? 'registered' : 'missing'}`);
            
            // 如果有英雄，也在游戏中显示
            if (hero && !hero.IsNull()) {
                this.debugOutput(hero, `Debug Status: Enabled=${this.DebugEnabled}, Console=${this.outputToConsole}, Tools=${IsInToolsMode()}`);
            }
        } catch (error) {
            print(`[Debug] ERROR in executeDebugStatus: ${error}`);
        }
    }

    /**
     * 创建全局调试函数，供控制台直接调用
     */
    createGlobalDebugFunctions(): void {
        try {
            // 创建全局函数
            // 创建简单的全局测试函数
            (globalThis as any).debug_simple_test = () => {
                print('[Debug] ===== SIMPLE TEST CALLED =====');
                print('[Debug] If you see this, console commands work!');
                const hero = HeroList.GetHero(0);
                if (hero && !hero.IsNull()) {
                    print(`[Debug] Hero found: ${hero.GetUnitName()}`);
                } else {
                    print('[Debug] No hero found');
                }
                print('[Debug] ===== END SIMPLE TEST =====');
            };
            
            // 使用_G来确保全局可访问
            (_G as any).debug_status = () => {
                print('[Debug] ===== Global debug_status() called =====');
                const hero = HeroList.GetHero(0);
                if (DebugCallbacks['-debug_status']) {
                    DebugCallbacks['-debug_status'].func(hero);
                    print('[Debug] debug_status command executed');
                } else {
                    print('[Debug] ERROR: debug_status callback not found');
                }
                print('[Debug] ===== End global debug_status =====');
            };
            
            (_G as any).debug_help = () => {
                print('[Debug] ===== Global debug_help() called =====');
                const hero = HeroList.GetHero(0);
                if (DebugCallbacks['-help']) {
                    DebugCallbacks['-help'].func(hero);
                    print('[Debug] help command executed');
                } else {
                    print('[Debug] ERROR: help callback not found');
                }
                print('[Debug] ===== End global debug_help =====');
            };
            
            (_G as any).debug_test = () => {
                print('[Debug] ===== Global debug_test() called =====');
                const hero = HeroList.GetHero(0);
                this.debugOutput(hero, 'Global debug test works! Debug system is functional.');
                print('[Debug] debug test completed');
                print('[Debug] ===== End global debug_test =====');
            };
            
            print('[Debug] Global debug functions created: debug_status(), debug_help(), debug_test()');
            print('[Debug] ===================================');
            print('[Debug] DOTA2 CONSOLE USAGE INSTRUCTIONS:');
            print('[Debug] 1. Type "script_reload" to reload and see debug status');
            print('[Debug] 2. Chat commands like -debug_status work if GC is connected');
            print('[Debug] 3. Watch for 10-second periodic status updates');
            print('[Debug] ===================================');
        } catch (error) {
            print('[Debug] FAILED to create global debug functions:', error);
        }
    }

    private _toggleDebugMode(on?: boolean) {
        if (on === undefined) {
            this.DebugEnabled = !this.DebugEnabled;
        } else {
            this.DebugEnabled = on;
        }
        if (this.DebugEnabled) {
            print('Debug mode enabled!');
        } else {
            print('Debug mode disabled!');
        }
    }

    OnPlayerChat(keys: GameEventProvidedProperties & PlayerChatEvent): void {
        try {
            print(`[Debug] OnPlayerChat called with text: "${keys.text}"`);
            print(`[Debug] Keys object:`, JSON.stringify(keys));
            
            if (!keys.text) {
                print('[Debug] No text in chat message');
                return;
            }
            
            const strs = keys.text.split(' ');
            const cmd = strs[0];
            const args = strs.slice(1);
            
            print(`[Debug] Parsed - Command: "${cmd}", Args: [${args.join(', ')}]`);
            
            // 获取英雄
            const hero = HeroList.GetHero(0);
            print(`[Debug] Hero found: ${hero ? hero.GetUnitName() : 'null'}`);
            
            // 测试最简单的命令响应
            if (cmd === '-test') {
                print('[Debug] Test command received!');
                this.debugOutput(hero, 'Test command works!');
                return;
            }
            
            // 特殊命令，无需调试模式即可使用
            if (cmd === '-debug_status') {
                print('[Debug] Executing -debug_status command');
                if (DebugCallbacks[cmd]) {
                    DebugCallbacks[cmd].func(hero, ...args);
                } else {
                    print('[Debug] -debug_status callback not found');
                }
                return;
            }
            
            // 强制启用调试的命令
            if (cmd === '-debug_enable') {
                this._toggleDebugMode(true);
                this.debugOutput(hero, 'Debug mode enabled!');
                return;
            }
            
            // 其他调试命令
            if (!this.DebugEnabled) {
                print('[Debug] Debug mode not enabled');
                this.debugOutput(hero, `Debug disabled. Use -debug_enable or -test. Command was: ${cmd}`);
                return;
            }
            
            // 执行调试命令
            if (DebugCallbacks[cmd]) {
                print(`[Debug] Executing command: ${cmd}`);
                DebugCallbacks[cmd].func(hero, ...args);
            } else {
                print(`[Debug] Unknown command: ${cmd}`);
                this.debugOutput(hero, `Unknown command: ${cmd}`);
            }
            
        } catch (error) {
            print(`[Debug] Error in OnPlayerChat: ${error}`);
        }
    }

    OnFrontendErrorReport(event: any): void {
        try {
            const report = event;
            if (!report.errors || !Array.isArray(report.errors)) {
                return;
            }

            print(`[Debug] Received ${report.errors.length} frontend error(s)`);

            // 将前端错误转发到错误追踪系统
            if (GameRules.ErrorTracker) {
                for (const frontendError of report.errors) {
                    const serverError = new Error(`[Frontend] ${frontendError.message}`);
                    
                    GameRules.ErrorTracker.trackError(serverError, {
                        module: 'Frontend',
                        function: frontendError.filename || 'unknown',
                        customData: {
                            frontend: true,
                            filename: frontendError.filename,
                            lineno: frontendError.lineno,
                            colno: frontendError.colno,
                            stack: frontendError.stack,
                            userAgent: frontendError.userAgent,
                            url: frontendError.url,
                            clientTimestamp: frontendError.timestamp,
                            clientGameTime: frontendError.gameTime
                        }
                    });
                }

                // 更新错误统计到网络表
                if (GameRules.XNetTable) {
                    const currentStats = GameRules.ErrorTracker.getErrorStats();
                    GameRules.XNetTable.SetTableValue('error_reports', 'stats', {
                        ...currentStats,
                        lastUpdate: Date.now()
                    });
                }
            }

        } catch (error) {
            print(`[Debug] Failed to process frontend error report: ${error}`);
        }
    }
}
