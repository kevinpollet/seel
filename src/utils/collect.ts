/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { StringDictionary } from "../types/StringDictionary";

const collectKeyPairs = (separator = "=") => (
  curr: string,
  acc: Readonly<StringDictionary> = {}
): Readonly<StringDictionary> => {
  const pair = curr.split(separator);
  return pair.length >= 2 ? { ...acc, [pair[0].trim()]: pair[1].trim() } : acc;
};

const collectValues = (curr: string, acc: string[] = []): string[] =>
  acc.concat(curr);

export { collectKeyPairs, collectValues };
