# seel <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/seel/workflows/Build/badge.svg)](https://github.com/kevinpollet/seel/actions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

**seel** is a command-line tool that facilitates the build of container image for your Node.js applications. You don't need to master container best practices or write a Dockerfile to build a container image for your application, it's just as simple as invoking a command from your shell or npm script.

## Install

```shell
$ npx seel                      # Run it once
$ npm install --global seel     # Install globally
$ npm install --save-dev seel   # Install locally to use it in npm scripts
```

## Usage

```shell
Usage: seel [options] [command]

Options:
  -v, --version    output the version string
  -h, --help       output usage information

Commands:
  build [options]  build a container image for the Node.js app in the current directory
```

### `build` command

```shell
Usage: seel build [options]

build a container image for the Node.js app in the current directory

Options:
  --cwd <path>            override the current working directory (default: ".")
  --exposedPorts <ports>  comma-separated list of ports that the container exposes at runtime
  --labels <labels>       comma-separated list of the container image labels
  -h, --help              output usage information
```

## Contributing

Contributions are welcome!

Want to file a bug, request a feature or contribute some code?

Check out the [contribution guidelines](./CONTRIBUTING.md).

## License

[MIT](./LICENSE.md) © kevinpollet
