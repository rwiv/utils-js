export function matchAll(str, regex) {
    let match;
    const results = [];
    while ((match = regex.exec(str)) !== null) {
        results.push(match);
    }
    return results;
}
