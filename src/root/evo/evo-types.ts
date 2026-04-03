import { TLoggingAccessType, TLoggingTypes, TAccessProcess } from './logging/debugger';

export type TColor = 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'white' | 'gray';

export type TEvoLog = {
    warn: (
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ) => void;
    color: (
        color: TColor,
        loggingType: TLoggingTypes,
        processName: TAccessProcess,
        ...messages: unknown[]
    ) => void;
    info: (msg: any) => void;
};

export type TEvo = {
    debug: TLoggingAccessType;
    log: TEvoLog;
};
