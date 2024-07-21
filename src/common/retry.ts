interface RetryOption {
  limit: number;
  delay?: number;
  msg?: string;
  final?: (() => any);
  firstSkip?: boolean;
}

export class RetryStopException extends Error {
  constructor(msg: string, cause: string | undefined = undefined) {
    super(msg, {cause});
  }
}

export class ForRetryException extends Error {
  constructor(msg: string, cause: string | undefined = undefined) {
    super(msg, {cause});
  }
}

export function Retry(
  limit: number,
  msg: string | undefined = undefined,
  delay: number | undefined = undefined,
) {
  return function (target: any, property: string, descriptor: PropertyDescriptor) {
    let originMethod = descriptor.value;
    // promise, return
    // promise, throw
    // no promise, return
    // no promise, throw
    descriptor.value = function (...args: any) {

      let firstTry: any = undefined;
      let err: any | undefined = undefined;
      try {
        firstTry = originMethod.apply(this, args);
      } catch (e) {
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
        } else {
          return originMethod.apply(this, args);
        }
      }, { limit, delay, msg });
    };
  };
}

export function retry<T>(
  fn: (cnt: number) => T,
  opt: RetryOption,
) {
  return retryTemplate(fn, opt, e => {
    throw e;
  });
}

export function retryAsync<T>(
  fn: (cnt: number) => Promise<T>,
  opt: RetryOption,
) {
  return retryTemplateAsync(fn, opt, e => {
    throw e;
  });
}

export async function retryNullAsync<T>(
  fn: (cnt: number) => Promise<T>,
  opt: RetryOption,
) {
  return retryTemplateAsync(fn, opt, () => {
    return null;
  });
}

function retryTemplate<T, F>(
  fn: (cnt: number) => T,
  opt: RetryOption,
  fail: (e: any) => F,
) {
  if (opt.limit < 1) {
    throw Error("limit cannot be less than 1");
  }
  let err;
  for (let i = opt?.firstSkip ? 1 : 0; i < opt.limit + 1; i++) {
    try {
      if (i > 0) {
        console.log(`start retry ${i}${getCtxMsg(opt.msg)}`);
      }
      return fn(i);
    } catch (e) {
      err = e;
      if (e instanceof RetryStopException) {
        break;
      }
    } finally {
      if (opt?.final !== undefined) {
        opt?.final();
      }
    }
  }
  console.log("retry failure!");
  return fail(err);
}

async function retryTemplateAsync<T, F>(
  fn: (cnt: number) => Promise<T>,
  opt: RetryOption,
  fail: (e: any) => F,
) {
  if (opt.limit < 1) {
    throw Error("limit cannot be less than 1");
  }
  let err;
  for (let i = opt?.firstSkip ? 1 : 0; i < opt.limit + 1; i++) {
    try {
      if (i > 0) {
        console.log(`start retry ${i}${getCtxMsg(opt.msg)}`);
      }
      return await fn(i);
    } catch (e) {
      err = e;
      if (e instanceof RetryStopException) {
        break;
      }
    } finally {
      if (opt?.final !== undefined) {
        const final = opt?.final();
        if (final instanceof Promise) {
          await final;
        }
      }
    }
  }
  console.log("retry failure!");
  let result = fail(err);
  if (result instanceof Promise) {
    result = await result;
  }
  return result;
}

function getCtxMsg(msg: string | undefined) {
  return msg !== undefined ? `: ${msg}` : "";
}
