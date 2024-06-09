import {it} from "vitest";
import {ExecutionTime} from "./execution_time.js";

class Hello {
  @ExecutionTime()
  f() {
    return "hello";
  }
}

it("test deco", () => {
  const result = (new Hello()).f();
  console.log(result);
});
