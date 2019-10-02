/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { Command } from "commander";
import { buildImage } from "./buildImage";
import { collectValues, collectKeyPairs } from "./utils/collect";
import { version } from "./version";

const program = new Command()
  .version(version, "-v, --version", "Output version.")
  .helpOption("-h, --help", "Output usage information.")
  .description(
    "Build a container image for the Node.js app in the current working directory."
  )
  .option(
    "--cwd <path>",
    "Define the current working directory.",
    process.cwd()
  )
  .option(
    "--entrypoint <path>",
    "Define the app entrypoint. The given path must be relative to the current working directory."
  )
  .option(
    "--extra-files <pattern>",
    "Define the extra files to include in the container image with a glob pattern.",
    collectValues
  )
  .option(
    "--label <label>",
    "Define the container image label.",
    collectKeyPairs()
  )
  .option("--name <name>", "Define the container image name.")
  .option(
    "--port <port>",
    "Define the port that the container exposes at runtime.",
    collectValues
  )
  .option("--tag <tag>", "Define the container image tag.", collectValues)
  .action(options => {
    if (typeof options === "string") {
      program.outputHelp();
      process.exit(1);
    }

    const errorHandler = (err: Error): void => {
      console.error(err.message);
      process.exit(1);
    };

    buildImage(options.cwd, {
      entrypoint: options.entrypoint,
      ports: options.port,
      extraFiles: options.extraFiles,
      labels: options.label,
      name: options.name,
      tags: options.tags,
    })
      .then(stream => stream.on("error", errorHandler).pipe(process.stdout))
      .catch(errorHandler);
  });

program.parse(process.argv);
