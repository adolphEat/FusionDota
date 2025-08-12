/**
 * 自走棋面板控制脚本 - 自走棋模式的UI控制界面
 */

import React, { useState, useEffect } from 'react';
import { render } from 'react-panorama-x';
import { ErrorBoundary } from '../utils/error-handler';

interface ChessPiece {
    id: string;
    unitName: string;
    displayName: string;
    rarity: number;
    cost: number;
    race: string[];
    class: string[];
    health: number;
    damage: number;
    armor: number;
    attackRange: number;
    abilities: string[];
}

interface PlayerState {
    health: number;
    maxHealth: number;
    gold: number;
    level: number;
    experience: number;
    winStreak: number;
    lossStreak: number;
    boardPieces: ChessPiece[];
    benchPieces: ChessPiece[];
    isAlive: boolean;
    rank: number;
}

interface GameState {
    currentRound: number;
    currentPhase: string;
    phaseTimeLeft: number;
    isGameActive: boolean;
}

interface AutoChessPanelState {
    isActive: boolean;
    gameState: GameState;
    playerState: PlayerState;
    shopPieces: ChessPiece[];
    isPanelVisible: boolean;
    isDebugMode: boolean;
}

const AutoChessPanel: React.FC = () => {
    const [state, setState] = useState<AutoChessPanelState>({
        isActive: false,
        gameState: {
            currentRound: 0,
            currentPhase: 'preparation',
            phaseTimeLeft: 0,
            isGameActive: false
        },
        playerState: {
            health: 100,
            maxHealth: 100,
            gold: 0,
            level: 1,
            experience: 0,
            winStreak: 0,
            lossStreak: 0,
            boardPieces: [],
            benchPieces: [],
            isAlive: true,
            rank: 0
        },
        shopPieces: [],
        isPanelVisible: true,
        isDebugMode: false
    });

    // 监听网络表更新
    useEffect(() => {
        const updateInterval = setInterval(() => {
            updatePanelState();
        }, 1000);

        // 监听自走棋相关事件
        const subscriptions = [
            GameEvents.Subscribe('autochess_game_started', onGameStarted),
            GameEvents.Subscribe('autochess_game_ended', onGameEnded),
            GameEvents.Subscribe('autochess_phase_started', onPhaseStarted),
            GameEvents.Subscribe('autochess_time_update', onTimeUpdate),
            GameEvents.Subscribe('autochess_battle_match', onBattleMatch)
        ];

        // 初始化面板状态
        updatePanelState();

        return () => {
            clearInterval(updateInterval);
            subscriptions.forEach(id => GameEvents.Unsubscribe(id));
        };
    }, []);

    const updatePanelState = () => {
        // 获取自走棋游戏状态
        const gameData = CustomNetTables.GetTableValue('autochess_game', 'state');
        if (gameData) {
            setState(prev => ({
                ...prev,
                isActive: !!gameData.isActive,
                gameState: {
                    ...gameData.gameState,
                    isGameActive: !!gameData.gameState.isGameActive
                }
            }));
        }

        // 获取玩家状态
        const playerId = Game.GetLocalPlayerID();
        const playerData = CustomNetTables.GetTableValue('autochess_player', `player_${playerId}`);
        if (playerData) {
            setState(prev => ({
                ...prev,
                playerState: {
                    ...playerData,
                    boardPieces: Array.isArray(playerData.boardPieces) ? playerData.boardPieces : [],
                    benchPieces: Array.isArray(playerData.benchPieces) ? playerData.benchPieces : [],
                    isAlive: !!playerData.isAlive
                }
            }));
        }

        // 获取商店数据
        const shopData = CustomNetTables.GetTableValue('autochess_shop', `player_${playerId}`);
        if (shopData) {
            setState(prev => ({
                ...prev,
                shopPieces: Array.isArray(shopData.pieces) ? shopData.pieces.map(piece => ({
                    ...piece,
                    race: Array.isArray(piece.race) ? piece.race : [],
                    class: Array.isArray(piece.class) ? piece.class : [],
                    abilities: Array.isArray(piece.abilities) ? piece.abilities : []
                })) : []
            }));
        }

        // 检查是否为调试模式
        const debugInfo = CustomNetTables.GetTableValue('debug_info', 'system_status');
        if (debugInfo) {
            setState(prev => ({
                ...prev,
                isDebugMode: !!debugInfo.debugMode
            }));
        }
    };

    const onGameStarted = (event: any) => {
        setState(prev => ({
            ...prev,
            gameState: {
                ...prev.gameState,
                currentRound: event.round,
                currentPhase: event.phase,
                isGameActive: true
            }
        }));
        showNotification(`自走棋游戏开始！回合 ${event.round}`);
    };

    const onGameEnded = (event: any) => {
        setState(prev => ({
            ...prev,
            gameState: {
                ...prev.gameState,
                isGameActive: false
            }
        }));
        showNotification(`游戏结束！获胜者: 玩家 ${event.winner}`);
    };

    const onPhaseStarted = (event: any) => {
        setState(prev => ({
            ...prev,
            gameState: {
                ...prev.gameState,
                currentPhase: event.phase,
                phaseTimeLeft: event.timeLeft,
                currentRound: event.round
            }
        }));
        const phaseName = event.phase === 'preparation' ? '准备阶段' : '战斗阶段';
        showNotification(`${phaseName}开始！剩余时间: ${event.timeLeft}秒`);
    };

    const onTimeUpdate = (event: any) => {
        setState(prev => ({
            ...prev,
            gameState: {
                ...prev.gameState,
                phaseTimeLeft: event.timeLeft
            }
        }));
    };

    const onBattleMatch = (event: any) => {
        const playerId = Game.GetLocalPlayerID();
        if (event.player1 === playerId || event.player2 === playerId) {
            const opponent = event.player1 === playerId ? event.player2 : event.player1;
            showNotification(`战斗配对：你 vs 玩家 ${opponent}`);
        }
    };

    const showNotification = (message: string) => {
        $.Msg(`[AutoChess] ${message}`);
        // TODO: 显示游戏内通知
    };

    const togglePanel = () => {
        setState(prev => ({
            ...prev,
            isPanelVisible: !prev.isPanelVisible
        }));
    };

    const buyChessPiece = (pieceId: string) => {
        GameEvents.SendCustomGameEventToServer('autochess_buy_piece', {
            pieceId: pieceId,
            playerId: Game.GetLocalPlayerID()
        });
    };

    const refreshShop = () => {
        const cost = 2; // 刷新商店费用
        if (state.playerState.gold >= cost) {
            GameEvents.SendCustomGameEventToServer('autochess_refresh_shop', {
                playerId: Game.GetLocalPlayerID()
            });
        } else {
            showNotification('金币不足，无法刷新商店');
        }
    };

    const levelUp = () => {
        const cost = 4; // 升级费用
        if (state.playerState.gold >= cost) {
            GameEvents.SendCustomGameEventToServer('autochess_level_up', {
                playerId: Game.GetLocalPlayerID()
            });
        } else {
            showNotification('金币不足，无法升级');
        }
    };

    const startGame = () => {
        GameEvents.SendCustomGameEventToServer('autochess_start_game', {});
    };

    const endGame = () => {
        GameEvents.SendCustomGameEventToServer('autochess_end_game', {});
    };

    const surrender = () => {
        GameEvents.SendCustomGameEventToServer('autochess_surrender', {
            playerId: Game.GetLocalPlayerID()
        });
    };

    // 调试功能
    const debugActivateMode = () => {
        GameEvents.SendCustomGameEventToServer('debug_autochess_activate', {});
    };

    const debugDeactivateMode = () => {
        GameEvents.SendCustomGameEventToServer('debug_autochess_deactivate', {});
    };

    const debugAddGold = () => {
        GameEvents.SendCustomGameEventToServer('debug_add_gold', {
            playerId: Game.GetLocalPlayerID(),
            amount: 100
        });
    };

    const getRarityClassName = (rarity: number): string => {
        switch (rarity) {
            case 1: return 'rarity-common';      // 白色
            case 2: return 'rarity-uncommon';    // 绿色
            case 3: return 'rarity-rare';        // 蓝色
            case 4: return 'rarity-epic';        // 紫色
            case 5: return 'rarity-legendary';   // 橙色
            default: return 'rarity-common';
        }
    };

    const getPhaseDisplayName = (phase: string): string => {
        switch (phase) {
            case 'preparation': return '准备阶段';
            case 'battle': return '战斗阶段';
            case 'intermission': return '间歇阶段';
            default: return phase;
        }
    };

    const renderShopPiece = (piece: ChessPiece, index: number) => (
        <div key={index} className={`shop-piece ${getRarityClassName(piece.rarity)}`}>
            <div className="piece-icon">
                {/* TODO: 添加棋子图标 */}
                <span className="piece-letter">{piece.displayName.charAt(0)}</span>
            </div>
            <div className="piece-info">
                <div className="piece-name">{piece.displayName}</div>
                <div className="piece-cost">{piece.cost}金币</div>
                <div className="piece-stats">
                    <span>❤️{piece.health}</span>
                    <span>⚔️{piece.damage}</span>
                    <span>🛡️{piece.armor}</span>
                </div>
            </div>
            <button 
                className="buy-button"
                onClick={() => buyChessPiece(piece.id)}
                disabled={state.playerState.gold < piece.cost}
            >
                购买
            </button>
        </div>
    );

    const renderBenchSlot = (piece: ChessPiece | null, index: number) => (
        <div key={index} className={`bench-slot ${piece ? getRarityClassName(piece.rarity) : 'empty'}`}>
            {piece ? (
                <div className="bench-piece">
                    <div className="piece-icon">
                        <span className="piece-letter">{piece.displayName.charAt(0)}</span>
                    </div>
                    <div className="piece-name">{piece.displayName}</div>
                </div>
            ) : (
                <div className="empty-slot">空</div>
            )}
        </div>
    );

    return (
        <div className={`autochess-panel-root ${state.isPanelVisible ? 'visible' : 'hidden'}`}>
            <div className="autochess-controls">
                <h2 className="panel-title">自走棋控制面板</h2>
                
                {/* 游戏状态显示 */}
                <div className="status-section">
                    <h3 className="section-title">游戏状态</h3>
                    <div className="status-info">
                        <div className="status-text">模式: {state.isActive ? '自走棋' : '未激活'}</div>
                        <div className="status-text">游戏状态: {state.gameState.isGameActive ? '进行中' : '未开始'}</div>
                        <div className="status-text">回合: {state.gameState.currentRound}</div>
                        <div className="status-text">阶段: {getPhaseDisplayName(state.gameState.currentPhase)}</div>
                        <div className="status-text timer">剩余时间: {state.gameState.phaseTimeLeft}s</div>
                    </div>
                </div>
                
                {/* 玩家信息 */}
                <div className="player-section">
                    <h3 className="section-title">玩家信息</h3>
                    <div className="player-info">
                        <div className="player-stat health">
                            生命值: {state.playerState.health}/{state.playerState.maxHealth}
                        </div>
                        <div className="player-stat gold">金币: {state.playerState.gold}</div>
                        <div className="player-stat level">等级: {state.playerState.level}</div>
                        <div className="player-stat exp">
                            经验: {state.playerState.experience}/{state.playerState.level + 1}
                        </div>
                        <div className="player-stat streak">
                            {state.playerState.winStreak > 0 ? `连胜: ${state.playerState.winStreak}` : 
                             state.playerState.lossStreak > 0 ? `连败: ${state.playerState.lossStreak}` : '无连胜/连败'}
                        </div>
                    </div>
                    
                    <div className="player-controls">
                        <button 
                            className="control-button level-up"
                            onClick={levelUp}
                            disabled={state.playerState.gold < 4}
                        >
                            升级 (4金币)
                        </button>
                        <button 
                            className="control-button refresh"
                            onClick={refreshShop}
                            disabled={state.playerState.gold < 2}
                        >
                            刷新商店 (2金币)
                        </button>
                    </div>
                </div>
                
                {/* 商店区域 */}
                <div className="shop-section">
                    <h3 className="section-title">棋子商店</h3>
                    <div className="shop-pieces">
                        {state.shopPieces.slice(0, 5).map((piece, index) => renderShopPiece(piece, index))}
                        {Array.from({ length: Math.max(0, 5 - state.shopPieces.length) }, (_, index) => (
                            <div key={`empty-${index}`} className="shop-piece empty">
                                <div className="empty-slot">空</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* 备战席 */}
                <div className="bench-section">
                    <h3 className="section-title">备战席</h3>
                    <div className="bench-pieces">
                        {Array.from({ length: 8 }, (_, index) => {
                            const piece = state.playerState.benchPieces[index] || null;
                            return renderBenchSlot(piece, index);
                        })}
                    </div>
                </div>
                
                {/* 游戏控制 */}
                <div className="game-controls">
                    <h3 className="section-title">游戏控制</h3>
                    <div className="control-buttons">
                        <button 
                            className="control-button start-game"
                            onClick={startGame}
                            disabled={state.gameState.isGameActive}
                        >
                            开始游戏
                        </button>
                        <button 
                            className="control-button end-game"
                            onClick={endGame}
                            disabled={!state.gameState.isGameActive}
                        >
                            结束游戏
                        </button>
                        <button 
                            className="control-button surrender"
                            onClick={surrender}
                            disabled={!state.gameState.isGameActive || !state.playerState.isAlive}
                        >
                            投降
                        </button>
                    </div>
                </div>
                
                {/* 调试控制 (仅开发模式) */}
                {state.isDebugMode && (
                    <div className="debug-controls">
                        <h3 className="section-title">调试控制</h3>
                        <div className="debug-buttons">
                            <button 
                                className="control-button debug"
                                onClick={debugActivateMode}
                            >
                                激活自走棋模式
                            </button>
                            <button 
                                className="control-button debug"
                                onClick={debugDeactivateMode}
                            >
                                停用自走棋模式
                            </button>
                            <button 
                                className="control-button debug"
                                onClick={debugAddGold}
                            >
                                添加金币 (+100)
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* 面板切换按钮 */}
            <button className="toggle-button" onClick={togglePanel}>
                {state.isPanelVisible ? '隐藏' : '自走棋'}
            </button>
        </div>
    );
};

render(
    <ErrorBoundary componentName="AutoChessPanel">
        <AutoChessPanel />
    </ErrorBoundary>,
    $.GetContextPanel()
);