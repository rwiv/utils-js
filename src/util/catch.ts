export function catchNull<T>(fn: () => T) {
  try {
    return fn();
  } catch (e) {
    return undefined;
  }
}

export function splitError<T>(fn: () => T): [(T | undefined), (unknown | undefined)] {
  let result: T | undefined = undefined;
  let err = undefined;
  try {
    result = fn();
  } catch (e) {
    err = e;
  }
  return [result, err];
}

export async function catchAnd<T>(fn: () => Promise<T>, catchLogic: (e: unknown) => Promise<void>) {
  try {
    return await fn();
  } catch (e) {
    await catchLogic(e);
  }
}
