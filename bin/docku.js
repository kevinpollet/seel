#!/usr/bin/env node

/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const program = require("commander");
const { isAbsolute, resolve } = require("path");
const { buildImage, getBuildConfig, version } = require("../lib");

program.version(version);

program
  .command("build")
  .description(
    "build a container image for the Node.js app in the current directory"
  )
  .option(
    "--cwd <path>",
    "override the current working directory",
    path => (!isAbsolute(path) ? resolve(process.cwd(), path) : process.cwd()),
    process.cwd()
  )
  .option(
    "--exposedPorts <ports>",
    "define the comma-separated list of ports that the container exposes at runtime",
    exposedPorts =>
      exposedPorts.split(",").map(exposedPort => exposedPort.trim())
  )
  .action(options => {
    const errorHandler = err => {
      console.error(err.message);
      process.exit(1);
    };

    getBuildConfig(options.cwd, { exposedPorts: options.exposedPorts })
      .then(config => buildImage(options.cwd, config))
      .then(stream => stream.on("error", errorHandler).pipe(process.stdout))
      .catch(errorHandler);
  });

program.parse(process.argv);
