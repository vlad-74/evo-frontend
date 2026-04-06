import {TEvo} from '../global';

import { evoLoggingAccessType } from './evo/logging/debugger';
import { logService } from './evo/logging/logger';

const evo: TEvo = {
    debug: evoLoggingAccessType,
    log: logService,
};

(window as any).evo = evo;
