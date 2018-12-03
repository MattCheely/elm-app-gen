const fs = require("fs");
const path = require("path");
const Generator = require("yeoman-generator");
const promptBuilder = require("../../lib/prompt-builder.js");
const createOpts = require("../../cli/create-options.js");

module.exports = class extends Generator {
  async prompting() {
    this.answers = this.options.cliOpts;

    if (this.options.cliOpts.prompt) {
      let prompts = promptBuilder.build(createOpts, this.options.cliOpts);
      let responses = await this.prompt(prompts);
      Object.assign(this.answers, responses);
    }

    this.appPath = path.join(this.destinationRoot(), this.answers.name);
    this.templates = recursiveList(this.sourceRoot());

    let projectDescription = projectDescriptionMsg(
      this.appPath,
      this.templates
    );

    say(projectDescription);
    let confirmation = await this.prompt([
      {
        name: "confirmed",
        type: "confirm",
        message: "Should I continue?"
      }
    ]);

    if (!confirmation.confirmed) {
      say("\nBye!");
      process.exit();
    }
  }

  async writing() {
    this.destinationRoot(this.appPath);
    this.templates.forEach(templatePath => {
      let destinationPath =
        templatePath == "gitignore" ? ".gitignore" : templatePath;
      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(destinationPath),
        this.answers
      );
    });
  }

  async install() {
    let choice = await this.prompt([
      {
        name: "installer",
        message: "What would you like to use to install dependencies?",
        type: "list",
        choices: ["npm", "yarn", "skip"]
      }
    ]);

    if (choice.installer !== "skip") {
      this.installDependencies({
        bower: false,
        npm: choice.installer === "npm",
        yarn: choice.installer === "yarn"
      });
    }
  }

  async end() {
    say(`
You're all set. The generated README.md in ${this.destinationRoot()} contains
instructions for running the live server, tests, etc.

Have fun!`);
  }
};

function say(str) {
  console.log(str);
}

function recursiveList(directoryName, acc) {
  let allFiles = acc || [];
  let files = fs.readdirSync(directoryName);
  files.forEach(function(file) {
    var fullPath = path.join(directoryName, file);
    let f = fs.statSync(fullPath);
    if (f.isDirectory()) {
      recursiveList(fullPath, allFiles);
    } else {
      allFiles.push(fullPath);
    }
  });
  return allFiles.map(file => {
    return path.relative(directoryName, file);
  });
}

function projectDescriptionMsg(rootPath, fileList) {
  const indent = "  ";
  const filesStr = indent + fileList.join("\n" + indent);
  return `
I will create your the following files at ${rootPath}:
${filesStr}
`;
}
