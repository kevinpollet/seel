import { isArray } from "util";

/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

class Instruction {
  readonly name: string;
  readonly value: string | ReadonlyArray<string>;

  constructor(name: string, value: string | string[]) {
    this.name = name.toUpperCase();
    this.value = value;
  }

  toString(): string {
    const value = isArray(this.value)
      ? `[${this.value.map(value => `"${value}"`).join(",")}]`
      : this.value;

    return `${this.name} ${value}`;
  }
}

export class DockerfileBuilder {
  constructor(
    private readonly instructions: Array<Readonly<Instruction>> = []
  ) {
    this.instructions = instructions;
  }

  pushInstruction(name: string, value: string | string[]): DockerfileBuilder {
    this.instructions.push(new Instruction(name, value));
    return this;
  }

  toString(): string {
    return this.instructions
      .map(instruction => instruction.toString())
      .join("\n");
  }
}
