interface RowChunks {
  values: string[];
  headerNames: string[];
}

export function findCsvValue(rowChunks: RowChunks, headerName: string) {
  const { values, headerNames } = rowChunks;
  const idx = headerNames.indexOf(headerName);
  return values[idx];
}

export function findCsvBool(rowChunks: RowChunks, headerName: string) {
  const { values, headerNames } = rowChunks;
  const idx = headerNames.indexOf(headerName);
  const regex = /true/i;
  return values[idx].match(regex) !== null;
}

export function findCsvInt(rowChunks: RowChunks, headerName: string) {
  const { values, headerNames } = rowChunks;
  const idx = headerNames.indexOf(headerName);
  let result: number | undefined = parseInt(values[idx]);
  if (isNaN(result)) {
    result = undefined;
  }
  return result;
}
