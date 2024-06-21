import { logger } from "./logger.js";
export class RetryStopException extends Error {
    constructor(msg, cause = undefined) {
        super(msg, { cause });
    }
}
export class ForRetryException extends Error {
    constructor(msg, cause = undefined) {
        super(msg, { cause });
    }
}
export function Retry(limit, msg = undefined, delay = undefined) {
    return function (target, property, descriptor) {
        let originMethod = descriptor.value;
        // promise, return
        // promise, throw
        // no promise, return
        // no promise, throw
        descriptor.value = function (...args) {
            let firstTry = undefined;
            let err = undefined;
            try {
                firstTry = originMethod.apply(this, args);
            }
            catch (e) {
                err = e;
            }
            // no promise
            if (!(firstTry instanceof Promise)) {
                // return
                if (err === undefined) {
                    return firstTry;
                }
                // throw
                else {
                    return retry(() => {
                        return originMethod.apply(this, args);
                    }, { limit, delay, msg, firstSkip: true });
                }
            }
            // promise
            return retryAsync((cnt) => {
                if (cnt === 0) {
                    return firstTry;
                }
                else {
                    return originMethod.apply(this, args);
                }
            }, { limit, delay, msg });
        };
    };
}
export function retry(fn, opt) {
    return retryTemplate(fn, opt, e => {
        throw e;
    });
}
export function retryAsync(fn, opt) {
    return retryTemplateAsync(fn, opt, e => {
        throw e;
    });
}
export async function retryNullAsync(fn, opt) {
    return retryTemplateAsync(fn, opt, () => {
        return null;
    });
}
function retryTemplate(fn, opt, fail) {
    if (opt.limit < 1) {
        throw Error("limit cannot be less than 1");
    }
    let err;
    for (let i = opt?.firstSkip ? 1 : 0; i < opt.limit + 1; i++) {
        try {
            if (i > 0) {
                logger.warn(`start retry ${i}${getCtxMsg(opt.msg)}`);
            }
            return fn(i);
        }
        catch (e) {
            err = e;
            if (e instanceof RetryStopException) {
                break;
            }
        }
        finally {
            if (opt?.final !== undefined) {
                opt?.final();
            }
        }
    }
    logger.warn("retry failure!");
    return fail(err);
}
async function retryTemplateAsync(fn, opt, fail) {
    if (opt.limit < 1) {
        throw Error("limit cannot be less than 1");
    }
    let err;
    for (let i = opt?.firstSkip ? 1 : 0; i < opt.limit + 1; i++) {
        try {
            if (i > 0) {
                logger.warn(`start retry ${i}${getCtxMsg(opt.msg)}`);
            }
            return await fn(i);
        }
        catch (e) {
            err = e;
            if (e instanceof RetryStopException) {
                break;
            }
        }
        finally {
            if (opt?.final !== undefined) {
                const final = opt?.final();
                if (final instanceof Promise) {
                    await final;
                }
            }
        }
    }
    logger.warn("retry failure!");
    let result = fail(err);
    if (result instanceof Promise) {
        result = await result;
    }
    return result;
}
function getCtxMsg(msg) {
    return msg !== undefined ? `: ${msg}` : "";
}
