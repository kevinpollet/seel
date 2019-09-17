/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import dependencyTree from "dependency-tree";
import path from "path";
import tar from "tar-fs";
import { Pack } from "tar-stream";
import { BuildConfig } from "./config/BuildConfig";
import { generateDockerfile } from "./generateDockerfile";

export const createDockerBuildContext = (
  dir: string,
  config: BuildConfig
): Promise<NodeJS.ReadableStream> =>
  new Promise((resolve): void => {
    const entries = dependencyTree
      .toList({
        directory: dir,
        filename: path.resolve(dir, config.entrypoint),
        filter: path => !path.includes("node_modules"),
      })
      .map(entry => path.relative(dir, entry))
      .concat("package.json");

    if (config.copyLockFile) {
      entries.push(config.useYarn ? "yarn.lock" : "package-lock.json");
    }

    resolve(
      tar.pack(dir, {
        entries,
        finalize: false,
        finish(pack: Pack): void {
          pack.entry({ name: "Dockerfile" }, generateDockerfile(config));
          pack.entry({ name: ".dockerignore" }, "*");
          pack.finalize();
        },
      })
    );
  });
