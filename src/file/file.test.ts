import {it} from "vitest";
import path from "path";
import fs from "fs-extra";
import {rootPath} from "./path.js";
import {getLines} from "./file.js";

it("test getLines", async () => {
  const rs = fs.createReadStream(path.resolve(rootPath(), "conf", "list.example.txt"));
  const lines = await getLines(rs);
  console.log(lines);
});
