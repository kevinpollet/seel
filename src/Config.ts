/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export interface Config {
  readonly name: string;
  readonly tags: ReadonlyArray<string>;
  readonly entryPoint: string;
}
