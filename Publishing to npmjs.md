## Publishing solutions-components to npmjs

1. Update version in package.json
2. Run `npm install` to update package-lock.json
3. Add entry for version in CHANGELOG.md; there are three places to add or to modify:
	* Add line for version; e.g., `## [0.2.5] - December 20th 2022` (a note about what's in the release is helpful here)
	* Define the symbol in the just-added line; e.g., `[0.2.5]: https://github.com/Esri/solution.js/compare/v0.2.4...v0.2.5 "v0.2.5"`
	* Update the "from" version for the `[Unreleased]` symbol to the new version; e.g., `[Unreleased]: https://github.com/Esri/solution.js/compare/v0.2.5...HEAD "Unreleased Changes"`
4. Commit and push the changes
5. Run `npm run release:publish`
