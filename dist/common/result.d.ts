declare class Result<T> {
    readonly ok: T | undefined;
    readonly err: unknown | undefined;
    constructor(ok: T | undefined, err: unknown | undefined);
    getOrNull(): T | undefined | null;
    onFailure(fn: (err: unknown) => void): this;
    onFailureAsync(fn: (err: unknown) => Promise<void>): Promise<this>;
}
export declare function runCatching<T>(fn: () => T): Result<T>;
export declare function runCatchingAsync<T>(fn: () => Promise<T>): Promise<Result<T>>;
export {};
