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

const pwd = join(process.cwd(), "..", "doki-example");
const dockerClient = new Docker();

const pkgJSONString = fs.readFileSync(join(pwd, "package.json"));
const { name, doki } = JSON.parse(pkgJSONString.toString());

const dockerfile = new DockerfileBuilder()
  .addCommand({ name: "FROM", value: "node:8-alpine" })
  .addCommand({ name: "RUN", value: "apk add --no-cache tini" })
  .addCommand({ name: "COPY", value: ". ." })
  .addCommand({
    name: "ENTRYPOINT",
    value: `["/sbin/tini", "--", "node", "index.js"]`,
  })
  .toString();

const tarStream = tar.pack(pwd, {
  filter: name => {
    const normalizedIncludes = doki.includes.map((glob: string) =>
      resolve(pwd, glob)
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

dockerClient
  .buildImage(tarStream, { t: `${name}:latest` })
  .then(stream => stream.pipe(process.stdout));
