import {it} from "vitest";
import {subListsWithIdx, toListMap} from "./list.js";

it("test subListsWithIdx", () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const result = subListsWithIdx(arr, 3);
  console.log(result);
});

it("test arrayMap", () => {
  const arr = [
    {a: "1", b: "10"},
    {a: "1", b: "10"},
    {a: "2", b: "30"},
  ]
  const map = toListMap(arr, it => it.a);
  console.log(map);

  const subArr = map.get("1");
  if (subArr !== undefined) {
    const item = subArr[1];
    const idx = subArr.indexOf(item);
    console.log(idx);
  }
});
