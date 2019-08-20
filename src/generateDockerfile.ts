/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { BuildConfig } from "./BuildConfig";

export const generateDockerfile = (config: BuildConfig): string => `
FROM node:8-alpine AS builder
WORKDIR app
COPY package*.json ./
RUN npm install --production

FROM gcr.io/distroless/nodejs
WORKDIR app
COPY --from=builder app/node_modules node_modules/
COPY . .
${
  !config.exposedPorts || config.exposedPorts.length <= 0
    ? ""
    : config.exposedPorts.map(exposedPort => `EXPOSE ${exposedPort}`).join("\n")
}
ENTRYPOINT ["/nodejs/bin/node", "${config.entryPoint}"]
`;
