const fs = require("fs");
const path = require("path");
const Generator = require("yeoman-generator");
const promptBuilder = require("../../lib/prompt-builder.js");
const createOpts = require("../../cli/create-options.js");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt(createOpts.options);
  }

  writing() {
    const templateDirectory = `elm/${this.answers.type}`;
    const destDir = this.answers.name;
    this.fs.copyTpl(
      this.templatePath(`${templateDirectory}/_elm.json`),
      this.destinationPath(`${destDir}/elm.json`),
      { name: this.answers.name }
    );

    this.fs.copy(
      this.templatePath(`${templateDirectory}/src`),
      this.destinationPath(`${destDir}/src`)
    );
  }

  async install() {
    await this.spawnCommand("elm", ["reactor"], { cwd: this.answers.name });
  }

  async end() {
    say(`
You're all set. Your project has been succesfully created !

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
I will create the following files in ${rootPath}:
${filesStr}
`;
}
