import test from "node:test";
import assert from "node:assert/strict";
import { dedent } from "strip-indent";
import { guessDelimiter } from "../src/guess-delimiter.js";

test("guesses delimiter used in a given text", () => {
  const text = dedent(`
    a,b,c
    d,e,f
    g,h,i
  `);

  assert.deepEqual(guessDelimiter(text), { kind: "unique", delimiter: "," });
});

test("returns null when there is no delimiter", () => {
  const text = dedent(`
    abc
    def
    ghi
  `);

  assert.deepEqual(guessDelimiter(text), { kind: "none" });
});

test("ignores empty lines when computing column consistency", () => {
  const text = dedent(`
    a,b,c

    d,e,f
  `);

  assert.deepEqual(guessDelimiter(text), { kind: "unique", delimiter: "," });
});

test("ignores whitespace-only lines when computing column consistency", () => {
  const text = dedent(`
    a,b,c
      
    d,e,f
  `);

  assert.deepEqual(guessDelimiter(text), { kind: "unique", delimiter: "," });
});

test("excludes any delimiter whose mode is 1 when computing column consistency", () => {
  const text = dedent(`
    a,b,c
    d,e,f
    g,h
  `);

  assert.deepEqual(guessDelimiter(text), { kind: "unique", delimiter: "," });
});
