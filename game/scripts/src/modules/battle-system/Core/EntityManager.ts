/**
 * 实体管理器
 * Entity Manager - Manages battle entities and their lifecycle
 */

import { EntityEventListeners } from '../Data/DataTypes';

export class EntityManager {
    private static instance: EntityManager;
    private entities: Map<CDOTA_BaseNPC, EntityEventListeners> = new Map();
    private entityGroups: Map<string, Set<CDOTA_BaseNPC>> = new Map();
    private cleanupTimers: Map<CDOTA_BaseNPC, string> = new Map();

    public static getInstance(): EntityManager {
        if (!EntityManager.instance) {
            EntityManager.instance = new EntityManager();
        }
        return EntityManager.instance;
    }

    private constructor() {
        this.setupGlobalEventListeners();
    }

    /**
     * 设置全局事件监听
     */
    private setupGlobalEventListeners(): void {
        // 监听实体死亡事件
        ListenToGameEvent('entity_killed', (event) => {
            const killedEntity = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC;
            if (killedEntity && this.entities.has(killedEntity)) {
                this.onEntityKilled(killedEntity);
            }
        }, null);

        // 监听实体受伤事件
        ListenToGameEvent('dota_unit_event', (event) => {
            const eventData = event as any;
            if (eventData.event_type === 'damage') {
                const entity = EntIndexToHScript(eventData.entindex) as CDOTA_BaseNPC;
                if (entity && this.entities.has(entity)) {
                    this.onEntityDamaged(entity, eventData.damage || 0);
                }
            }
        }, null);
    }

    /**
     * 注册实体
     */
    public registerEntity(entity: CDOTA_BaseNPC, listeners: EntityEventListeners, groupId?: string): void {
        if (!entity || entity.IsNull()) {
            print('[EntityManager] Cannot register null or invalid entity');
            return;
        }

        // 注册实体和监听器
        this.entities.set(entity, listeners);

        // 添加到组
        if (groupId) {
            this.addToGroup(entity, groupId);
        }

        // 调用生成事件
        if (listeners.onSpawn) {
            try {
                listeners.onSpawn(entity);
            } catch (error) {
                print(`[EntityManager] Error in onSpawn callback: ${error}`);
            }
        }

        print(`[EntityManager] Registered entity ${entity.GetUnitName()} (${entity.GetEntityIndex()})`);
    }

    /**
     * 取消注册实体
     */
    public unregisterEntity(entity: CDOTA_BaseNPC): void {
        if (!entity) return;

        // 移除监听器
        this.entities.delete(entity);

        // 从所有组中移除
        for (const group of this.entityGroups.values()) {
            group.delete(entity);
        }

        // 清理定时器
        const timerId = this.cleanupTimers.get(entity);
        if (timerId) {
            Timers.RemoveTimer(timerId);
            this.cleanupTimers.delete(entity);
        }

        print(`[EntityManager] Unregistered entity ${entity.GetEntityIndex()}`);
    }

    /**
     * 添加实体到组
     */
    public addToGroup(entity: CDOTA_BaseNPC, groupId: string): void {
        if (!this.entityGroups.has(groupId)) {
            this.entityGroups.set(groupId, new Set());
        }
        
        this.entityGroups.get(groupId)!.add(entity);
    }

    /**
     * 从组中移除实体
     */
    public removeFromGroup(entity: CDOTA_BaseNPC, groupId: string): void {
        const group = this.entityGroups.get(groupId);
        if (group) {
            group.delete(entity);
        }
    }

    /**
     * 获取组中的实体
     */
    public getEntitiesInGroup(groupId: string): CDOTA_BaseNPC[] {
        const group = this.entityGroups.get(groupId);
        return group ? Array.from(group) : [];
    }

    /**
     * 获取组中活着的实体
     */
    public getAliveEntitiesInGroup(groupId: string): CDOTA_BaseNPC[] {
        return this.getEntitiesInGroup(groupId).filter(entity => 
            entity && !entity.IsNull() && entity.IsAlive()
        );
    }

