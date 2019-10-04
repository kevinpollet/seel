/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import { promisify } from "util";
import { BuildConfig } from "./BuildConfig";
import { readPkg } from "../utils/readPkg";
import { getSemverTags } from "./getSemverTags";

export const getBuildConfig = async (dir: string): Promise<BuildConfig> => {
  const [pkgJson, rootFiles] = await Promise.all([
    readPkg(dir),
    promisify(fs.readdir)(dir),
  ]);

  const { author = {}, description, name, version, bin, main } = pkgJson;
  const useYarn = rootFiles.includes("yarn.lock");
  const configFiles = rootFiles.filter(
    name => name === ".npmrc" || (name === ".yarnrc" && useYarn)
  );
  const lockFile = rootFiles.find(
    name => name === (useYarn ? "yarn.lock" : "package-lock.json")
  );

  return {
    name,
    useYarn,
    configFiles,
    lockFile,
    tags: getSemverTags(version),
    entrypoint: (bin && Object.values(bin)[0]) || main || "index.js",
    labels: {
      ...(version ? { version } : undefined),
      ...(description ? { description } : undefined),
      ...(author.email ? { maintainer: author.email } : undefined),
    },
  };
};
