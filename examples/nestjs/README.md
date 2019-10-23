# NestJS application

This example is a [NestJS](https://nestjs.com/) application that exposes a REST service endpoint. The REST endpoint outputs `Hello, World!`.

To build and run the container image:

- Run `npm install`
- Run `npm run build:image`
- Run `docker run --rm -p 3000:3000 nestjs:latest`
- Go to http://localhost:3000/
