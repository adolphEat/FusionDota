/**
 * 前端错误处理系统 - 收集并上报前端JavaScript错误
 * Frontend Error Handling System - Collect and report frontend JavaScript errors
 */

import * as React from 'react';

// DOM类型声明
declare global {
    interface Window {
        location: {
            href: string;
        };
        addEventListener(type: string, listener: (event: any) => void): void;
    }
    
    interface ErrorEvent {
        message: string;
        filename: string;
        lineno: number;
        colno: number;
        error: Error;
    }
    
    interface PromiseRejectionEvent {
        reason: any;
    }
    
    const window: Window;
}

interface FrontendErrorInfo {
    message: string;
    filename?: string;
    lineno?: number;
    colno?: number;
    stack?: string;
    timestamp: number;
    userAgent: string;
    url: string;
    gameTime: number;
}

interface FrontendErrorContext {
    component?: string;
    action?: string;
    playerId?: number;
    customData?: any;
}

export class FrontendErrorHandler {
    private static instance: FrontendErrorHandler;
    private static readonly MAX_ERRORS_PER_SESSION = 50;
    private static readonly ERROR_REPORT_INTERVAL = 5000; // 5秒

    private errorQueue: FrontendErrorInfo[] = [];
    private reportTimer: number | null = null;
    private errorCount = 0;

    private constructor() {
        this.setupGlobalErrorHandlers();
        this.startReportTimer();
        $.Msg('[FrontendErrorHandler] Initialized');
    }

    public static getInstance(): FrontendErrorHandler {
        if (!FrontendErrorHandler.instance) {
            FrontendErrorHandler.instance = new FrontendErrorHandler();
        }
        return FrontendErrorHandler.instance;
    }

    /**
     * 手动报告错误
     */
    public reportError(error: Error, context?: FrontendErrorContext): void {
        const errorInfo: FrontendErrorInfo = {
            message: error.message,
            stack: error.stack,
            timestamp: Date.now(),
            userAgent: 'DOTA2-Panorama',
            url: window.location?.href || 'panorama://unknown',
            gameTime: this.getGameTime()
        };

        this.addToQueue(errorInfo, context);
    }

    /**
     * 报告自定义错误消息
     */
    public reportCustomError(message: string, context?: FrontendErrorContext): void {
        const errorInfo: FrontendErrorInfo = {
            message,
            timestamp: Date.now(),
            userAgent: 'DOTA2-Panorama',
            url: window.location?.href || 'panorama://unknown',
            gameTime: this.getGameTime()
        };

        this.addToQueue(errorInfo, context);
    }

    /**
     * 获取错误统计
     */
    public getErrorStats(): any {
        return {
            totalErrors: this.errorCount,
            queuedErrors: this.errorQueue.length,
            isActive: this.reportTimer !== null
        };
    }

    // 私有方法

    private setupGlobalErrorHandlers(): void {
        // 全局错误处理
        window.addEventListener('error', (event) => {
            this.handleGlobalError(event);
        });

        // Promise 拒绝处理
        window.addEventListener('unhandledrejection', (event) => {
            this.handleUnhandledRejection(event);
        });

        // 覆盖console.error来捕获控制台错误
        const originalConsoleError = console.error;
        console.error = (...args: any[]) => {
            this.handleConsoleError(args);
            originalConsoleError.apply(console, args);
        };

        $.Msg('[FrontendErrorHandler] Global error handlers setup complete');
    }

    private handleGlobalError(event: ErrorEvent): void {
        const errorInfo: FrontendErrorInfo = {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack,
            timestamp: Date.now(),
            userAgent: 'DOTA2-Panorama',
            url: window.location?.href || 'panorama://unknown',
            gameTime: this.getGameTime()
        };

        this.addToQueue(errorInfo, {
            component: 'GlobalHandler',
            action: 'error_event'
        });
    }

