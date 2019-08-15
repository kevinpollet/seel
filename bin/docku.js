#!/usr/bin/env node

const program = require("commander");
const { isAbsolute, resolve } = require("path");
const { buildImage } = require("../lib");
const { version } = require("../lib/version");

program.version(version);

program
  .command("build")
  .description("Build a Docker image for the current project.")
  .option(
    "--cwd <path>",
    "override the current working directory",
    path => (!isAbsolute(path) ? resolve(process.cwd(), path) : process.cwd()),
    process.cwd()
  )
  .action(options => {
    buildImage(options.cwd)
      .then(stream => stream.pipe(process.stdout))
      .catch(err => console.log(err));
  });

program.parse(process.argv);
