#!/usr/bin/env node
/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

const { app } = require("../lib");

const PORT = 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is listening on port: ${PORT}`);
});
