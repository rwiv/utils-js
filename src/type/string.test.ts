import {expect, it} from "vitest";
import {concatString, concatStringNotDuplicated, mergeIntersectedStrings} from "./string.js";

it("test1", () => {
  expect(concatString("foo", "bar", "/")).eq("foo/bar");
  expect(concatString("foo/", "bar", "/")).eq("foo/bar");
  expect(concatString("foo", "/bar", "/")).eq("foo/bar");
  expect(concatString("foo/", "/bar", "/")).eq("foo//bar");

  expect(concatStringNotDuplicated("foo", "bar", "/")).eq("foo/bar");
  expect(concatStringNotDuplicated("foo/", "bar", "/")).eq("foo/bar");
  expect(concatStringNotDuplicated("foo", "/bar", "/")).eq("foo/bar");
  expect(concatStringNotDuplicated("foo/", "/bar", "/")).eq("foo/bar");
});

it("test2", () => {
  expect(mergeIntersectedStrings("abc", "bcd")).eq("abcd");
  expect(mergeIntersectedStrings("hello", "world")).eq("helloworld");
  expect(mergeIntersectedStrings("abc", "abc")).eq("abc");
  expect(mergeIntersectedStrings("abc", "def")).eq("abcdef");
});
