/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Dockerode from "dockerode";
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
  const absoluteDir = resolve(process.cwd(), dir);
  const defaultBuildConfig = await getBuildConfig(absoluteDir);
  const buildConfigWithOverrides = overrideBuildConfig(
    defaultBuildConfig,
    options
  );
  const dockerBuildContext = await createDockerBuildContext(
    absoluteDir,
    buildConfigWithOverrides
  );
  const dockerImageTags = (buildConfigWithOverrides.tags || []).map(
    tag => `${buildConfigWithOverrides.name}:${tag}`
  );

  const getDaemonMessage = new Transform({
    writableObjectMode: true,
    transform(chunk, _, callback): void {
      const { stream, error } = chunk as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      callback(error ? new Error(error) : null, stream || null);
    },
  });

  return new Dockerode()
    .buildImage(dockerBuildContext, {
      t: dockerImageTags,
      buildargs: { AUTH_TOKEN: process.env.AUTH_TOKEN },
    })
    .then(daemonStream =>
      daemonStream.pipe(split2(line => JSON.parse(line))).pipe(getDaemonMessage)
    );
};
