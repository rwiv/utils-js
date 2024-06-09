import fs from "fs/promises";
import readline from "readline";
import path from "path";
export function readFile(filepath) {
    return fs.readFile(filepath, { encoding: "utf-8" });
}
export function walkLines(input, fn) {
    return new Promise((resolve, reject) => {
        const reader = readline.createInterface({ input });
        let idx = 0;
        reader.on('line', async (line) => {
            idx++;
            await fn(line, idx - 1, reader);
        });
        reader.on('close', function () {
            resolve();
        });
    });
}
export async function readLines(input) {
    const lines = [];
    await walkLines(input, async (line, idx, reader) => {
        lines.push(line);
    });
    return lines;
}
export async function walk(dirPath, fn) {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
        await fn(file);
        if (file.isDirectory()) {
            const fullPath = path.resolve(dirPath, file.name);
            await walk(fullPath, fn);
        }
    }
}
