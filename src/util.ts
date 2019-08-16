/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import { promisify } from "util";

const readFileSync = (path: string): string => fs.readFileSync(path).toString();

const readFile = (path: string): Promise<string> =>
  promisify(fs.readFile)(path).then(buffer => buffer.toString());

export { readFileSync, readFile };
