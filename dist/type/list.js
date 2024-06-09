export function subLists(origin, n) {
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
export function subListsWithIdx(origin, n) {
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
function walk(list, fn) {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        fn(list[i], result, i);
    }
    return result;
}
