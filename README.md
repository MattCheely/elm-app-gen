# Build Elm App

Build an Elm app, with only the parts that you need, and no hidden
configuration.

## Getting Started

### Installation

#### NPM

`npm install -g build-elm-app`

#### Yarn

`yarn global add build-elm-app`

### Create your project

In the parent directory of your (soon-to-be) project:

```
▶ build-elm-app  
```

You'll be prompted to provide some information about your project, such as a
name, license, description, etc (most of these are optional). When you're done,
the new app is created in a directory based on the name you provided. It will
contain a README with instructions on how to start a live server and perform
other development tasks.

## What's included in a new project?

Build Elm App creates a project for you that includes:

- [Elm](https://elm-lang.org)
- [Elm Test](https://package.elm-lang.org/packages/elm-exploration/test/latest)
- [Parcel](https://parceljs.org)

The list of initial dependencies is intentionally small to keep your app simple
until it needs more features and tools.

## Project Goals

### Simple

Build Elm App creates apps that only contain the tools you need to start working
on your project. It won't make assumptions about what you're trying to do,
other than building an app with Elm. Where multiple tools are available for a
particular task, Build Elm App opts for the simpler choice.

### Friendly

Build Elm App will always explain what changes it will make. When the user
needs to take additional steps, it will describe them when it runs, and include
them in the documentation for the generated application. Generated apps contain
links to documentation for the libraries and tools in use.

### Explicit

There's no hidden configuration in the generated application. Some other tools
put a lot of configuration behind the scenes, which can be overwhelming when
it's finally exposed. Build Elm App exposes all of it's configuration, so
nothing is hidden.
