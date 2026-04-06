import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TEvo } from './evo-global-declare';

import { evoLoggingAccessType } from './evo/logging/debugger';
import { logService } from './evo/logging/logger';

import { DevicesLighthouse } from "./evo/devices-screen/devices/devices.lighthouse";
import { devices, IDevices } from "./evo/devices-screen/devices/devices";
import {ScreenLighthouse} from "./evo/devices-screen/screen/screen.lighthouse";
import {IScreenInfo} from "./evo/devices-screen/screen/screen.interfaces";
import {ScreenService} from "./evo/devices-screen/screen/screen.service";

//------------------------------

const destroy$ = new Subject<void>();

// Этап 1: базовая инициализация (debug и log)
const evo = {
    // Метод для отписки от всех подписок
    destroy(): void {
        destroy$.next();
        destroy$.complete();

        // Дополнительно очищаем ссылку на evo из window
        if ((window as any).evo === this) {
            delete (window as any).evo;
        }

        console.log('EVO All subscriptions destroyed');
    },
    debug: evoLoggingAccessType,
    log: logService,
};

// Этап 2: полная инициализация с остальными полями

export const evoBase: TEvo = {
    ...evo,
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

// Подписываемся на изменения devices с использованием takeUntil
evoBase.devicesScreen.devices.l.lighthouse$
    .pipe(takeUntil(destroy$))
    .subscribe((devicesConfig: IDevices | null) => {
        if (devicesConfig) {
            evoBase.log.warn('devices', 'common', 'Подписка на devices - ', devicesConfig);

            const screen =  evoBase.devicesScreen.screen.s.getScreen(devicesConfig)
            evoBase.devicesScreen.screen.l.send(screen);
        }
    });

evoBase.devicesScreen.screen.l.lighthouse$
    .pipe(takeUntil(destroy$))
    .subscribe((screenConfig: IScreenInfo | null) => {
        if (screenConfig) {
            evoBase.log.warn('screen', 'common', 'Подписка на screen - ', screenConfig);
        }
    });

// Эмитим (отправляем) начальную конфигурацию устройств
evoBase.devicesScreen.devices.l.send(devices);

(window as any).evo = evoBase;
