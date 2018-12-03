const commander = require("commander");

function parseOptions(cliOpts) {
  addCliOptions(cliOpts);

  commander.parse(process.argv);
  let parsedOpts = {
    prompt: getCliOption("prompt")
  };

  cliOpts.options.forEach(opt => {
    parsedOpts[opt.name] = getCliOption(opt.name);
  });

  if (!parsedOpts.prompt) {
    validateRequiredCliOptions(cliOpts, parsedOpts);
  }

  return parsedOpts;
}

function addCliOptions(cliOpts) {
  cliOpts.options.forEach(opt => {
    commander.option(`--${opt.name} <${opt.name}>`, opt.description);
  });
  commander.option("--no-prompt", "Don't prompt for unknown options");

  if (cliOpts.helpMessage) {
    commander.on("--help", function() {
      console.log(cliOpts.helpMessage);
    });
  }
}

function getCliOption(name) {
  let maybeOption = commander[name];
  if (maybeOption && typeof maybeOption != "function") {
    return maybeOption;
  }
}

function validateRequiredCliOptions(cliOpts, parsedOpts) {
  let valid = true;
  cliOpts.options.forEach(opt => {
    if (opt.ifNotSet && !parsedOpts[opt.name]) {
      console.error(opt.ifNotSet);
      valid = false;
    }
  });

  if (!valid) {
    process.exit(1);
  }
}

module.exports = {
  parse: parseOptions
};
