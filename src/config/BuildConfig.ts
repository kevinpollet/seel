/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { StringDictionary } from "../types/StringDictionary";

export interface BuildConfig {
  readonly name: string;
  readonly entrypoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly labels?: Readonly<Partial<StringDictionary>>;
  readonly pkgRegistryAuthUrl?: string;
  readonly ports?: ReadonlyArray<string>;
  readonly extraFiles?: ReadonlyArray<string>;
  readonly useYarn: boolean;
  readonly lockFile?: string;
  readonly configFiles?: ReadonlyArray<string>;
}
