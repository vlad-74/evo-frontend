import { evoLoggingAccessType } from './evo/logging/debugger';
import { warn, color, info } from './evo/logging/logger';
import { TEvo } from './evo/evo-types';

const evo: TEvo = {
    debug: evoLoggingAccessType,
    log: {
        warn,
        color,
        info,
    },
};

(window as any).evo = evo;
