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

FROM node:10-alpine AS builder
{{ "ARG AUTH_TOKEN" if pkgRegistryAuthUrl }}
WORKDIR app

{% if configFiles and configFiles.length > 0 %}
  COPY {% for file in configFiles %}{{ comma() }}{{ file }}{% endfor %} ./
{% endif %}

COPY package.json {{ lockFile if lockFile }} ./

{% set installCommand = "npm install --production --no-package-lock" %}
{% if useYarn %}
  {% set installCommand = "yarn install --production --pure-lockfile" %}
{% endif %}

{% if not pkgRegistryAuthUrl %}
  RUN {{ installCommand }}
{% else %}
  RUN echo -e 'always-auth=true\\n{{pkgRegistryAuthUrl}}:_authToken=\${AUTH_TOKEN}\\n' >> ~/.npmrc && \
    {{ installCommand }} && \
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
