/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { readPkgJSON } from "../utils/readPkgJSON";
import { getEntrypoint } from "./getEntrypoint";
import { getTags } from "./getImageTags";
import { Label } from "./Label";

export class ImageConfig {
  static async fromPkgJSON(dir: string): Promise<ImageConfig> {
    const pkgJSON = await readPkgJSON(dir);

    return new ImageConfig({
      name: pkgJSON.name,
      entrypoint: getEntrypoint(pkgJSON),
      tags: getTags(pkgJSON),
    });
  }

  readonly name: string;
  readonly entrypoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly ports?: ReadonlyArray<string>;
  readonly labels?: ReadonlyArray<Label>;

  constructor({
    name,
    tags,
    entrypoint,
    ports,
    labels,
  }: {
    name: string;
    tags?: ReadonlyArray<string>;
    entrypoint: string;
    ports?: ReadonlyArray<string>;
    labels?: ReadonlyArray<Label>;
  }) {
    this.name = name;
    this.tags = tags;
    this.entrypoint = entrypoint;
    this.ports = ports;
    this.labels = labels;
  }

  assign(config: Partial<ImageConfig>): ImageConfig {
    return new ImageConfig({ ...this, ...config });
  }
}
