import { beforeLogging } from "./logger-validator";
import { TLoggingTypes, TAccessProcess } from "./debugger";

/** Цвета для консоли */
type TColor = 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'white' | 'gray';

const colorStyles: Record<TColor, string> = {
    red: 'color: #ff4444',
    green: 'color: #00ff00',
    blue: 'color: #4444ff',
    yellow: 'color: #ffff00',
    magenta: 'color: #ff44ff',
    cyan: 'color: #00ffff',
    white: 'color: #ffffff',
    gray: 'color: #888888'
};

    /**
     * Форматирует сообщение для вывода
     * @param loggingType - тип логирования
     * @param processName - название процесса
     * @param messages - сообщения для логирования
     * @returns отформатированная строка
     */
    function formatMessage(loggingType: TLoggingTypes, processName: TAccessProcess, messages: unknown[]): string {
        const timestamp = new Date().toISOString();
        const messageText = messages.map(msg => {
            if (typeof msg === 'object') {
                return JSON.stringify(msg, null, 2);
            }
            return String(msg);
        }).join(' ');

        return `[${timestamp}] [${loggingType}] [${processName}] ${messageText}`;
    }

    /**
     * warn - аналог console.warn с валидацией
     * @param loggingType - тип логирования (logAll, logAwaitTryCatch)
     * @param processName - название процесса
     * @param messages - сообщения для логирования
     *
     * @example
     * evo.log.warn('logAll', 'common', 'Сообщение предупреждения')
     * evo.log.warn('logAwaitTryCatch', 'process1', 'Сообщение', 'еще сообщение')
     */
    export function warn(
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ): void {
        const validationResult = beforeLogging([loggingType, processName, ...messages]);

        // Если валидация не пройдена - ничего не выводим
        if (!validationResult.validation.isValid) {
            return;
        }

        // Если валидация пройдена, выводим отформатированное сообщение
        const formattedMessage = formatMessage(loggingType, processName, validationResult.restArgs);
        console.warn(formattedMessage);
    }

    /**
     * color - цветное логирование в консоли с валидацией
     * @param color - цвет текста
     * @param loggingType - тип логирования (logAll, logAwaitTryCatch)
     * @param processName - название процесса
     * @param messages - сообщения для логирования
     *
     * @example
     * evo.log.color('red', 'logAll', 'common', 'Красное сообщение')
     * evo.log.color('green', 'logAwaitTryCatch', 'process2', 'Зеленое сообщение')
     */
    export function color(
        color: TColor,
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ): void {
        // Проверяем наличие цвета
        if (!colorStyles[color]) {
            return;
        }

        const validationResult = beforeLogging([loggingType, processName, ...messages]);

        // Если валидация не пройдена - ничего не выводим
        if (!validationResult.validation.isValid) {
            return;
        }

        // Если валидация пройдена, выводим цветное сообщение
        const formattedMessage = formatMessage(loggingType, processName, validationResult.restArgs);
        console.log(`%c${formattedMessage}`, colorStyles[color]);
    }

    /**
     * logSimple - упрощенное обычное логирование с фиксированными параметрами
     * @param msg - сообщение для логирования
     *
     * @example
     * evo.log.logSimple('Простое сообщение')
     */
    export function info(msg: unknown): void {
        log('logAll', 'common', msg);
    }

    /**
     * log - обычное логирование с валидацией
     * @param loggingType - тип логирования
     * @param processName - название процесса
     * @param messages - сообщения для логирования
     */
    export function log(
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ): void {
        const validationResult = beforeLogging([loggingType, processName, ...messages]);

        if (!validationResult.validation.isValid) {
            return;
        }

        const formattedMessage = formatMessage(loggingType, processName, validationResult.restArgs);
        console.log(formattedMessage);
    }

/**
// Успешное логирование (accessType: true, accessProcess включает 'common')
evo.log.warn('logAll', 'common', 'Тестовое сообщение');

// Не будет выведено, так как accessProcess пустой для logAwaitTryCatch
evo.log.warn('logAwaitTryCatch', 'common', 'Это сообщение не выведется');

// Цветное логирование
evo.log.color('red', 'logAll', 'common', 'Красное сообщение');

// Обычное логирование
evo.log.log('logAll', 'process1', 'Обычное сообщение');
*/
