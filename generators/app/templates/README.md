# <%= projectName %>

<% if (description) { %>

## Overview

<%= description %>
<% } %>

## Getting Started

### Install Dependencies

`npm install`

### Running Locally

`npm start`

### Running Tests

`npm test`

or

`npm run autotest`

To re-run tests when files change.

### Production build

`npm build`

### Elm Commands

Elm binaries can be found in `node_modules/.bin`, if you do not have Elm
installed globally. With the latest npm you can run:

`npx elm install <packageName>`

to install new packages. Alternatively, you could add scripts in `package.json`
and run them via `npm run ...`
