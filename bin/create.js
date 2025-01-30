import inquirer from "inquirer";
import shell from "shelljs";
import chalk from "chalk";
import ora from "ora";
import * as emoji from "node-emoji";
import fsExtra from "fs-extra";
import Os from "os";
import { join } from "path";
import path from "path";
import fs from "fs";

const { ensureDir, readdir } = fsExtra;

const BASE_URL = "https://github.com/Light-Ideas-Labs/ultimate-scaffold/";

const createAsync = async () => {
  try {
    console.log(chalk.blue("🚀 Create a custom Ultimate Dapp"));

    let availablePackages = {
      nextJS: "Next-JS (JavaScript)",
      nextTS: "Next-TS (TypeScript)",
      hardhatJS: "Hardhat-JS (JavaScript)",
      hardhatTS: "Hardhat-TS (TypeScript)",
      foundry: "Foundry (Rust-based)",
    };

    let packageNameMap = {
      nextJS: "next-js",
      nextTS: "next-ts",
      hardhatJS: "hardhat-js",
      hardhatTS: "hardhat-ts",
      foundry: "foundry",
    };

    let selectedPackages = [];

    // ✅ Step 1: Ask the user if they want One Framework or Two
    let { selectionType } = await inquirer.prompt({
      type: "list",
      name: "selectionType",
      message: "Choose project setup:",
      choices: [
        { name: "Two frameworks (Frontend + Smart Contract)", value: "two" },
        { name: "Standalone framework (Either Frontend or Smart Contract)", value: "one" },
      ],
    });

    if (selectionType === "two") {
      // ✅ Option 1: Select Two Frameworks

      let { fEFramework } = await inquirer.prompt({
        type: "list",
        name: "fEFramework",
        message: "Choose a front-end framework:",
        choices: [
          { name: availablePackages["nextJS"], value: "nextJS" },
          { name: availablePackages["nextTS"], value: "nextTS" },
        ],
      });

      let { scFramework } = await inquirer.prompt({
        type: "list",
        name: "scFramework",
        message: "Choose a smart-contract framework:",
        choices: [
          { name: availablePackages["hardhatJS"], value: "hardhatJS" },
          { name: availablePackages["hardhatTS"], value: "hardhatTS" },
        ],
      });

      selectedPackages.push(fEFramework, scFramework);
    } else {
      // ✅ Option 2: Select One Framework (Frontend or Smart Contract)
      let { standaloneFramework } = await inquirer.prompt({
        type: "list",
        name: "standaloneFramework",
        message: "Choose a single framework:",
        choices: [
          { name: availablePackages["nextJS"], value: "nextJS" },
          { name: availablePackages["nextTS"], value: "nextTS" },
          { name: availablePackages["hardhatJS"], value: "hardhatJS" },
          { name: availablePackages["hardhatTS"], value: "hardhatTS" },
        ],
      });

      selectedPackages.push(standaloneFramework);
    }

    // // Select Frontend Framework
    // let { fEFramework } = await inquirer.prompt({
    //   type: "list",
    //   name: "fEFramework",
    //   message: "Choose a front-end framework:",
    //   default: availablePackages["next-js"],
    //   choices: [
    //     { name: availablePackages["nextJS"], value: "nextJS" },
    //     { name: availablePackages["nextTS"], value: "nextTS" },
    //     { name: "None", value: "none" },
    //   ],
    // });
    
    // if (fEFramework !== "None") {
    //   selectedPackages.push(fEFramework)
    // }

    // // Select Smart Contract Framework
    // let { scFramework } = await inquirer.prompt({
    //   type: "list",
    //   name: "scFramework",
    //   message: "Choose a smart-contract framework:",
    //   default: availablePackages["hardhat-js"],
    //   choices: [
    //     { name: availablePackages["hardhatJS"], value: "hardhatJS" },
    //     { name: availablePackages["hardhatTS"], value: "hardhatTS" },
    //     { name: availablePackages["foundry"], value: "foundry" },
    //     { name: "None", value: "none" },
    //   ],
    // });

    // if (scFramework !== "None") {
    //   selectedPackages.push(scFramework)
    // }

    // Get Project Name
    let { projectName } = await inquirer.prompt({
      type: "input",
      name: "projectName",
      message: "Project name: ",
    });

    if (selectedPackages.length > 0) {
      const pwd = process.cwd();
      const outputDir = `${pwd}/${projectName}`;

      // ensure the output directory exists
      await ensureDir(outputDir);
      await isOutputDirectoryEmpty(outputDir);

      //start showing the loader
      const spinner = loading(`Generating a custom Ultimate EVM-compatible DApp project with the following packages: ${selectedPackages.join(", ")}...\n`);

      // shell commands to clone and trim the required directories
      shell.cd(pwd);
      shell.exec(`git clone --depth 2 --filter=blob:none --sparse ${BASE_URL} ${projectName}`);
      shell.cd(projectName);

      // Initialize Sparse Checkout
      shell.exec("git sparse-checkout init --cone");

      // clone to local only the projects user wants
      // Clone only the selected frontend and smart contract framework
      selectedPackages.forEach((pkg) => {
        shell.exec(`git sparse-checkout add packages/${packageNameMap[pkg]}`);
      });

      shell.exec("git pull origin main");

      // Verify that the selected packages exist
      const packagesPath = "packages";
      selectedPackages.forEach((pkg) => {
        if (!packageNameMap[pkg]) {
          console.error(chalk.red(`❌ Error: No mapping found for '${pkg}'. Check packageNameMap.`));
          process.exit(1);
        }
      
        const packagePath = path.join(packagesPath, packageNameMap[pkg]);
        if (!fs.existsSync(packagePath)) {
          console.error(chalk.red(`❌ Error: ${packageNameMap[pkg]} was not cloned correctly.`));
          console.error(chalk.yellow(`🛠 Debugging info: Looking for path -> ${packagePath}`));
          process.exit(1);
        } else {
          console.log(chalk.green(`✅ Package '${packageNameMap[pkg]}' exists at ${packagePath}`));
        }
      });

      console.log(chalk.green("✅ Selected frameworks successfully cloned."));

      // Generate package.json
      let packageJson = {
        name: projectName,
        version: "0.0.1",
        description: "ultimate EVM-compatible scaffold dApp",
        private: true,
        author: "Jordan, Ronex, Antony",
        license: "MIT",
        scripts: {},
        repository: {
          type: "git",
          url: "git+https://github.com/Light-Ideas-Labs/ultimate-scaffold.git",
        },
        bugs: {url: "https://github.com/Light-Ideas-Labs/ultimate-scaffold/issues",},
        homepage:"https://github.com/Light-Ideas-Labs/ultimate-scaffold/blob/main/README.md",
        workspaces: ["packages/*"], // selectedPackages.map((pkg) => `packages/${packageNameMap[pkg]}`),
        keywords: ["ultimate", "scaffold", "ethereum", "celo", "base", "lisk", "avalanche", "scroll", "dapp",],
      };

      /**
       * Getting all packages selected by the user
       * First list them via echo packages/\*\/
       * Some string manipulation so that packages looks like
       * eg:- ["next-ts", "hardhat-js", "hardhat-ts"] etc...
       */
      let packagesStdOut;
      if (isWindows) {
        let { stdout } = shell.exec("dir packages /b", {
          silent: true,
        });
        packagesStdOut = stdout;
      } else {
        let { stdout } = shell.exec("echo packages/*/", {
          silent: true,
        });
        packagesStdOut = stdout;
      }

      /**
       * Node 14 and below doens't support replaceAll
       */
      let packages;
      if (isWindows) {
        packages = packagesStdOut.replaceAll("\n", " ").replaceAll("\r", "").split(" ");
        // remove empty strings from array
        packages = packages.filter(function (el) {
          return el != null && el != "";
        });
      } else {
        // remove new line from packagesStdOut
        packages = packagesStdOut.replace(/packages\//g, "").replace(/\//g, "").replace(/\n/g, "").split(" ");
      }

      // Write the updated package.json
      shell.echo(JSON.stringify(packageJson, "", 4)).to("package.json");

      // Finalize setup
      shell.exec("rm -rf .git");
      shell.exec("git init --quiet --initial-branch=main");

      console.warn(chalk.red("Remember to change the git url using the command: git remote set-url origin new.git.url/here"));
      console.log(chalk.green("\n🚀 Your ultimate DApp project has been successfully created!\n"));
      console.log(chalk.yellow("🔧 Now you're all set to start your project!\n"));
      console.log(chalk.green("👉 Run `yarn install` and `yarn dev` from packages/next-ts folder to start the project\n"));
      console.log(chalk.green("👉 Run `yarn install` from packages/hardhat-ts install dependencies\n"));
      console.log(chalk.green("\n📖 Thank you for using Ultimate Scaffold Dapp! If you have any questions or need further assistance, please refer to the README or reach out to our team.\n"));
      
      spinner.stopAndPersist({
        symbol: emoji.get("100 "),
        text: chalk.green("🎉 Done! Happy coding! 🔥🔥\n\n"),
      });
    }
  } catch (error) {
    if (error.isTtyError) {
      console.error(
        chalk.red("❌ Prompt couldn't be rendered in the current environment.")
      );
    } else if (error.message.includes("force closed")) {
      console.log(chalk.yellow("⚠️ Process interrupted. Exiting gracefully."));
    } else {
      console.error(chalk.red("❌ An unexpected error occurred:"), error);
    }
    process.exit(1);
  }
};

// ToDo: if project isn't web no need to netlify.toml
// ToDo: Change the name of the project in package.json for the generated packages.
// ToDo: write back the changes to the package.json

async function isOutputDirectoryEmpty(outputFolder, force = false) {
  const files = await readdir(outputFolder);
  if (files.length > 0 && !force) {
    const { value } = await inquirer.prompt({
      name: "value",
      type: "confirm",
      message:
        "⚠️ Output directory is not empty. Are you sure you want to continue?",
    });
    if (!value) {
      process.exit(1);
    }
  }
}

/**
 * Displays a loading spinner.
 */
const loading = (message) => {
  return ora(message).start();
};

/**
 * Checks if the operating system is Windows.
 */
function isWindows() {
  return Os.platform() === "win32";
}

export { createAsync };
