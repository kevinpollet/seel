/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import multimatch from "multimatch";
import { resolve } from "path";
import tar from "tar-fs";
import { Pack } from "tar-stream";

interface File {
  readonly name: string;
  readonly content: string;
}

interface Options {
  readonly rootDir: string;
  readonly includePatterns?: ReadonlyArray<string>;
  readonly filesToInject?: ReadonlyArray<File>;
}

export const createBuildContext = (options: Options): NodeJS.ReadableStream => {
  const absoluteIncludePatterns = (options.includePatterns || []).map(pattern =>
    resolve(options.rootDir, pattern)
  );

  return tar.pack(options.rootDir, {
    finalize: false,
    ignore(name: string): boolean {
      return (
        absoluteIncludePatterns.length !== 0 &&
        multimatch(name, absoluteIncludePatterns).length === 0
      );
    },
    finish(pack: Pack): void {
      (options.filesToInject || []).forEach(({ name, content }) =>
        pack.entry({ name, size: content.length }, content)
      );
      pack.finalize();
    },
  });
};
