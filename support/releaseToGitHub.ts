/* eslint-disable import/first */
require('dotenv').config();

const childProcess = require("child_process");
const githubRelease = require("gh-release");
const pify = require("pify");
const rimraf = require("rimraf");

const packageFileName = childProcess.execSync("npm pack", { encoding: "utf-8" }).trim();
const packageScope = "esri-";

const options = {
  assets: [
    {
      name: packageFileName.replace(packageScope, ""),
      path: packageFileName
    }
  ],
  auth: {
    token: process.env.GH_RELEASE_GITHUB_API_TOKEN
  },
  body: "Development release",
  yes: true // skips prompt
};

pify(githubRelease)(options)
  .then(() => console.info("Released on GitHub!"))
  .catch((error) => console.error("Could not create GitHub release", error))
  .then(() => rimraf.sync(packageFileName));
