/* eslint-disable import/first */
require('dotenv').config();
import * as childProcess from "child_process";
import * as githubRelease from "gh-release";
import * as pify from "pify";
import * as rimraf from "rimraf";

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

pify.default(githubRelease)(options)
  .then(() => console.info("Released on GitHub!"))
  .catch((error) => console.error("Could not create GitHub release", error))
  .then(() => rimraf.sync(packageFileName));
