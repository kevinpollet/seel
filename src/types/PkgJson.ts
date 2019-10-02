/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { StringDictionary } from "./StringDictionary";

export interface PkgJson {
  readonly name: string;
  readonly description?: string;
  readonly version: string;
  readonly main?: string;
  readonly bin?: Readonly<StringDictionary>;
  readonly dependencies?: Readonly<StringDictionary>;
  readonly author?: {
    readonly name?: string;
    readonly email?: string;
    readonly url?: string;
  };
}
