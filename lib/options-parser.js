const commander = require("commander");

let errors = [];

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

  handleErrors();

  return parsedOpts;
}

function addCliOptions(cliOpts) {
  cliOpts.options.forEach(addCliOption);
  commander.option("--no-prompt", "Don't prompt for unknown options");

  if (cliOpts.helpMessage) {
    commander.on("--help", function() {
      console.log(cliOpts.helpMessage);
    });
  }
}

function addCliOption(opt) {
  if (opt.choices) {
    commander.option(
      `--${opt.name} <${opt.name}>`,
      `${opt.description} (${opt.choices.join("/")})`,
      choiceValidator(opt.name, opt.choices)
    );
  } else {
    commander.option(`--${opt.name} <${opt.name}>`, opt.description);
  }
}

function choiceValidator(name, choices) {
  return input => {
    let normalized = input.toLowerCase();
    if (choices.indexOf(normalized) >= 0) {
      return normalized;
    } else {
      errors.push(`The --${name} option must be one of ${choices.join("/")}`);
    }
  };
}

function getCliOption(name) {
  let maybeOption = commander[name];
  if (maybeOption && typeof maybeOption != "function") {
    return maybeOption;
  }
}

function validateRequiredCliOptions(cliOpts, parsedOpts) {
  cliOpts.options.forEach(opt => {
    if (opt.ifNotSet && !parsedOpts[opt.name]) {
      errors.push(opt.ifNotSet);
    }
  });
}

function handleErrors() {
  if (errors.length > 0) {
    console.error(`
There were some problems with your selected options:
  ${errors.join("\n  ")}
`);

    process.exit(1);
  }
}

module.exports = {
  parse: parseOptions
};
