/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

export interface BuildConfig {
  readonly name: string;
  readonly entrypoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly labels?: ReadonlyArray<[string, string]>;
  readonly ports?: ReadonlyArray<string>;
  readonly useYarn: boolean;
  readonly copyLockFile: boolean;
  readonly installDependencies: boolean;
  readonly extraFiles?: ReadonlyArray<string>;
}
