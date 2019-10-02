import { isArray } from "util";
import { StringDictionary } from "../types/StringDictionary";

/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const ifTruthy = <T>(value: Readonly<T> | undefined) => (
  fn: ((arg: Readonly<T>) => string) | string
): string => (value ? (typeof fn === "string" ? fn : fn(value)) : "");

const ifNotEmpty = <
  T extends Readonly<Partial<StringDictionary> | Array<string>>
>(
  value: T | undefined | null
) => (fn: ((arg: T) => string) | string): string => {
  const isEmpty =
    !value ||
    (isArray(value) && value.length <= 0) ||
    (typeof value === "object" && Object.keys(value).length <= 0);

  return isEmpty ? "" : typeof fn === "string" ? fn : fn(value!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
};

export { ifNotEmpty, ifTruthy };
