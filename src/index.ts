/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import multimatch from "multimatch";
import { join, resolve } from "path";
import tar from "tar-fs";
import { DockerfileBuilder } from "./DockerfileBuilder";
import fs from "fs";

export const buildImage = async (cwd: string) => {
  const dockerClient = new Docker();
  const packageJSONPath = join(cwd, "package.json");
  const { name, docku } = JSON.parse(
    fs.readFileSync(packageJSONPath).toString()
  );

  const dockerfile = new DockerfileBuilder()
    .addCommand({ name: "FROM", value: "node:8-alpine" })
    .addCommand({ name: "RUN", value: "apk add --no-cache tini" })
    .addCommand({ name: "COPY", value: ". ." })
    .addCommand({
      name: "ENTRYPOINT",
      value: `["/sbin/tini", "--", "node", "index.js"]`,
    })
    .toString();

  const tarStream = tar.pack(resolve(process.cwd(), cwd), {
    filter: name => {
      const normalizedIncludes = docku.includes.map((glob: string) =>
        resolve(cwd, glob)
      );
      return multimatch(name, normalizedIncludes).length === 0;
    },
    finalize: false,
    finish: function(pack) {
      pack.entry({ name: "Dockerfile", size: dockerfile.length }, dockerfile);
      pack.entry({ name: ".dockerignore", size: dockerfile.length }, "*");
      pack.finalize();
    },
  });

  return dockerClient.buildImage(tarStream, { t: `${name}:latest` });
};
