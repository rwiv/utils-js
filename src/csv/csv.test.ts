import {it} from "vitest";
import path from "path";
import fs from "fs-extra";
import {getRootPath} from "../file/path.js";
import {updateCsvHeader, concatCsvFiles} from "./csv.js";
import {concatCsvFilesByBasePath} from "./apply.js";

const asset = path.resolve(getRootPath(), "test", "asset");

it("test utils",  async () => {
  const dest = path.resolve(asset, "csv", "result.csv");
  await fs.writeFile(dest, "");

  const p1 = path.resolve(asset, "csv", "1.csv");
  const p2 = path.resolve(asset, "csv", "2.csv");
  await concatCsvFiles(dest, [p1, p2]);

  await updateCsvHeader(dest, path.resolve(asset, "csv", "changed.csv"), "hello");
});

it("test concatAll", async () => {
  const base = path.resolve(asset, "target");
  await concatCsvFilesByBasePath(base);
});
