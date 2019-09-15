/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { ImageConfig } from "./config/ImageConfig";

export const generateDockerfile = (config: ImageConfig): string => `
${
  config.installDependencies
    ? `FROM node:8-alpine AS builder
  WORKDIR app
  COPY package*.json ./
  RUN npm install --production --no-package-lock`
    : ""
}

FROM gcr.io/distroless/nodejs

${
  !config.labels || config.labels.length <= 0
    ? ""
    : `LABEL ${config.labels
        .map(({ key, value }) => `"${key}"="${value}"`)
        .join(" ")}`
}

WORKDIR app

${
  config.installDependencies
    ? "COPY --from=builder app/node_modules node_modules/"
    : ""
}

COPY . .

${
  !config.ports || config.ports.length <= 0
    ? ""
    : `EXPOSE ${config.ports.join(" ")}`
}

ENTRYPOINT ["/nodejs/bin/node", "${config.entrypoint}"]
`;
