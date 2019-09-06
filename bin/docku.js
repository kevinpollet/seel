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

program.version(version, "-v, --version", "output the version string");

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
    "comma-separated list of ports that the container exposes at runtime",
    ports => ports.split(",").map(port => port.trim())
  )
  .option(
    "--labels <labels>",
    "comma-separated list of the container image labels",
    labels =>
      labels.split(",").map(label => {
        const [key, value] = label.split("=");
        return { key, value };
      })
  )
  .action(({ cwd, ...rest }) => {
    const errorHandler = err => {
      console.error(err.message);
      process.exit(1);
    };

    getBuildConfig(cwd, rest)
      .then(config => buildImage(cwd, config))
      .then(stream => stream.on("error", errorHandler).pipe(process.stdout))
      .catch(errorHandler);
  });

program.parse(process.argv);
