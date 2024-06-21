export function matchAll(str: string, regex: RegExp): RegExpExecArray[] {
  let match;
  const results = [];
  while ((match = regex.exec(str)) !== null) {
    results.push(match);
  }
  return results;
}
