# seel <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/seel/workflows/build/badge.svg)](https://github.com/kevinpollet/seel/actions)
[![npm Latest Version](https://img.shields.io/npm/v/seel/latest)](https://www.npmjs.com/package/seel)
[![npm Downloads](https://img.shields.io/npm/dm/seel)](https://www.npmjs.com/package/seel)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/kevinpollet/seel)](./LICENSE.md)
[![GitHub stars](https://img.shields.io/github/stars/kevinpollet/seel?style=social)](https://github.com/kevinpollet/seel/stargazers)
[![Twitter Follow](https://img.shields.io/twitter/follow/kevinpollet?style=social)](https://twitter.com/kevinpollet)

**seel** is a command-line tool that facilitates the build of container images for your [Node.js](https://nodejs.org/) applications. You don't need to master container best practices or write a [Dockerfile](https://docs.docker.com/engine/reference/builder/) to build a container image, it's just as simple as invoking a command from your shell or npm script.

- **Simple** - No need to write a Dockerfile or master container best practices.
- **Flexible** - Overwrite opinionated defaults to fit your needs.
- **Fast** - Optimized image layers to take advantage of build caching.

![screencast](https://cdn.jsdelivr.net/gh/kevinpollet/seel@be83df272ac6ca4f19455093f46013dba7541530/screencast.svg)

<details>
  <summary><strong>Table of Contents</strong> (click to expand)</summary>

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
  - [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

</details>

## Install

**npm**

```shell
npx seel                      # Run it once.
npm install --global seel     # Install globally.
npm install --save-dev seel   # Install locally to use it in npm scripts.
```

**Yarn**

```shell
yarn global add seel          # Install globally.
yarn add seel --dev           # Install locally to use it in npm scripts.
```

## Usage

> **Note: seel uses the [Docker daemon](https://docs.docker.com/engine/docker-overview/) to build the container image. When you invoke the seel command, the daemon must be running and accessible through the `/var/run/docker.sock` socket.**

### CLI

#### Options <!-- omit in toc -->

| Name                      | Description                                                                                                                                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ‑v, ‑‑version             | Print version.                                                                                                                                                                                                                                                         |
| ‑h, ‑‑help                | Print usage information.                                                                                                                                                                                                                                               |
| ‑‑cwd                     | Define the current working directory, defaults to `.`.                                                                                                                                                                                                                 |
| ‑‑entrypoint              | Define the app entrypoint, defaults to `bin` or `main` script defined in `package.json`. The given `path` must be relative to the cwd.                                                                                                                                 |
| ‑‑extra‑files             | Define the extra files to include in the container image with a glob pattern, e.g. `--extra-files 'public/**'`.                                                                                                                                                        |
| ‑‑label                   | Define the container image label, e.g. `--label key=value --label key2=value2`. By default, the `version`, `description` and `maintainer` labels are added to the container image.                                                                                     |
| ‑‑name                    | Define the container image name, defaults to the app `name` defined in `package.json`.                                                                                                                                                                                 |
| ‑‑pkg‑registry‑auth‑url   | Set-up authentication for the given package registry base URL, e.g. `https://myregistry.example.com`. If the authentication token is not defined with `‑‑pkg‑registry‑auth‑token` the environment variable `AUTH_TOKEN` will be used to read the authentication token. |
| ‑‑pkg‑registry‑auth‑token | Define the authentication token for the package registry base URL previously configured.                                                                                                                                                                               |
| ‑‑port                    | Define the port that the container exposes at runtime, e.g. `--port 3000 --port 4000/udp`.                                                                                                                                                                             |
| ‑‑tag                     | Define the container image tag, e.g. `--tag latest --tag 1.0.0`. By default, the [Semantic Versioning](https://semver.org/) strategy is used to define the container image tags.                                                                                       |

### API

```typescript
import { buildImage, BuildImageOptions } from "seel";

const options: BuildImageOptions = {
  entrypoint?: string;
  extraFiles?: string[];
  name?: string;
  ports?: string[];
  tags?: string[];
  labels?: {
    [key: string]: string
  };
  pkgRegistryAuth?: {
    url: string;
    token: string
  };
};

buildImage("/usr/app", options)
  .then(stream => stream
    .once("error", () => {
      console.log(err);
      process.exit(1);
    })
    .pipe(process.stdout)
  )
  .catch(err => {
    console.log(err);
    process.exit(2);
  });
```

## Examples

The [examples](./examples) directory contains the following examples:

- [NestJS application](./examples/nestjs)
- [Express application](./examples/express)
- [Command-line application](./examples/cli)
- [Command-line application with ECMAScript Modules](./examples/cli-esm)

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

Check out the [contribution guidelines](./CONTRIBUTING.md).

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kevinpollet.dev"><img src="https://avatars0.githubusercontent.com/u/299142?v=4" width="100px;" alt="Kevin Pollet"/><br /><sub><b>Kevin Pollet</b></sub></a><br /><a href="https://github.com/kevinpollet/seel/commits?author=kevinpollet" title="Code">💻</a> <a href="https://github.com/kevinpollet/seel/commits?author=kevinpollet" title="Documentation">📖</a> <a href="#infra-kevinpollet" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](./LICENSE.md)
