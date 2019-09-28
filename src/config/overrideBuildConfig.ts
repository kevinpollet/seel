/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { BuildConfig } from "./BuildConfig";

export const overrideBuildConfig = (
  dest: BuildConfig,
  source: Partial<BuildConfig>
): BuildConfig => {
  if (Object.keys(source).length === 0) {
    return dest;
  }

  const sourceClone = JSON.parse(JSON.stringify(source));
  const destClone = JSON.parse(JSON.stringify(dest));

  return { ...destClone, ...sourceClone };
};
