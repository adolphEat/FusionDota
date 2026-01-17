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
     */
    private ensureSaveDirectory(): void {
        // Lua: os.execute("mkdir saves") 在Windows/Linux下创建目录
        // 注意：这在Dota 2环境中可能受限，需要测试
        try {
            const [testFile] = io.open(`${this.SAVE_DIR}/test.txt`, 'w');
            if (testFile) {
                testFile.close();
                os.remove(`${this.SAVE_DIR}/test.txt`);
            }
        } catch (error) {
            print(`[SaveDataManager] ⚠️ 无法访问存档目录，尝试创建: ${this.SAVE_DIR}`);
        }
    }

    /**
     * 保存背包数据到本地JSON文件
     */
    public saveBackpackData(playerId: PlayerID, benchPieces: ChessPieceData[]): boolean {
        try {
            const saveData: SaveData = {
                playerId: playerId,
                benchPieces: benchPieces,
                timestamp: Date.now()
            };
            
            const jsonData = json.encode(saveData);
            const filePath = `${this.SAVE_DIR}/player_${playerId}_backpack.json`;
            
            // 使用Lua文件IO
            const [file] = io.open(filePath, 'w');
            if (file) {
                file.write(jsonData);
                file.close();
                print(`[SaveDataManager] 💾 保存成功: ${filePath} (${benchPieces.length} 个棋子)`);
                return true;
            } else {
                print(`[SaveDataManager] ❌ 无法打开文件: ${filePath}`);
                return false;
            }
        } catch (error) {
            print(`[SaveDataManager] ❌ 保存失败: ${error}`);
            return false;
        }
    }

    /**
     * 从本地JSON文件加载背包数据
     */
    public loadBackpackData(playerId: PlayerID): ChessPieceData[] | null {
        try {
            const filePath = `${this.SAVE_DIR}/player_${playerId}_backpack.json`;
            const [file] = io.open(filePath, 'r');
            
            if (file) {
                const jsonData = file.read('*a' as any) as string;
                file.close();
                
                if (jsonData && jsonData.length > 0) {
                    const [saveData] = json.decode(jsonData);
                    if (saveData && (saveData as any).benchPieces) {
                        const typedData = saveData as any as SaveData;
                        print(`[SaveDataManager] 📂 加载成功: ${filePath} (${typedData.benchPieces.length} 个棋子)`);
                        return typedData.benchPieces;
                    } else {
                        print(`[SaveDataManager] ⚠️ 数据格式错误: ${filePath}`);
                        return null;
                    }
                } else {
                    print(`[SaveDataManager] ⚠️ 文件为空: ${filePath}`);
                    return null;
                }
            } else {
                print(`[SaveDataManager] ℹ️ 存档文件不存在: ${filePath}`);
                return null;
            }
        } catch (error) {
            print(`[SaveDataManager] ⚠️ 加载失败: ${error}`);
            return null;
        }
    }

    /**
     * 删除存档文件
     */
    public deleteBackpackData(playerId: PlayerID): boolean {
        try {
            const filePath = `${this.SAVE_DIR}/player_${playerId}_backpack.json`;
            const success = os.remove(filePath);
            if (success) {
                print(`[SaveDataManager] 🗑️ 已删除存档: ${filePath}`);
                return true;
            } else {
                print(`[SaveDataManager] ⚠️ 删除失败（文件可能不存在）: ${filePath}`);
                return false;
            }
        } catch (error) {
            print(`[SaveDataManager] ⚠️ 删除失败: ${error}`);
            return false;
        }
    }

    /**
     * 检查存档文件是否存在
     */
    public hasSaveData(playerId: PlayerID): boolean {
        const filePath = `${this.SAVE_DIR}/player_${playerId}_backpack.json`;
        const [file] = io.open(filePath, 'r');
        if (file) {
            file.close();
            return true;
        }
        return false;
    }
}

export const saveDataManager = SaveDataManager.getInstance();

