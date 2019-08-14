/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import { Config } from "./Config";
import { createBuildContext } from "./createBuildContext";
import { DockerfileBuilder } from "./DockerfileBuilder";

// TODO: cwd must be absolute
export const buildImage = async (cwd: string): Promise<unknown> => {
  const config = await Config.readFromPkgJSON(cwd);
  const dockerfile = new DockerfileBuilder()
    .pushInstruction("FROM", "gcr.io/distroless/nodejs")
    .pushInstruction("COPY", ". .")
    .pushInstruction("CMD", [config.entryPoint])
    .toString();

  const buildContextStream = createBuildContext(cwd, config, [
    { name: "Dockerfile", data: dockerfile },
    { name: ".dockerignore", data: "*" },
  ]);

  return new Docker().buildImage(buildContextStream, {
    t: `${config.name}:latest`,
  });
};
