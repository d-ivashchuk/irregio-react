# Irreg.io - remastered

<img src="https://raw.github.com/d-ivashchuk/irregio-react/master/screenshots/irregio.gif" width="350" />

## What is Irreg.io

It is a simple app I've built in the past to get comfortable with german irregular verbs. Previously [it](https://github.com/d-ivashchuk/irreg.io) has been written in mostly vanilla javascript but as my skills progressed I've decided to rebuilt it as React SPA and use some intermediate techniques like test-driven development and static types.

## Technologies

This application is built with `react` and `styled-components`. It utilizes static types via `Typescript` so usual _js_ and _jsx_ will be _ts_ and _tsx_ instead.

## Installing and using locally

If you want to play with the app or tweak its code you need to install it locally on your machine. To achieve that clone the repo, run `npm install` command in your terminal and run `npm start`. As this portfolio uses `create-react-app` a new browser window with an app running on local server will open and any changes to the code will trigger hot reload of the page.

All of the test for the app are written with `jest` and `enzyme`. To start testing in watch mode simply run `npm test` and all of the tests will rerun on any changes of the file.
