#!/bin/bash

# Make sure user is logged in to npm
npm whoami || exit 1

# Extract the version from lerna.json (this was updated by previous step)
VERSION=$(node --eval "console.log(require('./lerna.json').version);")

# commit the changes from `npm run release:prepare`
echo Commit the changes from npm run release:prepare
git add --all
git commit -am "v$VERSION" --no-verify

# increment the package.json version to the lerna version so gh-release works
npm version $VERSION --allow-same-version --no-git-tag-version

# amend the changes from `npm version` to the release commit
echo Amend the changes from npm version to the release commit
git add --all
git commit -am "v$VERSION" --no-verify --amend

# tag this version
git tag v$VERSION

# push everything up to this point
branch=$(git branch --show-current)
echo Push everything up to this point
git push https://github.com/Esri/solutions-components.git $branch

# push the new tag, not the old tags
echo Push the new tag, not the old tags
git push https://github.com/Esri/solutions-components.git v$VERSION

# create a ZIP archive of the dist files
TEMP_FOLDER=solutions-components-v$VERSION;
mkdir $TEMP_FOLDER

mkdir $TEMP_FOLDER/solutions-components
cp -r packages/solutions-components/dist/* $TEMP_FOLDER/solutions-components/

zip -r $TEMP_FOLDER.zip $TEMP_FOLDER
rm -rf $TEMP_FOLDER

# Run gh-release to create a new release with our changelog changes and ZIP archive
echo npx gh-release -t v$VERSION -b v$VERSION -r solutions-components -o Esri -a $TEMP_FOLDER.zip
npx gh-release -t v$VERSION -b v$VERSION -r solutions-components -o Esri -a $TEMP_FOLDER.zip

# Delete the ZIP archive
rm $TEMP_FOLDER.zip
