/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";

export const pathExists = (path: string): Promise<boolean> =>
  new Promise((resolve): void => {
    fs.access(path, err => (err ? resolve(false) : resolve(true)));
  });
