import { TLoggingAccessType, TLoggingTypes, TAccessProcess } from "./root/evo/logging/debugger";

// Типы для цветов
type TColor = 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'white' | 'gray';

declare global {
    interface Window {
        evo: {
            debug: TLoggingAccessType;
            log: {
                /**
                 * warn - аналог console.warn с валидацией
                 * @param loggingType - тип логирования (logAll, logAwaitTryCatch)
                 * @param processName - название процесса (common, process1-10)
                 * @param messages - сообщения для логирования
                 *
                 * @example
                 * evo.log.warn('logAll', 'common', 'Сообщение предупреждения')
                 * evo.log.warn('logAwaitTryCatch', 'process1', 'Сообщение', 'еще сообщение')
                 */
                warn(
                    loggingType: TLoggingTypes,
                    processName: TAccessProcess,
                    ...messages: unknown[]
                ): void;

                /**
                 * log - обычное логирование с валидацией
                 * @param loggingType - тип логирования (logAll, logAwaitTryCatch)
                 * @param processName - название процесса (common, process1-10)
                 * @param messages - сообщения для логирования
                 *
                 * @example
                 * evo.log.log('logAll', 'common', 'Обычное сообщение')
                 */
                log(
                    loggingType: TLoggingTypes,
                    processName: TAccessProcess,
                    ...messages: unknown[]
                ): void;

                /**
                 * color - цветное логирование в консоли с валидацией
                 * @param color - цвет текста
                 * @param loggingType - тип логирования (logAll, logAwaitTryCatch)
                 * @param processName - название процесса (common, process1-10)
                 * @param messages - сообщения для логирования
                 *
                 * @example
                 * evo.log.color('red', 'logAll', 'common', 'Красное сообщение')
                 * evo.log.color('green', 'logAwaitTryCatch', 'process2', 'Зеленое сообщение')
                 */
                color(
                    color: TColor,
                    loggingType: TLoggingTypes,
                    processName: TAccessProcess,
                    ...messages: unknown[]
                ): void;
            };
        };
    }

    const evo: Window['evo'];
}

export {};
