#!/usr/bin/env node

const program = require("commander");

program
  .option("--cwd <cwd>", "Override the current working directory", process.cwd())
  .version("0.0.1")
  .parse(process.argv);

console.log(program.cwd);
