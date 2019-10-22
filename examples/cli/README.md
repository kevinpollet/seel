# Command-line application

This example is a command-line application that outputs `Hello, World!` or greets the `name` given as argument.

To build and run the container image:

- Run `npm run build:image`
- Run `docker run --rm cli:latest`

```shell
$ docker run --rm cli:latest
Hello, World!
```
