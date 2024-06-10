import {expect, it} from "vitest";
import {concatString, concatStringNotDuplicated} from "./string.js";

it("test arrayMap", () => {
  expect(concatString("foo", "bar", "/")).eq("foo/bar");
  expect(concatString("foo/", "bar", "/")).eq("foo/bar");
  expect(concatString("foo", "/bar", "/")).eq("foo/bar");
  expect(concatString("foo/", "/bar", "/")).eq("foo//bar");

  expect(concatStringNotDuplicated("foo", "bar", "/")).eq("foo/bar");
  expect(concatStringNotDuplicated("foo/", "bar", "/")).eq("foo/bar");
  expect(concatStringNotDuplicated("foo", "/bar", "/")).eq("foo/bar");
  expect(concatStringNotDuplicated("foo/", "/bar", "/")).eq("foo/bar");
});
