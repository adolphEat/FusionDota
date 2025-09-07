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
    private isProcessingError = false; // 防止递归错误处理

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
        // 防止递归错误处理
        if (this.isProcessingError) {
            print(`[ErrorTracker] Recursive error detected, skipping`);
            return 'recursive_error';
        }
        
        try {
            this.isProcessingError = true;
            
            const errorHash = this.generateErrorHash(error, context);
            const now = this.getCurrentTime();
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
                message: error.message || 'Unknown error',
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
        } finally {
            this.isProcessingError = false;
        }
    }

    /**
     * 追踪性能问题
     */
    public trackPerformanceIssue(operation: string, duration: number, threshold: number, context?: any): void {
        if (duration > threshold) {
            // 创建简单的错误对象
            const performanceError = {
                message: `Performance issue: ${operation} took ${duration}ms (threshold: ${threshold}ms)`,
                stack: '',
                name: 'PerformanceError'
            } as Error;
            
            this.trackError(performanceError, {
                module: 'PerformanceMonitor',
                function: operation,
                customData: { duration, threshold, context }
            });
        }
    }

    /**
     * 手动上报错误（用于业务逻辑错误）
     */
    public reportCustomError(message: string, context?: ErrorContext): string {
        const customError = {
            message: message,
            stack: '',
            name: 'CustomError'
        } as Error;
        return this.trackError(customError, context);
    }

    /**
     * 获取错误统计信息
     */
    public getErrorStats(): any {
        const totalErrors = this.errorCache.size;
        const recentErrors = Array.from(this.errorCache.values())
            .filter(error => this.getCurrentTime() - error.timestamp < 60 * 60 * 1000); // 1小时内

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
        const contextString = context ? this.safeStringify(context) : '';
        const errorMessage = error.message || String(error) || 'Unknown error';
        const errorStack = error.stack || '';
        const hashInput = `${errorMessage}|${errorStack}|${contextString}`;
        
        // 简化哈希函数，避免位运算
        let hash = 0;
        for (let i = 0; i < hashInput.length; i++) {
            const char = hashInput.charCodeAt(i);
            hash = ((hash * 31) + char) % 2147483647; // 使用简单数学运算代替位运算
        }
        
        return `error_${Math.abs(hash).toString()}`;
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
                timestamp: this.getCurrentTime()
            }
        };

        this.reportQueue.push(report);
    }

    private cleanupCache(): void {
        const now = this.getCurrentTime();
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
                    timestamp: this.getCurrentTime(),
                    reportCount: reports.length
                }
            };

            // 发送到XNetTable（用于客户端显示）
            if (GameRules.XNetTable) {
                GameRules.XNetTable.SetTableValue('error_reports', 'latest_batch', {
                    count: reports.length,
                    timestamp: this.getCurrentTime(),
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
            print(`[CONTEXT] ${this.safeStringify(errorInfo.context)}`);
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

    private getCurrentTime(): number {
        // 在Lua环境中，我们使用游戏时间代替Date.now()
        try {
            if (GameRules && GameRules.GetGameTime) {
                return GameRules.GetGameTime() * 1000; // 转换为毫秒
            }
            return 0; // 如果GameRules不可用，返回0
        } catch (error) {
            return 0;
        }
    }

    private safeStringify(obj: any): string {
        try {
            // 在Lua环境中，使用最简单的字符串转换
            if (obj === null || obj === undefined) {
                return 'null';
            }
            if (typeof obj === 'string') {
                return obj; // 直接返回字符串，不加引号以避免复杂性
            }
            if (typeof obj === 'number' || typeof obj === 'boolean') {
                return String(obj);
            }
            // 对于对象，简单地转换为字符串
            return '[Object]';
        } catch (error) {
            return '[Unknown]';
        }
    }
}

// 全局错误处理函数
export function initializeGlobalErrorHandling(): void {
    // 简化全局错误处理，避免重写error函数以防止兼容性问题
    print('[ErrorTracker] Global error handling initialized');
}

// 导出便捷函数
export const trackError = (error: Error, context?: ErrorContext) => 
    ErrorTracker.getInstance().trackError(error, context);

export const reportError = (message: string, context?: ErrorContext) => 
    ErrorTracker.getInstance().reportCustomError(message, context);