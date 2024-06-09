class Result {
    ok;
    err;
    constructor(ok, err) {
        this.ok = ok;
        this.err = err;
    }
    getOrNull() {
        if (this.err !== undefined) {
            return null;
        }
        else {
            return this.ok;
        }
    }
    onFailure(fn) {
        if (this.err !== undefined) {
            fn(this.err);
        }
        return this;
    }
    async onFailureAsync(fn) {
        if (this.err !== undefined) {
            await fn(this.err);
        }
        return this;
    }
}
export function runCatching(fn) {
    let ok = undefined;
    let err = undefined;
    try {
        ok = fn();
    }
    catch (e) {
        err = e;
    }
    return new Result(ok, err);
}
export async function runCatchingAsync(fn) {
    let ok = undefined;
    let err = undefined;
    try {
        ok = await fn();
    }
    catch (e) {
        err = e;
    }
    return new Result(ok, err);
}
