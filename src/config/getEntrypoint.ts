/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { PkgJSON } from "../utils/PkgJSON";

export const getEntrypoint = ({ bin, main }: PkgJSON): string =>
  typeof bin === "string"
    ? bin
    : typeof bin === "object"
    ? Object.values(bin)[0]
    : main || "index.js";
