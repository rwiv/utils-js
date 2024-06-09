export function concatString(a, b, sep) {
    let prefix = a;
    if (!prefix.endsWith(sep)) {
        prefix += sep;
    }
    return prefix + b;
}
