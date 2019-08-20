/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import JSONStream from "jsonstream";
import { createBuildContext } from "./createBuildContext";
import { BuildConfig } from "./BuildConfig";

export const buildImage = async (
  rootDir: string,
  config: BuildConfig
): Promise<NodeJS.ReadableStream> => {
  const buildContext = createBuildContext(rootDir, config);

  return new Docker()
    .buildImage(buildContext, {
      t: config.tags.map(tag => `${config.name}:${tag}`),
    })
    .then(outputStream => outputStream.pipe(JSONStream.parse("stream")));
};
