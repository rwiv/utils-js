import {it} from "vitest";
import path from "path";
import fs from "fs-extra";
import {rootPath} from "../file/path.js";
import {changeCsvHeader, concatCsvs} from "./csv.js";
import {concatAll} from "./csv_apply.js";

const asset = path.resolve(rootPath(), "test", "asset");

it("test utils",  async () => {
  const dest = path.resolve(asset, "csv", "result.csv");
  await fs.writeFile(dest, "");

  const p1 = path.resolve(asset, "csv", "1.csv");
  const p2 = path.resolve(asset, "csv", "2.csv");
  await concatCsvs(dest, [p1, p2]);

  await changeCsvHeader(dest, path.resolve(asset, "csv", "changed.csv"), "hello");
});

it("test concatAll", async () => {
  const base = path.resolve(asset, "target");
  await concatAll(base);
});
