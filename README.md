# Docku <!-- omit in toc -->

[![Build Status](https://github.com/kevinpollet/docku/workflows/Build/badge.svg)](https://github.com/kevinpollet/docku/actions)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Usage](#usage)
  - [`build` command](#build-command)
- [Contributing](#contributing)
- [License](#license)

## Installation

```shell
$ npm install --save-dev docku   # Install locally to use it in npm scripts
$ npm install --global docku     # Install globally
$ npx docku                      # Run it once
```

## Usage

```shell
Usage: docku [options] [command]

Options:
  -v, --version    output the version string
  -h, --help       output usage information

Commands:
  build [options]  build a container image for the Node.js app in the current directory
```

### `build` command

```shell
Usage: docku build [options]

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
