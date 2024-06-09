export function removeQueryString(url) {
    const chunks = url.split("?");
    return chunks[0];
}
