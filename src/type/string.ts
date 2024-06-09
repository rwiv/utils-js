export function concatString(a: string, b: string, sep: string) {
  let prefix = a;
  if (!prefix.endsWith(sep)) {
    prefix += sep;
  }
  return prefix + b;
}
