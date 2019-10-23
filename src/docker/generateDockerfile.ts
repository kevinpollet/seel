/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import nunjucks from "nunjucks";
import { BuildConfig } from "../config/BuildConfig";
import { normalizePkgRegistryUrl } from "../utils/normalizePkgRegistryUrl";

const dockerfileTemplate = `
{% set comma = joiner(" ") %}

FROM node:12-alpine AS builder
{{ "ARG AUTH_TOKEN" if pkgRegistryAuth }}
WORKDIR app

{% if configFiles and configFiles.length > 0 %}
  COPY {% for file in configFiles %}{{ comma() }}{{ file }}{% endfor %} ./
{% endif %}

COPY package.json {{ lockFile if lockFile }} ./

{% set installCommand = "npm install --production --no-package-lock" %}
{% if useYarn %}
  {% set installCommand = "yarn install --production --pure-lockfile" %}
{% endif %}

{% if not pkgRegistryAuth %}
  RUN {{ installCommand }}
{% else %}
  RUN echo -e 'always-auth=true\\n{{normalizePkgRegistryUrl(pkgRegistryAuth.url)}}:_authToken=\${AUTH_TOKEN}\\n' >> ~/.npmrc && \
    {{ installCommand }} && \
    rm -rf ~/.npmrc
{% endif %}

COPY . .

FROM node:12-alpine

{% if labels %}
  LABEL {% for key, value in labels %}{{ comma() }}"{{ key }}"="{{value}}"{% endfor %}
{% endif %}

RUN apk add --no-cache tini \
  && mkdir /app \
  && chown -R node:node /app

WORKDIR app

USER node

COPY --chown=node:node --from=builder app/ ./

{% if ports %}
EXPOSE {% for port in ports %}{{ comma() }}{{ port }}{% endfor %}
{% endif %}

ENTRYPOINT ["/sbin/tini", "--", "node", "{{ entrypoint }}"]
`;

export const generateDockerfile = (config: BuildConfig): string =>
  nunjucks.renderString(dockerfileTemplate, {
    ...config,
    normalizePkgRegistryUrl,
  });
