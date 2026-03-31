import { Subscription } from 'rxjs';

import { ExchangeService } from './exchange.service';

/**
 * Базовый класс для подписки на ExchangeService.
 * Отписка должна выполняться в наследуемом классе.
 *
 * @template T Тип передаваемой конфигурации.
 *
 * @example
 * class MyComponent extends ExchangeClass<MyConfig> implements OnDestroy {
 *   private exchangeSub: Subscription;
 *
 *   constructor() {
 *     super(exchangeService);
 *     this.exchangeSub = this.subscribeExchange(config => {
 *       // обработка конфига
 *     });
 *   }
 *
 *   ngOnDestroy(): void {
 *     this.exchangeSub.unsubscribe();
 *   }
 * }
 */
export abstract class ExchangeClass<T = unknown> {
    /**
     * Создаёт базовый класс обмена.
     *
     * @param {ExchangeService<T>} exchangeService - Экземпляр сервиса обмена.
     */
    protected constructor(protected readonly exchangeService: ExchangeService<T>) {}

    /**
     * Подписывается на поток exchange и возвращает Subscription.
     * Отписку должен выполнить класс-наследник.
     *
     * @param {(config: T | null) => void} handler - Обработчик сообщений.
     * @returns {Subscription} Подписка для последующей отписки.
     *
     * @example
     * this.exchangeSub = this.subscribeExchange(cfg => { ... });
     */
    protected subscribeExchange(handler: (config: T | null) => void): Subscription {
        return this.exchangeService.stream$.subscribe(handler);
    }
}

