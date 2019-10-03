/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { pathExists } from "../../src/utils/pathExists";

describe("pathExists", () => {
  it("should return true if given path exists", async () => {
    const exists = await pathExists(__dirname, "..", "..", "package.json");

    expect(exists).toBe(true);
  });

  it("should return false if given path doesn't exist", async () => {
    const exists = await pathExists(__dirname, "..", "..", "dummy.json");

    expect(exists).toBe(false);
  });
});
