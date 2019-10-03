/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import nunjucks from "nunjucks";
import { BuildConfig } from "./config/BuildConfig";

const dockerfileTemplate = `
{% set comma = joiner(" ") %}

FROM node:8-alpine AS builder
{{ "ARG AUTH_TOKEN" if pkgRegistryAuthUrl }}
WORKDIR app

{% if copyNpmrcFile or copyYarnrcFile %}
  COPY {{ ".npmrc" if copyNpmrcFile }} {{ ".yarnrc" if copyYarnrcFile }} ./
{% endif %}

COPY package.json {{ "package-lock.json" if copyLockFile and not useYarn }} {{ "yarn.lock" if copyLockFile and useYarn }} ./

{% set install_command = "npm install --production --no-package-lock" %}
{% if useYarn %}
  {% set install_command = "yarn install --production --pure-lockfile" %}
{% endif %}

{% if not pkgRegistryAuthUrl %}
  RUN {{ install_command }}
{% else %}
  RUN echo -e 'always-auth=true\\n{{pkgRegistryAuthUrl}}:_authToken=\${AUTH_TOKEN}\\n' >> ~/.npmrc && \
    {{ install_command }} && \
    rm -rf ~/.npmrc
{% endif %}

COPY . .

FROM gcr.io/distroless/nodejs

{% if labels %}
  LABEL {% for key, value in labels %}{{ comma() }}"{{ key }}"="{{value}}"{% endfor %}
{% endif %}

WORKDIR app
COPY --from=builder app/ ./

{% if ports %}
  EXPOSE {% for port in ports %}{{ comma() }}{{ port }}{% endfor %}
{% endif %}

ENTRYPOINT ["/nodejs/bin/node", "{{ entrypoint }}"]
`;

export const generateDockerfile = (config: BuildConfig): string =>
  nunjucks.renderString(dockerfileTemplate, config);
