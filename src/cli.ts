/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import program from "commander";
import { buildImage } from "./buildImage";
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
    (exposedPort: string, prev: string[]) => (prev || []).concat(exposedPort)
  )
  .option(
    "--extraFiles <glob>",
    "Define the extra files to include in the container image with a glob pattern."
  )
  .option(
    "--label <label>",
    "Define the container image label.",
    (label: string, prev: string[][]) => (prev || []).concat([label.split("=")])
  )
  .option("--name <name>", "Define the container image name.")
  .option(
    "--tag <tag>",
    "Define the container image tag.",
    (tag: string, prev: string[]) => (prev || []).concat(tag)
  )
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
