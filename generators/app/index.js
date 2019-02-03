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

  async install() {
    await this.spawnCommand(this.answers.installer, ["install"], {
      cwd: this.answers.name
    });
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
I will create the following files in ${rootPath}:
${filesStr}
`;
}
