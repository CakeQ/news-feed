## News-Feed

A standalone news feed page packaged with its own mongoose back-end. Requires a MongoDB database running on port 27017 by default (see server/config.js for changing) to run. Client project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

In order to run both the client and server, you will need to go into both the /client directory and the /server directory and run a `npm install`, as well as run another `npm install` in the root directory.

Logins can be made with any valid e-mail address and a password input of "password" or "admin". Admin will grant the user access to featuring posts, and deleting posts and comments. Basic users will be able to delete their own posts and comments.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app and the server concurrently in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits to the client.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner for the client in the interactive watch mode.
