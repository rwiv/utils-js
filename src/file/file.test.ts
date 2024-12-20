import {it} from "vitest";
import path from "path";
import fs from "fs";
import {getRootPath} from "./path.js";
import {ensureDir, readLines, walk} from "./file.js";

it("test getLines", async () => {
  const rs = fs.createReadStream(path.resolve(getRootPath(), "conf", "list.example.txt"));
  const lines = await readLines(rs);
  console.log(lines);
});

it("test walk", async () => {
  const target = path.resolve(getRootPath(), "src");
  await walk(target, async file => {
    console.log(file.name);
  });
})

it("test ensureDir", async () => {
  const target = path.resolve(getRootPath(), "test", "hello");
  await ensureDir(target);
  console.log("done");
});
