/**
 * 简单的假服务器选择器 - 集成到HUD中
 */

import React, { useState, useEffect } from 'react';

interface ServerOption {
    id: string;
    name: string;
    ping: number;
    players: number;
    maxPlayers: number;
}

export const ServerSelector: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedServer, setSelectedServer] = useState<ServerOption | null>(null);
    
    // 假服务器数据
    const servers: ServerOption[] = [
        { id: 'asia-1', name: '亚洲服务器 #1', ping: 25, players: 8, maxPlayers: 10 },
        { id: 'asia-2', name: '亚洲服务器 #2', ping: 32, players: 6, maxPlayers: 10 },
        { id: 'europe-1', name: '欧洲服务器 #1', ping: 120, players: 4, maxPlayers: 10 },
        { id: 'us-1', name: '美洲服务器 #1', ping: 180, players: 2, maxPlayers: 10 },
    ];

    // 监听调试命令
    useEffect(() => {
        const onNetTableChanged = () => {
            const playerId = Players.GetLocalPlayer();
            if (playerId !== -1) {
                const serverCommand = CustomNetTables.GetTableValue('server_selection', playerId.toString());
                if (serverCommand && typeof serverCommand.show === 'boolean') {
                    setIsVisible(serverCommand.show);
                }
            }
        };
        
        CustomNetTables.SubscribeNetTableListener('server_selection', onNetTableChanged);
        
                return () => {
            // Panorama的Unsubscribe可能只需要一个参数
            // CustomNetTables.UnsubscribeNetTableListener('server_selection');
        };
    }, []);

    const connectToServer = (server: ServerOption) => {
        setSelectedServer(server);
        
        // 假的连接过程
        setTimeout(() => {
            console.log(`假装连接到服务器: ${server.name}`);
            // 简单的连接消息，不使用GameEvents
            setIsVisible(false);
        }, 1000);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: '20%',
            right: '20px',
            width: '300px',
            background: 'linear-gradient(135deg, rgba(30,60,114,0.95) 0%, rgba(42,82,152,0.95) 100%)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            padding: '20px',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            zIndex: 1000
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                paddingBottom: '10px'
            }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>服务器选择</h3>
                <button 
                    onClick={() => setIsVisible(false)}
                    style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                    }}
                >
                    ✕
                </button>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
                {servers.map(server => (
                    <div
                        key={server.id}
                        onClick={() => connectToServer(server)}
                        style={{
                            background: selectedServer?.id === server.id 
                                ? 'rgba(76,175,80,0.3)' 
                                : 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '4px',
                            padding: '10px',
                            marginBottom: '8px',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}

                    >
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            marginBottom: '4px'
                        }}>
                            <span>{server.name}</span>
                            <span style={{ color: server.ping < 50 ? '#4CAF50' : server.ping < 100 ? '#FF9800' : '#F44336' }}>
                                {server.ping}ms
                            </span>
                        </div>
                        <div style={{ 
                            fontSize: '11px', 
                            color: 'rgba(255,255,255,0.8)' 
                        }}>
                            玩家: {server.players}/{server.maxPlayers}
                        </div>
                    </div>
                ))}
            </div>
            
            <div style={{ 
                fontSize: '11px', 
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                fontStyle: 'italic'
            }}>
                这是一个演示界面，连接是假的
            </div>
        </div>
    );
};
