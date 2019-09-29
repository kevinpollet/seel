# seel <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/seel/workflows/build/badge.svg)](https://github.com/kevinpollet/seel/actions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

**seel** is a command-line tool that facilitates the build of container image for your Node.js applications. You don't need to master container best practices or write a Dockerfile to build a container image, it's just as simple as invoking a command from your shell or npm script.

![screencast](./screencast.svg)

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
  - [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Install

```shell
# npm
$ npx seel                      # Run it once.
$ npm install --global seel     # Install globally.
$ npm install --save-dev seel   # Install locally to use it in npm scripts.

# yarn
$ yarn global add seel          # Install globally.
$ yarn add seel --dev           # Install locally to use it in npm scripts.
```

## Usage

> **seel** uses the Docker daemon to build the container image for your Node.js application. When you invoke the **seel** command, the Docker daemon must be **running** and **accessible** through the `/var/run/docker.sock` socket.

### CLI

#### Options <!-- omit in toc -->

| Name           | Description                                                                                                                            |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| ‑v, ‑‑version  | Output version.                                                                                                                        |
| ‑h, ‑‑help     | Output usage information.                                                                                                              |
| ‑‑cwd          | Define the current working directory, defaults to `.`.                                                                                 |
| ‑‑entrypoint   | Define the app entrypoint, defaults to `bin` or `main` script defined in `package.json`. The given `path` must be relative to the cwd. |
| ‑‑exposed‑port | Define the port that the container exposes at runtime, e.g. `--exposed-port 3000 --exposed-port 4000/udp`.                             |
| ‑‑extra‑files  | Define the extra files to include in the container image with a glob pattern, e.g. `--extra-files 'public/**'`.                        |
| ‑‑label        | Define the container image label, e.g. `--label key=value --label key2=value2`.                                                        |
| ‑‑name         | Define the container image name, defaults to the app `name` defined in `package.json`.                                                 |
| ‑‑tag          | Define the container image tag, e.g. `--tag latest --tag 1.0.0`.                                                                       |

### API

```typescript
import { join } from "path";
import { buildImage } from "seel";

const appDir = join(__dirname, "my-app");
const options = {
  name?: string;
  entrypoint?: string;
  tags?: string[];
  labels?: [string, string][];
  exposedPorts?: string[];
  extraFiles?: string[];
};

buildImage(appDir, options)
  .then(stream => stream.pipe(process.stdout))
  .catch(err => {
    console.log(err);
    process.exit(1);
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
