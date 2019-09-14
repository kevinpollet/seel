/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { PkgJSON } from "./PkgJSON";
import { join } from "path";
import { readFileSync, readFile } from "fs";

const readPkgJSON = (dir: string): Promise<PkgJSON> =>
  new Promise((resolve, reject): void => {
    const packageJSONPath = join(dir, "package.json");

    readFile(packageJSONPath, "utf-8", (err, data) =>
      err ? reject(err) : resolve(JSON.parse(data))
    );
  });

const readPkgJSONSync = (dir: string): PkgJSON => {
  const packageJSONPath = join(dir, "package.json");
  const packageJSONString = readFileSync(packageJSONPath, "utf-8");

  return JSON.parse(packageJSONString);
};

export { readPkgJSON, readPkgJSONSync };
