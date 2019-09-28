/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export const mapAndCollect = <T = string>(m?: (value: string) => T) => (
  value: string,
  prev: (T | string)[] = []
): (T | string)[] => prev.concat([m ? m(value) : value]);
