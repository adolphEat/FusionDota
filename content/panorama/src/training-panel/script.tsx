/**
 * 训练面板控制脚本 - 训练模式的UI控制界面
 */

import React, { useState, useEffect } from 'react';
import { render } from 'react-panorama-x';
import { ErrorBoundary } from '../utils/error-handler';

// DOM类型声明
declare global {
    interface Document {
        getElementById(id: string): any;
    }
    const document: Document;
}

interface TrainingPanelState {
    gameMode: string;
    trainingActive: boolean;
    activeScenario: string | null;
    testDuration: number;
    spawnedUnits: number;
    isPanelVisible: boolean;
}

const TrainingPanel: React.FC = () => {
    const [state, setState] = useState<TrainingPanelState>({
        gameMode: 'normal',
        trainingActive: false,
        activeScenario: null,
        testDuration: 0,
        spawnedUnits: 0,
        isPanelVisible: true
    });

    // 监听网络表更新
    useEffect(() => {
        const updateInterval = setInterval(() => {
            updatePanelState();
        }, 1000);

        // 监听训练模式事件
        const subscriptions = [
            GameEvents.Subscribe('training_scenario_started', onScenarioStarted),
            GameEvents.Subscribe('training_scenario_stopped', onScenarioStopped),
            GameEvents.Subscribe('training_scenario_completed', onScenarioCompleted),
            GameEvents.Subscribe('game_mode_changed', onGameModeChanged)
        ];

        return () => {
            clearInterval(updateInterval);
            subscriptions.forEach(id => GameEvents.Unsubscribe(id));
        };
    }, []);

    const updatePanelState = () => {
        // 获取游戏模式状态
        const gameModeData = CustomNetTables.GetTableValue('game_mode', 'current');
        if (gameModeData) {
            setState(prev => ({
                ...prev,
                gameMode: gameModeData.mode
            }));
        }

        // 获取训练模式状态
        const trainingData = CustomNetTables.GetTableValue('training_mode', 'status');
        if (trainingData) {
            setState(prev => ({
                ...prev,
                trainingActive: !!trainingData.isActive,
                spawnedUnits: trainingData.spawnedUnitsCount || 0,
                testDuration: trainingData.testDuration || 0,
                activeScenario: trainingData.activeScenario?.id || null
            }));
        }
    };

    const onScenarioStarted = (event: any) => {
        setState(prev => ({
            ...prev,
            activeScenario: event.scenario.id,
            testDuration: 0
        }));
        showNotification(`开始测试场景: ${event.scenario.name}`);
    };

    const onScenarioStopped = (event: any) => {
        setState(prev => ({
            ...prev,
            activeScenario: null,
            testDuration: 0
        }));
        showNotification(`停止测试场景: ${event.scenario.name}`);
    };

    const onScenarioCompleted = (event: any) => {
        setState(prev => ({
            ...prev,
            activeScenario: null,
            testDuration: 0
        }));
        showNotification(`完成测试场景: ${event.scenario.name} (${event.duration.toFixed(1)}秒)`);
    };

    const onGameModeChanged = (event: any) => {
        setState(prev => ({
            ...prev,
            gameMode: event.newMode
        }));
        showNotification(`游戏模式切换到: ${event.newMode}`);
    };

    const showNotification = (message: string) => {
        GameEvents.SendCustomGameEventToServer('show_custom_message', {
            message: message,
            duration: 3
        });
    };

    // 控制函数
    const toggleTrainingMode = () => {
        if (state.trainingActive) {
            GameEvents.SendCustomGameEventToServer('training_deactivate', {});
        } else {
            GameEvents.SendCustomGameEventToServer('training_activate', {});
        }
    };

    const refreshHero = () => {
        GameEvents.SendCustomGameEventToServer('training_refresh_hero', {});
        showNotification('英雄状态已刷新');
    };

    const toggleGodMode = () => {
        GameEvents.SendCustomGameEventToServer('training_toggle_god_mode', {});
    };

    const clearUnits = () => {
        GameEvents.SendCustomGameEventToServer('training_clear_units', {});
        showNotification('已清理所有单位');
    };

    const spawnUnits = () => {
        const unitName = (document.getElementById('UnitNameInput') as any)?.text || 'npc_dota_neutral_kobold';
        const count = parseInt((document.getElementById('UnitCountInput') as any)?.text || '1');
        const level = parseInt((document.getElementById('UnitLevelInput') as any)?.text || '1');

        GameEvents.SendCustomGameEventToServer('training_spawn_units', {
            unitName,
            count,
            level
        });

        showNotification(`生成 ${count} 个 ${unitName} (等级 ${level})`);
    };

    const spawnQuickUnit = (unitType: string) => {
        const unitMap: Record<string, string> = {
            kobolds: 'npc_dota_neutral_kobold',
            trolls: 'npc_dota_neutral_dark_troll',
            centaurs: 'npc_dota_neutral_centaur_khan',
            dummy: 'npc_dota_training_dummy'
        };

        const unitName = unitMap[unitType];
        if (unitName) {
            GameEvents.SendCustomGameEventToServer('training_spawn_units', {
                unitName,
                count: unitType === 'dummy' ? 1 : 3,
                level: 1
            });
        }
    };

    const startScenario = () => {
        const scenarioId = (document.getElementById('ScenarioSelector') as any)?.GetSelected?.() || 'basic_combat';
        GameEvents.SendCustomGameEventToServer('training_start_scenario', {
            scenarioId
        });
    };

    const stopScenario = () => {
        GameEvents.SendCustomGameEventToServer('training_stop_scenario', {});
    };

    const setHeroLevel = () => {
        const level = parseInt((document.getElementById('LevelInput') as any)?.text || '1');
        (GameEvents.SendCustomGameEventToServer as any)('training_set_hero_level', { level });
        showNotification(`英雄等级设置为 ${level}`);
    };

    const addGold = () => {
        const amount = parseInt((document.getElementById('GoldInput') as any)?.text || '1000');
        (GameEvents.SendCustomGameEventToServer as any)('training_add_gold', { amount });
        showNotification(`添加了 ${amount} 金币`);
    };

    const toggleSetting = (setting: string, value: boolean) => {
        (GameEvents.SendCustomGameEventToServer as any)('training_update_setting', {
            setting,
            value
        });
    };

    const togglePanel = () => {
        setState(prev => ({
            ...prev,
            isPanelVisible: !prev.isPanelVisible
        }));
    };

    return (
        <div className={`training-panel-root ${state.isPanelVisible ? '' : 'collapsed'}`}>
            <div className="training-controls">
                <div className="panel-title">练功房控制面板</div>
                
                {/* 状态信息 */}
                <div className="status-section">
                    <div className="section-title">模式状态</div>
                    <div className="status-text">游戏模式: {state.gameMode}</div>
                    <div className="status-text">
                        训练模式: {state.trainingActive ? '激活' : '未激活'}
                    </div>
                    {state.activeScenario && (
                        <div className="status-text">
                            测试场景: {state.activeScenario} ({state.testDuration.toFixed(1)}s)
                        </div>
                    )}
                    <div className="status-text">生成单位: {state.spawnedUnits}</div>
                </div>

                {/* 基础控制 */}
                <div className="control-section">
                    <div className="section-title">基础控制</div>
                    <button className="control-button" onClick={toggleTrainingMode}>
                        {state.trainingActive ? '停用训练模式' : '激活训练模式'}
                    </button>
                    <button className="control-button" onClick={refreshHero}>
                        刷新英雄
                    </button>
                    <button className="control-button" onClick={toggleGodMode}>
                        无敌模式
                    </button>
                    <button className="control-button" onClick={clearUnits}>
                        清理单位
                    </button>
                </div>

                {/* 怪物生成 */}
                <div className="spawn-section">
                    <div className="section-title">怪物生成</div>
                    <div className="spawn-controls">
                        <input 
                            id="UnitNameInput" 
                            placeholder="单位名称" 
                            className="text-input"
                            defaultValue="npc_dota_neutral_kobold"
                        />
                        <input 
                            id="UnitCountInput" 
                            placeholder="数量" 
                            className="text-input small"
                            defaultValue="3"
                        />
                        <input 
                            id="UnitLevelInput" 
                            placeholder="等级" 
                            className="text-input small"
                            defaultValue="1"
                        />
                        <button className="control-button" onClick={spawnUnits}>
                            生成
                        </button>
                    </div>
                    
                    <div className="quick-spawn">
                        <button className="quick-button" onClick={() => spawnQuickUnit('kobolds')}>
                            狗头人
                        </button>
                        <button className="quick-button" onClick={() => spawnQuickUnit('trolls')}>
                            巨魔
                        </button>
                        <button className="quick-button" onClick={() => spawnQuickUnit('centaurs')}>
                            半人马
                        </button>
                        <button className="quick-button" onClick={() => spawnQuickUnit('dummy')}>
                            训练假人
                        </button>
                    </div>
                </div>

                {/* 测试场景 */}
                <div className="scenario-section">
                    <div className="section-title">测试场景</div>
                    <select id="ScenarioSelector" className="scenario-dropdown">
                        <option value="basic_combat">基础战斗测试</option>
                        <option value="damage_test">伤害测试</option>
                    </select>
                    <div className="scenario-controls">
                        <button className="control-button" onClick={startScenario}>
                            开始测试
                        </button>
                        <button className="control-button" onClick={stopScenario}>
                            停止测试
                        </button>
                    </div>
                </div>

                {/* 英雄控制 */}
                <div className="hero-section">
                    <div className="section-title">英雄控制</div>
                    <div className="hero-controls">
                        <input 
                            id="LevelInput" 
                            placeholder="等级" 
                            className="text-input small"
                            defaultValue="25"
                        />
                        <button className="control-button small" onClick={setHeroLevel}>
                            设置等级
                        </button>
                        <input 
                            id="GoldInput" 
                            placeholder="金币" 
                            className="text-input small"
                            defaultValue="10000"
                        />
                        <button className="control-button small" onClick={addGold}>
                            添加金币
                        </button>
                    </div>
                </div>
            </div>
            
            <button className="toggle-button" onClick={togglePanel}>
                {state.isPanelVisible ? '◀' : '▶'}
            </button>
        </div>
    );
};

// 渲染组件
render(
    <ErrorBoundary componentName="TrainingPanel">
        <TrainingPanel />
    </ErrorBoundary>,
    $.GetContextPanel()
);