import {TEvo} from './evo-global-declare';

import { evoLoggingAccessType } from './evo/logging/debugger';
import { logService } from './evo/logging/logger';

const evo: TEvo = {
    help: 'в разработке_7',
    debug: evoLoggingAccessType,
    log: logService,
};

(window as any).evo = evo;
