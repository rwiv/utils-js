// remove query string
export function rmQS(url) {
    const chunks = url.split("?");
    return chunks[0];
}
