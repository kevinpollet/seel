/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import normalize from "normalize-package-data";
import { join } from "path";
import { readFileSync, readFile } from "fs";
import { PkgJson } from "../types/PkgJson";

const readPkg = (dir: string): Promise<PkgJson> =>
  new Promise((resolve, reject): void => {
    const pkgJsonPath = join(dir, "package.json");

    readFile(pkgJsonPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const pkgJson: PkgJson = JSON.parse(data);

        normalize(pkgJson);
        resolve(pkgJson);
      }
    });
  });

const readPkgSync = (dir: string): PkgJson => {
  const pkgJsonPath = join(dir, "package.json");
  const pkgJson: PkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf-8"));

  normalize(pkgJson);
  return pkgJson;
};

export { readPkg, readPkgSync };
