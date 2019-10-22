#!/usr/bin/env node
/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const { sayHello } = require("../lib");

console.log(sayHello(process.argv[2]));
