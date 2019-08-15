#!/usr/bin/env node

const program = require("commander");
const { isAbsolute, resolve } = require("path");
const { buildImage } = require("../lib");
const { version } = require("../lib/version");

program
  .command("build")
  .description("Build a Docker image for the current project.")
  .option(
    "--cwd <cwd>",
    "override the current working directory",
    cwd => (!isAbsolute(cwd) ? resolve(process.cwd(), cwd) : process.cwd()),
    process.cwd()
  )
  .version(version, "-v --version", "output current version")
  .parse(process.argv);

buildImage(program.cwd)
  .then(stream => stream.pipe(process.stdout))
  .catch(err => console.log(err));
