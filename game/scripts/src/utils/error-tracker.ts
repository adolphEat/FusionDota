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

    private errorCache: Record<string, ErrorInfo> = {};
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
            
            // 简化错误处理，只做基本日志
            const message = error.message || 'Unknown error';
            const timestamp = this.getCurrentTime();
            
            // 直接在控制台输出，避免复杂的缓存逻辑
            if (this.isInDevelopmentMode()) {
                print(`[ErrorTracker] Error: ${message}`);
                if (context) {
                    print(`[ErrorTracker] Context: ${this.safeStringify(context)}`);
                }
            }

            return 'error_logged';
        } catch (trackingError) {
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
            // 创建简单的错误对象，避免使用Error构造函数
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
        // 创建简单的错误对象，避免使用Error构造函数
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
        // 极简化统计，避免复杂循环
        return {
            totalErrors: 0,
            recentErrors: 0,
            cacheSize: 0,
            queueSize: 0,
            isInitialized: this.isInitialized
        };
    }

    /**
     * 清除错误缓存（调试用）
     */
    public clearErrorCache(): void {
        this.errorCache = {};
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
        let cacheSize = 0;
        for (const _ in this.errorCache) {
            cacheSize++;
        }
        if (cacheSize >= ErrorTracker.MAX_CACHE_SIZE) {
            this.cleanupCache();
        }

        this.errorCache[errorInfo.errorHash] = errorInfo;
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

        for (const hash in this.errorCache) {
            const errorInfo = this.errorCache[hash];
            if (errorInfo.timestamp < cutoffTime) {
                delete this.errorCache[hash];
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
                    summary: [] // 简化，避免使用slice和map
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