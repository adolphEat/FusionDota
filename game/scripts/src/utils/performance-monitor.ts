/**
 * 性能监控系统 - 监控关键操作的执行时间
 * Performance Monitoring System - Monitor execution time of critical operations
 */

interface PerformanceMetric {
    operation: string;
    duration: number;
    timestamp: number;
    context?: any;
}

interface PerformanceStats {
    count: number;
    totalTime: number;
    averageTime: number;
    maxTime: number;
    minTime: number;
    lastUpdate: number;
}

interface ActiveTimer {
    operation: string;
    startTime: number;
    context?: any;
}

export class PerformanceMonitor {
    private static instance: PerformanceMonitor;
    private static readonly MAX_METRICS_HISTORY = 1000;
    private static readonly STATS_UPDATE_INTERVAL = 30; // 30秒

    private metrics: PerformanceMetric[] = [];
    private stats = new Map<string, PerformanceStats>();
    private activeTimers = new Map<string, ActiveTimer>();
    private thresholds = new Map<string, number>();
    private lastStatsUpdate = 0;

    private constructor() {
        this.startStatsUpdateTimer();
        print('[PerformanceMonitor] Initialized');
    }

    public static getInstance(): PerformanceMonitor {
        if (!PerformanceMonitor.instance) {
            PerformanceMonitor.instance = new PerformanceMonitor();
        }
        return PerformanceMonitor.instance;
    }

