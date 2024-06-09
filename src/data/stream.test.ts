import {it} from "vitest";
import fs from "fs-extra";
import path from "path";
import {assetPath} from "../file/path.js";
import {WriteStream} from "./stream.js";

it("test Writable", async () => {
  const rs = fs.createReadStream(path.resolve(assetPath(), "test", "captcha", "image.jpg"));
  const ws = WriteStream.from((chunk, encoding) => {
    console.log(chunk.length);
    console.log(encoding);
  });
  rs.pipe(ws);
  await ws.waitForClose();
});
