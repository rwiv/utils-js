import fs from "fs/promises";
import {createReadStream, Dirent} from "node:fs";
import readline from "readline";
import {ReadStream} from "node:fs";
import {Readable} from "stream";
import path from "path";

export function readFile(filepath: string) {
  return fs.readFile(filepath, { encoding: "utf-8" });
}

export function walkLines(input: ReadStream, fn: (line: string, idx: number, reader: readline.Interface) => Promise<void>): Promise<void> {
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

export async function readLines(input: ReadStream) {
  const lines: string[] = [];
  await walkLines(input, async (line, idx, reader) => {
    lines.push(line);
  });
  return lines;
}

export async function walk(
  dirPath: string,
  fn: (file: Dirent) => Promise<void>,
): Promise<void> {
  const files = await fs.readdir(dirPath, { withFileTypes: true });

  for (const file of files) {
    await fn(file);

    if (file.isDirectory()) {
      const fullPath = path.resolve(dirPath, file.name);
      await walk(fullPath, fn);
    }
  }
}