    /**
     * 检查组是否还有活着的实体
     */
    public isGroupAlive(groupId: string): boolean {
        return this.getAliveEntitiesInGroup(groupId).length > 0;
    }

    /**
     * 获取组的统计信息
     */
    public getGroupStats(groupId: string): {
        total: number;
        alive: number;
        dead: number;
        percentage: number;
    } {
        const allEntities = this.getEntitiesInGroup(groupId);
        const aliveEntities = this.getAliveEntitiesInGroup(groupId);
        
        return {
            total: allEntities.length,
            alive: aliveEntities.length,
            dead: allEntities.length - aliveEntities.length,
            percentage: allEntities.length > 0 ? (aliveEntities.length / allEntities.length) * 100 : 0
        };
    }

    /**
     * 实体死亡处理
     */
    private onEntityKilled(entity: CDOTA_BaseNPC): void {
        const listeners = this.entities.get(entity);
        if (listeners && listeners.onDeath) {
            try {
                listeners.onDeath(entity);
            } catch (error) {
                print(`[EntityManager] Error in onDeath callback: ${error}`);
            }
        }

        // 延迟清理实体
        this.scheduleEntityCleanup(entity);
    }

    /**
     * 实体受伤处理
     */
    private onEntityDamaged(entity: CDOTA_BaseNPC, damage: number): void {
        const listeners = this.entities.get(entity);
        if (listeners && listeners.onDamage) {
            try {
                listeners.onDamage(entity, damage);
            } catch (error) {
                print(`[EntityManager] Error in onDamage callback: ${error}`);
            }
        }
    }

    /**
     * 安排实体清理
     */
    private scheduleEntityCleanup(entity: CDOTA_BaseNPC, delay: number = 5.0): void {
        const timerId = Timers.CreateTimer(delay, () => {
            if (entity && !entity.IsNull()) {
                // 移除实体
                entity.RemoveSelf();
            }
            
            // 取消注册
            this.unregisterEntity(entity);
            
            return null; // 不重复执行
        });

        this.cleanupTimers.set(entity, timerId);
    }

    /**
     * 立即清理实体
     */
    public cleanupEntity(entity: CDOTA_BaseNPC): void {
        if (entity && !entity.IsNull()) {
            entity.RemoveSelf();
        }
        this.unregisterEntity(entity);
    }

    /**
     * 清理组中的所有实体
     */
    public cleanupGroup(groupId: string, immediate: boolean = false): void {
        const entities = this.getEntitiesInGroup(groupId);
        
        for (const entity of entities) {
            if (immediate) {
                this.cleanupEntity(entity);
            } else {
                this.scheduleEntityCleanup(entity);
            }
        }

        // 清空组
        this.entityGroups.delete(groupId);
        
        print(`[EntityManager] Cleaned up group ${groupId} (${entities.length} entities)`);
    }

    /**
     * 清理所有实体
     */
    public cleanupAllEntities(immediate: boolean = false): void {
        const allEntities = Array.from(this.entities.keys());
        
        for (const entity of allEntities) {
            if (immediate) {
                this.cleanupEntity(entity);
            } else {
                this.scheduleEntityCleanup(entity);
            }
        }

        // 清空所有数据
        this.entities.clear();
        this.entityGroups.clear();
        
        // 清理所有定时器
        for (const timerId of this.cleanupTimers.values()) {
            Timers.RemoveTimer(timerId);
        }
        this.cleanupTimers.clear();
        
        print(`[EntityManager] Cleaned up all entities (${allEntities.length} entities)`);
    }

    /**
     * 查找最近的敌人
     */
    public findNearestEnemy(
        entity: CDOTA_BaseNPC, 
        enemyGroupId: string, 
        maxRange?: number
    ): CDOTA_BaseNPC | null {
        const enemies = this.getAliveEntitiesInGroup(enemyGroupId);
        if (enemies.length === 0) return null;

        let nearestEnemy: CDOTA_BaseNPC | null = null;
        let nearestDistance = maxRange || Infinity;

        const entityPos = entity.GetAbsOrigin();

        for (const enemy of enemies) {
            const distance = (entityPos as any).__sub(enemy.GetAbsOrigin()).Length();
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestEnemy = enemy;
            }
        }

