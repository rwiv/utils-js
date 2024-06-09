import {it} from "vitest";
import path from "path";
import fs from "fs-extra";
import {getRootPath} from "./path.js";
import {readLines} from "./file.js";

it("test getLines", async () => {
  const rs = fs.createReadStream(path.resolve(getRootPath(), "conf", "list.example.txt"));
  const lines = await readLines(rs);
  console.log(lines);
});
