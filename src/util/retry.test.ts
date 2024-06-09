import {it} from "vitest";
import {Retry} from "./retry.js";

class Hello {

  @Retry(3)
  returnNotPromise() {
    return "hello";
  }

  @Retry(3)
  throwNotPromise() {
    throw Error("throwErrorNotPromise1");
  }

  @Retry(3)
  async returnPromise() {
    return "hello";
  }

  @Retry(3)
  async throwPromise() {
    throw Error("throwErrorPromise1");
  }
}

const hello = new Hello();

it("test retry 1", async () => {
  const result = hello.returnNotPromise();
  console.log(result);
  console.log("end");
});

it("test retry 2", async () => {
  try {
    hello.throwNotPromise();
  } catch (e) {
    console.log(e);
  }
  console.log("end");
});

it("test retry 3", async () => {
  const result = await hello.returnPromise();
  console.log(result);
  console.log("end");
});

it("test retry 4", async () => {
  try {
    await hello.throwPromise();
  } catch (e) {
    console.log(e);
  }
  console.log("end");
});
