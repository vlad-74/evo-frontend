import {TLoggingAccessType} from './root/evo/logging/debugger';
import {TEvoLog} from './root/evo/logging/logger';

/** Тип для EVO */
export type TEvo = {
    debug: TLoggingAccessType;
    log: TEvoLog;
};

declare global {
    interface Window {
        evo: TEvo;
    }

    const evo: TEvo;
}

export {};
