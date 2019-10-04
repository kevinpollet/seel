/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { Dictionary } from "./Dictionary";

export interface PkgJson {
  readonly name: string;
  readonly description?: string;
  readonly version: string;
  readonly main?: string;
  readonly bin?: Readonly<Dictionary<string>>;
  readonly dependencies?: Readonly<Dictionary<string>>;
  readonly author?: {
    readonly name?: string;
    readonly email?: string;
    readonly url?: string;
  };
}
