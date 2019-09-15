/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const ifTruthy = <T>(value: Readonly<T> | undefined) => (
  fn: ((ctx: Readonly<T>) => string) | string
): string => (value ? (typeof fn === "string" ? fn : fn(value)) : "");

const ifNotEmpty = <T>(value: Readonly<Array<T>> | undefined) => (
  fn: ((ctx: Readonly<Array<T>>) => string) | string
): string =>
  value && value.length > 0 ? (typeof fn === "string" ? fn : fn(value)) : "";

export { ifNotEmpty, ifTruthy };
