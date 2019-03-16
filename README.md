# Elm App Generator

Generate an Elm app, with only the parts that you need, and no hidden
configuration.

## Getting Started

### Installation

#### NPM

```
$ npm install --global elm-app-gen
```

#### Yarn

Note: There is currently a [bug in commander.js](https://github.com/tj/commander.js/issues/866)
that causes global yarn installs not to work. Please use `npm` until we have
a fix for it. 

```
$ yarn global add elm-app-gen
```

### Create your project

In the parent directory of your (soon-to-be) project:

```
$ elm-app-gen yourProjectName
```

You'll be prompted to provide some information about your project, such as a 
license, description, and they type of Elm program to generate. When you're done,
the new app is created in a directory based on the name you provided. It will
contain a README with instructions on how to start a live server and perform
other development tasks.

## QuickStart

If you want to start coding as quickly as possible, you can run 

```
$ elm-app-gen quickstart yourProjectName
```

This will create a an application with default settings and immediately
start an application server. 

## What's included in a new project?

Elm App Generator creates a project for you that includes:

- [Elm](https://elm-lang.org)
- [Elm Test](https://package.elm-lang.org/packages/elm-exploration/test/latest)
- [Parcel](https://parceljs.org)

The list of initial dependencies is intentionally small to keep your app simple
until it needs more features and tools.

## Project Goals

### Simple

Elm App Generator creates apps that only contain the tools you need to start working
on your project. It won't make assumptions about what you're trying to do,
other than building an app with Elm. Where multiple tools are available for a
particular task, Elm App Generator opts for the simpler choice.

### Friendly

Elm App Generator always tries to provide useful context when asking users to make
decisions. When the user needs to take additional steps, it will describe them when 
it runs, and include them in the documentation for the generated application. 
Generated apps contain links to documentation for the libraries and tools in use.

### Explicit

There's no hidden configuration in the generated application. Some other tools
hide a lot of configuration behind the scenes, which can be overwhelming when
it's finally exposed. Elm App Generator exposes all of you project to you up front, so
nothing is a mystery.
