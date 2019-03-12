#!/usr/bin/env node

// Imports
const commander = require("commander");
const version = require("../package.json").version;

// CLI Option parsing
commander
  .version(version)
  .command("create <name>", "Creates a new application called <name>", { isDefault: true })
  .command("quickstart <name>", "Like 'create', but with no prompts")
  .parse(process.argv);
