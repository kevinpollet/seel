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
import { ImageConfig } from "./config/ImageConfig";
import { generateDockerfile } from "./generateDockerfile";
import { pathExists } from "./utils/pathExists";

export const createDockerBuildContext = async (
  rootDir: string,
  config: ImageConfig
): Promise<NodeJS.ReadableStream> => {
  const entries = dependencyTree
    .toList({
      directory: rootDir,
      filename: path.resolve(rootDir, config.entrypoint),
      filter: path => !path.includes("node_modules"),
    })
    .map(entry => path.relative(rootDir, entry))
    .concat("package.json");

  const hasPackageLock = await pathExists(
    path.resolve(rootDir, "package-lock.json")
  );
  if (hasPackageLock) {
    entries.push("package-lock.json");
  }

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
