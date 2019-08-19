/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import fs from "fs";
import semver, { major, minor, patch } from "semver";
import { promisify } from "util";

export const getImageTags = (
  name: string,
  version: string
): string | string[] => {
  const isPreRelease = semver.prerelease(version) != null;
  if (isPreRelease) {
    return `${name}:${version}`;
  }
  return [
    `${name}:latest`,
    `${name}:${major(version)}`,
    `${name}:${major(version)}.${minor(version)}`,
    `${name}:${major(version)}.${minor(version)}.${patch(version)}`,
  ];
};

export const readFile = (path: string): Promise<string> =>
  promisify(fs.readFile)(path).then(buffer => buffer.toString());

export const readFileSync = (path: string): string =>
  fs.readFileSync(path).toString();

export const resolveEntryPoint = ({
  bin,
  main,
}: {
  bin: string | { [key: string]: string } | undefined;
  main: string | undefined;
}): string => {
  let entryPoint = main || "index.js";

  if (typeof bin === "string") {
    entryPoint = bin;
  } else if (typeof bin === "object") {
    const keys = Object.keys(bin);
    entryPoint = keys.length > 0 ? bin[keys[0]] : entryPoint;
  }

  return entryPoint;
};
