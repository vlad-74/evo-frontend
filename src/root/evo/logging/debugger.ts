/** Режим разработки, для логирования */
const isLocalhost = window.location.hostname === 'localhost';

/** Типы логирования */
export type TLoggingTypes = 'logAll' | 'logAwaitTryCatch';

/** Процесс логирования */
export type TAccessProcess = 'common' | 'process1' | 'process2' | 'process3' | 'process4' | 'process5'  | 'process6' | 'process7' | 'process8' | 'process9' | 'process10';

/** Интерфейс для каждого поля отладчика */
interface IDebugger {
    accessType: boolean; // доступ к логированию типа
    isLocalhost: boolean; // режим разработки
    accessProcess: TAccessProcess[]
}

/** Тип для объекта логирования */
export type TLoggingAccessType = Record<TLoggingTypes, IDebugger>;

/**
 * Инструмент предостваления доступа к логированию ТИПОВ
 *
 * - доступ редостваляется по значению у accessType и у accessProcess
 * - isLocalhost - автоматом получает - от const isLocalhost
 */
export const evoLoggingAccessType: TLoggingAccessType = {
    // logAll - доступ ко ВСЕМУ логированию, может меняться только значение для accessType
    logAll: { accessType: true, accessProcess: ['common'], isLocalhost },
    logAwaitTryCatch: { accessType: true, accessProcess: [], isLocalhost },
};
