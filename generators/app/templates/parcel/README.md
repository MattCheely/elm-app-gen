# <%= name %>

<% if (locals.description) { -%>
<%= description %>
<% } -%>

## Getting Started

### Install Dependencies

`<%= installer %> install`

### Running Locally

`<%= installer %> start`

Will compile your app and serve it from http://localhost:1234/
Changes to your source code will trigger a hot-reload in the browser, which
will also show compiler errors on build failures.

### Running Tests

`<%= installer %> test`

or

`<%= installer %> run autotest`

To re-run tests when files change.

### Production build

`<%= installer %> run build`

Will generate a production-ready build of your app in the `dist` folder.

### Elm Commands

Elm binaries can be found in `node_modules/.bin`. They can be run from within
your project via <% if (installer == 'npm') { %> `npx`
<% } else if (installer == 'yarn') { %> `yarn run` <% } %>

To install new Elm packages, run:

<% if (installer == 'npm') { -%>
`npx elm install <packageName>`
<% } else if (installer == 'yarn') { -%>
`yarn run elm install <packageName>`
<% } -%>

## Libraries & Tools

These are the main libraries and tools used to build <%= name %>. If you're not
sure how something works, getting more familiar with these might help.

### [Elm](https://elm-lang.org)

Elm is a delightful language for creating reliable webapps. It guarantees no
runtime exceptions, and provides excellent performance. If you're not familiar
with it, [the official guide](https://guide.elm-lang.org) is a great place to get
started, and the folks on [Slack](https://elmlang.herokuapp.com) and
[Discourse](https://discourse.elm-lang.org) are friendly and helpful if you get
stuck.

### [Elm Test](https://package.elm-lang.org/packages/elm-exploration/test/latest)

This is the standard testing library for Elm. In addition to being useful for
traditional fixed-input unit tests, it also supports property-based testing
where random data is used to validate behavior over a large input space. It's
really useful!

### [Parcel](https://parceljs.org)

Parcel build and bundles the application's assets into individual HTML, CSS, and
JavaScript files. It also runs the live-server used during development.

### [`elm-debug-transform`](https://github.com/kraklin/elm-debug-transformer)

This is a simple tool for improving the output of `Debug.log` statements.
It applies some nice formatting for elm data structures. When you do a
`parcel build` to produce your prod bundle, this won't be wired in.
Read more in this discourse post: https://discourse.elm-lang.org/t/nicer-debug-log-console-output/3780.
