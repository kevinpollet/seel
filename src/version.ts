/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { readFileSync } from "fs";
import { join } from "path";

const pkgJSONPath = join(__dirname, "..", "package.json");
const pkgJSON = JSON.parse(readFileSync(pkgJSONPath).toString());

export const version = `${pkgJSON.name}/${pkgJSON.version} ${process.platform}-${process.arch} node-${process.version}`;
