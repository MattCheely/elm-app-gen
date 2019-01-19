#!/usr/bin/env node

// Imports
const commander = require("commander");
const version = require("../package.json").version;

// CLI Option parsing
commander
  .version(version)
  .command("create", "Creates a new application", { isDefault: true })
  .parse(process.argv);
