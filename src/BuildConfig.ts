/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export interface BuildConfig {
  readonly name: string;
  readonly tags: ReadonlyArray<string>;
  readonly entryPoint: string;
  readonly exposedPorts?: ReadonlyArray<string>;
}
