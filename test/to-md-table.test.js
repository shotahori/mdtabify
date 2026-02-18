import test from "node:test";
import assert from "node:assert/strict";
import { dedent } from "strip-indent";
import { toMdTable } from "../src/to-md-table.js";

test("converts delimited text to a Markdown table", () => {
  const text = dedent(`
    a,b,c
    d,e,f
    g,h,i
  `);

  const expected = dedent(`
    | a | b | c |
    |---|---|---|
    | d | e | f |
    | g | h | i |
  `);

  assert.equal(toMdTable(text, ","), expected);
});

test("fills missing cells with empty strings", () => {
  const text = dedent(`
    a,b
    d,e,f
    g,h,i
  `);

  const result = toMdTable(text, ",");

  assert.ok(result.includes("| a | b |  |"));
});
