#!/usr/bin/env node

import { mdtabify } from "../src/mdtabify.js";

process.stdin.setEncoding("utf8");

let input = "";

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  console.log(mdtabify(input));
});
