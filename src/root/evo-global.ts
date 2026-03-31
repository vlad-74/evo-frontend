import { debug, logColor, logWarn } from './logging';
import { tryCatchAwait } from './try-catch-await';
import { exchangeService, ExchangeService } from './exchange/exchange.service';

/**
 * API логирования для глобального объекта $evo.
 */
export interface EvoLogApi {
    /**
     * Логирование через console.warn.
     *
     * @example
     * $evo.log.warn(debug.screen, 'state', state);
     */
    warn: typeof logWarn;

    /**
     * Цветное логирование через console.warn.
     *
     * @example
     * $evo.log.color({ ...debug.screen, value: true }, 'color log');
     */
    color: typeof logColor;
}

/**
 * Глобальный интерфейс $evo.
 */
export interface EvoGlobal {
    /**
     * Объект логирования.
     */
    log: EvoLogApi;

    /**
     * Обёртка над промисами с try/catch.
     */
    tryCatchAwait: typeof tryCatchAwait;

    /**
     * Глобальный объект конфигурации отладки.
     */
    debug: typeof debug;

    /**
     * Глобальный сервис обмена.
     */
    exchangeService: ExchangeService<unknown>;
}

/**
 * Инициализирует или расширяет глобальный объект $evo.
 *
 * @returns {EvoGlobal} Инициализированный объект $evo.
 *
 * @example
 * const evo = initEvoGlobal();
 */
export function initEvoGlobal(): EvoGlobal {
    const globalAny = globalThis as any;
    const existing: Partial<EvoGlobal> = globalAny.$evo ?? {};

    const evo: EvoGlobal = {
        log: existing.log ?? {
            warn: logWarn,
            color: logColor
        },
        tryCatchAwait: existing.tryCatchAwait ?? tryCatchAwait,
        debug: existing.debug ?? debug,
        exchangeService: existing.exchangeService ?? exchangeService
    };

    globalAny.$evo = evo;

    return evo;
}

/**
 * Текущий глобальный объект $evo.
 *
 * @example
 * $evo.log.warn(debug.screen, 'message');
 */
export const evoGlobal: EvoGlobal = initEvoGlobal();

declare global {
    // eslint-disable-next-line no-var
    var $evo: EvoGlobal;

    interface Window {
        $evo: EvoGlobal;
    }

}

export {};

