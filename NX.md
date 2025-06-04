# Nx

**Warning**: Make sure you have completed [HATCH.md](./HATCH.md) before continuing.

Based on "Installation" at https://nx.dev/getting-started/installation

Install **Nx** (required for Nx Monorepos and Nx Cloud) globally as follows:

```
$ npm add --global nx@latest
```

If you are prompted that a newer version of Node is required, update Node to that newer version.

To upgrade Node you may first want to see which version of Node.js you are currently using:

```
$ node --version
```

Find out which versions of Node.js you may have installed and which one of those you're currently using:

```
$ nvm ls
```

List all versions of Node.js available for installation:

```
$ nvm ls-remote
```

Apparently for Windows the command would be rather like this:

```
$ nvm ls available
```

Assuming you would pick Node.js v22.15.0 for installation you'd type the following to install that version:

**Tip**: Choose a Long-Term Supported (LTS) version.

```
$ nvm install 22.15.0
```

You are then free to choose between installed versions of Node.js. So if you would need to use an older version like v20.18.1 you would set it as the active version like this:

```
$ nvm use 20.18.1
```

That should be all.

Now that you have fulfilled the requirements of Node, again try to install nx:

```
$ npm add --global nx@latest
```

To use **nx** directly, you can now just use:

```
$ nx --version
```

To update **nx**, run:

```
$ cd hatch-project/src/hatch_project # Note: go into the directory of nx.json
$ npx nx migrate latest # if nx has not yet been installed
$ nx migrate latest     # if nx has already been installed
```

You will be prompted alike:

```
Fetching meta data about packages.
It may take a few minutes.
Fetching nx@21.0.2
Fetching @nx/eslint@21.0.2
Fetching @nx/jest@21.0.2
Fetching @nx/webpack@21.0.2
Fetching @nx/react@21.0.2
Fetching @nx/playwright@21.0.2

 NX   The migrate command has run successfully.

- package.json has been updated.
- migrations.json has been generated.


 NX   Next steps:

- Make sure package.json changes make sense and then run 'npm install',
- Run 'npx nx migrate --run-migrations'
- To learn more go to https://nx.dev/features/automate-updating-dependencies
```

Should you follow above recommended migration steps, you will be prompted as follows:

```
 NX   Running 'npm install' to make sure necessary packages are installed


removed 83 packages, and audited 1098 packages in 5s

167 packages are looking for funding
  run `npm fund` for details

11 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

 NX   Running migrations from 'migrations.json'

Running the following migrations:
- nx: remove-legacy-cache (Removes the legacy cache configuration from nx.json)
- nx: remove-custom-tasks-runner (Removes the legacy cache configuration from nx.json)
- @nx/jest: replace-getJestProjects-with-getJestProjectsAsync-v21 (Replace usage of `getJestProjects` with `getJestProjectsAsync`.)
- @nx/jest: remove-tsconfig-option-from-jest-executor (Remove the previously deprecated and unused `tsConfig` option from the `@nx/jest:jest` executor.)
- nx: release-version-config-changes (Updates release version config based on the breaking changes in Nx v21)
- nx: release-changelog-config-changes (Updates release changelog config based on the breaking changes in Nx v21)
- @nx/webpack: update-21-0-0-remove-isolated-config (Remove isolatedConfig option for @nx/webpack:webpack)
- @nx/react: update-21-0-0-update-babel-loose (Replaces `classProperties.loose` option with `loose`.)
---------------------------------------------------------

Running migration nx: remove-legacy-cache
Ran remove-legacy-cache from nx
  Removes the legacy cache configuration from nx.json

Changes:
  UPDATE nx.json

---------------------------------------------------------
Running migration nx: remove-custom-tasks-runner
Ran remove-custom-tasks-runner from nx
  Removes the legacy cache configuration from nx.json

No changes were made

---------------------------------------------------------
Running migration @nx/jest: replace-getJestProjects-with-getJestProjectsAsync-v21
Ran replace-getJestProjects-with-getJestProjectsAsync-v21 from @nx/jest
  Replace usage of `getJestProjects` with `getJestProjectsAsync`.

No changes were made

---------------------------------------------------------
Running migration @nx/jest: remove-tsconfig-option-from-jest-executor
Ran remove-tsconfig-option-from-jest-executor from @nx/jest
  Remove the previously deprecated and unused `tsConfig` option from the `@nx/jest:jest` executor.

No changes were made

---------------------------------------------------------
Running migration nx: release-version-config-changes
Ran release-version-config-changes from nx
  Updates release version config based on the breaking changes in Nx v21

No changes were made

---------------------------------------------------------
Running migration nx: release-changelog-config-changes
Ran release-changelog-config-changes from nx
  Updates release changelog config based on the breaking changes in Nx v21

No changes were made

---------------------------------------------------------
Running migration @nx/webpack: update-21-0-0-remove-isolated-config
Ran update-21-0-0-remove-isolated-config from @nx/webpack
  Remove isolatedConfig option for @nx/webpack:webpack

No changes were made

---------------------------------------------------------
Running migration @nx/react: update-21-0-0-update-babel-loose
Ran update-21-0-0-update-babel-loose from @nx/react
  Replaces `classProperties.loose` option with `loose`.

No changes were made

---------------------------------------------------------

 NX   Successfully finished running migrations from 'migrations.json'. This workspace is up to date!

```

