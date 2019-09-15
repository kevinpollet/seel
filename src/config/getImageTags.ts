/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { major, minor, prerelease } from "semver";
import { PkgJson } from "../types/PkgJson";

export const getTags = ({ version }: PkgJson): ReadonlyArray<string> =>
  prerelease(version) !== null
    ? [version]
    : [
        "latest",
        `${major(version)}`,
        `${major(version)}.${minor(version)}`,
        version,
      ];
