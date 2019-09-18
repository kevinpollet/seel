/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { BuildConfig } from "./config/BuildConfig";
import { ifNotEmpty, ifTruthy } from "./utils/template";

export const generateDockerfile = (config: BuildConfig): string => `
${ifTruthy(config.installDependencies)(
  `FROM node:8-alpine AS builder
WORKDIR app

${ifTruthy(config.useYarn)(
  `COPY package.json ${ifTruthy(config.copyLockFile)("yarn.lock")} ./`
)}
${ifTruthy(!config.useYarn)(
  `COPY package.json ${ifTruthy(config.copyLockFile)("package-lock.json")} ./`
)}

${ifTruthy(config.useYarn)("RUN yarn install --production ---pure-lockfile")}
${ifTruthy(!config.useYarn)("RUN npm install --production --no-package-lock")}`
)}

FROM gcr.io/distroless/nodejs

${ifNotEmpty(config.labels)(
  labels =>
    `LABEL ${labels.map(([key, value]) => `"${key}"="${value}"`).join(" ")}`
)}

WORKDIR app

${ifTruthy(config.installDependencies)(
  "COPY --from=builder app/node_modules node_modules/"
)}

COPY . .

${ifNotEmpty(config.exposedPorts)(ports => `EXPOSE ${ports.join(" ")}`)}

ENTRYPOINT ["/nodejs/bin/node", "${config.entrypoint}"]
`;
