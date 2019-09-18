/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { pathExists } from "../../src/utils/pathExists";

describe("pathExists", () => {
  it("should return true if given path exists", async () => {
    const pkgJsonPath = join(__dirname, "..", "..", "package.json");
    const exists = await pathExists(pkgJsonPath);

    expect(exists).toBe(true);
  });

  it("should return false if given path doesn't exist", async () => {
    const dummyPath = join(__dirname, "..", "..", "dummy.json");
    const exists = await pathExists(dummyPath);

    expect(exists).toBe(false);
  });
});
