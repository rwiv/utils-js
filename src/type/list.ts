export function subLists<T>(list: T[], n: number): T[][] {
  if (n <= 0) {
    throw new Error("n should be greater than 0");
  }

  const result: T[][] = [];
  let current: T[] = [];

  for (const elem of list) {
    if (current.length >= n) {
      result.push(current);
      current = [];
    }
    current.push(elem);
  }

  if (current.length > 0) {
    result.push(current);
  }

  return result;
}

export type IdxElem<T> = {idx: number, value: T};

export function subListsWithIdx<T>(list: T[], n: number): IdxElem<T>[][] {
  if (n <= 0) {
    throw new Error("n should be greater than 0");
  }

  const result: IdxElem<T>[][] = [];
  let current: IdxElem<T>[] = [];

  let cnt = 0;
  for (const elem of list) {
    if (current.length >= n) {
      result.push(current);
      current = [];
    }
    current.push({ idx: cnt, value: elem });
    cnt++;
  }

  if (current.length > 0) {
    result.push(current);
  }

  return result;
}

export function toMap<T>(arr: T[], getKeyFn: (elem: T, idx: number, elems: T[]) => string) {
  const result = new Map<string, T>();
  for (let i = 0; i < arr.length; i++) {
    const key = getKeyFn(arr[i], i, arr);
    result.set(key, arr[i]);
  }
  return result;
}

export function toListMap<T>(arr: T[], getKey: (elem: T, idx: number, elems: T[]) => string) {
  const result = new Map<string, T[]>();
  for (let i = 0; i < arr.length; i++) {
    const key = getKey(arr[i], i, arr);
    let value = result.get(key);
    if (result.get(key) === undefined) {
      value = [];
      result.set(key, value);
    }
    value?.push(arr[i]);
  }
  return result;
}

export function getFirstElem<T>(arr: T[], fn: (elem: T) => boolean) {
  for (const elem of arr) {
    if (fn(elem)) {
      return elem;
    }
  }
  return undefined;
}
