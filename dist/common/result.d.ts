declare class Result<T> {
    readonly ok: T | undefined;
    readonly err: unknown | undefined;
    constructor(ok: T | undefined, err: unknown | undefined);
    getOrNull(): T | undefined | null;
    onFailure(fn: (err: unknown) => void): void;
    onFailureAsync(fn: (err: unknown) => Promise<void>): Promise<void>;
}
export declare function runCatching<T>(fn: () => T): Result<T>;
export {};
