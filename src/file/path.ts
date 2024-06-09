import path from "path";

export function getFilename(path: string) {
  const chunks = path.split(/[\\/]/);
  return chunks[chunks.length - 1];
}

export function getDirPath(pathString: string, sep: string = path.sep) {
  const chunks = pathString.split(sep);
  chunks.pop();
  return chunks.join(sep);
}

export function getExt(path: string) {
  const chunks = getFilename(path).split(".");
  return chunks[chunks.length - 1];
}

export function rootPath() {
  return path.resolve();
}

export function assetPath() {
  return path.resolve(rootPath(), "asset");
}

// '\/:*?"<>|' -> '＼／：＊？″＜＞｜'
export function convertFileName(origin: string) {
  let result = origin;
  result = result.replace(/\\/gi, "＼");
  result = result.replace(/\//gi, "／");
  result = result.replace(/:/gi, "：");
  result = result.replace(/\*/gi, "＊");
  result = result.replace(/\?/gi, "？");
  result = result.replace(/"/gi, "″");
  result = result.replace(/\|/gi, "｜");
  result = result.replace(/</gi, "＜");
  result = result.replace(/>/gi, "＞");
  return result;
}
