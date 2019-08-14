/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import multimatch from "multimatch";
import { Readable } from "stream";
import tar from "tar-fs";
import { Pack } from "tar-stream";
import { Config } from "./Config";

interface File {
  readonly name: string;
  readonly data: string;
}

export const createBuildContext = (
  rootPath: string,
  config: Config,
  files: File[] = []
): Readable =>
  tar.pack(rootPath, {
    filter: name => multimatch(name, config.includes).length === 0,
    finalize: false,
    finish: function(pack: Pack) {
      files.forEach(({ name, data }) =>
        pack.entry(
          {
            name,
            size: data.length,
          },
          data
        )
      );
      pack.finalize();
    },
  });
