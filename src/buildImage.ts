/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import JSONStream from "jsonstream";
import { getConfig } from "./getConfig";
import { createBuildContext } from "./createBuildContext";

interface Options {
  readonly cwd: string;
  readonly tar: boolean;
}

export const buildImage = async ({
  cwd,
  tar,
}: Options): Promise<NodeJS.ReadableStream> => {
  const config = await getConfig(cwd);
  const buildContext = createBuildContext(cwd, config);

  return tar
    ? buildContext
    : new Docker()
        .buildImage(buildContext, {
          t: config.tags.map(tag => `${config.name}:${tag}`),
        })
        .then(outputStream => outputStream.pipe(JSONStream.parse("stream")));
};
