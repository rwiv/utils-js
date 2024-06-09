export function delay(timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timeout);
    });
}
export async function waitForAsync(interval, fn, timeout = undefined) {
    const startTime = new Date();
    while (!await fn()) {
        if (timeout !== undefined) {
            const curTime = new Date();
            if ((curTime.getTime() - startTime.getTime()) >= timeout) {
                throw Error("wait timeout");
            }
        }
        await delay(interval);
    }
}
export async function waitFor(interval, fn, timeout = undefined) {
    const startTime = new Date();
    while (!fn()) {
        if (timeout !== undefined) {
            const curTime = new Date();
            if ((curTime.getTime() - startTime.getTime()) >= timeout) {
                throw Error("wait timeout");
            }
        }
        await delay(interval);
    }
}
