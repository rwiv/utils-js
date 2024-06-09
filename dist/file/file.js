import fs from "fs/promises";
import readline from "readline";
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
