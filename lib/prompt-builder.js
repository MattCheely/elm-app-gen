function buildPrompts(commandOpts, providedOpts) {
  let prompts = [];

  if (commandOpts.arg) {
    addPrompt(providedOpts, prompts, commandOpts.arg);
  }

  commandOpts.options.forEach(optionInfo => {
    addPrompt(providedOpts, prompts, optionInfo);
  });
  return prompts;
}

function addPrompt(providedOpts, prompts, optionInfo) {
  if (!providedOpts[optionInfo.name]) {
    prompts.push(buildPrompt(optionInfo));
  }
}

function buildPrompt(opt) {
  let prompt = {
    name: opt.name,
    message: opt.prompt
  };

  if (opt.choices) {
    prompt.type = "list";
    prompt.choices = opt.choices;
  } else if (opt.confirm) {
    prompt.type = "confirm";
    if (opt.default === false) {
      prompt.default = false;
    } else {
      prompt.default = true;
    }
  } else {
    prompt.type = "input";
  }

  if (opt.ifNotSet) {
    prompt.validate = function(answer) {
      if (answer.length > 0) {
        return true;
      } else {
        return opt.ifNotSet;
      }
    };
  }

  return prompt;
}

module.exports = {
  build: buildPrompts
};
