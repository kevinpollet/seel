/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { BuildConfig } from "./config/BuildConfig";
import { ifNotEmpty, ifTruthy } from "./utils/template";

export const generateDockerfile = (config: BuildConfig): string => `
FROM node:8-alpine AS builder
WORKDIR app

${ifTruthy(config.useYarn)(
  `COPY package.json ${ifTruthy(config.copyLockFile)("yarn.lock")} ./
  RUN yarn install --production --pure-lockfile`
)}
${ifTruthy(!config.useYarn)(
  `COPY package.json ${ifTruthy(config.copyLockFile)("package-lock.json")} ./
  RUN npm install --production --no-package-lock`
)}

COPY . .

FROM gcr.io/distroless/nodejs

${ifNotEmpty(config.labels)(
  labels =>
    `LABEL ${Object.entries(labels)
      .map(([key, value]) => `"${key}"="${value}"`)
      .join(" ")}`
)}

WORKDIR app

COPY --from=builder app/ ./

${ifNotEmpty(config.ports)(ports => `EXPOSE ${ports.join(" ")}`)}

ENTRYPOINT ["/nodejs/bin/node", "${config.entrypoint}"]
`;
