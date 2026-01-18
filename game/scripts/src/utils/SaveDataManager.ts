/**
 * 单机游戏存档管理器（使用Lua文件系统）
 * 用于保存和加载玩家背包数据到本地JSON文件
 */

export interface ChessPieceData {
    id: string;
    unitName: string;
    displayName: string;
    rarity: number;
    cost: number;
    health: number;
    maxHealth: number;
    damage: number;
    armor: number;
    attackRange: number;
}

export interface SaveData {
    playerId: PlayerID;
    benchPieces: ChessPieceData[];
    timestamp: number;
}

export class SaveDataManager {
    private static instance: SaveDataManager;
    private readonly SAVE_DIR = 'saves';

    private constructor() {
        this.ensureSaveDirectory();
    }

    public static getInstance(): SaveDataManager {
        if (!this.instance) {
            this.instance = new SaveDataManager();
        }
        return this.instance;
    }

    /**
     * 确保存档目录存在
     * DOTA2环境中此功能不可用
     */
    private ensureSaveDirectory(): void {
        // DOTA2环境禁用了io库，跳过目录检查
        // print(`[SaveDataManager] ⚠️ DOTA2环境不支持文件系统操作`);
    }

    /**
     * 保存背包数据到本地JSON文件
     * ⚠️ DOTA2环境中此功能不可用（io库被禁用）
     */
    public saveBackpackData(playerId: PlayerID, benchPieces: ChessPieceData[]): boolean {
        // DOTA2环境禁用了io库，无法保存到文件
        // print(`[SaveDataManager] ⚠️ DOTA2环境不支持文件保存，跳过`);
        return false;
    }

    /**
     * 从本地JSON文件加载背包数据
     * ⚠️ DOTA2环境中此功能不可用（io库被禁用）
     */
    public loadBackpackData(playerId: PlayerID): ChessPieceData[] | null {
        // DOTA2环境禁用了io库，无法从文件加载
        // print(`[SaveDataManager] ⚠️ DOTA2环境不支持文件加载，返回null`);
        return null;
    }

    /**
     * 删除存档文件
     * ⚠️ DOTA2环境中此功能不可用（io库被禁用）
     */
    public deleteBackpackData(playerId: PlayerID): boolean {
        // DOTA2环境禁用了io库，无法删除文件
        // print(`[SaveDataManager] ⚠️ DOTA2环境不支持文件删除，跳过`);
        return false;
    }

    /**
     * 检查存档文件是否存在
     * 
     * ⚠️ DOTA2限制说明：
     * DOTA2环境禁用了Lua的io库，无法直接访问文件系统
     * 目前暂时禁用存档功能，总是返回false
     * 
     * 未来可选方案：
     * 1. 使用Steam云存储API（需要额外配置）
     * 2. 使用外部HTTP服务器存储数据
     * 3. 使用XNetTable进行会话内持久化（游戏重启后丢失）
     */
    public hasSaveData(playerId: PlayerID): boolean {
        // DOTA2环境中io库被禁用，文件系统不可用
        // 返回false表示没有存档，游戏将使用默认初始化
        return false;
    }
}

export const saveDataManager = SaveDataManager.getInstance();

