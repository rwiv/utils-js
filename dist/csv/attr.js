export function findValue(rowChunks, headerName) {
    const { values, headerNames } = rowChunks;
    const idx = headerNames.indexOf(headerName);
    return values[idx];
}
export function findValueBool(rowChunks, headerName) {
    const { values, headerNames } = rowChunks;
    const idx = headerNames.indexOf(headerName);
    const regex = /true/i;
    return values[idx].match(regex) !== null;
}
export function findValueInt(rowChunks, headerName) {
    const { values, headerNames } = rowChunks;
    const idx = headerNames.indexOf(headerName);
    let result = parseInt(values[idx]);
    if (isNaN(result)) {
        result = undefined;
    }
    return result;
}
