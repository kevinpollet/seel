/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { major, minor, prerelease } from "semver";
import { PackageJSON } from "./PackageJSON";

const getSemverTags = (version: string): ReadonlyArray<string> =>
  prerelease(version) !== null
    ? [version]
    : [
        "latest",
        `${major(version)}`,
        `${major(version)}.${minor(version)}`,
        version,
      ];

const getEntryPoint = ({ bin, main }: PackageJSON): string =>
  typeof bin === "string"
    ? bin
    : typeof bin === "object"
    ? Object.values(bin)[0]
    : main || "index.js";

export { getEntryPoint, getSemverTags };
