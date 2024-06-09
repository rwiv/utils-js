import {it} from "vitest";
import {DurationCheck} from "./duration_check.js";
import {delay} from "./wait.js";

class Hello {
  @DurationCheck()
  async run() {
    await delay(1000);
    return "hello";
  }
}

it("test", async () => {
  const result = await new Hello().run();
  console.log(result);
});
