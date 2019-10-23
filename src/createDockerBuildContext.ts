/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fg from "fast-glob";
import tar from "tar-fs";
import { Pack } from "tar-stream";
import { createGzip } from "zlib";
import { BuildConfig } from "./config/BuildConfig";
import { generateDockerfile } from "./generateDockerfile";
import { listModuleDependencies } from "./utils/listModuleDependencies";

export const createDockerBuildContext = async (
  dir: string,
  config: BuildConfig
): Promise<NodeJS.ReadableStream> => {
  const [extraFiles, moduleDependencies] = await Promise.all([
    fg((config.extraFiles as string[]) || [], { cwd: dir }),
    listModuleDependencies(dir, config.entrypoint),
  ]);

  const entries = [
    ...moduleDependencies,
    ...extraFiles,
    ...(config.configFiles || []),
    "package.json",
  ];

  if (config.lockFile) {
    entries.push(config.lockFile);
  }

  return tar
    .pack(dir, {
      entries,
      finalize: false,
      finish(pack: Pack): void {
        pack.entry({ name: "Dockerfile" }, generateDockerfile(config));
        pack.entry({ name: ".dockerignore" }, "*");
        pack.finalize();
      },
    })
    .pipe(createGzip());
};
