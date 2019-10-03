/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { BuildConfig } from "./BuildConfig";
import { pathExists } from "../utils/pathExists";
import { readPkg } from "../utils/readPkg";
import { getSemverTags } from "./getSemverTags";

export const getBuildConfig = async (dir: string): Promise<BuildConfig> => {
  const [
    hasYarnLock,
    hasPkgLock,
    hasNpmrc,
    hasYarnrc,
    { author, description, name, version, bin, main },
  ] = await Promise.all([
    pathExists(join(dir, "yarn.lock")),
    pathExists(join(dir, "package-lock.json")),
    pathExists(join(dir, ".npmrc")),
    pathExists(join(dir, ".yarnrc")),
    readPkg(dir),
  ]);

  return {
    name,
    entrypoint: (bin && Object.values(bin)[0]) || main || "index.js",
    tags: getSemverTags(version),
    useYarn: hasYarnLock,
    copyLockFile: hasYarnLock || hasPkgLock,
    copyNpmrcFile: hasNpmrc,
    copyYarnrcFile: hasYarnrc,
    labels: {
      version,
      description,
      maintainer: author && author.email,
    },
  };
};
