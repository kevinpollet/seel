/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { mapAndCollect } from "../../src/utils/mapAndCollect";

describe("mapAndCollect", () => {
  it("should collect the given flag values", () => {
    const collect = mapAndCollect();
    const values = collect("second", collect("first"));

    expect(values).toEqual(["first", "second"]);
  });

  it("should map and collect the given flag values", () => {
    const collect = mapAndCollect(value => value.length);
    const values = collect("second", collect("first"));

    expect(values).toEqual([5, 6]);
  });
});
