import inquirer from "inquirer";
import chalk from "chalk";
import spawn from "cross-spawn";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp(project) {
  console.log(`Creating a new React project called ${chalk.green(project)}...`);

  const questions = [
    {
      type: "list",
      name: "template",
      message: "Select a template:",
      choices: ["basic"],
    },
    {
      type: "list",
      name: "packageName",
      message: "Select a package to create react-app:",
      choices: ["npx", "yarn", "npm"],
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    const template = answers.template;
    const packageName = answers.packageName;
    let templateDir = path.join(__dirname, "templates");

    if (template === "basic") {
      const templateDirTemp = path.join(templateDir, "React-Basic-Template");
      fs.rmSync(templateDirTemp, { recursive: true, force: true });
      const resultTemplate = spawn.sync(
        "git",
        ["clone", "https://github.com/abhishek-dagar/React-Basic-Template.git"],
        {
          cwd: templateDir,
          stdio: "inherit",
        }
      );
      if (resultTemplate.status !== 0) {
        console.error(chalk.red(`Failed to clone basic repository`));
        return;
      }
      templateDir = path.join(templateDir, "React-Basic-Template");
    }

    console.log(`Using ${chalk.green(template)} template...`);

    let args = [];
    if (packageName === "npx") {
      args = ["create-react-app", project, "--template", `file:${templateDir}`];
    }
    if (packageName === "npm") {
      args = [
        "init",
        "react-app",
        project,
        "--template",
        `file:${templateDir}`,
      ];
    }
    if (packageName === "yarn") {
      args = [
        "create",
        "react-app",
        project,
        "--template",
        `file:${templateDir}`,
      ];
    }
    const result = spawn.sync(packageName, args, {
      stdio: "inherit",
    });

    if (result.status !== 0) {
      console.error(chalk.red(`Failed to create React app ${project}`));
      return;
    }

    console.log(chalk.green(`Successfully created React app ${project}`));

    const packageQuestions = [
      {
        name: "additionalPackages",
        type: "checkbox",
        message: "Choose additional packages",
        choices: [
          { name: "reduxToolkit", value: "@reduxjs/toolkit" },
          { name: "mui", value: "@mui/material" },
          { name: "mui Icon", value: "@mui/icons-material" },
          { name: "formik", value: "formik" },
          { name: "yup", value: "yup" },
          { name: "axios", value: "axios" },
          { name: "sass", value: "axios" },
        ],
      },
    ];
    inquirer.prompt(packageQuestions).then((answers) => {
      const additionalPackages = answers.additionalPackages;

      const addPackages = ["add", "react-router-dom"];
      additionalPackages.forEach((element) => {
        addPackages.push(element);
        if (element === "@reduxjs/toolkit") {
          addPackages.push("react-redux");
        }
        if (element === "@mui/material") {
          addPackages.push("@emotion/styled");
        }
      });

      const installPath = path.join(process.cwd(), `${project}`);

      const installResult = spawn.sync("yarn", addPackages, {
        cwd: installPath,
        stdio: "inherit",
      });

      if (installResult.status !== 0) {
        console.error(
          chalk.red(`Failed to add packages in React app ${project}`)
        );
        return;
      }

      console.log(
        chalk.green(`Successfully added your packages in React app ${project}`)
      );
    });
  });
}
