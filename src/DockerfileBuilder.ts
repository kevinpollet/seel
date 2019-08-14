/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

interface Command {
  name: string;
  value: string;
}

export class DockerfileBuilder {
  constructor(private readonly commands: Array<Readonly<Command>> = []) {
    this.commands = commands;
  }

  addCommand({ name, value }: Command): DockerfileBuilder {
    this.commands.push({
      name: name.toUpperCase(),
      value,
    });
    return this;
  }

  toString() {
    return this.commands
      .map(command => `${command.name} ${command.value}`)
      .join("\n");
  }
}
