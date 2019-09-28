/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import program from "commander";
import { buildImage } from "./buildImage";
import { mapAndCollect } from "./utils/mapAndCollect";
import { version } from "./version";

program
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
    "--exposedPort <port>",
    "Define the port that the app exposes at runtime.",
    mapAndCollect()
  )
  .option(
    "--extraFiles <glob>",
    "Define the extra files to include in the container image with a glob pattern.",
    mapAndCollect()
  )
  .option(
    "--label <label>",
    "Define the container image label.",
    mapAndCollect(label => label.split("="))
  )
  .option("--name <name>", "Define the container image name.")
  .option("--tag <tag>", "Define the container image tag.", mapAndCollect())
  .action(({ cwd, ...rest }) => {
    const errorHandler = (err: Error): void => {
      console.error(err.message);
      process.exit(1);
    };

    buildImage(cwd, {
      entrypoint: rest.entrypoint,
      exposedPorts: rest.exposedPort,
      extraFiles: rest.extraFiles,
      labels: rest.label,
      name: rest.name,
      tags: rest.tags,
    })
      .then(stream => stream.on("error", errorHandler).pipe(process.stdout))
      .catch(errorHandler);
  });

program.parse(process.argv);
