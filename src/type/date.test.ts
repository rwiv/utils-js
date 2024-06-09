import {it} from "vitest";
import {toPrettyDate} from "./date.js";

it("test date format", () => {
  const curDate = new Date();
  const result = toPrettyDate(curDate);
  console.log(result);
});
