import path from "path";
export function getFilename(path) {
    const chunks = path.split(/[\\/]/);
    if (chunks.length === 1) {
        return path;
    }
    return chunks[chunks.length - 1];
}
export function getDirPath(pathString, sep = path.sep) {
    const chunks = pathString.split(sep);
    if (chunks.length === 1) {
        return pathString;
    }
    chunks.pop();
    return chunks.join(sep);
}
export function getExt(path) {
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
export function isAbsPath(path) {
    if (path[0] === "/") {
        return true;
    }
    else if (path.includes(":")) {
        return true;
    }
    else {
        return false;
    }
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
