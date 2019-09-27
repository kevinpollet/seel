/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

interface BuildConfigArgs {
  readonly name: string;
  readonly entrypoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly labels?: ReadonlyArray<[string, string]>;
  readonly exposedPorts?: ReadonlyArray<string>;
  readonly useYarn: boolean;
  readonly copyLockFile: boolean;
  readonly installDependencies: boolean;
  readonly extraFiles?: ReadonlyArray<string>;
}

export class BuildConfig {
  readonly name: string;
  readonly entrypoint: string;
  readonly tags?: ReadonlyArray<string>;
  readonly labels?: ReadonlyArray<[string, string]>;
  readonly exposedPorts?: ReadonlyArray<string>;
  readonly useYarn: boolean;
  readonly copyLockFile: boolean;
  readonly installDependencies: boolean;
  readonly extraFiles?: ReadonlyArray<string>;

  constructor(args: BuildConfigArgs) {
    this.name = args.name;
    this.entrypoint = args.entrypoint;
    this.tags = args.tags;
    this.exposedPorts = args.exposedPorts;
    this.labels = args.labels;
    this.useYarn = args.useYarn;
    this.copyLockFile = args.copyLockFile;
    this.installDependencies = args.installDependencies;
    this.extraFiles = args.extraFiles;
  }

  merge(source: Partial<BuildConfigArgs>): BuildConfig {
    const overrides = Object.entries(source).reduce(
      (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
      {} as Partial<BuildConfigArgs>
    );

    return new BuildConfig({
      ...this,
      ...overrides,
    });
  }
}
