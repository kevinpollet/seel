/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const { greet } = require("./greet");
const express = require("express");

const app = express().get("/greet", (req, res) => {
  const { name } = req.params;
  res.json({ message: greet(name) });
});

module.exports = {
  app,
};
