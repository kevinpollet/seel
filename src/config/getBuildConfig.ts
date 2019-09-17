/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { major, minor, prerelease } from "semver";
import { BuildConfig } from "./BuildConfig";
import { pathExists } from "../utils/pathExists";
import { readPkg } from "../utils/readPkg";

export const getBuildConfig = async (dir: string): Promise<BuildConfig> => {
  const [
    hasYarnLock,
    hasPkgLock,
    { name, version, bin, main, dependencies },
  ] = await Promise.all([
    pathExists(join(dir, "yarn.lock")),
    pathExists(join(dir, "package-lock.json")),
    readPkg(dir),
  ]);

  const tags =
    prerelease(version) !== null
      ? [version]
      : [
          "latest",
          `${major(version)}`,
          `${major(version)}.${minor(version)}`,
          version,
        ];

  return new BuildConfig({
    name,
    entrypoint: (bin && Object.values(bin)[0]) || main || "index.js",
    tags,
    useYarn: hasYarnLock,
    copyLockFile: hasYarnLock || hasPkgLock,
    installDependencies: Object.keys(dependencies || {}).length > 0,
  });
};
