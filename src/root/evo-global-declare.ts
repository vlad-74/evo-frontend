import { TLoggingAccessType } from './evo/logging/debugger';
import { TEvoLog } from './evo/logging/logger.interface';
import {IDevicesScreen} from "./evo/devices-screen/devices-screen";

/** Тип для EVO */
export type TEvo = {
    destroy: () => void;
    help: string;
    debug: TLoggingAccessType;
    log: TEvoLog;
    devicesScreen: IDevicesScreen
};

declare global {
    interface Window {
        evo: TEvo;
    }

    const evo: TEvo;
}

export {};
