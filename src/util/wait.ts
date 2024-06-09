export function sleep(timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => resolve(), timeout);
  });
}

export async function waitForPromise(interval: number, fn: () => Promise<boolean>, timeout: number | undefined = undefined) {
  const startTime = new Date();
  while (!await fn()) {
    if (timeout !== undefined) {
      const curTime = new Date();
      if ((curTime.getTime() - startTime.getTime()) >= timeout) {
        throw Error("wait timeout");
      }
    }
    await sleep(interval);
  }
}

export async function waitFor(interval: number, fn: () => boolean, timeout: number | undefined = undefined) {
  const startTime = new Date();
  while (!fn()) {
    if (timeout !== undefined) {
      const curTime = new Date();
      if ((curTime.getTime() - startTime.getTime()) >= timeout) {
        throw Error("wait timeout");
      }
    }
    await sleep(interval);
  }
}
