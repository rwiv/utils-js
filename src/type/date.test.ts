import {it} from "vitest";
import {toPrettyDateString} from "./date.js";

it("test date format", () => {
  const curDate = new Date();
  const result = toPrettyDateString(curDate);
  console.log(result);
});
