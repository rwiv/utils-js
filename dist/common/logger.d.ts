declare class Logger {
    error(message: any): void;
    warn(message: any): void;
    info(message: any): void;
    debug(message: any): void;
    silly(message: any): void;
    private getMsg;
}
export declare const logger: Logger;
export {};
