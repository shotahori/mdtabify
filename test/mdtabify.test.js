import test from "node:test";
import assert from "node:assert/strict";
import { dedent } from "strip-indent";
import { spawnSync } from "node:child_process";

test("writes markdown table to stdout from stdin input", () => {
  const text = dedent(`
    a,b,c
    d,e,f
    g,h,i
  `);

  const result = spawnSync(process.execPath, ["bin/mdtabify.js"], {
    input: text,
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.ok(result.stdout.includes("| a | b | c |"));
  assert.ok(result.stdout.includes("|---|---|---|"));
  assert.equal(result.stderr, "");
});
