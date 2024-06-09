import {it} from "vitest";
import {Readable} from "stream";
import fs from "fs/promises";
import path from "path";
import {createReadStream, createWriteStream} from "node:fs";
import {zip} from "./zip.js";
import {getRootPath} from "./path.js";

it("test zip", async () => {
  const src = path.resolve(getRootPath(), "src");
  const desc = path.resolve(getRootPath(), "src.zip");
  const rs = createWriteStream(desc);
  await zip(src, rs, walk);
});

export async function walk(
  dirPath: string,
  fn: (filePath: string, rs: Readable) => void,
): Promise<void> {
  const files = await fs.readdir(dirPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile()) {
      const fullPath = path.resolve(dirPath, file.name);
      const rs = createReadStream(fullPath);
      fn(fullPath, rs);
    }

    if (file.isDirectory()) {
      const fullPath = path.resolve(dirPath, file.name);
      await walk(fullPath, fn);
    }
  }
}
