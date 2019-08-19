/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import Docker from "dockerode";
import JSONStream from "jsonstream";
import { join } from "path";
import { Config } from "./Config";
import { createBuildContext } from "./createBuildContext";
import { DockerfileBuilder } from "./DockerfileBuilder";
import { getImageTags } from "./util";

interface Options {
  readonly cwd: string;
  readonly tar: boolean;
}

// TODO: cwd must be absolute
export const buildImage = async ({
  cwd,
  tar,
}: Options): Promise<NodeJS.ReadableStream> => {
  const pkgJSONPath = join(cwd, "package.json");
  const config = await Config.fromPkgJSON(pkgJSONPath);
  const dockerfile = new DockerfileBuilder()
    .pushInstruction("FROM", "node:8-alpine AS builder")
    .pushInstruction("WORKDIR", "app")
    .pushInstruction("COPY", "package*.json ./")
    .pushInstruction("RUN", "npm install --production")
    .pushInstruction("FROM", "gcr.io/distroless/nodejs")
    .pushInstruction("WORKDIR", "app")
    .pushInstruction("COPY", "--from=builder app/node_modules node_modules/")
    .pushInstruction("COPY", ". .")
    .pushInstruction("CMD", [config.entryPoint])
    .toString();

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
          t: getImageTags(config.name, config.version),
        })
        .then(outputStream => outputStream.pipe(JSONStream.parse("stream")));
};
