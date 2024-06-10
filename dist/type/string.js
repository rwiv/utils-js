export function concatString(a, b, sep) {
    let mid = "";
    if (!a.endsWith(sep)) {
        mid = sep;
    }
    if (b.startsWith(sep)) {
        mid = "";
    }
    return a + mid + b;
}
export function concatStringNotDuplicated(a, b, sep) {
    let prefix = a;
    let mid = "";
    const checkLeft = a.endsWith(sep);
    const checkRight = b.startsWith(sep);
    if (!checkLeft) {
        mid = sep;
    }
    if (checkRight) {
        mid = "";
    }
    if (checkLeft && checkRight) {
        prefix = prefix.slice(0, a.length - 1);
    }
    return prefix + mid + b;
}
export function mergeIntersectedStrings(str1, str2) {
    for (let i = 0; i < str1.length; i++) {
        if (str2.startsWith(str1.substring(i))) {
            return str1.substring(0, i) + str2;
        }
    }
    return str1 + str2;
}
