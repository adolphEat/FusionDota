/**
 * FusionDota 主界面UI - 仿照移动游戏风格的主界面
 */

import React, { useState, useEffect } from 'react';
import { render } from 'react-panorama-x';
import { ErrorBoundary } from '../utils/error-handler';

interface PlayerData {
    level: number;
    experience: number;
    experienceMax: number;
    gold: number;
    gems: number;
    playerName: string;
    avatar: string;
}

interface GameMode {
    id: string;
    name: string;
    description: string;
    icon: string;
    isActive: boolean;
    countdown?: string;
}

interface MainMenuState {
    playerData: PlayerData;
    gameModes: GameMode[];
    notifications: number;
    isLoading: boolean;
}

const MainMenu: React.FC = () => {
    const [state, setState] = useState<MainMenuState>({
        playerData: {
            level: 55,
            experience: 35834,
            experienceMax: 150000,
            gold: 753502,
            gems: 3235,
            playerName: "FusionDota玩家",
            avatar: "file://{images}/loading-screen.psd"
        },
        gameModes: [
            {
                id: 'autochess',
                name: '自走棋模式',
                description: '8人对战自走棋',
                icon: '🏆',
                isActive: true
            },
            {
                id: 'training', 
                name: '练功房',
                description: '技能训练场',
                icon: '⚔️',
                isActive: true
            },
            {
                id: 'arena_1',
                name: '竞技场',
                description: '4小时后开放',
                icon: '🏟️',
                isActive: false,
                countdown: '4小时'
            },
            {
                id: 'arena_2',
                name: '排位赛',
                description: '90分钟后开放',
                icon: '🎯',
                isActive: false,
                countdown: '90分钟'
            }
        ],
        notifications: 1,
        isLoading: false
    });

    useEffect(() => {
        // 初始化时获取玩家数据
        updatePlayerData();
        
        // 监听游戏事件
        const subscriptions = [
            GameEvents.Subscribe('player_data_updated', onPlayerDataUpdate),
            GameEvents.Subscribe('main_menu_refresh', updatePlayerData)
        ];

        return () => {
            subscriptions.forEach(id => GameEvents.Unsubscribe(id));
        };
    }, []);

    const updatePlayerData = () => {
        // 从网络表获取玩家数据
        const playerInfo = CustomNetTables.GetTableValue('player_info', 'local_player');
        if (playerInfo && typeof playerInfo === 'object') {
            // 只提取匹配 PlayerData 接口的字段
            const updatedData: Partial<PlayerData> = {};
            if ('level' in playerInfo && typeof playerInfo.level === 'number') {
                updatedData.level = playerInfo.level;
            }
            if ('experience' in playerInfo && typeof playerInfo.experience === 'number') {
                updatedData.experience = playerInfo.experience;
            }
            if ('name' in playerInfo && typeof playerInfo.name === 'string') {
                updatedData.playerName = playerInfo.name;
            }
            if ('avatar' in playerInfo && typeof playerInfo.avatar === 'string') {
                updatedData.avatar = playerInfo.avatar;
            }
            
            setState(prev => ({
                ...prev,
                playerData: {
                    ...prev.playerData,
                    ...updatedData
                }
            }));
        }
    };

    const onPlayerDataUpdate = (event: any) => {
        setState(prev => ({
            ...prev,
            playerData: {
                ...prev.playerData,
                ...event
            }
        }));
    };

    const handleModeSelect = (modeId: string) => {
        if (!state.gameModes.find(mode => mode.id === modeId)?.isActive) {
            return;
        }

        setState(prev => ({ ...prev, isLoading: true }));

        switch (modeId) {
            case 'autochess':
                GameEvents.SendCustomGameEventToServer('start_autochess_mode', {});
                break;
            case 'training':
                GameEvents.SendCustomGameEventToServer('start_training_mode', {});
                break;
            default:
                console.log('未实现的游戏模式:', modeId);
        }

        // 模拟加载延迟
        setTimeout(() => {
            setState(prev => ({ ...prev, isLoading: false }));
        }, 2000);
    };

    const handleSettingsClick = () => {
        GameEvents.SendCustomGameEventToServer('open_settings', {});
    };

    const handleFriendsClick = () => {
        GameEvents.SendCustomGameEventToServer('open_friends', {});
    };

    const handleMailClick = () => {
        GameEvents.SendCustomGameEventToServer('open_mail', {});
        setState(prev => ({ ...prev, notifications: 0 }));
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    const getExperiencePercentage = (): number => {
        return (state.playerData.experience / state.playerData.experienceMax) * 100;
    };

    return (
        <div className="main-menu-root">
            {/* 背景 */}
            <div className="main-background">
                <img src="file://{images}/main-menu-background.jpg" className="background-image" />
            </div>

            {/* 顶部状态栏 */}
            <div className="top-status-bar">
                <div className="player-level-section">
                    <div className="level-badge">
                        <span className="level-number">{state.playerData.level}</span>
                    </div>
                    <div className="experience-bar">
                        <div className="exp-background">
                            <div 
                                className="exp-fill" 
                                style={{ width: `${getExperiencePercentage()}%` }}
                            />
                        </div>
                        <span className="exp-text">
                            {formatNumber(state.playerData.experience)}/{formatNumber(state.playerData.experienceMax)}
                        </span>
                    </div>
                </div>

                <div className="resources-section">
                    <div className="resource-item gold">
                        <span className="resource-icon">🪙</span>
                        <span className="resource-amount">{formatNumber(state.playerData.gold)}</span>
                        <button className="add-button">+</button>
                    </div>
                    <div className="resource-item gems">
                        <span className="resource-icon">💎</span>
                        <span className="resource-amount">{formatNumber(state.playerData.gems)}</span>
                        <button className="add-button">+</button>
                    </div>
                </div>
            </div>

            {/* 右侧功能按钮 */}
            <div className="right-function-buttons">
                <button className="function-btn" onClick={handleFriendsClick}>
                    <span className="btn-icon">👥</span>
                </button>
                <button className="function-btn mail-btn" onClick={handleMailClick}>
                    <span className="btn-icon">📧</span>
                    {state.notifications > 0 && (
                        <div className="notification-badge">{state.notifications}</div>
                    )}
                </button>
                <button className="function-btn" onClick={handleSettingsClick}>
                    <span className="btn-icon">⚙️</span>
                </button>
            </div>

            {/* 中央角色展示区 */}
            <div className="hero-showcase">
                <div className="hero-info">
                    <h2 className="player-name">{state.playerData.playerName}</h2>
                    <div className="player-title">FusionDota 指挥官</div>
                    <div className="trophy-section">
                        <span className="trophy-icon">🏆</span>
                        <span className="trophy-score">9000</span>
                    </div>
                </div>
                <div className="hero-model">
                    {/* 3D模型区域，这里用占位符 */}
                    <div className="model-placeholder">
                        <div className="hero-silhouette">🧙‍♂️</div>
                        <div className="model-glow"></div>
                    </div>
                </div>
                <div className="stage-info">
                    <div className="stage-text">已进入新一阶竞技场！</div>
                </div>
            </div>

            {/* 底部游戏模式选择 */}
            <div className="game-modes-section">
                <h3 className="modes-title">游戏模式</h3>
                <div className="modes-grid">
                    {state.gameModes.map((mode, index) => (
                        <div 
                            key={mode.id}
                            className={`mode-card ${mode.isActive ? 'active' : 'locked'}`}
                            onClick={() => handleModeSelect(mode.id)}
                        >
                            <div className="mode-icon">{mode.icon}</div>
                            <div className="mode-info">
                                <div className="mode-name">{mode.name}</div>
                                <div className="mode-desc">{mode.description}</div>
                                {mode.countdown && (
                                    <div className="mode-countdown">{mode.countdown}</div>
                                )}
                            </div>
                            {!mode.isActive && <div className="lock-overlay">🔒</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* 底部导航 */}
            <div className="bottom-navigation">
                <button className="nav-btn active">
                    <span className="nav-icon">🏠</span>
                    <span className="nav-label">主页</span>
                </button>
                <button className="nav-btn">
                    <span className="nav-icon">📊</span>
                    <span className="nav-label">统计</span>
                </button>
                <button className="nav-btn battle-btn">
                    <span className="nav-icon">⚔️</span>
                    <span className="nav-label">对战</span>
                </button>
                <button className="nav-btn">
                    <span className="nav-icon">🎒</span>
                    <span className="nav-label">背包</span>
                </button>
                <button className="nav-btn">
                    <span className="nav-icon">🌟</span>
                    <span className="nav-label">成就</span>
                </button>
            </div>

            {/* 加载遮罩 */}
            {state.isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">正在进入游戏...</div>
                </div>
            )}
        </div>
    );
};

render(
    <ErrorBoundary componentName="MainMenu">
        <MainMenu />
    </ErrorBoundary>,
    $.GetContextPanel()
);
