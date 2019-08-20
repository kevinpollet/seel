/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import dependencyTree from "dependency-tree";
import { resolve } from "path";
import tar from "tar-fs";
import { Pack } from "tar-stream";
import { BuildConfig } from "./BuildConfig";
import { generateDockerfile } from "./generateDockerfile";

export const createBuildContext = (
  rootDir: string,
  config: BuildConfig
): NodeJS.ReadableStream => {
  const entries = dependencyTree
    .toList({
      directory: rootDir,
      filename: resolve(rootDir, config.entryPoint),
      filter: path => !path.includes("node_modules"),
    })
    .map(entry => entry.replace(`${rootDir}/`, ""))
    .concat("package.json", "package-lock.json");

  return tar.pack(rootDir, {
    entries,
    finalize: false,
    finish(pack: Pack): void {
      pack.entry({ name: "Dockerfile" }, generateDockerfile(config));
      pack.entry({ name: ".dockerignore" }, "*");
      pack.finalize();
    },
  });
};
