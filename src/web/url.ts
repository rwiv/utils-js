// remove query string
export function rmQS(url: string) {
  const chunks = url.split("?");
  return chunks[0];
}