    private handleUnhandledRejection(event: PromiseRejectionEvent): void {
        const errorInfo: FrontendErrorInfo = {
            message: `Unhandled Promise Rejection: ${event.reason}`,
            stack: event.reason?.stack || '',
            timestamp: Date.now(),
            userAgent: 'DOTA2-Panorama',
            url: window.location?.href || 'panorama://unknown',
            gameTime: this.getGameTime()
        };

        this.addToQueue(errorInfo, {
            component: 'GlobalHandler',
            action: 'unhandled_rejection'
        });
    }

    private handleConsoleError(args: any[]): void {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');

        const errorInfo: FrontendErrorInfo = {
            message: `Console Error: ${message}`,
            timestamp: Date.now(),
            userAgent: 'DOTA2-Panorama',
            url: window.location?.href || 'panorama://unknown',
            gameTime: this.getGameTime()
        };

        this.addToQueue(errorInfo, {
            component: 'Console',
            action: 'error_log'
        });
    }

    private addToQueue(errorInfo: FrontendErrorInfo, context?: FrontendErrorContext): void {
        // 防止错误过多
        if (this.errorCount >= FrontendErrorHandler.MAX_ERRORS_PER_SESSION) {
            return;
        }

        this.errorQueue.push(errorInfo);
        this.errorCount++;

        // 在开发模式下立即输出
        if (this.isDevelopmentMode()) {
            $.Msg(`[ERROR] ${errorInfo.message}`);
            if (context) {
                $.Msg(`[CONTEXT] ${JSON.stringify(context)}`);
            }
        }
    }

    private startReportTimer(): void {
        this.reportTimer = $.Schedule(FrontendErrorHandler.ERROR_REPORT_INTERVAL / 1000, () => {
            this.sendErrorsToServer();
            this.startReportTimer(); // 重新调度
        });
    }

    private sendErrorsToServer(): void {
        if (this.errorQueue.length === 0) {
            return;
        }

        try {
            // 准备错误报告
            const errors = this.errorQueue.splice(0); // 清空队列
            const report = {
                errors,
                sessionInfo: {
                    timestamp: Date.now(),
                    gameTime: this.getGameTime(),
                    errorCount: errors.length,
                    totalErrorCount: this.errorCount
                }
            };

            // 发送到服务器端的错误追踪系统
            (GameEvents.SendCustomGameEventToServer as any)('frontend_error_report', report);

            $.Msg(`[FrontendErrorHandler] Sent ${errors.length} error reports to server`);
        } catch (error) {
            $.Msg(`[FrontendErrorHandler] Failed to send error reports: ${error}`);
        }
    }

    private getGameTime(): number {
        // 尝试获取游戏时间，如果失败则返回0
        try {
            return Game.GetGameTime ? Game.GetGameTime() : 0;
        } catch {
            return 0;
        }
    }

    private isDevelopmentMode(): boolean {
        // 检测是否在开发模式（工具模式或本地开发）
        return Game.IsInToolsMode ? Game.IsInToolsMode() : false;
    }
}

// React错误边界组件
export class ErrorBoundary extends React.Component<
    { children: React.ReactNode; componentName?: string },
    { hasError: boolean; error?: Error }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        const errorHandler = FrontendErrorHandler.getInstance();
        errorHandler.reportError(error, {
            component: this.props.componentName || 'Unknown',
            action: 'component_error',
            customData: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return React.createElement('label', {
                text: `Error in ${this.props.componentName || 'component'}: ${this.state.error?.message || 'Unknown error'}`
            });
        }

        return this.props.children;
    }
}

// 便捷的错误报告函数
export const reportError = (error: Error, context?: FrontendErrorContext) => 
    FrontendErrorHandler.getInstance().reportError(error, context);

export const reportCustomError = (message: string, context?: FrontendErrorContext) => 
    FrontendErrorHandler.getInstance().reportCustomError(message, context);

// HOC用于包装组件以提供错误边界
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    componentName?: string
): React.ComponentType<P> {
    return (props: P) => React.createElement(
        ErrorBoundary,
        { componentName },
        React.createElement(Component, props)
    );
}

// 初始化前端错误处理
export function initializeFrontendErrorHandling(): void {
    FrontendErrorHandler.getInstance();
    $.Msg('[FrontendErrorHandler] Frontend error handling initialized');
}