import { isDevLoggingEnabled } from './loggingDevMode';

/**
 * Конфиг одного канала отладки.
 */
export interface DebugConfigItem {
    type: string;
    text: string;
    value: string | string[] | boolean;
}

/**
 * Конфиг логирования с возможной цветной консолью.
 */
export interface EvoLogConfig extends DebugConfigItem {
    color?: string;
    text?: string;
    background?: string;
}

/**
 * Глобальный объект конфигурации отладки.
 * Значения можно изменять из внешних приложений.
 *
 * @example
 * debug.screen.value = true;
 */
export const debug: Record<string, DebugConfigItem> = {
    screen: { type: 'screen', text: '--- screen', value: false },
    tryCatchError: { type: 'tryCatchError', text: '[tryCatch] error', value: false }
};

/**
 * Проверяет, нужно ли логировать для указанного конфига.
 *
 * @param {DebugConfigItem} config - Конфигурация канала.
 * @returns {boolean} true, если логирование разрешено.
 */
export function shouldLog(config: DebugConfigItem): boolean {
    const value = config.value;
    if (value === false) return false;
    if (value === true) return true;
    if (Array.isArray(value)) return value.length > 0;

    return typeof value === 'string' ? value.length > 0 : false;
}

/**
 * Базовая функция логирования через console.warn.
 *
 * @param {EvoLogConfig} config - Конфиг логирования.
 * @param {...unknown[]} args - Данные для вывода.
 *
 * @example
 * logWarn(debug.screen, 'Текущее состояние', state);
 */
export function logWarn(config: EvoLogConfig, ...args: unknown[]): void {
    if (!isDevLoggingEnabled()) return;
    if (!config || !shouldLog(config)) return;
    if (args.length === 0) return;
    const text = config.text || 'debug';
    // eslint-disable-next-line no-console
    console.warn(text, ...args);
}

/**
 * Цветное логирование через console.warn.
 *
 * @param {EvoLogConfig} config - Конфиг логирования с цветами.
 * @param {...unknown[]} args - Данные для вывода.
 *
 * @example
 * logColor({ ...debug.screen, color: '#fff', background: '#007acc', value: true }, 'Screen debug');
 */
export function logColor(config: EvoLogConfig, ...args: unknown[]): void {
    if (!isDevLoggingEnabled()) return;
    if (!config || !shouldLog(config)) return;
    if (args.length === 0) return;
    const text = config.text || 'debug';
    const color = config.color ?? '#ffffff';
    const background = config.background ?? '#007acc';
    const style = `background: ${background}; color: ${color}; padding: 2px 4px; border-radius: 2px;`;
    // eslint-disable-next-line no-console
    console.warn(`%c${text}`, style, ...args);
}
