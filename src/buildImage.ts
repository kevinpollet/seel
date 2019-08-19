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
import { generateDockerfile } from "./generateDockerfile";

interface Options {
  readonly cwd: string;
  readonly tar: boolean;
}

// TODO: cwd must be absolute
export const buildImage = async ({
  cwd,
  tar,
}: Options): Promise<NodeJS.ReadableStream> => {
  const config = await getConfig(cwd);
  const dockerfile = generateDockerfile(config);
  const buildContext = createBuildContext({
    rootDir: cwd,
    entryPoint: config.entryPoint,
    filesToInject: [
      { name: "Dockerfile", content: dockerfile },
      { name: ".dockerignore", content: "*" },
    ],
  });

  return tar
    ? buildContext
    : new Docker()
        .buildImage(buildContext, {
          t: config.tags.map(tag => `${config.name}:${tag}`),
        })
        .then(outputStream => outputStream.pipe(JSONStream.parse("stream")));
};
