import fs from "fs/promises";
import readline from "readline";
import {ReadStream} from "node:fs";

export function readFile(filepath: string) {
  return fs.readFile(filepath, { encoding: "utf-8" });
}

export function readLines(input: ReadStream, fn: (line: string, idx: number, reader: readline.Interface) => Promise<void>): Promise<void> {
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

export async function getLines(input: ReadStream) {
  const lines: string[] = [];
  await readLines(input, async (line, idx, reader) => {
    lines.push(line);
  });
  return lines;
}
