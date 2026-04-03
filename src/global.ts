import {TEvo} from './root/evo/evo-types';

declare global {
    interface Window {
        evo: TEvo;
    }

    const evo: TEvo;
}

export {};
