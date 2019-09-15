# seel <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/seel/workflows/Build/badge.svg)](https://github.com/kevinpollet/seel/actions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

**seel** is a command-line tool that facilitates the build of container image for your Node.js applications. You don't need to master container best practices or write a Dockerfile to build a container image for your application, it's just as simple as invoking a command from your shell or npm script.

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Options](#options)
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

### Options

| Name          | Description                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| -v, --version | Output version.                                                                                                                          |
| -h, --help    | Output usage information.                                                                                                                |
| --cwd         | Define the current working directory, defaults to `.`.                                                                                   |
| --entrypoint  | Define the app entrypoint path, relative to the current working directory, defaults to `bin` or `main` script defined in `package.json`. |
| --labels      | Define the container image labels as a comma-separated list of key-value pairs, e.g. `--labels key=value,key2=value2`.                   |
| --name        | Define the container image name, defaults to the app `name` defined in `package.json`.                                                   |
| --ports       | Define the ports that the app exposes at runtime as a comma-separated list of values, e.g. `--ports 3000,4000/udp`.                      |
| --tags        | Define the container image tags as a comma-separated list of values, e.g. `--tags latest,1.0.0`.                                         |

## Examples

- [hello-world-cli](./examples/hello-world-cli) - Command-line tool which outputs `Hello, World!` or greets the name passed as an argument.

- [hello-world-express](./examples/hello-world-express) - Express app which outputs `{"message":"Hello, World!"}` or greets the given name.

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

Check out the [contribution guidelines](./CONTRIBUTING.md).

## License

[MIT](./LICENSE.md) © kevinpollet
