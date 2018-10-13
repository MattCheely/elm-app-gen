const fs = require("fs");
const path = require("path");
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        name: "projectName",
        message: "What is your project called?",
        validate(answer) {
          if (answer.length > 0) {
            return true;
          } else {
            return "A name is required.";
          }
        }
      },
      {
        name: "description",
        message: "Please provide a brief description of your project:"
      },
      {
        name: "author",
        message: "Who is the author of this project?"
      },
      {
        name: "license",
        message: "What license would you like to use? (SPDX identifier)"
      }
    ]);

    this.destinationRoot(
      path.join(this.destinationRoot(), this.answers.projectName)
    );
  }

  writing() {
    let templates = recursiveList(this.sourceRoot());
    console.log("TEMPLATES\n", templates.join("\n"));
    templates.forEach(templatePath => {
      this.fs.copyTpl(
        this.templatePath(templatePath),
        this.destinationPath(templatePath),
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
    console.log(`
You're all set. The generated README.md in ${this.destinationRoot()} contains
instructions for running the live server, tests, etc.

Have fun!`);
  }
};

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
