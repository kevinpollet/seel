/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { getSemverTags } from "../../src/config/getSemverTags";

describe("getSemverTags", () => {
  it("should throw an error if the given version is not a valid semver", () => {
    const version = "1.0.0alpha.1";

    expect(() => getSemverTags(version)).toThrow();
  });

  it("should return the tags corresponding to the given prerelease version", () => {
    const version = "1.0.0-alpha.1";
    const tags = getSemverTags(version);

    expect(tags).toEqual(["alpha", "1.0.0-alpha.1"]);
  });

  it("should return the tags corresponding to the given release version", () => {
    const version = "1.2.0";
    const tags = getSemverTags(version);

    expect(tags).toEqual(["latest", "1", "1.2", "1.2.0"]);
  });
});
