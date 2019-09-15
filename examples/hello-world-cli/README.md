# hello-world-cli

## Build container image

```shell
$ npm run build:image
```

## Run container from built image

```shell
$ docker run --init --rm hello-world-cli:latest

   ╔═════════════════════════╗
   ║                         ║
   ║                         ║
   ║      Hello, World!      ║
   ║                         ║
   ║                         ║
   ╚═════════════════════════╝

$ docker run --init --rm hello-world-cli:latest Docker

   ╔══════════════════════════╗
   ║                          ║
   ║                          ║
   ║      Hello, Docker!      ║
   ║                          ║
   ║                          ║
   ╚══════════════════════════╝
```

## License

[MIT](../../LICENSE.md) © kevinpollet