Based on the provided repository structure and documentation, I'll help you run the Hatch project. The project appears to be set up as a React monorepo using Nx. Here are the steps to run it:


1. First, make sure you're in the root directory of the repository:
```bash
cd /path/to/your/repository
```

2. Install the dependencies:
```bash
npm ci  # This installs dependencies exactly as specified in package-lock.json
```

3. Install the Nx CLI globally (if not already installed):
```bash
npm install -g @nrwl/cli
```

Make sure you have a tsconfig.base.json file in your hatch-project/src/hatch_project directory. If not, create one:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "rootDir": ".",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "es2015",
    "module": "esnext",
    "lib": ["es2020", "dom"],
    "skipLibCheck": true,
    "skipDefaultLibCheck": true,
    "baseUrl": ".",
    "paths": {}
  },
  "exclude": ["node_modules", "tmp"]
}
```

Make sure you have a tsconfig.app.json file in your hatch-project/src/hatch_project directory. If not, create one:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "types": ["node"],
    "module": "esnext",
    "target": "es2015",
    "lib": ["es2020", "dom"],
    "sourceMap": true,
    "declaration": false
  },
  "exclude": ["**/*.spec.ts", "**/*.test.ts"],
  "include": ["**/*.ts"]
}
```

Make sure you have a project.json file in your hatch-project/src/hatch_project/apps/hatch_project directory. If not, create one:

```json
{
  "name": "hatch_project",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "hatch-project/src/hatch_project/src",
  "projectType": "application",
  "targets": {
    "build": {
      "executor": "@nx/webpack:webpack",
      "outputs": ["{options.outputPath}"],
      "defaultConfiguration": "production",
      "options": {
        "outputPath": "dist/hatch_project",
        "compiler": "babel",
        "main": "hatch-project/src/hatch_project/src/main.ts",
        "tsConfig": "hatch-project/src/hatch_project/tsconfig.app.json",
        "webpackConfig": "hatch-project/src/hatch_project/webpack.config.js",
        "assets": [
          {
            "glob": "**/*",
            "input": "hatch-project/src/hatch_project/src/assets",
            "output": "assets"
          }
        ],
        "index": "hatch-project/src/hatch_project/src/index.html"
      },
      "configurations": {
        "production": {
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "extractCss": true,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "budgets": [
            {
              "type": "initial",
              "maximumWarning": "2mb",
              "maximumError": "5mb"
            }
          ]
        },
        "development": {
          "optimization": false,
          "sourceMap": true,
          "extractCss": false
        }
      }
    },
    "serve": {
      "executor": "@nx/webpack:dev-server",
      "options": {
        "buildTarget": "hatch_project:build",
        "hmr": true,
        "port": 4200
      },
      "configurations": {
        "production": {
          "buildTarget": "hatch_project:build:production"
        },
        "development": {
          "buildTarget": "hatch_project:build:development"
        }
      },
      "defaultConfiguration": "development"
    }
  }
}
```

Create a basic webpack.config.js file in your hatch-project/src/hatch_project directory:

```javascript
const { composePlugins, withNx } = require('@nx/webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
```

You can use the Nx generate command to create a new app (here: ```my-app```) in the ```hatch-project/src/hatch_project/apps``` directory. Here's how:

```
$ cd hatch-project/src/hatch_project
$ npx nx g @nx/react:app my-app --directory=apps/my-app
```

Or if you want to create it from the root directory:

```
$ npx nx g @nx/react:app my-app --directory=hatch-project/src/hatch_project/apps/my-app
```

You will be prompted as follows:

```
 NX  Generating @nx/react:application

? Would you like to add routing to this application? (y/N) › false
```

