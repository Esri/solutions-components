## Publishing solutions-components to npmjs & GitHub

#### Checklist

* \[ \] Stop automatic recompilation software
* \[ \] Switch to `master` branch
* \[ \] Merge in--but don't commit--the source branch, e.g., `develop` or the current `release/X.X.X` branch
* \[ \] Run `npm run clean:src`
* \[ \] Change the package version number in package.json
* \[ \] Run `npm install` to update package-lock.json
* \[ \] Edit CHANGELOG.md
  * \[ \] Add the version and date after the "## [Unreleased]" line, e.g., `## [0.1.6] - November 2nd 2022`
  * \[ \] Define the version's symbol (e.g., "0.1.6") mapping from the previous version to the new version, e.g., `[0.1.6]: https://github.com/Esri/solution.js/compare/v0.1.5...v0.1.6 "v0.1.6"`
  * \[ \] Update the "Unreleased" symbol to map from the new version to the "HEAD", e.g., `[Unreleased]: https://github.com/Esri/solution.js/compare/v0.1.6...HEAD "Unreleased Changes"`
* \[ \] Commit everything and push `master` to GitHub
* \[ \] Tag `master` with the release number, and push the tag to GitHub
* \[ \] Run `npm run release:publish`, supplying the npm OTP (one-time passcode from Okta Verify or similar) when prompted

---

## Setup issues

### Publishing to npm

* Create an account on npmjs.com that's part of the esri organization ([npm instructions](https://docs.npmjs.com/creating-a-new-npm-user-account))
* Set up npm in Okta Verify ([npm instructions](https://docs.npmjs.com/configuring-two-factor-authentication))
* On your computer, run `npm login`, which asks you for your npm username, password, email, and a two-factor code
* Use `npm whoami` to verify that you're logged in

A token is created in your npm account.
