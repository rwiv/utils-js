export declare function catchNull<T>(fn: () => T): T | undefined;
export declare function splitError<T>(fn: () => T): [(T | undefined), (unknown | undefined)];
export declare function catchAnd<T>(fn: () => Promise<T>, catchLogic: (e: unknown) => Promise<void>): Promise<T | undefined>;