For now, type **y** for yes followed by Enter.

```
? What unit test runner should be used? … 
vitest
jest
none
```

Use the arrow keys to select **jest** followed by Enter.

```
? Which E2E test runner would you like to use? … 
playwright
cypress
none
```

Use the arrow keys to select **playwright** followed by Enter.

```
CREATE hatch-project/src/hatch_project/apps/my_app/src/app/app.spec.tsx
CREATE hatch-project/src/hatch_project/apps/my_app/src/assets/.gitkeep
CREATE hatch-project/src/hatch_project/apps/my_app/src/favicon.ico
CREATE hatch-project/src/hatch_project/apps/my_app/src/index.html
CREATE hatch-project/src/hatch_project/apps/my_app/src/main.tsx
CREATE hatch-project/src/hatch_project/apps/my_app/tsconfig.app.json
CREATE hatch-project/src/hatch_project/apps/my_app/webpack.config.js
CREATE hatch-project/src/hatch_project/apps/my_app/.babelrc
CREATE hatch-project/src/hatch_project/apps/my_app/src/app/nx-welcome.tsx
CREATE hatch-project/src/hatch_project/apps/my_app/src/app/app.tsx
CREATE hatch-project/src/hatch_project/apps/my_app/src/styles.css
CREATE hatch-project/src/hatch_project/apps/my_app/tsconfig.json
CREATE hatch-project/src/hatch_project/apps/my_app/project.json
CREATE hatch-project/src/hatch_project/apps/my_app/postcss.config.js
CREATE hatch-project/src/hatch_project/apps/my_app/tailwind.config.js
CREATE hatch-project/src/hatch_project/apps/my_app/eslint.config.mjs
CREATE hatch-project/src/hatch_project/apps/my_app-e2e/project.json
CREATE hatch-project/src/hatch_project/apps/my_app-e2e/src/example.spec.ts
CREATE hatch-project/src/hatch_project/apps/my_app-e2e/playwright.config.ts
CREATE hatch-project/src/hatch_project/apps/my_app-e2e/tsconfig.json
CREATE hatch-project/src/hatch_project/apps/my_app-e2e/eslint.config.mjs
CREATE hatch-project/src/hatch_project/apps/my_app/tsconfig.spec.json
CREATE hatch-project/src/hatch_project/apps/my_app/jest.config.ts

 NX   Ensuring Playwright is installed.

use --skipInstall to skip installation.


 NX   👀 View Details of my_app

Run "nx show project my_app" to view details about this project.
```

This will:
- Create a new React application with all necessary files
- Set up the proper directory structure
- Configure webpack, TypeScript, and other dependencies
- Create default components and configuration files

All the necessary files were created in hatch-project/src/hatch_project/apps/my-app/. You can start developing by editing:
- apps/my-app/src/app/app.tsx - Main application component
- apps/my-app/src/styles.css - Global styles
- apps/my-app/src/main.tsx - Application entry point

After creation, you can run it with:

```
$ npx nx serve my-app
```

4. To serve the application in development mode:
```bash
npx nx serve hatch_project
```

This will:
- Start a development server
- Usually be available at http://localhost:4200
- Auto-reload when you make changes

If that doesn't work, we might need to check if Nx recognizes the project:

```bash
npx nx show project hatch_project
```

5. Alternatively, if you want to build the application:
```bash
npx nx build hatch_project
```

For production build:
```bash
npx nx build hatch_project --configuration=production
```

To run tests:
```bash
npx nx test hatch_project
```

If you want to run multiple tasks in parallel (e.g., build all projects):
```bash
npx nx run-many -t build --all
```

To generate code:
```bash
npx nx g @nrwl/react:component my-component
```

Common issues and solutions:

If you get path-related errors, make sure your nx.json is properly configured with the correct paths for your nested structure:

```json
{
  "projects": {
    "hatch_project": {
      "root": "hatch-project/src/hatch_project",
      "sourceRoot": "hatch-project/src/hatch_project/src",
      "projectType": "application"
    }
  }
}
```

If you encounter issues with the Nx CLI, ensure it's properly installed:

npm install -g @nrwl/cli

2. If you get Nx Cloud connection issues, you may need to reconnect:

```bash
nx generate @nx/workspace:disconnect-cloud
nx connect-to-nx-cloud
```

3. If you need to clean the cache:

```bash
npm cache clean --force
```

Remember that all Nx commands should be run from the root of the repository where the nx.json file is located.
