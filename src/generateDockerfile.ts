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
${ifTruthy(config.pkgRegistryAuthUrl)("ARG AUTH_TOKEN")}
WORKDIR app

${ifTruthy(config.copyNpmrcFile || config.copyYarnrcFile)(
  `COPY ${ifTruthy(config.copyNpmrcFile)(".npmrc")} \
     ${ifTruthy(config.copyYarnrcFile)(".yarnrc")} \
    ./`
)}

${ifTruthy(config.useYarn)(
  `COPY package.json ${ifTruthy(config.copyLockFile)("yarn.lock")} ./
  ${ifTruthy(!config.pkgRegistryAuthUrl)(
    "RUN yarn install --production --pure-lockfile"
  )}
  ${ifTruthy(
    config.pkgRegistryAuthUrl
  )(`RUN echo -e 'always-auth=true\\n${config.pkgRegistryAuthUrl}:_authToken=\${AUTH_TOKEN}\\n' > ~/.npmrc && \
    yarn install --production --pure-lockfile && \
    rm -rf ~/.npmrc`)}`
)}
${ifTruthy(!config.useYarn)(
  `COPY package.json ${ifTruthy(config.copyLockFile)("package-lock.json")} ./
  ${ifTruthy(!config.pkgRegistryAuthUrl)(
    "RUN npm install --production --pure-lockfile"
  )}
  ${ifTruthy(
    config.pkgRegistryAuthUrl
  )(`RUN echo -e 'always-auth=true\\n${config.pkgRegistryAuthUrl}:_authToken=\${AUTH_TOKEN}\\n' >> ~/.npmrc && \
    npm install --production --no-package-lock && \
    cat ~/.npmrc && \
    rm -rf ~/.npmrc`)}`
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
