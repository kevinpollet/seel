/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import { join } from "path";
import { promisify } from "util";

export const pathExists = (...paths: string[]): Promise<boolean> =>
  promisify(fs.access)(join(...paths))
    .then(() => true)
    .catch(() => false);
