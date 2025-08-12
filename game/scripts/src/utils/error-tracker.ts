/**
 * 错误追踪系统 - 统一收集、去重、上报运行时错误
 * Error Tracking System - Unified error collection, deduplication, and reporting
 */

interface ErrorInfo {
    message: string;
    stack?: string;
    context?: any;
    timestamp: number;
    gameTime: number;
    gameVersion: string;
    errorHash: string;
    reportCount: number;
    lastReported: number;
}

interface ErrorContext {
    module?: string;
    function?: string;
    playerId?: number;
    gamePhase?: string;
    customData?: any;
}

interface ErrorReport {
    error: ErrorInfo;
    environment: {
        isToolsMode: boolean;
        playerCount: number;
        gameVersion: string;
        timestamp: number;
    };
}

export class ErrorTracker {
    private static instance: ErrorTracker;
    private static readonly MAX_CACHE_SIZE = 500;
    private static readonly CACHE_TTL = 30 * 60 * 1000; // 30分钟
    private static readonly REPORT_INTERVAL = 5 * 60 * 1000; // 5分钟上报间隔
    private static readonly MAX_REPORTS_PER_ERROR = 10;

    private errorCache = new Map<string, ErrorInfo>();
    private reportQueue: ErrorReport[] = [];
    private lastCleanup = 0;
    private isInitialized = false;

    private constructor() {
        this.startCleanupTimer();
        this.startReportTimer();
        this.isInitialized = true;
    }

    public static getInstance(): ErrorTracker {
        if (!ErrorTracker.instance) {
            ErrorTracker.instance = new ErrorTracker();
        }
        return ErrorTracker.instance;
    }

    /**
     * 追踪错误 - 主要入口点
     */
    public trackError(error: Error, context?: ErrorContext): string {
        try {
            const errorHash = this.generateErrorHash(error, context);
            const now = Date.now();
            const gameTime = this.getGameTime();

            // 检查是否已存在此错误
            if (this.errorCache.has(errorHash)) {
                const existingError = this.errorCache.get(errorHash)!;
                existingError.reportCount++;
                existingError.lastReported = now;
                
                // 避免同一错误频繁上报
                if (existingError.reportCount <= ErrorTracker.MAX_REPORTS_PER_ERROR) {
                    this.addToReportQueue(existingError);
                }
                
                return errorHash;
            }

            // 创建新的错误记录
            const errorInfo: ErrorInfo = {
                message: error.message,
                stack: error.stack,
                context,
                timestamp: now,
                gameTime,
                gameVersion: this.getGameVersion(),
                errorHash,
                reportCount: 1,
                lastReported: now
            };

            // 添加到缓存
            this.addToCache(errorInfo);
            
            // 添加到上报队列
            this.addToReportQueue(errorInfo);

            // 在控制台输出（开发模式）
            if (this.isInDevelopmentMode()) {
                this.logErrorToConsole(errorInfo);
            }

            return errorHash;
        } catch (trackingError) {
            // 防止错误追踪本身出错
            print(`[ErrorTracker] Failed to track error: ${trackingError}`);
            return 'tracking_failed';
        }
    }

    /**
     * 追踪性能问题
     */
    public trackPerformanceIssue(operation: string, duration: number, threshold: number, context?: any): void {
        if (duration > threshold) {
            const performanceError = new Error(`Performance issue: ${operation} took ${duration}ms (threshold: ${threshold}ms)`);
            this.trackError(performanceError, {
                module: 'PerformanceMonitor',
                function: operation,
                customData: { duration, threshold, ...context }
            });
        }
    }

    /**
     * 手动上报错误（用于业务逻辑错误）
     */
    public reportCustomError(message: string, context?: ErrorContext): string {
        const customError = new Error(message);
        return this.trackError(customError, context);
    }

    /**
     * 获取错误统计信息
     */
    public getErrorStats(): any {
        const totalErrors = this.errorCache.size;
        const recentErrors = Array.from(this.errorCache.values())
            .filter(error => Date.now() - error.timestamp < 60 * 60 * 1000); // 1小时内

        return {
            totalErrors,
            recentErrors: recentErrors.length,
            cacheSize: this.errorCache.size,
            queueSize: this.reportQueue.length,
            isInitialized: this.isInitialized
        };
    }

    /**
     * 清除错误缓存（调试用）
     */
    public clearErrorCache(): void {
        this.errorCache.clear();
        this.reportQueue = [];
        print('[ErrorTracker] Error cache cleared');
    }

