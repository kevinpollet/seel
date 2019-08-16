/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { readFileSync } from "./util";

const pkgJSONPath = join(__dirname, "..", "package.json");
const pkgJSONString = readFileSync(pkgJSONPath);
const pkgJSON = JSON.parse(pkgJSONString);

export const version = `${pkgJSON.name}/${pkgJSON.version} ${process.platform}-${process.arch} node-${process.version}`;
