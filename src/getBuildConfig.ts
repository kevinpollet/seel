/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { readFile } from "fs";
import { join } from "path";
import { promisify } from "util";
import { getSemverTags, getEntryPoint } from "./util";
import { BuildConfig } from "./BuildConfig";

export const getBuildConfig = async (
  rootDir: string,
  overrides: Partial<BuildConfig>
): Promise<BuildConfig> => {
  const pkgJSONPath = join(rootDir, "package.json");
  const pkgJSONBuffer = await promisify(readFile)(pkgJSONPath);
  const { name, version, ...rest } = JSON.parse(pkgJSONBuffer.toString());

  return {
    name,
    entryPoint: getEntryPoint(rest),
    tags: getSemverTags(version),
    ...overrides,
  };
};