class Result<T> {
  constructor(
    public readonly ok: T | undefined,
    public readonly err: unknown | undefined,
  ) {
  }

  getOrNull(): T | undefined | null {
    if (this.err !== undefined) {
      return null;
    } else {
      return this.ok;
    }
  }

  onFailure(fn: (err: unknown) => void) {
    if (this.err !== undefined) {
      fn(this.err);
    }
    return this;
  }

  async onFailureAsync(fn: (err: unknown) => Promise<void>) {
    if (this.err !== undefined) {
      await fn(this.err);
    }
    return this;
  }
}

export function runCatching<T>(fn: () => T): Result<T> {
  let ok: T | undefined = undefined;
  let err = undefined;
  try {
    ok = fn();
  } catch (e) {
    err = e;
  }
  return new Result(ok, err);
}

export async function runCatchingAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
  let ok: T | undefined = undefined;
  let err = undefined;
  try {
    ok = await fn();
  } catch (e) {
    err = e;
  }
  return new Result(ok, err);
}
