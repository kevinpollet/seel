/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export interface PkgJSON {
  readonly name: string;
  readonly version: string;
  readonly main: string | undefined;
  readonly bin?:
    | undefined
    | string
    | {
        [key: string]: string;
      };
}
