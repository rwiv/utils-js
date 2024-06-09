import path from "path";
export function getFilename(path) {
    const chunks = path.split(/[\\/]/);
    return chunks[chunks.length - 1];
}
export function getDirPath(pathString, sep = path.sep) {
    const chunks = pathString.split(sep);
    chunks.pop();
    return chunks.join(sep);
}
export function getExt(path) {
    const chunks = getFilename(path).split(".");
    return chunks[chunks.length - 1];
}
export function getRootPath() {
    return path.resolve();
}
// '\/:*?"<>|' -> '＼／：＊？″＜＞｜'
export function normalizedFilename(origin) {
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
