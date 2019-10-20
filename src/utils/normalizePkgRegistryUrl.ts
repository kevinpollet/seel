/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export const normalizePkgRegistryUrl = (pkgRegistryUrl: string): string => {
  const matches = /(?:http|https):(\/\/.+)/i.exec(pkgRegistryUrl);
  if (matches) {
    return matches[1].endsWith("/") ? matches[1] : `${matches[1]}/`;
  }
  throw new Error("Unsupported pkg registry URL");
};
