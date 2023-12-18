## Publishing solutions-components to npmjs & GitHub

#### Checklist

* \[ \] Stop automatic recompilation software
* \[ \] Run `npm run publish`
  * \[ \] Select or enter the new version number (long delay afterwards)
  * \[ \] Press ENTER to open the npm 2-factor prompt in a browser and enter the one-time password

---

## Setup issues

### Publishing to npm

* Create an account on npmjs.com that's part of the esri organization ([npm instructions](https://docs.npmjs.com/creating-a-new-npm-user-account))
* Set up npm in Okta Verify ([npm instructions](https://docs.npmjs.com/configuring-two-factor-authentication))
* On your computer, run `npm login`, which asks you for your npm username, password, email, and a two-factor code
* Use `npm whoami` to verify that you're logged in

A token is created in your npm account.
