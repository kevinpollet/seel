/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { collectKeyPairs, collectValues } from "../../src/utils/collect";

describe("collect", () => {
  describe("collectValues", () => {
    it("should collect the given values", () => {
      const values = collectValues("second", collectValues("first"));

      expect(values).toEqual(["first", "second"]);
    });
  });

  describe("collectKeyPairs", () => {
    it("should collect the given key-value pairs", () => {
      const collect = collectKeyPairs();
      const values = collect("second=2", collect("first=1"));

      expect(values).toEqual({ first: "1", second: "2" });
    });

    it("should collect the given key-value pairs separated with the given separator", () => {
      const collect = collectKeyPairs(":");
      const values = collect("second:2", collect("first:1"));

      expect(values).toEqual({ first: "1", second: "2" });
    });

    it("should ignore the given malformed key-value pairs", () => {
      const collect = collectKeyPairs();
      const values = collect("second:2", collect("first=1"));

      expect(values).toEqual({ first: "1" });
    });
  });
});
