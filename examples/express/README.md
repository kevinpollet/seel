# Express application

This example is an [Express](https://www.express.com/) application that serves the files in the [public](./public) directory and exposes a REST service endpoint. The REST endpoint outputs `Hello, World!` or greets the `name` passed as a query parameter.

To build and run the container image:

- Run `npm run build:image`
- Run `docker run --rm -p 3000:3000 express:latest`
- Go to http://localhost:3000/ or http://localhost:3000/hello
