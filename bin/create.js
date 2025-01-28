import inquirer from "inquirer";
import shell from "shelljs";
import chalk from "chalk";
import ora from "ora";
import * as emoji from "node-emoji";
import fsExtra from "fs-extra";
import Os from "os";
import { join } from "path";
import fs from "fs";

const { ensureDir, readdir } = fsExtra;

const BASE_URL = "https://github.com/Light-Ideas-Labs/ultimate-scaffold/"; 

const createAsync = async () => {

  let availablePackages = {
    "next-ts": "Next-ts",
    hardhatJS: "Hardhat-JS",
    hardhatTS: "Hardhat-TS",
    foundry: "Foundry",
  };

  let packageNameMap = {
    "next-ts": "next-ts",
    hardhatJS: "hardhat-js",
    hardhatTS: "hardhat-ts",
    foundry: "foundry",
  };

  let selectedPackages = [];
  let selectedFELibrary = "";

  let { fEFramework } = await inquirer.prompt({
    type: "list",
    name: "fEFramework",
    message: "Choose front-end framework:",
    default: Object.values(availablePackages)[0],
    choices: [
      { name: availablePackages["next-ts"], value: "next-ts" },
    ],
  });

  /**
   * Based on what fEFramework value is,
   * get its index in the object values array,
   * at the same index get its key and push it to selectedPackages.
   */

  selectedPackages.push(
    Object.keys(availablePackages)[
      Object.values(availablePackages).indexOf(fEFramework)
    ]
  );

  let { scFramework } = await inquirer.prompt({
    type: "list",
    name: "scFramework",
    message: "Choose smart-contract framework:",
    default: availablePackages["hardhat-js"],
    choices: [
      { name: availablePackages["hardhatJS"], value: "hardhat-js" },
      { name: availablePackages["hardhatTS"], value: "hardhat-ts" },
      { name: availablePackages["foundry"], value: "foundry" },
      { name: "None", value: "none" },
    ],
  });

  if (scFramework !== "None") {
    selectedPackages.push(
      Object.keys(availablePackages)[
        Object.values(availablePackages).indexOf(scFramework)
      ]
    );
  }

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

    // showing the loader
    const spinner = loading(`Generating a custom Ultimate EVM DApp project with the following packages: ${selectedPackages.join(", ")}...\n`);
    
    // shell commands to clone and trim the required directories
    shell.cd(pwd);
    shell.exec(`git clone --depth 2 --filter=blob:none --sparse ${BASE_URL} ${projectName}`);
    shell.cd(projectName);

    let packageJson = {
      name: projectName,
      version: "0.0.5",
      description: "ultimate evm compatible scaffold dapp",
      private: true,
      author: "Jordan, Ronex, Antony",
      license: "MIT",
      scripts: {},
      repository: {
        "type": "git",
        "url": "git+https://github.com/Light-Ideas-Labs/ultimate-scaffold.git"
      },
      bugs: {"url": "https://github.com/Light-Ideas-Labs/ultimate-scaffold/issues"},
      homepage: "https://github.com/Light-Ideas-Labs/ultimate-scaffold/blob/main/README.md",
      workspaces: ["packages/*"],
      keywords: ["ultimate", "scaffold", "ethereum", "celo", "base", "lisk", "avalanche", "scroll", "dapp"],
    }

    for (let x = 0; x < selectedPackages.length; x++) {
      let packages = selectedPackages[x];

      // clone to local only the projects user wants
      shell.exec(`git sparse-checkout add packages/${packages}`, {
        silent: true,
      });

      // update front-end web3 library
      if (packages == packageNameMap["next-ts"]) {
        let localPackageJson = shell.cat(`packages/${packages}/package.json`);
        let projectPackage = JSON.parse(localPackageJson);

        shell
          .echo(JSON.stringify(projectPackage, "", 4))
          .to(`packages/${packages}/package.json`);

        Object.keys(projectPackage.scripts).forEach((key) => {
          packageJson.scripts[
            `${packageNameMap[packages]}:${key}`
          ] = `yarn workspace @${projectName}/${packages} ${key}`;
        });
      }
    }

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
          packages = packagesStdOut
            .replaceAll("\n", " ")
            .replaceAll("\r", "")
            .split(" ");
          // remove empty strings from array
          packages = packages.filter(function (el) {
            return el != null && el != "";
          });
        } else {
          // remove new line from packagesStdOut
          packages = packagesStdOut
            .replace(/packages\//g, "")
            .replace(/\//g, "")
            .replace(/\n/g, "")
            .split(" ");
        }
    
        shell.exec("rm -rf .git");
        shell.exec("git init --quiet --initial-branch=main");
            
        spinner.stopAndPersist({
          symbol: emoji.get("100"),
          text: chalk.green(" Done!"),
        });
        shell.echo(JSON.stringify(packageJson, "", 4)).to("package.json");

        console.warn(chalk.red("Remember to change the git url using the command: git remote set-url origin new.git.url/here"));
        console.log(chalk.green("\n\n🚀Your ultimate DApp project has been successfully created!\n"));
        console.log(chalk.yellow("Now you're all set to start your project!\n"));
        console.log(chalk.green("Run `yarn install` and `yarn dev` from packages/next-ts folder to start the project\n"));
        console.log(chalk.green("Run `yarn install` from packages/hardhat install dependencies\n"));
        console.log(chalk.green("Thank you for using Ultimate Scaffold Dapp! If you have any questions or need further assistance, please refer to the README or reach out to our team.\n"));
        console.log(chalk.blue("Happy coding! 🎉\n\n"));
  }
}


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
        "Output directory is not empty. Are you sure you want to continue?",
    });
    if (!value) {
      process.exit(1);
    }
  }
}


const loading = (message) => {
  return ora(message).start();
};

function isWindows() {
  return Os.platform() === "win32";
}

export {
  createAsync,
}
