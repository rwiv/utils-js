export declare function sleep(timeout: number): Promise<void>;
export declare function waitForPromise(interval: number, fn: () => Promise<boolean>, timeout?: number | undefined): Promise<void>;
export declare function waitFor(interval: number, fn: () => boolean, timeout?: number | undefined): Promise<void>;
