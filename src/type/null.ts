export function checkNaN(num: number | undefined) {
  let result = num;
  if (num !== undefined && isNaN(num)) {
    result = undefined;
  }
  return result;
}

export function checkNull<T>(value: T | undefined | null) {
  if (value === undefined || value === null) {
    throw Error("value is null");
  } else {
    return value;
  }
}
