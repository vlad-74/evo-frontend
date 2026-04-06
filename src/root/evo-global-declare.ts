import { TLoggingAccessType } from './evo/logging/debugger';
import { TEvoLog } from './evo/logging/logger.interface';
import {IDevices} from "./evo/devices-screen/devices/devices";
import {ILighthouse} from "./evo/_lighthouse/_lighthouse.interface";
import {IScreenInfo} from "./evo/devices-screen/screen/screen.interfaces";
import {ScreenService} from "./evo/devices-screen/screen/screen.service";

/** Тип для EVO */
export type TEvo = {
    destroy: () => void;
    help: string;
    debug: TLoggingAccessType;
    log: TEvoLog;
    devicesScreen: {
        devices: {
            l: ILighthouse<IDevices>;
        };
        screen: {
            l: ILighthouse<IScreenInfo>;
            s: ScreenService,
        };
    }
};

declare global {
    interface Window {
        evo: TEvo;
    }

    const evo: TEvo;
}

export {};
