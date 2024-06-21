interface RetryOption {
    limit: number;
    delay?: number;
    msg?: string;
    final?: (() => any);
    firstSkip?: boolean;
}
export declare class RetryStopException extends Error {
    constructor(msg: string, cause?: string | undefined);
}
export declare class ForRetryException extends Error {
    constructor(msg: string, cause?: string | undefined);
}
export declare function Retry(limit: number, msg?: string | undefined, delay?: number | undefined): (target: any, property: string, descriptor: PropertyDescriptor) => void;
export declare function retry<T>(fn: (cnt: number) => T, opt: RetryOption): T;
export declare function retryAsync<T>(fn: (cnt: number) => Promise<T>, opt: RetryOption): Promise<T>;
export declare function retryNullAsync<T>(fn: (cnt: number) => Promise<T>, opt: RetryOption): Promise<T | null>;
export {};