    // 私有方法

    private generateErrorHash(error: Error, context?: ErrorContext): string {
        const contextString = context ? JSON.stringify(context) : '';
        const hashInput = `${error.message}|${error.stack}|${contextString}`;
        
        // 简单哈希函数
        let hash = 0;
        for (let i = 0; i < hashInput.length; i++) {
            const char = hashInput.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        
        return `error_${Math.abs(hash).toString(16)}`;
    }

    private addToCache(errorInfo: ErrorInfo): void {
        // 如果缓存已满，清理旧数据
        if (this.errorCache.size >= ErrorTracker.MAX_CACHE_SIZE) {
            this.cleanupCache();
        }

        this.errorCache.set(errorInfo.errorHash, errorInfo);
    }

    private addToReportQueue(errorInfo: ErrorInfo): void {
        const report: ErrorReport = {
            error: errorInfo,
            environment: {
                isToolsMode: this.isInDevelopmentMode(),
                playerCount: this.getPlayerCount(),
                gameVersion: this.getGameVersion(),
                timestamp: Date.now()
            }
        };

        this.reportQueue.push(report);
    }

    private cleanupCache(): void {
        const now = Date.now();
        const cutoffTime = now - ErrorTracker.CACHE_TTL;

        for (const [hash, errorInfo] of this.errorCache) {
            if (errorInfo.timestamp < cutoffTime) {
                this.errorCache.delete(hash);
            }
        }

        this.lastCleanup = now;
    }

    private startCleanupTimer(): void {
        // 每10分钟清理一次过期错误
        Timers.CreateTimer(() => {
            this.cleanupCache();
            return 10 * 60; // 10分钟
        });
    }

    private startReportTimer(): void {
        // 每5分钟批量上报错误
        Timers.CreateTimer(() => {
            this.sendReportsToServer();
            return 5 * 60; // 5分钟
        });
    }

    private sendReportsToServer(): void {
        if (this.reportQueue.length === 0) {
            return;
        }

        try {
            // 批量上报错误
            const reports = this.reportQueue.splice(0); // 清空队列
            const payload = {
                reports,
                metadata: {
                    gameVersion: this.getGameVersion(),
                    timestamp: Date.now(),
                    reportCount: reports.length
                }
            };

            // 发送到XNetTable（用于客户端显示）
            if (GameRules.XNetTable) {
                GameRules.XNetTable.SetTableValue('error_reports', 'latest_batch', {
                    count: reports.length,
                    timestamp: Date.now(),
                    summary: reports.slice(0, 5).map(r => ({
                        message: r.error.message,
                        hash: r.error.errorHash,
                        count: r.error.reportCount
                    }))
                });
            }

            // TODO: 发送到外部服务器
            // this.sendToExternalServer(payload);

            print(`[ErrorTracker] Sent ${reports.length} error reports`);
        } catch (error) {
            print(`[ErrorTracker] Failed to send reports: ${error}`);
        }
    }

    private logErrorToConsole(errorInfo: ErrorInfo): void {
        print(`[ERROR] ${errorInfo.message}`);
        if (errorInfo.stack) {
            print(`[STACK] ${errorInfo.stack}`);
        }
        if (errorInfo.context) {
            print(`[CONTEXT] ${JSON.stringify(errorInfo.context)}`);
        }
    }

    // 工具方法

    private getGameTime(): number {
        return GameRules.GetGameTime ? GameRules.GetGameTime() : 0;
    }

    private getGameVersion(): string {
        return 'fusion-v1.0.0'; // TODO: 从配置中获取
    }

    private getPlayerCount(): number {
        // TODO: 实现获取当前玩家数量
        return 1;
    }

    private isInDevelopmentMode(): boolean {
        return IsInToolsMode();
    }
}

// 全局错误处理函数
export function initializeGlobalErrorHandling(): void {
    const tracker = ErrorTracker.getInstance();

    // 重写全局错误处理
    const originalError = error;
    (globalThis as any).error = function(message: string, level?: number): void {
        tracker.reportCustomError(message, {
            module: 'Global',
            function: 'error',
            customData: { level }
        });
        
        if (originalError) {
            originalError(message, level);
        }
    };

    print('[ErrorTracker] Global error handling initialized');
}

// 导出便捷函数
export const trackError = (error: Error, context?: ErrorContext) => 
    ErrorTracker.getInstance().trackError(error, context);

export const reportError = (message: string, context?: ErrorContext) => 
    ErrorTracker.getInstance().reportCustomError(message, context);