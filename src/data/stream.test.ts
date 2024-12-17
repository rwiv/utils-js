import {it} from "vitest";
import fs from "fs";
import path from "path";
import {getRootPath} from "../file/path.js";
import {WriteStream} from "./custom_stream.js";

it("test Writable", async () => {
  const rs = fs.createReadStream(path.resolve(getRootPath(), "test", "captcha", "image.jpg"));
  const ws = WriteStream.from((chunk, encoding) => {
    console.log(chunk.length);
    console.log(encoding);
  });
  rs.pipe(ws);
  await ws.waitForClose();
});
