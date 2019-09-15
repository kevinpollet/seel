# hello-world-express

## Build container image

```shell
$ npm run build:image
```

## Run container from built image

```shell
$ docker run --init --rm -p 3000:3000 hello-world-express:latest

$ curl http://localhost:3000
{"message":"Hello, World!"}

$ curl http://localhost:3000?name=Docker
{"message":"Hello, Docker!"}
```

## License

[MIT](../../LICENSE.md) © kevinpollet
