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

${config.labels &&
  config.labels.length > 0 &&
  `LABEL ${config.labels
    .map(({ key, value }) => `"${key}"="${value}"`)
    .join(" ")}`}

WORKDIR app
COPY --from=builder app/node_modules node_modules/
COPY . .

${config.exposedPorts &&
  config.exposedPorts.length > 0 &&
  `EXPOSE ${config.exposedPorts.join(" ")}`}
  
ENTRYPOINT ["/nodejs/bin/node", "${config.entryPoint}"]
`;
