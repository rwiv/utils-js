export function removeQueryString(url: string) {
  const chunks = url.split("?");
  return chunks[0];
}
