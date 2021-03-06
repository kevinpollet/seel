/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { BuildConfig } from "./config/BuildConfig";

// TODO must be refactor safe
export type BuildImageOptions = Partial<
  Omit<BuildConfig, "useYarn" | "lockFile" | "configFiles">
>;
