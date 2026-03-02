#!/usr/bin/env node

import { mdtabify } from "../src/mdtabify.js";

const printHelp = () => {
  console.log(
    [
      "Usage: mdtabify [--align] [--help]",
      "",
      "Convert delimiter-separated text from stdin into a Markdown table.",
      "",
      "Options:",
      "  --align   Align columns for readable output",
      "  --help    Show this help message",
    ].join("\n"),
  );
};

const main = () => {
  const args = process.argv.slice(2);
  const options = {
    help: args.includes("--help"),
    align: args.includes("--align"),
  };

  if (options.help) {
    printHelp();
    return;
  }

  process.stdin.setEncoding("utf8");

  let input = "";

  process.stdin.on("data", (chunk) => {
    input += chunk;
  });

  process.stdin.on("end", () => {
    const result = mdtabify(input, options);

    switch (result.kind) {
      case "none":
        console.error(
          "Could not determine a delimiter: only one column detected.",
        );
        process.exitCode = 1;
        return;
      case "ambiguous":
        console.error(
          `Ambiguous delimiter: candidates are ${result.delimiters.join(" ")}`,
        );
        process.exitCode = 1;
        return;
      case "unique":
        console.log(result.table);
        return;
    }
  });
};

main();
