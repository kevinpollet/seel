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

// TODO: cwd must be absolute
export const buildImage = async (
  cwd: string
): Promise<NodeJS.ReadableStream> => {
  const pkgJSONPath = join(cwd, "package.json");
  const config = await Config.fromPkgJSON(pkgJSONPath);
  const dockerfile = new DockerfileBuilder()
    .pushInstruction("FROM", "node:8-alpine AS builder")
    .pushInstruction("COPY", "package*.json ./")
    .pushInstruction("RUN", "npm install --production")
    .pushInstruction("FROM", "gcr.io/distroless/nodejs")
    .pushInstruction("COPY", "--from=builder node_modules/ node_modules/")
    .pushInstruction("COPY", ". .")
    .pushInstruction("CMD", [config.entryPoint])
    .toString();

  const buildContext = createBuildContext({
    rootDir: cwd,
    includePatterns: config.includes,
    filesToInject: [
      { name: "Dockerfile", content: dockerfile },
      { name: ".dockerignore", content: "*" },
    ],
  });

  return new Docker()
    .buildImage(buildContext, { t: `${config.name}:latest` })
    .then(outputStream => outputStream.pipe(JSONStream.parse("stream")));
};
