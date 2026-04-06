import { Subject } from 'rxjs';

import { TEvo } from './evo-global-declare';

import { evoLoggingAccessType } from './evo/logging/debugger';
import { logService } from './evo/logging/logger';

import { DevicesLighthouse } from './evo/devices-screen/devices/devices.lighthouse';
import { devices } from './evo/devices-screen/devices/devices';
import { ScreenLighthouse } from './evo/devices-screen/screen/screen.lighthouse';
import { ScreenService } from './evo/devices-screen/screen/screen.service';
import { setupSubscriptions } from './evo/evo-subscriptions';

//------------------------------

const libraryDestroy$ = new Subject<void>();

// Этап 1: базовая инициализация (debug и log)
const evoStart = {
    // Метод для отписки от всех подписок и для очистки window.evo
    destroy(): void {
        libraryDestroy$.next();
        libraryDestroy$.complete();

        // Дополнительно очищаем ссылку на evo из window
        if ((window as any).evo === this) {
            delete (window as any).evo;
        }

        console.log('EVO destroyed - subscriptions & window');
    },
    debug: evoLoggingAccessType,
    log: logService,
};

// Этап 2: полная инициализация с остальными полями
export const evoBase: TEvo = {
    ...evoStart,
    help: 'раздел в разработке',
    devicesScreen: {
        devices: {
            l: new DevicesLighthouse(),
        },
        screen: {
            l: new ScreenLighthouse(),
            s: new ScreenService(),
        },
    },
};

(window as any).evo = evoBase;

//------------------------------

// Настройка подписок
setupSubscriptions(evo, libraryDestroy$);

// Эмитим (отправляем) начальную конфигурацию устройств в итоге получаем информацию об Экране
evo.devicesScreen.devices.l.send(devices);
