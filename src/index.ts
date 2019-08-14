/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import { Config } from "./Config";
import { createBuildContext } from "./createBuildContext";

// TODO: cwd must be absolute
export const buildImage = async (cwd: string): Promise<unknown> => {
  const config = await Config.readFromPkgJSON(cwd);
  const buildContextStream = createBuildContext(cwd, config);

  return new Docker().buildImage(buildContextStream, {
    t: `${config.name}:latest`,
  });
};
