/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import normalize from "normalize-package-data";
import { join } from "path";
import { promisify } from "util";
import { readFileSync, readFile } from "fs";
import { PkgJson } from "../types/PkgJson";

const readPkg = async (dir: string): Promise<PkgJson> => {
  const pkgJsonPath = join(dir, "package.json");
  const data = await promisify(readFile)(pkgJsonPath, "utf-8");
  const pkgJson: PkgJson = JSON.parse(data);

  normalize(pkgJson);
  return pkgJson;
};

const readPkgSync = (dir: string): PkgJson => {
  const pkgJsonPath = join(dir, "package.json");
  const data = readFileSync(pkgJsonPath, "utf-8");
  const pkgJson: PkgJson = JSON.parse(data);

  normalize(pkgJson);
  return pkgJson;
};

export { readPkg, readPkgSync };
