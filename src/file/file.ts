import fs from "fs/promises";
import {Dirent} from "node:fs";
import readline from "readline";
import {ReadStream} from "node:fs";
import path from "path";
import {getDirPath, getFilename, isAbsPath} from "./path.js";

export function readFile(filepath: string) {
  return fs.readFile(filepath, { encoding: "utf-8" });
}

export async function ensureDir(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw err;
    }
  }
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

export interface FileInfo {
  filename: string;
  absPath: string;
  isDirectory: boolean;
  size: number;
  atime: Date;
  mtime: Date;
  ctime: Date;
  birthtime: Date;
}

export async function exists(filepath: string) {
  try {
    await fs.stat(filepath);
    return true;
  } catch (e) {
    return false;
  }
}

// 비동기적으로 처리하기에 순서 보장 x
export async function readdir(dirPath: string) {
  const filenames= await fs.readdir(dirPath);
  const promises = filenames.map(filename => getFileInfo(dirPath, filename));
  return Promise.all(promises);
}

export async function readdirRecur(dirPath: string) {
  const basePath = getDirPath(dirPath);
  const filename = getFilename(dirPath);
  const dirFileInfo = await getFileInfo(basePath, filename);

  const result: FileInfo[] = [];
  await travel(dirFileInfo, file => {
    result.push(file);
  });
  return result;
}

export async function travel(baseDir: FileInfo, fn: (file: FileInfo) => void) {
  fn(baseDir);

  const elems = await readdir(baseDir.absPath);
  const files = elems.filter(it => !it.isDirectory);
  const dirs = elems.filter(it => it.isDirectory);

  for (const file of files) {
    fn(file);
  }
  // 비동기로 처리해버리면 순서가 엉망이 되므로 동기 처리
  for (const dir of dirs) {
    await travel(dir, fn);
  }
}

export async function travelPromise(baseDir: FileInfo, fn: (file: FileInfo) => Promise<void>) {
  await fn(baseDir);

  const elems = await readdir(baseDir.absPath);
  const files = elems.filter(it => !it.isDirectory);
  const dirs = elems.filter(it => it.isDirectory);

  await Promise.all(files.map(file => fn(file)));
  // 이것까지 비동기로 처리해버리면 순서가 엉망이 되므로 동기 처리
  for (const dir of dirs) {
    await travelPromise(dir, fn);
  }
}

export async function getFileInfo(basePath: string, filename: string): Promise<FileInfo> {
  const absPath = path.resolve(basePath, filename);
  if (!isAbsPath(absPath)) {
    throw Error("is not abs path");
  }
  const stats = await fs.stat(absPath);
  return {
    filename,
    absPath,
    isDirectory: stats.isDirectory(),
    size: stats.size,
    atime: stats.atime,
    mtime: stats.mtime,
    ctime: stats.ctime,
    birthtime: stats.birthtime,
  }
}
