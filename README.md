# seel <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/seel/workflows/build/badge.svg)](https://github.com/kevinpollet/seel/actions)
[![npm Latest Version](https://img.shields.io/npm/v/seel/latest)](https://www.npmjs.com/package/seel)
[![npm Downloads](https://img.shields.io/npm/dm/seel)](https://www.npmjs.com/package/seel)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

**seel** is a command-line tool that facilitates the build of container image for your Node.js applications. You don't need to master container best practices or write a Dockerfile to build a container image, it's just as simple as invoking a command from your shell or npm script.

![screencast](https://cdn.jsdelivr.net/gh/kevinpollet/seel/screencast.svg)

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
  - [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Install

**npm**

```shell
$ npx seel                      # Run it once.
$ npm install --global seel     # Install globally.
$ npm install --save-dev seel   # Install locally to use it in npm scripts.
```

**yarn**

```shell
$ yarn global add seel          # Install globally.
$ yarn add seel --dev           # Install locally to use it in npm scripts.
```

## Usage

> **seel** uses the Docker daemon to build the container image for your Node.js application. When you invoke the **seel** command, the Docker daemon must be **running** and **accessible** through the `/var/run/docker.sock` socket.

### CLI

#### Options <!-- omit in toc -->

| Name                    | Description                                                                                                                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ‑v, ‑‑version           | Print version.                                                                                                                                                                            |
| ‑h, ‑‑help              | Print usage information.                                                                                                                                                                  |
| ‑‑cwd                   | Define the current working directory, defaults to `.`.                                                                                                                                    |
| ‑‑entrypoint            | Define the app entrypoint, defaults to `bin` or `main` script defined in `package.json`. The given `path` must be relative to the cwd.                                                    |
| ‑‑extra‑files           | Define the extra files to include in the container image with a glob pattern, e.g. `--extra-files 'public/**'`.                                                                           |
| ‑‑label                 | Define the container image label, e.g. `--label key=value --label key2=value2`. By default, the `version`, `description` and `maintainer` labels are added to the container image.        |
| ‑‑name                  | Define the container image name, defaults to the app `name` defined in `package.json`.                                                                                                    |
| ‑‑pkg‑registry‑auth‑url | Define the Node.js package registry authentication URL, e.g. `https://myregistry.example.com`. The environment variable named `AUTH_TOKEN` will be used to read the authentication token. |
| ‑‑port                  | Define the port that the container exposes at runtime, e.g. `--port 3000 --port 4000/udp`.                                                                                                |
| ‑‑tag                   | Define the container image tag, e.g. `--tag latest --tag 1.0.0`. By default, the [Semantic Versioning](https://semver.org/) strategy is used to define the container image tags.          |

### API

```typescript
import { buildImage, BuildImageOptions } from "seel";

const options: BuildImageOptions = {
  entrypoint?: string;
  extraFiles?: string[];
  labels?: { [key: string]: string };
  name?: string;
  pkgRegistryAuthUrl?: string;
  ports?: string[];
  tags?: string[];
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

- [cli](./examples/cli) - A command-line app that outputs `Hello, World!` or greets the name passed as an argument.

- [express](./examples/express) - An Express app that responds `{"message":"Hello, World!"}` to HTTP `GET /` requests or greets the name passed as query param.

- [express-static](./examples/express-static) - An Express app that serves the static files stored in the `public` directory.

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

Check out the [contribution guidelines](./CONTRIBUTING.md).

## License

[MIT](./LICENSE.md) © kevinpollet
