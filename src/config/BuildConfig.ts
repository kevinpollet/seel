/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { Dictionary } from "../types/Dictionary";
import { PkgRegistryAuth } from "./PkgRegistryAuth";

export interface BuildConfig {
  readonly name: string;
  readonly entrypoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly labels?: Readonly<Dictionary<string>>;
  readonly pkgRegistryAuth?: Readonly<PkgRegistryAuth>;
  readonly ports?: ReadonlyArray<string>;
  readonly extraFiles?: ReadonlyArray<string>;
  readonly useYarn: boolean;
  readonly lockFile?: string;
  readonly configFiles?: ReadonlyArray<string>;
}
