/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import program from "commander";
import { isAbsolute, resolve } from "path";
import { buildImage } from "./buildImage";
import { ImageConfig } from "./config/ImageConfig";
import { version } from "./version";

program.version(version, "-v, --version", "output version");

program
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
    (ports: string) => ports.split(",").map(port => port.trim())
  )
  .option(
    "--labels <labels>",
    "comma-separated list of the container image labels",
    (labels: string) =>
      labels.split(",").map(label => {
        const [key, value] = label.split("=");
        return { key, value };
      })
  )
  .action(({ cwd, rest }) => {
    const errorHandler = (err: Error): void => {
      console.error(err.message);
      process.exit(1);
    };

    ImageConfig.fromPkgJSON(cwd)
      .then(config => buildImage(cwd, config.assign(rest)))
      .then(stream => stream.on("error", errorHandler).pipe(process.stdout))
      .catch(errorHandler);
  });

program.parse(process.argv);
