#!/usr/bin/env node

const program = require("commander");
const { isAbsolute, resolve } = require("path");
const { buildImage } = require("../lib");

program
  .command("build")
  .description("Build a Docker image for the current project.")
  .option(
    "--cwd <cwd>",
    "Override the current working directory",
    cwd => (!isAbsolute(cwd) ? resolve(process.cwd(), cwd) : process.cwd()),
    process.cwd()
  )
  .version("0.0.1")
  .parse(process.argv);

buildImage(program.cwd)
  .then(stream => stream.pipe(process.stdout))
  .catch(err => console.log(err));
