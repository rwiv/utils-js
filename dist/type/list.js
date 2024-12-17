export function subLists(list, n) {
    if (n <= 0) {
        throw new Error("n should be greater than 0");
    }
    const result = [];
    let current = [];
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
export function subListsWithIdx(list, n) {
    if (n <= 0) {
        throw new Error("n should be greater than 0");
    }
    const result = [];
    let current = [];
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
export function toMap(arr, getKeyFn) {
    const result = new Map();
    for (let i = 0; i < arr.length; i++) {
        const key = getKeyFn(arr[i], i, arr);
        result.set(key, arr[i]);
    }
    return result;
}
export function toListMap(arr, getKey) {
    const result = new Map();
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
export function getFirstElem(arr, fn) {
    for (const elem of arr) {
        if (fn(elem)) {
            return elem;
        }
    }
    return undefined;
}
