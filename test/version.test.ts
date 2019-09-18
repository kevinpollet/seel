/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { version } from "../src/version";
import { readPkg } from "../src/utils/readPkg";

describe("version", () => {
  it("should return the version string", async () => {
    const pkgJsonPath = join(__dirname, "..");
    const pkgJson = await readPkg(pkgJsonPath);

    expect(version).toMatch(
      `${pkgJson.name}/${pkgJson.version} ${process.platform}-${process.arch} node-${process.version}`
    );
  });
});
