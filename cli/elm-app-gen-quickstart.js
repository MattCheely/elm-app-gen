// Imports
const yeoman = require("yeoman-environment");
const appGen = require.resolve("../generators/app");
const optionParser = require("../lib/options-parser.js");
const cliOpts = require("./quickstart-options.js");

let options = optionParser.parse(cliOpts);
options.installer = "npm";
options.prompt = false;
options.start = true;
options.type = "document";

const yoEnv = yeoman.createEnv();
yoEnv.register(appGen, "elm:app");
yoEnv.run("elm:app", {
  cliOpts: options
});
