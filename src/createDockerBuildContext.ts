/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import dependencyTree from "dependency-tree";
import fg from "fast-glob";
import path from "path";
import tar from "tar-fs";
import { Pack } from "tar-stream";
import { BuildConfig } from "./config/BuildConfig";
import { generateDockerfile } from "./generateDockerfile";

export const createDockerBuildContext = (
  dir: string,
  config: BuildConfig
): Promise<NodeJS.ReadableStream> =>
  Promise.all([
    fg((config.extraFiles as string[]) || [], { cwd: dir }),
    new Promise<string[]>((resolve): void =>
      resolve(
        dependencyTree.toList({
          directory: dir,
          filename: path.resolve(dir, config.entrypoint),
          filter: path => !path.includes("node_modules"),
        })
      )
    ),
  ])
    .then(([extraFiles, entrypointDependencies]) => [
      "package.json",
      ...extraFiles,
      ...entrypointDependencies.map(entry => path.relative(dir, entry)),
      ...(!config.copyLockFile
        ? []
        : [config.useYarn ? "yarn.lock" : "package-lock.json"]),
    ])
    .then(entries =>
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
