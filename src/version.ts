/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { readPkgSync } from "./utils/readPkg";

const pkgJsonPath = join(__dirname, "..");
const { name, version: pkgJsonVersion } = readPkgSync(pkgJsonPath);
const { arch, platform, version: processVersion } = process;

export const version = `${name}/${pkgJsonVersion} ${platform}-${arch} node-${processVersion}`;
