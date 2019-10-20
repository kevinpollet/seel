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
  const buildConfig = overrideBuildConfig(defaultBuildConfig, options);
  const dockerBuildContext = await createDockerBuildContext(
    absoluteDir,
    buildConfig
  );
  const dockerImageTags = (buildConfig.tags || []).map(
    tag => `${buildConfig.name}:${tag}`
  );

  const getDaemonMessage = new Transform({
    writableObjectMode: true,
    transform({ stream, error }, _, callback): void {
      callback(error ? new Error(error) : undefined, stream || undefined);
    },
  });

  return new Dockerode()
    .buildImage(dockerBuildContext, {
      t: dockerImageTags,
      buildargs: {
        AUTH_TOKEN:
          buildConfig.pkgRegistryAuth && buildConfig.pkgRegistryAuth.token,
      },
    })
    .then(daemonStream =>
      daemonStream.pipe(split2(line => JSON.parse(line))).pipe(getDaemonMessage)
    );
};
