import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Сервис обмена сообщениями через BehaviorSubject.
 *
 * @template T Тип передаваемой конфигурации.
 *
 * @example
 * exchangeService.send({ type: 'openModal', payload: { id: 1 } });
 */
export class ExchangeService<T = unknown> {
    private readonly subject = new BehaviorSubject<T | null>(null);

    /**
     * Поток сообщений exchange.
     *
     * @returns {Observable<T | null>} Observable для подписки.
     */
    get stream$(): Observable<T | null> {
        return this.subject.asObservable();
    }

    /**
     * Отправляет конфиг всем подписчикам.
     *
     * @param {T} config - Произвольный конфиг.
     *
     * @example
     * exchangeService.send({ type: 'navigate', payload: '/home' });
     */
    send(config: T): void {
        this.subject.next(config);
    }

    /**
     * Очищает поток, отправляя null.
     *
     * @example
     * exchangeService.clear();
     */
    clear(): void {
        this.subject.next(null);
    }
}

/**
 * Глобальный экземпляр сервиса обмена для использования через $evo.
 *
 * @example
 * exchangeService.send({ type: 'reload' });
 */
export const exchangeService = new ExchangeService<unknown>();

