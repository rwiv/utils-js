export function catchNull(fn) {
    try {
        return fn();
    }
    catch (e) {
        return undefined;
    }
}
export function splitError(fn) {
    let result = undefined;
    let err = undefined;
    try {
        result = fn();
    }
    catch (e) {
        err = e;
    }
    return [result, err];
}
export async function catchAnd(fn, catchLogic) {
    try {
        return await fn();
    }
    catch (e) {
        await catchLogic(e);
    }
}
