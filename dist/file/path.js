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
export function rootPath() {
    return path.resolve();
}
export function assetPath() {
    return path.resolve(rootPath(), "asset");
}
// '\/:*?"<>|' -> '＼／：＊？″＜＞｜'
export function convertFileName(origin) {
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
