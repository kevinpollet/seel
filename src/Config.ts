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
    const { bin, main, name, version } = JSON.parse(pkgJSONString);
    const entryPoint = resolveEntryPoint({ bin, main });

    return new Config(name, version, entryPoint);
  }

  readonly name: string;
  readonly version: string;
  readonly entryPoint: string;

  constructor(name: string, version: string, entryPoint: string) {
    this.name = name;
    this.version = version;
    this.entryPoint = entryPoint;
  }
}
