/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import split2 from "split2";
import { Transform } from "stream";
import { createBuildContext } from "./createBuildContext";
import { BuildConfig } from "./BuildConfig";

export const buildImage = async (
  rootDir: string,
  config: BuildConfig
): Promise<NodeJS.ReadableStream> => {
  const buildContext = await createBuildContext(rootDir, config);
  const getDaemonMessage = new Transform({
    writableObjectMode: true,
    transform(chunk, _, callback): void {
      const { stream, error } = chunk as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      callback(error ? new Error(error) : null, stream || null);
    },
  });

  return new Docker()
    .buildImage(buildContext, {
      t: config.tags.map(tag => `${config.name}:${tag}`),
    })
    .then(daemonStream =>
      daemonStream.pipe(split2(line => JSON.parse(line))).pipe(getDaemonMessage)
    );
};
