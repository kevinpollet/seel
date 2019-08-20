#!/usr/bin/env node
/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const boxen = require("boxen");
const { greeter } = require("../lib");

console.log(
  boxen(greeter(process.argv[2]), {
    margin: 1,
    padding: 2,
    borderStyle: "double",
  })
);
