const fs = require("fs");
const path = require("path");
const Generator = require("yeoman-generator");
const promptBuilder = require("../../lib/prompt-builder.js");
const createOpts = require("../../cli/create-options.js");
const spawn = require("cross-spawn");

module.exports = class extends Generator {
  async prompting() {
    this.answers = this.options.cliOpts;

    if (this.options.cliOpts.prompt) {
      let prompts = promptBuilder.build(createOpts, this.options.cliOpts);
      let responses = await this.prompt(prompts);
      Object.assign(this.answers, responses);
    }

    // Make destinationRoot() the directory with the name of the app,
    // not the directory where the command was run
    const appPath = path.join(this.destinationRoot(), this.answers.name);
    this.destinationRoot(appPath);
  }

  writing() {
    const templateDirectory = `elm/${this.answers.type}`;
    const destDir = this.answers.name;

    const props = this.answers;

    this.fs.copyTpl(
      this.templatePath(`${templateDirectory}/_elm.json`),
      this.destinationPath(`elm.json`),
      props
    );

    this.fs.copy(
      this.templatePath(`${templateDirectory}/src`),
      this.destinationPath(`src`)
    );

    //--- PARCEL
    this.fs.copyTpl(
      this.templatePath("parcel/style.css"),
      this.destinationPath(`src/css/style.css`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/README.md"),
      this.destinationPath(`README.md`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/index.html"),
      this.destinationPath(`src/index.html`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/app.js"),
      this.destinationPath(`src/js/app.js`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/package.json"),
      this.destinationPath(`package.json`),
      props
    );

    this.fs.copyTpl(
      this.templatePath("parcel/gitignore"),
      this.destinationPath(`.gitignore`),
      props
    );
  }

  async install() {
    if (this.answers.start) {
      await installAndRun(this.destinationRoot(), this.answers);
    } else {
      const installer = this.answers.installer;

      await this.installDependencies({
        bower: false,
        npm: installer === "npm",
        yarn: installer === "yarn"
      });
    }
  }

  end() {
    // Skip this part if the server is running.
    if (!this.answers.start) {
      sayFinished(this.destinationRoot());
    }
  }
};

async function installAndRun(appPath, options) {
  const installer = options.installer;

  const parcelPath = require.resolve(".bin/parcel");
  const indexPath = path.join(appPath, "src/index.html");

  let installComplete = false;

  say(`\nStarting development server...`);
  const parcelProc = spawn(parcelPath, [indexPath], {
    cwd: appPath,
    stdio: "inherit"
  });

  const installProc = spawn(installer, ["install"], {
    cwd: appPath,
    stdio: "ignore"
  });

  installProc.on("exit", () => {
    installComplete = true;
  });

  process.once("SIGINT", () => {
    if (!installComplete) {
      say(`

Your project is ready to go, but I wasn't able to finish installing dependencies
in the background while you were working. You'll need to run '${installer} install'
yourself to complete the process. The generated README.md in ${appPath}
contains instructions for running the live server, tests, etc.
Have fun!
`);
    } else {
      sayFinished(appPath);
    }
  });
}

function say(str) {
  console.log(str);
}

function sayFinished(appPath) {
  say(`
You're all set. The generated README.md in ${appPath} contains
instructions for running the live server, tests, etc.
Have fun!`);
}
