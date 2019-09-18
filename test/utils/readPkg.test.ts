/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { join } from "path";
import { readPkg, readPkgSync } from "../../src/utils/readPkg";

describe("readPkg", () => {
  describe("readPkg", () => {
    it("should return the parsed pkg json at the root of the given directory", async () => {
      const directory = join(__dirname, "..", "..");
      const pkgJson = await readPkg(directory);

      expect(pkgJson).toBeDefined();
      expect(pkgJson.name).toBe("seel");
    });

    it("should throw an error if there is no pkg json at the root of the given directory", () =>
      expect(readPkg(__dirname)).rejects.toThrow());
  });

  describe("readPkgSync", () => {
    it("should return the parsed pkg json at the root of the given directory", () => {
      const directory = join(__dirname, "..", "..");
      const pkgJson = readPkgSync(directory);

      expect(pkgJson).toBeDefined();
      expect(pkgJson.name).toBe("seel");
    });

    it("should throw an error if there is no pkg json at the root of the given directory", () =>
      expect(() => readPkgSync(__dirname)).toThrow());
  });
});
