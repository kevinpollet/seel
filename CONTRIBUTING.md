# How to contribute? <!-- omit in toc -->

- [Code of Conduct](#code-of-conduct)
- [Issues and Bugs](#issues-and-bugs)
- [Feature Requests](#feature-requests)
- [Commit Message Guidelines](#commit-message-guidelines)
  - [Commit Message Format](#commit-message-format)
  - [Type](#type)
  - [Revert](#revert)
  - [Breaking Change](#breaking-change)
  - [Referencing GitHub Issues](#referencing-github-issues)

## Code of Conduct

Help us to keep this project open and inclusive. Please read and follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Issues and Bugs

**Found a bug?**

If you found a bug in the code you can [submit an issue](https://github.com/kevinpollet/seel/issues) or even better,[submit a pull request](https://github.com/kevinpollet/seel/pulls) with the fix.

Before you submit an issue, please search in the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds.

## Feature Requests

**Missing a feature?**

You can request a new feature by [submitting an issue](https://github.com/kevinpollet/seel/issues). If you want to implement a new feature, please submit an issue with your proposal first.

Before you submit an issue for your new feature, please search in the issue tracker, maybe an issue already exists.

## Commit Message Guidelines

The commit messages follow the [Conventional Commits](https://www.conventionalcommits.org) specification. This leads to **more readable messages** when looking through the project history and these messages can also be used to generate the project **changelog**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, an optional **scope** and a **description**:

```
<type>[(optional scope)]: <description>

[optional body]

[optional footer]
```

### Type

Must be one of the following:

- **chore** - Changes to the build process or auxiliary tools and libraries.
- **ci** - Changes to CI configuration files and scripts.
- **docs** - Documentation only changes.
- **feat** - A new feature (this correlates with **MAJOR** in semantic versioning).
- **fix** - A bug fix (this correlates with **PATCH** in semantic versioning).
- **perf** - A code change that improves performance.
- **refactor** - A code change that neither fixes a bug nor adds a feature.
- **style** - Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, ...).
- **test** - Adding missing or correcting existing tests.

### Revert

If the commit reverts a previous commit, its **header** should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Breaking Change

If the commit introduces a **Breaking Change**, its body should begin with `BREAKING CHANGE:` and an optional `!` can be added to the **header** (correlating with **MAJOR** in semantic versioning). A **Breaking Change** can be part of commits of any type.

### Referencing GitHub Issues

If the commit is linked to a GitHub issue, the commit **header** should end with `(#<issue-number>)`.

If the commit closes a GitHub issue, the commit **body** or **footer** should be `Close #<issue-number>`. The `Close` keyword should be added to the commit **footer** only if the commit already has a **body** describing the changes.
