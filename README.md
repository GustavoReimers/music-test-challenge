In this project we use yarn, please install if you don't have it:

### https://classic.yarnpkg.com/en/docs/getting-started/

In the project directory, you can run:

### `yarn install`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Dependency Description

### classnames
We need this library to make working with classes easier and faster. We can add or remove classes under any condition.

### node-sass
This module is required for .scss. We need this to speed up and simplify working with styles.

### react-inlinesvg
We need this in order to place inline svg in DOM, without the need to go into the svg code itself

### tone
This is one of the most important dependencies in a project, we need this to work with sounds. Creation of players, timeline for samples playback, etc.
