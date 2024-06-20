import "dotenv/config";
import childProcess from "child_process";
import ghRelease  from "gh-release";
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

try {
  ghRelease(options,
    (err, result) => {
      if (err) throw err;
      console.info("Released on GitHub!", result);
      rimraf.sync(packageFileName);
    }
  )
} catch (error) {
  console.error("Could not create GitHub release", error);
}
