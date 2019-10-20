/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { normalizePkgRegistryUrl } from "../../src/utils/normalizePkgRegistryUrl";

describe("normalizePkgRegistryUrl", () => {
  it("should throw an error if the given pkg registry URL is unsupported", () => {
    const pkgRegistryUrl = "tcp://test.com";

    expect(() => normalizePkgRegistryUrl(pkgRegistryUrl)).toThrow();
  });

  it("should return the pkg registry URL without the http protocol", () => {
    const pkgRegistryUrl = "http://test.com/";
    const normalizedPkgRegistryUrl = normalizePkgRegistryUrl(pkgRegistryUrl);

    expect(normalizedPkgRegistryUrl).toEqual("//test.com/");
  });

  it("should return the pkg registry URL without the https protocol", () => {
    const pkgRegistryUrl = "https://test.com/";
    const normalizedPkgRegistryUrl = normalizePkgRegistryUrl(pkgRegistryUrl);

    expect(normalizedPkgRegistryUrl).toEqual("//test.com/");
  });

  it("should always return the pkg registry URL with an ending /", () => {
    const pkgRegistryUrl = "https://test.com";
    const normalizedPkgRegistryUrl = normalizePkgRegistryUrl(pkgRegistryUrl);

    expect(normalizedPkgRegistryUrl).toEqual("//test.com/");
  });
});
