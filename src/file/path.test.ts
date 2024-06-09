import {it} from "vitest";
import {getFilename} from "./path.js";

it("test getFilename", () => {
  const p1 = "C:\\a\\b\\c.txt";
  const p2 = "/a/b/c.txt";
  const f1 = getFilename(p1);
  const f2 = getFilename(p2);
  console.log(f1);
  console.log(f2);
});
