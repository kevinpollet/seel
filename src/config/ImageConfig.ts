/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { readPkg } from "../utils/readPkg";
import { getEntrypoint } from "./getEntrypoint";
import { getTags } from "./getImageTags";
import { Label } from "./Label";

export class ImageConfig {
  static async fromPkgJSON(dir: string): Promise<ImageConfig> {
    const pkgJSON = await readPkg(dir);
    const hasDependencies = Object.keys(pkgJSON.dependencies || {}).length > 0;

    return new ImageConfig({
      name: pkgJSON.name,
      entrypoint: getEntrypoint(pkgJSON),
      tags: getTags(pkgJSON),
      installDependencies: hasDependencies,
    });
  }

  readonly name: string;
  readonly entrypoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly ports?: ReadonlyArray<string>;
  readonly labels?: ReadonlyArray<Label>;
  readonly installDependencies: boolean;

  constructor({
    name,
    tags,
    entrypoint,
    ports,
    labels,
    installDependencies = true,
  }: {
    name: string;
    tags?: ReadonlyArray<string>;
    entrypoint: string;
    ports?: ReadonlyArray<string>;
    labels?: ReadonlyArray<Label>;
    installDependencies?: boolean;
  }) {
    this.name = name;
    this.tags = tags;
    this.entrypoint = entrypoint;
    this.ports = ports;
    this.labels = labels;
    this.installDependencies = installDependencies;
  }

  assign(config: Partial<ImageConfig>): ImageConfig {
    return new ImageConfig({ ...this, ...config });
  }
}
