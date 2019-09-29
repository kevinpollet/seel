/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { parse } from "semver";

export const getSemverTags = (version: string): string[] => {
  const semver = parse(version);
  if (!semver) {
    throw new Error(`'${version}' is not a valid semver`);
  }

  const { prerelease, major, minor, version: parsedVersion } = semver;

  return prerelease.length > 0
    ? [prerelease[0] as string, parsedVersion]
    : ["latest", `${major}`, `${major}.${minor}`, parsedVersion];
};
