import { debug, logWarn } from './logging';

/**
 * Обёртка над промисом с try/catch и единообразным результатом.
 *
 * @template T Тип результата промиса.
 * @param {Promise<T>} promise - Промис для выполнения.
 * @param {[string?, string?] | null} [texts=null] - Пара [text, textError] для сообщений.
 *
 * @returns {Promise<[T | null, unknown]>} Кортеж [результат, ошибка].
 *
 * @example
 * const [result, error] = await tryCatchAwait(apiCall());
 * if (error) {
 *   // обработка ошибки
 * }
 */
export async function tryCatchAwait<T>(
    promise: Promise<T>,
    texts: [string?, string?] | null = null
): Promise<[T | null, unknown]> {
    const [text, textError] = texts ?? [
        '[tryCatchAwait] success',
        '[tryCatchAwait] error'
    ];
    try {
        const result = await promise;

        if (text && debug.screen) {
            logWarn({ ...debug.screen, text, value: debug.screen.value }, result);
        }

        return [result, null];
    } catch (error) {
        if (debug.tryCatchError) {
            logWarn(
                { ...debug.tryCatchError, text: textError ?? debug.tryCatchError.text },
                error
            );
        }

        return [null, error];
    }
}