        return nearestEnemy;
    }

    /**
     * 查找范围内的敌人
     */
    public findEnemiesInRange(
        entity: CDOTA_BaseNPC,
        enemyGroupId: string,
        range: number
    ): CDOTA_BaseNPC[] {
        const enemies = this.getAliveEntitiesInGroup(enemyGroupId);
        const entityPos = entity.GetAbsOrigin();
        
        return enemies.filter(enemy => {
            const distance = (entityPos as any).__sub(enemy.GetAbsOrigin()).Length();
            return distance <= range;
        });
    }

    /**
     * 获取实体统计信息
     */
    public getEntityStats(): {
        totalRegistered: number;
        totalGroups: number;
        groupStats: Array<{ groupId: string; total: number; alive: number }>;
    } {
        const groupStats = Array.from(this.entityGroups.keys()).map(groupId => ({
            groupId,
            ...this.getGroupStats(groupId)
        }));

        return {
            totalRegistered: this.entities.size,
            totalGroups: this.entityGroups.size,
            groupStats
        };
    }

    /**
     * 设置实体AI行为
     */
    public setEntityAI(entity: CDOTA_BaseNPC, aiConfig: {
        targetGroupId?: string;
        aggressionLevel?: number;
        attackRange?: number;
        updateInterval?: number;
    }): void {
        const config = {
            targetGroupId: aiConfig.targetGroupId || '',
            aggressionLevel: aiConfig.aggressionLevel || 50,
            attackRange: aiConfig.attackRange || 800,
            updateInterval: aiConfig.updateInterval || 1.0
        };

        // 创建AI定时器
        const aiTimerId = Timers.CreateTimer(0.1, () => {
            if (!entity || entity.IsNull() || !entity.IsAlive()) {
                return null; // 停止AI
            }

            // 寻找目标
            if (config.targetGroupId) {
                const target = this.findNearestEnemy(entity, config.targetGroupId, config.attackRange);
                if (target) {
                    // 设置攻击目标
                    (entity as any).MoveToTargetToAttack(target);
                } else {
                    // 没有目标时的行为
                    entity.Stop();
                }
            }

            return config.updateInterval;
        });

        // 保存AI定时器ID（可以用于后续清理）
        (entity as any).__aiTimerId = aiTimerId;
    }

    /**
     * 停止实体AI
     */
    public stopEntityAI(entity: CDOTA_BaseNPC): void {
        const aiTimerId = (entity as any).__aiTimerId;
        if (aiTimerId) {
            Timers.RemoveTimer(aiTimerId);
            delete (entity as any).__aiTimerId;
        }
    }

    /**
     * 批量设置组AI
     */
    public setGroupAI(groupId: string, targetGroupId: string, aiConfig?: any): void {
        const entities = this.getAliveEntitiesInGroup(groupId);
        
        for (const entity of entities) {
            this.setEntityAI(entity, {
                targetGroupId,
                ...aiConfig
            });
        }
        
        print(`[EntityManager] Set AI for group ${groupId} targeting ${targetGroupId}`);
    }

    /**
     * 获取调试信息
     */
    public getDebugInfo(): string[] {
        const info: string[] = [];
        
        info.push(`=== Entity Manager Debug Info ===`);
        info.push(`Total Entities: ${this.entities.size}`);
        info.push(`Total Groups: ${this.entityGroups.size}`);
        info.push(`Active Timers: ${this.cleanupTimers.size}`);
        
        info.push(`\nGroups:`);
        for (const [groupId, entities] of this.entityGroups) {
            const stats = this.getGroupStats(groupId);
            info.push(`  ${groupId}: ${stats.alive}/${stats.total} alive (${stats.percentage.toFixed(1)}%)`);
        }
        
        return info;
    }
}
