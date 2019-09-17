/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import split2 from "split2";
import { Transform } from "stream";
import { createDockerBuildContext } from "./createDockerBuildContext";
import { BuildImageOptions } from "./BuildImageOptions";
import { getBuildConfig } from "./config/getBuildConfig";

export const buildImage = async (
  dir: string,
  options: BuildImageOptions
): Promise<NodeJS.ReadableStream> => {
  const buildConfig = (await getBuildConfig(dir)).merge(options);
  const dockerBuildContext = await createDockerBuildContext(dir, buildConfig);
  const getDaemonMessage = new Transform({
    writableObjectMode: true,
    transform(chunk, _, callback): void {
      const { stream, error } = chunk as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      callback(error ? new Error(error) : null, stream || null);
    },
  });

  return new Docker()
    .buildImage(
      dockerBuildContext,
      buildConfig.tags && {
        t: buildConfig.tags.map(tag => `${buildConfig.name}:${tag}`),
      }
    )
    .then(daemonStream =>
      daemonStream.pipe(split2(line => JSON.parse(line))).pipe(getDaemonMessage)
    );
};
