# Publishing a release

The workflow in [`.github/workflows/publish.yml`](../.github/workflows/publish.yml) runs when a tag such as `v1.4.0` is pushed. It validates both themes, checks the tag against `package.json`, packages the extension, publishes the same VSIX to the VS Code Marketplace and attaches it to a GitHub Release.

## One-time setup

1. Create an Azure DevOps Personal Access Token for the account authorized to publish as **Zibro**. Select **All accessible organizations** and the **Marketplace → Manage** scope, as described in the [VS Code publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token).
2. In this GitHub repository, open **Settings → Secrets and variables → Actions → New repository secret**.
3. Save the token as **`VSCE_PAT`**.

The GitHub Release uses the automatically provided `GITHUB_TOKEN`; no separate GitHub token is needed.

## Release 1.4.0

`package.json` and `package-lock.json` are prepared for **1.4.0**. After committing and pushing the release changes:

```bash
npm ci
npm run check -- --tag v1.4.0
npm run package
git tag -a v1.4.0 -m "Monokai HC Extreme 1.4.0"
git push origin v1.4.0
```

Follow the **Publish extension** run in GitHub Actions. The VSIX is also saved as a workflow artifact, including when Marketplace publication fails after packaging.

## Subsequent releases

1. Update the changelog and run `npm version minor --no-git-tag-version` (or `patch` for a bugfix). This updates both version files.
2. Run `npm run check`, commit the version and release changes, and push the commit.
3. Create and push an annotated tag matching the package version: `vMAJOR.MINOR.PATCH`.

A mismatched tag fails before publication. Re-running a release job skips an already-published Marketplace version and refreshes the VSIX attached to an existing GitHub Release.

Local packaging and checks require **Node.js 22 or newer**. The theme itself retains its VS Code engine requirement of `^1.70.0`.
