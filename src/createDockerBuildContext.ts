/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import dependencyTree from "dependency-tree";
import path from "path";
import tar from "tar-fs";
import { Pack } from "tar-stream";
import { ImageConfig } from "./config/ImageConfig";
import { generateDockerfile } from "./generateDockerfile";

export const createDockerBuildContext = (
  rootDir: string,
  config: ImageConfig
): Promise<NodeJS.ReadableStream> =>
  new Promise((resolve): void => {
    const entries = dependencyTree
      .toList({
        directory: rootDir,
        filename: path.resolve(rootDir, config.entrypoint),
        filter: path => !path.includes("node_modules"),
      })
      .map(entry => entry.replace(`${rootDir}/`, ""))
      .concat("package.json");

    fs.access(
      path.resolve(rootDir, "package-lock.json"),
      fs.constants.F_OK,
      err => {
        if (!err) {
          entries.push("package-lock.json");
        }
        resolve(
          tar.pack(rootDir, {
            entries,
            finalize: false,
            finish(pack: Pack): void {
              pack.entry({ name: "Dockerfile" }, generateDockerfile(config));
              pack.entry({ name: ".dockerignore" }, "*");
              pack.finalize();
            },
          })
        );
      }
    );
  });
