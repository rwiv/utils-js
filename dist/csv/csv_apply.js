import path from "path";
import fs from "fs-extra";
import { changeCsvHeader, concatCsvs } from "./csv.js";
export async function concatAll(basePath, header = undefined) {
    const dirNames = await fs.readdir(basePath);
    for (const dirName of dirNames) {
        const dirPath = path.resolve(basePath, dirName);
        const fileNames = await fs.readdir(dirPath);
        const filePaths = fileNames.map(fileName => path.resolve(dirPath, fileName));
        const dest = path.resolve(basePath, dirName + ".csv");
        await concatCsvs(dest, filePaths, header);
    }
}
export async function changeHeaderAll(header, basePath, srcKey, destKey) {
    const dirNames = await fs.readdir(basePath);
    for (const dirName of dirNames) {
        const dirPath = path.resolve(basePath, dirName);
        const fileNames = await fs.readdir(dirPath);
        const filePaths = fileNames.map(fileName => path.resolve(dirPath, fileName));
        const destPaths = filePaths.map(p => p.replace(new RegExp(srcKey, "gi"), destKey));
        for (let i = 0; i < destPaths.length; i++) {
            const srcPath = filePaths[i];
            const destPath = destPaths[i];
            await fs.ensureFile(destPath);
            await changeCsvHeader(srcPath, destPath, header);
        }
    }
}
