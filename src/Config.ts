/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { readFile, resolveEntryPoint } from "./util";

export class Config {
  static async fromPkgJSON(path: string): Promise<Config> {
    const pkgJSONString = await readFile(path);
    const { bin, main, name } = JSON.parse(pkgJSONString);
    const entryPoint = resolveEntryPoint({ bin, main });

    return new Config(name, entryPoint);
  }

  readonly name: string;
  readonly entryPoint: string;

  constructor(name: string, entryPoint: string) {
    this.name = name;
    this.entryPoint = entryPoint;
  }
}
