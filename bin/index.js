#!/usr/bin/env node

import { Command } from "commander";
import { createComponent, createPage, createApp } from "../functions/index.js";


const program = new Command();
program.version("1.0.0");

program
  .command("create <project>")
  .description("create a new React project")
  .action((project) => {
    createApp(project);
  });

program
  .command("add")
  .option("-c, --component <customName>", "create a new component")
  .option("-p, --page <customName>", "create a new page")
  .description("create a new React component")
  .action((customName) => {
    const componentName = customName.component;
    const pageName = customName.page;
    if (componentName) {
      createComponent(componentName);
    }
    if (pageName) {
      createPage(pageName);
    }
  });
program.parse(process.argv);
