# hello-world-express-static

## Build container image

```shell
$ npm run build:image
```

## Run container from built image

```shell
$ docker run --init --rm -p 3000:3000 hello-world-express-static:latest

$ curl http://localhost:3000
<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
  </head>
  <body>
    <p>Hello, World!</p>
  </body>
</html>
```

## License

[MIT](../../LICENSE.md) © kevinpollet
