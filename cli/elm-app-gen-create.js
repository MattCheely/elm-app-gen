// Imports

const yeoman = require("yeoman-environment");
const appGen = require.resolve("../generators/app");
const optionParser = require("../lib/options-parser.js");
const cliOpts = require("./create-options.js");

let options = optionParser.parse(cliOpts);

const yoEnv = yeoman.createEnv();
yoEnv.register(appGen, "elm:app");
yoEnv.run("elm:app", {
  cliOpts: options
});
