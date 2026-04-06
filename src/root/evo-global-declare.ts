import {TLoggingAccessType} from './evo/logging/debugger';
import {TEvoLog} from './evo/logging/logger';

/** Тип для EVO */
export type TEvo = {
    help: string;
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
