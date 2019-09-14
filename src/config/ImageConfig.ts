/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { readPkgJSON } from "../utils/readPkgJSON";
import { getEntryPoint } from "./getEntryPoint";
import { getTags } from "./getImageTags";
import { Label } from "./Label";

export class ImageConfig {
  static async fromPkgJSON(dir: string): Promise<ImageConfig> {
    const pkgJSON = await readPkgJSON(dir);

    return new ImageConfig({
      name: pkgJSON.name,
      entryPoint: getEntryPoint(pkgJSON),
      tags: getTags(pkgJSON),
    });
  }

  readonly name: string;
  readonly entryPoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly exposedPorts?: ReadonlyArray<string>;
  readonly labels?: ReadonlyArray<Label>;

  constructor({
    name,
    tags,
    entryPoint,
    exposedPorts,
    labels,
  }: {
    name: string;
    tags?: ReadonlyArray<string>;
    entryPoint: string;
    exposedPorts?: ReadonlyArray<string>;
    labels?: ReadonlyArray<Label>;
  }) {
    this.name = name;
    this.tags = tags;
    this.entryPoint = entryPoint;
    this.exposedPorts = exposedPorts;
    this.labels = labels;
  }

  assign(config: Partial<ImageConfig>): ImageConfig {
    return new ImageConfig({ ...this, ...config });
  }
}
