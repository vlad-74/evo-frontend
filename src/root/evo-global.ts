import {evoLoggingAccessType} from "./evo/logging/debugger";
import { warn, color } from "./evo/logging/logger";

(window as any).evo = {
    debug: evoLoggingAccessType,
    log: {
        warn,
        color
    }
};
