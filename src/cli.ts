/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import program from "commander";
import { isAbsolute, resolve } from "path";
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
    (path: string) => (!isAbsolute(path) ? resolve(process.cwd(), path) : path),
    process.cwd()
  )
  .option(
    "--entrypoint <path>",
    "Define the app entrypoint path relative to the current working directory."
  )
  .option(
    "--labels <labels>",
    "Define the container image labels as a comma-separated list of key-value pairs.",
    (labels: string) => labels.split(",").map(label => label.split("="))
  )
  .option("--name <name>", "Define the container image name.")
  .option(
    "--ports <ports>",
    "Define the ports that the app exposes at runtime as a comma-separated list of values.",
    (ports: string) => ports.split(",").map(port => port.trim())
  )
  .option(
    "--tags <tags>",
    "Define the container image tags as a comma-separated list of values.",
    (tags: string) => tags.split(",").map(tag => tag.trim())
  )
  .action(({ cwd, ...rest }) => {
    const errorHandler = (err: Error): void => {
      console.error(err.message);
      process.exit(1);
    };

    buildImage(cwd, rest)
      .then(stream => stream.on("error", errorHandler).pipe(process.stdout))
      .catch(errorHandler);
  });

program.parse(process.argv);
