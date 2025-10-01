/**
 * 时间工具函数 - Lua兼容
 * Time Utilities - Lua Compatible
 */

/**
 * 获取当前时间戳（秒）
 * Lua兼容版本，使用游戏时间而不是系统时间
 */
export function getTimestamp(): number {
    // 使用游戏时间作为时间戳
    return GameRules.GetGameTime();
}

/**
 * 获取当前时间戳（毫秒模拟）
 * 注意：这不是真实的毫秒时间戳，只是游戏时间 * 1000
 */
export function getTimestampMs(): number {
    return GameRules.GetGameTime() * 1000;
}

