# hello-world-express

```shell
$ npm run build:image # Build container image with seel

$ docker run --init --rm -p 3000:3000 hello-world-express:latest # Run container with Docker

$ curl http://localhost:3000
{"message":"Hello, World!"}

$ curl http://localhost:3000?name=Docker
{"message":"Hello, Docker!"}
```

## License

[MIT](../../LICENSE.md) © kevinpollet
