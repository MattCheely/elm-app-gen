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

    const props = {
      name: this.answers.name,
      installer: "yarn",
      description: "",
      author: "",
      license: ""
    };

    this.fs.copyTpl(
      this.templatePath(`${templateDirectory}/_elm.json`),
      this.destinationPath(`${destDir}/elm.json`),
      props
    );

    this.fs.copy(
      this.templatePath(`${templateDirectory}/src`),
      this.destinationPath(`${destDir}/src`)
    );

    //--- PARCEL
    this.fs.copyTpl(
      this.templatePath("parcel/style.css"),
      this.destinationPath(`${destDir}/style.css`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/README.md"),
      this.destinationPath(`${destDir}/README.md`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/index.html"),
      this.destinationPath(`${destDir}/index.html`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/app.js"),
      this.destinationPath(`${destDir}/app.js`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/package.json"),
      this.destinationPath(`${destDir}/package.json`),
      props
    );
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