    /**
     * 开始计时
     */
    public startTimer(operation: string, context?: any): string {
<<<<<<< Updated upstream
        const timerId = `${operation}_${this.getCurrentTime()}_${Math.random().toString(36).substr(2, 9)}`;
=======
        const timerId = `${operation}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
>>>>>>> Stashed changes
        
        this.activeTimers.set(timerId, {
            operation,
            startTime: this.getCurrentTime(),
            context
        });

        return timerId;
    }

    /**
     * 结束计时并记录性能指标
     */
    public endTimer(timerId: string): number {
        const timer = this.activeTimers.get(timerId);
        if (!timer) {
            print(`[PerformanceMonitor] Timer not found: ${timerId}`);
            return 0;
        }

        const endTime = this.getCurrentTime();
        const duration = endTime - timer.startTime;

        this.recordMetric({
            operation: timer.operation,
            duration,
            timestamp: endTime,
            context: timer.context
        });

        this.activeTimers.delete(timerId);

        // 检查是否超过阈值
        const threshold = this.thresholds.get(timer.operation);
        if (threshold && duration > threshold) {
            this.reportPerformanceIssue(timer.operation, duration, threshold, timer.context);
        }

        return duration;
    }

    /**
     * 直接记录性能指标
     */
    public recordDuration(operation: string, duration: number, context?: any): void {
        this.recordMetric({
            operation,
            duration,
            timestamp: this.getCurrentTime(),
            context
        });

        // 检查阈值
        const threshold = this.thresholds.get(operation);
        if (threshold && duration > threshold) {
            this.reportPerformanceIssue(operation, duration, threshold, context);
        }
    }

    /**
     * 设置性能阈值
     */
    public setThreshold(operation: string, thresholdMs: number): void {
        this.thresholds.set(operation, thresholdMs);
    }

    /**
     * 获取操作的性能统计
     */
    public getStats(operation?: string): PerformanceStats | Map<string, PerformanceStats> {
        this.updateStats();

        if (operation) {
            return this.stats.get(operation) || this.createEmptyStats();
        }

        return new Map(this.stats);
    }

    /**
     * 获取性能摘要
     */
    public getSummary(): any {
        this.updateStats();

        const summary = {
            totalOperations: this.metrics.length,
            uniqueOperations: this.stats.size,
            activeTimers: this.activeTimers.size,
            lastUpdate: this.lastStatsUpdate,
            topSlowOperations: this.getTopSlowOperations(5)
        };

        return summary;
    }

    /**
     * 清除所有指标（调试用）
     */
    public clearMetrics(): void {
        this.metrics = [];
        this.stats.clear();
        this.activeTimers.clear();
        print('[PerformanceMonitor] All metrics cleared');
    }

    // 私有方法

    private recordMetric(metric: PerformanceMetric): void {
        // 添加到历史记录
        this.metrics.push(metric);

        // 限制历史记录大小
        if (this.metrics.length > PerformanceMonitor.MAX_METRICS_HISTORY) {
            this.metrics.shift();
        }

        // 更新统计信息
        this.updateOperationStats(metric);
    }

    private updateOperationStats(metric: PerformanceMetric): void {
        const existing = this.stats.get(metric.operation);
        
        if (existing) {
            existing.count++;
            existing.totalTime += metric.duration;
            existing.averageTime = existing.totalTime / existing.count;
            existing.maxTime = Math.max(existing.maxTime, metric.duration);
            existing.minTime = Math.min(existing.minTime, metric.duration);
            existing.lastUpdate = metric.timestamp;
        } else {
            this.stats.set(metric.operation, {
                count: 1,
                totalTime: metric.duration,
                averageTime: metric.duration,
                maxTime: metric.duration,
                minTime: metric.duration,
                lastUpdate: metric.timestamp
            });
        }
    }

    private updateStats(): void {
        const now = this.getCurrentTime();
        if (now - this.lastStatsUpdate < PerformanceMonitor.STATS_UPDATE_INTERVAL * 1000) {
            return;
        }

        // 同步统计信息到网络表
        this.syncStatsToNetTable();
        this.lastStatsUpdate = now;
    }

    private syncStatsToNetTable(): void {
        if (!GameRules.XNetTable) {
            return;
        }

        try {
            const statsData: any = {};
            for (const [operation, stats] of this.stats) {
                statsData[operation] = {
                    count: stats.count,
                    totalTime: Math.round(stats.totalTime * 100) / 100,
                    averageTime: Math.round(stats.averageTime * 100) / 100,
                    maxTime: Math.round(stats.maxTime * 100) / 100,
                    lastUpdate: stats.lastUpdate
                };
            }

            GameRules.XNetTable.SetTableValue('debug_info', 'performance_metrics', statsData);
        } catch (error) {
            print(`[PerformanceMonitor] Failed to sync stats: ${error}`);
        }
    }

    private reportPerformanceIssue(operation: string, duration: number, threshold: number, context?: any): void {
        if (GameRules.ErrorTracker) {
            GameRules.ErrorTracker.trackPerformanceIssue(operation, duration, threshold, context);
        }

        if (IsInToolsMode()) {
            print(`[PERFORMANCE] ${operation} took ${duration.toFixed(2)}ms (threshold: ${threshold}ms)`);
        }
    }

    private getTopSlowOperations(count: number): Array<{operation: string, avgTime: number, maxTime: number}> {
<<<<<<< Updated upstream
        // 简化实现，避免ES6特性
        const result: Array<{operation: string, avgTime: number, maxTime: number}> = [];
        let addedCount = 0;
        
        for (const operation in this.stats.keys()) {
            if (addedCount >= count) break;
            const stats = this.stats.get(operation);
            if (stats) {
                result.push({
                    operation,
                    avgTime: Math.round(stats.averageTime * 100) / 100,
                    maxTime: Math.round(stats.maxTime * 100) / 100
                });
                addedCount++;
            }
        }
        
        return result;
=======
        return Array.from(this.stats.entries())
            .map(([operation, stats]) => ({
                operation,
                avgTime: Math.round(stats.averageTime * 100) / 100,
                maxTime: Math.round(stats.maxTime * 100) / 100
            }))
            .sort((a, b) => b.avgTime - a.avgTime)
            .slice(0, count);
>>>>>>> Stashed changes
    }

    private createEmptyStats(): PerformanceStats {
        return {
            count: 0,
            totalTime: 0,
            averageTime: 0,
            maxTime: 0,
            minTime: 0,
            lastUpdate: 0
        };
    }

    private getCurrentTime(): number {
<<<<<<< Updated upstream
        // 使用游戏时间，如果不可用则返回0
        try {
            if (typeof GameRules !== 'undefined' && GameRules.GetGameTime) {
                return GameRules.GetGameTime() * 1000; // 转换为毫秒
            }
            return 0; // 如果GameRules不可用，返回0
        } catch (error) {
            return 0;
        }
=======
        // 使用游戏时间，如果不可用则使用系统时间
        if (typeof GameRules !== 'undefined' && GameRules.GetGameTime) {
            return GameRules.GetGameTime() * 1000; // 转换为毫秒
        }
        return Date.now();
>>>>>>> Stashed changes
    }

    private startStatsUpdateTimer(): void {
        // 每30秒更新一次统计信息
        Timers.CreateTimer(() => {
            this.updateStats();
            return PerformanceMonitor.STATS_UPDATE_INTERVAL;
        });
    }
}

// 便捷函数 - 使用装饰器模式
export function measurePerformance<T extends Function>(
    func: T, 
    operationName: string, 
    threshold?: number
): T {
    const monitor = PerformanceMonitor.getInstance();
    
    if (threshold) {
        monitor.setThreshold(operationName, threshold);
    }

    return ((...args: any[]) => {
        const timerId = monitor.startTimer(operationName);
        try {
            const result = func.apply(this, args);
            return result;
        } finally {
            monitor.endTimer(timerId);
        }
    }) as any;
}

// 便捷的计时函数
export function withTiming<T>(operation: string, func: () => T, threshold?: number): T {
    const monitor = PerformanceMonitor.getInstance();
    
    if (threshold) {
        monitor.setThreshold(operation, threshold);
    }
    
    const timerId = monitor.startTimer(operation);
    try {
        return func();
    } finally {
        monitor.endTimer(timerId);
    }
}

// 导出便捷函数
export const startTimer = (operation: string, context?: any) => 
    PerformanceMonitor.getInstance().startTimer(operation, context);

export const endTimer = (timerId: string) => 
    PerformanceMonitor.getInstance().endTimer(timerId);

export const recordDuration = (operation: string, duration: number, context?: any) => 
    PerformanceMonitor.getInstance().recordDuration(operation, duration, context);