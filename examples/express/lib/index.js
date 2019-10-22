/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const express = require("express");
const { sayHello } = require("./sayHello");

const app = express()
  .use(express.static("public"))
  .get("/hello", (req, res) => {
    const { name } = req.query;
    const message = sayHello(name);

    res.header("Content-Type", "text/plain").end(message);
  });

module.exports = {
  app,
};
