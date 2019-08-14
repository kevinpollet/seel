#!/usr/bin/env node

const program = require("commander");
const { buildImage } = require("../lib");

program
  .option(
    "--cwd <cwd>",
    "Override the current working directory",
    process.cwd()
  )
  .version("0.0.1")
  .parse(process.argv);

buildImage(program.cwd)
  .then(stream => stream.pipe(process.stdout))
  .catch(err => console.log(err));
