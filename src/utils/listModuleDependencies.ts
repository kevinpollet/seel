/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import dependencyTree from "dependency-tree";
import path from "path";

export const listModuleDependencies = (
  dir: string,
  module: string
): Promise<string[]> =>
  new Promise<string[]>((resolve): void => {
    const dependencies = dependencyTree
      .toList({
        directory: dir,
        filename: path.resolve(dir, module),
        filter: path => !path.includes("node_modules"),
      })
      .map(dependency => path.relative(dir, dependency));

    resolve(dependencies);
  });
