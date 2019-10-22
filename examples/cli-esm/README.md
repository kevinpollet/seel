# Command-line application with ECMAScript Modules

This example is a command-line application using **ECMAScript Modules** compiled with [Babel](https://babeljs.io/) that outputs `Hello, World!`.

To build and run the container image:

- Run `npm install`
- Run `npm run build:image`
- Run `docker run --rm cli-esm:latest`

```shell
$ docker run --rm cli-esm:latest
Hello, World!
```
