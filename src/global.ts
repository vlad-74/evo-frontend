declare global {
    interface Window {
        $evo: {
            log(message: string): void;
            debug: string;
        };
    }

    const $evo: Window['$evo'];
}

export {};
