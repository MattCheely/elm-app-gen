# generator-elm-Parcel

Generates a simple Elm project, built with [Parcel](https://parceljs.org/).

## Why Parcel?

One of the nice things about Elm is that there's a lot less configuration to
manage than in most JS build pipelines. Combining it with something like
Webpack negates some of that benefit a bit, IMO. I prefer build tools that
require less configuration, so Parcel works well for me!

## Getting Started

Install [yeoman](http://yeoman.io/).

Setup looks like this:

```
▶ yo elm-parcel  
? What is your project called? myProject
? Please provide a brief description of your project: It's gonna be so great!
? Who is the author of this project? I am!
? What license would you like to use? (SPDX identifier) Apache-2.0
   create .gitignore
   create README.md
   create app/css/style.css
   create app/elm/Main.elm
   create app/index.html
   create app/js/app.js
   create elm-stuff/0.19.0/Main.elmi
   create elm-stuff/0.19.0/Main.elmo
   create elm-stuff/0.19.0/summary.dat
   create elm.json
   create package.json
   create tests/Example.elm
? What would you like to use to install dependencies? (Use arrow keys)
❯ npm
  yarn
  skip

I'm all done. Running npm install for you to install the required dependencies. If this fails, try running the command yourself.

  ...NPM makes a bunch of noise...

You're all set. The generated README.md in /whever/you/started/myProject contains
instructions for running the live server, tests, etc.

Have fun!
```

## What about Less, Sass, ESlint, Typescript, Coffescript, Bucklescript, Service Workers, Babel, Autoprefixer, Bootstrap, PostCSS, PostHTML...???

I like starting with a basic project and adding those things as I need them.
Also, my preferences for many of those options might not match up with yours!
I'd rather provide something basic without too many opinions baked in than
scare people off by picking their least favorite CSS preprocessor.

However, I think it would be interesting to add additional generators that folks
could use after the basic setup to configure those things as they need. If
there's something in particular you'd like to see, open an issue and maybe we
figure out a pattern to incorporate it with that approach.
