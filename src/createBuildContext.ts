/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import multimatch from "multimatch";
import { Readable } from "stream";
import tar from "tar-fs";
import { Config } from "./Config";
import { DockerfileBuilder } from "./DockerfileBuilder";

export const createBuildContext = (
  rootPath: string,
  config: Config
): Readable => {
  const dockerfile = new DockerfileBuilder()
    .addCommand({ name: "FROM", value: "node:8-alpine" })
    .addCommand({ name: "RUN", value: "apk add --no-cache tini" })
    .addCommand({ name: "COPY", value: ". ." })
    .addCommand({
      name: "ENTRYPOINT",
      value: `["/sbin/tini", "--", "node", "index.js"]`,
    })
    .toString();

  return tar.pack(rootPath, {
    filter: name => multimatch(name, config.includes).length === 0,
    finalize: false,
    finish: function(pack) {
      pack.entry({ name: "Dockerfile", size: dockerfile.length }, dockerfile);
      pack.entry({ name: ".dockerignore", size: dockerfile.length }, "*");
      pack.finalize();
    },
  });
};
