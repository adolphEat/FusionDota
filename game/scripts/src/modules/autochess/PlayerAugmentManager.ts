/**
 * 玩家强化管理器
 * 管理每个玩家的海克斯强化技能
 */

export class PlayerAugmentManager {
    private playerAugments: Map<PlayerID, Set<string>> = new Map();

    constructor() {
        print('[PlayerAugmentManager] Initializing...');
    }

    /**
     * 初始化玩家数据
     * @param playerId 玩家ID
     */
    public initPlayer(playerId: PlayerID): void {
        if (!this.playerAugments.has(playerId)) {
            this.playerAugments.set(playerId, new Set<string>());
            print(`[PlayerAugmentManager] Initialized player ${playerId}`);
        }
    }

    /**
     * 添加强化到玩家
     * @param playerId 玩家ID
     * @param augmentId 强化技能ID
     * @returns 是否添加成功
     */
    public addAugment(playerId: PlayerID, augmentId: string): boolean {
        this.initPlayer(playerId);
        
        const augments = this.playerAugments.get(playerId)!;
        
        // 检查是否已有该强化
        if (augments.has(augmentId)) {
            print(`[PlayerAugmentManager] Player ${playerId} already has augment: ${augmentId}`);
            return false;
        }

        augments.add(augmentId);
        print(`[PlayerAugmentManager] Added augment ${augmentId} to player ${playerId}. Total: ${augments.size}`);
        return true;
    }

    /**
     * 获取玩家所有强化
     * @param playerId 玩家ID
     * @returns 强化ID数组
     */
    public getPlayerAugments(playerId: PlayerID): string[] {
        this.initPlayer(playerId);
        const augments = this.playerAugments.get(playerId)!;
        return Array.from(augments);
    }

    /**
     * 检查玩家是否已拥有某个强化
     * @param playerId 玩家ID
     * @param augmentId 强化技能ID
     * @returns 是否拥有
     */
    public hasAugment(playerId: PlayerID, augmentId: string): boolean {
        this.initPlayer(playerId);
        const augments = this.playerAugments.get(playerId)!;
        return augments.has(augmentId);
    }

    /**
     * 清除玩家的所有强化（游戏重置时）
     * @param playerId 玩家ID
     */
    public clearPlayer(playerId: PlayerID): void {
        if (this.playerAugments.has(playerId)) {
            this.playerAugments.get(playerId)!.clear();
            print(`[PlayerAugmentManager] Cleared augments for player ${playerId}`);
        }
    }

    /**
     * 清除所有玩家的强化
     */
    public clearAll(): void {
        for (const [playerId, augments] of this.playerAugments) {
            augments.clear();
        }
        print('[PlayerAugmentManager] Cleared all player augments');
    }

    /**
     * 获取玩家强化数量
     * @param playerId 玩家ID
     * @returns 强化数量
     */
    public getAugmentCount(playerId: PlayerID): number {
        this.initPlayer(playerId);
        return this.playerAugments.get(playerId)!.size;
    }

    /**
     * 移除玩家的某个强化
     * @param playerId 玩家ID
     * @param augmentId 强化技能ID
     * @returns 是否移除成功
     */
    public removeAugment(playerId: PlayerID, augmentId: string): boolean {
        this.initPlayer(playerId);
        const augments = this.playerAugments.get(playerId)!;
        
        if (augments.has(augmentId)) {
            augments.delete(augmentId);
            print(`[PlayerAugmentManager] Removed augment ${augmentId} from player ${playerId}`);
            return true;
        }
        
        return false;
    }

    /**
     * 打印玩家的所有强化（调试用）
     * @param playerId 玩家ID
     */
    public printPlayerAugments(playerId: PlayerID): void {
        this.initPlayer(playerId);
        const augments = this.getPlayerAugments(playerId);
        
        if (augments.length === 0) {
            print(`[PlayerAugmentManager] Player ${playerId} has no augments`);
        } else {
            print(`[PlayerAugmentManager] Player ${playerId} augments:`);
            for (const augmentId of augments) {
                print(`  - ${augmentId}`);
            }
        }
    }
}
