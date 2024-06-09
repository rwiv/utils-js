import {it} from "vitest";
import {toArrayMap} from "./array.js";

it("test arrayMap", () => {
  const arr = [
    {a: "1", b: "10"},
    {a: "1", b: "10"},
    {a: "2", b: "30"},
  ]
  const map = toArrayMap(arr, it => it.a);
  console.log(map);

  const subArr = map.get("1");
  if (subArr !== undefined) {
    const item = subArr[1];
    const idx = subArr.indexOf(item);
    console.log(idx);
  }
});
