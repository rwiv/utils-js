export function subArrays(origin, n) {
    const copy = [...origin];
    const result = [];
    while (copy.length !== 0) {
        const sub = [];
        for (let i = 0; i < n; i++) {
            const elem = copy.shift();
            if (elem === undefined)
                break;
            sub.push(elem);
        }
        result.push(sub);
    }
    return result;
}
export function subArraysWithIdx(origin, n) {
    const copy = [...origin];
    const result = [];
    let cnt = 0;
    while (copy.length !== 0) {
        const sub = [];
        for (let i = 0; i < n; i++) {
            const elem = copy.shift();
            if (elem === undefined)
                break;
            sub.push({ idx: cnt, value: elem });
            cnt++;
        }
        result.push(sub);
    }
    return result;
}
export function toMap(arr, getKey) {
    const result = new Map();
    for (let i = 0; i < arr.length; i++) {
        const key = getKey(arr[i], i, arr);
        result.set(key, arr[i]);
    }
    return result;
}
export function toArrayMap(arr, getKey) {
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
export function first(arr, fn) {
    for (const elem of arr) {
        if (fn(elem)) {
            return elem;
        }
    }
    return undefined;
}
function traversal(list, fn) {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        fn(list[i], result, i);
    }
    return result;
}
