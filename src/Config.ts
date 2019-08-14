/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import { join, resolve } from "path";
import { promisify } from "util";

export class Config {
  static readFromPkgJSON(cwd: string): Promise<Config> {
    const pkgJSONPath = join(cwd, "package.json");

    return promisify(fs.readFile)(pkgJSONPath)
      .then((data: Buffer) => data.toString())
      .then(data => JSON.parse(data))
      .then(({ name, docku }) => {
        const resolvedIncludes =
          docku.includes &&
          docku.includes.map((pattern: string) => resolve(cwd, pattern));

        return new Config(name, resolvedIncludes);
      });
  }

  readonly name: string;
  readonly includes: string[];

  constructor(name: string, includes: string[] = []) {
    this.name = name;
    this.includes = includes;
  }
}
