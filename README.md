[![Build status][travis-img]][travis-url]
[![Apache 2.0 licensed][license-img]][license-url]

[travis-img]: https://img.shields.io/travis/Esri/solutions-components/develop.svg
[travis-url]: https://travis-ci.org/Esri/solutions-components
[license-img]: https://img.shields.io/badge/license-Apache%202.0-blue.svg
[license-url]: #license

# solutions-components

`solutions-components` are shared web components used in Solutions apps.

## Requirements

Supported browsers are the latest versions of Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge (Chromium).

## Getting Started

The repository is set up to use [Volta](https://docs.volta.sh/guide/getting-started) for standardizing the versions of NodeJS and npm. Please install and use this app to get the supported versions.

The repository uses [StencilJS](https://stenciljs.com/) to manage web component development; the project is a `web_component` project type.

Set up:

```bash
npm install
```

To interactively transpile components and update the display of src/index.html via http://localhost:3333/src:

```bash
npm start
```
Note this feature excessively caches; sometimes you have to rebuild manually and force a refresh.

One can also run index.html in the top-level directory, which is the same as src/index.html but for the path to the `dist` directory.

To add a component, run
```bash
npm run generate
```
with the new component's name as an argument (or specify the name when prompted).

To build the component for debugging, run:

```bash
npm run build:debug
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, stop automatic compilation (e.g., Visual Studio) and run:

```bash
npm run clean:src
npm test
```

To publish to npm and GitHub,
1. Edit package.json to have the new version number
2. Run `npm install`
3. Edit CHANGELOG.md to show the new release number and connect it to previous releases
4. Commit and push changes to GitHub
5. Run: `npm release:publish`


## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Licensing

Copyright 2021 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's [LICENSE](./LICENSE) file.
