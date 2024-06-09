export function findCsvValue(rowChunks, headerName) {
    const { values, headerNames } = rowChunks;
    const idx = headerNames.indexOf(headerName);
    return values[idx];
}
export function findCsvBool(rowChunks, headerName) {
    const { values, headerNames } = rowChunks;
    const idx = headerNames.indexOf(headerName);
    const regex = /true/i;
    return values[idx].match(regex) !== null;
}
export function findCsvInt(rowChunks, headerName) {
    const { values, headerNames } = rowChunks;
    const idx = headerNames.indexOf(headerName);
    let result = parseInt(values[idx]);
    if (isNaN(result)) {
        result = undefined;
    }
    return result;
}
