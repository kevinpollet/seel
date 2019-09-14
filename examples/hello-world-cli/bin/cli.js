#!/usr/bin/env node
/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const boxen = require("boxen");
const { greet } = require("../lib");

console.log(
  boxen(greet(process.argv[2]), {
    margin: 1,
    padding: 2,
    borderStyle: "double",
  })
);
