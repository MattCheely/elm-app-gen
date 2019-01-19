function buildPrompts(commandOpts, providedOpts) {
  let prompts = [];
  commandOpts.options.forEach(opt => {
    if (!providedOpts[opt.name]) {
      prompts.push(buildPrompt(opt));
    }
  });
  return prompts;
}

function buildPrompt(opt) {
  let prompt = {
    name: opt.name,
    message: opt.prompt
  };

  if (opt.choices) {
    prompt.type = 'list';
    prompt.choices = opt.choices;
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
