import path from "path";

export function getFilename(path: string) {
  const chunks = path.split(/[\\/]/);
  if (chunks.length === 1) {
    return path;
  }
  return chunks[chunks.length - 1];
}

export function getDirPath(pathString: string, sep: string = path.sep) {
  const chunks = pathString.split(sep);
  if (chunks.length === 1) {
    return pathString;
  }
  chunks.pop();
  return chunks.join(sep);
}

export function getExt(path: string) {
  const filename = getFilename(path);
  if (!filename.includes(".")) {
    return "";
  }
  const chunks = filename.split(".");
  return chunks[chunks.length - 1];
}

export function getRootPath() {
  return path.resolve();
}

export function isAbsPath(path: string) {
  if (path[0] === "/") {
    return true;
  } else return path.includes(":");
}

// '\/:*?"<>|' -> '＼／：＊？″＜＞｜'
export function normalizedFilename(origin: string) {
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
