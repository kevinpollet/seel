/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import { promisify } from "util";

export const pathExists = (path: string): Promise<boolean> =>
  promisify(fs.access)(path)
    .then(() => true)
    .catch(() => false);
