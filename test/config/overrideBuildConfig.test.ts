/**
 * Copyright © 2019 kevinpollet <pollet.kevin@gmail.com>`
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE.md file.
 */

import { overrideBuildConfig } from "../../src/config/overrideBuildConfig";

describe("overrideBuildConfig", () => {
  const buildConfig = {
    name: "name",
    entrypoint: "entrypoint",
    tags: ["tag1", "tag2"],
    labels: { key: "value" },
    exposedPorts: ["3000", "4000/tcp"],
    useYarn: false,
    copyLockFile: true,
    installDependencies: true,
    extraFiles: ["public/**"],
  };

  it("should return the dest config object if the source config is empty", () => {
    const newBuildConfig = overrideBuildConfig(buildConfig, {});

    expect(newBuildConfig).toBe(buildConfig);
    expect(newBuildConfig).toEqual(buildConfig);
  });

  it("should override the dest config property if the source config property is defined", () => {
    const newName = "foo";
    const newBuildConfig = overrideBuildConfig(buildConfig, { name: newName });

    expect(newBuildConfig).not.toBe(buildConfig);
    expect(newBuildConfig).not.toEqual(buildConfig);
    expect(newBuildConfig.name).toEqual(newName);
  });

  it("should not override the dest config property if the source config property is undefined", () => {
    const newBuildConfig = overrideBuildConfig(buildConfig, {
      name: undefined,
    });

    expect(newBuildConfig).not.toBe(buildConfig);
    expect(newBuildConfig).toEqual(buildConfig);
  });
});
