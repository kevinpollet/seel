/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { readPkgJSONSync } from "./utils/readPkgJSON";

const pkgJSON = readPkgJSONSync(join(__dirname, ".."));

export const version = `${pkgJSON.name}/${pkgJSON.version} ${process.platform}-${process.arch} node-${process.version}`;
