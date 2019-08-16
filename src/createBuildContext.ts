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

interface File {
  readonly name: string;
  readonly content: string;
}

interface Options {
  readonly rootDir: string;
  readonly entryPoint: string;
  readonly filesToInject?: ReadonlyArray<File>;
}

export const createBuildContext = (options: Options): NodeJS.ReadableStream => {
  const entries = dependencyTree
    .toList({
      directory: options.rootDir,
      filename: resolve(options.rootDir, options.entryPoint),
      filter: path => !path.includes("node_modules"),
    })
    .map(entry => entry.replace(`${options.rootDir}/`, ""))
    .concat("package.json", "package-lock.json");

  return tar.pack(options.rootDir, {
    entries,
    finalize: false,
    finish(pack: Pack): void {
      (options.filesToInject || []).forEach(({ name, content }) =>
        pack.entry({ name, size: content.length }, content)
      );
      pack.finalize();
    },
  });
};
