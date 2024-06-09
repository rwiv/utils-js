export function subLists<T>(origin: T[], n: number) {
  const copy = [...origin];
  const result: T[][] = [];
  while (copy.length !== 0) {
    const sub: T[] = [];
    for (let i = 0; i < n; i++) {
      const elem = copy.shift();
      if (elem === undefined) break;
      sub.push(elem);
    }
    result.push(sub);
  }
  return result;
}

export type IdxElem<T> = {idx: number, value: T};

export function subListsWithIdx<T>(origin: T[], n: number) {
  const copy = [...origin];
  const result: IdxElem<T>[][] = [];
  let cnt = 0;
  while (copy.length !== 0) {
    const sub: IdxElem<T>[] = [];
    for (let i = 0; i < n; i++) {
      const elem = copy.shift();
      if (elem === undefined) break;
      sub.push({ idx: cnt, value: elem });
      cnt++;
    }
    result.push(sub);
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
