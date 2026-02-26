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

test("fails when the delimiter cannot be determined", () => {
  const text = dedent(`
    abc
    def
    ghi
  `);

  const result = spawnSync(process.execPath, ["bin/mdtabify.js"], {
    input: text,
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.ok(
    result.stderr.includes(
      "Could not determine a delimiter: only one column detected.",
    ),
  );
});

test("fails and prints candidates when the delimiter is ambiguous", () => {
  const text = dedent(`
    a,b;c
    d,e;f
    g,h;i
  `);

  const result = spawnSync(process.execPath, ["bin/mdtabify.js"], {
    input: text,
    encoding: "utf8",
  });

  assert.equal(result.status, 1);
  assert.equal(result.stdout, "");
  assert.ok(result.stderr.includes("Ambiguous delimiter: candidates are , ;"));
});

test("writes aligned markdown table to stdout when --align is provided", () => {
  const text = dedent(`
    a,bb,ccc
    d,eeee,f
    gg,h,i
  `);

  const result = spawnSync(process.execPath, ["bin/mdtabify.js", "--align"], {
    input: text,
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.ok(result.stdout.includes("| a  | bb   | ccc |"));
  assert.ok(result.stdout.includes("|----|------|-----|"));
  assert.equal(result.stderr, "");
});

test("writes help to stdout when --help is provided", () => {
  const expected = dedent(`
    Usage: mdtabify [--align] [--help]

    Convert delimiter-separated text from stdin into a Markdown table.

    Options:
      --align   Align columns for readable output
      --help    Show this help message
  `);

  const result = spawnSync(process.execPath, ["bin/mdtabify.js", "--help"], {
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), expected);
  assert.equal(result.stderr, "");
});
