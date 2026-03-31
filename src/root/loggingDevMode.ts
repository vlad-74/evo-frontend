/**
 * Определяет, включено ли логирование в режиме разработки.
 * По умолчанию ориентируется на localhost.
 *
 * @returns {boolean} true, если логирование разрешено.
 *
 * @example
 * if (isDevLoggingEnabled()) {
 *   // безопасно логировать
 * }
 */
export function isDevLoggingEnabled(): boolean {
    if (typeof window === 'undefined' || !window.location) return false;
    const host = window.location.hostname;
    return host === 'localhost' || host === '127.0.0.1';
}

