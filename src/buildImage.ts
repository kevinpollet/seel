/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import { resolve } from "path";
import split2 from "split2";
import { Transform } from "stream";
import { createDockerBuildContext } from "./createDockerBuildContext";
import { BuildImageOptions } from "./BuildImageOptions";
import { getBuildConfig } from "./config/getBuildConfig";
import { overrideBuildConfig } from "./config/overrideBuildConfig";

export const buildImage = async (
  dir: string,
  options: BuildImageOptions = {}
): Promise<NodeJS.ReadableStream> => {
  const absoluteAppDir = resolve(process.cwd(), dir);
  const defaultBuildConfig = await getBuildConfig(absoluteAppDir);
  const buildConfigWithOverrides = overrideBuildConfig(
    defaultBuildConfig,
    options
  );
  const dockerBuildContext = await createDockerBuildContext(
    absoluteAppDir,
    buildConfigWithOverrides
  );

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
      buildConfigWithOverrides.tags && {
        t: buildConfigWithOverrides.tags.map(
          tag => `${buildConfigWithOverrides.name}:${tag}`
        ),
      }
    )
    .then(daemonStream =>
      daemonStream.pipe(split2(line => JSON.parse(line))).pipe(getDaemonMessage)
    );
};
