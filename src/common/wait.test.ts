import {it} from "vitest";
import {waitFor} from "./wait.js";

it("test wait timeout", async () => {
  try {
    await waitFor(10, () => false, 1000);
  } catch (e) {
    console.log(e);
  }
});
