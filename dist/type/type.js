export function checkNaN(num) {
    let result = num;
    if (num !== undefined && isNaN(num)) {
        result = undefined;
    }
    return result;
}
export function checkNull(value) {
    if (value === undefined || value === null) {
        throw Error("value is null");
    }
    else {
        return value;
    }
}
