/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  sayHello(): string {
    return "Hello, World!";
  }
}
